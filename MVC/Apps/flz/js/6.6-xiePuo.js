
var xiePuotext = null;

var xiePuoinfoaddlayerindex = null;
var xiepoimglayerindex = null;
var upload = layui.upload;  
var srcInfo = {};//用来装图片地址，备注等。
var xiePuoIndex = null;
var xiePoChakanlayerindex = null;
var droXiePuoAddlayerindex = null;
var xiepotableview = null;
function gotoXiePuo() {
    //本面积计算方法为：将所有点转换为大地坐标BLH，然后将H赋值为最大H，再转换为空间直角坐标XYZ，取XY计算面积
    ClearTemp();
    if (currentprojectid == null) {
        layer.msg('请先选择项目', { zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
        return;
    }
    if (modleInfo == null) {
        layer.msg('请先选择模型', {  zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
        return;
    }
   // layer.min() 、layer.restore()
    if (xiePuoIndex!=null) {
        layer.min(xiePuoIndex);
    }
    isAraa = true;

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
                points = [];
            }

            var pickedOject = scene.pick(leftclik.position);
            if (pickedOject != undefined) {
                var position = scene.pickPosition(leftclik.position);
                if (position != undefined) {
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
                    if (viewer.entities.getById("line_temp9999") != null) {
                        viewer.entities.removeById("line_temp9999");
                    }
                    if (viewer.entities.getById("line_temp9998") != null) {
                        viewer.entities.removeById("line_temp9998");
                    }
                    if (handler != undefined) {
                        handler.destroy();
                    }
                    viewer.entities.add({
                        name: "plMeasue" + NewGuid(),
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
                   // DrowHuaHua("xiePuo", [], points);
                    if (droXiePuoAddlayerindex == null) {
                        //
                        droXiePuoAddlayerindex = layer.open({
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
                                    var position = points;
                                    data.field.cookie = document.cookie;
                                    position.push(position[0]);
                                    data.field.points = JSON.stringify(position);//直接存吧;
                                    data.field.projectId = currentprojectid;
                                    //存一个表，斜坡项目关联表
                                    data.field.status = '0';
                                    data.field.modleId = modleInfo.id.split("_")[1];//模型id
                                    //存下当前视角
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
                                   
                                    data.field.level = JSON.stringify(home);
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
                                                //修改树

                                                ClearTemp();
                                                layer.close(droXiePuoAddlayerindex);
                                                points = [];

                                            }


                                        }, datatype: "json"
                                    });
                                    return false;
                                });

                            }
                            , end: function () {
                                droXiePuoAddlayerindex = null;
                                ClearTemp();
                            }, cancel: function () {//取消按钮

                                //取消画的图和点
                                if (handler != undefined) {
                                    handler.destroy();
                                }
                                isRedo = true;
                                points = [];
                            }
                        });
                    }


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
                    viewer.entities.add({
                        name: "plMeasue" + NewGuid(),
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
                   // DrowHuaHua("xiePuo", [], points);
                    if (droXiePuoAddlayerindex == null) {
                        //
                        droXiePuoAddlayerindex = layer.open({
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
                                    var position = points;
                                    data.field.cookie = document.cookie;
                                    position.push(position[0]);
                                    data.field.points = JSON.stringify(position);//直接存吧;
                                    data.field.projectId = currentprojectid;
                                    //存一个表，斜坡项目关联表
                                    data.field.status = '0';
                                    data.field.modleId = modleInfo.id.split("_")[1];//模型id
                                    //存下当前视角
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

                                    data.field.level = JSON.stringify(home);
                                    var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                                    $.ajax({
                                        url: servicesurl + "/api/FlzWindowInfo/AddFlzSteepHill", type: "post", data: data.field,
                                        success: function (result) {
                                            layer.close(loadingminindex);

                                            if (isNaN(result)) {
                                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                            } else {
                                                var firstflag = true;
                                                for (var i in layers) {
                                                    if (layers[i].type == "DIZHIFA") {
                                                        firstflag = false;
                                                        var flzline = new Object;
                                                        flzline.title = data.field.name;
                                                        flzline.id = "DIZHISON_" + result;
                                                        flzline.type = "DIZHISON";
                                                        flzline.remarks = data.field.remarks;
                                                        flzline.datas = data.field;
                                                        flzline.datas.id = result;
                                                        flzline.pointList = position;
                                                        flzline.checked = true;
                                                        flzline.spread = true;
                                                        flzline.showCheckbox = true;//显示复选框

                                                        layers[i].children.push(flzline);
                                                        layers[i].spread = true;
                                                    }
                                                }
                                                if (firstflag) {//第一次，数据里面没有地质识别。
                                                    var dominantStructuralPlane = new Object;
                                                    dominantStructuralPlane.title = "地质识别";
                                                    dominantStructuralPlane.type = "DIZHIFA";
                                                    dominantStructuralPlane.checked = false;
                                                    dominantStructuralPlane.spread = false;
                                                    dominantStructuralPlane.showCheckbox = true;//显示复选框

                                                    var child = [];
                                                    var flzline = new Object;
                                                    flzline.title = data.field.name;
                                                    flzline.id = "DIZHISON_" + result;
                                                    flzline.type = "DIZHISON";
                                                    flzline.remarks = data.field.remarks;
                                                    flzline.datas = data.field;
                                                    flzline.datas.id = result;
                                                    flzline.pointList = position;
                                                    flzline.checked = true;
                                                    flzline.spread = true;
                                                    flzline.showCheckbox = true;//显示复选框
                                                    child.push(flzline);
                                                    dominantStructuralPlane.children = child;
                                                    layers.push(dominantStructuralPlane);
                                                }
                                                
                                                modeljiazaiFlag = false;
                                                tree.reload('prjlayerlistid', { data: layers });
                                                ClearTemp();
                                                layer.msg("保存成功", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                layer.close(droXiePuoAddlayerindex);
                                                points = []; 

                                                if (xiePuoIndex != null) {
                                                    GetSteepHillInfoList({ "jieLun": "" });
                                                    layer.restore(xiePuoIndex);
                                                }
                                            }


                                        }, datatype: "json"
                                    });
                                    return false;
                                });

                            }
                            , end: function () {
                                droXiePuoAddlayerindex = null;
                                ClearTemp();
                            }, cancel: function () {//取消按钮

                                //取消画的图和点
                                if (handler != undefined) {
                                    handler.destroy();
                                }
                                isRedo = true;
                                points = [];
                            }
                        });
                    }
                }

            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }
    }
};
function LoadSteepHillindex(xiePuoinfo){
    //ClearTemp();

    if (currentprojectid == null) {
        layer.msg('请先选择项目', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    if (modleInfo == null) {
        layer.msg('请先选择模型', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    if (xiePuoinfo == null) {
        layer.msg('请先选择斜坡', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    if (xiePuoIndex!=null) {
        layer.min(xiePuoIndex);
    }
    
    //console.log(xiePuoinfo);
    if (xiePuoinfoaddlayerindex == null) {
        xiePuoinfoaddlayerindex = layer.open({
            type: 1
            , title: [xiePuoinfo.name + '隐患识别', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['400px', '720px']
            , shade: 0
            , offset: ['68px','75.2%']
            , closeBtn: 1
            , maxmin: true
            , moveOut: true
            , content: xiePuoSteepHillHtml // , content: '/Apps/flz/widget/1.3 xiePuoinfoadd.html'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);


                //if (xjxzqs.length > 0) {
                //    for (var i in xjxzqs) {
                //        document.getElementById("appdId").innerHTML += '<option value="' + xjxzqs[i].value + '">' + xjxzqs[i].name + '</option>';
                //    }
                //}

                //渲染开始时间&结束时间
                date.render({
                    elem: '#xmkssjid'
                });

                form.render();
                form.render('select');
                srcInfo = {};
                form.val('xiePuoSteepHillFilter', {
                    appd: xiePuoinfo.appd
                    , apjg: xiePuoinfo.apjg
                    , xpbj: xiePuoinfo.xpbj
                    , yxyz: xiePuoinfo.yxyz
                    , ruc: xiePuoinfo.ruc
                    , ytjg: xiePuoinfo.ytjg
                    , ytfh: xiePuoinfo.ytfh
                    , ytlh: xiePuoinfo.ytlh
                    , dxdm: xiePuoinfo.dxdm
                    , dzgz: xiePuoinfo.dzgz
                    , gcdz: xiePuoinfo.gcdz
                    , score: xiePuoinfo.score
                    ,jieLun: xiePuoinfo.jieLun
                });
                srcInfo = {
                      appdrest: xiePuoinfo.appdrest
                    , apjgrest: xiePuoinfo.apjgrest
                    , xpbjrest: xiePuoinfo.xpbjrest
                    , yxyzrest: xiePuoinfo.yxyzrest
                    , rucrest: xiePuoinfo.rucrest
                    , ytjgrest: xiePuoinfo.ytjgrest
                    , ytfhrest: xiePuoinfo.ytfhrest
                    , ytlhrest: xiePuoinfo.ytlhrest
                    , appdSrc: xiePuoinfo.appdSrc
                    , apjgSrc: xiePuoinfo.apjgSrc
                    , xpbjSrc: xiePuoinfo.xpbjSrc
                    , yxyzSrc: xiePuoinfo.yxyzSrc
                    , rucSrc: xiePuoinfo.rucSrc
                    , ytjgSrc: xiePuoinfo.ytjgSrc
                    , ytfhSrc: xiePuoinfo.ytfhSrc
                    , ytlhSrc: xiePuoinfo.ytlhSrc
                }
                /////////////////////
                form.on('select(appdSelect)', function (data) {
                     var datas = form.val('xiePuoSteepHillFilter');
                     gotoSrcoe(datas);
                     form.render('select');
                });
                form.on('select(apjgSelect)', function (data) {
                    var datas = form.val('xiePuoSteepHillFilter');
                    gotoSrcoe(datas);
                    form.render('select');
                });
                form.on('select(xpbjSelect)', function (data) {
                    var datas = form.val('xiePuoSteepHillFilter');
                    gotoSrcoe(datas);
                    form.render('select');
                });
                form.on('select(rucSelect)', function (data) {
                    var datas = form.val('xiePuoSteepHillFilter');
                    gotoSrcoe(datas);
                    form.render('select');
                });
                form.on('select(yxyzSelect)', function (data) {
                    var datas = form.val('xiePuoSteepHillFilter');
                    gotoSrcoe(datas);
                    form.render('select');
                });
                form.on('select(ytlhSelect)', function (data) {
                    var datas = form.val('xiePuoSteepHillFilter');
                    gotoSrcoe(datas);
                    form.render('select');
                });
                form.on('select(ytfhSelect)', function (data) {
                    var datas = form.val('xiePuoSteepHillFilter');
                    gotoSrcoe(datas);
                    form.render('select');
                });
                form.on('select(ytjgSelect)', function (data) {
                    var datas = form.val('xiePuoSteepHillFilter');
                    gotoSrcoe(datas);
                    form.render('select');
                });


                ////////////////////
                form.on('submit(xiePuoSteepHillFilterSubmit)', function (data) {
                    data.field.cookie = document.cookie;
                    data.field.id = xiePuoinfo.id;
                    //备注
                    if (srcInfo.appdrest != null && srcInfo.appdrest != "") { data.field.appdrest = srcInfo.appdrest; xiePuoinfo.appdrest = srcInfo.appdrest };
                    if (srcInfo.apjgrest != null && srcInfo.apjgrest != "") { data.field.apjgrest = srcInfo.apjgrest; xiePuoinfo.apjgrest = srcInfo.apjgrest };
                    if (srcInfo.xpbjrest != null && srcInfo.xpbjrest != "") { data.field.xpbjrest = srcInfo.xpbjrest; xiePuoinfo.xpbjrest = srcInfo.xpbjrest };
                    if (srcInfo.yxyzrest != null && srcInfo.yxyzrest != "") { data.field.yxyzrest = srcInfo.yxyzrest; xiePuoinfo.yxyzrest = srcInfo.yxyzrest };
                    if (srcInfo.rucrest != null && srcInfo.rucrest != "") { data.field.rucrest = srcInfo.rucrest; xiePuoinfo.rucrest = srcInfo.rucrest };
                    if (srcInfo.ytjgrest != null && srcInfo.ytjgrest != "") { data.field.ytjgrest = srcInfo.ytjgrest; xiePuoinfo.ytjgrest = srcInfo.ytjgrest };
                    if (srcInfo.ytfhrest != null && srcInfo.ytfhrest != "") { data.field.ytfhrest = srcInfo.ytfhrest; xiePuoinfo.ytfhrest = srcInfo.ytfhrest };
                    if (srcInfo.ytlhrest != null && srcInfo.ytlhrest != "") { data.field.ytlhrest = srcInfo.ytlhrest; xiePuoinfo.ytlhrest = srcInfo.ytlhrest };
                    //src                                         
                    if (srcInfo.appdSrc != null && srcInfo.appdSrc != "") { data.field.appdSrc = srcInfo.appdSrc; xiePuoinfo.appdSrc = srcInfo.appdSrc };
                    if (srcInfo.apjgSrc != null && srcInfo.apjgSrc != "") { data.field.apjgSrc = srcInfo.apjgSrc; xiePuoinfo.apjgSrc = srcInfo.apjgSrc };
                    if (srcInfo.xpbjSrc != null && srcInfo.xpbjSrc != "") { data.field.xpbjSrc = srcInfo.xpbjSrc; xiePuoinfo.xpbjSrc = srcInfo.xpbjSrc };
                    if (srcInfo.yxyzSrc != null && srcInfo.yxyzSrc != "") { data.field.yxyzSrc = srcInfo.yxyzSrc; xiePuoinfo.yxyzSrc = srcInfo.yxyzSrc };
                    if (srcInfo.rucSrc != null && srcInfo.rucSrc != "") { data.field.rucSrc = srcInfo.rucSrc; xiePuoinfo.rucSrc = srcInfo.rucSrc };
                    if (srcInfo.ytjgSrc != null && srcInfo.ytjgSrc != "") { data.field.ytjgSrc = srcInfo.ytjgSrc; xiePuoinfo.ytjgSrc = srcInfo.ytjgSrc };
                    if (srcInfo.ytfhSrc != null && srcInfo.ytfhSrc != "") { data.field.ytfhSrc = srcInfo.ytfhSrc; xiePuoinfo.ytfhSrc = srcInfo.ytfhSrc };
                    if (srcInfo.ytlhSrc != null && srcInfo.ytlhSrc != "") { data.field.ytlhSrc = srcInfo.ytlhSrc; xiePuoinfo.ytlhSrc = srcInfo.ytlhSrc };
                    xiePuoinfo.appd = data.field.appd;
                    xiePuoinfo.apjg = data.field.apjg;
                    xiePuoinfo.xpbj = data.field.xpbj;
                    xiePuoinfo.yxyz = data.field.yxyz;
                    xiePuoinfo.ruc = data.field.ruc;
                    xiePuoinfo.ytjg = data.field.ytjg;
                    xiePuoinfo.ytfh = data.field.ytfh;
                    xiePuoinfo.ytlh = data.field.ytlh;
                    xiePuoinfo.dxdm = data.field.dxdm;
                    xiePuoinfo.dzgz = data.field.dzgz;
                    xiePuoinfo.gcdz = data.field.gcdz;
                    xiePuoinfo.score = data.field.score;
                    xiePuoinfo.jieLun = data.field.jieLun;
                    xiePuoinfo.status = "1";

                    var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                    $.ajax({
                        url: servicesurl + "/api/FlzWindowInfo/UpdateFlzSteepHill", type: "post", data: data.field,
                        success: function (result) {
                            layer.close(loadinglayerindex);
                            if (result == "更新成功") {
                                ClearTemp();
                                
                                for (var i in layers) {
                                    if (layers[i].type == "DIZHIFA") {
                                    
                                        for (var j in layers[i].children) {
                                            if (layers[i].children[j].id == "DIZHISON_" + xiePuoinfo.id) {
                                                layers[i].children[j].datas = xiePuoinfo;
                                                layers[i].children[j].checked = true;
                                                layers[i].children[j].spread = true;
                                                layers[i].spread = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                                modeljiazaiFlag = false;
                                tree.reload('prjlayerlistid', { data: layers });
                                ClearTemp();
                                layer.msg("提交成功。", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                if (xiePuoIndex != null ) {
                                    layer.restore(xiePuoIndex);
                                    GetSteepHillInfoList({ "jieLun": "" });
                                }
                                //关闭
                                
                                layer.close(xiePuoinfoaddlayerindex);
                            }
                            else {
                                //更新失败
                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            }
                        }, datatype: "json"
                    });

                    return false;
                });
                //表单取值
                layui.$('#LAY-component-form-getval').on('click', function () {
                    var data = form.val('xiePuoSteepHillFilter');
                    if (data.apjg.length == 0) {
                        layer.msg('请选择岸坡结构');
                        return;
                    }
                    if (data.appd.length == 0) {
                        layer.msg('请选择岸坡坡度');
                        return;
                    }
                    if (data.xpbj.length == 0) {
                        layer.msg('请选择斜坡边界');
                        return;
                    }
                    if (data.ruc.length == 0) {
                        layer.msg('请选择软弱层');
                        return;
                    }
                    if (data.yxyz.length == 0) {
                        layer.msg('请选择岩性岩组');
                        return;
                    }
                    if (data.ytfh.length == 0) {
                        layer.msg('请选择岩体风化程度');
                        return;
                    }
                    if (data.ytjg.length == 0) {
                        layer.msg('请选择岩体结构');
                        return;
                    }
                    if (data.ytlh.length == 0) {
                        layer.msg('请选择岩体劣化程度');
                        return;
                    }

                    var scroe = (fenshu(data.apjg) * 0.443 + fenshu(data.appd) * 0.387 + fenshu(data.xpbj) * 0.17) * 0.241 +
                        (fenshu(data.ruc) * 0.5 + fenshu(data.yxyz) * 0.5) * 0.21 +
                        (fenshu(data.ytfh) * 0.24 + fenshu(data.ytjg) * 0.21 + fenshu(data.ytlh) * 0.55) * 0.549
                    var x = (fenshu(data.apjg) * 0.443 + fenshu(data.appd) * 0.387 + fenshu(data.xpbj) * 0.17) * 0.241;
                    var y = (fenshu(data.ruc) * 0.5 + fenshu(data.yxyz) * 0.5) * 0.21;
                    var z = (fenshu(data.ytfh) * 0.24 + fenshu(data.ytjg) * 0.21 + fenshu(data.ytlh) * 0.55) * 0.549;
                    

                    form.val('xiePuoSteepHillFilter', {
                        "dxdm": x.toFixed(4) // "name": "value"
                        , "dzgz": y.toFixed(4)
                        , "gcdz": z.toFixed(4)
                        , "score": scroe.toFixed(4)
                    });
                    //alert(JSON.stringify(data));
                });



            }
            , end: function () {
                xiePuoinfoaddlayerindex = null;
                srcInfo = {};
                if (xiePuoIndex != null) {
                    layer.restore(xiePuoIndex);
                }
            }
        });
    } else {
        layer.msg('已打开隐患识别窗口');
        return;
    }


}
//带分数的切割
function fenshu(datas) {
    return parseFloat(datas.split('/')[0]) / parseFloat(datas.split('/')[1])
}
function goShangChuan(flag) {
    if (xiepoimglayerindex == null) {
        xiepoimglayerindex = layer.open({
            type: 1
            , title: ['上传目标时序影像', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['500px', '600px']
            , shade: 0
            , offset: 'auto'
            , closeBtn: 1
            , maxmin: false
            , moveOut: true
            , content: '<form class="layui-form" style="margin-top:10px" lay-filter="addtimeimageform">   <div class="layui-form-item"><label class="layui-form-label">备注</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="image_bz_add" autocomplete="off" placeholder="" class="layui-input" /></div></div><div class="layui-form-item" style="height: 220px;"><div class="layui-upload"><div class="layui-row" style="margin-top:20px;margin-left:10px;margin-right:20px"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><button type="button" class="layui-btn-fluid  layui-btn layui-btn-primary layui-border-green" id="image_timeimage_select">1-选择影像</button></div></div><div class="layui-col-xs6"><div class="grid-demo"><button type="button" class="layui-btn-fluid layui-btn layui-btn-primary layui-border-green" id="image_timeimage_upload">2-提交上传</button></div></div></div><div class="layui-upload-list" style="height:380px;margin-top:10px;margin-left:10px;margin-right:10px;background-color:rgba(25,25,0,0.11)"><img class="layui-upload-img" id="image_timeimage_img" name="image_timeimage_img" style="width:100%;height:auto;vertical-align:middle"></div></div></div></form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                if (flag == 1) {
                    if (srcInfo.appdrest != null && srcInfo.appdrest != "") {
                        form.val('addtimeimageform', {
                            "image_bz_add": srcInfo.appdrest 
                        });
                    }
                    if (srcInfo.appdSrc != null && srcInfo.appdSrc != "") {
                        document.getElementById("image_timeimage_img").src = "http://www.cq107chy.com:4022/SurImage/xiepo/" + srcInfo.appdSrc+".jpg";
                    }
                }
                if (flag == 2) {
                    if (srcInfo.apjgrest != null && srcInfo.apjgrest != "") {
                        form.val('addtimeimageform', { "image_bz_add": srcInfo.apjgrest });
                    }
                    if (srcInfo.apjgSrc != null && srcInfo.apjgSrc != "") {
                       document.getElementById("image_timeimage_img").src = "http://www.cq107chy.com:4022/SurImage/xiepo/" + srcInfo.apjgSrc+".jpg"; 
                    }
                }
                if (flag == 3) {
                    if (srcInfo.xpbjrest != null && srcInfo.xpbjrest != "") {
                        form.val('addtimeimageform', { "image_bz_add": srcInfo.xpbjrest });
                    }
                    if (srcInfo.xpbjSrc != null && srcInfo.xpbjSrc != "") {
                        document.getElementById("image_timeimage_img").src = "http://www.cq107chy.com:4022/SurImage/xiepo/" + srcInfo.xpbjSrc+".jpg"; 
                    }
                }
                if (flag == 4) {
                    if (srcInfo.yxyzrest != null && srcInfo.yxyzrest != "")
                    {
                        form.val('addtimeimageform', { "image_bz_add": srcInfo.yxyzrest });
                    }
                    if (srcInfo.yxyzSrc != null && srcInfo.yxyzSrc != "") {
                        document.getElementById("image_timeimage_img").src = "http://www.cq107chy.com:4022/SurImage/xiepo/" + srcInfo.yxyzSrc+".jpg"; 
                      }
                }
                if (flag == 5) {
                    if (srcInfo.rucrest != null && srcInfo.rucrest != "")
                    {
                        form.val('addtimeimageform', { "image_bz_add": srcInfo.rucrest });
                    }
                    if (srcInfo.rucSrc != null && srcInfo.rucSrc != "") {
                       document.getElementById("image_timeimage_img").src = "http://www.cq107chy.com:4022/SurImage/xiepo/" + srcInfo.rucSrc+".jpg";
                     }
                }
                     if (flag == 6) {
                         if (srcInfo.ytjgrest != null && srcInfo.ytjgrest != "") {
                             form.val('addtimeimageform', { "image_bz_add": srcInfo.ytjgrest });
                         } if (srcInfo.ytjgSrc != null && srcInfo.ytjgSrc != "") {
                             document.getElementById("image_timeimage_img").src = "http://www.cq107chy.com:4022/SurImage/xiepo/" + srcInfo.ytjgSrc+".jpg"; 
                           }
                     }
                     if (flag == 7) {
                         if (srcInfo.ytfhrest != null && srcInfo.ytfhrest != "") {
                             form.val('addtimeimageform', { "image_bz_add": srcInfo.ytfhrest });
                         } if (srcInfo.ytfhSrc != null && srcInfo.ytfhSrc != "") {
                             document.getElementById("image_timeimage_img").src = "http://www.cq107chy.com:4022/SurImage/xiepo/" + srcInfo.ytfhSrc+".jpg"; 
                         }
                     }
                     if (flag == 8) {
                         if (srcInfo.ytlhrest != null && srcInfo.ytlhrest != "") {
                             form.val('addtimeimageform', { "image_bz_add": srcInfo.ytlhrest });
                         } if (srcInfo.ytlhSrc != null && srcInfo.ytlhSrc != "") {
                             document.getElementById("image_timeimage_img").src = "http://www.cq107chy.com:4022/SurImage/xiepo/" + srcInfo.ytlhSrc+".jpg"; 
                         }
                     }

               // $('#image_timeimage_img')[0].src = "D:/platform20210807/data/SurImage/20211117112028.jpg";
               // document.getElementById("image_timeimage_img").src = "http://www.cq107chy.com:4022/SurImage/equipment/1_2_20210714%20(3).jpg";
                
                var loadingminindex = null;
                //创建一个影像上传组件
                var uploadinst = upload.render({
                    elem: '#image_timeimage_select' //绑定元素
                    , url: servicesurl + "/api/ImageUpload/UploadXiePoImage" //上传接口
                    , data: {
                        timeimg: function () {
                            return $('#image_timeimage_img')[0].src;
                        },
                        cookie: function () {
                            return document.cookie;
                        },
                        geshi: function () {
                            return $('#image_timeimage_img')[0].src.split(',')[0];
                        }
                    }
                    , datatype: "json"
                    , accept: 'images'
                    , auto: false
                    , bindAction: '#image_timeimage_upload'
                    , multiple: false
                    , choose: function (obj) {
                        obj.preview(function (index, file, result) {
                            $('#image_timeimage_img')[0].src = result;

                            var image = new Image();
                            image.src = result;
                            image.onload = function () {
                                EXIF.getData(image, function () {
                                    var exifs = EXIF.pretty(this);
                                    imagetime = EXIF.getTag(this, "DateTime");
                                    f = EXIF.getTag(this, "FocalLength");
                                    f = f.numerator * 1.0 / f.denominator;
                                    camera = EXIF.getTag(this, "Model");
                                });
                            };
                        });
                    }
                    , before: function (obj) {
                        console.log(form.val("addtimeimageform"));
                        loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                       
                    }
                    , done: function (res) {
                        //上传完毕回调
                        if (res.code == 1) {
                            console.log(form.val("addtimeimageform"));
                            console.log(res);
                            console.log(flag);
                            layer.close(loadingminindex);
                            layer.close(xiepoimglayerindex);
                            if (flag==1) {//岸坡上传
                                srcInfo.appdrest = form.val("addtimeimageform").image_bz_add;
                                srcInfo.appdSrc = res.data;
                            }
                            if (flag == 2) { srcInfo.apjgrest = form.val("addtimeimageform").image_bz_add; srcInfo.apjgSrc = res.data; }
                            if (flag == 3) { srcInfo.xpbjrest = form.val("addtimeimageform").image_bz_add; srcInfo.xpbjSrc = res.data; }
                            if (flag == 4) { srcInfo.yxyzrest = form.val("addtimeimageform").image_bz_add; srcInfo.yxyzSrc = res.data; }
                            if (flag == 5) { srcInfo.rucrest = form.val("addtimeimageform").image_bz_add; srcInfo.rucSrc = res.data; }
                            if (flag == 6) { srcInfo.ytjgrest = form.val("addtimeimageform").image_bz_add; srcInfo.ytjgSrc = res.data; }
                            if (flag == 7) { srcInfo.ytfhrest = form.val("addtimeimageform").image_bz_add; srcInfo.ytfhSrc = res.data; }
                            if (flag == 8) { srcInfo.ytlhrest = form.val("addtimeimageform").image_bz_add; srcInfo.ytlhSrc = res.data; }
                        }

                        layer.msg(res.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }
                    , error: function () {
                        //请求异常回调
                    }
                });
                form.render();
                form.render('select');
            }
            , end: function () {
                xiepoimglayerindex = null;
            }
        });
    } else {
        layer.msg("已打开照片上传", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
   
}
function gotoSrcoe(data) {
    var tempc = {};
    console.log(data);
    if (data.appd.length > 0 && data.apjg.length > 0 && data.xpbj.length > 0) {//可以计算地形地貌的得分
        tempc.dxdm = (fenshu(data.apjg) * 0.443 + fenshu(data.appd) * 0.387 + fenshu(data.xpbj) * 0.17) * 0.241;
    } else {
        tempc.dxdm = '';
    }
    if (data.ruc.length > 0 && data.yxyz.length > 0) {//可以计算地形地貌的得分
        tempc.dzgz = (fenshu(data.ruc) * 0.5 + fenshu(data.yxyz) * 0.5) * 0.21;;
    } else {
        tempc.dzgz = '';
    }
    if (data.ytfh.length > 0 && data.ytlh.length > 0 && data.ytjg.length > 0) {//可以计算地形地貌的得分
        tempc.gcdz = (fenshu(data.ytfh) * 0.24 + fenshu(data.ytjg) * 0.21 + fenshu(data.ytlh) * 0.55) * 0.549;
    } else {
        tempc.gcdz = '';
    }
    if (tempc.gcdz != "" && tempc.dzgz.length != "" && tempc.dxdm.length != "") {
        tempc.score = tempc.gcdz + tempc.dzgz + tempc.dxdm;
        if (tempc.score > 0.31) {
            tempc.jieLun = "斜坡消落区发生演化可能性大";
        } else if (tempc.score < 0.25) {
            tempc.jieLun = "斜坡消落区发生演化可能性小";
        } else {
            tempc.jieLun = "斜坡消落区发生演化可能性中";
        }
    } else {
        tempc.score = '';
        tempc.jieLun = "";
    }
    console.log(tempc);
    form.val('xiePuoSteepHillFilter', {
        "dxdm": tempc.dxdm!=""?tempc.dxdm.toFixed(4):"" // "name": "value"
        , "dzgz": tempc.dzgz != "" ? tempc.dzgz.toFixed(4) : "" 
        , "gcdz": tempc.gcdz != "" ? tempc.gcdz.toFixed(4) : "" 
        , "score": tempc.score != "" ? tempc.score.toFixed(4) : "" 
        , "jieLun": tempc.jieLun
    });
    //console.log(tempc);
    return tempc;
}
//斜坡统计
function xiePuoTongji() {
    if (currentprojectid == null) {
        layer.msg('请先选择项目');
        return;
    }
    if (xiePuoIndex!=null) {
        layer.msg("已打开斜坡；列表窗口", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    xiePuoIndex = layer.open({
        type: 1
        , title: ['斜坡信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
        , area: ['1030px', '700px']
        , shade: 0
        , offset: 'auto'
        , closeBtn: 1
        , anim: 0
        , maxmin: true
        , moveOut: true
        , content: xiepoTable
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);
            form.render();
            form.render('select');
            form.on('submit(queryXieposubmit)', function (data) {
                GetSteepHillInfoList(data.field);
                return false;
            });
        }
        , end: function () {
            xiePuoIndex = null;
            xiepotableview = null;
        }
    });

    var xiepotabledata = [];
    xiepotableview = table.render({
        elem: '#xiepotable-view'
        , id: 'xiepotableviewid'
        , title: '斜坡信息'
        , skin: 'line'
        , even: false
        , page: true
        , limit: 10
        , toolbar: '#xie-puo-add'
        , totalRow: false
        , initSort: { field: 'id', type: 'desc' }
        , cols: [[
            { field: 'id', title: 'ID', hide: true }
            ,{ type: 'checkbox' }
            , { field: 'name', title: '斜坡名称', width: 120, align: "center", totalRowText: '合计' }
            , { field: 'dxdm', title: '地形地貌得分', width: 120, sort: true, align: "center", totalRow: true }
            , { field: 'dzgz', title: '地质构造得分', width: 120, sort: true, align: "center", totalRow: true }
            , { field: 'gcdz', title: '工程地质得分', width: 120, sort: true, align: "center", totalRow: true }
            , { field: 'score', title: '斜坡得分', width: 100, sort: true, align: "center", totalRow: true }
            , {
                field: 'jieLun', title: '识别结果', width: 200, align: "center", templet: function (row) {
                    if (row.jieLun != null && row.jieLun.length>0) {
                        return row.jieLun;
                    } else {
                        return "未识别"
                    }

                    //得到当前行数据，并拼接成自定义模板

                } }
            , { fixed: 'right', title: '操作', width: 200, align: 'center', toolbar: '#processedPatrolButon' }
        ]]
        , data: []
    });
    table.on('tool(xiepotable-view)', function (obj) {
        console.log(obj);
        var entity = viewer.entities.getById("DIZHISON_" + obj.data.id);
        if (entity == undefined) {
            entity = viewer.entities.add({
                id: "DIZHISON_" + obj.data.id,
                polyline: {
                    positions: obj.data.points,
                    width: 3,
                    material: Cesium.Color.RED,
                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                        color: Cesium.Color.RED
                    }),
                    show: true,
                    classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                },
            });
        }
        if (obj.data.level.length > 0) {
            var home = JSON.parse(obj.data.level);
            viewer.scene.camera.setView(home);
        } else {
            var xyzzz = getChanzhuang(obj.data.points);
            viewer.zoomTo(entity, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(-(parseFloat(xyzzz.qingXiang) - 180)), Cesium.Math.toRadians(parseFloat(xyzzz.qingJiao) - 90)));

        }


        var entitylabel = viewer.entities.getById("DIZHISON_" + obj.data.id + "_LABEL");
        if (entitylabel == undefined) {
            viewer.entities.add({
                id: "DIZHISON_" + obj.data.id + "_LABEL",
                position: obj.data.points[0],
                label: {
                    text: obj.data.name,
                    showBackground: true,
                    backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                    font: '14px Times New Roman',
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                    pixelOffset: new Cesium.Cartesian2(0.0, -36),
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                    scaleByDistance: new Cesium.NearFarScalar(2000, 1, 10000, 0),
                }
            });
        }



        if (obj.event === 'detail') {
            xiePuoPhotoSee(obj.data);
        } else if (obj.event === 'delete') {
            layer.confirm('确认删除' + obj.data.name + '斜坡?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                deleteDiZhiShiBie(obj.data);
            });
        } else if (obj.event === 'chuli') {
            LoadSteepHillindex(obj.data);
        }
    });
    table.on('checkbox(xiepotable-view)', function (obj) {
        console.log(obj);
        if (obj.type == "all") {//全选按钮
            if (obj.checked) {//选中
                var checkStatus = table.checkStatus('xiepotableviewid').data;
                var entityList = [];
                for (var i = 0; i < checkStatus.length;i++) {
                    var entity = viewer.entities.getById("DIZHISON_" + checkStatus[i].id);
                    if (entity== undefined) {
                        entity=viewer.entities.add({
                            id: "DIZHISON_" + checkStatus[i].id,
                            polyline: {
                                positions: checkStatus[i].points,
                                width: 3,
                                material: Cesium.Color.RED,
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.RED
                                }),
                                show: true,
                                classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                            },
                        });
                    }
                    var entitylabel = viewer.entities.getById("DIZHISON_" + checkStatus[i].id+ "_LABEL");
                    if (entitylabel == undefined) {
                        viewer.entities.add({
                            id: "DIZHISON_" + checkStatus[i].id + "_LABEL",
                            position: checkStatus[i].points[0],
                            label: {
                                text: checkStatus[i].name,
                                showBackground: true,
                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                font: '14px Times New Roman',
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                pixelOffset: new Cesium.Cartesian2(0.0, -36),
                                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                scaleByDistance: new Cesium.NearFarScalar(2000, 1, 10000, 0),
                            }
                        });
                    }
                    entityList.push(entity);
                }
                if (entityList.length>0) {
                    viewer.flyTo(entityList, { duration: 5, offset: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-90), 10000) });
                }

            } else {
                var checkNoStatus = table.cache['xiepotableviewid'];//全部未选中
                for (var i = 0; i < checkNoStatus.length; i++) {
                    viewer.entities.removeById("DIZHISON_" + checkNoStatus[i].id);
                    viewer.entities.removeById("DIZHISON_" + checkNoStatus[i].id + "_LABEL");
                }
            }
        } else {//单选按钮
            if (obj.checked) {//选中
                var entity = viewer.entities.getById("DIZHISON_" + obj.data.id);
                if (entity == undefined) {
                    entity=viewer.entities.add({
                        id: "DIZHISON_" + obj.data.id,
                        polyline: {
                            positions: obj.data.points,
                            width: 3,
                            material: Cesium.Color.RED,
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.RED
                            }),
                            show: true,
                            classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                        },
                    });
                }
                if (obj.data.level.length > 0) {
                    var home = JSON.parse(obj.data.level);
                    viewer.scene.camera.setView(home);
                } else {
                    var xyzzz = getChanzhuang(obj.data.points);
                    viewer.zoomTo(entity, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(-(parseFloat(xyzzz.qingXiang) - 180)), Cesium.Math.toRadians(parseFloat(xyzzz.qingJiao) - 90)));

                }
                
                
                var entitylabel = viewer.entities.getById("DIZHISON_" + obj.data.id + "_LABEL");
                if (entitylabel == undefined) {
                    viewer.entities.add({
                        id: "DIZHISON_" + obj.data.id + "_LABEL",
                        position: obj.data.points[0],
                        label: {
                            text: obj.data.name,
                            showBackground: true,
                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                            font: '14px Times New Roman',
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            pixelOffset: new Cesium.Cartesian2(0.0, -36),
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                    scaleByDistance: new Cesium.NearFarScalar(2000, 1, 10000, 0),
                        }
                    });
                }
            
            } else {
                viewer.entities.removeById("DIZHISON_" + obj.data.id);
                viewer.entities.removeById("DIZHISON_" + obj.data.id + "_LABEL");
            }
        }

        //console.log(table.getData('xiepotableviewid'));
        //console.log(table.cache['xiepotableviewid']);
        //var checkStatus = table.checkStatus('xiepotableviewid');

        //console.log(checkStatus.data)//选中行数据

        //console.log(checkStatus.data.length)
    });
    //新增按钮
    table.on('toolbar(xiepotable-view)', function (obj) {
        gotoXiePuo();
    });

    GetSteepHillInfoList({ "jieLun": ""});
}

function GetSteepHillInfoList(data) {
    var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
    $.ajax({
        url: servicesurl + "/api/FlzWindowInfo/GetSteepHillInfoList", type: "get", data: {
            "id": currentprojectid,
            "cookie": document.cookie,
            "jieLun": data.jieLun
        },
        success: function (data) {
            layer.close(loadinglayerindex);
            xiepotabledata = [];
            if (data == "") {
                //无监测剖面信息
                xiepotableview.reload({ id: 'xiepotableviewid', data: xiepotabledata });
            }
            else {
                var windowInfos = JSON.parse(data);
                for (var i in windowInfos) {
                    var xiepo = new Object;
                    xiepo.id = windowInfos[i].id;
                    xiepo.name = windowInfos[i].name;
                    xiepo.creatTime = windowInfos[i].creatTime;
                    xiepo.projectId = windowInfos[i].projectId;
                    xiepo.status = windowInfos[i].status;
                    xiepo.remarks = windowInfos[i].remarks;
                    xiepo.appd = windowInfos[i].appd;
                    xiepo.apjg = windowInfos[i].apjg;
                    xiepo.xpbj = windowInfos[i].xpbj;
                    xiepo.yxyz = windowInfos[i].yxyz;
                    xiepo.ruc = windowInfos[i].ruc;
                    xiepo.ytjg = windowInfos[i].ytjg;
                    xiepo.ytfh = windowInfos[i].ytfh;
                    xiepo.ytlh = windowInfos[i].ytlh;
                    xiepo.dxdm = windowInfos[i].dxdm;
                    xiepo.dzgz = windowInfos[i].dzgz;
                    xiepo.gcdz = windowInfos[i].gcdz;
                    xiepo.score = windowInfos[i].score;
                    xiepo.jieLun = windowInfos[i].jieLun;
                    xiepo.appdrest = windowInfos[i].appdrest;
                    xiepo.apjgrest = windowInfos[i].apjgrest;
                    xiepo.xpbjrest = windowInfos[i].xpbjrest;
                    xiepo.yxyzrest = windowInfos[i].yxyzrest;
                    xiepo.rucrest = windowInfos[i].rucrest;
                    xiepo.ytjgrest = windowInfos[i].ytjgrest;
                    xiepo.ytfhrest = windowInfos[i].ytfhrest;
                    xiepo.ytlhrest = windowInfos[i].ytlhrest;
                    xiepo.appdSrc = windowInfos[i].appdSrc;
                    xiepo.apjgSrc = windowInfos[i].apjgSrc;
                    xiepo.xpbjSrc = windowInfos[i].xpbjSrc;
                    xiepo.yxyzSrc = windowInfos[i].yxyzSrc;
                    xiepo.rucSrc = windowInfos[i].rucSrc;
                    xiepo.ytjgSrc = windowInfos[i].ytjgSrc;
                    xiepo.ytfhSrc = windowInfos[i].ytfhSrc;
                    xiepo.ytlhSrc = windowInfos[i].ytlhSrc;
                    xiepo.level = windowInfos[i].level;
                    xiepo.points = JSON.parse(windowInfos[i].points);

                    //判断一下有没有图片
                    var srcList = [];
                    if (windowInfos[i].appdSrc != null && windowInfos[i].appdSrc.length > 0) {
                        var temp = {};
                        temp.name = "岸坡坡度";
                        temp.url = "http://www.cq107chy.com:4022/SurImage/xiepo/" + windowInfos[i].appdSrc + ".jpg";
                        srcList.push(temp);
                    }

                    if (windowInfos[i].apjgSrc != null && windowInfos[i].apjgSrc.length > 0) {
                        var temp = {};
                        temp.name = "岸坡结构";
                        temp.url = "http://www.cq107chy.com:4022/SurImage/xiepo/" + windowInfos[i].apjgSrc + ".jpg";
                        srcList.push(temp);
                    }
                    if (windowInfos[i].xpbjSrc != null && windowInfos[i].xpbjSrc.length > 0) {
                        var temp = {};
                        temp.name = "斜坡边界";
                        temp.url = "http://www.cq107chy.com:4022/SurImage/xiepo/" + windowInfos[i].xpbjSrc + ".jpg";
                        srcList.push(temp);
                    }
                    if (windowInfos[i].yxyzSrc != null && windowInfos[i].yxyzSrc.length > 0) {
                        var temp = {};
                        temp.name = "岩性岩组";
                        temp.url = "http://www.cq107chy.com:4022/SurImage/xiepo/" + windowInfos[i].yxyzSrc + ".jpg";
                        srcList.push(temp);
                    }
                    if (windowInfos[i].rucSrc != null && windowInfos[i].rucSrc.length > 0) {
                        var temp = {};
                        temp.name = "软弱层";
                        temp.url = "http://www.cq107chy.com:4022/SurImage/xiepo/" + windowInfos[i].rucSrc + ".jpg";
                        srcList.push(temp);
                    }
                    if (windowInfos[i].ytjgSrc != null && windowInfos[i].ytjgSrc.length > 0) {
                        var temp = {};
                        temp.name = "岩体结构";
                        temp.url = "http://www.cq107chy.com:4022/SurImage/xiepo/" + windowInfos[i].ytjgSrc + ".jpg";
                        srcList.push(temp);
                    }
                    if (windowInfos[i].ytfhSrc != null && windowInfos[i].ytfhSrc.length > 0) {
                        var temp = {};
                        temp.name = "岩体风化程度";
                        temp.url = "http://www.cq107chy.com:4022/SurImage/xiepo/" + windowInfos[i].ytfhSrc + ".jpg";
                        srcList.push(temp);
                    }
                    if (windowInfos[i].ytlhSrc != null && windowInfos[i].ytlhSrc.length > 0) {
                        var temp = {};
                        temp.name = "岩体裂化程度";
                        temp.url = "http://www.cq107chy.com:4022/SurImage/xiepo/" + windowInfos[i].ytlhSrc + ".jpg";
                        srcList.push(temp);
                    }
                    if (srcList.length > 0) {
                        xiepo.srcList = srcList;
                    } else {
                        xiepo.srcList = "";
                    }

                    xiepotabledata.push(xiepo);
                }
                xiepotableview.reload({ id: 'xiepotableviewid', data: xiepotabledata });
            }
        }, datatype: "json"
    });
}
var xiugaiList = [];
//识别图片查看
function xiePuoPhotoSee(datatemp) {
    if (xiePoChakanlayerindex != null) {
        layer.msg("已打开查看窗口", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    xiePoChakanlayerindex = layer.open({
        type: 1
        , title: [datatemp.name + '图片查看', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['420px', '400px']
        , shade: 0
        , offset: 'auto'
        , closeBtn: 1
        , maxmin: true
        , moveOut: true
        , content: srcChaKan
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);

            if (datatemp.appdSrc != null && datatemp.appdSrc.length > 0) {
                document.getElementById("appdSrcId").src = "http://www.cq107chy.com:4022/SurImage/xiepo/" + datatemp.appdSrc + ".jpg";
            } else {
                $("#appdSrcId").hide();
            }


            if (datatemp.apjgSrc != null && datatemp.apjgSrc.length > 0) {
                document.getElementById("apjgSrcId").src = "http://www.cq107chy.com:4022/SurImage/xiepo/" + datatemp.apjgSrc + ".jpg";
            } else {
                $("#apjgSrcId").hide();
            }
            if (datatemp.xpbjSrc != null && datatemp.xpbjSrc.length > 0) {
                document.getElementById("xpbjSrcId").src = "http://www.cq107chy.com:4022/SurImage/xiepo/" + datatemp.xpbjSrc + ".jpg";
            } else {
                $("#xpbjSrcId").hide();
            }
            if (datatemp.yxyzSrc != null && datatemp.yxyzSrc.length > 0) {
                document.getElementById("yxyzSrcId").src = "http://www.cq107chy.com:4022/SurImage/xiepo/" + datatemp.yxyzSrc + ".jpg";
            } else {
                $("#yxyzSrcId").hide();
            }
            if (datatemp.rucSrc != null && datatemp.rucSrc.length > 0) {
                document.getElementById("rucSrcId").src = "http://www.cq107chy.com:4022/SurImage/xiepo/" + datatemp.rucSrc + ".jpg";
            } else {
                $("#rucSrcId").hide();
            }
            if (datatemp.ytjgSrc != null && datatemp.ytjgSrc.length > 0) {
                document.getElementById("ytjgSrcId").src = "http://www.cq107chy.com:4022/SurImage/xiepo/" + datatemp.ytjgSrc + ".jpg";
            } else {
                $("#ytjgSrcId").hide();
            }
            if (datatemp.ytfhSrc != null && datatemp.ytfhSrc.length > 0) {
                document.getElementById("ytfhSrcId").src = "http://www.cq107chy.com:4022/SurImage/xiepo/" + datatemp.ytfhSrc + ".jpg";
            } else {
                $("#ytfhSrcId").hide();
            }
            if (datatemp.ytlhSrc != null && datatemp.ytlhSrc.length > 0) {
                document.getElementById("ytlhSrcId").src = "http://www.cq107chy.com:4022/SurImage/xiepo/" + datatemp.ytlhSrc + ".jpg";
            } else {
                $("#ytlhSrcId").hide();
            }
            viewerPhoto = new Viewer(document.getElementById('xiepochakan'), {
                toolbar: true, //显示工具条
                viewed() {
                    viewerPhoto.zoomTo(1.2); // 图片显示比例 75%
                },
                zIndex: 99999999,
                navbar: false,
                show: function () {  // 动态加载图片后，更新实例
                    viewerPhoto.update();
                },
            });

        }
        , btn: ['重定位','提交']
        , yes: function (index, layero) {
            
            console.log(datatemp);
            var pointList = datatemp.postion;
            var tempPointList = [];
            for (var i = 0; i < pointList.length;i++) {
                tempPointList.push(new Cesium.Cartesian3.fromDegrees(pointList[i].L, pointList[i].B, pointList[i].H));
            }
            var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

            
            //viewer.scene.globe.depthTestAgainstTerrain = false;//模型测量
            
           
          
            var minHeight = 145;
            scene.clampToHeightMostDetailed(tempPointList).then(function (clampedCartesians) {
                // 每个点的高度
                for (var i = 0; i < clampedCartesians.length; i++) {
                    var heights = Cesium.Cartographic.fromCartesian(clampedCartesians[i]).height;
                    console.log(clampedCartesians[i]);
                    console.log(heights);
                    if (heights < minHeight && heights>0) {
                        minHeight = heights;
                    }
                    if (heights < 0) {//模型不够，地形来凑。
                        
                        clampedCartesians[i] = new Cesium.Cartesian3.fromDegrees(pointList[i].L, pointList[i].B, minHeight);
                        //viewer.scene.globe.depthTestAgainstTerrain = true;//地形测量
                        //var postionLB = new Cesium.Cartographic(Math.PI / 180 * pointList[i].L, Math.PI / 180 * pointList[i].B);
                        //var Heights = scene.sampleHeight(postionLB);
                        //if (Heights > 0) {
                        //    clampedCartesians[i] = new Cesium.Cartesian3.fromDegrees(pointList[i].L, pointList[i].B, Heights+28);
                        //}
                        console.log(new Cesium.Cartesian3.fromDegrees(pointList[i].L, pointList[i].B, minHeight));
                        //viewer.scene.globe.depthTestAgainstTerrain = false;//模型测量
                    }

                }

                 viewer.entities.add({
                    //id: "section123",
                    polyline: {
                        positions: clampedCartesians,
                        width: 1,
                        arcType: Cesium.ArcType.RHUMB,
                        material: Cesium.Color.YELLOW,
                        depthFailMaterial: Cesium.Color.YELLOW,
                    }
                });
                xiugaiList = clampedCartesians;
                layer.close(loadingminindex);
            });
            return false;
        }, btn2: function (index, layero) {
            if (xiugaiList.length==0) {//
                layer.msg("请先重新定位", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                return false;
            }
            console.log(datatemp);
            var data = {};
            //存下当前视角
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

            data.level = JSON.stringify(home);
            data.points = JSON.stringify(xiugaiList);
            data.cookie = document.cookie;
            data.id = datatemp.id;

            var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

            $.ajax({
                url: servicesurl + "/api/FlzWindowInfo/UpdateBianJieFlzSteepHill", type: "post", data: data,
                success: function (result) {
                    layer.close(loadinglayerindex);
                    if (result == "更新成功") {
                        ClearTemp();

                        //for (var i in layers) {
                        //    if (layers[i].type == "DIZHIFA") {

                        //        for (var j in layers[i].children) {
                        //            if (layers[i].children[j].id == "DIZHISON_" + datatemp.id) {
                        //                layers[i].children[j].datas = datatemp;
                        //                layers[i].children[j].checked = true;
                        //                layers[i].children[j].spread = true;
                        //                layers[i].spread = true;
                        //                break;
                        //            }
                        //        }
                        //    }
                        //}
                        //modeljiazaiFlag = false;
                        //tree.reload('prjlayerlistid', { data: layers });
                        //ClearTemp();
                        layer.msg("提交成功。", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                        //////if (xiePuoIndex != null) {
                        //////    layer.restore(xiePuoIndex);
                        //////    GetSteepHillInfoList({ "jieLun": "" });
                        //////}
                        //关闭

                        //layer.close(xiePuoinfoaddlayerindex);
                    }
                    else {
                        //更新失败
                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }
                }, datatype: "json"
            });

            return false;
        }, 
        end: function () {
            xiePoChakanlayerindex = null;
        }
    });
}
//识别删除
function deleteDiZhiShiBie(data) {
    var temp = {};
    temp.id = data.id;
    temp.cookie = document.cookie;
    var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

    $.ajax({
        url: servicesurl + "/api/FlzWindowInfo/DeleteFlzSteepHill", type: "delete", data: temp,
        success: function (result) {
            layer.close(loadinglayerindex);
            if (result == "删除成功") {
                layer.msg("删除成功", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                for (var i in layers) {
                    if (layers[i].type == "DIZHIFA") {
                        if (layers[i].children.length==0) {//当只有一条的时候
                            layers.splice(i, 1);
                            break;
                        }
                        for (var j in layers[i].children) {
                            if (layers[i].children[j].id == "DIZHISON_" + data.id) {
                                layers[i].children.splice(j, 1)
                                layers[i].spread = true;
                                break;
                            } 
                        }
                    }
                }
               
                modeljiazaiFlag = false;
                tree.reload('prjlayerlistid', { data: layers });
                viewer.entities.removeById("DIZHISON_" + data.id);
                viewer.entities.removeById("DIZHISON_" + data.id + "_LABEL");
                ClearTemp();
                if (xiePuoIndex!=null) {
                    GetSteepHillInfoList({ "jieLun": "" });
                }
            } else {
                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }
        }, datatype: "json"
    });
}