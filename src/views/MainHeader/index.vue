<template>
  <div class="mainheader">
    <div class="back" v-show="backBtn"><img src="../../assets/back.png" alt=""></div>
    <div class="mainheader_setup" @click="goLink('/usercenter')">
      <img src="./../../assets/exit.png" alt />
      退出
    </div>
    <div class="mainheader_title">万柏林企业信用平台</div>
  </div>
</template>

<script src='./script.js'></script>

<style lang='scss' src='./style.scss'></style>