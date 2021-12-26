var projectdevicechartcount = null;
var projectdevicechartdisaster = null;
var projectdevicecharttype = null;
var monitordevicechart = null;

var currentdevicemonitor = null;//当前设备


//自动化监测设备widget
function LoadAutoDeviceLayer(projectid) {
    if (projectid == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
    }
    else {
        if (automonitordevicelayerindex == null) {
            automonitordevicelayerindex = layer.open({
                type: 1
                , title: ['自动化监测设备管理', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['1000px', '800px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--设备管理--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin-top:0px"><ul class="layui-tab-title"><li class="layui-this" style="width:40%;padding-top: 10px;">概况</li><li style="width:40%;padding-top: 10px;">详情</li></ul><div class="layui-tab-content"><!--概况--><div class="layui-tab-item layui-show"><form class="layui-form" lay-filter="autodevicesform" style="margin-top:5px;"><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><div class="layui-input-block" style="margin-left:10px;"><select id="autodevicespretimeid" name="autodevicespretime" lay-filter="autodevicespretimefilter" style="visibility:visible;"></select></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><div class="layui-input-block" style="margin-left:10px;margin-right:10px;"><input id="autodevicescustomtimeid" name="autodevicescustomtime" type="text" class="layui-input" placeholder="开始时间 — 结束时间" style="visibility:visible;"></div></div></div></div></div></form><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1">1</div></div><div class="layui-col-xs6"><div class="grid-demo"><!--设备数量--><div id="autodevicechartbynum" class="layui-tab-item layui-show" style="width:350px;height:300px"></div></div></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><!--按灾害体--><div id="autodevicechartbydisaster" class="layui-tab-item layui-show" style="width:350px;height:300px"></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><!--按设备类型--><div id="autodevicechartbytype" class="layui-tab-item layui-show" style="width:350px;height:300px"></div></div></div></div></div><!--详情--><div class="layui-tab-item"><div class="layui-row"><!--左侧--><div class="layui-col-md3" style="width:20%;height:500px;overflow: auto;"><div id="device-monitor-tree" class="grid-demo"></div></div><!--右侧--><div class="layui-col-md9" style="width:80%;height:300px;border-left:solid;border-color:#e6e6e6;border-left-width:0px;"><div class="grid-demo grid-demo-bg1"><!--工具栏--><form class="layui-form" lay-filter="autodeviceform" style="margin-top:5px;"><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><div class="layui-input-block" style="margin-left:10px;"><select id="autodevicepretimeid" name="autodevicepretime" lay-filter="autodevicepretimefilter" style="visibility:visible;"></select></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><div class="layui-input-block" style="margin-left:10px;margin-right:10px;"><input id="autodevicecustomtimeid" name="autodevicecustomtime" type="text" class="layui-input" placeholder="开始时间 — 结束时间" style="visibility:visible;"></div></div></div></div></div></form><!--采集数量柱状图--><div id="autodevicechart" class="layui-tab-item layui-show" style="width:780px;height:600px"></div><!--设备采集率--><div style="padding-left:50px;padding-right:10px;padding-top:20px;"><div class="layui-progress layui-progress" lay-showpercent="true" lay-filter="devicerate"><div class="layui-progress-bar layui-bg-green" lay-percent="0%"></div></div></div></div></div></div></div></div></div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    //展示项目设备总览
                    DisplayProjectDevices();
                    //展示监测设备详情
                    DisplayMonitorDevice();
                }
                , end: function () {
                    automonitordevicelayerindex = null;
                    projectdevicechartcount = null;
                    projectdevicechartdisaster = null;
                    projectdevicecharttype = null;
                    monitordevicechart = null;
                }
            });
        }
    }
}

function DisplayProjectDevices() {
    //渲染工具
    document.getElementById("autodevicespretimeid").style.visibility = "visible";
    document.getElementById("autodevicescustomtimeid").style.visibility = "visible";

    //预设时间范围
    if (autodatadatetimes.length > 0) {
        for (var i in autodatadatetimes) {
            if (autodatadatetimes[i].name == "前一日") {
                document.getElementById("autodevicespretimeid").innerHTML += '<option value="' + autodatadatetimes[i].value + '" selected>' + autodatadatetimes[i].name + '</option>';
            }
            else {
                document.getElementById("autodevicespretimeid").innerHTML += '<option value="' + autodatadatetimes[i].value + '">' + autodatadatetimes[i].name + '</option>';
            }
        }
    }
    //自定义时间范围
    date.render({
        elem: '#autodevicescustomtimeid'
        , type: 'date'
        , range: true
        , done: function (value, date, endDate) {
            if (value != "") {
                ////按自定义时间范围绘制图表
                //LoadMonitorAutoDataCustomDateTime(currentmonitor, value);
            }
        }
    });

    form.render();
    form.render('select');

};

function DisplayMonitorDevice() {
    //渲染监测点树
    tree.render({
        elem: '#device-monitor-tree'
        , id: 'device-monitor-treeid'
        , showCheckbox: false
        , showLine: true
        , data: currentprojectmonitors
        , edit: false
        , accordion: true
        , click: function (obj) {
            if ((obj.data.type != null) || (obj.data.type != undefined)) {
                if (obj.data != currentdevicemonitor) {
                    currentdevicemonitor = obj.data;
                    LoadDeviceCountPreDateTime(currentdevicemonitor, form.val("autodeviceform").autodevicepretime);
                }
            }
        }
    });

    //预设时间范围
    if (autodatadatetimes.length > 0) {
        for (var i in autodatadatetimes) {
            if (autodatadatetimes[i].name == "最近30天") {
                document.getElementById("autodevicepretimeid").innerHTML += '<option value="' + autodatadatetimes[i].value + '" selected>' + autodatadatetimes[i].name + '</option>';
            }
            else {
                document.getElementById("autodevicepretimeid").innerHTML += '<option value="' + autodatadatetimes[i].value + '">' + autodatadatetimes[i].name + '</option>';
            }
        }
    }
    //自定义时间范围
    date.render({
        elem: '#autodevicecustomtimeid'
        , type: 'date'
        , range: true
        , done: function (value, date, endDate) {
            if (value != "") {
                //按自定义时间范围绘制图表
                LoadDeviceCountCustomDateTime(currentdevicemonitor, value);
            }
        }
    });

    //预设时间范围切换时间
    form.on('select(autodevicepretimefilter)', function (data) {
        if (data.value != "") {
            //按预设时间范围绘制图表
            LoadDeviceCountPreDateTime(currentdevicemonitor, data.value);
        }
    });

    form.render();
    form.render('select');

    //加载初始监测点数据
    if (currentprojectfristmonitor != null) {
        currentdevicemonitor = currentprojectfristmonitor;
    }
    LoadDeviceCountPreDateTime(currentdevicemonitor, form.val("autodeviceform").autodevicepretime);
};

function LoadDeviceCountPreDateTime(monitor, datetime) {
    monitordevicechart = echarts.init(document.getElementById('autodevicechart'));
    monitordevicechart.showLoading();

    $.ajax({
        url: servicesurl + "/api/Device/GetDeviceCountbyPreDateTime", type: "get", data: { "id": monitor.id, "type": monitor.type, "predatetime": datetime, "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                DisplayDeviceCount(monitor, result.data);
            }
            else {
                monitordevicechart.hideLoading();
                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }
        }, datatype: "json"
    });
};

function LoadDeviceCountCustomDateTime(monitor, datetime) {
    monitordevicechart = echarts.init(document.getElementById('autodevicechart'));
    monitordevicechart.showLoading();

    $.ajax({
        url: servicesurl + "/api/Device/GetDeviceCountbyCustomDateTime", type: "get", data: { "id": monitor.id, "type": monitor.type, "customdatetime": datetime, "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                DisplayDeviceCount(monitor, result.data);
            }
            else {
                monitordevicechart.hideLoading();
                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }
        }, datatype: "json"
    });

};

function DisplayDeviceCount(monitor, data) {
    var devicecount = JSON.parse(data);

    var times = [];
    var counts = [];

    elem.init();
    elem.render('progress');
    elem.progress('devicerate', toPercent(devicecount.Rate));


    for (var i in devicecount.DeviceCounts) {
        times.push(devicecount.DeviceCounts[i].Date);
        counts.push(devicecount.DeviceCounts[i].Count);
    }

    var option = {
        title: {
            text: monitor.title,
            textStyle: {
                fontSize: 20,
                fontFamily: 'sans-serif',
                fontWeight: 'bold'
            },
            left: "center",
            top: 10
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['采集数量'],
            left: 'center',
            bottom: 10
        },
        dataZoom: [
            //{   // 这个dataZoom组件，默认控制x轴。
            //    type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            //    start: 0,      // 左边在 10% 的位置。
            //    end: 100         // 右边在 60% 的位置。
            //},
            //{   // 这个dataZoom组件，也控制x轴。
            //    type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
            //    start: 0,      // 左边在 10% 的位置。
            //    end: 100        // 右边在 60% 的位置。
            //}
        ],
        grid: {
            left: '5%',
            right: '5%',
            top: '10%',
            bottom: '10%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: times
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '采集数量',
                type: 'bar',
                stack: '',
                data: counts
            }
        ]
    };

    monitordevicechart.hideLoading();
    monitordevicechart.setOption(option, true, false);
};

//小数转百分数
function toPercent(point) {
    var str = Number(point * 100).toFixed(2);
    str += "%";
    return str;
};