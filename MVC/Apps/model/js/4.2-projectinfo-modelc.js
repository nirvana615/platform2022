var newprojectentities = [];




//地图选点
function mapPosition(type) {
    if (handler != undefined) {
        handler.destroy();
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    if (newprojectentities != null) {
        //删除地图选点标注
        RemoveEntitiesInViewer(newprojectentities);
    }

    viewer.scene.globe.depthTestAgainstTerrain = true;

    //左击
    handler.setInputAction(function (leftclick) {
        RemoveEntitiesInViewer(newprojectentities);
        newprojectentities = [];
        var position = viewer.scene.pickPosition(leftclick.position);
        if (position != undefined) {
            var cartesian3 = Cesium.Cartographic.fromCartesian(position);                        //笛卡尔XYZ
            var longitude = Cesium.Math.toDegrees(cartesian3.longitude);                         //经度
            var latitude = Cesium.Math.toDegrees(cartesian3.latitude);                           //纬度
            var height = cartesian3.height;

            if (type == "edit") {
                form.val("editModelprojectinfoform", {
                    "model_zxjd_edit": longitude.toFixed(6)
                    , "model_zxwd_edit": latitude.toFixed(6)
                });
            }
            else if (type == "add") {
                form.val("addModelprojectinfoform", {
                    "model_zxjd_add": longitude.toFixed(6)
                    , "model_zxwd_add": latitude.toFixed(6)
                });
            }
           
            viewer.scene.globe.depthTestAgainstTerrain = true;
            if (Cesium.defined(position)) {
                var projectentity = new Cesium.Entity({
                    name: "NEW_Point",
                    position: position,
                    point: {
                        pixelSize: 12,
                        color: Cesium.Color.RED,
                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                    }
                });
                newprojectentities.push(projectentity);

                //针对移动设备
                if (isMobile.any()) {
                    if (handler != undefined) {
                        handler.destroy();
                    }
                }
            }

        }
        AddEntitiesInViewer(newprojectentities);

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
};
//清除地图选点
function ClearMapPoint() {
    //删除地图选点标注
    RemoveEntitiesInViewer(newprojectentities);
    newprojectentities = [];
    if (handler != undefined) {
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);//移除事件
        handler.destroy();
    }
};

//项目信息
function ModelProjectInfo(id, style) {
    if (style == "view") {
        //查看项目
        if (modelprojectinfoviewlayerindex == null) {
            modelprojectinfoviewlayerindex = layer.open({
                type: 1
                , title: ['查看项目信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['500px', '420px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , anim: 0
                , maxmin: true
                , moveOut: true
                , resize: false
                , content: '<!--查看项目信息--> <form class="layui-form" style="margin-top:5px;margin-right:10px;" lay-filter="viewModelprojectinfoform"> <div class="layui-form-item"> <label class="layui-form-label">项目名称</label> <div class="layui-input-block"> <input type="text" name="model_xmmc_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">项目编码</label> <div class="layui-input-block"> <input type="text" name="model_xmbm_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">行政区划</label> <div class="layui-input-block"> <input type="text" name="model_xzqh_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">项目位置</label> <div class="layui-input-block"> <input type="text" name="model_xmwz_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">中心经度</label> <div class="layui-input-block"> <input type="text" name="model_zxjd_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">中心纬度</label> <div class="layui-input-block"> <input type="text" name="model_zxwd_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">项目时间</label> <div class="layui-input-block"> <input type="text" name="model_xmsj_view" readonly="readonly" class="layui-input" /> </div> </div><div class="layui-form-item"> <label class="layui-form-label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label> <div class="layui-input-block"> <input type="text" name="model_bz_view" readonly="readonly" class="layui-input"> </div> </div> </form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    form.render();
                }
                , end: function () {
                    modelprojectinfoviewlayerindex = null;
                }
            });
        }

        //异步获取项目信息
        $.ajax({
            url: servicesurl + "/api/ModelProject/GetModelProjectInfo", type: "get", data: { "id": id, "cookie": document.cookie },
            success: function (data) {
                var result = JSON.parse(data);
                if (result.code == 1) {
                    var modelprojectinfo = JSON.parse(result.data);

                    form.val("viewModelprojectinfoform", {
                        "model_xmmc_view": modelprojectinfo.XMMC
                        , "model_xmbm_view": modelprojectinfo.XMBM
                        , "model_zxjd_view": modelprojectinfo.ZXJD
                        , "model_zxwd_view": modelprojectinfo.ZXWD
                        , "model_xmsj_view": modelprojectinfo.XMSJ
                        , "model_xmwz_view": modelprojectinfo.XMWZ
                        , "model_bz_view": modelprojectinfo.BZ
                    });
                    //翻译项目位置
                    if (xjxzqs.length > 0) {
                        for (var i in xjxzqs) {
                            if (xjxzqs[i].value == modelprojectinfo.XZQBM) {
                                var xzqh = "重庆市" + xjxzqs[i].name;
                                form.val("viewModelprojectinfoform", {
                                    "model_xzqh_view": xzqh
                                });
                            }
                        }
                    }
                }
                else {
                    form.val("viewModelprojectinfoform", {
                        "model_xmmc_view": ""
                        , "model_xmbm_view": ""
                        , "model_xmwz_view": ""
                        , "model_zxjd_view": ""
                        , "model_zxwd_view": ""
                        , "model_xmsj_view": ""
                        , "model_xzqh_view": ""
                        , "model_bz_view": ""
                    });
                }

            }, datatype: "json"
        });


    }
    else if (style == "edit") {
        //编辑项目
        if (modelprojectinfoeditlayerindex == null) {
            modelprojectinfoeditlayerindex = layer.open({
                type: 1
                , title: ['编辑项目信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['500px', '495px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , resize: false
                , content: '<!--编辑项目--> <form class="layui-form" style="margin-top:5px;margin-right:20px;" lay-filter="editModelprojectinfoform"> <div class="layui-form-item"> <label class="layui-form-label">项目名称</label> <div class="layui-input-block"><input type="text" name="model_xmmc_edit" autocomplete="off" lay-verify="required" class="layui-input" /></div> </div> <div class="layui-form-item"> <label class="layui-form-label">项目编码</label> <div class="layui-input-block"> <input type="text" name="model_xmbm_edit" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">行政区划</label> <div class="layui-input-block"><select id="province1id" name="model_province_edit" disabled="disabled" lay-verify="required"><option value="">省/市</option><option value="0" selected>重庆市</option></select></div></div> <div class="layui-form-item"> <label class="layui-form-label"></label> <div class="layui-input-block"><select id="district1id" name="model_district_edit" disabled="disabled" lay-verify="required"><option value="">区/县</option></select></div> </div> <div class="layui-form-item"> <div class="grid-demo"> <label class="layui-form-label">项目位置</label> <div class="layui-input-block"><input type="text" name="model_xmwz_edit" autocomplete="off" class="layui-input" /></div> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md9"> <div class="layui-form-item"> <div class="grid-demo"> <label class="layui-form-label">中心经度</label> <div class="layui-input-block"><input type="text" name="model_zxjd_edit" autocomplete="off" lay-verify="required|number" class="layui-input" /></div> </div> </div> <div class="layui-form-item"> <div class="grid-demo"> <label class="layui-form-label">中心纬度</label> <div class="layui-input-block"><input type="text" name="model_zxwd_edit" autocomplete="off" lay-verify="required|number" class="layui-input" /></div> </div> </div> </div><div class="layui-col-md3"> <div class="grid-demo" style="width:90%;height:90%;margin-left:10px;"> <div class="layui-input-inline" style="width:100%;height:100%;"> <button type="button" id="map_position_edit" class="layui-btn layui-btn-primary" title="地图选点" style="width:100%;height:100%;border-radius:10px;"> <svg t="1641451887073" class="icon" style="position:relative;top:8px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7602" width="100%" height="100%"><path d="M512 621.696l-150.848-150.826667 30.165333-30.186666L512 561.365333l120.682667-120.682666 30.165333 30.165333L512 621.696z m150.848-150.826667l-30.165333-30.186666a170.666667 170.666667 0 1 0-241.365334 0L361.173333 470.826667c-83.306667-83.306667-83.306667-218.389333 0-301.696 83.306667-83.306667 218.389333-83.306667 301.696 0 83.306667 83.306667 83.306667 218.389333 0 301.696zM512 362.666667a42.666667 42.666667 0 1 1 0-85.333334 42.666667 42.666667 0 0 1 0 85.333334z m-134.186667 365.290666a21.333333 21.333333 0 1 1 30.144-30.165333l110.634667 110.613333L857.664 469.333333H768v-42.666666h106.538667A63.936 63.936 0 0 1 938.666667 490.474667V874.88A64 64 0 0 1 874.602667 938.666667H149.397333A63.914667 63.914667 0 0 1 85.333333 874.858667V490.453333A63.808 63.808 0 0 1 149.461333 426.666667H256v42.666666H149.461333A21.141333 21.141333 0 0 0 128 490.474667v302.208l200.042667-200.042667a21.205333 21.205333 0 0 1 30.058666 0.128c8.32 8.32 8.192 21.973333 0.106667 30.037333L130.474667 850.56a21.333333 21.333333 0 0 1-2.474667 2.133333v22.186667c0 11.669333 9.536 21.141333 21.397333 21.141333h396.437334l-168.042667-168.042666zM874.581333 896A21.333333 21.333333 0 0 0 896 874.858667V491.050667a21.973333 21.973333 0 0 1-1.984 2.261333L548.757333 838.592l54.186667 54.186667c1.002667 1.002667 1.898667 2.090667 2.666667 3.221333h269.013333z" fill="#8a8a8a" p-id="7603"></path></svg> </button> </div> </div> </div> </div> </div> <div class="layui-form-item"> <div class="grid-demo"> <label class="layui-form-label">项目时间</label> <div class="layui-input-block"><input type="text" id="xmsjid" name="model_xmsj_edit" lay-verify="date" placeholder="YYYY-MM-DD" class="layui-input" /></div> </div> </div><div class="layui-form-item"> <label class="layui-form-label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label> <div class="layui-input-block"><input type="text" name="model_bz_edit" class="layui-input"></div> </div> <div class="layui-form-item" style="margin-top:10px"> <div style="text-align:center"> <button type="submit" class="layui-btn" lay-submit="" lay-filter="editModelprojectinfosubmit" style="width:100px;border-radius:5px;">保存</button> </div> </div> </form>'
                , success: function (layero) {
                    layer.setTop(layero);

                    form.render();//更新渲染

                }
                , end: function () {
                    modelprojectinfoeditlayerindex = null;
                    ClearMapPoint();
                }
                , cancel: function () {
                    modelprojectinfoeditlayerindex = null;
                    ClearMapPoint();
                }
            })
        }
        //项目信息
        $.ajax({
            url: servicesurl + "/api/ModelProject/GetModelProjectInfo", type: "get", data: { "id": id, "cookie": document.cookie },
            success: function (data) {
                var result = JSON.parse(data);
                if (result.code == 1) {
                    var modelprojectinfo = JSON.parse(result.data);
                    form.val("editModelprojectinfoform", {
                        "model_xmmc_edit": modelprojectinfo.XMMC
                        , "model_xmbm_edit": modelprojectinfo.XMBM
                        , "model_zxjd_edit": modelprojectinfo.ZXJD
                        , "model_zxwd_edit": modelprojectinfo.ZXWD
                        , "model_xmwz_edit": modelprojectinfo.XMWZ
                        , "model_xmsj_edit": modelprojectinfo.XMSJ
                        , "model_bz_edit": modelprojectinfo.BZ
                    })


                    if (xjxzqs.length > 0) {
                        for (var i in xjxzqs) {
                            if (xjxzqs[i].value == modelprojectinfo.XZQBM) {
                                document.getElementById("district1id").innerHTML += '<option value="' + xjxzqs[i].value + '" selected>' + xjxzqs[i].name + '</option>';
                            }
                            else {
                                document.getElementById("district1id").innerHTML += '<option value="' + xjxzqs[i].value + '">' + xjxzqs[i].name + '</option>';
                            }
                        }
                    }

                }
                else {
                    var modelprojectinfo = JSON.parse(resule.data);
                    form.val("editModelprojectinfoform", {
                        "model_xmmc_edit": ""
                        , "model_xmwz_edit": ""
                        , "model_zxjd_edit": ""
                        , "model_zxwd_edit": ""
                        , "model_xmsj_edit": ""
                        , "model_bz_edit": ""
                    })
                }
                //渲染开始时间&结束时间
                date.render({
                    elem: '#xmsjid'
                });
                form.render();//更新渲染
                form.render('select');//更新渲染select  数据库枚举选项，不然显示不出来
            }, datatype: "json"
        });

        //更新项目
        form.on('submit(editModelprojectinfosubmit)', function (data) {
            data.field.id = id;
            data.field.cookie = document.cookie;

            $.ajax({
                url: servicesurl + "/api/ModelProject/UpdateModelProject", type: "put", data: data.field,
                success: function (data) {
                    var result = JSON.parse(data);
                    layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    layer.close(modelprojectinfoeditlayerindex);  //关闭模块
                    //删除地图选点标注
                    ClearMapPoint();
                    //刷新项目列表
                    GetUserAllModelProjects(result.data);
                }, datatype: "json"
            });
            return false;
        });

        //地图选点
        $("#map_position_edit").on("click", function () {
            mapPosition("edit");//地图选点

        });

    }
    else if (style == "add") {
        //新建项目
        if (modelprojectinfoaddlayerindex == null) {
            modelprojectinfoaddlayerindex = layer.open({
                type: 1
                , title: ['新建项目', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['500px', '450px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , scrollbar: false
                , resize: false
                , content: '<!--创建项目--><form class="layui-form" style="margin-top:5px;margin-right:20px;" lay-filter="addModelprojectinfoform"><div class="layui-form-item"><label class="layui-form-label">项目名称</label><div class="layui-input-block"><input type="text" name="model_xmmc_add" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">行政区划</label><div class="layui-input-block"><select id="province1id" name="model_province_add" lay-verify="required"><option value="">省/市</option><option value="0">重庆市</option></select></div></div><div class="layui-form-item"><label class="layui-form-label"></label><div class="layui-input-block"><select id="district1id_add" name="model_district_add" lay-verify="required"><option value="">区/县</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">项目位置</label><div class="layui-input-block"><input type="text" id="model_xmwz_add" name="model_xmwz_add" autocomplete="off" placeholder="详细位置(乡镇村)" class="layui-input" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md9"><div class="layui-form-item"><label class="layui-form-label">中心经度</label><div class="layui-input-block"><input type="text" name="model_zxjd_add" autocomplete="off" placeholder="请输入" lay-verify="required|number" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">中心纬度</label><div class="layui-input-block"><input type="text" name="model_zxwd_add" autocomplete="off" placeholder="请输入" lay-verify="required|number" class="layui-input" /></div></div></div><div class="layui-col-md3"><div class="grid-demo" style="width:90%;height:90%;margin-left:10px;"><div class="layui-input-inline" style="width:100%;height:100%;"><button type="button" id="map_position_add" class="layui-btn layui-btn-primary" title="地图选点" style="width:100%;height:100%;border-radius:10px;"><svg t="1641451887073" class="icon" style="position:relative;top:8px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7602" width="100%" height="100%"><path d="M512 621.696l-150.848-150.826667 30.165333-30.186666L512 561.365333l120.682667-120.682666 30.165333 30.165333L512 621.696z m150.848-150.826667l-30.165333-30.186666a170.666667 170.666667 0 1 0-241.365334 0L361.173333 470.826667c-83.306667-83.306667-83.306667-218.389333 0-301.696 83.306667-83.306667 218.389333-83.306667 301.696 0 83.306667 83.306667 83.306667 218.389333 0 301.696zM512 362.666667a42.666667 42.666667 0 1 1 0-85.333334 42.666667 42.666667 0 0 1 0 85.333334z m-134.186667 365.290666a21.333333 21.333333 0 1 1 30.144-30.165333l110.634667 110.613333L857.664 469.333333H768v-42.666666h106.538667A63.936 63.936 0 0 1 938.666667 490.474667V874.88A64 64 0 0 1 874.602667 938.666667H149.397333A63.914667 63.914667 0 0 1 85.333333 874.858667V490.453333A63.808 63.808 0 0 1 149.461333 426.666667H256v42.666666H149.461333A21.141333 21.141333 0 0 0 128 490.474667v302.208l200.042667-200.042667a21.205333 21.205333 0 0 1 30.058666 0.128c8.32 8.32 8.192 21.973333 0.106667 30.037333L130.474667 850.56a21.333333 21.333333 0 0 1-2.474667 2.133333v22.186667c0 11.669333 9.536 21.141333 21.397333 21.141333h396.437334l-168.042667-168.042666zM874.581333 896A21.333333 21.333333 0 0 0 896 874.858667V491.050667a21.973333 21.973333 0 0 1-1.984 2.261333L548.757333 838.592l54.186667 54.186667c1.002667 1.002667 1.898667 2.090667 2.666667 3.221333h269.013333z" fill="#8a8a8a" p-id="7603"></path></svg></button></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label">项目时间</label><div class="layui-input-block"><input type="text" id="xmsjid" name="model_xmsj_add" lay-verify="required|date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label><div class="layui-input-block"><input type="text" name="model_bz_add" placeholder="请输入" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item" style="margin-top:10px"><div style="text-align:center"><button type="submit" class="layui-btn" lay-submit="" lay-filter="addModelprojectinfosubmit" style="width:20%;border-radius:5px;">提交</button><button type="reset" id="model_reset_add" class="layui-btn layui-btn-primary" style="width:100px;border-radius:5px;">重置</button></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    depthTestAgainstTerrain = viewer.scene.globe.depthTestAgainstTerrain;//记录当前深度检测值

                    if (xjxzqs.length > 0) {
                        for (var i in xjxzqs) {
                            document.getElementById("district1id_add").innerHTML += '<option value="' + xjxzqs[i].value + '">' + xjxzqs[i].name + '</option>';
                        }
                    }

                    //渲染开始时间&结束时间
                    date.render({
                        elem: '#xmsjid'
                    });
                    form.render();
                    form.render('select');

                    form.on('submit(addModelprojectinfosubmit)', function (data) {
                        data.field.cookie = document.cookie;

                        $.ajax({
                            url: servicesurl + "/api/ModelProject/AddModelProject", type: "post", data: data.field,
                            success: function (result) {
                                var info = JSON.parse(result);
                                if (info.code == 1) {
                                    layer.close(modelprojectinfoaddlayerindex);
                                    //删除地图选点标注
                                    ClearMapPoint();
                                    //刷新项目列表
                                    GetUserAllModelProjects(info.data);
                                }

                                layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            }, datatype: "json"
                        });

                        return false;
                    });
                }
                , end: function () {
                    modelprojectinfoaddlayerindex = null;
                    ClearMapPoint();
                    viewer.scene.globe.depthTestAgainstTerrain = depthTestAgainstTerrain;
                }
            });
        }
        else {
            layer.setTop(modelprojectinfoaddlayerindex);
        }

        $("#map_position_add").on("click", function () {
            mapPosition("add");//地图选点

        });
        $("#model_reset_add").on("click", function () {
            RemoveEntitiesInViewer(newprojectentities);//点击重置删除标注
        });
    }
};
