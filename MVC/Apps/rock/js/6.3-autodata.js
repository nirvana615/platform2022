var currentmonitor = null;                      //当前监测点
var autodatachart = null;                       //图表
var monitorstatisticstable = null;              //监测点统计表
var monitorstatisticsdata = [];                 //监测点统计数据（最小值、最大值、平均值、标准差）

var pdfWindoechart = null;//节理成图
var cequpdf = null;
//节理玫瑰花
function jieLiMeiguihua() {
    
    if (currentprojectid == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        if ((automonitordatalayerindex != null) || (automonitordatalayerindex != undefined)) {
            layer.close(automonitordatalayerindex);
        }
    }
    else {
        if (automonitordatalayerindex == null) {
            automonitordatalayerindex = layer.open({
                type: 1
                , title: ['节理玫瑰花', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['800px', '700px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<form class="layui-form" style="margin-top:5px;margin-right:5px;" lay-filter="queryJieliinfoform"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">模型</label><div class="layui-input-block"><select id="modleIdSelect" name="modleId"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item" style="margin-top:5px;hegiht:40px"><div style="position:absolute;right:15px;"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="queryJiegousubmit" style="width:100px">查询</button></div></div></form><div id="autodatachart" class="layui-tab-item layui-show" style="width:790px;height:540px;top:40px"></div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    //Loading
                    var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                    //加载全部节理点
                    Getjielid(currentprojectid, loadinglayerindex);
                    form.on('submit(queryJiegousubmit)', function (data) {
                        data.field.cookie = document.cookie;
                        data.field.id = currentprojectid;
                        data.field.type = "4";
                        data.field.windowId = "";
                        data.field.collector = "";
                      
                        autodatachart = echarts.init(document.getElementById('autodatachart'));
                        autodatachart.showLoading();
                        $.ajax({
                            url: servicesurl + "/api/FlzData/GetWindowInfoList", type: "get", data: data.field,
                            success: function (result) {
                                jielitabledata = [];
                                if (result == "") {
                                    //无监测剖面信息
                                    layer.msg("无项目节理信息信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                   
                                    autodatachart.hideLoading();
                                    autodatachart.setOption([], true, false)
                                }
                                else {
                                    var jieliinfoList = JSON.parse(result);
                                    drwmeiguihua(jieliinfoList);
                                }
                            }, datatype: "json"
                        });
                        return false;
                    });
                }
                , end: function () {
                    //关闭
                    automonitordatalayerindex = null;

                    currentmonitor = null;
                    autodatachart = null;
                }
            });

        }

    }
};


//获取项目监测点
function Getjielid(projectid, index) {
    autodatachart = echarts.init(document.getElementById('autodatachart'));
    autodatachart.showLoading();
    $.ajax({
        url: servicesurl + "/api/FlzData/GetWindowInfoList", type: "get", data: {
            "id": projectid,
            "cookie": document.cookie,
            "type": "4",
            "modleId": "",
            "windowId": "",
            "collector": "",
        },
        success: function (data) {
            //关闭Loading
            layer.close(index);

            if (data == "") {
                layer.msg("无玫瑰花信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                
                autodatachart.hideLoading();
                autodatachart.setOption([], true, false);

            }
            else {
                var jieliinfoList = JSON.parse(data);
                console.log(jieliinfoList);
                //自动化监测数据时间范围（预设），自动选择
                if (modleInfoList.length > 0 && document.getElementById("modleIdSelect") != null) {//模型id
                    for (var i in modleInfoList) {
                      document.getElementById("modleIdSelect").innerHTML += '<option value="' + modleInfoList[i].Id + '">' + modleInfoList[i].MXMC + '_' + modleInfoList[i].MXSJ + '</option>';
                    }
                };
                form.render();
                form.render('select');
                drwmeiguihua(jieliinfoList);
               
            }
        }, datatype: "json"
    });
};

function sortNumber(a, b) {
    return a - b
}
function drwmeiguihua(jieliinfoList) {
    ////var data = [];
    ////var tempList = [];
    ////for (var j in jieliinfoList) {
    ////    tempList.push(jieliinfoList[j].inclination);
    ////}
    console.log(tempList);
    tempList.sort(sortNumber)
    console.log(tempList);
    for (var i = 0; i < 36; i++) {//36等分
        var z = 0;
        var sum = 0;
        for (var j in tempList) {
            if (i * 10 < tempList[j] && tempList[j] < (i + 1) * 10) {//说明在这个里面了。
                z++;//把满足的读书放进去。
                sum = sum + parseFloat(tempList[j]);
            }
        }
        if (z > 0) {
            data.push([z, (sum / z).toFixed(2)]);
        }
         else {
             data.push([0,0]);
         }

    }
    data.push([0, 360]);
    console.log(data);
    var option = {
        title: {
            text: '节理倾向玫瑰花'
        },

        polar: {},
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'

            }
        },
        angleAxis: {
            type: 'value',
            startAngle: 0
        },
        radiusAxis: {
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                restore: { show: true },
                saveAsImage: {
                    show: true,
                    pixelRatio: 1,
                    title: '保存为图片',
                    type: 'png',
                    lang: ['点击保存']
                }
            }
        },
        series: [{
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            data: data
        }]
    };

    autodatachart.hideLoading();
    autodatachart.setOption(option, true, false);
}
//节理统计
function pdfWindowTongji() {
    if (currentprojectid == null) {
        layer.msg('请先选择项目');
        return;
    }
    cequpdf = layer.open({
        type: 1
        , title: ['成图', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
        , area: ['1000px', '750px']
        , shade: 0
        , offset: 'auto'
        , closeBtn: 1
        , anim: 0
        , maxmin: true
        , moveOut: true
        ,content:pdfWindow
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);
            if (windowInfoList.length > 0) {
                for (var i in windowInfoList) {
                    document.getElementById("windowIdSelectpdf").innerHTML += '<option value="' + windowInfoList[i].id + '">' + windowInfoList[i].name + '</option>';
                }
            };
            console.log(modleInfoList);
            if (windowInfoList.length > 0) {//模型id
                for (var i in modleInfoList) {
                    document.getElementById("modleIdSelect").innerHTML += '<option value="' + modleInfoList[i].Id + '">' + modleInfoList[i].MXMC + '_' + modleInfoList[i].MXSJ + '</option>';
                }
            };
            form.render();
            form.render('select');
            form.on('submit(querypdfWindowsubmit)', function (data) {
                data.field.cookie = document.cookie;
                data.field.id = currentprojectid;
                data.field.type = '3'; 
                data.field.collector = '';
                pdfWindoechart = echarts.init(document.getElementById('pdfwinchart'));
                console.log(pdfWindoechart);
                pdfWindoechart.showLoading();
                $.ajax({
                    url: servicesurl + "/api/FlzData/GetWindowInfoList", type: "get", data: data.field,
                    success: function (result) {
                        pdfWindowtabledata = [];
                        if (result == "") {
                            //无节理信息
							layer.msg("当前测窗没有节理信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
						   
							pdfWindoechart.hideLoading();
                            pdfWindoechart.clear();
                        }
                        else {
                            var jieliinfoList = JSON.parse(result);
                            drwpdfWindow(jieliinfoList);
                        }
                    }, datatype: "json"
                });
                return false;
            });
        }
        , end: function () {
            cequpdf = null;
        }
    });
}
//成图
function drwpdfWindow(jieliinfoList) {
  
    console.log(jieliinfoList);
   
    
    var option;
    var data = [];
    var dataChildren = [];
    var maxX = -99999999;
    var maxY = -99999999;
    var minX = 99999999;
    var minY = 99999999;
    for (var i in jieliinfoList) {
        var postion = JSON.parse(jieliinfoList[i].postion);
        var datatemp = [];
        for (var j in postion) {
            console.log(postion[j]);
            console.log(cartesian2);
            var cartesian2 = new Cesium.Cartesian2(postion[j].x, postion[j].y);
            data.push([
                echarts.number.round(cartesian2.x),
                echarts.number.round(cartesian2.y)
            ]);
            datatemp.push([
                echarts.number.round(cartesian2.x),
                echarts.number.round(cartesian2.y)
            ]);
            if (cartesian2.x > maxX) {
                maxX = cartesian2.x;
            }
            if (cartesian2.x < minX) {
                minX = cartesian2.x;
            }
            if (cartesian2.y > maxY) {
                maxY = cartesian2.y;
            }
            if (cartesian2.y <minY) {
                minY = cartesian2.y;
            }
        }
        dataChildren.push(datatemp);
       
    }
    console.log(data);
    console.log(dataChildren);

    function renderItem(params, api) {
        if (params.context.rendered) {
            return;
        }
        params.context.rendered = true;
        var color = api.visual('color');
        var childrenList = [];
        for (var m = 0; m < dataChildren.length; m++) {
            var points = []; 
            for (n = 0; n < dataChildren[m].length;n++) {
                points.push(api.coord(dataChildren[m][n]));
            }
            
           var temppostion = {
                type: 'polygon',
                    transition: ['shape'],
                        shape: {
                    points: points
                },
                style: api.style({
                    fill: color,
                    stroke: echarts.color.lift(color)
                })
           }
            childrenList.push(temppostion);
        }
       
        console.log(childrenList);

        return {
            type: 'group',
            // 如果 diffChildrenByName 设为 true，则会使用 child.name 进行 diff，
            // 从而能有更好的过度动画，但是降低性能。缺省为 false。
            // diffChildrenByName: true,
            children: childrenList

        };
    }

    option = {
        tooltip: {
            trigger: 'axis'
        },
        //legend: {
        //    data: ['bar', 'error']
        //},
        //dataZoom: [{
        //    type: 'slider',
        //    filterMode: 'none'
        //}, {
        //        type: 'inside',
        //        orient: 'vertical',
        //    filterMode: 'none'
        //}],
        xAxis: {
            max: Math.ceil(maxX),
            min: Math.floor(minX),
            //max: maxX,
            //min: minX,
            splitNumber: 3,
            splitLine: {
                show: false
            }
        },
        yAxis: {
            max: Math.ceil(maxY),
            min: Math.floor(minY),
            //max: maxY,
            //min: minY,

            splitNumber: 3,
            splitLine: {
                show: false
            }
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        series: [{
            type: 'custom',
            renderItem: renderItem,
            clip: true,
            data: data
        }]
    };

    pdfWindoechart.hideLoading();
    pdfWindoechart.clear();
    pdfWindoechart.setOption(option);
}
