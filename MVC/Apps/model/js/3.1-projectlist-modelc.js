//加载中
loadlayerindex = layer.load(1, { offset: 'auto', area: ['37px', '37px'], zIndex: layer.zIndex, shade: [0.5, '#393D49'], success: function (layero) { layer.setTop(layero); } });

GetUserAllModelProjectsQuick();//获取用户项目
GetUserAllModelProjects();//获取用户项目+模型

//获取用户全部模型项目数据(快速)
function GetUserAllModelProjectsQuick() {
    $.ajax({
        url: servicesurl + "/api/ModelProject/GetUserModelProject", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            CloseLayer(loadlayerindex);//关闭正在加载

            layer.open({
                type: 1
                , title: ['项目列表', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['380px', '60%']
                , shade: 0
                , offset: ['60px', '5px']
                , closeBtn: 0
                , maxmin: true
                , moveOut: false
                , resize: false
                , content: '<!--项目列表--><div id="modelprojectlisttab" class="layui-tab layui-tab-brief" lay-filter="modelprojectListTab" style="margin:0px;"><!--选项卡--><ul class="layui-tab-title"><li lay-id="list_area" class="layui-this" style="width:40%;">地区</li><li lay-id="list_year" style="width:40%;">时间</li></ul><!--tree--><div class="layui-tab-content" style="padding:0px;"><div class="layui-tab-item layui-show"><div id="projectbyarea"></div></div><div class="layui-tab-item"><div id="projectbyyear"></div></div></div></div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    document.getElementById('modelprojectlisttab').parentNode.style.maxHeight = (parseInt(document.getElementById('modelprojectlisttab').parentNode.style.height.replace("px", "")) - 78).toString() + "px";
                    document.getElementById("modelprojectlisttab").parentNode.parentNode.innerHTML += '<!--搜索--><div id="modelsearchid" class="layui-row" style="margin-left:5px;position:absolute;bottom:10px; "><div class="layui-input-inline" style="border-color:#e6e6e6;"><input type="text" id="projectfiltersearch" lay-verify="title" autocomplete="off" placeholder="搜索" class="layui-input" style="padding-left:25px;border-radius:5px;width:260px"></div><button id="projectsearch" type="button" class="layui-btn layui-btn-primary" style="width:50px;border-radius:5px;margin-left:5px;border-color:#e6e6e6;"><i class="layui-icon layui-icon-search"></i></button><button id="projectclear" type="button" class="layui-btn layui-btn-primary" style="width:50px;border-radius:5px;margin-left:5px;border-color:#e6e6e6;"><i class="layui-icon layui-icon-delete"></i></button></div>';

                    //地区树
                    tree.render({
                        elem: '#projectbyarea'
                        , id: 'areaprojectlistid'
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
                            ModelProjectNodeClick(obj);//节点点击
                        }
                        , operate: function (obj) {
                            ModelProjectNodeOperate(obj);//节点操作
                        }
                        , oncheck: function (obj) {
                            ModelProjectNodeCheck(obj);//节点选中or取消选中
                        }
                    });

                    //时间树
                    tree.render({
                        elem: '#projectbyyear'
                        , id: 'yearprojectlistid'
                        , data: []
                        , accordion: false
                        , showLine: true
                        , showCheckbox: true
                        , customCheckbox: true
                        , edit: ['add', 'update', 'del']
                        , customOperate: true
                        , customSpread: true
                        , cancelNodeFileIcon: true
                        , click: function (obj) {
                            ModelProjectNodeClick(obj);//节点点击
                        }
                        , operate: function (obj) {
                            ModelProjectNodeOperate(obj);//节点操作
                        }
                        , oncheck: function (obj) {
                            ModelProjectNodeCheck(obj);//节点选中or取消选中
                        }
                    });
                }
                , min: function (layero, index) {
                    document.getElementById("modelsearchid").style.visibility = "hidden";
                }
                , restore: function (layero, index) {
                    document.getElementById("modelsearchid").style.visibility = "visible";
                }
            });

            var result = JSON.parse(data);
            if (result.code == 1) {
                //返回项目信息
                var modelprojectdata = JSON.parse(result.data);

                var areas = [];//地区
                var years = [];//时间

                for (var i in modelprojectdata) {
                    var year = modelprojectdata[i].Project.XMSJ.substr(0, 4);
                    var area = modelprojectdata[i].Project.XZQBM;
                    if (years.indexOf(year) == -1) {
                        years.push(year);
                    }
                    if (areas.indexOf(area) == -1) {
                        areas.push(area);
                    }
                }

                //按地区组织
                for (var x in areas) {
                    var xzq = new Object;
                    xzq.id = areas[x];
                    if (x == 0) {
                        xzq.spread = true;
                    }
                    if ((xjxzqs != null) && (xjxzqs.length > 0)) {
                        for (var y in xjxzqs) {
                            if (areas[x] == xjxzqs[y].value) {
                                xzq.title = xjxzqs[y].name;
                            }
                        }
                    }
                    else {
                        xzq.title = areas[x];
                    }

                    var projects = [];
                    for (var i in modelprojectdata) {
                        if (modelprojectdata[i].Project.XZQBM == areas[x]) {
                            var project = new Object;
                            project.id = modelprojectdata[i].Project.Id;
                            project.title = modelprojectdata[i].Project.XMSJ.split("-").join("") + " " + modelprojectdata[i].Project.XMMC;
                            project.type = "modelproject";
                            project.data = modelprojectdata[i].Project;
                            project.nodeOperate = true;
                            project.spread = false;
                            projects.push(project);
                        }
                    }
                    xzq.children = projects;
                    modelprojectlistarea.push(xzq);
                }

                //按时间组织
                for (var x in years) {
                    var year = new Object;
                    year.id = years[x];
                    year.title = years[x];
                    if (x == 0) {
                        year.spread = true;
                    }

                    var projects = [];
                    for (var i in modelprojectdata) {
                        if (modelprojectdata[i].Project.XMSJ.split("-")[0] == years[x]) {
                            var project = new Object;
                            project.id = modelprojectdata[i].Project.Id;
                            project.title = modelprojectdata[i].Project.XMSJ.split("-").join("") + " " + modelprojectdata[i].Project.XMMC;
                            project.type = "modelproject";
                            project.data = modelprojectdata[i].Project;
                            project.nodeOperate = true;
                            project.spread = false;
                            projects.push(project);
                        }
                    }
                    year.children = projects;
                    modelprojectlistyear.push(year);
                }

                tree.reload('areaprojectlistid', { data: modelprojectlistarea });
                tree.reload('yearprojectlistid', { data: modelprojectlistyear });

                //项目位置及标注
                var bs = [];//纬度
                var ls = [];//经度
                for (var i in modelprojectdata) {
                    var modelprojectentity = new Cesium.Entity({
                        id: "PROJECTCENTER_" + modelprojectdata[i].Project.Id,
                        position: Cesium.Cartesian3.fromDegrees(modelprojectdata[i].Project.ZXJD, modelprojectdata[i].Project.ZXWD),
                        billboard: {
                            image: '../../Resources/img/model/modelprojecticon.png',
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                            width: 40,
                            height: 40,
                        }
                    });
                    projectentities.push(modelprojectentity);

                    var modelprojectentitylabel = new Cesium.Entity({
                        id: "PROJECTCENTER_LABEL_" + modelprojectdata[i].Project.Id,
                        position: Cesium.Cartesian3.fromDegrees(modelprojectdata[i].Project.ZXJD, modelprojectdata[i].Project.ZXWD),
                        label: {
                            text: modelprojectdata[i].Project.XMMC,
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

                    bs.push(modelprojectdata[i].Project.ZXWD);
                    ls.push(modelprojectdata[i].Project.ZXJD);
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

//获取用户全部模型项目数据
function GetUserAllModelProjects() {
    $.ajax({
        url: servicesurl + "/api/ModelProject/GetUserModelProjectDatas", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                var modelprojectdata = JSON.parse(result.data);

                for (var i in modelprojectlistarea) {
                    for (var j in modelprojectlistarea[i].children) {
                        for (var k in modelprojectdata) {
                            if (modelprojectdata[k].Project.Id == modelprojectlistarea[i].children[j].id) {
                                var projectchild = [];
                                if (modelprojectdata[k].Tasks != null && modelprojectdata[k].Tasks.length > 0) {
                                    for (var m in modelprojectdata[k].Tasks) {
                                        var task = new Object;
                                        task.id = modelprojectdata[k].Tasks[m].Id;
                                        task.title = modelprojectdata[k].Tasks[m].RWMC;
                                        task.type = "modeltask";
                                        task.icon = MODELICON;
                                        task.data = modelprojectdata[k].Tasks[m];
                                        task.nodeOperate = true;
                                        task.showCheckbox = true;
                                        task.checked = false;
                                        if (modelprojectdata[k].Tasks[m].MXLJ != null && modelprojectdata[k].Tasks[m].MXLJ != "") {
                                            task.disabled = false;
                                        }
                                        else {
                                            task.disabled = true;
                                        }
                                        projectchild.push(task);

                                        var taskinfo = new Object;
                                        taskinfo.id = modelprojectdata[k].Tasks[m].Id;
                                        taskinfo.rwbm = modelprojectdata[k].Tasks[m].RWBM;
                                        taskinfo.rwmc = modelprojectdata[k].Tasks[m].RWMC;
                                        taskinfo.yxcjry = modelprojectdata[k].Tasks[m].YXCJRY;
                                        taskinfo.yxcjsj = modelprojectdata[k].Tasks[m].YXCJSJ;
                                        taskinfo.data = modelprojectdata[k].Tasks[m];
                                        if (modelprojectdata[k].Tasks[m].RWZT == 0) {
                                            taskinfo.rwzt = "待处理";
                                            modeltaskpcount++;
                                            modeltaskp.push(taskinfo);
                                        }
                                        else if (modelprojectdata[k].Tasks[m].RWZT == 1) {
                                            taskinfo.rwzt = "处理中";
                                            modeltaskicount++;
                                            modeltaski.push(taskinfo);
                                        }
                                        else if (modelprojectdata[k].Tasks[m].RWZT == 2) {
                                            taskinfo.rwzt = "已完成";
                                            modeltaskfcount++;
                                            modeltaskf.push(taskinfo);
                                        }
                                    }
                                }
                                if (projectchild.length > 0) {
                                    modelprojectlistarea[i].children[j].children = projectchild;
                                }

                                break;
                            }
                        }
                    }
                }

                for (var i in modelprojectlistyear) {
                    for (var j in modelprojectlistyear[i].children) {
                        for (var k in modelprojectdata) {
                            if (modelprojectdata[k].Project.Id == modelprojectlistyear[i].children[j].id) {
                                var projectchild = [];
                                if (modelprojectdata[k].Tasks != null && modelprojectdata[k].Tasks.length > 0) {
                                    for (var m in modelprojectdata[k].Tasks) {
                                        var task = new Object;
                                        task.id = modelprojectdata[k].Tasks[m].Id;
                                        task.title = modelprojectdata[k].Tasks[m].RWMC;
                                        task.type = "modeltask";
                                        task.icon = MODELICON;
                                        task.data = modelprojectdata[k].Tasks[m];
                                        task.nodeOperate = true;
                                        task.showCheckbox = true;
                                        task.checked = false;
                                        if (modelprojectdata[k].Tasks[m].MXLJ != null && modelprojectdata[k].Tasks[m].MXLJ != "") {
                                            task.disabled = false;
                                        }
                                        else {
                                            task.disabled = true;
                                        }
                                        projectchild.push(task);
                                    }
                                }
                                if (projectchild.length > 0) {
                                    modelprojectlistyear[i].children[j].children = projectchild;
                                }

                                break;
                            }
                        }
                    }
                }

                tree.reload('areaprojectlistid', { data: modelprojectlistarea });
                tree.reload('yearprojectlistid', { data: modelprojectlistyear });

                //搜索
                ProjectSearch();

                //每隔5分钟扫描模型生产是否完成并更新模型生产状态
                setInterval(UpdateModelTask(), 300000);
            }
            else {
                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }
        }, datatype: "json"
    });
};

//节点点击
function ModelProjectNodeClick(obj) {
    if (obj.data.type == "modelproject") {
        if (currentprojectid == null) {
            currentprojectid = obj.data.id;//赋值当前项目id
            currentprojecttitle = obj.data.title;//赋值当前项目标题

            for (var i in modelprojectlistarea) {
                for (var j in modelprojectlistarea[i].children) {
                    if (modelprojectlistarea[i].children[j].id == obj.data.id) {
                        modelprojectlistarea[i].children[j].spread = true;
                    }
                    else {
                        modelprojectlistarea[i].children[j].spread = false;
                    }
                    break;
                }
            }

            for (var i in modelprojectlistyear) {
                for (var j in modelprojectlistyear[i].children) {
                    if (modelprojectlistyear[i].children[j].id == obj.data.id) {
                        modelprojectlistyear[i].children[j].spread = true;
                    }
                    else {
                        modelprojectlistyear[i].children[j].spread = false;
                    }
                    break;
                }
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
                    for (var i in modelprojectlistarea) {
                        modelprojectlistarea[i].spread = false;
                        for (var j in modelprojectlistarea[i].children) {
                            modelprojectlistarea[i].children[j].spread = false;
                            if (modelprojectlistarea[i].children[j].children != undefined && modelprojectlistarea[i].children[j].children.length > 0) {
                                for (var k in modelprojectlistarea[i].children[j].children) {
                                    modelprojectlistarea[i].children[j].children[k].checked = false;
                                }
                            }
                        }
                    }
                    for (var i in modelprojectlistyear) {
                        modelprojectlistyear[i].spread = false;
                        for (var j in modelprojectlistyear[i].children) {
                            modelprojectlistyear[i].children[j].spread = false;
                            if (modelprojectlistyear[i].children[j].children != undefined && modelprojectlistyear[i].children[j].children.length > 0) {
                                for (var k in modelprojectlistyear[i].children[j].children) {
                                    modelprojectlistyear[i].children[j].children[k].checked = false;
                                }
                            }
                        }
                    }

                    isReloadTree = true;//标记重载
                    MarkCurrentProject();
                    isReloadTree = false;//重载后还原


                    RemoveEntitiesInViewer(projectentities);
                    projectentities = [];

                    for (var i in modelprojectlistarea) {
                        for (var j in modelprojectlistarea[i].children) {
                            var modelprojectentity = new Cesium.Entity({
                                id: "PROJECTCENTER_" + modelprojectlistarea[i].children[j].id,
                                position: Cesium.Cartesian3.fromDegrees(modelprojectlistarea[i].children[j].data.ZXJD, modelprojectlistarea[i].children[j].data.ZXWD),
                                billboard: {
                                    image: '../../Resources/img/model/modelprojecticon.png',
                                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                    width: 40,
                                    height: 40,
                                }
                            });
                            projectentities.push(modelprojectentity);
                            AddEntityInViewer(modelprojectentity);

                            var modelprojectentitylabel = new Cesium.Entity({
                                id: "PROJECTCENTER_LABEL_" + modelprojectlistarea[i].children[j].id,
                                position: Cesium.Cartesian3.fromDegrees(modelprojectlistarea[i].children[j].data.ZXJD, modelprojectlistarea[i].children[j].data.ZXWD),
                                label: {
                                    text: modelprojectlistarea[i].children[j].data.XMMC,
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

                            if (modelprojectlistarea[i].children[j].id == currentprojectid) {
                                ZoomToEntity(modelprojectentity);
                            }
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
                //for (var i in modelprojectlistarea) {
                //    for (var j in modelprojectlistarea[i].children) {
                //        if (modelprojectlistarea[i].children[j].id == obj.data.id) {
                //            modelprojectlistarea[i].children[j].spread = !modelprojectlistarea[i].children[j].spread;
                //        }
                //        else {
                //            modelprojectlistarea[i].children[j].spread = false;
                //        }
                //        break;
                //    }
                //}

                //for (var i in modelprojectlistyear) {
                //    for (var j in modelprojectlistyear[i].children) {
                //        if (modelprojectlistyear[i].children[j].id == obj.data.id) {
                //            modelprojectlistyear[i].children[j].spread = !modelprojectlistyear[i].children[j].spread;
                //        }
                //        else {
                //            modelprojectlistyear[i].children[j].spread = false;
                //        }
                //        break;
                //    }
                //}

                //isReloadTree = true;//标记重载
                //MarkCurrentProject();
                //isReloadTree = false;//重载后还原

                for (var i in projectentities) {
                    if (projectentities[i].id == ("PROJECTCENTER_" + currentprojectid)) {
                        ZoomToEntity(projectentities[i]);
                        break;
                    }
                }
            }
        }
    }
    else if (obj.data.type == "modeltask") {
        if (curtileset != null) {
            if (obj.data.id == curtileset.data.Id) {
                if (curtileset.data.MXSJ != undefined && curtileset.data.MXSJ != "") {
                    viewer.scene.camera.setView(JSON.parse(curtileset.data.MXSJ));
                }
                else {
                    viewer.zoomTo(curtileset);
                }
            }
        }
    }
    else {
        if (obj.data.children != null && obj.data.children != undefined) {
            for (var i in modelprojectlistarea) {
                if (modelprojectlistarea[i].id == obj.data.id) {
                    modelprojectlistarea[i].spread = true;
                }
                else {
                    modelprojectlistarea[i].spread = false;
                }
            }

            for (var i in modelprojectlistyear) {
                if (modelprojectlistyear[i].id == obj.data.id) {
                    modelprojectlistyear[i].spread = true;
                }
                else {
                    modelprojectlistyear[i].spread = false;
                }
            }

            isReloadTree = true;//标记重载
            MarkCurrentProject();
            isReloadTree = false;//重载后还原
        }
    }
};

//节点选中or取消选中
function ModelProjectNodeCheck(obj) {
    if (obj.checked) {
        //选中
        if (obj.data.type == "modeltask") {
            if (currentmodelid != null) {
                if (!isReloadTree) {
                    if (curtileset != null) {
                        viewer.scene.primitives.remove(curtileset);//清除当前模型
                        curtileset = null;
                    }

                    for (var i in modelprojectlistarea) {
                        for (var j in modelprojectlistarea[i].children) {
                            if (modelprojectlistarea[i].children[j].id == currentprojectid) {
                                for (var k in modelprojectlistarea[i].children[j].children) {
                                    if (modelprojectlistarea[i].children[j].children[k].id == currentmodelid) {
                                        modelprojectlistarea[i].children[j].children[k].checked = false;
                                    }

                                    if (modelprojectlistarea[i].children[j].children[k].id == obj.data.id) {
                                        modelprojectlistarea[i].children[j].children[k].checked = true;
                                    }
                                }
                                break;
                            }
                        }
                    }

                    for (var i in modelprojectlistyear) {
                        for (var j in modelprojectlistyear[i].children) {
                            if (modelprojectlistyear[i].children[j].id == currentprojectid) {
                                for (var k in modelprojectlistyear[i].children[j].children) {
                                    if (modelprojectlistyear[i].children[j].children[k].id == currentmodelid) {
                                        modelprojectlistyear[i].children[j].children[k].checked = false;
                                    }

                                    if (modelprojectlistyear[i].children[j].children[k].id == obj.data.id) {
                                        modelprojectlistyear[i].children[j].children[k].checked = true;
                                    }
                                }
                                break;
                            }
                        }
                    }

                    isReloadTree = true;//标记重载
                    MarkCurrentProject();
                    isReloadTree = false;//重载后还原
                    currentmodelid = obj.data.id;
                    curtileset = Load3DTiles(obj.data.data);

                    var newprojectentities = [];
                    for (var i in projectentities) {
                        if (projectentities[i].id == ("PROJECTCENTER_" + currentprojectid) || projectentities[i].id == ("PROJECTCENTER_LABEL_" + currentprojectid)) {
                            RemoveEntityInViewer(projectentities[i]);
                        }
                        else {
                            newprojectentities.push(projectentities[i]);
                        }
                    }
                    for (var i in modelprojectlistarea) {
                        for (var j in modelprojectlistarea[i].children) {
                            if (modelprojectlistarea[i].children[j].id == currentprojectid) {
                                var projectlabel = modelprojectlistarea[i].children[j].data.XMMC;
                                var positions = [];
                                positions.push(Cesium.Cartesian3.fromDegrees(modelprojectlistarea[i].children[j].data.ZXJD, modelprojectlistarea[i].children[j].data.ZXWD));
                                viewer.scene.clampToHeightMostDetailed(positions).then(function (clampedCartesians) {
                                    var heights = Cesium.Cartographic.fromCartesian(clampedCartesians[0]).height;
                                    if (heights > 0) {
                                        var modelprojectentity = new Cesium.Entity({
                                            id: "PROJECTCENTER_" + currentprojectid,
                                            position: clampedCartesians[0],
                                            billboard: {
                                                image: '../../Resources/img/model/modelprojecticon.png',
                                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                heightReference: Cesium.HeightReference.NONE,
                                                width: 40,
                                                height: 40,
                                            }
                                        });
                                        newprojectentities.push(modelprojectentity);
                                        AddEntityInViewer(modelprojectentity);

                                        var modelprojectentitylabel = new Cesium.Entity({
                                            id: "PROJECTCENTER_LABEL_" + currentprojectid,
                                            position: clampedCartesians[0],
                                            label: {
                                                text: projectlabel,
                                                font: '20px Times New Roman',
                                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                heightReference: Cesium.HeightReference.NONE,
                                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                scaleByDistance: new Cesium.NearFarScalar(90000, 1, 200000, 0)
                                            }
                                        });
                                        newprojectentities.push(modelprojectentitylabel);
                                        AddEntityInViewer(modelprojectentitylabel);
                                    }
                                    else {
                                        var modelprojectentity = new Cesium.Entity({
                                            id: "PROJECTCENTER_" + currentprojectid,
                                            position: Cesium.Cartesian3.fromDegrees(modelprojectlistarea[i].children[j].data.ZXJD, modelprojectlistarea[i].children[j].data.ZXWD),
                                            billboard: {
                                                image: '../../Resources/img/model/modelprojecticon.png',
                                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                                width: 40,
                                                height: 40,
                                            }
                                        });
                                        newprojectentities.push(modelprojectentity);
                                        AddEntityInViewer(modelprojectentity);

                                        var modelprojectentitylabel = new Cesium.Entity({
                                            id: "PROJECTCENTER_LABEL_" + currentprojectid,
                                            position: Cesium.Cartesian3.fromDegrees(modelprojectlistarea[i].children[j].data.ZXJD, modelprojectlistarea[i].children[j].data.ZXWD),
                                            label: {
                                                text: modelprojectlistarea[i].children[j].data.XMMC,
                                                font: '20px Times New Roman',
                                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                scaleByDistance: new Cesium.NearFarScalar(90000, 1, 200000, 0)
                                            }
                                        });
                                        newprojectentities.push(modelprojectentitylabel);
                                        AddEntityInViewer(modelprojectentitylabel);
                                    }
                                });
                            }
                        }
                    }
                    projectentities = newprojectentities;

                    if (measurewidget_layerindex != null) {
                        layui.element.tabChange('measureway', 'modelMeasure'); //模型测量
                    }
                }
            }
            else {
                for (var i in modelprojectlistarea) {
                    for (var j in modelprojectlistarea[i].children) {
                        if (modelprojectlistarea[i].children[j].id == currentprojectid) {
                            for (var k in modelprojectlistarea[i].children[j].children) {
                                if (modelprojectlistarea[i].children[j].children[k].id == obj.data.id) {
                                    modelprojectlistarea[i].children[j].children[k].checked = true;
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }

                for (var i in modelprojectlistyear) {
                    for (var j in modelprojectlistyear[i].children) {
                        if (modelprojectlistyear[i].children[j].id == currentprojectid) {
                            for (var k in modelprojectlistyear[i].children[j].children) {
                                if (modelprojectlistyear[i].children[j].children[k].id == obj.data.id) {
                                    modelprojectlistyear[i].children[j].children[k].checked = true;
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }

                currentmodelid = obj.data.id;
                curtileset = Load3DTiles(obj.data.data);
                isReloadTree = true;//标记重载
                MarkCurrentProject();
                isReloadTree = false;//重载后还原 

                var newprojectentities = [];
                for (var i in projectentities) {
                    if (projectentities[i].id == ("PROJECTCENTER_" + currentprojectid) || projectentities[i].id == ("PROJECTCENTER_LABEL_" + currentprojectid)) {
                        RemoveEntityInViewer(projectentities[i]);
                    }
                    else {
                        newprojectentities.push(projectentities[i]);
                    }
                }
                for (var i in modelprojectlistarea) {
                    for (var j in modelprojectlistarea[i].children) {
                        if (modelprojectlistarea[i].children[j].id == currentprojectid) {
                            var projectlabel = modelprojectlistarea[i].children[j].data.XMMC;
                            var positions = [];
                            positions.push(Cesium.Cartesian3.fromDegrees(modelprojectlistarea[i].children[j].data.ZXJD, modelprojectlistarea[i].children[j].data.ZXWD));
                            viewer.scene.clampToHeightMostDetailed(positions).then(function (clampedCartesians) {
                                var heights = Cesium.Cartographic.fromCartesian(clampedCartesians[0]).height;
                                if (heights > 0) {
                                    var modelprojectentity = new Cesium.Entity({
                                        id: "PROJECTCENTER_" + currentprojectid,
                                        position: clampedCartesians[0],
                                        billboard: {
                                            image: '../../Resources/img/model/modelprojecticon.png',
                                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                            heightReference: Cesium.HeightReference.NONE,
                                            width: 40,
                                            height: 40,
                                        }
                                    });
                                    newprojectentities.push(modelprojectentity);
                                    AddEntityInViewer(modelprojectentity);

                                    var modelprojectentitylabel = new Cesium.Entity({
                                        id: "PROJECTCENTER_LABEL_" + currentprojectid,
                                        position: clampedCartesians[0],
                                        label: {
                                            text: projectlabel,
                                            font: '20px Times New Roman',
                                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                            heightReference: Cesium.HeightReference.NONE,
                                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                            scaleByDistance: new Cesium.NearFarScalar(90000, 1, 200000, 0)
                                        }
                                    });
                                    newprojectentities.push(modelprojectentitylabel);
                                    AddEntityInViewer(modelprojectentitylabel);
                                }
                                else {
                                    var modelprojectentity = new Cesium.Entity({
                                        id: "PROJECTCENTER_" + currentprojectid,
                                        position: Cesium.Cartesian3.fromDegrees(modelprojectlistarea[i].children[j].data.ZXJD, modelprojectlistarea[i].children[j].data.ZXWD),
                                        billboard: {
                                            image: '../../Resources/img/model/modelprojecticon.png',
                                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                            width: 40,
                                            height: 40,
                                        }
                                    });
                                    newprojectentities.push(modelprojectentity);
                                    AddEntityInViewer(modelprojectentity);

                                    var modelprojectentitylabel = new Cesium.Entity({
                                        id: "PROJECTCENTER_LABEL_" + currentprojectid,
                                        position: Cesium.Cartesian3.fromDegrees(modelprojectlistarea[i].children[j].data.ZXJD, modelprojectlistarea[i].children[j].data.ZXWD),
                                        label: {
                                            text: projectlabel,
                                            font: '20px Times New Roman',
                                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                            scaleByDistance: new Cesium.NearFarScalar(90000, 1, 200000, 0)
                                        }
                                    });
                                    newprojectentities.push(modelprojectentitylabel);
                                    AddEntityInViewer(modelprojectentitylabel);
                                }
                            });
                        }
                    }
                }
                projectentities = newprojectentities;

                if (measurewidget_layerindex != null) {
                    layui.element.tabChange('measureway', 'modelMeasure'); //模型测量
                }
            }
        }
    }
    else {
        //取消选中
        if (obj.data.type == "modeltask") {
            if (!isReloadTree) {
                if (curtileset != null) {
                    viewer.scene.primitives.remove(curtileset);//清除模型
                    curtileset = null;
                    currentmodelid = null;
                }

                for (var i in modelprojectlistarea) {
                    for (var j in modelprojectlistarea[i].children) {
                        if (modelprojectlistarea[i].children[j].id == currentprojectid) {
                            for (var k in modelprojectlistarea[i].children[j].children) {
                                if (modelprojectlistarea[i].children[j].children[k].id == obj.data.id) {
                                    modelprojectlistarea[i].children[j].children[k].checked = false;
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }

                for (var i in modelprojectlistyear) {
                    for (var j in modelprojectlistyear[i].children) {
                        if (modelprojectlistyear[i].children[j].id == currentprojectid) {
                            for (var k in modelprojectlistyear[i].children[j].children) {
                                if (modelprojectlistyear[i].children[j].children[k].id == obj.data.id) {
                                    modelprojectlistyear[i].children[j].children[k].checked = false;
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }

                isReloadTree = true;//标记重载
                MarkCurrentProject();
                isReloadTree = false;//重载后还原

                var newprojectentities = [];
                for (var i in projectentities) {
                    if (projectentities[i].id == ("PROJECTCENTER_" + currentprojectid) || projectentities[i].id == ("PROJECTCENTER_LABEL_" + currentprojectid)) {
                        RemoveEntityInViewer(projectentities[i]);
                    }
                    else {
                        newprojectentities.push(projectentities[i]);
                    }
                }
                for (var i in modelprojectlistarea) {
                    for (var j in modelprojectlistarea[i].children) {
                        if (modelprojectlistarea[i].children[j].id == currentprojectid) {
                            var projectlabel = modelprojectlistarea[i].children[j].data.XMMC;

                            var modelprojectentity = new Cesium.Entity({
                                id: "PROJECTCENTER_" + currentprojectid,
                                position: Cesium.Cartesian3.fromDegrees(modelprojectlistarea[i].children[j].data.ZXJD, modelprojectlistarea[i].children[j].data.ZXWD),
                                billboard: {
                                    image: '../../Resources/img/model/modelprojecticon.png',
                                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                    width: 40,
                                    height: 40,
                                }
                            });
                            newprojectentities.push(modelprojectentity);
                            AddEntityInViewer(modelprojectentity);

                            var modelprojectentitylabel = new Cesium.Entity({
                                id: "PROJECTCENTER_LABEL_" + currentprojectid,
                                position: Cesium.Cartesian3.fromDegrees(modelprojectlistarea[i].children[j].data.ZXJD, modelprojectlistarea[i].children[j].data.ZXWD),
                                label: {
                                    text: projectlabel,
                                    font: '20px Times New Roman',
                                    backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                    pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                    scaleByDistance: new Cesium.NearFarScalar(90000, 1, 200000, 0)
                                }
                            });
                            newprojectentities.push(modelprojectentitylabel);
                            AddEntityInViewer(modelprojectentitylabel);
                        }
                    }
                }
                projectentities = newprojectentities;

                if (measurewidget_layerindex != null) {
                    layui.element.tabChange('measureway', 'terrainMeasure'); //地形测量
                }
            }
        }
    }
};

//节点操作
function ModelProjectNodeOperate(obj) {
    if (obj.data.type == 'modelproject') {
        //项目
        if (obj.type == 'add') {
            ViewModelProject(obj.data.data);//查看项目
        }
        else if (obj.type == 'update') {
            EditModelProject(obj.data.data);//编辑项目
        }
        else if (obj.type == 'del') {
            DeleteModelProject(obj.data.id);//删除项目
        }
    }
    else if (obj.data.type == 'modeltask') {
        //模型
        if (obj.type == 'add') {
            ViewModelTask(obj.data.data);//查看模型
        }
        else if (obj.type == 'update') {
            EditModelTask(obj.data.data);//编辑模型
        }
        else if (obj.type == 'del') {
            DeleteModelTask(obj.data.id);//删除模型
        }
    }
};