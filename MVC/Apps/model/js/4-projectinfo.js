//新建模型项目
function AddModelProject() {
    if (modelprojectinfoaddlayerindex == null) {
        modelprojectinfoaddlayerindex = layer.open({
            type: 1
            , title: ['新建项目', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['500px', '490px']
            , shade: 0
            , offset: 'auto'
            , closeBtn: 1
            , maxmin: true
            , moveOut: true
            , scrollbar: false
            , resize: false
            , content: '<div style="overflow:hidden;"><!--创建项目--><form class="layui-form" style="margin-top:5px;margin-right:20px;" lay-filter="addModelprojectform"><div class="layui-form-item"><label class="layui-form-label">项目名称</label><div class="layui-input-block"><input type="text" name="model_xmmc_add" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">项目简称</label><div class="layui-input-block"><input type="text" name="model_xmjc_add" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">行政区划</label><div class="layui-input-block"><select id="province1id" name="model_province_add" lay-verify="required"><option value="">省/市</option><option value="0">重庆市</option></select></div></div><div class="layui-form-item"><label class="layui-form-label"></label><div class="layui-input-block"><select id="district1id_add" name="model_district_add" lay-verify="required"><option value="">区/县</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">项目位置</label><div class="layui-input-block"><input type="text" id="model_xmwz_add" name="model_xmwz_add" autocomplete="off" placeholder="详细位置(乡镇村)" class="layui-input" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md9"><div class="layui-form-item"><label class="layui-form-label">中心经度</label><div class="layui-input-block"><input type="text" name="model_zxjd_add" autocomplete="off" placeholder="请输入" lay-verify="required|number" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">中心纬度</label><div class="layui-input-block"><input type="text" name="model_zxwd_add" autocomplete="off" placeholder="请输入" lay-verify="required|number" class="layui-input" /></div></div></div><div class="layui-col-md3"><div class="grid-demo" style="width:90%;height:90%;margin-left:10px;"><div class="layui-input-inline" style="width:100%;height:100%;"><button type="button" id="map_position_add" class="layui-btn layui-btn-primary" title="地图选点" style="width:100%;height:100%;border-radius:10px;"><svg t="1641451887073" class="icon" style="position:relative;top:8px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7602" width="100%" height="100%"><path d="M512 621.696l-150.848-150.826667 30.165333-30.186666L512 561.365333l120.682667-120.682666 30.165333 30.165333L512 621.696z m150.848-150.826667l-30.165333-30.186666a170.666667 170.666667 0 1 0-241.365334 0L361.173333 470.826667c-83.306667-83.306667-83.306667-218.389333 0-301.696 83.306667-83.306667 218.389333-83.306667 301.696 0 83.306667 83.306667 83.306667 218.389333 0 301.696zM512 362.666667a42.666667 42.666667 0 1 1 0-85.333334 42.666667 42.666667 0 0 1 0 85.333334z m-134.186667 365.290666a21.333333 21.333333 0 1 1 30.144-30.165333l110.634667 110.613333L857.664 469.333333H768v-42.666666h106.538667A63.936 63.936 0 0 1 938.666667 490.474667V874.88A64 64 0 0 1 874.602667 938.666667H149.397333A63.914667 63.914667 0 0 1 85.333333 874.858667V490.453333A63.808 63.808 0 0 1 149.461333 426.666667H256v42.666666H149.461333A21.141333 21.141333 0 0 0 128 490.474667v302.208l200.042667-200.042667a21.205333 21.205333 0 0 1 30.058666 0.128c8.32 8.32 8.192 21.973333 0.106667 30.037333L130.474667 850.56a21.333333 21.333333 0 0 1-2.474667 2.133333v22.186667c0 11.669333 9.536 21.141333 21.397333 21.141333h396.437334l-168.042667-168.042666zM874.581333 896A21.333333 21.333333 0 0 0 896 874.858667V491.050667a21.973333 21.973333 0 0 1-1.984 2.261333L548.757333 838.592l54.186667 54.186667c1.002667 1.002667 1.898667 2.090667 2.666667 3.221333h269.013333z" fill="#8a8a8a" p-id="7603"></path></svg></button></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label">项目时间</label><div class="layui-input-block"><input type="text" id="xmsjid" name="model_xmsj_add" lay-verify="required|date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label><div class="layui-input-block"><input type="text" name="model_bz_add" placeholder="请输入" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item" style="margin-top:10px"><div style="text-align:center"><button type="submit" class="layui-btn" lay-submit="" lay-filter="addModelprojectsubmit" style="width:20%;border-radius:5px;">提交</button><button type="reset" id="model_reset_add" class="layui-btn layui-btn-primary" style="width:100px;border-radius:5px;">重置</button></div></div></form></div>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                //监听事件
                $("#map_position_add").on("click", function () {
                    mapPosition("add");//地图选点
                });
                $("#model_reset_add").on("click", function () {
                    ClearMapPoint();//清除临时点
                });

                depthTestAgainstTerrain = viewer.scene.globe.depthTestAgainstTerrain;//记录当前深度检测值

                if (xjxzqs.length > 0) {
                    for (var i in xjxzqs) {
                        document.getElementById("district1id_add").innerHTML += '<option value="' + xjxzqs[i].value + '">' + xjxzqs[i].name + '</option>';
                    }
                }

                date.render({ elem: '#xmsjid' });
                form.render('select');
                form.render();

                for (var i = 0; i < document.getElementsByClassName("layui-anim layui-anim-upbit").length; i++) {
                    document.getElementsByClassName("layui-anim layui-anim-upbit")[i].style.maxHeight = "250px";
                }

                //创建模型项目
                form.on('submit(addModelprojectsubmit)', function (data) {
                    loadlayerindex = layer.load(1, { offset: 'auto', area: ['37px', '37px'], zIndex: layer.zIndex, shade: [0.5, '#393D49'], success: function (layero) { layer.setTop(layero); } });
                    data.field.cookie = document.cookie;

                    $.ajax({
                        url: servicesurl + "/api/ModelProject/AddModelProject", type: "post", data: data.field,
                        success: function (result) {
                            CloseLayer(loadlayerindex);

                            var info = JSON.parse(result);
                            if (info.code == 1) {
                                var modelproject = JSON.parse(info.data);

                                var newproject = new Object;
                                newproject.id = modelproject.Id;
                                newproject.title = modelproject.XMSJ.split("-").join("") + " " + modelproject.XMMC;
                                newproject.type = "modelproject";
                                newproject.data = modelproject;
                                newproject.nodeOperate = true;
                                newproject.spread = false;

                                var isContain = false;
                                for (var i in modelprojectlistarea) {
                                    if (modelprojectlistarea[i].id == modelproject.XZQBM) {
                                        isContain = true;
                                        modelprojectlistarea[i].spread = true;

                                        var childs = [];
                                        childs.push(newproject);

                                        for (var j in modelprojectlistarea[i].children) {
                                            modelprojectlistarea[i].children[j].spread = false;

                                            if (modelprojectlistarea[i].children[j].children != undefined && modelprojectlistarea[i].children[j].children.length > 0) {
                                                for (var k in modelprojectlistarea[i].children[j].children) {
                                                    modelprojectlistarea[i].children[j].children[k].checked = false;
                                                }
                                            }

                                            childs.push(modelprojectlistarea[i].children[j]);
                                        }

                                        modelprojectlistarea[i].children = childs;
                                    }
                                    else {
                                        modelprojectlistarea[i].spread = false;

                                        for (var j in modelprojectlistarea[i].children) {
                                            modelprojectlistarea[i].children[j].spread = false;
                                            if (modelprojectlistarea[i].children[j].children != undefined && modelprojectlistarea[i].children[j].children.length > 0) {
                                                for (var k in modelprojectlistarea[i].children[j].children) {
                                                    modelprojectlistarea[i].children[j].children[k].checked = false;
                                                }
                                            }
                                        }
                                    }
                                }

                                if (!isContain) {
                                    var newmodelprojectlistarea = [];
                                    var xzq = new Object;
                                    xzq.id = modelproject.XZQBM;
                                    xzq.spread = true;
                                    if ((xjxzqs != null) && (xjxzqs.length > 0)) {
                                        for (var y in xjxzqs) {
                                            if (modelproject.XZQBM == xjxzqs[y].value) {
                                                xzq.title = xjxzqs[y].name;
                                            }
                                        }
                                    }
                                    else {
                                        xzq.title = modelproject.XZQBM;
                                    }

                                    var childs = [];
                                    childs.push(newproject);
                                    xzq.children = childs;
                                    newmodelprojectlistarea.push(xzq);

                                    for (var i in modelprojectlistarea) {
                                        newmodelprojectlistarea.push(modelprojectlistarea[i]);
                                    }

                                    modelprojectlistarea = newmodelprojectlistarea;
                                }

                                isContain = false;
                                for (var i in modelprojectlistyear) {
                                    if (modelprojectlistyear[i].id == modelproject.XMSJ.split("-")[0]) {
                                        isContain = true;
                                        modelprojectlistyear[i].spread = true;

                                        var childs = [];
                                        childs.push(newproject);

                                        for (var j in modelprojectlistyear[i].children) {
                                            modelprojectlistyear[i].children[j].spread = false;

                                            if (modelprojectlistyear[i].children[j].children != undefined && modelprojectlistyear[i].children[j].children.length > 0) {
                                                for (var k in modelprojectlistyear[i].children[j].children) {
                                                    modelprojectlistyear[i].children[j].children[k].checked = false;
                                                }
                                            }

                                            childs.push(modelprojectlistyear[i].children[j]);
                                        }

                                        modelprojectlistyear[i].children = childs;
                                    }
                                    else {
                                        modelprojectlistyear[i].spread = false;

                                        for (var j in modelprojectlistyear[i].children) {
                                            modelprojectlistyear[i].children[j].spread = false;

                                            if (modelprojectlistyear[i].children[j].children != undefined && modelprojectlistyear[i].children[j].children.length > 0) {
                                                for (var k in modelprojectlistyear[i].children[j].children) {
                                                    modelprojectlistyear[i].children[j].children[k].checked = false;
                                                }
                                            }
                                        }
                                    }
                                }

                                if (!isContain) {
                                    var newmodelprojectlistyear = [];
                                    var year = new Object;
                                    year.id = modelproject.XMSJ.split("-")[0];
                                    year.title = modelproject.XMSJ.split("-")[0];
                                    year.spread = true;

                                    var childs = [];
                                    childs.push(newproject);

                                    year.children = childs;
                                    newmodelprojectlistyear.push(year);

                                    for (var i in modelprojectlistyear) {
                                        newmodelprojectlistyear.push(modelprojectlistyear[i]);
                                    }

                                    modelprojectlistyear = newmodelprojectlistyear;
                                }

                                //清除模型
                                if (curtileset != null) {
                                    viewer.scene.primitives.remove(curtileset);//清除模型
                                    curtileset = null;
                                    currentmodelid = null;
                                }

                                currentprojectid = modelproject.Id;//赋值当前项目id
                                currentprojecttitle = modelproject.XMSJ.split("-").join("") + " " + modelproject.XMMC;//赋值当前项目标题
                                //添加项目图形
                                var newmodelprojectentity = new Cesium.Entity({
                                    id: "PROJECTCENTER_" + modelproject.Id,
                                    position: Cesium.Cartesian3.fromDegrees(modelproject.ZXJD, modelproject.ZXWD),
                                    billboard: {
                                        image: '../../Resources/img/model/modelprojecticon.png',
                                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                        width: 40,
                                        height: 40,
                                        disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                    }
                                });
                                projectentities.push(newmodelprojectentity);
                                AddEntityInViewer(newmodelprojectentity);

                                var newmodelprojectentitylabel = new Cesium.Entity({
                                    id: "PROJECTCENTER_LABEL_" + modelproject.Id,
                                    position: Cesium.Cartesian3.fromDegrees(modelproject.ZXJD, modelproject.ZXWD),
                                    label: {
                                        text: modelproject.XMMC,
                                        font: '20px Times New Roman',
                                        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                        pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                        disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                        scaleByDistance: new Cesium.NearFarScalar(90000, 1, 200000, 0)
                                    }
                                });
                                projectentities.push(newmodelprojectentitylabel);
                                AddEntityInViewer(newmodelprojectentitylabel);

                                isReloadTree = true;//标记重载
                                MarkCurrentProject();
                                isReloadTree = false;//重载后还原

                                layer.close(modelprojectinfoaddlayerindex);
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
};

//查看模型项目
function ViewModelProject(projectdata) {
    if (modelprojectinfoviewlayerindex != null) {
        ViewModelProjectHelper();
    }
    else {
        modelprojectinfoviewlayerindex = layer.open({
            type: 1
            , title: ['查看项目', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['500px', '440px']
            , shade: 0
            , offset: 'auto'
            , closeBtn: 1
            , anim: 0
            , maxmin: true
            , moveOut: true
            , resize: false
            , content: '<!--查看项目信息--><form class="layui-form" style="margin-top:5px;margin-right:10px;" lay-filter="viewModelprojectinfoform"><div class="layui-form-item"><label class="layui-form-label">项目名称</label><div class="layui-input-block"><input type="text" name="model_xmmc_view" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">项目简称</label><div class="layui-input-block"><input type="text" name="model_xmjc_view" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">项目编码</label><div class="layui-input-block"><input type="text" name="model_xmbm_view" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">行政区划</label><div class="layui-input-block"><input type="text" name="model_xzqh_view" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">项目位置</label><div class="layui-input-block"><input type="text" name="model_xmwz_view" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">中心经度</label><div class="layui-input-block"><input type="text" name="model_zxjd_view" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">中心纬度</label><div class="layui-input-block"><input type="text" name="model_zxwd_view" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">项目时间</label><div class="layui-input-block"><input type="text" name="model_xmsj_view" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label><div class="layui-input-block"><input type="text" name="model_bz_view" readonly="readonly" class="layui-input"></div></div></form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                ViewModelProjectHelper();
            }
            , end: function () {
                modelprojectinfoviewlayerindex = null;
            }
        });
    }

    function ViewModelProjectHelper() {
        form.val("viewModelprojectinfoform", {
            "model_xmmc_view": projectdata.XMMC
            , "model_xmjc_view": projectdata.XMJC
            , "model_xmbm_view": projectdata.XMBM
            , "model_zxjd_view": projectdata.ZXJD
            , "model_zxwd_view": projectdata.ZXWD
            , "model_xmsj_view": projectdata.XMSJ
            , "model_xmwz_view": projectdata.XMWZ
            , "model_bz_view": projectdata.BZ
        });

        //翻译项目位置
        if (xjxzqs.length > 0) {
            for (var i in xjxzqs) {
                if (xjxzqs[i].value == projectdata.XZQBM) {
                    var xzqh = "重庆市" + xjxzqs[i].name;
                    form.val("viewModelprojectinfoform", {
                        "model_xzqh_view": xzqh
                    });
                }
            }
        }
    };
};

//编辑模型项目
function EditModelProject(projectdata) {
    if (modelprojectinfoeditlayerindex != null) {
        EditModelProjectHelper();
    }
    else {
        modelprojectinfoeditlayerindex = layer.open({
            type: 1
            , title: ['编辑项目', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['500px', '535px']
            , shade: 0
            , offset: 'auto'
            , closeBtn: 1
            , maxmin: true
            , moveOut: true
            , resize: false
            , content: '<!--编辑项目--><form class="layui-form" style="margin-top:5px;margin-right:20px;" lay-filter="editModelprojectinfoform"><div class="layui-form-item"><label class="layui-form-label">项目名称</label><div class="layui-input-block"><input type="text" name="model_xmmc_edit" autocomplete="off" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">项目简称</label><div class="layui-input-block"><input type="text" name="model_xmjc_edit" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">项目编码</label><div class="layui-input-block"><input type="text" name="model_xmbm_edit" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">行政区划</label><div class="layui-input-block"><select id="province1id" name="model_province_edit" disabled="disabled" lay-verify="required"><option value="">省/市</option><option value="0" selected>重庆市</option></select></div></div><div class="layui-form-item"><label class="layui-form-label"></label><div class="layui-input-block"><select id="district1id" name="model_district_edit" disabled="disabled" lay-verify="required"><option value="">区/县</option></select></div></div><div class="layui-form-item"><div class="grid-demo"><label class="layui-form-label">项目位置</label><div class="layui-input-block"><input type="text" name="model_xmwz_edit" autocomplete="off" class="layui-input" /></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md9"><div class="layui-form-item"><div class="grid-demo"><label class="layui-form-label">中心经度</label><div class="layui-input-block"><input type="text" name="model_zxjd_edit" autocomplete="off" lay-verify="required|number" class="layui-input" /></div></div></div><div class="layui-form-item"><div class="grid-demo"><label class="layui-form-label">中心纬度</label><div class="layui-input-block"><input type="text" name="model_zxwd_edit" autocomplete="off" lay-verify="required|number" class="layui-input" /></div></div></div></div><div class="layui-col-md3"><div class="grid-demo" style="width:90%;height:90%;margin-left:10px;"><div class="layui-input-inline" style="width:100%;height:100%;"><button type="button" id="map_position_edit" class="layui-btn layui-btn-primary" title="地图选点" style="width:100%;height:100%;border-radius:10px;"><svg t="1641451887073" class="icon" style="position:relative;top:8px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7602" width="100%" height="100%"><path d="M512 621.696l-150.848-150.826667 30.165333-30.186666L512 561.365333l120.682667-120.682666 30.165333 30.165333L512 621.696z m150.848-150.826667l-30.165333-30.186666a170.666667 170.666667 0 1 0-241.365334 0L361.173333 470.826667c-83.306667-83.306667-83.306667-218.389333 0-301.696 83.306667-83.306667 218.389333-83.306667 301.696 0 83.306667 83.306667 83.306667 218.389333 0 301.696zM512 362.666667a42.666667 42.666667 0 1 1 0-85.333334 42.666667 42.666667 0 0 1 0 85.333334z m-134.186667 365.290666a21.333333 21.333333 0 1 1 30.144-30.165333l110.634667 110.613333L857.664 469.333333H768v-42.666666h106.538667A63.936 63.936 0 0 1 938.666667 490.474667V874.88A64 64 0 0 1 874.602667 938.666667H149.397333A63.914667 63.914667 0 0 1 85.333333 874.858667V490.453333A63.808 63.808 0 0 1 149.461333 426.666667H256v42.666666H149.461333A21.141333 21.141333 0 0 0 128 490.474667v302.208l200.042667-200.042667a21.205333 21.205333 0 0 1 30.058666 0.128c8.32 8.32 8.192 21.973333 0.106667 30.037333L130.474667 850.56a21.333333 21.333333 0 0 1-2.474667 2.133333v22.186667c0 11.669333 9.536 21.141333 21.397333 21.141333h396.437334l-168.042667-168.042666zM874.581333 896A21.333333 21.333333 0 0 0 896 874.858667V491.050667a21.973333 21.973333 0 0 1-1.984 2.261333L548.757333 838.592l54.186667 54.186667c1.002667 1.002667 1.898667 2.090667 2.666667 3.221333h269.013333z" fill="#8a8a8a" p-id="7603"></path></svg></button></div></div></div></div></div><div class="layui-form-item"><div class="grid-demo"><label class="layui-form-label">项目时间</label><div class="layui-input-block"><input type="text" id="xmsjid" name="model_xmsj_edit" lay-verify="date" placeholder="YYYY-MM-DD" class="layui-input" /></div></div></div><div class="layui-form-item"><label class="layui-form-label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label><div class="layui-input-block"><input type="text" name="model_bz_edit" class="layui-input"></div></div><div class="layui-form-item" style="margin-top:10px"><div style="text-align:center"><button type="submit" class="layui-btn" lay-submit="" lay-filter="editModelprojectinfosubmit" style="width:100px;border-radius:5px;">保存</button></div></div></form>'
            , success: function (layero) {
                layer.setTop(layero);

                //监听事件
                $("#map_position_edit").on("click", function () {
                    mapPosition("edit");//地图选点
                });

                EditModelProjectHelper();

                //更新项目
                form.on('submit(editModelprojectinfosubmit)', function (data) {
                    loadlayerindex = layer.load(1, { offset: 'auto', area: ['37px', '37px'], zIndex: layer.zIndex, shade: [0.5, '#393D49'], success: function (layero) { layer.setTop(layero); } });

                    data.field.id = projectdata.Id;
                    data.field.cookie = document.cookie;

                    $.ajax({
                        url: servicesurl + "/api/ModelProject/UpdateModelProject", type: "put", data: data.field,
                        success: function (result) {
                            CloseLayer(loadlayerindex);

                            var info = JSON.parse(result);
                            if (info.code == 1) {
                                var modifymodelproject = JSON.parse(info.data);

                                if (modifymodelproject.Id == currentprojectid) {
                                    currentprojecttitle = modifymodelproject.XMSJ.split("-").join("") + " " + modifymodelproject.XMMC;
                                }

                                for (var i in modelprojectlistarea) {
                                    for (var j in modelprojectlistarea[i].children) {
                                        if (modelprojectlistarea[i].children[j].id == modifymodelproject.Id) {
                                            modelprojectlistarea[i].children[j].title = modifymodelproject.XMSJ.split("-").join("") + " " + modifymodelproject.XMMC;
                                            modelprojectlistarea[i].children[j].data = modifymodelproject;
                                            break;
                                        }
                                    }
                                }

                                for (var i in modelprojectlistyear) {
                                    for (var j in modelprojectlistyear[i].children) {
                                        if (modelprojectlistyear[i].children[j].id == modifymodelproject.Id) {
                                            modelprojectlistyear[i].children[j].title = modifymodelproject.XMSJ.split("-").join("") + " " + modifymodelproject.XMMC;
                                            modelprojectlistyear[i].children[j].data = modifymodelproject;
                                            break;
                                        }
                                    }
                                }

                                isReloadTree = true;//标记重载
                                MarkCurrentProject();
                                isReloadTree = false;//重载后还原

                                for (var i in projectentities) {
                                    if (projectentities[i].id == ("PROJECTCENTER_" + modifymodelproject.Id)) {
                                        projectentities[i].position = Cesium.Cartesian3.fromDegrees(modifymodelproject.ZXJD, modifymodelproject.ZXWD);
                                    }

                                    if (projectentities[i].id == ("PROJECTCENTER_LABEL_" + modifymodelproject.Id)) {
                                        projectentities[i].label.text = modifymodelproject.XMMC;
                                        projectentities[i].position = Cesium.Cartesian3.fromDegrees(modifymodelproject.ZXJD, modifymodelproject.ZXWD);
                                    }
                                }

                                layer.close(modelprojectinfoeditlayerindex);  //关闭模块
                            }

                            layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }, datatype: "json"
                    });
                    return false;
                });

            }
            , end: function () {
                modelprojectinfoeditlayerindex = null;
                ClearMapPoint();
            }
        });
    }

    function EditModelProjectHelper() {
        form.val("editModelprojectinfoform", {
            "model_xmmc_edit": projectdata.XMMC
            , "model_xmjc_edit": projectdata.XMJC
            , "model_xmbm_edit": projectdata.XMBM
            , "model_zxjd_edit": projectdata.ZXJD
            , "model_zxwd_edit": projectdata.ZXWD
            , "model_xmwz_edit": projectdata.XMWZ
            , "model_xmsj_edit": projectdata.XMSJ
            , "model_bz_edit": projectdata.BZ
        })

        if (xjxzqs.length > 0) {
            for (var i in xjxzqs) {
                if (xjxzqs[i].value == projectdata.XZQBM) {
                    document.getElementById("district1id").innerHTML += '<option value="' + xjxzqs[i].value + '" selected>' + xjxzqs[i].name + '</option>';
                }
                else {
                    document.getElementById("district1id").innerHTML += '<option value="' + xjxzqs[i].value + '">' + xjxzqs[i].name + '</option>';
                }
            }
        }

        date.render({
            elem: '#xmsjid'
        });

        form.render('select');
        form.render();
    };
};

//删除模型项目
function DeleteModelProject(projectid) {
    $.ajax({
        url: servicesurl + "/api/ModelProject/DeleteModelProject", type: "delete", data: { "id": projectid, "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                //清除当前模型项目
                if (currentprojectid == projectid) {
                    currentprojectid = null;
                    currentprojecttitle = null;

                    //清除已加载模型
                    if (curtileset != null) {
                        viewer.scene.primitives.remove(curtileset);
                        curtileset = null;
                        currentmodelid = null;
                    }
                }

                //清除项目图形
                var newprojectentities = [];
                for (var i in projectentities) {
                    if (projectentities[i].id == ("PROJECTCENTER_" + projectid) || projectentities[i].id == ("PROJECTCENTER_LABEL_" + projectid)) {
                        RemoveEntityInViewer(projectentities[i]);
                    }
                    else {
                        newprojectentities.push(projectentities[i]);
                    }
                }
                projectentities = newprojectentities;

                var newmodelprojectlistarea = [];
                for (var i in modelprojectlistarea) {
                    var projects = [];
                    for (var j in modelprojectlistarea[i].children) {
                        if (modelprojectlistarea[i].children[j].id != projectid) {
                            projects.push(modelprojectlistarea[i].children[j]);
                        }
                    }

                    if (projects.length > 0) {
                        modelprojectlistarea[i].children = projects;
                        newmodelprojectlistarea.push(modelprojectlistarea[i]);
                    }
                }
                modelprojectlistarea = newmodelprojectlistarea;

                var newmodelprojectlistyear = [];
                for (var i in modelprojectlistyear) {
                    var projects = [];
                    for (var j in modelprojectlistyear[i].children) {
                        if (modelprojectlistyear[i].children[j].id != projectid) {
                            projects.push(modelprojectlistyear[i].children[j]);
                        }
                    }

                    if (projects.length > 0) {
                        modelprojectlistyear[i].children = projects;
                        newmodelprojectlistyear.push(modelprojectlistyear[i]);
                    }
                }
                modelprojectlistyear = newmodelprojectlistyear;
            }

            isReloadTree = true;//标记重载
            MarkCurrentProject();
            isReloadTree = false;//重载后还原

            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }, datatype: "json"
    });
};

//地图选点
function mapPosition(type) {
    if (handler != undefined) {
        handler.destroy();
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    viewer.scene.globe.depthTestAgainstTerrain = true;
    viewer._container.style.cursor = "crosshair";//修改鼠标样式

    if (type == "add") {
        layer.min(modelprojectinfoaddlayerindex);
    }
    else if ("edit") {
        layer.min(modelprojectinfoeditlayerindex);
    }

    //左击
    handler.setInputAction(function (leftclick) {
        var position = viewer.scene.pickPosition(leftclick.position);
        if (position != undefined) {
            var cartesian3 = Cesium.Cartographic.fromCartesian(position);
            var longitude = Cesium.Math.toDegrees(cartesian3.longitude);
            var latitude = Cesium.Math.toDegrees(cartesian3.latitude);

            if (type == "add") {
                form.val("addModelprojectform", {
                    "model_zxjd_add": longitude.toFixed(6)
                    , "model_zxwd_add": latitude.toFixed(6)
                });
            }
            else if (type == "edit") {
                form.val("editModelprojectinfoform", {
                    "model_zxjd_edit": longitude.toFixed(6)
                    , "model_zxwd_edit": latitude.toFixed(6)
                });
            }

            if (Cesium.defined(position)) {
                if (newprojectentity == null) {
                    newprojectentity = viewer.entities.add(new Cesium.Entity({
                        name: "temp_modelproject_position",
                        position: position,
                        billboard: {
                            image: '../../Resources/img/model/modelprojecticon.png',
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                            width: 40,
                            height: 40,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY, //深度检测，解决图标、标注与模型遮挡冲突
                        }
                    }));
                }
                else {
                    newprojectentity.position = position;
                }
            }

            if (type == "add") {
                layer.restore(modelprojectinfoaddlayerindex);
            }
            else if ("edit") {
                layer.restore(modelprojectinfoeditlayerindex);
            }

            if (handler != undefined) {
                handler.destroy();
            }

            viewer._container.style.cursor = "default";//还原鼠标样式
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
};
//清除地图选点
function ClearMapPoint() {
    if (handler != undefined) {
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);//移除事件
        handler.destroy();
    }

    viewer._container.style.cursor = "default";//还原鼠标样式

    if (newprojectentity != null) {
        RemoveEntityInViewer(newprojectentity);
        newprojectentity = null;
    }
};


//项目搜索
function ProjectSearch() {
    //搜索
    $('#projectsearch').click(function () {
        searchresult = [];

        var filter = $('#projectfiltersearch').val();
        if (filter == "") {
            layer.msg("请输入搜索关键字！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            return;
        }
        var re = new RegExp("^[ ]+$");
        if (re.test(filter)) {
            layer.msg("请输入有效搜索关键字！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            return;
        }
        if (modelprojectlistarea.length == 0 && modelprojectlistyear.length == 0) {
            layer.msg("无项目信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }

        for (var i in modelprojectlistarea) {
            if (modelprojectlistarea[i].title.indexOf(filter) != -1) {
                if (searchresult.indexOf(modelprojectlistarea[i].title) == -1) {
                    searchresult.push(modelprojectlistarea[i].title);
                }
            }

            for (var j in modelprojectlistarea[i].children) {
                if (modelprojectlistarea[i].children[j].title.indexOf(filter) != -1) {
                    if (searchresult.indexOf(modelprojectlistarea[i].children[j].title) == -1) {
                        searchresult.push(modelprojectlistarea[i].children[j].title);
                    }

                    if (searchresult.indexOf(modelprojectlistarea[i].title) == -1) {
                        searchresult.push(modelprojectlistarea[i].title);
                    }
                }

                if (modelprojectlistarea[i].children[j].children != undefined && modelprojectlistarea[i].children[j].children.length > 0) {
                    for (var k in modelprojectlistarea[i].children[j].children) {
                        if (modelprojectlistarea[i].children[j].children[k].title.indexOf(filter) != -1) {
                            if (searchresult.indexOf(modelprojectlistarea[i].children[j].children[k].title) == -1) {
                                searchresult.push(modelprojectlistarea[i].children[j].children[k].title);
                            }

                            if (searchresult.indexOf(modelprojectlistarea[i].children[j].title) == -1) {
                                searchresult.push(modelprojectlistarea[i].children[j].title);
                            }

                            if (searchresult.indexOf(modelprojectlistarea[i].title) == -1) {
                                searchresult.push(modelprojectlistarea[i].title);
                            }
                        }
                    }
                }
            }
        }

        for (var i in modelprojectlistyear) {
            if (modelprojectlistyear[i].title.indexOf(filter) != -1) {
                if (searchresult.indexOf(modelprojectlistyear[i].title) == -1) {
                    searchresult.push(modelprojectlistyear[i].title);
                }
            }

            for (var j in modelprojectlistyear[i].children) {
                if (modelprojectlistyear[i].children[j].title.indexOf(filter) != -1) {
                    if (searchresult.indexOf(modelprojectlistyear[i].children[j].title) == -1) {
                        searchresult.push(modelprojectlistyear[i].children[j].title);
                    }

                    if (searchresult.indexOf(modelprojectlistyear[i].title) == -1) {
                        searchresult.push(modelprojectlistyear[i].title);
                    }
                }

                if (modelprojectlistyear[i].children[j].children != undefined && modelprojectlistyear[i].children[j].children.length > 0) {
                    for (var k in modelprojectlistyear[i].children[j].children) {
                        if (modelprojectlistyear[i].children[j].children[k].title.indexOf(filter) != -1) {
                            if (searchresult.indexOf(modelprojectlistyear[i].children[j].children[k].title) == -1) {
                                searchresult.push(modelprojectlistyear[i].children[j].children[k].title);
                            }

                            if (searchresult.indexOf(modelprojectlistyear[i].children[j].title) == -1) {
                                searchresult.push(modelprojectlistyear[i].children[j].title);
                            }

                            if (searchresult.indexOf(modelprojectlistyear[i].title) == -1) {
                                searchresult.push(modelprojectlistyear[i].title);
                            }
                        }
                    }
                }
            }
        }

        isReloadTree = true;//标记重载
        MarkCurrentProject();
        isReloadTree = false;//重载后还原

    });

    //清除
    $('#projectclear').click(function () {
        $('#projectfiltersearch').val('');//清空
        searchresult = [];

        isReloadTree = true;//标记重载
        MarkCurrentProject();
        isReloadTree = false;//重载后还原
    });

};

//更新模型是否可可中（用于标识模型生产完成）
function UpdateModelTask() {
    $.ajax({
        url: servicesurl + "/api/ModelTask/FinshTask", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                var modeldatas = JSON.parse(result.data);

                for (var i in modelprojectlistarea) {
                    for (var j in modelprojectlistarea[i].children) {
                        for (var k in modelprojectlistarea[i].children[j].children) {
                            if (modelprojectlistarea[i].children[j].children[k].disabled) {
                                for (var m in modeldatas) {
                                    if (modeldatas[m].Id == modelprojectlistarea[i].children[j].children[k].id) {
                                        modelprojectlistarea[i].children[j].children[k].disabled = false;
                                        modelprojectlistarea[i].children[j].children[k].data = modeldatas[m];
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

                for (var i in modelprojectlistyear) {
                    for (var j in modelprojectlistyear[i].children) {
                        for (var k in modelprojectlistyear[i].children[j].children) {
                            if (modelprojectlistyear[i].children[j].children[k].disabled) {
                                for (var m in modeldatas) {
                                    if (modeldatas[m].Id == modelprojectlistyear[i].children[j].children[k].id) {
                                        modelprojectlistyear[i].children[j].children[k].disabled = false;
                                        modelprojectlistyear[i].children[j].children[k].data = modeldatas[m];
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

                isReloadTree = true;//标记重载
                MarkCurrentProject();
                isReloadTree = false;//重载后还原
            }
        }, datatype: "json"
    });
};


//TODO项目Mark点击操作
function ModelMarkClick() {
    //在地图div中增加html代码
    $("#map").append('<!--查看项目信息--> <div id="info" style=" display: none;position: absolute;width: 400px; height: 400px; z-index: 1000; background: rgba(30, 144, 255, 0.6); border: 2px solid #4169E1; border-radius: 25px;"> <form class="layui-form" style="margin-top:30px;margin-right:20px; color:white;" lay-filter="infoModelprojectinfoform"> <div class="layui-form-item"> <label class="layui-form-label">项目名称：</label> <div class="layui-input-block"> <input type="text" style="background-color:transparent;border-color:transparent;color:white;" name="model_xmmc_info" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">项目编码：</label> <div class="layui-input-block"> <input type="text" style="background-color:transparent;border-color:transparent;color:white;" name="model_xmbm_info" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">行政区划：</label> <div class="layui-input-block"> <input type="text" style="background-color:transparent;border-color:transparent;color:white;" name="model_xzqh_info" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">项目位置：</label> <div class="layui-input-block"> <input type="text" style="background-color:transparent;border-color:transparent;color:white;" name="model_xmwz_info" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">中心经度：</label> <div class="layui-input-block"> <input type="text" style="background-color:transparent;border-color:transparent;color:white;" name="model_zxjd_info" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">中心纬度：</label> <div class="layui-input-block"> <input type="text" style="background-color:transparent;border-color:transparent;color:white;" name="model_zxwd_info" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">项目时间：</label> <div class="layui-input-block"> <input type="text" style="background-color:transparent;border-color:transparent;color:white;" name="model_xmsj_info" readonly="readonly" class="layui-input" /> </div> </div><div class="layui-form-item"> <label class="layui-form-label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</label> <div class="layui-input-block"> <input type="text" style="background-color:transparent;border-color:transparent;color:white;" name="model_bz_info" readonly="readonly" class="layui-input"> </div> </div> </form> </div>');

    var canvas = viewer.scene.canvas;
    const handler_modelmark = new Cesium.ScreenSpaceEventHandler(canvas);

    //注册鼠标点击事件
    handler_modelmark.setInputAction(function (e) {

        var pick = viewer.scene.pick(e.position, 9, 9);
        var earthPosition = viewer.camera.pickEllipsoid(e.position, viewer.scene.globe.ellipsoid);
        var cartographic = Cesium.Cartographic.fromCartesian(earthPosition, viewer.scene.globe.ellipsoid, new Cesium.Cartographic());
        var lat = Cesium.Math.toDegrees(cartographic.latitude);
        var lng = Cesium.Math.toDegrees(cartographic.longitude);
        var height = cartographic.height;
        var htmlinfo = document.getElementById("info");

        if (Cesium.defined(pick) && Cesium.defined(pick.id)) {
            if (pick.id.id.split("_")[0] == "PROJECTCENTER") {

                var project_id = pick.id.id.split("_")[1];
                tree_reload(project_id);

                //Loading
                var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                //异步获取项目信息
                $.ajax({
                    url: servicesurl + "/api/ModelProject/GetModelProjectInfo", type: "get", data: { "id": project_id, "cookie": document.cookie },
                    success: function (data) {
                        layer.close(loadinglayerindex);
                        var result = JSON.parse(data);
                        if (result.code == 1) {
                            var modelprojectinfo = JSON.parse(result.data);

                            form.val("infoModelprojectinfoform", {
                                "model_xmmc_info": modelprojectinfo.XMMC
                                , "model_xmbm_info": modelprojectinfo.XMBM
                                , "model_zxjd_info": modelprojectinfo.ZXJD
                                , "model_zxwd_info": modelprojectinfo.ZXWD
                                , "model_xmsj_info": modelprojectinfo.XMSJ
                                , "model_xmwz_info": modelprojectinfo.XMWZ
                                , "model_bz_info": modelprojectinfo.BZ
                            });
                            //翻译项目位置
                            if (xjxzqs.length > 0) {
                                for (var i in xjxzqs) {
                                    if (xjxzqs[i].value == modelprojectinfo.XZQBM) {
                                        var xzqh = "重庆市" + xjxzqs[i].name;
                                        form.val("infoModelprojectinfoform", {
                                            "model_xzqh_info": xzqh
                                        });
                                    }
                                }
                            }
                        }
                        else {
                            form.val("infoModelprojectinfoform", {
                                "model_xmmc_info": ""
                                , "model_xmbm_info": ""
                                , "model_xmwz_info": ""
                                , "model_zxjd_info": ""
                                , "model_zxwd_info": ""
                                , "model_xmsj_info": ""
                                , "model_xzqh_info": ""
                                , "model_bz_info": ""
                            });
                        }

                    }, datatype: "json"
                });

                const domHeight = htmlinfo.style.height.split('px').join(); // 
                const domWidth = htmlinfo.style.width.split('px').join(); // 
                const heightOffset = 10; // Y轴偏移量
                const widthOffset = 10; // X轴偏移量

                const scratch = new Cesium.Cartesian2();
                viewer.scene.preRender.addEventListener(function () {
                    let position = Cesium.Cartesian3.fromDegrees(lng, lat, 2);
                    let canvasPosition = viewer.scene.cartesianToCanvasCoordinates(position, scratch);
                    if (Cesium.defined(canvasPosition)) {

                        htmlinfo.style.top = canvasPosition.y - parseInt(domHeight) + heightOffset + 'px';
                        htmlinfo.style.left = canvasPosition.x - parseInt(domWidth) / 2 + widthOffset + 'px';
                    }

                });
                htmlinfo.style.display = "block";
            }


        }
        else {
            htmlinfo.style.display = "none";
        }

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //项目列表联动
    function tree_reload(id) {
        elem.tabChange('modelprojectListTab', 'list_area');
        for (var i in modelprojectlistarea) {
            modelprojectlistarea[i].spread = false;
            for (var j in modelprojectlistarea[i].children) {
                if (modelprojectlistarea[i].children[j].id != id) {
                    modelprojectlistarea[i].children[j].spread = false;
                }
                else {
                    modelprojectlistarea[i].spread = true;
                    modelprojectlistarea[i].children[j].spread = true;
                }

            }
        }
        tree.reload('areaprojectlistid', {
            data: modelprojectlistarea
        });
    }
};