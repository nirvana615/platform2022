
var handler;
var scene = viewer.scene;
var canvas = scene.canvas;
var isPoint = false;                        //坐标量测
var isLength = false;                     //长度量测
var isHeight = false;                       //高度量测
var isAraa = false;                         //面积量测
var isAzimuth = false;                      //方位角量测
var isRedo = false;                         //继续绘制
var isPointLabel = false;                   //点标注
var isPolylineLabel = false;                //线标注
var isPolygonLabel = false;                 //面标注
var isOccurrence = false;                   //产状
var isWindowZiDingyi = false;                  //迹线
var points = [];                            //临时点集
var pointLabelCount = 0;
var curId = "0";
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
var eyespoints = [];
var cequList = [];
var botiaoValue = null;
var pointPic = null;//图片地质
var pointColor = '#079b8c';//图标颜色
var biaoZhulayerlistlayerindex = null;
var biaoZhudrwInfox = null;
var drowinfoAddlayerindex = null;
var colorpicker = layui.colorpicker;//
var biaoZhuindex = null;

var kmlList = [];
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
    //if (viewer.scene.primitives._primitives.length>2)
    //{
    //    for (var i = 2; i < viewer.scene.primitives._primitives.length; i++) {
    //        viewer.scene.primitives.remove(viewer.scene.primitives._primitives[i]);
    //    }
    //}

    points = [];
    eyespoints = [];
}
//标注管理
function biaozhuMangan() {
    //判断一下模型。项目
    if (currentprojectid == null) {
        layer.msg('请先选择项目');
        return;
    }
    if (modleInfo == null) {
        layer.msg('请先选择模型');
        return;
    }
    console.log(modleInfo);
    console.log(curtileset);
    if (biaoZhulayerlistlayerindex != null) {
        layer.msg('已打开标注窗口');
        return;
    }
    //添加点标注，弹出框
    biaoZhulayerlistlayerindex = layer.open({
        type: 1
        , title: [modleInfo.title+'标注', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['300px', '500px']
        , shade: 0
        , offset: ['60px', '350px']
        , closeBtn: 1
        , maxmin: true
        , moveOut: true
        , content: dianBiaozhuHtml
       , zIndex: layer.zIndex
        , success: function (layero) {
            LoadBiaozhunListLayer();

            
            form.on('submit(dowminfosubmit)', function (temp) {
                if (kmlList.length==0) {
                    layer.msg('没有标注');
                    return false;
                }
                console.log(kmlList);


                var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                var pointList = [];//点
                var lineList = [];//线
                //var noodlesList = [];//面
                for (var i = 0; i < kmlList.length; i++) {
                    if ("1" == kmlList[i].type) {
                        pointList.push(kmlList[i]);
                    } else if ("2" == kmlList[i].type || "3" == kmlList[i].type) {
                        lineList.push(kmlList[i]);
                    } 
                }
                var pointKml = "";
                for (var i = 0; i < pointList.length; i++) {
                    var postion = JSON.parse(pointList[i].postion);
                    var cartesian3 = Cesium.Cartographic.fromCartesian(postion);
                    var L = Cesium.Math.toDegrees(cartesian3.longitude);                         //经度
                    var B = Cesium.Math.toDegrees(cartesian3.latitude);                           //纬度

                    pointKml = pointKml + "<Placemark><name>" + pointList[i].name + "</name><LookAt><longitude>" + L + "</longitude><latitude>" + B
                        + " </latitude> <altitude>0</altitude> <gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode></LookAt> <styleUrl>#m_ylw-pushpin0</styleUrl> <Point><gx:drawOrder>1</gx:drawOrder> <coordinates>"
                        + L + "," + B + ",0</coordinates></Point></Placemark>";
                }
                var lineKml = "";
                for (var i = 0; i < lineList.length; i++) {
                    var pointListtem = JSON.parse(lineList[i].postion);
                    var lineJson = "";
                    for (var x = 0; x < pointListtem.length; x++) {
                        var cartesian3 = Cesium.Cartographic.fromCartesian(pointListtem[x]);
                        var L = Cesium.Math.toDegrees(cartesian3.longitude);                         //经度
                        var B = Cesium.Math.toDegrees(cartesian3.latitude);                           //纬度
                        lineJson = lineJson + " " + L + "," + B + "," + "0 ";
                    }
                    lineKml = lineKml + "<Placemark><name>" + lineList[i].name + "</name><styleUrl>#m_ylw-pushpin</styleUrl><LineString><tessellate>1</tessellate><coordinates>" + lineJson + " </coordinates></LineString></Placemark>";
                }

                var xmname = "监测立杆设计";
                try {
                    if (currentprojectinfo.xmmc) {
                        xmname = currentprojectinfo.xmmc;
                    } else {
                        //hGaizhengshu = parseFloat(modleInfo.gcgz);
                    }
                } catch (e) {
                    console.log(e.message);//sojson is undefined
                }
                var kml = '<?xml version="1.0" encoding="UTF-8"?><kml xmlns = "http://www.opengis.net/kml/2.2" xmlns:gx = "http://www.google.com/kml/ext/2.2" xmlns:kml = "http://www.opengis.net/kml/2.2" xmlns:atom = "http://www.w3.org/2005/Atom" ><Document><name>' + xmname +'</name><Style id="s_ylw-pushpin"><IconStyle><scale>1.1</scale><Icon>	<href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href></Icon><hotSpot x="20" y="2" xunits="pixels" yunits="pixels" /></IconStyle></Style><StyleMap id="m_ylw-pushpin"><Pair><key>normal</key><styleUrl>#s_ylw-pushpin0</styleUrl></Pair><Pair><key>highlight</key><styleUrl>#s_ylw-pushpin_hl</styleUrl></Pair></StyleMap><Style id="s_ylw-pushpin_hl"><IconStyle><scale>1.3</scale><Icon>	<href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href></Icon><hotSpot x="20" y="2" xunits="pixels" yunits="pixels" /></IconStyle><LineStyle><color>ffffaa55</color><width>2</width></LineStyle></Style><Style id="s_ylw-pushpin_hl0"><IconStyle><scale>1.3</scale><Icon>	<href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href></Icon><hotSpot x="20" y="2" xunits="pixels" yunits="pixels" /></IconStyle></Style><Style id="s_ylw-pushpin0"><IconStyle><scale>1.1</scale><Icon>	<href>http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png</href></Icon><hotSpot x="20" y="2" xunits="pixels" yunits="pixels" /></IconStyle><LineStyle><color>ffffaa55</color><width>2</width></LineStyle></Style><StyleMap id="m_ylw-pushpin0"><Pair><key>normal</key><styleUrl>#s_ylw-pushpin</styleUrl></Pair><Pair><key>highlight</key><styleUrl>#s_ylw-pushpin_hl0</styleUrl></Pair></StyleMap><Folder><name>点数据</name>' + pointKml + '</Folder><Folder><name>线数据</name>' + lineKml+'</Folder></Document></kml>';
                console.log(kml);
                var blob = new Blob([kml], { type: "text/plain;charset=utf-8" });
                if (currentprojectinfo) {

                }
                var name = "kml数据";
                try {
                    if (currentprojectinfo.xmmc) {
                        name = currentprojectinfo.xmmc;
                    } else {
                        //hGaizhengshu = parseFloat(modleInfo.gcgz);
                    }
                } catch (e) {
                    console.log(e.message);//sojson is undefined
                }
                saveAs(blob, name + ".kml");
                layer.close(loadingceindex);
                return false;
            });
            //置顶
            layer.setTop(layero);
            $(window).resize();


        }
        , end: function () {
            biaoZhulayerlistlayerindex = null;
            //删除图层数据

        }
    });

       //开启全功能
        colorpicker.render({
            elem: '#test-all'
            , color: '#079b8c'
            , format: 'RGB'
            , predefine: true
            , alpha: true
            , done: function (color) {
                $('#test-all-input').val(color); //向隐藏域赋值
               // layer.tips('给指定隐藏域设置了颜色值：' + color, this.elem);
                pointColor = color;
              

                color || this.change(color); //清空时执行 change

            }
            , change: function (color) {
                //给当前页面头部和左侧设置主题色
                $('.header-demo,.layui-side .layui-nav').css('background-color', color);
                console.log(color);
                console.log(pointColor);
            }
    });
    
    elem.on('tab(biaozhuguanli)', function (data) {

        location.hash = 'biaozhuguanli=' + this.getAttribute('lay-id');
        if (this.getAttribute('lay-id') == "4") {
            ClearAction();
            document.getElementsByClassName("yanseShoiw")[0].style = "display:none";          //修改工具栏样式
            if (modleInfo != null) {
                if (modleInfo.id.split('_')[1] != moidsendhist || biaoLayers.length == 0) {

                    LoadBiaozhunListLayer();
                }
            } else {
                for (var i = 0; i < biaoLayers.length; i++) {
                    for (var j = 0; j < biaoLayers[i].children.length; j++) {
                        viewer.entities.removeById(biaoLayers[i].children[j].id);
                        viewer.entities.removeById(biaoLayers[i].children[j].id + "_LABEL");
                    }
                }
                biaoLayers = [];
                tree.reload('prjbiaoZhuListid', { data: biaoLayers });

            }


        } else if (this.getAttribute('lay-id') == "1") {
            pointBiaoZhu();
            document.getElementsByClassName("yanseShoiw")[0].style = "display: block";          //修改工具栏样式
        } else if (this.getAttribute('lay-id') == "2") {
            lengthBiaoZhu();
            document.getElementsByClassName("yanseShoiw")[0].style = "display: block";          //修改工具栏样式
          //  AddTargetAreaModel();
        } else if (this.getAttribute('lay-id') == "3") {
            areaBiaoZhu();
            document.getElementsByClassName("yanseShoiw")[0].style = "display: block";          //修改工具栏样式
        }
       
       
    })
    pointBiaoZhu();

    
};
function pointBiaoZhu() {

    
    ClearTemp();

    isPoint = true;
    isLength = false;
    isHeight = false;
    isAraa = false;
    isAzimuth = false;
    isRedo = false;
    isPointLabel = false;
    isPolylineLabel = false;
    isPolygonLabel = false;
    isOccurrence = false;
    isWindowZiDingyi = false;


    if (isPoint) {
        if (handler != undefined) {
            handler.destroy();
        }
        handler = new Cesium.ScreenSpaceEventHandler(canvas);

        //左击
        handler.setInputAction(function (leftclick) {
            if (pointPic == null) {
                layer.msg('请先选择图标');
                return;
            }
            if (pointColor.length == 0) {
                layer.msg('请先选择颜色');
                return;
            }
            if (isPoint) {
                var pickedOject = scene.pick(leftclick.position);
                if (pickedOject != undefined) {
                    var position = scene.pickPosition(leftclick.position);
                    if (position != undefined) {
                        var cartesian3 = Cesium.Cartographic.fromCartesian(position);                        //笛卡尔XYZ

                        if (cartesian3.height > 0) {

                            if (Cesium.defined(position)) {
                                //var drowinfoAddlayerindex = null;                           //画点新增，弹出框
                                DrowBiaoZhu("point", cartesian3, position);
                                // ClearTemp();

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
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
}
function getPointStyle(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    var pointstyle = document.elementFromPoint(e.clientX, e.clientY);
    if ((pointstyle.id == "p1") || (pointstyle.id == "p2") || (pointstyle.id == "p3") || (pointstyle.id == "p4") || (pointstyle.id == "p5")
        || (pointstyle.id == "p6") || (pointstyle.id == "p7") || (pointstyle.id == "p8") || (pointstyle.id == "p9") || (pointstyle.id == "p10")
        || (pointstyle.id == "p11") || (pointstyle.id == "p12") || (pointstyle.id == "p13") || (pointstyle.id == "p14") || (pointstyle.id == "p15")) {

        pointPic = pointstyle.src;
        console.log(pointPic);
        var pointPicture = document.getElementById("pointpic");
        var childs = pointPicture.childNodes;
        var count = 0;
        while (childs.length > 0) {
            for (var i = 0; i < childs.length; i++) {
                if (childs[i].id != undefined) {
                    //childs[i].style.border = "";
                    childs[i].style.background = "";
                }
            }
            count++;
            if (count > 500) {
                break;
            }
        }

        //pointstyle.style.border = "1px solid #DA2527";
        pointstyle.style.background = "#004689";
    }
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

//长度标注
function lengthBiaoZhu() {
    if (pointColor.length == 0) {
        layer.msg('请先选择线的颜色');
        return;
    }
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
        viewer._container.style.cursor = "crosshair";//修改鼠标样式
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
                        var cartesian3 = new Cesium.Cartesian3(position.x, position.y, position.z);
                        linepoints.push(Cesium.Cartographic.fromCartesian(position));
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
                                //polylineOnModel("plMeasue" + NewGuid(), [point, position], 0.05, 10, Cesium.Color.AQUAMARINE);             
                            viewer.entities.add({
                                name: "plMeasue" + NewGuid(),
                                polyline: {
                                    positions: [point, position],
                                    width: 2,
                                    arcType: Cesium.ArcType.RHUMB,
                                    material: Cesium.Color.fromCssColorString(pointColor),
                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.fromCssColorString(pointColor),
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
                        if (viewer.entities.getById("line_temp9999")!=null) {
                            viewer.entities.removeById("line_temp9999");
                        }
                        
                        //绘制多边形临时边线
                        viewer.entities.add({
                            id: "line_temp9999",
                            polyline: {
                                positions: [points[points.length - 1], XYZ],
                                width: 2,
                                arcType: Cesium.ArcType.RHUMB,
                                material: Cesium.Color.fromCssColorString(pointColor),
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.fromCssColorString(pointColor),
                                }),
                            }
                        });
                        
                    }
                }
            }

        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
       //右击
        if (isMobile.any()) {//双指
            handler.setInputAction(function (pinch) {
                if (viewer.entities.getById("line_temp9999") != null) {
                    viewer.entities.removeById("line_temp9999");
                }
                if (handler != undefined) {
                    handler.destroy();
                }
                viewer._container.style.cursor = "default";//还原鼠标样式
                if (points.length > 1) {
                    DrowBiaoZhu("line", linepoints, points);
                }

            }, Cesium.ScreenSpaceEventType.PINCH_START);
        }
        else {//右击
            
            handler.setInputAction(function (rightclik) {
                if (viewer.entities.getById("line_temp9999") != null) {
                    viewer.entities.removeById("line_temp9999");
                }
                if (handler != undefined) {
                    handler.destroy();
                }
                viewer._container.style.cursor = "default";//还原鼠标样式
                if (points.length > 1) {
                    DrowBiaoZhu("line", linepoints, points);

                }

            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }
    }
};

//面标注
/*

*/
function areaBiaoZhu() {
    //本面积计算方法为：将所有点转换为大地坐标BLH，然后将H赋值为最大H，再转换为空间直角坐标XYZ，取XY计算面积
    ClearTemp();
    if (currentprojectid == null) {
        layer.msg('请先选择项目');
        return;
    }
    isPoint = false;
    isLength = false;
    isHeight = false;
    isAraa = true;
    isAzimuth = false;
    isRedo = false;
    isPointLabel = false;
    isPolylineLabel = false;
    isPolygonLabel = false;
    isOccurrence = false;
    isWindowZiDingyi = false;

    if (isAraa) {
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
                            //polylineOnModel("plMeasue" + NewGuid(), [point, position], 0.05, 10, Cesium.Color.AQUAMARINE);             
                            viewer.entities.add({
                                name: "plMeasue" + NewGuid(),
                                polyline: {
                                    positions: [point, position],
                                    width: 2,
                                    arcType: Cesium.ArcType.RHUMB,
                                    material: Cesium.Color.fromCssColorString(pointColor),
                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.fromCssColorString(pointColor),
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
                                material: Cesium.Color.fromCssColorString(pointColor),
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.fromCssColorString(pointColor),
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
                                    material: Cesium.Color.fromCssColorString(pointColor),
                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.fromCssColorString(pointColor),
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
                    if (viewer.entities.getById("line_temp9999") != null) {
                        viewer.entities.removeById("line_temp9999");
                    }
                    if (viewer.entities.getById("line_temp9998") != null) {
                        viewer.entities.removeById("line_temp9998");
                    }
                    if (handler != undefined) {
                        handler.destroy();
                    }
                    DrowBiaoZhu("area", linepoints, points);


                }

            }, Cesium.ScreenSpaceEventType.PINCH_START);
        }
        else {
            //右击
            handler.setInputAction(function (rightclik) {
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
                    DrowBiaoZhu("area", linepoints, points);
                }

            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }
    }
};

//画点弹出框
function DrowBiaoZhu(flag, cartesian3, position) {

    if (flag == "point") {
        //
        console.log(modleInfo);
        console.log(pointColor);
        var strtempList = pointPic.split('Resources');
        var pointPicSrc = 'Resources' + strtempList[1];
        var data = {};
        data.cookie = document.cookie;
        data.position = JSON.stringify(position);
        data.projectId = currentprojectid;
        data.type = "1";
        data.modleId = modleInfo.id.split('_')[1];
        data.modleTime = modleInfo.title.substring(0, 10);
        data.colour = pointColor;
        data.src = pointPicSrc;
        data.remarks = "点标注";
        var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

        $.ajax({
            url: servicesurl + "/api/RockData/AddRockPoint", type: "post", data: data,
            success: function (result) {

                layer.close(loadingceindex);
                //创建失败
                if (isNaN(result)) {//true ,失败，成功返回id
                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                } else {

                    //关闭
                    layer.msg("保存成功", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    ClearTemp();
                    var modleFlag = false;
                    if (biaoLayers.length == 0) {
                        LoadBiaozhunListLayer();
                        elem.tabChange('biaozhuguanli', 4); //跳转地址图层列表

                    } else {
                        var xiabiao1 = 0;
                        for (var m in biaoLayers) {
                            if (biaoLayers[m].type == "ROCKPOINT") {
                                modleFlag = true;
                                xiabiao1 = m;
                            }
                        }
                        if (modleFlag) {
                            var rockpoint = new Object;
                            rockpoint.title = result;
                            rockpoint.id = "ROCKPOINT_" + result;
                            rockpoint.type = "ROCKPOINT";
                            rockpoint.remarks = "点标注";
                            rockpoint.src = "../../" + pointPicSrc;
                            rockpoint.colour = pointColor;
                            rockpoint.postion = position;

                            rockpoint.checked = true;
                            rockpoint.spread = true;
                            rockpoint.showCheckbox = true;//显示复选框

                            rockpoint.datas = data;
                            biaoLayers[xiabiao1].checked = true;
                            biaoLayers[xiabiao1].spread = true;
                            biaoLayers[xiabiao1].children.push(rockpoint);

                        } else {//没有，就是新增
                            var rockpointlayer = new Object;
                            rockpointlayer.title = "点标注";
                            rockpointlayer.type = "ROCKPOINTFA";
                            rockpointlayer.checked = true;
                            rockpointlayer.spread = true;
                            rockpointlayer.showCheckbox = true;//显示复选框
                            var rockpointlayerchild = [];

                            var rockpoint = new Object;
                            rockpoint.title = result;
                            rockpoint.id = "ROCKPOINT_" + result;
                            rockpoint.type = "ROCKPOINT";
                            rockpoint.remarks = "点标注";
                            rockpoint.src = "../../" + pointPicSrc;
                            rockpoint.colour = pointColor;
                            rockpoint.postion = position;
                            rockpoint.checked = true;
                            rockpoint.spread = true;
                            rockpoint.showCheckbox = true;//显示复选框

                            rockpoint.datas = data;
                            rockpointlayerchild.push(rockpoint);


                            rockpointlayer.children = rockpointlayerchild;
                            biaoLayers.push(rockpointlayer);

                        }
                        console.log(biaoLayers);
                        tree.reload('prjbiaoZhuListid', { data: biaoLayers });
                        elem.tabChange('biaozhuguanli', 4); //跳转地址图层列表
                    }


                }

            }, datatype: "json"
        });

    } else if (flag == "line") {
        if (drowinfoAddlayerindex == null) {
            //
            drowinfoAddlayerindex = layer.open({
                type: 1
                , title: ['线标注', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                , area: ['300px', '300px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: addLinebiaozhuhtml
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);
                    form.render();

                    form.on('submit(addpointinfosubmit)', function (data) {
                        var positList = position;

                        var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });



                        data.field.cookie = document.cookie;
                        data.field.position = JSON.stringify(position);
                        data.field.projectId = currentprojectid;
                        data.field.type = "2";
                        data.field.modleId = modleInfo.id.split('_')[1];
                        data.field.modleTime = modleInfo.title.substring(0, 10);
                        data.field.colour = pointColor;
                        console.log(data);


                        $.ajax({
                            url: servicesurl + "/api/RockData/AddRockPoint", type: "post", data: data.field,
                            success: function (result) {
                                layer.close(loadingminindex);

                                if (isNaN(result)) {
                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                } else {
                                    //关闭
                                    layer.msg("保存成功", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    ClearTemp();
                                    layer.close(drowinfoAddlayerindex);


                                    var xSum = 0;//求一个平均点，用于定位
                                    var ySum = 0;
                                    var zSum = 0;
                                    for (var m = 0; m < positList.length; m++) {
                                        xSum = xSum + parseFloat(positList[m].x);
                                        ySum = ySum + parseFloat(positList[m].y);
                                        zSum = zSum + parseFloat(positList[m].z);
                                    }


                                    var modleFlag = false;
                                    if (biaoLayers.length == 0) {
                                        LoadBiaozhunListLayer();
                                        elem.tabChange('biaozhuguanli', 4); //跳转地址图层列表
                                    } else {
                                        var xiabiao1 = 0;
                                        for (var m in biaoLayers) {
                                            if (biaoLayers[m].type == "ROCKLINEFA") {//线
                                                modleFlag = true;
                                                xiabiao1 = m;
                                            }
                                        }
                                        if (modleFlag) {
                                            var rockline = new Object;
                                            rockline.title = data.field.name;
                                            rockline.id = "ROCKLINE_" + result;
                                            rockline.type = "ROCKLINE";
                                            rockline.remarks = data.field.remarks;
                                            rockline.lineSize = data.field.lineSize;
                                            rockline.colour = pointColor;
                                            rockline.postion = position;
                                            rockline.Centerx = xSum / positList.length;
                                            rockline.Centery = ySum / positList.length;
                                            rockline.Centerz = zSum / positList.length;

                                            rockline.pointList = positList;
                                            rockline.checked = true;
                                            rockline.spread = true;
                                            rockline.showCheckbox = true;//显示复选框

                                            rockline.datas = data;
                                            biaoLayers[xiabiao1].checked = true;
                                            biaoLayers[xiabiao1].spread = true;

                                            var linetemplist = [];
                                            for (var x = 0; x < positList.length; x++) {
                                                var cartesian3 = Cesium.Cartographic.fromCartesian(positList[x]);;
                                                var xy = bl2xy(cartesian3.latitude * 180 / Math.PI, cartesian3.longitude * 180 / Math.PI, 6378137.0, 1 / 298.257223563, 3, 108, false);

                                                var xyz = {};
                                                xyz.X = (xy.x).toFixed(3);
                                                xyz.Y = (xy.y).toFixed(3);
                                                xyz.Z = (cartesian3.height + 26.30).toFixed(3);
                                                xyz.name = data.field.name;
                                                linetemplist.push(xyz);
                                                biaoLayers[xiabiao1].data.push(xyz);
                                            }
                                            rockline.data = linetemplist;

                                            biaoLayers[xiabiao1].children.push(rockline);

                                        } else {//没有，就是新增
                                            var rocklinelayer = new Object;
                                            rocklinelayer.title = "长度标注";
                                            rocklinelayer.type = "ROCKLINEFA";
                                            rocklinelayer.checked = true;
                                            rocklinelayer.spread = true;
                                            rocklinelayer.showCheckbox = true;//显示复选框
                                            var rocklinelayerchild = [];

                                            var rockline = new Object;
                                            rockline.title = data.field.name;
                                            rockline.id = "ROCKLINE_" + result;
                                            rockline.type = "ROCKLINE";
                                            rockline.remarks = data.field.remarks;
                                            rockline.lineSize = data.field.lineSize;
                                            rockline.colour = pointColor;
                                            rockline.postion = position;
                                            rockline.pointList = positList;
                                            rockline.Centerx = xSum / positList.length;
                                            rockline.Centery = ySum / positList.length;
                                            rockline.Centerz = zSum / positList.length;
                                            rockline.checked = true;
                                            rockline.spread = true;
                                            rockline.showCheckbox = true;//显示复选框
                                            var linetemplist = [];
                                            for (var x = 0; x < positList.length; x++) {
                                                var cartesian3 = Cesium.Cartographic.fromCartesian(positList[x]);;
                                                var xy = bl2xy(cartesian3.latitude * 180 / Math.PI, cartesian3.longitude * 180 / Math.PI, 6378137.0, 1 / 298.257223563, 3, 108, false);

                                                var xyz = {};
                                                xyz.X = (xy.x).toFixed(3);
                                                xyz.Y = (xy.y).toFixed(3);
                                                xyz.Z = (cartesian3.height + 26.30).toFixed(3);
                                                xyz.name = data.field.name;
                                                linetemplist.push(xyz);

                                            }
                                            rockline.data = linetemplist;
                                            rockline.datas = data.field;
                                            rocklinelayerchild.push(rockline);


                                            rocklinelayer.children = rocklinelayerchild;
                                            rocklinelayer.data = linetemplist;
                                            biaoLayers.push(rocklinelayer);

                                        }
                                        console.log(biaoLayers);
                                        tree.reload('prjbiaoZhuListid', { data: biaoLayers });
                                        elem.tabChange('biaozhuguanli', 4); //跳转地址图层列表
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

    } else if (flag == "area") {
        if (drowinfoAddlayerindex == null) {
            //
            drowinfoAddlayerindex = layer.open({
                type: 1
                , title: ['面标注', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                , area: ['300px', '300px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: addbiaozhuareaHtml
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);
                    form.render();

                    form.on('submit(addpointinfosubmit)', function (data) {
                        var positList = position;
                        data.field.cookie = document.cookie;
                        data.field.position = JSON.stringify(position);
                        data.field.projectId = currentprojectid;
                        data.field.type = "3";
                        data.field.modleId = modleInfo.id.split('_')[1];
                        data.field.modleTime = modleInfo.title.substring(0, 10);
                        data.field.colour = pointColor;
                        console.log(data);

                        var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                        $.ajax({
                            url: servicesurl + "/api/RockData/AddRockPoint", type: "post", data: data.field,
                            success: function (result) {
                                layer.close(loadingminindex);

                                if (isNaN(result)) {
                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                } else {
                                    //关闭
                                    layer.msg("保存成功", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    ClearTemp();
                                    layer.close(drowinfoAddlayerindex);

                                    var xSum = 0;//求一个平均点，用于定位
                                    var ySum = 0;
                                    var zSum = 0;
                                    for (var m = 0; m < positList.length; m++) {
                                        xSum = xSum + parseFloat(positList[m].x);
                                        ySum = ySum + parseFloat(positList[m].y);
                                        zSum = zSum + parseFloat(positList[m].z);
                                    }


                                    var modleFlag = false;
                                    if (biaoLayers.length == 0) {
                                        LoadBiaozhunListLayer();
                                        elem.tabChange('biaozhuguanli', 4); //跳转地址图层列表
                                    } else {
                                        var xiabiao1 = 0;
                                        for (var m in biaoLayers) {
                                            if (biaoLayers[m].type == "ROCKAREA") {
                                                modleFlag = true;
                                                xiabiao1 = m;
                                            }
                                        }
                                        if (modleFlag) {
                                            var rockline = new Object;
                                            rockline.title = data.field.name;
                                            rockline.id = "ROCKAREA_" + result;
                                            rockline.type = "ROCKAREA";
                                            rockline.remarks = data.field.remarks;
                                            rockline.lineType = data.field.lineType;
                                            rockline.colour = pointColor;
                                            rockline.postion = position;
                                            rockline.Centerx = xSum / positList.length;
                                            rockline.Centery = ySum / positList.length;
                                            rockline.Centerz = zSum / positList.length;

                                            rockline.pointList = positList;
                                            rockline.checked = true;
                                            rockline.spread = true;
                                            rockline.showCheckbox = true;//显示复选框

                                            rockline.datas = data;
                                            biaoLayers[xiabiao1].checked = true;
                                            biaoLayers[xiabiao1].spread = true;
                                            biaoLayers[xiabiao1].children.push(rockline);

                                        } else {//没有，就是新增
                                            var rockarealayer = new Object;
                                            rockarealayer.title = "面标注";
                                            rockarealayer.type = "ROCKAREA";
                                            rockarealayer.checked = true;
                                            rockarealayer.spread = true;
                                            rockarealayer.showCheckbox = true;//显示复选框
                                            var rockarealayerchild = [];

                                            var rockline = new Object;
                                            rockline.title = data.field.name;
                                            rockline.id = "ROCKAREA_" + result;
                                            rockline.type = "ROCKAREA";
                                            rockline.remarks = data.field.remarks;
                                            rockline.lineType = data.field.lineType;
                                            rockline.colour = pointColor;
                                            rockline.postion = position;
                                            rockline.pointList = positList;
                                            rockline.Centerx = xSum / positList.length;
                                            rockline.Centery = ySum / positList.length;
                                            rockline.Centerz = zSum / positList.length;
                                            rockline.checked = true;
                                            rockline.spread = true;
                                            rockline.showCheckbox = true;//显示复选框

                                            rockline.datas = data.field;
                                            rockarealayerchild.push(rockline);


                                            rockarealayer.children = rockarealayerchild;
                                            biaoLayers.push(rockarealayer);

                                        }
                                        console.log(biaoLayers);


                                        tree.reload('prjbiaoZhuListid', { data: biaoLayers });
                                        elem.tabChange('biaozhuguanli', 4); //跳转地址图层列表
                                    }


                                    //if (handler != undefined) {
                                    //    handler.destroy();
                                    // }

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

    }
}

//标注列表widget
var biaoLayers = [];
var moidsendhist = "";
function LoadBiaozhunListLayer() {
    if (currentprojectid == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
    }
    else {
        // if (projectbiaoZhuListlayerindex == null) {
        var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
        var data = {};
        var user = ViewBag.User;
        if (user == 'wuxiamodel') {
            user = 'wuxia';
        }
        data.cookie = document.cookie;
        data.projectId = currentprojectid;
        data.modleId = modleInfo.id.split('_')[1];
        data.user = user;
        console.log(ViewBag);
        data.type = null;
        moidsendhist = data.modleId;//把历史记录存起来
        //请求图层列表
        $.ajax({
            url: servicesurl + "/api/RockData/GetBiaozhunListInfo", type: "get", data: data,
            success: function (data) {
                layer.close(loadingceindex);
                if (data == "") {
                    layer.msg("无标注信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                }
                else {
                    var biaoZhuList = JSON.parse(data);
                    kmlList = biaoZhuList;
                    console.log(biaoZhuList);
                    biaoLayers = [];//图层列表数据



                    //监测图层（监测点、监测剖面）
                    if (biaoZhuList != null && biaoZhuList.length > 0) {
                        var pointList = [];
                        var lineList = [];
                        var noodlesList = [];
                        for (var i = 0; i < biaoZhuList.length; i++) {
                            if ("1" == biaoZhuList[i].type) {
                                pointList.push(biaoZhuList[i]);
                            } else if ("2" == biaoZhuList[i].type) {
                                lineList.push(biaoZhuList[i]);
                            } else if ("3" == biaoZhuList[i].type) {
                                noodlesList.push(biaoZhuList[i]);
                            }
                        }
                        //点
                        if (pointList != null && pointList.length > 0) {
                            var rockpointlayer = new Object;
                            rockpointlayer.title = "点标注";
                            rockpointlayer.type = "ROCKPOINTFA";
                            rockpointlayer.checked = false;
                            rockpointlayer.showCheckbox = true;//显示复选框

                            var rockpointlayerchild = [];
                            var tempList = [];
                            for (var i = 0; i < pointList.length; i++) {
                                var postion = JSON.parse(pointList[i].postion);
                                var cartesian3 = Cesium.Cartographic.fromCartesian(postion);
                                var longitude = Cesium.Math.toDegrees(cartesian3.longitude);                         //经度
                                var latitude = Cesium.Math.toDegrees(cartesian3.latitude);                           //纬度
                                var height = cartesian3.height;  
                                var temp = {};
                                temp.longitude = longitude;
                                temp.latitude = latitude;
                                temp.height = height;
                                temp.name = pointList[i].name;;

                                tempList.push(temp);

                                var rockpoint = new Object;
                                rockpoint.title = pointList[i].name;
                                rockpoint.id = "ROCKPOINT_" + pointList[i].id;
                                rockpoint.type = "ROCKPOINT";
                                rockpoint.remarks = pointList[i].remarks;
                                rockpoint.pointId = pointList[i].id;
                                rockpoint.src = "../../" + pointList[i].src;
                                rockpoint.colour = pointList[i].colour;
                                rockpoint.postion = postion;
                                rockpoint.checked = false;
                                rockpoint.showCheckbox = true;//显示复选框

                                rockpoint.datas = pointList[i];
                                rockpointlayerchild.push(rockpoint);


                            }
                            rockpointlayer.children = rockpointlayerchild;
                            rockpointlayer.datas = tempList;
                            console.log(tempList);
                            biaoLayers.push(rockpointlayer);

                        }
                        //线
                        var tempList = [];
                        if (lineList != null && lineList.length > 0) {
                            var rocklinelayer = new Object;
                            rocklinelayer.title = "线标注";
                            rocklinelayer.type = "ROCKLINEFA";
                            rocklinelayer.checked = false;
                            rocklinelayer.showCheckbox = true;//显示复选框
                            var rocklinelayerchild = [];
                            for (var i = 0; i < lineList.length; i++) {
                                var pointListtem = JSON.parse(lineList[i].postion);

                                console.log(pointListtem);
                                var xSum = 0;//求一个平均点，用于定位
                                var ySum = 0; 
                                var zSum = 0;
                                for (var m = 0; m < pointListtem.length; m++) {
                                    xSum = xSum + parseFloat(pointListtem[m].x);
                                    ySum = ySum + parseFloat(pointListtem[m].y);
                                    zSum = zSum + parseFloat(pointListtem[m].z);
                                }


                                var rockline = new Object;
                                rockline.Centerx = xSum / pointListtem.length;
                                rockline.Centery = ySum / pointListtem.length;
                                rockline.Centerz = zSum / pointListtem.length;
                                rockline.title = lineList[i].name;
                                rockline.id = "ROCKLINE_" + lineList[i].id;
                                rockline.type = "ROCKLINE";
                                rockline.remarks = lineList[i].remarks;
                                rockline.lineId = lineList[i].id;
                                rockline.pointList = pointListtem;
                                rockline.colour = lineList[i].colour;
                                rockline.lineSize = lineList[i].lineSize;
                                rockline.datas = lineList[i];
                                rockline.checked = false;
                                rockline.showCheckbox = true;//显示复选框
                                var linetemplist = [];
                                for (var x = 0; x < pointListtem.length; x++) {
                                    var cartesian3 = Cesium.Cartographic.fromCartesian(pointListtem[x]);
                                    var xy = bl2xy(cartesian3.latitude * 180 / Math.PI, cartesian3.longitude * 180 / Math.PI, 6378137.0, 1 / 298.257223563, 3, 108, false);

                                    var xyz = {};
                                    xyz.X = (xy.x).toFixed(3);
                                    xyz.Y = (xy.y).toFixed(3);
                                    xyz.Z = (cartesian3.height + 26.3).toFixed(3);
                                    xyz.name = lineList[i].name;
                                    tempList.push(xyz);
                                    linetemplist.push(xyz);
                                }
                                rockline.data = linetemplist;
                                rocklinelayerchild.push(rockline);
                                //var tempset = {};
                                //tempset.name = lineList[i].name;
                                //var remplistary = [];
                                //for (var x = 0; x < pointListtem.length; x++) {
                                //    var cartesian3 = Cesium.Cartographic.fromCartesian(pointListtem[x]); ;    
                                //    var xy = bl2xy(cartesian3.latitude * 180 / Math.PI, cartesian3.longitude * 180 / Math.PI, 6378137.0, 1 / 298.257223563, 3, 108, false);

                                //    var xyz = {};
                                //    xyz.X = (xy.x).toFixed(3);
                                //    xyz.Y = (xy.y).toFixed(3);
                                //    xyz.Z = (cartesian3.height + 26.3).toFixed(3);
                                //    xyz.name = lineList[i].name;
                                //    tempList.push(xyz);
                                //}
                                ////tempset.xyz = remplistary;
                                //tempList.push(tempset); 

                            }
                            rocklinelayer.data = tempList;
                            rocklinelayer.children = rocklinelayerchild;
                            biaoLayers.push(rocklinelayer);

                        }
                        console.log(tempList);
                        //面
                        if (noodlesList != null && noodlesList.length > 0) {
                            var rocknoodleslayer = new Object;
                            rocknoodleslayer.title = "面标注";
                            rocknoodleslayer.type = "ROCKAREA";
                            rocknoodleslayer.checked = false;
                            rocknoodleslayer.showCheckbox = true;//显示复选框
                            var rocknoodleslayerchild = [];
                            for (var i = 0; i < noodlesList.length; i++) {
                                var pointListtem = JSON.parse(noodlesList[i].postion);
                                var xSum = 0;//求一个平均点，用于定位
                                var ySum = 0;
                                var zSum = 0;
                                for (var m = 0; m < pointListtem.length; m++) {
                                    xSum = xSum + parseFloat(pointListtem[m].x);
                                    ySum = ySum + parseFloat(pointListtem[m].y);
                                    zSum = zSum + parseFloat(pointListtem[m].z);
                                }



                                var rocknoodles = new Object;
                                rocknoodles.Centerx = xSum / pointListtem.length;
                                rocknoodles.Centery = ySum / pointListtem.length;
                                rocknoodles.Centerz = zSum / pointListtem.length;
                                rocknoodles.title = noodlesList[i].name;
                                rocknoodles.id = "ROCKAREA_" + noodlesList[i].id;
                                rocknoodles.type = "ROCKAREA";
                                rocknoodles.remarks = noodlesList[i].remarks;
                                rocknoodles.noodlesId = noodlesList[i].id;
                                rocknoodles.pointList = pointListtem;
                                rocknoodles.colour = noodlesList[i].colour;
                                rocknoodles.lineType = noodlesList[i].lineType;
                                rocknoodles.datas = noodlesList[i];
                                rocknoodles.checked = false;
                                rocknoodles.showCheckbox = true;//显示复选框
                                rocknoodleslayerchild.push(rocknoodles);

                            }
                            rocknoodleslayer.children = rocknoodleslayerchild;
                            biaoLayers.push(rocknoodleslayer);

                        }
                        console.log(biaoLayers);
                    }


                    //TODO MORE LAYER

                    console.log(biaoLayers);
                    if (biaoZhulayerlistlayerindex != null) {
                        tree.render({
                            elem: '#prjbiaoZhuList'
                            , id: 'prjbiaoZhuListid'
                            , edit: ['add', 'update', 'del']
                            , showCheckbox: true
                            , customCheckbox: true
                            , showLine: false
                            , data: biaoLayers
                            , accordion: false
                            , click: function (obj) {
                                //点击事件
                                //如果选中就缩放到目标
                                //如果未选中就不做任何处理
                                var data = obj.data;
                                console.log(data);
                                if (data.checked) {
                                    if (data.children != undefined) {
                                        var entities = [];
                                        for (var i in data.children) {
                                            var entity = viewer.entities.getById(data.children[i].id)
                                            if (entity != undefined) {
                                                entities.push(entity);
                                            }
                                        }

                                        if (entities.length > 0) {
                                            viewer.zoomTo(entities);
                                        }

                                    }
                                    else {
                                        if (data.type == "ROCKAREA") {// || data.type == "YOUSHIMIAN"
                                            //viewer.zoomTo(viewer.entities.getById(data.id + "_LABEL"));
                                            console.log(data);
                                            viewer.zoomTo(viewer.entities.getById(data.id + "_LABEL"), new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-90), 0));
                                        } else {
                                            viewer.zoomTo(viewer.entities.getById(data.id), new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-90), 0))
                                        }


                                    }
                                }

                            }
                            , oncheck: function (obj) {
                                //根据选中状态在地图中添加元素
                                var checked = obj.checked;
                                var data = obj.data;

                                //TODO解决模型多选


                                if (checked) {
                                    if (data.children != undefined) {
                                        //多选
                                        if (data.type == "ROCKPOINTFA") {
                                            //全选监测点
                                            for (var i in data.children) {
                                                var entity = viewer.entities.getById(data.children[i].id);
                                                if (entity == undefined) {
                                                    //当无此元素添加
                                                    viewer.entities.add({
                                                        id: data.children[i].id,
                                                        position: data.children[i].postion,
                                                        billboard: {
                                                            image: data.children[i].src,
                                                            color: Cesium.Color.fromCssColorString(data.children[i].colour),
                                                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                            width: 24,
                                                            height: 24,
                                                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                        }
                                                    });
                                                }

                                                var entitylabel = viewer.entities.getById(data.children[i].id + "_LABEL");
                                                if (entitylabel == undefined) {
                                                    viewer.entities.add({
                                                        id: data.children[i].id + "_LABEL",
                                                        position: data.children[i].postion,
                                                        label: {
                                                            text: data.children[i].title,
                                                            font: '24px Times New Roman',
                                                            showBackground: true,
                                                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                            fillColor: Cesium.Color.fromCssColorString(data.children[i].colour),
                                                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                            pixelOffset: new Cesium.Cartesian2(0.0, -36),
                                                            eyeOffset: new Cesium.Cartesian3(0, 0, -10),
                                                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                        }
                                                    });
                                                }

                                                data.children[i].checked = true;
                                            }
                                        }
                                        else if (data.type == "ROCKLINEFA") {
                                            //全选线
                                            for (var i in data.children) {
                                                var entity = viewer.entities.getById(data.children[i].id);
                                                if (entity == undefined) {
                                                    var line = data.children[i].pointList;
                                                    var sum = 0;

                                                    for (var x = 0; x < line.length - 1; x++) {
                                                        var point1 = line[x];
                                                        var point2 = line[x + 1];

                                                        var distance = Cesium.Cartesian3.distance(point1, point2)
                                                        if (distance == NaN) {
                                                            sum = 0;
                                                            break;
                                                        }
                                                        else {
                                                            sum += distance;
                                                        }
                                                    }
                                                    console.log(data);
                                                    viewer.entities.add({
                                                        id: data.children[i].id,
                                                        polyline: {
                                                            positions: line,
                                                            width: data.children[i].lineSize,
                                                            material: Cesium.Color.fromCssColorString(data.children[i].colour),
                                                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                                color: Cesium.Color.fromCssColorString(data.children[i].colour)
                                                            }),
                                                        }
                                                    });

                                                    viewer.entities.add({
                                                        id: data.children[i].id + "_LABEL",
                                                       // position: new Cesium.Cartesian3(data.children[i].Centerx, data.children[i].Centery, data.children[i].Centerz),
                                                        position: data.children[i].pointList[0],
                                                        label: {
                                                            text: data.children[i].title + '-长度：' + sum.toFixed(2) + '米',
                                                            font: '24px Times New Roman',
                                                            showBackground: true,
                                                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                            fillColor: Cesium.Color.fromCssColorString(data.children[i].colour),
                                                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                        }

                                                    });

                                                }

                                                data.children[i].checked = true;
                                            }
                                        } else if (data.type == "ROCKAREA") {


                                            console.log(data);
                                            //点击的线
                                            //全选监测剖面
                                            for (var i in data.children) {
                                                var entity = viewer.entities.getById(data.children[i].id);
                                                if (entity == undefined) {
                                                    var points = data.children[i].pointList;
                                                    points.push(points[0]);
                                                    viewer.entities.add({
                                                        id: data.children[i].id,
                                                      
                                                        polyline: {
                                                            positions: points,
                                                            width: data.children[i].lineType,
                                                            material: Cesium.Color.fromCssColorString(data.children[i].colour),
                                                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                                color: Cesium.Color.fromCssColorString(data.children[i].colour)
                                                            }),
                                                        }

                                                    });

                                                    var areamianji = jisumianji(points);

                                                    //计算重心
                                                    viewer.entities.add({
                                                        id: data.children[i].id + "_LABEL",
                                                       // position: new Cesium.Cartesian3(data.children[i].Centerx, data.children[i].Centery, data.children[i].Centerz),
                                                        position: data.children[i].pointList[0],
                                                        label: {
                                                            text: data.children[i].title,// + '面积：' + areamianji.toFixed(2) + '平方米',
                                                            showBackground: true,
                                                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                            font: '24px Times New Roman',
                                                            fillColor: Cesium.Color.fromCssColorString(data.children[i].colour),
                                                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                            pixelOffset: new Cesium.Cartesian2(0.0, -10),
                                                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                        }
                                                    });

                                                }

                                                data.children[i].checked = true;
                                            }
                                        }


                                        data.checked = true;
                                    }
                                    else {
                                        //单选
                                        if (data.type == "ROCKPOINT") {
                                            //监测点
                                            var entity = viewer.entities.getById(data.id);
                                            if (entity == undefined) {
                                                //当无此元素添加
                                                viewer.entities.add({
                                                    id: data.id,
                                                    position: data.postion,//new Cesium.Cartesian3.fromDegrees(data.lbh.ls, data.lbh.bs, data.lbh.hs),
                                                    billboard: {
                                                        image: data.src,
                                                        color: Cesium.Color.fromCssColorString(data.colour),
                                                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                        width: 24,
                                                        height: 24,
                                                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                    }
                                                });
                                            }

                                            var entitylabel = viewer.entities.getById(data.id + "_LABEL");
                                            if (entitylabel == undefined) {
                                                viewer.entities.add({
                                                    id: data.id + "_LABEL",
                                                    position: data.postion,
                                                    label: {
                                                        text: data.title,
                                                        font: '24px Times New Roman',
                                                        showBackground: true,
                                                        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                        pixelOffset: new Cesium.Cartesian2(0.0, -36),
                                                        eyeOffset: new Cesium.Cartesian3(0, 0, -10),
                                                        fillColor: Cesium.Color.fromCssColorString(data.colour),
                                                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                    }
                                                });
                                            }

                                            data.checked = true;
                                        }
                                        else if (data.type == "ROCKLINE") {
                                            //点击的线
                                            console.log(data);
                                            var sum = 0;
                                            var entity = viewer.entities.getById(data.id);
                                            if (entity == undefined) {
                                                var line = data.pointList;
                                                for (var i = 0; i < line.length - 1; i++) {
                                                    var point1 = line[i];
                                                    var point2 = line[i + 1];

                                                    var distance = Cesium.Cartesian3.distance(point1, point2)
                                                    if (distance == NaN) {
                                                        sum = 0;
                                                        break;
                                                    }
                                                    else {
                                                        sum += distance;
                                                    }
                                                }


                                                var points = data.pointList;
                                                viewer.entities.add({
                                                    id: data.id,
                                                    polyline: {
                                                        positions: line,
                                                        width: data.lineSize,
                                                        material: Cesium.Color.fromCssColorString(data.colour),
                                                        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                            color: Cesium.Color.fromCssColorString(data.colour)
                                                        }),
                                                    }
                                                });

                                                viewer.entities.add({
                                                    id: data.id + "_LABEL",
                                                    position: data.pointList[0],
                                                    label: {
                                                        text: data.title + '-长度：' + sum.toFixed(2) + '米',
                                                        font: '24px Times New Roman',
                                                        showBackground: true,
                                                        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                        fillColor: Cesium.Color.fromCssColorString(data.colour),
                                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                        pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                    }


                                                });


                                            }

                                            data.checked = true;
                                        } else if (data.type == "ROCKAREA") {

                                            console.log(data);
                                            //点击的线
                                            var entity = viewer.entities.getById(data.id);
                                            if (entity == undefined) {
                                                var points = data.pointList;
                                                points.push(points[0]);
                                                viewer.entities.add({
                                                    id: data.id,
                                                    polyline: {
                                                        positions: points,
                                                        width: data.lineType,
                                                        material: Cesium.Color.fromCssColorString(data.colour),
                                                        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                            color: Cesium.Color.fromCssColorString(data.colour)
                                                        }),
                                                    }
                                                });



                                                data.checked = true;

                                                var areamianji = jisumianji(points);
                                                //计算重心
                                                viewer.entities.add({
                                                    id: data.id + "_LABEL",
                                                   // position: new Cesium.Cartesian3(data.Centerx, data.Centery, data.Centerz),
                                                    position: data.pointList[0],
                                                    label: {
                                                        text: data.title,// + '面积：' + areamianji.toFixed(2) + '平方米',
                                                        showBackground: true,
                                                        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                        font: '24px Times New Roman',
                                                        fillColor: Cesium.Color.fromCssColorString(data.colour),
                                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                        pixelOffset: new Cesium.Cartesian2(0.0, -10),
                                                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                    }
                                                });


                                            }

                                            data.checked = true;
                                        }
                                    }

                                }
                                else {
                                    if (data.children != undefined) {
                                        for (var i in data.children) {
                                            viewer.entities.removeById(data.children[i].id);
                                            viewer.entities.removeById(data.children[i].id + "_LABEL");
                                            data.children[i].checked = false;
                                        }

                                        data.checked = false;
                                    }
                                    else {

                                        viewer.entities.removeById(data.id);
                                        viewer.entities.removeById(data.id + "_LABEL");
                                        data.checked = false;
                                    }

                                }

                            }

                            , operate: function (obj) {
                                var type = obj.type; //得到操作类型：add、edit、del
                                var data = obj.data; //得到当前节点的数据
                                var elem = obj.elem; //得到当前节点元素

                                var id = data.id;
                                var name = data.title;
                                console.log(obj);
                                if (type === 'add') { //增加节点，查看
                                    if (data.type == "ROCKPOINT") {//
                                        if (biaoZhudrwInfox != null) {
                                            layer.close(biaoZhudrwInfox);
                                        }
                                        biaoZhudrwInfox = layer.open({
                                            type: 1
                                            , title: ['点信息查看', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                            , area: ['300px', '400px']
                                            , shade: 0
                                            , offset: 'auto'
                                            , closeBtn: 1
                                            , maxmin: true
                                            , moveOut: true
                                            , content: '<form class="layui-form" style="margin-top:5px;margin-right:25px;" lay-filter="addpointinfoform"><div class="layui-form-item" style="margin-top:15px;margin-right:5px;"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">点名称</label><div class="layui-input-block"><input type="text" name="name" lay-verify="required" autocomplete="off" readonly="readonly" class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">X</label><div class="layui-input-block"><input type="text" name="X" lay-verify="required" autocomplete="off" readonly="readonly"  class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">Y</label><div class="layui-input-block"><input type="text" name="Y" lay-verify="required" autocomplete="off" readonly="readonly"  class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">H</label><div class="layui-input-block"><input type="text" name="H" lay-verify="required" autocomplete="off" readonly="readonly"  class="layui-input" style="width:160px;"  /></div></div></div></div></div></form>'
                                            , zIndex: layer.zIndex
                                            , success: function (layero) {
                                                layer.setTop(layero);
                                                form.val("addpointinfoform", {
                                                    "name": data.title
                                                    , "X": data.postion.x.toFixed(6)
                                                    , "Y": data.postion.y.toFixed(6)
                                                    , "H": data.postion.z.toFixed(6)
                                                });


                                                //展示项目设备总览

                                            }
                                            , end: function () {

                                            }
                                        });
                                    }else if (data.type == "ROCKAREA") {//面标注
                                    console.log(data);
                                    biaoZhudrwInfox = layer.open({
                                        type: 1
                                        , title: ['面标注查看', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                        , area: '700px'
                                        , shade: 0.3
                                        , offset: '60px'
                                        , closeBtn: 1
                                        , maxmin: true
                                        , moveOut: true
                                        , content: '<form class="layui-form" style="margin-top:5px;margin-right:25px;" lay-filter="addpointinfoform"><div class="layui-form-item" style="margin-top:15px;margin-right:5px;"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">点名称</label><div class="layui-input-block"><input type="text" name="name" lay-verify="required" autocomplete="off" readonly="readonly" class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">描述</label><div class="layui-input-block"><input type="text" name="remarks" lay-verify="required" autocomplete="off" readonly="readonly"  class="layui-input" style="width:160px;"  /></div></div></div></div></div></form><div><table class="layui-hide" id="postion-view" lay-filter=postion-view"></table></div>'
                                        , zIndex: layer.zIndex
                                        , success: function (layero) {
                                            layer.setTop(layero);

                                            form.val("addpointinfoform", {
                                                "name": data.title
                                                , "remarks": data.remarks
                                            });

                                        }
                                        , end: function () {

                                        }
                                    });
                                } else if (data.type == "ROCKLINE" || data.type == "ROCKLINEFA") {//线标注
                                    console.log(data);
                                    biaoZhudrwInfox = layer.open({
                                        type: 1
                                        , title: ['线标注查看', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                        , area: '700px'
                                        , shade: 0.3
                                        , offset: '60px'
                                        , closeBtn: 1
                                        , maxmin: true
                                        , moveOut: true
                                        //, content: '<form class="layui-form" style="margin-top:5px;margin-right:25px;" lay-filter="addpointinfoform"><div class="layui-form-item" style="margin-top:15px;margin-right:5px;"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">点名称</label><div class="layui-input-block"><input type="text" name="name" lay-verify="required" autocomplete="off" readonly="readonly" class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">描述</label><div class="layui-input-block"><input type="text" name="remarks" lay-verify="required" autocomplete="off" readonly="readonly"  class="layui-input" style="width:160px;"  /></div></div></div></div></div></form><div><table class="layui-hide" id="postion-view" lay-filter=postion-view"></table></div>'
                                        , content: '<div style="height:500px;"><table class="layui-hide" id="postion-views" lay-filter=postion-view"></table></div>'
                                        , zIndex: layer.zIndex
                                        , success: function (layero) {
                                            layer.setTop(layero);


                                            //展示项目设备总览

                                        }
                                        , end: function () {

                                        }
                                    });
                                }else if (data.type == "ROCKPOINTFA") {//点标注
                                        console.log(data);
                                        biaoZhudrwInfox = layer.open({
                                            type: 1
                                            , title: ['点标注查看', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                            , area: '700px'
                                            , shade: 0.3
                                            , offset: '60px'
                                            , closeBtn: 1
                                            , maxmin: true
                                            , moveOut: true
                                            , content: '<div style="height:500px;"><table class="layui-hide" id="rockPoint-views" lay-filter=postion-view"></table>	<form class="layui-form" style="margin-top:5px;margin-right:25px;" lay-filter="dowminfoform">	 <div class="layui-form-item" style="margin-top:15px">	 <div style="position:absolute;right:15px;">	 <button type="submit" class="layui-btn" lay-submit="" lay-filter="dowminfosubmit" style="width:100px">下载</button>	</div>	</div>	</form></div>'
                                            , zIndex: layer.zIndex
                                            , success: function (layero) {
                                                layer.setTop(layero);
                                                console.log(data);
                                                form.on('submit(dowminfosubmit)', function (temp) {
                                                    console.log(data);
                                                    var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                                                    layer.close(loadingceindex);
                                                    return false;
                                                });


                                                //展示项目设备总览

                                            }
                                            , end: function () {

                                            }
                                        });
                                    }

                                    var postionviewtable = table.render({
                                        elem: '#postion-view'
                                        , id: 'postionviewid'
                                        , title: '点位信息'
                                        , skin: 'line'
                                        , even: false
                                        , page: {
                                            layout: ['prev', 'page', 'next', 'count']
                                        }
                                        , limit: 14
                                        // , initSort: { field: 'ls', type: 'asc' }
                                        , totalRow: false
                                        , cols: [[
                                            { field: 'x', title: 'X', align: "center" }
                                            , { field: 'y', title: 'Y', align: "center" }
                                            , { field: 'z', title: 'Z', align: "center" }
                                        ]]
                                        , data: []
                                    });
                                    postionviewtable.reload({ id: 'postionviewid', data: data.pointList });
                                    //总共
                                    var postionviewtables = table.render({
                                        elem: '#postion-views'
                                        , id: 'postionviewids'
                                        , title: '点位信息'
                                        , skin: 'line'
                                        , even: false
                                        , page: true
                                        , toolbar: true
                                        , totalRow: true
                                        , limit: 10
                                        // , initSort: { field: 'ls', type: 'asc' }

                                        , cols: [[
                                            { field: 'X', title: 'X', align: "center" }
                                            , { field: 'Y', title: 'Y', align: "center" }
                                            , { field: 'Z', title: 'H', align: "center" }
                                            , { field: 'name', title: '名称', align: "center" }
                                        ]]
                                        , data: []
                                    });
                                    postionviewtables.reload({ id: 'postionviewids', data: data.data });

                                    //点位信息查看
                                    var rockPointviewtables = table.render({
                                        elem: '#rockPoint-views'
                                        , id: 'rockPointviewids'
                                        , title: '点位信息'
                                        , skin: 'line'
                                        , even: false
                                        , page: true
                                        , toolbar: true
                                        , totalRow: true
                                        , limit: 10
                                        // , initSort: { field: 'ls', type: 'asc' }

                                        , cols: [[
                                            { field: 'name', title: '名称', align: "center" }
                                            , { field: 'longitude', title: '经度', align: "center" }
                                            , { field: 'latitude', title: '纬度', align: "center" }
                                            , { field: 'height', title: '高程', align: "center" }
                                        ]]
                                        , data: []
                                    });
                                    rockPointviewtables.reload({ id: 'rockPointviewids', data: data.datas });

                                    return;
                                } else if (type === 'update') { //修改节点
                                    var temptitle = data.title;
                                    biaoZhudrwInfox = layer.open({
                                        type: 1
                                        , title: ['确认修改', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                                        , area: ['300px', '300px']
                                        , shade: 0.3
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
                                                "name": data.title
                                                , "remarks": data.remarks,

                                            });

                                            form.on('submit(updpointinfosubmit)', function (temp) {
                                                data.title = temp.field.name;
                                                data.remarks = temp.field.remarks;
                                                temp.field.id = data.id.split("_")[1];//把id往后面传
                                                temp.field.cookie = document.cookie;
                                                var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                                                $.ajax({
                                                    url: servicesurl + "/api/RockData/UpdateRockPoint", type: "post", data: temp.field,
                                                    success: function (result) {
                                                        layer.close(loadingceindex);
                                                        //创建失败
                                                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                                        if ("更新成功" == result) {



                                                            for (var i in biaoLayers) {
                                                                for (var j in biaoLayers[i].children) {
                                                                    if (data.id == biaoLayers[i].children[j].id) {
                                                                        biaoLayers[i].children[j].title = temp.field.name;
                                                                        biaoLayers[i].children[j].remarks = temp.field.remarks;
                                                                        biaoLayers[i].children[j].datas.remarks = temp.field.remarks;
                                                                        biaoLayers[i].children[j].datas.name = temp.field.name;
                                                                        biaoLayers[i].children[j].spread = true;
                                                                        biaoLayers[i].spread = true;
                                                                        break;
                                                                    }
                                                                }
                                                            }
                                                            tree.reload('prjbiaoZhuListid', { data: biaoLayers });


                                                            //关闭,更改图上显示
                                                            if (data.checked) {
                                                                var entity = viewer.entities.getById(data.id + "_LABEL");
                                                                console.log(entity);
                                                                entity.label.text = entity.label.text._value.replace(temptitle, temp.field.name);

                                                            }
                                                            var entity = viewer.entities.getById(data.id);
                                                            layer.close(biaoZhudrwInfox);
                                                        }

                                                    }, datatype: "json"
                                                });
                                                return false;
                                            });

                                        }
                                        , end: function () {
                                            layer.close(biaoZhudrwInfox);
                                        }
                                    });



                                } else if (type === 'del') { //删除节点

                                    var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                                    $.ajax({
                                        url: servicesurl + "/api/RockData/DeleteRockPoint", type: "delete", data: { "id": obj.data.id.split("_")[1], "cookie": document.cookie },
                                        success: function (result) {
                                            layer.close(loadinglayerindex);
                                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                            viewer.entities.removeById(obj.data.id);
                                            viewer.entities.removeById(obj.data.id + "_LABEL");
                                            for (var i in biaoLayers) {
                                                for (var j in biaoLayers[i].children) {
                                                    if (obj.data.id == biaoLayers[i].children[j].id) {
                                                        biaoLayers[i].children[j].splice(j, 1);
                                                        break;
                                                    }
                                                }
                                            }

                                            tree.reload('prjbiaoZhuListid', { data: biaoLayers });
                                        }, datatype: "json"
                                    });



                                };
                            }
                        });

                    }

                }

            }, datatype: "json"
        });

        //}

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

var dianBiaozhuHtml =
    "	<div class='layui-tab layui-tab-brief'  style='width: 300px' lay-filter='biaozhuguanli'>								"
    + "		<ul class='layui-tab-title'>							"
    + "			<li lay-id='1' class='layui-this' style='width:15%;padding-top: 2px;'>点标注</li>						"
    + "			<li lay-id='2' style='width:40px;padding-top: 2px;'>多段线</li>						"
    + "			<li lay-id='3' style='width:20px;padding-top: 2px;'>面积</li>						"
    + "			<li lay-id='4' style='width:15%;padding-top: 2px;'>标注列表</li>						"
    + "		</ul>							"
    + "		<div class='layui-tab-content'>							"
    + "			<div class='layui-tab-item layui-show'>						"
    + "<div id='pointpic' class='divborder' onclick='getPointStyle(event)' style='margin-left: 10px;'>                         "
    //+ "	<img id='p1' src='/Resources/img/mark/p1.png' class='pointLabelStyle' />                  "
    //+ "	<img id='p2' src='/Resources/img/mark/p2.png' class='pointLabelStyle' />                  "
    //+ "	<img id='p3' src='/Resources/img/mark/p3.png' class='pointLabelStyle' />                  "
    //+ "	<img id='p4' src='/Resources/img/mark/p4.png' class='pointLabelStyle' />                  "
    //+ "	<img id='p5' src='/Resources/img/mark/p5.png' class='pointLabelStyle' />                  "
    //+ "	<img id='p6' src='/Resources/img/mark/p6.png' class='pointLabelStyle' />                  "
    //+ "	<img id='p7' src='/Resources/img/mark/p7.png' class='pointLabelStyle' />                  "
    + "	<img id='p8' src='/Resources/img/mark/p8.png' class='pointLabelStyle' />                  "
    //+ "	<img id='p9' src='/Resources/img/mark/p9.png' class='pointLabelStyle' />                  "
    //+ "	<img id='p10' src='/Resources/img/mark/p10.png' class='pointLabelStyle' />                  "
    //+ "	<img id='p11' src='/Resources/img/mark/p11.png' class='pointLabelStyle' />                  "
    + "	<img id='p12' src='/Resources/img/mark/p12.png' class='pointLabelStyle' />                  "
    + "	<img id='p13' src='/Resources/img/mark/p13.png' class='pointLabelStyle' />                  "
    + "	<img id='p14' src='/Resources/img/mark/p14.png' class='pointLabelStyle' />                  "
    + "	<img id='p15' src='/Resources/img/mark/p15.png' class='pointLabelStyle' />                  "

    + "</div>                                                                                       "
    + "			</div>						"
    + "			<div class='layui-tab-item'>						"
    + "				 <span style='margin-left: 20px;'>标注多段线</span>			"
    + "			</div>						"
    + "			<div class='layui-tab-item'>						"
    + "				 <span style='margin-left: 20px;'>标注面</span>			"
    + "			</div>						"
    + "			<div class='layui-tab-item'>						"
    + "				 <div id='prjbiaoZhuList'></div>	<form class='layui-form' style='margin-top:5px;margin-right:25px;' lay-filter='dowminfoform'>	 <div class='layui-form-item' style='margin-top:15px'>	 <div style='position:absolute;right:15px;'>	 <button type='submit' class='layui-btn' lay-submit='' lay-filter='dowminfosubmit' style='width:100px'>下载kml</button>	</div>	</div>	</form>			"
    + "			</div>						"
    + "		</div>							"
    + "		<div  class='yanseShoiw'>							"
    + "<fieldset class='layui-elem-field layui-field-title' style='margin-top: 10px;'>"
    + "  <legend>颜色选择</legend>                                          "
    + "</fieldset>                                                                    "
    + "<div style='margin-left: 30px'>                                               "
    + "  <input type='hidden' name='color' value='' id='test-all-input'>              "
    + "  <div id='test-all'></div>                                                    "
    + "</div>                                                                         "
    + "</div>                                                                         "
    + "	</div>								";
var addLinebiaozhuhtml = "<form class='layui-form' style='margin-top:5px;margin-right:25px;' lay-filter='addpointinfoform'>                                                                          "
    + "	<div class='layui-form-item' style='margin-top:15px;margin-right:5px;'><div class='layui-row'>                                                                           "
    + "		<div class='layui-col-md6'>                                                                                                                                          "
    + "			<div class='grid-demo grid-demo-bg1'>                                                                                                                            "
    + "				<label class='layui-form-label'>线名称</label>                                                                                                               "
    + "				<div class='layui-input-block'>                                                                                                                              "
    + "					<input type='text' name='name' lay-verify='required' autocomplete='off' placeholder='请输入' class='layui-input' style='width:160px;'  />                "
    + "				</div>                                                                                                                                                       "
    + "			</div>                                                                                                                                                           "
    + "		</div>                                                                                                                                                               "
    + "		<div class='layui-col-md6' style='margin-top:15px;margin-right:5px;'>                                                                                                "
    + "			<div class='grid-demo'><label class='layui-form-label'>描述</label>                                                                                              "
    + "				<div class='layui-input-block'>                                                                                                                              "
    + "					<input type='text' name='remarks' lay-verify='required' autocomplete='off' placeholder='请输入'  class='layui-input' style='width:160px;'  />            "
    + "				</div>                                                                                                                                                       "
    + "			</div>                                                                                                                                                           "
    + "		</div>                                                                                                                                                               "
    + "		<div class='layui-col-md6' style='margin-top:15px;margin-right:5px;'>                                                                                                "
    + "			<div class='grid-demo'><label class='layui-form-label'>线宽</label>                                                                                              "
    + "				<div class='layui-input-block'>                                                                                                                              "
    + "					<input type='text' name='lineSize' value='2' lay-verify='required' autocomplete='off' placeholder='请输入'  class='layui-input' style='width:160px;'  /> "
    + "				</div>                                                                                                                                                         "
    + "			</div>                                                                                                                                                             "
    + "		</div>                                                                                                                                                                 "
    + "	 </div>                                                                                                                                                                    "
    + "	</div>                                                                                                                                                                     "
    + "	<div class='layui-form-item' style='margin-top:15px'>                                                                                                                      "
    + "		<div style='position:absolute;right:15px;'>                                                                                                                            "
    + "			<button type='reset' class='layui-btn layui-btn-primary' style='width:100px'>重置</button>                                                                         "
    + "			<button type='submit' class='layui-btn' lay-submit='' lay-filter='addpointinfosubmit' style='width:100px'>提交</button>                                            "
    + "		</div>                                                                                                                                                                 "
    + "	</div>                                                                                                                                                                     "
    + "</form>                                                                                                                                                                      ";
var addbiaozhuareaHtml = "<form class='layui-form' style='margin-top:5px;margin-right:25px;' lay-filter='addpointinfoform'>                                                                 "
    + "	<div class='layui-form-item' style='margin-top:15px;margin-right:5px;'>                                                                                          "
    + "		<div class='layui-row'>                                                                                                                                      "
    + "			<div class='layui-col-md6'>                                                                                                                              "
    + "				<div class='grid-demo grid-demo-bg1'>                                                                                                                "
    + "					<label class='layui-form-label'>范围名称</label>                                                                                                 "
    + "					<div class='layui-input-block'>                                                                                                                  "
    + "						<input type='text' name='name' lay-verify='required' autocomplete='off' placeholder='请输入' class='layui-input' style='width:160px;'  />    "
    + "					</div>                                                                                                                                           "
    + "				</div>                                                                                                                                               "
    + "			</div>                                                                                                                                                   "
    + "			<div class='layui-col-md6' style='margin-top:15px;margin-right:5px;'>                                                                                    "
    + "				<div class='grid-demo'>                                                                                                                              "
    + "					<label class='layui-form-label'>描述</label>                                                                                                     "
    + "					<div class='layui-input-block'>                                                                                                                  "
    + "						<input type='text' name='remarks' lay-verify='required' autocomplete='off' placeholder='请输入'  class='layui-input' style='width:160px;'  />"
    + "					</div>                                                                                                                                           "
    + "				</div>                                                                                                                                               "
    + "			</div>                                                                                                                                                   "
    + "			<div class='layui-col-md6' style='margin-top:15px;margin-right:5px;'>                                                                                    "
    + "				<div class='grid-demo'>                                                                                                                              "
    + "					<label class='layui-form-label'>线宽</label>                                                                                                     "
    + "					<div class='layui-input-block'>                                                                                                                  "
    + "						<input  type='number'  value='2' name='lineType' lay-verify='required' autocomplete='off' placeholder='请输入'  class='layui-input' style='width:160px;'  />"
    + "					</div>                                                                                                                                           "
    + "				</div>                                                                                                                                               "
    + "			</div>                                                                                                                                                   "
    + "		</div>                                                                                                                                                       "
    + "	</div>                                                                                                                                                           "
    + "	<div class='layui-form-item' style='margin-top:15px'>                                                                                                            "
    + "		<div style='position:absolute;right:15px;'>                                                                                                                  "
    + "			<button type='reset' class='layui-btn layui-btn-primary' style='width:100px'>重置</button>                                                               "
    + "			<button type='submit' class='layui-btn' lay-submit='' lay-filter='addpointinfosubmit' style='width:100px'>提交</button>                                  "
    + "		</div>                                                                                                                                                       "
    + "	</div>                                                                                                                                                           "
    + "</form>  ";