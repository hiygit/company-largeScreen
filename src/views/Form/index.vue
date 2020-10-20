<template>
  <div class="form">
    <div class="formTitleBox">
      <img src="../../assets/offeradviceandsuggestions .png" alt="">
      <h3>建言献策</h3>
    </div>
    <div class="formBox">
      <div class="formBoxList">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          
          <el-form-item label="反馈类型：" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="反馈标题：" prop="name">
            <el-input class="feedbackTitle" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="反馈主要内容：" prop="desc">
            <el-input class="feedbackTitle" type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <div class="nameEmailBox">
            <el-form-item label="姓名：" prop="name">
              <el-input class="namebox" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="您的邮箱：" prop="name">
              <el-input class="namebox" v-model="ruleForm.name"></el-input>
            </el-form-item>
          </div>
          
          <el-form-item label="其他联系方式：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
         
          
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    
  </div>
</template>

<script>
import qs from 'qs' 
export default {
  data(){
    return{
      ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
    }
  },
  mounted(){

  },
  methods:{
    // 返回上一页
    goback(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.form{
  width: 100%;
  // height: 100%;
  height: 100vh;
  padding: 50px 80px;
  box-sizing: border-box;
  .formTitleBox{
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px;
    margin-bottom: 2px;
    background: #F9F9F9;
    box-sizing: border-box;
    img{
      width: 25px;
      height: 25px;
      margin-right: 8px;
    }
    h3{
      color: #333333;
      font-size: 12px;
      letter-spacing: 2px;
    }
  }
  .formBox{
    width: 100%;
    padding: 20px 30px;
    background: #F9F9F9;
    box-sizing: border-box;

  }


  // 
  .el-form-item__label{
    width: 13% !important;
  }
  .el-form-item__content{
    display: flex;
  }
  .feedbackTitle .el-input__inner,.el-textarea__inner{
    width: 95% !important;
    resize: none;
  }
  .namebox .el-input__inner{
    width: 35% !important;
  }
  // .nameEmailBox{
  //   display: flex;
  //   // align-items: center;
  //   // justify-content: space-between;
  // }
}
</style>