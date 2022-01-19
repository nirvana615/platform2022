function modelview(id,rwbm) {
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
    }