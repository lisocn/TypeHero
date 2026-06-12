export interface ContentItem {
  display: string
  input: string
  hint?: string
}

export interface LevelContent {
  mode: 'char' | 'word' | 'sentence' | 'paragraph'
  items: ContentItem[]
  language?: 'en' | 'zh-pinyin' | 'zh-hanzi'
}

export interface Level {
  id: string
  title: string
  type: 'warmup' | 'basic' | 'advanced' | 'boss'
  order: number
  content: LevelContent
  targetWPM: { bronze: number; silver: number; gold: number }
  targetAccuracy: { bronze: number; silver: number; gold: number }
  timeLimit: number
  reward: { exp: number; coin: number }
}

export interface Chapter {
  id: string
  title: string
  subtitle: string
  subject: 'english' | 'chinese'
  order: number
  icon: string
  levels: Level[]
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'eng-3a-u1',
    title: '字母王国',
    subtitle: 'PEP 三年级上 Unit 1',
    subject: 'english',
    order: 1,
    icon: '🏫',
    levels: [
      {
        id: 'eng-3a-u1-l1',
        title: '字母击落',
        type: 'warmup',
        order: 1,
        content: {
          mode: 'char',
          items: [
            { display: 'r', input: 'r' },
            { display: 'u', input: 'u' },
            { display: 'l', input: 'l' },
            { display: 'e', input: 'e' },
            { display: 'r', input: 'r' },
          ],
        },
        targetWPM: { bronze: 15, silver: 25, gold: 35 },
        targetAccuracy: { bronze: 80, silver: 90, gold: 97 },
        timeLimit: 0,
        reward: { exp: 30, coin: 10 },
      },
      {
        id: 'eng-3a-u1-l2',
        title: '单词狩猎',
        type: 'basic',
        order: 2,
        content: {
          mode: 'word',
          items: [
            { display: 'ruler', input: 'ruler' },
            { display: 'pencil', input: 'pencil' },
            { display: 'eraser', input: 'eraser' },
            { display: 'crayon', input: 'crayon' },
            { display: 'bag', input: 'bag' },
            { display: 'pen', input: 'pen' },
            { display: 'book', input: 'book' },
            { display: 'pencil box', input: 'pencil box' },
          ],
        },
        targetWPM: { bronze: 15, silver: 25, gold: 35 },
        targetAccuracy: { bronze: 80, silver: 90, gold: 97 },
        timeLimit: 0,
        reward: { exp: 30, coin: 10 },
      },
      {
        id: 'eng-3a-u1-l3',
        title: '句子结界',
        type: 'advanced',
        order: 3,
        content: {
          mode: 'sentence',
          items: [
            { display: 'I have a ruler.', input: 'I have a ruler.' },
            { display: 'I have a pencil.', input: 'I have a pencil.' },
            { display: 'Me too!', input: 'Me too!' },
          ],
        },
        targetWPM: { bronze: 15, silver: 25, gold: 35 },
        targetAccuracy: { bronze: 80, silver: 90, gold: 97 },
        timeLimit: 0,
        reward: { exp: 30, coin: 10 },
      },
      {
        id: 'eng-3a-u1-l4',
        title: 'Hello对话',
        type: 'basic',
        order: 4,
        content: {
          mode: 'sentence',
          items: [
            { display: 'Hello!', input: 'Hello!' },
            { display: 'Hi!', input: 'Hi!' },
            { display: "What's your name?", input: "What's your name?" },
            { display: 'My name is Mike.', input: 'My name is Mike.' },
          ],
        },
        targetWPM: { bronze: 15, silver: 25, gold: 35 },
        targetAccuracy: { bronze: 80, silver: 90, gold: 97 },
        timeLimit: 0,
        reward: { exp: 30, coin: 10 },
      },
      {
        id: 'eng-3a-u1-l5',
        title: '快速字母',
        type: 'warmup',
        order: 5,
        content: {
          mode: 'char',
          items: [
            { display: 'a', input: 'a' },
            { display: 'b', input: 'b' },
            { display: 'c', input: 'c' },
            { display: 'd', input: 'd' },
            { display: 'e', input: 'e' },
            { display: 'f', input: 'f' },
            { display: 'g', input: 'g' },
            { display: 'h', input: 'h' },
          ],
        },
        targetWPM: { bronze: 15, silver: 25, gold: 35 },
        targetAccuracy: { bronze: 80, silver: 90, gold: 97 },
        timeLimit: 30,
        reward: { exp: 30, coin: 10 },
      },
      {
        id: 'eng-3a-u1-l6',
        title: '对话对决',
        type: 'boss',
        order: 6,
        content: {
          mode: 'paragraph',
          items: [
            { display: "Hello! I'm Wu Binbin.", input: "Hello! I'm Wu Binbin.", hint: '吴彬彬打招呼' },
            { display: "Hi! I'm Mike.", input: "Hi! I'm Mike.", hint: '你来回应' },
            { display: "What's your name?", input: "What's your name?" },
            { display: 'My name is John.', input: 'My name is John.' },
          ],
        },
        targetWPM: { bronze: 15, silver: 25, gold: 35 },
        targetAccuracy: { bronze: 80, silver: 90, gold: 97 },
        timeLimit: 0,
        reward: { exp: 50, coin: 30 },
      },
    ],
  },
  {
    id: 'eng-3a-u2',
    title: '色彩森林',
    subtitle: 'PEP 三年级上 Unit 2',
    subject: 'english',
    order: 2,
    icon: '🌈',
    levels: [
      {
        id: 'eng-3a-u2-l1',
        title: '颜色字母',
        type: 'warmup',
        order: 1,
        content: {
          mode: 'word',
          items: [
            { display: 'red', input: 'red' },
            { display: 'yellow', input: 'yellow' },
            { display: 'green', input: 'green' },
            { display: 'blue', input: 'blue' },
            { display: 'white', input: 'white' },
            { display: 'black', input: 'black' },
          ],
        },
        targetWPM: { bronze: 15, silver: 25, gold: 35 },
        targetAccuracy: { bronze: 80, silver: 90, gold: 97 },
        timeLimit: 0,
        reward: { exp: 30, coin: 10 },
      },
      {
        id: 'eng-3a-u2-l2',
        title: '彩色单词',
        type: 'basic',
        order: 2,
        content: {
          mode: 'word',
          items: [
            { display: 'orange', input: 'orange' },
            { display: 'brown', input: 'brown' },
            { display: 'purple', input: 'purple' },
            { display: 'pink', input: 'pink' },
          ],
        },
        targetWPM: { bronze: 15, silver: 25, gold: 35 },
        targetAccuracy: { bronze: 80, silver: 90, gold: 97 },
        timeLimit: 0,
        reward: { exp: 30, coin: 10 },
      },
      {
        id: 'eng-3a-u2-l3',
        title: '颜色句子',
        type: 'advanced',
        order: 3,
        content: {
          mode: 'sentence',
          items: [
            { display: 'I see red.', input: 'I see red.' },
            { display: 'Colour it blue.', input: 'Colour it blue.' },
            { display: 'Show me green.', input: 'Show me green.' },
          ],
        },
        targetWPM: { bronze: 15, silver: 25, gold: 35 },
        targetAccuracy: { bronze: 80, silver: 90, gold: 97 },
        timeLimit: 0,
        reward: { exp: 30, coin: 10 },
      },
      {
        id: 'eng-3a-u2-l4',
        title: '混合练习',
        type: 'basic',
        order: 4,
        content: {
          mode: 'word',
          items: [
            { display: 'red', input: 'red' },
            { display: 'yellow', input: 'yellow' },
            { display: 'green', input: 'green' },
            { display: 'blue', input: 'blue' },
            { display: 'white', input: 'white' },
            { display: 'black', input: 'black' },
            { display: 'orange', input: 'orange' },
            { display: 'brown', input: 'brown' },
          ],
        },
        targetWPM: { bronze: 15, silver: 25, gold: 35 },
        targetAccuracy: { bronze: 80, silver: 90, gold: 97 },
        timeLimit: 0,
        reward: { exp: 30, coin: 10 },
      },
      {
        id: 'eng-3a-u2-l5',
        title: '快速颜色',
        type: 'warmup',
        order: 5,
        content: {
          mode: 'word',
          items: [
            { display: 'red', input: 'red' },
            { display: 'blue', input: 'blue' },
            { display: 'green', input: 'green' },
          ],
        },
        targetWPM: { bronze: 15, silver: 25, gold: 35 },
        targetAccuracy: { bronze: 80, silver: 90, gold: 97 },
        timeLimit: 30,
        reward: { exp: 30, coin: 10 },
      },
      {
        id: 'eng-3a-u2-l6',
        title: '彩虹对决',
        type: 'boss',
        order: 6,
        content: {
          mode: 'paragraph',
          items: [
            { display: 'I see red and blue.', input: 'I see red and blue.' },
            { display: 'Colour it green.', input: 'Colour it green.' },
            { display: 'Show me yellow.', input: 'Show me yellow.' },
          ],
        },
        targetWPM: { bronze: 15, silver: 25, gold: 35 },
        targetAccuracy: { bronze: 80, silver: 90, gold: 97 },
        timeLimit: 0,
        reward: { exp: 50, coin: 30 },
      },
    ],
  },
  {
    id: 'ch-3a-poem-01',
    title: '诗意江湖',
    subtitle: '三年级上 · 古诗词',
    subject: 'chinese',
    order: 3,
    icon: '🏔️',
    levels: [
      {
        id: 'ch-3a-poem-01-l1',
        title: '拼音搭桥',
        type: 'warmup',
        order: 1,
        content: {
          mode: 'word',
          language: 'zh-pinyin',
          items: [
            { display: 'tian men', input: 'tian men' },
            { display: 'zhong duan', input: 'zhong duan' },
            { display: 'chu jiang', input: 'chu jiang' },
          ],
        },
        targetWPM: { bronze: 15, silver: 25, gold: 35 },
        targetAccuracy: { bronze: 80, silver: 90, gold: 97 },
        timeLimit: 0,
        reward: { exp: 30, coin: 10 },
      },
      {
        id: 'ch-3a-poem-01-l2',
        title: '逐句默写',
        type: 'basic',
        order: 2,
        content: {
          mode: 'sentence',
          language: 'zh-hanzi',
          items: [
            { display: '天门中断楚江开', input: '天门中断楚江开' },
            { display: '碧水东流至此回', input: '碧水东流至此回' },
            { display: '两岸青山相对出', input: '两岸青山相对出' },
            { display: '孤帆一片日边来', input: '孤帆一片日边来' },
          ],
        },
        targetWPM: { bronze: 15, silver: 25, gold: 35 },
        targetAccuracy: { bronze: 80, silver: 90, gold: 97 },
        timeLimit: 0,
        reward: { exp: 30, coin: 10 },
      },
      {
        id: 'ch-3a-poem-01-l3',
        title: '全诗默写',
        type: 'advanced',
        order: 3,
        content: {
          mode: 'paragraph',
          language: 'zh-hanzi',
          items: [
            { display: '望天门山', input: '望天门山', hint: '题目' },
            { display: '唐 李白', input: '唐 李白', hint: '作者' },
            { display: '天门中断楚江开', input: '天门中断楚江开' },
            { display: '碧水东流至此回', input: '碧水东流至此回' },
            { display: '两岸青山相对出', input: '两岸青山相对出' },
            { display: '孤帆一片日边来', input: '孤帆一片日边来' },
          ],
        },
        targetWPM: { bronze: 15, silver: 25, gold: 35 },
        targetAccuracy: { bronze: 80, silver: 90, gold: 97 },
        timeLimit: 0,
        reward: { exp: 50, coin: 20 },
      },
    ],
  },
]
