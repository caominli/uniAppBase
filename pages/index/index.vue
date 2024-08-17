<!-- 这是启动页，包含底部导航+按导航选择来显示不同页面 -->
<template>
	<view>
		<pageHome v-if="page === 0" />
		<pageCart v-if="page === 1" />
		<pageOrder v-if="page === 2" />
		<pageAcc v-if="page === 3" />
	</view>
	<!-- 底部导航 -->
	<view>
		<uv-tabbar :value="page" @change="tabchange">
			<uv-tabbar-item text="首页" icon="home"></uv-tabbar-item>
			<uv-tabbar-item text="购物车" icon="shopping-cart"></uv-tabbar-item>
			<uv-tabbar-item text="订单" icon="list-dot"></uv-tabbar-item>
			<uv-tabbar-item text="我的" icon="account"></uv-tabbar-item>
		</uv-tabbar>
	</view>
</template>
<script setup>
	import { ref,onMounted,defineAsyncComponent } from 'vue';
	import pageHome from './sub-page/page-home/index.vue';
	import pageCart from './sub-page/page-cart/index.vue';
	import pageOrder from './sub-page/page-order/index.vue';
	import pageAcc from './sub-page/page-acc/index.vue';
	//当前页面变量
	const page = ref(0);
	//导航栏点击事件
	const tabchange = (e) => {
		//定位到当前页面
		page.value = e;
	};
</script>

<style>

</style>
