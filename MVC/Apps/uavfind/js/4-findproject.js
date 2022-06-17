//新建巡查项目
function AddFindProject() {
    if (findprojectinfoaddlayerindex == null) {
        findprojectinfoaddlayerindex = layer.open({
            type: 1
            , title: ['新建项目', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['500px', '490px']
            , shade: 0
            , offset: 'auto'
            , closeBtn: 1
            , maxmin: true
            , moveOut: true
            , scrollbar: false
            , resize: false
            , content: '<div style="overflow:hidden;"><!--创建项目--><form class="layui-form" style="margin-top:5px;margin-right:20px;" lay-filter="addFindprojectform"><div class="layui-form-item"><label class="layui-form-label">项目名称</label><div class="layui-input-block"><input type="text" name="find_xmmc_add" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">项目简称</label><div class="layui-input-block"><input type="text" name="find_xmjc_add" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">行政区划</label><div class="layui-input-block"><select id="province1id" name="find_province_add" lay-verify="required"><option value="">省/市</option><option value="0">重庆市</option></select></div></div><div class="layui-form-item"><label class="layui-form-label"></label><div class="layui-input-block"><select id="district1id_add" name="find_district_add" lay-verify="required"><option value="">区/县</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">项目位置</label><div class="layui-input-block"><input type="text" id="find_xmwz_add" name="find_xmwz_add" autocomplete="off" placeholder="详细位置(乡镇村)" class="layui-input" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md9"><div class="layui-form-item"><label class="layui-form-label">中心经度</label><div class="layui-input-block"><input type="text" name="find_zxjd_add" autocomplete="off" placeholder="请输入" lay-verify="required|number" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">中心纬度</label><div class="layui-input-block"><input type="text" name="find_zxwd_add" autocomplete="off" placeholder="请输入" lay-verify="required|number" class="layui-input" /></div></div></div><div class="layui-col-md3"><div class="grid-demo" style="width:90%;height:90%;margin-left:10px;"><div class="layui-input-inline" style="width:100%;height:100%;"><button type="button" id="map_position_add" class="layui-btn layui-btn-primary" title="地图选点" style="width:100%;height:100%;border-radius:10px;"><svg t="1641451887073" class="icon" style="position:relative;top:8px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7602" width="100%" height="100%"><path d="M512 621.696l-150.848-150.826667 30.165333-30.186666L512 561.365333l120.682667-120.682666 30.165333 30.165333L512 621.696z m150.848-150.826667l-30.165333-30.186666a170.666667 170.666667 0 1 0-241.365334 0L361.173333 470.826667c-83.306667-83.306667-83.306667-218.389333 0-301.696 83.306667-83.306667 218.389333-83.306667 301.696 0 83.306667 83.306667 83.306667 218.389333 0 301.696zM512 362.666667a42.666667 42.666667 0 1 1 0-85.333334 42.666667 42.666667 0 0 1 0 85.333334z m-134.186667 365.290666a21.333333 21.333333 0 1 1 30.144-30.165333l110.634667 110.613333L857.664 469.333333H768v-42.666666h106.538667A63.936 63.936 0 0 1 938.666667 490.474667V874.88A64 64 0 0 1 874.602667 938.666667H149.397333A63.914667 63.914667 0 0 1 85.333333 874.858667V490.453333A63.808 63.808 0 0 1 149.461333 426.666667H256v42.666666H149.461333A21.141333 21.141333 0 0 0 128 490.474667v302.208l200.042667-200.042667a21.205333 21.205333 0 0 1 30.058666 0.128c8.32 8.32 8.192 21.973333 0.106667 30.037333L130.474667 850.56a21.333333 21.333333 0 0 1-2.474667 2.133333v22.186667c0 11.669333 9.536 21.141333 21.397333 21.141333h396.437334l-168.042667-168.042666zM874.581333 896A21.333333 21.333333 0 0 0 896 874.858667V491.050667a21.973333 21.973333 0 0 1-1.984 2.261333L548.757333 838.592l54.186667 54.186667c1.002667 1.002667 1.898667 2.090667 2.666667 3.221333h269.013333z" fill="#8a8a8a" p-id="7603"></path></svg></button></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label">项目时间</label><div class="layui-input-block"><input type="text" id="xmsjid" name="find_xmsj_add" lay-verify="required|date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label><div class="layui-input-block"><input type="text" name="find_bz_add" placeholder="请输入" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item" style="margin-top:10px"><div style="text-align:center"><button type="submit" class="layui-btn" lay-submit="" lay-filter="addFindprojectsubmit" style="width:20%;border-radius:5px;">提交</button><button type="reset" id="find_reset_add" class="layui-btn layui-btn-primary" style="width:100px;border-radius:5px;">重置</button></div></div></form></div>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                //监听事件
                $("#map_position_add").on("click", function () {
                    mapPosition("add");//地图选点
                });
                $("#find_reset_add").on("click", function () {
                    ClearMapPoint();//清除临时点
                });

                depthTestAgainstTerrain = viewer.scene.globe.depthTestAgainstTerrain;//记录当前深度检测值

                if (xjxzqs.length > 0) {
                    for (var i in xjxzqs) {
                        document.getElementById("district1id_add").innerHTML += '<option value="' + xjxzqs[i].value + '">' + xjxzqs[i].name + '</option>';
                    }
                }

                date.render({ elem: '#xmsjid' });
                form.render('select');
                form.render();

                for (var i = 0; i < document.getElementsByClassName("layui-anim layui-anim-upbit").length; i++) {
                    document.getElementsByClassName("layui-anim layui-anim-upbit")[i].style.maxHeight = "250px";
                }

                //创建巡查项目
                form.on('submit(addFindprojectsubmit)', function (data) {
                    loadlayerindex = layer.load(1, { offset: 'auto', area: ['37px', '37px'], zIndex: layer.zIndex, shade: [0.5, '#393D49'], success: function (layero) { layer.setTop(layero); } });
                    data.field.cookie = document.cookie;

                    $.ajax({
                        url: servicesurl + "/api/FindProject/AddFindProject", type: "post", data: data.field,
                        success: function (result) {
                            CloseLayer(loadlayerindex);

                            var info = JSON.parse(result);
                            if (info.code == 1) {
                                var findproject = JSON.parse(info.data);

                                var newproject = new Object;
                                newproject.id = findproject.Id;
                                newproject.title = findproject.XMMC;
                                newproject.type = "findproject";
                                newproject.data = findproject;
                                newproject.nodeOperate = true;
                                newproject.spread = false;

                                var newprojectchild = [];
                                var models = new Object;
                                models.id = newproject.id;
                                models.title = "实景模型";
                                models.spread = true;
                                newprojectchild.push(models);
                                var routes = new Object;
                                routes.id = newproject.id;
                                routes.title = "巡查航线";
                                routes.spread = true;
                                newprojectchild.push(routes);
                                var targets = new Object;
                                targets.id = newproject.id;
                                targets.title = "巡查目标";
                                targets.spread = true;
                                newprojectchild.push(targets);

                                newproject.children = newprojectchild;

                                var newprojectlist = [];
                                newprojectlist.push(newproject);
                                for (var i in findprojectlist) {
                                    if (currentprojectid == null) {
                                        newprojectlist.push(findprojectlist[i]);
                                    }
                                    else {
                                        for (var j in findprojectlist[i].children) {
                                            if (findprojectlist[i].children[j].title == "实景模型" || findprojectlist[i].children[j].title == "巡查航线" || findprojectlist[i].children[j].title == "巡查目标") {
                                                if (findprojectlist[i].children[j].children != undefined && findprojectlist[i].children[j].children.length > 0) {
                                                    for (var k in findprojectlist[i].children[j].children) {
                                                        findprojectlist[i].children[j].children[k].checked = false;
                                                    }
                                                }
                                            }
                                        }
                                        newprojectlist.push(findprojectlist[i]);
                                    }
                                }
                                findprojectlist = newprojectlist;

                                //清除模型
                                if (curtileset != null) {
                                    viewer.scene.primitives.remove(curtileset);//清除模型
                                    curtileset = null;
                                    currentmodelid = null;
                                }

                                currentprojectid = findproject.Id;//赋值当前项目id
                                currentprojecttitle = findproject.XMMC;//赋值当前项目标题

                                //添加项目图形
                                var newfindprojectentity = new Cesium.Entity({
                                    id: "PROJECTCENTER_" + findproject.Id,
                                    position: Cesium.Cartesian3.fromDegrees(findproject.ZXJD, findproject.ZXWD),
                                    billboard: {
                                        image: '../../Resources/img/uavfind/findprojecticon.png',
                                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                        width: 40,
                                        height: 40,
                                    }
                                });
                                projectentities.push(newfindprojectentity);
                                AddEntityInViewer(newfindprojectentity);

                                var newfindprojectentitylabel = new Cesium.Entity({
                                    id: "PROJECTCENTER_LABEL_" + findproject.Id,
                                    position: Cesium.Cartesian3.fromDegrees(findproject.ZXJD, findproject.ZXWD),
                                    label: {
                                        text: findproject.XMMC,
                                        font: '20px Times New Roman',
                                        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                        pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                        scaleByDistance: new Cesium.NearFarScalar(90000, 1, 200000, 0)
                                    }
                                });
                                projectentities.push(newfindprojectentitylabel);
                                AddEntityInViewer(newfindprojectentitylabel);

                                isReloadTree = true;//标记重载
                                MarkCurrentProject();
                                isReloadTree = false;//重载后还原

                                layer.close(findprojectinfoaddlayerindex);
                            }

                            layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }, datatype: "json"
                    });

                    return false;
                });
            }
            , end: function () {
                findprojectinfoaddlayerindex = null;
                ClearMapPoint();
                viewer.scene.globe.depthTestAgainstTerrain = depthTestAgainstTerrain;
            }
        });
    }
};

//编辑巡查项目
function EditFindProject(findprojectdata) {
    if (findprojectinfoeditlayerindex != null) {
        EditFindProjectHelper();
    }
    else {
        findprojectinfoeditlayerindex = layer.open({
            type: 1
            , title: ['编辑项目', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['500px', '543px']
            , shade: 0
            , offset: 'auto'
            , closeBtn: 1
            , maxmin: true
            , moveOut: true
            , resize: false
            , content: '<!--编辑项目--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:1px 0px"><ul class="layui-tab-title"><li class="layui-this" style="width:44%;">项目信息</li><li style="width:44%;">实景模型</li></ul><div class="layui-tab-content" style="margin:0px;padding-left:0px;"><!--项目信息--><div class="layui-tab-item layui-show"><form class="layui-form" style="margin-top:5px;margin-right:20px;" lay-filter="editFindprojectinfoform"><div class="layui-form-item"><label class="layui-form-label">项目名称</label><div class="layui-input-block"><input type="text" name="find_xmmc_edit" autocomplete="off" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">项目简称</label><div class="layui-input-block"><input type="text" name="find_xmjc_edit" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">项目编码</label><div class="layui-input-block"><input type="text" name="find_xmbm_edit" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">行政区划</label><div class="layui-input-block"><input type="text" name="find_xzqh_edit" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><div class="grid-demo"><label class="layui-form-label">项目位置</label><div class="layui-input-block"><input type="text" name="find_xmwz_edit" autocomplete="off" class="layui-input" /></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md9"><div class="layui-form-item"><div class="grid-demo"><label class="layui-form-label">中心经度</label><div class="layui-input-block"><input type="text" name="find_zxjd_edit" autocomplete="off" lay-verify="required|number" class="layui-input" /></div></div></div><div class="layui-form-item"><div class="grid-demo"><label class="layui-form-label">中心纬度</label><div class="layui-input-block"><input type="text" name="find_zxwd_edit" autocomplete="off" lay-verify="required|number" class="layui-input" /></div></div></div></div><div class="layui-col-md3"><div class="grid-demo" style="width:100%;height:100%;margin-left:10px;"><div class="layui-input-inline" style="width:100%;height:100%;"><button type="button" id="map_position_edit" class="layui-btn layui-btn-primary" title="地图选点" style="width:90%;height:90%;border-radius:10px;"><svg t="1641451887073" class="icon" style="position:relative;top:8px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7602" width="100%" height="100%"><path d="M512 621.696l-150.848-150.826667 30.165333-30.186666L512 561.365333l120.682667-120.682666 30.165333 30.165333L512 621.696z m150.848-150.826667l-30.165333-30.186666a170.666667 170.666667 0 1 0-241.365334 0L361.173333 470.826667c-83.306667-83.306667-83.306667-218.389333 0-301.696 83.306667-83.306667 218.389333-83.306667 301.696 0 83.306667 83.306667 83.306667 218.389333 0 301.696zM512 362.666667a42.666667 42.666667 0 1 1 0-85.333334 42.666667 42.666667 0 0 1 0 85.333334z m-134.186667 365.290666a21.333333 21.333333 0 1 1 30.144-30.165333l110.634667 110.613333L857.664 469.333333H768v-42.666666h106.538667A63.936 63.936 0 0 1 938.666667 490.474667V874.88A64 64 0 0 1 874.602667 938.666667H149.397333A63.914667 63.914667 0 0 1 85.333333 874.858667V490.453333A63.808 63.808 0 0 1 149.461333 426.666667H256v42.666666H149.461333A21.141333 21.141333 0 0 0 128 490.474667v302.208l200.042667-200.042667a21.205333 21.205333 0 0 1 30.058666 0.128c8.32 8.32 8.192 21.973333 0.106667 30.037333L130.474667 850.56a21.333333 21.333333 0 0 1-2.474667 2.133333v22.186667c0 11.669333 9.536 21.141333 21.397333 21.141333h396.437334l-168.042667-168.042666zM874.581333 896A21.333333 21.333333 0 0 0 896 874.858667V491.050667a21.973333 21.973333 0 0 1-1.984 2.261333L548.757333 838.592l54.186667 54.186667c1.002667 1.002667 1.898667 2.090667 2.666667 3.221333h269.013333z" fill="#8a8a8a" p-id="7603"></path></svg></button></div></div></div></div></div><div class="layui-form-item"><div class="grid-demo"><label class="layui-form-label">项目时间</label><div class="layui-input-block"><input type="text" id="xmsjid" name="find_xmsj_edit" lay-verify="date" placeholder="YYYY-MM-DD" class="layui-input" /></div></div></div><div class="layui-form-item"><label class="layui-form-label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label><div class="layui-input-block"><input type="text" name="find_bz_edit" class="layui-input"></div></div><div class="layui-form-item" style="margin-top:10px"><div style="text-align:center"><button type="submit" class="layui-btn" lay-submit="" lay-filter="editFindprojectinfosubmit" style="width:100px;border-radius:5px;">保存</button></div></div></form></div><!--实景模型--><div class="layui-tab-item"><div class="layui-card-body" style="padding:0px 0px;"><table id="find-project-model" lay-filter="find-project-model"></table><script type="text/html" id="find-project-model-add"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm" style="font-size:14px;width:150px" lay-event="find-project-model-add">添加实景模型</button></div></script><script type="text/html" id="table-toolbar-find"><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="modeldel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div></div></div>'
            , success: function (layero) {
                layer.setTop(layero);
                //监听事件
                $("#map_position_edit").on("click", function () {
                    mapPosition("edit");//地图选点
                });

                EditFindProjectHelper();
                //更新项目
                form.on('submit(editFindprojectinfosubmit)', function (data) {
                    loadlayerindex = layer.load(1, { offset: 'auto', area: ['37px', '37px'], zIndex: layer.zIndex, shade: [0.5, '#393D49'], success: function (layero) { layer.setTop(layero); } });
                    data.field.id = findprojectdata.Id;
                    data.field.cookie = document.cookie;

                    $.ajax({
                        url: servicesurl + "/api/FindProject/UpdateFindProject", type: "put", data: data.field,
                        success: function (result) {
                            CloseLayer(loadlayerindex);
                            var info = JSON.parse(result);
                            if (info.code == 1) {
                                var modifyfindproject = JSON.parse(info.data);
                                if (modifyfindproject.Id == currentprojectid) {
                                    currentprojecttitle = modifyfindproject.XMMC;
                                }

                                for (var i in findprojectlist) {
                                    if (findprojectlist[i].id == modifyfindproject.Id) {
                                        findprojectlist[i].title = modifyfindproject.XMMC;
                                        findprojectlist[i].data = modifyfindproject;
                                        break;
                                    }
                                }

                                isReloadTree = true;//标记重载
                                MarkCurrentProject();
                                isReloadTree = false;//重载后还原

                                for (var i in projectentities) {
                                    if (projectentities[i].id == ("PROJECTCENTER_" + modifyfindproject.Id)) {
                                        projectentities[i].position = Cesium.Cartesian3.fromDegrees(modifyfindproject.ZXJD, modifyfindproject.ZXWD);
                                    }
                                    if (projectentities[i].id == ("PROJECTCENTER_LABEL_" + modifyfindproject.Id)) {
                                        projectentities[i].label.text = modifyfindproject.XMMC;
                                        projectentities[i].position = Cesium.Cartesian3.fromDegrees(modifyfindproject.ZXJD, modifyfindproject.ZXWD);
                                    }
                                }

                                layer.close(findprojectinfoeditlayerindex);  //关闭模块
                            }
                            layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }, datatype: "json"
                    });

                    return false;
                });

                //项目关联模型
                var modeltabledata = [];
                var usedmodelids = [];
                for (var i in findprojectlist) {
                    if (findprojectlist[i].id == findprojectdata.Id) {
                        for (var j in findprojectlist[i].children) {
                            if (findprojectlist[i].children[j].title == "实景模型") {
                                if (findprojectlist[i].children[j].children != undefined && findprojectlist[i].children[j].children.length > 0) {
                                    for (var k in findprojectlist[i].children[j].children) {
                                        var model = new Object;
                                        model.id = findprojectlist[i].children[j].children[k].data.Id;
                                        model.mxmc = findprojectlist[i].children[j].children[k].data.RWMC;
                                        model.mxbm = findprojectlist[i].children[j].children[k].data.RWBM;
                                        model.mxsj = findprojectlist[i].children[j].children[k].data.YXCJSJ;
                                        model.bz = findprojectlist[i].children[j].children[k].data.BZ;
                                        modeltabledata.push(model);
                                        usedmodelids.push(findprojectlist[i].children[j].children[k].data.Id);//记录已关联模型id
                                    }
                                }
                            }
                        }
                        break;
                    }
                }

                var modeledittable = table.render({
                    elem: '#find-project-model'
                    , id: 'findprojectmodeltableid'
                    , title: '实景模型'
                    , skin: 'line'
                    , even: false
                    , page: { layout: ['prev', 'page', 'next', 'count'] }
                    , limit: 5
                    , toolbar: '#find-project-model-add'
                    , totalRow: false
                    , initSort: { field: 'id', type: 'asc' }
                    , cols: [[
                        { field: 'id', title: 'ID', hide: true }
                        , { field: 'mxmc', title: '模型名称', align: "center" }
                        , { field: 'mxbm', title: '模型编码', align: "center" }
                        , { field: 'mxsj', title: '生产时间', align: "center" }
                        , { field: 'bz', title: '备注', hide: true, align: "center" }
                        , { fixed: 'right', width: 60, align: 'center', toolbar: '#table-toolbar-find' }
                    ]]
                    , data: modeltabledata
                });

                //添加实景模型
                table.on('toolbar(find-project-model)', function (obj) {
                    switch (obj.event) {
                        case 'find-project-model-add':
                            var addmodellayerindex = layer.open({
                                type: 1
                                , title: ['添加实景模型', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                , area: ['450px', '450px']
                                , shade: 0.5
                                , offset: 'auto'
                                , closeBtn: 1
                                , maxmin: false
                                , moveOut: true
                                , content: '<div style="overflow:hidden;"><form class="layui-form" style="margin-top:5px" lay-filter="addmodeluseform"><div class="layui-form-item" style="border-bottom: solid 1px rgb(248,248,248);height:345px;max-height:345px;overflow:auto;"><div id="usemodeltree"></div></div><div class="layui-form-item" style="margin-top:10px"><div class="layui-input-block" style="margin-left:0px;text-align:center;position:relative;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="addmodelusesubmit" style="width:150px">添加</button></div></div></form></div>'
                                , zIndex: layer.zIndex
                                , success: function (layero) {
                                    layer.setTop(layero);
                                    //加载中
                                    loadlayerindex = layer.load(1, { shade: [0.1, '#fff'], zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                    var nousemodeltreedata = [];
                                    var findprojectaddmodels = [];//选中模型
                                    //渲染模型树
                                    tree.render({
                                        elem: '#usemodeltree'
                                        , data: []
                                        , id: 'usemodeltreeid'
                                        , showCheckbox: true
                                        , accordion: false
                                        , showLine: true
                                        , cancelNodeFileIcon: true
                                        , text: { none: '无数据' }
                                        , oncheck: function (obj) {
                                            if (obj.checked) {
                                                //选中
                                                if (obj.data.type == "projectnode") {
                                                    //项目节点
                                                    for (var i in obj.data.children) {
                                                        var model = new Object;
                                                        model.projectid = obj.data.id;
                                                        model.modelid = obj.data.children[i].id;
                                                        findprojectaddmodels.push(model);
                                                    }
                                                }
                                                else {
                                                    //模型节点
                                                    var model = new Object;
                                                    for (var i in nousemodeltreedata) {
                                                        for (var j in nousemodeltreedata[i].children) {
                                                            if (nousemodeltreedata[i].children[j].id == obj.data.id) {
                                                                model.projectid = nousemodeltreedata[i].id;
                                                                break;
                                                            }
                                                        }
                                                    }
                                                    model.modelid = obj.data.id;
                                                    findprojectaddmodels.push(model);
                                                }
                                            }
                                            else {
                                                //取消选中
                                                if (obj.data.type == "projectnode") {
                                                    //项目节点
                                                    var newfindprojectaddmodels = [];

                                                    for (var i in findprojectaddmodels) {
                                                        if (findprojectaddmodels[i].projectid != obj.data.id) {
                                                            newfindprojectaddmodels.push(findprojectaddmodels[i]);
                                                        }
                                                    }

                                                    findprojectaddmodels = newfindprojectaddmodels;
                                                }
                                                else {
                                                    //模型节点
                                                    var newfindprojectaddmodels = [];

                                                    for (var i in findprojectaddmodels) {
                                                        if (findprojectaddmodels[i].modelid != obj.data.id) {
                                                            newfindprojectaddmodels.push(findprojectaddmodels[i]);
                                                        }
                                                    }

                                                    findprojectaddmodels = newfindprojectaddmodels;
                                                }
                                            }
                                        }
                                    });

                                    $.ajax({
                                        url: servicesurl + "/api/ModelProject/GetUserNoUseModelProjectDatas", type: "get", data: { "cookie": document.cookie, "usedmodelid": JSON.stringify(usedmodelids) },
                                        success: function (data) {
                                            CloseLayer(loadlayerindex);//关闭正在加载
                                            nousemodeltreedata = [];

                                            var result = JSON.parse(data);
                                            if (result.code == 1) {
                                                var resultdata = JSON.parse(result.data);
                                                for (var i in resultdata) {
                                                    var project = new Object;
                                                    project.id = resultdata[i].Project.Id;
                                                    project.title = resultdata[i].Project.XMMC;
                                                    project.checked = false;
                                                    project.type = "projectnode";

                                                    var projectchild = [];
                                                    for (var j in resultdata[i].Tasks) {
                                                        var model = new Object;
                                                        model.id = resultdata[i].Tasks[j].Id;
                                                        model.title = resultdata[i].Tasks[j].RWMC;
                                                        model.type = "modelnode";
                                                        model.checked = false;
                                                        model.data = resultdata[i].Tasks[j];
                                                        projectchild.push(model);
                                                    }

                                                    project.children = projectchild;
                                                    nousemodeltreedata.push(project);
                                                }
                                            }

                                            tree.reload('usemodeltreeid', { data: nousemodeltreedata });
                                            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        }, datatype: "json"
                                    });

                                    form.render();
                                    form.render('select');

                                    form.on('submit(addmodelusesubmit)', function (data) {
                                        if (findprojectaddmodels.length > 0) {
                                            data.field.useprojectid = findprojectdata.Id;
                                            data.field.cookie = document.cookie;
                                            data.field.syscode = 7;
                                            data.field.modelinfo = JSON.stringify(findprojectaddmodels);

                                            $.ajax({
                                                url: servicesurl + "/api/ModelProject/AddUserModelProjectUse", type: "post", data: data.field,
                                                success: function (result) {
                                                    var info = JSON.parse(result);
                                                    if (info.code == 1) {
                                                        var newmodelids = JSON.parse(info.data);//已关联成功模型id
                                                        var newmodels = [];//已关联成功模型

                                                        for (var i in newmodelids) {
                                                            for (var j in nousemodeltreedata) {
                                                                for (var k in nousemodeltreedata[j].children) {
                                                                    if (newmodelids[i] == nousemodeltreedata[j].children[k].id) {
                                                                        var model = new Object;
                                                                        model.id = nousemodeltreedata[j].children[k].id;
                                                                        model.mxmc = nousemodeltreedata[j].children[k].data.RWMC;
                                                                        model.mxbm = nousemodeltreedata[j].children[k].data.RWBM;
                                                                        model.mxsj = nousemodeltreedata[j].children[k].data.YXCJSJ;
                                                                        model.bz = nousemodeltreedata[j].children[k].data.BZ;
                                                                        modeltabledata.push(model);
                                                                        usedmodelids.push(nousemodeltreedata[j].children[k].data.Id);
                                                                        newmodels.push(nousemodeltreedata[j].children[k].data);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        modeledittable.reload({ id: 'findprojectmodeltableid', data: modeltabledata });

                                                        for (var i in findprojectlist) {
                                                            if (findprojectlist[i].id == findprojectdata.Id) {
                                                                for (var j in findprojectlist[i].children) {
                                                                    if (findprojectlist[i].children[j].title == "实景模型") {
                                                                        iscontainmodel = true;
                                                                        var child = [];
                                                                        for (var k in newmodels) {
                                                                            var model = new Object;
                                                                            model.id = newmodels[k].Id;
                                                                            model.icon = MODELICON;
                                                                            model.type = "findsurmodel";
                                                                            model.title = newmodels[k].RWMC;
                                                                            model.data = newmodels[k];
                                                                            model.nodeOperate = true;
                                                                            model.customItem = true;
                                                                            model.edit = ['del'];
                                                                            model.showCheckbox = true;
                                                                            model.checked = false;
                                                                            child.push(model);
                                                                        }
                                                                        for (var k in findprojectlist[i].children[j].children) {
                                                                            child.push(findprojectlist[i].children[j].children[k]);
                                                                        }
                                                                        findprojectlist[i].children[j].children = child;
                                                                        break;
                                                                    }
                                                                }
                                                            }
                                                        }

                                                        isReloadTree = true;//标记重载
                                                        MarkCurrentProject();
                                                        isReloadTree = false;//重载后还原
                                                    }

                                                    layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                                }, datatype: "json"
                                            });

                                            layer.close(addmodellayerindex);
                                        } else {
                                            layer.msg("请先勾选需要的实景模型！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        }

                                        return false;
                                    });
                                }
                                , end: function () { }
                            });
                            break;
                    };
                });

                //操作-删除-实景模型
                table.on('tool(find-project-model)', function (obj) {
                    if (obj.event === 'modeldel') {
                        layer.confirm('是否删除?', { icon: 3, title: '消息', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                            $.ajax({
                                url: servicesurl + "/api/ModelProject/CancelUserModelProjectUse", type: "delete", data: { "syscode": 7, "useprojectid": findprojectdata.Id, "modelid": obj.data.id, "cookie": document.cookie },
                                success: function (result) {
                                    var info = JSON.parse(result);
                                    if (info.code == 1) {
                                        var newmodeltabledata = [];
                                        usedmodelids = [];
                                        for (var i in modeltabledata) {
                                            if (modeltabledata[i].id.toString() != info.data) {
                                                newmodeltabledata.push(modeltabledata[i]);
                                                usedmodelids.push(modeltabledata[i].id);
                                            }
                                        }
                                        modeltabledata = newmodeltabledata;
                                        modeledittable.reload({ id: 'findprojectmodeltableid', data: modeltabledata });

                                        if (curtileset != null) {
                                            if (info.data == curtileset.data.Id) {
                                                viewer.scene.primitives.remove(curtileset);
                                                curtileset = null;
                                                currentmodelid = null;
                                            }
                                        }

                                        for (var i in findprojectlist) {
                                            if (findprojectlist[i].id == findprojectdata.Id) {
                                                for (var j in findprojectlist[i].children) {
                                                    if (findprojectlist[i].children[j].title == "实景模型") {
                                                        var child = [];

                                                        for (var k in findprojectlist[i].children[j].children) {
                                                            if (findprojectlist[i].children[j].children[k].id.toString() != (info.data)) {
                                                                child.push(findprojectlist[i].children[j].children[k]);
                                                            }
                                                        }
                                                        findprojectlist[i].children[j].children = child;
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                        isReloadTree = true;//标记重载
                                        MarkCurrentProject();
                                        isReloadTree = false;//重载后还原
                                    }

                                    layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                }, datatype: "json"
                            });

                            layer.close(index);
                        });
                    }
                });

            }
            , end: function () {
                findprojectinfoeditlayerindex = null;
                ClearMapPoint();
            }
        });
    }

    function EditFindProjectHelper() {
        form.val("editFindprojectinfoform", {
            "find_xmmc_edit": findprojectdata.XMMC
            , "find_xmjc_edit": findprojectdata.XMJC
            , "find_xmbm_edit": findprojectdata.XMBM
            , "find_zxjd_edit": findprojectdata.ZXJD
            , "find_zxwd_edit": findprojectdata.ZXWD
            , "find_xmwz_edit": findprojectdata.XMWZ
            , "find_xmsj_edit": findprojectdata.XMSJ
            , "find_bz_edit": findprojectdata.BZ
        })
        //翻译项目位置
        if (xjxzqs.length > 0) {
            for (var i in xjxzqs) {
                if (xjxzqs[i].value == findprojectdata.XZQBM) {
                    var xzqh = "重庆市" + xjxzqs[i].name;
                    form.val("editFindprojectinfoform", {
                        "find_xzqh_edit": xzqh
                    });
                    break;
                }
            }
        }
        date.render({
            elem: '#xmsjid'
        });

        form.render('select');
        form.render();
    };
};

//查看巡查项目
function ViewFindProject(findprojectdata) {
    if (findprojectinfoviewlayerindex != null) {
        ViewFindProjectHelper();
    }
    else {
        findprojectinfoviewlayerindex = layer.open({
            type: 1
            , title: ['查看项目', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['460px', '440px']
            , shade: 0
            , offset: 'auto'
            , closeBtn: 1
            , anim: 0
            , maxmin: true
            , moveOut: true
            , resize: false
            , content: '<!--查看项目信息--><form class="layui-form" style="margin-top:5px;margin-right:10px;" lay-filter="viewFindprojectinfoform"><div class="layui-form-item"><label class="layui-form-label">项目名称</label><div class="layui-input-block"><input type="text" name="find_xmmc_view" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">项目简称</label><div class="layui-input-block"><input type="text" name="find_xmjc_view" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">项目编码</label><div class="layui-input-block"><input type="text" name="find_xmbm_view" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">行政区划</label><div class="layui-input-block"><input type="text" name="find_xzqh_view" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">项目位置</label><div class="layui-input-block"><input type="text" name="find_xmwz_view" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">中心经度</label><div class="layui-input-block"><input type="text" name="find_zxjd_view" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">中心纬度</label><div class="layui-input-block"><input type="text" name="find_zxwd_view" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">项目时间</label><div class="layui-input-block"><input type="text" name="find_xmsj_view" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label><div class="layui-input-block"><input type="text" name="find_bz_view" readonly="readonly" class="layui-input"></div></div></form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);
                ViewFindProjectHelper();
            }
            , end: function () {
                findprojectinfoviewlayerindex = null;
            }
        });
    }

    function ViewFindProjectHelper() {
        form.val("viewFindprojectinfoform", {
            "find_xmmc_view": findprojectdata.XMMC
            , "find_xmjc_view": findprojectdata.XMJC
            , "find_xmbm_view": findprojectdata.XMBM
            , "find_zxjd_view": findprojectdata.ZXJD
            , "find_zxwd_view": findprojectdata.ZXWD
            , "find_xmsj_view": findprojectdata.XMSJ
            , "find_xmwz_view": findprojectdata.XMWZ
            , "find_bz_view": findprojectdata.BZ
        });
        //翻译项目位置
        if (xjxzqs.length > 0) {
            for (var i in xjxzqs) {
                if (xjxzqs[i].value == findprojectdata.XZQBM) {
                    var xzqh = "重庆市" + xjxzqs[i].name;
                    form.val("viewFindprojectinfoform", {
                        "find_xzqh_view": xzqh
                    });
                }
            }
        }
    };
};

//删除巡查项目
function DeleteFindProject(projectid) {
    $.ajax({
        url: servicesurl + "/api/FindProject/DeleteFindProject", type: "delete", data: { "id": projectid, "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                var delprojectid = JSON.parse(result.data);
                //清除当前项目
                if (currentprojectid == delprojectid) {
                    currentprojectid = null;
                    currentprojecttitle = null;
                    //清除当前项目已加载模型
                    if (curtileset != null) {
                        viewer.scene.primitives.remove(curtileset);
                        curtileset = null;
                        currentmodelid = null;
                    }
                }

                //清除项目图形
                var newprojectentities = [];
                for (var i in projectentities) {
                    if (projectentities[i].id == ("PROJECTCENTER_" + delprojectid) || projectentities[i].id == ("PROJECTCENTER_LABEL_" + delprojectid)) {
                        RemoveEntityInViewer(projectentities[i]);
                    }
                    else {
                        newprojectentities.push(projectentities[i]);
                    }
                }
                projectentities = newprojectentities;

                var newfindprojectlist = [];
                for (var i in findprojectlist) {
                    if (findprojectlist[i].id != delprojectid) {
                        newfindprojectlist.push(findprojectlist[i]);
                    }
                }
                findprojectlist = newfindprojectlist;
            }
            isReloadTree = true;//标记重载
            MarkCurrentProject();
            isReloadTree = false;//重载后还原

            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }, datatype: "json"
    });
};

//节点操作-删除项目模型关联
function DeleteFindModel(modeltaskid, findprojectid) {
    $.ajax({
        url: servicesurl + "/api/ModelProject/CancelUserModelProjectUse", type: "delete", data: { "syscode": 7, "useprojectid": findprojectid, "modelid": modeltaskid, "cookie": document.cookie },
        success: function (result) {
            var info = JSON.parse(result);
            if (info.code == 1) {
                var id = JSON.parse(info.data);

                if (curtileset != null) {
                    if (id == curtileset.data.Id) {
                        viewer.scene.primitives.remove(curtileset);
                        curtileset = null;
                        currentmodelid = null;
                    }
                }

                for (var i in findprojectlist) {
                    if (findprojectlist[i].id == currentprojectid) {
                        for (var j in findprojectlist[i].children) {
                            if (findprojectlist[i].children[j].title == "实景模型") {
                                var child = [];

                                for (var k in findprojectlist[i].children[j].children) {
                                    if (findprojectlist[i].children[j].children[k].id != id) {
                                        child.push(findprojectlist[i].children[j].children[k]);
                                    }

                                }

                                findprojectlist[i].children[j].children = child;
                                break;
                            }
                        }
                        break;
                    }
                }

                isReloadTree = true;//标记重载
                MarkCurrentProject();
                isReloadTree = false;//重载后还原
            }
            layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }, datatype: "json"
    });
};

//地图选点
function mapPosition(type) {
    if (handler != undefined) {
        handler.destroy();
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    viewer.scene.globe.depthTestAgainstTerrain = true;
    viewer._container.style.cursor = "crosshair";//修改鼠标样式

    if (type == "add") {
        layer.min(findprojectinfoaddlayerindex);
    }
    else if ("edit") {
        layer.min(findprojectinfoeditlayerindex);
    }

    //左击
    handler.setInputAction(function (leftclick) {
        var position = viewer.scene.pickPosition(leftclick.position);
        if (position != undefined) {
            var cartesian3 = Cesium.Cartographic.fromCartesian(position);
            var longitude = Cesium.Math.toDegrees(cartesian3.longitude);
            var latitude = Cesium.Math.toDegrees(cartesian3.latitude);

            if (type == "add") {
                form.val("addFindprojectform", {
                    "find_zxjd_add": longitude.toFixed(6)
                    , "find_zxwd_add": latitude.toFixed(6)
                });
            }
            else if (type == "edit") {
                form.val("editFindprojectinfoform", {
                    "find_zxjd_edit": longitude.toFixed(6)
                    , "find_zxwd_edit": latitude.toFixed(6)
                });
            }

            if (Cesium.defined(position)) {
                if (newprojectentity == null) {
                    newprojectentity = viewer.entities.add(new Cesium.Entity({
                        name: "temp_findproject_position",
                        position: position,
                        billboard: {
                            image: '../../Resources/img/uavfind/findprojecticon.png',
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                            width: 40,
                            height: 40,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY, //深度检测，解决图标、标注与模型遮挡冲突
                        }
                    }));
                }
                else {
                    newprojectentity.position = position;
                }
            }

            if (type == "add") {
                layer.restore(findprojectinfoaddlayerindex);
            }
            else if ("edit") {
                layer.restore(findprojectinfoeditlayerindex);
            }

            if (handler != undefined) {
                handler.destroy();
            }

            viewer._container.style.cursor = "default";//还原鼠标样式
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
};
//清除地图选点
function ClearMapPoint() {
    if (handler != undefined) {
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);//移除事件
        handler.destroy();
    }

    viewer._container.style.cursor = "default";//还原鼠标样式

    if (newprojectentity != null) {
        RemoveEntityInViewer(newprojectentity);
        newprojectentity = null;
    }
};

