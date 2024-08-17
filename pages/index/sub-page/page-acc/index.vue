<template>
	<view class="userInfo">
		<image src="@/static/logo.png" class="image"></image>
		<!-- 如果未登录则点击用户名跳转到登录页 -->
		<navigator url="/pages/user/login/index" v-if="userEmail === '请登录'">
			<view class="userName">{{ userEmail }}</view>
		</navigator>
		<!-- 如果已登录则这是普通标签 -->
		<view class="userName" v-else>{{ userEmail }}</view>
	</view>
	<!-- 个人中心功能 -->
	<uv-list padding="30rpx 30rpx">
		<uv-list-item
			border
			:disabled="userEmail === '请登录'"
			title="修改密码" 
			:show-extra-icon="true"
			:extra-icon="{color: 'rgb(66,157,250)',size: '28',icon: 'edit-pen'}"
			link="reLaunch" @click="toRepassword">
		</uv-list-item>
		<uv-list-item
			border
			:disabled="userEmail === '请登录'"
			title="帮助中心" 
			:show-extra-icon="true"
			:extra-icon="{color: 'rgb(66,157,250)',size: '28',icon: 'question-circle-fill'}"
			link="reLaunch">
		</uv-list-item>
		<uv-list-item
			border
			:disabled="userEmail === '请登录'"
			title="退出登录" 
			:show-extra-icon="true"
			:extra-icon="{color: 'rgb(66,157,250)',size: '28',icon: 'arrow-rightward'}"
			link="reLaunch" @click="logout">
		</uv-list-item>
		
	</uv-list>
</template>

<script setup>
	import { onMounted,ref } from 'vue';
	import { request } from '@/common/request.js';
	import { setToken } from '@/common/user.js';
	const userEmail = ref('请登录');
	onMounted(()=>{
		//开始请求用户信息
		request("/api/getuser")
		.then(data => {
			userEmail.value = data.data.email
		});
	});
	const toRepassword = () =>{
		//跳转到修改密码页
		uni.navigateTo({
			url:"/pages/user/repassword/index"
		});
	};
	//点击退出登录
	const logout = () =>{
		//删除token
		setToken('');
		//提醒
		uni.showToast({
		    title: '您已退出登录',
		    duration: 1500,
		    icon: "success"
		});
		//跳转到首页
		uni.redirectTo({
			url:"/pages/index/index"
		});
	};
</script>

<style lang="scss">
	.userInfo{
		width: 100%;
		height: 300rpx;
		background-size:100%;
		background-color: #67a0dd;
		background-image: url('@/static/userBg.png');
	}
	.image{
		width: 100rpx;
		height: 100rpx;
		float: left;
		margin: 100rpx 30rpx;
		border-radius: 50rpx;
	}
	.userName{
		width: 590rpx;
		height: 100rpx;
		line-height: 100rpx;
		float: left;
		margin: 100rpx 0 30rpx 0;
		color: #ffffff;
		font-size: 36rpx;
	}
</style>