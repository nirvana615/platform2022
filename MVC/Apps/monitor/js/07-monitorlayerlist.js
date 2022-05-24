var layers = [];//图层列表数据
var MODELICON = '<span style="margin-left:0px;margin-right:2px;"><img src="../../../Resources/img/map/model.png" style="width:14px;height:14px;"/></span>';
var sanweiinfoeditlayerindex = null;//三维实景模型添加窗口
var usemodelids = [];//模型List
var modleInfoList = [];//模型数据
var modeledittable = null;
var modeltabledata = [];
var modleInfo = null;//模型信息
//图层列表widget
function LoadLayerListLayer(id) {
    //请求图层列表
    var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
    $.ajax({
        url: servicesurl + "/api/Layer/GetLayerInfo", type: "get", data: { "id": id, "cookie": document.cookie },
        success: function (data) {
            layer.close(loadingminindex);
            if (data == "") {
                layer.msg("无项目图层信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }
            else {
                var layerlist = JSON.parse(data);
                layers = [];//图层列表数据
                console.log(layerlist);
                //项目图层（项目位置、空间范围、影响范围、实景模型）
                if (layerlist.ProjectLayer != null) {

                    if (layerlist.ProjectLayer.CenterPoint != null) {
                        var prjcenter = new Object;
                        prjcenter.title = layerlist.ProjectLayer.CenterPoint.Title;
                        prjcenter.label = layerlist.ProjectLayer.CenterPoint.Label;
                        prjcenter.bl = layerlist.ProjectLayer.CenterPoint.BL;
                        prjcenter.id = "PROJECTCENTER_" + id;
                        prjcenter.type = "PROJECTCENTER";
                        var entity = viewer.entities.getById(prjcenter.id);
                        if (entity != undefined) {
                            prjcenter.checked = true;
                        }
                        else {
                            prjcenter.checked = false;
                        }
                        prjcenter.showCheckbox = true;//显示复选框
                        layers.push(prjcenter);
                    }
                    if (layerlist.ProjectLayer.KJFW != null) {
                        //TODO
                    }
                    if (layerlist.ProjectLayer.YXFW != null) {
                        //TODO
                    }
                    //新的
                    if (layerlist.ProjectLayer.Models != null) {
                        var prjsurmodel = new Object;
                        prjsurmodel.title = "三维实景模型";
                        prjsurmodel.type = "SANWEI";
                        var prjsurmodelchild = [];
                        modleInfoList = layerlist.ProjectLayer.Models;//把模型的值存起来
                        for (var i in modleInfoList) {
                            var surmodel = new Object;
                            surmodel.title = modleInfoList[i].RWMC;
                            surmodel.id = "PROJECTSUMODEL_" + modleInfoList[i].Id;
                            surmodel.type = "PROJECTSUMODEL";
                            surmodel.path = modleInfoList[i].MXLJ;
                            surmodel.icon = MODELICON;
                            surmodel.checked = false;
                            surmodel.showCheckbox = true;//显示复选框
                            surmodel.gcgz = modleInfoList[i].GCYC;
                            surmodel.modelView = modleInfoList[i].MXSJ;
                            surmodel.data = modleInfoList[i];
                            prjsurmodelchild.push(surmodel);
                        }

                        prjsurmodel.children = prjsurmodelchild;
                        layers.push(prjsurmodel);
                    } else {
                        var prjsurmodel = new Object;
                        prjsurmodel.title = "三维实景模型";
                        prjsurmodel.type = "SANWEI";
                        layers.push(prjsurmodel);
                    }

                }

                //灾害体图层（灾害体位置、空间范围、影响范围、实景模型）
                if (layerlist.ProjectLayer != null) {
                    var disasterlayer = new Object;
                    disasterlayer.title = layerlist.DisasterLayers.Title;
                    var disasterlayerchild = [];
                    for (var i in layerlist.DisasterLayers.DisasterLayerList) {
                        var disaster = new Object;
                        disaster.title = layerlist.DisasterLayers.DisasterLayerList[i].Title;
                        var disasterchild = [];
                        if (layerlist.DisasterLayers.DisasterLayerList[i].CenterPoint != null) {
                            var disastercenter = new Object;
                            disastercenter.title = layerlist.DisasterLayers.DisasterLayerList[i].CenterPoint.Title;
                            disastercenter.label = layerlist.DisasterLayers.DisasterLayerList[i].CenterPoint.Label;
                            disastercenter.bl = layerlist.DisasterLayers.DisasterLayerList[i].CenterPoint.BL;
                            disastercenter.id = "DISASTERCENTER_" + layerlist.DisasterLayers.DisasterLayerList[i].CenterPoint.Id;
                            disastercenter.type = "DISASTERCENTER";
                            disastercenter.checked = false;
                            disastercenter.showCheckbox = true;//显示复选框
                            disasterchild.push(disastercenter);
                        }
                        if (layerlist.DisasterLayers.DisasterLayerList[i].KJFW != null) {
                            //TODO
                        }
                        if (layerlist.DisasterLayers.DisasterLayerList[i].YXFW != null) {
                            //TODO
                        }
                        if (layerlist.DisasterLayers.DisasterLayerList[i].SurModels != null) {
                            var disastersurmodel = new Object;
                            disastersurmodel.title = layerlist.DisasterLayers.DisasterLayerList[i].SurModels.Title;
                            var disastersurmodelchild = [];
                            for (var j in layerlist.DisasterLayers.DisasterLayerList[i].SurModelList) {
                                var surmodel = new Object;
                                surmodel.title = layerlist.DisasterLayers.DisasterLayerList[i].SurModelList[j].MXMC;
                                surmodel.id = "DISASTERSURMODEL_" + layerlist.DisasterLayers.DisasterLayerList[i].SurModelList[j].Id;
                                surmodel.type = "DISASTERSURMODEL";
                                surmodel.path = layerlist.DisasterLayers.DisasterLayerList[i].SurModelList[j].MXLJ;
                                surmodel.checked = false;
                                surmodel.showCheckbox = true;//显示复选框
                                disastersurmodelchild.push(surmodel);
                            }

                            disastersurmodel.children = disastersurmodelchild;
                            disasterchild.push(disastersurmodel)
                        }

                        disaster.children = disasterchild;
                        disasterlayerchild.push(disaster);
                    }

                    disasterlayer.children = disasterlayerchild;
                    layers.push(disasterlayer);
                }

                //监测图层（监测点、监测剖面）
                if (layerlist.MonitorLayer != null) {
                    var monitorlayer = new Object;
                    monitorlayer.title = layerlist.MonitorLayer.Title;
                    var monitorlayerchild = [];
                    if (layerlist.MonitorLayer.MonitorPointLayers != null) {
                        var monitorpointlayer = new Object;
                        monitorpointlayer.title = layerlist.MonitorLayer.MonitorPointLayers.Title;
                        monitorpointlayer.type = "MONITORPOINT";
                        monitorpointlayer.checked = false;
                        monitorpointlayer.showCheckbox = true;//显示复选框
                        var monitorpointlayerchild = [];
                        for (var i in layerlist.MonitorLayer.MonitorPointLayers.MonitorPointLayerList) {
                            var monitorpoint = new Object;
                            monitorpoint.title = layerlist.MonitorLayer.MonitorPointLayers.MonitorPointLayerList[i].JCDBH;
                            monitorpoint.id = "MONITORPOINT_" + layerlist.MonitorLayer.MonitorPointLayers.MonitorPointLayerList[i].Id;
                            monitorpoint.type = "MONITORPOINT";
                            monitorpoint.jcff = layerlist.MonitorLayer.MonitorPointLayers.MonitorPointLayerList[i].JCFF;
                            monitorpoint.jczlx = layerlist.MonitorLayer.MonitorPointLayers.MonitorPointLayerList[i].JCZLX;
                            monitorpoint.xyz = layerlist.MonitorLayer.MonitorPointLayers.MonitorPointLayerList[i].Center;
                            monitorpoint.checked = false;
                            monitorpoint.showCheckbox = true;//显示复选框
                            monitorpointlayerchild.push(monitorpoint);
                        }

                        monitorpointlayer.children = monitorpointlayerchild;
                        monitorlayerchild.push(monitorpointlayer);
                    }

                    if (layerlist.MonitorLayer.MonitorSectoinLayers != null) {
                        var monitorsectionlayer = new Object;
                        monitorsectionlayer.title = layerlist.MonitorLayer.MonitorSectoinLayers.Title;
                        monitorsectionlayer.type = "MONITORSECTION";
                        monitorsectionlayer.checked = false;
                        monitorsectionlayer.showCheckbox = true;
                        var monitorsectionlayerchild = [];
                        for (var i in layerlist.MonitorLayer.MonitorSectoinLayers.MonitorSectoinLayerList) {
                            var monitorsection = new Object;
                            monitorsection.title = layerlist.MonitorLayer.MonitorSectoinLayers.MonitorSectoinLayerList[i].PMBH;
                            monitorsection.id = "MONITORSECTION_" + layerlist.MonitorLayer.MonitorSectoinLayers.MonitorSectoinLayerList[i].Id;
                            monitorsection.type = "MONITORSECTION";
                            monitorsection.pmlx = layerlist.MonitorLayer.MonitorSectoinLayers.MonitorSectoinLayerList[i].PMLX;
                            monitorsection.pmdj = layerlist.MonitorLayer.MonitorSectoinLayers.MonitorSectoinLayerList[i].PMDJ;
                            monitorsection.line = layerlist.MonitorLayer.MonitorSectoinLayers.MonitorSectoinLayerList[i].Line;
                            monitorsection.checked = false;
                            monitorsection.showCheckbox = true;
                            monitorsectionlayerchild.push(monitorsection);
                        }

                        monitorsectionlayer.children = monitorsectionlayerchild;
                        monitorlayerchild.push(monitorsectionlayer);
                    }

                    monitorlayer.children = monitorlayerchild;
                    layers.push(monitorlayer);
                }

                //TODO MORE LAYER
                if (id == 70) {
                    var entity1 = viewer.entities.getById(id + "_id1");
                    if (entity1 == undefined) {
                        viewer.entities.add({
                            id: id + "_id1",
                            polyline: {
                                positions: pointList,
                                width: 2,
                                material: Cesium.Color.BLUE,
                                show: true,
                                clampToGround: true,
                                classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                            }
                        });
                    }


                    //for (var i in jianceList) {
                    //    var entity = viewer.entities.getById(id+"ranqiLingshi_"+i);
                    //    if (entity == undefined) {
                    //        //当无此元素添加  viewer.scene.clampToHeight  模型
                    //        viewer.entities.add({
                    //            id: id + "ranqiLingshi_" + i,
                    //            position: jianceList[i].point,
                    //            billboard: {
                    //                image: '../../Resources/img/map/marker.png',
                    //                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    //                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                    //                width: 24,
                    //                height: 24,
                    //            }
                    //        });
                    //    }

                    //    var entitylabel = viewer.entities.getById(id + "ranqiLingshi_" + i + "_LABEL");
                    //    if (entitylabel == undefined) {
                    //        viewer.entities.add({
                    //            id: id + "ranqiLingshi_" + i + "_LABEL",
                    //            position: jianceList[i].point,
                    //            label: {
                    //                text: jianceList[i].name,
                    //                font: '16px Times New Roman',
                    //                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    //                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                    //                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                    //                pixelOffset: new Cesium.Cartesian2(0.0, -36),
                    //            }
                    //        });
                    //    }
                    //}


                }

                
                    tree.render({
                        elem: '#prjlayerlist'
                        , id: 'prjlayerlistid'
                        , edit: ['update']
                        , showCheckbox: true
                        , customCheckbox: true
                        , showLine: false
                        , data: layers
                        , accordion: false
                        , click: function (obj) {
                            //点击事件
                            //如果选中就缩放到目标
                            //如果未选中就不做任何处理
                            var data = obj.data;
                            console.log(data);
                            if (data.checked) {
                                if (data.children != undefined) {
                                    var entities = [];
                                    for (var i in data.children) {
                                        var entity = viewer.entities.getById(data.children[i].id)
                                        if (entity != undefined) {
                                            entities.push(entity);
                                        }
                                    }

                                    if (entities.length > 0) {
                                        viewer.zoomTo(entities);
                                    }
                                }
                                else {
                                    if (data.type == "PROJECTSUMODEL") {// || data.type == "YOUSHIMIAN"

                                        if (curtileset != null) {
                                            if (data.modelView != null && data.modelView.length > 0) {
                                                var home = JSON.parse(data.modelView);
                                                viewer.scene.camera.setView(home);
                                            } else {
                                                viewer.zoomTo(curtileset);
                                            }
                                        }
                                    } else {
                                        viewer.zoomTo(viewer.entities.getById(data.id));
                                    }
                                }
                            }

                        }
                        , oncheck: function (obj) {
                            //根据选中状态在地图中添加元素
                            var checked = obj.checked;
                            var data = obj.data;

                            //TODO解决模型多选


                            if (checked) {
                                if (data.children != undefined) {
                                    //多选
                                    if (data.type == "MONITORPOINT") {
                                        //全选监测点
                                        for (var i in data.children) {
                                            var entity = viewer.entities.getById(data.children[i].id);
                                            if (entity == undefined) {
                                                //当无此元素添加
                                                viewer.entities.add({
                                                    id: data.children[i].id,
                                                    position: new Cesium.Cartesian3(data.children[i].xyz.X, data.children[i].xyz.Y, data.children[i].xyz.Z),
                                                    billboard: {
                                                        image: '../../Resources/img/map/marker.png',
                                                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                        heightReference: Cesium.HeightReference.NONE,
                                                        width: 24,
                                                        height: 24,
                                                        scaleByDistance: new Cesium.NearFarScalar(100, 1, 200000, 0),
                                                    }
                                                });
                                            }

                                            var entitylabel = viewer.entities.getById(data.children[i].id + "_LABEL");
                                            if (entitylabel == undefined) {
                                                viewer.entities.add({
                                                    id: data.children[i].id + "_LABEL",
                                                    position: new Cesium.Cartesian3(data.children[i].xyz.X, data.children[i].xyz.Y, data.children[i].xyz.Z),
                                                    label: {
                                                        text: data.children[i].title,
                                                        font: '16px Times New Roman',
                                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                        heightReference: Cesium.HeightReference.NONE,
                                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                        pixelOffset: new Cesium.Cartesian2(0.0, -36),
                                                        scaleByDistance: new Cesium.NearFarScalar(100, 1, 200000, 0),
                                                    }
                                                });
                                            }

                                            data.children[i].checked = true;
                                        }
                                    }
                                    else if (data.type == "MONITORSECTION") {
                                        //全选监测剖面
                                        for (var i in data.children) {
                                            var entity = viewer.entities.getById(data.children[i].id);
                                            if (entity == undefined) {
                                                var line = [];
                                                var xsum = 0;
                                                var ysum = 0;
                                                var zsum = 0;
                                                for (var j in data.children[i].line) {
                                                    line.push(new Cesium.Cartesian3(data.children[i].line[j].X, data.children[i].line[j].Y, data.children[i].line[j].Z));
                                                    xsum += data.children[i].line[j].X;
                                                    ysum += data.children[i].line[j].Y;
                                                    zsum += data.children[i].line[j].Z;
                                                }

                                                viewer.entities.add({
                                                    id: data.children[i].id,
                                                    polyline: {
                                                        positions: line,
                                                        width: 5,
                                                        arcType: Cesium.ArcType.RHUMB,
                                                        material: Cesium.Color.GREEN,
                                                        show: true,
                                                        clampToGround: true,
                                                        classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                    }
                                                });

                                                viewer.entities.add({
                                                    id: data.children[i].id + "_LABEL",
                                                    position: new Cesium.Cartesian3(xsum / line.length, ysum / line.length, zsum / line.length),
                                                    label: {
                                                        text: data.children[i].title,
                                                        font: '20px Times New Roman',
                                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                        pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                        scaleByDistance: new Cesium.NearFarScalar(100, 1, 200000, 0),
                                                    }
                                                });

                                            }

                                            data.children[i].checked = true;
                                        }
                                    }

                                    data.checked = true;
                                }
                                else {
                                    //单选
                                    if (data.type == "PROJECTCENTER") {
                                        //项目位置

                                        var entity = viewer.entities.getById(data.id);
                                        if (entity == undefined) {
                                            //if (curtileset != null) {
                                                viewer.entities.add({
                                                    id: data.id,
                                                    position: viewer.scene.clampToHeight(Cesium.Cartesian3.fromDegrees(data.bl.L, data.bl.B)),
                                                    billboard: {
                                                        image: '../../Resources/img/map/marker.png',
                                                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                        width: 40,
                                                        height: 40,
                                                        scaleByDistance: new Cesium.NearFarScalar(200, 1, 30000000, 0),
                                                    }
                                                });
                                            //}
                                            //else {
                                            //    viewer.entities.add({
                                            //        id: data.id,
                                            //        position: Cesium.Cartesian3.fromDegrees(data.bl.L, data.bl.B),
                                            //        billboard: {
                                            //            image: '../../Resources/img/map/marker.png',
                                            //            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                            //            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                            //            width: 40,
                                            //            height: 40,
                                            //            scaleByDistance: new Cesium.NearFarScalar(200, 1, 30000000, 0),
                                            //        }
                                            //    });
                                            //}
                                        }

                                        var entitylabel = viewer.entities.getById(data.id + "_LABEL");
                                        if (entitylabel == undefined) {
                                            //if (curtileset != null) {
                                                viewer.entities.add({
                                                    id: data.id + "_LABEL",
                                                    position: viewer.scene.clampToHeight(Cesium.Cartesian3.fromDegrees(data.bl.L, data.bl.B)),
                                                    label: {
                                                        text: data.label,
                                                        font: '24px Times New Roman',
                                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                        pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                        scaleByDistance: new Cesium.NearFarScalar(200, 1, 200000, 0),
                                                    }
                                                });
                                            //}
                                            //else {
                                            //    viewer.entities.add({
                                            //        id: data.id + "_LABEL",
                                            //        position: Cesium.Cartesian3.fromDegrees(data.bl.L, data.bl.B),
                                            //        label: {
                                            //            text: data.label,
                                            //            font: '24px Times New Roman',
                                            //            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                            //            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                            //            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                            //            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                            //            scaleByDistance: new Cesium.NearFarScalar(200, 1, 200000, 0),
                                            //        }
                                            //    });
                                            //}
                                        }

                                        data.checked = true;
                                    }
                                    else if (data.type == "PROJECTSUMODEL") {


                                        //项目模型
                                        
                                        for (var i in layers) {
                                            if (layers[i].title == "三维实景模型") {
                                                for (var j in layers[i].children) {
                                                    if (data.id != layers[i].children[j].id) {
                                                        layers[i].children[j].checked = false;
                                                    } else {
                                                        layers[i].children[j].checked = true;
                                                        layers[i].children[j].spread = true;
                                                        layers[i].spread = true;
                                                    }
                                                }
                                            }
                                        }


                                        if (modleInfo != null && data.id != modleInfo.id) {

                                            modleInfo = data;
                                            tree.reload('prjlayerlistid', { data: layers });
                                        } else {
                                            var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                                         
                                            LoadModel(data);
                                            
                                            layer.close(loadingceindex);
                                        }
                                        modleInfo = data;
                                        //项目模型
                                        
                                        data.checked = true;
                                        if (currentprojectid == 70) {
                                            //setTimeout(
                                            for (var i in jianceList) {
                                                var entity = viewer.entities.getById(id + "ranqiLingshi_" + i);
                                                if (entity == undefined) {
                                                    //当无此元素添加  viewer.scene.clampToHeight  模型
                                                    viewer.entities.add({
                                                        id: id + "ranqiLingshi_" + i,
                                                        position: jianceList[i].point,
                                                        billboard: {
                                                            image: '../../Resources/img/map/marker.png',
                                                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                                            //  heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                                            width: 24,
                                                            height: 24,
                                                        }
                                                    });
                                                }

                                                var entitylabel = viewer.entities.getById(id + "ranqiLingshi_" + i + "_LABEL");
                                                if (entitylabel == undefined) {
                                                    viewer.entities.add({
                                                        id: id + "ranqiLingshi_" + i + "_LABEL",
                                                        position: jianceList[i].point,
                                                        label: {
                                                            text: jianceList[i].name,
                                                            font: '16px Times New Roman',
                                                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                                            //  heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                            pixelOffset: new Cesium.Cartesian2(0.0, -36),
                                                        }
                                                    });
                                                }
                                            }

                                            //, 1000);

                                        }

                                    }
                                    else if (data.type == "DISASTERCENTER") {
                                        //灾害体位置

                                    }
                                    else if (data.type == "DISASTERSURMODEL") {
                                        //灾害体模型

                                    }
                                    else if (data.type == "MONITORPOINT") {
                                        //监测点
                                        var entity = viewer.entities.getById(data.id);
                                        if (entity == undefined) {
                                            //当无此元素添加
                                            viewer.entities.add({
                                                id: data.id,
                                                position: new Cesium.Cartesian3(data.xyz.X, data.xyz.Y, data.xyz.Z),
                                                billboard: {
                                                    image: '../../Resources/img/map/marker.png',
                                                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                    width: 24,
                                                    height: 24,
                                                    scaleByDistance: new Cesium.NearFarScalar(100, 1, 200000, 0),
                                                }
                                            });
                                        }

                                        var entitylabel = viewer.entities.getById(data.id + "_LABEL");
                                        if (entitylabel == undefined) {
                                            viewer.entities.add({
                                                id: data.id + "_LABEL",
                                                position: new Cesium.Cartesian3(data.xyz.X, data.xyz.Y, data.xyz.Z),
                                                label: {
                                                    text: data.title,
                                                    font: '16px Times New Roman',
                                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                    pixelOffset: new Cesium.Cartesian2(0.0, -36),
                                                    scaleByDistance: new Cesium.NearFarScalar(100, 1, 200000, 0),
                                                }
                                            });
                                        }

                                        data.checked = true;
                                    }
                                    else if (data.type == "MONITORSECTION") {
                                        //监测剖面
                                        var entity = viewer.entities.getById(data.id);
                                        if (entity == undefined) {
                                            var line = [];
                                            var xsum = 0;
                                            var ysum = 0;
                                            var zsum = 0;
                                            for (var j in data.line) {
                                                line.push(new Cesium.Cartesian3(data.line[j].X, data.line[j].Y, data.line[j].Z));
                                                xsum += data.line[j].X;
                                                ysum += data.line[j].Y;
                                                zsum += data.line[j].Z;
                                            }

                                            viewer.entities.add({
                                                id: data.id,
                                                polyline: {
                                                    positions: line,
                                                    width: 5,
                                                    arcType: Cesium.ArcType.RHUMB,
                                                    material: Cesium.Color.GREEN,
                                                    show: true,
                                                    clampToGround: true,
                                                    classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                }
                                            });

                                            viewer.entities.add({
                                                id: data.id + "_LABEL",
                                                position: new Cesium.Cartesian3(xsum / line.length, ysum / line.length, zsum / line.length),
                                                label: {
                                                    text: data.title,
                                                    font: '20px Times New Roman',
                                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                    pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                    scaleByDistance: new Cesium.NearFarScalar(100, 1, 200000, 0),
                                                }
                                            });

                                        }

                                        data.checked = true;
                                    }
                                }

                            }
                            else {
                                if (data.children != undefined) {
                                    for (var i in data.children) {
                                        viewer.entities.removeById(data.children[i].id);
                                        viewer.entities.removeById(data.children[i].id + "_LABEL");
                                        data.children[i].checked = false;
                                    }

                                    data.checked = false;
                                }
                                else {
                                    if (data.type == "PROJECTSUMODEL" || data.type == "DISASTERSURMODEL") {
                                        viewer.scene.primitives.remove(curtileset);
                                        curtileset = null;
                                        modleInfo = null;
                                    }
                                    else {
                                        viewer.entities.removeById(data.id);
                                        viewer.entities.removeById(data.id + "_LABEL");
                                    }

                                    data.checked = false;
                                }

                            }

                        }
                        , operate: function (obj) {
                            var data = obj.data; //得到当前节点的数据
                            console.log(obj);
                            if (data.type == "PROJECTSUMODEL") {
                                if (data.checked) {
                                    layer.confirm('是否更新该模型的最佳视角?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                                        //console.log(viewer.camera.position);
                                        //console.log(viewer.camera.heading);
                                        //console.log(viewer.camera.pitch);
                                        //console.log(viewer.camera.roll); 
                                        var x = viewer.camera.position;
                                        var y1 = {
                                            // 指向
                                            heading: viewer.camera.heading,
                                            // 视角
                                            pitch: viewer.camera.pitch,
                                            roll: viewer.camera.roll
                                        }
                                        var home = {
                                            destination: x,
                                            orientation: y1
                                        }
                                        console.log(home);
                                        layer.close(index);

                                        var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                                        var data2 = {
                                            mxsj: JSON.stringify(home),
                                            id: data.id.split("_")[1],//模型id
                                            cookie: document.cookie
                                        }
                                        $.ajax({
                                            url: servicesurl + "/api/ModelTask/UpdateModelView", type: "put", data: data2,
                                            success: function (result) {
                                                var datas = JSON.parse(result);
                                                layer.msg(datas.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                                layer.close(loadingminindex);
                                            }, datatype: "json"
                                        });
                                    });
                                } else {
                                    layer.msg("请选择该模型进行最佳视图更新", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    return;
                                }
                            } else if (data.type == "SANWEI") {
                                if (sanweiinfoeditlayerindex == null) {
                                    sanweiinfoeditlayerindex = layer.open({
                                        type: 1
                                        , title: ['模型编辑', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                        , area: ['600px', '410px']
                                        , shade: 0
                                        , offset: 'auto'
                                        , closeBtn: 1
                                        , maxmin: true
                                        , moveOut: true
                                        , content: '<!--实景模型--><table id="uav-project-model" lay-filter="uav-project-model"></table><script type="text/html" id="uav-project-model-add"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm" style="font-size:14px;width:150px" lay-event="uav-project-model-add">添加实景模型</button></div></script><script type="text/html" id="table-toolbar-model"><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="modeldel"><i class="layui-icon layui-icon-delete" style="margin-right:20px;font-size:20px!important;color:#666!important;"></i></a></script>'
                                        // , content:'20'
                                        , zIndex: layer.zIndex
                                        , success: function (layero) {
                                            layer.setTop(layero);


                                            //更新项目
                                            form.on('submit(editprojectinfosubmit)', function (data) {
                                                data.field.id = id;
                                                data.field.cookie = document.cookie;

                                                var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                                                $.ajax({
                                                    url: servicesurl + "/api/FLZ/UpdateProject", type: "put", data: data.field,
                                                    success: function (result) {
                                                        layer.close(loadinglayerindex);
                                                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                        console.log(result);
                                                        if (result == "更新成功！") {
                                                            //关闭
                                                            layer.close(sanweiinfoeditlayerindex);

                                                            //刷新项目列表
                                                            GetUserProjects();
                                                        }
                                                    }, datatype: "json"
                                                });
                                                return false;
                                            });
                                            //项目关联模型
                                            modeltabledata = [];
                                            var uavprojectmodelids = [];
                                            console.log(layers);
                                            for (var i in layers) {
                                                if (layers[i].title == "三维实景模型") {
                                                    for (var j in layers[i].children) {
                                                        var model = new Object;
                                                        model.id = layers[i].children[j].data.Id;
                                                        model.mxmc = layers[i].children[j].data.RWMC;
                                                        model.mxbm = layers[i].children[j].data.RWBM;
                                                        model.mxsj = layers[i].children[j].data.YXCJSJ;
                                                        model.bz = layers[i].children[j].data.BZ;
                                                        modeltabledata.push(model);
                                                        usemodelids.push(layers[i].children[j].data.Id);
                                                        //uavprojectmodelids.push(layers[i].children[j].data.Id);

                                                    }
                                                }
                                            }



                                            modeledittable = table.render({
                                                elem: '#uav-project-model'
                                                , id: 'uavprojectmodeltableid'
                                                , title: '实景模型'
                                                , skin: 'line'
                                                , even: false
                                                , page: { layout: ['prev', 'page', 'next', 'count'] }
                                                , limit: 5
                                                , toolbar: '#uav-project-model-add'
                                                , totalRow: false
                                                , initSort: { field: 'id', type: 'asc' }
                                                , cols: [[
                                                    { field: 'id', title: 'ID', hide: true }
                                                    , { field: 'mxmc', title: '模型名称', align: "center" }
                                                    , { field: 'mxbm', title: '模型编码', align: "center" }
                                                    , { field: 'mxsj', title: '生产时间', align: "center" }
                                                    , { field: 'bz', title: '备注', align: "center" }
                                                    , { fixed: 'right', width: 100, align: 'center', toolbar: '#table-toolbar-model' }
                                                ]]
                                                , data: modeltabledata
                                            });

                                            //添加实景模型
                                            table.on('toolbar(uav-project-model)', function (obj) {
                                                switch (obj.event) {
                                                    case 'uav-project-model-add':
                                                        var addmodellayerindex = layer.open({
                                                            type: 1
                                                            , title: ['添加实景模型', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                                            , area: ['450px', '450px']
                                                            , shade: 0.5
                                                            , offset: 'auto'
                                                            , closeBtn: 1
                                                            , maxmin: false
                                                            , moveOut: true
                                                            , content: '<div style="overflow:hidden;"><form class="layui-form" style="margin-top:5px" lay-filter="addmodeluseform"><div class="layui-form-item" style="border-bottom: solid 1px rgb(248,248,248);height:345px;max-height:345px;overflow:auto;"><div id="usemodeltree"></div></div><div class="layui-form-item" style="margin-top:10px"><div class="layui-input-block" style="margin-left:0px;text-align:center;position:relative;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="addmodelusesubmit" style="width:150px">添加</button></div></div></form></div>'
                                                            , zIndex: layer.zIndex
                                                            , success: function (layero) {
                                                                layer.setTop(layero);
                                                                //加载中
                                                                loadlayerindex = layer.load(1, {
                                                                    shade: [0.1, '#fff']
                                                                    , zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); }
                                                                });

                                                                var nousemodeltreedata = [];
                                                                var uavprojectaddmodels = [];//选中模型
                                                                //渲染模型树
                                                                tree.render({
                                                                    elem: '#usemodeltree'
                                                                    , data: []
                                                                    , id: 'usemodeltreeid'
                                                                    , showCheckbox: true
                                                                    , accordion: false
                                                                    , showLine: true
                                                                    , cancelNodeFileIcon: true
                                                                    , text: { none: '无数据' }
                                                                    , oncheck: function (obj) {
                                                                        if (obj.checked) {
                                                                            //选中
                                                                            if (obj.data.type == "projectnode") {
                                                                                //项目节点
                                                                                for (var i in obj.data.children) {
                                                                                    var model = new Object;
                                                                                    model.projectid = obj.data.id;
                                                                                    model.modelid = obj.data.children[i].id;
                                                                                    uavprojectaddmodels.push(model);
                                                                                }
                                                                            }
                                                                            else {
                                                                                //模型节点
                                                                                var model = new Object;
                                                                                for (var i in nousemodeltreedata) {
                                                                                    for (var j in nousemodeltreedata[i].children) {
                                                                                        if (nousemodeltreedata[i].children[j].id == obj.data.id) {
                                                                                            model.projectid = nousemodeltreedata[i].id;
                                                                                            break;
                                                                                        }
                                                                                    }
                                                                                }
                                                                                model.modelid = obj.data.id;
                                                                                uavprojectaddmodels.push(model);
                                                                            }
                                                                        }
                                                                        else {
                                                                            //取消选中
                                                                            if (obj.data.type == "projectnode") {
                                                                                //项目节点
                                                                                var newuavprojectaddmodels = [];

                                                                                for (var i in uavprojectaddmodels) {
                                                                                    if (uavprojectaddmodels[i].projectid != obj.data.id) {
                                                                                        newuavprojectaddmodels.push(uavprojectaddmodels[i]);
                                                                                    }
                                                                                }

                                                                                uavprojectaddmodels = newuavprojectaddmodels;
                                                                            }
                                                                            else {
                                                                                //模型节点
                                                                                var newuavprojectaddmodels = [];

                                                                                for (var i in uavprojectaddmodels) {
                                                                                    if (uavprojectaddmodels[i].modelid != obj.data.id) {
                                                                                        newuavprojectaddmodels.push(uavprojectaddmodels[i]);
                                                                                    }
                                                                                }

                                                                                uavprojectaddmodels = newuavprojectaddmodels;
                                                                            }
                                                                        }
                                                                    }
                                                                });

                                                                //项目已关联模型id
                                                                //var usemodelids = "";
                                                                //for (var i in uavprojectmodelids) {
                                                                //    usemodelids += uavprojectmodelids[i] + ",";
                                                                //}
                                                                //if (usemodelids != "" && usemodelids.indexOf(",") != -1) {
                                                                //    usemodelids = usemodelids.substring(0, usemodelids.length - 1);
                                                                //}

                                                                $.ajax({
                                                                    url: servicesurl + "/api/ModelProject/GetUserNoUseModelProjectDatas", type: "get", data: { "cookie": document.cookie, "usedmodelid": JSON.stringify(usemodelids) },
                                                                    success: function (data) {
                                                                        layer.close(loadlayerindex);//关闭正在加载
                                                                        nousemodeltreedata = [];

                                                                        var result = JSON.parse(data);
                                                                        if (result.code == 1) {
                                                                            var resultdata = JSON.parse(result.data);
                                                                            for (var i in resultdata) {
                                                                                var project = new Object;
                                                                                project.id = resultdata[i].Project.Id;
                                                                                project.title = resultdata[i].Project.XMMC;
                                                                                project.checked = false;
                                                                                project.type = "projectnode";

                                                                                var projectchild = [];
                                                                                for (var j in resultdata[i].Tasks) {
                                                                                    var model = new Object;
                                                                                    model.id = resultdata[i].Tasks[j].Id;
                                                                                    model.title = resultdata[i].Tasks[j].RWMC;
                                                                                    model.type = "modelnode";
                                                                                    model.checked = false;
                                                                                    model.data = resultdata[i].Tasks[j];
                                                                                    projectchild.push(model);
                                                                                }

                                                                                project.children = projectchild;
                                                                                nousemodeltreedata.push(project);
                                                                            }
                                                                        }

                                                                        tree.reload('usemodeltreeid', { data: nousemodeltreedata });
                                                                        layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                                    }, datatype: "json"
                                                                });

                                                                form.render();
                                                                form.render('select');

                                                                form.on('submit(addmodelusesubmit)', function (data) {
                                                                    if (uavprojectaddmodels.length > 0) {
                                                                        data.field.useprojectid = currentprojectid;
                                                                        data.field.cookie = document.cookie;
                                                                        data.field.syscode = 2;//系统模型
                                                                        data.field.modelinfo = JSON.stringify(uavprojectaddmodels);

                                                                        $.ajax({
                                                                            url: servicesurl + "/api/ModelProject/AddUserModelProjectUse", type: "post", data: data.field,
                                                                            success: function (result) {
                                                                                var info = JSON.parse(result);
                                                                                if (info.code == 1) {
                                                                                    var newmodelids = JSON.parse(info.data);//已关联成功模型id
                                                                                    var newmodels = [];//已关联成功模型
                                                                                    for (var i in newmodelids) {
                                                                                        for (var j in nousemodeltreedata) {
                                                                                            for (var k in nousemodeltreedata[j].children) {
                                                                                                if (newmodelids[i] == nousemodeltreedata[j].children[k].id) {
                                                                                                    var model = new Object;
                                                                                                    model.id = nousemodeltreedata[j].children[k].id;
                                                                                                    model.mxmc = nousemodeltreedata[j].children[k].data.RWMC;
                                                                                                    model.mxbm = nousemodeltreedata[j].children[k].data.RWBM;
                                                                                                    model.mxsj = nousemodeltreedata[j].children[k].data.YXCJSJ;
                                                                                                    model.bz = nousemodeltreedata[j].children[k].data.BZ;
                                                                                                    modeltabledata.push(model);
                                                                                                    usemodelids.push(nousemodeltreedata[j].children[k].data.Id);
                                                                                                    newmodels.push(nousemodeltreedata[j].children[k].data);
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    modeledittable.reload({ id: 'uavprojectmodeltableid', data: modeltabledata });

                                                                                    var child = [];
                                                                                    for (var k in newmodels) {
                                                                                        var model = new Object;
                                                                                        model.id = "PROJECTSUMODELL_" + newmodels[k].Id;
                                                                                        model.icon = MODELICON;
                                                                                        model.type = "PROJECTSUMODEL";
                                                                                        model.title = newmodels[k].RWMC;
                                                                                        model.data = newmodels[k];
                                                                                        model.showCheckbox = true;
                                                                                        model.checked = false;
                                                                                        model.spread = true;
                                                                                        model.path = newmodels[k].MXLJ;
                                                                                        model.gcgz = newmodels[k].GCYC;
                                                                                        model.modelView = newmodels[k].MXSJ;
                                                                                        child.push(model);
                                                                                    }
                                                                                    for (var i in layers) {
                                                                                        if (layers[i].type == "SANWEI") {
                                                                                            for (var j in layers[i].children) {
                                                                                                child.push(layers[i].children[j]);
                                                                                            }
                                                                                            layers[i].children = child;
                                                                                            layers[i].spread = true;
                                                                                            break;
                                                                                        }
                                                                                    }
                                                                                    if (curtileset != null) {//有模型的情况下就不刷新了
                                                                                        modeljiazaiFlag = false;
                                                                                    }// 不刷新的问题是。现在设置的checked为false  当选择模型的时候，树上没有同步更改

                                                                                    tree.reload('prjlayerlistid', { data: layers });
                                                                                    ClearTemp();

                                                                                }

                                                                                layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                                                            }, datatype: "json"
                                                                        });

                                                                        layer.close(addmodellayerindex);
                                                                    } else {
                                                                        layer.msg("请先勾选需要的实景模型！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                                    }

                                                                    return false;
                                                                });
                                                            }
                                                            , end: function () { }
                                                        });
                                                        break;
                                                };
                                            });

                                            //操作实景模型
                                            table.on('tool(uav-project-model)', function (obj) {

                                                if (obj.event === 'modeldel') {
                                                    layer.confirm('是否删除?', { icon: 3, title: '消息', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                                                        $.ajax({
                                                            url: servicesurl + "/api/ModelProject/CancelUserModelProjectUse", type: "delete", data: { "syscode": 2, "useprojectid": currentprojectid, "modelid": obj.data.id, "cookie": document.cookie },
                                                            success: function (result) {
                                                                var info = JSON.parse(result);
                                                                if (info.code == 1) {

                                                                    var newmodeltabledata = [];
                                                                    usemodelids = [];
                                                                    for (var i in modeltabledata) {
                                                                        if (modeltabledata[i].id.toString() != info.data) {
                                                                            newmodeltabledata.push(modeltabledata[i]);
                                                                            usemodelids.push(modeltabledata[i].id);
                                                                        }
                                                                    }
                                                                    modeltabledata = newmodeltabledata;
                                                                    modeledittable.reload({ id: 'uavprojectmodeltableid', data: modeltabledata });

                                                                    //TODO删除的为选中加载的模型时需从地图的删除
                                                                    var child = [];

                                                                    for (var i in layers) {
                                                                        if (layers[i].type == "SANWEI") {
                                                                            for (var j in layers[i].children) {
                                                                                if (layers[i].children[j].id.split("_")[1] != obj.data.id) {
                                                                                    child.push(layers[i].children[j]);
                                                                                } else {
                                                                                    if (layers[i].children[j].checked) {//选中
                                                                                        if (modleInfo.id == layers[i].children[j].id) {
                                                                                            viewer.scene.primitives.remove(curtileset);
                                                                                            curtileset = null;
                                                                                            modleInfo = null;
                                                                                        }
                                                                                    }
                                                                                }

                                                                            }
                                                                            layers[i].children = child;
                                                                            layers[i].spread = true;
                                                                            break;
                                                                        }
                                                                    }
                                                                    if (curtileset != null) {//有模型的情况下就不刷新了
                                                                        modeljiazaiFlag = false;
                                                                    }// 不刷新的问题是。现在设置的checked为false  当选择模型的时候，树上没有同步更改

                                                                    tree.reload('prjlayerlistid', { data: layers });
                                                                    ClearTemp();


                                                                }

                                                                layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                            }, datatype: "json"
                                                        });

                                                        layer.close(index);
                                                    });
                                                }
                                            });



                                        }
                                        , end: function () {
                                            sanweiinfoeditlayerindex = null;
                                            modeledittable = null;
                                            drwInfox = null;
                                            modeledittable = null;
                                            modeltabledata = [];
                                            usemodelids = [];
                                        }
                                    });
                                } else {
                                    layer.msg("已打开添加模型窗口", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                }
                            }

                        }

                    });

               

            }

        }, datatype: "json"
    });
    
}
