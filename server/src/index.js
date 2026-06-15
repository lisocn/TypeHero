import express from 'express'
import cors from 'cors'
import initSqlJs from 'sql.js'
import { v4 as uuidv4 } from 'uuid'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync, writeFileSync, existsSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DB_PATH = join(__dirname, '..', 'data.db')

let db

async function initDB() {
  const SQL = await initSqlJs()
  if (existsSync(DB_PATH)) {
    const buffer = readFileSync(DB_PATH)
    db = new SQL.Database(buffer)
  } else {
    db = new SQL.Database()
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      nickname TEXT NOT NULL,
      avatar TEXT NOT NULL,
      level INTEGER DEFAULT 1,
      exp INTEGER DEFAULT 0,
      total_exp INTEGER DEFAULT 0,
      coin INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      settings TEXT DEFAULT '{}',
      total_chars_typed INTEGER DEFAULT 0,
      highest_wpm INTEGER DEFAULT 0,
      total_play_minutes INTEGER DEFAULT 0,
      achievements_count INTEGER DEFAULT 0,
      consecutive_checkin_days INTEGER DEFAULT 0
    )
  `)
  db.run(`
    CREATE TABLE IF NOT EXISTS user_achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      achievement_id TEXT NOT NULL,
      unlocked_at TEXT DEFAULT (datetime('now')),
      UNIQUE(user_id, achievement_id)
    )
  `)
  db.run(`
    CREATE TABLE IF NOT EXISTS checkin_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      date TEXT NOT NULL,
      checked INTEGER DEFAULT 1,
      levels_completed INTEGER DEFAULT 0,
      practice_minutes INTEGER DEFAULT 0,
      wpm_avg REAL DEFAULT 0,
      accuracy_avg REAL DEFAULT 0,
      coin_earned INTEGER DEFAULT 0,
      exp_earned INTEGER DEFAULT 0,
      UNIQUE(user_id, date)
    )
  `)
  db.run(`
    CREATE TABLE IF NOT EXISTS level_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      chapter_id TEXT NOT NULL,
      level_id TEXT NOT NULL,
      best_stars INTEGER DEFAULT 0,
      best_wpm INTEGER DEFAULT 0,
      best_accuracy INTEGER DEFAULT 0,
      completed INTEGER DEFAULT 0,
      attempts INTEGER DEFAULT 0,
      UNIQUE(user_id, chapter_id, level_id)
    )
  `)
  db.run(`
    CREATE TABLE IF NOT EXISTS selected_textbooks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      textbook_id TEXT NOT NULL,
      selected_at TEXT DEFAULT (datetime('now')),
      UNIQUE(user_id, textbook_id)
    )
  `)
  saveDB()
}

function saveDB() {
  const data = db.export()
  writeFileSync(DB_PATH, Buffer.from(data))
}

function dbQuery(sql, params = []) {
  const stmt = db.prepare(sql)
  if (params.length) stmt.bind(params)
  const results = []
  while (stmt.step()) results.push(stmt.getAsObject())
  stmt.free()
  return results
}

function dbRun(sql, params = []) {
  db.run(sql, params)
  saveDB()
}

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'Not authenticated' })
  const users = dbQuery('SELECT * FROM users WHERE id = ?', [token])
  if (users.length === 0) return res.status(401).json({ error: 'User not found' })
  req.user = users[0]
  next()
}

function formatUser(u) {
  return {
    id: u.id, nickname: u.nickname, avatar: u.avatar,
    level: u.level, exp: u.exp, totalExp: u.total_exp,
    coin: u.coin, createdAt: u.created_at,
    settings: JSON.parse(u.settings || '{}'),
    totalCharsTyped: u.total_chars_typed,
    highestWpm: u.highest_wpm,
    totalPlayMinutes: u.total_play_minutes,
    achievementsCount: u.achievements_count,
    consecutiveCheckinDays: u.consecutive_checkin_days,
  }
}

function calcStreak(records) {
  const dates = records.filter(r => r.checked).map(r => r.date).sort().reverse()
  if (dates.length === 0) return 0
  let streak = 1
  for (let i = 0; i < dates.length - 1; i++) {
    const curr = new Date(dates[i])
    const prev = new Date(dates[i + 1])
    const diff = (curr - prev) / (1000 * 60 * 60 * 24)
    if (diff === 1) streak++
    else break
  }
  return streak
}

// === Auth ===
app.post('/api/register', (req, res) => {
  const { nickname, avatar } = req.body
  if (!nickname || nickname.length < 2 || nickname.length > 12) {
    return res.status(400).json({ error: '昵称需要2-12个字符' })
  }
  const id = uuidv4()
  dbRun('INSERT INTO users (id, nickname, avatar) VALUES (?, ?, ?)', [id, nickname, avatar])
  const users = dbQuery('SELECT * FROM users WHERE id = ?', [id])
  res.json({ token: id, user: formatUser(users[0]) })
})

app.get('/api/me', authMiddleware, (req, res) => {
  res.json({ user: formatUser(req.user) })
})

app.put('/api/me/settings', authMiddleware, (req, res) => {
  const { settings } = req.body
  dbRun('UPDATE users SET settings = ? WHERE id = ?', [JSON.stringify(settings), req.user.id])
  res.json({ ok: true })
})

// === Textbooks ===
app.get('/api/selected-textbooks', authMiddleware, (req, res) => {
  const rows = dbQuery('SELECT textbook_id FROM selected_textbooks WHERE user_id = ?', [req.user.id])
  res.json({ textbookIds: rows.map(r => r.textbook_id) })
})

app.post('/api/selected-textbooks', authMiddleware, (req, res) => {
  const { textbookId } = req.body
  try {
    dbRun('INSERT OR IGNORE INTO selected_textbooks (user_id, textbook_id) VALUES (?, ?)', [req.user.id, textbookId])
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.delete('/api/selected-textbooks/:textbookId', authMiddleware, (req, res) => {
  dbRun('DELETE FROM selected_textbooks WHERE user_id = ? AND textbook_id = ?', [req.user.id, req.params.textbookId])
  res.json({ ok: true })
})

// === Level Progress ===
app.get('/api/progress', authMiddleware, (req, res) => {
  const rows = dbQuery('SELECT * FROM level_progress WHERE user_id = ?', [req.user.id])
  const progress = {}
  rows.forEach(r => {
    if (!progress[r.chapter_id]) progress[r.chapter_id] = {}
    progress[r.chapter_id][r.level_id] = {
      levelId: r.level_id,
      bestStars: r.best_stars,
      bestWpm: r.best_wpm,
      bestAccuracy: r.best_accuracy,
      completed: !!r.completed,
      attempts: r.attempts,
    }
  })
  res.json({ progress })
})

app.post('/api/progress', authMiddleware, (req, res) => {
  const { chapterId, levelId, bestStars, bestWpm, bestAccuracy, completed } = req.body
  const existing = dbQuery(
    'SELECT * FROM level_progress WHERE user_id = ? AND chapter_id = ? AND level_id = ?',
    [req.user.id, chapterId, levelId]
  )

  if (existing.length > 0) {
    const e = existing[0]
    dbRun(`UPDATE level_progress SET best_stars = ?, best_wpm = ?, best_accuracy = ?, completed = ?, attempts = ? WHERE user_id = ? AND chapter_id = ? AND level_id = ?`, [
      Math.max(e.best_stars, bestStars),
      Math.max(e.best_wpm, bestWpm),
      Math.max(e.best_accuracy, bestAccuracy),
      completed ? 1 : e.completed,
      e.attempts + 1,
      req.user.id, chapterId, levelId,
    ])
  } else {
    dbRun('INSERT INTO level_progress (user_id, chapter_id, level_id, best_stars, best_wpm, best_accuracy, completed) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, chapterId, levelId, bestStars, bestWpm, bestAccuracy, completed ? 1 : 0])
  }
  res.json({ ok: true })
})

// === Checkin ===
app.get('/api/checkin', authMiddleware, (req, res) => {
  const rows = dbQuery('SELECT * FROM checkin_records WHERE user_id = ?', [req.user.id])
  const records = {}
  rows.forEach(r => {
    records[r.date] = {
      date: r.date, checked: !!r.checked,
      levelsCompleted: r.levels_completed,
      practiceMinutes: r.practice_minutes,
      wpmAvg: r.wpm_avg, accuracyAvg: r.accuracy_avg,
      coinEarned: r.coin_earned, expEarned: r.exp_earned,
    }
  })
  res.json({ records, currentStreak: calcStreak(rows), totalDays: rows.length })
})

app.post('/api/checkin', authMiddleware, (req, res) => {
  const { date, data } = req.body
  dbRun(`INSERT OR REPLACE INTO checkin_records (user_id, date, levels_completed, practice_minutes, wpm_avg, accuracy_avg, coin_earned, exp_earned) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [req.user.id, date, data?.levelsCompleted ?? 0, data?.practiceMinutes ?? 0, data?.wpmAvg ?? 0, data?.accuracyAvg ?? 0, data?.coinEarned ?? 10, data?.expEarned ?? 20])
  dbRun('UPDATE users SET coin = coin + ?, total_exp = total_exp + ? WHERE id = ?', [data?.coinEarned ?? 10, data?.expEarned ?? 20, req.user.id])
  res.json({ ok: true })
})

// === Achievements ===
app.get('/api/achievements', authMiddleware, (req, res) => {
  const rows = dbQuery('SELECT * FROM user_achievements WHERE user_id = ?', [req.user.id])
  res.json({ achievements: rows.map(r => ({ achievementId: r.achievement_id, unlockedAt: r.unlocked_at })) })
})

app.post('/api/achievements', authMiddleware, (req, res) => {
  const { achievementId, exp, coin } = req.body
  try {
    dbRun('INSERT OR IGNORE INTO user_achievements (user_id, achievement_id) VALUES (?, ?)', [req.user.id, achievementId])
    if (exp || coin) {
      dbRun('UPDATE users SET coin = coin + ?, total_exp = total_exp + ?, achievements_count = achievements_count + 1 WHERE id = ?', [coin ?? 0, exp ?? 0, req.user.id])
    }
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// === Stats / Coin / Exp ===
app.post('/api/stats', authMiddleware, (req, res) => {
  const { chars, wpm, minutes } = req.body
  dbRun('UPDATE users SET total_chars_typed = total_chars_typed + ?, highest_wpm = MAX(highest_wpm, ?), total_play_minutes = total_play_minutes + ? WHERE id = ?', [chars ?? 0, wpm ?? 0, minutes ?? 0, req.user.id])
  res.json({ ok: true })
})

app.post('/api/coin/add', authMiddleware, (req, res) => {
  dbRun('UPDATE users SET coin = coin + ? WHERE id = ?', [req.body.amount, req.user.id])
  res.json({ ok: true })
})

app.post('/api/coin/spend', authMiddleware, (req, res) => {
  const users = dbQuery('SELECT coin FROM users WHERE id = ?', [req.user.id])
  if (users[0].coin < req.body.amount) return res.status(400).json({ error: '金币不足' })
  dbRun('UPDATE users SET coin = coin - ? WHERE id = ?', [req.body.amount, req.user.id])
  res.json({ ok: true })
})

app.post('/api/exp', authMiddleware, (req, res) => {
  const { amount } = req.body
  const users = dbQuery('SELECT exp, total_exp, level FROM users WHERE id = ?', [req.user.id])
  const u = users[0]
  let newExp = u.exp + amount, newTotal = u.total_exp + amount, newLevel = u.level
  function expNeeded(l) { return Math.ceil(100 * l * 1.2) }
  while (newExp >= expNeeded(newLevel)) { newExp -= expNeeded(newLevel); newLevel++ }
  dbRun('UPDATE users SET exp = ?, total_exp = ?, level = ? WHERE id = ?', [newExp, newTotal, newLevel, req.user.id])
  res.json({ level: newLevel, exp: newExp, totalExp: newTotal })
})

// Graceful shutdown
process.on('SIGINT', () => { saveDB(); process.exit(0) })
process.on('SIGTERM', () => { saveDB(); process.exit(0) })

initDB().then(() => {
  app.listen(PORT, () => console.log(`TypeHero server running on port ${PORT}`))
})
