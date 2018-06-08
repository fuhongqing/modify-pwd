$(function () {
    var initUrl='http://192.168.3.46/api/basic/';
    var codeStr='',phoneNum='',count=60;
    $('#perCode7').blur(function () {
        codeStr=$('#perCode1').val()+$('#perCode2').val()+$('#perCode3').val()+$('#perCode4').val()+$('#perCode5').val()+$('#perCode6').val()+$('#perCode7').val();
        $.ajax({
            type:'POST',
            url:initUrl+'getUserMobileNo',
            data:{
                userName:codeStr//	是	string	工号
            },
            success:function (data) {
                if(data.status==1){
                    phoneNum=data.data.mobileNo;
                    $('#step1').show();
                    $('#phoneSpan').html(phoneNum);
                }else{
                    alert(data.msg||'请求失败');
                }
            },
            error:function () {
                alert('服务器内部错误');
            }
        });
    });
    $('#sendCode').on('click','a',function () {
        $.ajax({
            type:'POST',
            url:initUrl+'sendCode',
            data:{
                userName:codeStr,//	是	string	工号
                mobileNo:phoneNum//	是	string	手机号码
            },
            success:function (data) {
                if(data.status==1){
                    alert('验证码已发送');
                    var timer=setInterval(function () {
                        count--;
                        $('#sendCode>a').html(count+'s');
                        if(count<=0){
                            clearInterval(timer);
                            timer=null;
                            $('#sendCode>a').html('发送验证码');
                        }
                    },1000)
                }else{
                    alert(data.msg||'验证码发送失败');
                }
            },
            error:function () {
                alert('服务器内部错误');
            }
        });
    });
    $('#sureBtn').on('click',function () {
        var thisCode=$('#valiCode').val();
        $.ajax({
            type:'POST',
            url:initUrl+'checkCode',
            data:{
                userName:codeStr,//	是	string	工号
                mobileNo:phoneNum,//	是	string	手机号码
                code:thisCode//	是	string	短信验证码
            },
            success:function (data) {
                if(data.status==1){
                    $('#step2').show();
                    $('#sureBtn').hide();
                    $('#step1 .isTrue').show().css('display','inline-block');
                }else{
                    alert(data.msg||'验证码不正确');
                }
            },
            error:function () {
                alert('服务器内部错误');
            }
        });
    });
    $('#confirmBtn').on('click',function () {
        var newPwd=$('#newPwd').val();
        var repeatPwd=$('#repeatPwd').val();
        if(newPwd!=repeatPwd){
            alert('两次输入密码不一样');
            return;
        }
        $.ajax({
            type:'POST',
            url:initUrl+'modifyPassword',
            data:{
                userName:codeStr,//	是	string	工号
                mobileNo:phoneNum,//	是	string	手机号码
                password:newPwd,//	是	string	新密码(6-20位)
                passwordConfirm:repeatPwd//	是	string	确认新密码
            },
            success:function (data) {
                if(data.status==1){
                    $(location).attr('href','http://sso.ehaofang.com/loginout');
                }else{
                    alert(data.msg||'修改失败');
                }
            },
            error:function () {
                alert('服务器内部错误');
            }
        });
    });
    $('#cancelBtn').on('click',function () {
        window.history.back();
    });
});