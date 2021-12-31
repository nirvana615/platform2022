

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
                , area: ['750px', '520px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , resize: false
                , content: '<!--查看任务--> <form class="layui-form" style="margin-top:5px;margin-right:20px;" lay-filter="viewModeltaskinfoform"><div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <label class="layui-form-label">所属项目</label> <div class="layui-input-block"> <input type="text" name="model_xmmc_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label">行政区划</label> <div class="layui-input-block"> <input type="text" name="model_xzqh_view" readonly="readonly" class="layui-input" /> </div> </div> </div> </div> </div><div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label">任务名称</label> <div class="layui-input-block"> <input type="text" name="model_rwmc_view" readonly="readonly" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label">任务编码</label> <div class="layui-input-block"> <input type="text" name="model_rwbm_view" readonly="readonly" class="layui-input" /> </div> </div> </div> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label">采集人员</label> <div class="layui-input-block"> <input type="text" name="model_yxcjry_view" readonly="readonly" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label">影像数量</label> <div class="layui-input-block"> <input type="text" name="model_yxsl_view" readonly="readonly" class="layui-input" /> </div> </div> </div> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label">采集时间</label> <div class="layui-input-block"> <input type="text" id="yxcjsjid" name="model_yxcjsj_view" readonly="readonly" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label">采集设备</label> <div class="layui-input-block"> <input type="text" name="model_yxcjsb_view" readonly="readonly" class="layui-input" /> </div> </div> </div> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">坐标系统</label> <div class="layui-input-block"> <input type="text" name="model_kjck_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">目标成果</label> <div class="layui-input-block" id="sxcgid"> <input type="text" name="model_sxcg_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">影像链接</label> <div class="layui-input-block"> <input type="text" name="model_yxcflj_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">控制点</label> <div class="layui-input-block"> <textarea name="model_yxkzd_view" readonly="readonly" class="layui-textarea"></textarea> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">任务描述</label> <div class="layui-input-block"> <input type="text" name="model_rwms_view" readonly="readonly" class="layui-input"> </div> </div> </form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);

                    form.render();
                }
                , end: function () {
                    layer.close(modeltaskinfoviewlayerindex);
                    modeltaskinfoviewlayerindex = null;
                }
            });
        }
        //异步获取目标基本信息
        $.ajax({
            url: servicesurl + "/api/ModelTask/GetTaskInfo", type: "get", data: { "id": id, "cookie": document.cookie },
            success: function (data) {
                var result = JSON.parse(data);
                if (result.code == 1) {
                    var taskinfo = JSON.parse(result.data);
                    var projectinfo = JSON.parse(result.message);

                    form.val("viewModeltaskinfoform", {
                        "model_xmmc_view": projectinfo.XMMC
                        , "model_rwmc_view": taskinfo.RWMC
                        , "model_rwbm_view": taskinfo.RWBM
                        , "model_yxcjry_view": taskinfo.YXCJRY
                        , "model_yxcjsj_view": taskinfo.YXCJSJ
                        , "model_yxsl_view": taskinfo.YXSL
                        , "model_yxkzd_view": taskinfo.YXKZD
                        , "model_yxfw_view": taskinfo.YXFW
                        , "model_yxcflj_view": taskinfo.YXCFLJ
                        , "model_rwms_view": taskinfo.RWMS

                    });
                    //翻译项目位置
                    if (xjxzqs.length > 0) {
                        for (var i in xjxzqs) {
                            if (xjxzqs[i].value == projectinfo.XZQBM) {
                                var xzqh = "重庆市" + xjxzqs[i].name;
                                form.val("viewModeltaskinfoform", {
                                    "model_xzqh_view": xzqh
                                });
                            }
                        }
                    }
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

                                    sxcgdata += sxcgs[j].name + "；";
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

            }, datatype: "json"
        });
    }
    
};

