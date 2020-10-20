<template>
  <div class="homecenter" style="display: none">
    <div class="title">
      万柏林区企业平均信用分布图
    </div>
    <!-- <Map/> -->
    <!-- <div style="padding: 0px;">
      <div id="map" style="width:100%;height:450px;margin:30px auto;box-sizing: border-box;"></div>
    </div> -->

    <div class="homecenter-bottom">
      <div v-for="(item,index) in contentList" :key="index">{{item.contentText}}</div>
    </div>
  </div>
</template>

<script src='./script.js'></script>

<style lang="scss"  src='./style.scss'>

</style>