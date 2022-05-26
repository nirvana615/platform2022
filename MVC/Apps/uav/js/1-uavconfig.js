viewer.scene.globe.depthTestAgainstTerrain = true;//默认深度检测（地形）
document.getElementsByClassName("cesium-viewer-toolbar")[0].style = "right:25px;top:105px;width:50px;height:50px";                                  //修改工具栏样式
document.getElementsByClassName("cesium-button cesium-toolbar-button")[0].style = "width:50px;height:50px";                                         //修改工具栏样式
document.getElementsByClassName("cesium-button cesium-toolbar-button")[1].style = "width:50px;height:50px";                                         //修改工具栏样式
document.getElementsByClassName("cesium-baseLayerPicker-selected")[0].style = "width:50px;height:50px";                                             //修改工具栏样式
setTimeout(FlyToChina(), 3000);
function FlyToChina() {
    viewer.camera.flyTo({ destination: new Cesium.Rectangle.fromDegrees(73.66, 3.86, 135.05, 53.55) }, { duration: 3 });//定位中期
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

var uavprojectauthlayerindex = null;     //项目授权模块
var uavprojectaddlayerindex = null;      //项目（新建）模块
var uavprojectviewlayerindex = null;     //项目（查看）模块
var uavprojecteditlayerindex = null;     //项目（编辑）模块
var selectroutetypelayerindex = null;    //航线（选择）模块
var uavrouteaddlayerindex = null;        //航线（新建）模块
var uavrouteviewlayerindex = null;       //航线（查看）模块
var uavrouteeditlayerindex = null;       //航线（编辑）模块

var headeruserlayerindex = null;//用户模块
var headerselayerindex = null;//设置模块


var uav_project_list_all = [];//航线项目数据（包括项目、模型、路径）

var current_project_id = null;                  //当前项目
var current_project_title = null;               //当前项目标题（用于高亮显示）
var current_model_id = null;                    //当前模型id
var current_project_tile = null;                //当前模型
var current_waypoint_title = null;              //当前航点标题（用于高亮显示）

var current_entities_route = [];//当前路径

var isReloadTree = false;//是否tree重载（默认否）用于处理由于tree重载触发的选中事件


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





//HomeButton
viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
    e.cancel = true;

    if (current_entities_route.length > 0) {
        ZoomToEntities(current_entities_route);
    }
    else if (current_project_tile != null) {
        if (current_project_tile.data.MXSJ != undefined && current_project_tile.data.MXSJ != "") {
            viewer.scene.camera.setView(JSON.parse(current_project_tile.data.MXSJ));
        }
        else {
            viewer.zoomTo(current_project_tile);
        }
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
        if ((nodes[i].innerHTML === current_project_title) || (nodes[i].innerHTML === current_waypoint_title)) {
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
    for (var i in uav_project_list_all) {
        if (uav_project_list_all[i].id == current_project_id) {
            uav_project_list_all[i].spread = true;
            current_project_title = uav_project_list_all[i].title;
        }
        else {
            uav_project_list_all[i].spread = false;
        }
    }

    tree.reload('uav-project-list-treeid', { data: uav_project_list_all });
    MarkNode();//高亮当前节点 
};



//关闭指定图层
function CloseLayer(layerindex) {
    if (layerindex != null) {
        layer.close(layerindex);
        layerindex = null;
    }
};
//关闭所有图层
function CloseAllLayer() {
    if (uavprojectauthlayerindex != null) {
        layer.close(uavprojectauthlayerindex);
        uavprojectauthlayerindex = null;
    }

    if (uavprojectaddlayerindex != null) {
        layer.close(uavprojectaddlayerindex);
        uavprojectaddlayerindex = null;
    }
    if (uavprojectviewlayerindex != null) {
        layer.close(uavprojectviewlayerindex);
        uavprojectviewlayerindex = null;
    }
    if (uavprojecteditlayerindex != null) {
        layer.close(uavprojecteditlayerindex);
        uavprojecteditlayerindex = null;
    }

    if (selectroutetypelayerindex != null) {
        layer.close(selectroutetypelayerindex);
        selectroutetypelayerindex = null;
    }

    if (uavrouteaddlayerindex != null) {
        layer.close(uavrouteaddlayerindex);
        uavrouteaddlayerindex = null;
    }
    if (uavrouteviewlayerindex != null) {
        layer.close(uavrouteviewlayerindex);
        uavrouteviewlayerindex = null;
    }
    if (uavrouteeditlayerindex != null) {
        layer.close(uavrouteeditlayerindex);
        uavrouteeditlayerindex = null;
    }

    if (headeruserlayerindex != null) {
        layer.close(headeruserlayerindex);
        headeruserlayerindex = null;
    }

    if (headerselayerindex != null) {
        layer.close(headerselayerindex);
        headerselayerindex = null;
    }

    //TODO
};
