/*
 * 地图
 */
var baseMaps = new Array(
    new Cesium.ProviderViewModel({
        name: '天地图矢量',
        iconUrl: Cesium.buildModuleUrl('../../Resources/img/cesium/chinaVector.png'),
        tooltip: '天地图全球矢量地图服务',
        creationFunction: function () {
            var imageryProviders = [];
            //天地图矢量
            imageryProviders.push(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://t0.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=138994fd58a355f0f5d7b6d5bfe4d840",
                layer: "tdtVecBasicLayer",
                style: "default",
                format: "image/jpeg",
                tileMatrixSetID: "GoogleMapsCompatible",
            }));
            //天地图矢量中文标注
            imageryProviders.push(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://t0.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=138994fd58a355f0f5d7b6d5bfe4d840",
                layer: "tdtAnnoLayer",
                style: "default",
                format: "image/jpeg",
                tileMatrixSetID: "GoogleMapsCompatible"
            }));
            return imageryProviders;
        }
    }),
    new Cesium.ProviderViewModel({
        name: '天地图影像',
        iconUrl: Cesium.buildModuleUrl('../../Resources/img/cesium/chinaImage.png'),
        tooltip: '天地图全球影像地图服务',
        creationFunction: function () {
            var imageryProviders = [];
            //天地图影像
            imageryProviders.push(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=138994fd58a355f0f5d7b6d5bfe4d840",
                layer: "tdtBasicLayer",
                style: "default",
                format: "image/jpeg",
                tileMatrixSetID: "GoogleMapsCompatible",
                maximumLevel: 16,
            }));
            //天地图影像中文标注
            imageryProviders.push(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://t0.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=138994fd58a355f0f5d7b6d5bfe4d840",
                layer: "tdtAnnoLayer",
                style: "default",
                format: "image/jpeg",
                tileMatrixSetID: "GoogleMapsCompatible",
                maximumLevel: 16,
            }));
            return imageryProviders;
        }
    }),
    new Cesium.ProviderViewModel({
        name: '天地图影像（重庆）',
        iconUrl: Cesium.buildModuleUrl('../../Resources/img/cesium/cqImage.png'),
        creationFunction: function () {
            var imageryProviders = [];
            //天地图影像（底图）
            imageryProviders.push(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=138994fd58a355f0f5d7b6d5bfe4d840",
                layer: "tdtBasicLayer",
                style: "default",
                format: "image/jpeg",
                tileMatrixSetID: "GoogleMapsCompatible",
                maximumLevel: 16,
            }));

            //重庆天地图
            imageryProviders.push(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://www.digitalcq.com/tianditu/kxrgo/d4028ca7ce8e4853b868d205426993a4/WMTS/tile/1.0.0/TDT_CQMap_IMG/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}",
                layer: "TDT_CQMap_IMG",
                style: "default",
                tileMatrixSetID: "default028mm",
                format: "image/jpgpng",
                tilingScheme: new Cesium.GeographicTilingScheme(),
                maximumLevel: 17,
                tileMatrixLabels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"],
            }));

            ////重庆天地图注记
            //imageryProviders.push(new Cesium.WebMapTileServiceImageryProvider({
            //    url: "http://www.digitalcq.com/tianditu/ewfwz/a31647270b994833b1d291c44790de69/WMTS/tile/1.0.0/TDT_CQMap_IMG_LABEL/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}",
            //    layer: "TDT_CQMap_IMG_LABEL",
            //    style: "default",
            //    tileMatrixSetID: "default028mm",
            //    format: "image/jpgpng",
            //    tilingScheme: new Cesium.GeographicTilingScheme(),
            //    maximumLevel: 17,
            //    tileMatrixLabels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"],
            //}));

            //天地图影像中文标注
            imageryProviders.push(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://t0.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=138994fd58a355f0f5d7b6d5bfe4d840",
                layer: "tdtAnnoLayer",
                style: "default",
                format: "image/jpeg",
                tileMatrixSetID: "GoogleMapsCompatible",
                //maximumLevel: 16,
            }));

            return imageryProviders;
        }
    }),
    new Cesium.ProviderViewModel({
        name: 'Google影像',
        iconUrl: Cesium.buildModuleUrl('../../Resources/img/cesium/google_earth_pro.ico'),
        creationFunction: function () {
            var imageryProviders = [];
            //Google影像
            imageryProviders.push(new Cesium.UrlTemplateImageryProvider({
                url: "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"
            }));
            //天地图影像中文标注
            imageryProviders.push(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://t0.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=138994fd58a355f0f5d7b6d5bfe4d840",
                layer: "tdtAnnoLayer",
                style: "default",
                format: "image/jpeg",
                tileMatrixSetID: "GoogleMapsCompatible",
                //maximumLevel: 16,
            }));
            return imageryProviders;
        }
    }),
    new Cesium.ProviderViewModel({
        name: 'Bing影像',
        iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingAerialLabels.png'),
        creationFunction: function () {
            return new Cesium.BingMapsImageryProvider({
                key: "AsIZsAbumjggRVNlqygRPotPRyU9S8hWadxcxfdOafquIz7JfxtxNwudfFZ68P1i",
                url: 'https://dev.virtualearth.net',
                mapStyle: Cesium.BingMapsStyle.AERIAL_WITH_LABELS
            });
        }
    }),
    new Cesium.ProviderViewModel({
        name: 'Mapbox卫星',
        iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/mapboxSatellite.png'),
        creationFunction: function () {
            return new Cesium.MapboxImageryProvider({
                mapId: 'mapbox.satellite'
            });
        }
    }),
    new Cesium.ProviderViewModel({
        name: 'ESRI影像',
        iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriWorldImagery.png'),
        creationFunction: function () {
            return new Cesium.ArcGisMapServerImageryProvider({
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
                enablePickFeatures: false
            });
        }
    }),
    //new Cesium.ProviderViewModel({
    //    name: 'ESRI街道',
    //    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriWorldStreetMap.png'),
    //    creationFunction: function () {
    //        return new Cesium.ArcGisMapServerImageryProvider({
    //            url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
    //            enablePickFeatures: false
    //        });
    //    }
    //}),
    //new Cesium.ProviderViewModel({
    //    name: 'ESRI National Geographic',
    //    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriNationalGeographic.png'),
    //    creationFunction: function () {
    //        return new Cesium.ArcGisMapServerImageryProvider({
    //            url: 'https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/',
    //            enablePickFeatures: false
    //        });
    //    }
    //}),
    //new Cesium.ProviderViewModel({
    //    name: 'OSM',
    //    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/openStreetMap.png'),
    //    creationFunction: function () {
    //        return Cesium.createOpenStreetMapImageryProvider({
    //            url: 'https://a.tile.openstreetmap.org/'
    //        });
    //    }
    //}),
    //new Cesium.ProviderViewModel({
    //    name: 'Stamen Watercolor',
    //    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/stamenWatercolor.png'),
    //    creationFunction: function () {
    //        return Cesium.createOpenStreetMapImageryProvider({
    //            url: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/',
    //            credit: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
    //        });
    //    }
    //}),
    //new Cesium.ProviderViewModel({
    //    name: 'Stamen Toner',
    //    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/stamenToner.png'),
    //    creationFunction: function () {
    //        return Cesium.createOpenStreetMapImageryProvider({
    //            url: 'https://stamen-tiles.a.ssl.fastly.net/toner/',
    //            credit: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.'
    //        });
    //    }
    //}),
    //new Cesium.ProviderViewModel({
    //    name: 'BlackMarble',
    //    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/earthAtNight.png'),
    //    creationFunction: function () {
    //        return Cesium.createTileMapServiceImageryProvider({
    //            url: 'https://cesiumjs.org/blackmarble',
    //            flipXY: true,
    //            credit: 'Black Marble imagery courtesy NASA Earth Observatory'
    //        });
    //    }
    //}),
    //new Cesium.ProviderViewModel({
    //    name: 'Google',
    //    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/naturalEarthII.png'),
    //    creationFunction: function () {
    //        return new Cesium.UrlTemplateImageryProvider({
    //            url: 'http://www.google.cn/maps/vt?lyrs=s@800&x={x}&y={y}&z={z}',
    //            tilingScheme: new Cesium.WebMercatorTilingScheme(),
    //            minimumLevel: 1,
    //            maximumLevel: 20,
    //            credit: 'http://www.bjxbsj.cn',
    //        });
    //    }
    //})
);


/*
 * 地形
 */
var baseTerrains = Cesium.createDefaultTerrainProviderViewModels();
baseTerrains[0].name = "WGS84 椭球体";
baseTerrains[0].tooltip = "";
baseTerrains[1].name = "STK 世界地形";
baseTerrains[1].tooltip = "";

/*
 * token
 */
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhNDc5ZGE1NS1iOGI4LTRkMDAtODA1OC0xOTMwN2Y3M2QyZTIiLCJpZCI6MTAyOCwic2NvcGVzIjpbImFzbCIsImFzciIsImFzdyIsImdjIiwicHIiXSwiaWF0IjoxNTg1NTU0NzQyfQ.CUFsgTc17aKqruesY_plpr4l1FzqsSsWMXh1FK2fwfg';


/*
 * 初始化viewer
 */
viewer = new Cesium.Viewer("map", {
    homeButton: true,
    animation: false,
    baseLayerPicker: true,
    fullscreenButton: false,
    vrButton: false,
    geocoder: false,
    infoBox: true,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    imageryProviderViewModels: baseMaps,
    selectedImageryProviderViewModel: baseMaps[2],
    terrainProviderViewModels: baseTerrains,
    selectedTerrainProviderViewModel: baseTerrains[1],
});


/*
 * 修改
 */
viewer._cesiumWidget._creditContainer.style.display = "none";           //隐藏版权信息
viewer.scene.globe.enableLighting = false;                              //日夜区分
viewer.scene.globe.depthTestAgainstTerrain = false;                     //影响无模型pickPosition(默认false，当需要从地形pickPosition获取位置时设置true)
viewer.homeButton.viewModel.tooltip = "初始视图";
viewer.baseLayerPicker.viewModel.buttonTooltip = "地图及地形";
viewer.baseLayerPicker.viewModel.toggleDropDown.afterExecute.addEventListener(function () {
    if (viewer.baseLayerPicker.viewModel.dropDownVisible) {
        for (var i in document.getElementsByClassName("cesium-baseLayerPicker-sectionTitle")) {
            if (document.getElementsByClassName("cesium-baseLayerPicker-sectionTitle")[i].innerText == "Imagery") {
                document.getElementsByClassName("cesium-baseLayerPicker-sectionTitle")[i].innerText = "地图";
            }
            else if (document.getElementsByClassName("cesium-baseLayerPicker-sectionTitle")[i].innerText == "Terrain") {
                document.getElementsByClassName("cesium-baseLayerPicker-sectionTitle")[i].innerText = "地形";
            }
        }
    }
});

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
document.getElementsByClassName("cesium-viewer-toolbar")[0].style = "right:100px;top:31px;width:50px;height:50px";                                  //修改工具栏样式
document.getElementsByClassName("cesium-button cesium-toolbar-button")[0].style = "width:50px;height:50px";                                         //修改工具栏样式
document.getElementsByClassName("cesium-button cesium-toolbar-button")[1].style = "right:60px;top:-54px;width:50px;height:50px";                    //修改工具栏样式
document.getElementsByClassName("cesium-baseLayerPicker-selected")[0].style = "width:50px;height:50px";                                             //修改工具栏样式


/*
 * 扩展
 */
viewer.extend(Cesium.viewerCesiumNavigationMixin, {});                                          //扩展导航功能
document.getElementsByClassName("navigation-controls")[0].style = "visibility:hidden";          //修改工具栏样式
document.getElementsByClassName("compass")[0].style = "top:10px";                               //修改指南针位置


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



//移动端判断
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


//加载3d tiles模型
function LoadModel(obj) {
    //var modelurl = "../Data/SurModel" + obj.mxlj;//本地加载
    var modelurl = datasurl + "/SurModel" + obj.mxlj;//远程加载

    //删除上一个模型（当前机制只允许一个模型）
    if (current_project_tile != null) {
        //根据路径判断是否为同一模型
        if (current_project_tile._url != modelurl) {
            viewer.scene.primitives.remove(current_project_tile);
            current_project_tile = null;
            current_project_pointcloudid = null;

            //添加模型
            current_project_tile = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                url: modelurl,
                maximumScreenSpaceError: isMobile.any() ? 1 : 1,
                maximumNumberOfLoadedTiles: isMobile.any() ? 1000 : 1000
            }));

            viewer.zoomTo(current_project_tile);
            //当前点云id
            current_project_pointcloudid = obj.pointcloudid;
        }
    }
    else {
        //添加模型
        current_project_tile = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            url: modelurl,
            maximumScreenSpaceError: isMobile.any() ? 1 : 1,
            maximumNumberOfLoadedTiles: isMobile.any() ? 1000 : 1000
        }));

        viewer.zoomTo(current_project_tile);
        //当前点云id
        current_project_pointcloudid = obj.pointcloudid;
    }
};

//viewer添加entity
function AddEntityInViewer(entity) {
    if (entity != null) {
        viewer.entities.add(entity);
    }
};
//viewer添加entity集合
function AddEntitiesInViewer(entities) {
    if (entities.length > 0) {
        for (var i in entities) {
            if (entities[i] != null) {
                viewer.entities.add(entities[i]);
            }
        }
    }
};

//viewer删除entity
function RemoveEntityInViewer(entity) {
    if (viewer.entities.contains(entity)) {
        viewer.entities.remove(entity);
    }
};
//viewer删除entity集合
function RemoveEntitiesInViewer(entities) {
    for (var i in entities) {
        if (viewer.entities.contains(entities[i])) {
            viewer.entities.remove(entities[i]);
        }
    }
};

//定位entity
function ZoomToEntity(entity) {
    viewer.zoomTo(entity, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-45), 5));
};

//清除全部模型和几何对象
function ClearAllModelAndGeometry() {
    //清除模型
    viewer.scene.primitives.removeAll();
    current_project_tile = null;

    //清除几何
    viewer.entities.removeAll();

    if (handler != undefined) {
        handler.destroy();
    }

    viewer._container.style.cursor = "default";//还原鼠标样式
};


//CGCS2000坐标系大地坐标转空间直角坐标
function CGCS2000BLH2XYZ(B, L, H) {
    var X;
    var Y;
    var Z;

    var a = 6378137.0;
    var b = 6356752.314140356;
    var c = a * a / b;
    var f = 1 / 298.257222101;
    var e1 = Math.sqrt(a * a - b * b) / a;
    var e2 = Math.sqrt(a * a - b * b) / b;

    var N = a / Math.sqrt(1 - e1 * e1 * Math.sin(B * Math.PI / 180) * Math.sin(B * Math.PI / 180));
    X = (N + H) * Math.cos(B * Math.PI / 180) * Math.cos(L * Math.PI / 180);
    Y = (N + H) * Math.cos(B * Math.PI / 180) * Math.sin(L * Math.PI / 180);
    Z = (N * (1 - e1 * e1) + H) * Math.sin(B * Math.PI / 180);

    return new Cesium.Cartesian3(X, Y, Z);
};
//CGCS2000坐标系空间直角坐标转大地坐标
function CGCS2000XYZ2BLH(X, Y, Z) {
    var a = 6378137.0;
    var b = 6356752.314140356;
    var e1 = Math.sqrt(a * a - b * b) / a;

    var B, L, H, e2, w, N, e4, p, t, t0, tt, c;

    e2 = e1 * e1;
    e4 = (Math.sqrt(a * a - b * b) / b) * (Math.sqrt(a * a - b * b) / b);

    B = 0.1;
    L = Math.atan(Y / X);

    if (X < 0 && Y < 0) {
        L = L - Math.PI;
    }
    else if (X < 0 && Y > 0) {
        L = L + Math.PI;
    }

    L = L / Math.PI * 180;
    t = Math.tan(B);
    t0 = Z / Math.sqrt(X * X + Y * Y);
    c = a * Math.sqrt(1 + e4);
    p = c * e2 / Math.sqrt(X * X + Y * Y);

    do {
        tt = t;
        t = t0 + p * t / Math.sqrt(1 + e4 + t * t);
    } while (-0.000000001 >= (t - tt) || (t - tt) >= 0.000000001);

    B = Math.atan(t);
    w = Math.sqrt(1 - e2 * Math.pow(Math.sin(B), 2));
    N = a / w;
    H = (Math.sqrt(X * X + Y * Y) / Math.cos(B) - N);
    B = B * 180 / Math.PI;

    return new Cesium.Cartesian3(B, L, H);
};

viewer.entities.add(new Cesium.Entity({
    id: "temp01",
    polyline: {
        positions: JSON.parse('[{"x":-1865503.6563887487,"y":5140409.01237329,"z":3273177.561799544},{"x":-1865489.451961745,"y":5140380.785180962,"z":3273136.3845110703},{"x":-1865480.5078674087,"y":5140357.564218494,"z":3273090.8318478693},{"x":-1865474.313043673,"y":5140332.40217229,"z":3273044.8311525},{"x":-1865482.0919583335,"y":5140316.99575149,"z":3273021.0309318043},{"x":-1865511.8440768267,"y":5140313.519942936,"z":3273006.3059291015},{"x":-1865564.199332517,"y":5140313.864882115,"z":3272994.134903806},{"x":-1865597.595849911,"y":5140308.473159849,"z":3272995.251899851},{"x":-1865613.786201937,"y":5140307.122253495,"z":3273011.9216060094},{"x":-1865625.3622384933,"y":5140278.547545624,"z":3273042.1877074055},{"x":-1865625.6904448594,"y":5140282.4627299225,"z":3273081.6133994237},{"x":-1865612.7526607425,"y":5140296.44575127,"z":3273118.8853470907},{"x":-1865581.644785834,"y":5140334.704936574,"z":3273165.4077684404},{"x":-1865556.703705958,"y":5140376.090892927,"z":3273192.6027794858},{"x":-1865530.7264869122,"y":5140407.519405227,"z":3273184.349317252},{"x":-1865514.771582632,"y":5140411.672664847,"z":3273180.6628717855}]'),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));

viewer.entities.add(new Cesium.Entity({
    id: "temp02",
    polyline: {
        positions: JSON.parse('[{"x":-1862842.8431771635,"y":5141632.242339687,"z":3272554.6257984005},{"x":-1862862.5346319836,"y":5141634.667641102,"z":3272560.838561151},{"x":-1862874.141757359,"y":5141616.168476768,"z":3272568.061029114},{"x":-1862880.1985642486,"y":5141604.130217071,"z":3272565.4733128888},{"x":-1862890.8204234375,"y":5141585.37220723,"z":3272549.0433844426},{"x":-1862898.6290628521,"y":5141566.05687672,"z":3272519.922021682},{"x":-1862908.2111297408,"y":5141556.578490375,"z":3272491.6779150707},{"x":-1862886.8533946972,"y":5141578.379582619,"z":3272480.0482375803},{"x":-1862857.4186862356,"y":5141593.041371594,"z":3272471.936660646},{"x":-1862828.2761862467,"y":5141602.957656863,"z":3272472.520777005},{"x":-1862812.638024803,"y":5141613.723141597,"z":3272484.596613254},{"x":-1862814.7628484834,"y":5141620.391733053,"z":3272499.6722538546},{"x":-1862822.813309095,"y":5141624.217071381,"z":3272525.9347942155},{"x":-1862840.175417811,"y":5141633.197741999,"z":3272550.4419574016}]'),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));

viewer.entities.add(new Cesium.Entity({
    id: "temp03",
    polyline: {
        positions: JSON.parse(' [{"x":-1862765.256155016,"y":5141577.135780198,"z":3272343.267753761},{"x":-1862767.6698113051,"y":5141593.804808394,"z":3272377.905985414},{"x":-1862773.550549931,"y":5141599.731299544,"z":3272403.5771427834},{"x":-1862788.9578144122,"y":5141604.077202373,"z":3272427.6703376723},{"x":-1862822.440618894,"y":5141597.95289372,"z":3272451.397890543},{"x":-1862863.7495071425,"y":5141582.0678391,"z":3272460.796222325},{"x":-1862891.5261994968,"y":5141565.342476507,"z":3272463.2732049157},{"x":-1862922.5022989686,"y":5141535.165336155,"z":3272466.422099648},{"x":-1862928.5233508935,"y":5141505.630286083,"z":3272419.2904023738},{"x":-1862932.2282664548,"y":5141495.757278038,"z":3272378.898824687},{"x":-1862923.2477178383,"y":5141489.791542401,"z":3272342.998189053},{"x":-1862916.2567973435,"y":5141488.7342317095,"z":3272306.3468657467},{"x":-1862894.3407252985,"y":5141487.400363698,"z":3272287.4250145056},{"x":-1862838.2108317008,"y":5141538.121790733,"z":3272281.3736715736},{"x":-1862790.7631916725,"y":5141541.923430099,"z":3272282.764575273},{"x":-1862767.038111971,"y":5141557.771014329,"z":3272313.9171203533},{"x":-1862763.8293769003,"y":5141571.403757687,"z":3272330.038693258}]'),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));

viewer.entities.add(new Cesium.Entity({
    id: "temp04",
    polyline: {
        positions: JSON.parse('[{"x":-1862792.1749950699,"y":5141472.495521914,"z":3272068.2117632707},{"x":-1862786.648541161,"y":5141482.797019661,"z":3272090.2217712775},{"x":-1862782.8447920263,"y":5141495.5287071355,"z":3272119.320916337},{"x":-1862780.094714439,"y":5141502.964735717,"z":3272132.064715686},{"x":-1862797.3021808243,"y":5141501.666899616,"z":3272141.2678615325},{"x":-1862826.4981361171,"y":5141491.180435007,"z":3272150.563194416},{"x":-1862850.0611140127,"y":5141480.696002077,"z":3272155.7604413554},{"x":-1862870.5073422408,"y":5141462.744329192,"z":3272157.545017813},{"x":-1862887.2600967614,"y":5141454.2581363255,"z":3272141.310352752},{"x":-1862891.3376719996,"y":5141446.006086305,"z":3272113.0478969226},{"x":-1862888.9598020148,"y":5141436.680577114,"z":3272084.1217908124},{"x":-1862887.9743241877,"y":5141433.491956806,"z":3272077.1818212154},{"x":-1862845.5361190538,"y":5141446.789725685,"z":3272073.070714339},{"x":-1862801.1154535592,"y":5141471.53743195,"z":3272062.177590355}]'),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));

viewer.entities.add(new Cesium.Entity({
    id: "temp05",
    polyline: {
        positions: JSON.parse('[{"x":-1863877.0564251447,"y":5140901.220959181,"z":3272661.819603163},{"x":-1863871.5721670506,"y":5140908.794888782,"z":3272681.7033920595},{"x":-1863869.5238343528,"y":5140912.333348896,"z":3272703.1198533466},{"x":-1863881.1266797695,"y":5140908.287285992,"z":3272722.637560369},{"x":-1863898.0062288127,"y":5140892.171448731,"z":3272732.7399584493},{"x":-1863920.5022174679,"y":5140883.184340907,"z":3272723.161530854},{"x":-1863925.4308913806,"y":5140878.390906114,"z":3272702.3143700794},{"x":-1863924.3500422544,"y":5140874.073553471,"z":3272676.0120117073},{"x":-1863900.720237187,"y":5140879.564922846,"z":3272655.8300223807},{"x":-1863881.893138633,"y":5140896.356454344,"z":3272655.22875603}]'),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));

viewer.entities.add(new Cesium.Entity({
    id: "temp06",
    polyline: {
        positions: JSON.parse('[{"x":-1864032.0292232314,"y":5140853.153812301,"z":3272849.8197194217},{"x":-1864022.357594234,"y":5140868.088930492,"z":3272870.8706208854},{"x":-1864020.5604995354,"y":5140878.373258043,"z":3272894.4452201},{"x":-1864027.238703288,"y":5140881.945606796,"z":3272914.9383424046},{"x":-1864047.559655221,"y":5140873.448914605,"z":3272930.064690078},{"x":-1864065.7257815877,"y":5140860.798650615,"z":3272939.5345932716},{"x":-1864086.2129006318,"y":5140862.997290974,"z":3272932.0161764883},{"x":-1864098.2022461023,"y":5140854.150145037,"z":3272921.755059601},{"x":-1864099.8198376324,"y":5140841.378288044,"z":3272898.3146546287},{"x":-1864099.8480743691,"y":5140829.929640029,"z":3272867.7897476135},{"x":-1864100.4535234128,"y":5140824.015239014,"z":3272846.399207437},{"x":-1864075.575208005,"y":5140825.3683010815,"z":3272840.8320288067},{"x":-1864039.130585588,"y":5140845.4989039255,"z":3272838.637991247},{"x":-1864032.0454495454,"y":5140850.997847295,"z":3272844.166581877}]'),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));

viewer.entities.add(new Cesium.Entity({
    id: "temp07",
    polyline: {
        positions: JSON.parse('[{"x":-1863994.3252029472,"y":5140859.325945073,"z":3272731.935569755},{"x":-1864001.7182628845,"y":5140857.0313312365,"z":3272708.2445925036},{"x":-1864009.7138288708,"y":5140851.175227812,"z":3272696.8560252804},{"x":-1864020.813678865,"y":5140825.758491862,"z":3272711.705005739},{"x":-1864038.539690202,"y":5140823.715058002,"z":3272720.1890364373},{"x":-1864039.21567047,"y":5140828.291023674,"z":3272737.258763461},{"x":-1864034.4289716699,"y":5140832.769624673,"z":3272756.645812363},{"x":-1864016.99723871,"y":5140844.034859599,"z":3272753.099822648},{"x":-1863997.1405833166,"y":5140860.347909553,"z":3272736.551450224},{"x":-1863994.5559722816,"y":5140861.0034174835,"z":3272734.2678399617}]'),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));

viewer.entities.add(new Cesium.Entity({
    id: "temp08",
    polyline: {
        positions: JSON.parse('[{"x":-1864109.883515125,"y":5140852.707261569,"z":3272950.694357097},{"x":-1864114.5216564515,"y":5140841.560986048,"z":3272921.200757488},{"x":-1864122.4069239195,"y":5140829.284083115,"z":3272886.160299423},{"x":-1864132.6440526515,"y":5140815.643446066,"z":3272862.1659675953},{"x":-1864147.1059511125,"y":5140812.4859255785,"z":3272850.143743837},{"x":-1864167.3759235304,"y":5140800.98838786,"z":3272854.2060717144},{"x":-1864194.078990043,"y":5140761.773738055,"z":3272881.952166002},{"x":-1864215.508237227,"y":5140750.555294959,"z":3272896.2240883633},{"x":-1864233.292059397,"y":5140749.060323536,"z":3272903.7569833007},{"x":-1864246.1215168412,"y":5140749.172597126,"z":3272927.1518812464},{"x":-1864254.0908358798,"y":5140762.558413976,"z":3272960.0525371768},{"x":-1864250.8865347167,"y":5140782.311845488,"z":3272995.1895588273},{"x":-1864235.3247948089,"y":5140800.149957315,"z":3273025.4249674953},{"x":-1864194.1975127168,"y":5140810.676709926,"z":3273035.835706524},{"x":-1864158.6675956403,"y":5140823.583676679,"z":3273016.622949851},{"x":-1864125.6324878202,"y":5140836.8020276595,"z":3272982.923428679},{"x":-1864116.4200260872,"y":5140853.3332816595,"z":3272956.7344007823}]'),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));

viewer.entities.add(new Cesium.Entity({
    id: "temp09",
    polyline: {
        positions: JSON.parse('[{"x":-1864221.2055845277,"y":5140675.712981216,"z":3272565.948029644},{"x":-1864202.7302955606,"y":5140694.830429787,"z":3272607.369232847},{"x":-1864185.3182107024,"y":5140719.847713164,"z":3272635.449803983},{"x":-1864170.6685703234,"y":5140745.378226139,"z":3272664.383228151},{"x":-1864156.6051526235,"y":5140762.015741373,"z":3272696.5046763397},{"x":-1864162.932985913,"y":5140763.542870609,"z":3272728.5484461132},{"x":-1864192.2607465084,"y":5140742.779451059,"z":3272754.7193199163},{"x":-1864249.4189131686,"y":5140718.031039685,"z":3272779.5389875346},{"x":-1864284.9397058068,"y":5140716.487055107,"z":3272776.2579201222},{"x":-1864298.1909073081,"y":5140698.584149297,"z":3272766.683903018},{"x":-1864305.8064321266,"y":5140665.397614894,"z":3272724.6950912215},{"x":-1864308.3928545073,"y":5140651.115522365,"z":3272692.312448461},{"x":-1864284.2931098305,"y":5140655.7564140335,"z":3272642.617155397},{"x":-1864251.593008371,"y":5140638.448636633,"z":3272590.722626269}]'),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));