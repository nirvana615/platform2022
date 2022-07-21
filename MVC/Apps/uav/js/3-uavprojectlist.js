//加载中
loadlayerindex = layer.load(1, { offset: 'auto', area: ['37px', '37px'], zIndex: layer.zIndex, shade: [0.5, '#393D49'], success: function (layero) { layer.setTop(layero); } });

//项目列表
layer.open({
    type: 1
    , title: ['项目列表', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
    , area: ['400px', '60%']
    , shade: 0
    , offset: ['68px', '5px']
    , closeBtn: 0
    , maxmin: true
    , moveOut: true
    , resize: false
    , content: '<div id="uav-project-list-tree" style="padding:0px"></div>'
    , zIndex: layer.zIndex
    , success: function (layero) {
        layer.setTop(layero);

        //渲染航线任务项目列表树
        tree.render({
            elem: '#uav-project-list-tree'
            , data: []
            , id: 'uav-project-list-treeid'
            , showCheckbox: true
            , edit: ['add', 'update', 'del']
            , customCheckbox: true
            , customOperate: true
            , customSpread: true
            , accordion: false
            , showLine: true
            , cancelNodeFileIcon: true
            , text: { none: '空' }
            , click: function (obj) {
                UavProjectNodeClick(obj);//节点点击
            }
            , operate: function (obj) {
                UavProjectNodeOperate(obj);//节点操作
            }
            , oncheck: function (obj) {
                UavProjectNodeCheck(obj);//节点选中or取消选中
            }
        });

        document.getElementById('uav-project-list-tree').parentNode.style.maxHeight = (parseInt(document.getElementById('uav-project-list-tree').parentNode.style.height.replace("px", "")) - 30).toString() + "px";

        //获取用户全部航线任务项目
        GetUserUavProjects();//快速显示
        GetUserUavProjectInfos();//加载全部信息
    }
});

//获取用户全部航线任务项目
function GetUserUavProjects() {
    $.ajax({
        url: servicesurl + "/api/UavProject/GetUserUavProjects", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            CloseLayer(loadlayerindex);//关闭正在加载

            uav_project_list_all = [];//初始化

            var result = JSON.parse(data);
            if (result.code == 1) {
                var uav_projects = JSON.parse(result.data);
                for (var i in uav_projects) {
                    var project = new Object;
                    project.id = uav_projects[i].Id;
                    project.title = uav_projects[i].XMMC;
                    project.type = "uavproject";
                    project.data = uav_projects[i];
                    project.nodeOperate = true;
                    project.spread = false;

                    var child = [];
                    if (uav_projects[i] != null && uav_projects[i] != undefined) {
                        var createtime = new Object;
                        createtime.title = "创建时间：" + uav_projects[i].CJSJ;
                        child.push(createtime);

                        var models = new Object;
                        models.id = project.id;
                        models.title = "实景模型";
                        models.spread = true;
                        child.push(models);

                        var routes = new Object;
                        routes.id = project.id;
                        routes.title = "航线任务";
                        routes.spread = true;
                        child.push(routes);
                        project.children = child;
                    }
                    uav_project_list_all.push(project);
                }
                MarkCurrentProject();
            }
        }, datatype: "json"
    });
};
//获取用户全部航线任务项目（包括模型、路径）
function GetUserUavProjectInfos() {
    $.ajax({
        url: servicesurl + "/api/UavProject/GetUserUavProjectInfos", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            uav_project_list_all = [];//初始化

            var result = JSON.parse(data);
            if (result.code == 1) {
                var uav_project_infos = JSON.parse(result.data);
                for (var i in uav_project_infos) {
                    var project = new Object;
                    project.id = uav_project_infos[i].Project.Id;
                    project.title = uav_project_infos[i].Project.XMMC;
                    project.type = "uavproject";
                    project.data = uav_project_infos[i].Project;
                    project.nodeOperate = true;
                    project.spread = false;

                    var projectchild = [];

                    if (uav_project_infos[i].Project != null && uav_project_infos[i].Project != undefined) {
                        var createtime = new Object;
                        createtime.title = "创建时间：" + uav_project_infos[i].Project.CJSJ;
                        projectchild.push(createtime);
                    }

                    var models = new Object;
                    models.id = project.id;
                    models.title = "实景模型";
                    models.nodeOperate = true;
                    models.customItem = true;
                    models.edit = ['view'];
                    models.spread = true;
                    if (uav_project_infos[i].Models != null && uav_project_infos[i].Models != undefined) {
                        var modelchild = [];
                        for (var j in uav_project_infos[i].Models) {
                            var model = new Object;
                            model.id = "UAVSURMODEL_" + uav_project_infos[i].Models[j].Id;
                            model.icon = MODELICON;
                            model.type = "uavsurmodel";
                            model.title = uav_project_infos[i].Models[j].RWMC;
                            model.data = uav_project_infos[i].Models[j];
                            model.nodeOperate = true;
                            model.customItem = true;
                            model.edit = ['add', 'del'];
                            model.showCheckbox = true;
                            model.checked = false;
                            modelchild.push(model);
                        }
                        models.children = modelchild;
                    }
                    projectchild.push(models);

                    var routes = new Object;
                    routes.id = project.id;
                    routes.title = "航线任务";
                    routes.spread = true;
                    if (uav_project_infos[i].Routes != null && uav_project_infos[i].Routes != undefined) {
                        var routechild = [];
                        for (var j in uav_project_infos[i].Routes) {
                            var route = new Object;
                            route.id = uav_project_infos[i].Routes[j].Id;
                            route.icon = WAYLINECON;
                            route.type = "uavroute";
                            route.title = uav_project_infos[i].Routes[j].HXMC;
                            route.class = uav_project_infos[i].Routes[j].HXLX;
                            route.line = uav_project_infos[i].Routes[j].LINE;
                            route.data = uav_project_infos[i].Routes[j];
                            route.nodeOperate = true;
                            route.showCheckbox = true;
                            route.checked = false;
                            routechild.push(route);
                        }
                        routes.children = routechild;
                    }
                    projectchild.push(routes);

                    project.children = projectchild;
                    uav_project_list_all.push(project);
                }
            }
            else {
                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }

            MarkCurrentProject();
        }, datatype: "json"
    });
};


//节点点击
function UavProjectNodeClick(obj) {
    if (obj.data.type == "uavproject") {
        if (current_project_id == null) {
            current_project_id = obj.data.id;//赋值当前项目id
            current_project_title = obj.data.title;//赋值当前项目标题

            MarkCurrentProject();
        }
        else {
            if (obj.data.id != current_project_id) {
                //切换当前项目
                layer.confirm('<p style="font-size:16px">是否切换当前项目？</p><br/>', {
                    icon: 3,
                    title: ['系统提示', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei'],
                    shade: 0.5,
                    zIndex: layer.zIndex,
                    cancel: function () { },
                    success: function (layero) { layer.setTop(layero); },
                    btnAlign: 'c',
                    btn: ['是', '否']
                }, function (index, layero) {
                    //是
                    current_project_id = obj.data.id;//赋值当前项目id
                    current_project_title = obj.data.title;//赋值当前项目标题

                    //关闭所有图层
                    CloseAllLayer();

                    //清除模型
                    if (current_project_tile != null) {
                        viewer.scene.primitives.remove(current_project_tile);//清除模型
                        current_project_tile = null;
                        current_model_id = null;
                    }

                    //清除路径
                    if (current_entities_route.length > 0) {
                        RemoveEntitiesInViewer(current_entities_route);
                        current_entities_route = [];
                    }

                    //取消所有选中
                    for (var i in uav_project_list_all) {
                        for (var j in uav_project_list_all[i].children) {
                            if (uav_project_list_all[i].children[j].title == "实景模型" || uav_project_list_all[i].children[j].title == "航线任务") {
                                if (uav_project_list_all[i].children[j].children != undefined && uav_project_list_all[i].children[j].children.length > 0) {
                                    for (var k in uav_project_list_all[i].children[j].children) {
                                        uav_project_list_all[i].children[j].children[k].checked = false;
                                    }
                                }
                            }
                        }
                    }

                    isReloadTree = true;//标记重载
                    MarkCurrentProject();
                    isReloadTree = false;//重载后还原

                    if (measurewidget_layerindex != null) {
                        layui.element.tabChange('measureway', 'terrainMeasure'); //地形测量
                    }

                    layer.close(index);
                }, function (index) {
                    //否
                });
            }
        }
    }
    else if (obj.data.type == "uavsurmodel") {
        if (current_project_tile != null) {
            if (obj.data.id == ("UAVSURMODEL_" + current_project_tile.data.Id)) {
                if (current_project_tile.data.MXSJ != undefined && current_project_tile.data.MXSJ != "") {
                    viewer.scene.camera.setView(JSON.parse(current_project_tile.data.MXSJ));
                }
                else {
                    viewer.zoomTo(current_project_tile);
                }
            }
        }
    }
    else if (obj.data.type == "uavroute") {
        for (var i in uav_project_list_all) {
            if (current_project_id == uav_project_list_all[i].id) {
                for (var j in uav_project_list_all[i].children) {
                    if (uav_project_list_all[i].children[j].title == "航线任务") {
                        for (var k in uav_project_list_all[i].children[j].children) {
                            if (obj.data.id == uav_project_list_all[i].children[j].children[k].id) {
                                if (uav_project_list_all[i].children[j].children[k].checked) {
                                    for (var m in current_entities_route) {
                                        if (("UAVROUTE_" + obj.data.id) == current_entities_route[m].id) {
                                            ZoomToEntity(current_entities_route[m]);
                                            break;
                                        }
                                    }
                                }
                                break;
                            }
                        }
                        break;
                    }
                }
                break;
            }
        }
    }
    else {
        if (obj.data.children != null && obj.data.children != undefined) {
            for (var i in uav_project_list_all) {
                for (var j in uav_project_list_all[i].children) {
                    if (uav_project_list_all[i].children[j].id == obj.data.id && uav_project_list_all[i].children[j].title == obj.data.title) {
                        uav_project_list_all[i].children[j].spread = !uav_project_list_all[i].children[j].spread;
                    }
                }
            }

            isReloadTree = true;//标记重载
            MarkCurrentProject();
            isReloadTree = false;//重载后还原
        }
    }
};

//节点操作
function UavProjectNodeOperate(obj) {
    if (obj.data.type == "uavproject") {
        //项目
        if (obj.type === 'add') {
            ViewUavProject(obj.data.data);//查看项目
        } else if (obj.type === 'update') {
            EditUavProject(obj.data.data);//编辑项目
        } else if (obj.type === 'del') {
            DeleteUavProject(obj.data.id);//删除项目
        };
    } else if (obj.data.type == "uavroute") {
        //航线
        if (obj.type === 'add') {
            ViewUavRoute(obj.data.class, obj.data.id); //查看航线
        } else if (obj.type === 'update') {
            //编辑航线
            EditUavRoute(obj.data.class, obj.data.id);
        } else if (obj.type === 'del') {
            DeleteUavRoute(obj.data.id);//删除航线
        };
    }
    else if (obj.data.type == "uavsurmodel") {
        //模型
        if (obj.type === 'add') {
            ViewModel(obj.data.data); //查看模型
        } else if (obj.type === 'update') {
            CancelModel(current_project_id, obj.data.id);//取消模型
        }
    }
    else {
        if (obj.type === 'view') {
            LinkModel(current_project_id);//项目关联模型
        }
    }
};

//节点选中/取消选中
function UavProjectNodeCheck(obj) {
    if (obj.checked) {
        //选中
        if (obj.data.type == "uavsurmodel") {
            if (current_model_id != null) {
                if (!isReloadTree) {
                    if (current_project_tile != null) {
                        viewer.scene.primitives.remove(current_project_tile);//清除当前模型
                        current_project_tile = null;
                    }

                    for (var i in uav_project_list_all) {
                        if (uav_project_list_all[i].id == current_project_id) {
                            for (var j in uav_project_list_all[i].children) {
                                if (uav_project_list_all[i].children[j].title == "实景模型") {
                                    for (var k in uav_project_list_all[i].children[j].children) {
                                        if (uav_project_list_all[i].children[j].children[k].id == current_model_id) {
                                            uav_project_list_all[i].children[j].children[k].checked = false;
                                        }

                                        if (uav_project_list_all[i].children[j].children[k].id == obj.data.id) {
                                            uav_project_list_all[i].children[j].children[k].checked = true;
                                        }
                                    }
                                    break;
                                }
                            }
                            break;
                        }
                    }

                    isReloadTree = true;//标记重载
                    MarkCurrentProject();
                    isReloadTree = false;//重载后还原
                    current_model_id = obj.data.id;
                    current_project_tile = Load3DTiles(obj.data.data);

                    if (measurewidget_layerindex != null) {
                        layui.element.tabChange('measureway', 'modelMeasure'); //模型测量
                    }
                }
            }
            else {
                for (var i in uav_project_list_all) {
                    if (uav_project_list_all[i].id == current_project_id) {
                        for (var j in uav_project_list_all[i].children) {
                            if (uav_project_list_all[i].children[j].title == "实景模型") {
                                for (var k in uav_project_list_all[i].children[j].children) {
                                    if (uav_project_list_all[i].children[j].children[k].id == obj.data.id) {
                                        uav_project_list_all[i].children[j].children[k].checked = true;
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                        break;
                    }
                }

                current_model_id = obj.data.id;
                current_project_tile = Load3DTiles(obj.data.data);

                if (measurewidget_layerindex != null) {
                    layui.element.tabChange('measureway', 'modelMeasure'); //模型测量
                }
            }
        }
        else if (obj.data.type == "uavroute") {
            if (!isReloadTree) {
                for (var i in uav_project_list_all) {
                    if (uav_project_list_all[i].id == current_project_id) {
                        for (var j in uav_project_list_all[i].children) {
                            if (uav_project_list_all[i].children[j].title == "航线任务") {
                                for (var k in uav_project_list_all[i].children[j].children) {
                                    if (uav_project_list_all[i].children[j].children[k].id == obj.data.id) {
                                        uav_project_list_all[i].children[j].children[k].checked = true;
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                        break;
                    }
                }

                var entity_route = new Cesium.Entity({
                    id: "UAVROUTE_" + obj.data.id,
                    polyline: {
                        positions: JSON.parse(obj.data.line),
                        width: 3,
                        arcType: Cesium.ArcType.RHUMB,
                        material: Cesium.Color.GREENYELLOW,
                        show: true,
                        clampToGround: false,
                    },
                });

                current_entities_route.push(entity_route);
                AddEntityInViewer(entity_route);
                ZoomToEntity(entity_route);
            }
        }
    }
    else {
        //取消选中
        if (obj.data.type == "uavsurmodel") {
            if (current_project_tile != null) {
                viewer.scene.primitives.remove(current_project_tile);//清除模型
                current_project_tile = null;
                current_model_id = null;
            }

            for (var i in uav_project_list_all) {
                if (uav_project_list_all[i].id == current_project_id) {
                    for (var j in uav_project_list_all[i].children) {
                        if (uav_project_list_all[i].children[j].title == "实景模型") {
                            for (var k in uav_project_list_all[i].children[j].children) {
                                if (uav_project_list_all[i].children[j].children[k].id == obj.data.id) {
                                    uav_project_list_all[i].children[j].children[k].checked = false;
                                }
                            }
                            break;
                        }
                    }
                    break;
                }
            }

            if (measurewidget_layerindex != null) {
                layui.element.tabChange('measureway', 'terrainMeasure'); //地形测量
            }
        }
        else if (obj.data.type == "uavroute") {
            for (var i in uav_project_list_all) {
                if (uav_project_list_all[i].id == current_project_id) {
                    for (var j in uav_project_list_all[i].children) {
                        if (uav_project_list_all[i].children[j].title == "航线任务") {
                            for (var k in uav_project_list_all[i].children[j].children) {
                                if (uav_project_list_all[i].children[j].children[k].id == obj.data.id) {
                                    uav_project_list_all[i].children[j].children[k].checked = false;
                                    break;
                                }
                            }
                            break;
                        }
                    }
                    break;
                }
            }

            for (var i in current_entities_route) {
                if (current_entities_route[i].id == ("UAVROUTE_" + obj.data.id)) {
                    RemoveEntityInViewer(current_entities_route[i]);
                }
            }

            var new_current_entities_route = [];
            for (var i in current_entities_route) {
                if (current_entities_route[i].id != ("UAVROUTE_" + obj.data.id)) {
                    new_current_entities_route.push(current_entities_route[i]);
                }
            }

            current_entities_route = new_current_entities_route;
        }
    }
};