//项目权限
jQuery.support.cors = true;
var modelprojects = [];
var curuserid = null;
function LoadProjectRight() {
    //编辑目标
    if (modelprojectrightuserlayerindex == null) {
        modelprojectrightuserlayerindex = layer.open({
            type: 1
            , title: ['项目授权', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['700px', '650px']
            , shade: 0
            , offset: 'auto'
            , maxmin: true
            , closeBtn: 1
            , moveOut: true
            , resize: false
            , content: '<!--项目授权--> <form class="layui-form" action="" lay-filter="projectrightuserform" style="margin-top:10px;"> <div class="layui-row"> <div class="layui-col-md10"> <div class="grid-demo grid-demo-bg1"> <label class="layui-form-label" style="font-weight:bold">选择用户</label> <div class="layui-input-block"> <select id="usersid" name="users" lay-filter="selectuser"> <option value="">请选择</option> </select> </div> </div> </div><div class="layui-col-md2"> <div class="grid-demo" style="margin-left:20px;"> <button type="submit" class="layui-btn" lay-submit="" lay-filter="authusersubmit" style="font-weight:bold;">授权</button> </div> </div> </div> <div class="layui-form-item" style="margin-top:10px;margin-right:20px;height:500px;"> <label class="layui-form-label" style="font-weight:bold;line-height: 500px;">模型项目</label> <div class="layui-input-block" style="border:1px solid #e6e6e6"> <div id="modelprojectid" style="height: 500px;overflow: auto;"></div> </div> </div> </form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                //置顶
                layer.setTop(layero);

                //渲染实景模型项目
                tree.render({
                    elem: '#modelprojectid'
                    , id: 'modelprojecttreeid'
                    , data: []
                    , accordion: true
                    , showCheckbox: true
                    , showLine: false
                    , click: function (obj) {
                    }
                    , oncheck: function (obj) {
                        if (obj.checked) {
                            for (var i in modelprojects) {
                                if (modelprojects[i].id == obj.data.id) {
                                    modelprojects[i].checked = true;
                                }
                            }
                        }
                        else {
                            for (var i in modelprojects) {
                                if (modelprojects[i].id == obj.data.id) {
                                    modelprojects[i].checked = false;
                                }
                            }
                        }

                        console.info(modelprojects);
                    }
                });

                GetModelUserInfo();
                GetModelProjectInfo();

                form.render();
                form.render('select');

                //授权
                form.on('submit(projectrightuserform)', function (data) {
                    if (curuserid == null) {
                        layer.msg("请先选择实景模型用户！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }
                    else {
                        data.field.userid = curuserid;
                        var modelprojectids = "";
                        for (var i = 0; i < modelprojects.length; i++) {
                            if (modelprojects[i].checked == true) {
                                modelprojectids += modelprojects[i].id + ",";
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
                            url: window.parent.servicesurl + "/api/ModelProjectRight/UpdateMapUserModelProject", type: "put", data: data.field,
                            success: function (result) {
                                if (result != "") {
                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                }
                            }, datatype: "json"
                        });
                    }

                    return false;
                });


            }
            , end: function () {
                modelprojectrightuserlayerindex = null;
            }
            , cancel: function () {
                modelprojectrightuserlayerindex = null;
            }
        });
    }
};


//获取用户信息
function GetModelUserInfo() {
    $.ajax({
        url: servicesurl + "/api/ModelProjectRight/GetModelUserInfo", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            if (data == "") {
                layer.msg("无实景模型用户信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                curuserid = null;
            }
            else {
                var userinfodatas = JSON.parse(data);
                for (var i in userinfodatas) {
                    document.getElementById('usersid').innerHTML += '<option value="' + userinfodatas[i].Id + '">' + userinfodatas[i].AliasName + '</option>';
                }

                form.render();
                form.render('select');

                //切换用户
                form.on('select(selectuser)', function (data) {
                    if (data.value == "") {
                        curuserid = null;
                        for (var i in modelprojects) {
                            modelprojects[i].checked = false;
                        }

                        tree.reload('modelprojecttreeid', {
                            data: modelprojects
                        });
                    }
                    else {
                        curuserid = data.value;
                        $.ajax({
                            url: servicesurl + "/api/ModelProjectRight/GetMapUserModelProject", type: "get", data: { "id": data.value },
                            success: function (data) {
                                if (data == "") {
                                }
                                else {
                                    var mapusermodelprojectdata = JSON.parse(data);
                                    var usermodelprojectids = [];
                                    for (var i in mapusermodelprojectdata) {
                                        usermodelprojectids.push(mapusermodelprojectdata[i].ModelProjectId);
                                    }

                                    for (var i in modelprojects) {
                                        if (usermodelprojectids.indexOf(modelprojects[i].id) != -1) {
                                            modelprojects[i].checked = true;
                                        }
                                        else {
                                            modelprojects[i].checked = false;
                                        }
                                    }

                                    tree.reload('modelprojecttreeid', {
                                        data: modelprojects
                                    });
                                }
                            }, datatype: "json"
                        });
                    }
                });
            }
        }, datatype: "json"
    });
}

//获取实景模型项目信息
function GetModelProjectInfo() {
    $.ajax({
        url: servicesurl + "/api/ModelProjectRight/GetModelProjectlist", type: "get", data: { "cookie": document.cookie},
        success: function (data) {
            modelprojects = [];
            if (data == "") {
                layer.msg("无实景模型项目信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }
            else {
                var result = JSON.parse(data);
                if (result.code == 1) {
                    var modelprojectdatas = JSON.parse(result.data);
                    for (var i in modelprojectdatas) {
                        var modelproject = new Object;
                        modelproject.id = modelprojectdatas[i].Id;
                        modelproject.title = modelprojectdatas[i].XMSJ.split("-").join("") +" "+ modelprojectdatas[i].XMMC;
                        modelproject.checked = false;
                        modelprojects.push(modelproject);
                    }

                    tree.reload('modelprojecttreeid', {
                        data: modelprojects
                    });
                }
                
            }
        }, datatype: "json"
    });
}
