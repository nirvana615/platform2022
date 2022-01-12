//任务状态
var newmodeltasktablePending = [];//待处理任务
var newmodeltasktableProcess = [];//正在处理任务
var newmodeltasktableFinished = [];//已完成任务
getNewModelTask();

setTimeout(() => {
    LoadNewModelTask();
}, 4000);

function getNewModelTask() {
    newmodeltasktablePending = [];
    newmodeltasktableProcess = [];
    newmodeltasktableFinished = [];
    $.ajax({
        url: servicesurl + "/api/ModelTask/GetModelTaskStatus", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                newmodeltasktablePending = JSON.parse(result.data).newModelTaskPending;
                newmodeltasktableFinished = JSON.parse(result.data).newModelTaskFinished;
                newmodeltasktableProcess = JSON.parse(result.data).newModelTaskProcess;
                if (newmodeltasktablePending.length > 0) {
                    //显示新任务数量
                    $("#task_count").show();
                    $("#task_count").text(newmodeltasktablePending.length);
                }
                else {
                    $("#task_count").hide();
                }

            }

        }, datatype: "json"
    });
    
}

function LoadNewModelTask() {
    //弹出未完成任务列表信息
    if (newmodeltaskinfolayerindex == null) {
        newmodeltaskinfolayerindex = layer.open({
            type: 1
            , title: ['任务管理', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['765px', '600px']
            , shade: 0
            , offset: 'auto'
            , closeBtn: 1
            , anim: 0
            , maxmin: true
            , moveOut: true
            , resize: false
            , content: '<!--任务管理--> <div class="layui-tab layui-tab-brief" lay-filter="demo" style="margin:0px;"> <ul class="layui-tab-title"> <li class="layui-this" style="width:29%;padding-top: 0px;">待处理任务</li> <li style="width:30%;padding-top: 0px;">正在处理任务</li> <li style="width:29%;padding-top: 0px;">已完成任务</li> </ul> <div class="layui-tab-content"> <div class="layui-tab-item layui-show"> <table class="layui-hide" id="newtasktable_Pending" lay-filter="newtasktable_Pending"></table> <script type="text/html" id="barDemo_Pending"> <a class="layui-btn layui-bg-gray layui-btn-xs" title="查看" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="Pending_detail"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a> <a class="layui-btn layui-bg-gray layui-btn-xs" title="编辑" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="Pending_edit"><i class="layui-icon layui-icon-edit" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a> </script> </div> <div class="layui-tab-item"> <table class="layui-hide" id="newtasktable_Processing" lay-filter="newtasktable_Processing"></table> <script type="text/html" id="barDemo_Processing"> <a class="layui-btn layui-bg-gray layui-btn-xs" title="查看" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="Processing_detail"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a> <a class="layui-btn layui-bg-gray layui-btn-xs" title="编辑" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="Processing_edit"><i class="layui-icon layui-icon-edit" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script> </div> <div class="layui-tab-item"> <table class="layui-hide" id="newtasktable_Finished" lay-filter="newtasktable_Finished"></table> <script type="text/html" id="barDemo_Finished"> <a class="layui-btn layui-bg-gray layui-btn-xs" title="查看" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="Finished_detail"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script> </div> </div> </div>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);
                $("#task_count").hide();
                //待处理任务
                var newTaskTablePending = table.render({
                    elem: '#newtasktable_Pending'
                    , id: 'newTaskTablePendingid'
                    , title: '待处理'
                    , height: 472
                    , skin: 'line'
                    , even: false
                    , page: true
                    , limit: 10
                    , toolbar: false
                    , totalRow: false
                    , initSort: { field: 'RWCJSJ', type: 'desc' }
                    , cols: [[
                        { field: 'Id', title: 'ID', width: 53, sort: true, align: "center" }
                        , { field: 'RWMC', title: '任务名称', sort: true, width: 250, align: "center" }
                        , { field: 'RWCJSJ', title: '任务时间', sort: true, width: 200, align: "center" }
                        , { field: 'RWZT', title: '任务状态', width: 150, align: "center" }
                        , { fixed: 'right', title: '操作', width: 100, align: "center", toolbar: '#barDemo_Pending' }
                    ]]
                    , data: []
                });
                //待处理任务监听行工具事件
                table.on('tool(newtasktable_Pending)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
                    var data = obj.data //获得当前行数据
                        , layEvent = obj.event; //获得 lay-event 对应的值
                    if (layEvent === 'Pending_detail') {
                        ModelTaskInfo(obj.data.Id, "view");
                    }
                    else if (layEvent === 'Pending_edit') {
                        layer.confirm('是否开始处理?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                            //同步更新缓存对应的值
                            data.RWZT = "处理中";
                            newmodeltasktableProcess.push(data);
                            newTaskTableProcessing.reload({ id: 'newTaskTableProcessingid', data: newmodeltasktableProcess });
                            ModelTaskInfo(obj.data.Id, "view");
                            obj.del();
                            //更新任务状态
                            UpdateModelTaskStatus(data);
                            layer.close(index);
                        });
                    }

                });




                //正在处理任务
                var newTaskTableProcessing = table.render({
                    elem: '#newtasktable_Processing'
                    , id: 'newTaskTableProcessingid'
                    , title: '处理中'
                    , height: 472
                    , skin: 'line'
                    , even: false
                    , page: true
                    , limit: 10
                    , toolbar: false
                    , totalRow: false
                    , initSort: { field: 'RWCJSJ', type: 'desc' }
                    , cols: [[
                        { field: 'Id', title: 'ID', width: 53, sort: true, align: "center" }
                        , { field: 'RWMC', title: '任务名称', sort: true, width: 250, align: "center" }
                        , { field: 'RWCJSJ', title: '任务时间', sort: true, width: 200, align: "center" }
                        , { field: 'RWZT', title: '任务状态', width: 150, align: "center" }
                        , { fixed: 'right', title: '操作', width: 100, align: "center", toolbar: '#barDemo_Processing' }
                    ]]
                    , data: []
                });

                //正在处理任务监听行工具事件
                table.on('tool(newtasktable_Processing)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
                    var data = obj.data //获得当前行数据
                        , layEvent = obj.event; //获得 lay-event 对应的值
                    if (layEvent === 'Processing_detail') {
                        ModelTaskInfo(obj.data.Id, "view");

                    }
                    else if (layEvent === 'Processing_edit') {
                        layer.confirm('是否确认完成?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                            //同步更新缓存对应的值
                            data.RWZT = "已完成";
                            newmodeltasktableFinished.push(data);
                            newTaskTableFinished.reload({ id: 'newTaskTableFinishedid', data: newmodeltasktableFinished });
                            obj.del();
                            //更新任务状态
                            UpdateModelTaskStatus(data);
                            layer.close(index);
                        });
                    }
                });





                //已完成任务
                var newTaskTableFinished = table.render({
                    elem: '#newtasktable_Finished'
                    , id: 'newTaskTableFinishedid'
                    , title: '已完成'
                    , height: 472
                    , skin: 'line'
                    , even: false
                    , page: true
                    , limit: 10
                    , toolbar: false
                    , totalRow: false
                    , initSort: { field: 'RWCJSJ', type: 'desc' }
                    , cols: [[
                        { field: 'Id', title: 'ID', width: 53, sort: true, align: "center" }
                        , { field: 'RWMC', title: '任务名称', sort: true, width: 250, align: "center" }
                        , { field: 'RWCJSJ', title: '任务时间', sort: true, width: 200, align: "center" }
                        , { field: 'RWZT', title: '任务状态', width: 150, align: "center" }
                        , { fixed: 'right', title: '操作', width: 100, align: "center", toolbar: '#barDemo_Finished' }
                    ]]
                    , data: []
                });
                //已完成任务监听行工具事件
                table.on('tool(newtasktable_Finished)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
                    var data = obj.data //获得当前行数据
                        , layEvent = obj.event; //获得 lay-event 对应的值
                    if (layEvent === 'Finished_detail') {
                        ModelTaskInfo(obj.data.Id, "view");

                    }
                });



                //翻译任务状态
                if (rwzts.length > 0) {
                    for (var i in newmodeltasktablePending) {
                        for (var j in rwzts) {
                            if (newmodeltasktablePending[i].RWZT == rwzts[j].value) {
                                newmodeltasktablePending[i].RWZT = rwzts[j].name;
                            }
                        }
                    }
                    newTaskTablePending.reload({ id: 'newTaskTablePendingid', data: newmodeltasktablePending });
                }
                if (rwzts.length > 0) {
                    for (var i in newmodeltasktableProcess) {
                        for (var j in rwzts) {
                            if (newmodeltasktableProcess[i].RWZT == rwzts[j].value) {
                                newmodeltasktableProcess[i].RWZT = rwzts[j].name;
                            }
                        }
                    }
                    newTaskTableProcessing.reload({ id: 'newTaskTableProcessingid', data: newmodeltasktableProcess });
                }
                if (rwzts.length > 0) {
                    for (var i in newmodeltasktableFinished) {
                        for (var j in rwzts) {
                            if (newmodeltasktableFinished[i].RWZT == rwzts[j].value) {
                                newmodeltasktableFinished[i].RWZT = rwzts[j].name;
                            }
                        }
                    }
                    newTaskTableFinished.reload({ id: 'newTaskTableFinishedid', data: newmodeltasktableFinished });
                }



            }
            , end: function () {
                newmodeltaskinfolayerindex = null;
            }
        });


    }
}

function UpdateModelTaskStatus(data) {
    if (rwzts.length > 0) {
        for (var j in rwzts) {
            if (data.RWZT == rwzts[j].name) {
                data.RWZT = rwzts[j].value;
            }
        }
    }
    $.ajax({
        url: servicesurl + "/api/ModelTask/UpdateModelTaskStatus", type: "put", data: data,
        success: function (result) {

        }, datatype: "json"
    });

}

