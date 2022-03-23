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

var monitorprojectauthlayerindex = null;    //监测项目授权模块

var projectinfoviewlayerindex = null;                           //项目信息模块（查看）
var projectinfoaddlayerindex = null;                            //项目信息模块（新建）
var projectinfoeditlayerindex = null;                           //项目信息模块（编辑）

var projectlayerlistlayerindex = null;                          //项目图层列表模块

var automonitordatalayerindex = null;                           //自动化监测数据可视化模块
var automonitordevicelayerindex = null;                         //自动化监测设备可视化模块

var warninganalysislayerindex = null;                           //预警分析模块

var automonitoreltlayerindex = null;                            //自动化监测ETL模块

var headeruserlayerindex = null;                                //用户信息
var headernoticelayerindex = null;                              //通知消息
var headerselayerindex = null;                                  //设置


var projectentities = [];//项目位置及标注

var currentprojectid = null;//当前项目id
var currentprojectdisastertype = null;//当前项目灾害类型
var currentprojectmonitors = [];//当前项目监测点树（除报警器、GNSS基站）
var currentprojectfristmonitor = null;//当前项目默认第一个监测点

var curtileset = null;//当前模型
var modleInfo = null;//当前模型数据

/*
 * 图标常量
 */
var LANDSLIDEICON = '<span style="margin-left:5px;margin-right:5px;"><img src="../../../Resources/img/map/project_type_landslide.png" style="width:14px;height:14px;"/></span>';
var ROCKFALLICON = '<span style="margin-left:5px;margin-right:5px;"><img src="../../../Resources/img/map/project_type_rockfall.png" style="width:14px;height:14px;"/></span>';



viewer.scene.globe.depthTestAgainstTerrain = false;                     //影响无模型pickPosition(默认false，当需要从地形pickPosition获取位置时设置true)

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




/*
 * 加载3d tiles模型
 */
function LoadModel(obj) {
    //var modelurl = "../Data/SurModel" + obj.path;
    var modelurl = datasurl + "/SurModel" + obj.path;

    //删除上一个模型（保证只有一个模型）
    if (curtileset != null) {
        viewer.scene.primitives.remove(curtileset);
        modleInfo = null;
    }

    //添加模型
    curtileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: modelurl,
        maximumScreenSpaceError: isMobile.any() ? 1 : 1,
        maximumNumberOfLoadedTiles: isMobile.any() ? 1000 : 1000
    }));
    modleInfo = obj;

    //缩放至模型

    if (obj.modelView != null && obj.modelView.length > 0) {
        var home = JSON.parse(obj.modelView);
        viewer.scene.camera.setView(home);
        console.log(home);
    } else {
        viewer.zoomTo(curtileset);
    }


};