
var imagedatachart = null;                    //图表
var targetstatisticstable = null;            //监测点统计表
//var targetstatisticsdata = [];            //监测点统计数据（最小值、最大值、平均值、标准差）


var currenttargetid = null;    //当前目标点id
var currenttargetname = null;  //当前目标点名称
var currentppsfs = [];        //当前匹配算法
var curentresultdata = null;
var imagechangedatalayerindex = null;                           //影像变化信息可视化模块
var ppsfs = [];                                      //匹配算法

//自动化监测数据widget
function LoadChangeDataLayer(id) {
    if (id == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        if ((imagechangedatalayerindex != null) || (imagechangedatalayerindex != undefined)) {
            layer.close(imagechangedatalayerindex);
        }
    }
    else {
        if (imagechangedatalayerindex == null) {
            imagechangedatalayerindex = layer.open({
                type: 1
                , title: ['目标变化信息可视化', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['1000px', '730px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--目标变化信息可视化--> <div class="layui-row"> <!--左侧--> <div class="layui-col-md3" style="width:20%;height:600px;overflow: auto;"> <div id="targettree" class="grid-demo"></div> </div>  <!--右侧--> <div class="layui-col-md9" style="width:80%;height:540px;border-left:solid;border-color:#e6e6e6;border-left-width:0px;"> <div class="grid-demo grid-demo-bg1"> <!--工具栏--> <form class="layui-form" lay-filter="imagedataform" style="margin-top:5px;"> <div class="layui-row"> <div class="layui-col-xs6"> <div class="grid-demo grid-demo-bg1"> <div class="layui-form-item"> <div class="layui-input-block" style="margin-left:10px;visibility:hidden;" id="imagedatapretimedivid"> <select id="imagedatapretimeid" name="imagedatapretime" lay-filter="imagedatapretimefilter"></select> </div> </div> </div> </div> <div class="layui-col-xs6"> <div class="grid-demo"> <div class="layui-form-item"> <div class="layui-input-block" style="margin-left:10px;margin-right:10px;visibility:hidden;" id="imagedatacustomtimedivid"> <input id="imagedatacustomtimeid" name="imagedatacustomtime" type="text" class="layui-input" placeholder="开始时间 — 结束时间"> </div> </div> </div> </div> </div> <div class="layui-form-item" pane="" id="imagedatappsdivfid" style="visibility:hidden;"> <label class="layui-form-label" style="text-align:left;">匹配算法</label> <div class="layui-input-block" id="imagedatappsfid"> </div> </div>  </form> <!--各靶区对变化数据图形--> <div id="imagedatachart" class="layui-tab-item layui-show" style="width:790px;height:540px"></div>  </div> </div> </div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    //（1）预设时间：自动化监测数据时间范围（预设）
                    if (imagedatadatetimes.length > 0) {
                        for (var i in imagedatadatetimes) {
                            if (imagedatadatetimes[i].name == "全部") {
                                document.getElementById("imagedatapretimeid").innerHTML += '<option value="' + imagedatadatetimes[i].value + '" selected>' + imagedatadatetimes[i].name + '</option>';
                            }
                            else {
                                document.getElementById("imagedatapretimeid").innerHTML += '<option value="' + imagedatadatetimes[i].value + '">' + imagedatadatetimes[i].name + '</option>';
                            }
                        }
                    }
                    //预设时间范围切换时间
                    form.on('select(imagedatapretimefilter)', function (data) {
                        if (data.value != "") {
                            //按预设时间范围绘制图表
                            LoadImageDataPreDateTime(currenttargetid, data.value);
                        }
                    });


                    //(2)自定义时间：自定义时间范围
                    date.render({
                        elem: '#imagedatacustomtimeid'
                        , type: 'datetime'
                        , range: true
                        , done: function (value, date, endDate) {
                            if (value != "") {
                                //按自定义时间范围绘制图表
                                LoadImageDataCustomDateTime(currenttargetid, value);
                            }
                        }
                    });


                    //---获取当前项目下所有目标集合，并构建目标树
                    GetTargets(id);

                    form.render();
                    form.render('select');
                }
                , end: function () {
                    //关闭
                    imagechangedatalayerindex = null;

                    currenttarget = null;
                    changedatachart = null;
                    targetstatisticstable = null;
                    targetstatisticsdata = [];
                    currentppsfs = [];
                }
            });
        }
    }



};





//获取项目目标集合
function GetTargets(projectid) {
    $.ajax({
        url: servicesurl + "/api/ImageTarget/GetTargetList", type: "get", data: { "id": projectid, "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                var targets = JSON.parse(result.data);

                var imagetargetlist = [];
                for (var i in targets) {
                    var target = new Object;
                    target.id = targets[i].Id;
                    target.title = targets[i].MBMC;
                    if (i == 0) {
                        currenttargetid = target.id; //默认第一个目标为当前目标
                        currenttargetname = target.title;
                    }

                    imagetargetlist.push(target);
                }

                //渲染目标树
                tree.render({
                    elem: '#targettree'
                    , id: 'imagetargetlistid'
                    , showCheckbox: false
                    , showLine: true
                    , data: imagetargetlist
                    , edit: false
                    , accordion: true
                    , click: function (obj) {
                        if (obj.data.id != currenttargetid) {
                            currenttargetid = obj.data.id;
                            currenttargetname = obj.data.title;
                            LoadImageDataPreDateTime(currenttargetid, form.val("imagedataform").imagedatapretime);
                        }
                    }
                });

                //显示工具栏
                document.getElementById("imagedatapretimedivid").style.visibility = "visible";
                document.getElementById("imagedatacustomtimedivid").style.visibility = "visible";


                form.render();
                form.render('select');

                var data1 = form.val("imagedataform");

                //加载初始目标数据
                LoadImageDataPreDateTime(currenttargetid, form.val("imagedataform").imagedatapretime);
            }
            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }, datatype: "json"
    });
};


//预设时间范围加载影像结果数据
function LoadImageDataPreDateTime(targetid, datetime) {
    //实例化图表
    imagedatachart = echarts.init(document.getElementById('imagedatachart'));
    imagedatachart.showLoading();

    //请求目标点预设时间范围数据
    $.ajax({
        url: servicesurl + "/api/ImageResult/GetImageResultDatabyPreDateTime", type: "get", data: { "id": targetid, "predatetime": datetime, "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);

            if (result.code == 1) {
                var imageresultdata = JSON.parse(result.data);

                //渲染匹配算法
                RenderMatchWay(imageresultdata.MatchWays);

                curentresultdata = imageresultdata;

                //展示数据
                DisplayImageLength(curentresultdata, currentppsfs);
            }
            else {
                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }

            //DisplayDATA(target, data);
        }, datatype: "json"
    });
};


//自定义时间范围加载影像结果数据
function LoadImageDataCustomDateTime(targetid, customtime) {
    //实例化图表
    imagedatachart = echarts.init(document.getElementById('imagedatachart'));
    imagedatachart.showLoading();

    //请求目标指点时间范围数据
    $.ajax({
        url: servicesurl + "/api/ImageResult/GetImageResultbyCustomDateTime", type: "get", data: { "id": targetid, "customdatetime": customtime, "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);

            if (result.code == 1) {
                var imageresultdata = JSON.parse(result.data);

                //渲染匹配算法
                RenderMatchWay(imageresultdata.MatchWays);

                //展示数据
                DisplayImageLength(imageresultdata, currentppsfs);
            }
            else {
                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }

            //DisplayDATA(target, data);
        }, datatype: "json"
    });
};

//渲染目标点匹配算法
function RenderMatchWay(ways) {
    document.getElementById("imagedatappsfid").innerHTML = "";
    currentppsfs = [];
    if (ppsfs.length > 0) {
        for (var i in ppsfs) {
            if (ways.indexOf(ppsfs[i].value != -1)) {
                if (i == 0) {
                    document.getElementById("imagedatappsfid").innerHTML += '<input type="checkbox" name="' + ppsfs[i].value + '" lay-skin="primary" lay-filter="imagedatappsffilter" style="width:100px;" title="' + ppsfs[i].name + '" checked="">';
                    currentppsfs.push(ppsfs[i].value.toString());
                }
                else {
                    document.getElementById("imagedatappsfid").innerHTML += '<input type="checkbox" name="' + ppsfs[i].value + '" lay-skin="primary" lay-filter="imagedatappsffilter" style="width:100px;" title="' + ppsfs[i].name + '">';
                }
            }
        }
    }

    document.getElementById("imagedatappsdivfid").style.visibility = "visible";

    form.on('checkbox(imagedatappsffilter)', function (data) {
        //console.log(data.elem); //得到checkbox原始DOM对象
        //console.log(data.elem.checked); //是否被选中，true或者false
        //console.log(data.value); //复选框value值，也可以通过data.elem.value得到
        //console.log(data.othis); //得到美化后的DOM对象

        if (data.elem.checked) {
            if (currentppsfs.length > 0) {
                if (currentppsfs.indexOf(data.elem.name) == -1) {
                    currentppsfs.push(data.elem.name);
                }
            }
            else {
                currentppsfs.push(data.elem.name);
            }
        }
        else {
            if (currentppsfs.length > 0) {
                if (currentppsfs.indexOf(data.elem.name) != -1) {
                    var result = [];

                    for (var i in currentppsfs) {
                        if (currentppsfs[i] != data.elem.name) {
                            result.push(currentppsfs[i]);
                        }
                    }

                    currentppsfs = result;
                }
            }
        }

        DisplayImageLength(curentresultdata, currentppsfs);


    });

    form.render();
    form.render('checkbox');
};


//展示数据
//function DisplayImageLength(data, ways) {
//    var series = [];
//    var legend = [];

//    for (var i in ways) {
//        for (var j in data.Lefts) {
//            for (var k in data.Rights) {
//                var serie = new Object;
//                serie.name = ways[i] + "-" + data.Lefts[j].BQMC + "-" + data.Rights[k].BQMC;
//                legend.push(serie.name);
//                serie.type = 'line';
//                serie.showSymbol = false;

//                var seriedatas = [];

//                var left_seriedata = [];//[ time,left]
//                var right_seriedata = [];

//                for (var ii in data.Results) {

//                    if (data.Results[ii].PPSF == ways[i]) {

//                        if (data.Results[ii].RoiId == data.Lefts[j].Id) {
//                            var left = new Object;
//                            left.time = Math.round(new Date(data.Results[ii].YXCJSJ) / 1000) * 1000;
//                            var pos = new Object;
//                            pos.x = data.Results[ii].RoiX;
//                            pos.y = data.Results[ii].RoiY;
//                            pos.scale = data.Results[ii].Scale;
//                            left.pos = pos;
//                            left_seriedata.push(left);
//                        }

//                        if (data.Results[ii].RoiId == data.Rights[k].Id) {
//                            var right = new Object;
//                            right.time = Math.round(new Date(data.Results[ii].YXCJSJ) / 1000) * 1000;
//                            var pos = new Object;
//                            pos.x = data.Results[ii].RoiX;
//                            pos.y = data.Results[ii].RoiY;




//                            pos.scale = data.Results[ii].Scale;
//                            right.pos = pos;
//                            right_seriedata.push(right);
//                        }
//                    }
//                }

//                var len0 = Math.abs(left_seriedata[0].pos.x - right_seriedata[0].pos.x) * left_seriedata[0].pos.scale;


//                for (var ii in left_seriedata) {
//                    for (var jj in right_seriedata) {

//                        if (Math.abs(left_seriedata[ii].time - right_seriedata[jj].time) < 0.01) {
//                            var serisedata = [];
//                            serisedata.push(left_seriedata[ii].time);



//                            //剔除错误值，将匹配失败、匹配错误的结果赋值为0
//                            if (
//                                left_seriedata[ii].pos.x == -2222 || left_seriedata[ii].pos.y == -9999 ||
//                                right_seriedata[jj].pos.x == -2222 || right_seriedata[jj].pos.y == -9999

//                            ) {
//                                var len = 0;
//                            }
//                            else {
//                                var len = (Math.abs(left_seriedata[ii].pos.x - right_seriedata[jj].pos.x) * left_seriedata[ii].pos.scale - len0)/1000;
//                            }



//                            //剔除粗差 <3倍中误差...

//                            if (Math.abs(len) > 0.3) {
//                                serisedata.push(0);
//                            }
//                            else {
//                                serisedata.push(len);
//                            }
//                            seriedatas.push(serisedata);                                                
//                        }
//                    }
//                }

//                serie.data = seriedatas;
//                series.push(serie);
//            }
//        }
//    }


//    var option = {
//        title: {
//            text: currenttargetname,
//            textStyle: {
//                fontSize: 20,
//                fontFamily: 'sans-serif',
//                fontWeight: 'bold'
//            },
//            left: "center",
//            top: 10
//        },
//        legend: {
//            type: 'scroll',
//            data: legend,
//            left: 'center',
//            bottom: 10
//        },
//        tooltip: {
//            trigger: 'axis',
//            formatter: function (params) {
//                var date = new Date(parseInt(params[0].value[0]));
//                var y = date.getFullYear();
//                var m = date.getMonth() + 1;
//                var d = date.getDate();
//                var h = date.getHours();
//                var mm = date.getMinutes();
//                var s = date.getSeconds();
//                var time = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s);
//                var label = "";
//                for (var i in params) {
//                    label += params[i].marker + params[i].seriesName + ':' + params[i].value[1].toFixed(2) + 'm<br/>'; //更改标签单位mm---m
//                }
//                return time + '<br/>' + label;
//            }
//        },
//        grid: {
//            left: '5%',
//            right: '5%',
//            top: '10%',
//            bottom: '10%',
//            containLabel: true
//        },
//        toolbox: {
//            feature: {
//                saveAsImage: {}
//            }
//        },
//        xAxis: {
//            type: 'time',
//            splitLine: { show: false },
//            axisLabel: {
//                formatter: function (params, index) {
//                    var time = new Date(params);
//                    var y = time.getFullYear();
//                    var m = time.getMonth() + 1;
//                    var d = time.getDate();
//                    var h = time.getHours();
//                    var mm = time.getMinutes();
//                    var s = time.getSeconds();
//                    //return (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (s < 10 ? '0' + s : s) + '\n' + y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
//                    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
//                }
//            }
//        },
//        yAxis: {
//            type: 'value',
//            min: -0.5,
//            max: 0.5,
//            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
//            axisLabel: {
//                formatter: '{value} m'  //y轴更改单位mm---m
//            }
//        },
//        dataZoom: [
//            //{
//            //    //x轴滑块
//            //    type: 'slider',
//            //    height: 15,
//            //    xAxisIndex: 0,
//            //    filterMode: 'empty'
//            //},
//            {
//                //y轴滑块
//                type: 'slider',
//                width: 40,
//                yAxisIndex: 0,
//                filterMode: 'empty'
//            },
//            {
//                //x轴缩放
//                type: 'inside',
//                xAxisIndex: 0,
//                filterMode: 'empty'
//            },
//            {
//                //y轴缩放
//                type: 'inside',
//                yAxisIndex: 0,
//                filterMode: 'empty'
//            }
//        ],
//        series: series
//    };

//    imagedatachart.hideLoading();
//    imagedatachart.setOption(option, true, false);

//};
function DisplayImageLength(data, ways) {
    var series = [];
    var legend = [];

    for (var i in ways) {
        for (var j in data.Lefts) {
            for (var k in data.Rights) {
                var serie = new Object;
                serie.name = ways[i] + "-" + data.Lefts[j].BQMC + "-" + data.Rights[k].BQMC;
                legend.push(serie.name);
                serie.type = 'line';
                serie.showSymbol = false;

                var seriedatas = [];

                var left_seriedata = [];//[ time,left]
                var right_seriedata = [];

                for (var ii in data.Results) {

                    if (data.Results[ii].PPSF == ways[i]) {

                        if (data.Results[ii].RoiId == data.Lefts[j].Id) {
                            var left = new Object;
                            left.time = Math.round(new Date(data.Results[ii].YXCJSJ) / 1000) * 1000;
                            var pos = new Object;
                            pos.x = data.Results[ii].RoiX;
                            pos.y = data.Results[ii].RoiY;
                            pos.scale = data.Results[ii].Scale;
                            left.pos = pos;
                            left_seriedata.push(left);
                        }

                        if (data.Results[ii].RoiId == data.Rights[k].Id) {
                            var right = new Object;
                            right.time = Math.round(new Date(data.Results[ii].YXCJSJ) / 1000) * 1000;
                            var pos = new Object;
                            pos.x = data.Results[ii].RoiX;
                            pos.y = data.Results[ii].RoiY;




                            pos.scale = data.Results[ii].Scale;
                            right.pos = pos;
                            right_seriedata.push(right);
                        }
                    }
                }

                var len0 = Math.abs(left_seriedata[0].pos.x - right_seriedata[0].pos.x) * left_seriedata[0].pos.scale;


                for (var ii in left_seriedata) {
                    for (var jj in right_seriedata) {

                        if (Math.abs(left_seriedata[ii].time - right_seriedata[jj].time) < 0.01) {
                            var serisedata = [];
                            serisedata.push(left_seriedata[ii].time);



                            //剔除错误值，将匹配失败、匹配错误的结果赋值为0
                            if (
                                left_seriedata[ii].pos.x == -2222 || left_seriedata[ii].pos.y == -9999 ||
                                right_seriedata[jj].pos.x == -2222 || right_seriedata[jj].pos.y == -9999

                            ) {
                                var len = 0;
                            }
                            else {
                                var len = (Math.abs(left_seriedata[ii].pos.x - right_seriedata[jj].pos.x) * left_seriedata[ii].pos.scale - len0) / 1000;
                            }



                            //剔除粗差 <3倍中误差...

                            if (Math.abs(len) > 0.3) {
                                serisedata.push(0);
                            }
                            else {
                                serisedata.push(len);
                            }
                            seriedatas.push(serisedata);
                        }
                    }
                }

                serie.data = seriedatas;
                series.push(serie);
            }
        }
    }


    var option = {
        title: {
            text: currenttargetname,
            textStyle: {
                fontSize: 20,
                fontFamily: 'sans-serif',
                fontWeight: 'bold'
            },
            left: "center",
            top: 10
        },
        legend: {
            type: 'scroll',
            data: legend,
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
                    label += params[i].marker + params[i].seriesName + ':' + params[i].value[1].toFixed(2) + 'm<br/>'; //更改标签单位mm---m
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
            type: 'category',
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
            min: -0.5,
            max: 0.5,
            splitLine: { show: true, lineStyle: { color: '#DCDCDC' } },
            axisLabel: {
                formatter: '{value} m'  //y轴更改单位mm---m
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
                width: 40,
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
        series: series
    };

    imagedatachart.hideLoading();
    imagedatachart.setOption(option, true, false);

};


$.ajax({
    url: servicesurl + "/api/Parameter/GetAutoDataDateTime", type: "get",
    success: function (data) {
        var imagedatadatetimedatas = JSON.parse(data);
        for (var i in imagedatadatetimedatas) {
            var imagedatadatetimedata = new Object;
            imagedatadatetimedata.name = imagedatadatetimedatas[i][0];
            imagedatadatetimedata.value = imagedatadatetimedatas[i][1];
            imagedatadatetimes.push(imagedatadatetimedata);
        }
    }, datatype: "json"
});

$.ajax({
    url: servicesurl + "/api/Parameter/GetPPSF", type: "get",
    success: function (data) {
        ppsfs = [];
        var ppsfdata = JSON.parse(data);
        for (var i in ppsfdata) {
            var ppsf = new Object;
            ppsf.name = ppsfdata[i][0];
            ppsf.value = ppsfdata[i][1];
            ppsfs.push(ppsf);
        }
    }, datatype: "json"
});

