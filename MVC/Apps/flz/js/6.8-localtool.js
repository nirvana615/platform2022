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
    + "	<table class='layui-hide' id='jielitable-view' lay-filter='jielitable-view'></table>	"
    + "	<script type='text/html' id='flz-jieLI-add'>	"
    + "		<div class='layui-btn-container'>	"
    + "			<button class='layui-btn layui-btn-sm' style='font-size:14px;width:120px' lay-event='flzJieLI-add'>节理采集</button>	"
    + "		</div>	"
    + "	</script>	"
    + "	<script type='text/html' id='processedPatrolButon'>                                                      "
    + "			    <a class='layui-btn  layui-btn-xs' lay-event='update'>修改</a>  "
    + "			    <a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='delete'>删除</a>  "
    + "		</script>                                                                             "

//结构表
var jiegouTable = "	<form class='layui-form' style='margin-top:5px;margin-right:5px;' lay-filter='queryJiegouinfoform'>	"
    + "	    <div class='layui-form-item'>	"
    + "	        <div class='layui-row'>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <label class='layui-form-label'>模型</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <select id='modleIdJieGouSelect' name='modleId'>	"
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
    + "	<table class='layui-hide' id='jiegoutable-view' lay-filter='jiegoutable-view'></table>	"
    + "	<script type='text/html' id='flz-jieGou-add'>	"
    + "		<div class='layui-btn-container'>	"
    + "			<button class='layui-btn layui-btn-sm' style='font-size:14px;width:120px' lay-event='flzJieGou-add'>结构面采集</button>	"
    + "			<button class='layui-btn layui-btn-sm' style='font-size:14px;width:120px' lay-event='flzJieGou-pdf'>玫瑰花图</button>	"
    + "		</div>	"
    + "	</script>	"
    + "	<script type='text/html' id='jiGouButon'>                                                      "
    + "			    <a class='layui-btn  layui-btn-xs' lay-event='update'>修改</a>  "
    + "			    <a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='delete'>删除</a>  "
    + "		</script>                                                                             "
//节理把
console.log(layers);
var windouinfo = null;
var cequ = null;
var maxMinList = [];
var windowInfoList = [];
var windowtableview = null;
var jieLiTongjilayer = null;//节理统计弹出框
var jielitabledata = [];//节理表数据
var jielitableview = null;//节理表

var jieGouTongjilayer = null;//节狗统计弹出框
var jieGoutabledata = [];//节狗表数据
var jieGoutableview = null;//节狗表
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
                        cequList = JSON.parse(windowInfoList[i].vertices3dlbh);
                        windouinfo = windowInfoList[i];
                        for (var m in layers) {
                            if (layers[m].type =="FLZWINDOWFA") {
                                for (var j in layers[m].children) {
                                    if (layers[m].children[j].id == ("FLZWINDOW_" + data.field.windowId)) {
                                        var entityFater = viewer.entities.getById(layers[m].children[j].id);
                                        if (entityFater == undefined) {
                                            layers[m].spread = true;
                                            layers[m].children[j].spread = true;
                                            layers[m].children[j].checked = true;
                                            layers[m].spread = true;
                                            modeljiazaiFlag = false;
                                            tree.reload('prjlayerlistid', { data: layers });
                                            ClearTemp();
                                        } else {
                                            if (layers[m].children[j].datas.level.indexOf("y") != -1) {
                                                var home = JSON.parse(layers[m].children[j].datas.level);
                                                viewer.scene.camera.setView(home);
                                            } else {//老视角，
                                                viewer.zoomTo(entityFater, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(-(parseFloat(layers[m].children[j].datas.level))), Cesium.Math.toRadians(layers[m].children[j].datas.vertical), 40));
                                            }
                                        }
                                        break;
                                    }
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
        , area: ['500px', '400px']
        , shade: 0
        , offset: 'auto'
        , closeBtn: 1
        , anim: 0
        , maxmin: true
        , moveOut: true
        ,offset:'rt'
        , content: '<table class="layui-hide" id="windowtable-view" lay-filter="windowtable-view"></table><script type="text/html" id="flz-window-add"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm" style="font-size:14px;width:120px" lay-event="flzwindow-add">绘制测窗</button><button class="layui-btn layui-btn-sm" style="font-size:14px;width:120px;" lay-event="flzwindow-pdf">测窗成图</button></div></script><script type="text/html" id="table-toolbar-model"><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="modeldel"><i class="layui-icon layui-icon-delete" style="margin-right:20px;font-size:20px!important;color:#666!important;"></i></a></script>'
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);
            form.render();
            //监测剖面信息
            //测窗信息
           
            //获取测窗列表。
            getWindowList();
        }
        , end: function () {
            cequ = null;
            windowtabledata = [];
            windowtableview = null;
            viewer._container.style.cursor = "default";//还原鼠标样式
            ClearTemp();
            //取消画的图和点
            if (handler != undefined) {
                handler.destroy();
            }
        }
    });
   
}
// 获取测窗列表
function getWindowList() {
    var loadingWindowListindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
    $.ajax({
        url: servicesurl + "/api/FlzWindowInfo/GetWindowInfoList", type: "get", data: { "id": currentprojectid, "cookie": document.cookie },
        success: function (data) {
            windowtabledata = [];
            //测窗表
            if (windowtableview == null) {
                windowtableview = table.render({
                    elem: '#windowtable-view'
                    , id: 'windowtableviewid'
                    , title: '测窗信息'
                    , skin: 'line'
                    , even: false
                    , page: {
                        layout: ['prev', 'page', 'next', 'count']
                    }
                    , limit: 5
                    , toolbar: '#flz-window-add'
                    , totalRow: false
                    , initSort: { field: 'id', type: 'asc' }
                    , cols: [[
                        { field: 'id', title: 'ID', hide: true }
                        , { field: 'name', title: '名称', align: "center" }
                        , { field: 'sideLength', title: '长', align: "center" }
                        , { field: 'sidebLength', title: '宽', align: "center" }
                        , { field: 'creatTime', title: '时间',  align: "center" }
                        , { fixed: 'right', width: 80, align: 'center', toolbar: '#table-toolbar-model' }
                    ]]
                    , data: []
                });
                //绘制测窗
                table.on('toolbar(windowtable-view)', function (obj) {
                    console.log(obj);
                    if (obj.event == "flzwindow-add") {
                        drowmeasurWindow();
                    } else if (obj.event == "flzwindow-pdf") {
                        pdfWindowTongji();//6.3.测窗成图
                    };
                });

                //提交测窗
                table.on('tool(windowtable-view)', function (obj) {
                    console.log(obj);
                    layer.confirm('是否删除?', { icon: 3, title: '消息', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                        deleteWindow(obj.data);
                        layer.close(index);
                    });
                });
            }
            if (data == "没有项目") {
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
            }
            layer.close(loadingWindowListindex);
        }, datatype: "json"
    });
}
//节理统计
function jieLiTongji() {
    if (currentprojectid == null) {
        layer.msg('请先选择项目');
        return;
    }
    if (jieLiTongjilayer!=null) {
        layer.msg('已打开节理统计窗口');
        return;
    }
    jieLiTongjilayer = layer.open({
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
                    document.getElementById("modleIdSelect").innerHTML += '<option value="' + modleInfoList[i].Id + '">' + modleInfoList[i].RWMC + '_' + modleInfoList[i].YXCJSJ + '</option>';
                }
            };
            form.render();
            form.render('select');
            form.on('submit(queryJielisubmit)', function (data) {
                data.field.cookie = document.cookie;
                data.field.id = currentprojectid;
                data.field.type = '3';
                getJieLIList(data.field);
                return false;
            });
            jielitabledata = [];
            if (jielitableview==null) {
                jielitableview = table.render({
                    elem: '#jielitable-view'
                    , id: 'jielitableviewid'
                    , title: '节理信息'
                    , skin: 'line'
                    , even: false
                    , page: true
                    , limit: 10
                    , toolbar: '#flz-jieLI-add'
                    , totalRow: true
                    , initSort: { field: 'id', type: 'asc' }
                    , cols: [[
                        { field: 'id', title: 'ID', hide: true }
                        , { field: 'name', title: '节理编号',  align: "center", totalRowText: '合计' }
                        , { field: 'avgOpening', title: '平均张开度',  sort: true, align: "center", totalRow: true }
                        , { field: 'traceLength', title: '迹长', sort: true, align: "center", totalRow: true }
                        , { field: 'measure', title: '面积', sort: true,  align: "center", totalRow: true }
                        , { field: 'collector', title: '采集人',  align: "center" }
                        , { field: 'modleTime', title: '采集时间', sort: true,  align: "center", hide: true }
                        , { field: 'creatTime', title: '素描时间', sort: true,  align: "center", hide: true }
                        , { field: 'remarks', title: '备注', align: "center", hide: true }
                        , { fixed: 'right', width: 120, align: 'center', toolbar: '#processedPatrolButon' }
                    ]]
                    , data: []
                });
         


                //素描节理
                table.on('toolbar(jielitable-view)', function (obj) {
                    //console.log(obj);
                    //画节理
                    gotoJieli();
                    //if (obj.event == "flzwindow-add") {
                    //    drowmeasurWindow();
                    //} else if (obj.event == "flzwindow-pdf") {
                    //    pdfWindowTongji();//6.3.测窗成图
                    //};
                });

                //删除节理
                table.on('tool(jielitable-view)', function (obj) {
                    console.log(obj);
                    if (obj.event == "delete") {
                        layer.confirm('是否删除?', { icon: 3, title: '消息', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                            deleteJieli(obj.data);
                        });
                    } else if (obj.event == "update") {
                        //layer.confirm('是否删除?', { icon: 3, title: '消息', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                        //    deleteJieli(obj.data);
                        //});
                        updateJieLi(obj.data);
                    }
                    
                });
            }
            
            var datatemp = {
                "id": currentprojectid,
                "cookie": document.cookie,
                "collector": "",
                "modleId": "",
                "windowId": "",
                "type": 3
            };
            getJieLIList(datatemp);

        }
        , end: function () {
            jieLiTongjilayer = null;
            jielitabledata = [];
            jielitableview = null;
            viewer._container.style.cursor = "default";//还原鼠标样式
            ClearTemp();
            //取消画的图和点
            if (handler != undefined) {
                handler.destroy();
            }
            
        }
    });
    
    
    
}

//画结构面
function drwjiegou() {
    //本面积计算方法为：将所有点转换为大地坐标BLH，然后将H赋值为最大H，再转换为空间直角坐标XYZ，取XY计算面积
    var jiegouList = [];
    if (currentprojectid == null) {
        layer.msg('请先选择项目', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    if (modleInfo == null) {
        layer.msg('请先选择模型', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    viewer._container.style.cursor = "crosshair";//修改鼠标样式
    if (jieGouTongjilayer != null) {
        layer.min(jieGouTongjilayer);
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
                    if (points.length > 2) {//直接去那边了
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
            if (points.length >2) {

                DrowHuaHua("jiegou", linepoints, points);
            }

        }, Cesium.ScreenSpaceEventType.PINCH_START);
    }
    else {
        //右击
        handler.setInputAction(function (rightclik) {
            if (points.length > 2) {

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

var temppoints = []; //测窗信息全局变量。
//提交
function drowmeasurSubmit(filds) {
    if (modleInfo == null) {
        layer.msg('请先选择模型');
        return;
    }
    if (temppoints.length == 0) {
        layer.msg('请先绘制测窗');
        return;
    }
    var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
    var windowInfos = temppoints[0];
    var positList = windowInfos.positList;
    var data = {};
    data.name = filds.name;
    data.remarks = filds.remarks.length > 0 ? filds.remarks:"测窗";
    data.sideLength = 3;//边长1
    data.sidebLength = 4;//边长2  AxisX
    data.cookie = document.cookie;
    data.points = JSON.stringify(positList);//直接存吧
    data.projectId = currentprojectid;
    data.creatTime = y + '-' + (mouth < 10 ? '0' + mouth : mouth) + '-' + (d < 10 ? '0' + d : d);
    if (windowInfos != null) {
        data.axisx = JSON.stringify(windowInfos.AxisX);//x轴
        data.axisy = JSON.stringify(windowInfos.AxisY);//y轴   Normal Origin Vertices2D Vertices3D Vertices3D1
        data.normal = JSON.stringify(windowInfos);//法向量
        data.origin = JSON.stringify(windowInfos.Origin);//原点
        data.vertices2d = JSON.stringify(windowInfos.Vertices2D);//平，面
        data.vertices3d = JSON.stringify(windowInfos.Vertices3D);//空间执教
        data.vertices3dlbh = JSON.stringify(windowInfos.Vertices3D1);//大地坐标
    }
    //我算一个倾角不，倾角算出来，倾向，倾角。
    var tempList = [];
    tempList.push(positList[0]);
    tempList.push(positList[1]);
    tempList.push(positList[2]);
    var chanzhuang = getChanzhuang(positList);
    var qingXiang = parseFloat(chanzhuang.qingXiang) - 180;
    var qingJiao = parseFloat(chanzhuang.qingJiao) - 90;
    data.vertical = qingJiao.toFixed(2) + "-" + qingXiang.toFixed(2);
    //cun一个当前视野。
    var x = viewer.camera.position;
    var y1 = {
        // 指向
        heading: viewer.camera.heading,
        // 视角
        pitch: viewer.camera.pitch,
        roll: viewer.camera.roll
    }
    var home = {
        destination: x,
        orientation: y1
    }
    
    data.level = JSON.stringify(home);

    $.ajax({
        url: servicesurl + "/api/FlzWindowInfo/AddFlzWindow", type: "post", data: data,
        success: function (result) {
            layer.close(loadingceindex);
            if (isNaN(result)) {
                layer.msg("新增失败", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            } else {
                //成功了，要查询，什么的。
                layer.msg("新增成功", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                var firstflag = true;
                for (var i in layers) {
                    if (layers[i].type == "FLZWINDOWFA") {//测窗的
                            firstflag = false;
                            var flzline = new Object;
                            flzline.title = data.name;
                            flzline.id = "FLZWINDOW_" + result;
                            flzline.type = "FLZWINDOW";
                            flzline.remarks = data.remarks;
                            flzline.datas = data;
                            flzline.datas.id = result;
                            flzline.pointList = JSON.parse(data.points);
                            flzline.checked = true;
                            flzline.spread = true;
                            flzline.showCheckbox = true;//显示复选框
                            flzline.children = [];//显示复选框
                            layers[i].children.push(flzline);
                            layers[i].spread = true;
                            
                    }
                }
                if (firstflag) {//第一次，数据里面没有地质识别。
                    var dominantStructuralPlane = new Object;
                    dominantStructuralPlane.title = "测窗";
                    dominantStructuralPlane.type = "FLZWINDOWFA";
                    dominantStructuralPlane.spread = true;

                    var child = [];
                    var flzline = new Object;
                    flzline.title = data.name;
                    flzline.id = "FLZWINDOW_" + result;
                    flzline.type = "FLZWINDOW";
                    flzline.remarks = data.remarks;
                    flzline.datas = data;
                    flzline.datas.id = result;
                    flzline.pointList = JSON.parse(data.points);
                    flzline.checked = true;
                    flzline.spread = true;
                    flzline.showCheckbox = true;//显示复选框
                    flzline.children = [];//显示复选框
                    child.push(flzline);
                    dominantStructuralPlane.children = child;
                    layers.push(dominantStructuralPlane);
                }
                console.log(layers);
                if (cequ != null) {
                    var section = new Object;
                    section.id = result;
                    section.name = data.name;
                    section.creatTime = data.creatTime;
                    section.sideLength = data.sideLength;
                    section.sidebLength = data.sidebLength;
                    section.height = data.height;
                    section.remarks = data.remarks;
                    section.vertices3dlbh = data.vertices3dlbh;
                    section.normal = data.normal;
                    windowtabledata.push(section);
                    windowInfoList.push(section);
                    windowtableview.reload({ id: 'windowtableviewid', data: windowtabledata });
                }

                modeljiazaiFlag = false;
                tree.reload('prjlayerlistid', { data: layers });
                ClearTemp();

                layer.close(drowinfoAddlayerindex);
                //getWindowList();
            }

        }, datatype: "json"
    });

}
//画测窗
function drowmeasurWindow() {
    if (modleInfo == null) {
        layer.msg('请选择模型');
        return;
    }
    if (handler != undefined) {
        handler.destroy();
    }
    ClearTemp();
    handler = new Cesium.ScreenSpaceEventHandler(canvas);
    viewer._container.style.cursor = "crosshair";//修改鼠标样式
    //左击
    handler.setInputAction(function (leftclik) {

        var pickedOject = scene.pick(leftclik.position);
        if (pickedOject != undefined) {
            var position = scene.pickPosition(leftclik.position);
            if (position != undefined) {
                if (Cesium.defined(position)) {
                    viewer.entities.add({
                        name: "ptMeasue" + NewGuid(),
                        position: position,
                        point: {
                            pixelSize: 1,
                            color: Cesium.Color.YELLOW,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                        }
                    });

                    //var sideLength = 1.8;
                    var tempx = new Cesium.Cartesian2(leftclik.position.x + 1, leftclik.position.y);
                    var tempx1 = new Cesium.Cartesian2(leftclik.position.x, leftclik.position.y + 1);
                    var tempy = new Cesium.Cartesian2(leftclik.position.x, leftclik.position.y);


                    var biliciy = Cesium.Cartesian3.distance(scene.pickPosition(tempy), scene.pickPosition(tempx1));

                    var bilicixx = Math.sqrt((scene.pickPosition(tempy).x - scene.pickPosition(tempx).x) * (scene.pickPosition(tempy).x - scene.pickPosition(tempx).x) + (scene.pickPosition(tempy).y - scene.pickPosition(tempx).y) * (scene.pickPosition(tempy).y - scene.pickPosition(tempx).y));


                    var canshu1 = 1.5 / biliciy;
                    var canshu2 = 2 / bilicixx;

                    var fangxiang = new Cesium.Cartesian2(leftclik.position.x - 100, leftclik.position.y);

    

                    var eyepostion = new Cesium.Cartesian3(viewer.camera.position.x, viewer.camera.position.y, viewer.camera.position.z);

     
                    var jimiList = [];
                    jimiList.push(scene.pickPosition(fangxiang));
                    for (var x = 0; x < 11; x++) {
                        for (var m = 0; m < 11; m++) {

                            var temp = new Cesium.Cartesian2(leftclik.position.x - canshu2 + 0.2 * canshu2 * x, leftclik.position.y - canshu1 + 0.2 * canshu1 * m);//b点，加了5.

                            jimiList.push(scene.pickPosition(temp));
                        }
                    }

 

                    var sendDate = {};


                    sendDate.target = JSON.stringify(position);
                    sendDate.eye = JSON.stringify(eyepostion);
                    sendDate.sps = JSON.stringify(jimiList);
                    sendDate.w = 4;
                    sendDate.h = 3;
                    sendDate.cookie = document.cookie;
                    var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                    temppoints = [];
                    $.ajax({
                        url: servicesurl + "/api/FlzWindowInfo/getRockWindowInfo", type: "post", data: sendDate,//后台发送请求
                        success: function (result) {


                            layer.close(loadingceindex);
                            //关闭
                            var windowInfos = JSON.parse(result);
                            console.log(windowInfos);
                            if (windowInfos == null) {
                                layer.close(drowinfoAddlayerindex);
                                layer.msg("调用接口计算失败，请重新选择位置，所选的点不能形成平面", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });


                                if (handler != undefined) {
                                    handler.destroy();
                                }

                                isRedo = true;
                                points = [];
                                linepoints = [];
                                return false;
                            }
                            if (windowInfos == "") {
                                layer.msg("调用接口结算失败，请稍后再试", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            } else {
                                var BLHList = windowInfos.Vertices3D1;
                                BLHList.push(BLHList[0]);
                                var positList = [];

                                for (var i in BLHList) {
                                    //经纬度，现在的坐标，转换三维。
                                    positList.push(new Cesium.Cartesian3.fromDegrees(BLHList[i].L, BLHList[i].B, BLHList[i].H));

                                }
                                windowInfos.positList = positList;
                                temppoints.push(windowInfos);
                             
                                //绘制多边形临时边线
                                ClearTemp();//清楚上一次的测窗
                                viewer.entities.add({

                                    name: "ptMeasue" + NewGuid(),
                                    polyline: {
                                        positions: positList,
                                        width: 2,
                                        arcType: Cesium.ArcType.RHUMB,
                                        material: new Cesium.PolylineDashMaterialProperty({
                                            color: Cesium.Color.RED,
                                        }),
                                        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                            color: Cesium.Color.RED,
                                        }),
                                    }
                                });


                                //来一个弹出框输入
                                if (drowinfoAddlayerindex == null) {
                                    drowinfoAddlayerindex = layer.open({
                                        type: 1
                                        , title: ['测窗新增', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                                        , area: ['300px', '250px']
                                        , shade: 0
                                        , offset: ['130px', '260px']//头部，左边
                                        , closeBtn: 1
                                        , maxmin: true
                                        , moveOut: true
                                        , content: '<form class="layui-form" style="margin-top:5px;margin-right:25px;" lay-filter="addpointinfoform"><div class="layui-form-item" style="margin-top:15px;margin-right:5px;"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">面名称</label><div class="layui-input-block"><input type="text" name="name" lay-verify="required" autocomplete="off" placeholder="请输入" class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">描述</label><div class="layui-input-block"><input type="text" name="remarks"  autocomplete="off" placeholder="请输入"  class="layui-input" style="width:160px;"  /></div></div></div></div></div><div class="layui-form-item" style="margin-top:15px"><div style="position:absolute;right:15px;"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="addpointinfosubmit" style="width:100px">提交</button></div></div></form>'
                                        , zIndex: layer.zIndex
                                        , success: function (layero) {
                                            //置顶
                                            layer.setTop(layero);
                                            form.render();

                                            form.on('submit(addpointinfosubmit)', function (data) {
                                                console.log(data);
                                                drowmeasurSubmit(data.field);
                                                return false;
                                            });

                                        }
                                        , end: function () {
                                            drowinfoAddlayerindex = null;
                                        }, cancel: function () {//取消按钮
                                            viewer._container.style.cursor = "default";//还原鼠标样式
                                            ClearTemp();
                                            //取消画的图和点
                                            if (handler != undefined) {
                                                handler.destroy();
                                            }
                                        }
                                    });

                                }
                                

                            }

                        }, datatype: "json"
                    });
                    //viewer.entities.add({
                    //    name: "ptMeasue" + NewGuid(),
                    //    polyline: {
                    //        positions: points,
                    //        width: 2,
                    //        arcType: Cesium.ArcType.RHUMB,
                    //        material: Cesium.Color.RED,
                    //        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                    //            color: Cesium.Color.RED,
                    //        }),
                    //    }
                    //});
                    //if (Cesium.defined(position)) {

                    //    DrowHuaHua('newwindow', points, 'guding');

                    //}

                }
            }
        } else {
            layer.msg('请点击模型');
            return;
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

};

//删除测窗 
function deleteWindow(data) {
    var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

    $.ajax({
        url: servicesurl + "/api/FlzWindowInfo/DeleteFlzWindow", type: "delete", data: { "id": data.id, "cookie": document.cookie },
        success: function (result) {
            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });


            viewer.entities.removeById("FLZWINDOW_"+data.id);
            viewer.entities.removeById("FLZWINDOW_" +data.id + "_LABEL");


            for (var i in layers) {
                if (layers[i].type == "FLZWINDOWFA") {//测窗的
                    
                    for (var j in layers[i].children) {
                        if (layers[i].children[j].datas.id == data.id) {
                            if (layers[i].children[j].children&&layers[i].children[j].children.length>0) {
                                for (var m in layers[i].children[j].children) {
                                    if (layers[i].children[j].children[m].checked) {
                                        viewer.entities.removeById(layers[i].children[j].children[m].id);
                                    }
                                }
                            }
                            layers[i].children.splice(j, 1);
                            if (layers[i].children.length == 0) {//只有一条的情况下
                                layers.splice(i, 1);
                                break;
                            }

                            break;
                        }
                    }
                }
            }
            if (cequ!=null) {
                for (var m in windowtabledata) {
                    if ((windowtabledata[m].id) == data.id) {
                        windowtabledata.splice(m, 1);
                        break;
                    }
                }
                windowtableview.reload({ id: 'windowtableviewid', data: windowtabledata });
            }
           
            for (var m in windowInfoList) {
                if ((windowInfoList[m].id) == data.id) {
                    windowInfoList.splice(m, 1);
                    break;
                }
            }
            modeljiazaiFlag = false;
            tree.reload('prjlayerlistid', { data: layers });
            ClearTemp();
            layer.close(loadingceindex);

        }, datatype: "json"
    });
}
//查询节理信息
function getJieLIList(data) {
    var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
    $.ajax({
        url: servicesurl + "/api/FlzData/GetWindowInfoList", type: "get", data: data,
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
                    jieli.windowId = windowInfos[i].windowId; 
                    jielitabledata.push(jieli);
                }
                
                jielitableview.reload({ id: 'jielitableviewid', data: jielitabledata });
            }
            layer.close(loadingceindex);
        }, datatype: "json"
    });
}
//查询节理信息
function getJieGouList(data) {
    var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
    $.ajax({
        url: servicesurl + "/api/FlzData/GetWindowInfoList", type: "get", data: data,
        success: function (data) {
            jieGoutabledata = [];
            if (data == "") {
                //无监测剖面信息
                jieGoutableview.reload({ id: 'jieGoutableviewid', data: jieGoutabledata });
            }
            else {
                var windowInfos = JSON.parse(data);
                console.log(windowInfos);
                for (var i in windowInfos) {
                    var jieGou = new Object;
                    jieGou.id = windowInfos[i].id;
                    jieGou.name = windowInfos[i].name;
                    jieGou.avgOpening = windowInfos[i].avgOpening;
                    jieGou.inclination = windowInfos[i].inclination;
                    jieGou.dipAngle = windowInfos[i].dipAngle;
                    jieGou.trend = windowInfos[i].trend;
                    jieGou.traceLength = windowInfos[i].traceLength;
                    jieGou.measure = windowInfos[i].measure;
                    jieGou.modleTime = windowInfos[i].modleTime;
                    jieGou.creatTime = windowInfos[i].creatTime;
                    jieGou.remarks = windowInfos[i].remarks;
                    jieGoutabledata.push(jieGou);
                }

                jieGoutableview.reload({ id: 'jieGoutableviewid', data: jieGoutabledata });
            }
            layer.close(loadingceindex);
        }, datatype: "json"
    });
}

function jieGouTongji() {
    if (currentprojectid == null) {
        layer.msg('请先选择项目');
        return;
    }
    jieGouTongjilayer = layer.open({
        type: 1
        , title: ['优势结构面', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
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
            if (modleInfoList.length > 0) {//模型id
                for (var i in modleInfoList) {
                    document.getElementById("modleIdJieGouSelect").innerHTML += '<option value="' + modleInfoList[i].Id + '">' + modleInfoList[i].RWMC + '_' + modleInfoList[i].YXCJSJ + '</option>';
                }
            };
            form.render();
            form.render('select');
            form.on('submit(queryJiegousubmit)', function (data) {
                data.field.cookie = document.cookie;
                data.field.id = currentprojectid;
                data.field.type = "4";
                data.field.windowId = "";
                data.field.collector = "";
                getJieGouList(data.field);
                return false;
            });
            jieGoutableview = table.render({
                elem: '#jiegoutable-view'
                , id: 'jiegoutableviewid'
                , title: '结构面信息'
                , skin: 'line'
                , even: false
                , page: true
                , limit: 10
                , toolbar: '#flz-jieGou-add'
                , totalRow: true
                , initSort: { field: 'id', type: 'asc' }
                , cols: [[
                    { field: 'id', title: 'ID', hide: true }
                    , { field: 'name', title: '结构面编号', align: "center", totalRowText: '合计' }
                    , { field: 'inclination', title: '倾向', sort: true, align: "center" }
                    , { field: 'dipAngle', title: '倾角', sort: true, align: "center" }
                    , { field: 'trend', title: '走向', align: "center" }
                    , { field: 'modleTime', title: '采集时间', sort: true, align: "center", hide: true  }
                    , { field: 'creatTime', title: '素描时间', sort: true,  align: "center" }
                    , { field: 'remarks', title: '备注', align: "center", hide: true  }
                    , { fixed: 'right', width: 120, align: 'center', toolbar: '#jiGouButon' }
                ]]
                , data: []
            });
            //素描jiegou
            table.on('toolbar(jiegoutable-view)', function (obj) {
                console.log(obj);
               
                //gotoJieli();
                if (obj.event == "flzJieGou-add") {
                    drwjiegou();//画
                } else if (obj.event == "flzJieGou-pdf") {
                    jieLiMeiguihua();//节理玫瑰花
                };
            });

            //删除节理
            table.on('tool(jiegoutable-view)', function (obj) {
                console.log(obj);
                if (obj.event == "delete") {
                    layer.confirm('是否删除?', { icon: 3, title: '消息', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                        deleteJieGou(obj.data);
                    });
                } else if (obj.event == "update") {
                    
                    updateJieGou(obj.data);
                }

            });
        }
        , end: function () {
            jieGouTongjilayer = null;
            jieGoutabledata = [];//节狗表数据
            jieGoutableview = null;//节狗表
        }
    });
   
    var data= {
        "id": currentprojectid,
        "cookie": document.cookie,
        "type": "4",
        "modleId": "",
        "windowId": "",
        "collector": "",
    }
    getJieGouList(data);
}