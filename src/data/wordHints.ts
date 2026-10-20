export interface WordHint {
  word: string
  meaning: string
  syllables: string
}

// Lesson-specific meanings: phrases are translated as a whole, not word by word.
const MEANINGS = `
ruler|尺子
pencil|铅笔
eraser|橡皮
crayon|蜡笔
bag|书包；袋子
pen|钢笔
book|书
pencil box|铅笔盒
red|红色
blue|蓝色
green|绿色
yellow|黄色
white|白色
black|黑色
orange|橙色；橙子
brown|棕色
purple|紫色
pink|粉色
UK|英国
Canada|加拿大
USA|美国
China|中国
student|学生
teacher|老师
father|爸爸
mother|妈妈
brother|兄弟
sister|姐妹
man|男人
woman|女人
classroom|教室
window|窗户
blackboard|黑板
light|灯；光
picture|图画；照片
door|门
floor|地板；楼层
wall|墙
schoolbag|书包
maths book|数学书
English book|英语书
Chinese book|语文书
storybook|故事书
candy|糖果
notebook|笔记本
toy|玩具
tall|高的
short|矮的；短的
strong|强壮的
thin|瘦的；薄的
quiet|安静的
friendly|友好的
glasses|眼镜
shoe|鞋
bedroom|卧室
living room|客厅
kitchen|厨房
bathroom|浴室；卫生间
study|书房；学习
phone|电话
table|桌子
sofa|沙发
beef|牛肉
chicken|鸡肉；鸡
noodles|面条
soup|汤
vegetable|蔬菜
rice|米饭
bread|面包
milk|牛奶
parents|父母
uncle|叔叔；舅舅
aunt|阿姨；姑姑
baby|婴儿
doctor|医生
driver|司机
farmer|农民
nurse|护士
first floor|一楼
second floor|二楼
playground|操场
garden|花园
library|图书馆
teacher office|教师办公室
computer room|计算机教室
art room|美术教室
warm|温暖的
cold|寒冷的
cool|凉爽的；酷的
hot|炎热的
sunny|晴朗的
windy|多风的
cloudy|多云的
snowy|下雪的
January|一月
February|二月
March|三月
April|四月
May|五月
June|六月
July|七月
August|八月
horse|马
cow|奶牛
hen|母鸡
sheep|绵羊
lamb|小羊
goat|山羊
tomato|西红柿
potato|土豆
dress|连衣裙
skirt|短裙
shirt|衬衫
jacket|夹克衫
sweater|毛衣
pants|裤子
socks|短袜
shoes|鞋子
sunglasses|太阳镜
gloves|手套
scarf|围巾
umbrella|雨伞
pretty|漂亮的
cheap|便宜的
expensive|昂贵的
nice|好的；漂亮的
old|年老的；旧的
young|年轻的
funny|滑稽的；有趣的
kind|和蔼的
strict|严格的
polite|有礼貌的
clever|聪明的
hard-working|勤奋的
helpful|乐于助人的
shy|害羞的
Monday|星期一
Tuesday|星期二
Wednesday|星期三
Thursday|星期四
Friday|星期五
Saturday|星期六
Sunday|星期日
sandwich|三明治
salad|沙拉
hamburger|汉堡包
ice cream|冰淇淋
tea|茶
fresh|新鲜的
healthy|健康的
delicious|美味的
sing|唱歌
dance|跳舞
draw cartoons|画漫画
do kung fu|练武术
play the pipa|弹琵琶
cook|做饭
swim|游泳
speak English|说英语
clock|时钟
plant|植物
bottle|瓶子
bike|自行车
photo|照片
front|前面
between|在……之间
above|在……上方
forest|森林
river|河流
lake|湖泊
mountain|高山
hill|小山
tree|树
bridge|桥
village|村庄
eat breakfast|吃早饭
do morning exercises|做早操
have class|上课
play sports|做体育运动
eat dinner|吃晚饭
clean my room|打扫我的房间
go for a walk|去散步
go shopping|去购物
spring|春天
summer|夏天
autumn|秋天
winter|冬天
season|季节
vacation|假期
pick apples|摘苹果
make a snowman|堆雪人
September|九月
October|十月
November|十一月
December|十二月
New Year|新年
Christmas|圣诞节
summer vacation|暑假
sports meet|运动会
first|第一
second|第二
third|第三
fourth|第四
fifth|第五
twelfth|第十二
twentieth|第二十
special|特别的
mine|我的（东西）
yours|你的；你们的（东西）
his|他的
hers|她的（东西）
climbing|正在攀爬
eating|正在吃
playing|正在玩耍
sleeping|正在睡觉
doing morning exercises|正在做早操
having class|正在上课
eating lunch|正在吃午饭
reading a book|正在读书
listening to music|正在听音乐
keep to the right|靠右行走
science museum|科学博物馆
post office|邮局
bookstore|书店
cinema|电影院
hospital|医院
crossing|十字路口
turn left|向左转
go straight|直走
on foot|步行
by bus|乘公共汽车
by plane|乘飞机
by subway|乘地铁
by train|乘火车
by ship|乘轮船
by bike|骑自行车
by taxi|乘出租车
visit grandparents|看望祖父母或外祖父母
see a film|看电影
take a trip|去旅行
go to the supermarket|去超市
this morning|今天早上
tonight|今晚
tomorrow|明天
dictionary|词典
singing|唱歌（进行中）
dancing|跳舞（进行中）
reading stories|读故事（进行中）
playing football|踢足球（进行中）
doing kung fu|练武术（进行中）
drawing cartoons|画漫画（进行中）
cooks Chinese food|做中餐
studies Chinese|学习汉语
factory worker|工厂工人
postman|邮递员
businessman|商人
police officer|警察
fisherman|渔民
scientist|科学家
pilot|飞行员
coach|教练
angry|生气的
afraid|害怕的
sad|难过的
worried|担心的
happy|开心的
ill|生病的
see a doctor|看医生
take a deep breath|深吸一口气
taller|更高的
shorter|更矮的；更短的
stronger|更强壮的
longer|更长的
younger|更年轻的
older|年龄更大的；更旧的
heavier|更重的
thinner|更瘦的
bigger|更大的
smaller|更小的
watched TV|看了电视
washed clothes|洗了衣服
cleaned my room|打扫了我的房间
stayed at home|待在家里
cooked dinner|做了晚饭
read a book|读了一本书
saw a film|看了一场电影
had a cold|感冒了
went camping|去野营了
went fishing|去钓鱼了
rode a horse|骑马了
rode a bike|骑自行车了
hurt my foot|伤了我的脚
took pictures|拍了照片
bought gifts|买了礼物
fell off|跌落
dining hall|餐厅
gym|体育馆
grass|草地
ago|以前
cycling|骑自行车
ice-skate|滑冰
badminton|羽毛球
star|星星
hello|你好
colour|颜色
head|头
face|脸
nose|鼻子
mouth|嘴巴
hand|手
foot|脚
body|身体
arm|手臂
leg|腿
good|好的
great|很棒的
fine|好的；健康的
well|好；健康
like|喜欢
love|喜爱
cat|猫
dog|狗
pig|猪
duck|鸭子
bird|鸟
fish|鱼
I|我
you|你；你们
we|我们
they|他们；她们；它们
he|他
she|她
it|它
am|是（与 I 连用）
is|是
are|是
have|有
has|有
my|我的
your|你的；你们的
name|名字
what|什么
where|哪里
who|谁
how|怎样；如何
from|来自；从
this|这；这个
that|那；那个
the|这（那）个；定冠词
a|一个；不定冠词
an|一个；用于元音读音前
and|和
too|也；太
in|在……里面
on|在……上面
under|在……下面
to|到；向
of|……的
for|为了；给
with|和……一起
not|不
very|非常
new|新的
school|学校
friend|朋友
meet|遇见
see|看见
go|去
do|做
can|能够
let|让
me|我（宾格）
at|在
be|是；成为
will|将会
want|想要
some|一些
there|那里
here|这里
yes|是的
no|不；没有
thanks|谢谢
please|请
today|今天
class|课；班级
room|房间
food|食物
water|水
work|工作
home|家
time|时间
day|天；白天
read|读
eat|吃
play|玩；演奏
learn|学习
`;

// A middle dot separates spoken syllables; a slash separates words in a phrase.
// Use IPA for reduced forms rather than implying that every vowel is a syllable.
const SYLLABLES = `
ruler|ru·ler
pencil|pen·cil
eraser|e·ras·er
crayon|cray·on
yellow|yel·low
orange|or·ange
purple|pur·ple
canada|Can·a·da
china|Chi·na
student|stu·dent
teacher|teach·er
father|fa·ther
mother|moth·er
brother|broth·er
sister|sis·ter
woman|wom·an
classroom|class·room
window|win·dow
blackboard|black·board
picture|pic·ture
schoolbag|school·bag
english|Eng·lish
chinese|Chi·nese
storybook|sto·ry·book
candy|can·dy
notebook|note·book
quiet|qui·et
friendly|friend·ly
glasses|glass·es
bedroom|bed·room
living|liv·ing
kitchen|kitch·en
bathroom|bath·room
study|stud·y
table|ta·ble
sofa|so·fa
chicken|chick·en
noodles|noo·dles
vegetable|/ˈvedʒ.tə.bəl/
parents|par·ents
uncle|un·cle
baby|ba·by
doctor|doc·tor
driver|driv·er
farmer|farm·er
second|sec·ond
playground|play·ground
garden|gar·den
library|li·brar·y
office|of·fice
computer|com·pu·ter
sunny|sun·ny
windy|wind·y
cloudy|cloud·y
snowy|snow·y
january|Jan·u·ar·y
february|Feb·ru·ar·y
april|A·pril
july|Ju·ly
august|Au·gust
tomato|to·ma·to
potato|po·ta·to
jacket|jack·et
sweater|sweat·er
sunglasses|sun·glass·es
umbrella|um·brel·la
pretty|pret·ty
expensive|ex·pen·sive
funny|fun·ny
polite|po·lite
clever|clev·er
hard-working|hard / work·ing
helpful|help·ful
monday|Mon·day
tuesday|Tues·day
wednesday|Wednes·day
thursday|Thurs·day
friday|Fri·day
saturday|Sat·ur·day
sunday|Sun·day
sandwich|sand·wich
salad|sal·ad
hamburger|ham·bur·ger
healthy|health·y
delicious|de·li·cious
cartoons|car·toons
pipa|pi·pa
bottle|bot·tle
photo|pho·to
between|be·tween
above|a·bove
forest|for·est
river|riv·er
mountain|moun·tain
village|vil·lage
breakfast|break·fast
morning|morn·ing
exercises|ex·er·cis·es
dinner|din·ner
shopping|shop·ping
summer|sum·mer
autumn|au·tumn
winter|win·ter
season|sea·son
vacation|va·ca·tion
apples|ap·ples
snowman|snow·man
september|Sep·tem·ber
october|Oc·to·ber
november|No·vem·ber
december|De·cem·ber
christmas|Christ·mas
twentieth|twen·ti·eth
special|spe·cial
climbing|climb·ing
eating|eat·ing
playing|play·ing
sleeping|sleep·ing
doing|do·ing
having|hav·ing
reading|read·ing
listening|lis·ten·ing
music|mu·sic
science|sci·ence
museum|mu·se·um
bookstore|book·store
cinema|cin·e·ma
hospital|hos·pi·tal
crossing|cross·ing
subway|sub·way
taxi|tax·i
visit|vis·it
grandparents|grand·par·ents
supermarket|su·per·mar·ket
tonight|to·night
tomorrow|to·mor·row
dictionary|dic·tion·ar·y
singing|sing·ing
dancing|danc·ing
stories|sto·ries
football|foot·ball
drawing|draw·ing
studies|stud·ies
factory|fac·to·ry
worker|work·er
postman|post·man
businessman|busi·ness·man
police|po·lice
officer|of·fi·cer
fisherman|fish·er·man
scientist|sci·en·tist
pilot|pi·lot
angry|an·gry
afraid|a·fraid
worried|wor·ried
happy|hap·py
taller|tall·er
shorter|short·er
stronger|strong·er
longer|long·er
younger|young·er
older|old·er
heavier|heav·i·er
thinner|thin·ner
bigger|big·ger
smaller|small·er
camping|camp·ing
fishing|fish·ing
pictures|pic·tures
dining|din·ing
ago|a·go
cycling|cy·cling
ice-skate|ice / skate
badminton|bad·min·ton
hello|hel·lo
colour|col·our
body|bod·y
under|un·der
very|ver·y
today|to·day
water|wa·ter
UK|U / K（逐个字母读）
USA|U / S / A（逐个字母读）
TV|T / V（逐个字母读）
`;

function parseEntries(text: string): Record<string, string> {
  return Object.fromEntries(text.trim().split('\n').map(line => {
    const [key, value] = line.split('|')
    return [key.toLowerCase(), value]
  }))
}

const meanings = parseEntries(MEANINGS)
const syllables = parseEntries(SYLLABLES)

export function getWordHint(input: string): WordHint | null {
  const word = input.trim().replace(/\s+/g, ' ')
  const meaning = meanings[word.toLowerCase()]
  if (!meaning) return null
  return { word, meaning, syllables: word.split(' ').map(part => syllables[part.toLowerCase()] ?? part).join(' / ') }
}
