// 测窗数据转移
//$.ajax({
//    url: servicesurl + "/api/FlzWindowInfo/GetXiaoLuoWindowInfoList", type: "get",
//    success: function (data) {
//        var xjxzqdata = JSON.parse(data);
//        console.log(xjxzqdata);
//        for (var i in xjxzqdata) {
//            var xxx = JSON.parse(xjxzqdata[i]);
//            for (var j in xxx) {
//                if (xxx[j].name.split('-')[1] == 2) {
//                    console.log(xxx[j]);
//                    var BLHList = xxx[j].position.slice(0, 4);
//                    var positList = [];
//                    for (var m in BLHList) {
//                        positList.push(new Cesium.Cartesian3.fromDegrees(BLHList[m].L, BLHList[m].B, BLHList[m].H));
//                    }

//                    var windowInfos = xxx[j].wingdowinfo;
//                    var data = {};
//                    data.name = xxx[j].name;
//                    data.remarks = xxx[j].name + '-数据迁移';
//                    data.sideLength = 3;//边长1
//                    data.sidebLength = 4;//边长2  AxisX
//                    data.cookie = document.cookie;
//                    data.points = JSON.stringify(positList);//直接存吧
//                    data.projectId = 28;
//                    data.creatTime = y + '-' + (mouth < 10 ? '0' + mouth : mouth) + '-' + (d < 10 ? '0' + d : d);
//                    if (windowInfos != null) {
//                        data.axisx = JSON.stringify(windowInfos.AxisX);//x轴
//                        data.axisy = JSON.stringify(windowInfos.AxisY);//y轴   Normal Origin Vertices2D Vertices3D Vertices3D1
//                        data.normal = JSON.stringify(windowInfos);//法向量
//                        data.origin = JSON.stringify(windowInfos.Origin);//原点
//                        data.vertices2d = JSON.stringify(windowInfos.Vertices2D);//平，面
//                        data.vertices3d = JSON.stringify(windowInfos.Vertices3D);//空间执教
//                        data.vertices3dlbh = JSON.stringify(windowInfos.Vertices3D1);//大地坐标
//                    }
//                    //我算一个倾角不，倾角算出来，倾向，倾角。
//                    var tempList = [];
//                    tempList.push(positList[0]);
//                    tempList.push(positList[1]);
//                    tempList.push(positList[2]);
//                    var chanzhuang = getChanzhuang(positList);
//                    var qingXiang = parseFloat(chanzhuang.qingXiang) - 180;
//                    var qingJiao = parseFloat(chanzhuang.qingJiao) - 90;
//                    data.level = qingXiang.toFixed(2);
//                    data.vertical = qingJiao.toFixed(2);
//                    console.log(data);
//                    $.ajax({
//                        url: servicesurl + "/api/FlzWindowInfo/AddFlzWindow", type: "post", data: data,
//                        success: function (result) {
//                            if (isNaN(result)) {
//                                console.log("shibai");
//                            } else {
//                                console.log("chengong");
//                                console.log(result);
//                            }

//                        }, datatype: "json"
//                    });

//                }
//            }
//        }

//    }, datatype: "json"
//});
//var loadingjieliindex = layer.load(0, { shade: 0.1, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
//$.ajax({
//    url: servicesurl + "/api/FlzData/GetAllfoList", type: "get", data: {},
//    success: function (data) {
//        layer.close(loadingjieliindex);
//        jielitabledata = [];
//        if (data == "") {
//            //无节理信息
//            jielitableview.reload({ id: 'jielitableviewid', data: jielitabledata });
//        }
//        else {
//            var windowInfos = JSON.parse(data);
           
//            for (var i in windowInfos) {
//               // console.log(JSON.parse(windowInfos[i].postion));
//                var postionList = JSON.parse(windowInfos[i].postion);
//                var sum = 0;
//                var measure = 0;
//                var avgOpening=0
//                for (var j = 0; j < postionList.length - 1;j++) {
//                    sum = sum + Cesium.Cartesian3.distance(new Cesium.Cartesian3(postionList[j].x, postionList[j].y, postionList[j].z), new Cesium.Cartesian3(postionList[j + 1].x, postionList[j + 1].y, postionList[j + 1].z))
//                }
//                if (windowInfos[i].avgOpening == "0.0020") {//线
                    
//                    avgOpening = 0.0020;
//                    measure = sum * 0.0020;
//                } else {//面
//                    sum = sum/2;
//                    measure = parseFloat(windowInfos[i].measure);
//                    avgOpening = measure / sum;
//                }

//                var loadingjieliindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

//                var temp = {};
//                temp.id = windowInfos[i].id;
//                temp.traceLength = sum.toFixed(3);
//                temp.measure = measure.toFixed(3);
//                temp.avgOpening = avgOpening.toFixed(4);
//                $.ajax({
//                    url: servicesurl + "/api/FlzData/UpdateFlzPointJiChang", type: "post", data: temp,
//                    success: function (result) {
//                        layer.close(loadingjieliindex);
//                        //创建失败
//                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

//                        if ("更新成功" == result) {
//                            console.log(i);
//                        }

//                    }, datatype: "json"
//                });
               
                
//            }
//        }
//    }, datatype: "json"
//});


var temppoints = []; //装点的
function drowmeasurSubmit() {
    if (modleInfo == null) {
        layer.msg('请先选择模型');
        return;
    }
    if (temppoints.length==0) {
        layer.msg('请先重绘');
        return;
    }
    console.log(temppoints);
    var windowInfos = temppoints[0];
    console.log(modleInfo);
                    var positList = windowInfos.positList;
                    var data = {};
    data.name = modleInfo.title;
    data.remarks = modleInfo.title+'-测窗重绘';
                    data.sideLength = 3;//边长1
                    data.sidebLength = 4;//边长2  AxisX
                    data.cookie = document.cookie;
                    data.points = JSON.stringify(positList);//直接存吧
                    data.projectId = currentprojectid;
                    data.creatTime = y + '-' + (mouth < 10 ? '0' + mouth : mouth) + '-' + (d < 10 ? '0' + d : d);
                    if (windowInfos != null) {
                        data.axisx = JSON.stringify(windowInfos.AxisX);//x轴
                        data.axisy = JSON.stringify(windowInfos.AxisY);//y轴   Normal Origin Vertices2D Vertices3D Vertices3D1
                        data.normal = JSON.stringify(windowInfos);//法向量
                        data.origin = JSON.stringify(windowInfos.Origin);//原点
                        data.vertices2d = JSON.stringify(windowInfos.Vertices2D);//平，面
                        data.vertices3d = JSON.stringify(windowInfos.Vertices3D);//空间执教
                        data.vertices3dlbh = JSON.stringify(windowInfos.Vertices3D1);//大地坐标
                    }
                    //我算一个倾角不，倾角算出来，倾向，倾角。
                    var tempList = [];
                    tempList.push(positList[0]);
                    tempList.push(positList[1]);
                    tempList.push(positList[2]);
                    var chanzhuang = getChanzhuang(positList);
                    var qingXiang = parseFloat(chanzhuang.qingXiang) - 180;
                    var qingJiao = parseFloat(chanzhuang.qingJiao) - 90;
                    data.level = qingXiang.toFixed(2);
                    data.vertical = qingJiao.toFixed(2);
                    console.log(data);

                   
                    $.ajax({
                        url: servicesurl + "/api/FlzWindowInfo/AddFlzWindow", type: "post", data: data,
                        success: function (result) {
                            if (isNaN(result)) {
                                console.log("shibai");
                            } else {
                                console.log("chengong");
                                console.log(result);
                            }

                        }, datatype: "json"
                    });
   
}
//画测窗
function drowmeasurWindow() {
    if (modleInfo == null) {
        layer.msg('请先选择模型');
        return;
    }
    if (handler != undefined) {
        handler.destroy();
    }
    temppoints = [];
    ClearTemp();
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
                            pixelSize: 1,
                            color: Cesium.Color.YELLOW,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                        }
                    });

                    //var sideLength = 1.8;
                    var tempx = new Cesium.Cartesian2(leftclik.position.x + 1, leftclik.position.y);
                    var tempx1 = new Cesium.Cartesian2(leftclik.position.x, leftclik.position.y + 1);
                    var tempy = new Cesium.Cartesian2(leftclik.position.x, leftclik.position.y);


                    var biliciy = Cesium.Cartesian3.distance(scene.pickPosition(tempy), scene.pickPosition(tempx1));

                    var bilicixx = Math.sqrt((scene.pickPosition(tempy).x - scene.pickPosition(tempx).x) * (scene.pickPosition(tempy).x - scene.pickPosition(tempx).x) + (scene.pickPosition(tempy).y - scene.pickPosition(tempx).y) * (scene.pickPosition(tempy).y - scene.pickPosition(tempx).y));


                    var canshu1 = 1.5 / biliciy;
                    var canshu2 = 2 / bilicixx;

                    var fangxiang = new Cesium.Cartesian2(leftclik.position.x - 100, leftclik.position.y);

                    //绘制多边形临时边线
                    //viewer.entities.add({

                    //    name: "ptMeasue" + NewGuid(),
                    //    polyline: {
                    //        positions: trem,
                    //        width: 1,
                    //        arcType: Cesium.ArcType.RHUMB,
                    //        material: Cesium.Color.YELLOW,
                    //        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                    //            color: Cesium.Color.YELLOW,
                    //        }),
                    //    }
                    //});

                    var eyepostion = new Cesium.Cartesian3(viewer.camera.position.x, viewer.camera.position.y, viewer.camera.position.z);

                    //var tremlist = [];
                    // tremlist.push(eyepostion);
                    //视野点四下

                    //linepoints = trem;
                    //// 眼睛点
                    //eyespoints = eyepostion;
                    //points = trem;

                    //var distancev = Cesium.Cartesian3.distance(cartesian3a, cartesian3b);
                    //if (distancev > 10) {
                    //    layer.msg('选择的点形成的测区超过了模型范围，请重新选择！');
                    //    return;
                    //}
                    //绘制多边形临时边线
                    // points.push(points[0]);
                    var jimiList = [];
                    jimiList.push(scene.pickPosition(fangxiang));
                    for (var x = 0; x < 11; x++) {
                        for (var m = 0; m < 11; m++) {

                            var temp = new Cesium.Cartesian2(leftclik.position.x - canshu2 + 0.2 * canshu2 * x, leftclik.position.y - canshu1 + 0.2 * canshu1 * m);//b点，加了5.

                            jimiList.push(scene.pickPosition(temp));
                        }
                    }

                    ////绘制多边形临时边线
                    //viewer.entities.add({

                    //    name: "ptMeasue" + NewGuid(),
                    //    polyline: {
                    //        positions: jimiList,
                    //        width: 0.5,
                    //        arcType: Cesium.ArcType.RHUMB,
                    //        material: Cesium.Color.YELLOW,
                    //        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                    //            color: Cesium.Color.YELLOW,
                    //        }),
                    //    }
                    //});

                    var sendDate = {};


                    sendDate.target = JSON.stringify(position);
                    sendDate.eye = JSON.stringify(eyepostion);
                    sendDate.sps = JSON.stringify(jimiList);
                    sendDate.w = 4;
                    sendDate.h = 3;
                    sendDate.cookie = document.cookie;
                    var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                    $.ajax({
                        url: servicesurl + "/api/FlzWindowInfo/getRockWindowInfo", type: "post", data: sendDate,//后台发送请求
                        success: function (result) {


                            layer.close(loadingceindex);
                            //关闭
                            var windowInfos = JSON.parse(result);
                            console.log(windowInfos);
                            if (windowInfos == null) {
                                layer.close(drowinfoAddlayerindex);
                                layer.msg("调用接口计算失败，请重新选择位置，所选的点不能形成平面", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });


                                if (handler != undefined) {
                                    handler.destroy();
                                }

                                isRedo = true;
                                points = [];
                                linepoints = [];
                                return false;
                            }
                            if (windowInfos == "") {
                                layer.msg("调用接口结算失败，请稍后再试", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            } else {
                                var BLHList = windowInfos.Vertices3D1;
                                BLHList.push(BLHList[0]);
                                var positList = [];

                                for (var i in BLHList) {
                                    //经纬度，现在的坐标，转换三维。
                                    positList.push(new Cesium.Cartesian3.fromDegrees(BLHList[i].L, BLHList[i].B, BLHList[i].H));

                                }
                                windowInfos.positList = positList;
                                temppoints.push(windowInfos);
                                //console.log(positList);
                                //console.log(windowInfos.Vertices3D);
                                //var dList3 = windowInfos.Vertices3D;
                                //var dList3temp = [];
                                //for (var j in dList3) {
                                //    dList3temp.push(new Cesium.Cartesian3(dList3[j].X, dList3[j].Y, dList3[j].Z));
                                //}
                                //console.log(dList3temp);
                                //绘制多边形临时边线
                                //viewer.entities.add({

                                //    name: "ptMeasue" + NewGuid(),
                                //    polyline: {
                                //        positions: dList3temp,
                                //        width: 1,
                                //        arcType: Cesium.ArcType.RHUMB,
                                //        material: Cesium.Color.BLUE,
                                //        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                //            color: Cesium.Color.BLUE,
                                //        }),
                                //    }
                                //});
                                //绘制多边形临时边线

                                viewer.entities.add({

                                    name: "ptMeasue" + NewGuid(),
                                    polyline: {
                                        positions: positList,
                                        width: 1,
                                        arcType: Cesium.ArcType.RHUMB,
                                        material: new Cesium.PolylineDashMaterialProperty({
                                            color: Cesium.Color.YELLOW,
                                        }),
                                        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                            color: Cesium.Color.YELLOW,
                                        }),
                                    }
                                });

                                if (handler != undefined) {
                                    handler.destroy();
                                }


                                //data.field.cookie = document.cookie;
                                //data.field.points = JSON.stringify(positList);//直接存吧
                                //data.field.projectId = currentprojectid;
                                //data.field.creatTime = y + '-' + (mouth < 10 ? '0' + mouth : mouth) + '-' + (d < 10 ? '0' + d : d);

                                //data.field.axisx = JSON.stringify(windowInfos.AxisX);//x轴
                                //data.field.axisy = JSON.stringify(windowInfos.AxisY);//y轴   Normal Origin Vertices2D Vertices3D Vertices3D1
                                //data.field.normal = JSON.stringify(windowInfos.Normal);//法向量
                                //data.field.origin = JSON.stringify(windowInfos.Origin);//原点
                                //data.field.vertices2d = JSON.stringify(windowInfos.Vertices2D);//平，面
                                //data.field.vertices3d = JSON.stringify(windowInfos.Vertices3D);//空间执教
                                //data.field.vertices3dlbh = JSON.stringify(windowInfos.Vertices3D1);//大地坐标
                                ////我算一个倾角不，倾角算出来，倾向，倾角。
                                //var tempList = [];
                                //tempList.push(positList[0]);
                                //tempList.push(positList[1]);
                                //tempList.push(positList[2]);
                                //var chanzhuang = getChanzhuang(positList);
                                //var qingXiang = parseFloat(chanzhuang.qingXiang) - 180;
                                //var qingJiao = parseFloat(chanzhuang.qingJiao) - 90;
                                //data.field.level = qingXiang.toFixed(2);
                                //data.field.vertical = qingJiao.toFixed(2);
                                //data.field.height = maxHeihts.toFixed(2);

                            }

                        }, datatype: "json"
                    });
                    //viewer.entities.add({
                    //    name: "ptMeasue" + NewGuid(),
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
                    //if (Cesium.defined(position)) {

                    //    DrowHuaHua('newwindow', points, 'guding');

                    //}

                }
            }
        } else {
            layer.msg('请点击模型');
            return;
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

};