


function PointCloudPrecraet(currentprojectid) {
    if (currentprojectid == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        if ((utilprecreatlayerindex != null) || (utilprecreatlayerindex != undefined)) {
            layer.close(utilprecreatlayerindex);
        }
    } else {
        if (utilprecreatlayerindex == null) {
            utilprecreatlayerindex = layer.open({
                type: 1
                , title: ['预处理', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['400px', '400px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                ,content:''
                , zIndex: layer.zIndex
                , success: function (layero) {


                }
                , end: function () {
                    //关闭
                    utilprecreatlayerindex = null;

                }

            });
        }
    }
};