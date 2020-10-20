// 首页
import Home from './../views/Home/index'
// 首页
import Newhome from './../views/Newhome/index'
// 头部
import MainHeader from './../views/MainHeader/index'
// 平台查询详情
import PlatformFindDatile from './../views/PlatformFindDatile/index'
// 登录
import Login from './../views/Login/login'
// echats交叉关系图
import Force from './../views/Force/force'
// 企业详情
import CompanyInfo from '../views/CompanyInfo/index'
// 查询结果
import SearchResult from '../views/SearchResult/index'
// 建言献策
import Form from '../views/Form/index'

const routes = [
  {
    path:"/",
    redirect: '/login',
  },{
    path: '/home',
    name: '首页',
    components: {
      // header: MainHeader,
      content: Home
    },
  },{
    path: '/newhome',
    name: '首页新',
    components: {
      content: Newhome
    }
  },{
    path: '/platformFindDatile',
    name: '平台查询',
    components: {
      // header: MainHeader,
      content: PlatformFindDatile
    },
  },{
    path: '/login',
    name: '登录',
    components: {
      // header: MainHeader,
      content: Login
    },
  },{
    path: '/companyInfo',
    name: '企业信息',
    components: {
      // header: MainHeader,
      content: CompanyInfo
    },
  },{
    path: '/searchResult',
    name: '查询结果',
    components: {
      // header: MainHeader,
      content: SearchResult
    },
  },{
    path: '/Form',
    name: '建言献策',
    components: {
      // header: MainHeader,
      content: Form
    },
  },{
    path: '/force',
    name: 'echarts交叉关系图',
    components: {
      // header: MainHeader,
      content: Force
    },
  },
]
export default routes