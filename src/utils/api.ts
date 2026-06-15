const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function getToken(): string | null {
  return localStorage.getItem('typehero_token')
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const api = {
  register: (nickname: string, avatar: string) =>
    request<{ token: string; user: any }>('/api/register', {
      method: 'POST',
      body: JSON.stringify({ nickname, avatar }),
    }),

  getMe: () => request<{ user: any }>('/api/me'),

  updateSettings: (settings: any) =>
    request('/api/me/settings', {
      method: 'PUT',
      body: JSON.stringify({ settings }),
    }),

  getSelectedTextbooks: () =>
    request<{ textbookIds: string[] }>('/api/selected-textbooks'),

  selectTextbook: (textbookId: string) =>
    request('/api/selected-textbooks', {
      method: 'POST',
      body: JSON.stringify({ textbookId }),
    }),

  unselectTextbook: (textbookId: string) =>
    request(`/api/selected-textbooks/${textbookId}`, { method: 'DELETE' }),

  getProgress: () =>
    request<{ progress: Record<string, Record<string, any>> }>('/api/progress'),

  saveProgress: (chapterId: string, levelId: string, data: any) =>
    request('/api/progress', {
      method: 'POST',
      body: JSON.stringify({ chapterId, levelId, ...data }),
    }),

  getCheckin: () =>
    request<{ records: Record<string, any>; currentStreak: number; totalDays: number }>('/api/checkin'),

  checkin: (date: string, data?: any) =>
    request('/api/checkin', {
      method: 'POST',
      body: JSON.stringify({ date, data }),
    }),

  getAchievements: () =>
    request<{ achievements: any[] }>('/api/achievements'),

  unlockAchievement: (achievementId: string, exp?: number, coin?: number) =>
    request('/api/achievements', {
      method: 'POST',
      body: JSON.stringify({ achievementId, exp, coin }),
    }),

  updateStats: (chars: number, wpm: number, minutes: number) =>
    request('/api/stats', {
      method: 'POST',
      body: JSON.stringify({ chars, wpm, minutes }),
    }),

  addCoin: (amount: number) =>
    request('/api/coin/add', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    }),

  spendCoin: (amount: number) =>
    request('/api/coin/spend', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    }),

  addExp: (amount: number) =>
    request<{ level: number; exp: number; totalExp: number }>('/api/exp', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    }),
}
