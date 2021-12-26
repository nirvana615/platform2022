var jieliTable = "	<form class='layui-form' style='margin-top:5px;margin-right:5px;' lay-filter='queryJieliinfoform'>	"
    + "	    <div class='layui-form-item'>	"
    + "	        <div class='layui-row'>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <label class='layui-form-label'>采集人</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <input type='text' name='collector' autocomplete='off' placeholder='请输入' class='layui-input' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo'>	"
    + "	                    <label class='layui-form-label'>测窗</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <select id='windowIdSelect' name='windowId'>	"
    + "	                            <option value=''>请选择</option>	"
    + "	                        </select>	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <label class='layui-form-label'>模型</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <select id='modleIdSelect' name='modleId'>	"
    + "	                            <option value=''>请选择</option>	"
    + "	                        </select>	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	        </div>	"
    + "	    </div>	"
    + "	    <div class='layui-form-item' style='margin-top:5px;height: 40px'>	"
    + "	        <div style='position:absolute;right:15px;'>	"
    + "	            <button type='reset' class='layui-btn layui-btn-primary' style='width:100px'>重置</button>	"
    + "	            <button type='submit' class='layui-btn' lay-submit='' lay-filter='queryJielisubmit' style='width:100px'>查询</button>	"
    + "	        </div>	"
    + "	    </div>	"
    + "	</form>	"
    + "	<table class='layui-hide' id='jielitable-view' lay-filter='jielitable-view'></table>	";

//结构表
var jiegouTable = "	<form class='layui-form' style='margin-top:5px;margin-right:5px;' lay-filter='queryJiegouinfoform'>	"
    + "	    <div class='layui-form-item'>	"
    + "	        <div class='layui-row'>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <label class='layui-form-label'>模型</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <select id='modleIdSelect' name='modleId'>	"
    + "	                            <option value=''>请选择</option>	"
    + "	                        </select>	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	        </div>	"
    + "	    </div>	"
    + "	    <div class='layui-form-item' style='margin-top:5px;height: 40px'>	"
    + "	        <div style='position:absolute;right:15px;'>	"
    + "	            <button type='reset' class='layui-btn layui-btn-primary' style='width:100px'>重置</button>	"
    + "	            <button type='submit' class='layui-btn' lay-submit='' lay-filter='queryJiegousubmit' style='width:100px'>查询</button>	"
    + "	        </div>	"
    + "	    </div>	"
    + "	</form>	"
    + "	<table class='layui-hide' id='jiegoutable-view' lay-filter='jiegoutable-view'></table>	";
//节理把
console.log(layers);
var windouinfo = null;
var cequ = null;
var maxMinList = [];
function changewindow() {
   
    console.log(viewer.entities);
   
    if (currentprojectid == null) {
        layer.msg('请先选择项目');
        return;
    }
    if (windowInfoList.length == 0) {
        layer.msg('请新增测窗');
        return;
    }
    cequ = layer.open({
        type: 1
        , title: ['请选择测窗', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['300px', '400px']
        , shade: 0.3
        , offset: 'auto'
        , closeBtn: 1
        , maxmin: true
        , moveOut: true
        , content: '<form class="layui-form" style="margin-top:5px;margin-right:25px;" lay-filter="windowInfoNameFrom"><div class="layui-form-item" style="margin-top:15px;margin-right:5px;"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label">测窗</label><div class="layui-input-block" style="width:150px"><select id="windowId" name="windowId"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item" style="margin-top:35px"><div style="position:absolute;right:15px;"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="selectWindow" style="width:100px">确定</button></div></div></form>'
        , zIndex: layer.zIndex
        , success: function (layero) {
            for (var i in windowInfoList) {
                document.getElementById("windowId").innerHTML += '<option value="' + windowInfoList[i].id + '">' + windowInfoList[i].name + '</option>';
            }
            //置顶
            layer.setTop(layero);
            form.render();
            if (windouinfo!=null) {
                form.val("windowInfoNameFrom", {
                    "windowId": windouinfo.id
                });
            }
            
            form.on('submit(selectWindow)', function (data) {
                if (data.field.windowId.length == 0) {
                    layer.msg('请选择测窗');
                    return;
                }
                for (var i in windowInfoList) {
                    if (windowInfoList[i].id == data.field.windowId) {
                        for (var j in layers[0].children) {
                            if (layers[0].children[j].type&&layers[0].children[j].type == "FLZWINDOW" && layers[0].children[j].id == ("FLZWINDOW_" + data.field.windowId)) {
                                windouinfo = windowInfoList[i];
                                console.log(windouinfo);
                                document.getElementById("windowInfoName").value = windouinfo.name;
                                cequList = JSON.parse(windouinfo.vertices3dlbh);
                                var entityFater = viewer.entities.getById(layers[0].children[j].id );
                                if (entityFater == undefined) {
                                    
                                    //自己自己去实现，
                                    layers[0].spread = true;
                                    layers[0].children[j].spread = true;
                                    layers[0].children[j].checked = true;
                                    //功能强大
                                    modeljiazaiFlag = false;
                                    tree.reload('prjlayerlistid', { data: layers });
                                    ClearTemp();
                                    viewer.zoomTo(viewer.entities.getById(layers[0].children[j].id + "_LABEL"), new Cesium.HeadingPitchRange(Cesium.Math.toRadians(-(parseFloat(layers[0].children[j].datas.level))), Cesium.Math.toRadians(parseFloat(layers[0].children[j].datas.vertical)), 40));
                                } else {
                                    viewer.zoomTo(viewer.entities.getById(layers[0].children[j].id + "_LABEL"), new Cesium.HeadingPitchRange(Cesium.Math.toRadians(-(parseFloat(layers[0].children[j].datas.level))), Cesium.Math.toRadians(parseFloat(layers[0].children[j].datas.vertical)), 40));
                                }
                                
                            }
                        }

                    }
                }
                layer.close(cequ);
                return false;
            });

        }
        , end: function () {
            //关闭
           // layer.close(cequ);
            layer.close(cequ);
        }
    });
}
function drwjieli() {
    //本面积计算方法为：将所有点转换为大地坐标BLH，然后将H赋值为最大H，再转换为空间直角坐标XYZ，取XY计算面积
    var jieliList = [];
    console.log(layers);
    if (currentprojectid == null) {
        layer.msg('请先选择项目');
        return;
    }
    if (windowInfoList.length == 0) {
        layer.msg('请新增测窗');
        return;
    }
    if (windouinfo == null) {
        //
        layer.msg("请选择测窗");
        return;
    } 
    //采集人
    collector = document.getElementById("collector").value;
    if (collector==null||(collector != null && collector.length==0)) {
        //
        layer.msg("请输入采集人");
        return;
    } 
    if (handler != undefined) {
        handler.destroy();
    }
    handler = new Cesium.ScreenSpaceEventHandler(canvas);
    
    linepoints = [];
    //左击
    handler.setInputAction(function (leftclik) {
        if (isRedo) {
            ClearTemp();
            isRedo = false;
            points = [];
            for (i = 0; i < 50;i++) {
                viewer.entities.removeById("jielitemp" + i);
            }
        }
        if (cequList.length==0) {
            layer.msg("请选择测区");
            return;
        }
        var maxL = cequList[0].L;
        var maxB = cequList[0].B;
        var minL = cequList[0].L;
        var minB = cequList[0].B;

        for (var n in cequList) {
            if (cequList[n].L > maxL) {
                maxL = cequList[n].L;
            }
            if (cequList[n].L < minL) {
                minL = cequList[n].L;
            }
            if (cequList[n].B > maxB) {
                maxB = cequList[n].B;
            }
            if (cequList[n].B < minB) {
                minB = cequList[n].B;
            }
           
        }
        var pickedOject = scene.pick(leftclik.position);
        if (pickedOject != undefined) {
            var position = scene.pickPosition(leftclik.position);
            var cartesian3 = Cesium.Cartographic.fromCartesian(position);                        //笛卡尔XYZ
            var longitude = Cesium.Math.toDegrees(cartesian3.longitude);                         //经度
            var latitude = Cesium.Math.toDegrees(cartesian3.latitude);  
            if (longitude < minL || longitude > maxL || latitude < minB || latitude > maxB) {
                //判断点在测区外，
                layer.msg('该点在测窗外了');
                return; 
            } 
            
            if (position != undefined) {
                linepoints.push(Cesium.Cartographic.fromCartesian(position));
                if (Cesium.defined(position)) {
                    viewer.entities.add({
                        id: "jielitemp" + points.length,
                        position: position,
                        point: {
                            pixelSize: 3,
                            color: Cesium.Color.RED
                        }
                    });
                    points.push(position);
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    if (isMobile.any()) {
        //双指
        handler.setInputAction(function (pinch) {
            if (points.length > 2) {

                DrowHuaHua("jieli", linepoints, points);


            }

        }, Cesium.ScreenSpaceEventType.PINCH_START);
    }
    else {
        //右击
        handler.setInputAction(function (rightclik) {
            if (points.length > 2) {

                DrowHuaHua("jieli", linepoints, points);
            }

        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }
   
};
//测窗统计
function windowTongji() {
    if (currentprojectid == null) {
        layer.msg('请先选择项目');
        return;
    }
    cequ = layer.open({
        type: 1
        , title: ['测窗信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
        , area: ['900px', '700px']
        , shade: 0
        , offset: 'auto'
        , closeBtn: 1
        , anim: 0
        , maxmin: true
        , moveOut: true
        // , content: '<div class="layui-tab-item" style="margin:1px 0"><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px 0px"><ul class="layui-tab-title"><li class="layui-this" style="width:45%">监测剖面</li><li style="width:45%">监测点</li></ul><div class="layui-tab-content"><!--监测剖面--><div class="layui-tab-item layui-show"><table class="layui-hide" id="windowtable-view" lay-filter="windowtable-view"></table><script type="text/html" id="table-toolbar-section"><a class="layui-btn layui-bg-gray layui-btn-xs"  lay-event="sectionview"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important"></i></a></script></div><!--监测点--><div class="layui-tab-item"><form class="layui-form layui-form-pane" lay-filter="monitorviewform" action=""><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><div class="layui-input-block" style="margin-left:0px;margin-right:5px;margin-bottom:3px;"><select id="monitorclassid" name="monitorclass" lay-filter="monitorclass"><option value="0" selected="selected">按灾害体分类</option><option value="1">按监测方法分类</option><option value="2">按监测剖面分类</option></select></div></div></div><div class="layui-col-md6"><div class="grid-demo"><div class="layui-input-block" style="margin-left:5px;margin-bottom:3px;"><select id="monitorclassitemid" name="monitorclassitem" lay-filter="monitorclassitem"></select></div></div></div></div></form><table class="layui-hide" id="monitortable-view" lay-filter="monitortable-view"></table><script type="text/html" id="table-toolbar-monitor"><a class="layui-btn layui-bg-gray layui-btn-xs"  lay-event="monitorview"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important"></i></a></script></div></div></div></div>'
        , content: '<table class="layui-hide" id="windowtable-view" lay-filter="windowtable-view"></table>'
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);
            form.render();
        }
        , end: function () {
            cequ = null;
        }
    });
    //监测剖面信息
    var windowtabledata = [];
    var windowtableview = table.render({
        elem: '#windowtable-view'
        , id: 'windowtableviewid'
        , title: '测窗信息'
        , skin: 'line'
        , even: false
        , page: {
            layout: ['prev', 'page', 'next', 'count']
        }
        , limit: 11
        , toolbar: true
        , totalRow: false
        , initSort: { field: 'id', type: 'asc' }
        , cols: [[
            { field: 'id', title: 'ID', hide: true }
            , { field: 'name', title: '测窗名称', width: 200, align: "center" }
            , { field: 'sideLength', title: '测窗长', align: "center" }
            , { field: 'sidebLength', title: '测窗宽', align: "center" }
            , { field: 'height', title: '高程',  align: "center" }
            , { field: 'creatTime', title: '新建时间', width: 160, align: "center" }
            , { field: 'remarks', title: '备注', align: "center" }
        ]]
        , data: []
    });
    $.ajax({
        url: servicesurl + "/api/FlzWindowInfo/GetWindowInfoList", type: "get", data: { "id": currentprojectid, "cookie": document.cookie },
        success: function (data) {
            windowtabledata = [];
            if (data == "") {
                //无监测剖面信息
                windowtableview.reload({ id: 'windowtableviewid', data: windowtabledata });
            }
            else {
                var windowInfos = JSON.parse(data);
                console.log(windowInfos);
                for (var i in windowInfos) {
                    var section = new Object;
                    section.id = windowInfos[i].id;
                    section.name = windowInfos[i].name;
                    section.creatTime = windowInfos[i].creatTime;
                    section.sideLength = windowInfos[i].sideLength;
                    section.sidebLength = windowInfos[i].sidebLength;
                    section.height = windowInfos[i].height;
                    section.remarks = windowInfos[i].remarks;
                    windowtabledata.push(section);
                }
                windowtableview.reload({ id: 'windowtableviewid', data: windowtabledata });

                table.on('tool(windowtable-view)', function (obj) {
                    var data = obj.data;
                    var layEvent = obj.event;

                    if (layEvent === 'sectionview') {
                        layer.open({
                            type: 1
                            , title: ['测窗信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                            , area: ['400px', '400px']
                            , shade: 0
                            , offset: 'auto'
                            , closeBtn: 1
                            , anim: 0
                            , maxmin: true
                            , moveOut: true
                            , content: ''
                            , zIndex: layer.zIndex
                            , success: function (layero) {
                                layer.setTop(layero);

                            }
                        });
                    }
                });
            }
        }, datatype: "json"
    });
}
//节理统计
function jieLiTongji() {
    if (currentprojectid == null) {
        layer.msg('请先选择项目');
        return;
    }
    cequ = layer.open({
        type: 1
        , title: ['节理信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
        , area: ['1000px', '750px']
        , shade: 0
        , offset: 'auto'
        , closeBtn: 1
        , anim: 0
        , maxmin: true
        , moveOut: true
        ,content:jieliTable
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);
            if (windowInfoList.length > 0) {
                for (var i in windowInfoList) {
                    document.getElementById("windowIdSelect").innerHTML += '<option value="' + windowInfoList[i].id + '">' + windowInfoList[i].name + '</option>';
                }
            };
            console.log(modleInfoList);
            if (windowInfoList.length > 0) {//模型id
                for (var i in modleInfoList) {
                    document.getElementById("modleIdSelect").innerHTML += '<option value="' + modleInfoList[i].Id + '">' + modleInfoList[i].MXMC + '_' + modleInfoList[i].MXSJ + '</option>';
                }
            };
            form.render();
            form.render('select');
            form.on('submit(queryJielisubmit)', function (data) {
                data.field.cookie = document.cookie;
                data.field.id = currentprojectid;
                data.field.type = '3';
                $.ajax({
                    url: servicesurl + "/api/FlzData/GetWindowInfoList", type: "get", data: data.field,
                    success: function (result) {
                        jielitabledata = [];
                        if (result == "") {
                            //无监测剖面信息
                            jielitableview.reload({ id: 'jielitableviewid', data: [] });
                        }
                        else {
                            var windowInfos = JSON.parse(result);
                            console.log(windowInfos);
                            var tempList = [];
                            for (var i in windowInfos) {
                                var jieli = new Object;
                                jieli.id = windowInfos[i].id;
                                jieli.name = windowInfos[i].name;
                                jieli.avgOpening = windowInfos[i].avgOpening;
                                jieli.inclination = windowInfos[i].inclination;
                                jieli.dipAngle = windowInfos[i].dipAngle;
                                jieli.trend = windowInfos[i].trend;
                                jieli.traceLength = windowInfos[i].traceLength;
                                jieli.measure = windowInfos[i].measure;
                                jieli.modleTime = windowInfos[i].modleTime;
                                jieli.creatTime = windowInfos[i].creatTime;
                                jieli.remarks = windowInfos[i].remarks;
                                jieli.collector = windowInfos[i].collector; 
                                jielitabledata.push(jieli);
                                //var postionList = JSON.parse(windowInfos[i].postion);
                                //if (jieli.avgOpening != "0.0020") {
                                //    postionList.push(postionList[0]);
                                //    console.log(windowInfos[i].name);
                                //    console.log(postionList[0]);
                                //}
                                //tempList.push(postionList);
                            }
                            console.log(tempList);
                            jielitableview.reload({ id: 'jielitableviewid', data: jielitabledata });
                        }
                    }, datatype: "json"
                });
                return false;
            });
        }
        , end: function () {
            cequ = null;
        }
    });
    
    var jielitabledata = [];
    var jielitableview = table.render({
        elem: '#jielitable-view'
        , id: 'jielitableviewid'
        , title: '节理信息'
        , skin: 'line'
        , even: false
        , page: true
        , limit: 10
        , toolbar: true
        , totalRow: true
        , initSort: { field: 'id', type: 'asc' }
        , cols: [[
            { field: 'id', title: 'ID', hide: true }
            , { field: 'name', title: '节理名称', width: 160, align: "center",totalRowText: '合计' }
            , { field: 'avgOpening', title: '平均张开度', width: 160,  sort: true, align: "center", totalRow: true }
            , { field: 'traceLength', title: '迹长', sort: true,align: "center",totalRow: true }
            , { field: 'measure', title: '面积', sort: true, width: 120, align: "center", totalRow: true }
            , { field: 'collector', title: '采集人',  width: 120, align: "center" }
            , { field: 'modleTime', title: '采集时间', sort: true, width: 160, align: "center" }
            , { field: 'creatTime', title: '素描时间', sort: true, width: 160, align: "center" }
            , { field: 'remarks', title: '备注', width: 160, align: "center" }
        ]]
        , data: []
    });
    $.ajax({
        url: servicesurl + "/api/FlzData/GetWindowInfoList", type: "get", data: {
            "id": currentprojectid,
            "cookie": document.cookie,
            "collector": "",
            "modleId": "",
            "windowId": "",
            "type":3
        },
        success: function (data) {
            jielitabledata = [];
            if (data == "") {
                //无监测剖面信息
                jielitableview.reload({ id: 'jielitableviewid', data: jielitabledata });
            }
            else {
                var windowInfos = JSON.parse(data);
                console.log(windowInfos);
                for (var i in windowInfos) {
                    var jieli = new Object;
                    jieli.id = windowInfos[i].id;
                    jieli.name = windowInfos[i].name;
                    jieli.avgOpening = windowInfos[i].avgOpening;
                    jieli.inclination = windowInfos[i].inclination;
                    jieli.dipAngle = windowInfos[i].dipAngle;
                    jieli.trend = windowInfos[i].trend;
                    jieli.traceLength = windowInfos[i].traceLength;
                    jieli.measure = windowInfos[i].measure;
                    jieli.modleTime = windowInfos[i].modleTime;
                    jieli.creatTime = windowInfos[i].creatTime;
                    jieli.remarks = windowInfos[i].remarks; 
                    jieli.collector = windowInfos[i].collector; 
                    jielitabledata.push(jieli);
                }
                jielitableview.reload({ id: 'jielitableviewid', data: jielitabledata });
            }
        }, datatype: "json"
    });
}

function jieGouTongji() {
    if (currentprojectid == null) {
        layer.msg('请先选择项目');
        return;
    }
    cequ = layer.open({
        type: 1
        , title: ['优势结构面信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
        , area: ['1000px', '750px']
        , shade: 0
        , offset: 'auto'
        , closeBtn: 1
        , anim: 0
        , maxmin: true
        , moveOut: true
        , content: jiegouTable
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);
            if (windowInfoList.length > 0) {//模型id
                for (var i in modleInfoList) {
                    document.getElementById("modleIdSelect").innerHTML += '<option value="' + modleInfoList[i].Id + '">' + modleInfoList[i].MXMC + '_' + modleInfoList[i].MXSJ + '</option>';
                }
            };
            form.render();
            form.render('select');
            form.on('submit(queryJiegousubmit)', function (data) {
                data.field.cookie = document.cookie;
                data.field.id = currentprojectid;
                data.field.type = "4";
                data.field.windowId = "";
                $.ajax({
                    url: servicesurl + "/api/FlzData/GetWindowInfoList", type: "get", data: data.field,
                    success: function (result) {
                        jielitabledata = [];
                        if (result == "") {
                            //无监测剖面信息
                            jielitableview.reload({ id: 'jiegoutableviewid', data: [] });
                        }
                        else {
                            var windowInfos = JSON.parse(result);
                            console.log(windowInfos);
                            for (var i in windowInfos) {
                                var jieli = new Object;
                                jieli.id = windowInfos[i].id;
                                jieli.name = windowInfos[i].name;
                                jieli.avgOpening = windowInfos[i].avgOpening;
                                jieli.inclination = windowInfos[i].inclination;
                                jieli.dipAngle = windowInfos[i].dipAngle;
                                jieli.trend = windowInfos[i].trend;
                                jieli.traceLength = windowInfos[i].traceLength;
                                jieli.measure = windowInfos[i].measure;
                                jieli.modleTime = windowInfos[i].modleTime;
                                jieli.creatTime = windowInfos[i].creatTime;
                                jieli.remarks = windowInfos[i].remarks;
                                jieli.collector = windowInfos[i].collector; 
                                jielitabledata.push(jieli);
                            }
                            jielitableview.reload({ id: 'jiegoutableviewid', data: jielitabledata });

                           
                        }
                    }, datatype: "json"
                });
                return false;
            });
        }
        , end: function () {
            cequ = null;
        }
    });

    var jielitabledata = [];
    var jielitableview = table.render({
        elem: '#jiegoutable-view'
        , id: 'jiegoutableviewid'
        , title: '结构面信息'
        , skin: 'line'
        , even: false
        , page: true
        , limit: 10
        , toolbar: true
        , totalRow: true
        , initSort: { field: 'id', type: 'asc' }
        , cols: [[
            { field: 'id', title: 'ID', hide: true }
            , { field: 'name', title: '结构面编号', width: 160, align: "center", totalRowText: '合计' }
            , { field: 'inclination', title: '倾向', sort: true, align: "center" }
            , { field: 'dipAngle', title: '倾角', sort: true, align: "center" }
            , { field: 'trend', title: '走向', align: "center" }
            , { field: 'modleTime', title: '采集时间', sort: true, width: 160, align: "center" }
            , { field: 'creatTime', title: '素描时间', sort: true, width: 160, align: "center" }
            , { field: 'remarks', title: '备注', width: 160, align: "center" }
        ]]
        , data: []
    });
    $.ajax({
        url: servicesurl + "/api/FlzData/GetWindowInfoList", type: "get", data: {
            "id": currentprojectid,
            "cookie": document.cookie,
            "type": "4",
            "modleId": "",
            "windowId": "",
            "collector": "",
        },
        success: function (data) {
            jielitabledata = [];
            if (data == "") {
                //无监测剖面信息
                jielitableview.reload({ id: 'jielitableviewid', data: jielitabledata });
            }
            else {
                var windowInfos = JSON.parse(data);
                console.log(windowInfos);
                for (var i in windowInfos) {
                    var jieli = new Object;
                    jieli.id = windowInfos[i].id;
                    jieli.name = windowInfos[i].name;
                    jieli.inclination = windowInfos[i].inclination;
                    jieli.dipAngle = windowInfos[i].dipAngle;
                    jieli.trend = windowInfos[i].trend;
                    jieli.modleTime = windowInfos[i].modleTime;
                    jieli.creatTime = windowInfos[i].creatTime;
                    jieli.remarks = windowInfos[i].remarks;
                    jieli.collector = windowInfos[i].collector; 
                    jielitabledata.push(jieli);
                }
                jielitableview.reload({ id: 'jielitableviewid', data: jielitabledata });
                
            }
        }, datatype: "json"
    });
}
function drwjiegou() {
    //本面积计算方法为：将所有点转换为大地坐标BLH，然后将H赋值为最大H，再转换为空间直角坐标XYZ，取XY计算面积
    var jiegouList = [];
    console.log(layers);
    if (currentprojectid == null) {
        layer.msg('请先选择斜坡单元');
        return;
    }
    if (currentprojectid == null) {
        layer.msg('请先选择斜坡单元');
        return;
    }

    handler = new Cesium.ScreenSpaceEventHandler(canvas);
   
    linepoints = [];
    //左击
    handler.setInputAction(function (leftclik) {
        if (isRedo) {
            ClearTemp();
            isRedo = false;
            points = [];
            for (i = 0; i < 50; i++) {
                viewer.entities.removeById("jiegoutemp" + i);
            }
        }
        
        var pickedOject = scene.pick(leftclik.position);
        if (pickedOject != undefined) {
            var position = scene.pickPosition(leftclik.position);

            console.log(position);

            if (position != undefined) {
                linepoints.push(Cesium.Cartographic.fromCartesian(position));
                if (Cesium.defined(position)) {
                    viewer.entities.add({
                        name: "plMeasue" + NewGuid(),
                        position: position,
                        point: {
                            pixelSize: 10,
                            color: Cesium.Color.YELLOW,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                        }
                    });
                   
                    points.push(position);
                    if (points.length > 1) {
                        var point = points[points.length - 2];
                        //polylineOnModel("plMeasue" + NewGuid(), [point, position], 0.05, 10, Cesium.Color.AQUAMARINE);             
                        viewer.entities.add({
                            name: "plMeasue" + NewGuid(),
                            polyline: {
                                positions: [point, position],
                                width: 2,
                                arcType: Cesium.ArcType.RHUMB,
                                material: Cesium.Color.RED,
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.RED,
                                }),
                            }
                        });
                    }
                    if (points.length == 3) {//直接去那边了
                        viewer.entities.add({
                            name: "plMeasue" + NewGuid(),
                            polyline: {
                                positions: [points[0], position],
                                width: 2,
                                arcType: Cesium.ArcType.RHUMB,
                                material: Cesium.Color.RED,
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.RED,
                                }),
                            }
                        });
                        DrowHuaHua("jiegou", linepoints, points);
                    }
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    if (isMobile.any()) {
        //双指
        handler.setInputAction(function (pinch) {
            if (points.length == 3) {

                DrowHuaHua("jiegou", linepoints, points);
            }

        }, Cesium.ScreenSpaceEventType.PINCH_START);
    }
    else {
        //右击
        handler.setInputAction(function (rightclik) {
            if (points.length == 3) {

                DrowHuaHua("jiegou", linepoints, points);
            }

        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }

};
//边界勾画
function drwBianJie() {
    ClearTemp();
    if (currentprojectid == null) {
        layer.msg('请先选择项目');
        return;
    }
    if (modleInfoList.length == 0) {
        layer.msg('请先选择模型');
        return;
    }
    for (var i in layers) {
        if (layers[i].type == "BIANJIE") {
            layer.msg('已有边界，请先删除');
            return;
        }
    }
    isPoint = false;
    isLength = true;
    isHeight = false;
    isAraa = false;
    isAzimuth = false;
    isRedo = false;
    isPointLabel = false;
    isPolylineLabel = false;
    isPolygonLabel = false;
    isOccurrence = false;
    isWindowZiDingyi = false;

    if (isLength) {
        if (handler != undefined) {
            handler.destroy();
        }

        handler = new Cesium.ScreenSpaceEventHandler(canvas);

        //左击
        handler.setInputAction(function (leftclik) {
            if (isRedo) {
                ClearTemp();
                isRedo = false;
                points = [];
            }

            var pickedOject = scene.pick(leftclik.position);
            if (pickedOject != undefined) {
                var position = scene.pickPosition(leftclik.position);
                if (position != undefined) {
                    if (Cesium.defined(position)) {
                        viewer.entities.add({
                            name: "ptMeasue" + NewGuid(),
                            position: position,
                            point: {
                                pixelSize: 10,
                                color: Cesium.Color.YELLOW,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY
                            }
                        });
                        points.push(position);
                        if (points.length > 1) {
                            var point = points[points.length - 2];
                            viewer.entities.add({
                                name: "plMeasue" + NewGuid(),
                                polyline: {
                                    positions: [point, position],
                                    width: 2,
                                    arcType: Cesium.ArcType.RHUMB,
                                    material: Cesium.Color.RED,
                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.RED,
                                    }),
                                }
                            });
                        }
                    }
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        //移动
        handler.setInputAction(function (move) {
            if (points.length > 0) {
                //清除多边形临时边线

                var pick = viewer.scene.pick(move.endPosition);
                if (pick != undefined) {
                    var XYZ = viewer.scene.pickPosition(move.endPosition);
                    if (XYZ != undefined) {
                        //删除
                        if (viewer.entities.getById("line_temp9999") != null) {
                            viewer.entities.removeById("line_temp9999");
                        }

                        //绘制多边形临时边线
                        viewer.entities.add({
                            id: "line_temp9999",
                            polyline: {
                                positions: [points[points.length - 1], XYZ],
                                width: 2,
                                arcType: Cesium.ArcType.RHUMB,
                                material: Cesium.Color.RED,
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.RED,
                                }),
                            }
                        });

                        if (points.length > 1) {
                            //绘制多边形临时闭合线
                            if (viewer.entities.getById("line_temp9998") != null) {
                                viewer.entities.removeById("line_temp9998");
                            }
                            viewer.entities.add({
                                id: "line_temp9998",
                                polyline: {
                                    positions: [points[0], XYZ],
                                    width: 2,
                                    arcType: Cesium.ArcType.RHUMB,
                                    material: Cesium.Color.RED,
                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.RED,
                                    }),
                                }
                            });
                        }
                    }
                }
            }

        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);


        if (isMobile.any()) {//双指
            handler.setInputAction(function (pinch) {
                if (points.length > 2) {
                    if (viewer.entities.getById("line_temp9999") != null) {
                        viewer.entities.removeById("line_temp9999");
                    }
                    if (viewer.entities.getById("line_temp9998") != null) {
                        viewer.entities.removeById("line_temp9998");
                    }
                
                    if (handler != undefined) {
                        handler.destroy();
                    }

                    isRedo = true;
                }

            }, Cesium.ScreenSpaceEventType.PINCH_START);
        }
        else {//右击
            handler.setInputAction(function (rightclik) {
                if (points.length > 2) {
                    if (viewer.entities.getById("line_temp9999") != null) {
                        viewer.entities.removeById("line_temp9999");
                    }
                    if (viewer.entities.getById("line_temp9998") != null) {
                        viewer.entities.removeById("line_temp9998");
                    }
                    var temp = {};
                    temp.id = currentprojectid;
                    temp.cookie = document.cookie;
                    temp.flzRange = JSON.stringify(points);
                    var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                    $.ajax({
                        url: servicesurl + "/api/FLZ/UpdateProject", type: "put", data: temp,
                        success: function (result) {
                            layer.close(loadinglayerindex);
                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            console.log(result);
                            if (result == "更新成功！") {

                                //关闭
                                layer.close(projectinfoeditlayerindex);
                                
                                //刷新项目列表
                                //GetUserProjects();
                                var flzWindowLayer = new Object;
                                flzWindowLayer.title = "边界范围";
                                flzWindowLayer.type = "BIANJIE";
                                flzWindowLayer.id = "BIANJIE" + currentprojectid;
                                flzWindowLayer.pointList = points;
                                flzWindowLayer.checked = true;
                                flzWindowLayer.showCheckbox = true;//显示复选框
                                layers.push(flzWindowLayer);
                                modeljiazaiFlag = false;
                                tree.reload('prjlayerlistid', { data: layers });
                                ClearTemp();
                                if (handler != undefined) {
                                    handler.destroy();
                                }
                                isRedo = true;
                            }
                        }, datatype: "json"
                    });

                    
                    if (handler != undefined) {
                        handler.destroy();
                    }
                    isRedo = true;
                }

            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }
    }
};