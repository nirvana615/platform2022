//任务状态
var newmodeltasktablePending = [];//待处理任务
var newmodeltasktableProcess = [];//正在处理任务
var newmodeltasktableFinished = [];//已完成任务
getNewModelTask();
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
            , area: ['765px', '720px']
            , shade: 0
            , offset: 'auto'
            , closeBtn: 1
            , anim: 0
            , maxmin: true
            , moveOut: true
            , content: '<!--任务管理--> <div class="layui-tab layui-tab-card" lay-filter="demo"> <ul class="layui-tab-title"> <li class="layui-this">待处理</li> <li>处理中</li> <li>已完成</li> </ul> <div class="layui-tab-content"> <div class="layui-tab-item layui-show"> <table class="layui-hide" id="newtasktable_Pending" lay-filter="newtasktable_Pending"></table> <script type="text/html" id="barDemo_Pending"> <a class="layui-btnlayui-btn-xs layui-icon" lay-event="Pending"><svg t="1640763008247" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5323" width="18" height="18"><path d="M512 954.88c-243.712 0-442.88-199.168-442.88-442.88s199.168-442.88 442.88-442.88 442.88 199.168 442.88 442.88-199.168 442.88-442.88 442.88z m0-63.488c208.896 0 379.392-170.496 379.392-379.392s-170.496-379.392-379.392-379.392-379.392 170.496-379.392 379.392 170.496 379.392 379.392 379.392z m23.04-203.776l155.648-152.064c12.288-11.776 12.288-31.232 0.512-43.52l-152.064-155.648c-11.776-12.288-31.232-12.288-43.52-0.512s-12.288 31.232-0.512 43.52l100.352 102.4-294.912-3.584c-16.896 0-30.72 13.312-31.232 30.208 0 16.896 13.312 30.72 30.208 31.232l294.912 3.584-102.4 100.352c-6.144 6.144-9.216 13.824-9.216 21.504s3.072 15.872 8.704 22.016c12.288 12.288 31.744 12.8 43.52 0.512z" p-id="5324" fill="#8a8a8a"></path></svg></a> </script> </div> <div class="layui-tab-item"> <table class="layui-hide" id="newtasktable_Processing" lay-filter="newtasktable_Processing"></table> <script type="text/html" id="barDemo_Processing"> <a class="layui-btnlayui-btn-xs layui-icon" lay-event="Processing">&#xe705;</a> </script> </div> <div class="layui-tab-item"> <table class="layui-hide" id="newtasktable_Finished" lay-filter="newtasktable_Finished"></table> <script type="text/html" id="barDemo_Finished"> <a class="layui-btnlayui-btn-xs layui-icon" lay-event="Finished">&#xe705;</a> </script> </div> </div> </div>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);
                $("#task_count").hide();
                //待处理任务
                var newTaskTablePending = table.render({
                    elem: '#newtasktable_Pending'
                    , id: 'newTaskTablePendingid'
                    , title: '待处理'
                    ,height:600
                    , skin: 'line'
                    , even: false
                    , page: true
                    , limit: 10
                    , toolbar: false
                    , totalRow: false
                    , initSort: { field: 'Id', type: 'asc' }
                    , cols: [[
                        { field: 'Id', title: 'ID', width: 50, sort: true, align: "center" }
                        , { field: 'RWMC', title: '任务名称', sort: true, width: 200, align: "center" }
                        , { field: 'RWCJSJ', title: '任务时间', sort: true, width: 150, align: "center" }
                        , { field: 'RWZT', title: '任务状态', width: 150, align: "center" }
                        , { fixed: 'right', title: '操作', width: 200, align: "center", toolbar: '#barDemo_Pending'}
                    ]]
                    , data: []
                });
                //待处理任务监听行工具事件
                table.on('tool(newtasktable_Pending)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
                    var data = obj.data //获得当前行数据
                        , layEvent = obj.event; //获得 lay-event 对应的值
                    if (layEvent === 'Pending') {
                        //同步更新缓存对应的值
                        data.RWZT = "正在处理";
                        newmodeltasktableProcess.push(data);
                        newTaskTableProcessing.reload({ id: 'newTaskTableProcessingid', data: newmodeltasktableProcess });
                        ModelTaskInfo(obj.data.Id, "view");
                        obj.del(); 
                        //更新任务状态
                        UpdateModelTaskStatus(data);

                    }

                });




                 //正在处理任务
                var newTaskTableProcessing = table.render({
                    elem: '#newtasktable_Processing'
                    , id: 'newTaskTableProcessingid'
                    , title: '处理中'
                    , height: 600
                    , skin: 'line'
                    , even: false
                    , page: true
                    , limit: 10
                    , toolbar: false
                    , totalRow: false
                    , initSort: { field: 'Id', type: 'asc' }
                    , cols: [[
                        { field: 'Id', title: 'ID', width: 50, sort: true, align: "center" }
                        , { field: 'RWMC', title: '任务名称', sort: true, width: 200, align: "center" }
                        , { field: 'RWCJSJ', title: '任务时间', sort: true, width: 150, align: "center" }
                        , { field: 'RWZT', title: '任务状态', width: 150, align: "center" }
                        , { fixed: 'right', title: '操作', width: 200, align: "center", toolbar: '#barDemo_Processing' }
                    ]]
                    , data: []
                });
                
                //正在处理任务监听行工具事件
                table.on('tool(newtasktable_Processing)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
                    var data = obj.data //获得当前行数据
                        , layEvent = obj.event; //获得 lay-event 对应的值
                    if (layEvent === 'Processing') {
                        ModelTaskInfo(obj.data.Id, "view");
                        
                    }
                });





                //已完成任务
                var newTaskTableFinished = table.render({
                    elem: '#newtasktable_Finished'
                    , id: 'newTaskTableFinishedid'
                    , title: '已完成'
                    , height: 600
                    , skin: 'line'
                    , even: false
                    , page: true
                    , limit: 10
                    , toolbar: false
                    , totalRow: false
                    , initSort: { field: 'Id', type: 'asc' }
                    , cols: [[
                        { field: 'Id', title: 'ID', width: 50, sort: true, align: "center" }
                        , { field: 'RWMC', title: '任务名称', sort: true, width: 200, align: "center" }
                        , { field: 'RWCJSJ', title: '任务时间', sort: true, width: 150, align: "center" }
                        , { field: 'RWZT', title: '任务状态', width: 150, align: "center" }
                        , { fixed: 'right', title: '操作', width: 200, align: "center", toolbar: '#barDemo_Finished' }
                    ]]
                    , data: []
                });
                //已完成任务监听行工具事件
                table.on('tool(newtasktable_Finished)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
                    var data = obj.data //获得当前行数据
                        , layEvent = obj.event; //获得 lay-event 对应的值
                    if (layEvent === 'Finished') {
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
    $.ajax({
        url: servicesurl + "/api/ModelTask/UpdateModelTaskStatus", type: "put", data: data,
        success: function (result) {
            
        }, datatype: "json"
    });

}