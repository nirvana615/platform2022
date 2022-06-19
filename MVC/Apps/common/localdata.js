/*
 * 必须先引用layui
 * 必须先创建viewer变量
 * 必须先引入common.js
 * 必须引入togeojson.js
 */

var localdatawidget_layerindex = null;

var kmltreedatas = [];
var jsontreedatas = [];
var kmlentities = [];


var POINTICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/icon/point.png" style="width:14px;height:14px;"/></span>';
var POLYLINEICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/icon/polyline.png" style="width:14px;height:14px;"/></span>';
var POLYGONICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/icon/polygon.png" style="width:14px;height:14px;"/></span>';


var defaultcolors = [Cesium.Color.AQUA, Cesium.Color.CHARTREUSE, Cesium.Color.DARKORANGE, Cesium.Color.DEEPSKYBLUE, Cesium.Color.FUCHSIA, Cesium.Color.GOLD, Cesium.Color.GREEN, Cesium.Color.GREENYELLOW, Cesium.Color.MAGENTA, Cesium.Color.MEDIUMPURPLE, Cesium.Color.ORANGERED, Cesium.Color.ROYALBLUE, Cesium.Color.TEAL, Cesium.Color.YELLOW, Cesium.Color.YELLOWGREEN, Cesium.Color.TRANSPARENT];



////初始化
//Initkmltreedata();
//function Initkmltreedata() {
//    var addkml = new Object;
//    addkml.type = "addkml";
//    addkml.title = "添加数据";
//    kmltreedatas.push(addkml);

//    var dragkml = new Object;
//    dragkml.type = "dragkml";
//    dragkml.title = "拖拽数据";
//    kmltreedatas.push(dragkml);
//};




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
        , offset: 'auto'
        , closeBtn: 1
        , maxmin: true
        , moveOut: true
        , resize: false
        , content: '<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBriefitem" style="margin:0px;"><ul class="layui-tab-title" style="float: left;width:120px;border-color:white;"><li class="layui-this" style="display: block;">KML</li><li style="display: block;">JSON</li><li style="display: block;">自定义</li></ul><div class="layui-tab-content" style="height:290px;width:400px;float: left;border-left:solid;border-left-color:#e6e6e6;border-left-width:1px;"><div class="layui-tab-item layui-show"><!--KML--><div class="layui-btn-container" style="text-align:right;"><button type="button" class="layui-btn layui-btn-normal layui-btn-sm" id="selectkmldata" style="width:110px;"><i class="layui-icon" style="font-size: 14px!important;"></i> 添加kml数据</button><button type="button" class="layui-btn layui-btn-danger layui-btn-sm" id="clearkmldatas" style="width:110px;"><i class="layui-icon" style="font-size: 14px!important;"></i> 清空kml数据</button></div><div class="layui-row layui-col-space15"><div class="layui-col-md7"><div class="grid-demo grid-demo-bg1"><div id="kmldatastree" style="height:300px;max-height:300px;border:1px solid #e6e6e6;"></div></div></div><div class="layui-col-md5"><div class="grid-demo"><div id="kmldatastyle" style="height:300px;max-height:300px;border:1px solid #e6e6e6;"></div></div></div></div></div><div class="layui-tab-item"><!--JSON--><div class="layui-btn-container" style="text-align:right;"><button type="button" class="layui-btn layui-btn-normal layui-btn-sm" id="selectjsondata"><i class="layui-icon" style="font-size: 14px!important;"></i> 添加json数据</button><button type="button" class="layui-btn layui-btn-danger layui-btn-sm" id="clearjsondatas"><i class="layui-icon" style="font-size: 14px!important;"></i> 清空json数据</button></div><div class="layui-row layui-col-space15"><div class="layui-col-md7"><div class="grid-demo grid-demo-bg1"><div id="jsondatastree" style="height:300px;max-height:300px;border:1px solid #e6e6e6;"></div></div></div><div class="layui-col-md5"><div class="grid-demo"><div id="jsondatastyle" style="height:300px;max-height:300px;border:1px solid #e6e6e6;"></div></div></div></div></div><div class="layui-tab-item"><!--自定义--></div></div></div>'
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);

            //kml-tree
            tree.render({
                elem: '#kmldatastree'
                , id: 'kmldatastreeid'
                , data: kmltreedatas
                , accordion: false
                , showLine: true
                , edit: ['add', 'update', 'del']
                , showCheckbox: true
                , customCheckbox: true
                , customSpread: false
                , customOperate: true
                , cancelNodeFileIcon: true
                , click: function (obj) {
                    //节点点击
                }
                , operate: function (obj) {
                    //节点操作
                }
                , oncheck: function (obj) {
                    //节点选中or取消选中
                }
            });
            //json-tree
            tree.render({
                elem: '#jsondatastree'
                , id: 'jsondatastreeid'
                , data: jsontreedatas
                , accordion: false
                , showLine: true
                , edit: ['add', 'update', 'del']
                , showCheckbox: true
                , customCheckbox: true
                , customSpread: false
                , customOperate: true
                , cancelNodeFileIcon: true
                , click: function (obj) {
                    //节点点击
                }
                , operate: function (obj) {
                    //节点操作
                }
                , oncheck: function (obj) {
                    //节点选中or取消选中
                }
            });

            //kml-select
            layui.upload.render({
                elem: '#selectkmldata'
                , accept: 'file'
                , acceptMime: '.kml'
                , auto: false
                , multiple: false
                , choose: function (obj) {
                    obj.preview(function (index, file, result) {
                        var color = defaultcolors[Math.floor(Math.random() * 16)];

                        var kml = new Object;
                        kml.title = file.name;
                        kml.id = NewGuid();
                        kml.nodeOperate = true;
                        kml.customItem = true;
                        kml.edit = ['del'];
                        kml.spread = true;

                        var entities = [];

                        var kmljson = ConvertBase64toJson(result.split(';')[1].split(',')[1]);
                        if (kmljson.features != undefined && kmljson.features.length > 0) {
                            var kmlchild = [];

                            for (var i in kmljson.features) {
                                var feature = new Object;
                                feature.title = kmljson.features[i].properties.name;
                                feature.id = NewGuid();
                                feature.type = kmljson.features[i].geometry.type;
                                feature.nodeOperate = true;
                                feature.customItem = true;
                                feature.edit = ['update'];
                                feature.showCheckbox = true;
                                feature.checked = true;

                                if (kmljson.features[i].geometry.type == "Point") {
                                    feature.icon = POINTICON;

                                    var blh = kmljson.features[i].geometry.coordinates;

                                    if (blh[2] == 0) {
                                        var point_entity = new Cesium.Entity({
                                            id: "kml_point_" + feature.id,
                                            position: Cesium.Cartesian3.fromDegrees(blh[0], blh[1]),
                                            billboard: {
                                                image: '../../Resources/img/mark/p12.png',
                                                color: color,
                                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                                width: 30,
                                                height: 30,
                                            },
                                        });
                                        entities.push(point_entity);

                                        var point_entity_label = new Cesium.Entity({
                                            id: "kml_pointlabel_" + feature.id,
                                            position: Cesium.Cartesian3.fromDegrees(blh[0], blh[1]),
                                            label: {
                                                text: feature.title,
                                                font: '20px Times New Roman',
                                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                pixelOffset: new Cesium.Cartesian2(0.0, -40),
                                                scaleByDistance: new Cesium.NearFarScalar(90000, 1, 200000, 0)
                                            }
                                        });
                                        entities.push(point_entity_label);
                                    }
                                    else {
                                        var point_entity = new Cesium.Entity({
                                            id: "kml_point_" + feature.id,
                                            position: Cesium.Cartesian3.fromDegrees(blh[0], blh[1], blh[2]),
                                            point: {
                                                pixelSize: 10,
                                                heightReference: Cesium.HeightReference.NONE,
                                                color: color,
                                            },
                                        });
                                        entities.push(point_entity);

                                        var point_entity_label = new Cesium.Entity({
                                            id: "kml_pointlabel_" + feature.id,
                                            position: Cesium.Cartesian3.fromDegrees(blh[0], blh[1], blh[2]),
                                            label: {
                                                text: feature.title,
                                                font: '20px Times New Roman',
                                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                heightReference: Cesium.HeightReference.NONE,
                                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                pixelOffset: new Cesium.Cartesian2(0.0, -40),
                                                scaleByDistance: new Cesium.NearFarScalar(90000, 1, 200000, 0)
                                            }
                                        });
                                        entities.push(point_entity_label);
                                    }
                                }
                                else if (kmljson.features[i].geometry.type == "LineString") {
                                    feature.icon = POLYLINEICON;

                                    var blhs = kmljson.features[i].geometry.coordinates;
                                    var isaltitude = false;//是否绝对海拔
                                    for (var i in blhs) {
                                        if (blhs[i][2] != 0) {
                                            isaltitude = true;
                                        }
                                    }

                                    if (isaltitude) {
                                        var polyline_entity = new Cesium.Entity({
                                            id: "kml_polyline_" + feature.id,
                                            polyline: {
                                                positions: ArraytoCartesian3s(blhs, isaltitude),
                                                width: 2,
                                                arcType: Cesium.ArcType.RHUMB,
                                                material: color,
                                                show: true,
                                                clampToGround: false,
                                            },
                                        });
                                        entities.push(polyline_entity);
                                    }
                                    else {
                                        var polyline_entity = new Cesium.Entity({
                                            id: "kml_polyline_" + feature.id,
                                            polyline: {
                                                positions: ArraytoCartesian3s(blhs, isaltitude),
                                                width: 2,
                                                arcType: Cesium.ArcType.RHUMB,
                                                material: color,
                                                show: true,
                                                clampToGround: true,
                                                classificationType: Cesium.ClassificationType.BOTH,
                                            },
                                        });
                                        entities.push(polyline_entity);
                                    }
                                }
                                else if (kmljson.features[i].geometry.type == "Polygon") {
                                    feature.icon = POLYGONICON;

                                    var blhs = kmljson.features[i].geometry.coordinates[0];

                                    var polyline_entity = new Cesium.Entity({
                                        id: "kml_polyline_" + feature.id,
                                        polyline: {
                                            positions: ArraytoCartesian3s(blhs, false),
                                            width: 2,
                                            arcType: Cesium.ArcType.RHUMB,
                                            material: color,
                                            show: true,
                                            clampToGround: true,
                                            classificationType: Cesium.ClassificationType.BOTH,
                                        },
                                    });
                                    entities.push(polyline_entity);

                                    var polygon_entity = new Cesium.Entity({
                                        id: "kml_polygon_" + feature.id,
                                        polygon: {
                                            hierarchy: ArraytoCartesian3s(blhs, false),
                                            fill: true,
                                            material: Cesium.Color.fromAlpha(color, 0.1),
                                            outline: false,
                                            show: true,
                                            classificationType: Cesium.ClassificationType.BOTH,
                                        },
                                    });
                                    entities.push(polygon_entity);
                                }
                                kmlchild.push(feature);

                                kml.children = kmlchild;
                            }
                        }

                        if (entities.length > 0) {
                            AddEntitiesInViewer(entities);
                            ZoomToEntities(entities);
                            for (var i in entities) {
                                kmlentities.push(entities[i]);
                            }
                            entities = [];
                        }

                        var newkmltreedatas = [];
                        newkmltreedatas.push(kml);
                        if (kmltreedatas.length > 0) {
                            for (var i in kmltreedatas) {
                                newkmltreedatas.push(kmltreedatas[i]);
                            }
                        }
                        kmltreedatas = newkmltreedatas;

                        tree.reload('kmldatastreeid', { data: kmltreedatas });
                    });
                }
            });

            //json-select
            layui.upload.render({
                elem: '#selectjsondata'
                , accept: 'file'
                , acceptMime: '.json'
                , auto: false
                , multiple: false
                , choose: function (obj) {
                    obj.preview(function (index, file, result) {
                        //console.log(index); //得到文件索引
                        //console.log(file); //得到文件对象
                        //console.log(result); //得到文件base64编码









                    });
                }
            });



        }
        , end: function () {


            localdatawidget_layerindex = null;
        }
    });
};



//base64转json
function ConvertBase64toJson(base64) {
    var string = atob(base64).replace("ï»¿", "");
    var json = toGeoJSON.kml((new DOMParser()).parseFromString(string, 'text/xml'));
    var jsonstring = JSON.stringify(json, null, 4);
    return json;
}

function ArraytoCartesian3s(arrs, isheight) {
    if (isheight) {
        //有高度
        var result = [];
        for (var i in arrs) {
            result.push(arrs[i][0]);
            result.push(arrs[i][1]);
            result.push(arrs[i][2]);
        }
        return Cesium.Cartesian3.fromDegreesArrayHeights(result);
    }
    else {
        //无高度
        var result = [];
        for (var i in arrs) {
            result.push(arrs[i][0]);
            result.push(arrs[i][1]);
        }
        return Cesium.Cartesian3.fromDegreesArray(result);
    }
};
