//弹出项目列表widget
var projectLists = [];//项目列表信息
var LANDSLIDEICON = '<span style="margin-left:5px;margin-right:5px;"><img src="../../../Resources/img/map/project_type_landslide.png" style="width:14px;height:14px;"/></span>';
var ROCKFALLICON = '<span style="margin-left:5px;margin-right:5px;"><img src="../../../Resources/img/map/project_type_rockfall.png" style="width:14px;height:14px;"/></span>';
var projectindex=layer.open({
    type: 1
    ,skin: 'layui-layer-rim'
    , title: ['项目', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
    , area: ['250px', '660px']
    , shade: 0
    , offset: ['48px', '0px']//头部，左边
    , closeBtn: 0
    , shift:3
    //, maxmin: true
    //, moveOut: true
    , content: projietHtml
    , success: function (layero) {
        layer.setTop(layero);
        GetUserProjects();
    }
    , btn: ['新增','列表']
    , yes: function (index, layero) {
        //新增项目
        projiectAdd();
        return false;
    }
    , btn2: function (index, layero) {
        //查看项目列表
        layProject();
        return false; //开启该代码可禁止点击该按钮关闭
    }
   
   , zIndex: layer.zIndex
   
});

var projectdatagrouptime = [];//按时间组织
var projectdatagrouparea = [];//按地区组织

elem.on('tab(projecrListTuCeng)', function (data) {
    if (this.getAttribute('lay-id') == "222" && currentprojectid == null) {
        layer.msg('请先选择项目');
        elem.tabChange('projecrListTuCeng', 111); //跳转地址图层列表
    }
})
//获取项目列表
function GetUserProjects() {
    console.log(layer);
    
    console.log(document);
    var user = ViewBag.User;
    if (user == 'wuxiamodel') {
        user = 'wuxia';
    }
    $.ajax({
        url: servicesurl + "/api/Flz/GetUserFlzProjectList", type: "get", data: { "cookie": document.cookie, user: user },
        success: function (data) {
            if (data == "") {
                layer.msg("无项目信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
               // document.getElementById("projectbytime").innerHTML = "无项目信息";
                document.getElementById("projectbyarea").innerHTML = "无项目信息";
            }
            else {
               // document.getElementById("projectbytime").innerHTML = "";
                document.getElementById("projectbyarea").innerHTML = "";
                var projectlist = JSON.parse(data);
                projectLists = projectlist;//展示一下项目列表。
                console.log(projectLists);
                //构造项目列表数据
                projectdatagrouptime = [];      //按时间组织
                projectdatagrouparea = [];      //按地区组织
                var areas = [];                 //所有地区

                for (var i in projectlist) {
                    var area = projectlist[i].XZQBM.substr(0, 6);
                    if (areas.indexOf(area) == -1) {
                        areas.push(area);
                    }
                }
                //areas.sort();
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
                            son.title = projectlist[j].XMMC;
                            son.xmmc = projectlist[j].XMMC;
                            son.id = projectlist[j].Id;
                            son.icon = LANDSLIDEICON;
                            children.push(son);
                        }
                    }
                    father.children = children;
                    projectdatagrouparea.push(father);
                }

                    //   for (var j in projectlist) {
                    //        var son = new Object;
                    //        son.title = projectlist[j].XMMC;
                    //        son.xmmc = projectlist[j].XMMC;
                    //        son.id = projectlist[j].Id;
                    //       projectdatagrouparea.push(son);
                    //}

                //按地区渲染
                tree.render({
                    elem: '#projectbyarea'
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

                    var projectentitylabel = new Cesium.Entity({
                        id: "PROJECTCENTER_" + projectlist[i].Id + "_LABEL",
                        position: Cesium.Cartesian3.fromDegrees(projectlist[i].ZXJD, projectlist[i].ZXWD),
                        label: {
                            text: projectlist[i].XMMC,
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

        //viewer.flyTo(entities, { duration: 1, offset: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-90), 0) });
    }
};


//节点操作（点击）
function ProjectNodeClick(obj) {
    if (JSON.stringify(obj.data.id) == undefined) {
        //表示父节点则无操作
    }
    else {
      
            if (JSON.stringify(obj.data.id) != currentprojectid) {
                currentprojectid = JSON.stringify(obj.data.id);                             //更新当前项目id
                currentprojectdisastertype = JSON.stringify(obj.data.type);                         //更新当前项目灾害类型
                document.getElementById("currentproject").style.visibility = "visible";
                document.getElementById("currentproject").innerHTML = "<option>" + JSON.stringify(obj.data.xmmc).replace(/\"/g, "") + "</option><option>清除当前项目</option>";
                currentprojectinfo = obj.data;
                console.log(currentprojectinfo);
                //TODO请求项目相关信息（图层、监测点）
                //GetProjectMonitor(currentprojectid);


                //监听清除当前项目操作
                $(() => {
                    $('#currentprojectoperate select').change(() => {
                        if ($('#currentprojectoperate select').val() == "清除当前项目") {
                            document.getElementById("currentproject").innerHTML = "";
                            document.getElementById("currentproject").style.visibility = "hidden";
                            currentprojectid = null;
                            currentprojectinfo = null;
                            CloseAllLayer();                               //关闭弹出图层
                            viewer.entities.removeAll();
                            AddEntitiesInViewer(projectentities);

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
                windowInfoList = [];//测区数据
                modleInfoList = [];//模型数据
                //添加及定位entity
                if ((projectentity != null) && (projectentitylabel != null)) {
                    viewer.entities.add(projectentity);
                    viewer.entities.add(projectentitylabel);

                    viewer.flyTo([projectentity, projectentitylabel], { duration: 5, offset: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-80), 3000) });
                }
                //直接请求图层出来了
                setTimeout(() => {
                    LoadLayerListLayer(currentprojectid);
                    elem.tabChange('projecrListTuCeng', 222); //跳转地址图层列表
                }, 1000);

            }

           // layer.min(projectindex)
          //  layer.close(index);
        //});
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
            url: servicesurl + "/api/FLZ/DeleteProject", type: "delete", data: { "id": obj.data.id, "cookie": document.cookie },
            success: function (data) {
                layer.msg(data, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                if (data == "删除成功") {
                    if ((currentprojectid == null) || (obj.data.id != currentprojectid)) {
                        for (var i in projectentities) {
                            if ((projectentities[i].id == "PROJECTCENTER_" + obj.data.id)) {
                                if (viewer.entities.contains(projectentities[i])) {
                                    viewer.entities.remove(projectentities[i]);
                                }
                            }
                        }
                        for (var i in projectentities) {
                            if ((projectentities[i].id == "PROJECTCENTER_" + obj.data.id + "_LABEL")) {
                                if (viewer.entities.contains(projectentities[i])) {
                                    viewer.entities.remove(projectentities[i]);
                                }
                            }
                        }
                       // AddEntitiesInViewer(projectentities);
                    }
                    else {
                        document.getElementById("currentproject").innerHTML = "";
                        document.getElementById("currentproject").style.visibility = "hidden";
                        currentprojectid = null;
                        CloseAllLayer();                               //关闭弹出图层
                        viewer.entities.removeAll();
                       // AddEntitiesInViewer(projectentities);
                    }
                    GetUserProjects();

                  
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





//执行项目筛选
$(document).keydown(function (e) {
    if (e.keyCode == 13) {
        if ($(" #projectfilter ").val() != "") {

        }
        else {
            //展示全部
        }
    }
});


//弹出项目总列表信息
function layProject() {
    console.log(projectLists);
    //项目列表
    if (((projectlistviewlayerindex == null))) {
        projectlistviewlayerindex = layer.open({
            type: 1
            , title: ['项目信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['900px', '700px']
            , shade: 0
            , offset: 'auto'
            , closeBtn: 1
            , anim: 0
            , maxmin: true
            , moveOut: true
            //, content: '<!--查看项目--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px 0px"><ul class="layui-tab-title"><li class="layui-this">基本信息</li><li>测窗信息</li><li>节理信息</li><li>节理玫瑰花</li></ul><div class="layui-tab-content" style="margin:0px 0px"><!--基本信息--><div class="layui-tab-item layui-show"><form class="layui-form" style="margin-top:0px" lay-filter="projectinfoviewform"><div class="layui-form-item"><label class="layui-form-label">项目名称</label><div class="layui-input-block"><input type="text" name="xmmc" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">中心经度</label><div class="layui-input-block"><input type="text" name="zxjd" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label">中心纬度</label><div class="layui-input-block"><input type="text" name="zxwd" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md3"><div class="grid-demo"><label class="layui-form-label">行政区划</label><div class="layui-input-block"><input type="text" name="xzqdm" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md9"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">项目位置</label><div class="layui-input-block"><input type="text" name="xmwz" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">开始时间</label><div class="layui-input-block"><input type="text" name="xmkssj" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label">备注</label><div class="layui-input-block"><input type="text" name="bz" class="layui-input" readonly="readonly" /></div></div></div></div></div></form></div><!--测窗信息--><div class="layui-tab-item"><table class="layui-hide" id="windowtable-view" lay-filter="windowtable-view"></table></div><!--节理信息--><div class="layui-tab-item"><table class="layui-hide" id="jielitable-view" lay-filter="jielitable-view"></table></div><!--节理玫瑰花--><div class="layui-tab-item"><div id="autodatachart" class="layui-tab-item layui-show" style="width:790px;height:540px;top:40px"></div></div></div></div>'
            , content: '<table class="layui-hide" id="projecttable-view" lay-filter="projecttable-view"></table>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);
                form.render();
            }
            , end: function () {
                projectlistviewlayerindex = null;
            }
        });
        //项目列表信息
        var projecttabledata = projectLists;
        var projecttableview = table.render({
            elem: '#projecttable-view'
            , id: 'projecttableviewid'
            , title: '测窗信息'
            , skin: 'line'
            , even: false
            , page: true
            , limit: 10
            , toolbar: true
            , totalRow: false
            , initSort: { field: 'id', type: 'asc' }
            , cols: [[
                { field: 'Id', title: 'ID', hide: true }
                , { field: 'XMMC', title: '项目名称', edit: 'text', width: 200, align: "center" }
                , { field: 'XMWZ', title: '项目位置', edit: 'text', width: 160, align: "center" }
                , { field: 'projectScore', title: '项目得分', sort: true, width: 160, align: "center" }
                , { field: 'dcyx', title: '地层岩性', width: 160, align: "center" }
                , { field: 'dcyxScore', title: '得分', edit: 'text', sort: true, width: 120, align: "center" }
                , { field: 'dcyxWeight', title: '权重', edit: 'text', sort: true, width: 120, align: "center" }
                , { field: 'ytjg', title: '岩体结构', width: 160, align: "center" }
                , { field: 'ytjgScore', title: '得分', edit: 'text', sort: true, width: 120, align: "center" }
                , { field: 'ytjgWeight', title: '权重', edit: 'text', sort: true, width: 120, align: "center" }
                , { field: 'yccz', title: '岩层产状', width: 160, align: "center" }
                , { field: 'ycczScore', title: '得分', edit: 'text', sort: true, width: 120, align: "center" }
                , { field: 'ycczWeight', title: '权重', edit: 'text', sort: true, width: 120, align: "center" }
                , { field: 'apjg', title: '岸坡结构', width: 160, align: "center" }
                , { field: 'apjgScore', title: '得分', edit: 'text', sort: true, width: 120, align: "center" }
                , { field: 'apjgWeight', title: '权重', edit: 'text', sort: true, width: 120, align: "center" }
                , { field: 'qglx', title: '切割裂隙', width: 160, align: "center" }
                , { field: 'qglxScore', title: '得分', edit: 'text', sort: true, width: 120, align: "center" }
                , { field: 'qglxWeight', title: '权重', edit: 'text', sort: true, width: 120, align: "center" }
                , { field: 'dmbj', title: '地貌边界', width: 160, align: "center" }
                , { field: 'dmbjScore', title: '得分', edit: 'text', sort: true, width: 120, align: "center" }
                , { field: 'dmbjWeight', title: '权重', edit: 'text', sort: true, width: 120, align: "center" }
                , { field: 'bxjx', title: '变形迹象', width: 160, align: "center" }
                , { field: 'bxjxScore', title: '得分', edit: 'text', sort: true, width: 120, align: "center" }
                , { field: 'bxjxWeight', title: '权重', edit: 'text', sort: true, width: 120, align: "center" }
                , { field: 'ytlh', title: '岩体裂化', width: 160, align: "center" }
                , { field: 'ytlhScore', title: '得分', edit: 'text', sort: true, width: 120, align: "center" }
                , { field: 'ytlhWeight', title: '权重', edit: 'text', sort: true, width: 120, align: "center" }
                , { field: 'zbfg', title: '植被覆盖', width: 160, align: "center" }
                , { field: 'zbfgScore', title: '得分', edit: 'text', sort: true, width: 120, align: "center" }
                , { field: 'zbfgWeight', title: '权重', edit: 'text', sort: true, width: 120, align: "center" }
                , { field: 'ZXJD', title: '中心经度',   width: 160, align: "center", hide: true  }
                , { field: 'ZXWD', title: '中心纬度',  width: 160, align: "center", hide: true }
                , { field: 'CJSJ', title: '创建时间', width: 200, align: "center" }
                , { field: 'FZR', title: '负责人',   width: 160, align: "center" }
                , { field: 'BZ', title: '备注',   width: 160, align: "center" }
            ]]
            , data: []
        });
        //监听单元格编辑
        table.on('edit(projecttable-view)', function (obj) {
            console.log(obj)
            var value = obj.value; //得到修改后的值
            var data = obj.data; //得到所在行所有键值
            var field = obj.field; //得到字段
            obj.data.BZ = "hrihri ";
            console.log(value);
            console.log(data);
            console.log(field);
            for (var i in projecttabledata) {
                if (projecttabledata[i].Id == data.Id) {
                    projecttabledata[i].BZ = "hrihri ";//是不是改变
                    projecttableview.reload({ id: 'projecttableviewid', data: projecttabledata });
                }
            }
            layer.msg('[ID: ' + data.Id + '] ' + field + ' 字段更改为：' + value, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        });
        if (projecttabledata.length>0) {
            projecttableview.reload({ id: 'projecttableviewid', data: projecttabledata });
        } else {
            projecttableview.reload({ id: 'projecttableviewid', data: projecttabledata });
        }
        
       
    }
    
}
//

function projiectAdd() {
    //创建项目
    if (((projectinfoviewlayerindex == null) && (projectinfoeditlayerindex == null))) {
        ProjectInfo(null, "add");
    }
    else {
        layer.confirm('是否打开新的模块?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
            CloseProjectinfoLayer();
            ProjectInfo(null, "add");
            layer.close(index);
        });
    }

}

