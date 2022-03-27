//新建项目
function AddUavProject() {
    if (uavprojectaddlayerindex == null) {
        CloseAllLayer();//关闭所有图层
        ClearAllModelAndGeometry();//清除全部模型和几何对象

        uavprojectaddlayerindex = layer.open({
            type: 1
            , title: ['新建项目', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
            , area: ['600px', '400px']
            , shade: 0
            , closeBtn: 1
            , maxmin: true
            , moveOut: true
            , content: '<form class="layui-form" style="margin-top:10px" lay-filter="uav-project-add"><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">项目名称</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-project-add-xmmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item layui-form-text"><label class="layui-form-label" style="width:60px;padding-top:105px;">备&emsp;&emsp;注</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><textarea name="uav-project-add-bz" placeholder="请输入" class="layui-textarea" style="height:240px;padding-right:5px;"></textarea></div></div><div class="layui-form-item" style="margin-top:10px"><div class="layui-row"><div class="layui-col-md3 layui-col-md-offset3"><div class="grid-demo grid-demo-bg1"><button type="submit" class="layui-btn" lay-submit="" lay-filter="uav-project-add-submit" style="width:100px">提交</button></div></div><div class="layui-col-md3 layui-col-md-offset1"><div class="grid-demo"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button></div></div></div></div></form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                //创建项目
                form.on('submit(uav-project-add-submit)', function (data) {
                    data.field.cookie = document.cookie;

                    $.ajax({
                        url: servicesurl + "/api/UavProject/AddUavProject", type: "post", data: data.field,
                        success: function (data) {
                            var result = JSON.parse(data);
                            if (result.code == 1) {
                                var uavprojectdata = JSON.parse(result.data);
                                if (uavprojectdata != null && uavprojectdata != undefined) {
                                    current_project_id = uavprojectdata.Id;
                                    current_project_title = uavprojectdata.XMMC;

                                    var newproject = new Object;
                                    newproject.id = uavprojectdata.Id;
                                    newproject.title = uavprojectdata.XMMC;
                                    newproject.type = "uavproject";
                                    newproject.data = uavprojectdata;
                                    newproject.nodeOperate = true;
                                    newproject.spread = false;

                                    var newprojectinfos = [];

                                    var createtime = new Object;
                                    createtime.title = "创建时间：" + uavprojectdata.CJSJ;
                                    newprojectinfos.push(createtime);
                                    newproject.children = newprojectinfos

                                    uav_project_list_all.push(newproject);
                                }

                                MarkCurrentProject();
                                layer.close(uavprojectaddlayerindex);
                            }

                            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }, datatype: "json"
                    });

                    return false;
                });
            }
            , end: function () {
                uavprojectaddlayerindex = null;
            }
        });
    }
};

//查看项目
function ViewUavProject(uavprojectdata) {
    layer.msg("正在建设！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
};

//编辑项目
function EditUavProject(uavprojectdata) {
    if (uavprojecteditlayerindex != null) {
        CloseLayer(uavprojecteditlayerindex);
    }

    uavprojecteditlayerindex = layer.open({
        type: 1
        , title: ['编辑项目', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['600px', '400px']
        , shade: 0
        , closeBtn: 1
        , maxmin: true
        , moveOut: true
        , content: '<!--编辑项目--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:1px 0px"><ul class="layui-tab-title"><li class="layui-this" style="width:44%;">基本信息</li><li style="width:44%;">实景模型</li></ul><div class="layui-tab-content" style="margin:5px 0px"><!--项目信息--><div class="layui-tab-item layui-show"><form class="layui-form" style="margin-top:0px" lay-filter="uav-project-edit"><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">项目名称</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-project-edit-xmmc" autocomplete="off" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">项目编码</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-project-edit-xmbm" autocomplete="off" lay-verify="required" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">创建时间</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-project-edit-cjsj" autocomplete="off" lay-verify="required" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;padding-top:45px;">备&emsp;&emsp;注</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="uav-project-edit-bz" class="layui-textarea" style="height:120px;"></textarea></div></div><div class="layui-form-item" style="margin-top:10px"><div style="position:absolute;right:5px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="uav-project-edit-submit" style="width:100px">保存</button></div></div></form></div><!--实景模型--><div class="layui-tab-item"><div class="layui-card-body" style="padding:0px 0px;"><table id="uav-project-model" lay-filter="uav-project-model"></table><script type="text/html" id="uav-project-model-add"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm" style="font-size:14px" lay-event="uav-project-model-add">添加三维实景模型</button></div></script><script type="text/html" id="table-toolbar-model"><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="modeldel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div></div></div>'
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);

            //项目信息
            form.val("uav-project-edit", {
                "uav-project-edit-xmmc": uavprojectdata.XMMC
                , "uav-project-edit-xmbm": uavprojectdata.XMBM
                , "uav-project-edit-cjsj": uavprojectdata.CJSJ
                , "uav-project-edit-bz": uavprojectdata.BZ
            });

            //更新项目
            form.on('submit(uav-project-edit-submit)', function (data) {
                data.field.id = id;
                data.field.cookie = document.cookie;

                $.ajax({
                    url: servicesurl + "/api/UavProject/UpdateProject", type: "put", data: data.field,
                    success: function (result) {
                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }, datatype: "json"
                });
                return false;
            });


            //模型信息
            var modeltabledata = [];
            var modeledittable = table.render({
                elem: '#uav-project-model'
                , id: 'uavprojectmodeltableid'
                , title: '模型信息'
                , skin: 'line'
                , even: false
                , page: {
                    layout: ['prev', 'page', 'next', 'count']
                }
                , limit: 10
                , toolbar: '#uav-project-model-add'
                , totalRow: false
                , initSort: { field: 'id', type: 'asc' }
                , cols: [[
                    { field: 'id', title: 'ID', hide: true }
                    , { field: 'zhtmc', title: '灾害体名称', align: "center" }
                    , { field: 'zhtbh', title: '灾害体编号', align: "center" }
                    , { field: 'zhtlx', title: '灾害体类型', align: "center" }
                    , { field: 'zxjd', title: '中心经度', align: "center" }
                    , { field: 'zxwd', title: '中心纬度', align: "center" }
                    , { field: 'bz', title: '备注', align: "center" }
                    , { fixed: 'right', width: 80, align: 'center', toolbar: '#table-toolbar-model' }
                ]]
                , data: modeltabledata
            });
            //$.ajax({
            //    url: servicesurl + "/api/Disaster/GetDisaster", type: "get", data: { "id": id, "cookie": document.cookie },
            //    success: function (data) {
            //        disastertabledata = [];
            //        if (data == "") {
            //            //无灾害体信息
            //            disasterviewtable.reload({ id: 'disasterviewtableid', data: disastertabledata });
            //        }
            //        else {
            //            var disasterInfos = JSON.parse(data);

            //            //构造灾害体表格数据
            //            for (var i in disasterInfos) {
            //                var disaster = new Object;
            //                disaster.id = disasterInfos[i].Id;
            //                disaster.zhtmc = disasterInfos[i].ZHTMC;
            //                disaster.zhtbh = disasterInfos[i].ZHTBH;
            //                disaster.zhtlx = disasterInfos[i].ZHTLX;
            //                disaster.zxjd = disasterInfos[i].ZXJD;
            //                disaster.zxwd = disasterInfos[i].ZXWD;
            //                disaster.bz = disasterInfos[i].BZ;
            //                disastertabledata.push(disaster);
            //            }
            //            disasterviewtable.reload({ id: 'disasterviewtableid', data: disastertabledata });

            //            table.on('tool(disaster-view)', function (obj) {
            //                var data = obj.data;
            //                var layEvent = obj.event;

            //                if (layEvent === 'disasterview') {
            //                    //灾害体信息
            //                    DisasterInfoView(obj.data);
            //                }
            //            });
            //        }
            //    }, datatype: "json"
            //});




        }
        , end: function () {
            uavprojecteditlayerindex = null;
        }
    });
};

//删除项目
function DeleteUavProject(uavprojectid) {
    $.ajax({
        url: servicesurl + "/api/UavProject/DeleteUavProject", type: "delete", data: { "id": uavprojectid, "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                if (uavprojectid == current_project_id) {
                    current_project_id = null;
                    current_project_title = null;
                }

                var new_uav_project_list_all = [];
                for (var i in uav_project_list_all) {
                    if (uav_project_list_all[i].id != uavprojectid) {
                        new_uav_project_list_all.push(uav_project_list_all[i]);
                    }
                }

                uav_project_list_all = new_uav_project_list_all;
            }

            MarkCurrentProject();
            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }, datatype: "json"
    });
};