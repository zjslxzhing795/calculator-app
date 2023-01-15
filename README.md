### 核心类设计

设计一个计算器，不带任何 UI，完全就是逻辑上的一个计算器，以此来实现一个具有通用性的类
这个应该对我有启发，因为我总是写完静态页以后，在页面内使用各种数据，不懂得如何管理他们，以至于和 ui 绑定很深，即使是想剥离出来也只是形式上的剥离

### 状态设计

按键分类：数字、单目运算符、双目运算符、小数点、清除、等于

```js
type keyNumber = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" // 数字
type KeyOpBinary = "+" | "-" | "*" | "/" // 双目
type KeyOpUnary = "%" | "+/-" // 单目
export type Key = keyNumber | KeyOpBinary | KeyOpUnary | "AC" | "." | "="
```

三种可能的状态：[string] / [string, KeyOpBinary] / [string, KeyOpBinary, string]

最绝的就是状态以数组表示，我一直想的是当前面板显示数据、前任数据两个单独的数，这里是我的逻辑致命处，会写得非常累且不方便做单元测试

### 测试

describe 汽车
describe 灯光系统
describe 行车灯
it 可以手动打开
it 可以自动打开

describe 后的内容如果很大，可以一步一步缩小范围
it 后面跟断言

### 模式

本内容符合 MVC 模式
stack 负责 model
app.tsx 负责 view
calculator 负责 control

### 感悟

写一个纯碎的计算器，需要一个 press 方法，就是按下任意一个键会触发，然后还需要一个自动计算数字的方法，然后 ui 使用计算器的时候只需要传入一个 setState 方法修改 ui 数据就可以了，
有一点类似，但又不完全像

```js
const [value, setValue] = setState(0)
<input value={value} onChange={() => setValue(value)} />
```
