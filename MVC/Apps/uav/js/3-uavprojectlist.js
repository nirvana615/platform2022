var loadlayerindex = null;

//航线任务规划项目列表
layer.open({
    type: 1
    , title: ['项目列表', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
    , area: ['400px', '60%']
    , shade: 0
    , offset: ['68px', '5px']
    , closeBtn: 0
    , maxmin: true
    , moveOut: true
    , content: '<div id="uav-project-list-tree" style="padding:0px"></div>'
    , zIndex: layer.zIndex
    , success: function (layero) {
        layer.setTop(layero);

        //加载中
        loadlayerindex = layer.load(1, {
            shade: [0.1, '#fff']
            , offset: ['218px', '190px']
        });

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
                UavProjectNodeCheck(obj);//节点选中/取消选中
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

                    var projectchild = [];

                    if (uav_projects[i] != null && uav_projects[i] != "") {
                        var createtime = new Object;
                        createtime.title = "创建时间：" + uav_projects[i].CJSJ;
                        projectchild.push(createtime);
                    }
                    if (uav_projects[i] != null && uav_projects[i].GXSJ != "") {
                        var updatetime = new Object;
                        updatetime.title = "更新时间：" + uav_projects[i].GXSJ;
                        projectchild.push(updatetime);
                    }
                    project.children = projectchild;
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
            //CloseLayer(loadlayerindex);//关闭正在加载

            ////获取选中路径和模型节点
            //var checkroutes = [];
            //var checkmodels = [];

            //if (uav_project_list_all != null && uav_project_list_all.length > 0) {
            //    for (var i in uav_project_list_all) {
            //        for (var j in uav_project_list_all[i].children) {
            //            if (uav_project_list_all[i].children[j].children != undefined) {
            //                for (var k in uav_project_list_all[i].children[j].children) {
            //                    //选中模型
            //                    if ((uav_project_list_all[i].children[j].children[k].type == "uavsurmodel") && (uav_project_list_all[i].children[j].children[k].checked == true)) {
            //                        checkmodels.push(uav_project_list_all[i].children[j].children[k].id.toString());
            //                    }
            //                    //选中路径
            //                    if ((uav_project_list_all[i].children[j].children[k].type == "uavroute") && (uav_project_list_all[i].children[j].children[k].checked == true)) {
            //                        checkroutes.push(uav_project_list_all[i].children[j].children[k].id.toString());
            //                    }
            //                }
            //            }
            //        }
            //    }
            //}

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

                    var projectinfos = [];

                    if (uav_project_infos[i].Project != null && uav_project_infos[i].Project.CJSJ != "") {
                        var createtime = new Object;
                        createtime.title = "创建时间：" + uav_project_infos[i].Project.CJSJ;
                        projectinfos.push(createtime);
                    }
                    if (uav_project_infos[i].Project != null && uav_project_infos[i].Project.GXSJ != "") {
                        var updatetime = new Object;
                        updatetime.title = "更新时间：" + uav_project_infos[i].Project.GXSJ;
                        projectinfos.push(updatetime);
                    }

                    if (uav_project_infos[i].Models != null) {
                        var models = new Object;
                        models.id = project.id;
                        models.title = "实景模型";
                        models.spread = true;

                        var modelchild = [];
                        for (var j in uav_project_infos[i].Models) {
                            var model = new Object;
                            model.id = "UAVSURMODEL_" + uav_project_infos[i].Models[j].Id;
                            model.icon = MODELICON;
                            model.type = "uavsurmodel";
                            model.title = uav_project_infos[i].Models[j].RWMC;
                            model.data = uav_project_infos[i].Models[j];
                            model.showCheckbox = true;
                            model.checked = false;
                            modelchild.push(model);
                        }
                        models.children = modelchild;
                        projectinfos.push(models);
                    }

                    if (uav_project_infos[i].Routes != null) {
                        var routes = new Object;
                        routes.id = project.id;
                        routes.title = "航线任务";
                        routes.spread = true;

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
                        projectinfos.push(routes);
                    }

                    project.children = projectinfos;
                    uav_project_list_all.push(project);
                }

                //if (uavprojectid != -1) {
                //    if (uavprojectid == current_project_id) {
                //        if (uavrouteid != -1) {
                //            checkroutes.push(uavrouteid);
                //            for (var i in uav_project_list_all) {
                //                for (var j in uav_project_list_all[i].children) {
                //                    if (uav_project_list_all[i].children[j].children != undefined) {
                //                        for (var k in uav_project_list_all[i].children[j].children) {
                //                            if (uav_project_list_all[i].children[j].children[k].type == "uavroute") {
                //                                if (checkroutes.indexOf(uav_project_list_all[i].children[j].children[k].id) != -1) {
                //                                    uav_project_list_all[i].children[j].children[k].checked = true;
                //                                    if (uav_project_list_all[i].children[j].children[k].id == uavrouteid) {
                //                                        var entity_route = new Cesium.Entity({
                //                                            id: "UAVROUTE_" + uavrouteid,
                //                                            polyline: {
                //                                                positions: JSON.parse(uav_project_list_all[i].children[j].children[k].line),
                //                                                width: 3,
                //                                                arcType: Cesium.ArcType.RHUMB,
                //                                                material: Cesium.Color.GREENYELLOW,
                //                                                show: true,
                //                                                clampToGround: false,
                //                                            },
                //                                        });
                //                                        current_entities_route.push(entity_route);
                //                                        AddEntityInViewer(entity_route);
                //                                        ZoomToEntity(entity_route);
                //                                    }
                //                                }
                //                                else {
                //                                    uav_project_list_all[i].children[j].children[k].checked = false;
                //                                }
                //                            }
                //                        }
                //                    }
                //                }
                //            }
                //        }
                //        else {
                //            if (checkmodels.length > 0) {
                //                for (var i in uav_project_list_all) {
                //                    for (var j in uav_project_list_all[i].children) {
                //                        if (uav_project_list_all[i].children[j].children != undefined) {
                //                            for (var k in uav_project_list_all[i].children[j].children) {
                //                                if ((uav_project_list_all[i].children[j].children[k].type == "uavsurmodel") && (checkmodels.indexOf(uav_project_list_all[i].children[j].children[k].id.toString()) != -1)) {
                //                                    //uav_project_list_all[i].children[j].children[k].checked = true;
                //                                }
                //                            }
                //                        }
                //                    }
                //                }
                //            }

                //            if (checkroutes.length > 0) {
                //                for (var i in uav_project_list_all) {
                //                    for (var j in uav_project_list_all[i].children) {
                //                        if (uav_project_list_all[i].children[j].children != undefined) {
                //                            for (var k in uav_project_list_all[i].children[j].children) {
                //                                if ((uav_project_list_all[i].children[j].children[k].type == "uavroute") && (checkroutes.indexOf(uav_project_list_all[i].children[j].children[k].id.toString()) != -1)) {
                //                                    //uav_project_list_all[i].children[j].children[k].checked = true;
                //                                }
                //                            }
                //                        }
                //                    }
                //                }
                //            }
                //        }
                //    }
                //    else {
                //        current_project_id = uavprojectid;

                //        if (current_entities_route.length > 0) {
                //            RemoveEntitiesInViewer(current_entities_route);
                //            current_entities_route = [];
                //        }
                //    }
                //}
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
                layer.confirm('是否切换当前项目?', {
                    icon: 3, title: '提示',
                    zIndex: layer.zIndex,
                    cancel: function () {
                    },
                    success: function (layero) {
                        layer.setTop(layero);
                    },
                    btn: ['是', '否']
                }, function (index, layero) {
                    //是
                    current_project_id = obj.data.id;//赋值当前项目id
                    current_project_title = obj.data.title;//赋值当前项目标题

                    //关闭所有图层
                    CloseAllLayer();

                    //清除模型和图形
                    ClearAllModelAndGeometry()

                    MarkCurrentProject();

                    layer.close(index);
                }, function (index) {
                    //否
                });
            }
        }
    } else if (obj.data.type == "uavsurmodel") {
        if (obj.data.checked) {
            //TODO 如果是当前加载模型，则缩放至最佳视图
        }
    } else if (obj.data.type == "uavroute") {
        if (obj.data.checked) {
            //TODO 如果已加载要素，则缩放至要素

        }
    } else {
        if (obj.data.children != null && obj.data.children != undefined) {
            for (var i in uav_project_list_all) {
                for (var j in uav_project_list_all[i].children) {
                    if (uav_project_list_all[i].children[j].id == obj.data.id && uav_project_list_all[i].children[j].title == obj.data.title) {
                        uav_project_list_all[i].children[j].spread = !uav_project_list_all[i].children[j].spread;
                    }
                }
            }

            tree.reload('uav-project-list-treeid', { data: uav_project_list_all });
            MarkNode();//高亮当前节点
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
            //查看航线
            ViewUavRoute(obj.data.class, obj.data.id);
        } else if (obj.type === 'update') {
            //编辑航线
            EditUavRoute(obj.data.class, obj.data.id);
        } else if (obj.type === 'del') {
            //删除航线
            DeleteUavRoute(obj.data.id);
        };
    }
};

//节点选中/取消选中
function UavProjectNodeCheck(obj) {
    if (obj.checked) {
        //选中
        if (obj.data.type == "uavsurmodel") {
            //LoadModel(obj.data);//加载实景模型
            current_project_tile = Load3DTiles(obj.data.data);
        }
        else if (obj.data.type == "uavroute") {

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

        for (var i in uav_project_list_all) {
            for (var j in uav_project_list_all[i].children) {
                if (uav_project_list_all[i].children[j].children != undefined) {
                    for (var k in uav_project_list_all[i].children[j].children) {
                        if (uav_project_list_all[i].children[j].children[k].type == obj.data.type && uav_project_list_all[i].children[j].children[k].id == obj.data.id) {
                            uav_project_list_all[i].children[j].children[k].checked = true;
                        }
                    }
                }
            }
        }

        obj.data.checked = true;
    }
    else {
        //取消选中
        if (obj.data.type == "uavsurmodel") {
            viewer.scene.primitives.remove(current_project_tile);
            current_project_tile = null;
        }
        else if (obj.data.type == "uavroute") {
            for (var i in current_entities_route) {
                if (current_entities_route[i].id == ("UAVROUTE_" + obj.data.id)) {
                    RemoveEntityInViewer(current_entities_route[i]);
                }
            }

            var result = [];
            for (var i in current_entities_route) {
                if (current_entities_route[i].id != ("UAVROUTE_" + obj.data.id)) {
                    result.push(current_entities_route[i]);
                }
            }

            current_entities_route = result;
        }

        for (var i in uav_project_list_all) {
            for (var j in uav_project_list_all[i].children) {
                if (uav_project_list_all[i].children[j].children != undefined) {
                    for (var k in uav_project_list_all[i].children[j].children) {
                        if (uav_project_list_all[i].children[j].children[k].type == obj.data.type && uav_project_list_all[i].children[j].children[k].id == obj.data.id) {
                            uav_project_list_all[i].children[j].children[k].checked = false;
                        }
                    }
                }
            }
        }

        obj.data.checked = false;
    }



};