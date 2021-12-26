var layers = [];//图层列表数据

//图层列表widget
function LoadLayerListLayer(id) {
    if (id == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
    }
    else {
        if (projectlayerlistlayerindex == null) {
            projectlayerlistlayerindex = layer.open({
                type: 1
                , title: ['图层列表', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                , area: ['350px', '500px']
                , shade: 0
                , offset: ['520px', '10px']
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<div id="prjlayerlist"></div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);
                }
                , end: function () {
                    projectlayerlistlayerindex = null;
                    //删除图层数据

                }
            });

            //请求图层列表
            $.ajax({
                url: servicesurl + "/api/Layer/GetLayerInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                success: function (data) {
                    if (data == "") {
                        layer.msg("无项目图层信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }
                    else {
                        var layerlist = JSON.parse(data);
                        layers = [];//图层列表数据

                        //项目图层（项目位置、空间范围、影响范围、实景模型）
                        if (layerlist.ProjectLayer != null) {
                            var projectlayer = new Object;
                            projectlayer.title = layerlist.ProjectLayer.Title;

                            var projectlayerchild = [];
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
                                    projectlayer.spread = true;
                                }
                                else {
                                    prjcenter.checked = false;
                                }
                                prjcenter.showCheckbox = true;//显示复选框
                                projectlayerchild.push(prjcenter);
                            }
                            if (layerlist.ProjectLayer.KJFW != null) {
                                //TODO
                            }
                            if (layerlist.ProjectLayer.YXFW != null) {
                                //TODO
                            }
                            if (layerlist.ProjectLayer.SurModels != null) {
                                var prjsurmodel = new Object;
                                prjsurmodel.title = layerlist.ProjectLayer.SurModels.Title;
                                var prjsurmodelchild = [];
                                for (var i in layerlist.ProjectLayer.SurModels.SurModelList) {
                                    var surmodel = new Object;
                                    surmodel.title = layerlist.ProjectLayer.SurModels.SurModelList[i].MXSJ;
                                    surmodel.id = "PROJECTSUMODEL_" + layerlist.ProjectLayer.SurModels.SurModelList[i].Id;
                                    surmodel.type = "PROJECTSUMODEL";
                                    surmodel.path = layerlist.ProjectLayer.SurModels.SurModelList[i].MXLJ;
                                    surmodel.checked = false;
                                    surmodel.showCheckbox = true;//显示复选框
                                    surmodel.gcgz = layerlist.ProjectLayer.SurModels.SurModelList[i].MXST;
                                    surmodel.modelView = layerlist.ProjectLayer.SurModels.SurModelList[i].MXFW;
                                    prjsurmodelchild.push(surmodel);
                                }

                                prjsurmodel.children = prjsurmodelchild;
                                projectlayerchild.push(prjsurmodel);
                            }

                            projectlayer.children = projectlayerchild;
                            layers.push(projectlayer);
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

                        if (projectlayerlistlayerindex != null) {
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
                                                                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                                                width: 24,
                                                                height: 24,



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
                                                                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                pixelOffset: new Cesium.Cartesian2(0.0, -36),
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
                                                    if (curtileset != null) {
                                                        viewer.entities.add({
                                                            id: data.id,
                                                            position: viewer.scene.clampToHeight(Cesium.Cartesian3.fromDegrees(data.bl.L, data.bl.B)),
                                                            billboard: {
                                                                image: '../../Resources/img/map/marker.png',
                                                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                                width: 24,
                                                                height: 24,
                                                            }
                                                        });
                                                    }
                                                    else {
                                                        viewer.entities.add({
                                                            id: data.id,
                                                            position: Cesium.Cartesian3.fromDegrees(data.bl.L, data.bl.B),
                                                            billboard: {
                                                                image: '../../Resources/img/map/marker.png',
                                                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                                                width: 24,
                                                                height: 24,
                                                            }
                                                        });
                                                    }
                                                }

                                                var entitylabel = viewer.entities.getById(data.id + "_LABEL");
                                                if (entitylabel == undefined) {
                                                    if (curtileset != null) {
                                                        viewer.entities.add({
                                                            id: data.id + "_LABEL",
                                                            position: viewer.scene.clampToHeight(Cesium.Cartesian3.fromDegrees(data.bl.L, data.bl.B)),
                                                            label: {
                                                                text: data.label,
                                                                font: '24px Times New Roman',
                                                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                            }
                                                        });
                                                    }
                                                    else {
                                                        viewer.entities.add({
                                                            id: data.id + "_LABEL",
                                                            position: Cesium.Cartesian3.fromDegrees(data.bl.L, data.bl.B),
                                                            label: {
                                                                text: data.label,
                                                                font: '24px Times New Roman',
                                                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                                                pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                            }
                                                        });
                                                    }
                                                }

                                                data.checked = true;
                                            }
                                            else if (data.type == "PROJECTSUMODEL") {
                                                //项目模型
                                                LoadModel(data);
                                                data.checked = true;
                                                if (currentprojectid == 70) {
                                                    console.log(111);
                                                    console.log(id);
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
                                    if (data.type != "PROJECTSUMODEL") {
                                        return;
                                    }
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
                                                mxfw: JSON.stringify(home),
                                                id: data.id.split("_")[1]//模型id
                                            }
                                            $.ajax({
                                                url: servicesurl + "/api/Survey/UpdateModelGoodView", type: "put", data: data2,
                                                success: function (result) {
                                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                                    layer.close(loadingminindex);
                                                }, datatype: "json"
                                            });
                                        });
                                    } else {
                                        layer.msg("请选择该模型进行最佳视图更新", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        return;
                                    }
                                }

                            });

                        }

                    }

                }, datatype: "json"
            });

        }

    }

}
var features = 
    [
        [
            106.52582339999998,
            29.77375347999993
        ],
        [
            106.52522640000012,
            29.773795670000085
        ],
        [
            106.52506450000004,
            29.773838900000098
        ],
        [
            106.52473870000012,
            29.773859130000014
        ],
        [
            106.52443750000004,
            29.773881310000037
        ],
        [
            106.52431009999998,
            29.774389840000027
        ],
        [
            106.52381910000003,
            29.774526270000139
        ],
        [
            106.52335720000002,
            29.774608360000003
        ],
        [
            106.52290770000013,
            29.774647640000013
        ],
        [
            106.52282090000006,
            29.774683170000118
        ],
        [
            106.52120980000001,
            29.77521099000012
        ],
        [
            106.52079010000006,
            29.774919389999974
        ],
        [
            106.5205856,
            29.77472074000002
        ],
        [
            106.52028260000003,
            29.774620959999934
        ],
        [
            106.51998750000013,
            29.774728539999953
        ],
        [
            106.51932299999999,
            29.77490710000001
        ],
        [
            106.51813890000011,
            29.774622080000026
        ],
        [
            106.51806950000003,
            29.774552100000116
        ],
        [
            106.51798000000008,
            29.774478290000045
        ],
        [
            106.51754690000013,
            29.774706520000107
        ],
        [
            106.5171977,
            29.77491562
        ],
        [
            106.5166961000001,
            29.775205130000129
        ],
        [
            106.51646110000002,
            29.775111620000076
        ],
        [
            106.5162304000001,
            29.774963600000036
        ],
        [
            106.51557839999998,
            29.77509466000009
        ],
        [
            106.51545199999998,
            29.775062310000068
        ],
        [
            106.51509079999994,
            29.77472100000006
        ],
        [
            106.51471780000003,
            29.77426086999998
        ],
        [
            106.5133932,
            29.773694500000035
        ],
        [
            106.50525050000005,
            29.768757150000057
        ],
        [
            106.50456420000012,
            29.76939743999992
        ],
        [
            106.50451559999999,
            29.769621029999994
        ],
        [
            106.5035863,
            29.769803010000094
        ],
        [
            106.50318390000013,
            29.76985152000003
        ],
        [
            106.50297809999995,
            29.769867090000106
        ],
        [
            106.50225570000004,
            29.769949870000006
        ],
        [
            106.50221599999998,
            29.770002990000138
        ],
        [
            106.50197630000003,
            29.7702943700001
        ],
        [
            106.49967960000009,
            29.770380520000118
        ],
        [
            106.49954170000001,
            29.770586500000094
        ],
        [
            106.49950600000011,
            29.77082180000002
        ],
        [
            106.49929450000002,
            29.771030540000085
        ],
        [
            106.49910050000011,
            29.771005110000098
        ],
        [
            106.498919,
            29.771085490000023
        ],
        [
            106.49867710000007,
            29.77102588000002
        ],
        [
            106.49830659999998,
            29.770867820000093
        ],
        [
            106.49799630000007,
            29.770786120000087
        ],
        [
            106.4978107,
            29.77090912999995
        ],
        [
            106.49754920000004,
            29.77109582000015
        ],
        [
            106.49733320000007,
            29.771214349999977
        ],
        [
            106.49704150000014,
            29.77133538000004
        ],
        [
            106.49690870000012,
            29.77141155999999
        ],
        [
            106.49676850000009,
            29.771527070000106
        ],
        [
            106.49657560000009,
            29.771710750000016
        ],
        [
            106.49653460000008,
            29.771862839999984
        ],
        [
            106.4964356000001,
            29.772295640000097
        ],
        [
            106.49618759999999,
            29.77237384
        ],
        [
            106.49587030000004,
            29.772388130000136
        ],
        [
            106.4956117000001,
            29.77241423999999
        ],
        [
            106.49541100000005,
            29.772496400000028
        ],
        [
            106.49513979999995,
            29.772577459999977
        ],
        [
            106.49477380000008,
            29.772661540000006
        ],
        [
            106.49419480000012,
            29.772795500000087
        ],
        [
            106.49369730000001,
            29.772809380000014
        ],
        [
            106.49349689999991,
            29.772808550000094
        ],
        [
            106.49335389999999,
            29.772853150000065
        ],
        [
            106.49303270000007,
            29.772849849999948
        ],
        [
            106.49280650000003,
            29.772760890000084
        ],
        [
            106.49258130000004,
            29.772605699999987
        ],
        [
            106.49245310000009,
            29.772499310000119
        ],
        [
            106.49233740000011,
            29.772404360000047
        ],
        [
            106.49211709999998,
            29.77227558000005
        ],
        [
            106.49205039999998,
            29.77207151000005
        ],
        [
            106.49197570000001,
            29.77184062999993
        ],
        [
            106.49203870000008,
            29.7717047700001
        ],
        [
            106.49211909999997,
            29.77157779000004
        ],
        [
            106.49187090000004,
            29.771418509999994
        ],
        [
            106.49190420000014,
            29.77128938999999
        ],
        [
            106.49190610000011,
            29.771155540000107
        ],
        [
            106.49194130000001,
            29.7710993500001
        ],
        [
            106.49200710000014,
            29.77104154000011
        ],
        [
            106.49208320000003,
            29.770956780000007
        ],
        [
            106.4920272,
            29.77081139000006
        ],
        [
            106.49163189999996,
            29.77081142000003
        ],
        [
            106.49123120000007,
            29.770808409999974
        ],
        [
            106.49108429999996,
            29.770801060000115
        ],
        [
            106.49077580000005,
            29.770759579999998
        ],
        [
            106.49051319999995,
            29.770747510000093
        ],
        [
            106.49016919999991,
            29.77077705000005
        ],
        [
            106.48986140000005,
            29.770821420000009
        ],
        [
            106.4895515,
            29.77090030000011
        ],
        [
            106.4892451,
            29.771023740000034
        ],
        [
            106.4890185000001,
            29.77115878000001
        ],
        [
            106.48885359999997,
            29.771219080000038
        ],
        [
            106.48840340000004,
            29.771095600000139
        ],
        [
            106.48778990000005,
            29.771017520000045
        ],
        [
            106.48782680000011,
            29.771182840000056
        ],
        [
            106.48785250000009,
            29.771312860000138
        ],
        [
            106.48763020000001,
            29.771469580000145
        ],
        [
            106.48705160000009,
            29.771736970000064
        ],
        [
            106.48688400000009,
            29.771816860000116
        ],
        [
            106.48626059999998,
            29.77199171000001
        ],
        [
            106.48594170000007,
            29.77198745000004
        ],
        [
            106.48584349999993,
            29.771982220000099
        ],
        [
            106.48505900000004,
            29.77230443999997
        ],
        [
            106.48476399999999,
            29.77243578999997
        ],
        [
            106.48273200000006,
            29.773223050000128
        ],
        [
            106.48233440000007,
            29.773438699999987
        ],
        [
            106.48218109999999,
            29.773518410000017
        ],
        [
            106.48129849999998,
            29.773955050000099
        ],
        [
            106.47976440000002,
            29.774716890000098
        ],
        [
            106.47956990000012,
            29.774725720000107
        ],
        [
            106.47945590000006,
            29.77474142999995
        ],
        [
            106.47689440000005,
            29.77544765999994
        ],
        [
            106.47642410000003,
            29.775587499999977
        ],
        [
            106.47609449999999,
            29.775663870000068
        ],
        [
            106.47284189999994,
            29.773401770000139
        ]
    ]
;

var pointList = [];
for (var i in features) {
      pointList.push(new Cesium.Cartesian3.fromDegrees(features[i][0], features[i][1],150));

}
console.log(pointList);
var jianceList = [];
var gxjcdList = [
    {
        "attributes": {
            "FID": 0,
            "code": "GB01",
            "L": 106.4937500,
            "B": 29.7715583,
            "H": 251.02
			}
    },
    {
        "attributes": {
            "FID": 1,
            "code": "GB02",
            "L": 106.4933361,
            "B": 29.7719944,
            "H": 237.97
			}
    },
    {
        "attributes": {
            "FID": 2,
            "code": "GB03",
            "L": 106.4928944,
            "B": 29.7724583,
            "H": 210.43
			}
    },
    {
        "attributes": {
            "FID": 3,
            "code": "GB04",
            "L": 106.4941806,
            "B": 29.7714306,
            "H": 249.81
			}
    },
    {
        "attributes": {
            "FID": 4,
            "code": "GB05",
            "L": 106.4942694,
            "B": 29.7718056,
            "H": 241.01
			}
    },
    {
        "attributes": {
            "FID": 5,
            "code": "GB06",
            "L": 106.4943861,
            "B": 29.7722583,
            "H": 217.61
			}
    },
    {
        "attributes": {
            "FID": 6,
            "code": "YB01",
            "L": 106.4926278,
            "B": 29.7726389,
            "H": 201.56
			}
    },
    {
        "attributes": {
            "FID": 7,
            "code": "YB02",
            "L": 106.4944833,
            "B": 29.7727194,
            "H": 206.54
			}
    },
    {
        "attributes": {
            "FID": 8,
            "code": "JY01",
            "L": 106.4935000,
            "B": 29.7727917,
            "H": 233.42
			}
    },
    {
        "attributes": {
            "FID": 9,
            "code": "SP01",
            "L": 106.4935167,
            "B": 29.7727778,
            "H": 233.21
        }
    }
]

for (var i in gxjcdList) {
    var temp = {};
    temp.point = Cesium.Cartesian3.fromDegrees(gxjcdList[i].attributes.L, gxjcdList[i].attributes.B, gxjcdList[i].attributes.H);
    temp.name = gxjcdList[i].attributes.code;
    jianceList.push(temp);
}
console.log(jianceList);