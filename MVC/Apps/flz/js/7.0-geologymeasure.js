/*
 * 必须先引用layui
 * 必须先创建viewer变量
 * 必须先创建handler变量
 * 必须先引入common.js
 */
var geologymeasurewidget_layerindex = null;
var geologymeasurewidget_depthTestAgainstTerrain = null;               //深度检测初始值
var geologymeasurewidget_result = "";                                  //测量结果
var geologymeasurewidget_resultmean = "";                              //测量结果均值
var geologymeasurewidget_tipsentity = null;                            //操作提示
var geologymeasurewidget_ismulti = false;                              //是否重复多次测量
var geologymeasurewidget_istips = true;                                //是否操作提示
var geologymeasurewidget_isredo = false;               
var geologymeasurewidget_temppoints = [];
var geologymeasurewidget_tempentities = [];
var geologymeasurehistory = [];                                        //历史重复多次测量数据

//测量widget
function geologyMeasure(type) {
    
    if (geologymeasurewidget_layerindex != null) {
        LayerSetTop(geologymeasurewidget_layerindex);
        return;
    }
    //判断是否包含模型数据
    if (viewer.scene.primitives.length < 1) {
        layer.msg('请先加载实景模型数据！');
    }
    else {
        var iscontain = false;
        for (var i = 0; i < viewer.scene.primitives.length; i++) {
            var obj = viewer.scene.primitives.get(i);
            if (obj != undefined && obj._url != undefined && obj._url != "") {
                iscontain = true;
                type = "model";
            }
        }

        if (!iscontain) {
            layer.msg('请先加载实景模型数据！');
        }
    }
    geologymeasurewidget_layerindex = layer.open({
        type: 1
        , title: ['地质测量', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['350px', '330px']
        , shade: 0
        , offset: ['66px', '77%']
        , closeBtn: 1
        , maxmin: true
        , moveOut: true
        , resize: false
        , content: '<div class="layui-tab layui-tab-brief" lay-filter="geologymeasureway" style="margin:0px;"> <!-- <ul class="layui-tab-title"> <li lay-id="geologyterrainMeasure" class="layui-this" style="width:40%;padding-top: 10px;line-height: normal;">地形测量</li> <li lay-id="geologymodelMeasure" style="width:40%;padding-top:10px;line-height:20px">模型测量</li> </ul> --> <div class="layui-tab-content" style="padding:0px;"> <form class="layui-form" style="margin-top:0px;margin-left:0px;" lay-filter="geologymeasureinfoform"> <div class="layui-row" id="geologymeasureresultdivid"> <div class="layui-input-block" style="margin:5px 5px 0px 5px;"> <textarea name="geologymeasureresults" class="layui-textarea" placeholder="单次测量结果。" style="height:135px;width: 100%;font-size: 15px;line-height:22px;" readonly="readonly"></textarea> </div> </div> <div class="layui-row"> <div class="layui-col-xs6"> <div class="grid-demo grid-demo-bg1"> <div class="layui-form-item"><label class="layui-form-label">重复测量</label> <div class="layui-input-block"><input type="checkbox" name="geologymultiMeasure" id="geologymultiMeasureid" lay-filter="geologymultiMeasureswitch" lay-skin="switch" lay-text="是|否" disabled></div> </div> </div> </div> <div class="layui-col-xs6"> <div class="grid-demo"> <div class="layui-form-item"><label class="layui-form-label">操作提示</label> <div class="layui-input-block"><input type="checkbox" name="geologytipsMeasure" id="geologytipsMeasureid" lay-filter="geologytipsMeasureswitch" lay-skin="switch" lay-text="是|否"></div> </div> </div> </div> </div> </form> <div class="layui-btn-container" style="margin-left:8px;margin-top:10px;text-align:center "> <button type="button" class="layui-btn layui-btn-radius layui-btn-primary layui-btn-sm" style="width:100px;" id="widget_geologymeasure_slop_id" onclick="slopMeasure()">坡度</button> <button type="button" class="layui-btn layui-btn-radius layui-btn-primary layui-btn-sm" style="width:100px;" id="widget_geologymeasure_rock_id" onclick="rockMeasure()">岩层产状</button> <button type="button" class="layui-btn layui-btn-radius layui-btn-primary layui-btn-sm" style="width:100px;" id="widget_geologymeasure_anpo_id" onclick="anpoMeasure()">岸坡结构</button> </div> <div style="text-align:center;margin-top:0px;"> <button type="button" style="width:90%;background-color:#dddddd;color:#555;" class="layui-btn layui-btn-radius layui-btn-sm" id="widget_geologymeasure_clear_id" onclick="ClearGeologyCeliangTemp()">清除</button> </div> </div> <i style="position:absolute;right:5px;bottom:5px;margin:2px;display: inline-block;" id="geologytipid" onclick="geologyTipsAll()"><svg t="1657876629425" class="icon" style="position:relative;top:5px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3866" width="18" height="18"><path d="M512 4.12672c280.49408 0 507.87328 227.3792 507.87328 507.87328 0 280.49408-227.3792 507.87328-507.87328 507.87328C231.50592 1019.87328 4.12672 792.49408 4.12672 512 4.12672 231.50592 231.50592 4.12672 512 4.12672zM512 685.96736c-42.47552 0-76.91264 34.42688-76.91264 76.91264 0 42.47552 34.43712 76.91264 76.91264 76.91264 42.47552 0 76.91264-34.43712 76.91264-76.91264C588.91264 720.39424 554.47552 685.96736 512 685.96736zM509.78816 625.83808c36.58752 0 66.24256-29.66528 66.24256-66.24256l0-309.1456c0-36.58752-29.65504-66.24256-66.24256-66.24256-36.58752 0-66.24256 29.66528-66.24256 66.24256l0 309.1456C443.5456 596.18304 473.20064 625.83808 509.78816 625.83808z" p-id="3867" fill="#bfbfbf"></path></svg></i> </div>'
        , success: function (layero) {
            layer.setTop(layero);

            layui.form.val("geologymeasureinfoform", {
                "geologymultiMeasure": geologymeasurewidget_ismulti
                , "geologytipsMeasure": geologymeasurewidget_istips
            });

            //操作提示
            geologymeasurewidget_tipsentity = viewer.entities.add({
                label: {
                    show: false,
                    showBackground: true,
                    font: "14px monospace",
                    horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                    pixelOffset: new Cesium.Cartesian2(20, 20),
                    scaleByDistance: new Cesium.NearFarScalar(20000, 1, 8000000, 0),
                },
            });

            //记录当前深度检测值
            geologymeasurewidget_depthTestAgainstTerrain = viewer.scene.globe.depthTestAgainstTerrain;

            //if (type == "model") {
            //    layui.element.tabChange('geologymeasureway', 'geologymodelMeasure');//模型
            //}
            //else if (type == "terrain") {
            //    layui.element.tabChange('geologymeasureway', 'geologyterrainMeasure');//地形
            //}
            //else {
            //    if (viewer.scene.globe.depthTestAgainstTerrain) {
            //        layui.element.tabChange('geologymeasureway', 'geologyterrainMeasure');//地形
            //    }
            //    else {
            //        layui.element.tabChange('geologymeasureway', 'geologymodelMeasure');//模型
            //    }
            //}

            layui.form.render();
        }
        , end: function () {
            viewer.scene.globe.depthTestAgainstTerrain = geologymeasurewidget_depthTestAgainstTerrain;//还原当前深度检测值
            viewer._container.style.cursor = "default";//还原鼠标样式
            ClearGeologyCeliangTemp();
            viewer.entities.remove(geologymeasurewidget_tipsentity);//删除操作提示

            //还原参数
            geologymeasurewidget_layerindex = null;
            geologymeasurewidget_depthTestAgainstTerrain = null;
            geologymeasurewidget_result = "";
            geologymeasurewidget_resultmean = "";    
            geologymeasurewidget_tipsentity = null;
            geologymeasurewidget_ismulti = false;
            geologymeasurewidget_istips = true;
            geologymeasurewidget_isredo = false;
            geologymeasurewidget_temppoints = [];
            geologymeasurewidget_tempentities = [];
            geologymeasurehistory = [];
            document.getElementById("geologymeasureresultdivid").innerHTML = ' <div class="layui-input-block" style="margin:5px 5px 0px 5px;"> <textarea name="geologymeasureresults" class="layui-textarea" style="height:135px;width: 100%;font-size: 15px;line-height:22px;" readonly="readonly"></textarea> </div> ';

            if (handler != undefined) {
                handler.destroy();
            }
        }
    });
};

//是否重复测量
layui.form.on('switch(geologymultiMeasureswitch)', function (data) {
    geologymeasurewidget_ismulti = data.elem.checked;
    if (data.elem.checked) {
        document.getElementById("geologymeasureresultdivid").innerHTML = ' <div class="layui-col-xs6"> <li style="text-align: center;padding-top:5px;">测量结果</li> <div class="layui-input-block" style="margin:5px 5px 0px 5px;"> <textarea name="geologymeasureresults"class="layui-textarea" placeholder="重复测量结果。" style="height:110px;width: 98%;font-size: 15px;line-height:22px;" readonly="readonly"></textarea> </div> </div> <div class="layui-col-xs6"> <li style="text-align: center;padding-top:5px;">测量均值</li> <div class="layui-input-block" style="margin:5px 5px 0px 5px;"> <textarea name="geologymeasureresultsmean"class="layui-textarea" placeholder="重复测量均值。" style="height:110px;width: 98%;font-size: 15px;line-height:22px;" readonly="readonly"></textarea> </div> </div>';
    }
    else {
        document.getElementById("geologymeasureresultdivid").innerHTML = ' <div class="layui-input-block" style="margin:5px 5px 0px 5px;"> <textarea name="geologymeasureresults" class="layui-textarea" placeholder="单次测量结果。" style="height:135px;width: 100%;font-size: 15px;line-height:22px;" readonly="readonly"></textarea> </div> ';
    }
    layui.form.render();
    return false;
});

//是否操作提示
layui.form.on('switch(geologytipsMeasureswitch)', function (data) {
    geologymeasurewidget_istips = data.elem.checked;
    return false;
});

////切换地形/模型测量
//layui.element.on('tab(geologymeasureway)', function (data) {
//    //清除测量结果
//    layui.form.val("geologymeasureinfoform", {
//        "geologymeasureresults": "",
//    });

//    if (geologymeasurewidget_tempentities.length > 0) {
//        for (var i in geologymeasurewidget_tempentities) {
//            if (viewer.entities.contains(geologymeasurewidget_tempentities[i])) {
//                viewer.entities.remove(geologymeasurewidget_tempentities[i]);
//            }
//        }
//    }

//    geologymeasurewidget_isredo = false;
//    geologymeasurewidget_temppoints = [];
//    geologymeasurewidget_tempentities = [];

//    //清除临时图形
//    ClearGeologyCeliangTemp();

//    //清除当前工具
//    cancelGeologyMeasureTool();

//    if (data.index == 0) {
//        viewer.scene.globe.depthTestAgainstTerrain = true;//地形测量
//    }
//    else if (data.index == 1) {
//        viewer.scene.globe.depthTestAgainstTerrain = false;//模型测量

//        //判断是否包含模型数据
//        if (viewer.scene.primitives.length < 1) {
//            layer.msg('请先加载实景模型数据！');
//        }
//        else {
//            var iscontain = false;
//            for (var i = 0; i < viewer.scene.primitives.length; i++) {
//                var obj = viewer.scene.primitives.get(i);
//                if (obj != undefined && obj._url != undefined && obj._url != "") {
//                    iscontain = true;
//                }
//            }

//            if (!iscontain) {
//                layer.msg('请先加载实景模型数据！');
//            }
//        }
//    }
//});

//坡度测量
function slopMeasure() {
    $('#geologymultiMeasureid').removeAttr('disabled');
    layui.form.render();

    selectGeologyMeasureOperate("widget_geologymeasure_slop_id");//标识当前选中工具
    viewer._container.style.cursor = "crosshair";//修改鼠标样式
    ClearGeologyCeliangTemp();//清除临时图形
    

    geologymeasurewidget_temppoints = [];//清除临时点
    geologymeasurewidget_tempentities = [];//清除临时图形
    geologymeasurewidget_result = "";//清除测量结果
    geologymeasurewidget_resultmean = "";//清除测量结果均值
    geologymeasurehistory = [];//清除历史记录
    
    if (handler != undefined) {
        handler.destroy();
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    //左键（开始测量）
    handler.setInputAction(function (leftclick) {
        if (!geologymeasurewidget_ismulti) {
            geologymeasurewidget_result = "";
        }


        if (!geologymeasurewidget_ismulti && geologymeasurewidget_isredo) {
            ClearGeologyCeliangSingle();
            geologymeasurewidget_isredo = false;
        }

        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            pickedOject = viewer.scene.pickPosition(leftclick.position);//地形测量
        }
        else {
            pickedOject = viewer.scene.pick(leftclick.position);//模型测量
        }

        if (pickedOject != undefined) {
            var position = viewer.scene.pickPosition(leftclick.position);//返回值为空间直角坐标
            if (position != undefined) {
                var cartesian = Cesium.Cartographic.fromCartesian(position);//返回BLH

                if (Cesium.defined(position)) {
                    var tempentity = viewer.entities.add({
                        name: "pt_Measure_single_" + NewGuid(),
                        position: position,
                        point: {
                            pixelSize: 8,
                            color: Cesium.Color.YELLOW,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                        },
                    });
                    geologymeasurewidget_temppoints.push(position);
                    geologymeasurewidget_tempentities.push(tempentity);
                }
                if (geologymeasurewidget_temppoints.length > 1) {
                    var tempentity_line = viewer.entities.add({
                        name: "pl_Measure_single_" + NewGuid(),
                        polyline: {
                            positions: [geologymeasurewidget_temppoints[geologymeasurewidget_temppoints.length - 2], position],
                            width: 2,
                            arcType: Cesium.ArcType.RHUMB,
                            material: Cesium.Color.DARKORANGE,
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.DARKORANGE,
                            }),
                        }
                    });
                    geologymeasurewidget_tempentities.push(tempentity_line);
                }

                if (geologymeasurewidget_temppoints.length == 3) {
                    if (viewer.entities.getById("line_temp9999") != null) {
                        viewer.entities.removeById("line_temp9999");
                    }
                    if (viewer.entities.getById("line_temp9998") != null) {
                        viewer.entities.removeById("line_temp9998");
                    }
                    //绘制多边形闭合线
                    viewer.entities.add({
                        name: "pl_Measure_single_" + NewGuid(),
                        polyline: {
                            positions: [geologymeasurewidget_temppoints[0], geologymeasurewidget_temppoints[geologymeasurewidget_temppoints.length - 1]],
                            width: 2,
                            arcType: Cesium.ArcType.RHUMB,
                            material: Cesium.Color.DARKORANGE,
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.DARKORANGE,
                            }),
                        }
                    });
                    //计算产状
                    var chanzhuang = getChanzhuang(geologymeasurewidget_temppoints);
                    var slop = chanzhuang.qingJiao;
                    geologymeasurehistory.push(chanzhuang);
                    //求取中心点定位
                    var xsum = 0;
                    var ysum = 0;
                    var zsum = 0;
                    for (var i = 0; i < geologymeasurewidget_temppoints.length; i++) {

                        xsum += geologymeasurewidget_temppoints[i].x;
                        ysum += geologymeasurewidget_temppoints[i].y;
                        zsum += geologymeasurewidget_temppoints[i].z;

                    }
                    viewer.entities.add({
                        name: "py_Measure_single_label_" + NewGuid(),
                        position: new Cesium.Cartesian3(xsum / geologymeasurewidget_temppoints.length, ysum / geologymeasurewidget_temppoints.length, zsum / geologymeasurewidget_temppoints.length),
                        label: {
                            text: '坡度:' + slop.toFixed(0) + '°',
                            font: '12px Times New Roman',
                            showBackground: true,
                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            scaleByDistance: new Cesium.NearFarScalar(500, 1, 10000, 0)
                        }
                    });
                    //显示结果
                    if (geologymeasurewidget_result == "") {
                        geologymeasurewidget_result = '坡度：' + slop.toFixed(0) + '°';
                    }
                    else {
                        geologymeasurewidget_result = '坡度：' + slop.toFixed(0) + '°\n\n' + geologymeasurewidget_result;

                        //计算平均值
                        var sumslop = 0;
                        if (geologymeasurehistory.length < 5) {
                            for (var i in geologymeasurehistory) {
                                sumslop += geologymeasurehistory[i].qingJiao;
                            }
                            var meanslop = sumslop / geologymeasurehistory.length;
                        }
                        else{
                            //剔除坡度最大值和最小值（原始值-平均值后的最大和最小值）
                            for (var i in geologymeasurehistory) {
                                sumslop += geologymeasurehistory[i].qingJiao;
                            }
                            var slop_mean = sumqingjiao / geologymeasurehistory.length;
                            var slop_Arr = [];
                            for (var i in geologymeasurehistory) {
                                slop_Arr.push(Math.abs(geologymeasurehistory[i].qingJiao - slop_mean));
                            }
                            sumslop = 0;
                            var num = 0;
                            for (var i in geologymeasurehistory) {
                                if (i != slop_Arr.indexOf(Math.max(...slop_Arr)) && i != slop_Arr.indexOf(Math.min(...slop_Arr))) {
                                    num += 1;
                                    sumslop += geologymeasurehistory[i].qingJiao;
                                }
                            }
                            meanslop = sumslop / num;
                        }
                        geologymeasurewidget_resultmean = '坡度：' + meanslop.toFixed(0) + '°';

                    }

                    if (geologymeasurewidget_result != "") {
                        layui.form.val("geologymeasureinfoform", {
                            "geologymeasureresults": geologymeasurewidget_result,
                            "geologymeasureresultsmean": geologymeasurewidget_resultmean
                        });
                    }
                    geologymeasurewidget_isredo = true;
                    geologymeasurewidget_temppoints = [];
                    geologymeasurewidget_tempentities = [];
                }
            }

        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //右键（取消工具）
    handler.setInputAction(function (rightclik) {
        //当已画一点时清除
        if (geologymeasurewidget_temppoints.length == 1 && geologymeasurewidget_tempentities.length == 1) {
            if (viewer.entities.contains(geologymeasurewidget_tempentities[0])) {
                viewer.entities.remove(geologymeasurewidget_tempentities[0]);

                geologymeasurewidget_temppoints = [];
                geologymeasurewidget_tempentities = [];
            }
        }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    //移动（操作提示）
    handler.setInputAction(function (move) {
        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            pickedOject = viewer.scene.pickPosition(move.endPosition);//地形测量

        } else {
            pickedOject = viewer.scene.pick(move.endPosition);//模型测量
        }

        if (pickedOject != undefined) {
            var position = viewer.scene.pickPosition(move.endPosition);
            if (position != undefined) {
                geologymeasurewidget_tipsentity.position = position;
                geologymeasurewidget_tipsentity.label.show = geologymeasurewidget_istips;
                geologymeasurewidget_tipsentity.label.text = "左键点击开始测量，右键点击重新开始测量";
            }
            else {
                geologymeasurewidget_tipsentity.label.show = false;
                geologymeasurewidget_tipsentity.label.text = "";
            }
        }
        else {
            geologymeasurewidget_tipsentity.label.show = false;
            geologymeasurewidget_tipsentity.label.text = "";
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
};

//岩层产状测量
function rockMeasure() {
    $('#geologymultiMeasureid').removeAttr('disabled');
    layui.form.render();

    selectGeologyMeasureOperate("widget_geologymeasure_rock_id");//标识当前选中工具
    viewer._container.style.cursor = "crosshair";//修改鼠标样式
    ClearGeologyCeliangTemp();//清除临时图形
    
    geologymeasurewidget_temppoints = [];//清除临时点
    geologymeasurewidget_tempentities = [];//清除临时图形
    geologymeasurewidget_result = "";//清除测量结果
    geologymeasurewidget_resultmean = "";//清除测量结果均值
    geologymeasurehistory = [];//清除历史记录

    if (handler != undefined) {
        handler.destroy();
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    //左键（开始测量）
    handler.setInputAction(function (leftclick) {
        if (!geologymeasurewidget_ismulti) {
            geologymeasurewidget_result = "";
        }
       
        if (!geologymeasurewidget_ismulti && geologymeasurewidget_isredo) {
            ClearGeologyCeliangSingle();
            geologymeasurewidget_isredo = false;
        }

        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            pickedOject = viewer.scene.pickPosition(leftclick.position);//地形测量
        }
        else {
            pickedOject = viewer.scene.pick(leftclick.position);//模型测量
        }

        if (pickedOject != undefined) {
            var position = viewer.scene.pickPosition(leftclick.position);//返回值为空间直角坐标
            if (position != undefined) {
                var cartesian = Cesium.Cartographic.fromCartesian(position);//返回BLH

                if (Cesium.defined(position)) {
                    var tempentity = viewer.entities.add({
                        name: "pt_Measure_single_" + NewGuid(),
                        position: position,
                        point: {
                            pixelSize: 8,
                            color: Cesium.Color.YELLOW,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                        },
                    });
                    geologymeasurewidget_temppoints.push(position);
                    geologymeasurewidget_tempentities.push(tempentity);
                }
                if (geologymeasurewidget_temppoints.length > 1) {
                    var tempentity_line = viewer.entities.add({
                        name: "pl_Measure_single_" + NewGuid(),
                        polyline: {
                            positions: [geologymeasurewidget_temppoints[geologymeasurewidget_temppoints.length - 2], position],
                            width: 2,
                            arcType: Cesium.ArcType.RHUMB,
                            material: Cesium.Color.DARKORANGE,
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.DARKORANGE,
                            }),
                        }
                    });
                    geologymeasurewidget_tempentities.push(tempentity_line);
                }

                if (geologymeasurewidget_temppoints.length == 3) {
                    if (viewer.entities.getById("line_temp9999") != null) {
                        viewer.entities.removeById("line_temp9999");
                    }
                    if (viewer.entities.getById("line_temp9998") != null) {
                        viewer.entities.removeById("line_temp9998");
                    }
                    //绘制多边形闭合线
                    viewer.entities.add({
                        name: "pl_Measure_single_" + NewGuid(),
                        polyline: {
                            positions: [geologymeasurewidget_temppoints[0], geologymeasurewidget_temppoints[geologymeasurewidget_temppoints.length - 1]],
                            width: 2,
                            arcType: Cesium.ArcType.RHUMB,
                            material: Cesium.Color.DARKORANGE,
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.DARKORANGE,
                            }),
                        }
                    });

                    var chanzhuang = getChanzhuang(geologymeasurewidget_temppoints);
                    chanzhuang.zouXiang = null;
                    //确定走向(取小值)
                    if (chanzhuang.qingXiang < 90) {
                        chanzhuang.zouXiang = chanzhuang.qingXiang + 90;
                    }
                    else if (chanzhuang.qingXiang >90 && chanzhuang.qingXiang < 270) {
                        chanzhuang.zouXiang = chanzhuang.qingXiang - 90;
                    }
                    else {
                        chanzhuang.zouXiang = chanzhuang.qingXiang - 270;
                    }
                    geologymeasurehistory.push(chanzhuang);
                    //求取中心点定位
                    var xsum = 0;
                    var ysum = 0;
                    var zsum = 0;
                    for (var i = 0; i < geologymeasurewidget_temppoints.length; i++) {
                        
                        xsum += geologymeasurewidget_temppoints[i].x;
                        ysum += geologymeasurewidget_temppoints[i].y;
                        zsum += geologymeasurewidget_temppoints[i].z;
                        
                    }
                    viewer.entities.add({
                        name: "py_Measure_single_label_" + NewGuid(),
                        position: new Cesium.Cartesian3(xsum / geologymeasurewidget_temppoints.length, ysum / geologymeasurewidget_temppoints.length, zsum / geologymeasurewidget_temppoints.length),
                        label: {
                            text: '倾向:' + chanzhuang.qingXiang.toFixed(0) + '°\n 倾角:' + chanzhuang.qingJiao.toFixed(0) + '°',
                            font: '12px Times New Roman',
                            showBackground: true,
                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            scaleByDistance: new Cesium.NearFarScalar(500, 1, 10000, 0)
                        }
                    });
                    //显示结果
                    if (geologymeasurewidget_result == "") {
                        geologymeasurewidget_result = "走向：" + chanzhuang.zouXiang.toFixed(0) + "°\n倾向：" + chanzhuang.qingXiang.toFixed(0) + '°\n倾角：' + chanzhuang.qingJiao.toFixed(0) + '°';
                    }
                    else {
                        geologymeasurewidget_result = "走向：" + chanzhuang.zouXiang.toFixed(0) + "°\n倾向：" + chanzhuang.qingXiang.toFixed(0) + '°\n倾角：' + chanzhuang.qingJiao.toFixed(0) + '°\n\n' + geologymeasurewidget_result;
                        
                        //计算平均值
                        var sumqingxiang = 0;
                        var sumqingjiao = 0;
                        var meanzouxiang = 0;
                        var meanqingxiang = 0;
                        var meanqingjiao = 0;
                        if (geologymeasurehistory.length < 5) {
                            for (var i in geologymeasurehistory) {
                                sumqingxiang += geologymeasurehistory[i].qingXiang;
                                sumqingjiao += geologymeasurehistory[i].qingJiao;
                            }
                            meanqingxiang = sumqingxiang / geologymeasurehistory.length;
                            meanqingjiao = sumqingjiao / geologymeasurehistory.length;
                            
                        }
                        else if (geologymeasurehistory.length >= 5 && geologymeasurehistory.length < 10) {
                            //剔除倾角最大值和倾向最大值
                            for (var i in geologymeasurehistory) {
                                sumqingxiang += geologymeasurehistory[i].qingXiang;
                                sumqingjiao += geologymeasurehistory[i].qingJiao;
                            }
                            var qingxiang_mean = sumqingxiang / geologymeasurehistory.length;
                            var qingjiao_mean = sumqingjiao / geologymeasurehistory.length;
                            var qingxiang_Arr = [];
                            var qingjiao_Arr = [];
                            for (var i in geologymeasurehistory) {
                                qingxiang_Arr.push(Math.abs(geologymeasurehistory[i].qingXiang - qingxiang_mean));
                                qingjiao_Arr.push(Math.abs(geologymeasurehistory[i].qingJiao - qingjiao_mean));
                            }
                            sumqingxiang = 0;
                            sumqingjiao = 0;
                            var num = 0;
                            for (var i in geologymeasurehistory) {
                                if (i != qingxiang_Arr.indexOf(Math.max(...qingxiang_Arr)) && i != qingjiao_Arr.indexOf(Math.max(...qingjiao_Arr))) {
                                    num += 1;
                                    sumqingxiang += geologymeasurehistory[i].qingXiang;
                                    sumqingjiao += geologymeasurehistory[i].qingJiao;
                                }
                                
                            }
                            meanqingxiang = sumqingxiang / num;
                            meanqingjiao = sumqingjiao / num;
                            
                        }
                        else {
                            //剔除倾角最大值和最小值，倾向最大值和最小值
                            for (var i in geologymeasurehistory) {
                                sumqingxiang += geologymeasurehistory[i].qingXiang;
                                sumqingjiao += geologymeasurehistory[i].qingJiao;
                            }
                            var qingxiang_mean = sumqingxiang / geologymeasurehistory.length;
                            var qingjiao_mean = sumqingjiao / geologymeasurehistory.length;
                            var qingxiang_Arr = [];
                            var qingjiao_Arr = [];
                            for (var i in geologymeasurehistory) {
                                qingxiang_Arr.push(Math.abs(geologymeasurehistory[i].qingXiang - qingxiang_mean));
                                qingjiao_Arr.push(Math.abs(geologymeasurehistory[i].qingJiao - qingjiao_mean));
                            }
                            sumqingxiang = 0;
                            sumqingjiao = 0;
                            var num = 0;
                            for (var i in geologymeasurehistory) {
                                if (i != qingxiang_Arr.indexOf(Math.max(...qingxiang_Arr)) && i != qingxiang_Arr.indexOf(Math.min(...qingxiang_Arr)) && i != qingjiao_Arr.indexOf(Math.max(...qingjiao_Arr)) && i != qingjiao_Arr.indexOf(Math.min(...qingjiao_Arr))) {
                                    num += 1;
                                    sumqingxiang += geologymeasurehistory[i].qingXiang;
                                    sumqingjiao += geologymeasurehistory[i].qingJiao;
                                }

                            }
                            meanqingxiang = sumqingxiang / num;
                            meanqingjiao = sumqingjiao / num;
                        }
                        //确定走向(取小值),走向由倾向确定
                        if (meanqingxiang < 90) {
                            meanzouxiang = meanqingxiang + 90;
                        }
                        else if (meanqingxiang > 90 && meanqingxiang < 270) {
                            meanzouxiang = meanqingxiang - 90;
                        }
                        else {
                            meanzouxiang = meanqingxiang - 270;
                        }
                        geologymeasurewidget_resultmean = "走向：" + meanzouxiang.toFixed(0) + "°\n倾向：" + meanqingxiang.toFixed(0) + '°\n倾角：' + meanqingjiao.toFixed(0) + '°';

                    }

                    if (geologymeasurewidget_result != "") {
                        layui.form.val("geologymeasureinfoform", {
                            "geologymeasureresults": geologymeasurewidget_result,
                            "geologymeasureresultsmean": geologymeasurewidget_resultmean
                        });
                    }
                    geologymeasurewidget_isredo = true;
                    geologymeasurewidget_temppoints = [];
                    geologymeasurewidget_tempentities = [];
                }
            }
            
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //右键（取消工具）
    handler.setInputAction(function (rightclik) {
        //当已画一点时清除
        if (geologymeasurewidget_temppoints.length == 1 && geologymeasurewidget_tempentities.length == 1) {
            if (viewer.entities.contains(geologymeasurewidget_tempentities[0])) {
                viewer.entities.remove(geologymeasurewidget_tempentities[0]);

                geologymeasurewidget_temppoints = [];
                geologymeasurewidget_tempentities = [];
            }
        }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    //移动（操作提示）
    handler.setInputAction(function (move) {
        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            pickedOject = viewer.scene.pickPosition(move.endPosition);//地形测量

        } else {
            pickedOject = viewer.scene.pick(move.endPosition);//模型测量
        }

        if (pickedOject != undefined) {
            var position = viewer.scene.pickPosition(move.endPosition);
            if (position != undefined) {
                geologymeasurewidget_tipsentity.position = position;
                geologymeasurewidget_tipsentity.label.show = geologymeasurewidget_istips;
                geologymeasurewidget_tipsentity.label.text = "左键点击开始测量，右键点击重新开始测量";
            }
            else {
                geologymeasurewidget_tipsentity.label.show = false;
                geologymeasurewidget_tipsentity.label.text = "";
            }
        }
        else {
            geologymeasurewidget_tipsentity.label.show = false;
            geologymeasurewidget_tipsentity.label.text = "";
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
};

//岸坡结构测量
function anpoMeasure() {
    selectGeologyMeasureOperate("widget_geologymeasure_anpo_id");//标识当前选中工具
    viewer._container.style.cursor = "crosshair";//修改鼠标样式
    ClearGeologyCeliangTemp();//清除临时图形
    
    geologymeasurewidget_temppoints = [];//清除临时点
    geologymeasurewidget_tempentities = [];//清除临时图形
    geologymeasurewidget_result = "";//清除测量结果
    geologymeasurewidget_resultmean = "";//清除测量结果均值
    geologymeasurehistory = [];//清除历史记录

    $('#geologymultiMeasureid').prop("checked", false);
    geologymeasurewidget_ismulti = false;
    document.getElementById("geologymeasureresultdivid").innerHTML = ' <div class="layui-input-block" style="margin:5px 5px 0px 5px;"> <textarea name="geologymeasureresults" class="layui-textarea" placeholder="单次测量结果。" style="height:135px;width: 100%;font-size: 15px;line-height:22px;" readonly="readonly"></textarea> </div> ';
    $('#geologymultiMeasureid').attr("disabled", "disabled");
    layui.form.render();

    var anpochanzhuangresult = null;
    var yancengchanzhuangresult = null;

    if (handler != undefined) {
        handler.destroy();
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    //左键（开始测量岩层倾向）
    handler.setInputAction(function (leftclick) {
        if (!geologymeasurewidget_ismulti) {
            geologymeasurewidget_result = "";
            
        }
        
        if (!geologymeasurewidget_ismulti && geologymeasurewidget_isredo) {
            ClearGeologyCeliangSingle();
            geologymeasurewidget_isredo = false;
        }

        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            pickedOject = viewer.scene.pickPosition(leftclick.position);//地形测量
        }
        else {
            pickedOject = viewer.scene.pick(leftclick.position);//模型测量
        }

        if (pickedOject != undefined) {
            var position = viewer.scene.pickPosition(leftclick.position);//返回值为空间直角坐标
            if (position != undefined) {
                var cartesian = Cesium.Cartographic.fromCartesian(position);//返回BLH

                if (Cesium.defined(position)) {
                    var tempentity = viewer.entities.add({
                        name: "pt_Measure_single_" + NewGuid(),
                        position: position,
                        point: {
                            pixelSize: 8,
                            color: Cesium.Color.YELLOW,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                        },
                    });
                    geologymeasurewidget_temppoints.push(position);
                    geologymeasurewidget_tempentities.push(tempentity);
                }
                if (geologymeasurewidget_temppoints.length > 1) {
                    var tempentity_line = viewer.entities.add({
                        name: "pl_Measure_single_" + NewGuid(),
                        polyline: {
                            positions: [geologymeasurewidget_temppoints[geologymeasurewidget_temppoints.length - 2], position],
                            width: 2,
                            arcType: Cesium.ArcType.RHUMB,
                            material: Cesium.Color.DARKORANGE,
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.DARKORANGE,
                            }),
                        }
                    });
                    geologymeasurewidget_tempentities.push(tempentity_line);
                }

                if (geologymeasurewidget_temppoints.length == 3) {
                    if (viewer.entities.getById("line_temp9999") != null) {
                        viewer.entities.removeById("line_temp9999");
                    }
                    if (viewer.entities.getById("line_temp9998") != null) {
                        viewer.entities.removeById("line_temp9998");
                    }
                    //绘制多边形闭合线
                    viewer.entities.add({
                        name: "pl_Measure_single_" + NewGuid(),
                        polyline: {
                            positions: [geologymeasurewidget_temppoints[0], geologymeasurewidget_temppoints[geologymeasurewidget_temppoints.length - 1]],
                            width: 2,
                            arcType: Cesium.ArcType.RHUMB,
                            material: Cesium.Color.DARKORANGE,
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.DARKORANGE,
                            }),
                        }
                    });

                    var chanzhuang = getChanzhuang(geologymeasurewidget_temppoints);
                    
                    geologymeasurehistory.push(chanzhuang);
                    //求取中心点定位
                    var xsum = 0;
                    var ysum = 0;
                    var zsum = 0;
                    for (var i = 0; i < geologymeasurewidget_temppoints.length; i++) {

                        xsum += geologymeasurewidget_temppoints[i].x;
                        ysum += geologymeasurewidget_temppoints[i].y;
                        zsum += geologymeasurewidget_temppoints[i].z;

                    }
                    viewer.entities.add({
                        name: "py_Measure_single_label_" + NewGuid(),
                        position: new Cesium.Cartesian3(xsum / geologymeasurewidget_temppoints.length, ysum / geologymeasurewidget_temppoints.length, zsum / geologymeasurewidget_temppoints.length),
                        label: {
                            text: '岩层产状：\n倾向:' + chanzhuang.qingXiang.toFixed(0) + '°\n 倾角:' + chanzhuang.qingJiao.toFixed(0) + '°',
                            font: '12px Times New Roman',
                            showBackground: true,
                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            scaleByDistance: new Cesium.NearFarScalar(500, 1, 10000, 0)
                        }
                    });
                    //显示结果
                    if (yancengchanzhuangresult == null) {
                        yancengchanzhuangresult = chanzhuang;
                    }
                    
                    geologymeasurewidget_isredo = true;
                    geologymeasurewidget_temppoints = [];
                    geologymeasurewidget_tempentities = [];
                }
            }

        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //右键（开始测量岸坡倾向）
    handler.setInputAction(function (rightclick) {
        if (anpochanzhuangresult!=null) {
            if (!geologymeasurewidget_ismulti) {
                geologymeasurewidget_result = "";
            }
            
            if (!geologymeasurewidget_ismulti && geologymeasurewidget_isredo) {
                ClearGeologyCeliangSingle();
                geologymeasurewidget_isredo = false;
            }

        }
        if (yancengchanzhuangresult == null) {
            layer.msg('请先左击计算岩层产状！');
        }
        else {
            var pickedOject;
            if (viewer.scene.globe.depthTestAgainstTerrain) {
                pickedOject = viewer.scene.pickPosition(rightclick.position);//地形测量
            }
            else {
                pickedOject = viewer.scene.pick(rightclick.position);//模型测量
            }

            if (pickedOject != undefined) {
                var position = viewer.scene.pickPosition(rightclick.position);//返回值为空间直角坐标
                if (position != undefined) {
                    var cartesian = Cesium.Cartographic.fromCartesian(position);//返回BLH

                    if (Cesium.defined(position)) {
                        var tempentity = viewer.entities.add({
                            name: "pt_Measure_single_" + NewGuid(),
                            position: position,
                            point: {
                                pixelSize: 8,
                                color: Cesium.Color.YELLOW,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY
                            },
                        });
                        geologymeasurewidget_temppoints.push(position);
                        geologymeasurewidget_tempentities.push(tempentity);
                    }
                    if (geologymeasurewidget_temppoints.length > 1) {
                        var tempentity_line = viewer.entities.add({
                            name: "pl_Measure_single_" + NewGuid(),
                            polyline: {
                                positions: [geologymeasurewidget_temppoints[geologymeasurewidget_temppoints.length - 2], position],
                                width: 2,
                                arcType: Cesium.ArcType.RHUMB,
                                material: Cesium.Color.RED,
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.RED,
                                }),
                            }
                        });
                        geologymeasurewidget_tempentities.push(tempentity_line);
                    }

                    if (geologymeasurewidget_temppoints.length == 3) {
                        if (viewer.entities.getById("line_temp9999") != null) {
                            viewer.entities.removeById("line_temp9999");
                        }
                        if (viewer.entities.getById("line_temp9998") != null) {
                            viewer.entities.removeById("line_temp9998");
                        }
                        //绘制多边形闭合线
                        viewer.entities.add({
                            name: "pl_Measure_single_" + NewGuid(),
                            polyline: {
                                positions: [geologymeasurewidget_temppoints[0], geologymeasurewidget_temppoints[geologymeasurewidget_temppoints.length - 1]],
                                width: 2,
                                arcType: Cesium.ArcType.RHUMB,
                                material: Cesium.Color.RED,
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.RED,
                                }),
                            }
                        });

                        var chanzhuang = getChanzhuang(geologymeasurewidget_temppoints);
                        geologymeasurehistory.push(chanzhuang);
                        //求取中心点定位
                        var xsum = 0;
                        var ysum = 0;
                        var zsum = 0;
                        for (var i = 0; i < geologymeasurewidget_temppoints.length; i++) {

                            xsum += geologymeasurewidget_temppoints[i].x;
                            ysum += geologymeasurewidget_temppoints[i].y;
                            zsum += geologymeasurewidget_temppoints[i].z;

                        }
                        viewer.entities.add({
                            name: "py_Measure_single_label_" + NewGuid(),
                            position: new Cesium.Cartesian3(xsum / geologymeasurewidget_temppoints.length, ysum / geologymeasurewidget_temppoints.length, zsum / geologymeasurewidget_temppoints.length),
                            label: {
                                text: '岸坡产状：\n倾向:' + chanzhuang.qingXiang.toFixed(0) + '°\n 倾角:' + chanzhuang.qingJiao.toFixed(0) + '°',
                                font: '12px Times New Roman',
                                showBackground: true,
                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                scaleByDistance: new Cesium.NearFarScalar(500, 1, 10000, 0)
                            }
                        });
                        //显示结果
                        if (anpochanzhuangresult == null) {
                            anpochanzhuangresult = chanzhuang;
                        }
                        if (anpochanzhuangresult != null && yancengchanzhuangresult != null) {
                            geologymeasurewidget_result = "岸坡结构:\n岩层倾角：" + yancengchanzhuangresult.qingJiao.toFixed(0) + "°\n岩层倾向与岸坡倾向夹角：" + Math.abs(anpochanzhuangresult.qingXiang - yancengchanzhuangresult.qingXiang).toFixed(0) + "°";
                            if (geologymeasurewidget_result != "") {
                                layui.form.val("geologymeasureinfoform", {
                                    "geologymeasureresults": geologymeasurewidget_result
                                });
                            }
                        }
                        geologymeasurewidget_isredo = true;
                        geologymeasurewidget_temppoints = [];
                        geologymeasurewidget_tempentities = [];

                        anpochanzhuangresult = null;
                        yancengchanzhuangresult = null;
                    }
                }

            }
        }
        
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    //移动（操作提示）
    handler.setInputAction(function (move) {
        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            pickedOject = viewer.scene.pickPosition(move.endPosition);//地形测量

        } else {
            pickedOject = viewer.scene.pick(move.endPosition);//模型测量
        }

        if (pickedOject != undefined) {
            var position = viewer.scene.pickPosition(move.endPosition);
            if (position != undefined) {
                geologymeasurewidget_tipsentity.position = position;
                geologymeasurewidget_tipsentity.label.show = geologymeasurewidget_istips;
                geologymeasurewidget_tipsentity.label.text = "左键点击开始测量岩层倾向，右键点击开始测量岸坡倾向";
            }
            else {
                geologymeasurewidget_tipsentity.label.show = false;
                geologymeasurewidget_tipsentity.label.text = "";
            }
        }
        else {
            geologymeasurewidget_tipsentity.label.show = false;
            geologymeasurewidget_tipsentity.label.text = "";
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}

//说明
function geologyTipsAll() {
    layer.confirm('<p style="font-size:12px"><h3>坡度：</h3>坡度测量工具支持鼠标左击选择3个点，三个点尽量形成等边三角形，构成一个平面，计算坡体坡度；在选中重复测量时，对同一坡体进行多次测量，并计算平均值。</br></br> <h3>岩层产状：</h3>岩层产状测量工具可测量岩层产状三要素（走向、倾向和倾角），支持鼠标左击选择3个点，三个点尽量形成等边三角形，构成一个平面；在选中重复测量时，对同一岩层进行多次测量，并计算平均值。</br></br> <h3> 岸坡结构测量：</h3>岸坡结构测量工具支持鼠标左击依次在目标岩层上选择3个点，三个点尽量形成等边三角形，构成一个平面，计算岩层倾向和倾角；鼠标右击依次在目标岸坡上选择3个点，三个点尽量形成等边三角形，构成一个平面，计算岸坡倾向。\n\n</p><br/>', { icon: '&#xe60b;', title: ['说明', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei'], area: ['350px', '330px'], zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
        layer.close(index);
    });
}

//选中测量操作按钮
function selectGeologyMeasureOperate(id) {
    unselectGeologyMeasureOperate();
    document.getElementById(id).style = "color:#FFFFFF;background-color:#5FB878;width:100px;";
};

//取消测量操作按钮
function unselectGeologyMeasureOperate() {
    document.getElementById("widget_geologymeasure_slop_id").style = "width:100px;";
    document.getElementById("widget_geologymeasure_rock_id").style = "width:100px;";
    document.getElementById("widget_geologymeasure_anpo_id").style = "width:100px;";
    document.getElementById("widget_geologymeasure_slop_id").className = "layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm";
    document.getElementById("widget_geologymeasure_rock_id").className = "layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm";
    document.getElementById("widget_geologymeasure_anpo_id").className = "layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm";
};

//取消测量工具
function cancelGeologyMeasureTool() {
    if (handler != undefined) {
        handler.destroy();
    }

    viewer._container.style.cursor = "default";//还原鼠标样式
    unselectGeologyMeasureOperate();//还原工具按钮样式
    if (geologymeasurewidget_tipsentity != null && geologymeasurewidget_tipsentity != undefined) {
        geologymeasurewidget_tipsentity.label.show = false;
        geologymeasurewidget_tipsentity.label.text = "";
    }
};

//清除临时图形
function ClearGeologyCeliangTemp() {
    var count = 0;
    while (count < 40) {
        for (var i = 0; i < viewer.entities._entities._array.length; i++) {
            if ((viewer.entities._entities._array[i]._name) && ((viewer.entities._entities._array[i]._name.indexOf("temppoint") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("temppolygon") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("ptMeasure_") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("ptMeasure_label_") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("plMeasue") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("pllMeasue") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("pyMeasue") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("pylMeasue") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("alMeasue") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("ptOccurrence") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("positonPoint") > -1))
            ) {
                viewer.entities.remove(viewer.entities._entities._array[i]);
            }
        }
        count++
    }
    if (viewer.entities.getById("line_temp9999") != null) {
        viewer.entities.removeById("line_temp9999");
    }
    if (viewer.entities.getById("line_temp9998") != null) {
        viewer.entities.removeById("line_temp9998");
    }

    geologymeasurewidget_temppoints = [];
    geologymeasurewidget_tempentities = [];
    ClearGeologyCeliangSingle();
}

//清除单次测量图形
function ClearGeologyCeliangSingle() {
    var count = 0;
    while (count < 40) {
        for (var i = 0; i < viewer.entities._entities._array.length; i++) {
            if ((viewer.entities._entities._array[i]._name) && ((viewer.entities._entities._array[i]._name.indexOf("temppoint") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("temppolygon") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("pt_Measure_single_") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("pl_Measure_single_") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("pl_Measure_single_label_") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("ptl_Measue_single") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("py_Measue_single") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("py_Measure_single_label_") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("al_Measure_single") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("pt_Occurrence_single") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("positonPoint_single") > -1))
            ) {
                viewer.entities.remove(viewer.entities._entities._array[i]);
            }
        }
        count++
    }


    if (viewer.entities.getById("line_temp9999") != null) {
        viewer.entities.removeById("line_temp9999");
    }
    if (viewer.entities.getById("line_temp9998") != null) {
        viewer.entities.removeById("line_temp9998");
    }
    layui.form.val("geologymeasureinfoform", {
        "geologymeasureresults": "",
        "geologymeasureresultsmean":""
    });
    geologymeasurewidget_result = "";
    geologymeasurewidget_resultmean = "";   
    geologymeasurewidget_temppoints = [];
    geologymeasurewidget_tempentities = [];
}

function ToDegress(val) {
    if (typeof (val) == "undefined" || val == "") {
        return ""
    }
    val = val + "";
    var i = val.indexOf('.');
    var strDu = i < 0 ? val : val.substring(0, i);
    var strFen = 0;
    var strMiao = 0;
    var val2 = "";
    if (i > 0) {
        val2 = "0" + val.substring(i)
        val2 = val2 * 60 + "";
        var j = val2.indexOf('.');
        strFen = val2.substring(0, j);
        strMiao = "0" + val2.substring(j);

        strMiao = strMiao * 60 + "";
        strMiao = strMiao.substring(0, j + 4);
        strMiao = parseFloat(strMiao).toFixed(0);
    }
    return strDu + "°" + strFen + "′" + strMiao + "″"
}