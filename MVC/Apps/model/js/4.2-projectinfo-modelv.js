//项目信息
function ModelProjectInfo(id, style) {
    if (style == "view") {
        //查看项目
        if (modelprojectinfoviewlayerindex == null) {
            modelprojectinfoviewlayerindex = layer.open({
                type: 1
                , title: ['查看项目信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['420px', '400px']
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
    
};


