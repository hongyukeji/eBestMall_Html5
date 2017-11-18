eBestMall - B2B2C商城系统
===============================

eBestMall是国内电子商务系统及服务解决方案新创品牌。为传统企业及创业者提供零售网店系统、网上商城系统、分销系统、B2B2C商城系统、微信分销系统、行业ERP等产品和解决方案。

[![Latest Stable Version](https://poser.pugx.org/hongyukeji/ebestmall-html/v/stable.png)](https://packagist.org/packages/hongyukeji/ebestmall-html)
[![Total Downloads](https://poser.pugx.org/hongyukeji/ebestmall-html/downloads.png)](https://packagist.org/packages/hongyukeji/ebestmall-html)

安装与更新
-------------------
```
运营版：
composer require hongyukeji/ebestmall-html

开发版：
composer require hongyukeji/ebestmall-html dev-master

Install new project:
composer create-project hongyukeji/ebestmall-html ebestmall-html dev-master

更新：
composer update hongyukeji/ebestmall-html

```

系统开发
-------------------

* 公司名称：鸿宇科技有限公司
* 公司官网：www.hongyuvip.com
* 核心技术：Html5、Css3、JavaScript ES6、jQuery、Ajax、MySQL、VueJS、Bootstrap
* 开发工具：PhpStorm
* 开发团队：Shadow（项目总监）、Spider（代码审计）、Free(数据库建模)、Wind（PHP后端开发）、Flower（前端UI设计）、Boy(Html5前端开发)
* 项目支持：感谢所有支持鸿宇团队的朋友！

系统维护
-------------------

* Http： www.ebestmall.com
* Author：Shadow
* QQ：1527200768 & 13391528
* Phone：13952101395
* Email：hongyukeji@126.com

系统 CSS + DIV 命名标准
-------------------

~~~
页头:header
登录条:loginBar
标志:logo
侧栏:sideBar
广告:banner

导航:nav
子导航:subNav
菜单:menu
子菜单:subMenu
搜索:search
滚动:scroll

页面主体:main
内容:content/container/box
标签页:tab
文章列表:list
提示信息:msg
小技巧:tips
栏目标题:title

加入:joinus
指南:guild
服务:service
热点:hot
新闻:news
下载:download
注册:regsiter
状态:status

按钮:btn
投票:vote
友情链接:friendLink
页脚:footer
合作伙伴:partner
版权:copyRight

CSSID的命名
外套:wrap
主导航:mainNav
子导航:subnav
页眉:header
页脚:footer
整个页面:main

商标:label
标题:title
主导航:mainNav(globalNav)
顶导航:topnav
边导航:sidebar
左导航:leftsideBar
右导航:rightsideBar
旗志:logo
标语:banner
菜单内容1:menu1Content
菜单容量:menuContainer

容器:container/box
内容:content
子菜单:submenu
边导航图标:sidebaricon
注释:note
搜索:search
登陆:login
功能区:shop(如购物车，收银台)
当前的current

面包屑:breadCrumb(即页面所处位置导航提示)

样式文件命名
主要的:master.css
布局版面:layout.css
专栏:columns.css
文字:font.css
打印样式:print.css
主题:themes.css
通用：common.css/public

/*
 * Define global variables
 * Defined: --name:value;
 * Usage: var(--name);
 */
:root{
  /*网站主色调*/
  --main-color:#F10215;
}

/*
 * @ 属性值数学运算–加减乘除
 * @ calc()
 * @ width:calc(100% - 100px);
 */

/* [移动端调用删除/PC端保留]解决引用Bootstrap造成在IE中position: fixed;定位和滚动条问题*/
@-ms-viewport {width: auto;}

~~~

常用jQuery函数
-------------------

```
console.log("可视页面的高度:" + $(window).height());
console.log("网页被卷起来的高度:" + $(window).scrollTop());
console.log("元素距离顶部的高度:" + Name.offset().top);
```