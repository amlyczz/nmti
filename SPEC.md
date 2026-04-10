# NMTI - 赛博人格测试 SPEC

## 1. Concept & Vision

NMTI（Net Personality Type Indicator）是一款极具"互联网嘴替"气质的性格测试工具。它不是传统MBTI那种正经心理学测试，而是一个用戏谑、解构、黑话的方式，让用户在"你是赛博显眼包还是加密谜语人"的中二问题中，完成一场自我认知的赛博巡游。

视觉调性：暗黑赛博朋克 + 表情包文化 + 互联网黑话。整体氛围是"深夜刷手机的赛博朋克"——霓虹渐变、暗黑背景、闪烁的文字、抽象的图标。

## 2. Design Language

**Aesthetic Direction:** 赛博朋克暗黑系 + 表情包/黑话文化融合
- 主视觉：深邃暗黑背景配合霓虹渐变（紫/蓝/粉）
- 大量使用微光晕、阴影、玻璃拟态效果
- 穿插emoji和互联网符号

**Color Palette:**
- Primary: `#8B5CF6` (紫色霓虹)
- Secondary: `#06B6D4` (青色)
- Accent: `#F472B6` (粉色)
- Background: `#0F0F1A` (深黑)
- Surface: `#1A1A2E` (卡片背景)
- Text Primary: `#F8FAFC`
- Text Secondary: `#94A3B8`

**Typography:**
- 标题：'Orbitron' (赛博感) 或系统等宽字体 fallback
- 正文：'Inter' 或系统默认
- 黑话/标签：使用 emoji 混合

**Motion Philosophy:**
- 题目切换：淡入淡出 + 轻微上移 (300ms ease-out)
- 选项悬停：发光边框 + 轻微放大
- 结果出现：打字机效果 + 渐显模块依次出现
- 进度条：平滑过渡

**Visual Assets:**
- 使用 Lucide Icons (CDN) 或纯 emoji
- 霓虹光晕效果用 CSS box-shadow 实现
- 玻璃拟态卡片用 backdrop-blur

## 3. Layout & Structure

**Single Page Application Flow:**
```
[封面页] → [测试页 x 4维度] → [结果页]
```

**封面页:**
- 大标题 NMTI 带霓虹发光效果
- 副标题"赛博人格测试"
- 开始按钮带脉冲动画
- 人格类型图示预览

**测试页:**
- 顶部：进度条 + 当前维度指示
- 中间：题目卡片（玻璃拟态）
- 底部：三个选项按钮（A/B/C）
- 左上角：当前题号
- 手机端：单列布局，大按钮
- 桌面端：居中卡片，最大宽度限制

**结果页:**
- 四字代码大字居中（带对应颜色光晕）
- 人格名称 + 描述
- 四个模块依次显示：
  - 标签云（流动的tag）
  - 扎心画像（虽然...但是...句式）
  - 社交关系（天生一对/宿命之敌）
  - 牛马指数（进度条动画）
- 重新测试按钮

**Responsive Strategy:**
- Mobile-first 设计
- 断点：640px (sm), 768px (md), 1024px (lg)
- 手机端：全宽padding缩小，选项按钮更大
- 桌面端：卡片最大宽度 600px 居中

## 4. Features & Interactions

**Core Features:**
1. 32道选择题，每题A/B/C三选项
2. 分4维度计分：互动(E/I)、内核(S/D)、表达(R/M)、生存(A/B)
3. 智能判定：平局时自动选择 I/D/M/B（更抽象的那个）
4. 完整结果生成：代码+名称+标签+画像+关系+牛马指数

**Scoring Logic:**
```
维度1 Q1-8:   A→E+1, B→I+1, C→0
维度2 Q9-16:  A→S+1, B→D+1, C→0
维度3 Q17-24: A→R+1, B→M+1, C→0
维度4 Q25-32: A→A+1, B→B+1, C→0

判定规则:
- 如果 A > B，选择 A
- 如果 A < B，选择 B
- 如果 A == B，强制选择更"抽象"的字母: I/D/M/B
```

**Interaction Details:**
- 选项点击：立即高亮，显示选中态，200ms后自动下一题
- 进度条：平滑增长动画
- 维度切换：标题闪烁提示
- 结果页面：各模块依次淡入（间隔200ms）

**Edge Cases:**
- 刷新页面：重置到第一题（无localStorage保存）
- 快速连续点击：防抖处理
- 窗口resize：布局自适应

## 5. Component Inventory

**CoverPage:**
- 状态：初始显示
- 动画：标题打字机效果，按钮脉冲

**ProgressBar:**
- 显示：当前进度百分比
- 状态：0-100%平滑过渡
- 颜色：渐变紫→粉

**QuestionCard:**
- 默认：玻璃拟态卡片，暗边框
- 悬停：边框发光
- 选中：选项按钮高亮态

**OptionButton:**
- 默认：半透明背景，细边框
- 悬停：发光边框，轻微放大
- 选中：实心背景，强发光
- 禁用：灰色，不可点击

**ResultCode:**
- 四字代码，超大字号
- 每个字母对应颜色：
  - E/I: 紫 #8B5CF6
  - S/D: 青 #06B6D4
  - R/M: 粉 #F472B6
  - A/B: 橙 #F59E0B

**TagCloud:**
- 流动布局的标签
- 随机大小、颜色
- 悬停时轻微浮起

**NiuMaMeter:**
- 进度条样式
- 动画：0到目标百分比
- 显示百分比数字

## 6. Technical Approach

**Tech Stack:**
- 单文件 HTML + Tailwind CSS (CDN)
- 原生 JavaScript (ES6+)
- Google Fonts: Orbitron, Inter

**Architecture:**
- 状态管理：简单对象存储当前状态
- 渲染：DOM 操作，直接修改 innerHTML
- 事件：addEventListener 委托

**Data Structure:**
```javascript
const state = {
  currentQuestion: 0,
  answers: [], // 32个答案
  scores: { E: 0, I: 0, S: 0, D: 0, R: 0, M: 0, A: 0, B: 0 }
}

const personalityTypes = {
  'IDMB': { name: '加密谜语人', tags: [...], ... },
  // ... 所有组合
}
```

**Tailwind Config:**
- 使用 CDN，不需构建
- 自定义颜色通过 style 属性
- 响应式类：sm:, md:, lg:

## 7. Content - 人格类型数据

基于 4 字母 x 2 选择 = 16 种基础人格：

| 代码 | 名称 | 核心描述 |
|------|------|----------|
| ESRA | 赛博判官 | 正义感爆棚的键盘伦理学家 |
| ESRB | 赛博老实人 | 表面重拳出击实则内心柔软 |
| ESMA | 嘴强王者 | 反驳大师但从不人参攻击 |
| ESMB | 阴阳大师 | 阴阳怪气一级选手 |
| ISRA | 理性潜水员 | 暗中观察但观点惊人 |
| ISRB | 真诚社恐 | 默默点赞的小透明 |
| ISMA | 暗号大师 | 只有同温层能懂的加密通话 |
| ISMB | 高冷自闭 | 发出去的消息是给未来的自己 |
| DSRA | 赛博鲁迅 | 嬉笑怒骂皆文章 |
| DSRB | 互联网清流 | 出淤泥而不染 |
| DSMA | 抽象带师 | 你的理解有问题 |
| DSMB | 串子 | 到处拱火从不负责 |
| DIRA | 乐子人本乐 | 一切皆为乐子 |
| DIRB | 摸鱼带师 | 上班最重要的任务是活着 |
| DIMA | 节奏大师 | 我不是在拱火是在引流 |
| DIMB | 纯纯牛马 | 吗喽的命也是命 |

每种人格包含：
- 名称
- 标签云 (4-6个)
- 扎心画像 (虽然...但是...句式)
- 天生一对 (另一个代码)
- 宿命之敌 (另一个代码)
- 牛马指数基础值

## 8. Questions Content

完整32题内容见需求文档，每题A/B/C三选项，主题覆盖：
- Q1-8: 互动维度（社交行为）
- Q9-16: 内核维度（价值观）
- Q17-24: 表达维度（沟通方式）
- Q25-32: 生存维度（冲突应对）
