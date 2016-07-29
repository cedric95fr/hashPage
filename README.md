一款适合单页应用的小框架，依赖 zepto/jQuery
通过检测 `hash` 的变化滑动页面

demo: https://riskers.github.io/hashPage/demo/index.html

## 安装 初始化

```shell
npm install hashPage
```

```html
<link href="hashPage.css">

<div class="page page1 page-active">
		<h1>page1</h1>
		<div class="btns">
			<a href="#2">下一页</a>
		</div>
</div>

<div class="page page2 page-next">
	<h1>page2</h1>
	<div class="btns">
		<a href="#1">上一页</a>
			<a href="#3">下一页</a>
		</div>
</div>

<div class="page page3 page-next">
	<h1>page3</h1>
	<div class="btns">
		<a href="#1">首页</a>
	</div>
</div>

<script src="zepto.js"></script>
<script src="hashPage.js"></script>
```

## 使用

```js
var hashPage = new HashPage({
	duration: 300,
	pageIndex: 2,
	onBeforeChange: function(){
		console.log('before change')
	},
	onAfterChange: function(){
		console.log('after change')
	}
});
```

## 参数

* duration: 切换页面时间，与css保持一致，默认 `300ms`
* onBeforeChange: 页面切换前的回调
* onAfterChange: 页面切换后的回调
* pageIndex: 初进入页面时的页面索引


