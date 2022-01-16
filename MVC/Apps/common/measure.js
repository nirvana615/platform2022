/*
 * 必须先引用layui
 * 必须先创建viewer变量
 * 必须先创建handler变量
 */
var measurewidgetlayerindex = null;
var depthTestAgainstTerrain = null;     //深度检测初始值
var multimeasure = false;               //连续测量
var measureresult = "";                 //测量结果
var tipsentity;                         //操作提示

var isRedo = false;
var points = [];




//测量widget
function measure() {
    if (measurewidgetlayerindex != null) {
        layer.setTop(measurewidgetlayerindex);
        return;
    }

    measurewidgetlayerindex = layer.open({
        type: 1
        , title: ['测量工具', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['400px', '430px']
        , shade: 0
        , offset: ['85px', '1530px']
        , closeBtn: 1
        , moveOut: true
        , resize: false
        , content: '<div class="layui-tab layui-tab-brief" lay-filter="measurelayer" style="margin:0px;"><ul class="layui-tab-title"><li lay-id="111" class="layui-this" style="width:40%;padding-top: 10px;line-height: normal;">地形测量</li><li lay-id="222" style="width:40%;padding-top:10px;line-height:20px">模型测量</li></ul><div class="layui-tab-content" style="padding:0px;"><form class="layui-form" style="margin-top:0px;margin-left:0px;" lay-filter="measureinfoform"><div class="layui-row"><div class="layui-col-md3"><label class="layui-form-label" style="width:60px;">连续测量</label></div><div class="layui-col-md9"><div class="layui-input-block" style="margin-left:0px"><input type="checkbox" style="padding-left:0px;width:80%" name="close" lay-filter="multiMeasureswitch-type" lay-skin="switch" lay-text="是|否"></div></div></div><div class="layui-row"><div class="layui-input-block" style="margin:5px;"><textarea name="desc" placeholder="请先选择测量方式后开始测量。" class="layui-textarea" style="height:200px;width: 100%;font-size: 15px;line-height:25px;"></textarea></div></div></form><div class="layui-btn-container" style="margin-top:10px;text-align:center "><button type="button" class="layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm" style="width:65px;" id="widget_measure_point_id" onclick="pointMeasure()">坐标</button><button type="button" class="layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm" style="width:65px;" id="widget_measure_height_id" onclick="heightMeasure()">高差</button><button type="button" class="layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm" style="width:65px;" id="widget_measure_distance_id" onclick="distanceMeasure()">距离</button><button type="button" class="layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm" style="width:65px;" id="widget_measure_area_id" onclick="areaMeasure()">面积</button><button type="button" class="layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm" style="width:65px;" id="widget_measure_azimuth_id" onclick="azimuthMeasure()">方位角</button></div><div style="text-align:center;margin-top:5px;"><button type="button" style="width:90%" class="layui-btn layui-btn-radius layui-btn-fluid layui-btn-danger" onclick="ClearCeliangTemp()">清除</button></div></div></div>'
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);

            tipsentity = viewer.entities.add({
                label: {
                    show: false,
                    showBackground: true,
                    font: "14px monospace",
                    horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                    pixelOffset: new Cesium.Cartesian2(20, 20),
                    scaleByDistance: new Cesium.NearFarScalar(20000, 1, 8000000, 0),
                },
            });

            //记录当前深度检测值
            depthTestAgainstTerrain = viewer.scene.globe.depthTestAgainstTerrain;

            //默认地形测量
            viewer.scene.globe.depthTestAgainstTerrain = true;

            layui.form.render();
        }
        , end: function () {
            //还原当前深度检测值
            viewer.scene.globe.depthTestAgainstTerrain = depthTestAgainstTerrain;
            measurewidgetlayerindex = null;
            ClearCeliangTemp();
            viewer.entities.remove(tipsentity);
            viewer._container.style.cursor = "default";//还原鼠标样式
        }
    });
};


//是否连续测量
layui.form.on('switch(multiMeasureswitch-type)', function (data) {
    multimeasure = data.elem.checked;
    return false;
});

//切换地形/模型测量
layui.element.on('tab(measurelayer)', function (data) {
    //清除测量结果
    layui.form.val("measureinfoform", {
        "desc": "",
    });

    //清除临时图形
    ClearCeliangTemp();

    //清除当前工具
    cancelMeasureTool()

    if (data.index == 0) {
        //地形测量
        viewer.scene.globe.depthTestAgainstTerrain = true;
    }
    else if (data.index == 1) {
        //判断是否包含模型数据
        if (viewer.scene.primitives.length > 1) {
            //模型测量
            viewer.scene.globe.depthTestAgainstTerrain = false;
        }
        else {
            layer.msg('请先加载模型数据！');
            layui.element.tabChange('measurelayer', 111);
        }
    }
});


function MeasureGuid() {
    return ((((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1));
};


//坐标测量
function pointMeasure() {
    //标识当前选中工具
    selectMeasureOperate("widget_measure_point_id");
    //清除临时图形
    ClearCeliangTemp();
    //修改鼠标样式
    viewer._container.style.cursor = "crosshair";

    if (handler != undefined) {
        handler.destroy();
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    //左键（开始测量）
    handler.setInputAction(function (leftclick) {
        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            //地形测量
            pickedOject = viewer.scene.pickPosition(leftclick.position);
            if (multimeasure == false) {
                ClearCeliangTemp();
                measureresult = "";
            }
        } else {
            //模型测量
            pickedOject = viewer.scene.pick(leftclick.position);
            if (multimeasure == false) {
                ClearCeliangTemp();
                measureresult = "";
            }
        }

        if (pickedOject != undefined) {
            var position = viewer.scene.pickPosition(leftclick.position);
            if (position != undefined) {
                var cartesian3 = Cesium.Cartographic.fromCartesian(position);
                var longitude = Cesium.Math.toDegrees(cartesian3.longitude);
                var latitude = Cesium.Math.toDegrees(cartesian3.latitude);
                var height = cartesian3.height;
                if (height > 0) {
                    measureresult = "经  度： " + longitude.toFixed(6) + "\n纬  度： " + latitude.toFixed(6) + "\n高  程： " + (height).toFixed(3) + "\n\n" + measureresult;

                    if (Cesium.defined(position)) {
                        viewer.entities.add({
                            name: "ptMeasue" + MeasureGuid(),
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
                            name: "ptMeasue_label" + MeasureGuid(),
                            position: position,
                            label: {
                                text: longitude.toFixed(6) + '，' + latitude.toFixed(6) + '，' + (height).toFixed(3),
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

                        if (measureresult != "") {
                            layui.form.val("measureinfoform", {
                                "desc": measureresult
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

    //右键（取消工具）
    handler.setInputAction(function (rightclik) {
        cancelMeasureTool();
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    //移动（操作提示）
    handler.setInputAction(function (move) {
        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            //地形测量
            pickedOject = viewer.scene.pickPosition(move.endPosition);

        } else {
            //模型测量
            pickedOject = viewer.scene.pick(move.endPosition);
        }

        if (pickedOject != undefined) {
            var position = viewer.scene.pickPosition(move.endPosition);
            if (position != undefined) {
                tipsentity.position = position;;
                tipsentity.label.show = true;
                tipsentity.label.text = "左键开始测量，右键取消工具";
            }
            else {
                tipsentity.label.show = false;
                tipsentity.label.text = "";
            }
        }
        else {
            tipsentity.label.show = false;
            tipsentity.label.text = "";
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
};
//高差测量
function heightMeasure() {
    //标识当前选中工具
    selectMeasureOperate("widget_measure_height_id");
    //清除临时图形
    ClearCeliangTemp();
    //修改鼠标样式
    viewer._container.style.cursor = "crosshair";

    if (handler != undefined) {
        handler.destroy();
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    //左键
    handler.setInputAction(function (leftclik) {
        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            //地形测量
            pickedOject = viewer.scene.pickPosition(leftclik.position);
            if (multimeasure == false & isRedo == true) {
                ClearCeliangSingle();
                isRedo = false;
            }
        }
        else {
            //模型测量
            pickedOject = viewer.scene.pick(leftclik.position);
            if (multimeasure == false & isRedo == true) {
                ClearCeliangSingle();
                isRedo = false;
            }
        }

        if (pickedOject != undefined) {
            var xyz = viewer.scene.pickPosition(leftclik.position);

            if (xyz != undefined) {
                var rblh = Cesium.Cartographic.fromCartesian(xyz);
                viewer.entities.add({
                    name: "pt_Measue_single" + MeasureGuid(),
                    position: xyz,
                    point: {
                        pixelSize: 10,
                        color: Cesium.Color.YELLOW,
                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                    }
                });
                points.push(xyz);
                if (points.length == 2) {
                    var point = points[0];
                    viewer.entities.add({
                        name: "pl_Measue_single" + MeasureGuid(),
                        polyline: {
                            positions: [point, xyz],
                            width: 2,
                            material: Cesium.Color.fromCssColorString('#00FF00'),
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.fromCssColorString('#00FF00'),
                            }),
                        }
                    });
                    var rblh1 = Cesium.Cartographic.fromCartesian(point);
                    if (rblh1.height > rblh.height) {
                        var b = rblh.latitude * 180 / Math.PI;
                        var l = rblh.longitude * 180 / Math.PI;
                        var h = rblh.height;

                        viewer.entities.add({
                            name: "pl_Measue_single" + MeasureGuid(),
                            polyline: {
                                positions: [point, Cesium.Cartesian3.fromDegrees(l, b, rblh1.height)],
                                width: 2,
                                material: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.fromCssColorString('#00FF00')
                                }),
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.fromCssColorString('#00FF00')
                                }),
                            }
                        });
                        viewer.entities.add({
                            name: "pl_Measue_single" + MeasureGuid(),
                            polyline: {
                                positions: [xyz, Cesium.Cartesian3.fromDegrees(l, b, rblh1.height)],
                                width: 2,
                                material: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.fromCssColorString('#00FF00')
                                }),
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.fromCssColorString('#00FF00')
                                }),
                            }
                        });

                        viewer.entities.add({
                            name: "pll_Measue_single" + MeasureGuid(),
                            position: Cesium.Cartesian3.fromDegrees(l, b, (rblh1.height + h) / 2),
                            label: {
                                text: '高差：' + (rblh1.height - h).toFixed(2) + 'm',
                                showBackground: true,
                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                font: '16px Times New Roman',
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY
                            }
                        });
                        var sum = Cesium.Cartesian3.distance(points[0], points[1]);
                        viewer.entities.add({
                            name: "pll_Measue_single" + MeasureGuid(),
                            position: Cesium.Cartesian3.fromDegrees((l + rblh1.longitude * 180 / Math.PI) / 2, (b + rblh1.latitude * 180 / Math.PI) / 2, (rblh1.height + h) / 2),

                            label: {
                                text: '距离：' + sum.toFixed(2) + 'm',
                                showBackground: true,
                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                font: '16px Times New Roman',
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY
                            }
                        });
                        var pingju = Math.sqrt(Math.pow(sum, 2) - Math.pow(rblh1.height - h, 2));
                        viewer.entities.add({
                            name: "pll_Measue_single" + MeasureGuid(),
                            position: points[0],
                            label: {
                                text: '倾角：' + (Math.acos(pingju / sum) * 180 / Math.PI).toFixed(2) + '°',
                                showBackground: true,
                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                font: '16px Times New Roman',
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                pixelOffset: new Cesium.Cartesian2(0.0, -60),
                            }
                        });
                        measureresult = " 距离：" + sum.toFixed(2) + "  米\n\n" + " 平距：" + pingju.toFixed(2) + "  米\n\n" + " 高差：" + (rblh1.height - h).toFixed(2) + "  米\n\n" + " 倾角：" + (Math.acos(pingju / sum) * 180 / Math.PI).toFixed(2) + ' °';
                        if (measureresult != "") {
                            layui.form.val("measureinfoform", {
                                "desc": measureresult
                            });
                        }
                        isRedo = true;
                        points = [];
                    }
                    else if (rblh1.height < rblh.height) {
                        var b = rblh1.latitude * 180 / Math.PI;
                        var l = rblh1.longitude * 180 / Math.PI;
                        var h = rblh1.height;

                        viewer.entities.add({
                            name: "pl_Measue_single" + MeasureGuid(),
                            polyline: {
                                positions: [point, Cesium.Cartesian3.fromDegrees(l, b, rblh.height)],
                                width: 2,
                                material: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.fromCssColorString('#00FF00')
                                }),
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.fromCssColorString('#00FF00')
                                }),
                            }
                        });

                        viewer.entities.add({
                            name: "pl_Measue_single" + MeasureGuid(),
                            polyline: {
                                positions: [xyz, Cesium.Cartesian3.fromDegrees(l, b, rblh.height)],
                                width: 2,
                                material: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.fromCssColorString('#00FF00'),
                                }),
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.fromCssColorString('#00FF00'),
                                }),
                            }
                        });
                        viewer.entities.add({
                            name: "pll_Measue_single" + MeasureGuid(),
                            position: Cesium.Cartesian3.fromDegrees(l, b, (rblh.height + h) / 2),
                            label: {
                                text: '高差：' + (rblh.height - h).toFixed(2) + 'm',
                                showBackground: true,
                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                font: '16px Times New Roman',
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY
                            }
                        });
                        var sum = Cesium.Cartesian3.distance(points[0], points[1]);
                        viewer.entities.add({
                            name: "pll_Measue_single" + MeasureGuid(),
                            position: Cesium.Cartesian3.fromDegrees((l + rblh.longitude * 180 / Math.PI) / 2, (b + rblh.latitude * 180 / Math.PI) / 2, (rblh.height + h) / 2),

                            label: {
                                text: '距离：' + sum.toFixed(2) + 'm',
                                showBackground: true,
                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                font: '16px Times New Roman',
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY
                            }
                        });
                        var pingju = Math.sqrt(Math.pow(sum, 2) - Math.pow(rblh.height - h, 2));
                        viewer.entities.add({
                            name: "pll_Measue_single" + MeasureGuid(),
                            position: points[1],

                            label: {
                                text: '倾角：' + (Math.acos(pingju / sum) * 180 / Math.PI).toFixed(2) + '°',
                                showBackground: true,
                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                font: '16px Times New Roman',
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                pixelOffset: new Cesium.Cartesian2(0.0, -60),
                            }
                        });

                        measureresult = " 距离:" + sum.toFixed(2) + "  米\n\n" + " 平距:" + pingju.toFixed(2) + "  米\n\n" + " 高差:" + (rblh.height - h).toFixed(2) + "  米\n\n" + " 倾角:" + (Math.acos(pingju / sum) * 180 / Math.PI).toFixed(2) + '°';
                        if (measureresult != "") {
                            layui.form.val("measureinfoform", {
                                "desc": measureresult
                            });
                        }
                        isRedo = true;
                        points = [];
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
        cancelMeasureTool();
        //TODO 绘制一个点
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    //移动（操作提示）
    handler.setInputAction(function (move) {
        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            //地形测量
            pickedOject = viewer.scene.pickPosition(move.endPosition);

        } else {
            //模型测量
            pickedOject = viewer.scene.pick(move.endPosition);
        }

        if (pickedOject != undefined) {
            var position = viewer.scene.pickPosition(move.endPosition);
            if (position != undefined) {
                tipsentity.position = position;;
                tipsentity.label.show = true;
                tipsentity.label.text = "左键开始测量，右键取消工具";
            }
            else {
                tipsentity.label.show = false;
                tipsentity.label.text = "";
            }
        }
        else {
            tipsentity.label.show = false;
            tipsentity.label.text = "";
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
};
//距离测量
function distanceMeasure() {
    //标识当前选中工具
    selectMeasureOperate("widget_measure_distance_id");
    //清除临时图形
    ClearCeliangTemp();

    if (handler != undefined) {
        handler.destroy();
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);


}

//面积测量
function areaMeasure() {
    //标识当前选中工具
    selectMeasureOperate("widget_measure_area_id");
    //清除临时图形
    ClearCeliangTemp();

    //if (viewer.scene.globe.depthTestAgainstTerrain) {//地形测量
    //    form.val("measureinfoform", {
    //        "desc": "\n\n左击地图定义曲面，右击完成",
    //    });
    //    showbtn = "area_measure";
    //    showBtnStyle(showbtn);
    //} else {
    //    form.val("measureinfoform", {
    //        "desc": "\n\n左击模型定义曲面，右击完成",
    //    });
    //}

    if (handler != undefined) {
        handler.destroy();
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);


    //左击
    handler.setInputAction(function (leftclik) {
        //form.val("measureinfoform", {
        //    "desc": "\n\n\n\n右击完成操作",
        //});
        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            //地形测量
            pickedOject = viewer.scene.pickPosition(leftclik.position);
            if (multimeasure == false & isRedo == true) {
                ClearCeliangSingle();
                isRedo = false;
            }
        } else {
            //模型测量
            pickedOject = viewer.scene.pick(leftclik.position);
            if (multimeasure == false & isRedo == true) {
                ClearCeliangSingle();
                isRedo = false;
            }
        }
        if (pickedOject != undefined) {
            var position = viewer.scene.pickPosition(leftclik.position);
            if (position != undefined) {

                if (Cesium.defined(position)) {
                    viewer.entities.add({
                        name: "pt_Measue_single" + MeasureGuid(),
                        position: position,
                        point: {
                            pixelSize: 10,
                            color: Cesium.Color.YELLOW,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                        },

                    });
                    points.push(position);
                }
                if (points.length > 1) {
                    var point = points[points.length - 2];
                    viewer.entities.add({
                        name: "pl_Measue_single" + MeasureGuid(),
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
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    //移动
    handler.setInputAction(function (move) {
        if (points.length > 0) {

            var pick;
            if (viewer.scene.globe.depthTestAgainstTerrain) {
                //地形测量
                pick = viewer.scene.pickPosition(move.endPosition);
            } else {
                //模型测量
                pick = viewer.scene.pick(move.endPosition);
            }
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
    //右击
    handler.setInputAction(function () {

        if (points.length > 2) {
            if (viewer.entities.getById("line_temp9999") != null) {
                viewer.entities.removeById("line_temp9999");
            }
            if (viewer.entities.getById("line_temp9998") != null) {
                viewer.entities.removeById("line_temp9998");
            }

            viewer.entities.add({
                name: "pl_Measue_single" + MeasureGuid(),
                polyline: {
                    positions: [points[0], points[points.length - 1]],
                    width: 2,
                    arcType: Cesium.ArcType.RHUMB,
                    material: Cesium.Color.RED,
                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                        color: Cesium.Color.RED,
                    }),
                }
            });
            //求一个平均点，用于定位
            var maxX = viewer.scene.cartesianToCanvasCoordinates(points[0]).x;
            var minX = viewer.scene.cartesianToCanvasCoordinates(points[0]).x;
            var maxY = viewer.scene.cartesianToCanvasCoordinates(points[0]).y;
            var minY = viewer.scene.cartesianToCanvasCoordinates(points[0]).y;
            var xSum = 0;
            var ySum = 0;
            var zSum = 0;

            for (var i in points) {
                xSum = xSum + parseFloat(points[i].x);
                ySum = ySum + parseFloat(points[i].y);
                zSum = zSum + parseFloat(points[i].z);
                if (viewer.scene.cartesianToCanvasCoordinates(points[i]).x > maxX) {
                    maxX = viewer.scene.cartesianToCanvasCoordinates(points[i]).x;
                }
                if (viewer.scene.cartesianToCanvasCoordinates(points[i]).x < minX) {
                    minX = viewer.scene.cartesianToCanvasCoordinates(points[i]).x;
                }
                if (viewer.scene.cartesianToCanvasCoordinates(points[i]).y > maxY) {
                    maxY = viewer.scene.cartesianToCanvasCoordinates(points[i]).y;
                }
                if (viewer.scene.cartesianToCanvasCoordinates(points[i]).y < minY) {
                    minY = viewer.scene.cartesianToCanvasCoordinates(points[i]).y;
                }

            }

            var pointcenter = new Cesium.Cartesian3(xSum / points.length, ySum / points.length, zSum / points.length);

            var juli1 = Cesium.Cartesian3.distance(points[0], points[points.length - 1]);
            var juli2 = Cesium.Cartesian3.distance(points[0], pointcenter);
            var juli3 = Cesium.Cartesian3.distance(pointcenter, points[points.length - 1]);

            var p = (juli1 + juli2 + juli3) / 2;
            var mianji = Math.sqrt(p * (p - juli1) * (p - juli2) * (p - juli3));
            var sum = Cesium.Cartesian3.distance(points[0], points[points.length - 1]);
            for (var j = 0; j < points.length - 1; j++) {
                juli1 = Cesium.Cartesian3.distance(points[j], points[j + 1]);
                juli2 = Cesium.Cartesian3.distance(points[j], pointcenter);
                juli3 = Cesium.Cartesian3.distance(pointcenter, points[j + 1]);

                p = (juli1 + juli2 + juli3) / 2;
                mianji = mianji + Math.sqrt(p * (p - juli1) * (p - juli2) * (p - juli3));
                sum = sum + Cesium.Cartesian3.distance(points[j], points[j + 1]);
            }

            viewer.entities.add({
                name: "pyl_Measue_single" + MeasureGuid(),
                position: pointcenter,
                label: {
                    text: '面积：' + mianji.toFixed(2) + '平方米  \n 周长：' + sum.toFixed(2) + '米',
                    showBackground: true,
                    backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                    font: '16px Times New Roman',
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                }
            });

            measureresult = " 面积：" + mianji.toFixed(2) + ' 平方米' + "\n\n" + " 周长：" + sum.toFixed(2) + ' 米';
            if (measureresult != "") {
                layui.form.val("measureinfoform", {
                    "desc": measureresult
                });
            }
            isRedo = true;
            points = [];
        }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

};
//方位角测量
function azimuthMeasure() {
    //标识当前选中工具
    selectMeasureOperate("widget_measure_azimuth_id");
    //清除临时图形
    ClearCeliangTemp();

    //if (viewer.scene.globe.depthTestAgainstTerrain) {//地形测量
    //    form.val("measureinfoform", {
    //        "desc": "\n\n单击地形两个点求方位角",
    //    });
    //    showbtn = "azimuth_measure";
    //    showBtnStyle(showbtn);
    //} else {
    //    form.val("measureinfoform", {
    //        "desc": "\n\n单击模型两个点求方位角",
    //    });
    //}

    if (handler != undefined) {
        handler.destroy();
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    var pickedOject;
    //左击
    handler.setInputAction(function (leftclik) {

        if (viewer.scene.globe.depthTestAgainstTerrain) {//地形测量
            pickedOject = viewer.scene.pickPosition(leftclik.position);
            if (multimeasure == false & isRedo == true) {
                ClearCeliangSingle();
                isRedo = false;
            }
        }
        else {
            pickedOject = viewer.scene.pick(leftclik.position);
            if (multimeasure == false & isRedo == true) {
                ClearCeliangSingle();
                isRedo = false;
            }
        }

        if (pickedOject != undefined) {
            var xyz = viewer.scene.pickPosition(leftclik.position);
            if (xyz != undefined) {
                viewer.entities.add({
                    name: "pt_Measue_single" + MeasureGuid(),
                    position: xyz,
                    point: {
                        pixelSize: 10,
                        color: Cesium.Color.YELLOW,
                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                    }
                });
                points.push(xyz);
                if (points.length == 2) {
                    var point = points[0];
                    viewer.entities.add({
                        name: "pl_Measue_single" + MeasureGuid(),
                        polyline: {
                            positions: points,
                            width: 2,
                            arcType: Cesium.ArcType.RHUMB,
                            material: Cesium.Color.RED,
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.RED,
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
                        name: "al_Measue_single" + MeasureGuid(),
                        position: Cesium.Cartesian3.fromElements((point.x + xyz.x) / 2, (point.y + xyz.y) / 2, (point.z + xyz.z) / 2),
                        label: {
                            text: '方位角：' + r.toFixed(2) + '°',
                            showBackground: true,
                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                            font: '16px Times New Roman',
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                        }
                    });
                    measureresult = " 方位角：" + r.toFixed(2) + '度';
                    if (measureresult != null) {
                        layui.form.val("measureinfoform", {
                            "desc": measureresult
                        });
                    }
                    isRedo = true;
                    points = [];
                }
            }
        }

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
};



//选中测量操作按钮
function selectMeasureOperate(id) {
    unselectMeasureOperate();
    document.getElementById(id).style = "color:#FFFFFF;background-color:#009688;width:65px;";
};
//取消测量操作按钮
function unselectMeasureOperate() {
    document.getElementById("widget_measure_point_id").style = "width:65px;";
    document.getElementById("widget_measure_height_id").style = "width:65px;";
    document.getElementById("widget_measure_distance_id").style = "width:65px;";
    document.getElementById("widget_measure_area_id").style = "width:65px;";
    document.getElementById("widget_measure_azimuth_id").style = "width:65px;";
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
    tipsentity.label.show = false;
    tipsentity.label.text = "";
};




//清除临时图形
function ClearCeliangTemp() {
    var count = 0;
    while (count < 40) {
        for (var i = 0; i < viewer.entities._entities._array.length; i++) {
            if ((viewer.entities._entities._array[i]._name) && ((viewer.entities._entities._array[i]._name.indexOf("temppoint") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("temppolygon") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("ptMeasue") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("ptMeasue_label") > -1)
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

    points = [];
    ClearCeliangSingle();
}
//清除单次测量图形
function ClearCeliangSingle() {
    var count = 0;
    while (count < 40) {
        for (var i = 0; i < viewer.entities._entities._array.length; i++) {
            if ((viewer.entities._entities._array[i]._name) && ((viewer.entities._entities._array[i]._name.indexOf("temppoint") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("temppolygon") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("pt_Measue_single") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("ptl_Measue_single") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("pl_Measue_single") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("pll_Measue_single") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("py_Measue_single") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("pyl_Measue_single") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("al_Measue_single") > -1)
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
        "desc": "   ",
    });
    points = [];

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