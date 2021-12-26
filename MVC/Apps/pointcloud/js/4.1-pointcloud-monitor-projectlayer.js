//弹出项目列表widget
layer.open({
    type: 1
    , title: ['项目列表', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
    , area: ['350px', '450px']
    , shade: 0
    , offset: ['60px', '10px']
    , closeBtn: 0
    , shift: 3
    , maxmin: true
    , moveOut: true
    , content:'<!--工具栏--><div class="layui-row" style="position:absolute;top:5px;width:100%">    <!--搜索-->    <div class="layui-col-md6" style="width:70%">        <div class="grid-demo grid-demo-bg1">            <input type="text" id="projectfilter" lay-verify="title" autocomplete="off" placeholder="搜索" class="layui-input" style="left:30px;height:30px;padding-left:35px;border-radius:5px">        </div>    </div>    <!--创建项目-->    <div class="layui-col-md2" style="width:10%">        <div class="grid-demo">            <button id="projectadd" type="button" class="layui-btn layui-btn-primary layui-btn-sm" style="border-style:hidden;float:right"><i class="layui-icon layui-icon-add-circle" style="margin-right:0px"></i></button>        </div>    </div>    <!--选择文件-->    <div class="layui-col-md2" style="width:10%">        <div class="grid-demo">            <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" id="selectpcdata" style="border-style:hidden;float:right"><i class="layui-icon layui-icon-file-b" style="margin-right:0px"></i></button>        </div>    </div>    <!--文件上传-->    <div class="layui-col-md2" style="width:10%">        <div class="grid-demo">            <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" id="startupload" style="border-style:hidden;float:right"><i class="layui-icon layui-icon-upload-circle" style="margin-right:0px"></i></button>        </div>    </div></div><!--项目列表--><div class="layui-tab layui-tab-brief" lay-filter="projectListTab"     style="margin-top:30px">    <!--选项卡-->    <ul class="layui-tab-title">        <li lay-id="list_1" class="layui-this" style="width:40%;padding-top: 3px;">监测项目列表</li>        <li lay-id="list_2" class="layui-this" style="width:40%;padding-top: 3px;">点云分析</li>    </ul>    <!--tree-->    <div class="layui-tab-content">        <div class="layui-tab-item layui-show" id="projectbyname"></div>        <div class="layui-tab-item" id="projectpointcloud"></div>    </div></div>'
    , zIndex: layer.zIndex
    , success: function (layero) {
        layer.setTop(layero);
        ProjectList();
    }
});
var projectdatagrouparea = [];//按地区组织
var currentmonitorprojectid = null;
//获取点云关联监测项目
function ProjectList() {
    $.ajax({
        url: servicesurl + "/api/PointCloud_MointorProject/GetPointCloud_MointorProjectList", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            if (data == "") {
                layer.msg("无项目信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                document.getElementById("projectbyname").innerHTML = "无项目信息";
                document.getElementById("projectpointcloud").innerHTML = "无点云分析信息";
            }
            else {
                document.getElementById("projectbyname").innerHTML = "";
                document.getElementById("projectpointcloud").innerHTML = "";
                var projectlist = JSON.parse(data);
                var areas = [];                 //所有地区
                for (var i in projectlist) {
                    var area = projectlist[i].XZQBM.substr(0, 6);
                    if (areas.indexOf(area) == -1) {
                        areas.push(area);
                    }
                }
                //升序排序

                areas.sort();
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
                //按地区渲染
                tree.render({
                    elem: '#projectbyname'
                    , data: projectdatagrouparea
                    , edit: ['add']
                    , customOperate: true
                    , accordion: true
                    , click: function (obj) {
                        currentmonitorprojectid = obj.data.id;
                        elem.tabChange('projectListTab', 'list_2'); //跳转地址图层列表
                        PointCloudProjectList(currentmonitorprojectid);
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
}

//缩放至项目范围
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

//获取点云项目树形LAYUI
function PointCloudProjectList(id) {
    $.ajax({
        url: servicesurl + "/api/PointCloudProject/GetPCloudProjectList", type: "get", data: { "id": id, "cookie": document.cookie },
        success: function (data) {


            if (data == "") {
                layer.msg("无项目信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }
            else {
                layerlist = JSON.parse(data);
                console.log(layerlist);
                layers = [];//图层列表数据
                //构建项目树
                if (layerlist.PCloudProjectList != null) {
                    for (var i in layerlist.PCloudProjectList) {
                        var project = new Object;
                        project.title = layerlist.PCloudProjectList[i].XMMC;
                        project.type = 'project';
                        project.id = layerlist.PCloudProjectList[i].Id;
                        if (i == 0) {
                            //默认展开第一项
                            project.spread = true;
                        }
                        else {
                            project.spread = false;
                        }
                        var projectchild = [];
                        //项目区域
                        for (var j in layerlist.PCloudProjectList[i].RegionList) {
                            if (layerlist.PCloudProjectList[i].RegionList[j] != null) {
                                var regionchild = [];
                                regionchild.title = layerlist.PCloudProjectList[i].RegionList[j].RegionName;
                                regionchild.id = layerlist.PCloudProjectList[i].RegionList[j].Id;
                                regionchild.type = 'region';
                                var regionchildson = [];
                                for (var n in layerlist.PCloudProjectList[i].RegionList[j].PCloudDataList) {
                                    if (layerlist.PCloudProjectList[i].RegionList[j].PCloudDataList[n] != null) {
                                        var pcdata = new Object;
                                        pcdata.title = layerlist.PCloudProjectList[i].RegionList[j].PCloudDataList[n].CJSJ.substring(0, 10);
                                        pcdata.id = layerlist.PCloudProjectList[i].RegionList[j].PCloudDataList[n].Id;
                                        pcdata.type = 'pcdata';
                                        pcdata.checked = false;
                                        //   pcdata.showCheckbox = true;//显示复选框
                                        regionchildson.push(pcdata);
                                        regionchild.children = regionchildson;
                                        regionchild.push(regionchildson);
                                    }
                                }
                                projectchild.children = regionchild;
                                projectchild.push(regionchild)
                            }

                        }

                        //三维实景模型
                        if (layerlist.PCloudProjectList[i].surModels != null) {
                            var prjsurmodel = new Object;
                            prjsurmodel.type = 'surModel'
                            prjsurmodel.title = layerlist.PCloudProjectList[i].surModels.Title;
                            var prjsurmodelchild = [];
                            modleInfoList = layerlist.PCloudProjectList[i].surModels.SurModelList;//把模型的值存起来
                            for (var z in layerlist.PCloudProjectList[i].surModels.SurModelList) {
                                var surmodel = new Object;
                                surmodel.title = layerlist.PCloudProjectList[i].surModels.SurModelList[z].MXSJ;
                                surmodel.id = "PROJECTSUMODEL_" + layerlist.PCloudProjectList[i].surModels.SurModelList[z].Id;
                                surmodel.type = "project_surModel";
                                surmodel.path = layerlist.PCloudProjectList[i].surModels.SurModelList[z].MXLJ;
                                surmodel.projectid = layerlist.PCloudProjectList[i].Id;
                                surmodel.checked = false;
                                surmodel.showCheckbox = true;//显示复选框
                                prjsurmodelchild.push(surmodel);
                            }
                            prjsurmodel.children = prjsurmodelchild;

                            projectchild.children = prjsurmodel;
                            projectchild.push(prjsurmodel);
                        }

                        project.children = projectchild
                        layers.push(project);
                    }
                }

                tree.render({
                    elem: '#projectpointcloud'
                    , id: 'poingtcloudprjlayerlistid'
                    , showCheckbox: true
                    , customCheckbox: true
                    , customOperate: false
                    , showLine: true
                    , isImageTree: true
                    , data: layers
                    , edit: ['add', 'update', 'del']
                    , accordion: true
                    , click: function (obj) {
                        PointCloudProjectNodeClick(obj);
                    }
                    , operate: function (obj) {
                        PointCloudProjectNodeOperate(obj);
                    }
                    , oncheck: function (obj) {
                        PointCloudProjectNodeCheck(obj);
                    }
                });
            }
        }, datatype: "json"
    });
}


//向viewer添加entity
function AddEntityInViewer(entity) {
    if (entity != null) {
        viewer.entities.add(entity);
    }
};
//向viewer添加entity集合
function AddEntitiesInViewer(entities) {
    if (entities.length > 0) {
        for (var i in entities) {
            if (entities[i] != null) {
                viewer.entities.add(entities[i]);
            }
        }
    }
};


function ProjectNodeOperate(obj) {
    var id = obj.data.id;
    if (obj.type=="add") {

            //查看项目信息
            if (projectinfoviewlayerindex == null) {
                projectinfoviewlayerindex = layer.open({
                    type: 1
                    , title: ['项目信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                    , area: ['900px', '700px']
                    , shade: 0
                    , offset: 'auto'
                    , closeBtn: 1
                    , anim: 0
                    , maxmin: true
                    , moveOut: true
                    , content:'<!--查看项目--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px 0px">    <ul class="layui-tab-title">        <li class="layui-this">基本信息</li>    </ul>    <div class="layui-tab-content" style="margin:0px 0px">        <!--基本信息-->        <div class="layui-tab-item layui-show">            <form class="layui-form" style="margin-top:0px" lay-filter="projectinfoviewform">                <div class="layui-form-item">                    <label class="layui-form-label">项目名称</label>                    <div class="layui-input-block">                        <input type="text" name="xmmc" class="layui-input" readonly="readonly" />                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">项目编码</label>                                <div class="layui-input-block">                                    <input type="text" name="xmbm" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo">                                <label class="layui-form-label">项目类型</label>                                <div class="layui-input-block">                                    <input type="text" name="xmlx" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">项目类别</label>                                <div class="layui-input-block">                                    <input type="text" name="xmlb" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md4" style="width:25%">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">中心经度</label>                                <div class="layui-input-block">                                    <input type="text" name="zxjd" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4" style="width:25%">                            <div class="grid-demo">                                <label class="layui-form-label">中心纬度</label>                                <div class="layui-input-block">                                    <input type="text" name="zxwd" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4" style="width:50%">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">坐标系统</label>                                <div class="layui-input-block">                                    <input type="text" name="kjck" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md3">                            <div class="grid-demo">                                <label class="layui-form-label">行政区划</label>                                <div class="layui-input-block">                                    <input type="text" name="xzqdm" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md9">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">项目位置</label>                                <div class="layui-input-block">                                    <input type="text" name="xmwz" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">开始时间</label>                                <div class="layui-input-block">                                    <input type="text" name="xmkssj" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">结束时间</label>                                <div class="layui-input-block">                                    <input type="text" name="xmjssj" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">灾害点名称</label>                                <div class="layui-input-block">                                    <input type="text" name="zhdmc" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">灾害点编号</label>                                <div class="layui-input-block">                                    <input type="text" name="zhdtybh" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">灾害类型</label>                                <div class="layui-input-block">                                    <input type="text" name="zhlx" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo">                                <label class="layui-form-label">灾害等级</label>                                <div class="layui-input-block">                                    <input type="text" name="zhdj" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">灾害险情</label>                                <div class="layui-input-block">                                    <input type="text" name="zhxq" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">预警级别</label>                                <div class="layui-input-block">                                    <input type="text" name="yjjb" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo">                                <label class="layui-form-label">监测级别</label>                                <div class="layui-input-block">                                    <input type="text" name="jcjb" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">监测手段</label>                                <div class="layui-input-block">                                    <input type="text" name="jcsd" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">是否库区</label>                                <div class="layui-input-block">                                    <input type="text" name="sfkq" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo">                                <label class="layui-form-label">是否涉水</label>                                <div class="layui-input-block">                                    <input type="text" name="sfss" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">是否结束</label>                                <div class="layui-input-block">                                    <input type="text" name="sfjs" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row layui-col-space1">                        <div class="layui-col-md3">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">面积</label>                                <div class="layui-input-block">                                    <input type="text" name="mj" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md3">                            <div class="grid-demo">                                <label class="layui-form-label">面积单位</label>                                <div class="layui-input-block">                                    <input type="text" name="mjdw" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md3">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">体积</label>                                <div class="layui-input-block">                                    <input type="text" name="tj" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md3">                            <div class="grid-demo">                                <label class="layui-form-label">体积单位</label>                                <div class="layui-input-block">                                    <input type="text" name="tjdw" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row layui-col-space1">                        <div class="layui-col-md3" style="width:25%">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">威胁户数</label>                                <div class="layui-input-block">                                    <input type="text" name="wxhs" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md3" style="width:25%">                            <div class="grid-demo">                                <label class="layui-form-label">威胁人数</label>                                <div class="layui-input-block">                                    <input type="text" name="wxrs" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md3" style="width:50%">                            <label class="layui-form-label" style="width:200px">威胁房屋面积(平方米)</label>                            <input type="text" name="wxfwmj" class="layui-input" readonly="readonly" style="width:180px;float:right" />                        </div>                    </div>                </div>                <div class="layui-form-item">                    <label class="layui-form-label" style="padding-top:30px;">其他威胁</label>                    <div class="layui-input-block">                        <textarea name="qtwx" class="layui-textarea" readonly="readonly" style="min-height:80px!important"></textarea>                    </div>                </div>                <div class="layui-form-item">                    <label class="layui-form-label">备注</label>                    <div class="layui-input-block">                        <input type="text" name="bz" class="layui-input" readonly="readonly" />                    </div>                </div>            </form>        </div>     </div></div>'

                    , zIndex: layer.zIndex
                    , success: function (layero) {
                        layer.setTop(layero);
                        form.render();
                    }
                    , end: function () {
                        projectinfoviewlayerindex = null;
                    }
                });
            }

            //项目信息
            $.ajax({
                url: servicesurl + "/api/PointCloud_MointorProject/GetMointorProjectInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                success: function (data) {
                    if (data == "") {
                        layer.msg("无项目信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        //清除项目信息
                        form.val("projectinfoviewform", {
                            "xmmc": ""
                            , "xmbm": ""
                            , "xmlx": ""
                            , "xmlb": ""
                            , "zxjd": ""
                            , "zxwd": ""
                            , "kjck": ""
                            , "xzqdm": ""
                            , "xmwz": ""
                            , "xmkssj": ""
                            , "xmjssj": ""
                            , "zhdmc": ""
                            , "zhdtybh": ""
                            , "zhlx": ""
                            , "zhdj": ""
                            , "zhxq": ""
                            , "yjjb": ""
                            , "jcjb": ""
                            , "jcsd": ""
                            , "sfkq": ""
                            , "sfss": ""
                            , "sfjs": ""
                            , "mj": ""
                            , "mjdw": ""
                            , "tj": ""
                            , "tjdw": ""
                            , "wxhs": ""
                            , "wxrs": ""
                            , "wxfwmj": ""
                            , "qtwx": ""
                            , "bz": ""
                        });
                    }
                    else {
                        //项目信息
                        var projectinfo = JSON.parse(data);

                        form.val("projectinfoviewform", {
                            "xmmc": projectinfo.XMMC
                            , "xmbm": projectinfo.XMBM
                            , "xmlx": projectinfo.XMLX
                            , "xmlb": projectinfo.XMLB
                            , "zxjd": projectinfo.ZXJD
                            , "zxwd": projectinfo.ZXWD
                            , "kjck": projectinfo.SRID
                            , "xzqdm": projectinfo.XZQBM
                            , "xmwz": projectinfo.XMWZ
                            , "xmkssj": projectinfo.XMKSSJ
                            , "xmjssj": projectinfo.XMJSSJ
                            , "zhdmc": projectinfo.ZHDMC
                            , "zhdtybh": projectinfo.ZHDTYBH
                            , "zhlx": projectinfo.ZHLX
                            , "zhdj": projectinfo.ZHDJ
                            , "zhxq": projectinfo.ZHXQ
                            , "yjjb": projectinfo.YJJB
                            , "jcjb": projectinfo.JCJB
                            , "jcsd": projectinfo.JCSD
                            , "sfkq": projectinfo.SFKQ
                            , "sfss": projectinfo.SFSS
                            , "sfjs": projectinfo.SFJS
                            , "mj": projectinfo.MJ
                            , "mjdw": projectinfo.MJDW
                            , "tj": projectinfo.TJ
                            , "tjdw": projectinfo.TJDW
                            , "wxhs": projectinfo.WXHS
                            , "wxrs": projectinfo.WXRS
                            , "wxfwmj": projectinfo.WXFWMJ
                            , "qtwx": projectinfo.QTWX
                            , "bz": projectinfo.BZ
                        });
                    }
                }, datatype: "json"
            });





        }
   
}