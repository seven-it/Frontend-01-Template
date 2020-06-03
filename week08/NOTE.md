# 每周总结可以写在这里
#### 正常流排版
- 收集盒进行
- 计算盒在行内的排布
- 计算行的排布
- vertical-align 最好只取Top Bottom Middle
- 一个元素有可能生成多个盒
#### BFC
- block-level 表示可以被放入bfc
- block-container 表示可以容纳bfc
- block-box = block-level + block-container
- block-box 如果 overflow 是 visible， 那么就跟父bfc合并
- Block-level boxes：flex、table、grid、block
- block containers: block、inline-block、table-cell
- block boxes：block
#### Flex排版
- 收集盒进行
- 计算盒在主轴的排布
- 计算盒在交叉轴的排布
