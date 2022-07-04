

var constructionLayerlayerindex = null;
var currentconstructionmonitor = null;
var photoviewer = null;
var construction_pictures = null;
var monitorlist = null;


function LoadConstructionLayer(projectid) {
    if (projectid == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    if (currentprojectmonitors.length == 0) {
        layer.msg("请稍等项目加载！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    if (constructionLayerlayerindex == null) {
        constructionLayerlayerindex = layer.open({
            type: 1
            , title: ['施工管理', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['1000px', '800px']
            , shade: 0
            , offset: 'auto'
            , closeBtn: 1
            , maxmin: true
            , moveOut: true
            , content:'<!--施工管理--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin-top:0px">    <ul class="layui-tab-title">        <li class="layui-this" style="width:17%;padding-top: 10px;">施工概况</li>        <li style="width:17%;padding-top: 10px;">项目管理</li>        <li style="width:17%;padding-top: 10px;">施工过程</li>        <li style="width:17%;padding-top: 10px;">辅助措施</li>        <li style="width:17%;padding-top: 10px;">竣工资料</li>    </ul>    <div class="layui-tab-content">        <!--施工概况-->        <div class="layui-tab-item layui-show">            <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px;">                <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBriefitem" style="margin:0px;">                    <ul class="layui-tab-title" style="float: left;width:120px;border-color:white;">                        <li class="layui-this" style="display: block;">施工信息</li>                        <li style="display: block;">进度统计</li>                        <li style="display: block;">安装信息</li>                    </ul>                    <div class="layui-tab-content" style="height: 690px;width:840px;float: left;border-left:solid;border-left-color:#e6e6e6;border-left-width:1px;">                        <div class="layui-tab-item layui-show">                            <!--施工信息-->                            <form class="layui-form" style="margin-top:0px" lay-filter="constructioninfoviewform">                                <div class="layui-form-item">                                    <label class="layui-form-label" style="margin-top:0px">项目名称</label>                                    <div class="layui-input-block" style="margin-top:20px">                                        <input type="text" name="htmc" class="layui-input" readonly="readonly" />                                    </div>                                </div>                                <div class="layui-form-item">                                    <div class="layui-row" style="margin-top:20px">                                        <div class="layui-col-md6">                                            <div class="grid-demo grid-demo-bg1">                                                <label class="layui-form-label">开工时间</label>                                                <div class="layui-input-block">                                                    <input type="text" name="kgsj" class="layui-input" readonly="readonly" />                                                </div>                                            </div>                                        </div>                                        <div class="layui-col-md6">                                            <div class="grid-demo">                                                <label class="layui-form-label">结束时间</label>                                                <div class="layui-input-block">                                                    <input type="text" name="sjsj" class="layui-input" readonly="readonly" />                                                </div>                                            </div>                                        </div>                                    </div>                                </div>                                <div class="layui-form-item">                                    <div class="layui-row" style="margin-top:20px">                                        <div class="layui-col-md6">                                            <div class="grid-demo grid-demo-bg1">                                                <label class="layui-form-label">项目负责人</label>                                                <div class="layui-input-block">                                                    <input type="text" name="project_leader" class="layui-input" readonly="readonly" />                                                </div>                                            </div>                                        </div>                                        <div class="layui-col-md6">                                            <div class="grid-demo">                                                <label class="layui-form-label">技术负责人</label>                                                <div class="layui-input-block">                                                    <input type="text" name="technical_director" class="layui-input" readonly="readonly" />                                                </div>                                            </div>                                        </div>                                    </div>                                </div>                                <div class="layui-form-item">                                    <div class="layui-row" style="margin-top:20px">                                        <div class="layui-col-md6">                                            <div class="grid-demo grid-demo-bg1">                                                <label class="layui-form-label">执行负责人</label>                                                <div class="layui-input-block">                                                    <input type="text" name="scene_leader" class="layui-input" readonly="readonly" />                                                </div>                                            </div>                                        </div>                                        <div class="layui-col-md6">                                            <div class="grid-demo">                                                <label class="layui-form-label">监测墩尺寸</label>                                                <div class="layui-input-block">                                                    <input type="text" name="jcsize" class="layui-input" readonly="readonly" />                                                </div>                                            </div>                                        </div>                                    </div>                                </div>                                <div class="layui-form-item" style="margin-top:20px">                                    <label class="layui-form-label">项目简介</label>                                        <div class="layui-input-block">                                            <textarea name="bz" class="layui-textarea"></textarea>                                        </div>                                    </div>                                    <div class="layui-form-item" style="margin-bottom:10px">                                        <div style="position:absolute;right:10px;bottom:10px;">                                            <button class="layui-btn" lay-filter="construction_info_edit" style="width:100px">编辑</button>                                            <button type="submit" class="layui-btn" lay-filter="construction_info_submit" style="width:100px">提交</button>                                        </div>                                    </div></form>                        </div>                        <div class="layui-tab-item">                            <!--进度统计-->                        </div>                        <div class="layui-tab-item">                            <!--安装信息-->                        </div>                    </div>                </div>            </div>        </div>        <!--项目管理-->        <div class="layui-tab-item">            <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px;">                <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBriefitem" style="margin:0px;">                    <ul class="layui-tab-title" style="float: left;width:120px;border-color:white;">                        <li class="layui-this" style="display: block;">设备进场</li>                        <li style="display: block;">日志填报</li>                        <li style="display: block;">现场检查</li>                    </ul>                    <div class="layui-tab-content" style="height: 690px;width:840px;float: left;border-left:solid;border-left-color:#e6e6e6;border-left-width:1px;">                        <div class="layui-tab-item layui-show">                            <!--设备进场-->                        </div>                        <div class="layui-tab-item">                            <!--日志填报-->                            <div id="construction_calendar"></div>                        </div>                        <div class="layui-tab-item">                            <!--现场检查-->                        </div>                    </div>                </div>            </div>        </div>        <!--施工过程-->        <div class="layui-tab-item">            <!--左侧-->            <div class="layui-col-md3" style="width:20%;height:500px;overflow: auto;">                <div id="consrtction-process-tree" class="grid-demo"></div>            </div>            <!--右侧-->            <div class="layui-col-md9" style="width:80%;height:300px;border-left:solid;border-color:#e6e6e6;border-left-width:0px;">                <ul class="layui-timeline" id="construction_photo">                    <li class="layui-timeline-item" style="height:120px;">                        <i class="layui-icon layui-timeline-axis">&#xe63f;</i>                        <div class="layui-timeline-content layui-text">                            <h3 class="layui-timeline-title">放样</h3>                            <div class="site-demo-flow" id="construction_photo_fixedpoisnt">                                                                                       </div>                        </div>                    </li>                    <li class="layui-timeline-item" style="height:120px;" >                        <i class="layui-icon layui-timeline-axis">&#xe63f;</i>                        <div class="layui-timeline-content layui-text">                            <h3 class="layui-timeline-title">挖坑</h3>                            <div class="site-demo-flow" id="construction_photo_dig">                            </div>                        </div>                    </li>                    <li class="layui-timeline-item" style="height:120px;">                        <i class="layui-icon layui-timeline-axis">&#xe63f;</i>                        <div class="layui-timeline-content layui-text">                            <h3 class="layui-timeline-title">浇筑</h3>                            <div class="site-demo-flow" id="construction_photo_pour">                                                      </div>                        </div>                    </li>                    <li class="layui-timeline-item" style="height:120px;">                        <i class="layui-icon layui-timeline-axis">&#xe63f;</i>                        <div class="layui-timeline-content layui-text">                            <h3 class="layui-timeline-title">安装-调试</h3>                            <div class="site-demo-flow" id="construction_photo_install">                            </div>                                                                          </div>                    </li>                    <li class="layui-timeline-item" style="height:120px;">                        <i class="layui-icon layui-timeline-axis">&#xe63f;</i>                        <div class="layui-timeline-content layui-text">                            <h3 class="layui-timeline-title">完成</h3>                            <div class="site-demo-flow" id="construction_photo_finish">                            </div>                        </div>                    </li>                </ul>            </div>        </div>        <!--辅助措施-->        <div class="layui-tab-item">            <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px;">                <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBriefitem" style="margin:0px;">                    <ul class="layui-tab-title" style="float: left;width:120px;border-color:white;">                        <li class="layui-this" style="display: block;">临时道路</li>                        <li style="display: block;">二次搬运</li>                        <li style="display: block;">其他措施</li>                    </ul>                    <div class="layui-tab-content" style="height: 690px;width:840px;float: left;border-left:solid;border-left-color:#e6e6e6;border-left-width:1px;">                        <div class="layui-tab-item layui-show">                            <!--临时道路-->                        </div>                        <div class="layui-tab-item">                            <!--二次搬运-->                        </div>                        <div class="layui-tab-item">                            <!--其他措施-->                        </div>                    </div>                </div>            </div>        </div>        <!--竣工资料-->        <div class="layui-tab-item">            <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px;">                <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBriefitem" style="margin:0px;">                    <ul class="layui-tab-title" style="float: left;width:120px;border-color:white;">                        <li class="layui-this" style="display: block;">设备交付验收</li>                        <li style="display: block;">施工日志</li>                        <li style="display: block;">安装记录表</li>                        <li style="display: block;">质量评定</li>                    </ul>                    <div class="layui-tab-content" style="height: 690px;width:840px;float: left;border-left:solid;border-left-color:#e6e6e6;border-left-width:1px;">                        <div class="layui-tab-item layui-show">                            <!--设备交付验收-->                        </div>                        <div class="layui-tab-item">                            <!--施工日志-->                        </div>                        <div class="layui-tab-item">                            <!--安装记录表-->                        </div>                        <div class="layui-tab-item">                            <!--质量评定-->                        </div>                    </div>                </div>            </div>        </div>    </div></div>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);
                $.ajax({
                    url: servicesurl + "/api/Monitor/GetMonitor", type: "get", data: { "id": projectid, "cookie": document.cookie },
                    success: function (temp_data) {
                        monitorlist = JSON.parse(temp_data);
                        $.ajax({
                            url: window.parent.servicesurl + "/api/Construction/GetConstructionPhoto", type: "get", data: { 'projectid': projectid, 'drasterid': "", 'monitorid': "", "cookie": document.cookie },
                            success: function (data) {
                                construction_pictures = JSON.parse(data)
                                //加载初始监测点数据
                                if (currentprojectfristmonitor != null) {
                                    currentconstructionmonitor = currentprojectfristmonitor;
                                    GetConstMonitorPhoto(currentconstructionmonitor.id)
                                }
                            }, datatype: "json"
                        });
                    }, datatype: "json"
                });



                elem.init();
                //施工概况
                Construction_Statistics(projectid);
                //项目管理
                Construction_Manage();
                //施工过程
                Construction_Process(projectid);
                //辅助措施
                Construction_Assist();
                //竣工资料
                Construction_Document();
            }
            , end: function () {
                constructionLayerlayerindex = null;
                currentconstructionmonitor = null;

            }
        });
    }
}

//施工概况
function Construction_Statistics(projectid) {
    //施工概况
    $.ajax({
        url: servicesurl + "/api/Construction/GetConstructionInfo", type: "get", data: { "id": projectid, "cookie": document.cookie },
        success: function (data) {
            if (data == "") {
                layer.msg("无施工项目信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                //清除项目施工信息
                form.val("constructioninfoviewform", {
                    "htmc": ""
                    , "kgsj": ""
                    , "cjsj": ""
                    , "sjsj": ""
                    , "project_leader": ""
                    , "technical_director": ""
                    , "scene_leader": ""
                    , "jcsize": ""
                    , "bz": ""
                });
            }
            else {
                //清除项目施工信息
                var constructioninfo = JSON.parse(data);
                form.val("constructioninfoviewform", {
                    "htmc": constructioninfo.ht_name
                    , "kgsj": constructioninfo.start_time
                    , "sjsj": constructioninfo.end_time
                    , "project_leader": constructioninfo.project_leader
                    , "technical_director": constructioninfo.technical_director
                    , "scene_leader": constructioninfo.scene_leader
                    , "jcsize": constructioninfo.size
                    , "bz": constructioninfo.bz
                });
            }
        }, datatype: "json"
    });
    //进度统计

    //安装信息

}
//项目管理
function Construction_Manage() {
    var calendarEl = document.getElementById('construction_calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives', 
        initialView: 'dayGridMonth',
        height: 650, 
        locale: 'zh-cn',
        contentHeight: 650,
        selectable: true, // dataClick生效
        editable: true,
        dateClick: function (info) {
            info.dayEl.style.backgroundColor = 'red';
        }
    });
    calendar.render();
}

//施工过程
function Construction_Process(projectid) {

    //渲染监测点树
    tree.render({
        elem: '#consrtction-process-tree'
        , id: 'consrtction-process-treeid'
        , showCheckbox: false
        , showLine: true
        , data: currentprojectmonitors
        , edit: false
        , accordion: true
        , click: function (obj) {
            if ((obj.data.type != null) || (obj.data.type != undefined)) {
                if (obj.data != currentconstructionmonitor) {
                    currentconstructionmonitor = obj.data;
                    GetConstMonitorPhoto(currentconstructionmonitor.id);
                }
            }
            //照片功能
            if (photoviewer != null) {
                photoviewer.destroy();
            }
            photoviewer = new Viewer(document.getElementById("construction_photo"), {
                toolbar: true, //显示工具条
                viewed() {
                    photoviewer.zoomTo(0.75); // 图片显示比例 75%
                },
                zIndex: 99999999,
                navbar: false,
                fullsreen: false,
                show: function () {  // 动态加载图片后，更新实例
                    photoviewer.update();
                },
                url: 'url'
            });
        }
    });

}

//加载施工照片
function GetConstMonitorPhoto(monitorid) {
    var photolist = [];
    for (var j in construction_pictures) {
        if (monitorid == construction_pictures[j].monitor_id) {
            photolist.push(construction_pictures[j]);
        }
    }
    if (photolist.length !=0) {
        for (var i in photolist) {
            if (i == 0) {
                document.getElementById("construction_photo_fixedpoisnt").innerHTML = '';
                document.getElementById("construction_photo_dig").innerHTML = '';
                document.getElementById("construction_photo_pour").innerHTML = '';
                document.getElementById("construction_photo_install").innerHTML = '';
                document.getElementById("construction_photo_finish").innerHTML = '';

            }
            switch (photolist[i].type_id) {
                case 1:
                    document.getElementById("construction_photo_fixedpoisnt").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style=" width:100px; height: 100px;margin: 2px;" src="' + datasurl + photolist[i].sphoto_url + '" url="' + datasurl + photolist[i].photo_url + '"   alt="放样' + (i + 1) + '"></img></li>';
                    break;
                case 2:
                    document.getElementById("construction_photo_dig").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style=" width:100px; height: 100px;margin: 2px;" src="' + datasurl + photolist[i].sphoto_url + '" url="' + datasurl + photolist[i].photo_url + '"   alt="挖坑' + (i + 1) + '"></img></li>';
                    break;
                case 3:
                    document.getElementById("construction_photo_pour").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style=" width:100px; height: 100px;margin: 2px;" src="' + datasurl + photolist[i].sphoto_url + '" url="' + datasurl + photolist[i].photo_url + '"   alt="浇筑' + (i + 1) + '"></img></li>';
                    break;
                case 4:
                    document.getElementById("construction_photo_install").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style=" width:100px; height: 100px;margin: 2px;" src="' + datasurl + photolist[i].sphoto_url + '" url="' + datasurl + photolist[i].photo_url + '"   alt="安装-调试' + (i + 1) + '"></img></li>';
                    break;
                case 5:
                    document.getElementById("construction_photo_finish").innerHTML += '<li style="display: inline-block"><img id="appdSrcId" style=" width:100px; height: 100px;margin: 2px;" src="' + datasurl + photolist[i].sphoto_url + '" url="' + datasurl + photolist[i].photo_url + '"   alt="完成' + (i + 1) + '"></img></li>';
                    break;
                default:
            }
        }  
    }
    else {
        document.getElementById("construction_photo_fixedpoisnt").innerHTML = '';
        document.getElementById("construction_photo_dig").innerHTML = '';
        document.getElementById("construction_photo_pour").innerHTML = '';
        document.getElementById("construction_photo_install").innerHTML = '';
        document.getElementById("construction_photo_finish").innerHTML = '';
    }

}








//辅助措施
function Construction_Assist() {

}
//竣工资料
function Construction_Document() {

}


