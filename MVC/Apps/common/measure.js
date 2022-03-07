/*
 * 必须先引用layui
 * 必须先创建viewer变量
 * 必须先创建handler变量
 * 必须先引入common.js
 */
var measurewidget_layerindex = null;
var measurewidget_depthTestAgainstTerrain = null;               //深度检测初始值
var measurewidget_result = "";                                  //测量结果
var measurewidget_tipsentity = null;                            //操作提示
var measurewidget_ismulti = false;                              //是否连续测量
var measurewidget_istips = true;                                //是否操作提示
var measurewidget_isredo = false;
var measurewidget_temppoints = [];
var measurewidget_tempentities = [];

//测量widget
function Measurewidget() {
    if (measurewidget_layerindex != null) {
        layer.setTop(measurewidget_layerindex);
        return;
    }

    measurewidget_layerindex = layer.open({
        type: 1
        , title: ['测量工具', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['350px', '330px']
        , shade: 0
        , offset: ['85px', '1530px']
        , closeBtn: 1
        , maxmin: true
        , moveOut: true
        , resize: false
        , content: '<div class="layui-tab layui-tab-brief" lay-filter="measureway" style="margin:0px;"><ul class="layui-tab-title"><li lay-id="terrainMeasure" class="layui-this" style="width:40%;padding-top: 10px;line-height: normal;">地形测量</li><li lay-id="modelMeasure" style="width:40%;padding-top:10px;line-height:20px">模型测量</li></ul><div class="layui-tab-content" style="padding:0px;"><form class="layui-form" style="margin-top:0px;margin-left:0px;" lay-filter="measureinfoform"><div class="layui-row"><div class="layui-input-block" style="margin:5px 5px 0px 5px;"><textarea name="measureresults" placeholder="请先选择测量方式后开始测量。" class="layui-textarea" style="height:110px;width: 100%;font-size: 15px;line-height:22px;" readonly="readonly"></textarea></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label">连续测量</label><div class="layui-input-block"><input type="checkbox" name="multiMeasure" lay-filter="multiMeasureswitch" lay-skin="switch" lay-text="是|否"></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label">操作提示</label><div class="layui-input-block"><input type="checkbox" name="tipsMeasure" lay-filter="tipsMeasureswitch" lay-skin="switch" lay-text="是|否"></div></div></div></div></div></form><div class="layui-btn-container" style="margin-left:8px;margin-top:10px;text-align:center "><button type="button" class="layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm" style="width:55px;" id="widget_measure_point_id" onclick="pointMeasure()">坐标</button><button type="button" class="layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm" style="width:55px;" id="widget_measure_height_id" onclick="heightMeasure()">高差</button><button type="button" class="layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm" style="width:55px;" id="widget_measure_distance_id" onclick="distanceMeasure()">距离</button><button type="button" class="layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm" style="width:55px;" id="widget_measure_area_id" onclick="areaMeasure()">面积</button><button type="button" class="layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm" style="width:55px;" id="widget_measure_azimuth_id" onclick="azimuthMeasure()">方位角</button></div><div style="text-align:center;margin-top:0px;"><button type="button" style="width:90%;background-color:#dddddd;" class="layui-btn layui-btn-radius layui-btn-sm" id="widget_measure_clear_id" onclick="ClearCeliangTemp()">清除</button></div></div></div>'
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);

            layui.form.val("measureinfoform", {
                "multiMeasure": measurewidget_ismulti
                , "tipsMeasure": measurewidget_istips
            });

            //操作提示
            measurewidget_tipsentity = viewer.entities.add({
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
            measurewidget_depthTestAgainstTerrain = viewer.scene.globe.depthTestAgainstTerrain;
            if (viewer.scene.globe.depthTestAgainstTerrain) {
                layui.element.tabChange('measureway', 'terrainMeasure');//地形
            }
            else {
                layui.element.tabChange('measureway', 'modelMeasure');//模型
            }

            layui.form.render();
        }
        , end: function () {
            viewer.scene.globe.depthTestAgainstTerrain = measurewidget_depthTestAgainstTerrain;//还原当前深度检测值
            viewer._container.style.cursor = "default";//还原鼠标样式
            ClearCeliangTemp();
            viewer.entities.remove(measurewidget_tipsentity);//删除操作提示

            //还原参数
            measurewidget_layerindex = null;
            measurewidget_depthTestAgainstTerrain = null;
            measurewidget_result = "";
            measurewidget_tipsentity = null;
            measurewidget_ismulti = true;
            measurewidget_istips = true;
            measurewidget_isredo = false;
            measurewidget_temppoints = [];
            measurewidget_tempentities = [];

            if (handler != undefined) {
                handler.destroy();
            }
        }
    });
};

//是否连续测量
layui.form.on('switch(multiMeasureswitch)', function (data) {
    measurewidget_ismulti = data.elem.checked;
    return false;
});
//是否操作提示
layui.form.on('switch(tipsMeasureswitch)', function (data) {
    measurewidget_istips = data.elem.checked;
    return false;
});

//切换地形/模型测量
layui.element.on('tab(measureway)', function (data) {
    //清除测量结果
    layui.form.val("measureinfoform", {
        "measureresults": "",
    });

    if (measurewidget_tempentities.length > 0) {
        for (var i in measurewidget_tempentities) {
            if (viewer.entities.contains(measurewidget_tempentities[i])) {
                viewer.entities.remove(measurewidget_tempentities[i]);
            }
        }
    }

    measurewidget_isredo = false;
    measurewidget_temppoints = [];
    measurewidget_tempentities = [];

    //清除临时图形
    ClearCeliangTemp();

    //清除当前工具
    cancelMeasureTool();

    if (data.index == 0) {
        viewer.scene.globe.depthTestAgainstTerrain = true;//地形测量
    }
    else if (data.index == 1) {
        viewer.scene.globe.depthTestAgainstTerrain = false;//模型测量

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
                }
            }

            if (!iscontain) {
                layer.msg('请先加载实景模型数据！');
            }
        }
    }
});


//坐标测量
function pointMeasure() {
    selectMeasureOperate("widget_measure_point_id");//标识当前选中工具
    viewer._container.style.cursor = "crosshair";//修改鼠标样式
    ClearCeliangTemp();//清除临时图形

    measurewidget_result = "";//清除测量结果

    if (handler != undefined) {
        handler.destroy();
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    //左键（开始测量）
    handler.setInputAction(function (leftclick) {
        if (!measurewidget_ismulti) {
            measurewidget_result = "";//清空测量结果
            ClearCeliangTemp();//清除测量图形
        }

        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            pickedOject = viewer.scene.pickPosition(leftclick.position);//地形测量
        } else {
            pickedOject = viewer.scene.pick(leftclick.position);//模型测量
        }

        if (pickedOject != undefined) {
            var position = viewer.scene.pickPosition(leftclick.position);
            if (position != undefined) {
                var lon;
                var lat;
                var height;

                if (viewer.scene.globe.depthTestAgainstTerrain) {
                    var blh = Cesium.Cartographic.fromCartesian(position);
                    lon = Cesium.Math.toDegrees(blh.longitude);
                    lat = Cesium.Math.toDegrees(blh.latitude);
                    height = blh.height;
                }
                else {
                    var blh = CGCS2000XYZ2BLH(position.x, position.y, position.z);
                    lon = blh.y;
                    lat = blh.x;
                    height = blh.z;
                }

                if (height > 0) {
                    if (measurewidget_result == "") {
                        measurewidget_result = "经  度： " + lon.toFixed(6) + "°\n纬  度： " + lat.toFixed(6) + "°\n高  程： " + (height).toFixed(3) + "m";
                    }
                    else {
                        measurewidget_result = "经  度： " + lon.toFixed(6) + "°\n纬  度： " + lat.toFixed(6) + "°\n高  程： " + (height).toFixed(3) + "m\n\n" + measurewidget_result;
                    }

                    if (Cesium.defined(position)) {
                        viewer.entities.add({
                            name: "ptMeasure_" + NewGuid(),
                            position: position,
                            billboard: {
                                image: "../Resources/img/mark/p19.png",
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                width: 25,
                                height: 25,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY
                            }
                        });
                        viewer.entities.add({
                            name: "ptMeasure_label_" + NewGuid(),
                            position: position,
                            label: {
                                text: lon.toFixed(6) + ', ' + lat.toFixed(6) + ', ' + (height).toFixed(3),
                                showBackground: true,
                                fillColor: Cesium.Color.AQUA,
                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                font: '18px Times New Roman',
                                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                pixelOffset: new Cesium.Cartesian2(0.0, -50),
                                scaleByDistance: new Cesium.NearFarScalar(20000, 1, 8000000, 0),
                            }
                        });

                        if (measurewidget_result != "") {
                            layui.form.val("measureinfoform", {
                                "measureresults": measurewidget_result
                            });
                        }

                        //针对移动设备
                        if (isMobile.any()) {
                            if (handler != undefined) {
                                handler.destroy();
                            }
                        }
                    }
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //移动（操作提示）
    handler.setInputAction(function (move) {
        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            pickedOject = viewer.scene.pickPosition(move.endPosition);//地形测量

        } else {
            pickedOject = viewer.scene.pick(move.endPosition); //模型测量
        }

        if (pickedOject != undefined) {
            var position = viewer.scene.pickPosition(move.endPosition);
            if (position != undefined) {
                measurewidget_tipsentity.position = position;
                measurewidget_tipsentity.label.show = measurewidget_istips;
                measurewidget_tipsentity.label.text = "左键点击开始测量";
            }
            else {
                measurewidget_tipsentity.label.show = false;
                measurewidget_tipsentity.label.text = "";
            }
        }
        else {
            measurewidget_tipsentity.label.show = false;
            measurewidget_tipsentity.label.text = "";
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
};
//高差测量
function heightMeasure() {
    selectMeasureOperate("widget_measure_height_id");//标识当前选中工具
    viewer._container.style.cursor = "crosshair";//修改鼠标样式
    ClearCeliangTemp();//清除临时图形

    measurewidget_temppoints = [];//清除临时点
    measurewidget_tempentities = [];//清除临时图形
    measurewidget_result = "";//清除测量结果

    if (handler != undefined) {
        handler.destroy();
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    //左键（开始测量）
    handler.setInputAction(function (leftclick) {
        if (!measurewidget_ismulti) {
            measurewidget_result = "";
        }

        if (!measurewidget_ismulti && measurewidget_isredo) {
            ClearCeliangSingle();
            measurewidget_isredo = false;
        }

        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            pickedOject = viewer.scene.pickPosition(leftclick.position);//地形测量
        }
        else {
            pickedOject = viewer.scene.pick(leftclick.position);//模型测量
        }

        if (pickedOject != undefined) {
            var xyz = viewer.scene.pickPosition(leftclick.position);
            if (xyz != undefined) {
                var rblh = Cesium.Cartographic.fromCartesian(xyz);
                var tempentity = viewer.entities.add({
                    name: "pt_Measure_single_" + NewGuid(),
                    position: xyz,
                    point: {
                        pixelSize: 8,
                        color: Cesium.Color.YELLOW,
                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                    }
                });
                measurewidget_temppoints.push(xyz);
                measurewidget_tempentities.push(tempentity);

                if (measurewidget_temppoints.length == 2) {
                    var point = measurewidget_temppoints[0];
                    viewer.entities.add({
                        name: "pl_Measure_single_" + NewGuid(),
                        polyline: {
                            positions: [point, xyz],
                            width: 1,
                            material: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.fromCssColorString('#00FF00')
                            }),
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.fromCssColorString('#00FF00')
                            }),
                        }
                    });
                    var rblh1 = Cesium.Cartographic.fromCartesian(point);
                    if (rblh1.height > rblh.height) {
                        var b = rblh.latitude * 180 / Math.PI;
                        var l = rblh.longitude * 180 / Math.PI;
                        var h = rblh.height;

                        viewer.entities.add({
                            name: "pl_Measure_single_" + NewGuid(),
                            polyline: {
                                positions: [point, Cesium.Cartesian3.fromDegrees(l, b, rblh1.height)],
                                width: 1,
                                material: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.fromCssColorString('#00FF00')
                                }),
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.fromCssColorString('#00FF00')
                                }),
                            }
                        });
                        viewer.entities.add({
                            name: "pl_Measure_single_" + NewGuid(),
                            polyline: {
                                positions: [xyz, Cesium.Cartesian3.fromDegrees(l, b, rblh1.height)],
                                width: 2,
                                material: Cesium.Color.DARKORANGE,
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.DARKORANGE
                                }),
                            }
                        });
                        viewer.entities.add({
                            name: "pl_Measure_single_label_" + NewGuid(),
                            position: Cesium.Cartesian3.fromDegrees(l, b, rblh1.height),
                            label: {
                                text: '高差：' + (rblh1.height - h).toFixed(3) + 'm',
                                showBackground: true,
                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                font: '18px Times New Roman',
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                pixelOffset: new Cesium.Cartesian2(0.0, -30),
                                scaleByDistance: new Cesium.NearFarScalar(20000, 1, 8000000, 0),
                            }
                        });
                        var len = Cesium.Cartesian3.distance(measurewidget_temppoints[0], measurewidget_temppoints[1]);
                        var dis = Math.sqrt(Math.pow(len, 2) - Math.pow(rblh1.height - h, 2));

                        //viewer.entities.add({
                        //    name: "pl_Measure_single_label_" + NewGuid(),
                        //    position: Cesium.Cartesian3.fromDegrees((l + rblh1.longitude * 180 / Math.PI) / 2, (b + rblh1.latitude * 180 / Math.PI) / 2, (rblh1.height + h) / 2),

                        //    label: {
                        //        text: '距离：' + sum.toFixed(2) + 'm',
                        //        showBackground: true,
                        //        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                        //        font: '16px Times New Roman',
                        //        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        //        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                        //        disableDepthTestDistance: Number.POSITIVE_INFINITY
                        //    }
                        //});
                        //viewer.entities.add({
                        //    name: "pl_Measure_single_label_" + NewGuid(),
                        //    position: measurewidget_temppoints[0],
                        //    label: {
                        //        text: '倾角：' + (Math.acos(pingju / sum) * 180 / Math.PI).toFixed(2) + '°',
                        //        showBackground: true,
                        //        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                        //        font: '16px Times New Roman',
                        //        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        //        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                        //        disableDepthTestDistance: Number.POSITIVE_INFINITY,
                        //        pixelOffset: new Cesium.Cartesian2(0.0, -60),
                        //    }
                        //});

                        if (measurewidget_result == "") {
                            measurewidget_result = "空间距离：" + len.toFixed(3) + "m\n平面距离：" + dis.toFixed(3) + "m\n高       差：" + (rblh1.height - h).toFixed(3) + "m\n倾       角：" + (Math.acos(dis / len) * 180 / Math.PI).toFixed(2) + '°';
                        }
                        else {
                            measurewidget_result = "空间距离：" + len.toFixed(3) + "m\n平面距离：" + dis.toFixed(3) + "m\n高       差：" + (rblh1.height - h).toFixed(3) + "m\n倾       角：" + (Math.acos(dis / len) * 180 / Math.PI).toFixed(2) + '°\n\n' + measurewidget_result;
                        }

                        if (measurewidget_result != "") {
                            layui.form.val("measureinfoform", {
                                "measureresults": measurewidget_result
                            });
                        }

                        measurewidget_isredo = true;
                        measurewidget_temppoints = [];
                        measurewidget_tempentities = [];
                    }
                    else if (rblh1.height < rblh.height) {
                        var b = rblh1.latitude * 180 / Math.PI;
                        var l = rblh1.longitude * 180 / Math.PI;
                        var h = rblh1.height;

                        viewer.entities.add({
                            name: "pl_Measure_single_" + NewGuid(),
                            polyline: {
                                positions: [point, Cesium.Cartesian3.fromDegrees(l, b, rblh.height)],
                                width: 2,
                                material: Cesium.Color.DARKORANGE,
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.DARKORANGE
                                }),
                            }
                        });
                        viewer.entities.add({
                            name: "pl_Measure_single_" + NewGuid(),
                            polyline: {
                                positions: [xyz, Cesium.Cartesian3.fromDegrees(l, b, rblh.height)],
                                width: 1,
                                material: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.fromCssColorString('#00FF00'),
                                }),
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.fromCssColorString('#00FF00'),
                                }),
                            }
                        });
                        viewer.entities.add({
                            name: "pl_Measure_single_label_" + NewGuid(),
                            position: Cesium.Cartesian3.fromDegrees(l, b, rblh.height),
                            label: {
                                text: '高差：' + (rblh.height - h).toFixed(3) + 'm',
                                showBackground: true,
                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                font: '18px Times New Roman',
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                pixelOffset: new Cesium.Cartesian2(0.0, -30),
                                scaleByDistance: new Cesium.NearFarScalar(20000, 1, 8000000, 0),
                            }
                        });

                        var len = Cesium.Cartesian3.distance(measurewidget_temppoints[0], measurewidget_temppoints[1]);
                        var dis = Math.sqrt(Math.pow(len, 2) - Math.pow(rblh.height - h, 2));

                        //viewer.entities.add({
                        //    name: "pl_Measure_single_label_" + NewGuid(),
                        //    position: Cesium.Cartesian3.fromDegrees((l + rblh.longitude * 180 / Math.PI) / 2, (b + rblh.latitude * 180 / Math.PI) / 2, (rblh.height + h) / 2),

                        //    label: {
                        //        text: '距离：' + sum.toFixed(2) + 'm',
                        //        showBackground: true,
                        //        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                        //        font: '16px Times New Roman',
                        //        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        //        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                        //        disableDepthTestDistance: Number.POSITIVE_INFINITY
                        //    }
                        //});
                        //viewer.entities.add({
                        //    name: "pl_Measure_single_label_" + NewGuid(),
                        //    position: measurewidget_temppoints[1],

                        //    label: {
                        //        text: '倾角：' + (Math.acos(pingju / sum) * 180 / Math.PI).toFixed(2) + '°',
                        //        showBackground: true,
                        //        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                        //        font: '16px Times New Roman',
                        //        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        //        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                        //        disableDepthTestDistance: Number.POSITIVE_INFINITY,
                        //        pixelOffset: new Cesium.Cartesian2(0.0, -60),
                        //    }
                        //});

                        if (measurewidget_result == "") {
                            measurewidget_result = "空间距离：" + len.toFixed(3) + "m\n平面距离：" + dis.toFixed(3) + "m\n高       差：" + (rblh.height - h).toFixed(3) + "m\n倾       角：" + (Math.acos(dis / len) * 180 / Math.PI).toFixed(2) + '°';
                        }
                        else {
                            measurewidget_result = "空间距离：" + len.toFixed(3) + "m\n平面距离：" + dis.toFixed(3) + "m\n高       差：" + (rblh.height - h).toFixed(3) + "m\n倾       角：" + (Math.acos(dis / len) * 180 / Math.PI).toFixed(2) + '°\n\n' + measurewidget_result;
                        }

                        if (measurewidget_result != "") {
                            layui.form.val("measureinfoform", {
                                "measureresults": measurewidget_result
                            });
                        }

                        measurewidget_isredo = true;
                        measurewidget_temppoints = [];
                        measurewidget_tempentities = [];
                    }

                    //针对移动设备
                    if (isMobile.any()) {
                        if (handler != undefined) {
                            handler.destroy();
                        }
                    }
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //右键（取消工具）
    handler.setInputAction(function (rightclik) {
        //当已画一点时清除
        if (measurewidget_temppoints.length == 1 && measurewidget_tempentities.length == 1) {
            if (viewer.entities.contains(measurewidget_tempentities[0])) {
                viewer.entities.remove(measurewidget_tempentities[0]);

                measurewidget_temppoints = [];
                measurewidget_tempentities = [];
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
                measurewidget_tipsentity.position = position;
                measurewidget_tipsentity.label.show = measurewidget_istips;
                measurewidget_tipsentity.label.text = "左键点击开始测量，右键点击重新开始测量";
            }
            else {
                measurewidget_tipsentity.label.show = false;
                measurewidget_tipsentity.label.text = "";
            }
        }
        else {
            measurewidget_tipsentity.label.show = false;
            measurewidget_tipsentity.label.text = "";
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
};
//距离测量
function distanceMeasure() {
    selectMeasureOperate("widget_measure_distance_id"); //标识当前选中工具
    viewer._container.style.cursor = "crosshair";//修改鼠标样式
    ClearCeliangTemp();//清除临时图形

    measurewidget_temppoints = [];//清除临时点
    measurewidget_tempentities = [];//清除临时图形
    measurewidget_result = "";//清除测量结果

    if (handler != undefined) {
        handler.destroy();
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    //左键（开始测量）
    handler.setInputAction(function (leftclick) {
        if (!measurewidget_ismulti) {
            measurewidget_result = "";
        }

        if (!measurewidget_ismulti && measurewidget_isredo) {
            ClearCeliangSingle();
            measurewidget_isredo = false;
        }

        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            pickedOject = viewer.scene.pickPosition(leftclick.position);//地形测量
        }
        else {
            pickedOject = viewer.scene.pick(leftclick.position);//模型测量
        }

        if (pickedOject != undefined) {
            var xyz = viewer.scene.pickPosition(leftclick.position);
            if (xyz != undefined) {
                var tempentity = viewer.entities.add({
                    name: "pt_Measure_single_" + NewGuid(),
                    position: xyz,
                    point: {
                        pixelSize: 8,
                        color: Cesium.Color.YELLOW,
                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                    }
                });
                measurewidget_temppoints.push(xyz);
                measurewidget_tempentities.push(tempentity);

                if (measurewidget_temppoints.length > 1) {
                    var tempentity_line = viewer.entities.add({
                        name: "pl_Measure_single_" + NewGuid(),
                        polyline: {
                            positions: [measurewidget_temppoints[measurewidget_temppoints.length - 2], xyz],
                            width: 2,
                            material: Cesium.Color.DARKORANGE,
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.DARKORANGE
                            }),
                        }
                    });
                    measurewidget_tempentities.push(tempentity_line);
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //右键（结束测量）
    handler.setInputAction(function (rightclik) {
        if (viewer.entities.getById("line_temp9999") != null) {
            viewer.entities.removeById("line_temp9999");//删除临时边线
        }

        if (measurewidget_temppoints.length == 1 && measurewidget_tempentities.length == 1) {
            if (viewer.entities.contains(measurewidget_tempentities[0])) {
                viewer.entities.remove(measurewidget_tempentities[0]);

                measurewidget_temppoints = [];
                measurewidget_tempentities = [];

                layer.msg('请至少绘制两个点！');
            }
        }
        else if (measurewidget_temppoints.length > 1) {
            var lens = 0;
            var diss = 0;

            for (var i = 1; i < measurewidget_temppoints.length; i++) {
                var len = Cesium.Cartesian3.distance(measurewidget_temppoints[i - 1], measurewidget_temppoints[i]);
                var blh1 = Cesium.Cartographic.fromCartesian(measurewidget_temppoints[i - 1]);
                var blh2 = Cesium.Cartographic.fromCartesian(measurewidget_temppoints[i]);
                var dis = Math.sqrt(Math.pow(len, 2) - Math.pow(Math.abs(blh1.height - blh2.height), 2));
                lens += len;
                diss += dis;
            }

            viewer.entities.add({
                name: "pl_Measure_single_label_" + NewGuid(),
                position: measurewidget_temppoints[measurewidget_temppoints.length - 1],
                label: {
                    text: '空间距离：' + lens.toFixed(3) + 'm',
                    showBackground: true,
                    backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                    font: '18px Times New Roman',
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                    pixelOffset: new Cesium.Cartesian2(0.0, -30),
                    scaleByDistance: new Cesium.NearFarScalar(20000, 1, 8000000, 0),
                }
            });

            if (measurewidget_result == "") {
                measurewidget_result = "空间距离：" + lens.toFixed(3) + "m\n平面距离：" + diss.toFixed(3) + "m";
            }
            else {
                measurewidget_result = "空间距离：" + lens.toFixed(3) + "m\n平面距离：" + diss.toFixed(3) + "m\n\n" + measurewidget_result;
            }

            if (measurewidget_result != "") {
                layui.form.val("measureinfoform", {
                    "measureresults": measurewidget_result
                });
            }

            measurewidget_isredo = true;
            measurewidget_temppoints = [];
            measurewidget_tempentities = [];
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
                measurewidget_tipsentity.position = position;
                measurewidget_tipsentity.label.show = measurewidget_istips;
                measurewidget_tipsentity.label.text = "左键点击开始测量，右键点击结束测量";

                if (measurewidget_temppoints.length > 0) {
                    if (viewer.entities.getById("line_temp9999") != null) {
                        viewer.entities.removeById("line_temp9999");//删除临时边线
                    }
                    //绘制多边形临时边线
                    viewer.entities.add({
                        id: "line_temp9999",
                        polyline: {
                            positions: [measurewidget_temppoints[measurewidget_temppoints.length - 1], position],
                            width: 2,
                            arcType: Cesium.ArcType.RHUMB,
                            material: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.DARKORANGE,
                            }),
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.DARKORANGE,
                            }),
                        }
                    });
                }
            }
            else {
                measurewidget_tipsentity.label.show = false;
                measurewidget_tipsentity.label.text = "";
            }
        }
        else {
            measurewidget_tipsentity.label.show = false;
            measurewidget_tipsentity.label.text = "";
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}
//面积测量
function areaMeasure() {
    selectMeasureOperate("widget_measure_area_id");//标识当前选中工具
    viewer._container.style.cursor = "crosshair";//修改鼠标样式
    ClearCeliangTemp();//清除临时图形

    measurewidget_temppoints = [];//清除临时点
    measurewidget_tempentities = [];//清除临时图形
    measurewidget_result = "";//清除测量结果

    if (handler != undefined) {
        handler.destroy();
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    //左键（开始测量）
    handler.setInputAction(function (leftclik) {
        if (!measurewidget_ismulti) {
            measurewidget_result = "";
        }

        if (!measurewidget_ismulti && measurewidget_isredo) {
            ClearCeliangSingle();
            measurewidget_isredo = false;
        }

        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            pickedOject = viewer.scene.pickPosition(leftclik.position);//地形测量
        } else {
            pickedOject = viewer.scene.pick(leftclik.position);//模型测量
        }

        if (pickedOject != undefined) {
            var position = viewer.scene.pickPosition(leftclik.position);
            if (position != undefined) {
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
                    measurewidget_temppoints.push(position);
                    measurewidget_tempentities.push(tempentity);
                }
                if (measurewidget_temppoints.length > 1) {
                    var tempentity_line = viewer.entities.add({
                        name: "pl_Measure_single_" + NewGuid(),
                        polyline: {
                            positions: [measurewidget_temppoints[measurewidget_temppoints.length - 2], position],
                            width: 2,
                            arcType: Cesium.ArcType.RHUMB,
                            material: Cesium.Color.DARKORANGE,
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.DARKORANGE,
                            }),
                        }
                    });
                    measurewidget_tempentities.push(tempentity_line);
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //右键（结束测量）
    handler.setInputAction(function () {
        if (viewer.entities.getById("line_temp9999") != null) {
            viewer.entities.removeById("line_temp9999");
        }
        if (viewer.entities.getById("line_temp9998") != null) {
            viewer.entities.removeById("line_temp9998");
        }

        if (measurewidget_temppoints.length > 2) {
            //绘制多边形闭合线
            viewer.entities.add({
                name: "pl_Measure_single_" + NewGuid(),
                polyline: {
                    positions: [measurewidget_temppoints[0], measurewidget_temppoints[measurewidget_temppoints.length - 1]],
                    width: 2,
                    arcType: Cesium.ArcType.RHUMB,
                    material: Cesium.Color.DARKORANGE,
                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                        color: Cesium.Color.DARKORANGE,
                    }),
                }
            });

            var xsum = 0;
            var ysum = 0;
            var zsum = 0;
            var lens = 0;
            var diss = 0;
            var area = 0;
            var xys = [];
            for (var i = 0; i < measurewidget_temppoints.length; i++) {
                if (i == 0) {
                    lens += Cesium.Cartesian3.distance(measurewidget_temppoints[measurewidget_temppoints.length - 1], measurewidget_temppoints[0]);
                }
                else {
                    lens += Cesium.Cartesian3.distance(measurewidget_temppoints[i - 1], measurewidget_temppoints[i]);
                }

                xsum += measurewidget_temppoints[i].x;
                ysum += measurewidget_temppoints[i].y;
                zsum += measurewidget_temppoints[i].z;

                var blh = CGCS2000XYZ2BLH(measurewidget_temppoints[i].x, measurewidget_temppoints[i].y, measurewidget_temppoints[i].z);
                var xy = bl2xy(blh.x, blh.y, 3, 108, false);
                xys.push(new Cesium.Cartesian2(xy.x, xy.y));
            }

            for (var i = 0; i < xys.length; i++) {
                if (i == 0) {
                    diss += Cesium.Cartesian2.distance(xys[0], xys[xys.length - 1]);
                }
                else {
                    diss += Cesium.Cartesian2.distance(xys[i], xys[i - 1]);
                }
            }

            for (var i = 1; i < xys.length - 1; i++) {
                area += (xys[i].x - xys[0].x) * (xys[i + 1].y - xys[0].y) - (xys[i].y - xys[0].y) * (xys[i + 1].x - xys[0].x);
            }
            area = Math.abs(area) * 0.5;


            ////求一个平均点，用于定位
            //var maxX = viewer.scene.cartesianToCanvasCoordinates(measurewidget_temppoints[0]).x;
            //var minX = viewer.scene.cartesianToCanvasCoordinates(measurewidget_temppoints[0]).x;
            //var maxY = viewer.scene.cartesianToCanvasCoordinates(measurewidget_temppoints[0]).y;
            //var minY = viewer.scene.cartesianToCanvasCoordinates(measurewidget_temppoints[0]).y;
            //var xSum = 0;
            //var ySum = 0;
            //var zSum = 0;

            //for (var i in measurewidget_temppoints) {
            //    xSum = xSum + parseFloat(measurewidget_temppoints[i].x);
            //    ySum = ySum + parseFloat(measurewidget_temppoints[i].y);
            //    zSum = zSum + parseFloat(measurewidget_temppoints[i].z);
            //    if (viewer.scene.cartesianToCanvasCoordinates(measurewidget_temppoints[i]).x > maxX) {
            //        maxX = viewer.scene.cartesianToCanvasCoordinates(measurewidget_temppoints[i]).x;
            //    }
            //    if (viewer.scene.cartesianToCanvasCoordinates(measurewidget_temppoints[i]).x < minX) {
            //        minX = viewer.scene.cartesianToCanvasCoordinates(measurewidget_temppoints[i]).x;
            //    }
            //    if (viewer.scene.cartesianToCanvasCoordinates(measurewidget_temppoints[i]).y > maxY) {
            //        maxY = viewer.scene.cartesianToCanvasCoordinates(measurewidget_temppoints[i]).y;
            //    }
            //    if (viewer.scene.cartesianToCanvasCoordinates(measurewidget_temppoints[i]).y < minY) {
            //        minY = viewer.scene.cartesianToCanvasCoordinates(measurewidget_temppoints[i]).y;
            //    }
            //}

            //var pointcenter = new Cesium.Cartesian3(xSum / measurewidget_temppoints.length, ySum / measurewidget_temppoints.length, zSum / measurewidget_temppoints.length);

            //var juli1 = Cesium.Cartesian3.distance(measurewidget_temppoints[0], measurewidget_temppoints[measurewidget_temppoints.length - 1]);
            //var juli2 = Cesium.Cartesian3.distance(measurewidget_temppoints[0], pointcenter);
            //var juli3 = Cesium.Cartesian3.distance(pointcenter, measurewidget_temppoints[measurewidget_temppoints.length - 1]);

            //var p = (juli1 + juli2 + juli3) / 2;
            //var mianji = Math.sqrt(p * (p - juli1) * (p - juli2) * (p - juli3));
            //var sum = Cesium.Cartesian3.distance(measurewidget_temppoints[0], measurewidget_temppoints[measurewidget_temppoints.length - 1]);
            //for (var j = 0; j < measurewidget_temppoints.length - 1; j++) {
            //    juli1 = Cesium.Cartesian3.distance(measurewidget_temppoints[j], measurewidget_temppoints[j + 1]);
            //    juli2 = Cesium.Cartesian3.distance(measurewidget_temppoints[j], pointcenter);
            //    juli3 = Cesium.Cartesian3.distance(pointcenter, measurewidget_temppoints[j + 1]);

            //    p = (juli1 + juli2 + juli3) / 2;
            //    mianji = mianji + Math.sqrt(p * (p - juli1) * (p - juli2) * (p - juli3));
            //    sum = sum + Cesium.Cartesian3.distance(measurewidget_temppoints[j], measurewidget_temppoints[j + 1]);
            //}

            viewer.entities.add({
                name: "py_Measure_single_label_" + NewGuid(),
                position: new Cesium.Cartesian3(xsum / measurewidget_temppoints.length, ysum / measurewidget_temppoints.length, zsum / measurewidget_temppoints.length),
                label: {
                    text: '平面面积：' + area.toFixed(3) + 'm²',
                    showBackground: true,
                    backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                    font: '18px Times New Roman',
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                    pixelOffset: new Cesium.Cartesian2(0.0, -50),
                    scaleByDistance: new Cesium.NearFarScalar(20000, 1, 8000000, 0),
                }
            });

            if (measurewidget_result == "") {
                measurewidget_result = "平面面积：" + area.toFixed(3) + "m²\n空间周长：" + lens.toFixed(3) + 'm\n平面周长：' + diss.toFixed(3) + 'm';
            }
            else {
                measurewidget_result = "平面面积：" + area.toFixed(3) + "m²\n空间周长：" + lens.toFixed(3) + 'm\n平面周长：' + diss.toFixed(3) + 'm\n\n' + measurewidget_result;
            }

            if (measurewidget_result != "") {
                layui.form.val("measureinfoform", {
                    "measureresults": measurewidget_result
                });
            }

            measurewidget_isredo = true;
            measurewidget_temppoints = [];
            measurewidget_tempentities = [];
        }
        else if (measurewidget_temppoints.length > 0) {
            for (var i in measurewidget_tempentities) {
                if (viewer.entities.contains(measurewidget_tempentities[i])) {
                    viewer.entities.remove(measurewidget_tempentities[i]);
                }
            }

            measurewidget_temppoints = [];
            measurewidget_tempentities = [];

            layer.msg('请至少绘制三个点！');
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
                measurewidget_tipsentity.position = position;
                measurewidget_tipsentity.label.show = measurewidget_istips;
                measurewidget_tipsentity.label.text = "左键点击开始测量，右键点击结束测量";

                if (measurewidget_temppoints.length > 0) {
                    if (viewer.entities.getById("line_temp9999") != null) {
                        viewer.entities.removeById("line_temp9999");//删除临时边线
                    }
                    //绘制多边形临时边线
                    viewer.entities.add({
                        id: "line_temp9999",
                        polyline: {
                            positions: [measurewidget_temppoints[measurewidget_temppoints.length - 1], position],
                            width: 2,
                            arcType: Cesium.ArcType.RHUMB,
                            material: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.DARKORANGE,
                            }),
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.DARKORANGE,
                            }),
                        }
                    });

                    if (measurewidget_temppoints.length > 1) {
                        if (viewer.entities.getById("line_temp9998") != null) {
                            viewer.entities.removeById("line_temp9998");//删除临时闭合线
                        }
                        //绘制多边形临时闭合线
                        viewer.entities.add({
                            id: "line_temp9998",
                            polyline: {
                                positions: [measurewidget_temppoints[0], position],
                                width: 2,
                                arcType: Cesium.ArcType.RHUMB,
                                material: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.DARKORANGE,
                                }),
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.DARKORANGE,
                                }),
                            }
                        });
                    }
                }
            }
            else {
                measurewidget_tipsentity.label.show = false;
                measurewidget_tipsentity.label.text = "";
            }
        }
        else {
            measurewidget_tipsentity.label.show = false;
            measurewidget_tipsentity.label.text = "";
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
};
//方位角测量
function azimuthMeasure() {
    selectMeasureOperate("widget_measure_azimuth_id");//标识当前选中工具
    viewer._container.style.cursor = "crosshair";//修改鼠标样式
    ClearCeliangTemp();//清除临时图形

    measurewidget_temppoints = [];//清除临时点
    measurewidget_tempentities = [];//清除临时图形
    measurewidget_result = "";//清除测量结果

    if (handler != undefined) {
        handler.destroy();
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    //左键（开始测量）
    handler.setInputAction(function (leftclik) {
        if (!measurewidget_ismulti) {
            measurewidget_result = "";
        }

        if (!measurewidget_ismulti && measurewidget_isredo) {
            ClearCeliangSingle();
            measurewidget_isredo = false;
        }

        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            pickedOject = viewer.scene.pickPosition(leftclik.position);//地形测量
        }
        else {
            pickedOject = viewer.scene.pick(leftclik.position);//模型测量
        }

        if (pickedOject != undefined) {
            var xyz = viewer.scene.pickPosition(leftclik.position);
            if (xyz != undefined) {
                var tempentity = viewer.entities.add({
                    name: "pt_Measure_single_" + NewGuid(),
                    position: xyz,
                    point: {
                        pixelSize: 8,
                        color: Cesium.Color.YELLOW,
                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                    }
                });
                measurewidget_temppoints.push(xyz);
                measurewidget_tempentities.push(tempentity);

                if (measurewidget_temppoints.length == 2) {
                    var point = measurewidget_temppoints[0];
                    viewer.entities.add({
                        name: "pl_Measure_single_" + NewGuid(),
                        polyline: {
                            positions: measurewidget_temppoints,
                            width: 2,
                            arcType: Cesium.ArcType.RHUMB,
                            material: Cesium.Color.DARKORANGE,
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.DARKORANGE,
                            }),
                        }
                    });

                    var rblh1 = Cesium.Cartographic.fromCartesian(point);//第一个点
                    var rblh2 = Cesium.Cartographic.fromCartesian(xyz);//第二个点

                    //计算方位角
                    var r = Math.atan((rblh2.longitude * 180 / Math.PI - rblh1.longitude * 180 / Math.PI) * Math.cos(rblh2.latitude) / (rblh2.latitude * 180 / Math.PI - rblh1.latitude * 180 / Math.PI)) * 180 / Math.PI;

                    //判断
                    if ((rblh1.latitude > rblh2.latitude) && (rblh1.longitude > rblh2.longitude)) {
                        r += 180;
                    }
                    else if ((rblh1.latitude > rblh2.latitude) && (rblh1.longitude == rblh2.longitude)) {
                        r = 180;
                    }
                    else if ((rblh1.latitude > rblh2.latitude) && (rblh1.longitude < rblh2.longitude)) {
                        r += 180;
                    }
                    else if ((rblh1.latitude == rblh2.latitude) && (rblh1.longitude > rblh2.longitude)) {
                        r = 270;
                    }
                    else if ((rblh1.latitude == rblh2.latitude) && (rblh1.longitude < rblh2.longitude)) {
                        r = 90;
                    }
                    else if ((rblh1.latitude < rblh2.latitude) && (rblh1.longitude > rblh2.longitude)) {
                        r += 360;
                    }
                    else if ((rblh1.latitude < rblh2.latitude) && (rblh1.longitude == rblh2.longitude)) {
                        r = 0;
                    }

                    viewer.entities.add({
                        name: "al_Measure_single" + NewGuid(),
                        position: Cesium.Cartesian3.fromElements((point.x + xyz.x) / 2, (point.y + xyz.y) / 2, (point.z + xyz.z) / 2),
                        label: {
                            text: '方位角：' + r.toFixed(2) + '°',
                            showBackground: true,
                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                            font: '18px Times New Roman',
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            pixelOffset: new Cesium.Cartesian2(0.0, -30),
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            caleByDistance: new Cesium.NearFarScalar(20000, 1, 8000000, 0),
                        }
                    });

                    if (measurewidget_result == "") {
                        measurewidget_result = "方位角：" + r.toFixed(2) + '°';
                    }
                    else {
                        measurewidget_result = "方位角：" + r.toFixed(2) + '°\n\n' + measurewidget_result;
                    }

                    if (measurewidget_result != null) {
                        layui.form.val("measureinfoform", {
                            "measureresults": measurewidget_result
                        });
                    }

                    measurewidget_isredo = true;
                    measurewidget_temppoints = [];
                    measurewidget_tempentities = [];
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //右键（取消工具）
    handler.setInputAction(function (rightclik) {
        //当已画一点时清除
        if (measurewidget_tempentities.length == 1) {
            if (viewer.entities.contains(measurewidget_tempentities[0])) {
                viewer.entities.remove(measurewidget_tempentities[0]);
                measurewidget_temppoints = [];
                measurewidget_tempentities = [];
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
                measurewidget_tipsentity.position = position;
                measurewidget_tipsentity.label.show = measurewidget_istips;
                measurewidget_tipsentity.label.text = "左键点击开始测量，右键点击重新开始测量";
            }
            else {
                measurewidget_tipsentity.label.show = false;
                measurewidget_tipsentity.label.text = "";
            }
        }
        else {
            measurewidget_tipsentity.label.show = false;
            measurewidget_tipsentity.label.text = "";
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
};

//选中测量操作按钮
function selectMeasureOperate(id) {
    unselectMeasureOperate();
    document.getElementById(id).style = "color:#FFFFFF;background-color:#5FB878;width:55px;";
};
//取消测量操作按钮
function unselectMeasureOperate() {
    document.getElementById("widget_measure_point_id").style = "width:55px;";
    document.getElementById("widget_measure_height_id").style = "width:55px;";
    document.getElementById("widget_measure_distance_id").style = "width:55px;";
    document.getElementById("widget_measure_area_id").style = "width:55px;";
    document.getElementById("widget_measure_azimuth_id").style = "width:55px;";
    document.getElementById("widget_measure_point_id").className = "layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm";
    document.getElementById("widget_measure_height_id").className = "layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm";
    document.getElementById("widget_measure_distance_id").className = "layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm";
    document.getElementById("widget_measure_area_id").className = "layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm";
    document.getElementById("widget_measure_azimuth_id").className = "layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm";
};

//取消测量工具
function cancelMeasureTool() {
    if (handler != undefined) {
        handler.destroy();
    }

    viewer._container.style.cursor = "default";//还原鼠标样式
    unselectMeasureOperate();//还原工具按钮样式
    if (measurewidget_tipsentity != null && measurewidget_tipsentity != undefined) {
        measurewidget_tipsentity.label.show = false;
        measurewidget_tipsentity.label.text = "";
    }
};

//清除临时图形
function ClearCeliangTemp() {
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

    measurewidget_temppoints = [];
    measurewidget_tempentities = [];
    ClearCeliangSingle();
}
//清除单次测量图形
function ClearCeliangSingle() {
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
    layui.form.val("measureinfoform", {
        "measureresults": "",
    });

    measurewidget_temppoints = [];
    measurewidget_tempentities = [];
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
        strMiao = parseFloat(strMiao).toFixed(2);
    }
    return strDu + "°" + strFen + "′" + strMiao + "″"
}