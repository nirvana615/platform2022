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
                url: "http://t0.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=d73ccdbf1b6587002c8f746867919bde",
                layer: "tdtVecBasicLayer",
                style: "default",
                format: "image/jpeg",
                tileMatrixSetID: "GoogleMapsCompatible",
            }));
            //天地图矢量中文标注
            imageryProviders.push(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://t0.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=d73ccdbf1b6587002c8f746867919bde",
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
                url: "http://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=d73ccdbf1b6587002c8f746867919bde",
                layer: "tdtBasicLayer",
                style: "default",
                format: "image/jpeg",
                tileMatrixSetID: "GoogleMapsCompatible",
                maximumLevel: 16,
            }));
            //天地图影像中文标注
            imageryProviders.push(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://t0.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=d73ccdbf1b6587002c8f746867919bde",
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
    })



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
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    imageryProviderViewModels: baseMaps,
    selectedImageryProviderViewModel: baseMaps[1],
    terrainProviderViewModels: baseTerrains,
    selectedTerrainProviderViewModel: baseTerrains[1],
    orientation: {
        // 指向
        heading: Cesium.Math.toRadians(90, 0),
        // 视角
        pitch: Cesium.Math.toRadians(-90),
        roll: 0.0
    }
    //selectionIndicator: false
});
//修改双击回初始位置
viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
/*
 * 修改
 */
viewer._cesiumWidget._creditContainer.style.display = "none";           //隐藏版权信息
viewer.scene.globe.enableLighting = false;                              //日夜区分
viewer.scene.globe.depthTestAgainstTerrain = false;
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
document.getElementsByClassName("cesium-viewer-toolbar")[0].style = "right:25px;top:218px;width:50px;height:50px";
document.getElementsByClassName("cesium-button cesium-toolbar-button")[0].style = "width:50px;height:50px";                                         //修改工具栏样式
document.getElementsByClassName("cesium-button cesium-toolbar-button")[1].style = "width:50px;height:50px";
document.getElementsByClassName("cesium-baseLayerPicker-selected")[0].style = "width:50px;height:50px";
/*
 * 扩展
 */
viewer.extend(Cesium.viewerCesiumNavigationMixin, {});                                          //扩展导航功能
document.getElementsByClassName("navigation-controls")[0].style = "visibility:hidden";          //修改工具栏样式
document.getElementsByClassName("compass")[0].style = "top:10px"; 
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
    var modelurl = datasurl + "/AllModel/" + obj.path;
    //删除上一个模型（保证只有一个模型）

    if (curtileset != null) {
        viewer.scene.primitives.remove(curtileset);
    }

    //添加模型
    curtileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: modelurl,
        maximumScreenSpaceError: isMobile.any() ? 1 : 1,
        maximumNumberOfLoadedTiles: isMobile.any() ? 1000 : 1000
    }));

    //缩放至模型
    //判断是否有最佳视角
    if (obj.modelView != null && obj.modelView.length > 0) {
        var home = JSON.parse(obj.modelView);
        viewer.scene.camera.setView(home);
    } else {
        viewer.zoomTo(curtileset);
    }

    //测量工具测量类型（跳转到模型测量）
    viewer.scene.globe.depthTestAgainstTerrain = false;
    elem.tabChange('measureway', 'modelMeasure');//模型测量
    //删除上一个模型（保证只有一个模型）
  

    

};


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
