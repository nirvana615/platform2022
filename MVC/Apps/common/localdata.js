/*
 * 必须先引用layui
 * 必须先创建viewer变量
 * 必须先引入common.js
 */

var localdatawidget_layerindex = null;



//加载本地数据
function AddLocalData() {
    if (localdatawidget_layerindex != null) {
        LayerSetTop(localdatawidget_layerindex);
        return;
    }

    localdatawidget_layerindex = layer.open({
        type: 1
        , title: ['加载本地数据', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['550px', '400px']
        , shade: 0
        , offset: 'rb'
        , closeBtn: 1
        , maxmin: true
        , moveOut: true
        , resize: false
        , content: '<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBriefitem" style="margin:0px;"><ul class="layui-tab-title" style="float: left;width:120px;border-color:white;"><li class="layui-this" style="display: block;">KML</li><li style="display: block;">JSON</li><li style="display: block;">自定义</li><li style="display: block;">其他</li></ul><div class="layui-tab-content" style="height:290px;width:400px;float: left;border-left:solid;border-left-color:#e6e6e6;border-left-width:1px;"><div class="layui-tab-item layui-show"><!--KML--><div class="layui-btn-container"><button type="button" class="layui-btn" id="selectkmlfile"><i class="layui-icon">✚</i>选择文件</button><button type="button" class="layui-btn layui-btn-normal">清空全部要素</button><button type="button" class="layui-btn layui-btn-danger">清空拖拽要素</button></div><div id="kmldatatree" style="height:100px;"></div><div id="kmldatastyle" style="height:100px;"></div></div><div class="layui-tab-item"><!--JSON--></div><div class="layui-tab-item"><!--自定义--></div><div class="layui-tab-item"><!--其他--></div></div></div>'
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);

            layui.upload.render({
                elem: '#selectkmlfile'
                , accept: 'file'
                , acceptMime: '.kml'
                , auto: false
                , multiple: false
                , choose: function (obj) {
                    //将每次选择的文件追加到文件队列
                    var files = obj.pushFile();

                    //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
                    obj.preview(function (index, file, result) {
                        console.log(index); //得到文件索引
                        console.log(file); //得到文件对象
                        console.log(result); //得到文件base64编码，比如图片

                        

                        //obj.resetFile(index, file, '123.jpg'); //重命名文件名，layui 2.3.0 开始新增

                        //这里还可以做一些 append 文件列表 DOM 的操作









                    });
                }
            });



















        }
        , end: function () {

        }
    });





};
