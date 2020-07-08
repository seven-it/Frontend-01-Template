# 每周总结可以写在这里
#### 组件化基础
前端架构主体： 
  1.80%组件问题 
  2.其他就是架构模式：UI架构模式+零零碎碎的基础库

Carousel组件

state activeIndex

property loop time imglist autoplay color forward

attribute startIndex loop time imglist autoplay color forward

children 2 append remove add

event change click hover swipe resize dbclick

method next() prev() goto() play() stop() // aotoplay 二者选一

config mode: “userRAF”，“userTimeout"

CarouselView // imglist 二者只有一个
