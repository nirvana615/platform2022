var userid = null;//授权用户
var usermodelprojects = [];//用户全部模型项目

//模型项目授权
function ModelProjectAuth() {
    if (modelprojectauthlayerindex != null) {
        layer.setTop(modelprojectauthlayerindex);
    }
    else {
        modelprojectauthlayerindex = layer.open({
            type: 1
            , title: ['授权管理', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['700px', '500px']
            , shade: 0
            , offset: 'auto'
            , maxmin: true
            , closeBtn: 1
            , moveOut: true
            , resize: false
            , content: '<!--项目授权--><form class="layui-form" action="" lay-filter="modelprojectauthform" style="margin:5px;"><div class="layui-row layui-col-space10"><div class="layui-col-md9"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:60px;">用&emsp;&emsp;户</label><div class="layui-input-block" style="margin-left:95px;"><select id="allusersid" name="users" lay-filter="selectalluser"><option value="">请选择用户</option></select></div></div></div><div class="layui-col-md3"><div class="grid-demo" style="position:absolute;right:9px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="authusermodelprojectsubmit" style="width:100px;">更新授权</button></div></div></div><div class="grid-demo" style="margin-top:10px;padding-right:5px;"><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">项&emsp;&emsp;目</label><div class="layui-input-block" style="margin-left:95px;height:auto;border:solid;border-color:#e6e6e6;border-width:1px;overflow:auto;max-height:80%;"><div id="modelprojectid" style="padding:0px;overflow:auto;max-height:395px;height:395px;"></div></div></div></div></form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                if (modelprojectlistarea.length > 0) {
                    for (var i in modelprojectlistarea) {
                        for (var j in modelprojectlistarea[i].children) {
                            var modelproject = new Object;
                            modelproject.id = modelprojectlistarea[i].children[j].data.Id;
                            modelproject.title = modelprojectlistarea[i].children[j].data.XMSJ + " " + modelprojectlistarea[i].children[j].data.XMMC;
                            modelproject.checked = false;
                            usermodelprojects.push(modelproject);
                        }
                    }
                }

                //渲染模型项目
                tree.render({
                    elem: '#modelprojectid'
                    , id: 'modelprojecttreeid'
                    , data: usermodelprojects
                    , accordion: true
                    , showCheckbox: true
                    , showLine: false
                    , oncheck: function (obj) {
                        if (obj.checked) {
                            for (var i in usermodelprojects) {
                                if (usermodelprojects[i].id == obj.data.id) {
                                    usermodelprojects[i].checked = true;
                                }
                            }
                        }
                        else {
                            for (var i in usermodelprojects) {
                                if (usermodelprojects[i].id == obj.data.id) {
                                    usermodelprojects[i].checked = false;
                                }
                            }
                        }
                    }
                });

                GetAllUserExceptSelf();

                form.render();
                form.render('select');

                //更新授权
                form.on('submit(authusermodelprojectsubmit)', function (data) {
                    if (usermodelprojects.length < 1) {
                        layer.msg("当前用户无项目，无法进行授权！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    } else {
                        if (userid == null) {
                            layer.msg("请先选择授权用户！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }
                        else {
                            data.field.userid = userid;
                            var allmodelprojectids = "";
                            var modelprojectids = "";

                            for (var i = 0; i < usermodelprojects.length; i++) {
                                allmodelprojectids += usermodelprojects[i].id + ",";

                                if (usermodelprojects[i].checked == true) {
                                    modelprojectids += usermodelprojects[i].id + ",";
                                }
                            }

                            if (allmodelprojectids != "") {
                                if ((allmodelprojectids.indexOf(",") != -1)) {
                                    data.field.allmodelprojectids = allmodelprojectids.substring(0, allmodelprojectids.length - 1);
                                }
                                else {
                                    data.field.allmodelprojectids = allmodelprojectids;
                                }
                            }
                            if (modelprojectids != "") {
                                if ((modelprojectids.indexOf(",") != -1)) {
                                    data.field.modelprojectids = modelprojectids.substring(0, modelprojectids.length - 1);
                                }
                                else {
                                    data.field.modelprojectids = modelprojectids;
                                }
                            }

                            $.ajax({
                                url: servicesurl + "/api/ModelProject/UpdateMapUserModelProject", type: "put", data: data.field,
                                success: function (result) {
                                    layer.msg("授权成功！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                }, datatype: "json"
                            });
                        }
                    }

                    return false;
                });
            }
            , end: function () {
                modelprojectauthlayerindex = null;
            }
        });
    }
};

//获取全部用户信息（除自己）
function GetAllUserExceptSelf() {
    $.ajax({
        url: servicesurl + "/api/User/GetUserExceptSelf", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            if (data == "") {
                layer.msg("无用户信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                userid = null;
            }
            else {
                var userinfodatas = JSON.parse(data);
                for (var i in userinfodatas) {
                    document.getElementById('allusersid').innerHTML += '<option value="' + userinfodatas[i].Id + '">' + userinfodatas[i].AliasName + ' - ' + userinfodatas[i].UserName + '</option>';
                }

                form.render();
                form.render('select');

                //切换用户
                form.on('select(selectalluser)', function (data) {
                    if (data.value == "") {
                        userid = null;
                        for (var i in usermodelprojects) {
                            usermodelprojects[i].checked = false;
                        }

                        tree.reload('modelprojecttreeid', {
                            data: usermodelprojects
                        });
                    }
                    else {
                        userid = data.value;
                        $.ajax({
                            url: servicesurl + "/api/ModelProject/GetMapUserModelProject", type: "get", data: { "id": data.value },
                            success: function (data) {
                                if (data == "") {
                                    for (var i in usermodelprojects) {
                                        usermodelprojects[i].checked = false;
                                    }
                                }
                                else {
                                    var mapusermodelprojectdata = JSON.parse(data);
                                    var usermodelprojectids = [];
                                    for (var i in mapusermodelprojectdata) {
                                        usermodelprojectids.push(mapusermodelprojectdata[i].ModelProjectId);
                                    }

                                    for (var i in usermodelprojects) {
                                        if (usermodelprojectids.indexOf(usermodelprojects[i].id) != -1) {
                                            usermodelprojects[i].checked = true;
                                        }
                                        else {
                                            usermodelprojects[i].checked = false;
                                        }
                                    }
                                }

                                tree.reload('modelprojecttreeid', {
                                    data: usermodelprojects
                                });
                            }, datatype: "json"
                        });
                    }
                });
            }
        }, datatype: "json"
    });
};