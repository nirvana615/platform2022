
//测量widget
var projectlayerlistceliangindex = null;   //测量弹出层
var handler;
var scene = viewer.scene;
var canvas = scene.canvas;
var isRedo = false;  
var points = [];          
var measurecontent = null;
var showbtn = null;
var multimeasure = false;
//测量
function measure() {
    if (projectlayerlistceliangindex != null) {
        layer.msg('已打开测量窗口');
        return;
    }
    //添加点标注，弹出框
    projectlayerlistceliangindex = layer.open({
        type: 1
        , title: ['测量工具', 'font-weight:bold;font-size:small;font-family:	Microsoft YaHei']
        , area: ['320px', '475px']
        , shade: 0
        , offset: ['85px', '1530px']
        , closeBtn: 1
        , moveOut: true
        , resize: false
        , content:'<div class="layui-tab layui-tab-brief" lay-filter="measurelayer">    <ul class="layui-tab-title">        <li lay-id="111" class="layui-this" style="width:40%;padding-top: 5px;line-height: normal;">地形测量</li>        <li lay-id="222" style="width:40%;padding-top: 5px;line-height:20px">模型测量</li>    </ul>    <div class="layui-tab-content">        <div class="layui-tab-item layui-show">        </div>        <div class="layui-tab-item">        </div>        <form class="layui-form" style="margin-top:5px;margin-left:5px;" lay-filter="measureinfoform">            <div class="layui-row">                <div class="layui-col-md3">                    <label class="layui-form-label" style="width:60px;">多次测量</label>                </div>                <div class="layui-col-md9">                    <div class="layui-input-block" style="margin-left:40px">                        <input type="checkbox" style="padding-left:0px;width:80%" name="close" lay-filter="multiMeasureswitch-type" lay-skin="switch" lay-text="是|否">                    </div>                </div>            </div>            <div class="layui-row">                 <div class="layui-input-block" style="margin-left:5px;width:80%;padding-right: 5px;padding-top: 5px;">                      <textarea name="desc" placeholder="请选择您的测量项" class="layui-textarea" style="height:200px;width: 118%;"></textarea>                 </div>            </div>        </form>        <div class="layui-btn-container" style="margin-top:15px;text-align:center ">            <button type="button" name="coordiration_measure" class="layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm" onclick="pointMeasure()">坐标</button>            <button type="button" name="distance_measure" class="layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm" onclick="distanceMeasure()">距离</button>            <button type="button" name="area_measure" class="layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm" onclick="areaMeasure()">面积</button>            <button type="button" name="azimuth_measure" class="layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm" onclick="azimuthMeasure()">方位角</button>        </div>        <div style="text-align:center;margin-top:10px;" >            <button type="button" style="width:80%" class="layui-btn layui-btn-radius layui-btn-fluid layui-btn-danger" onclick="ClearCeliangTemp()">新测量</button>        </div>    </div></div>								'
        , zIndex: layer.zIndex
        , success: function (layero) {
            //地形测量把深度监测设置为TRUE
            viewer.scene.globe.depthTestAgainstTerrain = true;
            // 默认地形测量
            form.render();
            form.val("measureinfoform", {
                "desc": "",
            });
        }
        , end: function () {
            viewer.scene.globe.depthTestAgainstTerrain = false;
            projectlayerlistceliangindex = null;
        }
    });
};

//多次测量监听
form.on('switch(multiMeasureswitch-type)', function (data) {  
    if (data.elem.checked) {
        multimeasure = true;
    } else {
        multimeasure = false;
    }
    return false;
});
//地形、模型选项卡监听
elem.on('tab(measurelayer)', function (data) {
    if (this.getAttribute('lay-id') == "222") {
        ClearCeliangTemp();
        if (curtileset == null) {
            layer.msg('请先选择模型');
            elem.tabChange('measurelayer', 111); 
            return;
        }
        viewer.scene.globe.depthTestAgainstTerrain = false;
    } else {
        ClearCeliangTemp();
        viewer.scene.globe.depthTestAgainstTerrain = true;
    }
});

//坐标量测
function pointMeasure() {
    ClearCeliangTemp();
    showbtn = "coordiration_measure";
    showBtnStyle(showbtn);
    if (viewer.scene.globe.depthTestAgainstTerrain) {
        form.val("measureinfoform", {
            "desc": "\n\n单击地形选择位置",
        });
    }
    else {
        form.val("measureinfoform", {
            "desc": "\n\n单击模型选择位置",
        });
    }
    if (handler != undefined) {handler.destroy();}
    handler = new Cesium.ScreenSpaceEventHandler(canvas);
    //左击
    handler.setInputAction(function (leftclick) {
        var pickedOject
            if (viewer.scene.globe.depthTestAgainstTerrain) {//地形测量
                pickedOject = scene.pickPosition(leftclick.position);
                if (multimeasure == false) {
                    ClearCeliangTemp();
                }
            }else {
                pickedOject = scene.pick(leftclick.position);
                if (multimeasure == false) {
                    ClearCeliangTemp();
                }
            }
            if (pickedOject != undefined) {
                var position = scene.pickPosition(leftclick.position);
                if (position != undefined) {
                    var cartesian3 = Cesium.Cartographic.fromCartesian(position);                        //笛卡尔XYZ
                    var longitude = Cesium.Math.toDegrees(cartesian3.longitude);                         //经度
                    var latitude = Cesium.Math.toDegrees(cartesian3.latitude);                           //纬度
                    var height = cartesian3.height;
                    if (height > 0) {
                        measurecontent = "\n" + "经度： " + ToDegress(longitude) + "\n\n" + "纬度： " + ToDegress(latitude) + "\n\n" + "高程： " + (height).toFixed(2);
                        if (Cesium.defined(position)) {
                            viewer.entities.add({
                                name: "ptMeasue" + NewGuid(),
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
                                name: "ptlMeasue" + NewGuid(),
                                position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
                                label: {
                                    text: longitude.toFixed(6) + '，' + latitude.toFixed(6) + '，' + (height).toFixed(2),
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
                            if (measurecontent != null) {
                                form.val("measureinfoform", {
                                    "desc": measurecontent
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
};
//距离量测
function distanceMeasure() {
    ClearCeliangTemp(); 
    showbtn = "distance_measure";
    showBtnStyle(showbtn);
    if (viewer.scene.globe.depthTestAgainstTerrain) {//地形测量
        form.val("measureinfoform", {
            "desc": "\n\n单击地图两个点求距离",
        });
    }
    else {
        form.val("measureinfoform", {
            "desc": "\n\n单击模型两个点求距离",
        });
    }
    
    if (handler != undefined) { handler.destroy(); }

    handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    //左击
    handler.setInputAction(function (leftclik) {
        var pickedOject 
            if (viewer.scene.globe.depthTestAgainstTerrain) {//地形测量
                pickedOject = scene.pickPosition(leftclik.position);
                if (multimeasure == false & isRedo==true) {
                    ClearCeliangSingle();
                    isRedo = false;
                }
            }
            else {
                pickedOject = scene.pick(leftclik.position);
                if (multimeasure == false & isRedo == true) {
                    ClearCeliangSingle();
                    isRedo = false;
                }
            }
           
        if (pickedOject != undefined) {
            var xyz = scene.pickPosition(leftclik.position);
            if (xyz != undefined) {
                var rblh = Cesium.Cartographic.fromCartesian(xyz);
                viewer.entities.add({
                    name: "pt_Measue_single" + NewGuid(),
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
                        name: "pl_Measue_single" + NewGuid(),
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
                            name: "pl_Measue_single" + NewGuid(),
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
                            name: "pl_Measue_single" + NewGuid(),
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
                            name: "pll_Measue_single" + NewGuid(),
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
                            name: "pll_Measue_single" + NewGuid(),
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
                                name: "pll_Measue_single" + NewGuid(),
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
                        measurecontent = " 距离：" + sum.toFixed(2) + "  米\n\n" + " 平距：" + pingju.toFixed(2) + "  米\n\n" + " 高差：" + (rblh1.height - h).toFixed(2) + "  米\n\n" + " 倾角：" + (Math.acos(pingju / sum) * 180 / Math.PI).toFixed(2) + ' °';
                        if (measurecontent != null) {
                            form.val("measureinfoform", {
                                "desc": measurecontent
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
                            name: "pl_Measue_single" + NewGuid(),
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
                            name: "pl_Measue_single" + NewGuid(),
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
                            name: "pll_Measue_single" + NewGuid(),
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
                            name: "pll_Measue_single" + NewGuid(),
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
                            name: "pll_Measue_single" + NewGuid(),
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

                        measurecontent = " 距离:" + sum.toFixed(2) + "  米\n\n" + " 平距:" + pingju.toFixed(2) + "  米\n\n" + " 高差:" + (rblh.height - h).toFixed(2) + "  米\n\n" + " 倾角:" + (Math.acos(pingju / sum) * 180 / Math.PI).toFixed(2) + '°';
                        if (measurecontent != null) {
                            form.val("measureinfoform", {
                                "desc": measurecontent
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
    
};
//面积测量
function areaMeasure() {
    ClearCeliangTemp();
    if (viewer.scene.globe.depthTestAgainstTerrain) {//地形测量
        form.val("measureinfoform", {
            "desc": "\n\n左击地图定义曲面，右击完成",
        });
        showbtn = "area_measure";
        showBtnStyle(showbtn);
    } else {
        form.val("measureinfoform", {
            "desc": "\n\n左击模型定义曲面，右击完成",
        });
    }
    if (handler != undefined) {
        handler.destroy();
    }

    handler = new Cesium.ScreenSpaceEventHandler(canvas);
    //左击
    handler.setInputAction(function (leftclik) {
        form.val("measureinfoform", {
            "desc": "\n\n\n\n右击完成操作",
        });
        var pickedOject
        if (viewer.scene.globe.depthTestAgainstTerrain) {//地形测量
            pickedOject = scene.pickPosition(leftclik.position);
            if (multimeasure == false & isRedo == true) {
                ClearCeliangSingle();
                isRedo = false;
            }
        } else {
            pickedOject = scene.pick(leftclik.position);
            if (multimeasure == false & isRedo == true) {
                ClearCeliangSingle();
                isRedo = false;
            }
        }
        if (pickedOject != undefined) {
            var position = scene.pickPosition(leftclik.position);
            if (position != undefined) {

                if (Cesium.defined(position)) {
                    viewer.entities.add({
                        name: "pt_Measue_single" + NewGuid(),
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
                        name: "pl_Measue_single" + NewGuid(),
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

            var pick
            if (viewer.scene.globe.depthTestAgainstTerrain) {//地形测量
                pick = scene.pickPosition(move.endPosition);
            } else {
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
                name: "pl_Measue_single" + NewGuid(),
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
                name: "pyl_Measue_single" + NewGuid(),
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

            measurecontent = " 面积：" + mianji.toFixed(2) + ' 平方米' + "\n\n" + " 周长：" + sum.toFixed(2) + ' 米';
            if (measurecontent != null) {
                form.val("measureinfoform", {
                    "desc": measurecontent
                });
            }
            isRedo = true;
            points = [];
        }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

};
//方位角量测
function azimuthMeasure() {
    ClearCeliangTemp();
    if (viewer.scene.globe.depthTestAgainstTerrain) {//地形测量
        form.val("measureinfoform", {
            "desc": "\n\n单击地形两个点求方位角",
        });
        showbtn = "azimuth_measure";
        showBtnStyle(showbtn);
    } else {
        form.val("measureinfoform", {
            "desc": "\n\n单击模型两个点求方位角",
        });
    }
    if (handler != undefined) {
        handler.destroy();
    }

    handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    var pickedOject;
    //左击
    handler.setInputAction(function (leftclik) {

        if (viewer.scene.globe.depthTestAgainstTerrain) {//地形测量
            pickedOject = scene.pickPosition(leftclik.position);
            if (multimeasure == false & isRedo == true) {
                ClearCeliangSingle();
                isRedo = false;
            }
        }
        else {
            pickedOject = scene.pick(leftclik.position);
            if (multimeasure == false & isRedo == true) {
                ClearCeliangSingle();
                isRedo = false;
            }
        }

        if (pickedOject != undefined) {
            var xyz = scene.pickPosition(leftclik.position);
            if (xyz != undefined) {
                viewer.entities.add({
                    name: "pt_Measue_single" + NewGuid(),
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
                            name: "pl_Measue_single" + NewGuid(),
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
                        name: "al_Measue_single" + NewGuid(),
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
                    measurecontent = " 方位角：" + r.toFixed(2) + '度';
                    if (measurecontent != null) {
                        form.val("measureinfoform", {
                            "desc": measurecontent
                        });
                    }
                    isRedo = true;
                    points = [];
                }
            }
        }
         
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
//修改测量项按钮样式
function showBtnStyle(showbtn) {
    var btnstyleclicked = "layui-btn  layui-btn-radius layui-btn-s";
    var btnstyleunclicked = "layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm";
    if (showbtn == "coordiration_measure") {
        window.document.getElementsByName("coordiration_measure")[0].className = btnstyleclicked;
        window.document.getElementsByName("distance_measure")[0].className = btnstyleunclicked;
        window.document.getElementsByName("area_measure")[0].className = btnstyleunclicked;
        window.document.getElementsByName("azimuth_measure")[0].className = btnstyleunclicked;
    }
    if (showbtn == null) {
        window.document.getElementsByName("coordiration_measure")[0].className = btnstyleunclicked;
        window.document.getElementsByName("distance_measure")[0].className = btnstyleunclicked;
        window.document.getElementsByName("area_measure")[0].className = btnstyleunclicked;
        window.document.getElementsByName("azimuth_measure")[0].className = btnstyleunclicked;
    }
    if (showbtn == "distance_measure") {
        window.document.getElementsByName("coordiration_measure")[0].className = btnstyleunclicked;
        window.document.getElementsByName("distance_measure")[0].className = btnstyleclicked;
        window.document.getElementsByName("area_measure")[0].className = btnstyleunclicked;
        window.document.getElementsByName("azimuth_measure")[0].className = btnstyleunclicked;
    }
    if (showbtn == "area_measure") {
        window.document.getElementsByName("coordiration_measure")[0].className = btnstyleunclicked;
        window.document.getElementsByName("distance_measure")[0].className = btnstyleunclicked;
        window.document.getElementsByName("area_measure")[0].className = btnstyleclicked;
        window.document.getElementsByName("azimuth_measure")[0].className = btnstyleunclicked;
    }
    if (showbtn == "azimuth_measure") {
        window.document.getElementsByName("coordiration_measure")[0].className = btnstyleunclicked;
        window.document.getElementsByName("distance_measure")[0].className = btnstyleunclicked;
        window.document.getElementsByName("area_measure")[0].className = btnstyleunclicked;
        window.document.getElementsByName("azimuth_measure")[0].className = btnstyleclicked;
    }
}

//清除临时图形
function ClearCeliangTemp() {
    var count = 0;
    while (count < 40) {
        for (var i = 0; i < viewer.entities._entities._array.length; i++) {
            if ((viewer.entities._entities._array[i]._name) && ((viewer.entities._entities._array[i]._name.indexOf("temppoint") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("temppolygon") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("ptMeasue") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("ptlMeasue") > -1)
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
    form.val("measureinfoform", {
        "desc": "",
    });
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
    form.val("measureinfoform", {
        "desc": "   ",
    });
    points = [];

}

function ToDegress(val) {
    if (typeof (val) == "undefined"|| val =="") {
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
    return strDu + "°" + strFen + "′" + strMiao+"″"
}