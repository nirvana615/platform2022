//项目信息
function ImageProjectInfo(id, style) {
    if (style == "view") {
        //查看项目
        if (imageprojectinfoviewlayerindex == null) {
            imageprojectinfoviewlayerindex = layer.open({
                type: 1
                , title: ['查看项目信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['560px', '430px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , anim: 0
                , maxmin: true
                , moveOut: true
                , content: '<!--查看项目--><form class="layui-form" style="margin-top:5px;margin-right:5px;" lay-filter="viewImageprojectinfoform"><div class="layui-form-item"><label class="layui-form-label">项目名称</label><div class="layui-input-block"><input type="text" name="image_xmmc_view" class="layui-input" readonly="readonly"/></div></div><div class="layui-form-item"><label class="layui-form-label">项目编码</label><div class="layui-input-block"><input type="text" name="image_xmbm_view" class="layui-input" readonly="readonly"/></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label">中心经度</label><div class="layui-input-block"><input type="text" name="image_zxjd_view" class="layui-input" readonly="readonly"/></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label">中心纬度</label><div class="layui-input-block"><input type="text" name="image_zxwd_view" class="layui-input" readonly="readonly"/></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label">坐标系统</label><div class="layui-input-block"><input type="text" name="image_kjck_view" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label">描述</label><div class="layui-input-block"><input type="text" name="image_ms_view" class="layui-input" readonly="readonly"></div></div><div class="layui-form-item"><label class="layui-form-label">备注</label><div class="layui-input-block"><input type="text" name="image_bz_view" class="layui-input" readonly="readonly"></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    form.render();
                }
                , end: function () {
                    imageprojectinfoviewlayerindex = null;
                }
            });
        }

        //异步获取项目信息
        $.ajax({
            url: servicesurl + "/api/ImageProject/GetImageProjectInfo", type: "get", data: { "id": id, "cookie": document.cookie },
            success: function (data) {
                var result = JSON.parse(data);
                if (result.code == 1) {
                    var imageprojectinfo = JSON.parse(result.data);

                    form.val("viewImageprojectinfoform", {
                        "image_xmmc_view": imageprojectinfo.XMMC
                        , "image_xmbm_view": imageprojectinfo.XMBM
                        , "image_zxjd_view": imageprojectinfo.ZXJD
                        , "image_zxwd_view": imageprojectinfo.ZXWD
                        , "image_ms_view": imageprojectinfo.MS
                        , "image_bz_view": imageprojectinfo.BZ
                    });

                    //翻译空间参考
                    if (srids.length > 0) {
                        for (var i in srids) {
                            if (srids[i].value == imageprojectinfo.SRID) {
                                form.val("viewImageprojectinfoform", {
                                    "image_kjck_view": srids[i].name
                                });
                            }
                        }
                    }
                }
                else {
                    form.val("viewImageprojectinfoform", {
                        "image_xmmc_view": ""
                        , "image_xmbm_view": ""                       
                        , "image_zxjd_view": ""
                        , "image_zxwd_view": ""
                        , "image_kjck_view": ""
                        , "image_ms_view": ""
                        , "image_bz_view": ""
                    });
                }
                //弹出消息————controller里定义的各类情况result.message
                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });   
            }, datatype: "json"
        });
    }
    else if (style == "edit") {
        //编辑项目
        if (imageprojectinfoeditlayerindex == null) {
            imageprojectinfoeditlayerindex = layer.open({
                type: 1
                , title: ['编辑项目信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['560px', '380px']
                , shade: 0  
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--编辑项目--><form class="layui-form" style="margin-top:5px;margin-right:5px;" lay-filter="editImageprojectinfoform"><div class="layui-form-item"><label class="layui-form-label">项目名称</label><div class="layui-input-block"><input type="text" name="image_xmmc_edit" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">项目编码</label><div class="layui-input-block"><input type="text" name="image_xmbm_edit" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label">中心经度</label><div class="layui-input-block"><input type="text" name="image_zxjd_edit" autocomplete="off" placeholder="请输入" lay-verify="required|number" class="layui-input" /></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label">中心纬度</label><div class="layui-input-block"><input type="text" name="image_zxwd_edit" autocomplete="off" placeholder="请输入" lay-verify="required|number" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label">坐标系统</label><div class="layui-input-block"><select id="kjckid" name="image_kjck_edit"></select></div></div><div class="layui-form-item"><label class="layui-form-label">描述</label><div class="layui-input-block"><input type="text" name="image_ms_edit" placeholder="请输入" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item"><label class="layui-form-label">备注</label><div class="layui-input-block"><input type="text" name="image_bz_edit" placeholder="请输入" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item" style="margin-top:10px"><div style="position:absolute;right:180px;"><button type="button" class="layui-btn layui-btn-primary layui-border-green" id="modelconnect" style="width:100px">模型关联</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="editImageprojectinfosubmit" style="width:100px">保存</button></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    //项目信息
                    $.ajax({
                        url: servicesurl + "/api/ImageProject/GetImageProjectInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                        success: function (data) {
                            var result = JSON.parse(data);
                            if (result.code == 1) {
                                var imageprojectinfo = JSON.parse(result.data);
                                form.val("editImageprojectinfoform", {
                                    "image_xmmc_edit": imageprojectinfo.XMMC
                                    , "image_xmbm_edit": imageprojectinfo.XMBM
                                    , "image_zxjd_edit": imageprojectinfo.ZXJD
                                    , "image_zxwd_edit": imageprojectinfo.ZXWD
                                    , "image_ms_edit": imageprojectinfo.MS
                                    , "image_bz_edit": imageprojectinfo.BZ
                                })
                               
                                //翻译空间参考
                                if (srids.length > 0) {
                                    for (var i in srids) {
                                        if (srids[i].value == imageprojectinfo.SRID) {
                                            document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '" selected>' + srids[i].name + '</option>'; 
                                        }
                                        else {
                                            document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '">' + srids[i].name + '</option>';//设置默认选择为空
                                        }
                                    }
                                }
                            }
                            else {
                                var imageprojectinfo = JSON.parse(resule.data);
                                form.val("editImageprojectinfoform", {
                                    "image_xmmc_edit": ""
                                    , "image_xmbm_edit": ""
                                    , "image_zxjd_edit": ""
                                    , "image_zxwd_edit": ""
                                    , "image_kjck_edit": ""
                                    , "image_ms_edit": ""
                                    , "image_bz_edit": ""
                                })
                            }
                            form.render();//更新渲染
                            form.render('select');//更新渲染select  数据库枚举选项，不然显示不出来

                            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }, datatype: "json"   
                    });

                    //模型关联
                    $("#modelconnect").on("click", function (data) {
                        ModelConnect(id, document.cookie);  
                    });
                   
                    //更新项目
                    form.on('submit(editImageprojectinfosubmit)', function (data) {
                        data.field.id = id;
                        data.field.cookie = document.cookie;

                        $.ajax({
                            url: servicesurl + "/api/ImageProject/UpdateImageProject", type: "put", data: data.field,
                            success: function (data) {
                                var result = JSON.parse(data);
                                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                layer.close(imageprojectinfoeditlayerindex);  //关闭模块
                            }, datatype: "json"  
                        });
                    });
                }
                , end: function () {
                    imageprojectinfoeditlayerindex = null;
                }
            })
        }
    }
    else if (style == "add") {
        //新建项目
        if (imageprojectinfoaddlayerindex == null) {
            imageprojectinfoaddlayerindex = layer.open({
                type: 1
                , title: ['新建项目', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['560px', '370px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--创建项目--><form class="layui-form" style="margin-top:5px;margin-right:5px;" lay-filter="addImageprojectinfoform"><div class="layui-form-item"><label class="layui-form-label">项目名称</label><div class="layui-input-block"><input type="text" name="image_xmmc_add" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">项目编码</label><div class="layui-input-block"><input type="text" name="image_xmbm_add" autocomplete="off" placeholder="请输入"  class="layui-input" /></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label">中心经度</label><div class="layui-input-block"><input type="text" name="image_zxjd_add" autocomplete="off" placeholder="请输入" lay-verify="required|number" class="layui-input" /></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label">中心纬度</label><div class="layui-input-block"><input type="text" name="image_zxwd_add" autocomplete="off" placeholder="请输入" lay-verify="required|number" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label">坐标系统</label><div class="layui-input-block"><select id="kjckid" name="image_kjck_add" ></select></div></div><div class="layui-form-item"><label class="layui-form-label">描述</label><div class="layui-input-block"><input type="text" name="image_ms_add"  placeholder="请输入" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item"><label class="layui-form-label">备注</label><div class="layui-input-block"><input type="text" name="image_bz_add"  placeholder="请输入" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item" style="margin-top:10px"><div style="position:absolute;right:130px;"><button type="button" class="layui-btn layui-btn-primary layui-border-green" id="modelconnect" style="width:100px">模型关联</button><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="addImageprojectinfosubmit" style="width:100px">提交</button></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    if (srids.length > 0) {
                        for (var i in srids) {
                            if (srids[i].name == "China Geodetic Coordinate System 2000") {
                                document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '" selected>' + srids[i].name + '</option>';
                            }
                            else {
                                document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '">' + srids[i].name + '</option>';
                            }
                        }
                    }

                    form.render();
                    form.render('select');//刷新网页  数据库枚举选项，不然显示不出来

                    form.on('submit(addImageprojectinfosubmit)', function (data) {
                        data.field.cookie = document.cookie;

                        $.ajax({
                            url: servicesurl + "/api/ImageProject/AddProject", type: "post", data: data.field,
                            success: function (result) {
                                var info = JSON.parse(result);
                                if (info.code == 1) {
                                    //创建成功
                                    layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    layer.close(imageprojectinfoaddlayerindex);

                                    //刷新项目列表
                                    GetUserAllImageProjects();
                                }
                                else {
                                    //创建失败
                                    layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                }
                            }, datatype: "json"
                        });

                        return false;
                    });
                }
                , end: function () {
                    imageprojectinfoaddlayerindex = null;
                }
                , cancel: function () {
                    imageprojectinfoaddlayerindex = null;
                }
            });
        }
    }
};
