﻿//弹出项目列表widget
var layerYouCeTanChuIndex = null;
var layerZuoCeTanChuIndex = null;
var monitorinfos = [];
var projectLieBiaoIndex = layer.open({
    type: 1
    , title: ['项目', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
    , area: ['250px', '700px']
    , shade: 0
    , offset: ['60px', '5px']
    , closeBtn: 0
    , maxmin: true
    , move: false
    ,resize:false
   // , moveOut: true
    , content: '<!--项目列表--><div  class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">    <!--选项卡-->    <ul class="layui-tab-title">        <li lay-id="111" class="layui-this" style="width:30%;padding-top: 10px;">项目列表</li>        <li lay-id="222" style="width:30%;padding-top: 10px;">图层列表</li>    </ul>    <!--tree-->    <div class="layui-tab-content" style="padding:0px;">        <div class="layui-tab-item layui-show" id="monitorprojectbyarea"></div>        <div class="layui-tab-item" id="prjlayerlist"></div>    </div></div>',
     zIndex: 2
    , success: function (layero) {
        layer.setTop(layero);
        GetUserProjects();
     
    },
    min: function () { //点击最小化后的回调函数
        xianZuoDaKai();
        return;
    },
    restore: function () { //监听还原窗口restore方法
        
    }

});


//var projectdatagrouptime = [];//按时间组织
var projectdatagrouparea = [];//按地区组织

elem.on('tab(docDemoTabBrief)', function (data) {
    if (this.getAttribute('lay-id') == "222" && currentprojectid == null) {
        layer.msg('请先选择项目');
        elem.tabChange('docDemoTabBrief', 111); //跳转地址图层列表
    }
})

//获取项目列表
function GetUserProjects() {
    $.ajax({
        url: servicesurl + "/api/MonitorProject/GetUserProjectList", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            if (data == "") {
                layer.msg("无项目信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                //document.getElementById("monitorprojectbytime").innerHTML = "无项目信息";
                document.getElementById("monitorprojectbyarea").innerHTML = "无项目信息";
            }
            else {
                //document.getElementById("monitorprojectbytime").innerHTML = "";
                document.getElementById("monitorprojectbyarea").innerHTML = "";
                var projectlist = JSON.parse(data);

                //构造项目列表数据
               // projectdatagrouptime = [];      //按时间组织
                projectdatagrouparea = [];      //按地区组织

                //var years = [];                 //所有年份
                var areas = [];                 //所有地区

                for (var i in projectlist) {
                    //var year = projectlist[i].XMKSSJ.substr(0, 4);
                    var area = projectlist[i].XZQBM.substr(0, 6);
                    //if (years.indexOf(year) == -1) {
                    //    years.push(year);
                    //}
                    if (areas.indexOf(area) == -1) {
                        areas.push(area);
                    }
                }

                //升序排序
                //years.sort();
                areas.sort();

                //for (var i in years) {
                //    var father = new Object;
                //    father.title = years[i];
                //    if (i == 0) {
                //        //默认展开第一项
                //        father.spread = true;
                //    }
                //    else {
                //        father.spread = false;
                //    }
                //    var children = [];
                //    for (var j in projectlist) {
                //        if (projectlist[j].XMKSSJ.substr(0, 4) == years[i]) {
                //            var son = new Object;
                //            son.title = projectlist[j].ZHDMC;
                //            son.xmmc = projectlist[j].XMMC;
                //            son.type = projectlist[j].ZHLX;
                //            if (projectlist[j].ZHLX == 0) {
                //                son.icon = ROCKFALLICON;
                //            }
                //            else if (projectlist[j].ZHLX == 1) {
                //                son.icon = LANDSLIDEICON;
                //            }
                //            son.id = projectlist[j].Id;
                //            children.push(son);
                //        }
                //    }
                //    father.children = children;
                //    projectdatagrouptime.push(father);
                //}

                for (var i in areas) {
                    var father = new Object;
                    if ((xjxzqs != null) && (xjxzqs.length > 0)) {
                        //行政区编码转行政区名称
                        for (var j in xjxzqs) {
                            if (areas[i] == xjxzqs[j].value) {
                                father.title = xjxzqs[j].name;
                            }
                        }
                    }
                    else {
                        father.title = areas[i];
                    }

                    if (i == 0) {
                        //默认展开第一项
                        father.spread = true;
                    }
                    else {
                        father.spread = false;
                    }
                    var children = [];
                    for (var j in projectlist) {
                        if (projectlist[j].XZQBM.substr(0, 6) == areas[i]) {
                            var son = new Object;
                            son.nodeOperate = true;
                            son.title = projectlist[j].ZHDMC;
                            son.xmmc = projectlist[j].XMMC;
                            son.type = projectlist[j].ZHLX;
                            if (projectlist[j].ZHLX == 0) {
                                son.icon = ROCKFALLICON;
                            }
                            else if (projectlist[j].ZHLX == 1) {
                                son.icon = LANDSLIDEICON;
                            }
                            son.id = projectlist[j].Id;
                            children.push(son);
                        }
                    }
                    father.children = children;
                    projectdatagrouparea.push(father);
                }

                //按时间渲染
                //tree.render({
                //    elem: '#monitorprojectbytime'
                //    , data: projectdatagrouptime
                //    , edit: ['add', 'update', 'del']
                //    , accordion: true
                //    , cancelNodeFileIcon: true
                //    , click: function (obj) {
                //        ProjectNodeClick(obj);
                //    }
                //    , operate: function (obj) {
                //        ProjectNodeOperate(obj);
                //    }
                //});

                //按地区渲染
                tree.render({
                    elem: '#monitorprojectbyarea'
                    , data: projectdatagrouparea
                    , edit: ['add', 'update', 'del']
                    , customOperate: true
                    , accordion: true
                    , cancelNodeFileIcon: true
                    , click: function (obj) {
                        ProjectNodeClick(obj);
                    }
                    , operate: function (obj) {
                        ProjectNodeOperate(obj);
                    }
                });

                projectentities = [];                   //项目位置及标注
                var bs = [];//纬度集合
                var ls = [];//经度集合
                for (var i in projectlist) {
                    var projectzhlx = null;
                    for (var j in zhlxs) {
                        if (projectlist[i].ZHLX == zhlxs[j].value) {
                            projectzhlx = zhlxs[j].name;
                        }
                    }

                    if (projectzhlx != null) {
                        if (projectzhlx == "危岩崩塌") {
                            var projectentity = new Cesium.Entity({
                                id: "PROJECTCENTER_" + projectlist[i].Id,
                                position: Cesium.Cartesian3.fromDegrees(projectlist[i].ZXJD, projectlist[i].ZXWD),
                                billboard: {
                                    image: '../../Resources/img/map/project_type_rockfall.png',
                                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                    width: 40,
                                    height: 40,
                                    scaleByDistance: new Cesium.NearFarScalar(200, 1, 30000000, 0),
                                }
                            });
                            projectentities.push(projectentity);
                        }
                        else if (projectzhlx == "滑坡") {
                            var projectentity = new Cesium.Entity({
                                id: "PROJECTCENTER_" + projectlist[i].Id,
                                position: Cesium.Cartesian3.fromDegrees(projectlist[i].ZXJD, projectlist[i].ZXWD),
                                billboard: {
                                    image: '../../Resources/img/map/project_type_landslide.png',
                                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                    width: 40,
                                    height: 40,
                                    scaleByDistance: new Cesium.NearFarScalar(200, 1, 30000000, 0),
                                }
                            });
                            projectentities.push(projectentity);
                        }
                        else {
                            var projectentity = new Cesium.Entity({
                                id: "PROJECTCENTER_" + projectlist[i].Id,
                                position: Cesium.Cartesian3.fromDegrees(projectlist[i].ZXJD, projectlist[i].ZXWD),
                                billboard: {
                                    image: '../../Resources/img/map/marker.png',
                                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                    width: 40,
                                    height: 40,
                                    scaleByDistance: new Cesium.NearFarScalar(200, 1, 30000000, 0),
                                }
                            });
                            projectentities.push(projectentity);
                        }

                        var projectentitylabel = new Cesium.Entity({
                            id: "PROJECTCENTER_" + projectlist[i].Id + "_LABEL",
                            position: Cesium.Cartesian3.fromDegrees(projectlist[i].ZXJD, projectlist[i].ZXWD),
                            label: {
                                text: projectlist[i].ZHDMC,
                                font: '20px Times New Roman',
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                scaleByDistance: new Cesium.NearFarScalar(200, 1, 200000, 0),
                            }
                        });

                        projectentities.push(projectentitylabel);

                        bs.push(projectlist[i].ZXWD);
                        ls.push(projectlist[i].ZXJD);
                    }
                }

                if ((bs.length > 0) && (ls.length > 0)) {
                    //缩放至项目范围
                    setTimeout(() => {
                        FlytoExtent(Math.min.apply(null, ls) - 0.5, Math.min.apply(null, bs) - 0.5, Math.max.apply(null, ls) + 0.5, Math.max.apply(null, bs) + 0.5)
                    }, 3000);
                }
            }
        }, datatype: "json"
    });
};

//节点操作（点击）
function ProjectNodeClick(obj) {
    if (JSON.stringify(obj.data.id) == undefined) {
        //表示父节点则无操作
    }
    else {
        layer.confirm('<p style="font-size:16px">是否确定将以下项目作为系统当前项目？</p><br/><p style="font-size:24px;font-weight:bold;text-align:center;">' + JSON.stringify(obj.data.title).replace(/\"/g, "") + '</p>', { title: ['消息提示', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei;background-color:#68bc80'], area: ['400px', '250px'], shade: 0.5, shadeClose: true, closeBtn: 0, resize: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } }, function (index) {

            if (JSON.stringify(obj.data.id) != currentprojectid) {
                currentprojectid = JSON.stringify(obj.data.id);                             //更新当前项目id
                currentprojectdisastertype = JSON.stringify(obj.data.type);                         //更新当前项目灾害类型
                document.getElementById("currentproject").style.visibility = "visible";
                document.getElementById("currentproject").innerHTML = "<option>" + JSON.stringify(obj.data.xmmc).replace(/\"/g, "") + "</option><option>清除当前项目</option>";
                //最小化项目按钮
                
                //TODO请求项目相关信息（图层、监测点）
                GetProjectMonitor(currentprojectid);
                //预加载项目设备统计信息
                GetPreProjectDatas(currentprojectid, 0);
                //切换项目删除模型
                if (curtileset != null) {
                    viewer.scene.primitives.remove(curtileset);
                    modleInfo = null;
                }

                //监听清除当前项目操作
                $(() => {
                    $('#currentprojectoperate select').change(() => {
                        if ($('#currentprojectoperate select').val() == "清除当前项目") {
                            document.getElementById("currentproject").innerHTML = "";
                            document.getElementById("currentproject").style.visibility = "hidden";
                            currentprojectid = null;

                            CloseAllLayer();                               //关闭弹出图层
                            viewer.entities.removeAll();
                            AddEntitiesInViewer(projectentities);
                            elem.tabChange('docDemoTabBrief', 111); //跳转地址图层列表
                        }
                    });
                });
                //获取entity
                var projectentity = null;
                var projectentitylabel = null;
                if (projectentities.length > 0) {
                    for (var i in projectentities) {
                        if (projectentities[i].id == "PROJECTCENTER_" + currentprojectid) {
                            projectentity = projectentities[i];
                        }
                        if (projectentities[i].id == "PROJECTCENTER_" + currentprojectid + "_LABEL") {
                            projectentitylabel = projectentities[i];
                        }
                    }
                }

                //清除entity
                viewer.entities.removeAll();
                CloseAllLayer();

                //添加及定位entity
                if ((projectentity != null) && (projectentitylabel != null)) {
                    viewer.entities.add(projectentity);
                    viewer.entities.add(projectentitylabel);

                    viewer.flyTo([projectentity, projectentitylabel], { duration: 5, offset: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-80), 3000) });
                }
                //直接请求图层出来了
                setTimeout(() => {
                    LoadLayerListLayer(currentprojectid);
                    elem.tabChange('docDemoTabBrief', 222); //跳转地址图层列表
                }, 1000);

            }

            layer.close(index);
        });
    }
};

//节点操作(查看、编辑、删除)
function ProjectNodeOperate(obj) {
    if (obj.type === 'add') {
        //查看项目
        if ((projectinfoaddlayerindex == null) && (projectinfoeditlayerindex == null)) {
            ProjectInfo(obj.data.id, "view");
        }
        else {
            layer.confirm('是否打开新的模块?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                CloseProjectinfoLayer();
                ProjectInfo(obj.data.id, "view");
                layer.close(index);
            });
        }
    } else if (obj.type === 'update') {
        //编辑项目
        if ((projectinfoaddlayerindex == null) && (projectinfoviewlayerindex == null)) {
            ProjectInfo(obj.data.id, "edit");
        }
        else {
            layer.confirm('是否打开新的模块?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                CloseProjectinfoLayer();
                ProjectInfo(obj.data.id, "edit");
                layer.close(index);
            });
        }
    } else if (obj.type === 'del') {
        //删除项目
        $.ajax({
            url: servicesurl + "/api/MonitorProject/DeleteProject", type: "delete", data: { "id": obj.data.id, "cookie": document.cookie },
            success: function (data) {
                layer.msg(data, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });


                if ((currentprojectid == null) || (obj.data.id != currentprojectid)) {
                    for (var i in projectentities) {
                        if ((projectentities[i].id == "PROJECTCENTER_" + obj.data.id) || (projectentities[i].id == "PROJECTCENTER_" + obj.data.id + "_LABEL")) {
                            if (viewer.entities.contains(projectentities[i])) {
                                viewer.entities.remove(projectentities[i]);
                            }

                            projectentities.remove(projectentities[i]);
                        }
                    }
                }
                else {
                    document.getElementById("currentproject").innerHTML = "";
                    document.getElementById("currentproject").style.visibility = "hidden";
                    currentprojectid = null;

                    CloseAllLayer();                               //关闭弹出图层
                    viewer.entities.removeAll();

                    for (var i in projectentities) {
                        if ((projectentities[i].id == "PROJECTCENTER_" + obj.data.id) || (projectentities[i].id == "PROJECTCENTER_" + obj.data.id + "_LABEL")) {
                            projectentities.remove(projectentities[i]);
                        }
                    }

                    AddEntitiesInViewer(projectentities);
                }

            }, datatype: "json"
        });
    };
}



//关闭弹出图层
function CloseAllLayer() {
    if (projectinfoviewlayerindex != null) {
        layer.close(projectinfoviewlayerindex);
        projectinfoviewlayerindex = null;
    }
    if (projectinfoaddlayerindex != null) {
        layer.close(projectinfoaddlayerindex);
        projectinfoaddlayerindex = null;
    }
    if (projectinfoeditlayerindex != null) {
        layer.close(projectinfoeditlayerindex);
        projectinfoeditlayerindex = null;
    }
    if (projectlayerlistlayerindex != null) {
        layer.close(projectlayerlistlayerindex);
        projectlayerlistlayerindex = null;
    }
    if (automonitordatalayerindex != null) {
        layer.close(automonitordatalayerindex);
        automonitordatalayerindex = null;
    }
    if (automonitordevicelayerindex != null) {
        layer.close(automonitordevicelayerindex);
        automonitordevicelayerindex = null;
    }
    if (warninganalysislayerindex != null) {
        layer.close(warninganalysislayerindex);
        warninganalysislayerindex = null;
    }
    if (automonitoreltlayerindex != null) {
        layer.close(automonitoreltlayerindex);
        automonitoreltlayerindex = null;
    }

    //TODO更多关闭图层
};

//关闭项目信息相关图层
function CloseProjectinfoLayer() {
    if (projectinfoviewlayerindex != null) {
        layer.close(projectinfoviewlayerindex);
        projectinfoviewlayerindex = null;
    }
    if (projectinfoaddlayerindex != null) {
        layer.close(projectinfoaddlayerindex);
        projectinfoaddlayerindex = null;
    }
    if (projectinfoeditlayerindex != null) {
        layer.close(projectinfoeditlayerindex);
        projectinfoeditlayerindex = null;
    }
}


//获取项目监测点树
function GetProjectMonitor(projectid) {
    currentprojectmonitors = [];
    currentprojectfristmonitor = null;

    $.ajax({
        url: servicesurl + "/api/Monitor/GetMonitor", type: "get", data: { "id": projectid, "cookie": document.cookie },
        success: function (data) {
            monitorinfos = JSON.parse(data);

            var disasterinfo = [];//灾害体
            var methodinfo = [];//监测方法
            var sectioninfo = [];//监测剖面

            //获取灾害体、监测方法、监测剖面
            for (var i in monitorinfos) {
                if (monitorinfos[i].DisasterString != null) {
                    if (disasterinfo.length != 0) {
                        var isin = false;
                        for (var j in disasterinfo) {
                            if (disasterinfo[j].id == monitorinfos[i].DisasterString.Id) {
                                isin = true;
                                break;
                            }
                        }

                        if (!isin) {
                            var di = new Object;
                            di.title = monitorinfos[i].DisasterString.ZHTBH;
                            di.id = monitorinfos[i].DisasterString.Id;
                            di.checked = false;
                            disasterinfo.push(di);
                        }
                    }
                    else {
                        var di = new Object;
                        di.title = monitorinfos[i].DisasterString.ZHTBH;
                        di.id = monitorinfos[i].DisasterString.Id;
                        di.checked = false;
                        disasterinfo.push(di);
                    }
                }

                if (monitorinfos[i].SectionString != null) {
                    if (sectioninfo.length != 0) {
                        var isin = false;
                        for (var j in sectioninfo) {
                            if (sectioninfo[j].id == monitorinfos[i].SectionString.Id) {
                                isin = true;
                                break;
                            }
                        }

                        if (!isin) {
                            var si = new Object;
                            si.title = monitorinfos[i].SectionString.PMBH;
                            si.id = monitorinfos[i].SectionString.Id;
                            si.checked = false;
                            sectioninfo.push(si);
                        }
                    }
                    else {
                        var si = new Object;
                        si.title = monitorinfos[i].SectionString.PMBH;
                        si.id = monitorinfos[i].SectionString.Id;
                        si.checked = false;
                        sectioninfo.push(si);
                    }
                }

                if (monitorinfos[i].MonitorString != null) {
                    if (methodinfo.length != 0) {
                        var isin = false;
                        for (var j in methodinfo) {
                            if (methodinfo[j].title == monitorinfos[i].MonitorString.JCFF) {
                                isin = true;
                                break;
                            }
                        }

                        if (!isin) {
                            var mi = new Object;
                            mi.title = monitorinfos[i].MonitorString.JCFF;
                            mi.id = monitorinfos[i].MonitorString.Id;
                            mi.checked = false;
                            if (monitorinfos[i].MonitorString.JCFF != "声光预警") {
                                methodinfo.push(mi);
                            }
                        }
                    }
                    else {
                        var mi = new Object;
                        mi.title = monitorinfos[i].MonitorString.JCFF;
                        mi.id = monitorinfos[i].MonitorString.Id;
                        mi.checked = false;
                        if (monitorinfos[i].MonitorString.JCFF != "声光预警") {
                            methodinfo.push(mi);
                        }
                    }
                }
            }

            disasterinfo.sort();
            methodinfo.sort();
            sectioninfo.sort();

            //按不同分类组合监测点
            for (var i in monitorinfos) {
                if (monitorinfos[i].MonitorString.JCZLX != "GNSS基准站") {
                    if (monitorinfos[i].MonitorString != null) {
                        var mi = new Object;
                        mi.title = monitorinfos[i].MonitorString.JCDBH;
                        mi.id = monitorinfos[i].MonitorString.Id;
                        mi.type = monitorinfos[i].MonitorString.JCFF;//监测方法

                        if (monitorinfos[i].DisasterString != null) {
                            for (var j in disasterinfo) {
                                if (monitorinfos[i].DisasterString.Id == disasterinfo[j].id) {
                                    if (disasterinfo[j].children == null) {
                                        var child = [];
                                        child.push(mi);
                                        disasterinfo[j].children = child;
                                        if (j == 0) {
                                            disasterinfo[j].spread = true;
                                            currentprojectfristmonitor = mi;
                                        }
                                    }
                                    else {
                                        disasterinfo[j].children.push(mi);
                                    }
                                }
                            }
                        }

                        if (monitorinfos[i].SectionString != null) {
                            for (var j in sectioninfo) {
                                if (monitorinfos[i].SectionString.Id == sectioninfo[j].id) {
                                    if (sectioninfo[j].children == null) {
                                        var child = [];
                                        child.push(mi);
                                        sectioninfo[j].children = child;
                                    }
                                    else {
                                        sectioninfo[j].children.push(mi);
                                    }
                                }
                            }
                        }

                        for (var j in methodinfo) {
                            if (monitorinfos[i].MonitorString.JCFF == methodinfo[j].title) {
                                if (methodinfo[j].children == null) {
                                    var child = [];
                                    child.push(mi);
                                    methodinfo[j].children = child;
                                }
                                else {
                                    methodinfo[j].children.push(mi);
                                }
                            }
                        }
                    }
                }
            }

            //按灾害体构建监测点树
            var monitorbydisaster = new Object;
            monitorbydisaster.title = "按灾害体分类";
            monitorbydisaster.children = disasterinfo;
            monitorbydisaster.spread = true;
            currentprojectmonitors.push(monitorbydisaster);
            //按监测方法构建监测点树
            var monitorbymethod = new Object;
            monitorbymethod.title = "按监测方法分类";
            monitorbymethod.children = methodinfo;
            currentprojectmonitors.push(monitorbymethod);
            //按监测剖面构建监测点树
            var monitorbysection = new Object;
            monitorbysection.title = "按监测剖面分类";
            monitorbysection.children = sectioninfo;
            currentprojectmonitors.push(monitorbysection);
        }, datatype: "json"
    });
};


//缩放至项目范围xianYouDaKai
function FlytoExtent(west, south, east, north) {
    viewer.camera.flyTo({
        destination: new Cesium.Rectangle.fromDegrees(west, south, east, north)
    }, { duration: 3 });

    if (projectentities.length > 0) {
        setTimeout(() => {
            AddEntitiesInViewer(projectentities)
        }, 3000);
    }
};

//向右打开
function xianYouDaKai() {
    //打开的第一个页面id是这个。
    layer.restore(projectLieBiaoIndex);
    $("#layui-layer1").show(); 
    $("#layui-layer1").css({
        'top': '60px',
        'left': '5px'
    })
    if (layerYouCeTanChuIndex != null) {
        layer.close(layerYouCeTanChuIndex);
        layerYouCeTanChuIndex = null;
    }
};
//向左关闭
function xianZuoDaKai() {
    $("#layui-layer1").hide();
    layerYouCeTanChuIndex = layer.open({
        type: 1,
        title: false,
        content: '<button type="button" onclick="xianYouDaKai()"  title="展开" style="opacity: 0.4" class="layui-btn layui-btn-primary"><i class="layui-icon layui-icon-next"></i></button>',
        offset: ['62px', '0px'],
        area: ['60px', '40px'],
        closeBtn: 0
        , shade: 0
        , maxmin: false
        , skin: 'shadows',
        zIndex: layer.zIndex
    });

    if (layerZuoCeTanChuIndex != null) {
        layer.close(layerZuoCeTanChuIndex);
        layerZuoCeTanChuIndex = null;
    }
}; 
