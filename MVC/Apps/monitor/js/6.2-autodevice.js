var projectdevicechartcount = null;
var projectdevicechartdisaster = null;
var projectdevicecharttype = null;
var monitordevicechart = null;

var currentdevicemonitor = null;//当前设备
var laytpl = layui.laytpl;
var viewerPhoto = null;
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
                , content: '<!--设备管理--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin-top:0px">    <ul class="layui-tab-title">        <li class="layui-this" style="width:10%;padding-top: 10px;">概况</li>        <li style="width:10%;padding-top: 10px;">详情</li>        <li style="width:10%;padding-top: 10px;">设备安装进度</li>        <li style="width:10%;padding-top: 10px;">临时道路</li>        <li style="width:10%;padding-top: 10px;">设备到场</li>        <li style="width:10%;padding-top: 10px;">二次搬运</li>        <li style="width:10%;padding-top: 10px;">项目检查</li>    </ul>    <div class="layui-tab-content">        <!--概况-->        <div class="layui-tab-item layui-show">            <form class="layui-form" lay-filter="autodevicesform" style="margin-top:5px;">                <div class="layui-row">                    <div class="layui-col-xs6">                        <div class="grid-demo grid-demo-bg1">                            <div class="layui-form-item">                                <div class="layui-input-block" style="margin-left:10px;">                                    <select id="autodevicespretimeid" name="autodevicespretime" lay-filter="autodevicespretimefilter" style="visibility:visible;"></select>                                </div>                            </div>                        </div>                    </div>                    <div class="layui-col-xs6">                        <div class="grid-demo">                            <div class="layui-form-item">                                <div class="layui-input-block" style="margin-left:10px;margin-right:10px;">                                    <input id="autodevicescustomtimeid" name="autodevicescustomtime" type="text" class="layui-input" placeholder="开始时间 — 结束时间" style="visibility:visible;">                                </div>                            </div>                        </div>                    </div>                </div>            </form>            <div class="layui-row">                <div class="layui-col-xs6">                    <div class="grid-demo grid-demo-bg1">                        1                    </div>                </div>                <div class="layui-col-xs6">                    <div class="grid-demo">                        <!--设备数量-->                        <div id="autodevicechartbynum" class="layui-tab-item layui-show" style="width:350px;height:300px"></div>                    </div>                </div>            </div>            <div class="layui-row">                <div class="layui-col-xs6">                    <div class="grid-demo grid-demo-bg1">                        <!--按灾害体-->                        <div id="autodevicechartbydisaster" class="layui-tab-item layui-show" style="width:350px;height:300px"></div>                    </div>                </div>                <div class="layui-col-xs6">                    <div class="grid-demo">                        <!--按设备类型-->                        <div id="autodevicechartbytype" class="layui-tab-item layui-show" style="width:350px;height:300px"></div>                    </div>                </div>            </div>        </div>        <!--详情-->        <div class="layui-tab-item">            <div class="layui-row">                <!--左侧-->                <div class="layui-col-md3" style="width:20%;height:500px;overflow: auto;">                    <div id="device-monitor-tree" class="grid-demo"></div>                </div>                <!--右侧-->                <div class="layui-col-md9" style="width:80%;height:300px;border-left:solid;border-color:#e6e6e6;border-left-width:0px;">                    <div class="grid-demo grid-demo-bg1">                        <!--工具栏-->                        <form class="layui-form" lay-filter="autodeviceform" style="margin-top:5px;">                            <div class="layui-row">                                <div class="layui-col-xs6">                                    <div class="grid-demo grid-demo-bg1">                                        <div class="layui-form-item">                                            <div class="layui-input-block" style="margin-left:10px;">                                                <select id="autodevicepretimeid" name="autodevicepretime" lay-filter="autodevicepretimefilter" style="visibility:visible;"></select>                                            </div>                                        </div>                                    </div>                                </div>                                <div class="layui-col-xs6">                                    <div class="grid-demo">                                        <div class="layui-form-item">                                            <div class="layui-input-block" style="margin-left:10px;margin-right:10px;">                                                <input id="autodevicecustomtimeid" name="autodevicecustomtime" type="text" class="layui-input" placeholder="开始时间 — 结束时间" style="visibility:visible;">                                            </div>                                        </div>                                    </div>                                </div>                            </div>                        </form>                        <!--采集数量柱状图-->                        <div id="autodevicechart" class="layui-tab-item layui-show" style="width:780px;height:600px"></div>                        <!--设备采集率-->                        <div style="padding-left:50px;padding-right:10px;padding-top:20px;">                            <div class="layui-progress layui-progress" lay-showpercent="true" lay-filter="devicerate">                                <div class="layui-progress-bar layui-bg-green" lay-percent="0%"></div>                            </div>                        </div>                    </div>                </div>            </div>        </div>        <!--施工管理-->        <div class="layui-tab-item">            <!--施工设备管理-->            <div class="layui-fluid">                <div class="layui-card">                    <div class="layui-card-body">                        <table id="const-device-manage" lay-filter="const-device-manage"></table>                        <script type="text/html" id="table-toolbar-const">                            <a class="layui-btn layui-btn layui-btn-xs" lay-event="photoview">查看</a>                            <a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="photoDown">下载</a>                        </script>                        <!--统计表格-->                        <div id="autodatastatisticsdiv" style="margin-left:250px;margin-right:250px;margin-top:20px">                            <table id="constdeviceTongji" class="layui-hide"></table>                        </div>                    </div>                </div>            </div>        </div>        <div class="layui-tab-item">            <!--临时道路-->            <div class="layui-fluid">                <div class="layui-card">                    <div class="layui-card-body">                        <table id="road-device-manage" lay-filter="road-device-manage"></table>                        <script type="text/html" id="table-toolbar-road">                            <a class="layui-btn layui-btn layui-btn-xs" lay-event="photoview">查看</a>                        </script>                    </div>                </div>            </div>        </div>        <div class="layui-tab-item">            <!--设备到场-->            <div class="layui-fluid">                <div class="layui-card">                    <div class="layui-card-body">                        <table id="road-arrival-manage" lay-filter="road-arrival-manage"></table>                        <script type="text/html" id="table-toolbar-road">                            <a class="layui-btn layui-btn layui-btn-xs" lay-event="photoview">查看</a>                        </script>                    </div>                </div>            </div>        </div>        <div class="layui-tab-item">            <!--材料二次搬运-->            <div class="layui-fluid">                <div class="layui-card">                    <div class="layui-card-body">                        <table id="road-carry-manage" lay-filter="road-carry-manage"></table>                        <script type="text/html" id="table-toolbar-road">                            <a class="layui-btn layui-btn layui-btn-xs" lay-event="photoview">查看</a>                        </script>                    </div>                </div>            </div>        </div>        <div class="layui-tab-item">            <!--项目检查-->            <div class="layui-fluid">                <div class="layui-card">                    <div class="layui-card-body">                        <table id="road-jiancha-manage" lay-filter="road-jiancha-manage"></table>                        <script type="text/html" id="table-toolbar-road">                            <a class="layui-btn layui-btn layui-btn-xs" lay-event="photoview">查看</a>                        </script>                    </div>                </div>            </div>        </div>    </div></div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    elem.init();
                    elem.render('progress');
                    //展示项目设备总览
                    DisplayProjectDevices();
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
            , { field: 'JCDMC', title: '监测点名称', width: 280, align: "center" }
            , { field: 'JCDBH', title: '监测点编号', width: 180, align: "center" }
            , {
                field: 'mointorStatus', title: '施工进度', width: 220, align: "center", templet: function (row) {
                    if (row.mointorStatus == "0") {
                        return '<span style="color: red;">未开始</span>'
                    } else if(row.mointorStatus == "1") {
                        return '放样'
                    } else if (row.mointorStatus == "2") {
                        return '挖坑'
                    } else if (row.mointorStatus == "3") {
                        return '浇筑'
                    } else if (row.mointorStatus == "4") {
                        return '立杆'
                    } else if (row.mointorStatus == "5") {
                        return '调试'
                    } else if (row.mointorStatus == "6") {
                        return '<span style="color: green;">已完成</span>'
                    }

                    //得到当前行数据，并拼接成自定义模板

                } }
         
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
            { field: 'name', width: 120,  title: '工序', align: "center" }
            , { field: 'num', width: 150, title: '完成量', align: "center" }
            , { field: 'bili', width: 150, title: '进度', align: "center" }
            , { field: 'bili', width: 150, title: '进度', align: "center" }
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
            adddevicelayerindex = layer.open({
                type: 1
                , title: [obj.data.JCDMC + '施工照片', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['700px', '500px']
                , shade: [0.5, '#393D49']
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: false
                , content: '<form class="layui-form" style="margin-top:10px" lay-filter="constPhotoform">    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">        <!--标签-->        <ul class="layui-tab-title">            <li class="layui-this" style="width:50px">放样</li>            <li style="width:50px">挖坑</li>            <li style="width:50px">浇筑</li>            <li style="width:50px">立杆</li>            <li style="width:50px">调试</li>            <li style="width:50px">完成</li>            <li style="width:50px">其他</li>        </ul>        <!--内容-->        <div class="layui-tab-content">            <div class="layui-tab-item layui-show">                <div class="layim-chat-main">                    <ul id="yiFangYang"></ul>                </div>            </div>            <div class="layui-tab-item">                <div class="layim-chat-main">                    <ul id="yiWaKeng"></ul>                </div>            </div>            <div class="layui-tab-item">                <div class="layim-chat-main">                    <ul id="yiJiaoZhu"></ul>                </div>            </div>            <div class="layui-tab-item">                <div class="layim-chat-main">                    <ul id="yiligan"></ul>                </div>            </div>            <div class="layui-tab-item">                <div class="layim-chat-main">                    <ul id="yitiaoshi"></ul>                </div>            </div>            <div class="layui-tab-item">                <div class="layim-chat-main">                    <ul id="yiWanCheng"></ul>                </div>            </div>            <div class="layui-tab-item">                <div class="layim-chat-main">                    <ul id="qita"></ul>                </div>            </div>        </div>    </div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    for (var i in obj.data.photoList) {
                        if (obj.data.photoList[i].type == '1') {
                            document.getElementById("yiFangYang").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style="width: 160px; margin-top: 20px; height: 160px; margin-left: 10px" src="' + datasurl + obj.data.photoList[i].photoUrl + '" alt="放样' + (i) + '" ></img></li>';

                        } else if (obj.data.photoList[i].type == '2') {
                            document.getElementById("yiWaKeng").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style="width: 160px; margin-top: 20px; height: 160px; margin-left: 10px" src="' + datasurl + obj.data.photoList[i].photoUrl + '" alt="挖坑' + (i) + '"></img></li>';

                        } else if (obj.data.photoList[i].type == '3') {
                            document.getElementById("yiJiaoZhu").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style="width: 160px; margin-top: 20px; height: 160px; margin-left: 10px" src="' + datasurl + obj.data.photoList[i].photoUrl + '" alt="浇筑' + (i) + '"></img></li>';

                        } else if (obj.data.photoList[i].type == '4') {
                            document.getElementById("yiligan").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style="width: 160px; margin-top: 20px; height: 160px; margin-left: 10px" src="' + datasurl + obj.data.photoList[i].photoUrl + '" alt="立杆' + (i) + '"></img></li>';

                        } else if (obj.data.photoList[i].type == '5') {
                            document.getElementById("yitiaoshi").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style="width: 160px; margin-top: 20px; height: 160px; margin-left: 10px" src="' + datasurl + obj.data.photoList[i].photoUrl + '" alt="调试' + (i) + '"></img></li>';

                        }  else if (obj.data.photoList[i].type == '6') {
                            document.getElementById("yiWanCheng").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style="width: 160px; margin-top: 20px; height: 160px; margin-left: 10px" src="' + datasurl + obj.data.photoList[i].photoUrl + '" alt="完成' + (i) + '"></img></li>';

                        } else if (obj.data.photoList[i].type == '7') {
                            document.getElementById("qita").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style="width: 160px; margin-top: 20px; height: 160px; margin-left: 10px" src="' + datasurl + obj.data.photoList[i].photoUrl + '" alt="其他' + (i) + '"></img></li>';

                        }

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
                    });
                    viewerPhoto = new Viewer(document.getElementById('yitiaoshi'), {
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
    var MonitorStringList = [];
    var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
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
                    layer.close(loadingceindex);
                    var constPhotodata = JSON.parse(data);
                    console.log(constPhotodata);
                    for (var i in monitorinfos) {
                        var MonitorString = monitorinfos[i].MonitorString;
                        var photoList = [];
                        var mointorStatus = 0;
                        for (var j in constPhotodata) {
                            if (MonitorString.Id == constPhotodata[j].monitorId) {

                                photoList.push(constPhotodata[j]);
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
                                if (constPhotodata[j].type == '5' && mointorStatus < 5) {
                                    mointorStatus = 5;
                                }
                                if (constPhotodata[j].type == '6' && mointorStatus < 6) {
                                    mointorStatus = 6;
                                }
                            }
                        }
                        MonitorString.photoList = photoList;
                        MonitorString.mointorStatus = mointorStatus;
                        if (mointorStatus >0) {
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
                        if (mointorStatus > 4) {
                            yitiaoshi++;
                        }
                        if (mointorStatus > 5) {
                            yiWancheng++;
                        }
                   
                        MonitorStringList.push(MonitorString);
                    }
                    
      
                    constPhotoTable.reload({ id: 'constPhotoTableId', data: MonitorStringList });
                    var tempList = [];
                    tempList.push({ "name": '放样', "num": yifangyang, "bili": toPercent(yifangyang / MonitorStringList.length)});
                    tempList.push({ "name": '挖坑', "num": yiWakeng, "bili": toPercent(yiWakeng / MonitorStringList.length)});
                    tempList.push({ "name": '浇筑', "num": yiJiaozhu, "bili": toPercent(yiJiaozhu / MonitorStringList.length)});
                    tempList.push({ "name": '立杆', "num": yiligan, "bili": toPercent(yiligan / MonitorStringList.length)});
                    tempList.push({ "name": '调试', "num": yitiaoshi, "bili": toPercent(yitiaoshi / MonitorStringList.length) });
                    tempList.push({ "name": '完成', "num": yiWancheng, "bili": toPercent(yiWancheng / MonitorStringList.length) });
                    console.log(tempList);
                    constdeviceTongjitable.reload({ id: 'constdeviceTongjiId', data: tempList });
                    //console.log(MonitorStringList);
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
                , title: [ '设备照片', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
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
