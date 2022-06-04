viewer.scene.globe.depthTestAgainstTerrain = false;
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

