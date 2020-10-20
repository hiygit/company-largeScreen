export default {
  data(){
    return{
      backBtn: false,   //头部返回键
    }
  },
  mounted(){
    
  },
  methods:{
    goLink(){
      this.$router.push({ path: '/login' })
    }
  }
}