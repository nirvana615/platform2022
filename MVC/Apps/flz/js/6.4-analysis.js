//分析widget
function showXueLongTrack(map, data) {
    require([
        "dojo/_base/array",
        "esri/layers/GraphicsLayer",
        "esri/geometry/Polyline", "esri/geometry/Point",
        "esri/symbols/SimpleLineSymbol",
        "esri/graphic",
        "esri/Color",
        "esri/request"


    ], function (arrayUtils,
        GraphicsLayer,
        Polyline, Point,
        SimpleLineSymbol,
        Graphic,
        Color,
        esriRequest
    ) {
            var pointData = data["GPS"];
            Proj4js.defs["ESRI:102021"] = "+proj=stere +lat_0=-90 +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs";
            /*原始点坐标*/
            var source = new Proj4js.Proj("EPSG:4326");
            /*点投影的目标坐标*/
            var dest = new Proj4js.Proj("ESRI:102021");
            /* 获取的数据，转换成我要的ponit格式,再投影转换*/
            var pointInfo = {};
            pointInfo.data = arrayUtils.map(pointData, function (p) {
                /*点坐标格式转换*/
                var pointX = parseFloat(p.longitudeValue);
                var pointY = parseFloat(p.latitudeValue);


                var myPoint = new Proj4js.Point(pointX, pointY);
                /* 转换后，point 和afePro 一样了*/
                var afePro = Proj4js.transform(source, dest, myPoint);


                var point = {
                    "x": afePro.x,
                    "y": afePro.y,
                    "spatialReference": { "wkid": 102021 }
                };
                return {
                    "point": point
                };
            });
            /*转换数据为我需要的json格式，用以化路径*/
            var len = pointInfo.data.length;
            var p;
            var polyLineJson = {
                "paths": [[]],
                "spatialReference": { "wkid": 102021 }
            };

            //数组连接

            for (var i = 0; i < len; i++) {
                p = [pointInfo.data[i].point.x, pointInfo.data[i].point.y];
                polyLineJson.paths[0].push(p);
            }
            var polyLine = new esri.geometry.Polyline(polyLineJson);


            var symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([0, 255, 0]),
                2
            );
            //create graphic
            var line = new esri.Graphic(polyLine, symbol);
            //add graphic to map
            map.graphics.add(line);


        });

}




function getData(map) {
    $.ajax({
        type: "post",
        url: "后台地址",
        dataType: "json",
        error: function (error) {
            console.log("error", error);
        },
        success: function (data) {
            showXueLongTrack(map, data);
        }


    });
}
