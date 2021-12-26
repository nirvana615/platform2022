//新建项目
function AddUavProject() {
    if (uavprojectaddlayerindex == null) {
        CloseAllLayer();//关闭所有图层
        ClearAllModelAndGeometry();//清除全部模型和几何对象

        uavprojectaddlayerindex = layer.open({
            type: 1
            , title: ['新建项目', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
            , area: ['800px', '400px']
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
                                GetUserUavProject(parseInt(result.data), -1);
                            }
                            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }, datatype: "json"
                    });

                    layer.close(uavprojectaddlayerindex);
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
function ViewUavProject(uavprojectid) {
    layer.msg("正在建设！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
};


//编辑项目
function EditUavProject(uavprojectid) {
    if (uavprojecteditlayerindex == null) {
        uavprojecteditlayerindex = layer.open({
            type: 1
            , title: ['编辑项目', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
            , area: ['800px', '400px']
            , shade: 0
            , closeBtn: 1
            , maxmin: true
            , moveOut: true
            , content: '<!--编辑项目--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:1px 0px"><ul class="layui-tab-title"><li class="layui-this" style="width:28%;">项目信息</li><li style="width:28%;">三维实景模型</li><li style="width:28%;">点云</li></ul><div class="layui-tab-content" style="margin:5px 0px"><!--项目信息--><div class="layui-tab-item layui-show"><form class="layui-form" style="margin-top:0px" lay-filter="uav-project-edit"><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">项目名称</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-project-edit-xmmc" autocomplete="off" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">项目编码</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-project-edit-xmbm" autocomplete="off" lay-verify="required" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">创建时间</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-project-edit-cjsj" autocomplete="off" lay-verify="required" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;padding-top:45px;">备&emsp;&emsp;注</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="uav-project-edit-bz" class="layui-textarea" style="height:120px;"></textarea></div></div><div class="layui-form-item" style="margin-top:10px"><div style="position:absolute;right:5px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="uav-project-edit-submit" style="width:100px">保存</button></div></div></form></div><!--三维实景模型--><div class="layui-tab-item"><div class="layui-card-body" style="padding:0px 0px;"><table id="uav-project-model" lay-filter="uav-project-model"></table><script type="text/html" id="uav-project-model-add"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm" style="font-size:14px" lay-event="uav-project-model-add">添加三维实景模型</button></div></script><script type="text/html" id="table-toolbar-model"><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="modeldel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div><!--点云--><div class="layui-tab-item"><div class="layui-card-body" style="padding:0px 0px;"><table id="uav-project-pts" lay-filter="uav-project-pts"></table><script type="text/html" id="uav-project-pts-add"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm" style="font-size:14px" lay-event="uav-project-pts-add">添加点云</button></div></script><script type="text/html" id="table-toolbar-model"><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="ptsdel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div></div></div>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                //TODO






            }
            , end: function () {
                uavprojecteditlayerindex = null;
            }
        });
    }
};


//删除项目
function DeleteUavProject(uavprojectid) {
    $.ajax({
        url: servicesurl + "/api/UavProject/DeleteUavProject", type: "delete", data: { "id": uavprojectid, "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                if (current_project_id == null) {
                    GetUserUavProject(-1, -1);
                }
                else {
                    if (uavprojectid == current_project_id) {
                        current_project_id = null;
                        GetUserUavProject(-1, -1);

                        if (current_entities_route.length > 0) {
                            RemoveEntitiesInViewer(current_entities_route);
                            current_entities_route = [];
                        }
                    }
                    else {
                        GetUserUavProject(current_project_id, -1);
                    }
                }
            }
            else {
                tree.reload('uav-project-list-treeid', { data: uav_project_list_all });
            }

            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }, datatype: "json"
    });
};