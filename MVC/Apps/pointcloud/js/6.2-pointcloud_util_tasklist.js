


function PointCloudTaskList(currentprojectid) {
    if (currentprojectid == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        if ((utiltasklistlayerindex != null) || (utiltasklistlayerindex != undefined)) {
            layer.close(utiltasklistlayerindex);
        }
    } else {
        if (utiltasklistlayerindex == null) {
            utiltasklistlayerindex = layer.open({
                type: 1
                , title: ['任务列表', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['720px', '570px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--任务列表-->    <table id="tasklist_table" lay-filter="tasklist_table" style="margin-top:10px;"></table>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    var tasklist_table_data = [];
                    var id = parseInt(currentprojectid);
                    $.ajax({
                        url: servicesurl + "/api/PointCloudTask/GetPointCloudDataInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                        success: function (data) {
                            if (data == "") {
                                layer.msg("无任务列表信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            }
                            else {
                                tasklist_table_data = JSON.parse(data);
                            }
                        }, datatype: "json"

                    });



                    var tasklist_table = table.render({
                        elem: '#tasklist_table'
                        , id: 'tasklist_tableid'
                        , title: '任务列表'
                        , even: false
                        , page: {
                            layout: ['prev', 'page', 'next', 'count']
                        }
                        , limit: 10
                        , height: 500
                        , totalRow: false
                        , cols: [[
                            { field: 'id', title: 'ID', hide: true }
                            , { field: 'order', title: '序号', width: 120, align: "center" }
                            , { field: 'taskname', title: '任务名称', width: 120, align: "center" }
                            , { field: 'referpointcloud', title: '参考点云', width: 120, align: "center" }
                            , { field: 'targetpointcloud', title: '目标点云', width: 120, align: "center" }
                            , { field: 'dealstatus', title: '处理状态', width: 120, align: "center" }
                            , { field: 'bz', title: '备注', width: 120, align: "center" }
                        ]]
                        , data: tasklist_table_data
                    });



                }
                , end: function () {
                    //关闭
                    utiltasklistlayerindex = null;

                }

            });
        }
    }
};