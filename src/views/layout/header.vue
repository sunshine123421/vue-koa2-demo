<template>
  <div class="main-header">
      <h1 class="main-header-font">电子档案系统</h1>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">档案管理</el-menu-item>
        <el-menu-item index="2">消息中心</el-menu-item>
      </el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>


<style>
 .main-header{
   text-align: center;
   margin-bottom: 10px;
 }
 .main-header-font{
   color:#409eff;
 }

</style>