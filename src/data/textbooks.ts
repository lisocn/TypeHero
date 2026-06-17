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
      {
        id: 'eng-4a-ch3', title: 'My Friends', subtitle: 'Unit 3 我的朋友', order: 3, icon: '👫',
        levels: [
          lvl('eng-4a-ch3-l1', '朋友字母', 'warmup', 1, 'char', [
            { display: 'f', input: 'f' }, { display: 'r', input: 'r' }, { display: 'i', input: 'i' },
            { display: 'e', input: 'e' }, { display: 'n', input: 'n' }, { display: 'd', input: 'd' },
          ]),
          lvl('eng-4a-ch3-l2', '外貌词汇', 'basic', 2, 'word', [
            { display: 'tall', input: 'tall' }, { display: 'short', input: 'short' },
            { display: 'strong', input: 'strong' }, { display: 'thin', input: 'thin' },
            { display: 'quiet', input: 'quiet' }, { display: 'friendly', input: 'friendly' },
            { display: 'glasses', input: 'glasses' }, { display: 'shoe', input: 'shoe' },
          ]),
          lvl('eng-4a-ch3-l3', '描述朋友', 'advanced', 3, 'sentence', [
            { display: 'He is tall and strong.', input: 'He is tall and strong.' },
            { display: 'She has long hair.', input: 'She has long hair.' },
            { display: 'He has glasses.', input: 'He has glasses.' },
            { display: 'My friend is very friendly.', input: 'My friend is very friendly.' },
          ]),
          lvl('eng-4a-ch3-l4', '猜猜他是谁', 'boss', 4, 'paragraph', [
            { display: 'I have a good friend.', input: 'I have a good friend.' },
            { display: 'He is tall and thin.', input: 'He is tall and thin.' },
            { display: 'He has short hair and big eyes.', input: 'He has short hair and big eyes.' },
            { display: 'He is very quiet.', input: 'He is very quiet.' },
            { display: 'Who is he?', input: 'Who is he?' },
          ]),
        ],
      },
      {
        id: 'eng-4a-ch4', title: 'My Home', subtitle: 'Unit 4 我的家', order: 4, icon: '🏠',
        levels: [
          lvl('eng-4a-ch4-l1', '房间字母', 'warmup', 1, 'char', [
            { display: 'h', input: 'h' }, { display: 'o', input: 'o' }, { display: 'm', input: 'm' },
            { display: 'e', input: 'e' }, { display: 'b', input: 'b' }, { display: 'd', input: 'd' },
          ]),
          lvl('eng-4a-ch4-l2', '房间词汇', 'basic', 2, 'word', [
            { display: 'bedroom', input: 'bedroom' }, { display: 'living room', input: 'living room' },
            { display: 'kitchen', input: 'kitchen' }, { display: 'bathroom', input: 'bathroom' },
            { display: 'study', input: 'study' }, { display: 'phone', input: 'phone' },
            { display: 'table', input: 'table' }, { display: 'sofa', input: 'sofa' },
          ]),
          lvl('eng-4a-ch4-l3', '描述位置', 'advanced', 3, 'sentence', [
            { display: 'Where are my keys?', input: 'Where are my keys?' },
            { display: 'Are they on the table?', input: 'Are they on the table?' },
            { display: 'No, they are not.', input: 'No, they are not.' },
            { display: 'They are in the kitchen.', input: 'They are in the kitchen.' },
          ]),
          lvl('eng-4a-ch4-l4', '我的家', 'boss', 4, 'paragraph', [
            { display: 'This is my home.', input: 'This is my home.' },
            { display: 'I have a big living room.', input: 'I have a big living room.' },
            { display: 'My bedroom is small but nice.', input: 'My bedroom is small but nice.' },
            { display: 'I love my home.', input: 'I love my home.' },
          ]),
        ],
      },
      {
        id: 'eng-4a-ch5', title: "Dinner's Ready", subtitle: 'Unit 5 晚餐准备好了', order: 5, icon: '🍽️',
        levels: [
          lvl('eng-4a-ch5-l1', '食物字母', 'warmup', 1, 'char', [
            { display: 'b', input: 'b' }, { display: 'e', input: 'e' }, { display: 'e', input: 'e' },
            { display: 'f', input: 'f' }, { display: 'k', input: 'k' },
          ]),
          lvl('eng-4a-ch5-l2', '食物词汇', 'basic', 2, 'word', [
            { display: 'beef', input: 'beef' }, { display: 'chicken', input: 'chicken' },
            { display: 'noodles', input: 'noodles' }, { display: 'soup', input: 'soup' },
            { display: 'vegetable', input: 'vegetable' }, { display: 'rice', input: 'rice' },
            { display: 'bread', input: 'bread' }, { display: 'milk', input: 'milk' },
          ]),
          lvl('eng-4a-ch5-l3', '点餐句子', 'advanced', 3, 'sentence', [
            { display: "What's for dinner?", input: "What's for dinner?" },
            { display: 'What would you like?', input: 'What would you like?' },
            { display: 'I would like some soup.', input: 'I would like some soup.' },
            { display: 'Help yourself.', input: 'Help yourself.' },
          ]),
          lvl('eng-4a-ch5-l4', '晚餐对话', 'boss', 4, 'paragraph', [
            { display: 'Mum, I am hungry.', input: 'Mum, I am hungry.' },
            { display: 'What would you like for dinner?', input: 'What would you like for dinner?' },
            { display: 'I would like some beef and noodles.', input: 'I would like some beef and noodles.' },
            { display: 'Would you like some soup?', input: 'Would you like some soup?' },
            { display: 'Yes, please.', input: 'Yes, please.' },
          ]),
        ],
      },
      {
        id: 'eng-4a-ch6', title: 'Meet My Family', subtitle: 'Unit 6 见见我的家人', order: 6, icon: '👨‍👩‍👧‍👦',
        levels: [
          lvl('eng-4a-ch6-l1', '职业字母', 'warmup', 1, 'char', [
            { display: 'd', input: 'd' }, { display: 'o', input: 'o' }, { display: 'c', input: 'c' },
            { display: 'n', input: 'n' }, { display: 'r', input: 'r' },
          ]),
          lvl('eng-4a-ch6-l2', '家庭词汇', 'basic', 2, 'word', [
            { display: 'parents', input: 'parents' }, { display: 'uncle', input: 'uncle' },
            { display: 'aunt', input: 'aunt' }, { display: 'baby', input: 'baby' },
            { display: 'doctor', input: 'doctor' }, { display: 'driver', input: 'driver' },
            { display: 'farmer', input: 'farmer' }, { display: 'nurse', input: 'nurse' },
          ]),
          lvl('eng-4a-ch6-l3', '介绍家人', 'advanced', 3, 'sentence', [
            { display: 'How many people are there in your family?', input: 'How many people are there in your family?' },
            { display: 'My father is a doctor.', input: 'My father is a doctor.' },
            { display: 'My mother is a nurse.', input: 'My mother is a nurse.' },
            { display: 'I love my family.', input: 'I love my family.' },
          ]),
          lvl('eng-4a-ch6-l4', '家庭介绍', 'boss', 4, 'paragraph', [
            { display: 'This is my family.', input: 'This is my family.' },
            { display: 'My father is tall and strong.', input: 'My father is tall and strong.' },
            { display: 'He is a doctor.', input: 'He is a doctor.' },
            { display: 'My mother is beautiful.', input: 'My mother is beautiful.' },
            { display: 'She is a teacher.', input: 'She is a teacher.' },
            { display: 'I love them very much.', input: 'I love them very much.' },
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
      {
        id: 'eng-4b-ch3', title: 'My School Calendar', subtitle: 'Unit 3 学校日历', order: 3, icon: '📅',
        levels: [
          lvl('eng-4b-ch3-l1', '月份字母', 'warmup', 1, 'char', [
            { display: 'j', input: 'j' }, { display: 'f', input: 'f' }, { display: 'm', input: 'm' },
            { display: 'a', input: 'a' }, { display: 's', input: 's' }, { display: 'd', input: 'd' },
          ]),
          lvl('eng-4b-ch3-l2', '月份词汇', 'basic', 2, 'word', [
            { display: 'January', input: 'January' }, { display: 'February', input: 'February' },
            { display: 'March', input: 'March' }, { display: 'April', input: 'April' },
            { display: 'May', input: 'May' }, { display: 'June', input: 'June' },
            { display: 'July', input: 'July' }, { display: 'August', input: 'August' },
          ]),
          lvl('eng-4b-ch3-l3', '节日句子', 'advanced', 3, 'sentence', [
            { display: 'When is the school trip?', input: 'When is the school trip?' },
            { display: 'It is in May.', input: 'It is in May.' },
            { display: 'We have a singing contest in April.', input: 'We have a singing contest in April.' },
            { display: 'I like June best.', input: 'I like June best.' },
          ]),
          lvl('eng-4b-ch3-l4', '学校活动', 'boss', 4, 'paragraph', [
            { display: 'When is the sports meet?', input: 'When is the sports meet?' },
            { display: 'It is in April.', input: 'It is in April.' },
            { display: 'We have a school trip in May.', input: 'We have a school trip in May.' },
            { display: 'The singing contest is in June.', input: 'The singing contest is in June.' },
            { display: 'I love school activities!', input: 'I love school activities!' },
          ]),
        ],
      },
      {
        id: 'eng-4b-ch4', title: 'At the Farm', subtitle: 'Unit 4 在农场', order: 4, icon: '🐔',
        levels: [
          lvl('eng-4b-ch4-l1', '农场字母', 'warmup', 1, 'char', [
            { display: 'c', input: 'c' }, { display: 'o', input: 'o' }, { display: 'w', input: 'w' },
            { display: 'h', input: 'h' }, { display: 'e', input: 'e' }, { display: 'p', input: 'p' },
          ]),
          lvl('eng-4b-ch4-l2', '动物词汇', 'basic', 2, 'word', [
            { display: 'horse', input: 'horse' }, { display: 'cow', input: 'cow' },
            { display: 'hen', input: 'hen' }, { display: 'sheep', input: 'sheep' },
            { display: 'lamb', input: 'lamb' }, { display: 'goat', input: 'goat' },
            { display: 'tomato', input: 'tomato' }, { display: 'potato', input: 'potato' },
          ]),
          lvl('eng-4b-ch4-l3', '农场句子', 'advanced', 3, 'sentence', [
            { display: 'What are these?', input: 'What are these?' },
            { display: 'They are tomatoes.', input: 'They are tomatoes.' },
            { display: 'Are they horses?', input: 'Are they horses?' },
            { display: 'Yes, they are.', input: 'Yes, they are.' },
          ]),
          lvl('eng-4b-ch4-l4', '参观农场', 'boss', 4, 'paragraph', [
            { display: 'Welcome to the farm!', input: 'Welcome to the farm!' },
            { display: 'Look! What are these?', input: 'Look! What are these?' },
            { display: 'They are sheep.', input: 'They are sheep.' },
            { display: 'I like the tomatoes.', input: 'I like the tomatoes.' },
            { display: 'The farm is so big!', input: 'The farm is so big!' },
          ]),
        ],
      },
      {
        id: 'eng-4b-ch5', title: 'My Clothes', subtitle: 'Unit 5 我的衣服', order: 5, icon: '👗',
        levels: [
          lvl('eng-4b-ch5-l1', '衣服字母', 'warmup', 1, 'char', [
            { display: 'c', input: 'c' }, { display: 'o', input: 'o' }, { display: 'a', input: 'a' },
            { display: 't', input: 't' }, { display: 's', input: 's' }, { display: 'k', input: 'k' },
          ]),
          lvl('eng-4b-ch5-l2', '衣服词汇', 'basic', 2, 'word', [
            { display: 'dress', input: 'dress' }, { display: 'skirt', input: 'skirt' },
            { display: 'shirt', input: 'shirt' }, { display: 'jacket', input: 'jacket' },
            { display: 'sweater', input: 'sweater' }, { display: 'pants', input: 'pants' },
            { display: 'socks', input: 'socks' }, { display: 'shoes', input: 'shoes' },
          ]),
          lvl('eng-4b-ch5-l3', '衣服句子', 'advanced', 3, 'sentence', [
            { display: 'Whose coat is this?', input: 'Whose coat is this?' },
            { display: 'It is mine.', input: 'It is mine.' },
            { display: 'I like that green skirt.', input: 'I like that green skirt.' },
            { display: 'These are my pants.', input: 'These are my pants.' },
          ]),
          lvl('eng-4b-ch5-l4', '穿衣搭配', 'boss', 4, 'paragraph', [
            { display: 'Are these your shoes?', input: 'Are these your shoes?' },
            { display: 'No, they are not.', input: 'No, they are not.' },
            { display: 'Whose pants are those?', input: 'Whose pants are those?' },
            { display: 'They are my sister\'s.', input: 'They are my sister\'s.' },
            { display: 'I like your dress.', input: 'I like your dress.' },
          ]),
        ],
      },
      {
        id: 'eng-4b-ch6', title: 'Shopping', subtitle: 'Unit 6 购物', order: 6, icon: '🛒',
        levels: [
          lvl('eng-4b-ch6-l1', '购物字母', 'warmup', 1, 'char', [
            { display: 'g', input: 'g' }, { display: 'o', input: 'o' }, { display: 's', input: 's' },
            { display: 'h', input: 'h' }, { display: 'p', input: 'p' },
          ]),
          lvl('eng-4b-ch6-l2', '购物词汇', 'basic', 2, 'word', [
            { display: 'sunglasses', input: 'sunglasses' }, { display: 'gloves', input: 'gloves' },
            { display: 'scarf', input: 'scarf' }, { display: 'umbrella', input: 'umbrella' },
            { display: 'pretty', input: 'pretty' }, { display: 'cheap', input: 'cheap' },
            { display: 'expensive', input: 'expensive' }, { display: 'nice', input: 'nice' },
          ]),
          lvl('eng-4b-ch6-l3', '购物句子', 'advanced', 3, 'sentence', [
            { display: 'Can I help you?', input: 'Can I help you?' },
            { display: 'How much is this skirt?', input: 'How much is this skirt?' },
            { display: 'It is eighty-nine yuan.', input: 'It is eighty-nine yuan.' },
            { display: 'That is too expensive.', input: 'That is too expensive.' },
          ]),
          lvl('eng-4b-ch6-l4', '购物对话', 'boss', 4, 'paragraph', [
            { display: 'Can I help you?', input: 'Can I help you?' },
            { display: 'Yes, I want a dress.', input: 'Yes, I want a dress.' },
            { display: 'How about this one?', input: 'How about this one?' },
            { display: 'It is pretty. How much?', input: 'It is pretty. How much?' },
            { display: 'It is ninety-nine yuan.', input: 'It is ninety-nine yuan.' },
            { display: 'I will take it.', input: 'I will take it.' },
          ]),
        ],
      },
    ],
  },
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
      {
        id: 'eng-5a-ch3', title: 'What Would You Like?', subtitle: 'Unit 3 你想要什么', order: 3, icon: '🍔',
        levels: [
          lvl('eng-5a-ch3-l1', '食物字母', 'warmup', 1, 'char', [
            { display: 's', input: 's' }, { display: 'a', input: 'a' }, { display: 'l', input: 'l' },
            { display: 'd', input: 'd' }, { display: 't', input: 't' },
          ]),
          lvl('eng-5a-ch3-l2', '食物词汇', 'basic', 2, 'word', [
            { display: 'sandwich', input: 'sandwich' }, { display: 'salad', input: 'salad' },
            { display: 'hamburger', input: 'hamburger' }, { display: 'ice cream', input: 'ice cream' },
            { display: 'tea', input: 'tea' }, { display: 'fresh', input: 'fresh' },
            { display: 'healthy', input: 'healthy' }, { display: 'delicious', input: 'delicious' },
          ]),
          lvl('eng-5a-ch3-l3', '点餐句子', 'advanced', 3, 'sentence', [
            { display: 'What would you like to eat?', input: 'What would you like to eat?' },
            { display: 'I would like a sandwich.', input: 'I would like a sandwich.' },
            { display: 'What would you like to drink?', input: 'What would you like to drink?' },
            { display: 'I would like some tea.', input: 'I would like some tea.' },
          ]),
          lvl('eng-5a-ch3-l4', '餐厅对话', 'boss', 4, 'paragraph', [
            { display: 'I am hungry.', input: 'I am hungry.' },
            { display: 'What would you like to eat?', input: 'What would you like to eat?' },
            { display: 'A sandwich, please.', input: 'A sandwich, please.' },
            { display: 'What would you like to drink?', input: 'What would you like to drink?' },
            { display: 'Some milk, please.', input: 'Some milk, please.' },
            { display: 'OK. Here you are.', input: 'OK. Here you are.' },
          ]),
        ],
      },
      {
        id: 'eng-5a-ch4', title: 'What Can You Do?', subtitle: 'Unit 4 你能做什么', order: 4, icon: '💪',
        levels: [
          lvl('eng-5a-ch4-l1', '能力字母', 'warmup', 1, 'char', [
            { display: 'c', input: 'c' }, { display: 'a', input: 'a' }, { display: 'n', input: 'n' },
            { display: 'd', input: 'd' }, { display: 'o', input: 'o' },
          ]),
          lvl('eng-5a-ch4-l2', '能力词汇', 'basic', 2, 'word', [
            { display: 'sing', input: 'sing' }, { display: 'dance', input: 'dance' },
            { display: 'draw cartoons', input: 'draw cartoons' }, { display: 'do kung fu', input: 'do kung fu' },
            { display: 'play the pipa', input: 'play the pipa' }, { display: 'cook', input: 'cook' },
            { display: 'swim', input: 'swim' }, { display: 'speak English', input: 'speak English' },
          ]),
          lvl('eng-5a-ch4-l3', '能力句子', 'advanced', 3, 'sentence', [
            { display: 'What can you do for the party?', input: 'What can you do for the party?' },
            { display: 'I can sing English songs.', input: 'I can sing English songs.' },
            { display: 'Can you do kung fu?', input: 'Can you do kung fu?' },
            { display: 'Yes, I can.', input: 'Yes, I can.' },
          ]),
          lvl('eng-5a-ch4-l4', '才艺展示', 'boss', 4, 'paragraph', [
            { display: 'We will have a party.', input: 'We will have a party.' },
            { display: 'What can you do, Mike?', input: 'What can you do, Mike?' },
            { display: 'I can sing and dance.', input: 'I can sing and dance.' },
            { display: 'What about you, John?', input: 'What about you, John?' },
            { display: 'I can do kung fu.', input: 'I can do kung fu.' },
            { display: 'Wonderful!', input: 'Wonderful!' },
          ]),
        ],
      },
      {
        id: 'eng-5a-ch5', title: 'There Is a Big Bed', subtitle: 'Unit 5 有一张大床', order: 5, icon: '🛏️',
        levels: [
          lvl('eng-5a-ch5-l1', '房间字母', 'warmup', 1, 'char', [
            { display: 'b', input: 'b' }, { display: 'e', input: 'e' }, { display: 'd', input: 'd' },
            { display: 'p', input: 'p' }, { display: 'l', input: 'l' },
          ]),
          lvl('eng-5a-ch5-l2', '家具词汇', 'basic', 2, 'word', [
            { display: 'clock', input: 'clock' }, { display: 'plant', input: 'plant' },
            { display: 'bottle', input: 'bottle' }, { display: 'bike', input: 'bike' },
            { display: 'photo', input: 'photo' }, { display: 'front', input: 'front' },
            { display: 'between', input: 'between' }, { display: 'above', input: 'above' },
          ]),
          lvl('eng-5a-ch5-l3', '位置句子', 'advanced', 3, 'sentence', [
            { display: 'There is a big bed.', input: 'There is a big bed.' },
            { display: 'There is a photo above the bed.', input: 'There is a photo above the bed.' },
            { display: 'The clock is in front of the door.', input: 'The clock is in front of the door.' },
            { display: 'There are many books on the desk.', input: 'There are many books on the desk.' },
          ]),
          lvl('eng-5a-ch5-l4', '我的房间', 'boss', 4, 'paragraph', [
            { display: 'This is my room.', input: 'This is my room.' },
            { display: 'There is a big bed and a nice desk.', input: 'There is a big bed and a nice desk.' },
            { display: 'There is a photo above my bed.', input: 'There is a photo above my bed.' },
            { display: 'My books are on the shelf.', input: 'My books are on the shelf.' },
            { display: 'I love my room.', input: 'I love my room.' },
          ]),
        ],
      },
      {
        id: 'eng-5a-ch6', title: 'In a Nature Park', subtitle: 'Unit 6 在自然公园', order: 6, icon: '🌲',
        levels: [
          lvl('eng-5a-ch6-l1', '自然字母', 'warmup', 1, 'char', [
            { display: 'p', input: 'p' }, { display: 'l', input: 'l' }, { display: 'r', input: 'r' },
            { display: 'v', input: 'v' }, { display: 'l', input: 'l' },
          ]),
          lvl('eng-5a-ch6-l2', '自然词汇', 'basic', 2, 'word', [
            { display: 'forest', input: 'forest' }, { display: 'river', input: 'river' },
            { display: 'lake', input: 'lake' }, { display: 'mountain', input: 'mountain' },
            { display: 'hill', input: 'hill' }, { display: 'tree', input: 'tree' },
            { display: 'bridge', input: 'bridge' }, { display: 'village', input: 'village' },
          ]),
          lvl('eng-5a-ch6-l3', '自然句子', 'advanced', 3, 'sentence', [
            { display: 'Is there a river in the park?', input: 'Is there a river in the park?' },
            { display: 'Yes, there is.', input: 'Yes, there is.' },
            { display: 'Are there any mountains?', input: 'Are there any mountains?' },
            { display: 'No, there are not.', input: 'No, there are not.' },
          ]),
          lvl('eng-5a-ch6-l4', '自然公园', 'boss', 4, 'paragraph', [
            { display: 'Let us go to the nature park!', input: 'Let us go to the nature park!' },
            { display: 'Is there a lake?', input: 'Is there a lake?' },
            { display: 'Yes, there is a beautiful lake.', input: 'Yes, there is a beautiful lake.' },
            { display: 'Are there any flowers?', input: 'Are there any flowers?' },
            { display: 'Yes, there are many flowers.', input: 'Yes, there are many flowers.' },
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
      {
        id: 'eng-5b-ch3', title: 'My School Calendar', subtitle: 'Unit 3 我的校历', order: 3, icon: '📆',
        levels: [
          lvl('eng-5b-ch3-l1', '月份字母', 'warmup', 1, 'char', [
            { display: 's', input: 's' }, { display: 'e', input: 'e' }, { display: 'p', input: 'p' },
            { display: 'o', input: 'o' }, { display: 'n', input: 'n' },
          ]),
          lvl('eng-5b-ch3-l2', '月份词汇', 'basic', 2, 'word', [
            { display: 'September', input: 'September' }, { display: 'October', input: 'October' },
            { display: 'November', input: 'November' }, { display: 'December', input: 'December' },
            { display: 'New Year', input: 'New Year' }, { display: 'Christmas', input: 'Christmas' },
            { display: 'summer vacation', input: 'summer vacation' }, { display: 'sports meet', input: 'sports meet' },
          ]),
          lvl('eng-5b-ch3-l3', '月份句子', 'advanced', 3, 'sentence', [
            { display: 'When is the sports meet?', input: 'When is the sports meet?' },
            { display: 'It is in October.', input: 'It is in October.' },
            { display: 'When is the school trip?', input: 'When is the school trip?' },
            { display: 'It is in November.', input: 'It is in November.' },
          ]),
          lvl('eng-5b-ch3-l4', '学校活动', 'boss', 4, 'paragraph', [
            { display: 'We have a singing contest in September.', input: 'We have a singing contest in September.' },
            { display: 'The sports meet is in October.', input: 'The sports meet is in October.' },
            { display: 'We have a school trip in November.', input: 'We have a school trip in November.' },
            { display: 'Christmas is in December.', input: 'Christmas is in December.' },
          ]),
        ],
      },
      {
        id: 'eng-5b-ch4', title: 'When Is Easter?', subtitle: 'Unit 4 复活节是什么时候', order: 4, icon: '🐣',
        levels: [
          lvl('eng-5b-ch4-l1', '序数词', 'warmup', 1, 'char', [
            { display: 'f', input: 'f' }, { display: 'i', input: 'i' }, { display: 'r', input: 'r' },
            { display: 's', input: 's' }, { display: 't', input: 't' },
          ]),
          lvl('eng-5b-ch4-l2', '序数词', 'basic', 2, 'word', [
            { display: 'first', input: 'first' }, { display: 'second', input: 'second' },
            { display: 'third', input: 'third' }, { display: 'fourth', input: 'fourth' },
            { display: 'fifth', input: 'fifth' }, { display: 'twelfth', input: 'twelfth' },
            { display: 'twentieth', input: 'twentieth' }, { display: 'special', input: 'special' },
          ]),
          lvl('eng-5b-ch4-l3', '日期句子', 'advanced', 3, 'sentence', [
            { display: 'When is your birthday?', input: 'When is your birthday?' },
            { display: 'It is on April fourth.', input: 'It is on April fourth.' },
            { display: 'When is Mother\'s Day?', input: "When is Mother's Day?" },
            { display: 'It is in May.', input: 'It is in May.' },
          ]),
          lvl('eng-5b-ch4-l4', '生日对话', 'boss', 4, 'paragraph', [
            { display: 'When is your birthday?', input: 'When is your birthday?' },
            { display: 'My birthday is on January first.', input: 'My birthday is on January first.' },
            { display: 'That is New Year\'s Day!', input: "That is New Year's Day!" },
            { display: 'Yes, it is very special.', input: 'Yes, it is very special.' },
            { display: 'Happy birthday!', input: 'Happy birthday!' },
          ]),
        ],
      },
      {
        id: 'eng-5b-ch5', title: 'Whose Dog Is It?', subtitle: 'Unit 5 这是谁的狗', order: 5, icon: '🐕',
        levels: [
          lvl('eng-5b-ch5-l1', '动物字母', 'warmup', 1, 'char', [
            { display: 'd', input: 'd' }, { display: 'o', input: 'o' }, { display: 'g', input: 'g' },
            { display: 'c', input: 'c' }, { display: 't', input: 't' },
          ]),
          lvl('eng-5b-ch5-l2', '动物词汇', 'basic', 2, 'word', [
            { display: 'mine', input: 'mine' }, { display: 'yours', input: 'yours' },
            { display: 'his', input: 'his' }, { display: 'hers', input: 'hers' },
            { display: 'climbing', input: 'climbing' }, { display: 'eating', input: 'eating' },
            { display: 'playing', input: 'playing' }, { display: 'sleeping', input: 'sleeping' },
          ]),
          lvl('eng-5b-ch5-l3', '所有格句子', 'advanced', 3, 'sentence', [
            { display: 'Whose book is this?', input: 'Whose book is this?' },
            { display: 'It is mine.', input: 'It is mine.' },
            { display: 'The cat is hers.', input: 'The cat is hers.' },
            { display: 'The dog is playing.', input: 'The dog is playing.' },
          ]),
          lvl('eng-5b-ch5-l4', '宠物对话', 'boss', 4, 'paragraph', [
            { display: 'Whose dog is that?', input: 'Whose dog is that?' },
            { display: 'It is Zhang Peng\'s.', input: "It is Zhang Peng's." },
            { display: 'What is the dog doing?', input: 'What is the dog doing?' },
            { display: 'It is playing with a ball.', input: 'It is playing with a ball.' },
            { display: 'It is so cute!', input: 'It is so cute!' },
          ]),
        ],
      },
      {
        id: 'eng-5b-ch6', title: 'Work Quietly!', subtitle: 'Unit 6 安静地工作', order: 6, icon: '📚',
        levels: [
          lvl('eng-5b-ch6-l1', '规则字母', 'warmup', 1, 'char', [
            { display: 'q', input: 'q' }, { display: 'u', input: 'u' }, { display: 'i', input: 'i' },
            { display: 'e', input: 'e' }, { display: 't', input: 't' },
          ]),
          lvl('eng-5b-ch6-l2', '规则词汇', 'basic', 2, 'word', [
            { display: 'doing morning exercises', input: 'doing morning exercises' },
            { display: 'having class', input: 'having class' },
            { display: 'eating lunch', input: 'eating lunch' },
            { display: 'reading a book', input: 'reading a book' },
            { display: 'listening to music', input: 'listening to music' },
            { display: 'keep to the right', input: 'keep to the right' },
          ]),
          lvl('eng-5b-ch6-l3', '规则句子', 'advanced', 3, 'sentence', [
            { display: 'What are they doing?', input: 'What are they doing?' },
            { display: 'They are eating lunch.', input: 'They are eating lunch.' },
            { display: 'Talk quietly.', input: 'Talk quietly.' },
            { display: 'Keep your desk clean.', input: 'Keep your desk clean.' },
          ]),
          lvl('eng-5b-ch6-l4', '课堂规则', 'boss', 4, 'paragraph', [
            { display: 'What are the students doing?', input: 'What are the students doing?' },
            { display: 'They are having an English class.', input: 'They are having an English class.' },
            { display: 'Talk quietly, please.', input: 'Talk quietly, please.' },
            { display: 'Keep your desk clean.', input: 'Keep your desk clean.' },
            { display: 'Take turns when you talk.', input: 'Take turns when you talk.' },
          ]),
        ],
      },
    ],
  },
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
      {
        id: 'eng-6a-ch3', title: 'My Weekend Plan', subtitle: 'Unit 3 我的周末计划', order: 3, icon: '📋',
        levels: [
          lvl('eng-6a-ch3-l1', '计划字母', 'warmup', 1, 'char', [
            { display: 'p', input: 'p' }, { display: 'l', input: 'l' }, { display: 'a', input: 'a' },
            { display: 'n', input: 'n' }, { display: 'w', input: 'w' },
          ]),
          lvl('eng-6a-ch3-l2', '计划词汇', 'basic', 2, 'word', [
            { display: 'visit grandparents', input: 'visit grandparents' },
            { display: 'see a film', input: 'see a film' },
            { display: 'take a trip', input: 'take a trip' },
            { display: 'go to the supermarket', input: 'go to the supermarket' },
            { display: 'this morning', input: 'this morning' }, { display: 'tonight', input: 'tonight' },
            { display: 'tomorrow', input: 'tomorrow' }, { display: 'dictionary', input: 'dictionary' },
          ]),
          lvl('eng-6a-ch3-l3', '计划句子', 'advanced', 3, 'sentence', [
            { display: 'What are you going to do?', input: 'What are you going to do?' },
            { display: 'I am going to see a film.', input: 'I am going to see a film.' },
            { display: 'When are you going?', input: 'When are you going?' },
            { display: 'This afternoon.', input: 'This afternoon.' },
          ]),
          lvl('eng-6a-ch3-l4', '周末计划', 'boss', 4, 'paragraph', [
            { display: 'What are you going to do this weekend?', input: 'What are you going to do this weekend?' },
            { display: 'I am going to visit my grandparents.', input: 'I am going to visit my grandparents.' },
            { display: 'I am going to see a film on Saturday.', input: 'I am going to see a film on Saturday.' },
            { display: 'I am going to take a trip on Sunday.', input: 'I am going to take a trip on Sunday.' },
            { display: 'Sounds like a great weekend!', input: 'Sounds like a great weekend!' },
          ]),
        ],
      },
      {
        id: 'eng-6a-ch4', title: 'I Have a Pen Pal', subtitle: 'Unit 4 我有一个笔友', order: 4, icon: '✉️',
        levels: [
          lvl('eng-6a-ch4-l1', '爱好字母', 'warmup', 1, 'char', [
            { display: 'h', input: 'h' }, { display: 'o', input: 'o' }, { display: 'b', input: 'b' },
            { display: 'y', input: 'y' }, { display: 's', input: 's' },
          ]),
          lvl('eng-6a-ch4-l2', '爱好词汇', 'basic', 2, 'word', [
            { display: 'singing', input: 'singing' }, { display: 'dancing', input: 'dancing' },
            { display: 'reading stories', input: 'reading stories' },
            { display: 'playing football', input: 'playing football' },
            { display: 'doing kung fu', input: 'doing kung fu' },
            { display: 'drawing cartoons', input: 'drawing cartoons' },
            { display: 'cooks Chinese food', input: 'cooks Chinese food' },
            { display: 'studies Chinese', input: 'studies Chinese' },
          ]),
          lvl('eng-6a-ch4-l3', '爱好句子', 'advanced', 3, 'sentence', [
            { display: 'What are your hobbies?', input: 'What are your hobbies?' },
            { display: 'I like singing and dancing.', input: 'I like singing and dancing.' },
            { display: 'Does he like reading stories?', input: 'Does he like reading stories?' },
            { display: 'Yes, he does.', input: 'Yes, he does.' },
          ]),
          lvl('eng-6a-ch4-l4', '笔友对话', 'boss', 4, 'paragraph', [
            { display: 'I have a new pen pal.', input: 'I have a new pen pal.' },
            { display: 'What are his hobbies?', input: 'What are his hobbies?' },
            { display: 'He likes playing football and doing kung fu.', input: 'He likes playing football and doing kung fu.' },
            { display: 'Does he live in Beijing?', input: 'Does he live in Beijing?' },
            { display: 'Yes, he does.', input: 'Yes, he does.' },
          ]),
        ],
      },
      {
        id: 'eng-6a-ch5', title: 'What Does He Do?', subtitle: 'Unit 5 他是做什么的', order: 5, icon: '👨‍⚕️',
        levels: [
          lvl('eng-6a-ch5-l1', '职业字母', 'warmup', 1, 'char', [
            { display: 'w', input: 'w' }, { display: 'o', input: 'o' }, { display: 'r', input: 'r' },
            { display: 'k', input: 'k' }, { display: 'e', input: 'e' },
          ]),
          lvl('eng-6a-ch5-l2', '职业词汇', 'basic', 2, 'word', [
            { display: 'factory worker', input: 'factory worker' },
            { display: 'postman', input: 'postman' }, { display: 'businessman', input: 'businessman' },
            { display: 'police officer', input: 'police officer' },
            { display: 'fisherman', input: 'fisherman' }, { display: 'scientist', input: 'scientist' },
            { display: 'pilot', input: 'pilot' }, { display: 'coach', input: 'coach' },
          ]),
          lvl('eng-6a-ch5-l3', '职业句子', 'advanced', 3, 'sentence', [
            { display: 'What does your father do?', input: 'What does your father do?' },
            { display: 'He is a police officer.', input: 'He is a police officer.' },
            { display: 'Where does he work?', input: 'Where does he work?' },
            { display: 'He works in a hospital.', input: 'He works in a hospital.' },
          ]),
          lvl('eng-6a-ch5-l4', '职业对话', 'boss', 4, 'paragraph', [
            { display: 'What does your mother do?', input: 'What does your mother do?' },
            { display: 'She is a scientist.', input: 'She is a scientist.' },
            { display: 'Where does she work?', input: 'Where does she work?' },
            { display: 'She works in a university.', input: 'She works in a university.' },
            { display: 'I want to be a scientist too.', input: 'I want to be a scientist too.' },
          ]),
        ],
      },
      {
        id: 'eng-6a-ch6', title: 'How Do You Feel?', subtitle: 'Unit 6 你感觉怎么样', order: 6, icon: '😊',
        levels: [
          lvl('eng-6a-ch6-l1', '情感字母', 'warmup', 1, 'char', [
            { display: 'h', input: 'h' }, { display: 'a', input: 'a' }, { display: 'p', input: 'p' },
            { display: 'y', input: 'y' }, { display: 's', input: 's' },
          ]),
          lvl('eng-6a-ch6-l2', '情感词汇', 'basic', 2, 'word', [
            { display: 'angry', input: 'angry' }, { display: 'afraid', input: 'afraid' },
            { display: 'sad', input: 'sad' }, { display: 'worried', input: 'worried' },
            { display: 'happy', input: 'happy' }, { display: 'ill', input: 'ill' },
            { display: 'see a doctor', input: 'see a doctor' }, { display: 'take a deep breath', input: 'take a deep breath' },
          ]),
          lvl('eng-6a-ch6-l3', '情感句子', 'advanced', 3, 'sentence', [
            { display: 'How do you feel?', input: 'How do you feel?' },
            { display: 'I am happy today.', input: 'I am happy today.' },
            { display: 'What is wrong?', input: 'What is wrong?' },
            { display: 'I am worried about my test.', input: 'I am worried about my test.' },
          ]),
          lvl('eng-6a-ch6-l4', '情感对话', 'boss', 4, 'paragraph', [
            { display: 'You look sad. What is wrong?', input: 'You look sad. What is wrong?' },
            { display: 'I lost my pencil box.', input: 'I lost my pencil box.' },
            { display: 'Do not worry. Let me help you.', input: 'Do not worry. Let me help you.' },
            { display: 'Thank you. I feel better now.', input: 'Thank you. I feel better now.' },
            { display: 'You are welcome.', input: 'You are welcome.' },
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
      {
        id: 'eng-6b-ch3', title: 'Where Did You Go?', subtitle: 'Unit 3 你去了哪里', order: 3, icon: '✈️',
        levels: [
          lvl('eng-6b-ch3-l1', '旅行字母', 'warmup', 1, 'char', [
            { display: 't', input: 't' }, { display: 'r', input: 'r' }, { display: 'a', input: 'a' },
            { display: 'v', input: 'v' }, { display: 'l', input: 'l' },
          ]),
          lvl('eng-6b-ch3-l2', '旅行词汇', 'basic', 2, 'word', [
            { display: 'went camping', input: 'went camping' }, { display: 'went fishing', input: 'went fishing' },
            { display: 'rode a horse', input: 'rode a horse' }, { display: 'rode a bike', input: 'rode a bike' },
            { display: 'hurt my foot', input: 'hurt my foot' }, { display: 'took pictures', input: 'took pictures' },
            { display: 'bought gifts', input: 'bought gifts' }, { display: 'fell off', input: 'fell off' },
          ]),
          lvl('eng-6b-ch3-l3', '旅行句子', 'advanced', 3, 'sentence', [
            { display: 'Where did you go over the holiday?', input: 'Where did you go over the holiday?' },
            { display: 'I went to Sanya.', input: 'I went to Sanya.' },
            { display: 'What did you do?', input: 'What did you do?' },
            { display: 'I took pictures and bought gifts.', input: 'I took pictures and bought gifts.' },
          ]),
          lvl('eng-6b-ch3-l4', '假期旅行', 'boss', 4, 'paragraph', [
            { display: 'How was your holiday?', input: 'How was your holiday?' },
            { display: 'It was great! I went to Xinjiang.', input: 'It was great! I went to Xinjiang.' },
            { display: 'I rode a horse and went camping.', input: 'I rode a horse and went camping.' },
            { display: 'I took many pictures.', input: 'I took many pictures.' },
            { display: 'That sounds wonderful!', input: 'That sounds wonderful!' },
          ]),
        ],
      },
      {
        id: 'eng-6b-ch4', title: 'Then and Now', subtitle: 'Unit 4 过去和现在', order: 4, icon: '⏳',
        levels: [
          lvl('eng-6b-ch4-l1', '变化字母', 'warmup', 1, 'char', [
            { display: 't', input: 't' }, { display: 'h', input: 'h' }, { display: 'e', input: 'e' },
            { display: 'n', input: 'n' }, { display: 'n', input: 'n' },
          ]),
          lvl('eng-6b-ch4-l2', '过去式词汇', 'basic', 2, 'word', [
            { display: 'dining hall', input: 'dining hall' }, { display: 'gym', input: 'gym' },
            { display: 'grass', input: 'grass' }, { display: 'ago', input: 'ago' },
            { display: 'cycling', input: 'cycling' }, { display: 'ice-skate', input: 'ice-skate' },
            { display: 'badminton', input: 'badminton' }, { display: 'star', input: 'star' },
          ]),
          lvl('eng-6b-ch4-l3', '变化句子', 'advanced', 3, 'sentence', [
            { display: 'There was no gym in my school before.', input: 'There was no gym in my school before.' },
            { display: 'Now we have a new gym.', input: 'Now we have a new gym.' },
            { display: 'I could not ride a bike before.', input: 'I could not ride a bike before.' },
            { display: 'Now I can ride very well.', input: 'Now I can ride very well.' },
          ]),
          lvl('eng-6b-ch4-l4', '成长变化', 'boss', 4, 'paragraph', [
            { display: 'I am taller now.', input: 'I am taller now.' },
            { display: 'Before I could not swim.', input: 'Before I could not swim.' },
            { display: 'Now I can swim very fast.', input: 'Now I can swim very fast.' },
            { display: 'Our school is different too.', input: 'Our school is different too.' },
            { display: 'We have a library and a gym now.', input: 'We have a library and a gym now.' },
            { display: 'I love our school!', input: 'I love our school!' },
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
      {
        id: 'chn-4a-ch3', title: '鹿柴', subtitle: '古诗词·王维', order: 3, icon: '🦌',
        levels: [
          lvl('chn-4a-ch3-l1', '拼音练习', 'warmup', 1, 'word', [
            { display: 'lu zhai', input: 'lu zhai' }, { display: 'kong shan', input: 'kong shan' },
            { display: 'yu xiang', input: 'yu xiang' }, { display: 'fan jing', input: 'fan jing' },
          ], 'zh-pinyin'),
          lvl('chn-4a-ch3-l2', '诗句默写', 'basic', 2, 'sentence', [
            { display: '空山不见人', input: '空山不见人' },
            { display: '但闻人语响', input: '但闻人语响' },
            { display: '返景入深林', input: '返景入深林' },
            { display: '复照青苔上', input: '复照青苔上' },
          ], 'zh-hanzi'),
          lvl('chn-4a-ch3-l3', '全诗默写', 'boss', 3, 'paragraph', [
            { display: '鹿柴', input: '鹿柴', hint: '题目' },
            { display: '唐 王维', input: '唐 王维', hint: '作者' },
            { display: '空山不见人', input: '空山不见人' },
            { display: '但闻人语响', input: '但闻人语响' },
            { display: '返景入深林', input: '返景入深林' },
            { display: '复照青苔上', input: '复照青苔上' },
          ], 'zh-hanzi'),
        ],
      },
      {
        id: 'chn-4a-ch4', title: '蟋蟀的住宅', subtitle: '课文精读·法布尔', order: 4, icon: '🦗',
        levels: [
          lvl('chn-4a-ch4-l1', '生字练习', 'warmup', 1, 'char', [
            { display: '宅', input: '宅' }, { display: '临', input: '临' },
            { display: '慎', input: '慎' }, { display: '址', input: '址' },
            { display: '穴', input: '穴' }, { display: '掘', input: '掘' },
          ]),
          lvl('chn-4a-ch4-l2', '词语默写', 'basic', 2, 'word', [
            { display: '住宅', input: '住宅' }, { display: '临时', input: '临时' },
            { display: '慎重', input: '慎重' }, { display: '地址', input: '地址' },
            { display: '洞穴', input: '洞穴' }, { display: '挖掘', input: '挖掘' },
            { display: '搜索', input: '搜索' }, { display: '粗糙', input: '粗糙' },
          ]),
          lvl('chn-4a-ch4-l3', '课文默写', 'advanced', 3, 'paragraph', [
            { display: '蟋蟀的住宅在草地上', input: '蟋蟀的住宅在草地上' },
            { display: '它的出口有一丛草挡着', input: '它的出口有一丛草挡着' },
            { display: '那就是蟋蟀的门', input: '那就是蟋蟀的门' },
            { display: '住宅内部很光滑很平整', input: '住宅内部很光滑很平整' },
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
      {
        id: 'chn-4b-ch3', title: '宿新市徐公店', subtitle: '古诗词·杨万里', order: 3, icon: '🏡',
        levels: [
          lvl('chn-4b-ch3-l1', '拼音练习', 'warmup', 1, 'word', [
            { display: 'shu xin shi', input: 'shu xin shi' }, { display: 'li shu', input: 'li shu' },
            { display: 'hua luo', input: 'hua luo' }, { display: 'huang die', input: 'huang die' },
          ], 'zh-pinyin'),
          lvl('chn-4b-ch3-l2', '诗句默写', 'basic', 2, 'sentence', [
            { display: '篱落疏疏一径深', input: '篱落疏疏一径深' },
            { display: '树头新绿未成阴', input: '树头新绿未成阴' },
            { display: '儿童急走追黄蝶', input: '儿童急走追黄蝶' },
            { display: '飞入菜花无处寻', input: '飞入菜花无处寻' },
          ], 'zh-hanzi'),
          lvl('chn-4b-ch3-l3', '全诗默写', 'boss', 3, 'paragraph', [
            { display: '宿新市徐公店', input: '宿新市徐公店', hint: '题目' },
            { display: '宋 杨万里', input: '宋 杨万里', hint: '作者' },
            { display: '篱落疏疏一径深', input: '篱落疏疏一径深' },
            { display: '树头新绿未成阴', input: '树头新绿未成阴' },
            { display: '儿童急走追黄蝶', input: '儿童急走追黄蝶' },
            { display: '飞入菜花无处寻', input: '飞入菜花无处寻' },
          ], 'zh-hanzi'),
        ],
      },
      {
        id: 'chn-4b-ch4', title: '清平乐·村居', subtitle: '古诗词·辛弃疾', order: 4, icon: '🏡',
        levels: [
          lvl('chn-4b-ch4-l1', '拼音练习', 'warmup', 1, 'word', [
            { display: 'wu yan', input: 'wu yan' }, { display: 'lao weng', input: 'lao weng' },
            { display: 'lian peng', input: 'lian peng' },
          ], 'zh-pinyin'),
          lvl('chn-4b-ch4-l2', '词句默写', 'basic', 2, 'sentence', [
            { display: '茅檐低小', input: '茅檐低小' },
            { display: '溪上青青草', input: '溪上青青草' },
            { display: '醉里吴音相媚好', input: '醉里吴音相媚好' },
            { display: '白发谁家翁媪', input: '白发谁家翁媪' },
            { display: '大儿锄豆溪东', input: '大儿锄豆溪东' },
            { display: '中儿正织鸡笼', input: '中儿正织鸡笼' },
          ], 'zh-hanzi'),
          lvl('chn-4b-ch4-l3', '全词默写', 'boss', 3, 'paragraph', [
            { display: '清平乐·村居', input: '清平乐 村居', hint: '题目' },
            { display: '宋 辛弃疾', input: '宋 辛弃疾', hint: '作者' },
            { display: '茅檐低小', input: '茅檐低小' },
            { display: '溪上青青草', input: '溪上青青草' },
            { display: '醉里吴音相媚好', input: '醉里吴音相媚好' },
            { display: '白发谁家翁媪', input: '白发谁家翁媪' },
            { display: '最喜小儿亡赖', input: '最喜小儿亡赖' },
            { display: '溪头卧剥莲蓬', input: '溪头卧剥莲蓬' },
          ], 'zh-hanzi'),
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
      {
        id: 'chn-5a-ch3', title: '题临安邸', subtitle: '古诗词·林升', order: 3, icon: '🏯',
        levels: [
          lvl('chn-5a-ch3-l1', '拼音练习', 'warmup', 1, 'word', [
            { display: 'shan wai', input: 'shan wai' }, { display: 'lou wai lou', input: 'lou wai lou' },
            { display: 'xun hang', input: 'xun hang' }, { display: 'zui zhou', input: 'zui zhou' },
          ], 'zh-pinyin'),
          lvl('chn-5a-ch3-l2', '诗句默写', 'basic', 2, 'sentence', [
            { display: '山外青山楼外楼', input: '山外青山楼外楼' },
            { display: '西湖歌舞几时休', input: '西湖歌舞几时休' },
            { display: '暖风熏得游人醉', input: '暖风熏得游人醉' },
            { display: '直把杭州作汴州', input: '直把杭州作汴州' },
          ], 'zh-hanzi'),
          lvl('chn-5a-ch3-l3', '全诗默写', 'boss', 3, 'paragraph', [
            { display: '题临安邸', input: '题临安邸', hint: '题目' },
            { display: '宋 林升', input: '宋 林升', hint: '作者' },
            { display: '山外青山楼外楼', input: '山外青山楼外楼' },
            { display: '西湖歌舞几时休', input: '西湖歌舞几时休' },
            { display: '暖风熏得游人醉', input: '暖风熏得游人醉' },
            { display: '直把杭州作汴州', input: '直把杭州作汴州' },
          ], 'zh-hanzi'),
        ],
      },
      {
        id: 'chn-5a-ch4', title: '桂花雨', subtitle: '课文精读·琦君', order: 4, icon: '🌸',
        levels: [
          lvl('chn-5a-ch4-l1', '生字练习', 'warmup', 1, 'char', [
            { display: '桂', input: '桂' }, { display: '箩', input: '箩' },
            { display: '杭', input: '杭' }, { display: '懂', input: '懂' },
            { display: '糕', input: '糕' },
          ]),
          lvl('chn-5a-ch4-l2', '词语默写', 'basic', 2, 'word', [
            { display: '桂花', input: '桂花' }, { display: '箩筐', input: '箩筐' },
            { display: '杭州', input: '杭州' }, { display: '懂得', input: '懂得' },
            { display: '糕饼', input: '糕饼' }, { display: '浸在', input: '浸在' },
          ]),
          lvl('chn-5a-ch4-l3', '课文默写', 'advanced', 3, 'paragraph', [
            { display: '桂花盛开的时候', input: '桂花盛开的时候' },
            { display: '不说飘香十里', input: '不说飘香十里' },
            { display: '至少前后左右十几家邻居', input: '至少前后左右十几家邻居' },
            { display: '没有不浸在桂花香里的', input: '没有不浸在桂花香里的' },
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
      {
        id: 'chn-5b-ch3', title: '稚子弄冰', subtitle: '古诗词·杨万里', order: 3, icon: '🧊',
        levels: [
          lvl('chn-5b-ch3-l1', '拼音练习', 'warmup', 1, 'word', [
            { display: 'zhi zi', input: 'zhi zi' }, { display: 'jin pen', input: 'jin pen' },
            { display: 'qiang sheng', input: 'qiang sheng' }, { display: 'sui lu', input: 'sui lu' },
          ], 'zh-pinyin'),
          lvl('chn-5b-ch3-l2', '诗句默写', 'basic', 2, 'sentence', [
            { display: '稚子金盆脱晓冰', input: '稚子金盆脱晓冰' },
            { display: '彩丝穿取当银钲', input: '彩丝穿取当银钲' },
            { display: '敲成玉磬穿林响', input: '敲成玉磬穿林响' },
            { display: '忽作玻璃碎地声', input: '忽作玻璃碎地声' },
          ], 'zh-hanzi'),
          lvl('chn-5b-ch3-l3', '全诗默写', 'boss', 3, 'paragraph', [
            { display: '稚子弄冰', input: '稚子弄冰', hint: '题目' },
            { display: '宋 杨万里', input: '宋 杨万里', hint: '作者' },
            { display: '稚子金盆脱晓冰', input: '稚子金盆脱晓冰' },
            { display: '彩丝穿取当银钲', input: '彩丝穿取当银钲' },
            { display: '敲成玉磬穿林响', input: '敲成玉磬穿林响' },
            { display: '忽作玻璃碎地声', input: '忽作玻璃碎地声' },
          ], 'zh-hanzi'),
        ],
      },
      {
        id: 'chn-5b-ch4', title: '村晚', subtitle: '古诗词·雷震', order: 4, icon: '🌅',
        levels: [
          lvl('chn-5b-ch4-l1', '拼音练习', 'warmup', 1, 'word', [
            { display: 'cao man', input: 'cao man' }, { display: 'chi yao', input: 'chi yao' },
            { display: 'heng po', input: 'heng po' }, { display: 'yi qu', input: 'yi qu' },
          ], 'zh-pinyin'),
          lvl('chn-5b-ch4-l2', '诗句默写', 'basic', 2, 'sentence', [
            { display: '草满池塘水满陂', input: '草满池塘水满陂' },
            { display: '山衔落日浸寒漪', input: '山衔落日浸寒漪' },
            { display: '牧童归去横牛背', input: '牧童归去横牛背' },
            { display: '短笛无腔信口吹', input: '短笛无腔信口吹' },
          ], 'zh-hanzi'),
          lvl('chn-5b-ch4-l3', '全诗默写', 'boss', 3, 'paragraph', [
            { display: '村晚', input: '村晚', hint: '题目' },
            { display: '宋 雷震', input: '宋 雷震', hint: '作者' },
            { display: '草满池塘水满陂', input: '草满池塘水满陂' },
            { display: '山衔落日浸寒漪', input: '山衔落日浸寒漪' },
            { display: '牧童归去横牛背', input: '牧童归去横牛背' },
            { display: '短笛无腔信口吹', input: '短笛无腔信口吹' },
          ], 'zh-hanzi'),
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
      {
        id: 'chn-6a-ch3', title: '春日', subtitle: '古诗词·朱熹', order: 3, icon: '🌸',
        levels: [
          lvl('chn-6a-ch3-l1', '拼音练习', 'warmup', 1, 'word', [
            { display: 'sheng ri', input: 'sheng ri' }, { display: 'xun fang', input: 'xun fang' },
            { display: 'si shui', input: 'si shui' }, { display: 'wu bian', input: 'wu bian' },
          ], 'zh-pinyin'),
          lvl('chn-6a-ch3-l2', '诗句默写', 'basic', 2, 'sentence', [
            { display: '胜日寻芳泗水滨', input: '胜日寻芳泗水滨' },
            { display: '无边光景一时新', input: '无边光景一时新' },
            { display: '等闲识得东风面', input: '等闲识得东风面' },
            { display: '万紫千红总是春', input: '万紫千红总是春' },
          ], 'zh-hanzi'),
          lvl('chn-6a-ch3-l3', '全诗默写', 'boss', 3, 'paragraph', [
            { display: '春日', input: '春日', hint: '题目' },
            { display: '宋 朱熹', input: '宋 朱熹', hint: '作者' },
            { display: '胜日寻芳泗水滨', input: '胜日寻芳泗水滨' },
            { display: '无边光景一时新', input: '无边光景一时新' },
            { display: '等闲识得东风面', input: '等闲识得东风面' },
            { display: '万紫千红总是春', input: '万紫千红总是春' },
          ], 'zh-hanzi'),
        ],
      },
      {
        id: 'chn-6a-ch4', title: '开国大典', subtitle: '课文精读', order: 4, icon: '🇨🇳',
        levels: [
          lvl('chn-6a-ch4-l1', '生字练习', 'warmup', 1, 'char', [
            { display: '盏', input: '盏' }, { display: '栏', input: '栏' },
            { display: '汇', input: '汇' }, { display: '爆', input: '爆' },
            { display: '宣', input: '宣' }, { display: '帜', input: '帜' },
          ]),
          lvl('chn-6a-ch4-l2', '词语默写', 'basic', 2, 'word', [
            { display: '灯盏', input: '灯盏' }, { display: '栏杆', input: '栏杆' },
            { display: '汇集', input: '汇集' }, { display: '爆发', input: '爆发' },
            { display: '宣布', input: '宣布' }, { display: '旗帜', input: '旗帜' },
            { display: '瞻仰', input: '瞻仰' }, { display: '肃立', input: '肃立' },
          ]),
          lvl('chn-6a-ch4-l3', '课文默写', 'advanced', 3, 'paragraph', [
            { display: '1949年10月1日', input: '1949年10月1日' },
            { display: '开国大典在北京天安门广场隆重举行', input: '开国大典在北京天安门广场隆重举行' },
            { display: '毛主席宣布中华人民共和国成立', input: '毛主席宣布中华人民共和国成立' },
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
      {
        id: 'chn-6b-ch3', title: '竹石', subtitle: '古诗词·郑燮', order: 3, icon: '🎋',
        levels: [
          lvl('chn-6b-ch3-l1', '拼音练习', 'warmup', 1, 'word', [
            { display: 'zhu shi', input: 'zhu shi' }, { display: 'li gen', input: 'li gen' },
            { display: 'po yan', input: 'po yan' }, { display: 'ren jian', input: 'ren jian' },
          ], 'zh-pinyin'),
          lvl('chn-6b-ch3-l2', '诗句默写', 'basic', 2, 'sentence', [
            { display: '咬定青山不放松', input: '咬定青山不放松' },
            { display: '立根原在破岩中', input: '立根原在破岩中' },
            { display: '千磨万击还坚劲', input: '千磨万击还坚劲' },
            { display: '任尔东西南北风', input: '任尔东西南北风' },
          ], 'zh-hanzi'),
          lvl('chn-6b-ch3-l3', '全诗默写', 'boss', 3, 'paragraph', [
            { display: '竹石', input: '竹石', hint: '题目' },
            { display: '清 郑燮', input: '清 郑燮', hint: '作者' },
            { display: '咬定青山不放松', input: '咬定青山不放松' },
            { display: '立根原在破岩中', input: '立根原在破岩中' },
            { display: '千磨万击还坚劲', input: '千磨万击还坚劲' },
            { display: '任尔东西南北风', input: '任尔东西南北风' },
          ], 'zh-hanzi'),
        ],
      },
      {
        id: 'chn-6b-ch4', title: '马诗', subtitle: '古诗词·李贺', order: 4, icon: '🐴',
        levels: [
          lvl('chn-6b-ch4-l1', '拼音练习', 'warmup', 1, 'word', [
            { display: 'sha ruan', input: 'sha ruan' }, { display: 'yan zhi', input: 'yan zhi' },
            { display: 'jin luo', input: 'jin luo' }, { display: 'kuai zou', input: 'kuai zou' },
          ], 'zh-pinyin'),
          lvl('chn-6b-ch4-l2', '诗句默写', 'basic', 2, 'sentence', [
            { display: '大漠沙如雪', input: '大漠沙如雪' },
            { display: '燕山月似钩', input: '燕山月似钩' },
            { display: '何当金络脑', input: '何当金络脑' },
            { display: '快走踏清秋', input: '快走踏清秋' },
          ], 'zh-hanzi'),
          lvl('chn-6b-ch4-l3', '全诗默写', 'boss', 3, 'paragraph', [
            { display: '马诗', input: '马诗', hint: '题目' },
            { display: '唐 李贺', input: '唐 李贺', hint: '作者' },
            { display: '大漠沙如雪', input: '大漠沙如雪' },
            { display: '燕山月似钩', input: '燕山月似钩' },
            { display: '何当金络脑', input: '何当金络脑' },
            { display: '快走踏清秋', input: '快走踏清秋' },
          ], 'zh-hanzi'),
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
