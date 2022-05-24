viewer.scene.globe.depthTestAgainstTerrain = false;//默认深度检测（模型）
document.getElementsByClassName("cesium-viewer-toolbar")[0].style = "right:25px;top:105px;width:50px;height:50px";                                  //修改工具栏样式
document.getElementsByClassName("cesium-button cesium-toolbar-button")[0].style = "width:50px;height:50px";                                         //修改工具栏样式
document.getElementsByClassName("cesium-button cesium-toolbar-button")[1].style = "width:50px;height:50px";                                         //修改工具栏样式
document.getElementsByClassName("cesium-baseLayerPicker-selected")[0].style = "width:50px;height:50px";                                             //修改工具栏样式
setTimeout(FlyToChina(), 3000);
function FlyToChina() {
    viewer.camera.flyTo({ destination: new Cesium.Rectangle.fromDegrees(73.66, 3.86, 135.05, 53.55) }, { duration: 3 });//定位中国
};


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

var tipslayer = -1;//全局提示层
var loadlayerindex = null;//全部加载层
var depthTestAgainstTerrain;//深度检测值

var modelprojectinfoviewlayerindex = null;      //项目模块（查看）
var modelprojectinfoaddlayerindex = null;       //项目模块（新建）
var modelprojectinfoeditlayerindex = null;      //项目模块（编辑）

var modeltaskinfoviewlayerindex = null;         //任务模块（查看）
var modeltaskinfoaddlayerindex = null;          //任务模块（新建）
var modeltaskinfoeditlayerindex = null;         //任务模块（编辑）
var modeltaskinfoprocesslayerindex = null;      //任务模块（处理）

var modelprojectauthlayerindex = null;          //项目授权模块

var modeltaskprocesslayerindex = null;          //处理任务信息

var modelheaderuserlayerindex = null;           //用户模块
var modelheadernoticelayerindex = null;         //通知模块
var modelheadersetlayerindex = null;            //设置模块


var modelprojectlistarea = [];      //按地区组织
var modelprojectlistyear = [];      //按时间组织
var projectentities = [];           //项目位置及标注
var newprojectentity = null;        //临时项目位置
var currentprojectid = null;        //当前项目id
var currentprojecttitle = null;     //当前项目标题
var currentmodelid = null;          //当前模型id
var curtileset = null;              //当前模型

var isReloadTree = false;//是否tree重载（默认否）用于处理由于tree重载触发的选中事件

var searchresult = [];//搜索结果

//图标
var MODELICON = '<span style="margin-left:5px;margin-right:5px;"><img src="../../../Resources/img/map/model.png" style="width:14px;height:14px;"/></span>';


//重写HomeButton功能
viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
    e.cancel = true;
    if (projectentities.length > 0) {
        viewer.flyTo(projectentities, { duration: 5, offset: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-90), 8000) });
    }
    else {
        FlyToChina();//定位中国
    }
});


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

        if (searchresult.length > 0) {
            if (searchresult.indexOf(nodes[i].innerHTML) != -1) {
                nodes[i].style.borderBottom = "2px solid #FFB800";
            }
            else {
                nodes[i].style.borderBottom = "0px solid #FFFFFF";
            }
        }
    }
};

//高亮并展开当前项目
function MarkCurrentProject() {
    if (currentprojectid != null) {
        for (var i in modelprojectlistarea) {
            for (var j in modelprojectlistarea[i].children) {
                if (modelprojectlistarea[i].children[j].id == currentprojectid) {
                    modelprojectlistarea[i].children[j].spread = true;
                    modelprojectlistarea[i].spread = true;
                }
                else {
                    modelprojectlistarea[i].children[j].spread = false;
                }
            }
        }

        for (var i in modelprojectlistyear) {
            for (var j in modelprojectlistyear[i].children) {
                if (modelprojectlistyear[i].children[j].id == currentprojectid) {
                    modelprojectlistyear[i].children[j].spread = true;
                    modelprojectlistyear[i].spread = true;
                }
                else {
                    modelprojectlistyear[i].children[j].spread = false;
                }
            }
        }
    }

    tree.reload('areaprojectlistid', { data: modelprojectlistarea });
    tree.reload('yearprojectlistid', { data: modelprojectlistyear });

    MarkNode();//高亮当前节点 
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

    if (modeltaskprocesslayerindex != null) {
        layer.close(modeltaskprocesslayerindex);
        modeltaskprocesslayerindex = null;
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


//缩放至目标目范围
function FlytoExtent(west, south, east, north) {
    viewer.camera.flyTo({ destination: new Cesium.Rectangle.fromDegrees(west, south, east, north) }, { duration: 3 });
};