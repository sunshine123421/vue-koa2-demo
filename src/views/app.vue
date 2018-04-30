<template>
	<div>
		<m-header></m-header>
		<router-view></router-view>
		<m-footer></m-footer>
	</div>
</template>

<script>
	import MHeader from './layout/header.vue'
	import MFooter from './layout/footer.vue'
	export default{
		components:{
			MHeader,
			MFooter,
		}
	}
</script>

<style>
	body{
		color: blue;
	}
</style>