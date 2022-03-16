//桌面右下角随鼠标移动动态显示经纬度、高程、视角高度
//需先加载地形
//地球div id=“map”
//直接引入js即可
//

//在地图div中增加html代码
$("#map").append('<div id="latlng_show" style="width:500px;height:20px;position:absolute;border:0px #ff0000 solid;right:0px;bottom:20px; z-index:1;font-size:15px;"> <div style="width:110px;height:30px;float:left"> <font size="2" color="white"> 经度：<span id="longitude_show"></span> </font> </div> <div style="width:110px;height:30px;float:left"> <font size="2" color="white"> 纬度：<span id="latitude_show"></span> </font> </div> <div style="width:130px;height:30px;float:left"> <font size="2" color="white"> 海拔：<span id="elevation_show"></span> </font> </div> <div style="width:150px;height:30px;float:left"> <font size="2" color="white"> 视角高：<span id="altitude_show"></span> </font> </div> </div>');

var longitude_show = document.getElementById('longitude_show');
var latitude_show = document.getElementById('latitude_show');
var altitude_show = document.getElementById('altitude_show');
var elevation_show = document.getElementById('elevation_show');

var canvas = viewer.scene.canvas;
var ellipsoid = viewer.scene.globe.ellipsoid;
const handler_latlong = new Cesium.ScreenSpaceEventHandler(canvas);
handler_latlong.setInputAction(function (movement) {
    //捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标
    var cartesian = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
    if (cartesian) {
        //将笛卡尔三维坐标转为地图坐标（弧度）
        var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
        //将地图坐标（弧度）转为十进制的度数
        var lat_String = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);//纬度
        var log_String = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);//经度
        var alti_String = (viewer.camera.positionCartographic.height).toFixed(2);//视角高度

        var elec_String = "";
        if (viewer.scene.globe.getHeight(cartographic) != undefined) {
            elec_String = viewer.scene.globe.getHeight(cartographic).toFixed(4);//海拔高度
        }

        longitude_show.innerHTML = log_String;
        latitude_show.innerHTML = lat_String;
        altitude_show.innerHTML = alti_String+"m";
        elevation_show.innerHTML = elec_String+"m";   
    }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);