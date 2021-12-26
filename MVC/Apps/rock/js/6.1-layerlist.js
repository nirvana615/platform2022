var layers = [];//图层列表数据
var windowInfoList = [];//测区数据
var modleInfoList = [];//模型数据
var modeljiazaiFlag = true;
//图层列表widget
function LoadLayerListLayer(id) {
    if (id == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
    }
    else {
       // if (projectlayerlistlayerindex == null) {
        var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

            //请求图层列表
            $.ajax({
                url: servicesurl + "/api/RockLayer/GetLayerInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                success: function (data) {

                    layer.close(loadingceindex);
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
                            projectlayer.title = layerlist.ProjectLayer.Title;

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
                                    console.log(layerlist.FlzDataLayer.FlzWindowInfoList[i]);
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

                            if (layerlist.ProjectLayer.SurModels != null) {
                                var prjsurmodel = new Object;
                                prjsurmodel.title = layerlist.ProjectLayer.SurModels.Title;
                                var prjsurmodelchild = [];
                                modleInfoList = layerlist.ProjectLayer.SurModels.SurModelList;//把模型的值存起来
                                for (var i in layerlist.ProjectLayer.SurModels.SurModelList) {
                                    var surmodel = new Object;
                                  //  surmodel.title = layerlist.ProjectLayer.SurModels.SurModelList[i].MXSJ + layerlist.ProjectLayer.SurModels.SurModelList[i].MXMC;
                                    surmodel.title = layerlist.ProjectLayer.SurModels.SurModelList[i].MXMC;
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
                            bianjie.title = "边界范围";
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
                        
                        //斜坡体
                        if (layerlist.ProjectLayer != null && false) {
                            var bianjie = new Object;
                            bianjie.title = "边界范围";
                            bianjie.type = "BIANJIE";
                            bianjie.id = "BIANJIE" + id;
                            bianjie.pointList = GeoJSON;
                            bianjie.showCheckbox = true;//显示复选框

                            var entity = viewer.entities.getById(xiepoti.id);
                            if (entity != undefined) {
                                xiepoti.checked = true;
                                xiepoti.spread = true;
                            }
                            else {
                                xiepoti.checked = false;
                            }
                            xiepoti.showCheckbox = true;//显示复选框
                            layers.push(xiepoti);
                        }

                
                        //监测图层（监测点、监测剖面）
                        if (layerlist.FlzDataLayer != null && layerlist.FlzDataLayer.FlzDataList!=null) {
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
                                flzpointlayer.title = "点数据";
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
                                flzlinelayer.title = "长度标注";
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
                                flznoodleslayer.title = "范围标注";
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
                        

                        //TODO MORE LAYER

                        console.log(layers);
                        var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                        $.ajax({
                            url: window.parent.servicesurl + "/api/RockDesign/GetRockDesignListInfo", type: "get", data: { "cookie": document.cookie, "projectId": id },
                            success: function (data) {
                                layer.close(loadingceindex);
                                if (data == "") {
                                    //layer.msg("无陡崖用户信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    // curuserid = null;
                                }
                                else {
                                    console.log(data);
                                    var designList = JSON.parse(data);
                                    var rockDesignDataLayer = new Object;
                                    rockDesignDataLayer.title = "设计数据";
                                    rockDesignDataLayer.type = "DESIGN";
                                    rockDesignDataLayer.showCheckbox = true;//显示复选框
                                    var rockDesignDataLayerchild = [];
                                    var tempList = [];
                                    for (i = 0; i < designList.length; i++) {
                                        var rockSectionDataLayer = new Object;
                                        rockSectionDataLayer.title = "剖面-" + designList[i].name;
                                        rockSectionDataLayer.name =designList[i].name;
                                        rockSectionDataLayer.type = "SECTION";
                                        rockSectionDataLayer.id = designList[i].id;
                                        rockSectionDataLayer.showCheckbox = true;//显示复选框
                                       var x = JSON.parse(designList[i].profilePostion);
                                     //var y =  JSON.parse(designList[i].measurWindowPostion);
                                     //   var xx =  JSON.parse(designList[i].probeSlotPostion);
                                     //   var xxx = JSON.parse(designList[i].drillHolePostion);
                                        //console.log(xx);
                                        //console.log(xxx);
                                        //console.log(y);
                                        var rockSectionDataLayerchild = [];
                                        //剖面
                                        if (designList[i].profilePostion != "") {
                                            var pointListtem = JSON.parse(designList[i].profilePostion);
                                            var profilelayer = new Object;
                                            profilelayer.data = pointListtem
                                            profilelayer.title = pointListtem.name;
                                            profilelayer.type = "PROFILE";
                                            profilelayer.checked = false;
                                            profilelayer.showCheckbox = true;//显示复选框
                                            profilelayer.id = "PROFILE" + designList[i].id;
                                            profilelayer.remark = designList[i].remark;
                                            profilelayer.lineId = designList[i].id;
                                            rockSectionDataLayerchild.push(profilelayer);
                                        }
                                        //测窗
                                        if (designList[i].measurWindowPostion != "") {

                                            var pointListtem = JSON.parse(designList[i].measurWindowPostion);
                                            for (var m = 0; m < pointListtem.length; m++) {
                                                var profilelayer = new Object;
                                                profilelayer.data = pointListtem[m];
                                                profilelayer.list = pointListtem;
                                                profilelayer.title = pointListtem[m].name;
                                                profilelayer.type = "MENSURE";
                                                profilelayer.checked = false;
                                                profilelayer.showCheckbox = true;//显示复选框
                                                profilelayer.id = "MENSURE" + pointListtem[m].code + designList[i].id;
                                                profilelayer.remark = designList[i].remark;
                                                profilelayer.lineId = designList[i].id;
                                                rockSectionDataLayerchild.push(profilelayer);
                                                //var tempset = {};
                                                //tempset.name = pointListtem[m].name;
                                                //var remplistary = [];
                                                //for (var x = 0; x < 4; x++) {
                                                //    console.log(pointListtem[m].position[x].B);
                                                //    console.log(pointListtem[m].position[x].L);
                                                //    var cartesian3 = Cesium.Cartographic.fromCartesian(Cesium.Cartesian3.fromDegrees(pointListtem[m].position[x].L, pointListtem[m].position[x].B, pointListtem[m].position[x].H));    
                                                //    var xy = bl2xy(cartesian3.latitude * 180 / Math.PI, cartesian3.longitude * 180 / Math.PI, 6378137.0, 1 / 298.257223563, 3, 108, false);
                                                   
                                                //    var xyz = {};
                                                //    xyz.X = (xy.x).toFixed(3);
                                                //    xyz.Y = (xy.y).toFixed(3);
                                                //    xyz.Z = (pointListtem[m].position[x].H+31.8).toFixed(3);
                                                //    remplistary.push(xyz);
                                                //}
                                                //tempset.xyz = remplistary;
                                                //tempList.push(tempset); 
                                            }
                                            
                                        }
                                  
                                        ////探槽con
                                        if (designList[i].probeSlotPostion != "") {
                                            var pointListtem = JSON.parse(designList[i].probeSlotPostion);
                                            var profileinfo = JSON.parse(designList[i].profilePostion);
                                           
                                            var profilelayer = new Object;
                                            // 把剖面数据翻进去
                                            profilelayer.data = pointListtem;
                                            profilelayer.profileinfo = profileinfo;
                                            profilelayer.title = pointListtem.name;
                                            profilelayer.type = "PROBESLOT";
                                            profilelayer.checked = false;
                                            profilelayer.showCheckbox = true;//显示复选框
                                            profilelayer.id = "PROBESLOT" + designList[i].id;
                                            profilelayer.remark = designList[i].remark;
                                            profilelayer.pointId = designList[i].id;
                                            rockSectionDataLayerchild.push(profilelayer);

                                            //var tempset = {};
                                            //tempset.name = pointListtem.name;
                                            //    var remplistary = [];
                                            //    for (var x = 0; x < 4; x++) {
                                            //        var cartesian3 = Cesium.Cartographic.fromCartesian(Cesium.Cartesian3.fromDegrees(pointListtem.position[x].L, pointListtem.position[x].B, pointListtem.position[x].H));    
                                            //        var xy = bl2xy(cartesian3.latitude * 180 / Math.PI, cartesian3.longitude * 180 / Math.PI, 6378137.0, 1 / 298.257223563, 3, 108, false);

                                            //        var xyz = {};
                                            //        xyz.X = (xy.x).toFixed(3);
                                            //        xyz.Y = (xy.y).toFixed(3);
                                            //        xyz.Z = (pointListtem.position[x].H+31.80).toFixed(3);
                                            //        remplistary.push(xyz);
                                            //    }
                                            //    tempset.xyz = remplistary;
                                            //    tempList.push(tempset); 

                                        }
                                        //钻孔
                                        if (designList[i].drillHolePostion != "") {
                                            var pointListtem = JSON.parse(designList[i].drillHolePostion);
                                            var profilelayer = new Object;
                                            profilelayer.data = pointListtem;
                                            profilelayer.title = pointListtem.name;
                                            profilelayer.type = "DRILLHOLE";
                                            profilelayer.checked = false;
                                            profilelayer.showCheckbox = true;//显示复选框
                                            profilelayer.id = "DRILLHOLE" + designList[i].id;
                                            profilelayer.remark = designList[i].remark;
                                            profilelayer.pointId = designList[i].id;
                                            rockSectionDataLayerchild.push(profilelayer);
                                        }
                                        rockSectionDataLayer.children = rockSectionDataLayerchild;
                                        rockDesignDataLayerchild.push(rockSectionDataLayer);
                                    }
                                    console.log(tempList);
                                    rockDesignDataLayer.children = rockDesignDataLayerchild;
                                    layers.push(rockDesignDataLayer);
                                    if (id!=37) {//箱子岩不显示设计数据
                                        var rockLiChengDataLayer = new Object;
                                        rockLiChengDataLayer.title = "长江里程";
                                        rockLiChengDataLayer.type = "LICHENG";
                                        rockLiChengDataLayer.showCheckbox = true;//显示复选框
                                        layers.push(rockLiChengDataLayer);
                                    }
                                    
                                }

                                
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
                                            console.log(data);
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
                                                        viewer.zoomTo(viewer.entities.getById(data.id + "_LABEL"), new Cesium.HeadingPitchRange(Cesium.Math.toRadians(data.datas.inclination - 180), Cesium.Math.toRadians(data.datas.dipAngle - 90), 40));
                                                    } else if (data.type == "PROJECTSUMODEL") {// || data.type == "YOUSHIMIAN"
                                                        if (curtileset != null) {
                                                            if (data.modelView != null && data.modelView.length > 0) {
                                                                var home = JSON.parse(data.modelView);
                                                                viewer.scene.camera.setView(home);
                                                            } else {
                                                                viewer.zoomTo(curtileset);
                                                            }
                                                        }

                                                    } else {
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
                                                                        font: '16px Times New Roman',
                                                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                        pixelOffset: new Cesium.Cartesian2(0.0, -36),
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
                                                                        font: '20px Times New Roman',
                                                                        material: Cesium.Color.YELLOW,
                                                                        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                                            color: Cesium.Color.YELLOW
                                                                        }),
                                                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                        pixelOffset: new Cesium.Cartesian2(0.0, -60),
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
                                                                //points.push(points[0]);
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
                                                                        //show: true,
                                                                        //clampToGround: true,
                                                                        //classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                                    },
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
                                                    } else if (data.type == "SECTION") {//全选的剖面单元


                                                        console.log(data);
                                                        //点击的线
                                                        //全选优势结构面
                                                        for (var i in data.children) {
                                                            var entity = viewer.entities.getById(data.children[i].id);
                                                            if (entity == undefined) {

                                                                if (data.children[i].type == "PROFILE") {//剖面的线
                                                                //点击的线
                                                                console.log(data);
                                                                var sum = 0;
                                                                var entity = viewer.entities.getById(data.children[i].id);

                                                                    if (entity == undefined) {
                                                                        //消落带，箱子岩
                                                                        if (data.children[i].data.startPoint != null) {
                                                                            //viewer.entities.add({
                                                                            //    id: data.children[i].id,
                                                                            //    wall: {
                                                                            //        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                                                                            //            data.children[i].data.startPoint.L,
                                                                            //            data.children[i].data.startPoint.B,
                                                                            //            180,
                                                                            //            data.children[i].data.endPoint.L,
                                                                            //            data.children[i].data.endPoint.B,
                                                                            //            180,
                                                                            //        ]),
                                                                            //        minimumHeights: [100, 100],
                                                                            //        material: Cesium.Color.YELLOW.withAlpha(0.3),//
                                                                            //    },
                                                                            //});
                                                                            var pointList = [];
                                                                            
                                                                            pointList.push(new Cesium.Cartesian3.fromDegrees(data.children[i].data.startPoint.L, data.children[i].data.startPoint.B, 160));
                                                                            pointList.push(new Cesium.Cartesian3.fromDegrees(data.children[i].data.endPoint.L, data.children[i].data.endPoint.B, 160));
                                                                           
                                                                            viewer.entities.add({
                                                                                id: data.children[i].id,
                                                                                polyline: {
                                                                                    positions: pointList,
                                                                                    width: 2,
                                                                                    material: Cesium.Color.fromCssColorString('#09f4f7'),
                                                                                    show: true,
                                                                                    clampToGround: true,
                                                                                    classificationType: Cesium.ClassificationType.BOTH,
                                                                                }
                                                                            });


                                                                            viewer.entities.add({
                                                                                id: data.children[i].id + "_LABEL",
                                                                                position: Cesium.Cartesian3.fromDegrees(data.children[i].data.startPoint.L, data.children[i].data.startPoint.B, 180),
                                                                                label: {
                                                                                    text: data.children[i].title,
                                                                                    font: '16px Times New Roman',
                                                                                    showBackground: true,
                                                                                    backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                                    pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                                                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                                                }
                                                                            });
                                                                        } else {//箱子岩
                                                                            console.log(data.children[i].data.PointList);
                                                                            var tempList = data.children[i].data.PointList;
                                                                            var pointList = [];
                                                                            for (var m in tempList) {
                                                                                pointList.push(new Cesium.Cartesian3.fromDegrees(tempList[m].L, tempList[m].B, tempList[m].H));
                                                                            }

                                                                            viewer.entities.add({
                                                                                id: data.children[i].id + "tieMo",
                                                                                polyline: {
                                                                                    positions: pointList,
                                                                                    width: 1,
                                                                                    material: Cesium.Color.fromCssColorString('#09f4f7'),
                                                                                    show: true,
                                                                                    clampToGround: true,
                                                                                    classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                                                }
                                                                            });

                                                                            var LBlist = [];
                                                                            var maximumHeights = [];
                                                                            var minimumHeigh = [];
                                                                            for (var m in tempList) {
                                                                                LBlist.push(tempList[m].L);
                                                                                LBlist.push(tempList[m].B);
                                                                                maximumHeights.push(1300);
                                                                                minimumHeigh.push(500);
                                                                            }
                                                                            viewer.entities.add({
                                                                                id: data.children[i].id,
                                                                                wall: {
                                                                                    positions: Cesium.Cartesian3.fromDegreesArray(LBlist),
                                                                                    maximumHeights: maximumHeights,
                                                                                    minimumHeights: minimumHeigh,
                                                                                    material: Cesium.Color.YELLOW.withAlpha(0.3),//
                                                                                },
                                                                            });
                                                                            viewer.entities.add({
                                                                                id: data.children[i].id + "_LABEL",
                                                                                position: Cesium.Cartesian3.fromDegrees(data.children[i].data.PointList[0].L, data.children[i].data.PointList[0].B, 1300),
                                                                                label: {
                                                                                    text: data.children[i].title,
                                                                                    font: '16px Times New Roman',
                                                                                    showBackground: true,
                                                                                    backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                                    pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                                                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                                                }
                                                                            });
                                                                        }
                                                                    


                                                                }

                                                                    data.children[i].checked = true;
                                                                } else if (data.children[i].type == "MENSURE") {//测窗 
                                                                    //点击测窗
                                                                    console.log(data);
                                                                    var entity = viewer.entities.getById(data.children[i].id);
                                                                    var pointsList = data.children[i].data.position;

                                                                    if (pointsList[0].H > 0) {//这是修改了的测窗
                                                                        //修改后就改成直连线。
                                                                        if (entity == undefined) {

                                                                            var pointList = [];
                                                                            for (var m in pointsList) {
                                                                                pointList.push(new Cesium.Cartesian3.fromDegrees(pointsList[m].L, pointsList[m].B, pointsList[m].H));
                                                                            }
                                                                            console.log(pointList);
                                                                            viewer.entities.add({
                                                                                id: data.children[i].id,
                                                                                polyline: {
                                                                                    positions: pointList,
                                                                                    width: 1,
                                                                                    material: Cesium.Color.RED,
                                                                                    //depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                                                    //    color: Cesium.Color.RED
                                                                                    //}),
                                                                                    show: true,
                                                                                    clampToGround: true,
                                                                                    classificationType: Cesium.ClassificationType.BOTH,
                                                                                }
                                                                            });

                                                                        }

                                                                        data.children[i].checked = true;
                                                                    } else {
                                                                        if (entity == undefined) {
                                                                            var pointList = [];
                                                                            for (var m in pointsList) {
                                                                                pointList.push(new Cesium.Cartesian3.fromDegrees(pointsList[m].L, pointsList[m].B, pointsList[m].H));
                                                                            }
                                                                            console.log(pointList);
                                                                            viewer.entities.add({
                                                                                id: data.children[i].id,
                                                                                polyline: {
                                                                                    positions: pointList,
                                                                                    width: 1,
                                                                                    material: Cesium.Color.RED,
                                                                                    //depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                                                    //    color: Cesium.Color.fromCssColorString('#09f654')
                                                                                    //}),
                                                                                    show: true,
                                                                                    clampToGround: true,
                                                                                    classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                                                }
                                                                            });

                                                                        }

                                                                        data.children[i].checked = true;
                                                                    }




                                                                } else if (data.children[i].type == "PROBESLOT") {//探槽
                                                                    //点击测窗
                                                                    console.log(data);
                                                                    var entity = viewer.entities.getById(data.children[i].id);
                                                                    var pointsList = data.children[i].data.position;
                                                                    if (pointsList[0].H > 0) {//修改后，重新存
                                                                        if (entity == undefined) {

                                                                            var pointList = [];
                                                                            for (var m in pointsList) {
                                                                                pointList.push(new Cesium.Cartesian3.fromDegrees(pointsList[m].L, pointsList[m].B, pointsList[m].H));
                                                                            }

                                                                            viewer.entities.add({
                                                                                id: data.children[i].id,
                                                                                polyline: {
                                                                                    positions: pointList,
                                                                                    width: 1,
                                                                                    material: Cesium.Color.fromCssColorString('#09f4f7'),
                                                                                    show: true,
                                                                                    clampToGround: true,
                                                                                    classificationType: Cesium.ClassificationType.BOTH,
                                                                                }
                                                                            });

                                                                        }

                                                                        data.children[i].checked = true;
                                                                    } else {//未修改前贴膜线
                                                                        if (entity == undefined) {

                                                                            var pointList = [];
                                                                            for (var m in pointsList) {
                                                                                pointList.push(new Cesium.Cartesian3.fromDegrees(pointsList[m].L, pointsList[m].B, pointsList[m].H));
                                                                            }

                                                                            viewer.entities.add({
                                                                                id: data.children[i].id,
                                                                                polyline: {
                                                                                    positions: pointList,
                                                                                    width: 1,
                                                                                    material: Cesium.Color.fromCssColorString('#09f4f7'),
                                                                                    show: true,
                                                                                    clampToGround: true,
                                                                                    classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                                                }
                                                                            });

                                                                        }

                                                                        data.children[i].checked = true;
                                                                    }



                                                                } else if (data.children[i].type == "DRILLHOLE") {//钻孔
                                                                    console.log(data);
                                                                    var entity = viewer.entities.getById(data.children[i].id);
                                                                    if (entity == undefined) {
                                                                        //当无此元素添加 (new Cesium.Cartesian3.fromDegrees(pointsList[i].L, pointsList[i].B, pointsList.H)
                                                                        if (data.children[i].data.position.H > 0) {
                                                                            viewer.entities.add({
                                                                                id: data.children[i].id,
                                                                                position: new Cesium.Cartesian3.fromDegrees(data.children[i].data.position.L, data.children[i].data.position.B, data.children[i].data.position.H),
                                                                                billboard: {
                                                                                    image: '../../Resources/img/map/drillhole.png',
                                                                                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                                                    width: 32,
                                                                                    height: 32,
                                                                                    disableDepthTestDistance: Number.POSITIVE_INFINITY,

                                                                                }
                                                                            });
                                                                            //var entitylabel = viewer.entities.getById(data.children[i].id + "_LABEL");
                                                                            //if (entitylabel == undefined) {
                                                                            //    viewer.entities.add({
                                                                            //        id: data.children[i].id + "_LABEL",
                                                                            //        position: data.children[i].data.position,
                                                                            //        label: {
                                                                            //            text: data.children[i].title,
                                                                            //            font: '16px Times New Roman',
                                                                            //            showBackground: true,
                                                                            //            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                                            //            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                            //            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                            //            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                                            //            disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                                            //        }
                                                                            //    });
                                                                            //}
                                                                        } else {
                                                                            var postions = new Cesium.Cartographic(Math.PI / 180 * data.children[i].data.position.L, Math.PI / 180 * data.children[i].data.position.B);
                                                                            var Heights = viewer.scene.sampleHeight(postions);
                                                                            console.log(Heights);
                                                                            viewer.entities.add({
                                                                                id: data.children[i].id,
                                                                                position: new Cesium.Cartesian3.fromDegrees(data.children[i].data.position.L, data.children[i].data.position.B, Heights),
                                                                                billboard: {
                                                                                    image: '../../Resources/img/map/marker.png',
                                                                                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                                                    width: 24,
                                                                                    height: 24,
                                                                                    disableDepthTestDistance: Number.POSITIVE_INFINITY,

                                                                                }
                                                                            });
                                                                        }

                                                                    }



                                                                    data.children[i].checked = true;
                                                                }
                                                            }
                                                            data.children[i].checked = true;
                                                        }
                                                    } else if (data.type == "DESIGN") {//全选的设计数据


                                                        console.log(data);
                                                        //点击的线
                                                        //全选优势结构面
                                                        for (var i in data.children) {
                                                            for (var j in data.children[i].children) {
                                                                var entity = viewer.entities.getById(data.children[i].children[j].id);
                                                                if (entity == undefined) {
                                                                    if (data.children[i].children[j].type == "PROFILE") {//剖面的线
                                                                        //点击的线
                                                                        console.log(data);
                                                                        var sum = 0;
                                                                        var entity = viewer.entities.getById(data.children[i].children[j].id);

                                                                        if (entity == undefined) {//
                                                                            if (data.children[i].children[j].data.startPoint != null) {
                                                                                //viewer.entities.add({
                                                                                //    id: data.children[i].children[j].id,
                                                                                //    wall: {
                                                                                //        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                                                                                //            data.children[i].children[j].data.startPoint.L,
                                                                                //            data.children[i].children[j].data.startPoint.B,
                                                                                //            180,
                                                                                //            data.children[i].children[j].data.endPoint.L,
                                                                                //            data.children[i].children[j].data.endPoint.B,
                                                                                //            180,
                                                                                //        ]),
                                                                                //        minimumHeights: [100, 100],
                                                                                //        material: Cesium.Color.YELLOW.withAlpha(0.3),//
                                                                                //        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 2000)
                                                                                //    },
                                                                                //});
                                                                                var pointList = [];

                                                                                pointList.push(new Cesium.Cartesian3.fromDegrees(data.children[i].children[j].data.startPoint.L, data.children[i].children[j].data.startPoint.B, 160));
                                                                                pointList.push(new Cesium.Cartesian3.fromDegrees(data.children[i].children[j].data.endPoint.L, data.children[i].children[j].data.endPoint.B, 160));

                                                                                viewer.entities.add({
                                                                                    id: data.children[i].children[j].id,
                                                                                    polyline: {
                                                                                        positions: pointList,
                                                                                        width: 1,
                                                                                       
                                                                                        material: Cesium.Color.fromCssColorString('#09f4f7'),
                                                                                        show: true,
                                                                                        clampToGround: true,
                                                                                        classificationType: Cesium.ClassificationType.BOTH,
                                                                                    }
                                                                                });
                                                                                viewer.entities.add({
                                                                                    id: data.children[i].children[j].id + "_LABEL",
                                                                                    position: Cesium.Cartesian3.fromDegrees(data.children[i].children[j].data.startPoint.L, data.children[i].children[j].data.startPoint.B, 180),
                                                                                    label: {
                                                                                        text: data.children[i].children[j].title,
                                                                                        font: '16px Times New Roman',
                                                                                        showBackground: true,
                                                                                        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                                        pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                                                        disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                                                                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 2000)
                                                                                    }
                                                                                });
                                                                            } else {
                                                                                console.log(data.children[i].children[j].data.PointList);
                                                                                var tempList = data.children[i].children[j].data.PointList;

                                                                                var pointList = [];
                                                                                for (var m in tempList) {
                                                                                    pointList.push(new Cesium.Cartesian3.fromDegrees(tempList[m].L, tempList[m].B, tempList[m].H));
                                                                                }

                                                                                viewer.entities.add({
                                                                                    id: data.children[i].children[j].id + "tieMo",
                                                                                    polyline: {
                                                                                        positions: pointList,
                                                                                        width: 1,
                                                                                        material: Cesium.Color.fromCssColorString('#09f4f7'),
                                                                                        show: true,
                                                                                        clampToGround: true,
                                                                                        classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                                                    }
                                                                                });

                                                                                var LBlist = [];
                                                                                var maximumHeights = [];
                                                                                var minimumHeigh = [];
                                                                                for (var m in tempList) {
                                                                                    LBlist.push(tempList[m].L);
                                                                                    LBlist.push(tempList[m].B);
                                                                                    maximumHeights.push(1300);
                                                                                    minimumHeigh.push(500);
                                                                                }
                                                                                viewer.entities.add({
                                                                                    id: data.children[i].children[j].id,
                                                                                    wall: {
                                                                                        positions: Cesium.Cartesian3.fromDegreesArray(LBlist),
                                                                                        maximumHeights: maximumHeights,
                                                                                        minimumHeights: minimumHeigh,
                                                                                        material: Cesium.Color.YELLOW.withAlpha(0.3),//
                                                                                    },
                                                                                });
                                                                                viewer.entities.add({
                                                                                    id: data.children[i].children[j].id + "_LABEL",
                                                                                    position: Cesium.Cartesian3.fromDegrees(tempList[0].L, tempList[0].B, 1300),
                                                                                    label: {
                                                                                        text: data.children[i].title,
                                                                                        font: '16px Times New Roman',
                                                                                        showBackground: true,
                                                                                        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                                        pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                                                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                                                    }
                                                                                });
                                                                            }

                                                                            


                                                                        }

                                                                        data.children[i].children[j].checked = true;
                                                                    } else if (data.children[i].children[j].type == "MENSURE") {//测窗 
                                                                        //点击测窗
                                                                        console.log(data);
                                                                        var entity = viewer.entities.getById(data.children[i].children[j].id);
                                                                        var pointsList = data.children[i].children[j].data.position;

                                                                        if (pointsList[0].H > 0) {//这是修改了的测窗
                                                                            //修改后就改成直连线。
                                                                            if (entity == undefined) {

                                                                                var pointList = [];
                                                                                for (var m in pointsList) {
                                                                                    pointList.push(new Cesium.Cartesian3.fromDegrees(pointsList[m].L, pointsList[m].B, pointsList[m].H));
                                                                                }
                                                                                console.log(pointList);
                                                                                viewer.entities.add({
                                                                                    id: data.children[i].children[j].id,
                                                                                    polyline: {
                                                                                        positions: pointList,
                                                                                        width: 1,
                                                                                        material: Cesium.Color.RED,
                                                                                        show: true,
                                                                                        clampToGround: true,
                                                                                        classificationType: Cesium.ClassificationType.BOTH,
                                                                                    }
                                                                                });

                                                                            }

                                                                            data.children[i].children[j].checked = true;
                                                                        } else {
                                                                            if (entity == undefined) {
                                                                                var pointList = [];
                                                                                for (var m in pointsList) {
                                                                                    pointList.push(new Cesium.Cartesian3.fromDegrees(pointsList[m].L, pointsList[m].B, pointsList[m].H));
                                                                                }
                                                                                console.log(pointList);
                                                                                viewer.entities.add({
                                                                                    id: data.children[i].children[j].id,
                                                                                    polyline: {
                                                                                        positions: pointList,
                                                                                        width: 1,
                                                                                        material: Cesium.Color.RED,
                                                                                        //depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                                                        //    color: Cesium.Color.fromCssColorString('#09f654')
                                                                                        //}),
                                                                                        show: true,
                                                                                        clampToGround: true,
                                                                                        classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                                                    }
                                                                                });

                                                                            }

                                                                            data.children[i].children[j].checked = true;
                                                                        }




                                                                    } else if (data.children[i].children[j].type == "PROBESLOT") {//探槽
                                                                        //点击测窗
                                                                        console.log(data);
                                                                        var entity = viewer.entities.getById(data.children[i].children[j].id);
                                                                        var pointsList = data.children[i].children[j].data.position;
                                                                        if (pointsList[0].H > 0) {//修改后，重新存
                                                                            if (entity == undefined) {
                                                                                    var pointList = [];
                                                                                    for (var m in pointsList) {
                                                                                        pointList.push(new Cesium.Cartesian3.fromDegrees(pointsList[m].L, pointsList[m].B, pointsList[m].H));
                                                                                    }

                                                                                    viewer.entities.add({
                                                                                        id: data.children[i].children[j].id,
                                                                                        polyline: {
                                                                                            positions: pointList,
                                                                                            width: 1,
                                                                                            material: Cesium.Color.fromCssColorString('#09f4f7'),
                                                                                            //depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                                                            //    color: Cesium.Color.fromCssColorString('#09f4f7')
                                                                                            //}),
                                                                                            show: true,
                                                                                            clampToGround: true,
                                                                                            classificationType: Cesium.ClassificationType.BOTH,
                                                                                        }
                                                                                    });

                                                                                }

                                                                                data.children[i].children[j].checked = true;
                                                                        } else {//未修改前贴膜线
                                                                            if (entity == undefined) {

                                                                                var pointList = [];
                                                                                for (var m in pointsList) {
                                                                                    pointList.push(new Cesium.Cartesian3.fromDegrees(pointsList[m].L, pointsList[m].B, pointsList[m].H));
                                                                                }

                                                                                viewer.entities.add({
                                                                                    id: data.children[i].children[j].id,
                                                                                    polyline: {
                                                                                        positions: pointList,
                                                                                        width: 1,
                                                                                        material: Cesium.Color.fromCssColorString('#09f4f7'),
                                                                                        show: true,
                                                                                        clampToGround: true,
                                                                                        classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                                                    }
                                                                                });

                                                                            }

                                                                            data.children[i].children[j].checked = true;
                                                                        }



                                                                    } else if (data.children[i].children[j].type == "DRILLHOLE") {//钻孔
                                                                        console.log(data);
                                                                        var entity = viewer.entities.getById(data.children[i].children[j].id);
                                                                        if (entity == undefined) {
                                                                            //当无此元素添加 (new Cesium.Cartesian3.fromDegrees(pointsList[i].L, pointsList[i].B, pointsList.H)
                                                                            if (data.children[i].children[j].data.position.H > 0) {
                                                                                viewer.entities.add({
                                                                                    id: data.children[i].children[j].id,
                                                                                    position: new Cesium.Cartesian3.fromDegrees(data.children[i].children[j].data.position.L, data.children[i].children[j].data.position.B, data.children[i].children[j].data.position.H),
                                                                                    billboard: {
                                                                                        image: '../../Resources/img/map/drillhole.png',
                                                                                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                                                        width: 32,
                                                                                        height: 32,
                                                                                        disableDepthTestDistance: Number.POSITIVE_INFINITY,

                                                                                    }
                                                                                });
                                                                                //var entitylabel = viewer.entities.getById(data.children[i].children[j].id + "_LABEL");
                                                                                //if (entitylabel == undefined) {
                                                                                //    viewer.entities.add({
                                                                                //        id: data.children[i].children[j].id + "_LABEL",
                                                                                //        position: data.children[i].children[j].data.position,
                                                                                //        label: {
                                                                                //            text: data.children[i].children[j].title,
                                                                                //            font: '16px Times New Roman',
                                                                                //            showBackground: true,
                                                                                //            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                                                //            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                                //            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                                //            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                                                //            disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                                                //        }
                                                                                //    });
                                                                                //}
                                                                            } else {
                                                                                var postions = new Cesium.Cartographic(Math.PI / 180 * data.children[i].children[j].data.position.L, Math.PI / 180 * data.children[i].children[j].data.position.B);
                                                                                var Heights = viewer.scene.sampleHeight(postions);
                                                                                console.log(Heights);
                                                                                viewer.entities.add({
                                                                                    id: data.children[i].children[j].id,
                                                                                    position: new Cesium.Cartesian3.fromDegrees(data.children[i].children[j].data.position.L, data.children[i].children[j].data.position.B, Heights),
                                                                                    billboard: {
                                                                                        image: '../../Resources/img/map/marker.png',
                                                                                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                                                        width: 24,
                                                                                        height: 24,
                                                                                        disableDepthTestDistance: Number.POSITIVE_INFINITY,

                                                                                    }
                                                                                });
                                                                            }

                                                                        }
                                                                        data.children[i].children[j].checked = true;
                                                                    }

                                                                  
                                                                }

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
                                                            console.log(viewer);
                                                            console.log(viewer.entities);
                                                            tree.reload('prjlayerlistid', { data: layers });
                                                        }
                                                        modleInfo = data;
                                                        console.log(modleInfo);

                                                        //项目模型
                                                        var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                                                        if (modeljiazaiFlag) {
                                                            LoadModel(data);
                                                        }


                                                        layer.close(loadingceindex);

                                                    }
                                                    else if (data.type == "FLZJIELI") {
                                                        //节理
                                                        var entity = viewer.entities.getById(data.id);
                                                        if (entity == undefined) {
                                                            var points = data.pointList;
                                                          //  points.push(points[0]);
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
                                                                position: data.postion,//new Cesium.Cartesian3.fromDegrees(data.lbh.ls, data.lbh.bs, data.lbh.hs),
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
                                                                position: data.postion,
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
                                                    else if (data.type == "FLZLINE") {
                                                        //点击的线
                                                        console.log(data);
                                                        var sum = 0;
                                                        var entity = viewer.entities.getById(data.id);
                                                        if (entity == undefined) {
                                                            var line = data.pointList;
                                                            for (var i = 0; i < line.length - 1; i++) {
                                                                var point1 = line[i];
                                                                var point2 = line[i + 1];

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
                                                                    font: '20px Times New Roman',
                                                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                    pixelOffset: new Cesium.Cartesian2(0.0, -60),
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
                                                                    width: 1,
                                                                    //arcType: Cesium.ArcType.RHUMB,
                                                                    material: Cesium.Color.YELLOW,
                                                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                                        color: Cesium.Color.YELLOW
                                                                    })
                                                                    //show: true,
                                                                    //clampToGround: true,
                                                                    //classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                                },
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
                                                    } else if (data.type == "PROFILE") {//剖面的线
                                                        //点击的线
                                                        console.log(data);
                                                        var sum = 0;
                                                        var entity = viewer.entities.getById(data.id);

                                                        if (entity == undefined) {
                                                            if (data.data.startPoint!=null) {
                                                                //viewer.entities.add({
                                                                //    id: data.id,
                                                                //    wall: {
                                                                //        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                                                                //            data.data.startPoint.L,
                                                                //            data.data.startPoint.B,
                                                                //            180,
                                                                //            data.data.endPoint.L,
                                                                //            data.data.endPoint.B,
                                                                //            180,
                                                                //        ]),
                                                                //        minimumHeights: [100, 100],
                                                                //        material: Cesium.Color.YELLOW.withAlpha(0.3),//
                                                                //    },
                                                                //});
                                                                var pointList = [];

                                                                pointList.push(new Cesium.Cartesian3.fromDegrees(data.data.startPoint.L, data.data.startPoint.B, 160));
                                                                pointList.push(new Cesium.Cartesian3.fromDegrees(data.data.endPoint.L, data.data.endPoint.B, 160));

                                                                viewer.entities.add({
                                                                    id: data.id,
                                                                    polyline: {
                                                                        positions: pointList,
                                                                        width: 1,

                                                                        material: Cesium.Color.fromCssColorString('#09f4f7'),
                                                                        show: true,
                                                                        clampToGround: true,
                                                                        classificationType: Cesium.ClassificationType.BOTH,
                                                                    }
                                                                });
                                                             
                                                                viewer.entities.add({
                                                                    id: data.id + "_LABEL",
                                                                    position: Cesium.Cartesian3.fromDegrees(data.data.startPoint.L, data.data.startPoint.B, 180),
                                                                    label: {
                                                                        text: data.title,
                                                                        font: '16px Times New Roman',
                                                                        showBackground: true,
                                                                        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                        pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                                    }
                                                                });
                                                            } else {
                                                                var tempList = data.data.PointList;
                                                               // console.log(tempList);
                                                                var pointList = [];
                                                                for (var m in tempList) {
                                                                    pointList.push(new Cesium.Cartesian3.fromDegrees(tempList[m].L, tempList[m].B, tempList[m].H));
                                                                }

                                                                viewer.entities.add({
                                                                    id: data.id+"tieMo",
                                                                    polyline: {
                                                                        positions: pointList,
                                                                        width: 1,
                                                                        material: Cesium.Color.fromCssColorString('#09f4f7'),
                                                                        show: true,
                                                                        clampToGround: true,
                                                                        classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                                    }
                                                                });
                                                                var LBlist = [];
                                                                var maximumHeights = [];
                                                                var minimumHeigh = [];
                                                                for (var m in tempList) {
                                                                    LBlist.push(tempList[m].L);
                                                                    LBlist.push(tempList[m].B);
                                                                    maximumHeights.push(1300);
                                                                    minimumHeigh.push(500);
                                                                }
                                                                viewer.entities.add({
                                                                    id: data.id,
                                                                    wall: {
                                                                        positions: Cesium.Cartesian3.fromDegreesArray(LBlist),
                                                                        maximumHeights: maximumHeights,
                                                                        minimumHeights: minimumHeigh,
                                                                        material: Cesium.Color.YELLOW.withAlpha(0.3),//
                                                                    },
                                                                });
                                                                viewer.entities.add({
                                                                    id: data.id + "_LABEL",
                                                                    position: Cesium.Cartesian3.fromDegrees(tempList[0].L, tempList[0].B, 1300),
                                                                    label: {
                                                                        text: data.title,
                                                                        font: '16px Times New Roman',
                                                                        showBackground: true,
                                                                        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                        pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                                    }
                                                                });
                                                            }
                                                           


                                                        }

                                                        data.checked = true;
                                                    } else if (data.type == "MENSURE") {//测窗 
                                                        //点击测窗
                                                        console.log(data);
                                                        var entity = viewer.entities.getById(data.id);
                                                        var pointsList = data.data.position;
                                                        //    if (modleInfo == null) {
                                                        //        layer.msg('请先选择模型');
                                                        //        return;
                                                        //}
                                                        //for (var i in pointsList) {
                                                        //    var postions = new Cesium.Cartographic(Math.PI / 180 * pointsList[i].L, Math.PI / 180 * pointsList[i].B);
                                                        //    var Heights = viewer.scene.sampleHeight(postions);
                                                        //    if (Heights < 0) {
                                                        //        layer.msg('选择的测窗与模型不匹配或者测窗的点在模型外面了');
                                                        //        return;
                                                        //    }

                                                        //}
                                                        if (pointsList[0].H > 0) {//这是修改了的测窗
                                                            //修改后就改成直连线。
                                                            if (entity == undefined) {
                                                                // var points = data.pointList;
                                                                var pointList = [];
                                                                for (var m in pointsList) {
                                                                    pointList.push(new Cesium.Cartesian3.fromDegrees(pointsList[m].L, pointsList[m].B, pointsList[m].H));
                                                                }
                                                                console.log(pointList);
                                                                viewer.entities.add({
                                                                    id: data.id,
                                                                    polyline: {
                                                                        positions: pointList,
                                                                        width: 1,
                                                                        material: Cesium.Color.RED,
                                                                        show: true,
                                                                        clampToGround: true,
                                                                        classificationType: Cesium.ClassificationType.BOTH,
                                                                    }
                                                                });

                                                                //viewer.entities.add({
                                                                //    id: data.id + "_LABEL",
                                                                //    position: pointList[0],
                                                                //    label: {
                                                                //        text: data.title,
                                                                //        font: '16px Times New Roman',
                                                                //        showBackground: true,
                                                                //        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                                //        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                //        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                //        pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                                //        disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                                //    }
                                                                //});


                                                            }

                                                            data.checked = true;
                                                        } else {
                                                            if (entity == undefined) {
                                                                // var points = data.pointList;
                                                                var pointList = [];
                                                                for (var i in pointsList) {
                                                                    pointList.push(new Cesium.Cartesian3.fromDegrees(pointsList[i].L, pointsList[i].B, pointsList[i].H));
                                                                }
                                                                console.log(pointList);
                                                                viewer.entities.add({
                                                                    id: data.id,
                                                                    polyline: {
                                                                        positions: pointList,
                                                                        width: 1,
                                                                        material: Cesium.Color.RED,
                                                                        //depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                                        //    color: Cesium.Color.fromCssColorString('#09f654')
                                                                        //}),
                                                                        show: true,
                                                                        clampToGround: true,
                                                                        classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                                    }
                                                                });

                                                                //viewer.entities.add({
                                                                //    id: data.id + "_LABEL",
                                                                //    position: pointList[0],
                                                                //    label: {
                                                                //        text: data.title,
                                                                //        font: '16px Times New Roman',
                                                                //        showBackground: true,
                                                                //        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                                //        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                //        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                //        pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                                //        disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                                //    }
                                                                //});


                                                            }

                                                            data.checked = true;
                                                            //var sendDate = {};


                                                            //var tempdata = data.data;
                                                            //tempdata.position = pointsList;
                                                            //var listTemp = data.list;
                                                            //for (var j in listTemp) {
                                                            //    if (listTemp[j].code == tempdata.code) {//等于
                                                            //        listTemp.splice(j, 1);
                                                            //    }
                                                            //}
                                                            //listTemp.push(tempdata);
                                                            //sendDate.measurWindowPostion = JSON.stringify(listTemp);

                                                            //sendDate.id = data.lineId;
                                                            //sendDate.cookie = document.cookie;
                                                            //var loadingceindex = layer.load(0, {
                                                            //    shade: 0.2,
                                                            //    zIndex: layer.zIndex,
                                                            //    success: function (loadlayero) { layer.setTop(loadlayero); }
                                                            //});

                                                            //$.ajax({
                                                            //    url: servicesurl + "/api/RockDesign/UpdateRockDesignPoint", type: "post", data: sendDate,
                                                            //    success: function (result) {
                                                            //        layer.close(loadingceindex);

                                                            //        if ("更新成功" == result) {
                                                            //            for (var i in layers) {
                                                            //                if (layers[i].type == "DESIGN") {
                                                            //                    for (var j in layers[i].children) {
                                                            //                        for (var z in layers[i].children[j].children) {
                                                            //                            if (layers[i].children[j].children[z].id == data.id) {
                                                            //                                layers[i].children[j].children[z].data.position = pointsList;
                                                            //                                layers[i].spread = true;
                                                            //                                layers[i].children[j].spread = true;
                                                            //                                layers[i].children[j].children[z].spread = true;
                                                            //                                layers[i].children[j].children[z].checked = true;
                                                            //                            }
                                                            //                        }
                                                            //                    }
                                                            //                }
                                                            //            }
                                                            //            viewer.entities.removeById(data.id);
                                                            //            viewer.entities.removeById(data.id + "_LABEL");
                                                            //            modeljiazaiFlag = false;
                                                            //            tree.reload('prjlayerlistid', { data: layers });
                                                            //            //关闭,更改图上显示
                                                            //            //if (data.data.checked) {
                                                            //            //    var entity = viewer.entities.getById(data.data.id + "_LABEL");
                                                            //            //    console.log(entity);
                                                            //            //    entity.label.text = entity.label.text._value.replace(temptitle, temp.field.name);
                                                            //            //}
                                                            //            ClearTemp();
                                                            //            layer.close(drwInfox);
                                                            //        } else {
                                                            //            //创建失败
                                                            //            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                                            //        }

                                                            //    }, datatype: "json"
                                                            //});
                                                        }




                                                    } else if (data.type == "PROBESLOT") {//探槽
                                                        //点击测窗
                                                        console.log(data);
                                                        var entity = viewer.entities.getById(data.id);
                                                        var pointsList = data.data.position;
                                                        if (pointsList[0].H > 0) {//修改后，重新存
                                                            if (entity == undefined) {

                                                                var pointList = [];
                                                                for (var m in pointsList) {
                                                                    pointList.push(new Cesium.Cartesian3.fromDegrees(pointsList[m].L, pointsList[m].B, pointsList[m].H));
                                                                }

                                                                viewer.entities.add({
                                                                    id: data.id,
                                                                    polyline: {
                                                                        positions: pointList,
                                                                        width: 1,
                                                                        material: Cesium.Color.fromCssColorString('#09f4f7'),
                                                                        show: true,
                                                                        clampToGround: true,
                                                                        classificationType: Cesium.ClassificationType.BOTH,
                                                                    }
                                                                });




                                                            }

                                                            data.checked = true;
                                                        } else {//未修改前贴膜线
                                                            if (entity == undefined) {

                                                                var pointList = [];
                                                                for (var m in pointsList) {
                                                                    pointList.push(new Cesium.Cartesian3.fromDegrees(pointsList[m].L, pointsList[m].B, pointsList[m].H));
                                                                }

                                                                viewer.entities.add({
                                                                    id: data.id,
                                                                    polyline: {
                                                                        positions: pointList,
                                                                        width: 1,
                                                                        material: Cesium.Color.fromCssColorString('#09f4f7'),
                                                                        show: true,
                                                                        clampToGround: true,
                                                                        classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                                    }
                                                                });

                                                                // var points = data.pointList;
                                                                //viewer.entities.add({
                                                                //    id: data.id,
                                                                //    polyline: {
                                                                //        positions: points,
                                                                //        width: 1,
                                                                //        //arcType: Cesium.ArcType.RHUMB,
                                                                //        material: Cesium.Color.fromCssColorString('#0ef6df'), //'#09f654'#0ef6df
                                                                //        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                                //            color: Cesium.Color.fromCssColorString('#0ef6df')
                                                                //        }),//深度检测失败，用什么显示

                                                                //    },
                                                                //});

                                                                //viewer.entities.add({
                                                                //    id: data.id + "_LABEL",
                                                                //    position: new Cesium.Cartesian3(data.Centerx, data.Centery, data.Centerz),
                                                                //    label: {
                                                                //        text: data.title,
                                                                //        font: '16px Times New Roman',
                                                                //        showBackground: true,
                                                                //        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                                //        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                //        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                //        pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                                //        disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                                //    }
                                                                //});


                                                            }

                                                            data.checked = true;
                                                        }



                                                    } else if (data.type == "DRILLHOLE") {//钻孔
                                                        console.log(data);
                                                        var entity = viewer.entities.getById(data.id);
                                                        if (entity == undefined) {
                                                            //当无此元素添加 (new Cesium.Cartesian3.fromDegrees(pointsList[i].L, pointsList[i].B, pointsList.H)
                                                            if (data.data.position.H > 0) {
                                                                viewer.entities.add({
                                                                    id: data.id,
                                                                    position: new Cesium.Cartesian3.fromDegrees(data.data.position.L, data.data.position.B, data.data.position.H),
                                                                    billboard: {
                                                                        image: '../../Resources/img/map/drillhole.png',
                                                                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                                        width: 32,
                                                                        height: 32,
                                                                        disableDepthTestDistance: Number.POSITIVE_INFINITY,

                                                                    }
                                                                });
                                                                //var entitylabel = viewer.entities.getById(data.id + "_LABEL");
                                                                //if (entitylabel == undefined) {
                                                                //    viewer.entities.add({
                                                                //        id: data.id + "_LABEL",
                                                                //        position: data.data.position,
                                                                //        label: {
                                                                //            text: data.title,
                                                                //            font: '16px Times New Roman',
                                                                //            showBackground: true,
                                                                //            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                                //            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                //            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                //            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                                //            disableDepthTestDistance: Number.POSITIVE_INFINITY
                                                                //        }
                                                                //    });
                                                                //}
                                                            } else {
                                                                var postions = new Cesium.Cartographic(Math.PI / 180 * data.data.position.L, Math.PI / 180 * data.data.position.B);
                                                                var Heights = viewer.scene.sampleHeight(postions);
                                                                console.log(Heights);
                                                                viewer.entities.add({
                                                                    id: data.id,
                                                                    position: new Cesium.Cartesian3.fromDegrees(data.data.position.L, data.data.position.B, Heights),
                                                                    billboard: {
                                                                        image: '../../Resources/img/map/marker.png',
                                                                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                                        width: 24,
                                                                        height: 24,
                                                                        disableDepthTestDistance: Number.POSITIVE_INFINITY,

                                                                    }
                                                                });
                                                            }

                                                        }



                                                        data.checked = true;
                                                    } else if (data.type == "LICHENG") {//历程

                                                        viewer.entities.add({
                                                            id: "liCheng9999",
                                                            polyline: {
                                                                positions: Cesium.Cartesian3.fromDegreesArray(lcLinglist),
                                                                width: 3,
                                                                arcType: Cesium.ArcType.RHUMB,
                                                                material: Cesium.Color.AQUA,
                                                            },
                                                        });

                                                        for (var i in lcLableList) {
                                                            var L = lcLableList[i].geometry.x;
                                                            var B = lcLableList[i].geometry.y;
                                                            var text = lcLableList[i].attributes.Text;
                                                            viewer.entities.add({
                                                                id:"lilable"+i,
                                                                position: Cesium.Cartesian3.fromDegrees(L, B),
                                                                label: {
                                                                    text: text + "",
                                                                    font: "20px Times New Roman",
                                                                    //fillColor: Cesium.Color.RED,
                                                                    //outlineColor: Cesium.Color.BLACK,
                                                                    //outlineWidth: 2,
                                                                    //style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                    heightReference: Cesium.HeightReference.NONE,
                                                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                    pixelOffset: new Cesium.Cartesian2(0.0, -20),
                                                                },
                                                            });
                                                            viewer.entities.add({
                                                                id:"lcPoint"+i,
                                                                position: Cesium.Cartesian3.fromDegrees(L, B),
                                                                point: {
                                                                    pixelSize: 8,
                                                                    color: Cesium.Color.YELLOW,
                                                                },
                                                            });

                                                        }

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
                                                    if (data.type == "DESIGN") {//特殊情况，设计数据全部取消
                                                        for (var i in data.children) {
                                                            for (var j in data.children[i].children) {
                                                                viewer.entities.removeById(data.children[i].children[j].id);
                                                                viewer.entities.removeById(data.children[i].children[j].id + "_LABEL");
                                                                viewer.entities.removeById(data.children[i].children[j].id + "tieMo");//贴膜的特殊情况
                                                              
                                                                data.children[i].children[j].checked = false;
                                                            }
                                                        }
                                                    }
                                                    data.checked = false;
                                                } 
                                                else {
                                                    if (data.type == "PROJECTSUMODEL" || data.type == "DISASTERSURMODEL") {
                                                        console.log(modleInfo);
                                                        if (modleInfo.id == data.id) {
                                                            viewer.scene.primitives.remove(curtileset);
                                                            curtileset = null;
                                                            modleInfo = null;
                                                        }

                                                    } else if (data.type == "LICHENG") {//历程
                                                        viewer.entities.removeById("liCheng9999");
                                                        for (var i in lcLableList) {
                                                            viewer.entities.removeById("lilable" + i);
                                                            viewer.entities.removeById("lcPoint" + i);
                                                        }

                                                    }
                                                    else {
                                                        viewer.entities.removeById(data.id);
                                                        viewer.entities.removeById(data.id + "_LABEL");
                                                        viewer.entities.removeById(data.id + "tieMo");//贴膜的特殊情况
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
                                                            tree.reload('prjlayerlistid', { data: layers });
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
                                                                //关闭
                                                                //刷新项目列表
                                                                //GetUserProjects();
                                                                //var flzWindowLayer = new Object;
                                                                //flzWindowLayer.title = "边界范围";
                                                                //flzWindowLayer.type = "BIANJIE";
                                                                //flzWindowLayer.id = "BIANJIE" + currentprojectid;
                                                                //flzWindowLayer.pointList = points;
                                                                //flzWindowLayer.checked = true;
                                                                //flzWindowLayer.showCheckbox = true;//显示复选框
                                                                //flzWindowLayer.children = [];
                                                                //layers.push(flzWindowLayer);
                                                                //console.log(layers);
                                                                //tree.reload('prjlayerlistid', { data: layers });
                                                                //if (handler != undefined) {
                                                                //    handler.destroy();
                                                                //}
                                                                //isRedo = true;
                                                                //ClearTemp();
                                                                // tree.reload('prjlayerlistid', { data: layers });
                                                                for (var i in layers) {
                                                                    if (layers[i].type == "BIANJIE") {
                                                                        layers.splice(i, 1);
                                                                        break;
                                                                    }
                                                                }
                                                                console.log(layers);
                                                                viewer.entities.removeById(data.id);
                                                                tree.reload('prjlayerlistid', { data: layers });
                                                            } else {
                                                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                            }
                                                        }, datatype: "json"
                                                    });
                                                } else if (data.type == "SECTION" || data.type == "PROFILE" || data.type == "MENSURE" || data.type == "PROBESLOT" || data.type == "DRILLHOLE" ) {//删除设计数据
                                                    var temp = {};
                                                    if (data.type == "SECTION") {
                                                        temp.id = data.id;
                                                    } else if (data.type == "PROFILE" || data.type == "MENSURE") {
                                                        temp.id = data.lineId;
                                                    } else if (data.type == "PROBESLOT" || data.type == "DRILLHOLE") {
                                                        temp.id = data.pointId;
                                                    }
                                                    temp.cookie = document.cookie;
                                                    var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                                                    $.ajax({
                                                        url: servicesurl + "/api/RockDesign/DeleteRockkDesignPoint", type: "delete", data: temp,
                                                        success: function (result) {
                                                            layer.close(loadinglayerindex);
                                                            if (result == "删除成功") {
                                                                layer.msg("删除成功", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                                //关闭
                                                                //刷新项目列表
                                                                var tempList = [];
                                                                for (var i in layers) {
                                                                    if (layers[i].type == "DESIGN") {
                                                                        for (var j in layers[i].children) {
                                                                            if (layers[i].children[j].id == temp.id) {
                                                                                for (var m in layers[i].children[j].children) {
                                                                                    viewer.entities.removeById(layers[i].children[j].children[m].id);
                                                                                    console.log(1233);
                                                                                }
                                                                                layers[i].children.splice(j, 1);
                                                                                layers[i].spread = true;
                                                                                break;
                                                                            }
                                                                           
                                                                        }
                                                                    }
                                                                }
                                                                console.log(layers);

                                                                modeljiazaiFlag = false;
                                                                tree.reload('prjlayerlistid', { data: layers });
                                                                ClearTemp();
                                                            } else {
                                                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                            }
                                                        }, datatype: "json"
                                                    });
                                                } else {
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
                                                            } else {//点数据成图
                                                                for (var i in layers[layers.length - 1].children) {
                                                                    for (var j in layers[layers.length - 1].children[i].children) {
                                                                        if (obj.data.id == layers[layers.length - 1].children[i].children[j].id) {
                                                                            layers[layers.length - 1].children[i].children.splice(j, 1);
                                                                            break;
                                                                        }
                                                                    }
                                                                }
                                                            }

                                                            console.log(layers);
                                                            tree.reload('prjlayerlistid', { data: layers });
                                                        }, datatype: "json"
                                                    });
                                                }


                                            };
                                        }
                                    });

                                }
                            }, datatype: "json"
                        });

                    }

                }, datatype: "json"
            });
        
       //}

    }

}