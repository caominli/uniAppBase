<template>
	<!-- <view class="main">
		<uv-form labelPosition="left" :model="formModel" ref="form">
			<uv-form-item label="邮箱" prop="formModel.name" borderBottom>
				<uv-input placeholder="输入邮箱" border="surround" v-model="formModel.name" type="email"></uv-input>
			</uv-form-item>
			<uv-form-item label="密码" prop="formModel.password" borderBottom>
				<uv-input placeholder="输入密码" border="surround" v-model="formModel.password" :password="true"></uv-input>
			</uv-form-item>
			<uv-button type="primary" text="登录" customStyle="margin-top: 10px" @click="submit"></uv-button>
		</uv-form>
	</view> -->
	<view class="content">
		<image class="svgd" src="@/static/1.svg">
		</image>

		<view class="loginBox">
			<form class="inputBox" :model="formModel">
				<view class="ipt">
					<uv-icon name="email" color="rgb(66,157,250)" size="24"></uv-icon>
					<input type="email" placeholder="请输入账号" v-model="formModel.email"/>
				</view>
				<view class="ipt">
					<uv-icon :name="showPassword ? 'eye-off-outline' : 'eye'" color="rgb(66,157,250)" size="24" @click="showPassword = !showPassword"></uv-icon>
					<input :type="showPassword ? 'text' : 'password'" placeholder="请输入密码" v-model="formModel.password"/>
				</view>
				<button class="button" @click="submit">登录</button>
				<view class="forgetPwd">
					<navigator url="/pages/user/repassword/index">
						<span>忘记密码</span>
					</navigator>
					<navigator url="/pages/user/register/index">
						<span>没有账号，去注册</span>
					</navigator>
				</view>
			</form>
			<view class="tipbox">
				<view class="txt">
					—— 其他账号登录 ——
				</view>
				<view class="otherUser">
					<uv-icon name="weixin-circle-fill" color="rgb(2,187,17)" size="40" @click="wxLogin"></uv-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	//导入封装的请求包
	import { request } from '@/common/request.js';
	//导入基本判断是否为空
	import { isNull } from '@/common/base.js';
	import { setToken } from '@/common/user.js'
	import { apiUrl } from '@/config/config.js'
 	const showPassword = ref(false);//是否显示密码
	const formModel = ref({});  //表单绑定
	//提交表单事件
	const submit = () => {
		// 检查所有项目是否填写
		if (isNull(formModel.value.email) || isNull(formModel.value.password)) {
			uni.showToast(
				{
					title: '所有项,必须填写',
					duration: 2000,
					icon: "error"
				}
			)
			return
		};
		//开始请求	
		request("/api/login",'post',formModel.value)
		.then(data => {
			uni.showToast(
				{
					title: '登录功',
					duration: 3000,
					icon: "success"
				}
			);
			//保存token
			setToken(data.token);
			//返回主页
			uni.redirectTo({
				url:'/pages/index/index'
			})
		});
	};
	//微信登录
	const wxLogin = () =>{
		console.log('微信登录开始运行')
		// var weixinOauth = null;
		// plus.oauth.getServices(function(services) {
		// 	for (var i in services) {
		// 		var service = services[i];
		// 		// 获取微信登录对象
		// 		if (service.id == 'weixin') {
		// 			weixinOauth = service;
		// 			break;
		// 		}
		// 	}
		// 	weixinOauth.authorize( function(event){
		// 		const {code} = event
		// 		console.log('返回的状态:',event)
		// 		// 客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
		// 		request('/api/wxlogin','post',{
		// 			code:event.code
		// 		})
		// 		.then(data =>{
		// 			//取得返回内容
		// 			console.log('id:',data.openid)
		// 		});
		// 	}, function(err) {
		//     // 登录授权失败
		//     console.log('授权失败:',err,'错误码:',err.code)
		// 	})
		// }, function(err) {
		// 	// 获取 services 失败
		// 	console.log('services错误:',err)
		// });
		
		uni.login({
			"provider": "weixin",
			"onlyAuthorize": true, // 微信登录仅请求授权认证
			success: function(event){
				console.log('返回的状态:',event)
				const {code} = event;
				//客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
				request('/api/wxlogin','post',{
					code:event.code
				})
				.then(data =>{
					//取得返回内容
					console.log('id:',data.openid)
				});
			},
			fail: function (err) {
		        // 登录授权失败
		        console.log('错误:',err,'错误码:',err.code)
				
		    }
		})
	};
</script>

<style>
	/* 主体 */
	/* 	.main {
		display: flex;
		flex-direction: column;
		padding-left: 70rpx;
		padding-right: 70rpx;
	}
	 */

	.svgd {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 40%;
		box-sizing: border-box;
		display: block;
		background-color: #ffffff;
	}

	.loginBox {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -60%);
		width: 90%;
		border-radius: 20rpx;
		padding: 60rpx;
		box-sizing: border-box;
	}

	h3 {
		color: rgb(66, 157, 250);
		font-size: 40rpx;
		letter-spacing: 10rpx;
		margin-bottom: 40rpx;
	}

	.inputBox {}

	.ipt {
		height: 86rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 40rpx;
		background-color: #f5f5f5;
		border-radius: 10rpx;
		padding-left: 10rpx;
	}
	
	.ipt2 {
		height: 86rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 40rpx;
		background-color: #f5f5f5;
		border-radius: 10rpx;
		padding-left: 30rpx;
	}

	.ipt input {
		margin-left: 20rpx;
		font-size: 28rpx;
	}

	.ipt input {
		margin-left: 20rpx;
	}

	.forgetPwd {
		margin-top: 30rpx;
		font-size: 26rpx;
		color: #b5b5b5;
		text-align: end;
		padding: 0 10rpx;
		display: flex;
		justify-content: space-between;
	}

	.button {
		margin-top: 20rpx;
		line-height: 85rpx;
		text-align: center;
		background: rgb(66, 157, 250);
		border-radius: 40rpx;
		color: #fff;
		margin-top: 40rpx;
	}

	.tip {
		text-align: center;
		font-size: 28rpx;
		position: fixed;
		bottom: 50rpx;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #f4f4f4;
	}

	.tipbox {
		text-align: center;
		margin-top: 100rpx;
	}

	.otherUser {
		margin-top: 30rpx;
		display: flex;
		justify-content: center;
	}

	.txt {
		font-size: 28rpx;
		color: #cbcbcb;
	}

	.otherUser .uni-icons {
		margin-left: 20rpx;
	}

	.yzm {
		text-align: end;
		font-size: 24rpx;
		background: linear-gradient(to right, rgb(66, 157, 250), rgb(0, 170, 127));
		height: 60rpx;
		width: 150rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 10rpx;
		color: #fff;
	}
</style>