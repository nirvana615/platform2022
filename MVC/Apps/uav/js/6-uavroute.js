//选择航线类型
function SelectRouteType() {
    if (current_project_id == null) {
        layer.msg("请选择项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
    }
    else {
        if (selectroutetypelayerindex == null) {
            selectroutetypelayerindex = layer.open({
                type: 1
                , title: ['选择航线类型', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                , area: ['600px', '300px']
                , shade: [0.5, '#393D49']
                , closeBtn: 1
                , anim: 0
                , maxmin: false
                , move: false
                , moveOut: false
                , resize: false
                , content: '<div class="layui-row layui-col-space1" style="margin:15px;"><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><button id="route-type-mbtxcj" type="button" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100px;height:100px;margin-left:15px;background-color:#707070;"><i class="layui-icon" style="font-size:14px!important;color:#ffffff;text-align:center;">目标图像采集</i><br><i class="layui-icon" style="font-size:14px!important;color:#ffffff;text-align:center;">（模型）</i></button></div></div><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><button id="route-type-mbsycl" type="button" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100px;height:100px;margin-left:15px;background-color:#707070;"><i class="layui-icon" style="font-size:14px!important;color:#ffffff;">目标摄影测量</i><br><i class="layui-icon" style="font-size:14px!important;color:#ffffff;text-align:center;">（模型）</i></button></div></div><div class="layui-col-md3"><div class="grid-demo"><button id="route-type-xpsycl" type="button" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100px;height:100px;margin-left:15px;background-color:#707070;"><i class="layui-icon" style="font-size:14px!important;color:#ffffff;">斜坡摄影测量</i><br><i class="layui-icon" style="font-size:14px!important;color:#ffffff;text-align:center;">（地形）</i></button></div></div><div class="layui-col-md3"><div class="grid-demo"><button id="route-type-xpsyclm" type="button" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100px;height:100px;margin-left:15px;background-color:#707070;"><i class="layui-icon" style="font-size:14px!important;color:#ffffff;">斜坡摄影测量</i><br><i class="layui-icon" style="font-size:14px!important;color:#ffffff;text-align:center;">（模型）</i></button></div></div></div><div class="layui-row layui-col-space1" style="margin:20px;"><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><button id="route-type-lmsycl" type="button" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100px;height:100px;margin-left:15px;background-color:#707070;"><i class="layui-icon" style="font-size:14px!important;color:#ffffff;">立面摄影测量</i><br><i class="layui-icon" style="font-size:14px!important;color:#ffffff;text-align:center;">（地形）</i></button></div></div><div class="layui-col-md3"><div class="grid-demo"><button id="route-type-lmsyclm" type="button" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100px;height:100px;margin-left:15px;background-color:#707070;"><i class="layui-icon" style="font-size:14px!important;color:#ffffff;">立面摄影测量</i><br><i class="layui-icon" style="font-size:14px!important;color:#ffffff;text-align:center;">（模型）</i></button></div></div><div class="layui-col-md3"><div class="grid-demo"><button id="route-type-mbspcj" type="button" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100px;height:100px;margin-left:15px;background-color:#707070;"><i class="layui-icon" style="font-size:14px!important;color:#ffffff;">目标视频采集</i></button></div></div><div class="layui-col-md3"><div class="grid-demo"><button id="route-type-mbtxcje" type="button" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100px;height:100px;margin-left:15px;background-color:#707070;"><i class="layui-icon" style="font-size:14px!important;color:#ffffff;">目标图像采集</i><br><i class="layui-icon" style="font-size:14px!important;color:#ffffff;text-align:center;">（视线）</i></button></div></div></div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    //目标图像采集（模型）
                    $("#route-type-mbtxcj").on("click", function () {
                        CloseLayer(selectroutetypelayerindex);
                        AddUavRoute(0);
                    });
                    //目标摄影测量（模型）
                    $("#route-type-mbsycl").on("click", function () {
                        CloseLayer(selectroutetypelayerindex);
                        AddUavRoute(1);
                    });
                    //斜坡摄影测量（地形）
                    $("#route-type-xpsycl").on("click", function () {
                        CloseLayer(selectroutetypelayerindex);
                        AddUavRoute(2);
                    });
                    //斜坡摄影测量（模型）
                    $("#route-type-xpsyclm").on("click", function () {
                        CloseLayer(selectroutetypelayerindex);
                        AddUavRoute(3);
                    });
                    //立面摄影测量（地形）
                    $("#route-type-lmsycl").on("click", function () {
                        CloseLayer(selectroutetypelayerindex);
                        AddUavRoute(4);
                    });
                    //立面摄影测量（模型）
                    $("#route-type-lmsyclm").on("click", function () {
                        CloseLayer(selectroutetypelayerindex);
                        AddUavRoute(5);
                    });
                    //目标视频采集
                    $("#route-type-mbspcj").on("click", function () {
                        CloseLayer(selectroutetypelayerindex);
                        AddUavRoute(6);
                    });
                    //目标图像采集（视线）
                    $("#route-type-mbtxcje").on("click", function () {
                        CloseLayer(selectroutetypelayerindex);
                        AddUavRoute(7);
                    });
                }
                , cancel: function () {
                }
                , end: function () {
                    selectroutetypelayerindex = null;
                }
            });
        }
    }
};


var droneid = null;

var uav_route_add_waypointtreedata = [];             //航线树数据

var uav_route_add_takeoff = null;                    //起飞点数据
var uav_route_add_landing = null;                    //降落点数据
var uav_route_add_avoids = [];                       //避障点数据
var uav_route_add_targets = [];                      //目标点数据
var uav_route_add_targetareas = [];                  //目标区域
var uav_route_add_waypoint = [];                     //目标+避障点数据

var entity_takeoff = null;                           //起飞点几何
var entity_takeoff_line = null;                      //上升线几何
var entity_landing = null;                           //降落点几何
var entity_landing_line = null;                      //降落线几何
var entities_avoid = [];                             //避障点几何集
var entities_avoid_label = [];                       //避障点标注几何集
var entities_avoid_line = [];                        //避障竖直线几何集
var entities_target = [];                            //目标点几何集
var entities_target_label = [];                      //目标点标注几何集
var entities_targetarea = [];                        //目标区域几何集
var entities_targetarea_label = [];                  //目标区域标注几何集
var entities_targetarea_point = [];                  //目标区域边界点（临时）
var entities_targetarea_line = [];                   //目标区域边线（临时）
var entities_targetarea_line_temp = [];              //目标区域边线（临时）鼠标移动时

var current_target_id = null;                        //当前目标点id

var current_route = null;                            //当前路径几何
var current_json = null;                             //航线json
var current_djiterra_kml = null;                     //航线terra kml
var current_djipilot_kml = null;                     //航线pilot kml
var current_line = null;                             //航线图形


//新增航线
function AddUavRoute(type) {
    if (uavrouteaddlayerindex == null) {
        if (type == 0) {
            viewer.scene.globe.depthTestAgainstTerrain = false;
            uavrouteaddlayerindex = layer.open({
                type: 1
                , title: ['新建目标图像采集（模型）', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['400px', '850px']
                , offset: 'r'
                , shade: 0
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--目标图像采集（新建）--><form class="layui-form" lay-filter="uav-route-add" action=""><div class="layui-form-item" style="width:100%;height:680px;"><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin-top:0px;"><ul class="layui-tab-title"><li class="layui-this" style="padding-top: 5px;width:25%;">航线</li><li style="padding-top: 5px;width:25%;">无人机</li><li style="padding-top: 5px;width:25%;">规划</li></ul><div class="layui-tab-content"><!--航线--><div class="layui-tab-item layui-show"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航线名称</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-hxmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航线类型</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-hxlxid" name="uav-route-add-hxlx" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">高程类型</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-gclxid" name="uav-route-add-gclx" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航线速度m/s</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-hxsd" autocomplete="off" class="layui-input" lay-verify="required" /></div></div><div class="layui-form-item layui-form-text"><label class="layui-form-label" style="width:80px;text-align:left;">备&emsp;&emsp;注</label><div class="layui-input-block" style="margin-left:110px;"><textarea name="uav-route-add-bz" placeholder="请输入" class="layui-textarea" style="height:300px;padding-right:5px;"></textarea></div></div><div id="uav-route-result" style="visibility:hidden;"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航线长度m</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-hxcd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">飞行时间s</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-fxsj" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航点数量</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-hlds" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">拍照数量</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-pzsl" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div></div><!--无人机--><div class="layui-tab-item"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">无&ensp;人&ensp;机</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-droneid" name="uav-route-add-drone" lay-filter="uav-route-add-drone" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">挂载类型</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-payloadtypeid" name="uav-route-add-payloadtype" lay-filter="uav-route-add-payloadtype" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">挂载型号</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-payloadid" name="uav-route-add-payload" lay-filter="uav-route-add-payload" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">照片比例</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-photoratioid" name="uav-route-add-photoratio" lay-filter="uav-route-add-photoratio"><option value="">请选择</option></select></div></div></div><!--规划--><div class="layui-tab-item"><div class="layui-row layui-col-space5" style="margin-bottom:5px;"><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-takeoff" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 起飞点</button></div></div><div class="layui-col-md3"><div class="grid-demo"><button type="button" id="uav-route-add-target" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 目标点</button></div></div><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-avoid" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 避障点</button></div></div><div class="layui-col-md3"><div class="grid-demo"><button type="button" id="uav-route-add-landing" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 降落点</button></div></div></div><div class="grid-demo grid-demo-bg1" style="height:300px;border-style:solid;border-width:1px;border-color:#e6e6e6;overflow: auto;"><!--航点树--><div id="uav-route-add-waypointtree"></div></div><div class="layui-row layui-col-space5" id="uav-route-add-action" style="margin-top:5px;visibility:hidden;"><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-hover" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 悬停</button></div></div><div class="layui-col-md3"><div class="grid-demo"><button type="button" id="uav-route-add-photo" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 拍照</button></div></div><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-yaw" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 偏航角</button></div></div><div class="layui-col-md3"><div class="grid-demo"><button type="button" id="uav-route-add-pitch" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 俯仰角</button></div></div></div><div class="grid-demo" style="height:260px;border-style:solid;border-width:1px;border-color:#e6e6e6;margin-top:5px;overflow: auto;"><!--参数--><div id="uav-route-add-waypointpara"></div></div></div></div></div></div><!--操作项--><div style="margin-top:5px;border-top-style:solid;border-top-width:2px;border-top-color:#f8f8f8;margin-left:5px;margin-right:5px;"><div class="layui-form-item" style="margin-top:5px;"><div style="margin-top:5px;"><button type="submit" class="layui-btn layui-btn-primary layui-btn-sm" lay-submit="" lay-filter="uav-route-add-jshx" style="width:100%;">计算</button></div></div><div class="layui-row layui-col-space5"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-dowload-json" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">下载JSON</button></div></div><div class="layui-col-md4"><div class="grid-demo"><button type="button" id="uav-route-add-dowload-djiterra" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">下载DJI Terra</button></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-dowload-djipilot" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">下载DJI Pilot</button></div></div></div><div class="layui-form-item" style="margin-top:5px;"><div style="margin-top:5px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="uav-route-add-submit" style="width:100%;">保存</button></div></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    //默认参数
                    form.val("uav-route-add", {
                        "uav-route-add-hxsd": routespeed
                    });

                    if (ljlxs.length > 0) {
                        for (var i in ljlxs) {
                            if (ljlxs[i].name == "目标图像采集（模型）") {
                                document.getElementById("uav-route-add-hxlxid").innerHTML = '<option value="' + ljlxs[i].value + '" selected>' + ljlxs[i].name + '</option>';
                            }
                        }
                    }
                    if (gclxs.length > 0) {
                        for (var i in gclxs) {
                            document.getElementById("uav-route-add-gclxid").innerHTML += '<option value="' + gclxs[i].value + '">' + gclxs[i].name + '</option>';
                        }
                    }
                    if (drones != null) {
                        for (var i in drones) {
                            document.getElementById("uav-route-add-droneid").innerHTML += '<option value="' + drones[i].UavDrone.Id + '">' + drones[i].UavDrone.WRJMC + '</option>';
                        }
                    }
                    if (gzlxs.length > 0) {
                        for (var i in gzlxs) {
                            document.getElementById("uav-route-add-payloadtypeid").innerHTML += '<option value="' + gzlxs[i].value + '">' + gzlxs[i].name + '</option>';
                        }
                    }

                    SelectDrone();//无人机切换

                    //航线树
                    tree.render({
                        elem: '#uav-route-add-waypointtree'
                        , data: []
                        , id: 'uav-route-add-waypointtreeid'
                        , showCheckbox: false
                        , edit: ['update', 'del']
                        , accordion: true
                        , showLine: false
                        , click: function (obj) {
                            if (obj.data.type == "action") {
                                for (var i in uav_route_add_waypoint) {
                                    if (uav_route_add_waypoint[i].children != undefined) {
                                        for (var j in uav_route_add_waypoint[i].children) {
                                            if (uav_route_add_waypoint[i].children[j].id == obj.data.id) {
                                                if (obj.data.action == "hover") {
                                                    document.getElementById("uav-route-add-waypointpara").innerHTML = '<div style="margin-top:5px;"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">悬停时间ms</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-action-hover" autocomplete="off" class="layui-input" readonly="readonly" /></div></div>';
                                                    form.val("uav-route-add", {
                                                        "uav-route-add-target-action-hover": obj.data.value
                                                    });
                                                }
                                                else if (obj.data.action == "yaw") {
                                                    document.getElementById("uav-route-add-waypointpara").innerHTML = '<div style="margin-top:5px;"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">偏&ensp;航&ensp;角°</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-action-yaw" autocomplete="off" class="layui-input" readonly="readonly" /></div></div>';
                                                    form.val("uav-route-add", {
                                                        "uav-route-add-target-action-yaw": obj.data.value
                                                    });
                                                }
                                                else if (obj.data.action == "pitch") {
                                                    document.getElementById("uav-route-add-waypointpara").innerHTML = '<div style="margin-top:5px;"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">俯&ensp;仰&ensp;角°</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-action-pitch" autocomplete="off" class="layui-input" readonly="readonly" /></div></div>';
                                                    form.val("uav-route-add", {
                                                        "uav-route-add-target-action-pitch": obj.data.value
                                                    });
                                                }
                                                else if (obj.data.action == "photo") {
                                                    document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                current_target_id = null;
                                document.getElementById("uav-route-add-action").style.visibility = "hidden";//隐藏动作按钮
                                current_waypoint_title = obj.data.title;
                                for (var i in uav_route_add_waypoint) {
                                    if (uav_route_add_waypoint[i].id == obj.data.id && obj.data.type == "target") {
                                        uav_route_add_waypoint[i].spread = true;
                                    }
                                    else {
                                        uav_route_add_waypoint[i].spread = false;
                                    }
                                }
                                updateroutetree();

                                if (obj.data.type == "takeoff") {
                                    //定位起飞点
                                    ZoomToEntity(entity_takeoff);

                                    //显示起飞点信息
                                    ViewTakoff(obj);
                                }
                                else if (obj.data.type == "landing") {
                                    //定位降落点
                                    ZoomToEntity(entity_landing);

                                    //显示降落点信息
                                    ViewLanding(obj);
                                }
                                else if (obj.data.type == "target") {
                                    current_target_id = obj.data.id;//赋值当前目标点id，用于添加动作
                                    document.getElementById("uav-route-add-action").style.visibility = "visible";

                                    for (var i in entities_target) {
                                        if (entities_target[i].id == ("TARGET_" + obj.data.id)) {
                                            //定位目标点
                                            ZoomToEntity(entities_target[i]);

                                            //显示目标点信息
                                            ViewTarget(obj);

                                            break;
                                        }
                                    }
                                }
                                else if (obj.data.type == "avoid") {
                                    for (var i in entities_avoid) {
                                        if (entities_avoid[i].id == ("AVOID_" + obj.data.id)) {
                                            //定位避障点
                                            ZoomToEntity(entities_avoid[i]);

                                            //显示避障点信息
                                            ViewAvoid(obj);

                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        , operate: function (obj) {
                            if (obj.type == "update") {
                                if (obj.data.type == "action") {
                                    if (obj.data.action == "hover") {
                                        //编辑悬停
                                        document.getElementById("uav-route-add-waypointpara").innerHTML = '<div style="margin-top:5px;"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">悬停时间ms</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-action-hover" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><div style="margin-top:5px;"><button type="button" id="uav-route-add-save" class="layui-btn layui-btn-primary layui-btn-sm" style="width:96%;margin-left:2%;margin-right:2%;">修改</button></div></div>';
                                        form.val("uav-route-add", {
                                            "uav-route-add-target-action-hover": obj.data.value
                                        });

                                        $("#uav-route-add-save").on("click", function () {
                                            for (var i in uav_route_add_waypoint) {
                                                if (uav_route_add_waypoint[i].type == "target") {
                                                    for (var j in uav_route_add_waypoint[i].children) {
                                                        if (uav_route_add_waypoint[i].children[j].id == obj.data.id) {
                                                            uav_route_add_waypoint[i].children[j].value = form.val("uav-route-add")["uav-route-add-target-action-hover"];
                                                            break;
                                                        }
                                                    }
                                                }
                                            }

                                            //刷新航线树
                                            updateroutetree();

                                            layer.msg("修改成功！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        });
                                    }
                                    else if (obj.data.action == "yaw") {
                                        //编辑偏航角
                                        document.getElementById("uav-route-add-waypointpara").innerHTML = '<div style="margin-top:5px;"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">偏&ensp;航&ensp;角°</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-action-yaw" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><div style="margin-top:5px;"><button type="button" id="uav-route-add-save" class="layui-btn layui-btn-primary layui-btn-sm" style="width:96%;margin-left:2%;margin-right:2%;">修改</button></div></div>';
                                        form.val("uav-route-add", {
                                            "uav-route-add-target-action-yaw": obj.data.value
                                        });

                                        $("#uav-route-add-save").on("click", function () {
                                            for (var i in uav_route_add_waypoint) {
                                                if (uav_route_add_waypoint[i].type == "target") {
                                                    for (var j in uav_route_add_waypoint[i].children) {
                                                        if (uav_route_add_waypoint[i].children[j].id == obj.data.id) {
                                                            uav_route_add_waypoint[i].children[j].value = form.val("uav-route-add")["uav-route-add-target-action-yaw"];
                                                            break;
                                                        }
                                                    }
                                                }
                                            }

                                            //刷新航线树
                                            updateroutetree();

                                            layer.msg("修改成功！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        });
                                    }
                                    else if (obj.data.action == "pitch") {
                                        //编辑俯仰角
                                        document.getElementById("uav-route-add-waypointpara").innerHTML = '<div style="margin-top:5px;"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">俯&ensp;仰&ensp;角°</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-action-pitch" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><div style="margin-top:5px;"><button type="button" id="uav-route-add-save" class="layui-btn layui-btn-primary layui-btn-sm" style="width:96%;margin-left:2%;margin-right:2%;">修改</button></div></div>';
                                        form.val("uav-route-add", {
                                            "uav-route-add-target-action-pitch": obj.data.value
                                        });

                                        $("#uav-route-add-save").on("click", function () {
                                            for (var i in uav_route_add_waypoint) {
                                                if (uav_route_add_waypoint[i].type == "target") {
                                                    for (var j in uav_route_add_waypoint[i].children) {
                                                        if (uav_route_add_waypoint[i].children[j].id == obj.data.id) {
                                                            uav_route_add_waypoint[i].children[j].value = form.val("uav-route-add")["uav-route-add-target-action-pitch"];
                                                            break;
                                                        }
                                                    }
                                                }
                                            }

                                            //刷新航线树
                                            updateroutetree();

                                            layer.msg("修改成功！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        });
                                    }
                                    else if (obj.data.action == "photo") {
                                        document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                                    }
                                }
                                else {
                                    current_target_id = null;
                                    document.getElementById("uav-route-add-action").style.visibility = "hidden";//隐藏动作按钮
                                    current_waypoint_title = obj.data.title;
                                    for (var i in uav_route_add_waypoint) {
                                        if (uav_route_add_waypoint[i].id == obj.data.id && obj.data.type == "target") {
                                            uav_route_add_waypoint[i].spread = true;
                                        }
                                        else {
                                            uav_route_add_waypoint[i].spread = false;
                                        }
                                    }
                                    updateroutetree();

                                    if (obj.data.type == "takeoff") {
                                        //定位起飞点
                                        ZoomToEntity(entity_takeoff);

                                        //编辑起飞点信息
                                        EditTakeoff(obj);
                                    }
                                    else if (obj.data.type == "landing") {
                                        //定位降落点
                                        ZoomToEntity(entity_landing);

                                        //编辑降落点信息
                                        EditLanding(obj);
                                    }
                                    else if (obj.data.type == "target") {
                                        for (var i in entities_target) {
                                            if (entities_target[i].id == ("TARGET_" + obj.data.id)) {
                                                //定位目标点
                                                ZoomToEntity(entities_target[i]);
                                                break;
                                            }
                                        }

                                        //编辑目标点信息
                                        EditTarget(obj);
                                    }
                                    else if (obj.data.type == "avoid") {
                                        for (var i in entities_avoid) {
                                            if (entities_avoid[i].id == ("AVOID_" + obj.data.id)) {
                                                //定位避障点
                                                ZoomToEntity(entities_avoid[i]);
                                                break;
                                            }
                                        }

                                        //编辑避障点信息
                                        EditAvoid(obj);
                                    }
                                }
                            }
                            else if (obj.type == "del") {
                                document.getElementById("uav-route-add-waypointpara").innerHTML = '';

                                //删除
                                if (obj.data.type == "takeoff") {
                                    //起飞点
                                    uav_route_add_takeoff = null;
                                    RemoveEntityInViewer(entity_takeoff);
                                    RemoveEntityInViewer(entity_takeoff_line);
                                    entity_takeoff = null;//起飞点几何
                                    entity_takeoff_line = null;

                                    //刷新航线树
                                    if (current_waypoint_title == "起飞点") {
                                        current_waypoint_title = null;
                                    }
                                    updateroutetree();
                                }
                                else if (obj.data.type == "landing") {
                                    //降落点
                                    uav_route_add_landing = null;
                                    RemoveEntityInViewer(entity_landing);
                                    RemoveEntityInViewer(entity_landing_line);
                                    entity_landing = null;
                                    entity_landing_line = null;

                                    //刷新航线树
                                    if (current_waypoint_title == "降落点") {
                                        current_waypoint_title = null;
                                    }
                                    updateroutetree();
                                }
                                else if (obj.data.type == "target") {
                                    if (current_waypoint_title == obj.data.title) {
                                        current_waypoint_title = null;
                                    }

                                    //目标点
                                    if (uav_route_add_targets.length == 1) {
                                        uav_route_add_targets = [];
                                        RemoveEntityInViewer(entities_target[0]);
                                        RemoveEntityInViewer(entities_target_label[0]);
                                        entities_target = [];
                                        entities_target_label = [];

                                        uav_route_add_waypoint = uav_route_add_avoids;

                                        //刷新航线树
                                        updateroutetree();
                                    }
                                    else {
                                        uav_route_add_targets = RemoveArrayElemnet(uav_route_add_targets, obj.data.id, "目标点");
                                        uav_route_add_waypoint = RemoveModiftyArrayElemnet(uav_route_add_waypoint, obj.data.id, "target");

                                        //刷新航线树
                                        updateroutetree();

                                        RemoveEntitiesInViewer(entities_target);
                                        RemoveEntitiesInViewer(entities_target_label);
                                        entities_target = [];
                                        entities_target_label = [];

                                        for (var i in uav_route_add_targets) {
                                            var entity_target = new Cesium.Entity({
                                                id: "TARGET_" + uav_route_add_targets[i].id,
                                                position: uav_route_add_targets[i].xyz,
                                                billboard: {
                                                    image: '../../Resources/img/uav/target.png',
                                                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                    heightReference: Cesium.HeightReference.NONE,
                                                    width: 40,
                                                    height: 40,
                                                }
                                            });
                                            entities_target.push(entity_target);
                                            AddEntityInViewer(entity_target);

                                            var entity_target_label = new Cesium.Entity({
                                                id: "TARGET_LABEL_" + uav_route_add_targets[i].id,
                                                position: uav_route_add_targets[i].xyz,
                                                label: {
                                                    text: uav_route_add_targets[i].title,
                                                    font: '20px Times New Roman',
                                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                    heightReference: Cesium.HeightReference.NONE,
                                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                    pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                }
                                            });
                                            entities_target_label.push(entity_target_label);
                                            AddEntityInViewer(entity_target_label);
                                        }
                                    }
                                }
                                else if (obj.data.type == "avoid") {
                                    //避障点
                                    if (uav_route_add_avoids.length == 1) {
                                        uav_route_add_avoids = [];
                                        RemoveEntityInViewer(entities_avoid[0]);
                                        RemoveEntityInViewer(entities_avoid_label[0]);
                                        RemoveEntityInViewer(entities_avoid_line[0]);
                                        entities_avoid = [];
                                        entities_avoid_label = [];
                                        entities_avoid_line = [];

                                        uav_route_add_waypoint = uav_route_add_targets;

                                        //刷新航线树
                                        updateroutetree();
                                    }
                                    else {
                                        uav_route_add_avoids = RemoveArrayElemnet(uav_route_add_avoids, obj.data.id, "避障点");
                                        uav_route_add_waypoint = RemoveModiftyArrayElemnet(uav_route_add_waypoint, obj.data.id, "avoid");

                                        //刷新航线树
                                        if (current_waypoint_title == obj.data.title) {
                                            current_waypoint_title = null;
                                        }
                                        updateroutetree();

                                        //清除全部避障几何
                                        RemoveEntitiesInViewer(entities_avoid);
                                        RemoveEntitiesInViewer(entities_avoid_label);
                                        RemoveEntitiesInViewer(entities_avoid_line);
                                        entities_avoid = [];
                                        entities_avoid_label = [];
                                        entities_avoid_line = [];



                                        //重新添加避障几何
                                        for (var i in uav_route_add_waypoint) {
                                            if (uav_route_add_waypoint[i].type == "avoid") {
                                                //添加避障点
                                                var entity_avoid = new Cesium.Entity({
                                                    id: "AVOID_" + uav_route_add_waypoint[i].id,
                                                    position: CGCS2000BLH2XYZ(parseFloat(uav_route_add_waypoint[i].blh.b), parseFloat(uav_route_add_waypoint[i].blh.l), parseFloat(uav_route_add_waypoint[i].blh.h) + parseFloat(uav_route_add_waypoint[i].height)),
                                                    point: {
                                                        pixelSize: 10,
                                                        color: Cesium.Color.DARKORANGE,
                                                    },
                                                });
                                                entities_avoid.push(entity_avoid);
                                                AddEntityInViewer(entity_avoid);

                                                //添加避障辅助线
                                                var entity_avoid_line = new Cesium.Entity({
                                                    id: "AVOID_LINE_" + uav_route_add_waypoint[i].id,
                                                    polyline: {
                                                        positions: [uav_route_add_waypoint[i].xyz, CGCS2000BLH2XYZ(parseFloat(uav_route_add_waypoint[i].blh.b), parseFloat(uav_route_add_waypoint[i].blh.l), parseFloat(uav_route_add_waypoint[i].blh.h) + parseFloat(uav_route_add_waypoint[i].height))],
                                                        width: 3,
                                                        arcType: Cesium.ArcType.RHUMB,
                                                        material: Cesium.Color.DARKORANGE,
                                                        show: true,
                                                        clampToGround: false,
                                                    },
                                                });
                                                entities_avoid_line.push(entity_avoid_line);
                                                AddEntityInViewer(entity_avoid_line);

                                                //添加标注
                                                var entity_avoid_label = new Cesium.Entity({
                                                    id: "AVOID_LABEL_" + uav_route_add_waypoint[i].id,
                                                    position: CGCS2000BLH2XYZ(parseFloat(uav_route_add_waypoint[i].blh.b), parseFloat(uav_route_add_waypoint[i].blh.l), parseFloat(uav_route_add_waypoint[i].blh.h) + parseFloat(uav_route_add_waypoint[i].height)),
                                                    label: {
                                                        text: uav_route_add_waypoint[i].title,
                                                        font: '20px Times New Roman',
                                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                        heightReference: Cesium.HeightReference.NONE,
                                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                        pixelOffset: new Cesium.Cartesian2(0.0, -30),
                                                    }
                                                });
                                                entities_avoid_label.push(entity_avoid_label);
                                                AddEntityInViewer(entity_avoid_label);
                                            }
                                        }
                                    }
                                }
                                else if (obj.data.type = "action") {
                                    var targetid = null;

                                    for (var i in uav_route_add_waypoint) {
                                        if (uav_route_add_waypoint[i].type == "target") {
                                            for (var j in uav_route_add_waypoint[i].children) {
                                                if (uav_route_add_waypoint[i].children[j].id == obj.data.id) {
                                                    targetid = uav_route_add_waypoint[i].id;
                                                    break;
                                                }
                                            }
                                        }
                                    }

                                    var child = [];

                                    for (var i in uav_route_add_waypoint) {
                                        if ((uav_route_add_waypoint[i].type == "target") && (uav_route_add_waypoint[i].id == targetid)) {
                                            for (var j in uav_route_add_waypoint[i].children) {
                                                if (uav_route_add_waypoint[i].children[j].id != obj.data.id) {
                                                    child.push(uav_route_add_waypoint[i].children[j]);
                                                }
                                            }

                                            uav_route_add_waypoint[i].children = child;
                                            break;
                                        }
                                    }

                                    //刷新航线树
                                    updateroutetree();
                                }
                            }
                        }
                    });

                    AddTakeOffModel(type);//添加起飞点
                    AddLandingModel(type);//添加降落点
                    AddTargetModel();//添加目标点
                    AddAvoidModel(type);//添加避障点

                    //悬停
                    $("#uav-route-add-hover").on("click", function () {
                        if (current_target_id == null) {
                            layer.msg("请先点击选择目标点！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }
                        else {
                            var action = new Object;
                            action.id = NewGuid();
                            action.type = "action";
                            action.action = "hover";
                            action.title = "悬停";
                            action.value = hovertime;

                            for (var i in uav_route_add_waypoint) {
                                if ((uav_route_add_waypoint[i].id == current_target_id) && (uav_route_add_waypoint[i].type == "target")) {
                                    if (uav_route_add_waypoint[i].children == undefined) {
                                        var child = [];
                                        child.push(action);
                                        uav_route_add_waypoint[i].children = child;
                                    }
                                    else {
                                        uav_route_add_waypoint[i].children.push(action);
                                    }

                                    uav_route_add_waypoint[i].spread = true;
                                }
                                else {
                                    uav_route_add_waypoint[i].spread = false;
                                }
                            }

                            //刷新航线树
                            updateroutetree();
                            document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                        }
                    });
                    //拍照
                    $("#uav-route-add-photo").on("click", function () {
                        if (current_target_id == null) {
                            layer.msg("请先点击选择目标点！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }
                        else {
                            var action = new Object;
                            action.id = NewGuid();
                            action.type = "action";
                            action.action = "photo";
                            action.title = "拍照";
                            action.value = 0;

                            for (var i in uav_route_add_waypoint) {
                                if ((uav_route_add_waypoint[i].id == current_target_id) && (uav_route_add_waypoint[i].type == "target")) {
                                    if (uav_route_add_waypoint[i].children == undefined) {
                                        var child = [];
                                        child.push(action);
                                        uav_route_add_waypoint[i].children = child;
                                    }
                                    else {
                                        uav_route_add_waypoint[i].children.push(action);
                                    }
                                    uav_route_add_waypoint[i].spread = true;
                                }
                                else {
                                    uav_route_add_waypoint[i].spread = false;
                                }
                            }

                            //刷新航线树
                            updateroutetree();
                            document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                        }
                    });
                    //偏航角
                    $("#uav-route-add-yaw").on("click", function () {
                        if (current_target_id == null) {
                            layer.msg("请先点击选择目标点！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }
                        else {
                            var action = new Object;
                            action.id = NewGuid();
                            action.type = "action";
                            action.action = "yaw";
                            action.title = "偏航角";
                            action.value = yawangle;

                            for (var i in uav_route_add_waypoint) {
                                if ((uav_route_add_waypoint[i].id == current_target_id) && (uav_route_add_waypoint[i].type == "target")) {
                                    if (uav_route_add_waypoint[i].children == undefined) {
                                        var child = [];
                                        child.push(action);
                                        uav_route_add_waypoint[i].children = child;
                                    }
                                    else {
                                        uav_route_add_waypoint[i].children.push(action);
                                    }
                                    uav_route_add_waypoint[i].spread = true;
                                }
                                else {
                                    uav_route_add_waypoint[i].spread = false;
                                }
                            }

                            //刷新航线树
                            updateroutetree();
                            document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                        }
                    });
                    //俯仰角
                    $("#uav-route-add-pitch").on("click", function () {
                        if (current_target_id == null) {
                            layer.msg("请先点击选择目标点！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }
                        else {
                            var action = new Object;
                            action.id = NewGuid();
                            action.type = "action";
                            action.action = "pitch";
                            action.title = "俯仰角";
                            action.value = pitchangle;

                            for (var i in uav_route_add_waypoint) {
                                if ((uav_route_add_waypoint[i].id == current_target_id) && (uav_route_add_waypoint[i].type == "target")) {
                                    if (uav_route_add_waypoint[i].children == undefined) {
                                        var child = [];
                                        child.push(action);
                                        uav_route_add_waypoint[i].children = child;
                                    }
                                    else {
                                        uav_route_add_waypoint[i].children.push(action);
                                    }
                                    uav_route_add_waypoint[i].spread = true;
                                }
                                else {
                                    uav_route_add_waypoint[i].spread = false;
                                }
                            }

                            //刷新航线树
                            updateroutetree();
                            document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                        }
                    });

                    ComputeMission();//计算任务
                    DownloadMission();//下载任务
                    SaveMission("add");//保存航线

                    form.render();
                    form.render('select');
                }
                , cancel: function () {
                    //TODO
                }
                , end: function () {
                    viewer.scene.globe.depthTestAgainstTerrain = false;
                    ResetRouteElements();//重置
                }
            });
        }
        else if (type == 1) {
            viewer.scene.globe.depthTestAgainstTerrain = false;
            //TODO
            uavrouteaddlayerindex = layer.open({
                type: 1
                , title: ['新建目标摄影测量航线（模型）', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['800px', '600px']
                , shade: 0
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: ''
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                }
                , cancel: function () {
                }
                , end: function () {
                    viewer.scene.globe.depthTestAgainstTerrain = false;
                    uavrouteaddlayerindex = null;
                }
            });
        }
        else if (type == 2) {
            viewer.scene.globe.depthTestAgainstTerrain = true;
            uavrouteaddlayerindex = layer.open({
                type: 1
                , title: ['新建斜坡摄影测量航线（地形）', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['400px', '850px']
                , shade: 0
                , offset: 'r'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--斜坡摄影测量（新建）--><form class="layui-form" lay-filter="uav-route-add" action=""><div class="layui-form-item" style="width:100%;height:680px;"><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin-top:0px;"><ul class="layui-tab-title"><li class="layui-this" style="padding-top: 5px;width:25%;">航线</li><li style="padding-top: 5px;width:25%;">无人机</li><li style="padding-top: 5px;width:25%;">规划</li></ul><div class="layui-tab-content"><!--航线--><div class="layui-tab-item layui-show"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航线名称</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-hxmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航线类型</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-hxlxid" name="uav-route-add-hxlx" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">高程类型</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-gclxid" name="uav-route-add-gclx" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航线速度m/s</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-hxsd" autocomplete="off" class="layui-input" lay-verify="required" /></div></div><div class="layui-form-item layui-form-text"><label class="layui-form-label" style="width:80px;text-align:left;">备&emsp;&emsp;注</label><div class="layui-input-block" style="margin-left:110px;"><textarea name="uav-route-add-bz" placeholder="请输入" class="layui-textarea" style="height:300px;padding-right:5px;"></textarea></div></div><div id="uav-route-result" style="visibility:hidden;"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航线长度m</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-hxcd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">飞行时间s</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-fxsj" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航点数量</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-hlds" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">拍照数量</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-pzsl" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div></div><!--无人机--><div class="layui-tab-item"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">无&ensp;人&ensp;机</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-droneid" name="uav-route-add-drone" lay-filter="uav-route-add-drone" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">挂载类型</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-payloadtypeid" name="uav-route-add-payloadtype" lay-filter="uav-route-add-payloadtype" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">挂载型号</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-payloadid" name="uav-route-add-payload" lay-filter="uav-route-add-payload" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">照片比例</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-photoratioid" name="uav-route-add-photoratio" lay-filter="uav-route-add-photoratio"><option value="">请选择</option></select></div></div></div><!--规划--><div class="layui-tab-item"><div class="layui-row layui-col-space5" style="margin-bottom:5px;"><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-takeoff" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 起飞点</button></div></div><div class="layui-col-md3"><div class="grid-demo"><button type="button" id="uav-route-add-targetarea" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 目标区域</button></div></div><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-avoid" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 避障点</button></div></div><div class="layui-col-md3"><div class="grid-demo"><button type="button" id="uav-route-add-landing" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 降落点</button></div></div></div><div class="grid-demo grid-demo-bg1" style="height:300px;border-style:solid;border-width:1px;border-color:#e6e6e6;overflow: auto;"><!--航点树--><div id="uav-route-add-waypointtree"></div></div><div class="grid-demo" style="height:287px;border-style:solid;border-width:1px;border-color:#e6e6e6;margin-top:5px;overflow: auto;"><!--参数--><div id="uav-route-add-waypointpara"></div></div></div></div></div></div><!--操作项--><div style="margin-top:5px;border-top-style:solid;border-top-width:2px;border-top-color:#f8f8f8;margin-left:5px;margin-right:5px;"><div class="layui-form-item" style="margin-top:5px;"><div style="margin-top:5px;"><button type="submit" class="layui-btn layui-btn-primary layui-btn-sm" lay-submit="" lay-filter="uav-route-add-jshx" style="width:100%;">计算</button></div></div><div class="layui-row layui-col-space5"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-dowload-json" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">下载JSON</button></div></div><div class="layui-col-md4"><div class="grid-demo"><button type="button" id="uav-route-add-dowload-djiterra" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">下载DJI Terra</button></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-dowload-djipilot" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">下载DJI Pilot</button></div></div></div><div class="layui-form-item" style="margin-top:5px;"><div style="margin-top:5px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="uav-route-add-submit" style="width:100%;">保存</button></div></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    //默认参数
                    form.val("uav-route-add", {
                        "uav-route-add-hxsd": routespeed
                    });

                    if (ljlxs.length > 0) {
                        for (var i in ljlxs) {
                            if (ljlxs[i].name == "斜坡摄影测量（地形）") {
                                document.getElementById("uav-route-add-hxlxid").innerHTML = '<option value="' + ljlxs[i].value + '" selected>' + ljlxs[i].name + '</option>';
                            }
                        }
                    }
                    if (gclxs.length > 0) {
                        for (var i in gclxs) {
                            document.getElementById("uav-route-add-gclxid").innerHTML += '<option value="' + gclxs[i].value + '">' + gclxs[i].name + '</option>';
                        }
                    }
                    if (drones != null) {
                        for (var i in drones) {
                            document.getElementById("uav-route-add-droneid").innerHTML += '<option value="' + drones[i].UavDrone.Id + '">' + drones[i].UavDrone.WRJMC + '</option>';
                        }
                    }
                    if (gzlxs.length > 0) {
                        for (var i in gzlxs) {
                            document.getElementById("uav-route-add-payloadtypeid").innerHTML += '<option value="' + gzlxs[i].value + '">' + gzlxs[i].name + '</option>';
                        }
                    }

                    SelectDrone();//无人机切换

                    //航线树
                    tree.render({
                        elem: '#uav-route-add-waypointtree'
                        , data: []
                        , id: 'uav-route-add-waypointtreeid'
                        , showCheckbox: false
                        , edit: ['update', 'del']
                        , accordion: true
                        , showLine: false
                        , click: function (obj) {
                            current_waypoint_title = obj.data.title;
                            updateroutetree();

                            if (obj.data.type == "takeoff") {
                                //定位起飞点
                                ZoomToEntity(entity_takeoff);

                                //显示起飞点信息
                                ViewTakoff(obj);
                            }
                            else if (obj.data.type == "landing") {
                                //定位降落点
                                ZoomToEntity(entity_landing);

                                //显示降落点信息
                                ViewLanding(obj);
                            }
                            else if (obj.data.type == "targetarea") {
                                for (var i in entities_targetarea_label) {
                                    if (entities_targetarea_label[i].id == ("TARGETAREA_LABEL_" + obj.data.id)) {
                                        //定位目标区域
                                        ZoomToEntity(entities_targetarea_label[i]);
                                        break;
                                    }
                                }

                                //显示目标区域信息
                                ViewTargetArea(obj);
                            }
                            else if (obj.data.type == "avoid") {
                                for (var i in entities_avoid) {
                                    if (entities_avoid[i].id == ("AVOID_" + obj.data.id)) {
                                        //定位避障点
                                        ZoomToEntity(entities_avoid[i]);
                                        break;
                                    }
                                }

                                //显示避障点信息
                                ViewAvoid(obj);
                            }
                        }
                        , operate: function (obj) {
                            if (obj.type == "update") {
                                current_waypoint_title = obj.data.title;
                                updateroutetree();

                                if (obj.data.type == "takeoff") {
                                    //定位起飞点
                                    ZoomToEntity(entity_takeoff);

                                    //编辑起飞点信息
                                    EditTakeoff(obj);
                                }
                                else if (obj.data.type == "landing") {
                                    //定位降落点
                                    ZoomToEntity(entity_landing);

                                    //编辑降落点信息
                                    EditLanding(obj);
                                }
                                else if (obj.data.type == "targetarea") {
                                    for (var i in entities_targetarea_label) {
                                        if (entities_targetarea_label[i].id == ("TARGETAREA_LABEL_" + obj.data.id)) {
                                            //定位目标区域
                                            ZoomToEntity(entities_targetarea_label[i]);
                                            break;
                                        }
                                    }

                                    //编辑目标区域信息
                                    EditTargetArea(obj);
                                }
                                else if (obj.data.type == "avoid") {
                                    for (var i in entities_avoid) {
                                        if (entities_avoid[i].id == ("AVOID_" + obj.data.id)) {
                                            //定位避障点
                                            ZoomToEntity(entities_avoid[i]);
                                            break;
                                        }
                                    }

                                    //编辑避障点信息
                                    EditAvoid(obj);
                                }
                            }
                            else if (obj.type == "del") {
                                document.getElementById("uav-route-add-waypointpara").innerHTML = '';

                                //删除
                                if (obj.data.type == "takeoff") {
                                    //起飞点
                                    uav_route_add_takeoff = null;
                                    RemoveEntityInViewer(entity_takeoff);
                                    RemoveEntityInViewer(entity_takeoff_line);
                                    entity_takeoff = null;//起飞点几何
                                    entity_takeoff_line = null;

                                    //刷新航线树
                                    if (current_waypoint_title == "起飞点") {
                                        current_waypoint_title = null;
                                    }
                                    updateroutetree();
                                }
                                else if (obj.data.type == "landing") {
                                    //降落点
                                    uav_route_add_landing = null;
                                    RemoveEntityInViewer(entity_landing);
                                    RemoveEntityInViewer(entity_landing_line);
                                    entity_landing = null;
                                    entity_landing_line = null;

                                    //刷新航线树
                                    if (current_waypoint_title == "降落点") {
                                        current_waypoint_title = null;
                                    }
                                    updateroutetree();
                                }
                                else if (obj.data.type == "targetarea") {
                                    if (current_waypoint_title == obj.data.title) {
                                        current_waypoint_title = null;
                                    }

                                    //目标点
                                    if (uav_route_add_targetareas.length == 1) {
                                        uav_route_add_targetareas = [];
                                        RemoveEntityInViewer(entities_targetarea[0]);
                                        RemoveEntityInViewer(entities_targetarea_label[0]);
                                        entities_targetarea = [];
                                        entities_targetarea_label = [];

                                        uav_route_add_waypoint = uav_route_add_avoids;

                                        //刷新航线树
                                        updateroutetree();
                                    }
                                    else {
                                        uav_route_add_targetareas = RemoveArrayElemnet(uav_route_add_targetareas, obj.data.id, "目标区域");
                                        uav_route_add_waypoint = RemoveModiftyArrayElemnet(uav_route_add_waypoint, obj.data.id, "targetarea");

                                        //刷新航线树
                                        updateroutetree();

                                        RemoveEntitiesInViewer(entities_targetarea);
                                        RemoveEntitiesInViewer(entities_targetarea_label);
                                        entities_targetarea = [];
                                        entities_targetarea_label = [];

                                        for (var i in uav_route_add_targetareas) {
                                            var entity_targetarea = new Cesium.Entity({
                                                id: "TARGETAREA_" + uav_route_add_targetareas[i].id,
                                                polyline: {
                                                    positions: uav_route_add_targetareas[i].line,
                                                    width: 2,
                                                    arcType: Cesium.ArcType.RHUMB,
                                                    material: Cesium.Color.AQUA,
                                                    show: true,
                                                    clampToGround: true,
                                                    classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                                                },
                                            });
                                            entities_targetarea.push(entity_targetarea);
                                            AddEntityInViewer(entity_targetarea);

                                            var entity_targetarea_label = new Cesium.Entity({
                                                id: "TARGETAREA_LABEL_" + uav_route_add_targetareas[i].id,
                                                position: uav_route_add_targetareas[i].labelpos,
                                                label: {
                                                    text: uav_route_add_targetareas[i].title,
                                                    font: '20px Times New Roman',
                                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                    heightReference: Cesium.HeightReference.NONE,
                                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                    pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                }
                                            });
                                            entities_targetarea_label.push(entity_targetarea_label);
                                            AddEntityInViewer(entity_targetarea_label);
                                        }
                                    }
                                }
                                else if (obj.data.type == "avoid") {
                                    //避障点
                                    if (uav_route_add_avoids.length == 1) {
                                        uav_route_add_avoids = [];
                                        RemoveEntityInViewer(entities_avoid[0]);
                                        RemoveEntityInViewer(entities_avoid_label[0]);
                                        RemoveEntityInViewer(entities_avoid_line[0]);
                                        entities_avoid = [];
                                        entities_avoid_label = [];
                                        entities_avoid_line = [];

                                        uav_route_add_waypoint = uav_route_add_targetareas;

                                        //刷新航线树
                                        updateroutetree();
                                    }
                                    else {
                                        uav_route_add_avoids = RemoveArrayElemnet(uav_route_add_avoids, obj.data.id, "避障点");
                                        uav_route_add_waypoint = RemoveModiftyArrayElemnet(uav_route_add_waypoint, obj.data.id, "avoid");

                                        //刷新航线树
                                        if (current_waypoint_title == obj.data.title) {
                                            current_waypoint_title = null;
                                        }
                                        updateroutetree();

                                        //清除全部避障几何
                                        RemoveEntitiesInViewer(entities_avoid);
                                        RemoveEntitiesInViewer(entities_avoid_label);
                                        RemoveEntitiesInViewer(entities_avoid_line);
                                        entities_avoid = [];
                                        entities_avoid_label = [];
                                        entities_avoid_line = [];

                                        //重新添加避障几何
                                        for (var i in uav_route_add_waypoint) {
                                            if (uav_route_add_waypoint[i].type == "avoid") {
                                                //添加避障点
                                                var entity_avoid = new Cesium.Entity({
                                                    id: "AVOID_" + uav_route_add_waypoint[i].id,
                                                    position: CGCS2000BLH2XYZ(parseFloat(uav_route_add_waypoint[i].blh.b), parseFloat(uav_route_add_waypoint[i].blh.l), parseFloat(uav_route_add_waypoint[i].blh.h) + parseFloat(uav_route_add_waypoint[i].height)),
                                                    point: {
                                                        pixelSize: 10,
                                                        color: Cesium.Color.DARKORANGE,
                                                    },
                                                });
                                                entities_avoid.push(entity_avoid);
                                                AddEntityInViewer(entity_avoid);

                                                //添加避障辅助线
                                                var entity_avoid_line = new Cesium.Entity({
                                                    id: "AVOID_LINE_" + uav_route_add_waypoint[i].id,
                                                    polyline: {
                                                        positions: [uav_route_add_waypoint[i].xyz, CGCS2000BLH2XYZ(parseFloat(uav_route_add_waypoint[i].blh.b), parseFloat(uav_route_add_waypoint[i].blh.l), parseFloat(uav_route_add_waypoint[i].blh.h) + parseFloat(uav_route_add_waypoint[i].height))],
                                                        width: 3,
                                                        arcType: Cesium.ArcType.RHUMB,
                                                        material: Cesium.Color.DARKORANGE,
                                                        show: true,
                                                        clampToGround: false,
                                                    },
                                                });
                                                entities_avoid_line.push(entity_avoid_line);
                                                AddEntityInViewer(entity_avoid_line);

                                                //添加标注
                                                var entity_avoid_label = new Cesium.Entity({
                                                    id: "AVOID_LABEL_" + uav_route_add_waypoint[i].id,
                                                    position: CGCS2000BLH2XYZ(parseFloat(uav_route_add_waypoint[i].blh.b), parseFloat(uav_route_add_waypoint[i].blh.l), parseFloat(uav_route_add_waypoint[i].blh.h) + parseFloat(uav_route_add_waypoint[i].height)),
                                                    label: {
                                                        text: uav_route_add_waypoint[i].title,
                                                        font: '20px Times New Roman',
                                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                        heightReference: Cesium.HeightReference.NONE,
                                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                        pixelOffset: new Cesium.Cartesian2(0.0, -30),
                                                    }
                                                });
                                                entities_avoid_label.push(entity_avoid_label);
                                                AddEntityInViewer(entity_avoid_label);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });

                    AddTakeOffTerrain();//添加起飞点（地形）
                    AddLandingTerrain();//添加降落点（地形）
                    AddTargetAreaTerrain();//添加目标区域（地形）
                    AddAvoidTerrain();//添加避障点（地形）

                    ComputeMission();//计算任务
                    DownloadMission();//下载任务
                    SaveMission("add");//保存航线

                    form.render();
                    form.render('select');
                }
                , cancel: function () {
                }
                , end: function () {
                    viewer.scene.globe.depthTestAgainstTerrain = false;
                    ResetRouteElements();//重置
                }
            });
        }
        else if (type == 3) {
            viewer.scene.globe.depthTestAgainstTerrain = false;
            uavrouteaddlayerindex = layer.open({
                type: 1
                , title: ['新建斜坡摄影测量航线（模型）', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['400px', '850px']
                , shade: 0
                , offset: 'r'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--斜坡摄影测量（新建）--><form class="layui-form" lay-filter="uav-route-add" action=""><div class="layui-form-item" style="width:100%;height:680px;"><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin-top:0px;"><ul class="layui-tab-title"><li class="layui-this" style="padding-top: 5px;width:25%;">航线</li><li style="padding-top: 5px;width:25%;">无人机</li><li style="padding-top: 5px;width:25%;">规划</li></ul><div class="layui-tab-content"><!--航线--><div class="layui-tab-item layui-show"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航线名称</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-hxmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航线类型</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-hxlxid" name="uav-route-add-hxlx" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">高程类型</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-gclxid" name="uav-route-add-gclx" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航线速度m/s</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-hxsd" autocomplete="off" class="layui-input" lay-verify="required" /></div></div><div class="layui-form-item layui-form-text"><label class="layui-form-label" style="width:80px;text-align:left;">备&emsp;&emsp;注</label><div class="layui-input-block" style="margin-left:110px;"><textarea name="uav-route-add-bz" placeholder="请输入" class="layui-textarea" style="height:300px;padding-right:5px;"></textarea></div></div><div id="uav-route-result" style="visibility:hidden;"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航线长度m</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-hxcd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">飞行时间s</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-fxsj" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航点数量</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-hlds" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">拍照数量</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-pzsl" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div></div><!--无人机--><div class="layui-tab-item"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">无&ensp;人&ensp;机</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-droneid" name="uav-route-add-drone" lay-filter="uav-route-add-drone" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">挂载类型</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-payloadtypeid" name="uav-route-add-payloadtype" lay-filter="uav-route-add-payloadtype" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">挂载型号</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-payloadid" name="uav-route-add-payload" lay-filter="uav-route-add-payload" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">照片比例</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-photoratioid" name="uav-route-add-photoratio" lay-filter="uav-route-add-photoratio"><option value="">请选择</option></select></div></div></div><!--规划--><div class="layui-tab-item"><div class="layui-row layui-col-space5" style="margin-bottom:5px;"><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-takeoff" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 起飞点</button></div></div><div class="layui-col-md3"><div class="grid-demo"><button type="button" id="uav-route-add-targetarea" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 目标区域</button></div></div><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-avoid" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 避障点</button></div></div><div class="layui-col-md3"><div class="grid-demo"><button type="button" id="uav-route-add-landing" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 降落点</button></div></div></div><div class="grid-demo grid-demo-bg1" style="height:300px;border-style:solid;border-width:1px;border-color:#e6e6e6;overflow: auto;"><!--航点树--><div id="uav-route-add-waypointtree"></div></div><div class="grid-demo" style="height:287px;border-style:solid;border-width:1px;border-color:#e6e6e6;margin-top:5px;overflow: auto;"><!--参数--><div id="uav-route-add-waypointpara"></div></div></div></div></div></div><!--操作项--><div style="margin-top:5px;border-top-style:solid;border-top-width:2px;border-top-color:#f8f8f8;margin-left:5px;margin-right:5px;"><div class="layui-form-item" style="margin-top:5px;"><div style="margin-top:5px;"><button type="submit" class="layui-btn layui-btn-primary layui-btn-sm" lay-submit="" lay-filter="uav-route-add-jshx" style="width:100%;">计算</button></div></div><div class="layui-row layui-col-space5"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-dowload-json" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">下载JSON</button></div></div><div class="layui-col-md4"><div class="grid-demo"><button type="button" id="uav-route-add-dowload-djiterra" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">下载DJI Terra</button></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-dowload-djipilot" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">下载DJI Pilot</button></div></div></div><div class="layui-form-item" style="margin-top:5px;"><div style="margin-top:5px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="uav-route-add-submit" style="width:100%;">保存</button></div></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    //默认参数
                    form.val("uav-route-add", {
                        "uav-route-add-hxsd": routespeed
                    });

                    if (ljlxs.length > 0) {
                        for (var i in ljlxs) {
                            if (ljlxs[i].name == "斜坡摄影测量（模型）") {
                                document.getElementById("uav-route-add-hxlxid").innerHTML = '<option value="' + ljlxs[i].value + '" selected>' + ljlxs[i].name + '</option>';
                            }
                        }
                    }
                    if (gclxs.length > 0) {
                        for (var i in gclxs) {
                            document.getElementById("uav-route-add-gclxid").innerHTML += '<option value="' + gclxs[i].value + '">' + gclxs[i].name + '</option>';
                        }
                    }
                    if (drones != null) {
                        for (var i in drones) {
                            document.getElementById("uav-route-add-droneid").innerHTML += '<option value="' + drones[i].UavDrone.Id + '">' + drones[i].UavDrone.WRJMC + '</option>';
                        }
                    }
                    if (gzlxs.length > 0) {
                        for (var i in gzlxs) {
                            document.getElementById("uav-route-add-payloadtypeid").innerHTML += '<option value="' + gzlxs[i].value + '">' + gzlxs[i].name + '</option>';
                        }
                    }

                    SelectDrone();//无人机切换

                    //航线树
                    tree.render({
                        elem: '#uav-route-add-waypointtree'
                        , data: []
                        , id: 'uav-route-add-waypointtreeid'
                        , showCheckbox: false
                        , edit: ['update', 'del']
                        , accordion: true
                        , showLine: false
                        , click: function (obj) {
                            current_waypoint_title = obj.data.title;
                            updateroutetree();

                            if (obj.data.type == "takeoff") {
                                //定位起飞点
                                ZoomToEntity(entity_takeoff);

                                //显示起飞点信息
                                ViewTakoff(obj);
                            }
                            else if (obj.data.type == "landing") {
                                //定位降落点
                                ZoomToEntity(entity_landing);

                                //显示降落点信息
                                ViewLanding(obj);
                            }
                            else if (obj.data.type == "targetarea") {
                                for (var i in entities_targetarea_label) {
                                    if (entities_targetarea_label[i].id == ("TARGETAREA_LABEL_" + obj.data.id)) {
                                        //定位目标区域
                                        ZoomToEntity(entities_targetarea_label[i]);
                                        break;
                                    }
                                }

                                //显示目标区域信息
                                ViewTargetArea(obj);
                            }
                            else if (obj.data.type == "avoid") {
                                for (var i in entities_avoid) {
                                    if (entities_avoid[i].id == ("AVOID_" + obj.data.id)) {
                                        //定位避障点
                                        ZoomToEntity(entities_avoid[i]);
                                        break;
                                    }
                                }

                                //显示避障点信息
                                ViewAvoid(obj);
                            }
                        }
                        , operate: function (obj) {
                            if (obj.type == "update") {
                                current_waypoint_title = obj.data.title;
                                updateroutetree();

                                if (obj.data.type == "takeoff") {
                                    //定位起飞点
                                    ZoomToEntity(entity_takeoff);

                                    //编辑起飞点信息
                                    EditTakeoff(obj);
                                }
                                else if (obj.data.type == "landing") {
                                    //定位降落点
                                    ZoomToEntity(entity_landing);

                                    //编辑降落点信息
                                    EditLanding(obj);
                                }
                                else if (obj.data.type == "targetarea") {
                                    for (var i in entities_targetarea_label) {
                                        if (entities_targetarea_label[i].id == ("TARGETAREA_LABEL_" + obj.data.id)) {
                                            //定位目标区域
                                            ZoomToEntity(entities_targetarea_label[i]);
                                            break;
                                        }
                                    }

                                    //编辑目标区域信息
                                    EditTargetArea(obj);
                                }
                                else if (obj.data.type == "avoid") {
                                    for (var i in entities_avoid) {
                                        if (entities_avoid[i].id == ("AVOID_" + obj.data.id)) {
                                            //定位避障点
                                            ZoomToEntity(entities_avoid[i]);
                                            break;
                                        }
                                    }

                                    //编辑避障点信息
                                    EditAvoid(obj);
                                }
                            }
                            else if (obj.type == "del") {
                                document.getElementById("uav-route-add-waypointpara").innerHTML = '';

                                //删除
                                if (obj.data.type == "takeoff") {
                                    //起飞点
                                    uav_route_add_takeoff = null;
                                    RemoveEntityInViewer(entity_takeoff);
                                    RemoveEntityInViewer(entity_takeoff_line);
                                    entity_takeoff = null;//起飞点几何
                                    entity_takeoff_line = null;

                                    //刷新航线树
                                    if (current_waypoint_title == "起飞点") {
                                        current_waypoint_title = null;
                                    }
                                    updateroutetree();
                                }
                                else if (obj.data.type == "landing") {
                                    //降落点
                                    uav_route_add_landing = null;
                                    RemoveEntityInViewer(entity_landing);
                                    RemoveEntityInViewer(entity_landing_line);
                                    entity_landing = null;
                                    entity_landing_line = null;

                                    //刷新航线树
                                    if (current_waypoint_title == "降落点") {
                                        current_waypoint_title = null;
                                    }
                                    updateroutetree();
                                }
                                else if (obj.data.type == "targetarea") {
                                    if (current_waypoint_title == obj.data.title) {
                                        current_waypoint_title = null;
                                    }

                                    //目标点
                                    if (uav_route_add_targetareas.length == 1) {
                                        uav_route_add_targetareas = [];
                                        RemoveEntityInViewer(entities_targetarea[0]);
                                        RemoveEntityInViewer(entities_targetarea_label[0]);
                                        entities_targetarea = [];
                                        entities_targetarea_label = [];

                                        uav_route_add_waypoint = uav_route_add_avoids;

                                        //刷新航线树
                                        updateroutetree();
                                    }
                                    else {
                                        uav_route_add_targetareas = RemoveArrayElemnet(uav_route_add_targetareas, obj.data.id, "目标区域");
                                        uav_route_add_waypoint = RemoveModiftyArrayElemnet(uav_route_add_waypoint, obj.data.id, "targetarea");

                                        //刷新航线树
                                        updateroutetree();

                                        RemoveEntitiesInViewer(entities_targetarea);
                                        RemoveEntitiesInViewer(entities_targetarea_label);
                                        entities_targetarea = [];
                                        entities_targetarea_label = [];

                                        for (var i in uav_route_add_targetareas) {
                                            var entity_targetarea = new Cesium.Entity({
                                                id: "TARGETAREA_" + uav_route_add_targetareas[i].id,
                                                polyline: {
                                                    positions: uav_route_add_targetareas[i].line,
                                                    width: 2,
                                                    arcType: Cesium.ArcType.RHUMB,
                                                    material: Cesium.Color.AQUA,
                                                    show: true,
                                                    clampToGround: true,
                                                    classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                                                },
                                            });
                                            entities_targetarea.push(entity_targetarea);
                                            AddEntityInViewer(entity_targetarea);

                                            var entity_targetarea_label = new Cesium.Entity({
                                                id: "TARGETAREA_LABEL_" + uav_route_add_targetareas[i].id,
                                                position: uav_route_add_targetareas[i].labelpos,
                                                label: {
                                                    text: uav_route_add_targetareas[i].title,
                                                    font: '20px Times New Roman',
                                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                    heightReference: Cesium.HeightReference.NONE,
                                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                    pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                }
                                            });
                                            entities_targetarea_label.push(entity_targetarea_label);
                                            AddEntityInViewer(entity_targetarea_label);
                                        }
                                    }
                                }
                                else if (obj.data.type == "avoid") {
                                    //避障点
                                    if (uav_route_add_avoids.length == 1) {
                                        uav_route_add_avoids = [];
                                        RemoveEntityInViewer(entities_avoid[0]);
                                        RemoveEntityInViewer(entities_avoid_label[0]);
                                        RemoveEntityInViewer(entities_avoid_line[0]);
                                        entities_avoid = [];
                                        entities_avoid_label = [];
                                        entities_avoid_line = [];

                                        uav_route_add_waypoint = uav_route_add_targetareas;

                                        //刷新航线树
                                        updateroutetree();
                                    }
                                    else {
                                        uav_route_add_avoids = RemoveArrayElemnet(uav_route_add_avoids, obj.data.id, "避障点");
                                        uav_route_add_waypoint = RemoveModiftyArrayElemnet(uav_route_add_waypoint, obj.data.id, "avoid");

                                        //刷新航线树
                                        if (current_waypoint_title == obj.data.title) {
                                            current_waypoint_title = null;
                                        }
                                        updateroutetree();

                                        //清除全部避障几何
                                        RemoveEntitiesInViewer(entities_avoid);
                                        RemoveEntitiesInViewer(entities_avoid_label);
                                        RemoveEntitiesInViewer(entities_avoid_line);
                                        entities_avoid = [];
                                        entities_avoid_label = [];
                                        entities_avoid_line = [];

                                        //重新添加避障几何
                                        for (var i in uav_route_add_waypoint) {
                                            if (uav_route_add_waypoint[i].type == "avoid") {
                                                //添加避障点
                                                var entity_avoid = new Cesium.Entity({
                                                    id: "AVOID_" + uav_route_add_waypoint[i].id,
                                                    position: CGCS2000BLH2XYZ(parseFloat(uav_route_add_waypoint[i].blh.b), parseFloat(uav_route_add_waypoint[i].blh.l), parseFloat(uav_route_add_waypoint[i].blh.h) + parseFloat(uav_route_add_waypoint[i].height)),
                                                    point: {
                                                        pixelSize: 10,
                                                        color: Cesium.Color.DARKORANGE,
                                                    },
                                                });
                                                entities_avoid.push(entity_avoid);
                                                AddEntityInViewer(entity_avoid);

                                                //添加避障辅助线
                                                var entity_avoid_line = new Cesium.Entity({
                                                    id: "AVOID_LINE_" + uav_route_add_waypoint[i].id,
                                                    polyline: {
                                                        positions: [uav_route_add_waypoint[i].xyz, CGCS2000BLH2XYZ(parseFloat(uav_route_add_waypoint[i].blh.b), parseFloat(uav_route_add_waypoint[i].blh.l), parseFloat(uav_route_add_waypoint[i].blh.h) + parseFloat(uav_route_add_waypoint[i].height))],
                                                        width: 3,
                                                        arcType: Cesium.ArcType.RHUMB,
                                                        material: Cesium.Color.DARKORANGE,
                                                        show: true,
                                                        clampToGround: false,
                                                    },
                                                });
                                                entities_avoid_line.push(entity_avoid_line);
                                                AddEntityInViewer(entity_avoid_line);

                                                //添加标注
                                                var entity_avoid_label = new Cesium.Entity({
                                                    id: "AVOID_LABEL_" + uav_route_add_waypoint[i].id,
                                                    position: CGCS2000BLH2XYZ(parseFloat(uav_route_add_waypoint[i].blh.b), parseFloat(uav_route_add_waypoint[i].blh.l), parseFloat(uav_route_add_waypoint[i].blh.h) + parseFloat(uav_route_add_waypoint[i].height)),
                                                    label: {
                                                        text: uav_route_add_waypoint[i].title,
                                                        font: '20px Times New Roman',
                                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                        heightReference: Cesium.HeightReference.NONE,
                                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                        pixelOffset: new Cesium.Cartesian2(0.0, -30),
                                                    }
                                                });
                                                entities_avoid_label.push(entity_avoid_label);
                                                AddEntityInViewer(entity_avoid_label);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });

                    AddTakeOffModel(type);//添加起飞点
                    AddLandingModel(type);//添加降落点
                    AddTargetAreaModel();//添加目标区域
                    AddAvoidModel(type);//添加避障点

                    ComputeMission();//计算任务
                    DownloadMission();//下载任务
                    SaveMission("add");//保存任务

                    form.render();
                    form.render('select');
                }
                , cancel: function () {
                }
                , end: function () {
                    viewer.scene.globe.depthTestAgainstTerrain = false;
                    ResetRouteElements();//重置
                }
            });
        }
        else if (type == 4) {
            viewer.scene.globe.depthTestAgainstTerrain = true;
            //TODO
            uavrouteaddlayerindex = layer.open({
                type: 1
                , title: ['新建立面摄影测量航线（地形）', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['800px', '600px']
                , shade: 0
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: ''
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                }
                , cancel: function () {
                }
                , end: function () {
                    uavrouteaddlayerindex = null;
                }
            });
        }
        else if (type == 5) {
            viewer.scene.globe.depthTestAgainstTerrain = false;
            //TODO
            uavrouteaddlayerindex = layer.open({
                type: 1
                , title: ['新建立面摄影测量航线（模型）', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['800px', '600px']
                , shade: 0
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: ''
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                }
                , cancel: function () {
                }
                , end: function () {
                    uavrouteaddlayerindex = null;
                }
            });
        }
        else if (type == 6) {
            viewer.scene.globe.depthTestAgainstTerrain = true;
            //TODO
            uavrouteaddlayerindex = layer.open({
                type: 1
                , title: ['新建目标视频采集航线', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['800px', '600px']
                , shade: 0
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<p>建设中，敬请期待……</p>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                }
                , cancel: function () {
                }
                , end: function () {
                    uavrouteaddlayerindex = null;
                }
            });
        }
        else if (type == 7) {
            viewer.scene.globe.depthTestAgainstTerrain = false;
            uavrouteaddlayerindex = layer.open({
                type: 1
                , title: ['新建目标图像采集（视线）', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['400px', '850px']
                , offset: 'r'
                , shade: 0
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--目标图像采集（新建）--><form class="layui-form" lay-filter="uav-route-add" action=""><div class="layui-form-item" style="width:100%;height:680px;"><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin-top:0px;"><ul class="layui-tab-title"><li class="layui-this" style="padding-top: 5px;width:25%;">航线</li><li style="padding-top: 5px;width:25%;">无人机</li><li style="padding-top: 5px;width:25%;">规划</li></ul><div class="layui-tab-content"><!--航线--><div class="layui-tab-item layui-show"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航线名称</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-hxmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航线类型</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-hxlxid" name="uav-route-add-hxlx" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">高程类型</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-gclxid" name="uav-route-add-gclx" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航线速度m/s</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-hxsd" autocomplete="off" class="layui-input" lay-verify="required" /></div></div><div class="layui-form-item layui-form-text"><label class="layui-form-label" style="width:80px;text-align:left;">备&emsp;&emsp;注</label><div class="layui-input-block" style="margin-left:110px;"><textarea name="uav-route-add-bz" placeholder="请输入" class="layui-textarea" style="height:300px;padding-right:5px;"></textarea></div></div><div id="uav-route-result" style="visibility:hidden;"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航线长度m</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-hxcd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">飞行时间s</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-fxsj" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航点数量</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-hlds" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">拍照数量</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-pzsl" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div></div><!--无人机--><div class="layui-tab-item"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">无&ensp;人&ensp;机</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-droneid" name="uav-route-add-drone" lay-filter="uav-route-add-drone" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">挂载类型</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-payloadtypeid" name="uav-route-add-payloadtype" lay-filter="uav-route-add-payloadtype" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">挂载型号</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-payloadid" name="uav-route-add-payload" lay-filter="uav-route-add-payload" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">照片比例</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-photoratioid" name="uav-route-add-photoratio" lay-filter="uav-route-add-photoratio"><option value="">请选择</option></select></div></div></div><!--规划--><div class="layui-tab-item"><div class="layui-row layui-col-space5" style="margin-bottom:5px;"><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-takeoff" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 起飞点</button></div></div><div class="layui-col-md3"><div class="grid-demo"><button type="button" id="uav-route-add-target" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 目标点</button></div></div><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-avoid" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 避障点</button></div></div><div class="layui-col-md3"><div class="grid-demo"><button type="button" id="uav-route-add-landing" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 降落点</button></div></div></div><div class="grid-demo grid-demo-bg1" style="height:300px;border-style:solid;border-width:1px;border-color:#e6e6e6;overflow: auto;"><!--航点树--><div id="uav-route-add-waypointtree"></div></div><div class="layui-row layui-col-space5" id="uav-route-add-action" style="margin-top:5px;visibility:hidden;"><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-hover" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 悬停</button></div></div><div class="layui-col-md3"><div class="grid-demo"><button type="button" id="uav-route-add-photo" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 拍照</button></div></div><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-yaw" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 偏航角</button></div></div><div class="layui-col-md3"><div class="grid-demo"><button type="button" id="uav-route-add-pitch" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 俯仰角</button></div></div></div><div class="grid-demo" style="height:260px;border-style:solid;border-width:1px;border-color:#e6e6e6;margin-top:5px;overflow: auto;"><!--参数--><div id="uav-route-add-waypointpara"></div></div></div></div></div></div><!--操作项--><div style="margin-top:5px;border-top-style:solid;border-top-width:2px;border-top-color:#f8f8f8;margin-left:5px;margin-right:5px;"><div class="layui-form-item" style="margin-top:5px;"><div style="margin-top:5px;"><button type="submit" class="layui-btn layui-btn-primary layui-btn-sm" lay-submit="" lay-filter="uav-route-add-jshx" style="width:100%;">计算</button></div></div><div class="layui-row layui-col-space5"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-dowload-json" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">下载JSON</button></div></div><div class="layui-col-md4"><div class="grid-demo"><button type="button" id="uav-route-add-dowload-djiterra" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">下载DJI Terra</button></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-dowload-djipilot" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">下载DJI Pilot</button></div></div></div><div class="layui-form-item" style="margin-top:5px;"><div style="margin-top:5px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="uav-route-add-submit" style="width:100%;">保存</button></div></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    //默认参数
                    form.val("uav-route-add", {
                        "uav-route-add-hxsd": routespeed
                    });

                    if (ljlxs.length > 0) {
                        for (var i in ljlxs) {
                            if (ljlxs[i].name == "目标图像采集（视线）") {
                                document.getElementById("uav-route-add-hxlxid").innerHTML = '<option value="' + ljlxs[i].value + '" selected>' + ljlxs[i].name + '</option>';
                            }
                        }
                    }
                    if (gclxs.length > 0) {
                        for (var i in gclxs) {
                            document.getElementById("uav-route-add-gclxid").innerHTML += '<option value="' + gclxs[i].value + '">' + gclxs[i].name + '</option>';
                        }
                    }
                    if (drones != null) {
                        for (var i in drones) {
                            document.getElementById("uav-route-add-droneid").innerHTML += '<option value="' + drones[i].UavDrone.Id + '">' + drones[i].UavDrone.WRJMC + '</option>';
                        }
                    }
                    if (gzlxs.length > 0) {
                        for (var i in gzlxs) {
                            document.getElementById("uav-route-add-payloadtypeid").innerHTML += '<option value="' + gzlxs[i].value + '">' + gzlxs[i].name + '</option>';
                        }
                    }

                    SelectDrone();//无人机切换

                    //航线树
                    tree.render({
                        elem: '#uav-route-add-waypointtree'
                        , data: []
                        , id: 'uav-route-add-waypointtreeid'
                        , showCheckbox: false
                        , edit: ['update', 'del']
                        , accordion: true
                        , showLine: false
                        , click: function (obj) {
                            if (obj.data.type == "action") {
                                for (var i in uav_route_add_waypoint) {
                                    if (uav_route_add_waypoint[i].children != undefined) {
                                        for (var j in uav_route_add_waypoint[i].children) {
                                            if (uav_route_add_waypoint[i].children[j].id == obj.data.id) {
                                                if (obj.data.action == "hover") {
                                                    document.getElementById("uav-route-add-waypointpara").innerHTML = '<div style="margin-top:5px;"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">悬停时间ms</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-action-hover" autocomplete="off" class="layui-input" readonly="readonly" /></div></div>';
                                                    form.val("uav-route-add", {
                                                        "uav-route-add-target-action-hover": obj.data.value
                                                    });
                                                }
                                                else if (obj.data.action == "yaw") {
                                                    document.getElementById("uav-route-add-waypointpara").innerHTML = '<div style="margin-top:5px;"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">偏&ensp;航&ensp;角°</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-action-yaw" autocomplete="off" class="layui-input" readonly="readonly" /></div></div>';
                                                    form.val("uav-route-add", {
                                                        "uav-route-add-target-action-yaw": obj.data.value
                                                    });
                                                }
                                                else if (obj.data.action == "pitch") {
                                                    document.getElementById("uav-route-add-waypointpara").innerHTML = '<div style="margin-top:5px;"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">俯&ensp;仰&ensp;角°</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-action-pitch" autocomplete="off" class="layui-input" readonly="readonly" /></div></div>';
                                                    form.val("uav-route-add", {
                                                        "uav-route-add-target-action-pitch": obj.data.value
                                                    });
                                                }
                                                else if (obj.data.action == "photo") {
                                                    document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                current_target_id = null;
                                document.getElementById("uav-route-add-action").style.visibility = "hidden";//隐藏动作按钮
                                current_waypoint_title = obj.data.title;
                                for (var i in uav_route_add_waypoint) {
                                    if (uav_route_add_waypoint[i].id == obj.data.id && obj.data.type == "target") {
                                        uav_route_add_waypoint[i].spread = true;
                                    }
                                    else {
                                        uav_route_add_waypoint[i].spread = false;
                                    }
                                }
                                updateroutetree();

                                if (obj.data.type == "takeoff") {
                                    //定位起飞点
                                    ZoomToEntity(entity_takeoff);

                                    //显示起飞点信息
                                    ViewTakoff(obj);
                                }
                                else if (obj.data.type == "landing") {
                                    //定位降落点
                                    ZoomToEntity(entity_landing);

                                    //显示降落点信息
                                    ViewLanding(obj);
                                }
                                else if (obj.data.type == "target") {
                                    current_target_id = obj.data.id;//赋值当前目标点id，用于添加动作
                                    document.getElementById("uav-route-add-action").style.visibility = "visible";

                                    for (var i in entities_target) {
                                        if (entities_target[i].id == ("TARGET_" + obj.data.id)) {
                                            //定位目标点视线
                                            ZoomToEntity(entities_target[i]);

                                            //显示目标点视线信息
                                            ViewTargetE(obj);

                                            break;
                                        }
                                    }
                                }
                                else if (obj.data.type == "avoid") {
                                    for (var i in entities_avoid) {
                                        if (entities_avoid[i].id == ("AVOID_" + obj.data.id)) {
                                            //定位避障点
                                            ZoomToEntity(entities_avoid[i]);

                                            //显示避障点信息
                                            ViewAvoid(obj);

                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        , operate: function (obj) {
                            if (obj.type == "update") {
                                if (obj.data.type == "action") {
                                    if (obj.data.action == "hover") {
                                        //编辑悬停
                                        document.getElementById("uav-route-add-waypointpara").innerHTML = '<div style="margin-top:5px;"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">悬停时间ms</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-action-hover" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><div style="margin-top:5px;"><button type="button" id="uav-route-add-save" class="layui-btn layui-btn-primary layui-btn-sm" style="width:96%;margin-left:2%;margin-right:2%;">修改</button></div></div>';
                                        form.val("uav-route-add", {
                                            "uav-route-add-target-action-hover": obj.data.value
                                        });

                                        $("#uav-route-add-save").on("click", function () {
                                            for (var i in uav_route_add_waypoint) {
                                                if (uav_route_add_waypoint[i].type == "target") {
                                                    for (var j in uav_route_add_waypoint[i].children) {
                                                        if (uav_route_add_waypoint[i].children[j].id == obj.data.id) {
                                                            uav_route_add_waypoint[i].children[j].value = form.val("uav-route-add")["uav-route-add-target-action-hover"];
                                                            break;
                                                        }
                                                    }
                                                }
                                            }

                                            //刷新航线树
                                            updateroutetree();

                                            layer.msg("修改成功！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        });
                                    }
                                    else if (obj.data.action == "yaw") {
                                        //编辑偏航角
                                        document.getElementById("uav-route-add-waypointpara").innerHTML = '<div style="margin-top:5px;"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">偏&ensp;航&ensp;角°</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-action-yaw" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><div style="margin-top:5px;"><button type="button" id="uav-route-add-save" class="layui-btn layui-btn-primary layui-btn-sm" style="width:96%;margin-left:2%;margin-right:2%;">修改</button></div></div>';
                                        form.val("uav-route-add", {
                                            "uav-route-add-target-action-yaw": obj.data.value
                                        });

                                        $("#uav-route-add-save").on("click", function () {
                                            for (var i in uav_route_add_waypoint) {
                                                if (uav_route_add_waypoint[i].type == "target") {
                                                    for (var j in uav_route_add_waypoint[i].children) {
                                                        if (uav_route_add_waypoint[i].children[j].id == obj.data.id) {
                                                            uav_route_add_waypoint[i].children[j].value = form.val("uav-route-add")["uav-route-add-target-action-yaw"];
                                                            break;
                                                        }
                                                    }
                                                }
                                            }

                                            //刷新航线树
                                            updateroutetree();

                                            layer.msg("修改成功！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        });
                                    }
                                    else if (obj.data.action == "pitch") {
                                        //编辑俯仰角
                                        document.getElementById("uav-route-add-waypointpara").innerHTML = '<div style="margin-top:5px;"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">俯&ensp;仰&ensp;角°</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-action-pitch" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><div style="margin-top:5px;"><button type="button" id="uav-route-add-save" class="layui-btn layui-btn-primary layui-btn-sm" style="width:96%;margin-left:2%;margin-right:2%;">修改</button></div></div>';
                                        form.val("uav-route-add", {
                                            "uav-route-add-target-action-pitch": obj.data.value
                                        });

                                        $("#uav-route-add-save").on("click", function () {
                                            for (var i in uav_route_add_waypoint) {
                                                if (uav_route_add_waypoint[i].type == "target") {
                                                    for (var j in uav_route_add_waypoint[i].children) {
                                                        if (uav_route_add_waypoint[i].children[j].id == obj.data.id) {
                                                            uav_route_add_waypoint[i].children[j].value = form.val("uav-route-add")["uav-route-add-target-action-pitch"];
                                                            break;
                                                        }
                                                    }
                                                }
                                            }

                                            //刷新航线树
                                            updateroutetree();

                                            layer.msg("修改成功！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        });
                                    }
                                    else if (obj.data.action == "photo") {
                                        document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                                    }
                                }
                                else {
                                    current_target_id = null;
                                    document.getElementById("uav-route-add-action").style.visibility = "hidden";//隐藏动作按钮
                                    current_waypoint_title = obj.data.title;
                                    for (var i in uav_route_add_waypoint) {
                                        if (uav_route_add_waypoint[i].id == obj.data.id && obj.data.type == "target") {
                                            uav_route_add_waypoint[i].spread = true;
                                        }
                                        else {
                                            uav_route_add_waypoint[i].spread = false;
                                        }
                                    }
                                    updateroutetree();

                                    if (obj.data.type == "takeoff") {
                                        //定位起飞点
                                        ZoomToEntity(entity_takeoff);

                                        //编辑起飞点信息
                                        EditTakeoff(obj);
                                    }
                                    else if (obj.data.type == "landing") {
                                        //定位降落点
                                        ZoomToEntity(entity_landing);

                                        //编辑降落点信息
                                        EditLanding(obj);
                                    }
                                    else if (obj.data.type == "target") {
                                        for (var i in entities_target) {
                                            if (entities_target[i].id == ("TARGET_" + obj.data.id)) {
                                                //定位目标点（视线）
                                                ZoomToEntity(entities_target[i]);
                                                break;
                                            }
                                        }

                                        //编辑目标点（视线）信息
                                        EditTargetE(obj);
                                    }
                                    else if (obj.data.type == "avoid") {
                                        for (var i in entities_avoid) {
                                            if (entities_avoid[i].id == ("AVOID_" + obj.data.id)) {
                                                //定位避障点
                                                ZoomToEntity(entities_avoid[i]);
                                                break;
                                            }
                                        }

                                        //编辑避障点信息
                                        EditAvoid(obj);
                                    }
                                }
                            }
                            else if (obj.type == "del") {
                                document.getElementById("uav-route-add-waypointpara").innerHTML = '';

                                //删除
                                if (obj.data.type == "takeoff") {
                                    //起飞点
                                    uav_route_add_takeoff = null;
                                    RemoveEntityInViewer(entity_takeoff);
                                    RemoveEntityInViewer(entity_takeoff_line);
                                    entity_takeoff = null;//起飞点几何
                                    entity_takeoff_line = null;

                                    //刷新航线树
                                    if (current_waypoint_title == "起飞点") {
                                        current_waypoint_title = null;
                                    }
                                    updateroutetree();
                                }
                                else if (obj.data.type == "landing") {
                                    //降落点
                                    uav_route_add_landing = null;
                                    RemoveEntityInViewer(entity_landing);
                                    RemoveEntityInViewer(entity_landing_line);
                                    entity_landing = null;
                                    entity_landing_line = null;

                                    //刷新航线树
                                    if (current_waypoint_title == "降落点") {
                                        current_waypoint_title = null;
                                    }
                                    updateroutetree();
                                }
                                else if (obj.data.type == "target") {
                                    if (current_waypoint_title == obj.data.title) {
                                        current_waypoint_title = null;
                                    }

                                    //目标点
                                    if (uav_route_add_targets.length == 1) {
                                        uav_route_add_targets = [];
                                        RemoveEntityInViewer(entities_target[0]);
                                        RemoveEntityInViewer(entities_target_label[0]);
                                        entities_target = [];
                                        entities_target_label = [];

                                        uav_route_add_waypoint = uav_route_add_avoids;

                                        //刷新航线树
                                        updateroutetree();
                                    }
                                    else {
                                        uav_route_add_targets = RemoveArrayElemnet(uav_route_add_targets, obj.data.id, "目标点");
                                        uav_route_add_waypoint = RemoveModiftyArrayElemnet(uav_route_add_waypoint, obj.data.id, "target");

                                        //刷新航线树
                                        updateroutetree();

                                        RemoveEntitiesInViewer(entities_target);
                                        RemoveEntitiesInViewer(entities_target_label);
                                        entities_target = [];
                                        entities_target_label = [];

                                        for (var i in uav_route_add_targets) {
                                            var entity_target = new Cesium.Entity({
                                                id: "TARGET_" + uav_route_add_targets[i].id,
                                                position: uav_route_add_targets[i].xyz,
                                                billboard: {
                                                    image: '../../Resources/img/uav/target.png',
                                                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                    heightReference: Cesium.HeightReference.NONE,
                                                    width: 40,
                                                    height: 40,
                                                }
                                            });
                                            entities_target.push(entity_target);
                                            AddEntityInViewer(entity_target);

                                            var entity_target_label = new Cesium.Entity({
                                                id: "TARGET_LABEL_" + uav_route_add_targets[i].id,
                                                position: uav_route_add_targets[i].xyz,
                                                label: {
                                                    text: uav_route_add_targets[i].title,
                                                    font: '20px Times New Roman',
                                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                    heightReference: Cesium.HeightReference.NONE,
                                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                    pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                }
                                            });
                                            entities_target_label.push(entity_target_label);
                                            AddEntityInViewer(entity_target_label);
                                        }
                                    }
                                }
                                else if (obj.data.type == "avoid") {
                                    //避障点
                                    if (uav_route_add_avoids.length == 1) {
                                        uav_route_add_avoids = [];
                                        RemoveEntityInViewer(entities_avoid[0]);
                                        RemoveEntityInViewer(entities_avoid_label[0]);
                                        RemoveEntityInViewer(entities_avoid_line[0]);
                                        entities_avoid = [];
                                        entities_avoid_label = [];
                                        entities_avoid_line = [];

                                        uav_route_add_waypoint = uav_route_add_targets;

                                        //刷新航线树
                                        updateroutetree();
                                    }
                                    else {
                                        uav_route_add_avoids = RemoveArrayElemnet(uav_route_add_avoids, obj.data.id, "避障点");
                                        uav_route_add_waypoint = RemoveModiftyArrayElemnet(uav_route_add_waypoint, obj.data.id, "avoid");

                                        //刷新航线树
                                        if (current_waypoint_title == obj.data.title) {
                                            current_waypoint_title = null;
                                        }
                                        updateroutetree();

                                        //清除全部避障几何
                                        RemoveEntitiesInViewer(entities_avoid);
                                        RemoveEntitiesInViewer(entities_avoid_label);
                                        RemoveEntitiesInViewer(entities_avoid_line);
                                        entities_avoid = [];
                                        entities_avoid_label = [];
                                        entities_avoid_line = [];

                                        //重新添加避障几何
                                        for (var i in uav_route_add_waypoint) {
                                            if (uav_route_add_waypoint[i].type == "avoid") {
                                                //添加避障点
                                                var entity_avoid = new Cesium.Entity({
                                                    id: "AVOID_" + uav_route_add_waypoint[i].id,
                                                    position: CGCS2000BLH2XYZ(parseFloat(uav_route_add_waypoint[i].blh.b), parseFloat(uav_route_add_waypoint[i].blh.l), parseFloat(uav_route_add_waypoint[i].blh.h) + parseFloat(uav_route_add_waypoint[i].height)),
                                                    point: {
                                                        pixelSize: 10,
                                                        color: Cesium.Color.DARKORANGE,
                                                    },
                                                });
                                                entities_avoid.push(entity_avoid);
                                                AddEntityInViewer(entity_avoid);

                                                //添加避障辅助线
                                                var entity_avoid_line = new Cesium.Entity({
                                                    id: "AVOID_LINE_" + uav_route_add_waypoint[i].id,
                                                    polyline: {
                                                        positions: [uav_route_add_waypoint[i].xyz, CGCS2000BLH2XYZ(parseFloat(uav_route_add_waypoint[i].blh.b), parseFloat(uav_route_add_waypoint[i].blh.l), parseFloat(uav_route_add_waypoint[i].blh.h) + parseFloat(uav_route_add_waypoint[i].height))],
                                                        width: 3,
                                                        arcType: Cesium.ArcType.RHUMB,
                                                        material: Cesium.Color.DARKORANGE,
                                                        show: true,
                                                        clampToGround: false,
                                                    },
                                                });
                                                entities_avoid_line.push(entity_avoid_line);
                                                AddEntityInViewer(entity_avoid_line);

                                                //添加标注
                                                var entity_avoid_label = new Cesium.Entity({
                                                    id: "AVOID_LABEL_" + uav_route_add_waypoint[i].id,
                                                    position: CGCS2000BLH2XYZ(parseFloat(uav_route_add_waypoint[i].blh.b), parseFloat(uav_route_add_waypoint[i].blh.l), parseFloat(uav_route_add_waypoint[i].blh.h) + parseFloat(uav_route_add_waypoint[i].height)),
                                                    label: {
                                                        text: uav_route_add_waypoint[i].title,
                                                        font: '20px Times New Roman',
                                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                        heightReference: Cesium.HeightReference.NONE,
                                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                        pixelOffset: new Cesium.Cartesian2(0.0, -30),
                                                    }
                                                });
                                                entities_avoid_label.push(entity_avoid_label);
                                                AddEntityInViewer(entity_avoid_label);
                                            }
                                        }
                                    }
                                }
                                else if (obj.data.type = "action") {
                                    var targetid = null;

                                    for (var i in uav_route_add_waypoint) {
                                        if (uav_route_add_waypoint[i].type == "target") {
                                            for (var j in uav_route_add_waypoint[i].children) {
                                                if (uav_route_add_waypoint[i].children[j].id == obj.data.id) {
                                                    targetid = uav_route_add_waypoint[i].id;
                                                    break;
                                                }
                                            }
                                        }
                                    }

                                    var child = [];

                                    for (var i in uav_route_add_waypoint) {
                                        if ((uav_route_add_waypoint[i].type == "target") && (uav_route_add_waypoint[i].id == targetid)) {
                                            for (var j in uav_route_add_waypoint[i].children) {
                                                if (uav_route_add_waypoint[i].children[j].id != obj.data.id) {
                                                    child.push(uav_route_add_waypoint[i].children[j]);
                                                }
                                            }

                                            uav_route_add_waypoint[i].children = child;
                                            break;
                                        }
                                    }

                                    //刷新航线树
                                    updateroutetree();
                                }
                            }
                        }
                    });

                    AddTakeOffModel(type);//添加起飞点
                    AddLandingModel(type);//添加降落点
                    AddTargetEyeModel();//添加目标点（视线）
                    AddAvoidModel(type);//添加避障点

                    //悬停
                    $("#uav-route-add-hover").on("click", function () {
                        if (current_target_id == null) {
                            layer.msg("请先点击选择目标点！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }
                        else {
                            var action = new Object;
                            action.id = NewGuid();
                            action.type = "action";
                            action.action = "hover";
                            action.title = "悬停";
                            action.value = hovertime;

                            for (var i in uav_route_add_waypoint) {
                                if ((uav_route_add_waypoint[i].id == current_target_id) && (uav_route_add_waypoint[i].type == "target")) {
                                    if (uav_route_add_waypoint[i].children == undefined) {
                                        var child = [];
                                        child.push(action);
                                        uav_route_add_waypoint[i].children = child;
                                    }
                                    else {
                                        uav_route_add_waypoint[i].children.push(action);
                                    }

                                    uav_route_add_waypoint[i].spread = true;
                                }
                                else {
                                    uav_route_add_waypoint[i].spread = false;
                                }
                            }

                            //刷新航线树
                            updateroutetree();
                            document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                        }
                    });
                    //拍照
                    $("#uav-route-add-photo").on("click", function () {
                        if (current_target_id == null) {
                            layer.msg("请先点击选择目标点！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }
                        else {
                            var action = new Object;
                            action.id = NewGuid();
                            action.type = "action";
                            action.action = "photo";
                            action.title = "拍照";
                            action.value = 0;

                            for (var i in uav_route_add_waypoint) {
                                if ((uav_route_add_waypoint[i].id == current_target_id) && (uav_route_add_waypoint[i].type == "target")) {
                                    if (uav_route_add_waypoint[i].children == undefined) {
                                        var child = [];
                                        child.push(action);
                                        uav_route_add_waypoint[i].children = child;
                                    }
                                    else {
                                        uav_route_add_waypoint[i].children.push(action);
                                    }
                                    uav_route_add_waypoint[i].spread = true;
                                }
                                else {
                                    uav_route_add_waypoint[i].spread = false;
                                }
                            }

                            //刷新航线树
                            updateroutetree();
                            document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                        }
                    });
                    //偏航角
                    $("#uav-route-add-yaw").on("click", function () {
                        if (current_target_id == null) {
                            layer.msg("请先点击选择目标点！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }
                        else {
                            var action = new Object;
                            action.id = NewGuid();
                            action.type = "action";
                            action.action = "yaw";
                            action.title = "偏航角";
                            action.value = yawangle;

                            for (var i in uav_route_add_waypoint) {
                                if ((uav_route_add_waypoint[i].id == current_target_id) && (uav_route_add_waypoint[i].type == "target")) {
                                    if (uav_route_add_waypoint[i].children == undefined) {
                                        var child = [];
                                        child.push(action);
                                        uav_route_add_waypoint[i].children = child;
                                    }
                                    else {
                                        uav_route_add_waypoint[i].children.push(action);
                                    }
                                    uav_route_add_waypoint[i].spread = true;
                                }
                                else {
                                    uav_route_add_waypoint[i].spread = false;
                                }
                            }

                            //刷新航线树
                            updateroutetree();
                            document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                        }
                    });
                    //俯仰角
                    $("#uav-route-add-pitch").on("click", function () {
                        if (current_target_id == null) {
                            layer.msg("请先点击选择目标点！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }
                        else {
                            var action = new Object;
                            action.id = NewGuid();
                            action.type = "action";
                            action.action = "pitch";
                            action.title = "俯仰角";
                            action.value = pitchangle;

                            for (var i in uav_route_add_waypoint) {
                                if ((uav_route_add_waypoint[i].id == current_target_id) && (uav_route_add_waypoint[i].type == "target")) {
                                    if (uav_route_add_waypoint[i].children == undefined) {
                                        var child = [];
                                        child.push(action);
                                        uav_route_add_waypoint[i].children = child;
                                    }
                                    else {
                                        uav_route_add_waypoint[i].children.push(action);
                                    }
                                    uav_route_add_waypoint[i].spread = true;
                                }
                                else {
                                    uav_route_add_waypoint[i].spread = false;
                                }
                            }

                            //刷新航线树
                            updateroutetree();
                            document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                        }
                    });

                    ComputeMission();//计算任务
                    DownloadMission();//下载任务
                    SaveMission("add");//保存航线

                    form.render();
                    form.render('select');
                }
                , cancel: function () {
                    //TODO
                }
                , end: function () {
                    viewer.scene.globe.depthTestAgainstTerrain = false;
                    ResetRouteElements();//重置
                }
            });
        }
    }
};

//查看航线
function ViewUavRoute(type, routeid) {
    if (uavrouteviewlayerindex == null) {
    }
};

//编辑航线
function EditUavRoute(type, routeid) {
    if (uavrouteeditlayerindex == null) {
    }
};


//无人机切换
function SelectDrone() {
    droneid = null;
    var paloadtypeid = null;
    //无人机切换
    form.on('select(uav-route-add-drone)', function (data) {
        document.getElementById("uav-route-add-payloadid").innerHTML = '<option value="">请选择</option>';
        document.getElementById("uav-route-add-photoratioid").innerHTML = '<option value="">请选择</option>';

        droneid = data.value;

        if (droneid != "" && paloadtypeid != null && paloadtypeid != "" && drones != null) {
            for (var i in drones) {
                if (drones[i].UavDrone.Id == droneid) {
                    for (var j in drones[i].Payloads) {
                        if (drones[i].Payloads[j].Type == paloadtypeid && paloadtypeid == 0) {
                            document.getElementById("uav-route-add-payloadid").innerHTML += '<option value="' + drones[i].Payloads[j].Camera.UavCamera.Id + '">' + drones[i].Payloads[j].Camera.UavCamera.XJMC + '</option>';
                        }
                        else if (drones[i].Payloads[j].Type == paloadtypeid && paloadtypeid == 1) {
                        }
                    }
                }
            }
        }

        form.render();
        form.render('select');
    });
    //挂载类型切换
    form.on('select(uav-route-add-payloadtype)', function (data) {
        document.getElementById("uav-route-add-payloadid").innerHTML = '<option value="">请选择</option>';
        document.getElementById("uav-route-add-photoratioid").innerHTML = '<option value="">请选择</option>';

        paloadtypeid = data.value;

        if (paloadtypeid != "" && droneid != null && droneid != "" && drones != null) {
            for (var i in drones) {
                if (drones[i].UavDrone.Id == droneid) {
                    for (var j in drones[i].Payloads) {
                        if (drones[i].Payloads[j].Type == paloadtypeid && paloadtypeid == 0) {
                            document.getElementById("uav-route-add-payloadid").innerHTML += '<option value="' + drones[i].Payloads[j].Camera.UavCamera.Id + '">' + drones[i].Payloads[j].Camera.UavCamera.XJMC + '</option>';
                        }
                        else if (drones[i].Payloads[j].Type == paloadtypeid && paloadtypeid == 1) {

                        }
                    }
                }
            }
        }

        form.render();
        form.render('select');
    });
    //挂载切换
    form.on('select(uav-route-add-payload)', function (data) {
        document.getElementById("uav-route-add-photoratioid").innerHTML = '<option value="">请选择</option>';

        if (data.value != "" && droneid != null && droneid != "" && paloadtypeid != null && paloadtypeid != "" && drones != null) {
            for (var i in drones) {
                if (drones[i].UavDrone.Id == droneid) {
                    for (var j in drones[i].Payloads) {
                        if (drones[i].Payloads[j].Type == paloadtypeid && paloadtypeid == 0 && drones[i].Payloads[j].Camera.UavCamera.Id == data.value) {
                            for (var k in drones[i].Payloads[j].Camera.CameraPhotoRatios) {
                                document.getElementById("uav-route-add-photoratioid").innerHTML += '<option value="' + drones[i].Payloads[j].Camera.CameraPhotoRatios[k].Id + '">' + drones[i].Payloads[j].Camera.CameraPhotoRatios[k].MS + '</option>';
                            }
                        }
                        else if (drones[i].Payloads[j].Type == paloadtypeid && paloadtypeid == 1) {

                        }
                    }
                }
            }
        }

        form.render();
        form.render('select');
    });
};

//刷新航线树
function updateroutetree() {
    //组织航线树数据
    uav_route_add_waypointtreedata = [];
    if (uav_route_add_takeoff != null) {
        uav_route_add_waypointtreedata.push(uav_route_add_takeoff);
    }
    if (uav_route_add_waypoint.length > 0) {
        for (var i in uav_route_add_waypoint) {
            uav_route_add_waypointtreedata.push(uav_route_add_waypoint[i]);
        }
    }
    if (uav_route_add_landing != null) {
        uav_route_add_waypointtreedata.push(uav_route_add_landing);
    }
    tree.reload('uav-route-add-waypointtreeid', { data: uav_route_add_waypointtreedata });

    //高亮节点
    MarkNode();
};

//添加起飞点（模型）
function AddTakeOffModel(type) {
    $("#uav-route-add-takeoff").on("click", function () {







        if (current_project_tile == null) {
            layer.msg("请加载项目三维实景模型！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
        else {
            if (uav_route_add_takeoff != null) {
                layer.msg("起飞点已存在，请编辑起飞点！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }
            else {
                if (handler != undefined) {
                    handler.destroy();
                }

                viewer._container.style.cursor = "crosshair";//修改鼠标样式

                handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
                handler.setInputAction(function (leftclick) {
                    var pick = viewer.scene.pick(leftclick.position);
                    if (pick != undefined) {
                        var XYZ = viewer.scene.pickPosition(leftclick.position);
                        if (XYZ != undefined) {
                            var blh = Cesium.Cartographic.fromCartesian(XYZ);
                            if (blh.height > 0) {
                                uav_route_add_takeoff = new Object;
                                uav_route_add_takeoff.id = 0;
                                uav_route_add_takeoff.title = "起飞点";
                                uav_route_add_takeoff.icon = TAKEOFFICON;
                                uav_route_add_takeoff.type = "takeoff";
                                uav_route_add_takeoff.spread = false;
                                var pos = new Object;
                                pos.b = Cesium.Math.toDegrees(blh.latitude);
                                pos.l = Cesium.Math.toDegrees(blh.longitude);
                                pos.h = blh.height.toFixed(4);
                                uav_route_add_takeoff.blh = pos;
                                uav_route_add_takeoff.xyz = XYZ;
                                uav_route_add_takeoff.height = takeoffheight;
                                uav_route_add_takeoff.speed = routespeed;

                                //刷新航线树
                                if (type == 0) {
                                    current_target_id = null;
                                    for (var i in uav_route_add_waypoint) {
                                        uav_route_add_waypoint[i].spread = false;
                                    }
                                }
                                current_waypoint_title = uav_route_add_takeoff.title;
                                updateroutetree();

                                //添加起飞点
                                entity_takeoff = new Cesium.Entity({
                                    id: "TAKEOFF",
                                    position: XYZ,
                                    billboard: {
                                        image: '../../Resources/img/uav/takeoff.png',
                                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                        heightReference: Cesium.HeightReference.NONE,
                                        width: 40,
                                        height: 40,
                                    }
                                });
                                AddEntityInViewer(entity_takeoff);
                                //添加上升线
                                entity_takeoff_line = new Cesium.Entity({
                                    id: "TAKEOFF_LINE",
                                    polyline: {
                                        positions: [XYZ, CGCS2000BLH2XYZ(uav_route_add_takeoff.blh.b, uav_route_add_takeoff.blh.l, blh.height + takeoffheight)],
                                        width: 3,
                                        arcType: Cesium.ArcType.RHUMB,
                                        material: Cesium.Color.DARKORANGE,
                                        show: true,
                                        clampToGround: false,
                                    },
                                });
                                AddEntityInViewer(entity_takeoff_line);

                                if (handler != undefined) {
                                    handler.destroy();
                                }

                                viewer._container.style.cursor = "default";//还原鼠标样式
                                if (type == 0) {
                                    document.getElementById("uav-route-add-action").style.visibility = "hidden";//隐藏航点动作
                                }
                                document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                            }
                        }
                    }
                }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
                handler.setInputAction(function (rightclik) {
                    if (handler != undefined) {
                        handler.destroy();
                    }

                    viewer._container.style.cursor = "default";//还原鼠标样式
                }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
            }
        }
    });
};
//添加降落点（模型）
function AddLandingModel(type) {
    $("#uav-route-add-landing").on("click", function () {
        if (current_project_tile == null) {
            layer.msg("请加载项目三维实景模型！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
        else {
            if (uav_route_add_landing != null) {
                layer.msg("降落点已存在，请编辑降落点！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }
            else {
                if (handler != undefined) {
                    handler.destroy();
                }

                viewer._container.style.cursor = "crosshair";//修改鼠标样式

                handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
                handler.setInputAction(function (leftclick) {
                    var pick = viewer.scene.pick(leftclick.position);
                    if (pick != undefined) {
                        var XYZ = viewer.scene.pickPosition(leftclick.position);
                        if (XYZ != undefined) {
                            var blh = Cesium.Cartographic.fromCartesian(XYZ);
                            if (blh.height > 0) {
                                uav_route_add_landing = new Object;
                                uav_route_add_landing.id = 9999;
                                uav_route_add_landing.title = "降落点";
                                uav_route_add_landing.icon = LANDINGICON;
                                uav_route_add_landing.type = "landing";
                                uav_route_add_landing.spread = false;
                                var pos = new Object;
                                pos.b = Cesium.Math.toDegrees(blh.latitude);
                                pos.l = Cesium.Math.toDegrees(blh.longitude);
                                pos.h = blh.height.toFixed(4);
                                uav_route_add_landing.blh = pos;
                                uav_route_add_landing.xyz = XYZ;
                                uav_route_add_landing.height = landingheight;
                                uav_route_add_landing.speed = 0;

                                //刷新航线树
                                if (type == 0) {
                                    current_target_id = null;
                                    for (var i in uav_route_add_waypoint) {
                                        uav_route_add_waypoint[i].spread = false;
                                    }
                                }
                                current_waypoint_title = uav_route_add_landing.title;
                                updateroutetree();

                                //添加降落点
                                entity_landing = new Cesium.Entity({
                                    id: "LANDING",
                                    position: XYZ,
                                    billboard: {
                                        image: '../../Resources/img/uav/landing.png',
                                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                        heightReference: Cesium.HeightReference.NONE,
                                        width: 40,
                                        height: 40,
                                    }
                                });
                                AddEntityInViewer(entity_landing);
                                //添加降落线
                                entity_landing_line = new Cesium.Entity({
                                    id: "LANDING_LINE",
                                    polyline: {
                                        positions: [CGCS2000BLH2XYZ(uav_route_add_landing.blh.b, uav_route_add_landing.blh.l, blh.height + landingheight), XYZ],
                                        width: 3,
                                        arcType: Cesium.ArcType.RHUMB,
                                        material: Cesium.Color.DARKORANGE,
                                        show: true,
                                        clampToGround: false,
                                    },
                                });
                                AddEntityInViewer(entity_landing_line);

                                if (handler != undefined) {
                                    handler.destroy();
                                }

                                viewer._container.style.cursor = "default";//还原鼠标样式
                                if (type == 0) {
                                    document.getElementById("uav-route-add-action").style.visibility = "hidden";//隐藏航点动作
                                }
                                document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                            }
                        }
                    }
                }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
                handler.setInputAction(function (rightclik) {
                    if (handler != undefined) {
                        handler.destroy();
                    }

                    viewer._container.style.cursor = "default";//还原鼠标样式
                }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
            }
        }
    });
};
//添加避障点（模型）
function AddAvoidModel(type) {
    $("#uav-route-add-avoid").on("click", function () {
        if (current_project_tile == null) {
            layer.msg("请加载项目三维实景模型！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
        else {
            if (handler != undefined) {
                handler.destroy();
            }

            viewer._container.style.cursor = "crosshair";//修改鼠标样式

            handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
            handler.setInputAction(function (leftclick) {
                var pick = viewer.scene.pick(leftclick.position);
                if (pick != undefined) {
                    var XYZ = viewer.scene.pickPosition(leftclick.position);
                    if (XYZ != undefined) {
                        var blh = Cesium.Cartographic.fromCartesian(XYZ);
                        if (blh.height > 0) {
                            var uav_route_add_avoid = new Object;
                            uav_route_add_avoid.id = uav_route_add_avoids.length + 1;
                            uav_route_add_avoid.title = "避障点" + (uav_route_add_avoids.length + 1);
                            uav_route_add_avoid.icon = AVOIDICON;
                            uav_route_add_avoid.type = "avoid";
                            uav_route_add_avoid.spread = false;
                            var pos = new Object;
                            pos.b = Cesium.Math.toDegrees(blh.latitude);
                            pos.l = Cesium.Math.toDegrees(blh.longitude);
                            pos.h = blh.height.toFixed(4);
                            uav_route_add_avoid.blh = pos;
                            uav_route_add_avoid.xyz = XYZ;
                            uav_route_add_avoid.height = avoidheight;
                            uav_route_add_avoid.speed = routespeed;

                            uav_route_add_avoids.push(uav_route_add_avoid);
                            uav_route_add_waypoint.push(uav_route_add_avoid);
                            ExportPoint(uav_route_add_avoids);

                            //刷新航线树
                            if (type == 0) {
                                current_target_id = null;
                                for (var i in uav_route_add_waypoint) {
                                    uav_route_add_waypoint[i].spread = false;
                                }
                            }

                            current_waypoint_title = uav_route_add_avoid.title;
                            updateroutetree();

                            //添加避障点
                            var entity_avoid = new Cesium.Entity({
                                id: "AVOID_" + uav_route_add_avoid.id,
                                position: CGCS2000BLH2XYZ(uav_route_add_avoid.blh.b, uav_route_add_avoid.blh.l, blh.height + avoidheight),
                                point: {
                                    pixelSize: 10,
                                    color: Cesium.Color.DARKORANGE,
                                },
                            });
                            entities_avoid.push(entity_avoid);
                            AddEntityInViewer(entity_avoid);

                            //添加避障辅助线
                            var entity_avoid_line = new Cesium.Entity({
                                id: "AVOID_LINE_" + uav_route_add_avoid.id,
                                polyline: {
                                    positions: [XYZ, CGCS2000BLH2XYZ(uav_route_add_avoid.blh.b, uav_route_add_avoid.blh.l, blh.height + avoidheight)],
                                    width: 3,
                                    arcType: Cesium.ArcType.RHUMB,
                                    material: Cesium.Color.DARKORANGE,
                                    show: true,
                                    clampToGround: false,
                                },
                            });
                            entities_avoid_line.push(entity_avoid_line);
                            AddEntityInViewer(entity_avoid_line);

                            //添加标注
                            var entity_avoid_label = new Cesium.Entity({
                                id: "AVOID_LABEL_" + uav_route_add_avoid.id,
                                position: CGCS2000BLH2XYZ(uav_route_add_avoid.blh.b, uav_route_add_avoid.blh.l, blh.height + avoidheight),
                                label: {
                                    text: uav_route_add_avoid.title,
                                    font: '20px Times New Roman',
                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                    heightReference: Cesium.HeightReference.NONE,
                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                    pixelOffset: new Cesium.Cartesian2(0.0, -30),
                                }
                            });
                            entities_avoid_label.push(entity_avoid_label);
                            AddEntityInViewer(entity_avoid_label);

                            if (type == 0) {
                                document.getElementById("uav-route-add-action").style.visibility = "hidden";//隐藏航点动作
                            }
                            document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                        }
                    }
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            handler.setInputAction(function (rightclik) {
                if (handler != undefined) {
                    handler.destroy();
                }

                viewer._container.style.cursor = "default";//还原鼠标样式
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }
    });
};
//添加目标点（模型）
function AddTargetModel() {
    $("#uav-route-add-target").on("click", function () {
        if (current_project_tile == null) {
            layer.msg("请加载项目三维实景模型！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
        else {
            if (handler != undefined) {
                handler.destroy();
            }

            viewer._container.style.cursor = "crosshair";//修改鼠标样式

            handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
            handler.setInputAction(function (leftclick) {
                var pick = viewer.scene.pick(leftclick.position);
                if (pick != undefined) {
                    var XYZ = viewer.scene.pickPosition(leftclick.position);
                    if (XYZ != undefined) {
                        var blh = Cesium.Cartographic.fromCartesian(XYZ);
                        if (blh.height > 0) {
                            var uav_route_add_target = new Object;
                            uav_route_add_target.id = uav_route_add_targets.length + 1;
                            uav_route_add_target.title = "目标点" + (uav_route_add_targets.length + 1);
                            uav_route_add_target.icon = TARGETICON;
                            uav_route_add_target.type = "target";
                            uav_route_add_target.spread = true;
                            var pos = new Object;
                            pos.b = Cesium.Math.toDegrees(blh.latitude);
                            pos.l = Cesium.Math.toDegrees(blh.longitude);
                            pos.h = blh.height.toFixed(4);
                            uav_route_add_target.blh = pos;
                            uav_route_add_target.xyz = XYZ;
                            uav_route_add_target.height = 0;
                            uav_route_add_target.speed = routespeed;//非调整段速度
                            var adjust = new Object;
                            adjust.photodistance = photodistance;//拍照距离
                            adjust.adjustdistance = adjustdistance;//调整距离
                            adjust.adjustspeed = adjustspeed;//调整速度
                            uav_route_add_target.adjust = adjust;
                            uav_route_add_target.eye = new Cesium.Cartesian3(viewer.camera.position.x, viewer.camera.position.y, viewer.camera.position.z);//记录视点
                            var extent = new Object;
                            extent.xaxis = target_offset_x;
                            extent.yaxis = target_offset_y;
                            extent.zaxis = target_offset_z;
                            uav_route_add_target.extent = extent;

                            uav_route_add_targets.push(uav_route_add_target);
                            uav_route_add_waypoint.push(uav_route_add_target);

                            //刷新航线树
                            current_target_id = uav_route_add_target.id;
                            current_waypoint_title = uav_route_add_target.title;
                            for (var i in uav_route_add_waypoint) {

                                if (uav_route_add_waypoint[i].id == uav_route_add_target.id) {
                                    uav_route_add_waypoint[i].spread = true;;
                                }
                                else {
                                    uav_route_add_waypoint[i].spread = false;
                                }
                            }
                            updateroutetree();

                            //添加图形
                            var entity_target = new Cesium.Entity({
                                id: "TARGET_" + uav_route_add_target.id,
                                position: XYZ,
                                billboard: {
                                    image: '../../Resources/img/uav/target.png',
                                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                    heightReference: Cesium.HeightReference.NONE,
                                    width: 40,
                                    height: 40,
                                }
                            });
                            entities_target.push(entity_target);
                            AddEntityInViewer(entity_target);

                            //添加标注
                            var entity_target_label = new Cesium.Entity({
                                id: "TARGET_LABEL_" + uav_route_add_target.id,
                                position: XYZ,
                                label: {
                                    text: uav_route_add_target.title,
                                    font: '20px Times New Roman',
                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                    heightReference: Cesium.HeightReference.NONE,
                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                    pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                }
                            });
                            entities_target_label.push(entity_target_label);
                            AddEntityInViewer(entity_target_label);

                            document.getElementById("uav-route-add-action").style.visibility = "visible";//显示航点动作
                            document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                        }
                    }
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            handler.setInputAction(function (rightclik) {
                if (handler != undefined) {
                    handler.destroy();
                }

                viewer._container.style.cursor = "default";//还原鼠标样式
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }
    });
};
//添加目标点视线（模型）
function AddTargetEyeModel() {
    $("#uav-route-add-target").on("click", function () {
        if (current_project_tile == null) {
            layer.msg("请加载项目三维实景模型！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
        else {
            if (handler != undefined) {
                handler.destroy();
            }

            viewer._container.style.cursor = "crosshair";//修改鼠标样式

            handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
            handler.setInputAction(function (leftclick) {
                var pick = viewer.scene.pick(leftclick.position);
                if (pick != undefined) {
                    var XYZ = viewer.scene.pickPosition(leftclick.position);
                    if (XYZ != undefined) {
                        var blh = Cesium.Cartographic.fromCartesian(XYZ);
                        if (blh.height > 0) {
                            var uav_route_add_target = new Object;
                            uav_route_add_target.id = uav_route_add_targets.length + 1;
                            uav_route_add_target.title = "目标点" + (uav_route_add_targets.length + 1);
                            uav_route_add_target.icon = TARGETICON;
                            uav_route_add_target.type = "target";
                            uav_route_add_target.spread = true;
                            var pos = new Object;
                            pos.b = Cesium.Math.toDegrees(blh.latitude);
                            pos.l = Cesium.Math.toDegrees(blh.longitude);
                            pos.h = blh.height.toFixed(4);
                            uav_route_add_target.blh = pos;
                            uav_route_add_target.xyz = XYZ;
                            uav_route_add_target.height = 0;
                            uav_route_add_target.speed = routespeed;//非调整段速度
                            var adjust = new Object;
                            adjust.photodistance = photodistance;//拍照距离
                            adjust.adjustdistance = adjustdistance;//调整距离
                            adjust.adjustspeed = adjustspeed;//调整速度
                            adjust.level = level;//是否水平
                            uav_route_add_target.adjust = adjust;
                            uav_route_add_target.eye = new Cesium.Cartesian3(viewer.camera.position.x, viewer.camera.position.y, viewer.camera.position.z);//记录视点

                            uav_route_add_targets.push(uav_route_add_target);
                            uav_route_add_waypoint.push(uav_route_add_target);

                            //刷新航线树
                            current_target_id = uav_route_add_target.id;
                            current_waypoint_title = uav_route_add_target.title;
                            for (var i in uav_route_add_waypoint) {

                                if (uav_route_add_waypoint[i].id == uav_route_add_target.id) {
                                    uav_route_add_waypoint[i].spread = true;;
                                }
                                else {
                                    uav_route_add_waypoint[i].spread = false;
                                }
                            }
                            updateroutetree();

                            //添加图形
                            var entity_target = new Cesium.Entity({
                                id: "TARGET_" + uav_route_add_target.id,
                                position: XYZ,
                                billboard: {
                                    image: '../../Resources/img/uav/target.png',
                                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                    heightReference: Cesium.HeightReference.NONE,
                                    width: 40,
                                    height: 40,
                                }
                            });
                            entities_target.push(entity_target);
                            AddEntityInViewer(entity_target);

                            //添加标注
                            var entity_target_label = new Cesium.Entity({
                                id: "TARGET_LABEL_" + uav_route_add_target.id,
                                position: XYZ,
                                label: {
                                    text: uav_route_add_target.title,
                                    font: '20px Times New Roman',
                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                    heightReference: Cesium.HeightReference.NONE,
                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                    pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                }
                            });
                            entities_target_label.push(entity_target_label);
                            AddEntityInViewer(entity_target_label);

                            document.getElementById("uav-route-add-action").style.visibility = "visible";//显示航点动作
                            document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                        }
                    }
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            handler.setInputAction(function (rightclik) {
                if (handler != undefined) {
                    handler.destroy();
                }

                viewer._container.style.cursor = "default";//还原鼠标样式
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }
    });
};
//添加目标区域（模型）
function AddTargetAreaModel() {
    $("#uav-route-add-targetarea").on("click", function () {
        if (current_project_tile == null) {
            layer.msg("请加载项目三维实景模型！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
        else {
            if (handler != undefined) {
                handler.destroy();
            }

            viewer._container.style.cursor = "crosshair";//修改鼠标样式

            var targetarea_points = [];

            handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
            //左击
            handler.setInputAction(function (leftclick) {
                var pick = viewer.scene.pick(leftclick.position);
                if (pick != undefined) {
                    var XYZ = viewer.scene.pickPosition(leftclick.position);
                    if (XYZ != undefined) {
                        var blh = Cesium.Cartographic.fromCartesian(XYZ);
                        if (blh.height > 0) {
                            var targetarea_point = new Object;
                            targetarea_point.id = targetarea_points.length + 1;
                            var pos = new Object;
                            pos.b = Cesium.Math.toDegrees(blh.latitude);
                            pos.l = Cesium.Math.toDegrees(blh.longitude);
                            pos.h = blh.height.toFixed(4);
                            targetarea_point.blh = pos;
                            targetarea_point.xyz = XYZ;
                            targetarea_point.eye = new Cesium.Cartesian3(viewer.camera.position.x, viewer.camera.position.y, viewer.camera.position.z);//记录视点
                            targetarea_points.push(targetarea_point);

                            //添加多边形边界点
                            var entity_targetarea_point = new Cesium.Entity({
                                id: "TARGETAREA_POINT_" + targetarea_point.id,
                                position: XYZ,
                                point: {
                                    pixelSize: 10,
                                    color: Cesium.Color.YELLOW,
                                },
                            });
                            entities_targetarea_point.push(entity_targetarea_point);
                            AddEntityInViewer(entity_targetarea_point);

                            //绘制多边形边线
                            if (targetarea_points.length > 1) {
                                //var entity_targetarea_line = new Cesium.Entity({
                                //    id: "TARGETAREA_LINE_" + targetarea_points[targetarea_points.length - 2].id + "_" + targetarea_points[targetarea_points.length - 1].id,
                                //    polyline: {
                                //        positions: [targetarea_points[targetarea_points.length - 2].xyz, targetarea_points[targetarea_points.length - 1].xyz],
                                //        width: 2,
                                //        arcType: Cesium.ArcType.RHUMB,
                                //        material: Cesium.Color.AQUA,
                                //        show: true,
                                //        clampToGround: true,
                                //        classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                                //    },
                                //});

                                var entity_targetarea_line = new Cesium.Entity({
                                    id: "TARGETAREA_LINE_" + targetarea_points[targetarea_points.length - 2].id + "_" + targetarea_points[targetarea_points.length - 1].id,
                                    polyline: {
                                        positions: [targetarea_points[targetarea_points.length - 2].xyz, targetarea_points[targetarea_points.length - 1].xyz],
                                        width: 2,
                                        show: true,
                                        arcType: Cesium.ArcType.RHUMB,
                                        material: new Cesium.PolylineDashMaterialProperty({
                                            color: Cesium.Color.AQUA
                                        }),
                                        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                            color: Cesium.Color.AQUA
                                        }),
                                    },
                                });

                                entities_targetarea_line.push(entity_targetarea_line);
                                AddEntityInViewer(entity_targetarea_line);
                            }

                            document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                        }
                    }
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            //移动
            handler.setInputAction(function (move) {
                if (targetarea_points.length > 0) {
                    //清除多边形临时边线
                    RemoveEntitiesInViewer(entities_targetarea_line_temp);
                    entities_targetarea_line_temp = [];

                    var pick = viewer.scene.pick(move.endPosition);
                    if (pick != undefined) {
                        var XYZ = viewer.scene.pickPosition(move.endPosition);
                        if (XYZ != undefined) {
                            //绘制多边形临时边线
                            //var entity_targetarea_line_temp = new Cesium.Entity({
                            //    polyline: {
                            //        positions: [targetarea_points[targetarea_points.length - 1].xyz, XYZ],
                            //        width: 2,
                            //        arcType: Cesium.ArcType.RHUMB,
                            //        material: Cesium.Color.AQUA,
                            //        show: true,
                            //        clampToGround: true,
                            //        classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                            //    },
                            //});
                            var entity_targetarea_line_temp = new Cesium.Entity({
                                polyline: {
                                    positions: [targetarea_points[targetarea_points.length - 1].xyz, XYZ],
                                    width: 2,
                                    show: true,
                                    arcType: Cesium.ArcType.RHUMB,
                                    material: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.AQUA,
                                    }),
                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.AQUA,
                                    }),
                                },
                            });
                            entities_targetarea_line_temp.push(entity_targetarea_line_temp);
                            AddEntityInViewer(entity_targetarea_line_temp);

                            if (targetarea_points.length > 1) {
                                //绘制多边形临时闭合线
                                var entity_targetarea_line_temp_closure = new Cesium.Entity({
                                    polyline: {
                                        positions: [targetarea_points[0].xyz, XYZ],
                                        width: 2,
                                        show: true,
                                        arcType: Cesium.ArcType.RHUMB,
                                        material: new Cesium.PolylineDashMaterialProperty({
                                            color: Cesium.Color.AQUA,
                                        }),
                                        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                            color: Cesium.Color.AQUA,
                                        }),
                                    },
                                });
                                entities_targetarea_line_temp.push(entity_targetarea_line_temp_closure);
                                AddEntityInViewer(entity_targetarea_line_temp_closure);
                            }
                        }
                    }
                }

            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            //右击
            handler.setInputAction(function (rightclik) {
                if (handler != undefined) {
                    handler.destroy();
                }

                viewer._container.style.cursor = "default";//还原鼠标样式

                //清除临时线
                RemoveEntitiesInViewer(entities_targetarea_line_temp);
                entities_targetarea_line_temp = [];

                if (targetarea_points.length > 2) {
                    var uav_route_add_targetarea = new Object;
                    uav_route_add_targetarea.id = uav_route_add_targetareas.length + 1;
                    uav_route_add_targetarea.title = "目标区域" + (uav_route_add_targetareas.length + 1);
                    uav_route_add_targetarea.icon = TARGETAREAICON;
                    uav_route_add_targetarea.type = "targetarea";
                    uav_route_add_targetarea.spread = false;

                    var photogrammetry = new Object;//摄影测量参数
                    photogrammetry.gsd = gsd;//地面分辨率
                    photogrammetry.fo = forwardoverlap;//航向重叠度
                    photogrammetry.so = sideoverlap;//旁向重叠度
                    photogrammetry.ma = multiangle;//首末航线多角度
                    photogrammetry.dg = doublegrid;//井字形
                    photogrammetry.dm = directmodify;//方向修正
                    //MORE
                    uav_route_add_targetarea.photogrammetry = photogrammetry;

                    //几何+标志位置
                    var line = [];
                    var b_sum = 0;
                    var l_sum = 0;
                    for (var i in targetarea_points) {
                        line.push(targetarea_points[i].xyz);
                        b_sum += targetarea_points[i].blh.b;
                        l_sum += targetarea_points[i].blh.l;
                    }
                    line.push(targetarea_points[0].xyz);
                    uav_route_add_targetarea.line = line;
                    uav_route_add_targetarea.labelpos = new Cesium.Cartesian3.fromDegrees(l_sum / targetarea_points.length, b_sum / targetarea_points.length, viewer.scene.sampleHeight(new Cesium.Cartographic.fromDegrees(l_sum / targetarea_points.length, b_sum / targetarea_points.length)));

                    uav_route_add_targetarea.polygon = targetarea_points;//目标区域多边形边界点

                    uav_route_add_targetareas.push(uav_route_add_targetarea);
                    uav_route_add_waypoint.push(uav_route_add_targetarea);

                    current_waypoint_title = uav_route_add_targetarea.title;
                    updateroutetree();//刷新航线树

                    //绘制闭合线（至少3个点）
                    var entity_targetarea = new Cesium.Entity({
                        id: "TARGETAREA_" + uav_route_add_targetarea.id,
                        polyline: {
                            positions: line,
                            width: 2,
                            show: true,
                            arcType: Cesium.ArcType.RHUMB,
                            material: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.AQUA
                            }),
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.AQUA
                            }),
                        },
                    });
                    entities_targetarea.push(entity_targetarea);
                    AddEntityInViewer(entity_targetarea);

                    //绘制面标注
                    var entity_targetarea_label = new Cesium.Entity({
                        id: "TARGETAREA_LABEL_" + uav_route_add_targetarea.id,
                        position: uav_route_add_targetarea.labelpos,
                        label: {
                            text: uav_route_add_targetarea.title,
                            font: '20px Times New Roman',
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            heightReference: Cesium.HeightReference.NONE,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            pixelOffset: new Cesium.Cartesian2(0.0, -30),
                        }
                    });
                    entities_targetarea_label.push(entity_targetarea_label);
                    AddEntityInViewer(entity_targetarea_label);
                }
                else {
                    layer.msg("请重新绘制，至少3个点！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                }

                //清除多边形边界点和边线
                targetarea_points = [];
                RemoveEntitiesInViewer(entities_targetarea_point);
                entities_targetarea_point = [];
                RemoveEntitiesInViewer(entities_targetarea_line);
                entities_targetarea_line = [];
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }
    });

};

//添加起飞点（地形）
function AddTakeOffTerrain() {
    $("#uav-route-add-takeoff").on("click", function () {
        if (uav_route_add_takeoff != null) {
            layer.msg("起飞点已存在，请编辑起飞点！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
        else {
            if (handler != undefined) {
                handler.destroy();
            }

            viewer._container.style.cursor = "crosshair";//修改鼠标样式

            handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
            handler.setInputAction(function (leftclick) {
                var pick = viewer.scene.pickPosition(leftclick.position);
                if (pick != undefined) {
                    var XYZ = viewer.scene.pickPosition(leftclick.position);
                    if (XYZ != undefined) {
                        var blh = Cesium.Cartographic.fromCartesian(XYZ);
                        if (blh.height > 0) {
                            uav_route_add_takeoff = new Object;
                            uav_route_add_takeoff.id = 0;
                            uav_route_add_takeoff.title = "起飞点";
                            uav_route_add_takeoff.icon = TAKEOFFICON;
                            uav_route_add_takeoff.type = "takeoff";
                            uav_route_add_takeoff.spread = false;
                            var pos = new Object;
                            pos.b = Cesium.Math.toDegrees(blh.latitude);
                            pos.l = Cesium.Math.toDegrees(blh.longitude);
                            pos.h = blh.height.toFixed(4);
                            uav_route_add_takeoff.blh = pos;
                            uav_route_add_takeoff.xyz = XYZ;
                            uav_route_add_takeoff.height = takeoffheight;
                            uav_route_add_takeoff.speed = routespeed;

                            //刷新航线树
                            current_waypoint_title = uav_route_add_takeoff.title;
                            updateroutetree();

                            //添加起飞点
                            entity_takeoff = new Cesium.Entity({
                                id: "TAKEOFF",
                                position: XYZ,
                                billboard: {
                                    image: '../../Resources/img/uav/takeoff.png',
                                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                    heightReference: Cesium.HeightReference.NONE,
                                    width: 40,
                                    height: 40,
                                }
                            });
                            AddEntityInViewer(entity_takeoff);
                            //添加上升线
                            entity_takeoff_line = new Cesium.Entity({
                                id: "TAKEOFF_LINE",
                                polyline: {
                                    positions: [XYZ, CGCS2000BLH2XYZ(uav_route_add_takeoff.blh.b, uav_route_add_takeoff.blh.l, blh.height + takeoffheight)],
                                    width: 3,
                                    arcType: Cesium.ArcType.RHUMB,
                                    material: Cesium.Color.DARKORANGE,
                                    show: true,
                                    clampToGround: false,
                                },
                            });
                            AddEntityInViewer(entity_takeoff_line);

                            if (handler != undefined) {
                                handler.destroy();
                            }

                            viewer._container.style.cursor = "default";//还原鼠标样式
                            document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                        }
                    }
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            handler.setInputAction(function (rightclik) {
                if (handler != undefined) {
                    handler.destroy();
                }

                viewer._container.style.cursor = "default";//还原鼠标样式
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }
    });
};
//添加降落点（地形）
function AddLandingTerrain() {
    $("#uav-route-add-landing").on("click", function () {
        if (uav_route_add_landing != null) {
            layer.msg("降落点已存在，请编辑降落点！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
        else {
            if (handler != undefined) {
                handler.destroy();
            }

            viewer._container.style.cursor = "crosshair";//修改鼠标样式

            handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
            handler.setInputAction(function (leftclick) {
                var pick = viewer.scene.pickPosition(leftclick.position);
                if (pick != undefined) {
                    var XYZ = viewer.scene.pickPosition(leftclick.position);
                    if (XYZ != undefined) {
                        var blh = Cesium.Cartographic.fromCartesian(XYZ);
                        if (blh.height > 0) {
                            uav_route_add_landing = new Object;
                            uav_route_add_landing.id = 9999;
                            uav_route_add_landing.title = "降落点";
                            uav_route_add_landing.icon = LANDINGICON;
                            uav_route_add_landing.type = "landing";
                            uav_route_add_landing.spread = false;
                            var pos = new Object;
                            pos.b = Cesium.Math.toDegrees(blh.latitude);
                            pos.l = Cesium.Math.toDegrees(blh.longitude);
                            pos.h = blh.height.toFixed(4);
                            uav_route_add_landing.blh = pos;
                            uav_route_add_landing.xyz = XYZ;
                            uav_route_add_landing.height = landingheight;
                            uav_route_add_landing.speed = 0;

                            //刷新航线树
                            current_waypoint_title = uav_route_add_landing.title;
                            updateroutetree();

                            //添加降落点
                            entity_landing = new Cesium.Entity({
                                id: "LANDING",
                                position: XYZ,
                                billboard: {
                                    image: '../../Resources/img/uav/landing.png',
                                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                    heightReference: Cesium.HeightReference.NONE,
                                    width: 40,
                                    height: 40,
                                }
                            });
                            AddEntityInViewer(entity_landing);
                            //添加降落线
                            entity_landing_line = new Cesium.Entity({
                                id: "LANDING_LINE",
                                polyline: {
                                    positions: [CGCS2000BLH2XYZ(uav_route_add_landing.blh.b, uav_route_add_landing.blh.l, blh.height + landingheight), XYZ],
                                    width: 3,
                                    arcType: Cesium.ArcType.RHUMB,
                                    material: Cesium.Color.DARKORANGE,
                                    show: true,
                                    clampToGround: false,
                                },
                            });
                            AddEntityInViewer(entity_landing_line);

                            if (handler != undefined) {
                                handler.destroy();
                            }

                            viewer._container.style.cursor = "default";//还原鼠标样式
                            document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                        }
                    }
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            handler.setInputAction(function (rightclik) {
                if (handler != undefined) {
                    handler.destroy();
                }

                viewer._container.style.cursor = "default";//还原鼠标样式
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }
    });
};
//添加避障点（地形）
function AddAvoidTerrain() {
    $("#uav-route-add-avoid").on("click", function () {
        if (handler != undefined) {
            handler.destroy();
        }

        viewer._container.style.cursor = "crosshair";//修改鼠标样式

        handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(function (leftclick) {
            var pick = viewer.scene.pickPosition(leftclick.position);
            if (pick != undefined) {
                var XYZ = viewer.scene.pickPosition(leftclick.position);
                if (XYZ != undefined) {
                    var blh = Cesium.Cartographic.fromCartesian(XYZ);
                    if (blh.height > 0) {
                        var uav_route_add_avoid = new Object;
                        uav_route_add_avoid.id = uav_route_add_avoids.length + 1;
                        uav_route_add_avoid.title = "避障点" + (uav_route_add_avoids.length + 1);
                        uav_route_add_avoid.icon = AVOIDICON;
                        uav_route_add_avoid.type = "avoid";
                        uav_route_add_avoid.spread = false;
                        var pos = new Object;
                        pos.b = Cesium.Math.toDegrees(blh.latitude);
                        pos.l = Cesium.Math.toDegrees(blh.longitude);
                        pos.h = blh.height.toFixed(4);
                        uav_route_add_avoid.blh = pos;
                        uav_route_add_avoid.xyz = XYZ;
                        uav_route_add_avoid.height = avoidheight;
                        uav_route_add_avoid.speed = routespeed;

                        uav_route_add_avoids.push(uav_route_add_avoid);
                        uav_route_add_waypoint.push(uav_route_add_avoid);

                        ExportPoint(uav_route_add_avoids);

                        //刷新航线树
                        current_waypoint_title = uav_route_add_avoid.title;
                        updateroutetree();

                        //添加避障点
                        var entity_avoid = new Cesium.Entity({
                            id: "AVOID_" + uav_route_add_avoid.id,
                            position: CGCS2000BLH2XYZ(uav_route_add_avoid.blh.b, uav_route_add_avoid.blh.l, blh.height + avoidheight),
                            point: {
                                pixelSize: 10,
                                color: Cesium.Color.DARKORANGE,
                            },
                        });
                        entities_avoid.push(entity_avoid);
                        AddEntityInViewer(entity_avoid);

                        //添加避障辅助线
                        var entity_avoid_line = new Cesium.Entity({
                            id: "AVOID_LINE_" + uav_route_add_avoid.id,
                            polyline: {
                                positions: [XYZ, CGCS2000BLH2XYZ(uav_route_add_avoid.blh.b, uav_route_add_avoid.blh.l, blh.height + avoidheight)],
                                width: 3,
                                arcType: Cesium.ArcType.RHUMB,
                                material: Cesium.Color.DARKORANGE,
                                show: true,
                                clampToGround: false,
                            },
                        });
                        entities_avoid_line.push(entity_avoid_line);
                        AddEntityInViewer(entity_avoid_line);

                        //添加标注
                        var entity_avoid_label = new Cesium.Entity({
                            id: "AVOID_LABEL_" + uav_route_add_avoid.id,
                            position: CGCS2000BLH2XYZ(uav_route_add_avoid.blh.b, uav_route_add_avoid.blh.l, blh.height + avoidheight),
                            label: {
                                text: uav_route_add_avoid.title,
                                font: '20px Times New Roman',
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                heightReference: Cesium.HeightReference.NONE,
                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                pixelOffset: new Cesium.Cartesian2(0.0, -30),
                            }
                        });
                        entities_avoid_label.push(entity_avoid_label);
                        AddEntityInViewer(entity_avoid_label);

                        document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                    }
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.setInputAction(function (rightclik) {
            if (handler != undefined) {
                handler.destroy();
            }

            viewer._container.style.cursor = "default";//还原鼠标样式
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    });
};
//添加目标区域（地形）
function AddTargetAreaTerrain() {
    $("#uav-route-add-targetarea").on("click", function () {
        if (handler != undefined) {
            handler.destroy();
        }

        viewer._container.style.cursor = "crosshair";//修改鼠标样式

        var targetarea_points = [];

        handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        //左击
        handler.setInputAction(function (leftclick) {
            var pick = viewer.scene.pickPosition(leftclick.position);
            if (pick != undefined) {
                var XYZ = viewer.scene.pickPosition(leftclick.position);
                if (XYZ != undefined) {
                    var blh = Cesium.Cartographic.fromCartesian(XYZ);
                    if (blh.height > 0) {
                        var targetarea_point = new Object;
                        targetarea_point.id = targetarea_points.length + 1;
                        var pos = new Object;
                        pos.b = Cesium.Math.toDegrees(blh.latitude);
                        pos.l = Cesium.Math.toDegrees(blh.longitude);
                        pos.h = blh.height.toFixed(4);
                        targetarea_point.blh = pos;
                        targetarea_point.xyz = XYZ;
                        targetarea_point.eye = new Cesium.Cartesian3(viewer.camera.position.x, viewer.camera.position.y, viewer.camera.position.z);//记录视点
                        targetarea_points.push(targetarea_point);

                        //添加多边形边界点
                        var entity_targetarea_point = new Cesium.Entity({
                            id: "TARGETAREA_POINT_" + targetarea_point.id,
                            position: XYZ,
                            point: {
                                pixelSize: 10,
                                color: Cesium.Color.YELLOW,
                            },
                        });
                        entities_targetarea_point.push(entity_targetarea_point);
                        AddEntityInViewer(entity_targetarea_point);

                        //绘制多边形边线
                        if (targetarea_points.length > 1) {
                            //var entity_targetarea_line = new Cesium.Entity({
                            //    id: "TARGETAREA_LINE_" + targetarea_points[targetarea_points.length - 2].id + "_" + targetarea_points[targetarea_points.length - 1].id,
                            //    polyline: {
                            //        positions: [targetarea_points[targetarea_points.length - 2].xyz, targetarea_points[targetarea_points.length - 1].xyz],
                            //        width: 2,
                            //        arcType: Cesium.ArcType.RHUMB,
                            //        material: Cesium.Color.AQUA,
                            //        show: true,
                            //        clampToGround: true,
                            //        classificationType: Cesium.ClassificationType.TERRAIN,
                            //    },
                            //});
                            var entity_targetarea_line = new Cesium.Entity({
                                id: "TARGETAREA_LINE_" + targetarea_points[targetarea_points.length - 2].id + "_" + targetarea_points[targetarea_points.length - 1].id,
                                polyline: {
                                    positions: [targetarea_points[targetarea_points.length - 2].xyz, targetarea_points[targetarea_points.length - 1].xyz],
                                    width: 2,
                                    show: true,
                                    arcType: Cesium.ArcType.RHUMB,
                                    material: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.AQUA
                                    }),
                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.AQUA
                                    }),
                                },
                            });
                            entities_targetarea_line.push(entity_targetarea_line);
                            AddEntityInViewer(entity_targetarea_line);
                        }

                        document.getElementById("uav-route-add-waypointpara").innerHTML = '';
                    }
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        //移动
        handler.setInputAction(function (move) {
            if (targetarea_points.length > 0) {
                //清除多边形临时边线
                RemoveEntitiesInViewer(entities_targetarea_line_temp);
                entities_targetarea_line_temp = [];

                var pick = viewer.scene.pickPosition(move.endPosition);
                if (pick != undefined) {
                    var XYZ = viewer.scene.pickPosition(move.endPosition);
                    if (XYZ != undefined) {
                        //绘制多边形临时边线
                        //var entity_targetarea_line_temp = new Cesium.Entity({
                        //    polyline: {
                        //        positions: [targetarea_points[targetarea_points.length - 1].xyz, XYZ],
                        //        width: 2,
                        //        arcType: Cesium.ArcType.RHUMB,
                        //        material: Cesium.Color.AQUA,
                        //        show: true,
                        //        clampToGround: true,
                        //        classificationType: Cesium.ClassificationType.TERRAIN,
                        //    },
                        //});
                        var entity_targetarea_line_temp = new Cesium.Entity({
                            polyline: {
                                positions: [targetarea_points[targetarea_points.length - 1].xyz, XYZ],
                                width: 2,
                                show: true,
                                arcType: Cesium.ArcType.RHUMB,
                                material: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.AQUA
                                }),
                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.AQUA
                                }),
                            },
                        });
                        entities_targetarea_line_temp.push(entity_targetarea_line_temp);
                        AddEntityInViewer(entity_targetarea_line_temp);

                        if (targetarea_points.length > 1) {
                            //绘制多边形临时闭合线
                            //var entity_targetarea_line_temp_closure = new Cesium.Entity({
                            //    polyline: {
                            //        positions: [targetarea_points[0].xyz, XYZ],
                            //        width: 2,
                            //        arcType: Cesium.ArcType.RHUMB,
                            //        material: Cesium.Color.AQUA,
                            //        show: true,
                            //        clampToGround: true,
                            //        classificationType: Cesium.ClassificationType.TERRAIN,
                            //    },
                            //});
                            var entity_targetarea_line_temp_closure = new Cesium.Entity({
                                polyline: {
                                    positions: [targetarea_points[0].xyz, XYZ],
                                    width: 2,
                                    show: true,
                                    arcType: Cesium.ArcType.RHUMB,
                                    material: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.AQUA
                                    }),
                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.AQUA
                                    }),
                                },
                            });
                            entities_targetarea_line_temp.push(entity_targetarea_line_temp_closure);
                            AddEntityInViewer(entity_targetarea_line_temp_closure);
                        }
                    }
                }
            }

        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        //右击
        handler.setInputAction(function (rightclik) {
            if (handler != undefined) {
                handler.destroy();
            }

            viewer._container.style.cursor = "default";//还原鼠标样式

            //清除临时线
            RemoveEntitiesInViewer(entities_targetarea_line_temp);
            entities_targetarea_line_temp = [];

            if (targetarea_points.length > 2) {
                var uav_route_add_targetarea = new Object;
                uav_route_add_targetarea.id = uav_route_add_targetareas.length + 1;
                uav_route_add_targetarea.title = "目标区域" + (uav_route_add_targetareas.length + 1);
                uav_route_add_targetarea.icon = TARGETAREAICON;
                uav_route_add_targetarea.type = "targetarea";
                uav_route_add_targetarea.spread = false;

                var photogrammetry = new Object;//摄影测量参数
                photogrammetry.gsd = gsd;//地面分辨率
                photogrammetry.fo = forwardoverlap;//航向重叠度
                photogrammetry.so = sideoverlap;//旁向重叠度
                photogrammetry.ma = multiangle;//首末航线多角度
                photogrammetry.dg = doublegrid;//井字形
                photogrammetry.dm = directmodify;//方向修正
                //MORE
                uav_route_add_targetarea.photogrammetry = photogrammetry;

                //几何+标志位置
                var line = [];
                var b_sum = 0;
                var l_sum = 0;
                for (var i in targetarea_points) {
                    line.push(targetarea_points[i].xyz);
                    b_sum += targetarea_points[i].blh.b;
                    l_sum += targetarea_points[i].blh.l;
                }
                line.push(targetarea_points[0].xyz);
                uav_route_add_targetarea.line = line;
                uav_route_add_targetarea.labelpos = new Cesium.Cartesian3.fromDegrees(l_sum / targetarea_points.length, b_sum / targetarea_points.length, viewer.scene.sampleHeight(new Cesium.Cartographic.fromDegrees(l_sum / targetarea_points.length, b_sum / targetarea_points.length)));

                uav_route_add_targetarea.polygon = targetarea_points;//目标区域多边形边界点

                uav_route_add_targetareas.push(uav_route_add_targetarea);
                uav_route_add_waypoint.push(uav_route_add_targetarea);

                current_waypoint_title = uav_route_add_targetarea.title;
                updateroutetree();//刷新航线树

                //绘制闭合线（至少3个点）
                //var entity_targetarea = new Cesium.Entity({
                //    id: "TARGETAREA_" + uav_route_add_targetarea.id,
                //    polyline: {
                //        positions: line,
                //        width: 2,
                //        arcType: Cesium.ArcType.RHUMB,
                //        material: Cesium.Color.AQUA,
                //        show: true,
                //        clampToGround: true,
                //        classificationType: Cesium.ClassificationType.TERRAIN,
                //    },
                //});
                var entity_targetarea = new Cesium.Entity({
                    id: "TARGETAREA_" + uav_route_add_targetarea.id,
                    polyline: {
                        positions: line,
                        width: 2,
                        show: true,
                        arcType: Cesium.ArcType.RHUMB,
                        material: new Cesium.PolylineDashMaterialProperty({
                            color: Cesium.Color.AQUA
                        }),
                        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                            color: Cesium.Color.AQUA
                        }),
                    },
                });
                entities_targetarea.push(entity_targetarea);
                AddEntityInViewer(entity_targetarea);

                //绘制面标注
                var entity_targetarea_label = new Cesium.Entity({
                    id: "TARGETAREA_LABEL_" + uav_route_add_targetarea.id,
                    position: uav_route_add_targetarea.labelpos,
                    label: {
                        text: uav_route_add_targetarea.title,
                        font: '20px Times New Roman',
                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        heightReference: Cesium.HeightReference.NONE,
                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                        pixelOffset: new Cesium.Cartesian2(0.0, -30),
                    }
                });
                entities_targetarea_label.push(entity_targetarea_label);
                AddEntityInViewer(entity_targetarea_label);
            }
            else {
                layer.msg("请重新绘制，至少3个点！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }

            //清除多边形边界点和边线
            targetarea_points = [];
            RemoveEntitiesInViewer(entities_targetarea_point);
            entities_targetarea_point = [];
            RemoveEntitiesInViewer(entities_targetarea_line);
            entities_targetarea_line = [];
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    });
};

//查看起飞点
function ViewTakoff(obj) {
    document.getElementById("uav-route-add-waypointpara").innerHTML = '<!--起飞点属性(查看)--><div style="margin-top:5px;padding-right:5px;"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">经&emsp;&emsp;度°</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-takeoff-jd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">纬&emsp;&emsp;度°</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-takeoff-wd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">高&emsp;&emsp;程m</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-takeoff-gc" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">起飞高度m</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-takeoff-gd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">速&emsp;&emsp;度m/s</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-takeoff-sd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div>';
    form.val("uav-route-add", {
        "uav-route-add-takeoff-jd": obj.data.blh.l.toFixed(8)
        , "uav-route-add-takeoff-wd": obj.data.blh.b.toFixed(8)
        , "uav-route-add-takeoff-gc": obj.data.blh.h
        , "uav-route-add-takeoff-gd": obj.data.height
        , "uav-route-add-takeoff-sd": obj.data.speed
    });
};
//查看降落点
function ViewLanding(obj) {
    document.getElementById("uav-route-add-waypointpara").innerHTML = '<!--降落点属性(查看)--><div style="margin-top:5px;padding-right:5px;"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">经&emsp;&emsp;度°</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-landing-jd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">纬&emsp;&emsp;度°</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-landing-wd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">高&emsp;&emsp;程m</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-landing-gc" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">降落高度m</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-landing-gd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div>';
    form.val("uav-route-add", {
        "uav-route-add-landing-jd": obj.data.blh.l.toFixed(8)
        , "uav-route-add-landing-wd": obj.data.blh.b.toFixed(8)
        , "uav-route-add-landing-gc": obj.data.blh.h
        , "uav-route-add-landing-gd": obj.data.height
    });
};
//查看避障点
function ViewAvoid(obj) {
    document.getElementById("uav-route-add-waypointpara").innerHTML = '<!--避障点属性(查看)--><div style="margin-top:5px;padding-right:5px;"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">经&emsp;&emsp;度°</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-avoid-jd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">纬&emsp;&emsp;度°</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-avoid-wd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">高&emsp;&emsp;程m</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-avoid-gc" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">避障高度m</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-avoid-gd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">速&emsp;&emsp;度m/s</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-avoid-sd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div>';
    form.val("uav-route-add", {
        "uav-route-add-avoid-jd": obj.data.blh.l.toFixed(8)
        , "uav-route-add-avoid-wd": obj.data.blh.b.toFixed(8)
        , "uav-route-add-avoid-gc": obj.data.blh.h
        , "uav-route-add-avoid-gd": obj.data.height
        , "uav-route-add-avoid-sd": obj.data.speed
    });
};
//查看目标点
function ViewTarget(obj) {
    document.getElementById("uav-route-add-waypointpara").innerHTML = '<!--目标点属性(查看)--><div style="margin-top:5px;padding-right:5px;"><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">经&emsp;&emsp;度°</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-jd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">纬&emsp;&emsp;度°</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-target-wd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">高&emsp;&emsp;程m</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-gc" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">拍照距离m</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-target-pd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">调整距离m</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-ad" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">速&emsp;&emsp;度m/s</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-target-sd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">调整速度m/s</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-as" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">X轴范围m</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-target-xoffset" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">Y轴范围m</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-yoffset" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">Z轴范围m</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-target-zoffset" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div></div></div>';
    form.val("uav-route-add", {
        "uav-route-add-target-jd": obj.data.blh.l.toFixed(8)
        , "uav-route-add-target-wd": obj.data.blh.b.toFixed(8)
        , "uav-route-add-target-gc": obj.data.blh.h
        , "uav-route-add-target-pd": obj.data.adjust.photodistance
        , "uav-route-add-target-ad": obj.data.adjust.adjustdistance
        , "uav-route-add-target-sd": obj.data.speed
        , "uav-route-add-target-as": obj.data.adjust.adjustspeed
        , "uav-route-add-target-xoffset": obj.data.extent.xaxis
        , "uav-route-add-target-yoffset": obj.data.extent.yaxis
        , "uav-route-add-target-zoffset": obj.data.extent.zaxis
    });
};
//查看目标点（视线）
function ViewTargetE(obj) {
    document.getElementById("uav-route-add-waypointpara").innerHTML = '<!--目标点（视线）属性(查看)--><div style="margin-top:5px;padding-right:5px;"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">经&emsp;&emsp;度°</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-target-jd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">纬&emsp;&emsp;度°</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-target-wd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">高&emsp;&emsp;程m</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-target-gc" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">拍照距离m</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-target-pd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">调整距离m</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-target-ad" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">速&emsp;&emsp;度m/s</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-target-sd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">调整速度m/s</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-target-as" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">是否水平</label><div class="layui-input-block" style="margin-left:90px;"><input type="checkbox" name="uav-route-add-target-level" lay-skin="switch" lay-text="开启|关闭" disabled="disabled"></div></div></div>';
    form.val("uav-route-add", {
        "uav-route-add-target-jd": obj.data.blh.l.toFixed(8)
        , "uav-route-add-target-wd": obj.data.blh.b.toFixed(8)
        , "uav-route-add-target-gc": obj.data.blh.h
        , "uav-route-add-target-pd": obj.data.adjust.photodistance
        , "uav-route-add-target-ad": obj.data.adjust.adjustdistance
        , "uav-route-add-target-sd": obj.data.speed
        , "uav-route-add-target-as": obj.data.adjust.adjustspeed
        , "uav-route-add-target-level": obj.data.adjust.level
    });
};
//查看目标区域
function ViewTargetArea(obj) {
    document.getElementById("uav-route-add-waypointpara").innerHTML = '<!--目标区域属性(查看)--><div style="margin-top:5px;padding-right:5px;"><div class="layui-form-item"><label class="layui-form-label" style="width:150px;text-align:left;padding-left:5px;padding-right:5px;">GSD地面分辨率cm</label><div class="layui-input-block" style="margin-left:160px;"><input type="text" name="uav-route-add-targetarea-gsd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:150px;text-align:left;padding-left:5px;padding-right:5px;">航向重叠度%</label><div class="layui-input-block" style="margin-left:160px;"><input type="text" name="uav-route-add-targetarea-fo" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:150px;text-align:left;padding-left:5px;padding-right:5px;">旁向重叠度%</label><div class="layui-input-block" style="margin-left:160px;"><input type="text" name="uav-route-add-targetarea-so" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:150px;text-align:left;padding-left:5px;padding-right:5px;">首末航线多角度</label><div class="layui-input-block" style="margin-left:160px;"><input type="checkbox" name="uav-route-add-targetarea-ma" lay-skin="switch" lay-text="开启|关闭" disabled="disabled"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:150px;text-align:left;padding-left:5px;padding-right:5px;">网格井字形</label><div class="layui-input-block" style="margin-left:160px;"><input type="checkbox" name="uav-route-add-targetarea-dg" lay-skin="switch" lay-text="开启|关闭" disabled="disabled"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:150px;text-align:left;padding-left:5px;padding-right:5px;">方向修正</label><div class="layui-input-block" style="margin-left:160px;"><input type="checkbox" name="uav-route-add-targetarea-dm" lay-skin="switch" lay-text="开启|关闭" disabled="disabled"></div></div></div>';
    form.val("uav-route-add", {
        "uav-route-add-targetarea-gsd": obj.data.photogrammetry.gsd
        , "uav-route-add-targetarea-fo": obj.data.photogrammetry.fo
        , "uav-route-add-targetarea-so": obj.data.photogrammetry.so
        , "uav-route-add-targetarea-ma": obj.data.photogrammetry.ma
        , "uav-route-add-targetarea-dg": obj.data.photogrammetry.dg
        , "uav-route-add-targetarea-dm": obj.data.photogrammetry.dm
    });
};

//编辑起飞点
function EditTakeoff(obj) {
    document.getElementById("uav-route-add-waypointpara").innerHTML = '<!--起飞点属性(编辑)--><div style="margin-top:5px;padding-right:5px;"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">经&emsp;&emsp;度°</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-takeoff-jd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">纬&emsp;&emsp;度°</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-takeoff-wd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">高&emsp;&emsp;程m</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-takeoff-gc" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">起飞高度m</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-takeoff-gd" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">速&emsp;&emsp;度m/s</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-takeoff-sd" autocomplete="off" class="layui-input" /></div></div></div><div class="layui-form-item"><div style="margin-top:5px;"><button type="button" id="uav-route-add-save" class="layui-btn layui-btn-primary layui-btn-sm" style="width:96%;margin-left:2%;margin-right:2%;">修改</button></div></div>';
    //赋值
    form.val("uav-route-add", {
        "uav-route-add-takeoff-jd": obj.data.blh.l.toFixed(8)
        , "uav-route-add-takeoff-wd": obj.data.blh.b.toFixed(8)
        , "uav-route-add-takeoff-gc": obj.data.blh.h
        , "uav-route-add-takeoff-gd": obj.data.height
        , "uav-route-add-takeoff-sd": obj.data.speed
    });

    //更新
    $("#uav-route-add-save").on("click", function () {
        uav_route_add_takeoff.height = form.val("uav-route-add")["uav-route-add-takeoff-gd"];
        uav_route_add_takeoff.speed = form.val("uav-route-add")["uav-route-add-takeoff-sd"];

        //刷新航线树
        updateroutetree();

        //修改上升线
        entity_takeoff_line.polyline.positions = [uav_route_add_takeoff.xyz, CGCS2000BLH2XYZ(uav_route_add_takeoff.blh.b, uav_route_add_takeoff.blh.l, parseFloat(uav_route_add_takeoff.blh.h) + parseFloat(uav_route_add_takeoff.height))];

        layer.msg("修改成功！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
    });

};
//编辑降落点
function EditLanding(obj) {
    document.getElementById("uav-route-add-waypointpara").innerHTML = '<!--降落点属性(编辑)--><div style="margin-top:5px;padding-right:5px;"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">经&emsp;&emsp;度°</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-landing-jd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">纬&emsp;&emsp;度°</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-landing-wd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">高&emsp;&emsp;程m</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-landing-gc" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">降落高度m</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-landing-gd" autocomplete="off" class="layui-input" /></div></div></div><div class="layui-form-item"><div style="margin-top:5px;"><button type="button" id="uav-route-add-save" class="layui-btn layui-btn-primary layui-btn-sm" style="width:96%;margin-left:2%;margin-right:2%;">保存</button></div></div>';
    form.val("uav-route-add", {
        "uav-route-add-landing-jd": obj.data.blh.l.toFixed(8)
        , "uav-route-add-landing-wd": obj.data.blh.b.toFixed(8)
        , "uav-route-add-landing-gc": obj.data.blh.h
        , "uav-route-add-landing-gd": obj.data.height
    });

    $("#uav-route-add-save").on("click", function () {
        uav_route_add_landing.height = form.val("uav-route-add")["uav-route-add-landing-gd"];

        //刷新航线树
        updateroutetree();

        //修改降落线
        entity_landing_line.polyline.positions = [CGCS2000BLH2XYZ(uav_route_add_landing.blh.b, uav_route_add_landing.blh.l, parseFloat(uav_route_add_landing.blh.h) + parseFloat(uav_route_add_landing.height)), uav_route_add_landing.xyz];

        layer.msg("修改成功！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
    });
};
//编辑避障点
function EditAvoid(obj) {
    document.getElementById("uav-route-add-waypointpara").innerHTML = '<!--避障点属性(编辑)--><div style="margin-top:5px;padding-right:5px;"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">经&emsp;&emsp;度°</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-avoid-jd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">纬&emsp;&emsp;度°</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-avoid-wd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">高&emsp;&emsp;程m</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-avoid-gc" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">避障高度m</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-avoid-gd" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">速&emsp;&emsp;度m/s</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-avoid-sd" autocomplete="off" class="layui-input" /></div></div></div><div class="layui-form-item"><div style="margin-top:5px;"><button type="button" id="uav-route-add-save" class="layui-btn layui-btn-primary layui-btn-sm" style="width:96%;margin-left:2%;margin-right:2%;">修改</button></div></div>';
    form.val("uav-route-add", {
        "uav-route-add-avoid-jd": obj.data.blh.l.toFixed(8)
        , "uav-route-add-avoid-wd": obj.data.blh.b.toFixed(8)
        , "uav-route-add-avoid-gc": obj.data.blh.h
        , "uav-route-add-avoid-gd": obj.data.height
        , "uav-route-add-avoid-sd": obj.data.speed
    });

    $("#uav-route-add-save").on("click", function () {
        for (var i in uav_route_add_waypoint) {
            if (uav_route_add_waypoint[i].id == obj.data.id && uav_route_add_waypoint[i].type == "avoid") {
                uav_route_add_waypoint[i].height = form.val("uav-route-add")["uav-route-add-avoid-gd"];
                uav_route_add_waypoint[i].speed = form.val("uav-route-add")["uav-route-add-avoid-sd"];
                break;
            }
        }

        //刷新航线树
        updateroutetree();

        ExportPoint(uav_route_add_avoids);

        //清除全部避障几何
        RemoveEntitiesInViewer(entities_avoid);
        RemoveEntitiesInViewer(entities_avoid_label);
        RemoveEntitiesInViewer(entities_avoid_line);
        entities_avoid = [];
        entities_avoid_label = [];
        entities_avoid_line = [];

        //重新添加避障几何
        for (var i in uav_route_add_waypoint) {
            if (uav_route_add_waypoint[i].type == "avoid") {
                //添加避障点
                var entity_avoid = new Cesium.Entity({
                    id: "AVOID_" + uav_route_add_waypoint[i].id,
                    position: CGCS2000BLH2XYZ(parseFloat(uav_route_add_waypoint[i].blh.b), parseFloat(uav_route_add_waypoint[i].blh.l), parseFloat(uav_route_add_waypoint[i].blh.h) + parseFloat(uav_route_add_waypoint[i].height)),
                    point: {
                        pixelSize: 10,
                        color: Cesium.Color.DARKORANGE,
                    },
                });
                entities_avoid.push(entity_avoid);
                AddEntityInViewer(entity_avoid);

                //添加避障辅助线
                var entity_avoid_line = new Cesium.Entity({
                    id: "AVOID_LINE_" + uav_route_add_waypoint[i].id,
                    polyline: {
                        positions: [uav_route_add_waypoint[i].xyz, CGCS2000BLH2XYZ(parseFloat(uav_route_add_waypoint[i].blh.b), parseFloat(uav_route_add_waypoint[i].blh.l), parseFloat(uav_route_add_waypoint[i].blh.h) + parseFloat(uav_route_add_waypoint[i].height))],
                        width: 3,
                        arcType: Cesium.ArcType.RHUMB,
                        material: Cesium.Color.DARKORANGE,
                        show: true,
                        clampToGround: false,
                    },
                });
                entities_avoid_line.push(entity_avoid_line);
                AddEntityInViewer(entity_avoid_line);

                //添加标注
                var entity_avoid_label = new Cesium.Entity({
                    id: "AVOID_LABEL_" + uav_route_add_waypoint[i].id,
                    position: CGCS2000BLH2XYZ(parseFloat(uav_route_add_waypoint[i].blh.b), parseFloat(uav_route_add_waypoint[i].blh.l), parseFloat(uav_route_add_waypoint[i].blh.h) + parseFloat(uav_route_add_waypoint[i].height)),
                    label: {
                        text: uav_route_add_waypoint[i].title,
                        font: '20px Times New Roman',
                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        heightReference: Cesium.HeightReference.NONE,
                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                        pixelOffset: new Cesium.Cartesian2(0.0, -30),
                    }
                });
                entities_avoid_label.push(entity_avoid_label);
                AddEntityInViewer(entity_avoid_label);
            }
        }

        layer.msg("修改成功！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
    });
};
//编辑目标点
function EditTarget(obj) {
    document.getElementById("uav-route-add-waypointpara").innerHTML = '<!--目标点属性(编辑)--><div style="margin-top:5px;padding-right:5px;"><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">经&emsp;&emsp;度°</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-jd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">纬&emsp;&emsp;度°</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-target-wd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">高&emsp;&emsp;程m</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-gc" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">拍照距离m</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-target-pd" autocomplete="off" class="layui-input" /></div></div></div></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">调整距离m</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-ad" autocomplete="off" class="layui-input" /></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">速&emsp;&emsp;度m/s</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-target-sd" autocomplete="off" class="layui-input" /></div></div></div></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">调整速度m/s</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-as" autocomplete="off" class="layui-input" /></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">X轴范围m</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-target-xoffset" autocomplete="off" class="layui-input" /></div></div></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">Y轴范围m</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-yoffset" autocomplete="off" class="layui-input" /></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">Z轴范围m</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-target-zoffset" autocomplete="off" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div style="margin-top:5px;"><button type="button" id="uav-route-add-save" class="layui-btn layui-btn-primary layui-btn-sm" style="width:96%;margin-left:2%;margin-right:2%;">修改</button></div></div>';
    form.val("uav-route-add", {
        "uav-route-add-target-jd": obj.data.blh.l.toFixed(8)
        , "uav-route-add-target-wd": obj.data.blh.b.toFixed(8)
        , "uav-route-add-target-gc": obj.data.blh.h
        , "uav-route-add-target-pd": obj.data.adjust.photodistance
        , "uav-route-add-target-ad": obj.data.adjust.adjustdistance
        , "uav-route-add-target-sd": obj.data.speed
        , "uav-route-add-target-as": obj.data.adjust.adjustspeed
        , "uav-route-add-target-xoffset": obj.data.extent.xaxis
        , "uav-route-add-target-yoffset": obj.data.extent.yaxis
        , "uav-route-add-target-zoffset": obj.data.extent.zaxis
    });

    $("#uav-route-add-save").on("click", function () {
        for (var i in uav_route_add_waypoint) {
            if (uav_route_add_waypoint[i].id == obj.data.id && uav_route_add_waypoint[i].type == "target") {
                uav_route_add_waypoint[i].speed = form.val("uav-route-add")["uav-route-add-target-sd"];
                uav_route_add_waypoint[i].adjust.photodistance = form.val("uav-route-add")["uav-route-add-target-pd"];
                uav_route_add_waypoint[i].adjust.adjustdistance = form.val("uav-route-add")["uav-route-add-target-ad"];
                uav_route_add_waypoint[i].adjust.adjustspeed = form.val("uav-route-add")["uav-route-add-target-as"];
                uav_route_add_waypoint[i].extent.xaxis = form.val("uav-route-add")["uav-route-add-target-xoffset"];
                uav_route_add_waypoint[i].extent.yaxis = form.val("uav-route-add")["uav-route-add-target-yoffset"];
                uav_route_add_waypoint[i].extent.zaxis = form.val("uav-route-add")["uav-route-add-target-zoffset"];
                break;
            }
        }

        //刷新航线树
        updateroutetree();

        layer.msg("修改成功！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
    });
};
//编辑目标点（视线）
function EditTargetE(obj) {
    document.getElementById("uav-route-add-waypointpara").innerHTML = '<!--目标点视线属性(编辑)--><div style="margin-top:5px;padding-right:5px;"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">经&emsp;&emsp;度°</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-jd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">纬&emsp;&emsp;度°</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-target-wd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">高&emsp;&emsp;程m</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-gc" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">拍照距离m</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-target-pd" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">调整距离m</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-ad" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">速&emsp;&emsp;度m/s</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="uav-route-add-target-sd" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">调整速度m/s</label><div class="layui-input-block" style="margin-left:90px;padding-right:5px;"><input type="text" name="uav-route-add-target-as" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item" style="margin-bottom:2px;"><label class="layui-form-label" style="width:80px;text-align:left;padding-left:5px;padding-right:5px;">是否水平</label><div class="layui-input-block" style="margin-left:90px;"><input type="checkbox" name="uav-route-add-target-level" lay-skin="switch" lay-text="开启|关闭"></div></div></div><div class="layui-form-item"><div style="margin-top:5px;"><button type="button" id="uav-route-add-save" class="layui-btn layui-btn-primary layui-btn-sm" style="width:96%;margin-left:2%;margin-right:2%;">修改</button></div></div>';
    form.val("uav-route-add", {
        "uav-route-add-target-jd": obj.data.blh.l.toFixed(8)
        , "uav-route-add-target-wd": obj.data.blh.b.toFixed(8)
        , "uav-route-add-target-gc": obj.data.blh.h
        , "uav-route-add-target-pd": obj.data.adjust.photodistance
        , "uav-route-add-target-ad": obj.data.adjust.adjustdistance
        , "uav-route-add-target-sd": obj.data.speed
        , "uav-route-add-target-as": obj.data.adjust.adjustspeed
        , "uav-route-add-target-level": obj.data.adjust.level
    });

    $("#uav-route-add-save").on("click", function () {
        for (var i in uav_route_add_waypoint) {
            if (uav_route_add_waypoint[i].id == obj.data.id && uav_route_add_waypoint[i].type == "target") {
                uav_route_add_waypoint[i].speed = form.val("uav-route-add")["uav-route-add-target-sd"];
                uav_route_add_waypoint[i].adjust.photodistance = form.val("uav-route-add")["uav-route-add-target-pd"];
                uav_route_add_waypoint[i].adjust.adjustdistance = form.val("uav-route-add")["uav-route-add-target-ad"];
                uav_route_add_waypoint[i].adjust.adjustspeed = form.val("uav-route-add")["uav-route-add-target-as"];
                uav_route_add_waypoint[i].adjust.level = OnOff2TrueFalse(form.val("uav-route-add")["uav-route-add-target-level"]);
                break;
            }
        }

        //刷新航线树
        updateroutetree();

        layer.msg("修改成功！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
    });
};
//编辑目标区域
function EditTargetArea(obj) {
    document.getElementById("uav-route-add-waypointpara").innerHTML = '<!--目标区域属性(编辑)--><div style="margin-top:5px;padding-right:5px;"><div class="layui-form-item"><label class="layui-form-label" style="width:150px;text-align:left;padding-left:5px;padding-right:5px;">GSD地面分辨率cm</label><div class="layui-input-block" style="margin-left:160px;"><input type="text" name="uav-route-add-targetarea-gsd" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:150px;text-align:left;padding-left:5px;padding-right:5px;">航向重叠度%</label><div class="layui-input-block" style="margin-left:160px;"><input type="text" name="uav-route-add-targetarea-fo" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:150px;text-align:left;padding-left:5px;padding-right:5px;">旁向重叠度%</label><div class="layui-input-block" style="margin-left:160px;"><input type="text" name="uav-route-add-targetarea-so" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item" style="margin-bottom:2px;"><label class="layui-form-label" style="width:150px;text-align:left;padding-left:5px;padding-right:5px;">首末航线多角度</label><div class="layui-input-block" style="margin-left:160px;"><input type="checkbox" name="uav-route-add-targetarea-ma" lay-skin="switch" lay-text="开启|关闭"></div></div><div class="layui-form-item" style="margin-bottom:2px;"><label class="layui-form-label" style="width:150px;text-align:left;padding-left:5px;padding-right:5px;">网格井字形</label><div class="layui-input-block" style="margin-left:160px;"><input type="checkbox" name="uav-route-add-targetarea-dg" lay-skin="switch" lay-text="开启|关闭"></div></div><div class="layui-form-item" style="margin-bottom:2px;"><label class="layui-form-label" style="width:150px;text-align:left;padding-left:5px;padding-right:5px;">方向修正</label><div class="layui-input-block" style="margin-left:160px;"><input type="checkbox" name="uav-route-add-targetarea-dm" lay-skin="switch" lay-text="开启|关闭"></div></div></div><div class="layui-form-item"><div style="margin-top:5px;"><button type="button" id="uav-route-add-save" class="layui-btn layui-btn-primary layui-btn-sm" style="width:96%;margin-left:2%;margin-right:2%;">修改</button></div></div>';
    form.val("uav-route-add", {
        "uav-route-add-targetarea-gsd": obj.data.photogrammetry.gsd
        , "uav-route-add-targetarea-fo": obj.data.photogrammetry.fo
        , "uav-route-add-targetarea-so": obj.data.photogrammetry.so
        , "uav-route-add-targetarea-ma": obj.data.photogrammetry.ma
        , "uav-route-add-targetarea-dg": obj.data.photogrammetry.dg
        , "uav-route-add-targetarea-dm": obj.data.photogrammetry.dm
    });

    $("#uav-route-add-save").on("click", function () {
        for (var i in uav_route_add_waypoint) {
            if (uav_route_add_waypoint[i].id == obj.data.id && uav_route_add_waypoint[i].type == "targetarea") {
                uav_route_add_waypoint[i].photogrammetry.gsd = form.val("uav-route-add")["uav-route-add-targetarea-gsd"];
                uav_route_add_waypoint[i].photogrammetry.fo = form.val("uav-route-add")["uav-route-add-targetarea-fo"];
                uav_route_add_waypoint[i].photogrammetry.so = form.val("uav-route-add")["uav-route-add-targetarea-so"];
                uav_route_add_waypoint[i].photogrammetry.ma = OnOff2TrueFalse(form.val("uav-route-add")["uav-route-add-targetarea-ma"]);
                uav_route_add_waypoint[i].photogrammetry.dg = OnOff2TrueFalse(form.val("uav-route-add")["uav-route-add-targetarea-dg"]);
                uav_route_add_waypoint[i].photogrammetry.dm = OnOff2TrueFalse(form.val("uav-route-add")["uav-route-add-targetarea-dm"]);
                break;
            }
        }

        //刷新航线树
        updateroutetree();

        layer.msg("修改成功！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
    });
};

//计算任务
function ComputeMission() {
    form.on('submit(uav-route-add-jshx)', function (data) {
        if (uav_route_add_waypoint.length == uav_route_add_avoids.length) {
            layer.msg("请添加目标！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
        else {
            data.field.cookie = document.cookie;
            data.field.waypoint = ClearHtml(JSON.stringify(uav_route_add_waypointtreedata));
            //data.field.pointcloud = current_project_pointcloudid;

            $.ajax({
                url: servicesurl + "/api/UavRoute/ComputeMission", type: "post", data: data.field,
                success: function (data) {
                    var result = JSON.parse(data);
                    if (result.code == 1) {
                        var mission = JSON.parse(result.data);

                        //清空
                        form.val("uav-route-add", {
                            "uav-route-add-hxcd": ""
                            , "uav-route-add-fxsj": ""
                            , "uav-route-add-hlds": ""
                            , "uav-route-add-pzsl": ""
                        });
                        //赋值
                        form.val("uav-route-add", {
                            "uav-route-add-hxcd": mission.RouteLength
                            , "uav-route-add-fxsj": mission.FlyTime
                            , "uav-route-add-hlds": mission.WaypointCount
                            , "uav-route-add-pzsl": mission.PhotoCount
                        });

                        current_json = mission.Mission;
                        current_djiterra_kml = mission.TerraKml;
                        current_djipilot_kml = mission.PilotKml;

                        document.getElementById("uav-route-result").style.visibility = "visible";//显示计算航线信息

                        //绘图
                        current_line = [];
                        for (var i in mission.Line) {
                            current_line.push(new Cesium.Cartesian3(mission.Line[i].x, mission.Line[i].y, mission.Line[i].z));
                        }

                        if (current_route != null) {
                            RemoveEntityInViewer(current_route);
                            current_route = null;
                        }

                        current_route = viewer.entities.add({
                            name: "uav_route",
                            polyline: {
                                positions: current_line,
                                width: 3,
                                arcType: Cesium.ArcType.RHUMB,
                                material: Cesium.Color.GREENYELLOW,
                                show: true,
                                clampToGround: false,
                            },
                        });
                    }

                    layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                }, datatype: "json"
            });
        }

        return false;
    });
};
//下载任务
function DownloadMission() {
    //下载第三方任务
    $("#uav-route-add-dowload-json").on("click", function () {
        if (current_json == null) {
            layer.msg("无任务信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
        else {
            var blob = new Blob([current_json], { type: "text/plain;charset=utf-8" });
            saveAs(blob, "CUSTOM_" + form.val("uav-route-add")["uav-route-add-hxmc"] + ".json");
        }
    });
    //下载DJI Pilot KML（不支持P4R）
    $("#uav-route-add-dowload-djipilot").on("click", function () {
        if (current_djipilot_kml == null) {
            layer.msg("无DJI Pilot KML任务文件！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
        else {
            if (droneid == 1 || droneid == 2) {
                layer.msg("DJI Pilot不支持PHANTOM 4 PRO和PHANTOM 4 RTK", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }
            else {
                var blob = new Blob([current_djipilot_kml], { type: "text/plain;charset=utf-8" });
                saveAs(blob, "DJIPilot_" + form.val("uav-route-add")["uav-route-add-hxmc"] + ".kml");
            }
        }
    });
    //下载DJI Terra KML（不支持M300R）
    $("#uav-route-add-dowload-djiterra").on("click", function () {
        if (current_djiterra_kml == null) {
            layer.msg("无DJI Terra KML任务文件！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
        else {
            if (droneid == 3) {
                layer.msg("DJI Terra不支持M300 RTK", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }
            else {
                var blob = new Blob([current_djiterra_kml], { type: "text/plain;charset=utf-8" });
                saveAs(blob, "DJITerra_" + form.val("uav-route-add")["uav-route-add-hxmc"] + ".kml");
            }
        }
    });
};
//保存任务
function SaveMission(type) {
    form.on('submit(uav-route-add-submit)', function (data) {
        if (current_json == null) {
            layer.msg("请先计算航线任务！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
        else {
            data.field.uavprojectid = current_project_id;
            data.field.cookie = document.cookie;
            data.field.line = JSON.stringify(current_line);
            data.field.mis = current_json;
            data.field.terra = encodeURI(current_djiterra_kml);
            data.field.pilot = encodeURI(current_djipilot_kml);
            data.field.waypoints = ClearHtml(JSON.stringify(uav_route_add_waypointtreedata));

            $.ajax({
                url: servicesurl + "/api/UavRoute/SaveRoute", type: "post", data: data.field,
                success: function (data) {
                    var result = JSON.parse(data);
                    if (result.code == 1) {
                        //关闭图层
                        if (type == "add") {
                            layer.close(uavrouteaddlayerindex);
                        }
                        else if (type == "edit") {
                            layer.close(uavrouteeditlayerindex);
                        }

                        //刷新项目树
                        GetUserUavProjectInfos(current_project_id, parseInt(result.data));
                    }
                    else {

                    }

                    layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                }, datatype: "json"
            });
        }

        return false;
    });
};


//删除路径
function DeleteUavRoute(uavrouteid) {
    $.ajax({
        url: servicesurl + "/api/UavRoute/DeleteUavRoute", type: "delete", data: { "id": uavrouteid, "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                GetUserUavProjectInfos(current_project_id, -1);
            }
            else {
                tree.reload('uav-project-list-treeid', { data: uav_project_list_all });
                MarkNode();
            }

            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }, datatype: "json"
    });
};

//重置路径元数
function ResetRouteElements() {
    //图形清空
    if (entity_takeoff != null) {
        RemoveEntityInViewer(entity_takeoff);
    }
    if (entity_takeoff_line != null) {
        RemoveEntityInViewer(entity_takeoff_line);
    }
    if (entity_landing != null) {
        RemoveEntityInViewer(entity_landing);
    }
    if (entity_landing_line != null) {
        RemoveEntityInViewer(entity_landing_line);
    }
    if (entities_avoid != null) {
        RemoveEntitiesInViewer(entities_avoid);
    }
    if (entities_avoid_label != null) {
        RemoveEntitiesInViewer(entities_avoid_label);
    }
    if (entities_avoid_line != null) {
        RemoveEntitiesInViewer(entities_avoid_line);
    }
    if (entities_target.length > 0) {
        RemoveEntitiesInViewer(entities_target);
    }
    if (entities_target_label.length > 0) {
        RemoveEntitiesInViewer(entities_target_label);
    }
    if (entities_targetarea.length > 0) {
        RemoveEntitiesInViewer(entities_targetarea);
    }
    if (entities_targetarea_label.length > 0) {
        RemoveEntitiesInViewer(entities_targetarea_label);
    }
    if (entities_targetarea_point.length > 0) {
        RemoveEntitiesInViewer(entities_targetarea_point);
    }
    if (entities_targetarea_line.length > 0) {
        RemoveEntitiesInViewer(entities_targetarea_line);
    }
    if (entities_targetarea_line_temp.length > 0) {
        RemoveEntitiesInViewer(entities_targetarea_line_temp);
    }
    if (current_route != null) {
        RemoveEntityInViewer(current_route);
    }

    //变量重置
    uavrouteaddlayerindex = null;
    droneid = null;
    uav_route_add_waypointtreedata = [];
    uav_route_add_takeoff = null;
    uav_route_add_landing = null;
    uav_route_add_avoids = [];
    uav_route_add_targets = [];
    uav_route_add_targetareas = [];
    uav_route_add_waypoint = [];
    entity_takeoff = null;
    entity_takeoff_line = null;
    entity_landing = null;
    entity_landing_line = null;
    entities_avoid = [];
    entities_avoid_label = [];
    entities_avoid_line = [];
    entities_target = [];
    entities_target_label = [];
    entities_targetarea = [];
    entities_targetarea_label = [];
    entities_targetarea_point = [];
    entities_targetarea_line = [];
    entities_targetarea_line_temp = [];
    current_target_id = null;
    current_route = null;
    current_json = null;
    current_djiterra_kml = null;
    current_djipilot_kml = null;
    current_line = null;
};


function ExportPoint(points) {
    var result = "";
    for (var i in points) {
        result += points[i].blh.l + "," + points[i].blh.b + "," + (Number(points[i].blh.h) + points[i].height) + ";";
    }
    console.log(result);
};


//删除数组元素
function RemoveArrayElemnet(arr, elemid, label) {
    var result = [];
    for (var i in arr) {
        if (arr[i].id < elemid) {
            result.push(arr[i]);
        }
        else if (arr[i].id > elemid) {
            var newid = arr[i].id - 1;
            arr[i].id = newid;
            arr[i].title = label + newid;
            result.push(arr[i]);
        }
    }
    return result;
};

//删除数组元素并修改数组元数
function RemoveModiftyArrayElemnet(arr, elemid, type) {
    var isdel = false;
    var result = [];
    for (var i in arr) {
        if (arr[i].type == type) {
            if (arr[i].id < elemid) {
                result.push(arr[i]);
            }
            else if (arr[i].id == elemid) {
                if (isdel == false) {
                    isdel = true;
                } else {
                    result.push(arr[i]);
                }
            }
            else if (arr[i].id > elemid) {
                result.push(arr[i]);
            }
        }
        else {
            result.push(arr[i]);
        }
    }
    return result;
};

//on/off转true/false
function OnOff2TrueFalse(onoff) {
    if (onoff == "on") {
        return true;
    }
    else {
        return false;
    }
};