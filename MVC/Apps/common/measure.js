






















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
        , title: ['测量工具', 'font-weight:bold;font-size:small;font-family:	Microsoft YaHei']
        , area: ['320px', '450px']
        , shade: 0
        , offset: ['85px', '1530px']
        , closeBtn: 1
        , moveOut: true
        , resize: false
        , content:'<div class="layui-tab layui-tab-brief" lay-filter="celianglayer">    <ul class="layui-tab-title">        <li lay-id="111" class="layui-this" style="width:40%;padding-top: 5px;line-height: normal;">地形测量</li>        <li lay-id="222" style="width:40%;padding-top: 5px;line-height:20px">模型测量</li>    </ul>    <div class="layui-tab-content">        <div class="layui-tab-item layui-show">        </div>        <div class="layui-tab-item">        </div>        <form class="layui-form" style="margin-top:5px;margin-left:5px;" lay-filter="celianginfoform">            <div class="layui-row">                <div class="layui-col-md3">                    <label class="layui-form-label" style="width:60px;">多次测量</label>                </div>                <div class="layui-col-md9">                    <div class="layui-input-block" style="margin-left:40px">                        <input type="checkbox" style="padding-left:0px;width:80%" name="close" lay-filter="lieFengswitch-type" lay-skin="switch" lay-text="是|否">                    </div>                </div>            </div>            <div class="layui-row">                 <div class="layui-input-block" style="margin-left:5px;width:80%;padding-right: 5px;padding-top: 5px;">                      <textarea name="desc" placeholder="请选择您的测量项" class="layui-textarea" style="height:180px;width: 118%;"></textarea>                 </div>            </div>        </form>        <div class="layui-btn-container" style="margin-top:15px;text-align:center ">            <button type="button" class="layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm" onclick="pointMeasure2()">坐标</button>            <button type="button" class="layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm" onclick="heightMeasure()">距离</button>            <button type="button" class="layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm" onclick="areaMeasure2()">面积</button>            <button type="button" class="layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm" onclick="">方位角</button>        </div>        <div style="text-align:center;margin-top:10px;" >            <button type="button" style="width:80%" class="layui-btn layui-btn-radius layui-btn-fluid layui-btn-danger" onclick="ClearCeliangTemp()">清除</button>        </div>    </div></div>								'
        , zIndex: layer.zIndex
        , success: function (layero) {
            //地形测量把深度监测设置为TRUE
            viewer.scene.globe.depthTestAgainstTerrain = true;
            // 进来就是地形测量
            form.render();
            form.val("celianginfoform", {
                "desc": "",
            });
        }
        , end: function () {
            viewer.scene.globe.depthTestAgainstTerrain = false;
            projectlayerlistceliangindex = null;

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
            var hGaizhengshu = 31.80;
            if (viewer.scene.globe.depthTestAgainstTerrain) {//地形测量
                pickedOject = scene.pickPosition(leftclick.position);
            } else {
                pickedOject = scene.pick(leftclick.position);
                try {
                    if (modleInfo.gcgz == "1") {
                        hGaizhengshu = 0;
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

                    var xy = bl2xy(cartesian3.latitude * 180 / Math.PI, cartesian3.longitude * 180 / Math.PI, 6378137.0, 1 / 298.257223563, 3, 108, false);

                    if (height > 0) {
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
                                }
                            });
                            var pingju = Math.sqrt(Math.pow(sum, 2) - Math.pow(rblh.height - h, 2));
                            console.log(Math.acos(pingju / sum) * 180 / Math.PI);
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
    handler.setInputAction(function (rightclik) {

        if (points.length > 2) {
            if (viewer.entities.getById("line_temp9999") != null) {
                viewer.entities.removeById("line_temp9999");
            }
            if (viewer.entities.getById("line_temp9998") != null) {
                viewer.entities.removeById("line_temp9998");
            }
 
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
