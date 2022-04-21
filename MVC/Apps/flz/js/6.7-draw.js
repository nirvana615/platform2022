
var handler;
var scene = viewer.scene;
var canvas = scene.canvas;
var linepoints = [];
var linepointcount = 0;
var polylineId = 0;
var lineId = "0";
var areapoints = [];
var areapointcount = 0;
var polygonId = 0;
var areaId = "0";
var takeoffpoint = null;
var landingpoint = null;
var waypoints = [];
var newwaypoints = [];
var projectinfos = [];
var curproject = "";
var curpointclound = "";
var tileset = null;
var isModelLine = true;                        //是否贴模型
var sideLength = 5;//初始化的5
var trem = [];//装测区
var time = new Date();
var y = time.getFullYear();
var mouth = time.getMonth() + 1;
var d = time.getDate();
var collector = null;//采集人
var isClose = true;//采集人
var eyespoints = [];
var jielitext = null;//节理弹出框
var cequList = [];
var drwjieliUpdInfox = null;//节理弹出框修改
var drwjieGouUpdInfox = null;//结构修改
//清除
function Clear() {
    ClearAction();
    ClearTemp();
}

//清除动作
function ClearAction() {
    if (handler != undefined) {
        handler.destroy();
    }
}

//清除临时图形
function ClearTemp() {
    var count = 0;
    console.log(viewer.entities);
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
    //直接请求图层出来了
    setTimeout(() => {
        modeljiazaiFlag = true; //跳转地址图层列表
    }, 2000);

    points = [];
    eyespoints = [];
}
//生成随机数
function NewGuid() {
    return ((((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1));
}



/*
测窗大小由自己确定
（1）获取空间直角坐标XYZ
（2）转换为大地坐标BLH
（3）转换为平面直角坐标xy
（4）计算面积
*/
function windowInfoZiDingYi() {
    //本面积计算方法为：将所有点转换为大地坐标BLH，然后将H赋值为最大H，再转换为空间直角坐标XYZ，取XY计算面积
    ClearTemp();
    if (currentprojectid == null) {
        layer.msg('请先选择项目');
        return;
    }
    if (modleInfoList.length == 0) {
        layer.msg('请先选择模型');
        return;
    }
    isPoint = false;
    isLength = false;
    isHeight = false;
    isAraa = false;
    isAzimuth = false;
    isRedo = false;
    isPointLabel = false;
    isPolylineLabel = false;
    isPolygonLabel = false;
    isOccurrence = false;
    isWindowZiDingyi = true;

    if (isWindowZiDingyi) {
        if (handler != undefined) {
            handler.destroy();
        }

        handler = new Cesium.ScreenSpaceEventHandler(canvas);
        viewer._container.style.cursor = "crosshair";//修改鼠标样式
        //左击
        handler.setInputAction(function (leftclik) {
            if (isRedo) {
                ClearTemp();
                isRedo = false;
                linepoints = [];
                points = [];
                eyespoints = [];
            }

            var pickedOject = scene.pick(leftclik.position);
            
            //这个屏幕坐标反算
            if (pickedOject != undefined) {
                var position = scene.pickPosition(leftclik.position);
                if (position != undefined) {
                    // 模型点
                    linepoints.push(position);
                    // 眼睛点
                    eyespoints.push(new Cesium.Cartesian3(viewer.camera.position.x, viewer.camera.position.y, viewer.camera.position.z));
                    console.log(eyespoints);
                    points.push(position);//三维坐标，反算屏幕坐标

                    



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
                    }
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        //移动
        handler.setInputAction(function (move) {
            if (points.length > 0) {
                //清除多边形临时边线

                var pick = viewer.scene.pick(move.endPosition);
                console.log(pick); 
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
        if (isMobile.any()) {
            //双指
            handler.setInputAction(function (pinch) {
                if (points.length > 2) {

                   // DrowHuaHua("zidingyi", linepoints, points);


                }

            }, Cesium.ScreenSpaceEventType.PINCH_START);
        }
        else {
            //右击
            handler.setInputAction(function (rightclik) {

                //newwindow
                if (points.length > 2) {
                  
                    viewer.entities.add({
                        name: "plMeasue" + NewGuid(),
                        polyline: {
                            positions: [points[points.length - 1], points[0]],
                            width: 2,
                            arcType: Cesium.ArcType.RHUMB,
                            material: Cesium.Color.RED,
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.RED,
                            }),
                        }
                    });
                    if (viewer.entities.getById("line_temp9999") != null) {
                        viewer.entities.removeById("line_temp9999");
                    }
                    if (viewer.entities.getById("line_temp9998") != null) {
                        viewer.entities.removeById("line_temp9998");
                    }
                    if (handler != undefined) {
                        handler.destroy();
                    }
                    viewer._container.style.cursor = "default";//还原鼠标样式
                    DrowHuaHua("newwindow", points, eyespoints);


                }
                //  加载  
               
                //整理数据

            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }
    }
};
//添加侧窗
function addAreaLabel() {
    if (currentprojectid == null) {
        layer.msg('请先选择项目');
        return;
    }
    if (modleInfoList.length == 0) {
        layer.msg('请先选择模型');
        return;
    }
    ClearTemp();
    isPoint = false;
    isLength = false;
    isHeight = false;
    isAraa = false;
    isAzimuth = false;
    isPointLabel = false;
    isPolylineLabel = false;
    isPolygonLabel = true;

    areapoints = [];
    areapointcount = 0;
    linepoints = [];
    points = [];
    eyespoints = [];
    if (isPolygonLabel) {
        if (handler != undefined) {
            handler.destroy();
        }
        var sideLength = 1.8;
        //var sideLength = document.getElementById("side_length").value;
        //console.log(sideLength.length == 0);
        //if (sideLength.length == 0 || sideLength > 15 || sideLength < 5) {
        //    layer.msg('请输入正确的边长 5-15');
        //    return;
        //}

        handler = new Cesium.ScreenSpaceEventHandler(canvas);

        //左击
        handler.setInputAction(function (leftclik) {

            var pickedOject = scene.pick(leftclik.position);
            if (pickedOject != undefined) {
                var position = scene.pickPosition(leftclik.position);
                if (position != undefined) {


                    var tempx = new Cesium.Cartesian2(leftclik.position.x + 1, leftclik.position.y)
                    var tempy = new Cesium.Cartesian2(leftclik.position.x, leftclik.position.y)
                    var bilici = Cesium.Cartesian3.distance(scene.pickPosition(tempy), scene.pickPosition(tempx));

                    var canshu = sideLength / bilici;

                    var tempb = new Cesium.Cartesian2(leftclik.position.x + canshu, leftclik.position.y);//b点，加了5.
                    var tempc = new Cesium.Cartesian2(leftclik.position.x + canshu, leftclik.position.y + canshu);//c点两边都
                    var tempd = new Cesium.Cartesian2(leftclik.position.x, leftclik.position.y + canshu);//屏幕参数

                    trem = [];
                    trem.push(scene.pickPosition(tempy));
                    trem.push(scene.pickPosition(tempb));
                    trem.push(scene.pickPosition(tempc));
                    trem.push(scene.pickPosition(tempd));
                    var cartesian3a = new Cesium.Cartesian3(trem[0].x, trem[0].y, trem[0].z);
                    var cartesian3b = new Cesium.Cartesian3(trem[3].x, trem[3].y, trem[3].z);
                    var eyepostion = new Cesium.Cartesian3(viewer.camera.position.x, viewer.camera.position.y, viewer.camera.position.z);

                    var tremlist = [];
                    tremlist.push(eyepostion);
                    tremlist.push(eyepostion);
                    tremlist.push(eyepostion);
                    tremlist.push(eyepostion);
                    //视野点四下
                
                    linepoints = trem;
                    // 眼睛点
                    eyespoints = tremlist;
                    points = trem;

                    var distancev = Cesium.Cartesian3.distance(cartesian3a, cartesian3b);
                    if (distancev > sideLength * 2) {
                        layer.msg('选择的点形成的测区超过了模型范围，请重新选择！');
                        return;
                    }
                    if (Cesium.defined(position)) {

                        DrowHuaHua('newwindow', points, 'guding');

                    }

                }

            }

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);


        //中键
        handler.setInputAction(function (middleclik) {
            if (handler != undefined) {
                handler.destroy();
            }

        }, Cesium.ScreenSpaceEventType.MIDDLE_CLICK);
    }
}

//画点弹出框
function DrowHuaHua(flag, cartesian3, position) {

    if (flag == "point") {
        if (drowinfoAddlayerindex == null) {
            //
            drowinfoAddlayerindex = layer.open({
                type: 1
                , title: ['确认新增', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                , area: ['300px', '300px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                //, content: '/Apps/flz/widget/addinfoPoint.html'
                , content: '<form class="layui-form" style="margin-top:5px;margin-right:25px;" lay-filter="addpointinfoform"><div class="layui-form-item" style="margin-top:15px;margin-right:5px;"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">点名称</label><div class="layui-input-block"><input type="text" name="name" lay-verify="required" autocomplete="off" placeholder="请输入" class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">描述</label><div class="layui-input-block"><input type="text" name="remarks" lay-verify="required" autocomplete="off" placeholder="请输入"  class="layui-input" style="width:160px;"  /></div></div></div></div></div><div class="layui-form-item" style="margin-top:15px"><div style="position:absolute;right:15px;"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="addpointinfosubmit" style="width:100px">提交</button></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);
                    form.render();

                    form.on('submit(addpointinfosubmit)', function (data) {
                        
                        data.field.cookie = document.cookie;
                        data.field.position = JSON.stringify(position);
                        data.field.projectId = currentprojectid;
                        data.field.type = "1";
                        var longitude = Cesium.Math.toDegrees(cartesian3.longitude);                         //经度
                        var latitude = Cesium.Math.toDegrees(cartesian3.latitude);                           //纬度
                        var height = cartesian3.height;
                        $.ajax({
                            url: servicesurl + "/api/FlzData/AddFlzPoint", type: "post", data: data.field,
                            success: function (result) {

                                //创建失败
                                if (isNaN(result)) {//true ,失败，成功返回id
                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                } else {
                                    //关闭
                                    layer.close(drowinfoAddlayerindex);
                                    //关闭
                                    layer.msg("保存成功", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    ClearTemp();
                                    var modleFlag = false;
                                    var xiabiao1 = 0;
                                    var xiabiao2 = 0;
                                    for (var m in layers) {
                                        if (layers[m].type == "MODELTAG") {
                                            modleFlag = true;
                                            xiabiao1 = m;
                                        }
                                    }
                                    if (modleFlag) {
                                        var areaFlag = false;
                                        for (var n in layers[xiabiao1].children) {
                                            if (layers[xiabiao1].children[n].type == "FLZPOINT") {//说明有标注的模型
                                                areaFlag = true;
                                                xiabiao2 = n;
                                            }
                                        }
                                        if (areaFlag) {
                                            var flzline = new Object;
                                            
                                            flzline.title = data.field.name; 
                                            flzline.id = "FLZPOINT_" + result;
                                            flzline.type = "FLZPOINT";
                                            flzline.remarks = data.field.remarks;
                                            flzline.datas = data.field;
                                            flzline.datas.postion = position;
                                            flzline.postion = position;
                                            flzline.checked = true;
                                            flzline.spread = true;
                                            flzline.showCheckbox = true;//显示复选框spread = true
                                            layers[xiabiao1].children[xiabiao2].children.push(flzline);
                                            layers[xiabiao1].children[xiabiao2].spread = true;
                                            layers[xiabiao1].spread = true;
                                        } else {
                                            var flznoodleslayer = new Object;
                                            flznoodleslayer.title = "点标注";
                                            flznoodleslayer.type = "FLZPOINT";
                                            flznoodleslayer.checked = true;
                                            flznoodleslayer.showCheckbox = true;//显示复选框
                                            var flznoodleslayerchild = [];
                                            var flzline = new Object;
                                            flzline.title = data.field.name;
                                            flzline.id = "FLZPOINT_" + result;
                                            flzline.type = "FLZPOINT";
                                            flzline.remarks = data.field.remarks;
                                            flzline.datas = data.field;
                                            flzline.datas.postion = position;
                                            flzline.postion = position;
                                            flzline.checked = true;
                                            flzline.spread = true;
                                            flzline.showCheckbox = true;//显示复选框spread = true
                                            flznoodleslayerchild.push(flzline);
                                            flznoodleslayer.children = flznoodleslayerchild;
                                            layers[xiabiao1].children.push(flznoodleslayer);
                                            layers[xiabiao1].spread = true;
                                        }
                                    } else {//没有，就是新增
                                        var flzDataLayer = new Object;
                                        flzDataLayer.title = "模型标注";
                                        flzDataLayer.type = "MODELTAG";
                                        var flzDataLayerchild = [];
                                        var noodlesList = positList;

                                        if (noodlesList != null && noodlesList.length > 0) {
                                            var flznoodleslayer = new Object;
                                            flznoodleslayer.title = "点标注";
                                            flznoodleslayer.type = "FLZPOINT";
                                            flznoodleslayer.checked = true;
                                            flznoodleslayer.showCheckbox = true;//显示复选框
                                            var flznoodleslayerchild = [];
                                            var flzline = new Object;
                                       
                                            flzline.title = data.field.name;
                                            flzline.id = "FLZPOINT_" + result;
                                            flzline.type = "FLZPOINT";
                                            flzline.remarks = data.field.remarks;
                                            flzline.datas = data.field;
                                            flzline.datas.postion = position;
                                            flzline.postion = position;
                                            flzline.checked = true;
                                            flzline.spread = true;
                                            flzline.showCheckbox = true;//显示复选框spread = true
                                            flznoodleslayerchild.push(flzline);
                                            flznoodleslayer.children = flznoodleslayerchild;
                                            flznoodleslayer.spread = true;
                                            flzDataLayerchild.push(flznoodleslayer);

                                        }

                                        flzDataLayer.children = flzDataLayerchild;
                                        flzDataLayer.spread = true;
                                        layers.push(flzDataLayer);

                                    }

                                    console.log(layers);
                                    modeljiazaiFlag = false;
                                    tree.reload('prjlayerlistid', { data: layers });
                                    ClearTemp();

                                }

                            }, datatype: "json"
                        });
                        return false;
                    });

                }
                , end: function () {
                    drowinfoAddlayerindex = null;
                }
            });
        }

    } else if (flag == "line") {
        
        var data = {};
        var positList = position;
        data.cookie = document.cookie;
        data.position = JSON.stringify(position);//直接存吧;
        data.projectId = currentprojectid;
        data.type = "2";//范围
        data.remarks = "线标注";//范围
        data.modleId = modleInfo.id.split("_")[1];//模型id
        var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
        $.ajax({
            url: servicesurl + "/api/FlzData/AddFlzPoint", type: "post", data: data,
            success: function (result) {
                layer.close(loadingminindex);

                if (isNaN(result)) {
                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                } else {
                    //关闭
                    layer.msg("保存成功", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    ClearTemp();
                    layer.close(drowinfoAddlayerindex);
                    data.name = result;
                    var modleFlag = false;
                    var xiabiao1 = 0;
                    var xiabiao2 = 0;
                    for (var m in layers) {
                        if (layers[m].type == "MODELTAG") {
                            modleFlag = true;
                            xiabiao1 = m;
                        }
                    }
                    if (modleFlag) {
                        var lineFlag = false;
                        for (var n in layers[xiabiao1].children) {
                            if (layers[xiabiao1].children[n].type == "FLZLINE") {//说明有标注的模型
                                lineFlag = true;
                                xiabiao2 = n;
                            }
                        }
                        if (lineFlag) {
                            var flzline = new Object;
                            var xSum = 0;//求一个平均点，用于定位
                            var ySum = 0;
                            var zSum = 0;
                            for (var m = 0; m < positList.length; m++) {
                                xSum = xSum + parseFloat(positList[m].x);
                                ySum = ySum + parseFloat(positList[m].y);
                                zSum = zSum + parseFloat(positList[m].z);
                            }
                            flzline.Centerx = xSum / positList.length;
                            flzline.Centery = ySum / positList.length;
                            flzline.Centerz = zSum / positList.length;
                            flzline.title = result;
                            flzline.id = "FLZLINE_" + result;
                            flzline.type = "FLZLINE";
                            flzline.remarks = data.remarks;
                            flzline.datas = data;
                            flzline.datas.pointList = positList;
                            flzline.pointList = positList;
                            flzline.checked = true;
                            flzline.spread = true;
                            flzline.showCheckbox = true;//显示复选框spread = true
                            layers[xiabiao1].children[xiabiao2].children.push(flzline);
                            layers[xiabiao1].children[xiabiao2].spread = true;
                            layers[xiabiao1].spread = true;
                        } else {
                            var flznoodleslayer = new Object;
                            flznoodleslayer.title = "长度标注";
                            flznoodleslayer.type = "FLZLINE";
                            flznoodleslayer.checked = true;
                            flznoodleslayer.showCheckbox = true;//显示复选框
                            var flznoodleslayerchild = [];


                            var flzline = new Object;
                            var xSum = 0;//求一个平均点，用于定位
                            var ySum = 0;
                            var zSum = 0;
                            for (var m = 0; m < positList.length; m++) {
                                xSum = xSum + parseFloat(positList[m].x);
                                ySum = ySum + parseFloat(positList[m].y);
                                zSum = zSum + parseFloat(positList[m].z);
                            }
                            flzline.Centerx = xSum / positList.length;
                            flzline.Centery = ySum / positList.length;
                            flzline.Centerz = zSum / positList.length;
                            flzline.title = data.name;
                            flzline.id = "FLZLINE_" + result;
                            flzline.type = "FLZLINE";
                            flzline.remarks = data.remarks;
                            flzline.datas = data;
                            flzline.datas.pointList = positList;
                            flzline.pointList = positList;
                            flzline.checked = true;
                            flzline.spread = true;
                            flzline.showCheckbox = true;//显示复选框spread = true
                            flznoodleslayerchild.push(flzline);
                            flznoodleslayer.children = flznoodleslayerchild;
                            layers[xiabiao1].children.push(flznoodleslayer);
                            layers[xiabiao1].spread = true;
                        }
                    } else {//没有，就是新增
                        var flzDataLayer = new Object;
                        flzDataLayer.title = "模型标注";
                        flzDataLayer.type = "MODELTAG";
                        var flzDataLayerchild = [];
                        var noodlesList = positList;

                        if (noodlesList != null && noodlesList.length > 0) {
                            var flznoodleslayer = new Object;
                            flznoodleslayer.title = "长度标注";
                            flznoodleslayer.type = "FLZLINE";
                            flznoodleslayer.checked = true;
                            flznoodleslayer.showCheckbox = true;//显示复选框
                            var flznoodleslayerchild = [];
                            var flzline = new Object;
                            var xSum = 0;//求一个平均点，用于定位
                            var ySum = 0;
                            var zSum = 0;
                            for (var m = 0; m < positList.length; m++) {
                                xSum = xSum + parseFloat(positList[m].x);
                                ySum = ySum + parseFloat(positList[m].y);
                                zSum = zSum + parseFloat(positList[m].z);
                            }
                            flzline.Centerx = xSum / positList.length;
                            flzline.Centery = ySum / positList.length;
                            flzline.Centerz = zSum / positList.length;
                            flzline.title = data.name;
                            flzline.id = "FLZLINE_" + result;
                            flzline.type = "FLZLINE";
                            flzline.remarks = data.remarks;
                            flzline.datas = data;
                            flzline.datas.pointList = positList;
                            flzline.pointList = positList;
                            flzline.checked = true;
                            flzline.spread = true;
                            flzline.showCheckbox = true;//显示复选框spread = true
                            flznoodleslayerchild.push(flzline);
                            flznoodleslayer.children = flznoodleslayerchild;
                            flznoodleslayer.spread = true;
                            flzDataLayerchild.push(flznoodleslayer);

                        }

                        flzDataLayer.children = flzDataLayerchild;
                        flzDataLayer.spread = true;
                        layers.push(flzDataLayer);

                    }

                    console.log(layers);
                    modeljiazaiFlag = false;
                    tree.reload('prjlayerlistid', { data: layers });
                    ClearTemp();
                    //if (handler != undefined) {
                    //    handler.destroy();
                    // }

                    isRedo = true;
                    points = [];
                    linepoints = [];

                }


            }, datatype: "json"
        });
        //return false;
    } else if (flag == "window") {//测区.老测区
        if (drowinfoAddlayerindex == null) {
            //
            drowinfoAddlayerindex = layer.open({
                type: 1
                , title: ['测区新增', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                , area: ['300px', '300px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<form class="layui-form" style="margin-top:5px;margin-right:25px;" lay-filter="addpointinfoform"><div class="layui-form-item" style="margin-top:15px;margin-right:5px;"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">测区名称</label><div class="layui-input-block"><input type="text" name="name" lay-verify="required" autocomplete="off" placeholder="请输入" class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">描述</label><div class="layui-input-block"><input type="text" name="remarks" lay-verify="required" autocomplete="off" placeholder="请输入"  class="layui-input" style="width:160px;"  /></div></div></div></div></div><div class="layui-form-item" style="margin-top:15px"><div style="position:absolute;right:15px;"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="addpointinfosubmit" style="width:100px">提交</button></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);
                    form.render();

                    form.on('submit(addpointinfosubmit)', function (data) {
                        var positList = position;
                       
                        data.field.cookie = document.cookie;
                        data.field.points = JSON.stringify(positList);//直接存吧
                        data.field.projectId = currentprojectid;
                        data.field.creatTime = y + '-' + (mouth < 10 ? '0' + mouth : mouth) + '-' + (d < 10 ? '0' + d : d);
                        data.field.sideLength = cartesian3;//边长

                        $.ajax({
                            url: servicesurl + "/api/FlzWindowInfo/AddFlzWindow", type: "post", data: data.field,
                            success: function (result) {


                                if (isNaN(result)) {
                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                } else {
                                    //关闭
                                    layer.close(drowinfoAddlayerindex);
                                    //更改layer
                                    var flzWindowLayer = new Object;

                                    var xSum = 0;//求一个平均点，用于定位
                                    var ySum = 0;
                                    var zSum = 0;
                                    for (var m = 0; m < positList.length; m++) {
                                        xSum = xSum + parseFloat(positList[m].x);
                                        ySum = ySum + parseFloat(positList[m].y);
                                        zSum = zSum + parseFloat(positList[m].z);
                                    }
                                    flzWindowLayer.Centerx = xSum / positList.length;
                                    flzWindowLayer.Centery = ySum / positList.length;
                                    flzWindowLayer.Centerz = zSum / positList.length;

                                    flzWindowLayer.title = data.field.name;
                                    flzWindowLayer.type = "FLZWINDOW";
                                    flzWindowLayer.id = "FLZWINDOW_" + result;
                                    flzWindowLayer.datas = data.field;
                                    flzWindowLayer.pointList = positList;
                                    flzWindowLayer.checked = true;
                                    flzWindowLayer.showCheckbox = true;//显示复选框
                                    flzWindowLayer.children = [];
                                    layers[0].children.push(flzWindowLayer);
                                    layers[0].spread = true;
                                    console.log(layers);

                                    data.field.id = result;
                                    windowInfoList.push(data.field);
                                    console.log(windowInfoList);
                                    modeljiazaiFlag = false;
                                    tree.reload('prjlayerlistid', { data: layers });
                                    ClearTemp();

                                    if (handler != undefined) {
                                        handler.destroy();
                                    }

                                    isRedo = true;
                                    points = [];
                                    linepoints = [];
                                }

                            }, datatype: "json"
                        });
                        return false;
                    });

                }
                , end: function () {
                    drowinfoAddlayerindex = null;
                }, cancel: function () {//取消按钮

                    //取消画的图和点
                    if (handler != undefined) {
                        handler.destroy();
                    }
                    isRedo = true;
                    points = [];
                    linepoints = [];
                }
            });
        }

    } else if (flag == "newwindow") {//新测区
        if (drowinfoAddlayerindex == null) {
            //
            drowinfoAddlayerindex = layer.open({
                type: 1
                , title: ['测区新增', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                , area: ['300px', '300px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<form class="layui-form" style="margin-top:5px;margin-right:25px;" lay-filter="addpointinfoform"><div class="layui-form-item" style="margin-top:15px;margin-right:5px;"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">测区名称</label><div class="layui-input-block"><input type="text" name="name" lay-verify="required" autocomplete="off" placeholder="请输入" class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">描述</label><div class="layui-input-block"><input type="text" name="remarks" lay-verify="required" autocomplete="off" placeholder="请输入"  class="layui-input" style="width:160px;"  /></div></div></div></div></div><div class="layui-form-item" style="margin-top:15px"><div style="position:absolute;right:15px;"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="addpointinfosubmit" style="width:100px">提交</button></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);
                    form.render();

                    form.on('submit(addpointinfosubmit)', function (data) {
                        //先调用方法计算
                      
                        var maxX = viewer.scene.cartesianToCanvasCoordinates(points[0]).x;
                        var minX = viewer.scene.cartesianToCanvasCoordinates(points[0]).x;
                        var maxY = viewer.scene.cartesianToCanvasCoordinates(points[0]).y;
                        var minY = viewer.scene.cartesianToCanvasCoordinates(points[0]).y;
                        for (var i in points) {
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
                        // 最大100个点
                        var xxishu = (maxX - minX) / 10;
                        var yxishu = (maxY - minY) / 10;
                        var jimiList = [];
                        for (var x = 0; x < 11; x++) {
                            for (var m = 0; m < 11; m++) {

                                var temp = new Cesium.Cartesian2(minX + xxishu * x, minY + yxishu * m);//b点，加了5.

                                jimiList.push(scene.pickPosition(temp));
                            }
                        }
                        console.log(jimiList);
                        var sendDate = {};


                        sendDate.bpsList = JSON.stringify(linepoints);
                        sendDate.eyesList = JSON.stringify(eyespoints);
                        sendDate.spsList = JSON.stringify(jimiList);
                        sendDate.cookie = document.cookie;
                        console.log(sendDate);
                        var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                        $.ajax({
                            url: servicesurl + "/api/FlzWindowInfo/getWindowInfo", type: "post", data: sendDate,//后台发送请求
                            success: function (result) {


                                layer.close(loadingceindex);
                                //关闭
                                var windowInfos = JSON.parse(result);
                                console.log(windowInfos);
                                if (windowInfos == null) {
                                    layer.close(drowinfoAddlayerindex);
                                    layer.msg("调用接口计算失败，请重新选择位置，所选的点不能形成平面", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                   
                                    modeljiazaiFlag = false;
                                    tree.reload('prjlayerlistid', { data: layers });
                                    ClearTemp();

                                    if (handler != undefined) {
                                        handler.destroy();
                                    }

                                    isRedo = true;
                                    points = [];
                                    linepoints = [];
                                    return false;
                                }
                                if (windowInfos=="") {
                                    layer.msg("调用接口结算失败，请稍后再试", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    //出来画图，显示测春哥
                                    

                                    var flzWindowLayer = new Object;

                                    var xSum = 0;//求一个平均点，用于定位
                                    var ySum = 0;
                                    var zSum = 0;
                                    for (var m = 0; m < positList.length; m++) {
                                        xSum = xSum + parseFloat(positList[m].x);
                                        ySum = ySum + parseFloat(positList[m].y);
                                        zSum = zSum + parseFloat(positList[m].z);
                                    }
                                    flzWindowLayer.Centerx = xSum / positList.length;
                                    flzWindowLayer.Centery = ySum / positList.length;
                                    flzWindowLayer.Centerz = zSum / positList.length;

                                    flzWindowLayer.title = "测窗";
                                    flzWindowLayer.type = "FLZWINDOW";
                                    flzWindowLayer.id = "FLZWINDOW_" + "1";
                                    // flzWindowLayer.datas = data.field;
                                    flzWindowLayer.pointList = positList;
                                    flzWindowLayer.checked = true;
                                    flzWindowLayer.showCheckbox = true;//显示复选框
                                    flzWindowLayer.children = [];
                                    layers[0].children.push(flzWindowLayer);
                                    layers[0].spread = true;
                                    modeljiazaiFlag = false;
                                    tree.reload('prjlayerlistid', { data: layers });
                                    ClearTemp();

                                    if (handler != undefined) {
                                        handler.destroy();
                                    }

                                    isRedo = true;
                                    points = [];
                                    linepoints = [];


                                    // viewer.Scene.sampleHeight();

                                } else {
                                    if (position == 'guding') {
                                        if (windowInfos.L1-2 > 0.1 || windowInfos.L2-2 > 0.1) {
                                            layer.msg("请旋转模型到最佳位置", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                            return false;
                                        } else {
                                            data.field.sideLength = 2;//边长1
                                            data.field.sidebLength = 2;//边长2  AxisX
                                        }
                                    } else {
                                        data.field.sideLength = parseInt(windowInfos.L1);//边长1
                                        data.field.sidebLength = parseInt(windowInfos.L2);//边长2  AxisX
                                    }
                                    var BLHList = windowInfos.Vertices3D1;
                                    var positList = [];
                                    var maxHeihts = 0;
                                    for (var i in BLHList) {
                                        if (BLHList[i].L=="NaN") {
                                            layer.msg("请旋转模型到合适位置", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                            return false;
                                        }
                                        var postions = new Cesium.Cartographic(Math.PI / 180 * BLHList[i].L, Math.PI / 180 * BLHList[i].B);
                                        var Heights = viewer.scene.sampleHeight(postions);
                                        if (Heights > maxHeihts) {
                                            maxHeihts = Heights;
                                        }
                                        //经纬度，现在的坐标，转换三维。
                                        positList.push(new Cesium.Cartesian3.fromDegrees(BLHList[i].L, BLHList[i].B, Heights));
                                    }
                                    data.field.cookie = document.cookie;
                                    data.field.points = JSON.stringify(positList);//直接存吧
                                    data.field.projectId = currentprojectid;
                                    data.field.creatTime = y + '-' + (mouth < 10 ? '0' + mouth : mouth) + '-' + (d < 10 ? '0' + d : d);
                                    
                                    data.field.axisx = JSON.stringify(windowInfos.AxisX);//x轴
                                    data.field.axisy = JSON.stringify(windowInfos.AxisY);//y轴   Normal Origin Vertices2D Vertices3D Vertices3D1
                                   // data.field.normal = JSON.stringify(windowInfos.Normal);//法向量
                                    data.field.normal = JSON.stringify(windowInfos);//法向量
                                    data.field.origin = JSON.stringify(windowInfos.Origin);//原点
                                    data.field.vertices2d = JSON.stringify(windowInfos.Vertices2D);//平，面
                                    data.field.vertices3d = JSON.stringify(windowInfos.Vertices3D);//空间执教
                                    data.field.vertices3dlbh = JSON.stringify(windowInfos.Vertices3D1);//大地坐标
                                    //我算一个倾角不，倾角算出来，倾向，倾角。
                                    var tempList = [];
                                    tempList.push(positList[0]);
                                    tempList.push(positList[1]);
                                    tempList.push(positList[2]);
                                    var chanzhuang = getChanzhuang(positList);
                                    var qingXiang = parseFloat(chanzhuang.qingXiang)-180;
                                    var qingJiao = parseFloat(chanzhuang.qingJiao) - 90;
                                    data.field.level = qingXiang.toFixed(2);
                                    data.field.vertical = qingJiao.toFixed(2);
                                    data.field.height = maxHeihts.toFixed(2);
                                    
                                    
                                    
                                    $.ajax({
                                        url: servicesurl + "/api/FlzWindowInfo/AddFlzWindow", type: "post", data: data.field,
                                        success: function (result) {
                                            if (isNaN(result)) {
                                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                            } else {
                                                //关闭
                                                layer.close(drowinfoAddlayerindex);
                                                //更改layer
                                                var flzWindowLayer = new Object;

                                                var xSum = 0;//求一个平均点，用于定位
                                                var ySum = 0;
                                                var zSum = 0;
                                                for (var m = 0; m < positList.length; m++) {
                                                    xSum = xSum + parseFloat(positList[m].x);
                                                    ySum = ySum + parseFloat(positList[m].y);
                                                    zSum = zSum + parseFloat(positList[m].z);
                                                }
                                                flzWindowLayer.Centerx = xSum / positList.length;
                                                flzWindowLayer.Centery = ySum / positList.length;
                                                flzWindowLayer.Centerz = zSum / positList.length;

                                                flzWindowLayer.title = data.field.name;
                                                flzWindowLayer.type = "FLZWINDOW";
                                                flzWindowLayer.id = "FLZWINDOW_" + result;
                                                flzWindowLayer.datas = data.field;
                                                flzWindowLayer.pointList = positList;
                                                flzWindowLayer.checked = true;
                                                flzWindowLayer.showCheckbox = true;//显示复选框
                                                flzWindowLayer.children = [];
                                                layers[0].children.push(flzWindowLayer);
                                                layers[0].spread = true;
                                                console.log(layers);

                                                data.field.id = result;
                                                windowInfoList.push(data.field);
                                                modeljiazaiFlag = false;
                                                tree.reload('prjlayerlistid', { data: layers });
                                                ClearTemp();
                                                
                                                if (handler != undefined) {
                                                    handler.destroy();
                                                }

                                                isRedo = true;
                                                points = [];
                                                linepoints = [];
                                            }

                                        }, datatype: "json"
                                    });
                                    return false;
                                }

                            }, datatype: "json"
                        });
                        return false;
                        //然后再存
                        
                    });

                }
                , end: function () {
                    drowinfoAddlayerindex = null;
                    ClearTemp();
                }, cancel: function () {//取消按钮

                    //取消画的图和点
                    if (handler != undefined) {
                        handler.destroy();
                    }
                    isRedo = true;
                    points = [];
                    linepoints = [];
                    ClearTemp();
                }
            });
        }

    } else if (flag == "area") {
        if (drowinfoAddlayerindex == null) {
            //
            drowinfoAddlayerindex = layer.open({
                type: 1
                , title: ['范围新增', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                , area: ['300px', '300px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                //, content: '/Apps/flz/widget/addinfoPoint.html'
                , content: '<form class="layui-form" style="margin-top:5px;margin-right:25px;" lay-filter="addpointinfoform"><div class="layui-form-item" style="margin-top:15px;margin-right:5px;"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">范围名称</label><div class="layui-input-block"><input type="text" name="name" lay-verify="required" autocomplete="off" placeholder="请输入" class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">描述</label><div class="layui-input-block"><input type="text" name="remarks" lay-verify="required" autocomplete="off" placeholder="请输入"  class="layui-input" style="width:160px;"  /></div></div></div></div></div><div class="layui-form-item" style="margin-top:15px"><div style="position:absolute;right:15px;"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="addpointinfosubmit" style="width:100px">提交</button></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);
                    form.render();

                    form.on('submit(addpointinfosubmit)', function (data) {
                        var positList = position;
                        data.field.cookie = document.cookie;
                        data.field.position = JSON.stringify(position);//直接存吧;
                        data.field.projectId = currentprojectid;
                        data.field.type = "5";//范围
                        data.field.modleId = modleInfo.id.split("_")[1];//模型id
                        var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                        $.ajax({
                            url: servicesurl + "/api/FlzData/AddFlzPoint", type: "post", data: data.field,
                            success: function (result) {
                                layer.close(loadingminindex);
                                
                                if (isNaN(result)) {
                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                } else {
                                    //关闭
                                    layer.msg("保存成功", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    ClearTemp();
                                    layer.close(drowinfoAddlayerindex);
                                    var modleFlag = false;
                                    var xiabiao1 = 0;
                                    var xiabiao2 = 0;
                                    for (var m in layers) {
                                        if (layers[m].type=="MODELTAG") {
                                            modleFlag = true;
                                            xiabiao1 = m;
                                        }
                                    }
                                    if (modleFlag) {
                                        var areaFlag = false;
                                        for (var n in layers[xiabiao1].children) {
                                            if (layers[xiabiao1].children[n].type == "FLZAREA") {//说明有标注的模型
                                                areaFlag = true;
                                                xiabiao2 = n;
                                            }
                                        }
                                        if (areaFlag) {
                                            var flzline = new Object;
                                            var xSum = 0;//求一个平均点，用于定位
                                            var ySum = 0;
                                            var zSum = 0;
                                            for (var m = 0; m < positList.length; m++) {
                                                xSum = xSum + parseFloat(positList[m].x);
                                                ySum = ySum + parseFloat(positList[m].y);
                                                zSum = zSum + parseFloat(positList[m].z);
                                            }
                                            flzline.Centerx = xSum / positList.length;
                                            flzline.Centery = ySum / positList.length;
                                            flzline.Centerz = zSum / positList.length;
                                            flzline.title = data.field.name;
                                            flzline.id = "FLZAREA_" + result;
                                            flzline.type = "FLZAREA";
                                            flzline.remarks = data.field.remarks;
                                            flzline.datas = data.field;
                                            flzline.datas.pointList = positList;
                                            flzline.pointList = positList;
                                            flzline.checked = true;
                                            flzline.spread = true;
                                            flzline.showCheckbox = true;//显示复选框spread = true
                                            layers[xiabiao1].children[xiabiao2].children.push(flzline);
                                            layers[xiabiao1].children[xiabiao2].spread = true;
                                            layers[xiabiao1].spread = true;
                                        } else {
                                            var flznoodleslayer = new Object;
                                            flznoodleslayer.title = "范围标注";
                                            flznoodleslayer.type = "FLZAREA";
                                            flznoodleslayer.checked = true;
                                            flznoodleslayer.showCheckbox = true;//显示复选框
                                            var flznoodleslayerchild = [];


                                            var flzline = new Object;
                                            var xSum = 0;//求一个平均点，用于定位
                                            var ySum = 0;
                                            var zSum = 0;
                                            for (var m = 0; m < positList.length; m++) {
                                                xSum = xSum + parseFloat(positList[m].x);
                                                ySum = ySum + parseFloat(positList[m].y);
                                                zSum = zSum + parseFloat(positList[m].z);
                                            }
                                            flzline.Centerx = xSum / positList.length;
                                            flzline.Centery = ySum / positList.length;
                                            flzline.Centerz = zSum / positList.length;
                                            flzline.title = data.field.name;
                                            flzline.id = "FLZAREA_" + result;
                                            flzline.type = "FLZAREA";
                                            flzline.remarks = data.field.remarks;
                                            flzline.datas = data.field;
                                            flzline.datas.pointList = positList;
                                            flzline.pointList = positList;
                                            flzline.checked = true;
                                            flzline.spread = true;
                                            flzline.showCheckbox = true;//显示复选框spread = true
                                            flznoodleslayerchild.push(flzline);
                                            flznoodleslayer.children = flznoodleslayerchild;
                                            layers[xiabiao1].children.push(flznoodleslayer);
                                            layers[xiabiao1].spread = true;
                                        }
                                    } else {//没有，就是新增
                                        var flzDataLayer = new Object;
                                        flzDataLayer.title = "模型标注";
                                        flzDataLayer.type = "MODELTAG";
                                        var flzDataLayerchild = [];
                                        var noodlesList = positList;
                                        
                                        if (noodlesList != null && noodlesList.length > 0) {
                                            var flznoodleslayer = new Object;
                                            flznoodleslayer.title = "范围标注";
                                            flznoodleslayer.type = "FLZAREA";
                                            flznoodleslayer.checked = true;
                                            flznoodleslayer.showCheckbox = true;//显示复选框
                                            var flznoodleslayerchild = [];
                                            var flzline = new Object;
                                            var xSum = 0;//求一个平均点，用于定位
                                            var ySum = 0;
                                            var zSum = 0;
                                            for (var m = 0; m < positList.length; m++) {
                                                xSum = xSum + parseFloat(positList[m].x);
                                                ySum = ySum + parseFloat(positList[m].y);
                                                zSum = zSum + parseFloat(positList[m].z);
                                            }
                                            flzline.Centerx = xSum / positList.length;
                                            flzline.Centery = ySum / positList.length;
                                            flzline.Centerz = zSum / positList.length;
                                            flzline.title = data.field.name;
                                            flzline.id = "FLZAREA_" + result;
                                            flzline.type = "FLZAREA";
                                            flzline.remarks = data.field.remarks;
                                            flzline.datas = data.field;
                                            flzline.datas.pointList = positList;
                                            flzline.pointList = positList;
                                            flzline.checked = true;
                                            flzline.spread = true;
                                            flzline.showCheckbox = true;//显示复选框spread = true
                                            flznoodleslayerchild.push(flzline);
                                            flznoodleslayer.children = flznoodleslayerchild;
                                            flznoodleslayer.spread = true;
                                            flzDataLayerchild.push(flznoodleslayer);

                                        }

                                        flzDataLayer.children = flzDataLayerchild;
                                        flzDataLayer.spread = true;
                                        layers.push(flzDataLayer);

                                    }
                                   
                                    modeljiazaiFlag = false;
                                    tree.reload('prjlayerlistid', { data: layers });
                                    ClearTemp();
                                    isRedo = true;
                                    points = [];
                                    linepoints = [];
                                }


                            }, datatype: "json"
                        });
                        return false;
                    });

                }
                , end: function () {
                    drowinfoAddlayerindex = null;
                    areaMeasure();
                }, cancel: function () {//取消按钮

                    //取消画的图和点
                    if (handler != undefined) {
                        handler.destroy();
                    }
                    isRedo = true;
                    points = [];
                    linepoints = [];
                }
            });
        }

    } else if (flag == "zidingyi") {
        if (drowinfoAddlayerindex == null) {
            //
            drowinfoAddlayerindex = layer.open({
                type: 1
                , title: ['面元素新增', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                , area: ['300px', '300px']
                , shade: 0.3
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                //, content: '/Apps/flz/widget/addinfoPoint.html'
                , content: '<form class="layui-form" style="margin-top:5px;margin-right:25px;" lay-filter="addpointinfoform"><div class="layui-form-item" style="margin-top:15px;margin-right:5px;"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">面名称</label><div class="layui-input-block"><input type="text" name="name" lay-verify="required" autocomplete="off" placeholder="请输入" class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">描述</label><div class="layui-input-block"><input type="text" name="remarks" lay-verify="required" autocomplete="off" placeholder="请输入"  class="layui-input" style="width:160px;"  /></div></div></div></div></div><div class="layui-form-item" style="margin-top:15px"><div style="position:absolute;right:15px;"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="addpointinfosubmit" style="width:100px">提交</button></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);
                    form.render();

                    form.on('submit(addpointinfosubmit)', function (data) {
                        var positList = position;
                        var linepointList = cartesian3;
                        var temp = ""
                        for (var i = 0; i < linepointList.length; i++) {
                            var longitude = Cesium.Math.toDegrees(linepointList[i].longitude);                         //经度
                            var latitude = Cesium.Math.toDegrees(linepointList[i].latitude);                           //纬度
                            var height = linepointList[i].height;
                            //高度
                            if (i == linepointList.length - 1) {
                                temp = temp + longitude + "@" + latitude + "@" + height;
                            } else {
                                temp = temp + longitude + "@" + latitude + "@" + height + "&";//点与点用&隔开，经纬度用@分割
                            }
                        }
                        data.field.cookie = document.cookie;
                        data.field.position = temp;
                        data.field.projectId = currentprojectid;
                        data.field.type = "3";//线
                        $.ajax({
                            url: servicesurl + "/api/FlzData/AddFlzPoint", type: "post", data: data.field,
                            success: function (result) {

                                //创建失败
                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                if (true) {


                                    //关闭
                                    layer.close(drowinfoAddlayerindex);

                                    //

                                    var cartesian3s = [];
                                    var newcartesian3s = [];
                                    var maxHeight = linepointList[0].height;
                                    var minHeight = linepointList[0].height;
                                    var bSum = 0;
                                    var lSum = 0;
                                    for (var i = 0; i < points.length; i++) {
                                        var cartesian3 = points[i];
                                        cartesian3s.push(cartesian3);
                                        var rblh = Cesium.Cartographic.fromCartesian(points[i]);
                                        var blh = new Cesium.Cartesian3(rblh.latitude * 180 / Math.PI, rblh.longitude * 180 / Math.PI, rblh.height);
                                        newcartesian3s.push(blh);
                                        bSum += rblh.latitude * 180 / Math.PI;
                                        lSum += rblh.longitude * 180 / Math.PI;
                                        if (rblh.height < minHeight) {
                                            minHeight = rblh.height;
                                        }
                                        if (rblh.height > maxHeight) {
                                            maxHeight = rblh.height;
                                        }
                                    }

                                    viewer.entities.add({
                                        name: "pyMeasue" + NewGuid(),
                                        polygon: {
                                            hierarchy: {
                                                positions: points
                                            },
                                            material: Cesium.Color.YELLOW.withAlpha(0.5),
                                            classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                                        }
                                    });

                                    //计算面积
                                    var cartesian2s = [];
                                    for (var i = 0; i < newcartesian3s.length; i++) {
                                        var cartesian3 = Cesium.Cartesian3.fromDegrees(newcartesian3s[i].y, newcartesian3s[i].x, maxHeight);
                                        var cartesian2 = new Cesium.Cartesian2(cartesian3.x, cartesian3.y);
                                        cartesian2s.push(cartesian2);
                                    }
                                    console.log(cartesian3);
                                    console.log(cartesian2);
                                    cartesian2s.push(cartesian2s[0]);
                                    var area = 0;
                                    for (var i = 0; i < cartesian2s.length - 1; i++) {
                                        area += (cartesian2s[i].x - cartesian2s[0].x) * (cartesian2s[i + 1].y - cartesian2s[0].y) - (cartesian2s[i].y - cartesian2s[0].y) * (cartesian2s[i + 1].x - cartesian2s[0].x);
                                    }
                                    area = Math.abs(area);

                                    //计算重心
                                    viewer.entities.add({
                                        name: "pylMeasue" + NewGuid(),
                                        position: Cesium.Cartesian3.fromDegrees(lSum / points.length, bSum / points.length, maxHeight + 1),
                                        label: {
                                            text: data.field.name + '面积：' + area.toFixed(2) + '平方米',
                                            showBackground: true,
                                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                            font: '24px Times New Roman',
                                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                            pixelOffset: new Cesium.Cartesian2(0.0, -10),
                                        }
                                    });

                                    if (handler != undefined) {
                                        handler.destroy();
                                    }

                                    isRedo = true;
                                    points = [];
                                    linepoints = [];
                                }

                            }, datatype: "json"
                        });
                        return false;
                    });

                }
                , end: function () {
                    drowinfoAddlayerindex = null;
                    console.log(1111);
                }, cancel: function () {//取消按钮

                    //取消画的图和点
                    if (handler != undefined) {
                        handler.destroy();
                    }
                    isRedo = true;
                    points = [];
                    linepoints = [];
                }
            });
        }

    } else if (flag == "jieli") {//节理
        
        var data = {};
        var positList = position;
        //
        data.cookie = document.cookie;
     // data.position = positList;//直接存吧;
        data.projectId = currentprojectid;
        data.type = "3";//面
        var tempLista = {};
        tempLista.xyzs = JSON.stringify(position);
        tempLista.mw = windouinfo.normal;
        //
        var point2sList = [];
        var loadingjieliindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

        $.ajax({
            url: servicesurl + "/api/FlzData/GetXYZ2sxy", type: "get", data: tempLista,
            success: function (res) {
                layer.close(loadingjieliindex);
                point2sList = JSON.parse(res);
                if (point2sList.length==0) {
                    layer.msg('二维坐标转换失败');
                    return;
                }
        
                var area = 0;
                var sum = 0;
                for (var j = 0; j < position.length - 1;j++) {
                    sum = sum + Cesium.Cartesian3.distance(position[j], position[j + 1]);
                }
                for (var i = 0; i < point2sList.length - 1; i++) {
                    area += (point2sList[i].x - point2sList[0].x) * (point2sList[i + 1].y - point2sList[0].y) - (point2sList[i].y - point2sList[0].y) * (point2sList[i + 1].x - point2sList[0].x);
                }
                area = Math.abs(area) / 2;
                data.creatTime = y + '-' + (mouth < 10 ? '0' + mouth : mouth) + '-' + (d < 10 ? '0' + d : d);
                data.windowId = windouinfo.id;//测窗id，
                data.modleId = modleInfo.id.split("_")[1];//模型id
                data.modleTime = modleInfo.title;//模型时间

                //计算面积，
                points = [];
                points = positList;
                //计算面积
                data.remarks = "节理";

                data.collector = collector;
                if (isClose) {//闭合
                    position.push(position[0]);//把第一个点存了
                    point2sList.push(point2sList[0]);
                    data.position = JSON.stringify(position);//直接存吧;
                    data.src = JSON.stringify(point2sList);//直接存吧;平面直角坐标
                    data.traceLength = (sum / 2).toFixed(4);
                    data.measure = area.toFixed(6);
                    data.avgOpening = (data.measure / data.traceLength).toFixed(4);
                    positList.push(positList[0]);
                } else {
                    data.position = JSON.stringify(position);//直接存吧;
                    data.src = JSON.stringify(point2sList);//直接存吧;平面直角坐标
                    data.traceLength = sum.toFixed(4);
                    data.measure = (sum * 0.002).toFixed(6);
                    data.avgOpening = 0.002.toFixed(4);
                }
                console.log(data);
                var loadingjieliindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                $.ajax({
                    url: servicesurl + "/api/FlzData/AddFlzPoint", type: "post", data: data,
                    success: function (result) {
                        
                        if (isNaN(result)) {
                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        } else {
                            //关闭
                            layer.msg("保存成功", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            for (var i in layers) {
                                if (layers[i].type =="FLZWINDOWFA") {
                                    for (var j in layers[i].children) {
                                        if (layers[i].children[j].type == "FLZWINDOW" && layers[i].children[j].id == ("FLZWINDOW_" + windouinfo.id)) {
                                            var flzline = new Object;
                                            var xSum = 0;//求一个平均点，用于定位
                                            var ySum = 0;
                                            var zSum = 0;
                                            for (var m = 0; m < positList.length; m++) {
                                                xSum = xSum + parseFloat(positList[m].x);
                                                ySum = ySum + parseFloat(positList[m].y);
                                                zSum = zSum + parseFloat(positList[m].z);
                                            }
                                            flzline.Centerx = xSum / positList.length;
                                            flzline.Centery = ySum / positList.length;
                                            flzline.Centerz = zSum / positList.length;
                                            flzline.title = "节理" + (parseInt(result)-1);
                                            flzline.id = "FLZJIELI_" + result;
                                            flzline.type = "FLZJIELI";
                                            flzline.remarks = data.remarks;
                                            flzline.datas = data;
                                            flzline.datas.pointList = positList;
                                            flzline.datas.name = flzline.title;
                                            flzline.datas.id = result;
                                            flzline.pointList = positList;
                                            flzline.checked = true;
                                            flzline.spread = true;
                                            flzline.showCheckbox = true;//显示复选框spread = true
                                            layers[i].children[j].children.push(flzline);
                                            layers[i].children[j].spread = true;
                                            layers[i].spread = true;
                                            //更新一下表
                                            if (jielitableview!=null) {
                                                var jieli = new Object;
                                                jieli.id = result;
                                                jieli.name = parseInt(result) - 1;
                                                jieli.avgOpening = data.avgOpening;
                                                jieli.inclination = data.inclination;
                                                jieli.dipAngle = data.dipAngle;
                                                jieli.trend = data.trend;
                                                jieli.traceLength = data.traceLength;
                                                jieli.measure = data.measure;
                                                jieli.modleTime = data.modleTime;
                                                jieli.creatTime = data.creatTime;
                                                jieli.remarks = data.remarks;
                                                jieli.collector = data.collector;
                                                jieli.windowId = data.windowId; 
                                                jielitabledata.push(jieli);
                                                jielitableview.reload({ id: 'jielitableviewid', data: jielitabledata });
                                            }
                                        }
                                    }

                                }
                            }
                            modeljiazaiFlag = false;
                            tree.reload('prjlayerlistid', { data: layers });
                            ClearTemp();
                            for (i = 0; i < 50; i++) {
                                viewer.entities.removeById("jielitemp" + i);
                            }

                            isRedo = true;
                            points = [];
                            linepoints = [];
                        }
                        layer.close(loadingjieliindex);
                    }, datatype: "json"
                });
            }, datatype: "json"
        });

       
        

        //计算迹长，




    } else if (flag == "jiegou") {//结构面
        var data = {};
        var positList = position;
        var linepointList = linepoints;
        var temp = ""
       

        var tem = getChanzhuang(positList);
        var qingXiang = tem.qingXiang;
        var qingJiao = tem.qingJiao;
        
        data.cookie = document.cookie;
        data.position = JSON.stringify(positList);
        data.projectId = currentprojectid;
        data.type = "4";//优势结构面
        data.inclination = qingXiang.toFixed(2);//倾向
        data.dipAngle = qingJiao.toFixed(2);//倾角

        if ((parseFloat(qingXiang) + 90) > 360) {
            data.trend = (parseFloat(qingXiang) - 270).toFixed(2);//走向
        } else {
            data.trend = (parseFloat(qingXiang) + 90).toFixed(2);//走向
        }

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
        
        //用src去装最佳视角
        data.src = JSON.stringify(home);
        data.creatTime = y + '-' + (mouth < 10 ? '0' + mouth : mouth) + '-' + (d < 10 ? '0' + d : d);
        data.modleId = modleInfo.id.split("_")[1];//模型id
        data.modleTime = modleInfo.title;//模型时间
        data.remarks = "结构面";//模型时间
        //计算迹长，
        if (data.inclination == "NaN" || data.dipAngle == "NaN") {
            layer.msg("计算产状失败，请重新选择", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            for (var m in points) {
                viewer.entities.removeById("jiegoutemp" + m);
            }
            points = [];
            linepoints = [];
            return;
        }
        $.ajax({
            url: servicesurl + "/api/FlzData/AddFlzPoint", type: "post", data: data,
            success: function (result) {
                if (isNaN(result)) {
                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                } else {
                    //关闭
                    layer.msg("保存成功", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    layer.close(drowinfoAddlayerindex);
                    console.log(layers);
                    var isDomdtrpla = true;//查看是否有优势结构面
                    for (var i in layers) {
                        if (layers[i].type =="DOMSTRPLA") {
                            isDomdtrpla = false;
                            var flzline = new Object;
                            var xSum = 0;//求一个平均点，用于定位
                            var ySum = 0;
                            var zSum = 0;
                            for (var m = 0; m < positList.length; m++) {
                                xSum = xSum + parseFloat(positList[m].x);
                                ySum = ySum + parseFloat(positList[m].y);
                                zSum = zSum + parseFloat(positList[m].z);
                            }
                            flzline.Centerx = xSum / positList.length;
                            flzline.Centery = ySum / positList.length;
                            flzline.Centerz = zSum / positList.length;
                            flzline.title = (parseInt(result) - 1);
                            flzline.id = "YOUSHIMIAN_" + result;
                            flzline.type = "YOUSHIMIAN";
                            flzline.remarks = data.remarks;
                            flzline.datas = data;
                            flzline.datas.id = result;
                            flzline.datas.name = flzline.title;
                            flzline.datas.pointList = positList;
                            flzline.pointList = positList;
                            flzline.checked = true;
                            flzline.spread = true;
                            flzline.showCheckbox = true;//显示复选框spread = true
                            layers[i].children.push(flzline);
                            layers[i].children.spread = true;
                            layers[i].spread = true;
                        }
                    }
                    
                    if (isDomdtrpla) {//根本没有又是结构面的时候，
                        var dominantStructuralPlane = new Object;
                        dominantStructuralPlane.title = "优势结构面";
                        dominantStructuralPlane.type = "DOMSTRPLA";
                        dominantStructuralPlane.showCheckbox = true;//显示复选框
                        var dominantStructuralPlanechild = [];

                        var flzline = new Object;
                        var xSum = 0;//求一个平均点，用于定位
                        var ySum = 0;
                        var zSum = 0;
                        for (var m = 0; m < positList.length; m++) {
                            xSum = xSum + parseFloat(positList[m].x);
                            ySum = ySum + parseFloat(positList[m].y);
                            zSum = zSum + parseFloat(positList[m].z);
                        }
                        flzline.Centerx = xSum / positList.length;
                        flzline.Centery = ySum / positList.length;
                        flzline.Centerz = zSum / positList.length;
                        flzline.title = (parseInt(result) - 1);
                        flzline.id = "YOUSHIMIAN_" + result;
                        flzline.type = "YOUSHIMIAN";
                        flzline.remarks = data.remarks;
                        flzline.datas = data;
                        flzline.datas.id = result;
                        flzline.datas.name = flzline.title;
                        flzline.datas.pointList = positList;
                        flzline.pointList = positList;
                        flzline.checked = true;
                        flzline.spread = true;
                        flzline.showCheckbox = true;//显示复选框spread = true
                        dominantStructuralPlanechild.push(flzline)
                        dominantStructuralPlane.spread = true;
                        dominantStructuralPlane.children = dominantStructuralPlanechild
                        layers.push(dominantStructuralPlane);
                    }
                    //更新一下表
                    if (jieGoutableview != null) {
                        var jieGou = new Object;
                        jieGou.id = result;
                        jieGou.name = parseInt(result) - 1;
                        jieGou.avgOpening = data.avgOpening;
                        jieGou.inclination = data.inclination;
                        jieGou.dipAngle = data.dipAngle;
                        jieGou.trend = data.trend;
                        jieGou.traceLength = data.traceLength;
                        jieGou.modleTime = data.modleTime;
                        jieGou.creatTime = data.creatTime;
                        jieGou.remarks = data.remarks;
                        jieGoutabledata.push(jieGou);
                        if (jieGouTongjilayer != null) {
                            layer.restore(jieGouTongjilayer);
                        }
                        jieGoutableview.reload({ id: 'jieGoutableviewid', data: jieGoutabledata });
                    }

                    modeljiazaiFlag = false;
                    tree.reload('prjlayerlistid', { data: layers });
                    ClearTemp();
                    if (handler != undefined) {
                        handler.destroy();
                    }


                    isRedo = true;
                    points = [];
                    linepoints = [];
                }

            }, datatype: "json"
        });



        //取消画的图和点
        if (handler != undefined) {
            handler.destroy();
        }
        viewer._container.style.cursor = "default";//还原鼠标样式
        for (var m in points) {
            viewer.entities.removeById("jiegoutemp" + m);
        }
        isRedo = true;
        points = [];
        linepoints = [];
    } else if (flag == "xiePuo") {//画斜坡边界，新建斜坡
        if (drowinfoAddlayerindex == null) {
            //
            drowinfoAddlayerindex = layer.open({
                type: 1
                , title: ['斜坡新增', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                , area: ['300px', '300px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<form class="layui-form" style="margin-top:5px;margin-right:25px;" lay-filter="addxiePuoinfoform"><div class="layui-form-item" style="margin-top:15px;margin-right:5px;"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">斜坡名称</label><div class="layui-input-block"><input type="text" name="name" lay-verify="required" autocomplete="off" placeholder="请输入" class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">斜坡备注</label><div class="layui-input-block"><input type="text" name="remarks" lay-verify="required" autocomplete="off" placeholder="请输入"  class="layui-input" style="width:160px;"  /></div></div></div></div></div><div class="layui-form-item" style="margin-top:15px"><div style="position:absolute;right:15px;"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="addxiePuoinfosubmit" style="width:100px">提交</button></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);
                    form.render();

                    form.on('submit(addxiePuoinfosubmit)', function (data) {
                        var positList = position;
                        data.field.cookie = document.cookie;
                        position.push(position[0]);
                        data.field.points = JSON.stringify(position);//直接存吧;
                        data.field.projectId = currentprojectid;
                        //存一个表，斜坡项目关联表
                        data.field.status = '0';
                        data.field.modleId = modleInfo.id.split("_")[1];//模型id
                        var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                        $.ajax({
                            url: servicesurl + "/api/FlzWindowInfo/AddFlzSteepHill", type: "post", data: data.field,
                            success: function (result) {
                                layer.close(loadingminindex);

                                if (isNaN(result)) {
                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                } else {
                                    //关闭
                                    layer.msg("保存成功", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    ClearTemp();
                                    layer.close(drowinfoAddlayerindex);
                                    var modleFlag = false;
                                    var xiabiao1 = 0;
                                    for (var m in layers) {
                                        if (layers[m].type == "XIEPUOFAT") {
                                            modleFlag = true;
                                            xiabiao1 = m;
                                        }
                                    }
                                    if (modleFlag) {
                                        
                                            var flzline = new Object;
                                            flzline.title = data.field.name;
                                            flzline.id = "XIEPUO_" + result;
                                            flzline.type = "XIEPUO";
                                            flzline.remarks = data.field.remarks;
                                            flzline.datas = data.field;
                                            flzline.datas.pointList = positList;
                                            flzline.pointList = positList;
                                            flzline.checked = true;
                                            flzline.spread = true;
                                            flzline.showCheckbox = true;//显示复选框spread = true
                                            layers[xiabiao1].spread = true;
                                            layers[xiabiao1].children.push(flzline);
                                        
                                    } else {//没有，就是新增
                                        var flzDataLayer = new Object;
                                        flzDataLayer.title = "斜坡";
                                        flzDataLayer.type = "XIEPUOFAT";
                                        var flzDataLayerchild = [];
                                        var noodlesList = positList;

                                        if (noodlesList != null && noodlesList.length > 0) {
                                            var flzline = new Object;
                                            flzline.title = data.field.name;
                                            flzline.id = "XIEPUO_" + result;
                                            flzline.type = "XIEPUO";
                                            flzline.remarks = data.field.remarks;
                                            flzline.datas = data.field;
                                            flzline.datas.pointList = positList;
                                            flzline.pointList = positList;
                                            flzline.checked = true;
                                            flzline.spread = true;
                                            flzline.showCheckbox = true;//显示复选框spread = true
                                            flzDataLayerchild.push(flzline);

                                        }

                                        flzDataLayer.children = flzDataLayerchild;
                                        flzDataLayer.spread = true;
                                        layers.push(flzDataLayer);

                                    }

                                    modeljiazaiFlag = false;
                                    tree.reload('prjlayerlistid', { data: layers });
                                    ClearTemp();
                                    isRedo = true;
                                    points = [];
                                    linepoints = [];
                                }


                            }, datatype: "json"
                        });
                        return false;
                    });

                }
                , end: function () {
                    drowinfoAddlayerindex = null;
                    areaMeasure();
                }, cancel: function () {//取消按钮

                    //取消画的图和点
                    if (handler != undefined) {
                        handler.destroy();
                    }
                    isRedo = true;
                    points = [];
                    linepoints = [];
                }
            });
        }

    }

}
function jisumianji(postList) {
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

    var sum = Cesium.Cartesian3.distance(postList[3], postList[0]);
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
    console.log(area);
    console.log(postList);
    console.log(sum);
    console.log(areacartesian2sb);
    return area;
}

function gotoJieli() {
    if (currentprojectid == null) {
        layer.msg('请先选择项目',{ zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    if (modleInfo == null) {
        layer.msg('请先选择模型', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    if (jielitext!=null) {
        layer.msg('已打开节理窗口', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    if (jieLiTongjilayer!=null) {
        layer.min(jieLiTongjilayer);
    }
    jielitext = layer.open({
        type: 1
        , title: ['节理采集', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
        , area: ['300px', '250px']
        , shade: 0
        , offset: ['130px', '260px']//头部，左边
        , closeBtn: 1
        , anim: 0
        , maxmin: true
        , moveOut: true
        , content: pdfjieli
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);
            if (windowInfoList.length > 0) {
                for (var i in windowInfoList) {
                    document.getElementById("jieliIdSelectpdf").innerHTML += '<option value="' + windowInfoList[i].id + '">' + windowInfoList[i].name + '</option>';
                }
            };
           
            form.render();
            form.render('select');
            form.on('submit(querypdfjielisubmit)', function (data) {
                ClearTemp();
                isClose = data.field.isClose ? true : false;
                collector = data.field.collector;

                for (var i in windowInfoList) {
                    if (windowInfoList[i].id == data.field.jieliId) {
                        cequList = JSON.parse(windowInfoList[i].vertices3dlbh);
                        windouinfo = windowInfoList[i];
                        for (var m in layers) {
                            if (layers[m].type == "FLZWINDOWFA") {
                                for (var j in layers[m].children) {
                                    if (layers[m].children[j].id == ("FLZWINDOW_" + data.field.jieliId)) {
                                        var entityFater = viewer.entities.getById(layers[m].children[j].id);
                                        if (entityFater == null) {
                                            layers[m].spread = true;
                                            layers[m].children[j].spread = true;
                                            layers[m].children[j].checked = true;
                                            layers[m].spread = true;
                                            modeljiazaiFlag = false;
                                            tree.reload('prjlayerlistid', { data: layers });
                                            ClearTemp();
                                        } 
                                        if (layers[m].children[j].datas.level.indexOf("y") != -1) {
                                            var home = JSON.parse(layers[m].children[j].datas.level);
                                            viewer.scene.camera.setView(home);
                                        } else {//老视角，
                                            viewer.zoomTo(entityFater, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(-(parseFloat(layers[m].children[j].datas.level))), Cesium.Math.toRadians(layers[m].children[j].datas.vertical), 40));
                                        }
                                        break;
                                    }
                                }

                            }
                        }

                    }
                }
                if (handler != undefined) {
                    handler.destroy();
                }
                handler = new Cesium.ScreenSpaceEventHandler(canvas);
                viewer._container.style.cursor = "crosshair";//修改鼠标样式
                linepoints = [];
                //左击
                handler.setInputAction(function (leftclik) {
                    if (isRedo) {
                        ClearTemp();
                        isRedo = false;
                        points = [];
                        for (i = 0; i < 50; i++) {
                            viewer.entities.removeById("jielitemp" + i);
                        }
                    }
                    if (cequList.length == 0) {
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
                        //if (longitude < minL || longitude > maxL || latitude < minB || latitude > maxB) {
                        //    //判断点在测区外，
                        //    layer.msg('该点在测窗外了');
                        //    return;
                        //}

                        if (position != undefined) {
                            linepoints.push(Cesium.Cartographic.fromCartesian(position));
                            if (Cesium.defined(position)) {
                                viewer.entities.add({
                                    name: "plMeasue" + NewGuid(),
                                    position: position,
                                    point: {
                                        pixelSize: 3,
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
                                            width: 1,
                                            arcType: Cesium.ArcType.RHUMB,
                                            material: Cesium.Color.RED,
                                            depthFailMaterial: Cesium.Color.RED,
                                        }
                                    });
                                }
                            }
                        }
                    }
                }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
                //移动
               
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
                return false;
            });
            
        }
        , end: function () {
            jielitext = null;
            cequList = [];
            windouinfo = null;
            if (jieLiTongjilayer != null) {
                layer.restore(jieLiTongjilayer);
            }
            viewer._container.style.cursor = "default";//还原鼠标样式
            ClearTemp();
            //取消画的图和点
            if (handler != undefined) {
                handler.destroy();
            }
        }
    });
    
}
//删除节理
function deleteJieli(data) {
    var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
    $.ajax({
        url: servicesurl + "/api/FlzData/DeleteFlzPoint", type: "delete", data: { "id": data.id, "cookie": document.cookie },
        success: function (result) {
            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            viewer.entities.removeById("FLZJIELI_"+data.id);
            for (var i in layers) {
                if (layers[i].type == "FLZWINDOWFA") {//测窗的
                    for (var j in layers[i].children) {
                        if (layers[i].children[j].datas.id == data.windowId) {//测窗id相同
                            for (var m in layers[i].children[j].children) {
                                if (layers[i].children[j].children[m].datas.id == data.id) {
                                    layers[i].children[j].children.splice(m, 1);
                                    layers[i].children[j].children.spread = true;
                                    layers[i].children[j].spread = true;
                                    layers[i].spread = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            if (jielitableview != null) {
                for (var i in jielitabledata){
                    if (jielitabledata[i].id == data.id) {
                        jielitabledata.splice(i, 1);
                        break;
                    }
                }
                jielitableview.reload({ id: 'jielitableviewid', data: jielitabledata });
            }


            layer.close(loadingceindex);
            modeljiazaiFlag = false;
            tree.reload('prjlayerlistid', { data: layers });
            ClearTemp();
        }, datatype: "json"
    });
}
//修改节理
function updateJieLi(data) {
    if (drwjieliUpdInfox!=null) {
        layer.msg('已打开节理修改窗口', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    drwjieliUpdInfox = layer.open({
        type: 1
        , title: ['确认修改', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['300px', '300px']
        , shade: 0
        , offset: 'auto'
        , closeBtn: 1
        , maxmin: true
        , moveOut: true
        , content: jieliupd
        , zIndex: layer.zIndex
        , success: function (layero) {
            //置顶
            layer.setTop(layero);
            form.render();
            form.val("updpointinfoform", {
                "name": data.name
                , "remarks": data.remarks,
                "avgOpening": data.avgOpening,// "3"

            });

            form.on('submit(updpointinfosubmit)', function (temp) {
                temp.field.id = data.id;//把id往后面传
                temp.field.cookie = document.cookie;
                var loadingjieliindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                $.ajax({
                    url: servicesurl + "/api/FlzData/UpdateFlzPoint", type: "post", data: temp.field,
                    success: function (result) {
                        layer.close(loadingjieliindex);
                        //创建失败
                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                        if ("更新成功" == result) {

                            for (var i in layers) {
                                if (layers[i].type == "FLZWINDOWFA") {//测窗的
                                    for (var j in layers[i].children) {
                                        if (layers[i].children[j].datas.id == data.windowId) {//测窗id相同
                                            for (var m in layers[i].children[j].children) {
                                                if (layers[i].children[j].children[m].datas.id == data.id) {
                                                    layers[i].children[j].children[m].title = temp.field.name;
                                                    layers[i].children[j].children[m].remarks = temp.field.remarks;
                                                    layers[i].children[j].children[m].datas.avgOpening = temp.field.avgOpening;
                                                    layers[i].children[j].children[m].datas.remarks = temp.field.remarks;
                                                    layers[i].children[j].children[m].datas.name = temp.field.name;
                                                    layers[i].children[j].children.spread = true;
                                                    layers[i].children[j].spread = true;
                                                    layers[i].spread = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (jielitabledata != null) {
                                for (var i in jielitabledata) {
                                    if (jielitabledata[i].id == data.id) {
                                        jielitabledata[i].avgOpening = temp.field.avgOpening;
                                        jielitabledata[i].remarks = temp.field.remarks;
                                        jielitabledata[i].name = temp.field.name;
                                        break;
                                    }
                                }
                                jielitableview.reload({ id: 'jielitableviewid', data: jielitabledata });
                            }
                            modeljiazaiFlag = false;
                            tree.reload('prjlayerlistid', { data: layers });
                            ClearTemp();
                            //关闭,更改图上显示
                            layer.close(drwjieliUpdInfox);
                        }

                    }, datatype: "json"
                });
                return false;
            });

        }
        , end: function () {
            drwjieliUpdInfox = null;
        }
    });
}
//删除结构
function deleteJieGou(data) {
    var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
    $.ajax({
        url: servicesurl + "/api/FlzData/DeleteFlzPoint", type: "delete", data: { "id": data.id, "cookie": document.cookie },
        success: function (result) {
            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            viewer.entities.removeById("YOUSHIMIAN_" + data.id);
            for (var i in layers) {
                if (layers[i].type == "DOMSTRPLA") {//结构父节点
                    if (layers[i].children.length==1) {//只有一条数据
                        layers.splice(i, 1);
                        break;
                    }
                    for (var j in layers[i].children) {
                        if (layers[i].children[j].datas.id == data.id) {//结构面相同的id
                            layers[i].children.splice(j, 1);
                            layers[i].children.spread = true;
                            layers[i].spread = true;
                            break;
                        }
                    }
                }
            }
            if (jieGoutableview != null) {
                for (var i in jieGoutabledata) {
                    if (jieGoutabledata[i].id == data.id) {
                        jieGoutabledata.splice(i, 1);
                        break;
                    }
                }
                jieGoutableview.reload({ id: 'jieGoutableviewid', data: jieGoutabledata });
            }


            layer.close(loadingceindex);
            modeljiazaiFlag = false;
            tree.reload('prjlayerlistid', { data: layers });
            ClearTemp();
        }, datatype: "json"
    });
}
//修改结构
function updateJieGou(data) {
    if (drwjieGouUpdInfox != null) {
        layer.msg('已打开节理修改窗口', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    drwjieGouUpdInfox = layer.open({
        type: 1
        , title: ['确认修改', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['300px', '300px']
        , shade: 0
        , offset: 'auto'
        , closeBtn: 1
        , maxmin: true
        , moveOut: true
        , content: jiegouupd
        , zIndex: layer.zIndex
        , success: function (layero) {
            //置顶
            layer.setTop(layero);
            form.render();
            form.val("updpointinfoform", {
                "name": data.name
                , "remarks": data.remarks,
            });

            form.on('submit(updpointinfosubmit)', function (temp) {
                temp.field.id = data.id;//把id往后面传
                temp.field.cookie = document.cookie;
                var loadingjieGouindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                $.ajax({
                    url: servicesurl + "/api/FlzData/UpdateFlzPoint", type: "post", data: temp.field,
                    success: function (result) {
                        layer.close(loadingjieGouindex);
                        //创建失败
                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                        if ("更新成功" == result) {

                            for (var i in layers) {
                                if (layers[i].type == "DOMSTRPLA") {//优势结构面
                                    for (var j in layers[i].children) {
                                        if (layers[i].children[j].datas.id == data.id) {//结构面id相同
                                            layers[i].children[j].title = temp.field.name;
                                            layers[i].children[j].remarks = temp.field.remarks;
                                            layers[i].children[j].datas.remarks = temp.field.remarks;
                                            layers[i].children[j].datas.name = temp.field.name;
                                            layers[i].children[j].spread = true;
                                            layers[i].spread = true;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (jieGoutabledata != null) {
                                for (var i in jieGoutabledata) {
                                    if (jieGoutabledata[i].id == data.id) {
                                        jieGoutabledata[i].remarks = temp.field.remarks;
                                        jieGoutabledata[i].name = temp.field.name;
                                        break;
                                    }
                                }
                                jieGoutableview.reload({ id: 'jieGoutableviewid', data: jieGoutabledata });
                            }
                            modeljiazaiFlag = false;
                            tree.reload('prjlayerlistid', { data: layers });
                            ClearTemp();
                            //关闭,更改图上显示
                            layer.close(drwjieGouUpdInfox);
                        }

                    }, datatype: "json"
                });
                return false;
            });

        }
        , end: function () {
            drwjieGouUpdInfox = null;
        }
    });
}