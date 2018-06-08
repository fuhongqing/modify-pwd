<template>
  <div id="app">
    <div id="container">
      <header></header>
      <main>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </main>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font: 14px PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333333;
    margin-top: 50px;
  }
  .el-input__inner{
    height: 36px;
    line-height: 36px;
  }
  .el-breadcrumb__inner{
    font-size: 12px;
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }
  a:hover{
    text-decoration: none;
  }
  body,ul,ol,dl,h1,h2,h3,h4,h5,h6,p {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  body{
    background: #F1F1F1;
  }
  .lf{
    float: left;
  }
  .gt{
    float: right;
  }
  .clear::after{
    display: block;
    content: "";
    clear: both;
  }
  .page{
     width: 1200px;
     height: 100%;
     margin: 0 auto;
     padding: 0 20px;
     background: #fff;
   }
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    box-sizing: border-box;
  }
  .page img{
    vertical-align: middle;
    -webkit-transform: scale(.5);
    transform: scale(.5);
    display: inline-block;
  }
  button{cursor: pointer;outline: none;background: none; border: none;}
  input{background: none; border: none;outline: none;}
  table { border-collapse:collapse; }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
  }
  input[type="number"]{-moz-appearance:textfield;}
</style>
