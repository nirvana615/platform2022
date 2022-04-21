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


