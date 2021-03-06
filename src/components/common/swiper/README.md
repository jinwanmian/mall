﻿* **移动端轮播图组件**
* **功能描述**：有指示器、自动轮播、手指可以左右滑动

* **一堆P话**：
  * 手指摁下与滑动时自动轮播暂停，松开重新计时
  * 手指松开时会判断距离哪边近而后停靠到近的一边，所以滑动没超过一半是会退回来的
  * 该组件默认占高为56.25vw（最高也是56.25vw），当有任意一张图片加载出来后会以该图片高度为准，此时会传出一个 inited 事件
  * 轮播过渡效果使用了请求关键帧 requestAnimationFrame() 
  * 测了三个手机浏览器，华为自带浏览器、chrome、UC，就UC会卡顿

* **接收参数**：
  * imgList：必传，图片地址数组，如：`[a/b/c.jpg, a/b/d.jpg, a/b/e.jpg]`
  * toggleTime：自动切换间隔时间，单位毫秒，默认3000（可以不用v-bind传，因为开启计时器时用了Number()转换）
  * placeVicinity：就近模式，默认为false
    * true：手指滑动松开时，靠近哪边则停靠哪边；false：往哪边滑图片则往哪边靠；
  
* **注意点**：
  * **只负责轮播，发生点击时抛出被点击的索引（事件名：img-click，索引是第一个参数）；传入图片地址数组就行了**
  * **图片多的情况没有考虑过，十来张是没问题的（主要是指示器问题）**
  * **样式用 SASS 写的**
  * **图片样式为宽度100vw，高度自适应，但组件最高不会超过56.25vw，溢出则隐藏（当然你可以调样式咯！100\*56.25 比例等于 1920\*1080）**
    * 根据样式来看，只有在竖屏时效果才是友好的
  * **层级问题：设置了relative定位，z-index未设置**