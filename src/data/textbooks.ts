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
            { display: 'e', input: 'e' }, { display: 'p', input: 'p' }, { display: 'b', input: 'b' },
            { display: 'a', input: 'a' }, { display: 'g', input: 'g' },
          ]),
          lvl('eng-3a-ch1-l2', '单词狩猎', 'basic', 2, 'word', [
            { display: 'ruler', input: 'ruler' }, { display: 'pencil', input: 'pencil' },
            { display: 'eraser', input: 'eraser' }, { display: 'crayon', input: 'crayon' },
            { display: 'bag', input: 'bag' }, { display: 'pen', input: 'pen' },
            { display: 'book', input: 'book' }, { display: 'pencil box', input: 'pencil box' },
          ]),
          lvl('eng-3a-ch1-l3', '句子结界', 'advanced', 3, 'sentence', [
            { display: 'I have a ruler.', input: 'I have a ruler.' },
            { display: 'I have a pencil.', input: 'I have a pencil.' },
            { display: 'Me too!', input: 'Me too!' },
            { display: 'I have an eraser.', input: 'I have an eraser.' },
          ]),
          lvl('eng-3a-ch1-l4', '对话对决', 'boss', 4, 'paragraph', [
            { display: "What's your name?", input: "What's your name?" },
            { display: 'My name is Mike.', input: 'My name is Mike.' },
            { display: 'Hello! I am Wu Binbin.', input: 'Hello! I am Wu Binbin.' },
            { display: 'Hi! I am Sarah.', input: 'Hi! I am Sarah.' },
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
            { display: 'purple', input: 'purple' }, { display: 'pink', input: 'pink' },
          ]),
          lvl('eng-3a-ch2-l3', '颜色句子', 'advanced', 3, 'sentence', [
            { display: 'I see red.', input: 'I see red.' },
            { display: 'Colour it blue.', input: 'Colour it blue.' },
            { display: 'Show me green.', input: 'Show me green.' },
            { display: 'I like yellow.', input: 'I like yellow.' },
          ]),
          lvl('eng-3a-ch2-l4', '颜色对话', 'boss', 4, 'paragraph', [
            { display: 'What colour is it?', input: 'What colour is it?' },
            { display: 'It is red and blue.', input: 'It is red and blue.' },
            { display: 'I see green and yellow.', input: 'I see green and yellow.' },
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
            { display: 'o', input: 'o' }, { display: 'w', input: 'w' }, { display: 'c', input: 'c' },
          ]),
          lvl('eng-3b-ch1-l2', '国家单词', 'basic', 2, 'word', [
            { display: 'UK', input: 'UK' }, { display: 'Canada', input: 'Canada' },
            { display: 'USA', input: 'USA' }, { display: 'China', input: 'China' },
            { display: 'student', input: 'student' }, { display: 'teacher', input: 'teacher' },
          ]),
          lvl('eng-3b-ch1-l3', '自我介绍', 'advanced', 3, 'sentence', [
            { display: 'Where are you from?', input: 'Where are you from?' },
            { display: 'I am from China.', input: 'I am from China.' },
            { display: 'This is Amy.', input: 'This is Amy.' },
            { display: 'She is a student.', input: 'She is a student.' },
          ]),
          lvl('eng-3b-ch1-l4', '班级对话', 'boss', 4, 'paragraph', [
            { display: 'Hi! I am Mike.', input: 'Hi! I am Mike.' },
            { display: 'I am from the UK.', input: 'I am from the UK.' },
            { display: 'Nice to meet you.', input: 'Nice to meet you.' },
            { display: 'Nice to meet you too.', input: 'Nice to meet you too.' },
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
            { display: 'He is my brother.', input: 'He is my brother.' },
          ]),
          lvl('eng-3b-ch2-l3', '家庭对话', 'boss', 3, 'paragraph', [
            { display: 'Who is that man?', input: 'Who is that man?' },
            { display: 'He is my father.', input: 'He is my father.' },
            { display: 'Who is that woman?', input: 'Who is that woman?' },
            { display: 'She is my mother.', input: 'She is my mother.' },
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
            { display: 's', input: 's' }, { display: 'r', input: 'r' }, { display: 'w', input: 'w' },
          ]),
          lvl('eng-4a-ch1-l2', '教室单词', 'basic', 2, 'word', [
            { display: 'classroom', input: 'classroom' }, { display: 'window', input: 'window' },
            { display: 'blackboard', input: 'blackboard' }, { display: 'light', input: 'light' },
            { display: 'picture', input: 'picture' }, { display: 'door', input: 'door' },
            { display: 'floor', input: 'floor' }, { display: 'wall', input: 'wall' },
          ]),
          lvl('eng-4a-ch1-l3', '教室对话', 'advanced', 3, 'sentence', [
            { display: 'What is in the classroom?', input: 'What is in the classroom?' },
            { display: 'One blackboard, one TV.', input: 'One blackboard, one TV.' },
            { display: 'Let me clean the window.', input: 'Let me clean the window.' },
            { display: 'Let me clean the door.', input: 'Let me clean the door.' },
          ]),
          lvl('eng-4a-ch1-l4', '教室探险', 'boss', 4, 'paragraph', [
            { display: 'We have a new classroom.', input: 'We have a new classroom.' },
            { display: 'Really? Let me go and see.', input: 'Really? Let me go and see.' },
            { display: 'It is so big!', input: 'It is so big!' },
            { display: 'Let me clean the blackboard.', input: 'Let me clean the blackboard.' },
          ]),
        ],
      },
      {
        id: 'eng-4a-ch2', title: 'My Schoolbag', subtitle: 'Unit 2 我的书包', order: 2, icon: '🎒',
        levels: [
          lvl('eng-4a-ch2-l1', '书包字母', 'warmup', 1, 'char', [
            { display: 's', input: 's' }, { display: 'c', input: 'c' }, { display: 'h', input: 'h' },
            { display: 'o', input: 'o' }, { display: 'o', input: 'o' }, { display: 'l', input: 'l' },
          ]),
          lvl('eng-4a-ch2-l2', '书包单词', 'basic', 2, 'word', [
            { display: 'schoolbag', input: 'schoolbag' }, { display: 'maths book', input: 'maths book' },
            { display: 'English book', input: 'English book' }, { display: 'Chinese book', input: 'Chinese book' },
            { display: 'storybook', input: 'storybook' }, { display: 'candy', input: 'candy' },
            { display: 'notebook', input: 'notebook' }, { display: 'toy', input: 'toy' },
          ]),
          lvl('eng-4a-ch2-l3', '书包句子', 'advanced', 3, 'sentence', [
            { display: 'What colour is your schoolbag?', input: 'What colour is your schoolbag?' },
            { display: 'It is black and white.', input: 'It is black and white.' },
            { display: 'I have a new schoolbag.', input: 'I have a new schoolbag.' },
            { display: 'What is in your schoolbag?', input: 'What is in your schoolbag?' },
          ]),
          lvl('eng-4a-ch2-l4', '书包对话', 'boss', 4, 'paragraph', [
            { display: 'I have a new schoolbag.', input: 'I have a new schoolbag.' },
            { display: 'Really? What colour is it?', input: 'Really? What colour is it?' },
            { display: 'It is blue and white.', input: 'It is blue and white.' },
            { display: 'Wow! It is nice.', input: 'Wow! It is nice.' },
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
          lvl('eng-4b-ch1-l1', '楼层字母', 'warmup', 1, 'char', [
            { display: 'f', input: 'f' }, { display: 'i', input: 'i' }, { display: 'r', input: 'r' },
            { display: 's', input: 's' }, { display: 't', input: 't' },
          ]),
          lvl('eng-4b-ch1-l2', '学校词汇', 'basic', 2, 'word', [
            { display: 'first floor', input: 'first floor' }, { display: 'second floor', input: 'second floor' },
            { display: 'playground', input: 'playground' }, { display: 'garden', input: 'garden' },
            { display: 'library', input: 'library' }, { display: 'teacher office', input: 'teacher office' },
            { display: 'computer room', input: 'computer room' }, { display: 'art room', input: 'art room' },
          ]),
          lvl('eng-4b-ch1-l3', '学校对话', 'advanced', 3, 'sentence', [
            { display: 'Where is the library?', input: 'Where is the library?' },
            { display: 'It is on the first floor.', input: 'It is on the first floor.' },
            { display: 'This is my school.', input: 'This is my school.' },
            { display: 'Do you have a garden?', input: 'Do you have a garden?' },
          ]),
          lvl('eng-4b-ch1-l4', '学校导游', 'boss', 4, 'paragraph', [
            { display: 'Welcome to my school!', input: 'Welcome to my school!' },
            { display: 'This is the library.', input: 'This is the library.' },
            { display: 'We read books here.', input: 'We read books here.' },
            { display: 'The playground is on the first floor.', input: 'The playground is on the first floor.' },
          ]),
        ],
      },
      {
        id: 'eng-4b-ch2', title: 'Weather', subtitle: 'Unit 2 天气', order: 2, icon: '🌤️',
        levels: [
          lvl('eng-4b-ch2-l1', '天气字母', 'warmup', 1, 'char', [
            { display: 'w', input: 'w' }, { display: 'e', input: 'e' }, { display: 'a', input: 'a' },
            { display: 't', input: 't' }, { display: 'h', input: 'h' }, { display: 'r', input: 'r' },
          ]),
          lvl('eng-4b-ch2-l2', '天气单词', 'basic', 2, 'word', [
            { display: 'warm', input: 'warm' }, { display: 'cold', input: 'cold' },
            { display: 'cool', input: 'cool' }, { display: 'hot', input: 'hot' },
            { display: 'sunny', input: 'sunny' }, { display: 'windy', input: 'windy' },
            { display: 'cloudy', input: 'cloudy' }, { display: 'snowy', input: 'snowy' },
          ]),
          lvl('eng-4b-ch2-l3', '天气句子', 'advanced', 3, 'sentence', [
            { display: "What's the weather like?", input: "What's the weather like?" },
            { display: 'It is sunny and warm.', input: 'It is sunny and warm.' },
            { display: 'Can I go outside?', input: 'Can I go outside?' },
            { display: 'It is cold today.', input: 'It is cold today.' },
          ]),
          lvl('eng-4b-ch2-l4', '天气播报', 'boss', 4, 'paragraph', [
            { display: 'Good morning! Here is the weather.', input: 'Good morning! Here is the weather.' },
            { display: 'It is sunny in Beijing.', input: 'It is sunny in Beijing.' },
            { display: 'It is rainy in London.', input: 'It is rainy in London.' },
            { display: 'Have a nice day!', input: 'Have a nice day!' },
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
          lvl('eng-5a-ch1-l1', '描述字母', 'warmup', 1, 'char', [
            { display: 'k', input: 'k' }, { display: 'i', input: 'i' }, { display: 'n', input: 'n' },
            { display: 'd', input: 'd' }, { display: 'f', input: 'f' }, { display: 'u', input: 'u' },
          ]),
          lvl('eng-5a-ch1-l2', '描述词汇', 'basic', 2, 'word', [
            { display: 'old', input: 'old' }, { display: 'young', input: 'young' },
            { display: 'funny', input: 'funny' }, { display: 'kind', input: 'kind' },
            { display: 'strict', input: 'strict' }, { display: 'polite', input: 'polite' },
            { display: 'clever', input: 'clever' }, { display: 'hard-working', input: 'hard-working' },
            { display: 'helpful', input: 'helpful' }, { display: 'shy', input: 'shy' },
          ]),
          lvl('eng-5a-ch1-l3', '描述人物', 'advanced', 3, 'sentence', [
            { display: 'Who is your English teacher?', input: 'Who is your English teacher?' },
            { display: 'Miss White is very kind.', input: 'Miss White is very kind.' },
            { display: 'He is tall and funny.', input: 'He is tall and funny.' },
            { display: 'She is young and polite.', input: 'She is young and polite.' },
          ]),
          lvl('eng-5a-ch1-l4', '人物描述', 'boss', 4, 'paragraph', [
            { display: 'This is my maths teacher.', input: 'This is my maths teacher.' },
            { display: 'He is tall and strict.', input: 'He is tall and strict.' },
            { display: 'He is very clever.', input: 'He is very clever.' },
            { display: 'I like him very much.', input: 'I like him very much.' },
          ]),
        ],
      },
      {
        id: 'eng-5a-ch2', title: 'My Week', subtitle: 'Unit 2 我的一周', order: 2, icon: '📅',
        levels: [
          lvl('eng-5a-ch2-l1', '星期字母', 'warmup', 1, 'char', [
            { display: 'm', input: 'm' }, { display: 'o', input: 'o' }, { display: 't', input: 't' },
            { display: 'w', input: 'w' }, { display: 'f', input: 'f' }, { display: 's', input: 's' },
          ]),
          lvl('eng-5a-ch2-l2', '星期词汇', 'basic', 2, 'word', [
            { display: 'Monday', input: 'Monday' }, { display: 'Tuesday', input: 'Tuesday' },
            { display: 'Wednesday', input: 'Wednesday' }, { display: 'Thursday', input: 'Thursday' },
            { display: 'Friday', input: 'Friday' }, { display: 'Saturday', input: 'Saturday' },
            { display: 'Sunday', input: 'Sunday' },
          ]),
          lvl('eng-5a-ch2-l3', '课程句子', 'advanced', 3, 'sentence', [
            { display: 'What do you have on Monday?', input: 'What do you have on Monday?' },
            { display: 'I have English and maths.', input: 'I have English and maths.' },
            { display: 'I like Wednesdays.', input: 'I like Wednesdays.' },
            { display: 'We have PE class today.', input: 'We have PE class today.' },
          ]),
          lvl('eng-5a-ch2-l4', '一周计划', 'boss', 4, 'paragraph', [
            { display: 'What do you have on Tuesdays?', input: 'What do you have on Tuesdays?' },
            { display: 'I have Chinese and music.', input: 'I have Chinese and music.' },
            { display: 'What about Wednesdays?', input: 'What about Wednesdays?' },
            { display: 'I have English and PE.', input: 'I have English and PE.' },
            { display: 'I like Tuesdays and Wednesdays.', input: 'I like Tuesdays and Wednesdays.' },
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
          lvl('eng-5b-ch1-l1', '时间字母', 'warmup', 1, 'char', [
            { display: 'a', input: 'a' }, { display: 'm', input: 'm' }, { display: 'p', input: 'p' },
            { display: 'o', input: 'o' }, { display: 'k', input: 'k' },
          ]),
          lvl('eng-5b-ch1-l2', '日常词汇', 'basic', 2, 'word', [
            { display: 'eat breakfast', input: 'eat breakfast' },
            { display: 'do morning exercises', input: 'do morning exercises' },
            { display: 'have class', input: 'have class' }, { display: 'play sports', input: 'play sports' },
            { display: 'eat dinner', input: 'eat dinner' }, { display: 'clean my room', input: 'clean my room' },
            { display: 'go for a walk', input: 'go for a walk' }, { display: 'go shopping', input: 'go shopping' },
          ]),
          lvl('eng-5b-ch1-l3', '日常对话', 'advanced', 3, 'sentence', [
            { display: 'When do you get up?', input: 'When do you get up?' },
            { display: "I get up at 6 o'clock.", input: "I get up at 6 o'clock." },
            { display: 'I usually eat dinner at 7 p.m.', input: 'I usually eat dinner at 7 p.m.' },
            { display: 'When do you go to bed?', input: 'When do you go to bed?' },
          ]),
          lvl('eng-5b-ch1-l4', '一天安排', 'boss', 4, 'paragraph', [
            { display: 'I get up at 6 in the morning.', input: 'I get up at 6 in the morning.' },
            { display: 'I eat breakfast at 7.', input: 'I eat breakfast at 7.' },
            { display: 'I have class from 8 to 4.', input: 'I have class from 8 to 4.' },
            { display: 'I play sports after school.', input: 'I play sports after school.' },
            { display: 'I go to bed at 9.', input: 'I go to bed at 9.' },
          ]),
        ],
      },
      {
        id: 'eng-5b-ch2', title: 'My Favourite Season', subtitle: 'Unit 2 我最喜欢的季节', order: 2, icon: '🌸',
        levels: [
          lvl('eng-5b-ch2-l1', '季节字母', 'warmup', 1, 'char', [
            { display: 's', input: 's' }, { display: 'p', input: 'p' }, { display: 'r', input: 'r' },
            { display: 'i', input: 'i' }, { display: 'n', input: 'n' },
          ]),
          lvl('eng-5b-ch2-l2', '季节词汇', 'basic', 2, 'word', [
            { display: 'spring', input: 'spring' }, { display: 'summer', input: 'summer' },
            { display: 'autumn', input: 'autumn' }, { display: 'winter', input: 'winter' },
            { display: 'season', input: 'season' }, { display: 'vacation', input: 'vacation' },
            { display: 'pick apples', input: 'pick apples' }, { display: 'make a snowman', input: 'make a snowman' },
          ]),
          lvl('eng-5b-ch2-l3', '季节句子', 'advanced', 3, 'sentence', [
            { display: 'Which season do you like best?', input: 'Which season do you like best?' },
            { display: 'I like spring best.', input: 'I like spring best.' },
            { display: 'I can go swimming in summer.', input: 'I can go swimming in summer.' },
            { display: 'I can make a snowman in winter.', input: 'I can make a snowman in winter.' },
          ]),
          lvl('eng-5b-ch2-l4', '季节对话', 'boss', 4, 'paragraph', [
            { display: 'Which season do you like best?', input: 'Which season do you like best?' },
            { display: 'I like autumn best.', input: 'I like autumn best.' },
            { display: 'Why do you like autumn?', input: 'Why do you like autumn?' },
            { display: 'Because I can pick apples.', input: 'Because I can pick apples.' },
            { display: 'Sounds great!', input: 'Sounds great!' },
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
          lvl('eng-6a-ch1-l1', '方向字母', 'warmup', 1, 'char', [
            { display: 't', input: 't' }, { display: 'u', input: 'u' }, { display: 'r', input: 'r' },
            { display: 'n', input: 'n' }, { display: 'l', input: 'l' }, { display: 'g', input: 'g' },
          ]),
          lvl('eng-6a-ch1-l2', '地点词汇', 'basic', 2, 'word', [
            { display: 'science museum', input: 'science museum' }, { display: 'post office', input: 'post office' },
            { display: 'bookstore', input: 'bookstore' }, { display: 'cinema', input: 'cinema' },
            { display: 'hospital', input: 'hospital' }, { display: 'crossing', input: 'crossing' },
            { display: 'turn left', input: 'turn left' }, { display: 'go straight', input: 'go straight' },
          ]),
          lvl('eng-6a-ch1-l3', '问路句子', 'advanced', 3, 'sentence', [
            { display: 'Where is the cinema?', input: 'Where is the cinema?' },
            { display: 'It is next to the bookstore.', input: 'It is next to the bookstore.' },
            { display: 'Turn left at the crossing.', input: 'Turn left at the crossing.' },
            { display: 'Go straight for two minutes.', input: 'Go straight for two minutes.' },
          ]),
          lvl('eng-6a-ch1-l4', '指路对话', 'boss', 4, 'paragraph', [
            { display: 'Excuse me. Where is the hospital?', input: 'Excuse me. Where is the hospital?' },
            { display: 'It is near the post office.', input: 'It is near the post office.' },
            { display: 'How can I get there?', input: 'How can I get there?' },
            { display: 'Turn left at the crossing, then go straight.', input: 'Turn left at the crossing, then go straight.' },
            { display: 'Thank you very much.', input: 'Thank you very much.' },
          ]),
        ],
      },
      {
        id: 'eng-6a-ch2', title: 'Ways to Go to School', subtitle: 'Unit 2 上学的方式', order: 2, icon: '🚌',
        levels: [
          lvl('eng-6a-ch2-l1', '交通字母', 'warmup', 1, 'char', [
            { display: 'b', input: 'b' }, { display: 'u', input: 'u' }, { display: 's', input: 's' },
            { display: 'p', input: 'p' }, { display: 't', input: 't' },
          ]),
          lvl('eng-6a-ch2-l2', '交通词汇', 'basic', 2, 'word', [
            { display: 'on foot', input: 'on foot' }, { display: 'by bus', input: 'by bus' },
            { display: 'by plane', input: 'by plane' }, { display: 'by subway', input: 'by subway' },
            { display: 'by train', input: 'by train' }, { display: 'by ship', input: 'by ship' },
            { display: 'by bike', input: 'by bike' }, { display: 'by taxi', input: 'by taxi' },
          ]),
          lvl('eng-6a-ch2-l3', '交通句子', 'advanced', 3, 'sentence', [
            { display: 'How do you come to school?', input: 'How do you come to school?' },
            { display: 'I usually come by bus.', input: 'I usually come by bus.' },
            { display: 'I sometimes come on foot.', input: 'I sometimes come on foot.' },
            { display: 'Do you come by bike?', input: 'Do you come by bike?' },
          ]),
          lvl('eng-6a-ch2-l4', '交通对话', 'boss', 4, 'paragraph', [
            { display: 'How do you come to school?', input: 'How do you come to school?' },
            { display: 'I usually come on foot.', input: 'I usually come on foot.' },
            { display: 'Sometimes I come by bus.', input: 'Sometimes I come by bus.' },
            { display: 'My home is near the school.', input: 'My home is near the school.' },
            { display: 'That is good exercise.', input: 'That is good exercise.' },
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
          lvl('eng-6b-ch1-l1', '比较字母', 'warmup', 1, 'char', [
            { display: 't', input: 't' }, { display: 'a', input: 'a' }, { display: 'l', input: 'l' },
            { display: 'e', input: 'e' }, { display: 'r', input: 'r' },
          ]),
          lvl('eng-6b-ch1-l2', '比较词汇', 'basic', 2, 'word', [
            { display: 'taller', input: 'taller' }, { display: 'shorter', input: 'shorter' },
            { display: 'stronger', input: 'stronger' }, { display: 'longer', input: 'longer' },
            { display: 'younger', input: 'younger' }, { display: 'older', input: 'older' },
            { display: 'heavier', input: 'heavier' }, { display: 'thinner', input: 'thinner' },
            { display: 'bigger', input: 'bigger' }, { display: 'smaller', input: 'smaller' },
          ]),
          lvl('eng-6b-ch1-l3', '比较句子', 'advanced', 3, 'sentence', [
            { display: 'How tall are you?', input: 'How tall are you?' },
            { display: 'I am 1.65 metres tall.', input: 'I am 1.65 metres tall.' },
            { display: 'You are taller than me.', input: 'You are taller than me.' },
            { display: 'How heavy are you?', input: 'How heavy are you?' },
            { display: 'I am 48 kilograms.', input: 'I am 48 kilograms.' },
          ]),
          lvl('eng-6b-ch1-l4', '比较对话', 'boss', 4, 'paragraph', [
            { display: 'How tall are you?', input: 'How tall are you?' },
            { display: 'I am 1.61 metres.', input: 'I am 1.61 metres.' },
            { display: 'I am taller than you.', input: 'I am taller than you.' },
            { display: 'How heavy is Mike?', input: 'How heavy is Mike?' },
            { display: 'He is 50 kilograms.', input: 'He is 50 kilograms.' },
            { display: 'He is heavier than me.', input: 'He is heavier than me.' },
          ]),
        ],
      },
      {
        id: 'eng-6b-ch2', title: 'Last Weekend', subtitle: 'Unit 2 上周末', order: 2, icon: '📆',
        levels: [
          lvl('eng-6b-ch2-l1', '过去式字母', 'warmup', 1, 'char', [
            { display: 'e', input: 'e' }, { display: 'd', input: 'd' }, { display: 'a', input: 'a' },
            { display: 'y', input: 'y' }, { display: 'k', input: 'k' },
          ]),
          lvl('eng-6b-ch2-l2', '过去式词汇', 'basic', 2, 'word', [
            { display: 'watched TV', input: 'watched TV' }, { display: 'washed clothes', input: 'washed clothes' },
            { display: 'cleaned my room', input: 'cleaned my room' }, { display: 'stayed at home', input: 'stayed at home' },
            { display: 'cooked dinner', input: 'cooked dinner' }, { display: 'read a book', input: 'read a book' },
            { display: 'saw a film', input: 'saw a film' }, { display: 'had a cold', input: 'had a cold' },
          ]),
          lvl('eng-6b-ch2-l3', '过去式句子', 'advanced', 3, 'sentence', [
            { display: 'What did you do last weekend?', input: 'What did you do last weekend?' },
            { display: 'I watched TV and washed clothes.', input: 'I watched TV and washed clothes.' },
            { display: 'Did you clean your room?', input: 'Did you clean your room?' },
            { display: 'Yes, I did.', input: 'Yes, I did.' },
          ]),
          lvl('eng-6b-ch2-l4', '周末对话', 'boss', 4, 'paragraph', [
            { display: 'How was your weekend?', input: 'How was your weekend?' },
            { display: 'It was great, thank you.', input: 'It was great, thank you.' },
            { display: 'What did you do?', input: 'What did you do?' },
            { display: 'I watched TV and cooked dinner.', input: 'I watched TV and cooked dinner.' },
            { display: 'Did you go anywhere?', input: 'Did you go anywhere?' },
            { display: 'No, I stayed at home.', input: 'No, I stayed at home.' },
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
            { display: 'dong liu', input: 'dong liu' },
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
          lvl('chn-3b-ch1-l3', '全诗默写', 'boss', 3, 'paragraph', [
            { display: '绝句', input: '绝句', hint: '题目' },
            { display: '唐 杜甫', input: '唐 杜甫', hint: '作者' },
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
            { display: '耕', input: '耕' }, { display: '颈', input: '颈' },
          ]),
          lvl('chn-3b-ch2-l2', '课文默写', 'advanced', 2, 'paragraph', [
            { display: '宋人有耕者', input: '宋人有耕者' },
            { display: '田中有株', input: '田中有株' },
            { display: '兔走触株', input: '兔走触株' },
            { display: '折颈而死', input: '折颈而死' },
          ]),
          lvl('chn-3b-ch2-l3', '全文默写', 'boss', 3, 'paragraph', [
            { display: '守株待兔', input: '守株待兔', hint: '题目' },
            { display: '韩非子', input: '韩非子', hint: '出处' },
            { display: '宋人有耕者', input: '宋人有耕者' },
            { display: '田中有株', input: '田中有株' },
            { display: '兔走触株', input: '兔走触株' },
            { display: '折颈而死', input: '折颈而死' },
          ], 'zh-hanzi'),
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
            { display: '逐', input: '逐' }, { display: '瞧', input: '瞧' },
          ]),
          lvl('chn-4a-ch2-l2', '词语默写', 'basic', 2, 'word', [
            { display: '爬山虎', input: '爬山虎' }, { display: '嫩茎', input: '嫩茎' },
            { display: '叶柄', input: '叶柄' }, { display: '痕迹', input: '痕迹' },
            { display: '均匀', input: '均匀' }, { display: '重叠', input: '重叠' },
          ]),
          lvl('chn-4a-ch2-l3', '课文默写', 'advanced', 3, 'paragraph', [
            { display: '学校操场边上有一墙爬山虎', input: '学校操场边上有一墙爬山虎' },
            { display: '爬山虎的叶子刚长出来是嫩红的', input: '爬山虎的叶子刚长出来是嫩红的' },
            { display: '不几天叶子长大就变成嫩绿的', input: '不几天叶子长大就变成嫩绿的' },
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
          lvl('chn-4b-ch1-l1', '拼音练习', 'warmup', 1, 'word', [
            { display: 'mei zi', input: 'mei zi' }, { display: 'mai hua', input: 'mai hua' },
            { display: 'ri chang', input: 'ri chang' }, { display: 'qia die', input: 'qia die' },
          ], 'zh-pinyin'),
          lvl('chn-4b-ch1-l2', '诗句默写', 'basic', 2, 'sentence', [
            { display: '梅子金黄杏子肥', input: '梅子金黄杏子肥' },
            { display: '麦花雪白菜花稀', input: '麦花雪白菜花稀' },
            { display: '日长篱落无人过', input: '日长篱落无人过' },
            { display: '惟有蜻蜓蛱蝶飞', input: '惟有蜻蜓蛱蝶飞' },
          ], 'zh-hanzi'),
          lvl('chn-4b-ch1-l3', '全诗默写', 'boss', 3, 'paragraph', [
            { display: '四时田园杂兴', input: '四时田园杂兴', hint: '题目' },
            { display: '宋 范成大', input: '宋 范成大', hint: '作者' },
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
          lvl('chn-4b-ch2-l1', '生字练习', 'warmup', 1, 'char', [
            { display: '一本正经', input: '一本正经' }, { display: '引人注目', input: '引人注目' },
            { display: '白发苍苍', input: '白发苍苍' },
          ]),
          lvl('chn-4b-ch2-l2', '成语练习', 'basic', 2, 'word', [
            { display: '一本正经', input: '一本正经' }, { display: '引人注目', input: '引人注目' },
            { display: '白发苍苍', input: '白发苍苍' }, { display: '自言自语', input: '自言自语' },
            { display: '欢蹦乱跳', input: '欢蹦乱跳' }, { display: '大惊失色', input: '大惊失色' },
          ]),
          lvl('chn-4b-ch2-l3', '成语默写', 'advanced', 3, 'sentence', [
            { display: '千呼万唤始出来', input: '千呼万唤始出来' },
            { display: '垂头丧气地走了', input: '垂头丧气地走了' },
            { display: '五彩缤纷的花朵', input: '五彩缤纷的花朵' },
            { display: '争奇斗艳的春天', input: '争奇斗艳的春天' },
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
          lvl('chn-5a-ch1-l1', '拼音练习', 'warmup', 1, 'word', [
            { display: 'yuan zhi', input: 'yuan zhi' }, { display: 'jiu zhou', input: 'jiu zhou' },
            { display: 'wang shi', input: 'wang shi' }, { display: 'nai weng', input: 'nai weng' },
          ], 'zh-pinyin'),
          lvl('chn-5a-ch1-l2', '诗句默写', 'basic', 2, 'sentence', [
            { display: '死去元知万事空', input: '死去元知万事空' },
            { display: '但悲不见九州同', input: '但悲不见九州同' },
            { display: '王师北定中原日', input: '王师北定中原日' },
            { display: '家祭无忘告乃翁', input: '家祭无忘告乃翁' },
          ], 'zh-hanzi'),
          lvl('chn-5a-ch1-l3', '全诗默写', 'boss', 3, 'paragraph', [
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
            { display: '榴', input: '榴' }, { display: '慕', input: '慕' },
          ]),
          lvl('chn-5a-ch2-l2', '词语默写', 'basic', 2, 'word', [
            { display: '半亩空地', input: '半亩空地' }, { display: '吩咐', input: '吩咐' },
            { display: '茅亭', input: '茅亭' }, { display: '榨油', input: '榨油' },
            { display: '石榴', input: '石榴' }, { display: '爱慕', input: '爱慕' },
          ]),
          lvl('chn-5a-ch2-l3', '课文默写', 'advanced', 3, 'paragraph', [
            { display: '我们家的后园有半亩空地', input: '我们家的后园有半亩空地' },
            { display: '母亲说让它荒着怪可惜的', input: '母亲说让它荒着怪可惜的' },
            { display: '你们那么爱吃花生', input: '你们那么爱吃花生' },
            { display: '就开辟出来种花生吧', input: '就开辟出来种花生吧' },
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
          lvl('chn-5b-ch1-l1', '拼音练习', 'warmup', 1, 'word', [
            { display: 'yun tian', input: 'yun tian' }, { display: 'ji ma', input: 'ji ma' },
            { display: 'ge dang jia', input: 'ge dang jia' }, { display: 'sang yin', input: 'sang yin' },
          ], 'zh-pinyin'),
          lvl('chn-5b-ch1-l2', '诗句默写', 'basic', 2, 'sentence', [
            { display: '昼出耘田夜绩麻', input: '昼出耘田夜绩麻' },
            { display: '村庄儿女各当家', input: '村庄儿女各当家' },
            { display: '童孙未解供耕织', input: '童孙未解供耕织' },
            { display: '也傍桑阴学种瓜', input: '也傍桑阴学种瓜' },
          ], 'zh-hanzi'),
          lvl('chn-5b-ch1-l3', '全诗默写', 'boss', 3, 'paragraph', [
            { display: '四时田园杂兴', input: '四时田园杂兴', hint: '题目' },
            { display: '宋 范成大', input: '宋 范成大', hint: '作者' },
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
            { display: '鲁', input: '鲁' }, { display: '遮', input: '遮' },
          ]),
          lvl('chn-5b-ch2-l2', '词语默写', 'basic', 2, 'word', [
            { display: '妒忌', input: '妒忌' }, { display: '都督', input: '都督' },
            { display: '委托', input: '委托' }, { display: '惩罚', input: '惩罚' },
            { display: '探听', input: '探听' }, { display: '调度', input: '调度' },
          ]),
          lvl('chn-5b-ch2-l3', '课文默写', 'advanced', 3, 'paragraph', [
            { display: '周瑜看到诸葛亮挺有才干', input: '周瑜看到诸葛亮挺有才干' },
            { display: '心里很妒忌', input: '心里很妒忌' },
            { display: '有一天周瑜请诸葛亮商议军事', input: '有一天周瑜请诸葛亮商议军事' },
            { display: '说我们就要跟曹军交战', input: '说我们就要跟曹军交战' },
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
          lvl('chn-6a-ch1-l1', '拼音练习', 'warmup', 1, 'word', [
            { display: 'wei yi', input: 'wei yi' }, { display: 'pang bo', input: 'pang bo' },
            { display: 'yun ya', input: 'yun ya' }, { display: 'min shan', input: 'min shan' },
          ], 'zh-pinyin'),
          lvl('chn-6a-ch1-l2', '诗句默写', 'basic', 2, 'sentence', [
            { display: '红军不怕远征难', input: '红军不怕远征难' },
            { display: '万水千山只等闲', input: '万水千山只等闲' },
            { display: '五岭逶迤腾细浪', input: '五岭逶迤腾细浪' },
            { display: '乌蒙磅礴走泥丸', input: '乌蒙磅礴走泥丸' },
            { display: '金沙水拍云崖暖', input: '金沙水拍云崖暖' },
            { display: '大渡桥横铁索寒', input: '大渡桥横铁索寒' },
            { display: '更喜岷山千里雪', input: '更喜岷山千里雪' },
            { display: '三军过后尽开颜', input: '三军过后尽开颜' },
          ], 'zh-hanzi'),
          lvl('chn-6a-ch1-l3', '全诗默写', 'boss', 3, 'paragraph', [
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
          lvl('chn-6a-ch2-l2', '词语默写', 'basic', 2, 'word', [
            { display: '日寇', input: '日寇' }, { display: '河北', input: '河北' },
            { display: '副班长', input: '副班长' }, { display: '手榴弹', input: '手榴弹' },
            { display: '抡起', input: '抡起' }, { display: '悬崖', input: '悬崖' },
          ]),
          lvl('chn-6a-ch2-l3', '课文默写', 'advanced', 3, 'paragraph', [
            { display: '五位壮士屹立在狼牙山顶峰', input: '五位壮士屹立在狼牙山顶峰' },
            { display: '眺望着群众和部队主力远去的方向', input: '眺望着群众和部队主力远去的方向' },
            { display: '回头望望还在向上爬的敌人', input: '回头望望还在向上爬的敌人' },
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
          lvl('chn-6b-ch1-l1', '拼音练习', 'warmup', 1, 'word', [
            { display: 'qian chui', input: 'qian chui' }, { display: 'shen shan', input: 'shen shan' },
            { display: 'lie huo', input: 'lie huo' }, { display: 'qing bai', input: 'qing bai' },
          ], 'zh-pinyin'),
          lvl('chn-6b-ch1-l2', '诗句默写', 'basic', 2, 'sentence', [
            { display: '千锤万凿出深山', input: '千锤万凿出深山' },
            { display: '烈火焚烧若等闲', input: '烈火焚烧若等闲' },
            { display: '粉身碎骨浑不怕', input: '粉身碎骨浑不怕' },
            { display: '要留清白在人间', input: '要留清白在人间' },
          ], 'zh-hanzi'),
          lvl('chn-6b-ch1-l3', '全诗默写', 'boss', 3, 'paragraph', [
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
          lvl('chn-6b-ch2-l1', '生字练习', 'warmup', 1, 'char', [
            { display: '匆', input: '匆' }, { display: '涔', input: '涔' },
            { display: '潸', input: '潸' }, { display: '裸', input: '裸' },
            { display: '徘', input: '徘' }, { display: '徊', input: '徊' },
          ]),
          lvl('chn-6b-ch2-l2', '词语默写', 'basic', 2, 'word', [
            { display: '匆匆', input: '匆匆' }, { display: '头涔涔', input: '头涔涔' },
            { display: '泪潸潸', input: '泪潸潸' }, { display: '赤裸裸', input: '赤裸裸' },
            { display: '徘徊', input: '徘徊' }, { display: '凝然', input: '凝然' },
          ]),
          lvl('chn-6b-ch2-l3', '课文默写', 'advanced', 3, 'paragraph', [
            { display: '燕子去了有再来的时候', input: '燕子去了有再来的时候' },
            { display: '杨柳枯了有再青的时候', input: '杨柳枯了有再青的时候' },
            { display: '桃花谢了有再开的时候', input: '桃花谢了有再开的时候' },
            { display: '但是聪明的你告诉我', input: '但是聪明的你告诉我' },
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
