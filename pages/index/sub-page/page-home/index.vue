<template>
	<!-- 轮播图 -->
	<view>
		<uv-swiper :list="list" indicator indicatorMode="line" circular></uv-swiper>
	</view>
	<!-- 商品展示 -->
	<view style="margin-top: 20px;">
		<uv-grid :border="false">
			<uv-grid-item v-for="(item,index) in items" :key="item.id" @click="itemclick(item.id)">
				<uv-image :src="item.img" width="80px" height="80px"></uv-image>
				<text class="grid-text">{{item.name}}</text>
			</uv-grid-item>
		</uv-grid>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	const list = ref([
		'https://cdn.uviewui.com/uview/swiper/swiper3.png',
		'https://cdn.uviewui.com/uview/swiper/swiper2.png',
		'https://cdn.uviewui.com/uview/swiper/swiper1.png',
	]);
	const items = ref([{
		img: 'https://cdn.uviewui.com/uview/album/1.jpg',
		name: '京东E卡',
		url: '#',
		id: 1
	}, {
		img: 'https://cdn.uviewui.com/uview/album/1.jpg',
		name: '沃尔玛礼品卡',
		url: '#',
		id: 5
	}, {
		img: 'https://cdn.uviewui.com/uview/album/1.jpg',
		name: '星巴克兑换券',
		url: '#',
		id: 3
	}]);
	
	//点击商品跳转
	const itemclick = (id) => {
		uni.showToast({
			icon: 'none',
			title: `点击了商品ID：${id}`
		})
	};
</script>

<style>
	.grid-text {
		font-size: 14px;
		color: #909399;
		margin-top: 8px;
	}
</style>