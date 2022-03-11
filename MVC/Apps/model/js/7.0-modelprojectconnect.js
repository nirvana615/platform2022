//模型管理
var modelconnectlayerindex = null;
var modelprojectid = null;
var modelprojects = [];  //所有模型项目树data

function ModelConnect(id, cookie) {
    if (modelconnectlayerindex == null) {
        modelconnectlayerindex = layer.open({
            type: 1
            , title: ['模型项目关联', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['500px', '620px']
            , shade: 0
            , offset: 'auto'
            , maxmin: true
            , closeBtn: 1
            , moveOut: true
            , resize: false
            , content: '<!--模型项目关联--><form class="layui-form" style="margin-top:5px;margin-right:5px;" lay-filter="modelprojectconnectform"><div class="layui-form-item" style="margin-top:10px;margin-right:20px;height:500px;"><label class="layui-form-label" style="font-weight:bold;line-height: 500px;">模型项目</label><div class="layui-input-block" style="border:1px solid #e6e6e6"><div id="modelprojectid" style="height: 500px;overflow: auto;"></div></div></div><div class="layui-form-item" style="margin-top:10px"><div style="position:absolute;right:15px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="modelprojectsubmit" style="width:100px">确认关联</button></div></div></form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                //置顶
                layer.setTop(layero);
                GetUserModelProjectInfo(id, cookie);//获取用户模型系统项目   
                              
                //渲染模型项目树
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
                    }
                });

                form.render();
                form.render('select');

                ///模型关联
                form.on('submit(modelprojectconnectform)', function (data) {
                    data.field.currentprojectid = id;

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
                        url: servicesurl + "/api/ModelProjectConnect/UpdataCurrentProjectModel", type: "put", data: { "currentprojectid": data.field.currentprojectid, "modelprojectids": data.field.modelprojectids, "cookie": cookie },
                        success: function (result) {
                            var info = JSON.parse(result);
                            if (info.code == 1) {
                                //刷新关联
                                GetMapProjectModelProjectInfo();

                                var syscode = JSON.parse(info.data);
                                if (syscode == 5) {
                                    //刷新【影像对比分析系统】项目列表
                                    GetUserAllImageProjects();
                                }                              
                            }
                            layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }, datatype: "json"
                    });





                    return false;
                });
            }
            , end: function () {
                modelconnectlayerindex = null;           s  
            }
            , cancel: function () {
                modelconnectlayerindex = null;
            }
        });
    }
}


//获取用户在模型系统所有项目
function GetUserModelProjectInfo(id,cookie) {
    modelprojects = [];
    $.ajax({
        url: servicesurl + "/api/ModelProjectConnect/GetUserModelProjectInfo", type: "get", data: {"cookie": cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                var modelprojectdatas = JSON.parse(result.data);
                for (var i in modelprojectdatas) {
                    var modelproject = new Object;
                    modelproject.id = modelprojectdatas[i].Id;
                    modelproject.title = modelprojectdatas[i].XMSJ.split("-").join("") + " " + modelprojectdatas[i].XMMC;
                    modelproject.checked = false;
                    modelprojects.push(modelproject);
                }
                tree.reload('modelprojecttreeid', {
                    data: modelprojects
                });
                if (id != null) {
                    GetMapProjectModelProjectInfo(id);//获取当前项目与模型系统项目映射
                }             
            }
            else {
                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }
        }, datatype: "json"
    });
};

//获取当前项目与模型系统项目映射
function GetMapProjectModelProjectInfo(id) {
    $.ajax({
        url: servicesurl + "/api/ModelProjectConnect/GetMapProjectModelProjectInfo", type: "get", data: { "currentprojectid": id, "cookie": document.cookie },
        success: function (data) {
            if (data != "") {
                var result = JSON.parse(data);
                if (result.code == 1) {
                    var mapdata = JSON.parse(result.data);
                    for (var i in mapdata) {
                        for (var j in modelprojects) {
                            if (modelprojects[j].id == mapdata[i]) {
                                modelprojects[j].checked = true;
                            }
                        }
                    }
                    tree.reload('modelprojecttreeid', {
                        data: modelprojects
                    });
                }
            }
        }, datatype: "json"
    });
};
