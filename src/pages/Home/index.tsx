import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/userStore'
import Button from '../../components/Button'
import './home.css'
import { useEnterAction } from '../../hooks/useEnterAction'
import KeyboardHint from '../../components/KeyboardHint'

const FEATURES = [
  { icon: '📖', title: '教材同步', description: '三至六年级语文、英语，把课本里的知识练在指尖。', label: '01 / 学有所用' },
  { icon: '🎮', title: '趣味闯关', description: '从热身到挑战，一关一关解锁你的键盘冒险。', label: '02 / 越练越强' },
  { icon: '🏆', title: '英雄成长', description: '积累经验、收集奖章，让每一次进步都有回响。', label: '03 / 记录进步' },
]
const KEY_ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']

export default function Home() {
  const navigate = useNavigate()
  const isLoggedIn = useUserStore(s => s.isLoggedIn)
  useEnterAction(() => navigate('/login'), !isLoggedIn)

  useEffect(() => {
    if (isLoggedIn) navigate('/textbook-select')
  }, [isLoggedIn, navigate])

  return (
    <div className="home-page">
      <div className="home-shell">
        <header className="home-header">
          <span className="home-brand">⌨ <span>TypeHero</span></span>
          <span className="home-header-note">每天一点练习，每天一点进步</span>
        </header>

        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-intro">
            <span className="home-eyebrow"><span /> 为小学三至六年级打造的打字冒险</span>
            <h1 id="home-title" className="home-title">TypeHero</h1>
            <h2 className="home-subtitle">打字小英雄</h2>
            <p className="home-description">成为键盘英雄，征服文字世界！<br />从第一个字母开始，把每一次敲击变成成长。</p>
            <Button size="lg" className="home-start" onClick={() => navigate('/login')}>
              <span aria-hidden="true">🚀</span> 开始冒险 <span aria-hidden="true">→</span>
            </Button>
            <p className="home-start-note">选择你的教材，开启专属练习旅程</p>
            <KeyboardHint>开始冒险</KeyboardHint>
          </div>

          <div className="home-demo" aria-label="打字练习示意">
            <div className="home-demo-heading"><span><span className="home-demo-dot" /> 你的键盘冒险，从这里开始</span><span className="home-demo-tag">练习示意</span></div>
            <div className="home-demo-content">
              <span className="home-demo-label">每一个字母，都是进步</span>
              <p className="home-demo-word"><span>He</span><span className="home-demo-cursor">l</span>lo, hero!</p>
              <p className="home-demo-hint">跟随提示，敲下你的下一个字母</p>
              <div className="home-keyboard" aria-hidden="true">
                {KEY_ROWS.map(row => (
                  <div className="home-key-row" key={row}>
                    {row.split('').map(key => <span key={key} className={`home-key${key === 'L' ? ' home-key-active' : ''}`}>{key}</span>)}
                  </div>
                ))}
                <div className="home-key-row"><span className="home-space-key">SPACE</span></div>
              </div>
            </div>
            <div className="home-demo-footer"><span>字母 → 单词 → 句子 → 篇章</span><span>一步一步，成为英雄 ✨</span></div>
          </div>
        </section>

        <section className="home-features" aria-label="练习特色">
          {FEATURES.map(feature => (
            <article className="home-feature" key={feature.title}>
              <span className="home-feature-icon" aria-hidden="true">{feature.icon}</span>
              <div><span className="home-feature-label">{feature.label}</span><h3>{feature.title}</h3><p>{feature.description}</p></div>
            </article>
          ))}
        </section>
      </div>
    </div>
  )
}
