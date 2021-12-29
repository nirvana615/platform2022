

function modelview(id) {
    //调整视角
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
            mxsj: JSON.stringify(home),
            id: id//模型id
        }
        $.ajax({
            url: servicesurl + "/api/ModelTask/UpdateModelGoodView", type: "put", data: data2,
            success: function (result) {
                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                layer.close(loadingminindex);
            }, datatype: "json"
        });
    });
}
//任务
function ModelTaskInfo(id, style) {
    if (style == "view") {
        //查看目标
        if (modeltaskinfoviewlayerindex == null) {
            modeltaskinfoviewlayerindex = layer.open({
                type: 1
                , title: ['查看任务', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['750px', '620px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--查看任务--> <form class="layui-form" style="margin-top:5px;margin-right:10px;" lay-filter="viewModeltaskinfoform"> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label">任务名称</label> <div class="layui-input-block"> <input type="text" name="model_rwmc_view" readonly="readonly" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label">任务编码</label> <div class="layui-input-block"> <input type="text" name="model_rwbm_view" readonly="readonly" class="layui-input" /> </div> </div> </div> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label">采集人员</label> <div class="layui-input-block"> <input type="text" name="model_yxcjry_view" readonly="readonly" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" >影像数量</label> <div class="layui-input-block"> <input type="text" name="model_yxsl_view" readonly="readonly" class="layui-input" /> </div> </div> </div> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" >采集时间</label> <div class="layui-input-block"> <input type="text" id="yxcjsjid" name="model_yxcjsj_view" readonly="readonly" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" >采集设备</label> <div class="layui-input-block"> <input type="text" name="model_yxcjsb_view" readonly="readonly" class="layui-input" /> </div> </div> </div> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" >坐标系统</label> <div class="layui-input-block"> <input type="text" name="model_kjck_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" >目标成果</label> <div class="layui-input-block" id="sxcgid"> <input type="text" name="model_sxcg_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">控制点</label> <div class="layui-input-block"> <input type="text" name="model_yxkzd_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">范&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;围</label> <div class="layui-input-block"> <input type="text" name="model_yxfw_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" >影像链接</label> <div class="layui-input-block"> <input type="text" name="model_yxcflj_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">任务描述</label> <div class="layui-input-block"> <input type="text" name="model_rwms_view" readonly="readonly" class="layui-input"> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" >成果链接</label> <div class="layui-input-block"> <input type="text" name="model_cgxzlj_view" readonly="readonly" class="layui-input"> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">模型描述</label> <div class="layui-input-block"> <input type="text" name="model_mxms_view" readonly="readonly" class="layui-input"> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label> <div class="layui-input-block"> <input type="text" name="model_bz_view" readonly="readonly" class="layui-input"> </div> </div> </form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);
                    //异步获取目标基本信息
                    $.ajax({
                        url: servicesurl + "/api/ModelTask/GetTaskInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                        success: function (data) {
                            var result = JSON.parse(data);
                            if (result.code == 1) {
                                var taskinfo = JSON.parse(result.data);
                                
                                form.val("viewModeltaskinfoform", {
                                    "model_rwmc_view": taskinfo.RWMC
                                    , "model_rwbm_view": taskinfo.RWBM
                                    , "model_yxcjry_view": taskinfo.YXCJRY
                                    , "model_yxcjsj_view": taskinfo.YXCJSJ
                                    , "model_yxsl_view": taskinfo.YXSL
                                    , "model_yxkzd_view": taskinfo.YXKZD
                                    , "model_yxfw_view": taskinfo.YXFW
                                    , "model_yxcflj_view": taskinfo.YXCFLJ
                                    , "model_rwms_view": taskinfo.RWMS
                                    , "model_cgxzlj_view": taskinfo.CGXZLJ
                                    , "model_mxms_view": taskinfo.MXMS
                                    , "model_bz_view": taskinfo.BZ
                                    
                                });
                                //采集设备
                                if (cjsbs.length > 0) {
                                    for (var i in cjsbs) {
                                        if (cjsbs[i].value == taskinfo.YXCJSB) {
                                            form.val("viewModeltaskinfoform", {
                                                "model_yxcjsb_view": cjsbs[i].name
                                            });
                                        }
                                    }
                                }
                                //翻译目标类型、空间参考
                                if (srids.length > 0) {
                                    for (var i in srids) {
                                        if (srids[i].value == taskinfo.SRID) {
                                            form.val("viewModeltaskinfoform", {
                                                "model_kjck_view": srids[i].name
                                            });
                                        }
                                    }
                                }
                                //所需成果
                                if (sxcgs.length > 0) {
                                    var Sxcg = taskinfo.SXCG.trim().split(",");
                                    var sxcgdata = "";
                                    for (var i in Sxcg) {
                                        for (var j in sxcgs) {
                                            if (sxcgs[j].value == Sxcg[i]) {

                                                sxcgdata += sxcgs[j].name+"；";
                                            }
                                        }
                                    }
                                    form.val("viewModeltaskinfoform", {
                                        "model_sxcg_view": sxcgdata
                                    });
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
                    layer.close(modeltaskinfoviewlayerindex);
                    modeltaskinfoviewlayerindex = null;
                }
            });
        }
    }
    else if (style == "edit") {
        
        //编辑目标
        if (modeltaskinfoeditlayerindex == null) {
            modeltaskinfoeditlayerindex = layer.open({
                type: 1
                , title: ['编辑任务', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['750px', '650px']
                , shade: 0
                , offset: 'auto'
                , maxmin: true
                , closeBtn: 1
                , moveOut: true
                , content: '<!--编辑任务--> <form class="layui-form" style="margin-top:5px;margin-right:10px;" lay-filter="editModeltaskinfoform"> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" >*任务名称</label> <div class="layui-input-block"> <input type="text" name="model_rwmc_edit" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" >*任务编码</label> <div class="layui-input-block"> <input type="text" name="model_rwbm_edit" readonly="readonly" class="layui-input" /> </div> </div> </div> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" >*采集人员</label> <div class="layui-input-block"> <input type="text" name="model_yxcjry_edit" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" >*影像数量</label> <div class="layui-input-block"> <input type="text" name="model_yxsl_edit" autocomplete="off" placeholder="请输入数字" lay-verify="required|number" class="layui-input" /> </div> </div> </div> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" >*采集时间</label> <div class="layui-input-block"> <input type="text" id="yxcjsjid" name="model_yxcjsj_edit" lay-verify="required|date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" >*采集设备</label> <div class="layui-input-block"> <select id="yxcjsbid" name="model_yxcjsb_edit" lay-verify="required"></select> </div> </div> </div> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" >*坐标系统</label> <div class="layui-input-block"> <select id="kjckid" name="model_kjck_edit" lay-verify="required"></select> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" >*目标成果</label> <div class="layui-input-block" id="sxcgid"></div> </div> <div class="layui-form-item"> <label class="layui-form-label">控制点</label> <div class="layui-input-block"> <input type="text" name="model_yxkzd_edit" autocomplete="off" placeholder="请输入txt格式" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">范&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;围</label> <div class="layui-input-block"> <input type="text" name="model_yxfw_edit" autocomplete="off" placeholder="请输入kml格式" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" >*影像链接</label> <div class="layui-input-block"> <input type="text" name="model_yxcflj_edit" autocomplete="off" placeholder="请输入影像链接" lay-verify="required" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">任务描述</label> <div class="layui-input-block"> <input type="text" name="model_rwms_edit" autocomplete="off" placeholder="请输入" class="layui-input"> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">成果链接</label> <div class="layui-input-block"> <input type="text" name="model_cgxzlj_edit" autocomplete="off" placeholder="请输入" class="layui-input"> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">模型描述</label> <div class="layui-input-block"> <input type="text" name="model_mxms_edit" autocomplete="off" placeholder="请输入" class="layui-input"> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label> <div class="layui-input-block"> <input type="text" name="model_bz_edit" placeholder="请输入备注" autocomplete="off" class="layui-input"> </div> </div> <div class="layui-form-item" style="margin-top:10px"> <div style="position:absolute;right:15px;"> <button type="button" class="layui-btn layui-btn-primary" id="modelview" style="width:100px">模型视角</button> <button type="submit" class="layui-btn" lay-submit="" lay-filter="editModeltaskinfosubmit" style="width:100px">提交</button> </div> </div> </form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);
                    //异步获取目标基本信息
                    $.ajax({
                        url: servicesurl + "/api/ModelTask/GetTaskInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                        success: function (data) {
                            var result = JSON.parse(data);
                            if (result.code == 1) {
                                var taskinfo = JSON.parse(result.data);
                                form.val("editModeltaskinfoform", {
                                    "model_rwmc_edit": taskinfo.RWMC
                                    , "model_rwbm_edit": taskinfo.RWBM
                                    , "model_yxcjry_edit": taskinfo.YXCJRY
                                    , "model_yxcjsj_edit": taskinfo.YXCJSJ
                                    , "model_yxsl_edit": taskinfo.YXSL
                                    , "model_yxkzd_edit": taskinfo.YXKZD
                                    , "model_yxfw_edit": taskinfo.YXFW
                                    , "model_yxcflj_edit": taskinfo.YXCFLJ
                                    , "model_rwms_edit": taskinfo.RWMS
                                    , "model_cgxzlj_edit": taskinfo.CGXZLJ
                                    , "model_mxms_edit": taskinfo.MXMS
                                    , "model_bz_edit": taskinfo.BZ
                                });

                                //采集设备
                                if (cjsbs.length > 0) {
                                    for (var i in cjsbs) {
                                        if (cjsbs[i].value == taskinfo.YXCJSB) {
                                            document.getElementById("yxcjsbid").innerHTML += '<option value="' + cjsbs[i].value + '" selected">' + cjsbs[i].name + '</option>';
                                        }
                                        else {
                                            document.getElementById("yxcjsbid").innerHTML += '<option value="' + cjsbs[i].value + '">' + cjsbs[i].name + '</option>';
                                        }
                                    }
                                }
                                //空间参考
                                if (srids.length > 0) {
                                    for (var i in srids) {
                                        if (srids[i].value == taskinfo.SRID) {
                                            document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '" selected>' + srids[i].name + '</option>'; //设置默认选择"China Geodetic Coordinate System 2000"
                                        }
                                        else {
                                            document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '">' + srids[i].name + '</option>';     //设置默认选择为空
                                        }
                                    }
                                }

                                //所需成果
                                if (sxcgs.length > 0) {
                                    var Sxcg = taskinfo.SXCG.trim();
                                    for (var i in sxcgs) {
                                        if (Sxcg.includes(sxcgs[i].value)) {
                                            document.getElementById("sxcgid").innerHTML += '<input name="model_sxcg_edit" value="' + sxcgs[i].value + '"' + 'type="checkbox" title="' + sxcgs[i].name + '" checked="">'; //设置默认选择"系统模型"
                                        }
                                        else {
                                            document.getElementById("sxcgid").innerHTML += '<input name="model_sxcg_edit" value="' + sxcgs[i].value + '"' + 'type="checkbox" title="' + sxcgs[i].name + '">';
                                        }

                                    }
                                }
                                //渲染时间
                                date.render({
                                    elem: '#yxcjsjid'
                                });

                                form.render();
                                form.render('select');
                            }

                            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }, datatype: "json"
                    });

                    //保存编辑--更新目标信息
                    form.on('submit(editModeltaskinfosubmit)', function (data) {
                        //将页面全部复选框选中的值拼接到一个数组中
                        var arr_box = [];
                        $('input[name=model_sxcg_edit]:checked').each(function () {
                            arr_box.push($(this).val());
                        });
                        data.field.cookie = document.cookie;
                        data.field.id = id;
                        data.field.model_sxcg_edit = arr_box.toString();
                        
                        $.ajax({
                            url: servicesurl + "/api/ModelTask/UpdateTaskInfo", type: "put", data: data.field,
                            success: function (result) {
                                var info = JSON.parse(result);
                                //刷新项目列表
                                GetUserAllModelProjects();
                                layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                layer.close(modeltaskinfoeditlayerindex);  //关闭模块
                                
                            }, datatype: "json"
                        });
                        return false;
                    });

                }
                , end: function () {
                    modeltaskinfoeditlayerindex = null;
                }
                , cancel: function () {
                    modeltaskinfoeditlayerindex = null;
                }
            });
        }

        //调整视角
        $("#modelview").on("click", function () {
            modelview(id);
        });
    }
};

