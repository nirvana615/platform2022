//项目信息
function ProjectInfo(id, style) {
    if (style == "view") {
        //查看项目信息
        if (projectinfoviewlayerindex == null) {
            projectinfoviewlayerindex = layer.open({
                type: 1
                , title: ['项目信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['900px', '750px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , anim: 0
                , maxmin: true
                , moveOut: true
                //, content: '<!--查看项目--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px 0px"><ul class="layui-tab-title"><li class="layui-this">基本信息</li><li>测窗信息</li><li>节理信息</li><li>节理玫瑰花</li></ul><div class="layui-tab-content" style="margin:0px 0px"><!--基本信息--><div class="layui-tab-item layui-show"><form class="layui-form" style="margin-top:0px" lay-filter="projectinfoviewform"><div class="layui-form-item"><label class="layui-form-label">项目名称</label><div class="layui-input-block"><input type="text" name="xmmc" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">中心经度</label><div class="layui-input-block"><input type="text" name="zxjd" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label">中心纬度</label><div class="layui-input-block"><input type="text" name="zxwd" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md3"><div class="grid-demo"><label class="layui-form-label">行政区划</label><div class="layui-input-block"><input type="text" name="xzqdm" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md9"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">项目位置</label><div class="layui-input-block"><input type="text" name="xmwz" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">开始时间</label><div class="layui-input-block"><input type="text" name="xmkssj" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label">备注</label><div class="layui-input-block"><input type="text" name="bz" class="layui-input" readonly="readonly" /></div></div></div></div></div></form></div><!--测窗信息--><div class="layui-tab-item"><table class="layui-hide" id="windowtable-view" lay-filter="windowtable-view"></table></div><!--节理信息--><div class="layui-tab-item"><table class="layui-hide" id="jielitable-view" lay-filter="jielitable-view"></table></div><!--节理玫瑰花--><div class="layui-tab-item"><div id="autodatachart" class="layui-tab-item layui-show" style="width:790px;height:540px;top:40px"></div></div></div></div>'
                , content: porjectview
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    form.render();
                    //更新消落带信息
                    form.on('submit(editxiaoluodaisubmit)', function (data) {
                        data.field.id = id;
                        data.field.cookie = document.cookie;
                        //计算项目得分

                        data.field.projectScore = parseFloat(data.field.dcyxScore) *
                            parseFloat(data.field.dcyxWeight) +
                            parseFloat(data.field.ytjgScore) *
                            parseFloat(data.field.ytjgWeight) +
                            parseFloat(data.field.ycczScore) *
                            parseFloat(data.field.ycczWeight) +
                            parseFloat(data.field.apjgScore) *
                            parseFloat(data.field.apjgWeight) +
                            parseFloat(data.field.qglxScore) *
                            parseFloat(data.field.qglxWeight) +
                            parseFloat(data.field.dmbjScore) *
                            parseFloat(data.field.dmbjWeight) +
                            parseFloat(data.field.bxjxScore) *
                            parseFloat(data.field.bxjxWeight) +
                            parseFloat(data.field.ytlhScore) *
                            parseFloat(data.field.ytlhWeight) +
                            parseFloat(data.field.zbfgScore) *
                            parseFloat(data.field.zbfgWeight);
                        form.val("xiaoluodaiinfoform", {
                            "projectScore": data.field.projectScore,
                        });
                        var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                        $.ajax({
                            url: servicesurl + "/api/FLZ/UpdateProject", type: "put", data: data.field,
                            success: function (result) {
                                layer.close(loadinglayerindex);
                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                console.log(result);
                                if (result == "更新成功！") {
                                    //关闭
                                    layer.close(projectinfoeditlayerindex);

                                    //刷新项目列表
                                    GetUserProjects();
                                }
                            }, datatype: "json"
                        });
                        return false;
                    });
                }, btn: ['巫峡边界']
                , yes: function (index, layero) {
                    //新增项目
                    openWuxiaBianjie();
                    //insertWuxiaBianjie();
                    return false;
                }
                , end: function () {
                    projectinfoviewlayerindex = null;
                }
            });
        }
        //Loading
        var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

        //项目信息
        $.ajax({
            url: servicesurl + "/api/FLZ/GetProjectInfo", type: "get", data: { "id": id, "cookie": document.cookie },
            success: function (data) {
                layer.close(loadinglayerindex);
                if (data == "") {
                    layer.msg("无项目信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    //清除项目信息
                    form.val("projectinfoviewform", {
                        "xmmc": ""
                        , "zxjd": ""
                        , "zxwd": ""
                        , "xzqdm": ""
                        , "xmwz": ""
                        , "xmkssj": ""
                        , "bz": ""
                    });
                }
                else {
                    //项目信息
                    var projectinfo = JSON.parse(data);

                    console.log(projectinfo);
                    form.val("projectinfoviewform", {
                        "xmmc": projectinfo.XMMC
                        , "zxjd": projectinfo.ZXJD
                        , "zxwd": projectinfo.ZXWD
                        , "xzqdm": projectinfo.XZQBM
                        , "xmwz": projectinfo.XMWZ
                        , "xmkssj": projectinfo.XMKSSJ
                        , "bz": projectinfo.BZ
                    });
                    form.val("xiaoluodaiinfoform", {
                        "xmmc": projectinfo.XMMC,
                        "apjg": projectinfo.apjg,
                        "apjgScore": projectinfo.apjgScore,
                        "apjgWeight": projectinfo.apjgWeight,
                        "bxjx": projectinfo.bxjx,
                        "bxjxScore": projectinfo.bxjxScore,
                        "bxjxWeight": projectinfo.bxjxWeight,
                        "dcyx": projectinfo.dcyx,
                        "dcyxScore": projectinfo.dcyxScore,
                        "dcyxWeight": projectinfo.dcyxWeight,
                        "dmbj": projectinfo.dmbj,
                        "dmbjScore": projectinfo.dmbjScore,
                        "dmbjWeight": projectinfo.dmbjWeight,
                        "flzRange": projectinfo.flzRange,
                        "gshd": projectinfo.gshd,
                        "hygc": projectinfo.hygc,
                        "mianJi": projectinfo.mianJi,
                        "modelId": projectinfo.modelId,
                        "projectScore": projectinfo.projectScore,
                        "puoXiang": projectinfo.puoXiang,
                        "qglx": projectinfo.qglx,
                        "qglxScore": projectinfo.qglxScore,
                        "qglxWeight": projectinfo.qglxWeight,
                        "tiJi": projectinfo.tiJi,
                        "yccz": projectinfo.yccz,
                        "ycczScore": projectinfo.ycczScore,
                        "ycczWeight": projectinfo.ycczWeight,
                        "ytjg": projectinfo.ytjg,
                        "ytjgScore": projectinfo.ytjgScore,
                        "ytjgWeight": projectinfo.ytjgWeight,
                        "ytlh": projectinfo.ytlh,
                        "ytlhScore": projectinfo.ytlhScore,
                        "ytlhWeight": projectinfo.ytlhWeight,
                        "zbfg": projectinfo.zbfg,
                        "zbfgScore": projectinfo.zbfgScore,
                        "zbfgWeight": projectinfo.zbfgWeight,
                        "zhongChang": projectinfo.zhongChang
                    });

                }
            }, datatype: "json"
        });
        //测窗信息
        var windowtabledata = [];
        var windowtableview = table.render({
            elem: '#windowtable-view'
            , id: 'windowtableviewid'
            , title: '测窗信息'
            , skin: 'line'
            , even: false
            , page: true
            , limit: 10
            , toolbar: true
            , totalRow: false
            , initSort: { field: 'id', type: 'asc' }
            , cols: [[
                { field: 'id', title: 'ID', hide: true }
                , , { field: 'name', title: '测窗名称', width: 200, align: "center" }
                , { field: 'sideLength', title: '测窗长', align: "center" }
                , { field: 'sidebLength', title: '测窗宽', align: "center" }
                , { field: 'height', title: '高程', align: "center" }
                , { field: 'creatTime', title: '新建时间', width: 160, align: "center" }
                , { field: 'remarks', title: '备注', align: "center" }
            ]]
            , data: []
        });
        var loadingceindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

        $.ajax({
            url: servicesurl + "/api/FlzWindowInfo/GetWindowInfoList", type: "get", data: { "id": id, "cookie": document.cookie },
            success: function (data) {
                layer.close(loadingceindex);
                windowtabledata = [];
                if (data == "" || data == "没有项目") {
                    layer.msg("无测窗信息！");
                    //无测窗信息
                    windowtableview.reload({ id: 'windowtableviewid', data: windowtabledata });
                }
                else {
                    var windowInfos = JSON.parse(data);
                    console.log(windowInfos);
                    for (var i in windowInfos) {
                        var section = new Object;
                        section.id = windowInfos[i].id;
                        section.name = windowInfos[i].name;
                        section.creatTime = windowInfos[i].creatTime;
                        section.sideLength = windowInfos[i].sideLength;
                        section.sidebLength = windowInfos[i].sidebLength;
                        section.height = windowInfos[i].height;
                        section.remarks = windowInfos[i].remarks;
                        windowtabledata.push(section);
                    }
                    windowtableview.reload({ id: 'windowtableviewid', data: windowtabledata });

                    table.on('tool(windowtable-view)', function (obj) {
                        var data = obj.data;
                        var layEvent = obj.event;

                        if (layEvent === 'sectionview') {
                            layer.open({
                                type: 1
                                , title: ['测窗信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                , area: ['400px', '400px']
                                , shade: 0
                                , offset: 'auto'
                                , closeBtn: 1
                                , anim: 0
                                , maxmin: true
                                , moveOut: true
                                , content: ''
                                , zIndex: layer.zIndex
                                , success: function (layero) {
                                    layer.setTop(layero);

                                }
                            });
                        }
                    });
                }
            }, datatype: "json"
        });
        // 节理
        var jielitabledata = [];
        var loadingjieliindex = layer.load(0, { shade: 0.1, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
       
        var jielitableview = table.render({
            elem: '#jielitable-view'
            , id: 'jielitableviewid'
            , title: '节理信息'
            , skin: 'line'
            , even: false
            , page: true
            , limit: 10
            , toolbar: true
            , totalRow: true
            , initSort: { field: 'id', type: 'asc' }
            , cols: [[
                { field: 'id', title: 'ID', hide: true }
                , { field: 'name', title: '节理名称', width: 160, align: "center", totalRowText: '合计' }
                , { field: 'avgOpening', title: '平均张开度', width: 160, sort: true, align: "center" }
                , { field: 'traceLength', title: '迹长', sort: true, align: "center", totalRow: true }
                , { field: 'measure', title: '面积', sort: true, width: 120, align: "center", totalRow: true }
                , { field: 'modleTime', title: '采集时间', sort: true, width: 160, align: "center" }
                , { field: 'creatTime', title: '素描时间', sort: true, width: 160, align: "center" }
                , { field: 'remarks', title: '备注', width: 160, align: "center" }
            ]]
            , data: []
        });
        $.ajax({
            url: servicesurl + "/api/FlzData/GetWindowInfoList", type: "get", data: {
                "id": id,
                "cookie": document.cookie,
                "collector":"", 
                "modleId": "",
                "windowId": "",
                "type": "3"
            },
            success: function (data) {
                layer.close(loadingjieliindex);
                jielitabledata = [];
                if (data == "") {
                    //无节理信息
                    jielitableview.reload({ id: 'jielitableviewid', data: jielitabledata });
                }
                else {
                    var windowInfos = JSON.parse(data);
                    console.log(windowInfos);
                    for (var i in windowInfos) {
                        var jieli = new Object;
                        jieli.id = windowInfos[i].id;
                        jieli.name = windowInfos[i].name;
                        jieli.avgOpening = windowInfos[i].avgOpening;
                        jieli.inclination = windowInfos[i].inclination;
                        jieli.dipAngle = windowInfos[i].dipAngle;
                        jieli.trend = windowInfos[i].trend;
                        jieli.traceLength = windowInfos[i].traceLength;
                        jieli.measure = windowInfos[i].measure;
                        jieli.modleTime = windowInfos[i].modleTime;
                        jieli.creatTime = windowInfos[i].creatTime;
                        jieli.remarks = windowInfos[i].remarks;
                        jielitabledata.push(jieli);
                    }
                    jielitableview.reload({ id: 'jielitableviewid', data: jielitabledata });
                    
                }
            }, datatype: "json"
        });
        var loadinghuaindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
        // 优势结构面

        //jiegoutables
        var jiegoutablesdsata = [];
        var jiegoutablesview = table.render({
            elem: '#jiegoutables-view'
            , id: 'jiegoutablesviewid'
            , title: '结构面信息'
            , skin: 'line'
            , even: false
            , page: true
            , limit: 10
            , toolbar: true
            , totalRow: true
            , initSort: { field: 'id', type: 'asc' }
            , cols: [[
                { field: 'id', title: 'ID', hide: true }
                , { field: 'name', title: '结构面编号', width: 160, align: "center", totalRowText: '合计' }
                , { field: 'inclination', title: '倾向', sort: true, align: "center" }
                , { field: 'dipAngle', title: '倾角', sort: true, align: "center" }
                , { field: 'trend', title: '走向', align: "center" }
                , { field: 'modleTime', title: '采集时间', sort: true, width: 160, align: "center" }
                , { field: 'creatTime', title: '素描时间', sort: true, width: 160, align: "center" }
                , { field: 'remarks', title: '备注', width: 160, align: "center" }
            ]]
            , data: []
        });
        var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

        $.ajax({
            url: servicesurl + "/api/FlzData/GetWindowInfoList", type: "get", data: {
                "id": id,
                "cookie": document.cookie,
                "type": "4",
                "modleId": "",
                "windowId": "",
                "collector": "",
            },
            success: function (data) {
                layer.close(loadinglayerindex);
                jiegoutablesdsata = [];
                if (data == "") {
                    //无监测剖面信息
                    jiegoutablesview.reload({ id: 'jiegoutablesviewid', data: jiegoutablesdsata });
                }
                else {
                    var windowInfos = JSON.parse(data);
                    console.log(windowInfos);
                    for (var i in windowInfos) {
                        var jiegou = new Object;
                        jiegou.id = windowInfos[i].id;
                        jiegou.name = windowInfos[i].name;
                        jiegou.inclination = windowInfos[i].inclination;
                        jiegou.dipAngle = windowInfos[i].dipAngle;
                        jiegou.trend = windowInfos[i].trend;
                        jiegou.modleTime = windowInfos[i].modleTime;
                        jiegou.creatTime = windowInfos[i].creatTime;
                        jiegou.remarks = windowInfos[i].remarks;
                        jiegou.collector = windowInfos[i].collector;
                        jiegoutablesdsata.push(jiegou);
                    }
                    jiegoutablesview.reload({ id: 'jiegoutablesviewid', data: jiegoutablesdsata });

                }
            }, datatype: "json"
        });

        //玫瑰花

        Getjielid(id, loadinghuaindex);
    }
    else if (style == "edit") {
        //编辑项目
        if (projectinfoeditlayerindex == null) {
            projectinfoeditlayerindex = layer.open({
                type: 1
                , title: ['编辑项目', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['800px', '410px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--编辑项目--><form class="layui-form" style="margin-top:5px;margin-right:5px;" lay-filter="editprojectinfoform"><div class="layui-form-item"><label class="layui-form-label">项目名称</label><div class="layui-input-block"><input type="text" name="xmmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><div class="layui-inline"><label class="layui-form-label">中心经度</label><div class="layui-input-inline" style="width:250px;"><input type="text" name="zxjd" lay-verify="required|number" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div></div></div><div class="layui-col-md6"><div class="grid-demo"><div class="layui-inline"><label class="layui-form-label">中心纬度</label><div class="layui-input-inline" style="width:250px;"><input type="text" name="zxwd" lay-verify="required|number" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label">行政区划</label><div class="layui-input-inline" style="width:200px;"><select id="provinceid" name="province" lay-verify="required"><option value="">省/市</option><option value="0">重庆市</option></select></div><div class="layui-input-inline" style="width:200px;"><select id="cityid" name="city" lay-verify="required"><option value="">市辖区/县</option><option value="0">市辖区</option><option value="1">县</option></select></div><div class="layui-input-inline" style="width:200px;"><select id="districtid" name="district" lay-verify="required"><option value="">区/县</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">项目位置</label><div class="layui-input-block"><input type="text" name="xmwz" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><div class="layui-inline"><label class="layui-form-label">开始时间</label><div class="layui-input-inline" style="width:250px;"><input type="text" id="xmkssjid" name="xmkssj" lay-verify="date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" /></div></div></div></div><div class="layui-col-md6"><div class="grid-demo"><div class="layui-inline"><label class="layui-form-label">备注</label><div class="layui-input-inline" style="width:250px;"><input type="text" name="bz"  placeholder="请输入"  autocomplete="off" class="layui-input" /></div></div></div></div></div></div><div class="layui-form-item" style="margin-top:5px"><div style="position:absolute;right:15px;"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="editprojectinfosubmit" style="width:100px">提交</button></div></div></form>'
                 , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    //项目信息
                    var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                    $.ajax({
                        url: servicesurl + "/api/FLZ/GetProjectInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                        success: function (data) {
                            layer.close(loadinglayerindex);
                            if (data == "") {
                                layer.msg("无项目信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                if (xjxzqs.length > 0) {
                                    for (var i in xjxzqs) {
                                        document.getElementById("districtid").innerHTML += '<option value="' + xjxzqs[i].value + '">' + xjxzqs[i].name + '</option>';
                                    }
                                }
                                form.val("editprojectinfoform", {
                                    "xmmc": ""
                                    , "zxjd": ""
                                    , "zxwd": ""
                                    , "district": ""
                                    , "xmwz": ""
                                    , "xmkssj": ""
                                    , "bz": ""
                                });
                                
                               
                              
                                //渲染开始时间
                                date.render({
                                    elem: '#xmkssjid'
                                });
                               
                                form.render();
                                form.render('select');
                            }
                            else {
                                var projectinfo = JSON.parse(data);
                                if (xjxzqs.length > 0) {
                                    for (var i in xjxzqs) {
                                        document.getElementById("districtid").innerHTML += '<option value="' + xjxzqs[i].value + '">' + xjxzqs[i].name + '</option>';
                                    }
                                }
                                console.log(projectinfo);
                                form.val("editprojectinfoform", {
                                    "xmmc": projectinfo.XMMC
                                    , "zxjd": projectinfo.ZXJD
                                    , "zxwd": projectinfo.ZXWD
                                    , "district": projectinfo.XZQBM
                                    , "xmwz": projectinfo.XMWZ
                                    , "xmkssj": projectinfo.XMKSSJ
                                    , "bz": projectinfo.BZ
                                    , "province": 0
                                    , "city": 1
                                });
                               
                                

                                //渲染开始时间
                                date.render({
                                    elem: '#xmkssjid'
                                });
                                
                                form.render();
                                form.render('select');
                            }
                        }, datatype: "json"
                    });

                    //更新项目
                    form.on('submit(editprojectinfosubmit)', function (data) {
                        data.field.id = id;
                        data.field.cookie = document.cookie;

                        var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                        $.ajax({
                            url: servicesurl + "/api/FLZ/UpdateProject", type: "put", data: data.field,
                            success: function (result) {
                                layer.close(loadinglayerindex);
                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                console.log(result);
                                if (result == "更新成功！") {
                                    //关闭
                                    layer.close(projectinfoeditlayerindex);

                                    //刷新项目列表
                                    GetUserProjects();
                                }
                            }, datatype: "json"
                        });
                        return false;
                    });
                }
                , end: function () {
                    projectinfoeditlayerindex = null;
                }
            });
        }
    }
    else if (style == "add") {
        //新建项目
        if (projectinfoaddlayerindex == null) {
            projectinfoaddlayerindex = layer.open({
                type: 1
                , title: ['新建项目', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['800px', '650px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: addNewproject // , content: '/Apps/flz/widget/1.3 projectinfoadd.html'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    
                    if (xjxzqs.length > 0) {
                        for (var i in xjxzqs) {
                            document.getElementById("districtid").innerHTML += '<option value="' + xjxzqs[i].value + '">' + xjxzqs[i].name + '</option>';
                        }
                    }
                   
                    //渲染开始时间&结束时间
                    date.render({
                        elem: '#xmkssjid'
                    });
                    
                    form.render();
                    form.render('select');

                    form.on('submit(addprojectinfosubmit)', function (data) {
                        data.field.cookie = document.cookie;

                        var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                        $.ajax({
                            url: servicesurl + "/api/Flz/AddProject", type: "post", data: data.field,
                            success: function (result) {
                                layer.close(loadinglayerindex);
                                if (isNaN(result)) {
                                    //创建失败
                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                }
                                else {
                                    layer.msg("创建成功。", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                    //关闭
                                    layer.close(projectinfoaddlayerindex);

                                    //刷新项目列表
                                    GetUserProjects();
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
};

