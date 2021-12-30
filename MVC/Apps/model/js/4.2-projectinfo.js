//项目信息
function ModelProjectInfo(id, style) {
    if (style == "view") {
        //查看项目
        if (modelprojectinfoviewlayerindex == null) {
            modelprojectinfoviewlayerindex = layer.open({
                type: 1
                , title: ['查看项目信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['420px', '390px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , anim: 0
                , maxmin: true
                , moveOut: true
                , content: '<!--查看项目信息--> <form class="layui-form" style="margin-top:5px;margin-right:20px;" lay-filter="viewModelprojectinfoform"> <div class="layui-form-item"> <label class="layui-form-label">项目名称</label> <div class="layui-input-block"> <input type="text" name="model_xmmc_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">项目编码</label> <div class="layui-input-block"> <input type="text" name="model_xmbm_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">项目位置</label> <div class="layui-input-block"> <input type="text" name="model_xmwz_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">中心经度</label> <div class="layui-input-block"> <input type="text" name="model_zxjd_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">中心纬度</label> <div class="layui-input-block"> <input type="text" name="model_zxwd_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">项目时间</label> <div class="layui-input-block"> <input type="text" name="model_xmsj_view" readonly="readonly" class="layui-input" /> </div> </div><div class="layui-form-item"> <label class="layui-form-label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label> <div class="layui-input-block"> <input type="text" name="model_bz_view" readonly="readonly" class="layui-input"> </div> </div> </form>'
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
                }
                else {
                    form.val("viewModelprojectinfoform", {
                        "model_xmmc_view": ""
                        , "model_xmbm_view": ""
                        , "model_xmwz_view": ""
                        , "model_zxjd_view": ""
                        , "model_zxwd_view": ""
                        , "model_xmsj_view": ""
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
                , area: ['420px', '490px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--编辑项目--> <form class="layui-form" style="margin-top:5px;margin-right:20px;" lay-filter="editModelprojectinfoform"> <div class="layui-form-item"> <label class="layui-form-label">项目名称</label> <div class="layui-input-block"><input type="text" name="model_xmmc_edit" autocomplete="off" lay-verify="required" class="layui-input" /></div> </div> <div class="layui-form-item"> <label class="layui-form-label">项目编码</label> <div class="layui-input-block"> <input type="text" name="model_xmbm_edit" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">行政区划</label> <div class="layui-input-block"><select id="province1id" name="model_province_edit" lay-verify="required"><option value="">省/市</option><option value="0" selected>重庆市</option></select></div></div> <div class="layui-form-item"> <label class="layui-form-label"></label> <div class="layui-input-block"><select id="district1id" name="model_district_edit" disabled="disabled" lay-verify="required"><option value="">区/县</option></select></div> </div> <div class="layui-form-item"> <div class="grid-demo"> <label class="layui-form-label">项目位置</label> <div class="layui-input-block"><input type="text" name="model_xmwz_edit" autocomplete="off" class="layui-input" /></div> </div> </div> <div class="layui-form-item"> <div class="grid-demo grid-demo-bg1"> <label class="layui-form-label">中心经度</label> <div class="layui-input-block"><input type="text" name="model_zxjd_edit" autocomplete="off" lay-verify="required|number" class="layui-input" /></div> </div> </div> <div class="layui-form-item"> <div class="grid-demo"> <label class="layui-form-label">中心纬度</label> <div class="layui-input-block"><input type="text" name="model_zxwd_edit" autocomplete="off" lay-verify="required|number" class="layui-input" /></div> </div> </div> <div class="layui-form-item"> <div class="grid-demo"> <label class="layui-form-label">项目时间</label> <div class="layui-input-block"><input type="text" id="xmsjid" name="model_xmsj_edit" lay-verify="date" placeholder="YYYY-MM-DD" class="layui-input" /></div> </div> </div><div class="layui-form-item"> <label class="layui-form-label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label> <div class="layui-input-block"><input type="text" name="model_bz_edit" class="layui-input"></div> </div> <div class="layui-form-item" style="margin-top:10px"> <div style="position:absolute;right:20px;"> <button type="submit" class="layui-btn" lay-submit="" lay-filter="editModelprojectinfosubmit" style="width:100px">提交</button> </div> </div> </form> '
                , success: function (layero) {
                    layer.setTop(layero);

                    //项目信息
                    $.ajax({
                        url: servicesurl + "/api/ModelProject/GetModelProjectInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                        success: function (data) {
                            var result = JSON.parse(data);
                            if (result.code == 1) {
                                var modelprojectinfo = JSON.parse(result.data);
                                form.val("editModelprojectinfoform", {
                                    "model_xmmc_edit": modelprojectinfo.XMMC
                                    ,"model_xmbm_edit": modelprojectinfo.XMBM
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
                                //刷新项目列表
                                GetUserAllModelProjects();
                            }, datatype: "json"
                        });
                        return false;
                    });
                }
                , end: function () {
                    modelprojectinfoeditlayerindex = null;
                }
            })
        }
    }
    else if (style == "add") {
        //新建项目
        if (modelprojectinfoaddlayerindex == null) {
            modelprojectinfoaddlayerindex = layer.open({
                type: 1
                , title: ['新建项目', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['420px', '450px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , scrollbar: false
                , content: '<!--创建项目--> <form class="layui-form" style="margin-top:5px;margin-right:20px;" lay-filter="addModelprojectinfoform"> <div class="layui-form-item"> <label class="layui-form-label">项目名称</label> <div class="layui-input-block"><input type="text" name="model_xmmc_add" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div> </div> <div class="layui-form-item"> <label class="layui-form-label">行政区划</label> <div class="layui-input-block"><select id="province1id" name="model_province_add" lay-verify="required"><option value="">省/市</option><option value="0">重庆市</option></select></div> </div> <div class="layui-form-item"> <label class="layui-form-label"></label> <div class="layui-input-block"><select id="district1id_add" name="model_district_add" lay-verify="required"><option value="">区/县</option></select></div> </div> <div class="layui-form-item"> <label class="layui-form-label">项目位置</label> <div class="layui-input-block"><input type="text" id="model_xmwz_add" name="model_xmwz_add" autocomplete="off" placeholder="详细位置(乡镇村)" class="layui-input" /></div> </div> <div class="layui-form-item"> <label class="layui-form-label">中心经度</label> <div class="layui-input-block"><input type="text" name="model_zxjd_add" autocomplete="off" placeholder="请输入" lay-verify="required|number" class="layui-input" /></div> </div> <div class="layui-form-item"> <label class="layui-form-label">中心纬度</label> <div class="layui-input-block"><input type="text" name="model_zxwd_add" autocomplete="off" placeholder="请输入" lay-verify="required|number" class="layui-input" /></div> </div> <div class="layui-form-item"> <label class="layui-form-label">项目时间</label> <div class="layui-input-block"><input type="text" id="xmsjid" name="model_xmsj_add" lay-verify="required|date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" /></div> </div><div class="layui-form-item"> <label class="layui-form-label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label> <div class="layui-input-block"><input type="text" name="model_bz_add" placeholder="请输入" autocomplete="off" class="layui-input"></div> </div> <div class="layui-form-item" style="margin-top:10px"> <div style="position:absolute;right:20px;"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="addModelprojectinfosubmit" style="width:100px">提交</button></div> </div> </form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);
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
                    form.render('select');//刷新网页  数据库枚举选项，不然显示不出来
                    
                    form.on('submit(addModelprojectinfosubmit)', function (data) {
                        data.field.cookie = document.cookie;

                        $.ajax({
                            url: servicesurl + "/api/ModelProject/AddProject", type: "post", data: data.field,
                            success: function (result) {
                                var info = JSON.parse(result);
                                if (info.code == 1) {
                                    //创建成功
                                    layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    layer.close(modelprojectinfoaddlayerindex);

                                    //刷新项目列表
                                    GetUserAllModelProjects();
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
                    modelprojectinfoaddlayerindex = null;
                }
                , cancel: function () {
                    modelprojectinfoaddlayerindex = null;
                }

            });
        }
    }
};


