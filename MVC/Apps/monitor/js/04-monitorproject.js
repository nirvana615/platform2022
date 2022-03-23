//项目信息
function ProjectInfo(id, style) {
    if (style == "view") {
        //查看项目信息
        if (projectinfoviewlayerindex == null) {
            projectinfoviewlayerindex = layer.open({
                type: 1
                , title: ['项目信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['900px', '700px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , anim: 0
                , maxmin: true
                , moveOut: true
                , content: '<!--查看项目--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px 0px"><ul class="layui-tab-title"><li class="layui-this">基本信息</li><li>灾害体信息</li><li>测绘信息</li><li>地质信息</li><li>监测设计</li><li>文档信息</li><li>项目成员</li><li>参建单位</li></ul><div class="layui-tab-content" style="margin:0px 0px"><!--基本信息--><div class="layui-tab-item layui-show"><form class="layui-form" style="margin-top:0px" lay-filter="projectinfoviewform"><div class="layui-form-item"><label class="layui-form-label">项目名称</label><div class="layui-input-block"><input type="text" name="xmmc" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">项目编码</label><div class="layui-input-block"><input type="text" name="xmbm" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label">项目类型</label><div class="layui-input-block"><input type="text" name="xmlx" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">项目类别</label><div class="layui-input-block"><input type="text" name="xmlb" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4" style="width:25%"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">中心经度</label><div class="layui-input-block"><input type="text" name="zxjd" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4" style="width:25%"><div class="grid-demo"><label class="layui-form-label">中心纬度</label><div class="layui-input-block"><input type="text" name="zxwd" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4" style="width:50%"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">坐标系统</label><div class="layui-input-block"><input type="text" name="kjck" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md3"><div class="grid-demo"><label class="layui-form-label">行政区划</label><div class="layui-input-block"><input type="text" name="xzqdm" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md9"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">项目位置</label><div class="layui-input-block"><input type="text" name="xmwz" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">开始时间</label><div class="layui-input-block"><input type="text" name="xmkssj" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label">结束时间</label><div class="layui-input-block"><input type="text" name="xmjssj" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">灾害点名称</label><div class="layui-input-block"><input type="text" name="zhdmc" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label">灾害点编号</label><div class="layui-input-block"><input type="text" name="zhdtybh" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">灾害类型</label><div class="layui-input-block"><input type="text" name="zhlx" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label">灾害等级</label><div class="layui-input-block"><input type="text" name="zhdj" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">灾害险情</label><div class="layui-input-block"><input type="text" name="zhxq" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">预警级别</label><div class="layui-input-block"><input type="text" name="yjjb" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label">监测级别</label><div class="layui-input-block"><input type="text" name="jcjb" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">监测手段</label><div class="layui-input-block"><input type="text" name="jcsd" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">是否库区</label><div class="layui-input-block"><input type="text" name="sfkq" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label">是否涉水</label><div class="layui-input-block"><input type="text" name="sfss" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">是否结束</label><div class="layui-input-block"><input type="text" name="sfjs" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row layui-col-space1"><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">面积</label><div class="layui-input-block"><input type="text" name="mj" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md3"><div class="grid-demo"><label class="layui-form-label">面积单位</label><div class="layui-input-block"><input type="text" name="mjdw" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">体积</label><div class="layui-input-block"><input type="text" name="tj" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md3"><div class="grid-demo"><label class="layui-form-label">体积单位</label><div class="layui-input-block"><input type="text" name="tjdw" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row layui-col-space1"><div class="layui-col-md3" style="width:25%"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">威胁户数</label><div class="layui-input-block"><input type="text" name="wxhs" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md3" style="width:25%"><div class="grid-demo"><label class="layui-form-label">威胁人数</label><div class="layui-input-block"><input type="text" name="wxrs" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md3" style="width:50%"><label class="layui-form-label" style="width:200px">威胁房屋面积(平方米)</label><input type="text" name="wxfwmj" class="layui-input" readonly="readonly" style="width:180px;float:right" /></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="padding-top:30px;">其他威胁</label><div class="layui-input-block"><textarea name="qtwx" class="layui-textarea" readonly="readonly" style="min-height:80px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label">备注</label><div class="layui-input-block"><input type="text" name="bz" class="layui-input" readonly="readonly" /></div></div></form></div><!--灾害体信息--><div class="layui-tab-item"><table class="layui-hide" id="disaster-view" lay-filter="disaster-view"></table><script type="text/html" id="table-toolbar-disaster"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;" lay-event="disasterview"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important"></i></a></script></div><!--测绘信息--><div class="layui-tab-item">测绘信息</div><!--地质信息--><div class="layui-tab-item">地质信息</div><!--监测设计信息--><div class="layui-tab-item" style="margin:1px 0"><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px 0px"><ul class="layui-tab-title"><li class="layui-this" style="width:45%">监测剖面</li><li style="width:45%">监测点</li></ul><div class="layui-tab-content"><!--监测剖面--><div class="layui-tab-item layui-show"><table class="layui-hide" id="sectiontable-view" lay-filter="sectiontable-view"></table><script type="text/html" id="table-toolbar-section"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;" lay-event="sectionview"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important"></i></a></script></div><!--监测点--><div class="layui-tab-item"><form class="layui-form layui-form-pane" lay-filter="monitorviewform" action=""><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><div class="layui-input-block" style="margin-left:0px;margin-right:5px;margin-bottom:3px;"><select id="monitorclassid" name="monitorclass" lay-filter="monitorclass"><option value="0" selected="selected">按灾害体分类</option><option value="1">按监测方法分类</option><option value="2">按监测剖面分类</option></select></div></div></div><div class="layui-col-md6"><div class="grid-demo"><div class="layui-input-block" style="margin-left:5px;margin-bottom:3px;"><select id="monitorclassitemid" name="monitorclassitem" lay-filter="monitorclassitem"></select></div></div></div></div></form><table class="layui-hide" id="monitortable-view" lay-filter="monitortable-view"></table><script type="text/html" id="table-toolbar-monitor"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;" lay-event="monitorview"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important"></i></a></script></div></div></div></div><!--文档信息--><div class="layui-tab-item">文档信息</div><!--项目成员信息--><div class="layui-tab-item">项目成员信息</div><!--参建单位信息--><div class="layui-tab-item">参建单位信息</div></div></div>'
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
            url: servicesurl + "/api/MonitorProject/GetProjectInfo", type: "get", data: { "id": id, "cookie": document.cookie },
            success: function (data) {
                if (data == "") {
                    layer.msg("无项目信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    //清除项目信息
                    form.val("projectinfoviewform", {
                        "xmmc": ""
                        , "xmbm": ""
                        , "xmlx": ""
                        , "xmlb": ""
                        , "zxjd": ""
                        , "zxwd": ""
                        , "kjck": ""
                        , "xzqdm": ""
                        , "xmwz": ""
                        , "xmkssj": ""
                        , "xmjssj": ""
                        , "zhdmc": ""
                        , "zhdtybh": ""
                        , "zhlx": ""
                        , "zhdj": ""
                        , "zhxq": ""
                        , "yjjb": ""
                        , "jcjb": ""
                        , "jcsd": ""
                        , "sfkq": ""
                        , "sfss": ""
                        , "sfjs": ""
                        , "mj": ""
                        , "mjdw": ""
                        , "tj": ""
                        , "tjdw": ""
                        , "wxhs": ""
                        , "wxrs": ""
                        , "wxfwmj": ""
                        , "qtwx": ""
                        , "bz": ""
                    });
                }
                else {
                    //项目信息
                    var projectinfo = JSON.parse(data);

                    form.val("projectinfoviewform", {
                        "xmmc": projectinfo.XMMC
                        , "xmbm": projectinfo.XMBM
                        , "xmlx": projectinfo.XMLX
                        , "xmlb": projectinfo.XMLB
                        , "zxjd": projectinfo.ZXJD
                        , "zxwd": projectinfo.ZXWD
                        , "kjck": projectinfo.SRID
                        , "xzqdm": projectinfo.XZQBM
                        , "xmwz": projectinfo.XMWZ
                        , "xmkssj": projectinfo.XMKSSJ
                        , "xmjssj": projectinfo.XMJSSJ
                        , "zhdmc": projectinfo.ZHDMC
                        , "zhdtybh": projectinfo.ZHDTYBH
                        , "zhlx": projectinfo.ZHLX
                        , "zhdj": projectinfo.ZHDJ
                        , "zhxq": projectinfo.ZHXQ
                        , "yjjb": projectinfo.YJJB
                        , "jcjb": projectinfo.JCJB
                        , "jcsd": projectinfo.JCSD
                        , "sfkq": projectinfo.SFKQ
                        , "sfss": projectinfo.SFSS
                        , "sfjs": projectinfo.SFJS
                        , "mj": projectinfo.MJ
                        , "mjdw": projectinfo.MJDW
                        , "tj": projectinfo.TJ
                        , "tjdw": projectinfo.TJDW
                        , "wxhs": projectinfo.WXHS
                        , "wxrs": projectinfo.WXRS
                        , "wxfwmj": projectinfo.WXFWMJ
                        , "qtwx": projectinfo.QTWX
                        , "bz": projectinfo.BZ
                    });
                }
            }, datatype: "json"
        });

        //灾害体信息
        var disastertabledata = [];
        var disasterviewtable = table.render({
            elem: '#disaster-view'
            , id: 'disasterviewtableid'
            , title: '灾害体信息'
            , skin: 'line'
            , even: false
            , page: {
                layout: ['prev', 'page', 'next', 'count']
            }
            , limit: 12
            , toolbar: true
            , totalRow: false
            , initSort: { field: 'id', type: 'asc' }
            , cols: [[
                { field: 'id', title: 'ID', hide: true }
                , { field: 'zhtmc', title: '灾害体名称', align: "center" }
                , { field: 'zhtbh', title: '灾害体编号', align: "center" }
                , { field: 'zhtlx', title: '灾害体类型', align: "center" }
                , { field: 'zxjd', title: '中心经度', align: "center" }
                , { field: 'zxwd', title: '中心纬度', align: "center" }
                , { field: 'bz', title: '备注', align: "center" }
                , { fixed: 'right', width: 80, align: 'center', toolbar: '#table-toolbar-disaster' }
            ]]
            , data: disastertabledata
        });
        $.ajax({
            url: servicesurl + "/api/Disaster/GetDisaster", type: "get", data: { "id": id, "cookie": document.cookie },
            success: function (data) {
                disastertabledata = [];
                if (data == "") {
                    //无灾害体信息
                    disasterviewtable.reload({ id: 'disasterviewtableid', data: disastertabledata });
                }
                else {
                    var disasterInfos = JSON.parse(data);

                    //构造灾害体表格数据
                    for (var i in disasterInfos) {
                        var disaster = new Object;
                        disaster.id = disasterInfos[i].Id;
                        disaster.zhtmc = disasterInfos[i].ZHTMC;
                        disaster.zhtbh = disasterInfos[i].ZHTBH;
                        disaster.zhtlx = disasterInfos[i].ZHTLX;
                        disaster.zxjd = disasterInfos[i].ZXJD;
                        disaster.zxwd = disasterInfos[i].ZXWD;
                        disaster.bz = disasterInfos[i].BZ;
                        disastertabledata.push(disaster);
                    }
                    disasterviewtable.reload({ id: 'disasterviewtableid', data: disastertabledata });

                    table.on('tool(disaster-view)', function (obj) {
                        var data = obj.data;
                        var layEvent = obj.event;

                        if (layEvent === 'disasterview') {
                            //灾害体信息
                            DisasterInfoView(obj.data);
                        }
                    });
                }
            }, datatype: "json"
        });


        //TODO测绘信息
        $.ajax({
            url: servicesurl + "/api/Survey/GetSurveyInfo", type: "get", data: { "id": id, "cookie": document.cookie },
            success: function (result) {
                if (result == "") {
                    //清除测绘信息
                }
                else {
                }

            }, datatype: "json"
        });


        //TODO地质信息
        $.ajax({
            url: servicesurl + "/api/Geology/GetGeologyInfo", type: "get", data: { "id": id, "cookie": document.cookie },
            success: function (result) {
                if (result == "") {
                    //清除地质信息
                }
                else {
                }
            }, datatype: "json"
        });


        //监测剖面信息
        var sectiontabledata = [];
        var sectiontableview = table.render({
            elem: '#sectiontable-view'
            , id: 'sectiontableviewid'
            , title: '监测剖面'
            , skin: 'line'
            , even: false
            , page: {
                layout: ['prev', 'page', 'next', 'count']
            }
            , limit: 11
            , toolbar: true
            , totalRow: false
            , initSort: { field: 'id', type: 'asc' }
            , cols: [[
                { field: 'id', title: 'ID', hide: true }
                , { field: 'pmmc', title: '剖面名称', width: 200, align: "center" }
                , { field: 'pmbh', title: '剖面编号', width: 200, align: "center" }
                , { field: 'pmlx', title: '剖面类型', width: 160, align: "center" }
                , { field: 'pmdj', title: '剖面等级', width: 160, align: "center" }
                , { field: 'bz', title: '备注', align: "center" }
                , { fixed: 'right', width: 80, align: 'center', toolbar: '#table-toolbar-section' }
            ]]
            , data: sectiontabledata
        });
        $.ajax({
            url: servicesurl + "/api/Section/GetSection", type: "get", data: { "id": id, "cookie": document.cookie },
            success: function (data) {
                sectiontabledata = [];
                if (data == "") {
                    //无监测剖面信息
                    sectiontableview.reload({ id: 'sectiontableviewid', data: sectiontabledata });
                }
                else {
                    var sectionInfos = JSON.parse(data);

                    for (var i in sectionInfos) {
                        var section = new Object;
                        section.id = sectionInfos[i].Id;
                        section.pmmc = sectionInfos[i].PMMC;
                        section.pmbh = sectionInfos[i].PMBH;
                        section.pmlx = sectionInfos[i].PMLX;
                        section.pmdj = sectionInfos[i].PMDJ;
                        section.bz = sectionInfos[i].BZ;
                        sectiontabledata.push(section);
                    }
                    sectiontableview.reload({ id: 'sectiontableviewid', data: sectiontabledata });

                    table.on('tool(sectiontable-view)', function (obj) {
                        var data = obj.data;
                        var layEvent = obj.event;

                        if (layEvent === 'sectionview') {
                            layer.open({
                                type: 1
                                , title: ['监测剖面信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
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


        //监测点信息
        var monitortabledata = [];
        var monitortableview = table.render({
            elem: '#monitortable-view'
            , id: 'monitortableviewid'
            , title: '监测点'
            , skin: 'line'
            , even: false
            , page: {
                layout: ['prev', 'page', 'next', 'count']
            }
            , limit: 10
            , toolbar: true
            , totalRow: false
            , initSort: { field: 'id' }
            , cols: [[
                { field: 'id', title: 'ID', hide: true }
                , { field: 'jcdmc', title: '监测点名称', align: "center" }
                , { field: 'jcdbh', title: '监测点编号', align: "center" }
                , { field: 'jcff', title: '监测方法', align: "center" }
                , { field: 'jczlx', title: '监测站类型', align: "center" }
                , { field: 'bz', title: '备注', align: "center" }
                , { fixed: 'right', width: 80, align: 'center', toolbar: '#table-toolbar-monitor' }
            ]]
            , data: monitortabledata
        });
        $.ajax({
            url: servicesurl + "/api/Monitor/GetMonitor", type: "get", data: { "id": id, "cookie": document.cookie },
            success: function (result) {
                if (result == "") {
                    //无监测设计信息
                    monitortableview.reload({ id: 'monitortableviewid', data: [] });
                }
                else {
                    var monitorinfos = JSON.parse(result);

                    var disasterinfo = [];//灾害体
                    var methodinfo = [];//监测方法
                    var sectioninfo = [];//监测剖面

                    for (var i in monitorinfos) {
                        if (monitorinfos[i].DisasterString != null) {
                            if (disasterinfo.length != 0) {
                                var isin = false;
                                for (var j in disasterinfo) {
                                    if (disasterinfo[j].id == monitorinfos[i].DisasterString.Id) {
                                        isin = true;
                                        break;
                                    }
                                }

                                if (!isin) {
                                    var di = new Object;
                                    di.title = monitorinfos[i].DisasterString.ZHTBH;
                                    di.id = monitorinfos[i].DisasterString.Id;
                                    disasterinfo.push(di);
                                }
                            }
                            else {
                                var di = new Object;
                                di.title = monitorinfos[i].DisasterString.ZHTBH;
                                di.id = monitorinfos[i].DisasterString.Id;
                                disasterinfo.push(di);
                                curdisasterid = monitorinfos[i].DisasterString.Id;
                            }
                        }

                        if (monitorinfos[i].SectionString != null) {
                            if (sectioninfo.length != 0) {
                                var isin = false;
                                for (var j in sectioninfo) {
                                    if (sectioninfo[j].id == monitorinfos[i].SectionString.Id) {
                                        isin = true;
                                        break;
                                    }
                                }

                                if (!isin) {
                                    var si = new Object;
                                    si.title = monitorinfos[i].SectionString.PMBH;
                                    si.id = monitorinfos[i].SectionString.Id;
                                    sectioninfo.push(si);
                                }
                            }
                            else {
                                var si = new Object;
                                si.title = monitorinfos[i].SectionString.PMBH;
                                si.id = monitorinfos[i].SectionString.Id;
                                sectioninfo.push(si);
                            }
                        }

                        if (monitorinfos[i].MonitorString != null) {
                            if (methodinfo.length != 0) {
                                var isin = false;
                                for (var j in methodinfo) {
                                    if (methodinfo[j].title == monitorinfos[i].MonitorString.JCFF) {
                                        isin = true;
                                        break;
                                    }
                                }

                                if (!isin) {
                                    var mi = new Object;
                                    mi.title = monitorinfos[i].MonitorString.JCFF;
                                    mi.id = monitorinfos[i].MonitorString.Id;
                                    methodinfo.push(mi);
                                }
                            }
                            else {
                                var mi = new Object;
                                mi.title = monitorinfos[i].MonitorString.JCFF;
                                mi.id = monitorinfos[i].MonitorString.Id;
                                methodinfo.push(mi);
                            }
                        }
                    }

                    var monitortablebydisasterdata = [];//按灾害体筛选的监测点数据
                    var monitortablebymethoddata = [];//按监测方法筛选的监测点数据
                    var monitortablebysectiondata = [];//按监测剖面筛选的监测点数据  



                    //初始一二级筛选条件
                    document.getElementById('monitorclassitemid').innerHTML = "";
                    for (var i in disasterinfo) {
                        if (i === 0) {
                            document.getElementById('monitorclassitemid').innerHTML += '<option value="' + disasterinfo[i].id + ' selected="selected"">' + disasterinfo[i].title + '</option>';
                        }
                        else {
                            document.getElementById('monitorclassitemid').innerHTML += '<option value="' + disasterinfo[i].id + '">' + disasterinfo[i].title + '</option>';
                        }
                    }
                    form.render();
                    form.render('select');
                    if (disasterinfo.length > 0) {
                        DefaultbyDisaster(disasterinfo[0].id);
                    }

                    //切换一级筛选条件
                    form.on('select(monitorclass)', function (data) {
                        document.getElementById('monitorclassitemid').innerHTML = "";
                        monitortableview.reload({ id: 'monitortableviewid', data: [] });

                        if (data.value === "0") {
                            for (var i in disasterinfo) {
                                if (i === 0) {
                                    document.getElementById('monitorclassitemid').innerHTML += '<option value="' + disasterinfo[i].id + ' selected="selected"">' + disasterinfo[i].title + '</option>';
                                }
                                else {
                                    document.getElementById('monitorclassitemid').innerHTML += '<option value="' + disasterinfo[i].id + '">' + disasterinfo[i].title + '</option>';
                                }
                            }

                            if (disasterinfo.length > 0) {
                                DefaultbyDisaster(disasterinfo[0].id);
                            }
                        }
                        else if (data.value === "1") {
                            for (var i in methodinfo) {
                                if (i === 0) {
                                    document.getElementById('monitorclassitemid').innerHTML += '<option value="' + methodinfo[i].id + ' selected="selected"">' + methodinfo[i].title + '</option>';
                                }
                                else {
                                    document.getElementById('monitorclassitemid').innerHTML += '<option value="' + methodinfo[i].id + '">' + methodinfo[i].title + '</option>';
                                }
                            }

                            if (methodinfo.length > 0) {
                                DefaultbyMethod(methodinfo[0].title);
                            }
                        }
                        else if (data.value === "2") {
                            for (var i in sectioninfo) {
                                if (i === 0) {
                                    document.getElementById('monitorclassitemid').innerHTML += '<option value="' + sectioninfo[i].id + ' selected="selected"">' + sectioninfo[i].title + '</option>';
                                }
                                else {
                                    document.getElementById('monitorclassitemid').innerHTML += '<option value="' + sectioninfo[i].id + '">' + sectioninfo[i].title + '</option>';
                                }
                            }

                            if (sectioninfo.length > 0) {
                                DefaultbySection(sectioninfo[0].id);
                            }
                        }

                        form.render();
                        form.render('select');
                    });

                    //按灾害体默认展示
                    function DefaultbyDisaster(obj) {
                        monitortablebydisasterdata = [];
                        for (var i in monitorinfos) {
                            var monitor = new Object;
                            monitor.id = monitorinfos[i].MonitorString.Id;
                            monitor.jcdmc = monitorinfos[i].MonitorString.JCDMC;
                            monitor.jcdbh = monitorinfos[i].MonitorString.JCDBH;
                            monitor.jcff = monitorinfos[i].MonitorString.JCFF;
                            monitor.jczlx = monitorinfos[i].MonitorString.JCZLX;
                            monitor.pmwzx = monitorinfos[i].MonitorString.PMWZX;
                            monitor.pmwzy = monitorinfos[i].MonitorString.PMWZY;
                            monitor.gc = monitorinfos[i].MonitorString.GC;
                            monitor.sd = monitorinfos[i].MonitorString.SD;
                            monitor.ks = monitorinfos[i].MonitorString.KS;
                            monitor.kjck = monitorinfos[i].MonitorString.KJCK;
                            monitor.bz = monitorinfos[i].MonitorString.BZ;

                            if (monitorinfos[i].DisasterString != null) {
                                if (monitorinfos[i].DisasterString.Id == obj) {
                                    monitortablebydisasterdata.push(monitor);
                                }
                            }
                        }
                        monitortableview.reload({ id: 'monitortableviewid', data: monitortablebydisasterdata });
                    }
                    //按监测方法默认展示
                    function DefaultbyMethod(obj) {
                        monitortablebymethoddata = [];
                        for (var i in monitorinfos) {
                            var monitor = new Object;
                            monitor.id = monitorinfos[i].MonitorString.Id;
                            monitor.jcdmc = monitorinfos[i].MonitorString.JCDMC;
                            monitor.jcdbh = monitorinfos[i].MonitorString.JCDBH;
                            monitor.jcff = monitorinfos[i].MonitorString.JCFF;
                            monitor.jczlx = monitorinfos[i].MonitorString.JCZLX;
                            monitor.pmwzx = monitorinfos[i].MonitorString.PMWZX;
                            monitor.pmwzy = monitorinfos[i].MonitorString.PMWZY;
                            monitor.gc = monitorinfos[i].MonitorString.GC;
                            monitor.sd = monitorinfos[i].MonitorString.SD;
                            monitor.ks = monitorinfos[i].MonitorString.KS;
                            monitor.kjck = monitorinfos[i].MonitorString.KJCK;
                            monitor.bz = monitorinfos[i].MonitorString.BZ;

                            if (monitorinfos[i].MonitorString.JCFF === obj) {
                                monitortablebymethoddata.push(monitor);
                            }
                        }
                        monitortableview.reload({ id: 'monitortableviewid', data: monitortablebymethoddata });
                    }
                    //按监测剖面默认展示
                    function DefaultbySection(obj) {
                        monitortablebysectiondata = [];
                        for (var i in monitorinfos) {
                            var monitor = new Object;
                            monitor.id = monitorinfos[i].MonitorString.Id;
                            monitor.jcdmc = monitorinfos[i].MonitorString.JCDMC;
                            monitor.jcdbh = monitorinfos[i].MonitorString.JCDBH;
                            monitor.jcff = monitorinfos[i].MonitorString.JCFF;
                            monitor.jczlx = monitorinfos[i].MonitorString.JCZLX;
                            monitor.pmwzx = monitorinfos[i].MonitorString.PMWZX;
                            monitor.pmwzy = monitorinfos[i].MonitorString.PMWZY;
                            monitor.gc = monitorinfos[i].MonitorString.GC;
                            monitor.sd = monitorinfos[i].MonitorString.SD;
                            monitor.ks = monitorinfos[i].MonitorString.KS;
                            monitor.kjck = monitorinfos[i].MonitorString.KJCK;
                            monitor.bz = monitorinfos[i].MonitorString.BZ;

                            if (monitorinfos[i].SectionString != null) {
                                if (monitorinfos[i].SectionString.Id == obj) {
                                    monitortablebysectiondata.push(monitor);
                                }
                            }
                        }
                        monitortableview.reload({ id: 'monitortableviewid', data: monitortablebysectiondata });
                    }

                    //切换二级筛选条件
                    form.on('select(monitorclassitem)', function (data) {
                        var monitorviewform = form.val("monitorviewform");
                        if (monitorviewform.monitorclass == "0") {
                            //按不同灾害体
                            DefaultbyDisaster(monitorviewform.monitorclassitem);
                        } else if (monitorviewform.monitorclass == "1") {
                            //按不同监测方法
                            for (var i in methodinfo) {
                                if (methodinfo[i].id == monitorviewform.monitorclassitem) {
                                    DefaultbyMethod(methodinfo[i].title);
                                    break;
                                }
                            }
                        } else if (monitorviewform.monitorclass == "2") {
                            //按不同监测剖面
                            DefaultbySection(monitorviewform.monitorclassitem);
                        }
                    });

                    //查看监测点详细信息
                    table.on('tool(monitortable-view)', function (obj) {
                        var data = obj.data;
                        var layEvent = obj.event;

                        if (layEvent === 'monitorview') {
                            layer.open({
                                type: 1
                                , title: ['监测点信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
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


        //TODO文档信息
        $.ajax({
            url: servicesurl + "/api/Document/GetDocumentInfo", type: "get", data: { "id": id, "cookie": document.cookie },
            success: function (result) {
                if (result == "") {
                    //清除文档信息
                }
                else {
                }
            }, datatype: "json"
        });

        //TODO项目成员
        $.ajax({
            url: servicesurl + "/api/Member/GetMemberInfo", type: "get", data: { "id": id, "cookie": document.cookie },
            success: function (result) {
                if (result == "") {
                    //清除成员信息
                }
                else {
                }
            }, datatype: "json"
        });

        //TODO参建单位
        $.ajax({
            url: servicesurl + "/api/Company/GetCompanyInfo", type: "get", data: { "id": id, "cookie": document.cookie },
            success: function (result) {
                if (result == "") {
                    //清除单位信息
                }
                else {
                }
            }, datatype: "json"
        });

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
                , content: '<!--编辑项目--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:1px 0px"><ul class="layui-tab-title"><li class="layui-this">基本信息</li><li>灾害体信息</li><li>测绘信息</li><li>地质信息</li><li>监测设计</li><li>文档信息</li><li>项目成员</li><li>参建单位</li></ul><div class="layui-tab-content" style="margin:0px 0px"><!--基本信息--><div class="layui-tab-item layui-show"><form class="layui-form" style="margin-top:0px" lay-filter="editprojectinfoform"><div class="layui-form-item"><label class="layui-form-label">项目名称</label><div class="layui-input-block"><input type="text" name="xmmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">项目编码</label><div class="layui-input-block"><input type="text" name="xmbm" lay-verify="required" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label">项目类型</label><div class="layui-input-block"><select id="xmlxid" name="xmlx"><option value="">请选择</option></select></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">项目类别</label><div class="layui-input-block"><select id="xmlbid" name="xmlb"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4" style="width:25%"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">中心经度</label><div class="layui-input-block"><input type="text" name="zxjd" lay-verify="required|number" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div></div><div class="layui-col-md4" style="width:25%"><div class="grid-demo"><label class="layui-form-label">中心纬度</label><div class="layui-input-block"><input type="text" name="zxwd" lay-verify="required|number" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div></div><div class="layui-col-md4" style="width:50%"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">坐标系统</label><div class="layui-input-block"><select id="kjckid" name="kjck" lay-verify="required"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label">行政区划</label><div class="layui-input-inline" style="width:200px;"><select id="provinceid" name="province" lay-verify="required"><option value="">省/市</option><option value="0">重庆市</option></select></div><div class="layui-input-inline" style="width:200px;"><select id="cityid" name="city" lay-verify="required"><option value="">市辖区/县</option><option value="0">市辖区</option><option value="1">县</option></select></div><div class="layui-input-inline" style="width:200px;"><select id="districtid" name="district" lay-verify="required"><option value="">区/县</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">项目位置</label><div class="layui-input-block"><input type="text" name="xmwz" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><div class="layui-inline"><label class="layui-form-label">开始时间</label><div class="layui-input-inline" style="width:250px;"><input type="text" id="xmkssjid" name="xmkssj" lay-verify="date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" /></div></div></div></div><div class="layui-col-md6"><div class="grid-demo"><div class="layui-inline"><label class="layui-form-label">结束时间</label><div class="layui-input-inline" style="width:250px;"><input type="text" id="xmjssjid" name="xmjssj" lay-verify="date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" /></div></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">灾害点名称</label><div class="layui-input-block"><input type="text" name="zhdmc" lay-verify="required" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label">灾害点编号</label><div class="layui-input-block"><input type="text" name="zhdtybh" lay-verify="required" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">灾害类型</label><div class="layui-input-block"><select id="zhlxid" name="zhlx" lay-verify="required"><option value="">请选择</option></select></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label">灾害等级</label><div class="layui-input-block"><select id="zhdjid" name="zhdj"><option value="">请选择</option></select></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">灾害险情</label><div class="layui-input-block"><select id="zhxqid" name="zhxq"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">预警级别</label><div class="layui-input-block"><select id="yjjbid" name="yjjb"><option value="">请选择</option></select></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label">监测级别</label><div class="layui-input-block"><select id="jcjbid" name="jcjb"><option value="">请选择</option></select></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">监测手段</label><div class="layui-input-block"><select id="jcsdid" name="jcsd"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">是否库区</label><div class="layui-input-block"><select id="sfkqid" name="sfkq"></select></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label">是否涉水</label><div class="layui-input-block"><select id="sfssid" name="sfss"></select></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">是否结束</label><div class="layui-input-block"><select id="sfjsid" name="sfjs"></select></div></div></div></div></div><div class="layui-form-item"><div class="layui-row layui-col-space1"><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">面积</label><div class="layui-input-block"><input type="text" name="mj" autocomplete="off" class="layui-input" placeholder="请输入" /></div></div></div><div class="layui-col-md3"><div class="grid-demo"><label class="layui-form-label">面积单位</label><div class="layui-input-block"><select id="mjdwid" name="mjdw" lay-verify="required"><option value="">请选择</option></select></div></div></div><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">体积</label><div class="layui-input-block"><input type="text" name="tj" autocomplete="off" class="layui-input" placeholder="请输入" /></div></div></div><div class="layui-col-md3"><div class="grid-demo"><label class="layui-form-label">体积单位</label><div class="layui-input-block"><select id="tjdwid" name="tjdw" lay-verify="required"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item"><div class="layui-row layui-col-space1"><div class="layui-col-md3" style="width:25%"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">威胁户数</label><div class="layui-input-block"><input type="text" name="wxhs" autocomplete="off" class="layui-input" placeholder="请输入" /></div></div></div><div class="layui-col-md3" style="width:25%"><div class="grid-demo"><label class="layui-form-label">威胁人数</label><div class="layui-input-block"><input type="text" name="wxrs" autocomplete="off" class="layui-input" placeholder="请输入" /></div></div></div><div class="layui-col-md3" style="width:50%"><label class="layui-form-label" style="width:200px">威胁房屋面积(平方米)</label><input type="text" name="wxfwmj" autocomplete="off" class="layui-input" placeholder="请输入" style="width:180px;float:right" /></div></div></div><div class="layui-form-item"><label class="layui-form-label">其他威胁</label><div class="layui-input-block"><textarea name="qtwx" class="layui-textarea"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label">备注</label><div class="layui-input-block"><input type="text" name="bz" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item" style="margin-top:5px"><div style="position:absolute;right:5px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="editprojectinfosubmit" style="width:120px">保存</button></div></div></form></div><!--灾害体--><div class="layui-tab-item"><div class="layui-card-body" style="padding:0px 0px;"><table id="disaster-edit" lay-filter="disaster-edit"></table><script type="text/html" id="adddisaster"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm" style="font-size:14px" lay-event="adddisaster">添加灾害体</button></div></script><script type="text/html" id="table-toolbar-disaster"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="disasterview"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-blue layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="disasteredit"><i class="layui-icon layui-icon-edit" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="disasterdel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div><!--测绘信息--><div class="layui-tab-item">测绘信息</div><!--地质信息--><div class="layui-tab-item">地质信息</div><!--监测设计信息--><div class="layui-tab-item" style="margin:1px 0"><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px 0px"><ul class="layui-tab-title"><li class="layui-this" style="width:45%">监测剖面</li><li style="width:45%">监测点</li></ul><div class="layui-tab-content"><!--监测剖面--><div class="layui-tab-item layui-show"><div class="layui-card-body" style="padding:0px 0px;"><table class="layui-hide" id="sectiontable-edit" lay-filter="sectiontable-edit"></table><script type="text/html" id="addsection"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm" style="font-size:14px" lay-event="addsection">添加监测剖面</button></div></script><script type="text/html" id="table-toolbar-section"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;" lay-event="sectionview"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important"></i></a><a class="layui-btn layui-bg-blue layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="sectionedit"><i class="layui-icon layui-icon-edit" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="sectiondel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div><!--监测点--><div class="layui-tab-item"><div class="layui-card-body" style="padding:0px 0px;"><form class="layui-form layui-form-pane" lay-filter="monitoreditform" action=""><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><div class="layui-input-block" style="margin-left:0px;margin-right:5px;margin-bottom:5px;"><select id="monitorclassid" name="monitorclass" lay-filter="monitorclass"><option value="0" selected="selected">按灾害体分类</option><option value="1">按监测方法分类</option><option value="2">按监测剖面分类</option></select></div></div></div><div class="layui-col-md6"><div class="grid-demo"><div class="layui-input-block" style="margin-left:5px;margin-bottom:5px;"><select id="monitorclassitemid" name="monitorclassitem" lay-filter="monitorclassitem"></select></div></div></div></div></form><table class="layui-hide" id="monitortable-edit" lay-filter="monitortable-edit"></table><script type="text/html" id="addmonitor"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm" style="font-size:14px" lay-event="addmonitor">添加监测点</button></div></script><script type="text/html" id="table-toolbar-monitor"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;" lay-event="monitorview"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important"></i></a><a class="layui-btn layui-bg-blue layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="monitoredit"><i class="layui-icon layui-icon-edit" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="monitordel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div></div></div></div><!--文档信息--><div class="layui-tab-item">文档信息</div><!--项目成员信息--><div class="layui-tab-item">项目成员信息</div><!--参建单位信息--><div class="layui-tab-item">参建单位信息</div></div></div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    //项目信息
                    $.ajax({
                        url: servicesurl + "/api/MonitorProject/GetProjectInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                        success: function (data) {
                            if (data == "") {
                                layer.msg("无项目信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                form.val("editprojectinfoform", {
                                    "xmmc": ""
                                    , "xmbm": ""
                                    , "zxjd": ""
                                    , "zxwd": ""
                                    , "xzqdm": ""
                                    , "xmwz": ""
                                    , "xmkssj": ""
                                    , "xmjssj": ""
                                    , "zhdmc": ""
                                    , "zhdtybh": ""
                                    , "sfkq": ""
                                    , "sfss": ""
                                    , "sfjs": ""
                                    , "mj": ""
                                    , "tj": ""
                                    , "wxhs": ""
                                    , "wxrs": ""
                                    , "wxfwmj": ""
                                    , "qtwx": ""
                                    , "bz": ""
                                });

                                if (xmlxs.length > 0) {
                                    for (var i in xmlxs) {
                                        document.getElementById("xmlxid").innerHTML += '<option value="' + xmlxs[i].value + '">' + xmlxs[i].name + '</option>';
                                    }
                                }
                                if (xmlbs.length > 0) {
                                    for (var i in xmlbs) {
                                        document.getElementById("xmlbid").innerHTML += '<option value="' + xmlbs[i].value + '">' + xmlbs[i].name + '</option>';
                                    }
                                }
                                if (srids.length > 0) {
                                    for (var i in srids) {
                                        if (srids[i].name == "China Geodetic Coordinate System 2000") {
                                            document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '" selected>' + srids[i].name + '</option>';
                                        }
                                        else {
                                            document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '">' + srids[i].name + '</option>';
                                        }
                                    }
                                }
                                if (xjxzqs.length > 0) {
                                    for (var i in xjxzqs) {
                                        document.getElementById("districtid").innerHTML += '<option value="' + xjxzqs[i].value + '">' + xjxzqs[i].name + '</option>';
                                    }
                                }
                                if (zhlxs.length > 0) {
                                    for (var i in zhlxs) {
                                        document.getElementById("zhlxid").innerHTML += '<option value="' + zhlxs[i].value + '">' + zhlxs[i].name + '</option>';
                                    }
                                }
                                if (zhdjs.length > 0) {
                                    for (var i in zhdjs) {
                                        document.getElementById("zhdjid").innerHTML += '<option value="' + zhdjs[i].value + '">' + zhdjs[i].name + '</option>';
                                    }
                                }
                                if (zhxqs.length > 0) {
                                    for (var i in zhxqs) {
                                        document.getElementById("zhxqid").innerHTML += '<option value="' + zhxqs[i].value + '">' + zhxqs[i].name + '</option>';
                                    }
                                }
                                if (yjjbs.length > 0) {
                                    for (var i in yjjbs) {
                                        document.getElementById("yjjbid").innerHTML += '<option value="' + yjjbs[i].value + '">' + yjjbs[i].name + '</option>';
                                    }
                                }
                                if (jcjbs.length > 0) {
                                    for (var i in jcjbs) {
                                        document.getElementById("jcjbid").innerHTML += '<option value="' + jcjbs[i].value + '">' + jcjbs[i].name + '</option>';
                                    }
                                }
                                if (jcsds.length > 0) {
                                    for (var i in jcsds) {
                                        document.getElementById("jcsdid").innerHTML += '<option value="' + jcsds[i].value + '">' + jcsds[i].name + '</option>';
                                    }
                                }
                                if (mjdws.length > 0) {
                                    for (var i in mjdws) {
                                        if (mjdws[i].name == "平方米") {
                                            document.getElementById("mjdwid").innerHTML += '<option value="' + mjdws[i].value + '" selected>' + mjdws[i].name + '</option>';
                                        }
                                        else {
                                            document.getElementById("mjdwid").innerHTML += '<option value="' + mjdws[i].value + '">' + mjdws[i].name + '</option>';
                                        }
                                    }
                                }
                                if (tjdws.length > 0) {
                                    for (var i in tjdws) {
                                        if (tjdws[i].name == "立方米") {
                                            document.getElementById("tjdwid").innerHTML += '<option value="' + tjdws[i].value + '" selected>' + tjdws[i].name + '</option>';
                                        }
                                        else {
                                            document.getElementById("tjdwid").innerHTML += '<option value="' + tjdws[i].value + '">' + tjdws[i].name + '</option>';
                                        }
                                    }
                                }

                                //渲染开始时间
                                date.render({
                                    elem: '#xmkssjid'
                                });
                                //渲染结束时间
                                date.render({
                                    elem: '#xmjssjid'
                                });
                                form.render();
                                form.render('select');
                            }
                            else {
                                var projectinfo = JSON.parse(data);

                                form.val("editprojectinfoform", {
                                    "xmmc": projectinfo.XMMC
                                    , "xmbm": projectinfo.XMBM
                                    , "zxjd": projectinfo.ZXJD
                                    , "zxwd": projectinfo.ZXWD
                                    , "kjck": projectinfo.SRID
                                    , "xzqdm": projectinfo.XZQBM
                                    , "xmwz": projectinfo.XMWZ
                                    , "xmkssj": projectinfo.XMKSSJ
                                    , "xmjssj": projectinfo.XMJSSJ
                                    , "zhdmc": projectinfo.ZHDMC
                                    , "zhdtybh": projectinfo.ZHDTYBH
                                    , "mj": projectinfo.MJ
                                    , "tj": projectinfo.TJ
                                    , "wxhs": projectinfo.WXHS
                                    , "wxrs": projectinfo.WXRS
                                    , "wxfwmj": projectinfo.WXFWMJ
                                    , "qtwx": projectinfo.QTWX
                                    , "bz": projectinfo.BZ
                                });

                                if (xmlxs.length > 0) {
                                    for (var i in xmlxs) {
                                        if (xmlxs[i].name === projectinfo.XMLX) {
                                            document.getElementById("xmlxid").innerHTML += '<option value="' + xmlxs[i].value + '" selected>' + xmlxs[i].name + '</option>';
                                        }
                                        else {
                                            document.getElementById("xmlxid").innerHTML += '<option value="' + xmlxs[i].value + '">' + xmlxs[i].name + '</option>';
                                        }
                                    }
                                }
                                if (xmlbs.length > 0) {
                                    for (var i in xmlbs) {
                                        if (xmlbs[i].name === projectinfo.XMLB) {
                                            document.getElementById("xmlbid").innerHTML += '<option value="' + xmlbs[i].value + '" selected>' + xmlbs[i].name + '</option>';
                                        }
                                        else {
                                            document.getElementById("xmlbid").innerHTML += '<option value="' + xmlbs[i].value + '">' + xmlbs[i].name + '</option>';
                                        }
                                    }
                                }
                                if (srids.length > 0) {
                                    for (var i in srids) {
                                        if (srids[i].name == projectinfo.SRID) {
                                            document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '" selected>' + srids[i].name + '</option>';
                                        }
                                        else {
                                            document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '">' + srids[i].name + '</option>';
                                        }
                                    }
                                }
                                if (xjxzqs.length > 0) {
                                    for (var i in xjxzqs) {
                                        document.getElementById("districtid").innerHTML += '<option value="' + xjxzqs[i].value + '">' + xjxzqs[i].name + '</option>';
                                    }
                                }
                                if (zhlxs.length > 0) {
                                    for (var i in zhlxs) {
                                        if (zhlxs[i].name === projectinfo.ZHLX) {
                                            document.getElementById("zhlxid").innerHTML += '<option value="' + zhlxs[i].value + '" selected>' + zhlxs[i].name + '</option>';
                                        }
                                        else {
                                            document.getElementById("zhlxid").innerHTML += '<option value="' + zhlxs[i].value + '">' + zhlxs[i].name + '</option>';
                                        }
                                    }
                                }
                                if (zhdjs.length > 0) {
                                    for (var i in zhdjs) {
                                        if (zhdjs[i].name === projectinfo.ZHDJ) {
                                            document.getElementById("zhdjid").innerHTML += '<option value="' + zhdjs[i].value + '" selected>' + zhdjs[i].name + '</option>';
                                        }
                                        else {
                                            document.getElementById("zhdjid").innerHTML += '<option value="' + zhdjs[i].value + '">' + zhdjs[i].name + '</option>';
                                        }
                                    }
                                }
                                if (zhxqs.length > 0) {
                                    for (var i in zhxqs) {
                                        if (zhxqs[i].name === projectinfo.ZHXQ) {
                                            document.getElementById("zhxqid").innerHTML += '<option value="' + zhxqs[i].value + '" selected>' + zhxqs[i].name + '</option>';
                                        }
                                        else {
                                            document.getElementById("zhxqid").innerHTML += '<option value="' + zhxqs[i].value + '">' + zhxqs[i].name + '</option>';
                                        }
                                    }
                                }
                                if (yjjbs.length > 0) {
                                    for (var i in yjjbs) {
                                        if (yjjbs[i].name === projectinfo.YJJB) {
                                            document.getElementById("yjjbid").innerHTML += '<option value="' + yjjbs[i].value + '" selected>' + yjjbs[i].name + '</option>';
                                        }
                                        else {
                                            document.getElementById("yjjbid").innerHTML += '<option value="' + yjjbs[i].value + '">' + yjjbs[i].name + '</option>';
                                        }
                                    }
                                }
                                if (jcjbs.length > 0) {
                                    for (var i in jcjbs) {
                                        if (jcjbs[i].name === projectinfo.JCJB) {
                                            document.getElementById("jcjbid").innerHTML += '<option value="' + jcjbs[i].value + '" selected>' + jcjbs[i].name + '</option>';
                                        }
                                        else {
                                            document.getElementById("jcjbid").innerHTML += '<option value="' + jcjbs[i].value + '">' + jcjbs[i].name + '</option>';
                                        }
                                    }
                                }
                                if (jcsds.length > 0) {
                                    for (var i in jcsds) {
                                        if (jcsds[i].name === projectinfo.JCSD) {
                                            document.getElementById("jcsdid").innerHTML += '<option value="' + jcsds[i].value + '" selected>' + jcsds[i].name + '</option>';
                                        }
                                        else {
                                            document.getElementById("jcsdid").innerHTML += '<option value="' + jcsds[i].value + '">' + jcsds[i].name + '</option>';
                                        }
                                    }
                                }
                                if (mjdws.length > 0) {
                                    for (var i in mjdws) {
                                        if (mjdws[i].name === projectinfo.MJDW) {
                                            document.getElementById("mjdwid").innerHTML += '<option value="' + mjdws[i].value + '" selected>' + mjdws[i].name + '</option>';
                                        }
                                        else {
                                            document.getElementById("mjdwid").innerHTML += '<option value="' + mjdws[i].value + '">' + mjdws[i].name + '</option>';
                                        }
                                    }
                                }
                                if (tjdws.length > 0) {
                                    for (var i in tjdws) {
                                        if (tjdws[i].name === projectinfo.TJDW) {
                                            document.getElementById("tjdwid").innerHTML += '<option value="' + tjdws[i].value + '" selected>' + tjdws[i].name + '</option>';
                                        }
                                        else {
                                            document.getElementById("tjdwid").innerHTML += '<option value="' + tjdws[i].value + '">' + tjdws[i].name + '</option>';
                                        }
                                    }
                                }

                                if (projectinfo.SFKQ === "是") {
                                    document.getElementById("sfkqid").innerHTML += '<option value="">请选择</option><option value="true" selected>是</option><option value="false">否</option>';
                                } else if (projectinfo.SFKQ === "否") {
                                    document.getElementById("sfkqid").innerHTML += '<option value="">请选择</option><option value="true">是</option><option value="false" selected>否</option>';
                                } else {
                                    document.getElementById("sfkqid").innerHTML += '<option value="">请选择</option><option value="true">是</option><option value="false">否</option>';
                                }

                                if (projectinfo.SFSS === "是") {
                                    document.getElementById("sfssid").innerHTML += '<option value="true" selected>是</option><option value="false">否</option>';
                                } else if (projectinfo.SFSS === "否") {
                                    document.getElementById("sfssid").innerHTML += '<option value="">请选择</option><option value="true">是</option><option value="false" selected>否</option>';
                                } else {
                                    document.getElementById("sfssid").innerHTML += '<option value="">请选择</option><option value="true">是</option><option value="false">否</option>';
                                }

                                if (projectinfo.SFJS === "是") {
                                    document.getElementById("sfjsid").innerHTML += '<option value="">请选择</option><option value="true" selected>是</option><option value="false">否</option>';
                                } else if (projectinfo.SFJS === "否") {
                                    document.getElementById("sfjsid").innerHTML += '<option value="">请选择</option><option value="true">是</option><option value="false" selected>否</option>';
                                } else {
                                    document.getElementById("sfjsid").innerHTML += '<option value="">请选择</option><option value="true">是</option><option value="false">否</option>';
                                }

                                //渲染开始时间
                                date.render({
                                    elem: '#xmkssjid'
                                });
                                //渲染结束时间
                                date.render({
                                    elem: '#xmjssjid'
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

                        $.ajax({
                            url: servicesurl + "/api/MonitorProject/UpdateProject", type: "put", data: data.field,
                            success: function (result) {
                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            }, datatype: "json"
                        });
                        return false;
                    });




                    //灾害体信息
                    var disastertabledata = [];
                    var disastertablerdit = table.render({
                        elem: '#disaster-edit'
                        , id: 'disastertableid'
                        , title: '灾害体信息'
                        , skin: 'line'
                        , even: false
                        , page: {
                            layout: ['prev', 'page', 'next', 'count']
                        }
                        , limit: 14
                        , initSort: { field: 'id', type: 'asc' }
                        , toolbar: '#adddisaster'
                        , totalRow: false
                        , cols: [[
                            { field: 'id', title: 'ID', hide: true }
                            , { field: 'zhtmc', title: '灾害体名称', align: "center" }
                            , { field: 'zhtbh', title: '灾害体编号', align: "center" }
                            , { field: 'zhtlx', title: '灾害体类型', align: "center" }
                            , { field: 'zxjd', title: '中心经度', align: "center" }
                            , { field: 'zxwd', title: '中心纬度', align: "center" }
                            , { field: 'bz', title: '备注', align: "center" }
                            , { fixed: 'right', width: 120, align: 'center', toolbar: '#table-toolbar-disaster' }
                        ]]
                        , data: disastertabledata
                    });

                    //获取灾害体信息
                    GetDisaster();
                    function GetDisaster() {
                        $.ajax({
                            url: servicesurl + "/api/Disaster/GetDisaster", type: "get", data: { "id": id, "cookie": document.cookie },
                            success: function (data) {
                                disastertabledata = [];
                                if (data == "") {
                                    //无灾害体信息
                                    disastertablerdit.reload({ id: 'disastertableid', data: disastertabledata });
                                }
                                else {
                                    var disasterInfos = JSON.parse(data);

                                    //构造灾害体表格数据
                                    for (var i in disasterInfos) {
                                        var disaster = new Object;
                                        disaster.id = disasterInfos[i].Id;
                                        disaster.zhtmc = disasterInfos[i].ZHTMC;
                                        disaster.zhtbh = disasterInfos[i].ZHTBH;
                                        disaster.zhtlx = disasterInfos[i].ZHTLX;
                                        disaster.zxjd = disasterInfos[i].ZXJD;
                                        disaster.zxwd = disasterInfos[i].ZXWD;
                                        disaster.bz = disasterInfos[i].BZ;
                                        disastertabledata.push(disaster);
                                    }
                                    disastertablerdit.reload({ id: 'disastertableid', data: disastertabledata });
                                }
                            }, datatype: "json"
                        });
                    }

                    
                    table.on('toolbar(disaster-edit)', function (obj) {
                        switch (obj.event) {
                            case 'adddisaster':
                                var adddisasterlayerindex = layer.open({
                                    type: 1
                                    , title: ['添加灾害体', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                    , area: ['400px', '400px']
                                    , shade: 0
                                    , offset: 'auto'
                                    , closeBtn: 1
                                    , maxmin: false
                                    , moveOut: true
                                    , content: '<form class="layui-form" style="margin-top:10px" lay-filter="adddisasterform"><div class="layui-form-item"><label class="layui-form-label">灾害体名称</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="zhtmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">灾害体编号</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="zhtbh" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">灾害体类型</label><div class="layui-input-block" style="padding-right:10px"><select id="zhtlxid" name="zhtlx" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">中心经度</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="zxjd" autocomplete="off" placeholder="请输入" lay-verify="required|number" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">中心纬度</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="zxwd" autocomplete="off" placeholder="请输入" lay-verify="required|number" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">备注</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="bz" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item" style="margin-top:30px"><div class="layui-input-block"><button type="submit" class="layui-btn" lay-submit="" lay-filter="adddisastersubmit" style="width:80px">提交</button><button type="reset" class="layui-btn layui-btn-primary" style="width:80px">重置</button></div></div></form>'
                                    , zIndex: layer.zIndex
                                    , success: function (layero) {
                                        layer.setTop(layero);

                                        if (zhlxs.length > 0) {
                                            for (var i in zhlxs) {
                                                document.getElementById("zhtlxid").innerHTML += '<option value="' + zhlxs[i].value + '">' + zhlxs[i].name + '</option>';
                                            }
                                        }
                                        form.render();
                                        form.render('select');

                                        form.on('submit(adddisastersubmit)', function (data) {
                                            data.field.id = id;
                                            data.field.cookie = document.cookie;

                                            $.ajax({
                                                url: servicesurl + "/api/Disaster/AddDisaster", type: "post", data: data.field,
                                                success: function (result) {
                                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                    //刷新灾害体表格
                                                    GetDisaster();
                                                }, datatype: "json"
                                            });

                                            layer.close(adddisasterlayerindex);
                                            return false;
                                        });
                                    }
                                    , end: function () { }
                                });
                                break;
                        };
                    });

                    //灾害体操作
                    table.on('tool(disaster-edit)', function (obj) {
                        var data = obj.data;
                        var layEvent = obj.event;

                        if (layEvent === 'disasterview') {
                            //灾害体信息
                            DisasterInfoView(obj.data);
                        }
                        else if (layEvent === 'disasteredit') {
                            //编辑灾害体属性
                            layer.open({
                                type: 1
                                , title: [obj.data.zhtmc + '-编辑', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                , area: ['1200px', '775px']
                                , shade: 0
                                , offset: 'auto'
                                , closeBtn: 1
                                , maxmin: false
                                , moveOut: true
                                , content: '<!--编辑灾害体属性--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px 0px"><ul class="layui-tab-title"><li class="layui-this">基本信息</li><li>属性</li><li>环境</li><li>基本特征</li><li>危险性分析</li><li>危害分析</li><li>预警模型参数</li></ul><div class="layui-tab-content" style="margin:0px 0px"><!--基本信息--><div class="layui-tab-item layui-show"><form class="layui-form" style="margin-top:0px" lay-filter="disasterinfoeditform"><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">灾害体名称</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zhtmc" class="layui-input" placeholder="请输入" lay-verify="required" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">灾害体编号</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zhtbh" class="layui-input" placeholder="请输入" lay-verify="required" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">灾害体类型</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zhtlx" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">灾害体中心经度</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zxjd" class="layui-input" lay-verify="required|number" placeholder="请输入" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">灾害体中心纬度</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zxwd" class="layui-input" lay-verify="required|number" placeholder="请输入" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">备注</label><div class="layui-input-block" style="margin-left:150px;"><textarea name="bz" class="layui-textarea" placeholder="请输入" style="min-height:420px!important"></textarea></div></div><div class="layui-form-item" style="margin-top:5px"><div style="position:absolute;right:5px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="editdisasterinfosubmit" style="width:120px">保存</button></div></div></form></div><!--环境--><div id="disasterpropertyedit" class="layui-tab-item"></div><!--环境--><div id="disasterenvironmentedit" class="layui-tab-item"></div><!--基本特征--><div id="disasterfeatureedit" class="layui-tab-item"></div><!--危险性分析--><div id="disasterdangeredit" class="layui-tab-item"></div><!--危害分析--><div id="disasterharmedit" class="layui-tab-item"></div><!--预警模型参数--><div id="disasterforecastedit" class="layui-tab-item"></div></div></div>'
                                , zIndex: layer.zIndex
                                , success: function (layero) {
                                    layer.setTop(layero);

                                    var wyyfyslist = [];
                                    var wywxdxlist = [];

                                    form.val("disasterinfoeditform", {
                                        "zhtmc": obj.data.zhtmc
                                        , "zhtbh": obj.data.zhtbh
                                        , "zhtlx": obj.data.zhtlx
                                        , "zxjd": obj.data.zxjd
                                        , "zxwd": obj.data.zxwd
                                        , "bz": obj.data.bz
                                    });

                                    if (obj.data.zhtlx === "危岩崩塌") {
                                        document.getElementById("disasterpropertyedit").innerHTML = '<!--编辑崩塌（危岩体）属性--><form class="layui-form" style="margin-top:0px" lay-filter="rockfallpropertyeditform"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">运动形式</label><div class="layui-input-block" style="margin-left:150px;"><select id="ydxsid" name="ydxs"><option value="">请选择</option></select></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">崩塌类型</label><div class="layui-input-block" style="margin-left:150px;"><select id="btlxid" name="btlx"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><div class="layui-row"><div class="layui-col-md9"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">控制结构面类型</label><div class="layui-input-block" style="margin-left:150px;"><select id="kzjgmlxid" name="kzjgmlx"><option value="">请选择</option></select></div></div></div><div class="layui-col-md3"><div class="grid-demo"><input type="text" name="qtkzjgmlx" class="layui-input" placeholder="请输入" /></div></div></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">宏观稳定性评价</label><div class="layui-input-block" style="margin-left:150px;"><select id="hgwdxpjid" name="hgwdxpj"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">活动状态</label><div class="layui-input-block" style="margin-left:150px;"><select id="hdztid" name="hdzt"><option value="">请选择</option></select></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">崩塌源扩展方式</label><div class="layui-input-block" style="margin-left:150px;"><select id="btykzfsid" name="btykzfs"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">崩塌时间</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" id="btsjid" name="btsj" placeholder="yyyy-MM-dd HH:mm:ss" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">主崩方向(°)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zbfx" class="layui-input" placeholder="请输入" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">崩塌源高程(m)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btygc" class="layui-input" placeholder="请输入" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">最大落差(m)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zdlc" class="layui-input" placeholder="请输入" /></div></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">最大水平位移(m)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zdspwy" class="layui-input" placeholder="请输入" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">崩塌源宽度(m)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btykd" class="layui-input" placeholder="请输入" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">崩塌源厚度(m)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btyhd" class="layui-input" placeholder="请输入" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">崩塌源面积(㎡)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btymj" class="layui-input" placeholder="请输入" /></div></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">崩塌源体积(m³)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btytj" class="layui-input" placeholder="请输入" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-form-item" pane=""><label class="layui-form-label" style="width:120px;">诱发因素</label><div id="yfysid" class="layui-input-block" style="margin-left:150px;border-width:1px;border-style:solid;border-radius:2px;border-color:#e6e6e6;padding-left:10px;padding-bottom:5px;"></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">其他诱发因素</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="qtyfys" class="layui-input" placeholder="请输入" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">堆积体平均厚度(m)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="djtpjhd" class="layui-input" placeholder="请输入" /></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">堆积体面积(㎡)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="djtmj" class="layui-input" placeholder="请输入" /></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">堆积体体积(m³)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="djttj" class="layui-input" placeholder="请输入" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">规模等级</label><div class="layui-input-block" style="margin-left:150px;"><select id="gmdjid" name="gmdj"><option value="">请选择</option></select></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">实体勾绘</label><div class="layui-input-block" style="margin-left:150px;"><select id="stghid" name="stgh"><option value="">请选择</option></select></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">确定性程度</label><div class="layui-input-block" style="margin-left:150px;"><select id="qdxcdid" name="qdxcd"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">灾情等级</label><div class="layui-input-block" style="margin-left:150px;"><select id="zqdjid" name="zqdj"><option value="">请选择</option></select></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">险情等级</label><div class="layui-input-block" style="margin-left:150px;"><select id="xqdjid" name="xqdj"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">死亡人数(人)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="swrs" class="layui-input" placeholder="请输入" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">威胁人数(人)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="wxrs" class="layui-input" placeholder="请输入" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">直接损失(万元)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zjss" class="layui-input" placeholder="请输入" /></div></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">威胁财产(万元)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="wxcc" class="layui-input" placeholder="请输入" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-form-item" pane=""><label class="layui-form-label" style="width:120px;">威胁对象</label><div id="wxdxid" class="layui-input-block" style="margin-left:150px;border-width:1px;border-style:solid;border-radius:2px;border-color:#e6e6e6;padding-left:10px;padding-bottom:5px;"></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">其他威胁对象</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="qtwxdx" class="layui-input" placeholder="请输入" /></div></div><div class="layui-form-item" style="margin-top:5px"><div style="position:absolute;right:5px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="editrockfallpropertysubmit" style="width:120px">保存</button></div></div></form>';
                                        document.getElementById("disasterenvironmentedit").innerHTML = '<!--编辑崩塌（危岩体）环境--><form class="layui-form" style="margin-top:0px" lay-filter="rockfallenvironmenteditform"><div class="layui-form-item"><label class="layui-form-label" style="width:130px;">地形地貌</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="dxdm" class="layui-textarea" placeholder="点位地形特征、与地层产状关系、临空面特征及边坡形态。" style="min-height:100px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;">地层岩性、岩性组合</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="dcyxyxzh" class="layui-textarea" placeholder="地层层序、地质时代、成因类型、岩石地层单元，岩性特征和接触关系，岩体强度特征；软弱层对地质灾害的控制描述。" style="min-height:100px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;">斜坡结构与地质构造</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="xpjgdzgz" class="layui-textarea" placeholder="斜坡结构类型，斜坡坡度与地层产状交切关系，节理裂隙发育特征，层内错动带，构造错动带。" style="min-height:100px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;">水文地质条件</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="swdztj" class="layui-textarea" placeholder="地下水补、径、排条件，地下水类型等。" style="min-height:100px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;">植被及土地利用</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="zbtdly" class="layui-textarea" placeholder="请输入" style="min-height:100px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;">人类工程活动</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="rlgchd" class="layui-textarea" placeholder="请输入" style="min-height:110px!important"></textarea></div></div><div class="layui-form-item" style="margin-top:5px"><div style="position:absolute;right:5px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="editrockfallenvironmentsubmit" style="width:120px">保存</button></div></div></form>';
                                        document.getElementById("disasterfeatureedit").innerHTML = '<!--编辑崩塌（危岩体）基本特征--><form class="layui-form" style="margin-top:0px" lay-filter="rockfallfeatureeditform"><div class="layui-form-item"><label class="layui-form-label" style="width:130px;">崩塌源区</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="btyq" class="layui-textarea" placeholder="边界条件，危岩体岩性及岩体结构，控制面结构、产状，卸荷裂隙发育特征及其组合形式、交切特点、贯通情况变形迹象及变形历史等。" style="min-height:210px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;">崩塌堆积体</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="btdjt" class="layui-textarea" placeholder="几何形态，厚度、规模，新鲜程度；岩性及分选状态及空间分布特征、最远堆积距离等。" style="min-height:210px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;">崩塌路径区</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="btljq" class="layui-textarea" placeholder="路径区斜坡几何形态、地层岩性、植被发育情况；是否有建筑设施等。" style="min-height:205px!important"></textarea></div></div><div class="layui-form-item" style="margin-top:5px"><div style="position:absolute;right:5px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="editrockfallfeaturesubmit" style="width:120px">保存</button></div></div></form>';
                                        document.getElementById("disasterdangeredit").innerHTML = '<!--编辑崩塌（危岩体）危险性分析--><form class="layui-form" style="margin-top:0px" lay-filter="rockfalldangereditform"><div class="layui-form-item"><label class="layui-form-label" style="width:130px;">危险性分析</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="wxxfx" class="layui-textarea" placeholder="请输入" style="min-height:635px!important"></textarea></div></div><div class="layui-form-item" style="margin-top:5px"><div style="position:absolute;right:5px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="editrockfalldangersubmit" style="width:120px">保存</button></div></div></form>';
                                        document.getElementById("disasterharmedit").innerHTML = '<!--编辑崩塌（危岩体）危害分析--><form class="layui-form" style="margin-top:0px" lay-filter="rockfallharmeditform"><div class="layui-form-item"><label class="layui-form-label" style="width:130px;">危害分析</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="whfx" class="layui-textarea" placeholder="请输入" style="min-height:635px!important"></textarea></div></div><div class="layui-form-item" style="margin-top:5px"><div style="position:absolute;right:5px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="editrockfallharmsubmit" style="width:120px">保存</button></div></div></form>';
                                        document.getElementById("disasterforecastedit").innerHTML = '<!--编辑崩塌（危岩体）预警模型参数--><form class="layui-form" style="margin-top:0px" lay-filter="rockfallforecasteditform"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩破坏模式</label><div class="layui-input-block" style="margin-left:170px;"><select id="CType1id" name="CType1"><option value="">请选择</option></select></div></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩破坏模式亚类</label><div class="layui-input-block" style="margin-left:170px;"><select id="CType2id" name="CType2"><option value="">请选择</option></select></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩顶部高程(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Alt_up" class="layui-input" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩底部高程(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Alt_down" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩体积(m³)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Rock_vol" class="layui-input" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩高度(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Frame_H" class="layui-input" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩宽度(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Frame_W" class="layui-input" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩厚度(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Frame_Th" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">岩性</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Rock_char" class="layui-input" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">崩塌方向(°)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Coll_Dir" class="layui-input" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">岩层产状(°)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="OcofRS" class="layui-input" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">岩体容重(KN/m³)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="UW" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">条块面积(m²)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="SA" class="layui-input" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩体自重(KN/m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="OW" class="layui-input" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">潜在滑面倾角(°)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="IASS" class="layui-input" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">潜在滑面长度(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="LSS" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">潜在滑面内摩擦角(°)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="FASS" class="layui-input" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">潜在滑面粘聚力(kPa)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="CSS" class="layui-input" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">岩体泊松比</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="PRR" class="layui-input" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">岩体弹性模量</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="EMR" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">后缘裂隙倾角(°)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="IAPC" class="layui-input" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">偏心荷载弯矩</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="SCP_Mk" class="layui-input" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">后缘裂隙深度(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="VDPC" class="layui-input" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩抗弯矩系数</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="MRC" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><!--<label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩体粘聚力标准值(kPa)</label>--><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">底部软弱层内聚力(kPa)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="SCP_C" class="layui-input" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><!--<label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩体内摩擦角标准值(°)</label>--><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">底部软弱层内摩擦角(°)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="SCP_FA" class="layui-input" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩体的抗拉强度(kPa)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="FLk" class="layui-input" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩单体地面宽度</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="SCP_DS" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">岩体重心到后缘裂缝底部的水平距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="HDPC" class="layui-input" /></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩重心到倾覆点的水平距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="HDCD" class="layui-input" /></div></div></div></div></div></div><div class="layui-form-item"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩重心到倾覆点的垂直距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="VDCD" class="layui-input" /></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">后缘裂隙上端到未贯通段下端的垂直距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="SCP_H" class="layui-input" /></div></div></div></div></div></div><div class="layui-form-item"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><!--<label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">后缘裂隙未贯通段下端到倾覆点之间的水平距离(m)</label>--><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:300px;">下部软弱层岩体潜在剪切段破裂面正应力(kPa)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="SCP_HD" class="layui-input" /></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩体重心到潜在破坏面的水平距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="SCP_AO" class="layui-input" /></div></div></div></div></div></div><div class="layui-form-item"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩体重心到过潜在破坏面形心的铅垂距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="SCP_BO" class="layui-input" /></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩单体重心距离底部旋转点的水平距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="HDCR" class="layui-input" /></div></div></div></div></div></div><div class="layui-form-item"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩单体重心距离底部旋转点的垂直距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="VDCR" class="layui-input" /></div></div><div class="layui-col-md6"><div class="grid-demo"><!--<label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩单体下部岩体的抗压强度</label>--><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">岩石抗剪强度(kPa)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="SCP_Ba" class="layui-input" /></div></div></div></div></div></div><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:200px;">岩体单轴抗压强度(kPa)</label><div class="layui-input-block" style="margin-left:210px;"><input type="text" name="Rt" class="layui-input" /></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:200px;">危岩体与基座接触面倾角(°)</label><div class="layui-input-block" style="margin-left:210px;"><input type="text" name="IAI" class="layui-input" /></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:300px;">危岩单体重心到后缘裂缝底部的水平距离(m)</label><div class="layui-input-block" style="margin-left:310px;"><input type="text" name="SCP_e" class="layui-input" /></div></div></div></div><div class="layui-form-item" style="margin-top:5px"><div style="position:absolute;right:15px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="editrockfallforecastsubmit" style="width:100px">保存</button></div></div></form>';
                                    }
                                    else if (obj.data.zhtlx === "滑坡") {
                                        document.getElementById("disasterpropertyedit").innerHTML = '';
                                        document.getElementById("disasterenvironmentedit").innerHTML = '';
                                        document.getElementById("disasterfeatureedit").innerHTML = '';
                                        document.getElementById("disasterdangeredit").innerHTML = '';
                                        document.getElementById("disasterharmedit").innerHTML = '';
                                        document.getElementById("disasterforecastedit").innerHTML = '';
                                    }
                                    else if (obj.data.zhtlx === "泥石流") {
                                        document.getElementById("disasterpropertyedit").innerHTML = '';
                                        document.getElementById("disasterenvironmentedit").innerHTML = '';
                                        document.getElementById("disasterfeatureedit").innerHTML = '';
                                        document.getElementById("disasterdangeredit").innerHTML = '';
                                        document.getElementById("disasterharmedit").innerHTML = '';
                                        document.getElementById("disasterforecastedit").innerHTML = '';
                                    }
                                    else if (obj.data.zhtlx === "地面塌陷") {
                                        document.getElementById("disasterpropertyedit").innerHTML = '';
                                        document.getElementById("disasterenvironmentedit").innerHTML = '';
                                        document.getElementById("disasterfeatureedit").innerHTML = '';
                                        document.getElementById("disasterdangeredit").innerHTML = '';
                                        document.getElementById("disasterharmedit").innerHTML = '';
                                        document.getElementById("disasterforecastedit").innerHTML = '';
                                    }
                                    else if (obj.data.zhtlx === "地裂缝") {
                                        document.getElementById("disasterpropertyedit").innerHTML = '';
                                        document.getElementById("disasterenvironmentedit").innerHTML = '';
                                        document.getElementById("disasterfeatureedit").innerHTML = '';
                                        document.getElementById("disasterdangeredit").innerHTML = '';
                                        document.getElementById("disasterharmedit").innerHTML = '';
                                        document.getElementById("disasterforecastedit").innerHTML = '';
                                    }
                                    else if (obj.data.zhtlx === "地面沉降") {
                                        document.getElementById("disasterpropertyedit").innerHTML = '';
                                        document.getElementById("disasterenvironmentedit").innerHTML = '';
                                        document.getElementById("disasterfeatureedit").innerHTML = '';
                                        document.getElementById("disasterdangeredit").innerHTML = '';
                                        document.getElementById("disasterharmedit").innerHTML = '';
                                        document.getElementById("disasterforecastedit").innerHTML = '';
                                    }
                                    else {
                                        document.getElementById("disasterpropertyedit").innerHTML = '';
                                        document.getElementById("disasterenvironmentedit").innerHTML = '';
                                        document.getElementById("disasterfeatureedit").innerHTML = '';
                                        document.getElementById("disasterdangeredit").innerHTML = '';
                                        document.getElementById("disasterharmedit").innerHTML = '';
                                        document.getElementById("disasterforecastedit").innerHTML = '';
                                    }

                                    //请求灾害体属性及预警模型参数
                                    $.ajax({
                                        url: servicesurl + "/api/Disaster/GetDisasterProperty", type: "get", data: { "id": obj.data.id, "cookie": document.cookie },
                                        success: function (result) {
                                            if (result === "") {
                                                if (obj.data.zhtlx === "危岩崩塌") {
                                                    form.val("rockfallpropertyeditform", {
                                                        "btsj": ""
                                                        , "zbfx": ""
                                                        , "btygc": ""
                                                        , "zdlc": ""
                                                        , "zdspwy": ""
                                                        , "btykd": ""
                                                        , "btyhd": ""
                                                        , "btymj": ""
                                                        , "btytj": ""
                                                        , "qtyfys": ""
                                                        , "djtpjhd": ""
                                                        , "djtmj": ""
                                                        , "djttj": ""
                                                        , "swrs": ""
                                                        , "wxrs": ""
                                                        , "zjss": ""
                                                        , "wxcc": ""
                                                        , "qtwxdx": ""
                                                    });

                                                    wyyfyslist = [];
                                                    wywxdxlist = [];

                                                    if (wyydxss.length > 0) {
                                                        for (var i in wyydxss) {
                                                            document.getElementById("ydxsid").innerHTML += '<option value="' + wyydxss[i].value + '">' + wyydxss[i].name + '</option>';
                                                        }
                                                    }
                                                    if (wybtlxs.length > 0) {
                                                        for (var i in wybtlxs) {
                                                            document.getElementById("btlxid").innerHTML += '<option value="' + wybtlxs[i].value + '">' + wybtlxs[i].name + '</option>';
                                                        }
                                                    }
                                                    if (wykzjgmlxs.length > 0) {
                                                        for (var i in wykzjgmlxs) {
                                                            document.getElementById("kzjgmlxid").innerHTML += '<option value="' + wykzjgmlxs[i].value + '">' + wykzjgmlxs[i].name + '</option>';
                                                        }
                                                    }
                                                    if (wyhgwdxpjs.length > 0) {
                                                        for (var i in wyhgwdxpjs) {
                                                            document.getElementById("hgwdxpjid").innerHTML += '<option value="' + wyhgwdxpjs[i].value + '">' + wyhgwdxpjs[i].name + '</option>';
                                                        }
                                                    }
                                                    if (wyhtzts.length > 0) {
                                                        for (var i in wyhtzts) {
                                                            document.getElementById("hdztid").innerHTML += '<option value="' + wyhtzts[i].value + '">' + wyhtzts[i].name + '</option>';
                                                        }
                                                    }
                                                    if (wybtykzfss.length > 0) {
                                                        for (var i in wybtykzfss) {
                                                            document.getElementById("btykzfsid").innerHTML += '<option value="' + wybtykzfss[i].value + '">' + wybtykzfss[i].name + '</option>';
                                                        }
                                                    }
                                                    if (wyyfyss.length > 0) {
                                                        for (var i in wyyfyss) {
                                                            document.getElementById("yfysid").innerHTML += '<input type="checkbox" value="' + wyyfyss[i].value + '" lay-skin="primary" title="' + wyyfyss[i].name + '" lay-filter="wy-yfys">';
                                                        }
                                                    }
                                                    if (wygmdjs.length > 0) {
                                                        for (var i in wygmdjs) {
                                                            document.getElementById("gmdjid").innerHTML += '<option value="' + wygmdjs[i].value + '">' + wygmdjs[i].name + '</option>';
                                                        }
                                                    }
                                                    if (wyqdxcds.length > 0) {
                                                        for (var i in wyqdxcds) {
                                                            document.getElementById("qdxcdid").innerHTML += '<option value="' + wyqdxcds[i].value + '">' + wyqdxcds[i].name + '</option>';
                                                        }
                                                    }
                                                    if (wyzqdjs.length > 0) {
                                                        for (var i in wyzqdjs) {
                                                            document.getElementById("zqdjid").innerHTML += '<option value="' + wyzqdjs[i].value + '">' + wyzqdjs[i].name + '</option>';
                                                        }
                                                    }
                                                    if (wyxqdjs.length > 0) {
                                                        for (var i in wyxqdjs) {
                                                            document.getElementById("xqdjid").innerHTML += '<option value="' + wyxqdjs[i].value + '">' + wyxqdjs[i].name + '</option>';
                                                        }
                                                    }
                                                    document.getElementById("stghid").innerHTML += '<<option value="true">是</option><option value="false">否</option>';
                                                    if (wywxdxs.length > 0) {
                                                        for (var i in wywxdxs) {
                                                            document.getElementById("wxdxid").innerHTML += '<input type="checkbox" value="' + wywxdxs[i].value + '" lay-skin="primary" title="' + wywxdxs[i].name + '" lay-filter="wy-wxdx">';
                                                        }
                                                    }

                                                    date.render({
                                                        elem: '#btsjid'
                                                        , type: 'datetime'
                                                    });

                                                    form.val("rockfallenvironmenteditform", {
                                                        "dxdm": ""
                                                        , "dcyxyxzh": ""
                                                        , "xpjgdzgz": ""
                                                        , "swdztj": ""
                                                        , "zbtdly": ""
                                                        , "rlgchd": ""
                                                    });
                                                    form.val("rockfallfeatureeditform", {
                                                        "btyq": ""
                                                        , "btdjt": ""
                                                        , "btljq": ""
                                                    });
                                                    form.val("rockfalldangereditform", {
                                                        "wxxfx": ""
                                                    });
                                                    form.val("rockfallharmeditform", {
                                                        "whfx": ""
                                                    });
                                                    form.val("rockfallforecasteditform", {
                                                        "Alt_up": ""
                                                        , "Alt_down": ""
                                                        , "Rock_vol": ""
                                                        , "Frame_H": ""
                                                        , "Frame_W": ""
                                                        , "Frame_Th": ""
                                                        , "Rock_char": ""
                                                        , "Coll_Dir": ""
                                                        , "OcofRS": ""
                                                        , "UW": ""
                                                        , "SA": ""
                                                        , "OW": ""
                                                        , "IASS": ""
                                                        , "LSS": ""
                                                        , "FASS": ""
                                                        , "CSS": ""
                                                        , "PRR": ""
                                                        , "EMR": ""
                                                        , "IAPC": ""
                                                        , "SCP_Mk": ""
                                                        , "VDPC": ""
                                                        , "MRC": ""
                                                        , "SCP_C": ""
                                                        , "SCP_FA": ""
                                                        , "FLk": ""
                                                        , "SCP_DS": ""
                                                        , "HDPC": ""
                                                        , "HDCD": ""
                                                        , "VDCD": ""
                                                        , "SCP_H": ""
                                                        , "SCP_HD": ""
                                                        , "SCP_AO": ""
                                                        , "SCP_BO": ""
                                                        , "HDCR": ""
                                                        , "VDCR": ""
                                                        , "SCP_Ba": ""
                                                        , "IAI": ""
                                                        , "SCP_e": ""
                                                        , "Rt": ""
                                                    });

                                                    if (wyphmss.length > 0) {
                                                        for (var i in wyphmss) {
                                                            document.getElementById("CType1id").innerHTML += '<option value="' + wyphmss[i].value + '">' + wyphmss[i].name + '</option>';
                                                        }
                                                    }
                                                    if (wyphmsyls.length > 0) {
                                                        for (var i in wyphmsyls) {
                                                            document.getElementById("CType2id").innerHTML += '<option value="' + wyphmsyls[i].value + '">' + wyphmsyls[i].name + '</option>';
                                                        }
                                                    }

                                                }
                                                else if (obj.data.zhtlx === "滑坡") {
                                                }
                                                else if (obj.data.zhtlx === "泥石流") {
                                                }
                                                else if (obj.data.zhtlx === "地面塌陷") {
                                                }
                                                else if (obj.data.zhtlx === "地裂缝") {
                                                }
                                                else if (obj.data.zhtlx === "地面沉降") {
                                                }
                                                else {
                                                }
                                            }
                                            else {
                                                var disasterproperty = JSON.parse(result);

                                                if (obj.data.zhtlx === "危岩崩塌") {
                                                    wyyfyslist = [];
                                                    wywxdxlist = [];

                                                    if (disasterproperty.RockfallProperty != null) {
                                                        form.val("rockfallpropertyeditform", {
                                                            "btsj": disasterproperty.RockfallProperty.BTSJ
                                                            , "zbfx": disasterproperty.RockfallProperty.ZBFX
                                                            , "btygc": disasterproperty.RockfallProperty.BTYGC
                                                            , "zdlc": disasterproperty.RockfallProperty.ZDLC
                                                            , "zdspwy": disasterproperty.RockfallProperty.ZDSPWY
                                                            , "btykd": disasterproperty.RockfallProperty.BTYKD
                                                            , "btyhd": disasterproperty.RockfallProperty.BTYHD
                                                            , "btymj": disasterproperty.RockfallProperty.BTYMJ
                                                            , "btytj": disasterproperty.RockfallProperty.BTYTJ
                                                            , "qtyfys": disasterproperty.RockfallProperty.QTYFYS
                                                            , "djtpjhd": disasterproperty.RockfallProperty.DJTPJHD
                                                            , "djtmj": disasterproperty.RockfallProperty.DJTMJ
                                                            , "djttj": disasterproperty.RockfallProperty.DJTTJ
                                                            , "swrs": disasterproperty.RockfallProperty.SWRS
                                                            , "wxrs": disasterproperty.RockfallProperty.WXRS
                                                            , "zjss": disasterproperty.RockfallProperty.ZJSS
                                                            , "wxcc": disasterproperty.RockfallProperty.WXCC
                                                            , "qtwxdx": disasterproperty.RockfallProperty.QTWXDX
                                                        });

                                                        if (wyydxss.length > 0) {
                                                            for (var i in wyydxss) {
                                                                if (wyydxss[i].name === disasterproperty.RockfallProperty.YDXS) {
                                                                    document.getElementById("ydxsid").innerHTML += '<option value="' + wyydxss[i].value + '" selected>' + wyydxss[i].name + '</option>';
                                                                }
                                                                else {
                                                                    document.getElementById("ydxsid").innerHTML += '<option value="' + wyydxss[i].value + '">' + wyydxss[i].name + '</option>';
                                                                }
                                                            }
                                                        }
                                                        if (wybtlxs.length > 0) {
                                                            for (var i in wybtlxs) {
                                                                if (wybtlxs[i].name === disasterproperty.RockfallProperty.BTLX) {
                                                                    document.getElementById("btlxid").innerHTML += '<option value="' + wybtlxs[i].value + '" selected>' + wybtlxs[i].name + '</option>';
                                                                }
                                                                else {
                                                                    document.getElementById("btlxid").innerHTML += '<option value="' + wybtlxs[i].value + '">' + wybtlxs[i].name + '</option>';
                                                                }
                                                            }
                                                        }
                                                        if (wykzjgmlxs.length > 0) {
                                                            for (var i in wykzjgmlxs) {
                                                                if (wykzjgmlxs[i].name === disasterproperty.RockfallProperty.KZJGMLX) {
                                                                    document.getElementById("kzjgmlxid").innerHTML += '<option value="' + wykzjgmlxs[i].value + '" selected>' + wykzjgmlxs[i].name + '</option>';
                                                                }
                                                                else {
                                                                    document.getElementById("kzjgmlxid").innerHTML += '<option value="' + wykzjgmlxs[i].value + '">' + wykzjgmlxs[i].name + '</option>';
                                                                }
                                                            }
                                                        }
                                                        if (wyhgwdxpjs.length > 0) {
                                                            for (var i in wyhgwdxpjs) {
                                                                if (wyhgwdxpjs[i].name === disasterproperty.RockfallProperty.HGWDXPJ) {
                                                                    document.getElementById("hgwdxpjid").innerHTML += '<option value="' + wyhgwdxpjs[i].value + '" selected>' + wyhgwdxpjs[i].name + '</option>';
                                                                }
                                                                else {
                                                                    document.getElementById("hgwdxpjid").innerHTML += '<option value="' + wyhgwdxpjs[i].value + '">' + wyhgwdxpjs[i].name + '</option>';
                                                                }
                                                            }
                                                        }
                                                        if (wyhtzts.length > 0) {
                                                            for (var i in wyhtzts) {
                                                                if (wyhtzts[i].name === disasterproperty.RockfallProperty.HDZT) {
                                                                    document.getElementById("hdztid").innerHTML += '<option value="' + wyhtzts[i].value + '" selected>' + wyhtzts[i].name + '</option>';
                                                                }
                                                                else {
                                                                    document.getElementById("hdztid").innerHTML += '<option value="' + wyhtzts[i].value + '">' + wyhtzts[i].name + '</option>';
                                                                }
                                                            }
                                                        }
                                                        if (wybtykzfss.length > 0) {
                                                            for (var i in wybtykzfss) {
                                                                if (wybtykzfss[i].name === disasterproperty.RockfallProperty.BTYKZFS) {
                                                                    document.getElementById("btykzfsid").innerHTML += '<option value="' + wybtykzfss[i].value + '" selected>' + wybtykzfss[i].name + '</option>';
                                                                }
                                                                else {
                                                                    document.getElementById("btykzfsid").innerHTML += '<option value="' + wybtykzfss[i].value + '">' + wybtykzfss[i].name + '</option>';
                                                                }
                                                            }
                                                        }
                                                        if (disasterproperty.RockfallProperty.YFYS === "") {
                                                            if (wyyfyss.length > 0) {
                                                                for (var i in wyyfyss) {
                                                                    document.getElementById("yfysid").innerHTML += '<input type="checkbox" value="' + wyyfyss[i].value + '" lay-skin="primary" title="' + wyyfyss[i].name + '" lay-filter="wy-yfys">';
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            var yfysList = disasterproperty.RockfallProperty.YFYS.split(",");
                                                            if (wyyfyss.length > 0) {
                                                                for (var i in wyyfyss) {
                                                                    if (yfysList.indexOf(wyyfyss[i].name) != -1) {
                                                                        document.getElementById("yfysid").innerHTML += '<input type="checkbox" value="' + wyyfyss[i].value + '" lay-skin="primary" title="' + wyyfyss[i].name + '" lay-filter="wy-yfys" checked="">';
                                                                        wyyfyslist.push(wyyfyss[i].value);
                                                                    }
                                                                    else {
                                                                        document.getElementById("yfysid").innerHTML += '<input type="checkbox" value="' + wyyfyss[i].value + '" lay-skin="primary" title="' + wyyfyss[i].name + '" lay-filter="wy-yfys">';
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        if (wygmdjs.length > 0) {
                                                            for (var i in wygmdjs) {
                                                                if (wygmdjs[i].name === disasterproperty.RockfallProperty.GMDJ) {
                                                                    document.getElementById("gmdjid").innerHTML += '<option value="' + wygmdjs[i].value + '" selected>' + wygmdjs[i].name + '</option>';
                                                                }
                                                                else {
                                                                    document.getElementById("gmdjid").innerHTML += '<option value="' + wygmdjs[i].value + '">' + wygmdjs[i].name + '</option>';
                                                                }
                                                            }
                                                        }
                                                        if (wyqdxcds.length > 0) {
                                                            for (var i in wyqdxcds) {
                                                                if (wyqdxcds[i].name === disasterproperty.RockfallProperty.QDXCD) {
                                                                    document.getElementById("qdxcdid").innerHTML += '<option value="' + wyqdxcds[i].value + '" selected>' + wyqdxcds[i].name + '</option>';
                                                                }
                                                                else {
                                                                    document.getElementById("qdxcdid").innerHTML += '<option value="' + wyqdxcds[i].value + '">' + wyqdxcds[i].name + '</option>';
                                                                }
                                                            }
                                                        }
                                                        if (wyzqdjs.length > 0) {
                                                            for (var i in wyzqdjs) {
                                                                if (wyzqdjs[i].name === disasterproperty.RockfallProperty.ZQDJ) {
                                                                    document.getElementById("zqdjid").innerHTML += '<option value="' + wyzqdjs[i].value + '" selected>' + wyzqdjs[i].name + '</option>';
                                                                }
                                                                else {
                                                                    document.getElementById("zqdjid").innerHTML += '<option value="' + wyzqdjs[i].value + '">' + wyzqdjs[i].name + '</option>';
                                                                }
                                                            }
                                                        }
                                                        if (wyxqdjs.length > 0) {
                                                            for (var i in wyxqdjs) {
                                                                if (wyxqdjs[i].name === disasterproperty.RockfallProperty.XQDJ) {
                                                                    document.getElementById("xqdjid").innerHTML += '<option value="' + wyxqdjs[i].value + '" selected>' + wyxqdjs[i].name + '</option>';
                                                                }
                                                                else {
                                                                    document.getElementById("xqdjid").innerHTML += '<option value="' + wyxqdjs[i].value + '">' + wyxqdjs[i].name + '</option>';
                                                                }
                                                            }
                                                        }
                                                        if (disasterproperty.RockfallProperty.STGH === "是") {
                                                            document.getElementById("stghid").innerHTML += '<<option value="true" selected>是</option><option value="false">否</option>';
                                                        }
                                                        else if (disasterproperty.RockfallProperty.STGH === "否") {
                                                            document.getElementById("stghid").innerHTML += '<<option value="true">是</option><option value="false" selected>否</option>';
                                                        }
                                                        else {
                                                            document.getElementById("stghid").innerHTML += '<<option value="true">是</option><option value="false">否</option>';
                                                        }
                                                        if (disasterproperty.RockfallProperty.WXDX === "") {
                                                            if (wywxdxs.length > 0) {
                                                                for (var i in wywxdxs) {
                                                                    document.getElementById("wxdxid").innerHTML += '<input type="checkbox" value="' + wywxdxs[i].value + '" lay-skin="primary" title="' + wywxdxs[i].name + '" lay-filter="wy-wxdx">';
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            var wxdxlist = disasterproperty.RockfallProperty.WXDX.split(",");
                                                            if (wywxdxs.length > 0) {
                                                                for (var i in wywxdxs) {
                                                                    if (wxdxlist.indexOf(wywxdxs[i].name) != -1) {
                                                                        document.getElementById("wxdxid").innerHTML += '<input type="checkbox" value="' + wywxdxs[i].value + '" lay-skin="primary" title="' + wywxdxs[i].name + '" lay-filter="wy-wxdx" checked="">';
                                                                        wywxdxlist.push(wywxdxs[i].value);
                                                                    }
                                                                    else {
                                                                        document.getElementById("wxdxid").innerHTML += '<input type="checkbox" value="' + wywxdxs[i].value + '" lay-skin="primary" title="' + wywxdxs[i].name + '" lay-filter="wy-wxdx">';
                                                                    }
                                                                }
                                                            }
                                                        }

                                                        date.render({
                                                            elem: '#btsjid'
                                                            , type: 'datetime'
                                                        });


                                                        form.val("rockfallenvironmenteditform", {
                                                            "dxdm": disasterproperty.RockfallProperty.DXDM
                                                            , "dcyxyxzh": disasterproperty.RockfallProperty.DCYXYXZH
                                                            , "xpjgdzgz": disasterproperty.RockfallProperty.XPJGDZGZ
                                                            , "swdztj": disasterproperty.RockfallProperty.SWDZTJ
                                                            , "zbtdly": disasterproperty.RockfallProperty.ZBTDLY
                                                            , "rlgchd": disasterproperty.RockfallProperty.RLGCHD
                                                        });
                                                        form.val("rockfallfeatureeditform", {
                                                            "btyq": disasterproperty.RockfallProperty.BTYQ
                                                            , "btdjt": disasterproperty.RockfallProperty.BTDJT
                                                            , "btljq": disasterproperty.RockfallProperty.BTLJQ
                                                        });
                                                        form.val("rockfalldangereditform", {
                                                            "wxxfx": disasterproperty.RockfallProperty.WXXFX
                                                        });
                                                        form.val("rockfallharmeditform", {
                                                            "whfx": disasterproperty.RockfallProperty.WHFX
                                                        });
                                                    }
                                                    else {
                                                        form.val("rockfallpropertyeditform", {
                                                            "btsj": ""
                                                            , "zbfx": ""
                                                            , "btygc": ""
                                                            , "zdlc": ""
                                                            , "zdspwy": ""
                                                            , "btykd": ""
                                                            , "btyhd": ""
                                                            , "btymj": ""
                                                            , "btytj": ""
                                                            , "qtyfys": ""
                                                            , "djtpjhd": ""
                                                            , "djtmj": ""
                                                            , "djttj": ""
                                                            , "swrs": ""
                                                            , "wxrs": ""
                                                            , "zjss": ""
                                                            , "wxcc": ""
                                                            , "qtwxdx": ""
                                                        });


                                                        if (wyydxss.length > 0) {
                                                            for (var i in wyydxss) {
                                                                document.getElementById("ydxsid").innerHTML += '<option value="' + wyydxss[i].value + '">' + wyydxss[i].name + '</option>';
                                                            }
                                                        }
                                                        if (wybtlxs.length > 0) {
                                                            for (var i in wybtlxs) {
                                                                document.getElementById("btlxid").innerHTML += '<option value="' + wybtlxs[i].value + '">' + wybtlxs[i].name + '</option>';
                                                            }
                                                        }
                                                        if (wykzjgmlxs.length > 0) {
                                                            for (var i in wykzjgmlxs) {
                                                                document.getElementById("kzjgmlxid").innerHTML += '<option value="' + wykzjgmlxs[i].value + '">' + wykzjgmlxs[i].name + '</option>';
                                                            }
                                                        }
                                                        if (wyhgwdxpjs.length > 0) {
                                                            for (var i in wyhgwdxpjs) {
                                                                document.getElementById("hgwdxpjid").innerHTML += '<option value="' + wyhgwdxpjs[i].value + '">' + wyhgwdxpjs[i].name + '</option>';
                                                            }
                                                        }
                                                        if (wyhtzts.length > 0) {
                                                            for (var i in wyhtzts) {
                                                                document.getElementById("hdztid").innerHTML += '<option value="' + wyhtzts[i].value + '">' + wyhtzts[i].name + '</option>';
                                                            }
                                                        }
                                                        if (wybtykzfss.length > 0) {
                                                            for (var i in wybtykzfss) {
                                                                document.getElementById("btykzfsid").innerHTML += '<option value="' + wybtykzfss[i].value + '">' + wybtykzfss[i].name + '</option>';
                                                            }
                                                        }
                                                        if (wyyfyss.length > 0) {
                                                            for (var i in wyyfyss) {
                                                                document.getElementById("yfysid").innerHTML += '<input type="checkbox" value="' + wyyfyss[i].value + '" lay-skin="primary" title="' + wyyfyss[i].name + '" lay-filter="wy-yfys">';
                                                            }
                                                        }
                                                        if (wygmdjs.length > 0) {
                                                            for (var i in wygmdjs) {
                                                                document.getElementById("gmdjid").innerHTML += '<option value="' + wygmdjs[i].value + '">' + wygmdjs[i].name + '</option>';
                                                            }
                                                        }
                                                        if (wyqdxcds.length > 0) {
                                                            for (var i in wyqdxcds) {
                                                                document.getElementById("qdxcdid").innerHTML += '<option value="' + wyqdxcds[i].value + '">' + wyqdxcds[i].name + '</option>';
                                                            }
                                                        }
                                                        if (wyzqdjs.length > 0) {
                                                            for (var i in wyzqdjs) {
                                                                document.getElementById("zqdjid").innerHTML += '<option value="' + wyzqdjs[i].value + '">' + wyzqdjs[i].name + '</option>';
                                                            }
                                                        }
                                                        if (wyxqdjs.length > 0) {
                                                            for (var i in wyxqdjs) {
                                                                document.getElementById("xqdjid").innerHTML += '<option value="' + wyxqdjs[i].value + '">' + wyxqdjs[i].name + '</option>';
                                                            }
                                                        }
                                                        document.getElementById("stghid").innerHTML += '<<option value="true">是</option><option value="false">否</option>';
                                                        if (wywxdxs.length > 0) {
                                                            for (var i in wywxdxs) {
                                                                document.getElementById("wxdxid").innerHTML += '<input type="checkbox" value="' + wywxdxs[i].value + '" lay-skin="primary" title="' + wywxdxs[i].name + '" lay-filter="wy-wxdx">';
                                                            }
                                                        }

                                                        date.render({
                                                            elem: '#btsjid'
                                                            , type: 'datetime'
                                                        });

                                                        form.val("rockfallenvironmenteditform", {
                                                            "dxdm": ""
                                                            , "dcyxyxzh": ""
                                                            , "xpjgdzgz": ""
                                                            , "swdztj": ""
                                                            , "zbtdly": ""
                                                            , "rlgchd": ""
                                                        });
                                                        form.val("rockfallfeatureeditform", {
                                                            "btyq": ""
                                                            , "btdjt": ""
                                                            , "btljq": ""
                                                        });
                                                        form.val("rockfalldangereditform", {
                                                            "wxxfx": ""
                                                        });
                                                        form.val("rockfallharmeditform", {
                                                            "whfx": ""
                                                        });
                                                    }


                                                    if (disasterproperty.RockfallWarning != null) {
                                                        form.val("rockfallforecasteditform", {
                                                            "Alt_up": disasterproperty.RockfallWarning.Alt_up
                                                            , "Alt_down": disasterproperty.RockfallWarning.Alt_down
                                                            , "Rock_vol": disasterproperty.RockfallWarning.Rock_vol
                                                            , "Frame_H": disasterproperty.RockfallWarning.Frame_H
                                                            , "Frame_W": disasterproperty.RockfallWarning.Frame_W
                                                            , "Frame_Th": disasterproperty.RockfallWarning.Frame_Th
                                                            , "Rock_char": disasterproperty.RockfallWarning.Rock_char
                                                            , "Coll_Dir": disasterproperty.RockfallWarning.Coll_Dir
                                                            , "OcofRS": disasterproperty.RockfallWarning.OcofRS
                                                            , "UW": disasterproperty.RockfallWarning.UW
                                                            , "SA": disasterproperty.RockfallWarning.SA
                                                            , "OW": disasterproperty.RockfallWarning.OW
                                                            , "IASS": disasterproperty.RockfallWarning.IASS
                                                            , "LSS": disasterproperty.RockfallWarning.LSS
                                                            , "FASS": disasterproperty.RockfallWarning.FASS
                                                            , "CSS": disasterproperty.RockfallWarning.CSS
                                                            , "PRR": disasterproperty.RockfallWarning.PRR
                                                            , "EMR": disasterproperty.RockfallWarning.EMR
                                                            , "IAPC": disasterproperty.RockfallWarning.IAPC
                                                            , "SCP_Mk": disasterproperty.RockfallWarning.SCP_Mk
                                                            , "VDPC": disasterproperty.RockfallWarning.VDPC
                                                            , "MRC": disasterproperty.RockfallWarning.MRC
                                                            , "SCP_C": disasterproperty.RockfallWarning.SCP_C
                                                            , "SCP_FA": disasterproperty.RockfallWarning.SCP_FA
                                                            , "FLk": disasterproperty.RockfallWarning.FLk
                                                            , "SCP_DS": disasterproperty.RockfallWarning.SCP_DS
                                                            , "HDPC": disasterproperty.RockfallWarning.HDPC
                                                            , "HDCD": disasterproperty.RockfallWarning.HDCD
                                                            , "VDCD": disasterproperty.RockfallWarning.VDCD
                                                            , "SCP_H": disasterproperty.RockfallWarning.SCP_H
                                                            , "SCP_HD": disasterproperty.RockfallWarning.SCP_HD
                                                            , "SCP_AO": disasterproperty.RockfallWarning.SCP_AO
                                                            , "SCP_BO": disasterproperty.RockfallWarning.SCP_BO
                                                            , "HDCR": disasterproperty.RockfallWarning.HDCR
                                                            , "VDCR": disasterproperty.RockfallWarning.VDCR
                                                            , "SCP_Ba": disasterproperty.RockfallWarning.SCP_Ba
                                                            , "IAI": disasterproperty.RockfallWarning.IAI
                                                            , "SCP_e": disasterproperty.RockfallWarning.SCP_e
                                                            , "Rt": disasterproperty.RockfallWarning.SCP_e
                                                        });

                                                        if (wyphmss.length > 0) {
                                                            for (var i in wyphmss) {
                                                                if (wyphmss[i].name == disasterproperty.RockfallWarning.CType1) {
                                                                    document.getElementById("CType1id").innerHTML += '<option value="' + wyphmss[i].value + '" selected>' + wyphmss[i].name + '</option>';
                                                                }
                                                                else {
                                                                    document.getElementById("CType1id").innerHTML += '<option value="' + wyphmss[i].value + '">' + wyphmss[i].name + '</option>';
                                                                }
                                                            }
                                                        }
                                                        if (wyphmsyls.length > 0) {
                                                            for (var i in wyphmsyls) {
                                                                if (wyphmsyls[i].name == disasterproperty.RockfallWarning.CType2) {
                                                                    document.getElementById("CType2id").innerHTML += '<option value="' + wyphmsyls[i].value + '" selected>' + wyphmsyls[i].name + '</option>';
                                                                }
                                                                else {
                                                                    document.getElementById("CType2id").innerHTML += '<option value="' + wyphmsyls[i].value + '">' + wyphmsyls[i].name + '</option>';
                                                                }
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        form.val("rockfallforecasteditform", {
                                                            "Alt_up": ""
                                                            , "Alt_down": ""
                                                            , "Rock_vol": ""
                                                            , "Frame_H": ""
                                                            , "Frame_W": ""
                                                            , "Frame_Th": ""
                                                            , "Rock_char": ""
                                                            , "Coll_Dir": ""
                                                            , "OcofRS": ""
                                                            , "UW": ""
                                                            , "SA": ""
                                                            , "OW": ""
                                                            , "IASS": ""
                                                            , "LSS": ""
                                                            , "FASS": ""
                                                            , "CSS": ""
                                                            , "PRR": ""
                                                            , "EMR": ""
                                                            , "IAPC": ""
                                                            , "SCP_Mk": ""
                                                            , "VDPC": ""
                                                            , "MRC": ""
                                                            , "SCP_C": ""
                                                            , "SCP_FA": ""
                                                            , "FLk": ""
                                                            , "SCP_DS": ""
                                                            , "HDPC": ""
                                                            , "HDCD": ""
                                                            , "VDCD": ""
                                                            , "SCP_H": ""
                                                            , "SCP_HD": ""
                                                            , "SCP_AO": ""
                                                            , "SCP_BO": ""
                                                            , "HDCR": ""
                                                            , "VDCR": ""
                                                            , "SCP_Ba": ""
                                                            , "IAI": ""
                                                            , "SCP_e": ""
                                                            , "Rt": ""
                                                        });

                                                        if (wyphmss.length > 0) {
                                                            for (var i in wyphmss) {
                                                                document.getElementById("CType1id").innerHTML += '<option value="' + wyphmss[i].value + '">' + wyphmss[i].name + '</option>';
                                                            }
                                                        }
                                                        if (wyphmsyls.length > 0) {
                                                            for (var i in wyphmsyls) {
                                                                document.getElementById("CType2id").innerHTML += '<option value="' + wyphmsyls[i].value + '">' + wyphmsyls[i].name + '</option>';
                                                            }
                                                        }
                                                    }
                                                }
                                                else if (obj.data.zhtlx === "滑坡") {
                                                }
                                                else if (obj.data.zhtlx === "泥石流") {
                                                }
                                                else if (obj.data.zhtlx === "地面塌陷") {
                                                }
                                                else if (obj.data.zhtlx === "地裂缝") {
                                                }
                                                else if (obj.data.zhtlx === "地面沉降") {
                                                }
                                                else {
                                                }
                                            }


                                            form.on('checkbox(wy-yfys)', function (data) {
                                                if (data.elem.checked == true) {
                                                    if (wyyfyslist.length === 0) {
                                                        wyyfyslist.push(data.value);
                                                    }
                                                    else {
                                                        if (wyyfyslist.indexOf(data.value) == -1) {
                                                            wyyfyslist.push(data.value);
                                                        }
                                                    }
                                                }
                                                else {
                                                    if (wyyfyslist.length != 0) {
                                                        if (wyyfyslist.indexOf(data.value) != -1) {
                                                            var newwyyfyslist = [];
                                                            for (var i in wyyfyslist) {
                                                                if (wyyfyslist[i] != data.value) {
                                                                    newwyyfyslist.push(wyyfyslist[i]);
                                                                }
                                                            }

                                                            wyyfyslist = [];
                                                            wyyfyslist = newwyyfyslist;
                                                        }
                                                    }
                                                }
                                            });
                                            form.on('checkbox(wy-wxdx)', function (data) {
                                                if (data.elem.checked == true) {
                                                    if (wywxdxlist.length === 0) {
                                                        wywxdxlist.push(data.value);
                                                    }
                                                    else {
                                                        if (wywxdxlist.indexOf(data.value) == -1) {
                                                            wywxdxlist.push(data.value);
                                                        }
                                                    }
                                                }
                                                else {
                                                    if (wywxdxlist.length != 0) {
                                                        if (wywxdxlist.indexOf(data.value) != -1) {
                                                            var newwywxdxlist = [];
                                                            for (var i in wywxdxlist) {
                                                                if (wywxdxlist[i] != data.value) {
                                                                    newwywxdxlist.push(wywxdxlist[i]);
                                                                }
                                                            }

                                                            wywxdxlist = [];
                                                            wywxdxlist = newwywxdxlist;
                                                        }
                                                    }
                                                }
                                            });


                                            form.render();
                                            form.render('select');


                                            if (obj.data.zhtlx === "危岩崩塌") {
                                                form.on('submit(editrockfallpropertysubmit)', function (data) {
                                                    data.field.id = obj.data.id;
                                                    data.field.cookie = document.cookie;
                                                    data.field.type = obj.data.zhtlx;
                                                    data.field.item = "0";

                                                    var wyyfysstring = "";
                                                    var wywxdxstring = "";
                                                    for (var i in wyyfyslist) {
                                                        wyyfysstring += wyyfyslist[i] + ",";
                                                    }
                                                    for (var i in wywxdxlist) {
                                                        wywxdxstring += wywxdxlist[i] + ",";
                                                    }

                                                    if (wyyfysstring === "") {
                                                        data.field.yfys = "";
                                                    }
                                                    else {
                                                        data.field.yfys = wyyfysstring.substr(0, wyyfysstring.length - 1);
                                                    }
                                                    if (wywxdxstring === "") {
                                                        data.field.wxdx = "";
                                                    }
                                                    else {
                                                        data.field.wxdx = wywxdxstring.substr(0, wywxdxstring.length - 1);
                                                    }

                                                    $.ajax({
                                                        url: servicesurl + "/api/Disaster/UpdateDisasterProperty", type: "put", data: data.field,
                                                        success: function (result) {
                                                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                        }, datatype: "json"
                                                    });
                                                    return false;
                                                });

                                                form.on('submit(editrockfallenvironmentsubmit)', function (data) {
                                                    data.field.id = obj.data.id;
                                                    data.field.cookie = document.cookie;
                                                    data.field.type = obj.data.zhtlx;
                                                    data.field.item = "1";

                                                    $.ajax({
                                                        url: servicesurl + "/api/Disaster/UpdateDisasterProperty", type: "put", data: data.field,
                                                        success: function (result) {
                                                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                        }, datatype: "json"
                                                    });
                                                    return false;
                                                });

                                                form.on('submit(editrockfallfeaturesubmit)', function (data) {
                                                    data.field.id = obj.data.id;
                                                    data.field.cookie = document.cookie;
                                                    data.field.type = obj.data.zhtlx;
                                                    data.field.item = "2";

                                                    $.ajax({
                                                        url: servicesurl + "/api/Disaster/UpdateDisasterProperty", type: "put", data: data.field,
                                                        success: function (result) {
                                                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                        }, datatype: "json"
                                                    });
                                                    return false;
                                                });

                                                form.on('submit(editrockfalldangersubmit)', function (data) {
                                                    data.field.id = obj.data.id;
                                                    data.field.cookie = document.cookie;
                                                    data.field.type = obj.data.zhtlx;
                                                    data.field.item = "3";

                                                    $.ajax({
                                                        url: servicesurl + "/api/Disaster/UpdateDisasterProperty", type: "put", data: data.field,
                                                        success: function (result) {
                                                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                        }, datatype: "json"
                                                    });
                                                    return false;
                                                });

                                                form.on('submit(editrockfallharmsubmit)', function (data) {
                                                    data.field.id = obj.data.id;
                                                    data.field.cookie = document.cookie;
                                                    data.field.type = obj.data.zhtlx;
                                                    data.field.item = "4";

                                                    $.ajax({
                                                        url: servicesurl + "/api/Disaster/UpdateDisasterProperty", type: "put", data: data.field,
                                                        success: function (result) {
                                                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                        }, datatype: "json"
                                                    });
                                                    return false;
                                                });

                                                form.on('submit(editrockfallforecastsubmit)', function (data) {
                                                    data.field.id = obj.data.id;
                                                    data.field.cookie = document.cookie;
                                                    data.field.type = obj.data.zhtlx;

                                                    $.ajax({
                                                        url: servicesurl + "/api/Disaster/UpdateDisasterWarning", type: "put", data: data.field,
                                                        success: function (result) {
                                                            if (result == "") {
                                                                layer.msg("保存失败！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                            }
                                                            else {
                                                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                            }
                                                        }, datatype: "json"
                                                    });
                                                    return false;
                                                });
                                            }
                                            else if (obj.data.zhtlx === "滑坡") {
                                            }
                                            else if (obj.data.zhtlx === "泥石流") {
                                            }
                                            else if (obj.data.zhtlx === "地面塌陷") {
                                            }
                                            else if (obj.data.zhtlx === "地裂缝") {
                                            }
                                            else if (obj.data.zhtlx === "地面沉降") {
                                            }
                                            else {
                                            }


                                        }, datatype: "json"
                                    });

                                    form.render();
                                    form.render('select');

                                    form.on('submit(editdisasterinfosubmit)', function (data) {
                                        data.field.id = obj.data.id;
                                        data.field.cookie = document.cookie;

                                        $.ajax({
                                            url: servicesurl + "/api/Disaster/UpdateDisaster", type: "put", data: data.field,
                                            success: function (result) {
                                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                            }, datatype: "json"
                                        });

                                        return false;
                                    });


                                }
                                , end: function () { }
                            });

                        } else if (layEvent === 'disasterdel') {
                            layer.confirm('是否删除?', { icon: 3, title: '消息', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                                $.ajax({
                                    url: servicesurl + "/api/Disaster/DeleteDisaster", type: "delete", data: { "id": obj.data.id, "cookie": document.cookie },
                                    success: function (result) {
                                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    }, datatype: "json"
                                });

                                obj.del();
                                GetDisaster();
                                layer.close(index);
                            });
                        }
                    });




                    //监测剖面信息
                    var sectiontabledata = [];
                    var sectiontableedit = table.render({
                        elem: '#sectiontable-edit'
                        , id: 'sectiontableeditid'
                        , title: '监测剖面'
                        , skin: 'line'
                        , even: false
                        , page: {
                            layout: ['prev', 'page', 'next']
                        }
                        , limit: 13
                        , toolbar: '#addsection'
                        , totalRow: false
                        , initSort: { field: 'id', type: 'asc' }
                        , cols: [[
                            { field: 'id', title: 'ID', hide: true }
                            , { field: 'pmmc', title: '剖面名称', width: 200, align: "center" }
                            , { field: 'pmbh', title: '剖面编号', width: 150, align: "center" }
                            , { field: 'pmlx', title: '剖面类型', width: 100, align: "center" }
                            , { field: 'pmdj', title: '剖面等级', width: 100, align: "center" }
                            , { field: 'bz', title: '备注', width: 120, align: "center" }
                            , { fixed: 'right', width: 120, align: 'center', toolbar: '#table-toolbar-section' }
                        ]]
                        , data: sectiontabledata
                    });

                    GetSection();
                    function GetSection() {
                        sectiontableedit.reload({ id: 'sectiontableeditid', data: [] });
                        $.ajax({
                            url: servicesurl + "/api/Section/GetSection", type: "get", data: { "id": id, "cookie": document.cookie },
                            success: function (data) {
                                if (data == "") {
                                    //无监测剖面信息
                                    sectiontableedit.reload({ id: 'sectiontableeditid', data: [] });
                                }
                                else {
                                    var sectionInfos = JSON.parse(data);
                                    sectiontabledata = [];

                                    for (var i in sectionInfos) {
                                        var section = new Object;
                                        section.id = sectionInfos[i].Id;
                                        section.pmmc = sectionInfos[i].PMMC;
                                        section.pmbh = sectionInfos[i].PMBH;
                                        section.pmlx = sectionInfos[i].PMLX;
                                        section.pmdj = sectionInfos[i].PMDJ;
                                        section.bz = sectionInfos[i].BZ;
                                        sectiontabledata.push(section);
                                    }
                                    sectiontableedit.reload({ id: 'sectiontableeditid', data: sectiontabledata });

                                    table.on('tool(sectiontable-edit)', function (obj) {
                                        var data = obj.data;
                                        var layEvent = obj.event;

                                        if (layEvent === 'sectionview') {
                                            layer.open({
                                                type: 1
                                                , title: ['监测剖面信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
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
                                        else if (layEvent === 'sectionedit') {
                                            layer.open({
                                                type: 1
                                                , title: ['编辑监测剖面信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                                , area: ['400px', '400px']
                                                , shade: [0.5, '#393D49']
                                                , offset: 'auto'
                                                , closeBtn: 1
                                                , maxmin: false
                                                , moveOut: true
                                                , content: ''
                                                , zIndex: layer.zIndex
                                                , success: function (layero) {
                                                    layer.setTop(layero);


                                                    //form.val("adduserform", {
                                                    //    "username": obj.data.username
                                                    //    , "password": ""
                                                    //    , "ssdw": obj.data.userssdw
                                                    //    , "ssqy": obj.data.userssqy
                                                    //    , "bz": obj.data.userbz
                                                    //});

                                                    //form.on('submit(addusersubmit)', function (data) {
                                                    //    data.field.id = obj.data.userid;
                                                    //    $.ajax({
                                                    //        url: window.parent.servicesurl + "/api/User/UpdateUser", type: "put", data: data.field,
                                                    //        success: function (result) {
                                                    //            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                    //            GetUserInfo();
                                                    //        }, datatype: "json"
                                                    //    });

                                                    //    layer.close(adduserlayerindex);
                                                    //    return false;
                                                    //});
                                                }
                                                , end: function () { }
                                            });

                                        }
                                        else if (layEvent === 'sectiondel') {
                                            layer.confirm('是否删除?', { icon: 3, title: '消息', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                                                $.ajax({
                                                    url: servicesurl + "/api/Section/DeleteSction", type: "delete", data: { "id": obj.data.id, "cookie": document.cookie },
                                                    success: function (result) {
                                                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                    }, datatype: "json"
                                                });

                                                obj.del();
                                                GetSection();
                                                layer.close(index);
                                            });
                                        }
                                    });
                                }
                            }, datatype: "json"
                        });
                    }

                    table.on('toolbar(sectiontable-edit)', function (obj) {
                        switch (obj.event) {
                            case 'addsection':
                                var addsectionlayerindex = layer.open({
                                    type: 1
                                    , title: ['添加监测剖面', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                    , area: ['400px', '400px']
                                    , shade: [0.5, '#393D49']
                                    , offset: 'auto'
                                    , closeBtn: 1
                                    , maxmin: false
                                    , moveOut: true
                                    , content: '<form class="layui-form" style="margin-top:10px" lay-filter="addsectionform"><div class="layui-form-item"><label class="layui-form-label">剖面名称</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="pmmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">剖面编号</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="pmbh" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">剖面类型</label><div class="layui-input-block" style="padding-right:10px"><select id="pmlxid" name="pmlx"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">剖面等级</label><div class="layui-input-block" style="padding-right:10px"><select id="pmdjid" name="pmdj"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">灾害体</label><div class="layui-input-block" style="padding-right:10px"><select id="pmzhtid" name="pmzht" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">备注</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="bz" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item" style="margin-top:30px"><div class="layui-input-block"><button type="submit" class="layui-btn" lay-submit="" lay-filter="addsectionsubmit" style="width:80px">提交</button><button type="reset" class="layui-btn layui-btn-primary" style="width:80px">重置</button></div></div></form>'
                                    , zIndex: layer.zIndex
                                    , success: function (layero) {
                                        layer.setTop(layero);

                                        if (pmlxs.length > 0) {
                                            for (var i in pmlxs) {
                                                document.getElementById("pmlxid").innerHTML += '<option value="' + pmlxs[i].value + '">' + pmlxs[i].name + '</option>';
                                            }
                                        }
                                        if (pmdjs.length > 0) {
                                            for (var i in pmdjs) {
                                                document.getElementById("pmdjid").innerHTML += '<option value="' + pmdjs[i].value + '">' + pmdjs[i].name + '</option>';
                                            }
                                        }

                                        if (disastertabledata.length > 0) {
                                            for (var i in disastertabledata) {
                                                document.getElementById("pmzhtid").innerHTML += '<option value="' + disastertabledata[i].id + '">' + disastertabledata[i].zhtbh + '</option>';
                                            }
                                        }

                                        form.render();
                                        form.render('select');

                                        form.on('submit(addsectionsubmit)', function (data) {
                                            data.field.cookie = document.cookie;

                                            $.ajax({
                                                url: servicesurl + "/api/Section/AddSection", type: "post", data: data.field,
                                                success: function (result) {
                                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                    GetSection();
                                                }, datatype: "json"
                                            });

                                            layer.close(addsectionlayerindex);
                                            return false;
                                        });
                                    }
                                    , end: function () { }
                                });
                                break;
                        };
                    });


                    //监测点信息
                    var monitortableedit = table.render({
                        elem: '#monitortable-edit'
                        , id: 'monitortableeditid'
                        , title: '监测点'
                        , skin: 'line'
                        , even: false
                        , page: {
                            layout: ['prev', 'page', 'next']
                        }
                        , limit: 13
                        , toolbar: '#addmonitor'
                        , totalRow: false
                        , initSort: { field: 'id', type: 'asc' }
                        , cols: [[
                            { field: 'id', title: 'ID', hide: true }
                            , { field: 'jcdmc', title: '监测点名称', width: 150, align: "center" }
                            , { field: 'jcdbh', title: '监测点编号', width: 150, align: "center" }
                            , { field: 'jcff', title: '监测方法', width: 150, align: "center" }
                            , { field: 'jczlx', title: '监测站类型', width: 150, align: "center" }
                            , { field: 'bz', title: '备注', width: 70, align: "center" }
                            , { fixed: 'right', width: 120, align: 'center', toolbar: '#table-toolbar-monitor' }
                        ]]
                        , data: []
                    });

                    GetMonitor();
                    function GetMonitor() {
                        document.getElementById("monitorclassitemid").innerHTML = "";
                        monitortableedit.reload({ id: 'monitortableeditid', data: [] });

                        $.ajax({
                            url: servicesurl + "/api/Monitor/GetMonitor", type: "get", data: { "id": id, "cookie": document.cookie },
                            success: function (result) {
                                if (result == "") {
                                    //无监测设计信息
                                    monitortableedit.reload({ id: 'monitortableeditid', data: [] });
                                }
                                else {
                                    var monitorinfos = JSON.parse(result);

                                    var disasterinfo = [];//灾害体
                                    var methodinfo = [];//监测方法
                                    var sectioninfo = [];//监测剖面
                                    var monitortablebydisasterdata = [];//按灾害体筛选的监测点数据
                                    var monitortablebymethoddata = [];//按监测方法筛选的监测点数据
                                    var monitortablebysectiondata = [];//按监测剖面筛选的监测点数据  

                                    for (var i in monitorinfos) {
                                        if (monitorinfos[i].DisasterString != null) {
                                            if (disasterinfo.length != 0) {
                                                var isin = false;
                                                for (var j in disasterinfo) {
                                                    if (disasterinfo[j].id == monitorinfos[i].DisasterString.Id) {
                                                        isin = true;
                                                        break;
                                                    }
                                                }

                                                if (!isin) {
                                                    var di = new Object;
                                                    di.title = monitorinfos[i].DisasterString.ZHTBH;
                                                    di.id = monitorinfos[i].DisasterString.Id;
                                                    disasterinfo.push(di);
                                                }
                                            }
                                            else {
                                                var di = new Object;
                                                di.title = monitorinfos[i].DisasterString.ZHTBH;
                                                di.id = monitorinfos[i].DisasterString.Id;
                                                disasterinfo.push(di);
                                            }
                                        }

                                        if (monitorinfos[i].SectionString != null) {
                                            if (sectioninfo.length != 0) {
                                                var isin = false;
                                                for (var j in sectioninfo) {
                                                    if (sectioninfo[j].id == monitorinfos[i].SectionString.Id) {
                                                        isin = true;
                                                        break;
                                                    }
                                                }

                                                if (!isin) {
                                                    var si = new Object;
                                                    si.title = monitorinfos[i].SectionString.PMBH;
                                                    si.id = monitorinfos[i].SectionString.Id;
                                                    sectioninfo.push(si);
                                                }
                                            }
                                            else {
                                                var si = new Object;
                                                si.title = monitorinfos[i].SectionString.PMBH;
                                                si.id = monitorinfos[i].SectionString.Id;
                                                sectioninfo.push(si);
                                            }
                                        }

                                        if (monitorinfos[i].MonitorString != null) {
                                            if (methodinfo.length != 0) {
                                                var isin = false;
                                                for (var j in methodinfo) {
                                                    if (methodinfo[j].title == monitorinfos[i].MonitorString.JCFF) {
                                                        isin = true;
                                                        break;
                                                    }
                                                }

                                                if (!isin) {
                                                    var mi = new Object;
                                                    mi.title = monitorinfos[i].MonitorString.JCFF;
                                                    mi.id = monitorinfos[i].MonitorString.Id;
                                                    methodinfo.push(mi);
                                                }
                                            }
                                            else {
                                                var mi = new Object;
                                                mi.title = monitorinfos[i].MonitorString.JCFF;
                                                mi.id = monitorinfos[i].MonitorString.Id;
                                                methodinfo.push(mi);
                                            }
                                        }
                                    }

                                    //初始一二级筛选条件
                                    for (var i in disasterinfo) {
                                        if (i === 0) {
                                            document.getElementById('monitorclassitemid').innerHTML += '<option value="' + disasterinfo[i].id + ' selected="selected"">' + disasterinfo[i].title + '</option>';
                                        }
                                        else {
                                            document.getElementById('monitorclassitemid').innerHTML += '<option value="' + disasterinfo[i].id + '">' + disasterinfo[i].title + '</option>';
                                        }
                                    }
                                    form.render();
                                    form.render('select');
                                    if (disasterinfo.length > 0) {
                                        DefaultbyDisaster(disasterinfo[0].id);
                                    }

                                    //切换一级筛选条件
                                    form.on('select(monitorclass)', function (data) {
                                        document.getElementById('monitorclassitemid').innerHTML = "";
                                        monitortableedit.reload({ id: 'monitortableeditid', data: [] });

                                        if (data.value === "0") {
                                            for (var i in disasterinfo) {
                                                if (i === 0) {
                                                    document.getElementById('monitorclassitemid').innerHTML += '<option value="' + disasterinfo[i].id + ' selected="selected"">' + disasterinfo[i].title + '</option>';
                                                }
                                                else {
                                                    document.getElementById('monitorclassitemid').innerHTML += '<option value="' + disasterinfo[i].id + '">' + disasterinfo[i].title + '</option>';
                                                }
                                            }

                                            if (disasterinfo.length > 0) {
                                                DefaultbyDisaster(disasterinfo[0].id);
                                            }
                                        }
                                        else if (data.value === "1") {
                                            for (var i in methodinfo) {
                                                if (i === 0) {
                                                    document.getElementById('monitorclassitemid').innerHTML += '<option value="' + methodinfo[i].id + ' selected="selected"">' + methodinfo[i].title + '</option>';
                                                }
                                                else {
                                                    document.getElementById('monitorclassitemid').innerHTML += '<option value="' + methodinfo[i].id + '">' + methodinfo[i].title + '</option>';
                                                }
                                            }

                                            if (methodinfo.length > 0) {
                                                DefaultbyMethod(methodinfo[0].title);
                                            }
                                        }
                                        else if (data.value === "2") {
                                            for (var i in sectioninfo) {
                                                if (i === 0) {
                                                    document.getElementById('monitorclassitemid').innerHTML += '<option value="' + sectioninfo[i].id + ' selected="selected"">' + sectioninfo[i].title + '</option>';
                                                }
                                                else {
                                                    document.getElementById('monitorclassitemid').innerHTML += '<option value="' + sectioninfo[i].id + '">' + sectioninfo[i].title + '</option>';
                                                }
                                            }

                                            if (sectioninfo.length > 0) {
                                                DefaultbySection(sectioninfo[0].id);
                                            }
                                        }

                                        form.render();
                                        form.render('select');
                                    });

                                    //按灾害体默认展示
                                    function DefaultbyDisaster(obj) {
                                        monitortablebydisasterdata = [];
                                        for (var i in monitorinfos) {
                                            var monitor = new Object;
                                            monitor.id = monitorinfos[i].MonitorString.Id;
                                            monitor.jcdmc = monitorinfos[i].MonitorString.JCDMC;
                                            monitor.jcdbh = monitorinfos[i].MonitorString.JCDBH;
                                            monitor.jcff = monitorinfos[i].MonitorString.JCFF;
                                            monitor.jczlx = monitorinfos[i].MonitorString.JCZLX;
                                            monitor.pmwzx = monitorinfos[i].MonitorString.PMWZX;
                                            monitor.pmwzy = monitorinfos[i].MonitorString.PMWZY;
                                            monitor.gc = monitorinfos[i].MonitorString.GC;
                                            monitor.sd = monitorinfos[i].MonitorString.SD;
                                            monitor.ks = monitorinfos[i].MonitorString.KS;
                                            monitor.kjck = monitorinfos[i].MonitorString.KJCK;
                                            monitor.bz = monitorinfos[i].MonitorString.BZ;

                                            if (monitorinfos[i].DisasterString != null) {
                                                if (monitorinfos[i].DisasterString.Id == obj) {
                                                    monitortablebydisasterdata.push(monitor);
                                                }
                                            }
                                        }
                                        monitortableedit.reload({ id: 'monitortableeditid', data: monitortablebydisasterdata });
                                    }
                                    //按监测方法默认展示
                                    function DefaultbyMethod(obj) {
                                        monitortablebymethoddata = [];
                                        for (var i in monitorinfos) {
                                            var monitor = new Object;
                                            monitor.id = monitorinfos[i].MonitorString.Id;
                                            monitor.jcdmc = monitorinfos[i].MonitorString.JCDMC;
                                            monitor.jcdbh = monitorinfos[i].MonitorString.JCDBH;
                                            monitor.jcff = monitorinfos[i].MonitorString.JCFF;
                                            monitor.jczlx = monitorinfos[i].MonitorString.JCZLX;
                                            monitor.pmwzx = monitorinfos[i].MonitorString.PMWZX;
                                            monitor.pmwzy = monitorinfos[i].MonitorString.PMWZY;
                                            monitor.gc = monitorinfos[i].MonitorString.GC;
                                            monitor.sd = monitorinfos[i].MonitorString.SD;
                                            monitor.ks = monitorinfos[i].MonitorString.KS;
                                            monitor.kjck = monitorinfos[i].MonitorString.KJCK;
                                            monitor.bz = monitorinfos[i].MonitorString.BZ;

                                            if (monitorinfos[i].MonitorString.JCFF === obj) {
                                                monitortablebymethoddata.push(monitor);
                                            }
                                        }
                                        monitortableedit.reload({ id: 'monitortableeditid', data: monitortablebymethoddata });
                                    }
                                    //按监测剖面默认展示
                                    function DefaultbySection(obj) {
                                        monitortablebysectiondata = [];
                                        for (var i in monitorinfos) {
                                            var monitor = new Object;
                                            monitor.id = monitorinfos[i].MonitorString.Id;
                                            monitor.jcdmc = monitorinfos[i].MonitorString.JCDMC;
                                            monitor.jcdbh = monitorinfos[i].MonitorString.JCDBH;
                                            monitor.jcff = monitorinfos[i].MonitorString.JCFF;
                                            monitor.jczlx = monitorinfos[i].MonitorString.JCZLX;
                                            monitor.pmwzx = monitorinfos[i].MonitorString.PMWZX;
                                            monitor.pmwzy = monitorinfos[i].MonitorString.PMWZY;
                                            monitor.gc = monitorinfos[i].MonitorString.GC;
                                            monitor.sd = monitorinfos[i].MonitorString.SD;
                                            monitor.ks = monitorinfos[i].MonitorString.KS;
                                            monitor.kjck = monitorinfos[i].MonitorString.KJCK;
                                            monitor.bz = monitorinfos[i].MonitorString.BZ;

                                            if (monitorinfos[i].SectionString != null) {
                                                if (monitorinfos[i].SectionString.Id == obj) {
                                                    monitortablebysectiondata.push(monitor);
                                                }
                                            }
                                        }
                                        monitortableedit.reload({ id: 'monitortableeditid', data: monitortablebysectiondata });
                                    }

                                    //切换二级筛选条件
                                    form.on('select(monitorclassitem)', function (data) {
                                        var monitoreditform = form.val("monitoreditform");
                                        if (monitoreditform.monitorclass == "0") {
                                            //按不同灾害体
                                            DefaultbyDisaster(monitoreditform.monitorclassitem);
                                        } else if (monitoreditform.monitorclass == "1") {
                                            //按不同监测方法
                                            for (var i in methodinfo) {
                                                if (methodinfo[i].id == monitoreditform.monitorclassitem) {
                                                    DefaultbyMethod(methodinfo[i].title);
                                                    break;
                                                }
                                            }
                                        } else if (monitoreditform.monitorclass == "2") {
                                            //按不同监测剖面
                                            DefaultbySection(monitoreditform.monitorclassitem);
                                        }
                                    });


                                    //监测点操作
                                    table.on('tool(monitortable-edit)', function (obj) {
                                        var data = obj.data;
                                        var layEvent = obj.event;

                                        if (layEvent === 'monitorview') {
                                            layer.open({
                                                type: 1
                                                , title: ['监测点信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
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
                                        } else if (layEvent === 'monitoredit') {
                                            layer.open({
                                                type: 1
                                                , title: ['编辑监测点信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
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

                                        } else if (layEvent === 'monitordel') {
                                            layer.confirm('是否删除?', { icon: 3, title: '消息', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                                                $.ajax({
                                                    url: servicesurl + "/api/Monitor/DeleteMonitor", type: "delete", data: { "id": obj.data.id, "cookie": document.cookie },
                                                    success: function (result) {
                                                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                    }, datatype: "json"
                                                });

                                                obj.del();
                                                GetMonitor();//应该记住筛选条件
                                                layer.close(index);
                                            });
                                        }
                                    });
                                }
                            }, datatype: "json"
                        });
                    }

                    table.on('toolbar(monitortable-edit)', function (obj) {
                        switch (obj.event) {
                            case 'addmonitor':
                                var addmonitorlayerindex = layer.open({
                                    type: 1
                                    , title: ['添加监测点', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                    , area: ['600px', '500px']
                                    , shade: [0.5, '#393D49']
                                    , offset: 'auto'
                                    , closeBtn: 1
                                    , maxmin: false
                                    , moveOut: true
                                    , content: '<form class="layui-form" style="margin-top:10px" lay-filter="addmonitorform"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">监测点名称</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="jcdmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label">监测点编号</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="jcdbh" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">监测方法</label><div class="layui-input-block" style="padding-right:10px"><select id="jcffid" name="jcff" lay-verify="required" lay-filter="jcffchange"><option value="">请选择</option></select></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label">监测站类型</label><div class="layui-input-block" style="padding-right:10px"><select id="jczlxid" name="jczlx" disabled="disabled"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">平面位置x</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="pmwzx" autocomplete="off" placeholder="请输入" lay-verify="required|number" class="layui-input" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label">平面位置y</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="pmwzy" autocomplete="off" placeholder="请输入" lay-verify="required|number" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label">坐标系</label><div class="layui-input-block" style="padding-right:10px"><select id="monitorsridid" name="monitorsrid" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">高程(m)</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="gc" autocomplete="off" placeholder="请输入" lay-verify="required|number" class="layui-input" /></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label">深度(m)</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="sd" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">孔深(m)</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="ks" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">灾害体</label><div class="layui-input-block" style="padding-right:10px"><select id="zhtid" name="zht"><option value="">请选择</option></select></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label">监测剖面</label><div class="layui-input-block" style="padding-right:10px"><select id="jcpmid" name="jcpm"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label">自动化设备</label><div class="layui-input-block" style="padding-right:10px"><select id="jcsbid" name="jcsb"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">备注</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="bz" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item" style="margin-top:30px"><div class="layui-input-block"><button type="submit" class="layui-btn" lay-submit="" lay-filter="addmonitorsubmit" style="width:80px">保存</button><button type="reset" class="layui-btn layui-btn-primary" style="width:80px">重置</button></div></div></form>'
                                    , zIndex: layer.zIndex
                                    , success: function (layero) {
                                        layer.setTop(layero);

                                        var freedevices = [];//所有未绑定的自动化监测设备

                                        if (jcffs.length > 0) {
                                            for (var i in jcffs) {
                                                document.getElementById("jcffid").innerHTML += '<option value="' + jcffs[i].value + '">' + jcffs[i].name + '</option>';
                                            }
                                        }
                                        if (jczlxs.length > 0) {
                                            for (var i in jczlxs) {
                                                document.getElementById("jczlxid").innerHTML += '<option value="' + jczlxs[i].value + '">' + jczlxs[i].name + '</option>';
                                            }
                                        }
                                        if (srids.length > 0) {
                                            for (var i in srids) {
                                                document.getElementById("monitorsridid").innerHTML += '<option value="' + srids[i].value + '">' + srids[i].name + '</option>';
                                            }
                                        }
                                        if (disastertabledata.length > 0) {
                                            for (var i in disastertabledata) {
                                                document.getElementById("zhtid").innerHTML += '<option value="' + disastertabledata[i].id + '">' + disastertabledata[i].zhtbh + '</option>';
                                            }
                                        }
                                        if (sectiontabledata.length > 0) {
                                            for (var i in sectiontabledata) {
                                                document.getElementById("jcpmid").innerHTML += '<option value="' + sectiontabledata[i].id + '">' + sectiontabledata[i].pmbh + '</option>';
                                            }
                                        }
                                        form.render();
                                        form.render('select');

                                        form.on('select(jcffchange)', function (data) {
                                            if (data.value === "0") {
                                                //GNSS
                                                document.getElementById("jczlxid").disabled = "";
                                            }
                                            else {
                                                //非GNSS
                                                document.getElementById("jczlxid").disabled = "disabled";
                                            }

                                            document.getElementById("jcsbid").innerHTML = '<option value="">请选择</option>';

                                            var jcffname = "";
                                            for (var i in jcffs) {
                                                if (data.value === jcffs[i].value) {
                                                    jcffname = jcffs[i].name;
                                                }
                                            }

                                            if ((freedevices.length > 0) && (jcffname != "")) {
                                                for (var i in freedevices) {
                                                    if (freedevices[i].sblx === jcffname) {
                                                        document.getElementById("jcsbid").innerHTML += '<option value="' + freedevices[i].id + '">' + freedevices[i].code + '</option>';
                                                    }
                                                }
                                            }

                                            form.render();
                                            form.render('select');
                                        });


                                        $.ajax({
                                            url: servicesurl + "/api/Device/GetFreeDevice", type: "get",
                                            success: function (result) {
                                                if (result === "") {
                                                    freedevices = [];
                                                }
                                                else {
                                                    var freedevicedata = JSON.parse(result);

                                                    for (var i in freedevicedata) {
                                                        var freedevice = new Object;
                                                        freedevice.id = freedevicedata[i].Id;
                                                        freedevice.code = freedevicedata[i].Code;
                                                        freedevice.sbmc = freedevicedata[i].SBMC;
                                                        freedevice.sbbh = freedevicedata[i].SBBH;
                                                        freedevice.sbxh = freedevicedata[i].SBXH;
                                                        freedevice.sblx = freedevicedata[i].SBLX;
                                                        freedevices.push(freedevice);
                                                    }

                                                    //if (freedevices.length > 0) {
                                                    //    for (var i in freedevices) {
                                                    //        document.getElementById("jcsbid").innerHTML += '<option value="' + freedevices[i].id + '">' + freedevices[i].code + '</option>';
                                                    //    }
                                                    //}
                                                    //form.render();
                                                    //form.render('select');
                                                }
                                            }, datatype: "json"
                                        });

                                        form.on('submit(addmonitorsubmit)', function (data) {
                                            data.field.id = id;
                                            data.field.cookie = document.cookie;

                                            $.ajax({
                                                url: servicesurl + "/api/Monitor/AddMonitor", type: "post", data: data.field,
                                                success: function (result) {
                                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                    GetMonitor();//应该记住默认筛选条件
                                                }, datatype: "json"
                                            });

                                            layer.close(addmonitorlayerindex);
                                            return false;
                                        });
                                    }
                                    , end: function () { }
                                });
                                break;
                        };
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
                , area: ['900px', '810px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<!--创建项目--><form class="layui-form" style="margin-top:5px;margin-right:5px;" lay-filter="addprojectinfoform"><div class="layui-form-item"><label class="layui-form-label">项目名称</label><div class="layui-input-block"><input type="text" name="xmmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">项目类型</label><div class="layui-input-block"><select id="xmlxid" name="xmlx"><option value="">请选择</option></select></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label">项目类别</label><div class="layui-input-block"><select id="xmlbid" name="xmlb"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4" style="width:25%"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">中心经度</label><div class="layui-input-block"><input type="text" name="zxjd" lay-verify="required|number" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div></div><div class="layui-col-md4" style="width:25%"><div class="grid-demo"><label class="layui-form-label">中心纬度</label><div class="layui-input-block"><input type="text" name="zxwd" lay-verify="required|number" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div></div><div class="layui-col-md4" style="width:50%"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">坐标系统</label><div class="layui-input-block"><select id="kjckid" name="kjck" lay-verify="required"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label">行政区划</label><div class="layui-input-inline" style="width:200px;"><select id="provinceid" name="province" lay-verify="required"><option value="">省/市</option><option value="0">重庆市</option></select></div><div class="layui-input-inline" style="width:200px;"><select id="cityid" name="city" lay-verify="required"><option value="">市辖区/县</option><option value="0">市辖区</option><option value="1">县</option></select></div><div class="layui-input-inline" style="width:200px;"><select id="districtid" name="district" lay-verify="required"><option value="">区/县</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">项目位置</label><div class="layui-input-block"><input type="text" name="xmwz" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><div class="layui-inline"><label class="layui-form-label">开始时间</label><div class="layui-input-inline" style="width:250px;"><input type="text" id="xmkssjid" name="xmkssj" lay-verify="date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" /></div></div></div></div><div class="layui-col-md6"><div class="grid-demo"><div class="layui-inline"><label class="layui-form-label">结束时间</label><div class="layui-input-inline" style="width:250px;"><input type="text" id="xmjssjid" name="xmjssj" lay-verify="date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" /></div></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">灾害点名称</label><div class="layui-input-block"><input type="text" name="zhdmc" lay-verify="required" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label">灾害点编号</label><div class="layui-input-block"><input type="text" name="zhdtybh" lay-verify="required" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">灾害类型</label><div class="layui-input-block"><select id="zhlxid" name="zhlx" lay-verify="required"><option value="">请选择</option></select></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label">灾害等级</label><div class="layui-input-block"><select id="zhdjid" name="zhdj"><option value="">请选择</option></select></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">灾害险情</label><div class="layui-input-block"><select id="zhxqid" name="zhxq"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">预警级别</label><div class="layui-input-block"><select id="yjjbid" name="yjjb"><option value="">请选择</option></select></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label">监测级别</label><div class="layui-input-block"><select id="jcjbid" name="jcjb"><option value="">请选择</option></select></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">监测手段</label><div class="layui-input-block"><select id="jcsdid" name="jcsd"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">是否库区</label><div class="layui-input-block"><select name="sfkq"><option value="">请选择</option><option value="true">是</option><option value="false">否</option></select></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label">是否涉水</label><div class="layui-input-block"><select name="sfss"><option value="">请选择</option><option value="true">是</option><option value="false">否</option></select></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">是否结束</label><div class="layui-input-block"><select name="sfjs"><option value="">请选择</option><option value="true">是</option><option value="false">否</option></select></div></div></div></div></div><div class="layui-form-item"><div class="layui-row layui-col-space1"><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">面积</label><div class="layui-input-block"><input type="text" name="mj" autocomplete="off" class="layui-input" placeholder="请输入" /></div></div></div><div class="layui-col-md3"><div class="grid-demo"><label class="layui-form-label">面积单位</label><div class="layui-input-block"><select id="mjdwid" name="mjdw" lay-verify="required"><option value="">请选择</option></select></div></div></div><div class="layui-col-md3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">体积</label><div class="layui-input-block"><input type="text" name="tj" autocomplete="off" class="layui-input" placeholder="请输入" /></div></div></div><div class="layui-col-md3"><div class="grid-demo"><label class="layui-form-label">体积单位</label><div class="layui-input-block"><select id="tjdwid" name="tjdw" lay-verify="required"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item"><div class="layui-row layui-col-space1"><div class="layui-col-md3" style="width:25%"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">威胁户数</label><div class="layui-input-block"><input type="text" name="wxhs" autocomplete="off" class="layui-input" placeholder="请输入" /></div></div></div><div class="layui-col-md3" style="width:25%"><div class="grid-demo"><label class="layui-form-label">威胁人数</label><div class="layui-input-block"><input type="text" name="wxrs" autocomplete="off" class="layui-input" placeholder="请输入" /></div></div></div><div class="layui-col-md3" style="width:50%"><label class="layui-form-label" style="width:200px">威胁房屋面积(平方米)</label><input type="text" name="wxfwmj" autocomplete="off" class="layui-input" placeholder="请输入" style="width:180px;float:right" /></div></div></div><div class="layui-form-item"><label class="layui-form-label">其他威胁</label><div class="layui-input-block"><textarea name="qtwx" class="layui-textarea"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label">备注</label><div class="layui-input-block"><input type="text" name="bz" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item" style="margin-top:5px"><div style="position:absolute;right:15px;"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="addprojectinfosubmit" style="width:100px">提交</button></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    if (xmlxs.length > 0) {
                        for (var i in xmlxs) {
                            document.getElementById("xmlxid").innerHTML += '<option value="' + xmlxs[i].value + '">' + xmlxs[i].name + '</option>';
                        }
                    }
                    if (xmlbs.length > 0) {
                        for (var i in xmlbs) {
                            document.getElementById("xmlbid").innerHTML += '<option value="' + xmlbs[i].value + '">' + xmlbs[i].name + '</option>';
                        }
                    }
                    if (srids.length > 0) {
                        for (var i in srids) {
                            if (srids[i].name == "China Geodetic Coordinate System 2000") {
                                document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '" selected>' + srids[i].name + '</option>';
                            }
                            else {
                                document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '">' + srids[i].name + '</option>';
                            }
                        }
                    }
                    if (xjxzqs.length > 0) {
                        for (var i in xjxzqs) {
                            document.getElementById("districtid").innerHTML += '<option value="' + xjxzqs[i].value + '">' + xjxzqs[i].name + '</option>';
                        }
                    }
                    if (zhlxs.length > 0) {
                        for (var i in zhlxs) {
                            document.getElementById("zhlxid").innerHTML += '<option value="' + zhlxs[i].value + '">' + zhlxs[i].name + '</option>';
                        }
                    }
                    if (zhdjs.length > 0) {
                        for (var i in zhdjs) {
                            document.getElementById("zhdjid").innerHTML += '<option value="' + zhdjs[i].value + '">' + zhdjs[i].name + '</option>';
                        }
                    }
                    if (zhxqs.length > 0) {
                        for (var i in zhxqs) {
                            document.getElementById("zhxqid").innerHTML += '<option value="' + zhxqs[i].value + '">' + zhxqs[i].name + '</option>';
                        }
                    }
                    if (yjjbs.length > 0) {
                        for (var i in yjjbs) {
                            document.getElementById("yjjbid").innerHTML += '<option value="' + yjjbs[i].value + '">' + yjjbs[i].name + '</option>';
                        }
                    }
                    if (jcjbs.length > 0) {
                        for (var i in jcjbs) {
                            document.getElementById("jcjbid").innerHTML += '<option value="' + jcjbs[i].value + '">' + jcjbs[i].name + '</option>';
                        }
                    }
                    if (jcsds.length > 0) {
                        for (var i in jcsds) {
                            document.getElementById("jcsdid").innerHTML += '<option value="' + jcsds[i].value + '">' + jcsds[i].name + '</option>';
                        }
                    }
                    if (mjdws.length > 0) {
                        for (var i in mjdws) {
                            if (mjdws[i].name == "平方米") {
                                document.getElementById("mjdwid").innerHTML += '<option value="' + mjdws[i].value + '" selected>' + mjdws[i].name + '</option>';
                            }
                            else {
                                document.getElementById("mjdwid").innerHTML += '<option value="' + mjdws[i].value + '">' + mjdws[i].name + '</option>';
                            }
                        }
                    }
                    if (tjdws.length > 0) {
                        for (var i in tjdws) {
                            if (tjdws[i].name == "立方米") {
                                document.getElementById("tjdwid").innerHTML += '<option value="' + tjdws[i].value + '" selected>' + tjdws[i].name + '</option>';
                            }
                            else {
                                document.getElementById("tjdwid").innerHTML += '<option value="' + tjdws[i].value + '">' + tjdws[i].name + '</option>';
                            }
                        }
                    }

                    //渲染开始时间&结束时间
                    date.render({
                        elem: '#xmkssjid'
                    });
                    date.render({
                        elem: '#xmjssjid'
                    });
                    form.render();
                    form.render('select');

                    form.on('submit(addprojectinfosubmit)', function (data) {
                        data.field.cookie = document.cookie;
                        $.ajax({
                            url: servicesurl + "/api/MonitorProject/AddProject", type: "post", data: data.field,
                            success: function (result) {
                                if (isNaN(parseInt(result))) {
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

//查看灾害体信息
function DisasterInfoView(disaster) {
    //灾害体属性
    layer.open({
        type: 1
        , title: [disaster.zhtmc, 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
        , area: ['1200px', '685px']
        , shade: 0
        , offset: 'auto'
        , closeBtn: 1
        , maxmin: false
        , moveOut: true
        , content: '<!--灾害体属性--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px 0px"><ul class="layui-tab-title"><li class="layui-this">基本信息</li><li>属性</li><li>环境</li><li>基本特征</li><li>危险性分析</li><li>危害分析</li><li>预警模型参数</li>       </ul><div class="layui-tab-content" style="margin:0px 0px"><!--基本信息--><div class="layui-tab-item layui-show"><form class="layui-form" style="margin-top:0px" lay-filter="disasterinfoviewform"><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">灾害体名称</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zhtmc" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">灾害体编号</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zhtbh" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">灾害体类型</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zhtlx" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">灾害体中心经度</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zxjd" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">灾害体中心纬度</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zxwd" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;padding-top:170px;">备注</label><div class="layui-input-block" style="margin-left:150px;"><textarea name="bz" class="layui-textarea" readonly="readonly" style="min-height:363px!important"></textarea></div></div></form></div><!--属性--><div id="disasterpropertyview" class="layui-tab-item"></div><!--环境--><div id="disasterenvironmentview" class="layui-tab-item"></div><!--基本特征--><div id="disasterfeatureview" class="layui-tab-item"></div><!--危险性分析--><div id="disasterdangerview" class="layui-tab-item"></div><!--危害分析--><div id="disasterharmview" class="layui-tab-item"></div><!--预警模型参数--><div id="disasterforecastview" class="layui-tab-item"></div></div></div>'
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);

            //灾害体基本信息
            form.val("disasterinfoviewform", {
                "zhtmc": disaster.zhtmc
                , "zhtbh": disaster.zhtbh
                , "zhtlx": disaster.zhtlx
                , "zxjd": disaster.zxjd
                , "zxwd": disaster.zxwd
                , "bz": disaster.bz
            });

            if (disaster.zhtlx === "危岩崩塌") {
                document.getElementById("disasterpropertyview").innerHTML = '<!--崩塌（危岩体）属性--><form class="layui-form" style="margin-top:0px" lay-filter="rockfallpropertyviewform"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">运动形式</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="ydxs" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">崩塌类型</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btlx" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">控制结构面类型</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="kzjgmlx" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">宏观稳定性评价</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="hgwdxpj" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">活动状态</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="hdzt" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">崩塌源扩展方式</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btykzfs" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">崩塌时间</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btsj" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">主崩方向(°)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zbfx" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">崩塌源高程(m)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btygc" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">最大落差(m)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zdlc" class="layui-input" readonly="readonly" /></div></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">最大水平位移(m)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zdspwy" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">崩塌源宽度(m)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btykd" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">崩塌源厚度(m)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btyhd" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">崩塌源面积(㎡)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btymj" class="layui-input" readonly="readonly" /></div></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">崩塌源体积(m³)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btytj" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">诱发因素</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="yfys" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">堆积体平均厚度(m)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="djtpjhd" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">堆积体面积(㎡)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="djtmj" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">堆积体体积(m³)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="djttj" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">规模等级</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="gmdj" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">实体勾绘</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="stgh" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">确定性程度</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="qdxcd" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">灾情等级</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zqdj" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">险情等级</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="xqdj" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">死亡人数(人)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="swrs" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">威胁人数(人)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="wxrs" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">直接损失(万元)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zjss" class="layui-input" readonly="readonly" /></div></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">威胁财产(万元)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="wxcc" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;padding-top:41px;">威胁对象</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="wxdx" class="layui-input" readonly="readonly" style="height:105px;"/></div></div></form>';
                document.getElementById("disasterenvironmentview").innerHTML = '<!--崩塌（危岩体）环境--><form class="layui-form" style="margin-top:0px" lay-filter="rockfallenvironmentviewform"><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:35px;">地形地貌</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="dxdm" class="layui-textarea" readonly="readonly" style="min-height:90px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:35px;">地层岩性、岩性组合</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="dcyxyxzh" class="layui-textarea" readonly="readonly" style="min-height:90px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:35px;">斜坡结构与地质构造</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="xpjgdzgz" class="layui-textarea" readonly="readonly" style="min-height:90px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:35px;">水文地质条件</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="swdztj" class="layui-textarea" readonly="readonly" style="min-height:90px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:35px;">植被及土地利用</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="zbtdly" class="layui-textarea" readonly="readonly" style="min-height:90px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:42px;">人类工程活动</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="rlgchd" class="layui-textarea" readonly="readonly" style="min-height:104px!important"></textarea></div></div></form>';
                document.getElementById("disasterfeatureview").innerHTML = '<!--崩塌（危岩体）基本特征--><form class="layui-form" style="margin-top:0px" lay-filter="rockfallfeatureviewform"><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:85px;">崩塌源区</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="btyq" class="layui-textarea" readonly="readonly" style="min-height:190px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:85px;">崩塌堆积体</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="btdjt" class="layui-textarea" readonly="readonly" style="min-height:190px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:85px;">崩塌路径区</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="btljq" class="layui-textarea" readonly="readonly" style="min-height:189px!important"></textarea></div></div></form>';
                document.getElementById("disasterdangerview").innerHTML = '<!--崩塌（危岩体）危险性分析--><form class="layui-form" style="margin-top:0px" lay-filter="rockfalldangerviewform"><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:276px;">危险性分析</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="wxxfx" class="layui-textarea" readonly="readonly" style="min-height:578px!important"></textarea></div></div></form>';
                document.getElementById("disasterharmview").innerHTML = '<!--崩塌（危岩体）危害分析--><form class="layui-form" style="margin-top:0px" lay-filter="rockfallharmviewform"><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:276px;">危害分析</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="whfx" class="layui-textarea" readonly="readonly" style="min-height:578px!important"></textarea></div></div></form>';
                document.getElementById("disasterforecastview").innerHTML = '<!--崩塌（危岩体）预警模型参数--><form class="layui-form" style="margin-top:0px" lay-filter="rockfallforecastviewform"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩破坏模式</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="CType1" class="layui-input" readonly="readonly" /></div></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩破坏模式亚类</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="CType2" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩顶部高程(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Alt_up" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩底部高程(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Alt_down" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩体积(m³)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Rock_vol" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩高度(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Frame_H" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩宽度(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Frame_W" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩厚度(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Frame_Th" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">岩性</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Rock_char" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">崩塌方向(°)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Coll_Dir" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">岩层产状(°)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="OcofRS" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">岩体容重(KN/m³)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="UW" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">条块面积(m²)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="SA" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩体自重(KN/m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="OW" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">潜在滑面倾角(°)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="IASS" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">潜在滑面长度(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="LSS" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">潜在滑面内摩擦角(°)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="FASS" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">潜在滑面粘聚力(kPa)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="CSS" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">岩体泊松比</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="PRR" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">岩体弹性模量(kPa)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="EMR" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">后缘裂隙倾角(°)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="IAPC" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">偏心荷载弯矩</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="SCP_Mk" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">后缘裂隙深度(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="VDPC" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩抗弯矩系数</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="MRC" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><!--<label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩体粘聚力标准值(kPa)</label>--><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">底部软弱层内聚力(kPa)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="SCP_C" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><!--<label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩体内摩擦角标准值(°)</label>--><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">底部软弱层内摩擦角(°)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="SCP_FA" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩体的抗拉强度(kPa)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="FLk" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩单体底面宽度(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="SCP_DS" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">岩体重心到后缘裂缝底部的水平距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="HDPC" class="layui-input" readonly="readonly" /></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩重心到倾覆点的水平距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="HDCD" class="layui-input" readonly="readonly" /></div></div></div></div></div></div><div class="layui-form-item"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩重心到倾覆点的垂直距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="VDCD" class="layui-input" readonly="readonly" /></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">后缘裂隙上端到未贯通段下端的垂直距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="SCP_H" class="layui-input" readonly="readonly" /></div></div></div></div></div></div><div class="layui-form-item"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><!--<label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">后缘裂隙未贯通段下端到倾覆点之间的水平距离(m)</label>--><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:300px;">下部软弱层岩体潜在剪切段破裂面正应力(kPa)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="SCP_HD" class="layui-input" readonly="readonly" /></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩体重心到潜在破坏面的水平距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="SCP_AO" class="layui-input" readonly="readonly" /></div></div></div></div></div></div><div class="layui-form-item"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩体重心到过潜在破坏面形心的铅垂距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="SCP_BO" class="layui-input" readonly="readonly" /></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩单体重心距离底部旋转点的水平距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="HDCR" class="layui-input" readonly="readonly" /></div></div></div></div></div></div><div class="layui-form-item"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩单体重心距离底部旋转点的垂直距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="VDCR" class="layui-input" readonly="readonly" /></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">岩石抗剪强度(kPa)</label><!--<label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩单体下部岩体的抗压强度(kPa)</label>--><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="SCP_Ba" class="layui-input" readonly="readonly" /></div></div></div></div></div></div><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:200px;">岩体单轴抗压强度(kPa)</label><div class="layui-input-block" style="margin-left:210px;"><input type="text" name="Rt" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:200px;">危岩体与基座接触面倾角(°)</label><div class="layui-input-block" style="margin-left:210px;"><input type="text" name="IAI" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:300px;">危岩单体重心到后缘裂缝底部的水平距离(m)</label><div class="layui-input-block" style="margin-left:310px;"><input type="text" name="SCP_e" class="layui-input" readonly="readonly" /></div></div></div></div></form>';
            }
            else if (disaster.zhtlx === "滑坡") {
                document.getElementById("disasterpropertyview").innerHTML = '';
                document.getElementById("disasterenvironmentview").innerHTML = '';
                document.getElementById("disasterfeatureview").innerHTML = '';
                document.getElementById("disasterdangerview").innerHTML = '';
                document.getElementById("disasterharmview").innerHTML = '';
                document.getElementById("disasterforecastview").innerHTML = '';
            }
            else if (disaster.zhtlx === "泥石流") {
                document.getElementById("disasterpropertyview").innerHTML = '';
                document.getElementById("disasterenvironmentview").innerHTML = '';
                document.getElementById("disasterfeatureview").innerHTML = '';
                document.getElementById("disasterdangerview").innerHTML = '';
                document.getElementById("disasterharmview").innerHTML = '';
                document.getElementById("disasterforecastview").innerHTML = '';
            }
            else if (disaster.zhtlx === "地面塌陷") {
                document.getElementById("disasterpropertyview").innerHTML = '';
                document.getElementById("disasterenvironmentview").innerHTML = '';
                document.getElementById("disasterfeatureview").innerHTML = '';
                document.getElementById("disasterdangerview").innerHTML = '';
                document.getElementById("disasterharmview").innerHTML = '';
                document.getElementById("disasterforecastview").innerHTML = '';
            }
            else if (disaster.zhtlx === "地裂缝") {
                document.getElementById("disasterpropertyview").innerHTML = '';
                document.getElementById("disasterenvironmentview").innerHTML = '';
                document.getElementById("disasterfeatureview").innerHTML = '';
                document.getElementById("disasterdangerview").innerHTML = '';
                document.getElementById("disasterharmview").innerHTML = '';
                document.getElementById("disasterforecastview").innerHTML = '';
            }
            else if (disaster.zhtlx === "地面沉降") {
                document.getElementById("disasterpropertyview").innerHTML = '';
                document.getElementById("disasterenvironmentview").innerHTML = '';
                document.getElementById("disasterfeatureview").innerHTML = '';
                document.getElementById("disasterdangerview").innerHTML = '';
                document.getElementById("disasterharmview").innerHTML = '';
                document.getElementById("disasterforecastview").innerHTML = '';
            }
            else {
                document.getElementById("disasterpropertyview").innerHTML = '';
                document.getElementById("disasterenvironmentview").innerHTML = '';
                document.getElementById("disasterfeatureview").innerHTML = '';
                document.getElementById("disasterdangerview").innerHTML = '';
                document.getElementById("disasterharmview").innerHTML = '';
                document.getElementById("disasterforecastview").innerHTML = '';
            }

            //请求灾害体属性及预警模型参数
            $.ajax({
                url: servicesurl + "/api/Disaster/GetDisasterProperty", type: "get", data: { "id": disaster.id, "cookie": document.cookie },
                success: function (result) {
                    if (result === "") {
                        layer.msg("无灾害体属性信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                        if (disaster.zhtlx === "危岩崩塌") {
                            form.val("rockfallpropertyviewform", {
                                "ydxs": ""
                                , "btlx": ""
                                , "kzjgmlx": ""
                                , "hgwdxpj": ""
                                , "hdzt": ""
                                , "btykzfs": ""
                                , "btsj": ""
                                , "zbfx": ""
                                , "btygc": ""
                                , "zdlc": ""
                                , "zdspwy": ""
                                , "btykd": ""
                                , "btyhd": ""
                                , "btymj": ""
                                , "btytj": ""
                                , "yfys": ""
                                , "djtpjhd": ""
                                , "djtmj": ""
                                , "djttj": ""
                                , "gmdj": ""
                                , "stgh": ""
                                , "qdxcd": ""
                                , "zqdj": ""
                                , "xqdj": ""
                                , "swrs": ""
                                , "wxrs": ""
                                , "zjss": ""
                                , "wxcc": ""
                                , "wxdx": ""
                            });
                            form.val("rockfallenvironmentviewform", {
                                "dxdm": ""
                                , "dcyxyxzh": ""
                                , "xpjgdzgz": ""
                                , "swdztj": ""
                                , "zbtdly": ""
                                , "rlgchd": ""
                            });
                            form.val("rockfallfeatureviewform", {
                                "btyq": ""
                                , "btdjt": ""
                                , "btljq": ""
                            });
                            form.val("rockfalldangerviewform", {
                                "wxxfx": ""
                            });
                            form.val("rockfallharmviewform", {
                                "whfx": ""
                            });
                            form.val("rockfallforecastviewform", {
                                "CType1": ""
                                , "CType2": ""
                                , "Alt_up": ""
                                , "Alt_down": ""
                                , "Rock_vol": ""
                                , "Frame_H": ""
                                , "Frame_W": ""
                                , "Frame_Th": ""
                                , "Rock_char": ""
                                , "Coll_Dir": ""
                                , "OcofRS": ""
                                , "UW": ""
                                , "SA": ""
                                , "OW": ""
                                , "IASS": ""
                                , "LSS": ""
                                , "FASS": ""
                                , "CSS": ""
                                , "PRR": ""
                                , "EMR": ""
                                , "IAPC": ""
                                , "SCP_Mk": ""
                                , "VDPC": ""
                                , "MRC": ""
                                , "SCP_C": ""
                                , "SCP_FA": ""
                                , "FLk": ""
                                , "SCP_DS": ""
                                , "HDPC": ""
                                , "HDCD": ""
                                , "VDCD": ""
                                , "SCP_H": ""
                                , "SCP_HD": ""
                                , "SCP_AO": ""
                                , "SCP_BO": ""
                                , "HDCR": ""
                                , "VDCR": ""
                                , "SCP_Ba": ""
                                , "IAI": ""
                                , "SCP_e": ""
                                , "Rt": ""
                            });
                        }
                        else if (disaster.zhtlx === "滑坡") {
                        }
                        else if (disaster.zhtlx === "泥石流") {
                        }
                        else if (disaster.zhtlx === "地面塌陷") {
                        }
                        else if (disaster.zhtlx === "地裂缝") {
                        }
                        else if (disaster.zhtlx === "地面沉降") {
                        }
                        else {
                        }
                    }
                    else {
                        var disasterproperty = JSON.parse(result);

                        if (disaster.zhtlx === "危岩崩塌") {
                            form.val("rockfallpropertyviewform", {
                                "ydxs": disasterproperty.RockfallProperty.YDXS
                                , "btlx": disasterproperty.RockfallProperty.BTLX
                                , "kzjgmlx": disasterproperty.RockfallProperty.KZJGMLX
                                , "hgwdxpj": disasterproperty.RockfallProperty.HGWDXPJ
                                , "hdzt": disasterproperty.RockfallProperty.HDZT
                                , "btykzfs": disasterproperty.RockfallProperty.BTYKZFS
                                , "btsj": disasterproperty.RockfallProperty.BTSJ
                                , "zbfx": disasterproperty.RockfallProperty.ZBFX
                                , "btygc": disasterproperty.RockfallProperty.BTYGC
                                , "zdlc": disasterproperty.RockfallProperty.ZDLC
                                , "zdspwy": disasterproperty.RockfallProperty.ZDSPWY
                                , "btykd": disasterproperty.RockfallProperty.BTYKD
                                , "btyhd": disasterproperty.RockfallProperty.BTYHD
                                , "btymj": disasterproperty.RockfallProperty.BTYMJ
                                , "btytj": disasterproperty.RockfallProperty.BTYTJ
                                , "yfys": disasterproperty.RockfallProperty.YFYS
                                , "djtpjhd": disasterproperty.RockfallProperty.DJTPJHD
                                , "djtmj": disasterproperty.RockfallProperty.DJTMJ
                                , "djttj": disasterproperty.RockfallProperty.DJTTJ
                                , "gmdj": disasterproperty.RockfallProperty.GMDJ
                                , "stgh": disasterproperty.RockfallProperty.STGH
                                , "qdxcd": disasterproperty.RockfallProperty.QDXCD
                                , "zqdj": disasterproperty.RockfallProperty.ZQDJ
                                , "xqdj": disasterproperty.RockfallProperty.XQDJ
                                , "swrs": disasterproperty.RockfallProperty.SWRS
                                , "wxrs": disasterproperty.RockfallProperty.WXRS
                                , "zjss": disasterproperty.RockfallProperty.ZJSS
                                , "wxcc": disasterproperty.RockfallProperty.WXCC
                                , "wxdx": disasterproperty.RockfallProperty.WXDX
                            });
                            form.val("rockfallenvironmentviewform", {
                                "dxdm": disasterproperty.RockfallProperty.DXDM
                                , "dcyxyxzh": disasterproperty.RockfallProperty.DCYXYXZH
                                , "xpjgdzgz": disasterproperty.RockfallProperty.XPJGDZGZ
                                , "swdztj": disasterproperty.RockfallProperty.SWDZTJ
                                , "zbtdly": disasterproperty.RockfallProperty.ZBTDLY
                                , "rlgchd": disasterproperty.RockfallProperty.RLGCHD
                            });
                            form.val("rockfallfeatureviewform", {
                                "btyq": disasterproperty.RockfallProperty.BTYQ
                                , "btdjt": disasterproperty.RockfallProperty.BTDJT
                                , "btljq": disasterproperty.RockfallProperty.BTLJQ
                            });
                            form.val("rockfalldangerviewform", {
                                "wxxfx": disasterproperty.RockfallProperty.WXXFX
                            });
                            form.val("rockfallharmviewform", {
                                "whfx": disasterproperty.RockfallProperty.WHFX
                            });
                            if (disasterproperty.RockfallWarning != null) {
                                form.val("rockfallforecastviewform", {
                                    "CType1": disasterproperty.RockfallWarning.CType1
                                    , "CType2": disasterproperty.RockfallWarning.CType2
                                    , "Alt_up": disasterproperty.RockfallWarning.Alt_up
                                    , "Alt_down": disasterproperty.RockfallWarning.Alt_down
                                    , "Rock_vol": disasterproperty.RockfallWarning.Rock_vol
                                    , "Frame_H": disasterproperty.RockfallWarning.Frame_H
                                    , "Frame_W": disasterproperty.RockfallWarning.Frame_W
                                    , "Frame_Th": disasterproperty.RockfallWarning.Frame_Th
                                    , "Rock_char": disasterproperty.RockfallWarning.Rock_char
                                    , "Coll_Dir": disasterproperty.RockfallWarning.Coll_Dir
                                    , "OcofRS": disasterproperty.RockfallWarning.OcofRS
                                    , "UW": disasterproperty.RockfallWarning.UW
                                    , "SA": disasterproperty.RockfallWarning.SA
                                    , "OW": disasterproperty.RockfallWarning.OW
                                    , "IASS": disasterproperty.RockfallWarning.IASS
                                    , "LSS": disasterproperty.RockfallWarning.LSS
                                    , "FASS": disasterproperty.RockfallWarning.FASS
                                    , "CSS": disasterproperty.RockfallWarning.CSS
                                    , "PRR": disasterproperty.RockfallWarning.PRR
                                    , "EMR": disasterproperty.RockfallWarning.EMR
                                    , "IAPC": disasterproperty.RockfallWarning.IAPC
                                    , "SCP_Mk": disasterproperty.RockfallWarning.SCP_Mk
                                    , "VDPC": disasterproperty.RockfallWarning.VDPC
                                    , "MRC": disasterproperty.RockfallWarning.MRC
                                    , "SCP_C": disasterproperty.RockfallWarning.SCP_C
                                    , "SCP_FA": disasterproperty.RockfallWarning.SCP_FA
                                    , "FLk": disasterproperty.RockfallWarning.FLk
                                    , "SCP_DS": disasterproperty.RockfallWarning.SCP_DS
                                    , "HDPC": disasterproperty.RockfallWarning.HDPC
                                    , "HDCD": disasterproperty.RockfallWarning.HDCD
                                    , "VDCD": disasterproperty.RockfallWarning.VDCD
                                    , "SCP_H": disasterproperty.RockfallWarning.SCP_H
                                    , "SCP_HD": disasterproperty.RockfallWarning.SCP_HD
                                    , "SCP_AO": disasterproperty.RockfallWarning.SCP_AO
                                    , "SCP_BO": disasterproperty.RockfallWarning.SCP_BO
                                    , "HDCR": disasterproperty.RockfallWarning.HDCR
                                    , "VDCR": disasterproperty.RockfallWarning.VDCR
                                    , "SCP_Ba": disasterproperty.RockfallWarning.SCP_Ba
                                    , "IAI": disasterproperty.RockfallWarning.IAI
                                    , "SCP_e": disasterproperty.RockfallWarning.SCP_e
                                    , "Rt": disasterproperty.RockfallWarning.Rt
                                });
                            }
                        }
                        else if (disaster.zhtlx === "滑坡") {
                        }
                        else if (disaster.zhtlx === "泥石流") {
                        }
                        else if (disaster.zhtlx === "地面塌陷") {
                        }
                        else if (disaster.zhtlx === "地裂缝") {
                        }
                        else if (disaster.zhtlx === "地面沉降") {
                        }
                        else {
                        }
                    }

                }, datatype: "json"
            });
        }
    });

};