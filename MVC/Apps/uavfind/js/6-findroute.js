/*
 * 图标
 */
var TAKEOFFICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/uav/takeoff.png" style="width:14px;height:14px;"/></span>';
var LANDINGICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/uav/landing.png" style="width:14px;height:14px;"/></span>';
var TARGETICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/uav/target.png" style="width:14px;height:14px;"/></span>';
var AVOIDICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/uav/avoid.png" style="width:14px;height:14px;"/></span>';
var TARGETAREAICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/uav/targetarea.png" style="width:14px;height:14px;"/></span>';
var MODELICON = '<span style="margin-left:0px;margin-right:2px;"><img src="../../../Resources/img/map/model.png" style="width:14px;height:14px;"/></span>';
var WAYLINECON = '<span style="margin-left:0px;margin-right:2px;"><img src="../../../Resources/img/uav/wayline.png" style="width:14px;height:14px;"/></span>';
/*
 * 默认参数
 */
var takeoffheight = 400;         //(默认值)起飞点高度，单位m
var initialspeed = 8;            //(默认值)初始速度，单位m/s
var routespeed = 8;              //(默认值)航线速度，单位m/s

var avoidheight = 150;           //(默认值)避障点高度，单位m
var landingheight = 100;         //(默认值)降落点高度，单位m

var adjustdistance = 5;         //(默认值)调整距离，单位m
var photodistance = 80;         //(默认值)拍照距离，单位m
var adjustspeed = 1;            //(默认值)调整速度，单位m/s
var hovertime = 3000;           //(默认值)悬停时间，单位ms
var yawangle = 180;             //(默认值)偏航角，单位°  [-180,180]
var pitchangle = 0;             //(默认值)偏航角，单位°    [-90,0]

var gsd = 1;                    //地面分辨率，单位cm
var forwardoverlap = 80;        //航向重叠度，百分比
var sideoverlap = 70;           //旁向重叠度，百分比
var multiangle = false;         //首末航向多角度
var doublegrid = false;         //井字形
var directmodify = false;       //方向修正（计算第二次自定义平面坐标系y正轴点出错导致的方向错误）

var level = true;              //是否水平


//新建巡查航线
function AddFindRoute() {
    if (currentprojectid == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
    }
    else {
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
            , content: '<!--目标图像采集（新建）--><form class="layui-form" lay-filter="uav-route-add" action=""><div class="layui-form-item" style="width:100%;height:680px;"><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin-top:0px;"><ul class="layui-tab-title"><li class="layui-this" style="padding-top: 5px;width:25%;">航线</li><li style="padding-top: 5px;width:25%;">无人机</li><li style="padding-top: 5px;width:25%;">规划</li></ul><div class="layui-tab-content"><!--航线--><div class="layui-tab-item layui-show"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航线名称</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-hxmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航线类型</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-hxlxid" name="uav-route-add-hxlx" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">高程类型</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-gclxid" name="uav-route-add-gclx" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航线速度m/s</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-hxsd" autocomplete="off" class="layui-input" lay-verify="required" /></div></div><div class="layui-form-item layui-form-text"><label class="layui-form-label" style="width:80px;text-align:left;">备&emsp;&emsp;注</label><div class="layui-input-block" style="margin-left:110px;"><textarea name="uav-route-add-bz" placeholder="请输入" class="layui-textarea" style="height:300px;padding-right:5px;"></textarea></div></div><div id="uav-route-result" style="visibility:hidden;"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航线长度m</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-hxcd" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">飞行时间s</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-fxsj" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">航点数量</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-hlds" autocomplete="off" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">拍照数量</label><div class="layui-input-block" style="margin-left:110px;"><input type="text" name="uav-route-add-pzsl" autocomplete="off" class="layui-input" readonly="readonly" /></div></div></div></div><!--无人机--><div class="layui-tab-item"><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">无&ensp;人&ensp;机</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-droneid" name="uav-route-add-drone" lay-filter="uav-route-add-drone" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">挂载类型</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-payloadtypeid" name="uav-route-add-payloadtype" lay-filter="uav-route-add-payloadtype" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">挂载型号</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-payloadid" name="uav-route-add-payload" lay-filter="uav-route-add-payload" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:80px;text-align:left;">照片比例</label><div class="layui-input-block" style="margin-left:110px;"><select id="uav-route-add-photoratioid" name="uav-route-add-photoratio" lay-filter="uav-route-add-photoratio"><option value="">请选择</option></select></div></div></div><!--规划--><div class="layui-tab-item"><div class="layui-row layui-col-space5" style="margin-bottom:5px;"><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-takeoff" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 起飞点</button></div></div><div class="layui-col-md3"><div class="grid-demo"><button type="button" id="uav-route-add-target" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 目标点</button></div></div><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-avoid" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 避障点</button></div></div><div class="layui-col-md3"><div class="grid-demo"><button type="button" id="uav-route-add-landing" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 降落点</button></div></div></div><div class="grid-demo grid-demo-bg1" style="height:300px;border-style:solid;border-width:1px;border-color:#e6e6e6;overflow: auto;"><!--航点树--><div id="uav-route-add-waypointtree"></div></div><div class="layui-row layui-col-space5" id="uav-route-add-action" style="margin-top:5px;visibility:hidden;"><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-hover" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 悬停</button></div></div><div class="layui-col-md3"><div class="grid-demo"><button type="button" id="uav-route-add-photo" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 拍照</button></div></div><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-yaw" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 偏航角</button></div></div><div class="layui-col-md3"><div class="grid-demo"><button type="button" id="uav-route-add-pitch" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">✚ 俯仰角</button></div></div></div><div class="grid-demo" style="height:260px;border-style:solid;border-width:1px;border-color:#e6e6e6;margin-top:5px;overflow: auto;"><!--参数--><div id="uav-route-add-waypointpara"></div></div></div></div></div></div><!--操作项--><div style="margin-top:5px;border-top-style:solid;border-top-width:2px;border-top-color:#f8f8f8;margin-left:5px;margin-right:5px;"><div class="layui-form-item" style="margin-top:5px;"><div style="margin-top:5px;"><button type="submit" class="layui-btn layui-btn-primary layui-btn-sm" lay-submit="" lay-filter="uav-route-add-jshx" style="width:100%;">计算</button></div></div><div class="layui-row layui-col-space5"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-dowload-json" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">下载JSON</button></div></div><div class="layui-col-md4"><div class="grid-demo"><button type="button" id="uav-route-add-dowload-djiterra" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">下载DJI Terra</button></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><button type="button" id="uav-route-add-dowload-djipilot" class="layui-btn layui-btn-primary layui-btn-sm" style="width:100%;">下载DJI Pilot</button></div></div></div><div class="layui-form-item" style="margin-top:5px;"><div style="margin-top:5px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="find-route-add-submit" style="width:100%;">保存</button></div></div></div></form>'
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

                AddTakeOffModel(7);//添加起飞点
                AddLandingModel(7);//添加降落点
                AddTargetEyeModel();//添加目标点（视线）
                AddAvoidModel(7);//添加避障点

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
                SaveFindMission("add");//保存航线

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

//******添加目标点（视线）--------巡查系统特用
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

                            //***目标类别

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

//******保存航线任务---巡查系统特用
function SaveFindMission(type) {
    form.on('submit(find-route-add-submit)', function (data) {
        if (current_json == null) {
            layer.msg("请先计算航线任务！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
        else {
            //TODO****目标信息
            data.field.findprojectid = currentprojectid;
            data.field.cookie = document.cookie;
            data.field.line = JSON.stringify(current_line);
            data.field.mis = current_json;
            //data.field.terra = encodeURI(current_djiterra_kml);
            //data.field.pilot = encodeURI(current_djipilot_kml);
            data.field.waypoints = ClearHtml(JSON.stringify(uav_route_add_waypointtreedata));

            $.ajax({
                url: servicesurl + "/api/FindRoute/SaveFindRoute", type: "post", data: data.field,
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

                        var uavroute = JSON.parse(result.data);
                        //TODO重新组织项目列表，呈现新建航线、目标
                        for (var i in findprojectlist) {
                            if (findprojectlist[i].id == currentprojectid) {
                                for (var j in findprojectlist[i].children) {
                                    if (findprojectlist[i].children[j].title == "巡查航线") {

                                        var routechild = [];

                                        var route = new Object;
                                        route.id = uavroute.Id;
                                        route.icon = WAYLINECON;
                                        route.type = "findroute";
                                        route.title = uavroute.HXMC;
                                        route.class = uavroute.HXLX;
                                        route.line = uavroute.LINE;
                                        route.data = uavroute;
                                        route.nodeOperate = true;
                                        route.showCheckbox = true;
                                        route.checked = true;
                                        routechild.push(route);

                                        if (findprojectlist[i].children[j].children != undefined && findprojectlist[i].children[j].children.length > 0) {
                                            for (var k in findprojectlist[i].children[j].children) {
                                                routechild.push(findprojectlist[i].children[j].children[k]);
                                            }
                                        }

                                        findprojectlist[i].children[j].children = routechild;

                                        break;
                                    }
                                }
                                break;
                            }
                        }

                        var entity_route = new Cesium.Entity({
                            id: "UAVROUTE_" + uavroute.Id,
                            polyline: {
                                positions: JSON.parse(uavroute.LINE),
                                width: 3,
                                arcType: Cesium.ArcType.RHUMB,
                                material: Cesium.Color.GREENYELLOW,
                                show: true,
                                clampToGround: false,
                            },
                        });

                        current_entities_route.push(entity_route);
                        AddEntityInViewer(entity_route);
                        ZoomToEntity(entity_route);

                        isReloadTree = true;//标记重载
                        MarkCurrentProject();
                        isReloadTree = false;//重载后还原
                    }

                    layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                }, datatype: "json"
            });
        }

        return false;
    });
};


