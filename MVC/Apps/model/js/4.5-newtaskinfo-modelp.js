//三维模型项目列表widget
var newmodeltasktabledata = [];
getNewModelTask();
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

// 用法
sleep(500).then(() => {
    LoadNewModelTask();// 这里写sleep之后需要去做的事情
})
function getNewModelTask() {
    newmodeltasktabledata = [];
    $.ajax({
        url: servicesurl + "/api/ModelProject/GetNewModelTask", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                newmodeltasktabledata = JSON.parse(result.data);

                if (newmodeltasktabledata.length > 0) {
                    //显示新任务数量
                    $("#task_count").show();
                    $("#task_count").text(newmodeltasktabledata.length);
                }
                else {
                    $("#task_count").hide();
                }


                for (var j in newmodeltasktabledata) {
                    //采集设备翻译
                    if (cjsbs.length > 0) {
                        for (var i in cjsbs) {
                            if (cjsbs[i].value == newmodeltasktabledata[j].YXCJSB) {
                                newmodeltasktabledata[j].YXCJSB = cjsbs[i].name;
                            }
                        }
                    }
                    //翻译空间参考
                    if (srids.length > 0) {
                        for (var i in srids) {
                            if (srids[i].value == newmodeltasktabledata[j].SRID) {
                                newmodeltasktabledata[j].SRID = srids[i].name;
                            }
                        }
                    }
                    //所需成果
                    if (sxcgs.length > 0) {
                        var Sxcg = newmodeltasktabledata[j].SXCG.trim().split(",");
                        var sxcgdata = "";
                        for (var i in Sxcg) {
                            for (var k in sxcgs) {
                                if (sxcgs[k].value == Sxcg[i]) {

                                    sxcgdata += sxcgs[k].name + "；";
                                }
                            }
                        }
                        newmodeltasktabledata[j].SXCG = sxcgdata;
                    }
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
            , title: ['待处理任务', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['900px', '700px']
            , shade: 0
            , offset: 'auto'
            , closeBtn: 1
            , anim: 0
            , maxmin: true
            , moveOut: true
            , content: '<table class="layui-hide" id="newtasktable-view" lay-filter="newtasktable-view"></table>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                var newmodeltasktableview = table.render({
                    elem: '#newtasktable-view'
                    , id: 'newtasktableviewid'
                    , title: '新任务信息'
                    ,height:600
                    , skin: 'line'
                    , even: false
                    , page: true
                    , limit: 10
                    , toolbar: true
                    , totalRow: false
                    , initSort: { field: 'Id', type: 'asc' }
                    , cols: [[
                        { field: 'Id', title: 'ID', width: 50, sort: true, align: "center" }
                        , { field: 'RWMC', title: '任务名称', width: 200, align: "center" }
                        , { field: 'RWBM', title: '任务编码', width: 170, align: "center" }
                        , { field: 'YXCJRY', title: '采集人员', width: 150, align: "center" }
                        , { field: 'YXCJSB', title: '采集设备', width: 200, align: "center", hide: true }
                        , { field: 'YXCJSJ', title: '采集时间', sort: true, width: 120, align: "center" }
                        , { field: 'YXSL', title: '影像数量', width: 160, align: "center", hide: true }
                        , { field: 'YXKZD', title: '控制点', width: 120, align: "center", hide: true }
                        , { field: 'YXFW', title: 'KML范围', width: 120, align: "center", hide: true }
                        , { field: 'YXCFLJ', title: '影像链接', width: 160, align: "center", hide: true }
                        , { field: 'SRID', title: '空间参考', width: 350, align: "center", hide: true }
                        , { field: 'SXCG', title: '目标成果', width: 200, align: "center", hide: true }
                        , { field: 'RWMS', title: '任务描述', width: 160, align: "center", hide: true }
                        , { field: 'CGXZLJ', title: '成果链接',width: 220, align: "center", hide: true }
                        , { field: 'MXMS', title: '模型描述',  width: 160, align: "center", hide: true }
                        , { field: 'RWCJSJ', title: '创建时间', sort: true, width: 160, align: "center", hide: true }
                        , { field: 'BZ', title: '备注', width: 200, align: "center" }
                    ]]
                    , data: []
                });

                newmodeltasktableview.reload({ id: 'newtasktableviewid', data: newmodeltasktabledata });
                //触发行双击事件
                table.on('rowDouble(newtasktable-view)', function (obj) {
                    console.log(obj.tr) //得到当前行元素对象
                    console.log(obj.data) //得到当前行数据
                    ModelTaskInfo(obj.data.Id, "edit");
                });
            }
            , end: function () {
                newmodeltaskinfolayerindex = null;
            }
        });
       

    }
}
