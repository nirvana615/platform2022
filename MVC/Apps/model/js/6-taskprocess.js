var modeltaskp = [];//待处理任务
var modeltaski = [];//处理中任务
var modeltaskf = [];//已完成任务
var modeltaskpcount = 0;//待处理任务数量          
var modeltaskicount = 0;//处理中任务数量
var modeltaskfcount = 0;//已完成任务数量
var modeltaskdatatablep = null;
var modeltaskdatatablev = null;


//任务处理
function LoadTaskProcess() {
    if (modeltaskprocesslayerindex == null) {
        modeltaskprocesslayerindex = layer.open({
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
            , content: '<!--模型任务处理--><div><div style="margin-top: 10px;margin-left:10px;"><button id="btn-task-p" type="button" class="layui-btn layui-btn-orange" style="width:150px;height:50px;">待处理  <span id="task-p-count"></span></button><button id="btn-task-i" type="button" class="layui-btn" style="width:150px;height:50px;">处理中  <span id="task-i-count"></span></button><button id="btn-task-f" type="button" class="layui-btn layui-btn-primary" style="width:150px;height:50px;">已完成  <span id="task-f-count"></span></button></div><div class="layui-card-body" style="margin-top:10px;padding:0px 0px;"><table id="modeltasktable" lay-filter="modeltasktable"></table><script type="text/html" id="table-toolbar-modeltaskp"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="modeltaskview"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-blue layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="modeltaskedit"><i class="layui-icon layui-icon-edit" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script><script type="text/html" id="table-toolbar-modeltaskv"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="modeltaskview"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                $("#task_count").hide();

                //任务类别数量
                document.getElementById('task-p-count').innerText = modeltaskpcount;
                document.getElementById('task-i-count').innerText = modeltaskicount;
                document.getElementById('task-f-count').innerText = modeltaskfcount;

                modeltaskdatatablev = table.render({
                    elem: '#modeltasktable'
                    , id: 'modeltasktablevid'
                    , title: '任务管理'
                    , height: 475
                    , skin: 'line'
                    , even: false
                    , page: true
                    , limit: 10
                    , toolbar: false
                    , totalRow: false
                    , initSort: { field: 'yxcjsj', type: 'desc' }
                    , cols: [[
                        { field: 'id', title: 'ID', align: "center", hide: true }
                        , { type: 'numbers', title: '序号', width: 50, align: "center" },
                        , { field: 'rwbm', title: '模型编码', width: 120, align: "center" }
                        , { field: 'rwmc', title: '模型名称', width: 210, align: "center" }
                        , { field: 'yxcjry', title: '采集人', width: 100, align: "center" }
                        , { field: 'yxcjsj', title: '采集时间', width: 120, align: "center" }
                        , { field: 'rwzt', title: '状态', width: 80, align: "center" }
                        , { fixed: 'right', width: 80, align: "center", toolbar: '#table-toolbar-modeltaskv' }
                    ]]
                    , data: []
                });

                modeltaskdatatablep = table.render({
                    elem: '#modeltasktable'
                    , id: 'modeltasktablepid'
                    , title: '任务管理'
                    , height: 475
                    , skin: 'line'
                    , even: false
                    , page: true
                    , limit: 10
                    , toolbar: false
                    , totalRow: false
                    , initSort: { field: 'yxcjsj', type: 'desc' }
                    , cols: [[
                        { field: 'id', title: 'ID', align: "center", hide: true }
                        , { type: 'numbers', title: '序号', width: 50, align: "center" },
                        , { field: 'rwbm', title: '模型编码', width: 120, align: "center" }
                        , { field: 'rwmc', title: '模型名称', width: 210, align: "center" }
                        , { field: 'yxcjry', title: '采集人', width: 100, align: "center" }
                        , { field: 'yxcjsj', title: '采集时间', width: 120, align: "center" }
                        , { field: 'rwzt', title: '状态', width: 80, align: "center" }
                        , { field: 'data', hide: true }
                        , { fixed: 'right', width: 80, align: "center", toolbar: '#table-toolbar-modeltaskp' }
                    ]]
                    , data: modeltaskp
                });


                $("#btn-task-p").on("click", function () {
                    //待处理
                    modeltaskdatatablep.reload({ id: 'modeltasktablepid', data: modeltaskp });
                });
                $("#btn-task-i").on("click", function () {
                    //处理中
                    modeltaskdatatablev.reload({ id: 'modeltasktablevid', data: modeltaski });
                });
                $("#btn-task-f").on("click", function () {
                    //已完成
                    modeltaskdatatablev.reload({ id: 'modeltasktablevid', data: modeltaskf });
                });


                table.on('tool(modeltasktable)', function (obj) {
                    if (obj.event === 'modeltaskview') {
                        ViewModelTask(obj.data.data);
                    }
                    else if (obj.event === 'modeltaskedit') {
                        ProcessModelTask(obj.data.data);
                    }
                });

            }
            , end: function () {
                modeltaskprocesslayerindex = null;
                //显示气泡提示
                if (modeltaskpcount > 0) {
                    $("#task_count").show();
                    $("#task_count").text(modeltaskpcount);
                }
                else {
                    $("#task_count").hide();
                    $("#task_count").text('');
                }
            }
        });

    }
};

//查看任务
function LoadTaskManage() {
    if (modeltaskprocesslayerindex == null) {
        modeltaskprocesslayerindex = layer.open({
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
            , content: '<!--模型任务处理--><div><div style="margin-top: 10px;margin-left:10px;"><button id="btn-task-p" type="button" class="layui-btn layui-btn-orange" style="width:150px;height:50px;">待处理  <span id="task-p-count"></span></button><button id="btn-task-i" type="button" class="layui-btn" style="width:150px;height:50px;">处理中  <span id="task-i-count"></span></button><button id="btn-task-f" type="button" class="layui-btn layui-btn-primary" style="width:150px;height:50px;">已完成  <span id="task-f-count"></span></button></div><div class="layui-card-body" style="margin-top:10px;padding:0px 0px;"><table id="modeltasktable" lay-filter="modeltasktable"></table><script type="text/html" id="table-toolbar-modeltaskp"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="modeltaskview"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-blue layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="modeltaskedit"><i class="layui-icon layui-icon-edit" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script><script type="text/html" id="table-toolbar-modeltaskv"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="modeltaskview"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                //任务类别数量
                document.getElementById('task-p-count').innerText = modeltaskpcount;
                document.getElementById('task-i-count').innerText = modeltaskicount;
                document.getElementById('task-f-count').innerText = modeltaskfcount;

                modeltaskdatatablev = table.render({
                    elem: '#modeltasktable'
                    , id: 'modeltasktablevid'
                    , title: '任务管理'
                    , height: 475
                    , skin: 'line'
                    , even: false
                    , page: true
                    , limit: 10
                    , toolbar: false
                    , totalRow: false
                    , initSort: { field: 'yxcjsj', type: 'desc' }
                    , cols: [[
                        { field: 'id', title: 'ID', align: "center", hide: true }
                        , { type: 'numbers', title: '序号', width: 50, align: "center" },
                        , { field: 'rwbm', title: '模型编码', width: 120, align: "center" }
                        , { field: 'rwmc', title: '模型名称', width: 210, align: "center" }
                        , { field: 'yxcjry', title: '采集人', width: 100, align: "center" }
                        , { field: 'yxcjsj', title: '采集时间', width: 120, align: "center" }
                        , { field: 'rwzt', title: '状态', width: 80, align: "center" }
                        //, { fixed: 'right', width: 80, align: "center", toolbar: '#table-toolbar-modeltaskv' }
                    ]]
                    , data: modeltaskp
                });

                $("#btn-task-p").on("click", function () {
                    //待处理
                    modeltaskdatatablev.reload({ id: 'modeltasktablepid', data: modeltaskp });
                });
                $("#btn-task-i").on("click", function () {
                    //处理中
                    modeltaskdatatablev.reload({ id: 'modeltasktablevid', data: modeltaski });
                });
                $("#btn-task-f").on("click", function () {
                    //已完成
                    modeltaskdatatablev.reload({ id: 'modeltasktablevid', data: modeltaskf });
                });

                //table.on('tool(modeltasktable)', function (obj) {
                //    if (obj.event === 'modeltaskview') {
                //        ViewModelTask(obj.data.data);
                //    }
                //});
            }
            , end: function () {
                modeltaskprocesslayerindex = null;
            }
        });
    }
};