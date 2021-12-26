


function PointCloudTool(currentprojectid) {
    if (currentprojectid == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        if ((utiltoolindex != null) || (utiltoolindex != undefined)) {
            layer.close(utiltoolindex);
        }
    } else {
        if (utiltoolindex == null) {
            utiltoolindex = layer.open({
                type: 1
                , title: ['点云工具', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['400px', '400px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<div id="div" style="position: absolute; width:20px;height:400px;margin:20px;"></div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //addShinePoint();

                    ////场景出图
                    screenShots();

                    //缓冲区分析
                   // initPointBuffer();
                    //initPolylineBuffer();
                    //initPolygonBuffer();
                  //  viewer.zoomTo(viewer.entities);

                }
                , end: function () {
                    //关闭
                    utiltoolindex = null;

                }

            });
        }
    }
};

