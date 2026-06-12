import { useNavigate } from 'react-router-dom'

const MINI_GAMES = [
  { id: 'letter-rain', name: '字母雨', icon: '🌧️', description: '字母从天而降，按下对应键击碎！' },
  { id: 'idiom-chain', name: '成语接龙', icon: '🔗', description: '输入成语接龙，看你能接多少个！' },
  { id: 'poetry-challenge', name: '诗词飞花令', icon: '🌸', description: '给定主题字，输入古诗句！' },
  { id: 'word-match', name: '单词消消乐', icon: '🎯', description: '快速输入单词消除方块！' },
  { id: 'text-repair', name: '课文修复师', icon: '🔧', description: '修复被损坏的课文内容！' },
]

export default function MiniGames() {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-[var(--color-accent-gold)]">🎮 趣味小游戏</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {MINI_GAMES.map(game => (
          <button
            key={game.id}
            className="bg-[var(--color-bg-secondary)] rounded-xl p-6 text-center hover:bg-slate-700 transition-all hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/mini-games/${game.id}`)}
          >
            <div className="text-4xl mb-3">{game.icon}</div>
            <h3 className="text-lg font-bold mb-1">{game.name}</h3>
            <p className="text-xs text-[var(--color-text-secondary)]">{game.description}</p>
          </button>
        ))}
      </div>

      <div className="text-center mt-8 text-[var(--color-text-secondary)] text-sm">
        更多游戏持续开发中...
      </div>
    </div>
  )
}
