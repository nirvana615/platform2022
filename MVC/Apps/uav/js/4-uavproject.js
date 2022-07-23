//新建项目
function AddUavProject() {
    if (uavprojectaddlayerindex == null) {
        CloseAllLayer();//关闭所有图层

        uavprojectaddlayerindex = layer.open({
            type: 1
            , title: ['新建项目', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
            , area: ['600px', '400px']
            , shade: 0
            , closeBtn: 1
            , maxmin: true
            , moveOut: true
            , content: '<form class="layui-form" style="margin-top:10px" lay-filter="uav-project-add"><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">项目名称</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-project-add-xmmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item layui-form-text"><label class="layui-form-label" style="width:60px;padding-top:105px;">备&emsp;&emsp;注</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><textarea name="uav-project-add-bz" placeholder="请输入" class="layui-textarea" style="height:240px;padding-right:5px;"></textarea></div></div><div class="layui-form-item" style="margin-top:10px"><div class="layui-row"><div class="layui-col-md3 layui-col-md-offset3"><div class="grid-demo grid-demo-bg1"><button type="submit" class="layui-btn" lay-submit="" lay-filter="uav-project-add-submit" style="width:100px">提交</button></div></div><div class="layui-col-md3 layui-col-md-offset1"><div class="grid-demo"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button></div></div></div></div></form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                //创建项目
                form.on('submit(uav-project-add-submit)', function (data) {
                    data.field.cookie = document.cookie;

                    $.ajax({
                        url: servicesurl + "/api/UavProject/AddUavProject", type: "post", data: data.field,
                        success: function (data) {
                            var result = JSON.parse(data);
                            if (result.code == 1) {
                                var uavprojectdata = JSON.parse(result.data);
                                if (uavprojectdata != null && uavprojectdata != undefined) {
                                    current_project_id = uavprojectdata.Id;
                                    current_project_title = uavprojectdata.XMMC;

                                    var newproject = new Object;
                                    newproject.id = uavprojectdata.Id;
                                    newproject.title = uavprojectdata.XMMC;
                                    newproject.type = "uavproject";
                                    newproject.data = uavprojectdata;
                                    newproject.nodeOperate = true;
                                    newproject.spread = false;

                                    var newprojectchild = [];
                                    var createtime = new Object;
                                    createtime.title = "创建时间：" + uavprojectdata.CJSJ;
                                    newprojectchild.push(createtime);

                                    var models = new Object;
                                    //models.id = newproject.id;
                                    models.title = "实景模型";
                                    models.nodeOperate = true;
                                    models.customItem = true;
                                    models.edit = ['view'];
                                    models.spread = true;
                                    newprojectchild.push(models);

                                    var routes = new Object;
                                    //routes.id = newproject.id;
                                    routes.title = "航线任务";
                                    routes.spread = true;
                                    newprojectchild.push(routes);

                                    newproject.children = newprojectchild;

                                    var new_uav_project_list_all = [];
                                    new_uav_project_list_all.push(newproject);
                                    for (var i in uav_project_list_all) {
                                        if (current_project_id == null) {
                                            new_uav_project_list_all.push(uav_project_list_all[i]);
                                        }
                                        else {
                                            for (var j in uav_project_list_all[i].children) {
                                                if (uav_project_list_all[i].children[j].title == "实景模型" || uav_project_list_all[i].children[j].title == "航线任务") {
                                                    if (uav_project_list_all[i].children[j].children != undefined && uav_project_list_all[i].children[j].children.length > 0) {
                                                        for (var k in uav_project_list_all[i].children[j].children) {
                                                            uav_project_list_all[i].children[j].children[k].checked = false;
                                                        }
                                                    }
                                                }
                                            }
                                            new_uav_project_list_all.push(uav_project_list_all[i]);
                                        }
                                    }
                                    uav_project_list_all = new_uav_project_list_all;

                                    //清除模型和航线图形
                                    if (current_project_tile != null) {
                                        viewer.scene.primitives.remove(current_project_tile);//清除当前模型
                                        current_project_tile = null;
                                    }
                                    if (current_entities_route.length > 0) {
                                        RemoveEntitiesInViewer(current_entities_route);
                                        current_entities_route = [];
                                    }

                                    //viewer.entities.removeAll();//删除所有要素
                                }

                                isReloadTree = true;//标记重载
                                MarkCurrentProject();
                                isReloadTree = false;//重载后还原
                                layer.close(uavprojectaddlayerindex);
                            }

                            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }, datatype: "json"
                    });

                    return false;
                });
            }
            , end: function () {
                uavprojectaddlayerindex = null;
            }
        });
    }
};

//查看项目
function ViewUavProject(uavprojectdata) {
    layer.msg("正在建设！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
};

//编辑项目
function EditUavProject(uavprojectdata) {
    if (uavprojecteditlayerindex != null) {
        CloseLayer(uavprojecteditlayerindex);
    }

    uavprojecteditlayerindex = layer.open({
        type: 1
        , title: ['编辑项目', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['700px', '430px']
        , shade: 0
        , closeBtn: 1
        , maxmin: true
        , moveOut: true
        , content: '<!--编辑项目--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:1px 0px"><ul class="layui-tab-title"><li class="layui-this" style="width:44%;">项目信息</li><li style="width:44%;">实景模型</li></ul><div class="layui-tab-content" style="margin:0px;padding-left:0px;"><!--项目信息--><div class="layui-tab-item layui-show"><form class="layui-form" style="margin-top:0px" lay-filter="uav-project-edit"><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">项目名称</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-project-edit-xmmc" autocomplete="off" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">项目编码</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-project-edit-xmbm" autocomplete="off" lay-verify="required" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">创建时间</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-project-edit-cjsj" autocomplete="off" lay-verify="required" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">备&emsp;&emsp;注</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="uav-project-edit-bz" class="layui-textarea" style="height:150px;"></textarea></div></div><div class="layui-form-item" style="margin-top:10px"><div style="right:5px;text-align:center;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="uav-project-edit-submit" style="width:150px">保存</button></div></div></form></div><!--实景模型--><div class="layui-tab-item"><div class="layui-card-body" style="padding:0px 0px;"><table id="uav-project-model" lay-filter="uav-project-model"></table><script type="text/html" id="uav-project-model-add"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm" style="font-size:14px;width:150px" lay-event="uav-project-model-add">添加实景模型</button></div></script><script type="text/html" id="table-toolbar-model"><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="modeldel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div></div></div>'
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);

            //项目信息
            form.val("uav-project-edit", {
                "uav-project-edit-xmmc": uavprojectdata.XMMC
                , "uav-project-edit-xmbm": uavprojectdata.XMBM
                , "uav-project-edit-cjsj": uavprojectdata.CJSJ
                , "uav-project-edit-bz": uavprojectdata.BZ
            });

            //更新项目
            form.on('submit(uav-project-edit-submit)', function (data) {
                data.field.id = uavprojectdata.Id;
                data.field.cookie = document.cookie;

                $.ajax({
                    url: servicesurl + "/api/UavProject/UpdateUavProject", type: "put", data: data.field,
                    success: function (resultdata) {
                        var result = JSON.parse(resultdata);
                        if (result.code == 1) {
                            for (var i in uav_project_list_all) {
                                if (uav_project_list_all[i].id == uavprojectdata.Id) {
                                    uav_project_list_all[i].title = data.field["uav-project-edit-xmmc"];
                                    uav_project_list_all[i].data.XMMC = data.field["uav-project-edit-xmmc"];
                                    uav_project_list_all[i].data.GXSJ = result.data;
                                    uav_project_list_all[i].data.BZ = data.field["uav-project-edit-bz"];
                                    break;
                                }
                            }

                            MarkCurrentProject();
                        } else {
                            //更新失败
                            form.val("uav-project-edit", {
                                "uav-project-edit-xmmc": uavprojectdata.XMMC
                                , "uav-project-edit-bz": uavprojectdata.BZ
                            });
                        }

                        layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }, datatype: "json"
                });
                return false;
            });

            //项目关联模型
            var modeltabledata = [];
            var usedmodelids = [];
            for (var i in uav_project_list_all) {
                if (uav_project_list_all[i].id == uavprojectdata.Id) {
                    for (var j in uav_project_list_all[i].children) {
                        if (uav_project_list_all[i].children[j].title == "实景模型") {
                            if (uav_project_list_all[i].children[j].children != undefined && uav_project_list_all[i].children[j].children.length > 0) {
                                for (var k in uav_project_list_all[i].children[j].children) {
                                    var model = new Object;
                                    model.id = uav_project_list_all[i].children[j].children[k].data.Id;
                                    model.mxmc = uav_project_list_all[i].children[j].children[k].data.RWMC;
                                    model.mxbm = uav_project_list_all[i].children[j].children[k].data.RWBM;
                                    model.mxsj = uav_project_list_all[i].children[j].children[k].data.YXCJSJ;
                                    model.bz = uav_project_list_all[i].children[j].children[k].data.BZ;
                                    modeltabledata.push(model);
                                    usedmodelids.push(uav_project_list_all[i].children[j].children[k].data.Id);//记录已关联模型id
                                }
                            }
                        }
                    }

                    break;
                }
            }

            var modeledittable = table.render({
                elem: '#uav-project-model'
                , id: 'uavprojectmodeltableid'
                , title: '实景模型'
                , skin: 'line'
                , even: false
                , page: { layout: ['prev', 'page', 'next', 'count'] }
                , limit: 5
                , toolbar: '#uav-project-model-add'
                , totalRow: false
                , initSort: { field: 'id', type: 'asc' }
                , cols: [[
                    { field: 'id', title: 'ID', hide: true }
                    , { field: 'mxmc', title: '模型名称', align: "center" }
                    , { field: 'mxbm', title: '模型编码', align: "center" }
                    , { field: 'mxsj', title: '生产时间', align: "center" }
                    , { field: 'bz', title: '备注', align: "center" }
                    , { fixed: 'right', width: 100, align: 'center', toolbar: '#table-toolbar-model' }
                ]]
                , data: modeltabledata
            });

            //添加实景模型
            table.on('toolbar(uav-project-model)', function (obj) {
                switch (obj.event) {
                    case 'uav-project-model-add':
                        var addmodellayerindex = layer.open({
                            type: 1
                            , title: ['添加实景模型', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                            , area: ['450px', '450px']
                            , shade: 0.5
                            , offset: 'auto'
                            , closeBtn: 1
                            , maxmin: false
                            , moveOut: true
                            , content: '<div style="overflow:hidden;"><form class="layui-form" style="margin-top:5px" lay-filter="addmodeluseform"><div class="layui-form-item" style="border-bottom: solid 1px rgb(248,248,248);height:345px;max-height:345px;overflow:auto;"><div id="usemodeltree"></div></div><div class="layui-form-item" style="margin-top:10px"><div class="layui-input-block" style="margin-left:0px;text-align:center;position:relative;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="addmodelusesubmit" style="width:150px">添加</button></div></div></form></div>'
                            , zIndex: layer.zIndex
                            , success: function (layero) {
                                layer.setTop(layero);
                                //加载中
                                loadlayerindex = layer.load(1, { shade: [0.1, '#fff'], zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                var nousemodeltreedata = [];
                                var uavprojectaddmodels = [];//选中模型
                                //渲染模型树
                                tree.render({
                                    elem: '#usemodeltree'
                                    , data: []
                                    , id: 'usemodeltreeid'
                                    , showCheckbox: true
                                    , accordion: false
                                    , showLine: true
                                    , cancelNodeFileIcon: true
                                    , text: { none: '无数据' }
                                    , oncheck: function (obj) {
                                        if (obj.checked) {
                                            //选中
                                            if (obj.data.type == "projectnode") {
                                                //项目节点
                                                for (var i in obj.data.children) {
                                                    var model = new Object;
                                                    model.projectid = obj.data.id;
                                                    model.modelid = obj.data.children[i].id;
                                                    uavprojectaddmodels.push(model);
                                                }
                                            }
                                            else {
                                                //模型节点
                                                var model = new Object;
                                                for (var i in nousemodeltreedata) {
                                                    for (var j in nousemodeltreedata[i].children) {
                                                        if (nousemodeltreedata[i].children[j].id == obj.data.id) {
                                                            model.projectid = nousemodeltreedata[i].id;
                                                            break;
                                                        }
                                                    }
                                                }
                                                model.modelid = obj.data.id;
                                                uavprojectaddmodels.push(model);
                                            }
                                        }
                                        else {
                                            //取消选中
                                            if (obj.data.type == "projectnode") {
                                                //项目节点
                                                var newuavprojectaddmodels = [];

                                                for (var i in uavprojectaddmodels) {
                                                    if (uavprojectaddmodels[i].projectid != obj.data.id) {
                                                        newuavprojectaddmodels.push(uavprojectaddmodels[i]);
                                                    }
                                                }

                                                uavprojectaddmodels = newuavprojectaddmodels;
                                            }
                                            else {
                                                //模型节点
                                                var newuavprojectaddmodels = [];

                                                for (var i in uavprojectaddmodels) {
                                                    if (uavprojectaddmodels[i].modelid != obj.data.id) {
                                                        newuavprojectaddmodels.push(uavprojectaddmodels[i]);
                                                    }
                                                }

                                                uavprojectaddmodels = newuavprojectaddmodels;
                                            }
                                        }
                                    }
                                });

                                $.ajax({
                                    url: servicesurl + "/api/ModelProject/GetUserNoUseModelProjectDatas", type: "get", data: { "cookie": document.cookie, "usedmodelid": JSON.stringify(usedmodelids) },
                                    success: function (data) {
                                        CloseLayer(loadlayerindex);//关闭正在加载
                                        nousemodeltreedata = [];

                                        var result = JSON.parse(data);
                                        if (result.code == 1) {
                                            var resultdata = JSON.parse(result.data);
                                            for (var i in resultdata) {
                                                var project = new Object;
                                                project.id = resultdata[i].Project.Id;
                                                project.title = resultdata[i].Project.XMMC;
                                                project.checked = false;
                                                project.type = "projectnode";

                                                var projectchild = [];
                                                for (var j in resultdata[i].Tasks) {
                                                    var model = new Object;
                                                    model.id = resultdata[i].Tasks[j].Id;
                                                    model.title = resultdata[i].Tasks[j].RWMC;
                                                    model.type = "modelnode";
                                                    model.checked = false;
                                                    model.data = resultdata[i].Tasks[j];
                                                    projectchild.push(model);
                                                }

                                                project.children = projectchild;
                                                nousemodeltreedata.push(project);
                                            }
                                        }

                                        tree.reload('usemodeltreeid', { data: nousemodeltreedata });
                                        layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    }, datatype: "json"
                                });

                                form.render();
                                form.render('select');

                                form.on('submit(addmodelusesubmit)', function (data) {
                                    if (uavprojectaddmodels.length > 0) {
                                        data.field.useprojectid = uavprojectdata.Id;
                                        data.field.cookie = document.cookie;
                                        data.field.syscode = 3;
                                        data.field.modelinfo = JSON.stringify(uavprojectaddmodels);

                                        $.ajax({
                                            url: servicesurl + "/api/ModelProject/AddUserModelProjectUse", type: "post", data: data.field,
                                            success: function (result) {
                                                var info = JSON.parse(result);
                                                if (info.code == 1) {
                                                    var newmodelids = JSON.parse(info.data);//已关联成功模型id
                                                    var newmodels = [];//已关联成功模型

                                                    for (var i in newmodelids) {
                                                        for (var j in nousemodeltreedata) {
                                                            for (var k in nousemodeltreedata[j].children) {
                                                                if (newmodelids[i] == nousemodeltreedata[j].children[k].id) {
                                                                    var model = new Object;
                                                                    model.id = nousemodeltreedata[j].children[k].id;
                                                                    model.mxmc = nousemodeltreedata[j].children[k].data.RWMC;
                                                                    model.mxbm = nousemodeltreedata[j].children[k].data.RWBM;
                                                                    model.mxsj = nousemodeltreedata[j].children[k].data.YXCJSJ;
                                                                    model.bz = nousemodeltreedata[j].children[k].data.BZ;
                                                                    modeltabledata.push(model);
                                                                    usedmodelids.push(nousemodeltreedata[j].children[k].data.Id);
                                                                    newmodels.push(nousemodeltreedata[j].children[k].data);
                                                                }
                                                            }
                                                        }
                                                    }
                                                    modeledittable.reload({ id: 'uavprojectmodeltableid', data: modeltabledata });

                                                    for (var i in uav_project_list_all) {
                                                        if (uav_project_list_all[i].id == uavprojectdata.Id) {
                                                            for (var j in uav_project_list_all[i].children) {
                                                                if (uav_project_list_all[i].children[j].title == "实景模型") {
                                                                    iscontainmodel = true;
                                                                    var child = [];
                                                                    for (var k in newmodels) {
                                                                        var model = new Object;
                                                                        //model.id = "UAVSURMODEL_" + newmodels[k].Id;
                                                                        model.id = newmodels[k].Id;
                                                                        model.icon = MODELICON;
                                                                        model.type = "uavsurmodel";
                                                                        model.title = newmodels[k].RWMC;
                                                                        model.data = newmodels[k];
                                                                        model.showCheckbox = true;
                                                                        model.checked = false;
                                                                        child.push(model);
                                                                    }
                                                                    for (var k in uav_project_list_all[i].children[j].children) {
                                                                        child.push(uav_project_list_all[i].children[j].children[k]);
                                                                    }
                                                                    uav_project_list_all[i].children[j].children = child;
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    isReloadTree = true;//标记重载
                                                    MarkCurrentProject();
                                                    isReloadTree = false;//重载后还原
                                                }

                                                layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                            }, datatype: "json"
                                        });

                                        layer.close(addmodellayerindex);
                                    } else {
                                        layer.msg("请先勾选需要的实景模型！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    }

                                    return false;
                                });
                            }
                            , end: function () { }
                        });
                        break;
                };
            });

            //操作实景模型
            table.on('tool(uav-project-model)', function (obj) {
                if (obj.event === 'modeldel') {
                    layer.confirm('是否删除?', { icon: 3, title: '消息', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                        $.ajax({
                            url: servicesurl + "/api/ModelProject/CancelUserModelProjectUse", type: "delete", data: { "syscode": 3, "useprojectid": uavprojectdata.Id, "modelid": obj.data.id, "cookie": document.cookie },
                            success: function (result) {
                                var info = JSON.parse(result);
                                if (info.code == 1) {
                                    var newmodeltabledata = [];
                                    usedmodelids = [];
                                    for (var i in modeltabledata) {
                                        if (modeltabledata[i].id.toString() != info.data) {
                                            newmodeltabledata.push(modeltabledata[i]);
                                            usedmodelids.push(modeltabledata[i].id);
                                        }
                                    }
                                    modeltabledata = newmodeltabledata;
                                    modeledittable.reload({ id: 'uavprojectmodeltableid', data: modeltabledata });

                                    //TODO删除的为选中加载的模型时需从地图的删除

                                    for (var i in uav_project_list_all) {
                                        if (uav_project_list_all[i].id == uavprojectdata.Id) {
                                            for (var j in uav_project_list_all[i].children) {
                                                if (uav_project_list_all[i].children[j].title == "实景模型") {
                                                    var child = [];

                                                    for (var k in uav_project_list_all[i].children[j].children) {
                                                        //if (uav_project_list_all[i].children[j].children[k].id.toString() != ("UAVSURMODEL_" + info.data)) {
                                                        //    child.push(uav_project_list_all[i].children[j].children[k]);
                                                        //}
                                                        if (uav_project_list_all[i].children[j].children[k].id.toString() != info.data) {
                                                            child.push(uav_project_list_all[i].children[j].children[k]);
                                                        }
                                                    }
                                                    uav_project_list_all[i].children[j].children = child;
                                                    break;
                                                }
                                            }
                                        }
                                    }

                                    MarkCurrentProject();
                                }

                                layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            }, datatype: "json"
                        });

                        layer.close(index);
                    });
                }
            });
        }
        , end: function () {
            uavprojecteditlayerindex = null;
        }
    });
};

//删除项目
function DeleteUavProject(uavprojectid) {
    $.ajax({
        url: servicesurl + "/api/UavProject/DeleteUavProject", type: "delete", data: { "id": uavprojectid, "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                if (uavprojectid == current_project_id) {
                    current_project_id = null;
                    current_project_title = null;

                    //清除模型和航线图形
                    if (current_project_tile != null) {
                        viewer.scene.primitives.remove(current_project_tile);//清除当前模型
                        current_project_tile = null;
                    }
                    if (current_entities_route.length > 0) {
                        RemoveEntitiesInViewer(current_entities_route);
                        current_entities_route = [];
                    }
                }

                var new_uav_project_list_all = [];
                for (var i in uav_project_list_all) {
                    if (uav_project_list_all[i].id != uavprojectid) {
                        new_uav_project_list_all.push(uav_project_list_all[i]);
                    }
                }

                uav_project_list_all = new_uav_project_list_all;
            }

            isReloadTree = true;//标记重载
            MarkCurrentProject();
            isReloadTree = false;//重载后还原
            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }, datatype: "json"
    });
};

//关联模型
function LinkModel(uavprojectid) {
    var addmodellayerindex = layer.open({
        type: 1
        , title: ['添加实景模型', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
        , area: ['450px', '450px']
        , shade: 0.5
        , offset: 'auto'
        , closeBtn: 1
        , maxmin: false
        , moveOut: true
        , content: '<div style="overflow:hidden;"><form class="layui-form" style="margin-top:5px" lay-filter="addmodeluseform"><div class="layui-form-item" style="border-bottom: solid 1px rgb(248,248,248);height:345px;max-height:345px;overflow:auto;"><div id="usemodeltree"></div></div><div class="layui-form-item" style="margin-top:10px"><div class="layui-input-block" style="margin-left:0px;text-align:center;position:relative;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="addmodelusesubmit" style="width:150px">添加</button></div></div></form></div>'
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);
            //加载中
            loadlayerindex = layer.load(1, { shade: [0.1, '#fff'], zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

            var usedmodelids = [];
            for (var i in uav_project_list_all) {
                if (uav_project_list_all[i].id == uavprojectid) {
                    for (var j in uav_project_list_all[i].children) {
                        if (uav_project_list_all[i].children[j].title == "实景模型") {
                            if (uav_project_list_all[i].children[j].children != undefined && uav_project_list_all[i].children[j].children.length > 0) {
                                for (var k in uav_project_list_all[i].children[j].children) {
                                    usedmodelids.push(uav_project_list_all[i].children[j].children[k].data.Id);//记录已关联模型id
                                }
                            }
                        }
                    }
                    break;
                }
            }

            var nousemodeltreedata = [];
            var uavprojectaddmodels = [];//选中模型

            //渲染模型树
            tree.render({
                elem: '#usemodeltree'
                , data: []
                , id: 'usemodeltreeid'
                , showCheckbox: true
                , accordion: false
                , showLine: true
                , cancelNodeFileIcon: true
                , text: { none: '无数据' }
                , oncheck: function (obj) {
                    if (obj.checked) {
                        //选中
                        if (obj.data.type == "projectnode") {
                            //项目节点
                            for (var i in obj.data.children) {
                                var model = new Object;
                                model.projectid = obj.data.id;
                                model.modelid = obj.data.children[i].id;
                                uavprojectaddmodels.push(model);
                            }
                        }
                        else {
                            //模型节点
                            var model = new Object;
                            for (var i in nousemodeltreedata) {
                                for (var j in nousemodeltreedata[i].children) {
                                    if (nousemodeltreedata[i].children[j].id == obj.data.id) {
                                        model.projectid = nousemodeltreedata[i].id;
                                        break;
                                    }
                                }
                            }
                            model.modelid = obj.data.id;
                            uavprojectaddmodels.push(model);
                        }
                    }
                    else {
                        //取消选中
                        if (obj.data.type == "projectnode") {
                            //项目节点
                            var newuavprojectaddmodels = [];

                            for (var i in uavprojectaddmodels) {
                                if (uavprojectaddmodels[i].projectid != obj.data.id) {
                                    newuavprojectaddmodels.push(uavprojectaddmodels[i]);
                                }
                            }

                            uavprojectaddmodels = newuavprojectaddmodels;
                        }
                        else {
                            //模型节点
                            var newuavprojectaddmodels = [];

                            for (var i in uavprojectaddmodels) {
                                if (uavprojectaddmodels[i].modelid != obj.data.id) {
                                    newuavprojectaddmodels.push(uavprojectaddmodels[i]);
                                }
                            }

                            uavprojectaddmodels = newuavprojectaddmodels;
                        }
                    }
                }
            });

            $.ajax({
                url: servicesurl + "/api/ModelProject/GetUserNoUseModelProjectDatas", type: "get", data: { "cookie": document.cookie, "usedmodelid": JSON.stringify(usedmodelids) },
                success: function (data) {
                    CloseLayer(loadlayerindex);//关闭正在加载
                    nousemodeltreedata = [];

                    var result = JSON.parse(data);
                    if (result.code == 1) {
                        var resultdata = JSON.parse(result.data);
                        for (var i in resultdata) {
                            var project = new Object;
                            project.id = resultdata[i].Project.Id;
                            project.title = resultdata[i].Project.XMMC;
                            project.checked = false;
                            project.type = "projectnode";

                            var projectchild = [];
                            for (var j in resultdata[i].Tasks) {
                                var model = new Object;
                                model.id = resultdata[i].Tasks[j].Id;
                                model.title = resultdata[i].Tasks[j].RWMC;
                                model.type = "modelnode";
                                model.checked = false;
                                model.data = resultdata[i].Tasks[j];
                                projectchild.push(model);
                            }

                            project.children = projectchild;
                            nousemodeltreedata.push(project);
                        }
                    }
                    else {
                        layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }

                    tree.reload('usemodeltreeid', { data: nousemodeltreedata });
                }, datatype: "json"
            });

            form.render();
            form.render('select');

            form.on('submit(addmodelusesubmit)', function (data) {
                if (uavprojectaddmodels.length > 0) {
                    data.field.useprojectid = uavprojectid;
                    data.field.cookie = document.cookie;
                    data.field.syscode = 3;
                    data.field.modelinfo = JSON.stringify(uavprojectaddmodels);

                    $.ajax({
                        url: servicesurl + "/api/ModelProject/AddUserModelProjectUse", type: "post", data: data.field,
                        success: function (result) {
                            var info = JSON.parse(result);
                            if (info.code == 1) {
                                var newmodelids = JSON.parse(info.data);//已关联成功模型id
                                var newmodels = [];//已关联成功模型

                                for (var i in newmodelids) {
                                    for (var j in nousemodeltreedata) {
                                        for (var k in nousemodeltreedata[j].children) {
                                            if (newmodelids[i] == nousemodeltreedata[j].children[k].id) {

                                                //usedmodelids.push(nousemodeltreedata[j].children[k].data.Id);
                                                newmodels.push(nousemodeltreedata[j].children[k].data);
                                            }
                                        }
                                    }
                                }

                                for (var i in uav_project_list_all) {
                                    if (uav_project_list_all[i].id == uavprojectid) {
                                        for (var j in uav_project_list_all[i].children) {
                                            if (uav_project_list_all[i].children[j].title == "实景模型") {
                                                iscontainmodel = true;
                                                var child = [];
                                                for (var k in newmodels) {
                                                    var model = new Object;
                                                    //model.id = "UAVSURMODEL_" + newmodels[k].Id;
                                                    model.id = newmodels[k].Id;
                                                    model.icon = MODELICON;
                                                    model.type = "uavsurmodel";
                                                    model.title = newmodels[k].RWMC;
                                                    model.data = newmodels[k];
                                                    model.nodeOperate = true;
                                                    model.customItem = true;
                                                    model.edit = ['add', 'del'];
                                                    model.showCheckbox = true;
                                                    model.checked = false;
                                                    child.push(model);
                                                }
                                                for (var k in uav_project_list_all[i].children[j].children) {
                                                    child.push(uav_project_list_all[i].children[j].children[k]);
                                                }
                                                uav_project_list_all[i].children[j].children = child;
                                                break;
                                            }
                                        }
                                    }
                                }
                                isReloadTree = true;//标记重载
                                MarkCurrentProject();
                                isReloadTree = false;//重载后还原
                            }
                            else {
                                layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            }
                        }, datatype: "json"
                    });

                    layer.close(addmodellayerindex);
                } else {
                    layer.msg("请先勾选需要的实景模型！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                }

                return false;
            });
        }
        , end: function () { }
    });
};

//查看模型
function ViewModel(modeldata) {



};

//取消模型
function CancelModel(uavprojectid, modelid) {
    $.ajax({
        url: servicesurl + "/api/ModelProject/CancelUserModelProjectUse", type: "delete", data: { "syscode": 3, "useprojectid": uavprojectid, "modelid": modelid, "cookie": document.cookie },
        success: function (result) {
            var info = JSON.parse(result);
            if (info.code == 1) {
                //若删除的模型已在地图中加载，则清空加载模型
                if (current_project_tile != null) {
                    if (current_project_tile.data.Id.toString() == info.data) {
                        viewer.scene.primitives.remove(current_project_tile);//清除当前模型
                        current_project_tile = null;
                        current_model_id = null;
                    }
                }

                for (var i in uav_project_list_all) {
                    if (uav_project_list_all[i].id == uavprojectid) {
                        for (var j in uav_project_list_all[i].children) {
                            if (uav_project_list_all[i].children[j].title == "实景模型") {
                                var child = [];

                                for (var k in uav_project_list_all[i].children[j].children) {
                                    //if (uav_project_list_all[i].children[j].children[k].id.toString() != ("UAVSURMODEL_" + info.data)) {
                                    //    child.push(uav_project_list_all[i].children[j].children[k]);
                                    //}
                                    if (uav_project_list_all[i].children[j].children[k].id.toString() != info.data) {
                                        child.push(uav_project_list_all[i].children[j].children[k]);
                                    }
                                }
                                uav_project_list_all[i].children[j].children = child;
                                break;
                            }
                        }
                        break;
                    }
                }

                isReloadTree = true;//标记重载
                MarkCurrentProject();
                isReloadTree = false;//重载后还原
            }
            else {
                layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }

        }, datatype: "json"
    });
};