var imageprojectlist = [];

//1---弹出影像项目列表widget
layer.open({
    type: 1
    , title: ['无人机影像项目列表', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
    , area: ['300px', '400px']
    , shade: 0
    , offset: ['60px', '10px']
    , closeBtn: 0
    , maxmin: true
    , moveOut: true
    , content: '<!--项目列表--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief"><div id="imageprojectlist"></div></div>'
    , zIndex: layer.zIndex
    , success: function (layero) {
        layer.setTop(layero);

        //获取用户全部影像项目信息
        GetUserAllImageProjects();

        tree.render({
            elem: '#imageprojectlist'
            , id: 'imageprojectlistid'
            , data: []
            , showCheckbox: true
            , customCheckbox: true
            , edit: ['add', 'update', 'del']    //项目操作选项
            , customOperate: true
            , accordion: true
            , click: function (obj) {
                ImageProjectNodeClick(obj);
            }
            , operate: function (obj) {
                ImageProjectNodeOperate(obj);
            }
            , oncheck: function (obj) {
                if (obj.checked) {
                    if (obj.data.type == "IMAGEPROJECTSURMODEL") {
                        LoadModel(obj.data);
                    }
                    //目标标注
                    else if (obj.data.type =="target") {
                        LoadTarget(obj.data);
                    }
                }
                else {
                    if (obj.data.type == "IMAGEPROJECTSURMODEL") {
                        viewer.scene.primitives.remove(current_project_tile);
                        current_project_tile = null;
                    }
                    //目标标注移除
                    else if (obj.data.type == "target") {
                        RemoveTarget(obj.data);
                    }

                }

            }
        });

    }
});


//2---获取用户所有项目列表
function GetUserAllImageProjects() {
    imageprojectlist = [];

    $.ajax({
        url: servicesurl + "/api/ImageProject/GetUserImageProjectList", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                var imageprojectdata = JSON.parse(result.data);

                for (var i in imageprojectdata) {
                    var prj = new Object;
                    prj.id = imageprojectdata[i].ImageProject.Id;
                    prj.nodeOperate = true;
                    prj.title = imageprojectdata[i].ImageProject.XMMC;
                    prj.b = imageprojectdata[i].ImageProject.ZXWD;
                    prj.l = imageprojectdata[i].ImageProject.ZXJD;
                    prj.type = "project";

                    var items = [];

                    //model
                    if (imageprojectdata[i].SurModels != null) {
                        var models = new Object;
                        models.title = imageprojectdata[i].SurModels.Title;
                        models.type = "models";

                        var modelitem = [];
                        if (imageprojectdata[i].SurModels.ModelList != null) {
                            for (var j in imageprojectdata[i].SurModels.ModelList) {
                                var model = new Object;
                                model.type = "IMAGEPROJECTSURMODEL";
                                model.title = imageprojectdata[i].SurModels.ModelList[j].MXMC;
                                model.path = imageprojectdata[i].SurModels.ModelList[j].MXLJ;
                                model.showCheckbox = true;
                                model.checked = false;
                                modelitem.push(model);
                            }
                            models.children = modelitem;
                            items.push(models);
                        }
                    }

                    //target
                    if (imageprojectdata[i].Targets != null) {
                        var targets = new Object;
                        targets.title = imageprojectdata[i].Targets.Title;
                        targets.type = "targets";
                        var targetitem = [];
                        for (var j in imageprojectdata[i].Targets.TargetList) {
                            var target = new Object;
                            target.id = imageprojectdata[i].Targets.TargetList[j].Id;
                            target.nodeOperate = true;
                            //目标复选框标注
                            target.showCheckbox = true;
                            target.checked = false;

                            target.type = "target";
                            target.title = imageprojectdata[i].Targets.TargetList[j].MBMC;
                            //目标位置
                            target.X = imageprojectdata[i].Targets.TargetList[j].X;
                            target.Y = imageprojectdata[i].Targets.TargetList[j].Y;
                            target.Z = imageprojectdata[i].Targets.TargetList[j].Z;

                            targetitem.push(target);
                        }
                        targets.children = targetitem;
                        items.push(targets);
                    }
                    prj.children = items;
                    imageprojectlist.push(prj);
                }

                //重载项目树：将项目列表数据imageprojectlist给data
                tree.reload('imageprojectlistid', {
                    data: imageprojectlist
                });

                //TODO 新增项目位置及标注
                imageprojectentities = [];                   //项目位置及标注
                var bs = [];//纬度集合
                var ls = [];//经度集合
                for (var i in imageprojectdata) {
                    var imageprojectentity = new Cesium.Entity({
                        id: "PROJECTCENTER_" + imageprojectdata[i].ImageProject.Id,
                        position: Cesium.Cartesian3.fromDegrees(imageprojectdata[i].ImageProject.ZXJD, imageprojectdata[i].ImageProject.ZXWD),
                        billboard: {
                            image: '../../Resources/img/map/project_type_rockfall.png',
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                            width: 40,
                            height: 40,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY, //深度检测，解决图标、标注与模型遮挡冲突
                        }
                    });
                    imageprojectentities.push(imageprojectentity);

                    var imageprojectentitylabel = new Cesium.Entity({
                        id: "PROJECTCENTER_" + imageprojectdata[i].ImageProject.Id + "_LABEL",
                        position: Cesium.Cartesian3.fromDegrees(imageprojectdata[i].ImageProject.ZXJD, imageprojectdata[i].ImageProject.ZXWD),
                        label: {
                            text: imageprojectdata[i].ImageProject.XMMC,
                            font: '20px Times New Roman',
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                        }
                    });

                    imageprojectentities.push(imageprojectentitylabel);

                    bs.push(imageprojectdata[i].ImageProject.ZXWD);
                    ls.push(imageprojectdata[i].ImageProject.ZXJD);

                    


                }

                if ((bs.length > 0) && (ls.length > 0)) {
                    //缩放至项目范围
                    setTimeout(() => {
                        FlytoExtent(Math.min.apply(null, ls) - 0.5, Math.min.apply(null, bs) - 0.5, Math.max.apply(null, ls) + 0.5, Math.max.apply(null, bs) + 0.5)
                    }, 3000);
                }

            }
            else {
                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }

        }, datatype: "json"
    });
};

//项目节点点击:set currentproject
function ImageProjectNodeClick(obj) {
    if (obj.data.type == "project") {
        if (currentprojectid == null || obj.data.id != currentprojectid) {
            layer.confirm('<p style="font-size:16px">是否确定将以下项目作为系统当前项目？</p><br/><p style="font-size:24px;font-weight:bold;text-align:center;">' + JSON.stringify(obj.data.title).replace(/\"/g, "") + '</p>', { title: ['消息提示', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei;background-color:#68bc80'], area: ['400px', '250px'], shade: 0.5, shadeClose: true, closeBtn: 0, resize: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } }, function (index) {

                if (JSON.stringify(obj.data.id) != currentprojectid) {
                    currentprojectid = JSON.stringify(obj.data.id);                             //更新当前项目id

                    document.getElementById("currentproject").style.visibility = "visible";
                    document.getElementById("currentproject").innerHTML = "<option>" + JSON.stringify(obj.data.title).replace(/\"/g, "") + "</option><option>清除当前项目</option>";

                    //监听清除当前项目操作
                    $(() => {
                        $('#currentprojectoperate select').change(() => {
                            if ($('#currentprojectoperate select').val() == "清除当前项目") {
                                document.getElementById("currentproject").innerHTML = "";
                                document.getElementById("currentproject").style.visibility = "hidden";
                                currentprojectid = null;

                                CloseAllLayer();                               //关闭弹出图层
                                viewer.entities.removeAll();
                                AddEntitiesInViewer(imageprojectentities);
                            }
                        });
                    });

                    ////获取entity
                    //var projectentity = null;
                    //var projectentitylabel = null;
                    //if (imageprojectentities.length > 0) {
                    //    for (var i in imageprojectentities) {
                    //        if (imageprojectentities[i].id == "PROJECTCENTER_" + currentprojectid) {
                    //            projectentity = imageprojectentities[i];
                    //        }
                    //        if (imageprojectentities[i].id == "PROJECTCENTER_" + currentprojectid + "_LABEL") {
                    //            projectentitylabel = imageprojectentities[i];
                    //        }
                    //    }
                    //}

                    //清除entity
                    //viewer.entities.removeAll();
                    //CloseAllLayer();



                   

                }


                FlytoCurrentProjectExtent(obj.data.l, obj.data.b, 8000.0);
               

                layer.close(index);
            });
        }
    }
    else {
        //TODO

    }
};

//项目树（项目列表+目标）节点操作：add\update\del
function ImageProjectNodeOperate(obj) {
    if (obj.type == 'add') {
        //查看
        if (obj.data.type == 'project') {
            //项目查看操作
            if ((imageprojectinfoaddlayerindex == null) && (imageprojectinfoeditlayerindex == null)) {
                ImageProjectInfo(obj.data.id, "view");
            }
            else {
                layer.confirm('是否打开新的模块?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                    CloseImageProjectInfoLayer();
                    ImageProjectInfo(obj.data.id, "view");
                    layer.close(index);
                });
            }
        }
        else if (obj.data.type == 'target') {
            //目标的查看操作
            //TODO
            if ((imagetargetinfoaddlayerindex == null) && (imagetargetinfoeditlayerindex == null)) {
                ImageTargetInfo(obj.data.id, "view");
            }
            else {
                layer.confirm('是否打开新的模块?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                    CloseImageTargetInfoLayer();
                    ImageTargetInfo(obj.data.id, "view");
                    layer.close(index);
                });
            }
        }
    }
    else if (obj.type == 'update') {
        //编辑
        if (obj.data.type == 'project') {
            //项目编辑操作
            if ((imageprojectinfoaddlayerindex == null) && (imageprojectinfoviewlayerindex == null)) {
                ImageProjectInfo(obj.data.id, "edit");
            }
            else {
                layer.confirm('是否打开新的模块?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                    CloseImageProjectInfoLayer();
                    ImageProjectInfo(obj.data.id, "edit");
                    layer.close(index);
                });
            }
        }
        else if (obj.data.type == 'target') {
            //目标的编辑操作
            if ((imagetargetinfoaddlayerindex == null) && (imagetargetinfoviewlayerindex == null)) {
                ImageTargetInfo(obj.data.id, "edit");
            }
            else {
                layer.confirm('是否打开新的模块?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                    CloseImageTargetInfoLayer();
                    ImageTargetInfo(obj.data.id, "edit");
                    layer.close(index);
                });
            }
        }
    }
    else {
        //删除
        if (obj.data.type == 'project') {
            //项目删除操作del                      
            $.ajax({
                url: servicesurl + "/api/ImageProject/DeleteImageProject", type: "delete", data: { "id": obj.data.id, "cookie": document.cookie },
                success: function (data) {
                    var result = JSON.parse(data);
                    //layer.msg(result.data, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    //TODO————清除项目位置及标注

                    ////欲删除项目未选定为当前项目，或当前项目为空。
                    if (obj.data.id == currentprojectid) {
                        document.getElementById("currentproject").innerHTML = "";
                        document.getElementById("currentproject").style.visibility = "hidden";
                        currentprojectid = null;
                        CloseAllLayer();                               //关闭弹出图层
                    }
                    if ((imageprojectinfoviewlayerindex != null) || (imageprojectinfoeditlayerindex != null) || (imageprojectinfoaddlayerindex != null)) {
                        CloseAllLayer();
                    }
                }, datatype: "json"
            })
        }
        else if (obj.data.type == 'target') {
            //目标的删除操作
            $.ajax({
                url: servicesurl + "/api/ImageTarget/DeleteTarget", type: "delete", data: { "id": obj.data.id, "cookie": document.cookie },
                success: function (data) {
                    var result = JSON.parse(data);
                    layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    if ((imagetargetinfoviewlayerindex != null) || (imagetargetinfoaddlayerindex != null) || (imagetargetinfoeditlayerindex != null)) {
                        CloseAllLayer();
                    }
                }, datatype: "json"
            })
        }
    }
};

//缩放至当前项目范围
function FlytoCurrentProjectExtent(l,b,h) {
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(l, b, h)
    }, { duration: 3 });    
};


//缩放至所有项目范围
function FlytoExtent(west, south, east, north) {
    viewer.camera.flyTo({
        destination: new Cesium.Rectangle.fromDegrees(west, south, east, north)
    }, { duration: 3 });

    if (imageprojectentities.length > 0) {
        setTimeout(() => {
            AddEntitiesInViewer(imageprojectentities)
        }, 3000);
    }
};


//向viewer添加entity
function AddEntityInViewer(entity) {
    if (entity != null) {
        viewer.entities.add(entity);
    }
};

//向viewer添加entity集合
function AddEntitiesInViewer(entities) {
    if (entities.length > 0) {
        for (var i in entities) {
            if (entities[i] != null) {
                viewer.entities.add(entities[i]);
            }
        }

        //viewer.flyTo(entities, { duration: 1, offset: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-90), 0) });
    }
};


function LoadTarget(target) {
    //添加目标
    var entity = viewer.entities.getById("TARGET_" + target.id);
    if (entity == undefined) {
        viewer.entities.add({
            id: "TARGET_" + target.id,
            position: new Cesium.Cartesian3(target.X, target.Y, target.Z),
            billboard: {
                image: '../../Resources/img/map/target.png',
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                width: 24,
                height: 24,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
            }
        });
    }

    //添加目标标注
    var entitylabel = viewer.entities.getById("TARGETLABEL_" + target.id);
    if (entitylabel == undefined) {
        viewer.entities.add({
            id: "TARGETLABEL_" + target.id,
            position: new Cesium.Cartesian3(target.X, target.Y, target.Z),
            label: {
                text: target.title,
                font: '16px Times New Roman',
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                pixelOffset: new Cesium.Cartesian2(0.0, -60),
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
            }
        });
    }
};

function RemoveTarget(target) {
    //查找目标
    var entity = viewer.entities.getById("TARGET_" + target.id);
    if (entity != undefined) {
        viewer.entities.remove(entity);
    }
    //查找目标标注
    var entitylabel = viewer.entities.getById("TARGETLABEL_" + target.id);
    if (entitylabel != undefined) {
        viewer.entities.remove(entitylabel);
    }
};






//关闭所有弹出图层
function CloseAllLayer() {
    //关闭项目信息图层
    if (imageprojectinfoviewlayerindex != null) {
        layer.close(imageprojectinfoviewlayerindex);
        imageprojectinfoviewlayerindex = null;
    }
    if (imageprojectinfoaddlayerindex != null) {
        layer.close(imageprojectinfoaddlayerindex);
        imageprojectinfoaddlayerindex = null;
    }
    if (imageprojectinfoeditlayerindex != null) {
        layer.close(imageprojectinfoeditlayerindex);
        imageprojectinfoeditlayerindex = null;
    }
    if (imageprojectlayerlistlayerindex != null) {
        layer.close(imageprojectlayerlistlayerindex);
        imageprojectlayerlistlayerindex = null;
    }

    //关闭目标信息图层
    if (imagetargetinfoviewlayerindex != null) {
        layer.close(imagetargetinfoviewlayerindex);
        imagetargetinfoviewlayerindex = null;
    }
    if (imagetargetinfoaddlayerindex != null) {
        layer.close(imagetargetinfoaddlayerindex);
        imagetargetinfoaddlayerindex = null;
    }
    if (imagetargetinfoeditlayerindex != null) {
        layer.close(imagetargetinfoeditlayerindex);
        imagetargetinfoeditlayerindex = null;
    }

    //TODO更多关闭图层
};

//关闭项目信息相关图层
function CloseImageProjectInfoLayer() {
    if (imageprojectinfoviewlayerindex != null) {
        layer.close(imageprojectinfoviewlayerindex);
        imageprojectinfoviewlayerindex = null;
    }
    if (imageprojectinfoaddlayerindex != null) {
        layer.close(imageprojectinfoaddlayerindex);
        imageprojectinfoaddlayerindex = null;
    }
    if (imageprojectinfoeditlayerindex != null) {
        layer.close(imageprojectinfoeditlayerindex);
        imageprojectinfoeditlayerindex = null;
    }
}


//关闭目标信息相关图层
function CloseImageTargetInfoLayer() {
    if (imagetargetinfoviewlayerindex != null) {
        layer.close(imagetargetinfoviewlayerindex);
        imagetargetinfoviewlayerindex = null;
    }
    if (imagetargetinfoaddlayerindex != null) {
        layer.close(imagetargetinfoaddlayerindex);
        imagetargetinfoaddlayerindex = null;
    }
    if (imagetargetinfoeditlayerindex != null) {
        layer.close(imagetargetinfoeditlayerindex);
        imagetargetinfoeditlayerindex = null;
    }
}



