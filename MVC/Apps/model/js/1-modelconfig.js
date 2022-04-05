/*
 * 全局对象
 */
var handler;

var tree = layui.tree;
var form = layui.form;
var table = layui.table;
var util = layui.util;
var date = layui.laydate;
var elem = layui.element;
var colorpicker = layui.colorpicker;

var tipslayer = -1;//全局提示层
var depthTestAgainstTerrain;//深度检测值

var modelprojectinfoviewlayerindex = null;                        //项目模块（查看）
var modelprojectinfoaddlayerindex = null;                         //项目模块（新建）
var modelprojectinfoeditlayerindex = null;                        //项目模块（编辑）

var modeltaskinfoviewlayerindex = null;                           //任务模块（查看）
var modeltaskinfoaddlayerindex = null;                            //任务模块（新建）
var modeltaskinfoeditlayerindex = null;                           //任务模块（编辑）

var modelprojectauthlayerindex = null;                            //模型项目授权模块

var newmodeltaskinfolayerindex = null;                            //处理任务信息

var modelheaderuserlayerindex = null;                             //用户模块
var modelheadernoticelayerindex = null;                           //通知模块
var modelheadersetlayerindex = null;                              //设置模块


var projectentities = [];//项目位置及标注
var currentprojectid = null;//当前项目id
var currentprojecttitle = null;//当前项目标题（用于高亮显示）


var curtileset = null;//当前模型



/*
 * 图标常量
 */
var PROJECTICON = '<span style="margin-left:5px;margin-right:5px;"><img src="../../../Resources/img/map/project.png" style="width:14px;height:14px;"/></span>';
var MODELICON = '<span style="margin-left:5px;margin-right:5px;"><img src="../../../Resources/img/map/model.png" style="width:14px;height:14px;"/></span>';





//重写HomeButton功能
viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
    e.cancel = true;
    if (projectentities.length > 0) {
        viewer.flyTo(projectentities, { duration: 5, offset: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-90), 8000) });
    }
    else {
        //缩放至中国
        FlyToChina();
    }
});


/*
 * 修改样式
 */
document.getElementsByClassName("cesium-viewer-toolbar")[0].style = "right:25px;top:105px;width:50px;height:50px";                                  //修改工具栏样式
document.getElementsByClassName("cesium-button cesium-toolbar-button")[0].style = "width:50px;height:50px";                                         //修改工具栏样式
document.getElementsByClassName("cesium-button cesium-toolbar-button")[1].style = "width:50px;height:50px";                                         //修改工具栏样式
document.getElementsByClassName("cesium-baseLayerPicker-selected")[0].style = "width:50px;height:50px";                                             //修改工具栏样式


//初始定位
setTimeout(FlyToChina(), 3000);
function FlyToChina() {
    viewer.camera.flyTo({
        destination: new Cesium.Rectangle.fromDegrees(73.66, 3.86, 135.05, 53.55)               //定位中国
    }, { duration: 3 });
};


//项目节点高亮
function MarkNode() {
    //选中节点高亮
    var nodes = document.getElementsByClassName("layui-tree-txt");
    for (var i = 0; i < nodes.length; i++) {
        if ((nodes[i].innerHTML === currentprojecttitle)) {
            nodes[i].style.color = "#009688";
            nodes[i].style.fontSize = "15px";
            nodes[i].style.fontWeight = "bold";
        }
    }
};




//关闭指定图层
function CloseLayer(layerindex) {
    if (layerindex != null) {
        layer.close(layerindex);
        layerindex = null;
    }
};
//关闭所有弹出图层
function CloseAllLayer() {
    if (modelprojectinfoviewlayerindex != null) {
        layer.close(modelprojectinfoviewlayerindex);
        modelprojectinfoviewlayerindex = null;
    }
    if (modelprojectinfoaddlayerindex != null) {
        layer.close(modelprojectinfoaddlayerindex);
        modelprojectinfoaddlayerindex = null;
    }
    if (modelprojectinfoeditlayerindex != null) {
        layer.close(modelprojectinfoeditlayerindex);
        modelprojectinfoeditlayerindex = null;
    }

    if (modeltaskinfoaddlayerindex != null) {
        layer.close(modeltaskinfoaddlayerindex);
        modeltaskinfoaddlayerindex = null;
    }
    if (modeltaskinfoeditlayerindex != null) {
        layer.close(modeltaskinfoeditlayerindex);
        modeltaskinfoeditlayerindex = null;
    }
    if (modeltaskinfoviewlayerindex != null) {
        layer.close(modeltaskinfoviewlayerindex);
        modeltaskinfoviewlayerindex = null;
    }

    if (modelprojectauthlayerindex != null) {
        layer.close(modelprojectauthlayerindex);
        modelprojectauthlayerindex = null;
    }

    if (newmodeltaskinfolayerindex != null) {
        layer.close(newmodeltaskinfolayerindex);
        newmodeltaskinfolayerindex = null;
    }

    if (modelheaderuserlayerindex != null) {
        layer.close(modelheaderuserlayerindex);
        modelheaderuserlayerindex = null;
    }
    if (modelheadernoticelayerindex != null) {
        layer.close(modelheadernoticelayerindex);
        modelheadernoticelayerindex = null;
    }
    if (modelheadersetlayerindex != null) {
        layer.close(modelheadersetlayerindex);
        modelheadersetlayerindex = null;
    }


    //TODO更多关闭图层
};
//关闭项目信息相关图层
function CloseModelProjectInfoLayer() {
    if (modelprojectinfoviewlayerindex != null) {
        layer.close(modelprojectinfoviewlayerindex);
        modelprojectinfoviewlayerindex = null;
    }
    if (modelprojectinfoaddlayerindex != null) {
        layer.close(modelprojectinfoaddlayerindex);
        modelprojectinfoaddlayerindex = null;
    }
    if (modelprojectinfoeditlayerindex != null) {
        layer.close(modelprojectinfoeditlayerindex);
        modelprojectinfoeditlayerindex = null;
    }
};
//关闭任务信息相关图层
function CloseModelTaskInfoLayer() {
    if (modeltaskinfoviewlayerindex != null) {
        layer.close(modeltaskinfoviewlayerindex);
        modeltaskinfoviewlayerindex = null;
    }
    if (modeltaskinfoaddlayerindex != null) {
        layer.close(modeltaskinfoaddlayerindex);
        modeltaskinfoaddlayerindex = null;
    }
    if (modeltaskinfoeditlayerindex != null) {
        layer.close(modeltaskinfoeditlayerindex);
        modeltaskinfoeditlayerindex = null;
    }
    if (newmodeltaskinfolayerindex != null) {
        layer.close(newmodeltaskinfolayerindex);
        newmodeltaskinfolayerindex = null;
    }
};
