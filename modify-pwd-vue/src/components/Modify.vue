<template>
  <div class="page">
    <el-breadcrumb separator=">" style="position: relative;top: 10px">
      <el-breadcrumb-item>轩天实业</el-breadcrumb-item>
      <!--:to="{ path: '/' }"-->
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card card">
      <h3 style="font-size: 16px;margin-bottom: 63px">修改密码</h3>
      <span class="spanLabel">工号</span>
      <el-input v-model="pId1" class="personId"></el-input>
      <el-input v-model="pId2" class="personId"></el-input>
      <el-input v-model="pId3" class="personId"></el-input>
      <el-input v-model="pId4" class="personId"></el-input>
      <el-input v-model="pId5" class="personId"></el-input>
      <el-input v-model="pId6" class="personId"></el-input>
      <el-input v-model="pId7" @blur="showStep1()" class="personId"></el-input>
      <div id="valiCode">
        <div v-if="hasShowStep1" class="step1" style="text-align: center;margin-bottom: 30px">
          <div id="tip" style="margin-top: 20px;margin-bottom: 10px">我们需要向您的手机<span v-text="phone"></span>发送验证码进行验证</div>
          <el-button @click="getValiCode()" v-text="count=='发送验证码'?count:count+'s'" type="warning" style="width: 112px;height: 26px;line-height:.2;color: #fff;"></el-button>
        </div>
        <div v-if="hasShowStep1" class="step1" style="margin-bottom: 16px">
          <span class="spanLabel">验证码</span>
          <el-input v-model="valiCode" class="pwdInput" placeholder="输入验证码"></el-input>
          <img v-if="isValiCodeTrue" style="position: relative;right: 15px;" src="../assets/img/checkbox.png" alt="">
          <el-button @click="showStep2()" v-if="!isValiCodeTrue" type="warning" style="width: 76px;height: 36px;line-height:.3;color: #fff;">确定</el-button>
        </div>
        <div v-if="hasShowStep2" class="step2">
          <span class="spanLabel">新密码</span>
          <el-input v-model="newPwd" style="margin-bottom: 16px" class="pwdInput" placeholder="输入密码"></el-input>
          <span class="spanLabel">重复密码</span>
          <el-input v-model="newPwdSec" class="pwdInput" placeholder="再次输入密码"></el-input>
          <el-row style="text-align: right;position: relative;top: 50px;">
            <el-button @click="modifyCancel()" class="footBtn">取消</el-button>
            <el-button @click="modifySure()" class="footBtn" type="warning">确定</el-button>
          </el-row>
        </div>
      </div>
    </el-card>
    <a href="#"><img src="../assets/img/top.png" alt=""></a>
  </div>
</template>

<script>
  import baseUrls from './../../static/config/baseURL.js';
    export default {
      name: "Modify",
      data(){
        return {
          initUrl:baseUrls,
          pId1:'',
          pId2:'',
          pId3:'',
          pId4:'',
          pId5:'',
          pId6:'',
          pId7:'',
          phone:'',
          pIdStr:'',
          valiCode:'',
          isValiCodeTrue:false,
          hasShowStep1:false,
          hasShowStep2:false,
          count:'发送验证码',
          newPwd:'',
          newPwdSec:''
        }
      },
      created(){

      },
      methods:{
        showStep1:function(){
          this.pIdStr=this.pId1+this.pId2+this.pId3+this.pId4+this.pId5+this.pId6+this.pId7;
          if(this.pIdStr.length<7){
            this.$message.error('请输入正确的工号！');
            return;
          }else{
            let that = this;
            this.$axios.post(this.initUrl.modifyUrl + 'getUserMobileNo?userName='+this.pIdStr)
              .then(Response => {
                console.log(Response);
                if (Response.data.status == '1') {
                  this.hasShowStep1=!this.hasShowStep1;
                  that.phone=Response.data.data.mobileNo;
                } else {
                  that.$message.error(Response.data.msg||'请求失败!')
                }
              })
              .catch(error => {
                that.$message.error('服务器内部错误!')
              })
          }
        },
        showStep2:function(){
          let that = this;
          this.$axios.post(this.initUrl.modifyUrl + 'checkCode?userName='+this.pIdStr+'&mobileNo='+this.phone+'&code='+this.valiCode)
            .then(Response => {
              //console.log(Response);
              if (Response.data.status == '1') {
                that.isValiCodeTrue=!that.isValiCodeTrue;
                that.hasShowStep2=!that.hasShowStep2;
              } else {
                that.$message.error(Response.data.msg||'验证码错误!')
              }
            })
            .catch(error => {
              that.$message.error('服务器内部错误!')
            })
        },
        getValiCode:function(){
          this.count=60;
          let timer=setInterval(()=>{
            this.count--;
            if(this.count<=0){
              clearInterval(timer);
              timer=null;
              this.count='发送验证码';
            }
          },1000);
          let that = this;
          this.$axios.post(this.initUrl.modifyUrl + 'sendCode?userName='+this.pIdStr+'&mobileNo='+this.phone)
            .then(Response => {
              //console.log(Response);
              if (Response.data.status == '1') {
                that.$message('验证码已发送!')
              } else {
                that.$message.error(Response.data.msg||'验证码发送失败!')
              }
            })
            .catch(error => {
              that.$message.error('服务器内部错误!')
            })
        },
        modifyCancel:function(){
          history.back();
        },
        modifySure:function () {
          if(this.newPwd!=this.newPwdSec){
            this.$message.error('两次输入的密码不一致！');
            return;
          }
          let that = this;
          this.$axios.post(this.initUrl.modifyUrl + 'modifyPassword?userName='+this.pIdStr+'&mobileNo='+this.phone+'&password='+this.newPwd+'&passwordConfirm='+this.newPwdSec)
            .then(Response => {
              //console.log(Response);
              if (Response.data.status == '1') {
                that.$message('修改成功!')
                window.location.href='http://sso.ehaofang.com/loginout';
              } else {
                that.$message.error(Response.data.msg||'修改失败!')
              }
            })
            .catch(error => {
              that.$message.error('服务器内部错误!')
            })
        }
      }
    }
</script>

<style scoped>
  .card{
    width: 770px;
    min-height: 225px;
    margin: 200px auto;
    padding: 10px 10px 60px 10px;
  }
  .personId{
    width: 51px;
    margin-right: 20px;
  }
  .spanLabel{
    display: inline-block;
    width: 64px;
    font-size: 16px;
    margin-left: 58px;
    margin-right: 30px;
    font-weight: bold;
  }
  .pwdInput{
    width: 446px;
    margin-right: 10px;
  }
  .footBtn{
    width: 73px;
    height: 34px;
    line-height: .8;
  }
</style>
