<template>
	<view class="content">
		<image class="svgd" src="@/static/1.svg">
		</image>

		<view class="loginBox">
			<view class="inputBox">
				<form :model="formModel">
					<view class="ipt">
						<uv-icon name="email" color="rgb(66,157,250)" size="24"></uv-icon>
						<input type="email" placeholder="请输入电子邮箱" v-model="formModel.email" />
					</view>
					<view class="ipt">
						<uv-icon :name="showPassword ? 'eye-off-outline' : 'eye'" color="rgb(66,157,250)" size="24" @click="showPassword = !showPassword"></uv-icon>
						<input :type="showPassword ? 'text' : 'password'" placeholder="输入密码" v-model="formModel.password" />
					</view>
					<view class="ipt">
						<uv-icon :name="showPassword2 ? 'eye-off-outline' : 'eye'" color="rgb(66,157,250)" size="24" @click="showPassword2 = !showPassword2"></uv-icon>
						<input :type="showPassword2 ? 'text' : 'password'" placeholder="重复密码" v-model="rePassword" />
					</view>
					<view class="ipt2">
						<input type="text" placeholder="请输入验证码" v-model="formModel.vcode" />
						<!-- <button class="yzm">
							发送验证码
						</button> -->
						<uv-button @click="sendCode" text="发送验证码" color="linear-gradient(to right, rgb(66, 157, 250), rgb(0, 170, 127))" size="small"></uv-button>
					</view>
					<button class="button" @click="submit">注册</button>
				</form>
				<view class="forgetPwd">
					<navigator url="/pages/user/login/index">
						<span>已有账号，去登录</span>
					</navigator>
				</view>
			</view>
			<view class="tipbox">
				<view class="txt">
					—— 使用第三方账户登录 ——
				</view>
				<view class="otherUser">
					<uv-icon name="weixin-circle-fill" color="rgb(2,187,17)" size="40"></uv-icon>
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
	import { isNull,isEmail } from '@/common/base.js';
	import { setToken } from '@/common/user.js'
	const showPassword = ref(false);//是否显示密码
	const showPassword2 = ref(false);//是否显示密码
	const formModel = ref({});  //表单绑定
	const rePassword = ref(''); //重复密码输入框
	//提交表单事件
	const submit = () => {
		// 检查所有项目是否填写
		if (isNull(formModel.value.email) || isNull(rePassword.value) || isNull(formModel.value.password) || isNull(formModel.value.vcode)) {
			uni.showToast(
				{
					title: '所有项,必须填写',
					duration: 2000,
					icon: "error"
				}
			);
			return
		};
		//核验重复密码
		if (rePassword.value != formModel.value.password) {
			uni.showToast(
				{
					title: '重复密码不一致',
					duration: 2000,
					icon: "error"
				}
			)
			return
		};
		console.log(formModel);
		//开始请求	
		request("/api/register",'post',formModel.value)
		.then(data => {
			uni.showToast(
				{
					title: '注册成功',
					duration: 3000,
					icon: "success"
				}
			);
			// //注册成功返回登录页
			// uni.navigateTo({
			// 	url:'/pages/user/login/index',
			// })
			
			//保存token
			setToken(data.token);
			//返回主页
			uni.redirectTo({
				url:'/pages/index/index'
			})
		});
		// .catch(error => {
		// 	console.log('请求失败:', error);
		// });
	};
	//发送验证码按钮事件
	const sendCode = () =>{
		//检查邮箱格式
		if (!isEmail(formModel.value.email)) {
			uni.showToast(
				{
					title: '邮箱格式不正确',
					duration: 3000,
					icon: "none"
				}
			);
			return
		};
		//开始请求
		request("/api/getcode",'post',formModel.value)
		.then(data => {
			uni.showToast(
				{
					title: '发送成功',
					duration: 3000,
					icon: "success"
				}
			);
		});
	};
</script>

<style>
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
		padding: 0 10rpx;
		display: flex;
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
		width: 70rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 10rpx;
		color: #fff;
	}
</style>