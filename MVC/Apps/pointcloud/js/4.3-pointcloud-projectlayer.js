

var layers = [];//图层列表数据
var layerlist;
//节点点击
function PointCloudProjectNodeClick(obj) {
    if (obj.data.type === 'project') {
        layer.confirm('<p style="font-size:16px">是否确定将以下项目作为系统当前项目？</p><br/><p style="font-size:24px;font-weight:bold;text-align:center;">' + JSON.stringify(obj.data.title).replace(/\"/g, "") + '</p>', { title: ['消息提示', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei;background-color:#68bc80'], area: ['400px', '250px'], shade: 0.5, shadeClose: true, closeBtn: 0, resize: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } }, function (index) {
            viewer.entities.removeAll();//移除所有entities
            //删除上一个模型（保证只有一个模型）
            if (curtileset != null) {
                viewer.scene.primitives.remove(curtileset);
            }

            if (JSON.stringify(obj.data.id) != currentprojectid) {
                currentprojectid = JSON.stringify(obj.data.id);                             //更新当前项目id
                document.getElementById("currentproject").style.visibility = "visible";
                document.getElementById("currentproject").innerHTML = "<option>" + JSON.stringify(obj.data.title).replace(/\"/g, "") + "</option><option>清除当前项目</option>";

                //加载项目区域边界
                LoadRegionalBoundary(currentprojectid);

                //监听清除当前项目操作
                $(() => {
                    $('#currentprojectoperate select').change(() => {
                        if ($('#currentprojectoperate select').val() == "清除当前项目") {
                            document.getElementById("currentproject").innerHTML = "";
                            document.getElementById("currentproject").style.visibility = "hidden";
                            currentprojectid = null;

                            CloseAllLayer();                               //关闭弹出图层
                            viewer.entities.removeAll();
                            AddEntitiesInViewer(projectentities);

                        }
                    });
                });

            }
            layer.close(index);
        });
    }

    else if (obj.data.type === 'region') {
        $.ajax({
            url: servicesurl + "/api/PointCloudPolygon/GetPolygon", type: "get",
            data: { "relateid": obj.data.id },
            dataType: 'json',
            success: function (data) {
                PolygonInfo = JSON.parse(data);
                viewer.zoomTo(viewer.entities.getById("region_" + obj.data.id), new Cesium.HeadingPitchRange(Cesium.Math.toRadians((PolygonInfo.level))), Cesium.Math.toRadians(PolygonInfo.vertical), 40);


            }
        });
    }


}
//节点操作(查看、编辑、删除)
function PointCloudProjectNodeOperate(obj) {
    if (obj.type === 'add') {
        if (obj.data.type === 'project') {

        }
        if (obj.data.type === 'region') {

        }
        if (obj.data.type === 'pcdata') {
            //查看项目
            if ((projectinfoaddlayerindex == null) && (projectinfoeditlayerindex == null)) {
                PCloudDataInfo(obj.data.id, "view");
            }
            else {
                layer.confirm('是否打开新的模块?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                    CloseProjectinfoLayer();
                    PCloudDataInfo(obj.data.id, "view");
                    layer.close(index);
                });
            }
        }
    }
    //编辑
    else if (obj.type === 'update') {

        if (obj.data.type === 'project') {

        }
        if (obj.data.type === 'region') {
            //获取区域
            RegionlBoundary(obj.data.id);
        }
        if (obj.data.type === 'pcdata') {
            if ((projectinfoaddlayerindex == null) && (projectinfoviewlayerindex == null)) {
                PCloudDataInfo(obj.data.id, "edit");
            }
            else {
                layer.confirm('是否打开新的模块?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                    CloseProjectinfoLayer();
                    //PCloudDataInfo(obj.data.id, "edit");
                    layer.close(index);
                });
            }
        }
    }

    else if (obj.type === 'del') {
        if (obj.data.type === 'project') {

        }
        if (obj.data.type === 'region') {

        }
        if (obj.data.type === 'pcdata') {

        }
    }
}
//节点选中
function PointCloudProjectNodeCheck(obj) {
    //根据选中状态在地图中添加元素
    var checked = obj.checked;
    var data = obj.data;
    if (checked) {
        if (data.projectid != currentprojectid) {
            layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }

        else {
            if (data.type == "project_surModel") {
                //for (var i in layers) {
                //    for (var j in layers[i].children) {
                //        if (layers[i].children[j].title == "三维实景模型") {
                //                for (var s in layers[i].children.children.children) {
                //                    if (layers[i].children[j].children[s].id != data.id) {
                //                        layers[i].children[j].children[s].checked = false;
                //                    } else {
                //                        layers[i].children[j].children[s].checked = true;
                //                        layers[i].children[j].children[s].spread = true;
                //                        layers[i].children[j].spread = true;
                //                    }
                //                }                      
                //        }
                //    }

                //}

                //tree.reload('prjlayerlistid', { data: layers });
                //加载模型
                LoadModel(data);
            }
        }
    }
    else {
        if (data.projectid != currentprojectid) {
            layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
        else {
            if(data.type == "project_surModel"){
                if (curtileset != null) {
                    viewer.scene.primitives.remove(curtileset);
                }
            }
        }
    }
}

//创建项目
function AddProject() {
    //编辑项目
    if (projectinfoaddlayerindex == null) {
        projectinfoaddlayerindex = layer.open({
            type: 1
            , title: ['新增点云时序对比项目', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['800px', '450px']
            , shade: 0
            , offset: 'auto'
            , closeBtn: 1
            , maxmin: true
            , moveOut: true
            , content: '<!--创建点云项目--><form class="layui-form" style="margin-top:5px;margin-right:5px;" lay-filter="addpointcloud_projectform">    <div class="layui-form-item">        <label class="layui-form-label">项目名称</label>        <div class="layui-input-block">            <input type="text" name="xmmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />        </div>    </div>    <div class="layui-form-item">        <div class="layui-row">            <div class="layui-col-md6" style="width:50%">                <div class="grid-demo grid-demo-bg1">                    <label class="layui-form-label">中心经度</label>                    <div class="layui-input-block">                        <input type="text" name="zxjd" lay-verify="required|number" autocomplete="off" placeholder="请输入" class="layui-input" />                    </div>                </div>            </div>            <div class="layui-col-md6" style="width:50%">                <div class="grid-demo">                    <label class="layui-form-label">中心纬度</label>                    <div class="layui-input-block">                        <input type="text" name="zxwd" lay-verify="required|number" autocomplete="off" placeholder="请输入" class="layui-input" />                    </div>                </div>            </div>        </div>    </div>    <div class="layui-form-item">        <label class="layui-form-label">行政区划</label>        <div class="layui-input-inline" style="width:200px;">            <select id="provinceid" name="province" lay-verify="required">                <option value="">省/市</option>                <option value="0">重庆市</option>            </select>        </div>        <div class="layui-input-inline" style="width:200px;">            <select id="cityid" name="city" lay-verify="required">                <option value="">市辖区/县</option>                <option value="0">市辖区</option>                <option value="1">县</option>            </select>        </div>        <div class="layui-input-inline" style="width:200px;">            <select id="districtid" name="district" lay-verify="required">                <option value="">区/县</option>            </select>        </div>    </div>    <div class="layui-form-item">        <label class="layui-form-label">项目位置</label>        <div class="layui-input-block">            <input type="text" name="xmwz" autocomplete="off" placeholder="请输入" class="layui-input" />        </div>    </div>    <div class="layui-form-item">        <div class="layui-row">            <div class="layui-col-md6" style="width:50%">                <div class="grid-demo grid-demo-bg1">                    <div class="layui-inline">                        <label class="layui-form-label">创建时间</label>                        <div class="layui-input-inline" style="width:250px;">                            <input type="text" id="xmkssjid" name="xmkssj" lay-verify="date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" />                        </div>                    </div>                </div>            </div>            <div class="layui-col-md6" style="width:50%">                <div class="grid-demo grid-demo-bg1">                    <label class="layui-form-label">坐标系统</label>                    <div class="layui-input-block">                        <select id="kjckid" name="kjck" lay-verify="required">                            <option value="">请选择</option>                        </select>                    </div>                </div>            </div>        </div>    </div>    <div class="layui-form-item">        <div class="layui-row">            <div class="layui-col-md6" style="width:50%">                <div class="grid-demo grid-demo-bg1">                    <label class="layui-form-label">是否有三维模型</label>                    <div class="layui-input-block">                        <select id="swmxid" name="swmx" lay-verify="required">                            <option value="1">是</option>                            <option value="0">否</option>                        </select>                    </div>                </div>            </div>            <div class="layui-col-md6" style="width:50%">                <div class="grid-demo grid-demo-bg1">                    <label class="layui-form-label">是否结束</label>                    <div class="layui-input-block">                        <select id="sfjsid" name="sfjs" lay-verify="required">                            <option value="1">是</option>                            <option value="0">否</option>                        </select>                    </div>                </div>            </div>        </div>    </div>    <div class="layui-form-item">        <label class="layui-form-label">备注</label>        <div class="layui-input-block">            <input type="text" name="bz" autocomplete="off" placeholder="请输入" class="layui-input" />        </div>    </div>    <div class="layui-form-item" style="margin-top:5px">        <div style="position:absolute;right:15px;">            <button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button>            <button type="submit" class="layui-btn" lay-submit="" lay-filter="addprojectinfosubmit" style="width:100px">提交</button>        </div>    </div></form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);
                //渲染创建时间
                date.render({
                    elem: '#xmkssjid'
                });
                if (srids.length > 0) {
                    for (var i in srids) {
                        //if (srids[i].name == "China Geodetic Coordinate System 2000") {
                        document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '" selected>' + srids[i].name + '</option>';
                        //}
                    }
                }
                if (xjxzqs.length > 0) {
                    for (var i in xjxzqs) {
                        document.getElementById("districtid").innerHTML += '<option value="' + xjxzqs[i].value + '">' + xjxzqs[i].name + '</option>';
                    }
                }

                form.render();
                form.render('select');

                form.on('submit(addprojectinfosubmit)', function (data) {
                    data.field.cookie = document.cookie;
                    $.ajax({
                        url: servicesurl + "/api/PointCloudProject/AddProject", type: "post", data: data.field,
                        success: function (result) {

                            if (isNaN(parseInt(JSON.parse(result).code) == 0)) {
                                //创建失败
                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            }
                            else {
                                layer.msg("创建成功。", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                //关闭
                                layer.close(projectinfoaddlayerindex);

                                //刷新项目列表
                                PointCloudProjectList();
                            }
                        }, datatype: "json"
                    });

                    return false;
                });
            }
            , end: function () {
                projectinfoaddlayerindex = null;
            }
        });
    }
}

//创建项目区域
function AddRegion() {

    if (currentprojectid == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        if ((regionaddlayerindex != null) || (regionaddlayerindex != undefined)) {
            layer.close(regionaddlayerindex);
        }
    } else {
        if (regionaddlayerindex == null) {
            regionaddlayerindex = layer.open({
                type: 1
                , title: ['新增项目区域', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['800px', '400px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--创建点云项目区域--><form class="layui-form" style="margin-top:5px;margin-right:5px;" lay-filter="addpointcloud_regionform">    <div class="layui-form-item">        <div class="layui-row">            <label class="layui-form-label" style="margin-top:10px">项目名称</label>            <div class="layui-input-block">                <input type="text" id="xmmc" name="xmmc" class="layui-input" readonly="readonly" />            </div>        </div>    </div>    <div class="layui-form-item">        <div class="layui-row">            <div class="layui-col-md6" style="width:50%">                <div class="grid-demo grid-demo-bg1">                    <label class="layui-form-label">区域名称</label>                    <div class="layui-input-block">                        <input type="text" name="regionname" lay-verify="required" autocomplete="off" placeholder="请输入" class="layui-input" />                    </div>                </div>            </div>            <div class="layui-col-md6" style="width:50%">                <div class="grid-demo grid-demo-bg1">                    <div class="layui-inline">                        <label class="layui-form-label">创建时间</label>                        <div class="layui-input-inline" style="width:250px;">                            <input type="text" id="cjsj" name="cjsj" lay-verify="date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" />                        </div>                    </div>                </div>            </div>        </div>    </div>    <div class="layui-form-item">        <div class="layui-row">            <div class="layui-col-md6" style="width:50%">                <div class="grid-demo grid-demo-bg1">                    <label class="layui-form-label">中心经度</label>                    <div class="layui-input-block">                        <input type="text" name="zxjd" lay-verify="required|number" autocomplete="off" placeholder="请输入" class="layui-input" />                    </div>                </div>            </div>            <div class="layui-col-md6" style="width:50%">                <div class="grid-demo">                    <label class="layui-form-label">中心纬度</label>                    <div class="layui-input-block">                        <input type="text" name="zxwd" lay-verify="required|number" autocomplete="off" placeholder="请输入" class="layui-input" />                    </div>                </div>            </div>        </div>    </div>    <div class="layui-form-item">        <label class="layui-form-label">备注</label>        <div class="layui-input-block">            <input type="text" name="bz" autocomplete="off" placeholder="请输入" class="layui-input" />        </div>    </div>    <div class="layui-form-item" style="margin-top:5px">        <div style="position:absolute;right:15px;">            <button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button>            <button type="submit" class="layui-btn" lay-submit="" lay-filter="addregioninfosubmit" style="width:100px">提交</button>        </div>    </div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    //渲染创建时间
                    date.render({
                        elem: '#cjsj'
                    });
                    form.render();
                    form.render('select');

                    //渲染项目名称
                    for (var i = 0; i < layers.length; i++) {
                        if (layers[i].id == currentprojectid) {
                            form.val("addpointcloud_regionform", {
                                "xmmc": layers[i].title
                            })
                        }
                    }

                    form.on('submit(addregioninfosubmit)', function (data) {
                        data.field.cookie = document.cookie;
                        data.field.currentprojectid = currentprojectid;
                        $.ajax({
                            url: servicesurl + "/api/PointCloudRegion/AddRegion", type: "post", data: data.field,
                            success: function (result) {

                                if (isNaN(parseInt(JSON.parse(result).code) == 0)) {
                                    //创建失败
                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                }
                                else {
                                    layer.msg("创建成功。", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                    //关闭
                                    layer.close(regionaddlayerindex);

                                    //刷新项目列表
                                    PointCloudProjectList();
                                }
                            }, datatype: "json"
                        });

                        return false;
                    });
                }
                , end: function () {
                    regionaddlayerindex = null;
                }
            });
        }
    }

}
var handler;

//边界区域范围
function RegionlBoundary(regionid) {

    var RegionalBoundary = [];
    var eyespoints = [];
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    if (curtileset != null) {
        handler.setInputAction(function (leftclick) {
            var position = viewer.scene.pick(leftclick.position);
            if (position) {
                var pickedCar3 = getCartesian3fromPick(viewer, leftclick);
                var cartesian3 = Cesium.Cartographic.fromCartesian(pickedCar3);                        //笛卡尔XYZ
                var longitude = Cesium.Math.toDegrees(cartesian3.longitude);                         //经度
                var latitude = Cesium.Math.toDegrees(cartesian3.latitude);                           //纬度
                var height = cartesian3.height;                                                      //高度
                if (height > 0) {
                    if (Cesium.defined(position)) {
                        viewer.entities.add({
                            id: "ptstemp" + NewGuid(),
                            name: "ptstemp" + NewGuid(),
                            position: pickedCar3,
                            point: {
                                pixelSize: 5,
                                color: Cesium.Color.YELLOW,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY
                            }
                        });

                        RegionalBoundary.push(pickedCar3);
                        eyespoints.push(new Cesium.Cartesian3(viewer.camera.position.x, viewer.camera.position.y, viewer.camera.position.z));
                        if (RegionalBoundary.length > 1) {
                            var point = RegionalBoundary[RegionalBoundary.length - 2];
                            viewer.entities.add({
                                id: "ptstemp" + NewGuid(),
                                name: "ptstemp" + NewGuid(),
                                polyline: {
                                    positions: [point, pickedCar3],
                                    width: 2,
                                    arcType: Cesium.ArcType.RHUMB,
                                    material: Cesium.Color.RED,
                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.RED,
                                    }),
                                }
                            });
                        }

                    }
                }
            }

        }, this.Cesium.ScreenSpaceEventType.LEFT_CLICK);
        if (isMobile.any()) {
            handler.setInputAction(function (pinch) {

            }, Cesium.ScreenSpaceEventType.PINCH_START);
        }
        else {
            //右击
            handler.setInputAction(function (rightclik) {
                if (RegionalBoundary.length > 2) {

                    RegionalBoundary.push(RegionalBoundary[0]);
                    viewer.entities.add({
                        name: "ptstemp" + NewGuid(),
                        polyline: {
                            positions: RegionalBoundary,
                            width: 2,
                            arcType: Cesium.ArcType.RHUMB,
                            material: Cesium.Color.RED,
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.RED,
                            }),
                        }
                    });




                    regionlboundarylayerindex = layer.open({
                        type: 1
                        , title: ['选定范围', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                        , area: ['250px', '160px']
                        , shade: 0
                        , offset: 'auto'
                        , closeBtn: 1
                        , maxmin: true
                        , moveOut: true
                        , content: '<form class="layui-form" style="margin-top:5px;margin-right:25px;" lay-filter="addregionlboundaryform"><div class="layui-form-item" style="margin-top:30px"><div style="position:absolute;right:5px;"><button id="cancel_rbadd" type="button"class="layui-btn layui-btn-primary" style="width:100px">取消</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="addpointinfosubmit" style="width:100px">确定</button></div></div></form>'
                        , zIndex: layer.zIndex
                        , success: function (layero) {
                            //置顶
                            layer.setTop(layero);
                            form.render();
                            //上传数据
                            $("#cancel_rbadd").on("click", function () {
                                //取消画的图和点
                                if (handler != undefined) {
                                    handler.destroy();
                                    cleartemp();
                                    RegionalBoundary = [];

                                    layer.close(regionlboundarylayerindex);
                                    regionlboundarylayerindex = null;
                                }
                            });

                            form.on('submit(addpointinfosubmit)', function (data) {

                                data.field.cookie = document.cookie;
                                data.field.regionalboundary = JSON.stringify(RegionalBoundary);
                                data.field.projectId = currentprojectid;
                                data.field.regionid = regionid;

                                // var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                                $.ajax({
                                    url: servicesurl + "/api/PointCloudRegion/UpdateRegionlBoundaryInfo", type: "put", data: data.field,
                                    success: function (result) {
                                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        //刷新项目列表
                                        //PointCloudProjectList();

                                        var sendDate = {};

                                        var maxX = viewer.scene.cartesianToCanvasCoordinates(RegionalBoundary[0]).x;
                                        var minX = viewer.scene.cartesianToCanvasCoordinates(RegionalBoundary[0]).x;
                                        var maxY = viewer.scene.cartesianToCanvasCoordinates(RegionalBoundary[0]).y;
                                        var minY = viewer.scene.cartesianToCanvasCoordinates(RegionalBoundary[0]).y;
                                        for (var i in RegionalBoundary) {
                                            if (viewer.scene.cartesianToCanvasCoordinates(RegionalBoundary[i]).x > maxX) {
                                                maxX = viewer.scene.cartesianToCanvasCoordinates(RegionalBoundary[i]).x;
                                            }
                                            if (viewer.scene.cartesianToCanvasCoordinates(RegionalBoundary[i]).x < minX) {
                                                minX = viewer.scene.cartesianToCanvasCoordinates(RegionalBoundary[i]).x;
                                            }
                                            if (viewer.scene.cartesianToCanvasCoordinates(RegionalBoundary[i]).y > maxY) {
                                                maxY = viewer.scene.cartesianToCanvasCoordinates(RegionalBoundary[i]).y;
                                            }
                                            if (viewer.scene.cartesianToCanvasCoordinates(RegionalBoundary[i]).y < minY) {
                                                minY = viewer.scene.cartesianToCanvasCoordinates(RegionalBoundary[i]).y;
                                            }
                                        }
                                        // 最大100个点
                                        var xxishu = (maxX - minX) / 10;
                                        var yxishu = (maxY - minY) / 10;
                                        var jimiList = [];
                                        for (var x = 0; x < 11; x++) {
                                            for (var m = 0; m < 11; m++) {

                                                var temp = new Cesium.Cartesian2(minX + xxishu * x, minY + yxishu * m);//b点，加了5.

                                                jimiList.push(viewer.scene.pickPosition(temp));
                                            }
                                        }

                                        sendDate.bpsList = JSON.stringify(RegionalBoundary);
                                        sendDate.eyesList = JSON.stringify(eyespoints);
                                        sendDate.spsList = JSON.stringify(jimiList);
                                        sendDate.cookie = document.cookie;
                                        console.log(sendDate);

                                        var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                                        $.ajax({
                                            url: servicesurl + "/api/FlzWindowInfo/getWindowInfo", type: "post", data: sendDate,//后台发送请求
                                            success: function (result) {
                                                layer.close(loadingceindex);

                                                var windowInfos = JSON.parse(result);
                                                console.log(windowInfos);
                                                if (windowInfos == null) {
                                                    layer.close(drowinfoAddlayerindex);
                                                    layer.msg("调用接口计算失败，请重新选择位置，所选的点不能形成平面", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                    ClearTemp();

                                                    if (handler != undefined) {
                                                        handler.destroy();
                                                    }
                                                    RegionalBoundary = [];
                                                    eyespoints = [];
                                                    return false;
                                                }
                                                if (windowInfos == "") {
                                                    layer.msg("调用接口结算失败，请稍后再试", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                    ClearTemp();

                                                    if (handler != undefined) {
                                                        handler.destroy();
                                                    }
                                                    RegionalBoundary = [];
                                                    eyespoints = [];
                                                    return false;

                                                }
                                                else {

                                                    var BLHList = windowInfos.Vertices3D1;
                                                    var positList = [];
                                                    var maxHeihts = 0;
                                                    for (var i in BLHList) {
                                                        if (BLHList[i].L == "NaN") {
                                                            layer.msg("请旋转模型到合适位置", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                            return false;
                                                        }
                                                        var postions = new Cesium.Cartographic(Math.PI / 180 * BLHList[i].L, Math.PI / 180 * BLHList[i].B);
                                                        var Heights = viewer.scene.sampleHeight(postions);
                                                        if (Heights > maxHeihts) {
                                                            maxHeihts = Heights;
                                                        }
                                                        //经纬度，现在的坐标，转换三维。
                                                        positList.push(new Cesium.Cartesian3.fromDegrees(BLHList[i].L, BLHList[i].B, Heights));
                                                    }
                                                    var polygoninfo = {};
                                                    polygoninfo.cookie = document.cookie;
                                                    polygoninfo.points = JSON.stringify(positList);//直接存吧
                                                    polygoninfo.regionId = regionid;
                                                    polygoninfo.type = 1;
                                                    polygoninfo.projectId = currentprojectid;

                                                    polygoninfo.axisx = JSON.stringify(windowInfos.AxisX);//x轴
                                                    polygoninfo.axisy = JSON.stringify(windowInfos.AxisY);//y轴   Normal Origin Vertices2D Vertices3D Vertices3D1
                                                    polygoninfo.normal = JSON.stringify(windowInfos.Normal);//法向量
                                                    polygoninfo.origin = JSON.stringify(windowInfos.Origin);//原点
                                                    polygoninfo.vertices2d = JSON.stringify(windowInfos.Vertices2D);//平，面
                                                    polygoninfo.vertices3d = JSON.stringify(windowInfos.Vertices3D);//空间执教
                                                    polygoninfo.vertices3dlbh = JSON.stringify(windowInfos.Vertices3D1);//大地坐标

                                                    var tempList = [];
                                                    tempList.push(positList[0]);
                                                    tempList.push(positList[1]);
                                                    tempList.push(positList[2]);
                                                    var chanzhuang = getChanzhuang(positList);
                                                    var qingXiang = parseFloat(chanzhuang.qingXiang) - 180;
                                                    var qingJiao = parseFloat(chanzhuang.qingJiao) - 90;
                                                    polygoninfo.level = qingXiang.toFixed(2);
                                                    polygoninfo.vertical = qingJiao.toFixed(2);
                                                    polygoninfo.height = maxHeihts.toFixed(2);

                                                    //更新多边形信息表
                                                    $.ajax({

                                                        url: servicesurl + "/api/PointCloudPolygon/EditPolygon", type: "post", data: polygoninfo,
                                                        success: function (result) {
                                                            if (isNaN(parseInt(JSON.parse(result).code) == 0)) {
                                                                //创建失败
                                                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                            }
                                                            else {
                                                                PointCloudProjectList();
                                                                cleartemp();
                                                                var regiontemp = viewer.entities.getById("region_" + regionid)
                                                                viewer.entities.remove(regiontemp);


                                                                viewer.entities.add({
                                                                    id: "region_" + regionid,
                                                                    name: "region_" + regionid,
                                                                    polyline: {
                                                                        positions: RegionalBoundary,
                                                                        width: 2,
                                                                        arcType: Cesium.ArcType.RHUMB,
                                                                        material: Cesium.Color.RED,
                                                                        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                                                            color: Cesium.Color.RED,
                                                                        }),
                                                                    }
                                                                });

                                                                RegionalBoundary = [];

                                                            }

                                                        }, datatype: "json"
                                                    });
                                                }

                                            }, datatype: "json"

                                        });

                                    }, datatype: "json"
                                });
                                layer.close(regionlboundarylayerindex);
                                regionlboundarylayerindex = null;
                                return false;
                            });

                        }
                        , end: function () {
                            regionlboundarylayerindex = null;



                        }, cancel: function () {//取消按钮

                            //取消画的图和点
                            if (handler != undefined) {
                                handler.destroy();
                                cleartemp();
                                RegionalBoundary = [];
                            }

                        }
                    });
                }
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

        }

    }
}

//点云时序数据信息
function PCloudDataInfo(id, style) {
    if (style == "view") {
        //查看项目信息
        if (projectinfoviewlayerindex == null) {
            projectinfoviewlayerindex = layer.open({
                type: 1
                , title: ['时序数据信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['700px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , anim: 0
                , maxmin: true
                , moveOut: true
                , content:'<!--查看项目--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px 0px">    <ul class="layui-tab-title">        <li class="layui-this">基本信息</li>        <!--<li>工程设置</li>-->    </ul>    <div class="layui-tab-content" style="margin:0px 0px">        <!--基本信息-->        <div class="layui-tab-item layui-show">            <form class="layui-form" style="margin-top:0px" lay-filter="projectinfoviewform">                <div class="layui-form-item" >                    <label class="layui-form-label" style="margin-top:10px">所属项目</label>                    <div class="layui-input-block">                        <input type="text" name="xmmc" class="layui-input" readonly="readonly" />                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">采集人员</label>                                <div class="layui-input-block">                                    <input type="text" name="cjry" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo">                                <label class="layui-form-label">采集时间</label>                                <div class="layui-input-block">                                    <input type="text" name="cjsj" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">项目区域</label>                                <div class="layui-input-block">                                    <input type="text" name="xmqy" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">中心经度</label>                                <div class="layui-input-block">                                    <input type="text" name="zxjd" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">中心纬度</label>                                <div class="layui-input-block">                                    <input type="text" name="zxwd" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md8">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">坐标系统</label>                                <div class="layui-input-block">                                    <input type="text" name="kjck" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo">                                <label class="layui-form-label">数据格式</label>                                <div class="layui-input-block">                                    <input type="text" name="sjgs" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">采集设备</label>                                <div class="layui-input-block">                                    <input type="text" name="cjsb" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">点云数目</label>                                <div class="layui-input-block">                                    <input type="text" name="dysm" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">目前流程</label>                                <div class="layui-input-block">                                    <input type="text" name="mqlc" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">数据类型</label>                                <div class="layui-input-block">                                    <input type="text" name="sjlx" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <label class="layui-form-label">备注</label>                    <div class="layui-input-block">                        <input type="text" name="bz" class="layui-input" readonly="readonly" />                    </div>                </div>            </form>        </div>        <!--工程设置-->        <!--<div class="layui-tab-item">            <form class="layui-form" style="margin-top:0px" lay-filter="datasetupviewform">                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">                    <legend>统计滤波参数设置</legend>                </fieldset>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">邻近点数</label>                                <div class="layui-input-block">                                    <input type="text" name="meank" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">离群点阈值</label>                                <div class="layui-input-block">                                    <input type="text" name="StddevMulThresh" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <label class="layui-form-label">设置时间</label>                    <div class="layui-input-block">                        <input type="text" name="szsj" class="layui-input" readonly="readonly" />                    </div>                </div>                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">                    <legend>FHFP-ICP配置参数</legend>                </fieldset>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">创建时间</label>                                <div class="layui-input-block">                                    <input type="text" name="cjsj" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">VoexlGrid体素大小</label>                                <div class="layui-input-block">                                    <input type="text" name="leafsize" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">最大迭代次数</label>                                <div class="layui-input-block">                                    <input type="text" name="maxIteration" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label" >表面法线/FPFH搜索范围半径</label>                                <div class="layui-input-block">                                    <input type="text" name="radiusSearch" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">                    <legend>提取点云边界方式</legend>                </fieldset>                <div class="layui-form-item">                    <label class="layui-form-label">边界方法</label>                    <div class="layui-input-block">                        <input type="text" name="bjff" class="layui-input" readonly="readonly" />                    </div>                </div>            </form>        </div>-->    </div></div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    form.render();
                }
                , end: function () {
                    projectinfoviewlayerindex = null;
                }
            });
        }

        //项目信息
        $.ajax({
            url: servicesurl + "/api/PointCloudProject/GetPointCloudDataInfo", type: "get", data: { "id": id, "cookie": document.cookie },
            success: function (data) {
                if (data == "") {
                    layer.msg("无点云时序数据信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    //清除项目信息
                    form.val("projectinfoviewform", {
                        "xmmc": ""
                        , "cjry": ""
                        , "cjsj": ""
                        , "region": ""
                        , "zxjd": ""
                        , "zxwd": ""
                        , "kjck": ""
                        , "sjgs": ""
                        , "cjsb": ""
                        , "sjlx": ""
                        , "dysm": ""
                        , "mqlc": ""
                        , "cjzq": ""
                        , "bz": ""
                    });
                }
                else {
                    //项目信息
                    var projectinfo = JSON.parse(data);
                    var SJGS, Device, MQLC, Type;
                    switch (projectinfo.SJGSid) {
                        case 0:
                            SJGS = "las";
                            break;
                        case 1:
                            SJGS = "pcd";
                            break;
                        case 2:
                            SJGS = "txt";
                            break;
                    }
                    switch (projectinfo.Deviceid) {
                        case 0:
                            Device = "无人机";
                            break;
                        case 1:
                            Device = "Lidar";
                            break;
 
                    }
                    switch (projectinfo.MQLCid) {
                        case 0:
                            MQLC = "未处理";
                            break;
                        case 1:
                            MQLC = "处理中";
                            break;
                        case 2:
                            MQLC = "处理完成";
                            break;
                    }
                    switch (projectinfo.Typeid) {
                        case 0:
                            Type = "源数据";
                            break;
                        case 1:
                            Type = "滤波数据";
                            break;
                        case 2:
                            Type = "配准数据";
                            break;
                        case 3:
                            Type = "变化数据";
                            break;
                    }
                    form.val("projectinfoviewform", {
                        "xmmc": projectinfo.XMMC
                        , "cjry": projectinfo.CJRY
                        , "cjsj": projectinfo.CJSJ
                        , "xmqy": projectinfo.Regionid
                        , "zxjd": projectinfo.ZXJD
                        , "zxwd": projectinfo.ZXWD
                        , "kjck": projectinfo.SRID
                        , "sjgs": SJGS
                        , "cjsb": Device
                        , "sjlx": Type
                        , "dysm": projectinfo.DYSM
                        , "mqlc": MQLC
                        , "bz": projectinfo.BZ
                    });
                }
            }, datatype: "json"
        });

        //工程设置信息
        //$.ajax({
        //    url: servicesurl + "/api/PointCloudProjectSetUp/GetPointCloudSetupInfo", type: "get", data: { "id": id, "cookie": document.cookie },
        //    success: function (data) {
        //        if (data == "") {
        //            layer.msg("无工程设置数据信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        //            //清除项目信息
        //            form.val("datasetupviewform", {
        //                "meank": ""
        //                , "StddevMulThresh": ""
        //                , "szsj": ""
        //                , "cjsj": ""
        //                , "leafsize": ""
        //                , "maxIteration": ""
        //                , "radiusSearch": ""
        //                , "bjff": ""
        //            });
        //        }
        //        else {
        //            //项目信息
        //            var setupinfo = JSON.parse(data);

        //            form.val("datasetupviewform", {
        //                "meank": setupinfo.StatisticoutlierPara.Meank
        //                , "StddevMulThresh": setupinfo.StatisticoutlierPara.StddevMulThresh
        //                , "szsj": setupinfo.StatisticoutlierPara.CJSJ
        //                , "cjsj": setupinfo.ICPPara.CJSJ
        //                , "leafsize": setupinfo.ICPPara.LeafSize
        //                , "maxIteration": setupinfo.ICPPara.MaxIteration
        //                , "radiusSearch": setupinfo.ICPPara.RadiusSearch
        //                , "bjff": setupinfo.ShapePara.BJFF
        //            });
        //        }
        //    }, datatype: "json"
        //});


    }
    else if (style == "edit") {
        //编辑项目
        if (projectinfoeditlayerindex == null) {
            projectinfoeditlayerindex = layer.open({
                type: 1
                , title: ['编辑项目', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['900px', '800px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--编辑项目--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:1px 0px">    <ul class="layui-tab-title">        <li class="layui-this">基本信息</li>        <li>工程设置</li>    </ul>    <div class="layui-tab-content" style="margin:0px 0px">        <!--基本信息-->        <div class="layui-tab-item layui-show">            <form class="layui-form" style="margin-top:0px" lay-filter="pointcloudprojectedit">                <div class="layui-form-item">                    <label class="layui-form-label" style="margin-top:10px">所属项目</label>                    <div class="layui-input-block">                        <input type="text" name="xmmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">采集人员</label>                                <div class="layui-input-block">                                    <input type="text" name="cjry" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo">                                <label class="layui-form-label">采集时间</label>                                <div class="layui-input-block">                                    <input type="text" name="cjsj" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">项目区域</label>                                <div class="layui-input-block">                                    <input type="text" name="xmqy" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">中心经度</label>                                <div class="layui-input-block">                                    <input type="text" name="zxjd" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">中心纬度</label>                                <div class="layui-input-block">                                    <input type="text" name="zxwd" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md8">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">坐标系统</label>                                <div class="layui-input-block">                                    <input type="text" name="kjck" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo">                                <label class="layui-form-label">数据格式</label>                                <div class="layui-input-block">                                    <input type="text" name="sjgs" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md4">                            <div class="grid-demo">                                <label class="layui-form-label">采集设备</label>                                <div class="layui-input-block">                                    <input type="text" name="cjsb" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">数据类型</label>                                <div class="layui-input-block">                                    <input type="text" name="sjlx" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">点云数目</label>                                <div class="layui-input-block">                                    <input type="text" name="dysm" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">目前流程</label>                                <div class="layui-input-block">                                    <input type="text" name="mqlc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">采集周期</label>                                <div class="layui-input-block">                                    <input type="text" name="cjzq" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <label class="layui-form-label">备注</label>                    <div class="layui-input-block">                        <input type="text" name="bz" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                    </div>                </div>                <div class="layui-form-item" style="margin-top:5px">                    <div style="position:absolute;right:5px;">                        <button type="submit" class="layui-btn" lay-submit="" lay-filter="editpointcloudprojectinfosubmit" style="width:120px">保存</button>                    </div>                </div>            </form>        </div>        <!--工程设置-->        <div class="layui-tab-item">            <form class="layui-form" style="margin-top:0px" lay-filter="pointcloudprojectsetedit">                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">                    <legend>统计滤波参数设置</legend>                </fieldset>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">邻近点数</label>                                <div class="layui-input-block">                                    <input type="text" name="meank" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">离群点阈值</label>                                <div class="layui-input-block">                                    <input type="text" name="StddevMulThresh" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <label class="layui-form-label">设置时间</label>                    <div class="layui-input-block">                        <input type="text" name="szsj" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                    </div>                </div>                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">                    <legend>FHFP-ICP配置参数</legend>                </fieldset>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">创建时间</label>                                <div class="layui-input-block">                                    <input type="text" name="cjsj" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">VoexlGrid体素大小</label>                                <div class="layui-input-block">                                    <input type="text" name="leafsize" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">最大迭代次数</label>                                <div class="layui-input-block">                                    <input type="text" name="maxIteration" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">表面法线/FPFH搜索范围半径</label>                                <div class="layui-input-block">                                    <input type="text" name="radiusSearch" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                    </div>                </div>                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">                    <legend>提取点云边界方式</legend>                </fieldset>                <div class="layui-form-item">                    <label class="layui-form-label">边界方法</label>                    <div class="layui-input-block">                        <input type="text" name="bjff" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                    </div>                </div>            </form>        </div>    </div></div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    //项目信息
                    $.ajax({
                        url: servicesurl + "/api/PointCloudProject/GetPointCloudDataInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                        success: function (data) {
                            if (data == "") {
                                layer.msg("无点云时序数据信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                //清除项目信息
                                form.val("projectinfoviewform", {
                                    "xmmc": ""
                                    , "cjry": ""
                                    , "cjsj": ""
                                    , "region": ""
                                    , "zxjd": ""
                                    , "zxwd": ""
                                    , "kjck": ""
                                    , "sjgs": ""
                                    , "cjsb": ""
                                    , "sjlx": ""
                                    , "dysm": ""
                                    , "mqlc": ""
                                    , "cjzq": ""
                                    , "bz": ""
                                });
                            }
                            else {
                                //项目信息
                                var projectinfo = JSON.parse(data);

                                form.val("pointcloudprojectedit", {
                                    "xmmc": projectinfo.XMMC
                                    , "cjry": projectinfo.CJRY
                                    , "cjsj": projectinfo.CJSJ
                                    , "xmqy": projectinfo.Regionid
                                    , "zxjd": projectinfo.ZXJD
                                    , "zxwd": projectinfo.ZXWD
                                    , "kjck": projectinfo.SRID
                                    , "sjgs": projectinfo.SJGSid
                                    , "cjsb": projectinfo.Deviceid
                                    , "sjlx": projectinfo.Typeid
                                    , "dysm": projectinfo.DYSM
                                    , "mqlc": projectinfo.MQLCid
                                    , "cjzq": projectinfo.CJZQ
                                    , "bz": projectinfo.BZ
                                });

                            }
                        }, datatype: "json"
                    });

                    ////更新项目信息
                    form.on('submit(editpointcloudprojectinfosubmit)', function (data) {
                        data.field.id = id;
                        data.field.cookie = document.cookie;

                        $.ajax({
                            url: servicesurl + "/api/PointCloudProject/UpdatePointCloudProjectInfo", type: "put", data: data.field,
                            success: function (result) {
                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            }, datatype: "json"
                        });
                        return false;
                    });

                    //工程设置信息
                    $.ajax({
                        url: servicesurl + "/api/PointCloudProjectSetUp/GetPointCloudSetupInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                        success: function (data) {
                            if (data == "") {
                                layer.msg("无工程设置数据信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                //清除项目信息
                                form.val("pointcloudprojectsetedit", {
                                    "meank": ""
                                    , "StddevMulThresh": ""
                                    , "szsj": ""
                                    , "cjsj": ""
                                    , "leafsize": ""
                                    , "maxIteration": ""
                                    , "radiusSearch": ""
                                    , "bjff": ""
                                });
                            }
                            else {
                                //项目信息
                                var setupinfo = JSON.parse(data);

                                form.val("pointcloudprojectsetedit", {
                                    "meank": setupinfo.StatisticoutlierPara.Meank
                                    , "StddevMulThresh": setupinfo.StatisticoutlierPara.StddevMulThresh
                                    , "szsj": setupinfo.StatisticoutlierPara.CJSJ
                                    , "cjsj": setupinfo.ICPPara.CJSJ
                                    , "leafsize": setupinfo.ICPPara.LeafSize
                                    , "maxIteration": setupinfo.ICPPara.MaxIteration
                                    , "radiusSearch": setupinfo.ICPPara.RadiusSearch
                                    , "bjff": setupinfo.ShapePara.BJFF
                                });
                            }
                        }, datatype: "json"
                    });

                }
                , end: function () {
                    projectinfoeditlayerindex = null;
                }
            });
        }
    }
};

//上传文件
function UploadData() {

    if ((addpointclouddatalayerindex != null) || (addpointclouddatalayerindex != undefined)) {
        layer.close(addpointclouddatalayerindex);
    }
    else {
        if (addpointclouddatalayerindex == null) {
            addpointclouddatalayerindex = layer.open({
                type: 1
                , title: ['上传点云数据', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['800px', '400px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--上传点云数据--><form class="layui-form" style="margin-top:5px;margin-right:5px;" lay-filter="uploaddataform">    <div class="layui-form-item">        <div class="layui-row">            <div class="layui-col-md6">                <div class="grid-demo grid-demo-bg1">                    <label class="layui-form-label">上传项目</label>                    <div class="layui-input-block">                        <select id="projectid" name="project" lay-filter="projectfilter">                            <option value="">请选择</option>                        </select>                    </div>                </div>            </div>            <div class="layui-col-md6">                <div class="grid-demo">                    <label class="layui-form-label">项目区域</label>                    <div class="layui-input-block">                        <select id="regionid" name="region" lay-filter="regionidfilter">                            <option value="">请选择</option>                        </select>                    </div>                </div>            </div>        </div>    </div>    <div class="layui-form-item">        <div class="layui-row">            <div class="layui-col-md6" style="width:50%">                <div class="grid-demo grid-demo-bg1">                    <label class="layui-form-label">坐标系统</label>                    <div class="layui-input-block">                        <select id="kjckid" name="kjck" lay-verify="required">                            <option value="">请选择</option>                        </select>                    </div>                </div>            </div>            <div class="layui-col-md6">                <div class="grid-demo grid-demo-bg1">                    <div class="layui-inline">                        <label class="layui-form-label">采集时间</label>                        <div class="layui-input-inline" style="width:250px;">                            <input type="text" id="cjsjid" name="cjsj" lay-verify="date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" />                        </div>                    </div>                </div>            </div>        </div>    </div>    <div class="layui-form-item">        <div class="layui-row">            <div class="layui-col-md6">                <div class="grid-demo grid-demo-bg1">                    <label class="layui-form-label">采集人员</label>                    <div class="layui-input-block">                        <input type="text" id="people" name="people" lay-verify="required" autocomplete="off" placeholder="请输入" class="layui-input" />                    </div>                </div>            </div>            <div class="layui-col-md6">                <div class="grid-demo grid-demo-bg1">                    <label class="layui-form-label">采集设备</label>                    <div class="layui-input-block">                        <select id="deviceid" name="type">                            <option value="">请选择</option>                            <option value="0">无人机</option>                            <option value="1">Lidar</option>                        </select>                    </div>                </div>            </div>        </div>    </div>    <div class="layui-form-item">        <div class="layui-row">            <div class="layui-col-md6" style="width:50%">                <div class="grid-demo grid-demo-bg1">                    <label class="layui-form-label">数据格式</label>                    <div class="layui-input-block">                        <select id="sjgsid" name="type">                            <option value="">请选择</option>                            <option value="0">las</option>                            <option value="1">pcd</option>                            <option value="2">txt</option>                        </select>                    </div>                </div>            </div>        </div>    </div>    <div class="layui-form-item">        <label class="layui-form-label">备注</label>        <div class="layui-input-block">            <input type="text" id ="bz"name="bz" autocomplete="off" placeholder="请输入" class="layui-input" />        </div>    </div>    <div class="layui-form-item" style="margin-top:30px">        <div style="position:absolute;left:50px;">            <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" id="selectdata" style="width:100px">选择文件</button>            <button type="button" class="layui-btn layui-btn-green layui-btn-sm" id="uploaddata" style="width:100px">上传</button>        </div>    </div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    if (layerlist.PCloudProjectList.length > 0) {
                        for (var i in layerlist.PCloudProjectList) {
                            document.getElementById("projectid").innerHTML += '<option value="' + layerlist.PCloudProjectList[i].Id + '">' + layerlist.PCloudProjectList[i].XMMC + '</option>';
                        }
                    }

                    if (srids.length > 0) {
                        for (var i in srids) {
                            //if (srids[i].name == "China Geodetic Coordinate System 2000") {
                            document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '" selected>' + srids[i].name + '</option>';
                            //}
                        }
                    }

                    //渲染开始时间&结束时间
                    date.render({
                        elem: '#cjsjid'
                    });
                    form.render();
                    form.render('select');

                    // 联动
                    layui.use('form', function () {

                        form.on('select(projectfilter)', function (data) {
                            getRegion(data);
                        });
                    });



                    layui.use('upload', function (obj) {
                        var $ = layui.jquery, upload = layui.upload;

                        //选完文件后不自动上传
                        upload.render({
                            elem: '#selectdata'
                            , url: servicesurl + "/api/PointCloudUpload/UploadData" //改成您自己的上传接口
                            , auto: false
                            , accept: 'file'                  //上传文件类型
                            , bindAction: '#uploaddata'
                            , before: function () {//携带额外的数据
                                this.data = {
                                    "dataid": 1,
                                    "projectid": $('#projectid').val(),
                                    "rgionid": $('#regionid').val(),
                                    "kjck": $('#kjckid').val(),
                                    "cjsj": $('#cjsjid').val(),
                                    "people": $('#people').val(),
                                    "deviceid": $('#deviceid').val(),
                                    "sjgsid": $('#sjgsid').val(),
                                    "bz": $('#bz').val(),
                                    "cookie": document.cookie
                                }
                            }
                            , done: function (result) {
                                if (isNaN(parseInt(JSON.parse(result).code) == 0)) {
                                    //创建失败
                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                }
                                else {
                                    layer.msg("创建成功。", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                    //关闭
                                    layer.close(regionaddlayerindex);

                                    //刷新项目列表
                                    PointCloudProjectList();
                                }
                            }, datatype: "json"
                        });
                    });

                }
            });
        }
    }



}
// 获取项目区域
function getRegion(data) {
    var params = {
        buildingId: data.value
    }
    //将项目区域添加到下拉框中
    $.ajax({
        url: servicesurl + "/api/PointCloudParameter/GetPointCloudRegion",
        type: "get",
        dataType: 'json',
        data: { "projectid": params.buildingId },
        success: function (data) {
            $("#regionid").empty();//清空下拉框的值
            var regionlist = JSON.parse(data);
            if (regionlist.length > 0) {
                for (var i in regionlist) {
                    document.getElementById("regionid").innerHTML += '<option value="' + regionlist[i].Id + '">' + regionlist[i].RegionName + '</option>';
                }
            }
            layui.form.render("select");//重新渲染 固定写法
        }
    });
};

//创建项目
$("#projectadd").on("click", function () {
    //创建项目
    if (((projectinfoviewlayerindex == null) && (projectinfoeditlayerindex == null) && (projectinfoaddlayerindex == null))) {
        AddProject();
    }
    else {
        layer.confirm('是否打开新项目?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
            CloseProjectinfoLayer();
            AddProject();
            layer.close(index);
        });
    }
});
//创建项目区域
$("#startupload").on("click", function () {
    AddRegion();
});

//上传数据
$("#selectpcdata").on("click", function () {
    UploadData();
});

//创建项目提示
$("#projectadd").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('创建项目', '#projectadd', {
            tips: [2, '#78BA32']
        });
    }
});
$("#projectadd").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});

//创建项目区域提示
$("#startupload").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('新增项目区域', '#startupload', {
            tips: [2, '#78BA32']
        });
    }
});
$("#startupload").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});

//上传提示
$("#selectpcdata").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('上传点云', '#selectpcdata', {
            tips: [2, '#78BA32']
        });
    }
});
$("#selectpcdata").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});

//生成随机数
function NewGuid() {
    return ((((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1));
}

//清除临时图形
function cleartemp() {
    var count = 0;
    while (count < 40) {
        for (var i = 0; i < viewer.entities._entities._array.length; i++) {
            if ((viewer.entities._entities._array[i]._name) && ((viewer.entities._entities._array[i]._name.indexOf("ptstemp") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("positontemp") > -1)


            )) {
                viewer.entities.remove(viewer.entities._entities._array[i]);
            }
        }
        count++;
    }
}

//加载项目区域边界
function LoadRegionalBoundary(currentprojectid) {

    for (var i in layerlist.PCloudProjectList) {
        var regionalboundary = [];
        var regionids = [];
        if (layerlist.PCloudProjectList[i].Id.toString() == currentprojectid) {
            for (var j in layerlist.PCloudProjectList[i].RegionList) {

                if (layerlist.PCloudProjectList[i].RegionList[j].RegionlBoundary != "") {
                    regionalboundary.push(JSON.parse(layerlist.PCloudProjectList[i].RegionList[j].RegionlBoundary));
                    regionids.push(layerlist.PCloudProjectList[i].RegionList[j].Id);
                }


            }

        }
        if (regionalboundary.length > 0) {
            for (var i in regionalboundary) {


                viewer.entities.add({
                    id: "region_" + regionids[i],
                    name: "region_" + regionids[i],
                    polyline: {
                        positions: regionalboundary[i],
                        width: 2,
                        arcType: Cesium.ArcType.RHUMB,
                        material: Cesium.Color.fromCssColorString('#00FF00'),
                        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                            color: Cesium.Color.fromCssColorString('#00FF00'),
                        }),
                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 3000),

                    }
                });
            }

        }
    }

}

//计算产状
function getChanzhuang(positList) {
    points = positList;
    var cartesian3s = [];
    //var newcartesian3s = [];
    var bSum = 0;
    var lSum = 0;
    var hSum = 0;
    var minx = points[0].x;
    var miny = points[0].y;
    var minz = points[0].z;
    var maxHeight = Cesium.Cartographic.fromCartesian(points[0]).height;
    var minHeight = Cesium.Cartographic.fromCartesian(points[0]).height;
    for (var i = 0; i < points.length; i++) {
        var cartesian3 = points[i];
        cartesian3s.push(cartesian3);
        if (points[i].x < minx) {
            minx = points[i].x;
        }
        if (points[i].y < miny) {
            miny = points[i].y;
        }
        if (points[i].z < minz) {
            minz = points[i].z;
        }
        var rblh = Cesium.Cartographic.fromCartesian(points[i]);
        bSum += rblh.latitude * 180 / Math.PI;
        lSum += rblh.longitude * 180 / Math.PI;
        hSum += rblh.height;
        if (rblh.height > maxHeight) {
            maxHeight = rblh.height;
        }
        if (rblh.height < minHeight) {
            minHeight = rblh.height;
        }
    }
    var bAvg = bSum * Math.PI / 180 / points.length;
    var lAvg = lSum * Math.PI / 180 / points.length;
    var hAvg = hSum / points.length;

    var opblh = new Cesium.Cartographic(lAvg, bAvg, hAvg);
    //转换后的坐标原点
    var opxyz = Cesium.Cartesian3.fromDegrees(opblh.longitude, opblh.latitude, opblh.height);





    //var ccc = 0;     调试用
    var cartesian3f = [];
    //cartesian3f = cartesian3s; //调试用
    for (var i = 0; i < cartesian3s.length; i++) {
        var newx = -Math.sin(lAvg) * (cartesian3s[i].x - opxyz.x) + Math.cos(lAvg) * (cartesian3s[i].y - opxyz.y);
        var newy = -Math.sin(bAvg) * Math.cos(lAvg) * (cartesian3s[i].x - opxyz.x) - Math.sin(bAvg) * Math.sin(lAvg) * (cartesian3s[i].y - opxyz.y) + Math.cos(bAvg) * (cartesian3s[i].z - opxyz.z);
        var newz = Math.cos(bAvg) * Math.cos(lAvg) * (cartesian3s[i].x - opxyz.x) + Math.cos(bAvg) * Math.sin(lAvg) * (cartesian3s[i].y - opxyz.y) + Math.sin(bAvg) * (cartesian3s[i].z - opxyz.z);
        var cartesian33 = new Cesium.Cartesian3(newx, newy, newz);
        //ccc = newx;
        cartesian3f.push(cartesian33);
    }

    //求取产状要素
    var qingXiang = 0;
    var qingJiao = 0;
    //设拟合面的表达式为Ax+By+Cz+D = 0
    var A = (cartesian3f[1].y - cartesian3f[0].y) * (cartesian3f[2].z - cartesian3f[0].z) - (cartesian3f[1].z - cartesian3f[0].z) * (cartesian3f[2].y - cartesian3f[0].y);
    var B = (cartesian3f[1].z - cartesian3f[0].z) * (cartesian3f[2].x - cartesian3f[0].x) - (cartesian3f[1].x - cartesian3f[0].x) * (cartesian3f[2].z - cartesian3f[0].z);
    var C = (cartesian3f[1].x - cartesian3f[0].x) * (cartesian3f[2].y - cartesian3f[0].y) - (cartesian3f[1].y - cartesian3f[0].y) * (cartesian3f[2].x - cartesian3f[0].x);

    var nx = A / Math.sqrt(A * A + B * B + C * C);
    var ny = B / Math.sqrt(A * A + B * B + C * C);
    var nz = C / Math.sqrt(A * A + B * B + C * C);

    if (nz == 0) {
        qingJiao = 0.5 * Math.PI;
        if (nx < 0) {
            qingXiang = 2 * Math.PI - Math.acos(ny / Math.sqrt(nx * nx + ny * ny));
        }
        else {
            qingXiang = Math.acos(ny / Math.sqrt(nx * nx + ny * ny));
        }
    }
    else if (nz > 0) {
        qingJiao = Math.acos(nz);
        if (nx < 0) {
            qingXiang = 2 * Math.PI - Math.acos(ny / Math.sqrt(nx * nx + ny * ny));
        }
        else {
            qingXiang = Math.acos(ny / Math.sqrt(nx * nx + ny * ny));
        }
    }
    else {
        qingJiao = Math.acos(-nz);
        if (nx < 0) {
            qingXiang = 2 * Math.PI - Math.acos(-ny / Math.sqrt(nx * nx + ny * ny));
        }
        else {
            qingXiang = Math.acos(-ny / Math.sqrt(nx * nx + ny * ny));
        }
    }
    qingXiang = qingXiang * 180 / Math.PI;
    qingJiao = qingJiao * 180 / Math.PI;
    var tenp = {};
    tenp.qingXiang = qingXiang;
    tenp.qingJiao = qingJiao;
    return tenp;
}



