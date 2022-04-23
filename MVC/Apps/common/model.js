/*
 * 必须先创建viewer变量
 */

//获取视角
function GetView() {
    var view = {
        destination: viewer.camera.position,
        orientation: {
            heading: viewer.camera.heading,
            pitch: viewer.camera.pitch,
            roll: viewer.camera.roll
        }
    };

    return view;
};

//加载3D Tiles
function Load3DTiles(model) {
    viewer.scene.globe.depthTestAgainstTerrain = false;

    if (model == null || model.MXLJ == undefined || model.MXLJ == "") {
        layer.msg("模型数据不正确，请检查！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return null;
    }
    else {
        var modelurl = datasurl + "/AllModel/" + model.MXLJ;

        //添加模型
        var curtileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            url: modelurl,
            maximumScreenSpaceError: isMobile.any() ? 1 : 1,
            maximumNumberOfLoadedTiles: isMobile.any() ? 1000 : 1000
        }));

        //缩放至模型
        if (model.MXSJ != null && model.MXSJ != "") {
            viewer.scene.camera.setView(JSON.parse(model.MXSJ));
        } else {
            viewer.zoomTo(curtileset);
        }

        curtileset.data = model;//附加数据

        return curtileset;
    }
};






//待删除
function modelview(id, rwbm) {
    //调整视角
    if (curtileset == null) {
        layer.msg("请先加载模型！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
    }
    else {
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
                id: id//模型id
            }

            $.ajax({
                url: servicesurl + "/api/ModelTask/UpdateModelGoodView", type: "put", data: data2,
                success: function (result) {
                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    //刷新项目列表
                    GetUserAllModelProjects(rwbm);
                    layer.close(loadingminindex);
                }, datatype: "json"
            });
        });

    }
};
//待删除
function LoadModel(obj) {
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
};