var layers = [];//图层列表数据
var windowInfoList = [];//测区数据
var modleInfoList = [];//模型数据
var modeljiazaiFlag = true;//控制模型的加载？
var xiePuoinfo = null;//装当前斜坡的信息
var MODELICON = '<span style="margin-left:0px;margin-right:2px;"><img src="../../../Resources/img/map/model.png" style="width:14px;height:14px;"/></span>';
//图层列表widget
function LoadLayerListLayer(id) {
    if (id == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
    }
    else {
            //请求图层列表
             var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
            $.ajax({
                url: servicesurl + "/api/FlzLayer/GetLayerInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                success: function (data) {
                    layer.close(loadingminindex);
                    if (data == "") {
                        layer.msg("无项目图层信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }
                    else {
                        var layerlist = JSON.parse(data);
                        console.log(layerlist);
                        layers = [];//图层列表数据

                        //项目图层（项目位置、空间范围、影响范围、实景模型）
                        if (layerlist.ProjectLayer != null) {
                            var projectlayer = new Object;
                            //projectlayer.title = layerlist.ProjectLayer.Title;
                            projectlayer.title ="测窗";

                            var projectlayerchild = [];
                          
                            // 优势结构面
                            if (layerlist.FlzDataLayer != null && layerlist.FlzDataLayer.FlzDataList != null) {
                                windowInfoList = layerlist.FlzDataLayer.FlzWindowInfoList;
                                var dominantStructuralPlane = new Object;
                                dominantStructuralPlane.title = "优势结构面";
                                dominantStructuralPlane.type = "DOMSTRPLA";
                                dominantStructuralPlane.id = "DOMSTRPLA_" + id;
                                dominantStructuralPlane.checked = false;
                                dominantStructuralPlane.showCheckbox = true;//显示复选框
                                var dominantStructuralPlanechild = [];
                                if (layerlist.FlzDataLayer.FlzDataList != null) {
                                    for (var j in layerlist.FlzDataLayer.FlzDataList) {//已经是项目id相同的查回来的。根据类型来显示
                                        if ("4" == layerlist.FlzDataLayer.FlzDataList[j].type) {//优势结构面类型存4

                                            var pointListtem = JSON.parse(layerlist.FlzDataLayer.FlzDataList[j].postion);
                                            layerlist.FlzDataLayer.FlzDataList[j].postion = pointListtem;
                                            var flzline = new Object;
                                            var xSum = 0;//求一个平均点，用于定位
                                            var ySum = 0;
                                            var zSum = 0;
                                            for (var m = 0; m < pointListtem.length; m++) {
                                                xSum = xSum + parseFloat(pointListtem[m].x);
                                                ySum = ySum + parseFloat(pointListtem[m].y);
                                                zSum = zSum + parseFloat(pointListtem[m].z);
                                            }
                                            flzline.Centerx = xSum / pointListtem.length;
                                            flzline.Centery = ySum / pointListtem.length;
                                            flzline.Centerz = zSum / pointListtem.length;
                                            flzline.title = layerlist.FlzDataLayer.FlzDataList[j].name;
                                            flzline.id = "YOUSHIMIAN_" + layerlist.FlzDataLayer.FlzDataList[j].id;
                                            flzline.type = "YOUSHIMIAN";
                                            flzline.remarks = layerlist.FlzDataLayer.FlzDataList[j].remarks;
                                            flzline.datas = layerlist.FlzDataLayer.FlzDataList[j];
                                            flzline.pointList = pointListtem;
                                            flzline.checked = false;
                                            flzline.showCheckbox = true;//显示复选框
                                            dominantStructuralPlanechild.push(flzline);
                                        }
                                    }
                                }
                                dominantStructuralPlane.children = dominantStructuralPlanechild;
                                projectlayerchild.push(dominantStructuralPlane);

                                
                            }
                            //测区
                            if (layerlist.FlzDataLayer != null && layerlist.FlzDataLayer.FlzWindowInfoList != null) {
                                windowInfoList = layerlist.FlzDataLayer.FlzWindowInfoList;
                                for (var i in layerlist.FlzDataLayer.FlzWindowInfoList) {
                                    var flzWindowLayer = new Object;
                                    var tempflzWindowPoitslist = JSON.parse(layerlist.FlzDataLayer.FlzWindowInfoList[i].points);
                                    layerlist.FlzDataLayer.FlzWindowInfoList[i].points = tempflzWindowPoitslist;//赋值回去
                                    var xSum = 0;//求一个平均点，用于定位
                                    var ySum = 0;
                                    var zSum = 0;
                                    for (var m = 0; m < tempflzWindowPoitslist.length; m++) {
                                        xSum = xSum + parseFloat(tempflzWindowPoitslist[m].x);
                                        ySum = ySum + parseFloat(tempflzWindowPoitslist[m].y);
                                        zSum = zSum + parseFloat(tempflzWindowPoitslist[m].z);
                                    }
                                    flzWindowLayer.title = layerlist.FlzDataLayer.FlzWindowInfoList[i].name;
                                    flzWindowLayer.Centerx = xSum / tempflzWindowPoitslist.length;
                                    flzWindowLayer.Centery = ySum / tempflzWindowPoitslist.length;
                                    flzWindowLayer.Centerz = zSum / tempflzWindowPoitslist.length;
                                    flzWindowLayer.type = "FLZWINDOW";
                                    flzWindowLayer.id = "FLZWINDOW_" + layerlist.FlzDataLayer.FlzWindowInfoList[i].id;
                                    flzWindowLayer.datas = layerlist.FlzDataLayer.FlzWindowInfoList[i];
                                    flzWindowLayer.pointList = tempflzWindowPoitslist;//直接放进来
                                    flzWindowLayer.checked = false;
                                    flzWindowLayer.showCheckbox = true;//显示复选框
                                    var flzWindowLayerchild = [];
                                    if (layerlist.FlzDataLayer.FlzDataList != null) {
                                        for (var j in layerlist.FlzDataLayer.FlzDataList) {
                                            if (layerlist.FlzDataLayer.FlzWindowInfoList[i].id == layerlist.FlzDataLayer.FlzDataList[j].windowId) {//侧窗id相等的数据

                                                var pointListtem = JSON.parse(layerlist.FlzDataLayer.FlzDataList[j].postion);
                                                layerlist.FlzDataLayer.FlzDataList[j].postion = pointListtem;
                                                var flzline = new Object;
                                                var xSum = 0;//求一个平均点，用于定位
                                                var ySum = 0;
                                                var zSum = 0;
                                                for (var m = 0; m < pointListtem.length; m++) {
                                                    xSum = xSum + parseFloat(pointListtem[m].x);
                                                    ySum = ySum + parseFloat(pointListtem[m].y);
                                                    zSum = zSum + parseFloat(pointListtem[m].z);
                                                }
                                                flzline.Centerx = xSum / pointListtem.length;
                                                flzline.Centery = ySum / pointListtem.length;
                                                flzline.Centerz = zSum / pointListtem.length;
                                                flzline.title = layerlist.FlzDataLayer.FlzDataList[j].name;
                                                flzline.id = "FLZJIELI_" + layerlist.FlzDataLayer.FlzDataList[j].id;
                                                flzline.type = "FLZJIELI";
                                                flzline.remarks = layerlist.FlzDataLayer.FlzDataList[j].remarks;
                                                flzline.datas = layerlist.FlzDataLayer.FlzDataList[j];
                                                flzline.pointList = pointListtem;
                                                flzline.checked = false;
                                                flzline.showCheckbox = true;//显示复选框
                                                flzWindowLayerchild.push(flzline);
                                            }
                                        }
                                    }
                                    flzWindowLayer.children = flzWindowLayerchild;
                                    projectlayerchild.push(flzWindowLayer);

                                }
                            }
                        }

                        projectlayer.children = projectlayerchild;
                        layers.push(projectlayer);
                        //项目图层（项目位置、空间范围、影响范围、实景模型）
                        if (layerlist.ProjectLayer != null) {
                            
                            if (layerlist.ProjectLayer.Models != null) {//新东西
                                var prjsurmodel = new Object;
                                // prjsurmodel.title = layerlist.ProjectLayer.Models.Title;
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
                                console.log(modleInfoList);
                                prjsurmodel.children = prjsurmodelchild;
                                layers.push(prjsurmodel);
                            } else {
                                var prjsurmodel = new Object;
                                // prjsurmodel.title = layerlist.ProjectLayer.Models.Title;
                                prjsurmodel.title = "三维实景模型";
                                prjsurmodel.type = "SANWEI";
                                //prjsurmodel.children = [];
                                layers.push(prjsurmodel);
                            }
                        }
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
                                    projectlayer.spread = true;
                                }
                                else {
                                    prjcenter.checked = false;
                                }
                                prjcenter.showCheckbox = true;//显示复选框
                                layers.push(prjcenter);
                            }
                        }
                        //斜坡体
                        if (layerlist.ProjectLayer != null && layerlist.ProjectLayer.KJFW != null ) {
                            var bianjie = new Object;
                            var bianjie = new Object;
                            bianjie.title = "项目边界范围";
                            bianjie.type = "BIANJIE";
                            bianjie.id = "BIANJIE" + id;
                            bianjie.pointList = JSON.parse(layerlist.ProjectLayer.KJFW.GeoJSON);
                            var entity = viewer.entities.getById(bianjie.id);
                            if (entity != undefined) {
                                bianjie.checked = true;
                                bianjie.spread = true;
                            }
                            else {
                                bianjie.checked = false;
                            }
                            bianjie.showCheckbox = true;//显示复选框
                            layers.push(bianjie);
                        }
                        
                        

                
                        //监测图层（监测点、监测剖面）
                        if (layerlist.FlzDataLayer != null && layerlist.FlzDataLayer.FlzDataList!=null&&false) {
                            var flzDataLayer = new Object;
                            flzDataLayer.title = "模型标注";
                            flzDataLayer.type = "MODELTAG";
                            var flzDataLayerchild = [];
                            var pointList = [];
                            var lineList = [];
                            var noodlesList = [];
                            for (var i = 0; i < layerlist.FlzDataLayer.FlzDataList.length;i++) {
                                if ("1" == layerlist.FlzDataLayer.FlzDataList[i].type) {
                                    pointList.push(layerlist.FlzDataLayer.FlzDataList[i]);
                                } else if ("2" == layerlist.FlzDataLayer.FlzDataList[i].type) {
                                    lineList.push(layerlist.FlzDataLayer.FlzDataList[i]);
                                } else if ("5" == layerlist.FlzDataLayer.FlzDataList[i].type) {
                                    noodlesList.push(layerlist.FlzDataLayer.FlzDataList[i]);
                                }
                            }
                            //点
                            if (pointList != null && pointList.length > 0 ) {
                                var flzpointlayer = new Object;
                                flzpointlayer.title = "点标注";
                                flzpointlayer.type = "FLZPOINT";
                                flzpointlayer.checked = false;
                                flzpointlayer.showCheckbox = true;//显示复选框
                                var flzpointlayerchild = [];
                                for (var i = 0; i < pointList.length; i++) {
                                    var postion = JSON.parse(pointList[i].postion);
                                    var flzpoint = new Object;
                                    flzpoint.title = pointList[i].name;
                                    flzpoint.id = "FLZPOINT_" + pointList[i].id;
                                    flzpoint.type = "FLZPOINT";
                                    flzpoint.remarks = pointList[i].remarks;
                                    flzpoint.pointId = pointList[i].id;
                                    flzpoint.postion = postion;
                                    flzpoint.checked = false;
                                    flzpoint.showCheckbox = true;//显示复选框
                                    flzpointlayerchild.push(flzpoint);

                                }
                                flzpointlayer.children = flzpointlayerchild;
                                flzDataLayerchild.push(flzpointlayer);
                                
                            }
                            //线
                            if (lineList != null && lineList.length>0) {
                                var flzlinelayer = new Object;
                                flzlinelayer.title = "线标注";
                                flzlinelayer.type = "FLZLINE";
                                flzlinelayer.checked = false;
                                flzlinelayer.showCheckbox = true;//显示复选框
                                var flzlinelayerchild = [];
                                for (var i = 0; i < lineList.length; i++) {
                                    var pointListtem = JSON.parse(lineList[i].postion);
                                    var xSum = 0;//求一个平均点，用于定位
                                    var ySum = 0;
                                    var zSum = 0;
                                    for (var m = 0; m < pointListtem.length; m++) {
                                        xSum = xSum + parseFloat(pointListtem[m].x);
                                        ySum = ySum + parseFloat(pointListtem[m].y);
                                        zSum = zSum + parseFloat(pointListtem[m].z);
                                    }
                                    

                                    var flzline = new Object;
                                    flzline.Centerx = xSum / pointListtem.length;
                                    flzline.Centery = ySum / pointListtem.length;
                                    flzline.Centerz = zSum / pointListtem.length;
                                    flzline.title = lineList[i].name;
                                    flzline.id = "FLZLINE_" + lineList[i].id;
                                    flzline.type = "FLZLINE";
                                    flzline.remarks = lineList[i].remarks;
                                    flzline.lineId = lineList[i].id;
                                    flzline.pointList = pointListtem;
                                    flzline.checked = false;
                                    flzline.showCheckbox = true;//显示复选框
                                    flzlinelayerchild.push(flzline);

                                }
                                flzlinelayer.children = flzlinelayerchild;
                                flzDataLayerchild.push(flzlinelayer);

                            }
                            //面
                            if (noodlesList != null && noodlesList.length > 0) {
                                var flznoodleslayer = new Object;
                                flznoodleslayer.title = "面标注";
                                flznoodleslayer.type = "FLZAREA";
                                flznoodleslayer.checked = false;
                                flznoodleslayer.showCheckbox = true;//显示复选框
                                var flznoodleslayerchild = [];
                                for (var i = 0; i < noodlesList.length; i++) {
                                    var pointListtem = JSON.parse(noodlesList[i].postion);
                                    var xSum = 0;//求一个平均点，用于定位
                                    var ySum = 0;
                                    var zSum = 0;
                                    for (var m = 0; m < pointListtem.length; m++) {
                                        xSum = xSum + parseFloat(pointListtem[m].x);
                                        ySum = ySum + parseFloat(pointListtem[m].y);
                                        zSum = zSum + parseFloat(pointListtem[m].z);
                                    }
                                    


                                    var flznoodles = new Object;
                                    flznoodles.Centerx = xSum / pointListtem.length;
                                    flznoodles.Centery = ySum / pointListtem.length;
                                    flznoodles.Centerz = zSum / pointListtem.length;
                                    flznoodles.title = noodlesList[i].name;
                                    flznoodles.id = "FLZAREA_" + noodlesList[i].id;
                                    flznoodles.type = "FLZAREA";
                                    flznoodles.remarks = noodlesList[i].remarks;
                                    flznoodles.noodlesId = noodlesList[i].id;
                                    flznoodles.pointList = pointListtem;
                                    flznoodles.checked = false;
                                    flznoodles.showCheckbox = true;//显示复选框
                                    flznoodleslayerchild.push(flznoodles);

                                }
                                flznoodleslayer.children = flznoodleslayerchild;
                                flzDataLayerchild.push(flznoodleslayer);

                            }

                            flzDataLayer.children = flzDataLayerchild;
                            layers.push(flzDataLayer);
                            console.log(layers);
                        }
                        //var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                        //$.ajax({
                        //    url: servicesurl + "/api/FlzWindowInfo/GetSteepHillInfoList", type: "get", data: {
                        //        "cookie": document.cookie, "id": id,
                        //        "jieLun": '' },
                        //    success: function (data) {
                        //        layer.close(loadingceindex);
                        //        if (data == "") {//没得斜坡单元数据

                        //            //layer.msg("无陡崖用户信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        //            // curuserid = null;
                        //        } else {
                        //            var xiePuoList = JSON.parse(data);
                        //            console.log(xiePuoList);
                        //            var flzDataLayer = new Object;
                        //            flzDataLayer.title = "斜坡";
                        //            flzDataLayer.type = "XIEPUOFAT";
                        //            var flzDataLayerchild = [];
                        //            for (var i in xiePuoList) {
                        //                var positList = JSON.parse(xiePuoList[i].points);
                        //                var flzline = new Object;
                        //                flzline.title = xiePuoList[i].name;
                        //                flzline.id = "XIEPUO_" + xiePuoList[i].id;
                        //                flzline.type = "XIEPUO";
                        //                flzline.remarks = xiePuoList[i].remarks;
                        //                flzline.datas = xiePuoList[i];
                        //                flzline.datas.pointList = positList;
                        //                flzline.pointList = positList;
                        //                flzline.checked = false;
                        //                flzline.spread = false;
                        //                flzline.showCheckbox = true;//显示复选框spread = true
                        //                flzDataLayerchild.push(flzline);
                        //            }
                        //            flzDataLayer.children = flzDataLayerchild;
                        //            flzDataLayer.spread = false;
                        //            layers.push(flzDataLayer);
                        //        }
                        //    }, datatype: "json"
                        //});
                            //TODO MORE LAYER
                            console.log(layers);
                            if (projectindex != null) {
                                tree.render({
                                    elem: '#prjlayerlist'
                                    , id: 'prjlayerlistid'
                                    , edit: ['add', 'update', 'del']
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
                                        if (data.checked) {
                                            if (data.children != undefined) {
                                                if (data.type == "FLZWINDOW") {
                                                    //viewer.zoomTo(viewer.entities.getById(data.id + "_LABEL"));
                                                    console.log(data);
                                                    viewer.zoomTo(viewer.entities.getById(data.id + "_LABEL"), new Cesium.HeadingPitchRange(Cesium.Math.toRadians(-(parseFloat(data.datas.level))), Cesium.Math.toRadians(data.datas.vertical), 40));

                                                } else {
                                                    var entities = [];
                                                    for (var i in data.children) {
                                                        var entity = viewer.entities.getById(data.children[i].id)
                                                        if (entity != undefined) {
                                                            entities.push(entity);
                                                        }
                                                    }

                                                    if (entities.length > 0) {
                                                        viewer.zoomTo(entities, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(300), Cesium.Math.toRadians(-120), 50));
                                                    }
                                                }
                                            
                                            }
                                            else {
                                                console.log(data);
                                                //  viewer.flyTo(viewer.entities.getById(data.id), { duration: 1, offset: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-90), 50) });
                                                // viewer.zoomTo(viewer.entities.getById(data.id));//
                                                if (data.type == "FLZJIELI") {// || data.type == "YOUSHIMIAN"
                                                    //viewer.zoomTo(viewer.entities.getById(data.id + "_LABEL"));
                                                    console.log(data);//测窗的
                                                    for (var i in layers[0].children) {
                                                        for (var j in layers[0].children[i].children) {
                                                            if (data.id == layers[0].children[i].children[j].id) {
                                                                console.log(layers[0].children[i]);
                                                                viewer.zoomTo(viewer.entities.getById(data.id + "_LABEL"), new Cesium.HeadingPitchRange(Cesium.Math.toRadians(-(parseFloat(layers[0].children[i].datas.level))), Cesium.Math.toRadians(layers[0].children[i].datas.vertical), 20));
                                                                break;
                                                            }
                                                        }
                                                    }
                                                
                                                
                                                } else if (data.type == "YOUSHIMIAN") {// || data.type == "YOUSHIMIAN"
                                                    //viewer.zoomTo(viewer.entities.getById(data.id + "_LABEL"));
                                                    console.log(data);
                                                    viewer.zoomTo(viewer.entities.getById(data.id + "_LABEL"), new Cesium.HeadingPitchRange(Cesium.Math.toRadians(data.datas.inclination - 180), Cesium.Math.toRadians(data.datas.dipAngle-90), 40));
                                                } else if (data.type == "PROJECTSUMODEL") {// || data.type == "YOUSHIMIAN"
                                                    if (curtileset != null) {
                                                        if (data.modelView != null && data.modelView.length > 0) {
                                                            var home = JSON.parse(data.modelView);
                                                            viewer.scene.camera.setView(home);
                                                        } else {
                                                            viewer.zoomTo(curtileset);
                                                        }
                                                    }

                                                }else {
                                                    viewer.zoomTo(viewer.entities.getById(data.id))
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
                                                if (data.type == "FLZPOINT") {
                                                    //全选监测点
                                                    for (var i in data.children) {
                                                        var entity = viewer.entities.getById(data.children[i].id);
                                                        if (entity == undefined) {
                                                            //当无此元素添加
                                                            viewer.entities.add({
                                                                id: data.children[i].id,
                                                                position: data.children[i].postion,
                                                                billboard: {
                                                                    image: '../../Resources/img/map/marker.png',
                                                                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                                    width: 24,
                                                                    height: 24,
                                                                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                                }
                                                            });
                                                        }

                                                        var entitylabel = viewer.entities.getById(data.children[i].id + "_LABEL");
                                                        if (entitylabel == undefined) {
                                                            viewer.entities.add({
                                                                id: data.children[i].id + "_LABEL",
                                                                position: data.children[i].postion,
                                                                label: {
                                                                    text: data.children[i].title,
                                                                    showBackground: true,
                                                                    backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                                    font: '14px Times New Roman',
                                                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                    pixelOffset: new Cesium.Cartesian2(0.0, -36),
                                                                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                                }
                                                            });
                                                        }

                                                        data.children[i].checked = true;
                                                    }
                                                }
                                                else if (data.type == "FLZLINE") {
                                                    //全选线
                                                    for (var i in data.children) {
                                                        var entity = viewer.entities.getById(data.children[i].id);
                                                        if (entity == undefined) {
                                                            var line = data.children[i].pointList; 
                                                            var sum = 0;
                                                        
                                                            for (var x = 0; x < line.length - 1; x++) {
                                                                var point1 = line[x];
                                                                var point2 = line[x + 1];

                                                                var distance = Cesium.Cartesian3.distance(point1, point2)
                                                                if (distance == NaN) {
                                                                    sum = 0;
                                                                    break;
                                                                }
                                                                else {
                                                                    sum += distance;
                                                                }
                                                            }
                                                            viewer.entities.add({
                                                                id: data.children[i].id,
                                                                polyline: {
                                                                    positions: line,
                                                                    width: 3,
                                                                    material: Cesium.Color.YELLOW,
                                                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                                        color: Cesium.Color.YELLOW
                                                                    })
                                                                }
                                                            });

                                                            viewer.entities.add({
                                                                id: data.children[i].id + "_LABEL",
                                                                position: line[0],
                                                                label: {
                                                                    text: data.children[i].title + '-长度：' + sum.toFixed(2) + '米',
                                                                    showBackground: true,
                                                                    backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                                    font: '14px Times New Roman',
                                                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                    pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                                }
                                                            
                                                            });

                                                        }

                                                        data.children[i].checked = true;
                                                    }
                                                } else if (data.type == "FLZWINDOW") {
                                                    //全选侧窗
                                                    console.log(data);
                                                    var entityFater = viewer.entities.getById(data.id);
                                                    var sum = 0;
                                              
                                                    if (entityFater == undefined) {
                                                        var points = data.pointList;
                                                        points.push(points[0]);
                                                        viewer.entities.add({
                                                            id: data.id,
                                                            polyline: {
                                                                positions: points,
                                                                width: 0.5,
                                                                arcType: Cesium.ArcType.RHUMB,
                                                                material: Cesium.Color.BLUE,
                                                                depthFailMaterial: Cesium.Color.BLUE, 
                                                                show: true,
                                                               // classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                            },
                                                        });
                                                        viewer.entities.add({
                                                            id: data.id + "_LABEL",
                                                            position: new Cesium.Cartesian3(data.Centerx, data.Centery, data.Centerz),
                                                            point: {
                                                                pixelSize: 1,
                                                                color: Cesium.Color.BLUE
                                                            }
                                                        });

                                                    }
                                                    for (var i in data.children) {
                                                    
                                                        var entity = viewer.entities.getById(data.children[i].id);
                                                        if (entity == undefined) {
                                                            //viewer.entities.add({
                                                            //    id: data.children[i].id,
                                                            //    polygon: {
                                                            //        hierarchy: {
                                                            //            positions: data.children[i].pointList
                                                            //        },
                                                            //        material: Cesium.Color.RED.withAlpha(0.8),
                                                            //        classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                                                            //    }
                                                            //});
                                                            var points = data.children[i].pointList;
                                                           // points.push(points[0]);
                                                            viewer.entities.add({
                                                                id: data.children[i].id,
                                                                polyline: {
                                                                    positions: points,
                                                                    width: 1,
                                                                    //arcType: Cesium.ArcType.RHUMB,
                                                                    material: Cesium.Color.RED,
                                                                    depthFailMaterial: Cesium.Color.RED,
                                                                    show: true,
                                                                    //clampToGround: true,
                                                                },
                                                            });
                                                            console.log(data.children[i]);
                                                            viewer.entities.add({
                                                                id: data.children[i].id + "_LABEL",
                                                                position: new Cesium.Cartesian3(data.children[i].Centerx, data.children[i].Centery, data.children[i].Centerz),
                                                                point: {
                                                                    pixelSize: 1,
                                                                    color: Cesium.Color.RED.withAlpha(0.1)
                                                                }
                                                            });
                                                        }

                                                        data.children[i].checked = true;
                                                    }
                                                    data.checked = true;
                                                } else if (data.type == "FLZAREA") {
                                                

                                                    console.log(data);
                                                    //点击的线
                                                    //全选监测剖面
                                                    for (var i in data.children) {
                                                        var entity = viewer.entities.getById(data.children[i].id);
                                                        if (entity == undefined) {
                                                            var points = data.children[i].pointList;
                                                            points.push(points[0]);
                                                            viewer.entities.add({
                                                                id: data.children[i].id,
                                                                polyline: {
                                                                    positions: points,
                                                                    width: 3,
                                                                    //arcType: Cesium.ArcType.RHUMB,
                                                                    material: Cesium.Color.YELLOW,
                                                                
                                                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                                        color: Cesium.Color.YELLOW
                                                                    }),
                                                                
                                                                },
                                                            });
                                                            viewer.entities.add({
                                                                id: data.children[i].id + "_LABEL",
                                                                position: points[0],
                                                                label: {
                                                                    text: data.children[i].title,
                                                                    showBackground: true,
                                                                    backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                                    font: '14px Times New Roman',
                                                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                    pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                                }

                                                            });
                                                        }


                                                        data.children[i].checked = true;
                                                    }
                                                } else if (data.type == "DOMSTRPLA") {//优势结构面


                                                    console.log(data);
                                                    //点击的线
                                                    //全选优势结构面
                                                    for (var i in data.children) {
                                                        var entity = viewer.entities.getById(data.children[i].id);
                                                        if (entity == undefined) {
                                                        
                                                            viewer.entities.add({
                                                                id: data.children[i].id,
                                                                polygon: {
                                                                    hierarchy: {
                                                                        positions: data.children[i].pointList
                                                                    },
                                                                    classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                                                                    material: Cesium.Color.ORANGE.withAlpha(0.3),

                                                                    //depthFailMaterial: Cesium.Color.ORANGE.withAlpha(0.3),
                                                                }
                                                            });
                                                            viewer.entities.add({
                                                                id: data.children[i].id + "_LABEL",
                                                                position: new Cesium.Cartesian3(data.children[i].Centerx, data.children[i].Centery, data.children[i].Centerz),
                                                                point: {
                                                                    pixelSize: 1,
                                                                    color: Cesium.Color.ORANGE
                                                                }
                                                            });
                                                        }
                                                        data.children[i].checked = true;
                                                    }
                                                } else if (data.type == "XIEPUOFAT") {//斜坡  不能多选了


                                                    console.log(data);
                                                    //点击的线
                                                    //全选斜坡
                                                    for (var i in data.children) {
                                                        var entity = viewer.entities.getById(data.children[i].id);
                                                        var points = data.children[i].pointList;
                                                        if (entity == undefined) {
                                                            
                                                            viewer.entities.add({
                                                                id: data.children[i].id,
                                                                polyline: {
                                                                    positions: points,
                                                                    width: 3,
                                                                    material: Cesium.Color.RED,
                                                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                                        color: Cesium.Color.RED
                                                                    }),
                                                                    show: true,
                                                                    classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                                },
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
                                                    console.log(curtileset);
                                                    console.log(data);
                                                    var entity = viewer.entities.getById(data.id);
                                                    if (entity == undefined) {
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

                                                    var entitylabel = viewer.entities.getById(data.id + "_LABEL");
                                                    if (entitylabel == undefined) {
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

                                                    data.checked = true;
                                                }
                                                else if (data.type == "PROJECTSUMODEL") {
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
                                                    }
                                                    modleInfo = data;


                                                    //项目模型
                                                    var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                                                    if (modeljiazaiFlag) {
                                                        LoadModel(data);
                                                    }
                                               
                                                    layer.close(loadingceindex);
                                                    data.checked = true;
                                                }
                                                else if (data.type == "FLZJIELI") {
                                                    //节理
                                                    var entity = viewer.entities.getById(data.id);
                                                    if (entity == undefined) {
                                                        var points = data.pointList;
                                                        //points.push(points[0]);
                                                        viewer.entities.add({
                                                            id: data.id,
                                                            polyline: {
                                                                positions: points,
                                                                width: 1,
                                                                arcType: Cesium.ArcType.RHUMB,
                                                                material: Cesium.Color.RED,
                                                                depthFailMaterial: Cesium.Color.RED,
                                                                show: true,
                                                                //clampToGround: true,
                                                                //classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                            },
                                                        });

                                                        viewer.entities.add({
                                                            id: data.id + "_LABEL",
                                                            position: new Cesium.Cartesian3(data.Centerx, data.Centery, data.Centerz),
                                                            point: {
                                                                pixelSize: 1,
                                                                color: Cesium.Color.RED.withAlpha(0.1)
                                                            }
                                                        });
                                                    }
                                                    data.checked = true;
                                                    //看看把父亲也选中
                                                    for (var i in layers[0].children) {
                                                        for (var j in layers[0].children[i].children) {
                                                            if (data.id == layers[0].children[i].children[j].id) {
                                                                var entityFater = viewer.entities.getById(layers[0].children[i].id);
                                                                if (entityFater == undefined) {
                                                                    var points = layers[0].children[i].pointList;
                                                               
                                                                    points.push(points[0]);
                                                                    viewer.entities.add({
                                                                        id: layers[0].children[i].id,
                                                                        polyline: {
                                                                            positions: points,
                                                                            width: 0.5,
                                                                            arcType: Cesium.ArcType.RHUMB,
                                                                            material: Cesium.Color.BLUE,
                                                                            depthFailMaterial: Cesium.Color.BLUE,
                                                                            show: true,
                                                                        },
                                                                    });
                                                                    viewer.entities.add({
                                                                        id: layers[0].children[i].id + "_LABEL",
                                                                        position: new Cesium.Cartesian3(layers[0].children[i].Centerx, layers[0].children[i].Centery, layers[0].children[i].Centerz),
                                                                        point: {
                                                                            pixelSize: 1,
                                                                            color: Cesium.Color.BLUE
                                                                        }
                                                                    });
                                                                    layers[0].children[i].checked = true;
                                                                }


                                                                break;
                                                            }
                                                        }
                                                    }
                                                } else if (data.type == "YOUSHIMIAN") {
                                                    //优势结构面
                                                    var entity = viewer.entities.getById(data.id);
                                                    if (entity == undefined) {
                                                        var points = data.pointList;
                                                        var sum = 0;
                                                    
                                                        viewer.entities.add({
                                                            id: data.id,
                                                            polygon: {
                                                                hierarchy: {
                                                                    positions: points
                                                                },
                                                                material: Cesium.Color.ORANGE.withAlpha(0.5),
                                                             //   depthFailMaterial: Cesium.Color.ORANGE.withAlpha(0.3),
                                                                classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                                                            }
                                                        });

                                                        viewer.entities.add({
                                                            id: data.id + "_LABEL",
                                                            position: new Cesium.Cartesian3(data.Centerx, data.Centery, data.Centerz),
                                                            point: {
                                                                pixelSize: 1,
                                                                color: Cesium.Color.ORANGE
                                                            }
                                                        });
                                                    }
                                                    data.checked = true;
                                                    //看看把父亲也选中
                                                }
                                                else if (data.type == "BIANJIE") {
                                                    //消落带边界
                                                    console.log(data);
                                                    var entityFater = viewer.entities.getById(data.id);
                                                    var sum = 0;

                                                    if (entityFater == undefined) {
                                                        var points = data.pointList;
                                                        points.push(points[0]);
                                                        viewer.entities.add({
                                                            id: data.id,
                                                            polyline: {
                                                                positions: points,
                                                                width: 3,
                                                                //arcType: Cesium.ArcType.RHUMB,
                                                                material: Cesium.Color.YELLOW,
                                                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                                    color: Cesium.Color.YELLOW
                                                                }),
                                                                show: true,
                                                                //clampToGround: true,
                                                                classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                            },
                                                        });
                                                    

                                                    }
                                                    data.checked = true;
                                                }
                                                else if (data.type == "FLZPOINT") {
                                                    //监测点
                                                    var entity = viewer.entities.getById(data.id);
                                                    if (entity == undefined) {
                                                        //当无此元素添加
                                                        viewer.entities.add({
                                                            id: data.id,
                                                            position: data.postion ,//new Cesium.Cartesian3.fromDegrees(data.lbh.ls, data.lbh.bs, data.lbh.hs),
                                                            billboard: {
                                                            image: '../../Resources/img/map/marker.png',
                                                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                            width: 24,
                                                            height: 24,
                                                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                        }
                                                        });
                                                    }

                                                    var entitylabel = viewer.entities.getById(data.id + "_LABEL");
                                                    if (entitylabel == undefined) {
                                                        viewer.entities.add({
                                                            id: data.id + "_LABEL",
                                                            position: data.postion,
                                                               label: {
                                                                text: data.title,
                                                                showBackground: true,
                                                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                                font: '14px Times New Roman',
                                                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                pixelOffset: new Cesium.Cartesian2(0.0, -36),
                                                                disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                            }
                                                        });
                                                    }

                                                    data.checked = true;
                                                }
                                                else if (data.type == "FLZLINE") {
                                                    //点击的线
                                                    console.log(data);
                                                    var sum = 0;
                                                    var entity = viewer.entities.getById(data.id);
                                                    if (entity == undefined) {
                                                        var line = data.pointList;
                                                        for (var i = 0; i < line.length - 1; i++) {
                                                            var point1 = line[i];
                                                            var point2 = line[i+1];

                                                            var distance = Cesium.Cartesian3.distance(point1, point2)
                                                            if (distance == NaN) {
                                                                sum = 0;
                                                                break;
                                                            }
                                                            else {
                                                                sum += distance;
                                                            }
                                                        }
                                                  

                                                        var points = data.pointList;
                                                        viewer.entities.add({
                                                            id: data.id,
                                                            polyline: {
                                                                positions: points,
                                                                width: 1,
                                                                //arcType: Cesium.ArcType.RHUMB,
                                                                material: Cesium.Color.YELLOW,
                                                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                                    color: Cesium.Color.YELLOW
                                                                }),//深度检测失败，用什么显示
                                                                //show: true,
                                                                //clampToGround: true,
                                                                //classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                            },
                                                        });

                                                        viewer.entities.add({
                                                            id: data.id + "_LABEL",
                                                            position: points[0],
                                                            label: {
                                                                text: data.title + '-长度：' + sum.toFixed(2) + '米',
                                                                showBackground: true,
                                                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                                font: '14px Times New Roman',
                                                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                                disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                            }
                                                        });
                                                    

                                                    }

                                                    data.checked = true;
                                                } else if (data.type == "FLZAREA") {
                                                
                                                    console.log(data);
                                                    //点击的线
                                                    var entity = viewer.entities.getById(data.id);
                                                    if (entity == undefined) {
                                                        var points = data.pointList;
                                                        points.push(points[0]);
                                                        viewer.entities.add({
                                                            id: data.id,
                                                            polyline: {
                                                                positions: points,
                                                                width: 2,
                                                                //arcType: Cesium.ArcType.RHUMB,
                                                                material: Cesium.Color.RED,
                                                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                                    color: Cesium.Color.RED
                                                                })
                                                           
                                                            },
                                                        });
                                                        viewer.entities.add({
                                                            id: data.id + "_LABEL",
                                                            position: points[0],
                                                            label: {
                                                                text: data.title,
                                                                showBackground: true,
                                                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                                font: '14px Times New Roman',
                                                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                                disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                            }
                                                        });   
                                                    //data.checked = true;

                                                        //viewer.entities.add({
                                                        //    id: data.id,
                                                        //    polygon: {
                                                        //        hierarchy: {
                                                        //            positions: points
                                                        //        },
                                                        //        material: Cesium.Color.YELLOW.withAlpha(0.3),
                                                        //        classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                                                        //    }
                                                        //});

                                                        //计算面积
                                                        //var cartesian2s = [];
                                                        //for (var i = 0; i < newcartesian3s.length; i++) {
                                                        //    var cartesian3 = Cesium.Cartesian3.fromDegrees(newcartesian3s[i].y, newcartesian3s[i].x, maxHeight);
                                                        //    var cartesian2 = new Cesium.Cartesian2(cartesian3.x, cartesian3.y);
                                                        //    cartesian2s.push(cartesian2);
                                                        //}
                                                        //cartesian2s.push(cartesian2s[0]);
                                                        //var area = 0;
                                                        //for (var i = 0; i < cartesian2s.length - 1; i++) {
                                                        //    area += (cartesian2s[i].x - cartesian2s[0].x) * (cartesian2s[i + 1].y - cartesian2s[0].y) - (cartesian2s[i].y - cartesian2s[0].y) * (cartesian2s[i + 1].x - cartesian2s[0].x);
                                                        //}
                                                        //area = Math.abs(area);

                                                        //计算重心
                                                        //viewer.entities.add({
                                                        //    id: data.id + "_LABEL",
                                                        //    position: Cesium.Cartesian3.fromDegrees(lSum / points.length, bSum / points.length, maxHeight + 1),
                                                        //    label: {
                                                        //        text: data.title + '面积：' + area.toFixed(2) + '平方米',
                                                        //        showBackground: true,
                                                        //        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                        //        font: '24px Times New Roman',
                                                        //        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                        //        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                        //        pixelOffset: new Cesium.Cartesian2(0.0, -10),
                                                        //    }
                                                        //});
                                                  

                                                    }

                                                    data.checked = true;
                                                } else if (data.type == "XIEPUO") {
                                                    
                                                    console.log(data);

                                                    for (var i in layers) {
                                                        if (layers[i].type == "XIEPUOFAT") {
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


                                                    if (xiePuoinfo != null && data.id != xiePuoinfo.id) {
                                                        viewer.entities.removeById(xiePuoinfo.id);
                                                        xiePuoinfo = data;
                                                        modeljiazaiFlag = false;
                                                        tree.reload('prjlayerlistid', { data: layers });
                                                        ClearTemp();
                                                    }
                                                    xiePuoinfo = data;
                                                    var entityFater = viewer.entities.getById(data.id);

                                                    if (entityFater == undefined) {
                                                        var points = data.pointList;
                                                        viewer.entities.add({
                                                            id: data.id,
                                                            polyline: {
                                                                positions: points,
                                                                width: 3,
                                                                material: Cesium.Color.RED,
                                                                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                                    color: Cesium.Color.RED
                                                                }),
                                                                show: true,
                                                                classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                            },
                                                        });

                                                    }
                                                    viewer.zoomTo(viewer.entities.getById(data.id));
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
                                                if (data.type == "FLZWINDOW") {//特殊情况测传
                                                    viewer.entities.removeById(data.id);
                                                    viewer.entities.removeById(data.id + "_LABEL");
                                                }
                                                data.checked = false;
                                            }
                                            else {
                                                if (data.type == "PROJECTSUMODEL" || data.type == "DISASTERSURMODEL" ) {
                                               
                                                    if (modleInfo.id == data.id) {
                                                        viewer.scene.primitives.remove(curtileset);
                                                        curtileset = null;
                                                        modleInfo = null;
                                                    }
                                                   
                                                    
                                                } else if (data.type == "XIEPUO") {
                                                    if (xiePuoinfo.id == data.id) {
                                                        xiePuoinfo = null;
                                                        viewer.entities.removeById(data.id);
                                                    }
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
                                        var type = obj.type; //得到操作类型：add、edit、del
                                        var data = obj.data; //得到当前节点的数据
                                        var elem = obj.elem; //得到当前节点元素

                                        var id = data.id;
                                        var name = data.title;
                                        console.log(obj);
                                        if (type === 'add') { //增加节点，查看
                                            DrwInfo(obj, "view");
                                            return;
                                        } else if (type === 'update') { //修改节点
                                            DrwInfo(obj, "update");
                                        } else if (type === 'del') { //删除节点
                                            if (data.type == "FLZWINDOW") {//删除测窗
                                                $.ajax({
                                                    url: servicesurl + "/api/FlzWindowInfo/DeleteFlzWindow", type: "delete", data: { "id": obj.data.id.split("_")[1], "cookie": document.cookie },
                                                    success: function (result) {
                                                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });


                                                        viewer.entities.removeById(obj.data.id);
                                                        viewer.entities.removeById(obj.data.id + "_LABEL");
                                                        for (var i in layers[0].children) {
                                                            if (obj.data.id == layers[0].children[i].id) {
                                                                layers[0].children.splice(i, 1);
                                                                break;
                                                            }

                                                        }
                                                        modeljiazaiFlag = false;
                                                        tree.reload('prjlayerlistid', { data: layers });
                                                        ClearTemp();
                                                        for (var m in windowInfoList) {
                                                            if (("FLZWINDOW_" + windowInfoList[m].id) == obj.data.id) {
                                                                windowInfoList.splice(m, 1);
                                                            }
                                                        }


                                                    }, datatype: "json"
                                                });
                                            } else if (data.type == "BIANJIE") {//删除边界范围
                                                var temp = {};
                                                temp.id = currentprojectid;
                                                temp.cookie = document.cookie;
                                                temp.flzRange = null;
                                                var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                                                $.ajax({
                                                    url: servicesurl + "/api/FLZ/UpdateProject", type: "put", data: temp,
                                                    success: function (result) {
                                                        layer.close(loadinglayerindex);
                                                        if (result == "更新成功！") {
                                                            layer.msg("删除成功", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                        
                                                            for (var i in layers ) {
                                                                if (layers[i].type == "BIANJIE") {
                                                                    layers.splice(i, 1);
                                                                    break;
                                                                }
                                                            }
                                                            console.log(layers);
                                                            viewer.entities.removeById(data.id);
                                                            modeljiazaiFlag = false;
                                                            tree.reload('prjlayerlistid', { data: layers });
                                                            ClearTemp();
                                                        } else {
                                                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                        }
                                                    }, datatype: "json"
                                                });
                                            } else if (data.type == "XIEPUO") {//删除斜坡范围，也是删除斜坡
                                                var temp = {};
                                                temp.id = data.datas.id;
                                                temp.cookie = document.cookie;
                                                var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                                                $.ajax({
                                                    url: servicesurl + "/api/FlzWindowInfo/DeleteFlzSteepHill", type: "delete", data: temp,
                                                    success: function (result) {
                                                        layer.close(loadinglayerindex);
                                                        if (result == "删除成功") {
                                                            layer.msg("删除成功", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                                            for (var i in layers) {
                                                                if (layers[i].type == "XIEPUOFAT") {
                                                                    for (var j in layers[i].children) {
                                                                        if (layers[i].children[j].id == obj.data.id) {
                                                                            layers[i].children.splice(j, 1);
                                                                            break;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            viewer.entities.removeById(data.id);
                                                            modeljiazaiFlag = false;
                                                            tree.reload('prjlayerlistid', { data: layers });
                                                            ClearTemp();
                                                        } else {
                                                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                        }
                                                    }, datatype: "json"
                                                });
                                            } else if (data.type == "PROJECTSUMODEL") {//删除斜坡范围，也是删除斜坡
                                               $.ajax({
                                                        url: servicesurl + "/api/ModelProject/CancelUserModelProjectUse", type: "delete", data: { "syscode": 4, "useprojectid": currentprojectid, "modelid": obj.data.data.Id, "cookie": document.cookie },
                                                        success: function (result) {
                                                            var info = JSON.parse(result);
                                                            if (info.code == 1) {
                                                                
                                                                //TODO删除的为选中加载的模型时需从地图的删除
                                                                var child = [];
                                                                modeltabledata = [];
                                                                for (var i in layers) {
                                                                    if (layers[i].type == "SANWEI") {
                                                                        for (var j in layers[i].children) {
                                                                            if (layers[i].children[j].id != obj.data.id) {
                                                                                child.push(layers[i].children[j]);
                                                                                var model = new Object;
                                                                                model.id = layers[i].children[j].data.Id;
                                                                                model.mxmc = layers[i].children[j].data.RWMC;
                                                                                model.mxbm = layers[i].children[j].data.RWBM;
                                                                                model.mxsj = layers[i].children[j].data.YXCJSJ;
                                                                                model.bz = layers[i].children[j].data.BZ;
                                                                                modeltabledata.push(model);
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
                                                                if (modeledittable!=null) {
                                                                    modeledittable.reload({ id: 'uavprojectmodeltableid', data: modeltabledata });
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
                                             }else {
                                                $.ajax({
                                                    url: servicesurl + "/api/FlzData/DeleteFlzPoint", type: "delete", data: { "id": obj.data.id.split("_")[1], "cookie": document.cookie },
                                                    success: function (result) {
                                                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                        viewer.entities.removeById(obj.data.id);
                                                        viewer.entities.removeById(obj.data.id + "_LABEL");
                                                        console.log(layers);
                                                        if (data.type == "FLZJIELI" || data.type == "YOUSHIMIAN") {
                                                            for (var i in layers[0].children) {
                                                                for (var j in layers[0].children[i].children) {
                                                                    if (obj.data.id == layers[0].children[i].children[j].id) {
                                                                        layers[0].children[i].children.splice(j, 1);

                                                                        break;
                                                                    }
                                                                }
                                                            }
                                                        }  else{//点数据成图
                                                            for (var i in layers[layers.length-1].children) {
                                                                for (var j in layers[layers.length - 1].children[i].children) {
                                                                    if (obj.data.id == layers[layers.length - 1].children[i].children[j].id) {
                                                                        layers[layers.length - 1].children[i].children.splice(j,1);
                                                                        break;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    
                                                        modeljiazaiFlag = false;
                                                        tree.reload('prjlayerlistid', { data: layers });
                                                        ClearTemp();
                                                    }, datatype: "json"
                                                });
                                            }
                                        

                                        };
                                    }
                                });

                                }
                        

                    }

                }, datatype: "json"
            });

       //}

    }

}