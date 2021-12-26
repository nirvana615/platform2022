//项目信息
function ModelProjectInfo(id, style) {
    if (style == "view") {
        //查看项目
        if (modelprojectinfoviewlayerindex == null) {
            modelprojectinfoviewlayerindex = layer.open({
                type: 1
                , title: ['查看项目信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['560px', '400px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , anim: 0
                , maxmin: true
                , moveOut: true
                , content: '<!--查看项目信息--> <form class="layui-form" style="margin-top:5px;margin-right:10px;" lay-filter="viewModelprojectinfoform"> <div class="layui-form-item"> <label class="layui-form-label">项目名称</label> <div class="layui-input-block"> <input type="text" name="model_xmmc_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">项目编码</label> <div class="layui-input-block"> <input type="text" name="model_xmbm_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">项目位置</label> <div class="layui-input-block"> <input type="text" name="model_xmwz_view" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo grid-demo-bg1"> <label class="layui-form-label">中心经度</label> <div class="layui-input-block"> <input type="text" name="model_zxjd_view" readonly="readonly" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label">中心纬度</label> <div class="layui-input-block"> <input type="text" name="model_zxwd_view" readonly="readonly" class="layui-input" /> </div> </div> </div> </div> </div> <div class="layui-form-item"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo grid-demo-bg1"> <label class="layui-form-label">项目时间</label> <div class="layui-input-block"> <input type="text" name="model_xmsj_view" readonly="readonly" class="layui-input" /> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <label class="layui-form-label">项目用途</label> <div class="layui-input-block"> <input type="text" name="model_xmyt_view" readonly="readonly" class="layui-input" /> </div> </div> </div> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">备注</label> <div class="layui-input-block"> <input type="text" name="model_bz_view" readonly="readonly" class="layui-input"> </div> </div></form>'
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
                        , "model_bz_view": modelprojectinfo.BZ
                    });

                    //翻译项目位置
                    if (xjxzqs.length > 0) {
                        for (var i in xjxzqs) {
                            if (xjxzqs[i].value == modelprojectinfo.XZQBM) {
                                var xmwz = "重庆市" + xjxzqs[i].name;
                                form.val("viewModelprojectinfoform", {
                                    "model_xmwz_view": xmwz
                                });
                            }
                        }
                    }
                    //翻译项目用途
                    if (xmyts.length > 0) {
                        for (var i in xmyts) {
                            if (xmyts[i].value == modelprojectinfo.XMYT) {
                                form.val("viewModelprojectinfoform", {
                                    "model_xmyt_view": xmyts[i].name
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
                        , "model_xmyt_view": ""
                        , "model_bz_view": ""
                    });
                }

                //弹出消息————controller里定义的各类情况result.message
                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }, datatype: "json"
        });


    }
};


