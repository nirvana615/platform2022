

var constructionLayerlayerindex = null;
var currentdevice = null;

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
            , content:'<!--施工管理--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin-top:0px">    <ul class="layui-tab-title">        <li class="layui-this" style="width:17%;padding-top: 10px;">施工概况</li>        <li style="width:17%;padding-top: 10px;">项目管理</li>        <li style="width:17%;padding-top: 10px;">施工过程</li>        <li style="width:17%;padding-top: 10px;">辅助措施</li>        <li style="width:17%;padding-top: 10px;">竣工资料</li>    </ul>    <div class="layui-tab-content">        <!--施工概况-->        <div class="layui-tab-item layui-show">            <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px;">                <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBriefitem" style="margin:0px;">                    <ul class="layui-tab-title" style="float: left;width:120px;border-color:white;">                        <li class="layui-this" style="display: block;">施工信息</li>                        <li style="display: block;">进度统计</li>                        <li style="display: block;">安装信息</li>                    </ul>                    <div class="layui-tab-content" style="height: 690px;width:840px;float: left;border-left:solid;border-left-color:#e6e6e6;border-left-width:1px;">                        <div class="layui-tab-item layui-show">                            <!--施工信息-->                        </div>                        <div class="layui-tab-item">                            <!--进度统计-->                        </div>                        <div class="layui-tab-item">                            <!--安装信息-->                        </div>                    </div>                </div>            </div>        </div>        <!--项目管理-->        <div class="layui-tab-item">            <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px;">                <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBriefitem" style="margin:0px;">                    <ul class="layui-tab-title" style="float: left;width:120px;border-color:white;">                        <li class="layui-this" style="display: block;">设备进场</li>                        <li style="display: block;">日志填报</li>                        <li style="display: block;">现场检查</li>                    </ul>                    <div class="layui-tab-content" style="height: 690px;width:840px;float: left;border-left:solid;border-left-color:#e6e6e6;border-left-width:1px;">                        <div class="layui-tab-item layui-show">                            <!--设备进场-->                        </div>                        <div class="layui-tab-item">                            <!--日志填报-->                        </div>                        <div class="layui-tab-item">                            <!--现场检查-->                        </div>                    </div>                </div>            </div>        </div>        <!--施工过程-->        <div class="layui-tab-item">            <!--左侧-->            <div class="layui-col-md3" style="width:20%;height:500px;overflow: auto;">                <div id="consrtction-process-tree" class="grid-demo"></div>            </div>            <!--右侧-->            <div class="layui-col-md9" style="width:80%;height:300px;border-left:solid;border-color:#e6e6e6;border-left-width:0px;">                <ul class="layui-timeline">                    <li class="layui-timeline-item">                        <i class="layui-icon layui-timeline-axis">&#xe63f;</i>                        <div class="layui-timeline-content layui-text">                            <h3 class="layui-timeline-title">放样</h3>                        </div>                    </li>                    <li class="layui-timeline-item">                        <i class="layui-icon layui-timeline-axis">&#xe63f;</i>                        <div class="layui-timeline-content layui-text">                            <h3 class="layui-timeline-title">挖坑</h3>                        </div>                    </li>                    <li class="layui-timeline-item">                        <i class="layui-icon layui-timeline-axis">&#xe63f;</i>                        <div class="layui-timeline-content layui-text">                            <h3 class="layui-timeline-title">浇筑</h3>                        </div>                    </li>                    <li class="layui-timeline-item">                        <i class="layui-icon layui-timeline-axis">&#xe63f;</i>                        <div class="layui-timeline-content layui-text">                            <h3 class="layui-timeline-title">安装</h3>                        </div>                    </li>                    <li class="layui-timeline-item">                        <i class="layui-icon layui-timeline-axis">&#xe63f;</i>                        <div class="layui-timeline-content layui-text">                            <h3 class="layui-timeline-title">调试</h3>                        </div>                    </li>                    <li class="layui-timeline-item">                        <i class="layui-icon layui-timeline-axis">&#xe63f;</i>                        <div class="layui-timeline-content layui-text">                            <h3 class="layui-timeline-title">完成</h3>                        </div>                    </li>                </ul>            </div>        </div>        <!--辅助措施-->        <div class="layui-tab-item">            <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px;">                <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBriefitem" style="margin:0px;">                    <ul class="layui-tab-title" style="float: left;width:120px;border-color:white;">                        <li class="layui-this" style="display: block;">临时道路</li>                        <li style="display: block;">二次搬运</li>                        <li style="display: block;">其他措施</li>                    </ul>                    <div class="layui-tab-content" style="height: 690px;width:840px;float: left;border-left:solid;border-left-color:#e6e6e6;border-left-width:1px;">                        <div class="layui-tab-item layui-show">                            <!--临时道路-->                        </div>                        <div class="layui-tab-item">                            <!--二次搬运-->                        </div>                        <div class="layui-tab-item">                            <!--其他措施-->                        </div>                    </div>                </div>            </div>        </div>        <!--竣工资料-->        <div class="layui-tab-item">            <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px;">                <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBriefitem" style="margin:0px;">                    <ul class="layui-tab-title" style="float: left;width:120px;border-color:white;">                        <li class="layui-this" style="display: block;">设备交付验收</li>                        <li style="display: block;">施工日志</li>                        <li style="display: block;">安装记录表</li>                        <li style="display: block;">质量评定</li>                    </ul>                    <div class="layui-tab-content" style="height: 690px;width:840px;float: left;border-left:solid;border-left-color:#e6e6e6;border-left-width:1px;">                        <div class="layui-tab-item layui-show">                            <!--设备交付验收-->                        </div>                        <div class="layui-tab-item">                            <!--施工日志-->                        </div>                        <div class="layui-tab-item">                            <!--安装记录表-->                        </div>                        <div class="layui-tab-item">                            <!--质量评定-->                        </div>                    </div>                </div>            </div>        </div>    </div></div>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);
                elem.init();
                //施工概况
                Construction_Statistics();
                //项目管理
                Construction_Manage();
                //施工过程
                Construction_Process();
                //辅助措施
                Construction_assist();
                //竣工资料
                Construction_Document();
            }
            , end: function () {
                constructionLayerlayerindex = null;
                currentdevice = null;

            }
        });
    }
}

//施工概况
function Construction_Statistics() {

}
//项目管理
function Construction_Manage() {

}
//施工过程
function Construction_Process() {

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
                if (obj.data != currentdevice) {
                    currentdevice = obj.data;
                }
            }
        }
    });
}
//辅助措施
function Construction_assist() {

}
//竣工资料
function Construction_Document() {

}