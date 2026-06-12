import { useState } from 'react'
import { useUserStore } from '../../stores/userStore'
import Modal from '../../components/Modal'
import Button from '../../components/Button'

interface ShopItem {
  id: string
  name: string
  category: string
  price: number
  icon: string
  description: string
}

const SHOP_ITEMS: ShopItem[] = [
  { id: 'skin-ninja', name: '忍者皮肤', category: '角色皮肤', price: 200, icon: '🥷', description: '暗夜忍者造型' },
  { id: 'skin-princess', name: '公主皮肤', category: '角色皮肤', price: 200, icon: '👸', description: '闪耀公主造型' },
  { id: 'skin-knight', name: '骑士皮肤', category: '角色皮肤', price: 300, icon: '🐉', description: '龙骑士造型' },
  { id: 'skin-astronaut', name: '宇航员皮肤', category: '角色皮肤', price: 300, icon: '👨‍🚀', description: '太空探索者造型' },
  { id: 'keyboard-neon', name: '霓虹键盘', category: '键盘特效', price: 150, icon: '🌈', description: '炫彩霓虹效果' },
  { id: 'keyboard-fire', name: '烈焰键盘', category: '键盘特效', price: 200, icon: '🔥', description: '火焰按键特效' },
  { id: 'pet-cat', name: '猫咪伙伴', category: '宠物伙伴', price: 500, icon: '🐱', description: '可爱的小猫咪' },
  { id: 'pet-dragon', name: '小龙伙伴', category: '宠物伙伴', price: 800, icon: '🐲', description: '迷你小龙' },
  { id: 'title-gold', name: '金色边框', category: '称号边框', price: 200, icon: '✨', description: '金色称号边框' },
  { id: 'title-diamond', name: '钻石边框', category: '称号边框', price: 300, icon: '💎', description: '钻石称号边框' },
  { id: 'patch-card', name: '补签卡', category: '道具', price: 50, icon: '🎫', description: '补签一天打卡' },
  { id: 'hint-card', name: '提示卡', category: '道具', price: 30, icon: '💡', description: '跳过1个字符' },
]

const CATEGORIES = ['全部', '角色皮肤', '键盘特效', '宠物伙伴', '称号边框', '道具']

export default function Shop() {
  const [category, setCategory] = useState('全部')
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null)
  const [owned, setOwned] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('typehero-owned') || '[]')
  })
  const user = useUserStore(s => s.user)
  const spendCoin = useUserStore(s => s.spendCoin)

  const filtered = category === '全部' ? SHOP_ITEMS : SHOP_ITEMS.filter(i => i.category === category)

  const handleBuy = (item: ShopItem) => {
    if (spendCoin(item.price)) {
      const newOwned = [...owned, item.id]
      setOwned(newOwned)
      localStorage.setItem('typehero-owned', JSON.stringify(newOwned))
      setSelectedItem(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-2 text-[var(--color-accent-gold)]">🛒 金币商店</h1>
      <div className="text-center mb-6">
        <span className="text-[var(--color-text-secondary)]">金币余额: </span>
        <span className="text-xl font-bold text-[var(--color-accent-gold)]">{user?.coin ?? 0} 🪙</span>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap cursor-pointer transition-all ${
              category === c
                ? 'bg-[var(--color-accent-blue)] text-white'
                : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map(item => {
          const isOwned = owned.includes(item.id)
          const canAfford = (user?.coin ?? 0) >= item.price

          return (
            <button
              key={item.id}
              onClick={() => !isOwned && setSelectedItem(item)}
              className={`bg-[var(--color-bg-secondary)] rounded-xl p-4 text-center transition-all cursor-pointer hover:scale-105 ${
                isOwned ? 'opacity-60' : ''
              }`}
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-sm font-bold mb-1">{item.name}</div>
              {isOwned ? (
                <div className="text-xs text-[var(--color-accent-green)]">已拥有</div>
              ) : (
                <div className={`text-xs font-semibold ${canAfford ? 'text-[var(--color-accent-gold)]' : 'text-gray-500'}`}>
                  {item.price} 🪙
                </div>
              )}
            </button>
          )
        })}
      </div>

      <Modal open={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.name}>
        {selectedItem && (
          <div className="text-center">
            <div className="text-5xl mb-3">{selectedItem.icon}</div>
            <p className="text-[var(--color-text-secondary)] mb-4">{selectedItem.description}</p>
            <p className="text-lg font-bold text-[var(--color-accent-gold)] mb-4">{selectedItem.price} 🪙</p>
            <Button
              onClick={() => handleBuy(selectedItem)}
              disabled={(user?.coin ?? 0) < selectedItem.price}
              className="w-full"
            >
              {(user?.coin ?? 0) >= selectedItem.price ? '确认购买' : '金币不足'}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
