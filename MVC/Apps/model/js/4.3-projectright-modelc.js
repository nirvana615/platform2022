//项目权限
jQuery.support.cors = true;
var modelprojects = [];//项目授权树data
var dataprojects = [];//数据授权树data
var modeluserid = null;
var datauserid = null;
function LoadProjectRight() {
    //编辑目标
    if (modelprojectrightuserlayerindex == null) {
        modelprojectrightuserlayerindex = layer.open({
            type: 1
            , title: ['授权管理', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['700px', '680px']
            , shade: 0
            , offset: 'auto'
            , maxmin: true
            , closeBtn: 1
            , moveOut: true
            , resize: false
            , content: '<!--项目授权--> <div class="layui-tab layui-tab-brief" lay-filter="demo" style="margin:0px;"> <ul class="layui-tab-title"> <li class="layui-this" style="width:45%;padding-top: 0px;">项目授权</li> <li style="width:45%;padding-top: 0px;">数据授权</li> </ul> <div class="layui-tab-content"> <div class="layui-tab-item layui-show"> <form class="layui-form" action="" lay-filter="projectrightuserform" style="margin-top:10px;"> <div class="layui-row"> <div class="layui-col-md10"> <div class="grid-demo grid-demo-bg1"> <label class="layui-form-label" style="font-weight:bold">选择用户</label> <div class="layui-input-block"> <select id="modelusersid" name="modelusers" lay-filter="modelselectuser"> <option value="">请选择</option> </select> </div> </div> </div><div class="layui-col-md2"> <div class="grid-demo" style="margin-left:5px;"> <button type="submit" class="layui-btn" lay-submit="" lay-filter="modelusersubmit" style="font-weight:bold;">确认授权</button> </div> </div> </div> <div class="layui-form-item" style="margin-top:10px;margin-right:20px;height:500px;"> <label class="layui-form-label" style="font-weight:bold;line-height: 500px;">模型项目</label> <div class="layui-input-block" style="border:1px solid #e6e6e6"> <div id="modelprojectid" style="height: 500px;overflow: auto;"></div> </div> </div> </form> </div><div class="layui-tab-item"> <form class="layui-form" action="" lay-filter="dataprojectrightuserform" style="margin-top:10px;"> <div class="layui-row"> <div class="layui-col-md10"> <div class="grid-demo grid-demo-bg1"> <label class="layui-form-label" style="font-weight:bold">选择用户</label> <div class="layui-input-block"> <select id="datausersid" name="datausers" lay-filter="dataselectuser"> <option value="">请选择</option> </select> </div> </div> </div><div class="layui-col-md2"> <div class="grid-demo" style="margin-left:5px;"> <button type="submit" class="layui-btn" lay-submit="" lay-filter="datausersubmit" style="font-weight:bold;">确认授权</button> </div> </div> </div> <div class="layui-form-item" style="margin-top:10px;margin-right:20px;height:500px;"> <label class="layui-form-label" style="font-weight:bold;line-height: 500px;">模型项目</label> <div class="layui-input-block" style="border:1px solid #e6e6e6"> <div id="dataprojectid" style="height: 500px;overflow: auto;"></div> </div> </div> </form> </div> </div> </div> '
            , zIndex: layer.zIndex
            , success: function (layero) {
                //置顶
                layer.setTop(layero);

                //渲染实景模型项目
                //项目授权树
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
                //数据授权树
                tree.render({
                    elem: '#dataprojectid'
                    , id: 'dataprojecttreeid'
                    , data: []
                    , accordion: true
                    , showCheckbox: true
                    , showLine: false
                    , click: function (obj) {
                    }
                    , oncheck: function (obj) {
                        if (obj.checked) {
                            for (var i in dataprojects) {
                                if (dataprojects[i].id == obj.data.id) {
                                    dataprojects[i].checked = true;
                                }
                            }
                        }
                        else {
                            for (var i in dataprojects) {
                                if (dataprojects[i].id == obj.data.id) {
                                    dataprojects[i].checked = false;
                                }
                            }
                        }

                        console.info(dataprojects);
                    }
                });

                GetModelProjectInfo();
                GetModelUserInfo();//获取模型用户
                GetAllUserInfo();//获取所有用户
                

                form.render();
                form.render('select');

                //项目授权
                form.on('submit(projectrightuserform)', function (data) {
                    if (modeluserid == null) {
                        layer.msg("请先选择实景模型用户！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }
                    else {
                        data.field.userid = modeluserid;
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
                //数据授权
                form.on('submit(dataprojectrightuserform)', function (data) {
                    if (datauserid == null) {
                        layer.msg("请先选择实景模型用户！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }
                    else {
                        data.field.userid = datauserid;
                        var dataprojectids = "";
                        for (var i = 0; i < dataprojects.length; i++) {
                            if (dataprojects[i].checked == true) {
                                dataprojectids += dataprojects[i].id + ",";
                            }
                        }
                        if (dataprojectids != "") {
                            if ((dataprojectids.indexOf(",") != -1)) {
                                data.field.modelprojectids = dataprojectids.substring(0, dataprojectids.length - 1);
                            }
                            else {
                                data.field.modelprojectids = dataprojectids;
                            }
                        }


                        $.ajax({
                            url: window.parent.servicesurl + "/api/ModelProjectRight/UpdateMapDataUserModelProject", type: "put", data: data.field,
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


//获取模型用户信息
function GetModelUserInfo() {
    $.ajax({
        url: servicesurl + "/api/ModelProjectRight/GetModelUserInfo", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            if (data == "") {
                layer.msg("无实景模型用户信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                modeluserid = null;
            }
            else {
                var userinfodatas = JSON.parse(data);
                for (var i in userinfodatas) {
                    document.getElementById('modelusersid').innerHTML += '<option value="' + userinfodatas[i].Id + '">' + userinfodatas[i].AliasName + '</option>';
                }

                form.render();
                form.render('select');

                //切换用户
                form.on('select(modelselectuser)', function (data) {
                    if (data.value == "") {
                        modeluserid = null;
                        for (var i in modelprojects) {
                            modelprojects[i].checked = false;
                        }

                        tree.reload('modelprojecttreeid', {
                            data: modelprojects
                        });
                    }
                    else {
                        modeluserid = data.value;
                        $.ajax({
                            url: servicesurl + "/api/ModelProjectRight/GetMapUserModelProject", type: "get", data: { "id": data.value },
                            success: function (data) {
                                if (data == "") {
                                    for (var j in modelprojects) {
                                        modelprojects[j].checked = false;
                                        
                                    }
                                }
                                else {
                                    var mapusermodelprojectdata = JSON.parse(data);
                                    var usermodelprojectids = [];
                                    for (var i in mapusermodelprojectdata) {
                                        usermodelprojectids.push(mapusermodelprojectdata[i].ModelProjectId);
                                    }

                                    for (var j in modelprojects) {
                                        if (usermodelprojectids.indexOf(modelprojects[j].id) != -1) {
                                            modelprojects[j].checked = true;
                                        }
                                        else {
                                            modelprojects[j].checked = false;
                                        }
                                    }

                                }

                                tree.reload('modelprojecttreeid', {
                                    data: modelprojects
                                });
                            }, datatype: "json"
                        });
                    }
                });
            }
        }, datatype: "json"
    });
}
//获取所有用户信息
function GetAllUserInfo() {
    $.ajax({
        url: servicesurl + "/api/ModelProjectRight/GetAllUserInfo", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            if (data == "") {
                layer.msg("无实景模型用户信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                datauserid = null;
            }
            else {
                var userinfodatas = JSON.parse(data);
                for (var i in userinfodatas) {
                    document.getElementById('datausersid').innerHTML += '<option value="' + userinfodatas[i].Id + '">' + userinfodatas[i].AliasName + '</option>';
                }

                form.render();
                form.render('select');

                //切换用户
                form.on('select(dataselectuser)', function (data) {
                    if (data.value == "") {
                        datauserid = null;
                        for (var i in dataprojects) {
                            dataprojects[i].checked = false;
                        }

                        tree.reload('dataprojecttreeid', {
                            data: dataprojects
                        });
                    }
                    else {
                        datauserid = data.value;
                        $.ajax({
                            url: servicesurl + "/api/ModelProjectRight/GetMapDataUserModelProject", type: "get", data: { "id": data.value },
                            success: function (data) {
                                if (data == "") {
                                    for (var i in dataprojects) {
                                        dataprojects[i].checked = false;
                                    }
                                }
                                else {
                                    var mapusermodelprojectdata = JSON.parse(data);
                                    var usermodelprojectids = [];
                                    for (var i in mapusermodelprojectdata) {
                                        usermodelprojectids.push(mapusermodelprojectdata[i].ModelProjectId);
                                    }

                                    for (var i in dataprojects) {
                                        if (usermodelprojectids.indexOf(dataprojects[i].id) != -1) {
                                            dataprojects[i].checked = true;
                                        }
                                        else {
                                            dataprojects[i].checked = false;
                                        }
                                    }
                                    
                                }
                                tree.reload('dataprojecttreeid', {
                                    data: dataprojects
                                });
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
            dataprojects = [];
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
                    dataprojects = modelprojects;
                    tree.reload('modelprojecttreeid', {
                        data: modelprojects
                    });
                    tree.reload('dataprojecttreeid', {
                        data: dataprojects
                    });
                }
                
            }
        }, datatype: "json"
    });
}
