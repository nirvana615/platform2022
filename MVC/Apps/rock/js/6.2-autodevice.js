
var profileInfo = '';
//查看点信息
var drwInfox = null;
var bianjieList = [];
var tempList = [];
var HeightList = [];
var bianjieLayerInfo = null;
//剖面线参数
var ysline = [];
var xgline = [];
var gcline = [];
var poumianlinedatachart = null;                       //图表
var moddataGaoCha = [];
function DrwInfo(data,flag) {
   
    console.log(data);
    if (flag == "view") {
        if (data.data.type == "PROFILE" ||  data.data.type == "PROBESLOT" || data.data.type == "DRILLHOLE") {//查看剖面
            if (drwInfox != null) {
                layer.close(drwInfox);
            } 
            setTimeout(() => {
                drwInfox = layer.open({
                    type: 1
                    , title: ['信息查看', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                    , area: ['300px', '400px']
                    , shade: 0
                    , offset: 'auto'
                    , closeBtn: 1
                    , maxmin: true
                    , moveOut: true
                    , content: seeprofileform
                    , zIndex: layer.zIndex
                    , success: function (layero) {
                        layer.setTop(layero);

                        form.val("seeprofileform", {
                            "name": data.data.title
                            , "code": data.data.data.code
                            , "type": data.data.data.type
                            , "remark": data.data.remark
                        });


                        //展示项目设备总览

                    }, end: function () {
                        drwInfox = null;
                    }
                });
            }, 500);
               
            
           
        } else if ( data.data.type == "MENSURE" ) {//查看测窗
            if (drwInfox != null) {
                layer.close(drwInfox);
            }
            var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
           
                    setTimeout(() => {
                        drwInfox = layer.open({
                            type: 1
                            , title: ['信息查看', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                            , area: ['300px', '400px']
                            , shade: 0
                            , offset: ['85px', '260px']
                            , closeBtn: 1
                            , maxmin: true
                            , moveOut: true
                            , content: seeprofileform
                            , zIndex: layer.zIndex
                            , btn: ['生成']
                            , yes: function (index, layero) {
                                console.log(data.data.data.wingdowinfo);
                                console.log(data.data.data.wingdowinfo == undefined);
                                if (data.data.data.wingdowinfo == undefined || data.data.data.wingdowinfo == "") {
                                    layer.msg("请重新生成测窗", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    return;
                                }
                                var temx = {};
                                temx.WindowInfo = JSON.stringify(data.data.data.wingdowinfo);
                                var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                                $.ajax({
                                    url: servicesurl + "/api/RockDesign/GethangLine", type: "get", data: temx,
                                    success: function (result) {
                                        layer.close(loadingceindex);
                                        console.log(result);
                                        if (result.length > 0) {
                                            var lineList = JSON.parse(result);
                                            var pointsLin = [];
                                            var heightList = [];
                                            for (var i in lineList) {
                                                var temop = new Cesium.Cartesian3(lineList[i].x, lineList[i].y, lineList[i].z);
                                                var cartesian3 = Cesium.Cartographic.fromCartesian(temop);                        //笛卡尔XYZ、
                                                var height = cartesian3.height;                                                      //高度
                                                pointsLin.push(temop);
                                                heightList.push(height + 31.8);
                                            }
                                            console.log(heightList);
                                            viewer.entities.add({
                                                name: "plMeasue" + NewGuidCL(),
                                                polyline: {
                                                    positions: pointsLin,
                                                    width: 2,
                                                    material: Cesium.Color.BLUE,
                                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                        color: Cesium.Color.BLUE,
                                                    }),
                                                }
                                            });
                                        } else {
                                            //创建失败
                                            layer.msg("创建失败", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        }

                                    }, datatype: "json"
                                });

                            }
                            , success: function (layero) {
                                layer.setTop(layero);

                                form.val("seeprofileform", {
                                    "name": data.data.title
                                    , "code": data.data.data.code
                                    , "type": data.data.data.type
                                    , "remark": data.data.remark
                                });


                                //展示项目设备总览

                            }, cancel: function () {
                                drwInfox = null;
                                if (curtileset != null && modleInfo.id == '') {
                                    viewer.scene.primitives.remove(curtileset);
                                    viewer.scene.primitives.remove(curtileset);
                                    curtileset = null;
                                    modleInfo = null;
                                }
                            }
                            , end: function () {
                               // drwInfox = null;
                            }
                        });
                    }, 100);
            //        layer.close(loadingceindex);
            //    }, datatype: "json"
            //});
            
        } else if (data.data.type == "SECTION") {//剖面信息查看
            if (drwInfox != null) {
                layer.close(drwInfox);
            }
            var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
            $.ajax({
                url: servicesurl + "/api/RockSelect/GetPouMianXian", type: "get", data: { id: data.data.id },
                success: function (result) {
                    layer.close(loadingceindex);
                    console.log(result);
                    if (result.length > 0) {
                        var lineList = JSON.parse(result); 
                        var gclinetemp = JSON.parse(lineList.gcline); 
                        console.log(lineList)
                        console.log(gclinetemp)
                        setTimeout(() => {
                            drwInfox = layer.open({
                                type: 1
                                , title: ['信息查看', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                , area: ['800px', '700px']
                                , shade: 0
                                , offset:'auto'
                                , closeBtn: 1
                                , maxmin: true
                                , moveOut: true
                                , content: '<div id="pouchart" class="layui-tab-item layui-show" style="width:790px;height:540px;top:40px"></div>'
                                , zIndex: layer.zIndex
                                , btn: ['修改提交']
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
                                                layer.close(drwInfox);
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
                                    drowPoumianxian(gclinetemp, lineList.pmmc);
                                    //}, 500);
                                    


                                    //展示项目设备总览

                                }, end: function () {
                                    drwInfox = null;
                                }
                            });
                        }, 500);
                    } else {
                        //创建失败
                        layer.msg("请先生成剖面信息", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        
                    }

                }, datatype: "json"
            });

        } 

       
    } else if (flag == "update") {
        if (data.data.type == "ROCKWINDOW") {//测窗
            var temptitle = data.data.title;
            if (drwInfox != null) {
                layer.close(drwInfox);
            }
            setTimeout(() => {
                drwInfox = layer.open({
                    type: 1
                    , title: ['确认修改', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                    , area: ['300px', '300px']
                    , shade: 0
                    , offset: 'auto'
                    , closeBtn: 1
                    , maxmin: true
                    , moveOut: true
                    //, content: '/Apps/flz/widget/addinfoPoint.html'
                    , content: '<form class="layui-form" style="margin-top:5px;margin-right:25px;" lay-filter="addpointinfoform"><div class="layui-form-item" style="margin-top:15px;margin-right:5px;"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">名称</label><div class="layui-input-block"><input type="text" name="name" lay-verify="required" autocomplete="off" placeholder="请输入" class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">描述</label><div class="layui-input-block"><input type="text" name="remarks" lay-verify="required" autocomplete="off" placeholder="请输入"  class="layui-input" style="width:160px;"  /></div></div></div></div></div><div class="layui-form-item" style="margin-top:15px"><div style="position:absolute;right:15px;"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="addpointinfosubmit" style="width:100px">提交</button></div></div></form>'
                    , zIndex: layer.zIndex
                    , success: function (layero) {
                        //置顶
                        layer.setTop(layero);
                        form.render();
                        form.val("addpointinfoform", {
                            "name": data.data.title
                            , "remarks": data.data.datas.remarks
                        });

                        form.on('submit(addpointinfosubmit)', function (temp) {
                            data.data.title = temp.field.name;
                            data.data.remarks = temp.field.remarks;
                            //tree.reload(data.data.id, { data: data.data });

                            temp.field.id = data.data.id.split("_")[1];//把id往后面传
                            temp.field.cookie = document.cookie;
                            console.log(layers);
                            $.ajax({
                                url: servicesurl + "/api/FlzWindowInfo/UpdateFlzWindow", type: "post", data: temp.field,
                                success: function (result) {
                                    //创建失败
                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                    if ("更新成功" == result) {
                                        for (var i in layers[0].children) {
                                            if (data.data.id == layers[0].children[i].id) {
                                                layers[0].children[i].title = temp.field.name;
                                                layers[0].children[i].remarks = temp.field.remarks;
                                                layers[0].spread = true;
                                                layers[0].children[i].spread = true;
                                                break;
                                            }

                                        }

                                        tree.reload('prjlayerlistid', { data: layers });
                                        //关闭,更改图上显示
                                        if (data.data.checked) {
                                            var entity = viewer.entities.getById(data.data.id + "_LABEL");
                                            console.log(entity);
                                            entity.label.text = entity.label.text._value.replace(temptitle, temp.field.name);
                                        }
                                        var entity = viewer.entities.getById(data.id);
                                        layer.close(drwInfox);
                                    }

                                }, datatype: "json"
                            });
                            return false;
                        });

                    }
                    , end: function () {
                        layer.close(drwInfox);
                    }
                });
            }, 500);
        } else if (data.data.type == "PROJECTSUMODEL") {
            console.log(data.data);
            if (data.data.checked) {
                layer.confirm('是否更新该模型的最佳视角?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                    //console.log(viewer.camera.position);
                    //console.log(viewer.camera.heading);
                    //console.log(viewer.camera.pitch);
                    //console.log(viewer.camera.roll); 
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
                    console.log(home);
                    layer.close(index);

                    var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                    var data2 = {
                        mxfw: JSON.stringify(home),
                        id: data.data.id.split("_")[1]//模型id
                    }
                    $.ajax({
                        url: servicesurl + "/api/Survey/UpdateModelGoodView", type: "put", data: data2,
                        success: function (result) {
                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                            layer.close(loadingminindex);
                        }, datatype: "json"
                    });
                });
            } else {
                layer.msg("请选择该模型进行最佳视图更新", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                return;
            }

        } else if (data.data.type == "PROFILE") {//剖面
            var temptitle = data.data.title;
            console.log(data.data);
            if (drwInfox != null) {
                layer.close(drwInfox);
            }
            setTimeout(() => {
                drwInfox = layer.open({
                    type: 1
                    , title: ['剖面修改', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                    , area: ['300px', '300px']
                    , shade: 0
                    ,offset: ['85px', '260px']
                    , closeBtn: 1
                    , maxmin: true
                    , moveOut: true
       
                    , content: updateprofileform
                    , zIndex: layer.zIndex
                    , success: function (layero) {
                        //置顶
                        layer.setTop(layero);
                        form.render();
                        form.val("updprofileform", {
                            "name": data.data.title
                          , "remark": data.data.remark
                        });

                        form.on('submit(updprofileinfosubmit)', function (temp) {
                       
                            //tree.reload(data.data.id, { data: data.data });
                            // 重汇的剖面点 JSON.stringify(obj.data.title).replace(/\"/g, "") ;<p style="font-size:24px;font-weight:bold;text-align:center;">' + JSON.stringify(obj.data.title).replace(/\"/g, "") +'</p>
                            if (temppoints.length > 0) {//重绘了剖面
                                layer.confirm('<p style="font-size:16px">是否确定将' + data.data.title + '的剖面替换？</p><br/>',
                                    {
                                        title: ['消息提示', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei;background-color:#68bc80'],
                                        area: ['400px', '250px'],
                                        shade: 0.5,
                                        shadeClose: true,
                                        closeBtn: 0,
                                        resize: false,
                                        zIndex: layer.zIndex,
                                        success: function (loadlayero) {
                                            layer.setTop(loadlayero);
                                        }
                                    }, function (index) {
                                  
                                        temp.field.cookie = document.cookie;
                                        console.log(layers);
                                        layer.close(index);

                                        var cartesian3 = Cesium.Cartographic.fromCartesian(temppoints[0]);                        //笛卡尔XYZ
                                        var longitude = Cesium.Math.toDegrees(cartesian3.longitude);                         //经度
                                        var latitude = Cesium.Math.toDegrees(cartesian3.latitude);                           //纬度
                                        var height = cartesian3.height;                                                      //高度

                                        var cartesian31 = Cesium.Cartographic.fromCartesian(temppoints[1]);                        //笛卡尔XYZ
                                        var longitude1 = Cesium.Math.toDegrees(cartesian31.longitude);                         //经度
                                        var latitude1 = Cesium.Math.toDegrees(cartesian31.latitude);                           //纬度
                                        var height1 = cartesian31.height;                                                      //高度

                                        var x = 0;
                                        var y = 0;
                                        var x1 =0;
                                        var y1 = 0;
                                        if (height > height1) {//第一点高，高出，反算出高点
                                            x= (160 - height) / (height - height1) * (longitude - longitude1) + longitude; 
                                            y = (160 - height) / (height - height1) * (latitude - latitude1) + latitude; 
                                       


                                            x1 = longitude1 - (height1 - 110) / (height - height1) * (longitude - longitude1) ;
                                            y1 = latitude1 - (height1 - 110) / (height - height1) * (latitude - latitude1) ; 

                                        } else {
                                           x = (160 - height1) / (height1 - height) * (longitude1 - longitude) + longitude1;
                                           y = (160 - height1) / (height1 - height) * (latitude1 - latitude) + latitude1;

                                            x1 = longitude - (height - 110) / (height1 - height) * (longitude1 - longitude);
                                            y1 = latitude - (height - 110) / (height1 - height) * (latitude1 - latitude); 
                                   
                                        }
                                    
                                        var sendDate = {};
                                        sendDate.remark = temp.field.remark;
                                        var tempdata = data.data.data;
                                        tempdata.code = temp.field.name.replace(/'/, '’');// temp.field.code.replace(/'/, '');
                                        tempdata.name = temp.field.name.replace(/'/, '’');
                                        
                                        //用replace函数将字符串中的“; ”替换成“, ”, 代码为“a.replace(/;/, ',') ”, 然后将后的字符串重新赋值给原变量:

                                        tempdata.startPoint = { "B": y, "L": x, "H": 160 };
                                        tempdata.endPoint = { "B": y1, "L": x1, "H": 110 };
                                        sendDate.profilePostion = JSON.stringify(tempdata);
                                        sendDate.id = data.data.lineId;
                                        sendDate.name = temp.field.name.replace(/'/, '’');
                                        sendDate.cookie = document.cookie;
                                        console.log(sendDate);
                                        var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                                        $.ajax({
                                            url: servicesurl + "/api/RockDesign/UpdateRockDesignPoint", type: "post", data: sendDate,
                                            success: function (result) {
                                                layer.close(loadingceindex);
                                            
                                                if ("更新成功" == result) {
                                                    for (var i in layers) {
                                                        if (layers[i].type == "DESIGN") {
                                                            for (var j in layers[i].children) {
                                                                for (var z in layers[i].children[j].children) {
                                                                    if (layers[i].children[j].children[z].id==data.data.id) {
                                                                        layers[i].children[j].children[z].remark = temp.field.remark;
                                                                        layers[i].children[j].children[z].title = tempdata.name;
                                                                        layers[i].children[j].children[z].data = tempdata;
                                                                        layers[i].spread = true;
                                                                        layers[i].children[j].spread = true;
                                                                        layers[i].children[j].children[z].spread = true;
                                                                        layers[i].children[j].title ='剖面-'+ tempdata.name;
                                                                        layers[i].children[j].children[z].checked = true;
                                                                        for (var m in layers[i].children[j].children ) {
                                                                            if (layers[i].children[j].children[m].type=="PROBESLOT") {
                                                                                layers[i].children[j].children[m].profileinfo = tempdata;//把新数据数据放入
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    viewer.entities.removeById(data.data.id);
                                                    viewer.entities.removeById(data.data.id + "_LABEL");
                                                    modeljiazaiFlag = false;
                                                    tree.reload('prjlayerlistid', { data: layers });
                                                    //关闭,更改图上显示
                                                    //if (data.data.checked) {
                                                    //    var entity = viewer.entities.getById(data.data.id + "_LABEL");
                                                    //    console.log(entity);
                                                    //    entity.label.text = entity.label.text._value.replace(temptitle, temp.field.name);
                                                    //}
                                                   // var entity = viewer.entities.getById(data.id);
                                                    temppoints = [];
                                                    ClearTemp();
                                                    layer.close(drwInfox);
                                                } else {
                                                    //创建失败
                                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                                }

                                            }, datatype: "json"
                                        });
                                    });
                            } else {//修改了要素
                                //暂时未处理
                                var sendDate = {};
                                sendDate.remark = temp.field.remark;
                                var tempdata = data.data.data;
                                tempdata.code = temp.field.name.replace(/'/, '’');
                                tempdata.name = temp.field.name.replace(/'/, '’');

                                //用replace函数将字符串中的“; ”替换成“, ”, 代码为“a.replace(/;/, ',') ”, 然后将后的字符串重新赋值给原变量:

                                
                                
                                sendDate.id = data.data.lineId;
                                sendDate.cookie = document.cookie;
                                sendDate.profilePostion = JSON.stringify(tempdata);
                                sendDate.name = temp.field.name.replace(/'/, '’');
                                console.log(sendDate);
                                var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                                $.ajax({
                                    url: servicesurl + "/api/RockDesign/UpdateRockDesignPoint", type: "post", data: sendDate,
                                    success: function (result) {
                                        layer.close(loadingceindex);

                                        if ("更新成功" == result) {
                                            for (var i in layers) {
                                                if (layers[i].type == "DESIGN") {
                                                    for (var j in layers[i].children) {
                                                        for (var z in layers[i].children[j].children) {
                                                            if (layers[i].children[j].children[z].id == data.data.id) {
                                                                layers[i].children[j].children[z].remark = temp.field.remark;
                                                                layers[i].children[j].children[z].title = tempdata.name;
                                                                layers[i].children[j].children[z].data = tempdata;
                                                                layers[i].spread = true;
                                                                layers[i].children[j].spread = true;
                                                                layers[i].children[j].title = '剖面-' + tempdata.name;
                                                                layers[i].children[j].children[z].spread = true;
                                                                layers[i].children[j].children[z].checked = true;
                                                                for (var m in layers[i].children[j].children) {
                                                                    if (layers[i].children[j].children[m].type == "PROBESLOT") {
                                                                        layers[i].children[j].children[m].profileinfo = tempdata;//把新数据数据放入
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            viewer.entities.removeById(data.data.id);
                                            viewer.entities.removeById(data.data.id + "_LABEL");
                                            modeljiazaiFlag = false;
                                            tree.reload('prjlayerlistid', { data: layers });
                                            //关闭,更改图上显示
                                            //if (data.data.checked) {
                                            //    var entity = viewer.entities.getById(data.data.id + "_LABEL");
                                            //    console.log(entity);
                                            //    entity.label.text = entity.label.text._value.replace(temptitle, temp.field.name);
                                            //}
                                            // var entity = viewer.entities.getById(data.id);
                                            temppoints = [];
                                            ClearTemp();
                                            layer.close(drwInfox);
                                        } else {
                                            //创建失败
                                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                        }

                                    }, datatype: "json"
                                });
                            }
                        
                        

                       
                            return false;
                        });

                    }
                    , end: function () {
                        layer.close(drwInfox);
                    }
                });
            }, 500);
        } else if (data.data.type == "DRILLHOLE") {//钻孔修改
            var temptitle = data.data.title;
            if (drwInfox != null) {
                layer.close(drwInfox);
            }
            setTimeout(() => {
            drwInfox = layer.open({
                type: 1
                , title: ['钻孔修改', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                , area: ['300px', '300px']
                , shade: 0
                , offset: ['85px', '260px']
                , closeBtn: 1
                , maxmin: true
                , moveOut: true

                , content: updatedrillHoleform
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);
                    form.render();
                    form.val("upddrillHoleform", {
                        "name": data.data.title
                        , "remark": data.data.remark
                    });

                    form.on('submit(upddrillHoleinfosubmit)', function (temp) {

                        if (temppoints.length > 0) {//重绘了剖面
                            layer.confirm('<p style="font-size:16px">是否确定将' + data.data.title + '的钻孔替换？</p><br/>',
                                {
                                    title: ['消息提示', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei;background-color:#68bc80'],
                                    area: ['300px', '200px'],
                                    shade: 0.5,
                                    shadeClose: true,
                                    closeBtn: 0,
                                    resize: false,
                                    zIndex: layer.zIndex,
                                    success: function (loadlayero) {
                                        layer.setTop(loadlayero);
                                    }
                                }, function (index) {

                                    temp.field.cookie = document.cookie;
                                    console.log(layers);
                                    layer.close(index);
                                    var sendDate = {};
                                    sendDate.remark = temp.field.remark;

                                    var cartesian3 = Cesium.Cartographic.fromCartesian(temppoints[0]);                        //笛卡尔XYZ
                                    var longitude = Cesium.Math.toDegrees(cartesian3.longitude);                         //经度
                                    var latitude = Cesium.Math.toDegrees(cartesian3.latitude);                           //纬度
                                    var height = cartesian3.height;                                                      //高度

                                    var tempdata = data.data.data;
                                    tempdata.code = temp.field.code;
                                    tempdata.name = temp.field.name;
                                    tempdata.position ={ "B": latitude, "L": longitude, "H": height };
                                    sendDate.drillHolePostion = JSON.stringify(tempdata);
                                    sendDate.id = data.data.pointId;
                                    sendDate.cookie = document.cookie;
                                    var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                                    $.ajax({
                                        url: servicesurl + "/api/RockDesign/UpdateRockDesignPoint", type: "post", data: sendDate,
                                        success: function (result) {
                                            layer.close(loadingceindex);

                                            if ("更新成功" == result) {
                                                for (var i in layers) {
                                                    if (layers[i].type == "DESIGN") {
                                                        for (var j in layers[i].children) {
                                                            for (var z in layers[i].children[j].children) {
                                                                if (layers[i].children[j].children[z].id == data.data.id) {
                                                                    layers[i].children[j].children[z].remark = temp.field.remark;
                                                                    layers[i].children[j].children[z].data.position = { "B": latitude, "L": longitude, "H": height };
                                                                    layers[i].children[j].children[z].data.code = temp.field.name;
                                                                    layers[i].children[j].children[z].data.name = temp.field.name;
                                                                    layers[i].spread = true;
                                                                    layers[i].children[j].spread = true;
                                                                    layers[i].children[j].children[z].spread = true;
                                                                    layers[i].children[j].children[z].checked = true;

                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                viewer.entities.removeById(data.data.id);
                                                viewer.entities.removeById(data.data.id + "_LABEL");
                                                modeljiazaiFlag = false;
                                                tree.reload('prjlayerlistid', { data: layers });
                                                //关闭,更改图上显示
                                                //if (data.data.checked) {
                                                //    var entity = viewer.entities.getById(data.data.id + "_LABEL");
                                                //    entity.label.text = entity.label.text._value.replace(temptitle, temp.field.name);
                                                //}
                                                //var entity = viewer.entities.getById(data.id);
                                                temppoints = [];
                                                ClearTemp();
                                                layer.close(drwInfox);
                                            } else {
                                                //创建失败
                                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                            }

                                        }, datatype: "json"
                                    });
                                });
                        } else {//修改了要素
                            //暂时未处理
                            var tempdata = data.data.data;
                            tempdata.code = temp.field.name;
                            tempdata.name = temp.field.name;
                            sendDate.drillHolePostion = JSON.stringify(tempdata);
                            sendDate.id = data.data.pointId;
                            sendDate.cookie = document.cookie;
                            var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                            $.ajax({
                                url: servicesurl + "/api/RockDesign/UpdateRockDesignPoint", type: "post", data: sendDate,
                                success: function (result) {
                                    layer.close(loadingceindex);

                                    if ("更新成功" == result) {
                                        for (var i in layers) {
                                            if (layers[i].type == "DESIGN") {
                                                for (var j in layers[i].children) {
                                                    for (var z in layers[i].children[j].children) {
                                                        if (layers[i].children[j].children[z].id == data.data.id) {
                                                            layers[i].children[j].children[z].remark = temp.field.remark;
                                                            layers[i].children[j].children[z].data.code = temp.field.name;
                                                            layers[i].children[j].children[z].data.name = temp.field.name;
                                                            layers[i].spread = true;
                                                            layers[i].children[j].spread = true;
                                                            layers[i].children[j].children[z].spread = true;
                                                            layers[i].children[j].children[z].checked = true;

                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        viewer.entities.removeById(data.data.id);
                                        viewer.entities.removeById(data.data.id + "_LABEL");
                                        modeljiazaiFlag = false;
                                        tree.reload('prjlayerlistid', { data: layers });
                                        //关闭,更改图上显示
                                        //if (data.data.checked) {
                                        //    var entity = viewer.entities.getById(data.data.id + "_LABEL");
                                        //    entity.label.text = entity.label.text._value.replace(temptitle, temp.field.name);
                                        //}
                                        //var entity = viewer.entities.getById(data.id);
                                        temppoints = [];
                                        ClearTemp();
                                        layer.close(drwInfox);
                                    } else {
                                        //创建失败
                                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                    }

                                }, datatype: "json"
                            });
                        }




                        return false;
                    });

                }
                , end: function () {
                    layer.close(drwInfox);
                }
            });
            }, 500);
        } else if (data.data.type == "MENSURE") {//测窗修改

            if (drwInfox != null) {
                layer.close(drwInfox);
            }
            setTimeout(() => {
            var temptitle = data.data.title;
            drwInfox = layer.open({
                type: 1
                , title: ['测窗修改', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                , area: ['300px', '300px']
                , shade: 0
                , offset: ['85px', '260px']
                , closeBtn: 1
                , maxmin: true
                , moveOut: true

                , content: updatemeasurWindowform
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);
                    form.render();
                    form.val("updmeasurWindowform", {
                        "name": data.data.title
                        , "remark": data.data.remark
                    });

                    form.on('submit(updmeasurWindowinfosubmit)', function (temp) {

                        if (temppoints.length > 0) {//重绘了测窗
                            layer.confirm('<p style="font-size:16px">是否确定将' + data.data.title + '的测窗替换？</p><br/>',
                                {
                                    title: ['消息提示', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei;background-color:#68bc80'],
                                    area: ['300px', '200px'],
                                    shade: 0.5,
                                    shadeClose: true,
                                    closeBtn: 0,
                                    resize: false,
                                    zIndex: layer.zIndex,
                                    success: function (loadlayero) {
                                        layer.setTop(loadlayero);
                                    }
                                }, function (index) {

                                  
                                     //var sendDate = {};
                                    //sendDate.remark = temp.field.remark;

                                    //var tempdata = data.data.data;
                                    //tempdata.code = temp.field.code;
                                    //tempdata.name = temp.field.name;
                                    //tempdata.position = temppoints[0];
                                    //sendDate.measurWindowPostion = JSON.stringify(tempdata);
                                    //sendDate.id = data.data.pointId;
                                    //sendDate.cookie = document.cookie;
                                    //var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });


                                    console.log(layers);
                                    layer.close(index);



                                    var sendDate = {};


                                   
                                    var windouinfo = temppoints[0];
                                    var pointList = windouinfo.Vertices3D1;
                                    
                                    var tempdata = data.data.data;
                                    

                                    var listTemp = data.data.list;
                                    for (var j in listTemp) {
                                        if (listTemp[j].code == tempdata.code) {//等于
                                            listTemp.splice(j, 1);
                                        }
                                    }
                                    tempdata.position = pointList;
                                    tempdata.code = temp.field.name;
                                    tempdata.name = temp.field.name;
                                    tempdata.wingdowinfo = windouinfo;
                                    listTemp.push(tempdata);

                                    sendDate.measurWindowPostion = JSON.stringify(listTemp);
                                    sendDate.remark = temp.field.remark;
                                    sendDate.id = data.data.lineId;
                                    sendDate.cookie = document.cookie;
                                    console.log(sendDate);

                                  

                                    var loadingceindex = layer.load(0, {
                                        shade: 0.2,
                                        zIndex: layer.zIndex,
                                        success: function (loadlayero) { layer.setTop(loadlayero); }
                                    });

                                    $.ajax({
                                        url: servicesurl + "/api/RockDesign/UpdateRockDesignPoint", type: "post", data: sendDate,
                                        success: function (result) {
                                            layer.close(loadingceindex);

                                            if ("更新成功" == result) {
                                                for (var i in layers) {
                                                    if (layers[i].type == "DESIGN") {
                                                        for (var j in layers[i].children) {
                                                            for (var z in layers[i].children[j].children) {
                                                                if (layers[i].children[j].children[z].id == data.data.id) {
                                                                    layers[i].children[j].children[z].title = temp.field.name;
                                                                    layers[i].children[j].children[z].data.position = pointList;
                                                                    layers[i].children[j].children[z].data.name = temp.field.name;
                                                                    layers[i].children[j].children[z].data.code = temp.field.name;
                                                                    layers[i].children[j].children[z].list = listTemp;
                                                                    layers[i].spread = true;
                                                                    layers[i].children[j].spread = true;
                                                                    layers[i].children[j].children[z].spread = true;
                                                                    layers[i].children[j].children[z].checked = true;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                viewer.entities.removeById(data.data.id);
                                                viewer.entities.removeById(data.data.id + "_LABEL");
                                                modeljiazaiFlag = false;
                                                tree.reload('prjlayerlistid', { data: layers });
                                                //关闭,更改图上显示
                                                //if (data.data.checked) {
                                                //    var entity = viewer.entities.getById(data.data.id + "_LABEL");
                                                //    console.log(entity);
                                                //    entity.label.text = entity.label.text._value.replace(temptitle, temp.field.name);
                                                //}
                                                temppoints = [];
                                                ClearTemp();
                                                layer.close(drwInfox);
                                            } else {
                                                //创建失败
                                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                            }

                                        }, datatype: "json"
                                    });


                                    
                                });
                        } else {//修改了要素
                            //暂时未处理
                            var sendDate = {};
                            var tempdata = data.data.data;
                            

                            var listTemp = data.data.list;
                            for (var j in listTemp) {
                                if (listTemp[j].code == tempdata.code) {//等于
                                    listTemp.splice(j, 1);
                                }
                            }

                            tempdata.code = temp.field.name;
                            tempdata.name = temp.field.name;

                            listTemp.push(tempdata);

                            sendDate.measurWindowPostion = JSON.stringify(listTemp);
                            sendDate.remark = temp.field.remark;
                            sendDate.id = data.data.lineId;
                            sendDate.cookie = document.cookie;



                            var loadingceindex = layer.load(0, {
                                shade: 0.2,
                                zIndex: layer.zIndex,
                                success: function (loadlayero) { layer.setTop(loadlayero); }
                            });

                            $.ajax({
                                url: servicesurl + "/api/RockDesign/UpdateRockDesignPoint", type: "post", data: sendDate,
                                success: function (result) {
                                    layer.close(loadingceindex);

                                    if ("更新成功" == result) {
                                        for (var i in layers) {
                                            if (layers[i].type == "DESIGN") {
                                                for (var j in layers[i].children) {
                                                    for (var z in layers[i].children[j].children) {
                                                        if (layers[i].children[j].children[z].id == data.data.id) {
                                                            layers[i].children[j].children[z].title = temp.field.name;
                                                            layers[i].children[j].children[z].data.name = temp.field.name;
                                                            layers[i].children[j].children[z].data.code = temp.field.name;
                                                            layers[i].children[j].children[z].list = listTemp;
                                                            layers[i].spread = true;
                                                            layers[i].children[j].spread = true;
                                                            layers[i].children[j].children[z].spread = true;
                                                            layers[i].children[j].children[z].checked = true;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        viewer.entities.removeById(data.data.id);
                                        viewer.entities.removeById(data.data.id + "_LABEL");
                                        modeljiazaiFlag = false;
                                        tree.reload('prjlayerlistid', { data: layers });
                                        //关闭,更改图上显示
                                        //if (data.data.checked) {
                                        //    var entity = viewer.entities.getById(data.data.id + "_LABEL");
                                        //    console.log(entity);
                                        //    entity.label.text = entity.label.text._value.replace(temptitle, temp.field.name);
                                        //}
                                        temppoints = [];
                                        ClearTemp();
                                        layer.close(drwInfox);
                                    } else {
                                        //创建失败
                                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                    }

                                }, datatype: "json"
                            });
                        }




                        return false;
                    });

                }
                , end: function () {
                    layer.close(drwInfox);
                }
            });
        }, 500);
        } else if (data.data.type == "PROBESLOT") {//探槽修改
            var temptitle = data.data.title;
            
            profileInfo = data.data.profileinfo;
            if (drwInfox != null) {
                layer.close(drwInfox);
            }
            setTimeout(() => {
            drwInfox = layer.open({
                type: 1
                , title: ['探槽修改', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                , area: ['300px', '300px']
                , shade: 0
                , offset: ['85px', '260px']
                , closeBtn: 1
                , maxmin: true
                , moveOut: true

                , content: updateprobeSlotform
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);
                    form.render();
                    form.val("updprobeSlotform", {
                        "name": data.data.title
                        , "remark": data.data.remark
                    });

                    form.on('submit(updprobeSlotinfosubmit)', function (temp) {

                        if (temppoints.length > 0) {//重绘了探槽
                            layer.confirm('<p style="font-size:16px">是否确定将' + data.data.title + '的探槽替换？</p><br/>',
                                {
                                    title: ['消息提示', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei;background-color:#68bc80'],
                                    area: ['300px', '200px'],
                                    shade: 0.5,
                                    shadeClose: true,
                                    closeBtn: 0,
                                    resize: false,
                                    zIndex: layer.zIndex,
                                    success: function (loadlayero) {
                                        layer.setTop(loadlayero);
                                    }
                                }, function (index) {



                                    layer.close(index);



                                    var sendDate = {};

                                    
                                    var windouinfo = temppoints[0];
                                    var pointList = windouinfo.Vertices3D1;

                                    var tempdata = data.data.data;
                                    tempdata.position = pointList;
                                    tempdata.code = temp.field.name;
                                    tempdata.name = temp.field.name;
                                    tempdata.wingdowinfo = windouinfo;

                                    sendDate.probeSlotPostion = JSON.stringify(tempdata);
                                    sendDate.remark = temp.field.remark;
                                    sendDate.id = data.data.pointId;
                                    sendDate.cookie = document.cookie;
                                    var loadingceindex = layer.load(0, {
                                        shade: 0.2,
                                        zIndex: layer.zIndex,
                                        success: function (loadlayero) { layer.setTop(loadlayero); }
                                    });
                                    
                                    $.ajax({
                                        url: servicesurl + "/api/RockDesign/UpdateRockDesignPoint", type: "post", data: sendDate,
                                        success: function (result) {
                                            layer.close(loadingceindex);

                                            if ("更新成功" == result) {
                                                for (var i in layers) {
                                                    if (layers[i].type == "DESIGN") {
                                                        for (var j in layers[i].children) {
                                                            for (var z in layers[i].children[j].children) {
                                                                if (layers[i].children[j].children[z].id == data.data.id) {
                                                                    layers[i].children[j].children[z].data = tempdata;
                                                                    layers[i].children[j].children[z].remark = temp.field.remark;
                                                                    layers[i].children[j].children[z].title = temp.field.name; 
                                                                    layers[i].spread = true;
                                                                    layers[i].children[j].spread = true;
                                                                    layers[i].children[j].children[z].spread = true;
                                                                    layers[i].children[j].children[z].checked = true;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                viewer.entities.removeById(data.data.id);
                                                viewer.entities.removeById(data.data.id + "_LABEL");
                                                modeljiazaiFlag = false;
                                                tree.reload('prjlayerlistid', { data: layers });

                                                temppoints = [];
                                                ClearTemp();
                                                layer.close(drwInfox);
                                            } else {
                                                //创建失败
                                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                            }

                                        }, datatype: "json"
                                    });



                                });
                        } else {//修改了要素
                            //暂时未处理
                            var sendDate = {};

                            

                            var tempdata = data.data.data;
                            tempdata.code = temp.field.name;
                            tempdata.name = temp.field.name;

                            sendDate.probeSlotPostion = JSON.stringify(tempdata);
                            sendDate.remark = temp.field.remark;
                            sendDate.id = data.data.pointId;
                            sendDate.cookie = document.cookie;
                            var loadingceindex = layer.load(0, {
                                shade: 0.2,
                                zIndex: layer.zIndex,
                                success: function (loadlayero) { layer.setTop(loadlayero); }
                            });

                            $.ajax({
                                url: servicesurl + "/api/RockDesign/UpdateRockDesignPoint", type: "post", data: sendDate,
                                success: function (result) {
                                    layer.close(loadingceindex);

                                    if ("更新成功" == result) {
                                        for (var i in layers) {
                                            if (layers[i].type == "DESIGN") {
                                                for (var j in layers[i].children) {
                                                    for (var z in layers[i].children[j].children) {
                                                        if (layers[i].children[j].children[z].id == data.data.id) {
                                                            layers[i].children[j].children[z].data = tempdata;
                                                            layers[i].children[j].children[z].remark = temp.field.remark;
                                                            layers[i].children[j].children[z].title = temp.field.name;
                                                            layers[i].spread = true;
                                                            layers[i].children[j].spread = true;
                                                            layers[i].children[j].children[z].spread = true;
                                                            layers[i].children[j].children[z].checked = true;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        viewer.entities.removeById(data.data.id);
                                        viewer.entities.removeById(data.data.id + "_LABEL");
                                        modeljiazaiFlag = false;
                                        tree.reload('prjlayerlistid', { data: layers });

                                        temppoints = [];
                                        ClearTemp();
                                        layer.close(drwInfox);
                                    } else {
                                        //创建失败
                                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                    }

                                }, datatype: "json"
                            });
                        }




                        return false;
                    });

                }
                , end: function () {
                    layer.close(drwInfox);
                }
            });
            }, 500);
        } else if (data.data.type == "SECTION") {//剖面修改，生成剖面线。
            console.log(data);

            
            if (drwInfox != null) {
                layer.close(drwInfox);
            }
            
            setTimeout(() => {
                drwInfox = layer.open({
                    type: 1
                    , title: ['剖面线', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                    , area: ['300px', '200px']
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
                            "name": data.data.title
                        }); 
                        //form.on('submit(updSectioninfosubmit)', function (temp) {
                        //    console.log(temp);
                        //    return false;
                        //});
                    }, btn: ['生成', '优化','提交']
                    , yes: function (index, layero) {

                        if (viewer.entities.getById("section123") != null) {
                            viewer.entities.removeById("section123");
                        }
                       
                        if (modleInfo == null) {
                            layer.msg('请先选择模型');
                            return;
                        }
                        //两个点计算方位角
                        var rblh1 = data.data.children[0].data.startPoint;//第一个点
                        var rblh2 = data.data.children[0].data.endPoint;//第二个点

                        //计算方位角
                        var r = Math.atan((rblh2.L * 180 / Math.PI - rblh1.L * 180 / Math.PI) * Math.cos(rblh2.B) / (rblh2.B * 180 / Math.PI - rblh1.B * 180 / Math.PI)) * 180 / Math.PI;

                        //判断
                        if ((rblh1.B > rblh2.B) && (rblh1.L > rblh2.L)) {
                            r += 180;
                        }
                        else if ((rblh1.B > rblh2.B) && (rblh1.L == rblh2.L)) {
                            r = 180;
                        }
                        else if ((rblh1.B > rblh2.B) && (rblh1.L < rblh2.L)) {
                            r += 180;
                        }
                        else if ((rblh1.B == rblh2.B) && (rblh1.L > rblh2.L)) {
                            r = 270;
                        }
                        else if ((rblh1.B == rblh2.B) && (rblh1.L < rblh2.L)) {
                            r = 90;
                        }
                        else if ((rblh1.B < rblh2.B) && (rblh1.L > rblh2.L)) {
                            r += 360;
                        }
                        else if ((rblh1.B < rblh2.B) && (rblh1.L == rblh2.L)) {
                            r = 0;
                        }
                        else if ((rblh1.B < rblh2.B) && (rblh1.L < rblh2.L)) {
                            //r
                        }
                        console.log(data.data.children[0].data);
                        if (r>225||r<45) {//
                            var temp = data.data.children[0].data.startPoint;
                            data.data.children[0].data.startPoint = data.data.children[0].data.endPoint;
                            data.data.children[0].data.endPoint = temp;
                            console.log(1111);
                        }
                        console.log(data.data.children[0].data);
                        console.log(r);
                        setTimeout(() => {
                            var startL = data.data.children[0].data.startPoint.L;
                            var startB = data.data.children[0].data.startPoint.B;
                            var endL = data.data.children[0].data.endPoint.L;
                            var endB = data.data.children[0].data.endPoint.B;
                            tempList = [];
                            HeightList = [];
                            ysline = [];
                            xgline = [];
                            //把起点数据存下来。
                            var startPostiontemp = new Cesium.Cartesian3.fromDegrees(startL, startB, data.data.children[0].data.startPoint.H);
                            tempList.push(startPostiontemp);
                            ysline.push(startPostiontemp);
                            HeightList.push({ "B": startL, "L": startB, "H": data.data.children[0].data.startPoint.H });
                            for (var i = 0; i < 198; i++) {
                                var mubiaoL = startL - (startL - endL) * i / 197;
                                var mubiaoB = startB - (startB - endB) * i / 197;
                                var postionLB = new Cesium.Cartographic(Math.PI / 180 * mubiaoL, Math.PI / 180 * mubiaoB);
                                var Heights = viewer.scene.sampleHeight(postionLB);
                                if (Heights > 0) {
                                    var postiontemp = new Cesium.Cartesian3.fromDegrees(mubiaoL, mubiaoB, Heights);
                                    tempList.push(postiontemp);
                                    ysline.push(postiontemp);//原始数据，往后发送
                                    HeightList.push({ "B": mubiaoB, "L": mubiaoL, "H": Heights });//
                                }

                            }
                            //ysline = tempList;//原始数据，往后发送
                            if (tempList.length > 0) {

                                viewer.entities.add({
                                    id: "section123",
                                    polyline: {
                                        positions: tempList,
                                        width: 0.5,
                                        arcType: Cesium.ArcType.RHUMB,
                                        material: Cesium.Color.YELLOW,
                                        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                            color: Cesium.Color.YELLOW,
                                        }),
                                    }
                                });

                            } else {
                                layer.msg('该剖面与模型不对应');
                            }

                        }, 100);

                    }
                    , btn2: function (index, layero) {//修改
                        if (modleInfo == null) {
                            layer.msg('请先选择模型');
                            return false;
                        }
                        if (tempList.length ==0) {
                            layer.msg('请先生成剖面线');
                            return false; 
                        }

                        //按钮【按钮二】的回调
                        //话多边形
                        drawbianjieL();
                        return false; //开启该代码可禁止点击该按钮关闭
                    }, btn3: function (index, layero) {//提交
                        //按钮【按钮二】的回调
                        console.log(xgline);
                        console.log(ysline);
                        console.log(tempList); 
                        console.log(HeightList); 
                        if (ysline.length > 2) {
                            if (xgline.length==0) {
                                xgline = ysline;
                            }

                            gcline = [[0, HeightList[0].H]];
                            var startpoint = '';
                            var endpoint = '';
                           
                                for (var i = 1; i<HeightList.length; i++) {
                                    var sum = Cesium.Cartesian3.distance(xgline[0], xgline[i]);//两个点的距离
                                    var gaocha = HeightList[i].H - HeightList[0].H;//高差
                                    var pingju = Math.sqrt(Math.pow(sum, 2) - Math.pow(gaocha, 2));
                                    var pingcha = [];
                                    pingcha.push(parseFloat(pingju.toFixed(2)));
                                    pingcha.push(parseFloat(HeightList[i].H.toFixed(2)));
                                    gcline.push(pingcha);

                                }
                                endpoint = Cesium.Cartesian3.fromDegrees(data.data.children[0].data.endPoint.L, data.data.children[0].data.endPoint.B, data.data.children[0].data.endPoint.H);
                                startpoint= xgline[0];
                                
                           
                                var sendDate = {};
                                sendDate.pmmc = data.data.name;
                                sendDate.pmid = data.data.id;
                                sendDate.xmid = currentprojectid;
                                sendDate.ysline = JSON.stringify(ysline);
                                sendDate.xgline = JSON.stringify(xgline);
                                sendDate.gcline = JSON.stringify(gcline);
                                sendDate.startpoint = JSON.stringify(startpoint);
                                sendDate.endpoint = JSON.stringify(endpoint);
                                sendDate.cookie = document.cookie;
                                console.log(sendDate);
                                var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                                $.ajax({
                                    url: servicesurl + "/api/RockSelect/AddRockSelectLine", type: "post", data: sendDate,
                                    success: function (result) {
                                        layer.close(loadingceindex);

                                        if ("新增成功" == result || "更新成功" == result) {
                                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                            layer.close(drwInfox);
                                        } else {
                                            //创建失败
                                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                        }

                                    }, datatype: "json"
                               });
                        } else {
                            layer.msg('请重新生成剖面线');
                            return false;
                        }
                        return false; //开启该代码可禁止点击该按钮关闭
                    }
                    , end: function () {
                        layer.close(drwInfox);
                    }
                });
            }, 500);
        } else {//最开始的点线面。
           

        }
        
    }
}
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
                        name: "ptMeasue" + NewGuidCL(),
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
        } else {
           layer.msg('请点击模型');
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    //移动
    handler.setInputAction(function (move) {
        if (points.length > 0) {
            //清除多边形临时边线

            var pick= viewer.scene.pick(move.endPosition);
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
                id:"drawbianjieL123",
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
                        console.log(temp);
                        if (temp.field.YouHuaType == "0") {//改正数
                            for (var i in HeightList ) {
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
                                width: 0.5,
                                arcType: Cesium.ArcType.RHUMB,
                                material: Cesium.Color.YELLOW,
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.YELLOW,
                                }),
                            }
                        });

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
                        } else if (data.value=== "1") {
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
function drowPoumianxian(poumianx,xyz) {
    var option;

    var symbolSize = 3;
    var data = poumianx;

    option = {
        title: {
            text: xyz+'剖面线',
            left: 'center'
        },
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
            min: 0,
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
        dataZoom: [
            {
                type: 'slider',
                xAxisIndex: 0,
                filterMode: 'none'
            },
            {
                type: 'slider',
                yAxisIndex: 0,
                filterMode: 'none'
            },
            {
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'none'
            },
            {
                type: 'inside',
                yAxisIndex: 0,
                filterMode: 'none'
            }
        ],
        series: [
            {
                id: 'a',
                type: 'line',
                smooth: true,
                symbolSize: symbolSize,
                data: data
            }
        ]
    };
    setTimeout(function () {
        // Add shadow circles (which is not visible) to enable drag.
        poumianlinedatachart.setOption({
            graphic: data.map(function (item, dataIndex) {
                return {
                    type: 'circle',
                    position: poumianlinedatachart.convertToPixel('grid', item),
                    shape: {
                        cx: 0,
                        cy: 0,
                        r: symbolSize / 2
                    },
                    invisible: true,
                    draggable: true,
                    ondrag: function (dx, dy) {
                        onPointDragging(dataIndex, [this.x, this.y],data);
                    },
                    onmousemove: function () {
                        showTooltip(dataIndex);
                    },
                    onmouseout: function () {
                        hideTooltip(dataIndex);
                        //moddataGaoCha = data;
                        //console.log(poumianx);
                        //console.log(data);
                        //console.log(moddataGaoCha);
                    },
                    z: 100
                };
            })
        });
    }, 0);
    window.addEventListener('resize', updatePosition);

    poumianlinedatachart.on('dataZoom', updatePosition);
    poumianlinedatachart.setOption(option);
    function updatePosition() {
        poumianlinedatachart.setOption({
            graphic: data.map(function (item, dataIndex) {
                return {
                    position: poumianlinedatachart.convertToPixel('grid', item)
                };
            })
        });
    }

    function showTooltip(dataIndex) {
        poumianlinedatachart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: dataIndex
        });
    }

    function hideTooltip(dataIndex) {
        poumianlinedatachart.dispatchAction({
            type: 'hideTip'
        });
    }

    function onPointDragging(dataIndex, pos) {
        data[dataIndex] = poumianlinedatachart.convertFromPixel('grid', pos);

        // Update data
        poumianlinedatachart.setOption({
            series: [{
                id: 'a',
                data: data
            }]
        });
    }
};

