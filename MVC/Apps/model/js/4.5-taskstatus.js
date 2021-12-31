//任务状态
var newmodeltasktablePending = [];//待处理任务
var newmodeltasktableProcess = [];//正在处理任务
var newmodeltasktableFinished = [];//已完成任务
getNewModelTask();

//function sleep(time) {
//    return new Promise((resolve) => setTimeout(resolve, time));
//}

//// 用法
//sleep(4000).then(() => {
//    LoadNewModelTask();// 这里写sleep之后需要去做的事情
//});
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
            , resize: false
            , content: '<!--任务管理--> <div class="layui-tab layui-tab-brief" lay-filter="demo" style="margin:0px;"> <ul class="layui-tab-title"> <li class="layui-this" style="width:29%;padding-top: 0px;">待处理任务</li> <li style="width:30%;padding-top: 0px;">正在处理任务</li> <li style="width:29%;padding-top: 0px;">已完成任务</li> </ul> <div class="layui-tab-content"> <div class="layui-tab-item layui-show"> <table class="layui-hide" id="newtasktable_Pending" lay-filter="newtasktable_Pending"></table> <script type="text/html" id="barDemo_Pending"> <a class="layui-btnlayui-btn-xs layui-icon" lay-event="Pending"><svg t="1640847733333" class="icon" style="margin-top:5px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2694" width="20" height="20"><path d="M512 954.88c-243.712 0-442.88-199.168-442.88-442.88s199.168-442.88 442.88-442.88 442.88 199.168 442.88 442.88-199.168 442.88-442.88 442.88z m0-63.488c208.896 0 379.392-170.496 379.392-379.392s-170.496-379.392-379.392-379.392-379.392 170.496-379.392 379.392 170.496 379.392 379.392 379.392z m23.04-203.776l155.648-152.064c12.288-11.776 12.288-31.232 0.512-43.52l-152.064-155.648c-11.776-12.288-31.232-12.288-43.52-0.512s-12.288 31.232-0.512 43.52l100.352 102.4-294.912-3.584c-16.896 0-30.72 13.312-31.232 30.208 0 16.896 13.312 30.72 30.208 31.232l294.912 3.584-102.4 100.352c-6.144 6.144-9.216 13.824-9.216 21.504s3.072 15.872 8.704 22.016c12.288 12.288 31.744 12.8 43.52 0.512z" p-id="2695" fill="#1296db"></path></svg></a> </script> </div> <div class="layui-tab-item"> <table class="layui-hide" id="newtasktable_Processing" lay-filter="newtasktable_Processing"></table> <script type="text/html" id="barDemo_Processing"> <a class="layui-btnlayui-btn-xs layui-icon" lay-event="Processing"><svg t="1640850268659" class="icon" style="margin-top:5px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6284" width="20" height="20"><path d="M1002.359 205.444c0 0-54.533-45.314-110.271-69.166-60.648-29.07-146.357-27.734-146.357-27.734s-60.398-4.458-122.298 24.726c-61.9 29.185-107.596 68.832-107.596 68.832s-63.147-48.251-118.957-73.509-136.334-20.049-136.334-20.049-76.634 3.894-125.942 26.055-94.596 74.854-94.596 74.854l0 679.631c0 0 69.706-60.245 111.272-77.185 41.565-16.941 106.593-16.373 106.593-16.373s77.884 9.335 124.303 28.067c46.421 18.734 133.661 88.212 133.661 88.212s55.612-59.26 100.245-81.529c75.685-39.093 150.71-33.413 150.71-33.413s46.104 2.005 110.261 26.063c58.329 21.873 126.482 67.495 126.482 67.495l-1.175-684.978zM492.111 836.959c0 0-119.348-94.35-234.238-92.221-108.264 2.005-149.699 29.404-177.767 57.471 1.003-33.079-0.505-568.06-0.505-568.06s41.604-74.816 181.947-80.831c119.291-10.024 222.21 74.178 228.558 90.217 3.008 21.051 2.005 593.424 2.005 593.424zM958.25 814.907c-28.068-28.067-103.252-70.168-211.516-72.173-114.891-2.128-205.341 95.229-205.341 95.229s-1.003-572.374 2.005-593.424c10.025-16.038 88.216-96.231 228.558-90.217 121.639 5.295 187.865 78.972 187.865 78.972s-1.457 548.806-1.571 581.613z" p-id="6285" fill="#1296db"></path></svg></a> </script> </div> <div class="layui-tab-item"> <table class="layui-hide" id="newtasktable_Finished" lay-filter="newtasktable_Finished"></table> <script type="text/html" id="barDemo_Finished"> <a class="layui-btnlayui-btn-xs layui-icon" lay-event="Finished"><svg t="1640850268659" class="icon" style="margin-top:5px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6284" width="20" height="20"><path d="M1002.359 205.444c0 0-54.533-45.314-110.271-69.166-60.648-29.07-146.357-27.734-146.357-27.734s-60.398-4.458-122.298 24.726c-61.9 29.185-107.596 68.832-107.596 68.832s-63.147-48.251-118.957-73.509-136.334-20.049-136.334-20.049-76.634 3.894-125.942 26.055-94.596 74.854-94.596 74.854l0 679.631c0 0 69.706-60.245 111.272-77.185 41.565-16.941 106.593-16.373 106.593-16.373s77.884 9.335 124.303 28.067c46.421 18.734 133.661 88.212 133.661 88.212s55.612-59.26 100.245-81.529c75.685-39.093 150.71-33.413 150.71-33.413s46.104 2.005 110.261 26.063c58.329 21.873 126.482 67.495 126.482 67.495l-1.175-684.978zM492.111 836.959c0 0-119.348-94.35-234.238-92.221-108.264 2.005-149.699 29.404-177.767 57.471 1.003-33.079-0.505-568.06-0.505-568.06s41.604-74.816 181.947-80.831c119.291-10.024 222.21 74.178 228.558 90.217 3.008 21.051 2.005 593.424 2.005 593.424zM958.25 814.907c-28.068-28.067-103.252-70.168-211.516-72.173-114.891-2.128-205.341 95.229-205.341 95.229s-1.003-572.374 2.005-593.424c10.025-16.038 88.216-96.231 228.558-90.217 121.639 5.295 187.865 78.972 187.865 78.972s-1.457 548.806-1.571 581.613z" p-id="6285" fill="#1296db"></path></svg></a> </script> </div> </div> </div>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);
                $("#task_count").hide();
                //待处理任务
                var newTaskTablePending = table.render({
                    elem: '#newtasktable_Pending'
                    , id: 'newTaskTablePendingid'
                    , title: '待处理'
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
                    if (layEvent === 'Pending') {
                        layer.confirm('是否开始处理?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                            //同步更新缓存对应的值
                            data.RWZT = "正在处理";
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

