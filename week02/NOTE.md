# 每周总结可以写在这里
## 编程语言通识

### 语言按照语法分类

#### 非形式语言

- 中文，英文

#### 形式语言 （**乔姆斯基谱系**）

- 0型 无限制文法
  - ?::=?
- 1型 上下文相关文法
  - "a" <b> "c" ::= "a" "x" "c"
- 2型 上下文无关文法
  - <A>::=?
- 3型 正则文法
  - <A>::=<A>?  左递归
  - <A>::=?<A> 错误

- 现代语言一般会将文法分为两部分
  - 词法
    - 利用正则做一遍粗略得处理，将语言变为单个的词
  - 语法
    - 将词法处理后的词作为输入流去做语法分析

##### 产生式（BNF）

- 用尖括号括起来的名称来表示语法结构名

- 语法结果分成基础结构和需要用其他语法结构定义的复合结构

  - 基础结构称终结符
  - 符合结构称非终结符

- 引号和中间的字符表示终结符

- 可以有括号

- *表示重复多次

- |表示或

- +表示至少一次

  ```JavaScript
  "a"  // 终结符
  
  "b"  // 终结符
  
  // 语法结构 多个a 或者 多个b
  <Program>:="a"+ | "b"+   
  
  // 语法结构 任意ab字母组合 ababab aaaaa bbbbb bababa aabb bbaa
  <Program>:= <Program> "a"+ | <Program>"b"+ 
  
  // 语法结构 0-9整数
  <Number> = "0" | "1" | "2" | ..... | "9"
  
  // 语法结构 十进制整数 0 1 10 11 123 1234 1235 .... 145645356...
  <DecimalNumber> = "0" | (("1" | "2" | ..... | "9") <Number>*)
  
  // 语法结构 加法
  <Expression> = <DecimalNumber> | <Expression> "+" <DecimalNumber>
  
  // 四则运算
  <PrimaryExpression> ::= <DecimalNumber> |
      "(" <LogicalExpression> ")"
  
  <MultiplicativeExpression> ::= <DecimalNumber> | 
      <MultiplicativeExpression> "*" <DecimalNumber> |
      <MultiplicativeExpression> "/" <DecimalNumber>
  
  <AdditiveExpression> ::= <MultiplicativeExpression> | 
      <AdditiveExpression> "+" <MultiplicativeExpression> |
      <AdditiveExpression> "-" <MultiplicativeExpression> 
  
  <LogicalExpression> ::= <AdditiveExpression> | 
      <LogicalExpression> "||" <AdditiveExpression> | 
      <LogicalExpression> "&&" <AdditiveExpression>
  
  ```

  

### 图灵完备性

- 图灵完备性
  - 命令式
    - goto
    - if和while
  - 声明式----lambda
    - 递归

### 动态与静态

- 动态：
  - 在用户的设备/在线服务器上
  - 产品实际运行时
  - Runtime
- 静态：
  - 在程序员的设备上
  - 产品开发时
  - Compiletime
- 类型系统
  - 动态类型系统与静态类型系统
  - 强类型与弱类型
    - 有隐式类型转换的都是弱类型
    - String + Number
    - String == Boolean
  - 复合类型
    - 结构体 ----- 对象
    - 函数签名
  - 子类型
    - 逆变/协变

### 一般命令式编程语言

- Atom 	**原子**
  - Identifler
  - Literal
- Expression **表达式**
  - Atom
  - Operator
  - Punctuator
- Statement   **语句**
  - Expression
  - keyword
  - Punctuator
- Structure    **结构化**
  - Function
  - Class
  - Process
  - Namespace
  - .......
- Program       **程序集**
  - Program
  - Module
  - Package
  - Library

### 拓展知识

- 终结符：[https://zh.wikipedia.org/wiki/%E7%B5%82%E7%B5%90%E7%AC%A6%E8%88%87%E9%9D%9E%E7%B5%82%E7%B5%90%E7%AC%A6](https://zh.wikipedia.org/wiki/終結符與非終結符)
- 产生式： 在计算机中指 Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，BNF）的语句
- 静态和动态语言：[ https://www.cnblogs.com/raind/p/8551791.html](https://www.cnblogs.com/raind/p/8551791.html)
- 协变与逆变：[ https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html](https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html)
- Yacc 与 Lex 快速入门：[ https://www.ibm.com/developerworks/cn/linux/sdk/lex/index.html](https://www.ibm.com/developerworks/cn/linux/sdk/lex/index.html)
- 关于元编程：[ https://www.zhihu.com/question/23856985](https://www.zhihu.com/question/23856985)
- 编程语言的自举：[ https://www.cnblogs.com/lidyan/p/6727184.html](https://www.cnblogs.com/lidyan/p/6727184.html)
- ECMA-262 Grammar Summary 部分


## 词法、类型

- Javascript脉络

  - Atom
  - Expression
  - Statement
  - Structure
  - Program/Module

- A Grammar Summary 

  - A.1 Lexical Grammar
    - SourceCharacter ::
      - any Unicode code point
  - InputElement
    - WhiteSpace   空白符
      - <TAB> 制表符
      - <VT>  纵向制表符 \v
      - <FF>  
      - <SP> 普通空格
      - <NBSP> 分词空格
      - <ZWNBSP> 零宽空格
      - <USP> unicode 支持的空格
    - LineTerminator  换行符
      - <LF>
      - <CR>
      - <LS>
      - <PS>
    - Comment   注释
      - // 单行注释
      - /**/ 多行注释
    - Token
      - 有效的词
      - Punctuator  符号
      - IdentifierName 标识符
        - keywords  关键字
        - Identifier
          - 变量名 （不可以和关键字重合）
          - 属性 （可以和关键字重合）
      - Literal   直接量
        - Number
          - IEEE 754 Double Float
            - Sign(1) 
            - Exponent(11) 
            - Fraction(52)
          - Grammar
            - DecimalLiteral
              - 0
              - 0.
              - .2
              - 1e3
            - BinaryIntegerLiteral
              - 0b111
            - OctallntegerLiteral
              - 0o10
            - HexIntegerLiteral
              - 0xFF
        - String
          - Character 字符
          - Code Point 码点
          - Encoding
            - utf8
            - utf16
          - Grammar
            - "abc"
            - 'abc'
            - `abc`
        - Boolean
        - Object
        - Null
        - Undefined
        - Symbol

- Unicode 字符集

  - [Blocks](https://www.fileformat.info/info/unicode/block/index.htm)

    - BMP (4位能表示的范围) 表示基本字符
      - String.charCodeAt() 只能处理bmp内的字符
      - String.fromCodePoint  可处理bmp之外的字符
      - "".codePointAt 可处理bmp之外的字符

  - [Categories](https://www.fileformat.info/info/unicode/category/index.htm)

    - 表示空格
    - [Separator, Space](https://www.fileformat.info/info/unicode/category/Zs/index.htm)
    - Unicode中所有的space在js中都是合法的


# 作业
- 匹配Number直接量
  ```JavaScript
  const reg = /[-]{0,1}((0[b,B]{1}[0,1]+)|(0[o,O]{1}[0-7]+)|(0[x,X]{1}[0-9a-fA-F]+)|([0-9]+\.[0-9]+)|([0-9]+[e,E]{1}[0-9]+)|([0-9]+))/
  ```
- UTF-8 Encoding
  
- 匹配所有的字符串直接量，单引号和双引号
  ```JavaScript
  const reg = /[\s\S]+/
  ```
