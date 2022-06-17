viewer.scene.globe.depthTestAgainstTerrain = false;
document.getElementsByClassName("cesium-viewer-toolbar")[0].style = "right:25px;top:105px;width:50px;height:50px";                                  //修改工具栏样式
document.getElementsByClassName("cesium-button cesium-toolbar-button")[0].style = "width:50px;height:50px";                                         //修改工具栏样式
document.getElementsByClassName("cesium-button cesium-toolbar-button")[1].style = "width:50px;height:50px";                                         //修改工具栏样式
document.getElementsByClassName("cesium-baseLayerPicker-selected")[0].style = "width:50px;height:50px";                                             //修改工具栏样式
setTimeout(FlyToChina(), 3000);
function FlyToChina() {
    viewer.camera.flyTo({ destination: new Cesium.Rectangle.fromDegrees(73.66, 3.86, 135.05, 53.55) }, { duration: 3 });//定位中国
};


/*
 * 全局变量
 */
var handler = null;

var tree = layui.tree;
var form = layui.form;
var table = layui.table;
var util = layui.util;
var date = layui.laydate;
var elem = layui.element;

var tipslayer = -1;//全局提示层
var loadlayerindex = null;//全部加载层

var depthTestAgainstTerrain;//深度检测值

var findprojectinfoviewlayerindex = null;      //项目模块（查看）
var findprojectinfoaddlayerindex = null;       //项目模块（新建）
var findprojectinfoeditlayerindex = null;      //项目模块（编辑）

var findprojectauthlayerindex = null;          //项目授权模块

var headeruserlayerindex = null;           //用户模块
var headernoticelayerindex = null;         //通知模块
var headerselayerindex = null;            //设置模块


var findprojectlist = [];      //项目数据

var projectentities = [];           //项目位置及标注
var newprojectentity = null;        //临时项目位置
var currentprojectid = null;        //当前项目id
var currentprojecttitle = null;     //当前项目标题
var currentmodelid = null;          //当前模型id
var curtileset = null;              //当前模型

var current_project_tile = null; //当前模型-航线规划系统***********

var current_entities_route = [];//当前路径
var isReloadTree = false;//是否tree重载（默认否）用于处理由于tree重载触发的选中事件



//图标
var MODELICON = '<span style="margin-left:5px;margin-right:5px;"><img src="../../../Resources/img/map/model.png" style="width:14px;height:14px;"/></span>';


//HomeButton功能
viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
    e.cancel = true;

    if (current_entities_route.length > 0) {
        ZoomToEntities(current_entities_route);
    }
    else if (currentprojecttitle != null) {
        viewer.zoomTo(currentprojecttitle);       
    }
    else {
        FlyToChina();//定位中国
    }
});


//关闭指定图层
function CloseLayer(layerindex) {
    if (layerindex != null) {
        layer.close(layerindex);
        layerindex = null;
    }
};
//关闭所有图层
function CloseAllLayer() {
    if (findprojectinfoviewlayerindex != null) {
        layer.close(findprojectinfoviewlayerindex);
        findprojectinfoviewlayerindex = null;
    }
    if (findprojectinfoaddlayerindex != null) {
        layer.close(findprojectinfoaddlayerindex);
        findprojectinfoaddlayerindex = null;
    }
    if (findprojectinfoeditlayerindex != null) {
        layer.close(findprojectinfoeditlayerindex);
        findprojectinfoeditlayerindex = null;
    }
}

//缩放至目标目范围
function FlytoExtent(west, south, east, north) {
    viewer.camera.flyTo({ destination: new Cesium.Rectangle.fromDegrees(west, south, east, north) }, { duration: 3 });
};

//高亮节点
function MarkNode() {
    //选中节点高亮
    var nodes = document.getElementsByClassName("layui-tree-txt");
    for (var i = 0; i < nodes.length; i++) {
        if ((nodes[i].innerHTML === currentprojecttitle)) {
            nodes[i].style.color = "#009688";
            nodes[i].style.fontSize = "15px";
            nodes[i].style.fontWeight = "bold";
        }
        else {
            nodes[i].style.color = "#555555";
            nodes[i].style.fontSize = "14px";
            nodes[i].style.fontWeight = "normal";
        }
    }
};

//高亮并展开当前项目
function MarkCurrentProject() {
    if (currentprojectid != null) {
        for (var i in findprojectlist) {
            for (var j in findprojectlist[i].children) {
                if (findprojectlist[i].id == currentprojectid) {
                    findprojectlist[i].spread = true;
                }
                else {
                    findprojectlist[i].spread = false;
                }
            }
        }
    }

    tree.reload('projectlistid', { data: findprojectlist });
    MarkNode();//高亮当前节点
};