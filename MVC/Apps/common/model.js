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