<template>
<div class="content home">
    <div style="width: 2040px;height:98.2vh;position:relative;">
        <!-- 地图 -->
        <div id="container" style="width:2040px;height: 98.2vh"></div>
        
        <!-- <div class="home_main"> -->
            <!-- 顶部导航 -->
            <div class="mainheader" style="width: 2040px;">
                <!-- <div class="back" v-show="backBtn"><img @click="goback" src="../../assets/back.png" alt=""></div> -->
                <div class="mainheader_setup" @click="goLink">
                    <img src="./../../assets/exit.png" alt />
                    退出
                </div>
                <div class="mainheader_title" style="width: 508px;height: 53px;line-height: 53px;font-size: 25px;">万柏林企业信用平台</div>
            </div>
            <!-- <div class="threeBox"> -->
                <!-- 左侧内容 -->
                <HomeLeft />
                <!-- 首页中间内容 -->
                <HomeCenter />
                <!-- 右侧的内容 -->
                <HomeRight />
            <!-- </div> -->
        <!-- </div> -->
    </div>
</div>
</template>

<script src='./script.js'></script>

<style lang='scss' src='./style.scss'></style>