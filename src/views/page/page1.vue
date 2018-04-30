<template>
	<div class="page1">
		<RecordList></RecordList>
	</div>
</template>

<script>
	import RecordList from '../recordManagement/recordList.vue'

	export default{
		components:{
			RecordList,
		}
	}
</script>

<style lang="less">

	.page1{
		color: red;
	}
</style>
