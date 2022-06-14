//加载中
loadlayerindex = layer.load(1, { offset: 'auto', area: ['37px', '37px'], zIndex: layer.zIndex, shade: [0.5, '#393D49'], success: function (layero) { layer.setTop(layero); } });

layer.open({
    type: 1
    , title: ['项目列表', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
    , area: ['330px', '58%']
    , shade: 0
    , offset: ['60px', '5px']
    , closeBtn: 0
    , maxmin: true
    , moveOut: false
    , resize: false
    , content: '<!--项目列表--><div id="projectlist"></div>'
    , zIndex: layer.zIndex
    , success: function (layero) {
        layer.setTop(layero);

        tree.render({
            elem: '#projectlist'
            , id: 'projectlistid'
            , data: []
            , accordion: false
            , showLine: true
            , edit: ['add', 'update', 'del']
            , showCheckbox: true
            , customCheckbox: true
            , customSpread: true
            , customOperate: true
            , cancelNodeFileIcon: true
            , click: function (obj) {
                FindProjectNodeClick(obj);//节点点击
            }
            , operate: function (obj) {
                FindProjectNodeOperate(obj);//节点操作
            }
            , oncheck: function (obj) {
                FindProjectNodeCheck(obj);//节点选中or取消选中
            }
        });

        document.getElementById('projectlist').parentNode.style.maxHeight = (parseInt(document.getElementById('projectlist').parentNode.style.height.replace("px", "")) - 30).toString() + "px";
    }
});

GetUserAllFindProjectsQuick();//获取用户项目
GetUserAllFindProjects();//获取用户项目+模型+航线+目标

//获取用户全部巡查项目数据(快速)
function GetUserAllFindProjectsQuick() {
    $.ajax({
        url: servicesurl + "/api/FindProject/GetUserFindProject", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            CloseLayer(loadlayerindex);//关闭正在加载

            var result = JSON.parse(data);
            if (result.code == 1) {
                //返回项目信息
                var findprojectdata = JSON.parse(result.data);
                for (var i in findprojectdata) {
                    var project = new Object;
                    project.id = findprojectdata[i].Project.Id;
                    project.title = findprojectdata[i].Project.XMMC;
                    project.type = "findproject";
                    project.spread = false;
                    project.data = findprojectdata[i].Project;

                    var child = [];
                    var models = new Object();
                    models.id = findprojectdata[i].Project.Id;
                    models.title = "实景模型";
                    models.spread = false;
                    child.push(models);
                    var routes = new Object();
                    routes.id = findprojectdata[i].Project.Id;
                    routes.title = "巡查航线";
                    routes.spread = false;
                    child.push(routes);
                    var targets = new Object();
                    targets.id = findprojectdata[i].Project.Id;
                    targets.title = "巡查目标";
                    targets.spread = false;
                    child.push(targets);

                    project.children = child;
                    findprojectlist.push(project);
                }
                tree.reload('projectlistid', { data: findprojectlist });

                //项目位置及标注
                var bs = [];//纬度
                var ls = [];//经度
                for (var i in findprojectdata) {
                    var findprojectentity = new Cesium.Entity({
                        id: "PROJECTCENTER_" + findprojectdata[i].Project.Id,
                        position: Cesium.Cartesian3.fromDegrees(findprojectdata[i].Project.ZXJD, findprojectdata[i].Project.ZXWD),
                        billboard: {
                            image: '../../Resources/img/uavfind/findprojecticon.png',
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                            width: 40,
                            height: 40,
                        }
                    });
                    projectentities.push(findprojectentity);

                    var findprojectentitylabel = new Cesium.Entity({
                        id: "PROJECTCENTER_LABEL_" + findprojectdata[i].Project.Id,
                        position: Cesium.Cartesian3.fromDegrees(findprojectdata[i].Project.ZXJD, findprojectdata[i].Project.ZXWD),
                        label: {
                            text: findprojectdata[i].Project.XMMC,
                            font: '20px Times New Roman',
                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                            scaleByDistance: new Cesium.NearFarScalar(90000, 1, 200000, 0)
                        }
                    });
                    projectentities.push(findprojectentitylabel);

                    bs.push(findprojectdata[i].Project.ZXWD);
                    ls.push(findprojectdata[i].Project.ZXJD);
                };

                if (projectentities.length > 0) {
                    setTimeout(() => {
                        AddEntitiesInViewer(projectentities);
                    }, 100);
                }
                if ((bs.length > 0) && (ls.length > 0)) {
                    //缩放至项目范围
                    setTimeout(() => {
                        FlytoExtent(Math.min.apply(null, ls) - 0.5, Math.min.apply(null, bs) - 0.5, Math.max.apply(null, ls) + 0.5, Math.max.apply(null, bs) + 0.5)
                    }, 1000);
                };
            }
            else {
                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }

        }, datatype: "json"
    });
    
};

//获取用户全部巡查项目数据
function GetUserAllFindProjects() {
    $.ajax({
        url: servicesurl + "/api/FindProject/GetUserFindProjectDatas", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            findprojectlist = [];

            var result = JSON.parse(data);
            if (result.code == 1) {
                var findprojectdata = JSON.parse(result.data);

                for (var i in findprojectdata) {
                    var findproject = new Object;
                    findproject.id = findprojectdata[i].Project.Id;
                    findproject.title = findprojectdata[i].Project.XMMC;
                    findproject.data = findprojectdata[i].Project;
                    findproject.type = "findproject";
                    findproject.nodeOperate = true;
                    findproject.spread = false;
                    
                    var child = [];
                    //实景模型
                    var models = new Object();
                    models.id = findprojectdata[i].Project.Id;
                    models.title = "实景模型";
                    models.spread = true;
                    var modelchild = [];

                    for (var j in findprojectdata[i].Models) {
                        var model = new Object();
                        model.id = "FINDSURMODEL_" + findprojectdata[i].Models[j].Id;
                        model.title = findprojectdata[i].Models[j].RWMC;
                        model.icon = MODELICON;
                        model.type = "findsurmodel";
                        model.data = findprojectdata[i].Models[j];
                        model.nodeOperate = true;
                        model.customItem = true;
                        model.edit = ['del'];
                        model.showCheckbox = true;
                        model.checked = false;

                        if (findprojectdata[i].Models[j].MXLJ != null && findprojectdata[i].Models[j].MXLJ != "") {
                            model.disabled = false;
                        }
                        else {
                            model.disabled = true;
                        }
                        modelchild.push(model);
                    }

                    models.children = modelchild;
                    child.push(models);

                    //TODO巡查航线
                    var routes = new Object();
                    routes.id = findprojectdata[i].Project.Id;
                    routes.title = "巡查航线";
                    routes.spread = true;

                    child.push(routes);

                    //TODO巡查目标
                    var targets = new Object();
                    targets.id = findprojectdata[i].Project.Id;
                    targets.title = "巡查目标";
                    targets.spread = true;

                    child.push(targets);


                    findproject.children = child;
                    findprojectlist.push(findproject);                  
                }

                tree.reload('projectlistid', { data: findprojectlist });
            }
            else {
                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }
        }, datatype: "json"
    });
};


//节点点击
function FindProjectNodeClick(obj) {
    if (obj.data.type == "findproject") {
        if (currentprojectid == null) {
            currentprojectid = obj.data.id;//赋值当前项目id
            currentprojecttitle = obj.data.title;//赋值当前项目标题

            for (var i in findprojectlist) {
                if (findprojectlist[i].id == obj.data.id) {
                    findprojectlist[i].spread = true;
                }
                else {
                    findprojectlist[i].spread = false;
                }
                break;
            }

            isReloadTree = true;//标记重载
            MarkCurrentProject();
            isReloadTree = false;//重载后还原

            for (var i in projectentities) {
                if (projectentities[i].id == ("PROJECTCENTER_" + currentprojectid)) {
                    ZoomToEntity(projectentities[i]);
                    break;
                }
            }
        }
        else {
            if (obj.data.id != currentprojectid) {
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
                    currentprojectid = obj.data.id;//赋值当前项目id
                    currentprojecttitle = obj.data.title;//赋值当前项目标题

                    //关闭所有图层
                    CloseAllLayer();

                    //清除模型
                    if (curtileset != null) {
                        viewer.scene.primitives.remove(curtileset);//清除模型
                        curtileset = null;
                        currentmodelid = null;
                    }


                    //取消所有选中
                    for (var i in findprojectlist) {
                        for (var j in findprojectlist[i].children) {
                            if (findprojectlist[i].children[j].title == "实景模型" || findprojectlist[i].children[j].title == "巡查航线" || findprojectlist[i].children[j].title == "巡查目标") {
                                if (findprojectlist[i].children[j].children != undefined && findprojectlist[i].children[j].children.length > 0) {
                                    for (var k in findprojectlist[i].children[j].children) {
                                        findprojectlist[i].children[j].children[k].checked = false;
                                    }
                                }
                            }
                        }
                    }

                    isReloadTree = true;//标记重载
                    MarkCurrentProject();
                    isReloadTree = false;//重载后还原


                    RemoveEntitiesInViewer(projectentities);
                    projectentities = [];

                    for (var i in findprojectlist) {
                        var modelprojectentity = new Cesium.Entity({
                            id: "PROJECTCENTER_" + findprojectlist[i].id,
                            position: Cesium.Cartesian3.fromDegrees(findprojectlist[i].data.ZXJD, findprojectlist[i].data.ZXWD),
                            billboard: {
                                image: '../../Resources/img/uavfind/findprojecticon.png',
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                width: 40,
                                height: 40,
                            }
                        });
                        projectentities.push(modelprojectentity);
                        AddEntityInViewer(modelprojectentity);

                        var modelprojectentitylabel = new Cesium.Entity({
                            id: "PROJECTCENTER_LABEL_" + findprojectlist[i].id,
                            position: Cesium.Cartesian3.fromDegrees(findprojectlist[i].data.ZXJD, findprojectlist[i].data.ZXWD),
                            label: {
                                text: findprojectlist[i].data.XMMC,
                                font: '20px Times New Roman',
                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                scaleByDistance: new Cesium.NearFarScalar(90000, 1, 200000, 0)
                            }
                        });
                        projectentities.push(modelprojectentitylabel);
                        AddEntityInViewer(modelprojectentitylabel);

                        if (findprojectlist[i].id == currentprojectid) {
                            ZoomToEntity(modelprojectentity);
                        }

                    }

                    if (measurewidget_layerindex != null) {
                        layui.element.tabChange('measureway', 'terrainMeasure'); //地形测量
                    }

                    layer.close(index);
                }, function (index) {
                    //否
                });
            }
            else {
                for (var i in projectentities) {
                    if (projectentities[i].id == ("PROJECTCENTER_" + currentprojectid)) {
                        ZoomToEntity(projectentities[i]);
                        break;
                    }
                }
            }
        }
    }
    else {
        if (obj.data.children != null && obj.data.children != undefined) {

            for (var i in findprojectlist) {
                if (findprojectlist[i].id == obj.data.id) {
                    for (var j in findprojectlist[i].children) {
                        if (findprojectlist[i].children[j].title == obj.data.title) {
                            findprojectlist[i].children[j].spread = !findprojectlist[i].children[j].spread;
                        }
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
function FindProjectNodeOperate(obj) {
    if (obj.data.type == 'findproject') {
        //项目
        if (obj.type == 'add') {
            ViewFindProject(obj.data.data);//查看项目
        }
        else if (obj.type == 'update') {
            EditFindProject(obj.data.data);//编辑项目
        }
        else if (obj.type == 'del') {
            DeleteFindProject(obj.data.id);//删除项目
        }
    }
    else if (obj.data.type == "uavroute") {
        //航线
        if (obj.type === 'add') {
            ViewUavRoute(obj.data.class, obj.data.id); //查看航线
        }
        else if (obj.type === 'update') {
            //编辑航线
            EditUavRoute(obj.data.class, obj.data.id);
        }
        else if (obj.type === 'del') {
            DeleteUavRoute(obj.data.id);//删除航线     
        }
    }





};

//节点选中/取消选中
function FindProjectNodeCheck(obj) {
    if (obj.checked) {
        //选中
        if (obj.data.type == "findsurmodel") {
            if (currentmodelid != null) {
                if (!isReloadTree) {
                    if (curtileset != null) {
                        viewer.scene.primitives.remove(curtileset);//清除当前模型
                        curtileset = null;
                    }

                    for (var i in findprojectlist) {
                        if (findprojectlist[i].id == currentprojectid) {
                            for (var j in findprojectlist[i].children) {
                                if (findprojectlist[i].children[j].title == "实景模型") {
                                    for (var k in findprojectlist[i].children[j].children) {
                                        if (findprojectlist[i].children[j].children[k].id == currentmodelid) {
                                            findprojectlist[i].children[j].children[k].checked = false;
                                        }

                                        if (findprojectlist[i].children[j].children[k].id == obj.data.id) {
                                            findprojectlist[i].children[j].children[k].checked = true;
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
                    currentmodelid = obj.data.id;
                    curtileset = Load3DTiles(obj.data.data);

                    if (measurewidget_layerindex != null) {
                        layui.element.tabChange('measureway', 'modelMeasure'); //模型测量
                    }
                }
            }
            else {
                for (var i in findprojectlist) {
                    if (findprojectlist[i].id == currentprojectid) {
                        for (var j in findprojectlist[i].children) {
                            if (findprojectlist[i].children[j].title == "实景模型") {
                                for (var k in findprojectlist[i].children[j].children) {
                                    if (findprojectlist[i].children[j].children[k].id == obj.data.id) {
                                        findprojectlist[i].children[j].children[k].checked = true;
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
                curtileset = Load3DTiles(obj.data.data);

                if (measurewidget_layerindex != null) {
                    layui.element.tabChange('measureway', 'modelMeasure'); //模型测量
                }
            }
        }
        else if (obj.data.type == "findroute") {
            if (!isReloadTree) {
                for (var i in findprojectlist) {
                    if (findprojectlist[i].id == currentprojectid) {
                        for (var j in findprojectlist[i].children) {
                            if (findprojectlist[i].children[j].title == "巡查航线") {
                                for (var k in findprojectlist[i].children[j].children) {
                                    if (findprojectlist[i].children[j].children[k].id == obj.data.id) {
                                        findprojectlist[i].children[j].children[k].checked = true;
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
        if (obj.data.type == "findmodel") {
            if (curtileset != null) {
                viewer.scene.primitives.remove(curtileset);//清除模型
                curtileset = null;
                currentmodelid = null;
            }

            for (var i in findprojectlist) {
                if (findprojectlist[i].id == currentprojectid) {
                    for (var j in findprojectlist[i].children) {
                        if (findprojectlist[i].children[j].title == "实景模型") {
                            for (var k in findprojectlist[i].children[j].children) {
                                if (findprojectlist[i].children[j].children[k].id == obj.data.id) {
                                    findprojectlist[i].children[j].children[k].checked = false;
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
        else if (obj.data.type == "findroute") {
            for (var i in findprojectlist) {
                if (findprojectlist[i].id == currentprojectid) {
                    for (var j in findprojectlist[i].children) {
                        if (findprojectlist[i].children[j].title == "航线任务") {
                            for (var k in findprojectlist[i].children[j].children) {
                                if (findprojectlist[i].children[j].children[k].id == obj.data.id) {
                                    findprojectlist[i].children[j].children[k].checked = false;
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
                if (current_entities_route[i].id == ("FINDROUTE_" + obj.data.id)) {
                    RemoveEntityInViewer(current_entities_route[i]);
                }
            }

            var new_current_entities_route = [];
            for (var i in current_entities_route) {
                if (current_entities_route[i].id != ("FINDROUTE_" + obj.data.id)) {
                    new_current_entities_route.push(current_entities_route[i]);
                }
            }

            current_entities_route = new_current_entities_route;
        }
    }
};