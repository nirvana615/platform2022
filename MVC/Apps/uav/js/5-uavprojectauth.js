var useruavprojects = [];//用户全部航线项目
var uavuserid = null;//授权用户

//航线项目授权
function UavProjectAuth() {
    if (uavprojectauthlayerindex != null) {
        layer.setTop(uavprojectauthlayerindex);
    }
    else {
        uavprojectauthlayerindex = layer.open({
            type: 1
            , title: ['授权管理', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['700px', '500px']
            , shade: 0
            , offset: 'auto'
            , maxmin: true
            , closeBtn: 1
            , moveOut: true
            , resize: false
            , content: '<!--项目授权--><form class="layui-form" action="" lay-filter="uavprojectauthform" style="margin:5px;"><div class="layui-row layui-col-space10"><div class="layui-col-md9"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:60px;">用&emsp;&emsp;户</label><div class="layui-input-block" style="margin-left:95px;"><select id="uavusersid" name="uavusers" lay-filter="selectuavuser"><option value="">请选择用户</option></select></div></div></div><div class="layui-col-md3"><div class="grid-demo" style="position:absolute;right:9px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="authuseruavprojectsubmit" style="width:100px;">更新授权</button></div></div></div><div class="grid-demo" style="margin-top:10px;padding-right:5px;"><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">项&emsp;&emsp;目</label><div class="layui-input-block" style="margin-left:95px;height:auto;border:solid;border-color:#e6e6e6;border-width:1px;overflow:auto;max-height:80%;"><div id="uavprojectid" style="padding:0px;overflow:auto;max-height:395px;height:395px;"></div></div></div></div></form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                //渲染模型项目
                tree.render({
                    elem: '#uavprojectid'
                    , id: 'uavprojecttreeid'
                    , data: []
                    , accordion: true
                    , showCheckbox: true
                    , showLine: false
                    , oncheck: function (obj) {
                        if (obj.checked) {
                            for (var i in useruavprojects) {
                                if (useruavprojects[i].id == obj.data.id) {
                                    useruavprojects[i].checked = true;
                                }
                            }
                        }
                        else {
                            for (var i in useruavprojects) {
                                if (useruavprojects[i].id == obj.data.id) {
                                    useruavprojects[i].checked = false;
                                }
                            }
                        }
                    }
                });

                GetUavUserExceptSelf();
                GetUserUavProjects();

                form.render();
                form.render('select');

                //更新授权
                form.on('submit(authuseruavprojectsubmit)', function (data) {
                    if (useruavprojects.length < 1) {
                        layer.msg("当前用户无项目，无法进行授权！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    } else {
                        if (uavuserid == null) {
                            layer.msg("请先选择授权用户！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }
                        else {
                            data.field.userid = uavuserid;
                            var alluavprojectids = "";
                            var uavprojectids = "";

                            for (var i = 0; i < useruavprojects.length; i++) {
                                alluavprojectids += useruavprojects[i].id + ",";

                                if (useruavprojects[i].checked == true) {
                                    uavprojectids += useruavprojects[i].id + ",";
                                }
                            }

                            if (alluavprojectids != "") {
                                if ((alluavprojectids.indexOf(",") != -1)) {
                                    data.field.alluavprojectids = alluavprojectids.substring(0, alluavprojectids.length - 1);
                                }
                                else {
                                    data.field.alluavprojectids = alluavprojectids;
                                }
                            }
                            if (uavprojectids != "") {
                                if ((uavprojectids.indexOf(",") != -1)) {
                                    data.field.uavprojectids = uavprojectids.substring(0, uavprojectids.length - 1);
                                }
                                else {
                                    data.field.uavprojectids = uavprojectids;
                                }
                            }

                            $.ajax({
                                url: servicesurl + "/api/UavProject/UpdateMapUserUavProject", type: "put", data: data.field,
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
                uavprojectauthlayerindex = null;
            }
        });
    }
};

//获取全部航线用户信息（除自己）
function GetUavUserExceptSelf() {
    $.ajax({
        url: servicesurl + "/api/User/GetUavUserExceptSelf", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            if (data == "") {
                layer.msg("无用户信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                uavuserid = null;
            }
            else {
                var userinfodatas = JSON.parse(data);
                for (var i in userinfodatas) {
                    document.getElementById('uavusersid').innerHTML += '<option value="' + userinfodatas[i].Id + '">' + userinfodatas[i].AliasName + ' - ' + userinfodatas[i].UserName + '</option>';
                }

                form.render();
                form.render('select');

                //切换用户
                form.on('select(selectuavuser)', function (data) {
                    if (data.value == "") {
                        uavuserid = null;
                        for (var i in useruavprojects) {
                            useruavprojects[i].checked = false;
                        }

                        tree.reload('uavprojecttreeid', {
                            data: useruavprojects
                        });
                    }
                    else {
                        uavuserid = data.value;
                        $.ajax({
                            url: servicesurl + "/api/UavProject/GetMapUserUavProject", type: "get", data: { "id": data.value },
                            success: function (data) {
                                if (data == "") {
                                    for (var i in useruavprojects) {
                                        useruavprojects[i].checked = false;
                                    }
                                }
                                else {
                                    var mapuseruavprojectdata = JSON.parse(data);
                                    var useruavprojectids = [];
                                    for (var i in mapuseruavprojectdata) {
                                        useruavprojectids.push(mapuseruavprojectdata[i].UavProjectId);
                                    }

                                    for (var i in useruavprojects) {
                                        if (useruavprojectids.indexOf(useruavprojects[i].id) != -1) {
                                            useruavprojects[i].checked = true;
                                        }
                                        else {
                                            useruavprojects[i].checked = false;
                                        }
                                    }
                                }

                                tree.reload('uavprojecttreeid', {
                                    data: useruavprojects
                                });
                            }, datatype: "json"
                        });
                    }
                });
            }
        }, datatype: "json"
    });
};

//获取用户全部航线项目
function GetUserUavProjects() {
    $.ajax({
        url: servicesurl + "/api/UavProject/GetUserUavProjects", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            useruavprojects = [];

            var result = JSON.parse(data);
            if (result.code == 1) {
                var uavprojectdatas = JSON.parse(result.data);
                for (var i in uavprojectdatas) {
                    var uavproject = new Object;
                    uavproject.id = uavprojectdatas[i].Id;
                    uavproject.title = uavprojectdatas[i].CJSJ + " " + uavprojectdatas[i].XMMC;
                    uavproject.checked = false;
                    useruavprojects.push(uavproject);
                }
            }
            else {
                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }

            tree.reload('uavprojecttreeid', {
                data: useruavprojects
            });
        }, datatype: "json"
    });
};