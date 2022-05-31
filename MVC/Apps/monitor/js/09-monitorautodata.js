var currentmonitor = null;                      //当前监测点
var autodatachart = null;                       //图表
var monitorstatisticstable = null;              //监测点统计表
var monitorstatisticsdata = [];                 //监测点统计数据（最小值、最大值、平均值、标准差）
var editChart = null;                           //处理监测数据图

var threshold1 = null;                          //定义标示线初值
var threshold2 = null;
var threshold3 = null;
var threshold4 = null;

var orangeData = null;                         //原始数据
var reviseData = null;                         //修正数据
var LiFengDatastatisticsTable = null;             //变形量的数据lf
var YingLiDatastatisticsTable = null;             //变形量的数据应力
var GNSSDatastatisticsTable = null;             //变形量的数据Gnss
var QinJiaoDatastatisticsTable = null;             //变形量的数据倾角
var SbwyDatastatisticsTable = null;             //变形量的深部位移
var DxswDatastatisticsTable = null;             //变形量的数据地下水位

//自动化监测数据widget
function LoadAutoDataLayer(id) {
    if (id == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        if ((automonitordatalayerindex != null) || (automonitordatalayerindex != undefined)) {
            layer.close(automonitordatalayerindex);
        }
    }
    else {
        if (automonitordatalayerindex == null) {
            automonitordatalayerindex = layer.open({
                type: 1
                , title: ['自动化监测数据可视化', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['1000px', '800px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--自动化监测数据可视化--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:1px 0px;overflow: hidden;">    <ul class="layui-tab-title">        <li class="layui-this" style="width:21%;">数据处理</li>        <li style="width:21%;">可视化</li>        <li style="width:21%;">综合分析</li>        <li style="width:21%;">统计分析</li>    </ul>    <div class="layui-tab-content" style="margin:0px 0px">        <!--数据处理-->        <div class="layui-tab-item layui-show">            <div class="layui-row" style="margin: 0px 10px;">                <!--选择设备及时间范围-->                <form class="layui-form" lay-filter="editautodataform" style="margin-top:5px;">                    <div class="layui-row">                        <div class="layui-col-xs4">                            <div class="grid-demo grid-demo-bg1">                                <div class="layui-form-item">                                    <label class="layui-form-label" style="text-align:center;">选择设备：</label>                                    <div class="layui-input-block">                                        <select id="editautodatadeviceid" name="editautodatadevice" lay-filter="editautodatadevicefilter" style="visibility:hidden;">                                            <option value="">请选择设备</option>                                        </select>                                    </div>                                </div>                            </div>                        </div>                        <div class="layui-col-xs4">                            <div class="grid-demo">                                <div class="layui-form-item">                                    <div class="layui-input-block" style="margin-left:10px;">                                        <select id="editautodatapretimeid" name="editautodatapretime" lay-filter="editautodatapretimefilter" style="visibility:hidden;">                                            <option value="">请选择年限</option>                                        </select>                                    </div>                                </div>                            </div>                        </div>                        <div class="layui-col-xs4">                            <div class="grid-demo">                                <div class="layui-form-item">                                    <div class="layui-input-block" style="margin-left:10px;">                                        <input id="editautodatacustomtimeid" name="editautodatacustomtime" type="text" class="layui-input" placeholder="开始时间 — 结束时间" style="visibility:hidden;">                                    </div>                                </div>                            </div>                        </div>                    </div>                </form>            </div>            <div class="layui-row" style="margin: 0px 10px;">                <div class="layui-col-md10">                    <!--图形-->                    <div id="editautodatachartid" class="layui-tab-item layui-show" style="width:98%;height:400px;border: 1px solid #e6e6e6;"></div>                </div>                <div class="layui-col-md2">                    <!--数据集-->                    <div id="editautodatasetid" class="layui-tab-item layui-show" style="width:98%;height:400px;border: 1px solid #e6e6e6;overflow-y: auto;"> </div>                </div>            </div>            <div class="layui-row" style="margin: 0px 10px;">                <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">                    <ul class="layui-tab-title">                        <li class="layui-this">异常处理</li>                        <li>粗差剔除</li>                        <li>设置初值</li>                        <li>插补数据</li>                        <li>监测曲线</li>                    </ul>                    <div class="layui-tab-content" id="editautodatatoolid" style="width:100%;height:180px;">                        <div class="layui-tab-item layui-show">                            <div class="layui-row">                                <!--左侧-->                                <div class="layui-col-xs3">                                    <!--异常处理工具及说明-->                                    <form class="layui-form" lay-filter="editabnormaldatatoolform" style="margin-top:5px;">                                        <!--异常处理工具-->                                        <div class="layui-row">                                            <div class="layui-form-item">                                                <div class="layui-input-block" style="margin-left:1px;">                                                    <select id="editabnormaldatatoolid" name="editabnormaldatatool" lay-filter="editabnormaldatatoolfilter">                                                        <option value="0">按时间范围选择</option>                                                        <option value="1">按值域范围选择</option>                                                        <option value="2">多条件选择</option>                                                    </select>                                                </div>                                            </div>                                        </div>                                    </form>                                    <!--异常处理工具说明-->                                    <div id="editabnormaldatatooldoc" style="height:120px;padding: 5px 5px; border: 1px solid #e6e6e6;overflow-y: auto;"></div>                                </div>                                <!--右侧-->                                <div class="layui-col-md9" id="editabnormaldatatoolbodyid">                                    <!--异常处理工具参数-->                                </div>                            </div>                        </div>                        <div class="layui-tab-item">2</div>                        <div class="layui-tab-item">3</div>                        <div class="layui-tab-item">4</div>                        <div class="layui-tab-item">5</div>                        <div class="layui-tab-item">6</div>                    </div>                </div>            </div>        </div>        <!--可视化-->        <div class="layui-tab-item">            <div class="layui-row">                <!--左侧-->                <div class="layui-col-md3" style="width:20%;height:700px;overflow: auto;">                    <div id="monitortreebytype" class="grid-demo"></div>                </div>                <!--右侧-->                <div class="layui-col-md9" style="width:80%;height:700px;border-left:solid;border-color:#e6e6e6;border-left-width:0px;">                    <div class="grid-demo grid-demo-bg1">                        <!--工具栏-->                        <form class="layui-form" lay-filter="autodataform" style="margin-top:5px;">                            <div class="layui-row">                                <div class="layui-col-xs6">                                    <div class="grid-demo grid-demo-bg1">                                        <div class="layui-form-item">                                            <div class="layui-input-block" style="margin-left:10px;"><select id="autodatapretimeid" name="autodatapretime" lay-filter="autodatapretimefilter" style="visibility:hidden;"></select></div>                                        </div>                                    </div>                                </div>                                <div class="layui-col-xs6">                                    <div class="grid-demo">                                        <div class="layui-form-item">                                            <div class="layui-input-block" style="margin-left:10px;margin-right:10px;">                                                <input id="autodatacustomtimeid" name="autodatacustomtime" type="text" class="layui-input" placeholder="开始时间 — 结束时间" style="visibility:hidden;">                                            </div>                                        </div>                                    </div>                                </div>                            </div>                        </form>                        <!--图形-->                        <div id="autodatachart" class="layui-tab-item layui-show" style="width:790px;height:480px"></div>                        <!--统计表格-->                        <div id="autodatastatisticsdiv" style="margin-left:10px;margin-right:10px;visibility:hidden;">                            <table id="autodatastatistics" class="layui-hide"></table>                        </div>                    </div>                </div>            </div>        </div>        <!--综合分析-->        <div class="layui-tab-item">综合分析</div>        <!--统计分析-->        <div class="layui-tab-item">            <div class="layui-col-md12" style="height:700px;border-left:solid;border-color:#e6e6e6;border-left-width:0px;overflow-y: auto;">                <div class="grid-demo grid-demo-bg1">                    <!--工具栏-->                    <form class="layui-form" lay-filter="bianXingDataform" style="margin-top:5px;margin-left:20px;margin-right:40px;">                        <div class="layui-row">                            <div class="layui-col-xs6">                                <div class="grid-demo grid-demo-bg1">                                    <div class="layui-form-item">                                        <div class="layui-input-block" style="margin-left:40px;"><select id="bianXingDatapretimeid" name="bianXingDatapretime" lay-filter="bianXingDatapretimefilter" style="visibility:hidden;"></select></div>                                    </div>                                </div>                            </div>                            <div class="layui-col-xs6">                                <div class="grid-demo">                                    <div class="layui-form-item">                                        <div class="layui-input-block" style="margin-left:20px;margin-right:40px;">                                            <input id="bianXingDatacustomtimeid" name="bianXingDatacustomtime" type="text" class="layui-input" placeholder="开始时间 — 结束时间" style="visibility:hidden;">                                        </div>                                    </div>                                </div>                            </div>                        </div>                    </form>                    <!--统计表格-->                    <div id="LiFengDatastatisticsDiv" style="margin-left:10px;margin-right:10px;margin-top:10px;margin-bottom:10px; width:460px;height:300px ;vertical-align: top;display:inline-block ">                        <table id="LiFengDatastatistics" class="layui-hide"></table>                    </div>                    <div id="YingLiDatastatisticsDiv" style="margin-left:10px;margin-right:10px;margin-top:10px;margin-bottom:10px; width:460px;height:300px ;vertical-align: top;display:inline-block">                        <table id="YingLiDatastatistics" class="layui-hide"></table>                    </div>                    <div id="GNSSDatastatisticsDiv" style="margin-left:10px;margin-right:10px;margin-top:10px;margin-bottom:10px; width:460px;height:300px ;vertical-align: top;display:inline-block">                        <table id="GNSSDatastatistics" class="layui-hide"></table>                    </div>                    <div id="QinJiaoDatastatisticsDiv" style="margin-left:10px;margin-right:10px;margin-top:10px;margin-bottom:10px; width:460px;height:300px ;vertical-align: top;display:inline-block">                        <table id="QinJiaoDatastatistics" class="layui-hide"></table>                    </div>                    <div id="SbwyDatastatisticsDiv" style="margin-left:10px;margin-right:10px;margin-top:10px;margin-bottom:10px; width:460px;height:300px ;vertical-align: top;display:inline-block">                        <table id="SbwyDatastatistics" class="layui-hide"></table>                    </div>                    <div id="DxswDatastatisticsDiv" style="margin-left:10px;margin-right:10px;margin-top:10px;margin-bottom:10px; width:460px;height:300px  ;vertical-align: top;display:inline-block">                        <table id="DxswDatastatistics" class="layui-hide"></table>                    </div>                </div>            </div>        </div>    </div></div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    //Loading
                    var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                    //加载监测点
                    GetMonitors(id, loadinglayerindex);
                    //加载变形了分统计表
                    getBianXingLiangData(id);

                }
                , end: function () {
                    //关闭
                    automonitordatalayerindex = null;

                    currentmonitor = null;
                    autodatachart = null;
                    editChart = null;
                    monitorstatisticstable = null;
                    monitorstatisticsdata = [];
                    LiFengDatastatisticsTable = null;             //变形量的数据lf
                    YingLiDatastatisticsTable = null;             //变形量的数据应力
                    GNSSDatastatisticsTable = null;             //变形量的数据Gnss
                    QinJiaoDatastatisticsTable = null;             //变形量的数据倾角
                    SbwyDatastatisticsTable = null;             //变形量的深部位移
                    DxswDatastatisticsTable = null;             //变形量的数据地下水位
                }
            });
        }
    }
};

//获取项目监测点
function GetMonitors(projectid, index) {
    $.ajax({
        url: servicesurl + "/api/Monitor/GetMonitor", type: "get", data: { "id": projectid, "cookie": document.cookie },
        success: function (data) {
            //关闭Loading
            layer.close(index);

            if (data == "") {
                layer.msg("无项目自动监测数据信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }
            else {
                var monitorinfos = JSON.parse(data);

                var disasterinfo = [];                      //灾害体
                var sectioninfo = [];                       //监测剖面
                var methodinfo = [];                        //监测方法

                //获取灾害体、监测方法、监测剖面
                for (var i in monitorinfos) {
                    if (monitorinfos[i].DisasterString != null) {
                        if (disasterinfo.length != 0) {
                            var isin = false;
                            for (var j in disasterinfo) {
                                if (disasterinfo[j].id == monitorinfos[i].DisasterString.Id) {
                                    isin = true;
                                    break;
                                }
                            }

                            if (!isin) {
                                var di = new Object;
                                di.title = monitorinfos[i].DisasterString.ZHTBH;
                                di.id = monitorinfos[i].DisasterString.Id;
                                di.checked = false;
                                disasterinfo.push(di);
                            }
                        }
                        else {
                            var di = new Object;
                            di.title = monitorinfos[i].DisasterString.ZHTBH;
                            di.id = monitorinfos[i].DisasterString.Id;
                            di.checked = false;
                            disasterinfo.push(di);
                        }
                    }

                    if (monitorinfos[i].SectionString != null) {
                        if (sectioninfo.length != 0) {
                            var isin = false;
                            for (var j in sectioninfo) {
                                if (sectioninfo[j].id == monitorinfos[i].SectionString.Id) {
                                    isin = true;
                                    break;
                                }
                            }

                            if (!isin) {
                                var si = new Object;
                                si.title = monitorinfos[i].SectionString.PMBH;
                                si.id = monitorinfos[i].SectionString.Id;
                                si.checked = false;
                                sectioninfo.push(si);
                            }
                        }
                        else {
                            var si = new Object;
                            si.title = monitorinfos[i].SectionString.PMBH;
                            si.id = monitorinfos[i].SectionString.Id;
                            si.checked = false;
                            sectioninfo.push(si);
                        }
                    }

                    if (monitorinfos[i].MonitorString != null) {
                        if (methodinfo.length != 0) {
                            var isin = false;
                            for (var j in methodinfo) {
                                if (methodinfo[j].title == monitorinfos[i].MonitorString.JCFF) {
                                    isin = true;
                                    break;
                                }
                            }

                            if (!isin) {
                                var mi = new Object;
                                mi.title = monitorinfos[i].MonitorString.JCFF;
                                mi.id = monitorinfos[i].MonitorString.Id;//无实际意义
                                mi.checked = false;
                                if (monitorinfos[i].MonitorString.JCFF != "声光预警") {
                                    methodinfo.push(mi);
                                }
                            }
                        }
                        else {
                            var mi = new Object;
                            mi.title = monitorinfos[i].MonitorString.JCFF;
                            mi.id = monitorinfos[i].MonitorString.Id;//无实际意义
                            mi.checked = false;
                            if (monitorinfos[i].MonitorString.JCFF != "声光预警") {
                                methodinfo.push(mi);
                            }
                        }
                    }
                }

                //按不同分类组合监测点
                for (var i in monitorinfos) {
                    if (monitorinfos[i].MonitorString.JCZLX != "GNSS基准站") {
                        if (monitorinfos[i].MonitorString != null) {
                            var mi = new Object;
                            mi.title = monitorinfos[i].MonitorString.JCDBH;
                            mi.id = monitorinfos[i].MonitorString.Id;
                            mi.type = monitorinfos[i].MonitorString.JCFF;//监测方法

                            if (monitorinfos[i].DisasterString != null) {
                                for (var j in disasterinfo) {
                                    if (monitorinfos[i].DisasterString.Id == disasterinfo[j].id) {
                                        if (disasterinfo[j].children == null) {
                                            var child = [];
                                            child.push(mi);
                                            disasterinfo[j].children = child;
                                            if (j == 0) {
                                                disasterinfo[j].spread = true;
                                                currentmonitor = mi;
                                            }
                                        }
                                        else {
                                            disasterinfo[j].children.push(mi);
                                        }
                                    }
                                }
                            }

                            if (monitorinfos[i].SectionString != null) {
                                for (var j in sectioninfo) {
                                    if (monitorinfos[i].SectionString.Id == sectioninfo[j].id) {
                                        if (sectioninfo[j].children == null) {
                                            var child = [];
                                            child.push(mi);
                                            sectioninfo[j].children = child;
                                        }
                                        else {
                                            sectioninfo[j].children.push(mi);
                                        }
                                    }
                                }
                            }

                            for (var j in methodinfo) {
                                if (monitorinfos[i].MonitorString.JCFF == methodinfo[j].title) {
                                    if (methodinfo[j].children == null) {
                                        var child = [];
                                        child.push(mi);
                                        methodinfo[j].children = child;
                                    }
                                    else {
                                        methodinfo[j].children.push(mi);
                                    }
                                }
                            }
                        }
                    }
                }

                //按灾害体构建监测点树
                var monitortreebytypedata = [];             //按不同分类方法组成的监测点集合
                var monitorbydisaster = new Object;
                monitorbydisaster.title = "按灾害体分类";
                monitorbydisaster.children = disasterinfo;
                monitorbydisaster.spread = true;
                monitortreebytypedata.push(monitorbydisaster);
                //按监测方法构建监测点树
                var monitorbymethod = new Object;
                monitorbymethod.title = "按监测方法分类";
                monitorbymethod.children = methodinfo;
                monitortreebytypedata.push(monitorbymethod);
                //按监测剖面构建监测点树
                var monitorbysection = new Object;
                monitorbysection.title = "按监测剖面分类";
                monitorbysection.children = sectioninfo;
                monitortreebytypedata.push(monitorbysection);


                //渲染监测点树
                tree.render({
                    elem: '#monitortreebytype'
                    , id: 'monitortreebytypeid'
                    , showCheckbox: false
                    , showLine: true
                    , data: monitortreebytypedata
                    , edit: false
                    , accordion: true
                    , click: function (obj) {
                        if ((obj.data.type != null) || (obj.data.type != undefined)) {
                            if (obj.data != currentmonitor) {
                                currentmonitor = obj.data;
                                LoadMonitorAutoDataPreDateTime(currentmonitor, form.val("autodataform").autodatapretime);
                            }
                        }
                    }
                });


                //渲染工具栏
                document.getElementById("autodatapretimeid").style.visibility = "visible";
                document.getElementById("autodatacustomtimeid").style.visibility = "visible";

                //自动化监测数据时间范围（预设）
                if (autodatadatetimes.length > 0) {
                    for (var i in autodatadatetimes) {
                        if (autodatadatetimes[i].name == "最近30天") {
                            document.getElementById("autodatapretimeid").innerHTML += '<option value="' + autodatadatetimes[i].value + '" selected>' + autodatadatetimes[i].name + '</option>';
                        }
                        else {
                            document.getElementById("autodatapretimeid").innerHTML += '<option value="' + autodatadatetimes[i].value + '">' + autodatadatetimes[i].name + '</option>';
                        }
                    }
                }

                form.render();
                form.render('select');

                //预设时间范围切换时间
                form.on('select(autodatapretimefilter)', function (data) {
                    if (data.value != "") {
                        //按预设时间范围绘制图表
                        LoadMonitorAutoDataPreDateTime(currentmonitor, data.value);
                    }
                });


                //自定义时间范围
                date.render({
                    elem: '#autodatacustomtimeid'
                    , type: 'datetime'
                    , range: true
                    , done: function (value, date, endDate) {
                        if (value != "") {
                            //按自定义时间范围绘制图表
                            LoadMonitorAutoDataCustomDateTime(currentmonitor, value);
                        }
                    }
                });

                //渲染统计表格
                monitorstatisticstable = table.render({
                    elem: '#autodatastatistics'
                    , id: 'autodatastatisticstableid'
                    , title: '监测点监测数据统计信息'
                    , page: false
                    , skin: 'line'
                    , even: false
                    , size: 'sm'
                    , totalRow: false
                    , cols: [[
                        { field: 'name', title: '', fixed: 'left', align: "center" }
                        , { field: 'minvalue', title: '最小值', align: "center" }
                        , { field: 'maxvalue', title: '最大值', align: "center" }
                        , { field: 'avgvalue', title: '平均值', align: "center" }
                        , { field: 'sdvalue', title: '标准差', align: "center" }
                    ]]
                    , data: []
                });

                var data1 = form.val("autodataform");

                //加载初始监测点数据
                LoadMonitorAutoDataPreDateTime(currentmonitor, form.val("autodataform").autodatapretime);
                //监测数据处理
                EditProjectDeviceAutoData(projectid);
            }
        }, datatype: "json"
    });
};

function LoadMonitorAutoDataPreDateTime(monitor, datetime) {
    //实例化图表
    autodatachart = echarts.init(document.getElementById('autodatachart'));
    autodatachart.showLoading();

    //请求监测点指点时间范围数据
    $.ajax({
        url: servicesurl + "/api/Data/GetAutoDatabyPreDateTime", type: "get", data: { "id": monitor.id, "type": monitor.type, "predatetime": datetime, "cookie": document.cookie },
        success: function (data) {
            DisplayDATA(monitor, data);
        }, datatype: "json"
    });
};

function LoadMonitorAutoDataCustomDateTime(monitor, datetime) {
    //实例化图表
    autodatachart = echarts.init(document.getElementById('autodatachart'));
    autodatachart.showLoading();

    //请求监测点指点时间范围数据
    $.ajax({
        url: servicesurl + "/api/Data/GetAutoDatabyCustomDateTime", type: "get", data: { "id": monitor.id, "type": monitor.type, "customdatetime": datetime, "cookie": document.cookie },
        success: function (data) {
            DisplayDATA(monitor, data);
        }, datatype: "json"
    });
};
//计算数组平均值
function GetArrayAvg(arr) {
    var sum = 0;
    for (var i in arr) {
        sum += arr[i];
    }
    return sum / arr.length;
};

//展示数据
function DisplayDATA(monitor, data) {
    if (data == "") {
        layer.msg('无监测数据！', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

        DisplayNODATA(monitor);
    }
    else {
        if (monitor.type == "GNSS") {
            DisplayGNSS(monitor, data);
        }
        else if (monitor.type == "裂缝") {
            DisplayLF(monitor, data);
        }
        else if (monitor.type == "倾角") {
            DisplayQJ(monitor, data);
        }
        else if (monitor.type == "应力") {
            DisplayYL(monitor, data);
        }
        else if (monitor.type == "深部位移") {
            DisplaySBWY(monitor, data);
        }
        else if (monitor.type == "地下水位") {
            DisplayWATER(monitor, data);
        }
        else if (monitor.type == "雨量") {
            DisplayRAIN(monitor, data);
        }
        //TODO
    }
};

//展示无数据
function DisplayNODATA(monitor) {
    document.getElementById("autodatastatisticsdiv").style.visibility = "hidden";
    monitorstatisticstable.reload({ id: 'autodatastatisticstableid', data: [] });

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
        grid: {
            left: '5%',
            right: '5%',
            top: '10%',
            bottom: '10%',
            containLabel: true
        }
    };

    autodatachart.hideLoading();
    autodatachart.setOption(option, true, false);
};

//展示GNSS
function DisplayGNSS(monitor, data) {
    var gnssmonitors = JSON.parse(data);

    //统计
    monitorstatisticsdata = [];
    var values = [];
    for (var i in gnssmonitors.Statistics) {
        var statistics = new Object;
        statistics.name = gnssmonitors.Statistics[i].Name;
        statistics.minvalue = gnssmonitors.Statistics[i].Min;
        statistics.maxvalue = gnssmonitors.Statistics[i].Max;
        statistics.avgvalue = gnssmonitors.Statistics[i].Avg;
        statistics.sdvalue = gnssmonitors.Statistics[i].Sd;
        monitorstatisticsdata.push(statistics);

        values.push(parseFloat(gnssmonitors.Statistics[i].Min));
        values.push(parseFloat(gnssmonitors.Statistics[i].Max));
    }
    document.getElementById("autodatastatisticsdiv").style.visibility = "visible";
    monitorstatisticstable.reload({ id: 'autodatastatisticstableid', data: monitorstatisticsdata });

    var yaxismax = parseInt(2 * Math.max.apply(null, values) - Math.min.apply(null, values));
    var yaxismin = parseInt(2 * Math.min.apply(null, values) - Math.max.apply(null, values));

    //图表
    var xs = [];
    var ys = [];
    var xys = [];
    var hs = [];

    for (var i in gnssmonitors.Datas) {
        //yyyy-MM-dd HH:mm:ss转UNIX时间戳（毫秒）
        var time = Math.round(new Date(gnssmonitors.Datas[i].Time) / 1000) * 1000;

        var x = [];
        var y = [];
        var xy = [];
        var h = [];

        x.push(time);
        x.push(parseInt(parseFloat(gnssmonitors.Datas[i].Dx) * 1000) / 1000);
        xs.push(x);

        y.push(time);
        y.push(parseInt(parseFloat(gnssmonitors.Datas[i].Dy) * 1000) / 1000);
        ys.push(y);

        xy.push(time);
        xy.push(parseInt(parseFloat(gnssmonitors.Datas[i].Dxy) * 1000) / 1000);
        xys.push(xy);

        h.push(time);
        h.push(parseInt(parseFloat(gnssmonitors.Datas[i].Dh) * 1000) / 1000);
        hs.push(h);
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
        legend: {
            data: ['X位移', 'Y位移', '水平位移', '垂直位移'],
            left: 'center',
            bottom: 10
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var date = new Date(parseInt(params[0].value[0]));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                var h = date.getHours();
                var mm = date.getMinutes();
                var s = date.getSeconds();
                var time = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s);
                var label = "";
                for (var i in params) {
                    label += params[i].marker + params[i].seriesName + ':' + params[i].value[1] + 'mm<br/>';
                }
                return time + '<br/>' + label;
            }
        },
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
            type: 'time',
            splitLine: { show: false },
            axisLabel: {
                formatter: function (params, index) {
                    var time = new Date(params);
                    var y = time.getFullYear();
                    var m = time.getMonth() + 1;
                    var d = time.getDate();
                    var h = time.getHours();
                    var mm = time.getMinutes();
                    var s = time.getSeconds();
                    //return (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s) + '\n' + y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                }
            }
        },
        yAxis: {
            type: 'value',
            max: Math.ceil(yaxismax),
            min: Math.floor(yaxismin),
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            axisLabel: {
                formatter: '{value} mm'
            }
        },
        dataZoom: [
            //{
            //    //x轴滑块
            //    type: 'slider',
            //    height: 15,
            //    xAxisIndex: 0,
            //    filterMode: 'empty'
            //},
            {
                //y轴滑块
                type: 'slider',
                width: 20,
                yAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                //x轴缩放
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                //y轴缩放
                type: 'inside',
                yAxisIndex: 0,
                filterMode: 'empty'
            }
        ],
        series: [
            {
                name: 'X位移',
                type: 'line',
                showSymbol: false,
                data: xs
            },
            {
                name: 'Y位移',
                type: 'line',
                showSymbol: false,
                data: ys
            },
            {
                name: '水平位移',
                type: 'line',
                showSymbol: false,
                data: xys
            },
            {
                name: '垂直位移',
                type: 'line',
                showSymbol: false,
                data: hs
            }
        ]
    };

    autodatachart.hideLoading();
    autodatachart.setOption(option, true, false);
};
//展示裂缝
function DisplayLF(monitor, data) {
    var lfmonitors = JSON.parse(data);

    //统计
    var avgs = [];
    var sds = [];
    monitorstatisticsdata = [];
    for (var i in lfmonitors.Statistics) {
        var statistics = new Object;
        statistics.name = lfmonitors.Statistics[i].Name;
        statistics.minvalue = lfmonitors.Statistics[i].Min;
        statistics.maxvalue = lfmonitors.Statistics[i].Max;
        statistics.avgvalue = lfmonitors.Statistics[i].Avg;
        statistics.sdvalue = lfmonitors.Statistics[i].Sd;
        monitorstatisticsdata.push(statistics);

        avgs.push(parseFloat(lfmonitors.Statistics[i].Avg));
        sds.push(parseFloat(lfmonitors.Statistics[i].Sd));
    }
    document.getElementById("autodatastatisticsdiv").style.visibility = "visible";
    monitorstatisticstable.reload({ id: 'autodatastatisticstableid', data: monitorstatisticsdata });

    //var yaxismax = parseInt(GetArrayAvg(avgs) + 12 * GetArrayAvg(sds));
    //var yaxismin = parseInt(GetArrayAvg(avgs) - 12 * GetArrayAvg(sds));

    var yaxismax = GetArrayAvg(avgs) + 12 * GetArrayAvg(sds);
    var yaxismin = GetArrayAvg(avgs) - 12 * GetArrayAvg(sds);

    //var yaxismax = parseInt(GetArrayAvg(avgs) + 0.5);
    //var yaxismin = parseInt(GetArrayAvg(avgs) - 0.5);

    //图表
    var lens = [];
    for (var i in lfmonitors.Datas) {
        var len = [];

        len.push(Math.round(new Date(lfmonitors.Datas[i].Time) / 1000) * 1000);
        len.push(parseFloat(lfmonitors.Datas[i].Dv));
        lens.push(len);
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
        legend: {
            data: ['变形量'],
            left: 'center',
            bottom: 10
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var date = new Date(parseInt(params[0].value[0]));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                var h = date.getHours();
                var mm = date.getMinutes();
                var s = date.getSeconds();
                var time = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s);
                var label = "";
                for (var i in params) {
                    label += params[i].marker + params[i].seriesName + ':' + params[i].value[1] + 'mm<br/>';
                }
                return time + '<br/>' + label;
            }
        },
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
            type: 'time',
            splitLine: { show: false },
            axisLabel: {
                formatter: function (params, index) {
                    var time = new Date(params);
                    var y = time.getFullYear();
                    var m = time.getMonth() + 1;
                    var d = time.getDate();
                    var h = time.getHours();
                    var mm = time.getMinutes();
                    var s = time.getSeconds();
                    //return (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s) + '\n' + y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                }
            }
        },
        yAxis: {
            type: 'value',
            min: Math.floor(yaxismin),
            max: Math.ceil(yaxismax),
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            axisLabel: {
                formatter: '{value} mm'
            }
        },
        dataZoom: [
            //{
            //    //x轴滑块
            //    type: 'slider',
            //    height: 15,
            //    xAxisIndex: 0,
            //    filterMode: 'empty'
            //},
            {
                //y轴滑块
                type: 'slider',
                width: 20,
                yAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                //x轴缩放
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                //y轴缩放
                type: 'inside',
                yAxisIndex: 0,
                filterMode: 'empty'
            }
        ],
        series: [
            {
                name: '变形量',
                type: 'line',
                showSymbol: false,
                data: lens
            }
        ]
    };

    autodatachart.hideLoading();
    autodatachart.setOption(option, true, false);
};
//展示倾角
function DisplayQJ(monitor, data) {
    var qjmonitors = JSON.parse(data);

    //统计
    monitorstatisticsdata = [];
    var values = [];
    for (var i in qjmonitors.Statistics) {
        var statistics = new Object;
        statistics.name = qjmonitors.Statistics[i].Name;
        statistics.minvalue = qjmonitors.Statistics[i].Min;
        statistics.maxvalue = qjmonitors.Statistics[i].Max;
        statistics.avgvalue = qjmonitors.Statistics[i].Avg;
        statistics.sdvalue = qjmonitors.Statistics[i].Sd;
        monitorstatisticsdata.push(statistics);

        values.push(parseFloat(qjmonitors.Statistics[i].Min));
        values.push(parseFloat(qjmonitors.Statistics[i].Max));
    }
    document.getElementById("autodatastatisticsdiv").style.visibility = "visible";
    monitorstatisticstable.reload({ id: 'autodatastatisticstableid', data: monitorstatisticsdata });

    var yaxismax = 2 * Math.max.apply(null, values) - Math.min.apply(null, values);
    var yaxismin = 2 * Math.min.apply(null, values) - Math.max.apply(null, values);

    //倾角角度较小
    if (yaxismax > 0) {
        if (parseInt(yaxismax) == 0) {
            yaxismax = 1;
        }
    }
    else {
        if (parseInt(yaxismax) == 0) {
            yaxismax = 0;
        }
    }

    if (yaxismin > 0) {
        if (parseInt(yaxismin) == 0) {
            yaxismin = 0;
        }
    }
    else {
        if (parseInt(yaxismin) == 0) {
            yaxismin = -1;
        }
    }

    if (yaxismax > 1) {
        yaxismax = parseInt(yaxismax) + 1;
    }

    if (yaxismin < -1) {
        yaxismin = parseInt(yaxismin) - 1;
    }


    //图表
    var xs = [];
    var ys = [];
    var zs = [];

    for (var i in qjmonitors.Datas) {
        var x = [];
        var y = [];

        x.push(Math.round(new Date(qjmonitors.Datas[i].Time) / 1000) * 1000);
        x.push(parseFloat(qjmonitors.Datas[i].Dx));
        xs.push(x);

        y.push(Math.round(new Date(qjmonitors.Datas[i].Time) / 1000) * 1000);
        y.push(parseFloat(qjmonitors.Datas[i].Dy));
        ys.push(y);
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
        legend: {
            data: ['X方向角度', 'Y方向角度'],
            left: 'center',
            bottom: 10
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var date = new Date(parseInt(params[0].value[0]));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                var h = date.getHours();
                var mm = date.getMinutes();
                var s = date.getSeconds();
                var time = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s);
                var label = "";
                for (var i in params) {
                    label += params[i].marker + params[i].seriesName + ':' + params[i].value[1] + '°<br/>';
                }
                return time + '<br/>' + label;
            }
        },
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
            type: 'time',
            splitLine: { show: false },
            axisLabel: {
                formatter: function (params, index) {
                    var time = new Date(params);
                    var y = time.getFullYear();
                    var m = time.getMonth() + 1;
                    var d = time.getDate();
                    var h = time.getHours();
                    var mm = time.getMinutes();
                    var s = time.getSeconds();
                    //return (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s) + '\n' + y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                }
            }
        },
        yAxis: {
            type: 'value',
            min: Math.floor(yaxismin),
            max: Math.ceil(yaxismax),
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            axisLabel: {
                formatter: '{value} °'
            }
        },
        dataZoom: [
            //{
            //    //x轴滑块
            //    type: 'slider',
            //    height: 15,
            //    xAxisIndex: 0,
            //    filterMode: 'empty'
            //},
            {
                //y轴滑块
                type: 'slider',
                width: 20,
                yAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                //x轴缩放
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                //y轴缩放
                type: 'inside',
                yAxisIndex: 0,
                filterMode: 'empty'
            }
        ],
        series: [
            {
                name: 'X方向角度',
                type: 'line',
                showSymbol: false,
                data: xs
            },
            {
                name: 'Y方向角度',
                type: 'line',
                showSymbol: false,
                data: ys
            }
        ]
    };

    autodatachart.hideLoading();
    autodatachart.setOption(option, true, false);
};
//展示应力
function DisplayYL(monitor, data) {
    var ylmonitors = JSON.parse(data);

    //统计
    var avgs = [];
    var sds = [];
    monitorstatisticsdata = [];
    for (var i in ylmonitors.Statistics) {
        var statistics = new Object;
        statistics.name = ylmonitors.Statistics[i].Name;
        statistics.minvalue = ylmonitors.Statistics[i].Min;
        statistics.maxvalue = ylmonitors.Statistics[i].Max;
        statistics.avgvalue = ylmonitors.Statistics[i].Avg;
        statistics.sdvalue = ylmonitors.Statistics[i].Sd;
        monitorstatisticsdata.push(statistics);

        avgs.push(parseFloat(ylmonitors.Statistics[i].Avg));
        sds.push(parseFloat(ylmonitors.Statistics[i].Sd));
    }
    document.getElementById("autodatastatisticsdiv").style.visibility = "visible";
    monitorstatisticstable.reload({ id: 'autodatastatisticstableid', data: monitorstatisticsdata });

    var yaxismax = parseInt(GetArrayAvg(avgs) + 12 * GetArrayAvg(sds)) + 1;
    var yaxismin = parseInt(GetArrayAvg(avgs) - 12 * GetArrayAvg(sds)) - 1;

    //图表
    var ps = [];
    for (var i in ylmonitors.Datas) {
        var p = [];

        p.push(Math.round(new Date(ylmonitors.Datas[i].Time) / 1000) * 1000);
        p.push(parseFloat(ylmonitors.Datas[i].Dv));
        ps.push(p);
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
        legend: {
            data: ['应力变形量'],
            left: 'center',
            bottom: 10
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var date = new Date(parseInt(params[0].value[0]));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                var h = date.getHours();
                var mm = date.getMinutes();
                var s = date.getSeconds();
                var time = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s);
                var label = "";
                for (var i in params) {
                    label += params[i].marker + params[i].seriesName + ':' + params[i].value[1] + 'kN<br/>';
                }
                return time + '<br/>' + label;
            }
        },
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
            type: 'time',
            splitLine: { show: false },
            axisLabel: {
                formatter: function (params, index) {
                    var time = new Date(params);
                    var y = time.getFullYear();
                    var m = time.getMonth() + 1;
                    var d = time.getDate();
                    var h = time.getHours();
                    var mm = time.getMinutes();
                    var s = time.getSeconds();
                    //return (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s) + '\n' + y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                }
            }
        },
        yAxis: {
            type: 'value',
            min: Math.floor(yaxismin),
            max: Math.ceil(yaxismax),
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            axisLabel: {
                formatter: '{value} kN'
            }
        },
        dataZoom: [
            //{
            //    //x轴滑块
            //    type: 'slider',
            //    height: 15,
            //    xAxisIndex: 0,
            //    filterMode: 'empty'
            //},
            {
                //y轴滑块
                type: 'slider',
                width: 20,
                yAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                //x轴缩放
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                //y轴缩放
                type: 'inside',
                yAxisIndex: 0,
                filterMode: 'empty'
            }
        ],
        series: [
            {
                name: '应力变形量',
                type: 'line',
                showSymbol: false,
                data: ps
            }
        ]
    };

    autodatachart.hideLoading();
    autodatachart.setOption(option, true, false);

};
//展示深部位移
function DisplaySBWY(monitor, data) {
    var sbwymonitors = JSON.parse(data);

    //统计
    monitorstatisticsdata = [];
    var values = [];
    for (var i in sbwymonitors.Statistics) {
        var statistics = new Object;
        statistics.name = sbwymonitors.Statistics[i].Name;
        statistics.minvalue = sbwymonitors.Statistics[i].Min;
        statistics.maxvalue = sbwymonitors.Statistics[i].Max;
        statistics.avgvalue = sbwymonitors.Statistics[i].Avg;
        statistics.sdvalue = sbwymonitors.Statistics[i].Sd;
        monitorstatisticsdata.push(statistics);

        values.push(parseFloat(sbwymonitors.Statistics[i].Min));
        values.push(parseFloat(sbwymonitors.Statistics[i].Max));
    }
    document.getElementById("autodatastatisticsdiv").style.visibility = "visible";
    monitorstatisticstable.reload({ id: 'autodatastatisticstableid', data: monitorstatisticsdata });

    var yaxismax = Math.floor(parseFloat(2 * Math.max.apply(null, values) - Math.min.apply(null, values)) * 100) / 100;
    var yaxismin = Math.floor(parseFloat(2 * Math.min.apply(null, values) - Math.max.apply(null, values)) * 100) / 100;

    //图表
    var xs = [];
    var ys = [];
    var zs = [];

    for (var i in sbwymonitors.Datas) {
        var x = [];
        var y = [];

        x.push(Math.round(new Date(sbwymonitors.Datas[i].Time) / 1000) * 1000);
        x.push(parseFloat(sbwymonitors.Datas[i].X));
        xs.push(x);

        y.push(Math.round(new Date(sbwymonitors.Datas[i].Time) / 1000) * 1000);
        y.push(parseFloat(sbwymonitors.Datas[i].Y));
        ys.push(y);
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
        legend: {
            data: ['X方向位移', 'Y方向位移'],
            left: 'center',
            bottom: 10
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var date = new Date(parseInt(params[0].value[0]));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                var h = date.getHours();
                var mm = date.getMinutes();
                var s = date.getSeconds();
                var time = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s);
                var label = "";
                for (var i in params) {
                    label += params[i].marker + params[i].seriesName + ':' + Math.floor(parseFloat(params[i].value[1]) * 100) / 100 + 'mm<br/>';
                }
                return time + '<br/>' + label;
            }
        },
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
            type: 'time',
            splitLine: { show: false },
            axisLabel: {
                formatter: function (params, index) {
                    var time = new Date(params);
                    var y = time.getFullYear();
                    var m = time.getMonth() + 1;
                    var d = time.getDate();
                    var h = time.getHours();
                    var mm = time.getMinutes();
                    var s = time.getSeconds();
                    //return (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s) + '\n' + y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                }
            }
        },
        yAxis: {
            type: 'value',
            min: Math.floor(yaxismin),
            max: Math.ceil(yaxismax),
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            axisLabel: {
                formatter: '{value} mm'
            }
        },
        dataZoom: [
            //{
            //    //x轴滑块
            //    type: 'slider',
            //    height: 15,
            //    xAxisIndex: 0,
            //    filterMode: 'empty'
            //},
            {
                //y轴滑块
                type: 'slider',
                width: 20,
                yAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                //x轴缩放
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                //y轴缩放
                type: 'inside',
                yAxisIndex: 0,
                filterMode: 'empty'
            }
        ],
        series: [
            {
                name: 'X方向位移',
                type: 'line',
                showSymbol: false,
                data: xs
            },
            {
                name: 'Y方向位移',
                type: 'line',
                showSymbol: false,
                data: ys
            }
        ]
    };

    autodatachart.hideLoading();
    autodatachart.setOption(option, true, false);
};
//展示地下水位
function DisplayWATER(monitor, data) {
    var watermonitors = JSON.parse(data);

    document.getElementById("autodatastatisticsdiv").style.visibility = "hidden";
    monitorstatisticsdata = [];
    monitorstatisticstable.reload({ id: 'autodatastatisticstableid', data: monitorstatisticsdata });

    var waters = [];
    for (var i in watermonitors.Datas) {
        var time = Math.round(new Date(watermonitors.Datas[i].Time) / 1000) * 1000;
        var water = [];

        water.push(time);
        water.push(parseFloat(watermonitors.Datas[i].Value));
        waters.push(water);
    }

    var top = Math.floor(parseFloat(watermonitors.Height) * 100) / 100;//孔口高程
    var down = Math.floor((parseFloat(watermonitors.Height) - parseFloat(watermonitors.Deep)) * 100) / 100;//孔底高程

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
            trigger: 'axis',
            formatter: function (params) {
                var date = new Date(parseInt(params[0].value[0]));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                var h = date.getHours();
                var mm = date.getMinutes();
                var s = date.getSeconds();
                var time = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s);
                var label = "";
                for (var i in params) {
                    label += params[i].marker + params[i].seriesName + ':' + Math.floor(parseFloat(params[i].value[1]) * 100) / 100 + 'm<br/>';
                }
                return time + '<br/>' + label;
            }
        },
        legend: {
            data: ['地下水位'],
            left: 'center',
            bottom: 10
        },
        dataZoom: [
            //{
            //    type: 'slider',
            //    height: 15,
            //    start: 0,
            //    end: 100
            //},
            {
                type: 'inside',
                start: 0,
                end: 100
            }
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
            type: 'time',
            splitLine: { show: false },
            axisLabel: {
                formatter: function (params, index) {
                    var time = new Date(params);
                    var y = time.getFullYear();
                    var m = time.getMonth() + 1;
                    var d = time.getDate();
                    var h = time.getHours();
                    var mm = time.getMinutes();
                    var s = time.getSeconds();
                    //return (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s) + '\n' + y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                }
            }
        },
        yAxis: {
            type: 'value',
            min: Math.floor(down),
            max: Math.ceil(top),
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            axisLabel: {
                formatter: '{value} m'
            }
        },
        series: [
            {
                name: '地下水位',
                type: 'line',
                smooth: true,
                symbol: 'none',
                itemStyle: {
                    color: 'rgb(135,206,250)'
                },
                sampling: 'average',
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(135,206,250)'
                    }, {
                        offset: 1,
                        color: 'rgb(30,144,255)'
                    }])
                },
                data: waters
            }
        ]
    };

    autodatachart.hideLoading();
    autodatachart.setOption(option, true, false);
};
//展示雨量
function DisplayRAIN(monitor, data) {
    var rainmonitors = JSON.parse(data);

    document.getElementById("autodatastatisticsdiv").style.visibility = "hidden";
    monitorstatisticsdata = [];
    monitorstatisticstable.reload({ id: 'autodatastatisticstableid', data: monitorstatisticsdata });

    var rains = [];
    for (var i in rainmonitors) {
        var time = Math.round(new Date(rainmonitors[i].Time + " 12:00:00") / 1000) * 1000;
        var rain = [];

        rain.push(time);
        rain.push(parseFloat(rainmonitors[i].Value));
        rains.push(rain);
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
            trigger: 'axis',
            formatter: function (params) {
                var date = new Date(parseInt(params[0].value[0]));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                var h = date.getHours();
                var mm = date.getMinutes();
                var s = date.getSeconds();
                var time = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s);
                var label = "";
                for (var i in params) {
                    label += params[i].marker + params[i].seriesName + ':' + params[i].value[1] + 'mm<br/>';
                }
                return time + '<br/>' + label;
            }
        },
        legend: {
            data: ['降雨量(日)'],
            left: 'center',
            bottom: 10
        },
        dataZoom: [
            //{
            //    type: 'slider',
            //    height: 15,
            //    start: 0,
            //    end: 100
            //},
            {
                type: 'inside',
                start: 0,
                end: 100
            }
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
            type: 'time',
            splitLine: { show: false },
            axisLabel: {
                formatter: function (params, index) {
                    var time = new Date(params);
                    var y = time.getFullYear();
                    var m = time.getMonth() + 1;
                    var d = time.getDate();
                    var h = time.getHours();
                    var mm = time.getMinutes();
                    var s = time.getSeconds();
                    //return (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s) + '\n' + y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                }
            }
        },
        yAxis: {
            type: 'value',
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            axisLabel: {
                formatter: '{value} mm'
            }
        },
        series: [
            {
                name: '降雨量(日)',
                type: 'bar',
                itemStyle: {
                    color: '#4cabce'
                },
                showSymbol: false,
                data: rains
            }
        ]
    };

    autodatachart.hideLoading();
    autodatachart.setOption(option, true, false);
};
//自动化监测数据图表可视化
function LoadAuoData(monitor) {
    if (monitor != null) {
        //if (chart != null) {
        //    chart.dispose();
        //    chart = nul;
        //}

        //绘制图表
        chart = echarts.init(document.getElementById('autodatachart'));//实例化图表

        chart.showLoading();
        $.ajax({
            url: servicesurl + "/api/Data/GetDeviceData", type: "get", data: { "id": monitor.id, "type": monitor.type, "cookie": document.cookie },
            success: function (result) {
                if (result == "") {
                    //无数据
                    var option = {
                        title: {
                            text: monitor.title + '无数据'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: {
                            left: '1%',
                            right: '1%',
                            bottom: '1%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                //保存图片
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: []
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name: '',
                                type: 'line',
                                stack: '总量',
                                data: []
                            },
                            {
                                name: '',
                                type: 'line',
                                stack: '总量',
                                data: []
                            }
                        ]
                    };

                    chart.hideLoading();
                    chart.setOption(option);
                }
                else {
                    if (monitor.type == "GNSS") {

                        var gnsss = JSON.parse(result);
                        var times = [];
                        var xys = [];
                        var hs = [];

                        for (var i in gnsss) {
                            if (gnsss[i].Flag != "200") {
                                times.push(gnsss[i].Time);
                                xys.push(gnsss[i].Dxy);
                                hs.push(gnsss[i].Dh);
                            }
                        }

                        var option = {
                            title: {
                                text: monitor.title
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: ['平面位移', '垂直位移']
                            },
                            dataZoom: [
                                {   // 这个dataZoom组件，默认控制x轴。
                                    type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                                    start: 50,      // 左边在 10% 的位置。
                                    end: 100         // 右边在 60% 的位置。
                                },
                                {   // 这个dataZoom组件，也控制x轴。
                                    type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
                                    start: 50,      // 左边在 10% 的位置。
                                    end: 100        // 右边在 60% 的位置。
                                }
                            ],
                            grid: {
                                left: '5%',
                                right: '4%',
                                bottom: '3%',
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
                                type: 'value',
                                min: -50,
                                max: 50

                            },
                            series: [
                                {
                                    name: '平面位移',
                                    type: 'line',
                                    stack: '总量',
                                    data: xys
                                },
                                {
                                    name: '垂直位移',
                                    type: 'line',
                                    stack: '总量',
                                    data: hs
                                }
                            ]
                        };

                    }
                    else if (monitor.type == "裂缝") {
                        var lfs = JSON.parse(result);
                        var times = [];
                        var values = [];

                        for (var i in lfs) {
                            if (lfs[i].Flag != "200") {
                                times.push(lfs[i].Time);
                                values.push(lfs[i].Dv);
                            }
                        }

                        var option = {
                            title: {
                                text: monitor.title
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: ['位移']
                            },
                            dataZoom: [
                                {
                                    type: 'slider',
                                    start: 50,
                                    end: 100
                                },
                                {
                                    type: 'inside',
                                    start: 50,
                                    end: 100
                                }
                            ],
                            grid: {
                                left: '5%',
                                right: '4%',
                                bottom: '3%',
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
                                    name: '位移',
                                    type: 'line',
                                    stack: '总量',
                                    data: values
                                }
                            ]
                        };
                    }
                    else if (monitor.type == "倾角") {
                        var qjs = JSON.parse(result);
                        var times = [];
                        var xs = [];
                        var ys = [];

                        for (var i in qjs) {
                            if (qjs[i].Flag != "200") {
                                times.push(qjs[i].Time);
                                xs.push(qjs[i].Dx);
                                ys.push(qjs[i].Dy);
                            }
                        }

                        var option = {
                            title: {
                                text: monitor.title
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: ['X方向', 'Y方向']
                            },
                            dataZoom: [
                                {
                                    type: 'slider',
                                    start: 50,
                                    end: 100
                                },
                                {
                                    type: 'inside',
                                    start: 50,
                                    end: 100
                                }
                            ],
                            grid: {
                                left: '5%',
                                right: '4%',
                                bottom: '3%',
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
                                    name: 'X方向',
                                    type: 'line',
                                    stack: '总量',
                                    data: xs
                                },
                                {
                                    name: 'Y方向',
                                    type: 'line',
                                    stack: '总量',
                                    data: ys
                                }
                            ]
                        };



                    }
                    else if (monitor.type == "应力") {
                        var yls = JSON.parse(result);
                        var times = [];
                        var values = [];

                        for (var i in yls) {
                            if (yls[i].Flag != "200") {
                                times.push(yls[i].Time);
                                values.push(yls[i].Dv);
                            }
                        }

                        var option = {
                            title: {
                                text: monitor.title
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: ['位移']
                            },
                            dataZoom: [
                                {
                                    type: 'slider',
                                    start: 50,
                                    end: 100
                                },
                                {
                                    type: 'inside',
                                    start: 50,
                                    end: 100
                                }
                            ],
                            grid: {
                                left: '5%',
                                right: '4%',
                                bottom: '3%',
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
                                    name: '位移',
                                    type: 'line',
                                    stack: '总量',
                                    data: values
                                }
                            ]
                        };
                    }
                    else if (monitor.type == "深部位移") {
                        var sbwys = JSON.parse(result);
                        var times = [];
                        var xs = [];
                        var ys = [];

                        for (var i in sbwys) {
                            times.push(sbwys[i].Time);
                            xs.push(sbwys[i].X);
                            ys.push(sbwys[i].Y);
                        }

                        var option = {
                            title: {
                                text: monitor.title
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: ['X方向位移', 'Y方向位移']
                            },
                            dataZoom: [
                                {   // 这个dataZoom组件，默认控制x轴。
                                    type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                                    start: 50,      // 左边在 10% 的位置。
                                    end: 100         // 右边在 60% 的位置。
                                },
                                {   // 这个dataZoom组件，也控制x轴。
                                    type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
                                    start: 50,      // 左边在 10% 的位置。
                                    end: 100        // 右边在 60% 的位置。
                                }
                            ],
                            grid: {
                                left: '5%',
                                right: '4%',
                                bottom: '3%',
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
                                    name: 'X方向位移',
                                    type: 'line',
                                    stack: '总量',
                                    data: xs
                                },
                                {
                                    name: 'Y方向位移',
                                    type: 'line',
                                    stack: '总量',
                                    data: ys
                                }
                            ]
                        };
                    }
                    else if (monitor.type == "地下水位") {
                        var waters = JSON.parse(result);
                        var times = [];
                        var water = [];

                        for (var i in waters) {
                            times.push(waters[i].Time);
                            water.push(waters[i].Value);
                        }

                        var option = {
                            title: {
                                text: monitor.title
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: ['地下水位']
                            },
                            dataZoom: [
                                {   // 这个dataZoom组件，默认控制x轴。
                                    type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                                    start: 0,      // 左边在 10% 的位置。
                                    end: 100         // 右边在 60% 的位置。
                                },
                                {   // 这个dataZoom组件，也控制x轴。
                                    type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
                                    start: 0,      // 左边在 10% 的位置。
                                    end: 100        // 右边在 60% 的位置。
                                }
                            ],
                            grid: {
                                left: '5%',
                                right: '4%',
                                bottom: '3%',
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
                                    name: '地下水位',
                                    type: 'line',
                                    stack: 'm',
                                    data: water
                                }
                            ]
                        };
                    }
                    else if (monitor.type == "雨量") {
                        var rains = JSON.parse(result);
                        var times = [];
                        var rain = [];

                        for (var i in rains) {
                            times.push(rains[i].Time);
                            rain.push(rains[i].Value);
                        }

                        var option = {
                            title: {
                                text: monitor.title
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: ['降雨量（日）']
                            },
                            dataZoom: [
                                {   // 这个dataZoom组件，默认控制x轴。
                                    type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                                    start: 0,      // 左边在 10% 的位置。
                                    end: 100         // 右边在 60% 的位置。
                                },
                                {   // 这个dataZoom组件，也控制x轴。
                                    type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
                                    start: 0,      // 左边在 10% 的位置。
                                    end: 100        // 右边在 60% 的位置。
                                }
                            ],
                            grid: {
                                left: '5%',
                                right: '4%',
                                bottom: '3%',
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
                                    name: '降雨量',
                                    type: 'bar',
                                    stack: 'mm',
                                    data: rain
                                }
                            ]
                        };
                    }










                    chart.hideLoading();
                    chart.setOption(option, true, false);
                }

            }, datatype: "json"
        });


    }
















}


//监测数据处理
function EditProjectDeviceAutoData(projectid) {
    var monitorArr = {};
    var dataSetid = null;
    var isReloadTree = false;
    //渲染工具
    document.getElementById("editautodatadeviceid").style.visibility = "visible";
    document.getElementById("editautodatapretimeid").style.visibility = "visible";
    document.getElementById("editautodatacustomtimeid").style.visibility = "visible";
    //获取图表
    editChart = echarts.init(document.getElementById('editautodatachartid'));
    editChart.showLoading();
    //加载监测设备
    if (currentprojectmonitors.length > 0) {
        var deviceTypes = currentprojectmonitors[1].children;
        if (deviceTypes.length > 0) {
            for (var i in deviceTypes) {
                for (var j in deviceTypes[i].children) {
                    if (i == 0 && j == 0) {
                        monitorArr.title = deviceTypes[i].children[j].title;
                        monitorArr.type = deviceTypes[i].children[j].type;
                        monitorArr.id = deviceTypes[i].children[j].id;
                        document.getElementById("editautodatadeviceid").innerHTML += '<option  type="' + deviceTypes[i].children[j].type + '" title="' + deviceTypes[i].children[j].title + '" value="' + deviceTypes[i].children[j].id + '" selected>' + deviceTypes[i].children[j].title + '</option>';
                    }
                    else {
                        document.getElementById("editautodatadeviceid").innerHTML += '<option type="' + deviceTypes[i].children[j].type + '" title="' + deviceTypes[i].children[j].title + '" value="' + deviceTypes[i].children[j].id + '">' + deviceTypes[i].children[j].title + '</option>';
                    }

                }
            }
        }
    }

    //预设时间范围
    if (autodatadatetimes.length > 0) {
        for (var i in autodatadatetimes) {
            if (autodatadatetimes[i].name == "今年") {
                document.getElementById("editautodatapretimeid").innerHTML += '<option value="' + autodatadatetimes[i].value + '" selected>' + autodatadatetimes[i].name + '</option>';
            }
            else if (autodatadatetimes[i].name == "上一年") {
                document.getElementById("editautodatapretimeid").innerHTML += '<option value="' + autodatadatetimes[i].value + '">' + autodatadatetimes[i].name + '</option>';
            }
            else if (autodatadatetimes[i].name == "全部") {
                document.getElementById("editautodatapretimeid").innerHTML += '<option value="' + autodatadatetimes[i].value + '">' + autodatadatetimes[i].name + '</option>';
            }
        }
    }

    //切换设备
    form.on('select(editautodatadevicefilter)', function (data) {
        if (data.value != "") {
            monitorArr = {};
            var indexGID = data.elem.selectedIndex;
            monitorArr.title = data.elem[indexGID].title;
            monitorArr.type = $(data.elem).find("option:selected").attr("type");
            monitorArr.id = data.value;
            //加载数据
            LoadEditAutoDataPreDateTime(monitorArr, form.val("editautodataform").editautodatapretime);
        }
    });

    //自定义时间范围
    date.render({
        elem: '#editautodatacustomtimeid'
        , type: 'date'
        , range: true
        , done: function (value, date, endDate) {
            if (value != "") {
                ////按自定义时间范围绘制图表
                LoadEditAutoDataCustomDateTime(monitorArr, valu);
            }
        }
    });
    //预设时间范围切换时间
    form.on('select(editautodatapretimefilter)', function (data) {
        if (data.value != "") {
            ////按预设时间范围绘制图表
            LoadEditAutoDataPreDateTime(monitorArr, data.value);
        }
    });
    //初始加载数据
    LoadEditAutoDataPreDateTime(monitorArr, form.val("editautodataform").editautodatapretime);


    //曲线左侧数据集树（开启复选框）
    tree.render({
        elem: '#editautodatasetid'
        , id: 'editautodatasetid'
        , data: []
        , accordion: false
        , showLine: true
        , showCheckbox: true
        , customCheckbox: true
        , cancelNodeFileIcon: true
        , oncheck: function (obj) {
            //节点选中or取消选中
            if (obj.checked) {
                //选中
                if (obj.data.type == "dataset") {
                    if (dataSetid != null) {
                        if (!isReloadTree) {
                            for (var i in dataSet) {
                                for (var j in dataSet[i].children) {
                                    if (dataSet[i].children[j].id == dataSetid) {
                                        dataSet[i].children[j].checked = false;
                                    }
                                    if (dataSet[i].children[j].id == obj.data.id) {
                                        dataSet[i].children[j].checked = true;
                                    }
                                }
                            }
                            dataSetid = obj.data.id;
                            isReloadTree = true;//标记重载
                            tree.reload('editautodatasetid', { data: dataSet });
                            isReloadTree = false;//重载后还原
                        }
                    }
                    else {
                        for (var i in dataSet) {
                            for (var j in dataSet[i].children) {
                                if (dataSet[i].children[j].id == obj.data.id) {
                                    dataSet[i].children[j].checked = true;
                                    break;
                                }
                            }
                        }
                        dataSetid = obj.data.id;
                        isReloadTree = true;//标记重载
                        tree.reload('editautodatasetid', { data: dataSet });
                        isReloadTree = false;//重载后还原
                    }
                }

            }
            else {
                //取消选中
                if (obj.data.type == "dataset") {
                    if (!isReloadTree) {
                        for (var i in dataSet) {
                            for (var j in dataSet[i].children) {
                                if (dataSet[i].children[j].id == obj.data.id) {
                                    dataSet[i].children[j].checked = false;
                                    break;
                                }
                            }
                        }
                        isReloadTree = true;//标记重载
                        tree.reload('editautodatasetid', { data: dataSet });
                        isReloadTree = false;//重载后还原
                    }
                }
            }
        }
    });
    var dataSet = [
        {
            title: '目标数据',
            id: 0,
            spread: true,
            children: [
                {
                    title: '原始数据',
                    showCheckbox: true,
                    checked: false,
                    type: "dataset",
                    id: 1
                },
                {
                    title: '修正数据',
                    type: "dataset",
                    showCheckbox: true,
                    checked: false,
                    id: 2
                }
            ]
        },
        {
            title: '历史数据',
            id: 1,
            spread: true,
            children: [
                {
                    title: '2022',
                    type: "dataset",
                    showCheckbox: true,
                    checked: false,
                    id: 3
                },
                {
                    title: '2021',
                    type: "dataset",
                    showCheckbox: true,
                    checked: false,
                    id: 4
                }
            ]

        }
    ];
    tree.reload('editautodatasetid', { data: dataSet });

    ////异常处理模块

    //切换异常处理工具模块
    form.on('select(editabnormaldatatoolfilter)', function (data) {
        if (data.value == "0") {
            document.getElementById("editabnormaldatatooldoc").innerHTML = "<p>&ensp;&ensp;说明：可通过点击拖拽更改按钮，逐个拖拽异常点y值更改数据，也可点击剔除按钮剔除异常数据（剔除包括该时间点所有数据）。</p>";

        }
        else if (data.value == "1") {
            ///按时间范围选择
            document.getElementById("editabnormaldatatooldoc").innerHTML = '<p>&ensp;&ensp;说明：可通过X轴游标选择或手动输入欲选时间段，点击剔除按钮，即可删除该时间段数据。</p>';
            document.getElementById("editabnormaldatatoolbodyid").innerHTML = '<!--异常处理工具参数--> <form class="layui-form" lay-filter="editabnormaldataform" style="margin-top:50px"> <div class="layui-form-item "style="text-align:center;"> <div class="layui-inline"><label class="layui-form-label">时间范围：</label> <div class="layui-input-inline"> <input type="text" autocomplete="off" id="editabnormalstarttimeid" name="editabnormalstarttime" class="layui-input" placeholder="开始时间"> </div> <div class="layui-form-mid"> - </div> <div class="layui-input-inline"> <input type="text" autocomplete="off" id="editabnormalendtimeid" name="editabnormalendtime" class="layui-input" placeholder="结束时间"> </div> </div> </div> <div class="layui-form-item" style="margin-top:10px"> <div style="text-align:center"> <button type="submit" class="layui-btn" lay-submit="" lay-filter="editabnormaldataxxsubmit" style="width:120px;border-radius:5px;">剔除</button> </div> </div> </form>';
            //x轴游标取值
            MarkLine();
            ////editChart.setOption({
            ////    xAxis: {
            ////        type: 'time',
            ////        axisPointer: {
            ////            value: '2000-01-01',
            ////            show:true,
            ////            snap: true,
            ////            lineStyle: {
            ////                color: 'red',
            ////                width: 2
            ////            },
            ////            label: {
            ////                show: true,
            ////                formatter: function (params) {
            ////                    $("#editabnormalstarttimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', params.value));
            ////                    return echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', params.value);
            ////                },
            ////                backgroundColor: '#7581BD'
            ////            },
            ////            handle: {
            ////                show: true,
            ////                color: '#7581BD',
            ////                size: 20,
            ////                margin: 35
            ////            }
            ////        },
            ////        splitLine: {
            ////            show: false
            ////        }
            ////    },
            ////    yAxis: {
            ////        type: 'value',
            ////        axisPointer: {
            ////            value: '0',
            ////            show:false,
            ////            snap: false,
            ////            lineStyle: {
            ////                color: 'red',
            ////                width: 2
            ////            },
            ////            label: {
            ////                show: true,
            ////                formatter: function (params) {
            ////                    return params.value;
            ////                },
            ////                backgroundColor: '#7581BD'
            ////            },
            ////            handle: {
            ////                show: true,
            ////                color: '#7581BD',
            ////                size: 20,
            ////                margin: 65
            ////            }
            ////        },
            ////        splitLine: {
            ////            show: false
            ////        }
            ////    },
            ////});
        }
        else if (data.value == "2") {
            ///按值域范围选择
            document.getElementById("editabnormaldatatooldoc").innerHTML = '<p>&ensp;&ensp;说明：可通过Y轴游标选择或手动输入欲选值域范围，点击剔除按钮，即可剔除该值域范围的数据。</p>';
            document.getElementById("editabnormaldatatoolbodyid").innerHTML = '<!--异常处理工具参数--> <form class="layui-form" lay-filter="editabnormaldataform" style="margin-top:50px"> <div class="layui-form-item "style="text-align:center;"> <div class="layui-inline"><label class="layui-form-label">值域范围：</label> <div class="layui-input-inline"> <input type="text" autocomplete="off" id="editabnormalstartvalueid" name="editabnormalstartvalue" class="layui-input" placeholder="最小值"> </div> <div class="layui-form-mid"> - </div> <div class="layui-input-inline"> <input type="text" autocomplete="off" id="editabnormalendvalueid" name="editabnormalendvalue" class="layui-input" placeholder="最大值"> </div> </div> </div> <div class="layui-form-item" style="margin-top:10px"> <div style="text-align:center"> <button type="submit" class="layui-btn" lay-submit="" lay-filter="editabnormaldatayysubmit" style="width:120px;border-radius:5px;">剔除</button> </div> </div> </form>';
            //y轴游标取值

        }
        else if (data.value == "3") {
            ///多条件选择
            document.getElementById("editabnormaldatatooldoc").innerHTML = '<p>&ensp;&ensp;说明：可通过X轴游标和Y轴游标选择或手动输入欲选时间段和值域范围的数据，点击剔除按钮，即可剔除所选数据。</p>';
            document.getElementById("editabnormaldatatoolbodyid").innerHTML = '<!--异常处理工具参数--> <form class="layui-form" lay-filter="editabnormaldataform" style="margin-top:25px"> <div class="layui-form-item "style="text-align:center;"> <div class="layui-inline"><label class="layui-form-label">时间范围：</label> <div class="layui-input-inline"> <input type="text" autocomplete="off" id="editabnormalstarttimeid" name="editabnormalstarttime" class="layui-input" placeholder="开始时间"> </div> <div class="layui-form-mid"> - </div> <div class="layui-input-inline"> <input type="text" autocomplete="off" id="editabnormalendtimeid" name="editabnormalendtime" class="layui-input" placeholder="结束时间"> </div> </div> </div> <div class="layui-form-item "style="text-align:center;"> <div class="layui-inline"><label class="layui-form-label">值域范围：</label> <div class="layui-input-inline"> <input type="text" autocomplete="off" id="editabnormalstartvalueid" name="editabnormalstartvalue" class="layui-input" placeholder="最小值"> </div> <div class="layui-form-mid"> - </div> <div class="layui-input-inline"> <input type="text" autocomplete="off" id="editabnormalendvalueid" name="editabnormalendvalue" class="layui-input" placeholder="最大值"> </div> </div> </div> <div class="layui-form-item" style="margin-top:10px"> <div style="text-align:center"> <button type="submit" class="layui-btn" lay-submit="" lay-filter="editabnormaldataxysubmit" style="width:120px;border-radius:5px;">剔除</button> </div> </div> </form>';
            //xy轴游标取值
            editChart.setOption({
                xAxis: {
                    type: 'time',
                    axisPointer: {
                        value: '2000-01-01',
                        show: true,
                        snap: true,
                        lineStyle: {
                            color: 'red',
                            width: 2
                        },
                        label: {
                            show: true,
                            formatter: function (params) {
                                $("#editabnormalstarttimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', params.value));
                                return echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', params.value);
                            },
                            backgroundColor: '#7581BD'
                        },
                        handle: {
                            show: true,
                            color: '#7581BD',
                            size: 20,
                            margin: 35
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    axisPointer: {
                        value: '-10000',
                        show: true,
                        snap: false,
                        lineStyle: {
                            color: 'red',
                            width: 2
                        },
                        label: {
                            show: true,
                            formatter: function (params) {
                                var value = Number(params.value).toFixed(2);
                                $("#editabnormalstartvalueid").val(value);
                                return value;
                            },
                            backgroundColor: '#7581BD'
                        },
                        handle: {
                            show: true,
                            color: '#7581BD',
                            size: 20,
                            margin: 65
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
            });
        }
        //x轴
        $('#editabnormalstarttimeid').focus(function () {
            //x轴游标取值
            editChart.setOption({
                xAxis: {
                    type: 'time',
                    axisPointer: {
                        value: '2000-01-01',
                        show: true,
                        snap: true,
                        lineStyle: {
                            color: 'red',
                            width: 2
                        },
                        label: {
                            show: true,
                            formatter: function (params) {
                                $("#editabnormalstarttimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', params.value));
                                return echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', params.value);
                            },
                            backgroundColor: '#7581BD'
                        },
                        handle: {
                            show: true,
                            color: '#7581BD',
                            size: 20,
                            margin: 35
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
            });

        });
    });




    ////粗差剔除模块
    ////设置初值模块
    ////插补数据模块
    ////监测曲线模块
    form.render();
    form.render('select');
}

function LoadEditAutoDataPreDateTime(monitorArr, datetime) {
    editChart.showLoading();
    //请求监测点指点时间范围数据
    $.ajax({
        url: servicesurl + "/api/Data/GetAutoDatabyPreDateTime", type: "get", data: { "id": monitorArr.id, "type": monitorArr.type, "predatetime": datetime, "cookie": document.cookie },
        success: function (data) {
            DisplayEditDATA(monitorArr, data)
        }, datatype: "json"
    });

};

function LoadEditAutoDataCustomDateTime(monitorArr, datetime) {
    editChart.showLoading();
    //请求监测点指点时间范围数据
    $.ajax({
        url: servicesurl + "/api/Data/GetAutoDatabyCustomDateTime", type: "get", data: { "id": monitorArr.id, "type": monitorArr.type, "customdatetime": datetime, "cookie": document.cookie },
        success: function (data) {
            DisplayEditDATA(monitorArr, data);
        }, datatype: "json"
    });
};


//展示处理数据
function DisplayEditDATA(monitor, data) {
    if (data == "") {
        layer.msg('无监测数据！', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

        EditNODATA(monitor);
    }
    else {
        if (monitor.type == "GNSS") {
            DisplayEditGNSS(monitor, data);
        }
        else if (monitor.type == "裂缝") {
            DisplayEditLF(monitor, data);
        }
        else if (monitor.type == "倾角") {
            DisplayEditQJ(monitor, data);
        }
        else if (monitor.type == "应力") {
            DisplayEditYL(monitor, data);
        }
        else if (monitor.type == "深部位移") {
            DisplayEditSBWY(monitor, data);
        }
        else if (monitor.type == "地下水位") {
            DisplayEditWATER(monitor, data);
        }
        else if (monitor.type == "雨量") {
            DisplayEditRAIN(monitor, data);
        }
    }

};

function DisplayEditGNSS(monitor, data) {
    var gnssmonitors = JSON.parse(data);
    //统计
    var values = [];
    for (var i in gnssmonitors.Statistics) {
        values.push(parseFloat(gnssmonitors.Statistics[i].Min));
        values.push(parseFloat(gnssmonitors.Statistics[i].Max));
    }

    var yaxismax = parseInt(2 * Math.max.apply(null, values) - Math.min.apply(null, values));
    var yaxismin = parseInt(2 * Math.min.apply(null, values) - Math.max.apply(null, values));

    //图表
    var xs = [];
    var ys = [];
    var xys = [];
    var hs = [];

    for (var i in gnssmonitors.Datas) {
        //yyyy-MM-dd HH:mm:ss转UNIX时间戳（毫秒）
        var time = Math.round(new Date(gnssmonitors.Datas[i].Time) / 1000) * 1000;

        var x = [];
        var y = [];
        var xy = [];
        var h = [];

        x.push(time);
        x.push(parseInt(parseFloat(gnssmonitors.Datas[i].Dx) * 1000) / 1000);
        xs.push(x);

        y.push(time);
        y.push(parseInt(parseFloat(gnssmonitors.Datas[i].Dy) * 1000) / 1000);
        ys.push(y);

        xy.push(time);
        xy.push(parseInt(parseFloat(gnssmonitors.Datas[i].Dxy) * 1000) / 1000);
        xys.push(xy);

        h.push(time);
        h.push(parseInt(parseFloat(gnssmonitors.Datas[i].Dh) * 1000) / 1000);
        hs.push(h);
    }
    //标示线初值
    threshold1 = yaxismin;
    threshold2 = yaxismax;
    threshold3 = xs[0][0];
    threshold4 = xs[xs.length - 1][0];

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
        legend: {
            data: ['X位移', 'Y位移', '水平位移', '垂直位移'],
            left: 'center',
            bottom: 2,
            selectedMode: "single",
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(105,105,105)',
            formatter: function (params) {
                var date = new Date(parseInt(params[0].value[0]));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                var h = date.getHours();
                var mm = date.getMinutes();
                var s = date.getSeconds();
                var time = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s);
                var label = "";
                for (var i in params) {
                    label += params[i].marker + params[i].seriesName + ':' + params[i].value[1] + 'mm<br/>';
                }
                return time + '<br/>' + label;
            },
            position: function (pos, params, el, elRect, size) {
                var obj = { top: 15 };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                return obj;
            },
            extraCssText: 'width: 170px'
        },
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
            id: '1',
            type: 'time',
            position: 'bottom',
            splitLine: { show: false },
            axisLabel: {
                formatter: function (params, index) {
                    var time = new Date(params);
                    var y = time.getFullYear();
                    var m = time.getMonth() + 1;
                    var d = time.getDate();
                    var h = time.getHours();
                    var mm = time.getMinutes();
                    var s = time.getSeconds();
                    //return (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s) + '\n' + y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                }
            }
        },
        yAxis: {
            id: '1',
            type: 'value',
            name: 'mm',
            max: Math.ceil(yaxismax),
            min: Math.floor(yaxismin),
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            //axisLabel: {
            //    formatter: '{value} mm'
            //}
        },
        dataZoom: [
            {
                //x轴滑块
                type: 'slider',
                height: 15,
                xAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                //y轴滑块
                type: 'slider',
                width: 15,
                yAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                //x轴缩放
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                //y轴缩放
                type: 'inside',
                yAxisIndex: 0,
                filterMode: 'empty'
            }
        ],
        series: [
            {
                id: 'x',
                name: 'X位移',
                type: 'line',
                showSymbol: false,
                data: xs,
            },
            {
                name: 'Y位移',
                type: 'line',
                showSymbol: false,
                data: ys
            },
            {
                name: '水平位移',
                type: 'line',
                showSymbol: false,
                data: xys
            },
            {
                name: '垂直位移',
                type: 'line',
                showSymbol: false,
                data: hs
            }
        ]
    };

    editChart.hideLoading();
    editChart.setOption(option, true, false);

}

function DisplayEditLF(monitor, data) {
    var lfmonitors = JSON.parse(data);
    //图表
    var lens = [];
    for (var i in lfmonitors.Datas) {
        var len = [];

        len.push(Math.round(new Date(lfmonitors.Datas[i].Time) / 1000) * 1000);
        len.push(parseFloat(lfmonitors.Datas[i].Dv));
        lens.push(len);
    }
    //标示线初值
    threshold1 = lens[5][1];
    threshold2 = lens[lens.length - 5][1];
    threshold3 = lens[5][0];
    threshold4 = lens[lens.length - 5][0];

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
        legend: {
            data: ['变形量'],
            left: 'center',
            bottom: 2,
            selectedMode: "single",
        },
        tooltip: {
            triggerOn: 'none',
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            backgroundColor: 'rgba(105 105 105)',
            formatter: function (params) {
                var date = new Date(parseInt(params[0].value[0]));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                var h = date.getHours();
                var mm = date.getMinutes();
                var s = date.getSeconds();
                var time = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s);
                var label = "";
                for (var i in params) {
                    label += params[i].marker + params[i].seriesName + ':' + params[i].value[1] + 'mm<br/>';
                }
                return time + '<br/>' + label;
            },
            position: function (pos, params, el, elRect, size) {
                var obj = { top: 10 };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                return obj;
            },
            extraCssText: 'width: 170px'
        },
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
            id: '1',
            type: 'time',
            position: 'bottom',
            splitLine: { show: false },
            axisLabel: {
                formatter: function (params, index) {
                    var time = new Date(params);
                    var y = time.getFullYear();
                    var m = time.getMonth() + 1;
                    var d = time.getDate();
                    var h = time.getHours();
                    var mm = time.getMinutes();
                    var s = time.getSeconds();
                    //return (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s) + '\n' + y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                }
            }
        },
        yAxis: {
            id: '1',
            type: 'value',
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            axisLabel: {
                formatter: '{value} mm'
            }
        },
        dataZoom: [{
            //x轴滑块
            type: 'slider',
            height: 15,
            xAxisIndex: 0,
            filterMode: 'empty'
        },
        {
            //y轴滑块
            type: 'slider',
            width: 15,
            yAxisIndex: 0,
            filterMode: 'empty'
        },
        {
            //x轴缩放
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'empty'
        },
        {
            //y轴缩放
            type: 'inside',
            yAxisIndex: 0,
            filterMode: 'empty'
        }
        ],
        series: [
            {
                id: 'x',
                name: '变形量',
                type: 'line',
                showSymbol: false,
                data: lens
            }
        ]
    };

    editChart.hideLoading();
    editChart.setOption(option, true, false);

}

function DisplayEditQJ(monitor, data) {
    var qjmonitors = JSON.parse(data);

    var values = [];
    for (var i in qjmonitors.Statistics) {
        values.push(parseFloat(qjmonitors.Statistics[i].Min));
        values.push(parseFloat(qjmonitors.Statistics[i].Max));
    }
    var yaxismax = 2 * Math.max.apply(null, values) - Math.min.apply(null, values);
    var yaxismin = 2 * Math.min.apply(null, values) - Math.max.apply(null, values);

    //倾角角度较小
    if (yaxismax > 0) {
        if (parseInt(yaxismax) == 0) {
            yaxismax = 1;
        }
    }
    else {
        if (parseInt(yaxismax) == 0) {
            yaxismax = 0;
        }
    }

    if (yaxismin > 0) {
        if (parseInt(yaxismin) == 0) {
            yaxismin = 0;
        }
    }
    else {
        if (parseInt(yaxismin) == 0) {
            yaxismin = -1;
        }
    }

    if (yaxismax > 1) {
        yaxismax = parseInt(yaxismax) + 1;
    }

    if (yaxismin < -1) {
        yaxismin = parseInt(yaxismin) - 1;
    }


    //图表
    var xs = [];
    var ys = [];
    var zs = [];

    for (var i in qjmonitors.Datas) {
        var x = [];
        var y = [];

        x.push(Math.round(new Date(qjmonitors.Datas[i].Time) / 1000) * 1000);
        x.push(parseFloat(qjmonitors.Datas[i].Dx));
        xs.push(x);

        y.push(Math.round(new Date(qjmonitors.Datas[i].Time) / 1000) * 1000);
        y.push(parseFloat(qjmonitors.Datas[i].Dy));
        ys.push(y);
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
        legend: {
            data: ['X方向角度', 'Y方向角度'],
            left: 'center',
            bottom: 2,
            selectedMode: "single",
        },
        tooltip: {
            triggerOn: 'none',
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            backgroundColor: 'rgba(105 105 105)',
            formatter: function (params) {
                var date = new Date(parseInt(params[0].value[0]));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                var h = date.getHours();
                var mm = date.getMinutes();
                var s = date.getSeconds();
                var time = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s);
                var label = "";
                for (var i in params) {
                    label += params[i].marker + params[i].seriesName + ':' + params[i].value[1] + 'mm<br/>';
                }
                return time + '<br/>' + label;
            },
            position: function (pos, params, el, elRect, size) {
                var obj = { top: 10 };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                return obj;
            },
            extraCssText: 'width: 170px'
        },
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
            id: '1',
            type: 'time',
            splitLine: { show: false },
            axisLabel: {
                formatter: function (params, index) {
                    var time = new Date(params);
                    var y = time.getFullYear();
                    var m = time.getMonth() + 1;
                    var d = time.getDate();
                    var h = time.getHours();
                    var mm = time.getMinutes();
                    var s = time.getSeconds();
                    //return (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s) + '\n' + y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                }
            }
        },
        yAxis: {
            id: '1',
            type: 'value',
            min: Math.floor(yaxismin),
            max: Math.ceil(yaxismax),
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            axisLabel: {
                formatter: '{value} °'
            }
        },
        dataZoom: [{
            //x轴滑块
            type: 'slider',
            height: 15,
            xAxisIndex: 0,
            filterMode: 'empty'
        },
        {
            //y轴滑块
            type: 'slider',
            width: 15,
            yAxisIndex: 0,
            filterMode: 'empty'
        },
        {
            //x轴缩放
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'empty'
        },
        {
            //y轴缩放
            type: 'inside',
            yAxisIndex: 0,
            filterMode: 'empty'
        }
        ],
        series: [
            {
                id: 'x',
                name: 'X方向角度',
                type: 'line',
                showSymbol: false,
                data: xs
            },
            {
                name: 'Y方向角度',
                type: 'line',
                showSymbol: false,
                data: ys
            }
        ]
    };
    editChart.hideLoading();
    editChart.setOption(option, true, false);
};

function DisplayEditYL(monitor, data) {
    var ylmonitors = JSON.parse(data);

    //统计
    var avgs = [];
    var sds = [];
    for (var i in ylmonitors.Statistics) {
        avgs.push(parseFloat(ylmonitors.Statistics[i].Avg));
        sds.push(parseFloat(ylmonitors.Statistics[i].Sd));
    }
    var yaxismax = parseInt(GetArrayAvg(avgs) + 12 * GetArrayAvg(sds)) + 1;
    var yaxismin = parseInt(GetArrayAvg(avgs) - 12 * GetArrayAvg(sds)) - 1;

    //图表
    var ps = [];
    for (var i in ylmonitors.Datas) {
        var p = [];

        p.push(Math.round(new Date(ylmonitors.Datas[i].Time) / 1000) * 1000);
        p.push(parseFloat(ylmonitors.Datas[i].Dv));
        ps.push(p);
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
        legend: {
            data: ['应力变形量'],
            left: 'center',
            bottom: 2,
            selectedMode: "single",
        },
        tooltip: {
            triggerOn: 'none',
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            backgroundColor: 'rgba(105 105 105)',
            formatter: function (params) {
                var date = new Date(parseInt(params[0].value[0]));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                var h = date.getHours();
                var mm = date.getMinutes();
                var s = date.getSeconds();
                var time = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s);
                var label = "";
                for (var i in params) {
                    label += params[i].marker + params[i].seriesName + ':' + params[i].value[1] + 'mm<br/>';
                }
                return time + '<br/>' + label;
            },
            position: function (pos, params, el, elRect, size) {
                var obj = { top: 10 };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                return obj;
            },
            extraCssText: 'width: 170px'
        },
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
            id: '1',
            type: 'time',
            splitLine: { show: false },
            axisLabel: {
                formatter: function (params, index) {
                    var time = new Date(params);
                    var y = time.getFullYear();
                    var m = time.getMonth() + 1;
                    var d = time.getDate();
                    var h = time.getHours();
                    var mm = time.getMinutes();
                    var s = time.getSeconds();
                    //return (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s) + '\n' + y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                }
            }
        },
        yAxis: {
            id: '1',
            type: 'value',
            min: Math.floor(yaxismin),
            max: Math.ceil(yaxismax),
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            axisLabel: {
                formatter: '{value} kN'
            }
        },
        dataZoom: [{
            //x轴滑块
            type: 'slider',
            height: 15,
            xAxisIndex: 0,
            filterMode: 'empty'
        },
        {
            //y轴滑块
            type: 'slider',
            width: 15,
            yAxisIndex: 0,
            filterMode: 'empty'
        },
        {
            //x轴缩放
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'empty'
        },
        {
            //y轴缩放
            type: 'inside',
            yAxisIndex: 0,
            filterMode: 'empty'
        }
        ],
        series: [
            {
                id: 'x',
                name: '应力变形量',
                type: 'line',
                showSymbol: false,
                data: ps
            }
        ]
    };

    editChart.hideLoading();
    editChart.setOption(option, true, false);

};

function DisplayEditSBWY(monitor, data) {
    var sbwymonitors = JSON.parse(data);

    //统计
    var values = [];
    for (var i in sbwymonitors.Statistics) {
        values.push(parseFloat(sbwymonitors.Statistics[i].Min));
        values.push(parseFloat(sbwymonitors.Statistics[i].Max));
    }
    var yaxismax = Math.floor(parseFloat(2 * Math.max.apply(null, values) - Math.min.apply(null, values)) * 100) / 100;
    var yaxismin = Math.floor(parseFloat(2 * Math.min.apply(null, values) - Math.max.apply(null, values)) * 100) / 100;

    //图表
    var xs = [];
    var ys = [];
    var zs = [];

    for (var i in sbwymonitors.Datas) {
        var x = [];
        var y = [];

        x.push(Math.round(new Date(sbwymonitors.Datas[i].Time) / 1000) * 1000);
        x.push(parseFloat(sbwymonitors.Datas[i].X));
        xs.push(x);

        y.push(Math.round(new Date(sbwymonitors.Datas[i].Time) / 1000) * 1000);
        y.push(parseFloat(sbwymonitors.Datas[i].Y));
        ys.push(y);
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
        legend: {
            data: ['X方向位移', 'Y方向位移'],
            left: 'center',
            bottom: 2,
            selectedMode: "single",
        },
        tooltip: {
            triggerOn: 'none',
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            backgroundColor: 'rgba(105 105 105)',
            formatter: function (params) {
                var date = new Date(parseInt(params[0].value[0]));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                var h = date.getHours();
                var mm = date.getMinutes();
                var s = date.getSeconds();
                var time = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s);
                var label = "";
                for (var i in params) {
                    label += params[i].marker + params[i].seriesName + ':' + params[i].value[1] + 'mm<br/>';
                }
                return time + '<br/>' + label;
            },
            position: function (pos, params, el, elRect, size) {
                var obj = { top: 10 };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                return obj;
            },
            extraCssText: 'width: 170px'
        },
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
            id: '1',
            type: 'time',
            splitLine: { show: false },
            axisLabel: {
                formatter: function (params, index) {
                    var time = new Date(params);
                    var y = time.getFullYear();
                    var m = time.getMonth() + 1;
                    var d = time.getDate();
                    var h = time.getHours();
                    var mm = time.getMinutes();
                    var s = time.getSeconds();
                    //return (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s) + '\n' + y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                }
            }
        },
        yAxis: {
            id: '1',
            type: 'value',
            min: Math.floor(yaxismin),
            max: Math.ceil(yaxismax),
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            axisLabel: {
                formatter: '{value} mm'
            }
        },
        dataZoom: [{
            //x轴滑块
            type: 'slider',
            height: 15,
            xAxisIndex: 0,
            filterMode: 'empty'
        },
        {
            //y轴滑块
            type: 'slider',
            width: 15,
            yAxisIndex: 0,
            filterMode: 'empty'
        },
        {
            //x轴缩放
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'empty'
        },
        {
            //y轴缩放
            type: 'inside',
            yAxisIndex: 0,
            filterMode: 'empty'
        }
        ],
        series: [
            {
                id: 'x',
                name: 'X方向位移',
                type: 'line',
                showSymbol: false,
                data: xs
            },
            {
                name: 'Y方向位移',
                type: 'line',
                showSymbol: false,
                data: ys
            }
        ]
    };

    editChart.hideLoading();
    editChart.setOption(option, true, false);
};
//地下水位是否需要处理
function DisplayEditWATER(monitor, data) {
    var watermonitors = JSON.parse(data);

    var waters = [];
    for (var i in watermonitors.Datas) {
        var time = Math.round(new Date(watermonitors.Datas[i].Time) / 1000) * 1000;
        var water = [];

        water.push(time);
        water.push(parseFloat(watermonitors.Datas[i].Value));
        waters.push(water);
    }

    var top = Math.floor(parseFloat(watermonitors.Height) * 100) / 100;//孔口高程
    var down = Math.floor((parseFloat(watermonitors.Height) - parseFloat(watermonitors.Deep)) * 100) / 100;//孔底高程

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
            triggerOn: 'none',
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            backgroundColor: 'rgba(105 105 105)',
            formatter: function (params) {
                var date = new Date(parseInt(params[0].value[0]));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                var h = date.getHours();
                var mm = date.getMinutes();
                var s = date.getSeconds();
                var time = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s);
                var label = "";
                for (var i in params) {
                    label += params[i].marker + params[i].seriesName + ':' + params[i].value[1] + 'mm<br/>';
                }
                return time + '<br/>' + label;
            },
            position: function (pos, params, el, elRect, size) {
                var obj = { top: 10 };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                return obj;
            },
            extraCssText: 'width: 170px'
        },
        legend: {
            data: ['地下水位'],
            left: 'center',
            bottom: 2,
            selectedMode: "single",
        },
        dataZoom: [
            {
                //x轴滑块
                type: 'slider',
                height: 15,
                xAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                //y轴滑块
                type: 'slider',
                width: 15,
                yAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                //x轴缩放
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                //y轴缩放
                type: 'inside',
                yAxisIndex: 0,
                filterMode: 'empty'
            }
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
            id: '1',
            type: 'time',
            splitLine: { show: false },
            axisLabel: {
                formatter: function (params, index) {
                    var time = new Date(params);
                    var y = time.getFullYear();
                    var m = time.getMonth() + 1;
                    var d = time.getDate();
                    var h = time.getHours();
                    var mm = time.getMinutes();
                    var s = time.getSeconds();
                    //return (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s) + '\n' + y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                }
            }
        },
        yAxis: {
            id: '1',
            type: 'value',
            min: Math.floor(down),
            max: Math.ceil(top),
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            axisLabel: {
                formatter: '{value} m'
            }
        },
        series: [
            {
                id: 'x',
                name: '地下水位',
                type: 'line',
                smooth: true,
                symbol: 'none',
                itemStyle: {
                    color: 'rgb(135,206,250)'
                },
                sampling: 'average',
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(135,206,250)'
                    }, {
                        offset: 1,
                        color: 'rgb(30,144,255)'
                    }])
                },
                data: waters
            }
        ]
    };

    editChart.hideLoading();
    editChart.setOption(option, true, false);
};
//雨量是否需要处理
function DisplayEditRAIN(monitor, data) {
    var rainmonitors = JSON.parse(data);
    var rains = [];
    for (var i in rainmonitors) {
        var time = Math.round(new Date(rainmonitors[i].Time + " 12:00:00") / 1000) * 1000;
        var rain = [];

        rain.push(time);
        rain.push(parseFloat(rainmonitors[i].Value));
        rains.push(rain);
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
            triggerOn: 'none',
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            backgroundColor: 'rgba(105 105 105)',
            formatter: function (params) {
                var date = new Date(parseInt(params[0].value[0]));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                var h = date.getHours();
                var mm = date.getMinutes();
                var s = date.getSeconds();
                var time = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s);
                var label = "";
                for (var i in params) {
                    label += params[i].marker + params[i].seriesName + ':' + params[i].value[1] + 'mm<br/>';
                }
                return time + '<br/>' + label;
            },
            position: function (pos, params, el, elRect, size) {
                var obj = { top: 10 };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                return obj;
            },
            extraCssText: 'width: 170px'
        },
        legend: {
            data: ['降雨量(日)'],
            left: 'center',
            bottom: 2,
            selectedMode: "single",
        },
        dataZoom: [
            {
                //x轴滑块
                type: 'slider',
                height: 15,
                xAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                //y轴滑块
                type: 'slider',
                width: 15,
                yAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                //x轴缩放
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'empty'
            },
            {
                //y轴缩放
                type: 'inside',
                yAxisIndex: 0,
                filterMode: 'empty'
            }
        ],
        grid: {
            left: '3%',
            right: '3%',
            top: '10%',
            bottom: '15%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            id: '1',
            type: 'time',
            splitLine: { show: false },
            axisLabel: {
                formatter: function (params, index) {
                    var time = new Date(params);
                    var y = time.getFullYear();
                    var m = time.getMonth() + 1;
                    var d = time.getDate();
                    var h = time.getHours();
                    var mm = time.getMinutes();
                    var s = time.getSeconds();
                    //return (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s) + '\n' + y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                }
            }
        },
        yAxis: {
            id: '1',
            type: 'value',
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            axisLabel: {
                formatter: '{value} mm'
            }
        },
        series: [
            {
                id: 'x',
                name: '降雨量(日)',
                type: 'bar',
                itemStyle: {
                    color: '#4cabce'
                },
                showSymbol: false,
                data: rains
            }
        ]
    };

    editChart.hideLoading();
    editChart.setOption(option, true, false);
};

function MarkLine() {
    UpdataDragging();
    editChart.on('datazoom', function (params) {
        threshold1 = editChart.getOption().dataZoom[1].startValue;
        threshold2 = editChart.getOption().dataZoom[1].endValue;
        threshold3 = editChart.getOption().dataZoom[0].startValue;
        threshold4 = editChart.getOption().dataZoom[0].endValue;
        UpdataDragging();
    });
    function UpdataDragging() {
        editChart.setOption({
            series: [{
                id: 'x',
                markLine: {
                    itemStyle: {
                        normal: {
                            borderWidth: 1,
                            lineStyle: {
                                type: 'dash',
                                color: '#333 ',
                                width: 1,
                            },
                            label: {
                                position: 'start',
                                distance: [-100, -100],
                                backgroundColor: 'rgba(105,105,105)',
                                textStyle: {
                                    fontSize: 15,
                                    color: 'white',
                                    padding: [4, 4, 4, 4]
                                },
                                formatter: function (params, index) {
                                    if (params.data.yAxis != undefined) {
                                        return params.data.yAxis.toFixed(2);
                                    }
                                    else if (params.data.xAxis != undefined) {
                                        var date = new Date(params.data.xAxis);
                                        var y = date.getFullYear();
                                        var m = date.getMonth() + 1;
                                        var d = date.getDate();
                                        var h = date.getHours();
                                        var mm = date.getMinutes();
                                        var s = date.getSeconds();
                                        var time = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s);
                                        return time;
                                    }
                                }
                            }
                        },
                    }
                    ,
                    data: [
                        { yAxis: threshold1 },
                        { yAxis: threshold2 },
                        { xAxis: threshold3 },
                        { xAxis: threshold4 },
                    ],
                }
            }],
            graphic: [{
                id: '1',
                type: 'rect',
                z: 100,
                shape: {
                    width: 1000,
                    height: 2
                    // r: 10
                },
                position: [0, editChart.convertToPixel({ yAxisId: '1' }, threshold1)],
                draggable: true,
                style: {
                    fill: 'rgba(0,0,0,0 )',
                    stroke: 'rgba(0,0,0,0)',
                    lineWidth: 10
                },
                cursor: 'move',
                ondrag: onPointDragging1
            },
            {
                id: '2',
                type: 'rect',
                z: 100,
                shape: {
                    width: 1000,
                    height: 2
                    // r: 10
                },
                position: [0, editChart.convertToPixel({ yAxisId: '1' }, threshold2)],
                draggable: true,
                style: {
                    fill: 'rgba(0,0,0,0)',
                    stroke: 'rgba(0,0,0,0)',
                    lineWidth: 20
                },
                cursor: 'move',
                ondrag: onPointDragging2
            },
            {
                id: '3',
                type: 'rect',
                z: 100,
                shape: {
                    width: 2,
                    height: 1000
                    // r: 10
                },
                position: [editChart.convertToPixel({ xAxisId: '1' }, threshold3), 0],
                draggable: true,
                style: {
                    fill: 'rgba(0,0,0,0)',
                    stroke: 'rgba(0,0,0,0)',
                    lineWidth: 10
                },
                cursor: 'move',
                ondrag: onPointDragging3
            },
            {
                id: '4',
                type: 'rect',
                z: 100,
                shape: {
                    width: 2,
                    height: 1000
                    // r: 10
                },
                position: [editChart.convertToPixel({ xAxisId: '1' }, threshold4), 0],
                draggable: true,
                style: {
                    fill: 'rgba(0,0,0,0)',
                    stroke: 'rgba(0,0,0,0)',
                    lineWidth: 10
                },
                cursor: 'move',
                ondrag: onPointDragging4
            },
            ],
        });
    }
    function onPointDragging1() {
        threshold1 = editChart.convertFromPixel({ yAxisId: '1' }, this.position[1]);
        $("#editabnormalstartvalueid").val(threshold1);
        editChart.setOption({
            series: [{
                markLine: {
                    data: [
                        { yAxis: threshold1 },
                        { yAxis: threshold2 },
                        { xAxis: threshold3 },
                        { xAxis: threshold4 },
                    ],
                }
            }]
        });
    }
    function onPointDragging2() {
        threshold2 = editChart.convertFromPixel({ yAxisId: '1' }, this.position[1]);
        $("#editabnormalendvalueid").val(threshold2);
        editChart.setOption({
            series: [{
                markLine: {
                    data: [
                        { yAxis: threshold1 },
                        { yAxis: threshold2 },
                        { xAxis: threshold3 },
                        { xAxis: threshold4 },
                    ],
                }
            }]
        });
    }
    function onPointDragging3() {
        threshold3 = editChart.convertFromPixel({ xAxisId: '1' }, this.position[0]);
        $("#editabnormalstarttimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', threshold3));
        editChart.setOption({
            series: [{
                markLine: {
                    data: [
                        { yAxis: threshold1 },
                        { yAxis: threshold2 },
                        { xAxis: threshold3 },
                        { xAxis: threshold4 },
                    ],
                }
            }]
        });
    }
    function onPointDragging4() {
        threshold4 = editChart.convertFromPixel({ xAxisId: '1' }, this.position[0]);
        $("#editabnormalendtimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', threshold4));
        editChart.setOption({
            series: [{
                markLine: {
                    data: [
                        { yAxis: threshold1 },
                        { yAxis: threshold2 },
                        { xAxis: threshold3 },
                        { xAxis: threshold4 },
                    ],
                }
            }]
        });
    }


}

//获取项目监测点
function getBianXingLiangData(projectid) {


   
                //渲染工具栏
                document.getElementById("bianXingDatapretimeid").style.visibility = "visible";
                document.getElementById("bianXingDatacustomtimeid").style.visibility = "visible";
          
                //自动化监测数据时间范围（预设）
                if (autodatadatetimes.length > 0) {
                    for (var i in autodatadatetimes) {
                        if (autodatadatetimes[i].name == "今日") {
                            document.getElementById("bianXingDatapretimeid").innerHTML += '<option value="' + autodatadatetimes[i].value + '" selected>' + autodatadatetimes[i].name + '</option>';
                        }
                        else {
                            document.getElementById("bianXingDatapretimeid").innerHTML += '<option value="' + autodatadatetimes[i].value + '">' + autodatadatetimes[i].name + '</option>';
                        }
                    }
                }

                form.render();
                form.render('select');

                //预设时间范围切换时间
                form.on('select(bianXingDatapretimefilter)', function (data) {
                    if (data.value != "") {
                        //按预设时间范围绘制图表
                        console.log(data.value);
                        LoadProjectBianXinLiangDataPreDateTime(projectid, data.value);
                    }
                });
                //自定义时间范围
                date.render({
                    elem: '#bianXingDatacustomtimeid'
                    , type: 'datetime'
                    , range: true
                    , done: function (value, date, endDate) {
                        if (value != "") {
                            console.log(value);
                            //按自定义时间范围绘制图表
                            LoadProjectBianXinLiangDataCustomDateTime(projectid, value);
                        }
                    }
                });
                //渲染统计表格
                    LiFengDatastatisticsTable = table.render({
                          elem: '#LiFengDatastatistics'
                         , id: 'LiFengDatastatisticstableid'
                         , title: '裂缝变形量'
                         , even: false
                        , page: { layout: ['prev', 'page', 'next', 'count'] }
                        , limit: 5
                         , toolbar: false
                         , totalRow: false
                         , cols: [[
                             { field: 'code', title: '编号', width: 230, align: "center" }
                             , {
                                 field: 'bianXinLingOne', title: '裂缝变形量', width: 220, align: "center", templet: function (row) {
                                     return row.bianXinLingOne + row.danWei
                                 }
                             }
                             , { field: '', title: '', width: 0, align: "center" }
                         ]]
                         , data: []
                     });
                    YingLiDatastatisticsTable = table.render({
                        elem: '#YingLiDatastatistics'
                        , id: 'YingLiDatastatisticstableid'
                            , title: '应力变形量'
                            , even: false
                            , page: { layout: ['prev', 'page', 'next', 'count'] }
                            , limit: 5
                            , toolbar: false
                            , totalRow: false
                            , cols: [[
                                { field: 'code', title: '编号', width: 230, align: "center" }
                                , {
                                    field: 'bianXinLingOne', title: '应力变形量', width: 220, align: "center", templet: function (row) {
                                        return row.bianXinLingOne + row.danWei
                                    }
                                }
                                , { field: '', title: '', width: 0, align: "center" }
                            ]]
                            , data: []
    });
                    GNSSDatastatisticsTable = table.render({
                        elem: '#GNSSDatastatistics'
                        , id: 'GnssDatastatisticstableid'
                        , title: 'GNSS变形量'
                        , even: false
                        , page: { layout: ['prev', 'page', 'next', 'count'] }
                        , limit: 5
                        , toolbar: false
                        , totalRow: false
                        , cols: [[
                            { field: 'code', title: '编号', width: 200, align: "center" }
                            , {
                                field: 'bianXinLingOne', title: '水平位移量', width: 125, align: "center", templet: function (row) {
                                    return row.bianXinLingOne + row.danWei
                                }
                            }
                            , {
                                field: 'bianXinLingTwo', title: '垂直形量', width: 125, align: "center", templet: function (row) {
                                    return row.bianXinLingTwo + row.danWei
                                }
                            }
                            , { field: '', title: '', width: 0, align: "center" }
                        ]]
                        , data: []
                    });
                    QinJiaoDatastatisticsTable = table.render({
                        elem: '#QinJiaoDatastatistics'
                        , id: 'QinJiaoDatastatisticstableid'
                        , title: '倾角变形量'
                        , even: false
                        , page: { layout: ['prev', 'page', 'next', 'count'] }
                        , limit: 5
                        , toolbar: false
                        , totalRow: false
                        , cols: [[
                            { field: 'code', title: '编号', width: 150, align: "center" }
                            , {
                                field: 'bianXinLingOne', title: 'X方向', width: 100, align: "center", templet: function (row) {
                                    return row.bianXinLingOne + row.danWei
                                }
                            }
                            , {
                                field: 'bianXinLingTwo', title: 'y方向', width: 100, align: "center", templet: function (row) {
                                    return row.bianXinLingTwo + row.danWei
                                }
                            }
                            , {
                                field: 'bianXinLingThree', title: 'z方向', width: 100, align: "center", templet: function (row) {
                                    if (row.bianXinLingThree) {
                                        return row.bianXinLingThree + row.danWei
                                    } else {
                                        return '';
                                    }
                                    
                                }
                            }
                            , { field: '', title: '', width: 0, align: "center" }
                        ]]
                        , data: []
                    });
                    SbwyDatastatisticsTable = table.render({
                        elem: '#SbwyDatastatistics'
                        , id: 'SbwyDatastatisticstableid'
                        , title: '深部位移变形量'
                        , even: false
                        , page: { layout: ['prev', 'page', 'next', 'count'] }
                        , limit: 5
                        , toolbar: false
                        , totalRow: false
                        , cols: [[
                            { field: 'code', title: '编号', width: 200, align: "center" }
                            , {
                                field: 'bianXinLingOne', title: 'X方向', width: 130, align: "center", templet: function (row) {
                                    return row.bianXinLingOne + row.danWei
                                }
                            }
                            , {
                                field: 'bianXinLingTwo', title: 'Yf方向', width: 130, align: "center", templet: function (row) {
                                    return row.bianXinLingTwo + row.danWei
                                }
                            }
                            , { field: '', title: '', width: 0, align: "center" }
                        ]]
                        , data: []
                    });
                    DxswDatastatisticsTable = table.render({
                        elem: '#DxswDatastatistics'
                        , id: 'DxswDatastatisticstableid'
                        , title: '地下水位变形量'
                        , even: false
                        , page: { layout: ['prev', 'page', 'next', 'count'] }
                        , limit: 5
                        , toolbar: false
                        , totalRow: false
                        , cols: [[
                            { field: 'code', title: '编号', width: 230, align: "center" }
                            , {
                                field: 'bianXinLingOne', title: '地下水位变形量', width: 220, align: "center", templet: function (row) {
                                    return row.bianXinLingOne + row.danWei
                                }
                            }
                            , { field: '', title: '', width: 0, align: "center" }
                        ]]
                        , data: []
                    });


                

                //加载初始监测点数据
         LoadProjectBianXinLiangDataPreDateTime(projectid, form.val("bianXingDataform").bianXingDatapretime);
              
      
};
//预设时间查询
function LoadProjectBianXinLiangDataPreDateTime(projectid, datetime) {
    //请求监测点指点时间范围数据
    var loadinglayerindex1 = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
    $.ajax({
        url: servicesurl + "/api/Data/GetBianXinLiangPreDateTime", type: "get", data: { "id": projectid, "predatetime": datetime, "cookie": document.cookie },
        success: function (data) {
            layer.close(loadinglayerindex1);
            zhanShiTable(data);
        }, datatype: "json"
    });
};
//自定义时间查询变量
function LoadProjectBianXinLiangDataCustomDateTime(projectid, datetime) {

    var loadinglayerindex1 = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
    //请求监测点指点时间范围数据
    $.ajax({
        url: servicesurl + "/api/Data/GetBianXinLiangCustomDateTime", type: "get", data: { "id": projectid, "customdatetime": datetime, "cookie": document.cookie },
        success: function (data) {
            layer.close(loadinglayerindex1);
            zhanShiTable(data);
        }, datatype: "json"
    });
};
function zhanShiTable(data){
    var liefengData = [];
    var yingLiData = [];
    var GnssData = [];
    var qinJiaoData = [];
    var sbwyData = [];
    var dxswData = [];
    if (data == "") {
        $("#LiFengDatastatisticsDiv").hide();
        $("#YingLiDatastatisticsDiv").hide();
        $("#GNSSDatastatisticsDiv").hide();
        $("#QinJiaoDatastatisticsDiv").hide();
        $("#SbwyDatastatisticsDiv").hide();
        $("#DxswDatastatisticsDiv").hide();
        layer.msg("无该时间端变形量数据！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
    } else {
        var monitorinfos = JSON.parse(data);
        for (var i in monitorinfos) {
            if (monitorinfos[i].remark == "裂缝") {
                liefengData.push(monitorinfos[i]);
            } else if (monitorinfos[i].remark == "应力") {
                yingLiData.push(monitorinfos[i]);
            } else if (monitorinfos[i].remark == "GNSS") {
                GnssData.push(monitorinfos[i]);
            } else if (monitorinfos[i].remark == "倾角") {
                qinJiaoData.push(monitorinfos[i]);
            } else if (monitorinfos[i].remark == "深部位移") {
                sbwyData.push(monitorinfos[i]);
            } else if (monitorinfos[i].remark == "地下水位") {
                dxswData.push(monitorinfos[i]);
            }
        }
        if (GnssData.length > 0) {
            $("#GNSSDatastatisticsDiv").show();
            GNSSDatastatisticsTable.reload({ id: 'GnssDatastatisticstableid', data: GnssData });
        } else {
            $("#GNSSDatastatisticsDiv").hide();
        }
        if (qinJiaoData.length > 0) {
            $("#QinJiaoDatastatisticsDiv").show();
            QinJiaoDatastatisticsTable.reload({ id: 'QinJiaoDataDatastatisticstableid', data: qinJiaoData });
        } else {
            $("#QinJiaoDatastatisticsDiv").hide();
        }
        if (sbwyData.length > 0) {
            $("#SbwyDatastatisticsDiv").show();
            SbwyDatastatisticsTable.reload({ id: 'SbwyDataDatastatisticstableid', data: sbwyData });
        } else {
            $("#SbwyDatastatisticsDiv").hide();
        }

        if (liefengData.length > 0) {
            $("#LiFengDatastatisticsDiv").show();
            LiFengDatastatisticsTable.reload({ id: 'LiFengDatastatisticstableid', data: liefengData });
        } else {
            $("#LiFengDatastatisticsDiv").hide();
        }
        if (yingLiData.length > 0) {
            $("#YingLiDatastatisticsDiv").show();
            YingLiDatastatisticsTable.reload({ id: 'YingLiDatastatisticstableid', data: yingLiData });
        } else {
            $("#YingLiDatastatisticsDiv").hide();
        }
        if (dxswData.length > 0) {
            $("#DxswDatastatisticsDiv").show();
            DxswDatastatisticsTable.reload({ id: 'DxswDatastatisticstableid', data: dxswData });
        } else {
            $("#DxswDatastatisticsDiv").hide();
        }

    }
}