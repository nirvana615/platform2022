var projectdevicechartcount = null;
var projectdevicechartdisaster = null;
var projectdevicecharttype = null;
var projectdevicechartoffline = null;
var monitordevicechart = null;

var currentdevicemonitor = null;//当前设备
var laytpl = layui.laytpl;
var viewerPhoto = null;
var constPhotolayerindex = null;

var projectDeviceDatas = null;
var projectDeviceDays = null;

//自动化监测设备widget
function LoadAutoDeviceLayer(projectid) {
    if (projectid == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
    }
    if (currentprojectmonitors.length == 0) {
        layer.msg("请稍等项目加载！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
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
                , content: '<!--设备管理--> <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin-top:0px"> <ul class="layui-tab-title"> <li class="layui-this" style="width:10%;padding-top: 10px;">概况</li> <li style="width:10%;padding-top: 10px;">详情</li> <li style="width:10%;padding-top: 10px;">设备安装进度</li> <li style="width:10%;padding-top: 10px;">临时道路</li> <li style="width:10%;padding-top: 10px;">设备到场</li> <li style="width:10%;padding-top: 10px;">二次搬运</li> <li style="width:10%;padding-top: 10px;">项目检查</li> </ul> <div class="layui-tab-content"> <!--概况--> <div class="layui-tab-item layui-show"> <form class="layui-form" lay-filter="autodevicesform" style="margin-top:5px;"> <div class="layui-row"> <div class="layui-col-xs6"> <div class="grid-demo grid-demo-bg1"> <div class="layui-form-item"> <div class="layui-input-block" style="margin-left:10px;"> <select id="autodevicespretimeid" name="autodevicespretime" lay-filter="autodevicespretimefilter" style="visibility:visible;"></select> </div> </div> </div> </div> <div class="layui-col-xs6"> <div class="grid-demo"> <div class="layui-form-item"> <div class="layui-input-block" style="margin-left:10px;margin-right:10px;"> <input id="autodevicescustomtimeid" name="autodevicescustomtime" type="text" class="layui-input" placeholder="开始时间 — 结束时间" style="visibility:visible;"> </div> </div> </div> </div> </div> </form> <div class="layui-row" style="border-bottom: 1px solid #e6e6e6;"> <div class="layui-col-xs6"> <div class="grid-demo"> <!--设备离线数量和在线率--> <div id="autodeviceschartbyall" class="layui-tab-item layui-show" style="width:500px;height:310px"></div> </div> </div> <div class="layui-col-xs6"> <div class="grid-demo"> <!--按设备类型--> <div id="autodeviceschartbytype" class="layui-tab-item layui-show" style="width:95%;height:310px"></div> </div> </div> </div> <div class="layui-row"> <div class="layui-col-xs6"> <div class="grid-demo"> <!--按灾害体类型--> <div id="autodevicechartbydisaster" class="layui-tab-item layui-show" style="width:95%;height:320px"></div> </div> </div> <div class="layui-col-xs6"> <div class="grid-demo"> <!--离线设备（离线天数）--> <div id="autodeviceschartbyoffdevice" class="layui-tab-item layui-show" style="width:95%;height:320px"></div> </div> </div> </div> </div> <!--详情--> <div class="layui-tab-item"> <div class="layui-row"> <!--左侧--> <div class="layui-col-md3" style="width:20%;height:500px;overflow: auto;"> <div id="device-monitor-tree" class="grid-demo"></div> </div> <!--右侧--> <div class="layui-col-md9" style="width:80%;height:300px;border-left:solid;border-color:#e6e6e6;border-left-width:0px;"> <div class="grid-demo grid-demo-bg1"> <!--工具栏--> <form class="layui-form" lay-filter="autodeviceform" style="margin-top:5px;"> <div class="layui-row"> <div class="layui-col-xs6"> <div class="grid-demo grid-demo-bg1"> <div class="layui-form-item"> <div class="layui-input-block" style="margin-left:10px;"> <select id="autodevicepretimeid" name="autodevicepretime" lay-filter="autodevicepretimefilter" style="visibility:visible;"></select> </div> </div> </div> </div> <div class="layui-col-xs6"> <div class="grid-demo"> <div class="layui-form-item"> <div class="layui-input-block" style="margin-left:10px;margin-right:10px;"> <input id="autodevicecustomtimeid" name="autodevicecustomtime" type="text" class="layui-input" placeholder="开始时间 — 结束时间" style="visibility:visible;"> </div> </div> </div> </div> </div> </form> <!--采集数量柱状图--> <div id="autodevicechart" class="layui-tab-item layui-show" style="width:780px;height:600px"></div> <!--设备采集率--> <div style="padding-left:50px;padding-right:10px;padding-top:20px;"> <div class="layui-progress layui-progress" lay-showpercent="true" lay-filter="devicerate"> <div class="layui-progress-bar layui-bg-green" lay-percent="0%"></div> </div> </div> </div> </div> </div> </div> <!--施工管理--> <div class="layui-tab-item"> <!--施工设备管理--> <div class="layui-fluid"> <div class="layui-card"> <div class="layui-card-body"> <table id="const-device-manage" lay-filter="const-device-manage"></table> <script type="text/html" id="table-toolbar-const"> <a class="layui-btn layui-btn layui-btn-xs" lay-event="photoview">查看</a> <a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="photoDown">下载</a> </script> <!--统计表格--> <div id="autodatastatisticsdiv" style="margin-left:50px;margin-right:50px;margin-top:20px"> <table id="constdeviceTongji" class="layui-hide"></table> </div> </div> </div> </div> </div> <div class="layui-tab-item"> <!--临时道路--> <div class="layui-fluid"> <div class="layui-card"> <div class="layui-card-body"> <table id="road-device-manage" lay-filter="road-device-manage"></table> <script type="text/html" id="table-toolbar-road"> <a class="layui-btn layui-btn layui-btn-xs" lay-event="photoview">查看</a> </script> </div> </div> </div> </div> <div class="layui-tab-item"> <!--设备到场--> <div class="layui-fluid"> <div class="layui-card"> <div class="layui-card-body"> <table id="road-arrival-manage" lay-filter="road-arrival-manage"></table> <script type="text/html" id="table-toolbar-road"> <a class="layui-btn layui-btn layui-btn-xs" lay-event="photoview">查看</a> </script> </div> </div> </div> </div> <div class="layui-tab-item"> <!--材料二次搬运--> <div class="layui-fluid"> <div class="layui-card"> <div class="layui-card-body"> <table id="road-carry-manage" lay-filter="road-carry-manage"></table> <script type="text/html" id="table-toolbar-road"> <a class="layui-btn layui-btn layui-btn-xs" lay-event="photoview">查看</a> </script> </div> </div> </div> </div> <div class="layui-tab-item"> <!--项目检查--> <div class="layui-fluid"> <div class="layui-card"> <div class="layui-card-body"> <table id="road-jiancha-manage" lay-filter="road-jiancha-manage"></table> <script type="text/html" id="table-toolbar-road"> <a class="layui-btn layui-btn layui-btn-xs" lay-event="photoview">查看</a> </script> </div> </div> </div> </div> </div> </div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    elem.init();
                    elem.render('progress');
                    //展示项目设备总览
                    DisplayProjectDevices(projectid);
                    //展示监测设备详情
                    DisplayMonitorDevice();
                    //展示设备施工数据
                    FuConstPhotoData(projectid);
                    //展示临时道路
                    FuRoadPhotoData(projectid);
                    //展示设备到场
                    FuArrivalPhotoData(projectid);
                    //展示二次搬运
                    FuErCiPhotoData(projectid);
                    //项目检查
                    FujianchaPhotoData(projectid);
                }
                , end: function () {
                    automonitordevicelayerindex = null;
                    projectdevicechartcount = null;
                    projectdevicechartdisaster = null;
                    projectdevicecharttype = null;
                    projectdevicechartoffline = null;
                    monitordevicechart = null;

                    projectDeviceDatas = null;
                    //projectDeviceDays = null;

                }
            });
        }
    }
}

//展示项目设备总览
function DisplayProjectDevices(projectid) {
    //渲染工具
    document.getElementById("autodevicespretimeid").style.visibility = "visible";
    document.getElementById("autodevicescustomtimeid").style.visibility = "visible";

    //预设时间范围
    if (autodatadatetimes.length > 0) {
        for (var i in autodatadatetimes) {
            if (autodatadatetimes[i].name == "最近三十天") {
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
                LoadProjectDeviceCustomDateTime(projectid, value);
            }
        }
    });
    //预设时间范围切换时间
    form.on('select(autodevicespretimefilter)', function (data) {
        if (data.value != "") {
            //按预设时间范围绘制图表
            if (Number(data.value) < 4) {
                projectdevicesbycount = echarts.init(document.getElementById('autodeviceschartbyall'));
                projectdevicesbycount.showLoading();
                projectdevicesbytype = echarts.init(document.getElementById('autodeviceschartbytype'));
                projectdevicesbytype.showLoading();
                projectdevicesbydisaster = echarts.init(document.getElementById('autodevicechartbydisaster'));
                projectdevicesbydisaster.showLoading();
                projectdevicechartoffline = echarts.init(document.getElementById('autodeviceschartbyoffdevice'));
                projectdevicechartoffline.showLoading();
                var newProjectDeviceDatas = null;
                
                if (projectDeviceDatas != null) {
                    var length = projectDeviceDatas.DateTimes.length;
                    if (data.value == "1") {
                        //今日
                        newProjectDeviceDatas = Object.assign({}, projectDeviceDatas);
                        newProjectDeviceDatas.DateTimes = newProjectDeviceDatas.DateTimes.slice(-1);
                    }
                    else if (data.value == "2") {
                        //本旬
                        var sDate = null;
                        var nowDate = getNowFormateDate();
                        var num = Number(nowDate.substr(nowDate.length - 2, nowDate.length - 1));
                        if (num < 10) {
                            sDate = nowDate.substr(0, 8) + "01";
                        }
                        else if (num > 10 && num < 20) {
                            sDate = nowDate.substr(0, 8) + "10";
                        }
                        else {
                            sDate = nowDate.substr(0, 8) + "20";
                        }
                        var len = DateMinus(sDate)+1;
                        newProjectDeviceDatas = Object.assign({}, projectDeviceDatas);
                        newProjectDeviceDatas.DateTimes = newProjectDeviceDatas.DateTimes.slice(length - len);
                    }
                    else if (data.value == "3") { 
                        //本月
                        var nowDate = getNowFormateDate();
                        var sDate = nowDate.substr(0,8)+"01";
                        var len = DateMinus(sDate)+1;
                        newProjectDeviceDatas = Object.assign({}, projectDeviceDatas);
                        newProjectDeviceDatas.DateTimes = newProjectDeviceDatas.DateTimes.slice(length - len);
                    }
                    else if (data.value == "0") {
                        //最近三十天
                        newProjectDeviceDatas = Object.assign({}, projectDeviceDatas);;
                    }
                    if (newProjectDeviceDatas != null) {
                        DisplayProjectDeviceByCount(projectdevicesbycount, newProjectDeviceDatas);
                        DisplayProjectDeviceByTpye(projectdevicesbytype, newProjectDeviceDatas);
                        if (projectDeviceDays != null) {
                            DisplayProjectDeviceByOffline(projectdevicechartoffline, projectDeviceDays);
                            DisplayProjectDeviceByDisaster(projectdevicesbydisaster, projectDeviceDays, newProjectDeviceDatas);
                        }
                    }
                }
            }
            else {
                LoadProjectDevicePreDateTime(projectid, data.value);
            }
            
        }
    });

    form.render();
    form.render('select');

    //display预加载数据
    if (projectDeviceDatas != null) {
        projectdevicesbycount = echarts.init(document.getElementById('autodeviceschartbyall'));
        projectdevicesbycount.showLoading();
        projectdevicesbytype = echarts.init(document.getElementById('autodeviceschartbytype'));
        projectdevicesbytype.showLoading();
        DisplayProjectDeviceByCount(projectdevicesbycount, projectDeviceDatas);
        DisplayProjectDeviceByTpye(projectdevicesbytype, projectDeviceDatas);
        
        projectdevicesbydisaster = echarts.init(document.getElementById('autodevicechartbydisaster'));
        projectdevicesbydisaster.showLoading();
        projectdevicechartoffline = echarts.init(document.getElementById('autodeviceschartbyoffdevice'));
        projectdevicechartoffline.showLoading();
        if (projectDeviceDays != null) {
            DisplayProjectDeviceByOffline(projectdevicechartoffline, projectDeviceDays);
            DisplayProjectDeviceByDisaster(projectdevicesbydisaster, projectDeviceDays, projectDeviceDatas);
        }
        else {
            LoadProjectDeviceOfflineDays(projectid, projectDeviceDays);
        }
    }
    else {
        //重新Load数据
        LoadProjectDevicePreDateTime(projectid, form.val("autodevicesform").autodevicespretime);
    }
};

//预加载项目监测设备统计数据
function GetPreProjectDatas(projectid, datetime) {
    projectDeviceDatas = null;
    projectDeviceDays = null;
    $.ajax({
        url: servicesurl + "/api/Device/GetProjectDevicebyPreDateTime", type: "get", data: { "id": projectid, "predatetime": datetime, "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                projectDeviceDatas = JSON.parse(result.data);
            }
        }, datatype: "json"
    });
    $.ajax({
        url: servicesurl + "/api/Device/GetProjectDeviceDayCounts", type: "get", data: { "id": projectid, "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                projectDeviceDays = JSON.parse(result.data);
            }
            else {
                projectdevicechartoffline.hideLoading();
                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }
        }, datatype: "json"
    });
}

function LoadProjectDevicePreDateTime(projectid, datetime) {
    projectdevicesbycount = echarts.init(document.getElementById('autodeviceschartbyall'));
    projectdevicesbycount.showLoading();
    projectdevicesbytype = echarts.init(document.getElementById('autodeviceschartbytype'));
    projectdevicesbytype.showLoading();
    projectdevicesbydisaster = echarts.init(document.getElementById('autodevicechartbydisaster'));
    projectdevicesbydisaster.showLoading();
    projectdevicechartoffline = echarts.init(document.getElementById('autodeviceschartbyoffdevice'));
    projectdevicechartoffline.showLoading();
    $.ajax({
        url: servicesurl + "/api/Device/GetProjectDevicebyPreDateTime", type: "get", data: { "id": projectid, "predatetime": datetime, "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                if (datetime == "0") {
                    projectDeviceDatas = JSON.parse(result.data);
                }
                DisplayProjectDeviceByCount(projectdevicesbycount, JSON.parse(result.data));
                DisplayProjectDeviceByTpye(projectdevicesbytype, JSON.parse(result.data));
                if (projectDeviceDays != null) {
                    DisplayProjectDeviceByOffline(projectdevicechartoffline, projectDeviceDays);
                    DisplayProjectDeviceByDisaster(projectdevicesbydisaster, projectDeviceDays, JSON.parse(result.data));
                }
                else {
                    LoadProjectDeviceOfflineDays(projectid, JSON.parse(result.data));
                }
                
            }
            else {
                projectdevicesbycount.hideLoading();
                projectdevicesbytype.hideLoading();
                projectdevicesbydisaster.hideLoading();
                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }
        }, datatype: "json"
    });
};
function LoadProjectDeviceCustomDateTime(projectid, datetime) {
    projectdevicesbycount = echarts.init(document.getElementById('autodeviceschartbyall'));
    projectdevicesbycount.showLoading();
    projectdevicesbytype = echarts.init(document.getElementById('autodeviceschartbytype'));
    projectdevicesbytype.showLoading();
    projectdevicesbydisaster = echarts.init(document.getElementById('autodevicechartbydisaster'));
    projectdevicesbydisaster.showLoading();
    projectdevicechartoffline = echarts.init(document.getElementById('autodeviceschartbyoffdevice'));
    projectdevicechartoffline.showLoading();
    $.ajax({
        url: servicesurl + "/api/Device/GetProjectDevicebyCustomDateTime", type: "get", data: { "id": projectid, "customdatetime": datetime, "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                DisplayProjectDeviceByCount(projectdevicesbycount, JSON.parse(result.data));
                DisplayProjectDeviceByTpye(projectdevicesbytype, JSON.parse(result.data));
                if (projectDeviceDays != null) {
                    DisplayProjectDeviceByOffline(projectdevicechartoffline, projectDeviceDays);
                    DisplayProjectDeviceByDisaster(projectdevicesbydisaster, projectDeviceDays, JSON.parse(result.data));
                }
                else {
                    LoadProjectDeviceOfflineDays(projectid, JSON.parse(result.data));
                }
            }
            else {
                projectdevicesbycount.hideLoading();
                projectdevicesbytype.hideLoading();
                projectdevicesbydisaster.hideLoading();
                projectdevicechartoffline.hideLoading();
                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }
        }, datatype: "json"
    });
};
function LoadProjectDeviceOfflineDays(projectid, deviceDatas) {

    $.ajax({
        url: servicesurl + "/api/Device/GetProjectDeviceDayCounts", type: "get", data: { "id": projectid, "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                projectDeviceDays = JSON.parse(result.data);
                DisplayProjectDeviceByDisaster(projectdevicesbydisaster, projectDeviceDays, deviceDatas);
                DisplayProjectDeviceByOffline(projectdevicechartoffline, projectDeviceDays);
            }
            else {
                projectdevicesbydisaster.hideLoading();
                projectdevicechartoffline.hideLoading();
                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }
        }, datatype: "json"
    });
}
//按日设备数量统计
function DisplayProjectDeviceByCount(myChart, deviceDatas) {
    var devicesum = 0;
    var GNSSflg = false;
    var deviceTypes = currentprojectmonitors[1].children
    for (var i in deviceTypes) {
        if (deviceTypes[i].title == 'GNSS') {
            devicesum += deviceTypes[i].children.length + 1;
            GNSSflg = true;
        }
        else {
            devicesum += deviceTypes[i].children.length;
        }
    }
    var datetime = deviceDatas.DateTimes;
    var devicedata = [deviceDatas.GNSSDatas, deviceDatas.LFDatas, deviceDatas.QJDatas, deviceDatas.YLDatas, deviceDatas.RAINDatas, deviceDatas.SBWYDatas, deviceDatas.WATERDatas];
    var onlineData = [];
    var offlineData = [];
    var ratesData = [];
    for (var i in datetime) {
        var dayOnlineCounts = 0;
        for (var j in devicedata) {
            for (var k in devicedata[j]) {
                if (datetime[i] == devicedata[j][k].GCSJ.substr(0, 10)) {
                    dayOnlineCounts += 1;
                }
            }
        }
        if (GNSSflg) {
            dayOnlineCounts += 1;
        }
        onlineData.push(dayOnlineCounts);
        offlineData.push(devicesum - dayOnlineCounts);
        var rate = dayOnlineCounts / devicesum * 100;
        ratesData.push(rate.toFixed(2));
    }
    //预选择时间段（柱状图）
    var option_bar;
    const colors = ['#458B00', '#BEBEBE', '#EE3B3B'];
    option_bar = {
        color: colors,
        title: {
            text: "监测设备日离线统计",
            left: 'center',
            textStyle: {
                color: '#4F4F4F',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: 15
            },
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var time = params[0].name;
                var label = "";
                label = params[0].marker + params[0].seriesName + ':' + params[0].value + '台<br/>';
                label += params[1].marker + params[1].seriesName + ':' + params[1].value + '台<br/>';
                label += params[2].marker + params[2].seriesName + ':' + params[2].value + '%<br/>';
                return time + '<br/>' + label;
            },
            axisPointer: {
                type: 'none'
            },
            axisPointer: {
                type: 'none'
            }
        },
        grid: {
            left: '5%',
            right: '5%',
            top: '10%',
            bottom: '10%',
            containLabel: true
        },
        legend: {
            orient: 'horizontal',
            x: 'center',
            y: 'bottom',
            data: ['在线设备', '离线设备', '在线率']
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: datetime
            }
        ],
        yAxis: [
            {
                type: 'value',
                position: 'left',
                alignTicks: true,
                splitLine: { show: false },
                max: devicesum,
                axisLine: {
                    show: true,
                },
                axisLabel: {
                    formatter: '{value} 台'
                }
            },
            {
                type: 'value',
                position: 'right',
                alignTicks: true,
                splitLine: { show: false },
                max: 100,
                axisLine: {
                    show: true,
                },
                axisLabel: {
                    formatter: '{value} %'
                }
            }
        ],
        series: [
            {
                name: '在线设备',
                type: 'bar',
                yAxisIndex: 0,
                barMaxWidth: '20',
                stack: 'Ad',
                emphasis: {
                    focus: 'series'
                },
                data: onlineData,
            },
            {
                name: '离线设备',
                type: 'bar',
                yAxisIndex: 0,
                barMaxWidth: '20',
                emphasis: {
                    focus: 'series'
                },
                stack: 'Ad',
                data: offlineData,
                label: {
                    normal: {
                        show: true,
                        position: 'insideBottom',
                        formatter: function (series) {
                            var value = "";
                            if (series.value != 0) {
                                value = series.value;
                            };
                            return value;
                        }
                    },
                },
            },
            {
                name: '设备在线率',
                type: 'line',
                yAxisIndex: 1,
                smooth: true,
                data: ratesData,
                markLine: {
                    data: [{ type: 'average', name: 'Avg' }]
                }
            }
        ]
    };

    //查询一天（饼状图）
    var onedatas = [];
    var onedata = {};
    onedata.value = onlineData[0];
    onedata.name = "在线设备"
    onedatas.push(onedata);
    var onedata = {};
    onedata.value = offlineData[0];
    onedata.name = "离线设备"
    onedatas.push(onedata);
    option_pie = {
        color: ['#458B00', '#BEBEBE'],
        title: {
            text: "监测设备日离线统计",
            textStyle: {
                color: '#4F4F4F',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: 15
            },
            subtext: datetime[0],
            subtextStyle: {
                color: '#FF0000',
                fontStyle: 'normal',
                fontWeight: 'bold',
            },
            left: 'center'
        },
        legend: {
            orient: 'horizontal',
            x: 'center',
            y: 'bottom',
        },
        grid: {
            left: '5%',
            right: '5%',
            top: '10%',
            bottom: '10%',
            containLabel: true
        },
        series: [
            {
                type: 'pie',
                radius: '50%',
                data: onedatas,
                label: {
                    normal: {
                        formatter: '{d}%({c} 台)'
                    }
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    if (datetime.length > 1) {
        myChart.hideLoading();
        myChart.dispose();
        myChart = echarts.init(document.getElementById('autodeviceschartbyall'));
        option_bar && myChart.setOption(option_bar);
    }
    else {
        myChart.hideLoading();
        myChart.dispose();
        myChart = echarts.init(document.getElementById('autodeviceschartbyall'));
        option_pie && myChart.setOption(option_pie);
    }
};
//按设备类型统计
function DisplayProjectDeviceByTpye(myChart, deviceDatas) {
    var deviceTypes = currentprojectmonitors[1].children;
    var datetime = deviceDatas.DateTimes;
    var legends = [];
    var peidata = null;
    var oneDayDatas = [];
    //预选时间段（柱状图）
    var option_bar;
    option_bar = {
        title: {
            text: "按设备类型统计（离线数量）",
            textStyle: {
                color: '#4F4F4F',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: 15
            },
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var time = params[0].name;
                var label = "";
                for (var i in params) {
                    label += params[i].marker + params[i].seriesName + ':' + params[i].value + '台<br/>';
                }
                return time + '<br/>' + label;
            },
            axisPointer: {
                type: 'none'
            }
        },
        legend: {
            orient: 'horizontal',
            x: 'center',
            y: 'bottom',
            data: []
        },
        grid: {
            left: '5%',
            right: '6%',
            top: '10%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            data: []
        },
        yAxis: {
            type: 'value',
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            minInterval: 1,
            axisLabel: {
                formatter: '{value} 台'
            }
        },
        series: []
    };

    for (var i in deviceTypes) {
        var devicedata = null;
        if (deviceTypes[i].title == "GNSS") {
            devicedata = deviceDatas.GNSSDatas;
        }
        else if (deviceTypes[i].title == "裂缝") {
            devicedata = deviceDatas.LFDatas;
        }
        else if (deviceTypes[i].title == "倾角") {
            devicedata = deviceDatas.QJDatas;
        }
        else if (deviceTypes[i].title == "应力") {
            devicedata = deviceDatas.YLDatas;
        }
        else if (deviceTypes[i].title == "雨量") {
            devicedata = deviceDatas.RAINDatas;
        }
        else if (deviceTypes[i].title == "深部位移") {
            devicedata = deviceDatas.SBWYDatas;
        }
        else if (deviceTypes[i].title == "地下水位") {
            devicedata = deviceDatas.WATERDatas;
        };
        legends.push(deviceTypes[i].title);
        var serie = {};
        serie.name = deviceTypes[i].title;
        serie.type = 'bar';
        serie.stack = 'type';
        serie.barMaxWidth = '20';
        serie.label = {
            normal: {
                show: true,
                position: 'insideBottom',
                formatter: function (series) {
                    var value = "";
                    if (series.value != 0) {
                        value = series.value;
                    }
                    return value;
                },
                textStyle: {
                    fontSize: '10',
                }
            }
        };
        serie.data = [];
        for (var j in datetime) {
            var dayOnlineCount = 0;
            var dayOfflineCount = 0;
            for (var k in devicedata) {
                if (datetime[j] == devicedata[k].GCSJ.substr(0, 10)) {
                    dayOnlineCount += 1;
                }
            }
            dayOfflineCount = deviceTypes[i].children.length - dayOnlineCount;
            serie.data.push(dayOfflineCount);
            if (datetime.length < 2) {
                peidata = dayOfflineCount;
            }
        }
        option_bar.series.push(serie);

        //查询一天（饼状图data）
        if (datetime.length < 2) {
            var oneDayData = {};
            oneDayData.value = peidata;
            oneDayData.name = deviceTypes[i].title;
            oneDayDatas.push(oneDayData);
        }

    }
    option_bar.legend.data = legends;
    option_bar.xAxis.data = datetime;

    //查询一天（饼状图）
    option_pie = {
        title: {
            text: "按设备类型统计（离线数量）",
            textStyle: {
                color: '#4F4F4F',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: 15
            },
            subtext: datetime[0],
            subtextStyle: {
                color: '#FF0000',
                fontStyle: 'normal',
                fontWeight: 'bold',
            },
            left: 'center'
        },
        legend: {
            orient: 'horizontal',
            x: 'center',
            y: 'bottom',
            data: legends,
        },
        grid: {
            left: '5%',
            right: '5%',
            top: '10%',
            bottom: '10%',
            containLabel: true
        },
        series: [
            {
                type: 'pie',
                radius: '50%',
                data: oneDayDatas,
                label: {
                    normal: {
                        formatter: '{d}%({c} 台)'
                    }
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    if (datetime.length < 2) {
        myChart.hideLoading();
        myChart.dispose();
        myChart = echarts.init(document.getElementById('autodeviceschartbytype'));
        option_pie && myChart.setOption(option_pie);

    }
    else {
        myChart.hideLoading();
        myChart.dispose();
        myChart = echarts.init(document.getElementById('autodeviceschartbytype'));
        option_bar && myChart.setOption(option_bar);
    }
};
//按灾害体统计
function DisplayProjectDeviceByDisaster(myChart, monitorDevices, deviceDatas) {
    var disasterDevices = currentprojectmonitors[0].children;
    var datetime = deviceDatas.DateTimes;
    var MonitorDeviceMaps = monitorDevices.MonitorDeviceMaps;
    var legends = [];
    var peidata = [];
    var seriesdata = [];
    var disasterOffDevices = [];
    for (var i in disasterDevices) {
        var disastersInfo = {};
        disastersInfo.title = disasterDevices[i].title;
        disastersInfo.datetime = [];
        disastersInfo.offdevices = [];
        var serie = {};
        serie.name = disasterDevices[i].title;
        serie.type = 'bar';
        serie.stack = 'type';
        serie.barMaxWidth = '20';
        serie.label = {
            normal: {
                show: true,
                position: 'inside',
                formatter: function (series) {
                    var value = "";
                    if (series.value != 0) {
                        value = series.value;
                    }
                    return value;
                },
                textStyle: {
                    fontSize: '10',
                }
            }
        };
        serie.data = [];
        legends.push(disasterDevices[i].title);
        for (var j in datetime) {
            disastersInfo.datetime.push(datetime[j]);
            
            var offDevices=[]
            var dayOnlineCount = 0;
            var dayOfflineCount = 0;
            for (var k in disasterDevices[i].children) {
                var devicedata = null;
                var isOnline = false;
                if (disasterDevices[i].children[k].type == "GNSS") {
                    devicedata = deviceDatas.GNSSDatas;
                }
                else if (disasterDevices[i].children[k].type == "裂缝") {
                    devicedata = deviceDatas.LFDatas;
                }
                else if (disasterDevices[i].children[k].type == "倾角") {
                    devicedata = deviceDatas.QJDatas;
                }
                else if (disasterDevices[i].children[k].type == "应力") {
                    devicedata = deviceDatas.YLDatas;
                }
                else if (disasterDevices[i].children[k].type == "雨量") {
                    devicedata = deviceDatas.RAINDatas;
                }
                else if (disasterDevices[i].children[k].type == "深部位移") {
                    devicedata = deviceDatas.SBWYDatas;
                }
                else if (disasterDevices[i].children[k].type == "地下水位") {
                    devicedata = deviceDatas.WATERDatas;
                };
                for (var x in devicedata) {
                    var code = getDeviceCode(disasterDevices[i].children[k].title);
                    if (code == devicedata[x].Code && datetime[j] == devicedata[x].GCSJ.substr(0, 10)) {
                        dayOnlineCount += 1;
                        isOnline = true;
                        break;
                    }
                }
                if (!isOnline) {
                    offDevices.push(disasterDevices[i].children[k].title);
                }
            }
            dayOfflineCount = disasterDevices[i].children.length - dayOnlineCount;
            serie.data.push(dayOfflineCount);
            disastersInfo.offdevices.push(offDevices);
            //查询一天（饼状图）
            if (datetime.length < 2) {
                var oneDayData = {};
                oneDayData.value = dayOfflineCount;
                oneDayData.name = disasterDevices[i].title;
                peidata.push(oneDayData);
            }

        }
        seriesdata.push(serie);
        disasterOffDevices.push(disastersInfo);
    }

    //查询一天（饼状图）
    option_pie = {
        title: {
            text: '按灾害体类型统计（离线数量）',
            textStyle: {
                color: '#4F4F4F',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: 15
            },
            subtext: datetime[0],
            subtextStyle: {
                color: '#FF0000',
                fontStyle: 'normal',
                fontWeight: 'bold',
            },
            left: 'center'
        },
        legend: {
            orient: 'horizontal',
            x: 'center',
            y: 'bottom',
            data: legends,
        },
        grid: {
            left: '5%',
            right: '5%',
            top: '10%',
            bottom: '28%',
            containLabel: true
        },
        series: [
            {
                type: 'pie',
                radius: '50%',
                data: peidata,
                label: {
                    normal: {
                        formatter: '{d}%({c} 台)'
                    }
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    //监测点编号JCDBH与code映射
    function getDeviceCode(JCDBH) {
        for (var i in MonitorDeviceMaps) {
            if (JCDBH == MonitorDeviceMaps[i].JCDBH) {
                return MonitorDeviceMaps[i].CODE;
                break;
            }
        }
    }

    //预选时间段（柱状图）
    function arrayChunk(array, size) {
        //分割数组
        let data = []
        for (let i = 0; i < array.length; i += size) {
            data.push(array.slice(i, i + size))
        }
        return data
    }
    var obj = {
        "legendData": legends,
        "dataSource": seriesdata
    };
    //分页数字
    const Pages = [];
    var options = [];
    var lengendArr = arrayChunk(obj.legendData, 1);
    var seriesArr = arrayChunk(obj.dataSource, 1);
    for (var j = 0; j < lengendArr.length; j++) {
        Pages.push(j + 1);
    }
    
    for (var index = 0; index < Pages.length; index++) {
        let yAxis = {};
        let color = null;
        let series = {};
        let title = {};
        let tooltip = {};
        let legend = {};
        let grid = {};
        let xAxis = {};
        if (index == 0) {
            title.text = "按灾害体统计（离线数量）";
            title.textStyle = {
                color: '#4F4F4F',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: 15
            };
            title.left = 'center';
            color = '#CD950C';
            tooltip.trigger = 'axis';
            tooltip.formatter = function (params) {
                var time = params[0].name;
                var label = "";
                var devicelabel = '离线设备:';
                var Offdevice = [];
                for (var i in params) {
                    label += params[i].marker + params[i].seriesName + ':' + params[i].value + '台<br/>';
                    for (var j in disasterOffDevices) {
                        if (params[i].seriesName == disasterOffDevices[j].title) {
                            for (var k in disasterOffDevices[j].datetime) {
                                if (time == disasterOffDevices[j].datetime[k]) {
                                    Offdevice = disasterOffDevices[j].offdevices[k];
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
                for (var i in Offdevice) {
                    devicelabel += ' <br/>'+Offdevice[i] ;
                } 
                return time + '<br/>' + label +devicelabel;
            };
            tooltip.axisPointer = {
                type: 'none'
            };
            legend.orient = 'horizontal';
            legend.left = 'center';
            legend.bottom = '40';
            legend.data = lengendArr[index];

            grid.left = '5%';
            grid.right = '6%';
            grid.top = '12%';
            grid.bottom = '20%';
            grid.containLabel = true;
            
            yAxis.type = 'value';
            yAxis.splitLine = { show: true, lineStyle: { color: '#DCDCDC' } };
            yAxis.minInterval = 1;
            yAxis.axisLabel = {
                formatter: '{value} 台'
            };

            xAxis.type = 'category';
            xAxis.axisTick = {
                alignWithLabel: true
            };
            xAxis.data = datetime;
            series = seriesArr[index];
        } else {
            legend.data = lengendArr[index];
            series = seriesArr[index];
        }
        options.push({
            color: color,
            yAxis: yAxis,
            series: series,
            title: title,
            tooltip: tooltip,
            legend: legend,
            grid: grid,
            xAxis: xAxis,
        })
    };
    var option = {
        timeline: {
            data: Pages,
            axisType: 'category',
            realtime: true,
            label: {
                formatter: function (s) {
                    return s;
                }
            },
            symbolSize: 5,
            autoPlay: false,
            playInterval: 1000,
            tooltip: {
                formatter: function (s) {
                    return s.dataIndex + 1;
                }
            }
        },
        options: options,
    };
    myChart.hideLoading();
    if (datetime.length < 2) {
        myChart.dispose();
        myChart = echarts.init(document.getElementById('autodevicechartbydisaster'));
        option_pie && myChart.setOption(option_pie);
    }
    else {
        myChart.dispose();
        myChart = echarts.init(document.getElementById('autodevicechartbydisaster'));
        option && myChart.setOption(option);
    }
};
//连续多天离线设备统计
function DisplayProjectDeviceByOffline(myChart, deviceDatas) {
    var devicedata = [deviceDatas.GNSSDatas, deviceDatas.LFDatas, deviceDatas.QJDatas, deviceDatas.YLDatas, deviceDatas.RAINDatas, deviceDatas.SBWYDatas, deviceDatas.WATERDatas];
    var MonitorDeviceMaps = deviceDatas.MonitorDeviceMaps;
    var deviceDayCounts = [];
    var deviceNames = [];
    var offlineDays = [];
    //计算离线天数
    for (var i in devicedata) {
        for (var j in devicedata[i]) {
            var daycount = {};
            for (var k in MonitorDeviceMaps) {
                if (devicedata[i][j].Code == MonitorDeviceMaps[k].CODE) {
                    daycount.JCDBH = MonitorDeviceMaps[k].JCDBH;
                    daycount.Days = DateMinus(devicedata[i][j].GCSJ);
                    deviceDayCounts.push(daycount);
                    break;
                }
            }
        }
    }
    //排序
    for (var i = 0; i < deviceDayCounts.length; i++) {
        for (var j = 0; j < deviceDayCounts.length - i - 1; j++) {
            if (deviceDayCounts[j].Days < deviceDayCounts[j + 1].Days) {
                var tmp = deviceDayCounts[j];
                deviceDayCounts[j] = deviceDayCounts[j + 1];
                deviceDayCounts[j + 1] = tmp;
            }
        }
    }

    for (var i = 0; i < deviceDayCounts.length; i++) {
        if (deviceDayCounts[i].Days > 0) {
            deviceNames.push(deviceDayCounts[i].JCDBH);
            offlineDays.push(deviceDayCounts[i].Days);
        }
    }
    //连续多天离线设备统计（柱状图）
    function arrayChunk(array, size) {
        //分割数组
        let data = []
        for (let i = 0; i < array.length; i += size) {
            data.push(array.slice(i, i + size))
        }
        return data
    }
    var obj = {
        "data": deviceNames,
        "dataSource": offlineDays
    };
    //分页数字
    const Pages = [];
    var options = [];
    var xAxisArr = arrayChunk(obj.data, 15)
    var seriesArr = arrayChunk(obj.dataSource, 15)
    for (var j = 0; j < xAxisArr.length; j++) {
        Pages.push(j + 1);
    };
    for (var index = 0; index < Pages.length; index++) {
        let yAxis = {};
        let series = {};
        let title = {};
        let tooltip = {};
        let legend = {};
        let grid = {};
        let xAxis = {};
        let visualMap = {};
        if (index == 0) {
            title.text = "设备连续离线时长";
            title.textStyle = {
                color: '#4F4F4F',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: 15
            };
            title.left = 'center';

            tooltip.trigger = 'axis';
            tooltip.formatter = function (params) {
                var name = params[0].name;
                var label = params[0].marker + '连续离线' + ':' + params[0].value + '天<br/>';
                return name + '<br/>' + label;
            };
            tooltip.axisPointer = {
                type: 'none'
            };
            legend.orient = 'horizontal';
            legend.x = 'center';
            legend.y = 'bottom';
            visualMap.show = false;
            visualMap.min = seriesArr[index][seriesArr[index].length - 1];
            visualMap.max = seriesArr[index][0];
            visualMap.inRange = {
                color: ['#6B8E23', '#CD6839', '#CD6839']
            };
            grid.left = '5%';
            grid.right = '6%';
            grid.top = '12%';
            grid.bottom = '15%';
            grid.containLabel = true;

            //柱子纵向
            yAxis.type = 'value';
            yAxis.splitLine = { show: true, lineStyle: { color: '#DCDCDC' } };
            yAxis.minInterval = 1;
            yAxis.axisLabel = {
                formatter: '{value} 天'
            };

            xAxis.type = 'category';
            xAxis.axisLabel = {
                show: true,
                interval: 0,
                rotate: "45"
            };
            xAxis.axisTick = {
                alignWithLabel: true
            };
            xAxis.data = xAxisArr[index];


            series.data = seriesArr[index];
            series.type = "bar";
            series.barMaxWidth = '20';
            series.label = {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: function (series) {
                        var value = "";
                        if (series.value != 0) {
                            value = series.value;
                        }
                        return value;
                    },
                    textStyle: {
                        color:'',
                        fontSize: '10',
                    }
                }
            };

        } else {
            xAxis.data = xAxisArr[index]
            series.data = seriesArr[index]
        }
        options.push({
            yAxis: yAxis,
            series: series,
            title: title,
            tooltip: tooltip,
            legend: legend,
            grid: grid,
            xAxis: xAxis,
            visualMap: visualMap,
        })
    };
    var option = {
        timeline: {
            data: Pages,
            axisType: 'category',
            realtime: true,
            label: {
                formatter: function (s) {
                    return s;
                }
            },
            symbolSize: 5,
            autoPlay: false,
            playInterval: 1000,
            tooltip: {
                formatter: function (s) {
                    return s.dataIndex + 1;
                }
            }
        },
        options: options,
    };
    myChart.hideLoading();
    if (deviceNames.length >0) {
        myChart.dispose();
        myChart = echarts.init(document.getElementById('autodeviceschartbyoffdevice'));
        option && myChart.setOption(option);
    }
};

//展示监测设备详情
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
//格式化当前日期（YYYY-MM-DD）
function getNowFormateDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
};
//计算输入日期与当前日期间隔天数
function DateMinus(sDate) {
    var sdate = new Date(sDate.replace(/-/g, "/"));
    var now = new Date();
    var days = now.getTime() - sdate.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    return day;
}
//监测设备
function FuConstPhotoData(projectid) {
    var constPhotoTable = table.render({
        elem: '#const-device-manage'
        , id: 'constPhotoTableId'
        , title: '自动化监测设备信息'
        , page: true
        , even: true
        , limit: 10
        , initSort: { field: 'mointorStatus', type: 'desc' }
        , toolbar: false
        , totalRow: false
        , cols: [[
            { type: 'numbers', title: '序号', width: 123, fixed: 'left', align: "center" }
            , { field: 'JCDMC', title: '监测点名称', width: 180, align: "center" }
            , { field: 'JCDBH', title: '监测点编号', width: 180, align: "center" }
            , {
                field: 'mointorStatus', title: '施工进度', width: 220, align: "center", templet: function (row) {
                    if (row.mointorStatus == "0") {
                        return '<span style="color: red;">未开始</span>'
                    } else if (row.mointorStatus == "1") {
                        return '放样'
                    } else if (row.mointorStatus == "2") {
                        return '开挖'
                    } else if (row.mointorStatus == "3") {
                        return '浇筑'
                    } else if (row.mointorStatus == "4") {
                        return '安装'
                    }
                    //else if (row.mointorStatus == "5") {
                    //    return '调试'
                    //}
                    else if (row.mointorStatus == "5") {
                        return '<span style="color: green;">已完成</span>'
                    }

                    //得到当前行数据，并拼接成自定义模板

                }
            }
            , { field: 'yiXuan', title: '已选照片', width: 100, align: "center" }
            , { width: 120, align: 'center', toolbar: '#table-toolbar-const' }
            , { width: 120, align: 'center', toolbar: '#table-toolbar-const' }
        ]]
        , data: []
    });
    //渲染统计表格
    var constdeviceTongjitable = table.render({
        elem: '#constdeviceTongji'
        , id: 'constdeviceTongjiId'
        , title: '监测点监测数据统计信息'
        , page: false
        , skin: 'line'
        , even: false
        , size: 'sm'
        , totalRow: false
        , cols: [[
            { field: 'yifangyang', width: 120, title: '放样', align: "center" }
            , { field: 'yiWakeng', width: 120, title: '开挖', align: "center" }
            , { field: 'yiJiaozhu', width: 120, title: '浇筑', align: "center" }
            , { field: 'yiligan', width: 120, title: '安装', align: "center" }
            //, { field: 'yitiaoshi', width: 120, title: '调试', align: "center" }
            , { field: 'yiWancheng', width: 120, title: '完成', align: "center" }
            , { field: 'yiWancheng', width: 120, title: '', align: "center" }
        ]]
        , data: []
    });








    table.on('tool(const-device-manage)', function (obj) {
        var layEvent = obj.event;

        console.log(obj);
        console.log(datasurl);
        if (layEvent === 'photoview') {
            if (obj.data.photoList.length == 0) {
                layer.msg("该监测点还未开始放样", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                return;
            }
            if (constPhotolayerindex != null) {
                layer.msg("已打开照片片查看窗口", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                return;
            }
            constPhotolayerindex = layer.open({
                type: 1
                , title: [obj.data.JCDMC + '施工照片', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['800px', '600px']
                , shade: false
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: false
                , content: '<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">        <!--标签-->        <ul class="layui-tab-title">            <li class="layui-this" style="width:35px">放样</li>            <li style="width:35px">挖坑</li>            <li style="width:35px">浇筑</li>            <li style="width:35px">安装</li>          <li style="width:35px">完成</li>            <li style="width:35px">合格证</li><li style="width:35px">处理</li>         </ul>        <!--内容-->        <div class="layui-tab-content">            <div class="layui-tab-item layui-show">                <div class="layim-chat-main">                    <ul id="yiFangYang"></ul>                </div>            </div>            <div class="layui-tab-item">                <div class="layim-chat-main">                    <ul id="yiWaKeng"></ul>                </div>            </div>            <div class="layui-tab-item">                <div class="layim-chat-main">                    <ul id="yiJiaoZhu"></ul>                </div>            </div>            <div class="layui-tab-item">                <div class="layim-chat-main">                    <ul id="yiligan"></ul>                </div>            </div>              <div class="layui-tab-item">                <div class="layim-chat-main">                    <ul id="yiWanCheng"></ul>                </div>            </div>            <div class="layui-tab-item">                <div class="layim-chat-main">                    <ul id="qita"></ul>                </div>            </div><div class="layui-tab-item">                <div class="layim-chat-main">                    <form class="layui-form" style="margin-top:5px;margin-right:5px;" lay-filter="projectCheckedinfoform"> <div class="layui-form-item"><div class=" layui-form" id="checkUserId">     </div></div> <div class="layui-form-item">	<div class="layui-row">	<div class="layui-col-md6">	<div class="grid-demo">	<div class="layui-inline">	<label class="layui-form-label">安装人员</label>	<div class="layui-input-inline" style="width:180px;">	<input type="text" name="Installer" placeholder="请输入" autocomplete="off" class="layui-input" />	</div>	</div>	</div>	</div><div class="layui-col-md6">	<div class="grid-demo grid-demo-bg1">	<div class="layui-inline">	<label class="layui-form-label">安装时间</label>	<div class="layui-input-inline" style="width:180px;">	<input type="text" id="InstallTimeId"  name="InstallTime"  placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" />	</div>	</div>	</div>	</div>					</div>	</div><div class="layui-form-item">	<div class="layui-row">	<div class="layui-col-md6">	<div class="grid-demo">	<div class="layui-inline">	<label class="layui-form-label">填表人</label>	<div class="layui-input-inline" style="width:180px;">	<input type="text" name="preparer" placeholder="请输入" autocomplete="off" class="layui-input" />	</div>	</div>	</div>	</div><div class="layui-col-md6">	<div class="grid-demo grid-demo-bg1">	<div class="layui-inline">	<label class="layui-form-label">填表时间</label>	<div class="layui-input-inline" style="width:180px;">	<input type="text"  id="preparTimeId" name="preparTime"  placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" />	</div>	</div>	</div>	</div>					</div>	</div>		 <div class="layui-form-item" style="margin:25px 0px 25px 0px;"><div style="position:absolute;right:160px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="projectCheckedSubmit" style="width:80px">提交</button></div></div></form>                </div>            </div>        </div>    </div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    console.log(obj.data.photoList);
                    var photoinfots = {};
                    var photoList = obj.data.photoList;
                    for (var i in photoList) {
                        var photoname = "";
                        if (photoList[i].type == '1') {
                            document.getElementById("yiFangYang").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style="width: 160px; margin-top: 20px; height: 160px; margin-left: 10px" src="' + datasurl + photoList[i].smallPhoto + '" url="' + datasurl + photoList[i].photoUrl + '"  alt="放样' + (i) + '" ></img></li>';
                            photoinfots = photoList[i];//把安装这些记录放在放样里面。
                            photoname = "放样";
                        } else if (photoList[i].type == '2') {
                            document.getElementById("yiWaKeng").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style="width: 160px; margin-top: 20px; height: 160px; margin-left: 10px" src="' + datasurl + photoList[i].smallPhoto + '" url="' + datasurl + photoList[i].photoUrl + '"   alt="挖坑' + (i) + '"></img></li>';

                            photoname = "挖坑";
                        } else if (photoList[i].type == '3') {
                            document.getElementById("yiJiaoZhu").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style="width: 160px; margin-top: 20px; height: 160px; margin-left: 10px" src="' + datasurl + photoList[i].smallPhoto + '" url="' + datasurl + photoList[i].photoUrl + '"   alt="浇筑' + (i) + '"></img></li>';
                            photoname = "浇筑";
                        } else if (photoList[i].type == '4') {
                            document.getElementById("yiligan").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style="width: 160px; margin-top: 20px; height: 160px; margin-left: 10px" src="' + datasurl + photoList[i].smallPhoto + '" url="' + datasurl + photoList[i].photoUrl + '"   alt="安装' + (i) + '"></img></li>';
                            photoname = "安装";
                        }
                        //else if (photoList[i].type == '5') {

                        //    document.getElementById("yitiaoshi").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style="width: 160px; margin-top: 20px; height: 160px; margin-left: 10px" src="' + datasurl + photoList[i].smallPhoto + '" alt="调试' + (i) + '"></img></li>';
                        //    photoname = "调试";

                        //}
                        else if (photoList[i].type == '6') {
                            document.getElementById("yiWanCheng").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style="width: 160px; margin-top: 20px; height: 160px; margin-left: 10px" src="' + datasurl + photoList[i].smallPhoto + '" url="' + datasurl + photoList[i].photoUrl + '"   alt="完成' + (i) + '"></img></li>';
                            photoname = "完成";
                        } else if (photoList[i].type == '7') {
                            document.getElementById("qita").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style="width: 160px; margin-top: 20px; height: 160px; margin-left: 10px" src="' + datasurl + photoList[i].smallPhoto + '" url="' + datasurl + photoList[i].photoUrl + '"   alt="合格证' + (i) + '"></img></li>';
                            photoname = "合格证";
                        }

                        if ((parseInt(i) + 1) % 4 == 0) {
                            if (photoList[i].flagReport == "1") {
                                document.getElementById("checkUserId").innerHTML += '<img  style="width: 80px;height: 80px;margin-left: 15px; " src="' + datasurl + photoList[i].smallPhoto + '" ></img><input style="margin-top: 10px; " type="checkbox" name="' + photoList[i].id + '"title="' + photoname + '" checked=""><hr>'
                            } else {
                                document.getElementById("checkUserId").innerHTML += '<img  style="width: 80px;height: 80px;margin-left: 15px; " src="' + datasurl + photoList[i].smallPhoto + '" ></img><input style="margin-top: 10px; " type="checkbox" name="' + photoList[i].id + '"title="' + photoname + '" ><hr>'
                            }

                        } else {
                            if (photoList[i].flagReport == "1") {
                                document.getElementById("checkUserId").innerHTML += '<img  style="width: 80px;height: 80px;margin-left: 15px;  " src="' + datasurl + photoList[i].smallPhoto + '" ></img><input style="margin-top: 10px; " type="checkbox" name="' + photoList[i].id + '"title="' + photoname + '" checked="" >'
                            } else {
                                document.getElementById("checkUserId").innerHTML += '<img  style="width: 80px;height: 80px;margin-left: 15px;  " src="' + datasurl + photoList[i].smallPhoto + '" ></img><input style="margin-top: 10px; " type="checkbox" name="' + photoList[i].id + '"title="' + photoname + '" >'
                            }


                        }

                    }
                    document.getElementById("checkUserId").innerHTML += '<hr>'

                    if (viewerPhoto != null) {
                        viewerPhoto.destroy();
                    }
                    viewerPhoto = new Viewer(document.getElementById('yiFangYang'), {
                        toolbar: true, //显示工具条
                        viewed() {
                            viewerPhoto.zoomTo(0.75); // 图片显示比例 75%
                        },
                        zIndex: 99999999,
                        navbar: false,
                        show: function () {  // 动态加载图片后，更新实例
                            viewerPhoto.update();
                        },
                        url: 'url'
                    });
                    viewerPhoto = new Viewer(document.getElementById('yiWaKeng'), {
                        toolbar: true, //显示工具条
                        viewed() {
                            viewerPhoto.zoomTo(0.75); // 图片显示比例 75%
                        },
                        zIndex: 99999999,
                        navbar: false,
                        show: function () {  // 动态加载图片后，更新实例
                            viewerPhoto.update();
                        },
                        url: 'url'
                    });
                    viewerPhoto = new Viewer(document.getElementById('yiJiaoZhu'), {
                        toolbar: true, //显示工具条
                        viewed() {
                            viewerPhoto.zoomTo(0.75); // 图片显示比例 75%
                        },
                        zIndex: 99999999,
                        navbar: false,
                        show: function () {  // 动态加载图片后，更新实例
                            viewerPhoto.update();
                        },
                        url: 'url'
                    });
                    viewerPhoto = new Viewer(document.getElementById('yiWanCheng'), {
                        toolbar: true, //显示工具条
                        viewed() {
                            viewerPhoto.zoomTo(0.75); // 图片显示比例 75%
                        },
                        zIndex: 99999999,
                        navbar: false,
                        show: function () {  // 动态加载图片后，更新实例
                            viewerPhoto.update();
                        },
                        url: 'url'
                    });
                    viewerPhoto = new Viewer(document.getElementById('yiligan'), {
                        toolbar: true, //显示工具条
                        viewed() {
                            viewerPhoto.zoomTo(0.75); // 图片显示比例 75%
                        },
                        zIndex: 99999999,
                        navbar: false,
                        show: function () {  // 动态加载图片后，更新实例
                            viewerPhoto.update();
                        },
                        url: 'url'
                    });
                    //viewerPhoto = new Viewer(document.getElementById('yitiaoshi'), {
                    //    toolbar: true, //显示工具条
                    //    viewed() {
                    //        viewerPhoto.zoomTo(0.75); // 图片显示比例 75%
                    //    },
                    //    zIndex: 99999999,
                    //    navbar: false,
                    //    show: function () {  // 动态加载图片后，更新实例
                    //        viewerPhoto.update();
                    //    },
                    //});
                    viewerPhoto = new Viewer(document.getElementById('qita'), {
                        toolbar: true, //显示工具条
                        viewed() {
                            viewerPhoto.zoomTo(0.75); // 图片显示比例 75%
                        },
                        zIndex: 99999999,
                        navbar: false,
                        show: function () {  // 动态加载图片后，更新实例
                            viewerPhoto.update();
                        },
                        url: 'url'
                    });
                    form.render('checkbox');
                    form.val("projectCheckedinfoform", {
                        "Installer": photoinfots.Installer
                        , "preparer": photoinfots.preparer
                        , "InstallTime": photoinfots.InstallTime
                        , "preparTime": photoinfots.preparlTime

                    });



                    //渲染开始时间
                    date.render({
                        elem: '#InstallTimeId',
                    });
                    //渲染开始时间
                    date.render({
                        elem: '#preparTimeId',
                    });

                    form.render();
                    form.render('select');
                    //提交
                    form.on('submit(projectCheckedSubmit)', function (data) {

                        console.log(data);
                        var dataas = {};
                        dataas.cookie = document.cookie;
                        var chenkList = getObjectKeys(data.field);
                        if (chenkList.length == 0) {
                            layer.msg('请选照片', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            return false;
                        }
                        if (chenkList.length > 8) {
                            layer.msg('成图照片超过8张', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            return false;
                        }
                        //key == "InstallTime" || key == "Installer" || key == "preparTime" || key == "preparer"
                        if (data.field.InstallTime == "") {
                            layer.msg('请选择安装时间', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            return false;
                        }
                        if (data.field.Installer == "") {
                            layer.msg('请输入安装人员', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            return false;
                        }
                        if (data.field.preparTime == "") {
                            layer.msg('请输入填表时间', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            return false;
                        }
                        if (data.field.preparer == "") {
                            layer.msg('请输入填表人员', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            return false;
                        }
                        var temps = '';
                        for (var j in chenkList) {
                            if (j != (chenkList.length - 1)) {
                                temps = temps + chenkList[j] + '∮';
                            } else {
                                temps = temps + chenkList[j];
                            }
                        }
                        dataas.InstallTime = data.field.InstallTime;
                        dataas.Installer = data.field.Installer;
                        dataas.preparTime = data.field.preparTime;
                        dataas.preparer = data.field.preparer;
                        dataas.monitorId = obj.data.Id;
                        dataas.constPhotoIdList = temps;

                        console.log(dataas);
                        var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                        $.ajax({
                            url: servicesurl + "/api/PatrolEquipment/UpdateConstPhotoInfo", type: "post", data: dataas,
                            success: function (result) {
                                layer.close(loadinglayerindex);
                                if (result == "选择成功") {

                                    layer.msg("修改成功。", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    FuConstPhotoData(projectid);
                                }
                                else {
                                    //创建失败
                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                    //关闭
                                    // layer.close(projectuserlayerindex);

                                    //刷新项目列表
                                    // GetUserProjects();
                                }
                            }, datatype: "json"
                        });

                        return false;
                    });
                }
                , end: function () {
                    viewerPhoto = null;
                    constPhotolayerindex = null;
                }
            });

        } else if (layEvent === 'photoDown') {
            //if (obj.data.mointorStatus != 6) {
            //    layer.msg("该监测点未安装完成", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            //    return;
            //}

            // data.field.patrolStatus = "1";//这里已处理的
            var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

            $.ajax({
                url: servicesurl + "/api/FlzWordWxpert/GetShiGongJiLuBiao", type: "get", data: { "id": projectid, "cookie": document.cookie },
                success: function (result) {
                    layer.close(loadingminindex);
                    console.log(result);
                    window.location.href = 'http://www.cq107chy.com:4022/SurImage/Download/' + result;
                },
                error: function (res) {
                    layer.close(loadingminindex);
                    console.log(res);
                    layer.msg(res.responseJSON.ExceptionMessage, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                }, datatype: "json"
            });
        }
    });
    var MonitorStringList = [];
    var loadingceindex12 = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
    var yifangyang = 0;
    var yiWakeng = 0;
    var yiJiaozhu = 0;
    var yiligan = 0;
    var yitiaoshi = 0;
    var yiWancheng = 0;
    $.ajax({
        url: servicesurl + "/api/Monitor/GetMonitor", type: "get", data: { "id": projectid, "cookie": document.cookie },
        success: function (data1) {
            var monitorinfos = JSON.parse(data1);
            $.ajax({
                url: window.parent.servicesurl + "/api/PatrolEquipment/getConstPhotoInfo", type: "get", data: { 'projectId': projectid, 'monitorId': "" },
                success: function (data) {
                    layer.close(loadingceindex12);
                    var constPhotodata = JSON.parse(data);
                    console.log(constPhotodata);
                    for (var i in monitorinfos) {
                        var MonitorString = monitorinfos[i].MonitorString;
                        var photoList = [];
                        var yiXuan = 0;
                        var mointorStatus = 0;
                        for (var j in constPhotodata) {
                            if (MonitorString.Id == constPhotodata[j].monitorId) {

                                photoList.push(constPhotodata[j]);
                                if (constPhotodata[j].flagReport == "1") {
                                    yiXuan++;
                                }
                                if (constPhotodata[j].type == '1' && mointorStatus < 1) {
                                    mointorStatus = 1;
                                }
                                if (constPhotodata[j].type == '2' && mointorStatus < 2) {
                                    mointorStatus = 2;
                                }
                                if (constPhotodata[j].type == '3' && mointorStatus < 3) {
                                    mointorStatus = 3;
                                }
                                if (constPhotodata[j].type == '4' && mointorStatus < 4) {
                                    mointorStatus = 4;
                                }
                                //if (constPhotodata[j].type == '5' && mointorStatus < 5) {
                                //    mointorStatus = 5;
                                //}
                                if (constPhotodata[j].type == '6' && mointorStatus < 5) {
                                    mointorStatus = 5;
                                }
                            }
                        }
                        MonitorString.photoList = photoList;
                        MonitorString.yiXuan = yiXuan;
                        MonitorString.mointorStatus = mointorStatus;
                        if (mointorStatus > 0) {
                            yifangyang++;
                        }
                        if (mointorStatus > 1) {
                            yiWakeng++;
                        }
                        if (mointorStatus > 2) {
                            yiJiaozhu++;
                        }
                        if (mointorStatus > 3) {
                            yiligan++;
                        }
                        //if (mointorStatus > 4) {
                        //    yitiaoshi++;
                        //}
                        if (mointorStatus > 4) {
                            yiWancheng++;
                        }

                        MonitorStringList.push(MonitorString);
                    }

                    MonitorStringList.sort(function (a, b) { return b.mointorStatus - a.mointorStatus; });
                    constPhotoTable.reload({ id: 'constPhotoTableId', data: MonitorStringList });
                    var tempList = [];

                    tempList.push({ "yifangyang": yifangyang, "yiWakeng": yiWakeng, "yiJiaozhu": yiJiaozhu, "yiligan": yiligan, "yiWancheng": yiWancheng });
                    tempList.push({ "yifangyang": toPercent(yifangyang / MonitorStringList.length), "yiWakeng": toPercent(yiWakeng / MonitorStringList.length), "yiJiaozhu": toPercent(yiJiaozhu / MonitorStringList.length), "yiligan": toPercent(yiligan / MonitorStringList.length), "yiWancheng": toPercent(yiWancheng / MonitorStringList.length) });


                    constdeviceTongjitable.reload({ id: 'constdeviceTongjiId', data: tempList });
                }, datatype: "json"
            });



        }, datatype: "json"
    });

    function GetDeviceInfo() {
        $.ajax({
            url: window.parent.servicesurl + "/api/Device/GetDeviceInfo", type: "get",
            success: function (data) {
                if (data == "") {
                    layer.msg("无自动化监测设备信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    constPhotoTable.reload({ id: 'constPhotoTableId', data: [] });
                }
                else {
                    var deviceinfos = JSON.parse(data);
                    devicedatas = [];
                    for (var i in deviceinfos) {
                        var devicedata = new Object;
                        devicedata.id = deviceinfos[i].Id;
                        devicedata.code = deviceinfos[i].Code;
                        devicedata.sbmc = deviceinfos[i].SBMC;
                        devicedata.sbbh = deviceinfos[i].SBBH;
                        devicedata.sbxh = deviceinfos[i].SBXH;
                        devicedata.sblx = deviceinfos[i].SBLX;
                        devicedata.gdfs = deviceinfos[i].GDFS;
                        devicedata.cjsj = deviceinfos[i].CJSJ;
                        devicedata.bsm = deviceinfos[i].BSM;
                        devicedata.bz = deviceinfos[i].BZ;

                        devicedatas.push(devicedata);
                    }
                    // constPhotoTable.reload({ id: 'constPhotoTableId', data: devicedatas });
                }
            }, datatype: "json"
        });
    }
}
//临时道路
function FuRoadPhotoData(projectid) {
    var roadPhotoTable = table.render({
        elem: '#road-device-manage'
        , id: 'roadPhotoTableId'
        , title: '临时道路信息'
        , page: true
        , even: true
        , limit: 10
        , initSort: { field: 'mointorStatus', type: 'desc' }
        , toolbar: false
        , totalRow: false
        , cols: [[
            { type: 'numbers', title: '序号', width: 123, fixed: 'left', align: "center" }
            , { field: 'name', title: '道路名称', width: 200, align: "center" }
            , { field: 'roadLength', title: '道路长度', width: 180, align: "center" }
            , { field: 'patrolTime', title: '开路时间', width: 150, align: "center", }
            , { field: 'roadRec', title: '道路备注', width: 150, align: "center", }
            , { width: 120, align: 'center', toolbar: '#table-toolbar-road' }
            , { width: 120, align: 'center', toolbar: '#table-toolbar-road' }
        ]]
        , data: []
    });


    table.on('tool(road-device-manage)', function (obj) {
        var layEvent = obj.event;

        console.log(obj);
        console.log(datasurl);
        if (layEvent === 'photoview') {

            adddevicelayerindex = layer.open({
                type: 1
                , title: [obj.data.name + '照片', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['700px', '500px']
                , shade: [0.5, '#393D49']
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: false
                , content: '<form class="layui-form" style="margin-top:10px" lay-filter="roadPhotoform">    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">  <ul id="yiFangYang"></ul>       </div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    var urlList = obj.data.photoUrl.split(",");
                    for (var i in urlList) {
                        document.getElementById("yiFangYang").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style="width: 160px; margin-top: 20px; height: 160px; margin-left: 10px" src="' + datasurl + urlList[i] + '" alt="临时道路' + (i) + '" ></img></li>';
                    }
                    if (viewerPhoto != null) {
                        viewerPhoto.destroy();
                    }
                    viewerPhoto = new Viewer(document.getElementById('yiFangYang'), {
                        toolbar: true, //显示工具条
                        viewed() {
                            viewerPhoto.zoomTo(0.75); // 图片显示比例 75%
                        },
                        zIndex: 99999999,
                        navbar: false,
                        show: function () {  // 动态加载图片后，更新实例
                            viewerPhoto.update();
                        },
                    });

                }
                , end: function () {
                    viewerPhoto = null;
                }
            });

        } else if (layEvent === 'photoDown') {
            if (obj.data.mointorStatus != 6) {
                layer.msg("该监测点未安装完成", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                return;
            }

            // data.field.patrolStatus = "1";//这里已处理的
            var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

            $.ajax({
                url: servicesurl + "/api/FlzWordWxpert/GetShiGongJiLuBiao", type: "get", data: { "id": obj.data.Id, "cookie": document.cookie },
                success: function (result) {
                    layer.close(loadingminindex);
                    console.log(result);
                    //window.location.href = 'http://www.cq107chy.com:4022/SurImage/Download/' + result;
                },
                error: function (res) {
                    layer.close(loadingminindex);
                    console.log(res);
                    layer.msg(res.responseJSON.ExceptionMessage, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                }, datatype: "json"
            });
        }
    });

    var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

    $.ajax({
        url: servicesurl + "/api/PatrolEquipment/getRoadPhotoInfo", type: "get", data: { "projectId": projectid, "type": 1 },
        success: function (data1) {
            layer.close(loadingceindex);
            if (data1 != "") {
                var monitorinfos = JSON.parse(data1);
                console.log(monitorinfos);
                roadPhotoTable.reload({ id: 'roadPhotoTableId', data: monitorinfos });
            } else {
                roadPhotoTable.reload({ id: 'roadPhotoTableId', data: [] });
            }


        }, datatype: "json"
    });


}
//设备到场
function FuArrivalPhotoData(projectid) {
    var roadArrivalPhotoTable = table.render({
        elem: '#road-arrival-manage'
        , id: 'roadArrivalPhotoTableId'
        , title: '设备到场信息'
        , page: true
        , even: true
        , limit: 10
        , initSort: { field: 'mointorStatus', type: 'desc' }
        , toolbar: false
        , totalRow: false
        , cols: [[
            { type: 'numbers', title: '序号', width: 123, fixed: 'left', align: "center" }
            , { field: 'projectName', title: '项目名称', width: 200, align: "center" }
            , { field: 'roadLength', title: '设备数量', width: 180, align: "center" }
            , { field: 'patrolTime', title: '到场时间', width: 150, align: "center", }
            , { field: 'roadRec', title: '设备说明', width: 150, align: "center", }
            , { width: 120, align: 'center', toolbar: '#table-toolbar-road' }
            , { width: 120, align: 'center', toolbar: '#table-toolbar-road' }
        ]]
        , data: []
    });


    table.on('tool(road-arrival-manage)', function (obj) {
        var layEvent = obj.event;

        console.log(obj);
        console.log(datasurl);
        if (layEvent === 'photoview') {

            addarrivallayerindex = layer.open({
                type: 1
                , title: ['设备照片', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['700px', '500px']
                , shade: [0.5, '#393D49']
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: false
                , content: '<form class="layui-form" style="margin-top:10px" lay-filter="roadPhotoform">    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">  <ul id="yiFangYang"></ul>       </div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    var urlList = obj.data.photoUrl.split(",");
                    for (var i in urlList) {
                        document.getElementById("yiFangYang").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style="width: 160px; margin-top: 20px; height: 160px; margin-left: 10px" src="' + datasurl + urlList[i] + '" alt="临时道路' + (i) + '" ></img></li>';
                    }
                    if (viewerPhoto != null) {
                        viewerPhoto.destroy();
                    }
                    viewerPhoto = new Viewer(document.getElementById('yiFangYang'), {
                        toolbar: true, //显示工具条
                        viewed() {
                            viewerPhoto.zoomTo(0.75); // 图片显示比例 75%
                        },
                        zIndex: 99999999,
                        navbar: false,
                        show: function () {  // 动态加载图片后，更新实例
                            viewerPhoto.update();
                        },
                    });

                }
                , end: function () {
                    viewerPhoto = null;
                }
            });

        } else if (layEvent === 'photoDown') {
            if (obj.data.mointorStatus != 6) {
                layer.msg("该监测点未安装完成", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                return;
            }

            // data.field.patrolStatus = "1";//这里已处理的
            var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

            $.ajax({
                url: servicesurl + "/api/FlzWordWxpert/GetShiGongJiLuBiao", type: "get", data: { "id": obj.data.Id, "cookie": document.cookie },
                success: function (result) {
                    layer.close(loadingminindex);
                    console.log(result);
                    //window.location.href = 'http://www.cq107chy.com:4022/SurImage/Download/' + result;
                },
                error: function (res) {
                    layer.close(loadingminindex);
                    console.log(res);
                    layer.msg(res.responseJSON.ExceptionMessage, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                }, datatype: "json"
            });
        }
    });

    var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

    $.ajax({
        url: servicesurl + "/api/PatrolEquipment/getRoadPhotoInfo", type: "get", data: { "projectId": projectid, "type": 3 },
        success: function (data1) {
            layer.close(loadingceindex);
            if (data1 != "") {
                var monitorinfos = JSON.parse(data1);
                console.log(monitorinfos);
                roadArrivalPhotoTable.reload({ id: 'roadArrivalPhotoTableId', data: monitorinfos });
            } else {
                roadArrivalPhotoTable.reload({ id: 'roadArrivalPhotoTableId', data: [] });
            }


        }, datatype: "json"
    });


}
//二次搬运
function FuErCiPhotoData(projectid) {
    var roadErCiPhotoTable = table.render({
        elem: '#road-carry-manage'
        , id: 'roadErCiPhotoTableId'
        , title: '二次搬运信息'
        , page: true
        , even: true
        , limit: 10
        , initSort: false
        , toolbar: false
        , totalRow: false
        , cols: [[
            { type: 'numbers', title: '序号', width: 123, fixed: 'left', align: "center" }
            , { field: 'projectName', title: '项目名称', width: 200, align: "center" }
            , { field: 'monitorId', title: '危岩单体', width: 150, align: "center" }
            , { field: 'roadLength', title: '搬运距离', width: 80, align: "center" }
            , { field: 'patrolTime', title: '搬运时间', width: 100, align: "center", }
            , { field: 'roadRec', title: '说明', width: 150, align: "center", }
            , { width: 120, align: 'center', toolbar: '#table-toolbar-road' }
            , { width: 120, align: 'center', toolbar: '#table-toolbar-road' }
        ]]
        , data: []
    });


    table.on('tool(road-carry-manage)', function (obj) {
        var layEvent = obj.event;

        console.log(obj);
        console.log(datasurl);
        if (layEvent === 'photoview') {

            addercilayerindex = layer.open({
                type: 1
                , title: ['搬运照片', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['700px', '500px']
                , shade: [0.5, '#393D49']
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: false
                , content: '<form class="layui-form" style="margin-top:10px" lay-filter="roadPhotoform">    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">  <ul id="yiFangYang"></ul>       </div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    var urlList = obj.data.photoUrl.split(",");
                    for (var i in urlList) {
                        document.getElementById("yiFangYang").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style="width: 160px; margin-top: 20px; height: 160px; margin-left: 10px" src="' + datasurl + urlList[i] + '" alt="二次搬运' + (i) + '" ></img></li>';
                    }
                    if (viewerPhoto != null) {
                        viewerPhoto.destroy();
                    }
                    viewerPhoto = new Viewer(document.getElementById('yiFangYang'), {
                        toolbar: true, //显示工具条
                        viewed() {
                            viewerPhoto.zoomTo(0.75); // 图片显示比例 75%
                        },
                        zIndex: 99999999,
                        navbar: false,
                        show: function () {  // 动态加载图片后，更新实例
                            viewerPhoto.update();
                        },
                    });

                }
                , end: function () {
                    viewerPhoto = null;
                }
            });

        }
    });

    var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

    $.ajax({
        url: servicesurl + "/api/PatrolEquipment/getRoadPhotoInfo", type: "get", data: { "projectId": projectid, "type": 2 },
        success: function (data1) {
            layer.close(loadingceindex);
            if (data1 != "") {
                var monitorinfos = JSON.parse(data1);
                console.log(monitorinfos);
                roadErCiPhotoTable.reload({ id: 'roadErCiPhotoTableId', data: monitorinfos });
            } else {
                roadErCiPhotoTable.reload({ id: 'roadErCiPhotoTableId', data: [] });
            }


        }, datatype: "json"
    });


}

//项目检查
function FujianchaPhotoData(projectid) {
    var roadjianchaPhotoTable = table.render({
        elem: '#road-jiancha-manage'
        , id: 'roadjianchaPhotoTableId'
        , title: '项目检查信息'
        , page: true
        , even: true
        , limit: 10
        , initSort: false
        , toolbar: false
        , totalRow: false
        , cols: [[
            { type: 'numbers', title: '序号', width: 123, fixed: 'left', align: "center" }
            , { field: 'projectName', title: '项目名称', width: 200, align: "center" }
            , { field: 'patrolTime', title: '检查时间', width: 100, align: "center", }
            , { field: 'roadRec', title: '说明', width: 150, align: "center", }
            , { width: 120, align: 'center', toolbar: '#table-toolbar-road' }
            , { width: 120, align: 'center', toolbar: '#table-toolbar-road' }
        ]]
        , data: []
    });


    table.on('tool(road-jiancha-manage)', function (obj) {
        var layEvent = obj.event;

        console.log(obj);
        console.log(datasurl);
        if (layEvent === 'photoview') {

            addercilayerindex = layer.open({
                type: 1
                , title: ['检查照片', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['700px', '500px']
                , shade: [0.5, '#393D49']
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: false
                , content: '<form class="layui-form" style="margin-top:10px" lay-filter="roadPhotoform">    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">  <ul id="yiFangYang"></ul>       </div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    var urlList = obj.data.photoUrl.split(",");
                    for (var i in urlList) {
                        document.getElementById("yiFangYang").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style="width: 160px; margin-top: 20px; height: 160px; margin-left: 10px" src="' + datasurl + urlList[i] + '" alt="二次搬运' + (i) + '" ></img></li>';
                    }
                    if (viewerPhoto != null) {
                        viewerPhoto.destroy();
                    }
                    viewerPhoto = new Viewer(document.getElementById('yiFangYang'), {
                        toolbar: true, //显示工具条
                        viewed() {
                            viewerPhoto.zoomTo(0.75); // 图片显示比例 75%
                        },
                        zIndex: 99999999,
                        navbar: false,
                        show: function () {  // 动态加载图片后，更新实例
                            viewerPhoto.update();
                        },
                    });

                }
                , end: function () {
                    viewerPhoto = null;
                }
            });

        }
    });

    var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

    $.ajax({
        url: servicesurl + "/api/PatrolEquipment/getRoadPhotoInfo", type: "get", data: { "projectId": projectid, "type": 4 },
        success: function (data1) {
            layer.close(loadingceindex);
            if (data1 != "") {
                var monitorinfos = JSON.parse(data1);
                console.log(monitorinfos);
                roadjianchaPhotoTable.reload({ id: 'roadjianchaPhotoTableId', data: monitorinfos });
            } else {
                roadjianchaPhotoTable.reload({ id: 'roadjianchaPhotoTableId', data: [] });
            }


        }, datatype: "json"
    });


}
function getObjectKeys(object) {
    var keys = [];
    for (var key in object) {
        if (key == "InstallTime" || key == "Installer" || key == "preparTime" || key == "preparer") {
            continue;
        }
        keys.push(key);
    }
    return keys;
}