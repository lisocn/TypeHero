import type { Textbook, Grade, Subject } from './types'

function wpm(grade: number) {
  return { bronze: grade * 5, silver: grade * 8, gold: grade * 11 }
}
const acc = { bronze: 80, silver: 90, gold: 97 }

function lvl(
  id: string, title: string, type: 'warmup' | 'basic' | 'advanced' | 'boss',
  order: number, mode: 'char' | 'word' | 'sentence' | 'paragraph',
  items: { display: string; input: string; hint?: string }[],
  language?: 'en' | 'zh-pinyin' | 'zh-hanzi', timeLimit = 0
) {
  return {
    id, title, type, order,
    content: { mode, items, ...(language ? { language } : {}) },
    targetWPM: { bronze: 0, silver: 0, gold: 0 },
    targetAccuracy: acc, timeLimit,
    reward: { exp: type === 'boss' ? 50 : 30, coin: type === 'boss' ? 30 : 10 },
  }
}

const TEXTBOOKS: Textbook[] = [
  // ==================== ENGLISH GRADE 3 ====================
  {
    id: 'eng-3a', title: '三年级上册', subtitle: 'PEP 三年级上', subject: 'english', grade: 3, semester: 'a',
    chapters: [
      {
        id: 'eng-3a-ch1', title: 'School Supplies', subtitle: 'Unit 1 学校用品', order: 1, icon: '🏫',
        levels: [
          lvl('eng-3a-ch1-l1', '字母热身', 'warmup', 1, 'char', [
            { display: 'r', input: 'r' }, { display: 'u', input: 'u' }, { display: 'l', input: 'l' },
            { display: 'e', input: 'e' }, { display: 'r', input: 'r' }, { display: 'p', input: 'p' },
          ]),
          lvl('eng-3a-ch1-l2', '单词狩猎', 'basic', 2, 'word', [
            { display: 'ruler', input: 'ruler' }, { display: 'pencil', input: 'pencil' },
            { display: 'eraser', input: 'eraser' }, { display: 'crayon', input: 'crayon' },
            { display: 'bag', input: 'bag' }, { display: 'pen', input: 'pen' },
          ]),
          lvl('eng-3a-ch1-l3', '句子结界', 'advanced', 3, 'sentence', [
            { display: 'I have a ruler.', input: 'I have a ruler.' },
            { display: 'I have a pencil.', input: 'I have a pencil.' },
            { display: 'Me too!', input: 'Me too!' },
          ]),
          lvl('eng-3a-ch1-l4', '对话对决', 'boss', 4, 'paragraph', [
            { display: "What's your name?", input: "What's your name?" },
            { display: 'My name is Mike.', input: 'My name is Mike.' },
            { display: 'Hello! I am Wu Binbin.', input: 'Hello! I am Wu Binbin.' },
          ]),
        ],
      },
      {
        id: 'eng-3a-ch2', title: 'Colours', subtitle: 'Unit 2 颜色', order: 2, icon: '🌈',
        levels: [
          lvl('eng-3a-ch2-l1', '颜色字母', 'warmup', 1, 'word', [
            { display: 'red', input: 'red' }, { display: 'blue', input: 'blue' },
            { display: 'green', input: 'green' }, { display: 'yellow', input: 'yellow' },
          ]),
          lvl('eng-3a-ch2-l2', '彩色单词', 'basic', 2, 'word', [
            { display: 'white', input: 'white' }, { display: 'black', input: 'black' },
            { display: 'orange', input: 'orange' }, { display: 'brown', input: 'brown' },
          ]),
          lvl('eng-3a-ch2-l3', '颜色句子', 'advanced', 3, 'sentence', [
            { display: 'I see red.', input: 'I see red.' },
            { display: 'Colour it blue.', input: 'Colour it blue.' },
            { display: 'Show me green.', input: 'Show me green.' },
          ]),
        ],
      },
    ],
  },
  {
    id: 'eng-3b', title: '三年级下册', subtitle: 'PEP 三年级下', subject: 'english', grade: 3, semester: 'b',
    chapters: [
      {
        id: 'eng-3b-ch1', title: 'Welcome Back', subtitle: 'Unit 1 欢迎回来', order: 1, icon: '👋',
        levels: [
          lvl('eng-3b-ch1-l1', '字母热身', 'warmup', 1, 'char', [
            { display: 'u', input: 'u' }, { display: 'k', input: 'k' }, { display: 'n', input: 'n' },
            { display: 'o', input: 'o' }, { display: 'w', input: 'w' },
          ]),
          lvl('eng-3b-ch1-l2', '单词练习', 'basic', 2, 'word', [
            { display: 'UK', input: 'UK' }, { display: 'Canada', input: 'Canada' },
            { display: 'USA', input: 'USA' }, { display: 'China', input: 'China' },
          ]),
          lvl('eng-3b-ch1-l3', '句子练习', 'advanced', 3, 'sentence', [
            { display: 'Where are you from?', input: 'Where are you from?' },
            { display: 'I am from China.', input: 'I am from China.' },
          ]),
        ],
      },
      {
        id: 'eng-3b-ch2', title: 'My Family', subtitle: 'Unit 2 我的家庭', order: 2, icon: '👨‍👩‍👧‍👦',
        levels: [
          lvl('eng-3b-ch2-l1', '家庭词汇', 'basic', 1, 'word', [
            { display: 'father', input: 'father' }, { display: 'mother', input: 'mother' },
            { display: 'brother', input: 'brother' }, { display: 'sister', input: 'sister' },
            { display: 'man', input: 'man' }, { display: 'woman', input: 'woman' },
          ]),
          lvl('eng-3b-ch2-l2', '介绍家人', 'advanced', 2, 'sentence', [
            { display: 'This is my father.', input: 'This is my father.' },
            { display: 'This is my mother.', input: 'This is my mother.' },
            { display: 'She is my sister.', input: 'She is my sister.' },
          ]),
        ],
      },
    ],
  },

  // ==================== ENGLISH GRADE 4 ====================
  {
    id: 'eng-4a', title: '四年级上册', subtitle: 'PEP 四年级上', subject: 'english', grade: 4, semester: 'a',
    chapters: [
      {
        id: 'eng-4a-ch1', title: 'My Classroom', subtitle: 'Unit 1 我的教室', order: 1, icon: '🏢',
        levels: [
          lvl('eng-4a-ch1-l1', '字母练习', 'warmup', 1, 'char', [
            { display: 'c', input: 'c' }, { display: 'l', input: 'l' }, { display: 'a', input: 'a' },
            { display: 's', input: 's' }, { display: 'r', input: 'r' },
          ]),
          lvl('eng-4a-ch1-l2', '教室单词', 'basic', 2, 'word', [
            { display: 'classroom', input: 'classroom' }, { display: 'window', input: 'window' },
            { display: 'blackboard', input: 'blackboard' }, { display: 'light', input: 'light' },
            { display: 'picture', input: 'picture' }, { display: 'door', input: 'door' },
          ]),
          lvl('eng-4a-ch1-l3', '教室对话', 'advanced', 3, 'sentence', [
            { display: 'What is in the classroom?', input: 'What is in the classroom?' },
            { display: 'One blackboard, one TV.', input: 'One blackboard, one TV.' },
            { display: 'Let me clean the window.', input: 'Let me clean the window.' },
          ]),
        ],
      },
      {
        id: 'eng-4a-ch2', title: 'My Schoolbag', subtitle: 'Unit 2 我的书包', order: 2, icon: '🎒',
        levels: [
          lvl('eng-4a-ch2-l1', '书包单词', 'basic', 1, 'word', [
            { display: 'schoolbag', input: 'schoolbag' }, { display: 'maths book', input: 'maths book' },
            { display: 'English book', input: 'English book' }, { display: 'Chinese book', input: 'Chinese book' },
            { display: 'storybook', input: 'storybook' }, { display: 'candy', input: 'candy' },
          ]),
          lvl('eng-4a-ch2-l2', '书包句子', 'advanced', 2, 'sentence', [
            { display: 'What colour is your schoolbag?', input: 'What colour is your schoolbag?' },
            { display: 'It is black and white.', input: 'It is black and white.' },
            { display: 'I have a new schoolbag.', input: 'I have a new schoolbag.' },
          ]),
        ],
      },
    ],
  },
  {
    id: 'eng-4b', title: '四年级下册', subtitle: 'PEP 四年级下', subject: 'english', grade: 4, semester: 'b',
    chapters: [
      {
        id: 'eng-4b-ch1', title: 'My School', subtitle: 'Unit 1 我的学校', order: 1, icon: '🏫',
        levels: [
          lvl('eng-4b-ch1-l1', '学校词汇', 'basic', 1, 'word', [
            { display: 'first floor', input: 'first floor' }, { display: 'second floor', input: 'second floor' },
            { display: 'playground', input: 'playground' }, { display: 'garden', input: 'garden' },
            { display: 'library', input: 'library' }, { display: 'teacher office', input: 'teacher office' },
          ]),
          lvl('eng-4b-ch1-l2', '学校对话', 'advanced', 2, 'sentence', [
            { display: 'Where is the library?', input: 'Where is the library?' },
            { display: 'It is on the first floor.', input: 'It is on the first floor.' },
            { display: 'This is my school.', input: 'This is my school.' },
          ]),
        ],
      },
      {
        id: 'eng-4b-ch2', title: 'Weather', subtitle: 'Unit 2 天气', order: 2, icon: '🌤️',
        levels: [
          lvl('eng-4b-ch2-l1', '天气单词', 'basic', 1, 'word', [
            { display: 'warm', input: 'warm' }, { display: 'cold', input: 'cold' },
            { display: 'cool', input: 'cool' }, { display: 'hot', input: 'hot' },
            { display: 'sunny', input: 'sunny' }, { display: 'windy', input: 'windy' },
          ]),
          lvl('eng-4b-ch2-l2', '天气对话', 'advanced', 2, 'sentence', [
            { display: "What's the weather like?", input: "What's the weather like?" },
            { display: 'It is sunny and warm.', input: 'It is sunny and warm.' },
            { display: 'Can I go outside?', input: 'Can I go outside?' },
          ]),
        ],
      },
    ],
  },

  // ==================== ENGLISH GRADE 5 ====================
  {
    id: 'eng-5a', title: '五年级上册', subtitle: 'PEP 五年级上', subject: 'english', grade: 5, semester: 'a',
    chapters: [
      {
        id: 'eng-5a-ch1', title: "What's He Like?", subtitle: 'Unit 1 他是什么样的人', order: 1, icon: '👤',
        levels: [
          lvl('eng-5a-ch1-l1', '描述词汇', 'basic', 1, 'word', [
            { display: 'old', input: 'old' }, { display: 'young', input: 'young' },
            { display: 'funny', input: 'funny' }, { display: 'kind', input: 'kind' },
            { display: 'strict', input: 'strict' }, { display: 'polite', input: 'polite' },
            { display: 'clever', input: 'clever' }, { display: 'hard-working', input: 'hard-working' },
          ]),
          lvl('eng-5a-ch1-l2', '描述人物', 'advanced', 2, 'sentence', [
            { display: 'Who is your English teacher?', input: 'Who is your English teacher?' },
            { display: 'Miss White is very kind.', input: 'Miss White is very kind.' },
            { display: 'He is tall and funny.', input: 'He is tall and funny.' },
          ]),
        ],
      },
      {
        id: 'eng-5a-ch2', title: 'My Week', subtitle: 'Unit 2 我的一周', order: 2, icon: '📅',
        levels: [
          lvl('eng-5a-ch2-l1', '星期词汇', 'basic', 1, 'word', [
            { display: 'Monday', input: 'Monday' }, { display: 'Tuesday', input: 'Tuesday' },
            { display: 'Wednesday', input: 'Wednesday' }, { display: 'Thursday', input: 'Thursday' },
            { display: 'Friday', input: 'Friday' }, { display: 'Saturday', input: 'Saturday' },
            { display: 'Sunday', input: 'Sunday' },
          ]),
          lvl('eng-5a-ch2-l2', '课程句子', 'advanced', 2, 'sentence', [
            { display: 'What do you have on Monday?', input: 'What do you have on Monday?' },
            { display: 'I have English and maths.', input: 'I have English and maths.' },
            { display: 'I like Wednesdays.', input: 'I like Wednesdays.' },
          ]),
        ],
      },
    ],
  },
  {
    id: 'eng-5b', title: '五年级下册', subtitle: 'PEP 五年级下', subject: 'english', grade: 5, semester: 'b',
    chapters: [
      {
        id: 'eng-5b-ch1', title: 'My Day', subtitle: 'Unit 1 我的一天', order: 1, icon: '⏰',
        levels: [
          lvl('eng-5b-ch1-l1', '日常词汇', 'basic', 1, 'word', [
            { display: 'eat breakfast', input: 'eat breakfast' }, { display: 'do morning exercises', input: 'do morning exercises' },
            { display: 'have class', input: 'have class' }, { display: 'play sports', input: 'play sports' },
            { display: 'eat dinner', input: 'eat dinner' }, { display: 'clean my room', input: 'clean my room' },
          ]),
          lvl('eng-5b-ch1-l2', '日常对话', 'advanced', 2, 'sentence', [
            { display: 'When do you get up?', input: 'When do you get up?' },
            { display: 'I get up at 6 o\'clock.', input: "I get up at 6 o'clock." },
            { display: 'I usually eat dinner at 7 p.m.', input: 'I usually eat dinner at 7 p.m.' },
          ]),
        ],
      },
      {
        id: 'eng-5b-ch2', title: 'My Favourite Season', subtitle: 'Unit 2 我最喜欢的季节', order: 2, icon: '🌸',
        levels: [
          lvl('eng-5b-ch2-l1', '季节词汇', 'basic', 1, 'word', [
            { display: 'spring', input: 'spring' }, { display: 'summer', input: 'summer' },
            { display: 'autumn', input: 'autumn' }, { display: 'winter', input: 'winter' },
            { display: 'season', input: 'season' }, { display: 'vacation', input: 'vacation' },
          ]),
          lvl('eng-5b-ch2-l2', '季节句子', 'advanced', 2, 'sentence', [
            { display: 'Which season do you like best?', input: 'Which season do you like best?' },
            { display: 'I like spring best.', input: 'I like spring best.' },
            { display: 'I can go swimming in summer.', input: 'I can go swimming in summer.' },
          ]),
        ],
      },
    ],
  },

  // ==================== ENGLISH GRADE 6 ====================
  {
    id: 'eng-6a', title: '六年级上册', subtitle: 'PEP 六年级上', subject: 'english', grade: 6, semester: 'a',
    chapters: [
      {
        id: 'eng-6a-ch1', title: 'How Can I Get There?', subtitle: 'Unit 1 怎么去那里', order: 1, icon: '🗺️',
        levels: [
          lvl('eng-6a-ch1-l1', '地点词汇', 'basic', 1, 'word', [
            { display: 'science museum', input: 'science museum' }, { display: 'post office', input: 'post office' },
            { display: 'bookstore', input: 'bookstore' }, { display: 'cinema', input: 'cinema' },
            { display: 'hospital', input: 'hospital' }, { display: 'crossing', input: 'crossing' },
          ]),
          lvl('eng-6a-ch1-l2', '问路句子', 'advanced', 2, 'sentence', [
            { display: 'Where is the cinema?', input: 'Where is the cinema?' },
            { display: 'It is next to the bookstore.', input: 'It is next to the bookstore.' },
            { display: 'Turn left at the crossing.', input: 'Turn left at the crossing.' },
            { display: 'Go straight for two minutes.', input: 'Go straight for two minutes.' },
          ]),
        ],
      },
      {
        id: 'eng-6a-ch2', title: 'Ways to Go to School', subtitle: 'Unit 2 上学的方式', order: 2, icon: '🚌',
        levels: [
          lvl('eng-6a-ch2-l1', '交通词汇', 'basic', 1, 'word', [
            { display: 'on foot', input: 'on foot' }, { display: 'by bus', input: 'by bus' },
            { display: 'by plane', input: 'by plane' }, { display: 'by subway', input: 'by subway' },
            { display: 'by train', input: 'by train' }, { display: 'by ship', input: 'by ship' },
          ]),
          lvl('eng-6a-ch2-l2', '交通句子', 'advanced', 2, 'sentence', [
            { display: 'How do you come to school?', input: 'How do you come to school?' },
            { display: 'I usually come by bus.', input: 'I usually come by bus.' },
            { display: 'I sometimes come on foot.', input: 'I sometimes come on foot.' },
          ]),
        ],
      },
    ],
  },
  {
    id: 'eng-6b', title: '六年级下册', subtitle: 'PEP 六年级下', subject: 'english', grade: 6, semester: 'b',
    chapters: [
      {
        id: 'eng-6b-ch1', title: 'How Tall Are You?', subtitle: 'Unit 1 你多高', order: 1, icon: '📏',
        levels: [
          lvl('eng-6b-ch1-l1', '比较词汇', 'basic', 1, 'word', [
            { display: 'taller', input: 'taller' }, { display: 'shorter', input: 'shorter' },
            { display: 'stronger', input: 'stronger' }, { display: 'longer', input: 'longer' },
            { display: 'younger', input: 'younger' }, { display: 'older', input: 'older' },
            { display: 'heavier', input: 'heavier' }, { display: 'thinner', input: 'thinner' },
          ]),
          lvl('eng-6b-ch1-l2', '比较句子', 'advanced', 2, 'sentence', [
            { display: 'How tall are you?', input: 'How tall are you?' },
            { display: 'I am 1.65 metres tall.', input: 'I am 1.65 metres tall.' },
            { display: 'You are taller than me.', input: 'You are taller than me.' },
            { display: 'How heavy are you?', input: 'How heavy are you?' },
          ]),
        ],
      },
      {
        id: 'eng-6b-ch2', title: 'Last Weekend', subtitle: 'Unit 2 上周末', order: 2, icon: '📆',
        levels: [
          lvl('eng-6b-ch2-l1', '过去式词汇', 'basic', 1, 'word', [
            { display: 'watched TV', input: 'watched TV' }, { display: 'washed clothes', input: 'washed clothes' },
            { display: 'cleaned my room', input: 'cleaned my room' }, { display: 'stayed at home', input: 'stayed at home' },
            { display: 'cooked dinner', input: 'cooked dinner' }, { display: 'read a book', input: 'read a book' },
          ]),
          lvl('eng-6b-ch2-l2', '过去式句子', 'advanced', 2, 'sentence', [
            { display: 'What did you do last weekend?', input: 'What did you do last weekend?' },
            { display: 'I watched TV and washed clothes.', input: 'I watched TV and washed clothes.' },
            { display: 'Did you clean your room?', input: 'Did you clean your room?' },
            { display: 'Yes, I did.', input: 'Yes, I did.' },
          ]),
        ],
      },
    ],
  },

  // ==================== CHINESE GRADE 3 ====================
  {
    id: 'chn-3a', title: '三年级上册', subtitle: '部编版 三年级上', subject: 'chinese', grade: 3, semester: 'a',
    chapters: [
      {
        id: 'chn-3a-ch1', title: '望天门山', subtitle: '古诗词·李白', order: 1, icon: '🏔️',
        levels: [
          lvl('chn-3a-ch1-l1', '拼音搭桥', 'warmup', 1, 'word', [
            { display: 'tian men', input: 'tian men' }, { display: 'zhong duan', input: 'zhong duan' },
            { display: 'chu jiang', input: 'chu jiang' }, { display: 'bi shui', input: 'bi shui' },
          ], 'zh-pinyin'),
          lvl('chn-3a-ch1-l2', '逐句默写', 'basic', 2, 'sentence', [
            { display: '天门中断楚江开', input: '天门中断楚江开' },
            { display: '碧水东流至此回', input: '碧水东流至此回' },
            { display: '两岸青山相对出', input: '两岸青山相对出' },
            { display: '孤帆一片日边来', input: '孤帆一片日边来' },
          ], 'zh-hanzi'),
          lvl('chn-3a-ch1-l3', '全诗默写', 'boss', 3, 'paragraph', [
            { display: '望天门山', input: '望天门山', hint: '题目' },
            { display: '唐 李白', input: '唐 李白', hint: '作者' },
            { display: '天门中断楚江开', input: '天门中断楚江开' },
            { display: '碧水东流至此回', input: '碧水东流至此回' },
            { display: '两岸青山相对出', input: '两岸青山相对出' },
            { display: '孤帆一片日边来', input: '孤帆一片日边来' },
          ], 'zh-hanzi'),
        ],
      },
      {
        id: 'chn-3a-ch2', title: '大青树下的小学', subtitle: '课文朗读', order: 2, icon: '🌳',
        levels: [
          lvl('chn-3a-ch2-l1', '生字练习', 'warmup', 1, 'char', [
            { display: '晨', input: '晨' }, { display: '绒', input: '绒' },
            { display: '球', input: '球' }, { display: '汉', input: '汉' },
            { display: '艳', input: '艳' }, { display: '服', input: '服' },
          ]),
          lvl('chn-3a-ch2-l2', '词语填空', 'basic', 2, 'word', [
            { display: '早晨', input: '早晨' }, { display: '绒球花', input: '绒球花' },
            { display: '汉族', input: '汉族' }, { display: '鲜艳', input: '鲜艳' },
            { display: '服装', input: '服装' }, { display: '敬爱', input: '敬爱' },
          ]),
          lvl('chn-3a-ch2-l3', '段落默写', 'advanced', 3, 'paragraph', [
            { display: '早晨，从山坡上，从坪坝里', input: '早晨，从山坡上，从坪坝里' },
            { display: '从一条条开着绒球花和太阳花的小路上', input: '从一条条开着绒球花和太阳花的小路上' },
            { display: '走来了许多小学生', input: '走来了许多小学生' },
          ]),
        ],
      },
    ],
  },
  {
    id: 'chn-3b', title: '三年级下册', subtitle: '部编版 三年级下', subject: 'chinese', grade: 3, semester: 'b',
    chapters: [
      {
        id: 'chn-3b-ch1', title: '绝句', subtitle: '古诗词·杜甫', order: 1, icon: '🌸',
        levels: [
          lvl('chn-3b-ch1-l1', '拼音练习', 'warmup', 1, 'word', [
            { display: 'chi ri', input: 'chi ri' }, { display: 'shan lan', input: 'shan lan' },
            { display: 'qian qiu', input: 'qian qiu' }, { display: 'xue', input: 'xue' },
          ], 'zh-pinyin'),
          lvl('chn-3b-ch1-l2', '诗句默写', 'basic', 2, 'sentence', [
            { display: '迟日江山丽', input: '迟日江山丽' },
            { display: '春风花草香', input: '春风花草香' },
            { display: '泥融飞燕子', input: '泥融飞燕子' },
            { display: '沙暖睡鸳鸯', input: '沙暖睡鸳鸯' },
          ], 'zh-hanzi'),
        ],
      },
      {
        id: 'chn-3b-ch2', title: '守株待兔', subtitle: '寓言故事', order: 2, icon: '🐰',
        levels: [
          lvl('chn-3b-ch2-l1', '生字练习', 'warmup', 1, 'char', [
            { display: '守', input: '守' }, { display: '株', input: '株' },
            { display: '待', input: '待' }, { display: '宋', input: '宋' },
          ]),
          lvl('chn-3b-ch2-l2', '课文默写', 'advanced', 2, 'paragraph', [
            { display: '宋人有耕者', input: '宋人有耕者' },
            { display: '田中有株', input: '田中有株' },
            { display: '兔走触株', input: '兔走触株' },
            { display: '折颈而死', input: '折颈而死' },
          ]),
        ],
      },
    ],
  },

  // ==================== CHINESE GRADE 4 ====================
  {
    id: 'chn-4a', title: '四年级上册', subtitle: '部编版 四年级上', subject: 'chinese', grade: 4, semester: 'a',
    chapters: [
      {
        id: 'chn-4a-ch1', title: '题西林壁', subtitle: '古诗词·苏轼', order: 1, icon: '🏯',
        levels: [
          lvl('chn-4a-ch1-l1', '拼音搭桥', 'warmup', 1, 'word', [
            { display: 'xi lin', input: 'xi lin' }, { display: 'heng kan', input: 'heng kan' },
            { display: 'ce feng', input: 'ce feng' }, { display: 'yuan jin', input: 'yuan jin' },
          ], 'zh-pinyin'),
          lvl('chn-4a-ch1-l2', '诗句默写', 'basic', 2, 'sentence', [
            { display: '横看成岭侧成峰', input: '横看成岭侧成峰' },
            { display: '远近高低各不同', input: '远近高低各不同' },
            { display: '不识庐山真面目', input: '不识庐山真面目' },
            { display: '只缘身在此山中', input: '只缘身在此山中' },
          ], 'zh-hanzi'),
          lvl('chn-4a-ch1-l3', '全诗默写', 'boss', 3, 'paragraph', [
            { display: '题西林壁', input: '题西林壁', hint: '题目' },
            { display: '宋 苏轼', input: '宋 苏轼', hint: '作者' },
            { display: '横看成岭侧成峰', input: '横看成岭侧成峰' },
            { display: '远近高低各不同', input: '远近高低各不同' },
            { display: '不识庐山真面目', input: '不识庐山真面目' },
            { display: '只缘身在此山中', input: '只缘身在此山中' },
          ], 'zh-hanzi'),
        ],
      },
      {
        id: 'chn-4a-ch2', title: '爬山虎的脚', subtitle: '课文精读', order: 2, icon: '🌿',
        levels: [
          lvl('chn-4a-ch2-l1', '生字练习', 'warmup', 1, 'char', [
            { display: '均', input: '均' }, { display: '柄', input: '柄' },
            { display: '触', input: '触' }, { display: '痕', input: '痕' },
            { display: '逐', input: '逐' },
          ]),
          lvl('chn-4a-ch2-l2', '词语默写', 'basic', 2, 'word', [
            { display: '爬山虎', input: '爬山虎' }, { display: '嫩茎', input: '嫩茎' },
            { display: '叶柄', input: '叶柄' }, { display: '痕迹', input: '痕迹' },
          ]),
        ],
      },
    ],
  },
  {
    id: 'chn-4b', title: '四年级下册', subtitle: '部编版 四年级下', subject: 'chinese', grade: 4, semester: 'b',
    chapters: [
      {
        id: 'chn-4b-ch1', title: '四时田园杂兴', subtitle: '古诗词·范成大', order: 1, icon: '🌾',
        levels: [
          lvl('chn-4b-ch1-l1', '诗句默写', 'basic', 1, 'sentence', [
            { display: '梅子金黄杏子肥', input: '梅子金黄杏子肥' },
            { display: '麦花雪白菜花稀', input: '麦花雪白菜花稀' },
            { display: '日长篱落无人过', input: '日长篱落无人过' },
            { display: '惟有蜻蜓蛱蝶飞', input: '惟有蜻蜓蛱蝶飞' },
          ], 'zh-hanzi'),
        ],
      },
      {
        id: 'chn-4b-ch2', title: '成语接龙', subtitle: '语文园地', order: 2, icon: '🔗',
        levels: [
          lvl('chn-4b-ch2-l1', '成语练习', 'basic', 1, 'word', [
            { display: '一本正经', input: '一本正经' }, { display: '引人注目', input: '引人注目' },
            { display: '白发苍苍', input: '白发苍苍' }, { display: '自言自语', input: '自言自语' },
            { display: '欢蹦乱跳', input: '欢蹦乱跳' },
          ]),
        ],
      },
    ],
  },

  // ==================== CHINESE GRADE 5 ====================
  {
    id: 'chn-5a', title: '五年级上册', subtitle: '部编版 五年级上', subject: 'chinese', grade: 5, semester: 'a',
    chapters: [
      {
        id: 'chn-5a-ch1', title: '示儿', subtitle: '古诗词·陆游', order: 1, icon: '📜',
        levels: [
          lvl('chn-5a-ch1-l1', '诗句默写', 'basic', 1, 'sentence', [
            { display: '死去元知万事空', input: '死去元知万事空' },
            { display: '但悲不见九州同', input: '但悲不见九州同' },
            { display: '王师北定中原日', input: '王师北定中原日' },
            { display: '家祭无忘告乃翁', input: '家祭无忘告乃翁' },
          ], 'zh-hanzi'),
          lvl('chn-5a-ch1-l2', '全诗默写', 'boss', 2, 'paragraph', [
            { display: '示儿', input: '示儿', hint: '题目' },
            { display: '宋 陆游', input: '宋 陆游', hint: '作者' },
            { display: '死去元知万事空', input: '死去元知万事空' },
            { display: '但悲不见九州同', input: '但悲不见九州同' },
            { display: '王师北定中原日', input: '王师北定中原日' },
            { display: '家祭无忘告乃翁', input: '家祭无忘告乃翁' },
          ], 'zh-hanzi'),
        ],
      },
      {
        id: 'chn-5a-ch2', title: '落花生', subtitle: '课文精读', order: 2, icon: '🥜',
        levels: [
          lvl('chn-5a-ch2-l1', '生字练习', 'warmup', 1, 'char', [
            { display: '亩', input: '亩' }, { display: '吩', input: '吩' },
            { display: '咐', input: '咐' }, { display: '榨', input: '榨' },
            { display: '榴', input: '榴' },
          ]),
          lvl('chn-5a-ch2-l2', '课文默写', 'advanced', 2, 'paragraph', [
            { display: '我们家的后园有半亩空地', input: '我们家的后园有半亩空地' },
            { display: '母亲说让它荒着怪可惜的', input: '母亲说让它荒着怪可惜的' },
            { display: '你们那么爱吃花生', input: '你们那么爱吃花生' },
          ]),
        ],
      },
    ],
  },
  {
    id: 'chn-5b', title: '五年级下册', subtitle: '部编版 五年级下', subject: 'chinese', grade: 5, semester: 'b',
    chapters: [
      {
        id: 'chn-5b-ch1', title: '四时田园杂兴', subtitle: '古诗词·范成大', order: 1, icon: '🌻',
        levels: [
          lvl('chn-5b-ch1-l1', '诗句默写', 'basic', 1, 'sentence', [
            { display: '昼出耘田夜绩麻', input: '昼出耘田夜绩麻' },
            { display: '村庄儿女各当家', input: '村庄儿女各当家' },
            { display: '童孙未解供耕织', input: '童孙未解供耕织' },
            { display: '也傍桑阴学种瓜', input: '也傍桑阴学种瓜' },
          ], 'zh-hanzi'),
        ],
      },
      {
        id: 'chn-5b-ch2', title: '草船借箭', subtitle: '名著节选', order: 2, icon: '⛵',
        levels: [
          lvl('chn-5b-ch2-l1', '生字练习', 'warmup', 1, 'char', [
            { display: '妒', input: '妒' }, { display: '忌', input: '忌' },
            { display: '曹', input: '曹' }, { display: '督', input: '督' },
            { display: '鲁', input: '鲁' },
          ]),
          lvl('chn-5b-ch2-l2', '课文默写', 'advanced', 2, 'paragraph', [
            { display: '周瑜看到诸葛亮挺有才干', input: '周瑜看到诸葛亮挺有才干' },
            { display: '心里很妒忌', input: '心里很妒忌' },
            { display: '有一天周瑜请诸葛亮商议军事', input: '有一天周瑜请诸葛亮商议军事' },
          ]),
        ],
      },
    ],
  },

  // ==================== CHINESE GRADE 6 ====================
  {
    id: 'chn-6a', title: '六年级上册', subtitle: '部编版 六年级上', subject: 'chinese', grade: 6, semester: 'a',
    chapters: [
      {
        id: 'chn-6a-ch1', title: '七律·长征', subtitle: '古诗词·毛泽东', order: 1, icon: '⛰️',
        levels: [
          lvl('chn-6a-ch1-l1', '诗句默写', 'basic', 1, 'sentence', [
            { display: '红军不怕远征难', input: '红军不怕远征难' },
            { display: '万水千山只等闲', input: '万水千山只等闲' },
            { display: '五岭逶迤腾细浪', input: '五岭逶迤腾细浪' },
            { display: '乌蒙磅礴走泥丸', input: '乌蒙磅礴走泥丸' },
            { display: '金沙水拍云崖暖', input: '金沙水拍云崖暖' },
            { display: '大渡桥横铁索寒', input: '大渡桥横铁索寒' },
            { display: '更喜岷山千里雪', input: '更喜岷山千里雪' },
            { display: '三军过后尽开颜', input: '三军过后尽开颜' },
          ], 'zh-hanzi'),
          lvl('chn-6a-ch1-l2', '全诗默写', 'boss', 2, 'paragraph', [
            { display: '七律·长征', input: '七律 长征', hint: '题目' },
            { display: '毛泽东', input: '毛泽东', hint: '作者' },
            { display: '红军不怕远征难', input: '红军不怕远征难' },
            { display: '万水千山只等闲', input: '万水千山只等闲' },
            { display: '五岭逶迤腾细浪', input: '五岭逶迤腾细浪' },
            { display: '乌蒙磅礴走泥丸', input: '乌蒙磅礴走泥丸' },
            { display: '金沙水拍云崖暖', input: '金沙水拍云崖暖' },
            { display: '大渡桥横铁索寒', input: '大渡桥横铁索寒' },
          ], 'zh-hanzi'),
        ],
      },
      {
        id: 'chn-6a-ch2', title: '狼牙山五壮士', subtitle: '革命故事', order: 2, icon: '⚔️',
        levels: [
          lvl('chn-6a-ch2-l1', '生字练习', 'warmup', 1, 'char', [
            { display: '寇', input: '寇' }, { display: '冀', input: '冀' },
            { display: '副', input: '副' }, { display: '榴', input: '榴' },
            { display: '弹', input: '弹' }, { display: '抡', input: '抡' },
          ]),
          lvl('chn-6a-ch2-l2', '课文默写', 'advanced', 2, 'paragraph', [
            { display: '五位壮士屹立在狼牙山顶峰', input: '五位壮士屹立在狼牙山顶峰' },
            { display: '眺望着群众和部队主力远去的方向', input: '眺望着群众和部队主力远去的方向' },
          ]),
        ],
      },
    ],
  },
  {
    id: 'chn-6b', title: '六年级下册', subtitle: '部编版 六年级下', subject: 'chinese', grade: 6, semester: 'b',
    chapters: [
      {
        id: 'chn-6b-ch1', title: '石灰吟', subtitle: '古诗词·于谦', order: 1, icon: '💎',
        levels: [
          lvl('chn-6b-ch1-l1', '诗句默写', 'basic', 1, 'sentence', [
            { display: '千锤万凿出深山', input: '千锤万凿出深山' },
            { display: '烈火焚烧若等闲', input: '烈火焚烧若等闲' },
            { display: '粉身碎骨浑不怕', input: '粉身碎骨浑不怕' },
            { display: '要留清白在人间', input: '要留清白在人间' },
          ], 'zh-hanzi'),
          lvl('chn-6b-ch1-l2', '全诗默写', 'boss', 2, 'paragraph', [
            { display: '石灰吟', input: '石灰吟', hint: '题目' },
            { display: '明 于谦', input: '明 于谦', hint: '作者' },
            { display: '千锤万凿出深山', input: '千锤万凿出深山' },
            { display: '烈火焚烧若等闲', input: '烈火焚烧若等闲' },
            { display: '粉身碎骨浑不怕', input: '粉身碎骨浑不怕' },
            { display: '要留清白在人间', input: '要留清白在人间' },
          ], 'zh-hanzi'),
        ],
      },
      {
        id: 'chn-6b-ch2', title: '匆匆', subtitle: '散文精读·朱自清', order: 2, icon: '⏳',
        levels: [
          lvl('chn-6b-ch2-l1', '词语默写', 'basic', 1, 'word', [
            { display: '匆匆', input: '匆匆' }, { display: '头涔涔', input: '头涔涔' },
            { display: '泪潸潸', input: '泪潸潸' }, { display: '赤裸裸', input: '赤裸裸' },
          ]),
          lvl('chn-6b-ch2-l2', '课文默写', 'advanced', 2, 'paragraph', [
            { display: '燕子去了有再来的时候', input: '燕子去了有再来的时候' },
            { display: '杨柳枯了有再青的时候', input: '杨柳枯了有再青的时候' },
            { display: '桃花谢了有再开的时候', input: '桃花谢了有再开的时候' },
          ]),
        ],
      },
    ],
  },
]

// Fix WPM targets
TEXTBOOKS.forEach(tb => {
  const w = wpm(tb.grade)
  tb.chapters.forEach(ch => {
    ch.levels.forEach(lv => {
      lv.targetWPM = w
    })
  })
})

export { TEXTBOOKS }

export function getTextbookById(id: string): Textbook | undefined {
  return TEXTBOOKS.find(tb => tb.id === id)
}

export function getTextbooksByGrade(grade: Grade): Textbook[] {
  return TEXTBOOKS.filter(tb => tb.grade === grade)
}

export function getTextbooksBySubject(subject: Subject): Textbook[] {
  return TEXTBOOKS.filter(tb => tb.subject === subject)
}

export function getAllGrades(): Grade[] {
  return [3, 4, 5, 6]
}
