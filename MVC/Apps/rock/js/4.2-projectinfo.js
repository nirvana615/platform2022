//项目信息
function ProjectInfo(id, style) {
    if (style == "view") {
        //查看项目信息
        if (projectinfoviewlayerindex == null) {
            projectinfoviewlayerindex = layer.open({
                type: 1
                , title: ['项目信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['900px', '750px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , anim: 0
                , maxmin: true
                , moveOut: true
                , content: porjectview
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    form.render();
                    //更新消落带信息
                    form.on('submit(editxiaoluodaisubmit)', function (data) {
                        data.field.id = id;
                        data.field.cookie = document.cookie;
                        //计算项目得分
                        
                        var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                        $.ajax({
                            url: servicesurl + "/api/FLZ/UpdateProject", type: "put", data: data.field,
                            success: function (result) {
                                layer.close(loadinglayerindex);
                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                console.log(result);
                                if (result == "更新成功！") {
                                    //关闭
                                    layer.close(projectinfoeditlayerindex);

                                    //刷新项目列表
                                    GetUserProjects();
                                }
                            }, datatype: "json"
                        });
                        return false;
                    });
                }
                , end: function () {
                    projectinfoviewlayerindex = null;
                }
            });
        }
        //Loading
        var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

        //项目信息
        $.ajax({
            url: servicesurl + "/api/ROCK/GetProjectInfo", type: "get", data: { "id": id, "cookie": document.cookie },
            success: function (data) {
                layer.close(loadinglayerindex);
                if (data == "") {
                    layer.msg("无项目信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    //清除项目信息
                    form.val("projectinfoviewform", {
                        "xmmc": ""
                        , "zxjd": ""
                        , "zxwd": ""
                        , "xzqdm": ""
                        , "xmwz": ""
                        , "xmkssj": ""
                        , "bz": ""
                    });
                }
                else {
                    //项目信息
                    var projectinfo = JSON.parse(data);

                    console.log(projectinfo);
                    form.val("projectinfoviewform", {
                        "xmmc": projectinfo.XMMC
                        , "zxjd": projectinfo.ZXJD
                        , "zxwd": projectinfo.ZXWD
                        , "xzqdm": projectinfo.XZQBM
                        , "xmwz": projectinfo.XMWZ
                        , "xmkssj": projectinfo.XMKSSJ
                        , "bz": projectinfo.BZ
                    });
                   }
            }, datatype: "json"
        });
       
    }
    else if (style == "edit") {
        //编辑项目
        if (projectinfoeditlayerindex == null) {
            projectinfoeditlayerindex = layer.open({
                type: 1
                , title: ['编辑项目', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['800px', '410px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--编辑项目--><form class="layui-form" style="margin-top:5px;margin-right:5px;" lay-filter="editprojectinfoform"><div class="layui-form-item"><label class="layui-form-label">项目名称</label><div class="layui-input-block"><input type="text" name="xmmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><div class="layui-inline"><label class="layui-form-label">中心经度</label><div class="layui-input-inline" style="width:250px;"><input type="text" name="zxjd" lay-verify="required|number" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div></div></div><div class="layui-col-md6"><div class="grid-demo"><div class="layui-inline"><label class="layui-form-label">中心纬度</label><div class="layui-input-inline" style="width:250px;"><input type="text" name="zxwd" lay-verify="required|number" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label">行政区划</label><div class="layui-input-inline" style="width:200px;"><select id="provinceid" name="province" lay-verify="required"><option value="">省/市</option><option value="0">重庆市</option></select></div><div class="layui-input-inline" style="width:200px;"><select id="cityid" name="city" lay-verify="required"><option value="">市辖区/县</option><option value="0">市辖区</option><option value="1">县</option></select></div><div class="layui-input-inline" style="width:200px;"><select id="districtid" name="district" lay-verify="required"><option value="">区/县</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">项目位置</label><div class="layui-input-block"><input type="text" name="xmwz" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><div class="layui-inline"><label class="layui-form-label">开始时间</label><div class="layui-input-inline" style="width:250px;"><input type="text" id="xmkssjid" name="xmkssj" lay-verify="date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" /></div></div></div></div><div class="layui-col-md6"><div class="grid-demo"><div class="layui-inline"><label class="layui-form-label">备注</label><div class="layui-input-inline" style="width:250px;"><input type="text" name="bz"  placeholder="请输入"  autocomplete="off" class="layui-input" /></div></div></div></div></div></div><div class="layui-form-item" style="margin-top:5px"><div style="position:absolute;right:15px;"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="editprojectinfosubmit" style="width:100px">提交</button></div></div></form>'
                 , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    //项目信息
                    var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                    $.ajax({
                        url: servicesurl + "/api/ROCK/GetProjectInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                        success: function (data) {
                            layer.close(loadinglayerindex);
                            if (data == "") {
                                layer.msg("无项目信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                if (xjxzqs.length > 0) {
                                    for (var i in xjxzqs) {
                                        document.getElementById("districtid").innerHTML += '<option value="' + xjxzqs[i].value + '">' + xjxzqs[i].name + '</option>';
                                    }
                                }
                                form.val("editprojectinfoform", {
                                    "xmmc": ""
                                    , "zxjd": ""
                                    , "zxwd": ""
                                    , "district": ""
                                    , "xmwz": ""
                                    , "xmkssj": ""
                                    , "bz": ""
                                });
                                
                               
                              
                                //渲染开始时间
                                date.render({
                                    elem: '#xmkssjid'
                                });
                               
                                form.render();
                                form.render('select');
                            }
                            else {
                                var projectinfo = JSON.parse(data);
                                if (xjxzqs.length > 0) {
                                    for (var i in xjxzqs) {
                                        document.getElementById("districtid").innerHTML += '<option value="' + xjxzqs[i].value + '">' + xjxzqs[i].name + '</option>';
                                    }
                                }
                                console.log(projectinfo);
                                form.val("editprojectinfoform", {
                                    "xmmc": projectinfo.XMMC
                                    , "zxjd": projectinfo.ZXJD
                                    , "zxwd": projectinfo.ZXWD
                                    , "district": projectinfo.XZQBM
                                    , "xmwz": projectinfo.XMWZ
                                    , "xmkssj": projectinfo.XMKSSJ
                                    , "bz": projectinfo.BZ
                                    , "province": 0
                                    , "city": 1
                                });
                               
                                

                                //渲染开始时间
                                date.render({
                                    elem: '#xmkssjid'
                                });
                                
                                form.render();
                                form.render('select');
                            }
                        }, datatype: "json"
                    });

                    //更新项目
                    form.on('submit(editprojectinfosubmit)', function (data) {
                        data.field.id = id;
                        data.field.cookie = document.cookie;

                        var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                        $.ajax({
                            url: servicesurl + "/api/ROCK/UpdateProject", type: "put", data: data.field,
                            success: function (result) {
                                layer.close(loadinglayerindex);
                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                console.log(result);
                                if (result == "更新成功！") {
                                    //关闭
                                    layer.close(projectinfoeditlayerindex);

                                    //刷新项目列表
                                    GetUserProjects();
                                }
                            }, datatype: "json"
                        });
                        return false;
                    });
                }
                , end: function () {
                    projectinfoeditlayerindex = null;
                }
            });
        }
    }
    else if (style == "add") {
        //新建项目
        if (projectinfoaddlayerindex == null) {
            projectinfoaddlayerindex = layer.open({
                type: 1
                , title: ['新建项目', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['800px', '650px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: addNewproject // , content: '/Apps/flz/widget/1.3 projectinfoadd.html'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    
                    if (xjxzqs.length > 0) {
                        for (var i in xjxzqs) {
                            document.getElementById("districtid").innerHTML += '<option value="' + xjxzqs[i].value + '">' + xjxzqs[i].name + '</option>';
                        }
                    }
                   
                    //渲染开始时间&结束时间
                    date.render({
                        elem: '#xmkssjid'
                    });
                    
                    form.render();
                    form.render('select');

                    form.on('submit(addprojectinfosubmit)', function (data) {
                        data.field.cookie = document.cookie;

                        var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                        $.ajax({
                            url: servicesurl + "/api/Rock/AddProject", type: "post", data: data.field,
                            success: function (result) {
                                layer.close(loadinglayerindex);
                                if (isNaN(result)) {
                                    //创建失败
                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                }
                                else {
                                    layer.msg("创建成功。", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                    //关闭
                                    layer.close(projectinfoaddlayerindex);

                                    //刷新项目列表
                                    GetUserProjects();
                                }
                            }, datatype: "json"
                        });

                        return false;
                    });
                }
                , end: function () {
                    projectinfoaddlayerindex = null;
                }
            });
        }

    }
};

//项目操作人员管理
var projectuserlayerindex = null;
var userList = [];//操作员list

function projectUserManga() {
    if (currentprojectid == null) {
        layer.msg('请先选择项目');
        return;
    }
   
    if (projectfzr != ('"' + userInfo.UserName + '"')) {
        layer.msg('操作人员由负责人指定');
        return;
    }
    projectuserlayerindex = layer.open({
        type: 1
        , title: ['操作人员维护', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
        , area: ['400px', '300px']
        , shade: 0
        , offset: ['200px','300px']
        , closeBtn: 1
        , maxmin: true
        , moveOut: true
        , content: projectUserhtml 
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);


            //if (userList.length > 0) {
            //    for (var i in userList) {
            //        if (userInfo.UserName != userList[i].UserName) {
            //            document.getElementById("checkUserId").innerHTML += '<input type="checkbox" name="' + userList[i].UserName + '"title="' + userList[i].AliasName + '">';
            //        }
            //    }
            //}
            var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
            $.ajax({
                url: servicesurl + "/api/ROCK/GetUserProjectList", type: "get", data: { "id": currentprojectid, "cookie": document.cookie },
                success: function (data) {
                    layer.close(loadinglayerindex);
                    if (data == "") {
                        if (userList.length > 0) {
                            for (var i in userList) {
                                if (userInfo.UserName != userList[i].UserName) {
                                    document.getElementById("checkUserId").innerHTML += '<input type="checkbox" name="' + userList[i].UserName + '"title="' + userList[i].AliasName + '">';
                                }
                            }
                        } else {
                            layer.msg("无其他操作用户信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }
                        form.render();
                    }
                    else {
                        var projectinfo = JSON.parse(data);
                        for (var i in userList) {
                            var checkedFlag = false;
                            for (var y in projectinfo) {
                                if (userList[i].UserName == projectinfo[y].userId) {
                                    checkedFlag = true;
                                }
                            }
                            if (userInfo.UserName != userList[i].UserName) {
                                if (checkedFlag) {
                                    document.getElementById("checkUserId").innerHTML += '<input type="checkbox" name="' + userList[i].UserName + '"title="' + userList[i].AliasName + '" checked="">';
                                } else {
                                    document.getElementById("checkUserId").innerHTML += '<input type="checkbox" name="' + userList[i].UserName + '"title="' + userList[i].AliasName + '">';
                                }
                                
                            }
                        }
                        form.render();
                    }
                }, datatype: "json"
            });


            
            //form.render('select');

            form.on('submit(projectCheckedSubmit)', function (data) {
                
               
                if (JSON.stringify(data.field) == "{}") {
                    layer.msg('请选择操作人员');
                    return false;
                }
                if (currentprojectid == null) {
                    layer.msg('请先选择项目');
                    return false;
                }
                var dataas = {};
                dataas.cookie = document.cookie;
               var chenkList = getObjectKeys(data.field);
                var temps = '';
                for (var j in chenkList) {
                    if (j != (chenkList.length - 1)) {
                        temps = temps + chenkList[j] + '∮';
                    } else {
                        temps = temps + chenkList[j];
                    }
                }
                dataas.userIdList = temps;
                dataas.projectId = currentprojectid;
                console.log(dataas);
                var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                $.ajax({
                    url: servicesurl + "/api/Rock/UpdateUserMapProject", type: "post", data: dataas,
                    success: function (result) {
                        layer.close(loadinglayerindex);
                        if (result =="选择成功") {
                            
                            layer.msg("选择成功。", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            layer.close(projectuserlayerindex);
                        }
                        else {
                            //创建失败
                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                            //关闭
                           // layer.close(projectuserlayerindex);

                            //刷新项目列表
                           // GetUserProjects();
                        }
                    }, datatype: "json"
                });

                return false;
            });
        }
        , end: function () {
            projectuserlayerindex = null;
        }
    });
}
function getObjectKeys(object) {
    var keys = [];
    for (var key in object)
        keys.push(key);
    return keys;
}