<script setup>
	import { onLaunch,onShow,onHide } from '@dcloudio/uni-app';
	import { onMounted,ref } from 'vue';
	//其他页面生命周期
	onLaunch(() => {
	  console.log('APP加载');
	});
	onShow(() => {
	  console.log('APP显示');
	});
	onHide(() => {
	  console.log('APP跳转');
	});
</script>


<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uv-ui-tools/index.scss';
</style>
