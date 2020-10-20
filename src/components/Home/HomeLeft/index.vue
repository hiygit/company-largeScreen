<template>
  <div class="homeleft" style="width: 625px;">
    <div class="homeleft_top">
      <!-- 企业信用排行 -->
      <div class="homeleft_creditrating">
        <div class="homeleft_titleBox">
          <div class="homeleft_subtitleFrame" style="width: 171.56px;height:28px;font-size:16px;line-height:28px;padding:0 20px;">企业信用排行</div>
          <div class="top5">Top 05</div>
        </div>
        <div class="homeleft_top_text">
          <p v-for="(item,index) in companyList.slice(0, 5)" :key="index" @click="goCopany(item)">
            <span>{{index + 1 > 9 ? index + 1 : "0" + (index + 1)}}</span>
            {{item.name}}
          </p>
        </div>
      </div>
      <!-- 信用占比图 -->
      <div class="homeleft_creditrating homeleft_proportion">
        <div class="homeleft_titleBox">
          <div class="homeleft_subtitleFrame" style="width: 171.56px;height:28px;font-size:16px;line-height:28px;padding:0 20px;">信用占比图</div>
        </div>
         <Shape :titlePre="titlePreNoHollow" :dataPre="dataPreNoHollow" :isHollow="true"/>
      </div>
    </div>
    <!-- 各行业信用等级柱状图 -->
    <div class="homeleft_bottom">
      <div class="homeleft_bottom_title" style="height:40px;line-height:40px;font-size:16px;padding:0 22px;">各行业信用等级柱状图</div>
      <Gender :nameList="industryName" :arrList="industryavg"/>
    </div>
  </div>
</template>

<script src='./script.js'></script>

<style lang="scss"  src='./style.scss'>

</style>