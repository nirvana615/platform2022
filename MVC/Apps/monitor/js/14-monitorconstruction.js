

var constructionLayerlayerindex = null;

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
            , content: '<!--施工管理--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin-top:0px">    <ul class="layui-tab-title">        <li class="layui-this" style="width:17%;padding-top: 10px;">施工概况</li>        <li style="width:17%;padding-top: 10px;">项目管理</li>        <li style="width:17%;padding-top: 10px;">施工过程</li>        <li style="width:17%;padding-top: 10px;">辅助措施</li>        <li style="width:17%;padding-top: 10px;">竣工资料</li>    </ul>    <div class="layui-tab-content">        <!--施工概况-->        <div class="layui-tab-item layui-show">        </div>        <!--项目管理-->        <div class="layui-tab-item">        </div>        <!--施工过程-->        <div class="layui-tab-item">            <!--左侧-->            <div class="layui-col-md3" style="width:20%;height:500px;overflow: auto;">                <div id="consrtction-process-tree" class="grid-demo"></div>            </div>            <!--右侧-->            <div class="layui-col-md9" style="width:80%;height:300px;border-left:solid;border-color:#e6e6e6;border-left-width:0px;">                        </div>        </div>        <!--辅助措施-->        <div class="layui-tab-item">        </div>        <!--竣工资料-->        <div class="layui-tab-item">        </div>    </div></div>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);
                elem.init();

            }
            , end: function () {
                constructionLayerlayerindex = null;


            }
        });
    }
}