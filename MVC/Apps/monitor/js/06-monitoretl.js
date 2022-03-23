//ETL widget
function LoadETLLayer() {
    if (automonitoreltlayerindex == null) {
        automonitoreltlayerindex = layer.open({
            type: 1
            , title: ['ETL 管理', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
            , area: ['1000px', '620px']
            , shade: 0
            , offset: 'auto'
            , closeBtn: 1
            , maxmin: true
            , moveOut: true
            , content: '<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBriefitem" style="margin:0px;width:100%;height:100%;"><ul class="layui-tab-title"><li class="layui-this" style="width:15%;">监测设备</li><li style="width:15%;">监测数据库</li><li style="width:15%;">SQL</li><li style="width:15%;">设备厂家</li><li style="width:15%;">设备经销商</li></ul><div class="layui-tab-content" style="margin:0px 0px;padding:0px;"><div class="layui-tab-item layui-show"><!--监测设备--><div class="layui-fluid" style="padding: 0px;"><div class="layui-card"><div class="layui-card-body" style="position:relative;padding:5px;"><div style="position:absolute;top:12px;left:10px;z-index:99999"><button id="adddevice" class="layui-btn layui-btn-primary layui-border-green" data-type="add">添加监测设备</button></div><table id="LAY-device-manage" lay-filter="LAY-device-manage"></table><script type="text/html" id="table-toolbar-device"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="deviceview"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="deviceedit"><i class="layui-icon layui-icon-edit" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="devicedel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div></div></div><div class="layui-tab-item"><!--监测数据库--><div class="layui-fluid" style="padding: 0px;"><div class="layui-card"><div class="layui-card-body" style="position:relative;padding:5px;"><div style="position:absolute;top:12px;left:10px;z-index:99999"><button id="adddatabase" class="layui-btn layui-btn-primary layui-border-green" data-type="add">添加监测数据库</button></div><table id="LAY-database-manage" lay-filter="LAY-database-manage"></table><script type="text/html" id="table-toolbar-database"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="databaseedit"><i class="layui-icon layui-icon-edit" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="databasedel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div></div></div><div class="layui-tab-item"><!--ETL SQL--><div class="layui-fluid" style="padding: 0px;"><div class="layui-card"><div class="layui-card-body" style="position:relative;padding:5px;"><div style="position:absolute;top:12px;left:10px;z-index:99999"><button id="addsql" class="layui-btn layui-btn-primary layui-border-green" data-type="add">添加SQL</button></div><table id="LAY-sql-manage" lay-filter="LAY-sql-manage"></table><script type="text/html" id="table-toolbar-sql"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="sqledit"><i class="layui-icon layui-icon-edit" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="sqldel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div></div></div><div class="layui-tab-item"><!--设备厂家--><div class="layui-fluid" style="padding: 0px;"><div class="layui-card"><div class="layui-card-body" style="position:relative;padding:5px;"><div style="position:absolute;top:12px;left:10px;z-index:99999"><button id="addfactory" class="layui-btn layui-btn-primary layui-border-green" data-type="add">添加设备厂家</button></div><table id="LAY-factory-manage" lay-filter="LAY-factory-manage"></table><script type="text/html" id="table-toolbar-factory"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="factoryedit"><i class="layui-icon layui-icon-edit" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="factorydel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div></div></div><div class="layui-tab-item"><!--设备经销商--><div class="layui-fluid" style="padding: 0px;"><div class="layui-card"><div class="layui-card-body" style="position:relative;padding:5px;"><div style="position:absolute;top:12px;left:10px;z-index:99999"><button id="addsale" class="layui-btn layui-btn-primary layui-border-green" data-type="add">添加设备经销商</button></div><table id="LAY-sale-manage" lay-filter="LAY-sale-manage"></table><script type="text/html" id="table-toolbar-sale"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="saleedit"><i class="layui-icon layui-icon-edit" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="saledel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div></div></div></div></div>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);


                GetDeviceData();//监测设备
                GetDataBase();//监测数据库
                GetSqlData();//SQL
                GetFactoryData();//设备厂家
                GetSaleData();//设备供销商
            }
            , end: function () {
                automonitoreltlayerindex = null;
            }
        });
    }
    else {
        ayer.setTop(automonitoreltlayerindex);//置顶
    }
}


//监测设备
function GetDeviceData() {
    var devicedatas = [];
    var adddevicelayerindex = null;

    var devicetypes = [];//设备类型
    var powertypes = [];//供电类型
    var userinfos = [];//监测用户
    var cjinfos = [];//设备厂家
    var jxsinfos = [];//设备经销商
    var dbinfos = [];//监测数据库
    var readsqlinfos = [];//读取SQL
    var writesqlinfos = [];//写入SQL

    $.ajax({
        url: window.parent.servicesurl + "/api/Parameter/GetDeviceType", type: "get",
        success: function (data) {
            var devicetypedata = JSON.parse(data);
            for (var i in devicetypedata) {
                var devicetype = new Object;
                devicetype.name = devicetypedata[i][0];
                devicetype.value = devicetypedata[i][1];
                devicetypes.push(devicetype);
            }
        }, datatype: "json"
    });
    $.ajax({
        url: window.parent.servicesurl + "/api/Parameter/GetPowerType", type: "get",
        success: function (data) {
            var powertypedata = JSON.parse(data);
            for (var i in powertypedata) {
                var powertype = new Object;
                powertype.name = powertypedata[i][0];
                powertype.value = powertypedata[i][1];
                powertypes.push(powertype);
            }
        }, datatype: "json"
    });
    $.ajax({
        url: window.parent.servicesurl + "/api/User/GetMonitorUserInfo", type: "get",
        success: function (data) {
            var userdata = JSON.parse(data);
            for (var i in userdata) {
                var userinfo = new Object;
                userinfo.value = userdata[i].Id;
                userinfo.name = userdata[i].UserName;
                userinfos.push(userinfo);
            }
        }, datatype: "json"
    });
    $.ajax({
        url: window.parent.servicesurl + "/api/Factory/GetFactoryInfo", type: "get",
        success: function (data) {
            var factoryinfos = JSON.parse(data);
            for (var i in factoryinfos) {
                var cjinfo = new Object;
                cjinfo.value = factoryinfos[i].Id;
                cjinfo.name = factoryinfos[i].CJMC;
                cjinfos.push(cjinfo);
            }
        }, datatype: "json"
    });
    $.ajax({
        url: window.parent.servicesurl + "/api/Sale/GetSaleInfo", type: "get",
        success: function (data) {
            var saleinfos = JSON.parse(data);
            for (var i in saleinfos) {
                var jxsinfo = new Object;
                jxsinfo.value = saleinfos[i].Id;
                jxsinfo.name = saleinfos[i].JXSMC;
                jxsinfos.push(jxsinfo);
            }
        }, datatype: "json"
    });
    $.ajax({
        url: window.parent.servicesurl + "/api/Database/GetDatabaseInfo", type: "get",
        success: function (data) {
            var databaseinfos = JSON.parse(data);
            for (var i in databaseinfos) {
                var dbinfo = new Object;
                dbinfo.value = databaseinfos[i].Id;
                dbinfo.name = databaseinfos[i].BZ;
                dbinfos.push(dbinfo);
            }
        }, datatype: "json"
    });
    $.ajax({
        url: window.parent.servicesurl + "/api/SQL/GetReadSQLInfo", type: "get",
        success: function (data) {
            var sqlinfodata = JSON.parse(data);
            for (var i in sqlinfodata) {
                var readsqlinfo = new Object;
                readsqlinfo.value = sqlinfodata[i].Id;
                readsqlinfo.name = sqlinfodata[i].BZ;
                readsqlinfos.push(readsqlinfo);
            }
        }, datatype: "json"
    });
    $.ajax({
        url: window.parent.servicesurl + "/api/SQL/GetWriteSQLInfo", type: "get",
        success: function (data) {
            var sqlinfodata = JSON.parse(data);
            for (var i in sqlinfodata) {
                var writesqlinfo = new Object;
                writesqlinfo.value = sqlinfodata[i].Id;
                writesqlinfo.name = sqlinfodata[i].BZ;
                writesqlinfos.push(writesqlinfo);
            }
        }, datatype: "json"
    });

    GetDeviceInfo();

    var devicetable = table.render({
        elem: '#LAY-device-manage'
        , id: 'devicetableid'
        , title: '自动化监测设备信息'
        , page: true
        , even: true
        , limit: 10
        , initSort: { field: 'id', type: 'asc' }
        , toolbar: true
        , totalRow: false
        , cols: [[
            { field: 'id', title: 'ID', width: 52, fixed: 'left', align: "center" }
            , { field: 'code', title: '唯一编码', width: 130, align: "center" }
            , { field: 'sbmc', title: '设备名称', width: 150, align: "center" }
            , { field: 'sbbh', title: '设备编号', width: 100, align: "center" }
            , { field: 'sbxh', title: '设备型号', width: 100, align: "center" }
            , { field: 'sblx', title: '设备类型', width: 100, align: "center" }
            , { field: 'gdfs', title: '供电方式', width: 80, align: "center" }
            , { field: 'cjsj', title: '创建时间', width: 150, align: "center" }
            , { field: 'bsm', title: '标识码', width: 280, hide: 'false', align: "center" }
            , { field: 'bz', title: '备注', width: 100, hide: 'false', align: "center" }
            , { fixed: 'right', width: 120, align: 'center', toolbar: '#table-toolbar-device' }
        ]]
        , data: devicedatas
    });

    table.on('tool(LAY-device-manage)', function (obj) {
        var layEvent = obj.event;

        if (layEvent === 'deviceview') {
            adddevicelayerindex = layer.open({
                type: 1
                , title: ['设备详情', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['650px', '500px']
                , shade: [0.5, '#393D49']
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: false
                , content: '<form class="layui-form" style="margin-top:10px" lay-filter="adddeviceform"><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief"><!--标签--><ul class="layui-tab-title"><li class="layui-this" style="width:100px">设备信息</li><li style="width:100px">设备厂家</li><li style="width:100px">设备经销商</li><li style="width:100px">监测数据库</li><li style="width:100px">ETL SQL</li></ul><!--内容--><div class="layui-tab-content"><!--设备信息--><div class="layui-tab-item layui-show"><div class="layui-form-item"><label class="layui-form-label">唯一编码</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="code" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label">设备名称</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="sbmc" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label">设备编号</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="sbbh" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label">设备型号</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="sbxh" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label">设备类型</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="sblx" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label">供电方式</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="gdfs" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label">所属用户</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="bsm" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label">备&emsp;&emsp;注</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="bz" class="layui-input" readonly="readonly" /></div></div></div><!--设备厂家--><div class="layui-tab-item"><div class="layui-form-item"><label class="layui-form-label">厂家名称</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="cjmc" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label">厂家简称</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="cjjc" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label">厂家编码</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="cjbm" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item layui-form-text"><label class="layui-form-label">备&emsp;&emsp;注</label><div class="layui-input-block" style="padding-right:10px"><textarea name="cjbz" class="layui-textarea" readonly="readonly" style="height:250px"></textarea></div></div></div><!--设备经销商--><div class="layui-tab-item"><div class="layui-form-item"><label class="layui-form-label">经销商名称</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="jxsmc" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label">经销商简称</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="jxsjc" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label">经销商编码</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="jxsbm" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item layui-form-text"><label class="layui-form-label">备&emsp;&emsp;&emsp;注</label><div class="layui-input-block" style="padding-right:10px"><textarea name="jxsbz" class="layui-textarea" readonly="readonly" style="height:250px"></textarea></div></div></div><!--监测数据库--><div class="layui-tab-item"><div class="layui-form-item"><label class="layui-form-label">数据库类型</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="dblx" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label">IP</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="dbip" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label">端&emsp;&emsp;&emsp;口</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="dbport" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label">数据库名称</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="dbname" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label">账&emsp;&emsp;&emsp;户</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="dbuser" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label">密&emsp;&emsp;&emsp;码</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="dbpw" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label">数据库地址</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="dbadd" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label">备&emsp;&emsp;&emsp;注</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="dbbz" class="layui-input" readonly="readonly" /></div></div></div><!--ETL SQL--><div class="layui-tab-item"><div class="layui-form-item layui-form-text"><label class="layui-form-label">读取SQL</label><div class="layui-input-block" style="padding-right:10px"><textarea name="readsql" class="layui-textarea" readonly="readonly" style="height:145px"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label">读取备注</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="readbz" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item layui-form-text"><label class="layui-form-label">写入SQL</label><div class="layui-input-block" style="padding-right:10px"><textarea name="writesql" class="layui-textarea" readonly="readonly" style="height:145px"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label">写入备注</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="writebz" class="layui-input" readonly="readonly" /></div></div></div></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    form.val("adddeviceform", {
                        "code": obj.data.code
                        , "sbmc": obj.data.sbmc
                        , "sbbh": obj.data.sbbh
                        , "sbxh": obj.data.sbxh
                        , "sblx": obj.data.sblx
                        , "gdfs": obj.data.gdfs
                        , "bsm": obj.data.bsm
                        , "bz": obj.data.bz
                    });

                    //$.ajax({
                    //    url: window.parent.servicesurl + "/api/Device/GetUserNameBybsm", type: "get", data: { "bsm": obj.data.bsm },
                    //    success: function (result) {
                    //        form.val("adddeviceform", {
                    //            "bsm": result
                    //        });
                    //    }, datatype: "json"
                    //});

                    $.ajax({
                        url: window.parent.servicesurl + "/api/Device/GetFactoryById", type: "get", data: { "id": obj.data.id },
                        success: function (result) {
                            if (result != "") {
                                var factory = JSON.parse(result);
                                if (factory != undefined) {
                                    form.val("adddeviceform", {
                                        "cjmc": factory.CJMC
                                        , "cjjc": factory.CJJC
                                        , "cjbm": factory.CJBM
                                        , "cjbz": factory.BZ
                                    });
                                }
                            }
                        }, datatype: "json"
                    });

                    $.ajax({
                        url: window.parent.servicesurl + "/api/Device/GetSaleById", type: "get", data: { "id": obj.data.id },
                        success: function (result) {
                            if (result != "") {
                                var sale = JSON.parse(result);
                                if (sale != undefined) {
                                    form.val("adddeviceform", {
                                        "jxsmc": sale.JXSMC
                                        , "jxsjc": sale.JXSJC
                                        , "jxsbm": sale.JXSBM
                                        , "jxsbz": sale.BZ
                                    });
                                }
                            }
                        }, datatype: "json"
                    });

                    $.ajax({
                        url: window.parent.servicesurl + "/api/Device/GetDatabasebyId", type: "get", data: { "id": obj.data.id },
                        success: function (result) {
                            if (result != "") {
                                var db = JSON.parse(result);
                                if (db != undefined) {
                                    form.val("adddeviceform", {
                                        "dblx": db.DBLX
                                        , "dbip": db.DBIP
                                        , "dbport": db.DBPORT
                                        , "dbname": db.DBNAME
                                        , "dbuser": db.DBUSER
                                        , "dbpw": db.DBPW
                                        , "dbadd": db.DBADD
                                        , "dbbz": db.BZ
                                    });
                                }
                            }
                        }, datatype: "json"
                    });

                    $.ajax({
                        url: window.parent.servicesurl + "/api/Device/GetReadSQLbyId", type: "get", data: { "id": obj.data.id },
                        success: function (result) {
                            if (result != "") {
                                var sql = JSON.parse(result);
                                if (sql != undefined) {
                                    form.val("adddeviceform", {
                                        "readsql": sql.Sql
                                        , "readbz": sql.BZ
                                    });
                                }
                            }
                        }, datatype: "json"
                    });


                    $.ajax({
                        url: window.parent.servicesurl + "/api/Device/GetWriteSQLbyId", type: "get", data: { "id": obj.data.id },
                        success: function (result) {
                            if (result != "") {
                                var sql = JSON.parse(result);
                                if (sql != undefined) {
                                    form.val("adddeviceform", {
                                        "writesql": sql.Sql
                                        , "writebz": sql.BZ
                                    });
                                }
                            }
                        }, datatype: "json"
                    });
                }
                , end: function () { }
            });

        } else if (layEvent === 'deviceedit') {
            adddevicelayerindex = layer.open({
                type: 1
                , title: ['编辑设备信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['800px', '550px']
                , shade: [0.5, '#393D49']
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: false
                , content: '<form class="layui-form" style="margin-top:10px" lay-filter="adddeviceform"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo grid-demo-bg1"> <div class="layui-form-item"><label class="layui-form-label">唯一编码</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="code" autocomplete="off" placeholder="请输入" class="layui-input" lay-verify="required" /></div> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <div class="layui-form-item"><label class="layui-form-label">设备名称</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="sbmc" autocomplete="off" placeholder="请输入" class="layui-input" /></div> </div> </div> </div> </div> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo grid-demo-bg1"> <div class="layui-form-item"><label class="layui-form-label">设备编号</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="sbbh" autocomplete="off" placeholder="请输入" class="layui-input" lay-verify="required" /></div> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <div class="layui-form-item"><label class="layui-form-label">设备型号</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="sbxh" autocomplete="off" placeholder="请输入" class="layui-input" /></div> </div> </div> </div> </div> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo grid-demo-bg1"> <div class="layui-form-item"><label class="layui-form-label">设备类型</label> <div class="layui-input-block" style="padding-right:10px"><select id="sblxid" name="sblx" lay-filter="sblxselect" lay-verify="required"><option value="">请选择</option></select></div> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <div class="layui-form-item"><label class="layui-form-label">供电方式</label> <div class="layui-input-block" style="padding-right:10px"><select id="gdfsid" name="gdfs" lay-filter="gdfsselect" lay-verify="required"><option value="">请选择</option></select></div> </div> </div> </div> </div> <div class="layui-form-item"><label class="layui-form-label">备&emsp;&emsp;注</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="bz" autocomplete="off" placeholder="请输入" class="layui-input" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">设备厂家</label> <div class="layui-input-block" style="padding-right:10px;"><select id="cjid" name="cj" lay-filter="cjselect"><option value="">请选择</option></select></div> </div> <div class="layui-form-item"><label class="layui-form-label">设备经销商</label> <div class="layui-input-block" style="padding-right:10px;"><select id="jxsid" name="jxs" lay-filter="jxsselect"><option value="">请选择</option></select></div> </div> <div class="layui-form-item"><label class="layui-form-label">监测数据库</label> <div class="layui-input-block" style="padding-right:10px;"><select id="dbid" name="db" lay-filter="dbselect"><option value="">请选择</option></select></div> </div> <div class="layui-form-item"><label class="layui-form-label">读取SQL</label> <div class="layui-input-block" style="padding-right:10px;"><select id="readsqlid" name="readsql" lay-filter="readsqlselect"><option value="">请选择</option></select></div> </div> <div class="layui-form-item"><label class="layui-form-label">写入SQL</label> <div class="layui-input-block" style="padding-right:10px;"><select id="writesqlid" name="writesql" lay-filter="writesqlselect"><option value="">请选择</option></select></div> </div> <div class="layui-form-item" style="margin-top:30px"> <div style="text-align: center;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="adddevicesubmit" style="width:80px;">提交</button><button type="reset" class="layui-btn layui-btn-primary" style="width:80px">重置</button></div> </div> </form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    form.val("adddeviceform", {
                        "code": obj.data.code
                        , "sbmc": obj.data.sbmc
                        , "sbbh": obj.data.sbbh
                        , "sbxh": obj.data.sbxh
                        , "bz": obj.data.bz
                    });

                    if (devicetypes.length > 0) {
                        for (var i in devicetypes) {
                            if (devicetypes[i].name == obj.data.sblx) {
                                document.getElementById("sblxid").innerHTML += '<option value="' + devicetypes[i].value + '" selected>' + devicetypes[i].name + '</option>';
                            }
                            else {
                                document.getElementById("sblxid").innerHTML += '<option value="' + devicetypes[i].value + '">' + devicetypes[i].name + '</option>';
                            }
                        }
                    }

                    if (powertypes.length > 0) {
                        for (var i in powertypes) {
                            if (powertypes[i].name == obj.data.gdfs) {
                                document.getElementById("gdfsid").innerHTML += '<option value="' + powertypes[i].value + '" selected>' + powertypes[i].name + '</option>';
                            }
                            else {
                                document.getElementById("gdfsid").innerHTML += '<option value="' + powertypes[i].value + '">' + powertypes[i].name + '</option>';
                            }
                        }
                    }

                    //$.ajax({
                    //    url: window.parent.servicesurl + "/api/Device/GetUserNameBybsm", type: "get", data: { "bsm": obj.data.bsm },
                    //    success: function (result) {
                    //        if (result != "") {
                    //            if (userinfos.length > 0) {
                    //                for (var i in userinfos) {
                    //                    if (userinfos[i].name == result) {
                    //                        document.getElementById("bsmid").innerHTML += '<option value="' + userinfos[i].value + '" selected>' + userinfos[i].name + '</option>';
                    //                    }
                    //                    else {
                    //                        document.getElementById("bsmid").innerHTML += '<option value="' + userinfos[i].value + '">' + userinfos[i].name + '</option>';
                    //                    }
                    //                }
                    //            }
                    //        }
                    //        else {
                    //            if (userinfos.length > 0) {
                    //                for (var i in userinfos) {
                    //                    document.getElementById("bsmid").innerHTML += '<option value="' + userinfos[i].value + '">' + userinfos[i].name + '</option>';
                    //                }
                    //            }
                    //        }

                    //        form.render();
                    //        form.render('select');
                    //    }, datatype: "json"
                    //});

                    $.ajax({
                        url: window.parent.servicesurl + "/api/Device/GetFactoryById", type: "get", data: { "id": obj.data.id },
                        success: function (result) {
                            if (result != "") {
                                var factory = JSON.parse(result);
                                if (factory != undefined) {
                                    if (cjinfos.length > 0) {
                                        for (var i in cjinfos) {
                                            if (cjinfos[i].name == factory.CJMC) {
                                                document.getElementById("cjid").innerHTML += '<option value="' + cjinfos[i].value + '" selected>' + cjinfos[i].name + '</option>';
                                            }
                                            else {
                                                document.getElementById("cjid").innerHTML += '<option value="' + cjinfos[i].value + '">' + cjinfos[i].name + '</option>';
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (cjinfos.length > 0) {
                                    for (var i in cjinfos) {
                                        document.getElementById("cjid").innerHTML += '<option value="' + cjinfos[i].value + '">' + cjinfos[i].name + '</option>';
                                    }
                                }
                            }

                            form.render();
                            form.render('select');
                        }, datatype: "json"
                    });

                    $.ajax({
                        url: window.parent.servicesurl + "/api/Device/GetSaleById", type: "get", data: { "id": obj.data.id },
                        success: function (result) {
                            if (result != "") {
                                var sale = JSON.parse(result);
                                if (sale != undefined) {
                                    if (jxsinfos.length > 0) {
                                        for (var i in jxsinfos) {
                                            if (jxsinfos[i].name == sale.JXSMC) {
                                                document.getElementById("jxsid").innerHTML += '<option value="' + jxsinfos[i].value + '" selected>' + jxsinfos[i].name + '</option>';
                                            }
                                            else {
                                                document.getElementById("jxsid").innerHTML += '<option value="' + jxsinfos[i].value + '">' + jxsinfos[i].name + '</option>';
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (jxsinfos.length > 0) {
                                    for (var i in jxsinfos) {
                                        document.getElementById("jxsid").innerHTML += '<option value="' + jxsinfos[i].value + '">' + jxsinfos[i].name + '</option>';
                                    }
                                }
                            }

                            form.render();
                            form.render('select');
                        }, datatype: "json"
                    });

                    $.ajax({
                        url: window.parent.servicesurl + "/api/Device/GetDatabasebyId", type: "get", data: { "id": obj.data.id },
                        success: function (result) {
                            if (result != "") {
                                var db = JSON.parse(result);
                                if (db != undefined) {
                                    if (dbinfos.length > 0) {
                                        for (var i in dbinfos) {
                                            if (dbinfos[i].name == db.BZ) {
                                                document.getElementById("dbid").innerHTML += '<option value="' + dbinfos[i].value + '" selected>' + dbinfos[i].name + '</option>';
                                            }
                                            else {
                                                document.getElementById("dbid").innerHTML += '<option value="' + dbinfos[i].value + '">' + dbinfos[i].name + '</option>';
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (dbinfos.length > 0) {
                                    for (var i in dbinfos) {
                                        document.getElementById("dbid").innerHTML += '<option value="' + dbinfos[i].value + '">' + dbinfos[i].name + '</option>';
                                    }
                                }
                            }

                            form.render();
                            form.render('select');
                        }, datatype: "json"
                    });

                    $.ajax({
                        url: window.parent.servicesurl + "/api/Device/GetReadSQLbyId", type: "get", data: { "id": obj.data.id },
                        success: function (result) {
                            if (result != "") {
                                var sql = JSON.parse(result);
                                if (sql != undefined) {
                                    if (readsqlinfos.length > 0) {
                                        for (var i in readsqlinfos) {
                                            if (readsqlinfos[i].name == sql.BZ) {
                                                document.getElementById("readsqlid").innerHTML += '<option value="' + readsqlinfos[i].value + '" selected>' + readsqlinfos[i].name + '</option>';
                                            }
                                            else {
                                                document.getElementById("readsqlid").innerHTML += '<option value="' + readsqlinfos[i].value + '">' + readsqlinfos[i].name + '</option>';
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                for (var i in readsqlinfos) {
                                    document.getElementById("readsqlid").innerHTML += '<option value="' + readsqlinfos[i].value + '">' + readsqlinfos[i].name + '</option>';
                                }
                            }

                            form.render();
                            form.render('select');
                        }, datatype: "json"
                    });

                    $.ajax({
                        url: window.parent.servicesurl + "/api/Device/GetWriteSQLbyId", type: "get", data: { "id": obj.data.id },
                        success: function (result) {
                            if (result != "") {
                                var sql = JSON.parse(result);
                                if (sql != undefined) {
                                    if (writesqlinfos.length > 0) {
                                        for (var i in writesqlinfos) {
                                            if (writesqlinfos[i].name == sql.BZ) {
                                                document.getElementById("writesqlid").innerHTML += '<option value="' + writesqlinfos[i].value + '" selected>' + writesqlinfos[i].name + '</option>';
                                            }
                                            else {
                                                document.getElementById("writesqlid").innerHTML += '<option value="' + writesqlinfos[i].value + '">' + writesqlinfos[i].name + '</option>';
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (writesqlinfos.length > 0) {
                                    for (var i in writesqlinfos) {
                                        document.getElementById("writesqlid").innerHTML += '<option value="' + writesqlinfos[i].value + '">' + writesqlinfos[i].name + '</option>';
                                    }
                                }
                            }

                            form.render();
                            form.render('select');
                        }, datatype: "json"
                    });

                    form.render();
                    form.render('select');

                    form.on('submit(adddevicesubmit)', function (data) {
                        data.field.id = obj.data.id;
                        $.ajax({
                            url: window.parent.servicesurl + "/api/Device/UpdateDevice", type: "put", data: data.field,
                            success: function (result) {
                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                GetDeviceInfo();
                            }, datatype: "json"
                        });

                        layer.close(adddevicelayerindex);
                        return false;
                    });
                }
                , end: function () { }
            });

        }
        else if (layEvent === 'devicedel') {
            layer.confirm('是否删除？', function (index) {
                obj.del();
                layer.close(index);
                $.ajax({
                    url: window.parent.servicesurl + "/api/Device/DeleteDevice", type: "delete", data: { "id": obj.data.id },
                    success: function (result) {
                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }, datatype: "json"
                });
            });
        }
    });

    $("#adddevice").on("click", function () {
        adddevicelayerindex = layer.open({
            type: 1
            , title: ['添加自动化监测设备', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['800px', '550px']
            , shade: [0.5, '#393D49']
            , offset: 'auto'
            , closeBtn: 1
            , maxmin: false
            , content: '<form class="layui-form" style="margin-top:10px" lay-filter="adddeviceform"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo grid-demo-bg1"> <div class="layui-form-item"><label class="layui-form-label">唯一编码</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="code" autocomplete="off" placeholder="请输入" class="layui-input" lay-verify="required" /></div> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <div class="layui-form-item"><label class="layui-form-label">设备名称</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="sbmc" autocomplete="off" placeholder="请输入" class="layui-input" /></div> </div> </div> </div> </div> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo grid-demo-bg1"> <div class="layui-form-item"><label class="layui-form-label">设备编号</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="sbbh" autocomplete="off" placeholder="请输入" class="layui-input" lay-verify="required" /></div> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <div class="layui-form-item"><label class="layui-form-label">设备型号</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="sbxh" autocomplete="off" placeholder="请输入" class="layui-input" /></div> </div> </div> </div> </div> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo grid-demo-bg1"> <div class="layui-form-item"><label class="layui-form-label">设备类型</label> <div class="layui-input-block" style="padding-right:10px"><select id="sblxid" name="sblx" lay-filter="sblxselect" lay-verify="required"><option value="">请选择</option></select></div> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <div class="layui-form-item"><label class="layui-form-label">供电方式</label> <div class="layui-input-block" style="padding-right:10px"><select id="gdfsid" name="gdfs" lay-filter="gdfsselect" lay-verify="required"><option value="">请选择</option></select></div> </div> </div> </div> </div> <div class="layui-form-item"><label class="layui-form-label">备&emsp;&emsp;注</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="bz" autocomplete="off" placeholder="请输入" class="layui-input" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">设备厂家</label> <div class="layui-input-block" style="padding-right:10px;"><select id="cjid" name="cj" lay-filter="cjselect"><option value="">请选择</option></select></div> </div> <div class="layui-form-item"><label class="layui-form-label">设备经销商</label> <div class="layui-input-block" style="padding-right:10px;"><select id="jxsid" name="jxs" lay-filter="jxsselect"><option value="">请选择</option></select></div> </div> <div class="layui-form-item"><label class="layui-form-label">监测数据库</label> <div class="layui-input-block" style="padding-right:10px;"><select id="dbid" name="db" lay-filter="dbselect"><option value="">请选择</option></select></div> </div> <div class="layui-form-item"><label class="layui-form-label">读取SQL</label> <div class="layui-input-block" style="padding-right:10px;"><select id="readsqlid" name="readsql" lay-filter="readsqlselect"><option value="">请选择</option></select></div> </div> <div class="layui-form-item"><label class="layui-form-label">写入SQL</label> <div class="layui-input-block" style="padding-right:10px;"><select id="writesqlid" name="writesql" lay-filter="writesqlselect"><option value="">请选择</option></select></div> </div> <div class="layui-form-item" style="margin-top:30px"> <div style="text-align: center;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="adddevicesubmit" style="width:80px;">提交</button><button type="reset" class="layui-btn layui-btn-primary" style="width:80px">重置</button></div> </div> </form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                if (devicetypes.length > 0) {
                    for (var i in devicetypes) {
                        document.getElementById("sblxid").innerHTML += '<option value="' + devicetypes[i].value + '">' + devicetypes[i].name + '</option>';
                    }
                }
                if (powertypes.length > 0) {
                    for (var i in powertypes) {
                        document.getElementById("gdfsid").innerHTML += '<option value="' + powertypes[i].value + '">' + powertypes[i].name + '</option>';
                    }
                }
                if (cjinfos.length > 0) {
                    for (var i in cjinfos) {
                        document.getElementById("cjid").innerHTML += '<option value="' + cjinfos[i].value + '">' + cjinfos[i].name + '</option>';
                    }
                }
                if (jxsinfos.length > 0) {
                    for (var i in jxsinfos) {
                        document.getElementById("jxsid").innerHTML += '<option value="' + jxsinfos[i].value + '">' + jxsinfos[i].name + '</option>';
                    }
                }
                if (dbinfos.length > 0) {
                    for (var i in dbinfos) {
                        document.getElementById("dbid").innerHTML += '<option value="' + dbinfos[i].value + '">' + dbinfos[i].name + '</option>';
                    }
                }
                if (readsqlinfos.length > 0) {
                    for (var i in readsqlinfos) {
                        document.getElementById("readsqlid").innerHTML += '<option value="' + readsqlinfos[i].value + '">' + readsqlinfos[i].name + '</option>';
                    }
                }
                if (writesqlinfos.length > 0) {
                    for (var i in writesqlinfos) {
                        document.getElementById("writesqlid").innerHTML += '<option value="' + writesqlinfos[i].value + '">' + writesqlinfos[i].name + '</option>';
                    }
                }

                form.render();
                form.render('select');

                form.on('submit(adddevicesubmit)', function (data) {
                    $.ajax({
                        url: window.parent.servicesurl + "/api/Device/AddDevice", type: "post", data: data.field,
                        success: function (result) {
                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            GetDeviceInfo();
                        }, datatype: "json"
                    });

                    layer.close(adddevicelayerindex);
                    return false;
                });
            }
            , end: function () { }
        });
    });


    $("#adddevices").on("click", function () {
        adddevicelayerindex = layer.open({
            type: 1
            , title: ['添加自动化监测设备(批量)', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['800px', '600px']
            , shade: [0.5, '#393D49']
            , offset: 'auto'
            , closeBtn: 1
            , maxmin: false
            , content: '<form class="layui-form" style="margin-top:10px" lay-filter="adddevicesform"> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo grid-demo-bg1"> <div class="layui-form-item"><label class="layui-form-label">编码前缀</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="codeprefix" autocomplete="off" placeholder="请输入" class="layui-input" lay-verify="required" /></div> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <div class="layui-form-item"> <div class="layui-inline"><label class="layui-form-label">范&emsp;&emsp;围</label> <div class="layui-input-inline" style="width: 100px;"><input type="number" name="startcode" placeholder="起始序号" autocomplete="off" class="layui-input" lay-verify="required|number" /></div> <div class="layui-form-mid">-</div> <div class="layui-input-inline" style="width: 100px;"><input type="number" name="endcode" placeholder="终止序号" autocomplete="off" class="layui-input" lay-verify="required|number" /></div> </div> </div> </div> </div> </div> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo grid-demo-bg1"> <div class="layui-form-item"><label class="layui-form-label">设备名称</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="sbmc" autocomplete="off" placeholder="请输入" class="layui-input" /></div> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <div class="layui-form-item"><label class="layui-form-label">设备编号</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="sbbh" autocomplete="off" placeholder="请输入" class="layui-input" lay-verify="required" value="后期添加" /></div> </div> </div> </div> </div> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo grid-demo-bg1"> <div class="layui-form-item"><label class="layui-form-label">设备型号</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="sbxh" autocomplete="off" placeholder="请输入" class="layui-input" /></div> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <div class="layui-form-item"><label class="layui-form-label">设备类型</label> <div class="layui-input-block" style="padding-right:10px"><select id="sblxid" name="sblx" lay-filter="sblxselect" lay-verify="required"><option value="">请选择</option></select></div> </div> </div> </div> </div> <div class="layui-row"> <div class="layui-col-md6"> <div class="grid-demo grid-demo-bg1"> <div class="layui-form-item"><label class="layui-form-label">供电方式</label> <div class="layui-input-block" style="padding-right:10px"><select id="gdfsid" name="gdfs" lay-filter="gdfsselect" lay-verify="required"><option value="">请选择</option></select></div> </div> </div> </div> <div class="layui-col-md6"> <div class="grid-demo"> <div class="layui-form-item"></div> </div> </div> </div> <div class="layui-form-item"><label class="layui-form-label">备&emsp;&emsp;注</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="bz" autocomplete="off" placeholder="请输入" class="layui-input" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">设备厂家</label> <div class="layui-input-block" style="padding-right:10px;"><select id="cjid" name="cj" lay-filter="cjselect"><option value="">请选择</option></select></div> </div> <div class="layui-form-item"><label class="layui-form-label">设备经销商</label> <div class="layui-input-block" style="padding-right:10px;"><select id="jxsid" name="jxs" lay-filter="jxsselect"><option value="">请选择</option></select></div> </div> <div class="layui-form-item"><label class="layui-form-label">监测数据库</label> <div class="layui-input-block" style="padding-right:10px;"><select id="dbid" name="db" lay-filter="dbselect"><option value="">请选择</option></select></div> </div> <div class="layui-form-item"><label class="layui-form-label">读取SQL</label> <div class="layui-input-block" style="padding-right:10px;"><select id="readsqlid" name="readsql" lay-filter="readsqlselect"><option value="">请选择</option></select></div> </div> <div class="layui-form-item"><label class="layui-form-label">写入SQL</label> <div class="layui-input-block" style="padding-right:10px;"><select id="writesqlid" name="writesql" lay-filter="writesqlselect"><option value="">请选择</option></select></div> </div> <div class="layui-form-item" style="margin-top:30px"> <div style="text-align:center;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="adddevicesubmit" style="width:80px;">提交</button><button type="reset" class="layui-btn layui-btn-primary" style="width:80px">重置</button></div> </div> </form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                if (devicetypes.length > 0) {
                    for (var i in devicetypes) {
                        document.getElementById("sblxid").innerHTML += '<option value="' + devicetypes[i].value + '">' + devicetypes[i].name + '</option>';
                    }
                }
                if (powertypes.length > 0) {
                    for (var i in powertypes) {
                        document.getElementById("gdfsid").innerHTML += '<option value="' + powertypes[i].value + '">' + powertypes[i].name + '</option>';
                    }
                }
                if (cjinfos.length > 0) {
                    for (var i in cjinfos) {
                        document.getElementById("cjid").innerHTML += '<option value="' + cjinfos[i].value + '">' + cjinfos[i].name + '</option>';
                    }
                }
                if (jxsinfos.length > 0) {
                    for (var i in jxsinfos) {
                        document.getElementById("jxsid").innerHTML += '<option value="' + jxsinfos[i].value + '">' + jxsinfos[i].name + '</option>';
                    }
                }
                if (dbinfos.length > 0) {
                    for (var i in dbinfos) {
                        document.getElementById("dbid").innerHTML += '<option value="' + dbinfos[i].value + '">' + dbinfos[i].name + '</option>';
                    }
                }
                if (readsqlinfos.length > 0) {
                    for (var i in readsqlinfos) {
                        document.getElementById("readsqlid").innerHTML += '<option value="' + readsqlinfos[i].value + '">' + readsqlinfos[i].name + '</option>';
                    }
                }
                if (writesqlinfos.length > 0) {
                    for (var i in writesqlinfos) {
                        document.getElementById("writesqlid").innerHTML += '<option value="' + writesqlinfos[i].value + '">' + writesqlinfos[i].name + '</option>';
                    }
                }

                form.render();
                form.render('select');

                form.on('submit(adddevicesubmit)', function (data) {
                    $.ajax({
                        url: window.parent.servicesurl + "/api/Device/AddDevices", type: "post", data: data.field,
                        success: function (result) {
                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            GetDeviceInfo();
                        }, datatype: "json"
                    });

                    layer.close(adddevicelayerindex);
                    return false;
                });
            }
            , end: function () { }
        });
    });

    function GetDeviceInfo() {
        $.ajax({
            url: window.parent.servicesurl + "/api/Device/GetDeviceInfo", type: "get",
            success: function (data) {
                if (data == "") {
                    layer.msg("无自动化监测设备信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    devicetable.reload({ id: 'devicetableid', data: [] });
                }
                else {
                    var deviceinfos = JSON.parse(data);
                    devicedatas = [];
                    for (var i in deviceinfos) {
                        var devicedata = new Object;
                        devicedata.id = deviceinfos[i].Id;
                        devicedata.code = deviceinfos[i].Code;
                        devicedata.sbmc = deviceinfos[i].SBMC;
                        devicedata.sbbh = deviceinfos[i].SBBH;
                        devicedata.sbxh = deviceinfos[i].SBXH;
                        devicedata.sblx = deviceinfos[i].SBLX;
                        devicedata.gdfs = deviceinfos[i].GDFS;
                        devicedata.cjsj = deviceinfos[i].CJSJ;
                        devicedata.bsm = deviceinfos[i].BSM;
                        devicedata.bz = deviceinfos[i].BZ;

                        devicedatas.push(devicedata);
                    }
                    devicetable.reload({ id: 'devicetableid', data: devicedatas });
                }
            }, datatype: "json"
        });
    }
}
//监测数据库
function GetDataBase() {

    var databasedatas = [];
    var adddatabaselayerindex = null;

    GetDatabaseInfo();

    var databasetable = table.render({
        elem: '#LAY-database-manage'
        , id: 'databasetableid'
        , title: '自动化监测数据库信息'
        , page: true
        , even: true
        , limit: 10
        , initSort: { field: 'id', type: 'asc' }
        , toolbar: true
        , totalRow: false
        , cols: [[
            { field: 'id', title: 'ID', width: 52, fixed: 'left', align: "center" }
            , { field: 'dblx', title: '数据库类型', width: 100, align: "center" }
            , { field: 'dbip', title: 'IP', width: 120, align: "center" }
            , { field: 'dbport', title: '端口', width: 60, align: "center" }
            , { field: 'dbname', title: '数据库名称', width: 120, hide: 'false', align: "center" }
            , { field: 'dbuser', title: '账户', width: 100, align: "center" }
            , { field: 'dbpw', title: '密码', width: 200, align: "center" }
            , { field: 'dbadd', title: '数据库地址', width: 100, hide: 'false', align: "center" }
            , { field: 'dbconn', title: '连接信息', width: 100, hide: 'false', align: "center" }
            , { field: 'cjsj', title: '创建时间', width: 150, hide: 'false', align: "center" }
            , { field: 'bz', title: '备注', width: 100, hide: 'false', align: "center" }
            , { fixed: 'right', width: 100, align: 'center', toolbar: '#table-toolbar-database' }
        ]]
        , data: databasedatas
    });

    table.on('tool(LAY-database-manage)', function (obj) {
        var layEvent = obj.event;

        if (layEvent === 'databaseedit') {
            adddatabaselayerindex = layer.open({
                type: 1
                , title: ['编辑监测数据库信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['400px', '500px']
                , shade: [0.5, '#393D49']
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: false
                , content: '<form class="layui-form" style="margin-top:10px" lay-filter="editdatabaseform"> <div class="layui-form-item"><label class="layui-form-label">数据库类型</label> <div class="layui-input-block" style="padding-right:10px"><select id="dblxid" name="dblx" lay-filter="dbselect"><option value="">请选择</option></select></div> </div> <div class="layui-form-item"><label class="layui-form-label">IP</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" id="dbipid" name="dbip" autocomplete="off" placeholder="请输入" class="layui-input" lay-filter="required" disabled="disabled" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">端口</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" id="dbportid" name="dbport" autocomplete="off" placeholder="请输入" class="layui-input" lay-filter="required|number" disabled="disabled" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">数据库名称</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" id="dbnameid" name="dbname" autocomplete="off" placeholder="请输入" class="layui-input" lay-filter="required" disabled="disabled" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">账户</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" id="dbuserid" name="dbuser" autocomplete="off" placeholder="请输入" class="layui-input" lay-filter="required" disabled="disabled" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">密码</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" id="dbpwid" name="dbpw" autocomplete="off" placeholder="请输入" class="layui-input" lay-filter="required" disabled="disabled" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">数据库地址</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" id="dbaddid" name="dbadd" autocomplete="off" placeholder="请输入" class="layui-input" lay-filter="required" disabled="disabled" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">备注</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="bz" autocomplete="off" placeholder="请输入" class="layui-input" /></div> </div> <div class="layui-form-item" style="margin-top:30px"> <div style="text-align: center;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="editdatabasesubmit" style="width:80px">提交</button><button type="reset" class="layui-btn layui-btn-primary" style="width:80px">重置</button></div> </div> </form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    form.val("editdatabaseform", {
                        "dbip": obj.data.dbip
                        , "dbport": obj.data.dbport
                        , "dbname": obj.data.dbname
                        , "dbuser": obj.data.dbuser
                        , "dbpw": obj.data.dbpw
                        , "dbadd": obj.data.dbadd
                        , "bz": obj.data.bz
                    });

                    if (obj.data.dblx == "SQLite") {
                        document.getElementById("dblxid").innerHTML += '<option value="0">SQLServer</option><option value="1">Oracle</option><option value="2">MySQL</option><option value="3">PostgreSQL</option><option value="4" selected>SQLite</option>';

                        document.getElementById("dbipid").disabled = "disabled";
                        document.getElementById("dbportid").disabled = "disabled";
                        document.getElementById("dbnameid").disabled = "disabled";
                        document.getElementById("dbuserid").disabled = "disabled";
                        document.getElementById("dbpwid").disabled = "disabled";
                        document.getElementById("dbaddid").disabled = "";
                    }
                    else {
                        if (obj.data.dblx == "SQLServer") {
                            document.getElementById("dblxid").innerHTML += '<option value="0" selected>SQLServer</option><option value="1">Oracle</option><option value="2">MySQL</option><option value="3">PostgreSQL</option><option value="4">SQLite</option>';
                        }
                        else if (obj.data.dblx == "Oracle") {
                            document.getElementById("dblxid").innerHTML += '<option value="0">SQLServer</option><option value="1" selected>Oracle</option><option value="2">MySQL</option><option value="3">PostgreSQL</option><option value="4">SQLite</option>';
                        }
                        else if (obj.data.dblx == "MySQL") {
                            document.getElementById("dblxid").innerHTML += '<option value="0">SQLServer</option><option value="1">Oracle</option><option value="2" selected>MySQL</option><option value="3">PostgreSQL</option><option value="4">SQLite</option>';
                        }
                        else if (obj.data.dblx == "PostgreSQL") {
                            document.getElementById("dblxid").innerHTML += '<option value="0">SQLServer</option><option value="1">Oracle</option><option value="2">MySQL</option><option value="3" selected>PostgreSQL</option><option value="4">SQLite</option>';
                        }

                        document.getElementById("dbipid").disabled = "";
                        document.getElementById("dbportid").disabled = "";
                        document.getElementById("dbnameid").disabled = "";
                        document.getElementById("dbuserid").disabled = "";
                        document.getElementById("dbpwid").disabled = "";
                        document.getElementById("dbaddid").disabled = "disabled";
                    }

                    form.on('select(dbselect)', function (data) {
                        if (data.value == 4) {
                            document.getElementById("dbipid").disabled = "disabled";
                            document.getElementById("dbportid").disabled = "disabled";
                            document.getElementById("dbnameid").disabled = "disabled";
                            document.getElementById("dbuserid").disabled = "disabled";
                            document.getElementById("dbpwid").disabled = "disabled";
                            document.getElementById("dbaddid").disabled = "";
                        }
                        else {
                            document.getElementById("dbipid").disabled = "";
                            document.getElementById("dbportid").disabled = "";
                            document.getElementById("dbnameid").disabled = "";
                            document.getElementById("dbuserid").disabled = "";
                            document.getElementById("dbpwid").disabled = "";
                            document.getElementById("dbaddid").disabled = "disabled";

                            if (data.value == 0) {
                                form.val("editdatabaseform", {
                                    "dbport": 1433
                                });
                            }
                            else if (data.value == 1) {
                                form.val("editdatabaseform", {
                                    "dbport": 1521
                                });
                            }
                            else if (data.value == 2) {
                                form.val("editdatabaseform", {
                                    "dbport": 3306
                                });
                            }
                            else if (data.value == 3) {
                                form.val("editdatabaseform", {
                                    "dbport": 5432
                                });
                            }
                        }
                    });

                    form.render();
                    form.render('select');
                    form.render('select', 'dbselect');

                    form.on('submit(editdatabasesubmit)', function (data) {
                        data.field.id = obj.data.id;
                        $.ajax({
                            url: window.parent.servicesurl + "/api/Database/UpdateDatabase", type: "put", data: data.field,
                            success: function (result) {
                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                GetDatabaseInfo();
                            }, datatype: "json"
                        });

                        layer.close(adddatabaselayerindex);
                        return false;
                    });
                }
                , end: function () { }
            });

        } else if (layEvent === 'databasedel') {
            layer.confirm('是否删除？', function (index) {
                obj.del();
                layer.close(index);
                $.ajax({
                    url: window.parent.servicesurl + "/api/Database/DeleteDatabase", type: "delete", data: { "id": obj.data.id },
                    success: function (result) {
                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }, datatype: "json"
                });
            });
        }
    });

    $("#adddatabase").on("click", function () {
        adddatabaselayerindex = layer.open({
            type: 1
            , title: ['添加新监测数据库', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['500px', '500px']
            , shade: [0.5, '#393D49']
            , offset: 'auto'
            , closeBtn: 1
            , maxmin: false
            , content: '<form class="layui-form" style="margin-top:10px" lay-filter="adddatabaseform"> <div class="layui-form-item"><label class="layui-form-label">数据库类型</label> <div class="layui-input-block" style="padding-right:10px"><select id="dblxid" name="dblx" lay-filter="dbselect"><option value="">请选择</option><option value="0">SQLServer</option><option value="1">Oracle</option><option value="2">MySQL</option><option value="3">PostgreSQL</option><option value="4">SQLite</option></select></div> </div> <div class="layui-form-item"><label class="layui-form-label">IP</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" id="dbipid" name="dbip" autocomplete="off" placeholder="请输入" class="layui-input" lay-filter="required" disabled="disabled" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">端口</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" id="dbportid" name="dbport" autocomplete="off" placeholder="请输入" class="layui-input" lay-filter="required|number" disabled="disabled" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">数据库名称</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" id="dbnameid" name="dbname" autocomplete="off" placeholder="请输入" class="layui-input" lay-filter="required" disabled="disabled" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">账户</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" id="dbuserid" name="dbuser" autocomplete="off" placeholder="请输入" class="layui-input" lay-filter="required" disabled="disabled" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">密码</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" id="dbpwid" name="dbpw" autocomplete="off" placeholder="请输入" class="layui-input" lay-filter="required" disabled="disabled" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">数据库地址</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" id="dbaddid" name="dbadd" autocomplete="off" placeholder="请输入" class="layui-input" lay-filter="required" disabled="disabled" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">备注</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="bz" autocomplete="off" placeholder="请输入" class="layui-input" /></div> </div> <div class="layui-form-item" style="margin-top:30px;"> <div style="text-align:center;"> <button type="submit" class="layui-btn" lay-submit="" lay-filter="adddatabasesubmit" style="width:80px">提交</button> <button type="reset" class="layui-btn layui-btn-primary" style="width:80px">重置</button></div> </div> </form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                form.render();
                form.render('select');
                form.render('select', 'dbselect');

                form.on('select(dbselect)', function (data) {
                    form.val("adddatabaseform", {
                        "dbip": ""
                        , "dbport": ""
                        , "dbname": ""
                        , "dbuser": ""
                        , "dbpw": ""
                        , "dbadd": ""
                    });

                    if (data.value == 4) {
                        document.getElementById("dbipid").disabled = "disabled";
                        document.getElementById("dbportid").disabled = "disabled";
                        document.getElementById("dbnameid").disabled = "disabled";
                        document.getElementById("dbuserid").disabled = "disabled";
                        document.getElementById("dbpwid").disabled = "disabled";
                        document.getElementById("dbaddid").disabled = "";
                    }
                    else {
                        document.getElementById("dbipid").disabled = "";
                        document.getElementById("dbportid").disabled = "";
                        document.getElementById("dbnameid").disabled = "";
                        document.getElementById("dbuserid").disabled = "";
                        document.getElementById("dbpwid").disabled = "";
                        document.getElementById("dbaddid").disabled = "disabled";

                        if (data.value == 0) {
                            form.val("adddatabaseform", {
                                "dbport": 1433
                            });
                        }
                        else if (data.value == 1) {
                            form.val("adddatabaseform", {
                                "dbport": 1521
                            });
                        }
                        else if (data.value == 2) {
                            form.val("adddatabaseform", {
                                "dbport": 3306
                            });
                        }
                        else if (data.value == 3) {
                            form.val("adddatabaseform", {
                                "dbport": 5432
                            });
                        }
                    }

                    form.render();
                    form.render('select');
                    form.render('select', 'dbselect');
                });

                form.on('submit(adddatabasesubmit)', function (data) {
                    $.ajax({
                        url: window.parent.servicesurl + "/api/Database/AddDatabase", type: "post", data: data.field,
                        success: function (result) {
                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            GetDatabaseInfo();
                        }, datatype: "json"
                    });

                    layer.close(adddatabaselayerindex);
                    return false;
                });
            }
            , end: function () { }
        });
    });

    //获取自动化监测数据库信息
    function GetDatabaseInfo() {
        $.ajax({
            url: window.parent.servicesurl + "/api/Database/GetDatabaseInfo", type: "get",
            success: function (data) {
                if (data == "") {
                    layer.msg("无自动化监测数据库信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    databasetable.reload({ id: 'databasetableid', data: [] });
                }
                else {
                    var databaseinfos = JSON.parse(data);
                    databasedatas = [];
                    for (var i in databaseinfos) {
                        var databasedata = new Object;
                        databasedata.id = databaseinfos[i].Id;
                        databasedata.dblx = databaseinfos[i].DBLX;
                        databasedata.dbip = databaseinfos[i].DBIP;
                        databasedata.dbport = databaseinfos[i].DBPORT;
                        databasedata.dbname = databaseinfos[i].DBNAME;
                        databasedata.dbuser = databaseinfos[i].DBUSER;
                        databasedata.dbpw = databaseinfos[i].DBPW;
                        databasedata.dbadd = databaseinfos[i].DBADD;
                        databasedata.dbconn = databaseinfos[i].DBCONN;
                        databasedata.cjsj = databaseinfos[i].CJSJ;
                        databasedata.bz = databaseinfos[i].BZ;
                        databasedatas.push(databasedata);
                    }
                    databasetable.reload({ id: 'databasetableid', data: databasedatas });
                }
            }, datatype: "json"
        });
    }
}
//SQL
function GetSqlData() {

    var sqldatas = [];
    var addsqllayerindex = null;

    GetSqlInfo();

    var sqltable = table.render({
        elem: '#LAY-sql-manage'
        , id: 'sqltableid'
        , title: 'SQL信息'
        , page: true
        , even: true
        , limit: 10
        , initSort: { field: 'id', type: 'asc' }
        , toolbar: true
        , totalRow: false
        , cols: [[
            { field: 'id', title: 'ID', width: 52, fixed: 'left', align: "center" }
            , { field: 'type', title: '类型', width: 100, align: "center" }
            , { field: 'sql', title: 'SQL', width: 180, align: "center" }
            , { field: 'cjsj', title: '创建时间', width: 150, align: "center" }
            , { field: 'bz', title: '备注', width: 150, align: "center" }
            , { fixed: 'right', width: 100, align: 'center', toolbar: '#table-toolbar-sql' }
        ]]
        , data: sqldatas
    });

    table.on('tool(LAY-sql-manage)', function (obj) {
        //var data = obj.data; //获得当前行数据
        var layEvent = obj.event;

        if (layEvent === 'sqledit') {
            addsqllayerindex = layer.open({
                type: 1
                , title: ['编辑SQL信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['400px', '450px']
                , shade: [0.5, '#393D49']
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: false
                , content: '<form class="layui-form" style="margin-top:10px" lay-filter="addsqlform"> <div class="layui-form-item layui-form-text"><label class="layui-form-label">SQL</label> <div class="layui-input-block" style="padding-right:10px"><textarea name="sql" placeholder="请输入" class="layui-textarea" lay-verify="required" style="height:200px"></textarea></div> </div> <div class="layui-form-item"><label class="layui-form-label">类型</label> <div class="layui-input-block" style="padding-right:10px"><select id="typeid" name="type" lay-filter="typeselect" lay-verify="required"><option value="">请选择</option></select></div> </div> <div class="layui-form-item"><label class="layui-form-label">备注</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="bz" autocomplete="off" placeholder="请输入" class="layui-input" /></div> </div> <div class="layui-form-item" style="margin-top:30px"> <div style="text-align: center;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="addsqlsubmit" style="width:80px">提交</button><button type="reset" class="layui-btn layui-btn-primary" style="width:80px">重置</button></div> </div> </form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    form.val("addsqlform", {
                        "sql": obj.data.sql
                        , "bz": obj.data.bz
                    });

                    if (obj.data.type == "读取") {
                        document.getElementById("typeid").innerHTML += '<option value="0" selected>读取</option><option value="1">写入</option>';
                    }
                    else if (obj.data.type == "写入") {
                        document.getElementById("typeid").innerHTML += '<option value="0">读取</option><option value="1" selected>写入</option>';
                    }
                    else {
                        document.getElementById("typeid").innerHTML += '<option value="0">读取</option><option value="1">写入</option>';
                    }

                    form.render();
                    form.render('select');

                    form.on('submit(addsqlsubmit)', function (data) {
                        data.field.id = obj.data.id;
                        $.ajax({
                            url: window.parent.servicesurl + "/api/Sql/UpdateSQL", type: "put", data: data.field,
                            success: function (result) {
                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                GetSqlInfo();
                            }, datatype: "json"
                        });

                        layer.close(addsqllayerindex);
                        return false;
                    });
                }
                , end: function () { }
            });

        } else if (layEvent === 'sqldel') {
            layer.confirm('是否删除？', function (index) {
                obj.del();
                layer.close(index);
                $.ajax({
                    url: window.parent.servicesurl + "/api/Sql/DeleteSQL", type: "delete", data: { "id": obj.data.id },
                    success: function (result) {
                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }, datatype: "json"
                });
            });
        }
    });

    $("#addsql").on("click", function () {
        addsqllayerindex = layer.open({
            type: 1
            , title: ['添加新SQL', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['400px', '430px']
            , shade: [0.5, '#393D49']
            , offset: 'auto'
            , closeBtn: 1
            , maxmin: false
            , content: '<form class="layui-form" style="margin-top:10px" lay-filter="addsqlform"> <div class="layui-form-item layui-form-text"><label class="layui-form-label">SQL</label> <div class="layui-input-block" style="padding-right:10px"><textarea name="sql" placeholder="请输入" class="layui-textarea" lay-verify="required" style="height:200px"></textarea></div> </div> <div class="layui-form-item"><label class="layui-form-label">类型</label> <div class="layui-input-block" style="padding-right:10px"><select id="typeid" name="type" lay-filter="typeselect" lay-verify="required"><option value="">请选择</option></select></div> </div> <div class="layui-form-item"><label class="layui-form-label">备注</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="bz" autocomplete="off" placeholder="请输入" class="layui-input" /></div> </div> <div class="layui-form-item" style="margin-top:30px"> <div style="text-align: center;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="addsqlsubmit" style="width:80px">提交</button><button type="reset" class="layui-btn layui-btn-primary" style="width:80px">重置</button></div> </div> </form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                document.getElementById("typeid").innerHTML += '<option value="0">读取</option><option value="1">写入</option>';

                form.render();
                form.render('select');

                form.on('submit(addsqlsubmit)', function (data) {
                    $.ajax({
                        url: window.parent.servicesurl + "/api/Sql/AddSQL", type: "post", data: data.field,
                        success: function (result) {
                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            GetSqlInfo();
                        }, datatype: "json"
                    });

                    layer.close(addsqllayerindex);
                    return false;
                });
            }
            , end: function () { }
        });
    });

    function GetSqlInfo() {
        $.ajax({
            url: window.parent.servicesurl + "/api/Sql/GetSQLInfo", type: "get",
            success: function (data) {
                if (data == "") {
                    layer.msg("无SQL信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    sqltable.reload({ id: 'sqltableid', data: [] });
                }
                else {
                    var sqlinfos = JSON.parse(data);
                    sqldatas = [];
                    for (var i in sqlinfos) {
                        var sqldata = new Object;
                        sqldata.id = sqlinfos[i].Id;
                        sqldata.sql = sqlinfos[i].Sql;
                        sqldata.cjsj = sqlinfos[i].CJSJ;
                        sqldata.bz = sqlinfos[i].BZ;
                        sqldata.type = sqlinfos[i].Type;
                        sqldatas.push(sqldata);
                    }
                    sqltable.reload({ id: 'sqltableid', data: sqldatas });
                }
            }, datatype: "json"
        });
    }

}
//设备厂家
function GetFactoryData() {
    var factorydatas = [];
    var addfactorylayerindex = null;

    //请求自动化监测设备厂家信息
    GetFactoryInfo();

    var factorytable = table.render({
        elem: '#LAY-factory-manage'
        , id: 'factorytableid'
        , title: '自动化监测设备厂家信息'
        , page: true
        , even: true
        , limit: 10
        , initSort: { field: 'id', type: 'asc' }
        , toolbar: true
        , totalRow: false
        , cols: [[
            { field: 'id', title: 'ID', width: 52, fixed: 'left', align: "center" }
            , { field: 'cjmc', title: '厂家名称', width: 130, align: "center" }
            , { field: 'cjjc', title: '厂家简称', width: 100, align: "center" }
            , { field: 'cjbm', title: '厂家编码', width: 100, align: "center" }
            , { field: 'cjsj', title: '创建时间', width: 150, align: "center" }
            , { field: 'bz', title: '备注', width: 100, align: "center" }
            , { fixed: 'right', width: 100, align: 'center', toolbar: '#table-toolbar-factory' }
        ]]
        , data: factorydatas
    });


    table.on('tool(LAY-factory-manage)', function (obj) {
        //var data = obj.data; //获得当前行数据
        var layEvent = obj.event;

        if (layEvent === 'factoryedit') {
            //编辑自动化监测设备厂家
            addfactorylayerindex = layer.open({
                type: 1
                , title: ['编辑设备厂家信息', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                , area: ['450px', '350px']
                , shade: [0.5, '#393D49']
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: false
                , content: '<form class="layui-form" style="margin-top:10px" lay-filter="addfactoryform"> <div class="layui-form-item"><label class="layui-form-label">厂家名称</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="cjmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">厂家简称</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="cjjc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">厂家编码</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="cjbm" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">备&emsp;&emsp;注</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="bz" autocomplete="off" placeholder="请输入" class="layui-input" /></div> </div> <div class="layui-form-item" style="margin-top:30px"> <div style="text-align: center;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="addfactorysubmit" style="width:80px">提交</button><button type="reset" class="layui-btn layui-btn-primary" style="width:80px">重置</button></div> </div> </form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    form.val("addfactoryform", {
                        "cjmc": obj.data.cjmc
                        , "cjjc": obj.data.cjjc
                        , "cjbm": obj.data.cjbm
                        , "bz": obj.data.bz
                    });

                    form.on('submit(addfactorysubmit)', function (data) {
                        data.field.id = obj.data.id;
                        $.ajax({
                            url: window.parent.servicesurl + "/api/Factory/UpdateFactory", type: "put", data: data.field,
                            success: function (result) {
                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                GetFactoryInfo();
                            }, datatype: "json"
                        });

                        layer.close(addfactorylayerindex);
                        return false;
                    });
                }
                , end: function () { }

            });

        } else if (layEvent === 'factorydel') {
            layer.confirm('是否删除？', function (index) {
                obj.del(); //删除表格对应行
                layer.close(index);

                $.ajax({
                    url: window.parent.servicesurl + "/api/Factory/DeleteFactory", type: "delete", data: { "id": obj.data.id },
                    success: function (result) {
                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }, datatype: "json"
                });
            });
        }
    });

    //添加自动化监测设备厂家
    $("#addfactory").on("click", function () {
        addfactorylayerindex = layer.open({
            type: 1
            , title: ['添加新设备厂家', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['400px', '320px']
            , shade: [0.5, '#393D49']
            , offset: 'auto'
            , closeBtn: 1
            , maxmin: false
            , content: '<form class="layui-form" style="margin-top:10px" lay-filter="addfactoryform"> <div class="layui-form-item"><label class="layui-form-label">厂家名称</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="cjmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">厂家简称</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="cjjc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">厂家编码</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="cjbm" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">备&emsp;&emsp;注</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="bz" autocomplete="off" placeholder="请输入" class="layui-input" /></div> </div> <div class="layui-form-item" style="margin-top:30px"> <div style="text-align: center;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="addfactorysubmit" style="width:80px">提交</button><button type="reset" class="layui-btn layui-btn-primary" style="width:80px">重置</button></div> </div> </form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                //置顶
                layer.setTop(layero);

                form.on('submit(addfactorysubmit)', function (data) {
                    $.ajax({
                        url: window.parent.servicesurl + "/api/Factory/AddFactory", type: "post", data: data.field,
                        success: function (result) {
                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            GetFactoryInfo();
                        }, datatype: "json"
                    });

                    layer.close(addfactorylayerindex);
                    return false;
                });
            }
            , end: function () { }
        });
    });

    //获取自动化监测设备厂家信息
    function GetFactoryInfo() {
        $.ajax({
            url: window.parent.servicesurl + "/api/Factory/GetFactoryInfo", type: "get",
            success: function (data) {
                if (data == "") {
                    layer.msg("无自动化监测设备厂家信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    factorytable.reload({ id: 'factorytableid', data: [] });
                }
                else {
                    var factoryinfos = JSON.parse(data);
                    factorydatas = [];
                    for (var i in factoryinfos) {
                        var factorydata = new Object;
                        factorydata.id = factoryinfos[i].Id;
                        factorydata.cjmc = factoryinfos[i].CJMC;
                        factorydata.cjjc = factoryinfos[i].CJJC;
                        factorydata.cjbm = factoryinfos[i].CJBM;
                        factorydata.cjsj = factoryinfos[i].CJSJ;
                        factorydata.bz = factoryinfos[i].BZ;
                        factorydatas.push(factorydata);
                    }
                    factorytable.reload({ id: 'factorytableid', data: factorydatas });
                }
            }, datatype: "json"
        });
    }
}
//设备经销商
function GetSaleData() {
    var saledatas = [];
    var addsalelayerindex = null;

    //请求自动化监测设备厂家信息
    GetSaleInfo();

    //渲染用户信息表格
    var saletable = table.render({
        elem: '#LAY-sale-manage'
        , id: 'saletableid'
        , title: '自动化监测设备经销商信息'
        , page: true
        , even: true
        , limit: 10
        , initSort: { field: 'id', type: 'asc' }
        , toolbar: true
        , totalRow: false
        , cols: [[
            { field: 'id', title: 'ID', width: 52, fixed: 'left', align: "center" }
            , { field: 'jxsmc', title: '经销商名称', width: 130, align: "center" }
            , { field: 'jxsjc', title: '经销商简称', width: 100, align: "center" }
            , { field: 'jxsbm', title: '经销商编码', width: 100, align: "center" }
            , { field: 'cjsj', title: '创建时间', width: 150, align: "center" }
            , { field: 'bz', title: '备注', width: 100, align: "center" }
            , { fixed: 'right', width: 100, align: 'center', toolbar: '#table-toolbar-sale' }
        ]]
        , data: saledatas
    });

    //表格操作
    table.on('tool(LAY-sale-manage)', function (obj) {
        //var data = obj.data; //获得当前行数据
        var layEvent = obj.event;

        if (layEvent === 'saleedit') {
            //编辑自动化监测设备厂家
            addsalelayerindex = layer.open({
                type: 1
                , title: ['编辑设备经销商信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['450px', '350px']
                , shade: [0.5, '#393D49']
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: false
                , content: '<form class="layui-form" style="margin-top:10px" lay-filter="addsaleform"> <div class="layui-form-item"><label class="layui-form-label">经销商名称</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="jxsmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">经销商简称</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="jxsjc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">经销商编码</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="jxsbm" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">备&emsp;&emsp;&emsp;注</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="bz" autocomplete="off" placeholder="请输入" class="layui-input" /></div> </div> <div class="layui-form-item" style="margin-top:30px"> <div style="text-align: center;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="addsalesubmit" style="width:80px">提交</button><button type="reset" class="layui-btn layui-btn-primary" style="width:80px">重置</button></div> </div> </form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);

                    form.val("addsaleform", {
                        "jxsmc": obj.data.jxsmc
                        , "jxsjc": obj.data.jxsjc
                        , "jxsbm": obj.data.jxsbm
                        , "bz": obj.data.bz
                    });

                    form.on('submit(addsalesubmit)', function (data) {
                        data.field.id = obj.data.id;
                        $.ajax({
                            url: window.parent.servicesurl + "/api/Sale/UpdateSale", type: "put", data: data.field,
                            success: function (result) {
                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                GetSaleInfo();
                            }, datatype: "json"
                        });

                        layer.close(addsalelayerindex);
                        return false;
                    });
                }
                , end: function () { }

            });

        } else if (layEvent === 'saledel') {
            //删除自动化监测设备厂家
            layer.confirm('是否删除？', function (index) {
                obj.del(); //删除表格对应行
                layer.close(index);
                //向服务端发送删除指令
                $.ajax({
                    url: window.parent.servicesurl + "/api/Sale/DeleteSale", type: "delete", data: { "id": obj.data.id },
                    success: function (result) {
                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }, datatype: "json"
                });
            });
        }
    });

    //添加自动化监测设备厂家
    $("#addsale").on("click", function () {
        addsalelayerindex = layer.open({
            type: 1
            , title: ['添加新设备经销商', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['400px', '320px']
            , shade: [0.5, '#393D49']
            , offset: 'auto'
            , closeBtn: 1
            , maxmin: false
            , content: '<form class="layui-form" style="margin-top:10px" lay-filter="addsaleform"> <div class="layui-form-item"><label class="layui-form-label">经销商名称</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="jxsmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">经销商简称</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="jxsjc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">经销商编码</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="jxsbm" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" /></div> </div> <div class="layui-form-item"><label class="layui-form-label">备&emsp;&emsp;&emsp;注</label> <div class="layui-input-block" style="padding-right:10px"><input type="text" name="bz" autocomplete="off" placeholder="请输入" class="layui-input" /></div> </div> <div class="layui-form-item" style="margin-top:30px"> <div style="text-align: center;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="addsalesubmit" style="width:80px">提交</button><button type="reset" class="layui-btn layui-btn-primary" style="width:80px">重置</button></div> </div> </form>', zIndex: layer.zIndex
            , success: function (layero) {
                //置顶
                layer.setTop(layero);

                form.on('submit(addsalesubmit)', function (data) {
                    $.ajax({
                        url: window.parent.servicesurl + "/api/Sale/AddSale", type: "post", data: data.field,
                        success: function (result) {
                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            GetSaleInfo();
                        }, datatype: "json"
                    });

                    layer.close(addsalelayerindex);
                    return false;
                });
            }
            , end: function () { }
        });
    });

    //获取自动化监测设备厂家信息
    function GetSaleInfo() {
        $.ajax({
            url: window.parent.servicesurl + "/api/Sale/GetSaleInfo", type: "get",
            success: function (data) {
                if (data == "") {
                    layer.msg("无自动化监测设备经销商信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    saletable.reload({ id: 'saletableid', data: [] });
                }
                else {
                    var saleinfos = JSON.parse(data);
                    saledatas = [];
                    for (var i in saleinfos) {
                        var saledata = new Object;
                        saledata.id = saleinfos[i].Id;
                        saledata.jxsmc = saleinfos[i].JXSMC;
                        saledata.jxsjc = saleinfos[i].JXSJC;
                        saledata.jxsbm = saleinfos[i].JXSBM;
                        saledata.cjsj = saleinfos[i].CJSJ;
                        saledata.bz = saleinfos[i].BZ;
                        saledatas.push(saledata);
                    }
                    saletable.reload({ id: 'saletableid', data: saledatas });
                }
            }, datatype: "json"
        });
    }
}
