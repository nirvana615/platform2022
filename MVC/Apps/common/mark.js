/*
 * 必须先引用layui
 * 必须先创建viewer变量
 * 必须先创建handler变量
 * 必须先创建currentprojectid变量
 */

/*
 * 必须先引用layui
 * 必须先创建viewer变量
 * 必须先创建handler变量
 */
var markwidgetlayerindex = null;//标绘弹出层
var markpointlayerindex = null;//点标注弹出层
var marklinelayerindex = null;//线标注弹出层
var markpolygonlayerindex = null;//面标注弹出层
var markstylelayerindex = null;//样式弹出层

var markType = "";//新增标注类型 1:点 2：线 3：多边形
var markClickType = "";//
var currentmarkpointstyle = '../Resources/img/mark/img_mark_P1.png';//默认点标注样式
var currentmarkcolor = '#cc0000';//默认点标注颜色
var markprojectid;//标注项目id

var markAddLayer = [];//新增点标注列表
var markAddPointLayerList = [];//新增点标注列表
var markAddLineLayerList = [];//新增线标注列表
var markAddPolygonLayerList = [];//新增面标注列表


var markProjectLayer = [];//项目点标注列表






var markwidget_temppoints = [];
var markwidget_tempentities = [];

var depthTestAgainstTerrain = null;//深度监测初始值
var modelpolt = null;//模型标绘
var markwidget_tipsentity = null;//操作提示


//标绘widget
function Markwidget(id) {
    if (markwidgetlayerindex != null) {
        layer.setTop(markwidgetlayerindex);
        return;
    }
    markwidgetlayerindex = layer.open({
        type: 1
        , title: ['标绘', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['350px', '850px']
        , shade: 0
        , offset: ['85px', '1350px']
        , closeBtn: 1
        , moveOut: true
        , resize: false
        , content: '<div class="layui-tab layui-tab-brief" lay-filter="marklayer" style="margin:0px;">    <ul class="layui-tab-title">        <li lay-id="markmanager" class="layui-this" style="width:40%;padding-top: 10px;line-height: normal;">标注管理</li>        <li lay-id="addmark" style="width:40%;padding-top:10px;line-height:20px">新增绘制</li>    </ul>    <div class="layui-tab-content" style="padding:0px;">        <div class="layui-tab-item layui-show" id="marklayerlist_tab">            <div id="marklayerlist"></div>        </div>        <div class="layui-tab-item" id="addmark_tab">            <fieldset class="layui-elem-field" style="margin-top:5px;margin-left: 10px;margin-right: 10px;">                <legend>标注列表</legend>                <div id="addmarklayerlist" style="width: 100%; height: 320px; overflow: scroll;"></div>            </fieldset>            <fieldset class="layui-elem-field" style="margin-left: 5px;margin-right: 10px;">                <legend>标注信息</legend>                <div class="layui-field-box" style="margin-top:-10px;margin-left:-15px;">                    <div class="layui-field-box" style="margin-top:5px;margin-left:5px;"><div class="layui-input-inline" style="width: 100px;">    <input type="text" value="" placeholder="请选择颜色" class="layui-input" id="mark-point-color-select"></div><div class="layui-inline" style="left: -11px;">    <div id="mark-point-color"></div></div><button type="button" id="mark-point-style-select" onclick="selectMarkStyle(this)" class="layui-btn layui-btn-radius layui-btn-primary layui-btn-s" style="border-radius: 5px">    样式<i class="layui-icon layui-icon-down layui-font-14"></i></button>                    </div>                    <form class="layui-form" id ="addmarkinfo" style="height:170px;width: 100%;line-height:25px;margin-top: 5px;margin-left: 20px;"lay-filter="markpointinfoform">                    </form>                </div>            </fieldset>            <fieldset class="layui-elem-field" style="margin-top: 5px;margin-left: 10px;margin-right: 10px;">                <div class="layui-field-box">                    <div class="addmarktypebtn"><button type="button" id="mark_point_id" onclick="pointMark()" class="layui-btn layui-btn-primary layui-btn-l" style="border-radius: 20px">    <i class="layui-icon"><svg t="1641867009268" class="icon" style="position:relative;top:5px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2166" width="25" height="25"><path id="svg_mark_point_id" d="M275.803763 807.259233c0 41.755308 119.463415 67.80971 234.774053 67.80971 115.310639 0 234.774053-26.054402 234.774054-67.752822 0-29.808966-61.097003-55.465157-138.008688-67.752822 0 0 189.093519 22.527387 189.093519 67.695934 0 33.108432-108.427271 102.966086-285.858885 102.966086C333.203089 910.225319 227.563299 851.972683 227.563299 807.259233c0-44.315238 183.575447-67.297724 183.575447-67.297723-75.660163 12.458328-135.39187 37.886969-135.39187 67.354611z m-150.182578 48.069803c0 71.279837 196.431986 117.756794 384.842857 117.756794 188.353984 0 382.282927-46.476957 382.282927-117.756794 0-50.857282-99.837282-94.774309-225.501417-115.765737 0 0 299.853171 35.554588 299.85317 115.765737C967.098722 930.420325 802.125435 1024 512.341324 1024 222.443438 1024 56.901278 940.204948 56.901278 855.329036c0-87.378955 289.840999-115.026202 289.840998-115.026202-123.559303 21.218978-221.064204 64.680906-221.064204 115.026202zM455.11266 455.126597v284.436702h113.77468V455.126597a255.424158 255.424158 0 0 1-57.456213 6.826481c-18.374611 0-37.204321-2.275494-56.318467-6.826481z m56.88734-455.098722c-17.464413 0-34.758165 2.104832-51.881254 6.314495A234.603391 234.603391 0 0 0 369.952311 50.088734a209.345412 209.345412 0 0 0-35.156376 35.270151A228.743995 228.743995 0 0 0 284.450639 227.577236c0 62.519187 22.186063 116.050174 66.558188 160.649849A218.788711 218.788711 0 0 0 512 455.126597c62.917398 0 116.619048-22.299837 160.991173-66.899512C717.363298 343.62741 739.549361 290.15331 739.549361 227.577236c0-62.519187-22.186063-116.050174-66.558188-160.649849A218.788711 218.788711 0 0 0 512 0.027875zM426.66899 113.802555a28.614332 28.614332 0 0 1-14.449385-3.754564 26.281951 26.281951 0 0 1-10.239721-10.69482A30.320952 30.320952 0 0 1 398.225319 84.903787c0-7.452242 2.844367-13.994286 8.419327-19.569246A26.850825 26.850825 0 0 1 426.213891 56.915215a35.270151 35.270151 0 0 1 11.206806 1.877282c3.697677 1.251521 6.826481 3.242578 9.272636 6.030058 2.503043 2.844367 4.550987 5.916283 6.086946 9.329524A25.599303 25.599303 0 0 1 455.11266 84.903787a30.320952 30.320952 0 0 1-3.754565 14.449384 26.281951 26.281951 0 0 1-10.239721 10.69482A28.614332 28.614332 0 0 1 426.66899 113.802555z" fill="#FF4500" p-id="2167"></path></svg></i></button><button type="button" id="mark_line_id" onclick="lineMark()" class="layui-btn layui-btn-radius layui-btn-primary layui-btn-s">    <i class="layui-icon"><svg t="1641868176794" class="icon" style="position:relative;top:5px;" viewBox="0 0 1194 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4935" width="25" height="25"><path id="svg_mark_line_id" d="M1194.511472 127.993334a127.967062 127.967062 0 1 0-183.740841 115.251797l-58.532255 528.051315a121.504345 121.504345 0 0 0-26.27121 9.168652l-170.605236-170.605236a127.993334 127.993334 0 1 0-233.813766-6.567802l-174.256934 174.256934a127.336553 127.336553 0 0 0-48.628009-9.562721h-2.627121L205.584325 485.780939a127.993334 127.993334 0 1 0-81.44075 26.087311l91.765335 286.356186a128.019605 128.019605 0 1 0 210.668831 97.7289 126.679773 126.679773 0 0 0-15.762726-61.44836l167.610318-167.557775a127.362825 127.362825 0 0 0 61.448359 15.762726 125.707738 125.707738 0 0 0 55.169541-12.531367l170.762863 170.762863a125.707738 125.707738 0 0 0-12.557638 55.16954 127.967062 127.967062 0 1 0 183.74084-115.251797l58.584798-528.051315a127.888249 127.888249 0 0 0 98.937376-124.814517zM101.918131 442.197002a63.576327 63.576327 0 1 1 26.27121 5.700852 62.000055 62.000055 0 0 1-26.27121-5.700852z m260.768028 453.598707a63.970396 63.970396 0 1 1-127.940791 0 62.656835 62.656835 0 0 1 4.833902-24.432226 63.760226 63.760226 0 0 1 52.962759-39.144102 38.119525 38.119525 0 0 1 6.173734-0.394068 64.94243 64.94243 0 0 1 18.783915 2.627121 64.180565 64.180565 0 0 1 44.004276 49.31106 55.16954 55.16954 0 0 1 1.155934 12.032215z m277.292618-277.240077a54.433947 54.433947 0 0 1-11.9534-1.261018 63.891582 63.891582 0 0 1-52.016995-62.76192 46.736482 46.736482 0 0 1 0.341525-6.173734 63.944124 63.944124 0 0 1 127.599266 6.173734 21.016968 21.016968 0 0 1-0.21017 3.520343 63.760226 63.760226 0 0 1-60.239884 60.423782 21.016968 21.016968 0 0 1-3.520342 0.078813z m405.23341 277.240077a63.996667 63.996667 0 0 1-127.993334 0 21.200866 21.200866 0 0 1 0.183899-3.520343 63.471243 63.471243 0 0 1 26.691549-48.44411 61.868699 61.868699 0 0 1 33.653419-11.822045 20.727984 20.727984 0 0 1 3.520343-0.210169 64.338193 64.338193 0 0 1 63.970395 63.970395z m21.305951-703.83198a64.338193 64.338193 0 0 1-63.970396-63.970395 63.996667 63.996667 0 1 1 101.117887 51.964452 63.234802 63.234802 0 0 1-37.147491 12.005943z" p-id="4936" fill="#FF4500"></path></svg></i></button><button type="button" id="mark_polygon_id" onclick="polygonMark()" class="layui-btn layui-btn-radius layui-btn-primary layui-btn-s">    <i class="layui-icon"><svg t="1641969738478" class="icon" style="position:relative;top:5px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1647" width="25" height="25"><path id="svg_mark_polygon_id" d="M989.616212 723.412395V373.680592a85.753086 85.753086 0 1 0-112.182955-128.885609L167.218518 58.953967A85.753086 85.753086 0 1 0 41.788631 159.361871l106.423419 709.062832a85.113138 85.113138 0 0 0-36.221079 69.882366 85.753086 85.753086 0 0 0 166.258595 29.117652l597.45583-116.790583a85.753086 85.753086 0 1 0 113.910816-127.157748zM229.933462 858.825477L125.237903 161.729681c10.239174-5.375567 19.454431-12.798968 26.749843-21.630257l702.663348 183.793182c6.2075 28.093735 26.301879 50.939893 52.731748 61.243062v326.82165c-25.597936 9.9192-45.436337 31.741441-52.21979 58.747264l-589.456475 115.318702a86.840998 86.840998 0 0 0-35.83711-27.197807z" p-id="1648" fill="#FF4500"></path></svg></i></button>                    </div>                    <div style="margin-top: 15px;text-align:center;margin-left: -21px; "><button type="button" class="layui-btn  layui-btn-radius layui-btn-sm" style="width:65px;" id="add_mark_save_id" onclick="saveMark()">保存</button><button type="button" class="layui-btn  layui-btn-radius layui-btn-sm" style="width:65px;" id="add_mark_export_id" onclick="exportMark()">导出</button><button type="button" class="layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm" style="width:65px;" id="" onclick=""></button><button type="button" class="layui-btn  layui-btn-radius layui-btn-primary layui-btn-sm" style="width:65px;" id="" onclick=""></button>                    </div>                </div>            </fieldset>        </div>    </div></div>'
        , zIndex: layer.zIndex
        , success: function (layero) {

            layer.setTop(layero);
            //记录当前深度检测值
            depthTestAgainstTerrain = viewer.scene.globe.depthTestAgainstTerrain;
            //默认地形标注
            viewer.scene.globe.depthTestAgainstTerrain = true;
            markprojectid = id;
            //选择颜色
            layui.colorpicker.render({
                elem: '#mark-point-color'
                , color: '#cc0000'
                , format: 'RGB'
                , predefine: true
                , alpha: true
                , done: function (color) {
                    $('#mark-point-color-select').val(color);//向隐藏域赋值
                    currentmarkcolor = color;
                    color || this.change(color); //清空时执行 change
                }
                , change: function (color) {
                }
            });
            layui.form.render();
            loadMarkProjectLayersTree();
            loadMarkAddLayersTree();
            layui.tree.render({
                elem: '#addmarklayerlist'
                , id: 'addmarklayerTree'
                , showCheckbox: true
                //, customCheckbox: true
                , customOperate: false
                , showLine: true
                , data: markAddLayer
                , edit: ['update', 'del']
                , accordion: true
                , click: function (obj) {
                    addMarkLayerClick(obj);
                }
                , oncheck: function (obj) {
                    addMarkLayerCheck(obj);
                }
            });


            //操作提示
            markwidget_tipsentity = viewer.entities.add({
                label: {
                    show: false,
                    showBackground: true,
                    font: "14px monospace",
                    horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                    pixelOffset: new Cesium.Cartesian2(20, 20),
                    scaleByDistance: new Cesium.NearFarScalar(20000, 1, 8000000, 0),
                },
            });
        }
        , end: function () {
            //还原当前深度检测值
            viewer.scene.globe.depthTestAgainstTerrain = depthTestAgainstTerrain;
            viewer._container.style.cursor = "default";//还原鼠标样式
            markwidgetlayerindex = null;
            markstylelayerindex = null;
            markAddLayer = [];
            markProjectLayer = [];
            ClearMarkTemp();
        }
    });
};


//加载项目标注层级树
function loadMarkProjectLayersTree() {
    var data = {};
    data.cookie = document.cookie;
    data.markprojectid = markprojectid;
    //请求图层列表
    $.ajax({
        url: servicesurl + "/api/Mark/GetMarkProjectList", type: "get", data: data,
        success: function (result) {
            var data = JSON.parse(result);
            var projecttext = $("#currentproject").find("option:selected").text();
            if (data.code == "1") {
                var markProject_temp = JSON.parse(data.data);

                if (projecttext != "") {
                    var markproject = [];

                    var markProjectPointLayerList = [];//项目点标注列表
                    var markProjectLineLayerList = [];//项目线标注列表
                    var markProjectPolygonLayerList = [];//项目面标注列表


                    for (var i in markProject_temp) {
                        if (markProject_temp[i].projetid != "null") {
                            if (markProject_temp[i].marktype == "point") {
                                var pointobj = new Object;
                                pointobj.showCheckbox = true;//显示复选框
                                pointobj.checked = true;
                                pointobj.id = markProject_temp[i].id;
                                pointobj.title = markProject_temp[i].title;
                                pointobj.projetid = markProject_temp[i].projetid;//
                                pointobj.position = markProject_temp[i].position;//
                                pointobj.style = markProject_temp[i].style;//
                                pointobj.color = markProject_temp[i].color;//
                                pointobj.info = markProject_temp[i].info;//
                                markProjectPointLayerList.push(pointobj);
                            }
                            else if (markProject_temp[i].marktype == "line") {
                                var lineobj = new Object;
                                lineobj.showCheckbox = true;//显示复选框
                                lineobj.checked = true;
                                lineobj.id = markProject_temp[i].id;
                                lineobj.title = markProject_temp[i].title;
                                lineobj.projetid = markProject_temp[i].projetid;//
                                lineobj.position = markProject_temp[i].position;//
                                lineobj.style = markProject_temp[i].style;//
                                lineobj.color = markProject_temp[i].color;//
                                lineobj.info = markProject_temp[i].info;//
                                markProjectLineLayerList.push(lineobj);
                            }
                            else if (markProject_temp[i].marktype == "polygon") {
                                var polygonobj = new Object;
                                polygonobj.showCheckbox = true;//显示复选框
                                polygonobj.checked = true;
                                polygonobj.id = markProject_temp[i].id;
                                polygonobj.title = markProject_temp[i].title;
                                polygonobj.projetid = markProject_temp[i].projetid;//
                                polygonobj.position = markProject_temp[i].position;//
                                polygonobj.style = markProject_temp[i].style;//
                                polygonobj.color = markProject_temp[i].color;//
                                polygonobj.info = markProject_temp[i].info;//
                                markProjectPolygonLayerList.push(polygonobj);
                            }
                        }

                    }

                    //项目标注一级菜单
                    var markprojectobj = new Object;
                    markprojectobj.title = projecttext;
                    markprojectobj.type = "markproject";
                    markprojectobj.children = markproject;
                    markprojectobj.spread = true;
                    markProjectLayer.push(markprojectobj);
                    //项目标注二级菜单
                    var markprojectpointobj = new Object;
                    markprojectpointobj.title = "点标注";
                    markprojectpointobj.type = "point";
                    markprojectpointobj.children = markProjectPointLayerList;
                    markprojectpointobj.spread = true;
                    markproject.push(markprojectpointobj);

                    var markprojectlineobj = new Object;
                    markprojectlineobj.title = "线标注";
                    markprojectlineobj.type = "line";
                    markprojectlineobj.children = markProjectLineLayerList;
                    markprojectlineobj.spread = true;
                    markproject.push(markprojectlineobj);

                    var markprojectpolygonobj = new Object;
                    markprojectpolygonobj.title = "面标注";
                    markprojectpolygonobj.type = "line";
                    markprojectpolygonobj.children = markProjectPolygonLayerList;
                    markprojectpolygonobj.spread = true;
                    markproject.push(markprojectlineobj);
                }
            
                var markProjectPointTempLayerList = [];//临时点标注列表
                var markProjectLineTempLayerList = [];//临时线标注列表
                var markProjectPolygonTempLayerList = [];//临时面标注列表

                for (var i in markProject_temp) {
                    if (markProject_temp[i].projetid == "null") {
                        if (markProject_temp[i].marktype == "point") {
                            var pointobj = new Object;
                            pointobj.showCheckbox = true;//显示复选框
                            pointobj.checked = true;
                            pointobj.id = markProject_temp[i].id;
                            pointobj.title = markProject_temp[i].title;
                            pointobj.projetid = markProject_temp[i].projetid;//
                            pointobj.position = markProject_temp[i].position;//
                            pointobj.style = markProject_temp[i].style;//
                            pointobj.color = markProject_temp[i].color;//
                            pointobj.info = markProject_temp[i].info;//
                            markProjectPointTempLayerList.push(pointobj);
                        }
                        else if (markProject_temp[i].marktype == "line") {
                            var lineobj = new Object;
                            lineobj.showCheckbox = true;//显示复选框
                            lineobj.checked = true;
                            lineobj.id = markProject_temp[i].id;
                            lineobj.title = markProject_temp[i].title;
                            lineobj.projetid = markProject_temp[i].projetid;//
                            lineobj.position = markProject_temp[i].position;//
                            lineobj.style = markProject_temp[i].style;//
                            lineobj.color = markProject_temp[i].color;//
                            lineobj.info = markProject_temp[i].info;//
                            markProjectLineTempLayerList.push(lineobj);
                        }
                        else if (markProject_temp[i].marktype == "polygon") {
                            var polygonobj = new Object;
                            polygonobj.showCheckbox = true;//显示复选框
                            polygonobj.checked = true;
                            polygonobj.title = markProject_temp[i].title;
                            polygonobj.id = markProject_temp[i].id;
                            polygonobj.projetid = markProject_temp[i].projetid;//
                            polygonobj.position = markProject_temp[i].position;//
                            polygonobj.style = markProject_temp[i].style;//
                            polygonobj.color = markProject_temp[i].color;//
                            polygonobj.info = markProject_temp[i].info;//
                            markProjectPolygonTempLayerList.push(polygonobj);
                        }
                    }
                }

                var marktemp = [];


                //临时标注一级菜单
                var marktempobj = new Object;
                marktempobj.title = "临时标注";
                marktempobj.type = "markproject";
                marktempobj.children = marktemp;
                marktempobj.spread = true;
                markProjectLayer.push(marktempobj);

                //临时标注二级菜单
                var markprojectpointtmpobj = new Object;
                markprojectpointtmpobj.title = "点标注";
                markprojectpointtmpobj.type = "point";
                markprojectpointtmpobj.children = markProjectPointTempLayerList;
                markprojectpointtmpobj.spread = true;
                marktemp.push(markprojectpointtmpobj);

                var markprojectlinetempobj = new Object;
                markprojectlinetempobj.title = "线标注";
                markprojectlinetempobj.type = "line";
                markprojectlinetempobj.children = markProjectLineTempLayerList;
                markprojectlinetempobj.spread = true;
                marktemp.push(markprojectlinetempobj);

                var markprojectpolygontemobj = new Object;
                markprojectpolygontemobj.title = "面标注";
                markprojectpolygontemobj.type = "line";
                markprojectpolygontemobj.children = markProjectPolygonTempLayerList;
                markprojectpolygontemobj.spread = true;
                marktemp.push(markprojectpolygontemobj);

                //加载项目标注树
                layui.tree.render({
                    elem: '#marklayerlist'
                    , id: 'markProjectlayerTree'
                    , showCheckbox: true
                    //, customCheckbox: true
                    , customOperate: false
                    , showLine: true
                    , data: markProjectLayer
                    , edit: ['add', 'update', 'del']
                    , accordion: true
                    , click: function (obj) {
                    }
                    , oncheck: function (obj) {
                    }
                    , operate: function (obj) {
                        projectMarkNodeOperate(obj);
                    }
                });


            }

        }, datatype: "json"
    });
};
//加载新增标注层级树
function loadMarkAddLayersTree() {
    var addpointmarkobj = new Object;
    addpointmarkobj.title = "点标注";
    addpointmarkobj.type = "point";
    addpointmarkobj.children = markAddPointLayerList;
    addpointmarkobj.spread = true;
    markAddLayer.push(addpointmarkobj);


    var addlinemarkobj = new Object;
    addlinemarkobj.title = "线标注";
    addlinemarkobj.type = "line";
    addlinemarkobj.children = markAddLineLayerList;
    addlinemarkobj.spread = true;
    markAddLayer.push(addlinemarkobj);

    var addpolygonmarkobj = new Object;
    addpolygonmarkobj.title = "面标注";
    addpolygonmarkobj.type = "polygon";
    addpolygonmarkobj.children = markAddPolygonLayerList;
    addpolygonmarkobj.spread = true;
    markAddLayer.push(addpolygonmarkobj);


};

//点标注
function pointMark() {
    markType = "0";
    selectAddMarkTypeOperate("mark_point_id");
    viewer._container.style.cursor = "crosshair";//修改鼠标样式
    if (handler != undefined) {
        handler.destroy();
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    //左击
    handler.setInputAction(function (leftclick) {
        var pickedOject;

        if (viewer.scene.globe.depthTestAgainstTerrain) {
            //地形标注
            pickedOject = viewer.scene.pickPosition(leftclick.position);
        } else {
            //模型标注
            pickedOject = viewer.scene.pick(leftclick.position);
        }

        if (pickedOject != undefined) {
            var pointmarktemp = new Object;
            var position = viewer.scene.pickPosition(leftclick.position);
            if (position != undefined) {              
                var longitude; //经度
                var latitude;   //纬度
                var height;

                if (viewer.scene.globe.depthTestAgainstTerrain) {
                    var blh = Cesium.Cartographic.fromCartesian(position);
                    longitude = Cesium.Math.toDegrees(blh.longitude);
                    latitude = Cesium.Math.toDegrees(blh.latitude);
                    height = blh.height;
                }
                else {
                    var blh = CGCS2000XYZ2BLH(position.x, position.y, position.z);
                    longitude = blh.y;
                    latitude = blh.x;
                    height = blh.z;
                }

                if (height > 0) {
                    var id_temp = "add_mark_point" + NewGuid();
                    var time_temp= new Date().getTime();//时间戳
                    if (Cesium.defined(position)) {
                        viewer.entities.add({
                            name: "add_mark_point_" + time_temp,
                            id: id_temp,
                            position: position,
                            billboard: {
                                image: currentmarkpointstyle,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                color: Cesium.Color.fromCssColorString(currentmarkcolor),
                                width: 25,
                                height: 25,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY
                            }
                        });
                        viewer.entities.add({
                            name: "add_mark_point_label" + NewGuid(),
                            position: position,
                            label: {
                                text: longitude.toFixed(6) + '，' + latitude.toFixed(6) + '，' + (height).toFixed(3),
                                showBackground: true,
                                fillColor: Cesium.Color.AQUA,
                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                font: '18px Times New Roman',
                                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                pixelOffset: new Cesium.Cartesian2(0.0, -50),
                                scaleByDistance: new Cesium.NearFarScalar(20000, 1, 8000000, 0),
                            }
                        });
                        pointmarktemp.showCheckbox = true;//显示复选框
                        pointmarktemp.checked = true;
                        pointmarktemp.id = id_temp;
                        pointmarktemp.title = "点标注";
                        pointmarktemp.projetid = markprojectid;//
                        pointmarktemp.position = JSON.stringify(position);//
                        pointmarktemp.longitude = longitude;
                        pointmarktemp.latitude = latitude;
                        pointmarktemp.height = height;
                        pointmarktemp.marktype = "point";//
                        pointmarktemp.style = currentmarkpointstyle;//
                        pointmarktemp.color = currentmarkcolor;//
                        pointmarktemp.info = "null";//
                        markAddPointLayerList.push(pointmarktemp);
                        updateMarkInfoPanel(pointmarktemp);
                        tree.reload('addmarklayerTree', {
                            data: markAddLayer
                        });
                    }
                }
            }
        }    

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        //右击结束标注
     handler.setInputAction(function () {
            if (handler != undefined) {
                handler.destroy();
                layer.msg("结束点标注！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                unselectAddMarkTypeOperate();
                markType = "";
            }
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
};
//线标注
function lineMark() {
    markType = "1";
    selectAddMarkTypeOperate("mark_line_id");
    viewer._container.style.cursor = "crosshair";//修改鼠标样式

    markwidget_temppoints = [];//清除临时点
    markwidget_tempentities = [];//清除临时图形

    if (handler != undefined) {
        handler.destroy();
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    //左键
    handler.setInputAction(function (leftclick) {

        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            pickedOject = viewer.scene.pickPosition(leftclick.position);//地形标注
        }
        else {
            pickedOject = viewer.scene.pick(leftclick.position);//模型标注
        }

        if (pickedOject != undefined) {
            var xyz = viewer.scene.pickPosition(leftclick.position);
            if (xyz != undefined) {
                var tempentity = viewer.entities.add({
                    name: "add_mark_line" + NewGuid(),
                    position: xyz,
                    point: {
                        pixelSize: 8,
                        color: Cesium.Color.YELLOW,
                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                    }
                });
                markwidget_temppoints.push(xyz);
                markwidget_tempentities.push(tempentity);

                if (markwidget_temppoints.length > 1) {
                    var tempentity_line = viewer.entities.add({
                        name: "add_mark_line" + NewGuid(),
                        polyline: {
                            positions: [markwidget_temppoints[markwidget_temppoints.length - 2], xyz],
                            width: 2,
                            material: Cesium.Color.fromCssColorString(currentmarkcolor),
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.fromCssColorString(currentmarkcolor)
                            }),
                        }
                    });
                    markwidget_tempentities.push(tempentity_line);
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //右键（结束）
    handler.setInputAction(function (rightclik) {
        var linemarktemp = new Object;

        if (viewer.entities.getById("line_temp9999") != null) {
            viewer.entities.removeById("line_temp9999");//删除临时边线
        }

        if (markwidget_temppoints.length == 1 && markwidget_tempentities.length == 1) {
            if (viewer.entities.contains(markwidget_tempentities[0])) {
                viewer.entities.remove(markwidget_tempentities[0]);

                markwidget_temppoints = [];
                markwidget_tempentities = [];

                layer.msg('请至少绘制两个点！');
            }
        }
        else if (markwidget_temppoints.length > 1) {
            var lens = 0;
            var diss = 0;

            for (var i = 1; i < markwidget_temppoints.length; i++) {
                var len = Cesium.Cartesian3.distance(markwidget_temppoints[i - 1], markwidget_temppoints[i]);
                var blh1 = Cesium.Cartographic.fromCartesian(markwidget_temppoints[i - 1]);
                var blh2 = Cesium.Cartographic.fromCartesian(markwidget_temppoints[i]);
                var dis = Math.sqrt(Math.pow(len, 2) - Math.pow(Math.abs(blh1.height - blh2.height), 2));
                lens += len;
                diss += dis;
            }

            viewer.entities.add({
                name: "add_mark_line_label_" + NewGuid(),
                position: markwidget_temppoints[markwidget_temppoints.length - 1],
                label: {
                    text: '空间距离：' + lens.toFixed(3) + 'm',
                    showBackground: true,
                    backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                    font: '18px Times New Roman',
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                    pixelOffset: new Cesium.Cartesian2(0.0, -30),
                    scaleByDistance: new Cesium.NearFarScalar(20000, 1, 8000000, 0),
                }
            });

            linemarktemp.showCheckbox = true;//显示复选框
            linemarktemp.checked = true;
            linemarktemp.id = "add_mark_line_" + NewGuid();
            linemarktemp.title = "线标注";
            linemarktemp.projetid = markprojectid;//
            linemarktemp.position = JSON.stringify(markwidget_temppoints);//
            linemarktemp.marktype = "line";//
            linemarktemp.style = "null";//
            linemarktemp.color = currentmarkcolor;//
            linemarktemp.info = "null";//
            markAddLineLayerList.push(linemarktemp);
            updateMarkInfoPanel(linemarktemp);
            tree.reload('addmarklayerTree', {
                data: markAddLayer
            });
   
            markwidget_temppoints = [];
            markwidget_tempentities = [];        

            if (handler != undefined) {
                handler.destroy();
                layer.msg("结束线标注！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                unselectAddMarkTypeOperate();
                markType = "";
                markwidget_tipsentity.label.show = false;
                markwidget_tipsentity.label.text = "";
            }
        }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    //移动（操作提示）
    handler.setInputAction(function (move) {
        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            pickedOject = viewer.scene.pickPosition(move.endPosition);//地形标注
        } else {
            pickedOject = viewer.scene.pick(move.endPosition);//模型标注
        }

        if (pickedOject != undefined) {
            var position = viewer.scene.pickPosition(move.endPosition);
            if (position != undefined) {
                markwidget_tipsentity.position = position;
                markwidget_tipsentity.label.show = true;
                markwidget_tipsentity.label.text = "左键点击开始标注，右键点击结束标注";

                if (markwidget_temppoints.length > 0) {
                    if (viewer.entities.getById("line_temp9999") != null) {
                        viewer.entities.removeById("line_temp9999");//删除临时边线
                    }
                    //绘制多边形临时边线
                    viewer.entities.add({
                        id: "line_temp9999",
                        polyline: {
                            positions: [markwidget_temppoints[markwidget_temppoints.length - 1], position],
                            width: 2,
                            arcType: Cesium.ArcType.RHUMB,
                            material: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.fromCssColorString(currentmarkcolor),
                            }),
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.fromCssColorString(currentmarkcolor),
                            }),
                        }
                    });
                }
            }
            else {
                markwidget_tipsentity.label.show = false;
                markwidget_tipsentity.label.text = "";
            }
        }
        else {
            markwidget_tipsentity.label.show = false;
            markwidget_tipsentity.label.text = "";
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

};
//面标注
function polygonMark() {
    markType = "2";
    selectAddMarkTypeOperate("mark_polygon_id");
    viewer._container.style.cursor = "crosshair";//修改鼠标样式

    markwidget_temppoints = [];//清除临时点
    markwidget_tempentities = [];//清除临时图形

    if (handler != undefined) {
        handler.destroy();
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    //左键（开始标注）
    handler.setInputAction(function (leftclik) {

        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            pickedOject = viewer.scene.pickPosition(leftclik.position);//地形标注
        } else {
            pickedOject = viewer.scene.pick(leftclik.position);//模型标注
        }

        if (pickedOject != undefined) {
            var position = viewer.scene.pickPosition(leftclik.position);
            if (position != undefined) {
                if (Cesium.defined(position)) {
                    var tempentity = viewer.entities.add({
                        name: "add_mark_polygon" + NewGuid(),
                        position: position,
                        point: {
                            pixelSize: 8,
                            color: Cesium.Color.YELLOW,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                        },
                    });
                    markwidget_temppoints.push(position);
                    markwidget_tempentities.push(tempentity);
                }
                if (markwidget_temppoints.length > 1) {
                    var tempentity_line = viewer.entities.add({
                        name: "add_mark_polygon" + NewGuid(),
                        polyline: {
                            positions: [markwidget_temppoints[markwidget_temppoints.length - 2], position],
                            width: 2,
                            arcType: Cesium.ArcType.RHUMB,
                            material: Cesium.Color.fromCssColorString(currentmarkcolor),
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.fromCssColorString(currentmarkcolor),
                            }),
                        }
                    });
                    markwidget_tempentities.push(tempentity_line);
                }
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //右键（结束）
    handler.setInputAction(function () {
        if (viewer.entities.getById("line_temp9999") != null) {
            viewer.entities.removeById("line_temp9999");
        }
        if (viewer.entities.getById("line_temp9998") != null) {
            viewer.entities.removeById("line_temp9998");
        }

        if (markwidget_temppoints.length > 2) {
            var polygonmarktemp = new Object;


            //绘制多边形闭合线
            viewer.entities.add({
                name: "add_mark_polygon" + NewGuid(),
                polyline: {
                    positions: [markwidget_temppoints[0], markwidget_temppoints[markwidget_temppoints.length - 1]],
                    width: 2,
                    arcType: Cesium.ArcType.RHUMB,
                    material: Cesium.Color.fromCssColorString(currentmarkcolor),
                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                        color: Cesium.Color.fromCssColorString(currentmarkcolor),
                    }),
                }
            });

            var xsum = 0;
            var ysum = 0;
            var zsum = 0;
            var lens = 0;
            var diss = 0;
            var area = 0;
            var xys = [];
            for (var i = 0; i < markwidget_temppoints.length; i++) {
                if (i == 0) {
                    lens += Cesium.Cartesian3.distance(markwidget_temppoints[markwidget_temppoints.length - 1], markwidget_temppoints[0]);
                }
                else {
                    lens += Cesium.Cartesian3.distance(markwidget_temppoints[i - 1], markwidget_temppoints[i]);
                }

                xsum += markwidget_temppoints[i].x;
                ysum += markwidget_temppoints[i].y;
                zsum += markwidget_temppoints[i].z;

                var blh = CGCS2000XYZ2BLH(markwidget_temppoints[i].x, markwidget_temppoints[i].y, markwidget_temppoints[i].z);
                var xy = bl2xy(blh.x, blh.y, 3, 108, false);
                xys.push(new Cesium.Cartesian2(xy.x, xy.y));
            }

            for (var i = 0; i < xys.length; i++) {
                if (i == 0) {
                    diss += Cesium.Cartesian2.distance(xys[0], xys[xys.length - 1]);
                }
                else {
                    diss += Cesium.Cartesian2.distance(xys[i], xys[i - 1]);
                }
            }

            for (var i = 1; i < xys.length - 1; i++) {
                area += (xys[i].x - xys[0].x) * (xys[i + 1].y - xys[0].y) - (xys[i].y - xys[0].y) * (xys[i + 1].x - xys[0].x);
            }
            area = Math.abs(area) * 0.5;

            viewer.entities.add({
                name: "add_mark_polygon_label_" + NewGuid(),
                position: new Cesium.Cartesian3(xsum / markwidget_temppoints.length, ysum / markwidget_temppoints.length, zsum / markwidget_temppoints.length),
                label: {
                    text: '平面面积：' + area.toFixed(3) + 'm²',
                    showBackground: true,
                    backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                    font: '18px Times New Roman',
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                    pixelOffset: new Cesium.Cartesian2(0.0, -50),
                    scaleByDistance: new Cesium.NearFarScalar(20000, 1, 8000000, 0),
                }
            });

            if (handler != undefined) {
                handler.destroy();
                layer.msg("结束线标注！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                unselectAddMarkTypeOperate();
                markType = "";
                markwidget_tipsentity.label.show = false;
                markwidget_tipsentity.label.text = "";
            }
            polygonmarktemp.showCheckbox = true;//显示复选框
            polygonmarktemp.checked = true;
            polygonmarktemp.id = "add_mark_polygon_" + NewGuid();
            polygonmarktemp.title = "面标注";
            polygonmarktemp.projetid = markprojectid;//
            polygonmarktemp.position = JSON.stringify(markwidget_temppoints);//
            polygonmarktemp.marktype = "polygon";//
            polygonmarktemp.style = "null";//
            polygonmarktemp.color = currentmarkcolor;//
            polygonmarktemp.info = "null";//
            markAddPolygonLayerList.push(polygonmarktemp);
            updateMarkInfoPanel(polygonmarktemp);
            tree.reload('addmarklayerTree', {
                data: markAddLayer
            });

            markwidget_temppoints = [];
            markwidget_tempentities = [];
        }
        else if (markwidget_temppoints.length > 0) {
            for (var i in markwidget_tempentities) {
                if (viewer.entities.contains(markwidget_tempentities[i])) {
                    viewer.entities.remove(markwidget_tempentities[i]);
                }
            }
            markwidget_temppoints = [];
            markwidget_tempentities = [];
            layer.msg('请至少绘制三个点！');
        }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    //移动（操作提示）
    handler.setInputAction(function (move) {
        var pickedOject;
        if (viewer.scene.globe.depthTestAgainstTerrain) {
            pickedOject = viewer.scene.pickPosition(move.endPosition);//地形标注
        } else {
            pickedOject = viewer.scene.pick(move.endPosition);//模型标注
        }

        if (pickedOject != undefined) {
            var position = viewer.scene.pickPosition(move.endPosition);
            if (position != undefined) {
                markwidget_tipsentity.position = position;
                markwidget_tipsentity.label.show = true;
                markwidget_tipsentity.label.text = "左键点击开始标注，右键点击结束标注";

                if (markwidget_temppoints.length > 0) {
                    if (viewer.entities.getById("line_temp9999") != null) {
                        viewer.entities.removeById("line_temp9999");//删除临时边线
                    }
                    //绘制多边形临时边线
                    viewer.entities.add({
                        id: "line_temp9999",
                        polyline: {
                            positions: [markwidget_temppoints[markwidget_temppoints.length - 1], position],
                            width: 2,
                            arcType: Cesium.ArcType.RHUMB,
                            material: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.fromCssColorString(currentmarkcolor),
                            }),
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.fromCssColorString(currentmarkcolor),
                            }),
                        }
                    });

                    if (markwidget_temppoints.length > 1) {
                        if (viewer.entities.getById("line_temp9998") != null) {
                            viewer.entities.removeById("line_temp9998");//删除临时闭合线
                        }
                        //绘制多边形临时闭合线
                        viewer.entities.add({
                            id: "line_temp9998",
                            polyline: {
                                positions: [markwidget_temppoints[0], position],
                                width: 2,
                                arcType: Cesium.ArcType.RHUMB,
                                material: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.fromCssColorString(currentmarkcolor),
                                }),
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.fromCssColorString(currentmarkcolor),
                                }),
                            }
                        });
                    }
                }
            }
            else {
                markwidget_tipsentity.label.show = false;
                markwidget_tipsentity.label.text = "";
            }
        }
        else {
            markwidget_tipsentity.label.show = false;
            markwidget_tipsentity.label.text = "";
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

};

//保存标注
function saveMark() {
    var postmarks = [];
    var markdata = {};

    for (var i in markAddLayer) {
        for (var j in markAddLayer[i].children) {
            if (markAddLayer[i].children[j].checked == true) {
                var data = new Object;
                data.id="null"
                data.title = markAddLayer[i].children[j].title;
                data.position = markAddLayer[i].children[j].position;
                data.style = markAddLayer[i].children[j].style;
                data.color = markAddLayer[i].children[j].color;
                data.projetid = markAddLayer[i].children[j].projetid;
                data.marktype = markAddLayer[i].children[j].marktype;
                data.info = markAddLayer[i].children[j].info;
                postmarks.push(data);
            }
        }
    }

    markdata.cookie = document.cookie;
    markdata.postmarks = JSON.stringify(postmarks);

    $.ajax({
        url: servicesurl + "/api/Mark/AddMark", type: "post", data: markdata,
        success: function (result) {
            var data = JSON.parse(result);
            layer.msg(data.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            if (data.code == "1") {
                //更新已保存的标注树
                for (var i in markAddLayer) {
                    var re_num = [];
                    for (var j = markAddLayer[i].children.length - 1; j >= 0; j--) {
                        if (markAddLayer[i].children[j].checked == true) {
                            re_num.push(j);
                        }
                    }
                    for (var n in re_num) {
                        markAddLayer[i].children.splice(parseInt(re_num[n]), 1);
                    }

                }
                tree.reload('addmarklayerTree', {
                    data: markAddLayer
                });
            }
        }, datatype: "json"
    });

};

//导出标注
function exportMark() {

};

//标注信息面板更新
function updateMarkInfoPanel(markobject) {
    if (markType == "0" || markClickType == "point") {
        var divtemp = document.getElementById("addmarkinfo");
        divtemp.innerHTML = '<div class="layui-row" >    <div class="layui-col-md6">        <div class="grid-demo grid-demo-bg1">            <label class="layui-form-label" style="padding-left: 0px;text-align: left;">名称：</label>            <div class="layui-input-block">                <input type="text" name="addmarkpointinfo_name" class="layui-input" readonly="readonly" style="width: 90px;margin-left: -70px;" />            </div>        </div>    </div></div><div class="layui-row" style="margin-top: 10px;">    <div class="layui-col-md6">        <div class="grid-demo grid-demo-bg1">            <label class="layui-form-label" style="padding-left: 0px;text-align: left;">经度：</label>            <div class="layui-input-block">                <input type="text" name="addmarkpointinfo_longitude" class="layui-input" readonly="readonly" style="width: 90px;margin-left: -70px;" />            </div>        </div>    </div>    <div class="layui-col-md6">        <div class="grid-demo">            <label class="layui-form-label" style="padding-left: 0px;text-align: left;">纬度：</label>            <div class="layui-input-block">                <input type="text" name="addmarkpointinfo_latitude" class="layui-input" readonly="readonly" style="width: 90px;margin-left: -70px;" />            </div>        </div>    </div></div><div class="layui-row" style="margin-top: 10px;">    <div class="layui-col-md6">        <div class="grid-demo grid-demo-bg1">            <label class="layui-form-label" style="padding-left: 0px;text-align: left;">高程：</label>            <div class="layui-input-block">                <input type="text" name="addmarkpointinfo_height" class="layui-input" readonly="readonly" style="width: 90px;margin-left: -70px;" />            </div>        </div>    </div></div><div class="layui-row" style="margin-top: 10px;">    <div class="layui-col-md6">        <div class="grid-demo grid-demo-bg1">            <label class="layui-form-label" style="padding-left: 0px;text-align: left;width: 45px;">样式：</label>            <img id="addmarkpointinfo_style" src="/Resources/img/mark/markpointselected_style.png" style=" width: 25px; height: 25px;margin: 5px;" class="markPointStyle">        </div>    </div></div>'
        layui.form.val("markpointinfoform", {
            "addmarkpointinfo_name": markobject.title
            , "addmarkpointinfo_longitude": markobject.longitude.toFixed(6)
            , "addmarkpointinfo_latitude": markobject.latitude.toFixed(6)
            , "addmarkpointinfo_height": markobject.height.toFixed(3)
        });
        changeMarkImageColor("addmarkpointinfo_style", markobject.style, markobject.color);
        $('#mark-point-color-select').val(markobject.color);
        document.getElementsByClassName("layui-colorpicker-trigger-span")[0].style.cssText = "background: #90ee90;"
    }
    if (markType == "1" || markClickType == "line") {

    }
    if (markType == "2" || markClickType == "polygon") {

    }
};


//节点操作(查看、编辑、删除)
function projectMarkNodeOperate(obj) {
    if (obj.type === 'add') {

    }
    else if (obj.type === 'edit') {

    }
    else if (obj.type === 'del') {
        //删除项目
        $.ajax({
            url: servicesurl + "/api/Mark/DeleteMark", type: "delete", data: { "id": obj.data.id, "cookie": document.cookie },
            success: function (data) {
                layer.msg(data.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                markProjectLayer = [];
                loadMarkProjectLayersTree();
            }, datatype: "json"
        });
    }
}

//点击新增标注节点操作
function addMarkLayerClick(obj) {

    if (JSON.stringify(obj.data.id) == undefined) {
        //表示父节点则无操作
    } else {
        markClickType = obj.data.marktype;
        if (markClickType == "point") {
            updateMarkInfoPanel(obj.data);
        }
        if (markClickType == "line") {
            updateMarkInfoPanel(obj.data);
        }
        if (markClickType == "polygon") {
            updateMarkInfoPanel(obj.data);
        }
    }
};
//选中新增标注节点操作
function addMarkLayerCheck(obj) {
    //更新选中状态
    for (var i in markAddLayer) {
        if (markAddLayer[i].type == obj.data.marktype) {
            for (var j in markAddLayer[i].children) {
                if (markAddLayer[i].children[j].id == obj.data.id) {
                    markAddLayer[i].children[j].checked = obj.checked
                }
            }
        }
    }
};



//选中标注方式操作
function selectAddMarkTypeOperate(id) {
    unselectAddMarkTypeOperate();
    document.getElementById(id).style = "color:#FFFFFF;background-color:#33ABA0;width:65px;border-radius: 20px";
    document.getElementById('svg_' + id).setAttribute("style", "fill:#FFFFFF");
    var divtemp = document.getElementById("addmarkinfo");
    divtemp.innerHTML = '';
};
//结束标注方式操作
function unselectAddMarkTypeOperate() {
    viewer._container.style.cursor = "default";//还原鼠标样式
    document.getElementById("mark_point_id").style = "border-radius: 20px";
    document.getElementById("svg_mark_point_id").setAttribute("style", "fill:#FF4500");
    document.getElementById("mark_line_id").style = "border-radius: 20px";
    document.getElementById("svg_mark_line_id").setAttribute("style", "fill:#FF4500");
    document.getElementById("mark_polygon_id").style = "border-radius: 20px";
    document.getElementById("svg_mark_polygon_id").setAttribute("style", "fill:#FF4500");
};



//清除标注临时图形
function ClearMarkTemp() {
    var count = 0;
    while (count < 40) {
        for (var i = 0; i < viewer.entities._entities._array.length; i++) {
            if ((viewer.entities._entities._array[i]._name) && ((viewer.entities._entities._array[i]._name.indexOf("temppoint") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("temppolygon") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("add_mark_point") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("add_mark_line") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("add_mark_line_label_") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("add_mark_polygon_label_") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("add_mark_polygon") > -1))
            ) {
                viewer.entities.remove(viewer.entities._entities._array[i]);
            }
        }
        count++
    }
    if (viewer.entities.getById("line_temp9999") != null) {
        viewer.entities.removeById("line_temp9999");
    }
    if (viewer.entities.getById("line_temp9998") != null) {
        viewer.entities.removeById("line_temp9998");
    }
};
//清除单次标注图形
function ClearMarkSingle() {
    var count = 0;
    while (count < 40) {
        for (var i = 0; i < viewer.entities._entities._array.length; i++) {
            if ((viewer.entities._entities._array[i]._name) && ((viewer.entities._entities._array[i]._name.indexOf("temppoint") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("temppolygon") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("pt_Measue_single") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("ptl_Measue_single") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("pl_Measue_single") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("pll_Measue_single") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("py_Measue_single") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("pyl_Measue_single") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("al_Measue_single") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("pt_Occurrence_single") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("positonPoint_single") > -1))
            ) {
                viewer.entities.remove(viewer.entities._entities._array[i]);
            }
        }
        count++
    }
    if (viewer.entities.getById("line_temp9999") != null) {
        viewer.entities.removeById("line_temp9999");
    }
    if (viewer.entities.getById("line_temp9998") != null) {
        viewer.entities.removeById("line_temp9998");
    }
};


//监听选中样式
$(document).on("click", "img[class='markPointStyle']", function (event) {
    //点样式设置
    if (markType == "0") {
        var styleid = event.target.id;
        currentmarkpointstyle = '../Resources/img/mark/' + styleid +'.png';
        changeMarkImageColor("markpointselected_style", currentmarkpointstyle, '#cc0000');
    }
});
//选择标注样式
function selectMarkStyle(obj) {
    var stylebtnpos = getStyleBtnPos(obj);
    if (markstylelayerindex != null) {
        layer.close(markstylelayerindex);
        markstylelayerindex = null;
    }
    //点样式设置
    if (markType == "0" || markClickType == "point") {
        markstylelayerindex = layer.open({
            type: 1
            , title: false
            , area: ['320px', '280px']
            , shade: 0
            , offset: [stylebtnpos.y + 40, stylebtnpos.x - 120]
            , closeBtn: 0
            , moveOut: true
            , resize: false
            , content:'<!--选择点样式面板--><form class="layui-form" style="margin-top:10px;margin-left:0px;" lay-filter="markpointinfoform">    <fieldset class="layui-elem-field" style="margin-left: 10px;margin-right: 10px;">        <div class="layui-field-box">            <img id="img_mark_P1" src="/Resources/img/mark/img_mark_P1.png" style=" width: 30px; height: 30px;margin: 5px;" class="markPointStyle">            <img id="img_mark_P2" src="/Resources/img/mark/img_mark_P2.png" style=" width: 30px; height: 30px;margin: 5px;" class="markPointStyle">            <img id="img_mark_P3" src="/Resources/img/mark/img_mark_P3.png" style=" width: 30px; height: 30px;margin: 5px;" class="markPointStyle">            <img id="img_mark_P4" src="/Resources/img/mark/img_mark_P4.png" style=" width: 30px; height: 30px;margin: 5px;" class="markPointStyle">            <img id="img_mark_P5" src="/Resources/img/mark/img_mark_P5.png" style=" width: 30px; height: 30px;margin: 5px;" class="markPointStyle">            <img id="img_mark_P6" src="/Resources/img/mark/img_mark_P6.png" style=" width: 30px; height: 30px;margin: 5px;" class="markPointStyle">            <img id="img_mark_P7" src="/Resources/img/mark/img_mark_P7.png" style=" width: 30px; height: 30px;margin: 5px;" class="markPointStyle">            <img id="img_mark_P8" src="/Resources/img/mark/img_mark_P8.png" style=" width: 30px; height: 30px;margin: 5px;" class="markPointStyle">            <img id="img_mark_P9" src="/Resources/img/mark/img_mark_P9.png" style=" width: 30px; height: 30px;margin: 5px;" class="markPointStyle">            <img id="img_mark_P10" src="/Resources/img/mark/img_mark_P10.png" style=" width: 30px; height: 30px;margin: 5px;" class="markPointStyle">            <img id="img_mark_P11" src="/Resources/img/mark/img_mark_P11.png" style=" width: 30px; height: 30px;margin: 5px;" class="markPointStyle">            <img id="img_mark_P12" src="/Resources/img/mark/img_mark_P12.png" style=" width: 30px; height: 30px;margin: 5px;" class="markPointStyle">            <img id="img_mark_P13" src="/Resources/img/mark/img_mark_P13.png" style=" width: 30px; height: 30px;margin: 5px;" class="markPointStyle">            <img id="img_mark_P14" src="/Resources/img/mark/img_mark_P14.png" style=" width: 30px; height: 30px;margin: 5px;" class="markPointStyle">            <img id="img_mark_P15" src="/Resources/img/mark/img_mark_P15.png" style=" width: 30px; height: 30px;margin: 5px;" class="markPointStyle">            <img id="img_mark_P16" src="/Resources/img/mark/img_mark_P16.png" style=" width: 30px; height: 30px;margin: 5px;" class="markPointStyle">            <img id="img_mark_P17" src="/Resources/img/mark/img_mark_P17.png" style=" width: 30px; height: 30px;margin: 5px;" class="markPointStyle">        </div>    </fieldset>    <!--点标注-标注列表更新-->    <div class="layui-row" style="margin-top: 10px;">        <div class="layui-col-md12" style="margin-top: 20px;">            <div class="grid-demo grid-demo-bg1">                <label class="layui-form-label" style="padding-left: 15px;text-align: left;width: 80px;">选中样式：</label>                <img id="markpointselected_style" src="/Resources/img/mark/markpointselected_style.png" style=" width: 25px; height: 25px;margin: 5px;" class="markPointStyle">                <button type="button" class="layui-btn  layui-btn-sm" style="margin-left: 60px;" id="select_mark_style_id" onclick="getMarkStyle()">确定</button>            </div>        </div>    </div></form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);
                var stylelist = document.getElementsByClassName("markPointStyle");
                for (var i in stylelist) {
                    var imgid = stylelist[i].id;
                    var src = stylelist[i].src;
                    changeMarkImageColor(imgid, src,'#cc0000');
                }
            }
            , end: function () {
                layer.close(markstylelayerindex);
                markstylelayerindex = null;
            }
        });
    }
    //线样式设置
    if (markType == "1" || markClickType == "line") {
    }
    //多边形设置
    if (markType == "2" || markClickType == "polygon") {
    }
}
//关闭选择样式的页面
function getMarkStyle() {
    layer.close(markstylelayerindex);
}


//样式按钮动态获取位置
function CPos(x, y) {
    this.x = x;
    this.y = y;
}
function getStyleBtnPos(ATarget) {
    var target = ATarget;
    var pos = new CPos(target.offsetLeft, target.offsetTop);
    var target = target.offsetParent;
    while (target) {
        pos.x += target.offsetLeft;
        pos.y += target.offsetTop;
        target = target.offsetParent
    }
    return pos;
}

//颜色和样式结合联动显示选择样式
function changeMarkImageColor(imgid,imgUrl, color) {
    var img = new Image();
    img.src = imgUrl;
    var newR = parseInt("0x" + color.substr(1, 2));
    var newG = parseInt("0x" + color.substr(3, 2));
    var newB = parseInt("0x" + color.substr(5, 2));
    let imgData;
    //图片加载后进行处理
    img.onload = function () {
        let width = img.width, height = img.height, canvas = document.createElement("canvas"), ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        // 将源图片复制到画布上
        ctx.drawImage(img, 0, 0, width, height);
        // 获取画布的像素信息
        let imageData = ctx.getImageData(0, 0, width, height), data = imageData.data;
        // 对像素集合中的单个像素进行循环，每个像素是由4个通道组成，所以要注意
        let i = 0;
        while (i < data.length) {
            let r = data[i++],
                g = data[i++],
                b = data[i++],
                a = data[i++];
            //判断是否透明
            if (r == 0 && g == 0 &&b == 0) {
                data[i - 1] = 0;
            } else {
                data[i - 4] = newR;
                data[i - 3] = newG;
                data[i - 2] = newB;
                data[i - 1] = a; //处理透明的图片和不透明的图片
            }
        }
        // 将修改后的代码复制回画布中
        ctx.putImageData(imageData, 0, 0);
        // 图片导出为 png 格式
        let imgType = "png";
        imgData = canvas.toDataURL(imgType);
        document.getElementById(imgid).setAttribute("src", imgData);
    };
    return imgData;
}

