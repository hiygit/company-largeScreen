<template>
  <div class="platformFindDatile" style="width: 1920px;height:1080px;padding: 0 23px 0px;overflow-x:hidden;">
    <!-- 顶部导航 -->
    <div class="mainheader">
      <div class="back" v-show="backBtn"><img @click="goback" src="../../assets/back.png" alt=""></div>
      <!-- <div class="mainheader_setup" @click="goLink">
        <img src="./../../assets/exit.png" alt />
        退出
      </div> -->
      <div class="mainheader_title" style="width: 508px;height: 53px;line-height: 53px;font-size: 25px;">万柏林企业信用平台</div>
    </div>
    <!-- <div class="mainheader">
      <div class="back" v-show="backBtn">
       <img @click="goback" src="../../assets/back.png" alt="">
      </div>
      <div class="mainheader_title">万柏林企业信用平台</div>
    </div> -->

    <!-- 内容 -->
    <div class="homeleft_bottom">
      <div class="homeleft_bottom_title">平台查询</div>

      <!-- 精确查询 模糊查询 -->
      <div class="platformFindDatile_top">
        <ul class="platformFindDatile_tabBtn">
          <li @click="getNum(index)" v-for="(item,index) in tabBtnList" :key="index" :class="{active:num == index}"><i :class="{xiasanjiao:num == index}"></i>{{item}}</li>
        </ul>
        <div class="platformFindDatile_tabContent">
          <div class="platformFindDatile_inputBox">
            <input v-model="inquireInput" type="text" placeholder="请输入企业/法人名称、统一企业社会代码、注册号">
            <!-- <input v-show="tabipt2" type="text" placeholder="请输入"> -->
          </div>
          <button type="success" @click="sureBtn">确认查询</button>
        </div>
      </div>

      <!-- 高级查询 -->
      <div class="advancedFindBox">
        <div class="advancedFindBox_titleBox">
          <img src="../../assets/search.png" alt="">
          高级查询
        </div>
        <!-- 常用经营分类查询 -->
        <div class="classifyBox">
          <!-- <el-collapse v-model="activeName" accordion>
            <el-collapse-item :title="item.title" name="1" v-for="(item,index) in foldList" :key="index">
              <div class="classlist" style="display:flex;margin-bottom:8px;" v-for="(classItem,index) in item.classList" :key="'i'+index">
                <span style="width:9%;color:#F2FBFD;">{{classItem.classTitle}}</span>
                <div style="width:91%;">
                  <span v-for="(itemSpan,index) in classItem.classSpan" :key="'a'+index" :class="{activeColor:index == isactive}" @click="changeColor(itemSpan,index)" style="margin-right:20px;border-radius:3px;display:inline-block;padding:1px 3px;margin-bottom:20px" 
                  >{{itemSpan.classSpan}}</span>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse> -->
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="常用经营分类查询" name="1">
              <div class="classlist" style="display:flex;margin-bottom:8px;" v-for="(item,index) in foldList" :key="index">
                <span style="color:#F2FBFD;">{{item.name+":"}}</span>
                <div class="colorspan">
                  <span v-for="(itemSpan,index) in item.businessClassifications" :key="'a'+index" @click="changeColor(itemSpan,index)" style="margin-right:20px;border-radius:3px;display:inline-block;padding:1px 3px;margin-bottom:20px;cursor: pointer;" 
                  >{{itemSpan.name}}</span>
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item title="信用等级查询" name="2">
              <div class="classlist" style="display:flex;margin-bottom:8px;" v-for="(item,index) in foldList" :key="index">
                <span style="color:#F2FBFD;">{{item.name+":"}}</span>
                <div class="colorspan">
                  <span v-for="(itemSpan,index) in item.creditRatings" :key="'a'+index" @click="gradechangeColor(itemSpan,index)" style="margin-right:20px;border-radius:3px;display:inline-block;padding:1px 3px;margin-bottom:20px;cursor: pointer;" 
                  >{{itemSpan.grade +"级"}}</span>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script src='./script.js'></script>

<style lang="scss" src='./style.scss'></style>