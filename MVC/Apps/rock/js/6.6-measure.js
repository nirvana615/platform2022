//alert(bl2xy(28.9396062799373, 107.123058984478, 6378137.0, 1 / 298.257223563, 3, 108, false));
//alert(xy2bl(414500.414660328, 3202892.196743, 6378137.0, 1 / 298.257223563, 3, 108, false));
var eyepostionList = [];
function bl2xy(b, l, a, f, zonewidth, cm, assumedCoord) {
    l -= cm - (zonewidth == 6 ? 3 : 0);
    var xy = bl2xy0(b, l, a, 1 / f, zonewidth);
    var x = xy.split(' ')[0];
    var y = xy.split(' ')[1];
    if (assumedCoord) {
        y += cm * 1000000 / zonewidth;
    }
    y = Number(y) + 500000;
    x = Number(x);
    var xy = new Object;
    xy.x = y ;
    xy.y = x;
    return xy;
}
function bl2xy0(B, L, a, f, zonewidth) {
    var ee = (2 * f - 1) / f / f;
    var ee2 = ee / (1 - ee);
    var rB, tB, m;
    rB = B * Math.PI / 180;
    tB = Math.tan(rB);
    m = Math.cos(rB) * L * Math.PI / 180;
    var N = a / Math.sqrt(1 - ee * Math.sin(rB) * Math.sin(rB));
    var it2 = ee2 * Math.pow(Math.cos(rB), 2);
    x = m * m / 2 + (5 - tB * tB + 9 * it2 + 4 * it2 * it2) * Math.pow(m, 4) / 24 + (61 - 58 * tB * tB + Math.pow(tB, 4)) * Math.pow(m, 6) / 720;
    x = MeridianLength(B, a, f) + N * tB * x;
    y = N * (m + (1 - tB * tB + it2) * Math.pow(m, 3) / 6 + (5 - 18 * tB * tB + Math.pow(tB, 4) + 14 * it2 - 58 * tB * tB * it2) * Math.pow(m, 5) / 120);
    return x + " " + y;
}
function MeridianLength(B, a, f) {
    var ee = (2 * f - 1) / f / f;
    var rB = B * Math.PI / 180;
    var cA, cB, cC, cD, cE;
    cA = 1 + 3 * ee / 4 + 45 * Math.pow(ee, 2) / 64 + 175 * Math.pow(ee, 3) / 256 + 11025 * Math.pow(ee, 4) / 16384;
    cB = 3 * ee / 4 + 15 * Math.pow(ee, 2) / 16 + 525 * Math.pow(ee, 3) / 512 + 2205 * Math.pow(ee, 4) / 2048;
    cC = 15 * Math.pow(ee, 2) / 64 + 105 * Math.pow(ee, 3) / 256 + 2205 * Math.pow(ee, 4) / 4096;
    cD = 35 * Math.pow(ee, 3) / 512 + 315 * Math.pow(ee, 4) / 2048;
    cE = 315 * Math.pow(ee, 4) / 131072;
    return a * (1 - ee) * (cA * rB - cB * Math.sin(2 * rB) / 2 + cC * Math.sin(4 * rB) / 4 - cD * Math.sin(6 * rB) / 6 + cE * Math.sin(8 * rB) / 8);
}
function xy2bl(x, y, a, f, zonewidth, cm, assumedCoord) {
    if (assumedCoord) {
        x -= cm * 1000000 / zonewidth;
    }
    x = Number(x) - 500000;
    var bl = xy2bl0(y, x, a, 1 / f, zonewidth);
    var b = Number(bl.split(' ')[0]);
    var l = Number(bl.split(' ')[1]) + cm;
    var xy = new Object;
    xy.b = b;
    xy.l = l;
    return xy;
}
function xy2bl0(x, y, a, f, zonewidth) {
    var ee = (2 * f - 1) / f / f;
    var ee2 = ee / (1 - ee);
    var cA, cB, cC, cD, cE;
    cA = 1 + 3 * ee / 4 + 45 * ee * ee / 64 + 175 * Math.pow(ee, 3) / 256 + 11025 * Math.pow(ee, 4) / 16384;
    cB = 3 * ee / 4 + 15 * ee * ee / 16 + 525 * Math.pow(ee, 3) / 512 + 2205 * Math.pow(ee, 4) / 2048;
    cC = 15 * ee * ee / 64 + 105 * Math.pow(ee, 3) / 256 + 2205 * Math.pow(ee, 4) / 4096;
    cD = 35 * Math.pow(ee, 3) / 512 + 315 * Math.pow(ee, 4) / 2048;
    cE = 315 * Math.pow(ee, 4) / 131072;
    var Bf = x / (a * (1 - ee) * cA);
    do {
        B = Bf;
        Bf = (x + a * (1 - ee) * (cB * Math.sin(2 * Bf) / 2 - cC * Math.sin(4 * Bf) / 4 + cD * Math.sin(6 * Bf) / 6) - cE * Math.sin(8 * Bf) / 8) / (a * (1 - ee) * cA);
    }
    while (Math.abs(B - Bf) > 0.00000000001);
    var N = a / Math.sqrt(1 - ee * Math.pow(Math.sin(Bf), 2));
    var V2 = 1 + ee2 * Math.pow(Math.cos(Bf), 2);
    var it2 = ee2 * Math.pow(Math.cos(Bf), 2);
    var tB2 = Math.pow(Math.tan(Bf), 2);
    B = Bf - V2 * Math.tan(Bf) / 2 * (Math.pow(y / N, 2) - (5 + 3 * tB2 + it2 - 9 * it2 * tB2) * Math.pow(y / N, 4) / 12 + (61 + 90 * tB2 + 45 * tB2 * tB2) * Math.pow(y / N, 6) / 360);
    L = (y / N - (1 + 2 * tB2 + it2) * Math.pow(y / N, 3) / 6 + (5 + 28 * tB2 + 24 * tB2 * tB2 + 6 * it2 + 8 * it2 * tB2) * Math.pow(y / N, 5) / 120) / Math.cos(Bf);
    B = B * 180 / Math.PI;
    L = L * 180 / Math.PI;
    return B + " " + L;
};








//测量widget
//测量。
var projectlayerlistceliangindex = null;   //测量模块
var handler;
var scene = viewer.scene;
var canvas = scene.canvas;
var isRedo = false;  
var points = [];          
var showCeliang = null;
var dingWeilayerindex = null;
var modelJiaMilayerindex = null;
function celiang() {

  
    if (projectlayerlistceliangindex != null) {
        layer.msg('已打开测量窗口');
        return;
    }
   
    //添加点标注，弹出框
    projectlayerlistceliangindex = layer.open({
        type: 1
        , title: ['测量', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['300px', '350px']
        , shade: 0
        , offset: ['85px', '260px']
        , closeBtn: 1
        //, maxmin: true
        , moveOut: true
        //, btn: ['坐标', '距离', '面积', '产状', '体积']
        , content: celinghtml
        , zIndex: layer.zIndex
        , success: function (layero) {
            //地形测量把深度监测设置为TRUE
           // viewer.scene.globe.depthTestAgainstTerrain = true;
            // 进来就是地形测量
            form.render();

            var descString = "模型测量";
            //判断一下模型。项目
            if (currentprojectid == null) {
                descString = descString + '，请先选择项目、模型';
            }
            if (currentprojectid != null && curtileset == null) {
                descString = descString + '，请先选择模型';
            }
            form.val("celianginfoform", {
                "desc": descString,
                "celiangfangfa": "请选择测量方法"
            });
            //viewer.scene.globe.depthTestAgainstTerrain = true;
           // layer.min(projectindex)
            //置顶
        }
        , end: function () {
            viewer.scene.globe.depthTestAgainstTerrain = false;
            projectlayerlistceliangindex = null;
            //删除图层数据

        }
    });
};
//坐标量测
function pointMeasure2() {
    ClearCeliangTemp();
    if (viewer.scene.globe.depthTestAgainstTerrain) {//地形测量
        form.val("celianginfoform", {
            "desc": "单击地形选择位置",
            "celiangfangfa": "坐标测量",
        });
    } else {
        form.val("celianginfoform", {
            "desc": "单击模型选择位置",
            "celiangfangfa": "坐标测量",
        });
    }

        if (handler != undefined) {
            handler.destroy();
    }
        handler = new Cesium.ScreenSpaceEventHandler(canvas);
        //左击
        handler.setInputAction(function (leftclick) {
            var pickedOject
            var hGaizhengshu = 0;
            if (viewer.scene.globe.depthTestAgainstTerrain) {//地形测量
                pickedOject = scene.pickPosition(leftclick.position);
            } else {
                pickedOject = scene.pick(leftclick.position);
                try {
                    if (modleInfo.gcgz == "1") {
                        hGaizhengshu = 0;
                    } else {
                        hGaizhengshu = parseFloat(modleInfo.gcgz);
                    }
                } catch (e) {
                    console.log(e.message);//sojson is undefined
                }
       
               
            }
         

            if (pickedOject != undefined) {
                var position = scene.pickPosition(leftclick.position);
                if (position != undefined) {
                    var cartesian3 = Cesium.Cartographic.fromCartesian(position);                        //笛卡尔XYZ
                    var longitude = Cesium.Math.toDegrees(cartesian3.longitude);                         //经度
                    var latitude = Cesium.Math.toDegrees(cartesian3.latitude);                           //纬度
                    var height = cartesian3.height;     
                    var xy = {};
                    if (longitude > 109.5) {
                        xy = bl2xy(cartesian3.latitude * 180 / Math.PI, cartesian3.longitude * 180 / Math.PI, 6378137.0, 1 / 298.257223563, 3, 111, false);
                    } else {
                        xy = bl2xy(cartesian3.latitude * 180 / Math.PI, cartesian3.longitude * 180 / Math.PI, 6378137.0, 1 / 298.257223563, 3, 108, false);
                    }
                    

                    if (height > 0) {
                        // showCeliang = " 位置:" + "\n" + " X:" + position.x.toFixed(6) + "\n" + " Y:" + position.y.toFixed(6) + "\n" + " Z:" + position.z.toFixed(6);
                        showCeliang = "X: " + (xy.x).toFixed(3) + "\n" + "Y: " + parseFloat(xy.y).toFixed(3) + "\n" + "L: " + ToDegress(longitude) + "\n" + "B: " + ToDegress(latitude) + "\n" + "H: " + (height + hGaizhengshu).toFixed(2);


                        if (Cesium.defined(position)) {
                            viewer.entities.add({
                                name: "ptMeasue" + NewGuidCL(),
                                position: position,
                                point: {
                                    pixelSize: 12,
                                    color: Cesium.Color.RED,
                                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                                }
                            });
                            //测试用
                            viewer.entities.add({
                                name: "ptlMeasue" + NewGuidCL(),
                                position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
                                label: {
                                    text: '经纬度(' + longitude.toFixed(6) + ',' + latitude.toFixed(6) + ',' + (height + hGaizhengshu).toFixed(2) + ')',
                                    showBackground: true,
                                    backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                    font: '16px Times New Roman',
                                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                    pixelOffset: new Cesium.Cartesian2(0.0, -60),

                                }
                            });
                            if (showCeliang != null) {
                                form.val("celianginfoform", {
                                    "desc": showCeliang
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
//生成随机数
function NewGuidCL() {
    return ((((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1));
};
elem.on('tab(celianglayer)', function (data) {
    if (this.getAttribute('lay-id') == "222") {
        //判断一下模型。项目
        var descString = "模型测量";
        if (currentprojectid == null) {
            layer.msg('请先选择项目、模型');
            descString = descString + '，请先选择项目、模型';
        }
        if (currentprojectid != null&&curtileset == null) {
            layer.msg('请先选择模型');
            descString = descString + '，请先选择模型';
        }
        
        //判断一下模型。项目
        

        form.val("celianginfoform", {
            "desc": descString,
            "celiangfangfa": "请选择测量方法"
        });

        viewer.scene.globe.depthTestAgainstTerrain = false;
    } else {
        viewer.scene.globe.depthTestAgainstTerrain = true;
    }
});
//高度量测
function heightMeasure() {
        ClearCeliangTemp();
     
    if (viewer.scene.globe.depthTestAgainstTerrain) {//地形测量
        form.val("celianginfoform", {
            "desc": "单击地图两个点求距离",
            "celiangfangfa": "距离测量",
        });
    } else {
        form.val("celianginfoform", {
            "desc": "单击模型两个点求距离",
            "celiangfangfa": "距离测量",
        });
    }
       
        if (handler != undefined) {
            handler.destroy();
        }
        handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

        //左击
    handler.setInputAction(function (leftclik) {
           var pickedOject 
            if (viewer.scene.globe.depthTestAgainstTerrain) {//地形测量
                pickedOject = scene.pickPosition(leftclik.position);
            } else {
                pickedOject = scene.pick(leftclik.position);
            }
           
            if (pickedOject != undefined) {
                var xyz = scene.pickPosition(leftclik.position);
                if (xyz != undefined) {
                    var rblh = Cesium.Cartographic.fromCartesian(xyz);

                    viewer.entities.add({
                        name: "ptMeasue" +NewGuidCL(),
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
                            name: "plMeasue" +NewGuidCL(),
                            polyline: {
                                positions: [point, xyz],
                                width: 2,
                                material: Cesium.Color.RED,
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.RED,
                                }),


                            }
                        });

                        var rblh1 = Cesium.Cartographic.fromCartesian(point);
                        if (rblh1.height > rblh.height) {
                            var b = rblh.latitude * 180 / Math.PI;
                            var l = rblh.longitude * 180 / Math.PI;
                            var h = rblh.height;

                            viewer.entities.add({
                                name: "plMeasue" +NewGuidCL(),
                                polyline: {
                                    positions: [point, Cesium.Cartesian3.fromDegrees(l, b, rblh1.height)],
                                    width: 2,
                                    material: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.GREEN
                                    }),
                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.GREEN
                                    }),
                                }
                            });
                            viewer.entities.add({
                                name: "plMeasue" +NewGuidCL(),
                                polyline: {
                                    positions: [xyz, Cesium.Cartesian3.fromDegrees(l, b, rblh1.height)],
                                    width: 2,
                                    material: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.BLUE
                                    }),
                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.BLUE
                                    }),
                                }
                            });

                            viewer.entities.add({
                                name: "pllMeasue" +NewGuidCL(),
                                position: Cesium.Cartesian3.fromDegrees(l, b, (rblh1.height + h) / 2),
                                // position: Cesium.Cartesian3.fromDegrees(l, b, rblh1.height),
                                label: {
                                    text: '高差：' + (rblh1.height - h).toFixed(2) + '米',
                                    showBackground: true,
                                    backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                    font: '16px Times New Roman',
                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                                    //pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                }
                            });
                            var sum = Cesium.Cartesian3.distance(points[0], points[1]);
                            viewer.entities.add({
                                name: "pllMeasue" +NewGuidCL(),
                                position: Cesium.Cartesian3.fromDegrees((l + rblh1.longitude * 180 / Math.PI) / 2, (b + rblh1.latitude * 180 / Math.PI) / 2, (rblh1.height + h) / 2),

                                label: {
                                    text: '距离：' + sum.toFixed(2) + '米',
                                    showBackground: true,
                                    backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                    font: '16px Times New Roman',
                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                                    //pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                }
                            });
                            var pingju = Math.sqrt(Math.pow(sum, 2) - Math.pow(rblh1.height - h, 2));
                            //viewer.entities.add({
                            //    name: "pllMeasue" +NewGuidCL(),
                            //    position: Cesium.Cartesian3.fromDegrees((l + rblh1.longitude * 180 / Math.PI) / 2, (b + rblh1.latitude * 180 / Math.PI) / 2, rblh1.height),

                            //    label: {
                            //        text: '平距：' + pingju.toFixed(2) + '米',
                            //        showBackground: true,
                            //        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                            //        font: '16px Times New Roman',
                            //        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            //        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            //        disableDepthTestDistance: Number.POSITIVE_INFINITY
                            //        //pixelOffset: new Cesium.Cartesian2(0.0, -60),
                            //    }
                            //});
                              viewer.entities.add({
                                name: "pllMeasue" +NewGuidCL(),
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
                            console.log(Math.acos(pingju / sum) * 180 / Math.PI);
                            showCeliang = " 距离:" + sum.toFixed(2) + "\n" + " 平距:" + pingju.toFixed(2) + "\n" + " 高差:" + (rblh1.height - h).toFixed(2) + "\n" + " 倾角:" + (Math.acos(pingju / sum) * 180 / Math.PI).toFixed(2) + '°';
                            if (showCeliang != null) {
                                form.val("celianginfoform", {
                                    "desc": showCeliang
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
                                name: "plMeasue" +NewGuidCL(),
                                polyline: {
                                    positions: [point, Cesium.Cartesian3.fromDegrees(l, b, rblh.height)],
                                    width: 2,
                                    material: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.GREEN
                                    }),
                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.GREEN
                                    }),
                                }
                            });

                            viewer.entities.add({
                                name: "plMeasue" +NewGuidCL(),
                                polyline: {
                                    positions: [xyz, Cesium.Cartesian3.fromDegrees(l, b, rblh.height)],
                                    width: 2,
                                    material: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.BLUE
                                    }),
                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.BLUE
                                    }),
                                }
                            });
                            viewer.entities.add({
                                name: "pllMeasue" +NewGuidCL(),
                                position: Cesium.Cartesian3.fromDegrees(l, b, (rblh.height + h) / 2),
                                // position: Cesium.Cartesian3.fromDegrees(l, b, rblh.height),
                                label: {
                                    text: '高差：' + (rblh.height - h).toFixed(2) + '米',
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
                                name: "pllMeasue" +NewGuidCL(),
                                position: Cesium.Cartesian3.fromDegrees((l + rblh.longitude * 180 / Math.PI) / 2, (b + rblh.latitude * 180 / Math.PI) / 2, (rblh.height + h) / 2),

                                label: {
                                    text: '距离：' + sum.toFixed(2) + '米',
                                    showBackground: true,
                                    backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                    font: '16px Times New Roman',
                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                                    //pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                }
                            });
                            var pingju = Math.sqrt(Math.pow(sum, 2) - Math.pow(rblh.height - h, 2));
                            console.log(Math.acos(pingju / sum) * 180 / Math.PI);
                            //viewer.entities.add({
                            //    name: "pllMeasue" +NewGuidCL(),
                            //    position: Cesium.Cartesian3.fromDegrees((l + rblh.longitude * 180 / Math.PI) / 2, (b + rblh.latitude * 180 / Math.PI) / 2, rblh.height),

                            //    label: {
                            //        text: '平距：' + pingju.toFixed(2) + '米',
                            //        showBackground: true,
                            //        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                            //        font: '16px Times New Roman',
                            //        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            //        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            //        disableDepthTestDistance: Number.POSITIVE_INFINITY
                            //        //pixelOffset: new Cesium.Cartesian2(0.0, -60),
                            //    }
                            //});
                            viewer.entities.add({
                                name: "pllMeasue" + NewGuidCL(),
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

                            showCeliang = " 距离:" + sum.toFixed(2) + "\n" + " 平距:" + pingju.toFixed(2) + "\n" + " 高差:" + (rblh.height - h).toFixed(2) + "\n" + " 倾角:" + (Math.acos(pingju / sum) * 180 / Math.PI).toFixed(2) + '°';
                            if (showCeliang != null) {
                                form.val("celianginfoform", {
                                    "desc": showCeliang
                                });
                            }
                            isRedo = true;
                            points = [];
                        }
                        else {

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
/*
面积计算包括表面积、投影面积计算
投影面积计算过程：
（1）获取空间直角坐标XYZ
（2）转换为大地坐标BLH
（3）转换为平面直角坐标xy
（4）计算面积
*/
function areaMeasure2() {
    //本面积计算方法为：将所有点转换为大地坐标BLH，然后将H赋值为最大H，再转换为空间直角坐标XYZ，取XY计算面积
    ClearCeliangTemp();
    eyepostionList = [];
    if (viewer.scene.globe.depthTestAgainstTerrain) {//地形测量
        form.val("celianginfoform", {
            "desc": "左击地图定义曲面，右击完成",
            "celiangfangfa": "面积测量",
        });
    } else {
        form.val("celianginfoform", {
            "desc": "左击模型定义曲面，右击完成",
            "celiangfangfa": "面积测量",
        });
    }
    if (handler != undefined) {
        handler.destroy();
    }

    handler = new Cesium.ScreenSpaceEventHandler(canvas);

    //左击
    handler.setInputAction(function (leftclik) {
          

        var pickedOject
        if (viewer.scene.globe.depthTestAgainstTerrain) {//地形测量
            pickedOject = scene.pickPosition(leftclik.position);
        } else {
            pickedOject = scene.pick(leftclik.position);
        }

        if (pickedOject != undefined) {
            var position = scene.pickPosition(leftclik.position);
            if (position != undefined) {

                if (Cesium.defined(position)) {
                    viewer.entities.add({
                        name: "ptMeasue" + NewGuidCL(),
                        position: position,
                        point: {
                            pixelSize: 10,
                            color: Cesium.Color.YELLOW,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                        },

                    });
                    points.push(position);
                    var eyepostion = new Cesium.Cartesian3(viewer.camera.position.x, viewer.camera.position.y, viewer.camera.position.z);
                    eyepostionList.push(eyepostion);
                }
                if (points.length > 1) {
                    var point = points[points.length - 2];
                    viewer.entities.add({
                        name: "plMeasue" + NewGuidCL(),
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
            //清除多边形临时边线

            var pick 
            if (viewer.scene.globe.depthTestAgainstTerrain) {//地形测量
                pick = scene.pickPosition(move.endPosition);
            } else {
                pick= viewer.scene.pick(move.endPosition);
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
    handler.setInputAction(function (rightclik) {

        if (points.length > 2) {
            if (viewer.entities.getById("line_temp9999") != null) {
                viewer.entities.removeById("line_temp9999");
            }
            if (viewer.entities.getById("line_temp9998") != null) {
                viewer.entities.removeById("line_temp9998");
            }

            var xxx = getEncryptionPoint(points, false, 8);
            console.log(xxx);
            //if (viewer.entities.getById("line_linshi9999") != null) {
            //    viewer.entities.removeById("line_linshi9999");
            //}

            //viewer.entities.add({
            //    id: "line_linshi9999",
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
            //var xyzzz = getChanzhuang(points);
            //console.log(xyzzz);
           // viewer.zoomTo(viewer.entities.getById("line_linshi9999"), new Cesium.HeadingPitchRange(Cesium.Math.toRadians(-(parseFloat(xyzzz.qingXiang) - 180)), Cesium.Math.toRadians(parseFloat(xyzzz.qingJiao)-90)));
           // var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                var cartesian3s = [];
                var newcartesian3s = [];
                var maxHeight = Cesium.Cartographic.fromCartesian(points[0]).height;
                var minHeight = Cesium.Cartographic.fromCartesian(points[0]).height;
                var bSum = 0;
                var lSum = 0;
                var hSum = 0;
                for (var i = 0; i < points.length; i++) {
                    var cartesian3 = points[i];
                    cartesian3s.push(cartesian3);
                    var rblh = Cesium.Cartographic.fromCartesian(points[i]);
                    var blh = new Cesium.Cartesian3(rblh.latitude * 180 / Math.PI, rblh.longitude * 180 / Math.PI, rblh.height);
                    newcartesian3s.push(blh);
                    bSum += rblh.latitude * 180 / Math.PI;
                    lSum += rblh.longitude * 180 / Math.PI;
                    hSum += rblh.height;
                    if (rblh.height < minHeight) {
                        minHeight = rblh.height;
                    }
                    if (rblh.height > maxHeight) {
                        maxHeight = rblh.height;
                    }
                }


                viewer.entities.add({
                    name: "plMeasue" + NewGuidCL(),
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

                //计算面积


                var maxX = viewer.scene.cartesianToCanvasCoordinates(points[0]).x;
                var minX = viewer.scene.cartesianToCanvasCoordinates(points[0]).x;
                var maxY = viewer.scene.cartesianToCanvasCoordinates(points[0]).y;
                var minY = viewer.scene.cartesianToCanvasCoordinates(points[0]).y;
                var xSum = 0;//求一个平均点，用于定位
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

                //viewer.entities.add({
                //    name: "ptMeasue" + NewGuidCL(),
                //    position: pointcenter,
                //    point: {
                //        pixelSize: 10,
                //        color: Cesium.Color.RED,
                //        disableDepthTestDistance: Number.POSITIVE_INFINITY
                //    },

                //});

                var juli1 = Cesium.Cartesian3.distance(points[0], points[points.length - 1]);
                var juli2 = Cesium.Cartesian3.distance(points[0], pointcenter);
                var juli3 = Cesium.Cartesian3.distance(pointcenter, points[points.length - 1]);

                var p = (juli1 + juli2 + juli3) / 2;
                var mianji=Math.sqrt(p * (p - juli1) * (p - juli2) * (p - juli3));
                var sum = Cesium.Cartesian3.distance(points[0], points[points.length - 1]);
                for (var j = 0; j < points.length - 1; j++) {
                    juli1 = Cesium.Cartesian3.distance(points[j], points[j+1]);
                    juli2 = Cesium.Cartesian3.distance(points[j], pointcenter);
                    juli3 = Cesium.Cartesian3.distance(pointcenter, points[j+1]);

                    p = (juli1 + juli2 + juli3) / 2;
                    mianji = mianji + Math.sqrt(p * (p - juli1) * (p - juli2) * (p - juli3));
                    sum = sum + Cesium.Cartesian3.distance(points[j], points[j + 1]);
                }
                console.log(mianji);

                viewer.entities.add({
                    name: "pylMeasue" + NewGuidCL(),
                    position: pointcenter,
                    label: {
                        text: '面积：' + mianji.toFixed(2) + '平方米  \n  周长：' + sum.toFixed(2) + '米',
                        showBackground: true,
                        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                        font: '16px Times New Roman',
                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                        // pixelOffset: new Cesium.Cartesian2(0.0, -60),
                    }
                });

                showCeliang = " 面积:" + mianji.toFixed(2) + '平方米   ' + "\n" + " 周长:" + sum.toFixed(2) + '米';
                if (showCeliang != null) {
                    form.val("celianginfoform", {
                        "desc": showCeliang
                    });
                }
               
                points = [];
                eyepostionList = [];

                //var sendDate = {};

                //var xSume = 0;//求一个平均点，用于定位
                //var ySume = 0;
                //var zSume = 0;
                //for (var m in eyepostionList) {
                //    xSume = xSume + parseFloat(eyepostionList[m].x);
                //    ySume = ySume + parseFloat(eyepostionList[m].y);
                //    zSume = zSume + parseFloat(eyepostionList[m].z);
                //}
                //var eyecenter = new Cesium.Cartesian3(xSume / eyepostionList.length, ySume / eyepostionList.length, zSume / eyepostionList.length);
                // 最大100个点
                //var xxishu = (maxX - minX) / 10;
                //var yxishu = (maxY - minY) / 10;
                //var jimiList = [];
                //for (var x = 0; x < 11; x++) {
                //    for (var m = 0; m < 11; m++) {

                //        var temp = new Cesium.Cartesian2(minX + xxishu * x, minY + yxishu * m);//b点，加了5.
                //        if (scene.pickPosition(temp)) {
                //            jimiList.push(scene.pickPosition(temp));
                //            viewer.entities.add({
                //                name: "ptMeasue----" +x+"y"+m,// NewGuidCL(),
                //                position: scene.pickPosition(temp),
                //                point: {
                //                    pixelSize: 2,
                //                    color: Cesium.Color.YELLOW,
                //                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                //                },

                //            });
                //        }

                //    }
                //}
                //console.log(jimiList);
                ////sendDate.bpsList = JSON.stringify(points);
                ////sendDate.eyesList = JSON.stringify(eyepostionList);
                ////sendDate.spsList = JSON.stringify(jimiList);
                //var sum = Cesium.Cartesian3.distance(points[0], points[points.length - 1]);
                //for (var j = 0; j < points.length - 1; j++) {
                //    sum = sum + Cesium.Cartesian3.distance(points[j], points[j + 1]);
                //}
                //sendDate.target = JSON.stringify(pointcenter);
                ////sendDate.eye = JSON.stringify(eyepostionList[0]);
                //sendDate.eye = JSON.stringify(new Cesium.Cartesian3(viewer.camera.position.x, viewer.camera.position.y, viewer.camera.position.z));
                //sendDate.sps = JSON.stringify(jimiList);
                //sendDate.w = sum / 4;
                //sendDate.h = sum / 4;

                //sendDate.cookie = document.cookie;
                //console.log(sendDate);





             
                //$.ajax({
                //    url: servicesurl + "/api/FlzWindowInfo/getRockWindowInfo", type: "post", data: sendDate,//后台发送请求
                //    success: function (result) {


                //        layer.close(loadingceindex);
                //        //关闭
                //        var windowInfos = JSON.parse(result);
                //        console.log(windowInfos);

                //        if (windowInfos == "") {

                //            // viewer.Scene.sampleHeight();

                //        } else {

                //            console.log(windowInfos);
                //            var tempLista = {};
                //            tempLista.xyzs = JSON.stringify(points);
                //            tempLista.mw = result;

                //            //


                //            var point2sList = [];
                //            var loadingjieliindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                //            for (var i in points) {

                //            }

                //            $.ajax({
                //                url: servicesurl + "/api/FlzData/GetXYZ2sxy", type: "get", data: tempLista,
                //                success: function (res) {
                //                    layer.close(loadingjieliindex);
                //                    point2sList = JSON.parse(res);
                //                    if (point2sList.length == 0) {
                //                        layer.msg('二维坐标转换失败');
                //                        return;
                //                    }

                //                    var area = 0;

                //                    for (var i = 0; i < point2sList.length - 1; i++) {
                //                        area += (point2sList[i].x - point2sList[0].x) * (point2sList[i + 1].y - point2sList[0].y) - (point2sList[i].y - point2sList[0].y) * (point2sList[i + 1].x - point2sList[0].x);
                //                    }
                //                    area = Math.abs(area) / 2;
                //                    console.log(area);
                //                    //计算重心
                //                    viewer.entities.add({
                //                        name: "pylMeasue" + NewGuidCL(),
                //                        position: Cesium.Cartesian3.fromDegrees(lSum / points.length, bSum / points.length, hSum / points.length),
                //                        label: {
                //                            text: '面积：' + area.toFixed(2) + '平方米  \n  周长：' + sum.toFixed(2) + '米',
                //                            showBackground: true,
                //                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                //                            font: '16px Times New Roman',
                //                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                //                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                //                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                //                            // pixelOffset: new Cesium.Cartesian2(0.0, -60),
                //                        }
                //                    });

                //                    showCeliang = " 面积:" + area.toFixed(2) + '平方米   ' + "\n" + " 周长:" + sum.toFixed(2) + '米';
                //                    if (showCeliang != null) {
                //                        form.val("celianginfoform", {
                //                            "desc": showCeliang
                //                        });
                //                    }
                //                    //isRedo = true;
                //                    points = [];
                //                    eyepostionList = [];
                //                }, datatype: "json"
                //            });
                //        }

                //    }, datatype: "json"
                //});


          


           // var area = jisuarea(points);
            //var sum = Cesium.Cartesian3.distance(points[points.length - 1], points[0]);
            //for (var i = 0; i < points.length - 1; i++) {
            //    var point1 = points[i];
            //    var point2 = points[i + 1];

            //    var distance = Cesium.Cartesian3.distance(point1, point2)
            //    if (distance == NaN) {
            //        break;
            //    }
            //    else {
            //        sum += distance;
            //    }
            //}
           
            //setTimeout(() => {
            //    areaMeasure2()
            //}, 1000);
        }

    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    
};
var wPosition = [];

//方位角量测
function azimuthMeasure() {
    ClearTemp();

    isPoint = false;
    isLength = false;
    isHeight = false;
    isAraa = false;
    isAzimuth = true;
    isRedo = false;
    isPointLabel = false;
    isPolylineLabel = false;
    isPolygonLabel = false;
    isOccurrence = false;
    isWindowZiDingyi = false;

    if (isAzimuth) {
        if (handler != undefined) {
            handler.destroy();
        }

        handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

        //左击
        handler.setInputAction(function (leftclik) {
            if (isRedo) {
                ClearTemp();
                isRedo = false;
                wPosition = [];
            }

            wPosition.push(new Cesium.Cartesian2(leftclik.position.x, leftclik.position.y));

            var pickedOject = scene.pick(leftclik.position);
            if (pickedOject != undefined) {
                var xyz = scene.pickPosition(leftclik.position);
                if (xyz != undefined) {
                    var rblh = Cesium.Cartographic.fromCartesian(xyz);

                    //viewer.entities.add({
                    //    name: "ptMeasue" + NewGuid(),
                    //    position: xyz,
                    //    point: {
                    //        pixelSize: 8,
                    //        color: Cesium.Color.YELLOW
                    //    }
                    //});
                    viewer.entities.add({
                        name: "ptMeasue" + NewGuid(),
                        position: xyz,
                        point: {
                            pixelSize: 10,
                            color: Cesium.Color.YELLOW,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                        }
                    });
                    //viewer.entities.add({
                    //    name: "ptMeasue" + NewGuid(),
                    //    position: xyz,
                    //    billboard: {
                    //        image: 'image/survey/marker.png',
                    //        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    //        width: 24,
                    //        height: 24,
                    //    }
                    //});
                    points.push(xyz);

                    if (points.length == 2) {
                        var point = points[0];
                        if (false) {
                            //绘制贴模型线
                            //polylineOnModel("plMeasue" + NewGuid(), [point, xyz], 0.5, 5, Cesium.Color.WHITE);

                            viewer.entities.add({
                                name: "plMeasue" + NewGuid(),
                                polyline: {
                                    positions: [point, xyz],
                                    width: 5,
                                    arcType: Cesium.ArcType.RHUMB,
                                    material: Cesium.Color.YELLOW,
                                    show: true,
                                    clampToGround: true,
                                    classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                }
                            });
                        }
                        else {
                            //viewer.entities.add({
                            //    name: "plMeasue" + NewGuid(),
                            //    polyline: {
                            //        positions: [point, xyz],
                            //        width: 5,
                            //        material: Cesium.Color.YELLOW,
                            //    }
                            //});

                            var start = wPosition[0];
                            var end = wPosition[1];

                            var count = Math.ceil(Cesium.Cartesian2.distance(start, end) / 1);
                            var cartesians = [];
                            cartesians.push(scene.pickPosition(start));


                            for (var i = 0; i < count; ++i) {
                                var offset = i / (count - 1);
                                //cartesians[i] = Cesium.Cartesian2.lerp(start, end, offset, new Cesium.Cartesian2());
                                cartesians.push(scene.pickPosition(Cesium.Cartesian2.lerp(start, end, offset, new Cesium.Cartesian2())));
                            }

                            cartesians.push(scene.pickPosition(end));
                            //viewer.entities.add({
                            //    name: "plMeasue" + NewGuid(),
                            //    polyline: {
                            //        positions: cartesians,
                            //        width: 10,
                            //        material: Cesium.Color.YELLOW,
                            //    }
                            //});
                            viewer.entities.add({
                                name: "plMeasue" + NewGuid(),
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




                        }

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
                        else if ((rblh1.latitude < rblh2.latitude) && (rblh1.longitude < rblh2.longitude)) {
                            //r
                        }
                        else {
                            //error:不存在两点经纬度均相同的情况
                        }

                        viewer.entities.add({
                            name: "alMeasue" + NewGuid(),
                            position: Cesium.Cartesian3.fromElements((point.x + xyz.x) / 2, (point.y + xyz.y) / 2, (point.z + xyz.z) / 2),
                            label: {
                                text: '走向：' + r.toFixed(2) + '度',
                                showBackground: true,
                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                font: '16px Times New Roman',
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                disableDepthTestDistance: Number.POSITIVE_INFINITY
                            }
                        });

                        isRedo = true;
                    }
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
}
//三点法产状计算
/*
//产状计算得到倾角和倾向，使用时请以顺时针顺序选取特征点
产状计算过程：
（1）获取空间直角坐标XYZ（ECEF）
（2）选择目标坐标系原点，取其大地经度大地纬度作为转换参数
（3）转换为ENU坐标系（https://en.wikipedia.org/wiki/Geographic_coordinate_conversion）
（4）计算产状
*/
function getOccurrence() {

    ClearTemp();

    isPoint = false;
    isLength = false;
    isHeight = false;
    isAraa = false;
    isAzimuth = false;
    isRedo = false;
    isPointLabel = false;
    isPolylineLabel = false;
    isPolygonLabel = false;

    isOccurrence = true;
    isWindowZiDingyi = false;

    if (isOccurrence) {
        if (handler != undefined) {
            handler.destroy();
        }

        handler = new Cesium.ScreenSpaceEventHandler(canvas);

        //左击
        handler.setInputAction(function (leftclik) {
            if (isRedo) {
                ClearTemp();
                isRedo = false;
            }

            var pickedOject = scene.pick(leftclik.position);
            if (pickedOject != undefined) {
                var position = scene.pickPosition(leftclik.position);//返回值为空间直角坐标
                if (position != undefined) {
                    var cartesian = Cesium.Cartographic.fromCartesian(position);//返回BLH

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
                    }
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

                    if (points.length == 3) {
                        var cartesian3s = [];
                        //var newcartesian3s = [];
                        var bSum = 0;
                        var lSum = 0;
                        var hSum = 0;
                        var minx = points[0].x;
                        var miny = points[0].y;
                        var minz = points[0].z;
                        var maxHeight = Cesium.Cartographic.fromCartesian(points[0]).height;
                        var minHeight = Cesium.Cartographic.fromCartesian(points[0]).height;
                        for (var i = 0; i < points.length; i++) {
                            var cartesian3 = points[i];
                            cartesian3s.push(cartesian3);
                            if (points[i].x < minx) {
                                minx = points[i].x;
                            }
                            if (points[i].y < miny) {
                                miny = points[i].y;
                            }
                            if (points[i].z < minz) {
                                minz = points[i].z;
                            }
                            var rblh = Cesium.Cartographic.fromCartesian(points[i]);
                            bSum += rblh.latitude * 180 / Math.PI;
                            lSum += rblh.longitude * 180 / Math.PI;
                            hSum += rblh.height;
                            if (rblh.height > maxHeight) {
                                maxHeight = rblh.height;
                            }
                            if (rblh.height < minHeight) {
                                minHeight = rblh.height;
                            }
                        }
                        var bAvg = bSum * Math.PI / 180 / points.length;
                        var lAvg = lSum * Math.PI / 180 / points.length;
                        var hAvg = hSum / points.length;

                        var opblh = new Cesium.Cartographic(lAvg, bAvg, hAvg);
                        //转换后的坐标原点
                        var opxyz = Cesium.Cartesian3.fromDegrees(opblh.longitude, opblh.latitude, opblh.height);



                        viewer.entities.add({
                            name: "plMeasue" + NewGuid(),
                            polyline: {
                                positions: [points[0], points[2]],
                                width: 2,
                                arcType: Cesium.ArcType.RHUMB,
                                material: Cesium.Color.RED,
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.RED,
                                }),
                            }
                        });
                        //viewer.entities.add({
                        //    name: "ptOccurrence" + NewGuid(),
                        //    polygon: {
                        //        hierarchy: {
                        //            positions: points
                        //        },
                        //        material: Cesium.Color.ORANGE.withAlpha(0.5),
                        //    }
                        //});


                        //var ccc = 0;     调试用
                        var cartesian3f = [];
                        //cartesian3f = cartesian3s; //调试用
                        for (var i = 0; i < cartesian3s.length; i++) {
                            var newx = -Math.sin(lAvg) * (cartesian3s[i].x - opxyz.x) + Math.cos(lAvg) * (cartesian3s[i].y - opxyz.y);
                            var newy = -Math.sin(bAvg) * Math.cos(lAvg) * (cartesian3s[i].x - opxyz.x) - Math.sin(bAvg) * Math.sin(lAvg) * (cartesian3s[i].y - opxyz.y) + Math.cos(bAvg) * (cartesian3s[i].z - opxyz.z);
                            var newz = Math.cos(bAvg) * Math.cos(lAvg) * (cartesian3s[i].x - opxyz.x) + Math.cos(bAvg) * Math.sin(lAvg) * (cartesian3s[i].y - opxyz.y) + Math.sin(bAvg) * (cartesian3s[i].z - opxyz.z);
                            var cartesian33 = new Cesium.Cartesian3(newx, newy, newz);
                            //ccc = newx;
                            cartesian3f.push(cartesian33);
                        }
                        console.log(cartesian3s, cartesian3f);

                        //求取产状要素
                        var qingXiang = 0;
                        var qingJiao = 0;
                        //设拟合面的表达式为Ax+By+Cz+D = 0
                        var A = (cartesian3f[1].y - cartesian3f[0].y) * (cartesian3f[2].z - cartesian3f[0].z) - (cartesian3f[1].z - cartesian3f[0].z) * (cartesian3f[2].y - cartesian3f[0].y);
                        var B = (cartesian3f[1].z - cartesian3f[0].z) * (cartesian3f[2].x - cartesian3f[0].x) - (cartesian3f[1].x - cartesian3f[0].x) * (cartesian3f[2].z - cartesian3f[0].z);
                        var C = (cartesian3f[1].x - cartesian3f[0].x) * (cartesian3f[2].y - cartesian3f[0].y) - (cartesian3f[1].y - cartesian3f[0].y) * (cartesian3f[2].x - cartesian3f[0].x);

                        var nx = A / Math.sqrt(A * A + B * B + C * C);
                        var ny = B / Math.sqrt(A * A + B * B + C * C);
                        var nz = C / Math.sqrt(A * A + B * B + C * C);

                        if (nz == 0) {
                            qingJiao = 0.5 * Math.PI;
                            if (nx < 0) {
                                if (ny > 0) {
                                    qingXiang = 2 * Math.PI - Math.acos(ny / Math.sqrt(nx * nx + ny * ny));
                                }
                                else {
                                    qingXiang = Math.PI + Math.acos(-ny / Math.sqrt(nx * nx + ny * ny));
                                }

                            }
                            else {
                                if (ny > 0) {
                                    qingXiang = Math.acos(ny / Math.sqrt(nx * nx + ny * ny));
                                }
                                else {
                                    qingXiang = 0.5 * Math.PI + Math.acos(-ny / Math.sqrt(nx * nx + ny * ny));
                                }

                            }
                        }
                        else if (nz > 0) {
                            qingJiao = Math.acos(nz);
                            if (nx < 0) {
                                if (ny > 0) {
                                    qingXiang = 2 * Math.PI - Math.acos(ny / Math.sqrt(nx * nx + ny * ny));
                                }
                                else {
                                    qingXiang = Math.PI + Math.acos(-ny / Math.sqrt(nx * nx + ny * ny));
                                }

                            }
                            else {
                                if (ny > 0) {
                                    qingXiang =  Math.acos(ny / Math.sqrt(nx * nx + ny * ny));
                                }
                                else {
                                    qingXiang = 0.5 * Math.PI + Math.acos(-ny / Math.sqrt(nx * nx + ny * ny));
                                }

                            }
                        }
                        else {
                            qingJiao = Math.acos(-nz);
                            if (nx < 0) {
                                if (ny > 0) {
                                    qingXiang = 0.5 * Math.PI + Math.acos(ny / Math.sqrt(nx * nx + ny * ny));
                                }
                                else {
                                    qingXiang = Math.acos(-ny / Math.sqrt(nx * nx + ny * ny));
                                }

                            }
                            else {
                                if (ny > 0) {
                                    qingXiang = Math.PI + Math.acos(ny / Math.sqrt(nx * nx + ny * ny));
                                }
                                else {
                                    qingXiang = 2 * Math.PI - Math.acos(-ny / Math.sqrt(nx * nx + ny * ny));
                                }

                            }
                        }
                        qingXiang = qingXiang * 180 / Math.PI;
                        qingJiao = qingJiao * 180 / Math.PI;


                        //计算重心
                        viewer.entities.add({
                            name: "ptOccurrence" + NewGuid(),
                            //position: points[0],
                            position: Cesium.Cartesian3.fromDegrees(lSum / points.length, bSum / points.length, hSum / points.length),
                            label: {
                                text: '倾角为' + qingJiao.toFixed(2) + '度 \n 倾向为' + qingXiang.toFixed(2) + '度',
                                font: '16px Times New Roman',
                                showBackground: true,
                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY
                            }
                        });
                        showCeliang = '倾角为' + qingJiao.toFixed(2) + '度， \n倾向为' + qingXiang.toFixed(2) + '度';
                        if (showCeliang != null) {
                            form.val("celianginfoform", {
                                "desc": showCeliang
                            });
                        }
                        isRedo = true;
                        points = [];
                    }

                }

            }

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        if (isMobile.any()) {
            //双指
            handler.setInputAction(function (pinch) {
                isRedo = true;
                clearAll();
            }, Cesium.ScreenSpaceEventType.PINCH_START);
        }
        else {
            //右击
            handler.setInputAction(function (rightclik) {
                isRedo = true;
                clearAll();
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }

    }

}

/*
 *获取加密点 
 * positList 点数据组
 * modelFlag 地形or模型    模型--true  地形--false
 * num       加密的密度
 */
function getEncryptionPoint(positList,modelFlag,num) {
        if (viewer.entities.getById("line_linshi9999") != null) {
                 viewer.entities.removeById("line_linshi9999");
             }

            viewer.entities.add({
                id: "line_linshi9999",
                polyline: {
                    positions: positList,
                    width: 2,
                    arcType: Cesium.ArcType.RHUMB,
                    material: Cesium.Color.RED,
                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                        color: Cesium.Color.RED,
                    }),
                }
            });
            var xyzzz = getChanzhuang(positList);
            viewer.zoomTo(viewer.entities.getById("line_linshi9999"), new Cesium.HeadingPitchRange(Cesium.Math.toRadians(-(parseFloat(xyzzz.qingXiang) - 180)), Cesium.Math.toRadians(parseFloat(xyzzz.qingJiao)-90)));
            setTimeout(() => {
                //平面坐标
                var maxX = viewer.scene.cartesianToCanvasCoordinates(positList[0]).x;
                var minX = viewer.scene.cartesianToCanvasCoordinates(positList[0]).x;
                var maxY = viewer.scene.cartesianToCanvasCoordinates(positList[0]).y;
                var minY = viewer.scene.cartesianToCanvasCoordinates(positList[0]).y;
                for (var i in positList) {
                    if (viewer.scene.cartesianToCanvasCoordinates(positList[i]).x > maxX) {
                        maxX = viewer.scene.cartesianToCanvasCoordinates(positList[i]).x;
                    }
                    if (viewer.scene.cartesianToCanvasCoordinates(positList[i]).x < minX) {
                        minX = viewer.scene.cartesianToCanvasCoordinates(positList[i]).x;
                    }
                    if (viewer.scene.cartesianToCanvasCoordinates(positList[i]).y > maxY) {
                        maxY = viewer.scene.cartesianToCanvasCoordinates(positList[i]).y;
                    }
                    if (viewer.scene.cartesianToCanvasCoordinates(positList[i]).y < minY) {
                        minY = viewer.scene.cartesianToCanvasCoordinates(positList[i]).y;
                    }

                }
                var jiamishu=parseInt(num);
                var xxishu = (maxX - minX) / jiamishu;
                var yxishu = (maxY - minY) / jiamishu;
                var jimiList = [];
                for (var x = 0; x <= jiamishu; x++) {
                    for (var m = 0; m <= jiamishu; m++) {

                        var temp = new Cesium.Cartesian2(minX + xxishu * x, minY + yxishu * m);//b点，加了5.

                        if (modelFlag) {//地形测量
                            
                            if (scene.pick(temp)) {
                                jimiList.push(scene.pick(temp));
                                //viewer.entities.add({
                                //    name: "ptMeasue----" + x + "y" + m,// NewGuidCL(),
                                //    position: scene.pick(temp),
                                //    point: {
                                //        pixelSize: 2,
                                //        color: Cesium.Color.YELLOW,
                                //        disableDepthTestDistance: Number.POSITIVE_INFINITY
                                //    },

                                //});
                            }
                        } else {
                            if (scene.pickPosition(temp)) {

                                jimiList.push(scene.pickPosition(temp));

                                //viewer.entities.add({
                                //    name: "ptMeasue----" + x + "y" + m,// NewGuidCL(),
                                //    position: scene.pickPosition(temp),
                                //    point: {
                                //        pixelSize: 2,
                                //        color: Cesium.Color.YELLOW,
                                //        disableDepthTestDistance: Number.POSITIVE_INFINITY
                                //    },

                                //});
                            }
                        }

                        

                    }
                }
                
                if (viewer.entities.getById("line_linshi9999") != null) {
                    viewer.entities.removeById("line_linshi9999");
                }
                console.log(jimiList);
                return jimiList;
                
            }, 300);

}
/*
 *产状
 *positList 点数据组
 */
function getChanzhuang(positList) {
    points = positList;
    var cartesian3s = [];
    //var newcartesian3s = [];
    var bSum = 0;
    var lSum = 0;
    var hSum = 0;
    var minx = points[0].x;
    var miny = points[0].y;
    var minz = points[0].z;
    var maxHeight = Cesium.Cartographic.fromCartesian(points[0]).height;
    var minHeight = Cesium.Cartographic.fromCartesian(points[0]).height;
    for (var i = 0; i < points.length; i++) {
        var cartesian3 = points[i];
        cartesian3s.push(cartesian3);
        if (points[i].x < minx) {
            minx = points[i].x;
        }
        if (points[i].y < miny) {
            miny = points[i].y;
        }
        if (points[i].z < minz) {
            minz = points[i].z;
        }
        var rblh = Cesium.Cartographic.fromCartesian(points[i]);
        bSum += rblh.latitude * 180 / Math.PI;
        lSum += rblh.longitude * 180 / Math.PI;
        hSum += rblh.height;
        if (rblh.height > maxHeight) {
            maxHeight = rblh.height;
        }
        if (rblh.height < minHeight) {
            minHeight = rblh.height;
        }
    }
    var bAvg = bSum * Math.PI / 180 / points.length;
    var lAvg = lSum * Math.PI / 180 / points.length;
    var hAvg = hSum / points.length;

    var opblh = new Cesium.Cartographic(lAvg, bAvg, hAvg);
    //转换后的坐标原点
    var opxyz = Cesium.Cartesian3.fromDegrees(opblh.longitude, opblh.latitude, opblh.height);
    //var ccc = 0;     调试用
    var cartesian3f = [];
    //cartesian3f = cartesian3s; //调试用
    for (var i = 0; i < cartesian3s.length; i++) {
        var newx = -Math.sin(lAvg) * (cartesian3s[i].x - opxyz.x) + Math.cos(lAvg) * (cartesian3s[i].y - opxyz.y);
        var newy = -Math.sin(bAvg) * Math.cos(lAvg) * (cartesian3s[i].x - opxyz.x) - Math.sin(bAvg) * Math.sin(lAvg) * (cartesian3s[i].y - opxyz.y) + Math.cos(bAvg) * (cartesian3s[i].z - opxyz.z);
        var newz = Math.cos(bAvg) * Math.cos(lAvg) * (cartesian3s[i].x - opxyz.x) + Math.cos(bAvg) * Math.sin(lAvg) * (cartesian3s[i].y - opxyz.y) + Math.sin(bAvg) * (cartesian3s[i].z - opxyz.z);
        var cartesian33 = new Cesium.Cartesian3(newx, newy, newz);
        //ccc = newx;
        cartesian3f.push(cartesian33);
    }

    //求取产状要素
    var qingXiang = 0;
    var qingJiao = 0;
    //设拟合面的表达式为Ax+By+Cz+D = 0
    var A = (cartesian3f[1].y - cartesian3f[0].y) * (cartesian3f[2].z - cartesian3f[0].z) - (cartesian3f[1].z - cartesian3f[0].z) * (cartesian3f[2].y - cartesian3f[0].y);
    var B = (cartesian3f[1].z - cartesian3f[0].z) * (cartesian3f[2].x - cartesian3f[0].x) - (cartesian3f[1].x - cartesian3f[0].x) * (cartesian3f[2].z - cartesian3f[0].z);
    var C = (cartesian3f[1].x - cartesian3f[0].x) * (cartesian3f[2].y - cartesian3f[0].y) - (cartesian3f[1].y - cartesian3f[0].y) * (cartesian3f[2].x - cartesian3f[0].x);

    var nx = A / Math.sqrt(A * A + B * B + C * C);
    var ny = B / Math.sqrt(A * A + B * B + C * C);
    var nz = C / Math.sqrt(A * A + B * B + C * C);

    if (nz == 0) {
        qingJiao = 0.5 * Math.PI;
        if (nx < 0) {
            qingXiang = 2 * Math.PI - Math.acos(ny / Math.sqrt(nx * nx + ny * ny));
        }
        else {
            qingXiang = Math.acos(ny / Math.sqrt(nx * nx + ny * ny));
        }
    }
    else if (nz > 0) {
        qingJiao = Math.acos(nz);
        if (nx < 0) {
            qingXiang = 2 * Math.PI - Math.acos(ny / Math.sqrt(nx * nx + ny * ny));
        }
        else {
            qingXiang = Math.acos(ny / Math.sqrt(nx * nx + ny * ny));
        }
    }
    else {
        qingJiao = Math.acos(-nz);
        if (nx < 0) {
            qingXiang = 2 * Math.PI - Math.acos(-ny / Math.sqrt(nx * nx + ny * ny));
        }
        else {
            qingXiang = Math.acos(-ny / Math.sqrt(nx * nx + ny * ny));
        }
    }
    qingXiang = qingXiang * 180 / Math.PI;
    qingJiao = qingJiao * 180 / Math.PI;
    var tenp = {};
    tenp.qingXiang = qingXiang;
    tenp.qingJiao = qingJiao;
    return tenp;
}


//长度量测
function lenMeasure() {
    ClearTemp();

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
                linepoints = [];
                points = [];
            }

            var pickedOject = scene.pick(leftclik.position);
            if (pickedOject != undefined) {
                var position = scene.pickPosition(leftclik.position);
                if (position != undefined) {
                    if (Cesium.defined(position)) {
                        
                        points.push(position);

                        viewer.entities.add({
                            name: "ptMeasue" + NewGuid(),
                            position: position,
                            point: {
                                pixelSize: 10,
                                color: Cesium.Color.YELLOW,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY
                            }
                        });

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

                    }
                }
            }

        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        if (isMobile.any()) {//双指
            handler.setInputAction(function (pinch) {
                if (points.length > 1) {
                    //删除
                    if (viewer.entities.getById("line_temp9999") != null) {
                        viewer.entities.removeById("line_temp9999");
                    }


                    var sum = 0;
                    for (var j = 0; j < points.length-1; j++) {
                        sum = sum + Cesium.Cartesian3.distance(points[j], points[j + 1]);
                    }

                    viewer.entities.add({
                        name: "pylMeasue" + NewGuidCL(),
                        position: points[0],
                        label: {
                            text:  '长度：' + sum.toFixed(2) + '米',
                            showBackground: true,
                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                            font: '20px Times New Roman',
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                        }
                    });
                }
                points = [];
            }, Cesium.ScreenSpaceEventType.PINCH_START);
        }
        else {//右击
            handler.setInputAction(function (rightclik) {
                if (points.length > 1) {
                    //删除
                    if (viewer.entities.getById("line_temp9999") != null) {
                        viewer.entities.removeById("line_temp9999");
                    }
                    var sum = 0;
                    for (var j = 0; j < points.length-1; j++) {
                        sum = sum + Cesium.Cartesian3.distance(points[j], points[j + 1]);
                    }

                    viewer.entities.add({
                        name: "pylMeasue" + NewGuidCL(),
                        position: points[0],
                        label: {
                            text: '长度：' + sum.toFixed(2) + '米',
                            showBackground: true,
                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                            font: '20px Times New Roman',
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                        }
                    });
                    points = [];
                }

            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }
    }
};

var celinghtml2 = "	<div class='layui-tab layui-tab-brief' lay-filter='celianglayer'>								"
    + "		<ul class='layui-tab-title'>							"
    + "			<li lay-id='111' class='layui-this' style='width:30%;padding-top: 10px;'>地形测量</li>						"
    + "			<li lay-id='222' style='width:30%;padding-top: 10px;'>模型测量</li>						"
    + "		</ul>							"
    + "		<div class='layui-tab-content'>							"
    + "			<div class='layui-tab-item layui-show'>						"
    + "  <form class='layui-form' style='margin-top:5px;margin-right:15px;' lay-filter='celianginfoform'>                                                                                                              "
    + "	 <div class=' class='layui-form-item layui-form-tex'>                                                      "
    + "	                                                                                       "
    + "	   <label class='layui-form-label'>地形测量</label>                                                       "
    + "	   <div class='layui-input-block' style='white-space':'pre'>                                                                                  "
    + "		<textarea name='desc'  class='layui-textarea'></textarea>   "
    + "	   </div>                                                                                                              "
    + "	                                                                                                                "
    + "	 </div>                                                                                                                "
   + "	</form>                                                                                                                 "

    + "			</div>						"
    + "			<div class='layui-tab-item'>						"
    + "  <form class='layui-form' style='margin-top:5px;margin-right:15px;' lay-filter='celianginfoform'>                                                                                                              "
    + "	 <div class=' class='layui-form-item layui-form-tex'>                                                      "
    + "	                                                                                       "
    + "	   <label class='layui-form-label'>模型测量</label>                                                       "
    + "	   <div class='layui-input-block' style='white-space':'pre'>                                                                                  "
    + "		<textarea name='desc'  class='layui-textarea'></textarea>   "
    + "	   </div>                                                                                                              "
    + "	                                                                                                                "
    + "	 </div>                                                                                                                "
    + "	 <div class=' class='layui-form-item layui-form-tex'>                                                      "
    + "	                                                                                       "
    + "	   <label class='layui-form-label'>测量方式</label>                                                       "
    + "	   <div class='layui-input-block' style='white-space':'pre'>                                                                                  "
    + "		<input name='celiangfangfa'  class='layui-input' readonly></input>   "
    + "	   </div>                                                                                                              "
    + "	                                                                                                                "
    + "	 </div>                                                                                                                "
    + "	</form>                                                                                                                 "
    + "<div class='layui-btn-container' style='margin-top:15px;text-align:center '>                          "
    + "  <button type='button' class='layui-btn layui-btn-primary layui-btn-sm' onclick='pointMeasure2()'>坐标</button>"
    + "  <button type='button' class='layui-btn layui-btn-primary layui-btn-sm' onclick='heightMeasure()'>距离</button>"
    + "  <button type='button' class='layui-btn layui-btn-primary layui-btn-sm' onclick='areaMeasure2()'>面积</button>"
    //+ "  <button type='button' class='layui-btn layui-btn-primary layui-btn-sm' onclick='pointMeasure2()'>体积</button>"
    + "</div>"
    + "<div  style='text-align:center'>                          "
    + "  <button type='button' style='width:60%' class='layui-btn layui-btn-fluid layui-btn-danger' onclick='ClearCeliangTemp()'>清除</button>"

    + "</div>"
    + "			</div>						"
    + "		</div>							"
    + "	</div>								";
var celinghtml = "	<div class='layui-tab layui-tab-brief' lay-filter='celianglayer'>								"
    + "		<ul class='layui-tab-title'>							"
    + "			<li lay-id='222' class='layui-this' style='width:30%;padding-top: 10px;' >模型测量</li>						"
    + "			<li lay-id='111' style='width:30%;padding-top: 10px;' >地形测量</li>						"

    + "		</ul>							"
    + "		<div class='layui-tab-content'>							"
    + "			<div class='layui-tab-item layui-show'>						"
    + "			</div>						"

    + "			<div class='layui-tab-item'>						"
    + "			</div>						"

            + "  <form class='layui-form' style='margin-top:5px;margin-right:15px;' lay-filter='celianginfoform'>                                                                                                              "
            + "	 <div class=' class='layui-form-item layui-form-tex'>                                                      "
            + "	                                                                                       "
            + "	   <label class='layui-form-label'>测量明细</label>                                                       "
            + "	   <div class='layui-input-block' style='white-space':'pre'>                                                                                  "
            + "		<textarea name='desc'  class='layui-textarea'></textarea>   "
            + "	   </div>                                                                                                              "
            + "	                                                                                                                "
            + "	 </div>                                                                                                                "
            + "	 <div class=' class='layui-form-item layui-form-tex'>                                                      "
            + "	                                                                                       "
            + "	   <label class='layui-form-label'>测量方式</label>                                                       "
            + "	   <div class='layui-input-block' style='white-space':'pre'>                                                                                  "
            + "		<input name='celiangfangfa'  class='layui-input' readonly></input>   "
            + "	   </div>                                                                                                              "
            + "	                                                                                                                "
            + "	 </div>                                                                                                                "
            + "	</form>                                                                                                                 "
            + "<div class='layui-btn-container' style='margin-top:15px;text-align:center '>                          "
            + "  <button type='button' class='layui-btn layui-btn-primary layui-btn-sm' onclick='pointMeasure2()'>坐标</button>"
            + "  <button type='button' class='layui-btn layui-btn-primary layui-btn-sm' onclick='heightMeasure()'>距离</button>"
            + "  <button type='button' class='layui-btn layui-btn-primary layui-btn-sm' onclick='areaMeasure2()'>面积</button>"
            //+ "  <button type='button' class='layui-btn layui-btn-primary layui-btn-sm' onclick='pointMeasure2()'>体积</button>"
            + "</div>"
            + "<div  style='text-align:center'>                          "
            + "  <button type='button' style='width:60%' class='layui-btn layui-btn-fluid layui-btn-danger' onclick='ClearCeliangTemp()'>清除</button>"

            + "</div>"

    + "		</div>							"
    + "	</div>								";
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
    if (viewer.entities.getById("line_linshi9999") != null) {
        viewer.entities.removeById("line_linshi9999");
    }
    form.val("celianginfoform", {
        "desc": "",
        "celiangfangfa": "请选择测量方法"
    });
    if (handler != undefined) {
        handler.destroy();
    }
    points = [];
}
function jisuarea1(postList) {
    var cartesian3s = [];
    var newcartesian3s = [];
    var maxHeight = 0;
    var minHeight = 2000;
    for (var i = 0; i < postList.length; i++) {
        var cartesian3 = postList[i];
        cartesian3s.push(cartesian3);
        var rblh = Cesium.Cartographic.fromCartesian(postList[i]);
        var blh = new Cesium.Cartesian3(rblh.latitude * 180 / Math.PI, rblh.longitude * 180 / Math.PI, rblh.height);
        newcartesian3s.push(blh);
        if (rblh.height < minHeight) {
            minHeight = rblh.height;
        }
        if (rblh.height > maxHeight) {
            maxHeight = rblh.height;
        }
    }
    //计算面积
    var cartesian2s = [];
    var cartesian2sb = [];
    for (var i = 0; i < newcartesian3s.length; i++) {
        var cartesian3 = Cesium.Cartesian3.fromDegrees(newcartesian3s[i].y, newcartesian3s[i].x, maxHeight);//转到一个平面
        var cartesian2 = new Cesium.Cartesian2(cartesian3.x, cartesian3.y);
        cartesian2s.push(cartesian2);
        cartesian2sb.push(new Cesium.Cartesian2(postList[i].x, postList[i].y));

    }
    cartesian2s.push(cartesian2s[0]);
    var area = 0;
    for (var i = 0; i < cartesian2s.length - 1; i++) {
        area += (cartesian2s[i].x - cartesian2s[0].x) * (cartesian2s[i + 1].y - cartesian2s[0].y) - (cartesian2s[i].y - cartesian2s[0].y) * (cartesian2s[i + 1].x - cartesian2s[0].x);
    }
    area = Math.abs(area);

    var areacartesian2sb = 0;
    for (var i = 0; i < cartesian2sb.length - 1; i++) {
        areacartesian2sb += (cartesian2sb[i].x - cartesian2sb[0].x) * (cartesian2sb[i + 1].y - cartesian2sb[0].y) - (cartesian2sb[i].y - cartesian2sb[0].y) * (cartesian2sb[i + 1].x - cartesian2sb[0].x);
    }
    areacartesian2sb = Math.abs(areacartesian2sb);

    var sum = Cesium.Cartesian3.distance(postList.length - 1, postList[0]);
    for (var i = 0; i < postList.length - 1; i++) {
        var point1 = postList[i];
        var point2 = postList[i + 1];

        var distance = Cesium.Cartesian3.distance(point1, point2)
        if (distance == NaN) {
            break;
        }
        else {
            sum += distance;
        }
    }
    return area;
}

function jisuarea(postList) {
    var cartesian2s = [];
    for (var i = 0; i < postList.length; i++) {
        var rblh = Cesium.Cartographic.fromCartesian(postList[i]);
        var xy = bl2xy(rblh.latitude * 180 / Math.PI, rblh.longitude * 180 / Math.PI, 6378137.0, 1 / 298.257223563, 3, 108, false);
        console.log(xy);
        if (i == 0) {
            
        }
        var cartesian2 = new Cesium.Cartesian2(xy.x, xy.y);
        cartesian2s.push(cartesian2);
    }
    //计算面积
    cartesian2s.push(cartesian2s[0]);
    var area = 0;
    for (var i = 0; i < cartesian2s.length - 1; i++) {
        area += (cartesian2s[i].x - cartesian2s[0].x) * (cartesian2s[i + 1].y - cartesian2s[0].y) - (cartesian2s[i].y - cartesian2s[0].y) * (cartesian2s[i + 1].x - cartesian2s[0].x);
    }
    area = Math.abs(area)/2;

    //var areacartesian2sb = 0;
    //for (var i = 0; i < cartesian2sb.length - 1; i++) {
    //    areacartesian2sb += (cartesian2sb[i].x - cartesian2sb[0].x) * (cartesian2sb[i + 1].y - cartesian2sb[0].y) - (cartesian2sb[i].y - cartesian2sb[0].y) * (cartesian2sb[i + 1].x - cartesian2sb[0].x);
    //}
    //areacartesian2sb = Math.abs(areacartesian2sb);

    //var sum = Cesium.Cartesian3.distance(postList.length - 1, postList[0]);
    //for (var i = 0; i < postList.length - 1; i++) {
    //    var point1 = postList[i];
    //    var point2 = postList[i + 1];

    //    var distance = Cesium.Cartesian3.distance(point1, point2)
    //    if (distance == NaN) {
    //        break;
    //    }
    //    else {
    //        sum += distance;
    //    }
    //}
    return area;
}
var dingWeiform = "<form class='layui-form' style='margin-top:5px;margin-right:25px;' lay-filter='upddingWeiform'>                                                                         "
    + "	<div class='layui-form-item' style='margin-top:15px;margin-right:5px;'>                                                                                               "
    + "		<div class='layui-row'>                                                                                                                                           "
    + "			<div class='layui-col-md6'>                                                                                                                                   "
    + "				<div class='grid-demo grid-demo-bg1'>                                                                                                                     "
    + "					<label class='layui-form-label'>经度</label>                                                                                                        "
    + "					<div class='layui-input-block'>                                                                                                                       "
    + "						<input type='text' name='L' lay-verify='number' autocomplete='off'  class='layui-input' style='width:160px;'  />          "
    + "					</div>                                                                                                                                                "
    + "				</div>                                                                                                                                                    "
    + "			</div>                                                                                                                                                        "
    + "			<div class='layui-col-md6' style='margin-top:15px;margin-right:5px;'>                                                                                         "
    + "				<div class='grid-demo'>                                                                                                                                   "
    + "					<label class='layui-form-label'>纬度</label>                                                                                                          "
    + "					<div class='layui-input-block'>                                                                                                                       "
    + "						<input type='text' name='B' lay-verify='number' autocomplete='off'   class='layui-input' style='width:160px;'  />           "
    + "					</div>                                                                                                                                                "
    + "				</div>                                                                                                                                                    "
    + "			</div>                                                                                                                                                        "
    + "			<div class='layui-col-md6' style='margin-top:15px;margin-right:5px;'>                                                                                         "
    + "				<div class='grid-demo'>                                                                                                                                   "
    + "					<label class='layui-form-label'>高程</label>                                                                                                          "
    + "					<div class='layui-input-block'>                                                                                                                       "
    + "						<input type='text' name='H' lay-verify='number' autocomplete='off'   class='layui-input' style='width:160px;'  />           "
    + "					</div>                                                                                                                                                "
    + "				</div>                                                                                                                                                    "
    + "			</div>                                                                                                                                                        "
    + "		</div>                                                                                                                                                               "
    + "	</div>                                                                                                                                                                   "
    + "<div class='layui-form-item' style='margin-top:15px'>                                                                           "
    + "	<div style='position:absolute;right:15px;'>                                                                                 "
    + "		<button type='submit' class='layui-btn' lay-submit='' lay-filter='dingWeiinfosubmit' style='width:100px'>定位</button> "
    + "	</div>                                                                                                                        "
    + "</div>                                                                                                                            "
    + "</form>     ";
var modelJiaMiform = "<form class='layui-form' style='margin-top:5px;margin-right:25px;' lay-filter='updModelJiaMiform'>                                                                         "
    + "	<div class='layui-form-item' style='margin-top:15px;margin-right:5px;'>                                                                                               "
    + "		<div class='layui-row'>                                                                                                                                           "
    + "			<div class='layui-col-md6'>                                                                                                                                   "
    + "				<div class='grid-demo grid-demo-bg1'>                                                                                                                     "
    + "					<label class='layui-form-label'>起点X</label>                                                                                                        "
    + "					<div class='layui-input-block'>                                                                                                                       "
    + "						<input type='text' name='startx' lay-verify='number' autocomplete='off'  class='layui-input' style='width:160px;'  />          "
    + "					</div>                                                                                                                                                "
    + "				</div>                                                                                                                                                    "
    + "			</div>                                                                                                                                                        "
    + "			<div class='layui-col-md6' style='margin-top:15px;margin-right:5px;'>                                                                                         "
    + "				<div class='grid-demo'>                                                                                                                                   "
    + "					<label class='layui-form-label'>起点Y</label>                                                                                                          "
    + "					<div class='layui-input-block'>                                                                                                                       "
    + "						<input type='text' name='starty' lay-verify='number' autocomplete='off'   class='layui-input' style='width:160px;'  />           "
    + "					</div>                                                                                                                                                "
    + "				</div>                                                                                                                                                    "
    + "			</div>                                                                                                                                                        "
    + "			<div class='layui-col-md6' style='margin-top:15px;margin-right:5px;'>                                                                                         "
    + "				<div class='grid-demo'>                                                                                                                                   "
    + "					<label class='layui-form-label'>终点X</label>                                                                                                          "
    + "					<div class='layui-input-block'>                                                                                                                       "
    + "						<input type='text' name='endx' lay-verify='number' autocomplete='off'   class='layui-input' style='width:160px;'  />           "
    + "					</div>                                                                                                                                                "
    + "				</div>                                                                                                                                                    "
    + "			</div>                                                                                                                                                        "
    + "			<div class='layui-col-md6' style='margin-top:15px;margin-right:5px;'>                                                                                         "
    + "				<div class='grid-demo'>                                                                                                                                   "
    + "					<label class='layui-form-label'>终点Y</label>                                                                                                          "
    + "					<div class='layui-input-block'>                                                                                                                       "
    + "						<input type='text' name='endy' lay-verify='number' autocomplete='off'   class='layui-input' style='width:160px;'  />           "
    + "					</div>                                                                                                                                                "
    + "				</div>                                                                                                                                                    "
    + "			</div>                                                                                                                                                        "
    + "			<div class='layui-col-md6' style='margin-top:15px;margin-right:5px;'>                                                                                         "
    + "				<div class='grid-demo'>                                                                                                                                   "
    + "					<label class='layui-form-label'>结果</label>                                                                                                          "
    + "					<div class='layui-input-block'>                                                                                                                       "
    + "						<textarea type='text' name='result' autocomplete='off' placeholder='请输入' style='width:260px'  class='layui-textarea' ></textarea>          "
    + "					</div>                                                                                                                                                "
    + "				</div>                                                                                                                                                    "
    + "			</div>                                                                                                                                                        "
    + "		</div>                                                                                                                                                               "
    + "	</div>                                                                                                                                                                   "
    + "<div class='layui-form-item' style='margin-top:15px'>                                                                           "
    + "	<div style='position:absolute;right:15px;'>                                                                                 "
    + "		<button type='submit' class='layui-btn' lay-submit='' lay-filter='modelJiaMiinfosubmit' style='width:100px'>解算</button> "
    + "	</div>                                                                                                                        "
    + "</div>                                                                                                                            "
    + "</form>     ";
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
function dispalyPosition() {

   
    //console.log(tempList);

   
    //for (var i in jsondata.features) {
    //    var featurepos = [];
    //    for (var j in jsondata.features[i].geometry.paths[0]) {
    //        var lnh = xy2bl(jsondata.features[i].geometry.paths[0][j][0], jsondata.features[i].geometry.paths[0][j][1], 6378137.0, 1 / 298.257223563, 3, 108, false);
    //        featurepos.push(lnh.l);
    //        featurepos.push(lnh.b);
    //    }

    //    viewer.entities.add(new Cesium.Entity({
    //        id: "jzr" + i,
    //        polyline: {
    //            positions: Cesium.Cartesian3.fromDegreesArray(featurepos),
    //            width: 2,
    //            arcType: Cesium.ArcType.RHUMB,
    //            material: Cesium.Color.AQUA,
    //            show: true,
    //            clampToGround: true,
    //            classificationType: Cesium.ClassificationType.BOTH,
    //        },
    //    }));
    //    featurepos = [];
    //}
    
    ClearCeliangTemp();
    // 展示测窗的四个点
    //for (var i in CC175ListXiaMian) {
     
    //    var xxxxx = CC175ListXiaMian[i].geometry.paths[0];
    //    for (var j in xxxxx) {
    //        var lb = xy2bl(xxxxx[j][0], xxxxx[j][1], 6378137.0, 1 / 298.257223563, 3, 108, false);
    //        tempList.push(new Cesium.Cartesian3.fromDegrees(lb.l, lb.b, 0));
    //        if (j != 4) {
    //            viewer.entities.add({
    //                name: "plMeasu22e" + NewGuidCL(),
    //                position: Cesium.Cartesian3.fromDegrees(lb.l, lb.b),
    //                billboard: {
    //                    image: '../../Resources/img/map/marker.png',
    //                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    //                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    //                    width: 6,
    //                    height: 6,
    //                }
    //            });
    //        }
           
    //    }
   


    //}
    //return;
    if (dingWeilayerindex!=null) {
        layer.msg('已打开定位窗口');
        return;
    }
    dingWeilayerindex = layer.open({
        type: 1
        , title: ['定位', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['300px', '350px']
        , shade: 0
        , offset: ['85px', '260px']
        , closeBtn: 1
        , maxmin: true
        , moveOut: true
        , content: dingWeiform
        , zIndex: layer.zIndex
        , success: function (layero) {
            //置顶
            layer.setTop(layero);
            form.render();

            form.on('submit(dingWeiinfosubmit)', function (data) {
                var l = parseFloat(data.field.L);
                var b = parseFloat(data.field.B);
                var h = parseFloat(data.field.H);

                if ((!isNaN(l)) && (!isNaN(b)) && (!isNaN(h))) {

                    var e = viewer.entities.add({
                        name: "temppoint" + NewGuid(),
                        position: Cesium.Cartesian3.fromDegrees(l, b, h),
                        billboard: {
                            image: '../../Resources/img/map/marker.png',
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            width: 20,
                            height: 20,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                        }
                    });

                    viewer.zoomTo(e);
                }
                else {
                    alert("大地坐标输入错误");
                }
                return false;
            });

        },  end: function () {
            dingWeilayerindex = null;
        }, btn: ['相控点']
        , yes: function (index, layero) {
            if (curtileset == null) {
                layer.msg('请先选择模型');
                return;
            }
           var tempList= [{ "name": "XK001", "y": 574314.0912, "x": 3422530.8845 },
            { "name": "XK002", "y": 574677.8797, "x": 3422804.3362 },
            { "name": "XK003", "y": 575083.7924, "x": 3423103.5144 },
            { "name": "XK004", "y": 575516.3436, "x": 3423481.8522 },
            { "name": "XK005", "y": 575798.3788, "x": 3423815.8516 },
            { "name": "XK006", "y": 576029.8948, "x": 3424062.4416 },
            { "name": "XK007", "y": 576422.8434, "x": 3424443.3526 },
            { "name": "XK008", "y": 576750.7904, "x": 3424772.5812 },
            { "name": "XK009", "y": 577127.2458, "x": 3425083.1362 },
            { "name": "XK010", "y": 577775.9610, "x": 3425400.1062 },
            { "name": "XK011", "y": 578174.1642, "x": 3425626.3142 },
            { "name": "XK012", "y": 578489.2072, "x": 3425737.4635 },
            { "name": "XK013", "y": 578944.7804, "x": 3425814.7046 },
            { "name": "XK014", "y": 579518.9726, "x": 3425869.9376 },
            { "name": "XK015", "y": 580097.0338, "x": 3425879.4268 },
            { "name": "XK016", "y": 580422.8226, "x": 3425905.7912 },
            { "name": "XK017", "y": 580664.0160, "x": 3425913.5876 },
            { "name": "XK018", "y": 580978.5568, "x": 3425902.6916 },
            { "name": "XK019", "y": 581449.1298, "x": 3425937.4128 },
            { "name": "XK020", "y": 581838.9288, "x": 3426001.2916 },
            { "name": "XK021", "y": 581583.3956, "x": 3426713.1798 },
            { "name": "XK022", "y": 581165.6542, "x": 3426688.9588 },
            { "name": "XK023", "y": 580406.5500, "x": 3426656.9220 },
            { "name": "XK024", "y": 580060.6466, "x": 3426614.1952 },
            { "name": "XK025", "y": 579561.3376, "x": 3426601.7910 },
            { "name": "XK026", "y": 578851.2862, "x": 3426576.3874 },
            { "name": "XK027", "y": 578272.1468, "x": 3426468.7328 },
            { "name": "XK028", "y": 577830.0476, "x": 3426330.9436 },
            { "name": "XK029", "y": 577560.5452, "x": 3426162.9830 },
            { "name": "XK030", "y": 577002.1526, "x": 3425959.7330 },
            { "name": "XK031", "y": 576615.1450, "x": 3425647.0246 },
            { "name": "XK032", "y": 576268.5254, "x": 3425525.7578 },
            { "name": "XK033", "y": 575853.6936, "x": 3425180.7174 },
            { "name": "XK034", "y": 575486.4958, "x": 3424933.3034 },
            { "name": "XK035", "y": 582326.4014, "x": 3426083.0024 },
            { "name": "XK036", "y": 582859.3978, "x": 3426100.5398 },
            { "name": "XK037", "y": 583383.9930, "x": 3426076.2232 },
            { "name": "XK038", "y": 583948.3392, "x": 3426091.5184 },
            { "name": "XK039", "y": 584604.5804, "x": 3426074.9862 },
            { "name": "XK040", "y": 585077.0954, "x": 3426022.5916 },
            { "name": "XK041", "y": 585552.0446, "x": 3425985.9406 },
            { "name": "XK042", "y": 585873.1676, "x": 3425967.8848 },
            { "name": "XK043", "y": 586498.5696, "x": 3425893.6342 },
            { "name": "XK044", "y": 586738.9715, "x": 3425756.4968 },
            { "name": "XK045", "y": 587307.2206, "x": 3425526.5138 },
            { "name": "XK046", "y": 587730.0604, "x": 3425374.6798 },
            { "name": "XK047", "y": 588144.0682, "x": 3425171.3084 },
            { "name": "XK048", "y": 588690.3858, "x": 3424879.9276 },
            { "name": "XK049", "y": 588943.0214, "x": 3424705.1748 },
            { "name": "XK050", "y": 586498.1628, "x": 3426502.3534 },
            { "name": "XK051", "y": 586014.6854, "x": 3426495.6546 },
            { "name": "XK052", "y": 585549.8194, "x": 3426597.3946 },
            { "name": "XK053", "y": 585085.3072, "x": 3426583.7980 },
            { "name": "XK054", "y": 584411.7298, "x": 3426754.2396 },
            { "name": "XK055", "y": 583958.2500, "x": 3426812.5254 },
            { "name": "XK056", "y": 583402.0686, "x": 3426717.7802 },
            { "name": "XK057", "y": 582862.9132, "x": 3426750.5282 },
            { "name": "XK058", "y": 582514.8994, "x": 3426691.1144 },
            { "name": "XK059", "y": 582151.2750, "x": 3426715.4244 },
            { "name": "XK060", "y": 588220.2158, "x": 3425702.8140 },
            { "name": "XK061", "y": 587952.0752, "x": 3425818.5950 },
            { "name": "XK062", "y": 587499.8356, "x": 3426086.7836 },
            { "name": "XK063", "y": 587110.8954, "x": 3426330.5810 },
            { "name": "XK064", "y": 575265.8976, "x": 3424125.6336 },
            { "name": "XK065", "y": 575002.6042, "x": 3423964.7940 },
            { "name": "XK066", "y": 574409.1468, "x": 3423664.7054 },
            { "name": "XK067", "y": 574126.5322, "x": 3423515.6326 },
            { "name": "XK068", "y": 573487.2396, "x": 3423427.0066 },
            { "name": "XK069", "y": 573059.4124, "x": 3423252.8830 },
            { "name": "XK070", "y": 572573.1210, "x": 3423023.5456 },
            { "name": "XK071", "y": 572054.3354, "x": 3422936.7420 },
            { "name": "XK072", "y": 571509.7174, "x": 3422766.1364 },
            { "name": "XK073", "y": 570967.2912, "x": 3422683.8516 },
            { "name": "XK074", "y": 570493.3024, "x": 3422637.3546 },
            { "name": "XK075", "y": 570053.3848, "x": 3422589.7842 },
            { "name": "XK076", "y": 569686.5166, "x": 3422324.5012 },
            { "name": "XK077", "y": 568770.8964, "x": 3422171.2468 },
            { "name": "XK078", "y": 568488.5006, "x": 3422081.0190 },
            { "name": "XK079", "y": 568159.2558, "x": 3421992.0462 },
            { "name": "XK080", "y": 569654.1574, "x": 3421188.4082 },
            { "name": "XK081", "y": 570137.1980, "x": 3421353.6272 },
            { "name": "XK082", "y": 570606.6068, "x": 3421439.1320 },
            { "name": "XK083", "y": 571152.0762, "x": 3421559.0954 },
            { "name": "XK084", "y": 571579.1774, "x": 3421666.5714 },
            { "name": "XK085", "y": 572191.1660, "x": 3421878.0026 },
            { "name": "XK086", "y": 572554.4844, "x": 3421966.5958 },
            { "name": "XK087", "y": 572971.5704, "x": 3422123.8704 },
            { "name": "XK088", "y": 573414.6860, "x": 3422270.7010 },
            { "name": "XK089", "y": 573846.3672, "x": 3422399.3290 },
            { "name": "XK090", "y": 567403.2772, "x": 3422415.2460 },
            { "name": "XK091", "y": 566681.1204, "x": 3422806.2140 },
            { "name": "XK092", "y": 566210.1878, "x": 3423113.2600 },
            { "name": "XK093", "y": 565862.9712, "x": 3423494.0928 },
            { "name": "XK094", "y": 565287.9980, "x": 3423956.8880 },
            { "name": "XK095", "y": 564881.1460, "x": 3424414.7400 },
            { "name": "XK096", "y": 564437.9956, "x": 3424703.4576 },
            { "name": "XK097", "y": 563930.9322, "x": 3425006.4632 },
            { "name": "XK098", "y": 563593.2188, "x": 3425352.0006 },
            { "name": "XK099", "y": 563252.4072, "x": 3425556.1790 },
            { "name": "XK100", "y": 562841.7532, "x": 3426141.7984 },
            { "name": "XK101", "y": 562338.7920, "x": 3426021.7306 },
            { "name": "XK102", "y": 561725.4858, "x": 3426019.0158 },
            { "name": "XK103", "y": 561142.7936, "x": 3425965.7586 },
            { "name": "XK104", "y": 560836.7210, "x": 3426011.8772 },
            { "name": "XK105", "y": 560398.7624, "x": 3426097.2936 },
            { "name": "XK106", "y": 559813.8730, "x": 3425977.7152 },
            { "name": "XK107", "y": 559382.2686, "x": 3425935.3160 },
            { "name": "XK108", "y": 558850.6758, "x": 3425836.5030 },
            { "name": "XK109", "y": 558453.2272, "x": 3425673.2340 },
            { "name": "XK110", "y": 557971.1636, "x": 3425379.8270 },
            { "name": "XK111", "y": 557606.9998, "x": 3425039.1946 },
            { "name": "XK112", "y": 557219.5900, "x": 3424614.9892 },
            { "name": "XK113", "y": 556879.9594, "x": 3424242.1086 },
            { "name": "XK114", "y": 556545.9994, "x": 3423765.2400 },
            { "name": "XK115", "y": 556283.5490, "x": 3423337.2563 },
            { "name": "XK116", "y": 569127.6452, "x": 3420845.6482 },
            { "name": "XK117", "y": 568786.1678, "x": 3420703.6420 },
            { "name": "XK118", "y": 567751.0806, "x": 3421305.3314 },
            { "name": "XK119", "y": 567286.4848, "x": 3421619.5184 },
            { "name": "XK120", "y": 566796.2388, "x": 3421833.3036 },
            { "name": "XK121", "y": 566303.5986, "x": 3421817.0198 },
            { "name": "XK122", "y": 566009.8398, "x": 3422240.0106 },
            { "name": "XK123", "y": 565684.9118, "x": 3422577.2738 },
            { "name": "XK124", "y": 565271.6810, "x": 3422940.2534 },
            { "name": "XK125", "y": 564862.0548, "x": 3423332.4614 },
            { "name": "XK126", "y": 564422.9106, "x": 3423647.9496 },
            { "name": "XK127", "y": 564061.9660, "x": 3423830.1376 },
            { "name": "XK128", "y": 563684.3018, "x": 3424274.5858 },
            { "name": "XK129", "y": 563312.2990, "x": 3424535.4044 },
            { "name": "XK130", "y": 562841.0796, "x": 3424832.9372 },
            { "name": "XK131", "y": 562331.8578, "x": 3424845.9076 },
            { "name": "XK132", "y": 561796.8942, "x": 3424985.1572 },
            { "name": "XK133", "y": 561160.6858, "x": 3425068.5472 },
            { "name": "XK134", "y": 560670.3432, "x": 3425196.5158 },
            { "name": "XK135", "y": 560259.9492, "x": 3425247.5228 },
            { "name": "XK136", "y": 559819.0174, "x": 3425250.0770 },
            { "name": "XK137", "y": 559274.7486, "x": 3425148.4998 },
            { "name": "XK138", "y": 558772.4222, "x": 3424961.3144 },
            { "name": "XK139", "y": 558436.9106, "x": 3424759.8024 },
            { "name": "XK140", "y": 558195.1646, "x": 3424481.1786 },
            { "name": "XK141", "y": 555973.0738, "x": 3422922.3692 },
            { "name": "XK142", "y": 555588.8436, "x": 3422594.3948 },
            { "name": "XK143", "y": 555178.9738, "x": 3422378.6308 },
            { "name": "XK144", "y": 554783.6696, "x": 3422292.7144 },
            { "name": "XK145", "y": 554383.4004, "x": 3422269.8706 },
            { "name": "XK146", "y": 553787.0060, "x": 3422231.2032 },
            { "name": "XK147", "y": 553119.6466, "x": 3422175.2526 },
            { "name": "XK148", "y": 552427.5812, "x": 3422112.7448 },
            { "name": "XK149", "y": 589403.3638, "x": 3424395.4892 },
            { "name": "XK150", "y": 589895.8646, "x": 3424010.7118 },
            { "name": "XK151", "y": 590355.0206, "x": 3423861.6918 },
            { "name": "XK152", "y": 590734.6980, "x": 3423720.7520 },
            { "name": "XK153", "y": 591129.3394, "x": 3423628.8844 },
            { "name": "XK154", "y": 591706.3394, "x": 3423591.5830 },
            { "name": "XK155", "y": 592204.7302, "x": 3423629.8364 },
            { "name": "XK156", "y": 592738.3888, "x": 3423669.6894 },
            { "name": "XK157", "y": 593252.8916, "x": 3423697.2350 },
            { "name": "XK158", "y": 593709.0364, "x": 3423750.9282 },
            { "name": "XK159", "y": 594207.4274, "x": 3423816.7896 },
            { "name": "XK160", "y": 594643.8908, "x": 3423849.9808 },
            { "name": "XK161", "y": 595179.1562, "x": 3423930.7886 },
            { "name": "XK162", "y": 595785.5258, "x": 3424000.0128 },
            { "name": "XK163", "y": 588762.6860, "x": 3425553.6800 },
            { "name": "XK164", "y": 589230.9048, "x": 3425285.3834 },
            { "name": "XK165", "y": 589640.6968, "x": 3425025.3426 },
            { "name": "XK166", "y": 589973.7934, "x": 3424822.9800 },
            { "name": "XK167", "y": 590550.5936, "x": 3424483.1146 },
            { "name": "XK168", "y": 590886.7818, "x": 3424338.8658 },
            { "name": "XK169", "y": 591273.2912, "x": 3424280.0864 },
            { "name": "XK170", "y": 591965.0966, "x": 3424297.4028 },
            { "name": "XK171", "y": 592413.8314, "x": 3424295.1480 },
            { "name": "XK172", "y": 592913.2428, "x": 3424336.9894 },
            { "name": "XK173", "y": 593340.8462, "x": 3424367.1520 },
            { "name": "XK174", "y": 593765.7502, "x": 3424388.8978 },
            { "name": "XK175", "y": 594227.2116, "x": 3424455.5556 },
            { "name": "XK176", "y": 594632.6516, "x": 3424479.6830 },
            { "name": "XK177", "y": 595364.5916, "x": 3424550.9984 },
            { "name": "XK178", "y": 595911.4488, "x": 3424656.3664 },
            { "name": "XK179", "y": 596219.6954, "x": 3424073.2180 },
            { "name": "XK180", "y": 596751.1562, "x": 3424164.4572 },
            { "name": "XK181", "y": 597258.8662, "x": 3424283.8450 },
            { "name": "XK182", "y": 597773.2192, "x": 3424398.0470 },
            { "name": "XK183", "y": 598323.9036, "x": 3424509.8630 },
            { "name": "XK184", "y": 598881.2368, "x": 3424653.7260 },
            { "name": "XK185", "y": 599378.2966, "x": 3424829.1172 },
            { "name": "XK186", "y": 599941.6406, "x": 3424939.5420 },
            { "name": "XK187", "y": 600294.0810, "x": 3424985.5754 },
            { "name": "XK188", "y": 601013.7000, "x": 3424998.1228 },
            { "name": "XK189", "y": 601368.5804, "x": 3425033.9700 },
            { "name": "XK190", "y": 601875.1960, "x": 3425115.9976 },
            { "name": "XK191", "y": 602607.3377, "x": 3425274.1580 },
            { "name": "XK192", "y": 603171.3588, "x": 3425200.9886 },
            { "name": "XK193", "y": 603514.9578, "x": 3425169.2468 },
            { "name": "XK194", "y": 603927.4182, "x": 3425405.6438 },
            { "name": "XK195", "y": 604271.6100, "x": 3425529.6034 },
            { "name": "XK196", "y": 606635.9954, "x": 3426440.4824 },
            { "name": "XK197", "y": 606139.7696, "x": 3426432.3242 },
            { "name": "XK198", "y": 605790.1266, "x": 3426428.9796 },
            { "name": "XK199", "y": 605200.4142, "x": 3426413.8896 },
            { "name": "XK200", "y": 604730.4198, "x": 3426325.1914 },
            { "name": "XK201", "y": 604107.5454, "x": 3426245.0422 },
            { "name": "XK202", "y": 603709.4420, "x": 3426126.9896 },
            { "name": "XK203", "y": 603305.2888, "x": 3425987.8282 },
            { "name": "XK204", "y": 602768.1658, "x": 3425825.2912 },
            { "name": "XK205", "y": 602067.1826, "x": 3425783.7686 },
            { "name": "XK206", "y": 601601.3600, "x": 3425655.0404 },
            { "name": "XK207", "y": 601220.0556, "x": 3425591.4328 },
            { "name": "XK208", "y": 600703.8766, "x": 3425549.8772 },
            { "name": "XK209", "y": 600028.8182, "x": 3425530.0770 },
            { "name": "XK210", "y": 599557.4358, "x": 3425464.0874 },
            { "name": "XK211", "y": 599020.9236, "x": 3425357.3642 },
            { "name": "XK212", "y": 598539.0924, "x": 3425213.6602 },
            { "name": "XK213", "y": 597821.6291, "x": 3424988.2177 },
            { "name": "XK214", "y": 597323.3476, "x": 3424903.9326 },
            { "name": "XK215", "y": 596834.6924, "x": 3424812.2950 },
            { "name": "XK216", "y": 596351.5504, "x": 3424700.4082 },
            { "name": "XK217", "y": 607113.6114, "x": 3426547.1114 },
            { "name": "XK218", "y": 607551.4196, "x": 3426644.5996 },
            { "name": "XK219", "y": 607950.7904, "x": 3426774.7714 },
            { "name": "XK220", "y": 608322.7904, "x": 3426914.5470 },
            { "name": "XK221", "y": 608883.3206, "x": 3427078.3026 },
            { "name": "XK222", "y": 609358.6584, "x": 3427249.0414 },
            { "name": "XK223", "y": 609933.9142, "x": 3427297.7810 },
            { "name": "XK224", "y": 610455.2780, "x": 3427554.8828 },
            { "name": "XK225", "y": 610965.0766, "x": 3427708.7822 },
            { "name": "XK226", "y": 611370.6348, "x": 3427861.9560 },
            { "name": "XK227", "y": 611950.6458, "x": 3428102.4962 },
            { "name": "XK228", "y": 612366.4364, "x": 3428277.6988 },
            { "name": "XK229", "y": 613044.2128, "x": 3428284.6898 },
            { "name": "XK230", "y": 613675.4876, "x": 3428421.3702 },
            { "name": "XK231", "y": 613991.5264, "x": 3428538.3782 },
            { "name": "XK232", "y": 614606.4272, "x": 3428561.4420 },
            { "name": "XK233", "y": 615130.2712, "x": 3428611.3342 },
            { "name": "XK234", "y": 615886.1192, "x": 3427937.5278 },
            { "name": "XK235", "y": 615499.0968, "x": 3427893.3956 },
            { "name": "XK236", "y": 615053.4114, "x": 3427966.7686 },
            { "name": "XK237", "y": 614600.3686, "x": 3427819.3722 },
            { "name": "XK238", "y": 614182.7482, "x": 3427671.2610 },
            { "name": "XK239", "y": 613669.8584, "x": 3427670.0732 },
            { "name": "XK240", "y": 613232.7534, "x": 3427598.1790 },
            { "name": "XK241", "y": 612702.0106, "x": 3427334.9142 },
            { "name": "XK242", "y": 612311.9538, "x": 3427320.3672 },
            { "name": "XK243", "y": 611903.9116, "x": 3427314.6016 },
            { "name": "XK244", "y": 611522.2402, "x": 3427141.0374 },
            { "name": "XK245", "y": 610847.0406, "x": 3426987.7370 },
            { "name": "XK246", "y": 610268.3046, "x": 3426761.8666 },
            { "name": "XK247", "y": 609955.4232, "x": 3426628.1534 },
            { "name": "XK248", "y": 609529.9374, "x": 3426550.8030 },
            { "name": "XK249", "y": 609110.4268, "x": 3426565.1896 },
            { "name": "XK250", "y": 608711.5754, "x": 3426281.6716 },
            { "name": "XK251", "y": 608242.7420, "x": 3426006.6956 },
            { "name": "XK252", "y": 607925.3102, "x": 3425838.7360 },
            { "name": "XK253", "y": 607421.5152, "x": 3425805.3336 },
            { "name": "XK254", "y": 606919.4690, "x": 3425912.4720 },
            { "name": "XK255", "y": 606492.2776, "x": 3425854.3890 },
            { "name": "XK256", "y": 605978.6010, "x": 3425707.4032 },
            { "name": "XK257", "y": 605485.4536, "x": 3425779.6168 },
            { "name": "XK258", "y": 605074.3544, "x": 3425679.4126 }]
            console.log(tempList);
            var pointList = [];
            var nameList = [];
           // console.log(xy2bl(605074.3544, 3425679.4126, 6378137.0, 1 / 298.257223563, 3, 108, false));
            for (var i in tempList) {
                var lbh = xy2bl(tempList[i].y, tempList[i].x, 6378137.0, 1 / 298.257223563, 3, 108, false);
                var postionLB = new Cesium.Cartographic(Math.PI / 180 * lbh.l, Math.PI / 180 * lbh.b);
                var Heights = viewer.scene.sampleHeight(postionLB);
                if (Heights > 0) {
                    var postiontemp = new Cesium.Cartesian3.fromDegrees(lbh.l, lbh.b, Heights);
                    pointList.push(postiontemp);
                    nameList.push({ "name": tempList[i].name, "H": Heights });
                }

            }
            if (pointList.length > 0) {
                console.log(pointList);
                console.log(nameList);
                for (var j in pointList) {
                    //viewer.entities.add({
                    //    name: "ptMeasue" + NewGuid(),
                    //    position: pointList[j],
                    //    point: {
                    //        pixelSize: 10,
                    //        color: Cesium.Color.YELLOW,
                    //        disableDepthTestDistance: Number.POSITIVE_INFINITY
                    //    }
                    //});
                    viewer.entities.add({
                        name: "ptMeasue" + NewGuid(),
                        position: pointList[j],
                        billboard: {
                            image: '../../Resources/img/mark/p6.png',
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            width: 20,
                            height: 20,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                        }
                    });
                    viewer.entities.add({
                        name: "pllMeasue" + NewGuidCL(),
                        position: pointList[j],
                        label: {
                            text: '名称：' + nameList[j].name + '  大地高：' + (nameList[j].H).toFixed(4),
                            showBackground: true,
                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                            font: '16px Times New Roman',
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                        }
                    });
                }
            } else {
                layer.msg('该段模型没有像控点');
                return;
            }

        }, cancel: function () {//取消按钮
            dingWeilayerindex = null;

        }
    });
    //var e = viewer.entities.add({
    //    name: "temppolygon" + NewGuid(),
    //    polygon: {
    //        hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
    //            107.1344014846, 28.9443584725, H,
    //            107.1344014846, 28.9356677007, H,
    //            107.1425481386, 28.9356677007, H,
    //            107.1425481386, 28.9443584725, H
    //        ]),
    //        extrudedHeight: H,
    //        perPositionHeight: true,
    //        material: Cesium.Color.ORANGE.withAlpha(0.4),
    //        outline: true,
    //        outlineColor: Cesium.Color.RED,
    //        outlineWidth: 5,
    //    }
    //});
    
};
function modelJiaMiDian() {

    ClearCeliangTemp();
    
    if (modelJiaMilayerindex != null) {
        layer.msg('已打开窗口');
        return;
    }
    if (modleInfo == null) {
        layer.msg('请先选择模型');
        return;
    }
    modelJiaMilayerindex = layer.open({
        type: 1
        , title: ['模型', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['400px', '450px']
        , shade: 0
        , offset: ['85px', '260px']
        , closeBtn: 1
        , maxmin: true
        , moveOut: true
        , content: modelJiaMiform
        , zIndex: layer.zIndex
        , success: function (layero) {
            //置顶
            layer.setTop(layero);
            form.render();

            form.on('submit(modelJiaMiinfosubmit)', function (data) {
                console.log(data.field);
                var startx = parseFloat(data.field.startx);
                var starty = parseFloat(data.field.starty);
                var endx = parseFloat(data.field.endx);
                var endy = parseFloat(data.field.endy);

                var lbh1 = xy2bl( startx,starty, 6378137.0, 1 / 298.257223563, 3, 108, false);
                var lbh2 = xy2bl( endx,endy, 6378137.0, 1 / 298.257223563, 3, 108, false);

                //var postionLB = new Cesium.Cartographic.fromDegrees(Math.PI / 180 * lbh1.l, Math.PI / 180 * lbh1.b);
                //console.log(postionLB);
                //var Heights = viewer.scene.sampleHeight(postionLB);

                //var postionLB = new Cesium.Cartographic.fromDegrees(lbh1.l, lbh1.b);
                //var Heights = viewer.scene.globe.getHeight(postionLB);


                //var lbh = xy2bl(tempList[i].y, tempList[i].x, 6378137.0, 1 / 298.257223563, 3, 108, false);
                //var postionLB = new Cesium.Cartographic(Math.PI / 180 * lbh.l, Math.PI / 180 * lbh.b);
                //var Heights = viewer.scene.sampleHeight(postionLB);
                //if (Heights > 0) {
                //    var postiontemp = new Cesium.Cartesian3.fromDegrees(lbh.l, lbh.b, Heights);
                //    pointList.push(postiontemp);
                //    nameList.push({ "name": tempList[i].name, "H": Heights });
                //}


                var tempList = [];
                tempList.push(lbh1);
                tempList.push(lbh2);
                var pointList1 = [];
                pointList1.push(new Cesium.Cartesian3.fromDegrees(lbh1.l, lbh1.b, 200));
                //for (var m in tempList) {
                //    pointList1.push(new Cesium.Cartesian3.fromDegrees(tempList[m].l, tempList[m].b, 200));
                //}
                var sum = Cesium.Cartesian3.distance(new Cesium.Cartesian3.fromDegrees(lbh1.l, lbh1.b, 200), new Cesium.Cartesian3.fromDegrees(lbh2.l, lbh2.b, 200));
                var bilichi = 5 / sum;
                var lbian = (lbh1.l - lbh2.l) * bilichi;//jingdu 
                var bbian = (lbh1.b - lbh2.b) * bilichi;//weidu 
                var postionss = [];
                var xyz = "";
                for (var i = 0; i < (sum / 5 + 1); i++) {
                    var postionLB = new Cesium.Cartographic(Math.PI / 180 * (lbh2.l + lbian * i), Math.PI / 180 *(lbh2.b + bbian * i));
                    var Heights = viewer.scene.sampleHeight(postionLB);

                    if (Heights>0) {
                        var position = new Cesium.Cartesian3.fromDegrees((lbh2.l + lbian * i), (lbh2.b + bbian * i), Heights);

                        var cartesian3 = Cesium.Cartographic.fromCartesian(position);                        //笛卡尔XYZ
                        var longitude = Cesium.Math.toDegrees(cartesian3.longitude);                         //经度
                        var latitude = Cesium.Math.toDegrees(cartesian3.latitude);                           //纬度
                        var height = cartesian3.height;
                        var xy = bl2xy(cartesian3.latitude * 180 / Math.PI, cartesian3.longitude * 180 / Math.PI, 6378137.0, 1 / 298.257223563, 3, 108, false);

                        var temp = { "x": xy.x, "y": xy.y, "H": Heights };
                        xyz = xyz + (xy.x).toFixed(3) + "," + parseFloat(xy.y).toFixed(3) + "," + Heights.toFixed(3)+"\n" ;
                        
                        postionss.push(temp);
                        viewer.entities.add({
                            name: "ptMeasue" + NewGuidCL(),
                            position: position,
                            point: {
                                pixelSize: 3,
                                color: Cesium.Color.RED,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY
                            }
                        });
                        //viewer.entities.add({
                        //    name: "pllMeasue" + NewGuidCL(),
                        //    position: position,
                        //    label: {
                        //        text: pointList1.length,
                        //        showBackground: true,
                        //        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                        //        font: '16px Times New Roman',
                        //        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        //        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                        //        disableDepthTestDistance: Number.POSITIVE_INFINITY,
                        //        pixelOffset: new Cesium.Cartesian2(0.0, -60),
                        //    }
                        //});
                        pointList1.push(position);
                    }
                    
                }
                console.log(postionss);
                if (xyz.length==0) {
                    xyz = "未加载正确的模型，或输入的点不对应";
                }
                form.val("updModelJiaMiform", {
                    "result": xyz,
                   // "celiangfangfa": "请选择测量方法"
                });
                console.log(sum);
                pointList1.push(new Cesium.Cartesian3.fromDegrees(lbh2.l, lbh2.b, 200));
                //viewer.entities.add({
                //    name: "pllMeasue" + NewGuidCL(),
                //    polyline: {
                //        positions: pointList1,
                //        width: 1,
                //        material: Cesium.Color.RED,
                //        show: true,
                //        clampToGround: true,
                //        //classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                //    }
                //});
                viewer.entities.add({
                    name: "pllMeasue" + NewGuidCL(),
                    position: pointList1[0],
                    label: {
                        text: '起点',
                        showBackground: true,
                        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                        font: '16px Times New Roman',
                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                        disableDepthTestDistance: Number.POSITIVE_INFINITY,
                        pixelOffset: new Cesium.Cartesian2(0.0, -60),
                    }
                });
              

               
                return false;
            });

        }, end: function () {
            modelJiaMilayerindex = null;
        }
       
        , cancel: function () {//取消按钮
            modelJiaMilayerindex = null;

        }
    });
    //var e = viewer.entities.add({
    //    name: "temppolygon" + NewGuid(),
    //    polygon: {
    //        hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
    //            107.1344014846, 28.9443584725, H,
    //            107.1344014846, 28.9356677007, H,
    //            107.1425481386, 28.9356677007, H,
    //            107.1425481386, 28.9443584725, H
    //        ]),
    //        extrudedHeight: H,
    //        perPositionHeight: true,
    //        material: Cesium.Color.ORANGE.withAlpha(0.4),
    //        outline: true,
    //        outlineColor: Cesium.Color.RED,
    //        outlineWidth: 5,
    //    }
    //});

};
// 坐标平面。
function getxyzh() {
    if (viewer.entities.getById("temppolygon-l") != null) {
        viewer.entities.removeById("temppolygon-l");
        return;
    }
    if (viewer.entities.getById("temppolygon-2") != null) {
        viewer.entities.removeById("temppolygon-2");
        return;
    }
    
    var e = viewer.entities.add({
        id: "temppolygon-l",
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
                108.5635884527616, 30.93253695735513, 124.2,
                108.563432379305, 30.93245359569587, 124.2,
                108.5632182855932, 30.93233924382037, 124.2,
                108.5631779131196, 30.93231767997703, 124.2,
                108.5629869354329, 30.93221567420759, 124.2,
                108.5556203685127, 30.9331544992806, 124.2,
                108.5547032465807, 30.93327135039715, 124.2,
                108.5536954067028, 30.93339975213073, 124.2,
                108.5530839539256, 30.93347764900463, 124.2,
                108.5525290247508, 30.93354834236793, 124.2,
                108.5510851191139, 30.93368555931017, 124.2,
                108.5490129702587, 30.93368821828354, 124.2,
                108.5468536381439, 30.93343876822547, 124.2,
                108.5449937190887, 30.9330648775682, 124.2,
                108.5433204809284, 30.93276954359684, 124.2,
                108.5430246406563, 30.93240313911059, 124.2,
                108.5431083955684, 30.93184755480949, 124.2,
                108.5431962813623, 30.9315475599227, 124.2,
                108.5434162826368, 30.93116515495784, 124.2,
                108.5435497255548, 30.9310008807814, 124.2,
                108.5437244890584, 30.93085651197574, 124.2,
                108.5439546415385, 30.93068565321527, 124.2,
                108.5439732604618, 30.93067384229761, 124.2,
                108.5440571719894, 30.93059950394758, 124.2,
                108.5440640668105, 30.93055159752218, 124.2,
                108.5439894539642, 30.93034727025595, 124.2,
                108.5439455058366, 30.93017949543413, 124.2,
                108.5439421188352, 30.93013510658268, 124.2,
                108.5439654094557, 30.93005585509775, 124.2,
                108.5439984739994, 30.92996266160388, 124.2,
                108.5440814015316, 30.92973682197301, 124.2,
                108.5441365362483, 30.92934893095303, 124.2,
                108.5441906577614, 30.92909850076499, 124.2,
                108.5442314697838, 30.92902882817631, 124.2,
                108.5443239740588, 30.92891260470404, 124.2,
                108.5444481307927, 30.9287789755145, 124.2,
                108.5444651244201, 30.9287597771648, 124.2,
                108.5444728972269, 30.92875018103762, 124.2,
                108.5445105731294, 30.92869378747779, 124.2,
                108.5446225514265, 30.92854292980106, 124.2,
                108.5447058669178, 30.92840722831197, 124.2,
                108.5447585078874, 30.92827064310422, 124.2,
                108.5448101605567, 30.92813545014171, 124.2,
                108.5448481578202, 30.92805166464097, 124.2,
                108.5448549803091, 30.9280346494274, 124.2,
                108.5448572438172, 30.92802900539422, 124.2,
                108.5448775225411, 30.92796903212039, 124.2,
                108.5449029574127, 30.92774006897943, 124.2,
                108.5449141837405, 30.92769817018349, 124.2,
                108.5449311796889, 30.92766909808968, 124.2,
                108.5449576032375, 30.92762485150353, 124.2,
                108.5449589691152, 30.92760243133008, 124.2,
                108.5449530537681, 30.92758457234801, 124.2,
                108.54494813467, 30.92756970184508, 124.2,
                108.5449145159175, 30.92746871932546, 124.2,
                108.544901229906, 30.92741620862574, 124.2,
                108.5449073994458, 30.92738202749634, 124.2,
                108.5449203697936, 30.92736318427085, 124.2,
                108.5449253653267, 30.92734762258056, 124.2,
                108.5449244747446, 30.92732009153154, 124.2,
                108.5448981760304, 30.92724536555855, 124.2,
                108.5448585415397, 30.92713830485499, 124.2,
                108.5448519301465, 30.92712057146494, 124.2,
                108.5448629639472, 30.92705561055793, 124.2,
                108.5448697766354, 30.9270259914998, 124.2,
                108.5448663467177, 30.92699272300569, 124.2,
                108.5448678159326, 30.92693962428769, 124.2,
                108.5448605898282, 30.92692511165381, 124.2,
                108.5448470324495, 30.92690185601204, 124.2,
                108.5448436504302, 30.92687223571238, 124.2,
                108.5448480818246, 30.92683929216957, 124.2,
                108.5448397175149, 30.92679674713808, 124.2,
                108.5448249835144, 30.92674550796418, 124.2,
                108.5448055370667, 30.92667929368198, 124.2,
                108.5447561890845, 30.92650644395335, 124.2,
                108.5447009878205, 30.92637481102673, 124.2,
                108.5446814468973, 30.92632604990023, 124.2,
                108.5446722218729, 30.92629775932898, 124.2,
                108.5446675235523, 30.92626847287634, 124.2,
                108.5446662077968, 30.92623624083062, 124.2,
                108.5446545972599, 30.92612781280166, 124.2,
                108.5446484015818, 30.92609369187464, 124.2,
                108.544636838512, 30.92605271165473, 124.2,
                108.5446183653626, 30.92599222334084, 124.2,
                108.5446044133799, 30.92592976145195, 124.2,
                108.5445631110561, 30.92584006302548, 124.2,
                108.5445538141608, 30.92579907325302, 124.2,
                108.5445717779975, 30.92576969046003, 124.2,
                108.5445212010471, 30.92564290940918, 124.2,
                108.5444911529962, 30.92553948725713, 124.2,
                108.5444540843137, 30.92539701845703, 124.2,
                108.5443773734537, 30.92505738821414, 124.2,
                108.5443454580077, 30.92502430815148, 124.2,
                108.5442775639634, 30.92496319799887, 124.2,
                108.5442669379674, 30.92495905315057, 124.2,
                108.5442655946639, 30.9249572161147, 124.2,
                108.5442613838599, 30.92493989920683, 124.2,
                108.5442392204879, 30.92488391988452, 124.2,
                108.544188278782, 30.92482781362584, 124.2,
                108.5441293102102, 30.92468831950744, 124.2,
                108.5440833775114, 30.92461604446733, 124.2,
                108.5440492185752, 30.92458784431155, 124.2,
                108.5440079187911, 30.92456974719497, 124.2,
                108.5439845495835, 30.92456186953083, 124.2,
                108.5439673155808, 30.92454495464505, 124.2,
                108.5439212720227, 30.92447875376105, 124.2,
                108.5438535129894, 30.92442622579114, 124.2,
                108.5438297904556, 30.92439213612869, 124.2,
                108.5438190427575, 30.9243714598605, 124.2,
                108.5437845050313, 30.92434322063749, 124.2,
                108.5437501873388, 30.92432039851072, 124.2,
                108.5436905561362, 30.92427092636811, 124.2,
                108.5435708045909, 30.92416260193976, 124.2,
                108.5435369223093, 30.92414441666853, 124.2,
                108.5435065324511, 30.92414086803357, 124.2,
                108.5434962061834, 30.92413993642098, 124.2,
                108.5434844592908, 30.92413736561575, 124.2,
                108.5434772723068, 30.92413321165999, 124.2,
                108.5434588855371, 30.92411037661989, 124.2,
                108.5434395332895, 30.92409201390898, 124.2,
                108.543346949709, 30.92406256542992, 124.2,
                108.5432937237863, 30.92405861390904, 124.2,
                108.5432838560483, 30.92405532445197, 124.2,
                108.5432816420615, 30.92405214625131, 124.2,
                108.5432819672602, 30.92404526659202, 124.2,
                108.5432843019883, 30.9240074297793, 124.2,
                108.5433066905734, 30.92393384910557, 124.2,
                108.5433106363023, 30.92389005984975, 124.2,
                108.5433336978728, 30.92375545922441, 124.2,
                108.5433374775212, 30.92360641275062, 124.2,
                108.543336396189, 30.92353375866578, 124.2,
                108.543344246367, 30.92341593873765, 124.2,
                108.5433483502565, 30.92332277319817, 124.2,
                108.5433260364352, 30.92328165941882, 124.2,
                108.5433235226276, 30.92326374997699, 124.2,
                108.5433262460747, 30.92324415803632, 124.2,
                108.5433449964083, 30.92310943751084, 124.2,
                108.5433533489539, 30.92304939998998, 124.2,
                108.5433526016806, 30.92302140470229, 124.2,
                108.5433450383461, 30.92298156564346, 124.2,
                108.5433439321144, 30.92294929390006, 124.2,
                108.5433526169389, 30.92293212210645, 124.2,
                108.5433853843603, 30.92291085708136, 124.2,
                108.5434215470368, 30.92289297904626, 124.2,
                108.5434557457962, 30.92285934311402, 124.2,
                108.543479925, 30.92282071457773, 124.2,
                108.5435090057446, 30.92274564908086, 124.2,
                108.543532850772, 30.92269714645424, 124.2,
                108.5435378390598, 30.92268714988768, 124.2,
                108.5435671381896, 30.92268346222447, 124.2,
                108.5436173637589, 30.92268313746438, 124.2,
                108.5437478966634, 30.92267474621978, 124.2,
                108.5438145876019, 30.92265669642133, 124.2,
                108.5438452778982, 30.92263650431931, 124.2,
                108.5438626710342, 30.92260931215159, 124.2,
                108.5438734767798, 30.92256669181646, 124.2,
                108.5438738427495, 30.92256517680007, 124.2,
                108.5439655518077, 30.92257157918544, 124.2,
                108.5440239766605, 30.92256759663426, 124.2,
                108.5440629074052, 30.92255157652518, 124.2,
                108.5440887833488, 30.92252498181136, 124.2,
                108.5441078225146, 30.92249417036363, 124.2,
                108.5441129078225, 30.92246584026823, 124.2,
                108.5441170887581, 30.9224335498937, 124.2,
                108.5441235820844, 30.92241627903434, 124.2,
                108.5441504835231, 30.9223934276085, 124.2,
                108.5441843648447, 30.92235443161065, 124.2,
                108.5442057989292, 30.92230961536612, 124.2,
                108.5442158132284, 30.92226009929286, 124.2,
                108.5442264972149, 30.92226086609087, 124.2,
                108.5442916198045, 30.92225857165137, 124.2,
                108.5443453297809, 30.9222216207665, 124.2,
                108.5443694157963, 30.92219470792534, 124.2,
                108.5443823656695, 30.92217696972208, 124.2,
                108.5444289114673, 30.92216593050403, 124.2,
                108.5444642401847, 30.92213462921551, 124.2,
                108.5444724739621, 30.9221067692971, 124.2,
                108.544468192497, 30.92208619573248, 124.2,
                108.5444610209195, 30.92207679961279, 124.2,
                108.5444396402259, 30.92204641533302, 124.2,
                108.5444229222151, 30.92201081526905, 124.2,
                108.5444112834646, 30.92196319874619, 124.2,
                108.5444077923534, 30.92195231063266, 124.2,
                108.5443929540969, 30.92190612905427, 124.2,
                108.5443657976324, 30.9218556501064, 124.2,
                108.5443581725459, 30.92181290707291, 124.2,
                108.5443720917316, 30.92180155242238, 124.2,
                108.5444683509422, 30.92172999121709, 124.2,
                108.5444908759653, 30.9216912738474, 124.2,
                108.5444943650092, 30.92165802488892, 124.2,
                108.5444720301414, 30.9216080397746, 124.2,
                108.5444469135657, 30.9215870722794, 124.2,
                108.5444169676869, 30.92157070973685, 124.2,
                108.5443962422233, 30.92155938456737, 124.2,
                108.5443401462832, 30.92151283457105, 124.2,
                108.5442915580381, 30.9214417369621, 124.2,
                108.5442794013309, 30.92135490928309, 124.2,
                108.5442547979361, 30.92127507541425, 124.2,
                108.5442338475497, 30.92121717159191, 124.2,
                108.5442059082563, 30.9211673326763, 124.2,
                108.5441525480598, 30.92107266630492, 124.2,
                108.5441031067105, 30.92098608206103, 124.2,
                108.544086240894, 30.92095111393457, 124.2,
                108.544063123028, 30.9208884126897, 124.2,
                108.5440583035472, 30.92083763495302, 124.2,
                108.5440625259102, 30.92078291191691, 124.2,
                108.5440686382219, 30.9207183027365, 124.2,
                108.54406405773, 30.92065133844037, 124.2,
                108.5440779919113, 30.92054339717975, 124.2,
                108.5440880814217, 30.92041255074926, 124.2,
                108.5441418728846, 30.92029701240378, 124.2,
                108.5441468266886, 30.92026635581199, 124.2,
                108.5441466858156, 30.92016458449185, 124.2,
                108.5441471730343, 30.92012812187695, 124.2,
                108.5441361821585, 30.92010525579678, 124.2,
                108.5441113244234, 30.92008224872425, 124.2,
                108.5440908856003, 30.92006420364349, 124.2,
                108.544088733672, 30.92005146087891, 124.2,
                108.5440874479924, 30.92002855396455, 124.2,
                108.5441555404755, 30.91996069403604, 124.2,
                108.5442181871227, 30.9198674489589, 124.2,
                108.544224082888, 30.91979714032864, 124.2,
                108.5441995929902, 30.91973339228943, 124.2,
                108.544178882397, 30.9196992999065, 124.2,
                108.544137860886, 30.91963628885741, 124.2,
                108.5441063003236, 30.91958331912623, 124.2,
                108.5440590609017, 30.91938636885674, 124.2,
                108.5440583906685, 30.91926794182091, 124.2,
                108.5440844764189, 30.91903586831787, 124.2,
                108.5441618621552, 30.91860350336296, 124.2,
                108.5442164260581, 30.91832854771824, 124.2,
                108.5442328175747, 30.91828646123336, 124.2,
                108.5442837453301, 30.91803749260711, 124.2,
                108.5443648253582, 30.91784030087769, 124.2,
                108.5444673544846, 30.9177709636446, 124.2,
                108.5445556590286, 30.9177241800462, 124.2,
                108.5447821102431, 30.91769587375428, 124.2,
                108.548389876419, 30.91777581021008, 124.2,
                108.548900175451, 30.91779406574509, 124.2,
                108.5492607915739, 30.91777088160085, 124.2,
                108.549523051454, 30.91771661727114, 124.2,
                108.5496629257033, 30.9176215351668, 124.2,
                108.5497933598451, 30.91743436571835, 124.2,
                108.5499169060998, 30.91710882427908, 124.2,
                108.5499510837933, 30.91670063611881, 124.2,
                108.5499545596727, 30.91666672322156, 124.2,
                108.5500017924823, 30.91596989225525, 124.2,
                108.5501133373806, 30.91485708715273, 124.2,
                108.5501303020825, 30.91452007033413, 124.2,
                108.5501488535286, 30.91446020993325, 124.2,
                108.5502117765731, 30.91444907374007, 124.2,
                108.5509928339367, 30.91445118856014, 124.2,
                108.5510411454696, 30.91445205156425, 124.2,
                108.5524460647874, 30.91447713631567, 124.2,
                108.5529582507275, 30.91448627712664, 124.2,
                108.5535989622187, 30.91446406145815, 124.2,
                108.5542409336848, 30.91444179933667, 124.2,
                108.5583234208783, 30.91407077046857, 124.2,
                108.5589048122123, 30.9139579903711, 124.2,
                108.5604063458219, 30.91370062695218, 124.2,
                108.5611359051182, 30.91364842751039, 124.2,
                108.5620829511094, 30.91361996909996, 124.2,
                108.5624999986046, 30.9136077809519, 124.2,
                108.5625122051132, 30.91360787037626, 124.2,
                108.5625141300345, 30.91360788455381, 124.2,
                108.5625253023171, 30.91360732275486, 124.2,
                108.5625406494369, 30.91360655158417, 124.2,
                108.5625471354908, 30.91360622573096, 124.2,
                108.5625625296207, 30.91360615877849, 124.2,
                108.5625792826099, 30.91360608591395, 124.2,
                108.562585924179, 30.91360605702689, 124.2,
                108.5625998373476, 30.91360533087003, 124.2,
                108.5626209047462, 30.91360422994883, 124.2,
                108.5626263282029, 30.91360394659569, 124.2,
                108.5626289995562, 30.91360387725088, 124.2,
                108.562650144461, 30.91360332888498, 124.2,
                108.562654929675, 30.91360320434481, 124.2,
                108.5626643272653, 30.91360327350329, 124.2,
                108.5626795634298, 30.91360338490878, 124.2,
                108.5626835105629, 30.91360341373756, 124.2,
                108.5626981858177, 30.91360241908073, 124.2,
                108.562728913503, 30.91360033628117, 124.2,
                108.5627341336023, 30.91359998255392, 124.2,
                108.5627579942178, 30.91360015203533, 124.2,
                108.5627978096814, 30.9136004342867, 124.2,
                108.5628067050996, 30.91360049660029, 124.2,
                108.5628285802029, 30.91360012992835, 124.2,
                108.5628479909186, 30.9135998046429, 124.2,
                108.5628858876826, 30.91359916981259, 124.2,
                108.562894652326, 30.91359887281, 124.2,
                108.5629379316907, 30.91359740909606, 124.2,
                108.5629551900944, 30.91359682528175, 124.2,
                108.5629784345207, 30.91359663211338, 124.2,
                108.5630007207577, 30.91359644671933, 124.2,
                108.5630167766844, 30.91359631369553, 124.2,
                108.5630229092553, 30.91359600559224, 124.2,
                108.5630294266783, 30.91359567777441, 124.2,
                108.5630332794054, 30.91359548422108, 124.2,
                108.5630336601683, 30.91359548075974, 124.2,
                108.5631315329098, 30.9135947597517, 124.2,
                108.5632290248804, 30.9135940412296, 124.2,
                108.56327304074, 30.91359151349991, 124.2,
                108.5633544153151, 30.91359115008705, 124.2,
                108.5633984370745, 30.91358766621893, 124.2,
                108.5634347225248, 30.91358698052132, 124.2,
                108.5634864226854, 30.91358545649175, 124.2,
                108.5635040238635, 30.91358463570123, 124.2,
                108.563715097971, 30.91357749249741, 124.2,
                108.5639616457026, 30.91357929499051, 124.2,
                108.5652107434571, 30.91356588484413, 124.2,
                108.5658042066682, 30.91364790869691, 124.2,
                108.5718674685991, 30.91552550381216, 124.2,
                108.5721633626179, 30.91563606071302, 124.2,
                108.5730006622041, 30.91597096665013, 124.2,
                108.5741241628482, 30.91645524278795, 124.2,
                108.5748488786303, 30.91666672438738, 124.2,
                108.575315410784, 30.91672822138473, 124.2,
                108.5763843862527, 30.91686917228295, 124.2,
                108.5772536809407, 30.91706132554628, 124.2,
                108.5778058280808, 30.91729851754577, 124.2,
                108.5778834764382, 30.91732553042467, 124.2,
                108.5828841310353, 30.91957122898238, 124.2,
                108.5854022737981, 30.9207593917173, 124.2,
                108.5857083352726, 30.92096052808192, 124.2,
                108.5886239528068, 30.92302801429677, 124.2,
                108.5909997465336, 30.92498553914304, 124.2,
                108.5936591850533, 30.92757453065488, 124.2,
                108.5937499996856, 30.92769874858046, 124.2,
                108.5940764516433, 30.92818388839351, 124.2,
                108.5953368477204, 30.93005323340083, 124.2,
                108.5971723358689, 30.93254176825637, 124.2,
                108.5977556654045, 30.93332157465741, 124.2,
                108.5988093809098, 30.93472165072712, 124.2,
                108.5989903724561, 30.93496226996954, 124.2,
                108.6007710370431, 30.93732949941773, 124.2,
                108.6008993005097, 30.93750000806374, 124.2,
                108.6017384265519, 30.93839273045402, 124.2,
                108.6027408835123, 30.93945918714309, 124.2,
                108.6031121449493, 30.93983576087009, 124.2,
                108.605314206639, 30.94206925652158, 124.2,
                108.6083713991622, 30.94059974701938, 124.2,
                108.6086436857912, 30.94042635330994, 124.2,
                108.6092866853649, 30.94012354964378, 124.2,
                108.6095089525107, 30.93997390995812, 124.2,
                108.6118922637113, 30.93802791454707, 124.2,
                108.6125287342697, 30.93736735002973, 124.2,
                108.6126944725377, 30.93690069793907, 124.2,
                108.6152413625395, 30.93555897398608, 124.2,
                108.6168808646479, 30.93546809210173, 124.2,
                108.6184138703994, 30.93631916104183, 124.2,
                108.6194526514816, 30.93782329812201, 124.2,
                108.6206787800427, 30.93845428913063, 124.2,
                108.6223118427331, 30.93887908693784, 124.2,
                108.6254449580645, 30.93797233622194, 124.2,
                108.628862315682, 30.9360053158578, 124.2,
                108.6346607022271, 30.93176261705618, 124.2,
                108.6364582447813, 30.93107665497433, 124.2,
                108.6465155707897, 30.92801581412093, 124.2,
                108.6481767132372, 30.92760330765995, 124.2,
                108.6513294970622, 30.9267317021401, 124.2,
                108.653645600308, 30.9260816033202, 124.2,
                108.6554746077162, 30.92556819030235, 124.2,
                108.6587040301151, 30.92466159636616, 124.2,
                108.6597032411183, 30.92378851349266, 124.2,
                108.6606700655202, 30.92294370682222, 124.2,
                108.6621815639318, 30.9216229225639, 124.2,
                108.6644633607771, 30.9196289311118, 124.2,
                108.6656588779222, 30.91858415698528, 124.2,
                108.6704778609202, 30.91769946871706, 124.2,
                108.6739411569977, 30.91604619860732, 124.2,
                108.6763129940159, 30.91491387129175, 124.2,
                108.6776144423929, 30.91103460459807, 124.2,
                108.6791546821968, 30.90716258215008, 124.2,
                108.6825374259442, 30.90604963352001, 124.2,
                108.689204185874, 30.90386405774807, 124.2,
                108.6938088493996, 30.9029301433413, 124.2,
                108.6985555769899, 30.90196722565588, 124.2,
                108.7010842032776, 30.90145419165328, 124.2,
                108.7011870491873, 30.89612279655859, 124.2,
                108.7031820123564, 30.89209117900787, 124.2,
                108.7099812169457, 30.88978132794809, 124.2,
                108.7133963375591, 30.89003681102848, 124.2,
                108.718890082048, 30.89115362807562, 124.2,
                108.7242548793913, 30.89232511007743, 124.2,
                108.7265748163565, 30.89362270135074, 124.2,
                108.7278600607838, 30.89536771493384, 124.2,
                108.7299253709105, 30.8981716833306, 124.2,
                108.7373709438088, 30.90000844667915, 124.2,
                108.7432486235259, 30.90500471958789, 124.2,
                108.7482857200342, 30.90390133240406, 124.2,
                108.7515147413445, 30.90358961225327, 124.2,
                108.7542618816298, 30.90689433236324, 124.2,
                108.7559659239165, 30.9094184912396, 124.2,
                108.7602975656511, 30.91120359334329, 124.2,
                108.7669496723442, 30.91436965206585, 124.2,
                108.7713067139775, 30.91644307667705, 124.2,
                108.7727892187056, 30.91565166451347, 124.2,
                108.7750703616839, 30.91213032552899, 124.2,
                108.7762496010116, 30.9125527780284, 124.2,
                108.7775197603721, 30.91300778553452, 124.2,
                108.779322635686, 30.91640049754272, 124.2,
                108.7810238870023, 30.91699485297858, 124.2,
                108.7825927298281, 30.91754292311584, 124.2,
                108.7841938294819, 30.91810223577529, 124.2,
                108.7857683951745, 30.91865225341076, 124.2,
                108.7883157496898, 30.91943348700566, 124.2,
                108.7911890568802, 30.92199645356898, 124.2,
                108.7938435050778, 30.92582906009107, 124.2,
                108.8091757916635, 30.93352211735824, 124.2,
                108.8129918599861, 30.94021590551524, 124.2,
                108.8157371851068, 30.94194950618507, 124.2,
                108.8234125023347, 30.94236778310522, 124.2,
                108.8267867769421, 30.94131659111699, 124.2,
                108.8310725595717, 30.94607514640338, 124.2,
                108.8324770920432, 30.94626742077174, 124.2,
                108.8351634075559, 30.94595760940616, 124.2,
                108.8487506042705, 30.94609485860745, 124.2,
                108.861493227832, 30.94728161853426, 124.2,
                108.8622743097355, 30.94766277142718, 124.2,
                108.8663797558928, 30.94782128279631, 124.2,
                108.873993325153, 30.94777002705086, 124.2,
                108.8797701332691, 30.94763785575741, 124.2,
                108.8894465394947, 30.9469112991044, 124.2,
                108.8987311313709, 30.94614534869154, 124.2,
                108.9037509764943, 30.94483302744484, 124.2,
                108.9054934196754, 30.94406763541456, 124.2,
                108.905956610374, 30.94100452284688, 124.2,
                108.9081768496562, 30.93884794636217, 124.2,
                108.9095671630827, 30.93859834722403, 124.2,
                108.9146748299067, 30.9398012353765, 124.2,
                108.9175312135853, 30.93953966783289, 124.2,
                108.9208202679629, 30.93763393697635, 124.2,
                108.9191032854745, 30.93516381684241, 124.2,
                108.9186321083807, 30.93307875801169, 124.2,
                108.9205293214254, 30.92839689266941, 124.2,
                108.9235402967231, 30.92671579589, 124.2,
                108.9317415729514, 30.92439764437666, 124.2,
                108.9358537951175, 30.91670916379118, 124.2,
                108.9475295524757, 30.91924606395566, 124.2,
                108.9599216365729, 30.91681387377623, 124.2,
                108.9641885387795, 30.91780095199994, 124.2,
                108.9678081044493, 30.9181313004457, 124.2,
                108.980099495227, 30.91442552714541, 124.2,
                108.9839880608536, 30.91429330641833, 124.2,
                108.9861823852893, 30.91534385362183, 124.2,
                108.9910508430214, 30.91494801175809, 124.2,
                108.9948858230077, 30.91568744129944, 124.2,
                108.9994754850568, 30.91553070018491, 124.2,
                109.0023989244235, 30.91415225558805, 124.2,
                109.0087882539239, 30.91441669949325, 124.2,
                109.0164433407383, 30.91275061499388, 124.2,
                109.0241253412209, 30.91009218493006, 124.2,
                109.0250498300405, 30.91192576621742, 124.2,
                109.0256980290142, 30.91232246906728, 124.2,
                109.0300030779044, 30.91284185830741, 124.2,
                109.0329140896903, 30.91388661798907, 124.2,
                109.037534433363, 30.91400234957582, 124.2,
                109.0392338381924, 30.91567149374295, 124.2,
                109.0400111888962, 30.91680075104988, 124.2,
                109.042886746541, 30.91744371589436, 124.2,
                109.0467697171417, 30.91838589890236, 124.2,
                109.042872386017, 30.92855255386573, 124.2,
                109.0440705957976, 30.93029183424198, 124.2,
                109.0497022740842, 30.93437557041115, 124.2,
                109.0605679920791, 30.9373940490165, 124.2,
                109.0631328720602, 30.93168897651557, 124.2,
                109.0695381024663, 30.92852378442851, 124.2,
                109.0793221019174, 30.93324950074981, 124.2,
                109.0925790139157, 30.93234947725688, 124.2,
                109.0970607475032, 30.93549564046954, 124.2,
                109.1086343863117, 30.94142439180365, 124.2,
                109.1120073118885, 30.94288095274112, 124.2,
                109.1167382182443, 30.94262616274643, 124.2,
                109.1205389120183, 30.94053872854614, 124.2,
                109.1255411093636, 30.93602011719182, 124.2,
                109.1322067338716, 30.93665123804626, 124.2,
                109.1390731642613, 30.93680984557014, 124.2,
                109.1459362989459, 30.93876146203099, 124.2,
                109.1534604375363, 30.94020821969092, 124.2,
                109.1562204272685, 30.94014607157623, 124.2,
                109.1599544956956, 30.94006189576086, 124.2,
                109.1697100122329, 30.93954294712593, 124.2,
                109.1806290438538, 30.93797631355778, 124.2,
                109.1882132627764, 30.94318967022014, 124.2,
                109.1937632504411, 30.94771563707257, 124.2,
                109.1953723740792, 30.94820263353737, 124.2,
                109.1994990447135, 30.94606282943693, 124.2,
                109.2037102103707, 30.95396394337149, 124.2,
                109.2065262914639, 30.9577016829588, 124.2,
                109.2137980453719, 30.95990666653546, 124.2,
                109.2136548925077, 30.96024851883506, 124.2,
                109.2136225904426, 30.96030578981573, 124.2,
                109.2136101566017, 30.96035072237699, 124.2,
                109.2136106108387, 30.96038664054202, 124.2,
                109.2136481884642, 30.96047384938054, 124.2,
                109.2136846445256, 30.96053550880993, 124.2,
                109.2136669355304, 30.96091394875211, 124.2,
                109.2135553226771, 30.9612922352715, 124.2,
                109.2134951396407, 30.96183258743103, 124.2,
                109.2134815589164, 30.96215321466775, 124.2,
                109.2134496068988, 30.96241574092768, 124.2,
                109.2133697524502, 30.96279526217685, 124.2,
                109.2133077064562, 30.96318841747442, 124.2,
                109.2133099167216, 30.96336321446258, 124.2,
                109.2131884822431, 30.96390275443057, 124.2,
                109.2131755759833, 30.96444831531305, 124.2,
                109.2131754109572, 30.96486824498739, 124.2,
                109.2130821116579, 30.96561920496112, 124.2,
                109.2121722832071, 30.96649290300668, 124.2,
                109.2113473635883, 30.96748741060222, 124.2,
                109.2098369813835, 30.96834105364141, 124.2,
                109.2090915816717, 30.96886656299745, 124.2,
                109.2087653960669, 30.96905011739005, 124.2,
                109.2081012443404, 30.97008199826034, 124.2,
                109.2076877461903, 30.97106005416889, 124.2,
                109.2076259666635, 30.97158347314569, 124.2,
                109.2076348888661, 30.97172368113114, 124.2,
                109.2074968987552, 30.97232263336435, 124.2,
                109.2076084148417, 30.97305459707407, 124.2,
                109.2077169971391, 30.97355349871566, 124.2,
                109.2077881321867, 30.9741600945249, 124.2,
                109.2079604394257, 30.97467680180195, 124.2,
                109.208155924881, 30.97502465904213, 124.2,
                109.2085004937533, 30.97670615083282, 124.2,
                109.2064629271887, 30.97869317280134, 124.2,
                109.2041344573179, 30.98102966433951, 124.2,
                109.2013830679375, 30.98084018899957, 124.2,
                109.2004284214767, 30.98077443304831, 124.2,
                109.1989621607385, 30.9806734232046, 124.2,
                109.1956894018183, 30.98046581160242, 124.2,
                109.1927588820335, 30.98079203840616, 124.2,
                109.1906839340165, 30.98149918656315, 124.2,
                109.1899862874927, 30.98142380035256, 124.2,
                109.1888533433677, 30.98064264428475, 124.2,
                109.1879664130357, 30.98038250411779, 124.2,
                109.187266572143, 30.98037828482433, 124.2,
                109.1868892262872, 30.98037600825752, 124.2,
                109.1865262272101, 30.98037381720555, 124.2,
                109.1859609197642, 30.98037040299379, 124.2,
                109.185173795856, 30.98036564498424, 124.2,
                109.184356774079, 30.98050026345262, 124.2,
                109.1832512189446, 30.98068241399514, 124.2,
                109.1827548155224, 30.98076419781165, 124.2,
                109.1821632834395, 30.98086165167382, 124.2,
                109.1809054442839, 30.9810688688287, 124.2,
                109.1794923610064, 30.98130164538801, 124.2,
                109.1779799782887, 30.98155076120803, 124.2,
                109.1759528191553, 30.98188464002275, 124.2,
                109.1723791059563, 30.98247315789922, 124.2,
                109.1679511089949, 30.98245639539904, 124.2,
                109.1674989526233, 30.97897628148684, 124.2,
                109.1670348030304, 30.97683751122514, 124.2,
                109.1665796910767, 30.97543993501962, 124.2,
                109.1648854610993, 30.97507784478971, 124.2,
                109.1632394842346, 30.97482312179395, 124.2,
                109.1611124431911, 30.97489616766556, 124.2,
                109.1596268385079, 30.97496342231856, 124.2,
                109.1588706739906, 30.97453891951649, 124.2,
                109.1579215729961, 30.97368485030767, 124.2,
                109.1568124698955, 30.97253569549361, 124.2,
                109.1561865101757, 30.97152637667697, 124.2,
                109.1564055778459, 30.9702305470156, 124.2,
                109.1551296441578, 30.96951415968359, 124.2,
                109.1536493852672, 30.9687187171021, 124.2,
                109.1520785266605, 30.96819362179359, 124.2,
                109.1498476037531, 30.96872565167386, 124.2,
                109.1475926270095, 30.96855701203131, 124.2,
                109.1458052006543, 30.96823592924718, 124.2,
                109.1445030640051, 30.96793747979268, 124.2,
                109.1423934004873, 30.96814484062083, 124.2,
                109.1394986051351, 30.96863923500967, 124.2,
                109.1378875983762, 30.9686803880794, 124.2,
                109.1366617822184, 30.968219454348, 124.2,
                109.1362912792824, 30.96731969620852, 124.2,
                109.1352621093852, 30.96589538398142, 124.2,
                109.1350394828166, 30.96477353270311, 124.2,
                109.1349307880136, 30.96422579145711, 124.2,
                109.1348168618751, 30.96365168072244, 124.2,
                109.115621542522, 30.96137615124556, 124.2,
                109.1135674157237, 30.96268946673237, 124.2,
                109.110895010061, 30.9624935552999, 124.2,
                109.1086237826346, 30.96232700965872, 124.2,
                109.1071492284287, 30.96221886111057, 124.2,
                109.1059443195878, 30.96213047651423, 124.2,
                109.1043414018028, 30.96201287875096, 124.2,
                109.1028654083547, 30.96180955231454, 124.2,
                109.1013894206356, 30.96160620886083, 124.2,
                109.1004028980753, 30.9630721623337, 124.2,
                109.0994163458432, 30.96453810866312, 124.2,
                109.0976757605563, 30.96380242521172, 124.2,
                109.0959352013954, 30.96306671759537, 124.2,
                109.0936545575607, 30.96189544491394, 124.2,
                109.0918469938709, 30.96096708281148, 124.2,
                109.089640135107, 30.9598335837584, 124.2,
                109.0877494476494, 30.95904744150821, 124.2,
                109.0857761363214, 30.95822690067348, 124.2,
                109.0844099640391, 30.95765879371925, 124.2,
                109.0819122641286, 30.95662009861127, 124.2,
                109.0802363088586, 30.95663411865199, 124.2,
                109.0785603524164, 30.9566481169661, 124.2,
                109.0770824161866, 30.95523683160804, 124.2,
                109.0764006212717, 30.95597369454106, 124.2,
                109.0760364542661, 30.95636726900276, 124.2,
                109.0756908234629, 30.95674080654004, 124.2,
                109.0754909183266, 30.95695685058566, 124.2,
                109.075195843376, 30.95727574546848, 124.2,
                109.0749507221846, 30.95754065198259, 124.2,
                109.0738993637681, 30.95867685083572, 124.2,
                109.0703170018519, 30.95966662513709, 124.2,
                109.0696240601408, 30.95964713531269, 124.2,
                109.0703279203535, 30.9611885689438, 124.2,
                109.0690191027745, 30.96158744187935, 124.2,
                109.0682601930875, 30.9615768238198, 124.2,
                109.0674675330606, 30.96144124511146, 124.2,
                109.0660017386387, 30.96058051058436, 124.2,
                109.0653180542747, 30.9604153372276, 124.2,
                109.0646728737772, 30.96012621593697, 124.2,
                109.064498633604, 30.95978146817173, 124.2,
                109.0644363408443, 30.9592515816784, 124.2,
                109.0638039861428, 30.95869916858095, 124.2,
                109.0630900592651, 30.95840052529482, 124.2,
                109.0623469989475, 30.95821997311024, 124.2,
                109.0615064386948, 30.95813533236574, 124.2,
                109.060511773564, 30.95783262056187, 124.2,
                109.0598845767194, 30.95753130648732, 124.2,
                109.058946926809, 30.95688263801526, 124.2,
                109.0580857639933, 30.95595297707886, 124.2,
                109.0579698865434, 30.95586879023502, 124.2,
                109.0571996322677, 30.95509575330589, 124.2,
                109.0566217040134, 30.95475938838765, 124.2,
                109.0562621238552, 30.95448923013784, 124.2,
                109.0560052966957, 30.95442918849077, 124.2,
                109.055321799173, 30.95452660526287, 124.2,
                109.0548269474057, 30.95457428708266, 124.2,
                109.0544066323663, 30.95479879655167, 124.2,
                109.0530340451104, 30.95538734972775, 124.2,
                109.0477675365691, 30.95636272659122, 124.2,
                109.0365514219075, 30.95808898098541, 124.2,
                109.0306695860492, 30.9587463767355, 124.2,
                109.024475578007, 30.95846814292372, 124.2,
                109.0226572104402, 30.95853324170548, 124.2,
                109.0211610900898, 30.95846067059314, 124.2,
                109.0202888194861, 30.95814214041876, 124.2,
                109.0194419041374, 30.95761230364122, 124.2,
                109.0187366083913, 30.95685289939211, 124.2,
                109.0179798116131, 30.95637786088938, 124.2,
                109.017362898785, 30.95599469412135, 124.2,
                109.0168670329552, 30.95596070813379, 124.2,
                109.0165504487267, 30.95602106370635, 124.2,
                109.0159515101989, 30.95621344381767, 124.2,
                109.0152256824859, 30.95650291860473, 124.2,
                109.0142070310821, 30.95671815209199, 124.2,
                109.0139640490526, 30.95667713072831, 124.2,
                109.0123113704693, 30.95626468946421, 124.2,
                109.0116631243922, 30.9560545020914, 124.2,
                109.0107761534779, 30.95589915366426, 124.2,
                109.0098065301719, 30.95581651519814, 124.2,
                109.0081791965414, 30.95583112825718, 124.2,
                109.0073288998915, 30.95571322046571, 124.2,
                109.0067433216699, 30.9556946077701, 124.2,
                109.0052253670682, 30.95584700620651, 124.2,
                109.0021813146026, 30.9564109018841, 124.2,
                109.0008231125697, 30.9564227352134, 124.2,
                108.9993647458439, 30.9564353976145, 124.2,
                108.998701282333, 30.95635000591579, 124.2,
                108.9980082004677, 30.95568023269349, 124.2,
                108.9968558596655, 30.95468206596492, 124.2,
                108.9965351464297, 30.95439217192066, 124.2,
                108.9963108276886, 30.95425018664854, 124.2,
                108.9960606821556, 30.95428113972813, 124.2,
                108.9957843832894, 30.9544562480427, 124.2,
                108.994728425883, 30.95508431207987, 124.2,
                108.9934975505576, 30.95646705575821, 124.2,
                108.9926534806899, 30.95712683763212, 124.2,
                108.9901402502733, 30.95821196694587, 124.2,
                108.9895089564358, 30.95855949116626, 124.2,
                108.9865549437049, 30.96017083335346, 124.2,
                108.9850809357765, 30.95999369734597, 124.2,
                108.9767872069152, 30.95611051730224, 124.2,
                108.9749745226141, 30.95385799493279, 124.2,
                108.971230079445, 30.95113342218073, 124.2,
                108.9664385809787, 30.9439631978113, 124.2,
                108.9647919156064, 30.94866916253877, 124.2,
                108.9633497899832, 30.95075831116163, 124.2,
                108.9600391002529, 30.95392131068155, 124.2,
                108.9593226012287, 30.95406644017634, 124.2,
                108.9587478759866, 30.95444067739927, 124.2,
                108.9583640256145, 30.95495723655137, 124.2,
                108.9580864534048, 30.95552090931285, 124.2,
                108.9575399043821, 30.95681853589176, 124.2,
                108.9573022703822, 30.95707231292039, 124.2,
                108.9568478671087, 30.9572584345079, 124.2,
                108.9564351543346, 30.95718992775726, 124.2,
                108.9552956870764, 30.95685400158885, 124.2,
                108.954765240042, 30.95671449757993, 124.2,
                108.9542252983047, 30.9567189927884, 124.2,
                108.9534244195801, 30.9567880578888, 124.2,
                108.952390766517, 30.95695017676974, 124.2,
                108.9513883863485, 30.95728969608657, 124.2,
                108.9513579499281, 30.95729384514753, 124.2,
                108.9508173070415, 30.95798858970705, 124.2,
                108.9501878967777, 30.95972157559926, 124.2,
                108.9491200384767, 30.96128697884276, 124.2,
                108.9486675399014, 30.96182195544924, 124.2,
                108.9479881266019, 30.9618118099746, 124.2,
                108.9462504167022, 30.96120018870461, 124.2,
                108.9438872082005, 30.96043277198987, 124.2,
                108.94035061425, 30.95972094340397, 124.2,
                108.9386774533047, 30.9595691418327, 124.2,
                108.937079900776, 30.95934127775643, 124.2,
                108.9362090660167, 30.95912774485983, 124.2,
                108.9355989514948, 30.95933424320351, 124.2,
                108.9349924326171, 30.95986695559659, 124.2,
                108.9345527353042, 30.96091100818477, 124.2,
                108.9337597533041, 30.96133508341823, 124.2,
                108.9301816443448, 30.962672186938, 124.2,
                108.9274944069179, 30.96364196517925, 124.2,
                108.9246393707837, 30.96534120903938, 124.2,
                108.9212909150043, 30.96702093725324, 124.2,
                108.9142375477389, 30.96741349503269, 124.2,
                108.894435114851, 30.96500012770789, 124.2,
                108.8941443363349, 30.96497296451985, 124.2,
                108.8938865729844, 30.96496255062947, 124.2,
                108.8917244463989, 30.96573037589151, 124.2,
                108.8903684315608, 30.96596915945164, 124.2,
                108.8887525565443, 30.96668852681671, 124.2,
                108.886916217507, 30.96757155357907, 124.2,
                108.8856242643634, 30.96822210652858, 124.2,
                108.8849800881204, 30.96833844764762, 124.2,
                108.8848695585088, 30.96795040863496, 124.2,
                108.8846496061068, 30.96767864220435, 124.2,
                108.8840232967887, 30.96688223646979, 124.2,
                108.883951128379, 30.9667857002354, 124.2,
                108.8833457462253, 30.96597589996554, 124.2,
                108.8825721833435, 30.96547330748646, 124.2,
                108.8820687419608, 30.96524687508105, 124.2,
                108.8814104161737, 30.96511759902767, 124.2,
                108.8807202801101, 30.96514212174435, 124.2,
                108.8800187994545, 30.96514750066882, 124.2,
                108.8795481728043, 30.96486324993987, 124.2,
                108.8792521245769, 30.9642322215287, 124.2,
                108.8792018063721, 30.96365058261426, 124.2,
                108.87920152029, 30.96364727570668, 124.2,
                108.8789403699148, 30.96315991290444, 124.2,
                108.8778156251884, 30.96314934788658, 124.2,
                108.8765320418998, 30.9636504093014, 124.2,
                108.8763738674935, 30.96371215325292, 124.2,
                108.8752125672655, 30.96447911264517, 124.2,
                108.87432327355, 30.96516719904121, 124.2,
                108.8738118794349, 30.96579002906462, 124.2,
                108.8736841526723, 30.96588927964436, 124.2,
                108.8736313011308, 30.96592644576097, 124.2,
                108.8728616031834, 30.96611655337594, 124.2,
                108.8691012334827, 30.96554707197845, 124.2,
                108.8673748187758, 30.96698597039616, 124.2,
                108.8660488167024, 30.96694889120682, 124.2,
                108.8654812186919, 30.9669210049857, 124.2,
                108.8646444097289, 30.96703553107954, 124.2,
                108.8641077963123, 30.96715204390803, 124.2,
                108.8634115621953, 30.96705351079957, 124.2,
                108.8620358570714, 30.96597195431544, 124.2,
                108.8601468360553, 30.96550094105261, 124.2,
                108.8598361814559, 30.9651147076368, 124.2,
                108.8594341404771, 30.96467302169946, 124.2,
                108.8593344023576, 30.9645792432152, 124.2,
                108.8590450676885, 30.96464154362382, 124.2,
                108.8581647711935, 30.96513028469388, 124.2,
                108.857837691377, 30.96547932367772, 124.2,
                108.8573762633273, 30.96609746429804, 124.2,
                108.8572661595943, 30.96662964795613, 124.2,
                108.8571039224219, 30.96697679833184, 124.2,
                108.8567827074534, 30.96712505920281, 124.2,
                108.856378755797, 30.96705873841318, 124.2,
                108.8559254326622, 30.96690710400772, 124.2,
                108.8548739317897, 30.966454468603, 124.2,
                108.8539755774391, 30.96629515381444, 124.2,
                108.8534699530143, 30.9663588728775, 124.2,
                108.8522532718606, 30.966688865267, 124.2,
                108.8516550889342, 30.96668187810284, 124.2,
                108.850511128087, 30.9660857994711, 124.2,
                108.8495706590152, 30.96531364441941, 124.2,
                108.8486391977263, 30.96464850906064, 124.2,
                108.8479847857273, 30.96360013411487, 124.2,
                108.8468513949136, 30.96310107953003, 124.2,
                108.8454053056074, 30.96261536036452, 124.2,
                108.844555513842, 30.96231019631124, 124.2,
                108.8438958622116, 30.96208985813172, 124.2,
                108.843034868139, 30.96180784508661, 124.2,
                108.8424627900362, 30.96150890582109, 124.2,
                108.8419576619215, 30.96125788516151, 124.2,
                108.8417548246433, 30.96115237911562, 124.2,
                108.8415103941129, 30.96105519290883, 124.2,
                108.8412087262208, 30.96110554236048, 124.2,
                108.8406240474694, 30.96121001523353, 124.2,
                108.8403874246954, 30.9612722369946, 124.2,
                108.8400685334255, 30.96171589489435, 124.2,
                108.839670775819, 30.96221328373476, 124.2,
                108.8393774337486, 30.96260035138506, 124.2,
                108.8392154120866, 30.96296612954582, 124.2,
                108.8390331221518, 30.96334463884843, 124.2,
                108.8376887140865, 30.96397052262679, 124.2,
                108.8369131863175, 30.96394199173789, 124.2,
                108.835783420569, 30.96338967374377, 124.2,
                108.8345761144383, 30.96294393727824, 124.2,
                108.8340768277004, 30.96294842767311, 124.2,
                108.8318648545433, 30.96304454311767, 124.2,
                108.8294306741286, 30.96317537423701, 124.2,
                108.8283482865523, 30.96262647264577, 124.2,
                108.8274575583112, 30.96182638372904, 124.2,
                108.8199581957134, 30.96014686042712, 124.2,
                108.8190112606021, 30.96098407921797, 124.2,
                108.8095091277595, 30.96120712835705, 124.2,
                108.8074004156875, 30.95816364010349, 124.2,
                108.8054151736735, 30.95768738027836, 124.2,
                108.7988986506001, 30.9567586610908, 124.2,
                108.7961984625551, 30.95647503821829, 124.2,
                108.7857335293252, 30.9542668109053, 124.2,
                108.7753986622028, 30.94966233612857, 124.2,
                108.7594160325211, 30.94100784792138, 124.2,
                108.7487437501568, 30.93816111584707, 124.2,
                108.7458817430042, 30.93970050544189, 124.2,
                108.7430873540989, 30.94330834051821, 124.2,
                108.7424332131525, 30.94373541053856, 124.2,
                108.7417386856997, 30.9440717859178, 124.2,
                108.7412917707729, 30.9440620855466, 124.2,
                108.7406920768081, 30.94378180358509, 124.2,
                108.740541877941, 30.94329220189448, 124.2,
                108.7364597722321, 30.94279393800153, 124.2,
                108.7331052928409, 30.94186477527062, 124.2,
                108.7323606423045, 30.94172754049835, 124.2,
                108.7311597557934, 30.94185214530292, 124.2,
                108.7291886786703, 30.94233878983306, 124.2,
                108.7275692036094, 30.94154397509486, 124.2,
                108.7240150095251, 30.9401832911337, 124.2,
                108.7206825216767, 30.93790763232492, 124.2,
                108.7053572378019, 30.93544807978617, 124.2,
                108.7098004368037, 30.94853474372074, 124.2,
                108.7096573473733, 30.95364578261288, 124.2,
                108.6975397962836, 30.95928588411996, 124.2,
                108.6919301372572, 30.9601173153799, 124.2,
                108.689776346619, 30.96036387697417, 124.2,
                108.6879767577874, 30.96103036921672, 124.2,
                108.6866798010017, 30.96184290227372, 124.2,
                108.6854515187525, 30.96262592868346, 124.2,
                108.683623098594, 30.96352777093517, 124.2,
                108.6812224170221, 30.96341295406671, 124.2,
                108.680306366445, 30.96366272479659, 124.2,
                108.6786970563209, 30.96358874215671, 124.2,
                108.6761666140928, 30.96347237275166, 124.2,
                108.6753987459008, 30.96225835671073, 124.2,
                108.6749914620995, 30.9616144176439, 124.2,
                108.6746308973494, 30.96104433559682, 124.2,
                108.673569140726, 30.96145990468658, 124.2,
                108.6725073747714, 30.96187546515954, 124.2,
                108.6725857203681, 30.96505883103274, 124.2,
                108.6719261261409, 30.96689534309222, 124.2,
                108.6715173544135, 30.96811572233973, 124.2,
                108.6706635823037, 30.97066453882066, 124.2,
                108.6694081764558, 30.97054702750376, 124.2,
                108.6680850995365, 30.97042316834658, 124.2,
                108.6666942809443, 30.97029295260644, 124.2,
                108.6656427110232, 30.97019448891437, 124.2,
                108.6646795755439, 30.97010429807466, 124.2,
                108.6637899746409, 30.97002098668717, 124.2,
                108.6629227967558, 30.96991509246951, 124.2,
                108.6628898851645, 30.97073173307825, 124.2,
                108.6621778217929, 30.97218754324856, 124.2,
                108.6599191708988, 30.97254449759229, 124.2,
                108.657765692126, 30.97180560754863, 124.2,
                108.6557923537289, 30.97048827088632, 124.2,
                108.6544339386937, 30.96914441068513, 124.2,
                108.653147181584, 30.9695181925675, 124.2,
                108.6517402904917, 30.96992685347267, 124.2,
                108.6506183012786, 30.97025274524916, 124.2,
                108.6491374962036, 30.97068284005514, 124.2,
                108.6467825816412, 30.97141233656004, 124.2,
                108.6407046135696, 30.97343428575487, 124.2,
                108.6165395926608, 30.97010325441048, 124.2,
                108.6165196647104, 30.96627703884486, 124.2,
                108.6153949880615, 30.96629857623281, 124.2,
                108.6094384602831, 30.9682162122454, 124.2,
                108.6013972420093, 30.96536869155307, 124.2,
                108.6003103023909, 30.96468243602517, 124.2,
                108.5994443893193, 30.9639918917205, 124.2,
                108.5985747616572, 30.96329836905378, 124.2,
                108.5977576230088, 30.96264669137645, 124.2,
                108.5968436429846, 30.96191776471946, 124.2,
                108.5959410718172, 30.96119791951566, 124.2,
                108.5948438084145, 30.9608521836584, 124.2,
                108.5935653331361, 30.96044933490462, 124.2,
                108.5911896308644, 30.95970070605672, 124.2,
                108.5895163908904, 30.95989128432119, 124.2,
                108.5873263666492, 30.95914868141827, 124.2,
                108.5864148988888, 30.95833463552352, 124.2,
                108.5857723933315, 30.95755302365039, 124.2,
                108.5853685781481, 30.95586151247759, 124.2,
                108.583784426191, 30.95551277147444, 124.2,
                108.583009020751, 30.9552683529672, 124.2,
                108.5826080617987, 30.95514196283833, 124.2,
                108.5819607615554, 30.95493791775254, 124.2,
                108.5816168111119, 30.95482949436236, 124.2,
                108.5812358797074, 30.95470941211273, 124.2,
                108.5802210773901, 30.95438950567713, 124.2,
                108.5789317621321, 30.95400860628575, 124.2,
                108.5772066463171, 30.95211701870945, 124.2,
                108.5759540028876, 30.95090383613536, 124.2,
                108.5750155204594, 30.94962485250636, 124.2,
                108.5748657118403, 30.94892042467294, 124.2,
                108.5722401342536, 30.94414967488483, 124.2,
                108.5719316101204, 30.94339608634615, 124.2,
                108.5716133830844, 30.94294360101586, 124.2,
                108.5710160008535, 30.94244212219245, 124.2,
                108.5709624273964, 30.94102730827385, 124.2,
                108.5702524120875, 30.93933651205527, 124.2,
                108.5705956935118, 30.93723757529342, 124.2,
                108.5727942080735, 30.93411533588948, 124.2,
                108.5691709986646, 30.93467600451173, 124.2,
                108.5675617487102, 30.93433969591495, 124.2,
                108.5666931658112, 30.93419517090638, 124.2,
                108.5635884527616, 30.93253695735513, 124.2
            ]),
            extrudedHeight: 124.2,
            perPositionHeight: true,
            material: Cesium.Color.ORANGE.withAlpha(0.4),
            outline: true,
            outlineColor: Cesium.Color.RED,
            outlineWidth: 5,
        }
    });

};
var lineList = [[-1795961.93555442, 5171675.44282574, 3261738.08122173],
[-1795963.59929962, 5171676.78567461, 3261735.05636765],
[-1795968.17246096, 5171677.89160987, 3261737.847423],
[-1795961.54840987, 5171681.83590465, 3261735.70177537],
[-1795960.74791146, 5171680.60673928, 3261735.93704189],
[-1795967.38111141, 5171676.67649256, 3261738.08000066],
[-1795966.58976186, 5171675.46137526, 3261738.31257833],
[-1795959.94741306, 5171679.37757390, 3261736.17230841],
[-1795959.14691465, 5171678.14840853, 3261736.40757492],
[-1795965.79841231, 5171674.24625795, 3261738.54515600],
[-1795965.00706276, 5171673.03114065, 3261738.77773366],
[-1795958.34641625, 5171676.91924316, 3261736.64284144],
[-1795961.54840987, 5171681.83590465, 3261735.70177537],
[-1795963.20442264, 5171680.84983095, 3261736.23818728],
[-1795960.01157788, 5171675.94721753, 3261737.17656449],
[-1795961.67673950, 5171674.97519190, 3261737.71028755],
[-1795964.86043541, 5171679.86375726, 3261736.77459919],
[-1795966.51644819, 5171678.87768356, 3261737.31101109],
[-1795963.34190113, 5171674.00316627, 3261738.24401061],
[-1795965.00706276, 5171673.03114065, 3261738.77773366],
[-1795968.17246096, 5171677.89160987, 3261737.84742300]];
function getpoly() {
    var pointsLin = [];
    for (var i in lineList) {
        var temop = new Cesium.Cartesian3(lineList[i][0], lineList[i][1], lineList[i][2]);
        pointsLin.push(temop);
    }
    console.log(pointsLin);
    viewer.entities.add({
        name: "plMeasue" + NewGuidCL(),
        polyline: {
            positions: pointsLin,
            width: 2,
            material: Cesium.Color.RED,
            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                color: Cesium.Color.RED,
            }),


        }
    });
}

var CC175list =
    [
    {
        "attributes": {
            "FID": 0,
            "Id": 0,
            "测窗": "10"
        },
        "geometry": {
            "paths": [
                [
                    [
                        555537.537,
                        3422700.418
                    ],
                    [
                        555539.957,
                        3422703.4
                    ],
                    [
                        555540.617,
                        3422702.993
                    ],
                    [
                        555538.206,
                        3422699.845
                    ],
                    [
                        555537.537,
                        3422700.418
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 1,
            "Id": 0,
            "测窗": "100"
        },
        "geometry": {
            "paths": [
                [
                    [
                        575830.511,
                        3425331.761
                    ],
                    [
                        575832.713,
                        3425333.45
                    ],
                    [
                        575834.511,
                        3425330.67
                    ],
                    [
                        575832.507,
                        3425329.315
                    ],
                    [
                        575830.511,
                        3425331.761
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 2,
            "Id": 0,
            "测窗": "LD1"
        },
        "geometry": {
            "paths": [
                [
                    [
                        610126.59,
                        3427412.58
                    ],
                    [
                        610125.934,
                        3427409.777
                    ],
                    [
                        610123.07,
                        3427411.636
                    ],
                    [
                        610123.75,
                        3427414.192
                    ],
                    [
                        610126.59,
                        3427412.58
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 3,
            "Id": 0,
            "测窗": "LD2"
        },
        "geometry": {
            "paths": [
                [
                    [
                        610249.297,
                        3427488.075
                    ],
                    [
                        610252.231,
                        3427489.772
                    ],
                    [
                        610252.388,
                        3427489.593
                    ],
                    [
                        610249.082,
                        3427487.638
                    ],
                    [
                        610249.297,
                        3427488.075
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 4,
            "Id": 0,
            "测窗": "LD3"
        },
        "geometry": {
            "paths": [
                [
                    [
                        610516.167,
                        3427599.221
                    ],
                    [
                        610519.291,
                        3427599.557
                    ],
                    [
                        610519.677,
                        3427597.139
                    ],
                    [
                        610516.487,
                        3427596.918
                    ],
                    [
                        610516.167,
                        3427599.221
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 5,
            "Id": 0,
            "测窗": "LD4"
        },
        "geometry": {
            "paths": [
                [
                    [
                        610813.356,
                        3427687.299
                    ],
                    [
                        610816.901,
                        3427689.147
                    ],
                    [
                        610817.611,
                        3427687.989
                    ],
                    [
                        610813.771,
                        3427686.56
                    ],
                    [
                        610813.356,
                        3427687.299
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 6,
            "Id": 0,
            "测窗": "LD5"
        },
        "geometry": {
            "paths": [
                [
                    [
                        610969.135,
                        3427735.042
                    ],
                    [
                        610973.266,
                        3427736.818
                    ],
                    [
                        610973.607,
                        3427735.159
                    ],
                    [
                        610969.517,
                        3427734.208
                    ],
                    [
                        610969.135,
                        3427735.042
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 7,
            "Id": 0,
            "测窗": "LD6"
        },
        "geometry": {
            "paths": [
                [
                    [
                        611099.605,
                        3427832.965
                    ],
                    [
                        611099.657,
                        3427837.937
                    ],
                    [
                        611100.157,
                        3427837.052
                    ],
                    [
                        611101.027,
                        3427832.726
                    ],
                    [
                        611099.605,
                        3427832.965
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 8,
            "Id": 0,
            "测窗": "101"
        },
        "geometry": {
            "paths": [
                [
                    [
                        576021.564,
                        3425513.305
                    ],
                    [
                        576023.904,
                        3425515.15
                    ],
                    [
                        576025.648,
                        3425513.205
                    ],
                    [
                        576022.925,
                        3425511.101
                    ],
                    [
                        576021.564,
                        3425513.305
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 9,
            "Id": 0,
            "测窗": "102"
        },
        "geometry": {
            "paths": [
                [
                    [
                        576340.407,
                        3425626.524
                    ],
                    [
                        576343.692,
                        3425628.184
                    ],
                    [
                        576344.257,
                        3425627.655
                    ],
                    [
                        576341.088,
                        3425625.464
                    ],
                    [
                        576340.407,
                        3425626.524
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 10,
            "Id": 0,
            "测窗": "103"
        },
        "geometry": {
            "paths": [
                [
                    [
                        576522.155,
                        3425752.467
                    ],
                    [
                        576525.543,
                        3425754.564
                    ],
                    [
                        576526.587,
                        3425753.085
                    ],
                    [
                        576522.999,
                        3425750.89
                    ],
                    [
                        576522.155,
                        3425752.467
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 11,
            "Id": 0,
            "测窗": "104"
        },
        "geometry": {
            "paths": [
                [
                    [
                        576713.484,
                        3425883.499
                    ],
                    [
                        576716.506,
                        3425885.994
                    ],
                    [
                        576717.664,
                        3425884.869
                    ],
                    [
                        576714.382,
                        3425882.279
                    ],
                    [
                        576713.484,
                        3425883.499
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 12,
            "Id": 0,
            "测窗": "105"
        },
        "geometry": {
            "paths": [
                [
                    [
                        576898.296,
                        3425964.927
                    ],
                    [
                        576901.627,
                        3425966.945
                    ],
                    [
                        576903.06,
                        3425964.874
                    ],
                    [
                        576900.147,
                        3425962.118
                    ],
                    [
                        576898.296,
                        3425964.927
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 13,
            "Id": 0,
            "测窗": "106"
        },
        "geometry": {
            "paths": [
                [
                    [
                        577116.902,
                        3426107.05
                    ],
                    [
                        577120.258,
                        3426107.864
                    ],
                    [
                        577121.43,
                        3426104.634
                    ],
                    [
                        577117.538,
                        3426103.756
                    ],
                    [
                        577116.902,
                        3426107.05
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 14,
            "Id": 0,
            "测窗": "107"
        },
        "geometry": {
            "paths": [
                [
                    [
                        577391.997,
                        3426218.837
                    ],
                    [
                        577395.883,
                        3426219.387
                    ],
                    [
                        577396.402,
                        3426216.999
                    ],
                    [
                        577392.123,
                        3426216.691
                    ],
                    [
                        577391.997,
                        3426218.837
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 15,
            "Id": 0,
            "测窗": "108"
        },
        "geometry": {
            "paths": [
                [
                    [
                        577601.981,
                        3426351.864
                    ],
                    [
                        577604.903,
                        3426352.504
                    ],
                    [
                        577605.745,
                        3426349.631
                    ],
                    [
                        577602.617,
                        3426348.69
                    ],
                    [
                        577601.981,
                        3426351.864
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 16,
            "Id": 0,
            "测窗": "109"
        },
        "geometry": {
            "paths": [
                [
                    [
                        577764.352,
                        3426374.151
                    ],
                    [
                        577767.406,
                        3426376.094
                    ],
                    [
                        577768.425,
                        3426374.568
                    ],
                    [
                        577764.975,
                        3426372.478
                    ],
                    [
                        577764.352,
                        3426374.151
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 17,
            "Id": 0,
            "测窗": "11"
        },
        "geometry": {
            "paths": [
                [
                    [
                        555732.357,
                        3422745.918
                    ],
                    [
                        555729.84,
                        3422741.891
                    ],
                    [
                        555730.35,
                        3422741.282
                    ],
                    [
                        555733.099,
                        3422745.429
                    ],
                    [
                        555732.357,
                        3422745.918
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 18,
            "Id": 0,
            "测窗": "110"
        },
        "geometry": {
            "paths": [
                [
                    [
                        577916.49,
                        3426559.949
                    ],
                    [
                        577917.495,
                        3426563.495
                    ],
                    [
                        577919.187,
                        3426563.319
                    ],
                    [
                        577917.322,
                        3426559.577
                    ],
                    [
                        577916.49,
                        3426559.949
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 19,
            "Id": 0,
            "测窗": "111"
        },
        "geometry": {
            "paths": [
                [
                    [
                        578168.515,
                        3426502.34
                    ],
                    [
                        578170.828,
                        3426499.736
                    ],
                    [
                        578169.747,
                        3426498.428
                    ],
                    [
                        578166.998,
                        3426500.173
                    ],
                    [
                        578168.515,
                        3426502.34
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 20,
            "Id": 0,
            "测窗": "112"
        },
        "geometry": {
            "paths": [
                [
                    [
                        578403.074,
                        3426540.406
                    ],
                    [
                        578405.595,
                        3426540.906
                    ],
                    [
                        578405.775,
                        3426537.962
                    ],
                    [
                        578403.664,
                        3426537.715
                    ],
                    [
                        578403.074,
                        3426540.406
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 21,
            "Id": 0,
            "测窗": "113"
        },
        "geometry": {
            "paths": [
                [
                    [
                        578627.404,
                        3426574.448
                    ],
                    [
                        578630.268,
                        3426574.692
                    ],
                    [
                        578630.909,
                        3426571.968
                    ],
                    [
                        578627.616,
                        3426571.964
                    ],
                    [
                        578627.404,
                        3426574.448
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 22,
            "Id": 0,
            "测窗": "114"
        },
        "geometry": {
            "paths": [
                [
                    [
                        578921.16,
                        3426615.468
                    ],
                    [
                        578924.208,
                        3426615.755
                    ],
                    [
                        578924.087,
                        3426613.086
                    ],
                    [
                        578921.511,
                        3426612.913
                    ],
                    [
                        578921.16,
                        3426615.468
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 23,
            "Id": 0,
            "测窗": "115"
        },
        "geometry": {
            "paths": [
                [
                    [
                        579136.573,
                        3426657.165
                    ],
                    [
                        579139.272,
                        3426657.674
                    ],
                    [
                        579139.436,
                        3426654.203
                    ],
                    [
                        579136.829,
                        3426653.696
                    ],
                    [
                        579136.573,
                        3426657.165
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 24,
            "Id": 0,
            "测窗": "116"
        },
        "geometry": {
            "paths": [
                [
                    [
                        579351.811,
                        3426691.381
                    ],
                    [
                        579355.481,
                        3426692
                    ],
                    [
                        579355.056,
                        3426688.699
                    ],
                    [
                        579352.191,
                        3426688.34
                    ],
                    [
                        579351.811,
                        3426691.381
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 25,
            "Id": 0,
            "测窗": "117"
        },
        "geometry": {
            "paths": [
                [
                    [
                        579592.438,
                        3426678.445
                    ],
                    [
                        579594.282,
                        3426679.12
                    ],
                    [
                        579595.82,
                        3426676.674
                    ],
                    [
                        579593.613,
                        3426676.028
                    ],
                    [
                        579592.438,
                        3426678.445
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 26,
            "Id": 0,
            "测窗": "118"
        },
        "geometry": {
            "paths": [
                [
                    [
                        579758.466,
                        3426765.387
                    ],
                    [
                        579758.915,
                        3426761.38
                    ],
                    [
                        579757.802,
                        3426761.431
                    ],
                    [
                        579757.45,
                        3426765.596
                    ],
                    [
                        579758.466,
                        3426765.387
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 27,
            "Id": 0,
            "测窗": "119"
        },
        "geometry": {
            "paths": [
                [
                    [
                        579868.73,
                        3426708.767
                    ],
                    [
                        579871.601,
                        3426708.463
                    ],
                    [
                        579871.388,
                        3426706.088
                    ],
                    [
                        579868.674,
                        3426705.526
                    ],
                    [
                        579868.73,
                        3426708.767
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 28,
            "Id": 0,
            "测窗": "12"
        },
        "geometry": {
            "paths": [
                [
                    [
                        555892.446,
                        3422902.987
                    ],
                    [
                        555893.16,
                        3422902.522
                    ],
                    [
                        555891.692,
                        3422899.065
                    ],
                    [
                        555890.993,
                        3422899.306
                    ],
                    [
                        555892.446,
                        3422902.987
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 29,
            "Id": 0,
            "测窗": "120"
        },
        "geometry": {
            "paths": [
                [
                    [
                        580213.724,
                        3426677.339
                    ],
                    [
                        580216.805,
                        3426677.609
                    ],
                    [
                        580217.042,
                        3426674.719
                    ],
                    [
                        580213.948,
                        3426674.397
                    ],
                    [
                        580213.724,
                        3426677.339
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 30,
            "Id": 0,
            "测窗": "121"
        },
        "geometry": {
            "paths": [
                [
                    [
                        580426.815,
                        3426701.548
                    ],
                    [
                        580429.824,
                        3426701.606
                    ],
                    [
                        580429.727,
                        3426698.841
                    ],
                    [
                        580426.898,
                        3426698.635
                    ],
                    [
                        580426.815,
                        3426701.548
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 31,
            "Id": 0,
            "测窗": "122"
        },
        "geometry": {
            "paths": [
                [
                    [
                        580616.91,
                        3426717.915
                    ],
                    [
                        580619.289,
                        3426717.903
                    ],
                    [
                        580618.867,
                        3426714.891
                    ],
                    [
                        580616.183,
                        3426715.21
                    ],
                    [
                        580616.91,
                        3426717.915
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 32,
            "Id": 0,
            "测窗": "123"
        },
        "geometry": {
            "paths": [
                [
                    [
                        580797.953,
                        3426717.254
                    ],
                    [
                        580800.453,
                        3426717.773
                    ],
                    [
                        580800.776,
                        3426714.335
                    ],
                    [
                        580798.492,
                        3426714.034
                    ],
                    [
                        580797.953,
                        3426717.254
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 33,
            "Id": 0,
            "测窗": "124"
        },
        "geometry": {
            "paths": [
                [
                    [
                        581067.955,
                        3426725.544
                    ],
                    [
                        581070.828,
                        3426725.892
                    ],
                    [
                        581070.067,
                        3426722.943
                    ],
                    [
                        581067.71,
                        3426723.038
                    ],
                    [
                        581067.955,
                        3426725.544
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 34,
            "Id": 0,
            "测窗": "125"
        },
        "geometry": {
            "paths": [
                [
                    [
                        581278.495,
                        3426752.02
                    ],
                    [
                        581281.654,
                        3426752.688
                    ],
                    [
                        581282.067,
                        3426749.542
                    ],
                    [
                        581279.123,
                        3426749.201
                    ],
                    [
                        581278.495,
                        3426752.02
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 35,
            "Id": 0,
            "测窗": "126"
        },
        "geometry": {
            "paths": [
                [
                    [
                        581556.499,
                        3426752.08
                    ],
                    [
                        581559.711,
                        3426752.322
                    ],
                    [
                        581560.111,
                        3426749.399
                    ],
                    [
                        581557.466,
                        3426748.856
                    ],
                    [
                        581556.499,
                        3426752.08
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 36,
            "Id": 0,
            "测窗": "128"
        },
        "geometry": {
            "paths": [
                [
                    [
                        581951.467,
                        3426825.438
                    ],
                    [
                        581953.909,
                        3426826.179
                    ],
                    [
                        581954.692,
                        3426823.857
                    ],
                    [
                        581951.738,
                        3426823.129
                    ],
                    [
                        581951.467,
                        3426825.438
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 37,
            "Id": 0,
            "测窗": "129"
        },
        "geometry": {
            "paths": [
                [
                    [
                        582242.891,
                        3426808.766
                    ],
                    [
                        582245.88,
                        3426808.741
                    ],
                    [
                        582246.142,
                        3426805.744
                    ],
                    [
                        582243.203,
                        3426805.975
                    ],
                    [
                        582242.891,
                        3426808.766
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 38,
            "Id": 0,
            "测窗": "13"
        },
        "geometry": {
            "paths": [
                [
                    [
                        555893.352,
                        3423160.077
                    ],
                    [
                        555893.957,
                        3423159.968
                    ],
                    [
                        555894.003,
                        3423156.016
                    ],
                    [
                        555893.128,
                        3423155.907
                    ],
                    [
                        555893.352,
                        3423160.077
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 39,
            "Id": 0,
            "测窗": "130"
        },
        "geometry": {
            "paths": [
                [
                    [
                        582372.828,
                        3426821.769
                    ],
                    [
                        582376.661,
                        3426822.593
                    ],
                    [
                        582377.134,
                        3426820.675
                    ],
                    [
                        582373.032,
                        3426820.192
                    ],
                    [
                        582372.828,
                        3426821.769
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 40,
            "Id": 0,
            "测窗": "131"
        },
        "geometry": {
            "paths": [
                [
                    [
                        582599.453,
                        3426823.723
                    ],
                    [
                        582603.429,
                        3426823.423
                    ],
                    [
                        582603.215,
                        3426821.152
                    ],
                    [
                        582599.558,
                        3426821.386
                    ],
                    [
                        582599.453,
                        3426823.723
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 41,
            "Id": 0,
            "测窗": "132"
        },
        "geometry": {
            "paths": [
                [
                    [
                        582880.247,
                        3426846.554
                    ],
                    [
                        582883.384,
                        3426846.969
                    ],
                    [
                        582883.546,
                        3426843.964
                    ],
                    [
                        582880.584,
                        3426843.6
                    ],
                    [
                        582880.247,
                        3426846.554
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 42,
            "Id": 0,
            "测窗": "133"
        },
        "geometry": {
            "paths": [
                [
                    [
                        583158.057,
                        3426846.193
                    ],
                    [
                        583161.125,
                        3426845.936
                    ],
                    [
                        583161.066,
                        3426843.392
                    ],
                    [
                        583158.147,
                        3426843.399
                    ],
                    [
                        583158.057,
                        3426846.193
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 43,
            "Id": 0,
            "测窗": "134"
        },
        "geometry": {
            "paths": [
                [
                    [
                        583275.189,
                        3426816.822
                    ],
                    [
                        583277.963,
                        3426816.951
                    ],
                    [
                        583278.478,
                        3426813.662
                    ],
                    [
                        583275.23,
                        3426813.316
                    ],
                    [
                        583275.189,
                        3426816.822
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 44,
            "Id": 0,
            "测窗": "135"
        },
        "geometry": {
            "paths": [
                [
                    [
                        583568.082,
                        3426851.782
                    ],
                    [
                        583572.022,
                        3426852.092
                    ],
                    [
                        583571.812,
                        3426849.504
                    ],
                    [
                        583568.249,
                        3426849.164
                    ],
                    [
                        583568.082,
                        3426851.782
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 45,
            "Id": 0,
            "测窗": "136"
        },
        "geometry": {
            "paths": [
                [
                    [
                        583748.328,
                        3426879.095
                    ],
                    [
                        583752.035,
                        3426880.412
                    ],
                    [
                        583752.905,
                        3426878.078
                    ],
                    [
                        583749.148,
                        3426877.021
                    ],
                    [
                        583748.328,
                        3426879.095
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 46,
            "Id": 0,
            "测窗": "137"
        },
        "geometry": {
            "paths": [
                [
                    [
                        584069.46,
                        3426934.494
                    ],
                    [
                        584072.472,
                        3426935.197
                    ],
                    [
                        584073.288,
                        3426932.128
                    ],
                    [
                        584069.799,
                        3426931.602
                    ],
                    [
                        584069.46,
                        3426934.494
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 47,
            "Id": 0,
            "测窗": "139"
        },
        "geometry": {
            "paths": [
                [
                    [
                        584552.549,
                        3426938.929
                    ],
                    [
                        584557.016,
                        3426939.384
                    ],
                    [
                        584557.298,
                        3426937.152
                    ],
                    [
                        584553.048,
                        3426936.352
                    ],
                    [
                        584552.549,
                        3426938.929
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 48,
            "Id": 0,
            "测窗": "140"
        },
        "geometry": {
            "paths": [
                [
                    [
                        584605.724,
                        3426821.267
                    ],
                    [
                        584608.542,
                        3426820.348
                    ],
                    [
                        584607.821,
                        3426817.122
                    ],
                    [
                        584604.879,
                        3426817.72
                    ],
                    [
                        584605.724,
                        3426821.267
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 49,
            "Id": 0,
            "测窗": "15"
        },
        "geometry": {
            "paths": [
                [
                    [
                        556392.096,
                        3423722.918
                    ],
                    [
                        556396.116,
                        3423725.773
                    ],
                    [
                        556396.556,
                        3423725.37
                    ],
                    [
                        556392.416,
                        3423722.508
                    ],
                    [
                        556392.096,
                        3423722.918
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 50,
            "Id": 0,
            "测窗": "16"
        },
        "geometry": {
            "paths": [
                [
                    [
                        556473.04,
                        3423753.678
                    ],
                    [
                        556474.061,
                        3423757.235
                    ],
                    [
                        556475.686,
                        3423756.73
                    ],
                    [
                        556474.156,
                        3423752.907
                    ],
                    [
                        556473.04,
                        3423753.678
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 51,
            "Id": 0,
            "测窗": "17"
        },
        "geometry": {
            "paths": [
                [
                    [
                        556554.609,
                        3423884.043
                    ],
                    [
                        556555.6,
                        3423883.088
                    ],
                    [
                        556558.138,
                        3423885.994
                    ],
                    [
                        556556.813,
                        3423887.175
                    ],
                    [
                        556554.609,
                        3423884.043
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 52,
            "Id": 0,
            "测窗": "18"
        },
        "geometry": {
            "paths": [
                [
                    [
                        556668.163,
                        3424018.69
                    ],
                    [
                        556665.258,
                        3424015.972
                    ],
                    [
                        556664.063,
                        3424016.803
                    ],
                    [
                        556666.924,
                        3424019.737
                    ],
                    [
                        556668.163,
                        3424018.69
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 53,
            "Id": 0,
            "测窗": "19"
        },
        "geometry": {
            "paths": [
                [
                    [
                        556836.278,
                        3424293.46
                    ],
                    [
                        556836.704,
                        3424293.06
                    ],
                    [
                        556832.885,
                        3424291.502
                    ],
                    [
                        556832.174,
                        3424292.385
                    ],
                    [
                        556836.278,
                        3424293.46
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 54,
            "Id": 0,
            "测窗": "XJ1"
        },
        "geometry": {
            "paths": [
                [
                    [
                        590890.092,
                        3423617.176
                    ],
                    [
                        590886.267,
                        3423617.657
                    ],
                    [
                        590886.458,
                        3423617.835
                    ],
                    [
                        590890.115,
                        3423617.276
                    ],
                    [
                        590890.092,
                        3423617.176
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 55,
            "Id": 0,
            "测窗": "XJ2"
        },
        "geometry": {
            "paths": [
                [
                    [
                        591554.553,
                        3423481.876
                    ],
                    [
                        591551.384,
                        3423481.874
                    ],
                    [
                        591551.375,
                        3423482.0399999998
                    ],
                    [
                        591554.544,
                        3423482.042
                    ],
                    [
                        591554.553,
                        3423481.876
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 56,
            "Id": 0,
            "测窗": "XJ3"
        },
        "geometry": {
            "paths": [
                [
                    [
                        592026.808,
                        3423575.835
                    ],
                    [
                        592023.514,
                        3423575.936
                    ],
                    [
                        592023.451,
                        3423576.277
                    ],
                    [
                        592026.983,
                        3423576.362
                    ],
                    [
                        592026.808,
                        3423575.835
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 57,
            "Id": 0,
            "测窗": "XJ4"
        },
        "geometry": {
            "paths": [
                [
                    [
                        592352.236,
                        3423587.044
                    ],
                    [
                        592348.354,
                        3423586.219
                    ],
                    [
                        592348.156,
                        3423587.881
                    ],
                    [
                        592352.759,
                        3423587.924
                    ],
                    [
                        592352.236,
                        3423587.044
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 58,
            "Id": 0,
            "测窗": "XJ5"
        },
        "geometry": {
            "paths": [
                [
                    [
                        592761.719,
                        3423599.848
                    ],
                    [
                        592758.449,
                        3423603.1
                    ],
                    [
                        592758.972,
                        3423602.974
                    ],
                    [
                        592761.923,
                        3423600.521
                    ],
                    [
                        592761.719,
                        3423599.848
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 59,
            "Id": 0,
            "测窗": "XJ6"
        },
        "geometry": {
            "paths": [
                [
                    [
                        593160.849,
                        3423651.783
                    ],
                    [
                        593156.82,
                        3423652.355
                    ],
                    [
                        593157.12,
                        3423654.473
                    ],
                    [
                        593161.186,
                        3423653.495
                    ],
                    [
                        593160.849,
                        3423651.783
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 60,
            "Id": 0,
            "测窗": "21"
        },
        "geometry": {
            "paths": [
                [
                    [
                        557062.59,
                        3424609.979
                    ],
                    [
                        557062.617,
                        3424611.557
                    ],
                    [
                        557067.475,
                        3424609.433
                    ],
                    [
                        557067.391,
                        3424609.104
                    ],
                    [
                        557062.59,
                        3424609.979
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 61,
            "Id": 0,
            "测窗": "217"
        },
        "geometry": {
            "paths": [
                [
                    [
                        581788.238,
                        3426803.983
                    ],
                    [
                        581792.238,
                        3426803.659
                    ],
                    [
                        581792.492,
                        3426802.207
                    ],
                    [
                        581788.373,
                        3426802.363
                    ],
                    [
                        581788.238,
                        3426803.983
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 62,
            "Id": 0,
            "测窗": "23"
        },
        "geometry": {
            "paths": [
                [
                    [
                        557318.576,
                        3425017.296
                    ],
                    [
                        557321.991,
                        3425019.476
                    ],
                    [
                        557322.39,
                        3425019.106
                    ],
                    [
                        557318.972,
                        3425016.667
                    ],
                    [
                        557318.576,
                        3425017.296
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 63,
            "Id": 0,
            "测窗": "24"
        },
        "geometry": {
            "paths": [
                [
                    [
                        557368.752,
                        3425079.848
                    ],
                    [
                        557370.865,
                        3425083.197
                    ],
                    [
                        557371.547,
                        3425083.085
                    ],
                    [
                        557369.481,
                        3425079.591
                    ],
                    [
                        557368.752,
                        3425079.848
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 64,
            "Id": 0,
            "测窗": "25"
        },
        "geometry": {
            "paths": [
                [
                    [
                        557702.898,
                        3425209.045
                    ],
                    [
                        557702.62,
                        3425209.5
                    ],
                    [
                        557705.691,
                        3425212.014
                    ],
                    [
                        557706.165,
                        3425211.399
                    ],
                    [
                        557702.898,
                        3425209.045
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 65,
            "Id": 0,
            "测窗": "26"
        },
        "geometry": {
            "paths": [
                [
                    [
                        557834.715,
                        3425318.771
                    ],
                    [
                        557831.182,
                        3425317.486
                    ],
                    [
                        557831.368,
                        3425317.299
                    ],
                    [
                        557834.656,
                        3425318.714
                    ],
                    [
                        557834.715,
                        3425318.771
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 66,
            "Id": 0,
            "测窗": "27"
        },
        "geometry": {
            "paths": [
                [
                    [
                        557876.74,
                        3425359.772
                    ],
                    [
                        557877.844,
                        3425359.238
                    ],
                    [
                        557880.854,
                        3425362.192
                    ],
                    [
                        557879.75,
                        3425363.336
                    ],
                    [
                        557876.74,
                        3425359.772
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 67,
            "Id": 0,
            "测窗": "28"
        },
        "geometry": {
            "paths": [
                [
                    [
                        558165.536,
                        3425532.603
                    ],
                    [
                        558169.099,
                        3425535.348
                    ],
                    [
                        558168.563,
                        3425535.618
                    ],
                    [
                        558164.908,
                        3425532.77
                    ],
                    [
                        558165.536,
                        3425532.603
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 68,
            "Id": 0,
            "测窗": "29"
        },
        "geometry": {
            "paths": [
                [
                    [
                        558468.001,
                        3425764.493
                    ],
                    [
                        558470.704,
                        3425767.318
                    ],
                    [
                        558469.984,
                        3425767.794
                    ],
                    [
                        558467.34,
                        3425765.192
                    ],
                    [
                        558468.001,
                        3425764.493
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 69,
            "Id": 0,
            "测窗": "30"
        },
        "geometry": {
            "paths": [
                [
                    [
                        558504.277,
                        3425815.261
                    ],
                    [
                        558503.514,
                        3425815.578
                    ],
                    [
                        558502.196,
                        3425812.162
                    ],
                    [
                        558503.038,
                        3425811.682
                    ],
                    [
                        558504.277,
                        3425815.261
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 70,
            "Id": 0,
            "测窗": "31"
        },
        "geometry": {
            "paths": [
                [
                    [
                        558505.899,
                        3425928.777
                    ],
                    [
                        558504.424,
                        3425932.655
                    ],
                    [
                        558505.13,
                        3425933.121
                    ],
                    [
                        558506.763,
                        3425929.41
                    ],
                    [
                        558505.899,
                        3425928.777
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 71,
            "Id": 0,
            "测窗": "315"
        },
        "geometry": {
            "paths": [
                [
                    [
                        590676.413,
                        3423695.612
                    ],
                    [
                        590672.534,
                        3423695.207
                    ],
                    [
                        590672.857,
                        3423696.859
                    ],
                    [
                        590676.536,
                        3423696.095
                    ],
                    [
                        590676.413,
                        3423695.612
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 72,
            "Id": 0,
            "测窗": "316"
        },
        "geometry": {
            "paths": [
                [
                    [
                        591202.039,
                        3423570.012
                    ],
                    [
                        591198.177,
                        3423570.376
                    ],
                    [
                        591198.084,
                        3423571.158
                    ],
                    [
                        591202.158,
                        3423570.767
                    ],
                    [
                        591202.039,
                        3423570.012
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 73,
            "Id": 0,
            "测窗": "319"
        },
        "geometry": {
            "paths": [
                [
                    [
                        592444.728,
                        3423579.071
                    ],
                    [
                        592440.752,
                        3423578.865
                    ],
                    [
                        592440.492,
                        3423579.923
                    ],
                    [
                        592444.339,
                        3423580.278
                    ],
                    [
                        592444.728,
                        3423579.071
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 74,
            "Id": 0,
            "测窗": "32"
        },
        "geometry": {
            "paths": [
                [
                    [
                        558684.215,
                        3426035.606
                    ],
                    [
                        558687.494,
                        3426032.197
                    ],
                    [
                        558687.404,
                        3426032.148
                    ],
                    [
                        558683.685,
                        3426035.27
                    ],
                    [
                        558684.215,
                        3426035.606
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 75,
            "Id": 0,
            "测窗": "320"
        },
        "geometry": {
            "paths": [
                [
                    [
                        592945.938,
                        3423645.884
                    ],
                    [
                        592941.831,
                        3423646.408
                    ],
                    [
                        592942.486,
                        3423647.816
                    ],
                    [
                        592946.123,
                        3423646.934
                    ],
                    [
                        592945.938,
                        3423645.884
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 76,
            "Id": 0,
            "测窗": "33"
        },
        "geometry": {
            "paths": [
                [
                    [
                        558780.034,
                        3425902.432
                    ],
                    [
                        558784.561,
                        3425904.256
                    ],
                    [
                        558784.874,
                        3425903.695
                    ],
                    [
                        558780.241,
                        3425902.025
                    ],
                    [
                        558780.034,
                        3425902.432
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 77,
            "Id": 0,
            "测窗": "34"
        },
        "geometry": {
            "paths": [
                [
                    [
                        558834.002,
                        3425932.155
                    ],
                    [
                        558837.082,
                        3425934.715
                    ],
                    [
                        558838.156,
                        3425933.099
                    ],
                    [
                        558834.503,
                        3425931.325
                    ],
                    [
                        558834.002,
                        3425932.155
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 78,
            "Id": 0,
            "测窗": "340"
        },
        "geometry": {
            "paths": [
                [
                    [
                        601419.197,
                        3424997.48
                    ],
                    [
                        601415.598,
                        3424997.887
                    ],
                    [
                        601415.457,
                        3424997.905
                    ],
                    [
                        601419.218,
                        3424997.554
                    ],
                    [
                        601419.197,
                        3424997.48
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 79,
            "Id": 0,
            "测窗": "341"
        },
        "geometry": {
            "paths": [
                [
                    [
                        601603.948,
                        3425002.186
                    ],
                    [
                        601598.67,
                        3425003.212
                    ],
                    [
                        601598.927,
                        3425003.876
                    ],
                    [
                        601604.032,
                        3425002.528
                    ],
                    [
                        601603.948,
                        3425002.186
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 80,
            "Id": 0,
            "测窗": "342"
        },
        "geometry": {
            "paths": [
                [
                    [
                        601944.268,
                        3425002.415
                    ],
                    [
                        601940.771,
                        3425003.486
                    ],
                    [
                        601940.722,
                        3425003.415
                    ],
                    [
                        601944.473,
                        3425002.173
                    ],
                    [
                        601944.268,
                        3425002.415
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 81,
            "Id": 0,
            "测窗": "343"
        },
        "geometry": {
            "paths": [
                [
                    [
                        602110.546,
                        3425102.092
                    ],
                    [
                        602107.894,
                        3425099.405
                    ],
                    [
                        602107.789,
                        3425099.127
                    ],
                    [
                        602110.572,
                        3425101.973
                    ],
                    [
                        602110.546,
                        3425102.092
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 82,
            "Id": 0,
            "测窗": "35"
        },
        "geometry": {
            "paths": [
                [
                    [
                        558989.248,
                        3426047.329
                    ],
                    [
                        558992.968,
                        3426046.476
                    ],
                    [
                        558991.43,
                        3426044.064
                    ],
                    [
                        558988.055,
                        3426045.664
                    ],
                    [
                        558989.248,
                        3426047.329
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 83,
            "Id": 0,
            "测窗": "352"
        },
        "geometry": {
            "paths": [
                [
                    [
                        604448.597,
                        3425530.879
                    ],
                    [
                        604446.071,
                        3425530.017
                    ],
                    [
                        604445.37,
                        3425532.05
                    ],
                    [
                        604447.941,
                        3425532.744
                    ],
                    [
                        604448.597,
                        3425530.879
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 84,
            "Id": 0,
            "测窗": "353"
        },
        "geometry": {
            "paths": [
                [
                    [
                        604714.144,
                        3425540.097
                    ],
                    [
                        604712.738,
                        3425543.494
                    ],
                    [
                        604712.971,
                        3425543.362
                    ],
                    [
                        604714.642,
                        3425539.781
                    ],
                    [
                        604714.144,
                        3425540.097
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 85,
            "Id": 0,
            "测窗": "354"
        },
        "geometry": {
            "paths": [
                [
                    [
                        605293.327,
                        3425623.746
                    ],
                    [
                        605290.543,
                        3425626.84
                    ],
                    [
                        605291.144,
                        3425627.141
                    ],
                    [
                        605293.898,
                        3425624.229
                    ],
                    [
                        605293.327,
                        3425623.746
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 86,
            "Id": 0,
            "测窗": "355"
        },
        "geometry": {
            "paths": [
                [
                    [
                        605552.914,
                        3425659.168
                    ],
                    [
                        605549.884,
                        3425658.869
                    ],
                    [
                        605549.434,
                        3425662.096
                    ],
                    [
                        605552.193,
                        3425662.459
                    ],
                    [
                        605552.914,
                        3425659.168
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 87,
            "Id": 0,
            "测窗": "356"
        },
        "geometry": {
            "paths": [
                [
                    [
                        605779.464,
                        3425627.12
                    ],
                    [
                        605777.406,
                        3425629.796
                    ],
                    [
                        605778.055,
                        3425630.135
                    ],
                    [
                        605780.149,
                        3425626.906
                    ],
                    [
                        605779.464,
                        3425627.12
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 88,
            "Id": 0,
            "测窗": "357"
        },
        "geometry": {
            "paths": [
                [
                    [
                        606134.458,
                        3425701.287
                    ],
                    [
                        606131.278,
                        3425699.841
                    ],
                    [
                        606130.332,
                        3425701.672
                    ],
                    [
                        606134.038,
                        3425702.862
                    ],
                    [
                        606134.458,
                        3425701.287
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 89,
            "Id": 0,
            "测窗": "358"
        },
        "geometry": {
            "paths": [
                [
                    [
                        606256.87,
                        3425733.109
                    ],
                    [
                        606253.866,
                        3425732.793
                    ],
                    [
                        606253.597,
                        3425735.752
                    ],
                    [
                        606256.585,
                        3425736.091
                    ],
                    [
                        606256.87,
                        3425733.109
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 90,
            "Id": 0,
            "测窗": "359"
        },
        "geometry": {
            "paths": [
                [
                    [
                        606513.428,
                        3425805.763
                    ],
                    [
                        606510.896,
                        3425804.492
                    ],
                    [
                        606509.605,
                        3425806.255
                    ],
                    [
                        606511.715,
                        3425807.87
                    ],
                    [
                        606513.428,
                        3425805.763
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 91,
            "Id": 0,
            "测窗": "36"
        },
        "geometry": {
            "paths": [
                [
                    [
                        559267.254,
                        3426103.614
                    ],
                    [
                        559271.088,
                        3426102.518
                    ],
                    [
                        559270.712,
                        3426101.852
                    ],
                    [
                        559266.887,
                        3426103.57
                    ],
                    [
                        559267.254,
                        3426103.614
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 92,
            "Id": 0,
            "测窗": "360"
        },
        "geometry": {
            "paths": [
                [
                    [
                        606780.515,
                        3425801.446
                    ],
                    [
                        606777.591,
                        3425800.409
                    ],
                    [
                        606777.074,
                        3425802.449
                    ],
                    [
                        606779.777,
                        3425803.619
                    ],
                    [
                        606780.515,
                        3425801.446
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 93,
            "Id": 0,
            "测窗": "361"
        },
        "geometry": {
            "paths": [
                [
                    [
                        607029.43,
                        3425794.91
                    ],
                    [
                        607027.661,
                        3425798.46
                    ],
                    [
                        607027.799,
                        3425798.619
                    ],
                    [
                        607029.604,
                        3425794.767
                    ],
                    [
                        607029.43,
                        3425794.91
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 94,
            "Id": 0,
            "测窗": "362"
        },
        "geometry": {
            "paths": [
                [
                    [
                        607254.94,
                        3425738.381
                    ],
                    [
                        607252.634,
                        3425736.379
                    ],
                    [
                        607251.344,
                        3425737.416
                    ],
                    [
                        607253.946,
                        3425739.892
                    ],
                    [
                        607254.94,
                        3425738.381
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 95,
            "Id": 0,
            "测窗": "363"
        },
        "geometry": {
            "paths": [
                [
                    [
                        607334.362,
                        3425777.392
                    ],
                    [
                        607331.277,
                        3425775.939
                    ],
                    [
                        607330.465,
                        3425777.472
                    ],
                    [
                        607333.806,
                        3425778.755
                    ],
                    [
                        607334.362,
                        3425777.392
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 96,
            "Id": 0,
            "测窗": "364"
        },
        "geometry": {
            "paths": [
                [
                    [
                        607555.777,
                        3425768.149
                    ],
                    [
                        607552.459,
                        3425766.277
                    ],
                    [
                        607551.051,
                        3425768.977
                    ],
                    [
                        607554.116,
                        3425770.375
                    ],
                    [
                        607555.777,
                        3425768.149
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 97,
            "Id": 0,
            "测窗": "365"
        },
        "geometry": {
            "paths": [
                [
                    [
                        607722.97,
                        3425801.011
                    ],
                    [
                        607720.094,
                        3425800.007
                    ],
                    [
                        607719.08,
                        3425801.957
                    ],
                    [
                        607721.785,
                        3425803.581
                    ],
                    [
                        607722.97,
                        3425801.011
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 98,
            "Id": 0,
            "测窗": "366"
        },
        "geometry": {
            "paths": [
                [
                    [
                        607975.004,
                        3425823.485
                    ],
                    [
                        607970.82,
                        3425821.744
                    ],
                    [
                        607970.528,
                        3425823.393
                    ],
                    [
                        607974.408,
                        3425825.102
                    ],
                    [
                        607975.004,
                        3425823.485
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 99,
            "Id": 0,
            "测窗": "367"
        },
        "geometry": {
            "paths": [
                [
                    [
                        608127.323,
                        3425863.932
                    ],
                    [
                        608122.939,
                        3425862.885
                    ],
                    [
                        608123.282,
                        3425864.788
                    ],
                    [
                        608127.037,
                        3425865.743
                    ],
                    [
                        608127.323,
                        3425863.932
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 100,
            "Id": 0,
            "测窗": "368"
        },
        "geometry": {
            "paths": [
                [
                    [
                        608361.939,
                        3426053.438
                    ],
                    [
                        608357.962,
                        3426051.506
                    ],
                    [
                        608356.99,
                        3426052.904
                    ],
                    [
                        608361.162,
                        3426055.16
                    ],
                    [
                        608361.939,
                        3426053.438
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 101,
            "Id": 0,
            "测窗": "369"
        },
        "geometry": {
            "paths": [
                [
                    [
                        608562.342,
                        3426135.959
                    ],
                    [
                        608559.306,
                        3426134.381
                    ],
                    [
                        608557.683,
                        3426136.392
                    ],
                    [
                        608560.808,
                        3426138.323
                    ],
                    [
                        608562.342,
                        3426135.959
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 102,
            "Id": 0,
            "测窗": "37"
        },
        "geometry": {
            "paths": [
                [
                    [
                        559429.488,
                        3426074.553
                    ],
                    [
                        559433.722,
                        3426074.364
                    ],
                    [
                        559433.564,
                        3426073.497
                    ],
                    [
                        559429.442,
                        3426073.928
                    ],
                    [
                        559429.488,
                        3426074.553
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 103,
            "Id": 0,
            "测窗": "370"
        },
        "geometry": {
            "paths": [
                [
                    [
                        608755.875,
                        3426277.64
                    ],
                    [
                        608751.823,
                        3426275.876
                    ],
                    [
                        608751.078,
                        3426278.051
                    ],
                    [
                        608754.596,
                        3426279.9
                    ],
                    [
                        608755.875,
                        3426277.64
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 104,
            "Id": 0,
            "测窗": "371"
        },
        "geometry": {
            "paths": [
                [
                    [
                        608962.108,
                        3426362.589
                    ],
                    [
                        608957.595,
                        3426361.326
                    ],
                    [
                        608957.096,
                        3426362.922
                    ],
                    [
                        608961.611,
                        3426364.284
                    ],
                    [
                        608962.108,
                        3426362.589
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 105,
            "Id": 0,
            "测窗": "372"
        },
        "geometry": {
            "paths": [
                [
                    [
                        609083.825,
                        3426490.052
                    ],
                    [
                        609080.636,
                        3426488.836
                    ],
                    [
                        609079.294,
                        3426491.248
                    ],
                    [
                        609083.328,
                        3426492.145
                    ],
                    [
                        609083.825,
                        3426490.052
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 106,
            "Id": 0,
            "测窗": "373"
        },
        "geometry": {
            "paths": [
                [
                    [
                        609369.616,
                        3426427.689
                    ],
                    [
                        609365.821,
                        3426427.416
                    ],
                    [
                        609365.332,
                        3426429.535
                    ],
                    [
                        609369.782,
                        3426429.778
                    ],
                    [
                        609369.616,
                        3426427.689
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 107,
            "Id": 0,
            "测窗": "374"
        },
        "geometry": {
            "paths": [
                [
                    [
                        609831.646,
                        3426488.738
                    ],
                    [
                        609828.235,
                        3426487.161
                    ],
                    [
                        609827.206,
                        3426489.792
                    ],
                    [
                        609831.147,
                        3426490.855
                    ],
                    [
                        609831.646,
                        3426488.738
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 108,
            "Id": 0,
            "测窗": "375"
        },
        "geometry": {
            "paths": [
                [
                    [
                        610028.294,
                        3426594.443
                    ],
                    [
                        610024.572,
                        3426595.774
                    ],
                    [
                        610025.778,
                        3426597.763
                    ],
                    [
                        610029.025,
                        3426595.902
                    ],
                    [
                        610028.294,
                        3426594.443
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 109,
            "Id": 0,
            "测窗": "376"
        },
        "geometry": {
            "paths": [
                [
                    [
                        610196.931,
                        3426543.334
                    ],
                    [
                        610193.585,
                        3426542.688
                    ],
                    [
                        610192.951,
                        3426545.38
                    ],
                    [
                        610196.767,
                        3426545.944
                    ],
                    [
                        610196.931,
                        3426543.334
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 110,
            "Id": 0,
            "测窗": "377"
        },
        "geometry": {
            "paths": [
                [
                    [
                        610454.267,
                        3426741.147
                    ],
                    [
                        610451.239,
                        3426740.407
                    ],
                    [
                        610450.158,
                        3426742.982
                    ],
                    [
                        610453.574,
                        3426743.979
                    ],
                    [
                        610454.267,
                        3426741.147
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 111,
            "Id": 0,
            "测窗": "379"
        },
        "geometry": {
            "paths": [
                [
                    [
                        610954.581,
                        3426933.603
                    ],
                    [
                        610951.598,
                        3426931.56
                    ],
                    [
                        610950.232,
                        3426934.468
                    ],
                    [
                        610953.158,
                        3426935.918
                    ],
                    [
                        610954.581,
                        3426933.603
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 112,
            "Id": 0,
            "测窗": "380"
        },
        "geometry": {
            "paths": [
                [
                    [
                        611258.267,
                        3426943.889
                    ],
                    [
                        611253.569,
                        3426943.394
                    ],
                    [
                        611253.411,
                        3426945.258
                    ],
                    [
                        611257.121,
                        3426946.167
                    ],
                    [
                        611258.267,
                        3426943.889
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 113,
            "Id": 0,
            "测窗": "381"
        },
        "geometry": {
            "paths": [
                [
                    [
                        611542.364,
                        3427063.921
                    ],
                    [
                        611538.624,
                        3427062.116
                    ],
                    [
                        611537.998,
                        3427063.982
                    ],
                    [
                        611541.661,
                        3427066.065
                    ],
                    [
                        611542.364,
                        3427063.921
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 114,
            "Id": 0,
            "测窗": "382"
        },
        "geometry": {
            "paths": [
                [
                    [
                        611729.651,
                        3427157.888
                    ],
                    [
                        611726.562,
                        3427156.625
                    ],
                    [
                        611726.304,
                        3427160.335
                    ],
                    [
                        611728.987,
                        3427161.058
                    ],
                    [
                        611729.651,
                        3427157.888
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 115,
            "Id": 0,
            "测窗": "383"
        },
        "geometry": {
            "paths": [
                [
                    [
                        611927.215,
                        3427224.835
                    ],
                    [
                        611925.568,
                        3427223.984
                    ],
                    [
                        611924.063,
                        3427227.199
                    ],
                    [
                        611926.044,
                        3427227.963
                    ],
                    [
                        611927.215,
                        3427224.835
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 116,
            "Id": 0,
            "测窗": "384"
        },
        "geometry": {
            "paths": [
                [
                    [
                        612254.913,
                        3427309.689
                    ],
                    [
                        612252.046,
                        3427313.683
                    ],
                    [
                        612252.528,
                        3427313.836
                    ],
                    [
                        612255.491,
                        3427309.875
                    ],
                    [
                        612254.913,
                        3427309.689
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 117,
            "Id": 0,
            "测窗": "385"
        },
        "geometry": {
            "paths": [
                [
                    [
                        612590.411,
                        3427214.57
                    ],
                    [
                        612586.059,
                        3427214.297
                    ],
                    [
                        612585.463,
                        3427216.051
                    ],
                    [
                        612590.077,
                        3427216.372
                    ],
                    [
                        612590.411,
                        3427214.57
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 118,
            "Id": 0,
            "测窗": "386"
        },
        "geometry": {
            "paths": [
                [
                    [
                        612832.854,
                        3427315.981
                    ],
                    [
                        612829.201,
                        3427313.936
                    ],
                    [
                        612827.45,
                        3427316.59
                    ],
                    [
                        612831.216,
                        3427318.753
                    ],
                    [
                        612832.854,
                        3427315.981
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 119,
            "Id": 0,
            "测窗": "387"
        },
        "geometry": {
            "paths": [
                [
                    [
                        613003.015,
                        3427427.765
                    ],
                    [
                        613000.879,
                        3427426.584
                    ],
                    [
                        612998.78,
                        3427429.777
                    ],
                    [
                        613001.106,
                        3427431.101
                    ],
                    [
                        613003.015,
                        3427427.765
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 120,
            "Id": 0,
            "测窗": "388"
        },
        "geometry": {
            "paths": [
                [
                    [
                        613197.099,
                        3427458.025
                    ],
                    [
                        613194.202,
                        3427458.005
                    ],
                    [
                        613193.922,
                        3427460.918
                    ],
                    [
                        613197.144,
                        3427461.04
                    ],
                    [
                        613197.099,
                        3427458.025
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 121,
            "Id": 0,
            "测窗": "389"
        },
        "geometry": {
            "paths": [
                [
                    [
                        613699.199,
                        3427483.473
                    ],
                    [
                        613695.297,
                        3427481.772
                    ],
                    [
                        613694.509,
                        3427485.598
                    ],
                    [
                        613697.833,
                        3427486.936
                    ],
                    [
                        613699.199,
                        3427483.473
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 122,
            "Id": 0,
            "测窗": "39"
        },
        "geometry": {
            "paths": [
                [
                    [
                        559969.27,
                        3426130.215
                    ],
                    [
                        559974.154,
                        3426130.174
                    ],
                    [
                        559974.211,
                        3426129.353
                    ],
                    [
                        559969.263,
                        3426129.452
                    ],
                    [
                        559969.27,
                        3426130.215
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 123,
            "Id": 0,
            "测窗": "390"
        },
        "geometry": {
            "paths": [
                [
                    [
                        613757.581,
                        3427547.708
                    ],
                    [
                        613754.857,
                        3427551.65
                    ],
                    [
                        613756.436,
                        3427552.175
                    ],
                    [
                        613758.57,
                        3427548.272
                    ],
                    [
                        613757.581,
                        3427547.708
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 124,
            "Id": 0,
            "测窗": "391"
        },
        "geometry": {
            "paths": [
                [
                    [
                        613972.933,
                        3427573.074
                    ],
                    [
                        613970.925,
                        3427577.2
                    ],
                    [
                        613971.974,
                        3427577.619
                    ],
                    [
                        613973.455,
                        3427573.422
                    ],
                    [
                        613972.933,
                        3427573.074
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 125,
            "Id": 0,
            "测窗": "392"
        },
        "geometry": {
            "paths": [
                [
                    [
                        614532.585,
                        3427616.255
                    ],
                    [
                        614529.454,
                        3427615.019
                    ],
                    [
                        614528.059,
                        3427618.618
                    ],
                    [
                        614530.789,
                        3427619.857
                    ],
                    [
                        614532.585,
                        3427616.255
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 126,
            "Id": 0,
            "测窗": "393"
        },
        "geometry": {
            "paths": [
                [
                    [
                        614714.737,
                        3427711.022
                    ],
                    [
                        614711.652,
                        3427710.274
                    ],
                    [
                        614710.803,
                        3427714.068
                    ],
                    [
                        614713.787,
                        3427714.569
                    ],
                    [
                        614714.737,
                        3427711.022
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 127,
            "Id": 0,
            "测窗": "394"
        },
        "geometry": {
            "paths": [
                [
                    [
                        615109.246,
                        3427911.653
                    ],
                    [
                        615105.762,
                        3427910.177
                    ],
                    [
                        615104.708,
                        3427913.791
                    ],
                    [
                        615107.771,
                        3427914.624
                    ],
                    [
                        615109.246,
                        3427911.653
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 128,
            "Id": 0,
            "测窗": "395"
        },
        "geometry": {
            "paths": [
                [
                    [
                        615378.635,
                        3427885.016
                    ],
                    [
                        615375.902,
                        3427883.656
                    ],
                    [
                        615374.503,
                        3427887.158
                    ],
                    [
                        615377.561,
                        3427888.022
                    ],
                    [
                        615378.635,
                        3427885.016
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 129,
            "Id": 0,
            "测窗": "396"
        },
        "geometry": {
            "paths": [
                [
                    [
                        615574.256,
                        3427776.204
                    ],
                    [
                        615571.169,
                        3427774.766
                    ],
                    [
                        615570.056,
                        3427778.543
                    ],
                    [
                        615572.909,
                        3427779.745
                    ],
                    [
                        615574.256,
                        3427776.204
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 130,
            "Id": 0,
            "测窗": "399_1"
        },
        "geometry": {
            "paths": [
                [
                    [
                        560699.686,
                        3426174.72
                    ],
                    [
                        560698.791,
                        3426169.83
                    ],
                    [
                        560698.298,
                        3426170.218
                    ],
                    [
                        560698.931,
                        3426174.711
                    ],
                    [
                        560699.686,
                        3426174.72
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 131,
            "Id": 0,
            "测窗": "399_2"
        },
        "geometry": {
            "paths": [
                [
                    [
                        560716.401,
                        3426036.374
                    ],
                    [
                        560719.127,
                        3426034.479
                    ],
                    [
                        560718.599,
                        3426033.475
                    ],
                    [
                        560715.749,
                        3426035.397
                    ],
                    [
                        560716.401,
                        3426036.374
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 132,
            "Id": 0,
            "测窗": "40"
        },
        "geometry": {
            "paths": [
                [
                    [
                        560332.907,
                        3426088.295
                    ],
                    [
                        560333.136,
                        3426087.446
                    ],
                    [
                        560329.215,
                        3426086.598
                    ],
                    [
                        560328.918,
                        3426087.029
                    ],
                    [
                        560332.907,
                        3426088.295
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 133,
            "Id": 0,
            "测窗": "41"
        },
        "geometry": {
            "paths": [
                [
                    [
                        560371.768,
                        3426234.048
                    ],
                    [
                        560371.587,
                        3426238.093
                    ],
                    [
                        560372.381,
                        3426238.287
                    ],
                    [
                        560372.307,
                        3426234.225
                    ],
                    [
                        560371.768,
                        3426234.048
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 134,
            "Id": 0,
            "测窗": "42"
        },
        "geometry": {
            "paths": [
                [
                    [
                        560804.133,
                        3426036.161
                    ],
                    [
                        560804.101,
                        3426035.439
                    ],
                    [
                        560800.213,
                        3426034.606
                    ],
                    [
                        560799.988,
                        3426035.49
                    ],
                    [
                        560804.133,
                        3426036.161
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 135,
            "Id": 0,
            "测窗": "43"
        },
        "geometry": {
            "paths": [
                [
                    [
                        560984.892,
                        3426106.497
                    ],
                    [
                        560988.419,
                        3426108.563
                    ],
                    [
                        560988.922,
                        3426108.039
                    ],
                    [
                        560985.808,
                        3426105.476
                    ],
                    [
                        560984.892,
                        3426106.497
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 136,
            "Id": 0,
            "测窗": "44"
        },
        "geometry": {
            "paths": [
                [
                    [
                        561181.202,
                        3426097.15
                    ],
                    [
                        561186.671,
                        3426098.168
                    ],
                    [
                        561186.341,
                        3426097.424
                    ],
                    [
                        561181.472,
                        3426097.17
                    ],
                    [
                        561181.202,
                        3426097.15
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 137,
            "Id": 0,
            "测窗": "45"
        },
        "geometry": {
            "paths": [
                [
                    [
                        561431.05,
                        3425965.797
                    ],
                    [
                        561431.076,
                        3425965.066
                    ],
                    [
                        561427.116,
                        3425964.943
                    ],
                    [
                        561427.107,
                        3425965.614
                    ],
                    [
                        561431.05,
                        3425965.797
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 138,
            "Id": 0,
            "测窗": "46"
        },
        "geometry": {
            "paths": [
                [
                    [
                        561538.508,
                        3426008.15
                    ],
                    [
                        561542.65,
                        3426010.666
                    ],
                    [
                        561543.168,
                        3426009.536
                    ],
                    [
                        561539.185,
                        3426007.199
                    ],
                    [
                        561538.508,
                        3426008.15
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 139,
            "Id": 0,
            "测窗": "47"
        },
        "geometry": {
            "paths": [
                [
                    [
                        561735.586,
                        3426185.653
                    ],
                    [
                        561737.631,
                        3426189.832
                    ],
                    [
                        561738.279,
                        3426189.117
                    ],
                    [
                        561736.528,
                        3426184.98
                    ],
                    [
                        561735.586,
                        3426185.653
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 140,
            "Id": 0,
            "测窗": "53"
        },
        "geometry": {
            "paths": [
                [
                    [
                        562870.972,
                        3426301.068
                    ],
                    [
                        562871.997,
                        3426305.035
                    ],
                    [
                        562872.608,
                        3426304.888
                    ],
                    [
                        562871.368,
                        3426300.976
                    ],
                    [
                        562870.972,
                        3426301.068
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 141,
            "Id": 0,
            "测窗": "7"
        },
        "geometry": {
            "paths": [
                [
                    [
                        555160.689,
                        3422421.628
                    ],
                    [
                        555160.934,
                        3422423.582
                    ],
                    [
                        555165.068,
                        3422423.641
                    ],
                    [
                        555164.559,
                        3422421.424
                    ],
                    [
                        555160.689,
                        3422421.628
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 142,
            "Id": 0,
            "测窗": "8"
        },
        "geometry": {
            "paths": [
                [
                    [
                        555304.761,
                        3422535.028
                    ],
                    [
                        555308.275,
                        3422538.315
                    ],
                    [
                        555308.65,
                        3422537.848
                    ],
                    [
                        555305.366,
                        3422534.289
                    ],
                    [
                        555304.761,
                        3422535.028
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 143,
            "Id": 0,
            "测窗": "81"
        },
        "geometry": {
            "paths": [
                [
                    [
                        573063.986,
                        3423666.298
                    ],
                    [
                        573069.122,
                        3423664.447
                    ],
                    [
                        573068.174,
                        3423663.886
                    ],
                    [
                        573064.086,
                        3423665.18
                    ],
                    [
                        573063.986,
                        3423666.298
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 144,
            "Id": 0,
            "测窗": "85"
        },
        "geometry": {
            "paths": [
                [
                    [
                        573807.693,
                        3423693.2
                    ],
                    [
                        573810.819,
                        3423695.385
                    ],
                    [
                        573811.376,
                        3423694.599
                    ],
                    [
                        573808.333,
                        3423691.958
                    ],
                    [
                        573807.693,
                        3423693.2
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 145,
            "Id": 0,
            "测窗": "89"
        },
        "geometry": {
            "paths": [
                [
                    [
                        574466.559,
                        3424100.519
                    ],
                    [
                        574468.119,
                        3424097.412
                    ],
                    [
                        574467.641,
                        3424097.671
                    ],
                    [
                        574465.852,
                        3424100.298
                    ],
                    [
                        574466.559,
                        3424100.519
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 146,
            "Id": 0,
            "测窗": "9"
        },
        "geometry": {
            "paths": [
                [
                    [
                        555408.417,
                        3422582.73
                    ],
                    [
                        555411.347,
                        3422584.787
                    ],
                    [
                        555412.123,
                        3422583.847
                    ],
                    [
                        555408.846,
                        3422581.627
                    ],
                    [
                        555408.417,
                        3422582.73
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 147,
            "Id": 0,
            "测窗": "91"
        },
        "geometry": {
            "paths": [
                [
                    [
                        574592.456,
                        3424199.51
                    ],
                    [
                        574595.077,
                        3424201.746
                    ],
                    [
                        574595.284,
                        3424201.651
                    ],
                    [
                        574592.423,
                        3424198.977
                    ],
                    [
                        574592.456,
                        3424199.51
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 148,
            "Id": 0,
            "测窗": "93"
        },
        "geometry": {
            "paths": [
                [
                    [
                        574887.524,
                        3424489.72
                    ],
                    [
                        574890.588,
                        3424492.306
                    ],
                    [
                        574890.822,
                        3424491.984
                    ],
                    [
                        574887.997,
                        3424489.131
                    ],
                    [
                        574887.524,
                        3424489.72
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 149,
            "Id": 0,
            "测窗": "94"
        },
        "geometry": {
            "paths": [
                [
                    [
                        575199.298,
                        3424593.166
                    ],
                    [
                        575201.641,
                        3424596.164
                    ],
                    [
                        575202.294,
                        3424595.798
                    ],
                    [
                        575199.719,
                        3424592.707
                    ],
                    [
                        575199.298,
                        3424593.166
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 150,
            "Id": 0,
            "测窗": "95"
        },
        "geometry": {
            "paths": [
                [
                    [
                        575212.828,
                        3424632.583
                    ],
                    [
                        575215.006,
                        3424635.102
                    ],
                    [
                        575216.21,
                        3424634.118
                    ],
                    [
                        575213.765,
                        3424631.42
                    ],
                    [
                        575212.828,
                        3424632.583
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 151,
            "Id": 0,
            "测窗": "96"
        },
        "geometry": {
            "paths": [
                [
                    [
                        575291.609,
                        3424710.686
                    ],
                    [
                        575292.373,
                        3424714.135
                    ],
                    [
                        575294.151,
                        3424713.766
                    ],
                    [
                        575293.724,
                        3424709.98
                    ],
                    [
                        575291.609,
                        3424710.686
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 152,
            "Id": 0,
            "测窗": "97"
        },
        "geometry": {
            "paths": [
                [
                    [
                        575282.297,
                        3424724.369
                    ],
                    [
                        575278.897,
                        3424726.013
                    ],
                    [
                        575279.037,
                        3424726.335
                    ],
                    [
                        575282.288,
                        3424724.577
                    ],
                    [
                        575282.297,
                        3424724.369
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 153,
            "Id": 0,
            "测窗": "98"
        },
        "geometry": {
            "paths": [
                [
                    [
                        575432.783,
                        3425210.791
                    ],
                    [
                        575435.15,
                        3425208.006
                    ],
                    [
                        575434.08,
                        3425205.941
                    ],
                    [
                        575431.217,
                        3425208.918
                    ],
                    [
                        575432.783,
                        3425210.791
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "FID": 154,
            "Id": 0,
            "测窗": "99"
        },
        "geometry": {
            "paths": [
                [
                    [
                        575683.377,
                        3425245.849
                    ],
                    [
                        575685.247,
                        3425246.913
                    ],
                    [
                        575687.521,
                        3425243.486
                    ],
                    [
                        575685.152,
                        3425242.783
                    ],
                    [
                        575683.377,
                        3425245.849
                    ]
                ]
            ]
        }
    }
]
var CC175ListXiaMian = [
    {
        "attributes": {
            "OBJECTID": 1,
            "Name": "CC7-2",
            "Shape_Length": 10.980577697415669,
            "Shape_Area": 5.900250000273459
			},
        "geometry": {
            "paths": [
                [
                    [
							555175.3400000001,
            3422400.0300000004
						],
    [
							555178.93,
    3422401.7900000007
						],
[
    555179.3700000001,
    3422400.3800000005
],
    [
        555175.8,
        3422398.5900000005
    ],
    [
        555175.3400000001,
        3422400.0300000004
    ]
					]
				]
			}
		},
{
    "attributes": {
        "OBJECTID": 2,
            "Name": "CC8-2",
                "Shape_Length": 11.493442219161617,
                    "Shape_Area": 7.126649999340088
    },
    "geometry": {
        "paths": [
            [
                [
                    555371.6100000001,
                    3422467.2500000006
                ],
                [
                    555374.9400000001,
                    3422469.22
                ],
                [
                    555375.9,
                    3422467.74
                ],
                [
                    555372.51,
                    3422465.6200000008
                ],
                [
                    555371.6100000001,
                    3422467.2500000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 3,
            "Name": "CC9-2",
                "Shape_Length": 12.302307564063743,
                    "Shape_Area": 8.628049999650616
    },
    "geometry": {
        "paths": [
            [
                [
                    555467.17,
                    3422518.8600000005
                ],
                [
                    555470.77,
                    3422520.5300000004
                ],
                [
                    555471.8400000001,
                    3422518.6300000005
                ],
                [
                    555468.2300000001,
                    3422516.9600000006
                ],
                [
                    555467.17,
                    3422518.8600000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 4,
            "Name": "CC10-2",
                "Shape_Length": 10.646698329934486,
                    "Shape_Area": 5.294949999382906
    },
    "geometry": {
        "paths": [
            [
                [
                    555631.2200000001,
                    3422623.72
                ],
                [
                    555634.55,
                    3422625.9200000006
                ],
                [
                    555635.2300000001,
                    3422624.7700000007
                ],
                [
                    555631.8800000001,
                    3422622.5800000007
                ],
                [
                    555631.2200000001,
                    3422623.72
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 5,
            "Name": "CC11-2",
                "Shape_Length": 12.451386606542544,
                    "Shape_Area": 8.912749999951572
    },
    "geometry": {
        "paths": [
            [
                [
                    555775.14,
                    3422735.1400000008
                ],
                [
                    555778.2100000001,
                    3422737.6100000005
                ],
                [
                    555779.8600000001,
                    3422736.0300000004
                ],
                [
                    555776.76,
                    3422733.5600000007
                ],
                [
                    555775.14,
                    3422735.1400000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 6,
            "Name": "CC12-2",
                "Shape_Length": 12.123639820806705,
                    "Shape_Area": 8.255500000177883
    },
    "geometry": {
        "paths": [
            [
                [
                    555975.39,
                    3422928.0200000007
                ],
                [
                    555978.15,
                    3422930.8800000005
                ],
                [
                    555979.4900000001,
                    3422929.2700000007
                ],
                [
                    555976.7300000001,
                    3422926.4200000006
                ],
                [
                    555975.39,
                    3422928.0200000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 7,
            "Name": "CC13-2",
                "Shape_Length": 11.020591377263852,
                    "Shape_Area": 6.010799999880418
    },
    "geometry": {
        "paths": [
            [
                [
                    555920.3800000001,
                    3423124.5100000004
                ],
                [
                    555920.15,
                    3423128.47
                ],
                [
                    555921.67,
                    3423128.2700000007
                ],
                [
                    555921.92,
                    3423124.3100000007
                ],
                [
                    555920.3800000001,
                    3423124.5100000004
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 8,
            "Name": "CC15-2",
                "Shape_Length": 11.800572070872044,
                    "Shape_Area": 7.546800000159349
    },
    "geometry": {
        "paths": [
            [
                [
                    556419.9600000001,
                    3423664.8500000007
                ],
                [
                    556423.17,
                    3423667.2500000006
                ],
                [
                    556424.14,
                    3423665.6100000005
                ],
                [
                    556420.92,
                    3423663.2300000006
                ],
                [
                    556419.9600000001,
                    3423664.8500000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 9,
            "Name": "CC16-2",
                "Shape_Length": 10.859991473428999,
                    "Shape_Area": 5.654249999732012
    },
    "geometry": {
        "paths": [
            [
                [
                    556483.7000000001,
                    3423744.0400000007
                ],
                [
                    556484.9700000001,
                    3423747.8400000005
                ],
                [
                    556486.2200000001,
                    3423747.1900000006
                ],
                [
                    556485.0000000001,
                    3423743.3900000008
                ],
                [
                    556483.7000000001,
                    3423744.0400000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 10,
            "Name": "CC17-2",
                "Shape_Length": 12.015957029819788,
                    "Shape_Area": 8.03570000017942
    },
    "geometry": {
        "paths": [
            [
                [
                    556572.76,
                    3423857.9000000006
                ],
                [
                    556575.18,
                    3423861.0100000004
                ],
                [
                    556576.67,
                    3423859.6500000006
                ],
                [
                    556574.2200000001,
                    3423856.47
                ],
                [
                    556572.76,
                    3423857.9000000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 11,
            "Name": "CC18-2",
                "Shape_Length": 10.458786830692264,
                    "Shape_Area": 4.761999999819207
    },
    "geometry": {
        "paths": [
            [
                [
                    556685.8,
                    3424018.2800000004
                ],
                [
                    556687.9900000001,
                    3424021.6200000008
                ],
                [
                    556689.15,
                    3424021.2300000006
                ],
                [
                    556686.9600000001,
                    3424017.8700000008
                ],
                [
                    556685.8,
                    3424018.2800000004
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 12,
            "Name": "CC19-2",
                "Shape_Length": 12.03091881563973,
                    "Shape_Area": 8.077500000232832
    },
    "geometry": {
        "paths": [
            [
                [
                    556814.8600000001,
                    3424224.6700000006
                ],
                [
                    556816.4,
                    3424228.3700000008
                ],
                [
                    556818.26,
                    3424227.5700000005
                ],
                [
                    556816.7300000001,
                    3424223.9000000006
                ],
                [
                    556814.8600000001,
                    3424224.6700000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 13,
            "Name": "CC20-2",
                "Shape_Length": 12.704500248084106,
                    "Shape_Area": 9.399599999527773
    },
    "geometry": {
        "paths": [
            [
                [
                    556918.41,
                    3424357.2800000004
                ],
                [
                    556919.5700000001,
                    3424361.0900000005
                ],
                [
                    556921.89,
                    3424360.6500000006
                ],
                [
                    556920.77,
                    3424356.8500000007
                ],
                [
                    556918.41,
                    3424357.2800000004
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 14,
            "Name": "CC21-2",
                "Shape_Length": 12.260804233568348,
                    "Shape_Area": 8.516800000133739
    },
    "geometry": {
        "paths": [
            [
                [
                    557094.2300000001,
                    3424573.4100000008
                ],
                [
                    557097.8600000001,
                    3424571.74
                ],
                [
                    557097.0900000001,
                    3424569.7300000006
                ],
                [
                    557093.4800000001,
                    3424571.4200000006
                ],
                [
                    557094.2300000001,
                    3424573.4100000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 15,
            "Name": "CC22-2",
                "Shape_Length": 10.457414901016339,
                    "Shape_Area": 4.854999999864958
    },
    "geometry": {
        "paths": [
            [
                [
                    557302.3800000001,
                    3424717.8000000005
                ],
                [
                    557302.1100000001,
                    3424721.7900000007
                ],
                [
                    557303.1000000001,
                    3424721.8600000005
                ],
                [
                    557303.81,
                    3424717.8900000008
                ],
                [
                    557302.3800000001,
                    3424717.8000000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 16,
            "Name": "CC23-2",
                "Shape_Length": 12.998515821074573,
                    "Shape_Area": 10.01129999995469
    },
    "geometry": {
        "paths": [
            [
                [
                    557392.2400000001,
                    3424829.7600000004
                ],
                [
                    557395.2300000001,
                    3424832.4600000006
                ],
                [
                    557396.8500000001,
                    3424830.5000000006
                ],
                [
                    557393.8800000001,
                    3424827.9000000006
                ],
                [
                    557392.2400000001,
                    3424829.7600000004
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 17,
            "Name": "CC24-2",
                "Shape_Length": 11.17489099590249,
                    "Shape_Area": 6.317799999940023
    },
    "geometry": {
        "paths": [
            [
                [
                    557540.3500000001,
                    3424960.8000000005
                ],
                [
                    557541.8700000001,
                    3424964.5200000007
                ],
                [
                    557543.27,
                    3424963.8200000005
                ],
                [
                    557541.79,
                    3424960.1100000005
                ],
                [
                    557540.3500000001,
                    3424960.8000000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 18,
            "Name": "CC25-2",
                "Shape_Length": 10.040348540178402,
                    "Shape_Area": 4.002599999213219
    },
    "geometry": {
        "paths": [
            [
                [
                    557698.65,
                    3425162.1300000005
                ],
                [
                    557701.9900000001,
                    3425164.2800000004
                ],
                [
                    557702.28,
                    3425163.2700000007
                ],
                [
                    557698.9500000001,
                    3425161.1200000008
                ],
                [
                    557698.65,
                    3425162.1300000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 19,
            "Name": "CC26-2",
                "Shape_Length": 9.858465954595897,
                    "Shape_Area": 3.738499999964028
    },
    "geometry": {
        "paths": [
            [
                [
                    557826.4800000001,
                    3425284.6300000005
                ],
                [
                    557829.3500000001,
                    3425287.4100000008
                ],
                [
                    557830.02,
                    3425286.7700000007
                ],
                [
                    557827.17,
                    3425283.9800000006
                ],
                [
                    557826.4800000001,
                    3425284.6300000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 20,
            "Name": "CC27-2",
                "Shape_Length": 8.593728361739462,
                    "Shape_Area": 1.080949999578018
    },
    "geometry": {
        "paths": [
            [
                [
                    557883.01,
                    3425337.7700000007
                ],
                [
                    557882.9400000001,
                    3425337.97
                ],
                [
                    557886.3,
                    3425340.1900000006
                ],
                [
                    557886.43,
                    3425339.8800000005
                ],
                [
                    557883.01,
                    3425337.7700000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 21,
            "Name": "CC29-2",
                "Shape_Length": 9.554761251997645,
                    "Shape_Area": 3.1436499995033024
    },
    "geometry": {
        "paths": [
            [
                [
                    558475.91,
                    3425741.8200000005
                ],
                [
                    558478.3700000001,
                    3425744.9600000006
                ],
                [
                    558479.02,
                    3425744.5000000006
                ],
                [
                    558476.55,
                    3425741.3700000008
                ],
                [
                    558475.91,
                    3425741.8200000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 22,
            "Name": "CC30-2",
                "Shape_Length": 11.153059361249195,
                    "Shape_Area": 6.321500000605825
    },
    "geometry": {
        "paths": [
            [
                [
                    558502.77,
                    3425794.0300000004
                ],
                [
                    558503.05,
                    3425798.0200000007
                ],
                [
                    558504.6100000001,
                    3425797.8100000007
                ],
                [
                    558504.3600000001,
                    3425793.8400000005
                ],
                [
                    558502.77,
                    3425794.0300000004
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 23,
            "Name": "CC31-2",
                "Shape_Length": 9.454973146248286,
                    "Shape_Area": 0.13859999983673908
    },
    "geometry": {
        "paths": [
            [
                [
                    558525.28,
                    3425919.7100000006
                ],
                [
                    558525.3700000001,
                    3425923.8500000007
                ],
                [
                    558524.76,
                    3425923.6300000005
                ],
                [
                    558525.9700000001,
                    3425919.8600000005
                ],
                [
                    558525.28,
                    3425919.7100000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 24,
            "Name": "CC32-2",
                "Shape_Length": 15.891308686269408,
                    "Shape_Area": 15.782499999636203
    },
    "geometry": {
        "paths": [
            [
                [
                    558646.78,
                    3426012.6400000008
                ],
                [
                    558644.1000000001,
                    3426009.7700000007
                ],
                [
                    558641.16,
                    3426012.4800000006
                ],
                [
                    558643.8700000001,
                    3426015.3800000005
                ],
                [
                    558646.78,
                    3426012.6400000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 25,
            "Name": "CC34-2",
                "Shape_Length": 10.154922230930815,
                    "Shape_Area": 4.30230000019637
    },
    "geometry": {
        "paths": [
            [
                [
                    558825.76,
                    3425908.7300000006
                ],
                [
                    558829.1100000001,
                    3425910.9100000008
                ],
                [
                    558829.7000000001,
                    3425910.0000000006
                ],
                [
                    558826.3300000001,
                    3425907.8300000007
                ],
                [
                    558825.76,
                    3425908.7300000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 26,
            "Name": "CC35-2",
                "Shape_Length": 13.619824346648084,
                    "Shape_Area": 11.275350000235229
    },
    "geometry": {
        "paths": [
            [
                [
                    559030.04,
                    3425867.1800000008
                ],
                [
                    559033.89,
                    3425868.1600000008
                ],
                [
                    559034.65,
                    3425865.4600000006
                ],
                [
                    559030.8300000001,
                    3425864.4100000008
                ],
                [
                    559030.04,
                    3425867.1800000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 27,
            "Name": "CC37-2",
                "Shape_Length": 11.126074239602217,
                    "Shape_Area": 6.1634999992911478
    },
    "geometry": {
        "paths": [
            [
                [
                    559441.8700000001,
                    3425983.6000000007
                ],
                [
                    559445.27,
                    3425985.72
                ],
                [
                    559445.8700000001,
                    3425984.2500000006
                ],
                [
                    559442.4500000001,
                    3425982.1800000008
                ],
                [
                    559441.8700000001,
                    3425983.6000000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 28,
            "Name": "CC40-2",
                "Shape_Length": 11.02549591109481,
                    "Shape_Area": 6.047399999347888
    },
    "geometry": {
        "paths": [
            [
                [
                    560327.1300000001,
                    3426025.2500000006
                ],
                [
                    560330.6200000001,
                    3426027.1700000006
                ],
                [
                    560331.3400000001,
                    3426025.8300000007
                ],
                [
                    560327.81,
                    3426023.9100000008
                ],
                [
                    560327.1300000001,
                    3426025.2500000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 29,
            "Name": "CC41-2",
                "Shape_Length": 15.011180576242463,
                    "Shape_Area": 13.82324999937392
    },
    "geometry": {
        "paths": [
            [
                [
                    560402.39,
                    3426230.0800000007
                ],
                [
                    560399.42,
                    3426230.2300000006
                ],
                [
                    560399.4500000001,
                    3426234.1500000006
                ],
                [
                    560403.41,
                    3426234.1100000005
                ],
                [
                    560402.39,
                    3426230.0800000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 30,
            "Name": "CC42-2",
                "Shape_Length": 11.164666509875293,
                    "Shape_Area": 6.238300000267499
    },
    "geometry": {
        "paths": [
            [
                [
                    560781.0700000001,
                    3426012.5000000006
                ],
                [
                    560784.6900000001,
                    3426014.2700000007
                ],
                [
                    560785.17,
                    3426012.8600000005
                ],
                [
                    560781.65,
                    3426010.9600000006
                ],
                [
                    560781.0700000001,
                    3426012.5000000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 31,
            "Name": "CC43-2",
                "Shape_Length": 13.502342757953724,
                    "Shape_Area": 10.944450000685244
    },
    "geometry": {
        "paths": [
            [
                [
                    560953.4500000001,
                    3426042.4400000006
                ],
                [
                    560957.42,
                    3426042.1500000006
                ],
                [
                    560957.3,
                    3426039.47
                ],
                [
                    560953.2000000001,
                    3426039.72
                ],
                [
                    560953.4500000001,
                    3426042.4400000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 32,
            "Name": "CC45-2",
                "Shape_Length": 11.839303593651073,
                    "Shape_Area": 7.580999999564141
    },
    "geometry": {
        "paths": [
            [
                [
                    561414.76,
                    3425953.6500000006
                ],
                [
                    561418.7300000001,
                    3425953.95
                ],
                [
                    561419.1300000001,
                    3425952.1300000005
                ],
                [
                    561415.0800000001,
                    3425951.7500000006
                ],
                [
                    561414.76,
                    3425953.6500000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 33,
            "Name": "CC46-2",
                "Shape_Length": 12.90215369583339,
                    "Shape_Area": 9.744500000146916
    },
    "geometry": {
        "paths": [
            [
                [
                    561553.5800000001,
                    3426000.4100000008
                ],
                [
                    561557.3200000001,
                    3426001.8000000005
                ],
                [
                    561558.3600000001,
                    3425999.5100000004
                ],
                [
                    561554.52,
                    3425998.2500000006
                ],
                [
                    561553.5800000001,
                    3426000.4100000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 34,
            "Name": "CC47-2",
                "Shape_Length": 9.995145804912222,
                    "Shape_Area": 3.950799999919999
    },
    "geometry": {
        "paths": [
            [
                [
                    561731.1900000001,
                    3426159.6700000006
                ],
                [
                    561732.78,
                    3426163.2600000004
                ],
                [
                    561733.6200000001,
                    3426162.7100000006
                ],
                [
                    561731.9900000001,
                    3426159.0200000007
                ],
                [
                    561731.1900000001,
                    3426159.6700000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 35,
            "Name": "CC53-2",
                "Shape_Length": 11.391712697683799,
                    "Shape_Area": 6.804799999822676
    },
    "geometry": {
        "paths": [
            [
                [
                    562890.4,
                    3426277.3400000005
                ],
                [
                    562893.3400000001,
                    3426280.0000000006
                ],
                [
                    562894.4400000001,
                    3426278.6000000007
                ],
                [
                    562891.3800000001,
                    3426276.0200000007
                ],
                [
                    562890.4,
                    3426277.3400000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 36,
            "Name": "CC82-2",
                "Shape_Length": 17.92837185422605,
                    "Shape_Area": 0.7156999997335489
    },
    "geometry": {
        "paths": [
            [
                [
                    573464.9800000001,
                    3423487.0800000007
                ],
                [
                    573466.9400000001,
                    3423483.0600000007
                ],
                [
                    573462.7100000001,
                    3423486.0000000006
                ],
                [
                    573464.9,
                    3423482.72
                ],
                [
                    573464.9800000001,
                    3423487.0800000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 37,
            "Name": "CC84-2",
                "Shape_Length": 17.030930387789828,
                    "Shape_Area": 0.5387999999791385
    },
    "geometry": {
        "paths": [
            [
                [
                    573783.68,
                    3423493.7
                ],
                [
                    573787.3300000001,
                    3423496.5200000007
                ],
                [
                    573785.03,
                    3423494.74
                ],
                [
                    573788.4700000001,
                    3423496.6000000007
                ],
                [
                    573783.68,
                    3423493.7
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 38,
            "Name": "CC86-2",
                "Shape_Length": 16.224341184598754,
                    "Shape_Area": 16.437749998934686
    },
    "geometry": {
        "paths": [
            [
                [
                    573931.17,
                    3423759.0800000007
                ],
                [
                    573928.3500000001,
                    3423756.1200000008
                ],
                [
                    573925.55,
                    3423759.0300000004
                ],
                [
                    573928.3800000001,
                    3423761.97
                ],
                [
                    573931.17,
                    3423759.0800000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 39,
            "Name": "CC87-2",
                "Shape_Length": 16.195099354846943,
                    "Shape_Area": 16.34939999951343
    },
    "geometry": {
        "paths": [
            [
                [
                    574128.3400000001,
                    3423862.4000000006
                ],
                [
                    574125.3700000001,
                    3423859.5400000007
                ],
                [
                    574122.7600000001,
                    3423862.4000000006
                ],
                [
                    574125.3300000001,
                    3423865.4000000006
                ],
                [
                    574128.3400000001,
                    3423862.4000000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 40,
            "Name": "CC90-2",
                "Shape_Length": 11.160565062795073,
                    "Shape_Area": 5.894999999916763
    },
    "geometry": {
        "paths": [
            [
                [
                    574705.04,
                    3423777.9600000006
                ],
                [
                    574706.67,
                    3423781.6800000008
                ],
                [
                    574707.89,
                    3423780.2900000007
                ],
                [
                    574705.92,
                    3423776.9300000008
                ],
                [
                    574705.04,
                    3423777.9600000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 41,
            "Name": "CC91-2",
                "Shape_Length": 11.061727855300268,
                    "Shape_Area": 6.114199999944377
    },
    "geometry": {
        "paths": [
            [
                [
                    574859.05,
                    3423897.7300000006
                ],
                [
                    574862.1200000001,
                    3423900.3000000005
                ],
                [
                    574863.03,
                    3423899.0400000007
                ],
                [
                    574859.9400000001,
                    3423896.5100000004
                ],
                [
                    574859.05,
                    3423897.7300000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 42,
            "Name": "CC92-2",
                "Shape_Length": 14.205364326784317,
                    "Shape_Area": 12.195850000184937
    },
    "geometry": {
        "paths": [
            [
                [
                    574966.43,
                    3424147.8500000007
                ],
                [
                    574970.54,
                    3424148.6300000005
                ],
                [
                    574971.3800000001,
                    3424145.8800000005
                ],
                [
                    574967.3800000001,
                    3424144.9600000006
                ],
                [
                    574966.43,
                    3424147.8500000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 43,
            "Name": "CC95-2",
                "Shape_Length": 14.202312092187855,
                    "Shape_Area": 12.410800000752369
    },
    "geometry": {
        "paths": [
            [
                [
                    575465.9800000001,
                    3424378.7500000006
                ],
                [
                    575468.81,
                    3424381.5800000007
                ],
                [
                    575470.9500000001,
                    3424379.2800000004
                ],
                [
                    575468.1000000001,
                    3424376.5100000004
                ],
                [
                    575465.9800000001,
                    3424378.7500000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 44,
            "Name": "CC99-2",
                "Shape_Length": 13.569024964594986,
                    "Shape_Area": 11.13984999996887
    },
    "geometry": {
        "paths": [
            [
                [
                    575704.5700000001,
                    3425190.1000000007
                ],
                [
                    575707.15,
                    3425193.0700000005
                ],
                [
                    575709.17,
                    3425191.1300000005
                ],
                [
                    575706.54,
                    3425188.0900000005
                ],
                [
                    575704.5700000001,
                    3425190.1000000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 45,
            "Name": "CC100-2",
                "Shape_Length": 20.195459850031207,
                    "Shape_Area": 0.6006000005273147
    },
    "geometry": {
        "paths": [
            [
                [
                    575857.9900000001,
                    3425248.4300000008
                ],
                [
                    575862.6100000001,
                    3425252.1400000008
                ],
                [
                    575861.2100000001,
                    3425247.6700000006
                ],
                [
                    575859.2500000001,
                    3425252.5600000007
                ],
                [
                    575857.9900000001,
                    3425248.4300000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 46,
            "Name": "CC101-2",
                "Shape_Length": 16.450478834243904,
                    "Shape_Area": 16.86564999873927
    },
    "geometry": {
        "paths": [
            [
                [
                    576045.52,
                    3425504.7500000006
                ],
                [
                    576048.91,
                    3425507.47
                ],
                [
                    576051.29,
                    3425504.4100000008
                ],
                [
                    576047.9600000001,
                    3425501.6800000008
                ],
                [
                    576045.52,
                    3425504.7500000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 47,
            "Name": "CC103-2",
                "Shape_Length": 17.57312383601851,
                    "Shape_Area": 19.03165000097689
    },
    "geometry": {
        "paths": [
            [
                [
                    576570.4600000001,
                    3425686.6000000007
                ],
                [
                    576574.4400000001,
                    3425686.8100000007
                ],
                [
                    576575.4600000001,
                    3425683.1300000005
                ],
                [
                    576571.05,
                    3425681.5500000005
                ],
                [
                    576570.4600000001,
                    3425686.6000000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 48,
            "Name": "CC104-2",
                "Shape_Length": 17.129723656402445,
                    "Shape_Area": 0.8505000011866213
    },
    "geometry": {
        "paths": [
            [
                [
                    576767.55,
                    3425820.6800000008
                ],
                [
                    576768.7000000001,
                    3425817.5900000005
                ],
                [
                    576763.4500000001,
                    3425818.9400000006
                ],
                [
                    576764.4,
                    3425816.1800000008
                ],
                [
                    576767.55,
                    3425820.6800000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 49,
            "Name": "CC105-2",
                "Shape_Length": 13.590039765881868,
                    "Shape_Area": 11.158400000674558
    },
    "geometry": {
        "paths": [
            [
                [
                    576931.5800000001,
                    3425915.9400000006
                ],
                [
                    576935.4,
                    3425917.1400000008
                ],
                [
                    576936.2200000001,
                    3425914.4600000006
                ],
                [
                    576932.3600000001,
                    3425913.3000000005
                ],
                [
                    576931.5800000001,
                    3425915.9400000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 50,
            "Name": "CC106-2",
                "Shape_Length": 19.79606099037743,
                    "Shape_Area": 24.13799999940372
    },
    "geometry": {
        "paths": [
            [
                [
                    577178.3700000001,
                    3426057.7600000004
                ],
                [
                    577183.43,
                    3426060.3400000005
                ],
                [
                    577185.0900000001,
                    3426055.99
                ],
                [
                    577180.15,
                    3426054.0200000007
                ],
                [
                    577178.3700000001,
                    3426057.7600000004
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 51,
            "Name": "CC107-2",
                "Shape_Length": 19.68620163288017,
                    "Shape_Area": 23.305500000581846
    },
    "geometry": {
        "paths": [
            [
                [
                    577393.16,
                    3426167.0300000004
                ],
                [
                    577397.68,
                    3426170.4200000006
                ],
                [
                    577400.06,
                    3426166.9400000006
                ],
                [
                    577394.9800000001,
                    3426163.7
                ],
                [
                    577393.16,
                    3426167.0300000004
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 52,
            "Name": "CC109-2",
                "Shape_Length": 18.380642395512539,
                    "Shape_Area": 20.382349999166189
    },
    "geometry": {
        "paths": [
            [
                [
                    577789.2400000001,
                    3426338.8600000005
                ],
                [
                    577793.15,
                    3426342.3400000005
                ],
                [
                    577795.7100000001,
                    3426339.49
                ],
                [
                    577791.41,
                    3426335.8700000008
                ],
                [
                    577789.2400000001,
                    3426338.8600000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 53,
            "Name": "CC110-2",
                "Shape_Length": 16.738351904136328,
                    "Shape_Area": 16.201499999257736
    },
    "geometry": {
        "paths": [
            [
                [
                    577948.3500000001,
                    3426532.1900000006
                ],
                [
                    577947.1100000001,
                    3426535.5100000004
                ],
                [
                    577950.7300000001,
                    3426537.3000000005
                ],
                [
                    577953.3300000001,
                    3426535.2500000006
                ],
                [
                    577948.3500000001,
                    3426532.1900000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 54,
            "Name": "CC111-2",
                "Shape_Length": 15.426112076771652,
                    "Shape_Area": 14.457000000324449
    },
    "geometry": {
        "paths": [
            [
                [
                    578153.15,
                    3426477.3200000005
                ],
                [
                    578149.03,
                    3426478.72
                ],
                [
                    578151.27,
                    3426481.8000000005
                ],
                [
                    578154.8,
                    3426480.3500000007
                ],
                [
                    578153.15,
                    3426477.3200000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 55,
            "Name": "CC112-2",
                "Shape_Length": 13.799437536553374,
                    "Shape_Area": 11.727749999676249
    },
    "geometry": {
        "paths": [
            [
                [
                    578418.7500000001,
                    3426513.8500000007
                ],
                [
                    578418.42,
                    3426516.8000000005
                ],
                [
                    578422.1000000001,
                    3426517.3500000007
                ],
                [
                    578422.7000000001,
                    3426514.2700000007
                ],
                [
                    578418.7500000001,
                    3426513.8500000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 56,
            "Name": "CC113-2",
                "Shape_Length": 16.04030000330634,
                    "Shape_Area": 15.002000000009545
    },
    "geometry": {
        "paths": [
            [
                [
                    578627.0800000001,
                    3426551.22
                ],
                [
                    578631.55,
                    3426551.8800000005
                ],
                [
                    578632.7600000001,
                    3426548.9000000006
                ],
                [
                    578627.4800000001,
                    3426548.2600000004
                ],
                [
                    578627.0800000001,
                    3426551.22
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 57,
            "Name": "CC114-2",
                "Shape_Length": 13.728861164564629,
                    "Shape_Area": 10.475599999926612
    },
    "geometry": {
        "paths": [
            [
                [
                    578903.55,
                    3426594.1300000005
                ],
                [
                    578908.2000000001,
                    3426595.1500000006
                ],
                [
                    578908.1100000001,
                    3426592.4100000008
                ],
                [
                    578903.8400000001,
                    3426592.2
                ],
                [
                    578903.55,
                    3426594.1300000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 58,
            "Name": "CC115-2",
                "Shape_Length": 11.398027610256694,
                    "Shape_Area": 7.66450000047055
    },
    "geometry": {
        "paths": [
            [
                [
                    579131.8800000001,
                    3426631.9300000008
                ],
                [
                    579134.7400000001,
                    3426634.4600000006
                ],
                [
                    579136.1000000001,
                    3426632.6200000008
                ],
                [
                    579133.9600000001,
                    3426630.7
                ],
                [
                    579131.8800000001,
                    3426631.9300000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 59,
            "Name": "CC116-2",
                "Shape_Length": 12.742790437325489,
                    "Shape_Area": 9.430699999682908
    },
    "geometry": {
        "paths": [
            [
                [
                    579340.3300000001,
                    3426676.8700000008
                ],
                [
                    579344.2400000001,
                    3426677.7
                ],
                [
                    579344.7600000001,
                    3426675.5000000006
                ],
                [
                    579340.8200000001,
                    3426674.5000000006
                ],
                [
                    579340.3300000001,
                    3426676.8700000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 60,
            "Name": "CC117-2",
                "Shape_Length": 13.16311068407948,
                    "Shape_Area": 9.630750000564847
    },
    "geometry": {
        "paths": [
            [
                [
                    579591.02,
                    3426640.8700000008
                ],
                [
                    579595.1900000001,
                    3426641.3000000005
                ],
                [
                    579595.28,
                    3426639.24
                ],
                [
                    579590.9,
                    3426638.4200000006
                ],
                [
                    579591.02,
                    3426640.8700000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 61,
            "Name": "CC118-2",
                "Shape_Length": 11.514334359585467,
                    "Shape_Area": 6.753450000344613
    },
    "geometry": {
        "paths": [
            [
                [
                    579743.3200000001,
                    3426748.2900000007
                ],
                [
                    579743.6200000001,
                    3426744.1600000008
                ],
                [
                    579742.3,
                    3426743.72
                ],
                [
                    579741.43,
                    3426747.5900000005
                ],
                [
                    579743.3200000001,
                    3426748.2900000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 62,
            "Name": "CC119-2",
                "Shape_Length": 12.612023299750249,
                    "Shape_Area": 8.911350000408805
    },
    "geometry": {
        "paths": [
            [
                [
                    579924.56,
                    3426696.8300000007
                ],
                [
                    579928.7500000001,
                    3426697.6700000006
                ],
                [
                    579929.1900000001,
                    3426695.6600000008
                ],
                [
                    579925.27,
                    3426694.7
                ],
                [
                    579924.56,
                    3426696.8300000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 63,
            "Name": "CC120-2",
                "Shape_Length": 13.062848591343155,
                    "Shape_Area": 10.089300000610459
    },
    "geometry": {
        "paths": [
            [
                [
                    580190.7500000001,
                    3426652.9800000006
                ],
                [
                    580194.4600000001,
                    3426653.9100000008
                ],
                [
                    580195.18,
                    3426651.5100000004
                ],
                [
                    580191.1300000001,
                    3426650.4600000006
                ],
                [
                    580190.7500000001,
                    3426652.9800000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 64,
            "Name": "CC121-2",
                "Shape_Length": 12.890530912941073,
                    "Shape_Area": 9.634199999641116
    },
    "geometry": {
        "paths": [
            [
                [
                    580420.7600000001,
                    3426669.9000000006
                ],
                [
                    580424.64,
                    3426669.4600000006
                ],
                [
                    580424.4800000001,
                    3426667.1400000008
                ],
                [
                    580420.2600000001,
                    3426667.5300000004
                ],
                [
                    580420.7600000001,
                    3426669.9000000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 65,
            "Name": "CC122-2",
                "Shape_Length": 13.074641318986846,
                    "Shape_Area": 10.001000000462867
    },
    "geometry": {
        "paths": [
            [
                [
                    580589.1000000001,
                    3426683.5200000007
                ],
                [
                    580593.03,
                    3426684.3600000005
                ],
                [
                    580593.6000000001,
                    3426682.0700000005
                ],
                [
                    580589.5700000001,
                    3426681.0300000004
                ],
                [
                    580589.1000000001,
                    3426683.5200000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 66,
            "Name": "CC123-2",
                "Shape_Length": 12.076554564275459,
                    "Shape_Area": 8.203999999705936
    },
    "geometry": {
        "paths": [
            [
                [
                    580786.3600000001,
                    3426676.6200000008
                ],
                [
                    580790.3,
                    3426677.3200000005
                ],
                [
                    580790.42,
                    3426675.1500000006
                ],
                [
                    580786.54,
                    3426674.6400000008
                ],
                [
                    580786.3600000001,
                    3426676.6200000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 67,
            "Name": "CC124-2",
                "Shape_Length": 13.010077731945409,
                    "Shape_Area": 9.792150000008661
    },
    "geometry": {
        "paths": [
            [
                [
                    581074.8600000001,
                    3426715.2800000004
                ],
                [
                    581078.8800000001,
                    3426715.2700000007
                ],
                [
                    581079.03,
                    3426712.8000000005
                ],
                [
                    581074.8,
                    3426713.0000000006
                ],
                [
                    581074.8600000001,
                    3426715.2800000004
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 68,
            "Name": "CC125-2",
                "Shape_Length": 15.932057778497376,
                    "Shape_Area": 14.795450000370457
    },
    "geometry": {
        "paths": [
            [
                [
                    581269.5800000001,
                    3426729.7300000006
                ],
                [
                    581274.29,
                    3426730.7800000004
                ],
                [
                    581275.29,
                    3426727.8000000005
                ],
                [
                    581270.2300000001,
                    3426726.97
                ],
                [
                    581269.5800000001,
                    3426729.7300000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 69,
            "Name": "CC126-2",
                "Shape_Length": 12.972012942003748,
                    "Shape_Area": 10.156649999607844
    },
    "geometry": {
        "paths": [
            [
                [
                    581513.6200000001,
                    3426725.2500000006
                ],
                [
                    581517.5700000001,
                    3426725.7700000007
                ],
                [
                    581517.1200000001,
                    3426722.6600000008
                ],
                [
                    581513.7000000001,
                    3426722.8300000007
                ],
                [
                    581513.6200000001,
                    3426725.2500000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 70,
            "Name": "CC127-2",
                "Shape_Length": 15.66244674445594,
                    "Shape_Area": 13.84550000023609
    },
    "geometry": {
        "paths": [
            [
                [
                    581780.6000000001,
                    3426701.9300000008
                ],
                [
                    581785.04,
                    3426703.1100000005
                ],
                [
                    581786.06,
                    3426700.2900000007
                ],
                [
                    581780.64,
                    3426699.3600000005
                ],
                [
                    581780.6000000001,
                    3426701.9300000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 71,
            "Name": "CC128-2",
                "Shape_Length": 19.296400572818756,
                    "Shape_Area": 0.12149999982467849
    },
    "geometry": {
        "paths": [
            [
                [
                    581992.8700000001,
                    3426766.7800000004
                ],
                [
                    581997.52,
                    3426767.6400000008
                ],
                [
                    581992.1900000001,
                    3426766.6400000008
                ],
                [
                    581996.9500000001,
                    3426767.8800000005
                ],
                [
                    581992.8700000001,
                    3426766.7800000004
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 72,
            "Name": "CC129-2",
                "Shape_Length": 16.923017739611728,
                    "Shape_Area": 15.201600000709622
    },
    "geometry": {
        "paths": [
            [
                [
                    582221.1200000001,
                    3426715.3700000008
                ],
                [
                    582227.0000000001,
                    3426716.1000000007
                ],
                [
                    582226.7100000001,
                    3426713.1500000006
                ],
                [
                    582221.0100000001,
                    3426713.0400000007
                ],
                [
                    582221.1200000001,
                    3426715.3700000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 73,
            "Name": "CC130-2",
                "Shape_Length": 13.734301542571455,
                    "Shape_Area": 11.54459999882113
    },
    "geometry": {
        "paths": [
            [
                [
                    582433.79,
                    3426742.47
                ],
                [
                    582437.43,
                    3426741.1100000005
                ],
                [
                    582436.5700000001,
                    3426738.3300000007
                ],
                [
                    582432.8400000001,
                    3426739.6400000008
                ],
                [
                    582433.79,
                    3426742.47
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 74,
            "Name": "CC131-2",
                "Shape_Length": 23.306216833777684,
                    "Shape_Area": 29.855399999878509
    },
    "geometry": {
        "paths": [
            [
                [
                    582629.2400000001,
                    3426756.3300000007
                ],
                [
                    582636.7200000001,
                    3426757.8200000005
                ],
                [
                    582637.0900000001,
                    3426753.3200000005
                ],
                [
                    582629.14,
                    3426753.1200000008
                ],
                [
                    582629.2400000001,
                    3426756.3300000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 75,
            "Name": "CC132-2",
                "Shape_Length": 14.063487177956567,
                    "Shape_Area": 11.93609999941648
    },
    "geometry": {
        "paths": [
            [
                [
                    582830.2200000001,
                    3426781.4200000006
                ],
                [
                    582834.03,
                    3426779.6700000006
                ],
                [
                    582832.8500000001,
                    3426777.1400000008
                ],
                [
                    582829.03,
                    3426778.7300000006
                ],
                [
                    582830.2200000001,
                    3426781.4200000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 76,
            "Name": "CC133-2",
                "Shape_Length": 19.796081495317929,
                    "Shape_Area": 0.5159999998336424
    },
    "geometry": {
        "paths": [
            [
                [
                    583023.05,
                    3426792.6900000006
                ],
                [
                    583027.3800000001,
                    3426793.6400000008
                ],
                [
                    583022.41,
                    3426795.49
                ],
                [
                    583027.28,
                    3426795.6900000006
                ],
                [
                    583023.05,
                    3426792.6900000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 77,
            "Name": "CC134-2",
                "Shape_Length": 13.026129762618869,
                    "Shape_Area": 9.885599999445234
    },
    "geometry": {
        "paths": [
            [
                [
                    583276.41,
                    3426794.7600000004
                ],
                [
                    583280.2100000001,
                    3426794.8700000008
                ],
                [
                    583280.29,
                    3426792.6400000008
                ],
                [
                    583276.1000000001,
                    3426792.0200000007
                ],
                [
                    583276.41,
                    3426794.7600000004
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 78,
            "Name": "CC135-2",
                "Shape_Length": 18.413414171352757,
                    "Shape_Area": 2.8126499990870017
    },
    "geometry": {
        "paths": [
            [
                [
                    583495.43,
                    3426716.6400000008
                ],
                [
                    583492.9600000001,
                    3426711.9300000008
                ],
                [
                    583490.8400000001,
                    3426715.5300000004
                ],
                [
                    583496.7000000001,
                    3426714.0600000007
                ],
                [
                    583495.43,
                    3426716.6400000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 79,
            "Name": "CC136-2",
                "Shape_Length": 13.749715273116684,
                    "Shape_Area": 11.432000000421076
    },
    "geometry": {
        "paths": [
            [
                [
                    583755.4400000001,
                    3426773.4200000006
                ],
                [
                    583755.15,
                    3426776.3500000007
                ],
                [
                    583759.1200000001,
                    3426776.8300000007
                ],
                [
                    583759.4700000001,
                    3426774.1400000008
                ],
                [
                    583755.4400000001,
                    3426773.4200000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 80,
            "Name": "CC137-2",
                "Shape_Length": 14.422320897444238,
                    "Shape_Area": 12.806599999993667
    },
    "geometry": {
        "paths": [
            [
                [
                    584026.7300000001,
                    3426821.4400000006
                ],
                [
                    584022.4400000001,
                    3426821.2500000006
                ],
                [
                    584022.7100000001,
                    3426824.4800000006
                ],
                [
                    584026.29,
                    3426824.7100000006
                ],
                [
                    584026.7300000001,
                    3426821.4400000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 81,
            "Name": "CC139-2",
                "Shape_Length": 14.356222687633986,
                    "Shape_Area": 11.033549999959464
    },
    "geometry": {
        "paths": [
            [
                [
                    584463.3300000001,
                    3426750.4000000006
                ],
                [
                    584463.8800000001,
                    3426752.8600000005
                ],
                [
                    584468.1100000001,
                    3426753.5900000005
                ],
                [
                    584468.4900000001,
                    3426751.3200000005
                ],
                [
                    584463.3300000001,
                    3426750.4000000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 82,
            "Name": "CC140-2",
                "Shape_Length": 12.597174091748223,
                    "Shape_Area": 4.220200000314112
    },
    "geometry": {
        "paths": [
            [
                [
                    584588.0900000001,
                    3426820.9100000008
                ],
                [
                    584589.1300000001,
                    3426817.0400000007
                ],
                [
                    584588.5000000001,
                    3426816.9200000006
                ],
                [
                    584586.4700000001,
                    3426822.3400000005
                ],
                [
                    584588.0900000001,
                    3426820.9100000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 83,
            "Name": "CC315-2",
                "Shape_Length": 9.634247863954542,
                    "Shape_Area": 3.0223499999636318
    },
    "geometry": {
        "paths": [
            [
                [
                    590756.9600000001,
                    3423692.0300000004
                ],
                [
                    590752.9400000001,
                    3423692.8200000005
                ],
                [
                    590753.0800000001,
                    3423693.3400000005
                ],
                [
                    590757.1100000001,
                    3423692.97
                ],
                [
                    590756.9600000001,
                    3423692.0300000004
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 84,
            "Name": "CC316-2",
                "Shape_Length": 13.35128925084695,
                    "Shape_Area": 10.383449999546587
    },
    "geometry": {
        "paths": [
            [
                [
                    591241.89,
                    3423589.0100000004
                ],
                [
                    591240.9400000001,
                    3423586.5000000006
                ],
                [
                    591237.0700000001,
                    3423587.4200000006
                ],
                [
                    591237.6100000001,
                    3423589.7100000006
                ],
                [
                    591241.89,
                    3423589.0100000004
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 85,
            "Name": "CC317-2",
                "Shape_Length": 12.630649247900735,
                    "Shape_Area": 9.242599999758042
    },
    "geometry": {
        "paths": [
            [
                [
                    591750.93,
                    3423562.0300000004
                ],
                [
                    591750.93,
                    3423559.7100000006
                ],
                [
                    591746.93,
                    3423559.7700000007
                ],
                [
                    591746.91,
                    3423562.0600000007
                ],
                [
                    591750.93,
                    3423562.0300000004
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 86,
            "Name": "CC318-2",
                "Shape_Length": 8.99860107150205,
                    "Shape_Area": 1.941100000875164
    },
    "geometry": {
        "paths": [
            [
                [
                    592161.4900000001,
                    3423595.3800000005
                ],
                [
                    592157.5100000001,
                    3423595.0900000005
                ],
                [
                    592157.4,
                    3423595.6400000008
                ],
                [
                    592161.43,
                    3423595.7900000007
                ],
                [
                    592161.4900000001,
                    3423595.3800000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 87,
            "Name": "CC319-2",
                "Shape_Length": 10.638216469785057,
                    "Shape_Area": 5.118200000051362
    },
    "geometry": {
        "paths": [
            [
                [
                    592591.7400000001,
                    3423615.47
                ],
                [
                    592587.7500000001,
                    3423616.0100000004
                ],
                [
                    592587.8200000001,
                    3423617.2600000004
                ],
                [
                    592591.8700000001,
                    3423616.74
                ],
                [
                    592591.7400000001,
                    3423615.47
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 88,
            "Name": "CC320-2",
                "Shape_Length": 9.955215598135375,
                    "Shape_Area": 3.384399999979092
    },
    "geometry": {
        "paths": [
            [
                [
                    593010.55,
                    3423668.4200000006
                ],
                [
                    593006.55,
                    3423669.2700000007
                ],
                [
                    593007.14,
                    3423670.4400000006
                ],
                [
                    593010.8800000001,
                    3423668.6900000006
                ],
                [
                    593010.55,
                    3423668.4200000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 89,
            "Name": "CC340-2",
                "Shape_Length": 16.426873622562373,
                    "Shape_Area": 0.015199999981746079
    },
    "geometry": {
        "paths": [
            [
                [
                    601408.8600000001,
                    3425012.3200000005
                ],
                [
                    601413.0100000001,
                    3425012.1000000007
                ],
                [
                    601408.8400000001,
                    3425012.0400000007
                ],
                [
                    601412.8800000001,
                    3425011.8000000005
                ],
                [
                    601408.8600000001,
                    3425012.3200000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 90,
            "Name": "CC341-2",
                "Shape_Length": 8.864195053152632,
                    "Shape_Area": 2.04019999945031
    },
    "geometry": {
        "paths": [
            [
                [
                    601593.0700000001,
                    3425041.4200000006
                ],
                [
                    601589.2600000001,
                    3425042.2800000004
                ],
                [
                    601589.5100000001,
                    3425042.7
                ],
                [
                    601593.31,
                    3425041.97
                ],
                [
                    601593.0700000001,
                    3425041.4200000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 91,
            "Name": "CC342-2",
                "Shape_Length": 13.412839076862248,
                    "Shape_Area": 10.71875000003027
    },
    "geometry": {
        "paths": [
            [
                [
                    601932.8400000001,
                    3425113.6400000008
                ],
                [
                    601936.6300000001,
                    3425114.9400000006
                ],
                [
                    601937.77,
                    3425112.5800000007
                ],
                [
                    601933.9400000001,
                    3425111.1700000006
                ],
                [
                    601932.8400000001,
                    3425113.6400000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 92,
            "Name": "CC343-2",
                "Shape_Length": 15.672194895752153,
                    "Shape_Area": 0.0873999998740852
    },
    "geometry": {
        "paths": [
            [
                [
                    602062.41,
                    3425140.0200000007
                ],
                [
                    602058.5100000001,
                    3425140.9600000006
                ],
                [
                    602062.8600000001,
                    3425140.7
                ],
                [
                    602059.27,
                    3425141.72
                ],
                [
                    602062.41,
                    3425140.0200000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 93,
            "Name": "CC351-2",
                "Shape_Length": 11.43008562702821,
                    "Shape_Area": 8.05699999950081
    },
    "geometry": {
        "paths": [
            [
                [
                    604200.68,
                    3425494.7700000007
                ],
                [
                    604197.6000000001,
                    3425494.8800000005
                ],
                [
                    604197.53,
                    3425497.5700000005
                ],
                [
                    604200.7000000001,
                    3425497.24
                ],
                [
                    604200.68,
                    3425494.7700000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 94,
            "Name": "CC352-2",
                "Shape_Length": 10.940715197282973,
                    "Shape_Area": 5.52964999928514
    },
    "geometry": {
        "paths": [
            [
                [
                    604439.8400000001,
                    3425541.4100000008
                ],
                [
                    604436.16,
                    3425539.3700000008
                ],
                [
                    604435.68,
                    3425540.8800000005
                ],
                [
                    604439.39,
                    3425542.4400000006
                ],
                [
                    604439.8400000001,
                    3425541.4100000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 95,
            "Name": "CC353-2",
                "Shape_Length": 10.01367111410165,
                    "Shape_Area": 6.0196000003770229
    },
    "geometry": {
        "paths": [
            [
                [
                    604750.28,
                    3425524.5700000005
                ],
                [
                    604748.8300000001,
                    3425523.1700000006
                ],
                [
                    604746.6900000001,
                    3425525.2600000004
                ],
                [
                    604748.1200000001,
                    3425526.6600000008
                ],
                [
                    604750.28,
                    3425524.5700000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 96,
            "Name": "CC354-2",
                "Shape_Length": 13.2724202675045,
                    "Shape_Area": 10.54564999945988
    },
    "geometry": {
        "paths": [
            [
                [
                    605285.55,
                    3425697.4000000006
                ],
                [
                    605285.8900000001,
                    3425694.7500000006
                ],
                [
                    605281.8800000001,
                    3425694.3500000007
                ],
                [
                    605281.6100000001,
                    3425696.9400000006
                ],
                [
                    605285.55,
                    3425697.4000000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 97,
            "Name": "CC355-2",
                "Shape_Length": 13.558704691037266,
                    "Shape_Area": 11.410100000938494
    },
    "geometry": {
        "paths": [
            [
                [
                    605572.0100000001,
                    3425679.9000000006
                ],
                [
                    605571.6400000001,
                    3425677.0100000004
                ],
                [
                    605567.9900000001,
                    3425677.22
                ],
                [
                    605568.5100000001,
                    3425680.6000000007
                ],
                [
                    605572.0100000001,
                    3425679.9000000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 98,
            "Name": "CC356-2",
                "Shape_Length": 10.261952630941039,
                    "Shape_Area": 6.4044000001385819
    },
    "geometry": {
        "paths": [
            [
                [
                    605753.27,
                    3425647.8700000008
                ],
                [
                    605755.8400000001,
                    3425648.8800000005
                ],
                [
                    605756.3900000001,
                    3425646.7900000007
                ],
                [
                    605753.8600000001,
                    3425645.4600000006
                ],
                [
                    605753.27,
                    3425647.8700000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 99,
            "Name": "CC357-2",
                "Shape_Length": 13.923663497265668,
                    "Shape_Area": 11.87575000040885
    },
    "geometry": {
        "paths": [
            [
                [
                    606001.1300000001,
                    3425702.6800000008
                ],
                [
                    606000.8300000001,
                    3425699.7100000006
                ],
                [
                    605996.8800000001,
                    3425700.1200000008
                ],
                [
                    605997.18,
                    3425703.1000000007
                ],
                [
                    606001.1300000001,
                    3425702.6800000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 100,
            "Name": "CC358-2",
                "Shape_Length": 12.585486263217419,
                    "Shape_Area": 9.229200000748806
    },
    "geometry": {
        "paths": [
            [
                [
                    606255.93,
                    3425744.6600000008
                ],
                [
                    606256.4,
                    3425742.3500000007
                ],
                [
                    606252.4600000001,
                    3425742.0500000005
                ],
                [
                    606252.04,
                    3425744.3900000008
                ],
                [
                    606255.93,
                    3425744.6600000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 101,
            "Name": "CC359-2",
                "Shape_Length": 12.612405316802905,
                    "Shape_Area": 9.231199999174523
    },
    "geometry": {
        "paths": [
            [
                [
                    606515.7500000001,
                    3425837.7100000006
                ],
                [
                    606516.79,
                    3425835.5800000007
                ],
                [
                    606513.5100000001,
                    3425833.3900000008
                ],
                [
                    606512.4800000001,
                    3425835.5100000004
                ],
                [
                    606515.7500000001,
                    3425837.7100000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 102,
            "Name": "CC360-2",
                "Shape_Length": 12.559613538240054,
                    "Shape_Area": 9.099949999608752
    },
    "geometry": {
        "paths": [
            [
                [
                    606730.8,
                    3425841.1000000007
                ],
                [
                    606731.2400000001,
                    3425838.8500000007
                ],
                [
                    606727.3700000001,
                    3425837.7700000007
                ],
                [
                    606726.9900000001,
                    3425840.0300000004
                ],
                [
                    606730.8,
                    3425841.1000000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 103,
            "Name": "CC361-2",
                "Shape_Length": 14.68553880819979,
                    "Shape_Area": 13.237499999944703
    },
    "geometry": {
        "paths": [
            [
                [
                    606981.7100000001,
                    3425868.0100000004
                ],
                [
                    606982.0800000001,
                    3425871.3400000005
                ],
                [
                    606985.91,
                    3425870.7600000004
                ],
                [
                    606985.9800000001,
                    3425867.5900000005
                ],
                [
                    606981.7100000001,
                    3425868.0100000004
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 104,
            "Name": "CC362-2",
                "Shape_Length": 13.498189677599563,
                    "Shape_Area": 11.02860000026282
    },
    "geometry": {
        "paths": [
            [
                [
                    607196.9800000001,
                    3425874.3200000005
                ],
                [
                    607196.5700000001,
                    3425871.5500000005
                ],
                [
                    607192.67,
                    3425872.1800000008
                ],
                [
                    607193.03,
                    3425874.9100000008
                ],
                [
                    607196.9800000001,
                    3425874.3200000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 105,
            "Name": "CC363-2",
                "Shape_Length": 11.837787606579717,
                    "Shape_Area": 7.536900000551855
    },
    "geometry": {
        "paths": [
            [
                [
                    607357.53,
                    3425797.3900000008
                ],
                [
                    607357.5700000001,
                    3425795.47
                ],
                [
                    607353.7000000001,
                    3425794.5700000005
                ],
                [
                    607353.6100000001,
                    3425796.49
                ],
                [
                    607357.53,
                    3425797.3900000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 106,
            "Name": "CC364-2",
                "Shape_Length": 13.568056620083711,
                    "Shape_Area": 11.343549999434432
    },
    "geometry": {
        "paths": [
            [
                [
                    607563.1000000001,
                    3425791.7500000006
                ],
                [
                    607559.5800000001,
                    3425791.3700000008
                ],
                [
                    607558.7300000001,
                    3425794.1900000006
                ],
                [
                    607562.52,
                    3425794.9200000006
                ],
                [
                    607563.1000000001,
                    3425791.7500000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 107,
            "Name": "CC365-2",
                "Shape_Length": 10.475482340634177,
                    "Shape_Area": 6.773599999841396
    },
    "geometry": {
        "paths": [
            [
                [
                    607741.55,
                    3425822.0300000004
                ],
                [
                    607741.5100000001,
                    3425819.4800000006
                ],
                [
                    607738.8200000001,
                    3425819.9800000006
                ],
                [
                    607738.9500000001,
                    3425822.5200000007
                ],
                [
                    607741.55,
                    3425822.0300000004
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 108,
            "Name": "CC366-2",
                "Shape_Length": 11.887698255767564,
                    "Shape_Area": 7.804050000456907
    },
    "geometry": {
        "paths": [
            [
                [
                    607960.1000000001,
                    3425827.0800000007
                ],
                [
                    607960.8800000001,
                    3425825.3000000005
                ],
                [
                    607957.2300000001,
                    3425823.7700000007
                ],
                [
                    607956.3900000001,
                    3425825.5600000007
                ],
                [
                    607960.1000000001,
                    3425827.0800000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 109,
            "Name": "CC367-2",
                "Shape_Length": 16.919978022848978,
                    "Shape_Area": 0.09400000031944345
    },
    "geometry": {
        "paths": [
            [
                [
                    608150.16,
                    3425899.8700000008
                ],
                [
                    608152.6000000001,
                    3425902.7
                ],
                [
                    608148.54,
                    3425901.7100000006
                ],
                [
                    608150.7300000001,
                    3425904.9400000006
                ],
                [
                    608150.16,
                    3425899.8700000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 110,
            "Name": "CC368-2",
                "Shape_Length": 18.667227344064825,
                    "Shape_Area": 0.1819500000851228
    },
    "geometry": {
        "paths": [
            [
                [
                    608378.0000000001,
                    3426081.9800000006
                ],
                [
                    608374.81,
                    3426077.22
                ],
                [
                    608378.42,
                    3426079.6100000005
                ],
                [
                    608374.1000000001,
                    3426080.3600000005
                ],
                [
                    608378.0000000001,
                    3426081.9800000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 111,
            "Name": "CC369-2",
                "Shape_Length": 11.836105874933356,
                    "Shape_Area": 7.723200000057183
    },
    "geometry": {
        "paths": [
            [
                [
                    608564.92,
                    3426148.8300000007
                ],
                [
                    608565.8,
                    3426147.1600000008
                ],
                [
                    608562.43,
                    3426145.0700000005
                ],
                [
                    608561.4800000001,
                    3426146.8400000005
                ],
                [
                    608564.92,
                    3426148.8300000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 112,
            "Name": "CC370-2",
                "Shape_Length": 12.074729577215427,
                    "Shape_Area": 8.22660000045176
    },
    "geometry": {
        "paths": [
            [
                [
                    608758.7000000001,
                    3426292.6000000007
                ],
                [
                    608759.6200000001,
                    3426290.6600000008
                ],
                [
                    608756.1400000001,
                    3426288.8000000005
                ],
                [
                    608755.27,
                    3426290.6300000005
                ],
                [
                    608758.7000000001,
                    3426292.6000000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 113,
            "Name": "CC371-2",
                "Shape_Length": 12.532750668751842,
                    "Shape_Area": 9.086750000460772
    },
    "geometry": {
        "paths": [
            [
                [
                    608943.02,
                    3426376.7300000006
                ],
                [
                    608943.68,
                    3426374.7100000006
                ],
                [
                    608940.2600000001,
                    3426373.24
                ],
                [
                    608939.05,
                    3426375.4400000006
                ],
                [
                    608943.02,
                    3426376.7300000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 114,
            "Name": "CC372-2",
                "Shape_Length": 12.654112424962568,
                    "Shape_Area": 9.382450000952185
    },
    "geometry": {
        "paths": [
            [
                [
                    609070.4900000001,
                    3426504.1800000008
                ],
                [
                    609071.53,
                    3426502.0600000007
                ],
                [
                    609067.92,
                    3426500.47
                ],
                [
                    609066.8600000001,
                    3426502.6200000008
                ],
                [
                    609070.4900000001,
                    3426504.1800000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 115,
            "Name": "CC373-2",
                "Shape_Length": 12.203090361570082,
                    "Shape_Area": 8.444899999892713
    },
    "geometry": {
        "paths": [
            [
                [
                    609377.4800000001,
                    3426447.1300000005
                ],
                [
                    609377.78,
                    3426445.0100000004
                ],
                [
                    609373.9,
                    3426444.1700000006
                ],
                [
                    609373.6100000001,
                    3426446.2800000004
                ],
                [
                    609377.4800000001,
                    3426447.1300000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 116,
            "Name": "CC374-2",
                "Shape_Length": 13.534850958481919,
                    "Shape_Area": 10.682549999452359
    },
    "geometry": {
        "paths": [
            [
                [
                    609688.42,
                    3426542.1100000005
                ],
                [
                    609689.3300000001,
                    3426539.4100000008
                ],
                [
                    609685.03,
                    3426538.5100000004
                ],
                [
                    609684.6100000001,
                    3426540.7
                ],
                [
                    609688.42,
                    3426542.1100000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 117,
            "Name": "CC375-2",
                "Shape_Length": 11.899198496999045,
                    "Shape_Area": 7.799999999920837
    },
    "geometry": {
        "paths": [
            [
                [
                    609938.1100000001,
                    3426609.5300000004
                ],
                [
                    609938.8800000001,
                    3426607.7
                ],
                [
                    609935.1200000001,
                    3426606.4100000008
                ],
                [
                    609934.3400000001,
                    3426608.1800000008
                ],
                [
                    609938.1100000001,
                    3426609.5300000004
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 118,
            "Name": "CC376-2",
                "Shape_Length": 13.056036909059906,
                    "Shape_Area": 10.070199999907821
    },
    "geometry": {
        "paths": [
            [
                [
                    610083.8200000001,
                    3426689.74
                ],
                [
                    610085.9600000001,
                    3426688.4000000006
                ],
                [
                    610083.6300000001,
                    3426685.1100000005
                ],
                [
                    610081.53,
                    3426686.45
                ],
                [
                    610083.8200000001,
                    3426689.74
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 119,
            "Name": "CC377-2",
                "Shape_Length": 12.925359900735846,
                    "Shape_Area": 9.781550000460399
    },
    "geometry": {
        "paths": [
            [
                [
                    610474.17,
                    3426763.0900000005
                ],
                [
                    610470.3400000001,
                    3426761.9600000006
                ],
                [
                    610469.5000000001,
                    3426764.3500000007
                ],
                [
                    610473.4500000001,
                    3426765.3100000007
                ],
                [
                    610474.17,
                    3426763.0900000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 120,
            "Name": "CC379-2",
                "Shape_Length": 12.655058356472848,
                    "Shape_Area": 9.314549999711615
    },
    "geometry": {
        "paths": [
            [
                [
                    610976.55,
                    3427014.0700000005
                ],
                [
                    610978.3800000001,
                    3427012.4400000006
                ],
                [
                    610975.3500000001,
                    3427009.9600000006
                ],
                [
                    610973.5700000001,
                    3427011.49
                ],
                [
                    610976.55,
                    3427014.0700000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 121,
            "Name": "CC380-2",
                "Shape_Length": 12.213510689918414,
                    "Shape_Area": 8.548649999312964
    },
    "geometry": {
        "paths": [
            [
                [
                    611259.4400000001,
                    3427022.7300000006
                ],
                [
                    611260.03,
                    3427020.4100000008
                ],
                [
                    611256.17,
                    3427020.2100000006
                ],
                [
                    611255.6200000001,
                    3427022.24
                ],
                [
                    611259.4400000001,
                    3427022.7300000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 122,
            "Name": "CC381-2",
                "Shape_Length": 12.754483265804339,
                    "Shape_Area": 9.53485000045374
    },
    "geometry": {
        "paths": [
            [
                [
                    611527.56,
                    3427072.6600000008
                ],
                [
                    611528.41,
                    3427070.47
                ],
                [
                    611524.7500000001,
                    3427068.8700000008
                ],
                [
                    611523.8900000001,
                    3427071.1600000008
                ],
                [
                    611527.56,
                    3427072.6600000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 123,
            "Name": "CC382-2",
                "Shape_Length": 11.376317757010993,
                    "Shape_Area": 7.937599999610777
    },
    "geometry": {
        "paths": [
            [
                [
                    611688.6400000001,
                    3427172.7300000006
                ],
                [
                    611691.6000000001,
                    3427174.45
                ],
                [
                    611692.4700000001,
                    3427172.0000000006
                ],
                [
                    611690.0000000001,
                    3427170.6100000005
                ],
                [
                    611688.6400000001,
                    3427172.7300000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 124,
            "Name": "CC383-2",
                "Shape_Length": 13.544245287441031,
                    "Shape_Area": 11.089600000376441
    },
    "geometry": {
        "paths": [
            [
                [
                    611913.6100000001,
                    3427232.74
                ],
                [
                    611910.65,
                    3427230.2700000007
                ],
                [
                    611908.7000000001,
                    3427232.22
                ],
                [
                    611911.81,
                    3427234.9100000008
                ],
                [
                    611913.6100000001,
                    3427232.74
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 125,
            "Name": "CC384-2",
                "Shape_Length": 12.694377246005553,
                    "Shape_Area": 9.920800000202306
    },
    "geometry": {
        "paths": [
            [
                [
                    612261.43,
                    3427323.2
                ],
                [
                    612265.0100000001,
                    3427322.6400000008
                ],
                [
                    612263.7300000001,
                    3427319.6700000006
                ],
                [
                    612260.79,
                    3427320.49
                ],
                [
                    612261.43,
                    3427323.2
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 126,
            "Name": "CC385-2",
                "Shape_Length": 12.438288697178964,
                    "Shape_Area": 9.523399999725772
    },
    "geometry": {
        "paths": [
            [
                [
                    612571.9600000001,
                    3427296.8800000005
                ],
                [
                    612573.3300000001,
                    3427294.3200000005
                ],
                [
                    612569.8900000001,
                    3427293.1400000008
                ],
                [
                    612568.9900000001,
                    3427295.6800000008
                ],
                [
                    612571.9600000001,
                    3427296.8800000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 127,
            "Name": "CC386-2",
                "Shape_Length": 12.20436945707915,
                    "Shape_Area": 8.752899999237642
    },
    "geometry": {
        "paths": [
            [
                [
                    612814.2500000001,
                    3427340.1000000007
                ],
                [
                    612817.17,
                    3427342.2
                ],
                [
                    612818.3400000001,
                    3427340.3100000007
                ],
                [
                    612815.42,
                    3427337.8300000007
                ],
                [
                    612814.2500000001,
                    3427340.1000000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 128,
            "Name": "CC387-2",
                "Shape_Length": 14.7556741769076,
                    "Shape_Area": 13.34949999875226
    },
    "geometry": {
        "paths": [
            [
                [
                    613011.1400000001,
                    3427457.0100000004
                ],
                [
                    613012.93,
                    3427453.5400000007
                ],
                [
                    613009.81,
                    3427452.4300000008
                ],
                [
                    613007.6000000001,
                    3427455.2600000004
                ],
                [
                    613011.1400000001,
                    3427457.0100000004
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 129,
            "Name": "CC388-2",
                "Shape_Length": 12.93302491598058,
                    "Shape_Area": 9.5180000000149
    },
    "geometry": {
        "paths": [
            [
                [
                    613193.0800000001,
                    3427484.6200000008
                ],
                [
                    613189.41,
                    3427483.2300000006
                ],
                [
                    613188.6200000001,
                    3427485.7900000007
                ],
                [
                    613192.91,
                    3427486.5800000007
                ],
                [
                    613193.0800000001,
                    3427484.6200000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 130,
            "Name": "CC390-2",
                "Shape_Length": 14.194515752723519,
                    "Shape_Area": 12.121799999600557
    },
    "geometry": {
        "paths": [
            [
                [
                    613801.66,
                    3427553.0400000007
                ],
                [
                    613801.3500000001,
                    3427550.0400000007
                ],
                [
                    613797.3700000001,
                    3427550.0000000006
                ],
                [
                    613797.27,
                    3427552.8000000005
                ],
                [
                    613801.66,
                    3427553.0400000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 131,
            "Name": "CC391-2",
                "Shape_Length": 15.105256315167239,
                    "Shape_Area": 0.10935000096387288
    },
    "geometry": {
        "paths": [
            [
                [
                    614095.4400000001,
                    3427581.3800000005
                ],
                [
                    614095.6100000001,
                    3427578.49
                ],
                [
                    614091.7400000001,
                    3427581.49
                ],
                [
                    614091.8800000001,
                    3427578.6600000008
                ],
                [
                    614095.4400000001,
                    3427581.3800000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 132,
            "Name": "CC392-2",
                "Shape_Length": 13.130354486346903,
                    "Shape_Area": 10.318549999684724
    },
    "geometry": {
        "paths": [
            [
                [
                    614426.3200000001,
                    3427646.5800000007
                ],
                [
                    614427.53,
                    3427644.1800000008
                ],
                [
                    614424.1400000001,
                    3427642.2500000006
                ],
                [
                    614422.92,
                    3427644.49
                ],
                [
                    614426.3200000001,
                    3427646.5800000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 133,
            "Name": "CC393-2",
                "Shape_Length": 13.48736774575041,
                    "Shape_Area": 10.985899999820651
    },
    "geometry": {
        "paths": [
            [
                [
                    614684.1900000001,
                    3427765.4400000006
                ],
                [
                    614684.79,
                    3427762.7300000006
                ],
                [
                    614680.93,
                    3427762.0300000004
                ],
                [
                    614680.2300000001,
                    3427764.7
                ],
                [
                    614684.1900000001,
                    3427765.4400000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 134,
            "Name": "CC394-2",
                "Shape_Length": 12.854044516182683,
                    "Shape_Area": 9.871399999705748
    },
    "geometry": {
        "paths": [
            [
                [
                    615080.2100000001,
                    3427930.8100000007
                ],
                [
                    615080.7100000001,
                    3427928.0900000005
                ],
                [
                    615077.8800000001,
                    3427926.4300000008
                ],
                [
                    615076.66,
                    3427928.95
                ],
                [
                    615080.2100000001,
                    3427930.8100000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 135,
            "Name": "CC395-2",
                "Shape_Length": 12.572624874048826,
                    "Shape_Area": 9.330599999779928
    },
    "geometry": {
        "paths": [
            [
                [
                    615345.3700000001,
                    3427942.7800000004
                ],
                [
                    615345.5100000001,
                    3427940.4600000006
                ],
                [
                    615341.6200000001,
                    3427939.9400000006
                ],
                [
                    615341.5800000001,
                    3427942.4600000006
                ],
                [
                    615345.3700000001,
                    3427942.7800000004
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 136,
            "Name": "CC396-2",
                "Shape_Length": 13.344759782639127,
                    "Shape_Area": 10.69205000013595
    },
    "geometry": {
        "paths": [
            [
                [
                    615566.1300000001,
                    3427789.8000000005
                ],
                [
                    615566.93,
                    3427787.2300000006
                ],
                [
                    615563.1100000001,
                    3427786.1300000005
                ],
                [
                    615562.28,
                    3427788.6600000008
                ],
                [
                    615566.1300000001,
                    3427789.8000000005
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 137,
            "Name": "CC399-2",
                "Shape_Length": 11.763399955791059,
                    "Shape_Area": 7.353599999343137
    },
    "geometry": {
        "paths": [
            [
                [
                    560692.9600000001,
                    3426037.74
                ],
                [
                    560696.7400000001,
                    3426036.3400000005
                ],
                [
                    560696.2400000001,
                    3426034.6000000007
                ],
                [
                    560692.3800000001,
                    3426036.0300000004
                ],
                [
                    560692.9600000001,
                    3426037.74
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 138,
            "Name": "CCXJ1-2",
                "Shape_Length": 8.838608189806412,
                    "Shape_Area": 1.4919000004237984
    },
    "geometry": {
        "paths": [
            [
                [
                    590938.52,
                    3423630.6500000006
                ],
                [
                    590934.8300000001,
                    3423632.22
                ],
                [
                    590935.0000000001,
                    3423632.7900000007
                ],
                [
                    590938.56,
                    3423630.8000000005
                ],
                [
                    590938.52,
                    3423630.6500000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 139,
            "Name": "CCXJ2-2",
                "Shape_Length": 10.158196918926795,
                    "Shape_Area": 4.261050000270293
    },
    "geometry": {
        "paths": [
            [
                [
                    591554.7400000001,
                    3423541.47
                ],
                [
                    591550.77,
                    3423540.9200000006
                ],
                [
                    591550.7500000001,
                    3423542.0200000007
                ],
                [
                    591554.7300000001,
                    3423542.5100000004
                ],
                [
                    591554.7400000001,
                    3423541.47
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 140,
            "Name": "CCXJ3-2",
                "Shape_Length": 9.224058201541857,
                    "Shape_Area": 2.483900000029965
    },
    "geometry": {
        "paths": [
            [
                [
                    591978.6200000001,
                    3423590.2800000004
                ],
                [
                    591974.65,
                    3423590.2100000006
                ],
                [
                    591974.56,
                    3423590.95
                ],
                [
                    591978.55,
                    3423590.7900000007
                ],
                [
                    591978.6200000001,
                    3423590.2800000004
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 141,
            "Name": "CCXJ4-2",
                "Shape_Length": 8.884780772176568,
                    "Shape_Area": 1.7809499993451872
    },
    "geometry": {
        "paths": [
            [
                [
                    592386.1000000001,
                    3423607.8700000008
                ],
                [
                    592382.1100000001,
                    3423608.1800000008
                ],
                [
                    592382.14,
                    3423608.6200000008
                ],
                [
                    592386.1200000001,
                    3423608.3200000005
                ],
                [
                    592386.1000000001,
                    3423607.8700000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 142,
            "Name": "CCXJ5-2",
                "Shape_Length": 10.154806687468789,
                    "Shape_Area": 4.301250000789296
    },
    "geometry": {
        "paths": [
            [
                [
                    592782.1100000001,
                    3423645.5000000006
                ],
                [
                    592778.15,
                    3423646.1300000005
                ],
                [
                    592778.3,
                    3423647.1800000008
                ],
                [
                    592782.2500000001,
                    3423646.5800000007
                ],
                [
                    592782.1100000001,
                    3423645.5000000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 143,
            "Name": "CCXJ6-2",
                "Shape_Length": 9.59244042508084,
                    "Shape_Area": 3.229750000673579
    },
    "geometry": {
        "paths": [
            [
                [
                    593242.5800000001,
                    3423668.1500000006
                ],
                [
                    593238.6000000001,
                    3423667.7100000006
                ],
                [
                    593238.6200000001,
                    3423668.6200000008
                ],
                [
                    593242.5700000001,
                    3423668.8700000008
                ],
                [
                    593242.5800000001,
                    3423668.1500000006
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 144,
            "Name": "CCLD1-2",
                "Shape_Length": 9.952734385818858,
                    "Shape_Area": 3.7881999997964126
    },
    "geometry": {
        "paths": [
            [
                [
                    610093.52,
                    3427442.2600000004
                ],
                [
                    610095.3600000001,
                    3427438.6900000006
                ],
                [
                    610094.6400000001,
                    3427438.3000000005
                ],
                [
                    610092.5700000001,
                    3427441.7900000007
                ],
                [
                    610093.52,
                    3427442.2600000004
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 145,
            "Name": "CCLD2-2",
                "Shape_Length": 10.125746204377617,
                    "Shape_Area": 5.761249999905122
    },
    "geometry": {
        "paths": [
            [
                [
                    610298.7400000001,
                    3427493.5800000007
                ],
                [
                    610301.4900000001,
                    3427495.5600000007
                ],
                [
                    610302.4,
                    3427493.8900000008
                ],
                [
                    610299.5800000001,
                    3427492.2500000006
                ],
                [
                    610298.7400000001,
                    3427493.5800000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 146,
            "Name": "CCLD3-2",
                "Shape_Length": 11.523714275323073,
                    "Shape_Area": 7.14499999995809
    },
    "geometry": {
        "paths": [
            [
                [
                    610522.93,
                    3427588.0200000007
                ],
                [
                    610526.7600000001,
                    3427589.2600000004
                ],
                [
                    610527.2300000001,
                    3427587.4600000006
                ],
                [
                    610523.5100000001,
                    3427586.3600000005
                ],
                [
                    610522.93,
                    3427588.0200000007
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 147,
            "Name": "CCLD4-2",
                "Shape_Length": 10.52481188434925,
                    "Shape_Area": 5.264949999448098
    },
    "geometry": {
        "paths": [
            [
                [
                    610748.54,
                    3427658.9300000008
                ],
                [
                    610751.9400000001,
                    3427660.2
                ],
                [
                    610752.8700000001,
                    3427658.8700000008
                ],
                [
                    610748.92,
                    3427657.8100000007
                ],
                [
                    610748.54,
                    3427658.9300000008
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 148,
            "Name": "CCLD5-2",
                "Shape_Length": 10.222899064466338,
                    "Shape_Area": 4.343999999666936
    },
    "geometry": {
        "paths": [
            [
                [
                    610940.7000000001,
                    3427717.97
                ],
                [
                    610944.5700000001,
                    3427718.9300000008
                ],
                [
                    610944.9,
                    3427717.9600000006
                ],
                [
                    610940.9700000001,
                    3427716.8700000008
                ],
                [
                    610940.7000000001,
                    3427717.97
                ]
            ]
        ]
    }
},
{
    "attributes": {
        "OBJECTID": 149,
            "Name": "CCLD6-2",
                "Shape_Length": 9.93887871930232,
                    "Shape_Area": 4.0456499996321739
    },
    "geometry": {
        "paths": [
            [
                [
                    611104.9500000001,
                    3427833.1800000008
                ],
                [
                    611103.31,
                    3427836.8400000005
                ],
                [
                    611104.4700000001,
                    3427837.0500000005
                ],
                [
                    611105.8200000001,
                    3427833.4600000006
                ],
                [
                    611104.9500000001,
                    3427833.1800000008
                ]
            ]
        ]
    }
}
	]
;


var tempList = [];
//for (var i in jsondata2) {
//    var temp = {};
//    temp.xuHao = jsondata2[i].attributes.序号;
//    var starlb = xy2bl(jsondata2[i].geometry.paths[0][0][0], jsondata2[i].geometry.paths[0][0][1], 6378137.0, 1 / 298.257223563, 3, 108, false);
    
//    temp.startPoint = {
//        "B": starlb.b,
//        "L": starlb.l,
//        "H": 160
//    }
//    var endlb = xy2bl(jsondata2[i].geometry.paths[0][1][0], jsondata2[i].geometry.paths[0][1][1], 6378137.0, 1 / 298.257223563, 3, 108, false);

//    temp.endPoint = {
//        "B": endlb.b,
//        "L": endlb.l,
//        "H": 110
//    }
//    temp.name = temp.xuHao + "-" + temp.xuHao + "’";
//    temp.code = temp.xuHao + "-" + temp.xuHao + "’";
//    temp.type = "0";
//    tempList.push(temp);
//}
//var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

//$.ajax({
//    url: window.parent.servicesurl + "/api/RockDesign/GetRockDesignListInfo", type: "get", data: { "cookie": document.cookie, "projectId": 17 },
//    success: function (data) {
//        layer.close(loadingceindex);
//        var designList = JSON.parse(data);

//        //string sql = " UPDATE rock_design_data set remark={0},profile_position={1},name={2} WHERE id={3}";
//        //for (var i in designList) {
//        //    for (var j in tempList) {
//        //        if (designList[i].name.split("-")[0] == tempList[j].xuHao) {
//        //            var sendDate = {};

//        //            sendDate.profilePostion = JSON.stringify(tempList[j]);
//        //            sendDate.id = designList[i].id;
//        //            sendDate.name = designList[i].name.replace(/'/, '’');
//        //            sendDate.remark = designList[i].remark;
//        //            sendDate.cookie = document.cookie;
//        //            console.log(designList[i].name);

//        //            var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

//        //            $.ajax({
//        //                url: servicesurl + "/api/RockDesign/UpdateRockDesignPoint", type: "post", data: sendDate,
//        //                success: function (result) {
//        //                    layer.close(loadingceindex);

//        //                    if ("更新成功" == result) {
//        //                        console.log(成功);
//        //                    } else {
//        //                        //创建失败
//        //                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

//        //                    }

//        //                }, datatype: "json"
//        //            });
//        //        }
//        //    }
//        //}

//    }, datatype: "json"
//});
