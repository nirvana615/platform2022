var currentmonitor = null;                      //当前监测点
var autodatachart = null;                       //图表
var monitorstatisticstable = null;              //监测点统计表
var monitorstatisticsdata = [];                 //监测点统计数据（最小值、最大值、平均值、标准差）

var editChart = null;                           //当前处理监测数据图
var monitorArr = null;                          //当前处理监测设备属性
var dataSetTree = null;                         //处理监测数据数
var thresholdYmin = null;                       //定义标示线初值
var thresholdYmax = null;
var thresholdXmin = null;
var thresholdXmax = null;
var curveType = null;                           //曲线类型
var selectedsCurve = null;                      //选中曲线
var axisType = null;                            //轴类型
var autoOriginalData = null;                      //原始数据分类
var autoallData = null;                         //待处理设备所有数据


var overlayChart = null;                        //综合分析图表
var OverlayAnalysisData = null                    //综合分析数据

var LiFengDatastatisticsTable = null;           //变形量的数据lf
var YingLiDatastatisticsTable = null;           //变形量的数据应力
var GNSSDatastatisticsTable = null;             //变形量的数据Gnss
var QinJiaoDatastatisticsTable = null;          //变形量的数据倾角
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
                , content: '<!--自动化监测数据可视化--> <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:1px 0px;overflow: hidden;"> <ul class="layui-tab-title"> <li class="layui-this" style="width:21%;padding-top: 10px;">变形统计</li> <li style="width:21%;padding-top: 10px;">可视化</li> <li style="width:21%;padding-top: 10px;">数据处理</li> <li style="width:21%;padding-top: 10px;">综合分析</li></ul> <div class="layui-tab-content" style="margin:0px 0px"> <!--统计分析--> <div class="layui-tab-item layui-show"> <div class="layui-row" style="height:700px;border-left:solid;border-color:#e6e6e6;border-left-width:0px;overflow-y: auto;"> <!--工具栏--> <form class="layui-form" lay-filter="bianXingDataform" style="margin-top:5px;margin-left:20px;margin-right:40px;"> <div class="layui-row"> <div class="layui-col-xs6"> <div class="grid-demo grid-demo-bg1"> <div class="layui-form-item"> <div class="layui-input-block" style="margin-left:40px;"><select id="bianXingDatapretimeid" name="bianXingDatapretime" lay-filter="bianXingDatapretimefilter" style="visibility:hidden;"></select></div> </div> </div> </div> <div class="layui-col-xs6"> <div class="grid-demo"> <div class="layui-form-item"> <div class="layui-input-block" style="margin-left:20px;margin-right:40px;"> <input id="bianXingDatacustomtimeid" name="bianXingDatacustomtime" type="text" class="layui-input" placeholder="开始时间 — 结束时间" style="visibility:hidden;"> </div> </div> </div> </div> </div> </form> <!--统计表格--> <div id="LiFengDatastatisticsDiv" style="margin-left:10px;margin-right:10px;margin-top:10px;margin-bottom:10px; width:460px;vertical-align: top;display:inline-block "> <table id="LiFengDatastatistics" class="layui-hide"></table> </div> <div id="YingLiDatastatisticsDiv" style="margin-left:10px;margin-right:10px;margin-top:10px;margin-bottom:10px; width:460px;vertical-align: top;display:inline-block"> <table id="YingLiDatastatistics" class="layui-hide"></table> </div> <div id="GNSSDatastatisticsDiv" style="margin-left:10px;margin-right:10px;margin-top:10px;margin-bottom:10px; width:460px;vertical-align: top;display:inline-block"> <table id="GNSSDatastatistics" class="layui-hide"></table> </div> <div id="QinJiaoDatastatisticsDiv" style="margin-left:10px;margin-right:10px;margin-top:10px;margin-bottom:10px; width:460px;vertical-align: top;display:inline-block"> <table id="QinJiaoDatastatistics" class="layui-hide"></table> </div> <div id="SbwyDatastatisticsDiv" style="margin-left:10px;margin-right:10px;margin-top:10px;margin-bottom:10px; width:460px;vertical-align: top;display:inline-block"> <table id="SbwyDatastatistics" class="layui-hide"></table> </div> <div id="DxswDatastatisticsDiv" style="margin-left:10px;margin-right:10px;margin-top:10px;margin-bottom:10px; width:460px;vertical-align: top;display:inline-block"> <table id="DxswDatastatistics" class="layui-hide"></table> </div> </div> </div> <!--可视化--> <div class="layui-tab-item"> <div class="layui-row"> <!--左侧--> <div class="layui-col-md3" style="width:20%;height:700px;overflow: auto;"> <div id="monitortreebytype" class="grid-demo"></div> </div> <!--右侧--> <div class="layui-col-md9" style="width:80%;height:700px;border-left:solid;border-color:#e6e6e6;border-left-width:0px;"> <div class="grid-demo grid-demo-bg1"> <!--工具栏--> <form class="layui-form" lay-filter="autodataform" style="margin-top:5px;"> <div class="layui-row"> <div class="layui-col-xs6"> <div class="grid-demo grid-demo-bg1"> <div class="layui-form-item"> <div class="layui-input-block" style="margin-left:10px;"><select id="autodatapretimeid" name="autodatapretime" lay-filter="autodatapretimefilter" style="visibility:hidden;"></select></div> </div> </div> </div> <div class="layui-col-xs6"> <div class="grid-demo"> <div class="layui-form-item"> <div class="layui-input-block" style="margin-left:10px;margin-right:10px;"> <input id="autodatacustomtimeid" name="autodatacustomtime" type="text" class="layui-input" placeholder="开始时间 — 结束时间" style="visibility:hidden;"></div> </div> </div> </div> </div> </form> <!--图形--> <div id="autodatachart" class="layui-tab-item layui-show" style="width:790px;height:480px"></div> <!--统计表格--> <div id="autodatastatisticsdiv" style="margin-left:10px;margin-right:10px;visibility:hidden;"> <table id="autodatastatistics" class="layui-hide"></table> </div> </div> </div> </div> </div> <!--数据处理--> <div class="layui-tab-item"> <div class="layui-row" style="margin: 0px 10px;"> <!--选择设备及时间范围--> <form class="layui-form" lay-filter="editautodataform" style="margin-top:5px;"> <div class="layui-row"> <div class="layui-col-xs4"> <div class="grid-demo grid-demo-bg1"> <div class="layui-form-item"> <label class="layui-form-label" style="text-align:center;">选择设备：</label> <div class="layui-input-block"> <select id="editautodatadeviceid" name="editautodatadevice" lay-filter="editautodatadevicefilter" style="visibility:hidden;"> <option value="">请选择设备</option> </select> </div> </div> </div> </div> <div class="layui-col-xs4"> <div class="grid-demo"> <div class="layui-form-item"> <div class="layui-input-block" style="margin-left:10px;"> <select id="editautodatapretimeid" name="editautodatapretime" lay-filter="editautodatapretimefilter" style="visibility:hidden;"> <option value="">请选择年限</option> </select> </div> </div> </div> </div> <div class="layui-col-xs4"> <div class="grid-demo"> <div class="layui-form-item"> <div class="layui-input-block" style="margin-left:10px;"> <input id="editautodatacustomtimeid" name="editautodatacustomtime" type="text" class="layui-input" placeholder="开始时间 — 结束时间" style="visibility:hidden;"> </div> </div> </div> </div></div> </form> </div> <div class="layui-row" style="margin: 0px 10px;"> <div class="layui-col-md10"> <!--图形--> <div id="editautodatachartid" class="layui-tab-item layui-show" style="width:790px;height:400px;border: 1px solid #e6e6e6;visibility:hidden;"></div> </div> <div class="layui-col-md2"> <!--数据集--> <div id="editautodatasetid" class="layui-tab-item layui-show" style="width:98%;height:400px;border: 1px solid #e6e6e6;overflow-y: auto;"> </div> </div> </div> <div class="layui-row" style="margin: 0px 10px;"> <div class="layui-tab layui-tab-brief" lay-filter="EditAutoDataTabBrief"> <ul class="layui-tab-title"> <li lay-id="abnormal" class="layui-this">异常处理</li> <li lay-id="grosserror">粗差剔除</li> <li lay-id="initialvalue" style="pointer-events:none; color: darkgray;">设置初值</li> <li lay-id="interpolation" style="pointer-events:none; color: darkgray;">插补数据</li> <li lay-id="fittingcurve" style="pointer-events:none; color: darkgray;">拟合曲线</li> </ul> <div class="layui-tab-content" id="editautodatatoolid" style="width:100%;height:180px;"> <div class="layui-tab-item layui-show"> <div class="layui-row"> <!--左侧--> <div class="layui-col-xs2"> <!--异常处理工具及说明--> <form class="layui-form" lay-filter="editabnormaldatatoolform" style="margin-top:5px;"> <!--异常处理工具--> <div class="layui-row"> <div class="layui-form-item"> <div class="layui-input-block selectUp" style="margin-left:1px;"> <select id="editabnormaldatatoolid" name="editabnormaldatatool" lay-filter="editabnormaldatatoolfilter"> <option value="0">按时间范围选择</option> <option value="1">按值域范围选择</option> </select> </div> </div> </div> </form> </div> <!--右侧--> <div class="layui-col-xs10" id="editabnormaldatatoolbodyid"> <!--异常处理工具参数--> </div> </div> <!--异常处理工具说明--> <div id="editabnormaldatatooldoc"></div> </div> <div class="layui-tab-item"> <div class="layui-row"> <!--左侧--> <div class="layui-col-xs2"> <!--粗差处理工具及说明--> <form class="layui-form" lay-filter="editgrosserrordatatoolform" style="margin-top:5px;"> <!--粗差处理工具--> <div class="layui-row"> <div class="layui-form-item"> <div class="layui-input-block selectUp" style="margin-left:1px;"> <select id="editgrosserrordatatoolid" name="editgrosserrordatatool" lay-filter="editgrosserrordatatoolfilter"> <option value="0">按标准差σ剔除</option> <option value="1">按残差δ剔除</option> </select> </div> </div> </div> </form> </div> <!--右侧--> <div class="layui-col-xs10" id="editgrosserrordatatoolbodyid"> <!--粗差处理工具参数--> </div> </div> <!--粗差剔除工具说明--> <div id="editgrosserrordatatooldoc"></div> </div> <div class="layui-tab-item">3</div> <div class="layui-tab-item">4</div> <div class="layui-tab-item">5</div> <div class="layui-tab-item">6</div> </div> </div> </div></div> <!--综合分析--> <div class="layui-tab-item"> <div class="layui-row"> <!--左侧--> <div class="layui-col-md3" style="width:20%;height:700px;overflow: auto;"> <div id="overlaymonitortree" class="grid-demo"></div> </div> <!--右侧--> <div class="layui-col-md9" style="width:80%;height:700px;border-left:solid;border-color:#e6e6e6;border-left-width:0px;"> <div class="grid-demo grid-demo-bg1"> <!--工具栏--> <form class="layui-form" lay-filter="overlaydataform" style="margin-top:5px;"> <div class="layui-row"> <div class="layui-col-xs4"> <div class="grid-demo grid-demo-bg1"> <div class="layui-form-item"> <div class="layui-input-block" style="margin-left:10px;"><select id="overlaydatapretimeid" name="overlaydatapretime" lay-filter="overlaydatapretimefilter" style="visibility:hidden;"></select></div> </div> </div> </div> <div class="layui-col-xs4"> <div class="grid-demo"> <div class="layui-form-item"> <div class="layui-input-block" style="margin-left:10px;margin-right:10px;"> <input id="overlaydatacustomtimeid" name="overlaydatacustomtime" type="text" class="layui-input" placeholder="开始时间 — 结束时间" style="visibility:hidden;"></div> </div> </div> </div> <div class="layui-col-xs2"> <div class="grid-demo"> <div class="layui-form-item"> <label class="layui-form-label" style="width:40px;padding:0px 5px;">小时雨量</label> <div class="layui-input-block" style="right:55px;"> <input type="checkbox" id="hourrainid" name="hourrain" lay-skin="switch" lay-filter="hourrainfilter" lay-text="ON|OFF" disabled> </div> </div> </div> </div> <div class="layui-col-xs2"> <div class="grid-demo"> <div class="layui-form-item"> <label class="layui-form-label" style="width:40px;padding:0px 5px;">每日雨量</label> <div class="layui-input-block" style="right:55px;"> <input type="checkbox" id="dayrainid" name="dayrain" lay-skin="switch" lay-filter="dayrainfilter" lay-text="ON|OFF" disabled> </div> </div> </div> </div> </div> </form> <!--图形--> <div id="overlaydatachartid" class="layui-tab-item layui-show" style="width:790px;height:480px"></div> </div> </div> </div> </div></div> </div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    //Loading
                    var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                    //加载监测点
                    GetMonitors(id, loadinglayerindex);
                    //加载变形了分统计表
                    getBianXingLiangData(id);
                    //监测数据处理
                    EditProjectDeviceAutoData(id);
                    //综合分析
                    OverlayAnalysis();

                }
                , end: function () {
                    //关闭
                    automonitordatalayerindex = null;

                    currentmonitor = null;
                    autodatachart = null;
                    editChart = null;
                    autoOriginalData = null;
                    autoallData = null;
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
    monitorArr = {};
    selectedsCurve = null;//选中曲线
    axisType = "X";//初设X轴标识线

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
            LoadEditAutoDataAllTime(monitorArr);
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
                LoadEditAutoDataCustomDateTime(monitorArr, value);
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
    form.render();
    form.render('select');
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
            DataSetNodeCheck(obj);
        }
    });
    //加载所有数据
    LoadEditAutoDataAllTime(monitorArr);
    ////异常处理模块
    editAbnormaldata();
    ////粗差剔除模块
    editGrosserrordata();

    ////设置初值模块
    ////插补数据模块
    ////监测曲线模块

}
function LoadEditAutoDataPreDateTime(monitorArr, datetime) {
    editChart.showLoading();
    autoOriginalData = null;
    //请求监测点指点时间范围数据
    $.ajax({
        url: servicesurl + "/api/Data/GetEditAutoDatabyPreDateTime", type: "get", data: { "id": monitorArr.id, "type": monitorArr.type, "predatetime": datetime, "cookie": document.cookie },
        success: function (data) {
            if (data == "") {
                DisplayEditDATA(monitorArr, data);
            }
            else {
                var result = JSON.parse(data);
                autoOriginalData = result;
                //展示处理后的数据
                var targetDataView = {};
                targetDataView.Datas = [];
                targetDataView.Statistics = autoOriginalData.Statistics;
                for (var k in autoOriginalData.Datas) {
                    if (autoOriginalData.Datas[k].Flag != "200") {
                        targetDataView.Datas.push(autoOriginalData.Datas[k]);
                    }
                }
                DisplayEditDATA(monitorArr, targetDataView);
            }

        }, datatype: "json"
    });

};
function LoadEditAutoDataCustomDateTime(monitorArr, datetime) {
    editChart.showLoading();
    autoOriginalData = null;
    //请求监测点指点时间范围数据
    $.ajax({
        url: servicesurl + "/api/Data/GetEditAutoDatabyCustomDateTime", type: "get", data: { "id": monitorArr.id, "type": monitorArr.type, "customdatetime": datetime, "cookie": document.cookie },
        success: function (data) {
            if (data == "") {
                DisplayEditDATA(monitorArr, data);
            }
            else {
                var result = JSON.parse(data);
                autoOriginalData = result;
                //展示处理后的数据
                var targetDataView = {};
                targetDataView.Datas = [];
                targetDataView.Statistics = autoOriginalData.Statistics;
                for (var k in autoOriginalData.Datas) {
                    if (autoOriginalData.Datas[k].Flag != "200") {
                        targetDataView.Datas.push(autoOriginalData.Datas[k]);
                    }
                }
                DisplayEditDATA(monitorArr, targetDataView);
            }
        }, datatype: "json"
    });

};
function LoadEditAutoDataAllTime(monitorArr) {
    autoallData = null;
    if (autodatadatetimes.length > 0) {
        for (var i in autodatadatetimes) {
            if (autodatadatetimes[i].name == "全部") {
                datetime = autodatadatetimes[i].value;
            }
        }
    }
    //请求监测点指点时间范围数据
    $.ajax({
        url: servicesurl + "/api/Data/GetEditAutoDatabyPreDateTime", type: "get", data: { "id": monitorArr.id, "type": monitorArr.type, "predatetime": datetime, "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            autoallData = result;
            pastRecords(autoallData);
        }, datatype: "json"
    });

};
function DeleteEditAutoData(monitorArr, deletedata) {
    //请求监测点指点时间范围数据
    $.ajax({
        url: servicesurl + "/api/Data/DeleteEditAutoData", type: "get", data: { "id": monitorArr.id, "type": monitorArr.type, "deletedata": deletedata, "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }, datatype: "json"
    });

};
//编辑数据树tree
function pastRecords(autoallData) {
    //曲线左侧数据集树（开启复选框）
    dataSetTree = [
        {
            title: '目标数据',
            id: "targetdata",
            spread: true,
            type: "targetdataset",
            children: [
                {
                    id: "revise",
                    title: '修正后数据',
                    type: "target",
                    showCheckbox: true,
                    checked: true,
                }
                ,
                {
                    id: "delete",
                    title: '删除数据',
                    type: "target",
                    showCheckbox: true,
                    checked: false,

                },
                {
                    id: "plus",
                    title: '插补数据',
                    type: "target",
                    showCheckbox: true,
                    checked: false,

                },
                {
                    id: "original",
                    title: '原始数据',
                    showCheckbox: true,
                    checked: false,
                    type: "target",

                }
            ]
        }
    ];
    var years = [];//时间
    for (var i in autoallData.Datas) {
        var year = autoallData.Datas[i].Time.substr(0, 4);
        if (years.indexOf(year) == -1) {
            years.push(year);
        }
    }
    var history = {};
    history.title = '历史数据';
    history.id = "historydata";
    history.type = "historydataset";
    history.spread = true;
    history.children = [];
    //按时间组织
    for (var i in years) {
        var year = new Object;
        year.id = years[i];
        year.title = years[i];
        year.type = "history";
        year.showCheckbox = true;
        year.checked = false;
        history.children.push(year);
    }
    dataSetTree.push(history);
    tree.reload('editautodatasetid', { data: dataSetTree });
}

var dataSetid = null;
var isReloadTree = false;
//节点选中/取消选中
function DataSetNodeCheck(obj) {
    if (obj.checked) {
        //选中
        if (obj.data.type == "target") {
            if (!isReloadTree) {
                for (var i in dataSetTree) {
                    if (dataSetTree[i].type == "targetdataset") {
                        for (var j in dataSetTree[i].children) {
                            if (dataSetTree[i].children[j].id == obj.data.id) {
                                dataSetTree[i].children[j].checked = true;
                            }
                        }
                    }
                    else {
                        for (var k in dataSetTree[i].children) {
                            dataSetTree[i].children[k].checked = false;
                        }
                    }
                }
                isReloadTree = true;//标记重载
                tree.reload('editautodatasetid', { data: dataSetTree });
                isReloadTree = false;//重载后还原
                targetView();
            }

        }
        else if (obj.data.type == "history") {
            if (!isReloadTree) {
                for (var i in dataSetTree) {
                    if (dataSetTree[i].type == "historydataset") {
                        for (var j in dataSetTree[i].children) {
                            if (dataSetTree[i].children[j].id == obj.data.id) {
                                dataSetTree[i].children[j].checked = true;
                            }
                        }
                    }
                    else {
                        for (var k in dataSetTree[i].children) {
                            dataSetTree[i].children[k].checked = false;
                        }
                    }

                }
                isReloadTree = true;//标记重载
                tree.reload('editautodatasetid', { data: dataSetTree });
                isReloadTree = false;//重载后还原
                historyView();
            }
        }

    }
    else {
        if (obj.data.type == "target") {
            if (!isReloadTree) {
                for (var i in dataSetTree) {
                    if (dataSetTree[i].type == "targetdataset") {
                        for (var j in dataSetTree[i].children) {
                            if (dataSetTree[i].children[j].id == obj.data.id) {
                                dataSetTree[i].children[j].checked = false;
                            }
                        }
                        break;
                    }
                }
                //isReloadTree = true;//标记重载
                //tree.reload('editautodatasetid', { data: dataSetTree });
                //isReloadTree = false;//重载后还原
                targetView();
            }

        }
        else if (obj.data.type == "history") {
            if (!isReloadTree) {
                for (var i in dataSetTree) {
                    if (dataSetTree[i].type == "historydataset") {
                        for (var j in dataSetTree[i].children) {
                            if (dataSetTree[i].children[j].id == obj.data.id) {
                                dataSetTree[i].children[j].checked = false;
                            }
                        }
                        break;
                    }
                }
                //isReloadTree = true;//标记重载
                //tree.reload('editautodatasetid', { data: dataSetTree });
                //isReloadTree = false;//重载后还原
                historyView();
            }
        }
    }
    //展示目标数据
    function targetView() {
        var targetDataView = {};
        var targetDataViewid = [];
        targetDataView.Datas = [];
        targetDataView.Statistics = autoOriginalData.Statistics;
        for (var i in dataSetTree) {
            if (dataSetTree[i].type == "targetdataset") {
                for (var j in dataSetTree[i].children) {
                    if (dataSetTree[i].children[j].checked == true) {
                        if (dataSetTree[i].children[j].id == 'revise') {
                            for (var k in autoOriginalData.Datas) {
                                if (autoOriginalData.Datas[k].Flag != '200') {
                                    if (!targetDataViewid.includes(autoOriginalData.Datas[k].Id)) {
                                        targetDataView.Datas.push(autoOriginalData.Datas[k]);
                                        targetDataViewid.push(autoOriginalData.Datas[k].Id);
                                    }
                                }
                            }
                        }
                        else if (dataSetTree[i].children[j].id == 'delete') {
                            for (var k in autoOriginalData.Datas) {
                                if (autoOriginalData.Datas[k].Flag == '200') {
                                    if (!targetDataViewid.includes(autoOriginalData.Datas[k].Id)) {
                                        targetDataView.Datas.push(autoOriginalData.Datas[k]);
                                        targetDataViewid.push(autoOriginalData.Datas[k].Id);
                                    }
                                }
                            }
                        }
                        else if (dataSetTree[i].children[j].id == 'plus') {
                            for (var k in autoOriginalData.Datas) {
                                if (autoOriginalData.Datas[k].Flag == '300') {
                                    if (!targetDataViewid.includes(autoOriginalData.Datas[k].Id)) {
                                        targetDataView.Datas.push(autoOriginalData.Datas[k]);
                                        targetDataViewid.push(autoOriginalData.Datas[k].Id);
                                    }
                                }
                            }
                        }
                        else if (dataSetTree[i].children[j].id == 'original') {
                            for (var k in autoOriginalData.Datas) {
                                if (!targetDataViewid.includes(autoOriginalData.Datas[k].Id)) {
                                    targetDataView.Datas.push(autoOriginalData.Datas[k]);
                                    targetDataViewid.push(autoOriginalData.Datas[k].Id);
                                }
                            }
                        }
                    }
                }
            }
        }

        if (targetDataView.Datas.length > 0) {
            DisplayEditDATA(monitorArr, targetDataView);
        }
        else {
            for (var i in dataSetTree) {
                if (dataSetTree[i].type == "targetdataset") {
                    for (var j in dataSetTree[i].children) {
                        if (dataSetTree[i].children[j].id == "revise") {
                            dataSetTree[i].children[j].checked = true;
                        }
                    }
                    break;
                }
            }
            isReloadTree = true;//标记重载
            tree.reload('editautodatasetid', { data: dataSetTree });
            isReloadTree = false;//重载后还原
            targetView();
        }
    }
    //展示历史数据
    function historyView() {
        var historyDataView = {};
        historyDataView.Datas = [];
        historyDataView.Statistics = autoallData.Statistics;
        var yearSelected = []
        for (var i in dataSetTree) {
            if (dataSetTree[i].type == "historydataset") {
                for (var j in dataSetTree[i].children) {
                    if (dataSetTree[i].children[j].checked == true) {
                        yearSelected.push(dataSetTree[i].children[j].id);
                    }
                }
                break;
            }
        }
        for (var i in autoallData.Datas) {
            if (yearSelected.includes(autoallData.Datas[i].Time.substr(0, 4))) {
                historyDataView.Datas.push(autoallData.Datas[i]);
            }
        }
        if (historyDataView.Datas.length > 0) {
            DisplayEditDATA(monitorArr, historyDataView);
        }
        else {
            //DisplayEditDATA(monitorArr, autoOriginalData);
            for (var i in dataSetTree) {
                if (dataSetTree[i].type == "targetdataset") {
                    for (var j in dataSetTree[i].children) {
                        if (dataSetTree[i].children[j].id == "revise") {
                            dataSetTree[i].children[j].checked = true;
                        }
                    }
                    break;
                }
            }
            isReloadTree = true;//标记重载
            tree.reload('editautodatasetid', { data: dataSetTree });
            isReloadTree = false;//重载后还原
            targetView();
        }

    }
};
//切换树为改正后数据
function ReviseViewTree() {
    for (var i in dataSetTree) {
        if (dataSetTree[i].type == "targetdataset") {
            for (var j in dataSetTree[i].children) {
                if (dataSetTree[i].children[j].id == "revise") {
                    dataSetTree[i].children[j].checked = true;
                }
                else {
                    dataSetTree[i].children[j].checked = false;
                }
            }
        }
        else {
            for (var k in dataSetTree[i].children) {
                dataSetTree[i].children[k].checked = false;
            }
        }
    }
    isReloadTree = true;//标记重载
    tree.reload('editautodatasetid', { data: dataSetTree });
    isReloadTree = false;//重载后还原
    var targetDataView = {};
    targetDataView.Datas = [];
    targetDataView.Statistics = autoOriginalData.Statistics;
    for (var k in autoOriginalData.Datas) {
        if (autoOriginalData.Datas[k].Flag != "200") {
            targetDataView.Datas.push(autoOriginalData.Datas[k]);
        }
    }
    DisplayEditDATA(monitorArr, targetDataView);
}
//异常处理
function editAbnormaldata() {
    document.getElementById("editabnormaldatatoolbodyid").innerHTML = '<!--异常处理工具参数--> <form class="layui-form" lay-filter="editabnormaldataform" style="margin-top:5px;"> <div class="layui-row"> <div class="layui-col-xs10"> <div class="layui-form-item "> <label class="layui-form-label" style="width: 80px;padding:9px 0px;">时间范围：</label> <div class="layui-input-inline" style="width: 150px;"> <input type="text" autocomplete="off" id="editabnormalstarttimeid" name="editabnormalstarttime" lay-verify="required" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" placeholder="开始时间"> </div> <div class="layui-form-mid" style="width: 10px;"> - </div> <div class="layui-input-inline" style="width: 150px;"> <input type="text" autocomplete="off" id="editabnormalendtimeid" name="editabnormalendtime" lay-verify="required" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" placeholder="结束时间"> </div></div> </div> <div class="layui-col-xs2"> <div class="layui-form-item"> <div style="text-align:center"> <button type="submit" class="layui-btn" lay-submit="" lay-filter="editabnormaldataXsubmit" style="width:80px;border-radius:5px;">剔除</button> </div> </div> </div> </div> </form>';
    document.getElementById("editabnormaldatatooldoc").innerHTML = '<p>&ensp;&ensp;说明：可通过X轴游标选择或手动输入欲选时间段，点击剔除按钮，即可删除该时间段数据。</p>';

    //切换图例联动选择曲线
    editChart.on('legendselectchanged', function (params) {
        try {
            document.getElementById("editcurveid").innerHTML = null;
            //加载曲线类型
            if (curveType.length > 0) {
                for (var i in curveType) {
                    if (curveType[i][0] == params.name) {
                        //清空Graphic
                        clearGraphic();
                        //轴游标取值
                        DragMarkLine(curveType[i][1], axisType);

                        document.getElementById("editcurveid").innerHTML += '<option title="' + curveType[i][0] + '" value="' + curveType[i][1] + '" selected>' + curveType[i][0] + '</option>';

                    }
                    else {
                        document.getElementById("editcurveid").innerHTML += '<option title="' + curveType[i][0] + '" value="' + curveType[i][1] + '">' + curveType[i][0] + '</option>';
                    }
                }
            }
            form.render();
            form.render('select');

        } catch (error) {
            //加载曲线类型
            if (curveType.length > 0) {
                for (var i in curveType) {
                    if (curveType[i][0] == params.name) {
                        //清空Graphic
                        clearGraphic();
                        //轴游标取值
                        DragMarkLine(curveType[i][1], axisType);
                    }
                }
            }
        }

    });
    //切换异常处理工具模块
    form.on('select(editabnormaldatatoolfilter)', function (data) {
        if (data.value == "0") {
            axisType = "X";
            ///按时间范围选择
            document.getElementById("editabnormaldatatooldoc").innerHTML = '<p>&ensp;&ensp;说明：可通过X轴游标选择或手动输入欲选时间段，点击剔除按钮，即可删除该时间段数据。</p>';
            document.getElementById("editabnormaldatatoolbodyid").innerHTML = '<!--异常处理工具参数--> <form class="layui-form" lay-filter="editabnormaldataform" style="margin-top:5px;"> <div class="layui-row"> <div class="layui-col-xs10"> <div class="layui-form-item "> <label class="layui-form-label" style="width: 80px;padding:9px 0px;">时间范围：</label> <div class="layui-input-inline" style="width: 150px;"> <input type="text" autocomplete="off" id="editabnormalstarttimeid" name="editabnormalstarttime" lay-verify="required" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" placeholder="开始时间"> </div> <div class="layui-form-mid" style="width: 10px;"> - </div> <div class="layui-input-inline" style="width: 150px;"> <input type="text" autocomplete="off" id="editabnormalendtimeid" name="editabnormalendtime" lay-verify="required" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" placeholder="结束时间"> </div></div> </div> <div class="layui-col-xs2"> <div class="layui-form-item"> <div style="text-align:center"> <button type="submit" class="layui-btn" lay-submit="" lay-filter="editabnormaldataXsubmit" style="width:80px;border-radius:5px;">剔除</button> </div> </div> </div> </div> </form>';
            var selectedType = editChart.getOption().legend[0].selected;//获取图例选中曲线
            for (var key in selectedType) {
                if (selectedType[key] == true) {
                    if (curveType.length > 0) {
                        for (var i in curveType) {
                            if (curveType[i][0] == key) {
                                //清空Graphic
                                clearGraphic();
                                //轴游标取值
                                DragMarkLine(curveType[i][1], axisType);
                            }
                        }
                    }
                    break;
                }
            }
            $("#editabnormalstarttimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmin));
            $("#editabnormalendtimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmax));
        }
        else if (data.value == "1") {
            axisType = "Y";
            ///按值域范围选择
            document.getElementById("editabnormaldatatooldoc").innerHTML = '<p>&ensp;&ensp;说明：可通过Y轴游标选择或手动输入欲选值域范围，点击剔除按钮，即可剔除该值域范围的数据。</p>';
            document.getElementById("editabnormaldatatoolbodyid").innerHTML = '<!--异常处理工具参数--> <form class="layui-form" lay-filter="editabnormaldataform" style="margin-top:5px;"> <div class="layui-row"> <div class="layui-col-xs6"> <div class="layui-form-item"> <label class="layui-form-label" style="width: 80px;padding:9px 0px;">值域范围：</label> <div class="layui-input-inline" style="width: 140px;"> <input type="text" autocomplete="off" id="editabnormalminvalueid" name="editabnormalminvalue" lay-verify="required" class="layui-input" placeholder="最小值"> </div> <div class="layui-form-mid" style="width: 10px;"> - </div> <div class="layui-input-inline" style="width: 140px;"> <input type="text" autocomplete="off" id="editabnormalmaxvalueid" name="editabnormalmaxvalue" lay-verify="required" class="layui-input" placeholder="最大值"> </div> </div> </div> <div class="layui-col-xs4"> <div class="layui-form-item"> <label class="layui-form-label" style="width: 80px;padding:9px 0px;">选择曲线：</label> <div class="layui-input-inline selectUp" style="width: 130px;"> <select id="editcurveid" name="editcurve" lay-verify="required" lay-filter="editcurvefilter"> <option value="">请选择曲线</option> </select> </div></div> </div> <div class="layui-col-xs2"> <div class="layui-form-item"> <div style="text-align:center"> <button type="submit" class="layui-btn" lay-submit="" lay-filter="editabnormaldataYsubmit" style="width:80px;border-radius:5px;">剔除</button> </div> </div> </div> </div> </form>';
            //加载曲线类型
            document.getElementById("editcurveid").innerHTML = null;
            var selectedType = editChart.getOption().legend[0].selected;//获取图例选中曲线
            for (var key in selectedType) {
                if (selectedType[key] == true) {
                    if (curveType.length > 0) {
                        for (var i in curveType) {
                            if (curveType[i][0] == key) {
                                document.getElementById("editcurveid").innerHTML += '<option title="' + curveType[i][0] + '" value="' + curveType[i][1] + '" selected>' + curveType[i][0] + '</option>';
                                //清空Graphic
                                clearGraphic();
                                //轴游标取值
                                DragMarkLine(curveType[i][1], axisType);
                            }
                            else {
                                document.getElementById("editcurveid").innerHTML += '<option title="' + curveType[i][0] + '" value="' + curveType[i][1] + '">' + curveType[i][0] + '</option>';
                            }
                        }
                    }
                    break;
                }
            }
            $("#editabnormalminvalueid").val(thresholdYmin.toFixed(2));
            $("#editabnormalmaxvalueid").val(thresholdYmax.toFixed(2));

        }
        form.render();
        form.render('select');

        //切换曲线类型图形联动
        form.on('select(editcurvefilter)', function (data) {
            var indexGID = data.elem.selectedIndex;
            var title = data.elem[indexGID].title;
            selectedsCurve = {};
            if (curveType.length > 0) {
                for (var i in curveType) {
                    if (curveType[i][0] == title) {
                        selectedsCurve[curveType[i][0]] = true;
                        //清空Graphic
                        clearGraphic();
                        //轴游标取值
                        DragMarkLine(curveType[i][1], axisType);
                    }
                    else {
                        selectedsCurve[curveType[i][0]] = false;
                    }
                }
            }
            editChart.setOption({
                legend: {
                    selected: selectedsCurve,
                }
            });
        });

    });
    //异常剔除
    //按时间范围剔除
    form.on('submit(editabnormaldataXsubmit)', function (data) {
        //切换当前项目
        layer.confirm('<p style="font-size:16px">是否剔除满足当前所选条件的数据？</p><br/>', {
            icon: 3,
            title: ['系统提示', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei'],
            shade: 0.5,
            zIndex: layer.zIndex,
            cancel: function () { },
            success: function (layero) { layer.setTop(layero); },
            btnAlign: 'c',
            btn: ['是', '否']
        }, function (index, layero) {
            var deletData = "";//剔除数据id
            var result = data.field;
            var starTime = Math.round(new Date(result.editabnormalstarttime) / 1000) * 1000;
            var endTime = Math.round(new Date(result.editabnormalendtime) / 1000) * 1000;
            for (var i in autoOriginalData.Datas) {
                var time = Math.round(new Date(autoOriginalData.Datas[i].Time) / 1000) * 1000;
                if (time > starTime && time < endTime && autoOriginalData.Datas[i].Flag != '200') {
                    autoOriginalData.Datas[i].Flag = '200';
                    deletData += autoOriginalData.Datas[i].Id.toString() + ",";
                }
            }

            //加载修正后数据
            ReviseViewTree();
            //删除数据
            DeleteEditAutoData(monitorArr, deletData);
            layer.close(index);
        }, function (index) {
            layer.close(index);
        });

        return false;
    });
    //按值域范围剔除
    form.on('submit(editabnormaldataYsubmit)', function (data) {
        layer.confirm('<p style="font-size:16px">是否剔除满足当前所选条件的数据？</p><br/>', {
            icon: 3,
            title: ['系统提示', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei'],
            shade: 0.5,
            zIndex: layer.zIndex,
            cancel: function () { },
            success: function (layero) { layer.setTop(layero); },
            btnAlign: 'c',
            btn: ['是', '否']
        }, function (index, layero) {
            var deletData = "";//剔除数据id
            var result = data.field;
            var starTime = thresholdXmin;
            var endTime = thresholdXmax;
            var minValue = result.editabnormalminvalue;
            var maxValue = result.editabnormalmaxvalue;
            var key = result.editcurve;
            for (var i in autoOriginalData.Datas) {
                var time = Math.round(new Date(autoOriginalData.Datas[i].Time) / 1000) * 1000;
                var value = autoOriginalData.Datas[i][key];
                if (time > starTime && time < endTime && value > minValue && value < maxValue && autoOriginalData.Datas[i].Flag != '200') {
                    autoOriginalData.Datas[i].Flag = '200';
                    deletData += autoOriginalData.Datas[i].Id.toString() + ",";
                }
            }

            //加载修正后数据
            ReviseViewTree();

            //显示当前曲线和游标
            selectedsCurve = {};
            if (curveType.length > 0) {
                for (var i in curveType) {
                    if (curveType[i][1] == key) {
                        selectedsCurve[curveType[i][0]] = true;
                    }
                    else {
                        selectedsCurve[curveType[i][0]] = false;
                    }
                }
            }
            editChart.setOption({
                legend: {
                    selected: selectedsCurve,
                }
            });
            //清空Graphic
            clearGraphic();
            DragMarkLine(key, axisType);
            //删除数据
            DeleteEditAutoData(monitorArr, deletData);
            layer.close(index);
        }, function (index) {
            layer.close(index);
        });

        return false;
    });
    form.render();
    form.render('select');
}
//粗差处理
function editGrosserrordata() {
    elem.on('tab(EditAutoDataTabBrief)', function (elem) {
        //
        if ($(this).attr('lay-id') == "abnormal") {
            var toolval = $("#editabnormaldatatoolid option:selected").val();
            if (toolval == 0) {
                axisType = "X";
            }
            else {
                axisType = "Y";
            }

            var selectedType = editChart.getOption().legend[0].selected;//获取图例选中曲线
            for (var key in selectedType) {
                if (selectedType[key] == true) {
                    if (curveType.length > 0) {
                        for (var i in curveType) {
                            if (curveType[i][0] == key) {
                                //清空Graphic
                                clearGraphic();
                                DragMarkLine(curveType[i][1], axisType);
                            }
                        }
                    }
                    break;
                }
            }
            form.render();
            form.render('select');
        }
        else if ($(this).attr('lay-id') == "grosserror") {
            axisType = "X";
            //粗差剔除参数页
            document.getElementById("editgrosserrordatatoolbodyid").innerHTML = '<!--粗差剔除工具参数--> <form class="layui-form" lay-filter="editgrosserrordataform" style="margin-top:5px;"> <div class="layui-row"> <div class="layui-col-xs8"> <div class="layui-form-item "> <label class="layui-form-label">时间范围：</label> <div class="layui-input-inline"> <input type="text" autocomplete="off" id="editgrosserrorstarttimeid" name="editgrosserrorstarttime" lay-verify="required" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" placeholder="开始时间"> </div> <div class="layui-form-mid"> - </div> <div class="layui-input-inline"> <input type="text" autocomplete="off" id="editgrosserrorendtimeid" name="editgrosserrorendtime" lay-verify="required" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" placeholder="结束时间"> </div> </div> </div> <div class="layui-col-xs4"> <div class="layui-form-item"> <div style="text-align:center"> <button type="submit" class="layui-btn" lay-submit="" lay-filter="editgrosserrordatapreview" style="width:120px;border-radius:5px;">预览</button> </div> </div> </div> </div> <div class="layui-row"> <div class="layui-col-xs3"> <div class="layui-form-item"> <label class="layui-form-label" style="width:90px;padding:9px 10px;">标准差倍数：</label> <div class="layui-input-inline selectUp" style="width:80px;"> <input type="text" autocomplete="off" id="editCullingmethodid" name="editCullingmethod" lay-verify="required|number" class="layui-input"> </div> </div> </div><div class="layui-col-xs5"> <div class="layui-form-item"> <label class="layui-form-label">选择曲线：</label> <div class="layui-input-inline selectUp" style="width:205px;"> <select id="editgrosscurveid" name="editgrosscurve" lay-verify="required" lay-filter="editgrosscurvefilter"> <option value="">请选择曲线</option> </select> </div></div> </div> <div class="layui-col-xs4"> <div class="layui-form-item"> <div style="text-align:center"> <button type="submit" class="layui-btn" lay-submit="" lay-filter="editgrosserrordatasubmit" style="width:120px;border-radius:5px;">剔除</button> </div> </div> </div> </div></form>';
            document.getElementById("editgrosserrordatatooldoc").innerHTML = '<p>&ensp;&ensp;说明：可通过X轴游标选择或手动输入欲选时间段，选择剔除方法，先预览在剔除。</p>';
            //获取时间范围
            $("#editgrosserrorstarttimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmin));
            $("#editgrosserrorendtimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmax));

            var selectedType = editChart.getOption().legend[0].selected;//获取图例选中曲线
            document.getElementById("editgrosscurveid").innerHTML = null;
            for (var key in selectedType) {
                if (selectedType[key] == true) {
                    if (curveType.length > 0) {
                        for (var i in curveType) {
                            if (curveType[i][0] == key) {
                                document.getElementById("editgrosscurveid").innerHTML += '<option title="' + curveType[i][0] + '" value="' + curveType[i][1] + '" selected>' + curveType[i][0] + '</option>';
                                //清空Graphic
                                clearGraphic();
                                DragMarkLine(curveType[i][1], axisType);
                            }
                            else {
                                document.getElementById("editgrosscurveid").innerHTML += '<option title="' + curveType[i][0] + '" value="' + curveType[i][1] + '">' + curveType[i][0] + '</option>';
                            }
                        }
                    }
                    break;
                }
            }
            form.render();
            form.render('select');
        }
    });
    //切换图例联动选择曲线
    editChart.on('legendselectchanged', function (params) {
        document.getElementById("editgrosscurveid").innerHTML = null;
        //加载曲线类型
        if (curveType.length > 0) {
            for (var i in curveType) {
                if (curveType[i][0] == params.name) {
                    //清空Graphic
                    clearGraphic();
                    //轴游标取值
                    DragMarkLine(curveType[i][1], axisType);
                    document.getElementById("editgrosscurveid").innerHTML += '<option title="' + curveType[i][0] + '" value="' + curveType[i][1] + '" selected>' + curveType[i][0] + '</option>';

                }
                else {
                    document.getElementById("editgrosscurveid").innerHTML += '<option title="' + curveType[i][0] + '" value="' + curveType[i][1] + '">' + curveType[i][0] + '</option>';
                }
            }
        }
        form.render();
        form.render('select');
    });
    //切换曲线类型图形联动
    form.on('select(editgrosscurvefilter)', function (data) {
        var indexGID = data.elem.selectedIndex;
        var title = data.elem[indexGID].title;
        selectedsCurve = {};
        if (curveType.length > 0) {
            for (var i in curveType) {
                if (curveType[i][0] == title) {
                    selectedsCurve[curveType[i][0]] = true;
                    //清空Graphic
                    clearGraphic();
                    //轴游标取值
                    DragMarkLine(curveType[i][1], axisType);
                }
                else {
                    selectedsCurve[curveType[i][0]] = false;
                }
            }
        }
        editChart.setOption({
            legend: {
                selected: selectedsCurve,
            }
        });
    });

    //切换粗差处理工具模块
    form.on('select(editgrosserrordatatoolfilter)', function (data) {
        if (data.value == "0") {
            ///按标准差剔除
            document.getElementById("editgrosserrordatatoolbodyid").innerHTML = '<!--粗差剔除工具参数--> <form class="layui-form" lay-filter="editgrosserrordataform" style="margin-top:5px;"> <div class="layui-row"> <div class="layui-col-xs8"> <div class="layui-form-item "> <label class="layui-form-label">时间范围：</label> <div class="layui-input-inline"> <input type="text" autocomplete="off" id="editgrosserrorstarttimeid" name="editgrosserrorstarttime" lay-verify="required" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" placeholder="开始时间"> </div> <div class="layui-form-mid"> - </div> <div class="layui-input-inline"> <input type="text" autocomplete="off" id="editgrosserrorendtimeid" name="editgrosserrorendtime" lay-verify="required" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" placeholder="结束时间"> </div> </div> </div> <div class="layui-col-xs4"> <div class="layui-form-item"> <div style="text-align:center"> <button type="submit" class="layui-btn" lay-submit="" lay-filter="editgrosserrordatapreview" style="width:120px;border-radius:5px;">预览</button> </div> </div> </div> </div> <div class="layui-row"> <div class="layui-col-xs3"> <div class="layui-form-item"> <label class="layui-form-label" style="width:90px;padding:9px 10px;">标准差倍数：</label> <div class="layui-input-inline selectUp" style="width:80px;"> <input type="text" autocomplete="off" id="editCullingmethodid" name="editCullingmethod" lay-verify="required|number" class="layui-input"> </div> </div> </div><div class="layui-col-xs5"> <div class="layui-form-item"> <label class="layui-form-label">选择曲线：</label> <div class="layui-input-inline selectUp" style="width:205px;"> <select id="editgrosscurveid" name="editgrosscurve" lay-verify="required" lay-filter="editgrosscurvefilter"> <option value="">请选择曲线</option> </select> </div></div> </div> <div class="layui-col-xs4"> <div class="layui-form-item"> <div style="text-align:center"> <button type="submit" class="layui-btn" lay-submit="" lay-filter="editgrosserrordatasubmit" style="width:120px;border-radius:5px;">剔除</button> </div> </div> </div> </div></form>';
            document.getElementById("editgrosserrordatatooldoc").innerHTML = '<p>&ensp;&ensp;说明：可通过X轴游标选择或手动输入欲选时间段，选择剔除方法，先预览在剔除。</p>';
            //加载曲线类型
            document.getElementById("editgrosscurveid").innerHTML = null;
            var selectedType = editChart.getOption().legend[0].selected;//获取图例选中曲线
            for (var key in selectedType) {
                if (selectedType[key] == true) {
                    if (curveType.length > 0) {
                        for (var i in curveType) {
                            if (curveType[i][0] == key) {
                                document.getElementById("editgrosscurveid").innerHTML += '<option title="' + curveType[i][0] + '" value="' + curveType[i][1] + '" selected>' + curveType[i][0] + '</option>';
                                //清空Graphic
                                clearGraphic();
                                //轴游标取值
                                DragMarkLine(curveType[i][1], axisType);
                            }
                            else {
                                document.getElementById("editgrosscurveid").innerHTML += '<option title="' + curveType[i][0] + '" value="' + curveType[i][1] + '">' + curveType[i][0] + '</option>';
                            }
                        }
                    }
                    break;
                }
            }
            $("#editgrosserrorstarttimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmin));
            $("#editgrosserrorendtimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmax));
        }
        else if (data.value == "1") {
            ///按残差剔除
            document.getElementById("editgrosserrordatatoolbodyid").innerHTML = '<!--粗差剔除工具参数--> <form class="layui-form" lay-filter="editgrosserrordataform" style="margin-top:5px;"> <div class="layui-row"> <div class="layui-col-xs10"> <div class="layui-form-item "> <label class="layui-form-label">时间范围：</label> <div class="layui-input-inline"> <input type="text" autocomplete="off" id="editgrosserrorstarttimeid" name="editgrosserrorstarttime" lay-verify="required" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" placeholder="开始时间"> </div> <div class="layui-form-mid"> - </div> <div class="layui-input-inline"> <input type="text" autocomplete="off" id="editgrosserrorendtimeid" name="editgrosserrorendtime" lay-verify="required" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" placeholder="结束时间"> </div> </div> </div> <div class="layui-col-xs2"> <div class="layui-form-item"> <div style="text-align:center"> <button type="submit" class="layui-btn" lay-submit="" lay-filter="editresidualpreview" style="width:120px;border-radius:5px;">预览</button> </div> </div> </div> </div> <div class="layui-row"><div class="layui-col-xs4"> <div class="layui-form-item"> <label class="layui-form-label">选择曲线：</label> <div class="layui-input-inline selectUp" style="width:135px;"> <select id="editgrosscurveid" name="editgrosscurve" lay-verify="required" lay-filter="editgrosscurvefilter"> <option value="">请选择曲线</option> </select> </div></div> </div> <div class="layui-col-xs4"> <div class="layui-form-item"> <label class="layui-form-label">拟合方法：</label> <div class="layui-input-inline selectUp" style="width:140px;"> <select id="editFittingmethodid" name="editFittingmethod" lay-verify="required" lay-filter="editFittingmethodfilter"> <option value="">请选择拟合方法</option> <option value="linear">线性回归</option> <option value="exponential">指数回归</option> <option value="logarithmic">对数回归</option> <option value="polynomial">多项式回归</option> </select> </div> </div> </div> <div class="layui-col-xs2"> <div class="layui-form-item"> <label class="layui-form-label" style="width:50px;padding:9px 5px;">阈值：</label> <div class="layui-input-inline" style="width:45px;"> <input type="text" autocomplete="off" id="editthresholdid" name="editthreshold" lay-verify="required|number" class="layui-input"> </div> </div> </div> <div class="layui-col-xs2"> <div class="layui-form-item"> <div style="text-align:center"> <button type="submit" class="layui-btn" lay-submit="" lay-filter="editresidualsubmit" style="width:120px;border-radius:5px;">剔除</button> </div> </div> </div> </div></form>';
            document.getElementById("editgrosserrordatatooldoc").innerHTML = '<p>&ensp;&ensp;说明：可通过X轴游标选择或手动输入欲选时间段，选择剔除方法和残差阈值，先预览在剔除。</p>';
            //加载曲线类型
            document.getElementById("editgrosscurveid").innerHTML = null;
            var selectedType = editChart.getOption().legend[0].selected;//获取图例选中曲线
            for (var key in selectedType) {
                if (selectedType[key] == true) {
                    if (curveType.length > 0) {
                        for (var i in curveType) {
                            if (curveType[i][0] == key) {
                                document.getElementById("editgrosscurveid").innerHTML += '<option title="' + curveType[i][0] + '" value="' + curveType[i][1] + '" selected>' + curveType[i][0] + '</option>';
                                //清空Graphic
                                clearGraphic();
                                //轴游标取值
                                DragMarkLine(curveType[i][1], axisType);
                            }
                            else {
                                document.getElementById("editgrosscurveid").innerHTML += '<option title="' + curveType[i][0] + '" value="' + curveType[i][1] + '">' + curveType[i][0] + '</option>';
                            }
                        }
                    }
                    break;
                }
            }
            $("#editgrosserrorstarttimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmin));
            $("#editgrosserrorendtimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmax));

        }
        form.render();
        form.render('select');

    });

    //粗差--按标准差剔除
    form.on('submit(editgrosserrordatapreview)', function (data) {
        var deletData = "";//剔除数据id
        var result = data.field;
        var starTime = Math.round(new Date(result.editgrosserrorstarttime) / 1000) * 1000;
        var endTime = Math.round(new Date(result.editgrosserrorendtime) / 1000) * 1000;
        var key = result.editgrosscurve;
        var heightlight = [];
        var stdData = [];
        for (var i in autoOriginalData.Datas) {
            var time = Math.round(new Date(autoOriginalData.Datas[i].Time) / 1000) * 1000;
            if (time > starTime && time < endTime && autoOriginalData.Datas[i].Flag != '200') {
                stdData.push(autoOriginalData.Datas[i][key]);
            }
        }
        var Std = result.editCullingmethod * standardDeviation(stdData);
        for (var i in autoOriginalData.Datas) {
            var time = Math.round(new Date(autoOriginalData.Datas[i].Time) / 1000) * 1000;
            var value = autoOriginalData.Datas[i][key];
            if (time > starTime && time < endTime && Math.abs(value) > Std && autoOriginalData.Datas[i].Flag != '200') {
                var preselect = [];
                preselect.push(Math.round(new Date(autoOriginalData.Datas[i].Time) / 1000) * 1000);
                preselect.push(autoOriginalData.Datas[i][key]);
                heightlight.push(preselect);
            }
        }
        SelectedHighlight(heightlight);
        //轴游标取值
        DragMarkLine(key, axisType);
        //粗差剔除
        form.on('submit(editgrosserrordatasubmit)', function (data) {
            layer.confirm('<p style="font-size:16px">是否剔除满足当前所选条件的数据？</p><br/>', {
                icon: 3,
                title: ['系统提示', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei'],
                shade: 0.5,
                zIndex: layer.zIndex,
                cancel: function () { },
                success: function (layero) { layer.setTop(layero); },
                btnAlign: 'c',
                btn: ['是', '否']
            }, function (index, layero) {
                for (var i in autoOriginalData.Datas) {
                    var time = Math.round(new Date(autoOriginalData.Datas[i].Time) / 1000) * 1000;
                    var value = autoOriginalData.Datas[i][key];
                    if (time > starTime && time < endTime && Math.abs(value) > Std && autoOriginalData.Datas[i].Flag != '200') {
                        autoOriginalData.Datas[i].Flag = '200';
                        deletData += autoOriginalData.Datas[i].Id.toString() + ",";
                    }
                }

                //加载修正后数据
                ReviseViewTree();
                //显示当前曲线和游标
                selectedsCurve = {};
                if (curveType.length > 0) {
                    for (var i in curveType) {
                        if (curveType[i][1] == key) {
                            selectedsCurve[curveType[i][0]] = true;
                        }
                        else {
                            selectedsCurve[curveType[i][0]] = false;
                        }
                    }
                }
                editChart.setOption({
                    legend: {
                        selected: selectedsCurve,
                    }
                });
                //清空Graphic
                clearGraphic();
                DragMarkLine(key, axisType);
                //删除数据
                DeleteEditAutoData(monitorArr, deletData);
                layer.close(index);
            }, function (index) {
                layer.close(index);
            });

            return false;
        });
        return false;
    });

    //粗差--残差剔除
    form.on('submit(editresidualpreview)', function (data) {
        var deletData = "";//剔除数据id
        var result = data.field;
        var starTime = Math.round(new Date(result.editgrosserrorstarttime) / 1000) * 1000;
        var endTime = Math.round(new Date(result.editgrosserrorendtime) / 1000) * 1000;
        var key = result.editgrosscurve;
        var fittingmethod = result.editFittingmethod;
        var threshold = result.editthreshold;
        var heightlight = [];
        var resData = [];
        for (var i in autoOriginalData.Datas) {
            var time = Math.round(new Date(autoOriginalData.Datas[i].Time) / 1000) * 1000;
            if (time > starTime && time < endTime && autoOriginalData.Datas[i].Flag != '200') {
                var preselect = [];
                preselect.push(Math.round(new Date(autoOriginalData.Datas[i].Time) / 1000) * 1000);
                preselect.push(autoOriginalData.Datas[i][key]);
                resData.push(preselect);
            }
        }
        //拟合曲线返回剔除点
        var preDeletedata = [];
        if (fittingmethod == 'polynomial') {
            preDeletedata = Fittingmethod(fittingmethod, resData, threshold);
        } else {
            preDeletedata = Fittingmethod(fittingmethod, resData, threshold);
        }
        //剔除
        form.on('submit(editresidualsubmit)', function (data) {
            if (preDeletedata == "") {
                layer.confirm('<p style="font-size:16px">没有要删除的数据！</p><br/>')
            }
            else {
                layer.confirm('<p style="font-size:16px">是否剔除满足当前所选条件的数据？</p><br/>', {
                    icon: 3,
                    title: ['系统提示', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei'],
                    shade: 0.5,
                    zIndex: layer.zIndex,
                    cancel: function () { },
                    success: function (layero) { layer.setTop(layero); },
                    btnAlign: 'c',
                    btn: ['是', '否']
                }, function (index, layero) {
                    for (var i in autoOriginalData.Datas) {
                        var time = Math.round(new Date(autoOriginalData.Datas[i].Time) / 1000) * 1000;
                        for (var j in preDeletedata) {
                            if (time == preDeletedata[j][0] && autoOriginalData.Datas[i].Flag != '200') {
                                autoOriginalData.Datas[i].Flag = '200';
                                deletData += autoOriginalData.Datas[i].Id.toString() + ",";
                            }

                        }
                    }

                    //加载修正后数据
                    ReviseViewTree();
                    //显示当前曲线和游标
                    selectedsCurve = {};
                    if (curveType.length > 0) {
                        for (var i in curveType) {
                            if (curveType[i][1] == key) {
                                selectedsCurve[curveType[i][0]] = true;
                            }
                            else {
                                selectedsCurve[curveType[i][0]] = false;
                            }
                        }
                    }
                    editChart.setOption({
                        legend: {
                            selected: selectedsCurve,
                        }
                    });
                    //清空Graphic
                    clearGraphic();
                    DragMarkLine(key, axisType);
                    //删除数据
                    DeleteEditAutoData(monitorArr, deletData);
                    layer.close(index);
                }, function (index) {
                    layer.close(index);
                });
            }
            return false;
        });
        return false;
    });

    form.render();
    form.render('select');
}
//设置初值
function setInitialValue() {

}
//插补数据
function editImputationdata() {

}
//监测曲线

//展示处理数据
function DisplayEditDATA(monitor, data) {
    if (data == "") {
        layer.msg('无监测数据！', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

        DisplayEditNODATA(monitor);
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
//展示无数据
function DisplayEditNODATA(monitor) {
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

    editChart.hideLoading();
    editChart.setOption(option, true, false);
};
function DisplayEditGNSS(monitor, data) {
    var gnssmonitors = data;
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
    thresholdYmin = yaxismin;
    thresholdYmax = yaxismax;
    thresholdXmin = xs[0][0];
    thresholdXmax = xs[xs.length - 1][0];
    //曲线类型
    curveType = [];
    curveType.push(['X位移', 'Dx'], ['Y位移', 'Dy'], ['水平位移', 'Dxy'], ['垂直位移', 'Dh']);
    document.getElementById("editautodatachartid").style.visibility = "visible";
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
            selscted: { 'X位移': true }
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
                id: 'Dx',
                name: 'X位移',
                type: 'line',
                showSymbol: false,
                data: xs,
            },
            {
                id: 'Dy',
                name: 'Y位移',
                type: 'line',
                showSymbol: false,
                data: ys
            },
            {
                id: 'Dxy',
                name: '水平位移',
                type: 'line',
                showSymbol: false,
                data: xys
            },
            {
                id: 'Dh',
                name: '垂直位移',
                type: 'line',
                showSymbol: false,
                data: hs
            }
        ]
    };
    editChart.hideLoading();
    editChart.setOption(option, true, false);
    //轴游标取值
    DragMarkLine(curveType[0][1], axisType);
    //初始化异常处理时间范围
    $("#editabnormalstarttimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmin));
    $("#editabnormalendtimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmax));

}
function DisplayEditLF(monitor, data) {
    var lfmonitors = data;
    //统计
    var avgs = [];
    var sds = [];
    for (var i in lfmonitors.Statistics) {
        avgs.push(parseFloat(lfmonitors.Statistics[i].Avg));
        sds.push(parseFloat(lfmonitors.Statistics[i].Sd));
    }
    var yaxismax = GetArrayAvg(avgs) + 12 * GetArrayAvg(sds);
    var yaxismin = GetArrayAvg(avgs) - 12 * GetArrayAvg(sds)
    //图表
    var lens = [];
    for (var i in lfmonitors.Datas) {
        var len = [];

        len.push(Math.round(new Date(lfmonitors.Datas[i].Time) / 1000) * 1000);
        len.push(parseFloat(lfmonitors.Datas[i].Dv));
        lens.push(len);
    }

    //标示线初值
    thresholdYmin = yaxismin;
    thresholdYmax = yaxismax;
    thresholdXmin = lens[0][0];
    thresholdXmax = lens[lens.length - 1][0];
    //曲线类型
    curveType = [];
    curveType.push(['变形量', 'Dv']);
    document.getElementById("editautodatachartid").style.visibility = "visible";
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
            selscted: { '变形量': true }
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
            min: Math.floor(yaxismin),
            max: Math.ceil(yaxismax),
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            //axisLabel: {
            //    formatter: '{value} mm'
            //}
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
                id: 'Dv',
                name: '变形量',
                type: 'line',
                showSymbol: false,
                data: lens
            }
        ]
    };

    editChart.hideLoading();
    editChart.setOption(option, true, false);
    //轴游标取值
    DragMarkLine(curveType[0][1], axisType);
    //初始化异常处理时间范围
    $("#editabnormalstarttimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmin));
    $("#editabnormalendtimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmax));
}
function DisplayEditQJ(monitor, data) {
    var qjmonitors = data;

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

    //标示线初值
    thresholdYmin = yaxismin;
    thresholdYmax = yaxismax;
    thresholdXmin = xs[0][0];
    thresholdXmax = xs[xs.length - 1][0];
    //曲线类型
    curveType = [];
    curveType.push(['X方向角度', 'Dx'], ['Y方向角度', 'Dy']);
    document.getElementById("editautodatachartid").style.visibility = "visible";
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
            selscted: { 'X方向角度': true }
        },
        tooltip: {
            trigger: 'axis',
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
            name: '°',
            min: Math.floor(yaxismin),
            max: Math.ceil(yaxismax),
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            //axisLabel: {
            //    formatter: '{value} °'
            //}
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
                id: 'Dx',
                name: 'X方向角度',
                type: 'line',
                showSymbol: false,
                data: xs
            },
            {
                id: 'Dy',
                name: 'Y方向角度',
                type: 'line',
                showSymbol: false,
                data: ys
            }
        ]
    };
    editChart.hideLoading();
    editChart.setOption(option, true, false);
    //轴游标取值
    DragMarkLine(curveType[0][1], axisType);
    //初始化异常处理时间范围
    $("#editabnormalstarttimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmin));
    $("#editabnormalendtimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmax));
};
function DisplayEditYL(monitor, data) {
    var ylmonitors = data;

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

    //标示线初值
    thresholdYmin = yaxismin;
    thresholdYmax = yaxismax;
    thresholdXmin = ps[0][0];
    thresholdXmax = ps[ps.length - 1][0];
    //曲线类型
    curveType = [];
    curveType.push(['应力变形量', 'Dv']);
    document.getElementById("editautodatachartid").style.visibility = "visible";
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
            selscted: { '应力变形量': true }
        },
        tooltip: {
            trigger: 'axis',
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
            name: 'kN',
            min: Math.floor(yaxismin),
            max: Math.ceil(yaxismax),
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            //axisLabel: {
            //    formatter: '{value} kN'
            //}
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
                id: 'Dv',
                name: '应力变形量',
                type: 'line',
                showSymbol: false,
                data: ps
            }
        ]
    };

    editChart.hideLoading();
    editChart.setOption(option, true, false);
    //轴游标取值
    DragMarkLine(curveType[0][1], axisType);
    //初始化异常处理时间范围
    $("#editabnormalstarttimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmin));
    $("#editabnormalendtimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmax));
};
function DisplayEditSBWY(monitor, data) {
    var sbwymonitors = data;

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

    //标示线初值
    thresholdYmin = yaxismin;
    thresholdYmax = yaxismax;
    thresholdXmin = xs[0][0];
    thresholdXmax = xs[xs.length - 1][0];
    //曲线类型
    curveType = [];
    curveType.push(['X方向位移', 'X'], ['Y方向位移', 'Y']);
    document.getElementById("editautodatachartid").style.visibility = "visible";
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
            selscted: { 'X方向位移': true }
        },
        tooltip: {
            trigger: 'axis',
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
            name: 'mm',
            min: Math.floor(yaxismin),
            max: Math.ceil(yaxismax),
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            //axisLabel: {
            //    formatter: '{value} mm'
            //}
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
                id: 'X',
                name: 'X方向位移',
                type: 'line',
                showSymbol: false,
                data: xs
            },
            {
                id: 'Y',
                name: 'Y方向位移',
                type: 'line',
                showSymbol: false,
                data: ys
            }
        ]
    };

    editChart.hideLoading();
    editChart.setOption(option, true, false);
    //轴游标取值
    DragMarkLine(curveType[0][1], axisType);
    //初始化异常处理时间范围
    $("#editabnormalstarttimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmin));
    $("#editabnormalendtimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmax));
};
function DisplayEditWATER(monitor, data) {
    var watermonitors = data;

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

    //标示线初值
    thresholdYmin = top;
    thresholdYmax = down;
    thresholdXmin = waters[0][0];
    thresholdXmax = waters[waters.length - 1][0];
    //曲线类型
    curveType = [];
    curveType.push(['地下水位', 'Value']);
    document.getElementById("editautodatachartid").style.visibility = "visible";
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
                    label += params[i].marker + params[i].seriesName + ':' + params[i].value[1] + 'm<br/>';
                }
                return time + '<br/>' + label;
            }
        },
        legend: {
            data: ['地下水位'],
            left: 'center',
            bottom: 2,
            selectedMode: "single",
            selscted: { '地下水位': true }
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
            name: 'm',
            min: Math.floor(down),
            max: Math.ceil(top),
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            //axisLabel: {
            //    formatter: '{value} m'
            //}
        },
        series: [
            {
                id: 'Value',
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
    //轴游标取值
    DragMarkLine(curveType[0][1], axisType);
    //初始化异常处理时间范围
    $("#editabnormalstarttimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmin));
    $("#editabnormalendtimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmax));
};
function DisplayEditRAIN(monitor, data) {
    var rainmonitors = data;

    var rains = [];
    var rainvals = [];
    for (var i in rainmonitors) {
        var time = Math.round(new Date(rainmonitors[i].Time + " 12:00:00") / 1000) * 1000;
        var rain = [];
        rain.push(time);
        rain.push(parseFloat(rainmonitors[i].Value));
        rains.push(rain);
        rainvals.push(parseFloat(rainmonitors[i].Value));
    }

    var yaxismin = 0;
    var yaxismax = Math.max.apply(null, rainvals);
    //标示线初值
    thresholdYmin = yaxismin;
    thresholdYmax = yaxismax;
    thresholdXmin = rains[0][0];
    thresholdXmax = rains[rains.length - 1][0];
    document.getElementById("editautodatachartid").style.visibility = "visible";
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
            }
        },
        legend: {
            data: ['降雨量(日)'],
            left: 'center',
            bottom: 2,
            selectedMode: "single",
            selscted: { '降雨量(日)': true }

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
            name: 'mm',
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            //axisLabel: {
            //    formatter: '{value} mm'
            //}
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
    //初始化异常处理时间范围
    $("#editabnormalstarttimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmin));
    $("#editabnormalendtimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmax));
};
//绘制拖动标示线
function DragMarkLine(curveid, axisType) {

    if (axisType == "X") {
        UpdataDraggingX();
    }
    else if (axisType == "Y") {
        UpdataDraggingY();
    }

    //缩放时调整标示线初始位置
    editChart.on('datazoom', function (params) {
        thresholdYmin = editChart.getOption().dataZoom[1].startValue;
        thresholdYmax = editChart.getOption().dataZoom[1].endValue;
        thresholdXmin = editChart.getOption().dataZoom[0].startValue;
        thresholdXmax = editChart.getOption().dataZoom[0].endValue;
        //异常值
        try {
            $("#editabnormalminvalueid").val(thresholdYmin.toFixed(2));
            $("#editabnormalmaxvalueid").val(thresholdYmax.toFixed(2));
            $("#editabnormalstarttimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmin));
            $("#editabnormalendtimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmax));
        }
        catch{
            //
        }
        //粗差
        try {
            $("#editgrosserrorstarttimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmin));
            $("#editgrosserrorendtimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmax));
        }
        catch{
            //
        }
        setTimeout(function () {
            if (axisType == "X") {
                UpdataDraggingX();
            }
            else if (axisType == "Y") {
                UpdataDraggingY();
            };
        }, 500);

    });
    function UpdataDraggingY() {
        editChart.setOption({
            series: [{
                id: curveid,
                markLine: {
                    symbol: ['circle', 'none'],
                    animation: false,
                    itemStyle: {
                        normal: {
                            borderWidth: 1,
                            lineStyle: {
                                type: 'solid',
                                //color: '#1E90FF ',
                                width: 5,
                            },
                            label: {
                                position: 'start',
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                textStyle: {
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    //color: 'white',
                                    padding: [2, 2, 2, 2]
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
                        { yAxis: thresholdYmin, lineStyle: { color: '#1E90FF' }, label: { color: '#1E90FF' } },
                        { yAxis: thresholdYmax, lineStyle: { color: '#FF7F00' }, label: { color: '#FF7F00' } },
                    ],
                }
            }],
            graphic: [
                {
                    id: '1',
                    type: 'rect',
                    animation: false,
                    z: 10000,
                    shape: {
                        width: 750,
                        height: 2
                        // r: 10
                    },
                    position: [0, editChart.convertToPixel({ yAxisId: '1' }, thresholdYmin)],
                    draggable: true,
                    style: {
                        fill: 'rgba(0,0,0,0 )',
                        stroke: 'rgba(0,0,0,0)',
                        lineWidth: 10
                    },
                    cursor: 'move',
                    ondrag: onPointDraggingYmin
                },
                {
                    id: '2',
                    type: 'rect',
                    animation: false,
                    z: 10000,
                    shape: {
                        width: 750,
                        height: 2
                        // r: 10
                    },
                    position: [0, editChart.convertToPixel({ yAxisId: '1' }, thresholdYmax)],
                    draggable: true,
                    style: {
                        fill: 'rgba(0,0,0,0)',
                        stroke: 'rgba(0,0,0,0)',
                        lineWidth: 20
                    },
                    cursor: 'move',
                    ondrag: onPointDraggingYmax
                },
                {
                    id: '3',
                    type: 'rect',
                    animation: false,
                    z: 0,
                    shape: {
                        width: 0,
                        height: 0
                        // r: 10
                    },
                    position: [editChart.convertToPixel({ xAxisId: '1' }, thresholdXmin), 0],
                    draggable: false,
                },
                {
                    id: '4',
                    type: 'rect',
                    animation: false,
                    z: 0,
                    shape: {
                        width: 0,
                        height: 0
                        // r: 10
                    },
                    position: [editChart.convertToPixel({ xAxisId: '1' }, thresholdXmax), 0],
                    draggable: false,
                }
            ],
        });

    }
    function UpdataDraggingX() {
        editChart.setOption({
            series: [{
                id: curveid,
                markLine: {
                    symbol: ['circle', 'none'],
                    animation: false,
                    itemStyle: {
                        normal: {
                            borderWidth: 1,
                            lineStyle: {
                                type: 'solid',
                                //color: '#1E90FF ',
                                width: 5,
                            },
                            label: {
                                position: 'start',
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                textStyle: {
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    //color: 'white',
                                    padding: [2, 2, 2, 2]
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
                        { xAxis: thresholdXmin, lineStyle: { color: '#1E90FF' }, label: { color: '#1E90FF' } },
                        { xAxis: thresholdXmax, lineStyle: { color: '#FF7F00' }, label: { color: '#FF7F00' } },
                    ],
                }
            }],
            graphic: [

                {
                    id: '3',
                    type: 'rect',
                    animation: false,
                    z: 10000,
                    shape: {
                        width: 2,
                        height: 750
                        // r: 10
                    },
                    position: [editChart.convertToPixel({ xAxisId: '1' }, thresholdXmin), 0],
                    draggable: true,
                    style: {
                        fill: 'rgba(0,0,0,0)',
                        stroke: 'rgba(0,0,0,0)',
                        lineWidth: 10
                    },
                    cursor: 'move',
                    ondrag: onPointDraggingXmin
                },
                {
                    id: '4',
                    type: 'rect',
                    animation: false,
                    z: 10000,
                    shape: {
                        width: 2,
                        height: 750
                        // r: 10
                    },
                    position: [editChart.convertToPixel({ xAxisId: '1' }, thresholdXmax), 0],
                    draggable: true,
                    style: {
                        fill: 'rgba(0,0,0,0)',
                        stroke: 'rgba(0,0,0,0)',
                        lineWidth: 10
                    },
                    cursor: 'move',
                    ondrag: onPointDraggingXmax
                },
                {
                    id: '1',
                    type: 'rect',
                    animation: false,
                    z: 0,
                    shape: {
                        width: 0,
                        height: 0
                        // r: 10
                    },
                    position: [0, editChart.convertToPixel({ yAxisId: '1' }, thresholdYmin)],
                    draggable: false,
                },
                {
                    id: '2',
                    type: 'rect',
                    animation: false,
                    z: 0,
                    shape: {
                        width: 0,
                        height: 0
                        // r: 10
                    },
                    position: [0, editChart.convertToPixel({ yAxisId: '1' }, thresholdYmax)],
                    draggable: false,
                },
            ],
        });

    }
    function onPointDraggingYmin() {
        thresholdYmin = editChart.convertFromPixel({ yAxisId: '1' }, this.position[1]);
        $("#editabnormalminvalueid").val(thresholdYmin.toFixed(2));
        editChart.setOption({
            series: [{
                id: curveid,
                markLine: {
                    data: [
                        { yAxis: thresholdYmin, lineStyle: { color: '#1E90FF' }, label: { color: '#1E90FF' } },
                        { yAxis: thresholdYmax, lineStyle: { color: '#FF7F00' }, label: { color: '#FF7F00' } },
                    ],
                }
            }],
            graphic: {
                id: '1',
                position: [0, editChart.convertToPixel({ yAxisId: '1' }, thresholdYmin)],
            }
        });
    }
    function onPointDraggingYmax() {
        thresholdYmax = editChart.convertFromPixel({ yAxisId: '1' }, this.position[1]);
        $("#editabnormalmaxvalueid").val(thresholdYmax.toFixed(2));
        editChart.setOption({
            series: [{
                id: curveid,
                markLine: {
                    data: [
                        { yAxis: thresholdYmin, lineStyle: { color: '#1E90FF' }, label: { color: '#1E90FF' } },
                        { yAxis: thresholdYmax, lineStyle: { color: '#FF7F00' }, label: { color: '#FF7F00' } },
                    ],
                }
            }],
            graphic: {
                id: '2',
                position: [0, editChart.convertToPixel({ yAxisId: '1' }, thresholdYmax)],
            }
        });
    }
    function onPointDraggingXmin() {
        thresholdXmin = editChart.convertFromPixel({ xAxisId: '1' }, this.position[0]);
        //异常
        $("#editabnormalstarttimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmin));
        //粗差
        $("#editgrosserrorstarttimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmin));
        editChart.setOption({
            series: [{
                id: curveid,
                markLine: {
                    data: [
                        { xAxis: thresholdXmin, lineStyle: { color: '#1E90FF' }, label: { color: '#1E90FF' } },
                        { xAxis: thresholdXmax, lineStyle: { color: '#FF7F00' }, label: { color: '#FF7F00' } },
                    ],
                }
            }],
            graphic: {
                id: '3',
                position: [editChart.convertToPixel({ xAxisId: '1' }, thresholdXmin), 0],
            }
        });
    }
    function onPointDraggingXmax() {
        thresholdXmax = editChart.convertFromPixel({ xAxisId: '1' }, this.position[0]);
        //异常
        $("#editabnormalendtimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmax));
        //粗差
        $("#editgrosserrorendtimeid").val(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', thresholdXmax));
        editChart.setOption({
            series: [{
                id: curveid,
                markLine: {
                    data: [
                        { xAxis: thresholdXmin, lineStyle: { color: '#1E90FF' }, label: { color: '#1E90FF' } },
                        { xAxis: thresholdXmax, lineStyle: { color: '#FF7F00' }, label: { color: '#FF7F00' } },
                    ],
                }
            }],
            graphic: {
                id: '4',
                position: [editChart.convertToPixel({ xAxisId: '1' }, thresholdXmax), 0],
            }
        });
    }
}
//高亮选中数据
function SelectedHighlight(lightdata) {
    //清空Graphic
    clearGraphic();
    editChart.setOption({
        graphic: lightdata.map(function (item, dataIndex) {
            return {
                type: 'circle',
                position: editChart.convertToPixel('grid', item),
                shape: {
                    cx: 0,
                    cy: 0,
                    r: 3
                },
                style: {
                    fill: '#01FF70',
                    stroke: '#01FF70',
                    lineWidth: 1,
                },
                invisible: false,
                bouding: 'raw',
                z: 100
            };
        })
    });
    window.addEventListener('resize', updatePosition);
    editChart.on('dataZoom', updatePosition);
    var chartOption = editChart.getOption();
    console.log(chartOption.graphic);
    function updatePosition() {
        var Gdata = [];
        Gdata = JSON.parse(JSON.stringify(lightdata));
        var indexs = [];
        for (var i in Gdata) {
            if (Gdata[i][0] > thresholdXmax || Gdata[i][1] > thresholdYmax || Gdata[i][0] < thresholdXmin || Gdata[i][1] < thresholdYmin) {
                indexs.push(i);
            }
        }
        editChart.setOption({
            graphic: Gdata.map(function (item, dataIndex) {
                if (indexs.indexOf(dataIndex.toString()) != -1) {
                    return {
                        position: editChart.convertToPixel('grid', item),
                        invisible: true,
                    };
                } else {
                    return {
                        position: editChart.convertToPixel('grid', item),
                        invisible: false,
                    };
                }

            })
        })
    };
}
//清空Graphic
function clearGraphic() {
    var chartOption = editChart.getOption();
    chartOption.graphic = [];
    editChart.setOption(chartOption, true);
}
//计算标准差
function standardDeviation(data) {
    let std,
        ave,
        sum = 0,
        sums = 0,
        len = data.length;
    for (let i = 0; i < len; i++) {
        sum += Number(data[i]);
    }
    ave = sum / len;
    for (let i = 0; i < len; i++) {
        sums += (Number(data[i]) - ave) * (Number(data[i]) - ave)
    }
    std = (Math.sqrt(sums / len)).toFixed(4);
    return std;
}
//拟合曲线计算残差
function Fittingmethod(type, data, threshold) {
    var delDataPreview = [];//预览待剔除数据
    var delData = [];//返回剔除数据
    layer.open({
        type: 1
        , title: ['预览', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
        , area: ['900px', '660px']
        , shade: 0
        , offset: 'auto'
        , closeBtn: 1
        , maxmin: true
        , moveOut: true
        , content: '<div id="regressionpreviewChartid" style="width:880px;height:560px;"></div> <form class="layui-form" id="polynomialorderformid" lay-filter="polynomialorderform" style="margin-top:5px; visibility:hidden;text-align:center"> <div class="layui-form-item"> <label class="layui-form-label">阶数：</label> <div class="layui-input-inline"> <div class="layui-input-inline selectUp" style="width:60px;"> <select id="polynomialid" name="polynomialorder" lay-verify="required" lay-filter="polynomialfilter"> <option value="1" >1</option> <option value="2" selected>2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> </select> </div> </div> </div> </form>'
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);
            var chartDom = document.getElementById('regressionpreviewChartid');
            var myChart = echarts.init(chartDom);
            var option;
            const tt = data[0][0];
            for (var i in data) {
                data[i][0] = data[i][0] - tt;//x轴数值太大数据拟合有问题，同时减去第一个值
            }
            var myRegression;
            if (type == "polynomial") {
                var order = 2;
                myRegression = ecStat.regression(type, data, order);
                preViewChart();
                document.getElementById("polynomialorderformid").style.visibility = "visible";
            }
            else {
                myRegression = ecStat.regression(type, data);
                preViewChart();
            }

            function preViewChart() {
                var regressData = myRegression.points;
                option = {
                    grid: {
                        left: '2%',
                        right: '2%',
                        top: '2%',
                        bottom: '2%',
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: 'rgba(105,105,105)',
                        formatter: function (params) {
                            var date = new Date(parseInt(params[0].value[0] + tt));
                            var y = date.getFullYear();
                            var m = date.getMonth() + 1;
                            var d = date.getDate();
                            var h = date.getHours();
                            var mm = date.getMinutes();
                            var s = date.getSeconds();
                            var time = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s);
                            var label = "";
                            for (var i in params) {
                                label += params[i].marker + params[i].seriesName + ':' + params[i].value[1].toFixed(4) + '<br/>';
                            }
                            return time + '<br/>' + label;
                        },
                    },
                    xAxis: {
                        type: 'time',
                        position: 'bottom',
                        splitLine: { show: false },
                        axisLabel: {
                            formatter: function (params, index) {
                                var time = new Date(params + tt);//恢复x轴时间序列
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
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                        }
                    },
                    series: [
                        {
                            name: 'scatter',
                            type: 'scatter',
                            symbol: 'circle',
                            symbolSize: 5,
                            data: data
                        },
                        {
                            name: 'line',
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            data: regressData
                        }
                    ]
                };
                myChart.clear();
                option && myChart.setOption(option);

                for (var i in data) {
                    for (var j in regressData) {
                        if (data[i][0] == regressData[j][0]) {
                            var val = Math.abs(data[i][1] - regressData[j][1]);
                            if (val > threshold) {
                                delDataPreview.push(data[i]);
                                delData.push([data[i][0] + tt, data[i][1]]);

                            }
                        }
                    }
                }
                if (delDataPreview.length != 0) {
                    myChart.setOption({
                        graphic: delDataPreview.map(function (item, dataIndex) {
                            return {
                                type: 'circle',
                                position: myChart.convertToPixel('grid', item),
                                shape: {
                                    cx: 0,
                                    cy: 0,
                                    r: 2
                                },
                                style: {
                                    fill: '#01FF70',
                                    stroke: '#01FF70',
                                    lineWidth: 1,
                                },
                                invisible: false,
                                bouding: 'raw',
                                z: 1000
                            };
                        })
                    });
                }
            }

            //剔除
            form.on('select(polynomialfilter)', function (e) {
                var order = Number(e.value);
                myRegression = ecStat.regression(type, data, order);
                preViewChart();
            });
            form.render();
            form.render('select');
        }
    });
    return delData;
}

//综合分析
function OverlayAnalysis() {
    var monitors = null;
    var rainmonitor = {};
    var overlayTreeDatabytwoid = null;
    //渲染工具
    document.getElementById("overlaydatapretimeid").style.visibility = "visible";
    document.getElementById("overlaydatacustomtimeid").style.visibility = "visible";
    document.getElementById("overlaydatachartid").style.visibility = "visible";

    //获取图表
    overlayChart = echarts.init(document.getElementById('overlaydatachartid'));

    //重构监测目录树
    var treeData = JSON.parse(JSON.stringify(currentprojectmonitors));
    for (var i in treeData) {
        treeData[i].type = "projectName";
        for (var j in treeData[i].children) {
            treeData[i].children[j].type = "className";
            treeData[i].children[j].showCheckbox = true;
            treeData[i].children[j].checked = false;
            treeData[i].children[j].spread = false;
            treeData[i].children[j].id = treeData[i].children[j].title + "#" + treeData[i].children[j].id;

            if (treeData[i].children[j].title == "雨量") {
                treeData[i].children[j].disabled = true;
                for (var k in treeData[i].children[j].children) {
                    treeData[i].children[j].children[k].showCheckbox = true;
                    treeData[i].children[j].children[k].checked = false;
                    treeData[i].children[j].children[k].disabled = true;
                    rainmonitor.id = treeData[i].children[j].children[k].id;
                    rainmonitor.type = treeData[i].children[j].children[k].type;
                    rainmonitor.title = treeData[i].children[j].children[k].title;
                    $('#hourrainid').removeAttr('disabled');
                    $('#dayrainid').removeAttr('disabled');
                }
            }
            else {

                for (var k in treeData[i].children[j].children) {
                    treeData[i].children[j].children[k].id = treeData[i].children[j].title + "#" + treeData[i].children[j].children[k].id;
                    treeData[i].children[j].children[k].showCheckbox = true;
                    treeData[i].children[j].children[k].checked = false;
                }
            }
        }
    }
    //渲染监测点树
    tree.render({
        elem: '#overlaymonitortree'
        , id: 'overlaymonitortreeid'
        , accordion: false
        , showLine: true
        , showCheckbox: true
        , customCheckbox: true
        , customSpread: true
        , cancelNodeFileIcon: true
        , data: treeData
        , click: function (obj) {
            if (obj.data.type == "projectName") {
                if (!isReloadTree) {
                    for (var i in treeData) {
                        if (obj.data.title == treeData[i].title) {
                            treeData[i].spread = true;
                        }
                        else {
                            treeData[i].spread = false;
                        }
                        for (var j in treeData[i].children) {
                            treeData[i].children[j].checked = false;
                        }
                    }
                    isReloadTree = true;//标记重载
                    tree.reload('overlaymonitortreeid', { data: treeData });
                    isReloadTree = false;//重载后还原
                }

            }
            if (obj.data.type == "className") {
                if (overlayTreeDatabytwoid == null) {
                    if (!isReloadTree) {
                        overlayTreeDatabytwoid = obj.data.id;
                        for (var i in treeData) {
                            for (var j in treeData[i].children) {
                                if (treeData[i].children[j].id == overlayTreeDatabytwoid) {
                                    treeData[i].children[j].spread = true;
                                    for (var k in treeData[i].children[j].children) {
                                        treeData[i].children[j].children[k].spread = true;
                                    }
                                }
                                else {
                                    treeData[i].children[j].spread = false;
                                }
                            }
                        }
                        isReloadTree = true;//标记重载
                        tree.reload('overlaymonitortreeid', { data: treeData });
                        isReloadTree = false;//重载后还原

                    }

                }
                else {
                    if (obj.data.id != overlayTreeDatabytwoid) {
                        if (!isReloadTree) {
                            overlayTreeDatabytwoid = obj.data.id;
                            //取消所有选中
                            for (var i in treeData) {
                                for (var j in treeData[i].children) {
                                    if (treeData[i].children[j].id == overlayTreeDatabytwoid) {
                                        treeData[i].children[j].spread = true;
                                    }
                                    else {
                                        treeData[i].children[j].spread = false;
                                        for (var k in treeData[i].children[j].children) {
                                            treeData[i].children[j].children[k].checked = false;
                                        }
                                    }
                                }
                            }
                            isReloadTree = true;//标记重载
                            tree.reload('overlaymonitortreeid', { data: treeData });
                            isReloadTree = false;//重载后还原
                        }
                    }
                    else {
                        if (!isReloadTree) {
                            //取消所有选中
                            for (var i in treeData) {
                                for (var j in treeData[i].children) {
                                    if (treeData[i].children[j].id == overlayTreeDatabytwoid) {
                                        treeData[i].children[j].spread = false;
                                    }
                                    break;
                                }
                            }
                            overlayTreeDatabytwoid = null;
                            isReloadTree = true;//标记重载
                            tree.reload('overlaymonitortreeid', { data: treeData });
                            isReloadTree = false;//重载后还原
                        }
                    }
                }
            }

        }
        , oncheck: function (obj) {
            if (obj.checked) {
                if (obj.data.type == "className") {
                    if (!isReloadTree) {
                        overlayTreeDatabytwoid = obj.data.id;
                        for (var i in treeData) {
                            for (var j in treeData[i].children) {
                                if (treeData[i].children[j].id == overlayTreeDatabytwoid) {
                                    treeData[i].children[j].spread = true;
                                    for (var k in treeData[i].children[j].children) {
                                        treeData[i].children[j].children[k].checked = true;
                                        treeData[i].children[j].children[k].spread = true;

                                    }
                                }
                                else {
                                    treeData[i].children[j].checked = false;
                                    treeData[i].children[j].spread = false;
                                    for (var k in treeData[i].children[j].children) {
                                        treeData[i].children[j].children[k].checked = false;
                                    }
                                }
                            }
                        }
                        isReloadTree = true;//标记重载
                        tree.reload('overlaymonitortreeid', { data: treeData });
                        isReloadTree = false;//重载后还原
                        getCheckedMonitor();
                    }
                }
                else {
                    //单个监测点选中
                    if (overlayTreeDatabytwoid != null) {
                        if (!isReloadTree) {
                            for (var i in treeData) {
                                for (var j in treeData[i].children) {
                                    if (treeData[i].children[j].id == overlayTreeDatabytwoid) {
                                        for (var k in treeData[i].children[j].children) {
                                            if (treeData[i].children[j].children[k].id == obj.data.id) {
                                                treeData[i].children[j].children[k].checked = true;
                                            }
                                        }
                                    }
                                    else {
                                        treeData[i].children[j].checked = false;
                                        for (var k in treeData[i].children[j].children) {
                                            treeData[i].children[j].children[k].checked = false;
                                        }
                                    }
                                }
                            }
                            getCheckedMonitor();
                        }
                    } else {
                        if (!isReloadTree) {
                            for (var i in treeData) {
                                for (var j in treeData[i].children) {
                                    for (var k in treeData[i].children[j].children) {
                                        if (treeData[i].children[j].children[k].id == obj.data.id) {
                                            treeData[i].children[j].children[k].checked = true;
                                            treeData[i].children[j].children[k].spread = true;
                                            overlayTreeDatabytwoid = treeData[i].children[j].id;
                                        }
                                    }
                                }
                            }
                            getCheckedMonitor();
                        }
                    }
                }
            }
            else {
                if (obj.data.type == "className") {
                    if (!isReloadTree) {
                        for (var i in treeData) {
                            for (var j in treeData[i].children) {
                                if (treeData[i].children[j].id == overlayTreeDatabytwoid) {
                                    treeData[i].children[j].checked = false;
                                    for (var k in treeData[i].children[j].children) {
                                        treeData[i].children[j].children[k].checked = false;
                                    }
                                    break;
                                }
                            }
                        }
                        getCheckedMonitor();
                        overlayTreeDatabytwoid == null;
                    }

                } else {
                    if (!isReloadTree) {
                        for (var i in treeData) {
                            for (var j in treeData[i].children) {
                                if (treeData[i].children[j].id == overlayTreeDatabytwoid) {
                                    for (var k in treeData[i].children[j].children) {
                                        if (treeData[i].children[j].children[k].id == obj.data.id) {
                                            treeData[i].children[j].checked = false;
                                            treeData[i].children[j].children[k].checked = false;
                                            //取消数据
                                            cancelCheckedMonitor(treeData[i].children[j].children[k].id.split('#')[1], treeData[i].children[j].children[k].type)
                                            break;
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }

            }
            //获取选中数据并加载
            function getCheckedMonitor() {
                monitors = [];
                for (var i in treeData) {
                    for (var j in treeData[i].children) {
                        for (var k in treeData[i].children[j].children) {
                            if (treeData[i].children[j].children[k].checked == true) {
                                var monitorid = {};
                                monitorid.id = treeData[i].children[j].children[k].id.split('#')[1];
                                monitorid.type = treeData[i].children[j].children[k].type;
                                monitorid.title = treeData[i].children[j].children[k].title;
                                monitors.push(monitorid);
                            }
                        }
                    }
                }

                if (document.getElementById("overlaydatacustomtimeid").value != "") {
                    //加载初始监测点数据
                    LoadAnalysisAutoDataCustomDateTime(monitors, document.getElementById("overlaydatacustomtimeid").value);
                }
                else {
                    //加载初始监测点数据
                    LoadAnalysisAutoDataPreDateTime(monitors, form.val("overlaydataform").overlaydatapretime);
                }

            }
        }
    });

    //预设时间范围
    if (autodatadatetimes.length > 0) {
        for (var i in autodatadatetimes) {
            if (autodatadatetimes[i].name == "最近30天") {
                document.getElementById("overlaydatapretimeid").innerHTML += '<option value="' + autodatadatetimes[i].value + '" selected>' + autodatadatetimes[i].name + '</option>';
            }
            else {
                document.getElementById("overlaydatapretimeid").innerHTML += '<option value="' + autodatadatetimes[i].value + '">' + autodatadatetimes[i].name + '</option>';
            }
        }
    }
    //自定义时间范围
    date.render({
        elem: '#overlaydatacustomtimeid'
        , type: 'date'
        , range: true
        , done: function (value, date, endDate) {
            if (value != "") {
                //按自定义时间范围绘制图表
                LoadAnalysisAutoDataCustomDateTime(monitors, value);
            }
        }
    });

    //预设时间范围切换时间
    form.on('select(overlaydatapretimefilter)', function (data) {
        if (data.value != "") {
            document.getElementById("overlaydatacustomtimeid").value = "";
            //按预设时间范围绘制图表
            LoadAnalysisAutoDataPreDateTime(monitors, data.value);

        }
    });
    //监听小时降雨开关
    form.on('switch(hourrainfilter)', function (data) {
        if (this.checked) {

            var type = "hourrain"
            LoadAnalysisRainDataDateTime(rainmonitor, type);
        }
        else {
            OverlayAnalysisData.RAINAnalysisArr = {};
            DisplayOverlayAnalysis(OverlayAnalysisData);
        }
        $('#dayrainid').prop("checked", false);
        form.render('checkbox');
    });
    //监听每日降雨开关
    form.on('switch(dayrainfilter)', function (data) {
        if (this.checked) {
            var type = "dayrain"
            LoadAnalysisRainDataDateTime(rainmonitor, type);
        } else {
            OverlayAnalysisData.RAINAnalysisArr = {};
            DisplayOverlayAnalysis(OverlayAnalysisData);
        }
        $('#hourrainid').prop("checked", false);
        form.render('checkbox');
    });

    form.render();
    form.render('select');
    form.render('checkbox');

}
//取消选中数据加载
function cancelCheckedMonitor(id, type) {
    if (type == "GNSS") {
        for (var i in OverlayAnalysisData.GNSSAnalysisArr) {
            if (OverlayAnalysisData.GNSSAnalysisArr[i].Id == id) {
                delete OverlayAnalysisData.GNSSAnalysisArr[i];
            }
        }
    } else if (type == "裂缝") {
        for (var i in OverlayAnalysisData.LFAnalysisArr) {
            if (OverlayAnalysisData.LFAnalysisArr[i].Id == id) {
                delete OverlayAnalysisData.LFAnalysisArr[i];
            }
        }
    } else if (type == "倾角") {
        for (var i in OverlayAnalysisData.QJAnalysisArr) {
            if (OverlayAnalysisData.QJAnalysisArr[i].Id == id) {
                delete OverlayAnalysisData.QJAnalysisArr[i];
            }
        }
    } else if (type == "应力") {
        for (var i in OverlayAnalysisData.YLAnalysisArr) {
            if (OverlayAnalysisData.YLAnalysisArr[i].Id == id) {
                delete OverlayAnalysisData.YLAnalysisArr[i];
            }
        }
    } else if (type == "深部位移") {
        for (var i in OverlayAnalysisData.SBWYAnalysisArr) {
            if (OverlayAnalysisData.SBWYAnalysisArr[i].Id == id) {
                delete OverlayAnalysisData.SBWYAnalysisArr[i];
            }
        }
    } else if (type == "地下水位") {
        for (var i in OverlayAnalysisData.WATERAnalysisArr) {
            if (OverlayAnalysisData.WATERAnalysisArr[i].Id == id) {
                delete OverlayAnalysisData.WATERAnalysisArr[i];
            }
        }
    }
    DisplayOverlayAnalysis(OverlayAnalysisData);

}
//加载分析数据（除降雨外）
function LoadAnalysisAutoDataPreDateTime(monitors, datetime) {
    //关闭降雨开关
    $('#dayrainid').prop("checked", false);
    $('#hourrainid').prop("checked", false);
    form.render('checkbox');
    //加载数据
    overlayChart.showLoading();
    OverlayAnalysisData = null;
    var monitorstr = { "monitorstr": monitors };
    var datastring = JSON.stringify(monitorstr);
    //请求监测点指点时间范围数据
    $.ajax({
        url: servicesurl + "/api/Data/GetAnalysisAutoDatabyPreDateTime", type: "get", data: { "monitros": datastring, "predatetime": datetime, "cookie": document.cookie },
        success: function (data) {
            OverlayAnalysisData = JSON.parse(data);
            DisplayOverlayAnalysis(OverlayAnalysisData);
        }, datatype: "json"
    });
}
function LoadAnalysisAutoDataCustomDateTime(monitors, datetime) {
    //关闭降雨开关
    $('#dayrainid').prop("checked", false);
    $('#hourrainid').prop("checked", false);
    form.render('checkbox');
    //加载数据
    overlayChart.showLoading();
    OverlayAnalysisData = null;
    var monitorstr = { "monitorstr": monitors };
    var datastring = JSON.stringify(monitorstr);
    //请求监测点指点时间范围数据
    $.ajax({
        url: servicesurl + "/api/Data/GetAnalysisAutoDatabyCustomDateTime", type: "get", data: { "monitros": datastring, "customdatetime": datetime, "cookie": document.cookie },
        success: function (data) {
            OverlayAnalysisData = JSON.parse(data);
            DisplayOverlayAnalysis(OverlayAnalysisData);
        }, datatype: "json"
    });
}
//加载降雨数据
function LoadAnalysisRainDataDateTime(rainmonitor, type) {
    overlayChart.showLoading();
    OverlayAnalysisData.RAINAnalysisArr = {};
    //请求监测点指点时间范围数据
    if (document.getElementById("overlaydatacustomtimeid").value != "") {
        var datetime = document.getElementById("overlaydatacustomtimeid").value;
        $.ajax({
            url: servicesurl + "/api/Data/GetAnalysisRainDatabyCustomDateTime", type: "get", data: { "id": rainmonitor.id, "type": type, "title": rainmonitor.title, "customdatetime": datetime, "cookie": document.cookie },
            success: function (data) {
                var rainData = JSON.parse(data);
                OverlayAnalysisData.RAINAnalysisArr = rainData;
                DisplayOverlayAnalysis(OverlayAnalysisData);
            }, datatype: "json"
        });
    }
    else {
        var datetime = form.val("overlaydataform").overlaydatapretime;
        $.ajax({
            url: servicesurl + "/api/Data/GetAnalysisRainDatabyPreDateTime", type: "get", data: { "id": rainmonitor.id, "type": type, "title": rainmonitor.title, "predatetime": datetime, "cookie": document.cookie },
            success: function (data) {
                var rainData = JSON.parse(data);
                OverlayAnalysisData.RAINAnalysisArr = rainData;
                DisplayOverlayAnalysis(OverlayAnalysisData);
            }, datatype: "json"
        });

    }

}
//叠加展示
function DisplayOverlayAnalysis(analysisDatas) {
    var yAxisData = [];
    var seriesData = [];
    var gnssAnalysisData = analysisDatas.GNSSAnalysisArr;
    var lfAnalysisData = analysisDatas.LFAnalysisArr;
    var qjAnalysisData = analysisDatas.QJAnalysisArr;
    var ylAnalysisData = analysisDatas.YLAnalysisArr;
    var waterAnalysisData = analysisDatas.WATERAnalysisArr;
    var sbwyAnalysisData = analysisDatas.SBWYAnalysisArr;
    var rainAnalysisData = analysisDatas.RAINAnalysisArr;
    if (gnssAnalysisData.length > 0) {
        var all = [];
        for (var i in gnssAnalysisData) {
            for (var j in gnssAnalysisData[i].Datas) {
                if (gnssAnalysisData[i].Datas[j].Flag != '200') {
                    all.push(parseInt(parseFloat(gnssAnalysisData[i].Datas[j].Dx) * 1000) / 1000);
                    all.push(parseInt(parseFloat(gnssAnalysisData[i].Datas[j].Dy) * 1000) / 1000);
                    all.push(parseInt(parseFloat(gnssAnalysisData[i].Datas[j].Dxy) * 1000) / 1000);
                    all.push(parseInt(parseFloat(gnssAnalysisData[i].Datas[j].Dh) * 1000) / 1000);
                }

            }
        }
        if (yAxisData.length < 1) {
            position = "left";
            var offset = 0;
        }
        else {
            position = "right";
            var offset = (yAxisData.length - 1) * 50;
        }

        var ymax = Math.max(...all);
        var ymin = Math.min(...all);
        yAxisData.push(
            {
                id: 'gnss',
                type: 'value',
                max: ymax,
                min: ymin,
                alignTicks: true,
                position: position,
                offset: offset,
                name: 'GNSS(mm)',
                nameTextStyle: {
                    fontSize: 10,
                    padding: [0, 10, 0, 0]
                },
                splitLine: { show: false }
                //splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            }
        );
        for (var i in gnssAnalysisData) {
            var id = gnssAnalysisData[i].Id;
            var name = gnssAnalysisData[i].Name;
            gnssDissplay(id, name, gnssAnalysisData[i].Datas);
        }
    };
    if (qjAnalysisData.length > 0) {
        var all = [];
        for (var i in qjAnalysisData) {
            for (var j in qjAnalysisData[i].Datas) {
                if (qjAnalysisData[i].Datas[j].Flag != '200') {
                    all.push(parseInt(parseFloat(qjAnalysisData[i].Datas[j].Dx) * 1000) / 1000);
                    all.push(parseInt(parseFloat(qjAnalysisData[i].Datas[j].Dy) * 1000) / 1000);
                }

            }
        }
        if (yAxisData.length < 1) {
            position = "left";
            var offset = 0;
        }
        else {
            position = "right";
            var offset = (yAxisData.length - 1) * 50;
        }

        var ymax = Math.max(...all);
        var ymin = Math.min(...all);
        yAxisData.push(
            {
                id: 'qj',
                type: 'value',
                max: ymax,
                min: ymin,
                alignTicks: true,
                position: position,
                offset: offset,
                name: 'QJ(°)',
                nameTextStyle: {
                    fontSize: 10,
                    padding: [0, 4, 0, 0]
                },
                splitLine: { show: false }
            }
        );
        for (var i in qjAnalysisData) {
            var id = qjAnalysisData[i].Id;
            var name = qjAnalysisData[i].Name;
            qjDissplay(id, name, qjAnalysisData[i].Datas);
        }
    };
    if (lfAnalysisData.length > 0) {
        var all = [];
        for (var i in lfAnalysisData) {
            for (var j in lfAnalysisData[i].Datas) {
                if (lfAnalysisData[i].Datas[j].Flag != '200') {
                    all.push(parseInt(parseFloat(lfAnalysisData[i].Datas[j].Dv) * 1000) / 1000);
                }

            }
        }
        if (yAxisData.length < 1) {
            position = "left";
            var offset = 0;
        }
        else {
            position = "right";
            var offset = (yAxisData.length - 1) * 50;
        }


        var ymax = Math.max(...all);
        var ymin = Math.min(...all);
        yAxisData.push(
            {
                id: 'lf',
                type: 'value',
                max: ymax,
                min: ymin,
                alignTicks: true,
                position: position,
                offset: offset,
                name: 'LF(mm)',
                nameTextStyle: {
                    fontSize: 10,
                    padding: [0, 4, 0, 0]
                },
                splitLine: { show: false }
            }
        );
        for (var i in lfAnalysisData) {
            var id = lfAnalysisData[i].Id;
            var name = lfAnalysisData[i].Name;
            lfDissplay(id, name, lfAnalysisData[i].Datas);
        }
    };
    if (ylAnalysisData.length > 0) {
        var all = [];
        for (var i in ylAnalysisData) {
            for (var j in ylAnalysisData[i].Datas) {
                if (ylAnalysisData[i].Datas[j].Flag != '200') {
                    all.push(parseInt(parseFloat(ylAnalysisData[i].Datas[j].Dv) * 1000) / 1000);
                }

            }
        }
        if (yAxisData.length < 1) {
            position = "left";
            var offset = 0;
        }
        else {
            position = "right";
            var offset = (yAxisData.length - 1) * 50;
        }

        var ymax = Math.max(...all);
        var ymin = Math.min(...all);
        yAxisData.push(
            {
                id: 'yl',
                type: 'value',
                max: ymax,
                min: ymin,
                alignTicks: true,
                position: position,
                offset: offset,
                name: 'YL(kN)',
                nameTextStyle: {
                    fontSize: 10,
                    padding: [0, 4, 0, 0]
                },
                splitLine: { show: false }
            }
        );
        for (var i in ylAnalysisData) {
            var id = ylAnalysisData[i].Id;
            var name = ylAnalysisData[i].Name;
            ylDissplay(id, name, ylAnalysisData[i].Datas);
        }
    };
    if (waterAnalysisData.length > 0) {
        var all = [];
        for (var i in waterAnalysisData) {
            for (var j in waterAnalysisData[i].Datas) {
                if (waterAnalysisData[i].Datas[j].Flag != '200') {
                    all.push(parseInt(parseFloat(waterAnalysisData[i].Datas[j].Value) * 1000) / 1000);
                }

            }
        }
        if (yAxisData.length < 1) {
            position = "left";
            var offset = 0;
        }
        else {
            position = "right";
            var offset = (yAxisData.length - 1) * 50;
        }

        var ymax = Math.max(...all);
        var ymin = Math.min(...all);
        yAxisData.push(
            {
                id: 'water',
                type: 'value',
                max: ymax,
                min: ymin,
                alignTicks: true,
                position: position,
                offset: offset,
                name: 'WATER(m)',
                nameTextStyle: {
                    fontSize: 10,
                    padding: [0, 10, 0, 0]
                },
                splitLine: { show: false }
            }
        );
        for (var i in waterAnalysisData) {
            var id = waterAnalysisData[i].Id;
            var name = waterAnalysisData[i].Name;
            waterDissplay(id, name, waterAnalysisData[i].Datas);
        }
    };
    if (sbwyAnalysisData.length > 0) {
        var all = [];
        for (var i in sbwyAnalysisData) {
            for (var j in sbwyAnalysisData[i].Datas) {
                if (sbwyAnalysisData[i].Datas[j].Flag != '200') {
                    all.push(parseInt(parseFloat(sbwyAnalysisData[i].Datas[j].X) * 1000) / 1000);
                    all.push(parseInt(parseFloat(sbwyAnalysisData[i].Datas[j].Y) * 1000) / 1000);
                }

            }
        }
        if (yAxisData.length < 1) {
            position = "left";
            var offset = 0;
        }
        else {
            position = "right";
            var offset = (yAxisData.length - 1) * 50;
        }

        var ymax = Math.max(...all);
        var ymin = Math.min(...all);
        yAxisData.push(
            {
                id: 'sbwy',
                type: 'value',
                max: ymax,
                min: ymin,
                alignTicks: true,
                position: position,
                offset: offset,
                name: 'SBWY(mm)',
                nameTextStyle: {
                    fontSize: 10,
                    padding: [0, 10, 0, 0]
                },
                splitLine: { show: false }
            }
        );
        for (var i in sbwyAnalysisData) {
            var id = sbwyAnalysisData[i].Id;
            var name = sbwyAnalysisData[i].Name;
            sbwyDissplay(id, name, sbwyAnalysisData[i].Datas);
        }
    };
    if (rainAnalysisData.length > 0) {
        if (yAxisData.length < 1) {
            position = "left";
            var offset = 0;
        }
        else {
            position = "right";
            var offset = (yAxisData.length - 1) * 50;
        }

        yAxisData.push(
            {
                id: 'rain',
                type: 'value',
                alignTicks: true,
                position: position,
                offset: offset,
                name: 'RAIN(mm)',
                nameTextStyle: {
                    fontSize: 10,
                    padding: [0, 10, 0, 0]
                },
                splitLine: { show: false }
            }
        );
        for (var i in rainAnalysisData) {
            var id = rainAnalysisData[i].Id;
            var name = rainAnalysisData[i].Name;
            var type = rainAnalysisData[i].Type;
            rainDissplay(id, name, type, rainAnalysisData[i].Datas);
        }
    };

    function gnssDissplay(id, name, gnssData) {
        //图表
        var xs = [];
        var ys = [];
        var xys = [];
        var hs = [];
        for (var i in gnssData) {
            if (gnssData[i].Flag != '200') {
                //yyyy-MM-dd HH:mm:ss转UNIX时间戳（毫秒）
                var time = Math.round(new Date(gnssData[i].Time) / 1000) * 1000;

                var x = [];
                var y = [];
                var xy = [];
                var h = [];

                x.push(time);
                x.push(parseInt(parseFloat(gnssData[i].Dx) * 1000) / 1000);
                xs.push(x);

                y.push(time);
                y.push(parseInt(parseFloat(gnssData[i].Dy) * 1000) / 1000);
                ys.push(y);

                xy.push(time);
                xy.push(parseInt(parseFloat(gnssData[i].Dxy) * 1000) / 1000);
                xys.push(xy);

                h.push(time);
                h.push(parseInt(parseFloat(gnssData[i].Dh) * 1000) / 1000);
                hs.push(h);
            }

        }

        seriesData.push(
            {
                id: id + 'Dx',
                name: name + '_X位移',
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: yAxisData.length - 1,
                showSymbol: false,
                data: xs,
            },
            {
                id: id + 'Dy',
                name: name + '_Y位移',
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: yAxisData.length - 1,
                showSymbol: false,
                data: ys
            },
            {
                id: id + 'Dxy',
                name: name + '_水平位移',
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: yAxisData.length - 1,
                showSymbol: false,
                data: xys
            },
            {
                id: id + 'Dh',
                name: name + '_垂直位移',
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: yAxisData.length - 1,
                showSymbol: false,
                data: hs
            }
        );



    }
    function lfDissplay(id, name, lfData) {
        //图表
        var lens = [];
        for (var i in lfData) {
            if (lfData[i].Flag != '200') {
                var len = [];

                len.push(Math.round(new Date(lfData[i].Time) / 1000) * 1000);
                len.push(parseFloat(lfData[i].Dv));
                lens.push(len);
            }

        }
        seriesData.push(
            {
                id: id + 'Dv',
                name: name + '_变形量',
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: yAxisData.length - 1,
                showSymbol: false,
                data: lens,
            }
        );
    }
    function qjDissplay(id, name, qjData) {
        //图表
        var xs = [];
        var ys = [];
        var zs = [];

        for (var i in qjData) {
            if (qjData[i].Flag != '200') {
                var x = [];
                var y = [];

                x.push(Math.round(new Date(qjData[i].Time) / 1000) * 1000);
                x.push(parseFloat(qjData[i].Dx));
                xs.push(x);

                y.push(Math.round(new Date(qjData[i].Time) / 1000) * 1000);
                y.push(parseFloat(qjData[i].Dy));
                ys.push(y);
            }

        }
        seriesData.push(
            {
                id: id + 'Dx',
                name: name + '_X方向角度量',
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: yAxisData.length - 1,
                showSymbol: false,
                data: xs,
            },
            {
                id: id + 'Dy',
                name: name + '_Y方向角度',
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: yAxisData.length - 1,
                showSymbol: false,
                data: ys,
            }
        );
    }
    function ylDissplay(id, name, ylData) {
        //图表
        var ps = [];
        for (var i in ylData) {
            if (ylData[i].Flag != '200') {
                var p = [];

                p.push(Math.round(new Date(ylData[i].Time) / 1000) * 1000);
                p.push(parseFloat(ylData[i].Dv));
                ps.push(p);
            }

        }
        seriesData.push(
            {
                id: id + 'Dv',
                name: name + '_应力变形量',
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: yAxisData.length - 1,
                showSymbol: false,
                data: ps,
            }
        );
    }
    function waterDissplay(id, name, waterData) {
        var waters = [];
        for (var i in waterData) {
            if (waterData[i].Flag != '200') {
                var time = Math.round(new Date(waterData[i].Time) / 1000) * 1000;
                var water = [];

                water.push(time);
                water.push(parseFloat(waterData[i].Value));
                waters.push(water);
            }

        }
        seriesData.push(
            {
                id: id + 'Value',
                name: name + '_地下水位',
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: yAxisData.length - 1,
                showSymbol: false,
                data: waters,
            }
        );
    }
    function sbwyDissplay(id, name, sbwyData) {
        //图表
        var xs = [];
        var ys = [];
        var zs = [];

        for (var i in sbwyData) {
            if (sbwyData[i].Flag != '200') {
                var x = [];
                var y = [];

                x.push(Math.round(new Date(sbwyData[i].Time) / 1000) * 1000);
                x.push(parseFloat(sbwyData[i].X));
                xs.push(x);

                y.push(Math.round(new Date(sbwyData[i].Time) / 1000) * 1000);
                y.push(parseFloat(sbwyData[i].Y));
                ys.push(y);
            }

        }
        seriesData.push(
            {
                id: id + 'X',
                name: name + '_X方向位移',
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: yAxisData.length - 1,
                showSymbol: false,
                data: xs,
            },
            {
                id: id + 'Y',
                name: name + '_Y方向位移',
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: yAxisData.length - 1,
                showSymbol: false,
                data: ys,
            }
        );

    }
    function rainDissplay(id, name, type, rainData) {
        //图表
        var rains = [];
        if (type == "dayrain") {
            for (var i in rainData) {
                var time = Math.round(new Date(rainData[i].Time + " 12:00:00") / 1000) * 1000;
                var rain = [];
                rain.push(time);
                rain.push(parseFloat(rainData[i].Value));
                rains.push(rain);
            }
            seriesData.push(
                {
                    id: id + 'x',
                    name: '降雨量(日)',
                    type: 'bar',
                    xAxisIndex: 0,
                    yAxisIndex: yAxisData.length - 1,
                    itemStyle: {
                        color: '#4cabce'
                    },
                    showSymbol: false,
                    data: rains
                }
            );
        }
        else {
            for (var i in rainData) {
                var time = Math.round(new Date(rainData[i].Time + ":00:00") / 1000) * 1000;
                var rain = [];
                rain.push(time);
                rain.push(parseFloat(rainData[i].Value));
                rains.push(rain);
            }
            seriesData.push(
                {
                    id: id + 'x',
                    name: '降雨量(小时)',
                    type: 'bar',
                    xAxisIndex: 0,
                    yAxisIndex: yAxisData.length - 1,
                    itemStyle: {
                        color: '#4cabce'
                    },
                    showSymbol: false,
                    data: rains
                }
            );
        }

    }

    if (seriesData.length == 0) {
        var option = {
            title: {
                text: '暂无数据',
                textStyle: {
                    align: 'center',
                    color: '#C0C0C0',
                    fontSize: 28,
                },
                top: 'center',
                left: 'center',
            },
            grid: {
                left: '2%',
                right: '2%',
                top: '10%',
                bottom: '10%',
                containLabel: true
            }
        };
        overlayChart.hideLoading();
        option && overlayChart.setOption(option, true, false);
    }
    else {
        var option = {
            legend: {
                type: 'scroll',
                left: 'center',
                bottom: 2,
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
                        label += params[i].marker + params[i].seriesName + ':' + params[i].value[1] + '<br/>';
                    }
                    return time + '<br/>' + label;
                },
            },
            grid: {
                left: '2%',
                right: '2%',
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
            yAxis: yAxisData,
            dataZoom: [
                {
                    //x轴滑块
                    type: 'slider',
                    height: 15,
                    xAxisIndex: 0,
                    filterMode: 'empty'
                },

                {
                    //x轴缩放
                    type: 'inside',
                    xAxisIndex: 0,
                    filterMode: 'empty'
                }
            ],
            series: seriesData
        };
        overlayChart.hideLoading();
        option && overlayChart.setOption(option, true, false);
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
        , limit: 10
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
        , limit: 10
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
        , limit: 10
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
        , limit: 10
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
        , limit: 10
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
        , limit: 10
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

    //先不要打开
    $("#LiFengDatastatisticsDiv").hide();
    $("#YingLiDatastatisticsDiv").hide();
    $("#GNSSDatastatisticsDiv").hide();
    $("#QinJiaoDatastatisticsDiv").hide();
    $("#SbwyDatastatisticsDiv").hide();
    $("#DxswDatastatisticsDiv").hide();
    
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
function zhanShiTable(data) {
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