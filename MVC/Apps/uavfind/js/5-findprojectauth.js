//巡查项目授权
function FindlProjectAuth() {
    if (findprojectauthlayerindex != null) {
        layer.setTop(findprojectauthlayerindex);
    }
    else {
        var userfindprojects = [];//用户全部巡查项目
        var authfinduserid = null;//授权用户

        findprojectauthlayerindex = layer.open({
            type: 1
            , title: ['授权管理', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['700px', '500px']
            , shade: 0
            , offset: 'auto'
            , maxmin: true
            , closeBtn: 1
            , moveOut: true
            , resize: false
            , content: '<!--项目授权--><form class="layui-form" action="" lay-filter="findprojectauthform" style="margin:5px;"><div class="layui-row layui-col-space10"><div class="layui-col-md9"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:60px;">用&emsp;&emsp;户</label><div class="layui-input-block" style="margin-left:95px;"><select id="findusersid" name="findusers" lay-filter="selectfinduser"><option value="">请选择用户</option></select></div></div></div><div class="layui-col-md3"><div class="grid-demo" style="position:absolute;right:9px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="authuserfindprojectsubmit" style="width:100px;">更新授权</button></div></div></div><div class="grid-demo" style="margin-top:10px;padding-right:5px;"><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">项&emsp;&emsp;目</label><div class="layui-input-block" style="margin-left:95px;height:auto;border:solid;border-color:#e6e6e6;border-width:1px;overflow:auto;max-height:80%;"><div id="findprojectid" style="padding:0px;overflow:auto;max-height:395px;height:395px;"></div></div></div></div></form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                //渲染巡查项目树
                tree.render({
                    elem: '#findprojectid'
                    , id: 'findprojecttreeid'
                    , data: []
                    , accordion: true
                    , showCheckbox: true
                    , showLine: false
                    , oncheck: function (obj) {
                        if (obj.checked) {
                            for (var i in userfindprojects) {
                                if (userfindprojects[i].id == obj.data.id) {
                                    userfindprojects[i].checked = true;
                                }
                            }
                        }
                        else {
                            for (var i in userfindprojects) {
                                if (userfindprojects[i].id == obj.data.id) {
                                    userfindprojects[i].checked = false;
                                }
                            }
                        }
                    }
                });

                GetFindUserExceptSelf();

                if (findprojectlist.length > 0) {
                    for (var i in findprojectlist) {
                        var findproject = new Object;
                        findproject.id = findprojectlist[i].data.Id;
                        findproject.title = findprojectlist[i].data.XMMC;
                        findproject.checked = false;
                        userfindprojects.push(findproject);
                    }

                    tree.reload('findprojecttreeid', {
                        data: userfindprojects
                    });
                }

                form.render();
                form.render('select');

                //更新授权
                form.on('submit(authuserfindprojectsubmit)', function (data) {
                    if (userfindprojects.length < 1) {
                        layer.msg("当前用户无巡查项目，无法进行授权！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }
                    else {
                        if (authfinduserid == null) {
                            layer.msg("请先选择授权用户！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }
                        else {
                            data.field.userid = authfinduserid;
                            var allfindprojectids = "";
                            var findprojectids = "";

                            for (var i = 0; i < userfindprojects.length; i++) {
                                allfindprojectids += userfindprojects[i].id + ",";

                                if (userfindprojects[i].checked == true) {
                                    findprojectids += userfindprojects[i].id + ",";
                                }
                            }
                            if (allfindprojectids != "") {
                                if ((allfindprojectids.indexOf(",") != -1)) {
                                    data.field.allfindprojectids = allfindprojectids.substring(0, allfindprojectids.length - 1);
                                }
                                else {
                                    data.field.allfindprojectids = allfindprojectids;
                                }
                            }
                            if (findprojectids != "") {
                                if ((findprojectids.indexOf(",") != -1)) {
                                    data.field.findprojectids = findprojectids.substring(0, findprojectids.length - 1);
                                }
                                else {
                                    data.field.findprojectids = findprojectids;
                                }
                            }
                            $.ajax({
                                url: servicesurl + "/api/FindProject/UpdateMapUserFindProject", type: "put", data: data.field,
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
                findprojectauthlayerindex = null;
            }
        });

        //获取全部巡查用户信息（除自己）
        function GetFindUserExceptSelf() {
            $.ajax({
                url: servicesurl + "/api/User/GetFindUserExceptSelf", type: "get", data: { "cookie": document.cookie },
                success: function (data) {
                    if (data == "") {
                        layer.msg("无巡查用户信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        authuavuserid = null;
                    }
                    else {
                        var userinfodatas = JSON.parse(data);
                        for (var i in userinfodatas) {
                            document.getElementById('findusersid').innerHTML += '<option value="' + userinfodatas[i].Id + '">' + userinfodatas[i].AliasName + ' - ' + userinfodatas[i].UserName + '</option>';
                        }

                        form.render();
                        form.render('select');

                        //切换用户
                        form.on('select(selectfinduser)', function (data) {
                            if (data.value == "") {
                                authfinduserid = null;
                                for (var i in userfindprojects) {
                                    userfindprojects[i].checked = false;
                                }

                                tree.reload('findprojecttreeid', {
                                    data: userfindprojects
                                });
                            }
                            else {
                                authfinduserid = data.value;
                                $.ajax({
                                    url: servicesurl + "/api/FindProject/GetMapUserFindProject", type: "get", data: { "id": data.value },
                                    success: function (data) {
                                        if (data == "") {
                                            for (var i in userfindprojects) {
                                                userfindprojects[i].checked = false;
                                            }
                                        }
                                        else {
                                            var mapuserfindprojectdata = JSON.parse(data);
                                            var userfindprojectids = [];
                                            for (var i in mapuserfindprojectdata) {
                                                userfindprojectids.push(mapuserfindprojectdata[i].FindProjectId);
                                            }

                                            for (var i in userfindprojects) {
                                                if (userfindprojectids.indexOf(userfindprojects[i].id) != -1) {
                                                    userfindprojects[i].checked = true;
                                                }
                                                else {
                                                    userfindprojects[i].checked = false;
                                                }
                                            }
                                        }

                                        tree.reload('findprojecttreeid', {
                                            data: userfindprojects
                                        });
                                    }, datatype: "json"
                                });
                            }
                        });
                    }
                }, datatype: "json"
            });
        };

    }
};