//提示
$("#userbtn").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('用户信息', '#userbtn', {
            tips: [3, '#78BA32']
        });
    }
});
$("#userbtn").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});

$("#noticebtn").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('消息', '#noticebtn', {
            tips: [3, '#78BA32']
        });
    }
});
$("#noticebtn").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});

$("#setbtn").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('设置', '#setbtn', {
            tips: [3, '#78BA32']
        });
    }
});
$("#setbtn").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});

$("#exitbtn").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('退出', '#exitbtn', {
            tips: [3, '#78BA32']
        });
    }
});
$("#exitbtn").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});



//用户
$("#userbtn").on("click", function () {
    if (headeruserlayerindex == null) {
        headeruserlayerindex = layer.open({
            type: 1
            , title: ['修改密码', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
            , area: ['500px', '300px']
            , shade: [0.5, '#393D49']
            , offset: 'auto'
            , closeBtn: 1
            , maxmin: false
            , move: false
            , moveOut: false
            , resize: false
            , content: '<form class="layui-form" style="margin-top:10px;margin-right:5px;" lay-filter="monitor-header-user-update"><div class="layui-form-item"><label class="layui-form-label" style="width:50px;">用户名</label><div class="layui-input-block" style="margin-left:80px;margin-right:10px;"><input type="text" name="username" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:50px;">旧密码</label><div class="layui-input-block" style="margin-left:80px;margin-right:10px;"><input type="password" name="oldpassword" autocomplete="off" placeholder="请输入旧密码" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:50px;">新密码</label><div class="layui-input-block" style="margin-left:80px;margin-right:10px;"><input type="password" name="newpassword1" autocomplete="off" placeholder="请输入新密码" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:50px;"></label><div class="layui-input-block" style="margin-left:80px;margin-right:10px;"><input type="password" name="newpassword2" autocomplete="off" placeholder="请再次输入新密码" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item" style="margin-top:30px"><div style="position:absolute;right:140px;"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="monitor-header-user-update-submit" style="width:100px">提交</button></div></div></form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                //获取用户信息
                $.ajax({
                    url: servicesurl + "/api/User/GetUser", type: "get", data: { "cookie": document.cookie },
                    success: function (data) {
                        var result = JSON.parse(data);
                        if (result.code == 1) {
                            var user = JSON.parse(result.data);
                            form.val("monitor-header-user-update", {
                                "username": user.UserName
                            });
                        }
                        //layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }, datatype: "json"
                });

                //更新用户信息
                form.on('submit(monitor-header-user-update-submit)', function (data) {
                    data.field.cookie = document.cookie;

                    $.ajax({
                        url: servicesurl + "/api/User/ModiftyUser", type: "put", data: data.field,
                        success: function (data) {
                            var result = JSON.parse(data);
                            if (result.code == 1) {
                                window.location.href = "../Platform/Logout";
                            }
                            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }, datatype: "json"
                    });
                    return false;
                });
            }
            , end: function () {
                headeruserlayerindex = null;
            }
        });
    }
});


//消息
$("#noticebtn").on("click", function () {
    if (headernoticelayerindex == null) {
        headernoticelayerindex = layer.open({
            type: 1
            , title: ['消息', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
            , area: ['500px', '500px']
            , shade: 0
            , offset: 'auto'
            , closeBtn: 1
            , maxmin: true
            , moveOut: true
            , content: '<p>敬请期待……</p>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);





            }
            , end: function () {
                headernoticelayerindex = null;
            }
        });
    }
});

//设置
$("#setbtn").on("click", function () {
    if (headerselayerindex == null) {
        headerselayerindex = layer.open({
            type: 1
            , title: ['设置', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
            , area: ['500px', '500px']
            , shade: 0
            , offset: 'auto'
            , closeBtn: 1
            , maxmin: true
            , moveOut: true
            , content: '<p>敬请期待……</p>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);





            }
            , end: function () {
                headerselayerindex = null;
            }
        });
    }
});