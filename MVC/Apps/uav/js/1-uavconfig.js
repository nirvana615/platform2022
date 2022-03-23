/*
 * 全局对象
 */
var handler = null;

var tree = layui.tree;
var form = layui.form;
var table = layui.table;
var util = layui.util;
var date = layui.laydate;
var elem = layui.element;

var tipslayer = -1;//全局提示层

var uavprojectauthlayerindex = null;    //项目授权模块
var uavprojectaddlayerindex = null;     //项目（新建）模块
var uavprojectviewlayerindex = null;    //项目（查看）模块
var uavprojecteditlayerindex = null;    //项目（编辑）模块
var selectroutetypelayerindex = null;   //航线（选择）模块
var uavrouteaddlayerindex = null;       //航线（新建）模块
var uavrouteviewlayerindex = null;      //航线（查看）模块
var uavrouteeditlayerindex = null;      //航线（编辑）模块

var headeruserlayerindex = null;        //用户模块
var headerselayerindex = null;          //设置模块


var uav_project_list_all = [];//用户全部项目列表


var current_project_id = null;//当前项目
var current_project_title = null;//当前项目标题（用于高亮显示）
var current_waypoint_title = null;//当前航点标题（用于高亮显示）
var current_project_tile = null;//当前模型
var current_project_pointcloudid = null;//当前点云

var current_entities_route = [];//当前路径

//TODO var current_primitives = [];//当前模型


viewer.scene.globe.depthTestAgainstTerrain = true;                     //影响无模型pickPosition(默认false，当需要从地形pickPosition获取位置时设置true)

/*
 * 图标常量
 */
var TAKEOFFICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/uav/takeoff.png" style="width:14px;height:14px;"/></span>';
var LANDINGICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/uav/landing.png" style="width:14px;height:14px;"/></span>';
var TARGETICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/uav/target.png" style="width:14px;height:14px;"/></span>';
var AVOIDICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/uav/avoid.png" style="width:14px;height:14px;"/></span>';
var TARGETAREAICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/uav/targetarea.png" style="width:14px;height:14px;"/></span>';


/*
 * 默认参数
 */
var routespeed = 15;             //(默认值)航线速度，单位m/s
var takeoffheight = 400;         //(默认值)起飞点高度，单位m
var avoidheight = 150;           //(默认值)避障点高度，单位m
var landingheight = 100;         //(默认值)降落点高度，单位m
var adjustdistance = 5;         //(默认值)调整距离，单位m
var photodistance = 50;           //(默认值)拍照距离，单位m
var adjustspeed = 1;            //(默认值)调整速度，单位m/s
var hovertime = 3000;           //(默认值)悬停时间，单位ms
var yawangle = 180;             //(默认值)偏航角，单位°  [-180,180]
var pitchangle = 0;             //(默认值)偏航角，单位°    [-90,0]

//var target_offset_x = 5;        //(默认值)目标点x轴范围，单位m
//var target_offset_y = 5;        //(默认值)目标点y轴范围，单位m
//var target_offset_z = 5;        //(默认值)目标点z轴范围，单位m


var gsd = 5;                    //地面分辨率，单位cm
var forwardoverlap = 80;        //航向重叠度，百分比
var sideoverlap = 70;           //旁向重叠度，百分比
var multiangle = false;          //首末航向多角度
var doublegrid = false;         //井字形
var directmodify = false;       //方向修正（计算第二次自定义平面坐标系y正轴点出错导致的方向错误）

var level = true;              //是否水平





//重写HomeButton功能
viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
    e.cancel = true;
    if (projectentities.length > 0) {
        viewer.flyTo(projectentities, { duration: 5, offset: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-90), 3000) });
    }
    else {
        //缩放至中国
        FlyToChina();
    }
});

///*
// * 修改样式
// */
////document.getElementsByClassName("cesium-viewer-fullscreenContainer")[0].style = "right:5px;top:7px;width:32px;height:32px;border-radius:14%;";    //修改全屏按钮样式
//document.getElementsByClassName("cesium-viewer-toolbar")[0].style = "right:100px;top:31px;width:50px;height:50px";                                  //修改工具栏样式
//document.getElementsByClassName("cesium-button cesium-toolbar-button")[0].style = "width:50px;height:50px";                                         //修改工具栏样式
//document.getElementsByClassName("cesium-button cesium-toolbar-button")[1].style = "right:60px;top:-54px;width:50px;height:50px";                    //修改工具栏样式
//document.getElementsByClassName("cesium-baseLayerPicker-selected")[0].style = "width:50px;height:50px";                                             //修改工具栏样式
/*
 * 修改样式
 */
//document.getElementsByClassName("cesium-viewer-fullscreenContainer")[0].style = "right:5px;top:7px;width:32px;height:32px;border-radius:14%;";    //修改全屏按钮样式
//document.getElementsByClassName("cesium-viewer-toolbar")[0].style = "right:25px;top:245px;width:50px;height:50px";                                  //修改工具栏样式
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
//home按钮功能
viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (commandInfo) {
    FlyToChina();
    commandInfo.cancel = true;
});





////加载3d tiles模型
//function LoadModel(obj) {
//    viewer.scene.globe.depthTestAgainstTerrain = false;

//    //var modelurl = "../Data/SurModel" + obj.mxlj;//本地加载
//    var modelurl = datasurl + "/SurModel" + obj.mxlj;//远程加载

//    //删除上一个模型（当前机制只允许一个模型）
//    if (current_project_tile != null) {
//        //根据路径判断是否为同一模型
//        if (current_project_tile._url != modelurl) {
//            viewer.scene.primitives.remove(current_project_tile);
//            current_project_tile = null;
//            current_project_pointcloudid = null;

//            //添加模型
//            current_project_tile = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
//                url: modelurl,
//                maximumScreenSpaceError: isMobile.any() ? 1 : 1,
//                maximumNumberOfLoadedTiles: isMobile.any() ? 1000 : 1000
//            }));

//            viewer.zoomTo(current_project_tile);
//            //当前点云id
//            current_project_pointcloudid = obj.pointcloudid;
//        }
//    }
//    else {
//        //添加模型
//        current_project_tile = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
//            url: modelurl,
//            maximumScreenSpaceError: isMobile.any() ? 1 : 1,
//            maximumNumberOfLoadedTiles: isMobile.any() ? 1000 : 1000
//        }));

//        viewer.zoomTo(current_project_tile);
//        //当前点云id
//        current_project_pointcloudid = obj.pointcloudid;
//    }
//};






























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

