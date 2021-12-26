
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
                , content: '<!--查看任务--> <form class="layui-form" style="margin-top:5px;margin-right:10px;" lay-filter="viewModeltaskinfoform"> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label">任务名称</label> <div class="layui-input-block"> <input type="text" name="model_rwmc_view" readonly="readonly" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label">任务编码</label> <div class="layui-input-block"> <input type="text" name="model_rwbm_view" readonly="readonly" class="layui-input" /> </div> </div> </div> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label">采集人员</label> <div class="layui-input-block"> <input type="text" name="model_yxcjry_view" readonly="readonly" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" >影像数量</label> <div class="layui-input-block"> <input type="text" name="model_yxsl_view" readonly="readonly" class="layui-input" /> </div> </div> </div> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" >采集时间</label> <div class="layui-input-block"> <input type="text" id="yxcjsjid" name="model_yxcjsj_view" readonly="readonly" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label" >采集设备</label> <div class="layui-input-block"> <input type="text" name="model_yxcjsb_view" readonly="readonly" class="layui-input" /> </div> </div> </div> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" >坐标系统</label> <div class="layui-input-block"> <input type="text" name="model_kjck_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" >目标成果</label> <div class="layui-input-block" id="sxcgid"> <input type="text" name="model_sxcg_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">控制点</label> <div class="layui-input-block"> <input type="text" name="model_yxkzd_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">范围</label> <div class="layui-input-block"> <input type="text" name="model_yxfw_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" >影像链接</label> <div class="layui-input-block"> <input type="text" name="model_yxcflj_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">任务描述</label> <div class="layui-input-block"> <input type="text" name="model_rwms_view" readonly="readonly" class="layui-input"> </div> </div> <div class="layui-form-item"> <label class="layui-form-label" >成果链接</label> <div class="layui-input-block"> <input type="text" name="model_cgxzlj_view" readonly="readonly" class="layui-input"> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">模型描述</label> <div class="layui-input-block"> <input type="text" name="model_mxms_view" readonly="readonly" class="layui-input"> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">备注</label> <div class="layui-input-block"> <input type="text" name="model_bz_view" readonly="readonly" class="layui-input"> </div> </div> </form>'
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
    
};

