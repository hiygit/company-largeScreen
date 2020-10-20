<template>
  <div id="app">
    <div id="nav" class="container">
      <router-view name='header'></router-view>
      <router-view name='content'></router-view>
    </div>  
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './components/font/font.css';
html,
body,
.container,
// #app {
//   width: 2040px;
//   // height: 100%;
//   margin: 0;
//   font-family: PingFangSC-Medium;
//   // background: url(assets/bg.png) no-repeat;
//   // background-size: 100% 100%;
// }
ul,
ol,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
figure,
form,
fieldset,
legend,
input,
textarea,
button,
p,
blockquote,
th,
td,
pre,
xmp {
  margin: 0;
  padding: 0;
}
ul,ol,li{
  list-style: none;
}
input,textarea,button{
  outline: none;
  border: none;
  background: none;
}


</style>
