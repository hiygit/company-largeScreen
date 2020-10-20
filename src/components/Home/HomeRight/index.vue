<template>
  <div class="homeright" style="width: 625px;">
    <div class="homeleft_top">
      <!-- 企业信用排行 -->
      <div class="homeleft_creditrating">
        <div class="homeleft_titleBox">
          <div class="homeleft_subtitleFrame" style="width: 171.56px;height:28px;font-size:16px;line-height:28px;padding:0 20px;">总信用分布评级</div>
          <div class="top5">万柏林区</div>
        </div>
        <Radar/>
      </div>
      
    </div>
    <div class="homeleft_bottom">
      <div class="homeleft_bottom_title" style="height:40px;line-height:40px;font-size:16px;padding:0 22px;">日常功能模块</div>
      <div class="homeleft_bottom_btnbox">
        <div class="homeleft_bottom_btnbox_top">
          <div @click="platformFindBtn" style="cursor: pointer;">
            <img src="../../../assets/find.png" alt="">
            <p>平台查询</p>
          </div>
          <div class="search">
            <input v-model="inquireInput" type="text" >
            <img @click="searchbtn" src="../../../assets/searchbtn.png" alt="">
          </div>
          <!-- <div>
            <img src="../../../assets/advice.png" alt="">
            <p>建言献策</p>
          </div> -->
          <!-- <div class="homeleft_bottom_btnbox_top_line"></div> -->
        </div>
        <div class="homeleft_bottom_btnbox_bottom">
          <el-tabs type="border-card" @tab-click="handleClick">
            <el-tab-pane label="通知公告">
              <div class="tabContent" v-for="(item,index) in tabContentList" :key="index"> 
                <!-- <span>{{(item.createDate).substring(0,10)}}</span> -->
                <p>{{(item.createDate).substring(0,10)}} &nbsp; &nbsp; &nbsp;{{item.content}}</p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="行业动态">
              <div class="tabContent" v-for="(item,index) in tabContentList1" :key="index"> 
                <!-- <span>{{(item.createDate).substring(0,10)}}</span> -->
                <p>{{(item.createDate).substring(0,10)}} &nbsp; &nbsp; &nbsp;{{item.content}}</p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="法律法规">
              <div class="tabContent" v-for="(item,index) in tabContentList2" :key="index"> 
                <!-- <span>{{(item.createDate).substring(0,10)}}</span> -->
                <p>{{(item.createDate).substring(0,10)}} &nbsp; &nbsp; &nbsp;{{item.content}}</p>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

    
  </div>
</template>

<script src='./script.js'></script>

<style lang="scss"  src='./style.scss'>

</style>