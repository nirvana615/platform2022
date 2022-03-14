/*
 * 引用CesiumJS
 */



//地图
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
);
//地形
var baseTerrains = Cesium.createDefaultTerrainProviderViewModels();
baseTerrains[0].name = "WGS84 椭球体";
baseTerrains[0].tooltip = "";
baseTerrains[1].name = "STK 世界地形";
baseTerrains[1].tooltip = "";

//token
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhNDc5ZGE1NS1iOGI4LTRkMDAtODA1OC0xOTMwN2Y3M2QyZTIiLCJpZCI6MTAyOCwic2NvcGVzIjpbImFzbCIsImFzciIsImFzdyIsImdjIiwicHIiXSwiaWF0IjoxNTg1NTU0NzQyfQ.CUFsgTc17aKqruesY_plpr4l1FzqsSsWMXh1FK2fwfg';


//初始化viewer
var viewer = new Cesium.Viewer("map", {
    homeButton: true,
    animation: false,
    baseLayerPicker: true,
    fullscreenButton: false,
    vrButton: false,
    geocoder: false,
    infoBox: false,
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

//修改
viewer._cesiumWidget._creditContainer.style.display = "none";           //隐藏版权信息
viewer.scene.globe.enableLighting = false;                              //日夜区分
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
//扩展
viewer.extend(Cesium.viewerCesiumNavigationMixin, {});                                          //扩展导航功能
document.getElementsByClassName("navigation-controls")[0].style = "visibility:hidden";          //修改工具栏样式
document.getElementsByClassName("compass")[0].style = "top:10px";                               //修改指南针位置


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