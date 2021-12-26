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
    selectionIndicator: true,
    timeline: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    imageryProviderViewModels: baseMaps,
    selectedImageryProviderViewModel: baseMaps[2],
    terrainProviderViewModels: baseTerrains,
    selectedTerrainProviderViewModel: baseTerrains[1],
    orientation: {
        // 指向
        heading: Cesium.Math.toRadians(90, 0),
        // 视角
        pitch: Cesium.Math.toRadians(-90),
        roll: 0.0
    }
});


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
document.getElementsByClassName("cesium-viewer-toolbar")[0].style = "right:80px;top:30px;width:80px;height:60px ";
document.getElementsByClassName("cesium-button cesium-toolbar-button")[0].style = "width:30px;height:30px";                                         //修改工具栏样式
document.getElementsByClassName("cesium-button cesium-toolbar-button")[1].style = "width:30px;height:30px";
//document.getElementsByClassName("cesium-baseLayerPicker-selected")[0].style = "width:50px;height:50px";
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
    var modelurl = datasurl + "/SurModel" + obj.path;
    //if (obj.MXST != null) {
    //    //使用设置的最优视图
    //}
    //else {
    //    //设置视图
    //    $.getJSON(modelurl, function (data) {
    //        var arry = data.root.boundingVolume.box;
    //        console.log(arry);
    //        var boundingSphere = new Cesium.BoundingSphere(new Cesium.Cartesian3(arry[0], arry[1], arry[2]), arry[3]+1000);

    //        //home按钮功能
    //        viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (commandInfo) {
    //            viewer.camera.flyToBoundingSphere(boundingSphere);
    //            commandInfo.cancel = true;
    //        });

    //        //设置初始位置
    //        viewer.camera.flyToBoundingSphere(boundingSphere, { duration: 1 });
    //    });
    //}

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

    if (obj.modelView != null && obj.modelView.length > 0) {
        var home = JSON.parse(obj.modelView);
        viewer.scene.camera.setView(home);
        console.log(home);
    } else {
        viewer.zoomTo(curtileset);
    }
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

var jsondata2 = [
    {
        "attributes": {
            "OBJECTID": 1,
            "Layer": "一般区剖面",
            "PM": "59-59'",
            "序号": 59,
            "Shape_Length": 239.19777883222694
        },
        "geometry": {
            "paths": [
                [
                    [
                        567060.4413000001,
                        3425707.8489999996
                    ],
                    [
                        567291.8821,
                        3425647.4277
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 2,
            "Layer": "一般区剖面",
            "PM": "60-60'",
            "序号": 60,
            "Shape_Length": 80.12984374493145
        },
        "geometry": {
            "paths": [
                [
                    [
                        566131.1940000001,
                        3425087.783500001
                    ],
                    [
                        566154.8062000005,
                        3425011.2116
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 3,
            "Layer": "一般区剖面",
            "PM": "57-57'",
            "序号": 57,
            "Shape_Length": 182.1375919741306
        },
        "geometry": {
            "paths": [
                [
                    [
                        565499.8805999998,
                        3425719.3600999994
                    ],
                    [
                        565623.6528000003,
                        3425852.9810000008
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 4,
            "Layer": "一般区剖面",
            "PM": "56-56'",
            "序号": 56,
            "Shape_Length": 144.87480097969636
        },
        "geometry": {
            "paths": [
                [
                    [
                        564853.2413999997,
                        3425727.7436999997
                    ],
                    [
                        564994.6862000004,
                        3425759.0818000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 5,
            "Layer": "一般区剖面",
            "PM": "51-51'",
            "序号": 51,
            "Shape_Length": 151.7218966079118
        },
        "geometry": {
            "paths": [
                [
                    [
                        562477.7686000001,
                        3425911.7689999996
                    ],
                    [
                        562412.4584999997,
                        3425774.8233000005
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 6,
            "Layer": "一般区剖面",
            "PM": "55-55'",
            "序号": 55,
            "Shape_Length": 349.2284120386808
        },
        "geometry": {
            "paths": [
                [
                    [
                        563442.3323999997,
                        3426360.7126
                    ],
                    [
                        563442.2407,
                        3426011.4842000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 7,
            "Layer": "一般区剖面",
            "PM": "58-58'",
            "序号": 58,
            "Shape_Length": 111.16563544950077
        },
        "geometry": {
            "paths": [
                [
                    [
                        566328.8898999998,
                        3425836.8948999999
                    ],
                    [
                        566439.9773000004,
                        3425832.7249999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 8,
            "Layer": "一般区剖面",
            "PM": "61-61'",
            "序号": 61,
            "Shape_Length": 145.58783816774608
        },
        "geometry": {
            "paths": [
                [
                    [
                        564031.4584999997,
                        3425256.4321
                    ],
                    [
                        564131.8309000004,
                        3425361.8892
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 9,
            "Layer": "一般区剖面",
            "PM": "63-63'",
            "序号": 63,
            "Shape_Length": 79.75467892642928
        },
        "geometry": {
            "paths": [
                [
                    [
                        563924.0686999997,
                        3425087.0396
                    ],
                    [
                        563869.2136000004,
                        3425029.1455000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 10,
            "Layer": "一般区剖面",
            "PM": "67-67'",
            "序号": 67,
            "Shape_Length": 121.70416170039325
        },
        "geometry": {
            "paths": [
                [
                    [
                        565949.5295000002,
                        3423623.9561
                    ],
                    [
                        565851.7882000003,
                        3423551.440300001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 11,
            "Layer": "一般区剖面",
            "PM": "68-68'",
            "序号": 68,
            "Shape_Length": 92.37379447425713
        },
        "geometry": {
            "paths": [
                [
                    [
                        566240.8570999997,
                        3423204.8796999996
                    ],
                    [
                        566171.5606000004,
                        3423143.7984999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 12,
            "Layer": "一般区剖面",
            "PM": "69-69'",
            "序号": 69,
            "Shape_Length": 157.27006126050424
        },
        "geometry": {
            "paths": [
                [
                    [
                        566690,
                        3422969.2852
                    ],
                    [
                        566582.9890999999,
                        3422854.0352999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 13,
            "Layer": "一般区剖面",
            "PM": "70-70'",
            "序号": 70,
            "Shape_Length": 164.08938420506002
        },
        "geometry": {
            "paths": [
                [
                    [
                        567068.9995999998,
                        3422733.3708999997
                    ],
                    [
                        567017.6211000001,
                        3422577.5326000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 14,
            "Layer": "一般区剖面",
            "PM": "74-74'",
            "序号": 74,
            "Shape_Length": 196.23677243357936
        },
        "geometry": {
            "paths": [
                [
                    [
                        569225.1703000004,
                        3422372.1236000007
                    ],
                    [
                        569245.1804,
                        3422176.9097000008
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 15,
            "Layer": "一般区剖面",
            "PM": "77-77'",
            "序号": 77,
            "Shape_Length": 226.12353452516488
        },
        "geometry": {
            "paths": [
                [
                    [
                        571529.4566000002,
                        3422994.4833000006
                    ],
                    [
                        571624.0311000003,
                        3422789.0873000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 16,
            "Layer": "一般区剖面",
            "PM": "148-148'",
            "序号": 148,
            "Shape_Length": 111.68939781109246
        },
        "geometry": {
            "paths": [
                [
                    [
                        586960.6435000002,
                        3426829.029100001
                    ],
                    [
                        586874.5459000003,
                        3426757.883300001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 17,
            "Layer": "一般区剖面",
            "PM": "149-149'",
            "序号": 149,
            "Shape_Length": 166.43831561589557
        },
        "geometry": {
            "paths": [
                [
                    [
                        587340.4511000002,
                        3426382.3182999996
                    ],
                    [
                        587231.0641000001,
                        3426256.8742999995
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 18,
            "Layer": "一般区剖面",
            "PM": "150-150'",
            "序号": 150,
            "Shape_Length": 228.24350285745855
        },
        "geometry": {
            "paths": [
                [
                    [
                        587712.7182999998,
                        3426226.864499999
                    ],
                    [
                        587586.3317999998,
                        3426036.8078000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 19,
            "Layer": "一般区剖面",
            "PM": "151-151'",
            "序号": 151,
            "Shape_Length": 180.38697318031198
        },
        "geometry": {
            "paths": [
                [
                    [
                        588202.4919999996,
                        3425896.4077000005
                    ],
                    [
                        588134.4198000003,
                        3425729.3578999994
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 20,
            "Layer": "一般区剖面",
            "PM": "153-153'",
            "序号": 153,
            "Shape_Length": 55.66436178041291
        },
        "geometry": {
            "paths": [
                [
                    [
                        588567.8852000004,
                        3425730.118899999
                    ],
                    [
                        588550.2096999995,
                        3425677.3354
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 21,
            "Layer": "一般区剖面",
            "PM": "155-155'",
            "序号": 155,
            "Shape_Length": 71.47632783412942
        },
        "geometry": {
            "paths": [
                [
                    [
                        588918.6673999997,
                        3425531.6396999994
                    ],
                    [
                        588886.2548000002,
                        3425467.9350000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 22,
            "Layer": "一般区剖面",
            "PM": "157-157'",
            "序号": 157,
            "Shape_Length": 69.22123539454754
        },
        "geometry": {
            "paths": [
                [
                    [
                        589279.9889000002,
                        3425328.1571999995
                    ],
                    [
                        589242.1195999999,
                        3425270.213300001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 23,
            "Layer": "一般区剖面",
            "PM": "159-159'",
            "序号": 159,
            "Shape_Length": 54.05107775578837
        },
        "geometry": {
            "paths": [
                [
                    [
                        589680.4062000001,
                        3425060.4255999999
                    ],
                    [
                        589653.3252999997,
                        3425013.648
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 24,
            "Layer": "一般区剖面",
            "PM": "164-164'",
            "序号": 164,
            "Shape_Length": 57.895162817976
        },
        "geometry": {
            "paths": [
                [
                    [
                        590520.5676999996,
                        3424554.7596000006
                    ],
                    [
                        590499.8124000002,
                        3424500.7127
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 25,
            "Layer": "一般区剖面",
            "PM": "175-175'",
            "序号": 175,
            "Shape_Length": 59.7260446207087
        },
        "geometry": {
            "paths": [
                [
                    [
                        592705.5108000003,
                        3424367.712099999
                    ],
                    [
                        592713.6931999996,
                        3424308.5492000004
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 26,
            "Layer": "一般区剖面",
            "PM": "177-177'",
            "序号": 177,
            "Shape_Length": 55.58147712009906
        },
        "geometry": {
            "paths": [
                [
                    [
                        593109.4908999996,
                        3424402.3970999999
                    ],
                    [
                        593113.4583,
                        3424346.9573999999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 27,
            "Layer": "一般区剖面",
            "PM": "181-181'",
            "序号": 181,
            "Shape_Length": 45.27004970729587
        },
        "geometry": {
            "paths": [
                [
                    [
                        593591.5192,
                        3424417.7200000009
                    ],
                    [
                        593590.7433000002,
                        3424372.456599999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 28,
            "Layer": "一般区剖面",
            "PM": "184-184'",
            "序号": 184,
            "Shape_Length": 53.0675031765644
        },
        "geometry": {
            "paths": [
                [
                    [
                        594394.3596999999,
                        3424508.0654000008
                    ],
                    [
                        594400.5747999996,
                        3424455.3630999999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 29,
            "Layer": "一般区剖面",
            "PM": "189-189'",
            "序号": 189,
            "Shape_Length": 56.317015161829079
        },
        "geometry": {
            "paths": [
                [
                    [
                        595403.2260999996,
                        3424612.3938999997
                    ],
                    [
                        595437.7242,
                        3424567.880000001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 30,
            "Layer": "一般区剖面",
            "PM": "191-191'",
            "序号": 191,
            "Shape_Length": 74.0240567644003
        },
        "geometry": {
            "paths": [
                [
                    [
                        595811.5412999997,
                        3424700.6023999995
                    ],
                    [
                        595835.5481000003,
                        3424630.5792999996
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 31,
            "Layer": "一般区剖面",
            "PM": "192-192'",
            "序号": 192,
            "Shape_Length": 84.62719572357439
        },
        "geometry": {
            "paths": [
                [
                    [
                        595912.6402000003,
                        3424831.3947
                    ],
                    [
                        595985.0654999996,
                        3424787.6186999997
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 32,
            "Layer": "一般区剖面",
            "PM": "193-193'",
            "序号": 193,
            "Shape_Length": 84.311656533528
        },
        "geometry": {
            "paths": [
                [
                    [
                        596206.5417,
                        3424818.5867999999
                    ],
                    [
                        596123.8969,
                        3424801.9047
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 33,
            "Layer": "一般区剖面",
            "PM": "194-194'",
            "序号": 194,
            "Shape_Length": 72.43938415130127
        },
        "geometry": {
            "paths": [
                [
                    [
                        596228.7159000002,
                        3424762.2826000007
                    ],
                    [
                        596222.7912999997,
                        3424690.0858999995
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 34,
            "Layer": "一般区剖面",
            "PM": "196-196'",
            "序号": 196,
            "Shape_Length": 70.91016959714583
        },
        "geometry": {
            "paths": [
                [
                    [
                        597194.7221999997,
                        3424943.8455
                    ],
                    [
                        597208.3531999998,
                        3424874.2578
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 35,
            "Layer": "一般区剖面",
            "PM": "197-197'",
            "序号": 197,
            "Shape_Length": 92.20802624129647
        },
        "geometry": {
            "paths": [
                [
                    [
                        597664.0376000004,
                        3425033.8746000009
                    ],
                    [
                        597687.3343000002,
                        3424944.6580999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 36,
            "Layer": "一般区剖面",
            "PM": "198-198'",
            "序号": 198,
            "Shape_Length": 44.853461207958
        },
        "geometry": {
            "paths": [
                [
                    [
                        598145.335,
                        3425145.9867000004
                    ],
                    [
                        598160.6369000003,
                        3425103.824100001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 37,
            "Layer": "一般区剖面",
            "PM": "200-200'",
            "序号": 200,
            "Shape_Length": 57.764136203083918
        },
        "geometry": {
            "paths": [
                [
                    [
                        599182.8453000002,
                        3425448.8792000005
                    ],
                    [
                        599191.1804999998,
                        3425391.7195999997
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 38,
            "Layer": "一般区剖面",
            "PM": "202-202'",
            "序号": 202,
            "Shape_Length": 63.75204587370651
        },
        "geometry": {
            "paths": [
                [
                    [
                        600163.7290000003,
                        3425591.5743000006
                    ],
                    [
                        600165.6957999999,
                        3425527.852600001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 39,
            "Layer": "一般区剖面",
            "PM": "203-203'",
            "序号": 203,
            "Shape_Length": 56.22283118720448
        },
        "geometry": {
            "paths": [
                [
                    [
                        600702.3657,
                        3425598.4233999999
                    ],
                    [
                        600701.7916000001,
                        3425542.2035000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 40,
            "Layer": "一般区剖面",
            "PM": "204-204'",
            "序号": 204,
            "Shape_Length": 47.20095109451125
        },
        "geometry": {
            "paths": [
                [
                    [
                        601201.5406,
                        3425629.4516000004
                    ],
                    [
                        601220.5675999997,
                        3425586.2555
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 41,
            "Layer": "一般区剖面",
            "PM": "205-205'",
            "序号": 205,
            "Shape_Length": 44.53421119568583
        },
        "geometry": {
            "paths": [
                [
                    [
                        601693.3920999998,
                        3425714.1449999997
                    ],
                    [
                        601706.4699999997,
                        3425671.5743000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 42,
            "Layer": "一般区剖面",
            "PM": "207-207'",
            "序号": 207,
            "Shape_Length": 59.02693506681872
        },
        "geometry": {
            "paths": [
                [
                    [
                        602752.3908000002,
                        3425872.6619000008
                    ],
                    [
                        602768.5734999999,
                        3425815.8966000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 43,
            "Layer": "一般区剖面",
            "PM": "208-208'",
            "序号": 208,
            "Shape_Length": 56.83732018480207
        },
        "geometry": {
            "paths": [
                [
                    [
                        603246.6097999998,
                        3426018.8455999998
                    ],
                    [
                        603263.6376,
                        3425964.618899999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 44,
            "Layer": "一般区剖面",
            "PM": "209-209'",
            "序号": 209,
            "Shape_Length": 51.73270168509079
        },
        "geometry": {
            "paths": [
                [
                    [
                        603722.6661999999,
                        3426180.8882
                    ],
                    [
                        603735.8991999999,
                        3426130.876599999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 45,
            "Layer": "一般区剖面",
            "PM": "210-210'",
            "序号": 210,
            "Shape_Length": 59.26765463657494
        },
        "geometry": {
            "paths": [
                [
                    [
                        604314.6838999996,
                        3426327.237299999
                    ],
                    [
                        604324.8640999999,
                        3426268.8505000008
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 46,
            "Layer": "一般区剖面",
            "PM": "211-211'",
            "序号": 211,
            "Shape_Length": 55.92424314612934
        },
        "geometry": {
            "paths": [
                [
                    [
                        604820.0499999998,
                        3426399.8231000008
                    ],
                    [
                        604831.6484000003,
                        3426345.1148000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 47,
            "Layer": "一般区剖面",
            "PM": "212-212'",
            "序号": 212,
            "Shape_Length": 70.56768139864121
        },
        "geometry": {
            "paths": [
                [
                    [
                        605336.5239000004,
                        3426484.4131000007
                    ],
                    [
                        605346.0532999998,
                        3426414.491800001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 48,
            "Layer": "一般区剖面",
            "PM": "214-214'",
            "序号": 214,
            "Shape_Length": 65.2754986604808
        },
        "geometry": {
            "paths": [
                [
                    [
                        606263.8125,
                        3426486.6975999998
                    ],
                    [
                        606258.2833000003,
                        3426421.6567
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 49,
            "Layer": "一般区剖面",
            "PM": "215-215'",
            "序号": 215,
            "Shape_Length": 44.83894580597603
        },
        "geometry": {
            "paths": [
                [
                    [
                        606745.4423000002,
                        3426505.2139999999
                    ],
                    [
                        606767.6279999996,
                        3426466.248299999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 50,
            "Layer": "一般区剖面",
            "PM": "216-216'",
            "序号": 216,
            "Shape_Length": 55.30513767521404
        },
        "geometry": {
            "paths": [
                [
                    [
                        607161.3600000003,
                        3426602.2457
                    ],
                    [
                        607163.3227000004,
                        3426546.975400001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 51,
            "Layer": "一般区剖面",
            "PM": "218-218'",
            "序号": 218,
            "Shape_Length": 84.269716607826
        },
        "geometry": {
            "paths": [
                [
                    [
                        608208.8651999999,
                        3426883.5879999997
                    ],
                    [
                        608224.3505999995,
                        3426800.7533
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 52,
            "Layer": "一般区剖面",
            "PM": "219-219'",
            "序号": 219,
            "Shape_Length": 82.4109026200418
        },
        "geometry": {
            "paths": [
                [
                    [
                        608677.7356000003,
                        3427077.386499999
                    ],
                    [
                        608705.7029999998,
                        3426999.8663
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 53,
            "Layer": "一般区剖面",
            "PM": "220-220'",
            "序号": 220,
            "Shape_Length": 63.85497235102828
        },
        "geometry": {
            "paths": [
                [
                    [
                        609162.6528000003,
                        3427239.2602999994
                    ],
                    [
                        609190.3285999997,
                        3427181.7146000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 54,
            "Layer": "一般区剖面",
            "PM": "221-221'",
            "序号": 221,
            "Shape_Length": 142.63772694782973
        },
        "geometry": {
            "paths": [
                [
                    [
                        609687.3935000002,
                        3427432.3740999998
                    ],
                    [
                        609691.6501000002,
                        3427289.799900001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 55,
            "Layer": "一般区剖面",
            "PM": "224-224'",
            "序号": 224,
            "Shape_Length": 68.16263306259951
        },
        "geometry": {
            "paths": [
                [
                    [
                        611218.8361,
                        3427887.4485
                    ],
                    [
                        611181.7739000004,
                        3427830.2424
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 56,
            "Layer": "一般区剖面",
            "PM": "225-225'",
            "序号": 225,
            "Shape_Length": 60.61124701237448
        },
        "geometry": {
            "paths": [
                [
                    [
                        611724.3710000003,
                        3428018.6491
                    ],
                    [
                        611745.2215999998,
                        3427961.7370999997
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 57,
            "Layer": "一般区剖面",
            "PM": "226-226'",
            "序号": 226,
            "Shape_Length": 73.7725211789177
        },
        "geometry": {
            "paths": [
                [
                    [
                        612172.3318999996,
                        3428211.0759999996
                    ],
                    [
                        612195.5164999999,
                        3428141.0413000008
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 58,
            "Layer": "一般区剖面",
            "PM": "227-227'",
            "序号": 227,
            "Shape_Length": 59.51757259936417
        },
        "geometry": {
            "paths": [
                [
                    [
                        612264.8836000003,
                        3428590.5670999998
                    ],
                    [
                        612320.8858000003,
                        3428610.7189000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 59,
            "Layer": "一般区剖面",
            "PM": "230-230'",
            "序号": 230,
            "Shape_Length": 59.97687503233611
        },
        "geometry": {
            "paths": [
                [
                    [
                        613709.7747999998,
                        3428667.3309000006
                    ],
                    [
                        613769.7512999997,
                        3428667.5429999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 60,
            "Layer": "一般区剖面",
            "PM": "231-231'",
            "序号": 231,
            "Shape_Length": 65.74549748112172
        },
        "geometry": {
            "paths": [
                [
                    [
                        613970.0279999999,
                        3428685.2031999996
                    ],
                    [
                        613905.3942,
                        3428673.164000001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 61,
            "Layer": "一般区剖面",
            "PM": "232-232'",
            "序号": 232,
            "Shape_Length": 61.152476069451669
        },
        "geometry": {
            "paths": [
                [
                    [
                        614015.5175999999,
                        3428590.8889000008
                    ],
                    [
                        613998.1703000004,
                        3428532.2485000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 62,
            "Layer": "一般区剖面",
            "PM": "233-233'",
            "序号": 233,
            "Shape_Length": 63.93556539992961
        },
        "geometry": {
            "paths": [
                [
                    [
                        614564.9398999997,
                        3428626.7697
                    ],
                    [
                        614554.3218,
                        3428563.721999999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 63,
            "Layer": "一般区剖面",
            "PM": "234-234'",
            "序号": 234,
            "Shape_Length": 80.3185274607983
        },
        "geometry": {
            "paths": [
                [
                    [
                        615160.9663000004,
                        3428734.108100001
                    ],
                    [
                        615219.3524000002,
                        3428678.9526000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 64,
            "Layer": "一般区剖面",
            "PM": "235-235'",
            "序号": 235,
            "Shape_Length": 136.30448051934793
        },
        "geometry": {
            "paths": [
                [
                    [
                        558582.6162,
                        3424715.174900001
                    ],
                    [
                        558513.5343000004,
                        3424832.6764
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 65,
            "Layer": "一般区剖面",
            "PM": "236-236'",
            "序号": 236,
            "Shape_Length": 75.37049835801608
        },
        "geometry": {
            "paths": [
                [
                    [
                        558934.7070000004,
                        3424958.4454999996
                    ],
                    [
                        558906.7936000004,
                        3425028.456599999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 66,
            "Layer": "一般区剖面",
            "PM": "237-237'",
            "序号": 237,
            "Shape_Length": 40.67282848052137
        },
        "geometry": {
            "paths": [
                [
                    [
                        559389.0379999997,
                        3425126.6631000007
                    ],
                    [
                        559375.2062999997,
                        3425164.911800001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 67,
            "Layer": "一般区剖面",
            "PM": "238-238'",
            "序号": 238,
            "Shape_Length": 59.678104573900998
        },
        "geometry": {
            "paths": [
                [
                    [
                        559875.8613999998,
                        3425187.0067
                    ],
                    [
                        559873.5339000002,
                        3425246.6393999999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 68,
            "Layer": "一般区剖面",
            "PM": "239-239'",
            "序号": 239,
            "Shape_Length": 54.06389297838324
        },
        "geometry": {
            "paths": [
                [
                    [
                        560393.0816000002,
                        3425189.5089999998
                    ],
                    [
                        560409.8874000004,
                        3425240.8945000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 69,
            "Layer": "一般区剖面",
            "PM": "240-240'",
            "序号": 240,
            "Shape_Length": 60.126071023660937
        },
        "geometry": {
            "paths": [
                [
                    [
                        560823.2600999996,
                        3425046.5562999995
                    ],
                    [
                        560831.4680000004,
                        3425106.1195
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 70,
            "Layer": "一般区剖面",
            "PM": "241-241'",
            "序号": 241,
            "Shape_Length": 138.68679995667118
        },
        "geometry": {
            "paths": [
                [
                    [
                        561232.0321000004,
                        3424824.627800001
                    ],
                    [
                        561322.5314999996,
                        3424929.717700001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 71,
            "Layer": "一般区剖面",
            "PM": "242-242'",
            "序号": 242,
            "Shape_Length": 44.98737216662885
        },
        "geometry": {
            "paths": [
                [
                    [
                        561631.7038000003,
                        3424903.0774000009
                    ],
                    [
                        561622.3739999998,
                        3424947.0867
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 72,
            "Layer": "一般区剖面",
            "PM": "243-243'",
            "序号": 243,
            "Shape_Length": 43.90568980319506
        },
        "geometry": {
            "paths": [
                [
                    [
                        561943.5828999998,
                        3424953.8467999997
                    ],
                    [
                        561947.6264000004,
                        3424997.5659
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 73,
            "Layer": "一般区剖面",
            "PM": "244-244'",
            "序号": 244,
            "Shape_Length": 48.437134871956988
        },
        "geometry": {
            "paths": [
                [
                    [
                        562239.4331,
                        3424882.8044000009
                    ],
                    [
                        562264.4396000002,
                        3424924.2873
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 74,
            "Layer": "一般区剖面",
            "PM": "245-245'",
            "序号": 245,
            "Shape_Length": 142.31995368877103
        },
        "geometry": {
            "paths": [
                [
                    [
                        562670.3957000002,
                        3424698.0660999997
                    ],
                    [
                        562706.7729000002,
                        3424835.658500001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 75,
            "Layer": "一般区剖面",
            "PM": "246-246'",
            "序号": 246,
            "Shape_Length": 162.70221484295898
        },
        "geometry": {
            "paths": [
                [
                    [
                        563009.2363,
                        3424556.347100001
                    ],
                    [
                        563097.6667,
                        3424692.9197000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 76,
            "Layer": "一般区剖面",
            "PM": "247-247'",
            "序号": 247,
            "Shape_Length": 106.06402838357762
        },
        "geometry": {
            "paths": [
                [
                    [
                        563399.4046999998,
                        3424380.9881999997
                    ],
                    [
                        563440.0555999996,
                        3424478.9529
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 77,
            "Layer": "一般区剖面",
            "PM": "248-248'",
            "序号": 248,
            "Shape_Length": 90.72324286839944
        },
        "geometry": {
            "paths": [
                [
                    [
                        563763.0985000003,
                        3424093.2622999998
                    ],
                    [
                        563793.0225,
                        3424111.3509
                    ],
                    [
                        563840.7390000001,
                        3424140.1948000008
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 78,
            "Layer": "一般区剖面",
            "PM": "249-249'",
            "序号": 249,
            "Shape_Length": 125.55553785943087
        },
        "geometry": {
            "paths": [
                [
                    [
                        564013.7319999999,
                        3423674.3311
                    ],
                    [
                        564012.2423,
                        3423799.877800001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 79,
            "Layer": "一般区剖面",
            "PM": "250-250'",
            "序号": 250,
            "Shape_Length": 53.06004490580505
        },
        "geometry": {
            "paths": [
                [
                    [
                        564297.3576999996,
                        3423728.2783000005
                    ],
                    [
                        564331.0735999998,
                        3423769.2490999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 80,
            "Layer": "一般区剖面",
            "PM": "254-254'",
            "序号": 254,
            "Shape_Length": 146.82028244642866
        },
        "geometry": {
            "paths": [
                [
                    [
                        565604.4479999999,
                        3422479.6887
                    ],
                    [
                        565703.4517000001,
                        3422588.1066999996
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 81,
            "Layer": "一般区剖面",
            "PM": "255-255'",
            "序号": 255,
            "Shape_Length": 155.26748989500519
        },
        "geometry": {
            "paths": [
                [
                    [
                        565839.4424999999,
                        3422079.4308
                    ],
                    [
                        565978.0898000002,
                        3422149.323000001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 82,
            "Layer": "一般区剖面",
            "PM": "256-256'",
            "序号": 256,
            "Shape_Length": 238.86440422333497
        },
        "geometry": {
            "paths": [
                [
                    [
                        565717.2943000002,
                        3421726.7105
                    ],
                    [
                        565947.6160000004,
                        3421663.400800001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 83,
            "Layer": "一般区剖面",
            "PM": "258-258'",
            "序号": 258,
            "Shape_Length": 180.3029469549022
        },
        "geometry": {
            "paths": [
                [
                    [
                        566998.7542000003,
                        3421549.3629
                    ],
                    [
                        567049.2871000003,
                        3421722.4397
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 84,
            "Layer": "一般区剖面",
            "PM": "260-260'",
            "序号": 260,
            "Shape_Length": 115.48324928742753
        },
        "geometry": {
            "paths": [
                [
                    [
                        567891.7220999999,
                        3421131.080499999
                    ],
                    [
                        567930.3219999997,
                        3421239.9218000008
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 85,
            "Layer": "一般区剖面",
            "PM": "262-262'",
            "序号": 262,
            "Shape_Length": 114.01762586989945
        },
        "geometry": {
            "paths": [
                [
                    [
                        568256.2940999996,
                        3420433.8893
                    ],
                    [
                        568369.4902999997,
                        3420420.2277000008
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 86,
            "Layer": "一般区剖面",
            "PM": "263-263'",
            "序号": 263,
            "Shape_Length": 82.90723500215859
        },
        "geometry": {
            "paths": [
                [
                    [
                        568737.0153000001,
                        3420414.3554999998
                    ],
                    [
                        568654.1083000004,
                        3420414.5528999997
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 87,
            "Layer": "一般区剖面",
            "PM": "264-264'",
            "序号": 264,
            "Shape_Length": 78.11405489234719
        },
        "geometry": {
            "paths": [
                [
                    [
                        569139.8532999996,
                        3420753.489600001
                    ],
                    [
                        569107.9005000005,
                        3420824.7695000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 88,
            "Layer": "一般区剖面",
            "PM": "265-265'",
            "序号": 265,
            "Shape_Length": 90.59947498568062
        },
        "geometry": {
            "paths": [
                [
                    [
                        569665.1365999999,
                        3421104.6614999996
                    ],
                    [
                        569648.8704000004,
                        3421193.7887999995
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 89,
            "Layer": "一般区剖面",
            "PM": "266-266'",
            "序号": 266,
            "Shape_Length": 50.24809284268466
        },
        "geometry": {
            "paths": [
                [
                    [
                        570078.2748999996,
                        3421283.8696
                    ],
                    [
                        570065.4501,
                        3421332.4535000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 90,
            "Layer": "一般区剖面",
            "PM": "267-267'",
            "序号": 267,
            "Shape_Length": 54.08810867490363
        },
        "geometry": {
            "paths": [
                [
                    [
                        570581.1551000001,
                        3421388.7150999999
                    ],
                    [
                        570564.6552999998,
                        3421440.2250999996
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 91,
            "Layer": "一般区剖面",
            "PM": "268-268'",
            "序号": 268,
            "Shape_Length": 42.2121437206169
        },
        "geometry": {
            "paths": [
                [
                    [
                        571019.3333,
                        3421499.8148
                    ],
                    [
                        571014.8868000005,
                        3421541.7920999994
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 92,
            "Layer": "一般区剖面",
            "PM": "269-269'",
            "序号": 269,
            "Shape_Length": 75.47632880360315
        },
        "geometry": {
            "paths": [
                [
                    [
                        571374.2673000004,
                        3421547.770300001
                    ],
                    [
                        571313.2585000005,
                        3421592.2068000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 93,
            "Layer": "一般区剖面",
            "PM": "271-271'",
            "序号": 271,
            "Shape_Length": 88.64994819447314
        },
        "geometry": {
            "paths": [
                [
                    [
                        572344.1616000002,
                        3421831.5743000006
                    ],
                    [
                        572312.9941999996,
                        3421914.5647
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 94,
            "Layer": "一般区剖面",
            "PM": "272-272'",
            "序号": 272,
            "Shape_Length": 51.009570823659498
        },
        "geometry": {
            "paths": [
                [
                    [
                        572893.6858000001,
                        3422035.979800001
                    ],
                    [
                        572868.5018999996,
                        3422080.3390999997
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 95,
            "Layer": "一般区剖面",
            "PM": "273-273'",
            "序号": 273,
            "Shape_Length": 64.66501245735037
        },
        "geometry": {
            "paths": [
                [
                    [
                        573427.2636000002,
                        3422214.6505999995
                    ],
                    [
                        573404.9024,
                        3422275.326300001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 96,
            "Layer": "一般区剖面",
            "PM": "274-274'",
            "序号": 274,
            "Shape_Length": 107.69587106385599
        },
        "geometry": {
            "paths": [
                [
                    [
                        573906.1431999998,
                        3422330.282299999
                    ],
                    [
                        573879.4101999998,
                        3422434.6075
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 97,
            "Layer": "一般区剖面",
            "PM": "275-275'",
            "序号": 275,
            "Shape_Length": 86.97586927654166
        },
        "geometry": {
            "paths": [
                [
                    [
                        574657.0790999997,
                        3422712.2279000005
                    ],
                    [
                        574604.5866,
                        3422781.577299999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 98,
            "Layer": "一般区剖面",
            "PM": "276-276'",
            "序号": 276,
            "Shape_Length": 73.39660733197091
        },
        "geometry": {
            "paths": [
                [
                    [
                        575238.4130999995,
                        3423134.8729
                    ],
                    [
                        575189.3934000004,
                        3423189.5001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 99,
            "Layer": "一般区剖面",
            "PM": "277-277'",
            "序号": 277,
            "Shape_Length": 57.41381710008821
        },
        "geometry": {
            "paths": [
                [
                    [
                        575628.7558000004,
                        3423539.4393000009
                    ],
                    [
                        575581.2039999999,
                        3423571.613399999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 100,
            "Layer": "一般区剖面",
            "PM": "278-278'",
            "序号": 278,
            "Shape_Length": 51.639960899945418
        },
        "geometry": {
            "paths": [
                [
                    [
                        575985.2507999996,
                        3423952.9220000004
                    ],
                    [
                        575946.0343000004,
                        3423986.5188999997
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 101,
            "Layer": "一般区剖面",
            "PM": "280-280'",
            "序号": 280,
            "Shape_Length": 104.99086603657926
        },
        "geometry": {
            "paths": [
                [
                    [
                        576649.5843000002,
                        3424565.798699999
                    ],
                    [
                        576600.5818999996,
                        3424658.6525999999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 102,
            "Layer": "一般区剖面",
            "PM": "281-281'",
            "序号": 281,
            "Shape_Length": 60.27747826577329
        },
        "geometry": {
            "paths": [
                [
                    [
                        577037.4403999997,
                        3424970.0199999997
                    ],
                    [
                        576997.5469000004,
                        3425015.2072
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 103,
            "Layer": "一般区剖面",
            "PM": "282-282'",
            "序号": 282,
            "Shape_Length": 57.00088550261351
        },
        "geometry": {
            "paths": [
                [
                    [
                        577445.8536999999,
                        3425231.8806
                    ],
                    [
                        577413.5619000001,
                        3425278.8522999996
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 104,
            "Layer": "一般区剖面",
            "PM": "283-283'",
            "序号": 283,
            "Shape_Length": 67.14552798951287
        },
        "geometry": {
            "paths": [
                [
                    [
                        577768.3469000002,
                        3425348.7479
                    ],
                    [
                        577802.5470000003,
                        3425406.5308999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 105,
            "Layer": "一般区剖面",
            "PM": "284-284'",
            "序号": 284,
            "Shape_Length": 49.76910260408071
        },
        "geometry": {
            "paths": [
                [
                    [
                        578301.5909000002,
                        3425631.308599999
                    ],
                    [
                        578284.2396,
                        3425677.9551
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 106,
            "Layer": "一般区剖面",
            "PM": "285-285'",
            "序号": 285,
            "Shape_Length": 50.12641592815221
        },
        "geometry": {
            "paths": [
                [
                    [
                        578760.8705000002,
                        3425752.6339
                    ],
                    [
                        578756.1557999998,
                        3425802.5381000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 107,
            "Layer": "一般区剖面",
            "PM": "286-286'",
            "序号": 286,
            "Shape_Length": 59.22193943130585
        },
        "geometry": {
            "paths": [
                [
                    [
                        579216.8563000001,
                        3425794.8617000004
                    ],
                    [
                        579214.6843999997,
                        3425854.0438
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 108,
            "Layer": "一般区剖面",
            "PM": "287-287'",
            "序号": 287,
            "Shape_Length": 51.67953285575557
        },
        "geometry": {
            "paths": [
                [
                    [
                        579662.7002999997,
                        3425814.430400001
                    ],
                    [
                        579701.5228000004,
                        3425848.5418
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 109,
            "Layer": "一般区剖面",
            "PM": "288-288'",
            "序号": 288,
            "Shape_Length": 85.0132886340198
        },
        "geometry": {
            "paths": [
                [
                    [
                        580236.9102999996,
                        3425819.7843999995
                    ],
                    [
                        580239.2747999998,
                        3425904.764799999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 110,
            "Layer": "一般区剖面",
            "PM": "289-289'",
            "序号": 289,
            "Shape_Length": 118.36635275683193
        },
        "geometry": {
            "paths": [
                [
                    [
                        580686.8898999998,
                        3425814.722100001
                    ],
                    [
                        580687.8197999997,
                        3425933.0847999996
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 111,
            "Layer": "一般区剖面",
            "PM": "290-290'",
            "序号": 290,
            "Shape_Length": 57.5793450175171
        },
        "geometry": {
            "paths": [
                [
                    [
                        581257.5903000003,
                        3425862.6252999997
                    ],
                    [
                        581253.6622000001,
                        3425920.0704999996
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 112,
            "Layer": "一般区剖面",
            "PM": "291-291'",
            "序号": 291,
            "Shape_Length": 61.97159431136249
        },
        "geometry": {
            "paths": [
                [
                    [
                        581725.0498000002,
                        3425927.5961000008
                    ],
                    [
                        581720.8306,
                        3425989.4239000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 113,
            "Layer": "一般区剖面",
            "PM": "292-292'",
            "序号": 292,
            "Shape_Length": 96.75651226482298
        },
        "geometry": {
            "paths": [
                [
                    [
                        582308.585,
                        3425988.251700001
                    ],
                    [
                        582306.7441999996,
                        3426084.990700001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 114,
            "Layer": "一般区剖面",
            "PM": "293-293'",
            "序号": 293,
            "Shape_Length": 82.98479634184015
        },
        "geometry": {
            "paths": [
                [
                    [
                        582775.8605000004,
                        3426039.805299999
                    ],
                    [
                        582788.7504000003,
                        3426121.7829
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 115,
            "Layer": "一般区剖面",
            "PM": "294-294'",
            "序号": 294,
            "Shape_Length": 56.45218477369538
        },
        "geometry": {
            "paths": [
                [
                    [
                        583281.4282,
                        3426046.043299999
                    ],
                    [
                        583316.6238000002,
                        3426090.1808
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 116,
            "Layer": "一般区剖面",
            "PM": "295-295'",
            "序号": 295,
            "Shape_Length": 54.26839094112988
        },
        "geometry": {
            "paths": [
                [
                    [
                        583844.1299999999,
                        3426028.4616
                    ],
                    [
                        583842.9244999997,
                        3426082.716600001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 117,
            "Layer": "一般区剖面",
            "PM": "296-296'",
            "序号": 296,
            "Shape_Length": 53.47547263903174
        },
        "geometry": {
            "paths": [
                [
                    [
                        584276.8194000004,
                        3426050.8067000007
                    ],
                    [
                        584280.9667999996,
                        3426104.121099999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 118,
            "Layer": "一般区剖面",
            "PM": "297-297'",
            "序号": 297,
            "Shape_Length": 56.964536118598498
        },
        "geometry": {
            "paths": [
                [
                    [
                        584676.5511999996,
                        3426013.8863999994
                    ],
                    [
                        584684.7446999997,
                        3426070.2586000005
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 119,
            "Layer": "一般区剖面",
            "PM": "298-298'",
            "序号": 298,
            "Shape_Length": 59.398336031283928
        },
        "geometry": {
            "paths": [
                [
                    [
                        585292.6846000003,
                        3425957.9607999997
                    ],
                    [
                        585297.0608999999,
                        3426017.1976999996
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 120,
            "Layer": "一般区剖面",
            "PM": "300-300'",
            "序号": 300,
            "Shape_Length": 50.33784325372924
        },
        "geometry": {
            "paths": [
                [
                    [
                        586284.3054,
                        3425880.9532999994
                    ],
                    [
                        586289.1134000002,
                        3425931.0610000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 121,
            "Layer": "一般区剖面",
            "PM": "301-301'",
            "序号": 301,
            "Shape_Length": 67.24975293361236
        },
        "geometry": {
            "paths": [
                [
                    [
                        586678.3838,
                        3425799.2338999996
                    ],
                    [
                        586730.2493000003,
                        3425842.0416
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 122,
            "Layer": "一般区剖面",
            "PM": "302-302'",
            "序号": 302,
            "Shape_Length": 40.11528088429422
        },
        "geometry": {
            "paths": [
                [
                    [
                        587107.2675999999,
                        3425577.230799999
                    ],
                    [
                        587107.0173000004,
                        3425617.3453
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 123,
            "Layer": "一般区剖面",
            "PM": "303-303'",
            "序号": 303,
            "Shape_Length": 58.04937845065863
        },
        "geometry": {
            "paths": [
                [
                    [
                        587580.7548000002,
                        3425376.9538000004
                    ],
                    [
                        587608.8667000001,
                        3425427.7421000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 124,
            "Layer": "一般区剖面",
            "PM": "304-304'",
            "序号": 304,
            "Shape_Length": 55.78893189294115
        },
        "geometry": {
            "paths": [
                [
                    [
                        588013.4622999998,
                        3425183.8837
                    ],
                    [
                        588040.9281000001,
                        3425232.4432999996
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 125,
            "Layer": "一般区剖面",
            "PM": "305-305'",
            "序号": 305,
            "Shape_Length": 60.765356084994817
        },
        "geometry": {
            "paths": [
                [
                    [
                        588478.5642999997,
                        3424948.544399999
                    ],
                    [
                        588506.7253999999,
                        3425002.3903
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 126,
            "Layer": "一般区剖面",
            "PM": "306-306'",
            "序号": 306,
            "Shape_Length": 74.67716584684249
        },
        "geometry": {
            "paths": [
                [
                    [
                        588870.7167999996,
                        3424666.7897999996
                    ],
                    [
                        588944.8952000002,
                        3424675.406300001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 127,
            "Layer": "一般区剖面",
            "PM": "314-314'",
            "序号": 314,
            "Shape_Length": 53.381832160197479
        },
        "geometry": {
            "paths": [
                [
                    [
                        590271.7312000003,
                        3423839.5243999997
                    ],
                    [
                        590297.4819999999,
                        3423886.284600001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 128,
            "Layer": "一般区剖面",
            "PM": "307-307'",
            "序号": 307,
            "Shape_Length": 87.56781998955914
        },
        "geometry": {
            "paths": [
                [
                    [
                        588575.6217,
                        3424347.9978
                    ],
                    [
                        588646.5425000005,
                        3424296.6328
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 129,
            "Layer": "一般区剖面",
            "PM": "308-308'",
            "序号": 308,
            "Shape_Length": 67.02329953224273
        },
        "geometry": {
            "paths": [
                [
                    [
                        588856.5771000004,
                        3424200.1077999996
                    ],
                    [
                        588814.3207999999,
                        3424252.132099999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 130,
            "Layer": "一般区剖面",
            "PM": "310-310'",
            "序号": 310,
            "Shape_Length": 118.36344117831213
        },
        "geometry": {
            "paths": [
                [
                    [
                        589830.8671000004,
                        3423645.193
                    ],
                    [
                        589919.1835000003,
                        3423723.997300001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 131,
            "Layer": "一般区剖面",
            "PM": "311-311'",
            "序号": 311,
            "Shape_Length": 58.86959869144914
        },
        "geometry": {
            "paths": [
                [
                    [
                        591114.2170000002,
                        3423044.8276000006
                    ],
                    [
                        591140.7616999997,
                        3423097.3729
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 132,
            "Layer": "一般区剖面",
            "PM": "313-313'",
            "序号": 313,
            "Shape_Length": 74.0892844745494
        },
        "geometry": {
            "paths": [
                [
                    [
                        590231.2533999998,
                        3423484.2782000007
                    ],
                    [
                        590157.1657999996,
                        3423483.7786
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 133,
            "Layer": "一般区剖面",
            "PM": "312-312'",
            "序号": 312,
            "Shape_Length": 84.70421101269973
        },
        "geometry": {
            "paths": [
                [
                    [
                        591749.0933999997,
                        3422896.3741999997
                    ],
                    [
                        591664.3981999997,
                        3422897.6097
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 134,
            "Layer": "一般区剖面",
            "PM": "321-321'",
            "序号": 321,
            "Shape_Length": 62.652660829172528
        },
        "geometry": {
            "paths": [
                [
                    [
                        593446.2594999997,
                        3423654.8287000006
                    ],
                    [
                        593400.3831000002,
                        3423697.4985000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 135,
            "Layer": "一般区剖面",
            "PM": "323-323'",
            "序号": 323,
            "Shape_Length": 62.0471225562403
        },
        "geometry": {
            "paths": [
                [
                    [
                        594294.8828999996,
                        3423761.599300001
                    ],
                    [
                        594291.8530000001,
                        3423823.5724
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 136,
            "Layer": "一般区剖面",
            "PM": "324-324'",
            "序号": 324,
            "Shape_Length": 60.26461150276502
        },
        "geometry": {
            "paths": [
                [
                    [
                        594722.2669000002,
                        3423809.8872999998
                    ],
                    [
                        594713.7139999997,
                        3423869.5418999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 137,
            "Layer": "一般区剖面",
            "PM": "1-1'",
            "序号": 1,
            "Shape_Length": 96.61946196272516
        },
        "geometry": {
            "paths": [
                [
                    [
                        552146.7472000001,
                        3422213.8268999999
                    ],
                    [
                        552151.1190999998,
                        3422117.306399999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 138,
            "Layer": "一般区剖面",
            "PM": "2-2’",
            "序号": 2,
            "Shape_Length": 162.93638861543657
        },
        "geometry": {
            "paths": [
                [
                    [
                        552586.7587000001,
                        3422310.8148999998
                    ],
                    [
                        552594.5143999998,
                        3422148.0632000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 139,
            "Layer": "一般区剖面",
            "PM": "3-3’",
            "序号": 3,
            "Shape_Length": 122.08481996304364
        },
        "geometry": {
            "paths": [
                [
                    [
                        553230.1237000004,
                        3422317.624399999
                    ],
                    [
                        553235.8255000003,
                        3422195.6728000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 140,
            "Layer": "一般区剖面",
            "PM": "4-4'",
            "序号": 4,
            "Shape_Length": 129.94452890150058
        },
        "geometry": {
            "paths": [
                [
                    [
                        553610.3102000002,
                        3422331.7842999997
                    ],
                    [
                        553630.3581999997,
                        3422203.3956000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 141,
            "Layer": "一般区剖面",
            "PM": "5-5'",
            "序号": 5,
            "Shape_Length": 108.94572714289052
        },
        "geometry": {
            "paths": [
                [
                    [
                        554111.2800000003,
                        3422336.7555
                    ],
                    [
                        554114.3909999998,
                        3422227.8542
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 142,
            "Layer": "一般区剖面",
            "PM": "6-6'",
            "序号": 6,
            "Shape_Length": 79.98390755664853
        },
        "geometry": {
            "paths": [
                [
                    [
                        554643.6868000003,
                        3422348.0624
                    ],
                    [
                        554655.1257999996,
                        3422268.900699999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 143,
            "Layer": "一般区剖面",
            "PM": "141-141'",
            "序号": 141,
            "Shape_Length": 179.50168691243008
        },
        "geometry": {
            "paths": [
                [
                    [
                        584919.3068000004,
                        3426848.3913000004
                    ],
                    [
                        584921.0000999998,
                        3426668.8976000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 144,
            "Layer": "一般区剖面",
            "PM": "54-54'",
            "序号": 54,
            "Shape_Length": 133.65785025090549
        },
        "geometry": {
            "paths": [
                [
                    [
                        563347.9133000001,
                        3426559.1381
                    ],
                    [
                        563217.6721000001,
                        3426589.1656
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 145,
            "Layer": "一般区剖面",
            "PM": "142-142'",
            "序号": 142,
            "Shape_Length": 319.16089202921207
        },
        "geometry": {
            "paths": [
                [
                    [
                        585120.1809999999,
                        3426852.2029999999
                    ],
                    [
                        585036.4029000001,
                        3426544.2339999994
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 146,
            "Layer": "一般区剖面",
            "PM": "143-143'",
            "序号": 143,
            "Shape_Length": 237.5280931750567
        },
        "geometry": {
            "paths": [
                [
                    [
                        585353.8294000002,
                        3426777.730799999
                    ],
                    [
                        585313.8542999998,
                        3426543.5907000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 147,
            "Layer": "一般区剖面",
            "PM": "144-144'",
            "序号": 144,
            "Shape_Length": 120.39148752324904
        },
        "geometry": {
            "paths": [
                [
                    [
                        585615.4375,
                        3426775.283399999
                    ],
                    [
                        585607.5739000002,
                        3426655.149
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 149,
            "Layer": "一般区剖面",
            "PM": "146-146'",
            "序号": 146,
            "Shape_Length": 115.86666022586789
        },
        "geometry": {
            "paths": [
                [
                    [
                        586331.5527999997,
                        3426584.9014999999
                    ],
                    [
                        586336.4053999996,
                        3426469.136499999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 150,
            "Layer": "一般区剖面",
            "PM": "147-147'",
            "序号": 147,
            "Shape_Length": 65.3617647328543
        },
        "geometry": {
            "paths": [
                [
                    [
                        586187.4210000001,
                        3426908.3796999996
                    ],
                    [
                        586252.7752,
                        3426909.3740999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 151,
            "Layer": "一般区剖面",
            "PM": "62-62'",
            "序号": 62,
            "Shape_Length": 68.5462818055738
        },
        "geometry": {
            "paths": [
                [
                    [
                        563624.0219,
                        3425401.1038000008
                    ],
                    [
                        563582.9789000005,
                        3425346.2032999994
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 152,
            "Layer": "一般区剖面",
            "PM": "64-64'",
            "序号": 64,
            "Shape_Length": 101.63715729019533
        },
        "geometry": {
            "paths": [
                [
                    [
                        564250.1134000002,
                        3424913.1033999996
                    ],
                    [
                        564192.7795000002,
                        3424829.1811999997
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 153,
            "Layer": "一般区剖面",
            "PM": "65-65'",
            "序号": 65,
            "Shape_Length": 234.8135003519681
        },
        "geometry": {
            "paths": [
                [
                    [
                        564824.9572999999,
                        3424687.324100001
                    ],
                    [
                        564682.5683000004,
                        3424500.6084000004
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 154,
            "Layer": "一般区剖面",
            "PM": "66-66'",
            "序号": 66,
            "Shape_Length": 138.60215465607718
        },
        "geometry": {
            "paths": [
                [
                    [
                        565167.0285999999,
                        3424302.7321000008
                    ],
                    [
                        565060.8278999999,
                        3424213.670499999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 155,
            "Layer": "一般区剖面",
            "PM": "71-71'",
            "序号": 71,
            "Shape_Length": 204.33764379986949
        },
        "geometry": {
            "paths": [
                [
                    [
                        567640.8649000004,
                        3422496.5204000009
                    ],
                    [
                        567514.1752000004,
                        3422336.1970000008
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 156,
            "Layer": "一般区剖面",
            "PM": "72-72'",
            "序号": 72,
            "Shape_Length": 495.06121347660817
        },
        "geometry": {
            "paths": [
                [
                    [
                        568180.8717,
                        3422479.634299999
                    ],
                    [
                        568153.1491999999,
                        3421985.3499
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 157,
            "Layer": "一般区剖面",
            "PM": "73-73'",
            "序号": 73,
            "Shape_Length": 156.6788205700773
        },
        "geometry": {
            "paths": [
                [
                    [
                        568691.1064999998,
                        3422379.093699999
                    ],
                    [
                        568682.0248999996,
                        3422222.6783000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 158,
            "Layer": "一般区剖面",
            "PM": "75-75'",
            "序号": 75,
            "Shape_Length": 121.70632551685756
        },
        "geometry": {
            "paths": [
                [
                    [
                        570656.3296999997,
                        3422728.709899999
                    ],
                    [
                        570636.1851000004,
                        3422608.6822999997
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 159,
            "Layer": "一般区剖面",
            "PM": "76-76'",
            "序号": 76,
            "Shape_Length": 175.71727879266155
        },
        "geometry": {
            "paths": [
                [
                    [
                        571092.5643999996,
                        3422869.204
                    ],
                    [
                        571132.9124999996,
                        3422698.1818000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 160,
            "Layer": "一般区剖面",
            "PM": "78-78'",
            "序号": 78,
            "Shape_Length": 166.63610491612634
        },
        "geometry": {
            "paths": [
                [
                    [
                        572102.0345999999,
                        3423078.682600001
                    ],
                    [
                        572124.3014000002,
                        3422913.5408999996
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 161,
            "Layer": "一般区剖面",
            "PM": "79-79'",
            "序号": 79,
            "Shape_Length": 143.08909606089365
        },
        "geometry": {
            "paths": [
                [
                    [
                        572558.2400000002,
                        3423156.1911999995
                    ],
                    [
                        572652.3912000004,
                        3423048.441299999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 162,
            "Layer": "一般区剖面",
            "PM": "161-161'",
            "序号": 161,
            "Shape_Length": 69.12558323101647
        },
        "geometry": {
            "paths": [
                [
                    [
                        590088.0351999998,
                        3424811.232000001
                    ],
                    [
                        590047.4863999998,
                        3424755.2486000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 163,
            "Layer": "一般区剖面",
            "PM": "166-166'",
            "序号": 166,
            "Shape_Length": 59.26458682936281
        },
        "geometry": {
            "paths": [
                [
                    [
                        590888.3465,
                        3424397.6915000008
                    ],
                    [
                        590863.9921000004,
                        3424343.6623
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 164,
            "Layer": "一般区剖面",
            "PM": "169-169'",
            "序号": 169,
            "Shape_Length": 53.099112525414927
        },
        "geometry": {
            "paths": [
                [
                    [
                        591401.2914000005,
                        3424300.133300001
                    ],
                    [
                        591398.2632999998,
                        3424247.1206
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 165,
            "Layer": "一般区剖面",
            "PM": "170-170'",
            "序号": 170,
            "Shape_Length": 57.16801925239838
        },
        "geometry": {
            "paths": [
                [
                    [
                        591814.1062000003,
                        3424330.1107
                    ],
                    [
                        591814.7756000003,
                        3424272.9465999996
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 166,
            "Layer": "一般区剖面",
            "PM": "173-173'",
            "序号": 173,
            "Shape_Length": 62.777435563250367
        },
        "geometry": {
            "paths": [
                [
                    [
                        592323.1162,
                        3424346.281300001
                    ],
                    [
                        592328.9786999999,
                        3424283.7782000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 167,
            "Layer": "一般区剖面",
            "PM": "182-182'",
            "序号": 182,
            "Shape_Length": 46.17513119796488
        },
        "geometry": {
            "paths": [
                [
                    [
                        593972.2052999996,
                        3424455.1219999997
                    ],
                    [
                        593975.2626999999,
                        3424409.0482
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 168,
            "Layer": "一般区剖面",
            "PM": "185-185'",
            "序号": 185,
            "Shape_Length": 60.5129193162936
        },
        "geometry": {
            "paths": [
                [
                    [
                        594894.2570000002,
                        3424555.464299999
                    ],
                    [
                        594894.5077,
                        3424494.9518999999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 169,
            "Layer": "一般区剖面",
            "PM": "195-195'",
            "序号": 195,
            "Shape_Length": 79.88111642086435
        },
        "geometry": {
            "paths": [
                [
                    [
                        596693.1797000002,
                        3424850.0143999999
                    ],
                    [
                        596711.7774999999,
                        3424772.328400001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 170,
            "Layer": "一般区剖面",
            "PM": "199-199'",
            "序号": 199,
            "Shape_Length": 41.298011032172578
        },
        "geometry": {
            "paths": [
                [
                    [
                        598672.7302000001,
                        3425292.1733
                    ],
                    [
                        598680.1182000004,
                        3425251.5415000005
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 171,
            "Layer": "一般区剖面",
            "PM": "201-201'",
            "序号": 201,
            "Shape_Length": 55.501222232715779
        },
        "geometry": {
            "paths": [
                [
                    [
                        599666.8453000002,
                        3425532.1602
                    ],
                    [
                        599677.1522000004,
                        3425477.624399999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 172,
            "Layer": "一般区剖面",
            "PM": "206-206'",
            "序号": 206,
            "Shape_Length": 44.209359119981787
        },
        "geometry": {
            "paths": [
                [
                    [
                        602183.9598000003,
                        3425802.4712000007
                    ],
                    [
                        602184.0321000004,
                        3425758.2619000005
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 173,
            "Layer": "一般区剖面",
            "PM": "213-213'",
            "序号": 213,
            "Shape_Length": 42.335053264990289
        },
        "geometry": {
            "paths": [
                [
                    [
                        605756.0299000004,
                        3426475.0979999995
                    ],
                    [
                        605748.7355000004,
                        3426433.3960999997
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 174,
            "Layer": "一般区剖面",
            "PM": "217-217'",
            "序号": 217,
            "Shape_Length": 50.29665829270515
        },
        "geometry": {
            "paths": [
                [
                    [
                        607664.0663999999,
                        3426719.1840000005
                    ],
                    [
                        607669.8025000002,
                        3426669.215500001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 175,
            "Layer": "一般区剖面",
            "PM": "251-251'",
            "序号": 251,
            "Shape_Length": 69.51204015317278
        },
        "geometry": {
            "paths": [
                [
                    [
                        564651.0449000001,
                        3423387.5437000005
                    ],
                    [
                        564697.1749999998,
                        3423439.5430999996
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 176,
            "Layer": "一般区剖面",
            "PM": "252-252'",
            "序号": 252,
            "Shape_Length": 125.4469162990246
        },
        "geometry": {
            "paths": [
                [
                    [
                        564923.6246999996,
                        3423096.1259000005
                    ],
                    [
                        565014.7810000004,
                        3423182.308599999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 177,
            "Layer": "一般区剖面",
            "PM": "253-253'",
            "序号": 253,
            "Shape_Length": 45.445470153988448
        },
        "geometry": {
            "paths": [
                [
                    [
                        565344.9302000003,
                        3422825.9177
                    ],
                    [
                        565373.5525000002,
                        3422861.2172
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 178,
            "Layer": "一般区剖面",
            "PM": "257-257'",
            "序号": 257,
            "Shape_Length": 52.060172274525239
        },
        "geometry": {
            "paths": [
                [
                    [
                        566351.1178000001,
                        3421506.4482000006
                    ],
                    [
                        566333.6085000001,
                        3421555.4756000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 179,
            "Layer": "一般区剖面",
            "PM": "259-259'",
            "序号": 259,
            "Shape_Length": 203.52753193557104
        },
        "geometry": {
            "paths": [
                [
                    [
                        567380.9304999998,
                        3421310.828400001
                    ],
                    [
                        567498.0310000004,
                        3421477.294399999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 180,
            "Layer": "一般区剖面",
            "PM": "270-270'",
            "序号": 270,
            "Shape_Length": 50.84420830133678
        },
        "geometry": {
            "paths": [
                [
                    [
                        571880.0506999996,
                        3421704.7237
                    ],
                    [
                        571869.1030000001,
                        3421754.3752999997
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 181,
            "Layer": "一般区剖面",
            "PM": "279-279'",
            "序号": 279,
            "Shape_Length": 44.701497658146468
        },
        "geometry": {
            "paths": [
                [
                    [
                        576275.5153999999,
                        3424206.5351
                    ],
                    [
                        576242.1498999996,
                        3424236.283500001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 182,
            "Layer": "一般区剖面",
            "PM": "299-299'",
            "序号": 299,
            "Shape_Length": 50.34248946800535
        },
        "geometry": {
            "paths": [
                [
                    [
                        585633.7363,
                        3425942.3336999996
                    ],
                    [
                        585638.1606000001,
                        3425992.4814
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 183,
            "Layer": "一般区剖面",
            "PM": "309-309'",
            "序号": 309,
            "Shape_Length": 71.76865212591
        },
        "geometry": {
            "paths": [
                [
                    [
                        589422.2906999998,
                        3424308.7277000008
                    ],
                    [
                        589451.7533,
                        3424374.17
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 184,
            "Layer": "一般区剖面",
            "PM": "325-325'",
            "序号": 325,
            "Shape_Length": 62.846532272988309
        },
        "geometry": {
            "paths": [
                [
                    [
                        595154.2445999999,
                        3423873.374500001
                    ],
                    [
                        595145.1527000005,
                        3423935.5599000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 185,
            "Layer": "一般区剖面",
            "PM": "326-326'",
            "序号": 326,
            "Shape_Length": 49.45176101122931
        },
        "geometry": {
            "paths": [
                [
                    [
                        595686.2851999998,
                        3423938.338300001
                    ],
                    [
                        595676.7160999999,
                        3423986.8554
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 186,
            "Layer": "一般区剖面",
            "PM": "327-327'",
            "序号": 327,
            "Shape_Length": 64.89644290029099
        },
        "geometry": {
            "paths": [
                [
                    [
                        596089.0322000003,
                        3423991.7741
                    ],
                    [
                        596067.3852000004,
                        3424052.9538000004
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 187,
            "Layer": "一般区剖面",
            "PM": "328-328'",
            "序号": 328,
            "Shape_Length": 50.30893462980896
        },
        "geometry": {
            "paths": [
                [
                    [
                        596475.9380000001,
                        3424075.832699999
                    ],
                    [
                        596466.3901000004,
                        3424125.2272999996
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 188,
            "Layer": "一般区剖面",
            "PM": "329-329'",
            "序号": 329,
            "Shape_Length": 44.791593328941598
        },
        "geometry": {
            "paths": [
                [
                    [
                        596867.0081000002,
                        3424169.676999999
                    ],
                    [
                        596855.0109000001,
                        3424212.8320000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 189,
            "Layer": "一般区剖面",
            "PM": "330-330'",
            "序号": 330,
            "Shape_Length": 51.86684829893023
        },
        "geometry": {
            "paths": [
                [
                    [
                        597256.2879999997,
                        3424237.1457
                    ],
                    [
                        597245.6286000004,
                        3424287.9054000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 190,
            "Layer": "一般区剖面",
            "PM": "331-331'",
            "序号": 331,
            "Shape_Length": 58.58625160566786
        },
        "geometry": {
            "paths": [
                [
                    [
                        597621.9084000001,
                        3424308.0403000006
                    ],
                    [
                        597627.0409000004,
                        3424366.4013
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 191,
            "Layer": "一般区剖面",
            "PM": "332-332'",
            "序号": 332,
            "Shape_Length": 53.80396862219618
        },
        "geometry": {
            "paths": [
                [
                    [
                        598050.2443000004,
                        3424326.49
                    ],
                    [
                        598042.6759000002,
                        3424379.7589999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 192,
            "Layer": "一般区剖面",
            "PM": "333-333'",
            "序号": 333,
            "Shape_Length": 56.24113592974757
        },
        "geometry": {
            "paths": [
                [
                    [
                        598457.7849000003,
                        3424472.966600001
                    ],
                    [
                        598438.0077,
                        3424525.615700001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 193,
            "Layer": "一般区剖面",
            "PM": "334-334'",
            "序号": 334,
            "Shape_Length": 57.45565357683628
        },
        "geometry": {
            "paths": [
                [
                    [
                        598847.3587999996,
                        3424579.038899999
                    ],
                    [
                        598829.8076,
                        3424633.7481999995
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 194,
            "Layer": "一般区剖面",
            "PM": "335-335'",
            "序号": 335,
            "Shape_Length": 110.0855007942241
        },
        "geometry": {
            "paths": [
                [
                    [
                        599226.2089999998,
                        3424690.1114000009
                    ],
                    [
                        599200.8962000003,
                        3424797.247199999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 195,
            "Layer": "一般区剖面",
            "PM": "336-336'",
            "序号": 336,
            "Shape_Length": 69.71696422641108
        },
        "geometry": {
            "paths": [
                [
                    [
                        599707.8070999999,
                        3424801.3160999997
                    ],
                    [
                        599697.2702000002,
                        3424870.2322000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 196,
            "Layer": "一般区剖面",
            "PM": "337-337'",
            "序号": 337,
            "Shape_Length": 61.59560707582238
        },
        "geometry": {
            "paths": [
                [
                    [
                        600094.6273999997,
                        3424905.6743
                    ],
                    [
                        600084.9189999998,
                        3424966.5
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 197,
            "Layer": "一般区剖面",
            "PM": "338-338'",
            "序号": 338,
            "Shape_Length": 48.50890521547109
        },
        "geometry": {
            "paths": [
                [
                    [
                        600492.3563000001,
                        3424939.1853
                    ],
                    [
                        600487.0137,
                        3424987.3991
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 198,
            "Layer": "一般区剖面",
            "PM": "339-339'",
            "序号": 339,
            "Shape_Length": 59.69619420819583
        },
        "geometry": {
            "paths": [
                [
                    [
                        600908.5576,
                        3424953.4056
                    ],
                    [
                        600917.2313000001,
                        3425012.4683
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 199,
            "Layer": "一般区剖面",
            "PM": "229-229'",
            "序号": 229,
            "Shape_Length": 59.18466305651939
        },
        "geometry": {
            "paths": [
                [
                    [
                        613189.4435999999,
                        3428334.3232000006
                    ],
                    [
                        613186.6606999999,
                        3428275.204
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 200,
            "Layer": "一般区剖面",
            "PM": "228-228'",
            "序号": 228,
            "Shape_Length": 76.23357440728809
        },
        "geometry": {
            "paths": [
                [
                    [
                        612623.9238,
                        3428419.1986999998
                    ],
                    [
                        612690.6195,
                        3428456.1207999999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 201,
            "Layer": "一般区剖面",
            "PM": "261-261'",
            "序号": 261,
            "Shape_Length": 177.50865363390933
        },
        "geometry": {
            "paths": [
                [
                    [
                        568286.2742999997,
                        3420841.6712999998
                    ],
                    [
                        568462.8919000002,
                        3420859.4349000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 202,
            "Layer": "一般区剖面",
            "PM": "322-322'",
            "序号": 322,
            "Shape_Length": 47.62417981553311
        },
        "geometry": {
            "paths": [
                [
                    [
                        593887.8322999999,
                        3423768.1306999998
                    ],
                    [
                        593890.7159000002,
                        3423720.5939000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 203,
            "Layer": "重点区剖面",
            "PM": "LD2-LD2'",
            "序号": 408,
            "Shape_Length": 68.90684840644714
        },
        "geometry": {
            "paths": [
                [
                    [
                        610272.6639999999,
                        3427533.7501
                    ],
                    [
                        610312.5190000003,
                        3427477.5385999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 204,
            "Layer": "重点区剖面",
            "PM": "LD1-LD1'",
            "序号": 407,
            "Shape_Length": 85.98571410616414
        },
        "geometry": {
            "paths": [
                [
                    [
                        610123.6306999996,
                        3427460.1663000008
                    ],
                    [
                        610052.6394999996,
                        3427411.6503999999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 205,
            "Layer": "重点区剖面",
            "PM": "LD5-LD5'",
            "序号": 411,
            "Shape_Length": 45.200006997580178
        },
        "geometry": {
            "paths": [
                [
                    [
                        610934.3904999998,
                        3427741.7379
                    ],
                    [
                        610948.8647999996,
                        3427698.9180999996
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 206,
            "Layer": "重点区剖面",
            "PM": "LD3-LD3'",
            "序号": 409,
            "Shape_Length": 70.79129824048728
        },
        "geometry": {
            "paths": [
                [
                    [
                        610513.4467000002,
                        3427629.719799999
                    ],
                    [
                        610532.4632000001,
                        3427561.5305000005
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 207,
            "Layer": "重点区剖面",
            "PM": "LD4-LD4'",
            "序号": 410,
            "Shape_Length": 58.58588651972216
        },
        "geometry": {
            "paths": [
                [
                    [
                        610755.6253000004,
                        3427646.8896999994
                    ],
                    [
                        610732.5314999996,
                        3427700.731899999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 208,
            "Layer": "重点区剖面",
            "PM": "LD6-LD6'",
            "序号": 412,
            "Shape_Length": 44.31843203468968
        },
        "geometry": {
            "paths": [
                [
                    [
                        611124.5511999996,
                        3427837.9790000005
                    ],
                    [
                        611080.6750999997,
                        3427831.733100001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 209,
            "Layer": "重点区剖面",
            "PM": "315-315'",
            "序号": 315,
            "Shape_Length": 68.99621133919493
        },
        "geometry": {
            "paths": [
                [
                    [
                        590742.5657000002,
                        3423657.2347
                    ],
                    [
                        590765.1103999997,
                        3423722.4437000008
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 210,
            "Layer": "重点区剖面",
            "PM": "317-317'",
            "序号": 317,
            "Shape_Length": 66.1786110972628
        },
        "geometry": {
            "paths": [
                [
                    [
                        591750.2795000002,
                        3423540.9758
                    ],
                    [
                        591746.0732000005,
                        3423607.0206000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 211,
            "Layer": "重点区剖面",
            "PM": "319-319'",
            "序号": 319,
            "Shape_Length": 51.838603584924609
        },
        "geometry": {
            "paths": [
                [
                    [
                        592592.3453000002,
                        3423595.9266
                    ],
                    [
                        592587.3898,
                        3423647.5277999995
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 212,
            "Layer": "重点区剖面",
            "PM": "320-320'",
            "序号": 320,
            "Shape_Length": 54.78790068584162
        },
        "geometry": {
            "paths": [
                [
                    [
                        593007.0431000004,
                        3423638.0320999997
                    ],
                    [
                        593001.5357999997,
                        3423692.5425000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 213,
            "Layer": "重点区剖面",
            "PM": "XJ1-XJ1'",
            "序号": 401,
            "Shape_Length": 84.17856107053402
        },
        "geometry": {
            "paths": [
                [
                    [
                        590920.4900000002,
                        3423581.546599999
                    ],
                    [
                        590945.4241000004,
                        3423661.9475999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 214,
            "Layer": "重点区剖面",
            "PM": "XJ4-XJ4'",
            "序号": 404,
            "Shape_Length": 53.25369033714917
        },
        "geometry": {
            "paths": [
                [
                    [
                        592381.8147,
                        3423582.6931999998
                    ],
                    [
                        592381.3903999999,
                        3423635.9452
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 215,
            "Layer": "重点区剖面",
            "PM": "XJ5-XJ5'",
            "序号": 405,
            "Shape_Length": 64.9758250629598
        },
        "geometry": {
            "paths": [
                [
                    [
                        592782.2730999999,
                        3423599.6040000005
                    ],
                    [
                        592780.2461000001,
                        3423664.5482
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 216,
            "Layer": "重点区剖面",
            "PM": "XJ6-XJ6'",
            "序号": 406,
            "Shape_Length": 47.18293586178706
        },
        "geometry": {
            "paths": [
                [
                    [
                        593241.9933000002,
                        3423643.7568999996
                    ],
                    [
                        593239.9762000004,
                        3423690.8967000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 217,
            "Layer": "重点区剖面",
            "PM": "316-316'",
            "序号": 316,
            "Shape_Length": 101.63257654289122
        },
        "geometry": {
            "paths": [
                [
                    [
                        591242.8776000002,
                        3423627.9342
                    ],
                    [
                        591233.3372,
                        3423526.7503999995
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 218,
            "Layer": "重点区剖面",
            "PM": "350-350'",
            "序号": 350,
            "Shape_Length": 199.21954219523495
        },
        "geometry": {
            "paths": [
                [
                    [
                        603904.9698999999,
                        3425396.6282
                    ],
                    [
                        604017.9881999996,
                        3425232.5693999996
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 219,
            "Layer": "重点区剖面",
            "PM": "345-345'",
            "序号": 345,
            "Shape_Length": 234.77418013955796
        },
        "geometry": {
            "paths": [
                [
                    [
                        602622.1884000003,
                        3425021.9287
                    ],
                    [
                        602510.0427999999,
                        3425228.1865
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 220,
            "Layer": "重点区剖面",
            "PM": "382-382'",
            "序号": 382,
            "Shape_Length": 72.21431100807033
        },
        "geometry": {
            "paths": [
                [
                    [
                        611709.0471999999,
                        3427132.430299999
                    ],
                    [
                        611680.5303999996,
                        3427198.7755999995
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 221,
            "Layer": "重点区剖面",
            "PM": "344-344'",
            "序号": 344,
            "Shape_Length": 122.0301981735123
        },
        "geometry": {
            "paths": [
                [
                    [
                        602282.5806999998,
                        3425093.305299999
                    ],
                    [
                        602303.6874000002,
                        3425213.4963000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 222,
            "Layer": "重点区剖面",
            "PM": "346-346'",
            "序号": 346,
            "Shape_Length": 169.20527503835346
        },
        "geometry": {
            "paths": [
                [
                    [
                        602812.0330999997,
                        3425112.1469
                    ],
                    [
                        602846.8130999999,
                        3425277.7391
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 223,
            "Layer": "重点区剖面",
            "PM": "347-347'",
            "序号": 347,
            "Shape_Length": 288.2041247169521
        },
        "geometry": {
            "paths": [
                [
                    [
                        602991.3024000004,
                        3424987.5792999996
                    ],
                    [
                        603149.9654999999,
                        3425228.1777999999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 224,
            "Layer": "重点区剖面",
            "PM": "348-348'",
            "序号": 348,
            "Shape_Length": 96.74345176486836
        },
        "geometry": {
            "paths": [
                [
                    [
                        603475.6133000003,
                        3425049.4154000005
                    ],
                    [
                        603413.8183000004,
                        3425123.8510999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 225,
            "Layer": "重点区剖面",
            "PM": "349-349'",
            "序号": 349,
            "Shape_Length": 134.36480606351598
        },
        "geometry": {
            "paths": [
                [
                    [
                        603769.5414000005,
                        3425130.4289999997
                    ],
                    [
                        603705.9301000005,
                        3425248.782299999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 226,
            "Layer": "重点区剖面",
            "PM": "352-352'",
            "序号": 352,
            "Shape_Length": 73.13161148032381
        },
        "geometry": {
            "paths": [
                [
                    [
                        604446.0296,
                        3425501.753799999
                    ],
                    [
                        604430.3998999996,
                        3425573.195699999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 227,
            "Layer": "重点区剖面",
            "PM": "354-354'",
            "序号": 354,
            "Shape_Length": 137.82857769460743
        },
        "geometry": {
            "paths": [
                [
                    [
                        605302.9179999996,
                        3425622.3660000006
                    ],
                    [
                        605268.2626,
                        3425755.7665999999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 228,
            "Layer": "重点区剖面",
            "PM": "355-355'",
            "序号": 355,
            "Shape_Length": 80.31662237903153
        },
        "geometry": {
            "paths": [
                [
                    [
                        605554.3108000001,
                        3425642.346000001
                    ],
                    [
                        605587.1108999997,
                        3425715.6598000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 229,
            "Layer": "重点区剖面",
            "PM": "356-356'",
            "序号": 356,
            "Shape_Length": 71.02821316663339
        },
        "geometry": {
            "paths": [
                [
                    [
                        605758.1984999999,
                        3425604.1055999996
                    ],
                    [
                        605751.3183000004,
                        3425674.799799999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 230,
            "Layer": "重点区剖面",
            "PM": "357-357'",
            "序号": 357,
            "Shape_Length": 112.73217363392063
        },
        "geometry": {
            "paths": [
                [
                    [
                        606021.2585000005,
                        3425615.713300001
                    ],
                    [
                        605993.5915000001,
                        3425724.9977
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 231,
            "Layer": "重点区剖面",
            "PM": "358-358'",
            "序号": 358,
            "Shape_Length": 84.42866720196636
        },
        "geometry": {
            "paths": [
                [
                    [
                        606262.8991999999,
                        3425716.0946999995
                    ],
                    [
                        606238.3039999995,
                        3425796.8615000008
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 232,
            "Layer": "重点区剖面",
            "PM": "360-360'",
            "序号": 360,
            "Shape_Length": 103.25226623905975
        },
        "geometry": {
            "paths": [
                [
                    [
                        606739.0845999997,
                        3425785.6722999999
                    ],
                    [
                        606720.4016000005,
                        3425887.2202000005
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 233,
            "Layer": "重点区剖面",
            "PM": "361-361'",
            "序号": 361,
            "Shape_Length": 97.56893570095383
        },
        "geometry": {
            "paths": [
                [
                    [
                        606979.8392000003,
                        3425816.6141
                    ],
                    [
                        606981.0914000003,
                        3425914.1750000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 234,
            "Layer": "重点区剖面",
            "PM": "362-362'",
            "序号": 362,
            "Shape_Length": 179.77875899657554
        },
        "geometry": {
            "paths": [
                [
                    [
                        607198.5455999998,
                        3425704.2554
                    ],
                    [
                        607194.6386000002,
                        3425883.991699999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 235,
            "Layer": "重点区剖面",
            "PM": "363-363'",
            "序号": 363,
            "Shape_Length": 64.8481761689697
        },
        "geometry": {
            "paths": [
                [
                    [
                        607352.4771999996,
                        3425768.7949
                    ],
                    [
                        607366.5687999996,
                        3425832.0934999997
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 236,
            "Layer": "重点区剖面",
            "PM": "365-365'",
            "序号": 365,
            "Shape_Length": 57.99211453819828
        },
        "geometry": {
            "paths": [
                [
                    [
                        607738.6100000003,
                        3425782.2313
                    ],
                    [
                        607739.9073999999,
                        3425840.208900001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 237,
            "Layer": "重点区剖面",
            "PM": "366-366'",
            "序号": 366,
            "Shape_Length": 53.7485287814317
        },
        "geometry": {
            "paths": [
                [
                    [
                        607967.5521999998,
                        3425802.7138
                    ],
                    [
                        607948.1338999998,
                        3425852.8320000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 238,
            "Layer": "重点区剖面",
            "PM": "367-367'",
            "序号": 367,
            "Shape_Length": 57.947674980272179
        },
        "geometry": {
            "paths": [
                [
                    [
                        608169.6131999996,
                        3425873.906300001
                    ],
                    [
                        608137.9035999999,
                        3425922.4081999997
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 239,
            "Layer": "重点区剖面",
            "PM": "368-368'",
            "序号": 368,
            "Shape_Length": 49.77611172005526
        },
        "geometry": {
            "paths": [
                [
                    [
                        608391.5743000005,
                        3426053.0045999998
                    ],
                    [
                        608366.2599,
                        3426095.863
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 240,
            "Layer": "重点区剖面",
            "PM": "369-369'",
            "序号": 369,
            "Shape_Length": 63.82063783756962
        },
        "geometry": {
            "paths": [
                [
                    [
                        608575.1065999996,
                        3426125.977
                    ],
                    [
                        608540.4675000003,
                        3426179.5792999996
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 241,
            "Layer": "重点区剖面",
            "PM": "370-370'",
            "序号": 370,
            "Shape_Length": 118.70226512221965
        },
        "geometry": {
            "paths": [
                [
                    [
                        608813.7070000004,
                        3426218.9442999998
                    ],
                    [
                        608740.6935,
                        3426312.5352
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 242,
            "Layer": "重点区剖面",
            "PM": "371-371'",
            "序号": 371,
            "Shape_Length": 58.37182223074772
        },
        "geometry": {
            "paths": [
                [
                    [
                        608960.9700999996,
                        3426349.1873000005
                    ],
                    [
                        608927.0388000002,
                        3426396.6840000005
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 243,
            "Layer": "重点区剖面",
            "PM": "372-372'",
            "序号": 372,
            "Shape_Length": 61.78381065515518
        },
        "geometry": {
            "paths": [
                [
                    [
                        609091.8682000004,
                        3426470.3802000007
                    ],
                    [
                        609055.9211999998,
                        3426520.6301000008
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 244,
            "Layer": "重点区剖面",
            "PM": "374-374’",
            "序号": 374,
            "Shape_Length": 107.034275000292
        },
        "geometry": {
            "paths": [
                [
                    [
                        609700.4741000002,
                        3426504.1448
                    ],
                    [
                        609662.1278999997,
                        3426604.0743000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 245,
            "Layer": "重点区剖面",
            "PM": "376-376'",
            "序号": 376,
            "Shape_Length": 193.08974971481897
        },
        "geometry": {
            "paths": [
                [
                    [
                        610134.0335999997,
                        3426536.225299999
                    ],
                    [
                        610079.4331999999,
                        3426721.4344999997
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 246,
            "Layer": "重点区剖面",
            "PM": "377-377'",
            "序号": 377,
            "Shape_Length": 72.59396538934445
        },
        "geometry": {
            "paths": [
                [
                    [
                        610477.8531999998,
                        3426715.0604
                    ],
                    [
                        610465.8592999997,
                        3426786.6567
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 247,
            "Layer": "重点区剖面",
            "PM": "378-378'",
            "序号": 378,
            "Shape_Length": 112.8013891811701
        },
        "geometry": {
            "paths": [
                [
                    [
                        610782.6941999998,
                        3426831.3290999999
                    ],
                    [
                        610736.1107000001,
                        3426934.0624
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 248,
            "Layer": "重点区剖面",
            "PM": "379-379'",
            "序号": 379,
            "Shape_Length": 78.90616214546226
        },
        "geometry": {
            "paths": [
                [
                    [
                        611001.5522999996,
                        3426990.872199999
                    ],
                    [
                        610952.7635000004,
                        3427052.887
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 249,
            "Layer": "重点区剖面",
            "PM": "381-381'",
            "序号": 381,
            "Shape_Length": 135.05950188281759
        },
        "geometry": {
            "paths": [
                [
                    [
                        611536.3372999998,
                        3427014.4886000009
                    ],
                    [
                        611513.9504000004,
                        3427147.6798
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 250,
            "Layer": "重点区剖面",
            "PM": "383-383'",
            "序号": 383,
            "Shape_Length": 82.32430533109421
        },
        "geometry": {
            "paths": [
                [
                    [
                        611927.3284,
                        3427213.183
                    ],
                    [
                        611879.3685999997,
                        3427280.0944999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 251,
            "Layer": "重点区剖面",
            "PM": "385-385'",
            "序号": 385,
            "Shape_Length": 117.4929841605565
        },
        "geometry": {
            "paths": [
                [
                    [
                        612609.6380000003,
                        3427214.5787000006
                    ],
                    [
                        612559.1287000002,
                        3427320.6608000008
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 252,
            "Layer": "重点区剖面",
            "PM": "386-386'",
            "序号": 386,
            "Shape_Length": 99.42607288812752
        },
        "geometry": {
            "paths": [
                [
                    [
                        612844.9102999996,
                        3427274.468800001
                    ],
                    [
                        612805.2544,
                        3427365.644200001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 253,
            "Layer": "重点区剖面",
            "PM": "387-387'",
            "序号": 387,
            "Shape_Length": 113.66028913669736
        },
        "geometry": {
            "paths": [
                [
                    [
                        613050.2500999998,
                        3427403.8356999999
                    ],
                    [
                        612979.7461000001,
                        3427492.9864000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 254,
            "Layer": "重点区剖面",
            "PM": "389-389'",
            "序号": 389,
            "Shape_Length": 181.8240207373769
        },
        "geometry": {
            "paths": [
                [
                    [
                        613495.1607999997,
                        3427455.3596
                    ],
                    [
                        613469.2914000005,
                        3427635.333900001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 255,
            "Layer": "重点区剖面",
            "PM": "391-391'",
            "序号": 391,
            "Shape_Length": 169.98746887833324
        },
        "geometry": {
            "paths": [
                [
                    [
                        614097.6961000003,
                        3427496.8308000008
                    ],
                    [
                        614094.9385000002,
                        3427666.7959000004
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 256,
            "Layer": "重点区剖面",
            "PM": "392-392'",
            "序号": 392,
            "Shape_Length": 114.91855804507297
        },
        "geometry": {
            "paths": [
                [
                    [
                        614461.0994999996,
                        3427591.4782999998
                    ],
                    [
                        614397.9402999999,
                        3427687.4845000004
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 257,
            "Layer": "重点区剖面",
            "PM": "393-393'",
            "序号": 393,
            "Shape_Length": 152.02733011154937
        },
        "geometry": {
            "paths": [
                [
                    [
                        614698.7682999997,
                        3427704.1029000005
                    ],
                    [
                        614661.5389999999,
                        3427851.5012999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 258,
            "Layer": "重点区剖面",
            "PM": "394-394'",
            "序号": 394,
            "Shape_Length": 130.32441242312425
        },
        "geometry": {
            "paths": [
                [
                    [
                        615112.9384000003,
                        3427866.838300001
                    ],
                    [
                        615047.2725999998,
                        3427979.4102999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 259,
            "Layer": "重点区剖面",
            "PM": "340-340'",
            "序号": 340,
            "Shape_Length": 60.78755767791166
        },
        "geometry": {
            "paths": [
                [
                    [
                        601409.9156,
                        3425041.6471999997
                    ],
                    [
                        601411.8491000002,
                        3424980.8904
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 260,
            "Layer": "重点区剖面",
            "PM": "341-341'",
            "序号": 341,
            "Shape_Length": 54.895500437505678
        },
        "geometry": {
            "paths": [
                [
                    [
                        601589.8417999996,
                        3425051.3135
                    ],
                    [
                        601593.2274000002,
                        3424996.522500001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 261,
            "Layer": "重点区剖面",
            "PM": "343-343'",
            "序号": 343,
            "Shape_Length": 79.97623576059311
        },
        "geometry": {
            "paths": [
                [
                    [
                        602063.4384000003,
                        3425088.2929
                    ],
                    [
                        602059.9748,
                        3425168.1941
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 262,
            "Layer": "重点区剖面",
            "PM": "351-351'",
            "序号": 351,
            "Shape_Length": 98.09103085717621
        },
        "geometry": {
            "paths": [
                [
                    [
                        604215.0082,
                        3425424.4848999998
                    ],
                    [
                        604193.4299999997,
                        3425520.1731000004
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 263,
            "Layer": "重点区剖面",
            "PM": "353-353'",
            "序号": 353,
            "Shape_Length": 70.31232637635672
        },
        "geometry": {
            "paths": [
                [
                    [
                        604720.1538000004,
                        3425498.1141999999
                    ],
                    [
                        604770.7544999998,
                        3425546.9342
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 264,
            "Layer": "重点区剖面",
            "PM": "358-359'",
            "序号": 359,
            "Shape_Length": 74.07002591483178
        },
        "geometry": {
            "paths": [
                [
                    [
                        606534.8457000004,
                        3425803.9385
                    ],
                    [
                        606495.8174999999,
                        3425866.8922000008
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 265,
            "Layer": "重点区剖面",
            "PM": "364-364'",
            "序号": 364,
            "Shape_Length": 55.96133877447613
        },
        "geometry": {
            "paths": [
                [
                    [
                        607554.4578,
                        3425812.4700000009
                    ],
                    [
                        607572.2324000001,
                        3425759.4065000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 266,
            "Layer": "重点区剖面",
            "PM": "375-375'",
            "序号": 375,
            "Shape_Length": 65.16423401368488
        },
        "geometry": {
            "paths": [
                [
                    [
                        609928.7609000001,
                        3426634.2355000006
                    ],
                    [
                        609947.8025000002,
                        3426571.9154000005
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 267,
            "Layer": "重点区剖面",
            "PM": "380-380'",
            "序号": 380,
            "Shape_Length": 124.32716795786834
        },
        "geometry": {
            "paths": [
                [
                    [
                        611248.6995999999,
                        3427059.1998999996
                    ],
                    [
                        611279.4387999997,
                        3426938.7326999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 268,
            "Layer": "重点区剖面",
            "PM": "384-384'",
            "序号": 384,
            "Shape_Length": 47.586218543240239
        },
        "geometry": {
            "paths": [
                [
                    [
                        612270.7370999996,
                        3427342.5056
                    ],
                    [
                        612254.0115,
                        3427297.955600001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 269,
            "Layer": "重点区剖面",
            "PM": "388-388'",
            "序号": 388,
            "Shape_Length": 113.42874832499706
        },
        "geometry": {
            "paths": [
                [
                    [
                        613201.2832000004,
                        3427421.5011
                    ],
                    [
                        613183.9308000002,
                        3427533.5946999995
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 270,
            "Layer": "重点区剖面",
            "PM": "390-390'",
            "序号": 390,
            "Shape_Length": 127.43121764613835
        },
        "geometry": {
            "paths": [
                [
                    [
                        613800.2679000003,
                        3427611.4705999998
                    ],
                    [
                        613791.1528000003,
                        3427484.3658000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 271,
            "Layer": "重点区剖面",
            "PM": "395-395'",
            "序号": 395,
            "Shape_Length": 118.89464785297409
        },
        "geometry": {
            "paths": [
                [
                    [
                        615345.3132999996,
                        3427968.9552999997
                    ],
                    [
                        615337.5221999995,
                        3427850.3161999995
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 272,
            "Layer": "重点区剖面",
            "PM": "396-396'",
            "序号": 396,
            "Shape_Length": 144.04241968828655
        },
        "geometry": {
            "paths": [
                [
                    [
                        615555.2450000001,
                        3427866.9976000005
                    ],
                    [
                        615571.7550999997,
                        3427723.9045
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 273,
            "Layer": "重点区剖面",
            "PM": "318-318'",
            "序号": 318,
            "Shape_Length": 57.0320945132964
        },
        "geometry": {
            "paths": [
                [
                    [
                        592161.7270999998,
                        3423570.291099999
                    ],
                    [
                        592158.2549,
                        3423627.2173999997
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 274,
            "Layer": "重点区剖面",
            "PM": "XJ2-XJ2'",
            "序号": 402,
            "Shape_Length": 117.79655439575858
        },
        "geometry": {
            "paths": [
                [
                    [
                        591552.4764,
                        3423476.2069000008
                    ],
                    [
                        591551.8334999997,
                        3423594.001700001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 275,
            "Layer": "重点区剖面",
            "PM": "XJ3-XJ3'",
            "序号": 403,
            "Shape_Length": 57.0766213592784
        },
        "geometry": {
            "paths": [
                [
                    [
                        591976.6990999999,
                        3423561.2588
                    ],
                    [
                        591972.3502000002,
                        3423618.169500001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 276,
            "Layer": "重点区剖面",
            "PM": "126-126'",
            "序号": 126,
            "Shape_Length": 89.04026016142062
        },
        "geometry": {
            "paths": [
                [
                    [
                        581513.3019000003,
                        3426792.8442
                    ],
                    [
                        581517.1120999996,
                        3426703.885500001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 277,
            "Layer": "重点区剖面",
            "PM": "83-83'",
            "序号": 83,
            "Shape_Length": 76.68237804496916
        },
        "geometry": {
            "paths": [
                [
                    [
                        573628.4181000004,
                        3423506.9836999999
                    ],
                    [
                        573632.7995999996,
                        3423430.4266
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 278,
            "Layer": "重点区剖面",
            "PM": "84-84'",
            "序号": 84,
            "Shape_Length": 156.75444938723406
        },
        "geometry": {
            "paths": [
                [
                    [
                        573738.5272000004,
                        3423579.4738
                    ],
                    [
                        573814.2548000002,
                        3423442.2248
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 279,
            "Layer": "重点区剖面",
            "PM": "94-94'",
            "序号": 94,
            "Shape_Length": 212.11099918342533
        },
        "geometry": {
            "paths": [
                [
                    [
                        575194.3499999996,
                        3424551.6762000008
                    ],
                    [
                        575208.1363000004,
                        3424340.013699999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 280,
            "Layer": "重点区剖面",
            "PM": "97-97’",
            "序号": 97,
            "Shape_Length": 72.14036722137493
        },
        "geometry": {
            "paths": [
                [
                    [
                        575375.2426000005,
                        3424669.3658000009
                    ],
                    [
                        575421.8205000004,
                        3424724.4541999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 281,
            "Layer": "重点区剖面",
            "PM": "99-99'",
            "序号": 99,
            "Shape_Length": 174.87500278740618
        },
        "geometry": {
            "paths": [
                [
                    [
                        575650.0382000003,
                        3425264.6964
                    ],
                    [
                        575756.6613999996,
                        3425126.0863000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 282,
            "Layer": "重点区剖面",
            "PM": "101-101’",
            "序号": 101,
            "Shape_Length": 114.12295759883587
        },
        "geometry": {
            "paths": [
                [
                    [
                        575997.9337999998,
                        3425563.0149000009
                    ],
                    [
                        576071.1484000003,
                        3425475.4725
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 283,
            "Layer": "重点区剖面",
            "PM": "102-102'",
            "序号": 102,
            "Shape_Length": 138.560692035171
        },
        "geometry": {
            "paths": [
                [
                    [
                        576296.5552000003,
                        3425632.4591000007
                    ],
                    [
                        576353.4511000002,
                        3425506.1185999999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 284,
            "Layer": "重点区剖面",
            "PM": "122-122'",
            "序号": 122,
            "Shape_Length": 83.85457255145015
        },
        "geometry": {
            "paths": [
                [
                    [
                        580589.9014999997,
                        3426750.6445000006
                    ],
                    [
                        580592.0438999999,
                        3426666.8172999995
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 285,
            "Layer": "重点区剖面",
            "PM": "123-123'",
            "序号": 123,
            "Shape_Length": 69.0373159779749
        },
        "geometry": {
            "paths": [
                [
                    [
                        580793.1147999996,
                        3426736.5536
                    ],
                    [
                        580788.8896000004,
                        3426667.6457
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 286,
            "Layer": "重点区剖面",
            "PM": "124-124'",
            "序号": 124,
            "Shape_Length": 69.08385876891916
        },
        "geometry": {
            "paths": [
                [
                    [
                        581080.9269000003,
                        3426734.0725
                    ],
                    [
                        581070.6116000004,
                        3426665.7631
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 287,
            "Layer": "重点区剖面",
            "PM": "125-125'",
            "序号": 125,
            "Shape_Length": 71.02530500779857
        },
        "geometry": {
            "paths": [
                [
                    [
                        581266.3513000002,
                        3426753.045600001
                    ],
                    [
                        581285.2153000003,
                        3426684.5712
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 288,
            "Layer": "重点区剖面",
            "PM": "80-80'",
            "序号": 80,
            "Shape_Length": 165.8765586260209
        },
        "geometry": {
            "paths": [
                [
                    [
                        572982.7759999996,
                        3423416.318
                    ],
                    [
                        573083.8894999996,
                        3423284.8224
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 289,
            "Layer": "重点区剖面",
            "PM": "81-81'",
            "序号": 81,
            "Shape_Length": 147.9336558773326
        },
        "geometry": {
            "paths": [
                [
                    [
                        573276.5979000004,
                        3423594.8696999999
                    ],
                    [
                        573288.9698999999,
                        3423447.4542999996
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 290,
            "Layer": "重点区剖面",
            "PM": "82-82'",
            "序号": 82,
            "Shape_Length": 89.54188458078123
        },
        "geometry": {
            "paths": [
                [
                    [
                        573499.0182999997,
                        3423529.8202
                    ],
                    [
                        573448.3908000002,
                        3423455.9649
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 291,
            "Layer": "重点区剖面",
            "PM": "98-98'",
            "序号": 98,
            "Shape_Length": 175.43779173411395
        },
        "geometry": {
            "paths": [
                [
                    [
                        575512.1224999996,
                        3425177.1039000006
                    ],
                    [
                        575416.8563000001,
                        3425029.7852999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 292,
            "Layer": "重点区剖面",
            "PM": "89-89'",
            "序号": 89,
            "Shape_Length": 203.392233705235
        },
        "geometry": {
            "paths": [
                [
                    [
                        574527.0230999999,
                        3423920.9076000007
                    ],
                    [
                        574565.1308000004,
                        3423721.1172
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 293,
            "Layer": "重点区剖面",
            "PM": "92-92'",
            "序号": 92,
            "Shape_Length": 375.60789954930859
        },
        "geometry": {
            "paths": [
                [
                    [
                        575095.5809000004,
                        3423982.2751
                    ],
                    [
                        574857.3683000002,
                        3424272.6818000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 294,
            "Layer": "重点区剖面",
            "PM": "100-100'",
            "序号": 100,
            "Shape_Length": 158.96417179733019
        },
        "geometry": {
            "paths": [
                [
                    [
                        575769.7889999999,
                        3425325.7487000005
                    ],
                    [
                        575894.4554000003,
                        3425227.1185999999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 295,
            "Layer": "重点区剖面",
            "PM": "85-85'",
            "序号": 85,
            "Shape_Length": 223.9703846883828
        },
        "geometry": {
            "paths": [
                [
                    [
                        573818.9117999999,
                        3423712.7424999999
                    ],
                    [
                        573941.2778000003,
                        3423525.1544000005
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 296,
            "Layer": "重点区剖面",
            "PM": "96-96'",
            "序号": 96,
            "Shape_Length": 387.0130883120926
        },
        "geometry": {
            "paths": [
                [
                    [
                        575265.2444000002,
                        3424724.123400001
                    ],
                    [
                        575619.5838000001,
                        3424568.4869
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 297,
            "Layer": "重点区剖面",
            "PM": "90-90'",
            "序号": 90,
            "Shape_Length": 435.55925267215647
        },
        "geometry": {
            "paths": [
                [
                    [
                        574446.9128,
                        3424113.671599999
                    ],
                    [
                        574713.8439999996,
                        3423769.4920000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 298,
            "Layer": "重点区剖面",
            "PM": "95-95'",
            "序号": 95,
            "Shape_Length": 376.01156756075616
        },
        "geometry": {
            "paths": [
                [
                    [
                        575196.8011999996,
                        3424604.5516999999
                    ],
                    [
                        575486.3768999996,
                        3424364.6963
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 299,
            "Layer": "重点区剖面",
            "PM": "109-109'",
            "序号": 109,
            "Shape_Length": 105.37412482834955
        },
        "geometry": {
            "paths": [
                [
                    [
                        577766.2139999997,
                        3426382.1691999996
                    ],
                    [
                        577823.0702,
                        3426293.450099999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 300,
            "Layer": "重点区剖面",
            "PM": "86-86'",
            "序号": 86,
            "Shape_Length": 63.23724161056263
        },
        "geometry": {
            "paths": [
                [
                    [
                        573915.3115999997,
                        3423744.934699999
                    ],
                    [
                        573958.8969999999,
                        3423790.7523999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 301,
            "Layer": "重点区剖面",
            "PM": "87-87’",
            "序号": 87,
            "Shape_Length": 109.1752841548502
        },
        "geometry": {
            "paths": [
                [
                    [
                        574177.5694000004,
                        3423935.5668
                    ],
                    [
                        574114.1221000003,
                        3423846.7204
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 302,
            "Layer": "重点区剖面",
            "PM": "93-93'",
            "序号": 93,
            "Shape_Length": 357.52492253898415
        },
        "geometry": {
            "paths": [
                [
                    [
                        574877.2194999997,
                        3424496.0058999995
                    ],
                    [
                        575123.1047999999,
                        3424236.4592000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 303,
            "Layer": "重点区剖面",
            "PM": "103-103'",
            "序号": 103,
            "Shape_Length": 159.21723414268926
        },
        "geometry": {
            "paths": [
                [
                    [
                        576530.2679000003,
                        3425769.443499999
                    ],
                    [
                        576601.5537999999,
                        3425627.076199999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 304,
            "Layer": "重点区剖面",
            "PM": "104-104'",
            "序号": 104,
            "Shape_Length": 156.18933418297238
        },
        "geometry": {
            "paths": [
                [
                    [
                        576722.0837000003,
                        3425901.3762
                    ],
                    [
                        576802.0405000001,
                        3425767.2046000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 305,
            "Layer": "重点区剖面",
            "PM": "105-105’",
            "序号": 105,
            "Shape_Length": 114.77725015159996
        },
        "geometry": {
            "paths": [
                [
                    [
                        576903.9594,
                        3425971.9569000008
                    ],
                    [
                        576955.8640999999,
                        3425869.5864000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 306,
            "Layer": "重点区剖面",
            "PM": "106-106'",
            "序号": 106,
            "Shape_Length": 137.33742917646706
        },
        "geometry": {
            "paths": [
                [
                    [
                        577156.6003,
                        3426119.9783999996
                    ],
                    [
                        577207.7925000005,
                        3425992.5385
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 307,
            "Layer": "重点区剖面",
            "PM": "107-107'",
            "序号": 107,
            "Shape_Length": 119.49994485202822
        },
        "geometry": {
            "paths": [
                [
                    [
                        577374.3487,
                        3426218.4351000005
                    ],
                    [
                        577421.2248,
                        3426108.5130000005
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 308,
            "Layer": "重点区剖面",
            "PM": "108-108'",
            "序号": 108,
            "Shape_Length": 184.6908816738035
        },
        "geometry": {
            "paths": [
                [
                    [
                        577565.0153999999,
                        3426348.861300001
                    ],
                    [
                        577655.3668,
                        3426187.7795
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 309,
            "Layer": "重点区剖面",
            "PM": "114-114'",
            "序号": 114,
            "Shape_Length": 55.21014334631151
        },
        "geometry": {
            "paths": [
                [
                    [
                        578915.4209000003,
                        3426629.6775
                    ],
                    [
                        578922.0608999999,
                        3426574.8681000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 310,
            "Layer": "重点区剖面",
            "PM": "115-115'",
            "序号": 115,
            "Shape_Length": 80.60395767132296
        },
        "geometry": {
            "paths": [
                [
                    [
                        579136.0206000004,
                        3426670.3358999995
                    ],
                    [
                        579140.4310999997,
                        3426589.8527000008
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 311,
            "Layer": "重点区剖面",
            "PM": "116-116'",
            "序号": 116,
            "Shape_Length": 100.34057772851247
        },
        "geometry": {
            "paths": [
                [
                    [
                        579342.2481000004,
                        3426703.0601000005
                    ],
                    [
                        579338.8317,
                        3426602.7776999997
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 312,
            "Layer": "重点区剖面",
            "PM": "117-117'",
            "序号": 117,
            "Shape_Length": 69.07664388548902
        },
        "geometry": {
            "paths": [
                [
                    [
                        579579.2956999997,
                        3426680.8352000007
                    ],
                    [
                        579601.6571000004,
                        3426615.4781
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 313,
            "Layer": "重点区剖面",
            "PM": "118-118'",
            "序号": 118,
            "Shape_Length": 54.24334920712448
        },
        "geometry": {
            "paths": [
                [
                    [
                        579772.3021,
                        3426770.931
                    ],
                    [
                        579730.6330000004,
                        3426736.2030999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 314,
            "Layer": "重点区剖面",
            "PM": "119-119'",
            "序号": 119,
            "Shape_Length": 79.37793352936072
        },
        "geometry": {
            "paths": [
                [
                    [
                        579925.2061999999,
                        3426724.3082
                    ],
                    [
                        579930.4836999998,
                        3426645.105900001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 315,
            "Layer": "重点区剖面",
            "PM": "120-120'",
            "序号": 120,
            "Shape_Length": 72.78896958501787
        },
        "geometry": {
            "paths": [
                [
                    [
                        580191.9585999996,
                        3426695.3571000008
                    ],
                    [
                        580194.3825000003,
                        3426622.6085
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 316,
            "Layer": "重点区剖面",
            "PM": "121-121'",
            "序号": 121,
            "Shape_Length": 71.70489113186318
        },
        "geometry": {
            "paths": [
                [
                    [
                        580416.8535000002,
                        3426722.662900001
                    ],
                    [
                        580419.8869000003,
                        3426651.0221999997
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 317,
            "Layer": "重点区剖面",
            "PM": "127-127'",
            "序号": 127,
            "Shape_Length": 120.4977035951911
        },
        "geometry": {
            "paths": [
                [
                    [
                        581793.5669,
                        3426808.8015
                    ],
                    [
                        581782.3512000004,
                        3426688.8268999999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 318,
            "Layer": "重点区剖面",
            "PM": "129-129'",
            "序号": 129,
            "Shape_Length": 98.26559461690913
        },
        "geometry": {
            "paths": [
                [
                    [
                        582214.1969999997,
                        3426803.284600001
                    ],
                    [
                        582219.6478000004,
                        3426705.1702999996
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 319,
            "Layer": "重点区剖面",
            "PM": "132-132'",
            "序号": 132,
            "Shape_Length": 108.38789232271818
        },
        "geometry": {
            "paths": [
                [
                    [
                        582873.8212000001,
                        3426856.9341
                    ],
                    [
                        582824.7657000003,
                        3426760.2827000005
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 320,
            "Layer": "重点区剖面",
            "PM": "134-134'",
            "序号": 134,
            "Shape_Length": 106.7338277773302
        },
        "geometry": {
            "paths": [
                [
                    [
                        583279.6619999996,
                        3426833.095899999
                    ],
                    [
                        583277.5184000004,
                        3426726.3836000005
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 321,
            "Layer": "重点区剖面",
            "PM": "137-137'",
            "序号": 137,
            "Shape_Length": 131.1500954666341
        },
        "geometry": {
            "paths": [
                [
                    [
                        584016.0027999999,
                        3426941.3224
                    ],
                    [
                        584021.4626000002,
                        3426810.2860000005
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 322,
            "Layer": "重点区剖面",
            "PM": "138-138'",
            "序号": 138,
            "Shape_Length": 103.23435540881681
        },
        "geometry": {
            "paths": [
                [
                    [
                        584251.8408000004,
                        3426877.2513999997
                    ],
                    [
                        584253.2959000003,
                        3426774.0273
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 323,
            "Layer": "重点区剖面",
            "PM": "91-91’",
            "序号": 91,
            "Shape_Length": 436.71006807884626
        },
        "geometry": {
            "paths": [
                [
                    [
                        574594.3386000004,
                        3424224.662900001
                    ],
                    [
                        574871.2894000001,
                        3423887.0034
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 324,
            "Layer": "重点区剖面",
            "PM": "111-111'",
            "序号": 111,
            "Shape_Length": 81.34197948919582
        },
        "geometry": {
            "paths": [
                [
                    [
                        578186.7433000002,
                        3426517.5474999996
                    ],
                    [
                        578129.5685999999,
                        3426459.6893000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 325,
            "Layer": "重点区剖面",
            "PM": "112-112'",
            "序号": 112,
            "Shape_Length": 62.57692765502337
        },
        "geometry": {
            "paths": [
                [
                    [
                        578411.0301000001,
                        3426556.7245000007
                    ],
                    [
                        578424.9565000003,
                        3426495.7169000005
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 326,
            "Layer": "重点区剖面",
            "PM": "113-113'",
            "序号": 113,
            "Shape_Length": 73.47640867523744
        },
        "geometry": {
            "paths": [
                [
                    [
                        578619.4413000001,
                        3426601.994000001
                    ],
                    [
                        578634.8777999999,
                        3426530.157400001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 327,
            "Layer": "重点区剖面",
            "PM": "130-130'",
            "序号": 130,
            "Shape_Length": 118.48503720122386
        },
        "geometry": {
            "paths": [
                [
                    [
                        582453.0499,
                        3426841.2158000005
                    ],
                    [
                        582437.0824999996,
                        3426723.8115999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 328,
            "Layer": "重点区剖面",
            "PM": "136-136'",
            "序号": 136,
            "Shape_Length": 124.89593072449043
        },
        "geometry": {
            "paths": [
                [
                    [
                        583746.2599999998,
                        3426882.6773000007
                    ],
                    [
                        583760.3765000003,
                        3426758.581700001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 329,
            "Layer": "重点区剖面",
            "PM": "88-88'",
            "序号": 88,
            "Shape_Length": 247.71840387238263
        },
        "geometry": {
            "paths": [
                [
                    [
                        574320.4561999999,
                        3423936.0928000009
                    ],
                    [
                        574311.9698999999,
                        3423688.5198
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 330,
            "Layer": "重点区剖面",
            "PM": "110-110'",
            "序号": 110,
            "Shape_Length": 69.73700973237527
        },
        "geometry": {
            "paths": [
                [
                    [
                        577918.0423999997,
                        3426570.4415000008
                    ],
                    [
                        577963.6425000001,
                        3426517.6789999997
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 331,
            "Layer": "重点区剖面",
            "PM": "128-128'",
            "序号": 128,
            "Shape_Length": 83.55127942718389
        },
        "geometry": {
            "paths": [
                [
                    [
                        581991.4269000003,
                        3426834.1942
                    ],
                    [
                        581991.1750999997,
                        3426750.6433000008
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 332,
            "Layer": "重点区剖面",
            "PM": "131-131’",
            "序号": 131,
            "Shape_Length": 112.27823053844341
        },
        "geometry": {
            "paths": [
                [
                    [
                        582634.0917999996,
                        3426721.7939999999
                    ],
                    [
                        582627.6277000001,
                        3426833.886
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 333,
            "Layer": "重点区剖面",
            "PM": "133-133'",
            "序号": 133,
            "Shape_Length": 89.35503077496198
        },
        "geometry": {
            "paths": [
                [
                    [
                        583022.2518999996,
                        3426846.9956
                    ],
                    [
                        583026.9923,
                        3426757.7664
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 334,
            "Layer": "重点区剖面",
            "PM": "135-135'",
            "序号": 135,
            "Shape_Length": 143.57491115675095
        },
        "geometry": {
            "paths": [
                [
                    [
                        583492.1832999997,
                        3426700.900800001
                    ],
                    [
                        583528.6447000001,
                        3426839.7687999999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 335,
            "Layer": "重点区剖面",
            "PM": "139-139'",
            "序号": 139,
            "Shape_Length": 111.56793943070226
        },
        "geometry": {
            "paths": [
                [
                    [
                        584458.3645000001,
                        3426816.4925999997
                    ],
                    [
                        584469.2503000004,
                        3426705.4570000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 336,
            "Layer": "重点区剖面",
            "PM": "140-140'",
            "序号": 140,
            "Shape_Length": 104.97074862134919
        },
        "geometry": {
            "paths": [
                [
                    [
                        584561.8971999995,
                        3426786.903000001
                    ],
                    [
                        584626.8416999998,
                        3426869.3716
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 337,
            "Layer": "重点区剖面",
            "PM": "20-20'",
            "序号": 20,
            "Shape_Length": 184.65374505832294
        },
        "geometry": {
            "paths": [
                [
                    [
                        556828.4060000004,
                        3424437.275800001
                    ],
                    [
                        556971.7414999995,
                        3424320.863
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 338,
            "Layer": "重点区剖面",
            "PM": "21-21'",
            "序号": 21,
            "Shape_Length": 88.13009583487757
        },
        "geometry": {
            "paths": [
                [
                    [
                        557105.4972999999,
                        3424607.2446999999
                    ],
                    [
                        557083.3139000004,
                        3424521.9521999994
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 339,
            "Layer": "重点区剖面",
            "PM": "40-40'",
            "序号": 40,
            "Shape_Length": 88.28864133951874
        },
        "geometry": {
            "paths": [
                [
                    [
                        560312.0325999996,
                        3426107.210999999
                    ],
                    [
                        560332.4965000004,
                        3426021.3267
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 340,
            "Layer": "重点区剖面",
            "PM": "42-42'",
            "序号": 42,
            "Shape_Length": 46.321669053794909
        },
        "geometry": {
            "paths": [
                [
                    [
                        560777.2925000005,
                        3426038.8555999996
                    ],
                    [
                        560786.2750000004,
                        3425993.4132000005
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 341,
            "Layer": "重点区剖面",
            "PM": "44-44'",
            "序号": 44,
            "Shape_Length": 137.1329837387194
        },
        "geometry": {
            "paths": [
                [
                    [
                        561138.5261000004,
                        3426107.1378000008
                    ],
                    [
                        561103.0928999996,
                        3425974.6615999995
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 342,
            "Layer": "重点区剖面",
            "PM": "46-46'",
            "序号": 46,
            "Shape_Length": 56.86456214110476
        },
        "geometry": {
            "paths": [
                [
                    [
                        561545.2367000002,
                        3426023.5285
                    ],
                    [
                        561567.3455999997,
                        3425971.1379000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 343,
            "Layer": "重点区剖面",
            "PM": "48-48'",
            "序号": 48,
            "Shape_Length": 114.98723580751049
        },
        "geometry": {
            "paths": [
                [
                    [
                        561861.4623999996,
                        3426254.4443999996
                    ],
                    [
                        561917.6684999997,
                        3426154.1302000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 344,
            "Layer": "重点区剖面",
            "PM": "49-49'",
            "序号": 49,
            "Shape_Length": 119.24320554835636
        },
        "geometry": {
            "paths": [
                [
                    [
                        562040.1934000002,
                        3426349.1040000005
                    ],
                    [
                        562072.1586999996,
                        3426234.2250999996
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 345,
            "Layer": "重点区剖面",
            "PM": "50-50'",
            "序号": 50,
            "Shape_Length": 205.37972506673843
        },
        "geometry": {
            "paths": [
                [
                    [
                        562320.7856999999,
                        3426377.657400001
                    ],
                    [
                        562342.5601000004,
                        3426173.4352
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 346,
            "Layer": "重点区剖面",
            "PM": "52-52'",
            "序号": 52,
            "Shape_Length": 191.29431406161559
        },
        "geometry": {
            "paths": [
                [
                    [
                        562677.4583,
                        3426348.7687999999
                    ],
                    [
                        562645.4411000004,
                        3426160.1729000008
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 347,
            "Layer": "重点区剖面",
            "PM": "399-399'",
            "序号": 399,
            "Shape_Length": 77.19895558799928
        },
        "geometry": {
            "paths": [
                [
                    [
                        560735.3342000004,
                        3426175.0886000005
                    ],
                    [
                        560658.4034000002,
                        3426181.5175
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 348,
            "Layer": "重点区剖面",
            "PM": "7-7'",
            "序号": 7,
            "Shape_Length": 73.84526453798087
        },
        "geometry": {
            "paths": [
                [
                    [
                        555154.9721999997,
                        3422451.346999999
                    ],
                    [
                        555182.9724000003,
                        3422383.0161000008
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 349,
            "Layer": "重点区剖面",
            "PM": "8-8'",
            "序号": 8,
            "Shape_Length": 114.13737052470172
        },
        "geometry": {
            "paths": [
                [
                    [
                        555303.7613000004,
                        3422549.5479000008
                    ],
                    [
                        555376.9369999999,
                        3422461.9541999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 350,
            "Layer": "重点区剖面",
            "PM": "11-11'",
            "序号": 11,
            "Shape_Length": 77.02284482626519
        },
        "geometry": {
            "paths": [
                [
                    [
                        555716.5916999998,
                        3422768.0483
                    ],
                    [
                        555784.4885999998,
                        3422731.6817000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 351,
            "Layer": "重点区剖面",
            "PM": "13-13'",
            "序号": 13,
            "Shape_Length": 67.23162043082364
        },
        "geometry": {
            "paths": [
                [
                    [
                        555880.1765999999,
                        3423128.4400999995
                    ],
                    [
                        555947.4073000001,
                        3423128.088300001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 352,
            "Layer": "重点区剖面",
            "PM": "14-14'",
            "序号": 14,
            "Shape_Length": 130.93182711787873
        },
        "geometry": {
            "paths": [
                [
                    [
                        556083.5289000003,
                        3423428.7139999999
                    ],
                    [
                        556208.9820999997,
                        3423466.192500001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 353,
            "Layer": "重点区剖面",
            "PM": "15-15'",
            "序号": 15,
            "Shape_Length": 121.53954338468877
        },
        "geometry": {
            "paths": [
                [
                    [
                        556385.7225000002,
                        3423736.5058999995
                    ],
                    [
                        556441.9584999997,
                        3423628.7590999996
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 354,
            "Layer": "重点区剖面",
            "PM": "16-16'",
            "序号": 16,
            "Shape_Length": 99.4119638354787
        },
        "geometry": {
            "paths": [
                [
                    [
                        556436.5773,
                        3423763.9613000007
                    ],
                    [
                        556529.6758000003,
                        3423729.0986
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 355,
            "Layer": "重点区剖面",
            "PM": "17-17'",
            "序号": 17,
            "Shape_Length": 73.14786501566504
        },
        "geometry": {
            "paths": [
                [
                    [
                        556531.7942000004,
                        3423893.2052999997
                    ],
                    [
                        556590.6973000001,
                        3423849.8344
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 356,
            "Layer": "重点区剖面",
            "PM": "18-18'",
            "序号": 18,
            "Shape_Length": 96.52159521555247
        },
        "geometry": {
            "paths": [
                [
                    [
                        556641.1884000003,
                        3424036.2304
                    ],
                    [
                        556731.0519000003,
                        3424001.0030000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 357,
            "Layer": "重点区剖面",
            "PM": "19-19'",
            "序号": 19,
            "Shape_Length": 132.49230444631153
        },
        "geometry": {
            "paths": [
                [
                    [
                        556746.6919,
                        3424256.3354
                    ],
                    [
                        556870.4380000001,
                        3424208.994999999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 358,
            "Layer": "重点区剖面",
            "PM": "22-22'",
            "序号": 22,
            "Shape_Length": 95.54504088674453
        },
        "geometry": {
            "paths": [
                [
                    [
                        557231.7503000004,
                        3424763.9265
                    ],
                    [
                        557314.1737000002,
                        3424715.6021999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 359,
            "Layer": "重点区剖面",
            "PM": "23-23'",
            "序号": 23,
            "Shape_Length": 219.71003675002286
        },
        "geometry": {
            "paths": [
                [
                    [
                        557282.6272999998,
                        3425007.9844000006
                    ],
                    [
                        557399.3591999998,
                        3424821.8496000005
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 360,
            "Layer": "重点区剖面",
            "PM": "24-24'",
            "序号": 24,
            "Shape_Length": 229.01561157136769
        },
        "geometry": {
            "paths": [
                [
                    [
                        557371.5543,
                        3425102.8981999999
                    ],
                    [
                        557547.4769000001,
                        3424956.2715000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 361,
            "Layer": "重点区剖面",
            "PM": "25-25'",
            "序号": 25,
            "Shape_Length": 95.81009181491457
        },
        "geometry": {
            "paths": [
                [
                    [
                        557653.0031000003,
                        3425226.8807999996
                    ],
                    [
                        557708.9042999996,
                        3425149.0692999998
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 362,
            "Layer": "重点区剖面",
            "PM": "26-26'",
            "序号": 26,
            "Shape_Length": 73.27642639964148
        },
        "geometry": {
            "paths": [
                [
                    [
                        557799.5160999997,
                        3425326.067
                    ],
                    [
                        557846.2242,
                        3425269.6064999999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 363,
            "Layer": "重点区剖面",
            "PM": "27-27'",
            "序号": 27,
            "Shape_Length": 54.46039203745538
        },
        "geometry": {
            "paths": [
                [
                    [
                        557873.8157000002,
                        3425364.0253999999
                    ],
                    [
                        557897.5220999997,
                        3425314.9954000005
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 364,
            "Layer": "重点区剖面",
            "PM": "28-28'",
            "序号": 28,
            "Shape_Length": 102.64968228605129
        },
        "geometry": {
            "paths": [
                [
                    [
                        558149.2635000004,
                        3425562.4082999995
                    ],
                    [
                        558189.7803999996,
                        3425468.0932
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 365,
            "Layer": "重点区剖面",
            "PM": "29-29'",
            "序号": 29,
            "Shape_Length": 57.74392966478241
        },
        "geometry": {
            "paths": [
                [
                    [
                        558456.3702999996,
                        3425761.0474999996
                    ],
                    [
                        558498.6544000004,
                        3425721.7229999995
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 366,
            "Layer": "重点区剖面",
            "PM": "30-30'",
            "序号": 30,
            "Shape_Length": 39.7075069905239
        },
        "geometry": {
            "paths": [
                [
                    [
                        558489.7403999996,
                        3425803.2019999998
                    ],
                    [
                        558525.6299999999,
                        3425786.2130999995
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 367,
            "Layer": "重点区剖面",
            "PM": "31-31'",
            "序号": 31,
            "Shape_Length": 41.43602281102115
        },
        "geometry": {
            "paths": [
                [
                    [
                        558503.1002000002,
                        3425919.9813
                    ],
                    [
                        558544.3081,
                        3425924.3233000005
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 368,
            "Layer": "重点区剖面",
            "PM": "32-32'",
            "序号": 32,
            "Shape_Length": 97.66813120335667
        },
        "geometry": {
            "paths": [
                [
                    [
                        558628.9912,
                        3425996.650699999
                    ],
                    [
                        558695.6371999998,
                        3426068.046599999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 369,
            "Layer": "重点区剖面",
            "PM": "33-33'",
            "序号": 33,
            "Shape_Length": 159.90960094998409
        },
        "geometry": {
            "paths": [
                [
                    [
                        558770.4895000001,
                        3425936.1116000006
                    ],
                    [
                        558744.7324999999,
                        3425778.289999999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 370,
            "Layer": "重点区剖面",
            "PM": "35-35'",
            "序号": 35,
            "Shape_Length": 207.70834775559497
        },
        "geometry": {
            "paths": [
                [
                    [
                        558983.4711999996,
                        3426049.0545000007
                    ],
                    [
                        559036.7126000002,
                        3425848.285700001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 371,
            "Layer": "重点区剖面",
            "PM": "36-36'",
            "序号": 36,
            "Shape_Length": 230.52392193101216
        },
        "geometry": {
            "paths": [
                [
                    [
                        559206.6177000003,
                        3426109.0539999997
                    ],
                    [
                        559237.6723999996,
                        3425880.6314000005
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 372,
            "Layer": "重点区剖面",
            "PM": "37-37'",
            "序号": 37,
            "Shape_Length": 144.6684052478556
        },
        "geometry": {
            "paths": [
                [
                    [
                        559433.3262999998,
                        3426077.1834999995
                    ],
                    [
                        559450.0604999997,
                        3425933.486199999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 373,
            "Layer": "重点区剖面",
            "PM": "39-39'",
            "序号": 39,
            "Shape_Length": 167.6629135229626
        },
        "geometry": {
            "paths": [
                [
                    [
                        559950.3663999997,
                        3426135.313100001
                    ],
                    [
                        559942.1039000005,
                        3425967.8539000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 374,
            "Layer": "重点区剖面",
            "PM": "43-43'",
            "序号": 43,
            "Shape_Length": 117.34586930672957
        },
        "geometry": {
            "paths": [
                [
                    [
                        560954.3557000002,
                        3426112.1126000008
                    ],
                    [
                        560956.4932000004,
                        3425994.7862
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 375,
            "Layer": "重点区剖面",
            "PM": "9-9'",
            "序号": 9,
            "Shape_Length": 116.49732871701848
        },
        "geometry": {
            "paths": [
                [
                    [
                        555475.7532000002,
                        3422503.6209999995
                    ],
                    [
                        555408.4857000001,
                        3422598.735200001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 376,
            "Layer": "重点区剖面",
            "PM": "10-10'",
            "序号": 10,
            "Shape_Length": 145.91845338165693
        },
        "geometry": {
            "paths": [
                [
                    [
                        555549.2896999996,
                        3422735.9773999995
                    ],
                    [
                        555636.9578,
                        3422619.330499999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 377,
            "Layer": "重点区剖面",
            "PM": "12-12'",
            "序号": 12,
            "Shape_Length": 96.44762801489972
        },
        "geometry": {
            "paths": [
                [
                    [
                        555983.4715,
                        3422925.1153999997
                    ],
                    [
                        555891.5636,
                        3422954.3572000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 378,
            "Layer": "重点区剖面",
            "PM": "38-38'",
            "序号": 38,
            "Shape_Length": 125.17201505969124
        },
        "geometry": {
            "paths": [
                [
                    [
                        559618.5471000001,
                        3426079.4871999996
                    ],
                    [
                        559610.0856999997,
                        3425954.601500001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 379,
            "Layer": "重点区剖面",
            "PM": "45-45'",
            "序号": 45,
            "Shape_Length": 54.99410868514124
        },
        "geometry": {
            "paths": [
                [
                    [
                        561410.9517000001,
                        3425977.533399999
                    ],
                    [
                        561420.9968999997,
                        3425923.4645000009
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 380,
            "Layer": "重点区剖面",
            "PM": "53-53'",
            "序号": 53,
            "Shape_Length": 66.41533564318796
        },
        "geometry": {
            "paths": [
                [
                    [
                        562865.1401000004,
                        3426300.5899
                    ],
                    [
                        562915.6046000002,
                        3426257.4120000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 381,
            "Layer": "重点区剖面",
            "PM": "34-34'",
            "序号": 34,
            "Shape_Length": 150.6913473450277
        },
        "geometry": {
            "paths": [
                [
                    [
                        558807.8295,
                        3425950.7694000008
                    ],
                    [
                        558871.3559999997,
                        3425814.1229
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 382,
            "Layer": "重点区剖面",
            "PM": "400-400'",
            "序号": 400,
            "Shape_Length": 42.54829657726062
        },
        "geometry": {
            "paths": [
                [
                    [
                        560681.0985000003,
                        3426012.7588
                    ],
                    [
                        560703.1271000002,
                        3426049.160700001
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 383,
            "Layer": "重点区剖面",
            "PM": "47-47'",
            "序号": 47,
            "Shape_Length": 76.78733989365124
        },
        "geometry": {
            "paths": [
                [
                    [
                        561710.5958000003,
                        3426186.058
                    ],
                    [
                        561767.0100999996,
                        3426133.9646000007
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 384,
            "Layer": "重点区剖面",
            "PM": "41-41'",
            "序号": 41,
            "Shape_Length": 50.50364972717397
        },
        "geometry": {
            "paths": [
                [
                    [
                        560360.8750999998,
                        3426233.0429999998
                    ],
                    [
                        560411.3677000003,
                        3426231.9866000006
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 385,
            "Layer": "重点区剖面",
            "PM": "373-373'",
            "序号": 373,
            "Shape_Length": 60.7757732298348
        },
        "geometry": {
            "paths": [
                [
                    [
                        609375.5883999998,
                        3426469.8303999996
                    ],
                    [
                        609378.5678000003,
                        3426409.127699999
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 386,
            "Layer": "一般区剖面",
            "PM": "342-342'",
            "序号": 342,
            "Shape_Length": 151.55395881688646
        },
        "geometry": {
            "paths": [
                [
                    [
                        601926.7352999998,
                        3425131.4969999997
                    ],
                    [
                        601963.6546999998,
                        3424984.5087
                    ]
                ]
            ]
        }
    },
    {
        "attributes": {
            "OBJECTID": 387,
            "Layer": "一般区剖面",
            "PM": "145-145'",
            "序号": 145,
            "Shape_Length": 283.0015389642531
        },
        "geometry": {
            "paths": [
                [
                    [
                        585871.875,
                        3426792.9338000009
                    ],
                    [
                        585865.8783999998,
                        3426509.9957999999
                    ]
                ]
            ]
        }
    }];
console.log(jsondata2);
