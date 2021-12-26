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


function LoadMeasureLayer() {
    celiang();
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

    //var lbh1 = xy2bl(604803.8989, 3423783.5091, 6378137.0, 1 / 298.257223563, 3, 108, false);
    //var lbh2 = xy2bl(604255.5284, 3426368.1935, 6378137.0, 1 / 298.257223563, 3, 108, false);
    //var lbh1 = xy2bl(606688.1907, 3424772.6813, 6378137.0, 1 / 298.257223563, 3, 108, false);
    //var lbh2 = xy2bl(606525.0206, 3426634.7142, 6378137.0, 1 / 298.257223563, 3, 108, false);

    // 两个点输出地形加密点
    //var lbh1 = xy2bl(610183.0757, 3428274.9536, 6378137.0, 1 / 298.257223563, 3, 108, false);
    //var lbh2 = xy2bl(610724.1006, 3427142.3797, 6378137.0, 1 / 298.257223563, 3, 108, false);

    //var postionLB = new Cesium.Cartographic.fromDegrees(Math.PI / 180 * lbh1.l, Math.PI / 180 * lbh1.b);
    //console.log(postionLB);
    //var Heights = viewer.scene.sampleHeight(postionLB);

    ////var postionLB = new Cesium.Cartographic.fromDegrees(lbh1.l, lbh1.b);
    ////var Heights = viewer.scene.globe.getHeight(postionLB);
    //var tempList = [];
    //tempList.push(lbh1);
    //tempList.push(lbh2);
    //var pointList1 = [];
    //for (var m in tempList) {
    //    pointList1.push(new Cesium.Cartesian3.fromDegrees(tempList[m].l, tempList[m].b, 200));
    //}
    //var sum = Cesium.Cartesian3.distance(pointList1[0], pointList1[1]);
    //var bilichi = 2 / sum;
    //var lbian = (lbh1.l - lbh2.l) * bilichi;//jingdu 
    //var bbian = (lbh1.b - lbh2.b) * bilichi;//weidu 
    //var postionss = [];
    //for (var i = 0; i <(sum/2+1);i++) {
    //    var postionLB = new Cesium.Cartographic.fromDegrees(lbh2.l + lbian * i, lbh2.b + bbian * i);
    //    var Heights = viewer.scene.globe.getHeight(postionLB);

    //    var position = new Cesium.Cartesian3.fromDegrees((lbh2.l + lbian * i), (lbh2.b + bbian * i), Heights);

    //    var cartesian3 = Cesium.Cartographic.fromCartesian(position);                        //笛卡尔XYZ
    //    var longitude = Cesium.Math.toDegrees(cartesian3.longitude);                         //经度
    //    var latitude = Cesium.Math.toDegrees(cartesian3.latitude);                           //纬度
    //    var height = cartesian3.height;
    //    var xy = bl2xy(cartesian3.latitude * 180 / Math.PI, cartesian3.longitude * 180 / Math.PI, 6378137.0, 1 / 298.257223563, 3, 108, false);
    
    //    var temp = { "x": xy.x, "y": xy.y, "H": Heights };
    //    postionss.push(temp);
    //}
    //console.log(postionss);
    //console.log(sum);
    //viewer.entities.add({
    //    name: "tieMo1" + NewGuidCL(),
    //    polyline: {
    //        positions: pointList1,
    //        width: 5,
    //        material: Cesium.Color.RED,
    //        show: true,
    //        clampToGround: true,
    //        //classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
    //    }
    //});

    if (projectlayerlistceliangindex != null) {
        layer.msg('已打开测量窗口');
        return;
    }
   
    //弹出框
    projectlayerlistceliangindex = layer.open({
        type: 1
        , title: ['测量', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['300px', '350px']
        , shade: 0
        , offset: ['60px', '360px']
        , closeBtn: 1
        //, maxmin: true
        , moveOut: true
        //, btn: ['坐标', '距离', '面积', '产状', '体积']
        , content: celinghtml
        , zIndex: layer.zIndex
        , success: function (layero) {
            //置顶
            layer.setTop(layero);
            //地形测量把深度监测设置为TRUE
           // viewer.scene.globe.depthTestAgainstTerrain = true;
            // 进来就是地形测量
            form.render();
            form.val("celianginfoform", {
                "desc": "",
                "celiangfangfa": "请选择测量方法"
            });
            viewer.scene.globe.depthTestAgainstTerrain = true;
           // layer.min(projectindex)
            //置顶
        }
        , end: function () {
            viewer.scene.globe.depthTestAgainstTerrain = false;
            projectlayerlistceliangindex = null;
            //删除图层数据
        }
        , cancel: function (index, layero) {
            ClearCeliangTemp();
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
            if (viewer.scene.globe.depthTestAgainstTerrain) {//地形测量
                pickedOject = scene.pickPosition(leftclick.position);
            } else {
                pickedOject = scene.pick(leftclick.position);
            }
         

            if (pickedOject != undefined) {
                var position = scene.pickPosition(leftclick.position);
                if (position != undefined) {
                    var cartesian3 = Cesium.Cartographic.fromCartesian(position);                        //笛卡尔XYZ
                    var longitude = Cesium.Math.toDegrees(cartesian3.longitude);                         //经度
                    var latitude = Cesium.Math.toDegrees(cartesian3.latitude);                           //纬度
                    var height = cartesian3.height;           

                    var xy = bl2xy(cartesian3.latitude * 180 / Math.PI, cartesian3.longitude * 180 / Math.PI, 6378137.0, 1 / 298.257223563, 3, 108, false);

                    if (height > 0) {
                        // showCeliang = " 位置:" + "\n" + " X:" + position.x.toFixed(6) + "\n" + " Y:" + position.y.toFixed(6) + "\n" + " Z:" + position.z.toFixed(6);
                        showCeliang = "X: " + (xy.x).toFixed(3) + "\n" + "Y: " + parseFloat(xy.y).toFixed(3) + "\n" + "L: " + ToDegress(longitude) + "\n" + "B: " + ToDegress(latitude) + "\n" + "H: " + height.toFixed(2);


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
                                    text: '经纬度(' + longitude.toFixed(6) + ',' + latitude.toFixed(6) + ',' + height.toFixed(2) + ')',
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
        if (currentprojectid == null) {
            layer.msg('请先选择项目');
            elem.tabChange('celianglayer', 111); //
            return;
        }
        if (curtileset == null) {
            layer.msg('请先选择模型');
            elem.tabChange('celianglayer', 111); //
            return;
        }

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
            //if (handler != undefined) {
            //    handler.destroy();
            //}
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

            viewer.entities.add({
                name: "ptMeasue" + NewGuidCL(),
                position: pointcenter,
                point: {
                    pixelSize: 10,
                    color: Cesium.Color.RED,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                },

            });

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
            var xxishu = (maxX - minX) / 10;
            var yxishu = (maxY - minY) / 10;
            var jimiList = [];
            for (var x = 0; x < 11; x++) {
                for (var m = 0; m < 11; m++) {

                    var temp = new Cesium.Cartesian2(minX + xxishu * x, minY + yxishu * m);//b点，加了5.
                    if (scene.pickPosition(temp)) {
                        jimiList.push(scene.pickPosition(temp));
                        viewer.entities.add({
                            name: "ptMeasue" + NewGuidCL(),
                            position: scene.pickPosition(temp),
                            point: {
                                pixelSize: 2,
                                color: Cesium.Color.YELLOW,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY
                            },

                        });
                    }
                    
                }
            }
            console.log(jimiList);
            var sendDate = {};


            //sendDate.bpsList = JSON.stringify(points);
            //sendDate.eyesList = JSON.stringify(eyepostionList);
            //sendDate.spsList = JSON.stringify(jimiList);
            var sum = Cesium.Cartesian3.distance(points[0], points[points.length-1]);
            for (var j = 0; j < points.length - 1; j++) {
                sum = sum + Cesium.Cartesian3.distance(points[j], points[j + 1]);
            }
            sendDate.target = JSON.stringify(pointcenter);
            sendDate.eye = JSON.stringify(eyepostionList[0]);
            sendDate.sps = JSON.stringify(jimiList);
            sendDate.w = sum/4;
            sendDate.h = sum/4;
            
            sendDate.cookie = document.cookie;
            console.log(sendDate);



            
            
            var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

            $.ajax({
                url: servicesurl + "/api/FlzWindowInfo/getRockWindowInfo", type: "post", data: sendDate,//后台发送请求
                success: function (result) {


                    layer.close(loadingceindex);
                    //关闭
                    var windowInfos = JSON.parse(result);
                    console.log(windowInfos);
                   
                    if (windowInfos == "") {
                        
                        // viewer.Scene.sampleHeight();

                    } else {

                        console.log(windowInfos);
                        var tempLista = {};
                        tempLista.xyzs = JSON.stringify(points);
                        tempLista.mw = result;

                        //


                        var point2sList = [];
                        var loadingjieliindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                        for (var i in points) {

                        }

                        $.ajax({
                            url: servicesurl + "/api/FlzData/GetXYZ2sxy", type: "get", data: tempLista,
                            success: function (res) {
                                layer.close(loadingjieliindex);
                                point2sList = JSON.parse(res);
                                if (point2sList.length == 0) {
                                    layer.msg('二维坐标转换失败');
                                    return;
                                }

                                var area = 0;
                                
                                for (var i = 0; i < point2sList.length - 1; i++) {
                                    area += (point2sList[i].x - point2sList[0].x) * (point2sList[i + 1].y - point2sList[0].y) - (point2sList[i].y - point2sList[0].y) * (point2sList[i + 1].x - point2sList[0].x);
                                }
                                area = Math.abs(area) / 2;
                                console.log(area);
                                //计算重心
                                viewer.entities.add({
                                    name: "pylMeasue" + NewGuidCL(),
                                    position: Cesium.Cartesian3.fromDegrees(lSum / points.length, bSum / points.length, hSum / points.length),
                                    label: {
                                        text: '面积：' + area.toFixed(2) + '平方米  \n  周长：' + sum.toFixed(2) + '米',
                                        showBackground: true,
                                        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                        font: '16px Times New Roman',
                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                                        // pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                    }
                                });

                                showCeliang = " 面积:" + area.toFixed(2) + '平方米   ' + "\n" + " 周长:" + sum.toFixed(2) + '米';
                                if (showCeliang != null) {
                                    form.val("celianginfoform", {
                                        "desc": showCeliang
                                    });
                                }
                                //isRedo = true;
                                points = [];
                                eyepostionList = [];
                            }, datatype: "json"
                        });
                    }

                }, datatype: "json"
            });



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
    //+ "	 <div class=' class='layui-form-item layui-form-tex'>                                                      "
    //+ "	                                                                                       "
    //+ "	   <label class='layui-form-label'>测量方式</label>                                                       "
    //+ "	   <div class='layui-input-block' style='white-space':'pre'>                                                                                  "
    //+ "		<input name='celiangfangfa'  class='layui-input' readonly></input>   "
    //+ "	   </div>                                                                                                              "
    //+ "	                                                                                                                "
    //+ "	 </div>                                                                                                                "
    + "	</form>                                                                                                                 "
    //+ "<div class='layui-btn-container' style='margin-top:15px '>                          "
    //+ "  <button type='button' class='layui-btn layui-btn-primary layui-btn-sm' onclick='pointMeasure2()'>坐标</button>"
    //+ "  <button type='button' class='layui-btn layui-btn-primary layui-btn-sm' onclick='heightMeasure()'>距离</button>"
    //+ "  <button type='button' class='layui-btn layui-btn-primary layui-btn-sm' onclick='areaMeasure2()'>面积</button>"
    //+ "  <button type='button' class='layui-btn layui-btn-primary layui-btn-sm' onclick='pointMeasure2()'>体积</button>"
    //+ "</div>"
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
    //+ "  <button type='button' class='layui-btn layui-btn-primary layui-btn-sm' onclick='dispalyPosition()'>定位</button>"
    + "</div>"
    + "<div  style='text-align:center'>                          "
    + "  <button type='button' style='width:60%' class='layui-btn layui-btn-fluid layui-btn-danger' onclick='ClearCeliangTemp()'>清除</button>"

    + "</div>"
    + "			</div>						"
    + "		</div>							"
    + "	</div>								";
var celinghtml = "	<div class='layui-tab layui-tab-brief' lay-filter='celianglayer'>								"
    + "		<ul class='layui-tab-title'>							"
    + "			<li lay-id='111' class='layui-this' style='width:30%;padding-top: 10px;'>地形测量</li>						"
    + "			<li lay-id='222' style='width:30%;padding-top: 10px;'>模型测量</li>						"
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
            + "  <button type='button' class='layui-btn layui-btn-primary layui-btn-sm' onclick='dispalyPosition()'>定位</button>"
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
//定位
function dispalyPosition() {
    
    if (dingWeilayerindex!=null) {
        layer.msg('已打开定位窗口');
        return;
    }
    dingWeilayerindex = layer.open({
        type: 1
        , title: ['定位', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['300px', '300px']
        , shade: 0
        , offset: ['420px', '360px']
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

        }, cancel: function () {//取消按钮
            dingWeilayerindex = null;

        }
    });
    
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