
var addPouMianLaey = null;
var pointpos = [];
var pointLBs = [];
var tempList = [];
var HeightList = [];
var ysline = [];
var xgline = [];
var bianjieLayerInfo = null;
var zheXianTuLayer = null;
var minValuw = 0;
//打开弹出框
function openPouMianLaey() {
    if (currentprojectid == null) {
        layer.msg('请先选择项目', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    if (modleInfo == null) {
        layer.msg('请先选择模型', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    if (addPouMianLaey!=null) {
        layer.msg("已打开剖面窗口", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    addPouMianLaey = layer.open({
        type: 1
        , title: ['剖面线', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['320px', '210px']
        , shade: 0
        , offset: ['85px', '260px']
        , closeBtn: 1
        , maxmin: true
        , moveOut: true

        , content: updateSectionform
        , zIndex: layer.zIndex
        , success: function (layero) {
            //置顶
            layer.setTop(layero);
            form.render();
            form.val("updSectionform", {
                "interval": "2"
            });
            form.on('radio(radioSehngtype)', function (data) {  //radio-type为lay-filter的属性值
                console.log(data.value)
                if (data.value === "0") {
                    $("#caiYangJianGe").show();
                    form.val("updSectionform", {
                        "interval": "2"
                    });
                } else if (data.value === "1") {
                    $("#caiYangJianGe").hide();
                    form.val("updSectionform", {
                        "interval": "5"
                    });
                }
                return false;
            });
            //form.on('submit(updSectioninfosubmit)', function (temp) {
            //    console.log(temp);
            //    return false;
            //});
        }, btn: ['选点', '优化', '下载']
        , yes: function (index, layero) {
            ClearTemp();
            if (viewer.entities.getById("section123") != null) {
                viewer.entities.removeById("section123");
            }
            if (viewer.entities.getById("startPoint111") != null) {
                viewer.entities.removeById("startPoint111");
            }
            if (viewer.entities.getById("endPoint111") != null) {
                viewer.entities.removeById("endPoint111");
            }
            var data = form.val('updSectionform');
            if (handler != undefined) {
                handler.destroy();
            }

            if (data.ShengChenType == "0") {
                if (data.interval.length == 0) {
                    layer.msg('请输入采样间隔');
                    return;
                }
                var n = Number(data.interval);
                if (isNaN(n)) {//是数字的情况
                    layer.msg('采样间隔请输入数字');
                    return;
                }
               
                handler = new Cesium.ScreenSpaceEventHandler(canvas);
                viewer._container.style.cursor = "crosshair";//修改鼠标样式
                pointpos = [];
                pointLBs = [];
                //左击
                handler.setInputAction(function (leftclik) {
                    var pickedOject = scene.pick(leftclik.position);
                    if (pickedOject != undefined) {
                        var position = scene.pickPosition(leftclik.position);
                        var cartesian3 = Cesium.Cartographic.fromCartesian(position);                        //笛卡尔XYZ
                        var longitude = Cesium.Math.toDegrees(cartesian3.longitude);                         //经度
                        var latitude = Cesium.Math.toDegrees(cartesian3.latitude);
                        var hight = cartesian3.height;//高程

                        var temp = {
                            "L": longitude,
                            "B": latitude,
                            "H": hight
                        }
                        pointLBs.push(temp);
                        if (position != undefined) {
                            if (Cesium.defined(position)) {
                                pointpos.push(position);
                                if (pointpos.length == 1) {
                                    viewer.entities.add({
                                        id: "startPoint111",
                                        position: position,
                                        billboard: {
                                            image: '../../Resources/img/map/startPoint.png',
                                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                            width: 48,
                                            height: 48,
                                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                            scaleByDistance: new Cesium.NearFarScalar(200, 1, 8000, 0),
                                        }
                                    });
                                } else if (pointpos.length == 2) {
                                    viewer.entities.add({
                                        id: "endPoint111",
                                        position: position,
                                        billboard: {
                                            image: '../../Resources/img/map/endPoint.png',
                                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                            width: 48,
                                            height: 48,
                                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                            scaleByDistance: new Cesium.NearFarScalar(200, 1, 8000, 0),
                                        }
                                    });


                                    viewer._container.style.cursor = "default";//修改鼠标样式
                                    if (handler != undefined) {
                                        handler.destroy();
                                    }


                                    var startL = pointLBs[0].L;
                                    var startB = pointLBs[0].B;
                                    var startH = pointLBs[0].H;
                                    var endL = pointLBs[1].L;
                                    var endB = pointLBs[1].B;
                                    tempList = [];
                                    HeightList = [];
                                    ysline = [];
                                    xgline = [];
                                    //把起点数据存下来。
                                    //var startPostiontemp = new Cesium.Cartesian3.fromDegrees(startL, startB, pointLBs[0].H);
                                    //tempList.push(pointpos[0]);
                                    //ysline.push(pointpos[0]);
                                    //HeightList.push({ "B": startB, "L": startL, "H": startH });
                                    //求两点之间的空间距离
                                    var len = Cesium.Cartesian3.distance(pointpos[0], pointpos[1]);
                                    var LengNum = len / n;
                                    for (var i = 0; i < LengNum; i++) {
                                        var mubiaoL = startL - (startL - endL) * i / LengNum;
                                        var mubiaoB = startB - (startB - endB) * i / LengNum;
                                        var postionLB = new Cesium.Cartographic(Math.PI / 180 * mubiaoL, Math.PI / 180 * mubiaoB);
                                        var Heights = scene.sampleHeight(postionLB);
                                        if (Heights > 0) {
                                            var postiontemp = new Cesium.Cartesian3.fromDegrees(mubiaoL, mubiaoB, Heights);
                                            tempList.push(postiontemp);
                                            ysline.push(postiontemp);//原始数据，往后发送
                                            HeightList.push({ "B": mubiaoB, "L": mubiaoL, "H": Heights });//
                                        }

                                    }
                                    tempList.push(pointpos[1]);
                                    ysline.push(pointpos[1]);
                                    xgline = ysline;
                                    HeightList.push({ "B": endB, "L": endL, "H": pointLBs[1].H });
                                    console.log(HeightList);
                                    console.log(pointLBs);
                                    //ysline = tempList;//原始数据，往后发送
                                    drawZheXianTu();
                                    if (tempList.length > 0) {

                                        viewer.entities.add({
                                            id: "section123",
                                            polyline: {
                                                positions: tempList,
                                                width: 1,
                                                arcType: Cesium.ArcType.RHUMB,
                                                material: Cesium.Color.YELLOW,
                                                depthFailMaterial: Cesium.Color.YELLOW,
                                            }
                                        });

                                    } else {
                                        layer.msg('该剖面与模型不对应');
                                    }



                                }

                            }
                        }
                    } else {
                        layer.msg('请点击模型');
                        return;
                    }
                }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            } else {
                handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
                viewer._container.style.cursor = "crosshair";//修改鼠标样式
                pointpos = [];
                HeightList = [];
                xgline = [];
                ysline = [];
                //左键（开始测量）
                handler.setInputAction(function (leftclick) {
                   
                    var pickedOject = scene.pick(leftclick.position);//模型测量

                    if (pickedOject != undefined) {
                        var xyz = scene.pickPosition(leftclick.position);
                        var cartesian3 = Cesium.Cartographic.fromCartesian(xyz);                        //笛卡尔XYZ
                        var longitude = Cesium.Math.toDegrees(cartesian3.longitude);                         //经度
                        var latitude = Cesium.Math.toDegrees(cartesian3.latitude);
                        var hight = cartesian3.height;//高程

                        var temp = {
                            "L": longitude,
                            "B": latitude,
                            "H": hight
                        }
                        HeightList.push(temp);
                        if (xyz != undefined) {
                            if (pointpos.length==0) {
                                viewer.entities.add({
                                    id: "startPoint111",
                                    position: xyz,
                                    billboard: {
                                        image: '../../Resources/img/map/startPoint.png',
                                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                        width: 48,
                                        height: 48,
                                        disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                        scaleByDistance: new Cesium.NearFarScalar(200, 1, 8000, 0),
                                    }
                                });
                            } 
                            viewer.entities.add({
                                name: "plMeasue" + NewGuid(),
                                position: xyz,
                                point: {
                                    pixelSize: 8,
                                    color: Cesium.Color.YELLOW,
                                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                                }
                            });
                            
                           
                            pointpos.push(xyz);

                            if (pointpos.length > 1) {
                                var tempentity_line = viewer.entities.add({
                                    name: "plMeasue" + NewGuid(),
                                    polyline: {
                                        positions: [pointpos[pointpos.length - 2], xyz],
                                        width: 2,
                                        material: Cesium.Color.DARKORANGE,
                                        depthFailMaterial: Cesium.Color.DARKORANGE,
                                    }
                                });
                            }
                        }
                    } else {
                        layer.msg('请点击模型');
                        return;
                    }
                }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

                //右键（结束测量）
                handler.setInputAction(function (rightclik) {
                    if (viewer.entities.getById("line_temp9999") != null) {
                        viewer.entities.removeById("line_temp9999");//删除临时边线
                    }

                    if (pointpos.length < 2 ) {
                            layer.msg('请至少绘制两个点！');
                    }
                    else{
                        viewer.entities.add({
                            id:"endPoint111",
                            position: pointpos[pointpos.length-1],
                            billboard: {
                                image: '../../Resources/img/map/endPoint.png',
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                width: 48,
                                height: 48,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                scaleByDistance: new Cesium.NearFarScalar(200, 1, 8000, 0),
                            }
                        });
                        ysline = pointpos;
                        xgline = pointpos;
                        tempList = pointpos;
                        viewer._container.style.cursor = "default";//修改鼠标样式
                        ClearTemp();
                        //待会清理的时候。
                        viewer.entities.add({
                            id: "section123",
                            polyline: {
                                positions: pointpos,
                                width: 2,
                                arcType: Cesium.ArcType.RHUMB,
                                material: Cesium.Color.DARKORANGE,
                                depthFailMaterial: Cesium.Color.DARKORANGE,
                            }
                        });
                        if (handler != undefined) {
                            handler.destroy();
                        }
                        drawZheXianTu();


                    }
                }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

                //移动（操作提示）
                handler.setInputAction(function (move) {
                    var pickedOject = scene.pick(move.endPosition);//模型测量
                    

                    if (pickedOject != undefined) {
                        var position = scene.pickPosition(move.endPosition);
                        if (position != undefined) {
                            if (pointpos.length > 0) {
                                if (viewer.entities.getById("line_temp9999") != null) {
                                    viewer.entities.removeById("line_temp9999");//删除临时边线
                                }
                                //绘制多边形临时边线
                                viewer.entities.add({
                                    id: "line_temp9999",
                                    polyline: {
                                        positions: [pointpos[pointpos.length - 1], position],
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
                }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            }
            

          
            

        }
        , btn2: function (index, layero) {//修改
            if (modleInfo == null) {
                layer.msg('请先选择模型');
                return false;
            }
            if (HeightList.length == 0) {
                layer.msg('请先生成剖面线');
                return false;
            }

            //按钮【按钮二】的回调
            //话多边形
            drawbianjieL();
            return false; //开启该代码可禁止点击该按钮关闭
        }, btn3: function (index, layero) {//提交
            if (HeightList.length == 0) {
                layer.msg('请先生成剖面线');
                return false;
            }

            var tableData = [];
            for (var i = 0; i < HeightList.length; i++) {
                var sum = Cesium.Cartesian3.distance(xgline[0], xgline[i]);//两个点的距离
                var gaocha = HeightList[i].H - HeightList[0].H;//高差
                var pingju = Math.sqrt(Math.pow(sum, 2) - Math.pow(gaocha, 2));
                var pingcha = {
                    pingJu: parseFloat(pingju.toFixed(2)),
                    gaoChen: parseFloat(HeightList[i].H.toFixed(2))
                };
                tableData.push(pingcha);

            }
            console.log(tableData);
            clickDown(tableData);
            return false; //开启该代码可禁止点击该按钮关闭
        }
        , end: function () {
            layer.close(addPouMianLaey);
            pointpos = [];
            pointLBs = [];
            addPouMianLaey = null;
            
            if (viewer.entities.getById("section123") != null) {
                viewer.entities.removeById("section123");
            };
            if (viewer.entities.getById("startPoint111") != null) {
                viewer.entities.removeById("startPoint111");
            }
            if (viewer.entities.getById("endPoint111") != null) {
                viewer.entities.removeById("endPoint111");
            }
            tempList = [];
            HeightList = [];
            ysline = [];
            xgline = [];
            if (zheXianTuLayer != null) {
                layer.close(zheXianTuLayer);
                zheXianTuLayer = null;
            } 
        }
    });
}

function drawbianjieL() {
    //本面积计算方法为：将所有点转换为大地坐标BLH，然后将H赋值为最大H，再转换为空间直角坐标XYZ，取XY计算面积
    ClearTemp();
    if (handler != undefined) {
        handler.destroy();
    }

    handler = new Cesium.ScreenSpaceEventHandler(canvas);

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
                            pixelSize: 8,
                            color: Cesium.Color.BLUE,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                        },

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

            }
        } else {
            layer.msg('请点击模型');
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    //移动
    handler.setInputAction(function (move) {
        if (points.length > 0) {
            //清除多边形临时边线

            var pick = scene.pick(move.endPosition);
            if (pick != undefined) {
                var XYZ = scene.pickPosition(move.endPosition);
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
            bianjieList = [];
            for (var i = 0; i < points.length; i++) {
                var rblh = Cesium.Cartographic.fromCartesian(points[i]);
                var latitude = Cesium.Math.toDegrees(rblh.latitude);//纬度
                var longitude = Cesium.Math.toDegrees(rblh.longitude);
                bianjieList.push({ B: latitude, L: longitude });
            }
            console.log(bianjieList);
            points.push(points[0]);
            if (viewer.entities.getById("drawbianjieL123") != null) {
                viewer.entities.removeById("drawbianjieL123");
            }
            viewer.entities.add({
                id: "drawbianjieL123",
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

            bianjieLayerInfo = layer.open({
                type: 1
                , title: ['优化确认', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                , area: ['350px', '220px']
                , shade: 0
                , offset: ['300px', '260px']
                , closeBtn: 1
                , maxmin: true
                , moveOut: true

                , content: updateYouHuaform
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);
                    form.render();
                    form.on('submit(updYouHuainfosubmit)', function (temp) {
                        //console.log(temp);
                        if (temp.field.YouHuaType == "0") {//改正数
                            for (var i in HeightList) {
                                if (isPointInPolygon(HeightList[i], bianjieList)) {//改正数的情况
                                    var postiontemp = new Cesium.Cartesian3.fromDegrees(HeightList[i].L, HeightList[i].B, (parseFloat(HeightList[i].H) - parseFloat(temp.field.heightNum)));
                                    HeightList[i].H = HeightList[i].H - parseFloat(temp.field.heightNum);
                                    tempList[i] = postiontemp;
                                }
                            }
                        } else {//删除
                            var len = HeightList.length - 1;
                            console.log(len);
                            //start from the top
                            for (var i = len; i >= 0; i--) {
                                if (isPointInPolygon(HeightList[i], bianjieList)) {
                                    HeightList.splice(i, 1);
                                    tempList.splice(i, 1);
                                }
                            }
                            console.log(HeightList.length);
                        }
                        if (viewer.entities.getById("section123") != null) {
                            viewer.entities.removeById("section123");
                        }
                        xgline = tempList;//修改后的数据上传。
                        viewer.entities.add({
                            id: "section123",
                            polyline: {
                                positions: tempList,
                                width: 1,
                                arcType: Cesium.ArcType.RHUMB,
                                material: Cesium.Color.YELLOW,
                                depthFailMaterial: Cesium.Color.YELLOW
                            }
                        });
                        drawZheXianTu();//在调用一下折线图
                        layer.close(bianjieLayerInfo);
                        if (viewer.entities.getById("drawbianjieL123") != null) {
                            viewer.entities.removeById("drawbianjieL123");
                        }
                        return false;
                    });
                    form.on('radio(radio-type)', function (data) {  //radio-type为lay-filter的属性值
                        console.log(data.value)
                        if (data.value === "0") {
                            $("#radioType1").show();
                            form.val("updYouHuaform", {
                                "heightNum": "11",
                            });
                        } else if (data.value === "1") {
                            $("#radioType1").hide();
                            form.val("updYouHuaform", {
                                "heightNum": "111",
                            });
                        }
                        return false;
                    });


                }
                , end: function () {
                    bianjieLayerInfo = null;
                    if (viewer.entities.getById("drawbianjieL123") != null) {
                        viewer.entities.removeById("drawbianjieL123");
                    }
                }
            });
            ClearTemp();
            points = [];
        }

    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

};
// 是否在内，在外，一个一个点
var isPointInPolygon = function (point, pts) {
    var N = pts.length;  //pts [.B:xxx.L:xxx},.B:xxx.L:xxx}]   
    var boundOrVertex = true; //如果点位于多边形的顶点或边上，也算做点在多边形内，直接返回true   
    var intersectCount = 0;//cross points count of x   
    var precision = 2e-10; //浮点类型计算时候与0比较时候的容差  
    var p1, p2;//neighbour bound vertices
    var p = point; //point .B:xxx.L:xxx}    
    p1 = pts[0];//left vertex   
    for (var i = 1; i <= N; ++i) {//check all rays       
        if ((p.B == p1.B) && (p.L == p1.L)) {
            return boundOrVertex;//p is an vertex      
        }
        p2 = pts[i % N];//right vertex       
        if (p.B < Math.min(p1.B, p2.B) || p.B > Math.max(p1.B, p2.B)) {//ray is outside of our interests       
            p1 = p2;
            continue;//next ray left point      
        } if (p.B > Math.min(p1.B, p2.B) && p.B < Math.max(p1.B, p2.B)) {//ray is crossing over by the algorithm (common part of)   
            if (p.L <= Math.max(p1.L, p2.L)) {//x is before of ray        
                if (p1.B == p2.B && p.L >= Math.min(p1.L, p2.L)) {//overlies on a horizontal ray          
                    return boundOrVertex;
                } if (p1.L == p2.L) {//ray is vertical          
                    if (p1.L == p.L) {//overlies on a vertical ray             
                        return boundOrVertex;
                    } else {//before ray             
                        ++intersectCount;
                    }
                } else {//cross point on the left side          
                    var xinters = (p.B - p1.B) * (p2.L - p1.L) / (p2.B - p1.B) + p1.L;//cross point of.L       
                    if (Math.abs(p.L - xinters) < precision) {//overlies on a ray             
                        return boundOrVertex;
                    } if (p.L < xinters) {//before ray              
                        ++intersectCount;
                    }
                }
            }
        } else {//special case when ray is crossing through the vertex     
            if (p.B == p2.B && p.L <= p2.L) {//p crossing over p2     
                var p3 = pts[(i + 1) % N]; //next vertex        
                if (p.B >= Math.min(p1.B, p3.B) && p.B <= Math.max(p1.B, p3.B)) {//p.B lies between p1.B &amp; p3.B       
                    ++intersectCount;
                } else {
                    intersectCount += 2;
                }
            }
        }
        p1 = p2;//next ray left point  
    } if (intersectCount % 2 == 0) {//偶数在多边形外  
        return false;
    } else { //奇数在多边形内     
        return true;
    }
};

//画列表
function drawZheXianTu() {
    var gcline = [[0, HeightList[0].H]];
    var startpoint = '';
    var endpoint = '';
    minValuw = HeightList[0].H;
    for (var i = 1; i < HeightList.length; i++) {
        var sum = Cesium.Cartesian3.distance(xgline[0], xgline[i]);//两个点的距离
        var gaocha = HeightList[i].H - HeightList[0].H;//高差
        if (minValuw > HeightList[i].H) {
            minValuw = HeightList[i].H;
        }
        var pingju = Math.sqrt(Math.pow(sum, 2) - Math.pow(gaocha, 2));
        var pingcha = [];
        pingcha.push(parseFloat(pingju.toFixed(2)));
        pingcha.push(parseFloat(HeightList[i].H.toFixed(2)));
        gcline.push(pingcha);

    }
    minValuw = Math.floor(minValuw / 10) * 10;
    if (zheXianTuLayer != null) {
        console.log(gcline);
        drowPoumianxian(gcline, "");
    } else {
        zheXianTuLayer = layer.open({
            type: 1
            , title: ['剖面信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['400px', '350px']
            , shade: 0
            , offset: ['60px', '1420px']
            //, offset: 'rt'
            , closeBtn: 1
            , maxmin: true
            , moveOut: true
            , content: '<div id="pouchart" class="layui-tab-item layui-show" style="width:380px;height:250px;top:10px"></div>'
            , zIndex: layer.zIndex
            //, btn: ['修改提交']
            , yes: function (index, layero) {
                console.log(lineList);
                //console.log(moddataGaoCha);
                console.log(gclinetemp)
                var sendDate = lineList;
                sendDate.gcline = JSON.stringify(gclinetemp);
                sendDate.cookie = document.cookie;
                console.log(sendDate);
                var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                $.ajax({
                    url: servicesurl + "/api/RockSelect/AddRockSelectLine", type: "post", data: sendDate,
                    success: function (result) {
                        layer.close(loadingceindex);

                        if ("新增成功" == result || "更新成功" == result) {
                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            layer.close(zheXianTuLayer);
                        } else {
                            //创建失败
                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                        }

                    }, datatype: "json"
                });
            }
            , success: function (layero) {
                layer.setTop(layero);
                //setTimeout(() => {
                poumianlinedatachart = echarts.init(document.getElementById('pouchart'));
                drowPoumianxian(gcline, "");
                //}, 500);



                //展示项目设备总览

            }, end: function () {
                zheXianTuLayer = null;
            }
        });
    }
  
};

function drowPoumianxian(poumianx, xyz) {
    var option;
    
    var data = poumianx;

    option = {
        
        tooltip: {
            triggerOn: 'none',
            formatter: function (params) {
                return 'X: ' + params.data[0].toFixed(2) + '<br>Y: ' + params.data[1].toFixed(2);
            }
        },
        grid: {
            top: '8%',
            bottom: '12%',
        },
        xAxis: {
            min: 0,
            type: 'value',
            axisLine: { onZero: false }
        },
        yAxis: {
            min: minValuw,
            type: 'value',
            axisLine: { onZero: false }
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                saveAsImage: {
                    show: true,
                    pixelRatio: 1,
                    title: '保存为图片',
                    type: 'png',
                    lang: ['点击保存']
                }
            }
        },
        //dataZoom: [
        //    {
        //        type: 'slider',
        //        xAxisIndex: 0,
        //        filterMode: 'none'
        //    },
        //    {
        //        type: 'slider',
        //        yAxisIndex: 0,
        //        filterMode: 'none'
        //    },
        //    {
        //        type: 'inside',
        //        xAxisIndex: 0,
        //        filterMode: 'none'
        //    },
        //    {
        //        type: 'inside',
        //        yAxisIndex: 0,
        //        filterMode: 'none'
        //    }
        //],

        series: [
            {
                id: 'a',
                type: 'line',
                //smooth: true,
                symbol: 'none',    //去掉折线上的小圆点
                data: data
            }
        ]
    };
    poumianlinedatachart.setOption(option);

};

function downLoadExcel(data, fileName) {
    //定义表头
    let str = `平距(m),高程(m)\n`;
    //增加\t为了不让表格显示科学计数法或者其他格式
    for (let i = 0; i < data.length; i++) {
        for (let item in data[i]) {
            str += `${data[i][item] + '\t'},`;
        }
        str += '\n';
    }
    //encodeURIComponent解决中文乱码
    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
    //通过创建a标签实现
    let link = document.createElement("a");
    link.href = uri;
    //对下载的文件命名
    link.download = `${fileName || '表格数据'}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
function clickDown(data) {
    this.downLoadExcel(data, '剖面数据')
}

var updateSectionform = "<form class='layui-form' style='margin-top:5px;margin-right:25px;' lay-filter='updSectionform'>                                                                         "
    + "	<div class='layui-form-item' style='margin-top:15px;margin-right:5px;'>                                                                                               "
    + "		<div class='layui-row'>                                                                                                                                           "
    + "			<div class='layui-form-item'>                                                                                         "
    + "				<div class='grid-demo'>                                                                                                                                   "
    + "					<label class='layui-form-label'>生成方式</label>                                                                                                          "
    + "					<div class='layui-input-block'>                                                                                                                       "
    + "						<input type='radio' name='ShengChenType'  lay-filter='radioSehngtype' value='0' title='自动' checked=''>           "
    + "						<input type='radio' name='ShengChenType'  lay-filter='radioSehngtype' value='1' title='手动' >           "
    + "					</div>                                                                                                                                                "
    + "				</div>                                                                                                                                                    "
    + "			</div>                                                                                                                                                        "
    + "			<div class='layui-col-md6' id='caiYangJianGe'>                                                                                                                                   "
    + "				<div class='grid-demo grid-demo-bg1'>                                                                                                                     "
    + "					<label class='layui-form-label'>采样间隔(米)</label>                                                                                                        "
    + "					<div class='layui-input-block'>                                                                                                                       "
    + "						<input type='text' name='interval'  placeholder='请输入采样间隔' lay-verify='required|number' autocomplete='off'  class='layui-input' style='width:160px;'  />          "
    + "					</div>                                                                                                                                                "
    + "				</div>                                                                                                                                                    "
    + "			</div>                                                                                                                                                        "
    + "		</div>                                                                                                                                                               "
    + "	</div>                                                                                                                                                                   "
    //+ "<div class='layui-form-item' style='margin-top:15px'>                                                                           "
    //+ "	<div style='position:absolute;right:15px;'>                                                                                 "
    //+ "		<button type='submit' class='layui-btn' lay-submit='' lay-filter='updSectioninfosubmit' style='width:100px'>提交</button> "
    //+ "	</div>                                                                                                                        "
    //+ "</div>                                                                                                                            "

    + "</form>     ";
var updateYouHuaform = "<form class='layui-form' style='margin-top:5px;margin-right:25px;' lay-filter='updYouHuaform'>                                                                         "
    + "	<div class='layui-form-item' style='margin-top:15px;margin-right:5px;'>                                                                                               "
    + "		<div class='layui-row'>                                                                                                                                           "
    + "			<div class='layui-form-item'>                                                                                         "
    + "				<div class='grid-demo'>                                                                                                                                   "
    + "					<label class='layui-form-label'>优化方式</label>                                                                                                          "
    + "					<div class='layui-input-block'>                                                                                                                       "
    + "						<input type='radio' name='YouHuaType'  lay-filter='radio-type' value='0' title='改正数' checked=''>           "
    + "						<input type='radio' name='YouHuaType'  lay-filter='radio-type' value='1' title='删除' >           "
    + "					</div>                                                                                                                                                "
    + "				</div>                                                                                                                                                    "
    + "			</div>                                                                                                                                                        "
    + "			<div class='layui-col-md6' id='radioType1' style='margin-top:15px; margin-right:5px;'>                                                                                         "
    + "				<div class='grid-demo'>                                                                                                                                   "
    + "					<label class='layui-form-label'>改正数</label>                                                                                                          "
    + "					<div class='layui-input-block'>                                                                                                                       "
    + "						<input type='text' name='heightNum' lay-verify='number' autocomplete='off'   class='layui-input' style='width:160px;'  />           "
    + "					</div>                                                                                                                                                "
    + "				</div>                                                                                                                                                    "
    + "			</div>                                                                                                                                                        "
    + "		</div>                                                                                                                                                               "
    + "	</div>                                                                                                                                                                   "
    + "<div class='layui-form-item' style='margin-top:15px'>                                                                           "
    + "	<div style='position:absolute;right:15px;'>                                                                                 "
    + "		<button type='submit' class='layui-btn' lay-submit='' lay-filter='updYouHuainfosubmit' style='width:100px'>确认</button> "
    + "	</div>                                                                                                                        "
    + "</div>                                                                                                                            "
    + "</form>     ";