//目标widget
function ImageTargetInfo(id, style) {
    if (style == "view") {
        //查看目标
        if (imagetargetinfoviewlayerindex == null) {
            imagetargetinfoviewlayerindex = layer.open({
                type: 1
                , title: ['查看目标', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['450px', '500px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--查看目标--><form class="layui-form" style="margin-top:5px;margin-right:5px;" lay-filter="viewImagetargetinfoform"><div class="layui-form-item"><label class="layui-form-label">目标名称</label><div class="layui-input-block"><input type="text" name="image_mbmc_view" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">目标编号</label><div class="layui-input-block"><input type="text" name="image_mbbh_view" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">目标类型</label><div class="layui-input-block"><select id="mblxid" name="image_mblx_view" lay-verify="required"></select></div></div><div class="layui-form-item"><label class="layui-form-label">X</label><div class="layui-input-block"><input type="text" name="image_x_view" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">Y</label><div class="layui-input-block"><input type="text" name="image_y_view" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">Z</label><div class="layui-input-block"><input type="text" name="image_z_view" autocomplete="off"  class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">坐标系统</label><div class="layui-input-block"><select id="kjckid" name="image_kjck_view"></select></div></div><div class="layui-form-item"><label class="layui-form-label">备注</label><div class="layui-input-block"><input type="text" name="image_bz_view" autocomplete="off" class="layui-input"></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    //异步获取目标基本信息
                    $.ajax({
                        url: servicesurl + "/api/ImageTarget/GetTargetInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                        success: function (data) {
                            var result = JSON.parse(data);
                            if (result.code == 1) {
                                var targetinfo = JSON.parse(result.data);
                                form.val("viewImagetargetinfoform", {
                                    "image_mbmc_view": targetinfo.MBMC
                                    , "image_mbbh_view": targetinfo.MBBH
                                    , "image_mblx_view": targetinfo.MBLX
                                    , "image_x_view": targetinfo.X
                                    , "image_y_view": targetinfo.Y
                                    , "image_z_view": targetinfo.Z
                                    , "image_kjck_view": targetinfo.SRID
                                    , "image_bz_view": targetinfo.BZ
                                });

                                //翻译目标类型、空间参考
                                if (srids.length > 0) {
                                    for (i in srids) {
                                        if (srids[i].value == targetinfo.SRID) {
                                            document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '" selected>' + srids[i].name + '</option>';
                                        }
                                    }
                                }
                                if (mblxs.length > 0) {
                                    for (i in mblxs) {
                                        if (mblxs[i].value == targetinfo.MBLX) {
                                            document.getElementById("mblxid").innerHTML += '<option value="' + mblxs[i].value + '" selected>' + mblxs[i].name + '</option>';
                                        }
                                    }
                                }

                                form.render();
                                form.render('select');
                            }

                            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }, datatype: "json"
                    });
                    form.render();
                }
                , end: function () {
                    layer.close(imagetargetinfoviewlayerindex);
                    imagetargetinfoviewlayerindex = null;
                }                    
            });
        }
    }
    else if (style == "edit") {
        //编辑目标
        if (imagetargetinfoeditlayerindex == null) {
            imagetargetinfoeditlayerindex = layer.open({
                type: 1
                , title: ['编辑目标', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['580px', '620px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:1px 0px"><ul class="layui-tab-title"><li class="layui-this">基本信息</li><li>靶区</li><li>时序影像</li></ul><div class="layui-tab-content" style="margin:0px 0px"><!--目标基本信息--><div class="layui-tab-item layui-show"><form class="layui-form" style="margin-top:0px" lay-filter="editImagetargetinfoform"><div class="layui-form-item"><label class="layui-form-label">目标名称</label><div class="layui-input-block"><input type="text" name="image_mbmc_edit" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">目标编号</label><div class="layui-input-block"><input type="text" name="image_mbbh_edit" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">目标类型</label><div class="layui-input-block"><select id="mblxid" name="image_mblx_edit" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">X</label><div class="layui-input-block"><input type="text" name="image_x_edit" autocomplete="off" placeholder="请输入空间直角坐标 X" lay-verify="required|number" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">Y</label><div class="layui-input-block"><input type="text" name="image_y_edit" autocomplete="off" placeholder="请输入空间直角坐标 Y" lay-verify="required|number" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">Z</label><div class="layui-input-block"><input type="text" name="image_z_edit" autocomplete="off" placeholder="请输入空间直角坐标 Z" lay-verify="required|number" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">坐标系统</label><div class="layui-input-block"><select id="kjckid" name="image_kjck_edit"></select></div></div><div class="layui-form-item"><label class="layui-form-label">备注</label><div class="layui-input-block"><input type="text" name="image_bz_edit" placeholder="请输入" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item" style="margin-top:10px"><div style="position:absolute;right:15px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="editImagetargetinfosubmit" style="width:100px">保存</button></div></div></form></div><!--靶区ROI信息--><div class="layui-tab-item"><div class="layui-card-body" style="padding:0px"><!--表格--><table id="image-roi-edit" lay-filter="image-roi-edit"></table><!--按钮--><script type="text/html" id="addroi"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm" style="font-size:14px" lay-event="addroi">添加靶区</button></div></script><!--数据操作项--><script type="text/html" id="table-toolbar-roi"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="roiview"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-blue layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="roiedit"><i class="layui-icon layui-icon-edit" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="roidel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div><!--时序影像--><div class="layui-tab-item"><div class="layui-card-body" style="padding:0px"><!--表格--><table id="image-timeimage-edit" lay-filter="image_timeimage-edit"></table><!--按钮——上传目标影像--><script type="text/html" id="addtimeimage"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm" style="font-size:14px" lay-event="addtimeimage">添加时序影像</button></div></script><!--数据操作项--><script type="text/html" id="table-toolbar-timeimage"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="timeimageview"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="timeimagedel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div></div></div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    //li————1-基本信息
                    //异步获取目标基本信息
                    $.ajax({
                        url: servicesurl + "/api/ImageTarget/GetTargetInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                        success: function (data) {
                            var result = JSON.parse(data);
                            if (result.code == 1) {
                                var targetinfo = JSON.parse(result.data);
                                form.val("editImagetargetinfoform", {
                                    "image_mbmc_edit": targetinfo.MBMC
                                    , "image_mbbh_edit": targetinfo.MBBH
                                    , "image_mblx_edit": targetinfo.MBLX
                                    , "image_x_edit": targetinfo.X
                                    , "image_y_edit": targetinfo.Y
                                    , "image_z_edit": targetinfo.Z
                                    , "image_kjck_edit": targetinfo.SRID
                                    , "image_bz_edit": targetinfo.BZ
                                });

                                //翻译目标类型、空间参考
                                if (srids.length > 0) {
                                    for (i in srids) {
                                        if (srids[i].value == targetinfo.SRID) {
                                            document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '" selected>' + srids[i].name + '</option>';
                                        }
                                        else {
                                            document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '">' + srids[i].name + '</option>';
                                        }
                                    }
                                }
                                if (mblxs.length > 0) {
                                    for (i in mblxs) {
                                        if (mblxs[i].value == targetinfo.MBLX) {
                                            document.getElementById("mblxid").innerHTML += '<option value="' + mblxs[i].value + '" selected>' + mblxs[i].name + '</option>';
                                        }
                                        else {
                                            document.getElementById("mblxid").innerHTML += '<option value="' + mblxs[i].value + '">' + mblxs[i].name + '</option>';
                                        }
                                    }
                                }

                                form.render();
                                form.render('select');
                            }

                            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }, datatype: "json"
                    });

                    //保存编辑--更新目标信息
                    form.on('submit(editImagetargetinfosubmit)', function (data) {
                        data.field.cookie = document.cookie;
                        data.field.id = id;
                        $.ajax({
                            url: servicesurl + "/api/ImageTarget/UpdateTargetInfo", type: "put", data: data.field,
                            success: function (result) {
                                var info = JSON.parse(result);
                                if (info.code == 1) {
                                    //layer.close(imagetargetinfoeditlayerindex);
                                    //刷新项目列表
                                    GetUserAllImageProjects();
                                    form.render();
                                    form.render('select');
                                }
                                layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            }, datatype: "json"
                        });
                        return false;
                    });

                    //li—————2-首期影像

                    //li————3-靶区
                    //3.1 靶区表格
                    var roitabledata = [];
                    var roitableedit = table.render({
                        elem: '#image-roi-edit'
                        , id: 'roitableid'
                        , title: '靶区信息'
                        , skin: 'line'
                        , even: false
                        , page: {
                            layout: ['prev', 'page', 'next', 'count']
                        }
                        , limit: 14
                        , initSort: { field: 'id', type: 'asc' }
                        , toolbar: '#addroi'
                        , totalRow: false
                        , cols: [[
                            { field: 'id', title: 'ID', hide: true }
                            , { field: 'bqmc', title: '靶区名称', align: "center" }
                            , { field: 'bqbh', title: '靶区编号', align: "center" }
                            , { field: 'bqlx', title: '靶区类型', align: "center" }
                            , { field: 'bz', title: '备注', align: "center" }
                            , { fixed: 'right', width: 120, align: 'center', toolbar: '#table-toolbar-roi' }
                        ]]
                        , data: roitabledata
                    });

                    //3.2 获取靶区信息——显示在表格
                    GetRoiInfo();
                    function GetRoiInfo() {
                        $.ajax({
                            url: servicesurl + "/api/ImageTarget/GetRoiInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                            success: function (data) {
                                roitabledata = [];
                                var result = JSON.parse(data);
                                if (result.code == 1) {
                                    var roiinfos = JSON.parse(result.data);
                                    //构造ROI表格数据
                                    for (var i in roiinfos) {
                                        var roi = new Object;
                                        roi.id = roiinfos[i].Id;
                                        roi.bqmc = roiinfos[i].BQMC;
                                        roi.bqbh = roiinfos[i].BQBH;

                                        if (bqlxs.length > 0) {
                                            for (j in bqlxs) {
                                                if (bqlxs[j].value == roiinfos[i].BQLX) {
                                                    roi.bqlx = bqlxs[j].name;
                                                }
                                            }
                                        }
                                        else {
                                            roi.bqlx = roiinfos[i].BQLX;
                                        }
                                        roi.bqwj = roiinfos[i].BQWJ;
                                        roi.bz = roiinfos[i].BZ;
                                        roitabledata.push(roi);
                                    }
                                    roitableedit.reload({ id: 'roitableid', data: roitabledata });
                                }
                                else {
                                    roitableedit.reload({ id: 'roitableid', data: [] });
                                }
                                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            }, datatype: "json"
                        });
                    };

                    //3.3添加靶区——addroi
                    table.on('toolbar(image-roi-edit)', function (obj) {
                        switch (obj.event) {
                            case 'addroi':
                                var addroilayerindex = layer.open({
                                    type: 1
                                    , title: ['添加靶区', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                    , area: ['400px', '543px']
                                    , shade: 0
                                    , offset: 'auto'
                                    , closeBtn: 1
                                    , maxmin: false
                                    , moveOut: true
                                    , content: '<form class="layui-form" style="margin-top:10px" lay-filter="addroiform"><div class="layui-form-item"><label class="layui-form-label">靶区名称</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="image_bqmc_add" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">靶区编号</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="image_bqbh_add" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">靶区类型</label><div class="layui-input-block" style="padding-right:10px"><select id="bqlxid" name="image_bqlx_add" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">备注</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="image_bz_add" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item"style="height: 220px;"><div class="layui-upload"><div class="layui-row"style="margin-top:20px;margin-left:10px;margin-right:20px"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><button type="button" class="layui-btn-fluid layui-btn layui-btn-primary layui-border-green" id="image_roi_select">1-选择靶区影像</button></div></div><div class="layui-col-xs6"><div class="grid-demo"><button type="button" class="layui-btn-fluid layui-btn layui-btn-primary layui-border-green" id="image_roi_upload">2-提交上传</button></div></div></div><div class="layui-upload-list"style="height:250px;margin-top:10px;margin-left:10px;margin-right:10px;background-color:rgba(25,25,0,0.11)"><img class="layui-upload-img" id="image_roi_img" name="image_roi_img" style="width:100%;height:auto;vertical-align:middle"></div></div></div></form>'
                                    , zIndex: layer.zIndex
                                    , success: function (layero) {
                                        layer.setTop(layero);

                                        if (bqlxs.length > 0) {
                                            for (var i in bqlxs) {
                                                document.getElementById("bqlxid").innerHTML += '<option value="' + bqlxs[i].value + '">' + bqlxs[i].name + '</option>';
                                            }
                                        }

                                        //创建一个靶区上传组件
                                        var uploadInst = upload.render({
                                            elem: '#image_roi_select' //绑定元素
                                            , url: servicesurl + "/api/ImageTarget/UploadRoiImage" //上传接口
                                            , data: {
                                                id: function () {
                                                    return id;
                                                },
                                                bqmc: function () {
                                                    return form.val("addroiform")["image_bqmc_add"];
                                                },
                                                bqbh: function () {
                                                    return form.val("addroiform")["image_bqbh_add"];
                                                },
                                                bqlx: function () {
                                                    return form.val("addroiform")["image_bqlx_add"];
                                                },
                                                bz: function () {
                                                    return form.val("addroiform")["image_bz_add"];
                                                },
                                                img: function () {
                                                    return $('#image_roi_img')[0].src;
                                                },
                                                cookie: function () {
                                                    return document.cookie;
                                                }
                                            }
                                            , datatype: "json"
                                            , accept: 'images'                                   
                                            , auto: false 
                                            , bindAction: '#image_roi_upload'
                                            , multiple: false 
                                            , choose: function (obj) {
                                                obj.preview(function (index, file, result) {
                                                    $('#image_roi_img')[0].src = result;
                                                });
                                            }
                                            , before: function (obj) {
                                            }
                                            , done: function (res) {
                                                //上传完毕回调
                                                if (res.code == 1) {
                                                    layer.close(addroilayerindex);
                                                    //刷新靶区列表
                                                    GetRoiInfo();
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
                                    , end: function () { }
                                });
                                //break;
                        };
                    });

                    //3.4 靶区操作：查看靶区（影像）、编辑靶区（属性信息及靶区影像）、删除靶区（所有信息）
                    table.on('tool(image-roi-edit)', function (obj) {
                        var data = obj.data;
                        var layEvent = obj.event;
                        var roiid = obj.data.id;

                        if (layEvent === 'roiview') {
                            //查看靶区影像
                            //TODO 影像查看放大缩小功能
                            layer.open({
                                type: 1
                                , title: [data.bqmc + '-靶区影像查看', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                , area: ['700px', '750px']
                                , shade: 0
                                , offset: 'auto'
                                , closeBtn: 1
                                , maxmin: false
                                , moveOut: true
                                , content: '<form class="layui-form" style="margin-top:10px" lay-filter="viewroiform">  <div class="layui-form-item" style="height: 700px;"><div class="layui-upload-list"><img class="layui-upload-img" id="image_roi_img" name="image_roi_img"  style="width:100%;height:auto;vertical-align:middle"></div></div></form>'
                                , zIndex: layer.zIndex
                                , success: function (layero) {
                                    layer.setTop(layero);

                                    $('#image_roi_img')[0].src = "data:image/jpeg;base64," + data.bqwj;


                                    ////以下未实现图片的放大缩小查看
                                    // $(function bigimg(image_roi_img) {
                                    //    var zoom = parseInt(image_roi_img.style.zoom, 10) || 100;
                                    //    zoom += event.wheelDelta / 12;
                                    //    if (zoom > 0)
                                    //        image_roi_img.style.zoom = zoom + '%';
                                    //    return false;
                                    //})

                                }
                                , end: function () { }
                            });
                        }
                        else if (layEvent === 'roiedit') {
                            //编辑靶区属性
                            if (imageroiinfoeditlayerindex == null) {
                                imageroiinfoeditlayerindex = layer.open({
                                    type: 1
                                    , title: [data.bqmc + '-靶区编辑', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                    , area: ['400px', '300px']
                                    , shade: 0
                                    , offset: 'auto'
                                    , closeBtn: 1
                                    , maxmin: false
                                    , moveOut: true
                                    , content: '<form class="layui-form" style="margin-top:10px" lay-filter="editroiform"><div class="layui-form-item"><label class="layui-form-label">靶区名称</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="image_bqmc_edit" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">靶区编号</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="image_bqbh_edit" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">靶区类型</label><div class="layui-input-block" style="padding-right:10px"><select id="bqlxid" name="image_bqlx_edit" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">备注</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="image_bz_edit" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item" style="margin-top:10px"><div style="position:absolute;right:15px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="editroiinfosubmit" style="width:100px">保存</button></div></div></form>'
                                    , zIndex: layer.zIndex
                                    , success: function (layero) {
                                        layer.setTop(layero);
                                        form.val("editroiform", {
                                            "image_bqmc_edit": data.bqmc
                                            , "image_bqbh_edit": data.bqbh
                                            , "image_bz_edit": data.bz
                                        });
                                        if (bqlxs.length > 0) {
                                            for (var i in bqlxs) {
                                                if (bqlxs[i].name == data.bqlx) {
                                                    document.getElementById("bqlxid").innerHTML += '<option value="' + bqlxs[i].value + '" selected>' + bqlxs[i].name + '</option>';
                                                }
                                                else {
                                                    document.getElementById("bqlxid").innerHTML += '<option value="' + bqlxs[i].value + '">' + bqlxs[i].name + '</option>';
                                                }

                                            }
                                        }
                                        form.render();
                                        form.render('select')

                                        //编辑后保存
                                        //TODO
                                        form.on('submit(editroiinfosubmit)', function (data) {
                                            data.field.cookie = document.cookie;
                                            data.field.id = roiid;

                                            $.ajax({
                                                url: servicesurl + "/api/ImageTarget/UpdateRoiInfo", type: "put", data: data.field,
                                                success: function (result) {
                                                    var info = JSON.parse(result);
                                                    if (info.code == 1) {
                                                        layer.close(imageroiinfoeditlayerindex);
                                                        //刷新靶区列表
                                                        GetRoiInfo();
                                                        form.render();
                                                    }
                                                    layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                }, datatype: "json"
                                            });
                                            return false;
                                        });
                                        form.render();
                                        form.render('select');
                                    }
                                    , end: function () {                                     
                                        imageroiinfoeditlayerindex = null;
                                    }  

                                });
                            }
                        }
                        else if (layEvent === 'roidel') {
                            layer.confirm('是否删除?', { icon: 3, title: '消息', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                                $.ajax({
                                    url: servicesurl + "/api/ImageTarget/DeleteRoi", type: "delete", data: { "id": obj.data.id, "cookie": document.cookie },
                                    success: function (data) {
                                        var result = JSON.parse(data);
                                        layer.msg(result.message, { zindex: layer.zindex, success: function (layero) { layer.settop(layero); } });
                                    }, datatype: "json"
                                });
                                obj.del();
                                GetRoiInfo();
                                layer.close(index);
                            });
                        }

                    });


                    //li————4-时序影像
                    //4.1 时序影像表格
                    var timeimagetabledata = [];
                    var timeimagetableedit = table.render({
                        elem: '#image-timeimage-edit'
                        , id: 'timeimagetableid'
                        , title: '时序影像'
                        , skin: 'line'
                        , even: false
                        , page: {
                            layout: ['prev', 'page', 'next', 'count']
                        }
                        , limit: 10
                        , initSort: { field: 'id', type: 'asc' }
                        , toolbar: '#addtimeimage'
                        , totalRow: false
                        , cols: [[
                            { field: 'id', title: 'ID', hide: true }
                            , { field: 'yxmc', title: '影像名称', align: "center" }
                            , { field: 'bz', title: '备注', align: "center",width:50 }
                            , { fixed: 'right', width: 120, align: 'center', toolbar: '#table-toolbar-timeimage' }
                        ]]
                        , data: timeimagetabledata
                    });

                    //4.2 获取影像信息——显示在表格                   
                    GettimeimageInfo();
                    var firstimg_l=0;
                    var firstimg_b=0;
                    var firstimg_h=0;
                    function GettimeimageInfo() {
                        $.ajax({
                            url: servicesurl + "/api/ImageUpload/GetImageInfos", type: "get", data: { "id": id, "cookie": document.cookie },
                            success: function (data) {
                                timeimagetabledata = [];
                                var result = JSON.parse(data);
                                if (result.code == 1) {
                                    var imageinfos = JSON.parse(result.data);
                                    firstimg_b = imageinfos[0].XMP.GpsLatitude;
                                    firstimg_l = imageinfos[0].XMP.GpsLongitude;
                                    firstimg_h = imageinfos[0].XMP.AbsoluteAltitude;

                                    //构造时序影像表格数据
                                    for (var i in imageinfos) {
                                        var image = new Object;
                                        image.id = imageinfos[i].Id;
                                        image.yxmc = imageinfos[i].YXMC;
                                        image.yxbh = imageinfos[i].YXBH;
                                        image.yxlj = imageinfos[i].YXLJ;
                                        image.bz = imageinfos[i].BZ;
                                        image.width = imageinfos[i].Width;
                                        image.height = imageinfos[i].Height;
                                        //image.xmp = imageinfos[i].XMP;
                                        //image.xmpjson = JSON.parse(image.xmp);
                                        
                                        timeimagetabledata.push(image);
                                    }

                                    timeimagetableedit.reload({ id: 'timeimagetableid', data: timeimagetabledata });
                                }
                                else {
                                    roitableedit.reload({ id: 'timeimagetableid', data: [] });
                                }
                                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            }, datatype: "json"
                        });
                    };

                    //4.3上传时序影像——uploadtimeimage
                    table.on('toolbar(image_timeimage-edit)', function (obj) {
                        switch (obj.event) {
                            case 'addtimeimage':
                                var addtimeimagelayerindex = layer.open({
                                    type: 1
                                    , title: ['上传目标时序影像', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                    , area: ['500px', '600px']
                                    , shade: 0
                                    , offset: 'auto'
                                    , closeBtn: 1
                                    , maxmin: false
                                    , moveOut: true
                                    , content: '<form class="layui-form" style="margin-top:10px" lay-filter="addtimeimageform">   <div class="layui-form-item"><label class="layui-form-label">备注</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="image_bz_add" autocomplete="off" placeholder="" class="layui-input" /></div></div><div class="layui-form-item" style="height: 220px;"><div class="layui-upload"><div class="layui-row" style="margin-top:20px;margin-left:10px;margin-right:20px"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><button type="button" class="layui-btn-fluid  layui-btn layui-btn-primary layui-border-green" id="image_timeimage_select">1-选择影像</button></div></div><div class="layui-col-xs6"><div class="grid-demo"><button type="button" class="layui-btn-fluid layui-btn layui-btn-primary layui-border-green" id="image_timeimage_upload">2-提交上传</button></div></div></div><div class="layui-upload-list" style="height:380px;margin-top:10px;margin-left:10px;margin-right:10px;background-color:rgba(25,25,0,0.11)"><p style="color:red;font-size:15px;">        注意：点击“2-提交上传只点1次，切忌点击多次重复提交！！！   </p><img class="layui-upload-img" id="image_timeimage_img" name="image_timeimage_img" style="width:100%;height:auto;vertical-align:middle"></div></div></div></form>'
                                    , zIndex: layer.zIndex
                                    , success: function (layero) {
                                        layer.setTop(layero);

                                        var imagetime;
                                        var f;
                                        var ls = [];
                                        var bs = [];
                                        var hs;
                                        var l;
                                        var b;
                                        var h;
                                        var firstmark;
                                        var imagewidth;
                                        var imageheight;
                                   
                                        //创建一个影像上传组件
                                        var uploadinst = upload.render({
                                            elem: '#image_timeimage_select' //绑定元素
                                            , url: servicesurl + "/api/ImageUpload/UploadTimeImage" //上传接口
                                            , data: {
                                                id: function () {
                                                    return id;
                                                },
                                                bz: function () {
                                                    return form.val("addtimeimageform")["image_bz_add"];
                                                },
                                                imagetime: function () {
                                                    return imagetime;
                                                },
                                                f: function () {
                                                    return f;
                                                },
                                                camera: function () {
                                                    return camera;
                                                },
                                                timeimg: function () {
                                                    return $('#image_timeimage_img')[0].src;
                                                },
                                                firstmark: function () {
                                                    return firstmark;
                                                },  
                                                imagewidth: function () {
                                                    return imagewidth;
                                                }, 
                                                imageheight: function () {
                                                    return imageheight;
                                                }, 
                                                cookie: function () {
                                                    return document.cookie;
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
                                                            imagetime = EXIF.getTag(this, "DateTimeOriginal");  
                                                            f = EXIF.getTag(this, "FocalLength");
                                                            f = f.numerator * 1.0 / f.denominator;
                                                            camera = EXIF.getTag(this, "Model");
                                                            bs = EXIF.getTag(this, "GPSLatitude");
                                                            ls = EXIF.getTag(this, "GPSLongitude"); 
                                                            hs = EXIF.getTag(this, "GPSAltitude");
                                                            b = bs[0].numerator + (bs[1].numerator / 60) + (bs[2].numerator /( bs[2].denominator * 3600));   
                                                            l = ls[0].numerator + (ls[1].numerator / 60) + (ls[2].numerator /( ls[2].denominator * 3600));
                                                            h = hs.numerator / hs.denominator;
                                                            imagewidth = EXIF.getTag(this, "PixelXDimension");
                                                            imageheight = EXIF.getTag(this, "PixelYDimension");
                                                        });
                                                    }                                                

                                                });
                                            }
                                            , before: function (obj) {
                                                if (firstimg_b == 0) {
                                                    firstmark = "首期";
                                                    layer.msg("正在上传请稍候...（此次上传的为首期影像，别传错哟!）", { icon: 16, time: 6000, shade: [0.5, '#000', true],zIndex: layer.zIndex });
                                                }
                                                else {
                                                    if ((Math.abs(firstimg_b - b) > 0.000005) || (Math.abs(firstimg_l - l) > 0.000005) || (Math.abs(firstimg_h - h) > 0.08)) {

                                                        layer.alert("影像与目标不符，请重选!!!", { title: "警告！", icon: 2, zIndex: layer.zIndex });
                                                        uploadInst.upload();
                                                        layer.close(addtimeimagelayerindex);
                                                    }
                                                    else {
                                                        layer.msg('正在上传请稍候...', { icon: 16, time: 6000, shade: [0.5, '#000', true], zIndex: layer.zIndex });
                                                    }
                                                }                                            
                                            }

                                            , done: function (res) {
                                                //上传完毕回调
                                                if (res.code == 1) {
                                                    layer.close(addtimeimagelayerindex);
                                                    //刷新列表
                                                    GettimeimageInfo();
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


                                    }
                                });
                                break;
                        };
                    });


                    //4.4 影像操作：查看、删除
                    table.on('tool(image_timeimage-edit)', function (obj) {
                        var data = obj.data;
                        var layEvent = obj.event;
                        var imageid = data.id;  
                        var yxbh = data.yxbh;
                        var w = data.width;
                        var h = data.height;

                        if (layEvent === 'timeimageview') {
                            //4.4.1查看影像
                            //TODO 影像查看放大缩小功能

                            layer.open({
                                type: 1
                                , title: ['消息', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                                , area: ['800px', '800px']
                                , shade: 0
                                , offset: 'auto'
                                , closeBtn: 1
                                , maxmin: true
                                , moveOut: true
                                , content: '<div id="openseadragon1" style="width: 100%; height: 100%;"></div>'
                                , zIndex: layer.zIndex
                                , success: function (layero) {
                                    layer.setTop(layero);

                                    //加载
                                    OpenSeadragon({
                                        id: "openseadragon1",
                                        prefixUrl: "/Scripts/openseadragon/images/",
                                        tileSources: [{
                                            type: "zoomifytileservice",
                                            width: w,
                                            height: h,
                                            //tilesUrl: "http://www.cq107chy.com:4022/SurDOMDSM/500243000001_1_20210725094538/"
                                            tilesUrl: "http://www.cq107chy.com:4022/SurDOMDSM/" + yxbh+"/"
                                        }]
                                    });


                                }
                                , end: function () {
                                    headernoticelayerindex = null;
                                }
                            });






                            //layer.open({
                            //    type: 1
                            //    , title: ['影像查看', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                            //    , area: ['720px', '600px']
                            //    , shade: 0
                            //    , offset: 'auto'
                            //    , closeBtn: 1
                            //    , maxmin: false
                            //    , moveOut: true
                            //    , content: '<form class="layui-form" style="margin-top:10px" lay-filter="viewtimeimageform">  <div class="layui-form-item" style="height: 560px;"><div class="layui-upload-list"><img class="layui-upload-img" id="image_timeimage_img" name="image_timeimage_img" style="width:100%;height:100%;vertical-align:middle"></div></div></form>'
                            //    , zIndex: layer.zIndex
                            //    , success: function (layero) {
                            //        layer.setTop(layero);
                            //        //点击单个影像 返回该影像信息并显示


                            //        //加载大图片
                            //        $.ajax({
                            //            url: servicesurl + "/api/ImageUpload/GetImageFile", type: "get", data: { "id": imageid, "cookie": document.cookie },
                            //            success: function (data) {
                            //                var result = JSON.parse(data);
                            //                //var result = data;
                            //                if (result.code == 1) {
                            //                    var imagefile = JSON.parse(result.data);
                            //                    $('#image_timeimage_img')[0].src = "data:image/jpeg;base64," + imagefile;
                            //                }
                            //                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            //            }, datatype: "json"
                            //        });



                                   
                            //    }
                            //    , end: function () { }
                            //});












                        }

                        //4.4.2删除影像
                        else if (layEvent === 'timeimagedel') {
                            layer.confirm('是否删除?', { icon: 3, title: '消息', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                                $.ajax({
                                    url: servicesurl + "/api/ImageUpload/DeleteImage", type: "delete", data: { "id": obj.data.id, "cookie": document.cookie },
                                    success: function (data) {
                                        var result = JSON.parse(data);
                                        layer.msg(result.message, { zindex: layer.zindex, success: function (layero) { layer.settop(layero); } });
                                    }, datatype: "json"
                                });
                                obj.del();
                                GettimeimageInfo();
                                layer.close(index);
                            });
                        }

                    });

                }
                , end: function () {
                    imagetargetinfoeditlayerindex = null;
                }
                , cancel: function () {
                    imagetargetinfoeditlayerindex = null;
                }
            });
        }
    }
    else if (style == "add") {
        //新建目标----必须选择当前项目
        //①--先选择当前项目
        if (id == null) {
            layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
        else {
            //②--再新建目标
            if (imagetargetinfoaddlayerindex == null) {
                imagetargetinfoaddlayerindex = layer.open({
                    type: 1
                    , title: ['新建目标', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                    , area: ['450px', '500px']
                    , shade: 0
                    , offset: 'auto'
                    , closeBtn: 1
                    , maxmin: true
                    , moveOut: true
                    , content: '<!--创建目标--><form class="layui-form" style="margin-top:5px;margin-right:5px;" lay-filter="addImagetargetinfoform"><div class="layui-form-item"><label class="layui-form-label">目标名称</label><div class="layui-input-block"><input type="text" name="image_mbmc_add" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">目标编号</label><div class="layui-input-block"><input type="text" name="image_mbbh_add" autocomplete="off" placeholder="请输入目标编号：如W01#T01" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">目标类型</label><div class="layui-input-block"><select id="mblxid" name="image_mblx_add" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">X</label><div class="layui-input-block"><input type="text" name="image_x_add" autocomplete="off" placeholder="请输入空间直角坐标 X" lay-verify="required|number" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">Y</label><div class="layui-input-block"><input type="text" name="image_y_add" autocomplete="off" placeholder="请输入空间直角坐标 Y" lay-verify="required|number" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">Z</label><div class="layui-input-block"><input type="text" name="image_z_add" autocomplete="off" placeholder="请输入空间直角坐标 Z" lay-verify="required|number" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">坐标系统</label><div class="layui-input-block"><select id="kjckid" name="image_kjck_add"></select></div></div><div class="layui-form-item"><label class="layui-form-label">备注</label><div class="layui-input-block"><input type="text" name="image_bz_add" placeholder="请输入" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item" style="margin-top:10px"><div style="position:absolute;right:15px;"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="addImagetargetinfosubmit" style="width:100px">提交</button></div></div></form>'
                    , zIndex: layer.zIndex
                    , success: function (layero) {
                        layer.setTop(layero);

                        if (srids.length > 0) {
                            for (var i in srids) {
                                if (srids[i].name == "China Geodetic Coordinate System 2000") {
                                    document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '" selected>' + srids[i].name + '</option>'; //设置默认选择"China Geodetic Coordinate System 2000"
                                }
                                else {
                                    document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '">' + srids[i].name + '</option>';     //设置默认选择为空
                                }
                            }
                        }

                        if (mblxs.length > 0) {
                            for (var i in mblxs) {
                                document.getElementById("mblxid").innerHTML += '<option value="' + mblxs[i].value + '">' + mblxs[i].name + '</option>';
                            }
                        }

                        form.render();
                        form.render('select');//刷新

                        //提交——创建目标
                        form.on('submit(addImagetargetinfosubmit)', function (data) {
                            data.field.cookie = document.cookie;
                            data.field.projectid = currentprojectid;

                            $.ajax({
                                url: servicesurl + "/api/ImageTarget/AddTarget", type: "post", data: data.field,
                                success: function (result) {
                                    var info = JSON.parse(result);
                                    if (info.code == 1) {
                                        layer.close(imagetargetinfoaddlayerindex);

                                        //刷新项目列表
                                        GetUserAllImageProjects();
                                    }


                                    layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                }, datatype: "json"
                            });
                            return false;
                        });
                    }

                    , end: function () {
                        imagetargetinfoaddlayerindex = null;
                    }
                    , cancel: function () {
                        imagetargetinfoaddlayerindex = null;
                    }
                });
            }
        }
    }
};


