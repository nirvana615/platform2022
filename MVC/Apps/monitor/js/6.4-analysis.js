//无人机
var wuRenJiXuShilayerindex = null;
var wuRenJiXuShiChart = null;
var wuRenJiXuShiChuLilayerindex = null;
var lieFengChuLilayerindex = null;
var jiZuoChuLilayerindex = null;
var loadingimgindex = null;
var processedPatroltabledata = [];//设备列表
var lieFengtabledata = [];//裂缝列表
var jiZuotabledata = [];//裂缝列表
var mubiaoList = [];
var imagedatachart = null;
var jiZuoXunShiTreeData = [];
var viewerModel = null;
var viewerDianYun = null;
var curtilesetModel = null;
var curtilesetDianYun = null;
var dianYunChangList = [];
var dianYunUrlList = [];
var viewerPhoto = null;
var colorlegendlayer = null;
function LoadwuRenJiXuShiLayer(projectid) {
    if (projectid == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    if (currentprojectmonitors.length==0) {
        layer.msg("请稍等项目加载！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    else {
        if (wuRenJiXuShilayerindex == null) {
            wuRenJiXuShilayerindex = layer.open({
                type: 1
                , title: ['无人机宏观地质巡查', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['980px', '700px']
                , shade: 0
                , offset: ['60px', '400px']
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: partolHtm
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    form.render();
                    
                    form.render('select');
                    form.on('submit(queryprocessedPatrolsubmit)', function (data) {
                        data.field.cookie = document.cookie;
                        data.field.id = currentprojectid;
                       // data.field.patrolStatus = "1";//这里已处理的
                        var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                        
                        $.ajax({
                            url: servicesurl + "/api/PatrolEquipment/getUntreatedPatrolEquipmentInfo", type: "get", data: data.field,
                            success: function (result) {
                                processedPatroltabledata = [];
                                if (result == "") {
                                    //无监测剖面信息
                                    processedPatroltableview.reload({ id: 'processedPatroltableviewid', data: [] });
                                }
                                else {
                                    var windowInfos = JSON.parse(result);
                                    console.log(windowInfos);
                                    for (var i in windowInfos) {
                                        var processedPatrol = new Object;
                                        processedPatrol.id = windowInfos[i].id;
                                        processedPatrol.equipmentId = windowInfos[i].equipmentId;
                                        processedPatrol.photoUrl = windowInfos[i].photoUrl.replace('(', "%20(");
                                        processedPatrol.projectId = windowInfos[i].projectId;
                                        processedPatrol.flzz = windowInfos[i].flzz;
                                        processedPatrol.tynzd = windowInfos[i].tynzd;
                                        processedPatrol.bzwh = windowInfos[i].bzwh;
                                        processedPatrol.cgqgr = windowInfos[i].cgqgr;
                                        processedPatrol.patrolDesc = windowInfos[i].patrolDesc;
                                        processedPatrol.equipmentDesc = windowInfos[i].equipmentDesc;
                                        processedPatrol.patrolResult = windowInfos[i].patrolResult;
                                        processedPatrol.patrolStatus = windowInfos[i].patrolStatus;
                                        processedPatrol.equipmentName = windowInfos[i].equipmentName;
                                        processedPatrol.photoName = windowInfos[i].photoName;
                                        processedPatrol.patrolNum = windowInfos[i].patrolNum; 
                                        processedPatrol.txxlph = windowInfos[i].txxlph;
                                        processedPatrol.jclz = windowInfos[i].jclz; 
                                        processedPatrol.patrolTime = windowInfos[i].patrolTime; 
                                        processedPatroltabledata.push(processedPatrol);
                                    }
                                    processedPatroltableview.reload({ id: 'processedPatroltableviewid', data: processedPatroltabledata });
                                }
                                layer.close(loadingminindex);
                            }, datatype: "json"
                        });
                        return false;
                    });
                  ////展示监测设备详情
                    //DisplayPatrolDevice();
                    form.on('submit(querylieFengsubmit)', function (data) {
                        data.field.cookie = document.cookie;
                        data.field.id = currentprojectid;
                        // data.field.patrolStatus = "1";//这里已处理的
                        var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                        $.ajax({
                            url: servicesurl + "/api/ImageUpload/GetMonImageInfos", type: "get", data: data.field,
                            success: function (result) {
                                lieFengtabledata = [];
                                var windowInfos = JSON.parse(result);
                                if (windowInfos.data == "") {
                                    layer.msg(windowInfos.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    lieFengtableview.reload({ id: 'lieFengtableviewid', data: [] });
                                }
                                else {
                                    var liefenData = JSON.parse(windowInfos.data);
                                    console.log(liefenData);
                                    for (var i in liefenData) {

                                        var lieFeng = new Object;
                                        lieFeng.BSM = liefenData[i].BSM;
                                        lieFeng.BZ = liefenData[i].BZ;
                                        lieFeng.CJSJ = liefenData[i].CJSJ;
                                        lieFeng.Id = liefenData[i].Id;
                                        lieFeng.YXBH = liefenData[i].YXBH;
                                        lieFeng.YXLJ = liefenData[i].YXLJ;
                                        lieFeng.YXMC = liefenData[i].YXMC;
                                        lieFeng.xsjg = liefenData[i].xsjg;
                                        lieFeng.xszt = liefenData[i].xszt;
                                        lieFeng.targetid = liefenData[i].targetid;


                                        if (liefenData[i].YXBH) {
                                            var tempzht = liefenData[i].YXBH.split("#");
                                            if (tempzht[0]) {
                                                lieFeng.zht = tempzht[0].split("_")[1];
                                            }
                                        }
                                        lieFengtabledata.push(lieFeng);
                                    }
                                    console.log(lieFengtabledata);
                                    lieFengtableview.reload({ id: 'lieFengtableviewid', data: lieFengtabledata });
                                }
                                layer.close(loadingminindex);
                            }, datatype: "json"
                        });
                        return false;
                    });
                    //基座
                    form.on('submit(queryjiZuosubmit)', function (data) {
                        data.field.cookie = document.cookie;
                        data.field.id = currentprojectid;
                        console.log(data);
                        // data.field.patrolStatus = "1";//这里已处理的
                        var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                        $.ajax({
                            url: servicesurl + "/api/PatrolEquipment/getDianYunShuJu", type: "get", data: data.field,
                            success: function (result) {
                                jiZuotabledata = [];
                                var windowInfos = JSON.parse(result);
                                if (windowInfos.data == "") {
                                    layer.msg(windowInfos.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    jiZuotableview.reload({ id: 'jiZuotableviewid', data: [] });
                                }
                                else {
                                    var liefenData = JSON.parse(windowInfos.data);
                                    for (var i in liefenData) {
                                        var jiZuo = new Object;
                                        jiZuo.level = liefenData[i].level;
                                        jiZuo.mxlj = liefenData[i].mxlj;
                                        jiZuo.pointdataid = liefenData[i].pointdataid;
                                        jiZuo.projectid = liefenData[i].projectid;
                                        jiZuo.regionalboundary = liefenData[i].regionalboundary;
                                        jiZuo.regionid = liefenData[i].regionid;
                                        jiZuo.regionname = liefenData[i].regionname;
                                        jiZuo.vertical = liefenData[i].vertical;
                                        jiZuo.xmmc = liefenData[i].xmmc;
                                        jiZuo.xsjg = liefenData[i].xsjg;
                                        jiZuo.xssj = liefenData[i].xssj;
                                        jiZuo.xszt = liefenData[i].xszt;
                                        jiZuotabledata.push(jiZuo);
                                    }
                                    console.log(jiZuotabledata);
                                    jiZuotableview.reload({ id: 'jiZuotableviewid', data: jiZuotabledata });
                                }
                                layer.close(loadingminindex);
                            }, datatype: "json"
                        });
                        return false;
                    });
                    //报告下载
                    form.on('submit(downWord)', function (data) {
                      
                        data.id = currentprojectid;
                        console.log(data);
                        // data.field.patrolStatus = "1";//这里已处理的
                        var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                        $.ajax({
                            url: servicesurl + "/api/FlzWordWxpert/GetWordMLHelper", type: "get", data: { "id": currentprojectid, "cookie": document.cookie },
                            success: function (result) {
                                layer.close(loadingminindex);
                                console.log(result);
                               // window.location.href = 'http://www.cq107chy.com:4022/SurImage/Download/' + result;
                            },
                            error: function (res) {
                                layer.close(loadingminindex);
                                console.log(res);
                                layer.msg(res.responseJSON.ExceptionMessage, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            },datatype: "json"
                        });
                        return false;
                    });
                    //巡视照片列表
                    form.on('submit(queryrenXunsubmit)', function (data) {
                        data.field.cookie = document.cookie;
                        data.field.id = currentprojectid;
                        // data.field.patrolStatus = "1";//这里已处理的
                        var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                        $.ajax({
                            url: servicesurl + "/api/ImageUpload/GetMonImageInfos", type: "get", data: data.field,
                            success: function (result) {
                                renXuntabledata = [];
                                var windowInfos = JSON.parse(result);
                                if (windowInfos.data == "") {
                                    layer.msg(windowInfos.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    renXuntableview.reload({ id: 'renXuntableviewid', data: [] });
                                }
                                else {
                                    var renXunData = JSON.parse(windowInfos.data);
                                    console.log(renXunData);
                                    for (var i in renXunData) {

                                        var renXun = new Object;
                                        renXun.BSM = renXunData[i].BSM;
                                        renXun.BZ = renXunData[i].BZ;
                                        renXun.CJSJ = renXunData[i].CJSJ;
                                        renXun.Id = renXunData[i].Id;
                                        renXun.YXBH = renXunData[i].YXBH;
                                        renXun.YXLJ = renXunData[i].YXLJ;
                                        renXun.YXMC = renXunData[i].YXMC;
                                        renXun.xsjg = renXunData[i].xsjg;
                                        renXun.xszt = renXunData[i].xszt;
                                        renXun.targetid = renXunData[i].targetid;


                                        if (renXunData[i].YXBH) {
                                            var tempzht = renXunData[i].YXBH.split("#");
                                            if (tempzht[0]) {
                                                renXun.zht = tempzht[0].split("_")[1];
                                            }
                                        }
                                        renXuntabledata.push(renXun);
                                    }
                                    console.log(renXuntabledata);
                                    renXuntableview.reload({ id: 'renXuntableviewid', data: renXuntabledata });
                                }
                                layer.close(loadingminindex);
                            }, datatype: "json"
                        });
                        return false;
                    });
                }
                , end: function () {
                    wuRenJiXuShilayerindex = null;
                }
            });
            //设备巡查
          
            var processedPatroltableview = table.render({
                elem: '#processedPatroltable-view'
                , id: 'processedPatroltableviewid'
                , title: '设备巡查信息'
                , skin: 'line'
                , even: false
                , page: true
                , limit: 10
                , toolbar: true
                , totalRow: false
                , initSort: { field: 'id', type: 'desc' }
                , cols: [[
                    { field: 'id', title: 'ID', hide: true }
                    , { field: 'equipmentName', title: '设备名称', width: 80, align: "center" }
                    , {
                        field: 'patrolStatus', title: '状态', width: 80, align: "center", templet: function (row) {
                            if (row.patrolStatus=="1") {
                                return '已处理'
                            } else {
                                return '<span style="color: red;">未处理</span>'
                            }

                            //得到当前行数据，并拼接成自定义模板
                            
                        } }
                   // , { field: 'photoName', title: '照片名称',width:120,  align: "center" }
                    , { field: 'patrolResult', title: '巡查结果', width: 240, align: "center" }
                    , { field: 'patrolNum', title: '巡查期数', width: 80, sort: true, width: 120, align: "center"}
                    , {
                        field: 'patrolTime', title: '巡查时间', width: 140, sort: true, width: 120, align: "center", templet: function (row) {
                            if (row.patrolTime != null) {
                                var len = row.patrolTime.length;
                                
                                return row.patrolTime.slice(0, len - 7);
                            } else {
                                return ''
                            }

                            //得到当前行数据，并拼接成自定义模板

                        } }
                    //, { field: 'flzz', title: '防雷装置', width: 120, align: "center" }
                    //, { field: 'tynzd', title: '太阳板检查', width: 120, align: "center" }
                    //, { field: 'tynzd', title: '标志完好性', width: 120, align: "center" }
                    //, {
                    //    field: 'cgqgr', title: '传感器检查', width: 120, align: "center" }
                    , { fixed: 'right', width: 180, align: 'center', toolbar: '#processedPatrolButon' }
                ]]
                , data: processedPatroltabledata
            });
            table.on('tool(processedPatroltable-view)', function (obj) {
                console.log(obj);
                if (obj.event === 'detail') {//查看
                    var imgurl = datasurl + obj.data.photoUrl; 
                    var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                  
                   layer.photos({
                        photos: {
                            "data": [{
                                "src": imgurl,
                            }]
                        },
                        title: [obj.data.photoName, 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                        , offset: 'auto'
                        , id: obj.data.id
                        , anim: 5
                        , shade: 0
                        , closeBtn: 1
                        , shadeClose:false 
                       , success: function (layero) {
                           console.log(11111);
                           //直接请求图层出来了
                           setTimeout(() => {
                               layer.close(loadingminindex); //跳转地址图层列表
                           }, 2000);
                           
                           layer.setTop(layero); 
                           // layero.css('margin-left', '350px');
                        }
                    });
       
                }
                else if (obj.event === 'edit') {
                    if (wuRenJiXuShiChuLilayerindex != null) {
                        //document.getElementById("chuLiXunShi").src = '';
                        layer.close(wuRenJiXuShiChuLilayerindex);
                        return;
                        //document.getElementById("chuLiXunShi").src ='';
                        //wuRenJiXuShiChuLilayerindex = null;
                    }

                    wuRenJiXuShiChuLilayerindex = layer.open({
                        type: 1
                        , title: [obj.data.equipmentName + '第'+obj.data.patrolNum+'期巡查', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                        , area: ['900px', '760px']
                        , shade: 0
                        , offset: 'auto'
                        , closeBtn: 1
                        , maxmin: true
                        , moveOut: true
                        , content: chuLiXunShiHtml
                        , zIndex: layer.zIndex
                        , success: function (layero) {
                            layer.setTop(layero);
                            
                            form.val("chuLiXunShiform", {
                                "bzwh": obj.data.bzwh == 1 ? true : false,
                                "cgqgr": obj.data.cgqgr == 1 ? true : false,
                                "equipmentDesc": obj.data.equipmentDesc == 1 ? true : false,
                                "equipmentName": obj.data.equipmentName,
                                "flzz": obj.data.flzz == 1 ? true : false,
                                "id": obj.data.id,
                                "jclz": obj.data.jclz == 1 ? true : false,
                                "patrolDesc": obj.data.patrolDesc == 1 ? true : false,
                                "patrolNum": obj.data.patrolNum,
                                "patrolResult": obj.data.patrolResult,
                                "patrolStatus": obj.data.patrolStatus,
                                "photoName": obj.data.photoName == 1 ? true : false,
                                "txxlph": obj.data.txxlph == 1 ? true : false,
                                "tynzd": obj.data.tynzd == 1 ? true : false,
                            });
                            document.getElementById("chuLiXunShi").src = datasurl + obj.data.photoUrl; 
                            if (viewerPhoto != null) {
                                viewerPhoto.destroy();
                            }
                            viewerPhoto = new Viewer(document.getElementById('dowebok'), {
                                toolbar: true, //显示工具条
                                viewed() {
                                    viewerPhoto.zoomTo(0.75); // 图片显示比例 75%
                                },
                                zIndex: 99999999,
                                navbar: false,
                                show: function () {  // 动态加载图片后，更新实例
                                    viewerPhoto.update();
                                },
                            });
                            console.log(viewerPhoto);
                            form.on('submit(chuLiXunShisubmit)', function (data) {
                                data.field.id = obj.data.id;
                                data.field.cookie = document.cookie;
                                data.field.patrolStatus = "1";//只要提交，都是处理
                                console.log(data.field);
                               // return false;
                                var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                                
                                $.ajax({
                                    url: servicesurl + "/api/PatrolEquipment/UpdatePartorSheBei", type: "put", data: data.field,
                                    success: function (result) {
                                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                       // GetWarningCriterion();
                                        console.log(processedPatroltabledata);
                                        for (var i in processedPatroltabledata) {
                                            if (processedPatroltabledata[i].id == obj.data.id) {
                                                processedPatroltabledata[i].bzwh = data.field.bzwh;
                                                    processedPatroltabledata[i].cgqgr = data.field.cgqgr;
                                                    processedPatroltabledata[i].equipmentDesc = data.field.equipmentDesc;
                                                    processedPatroltabledata[i].flzz = data.field.flzz;
                                                    processedPatroltabledata[i].jclz = data.field.jclz;
                                                    processedPatroltabledata[i].patrolDesc = data.field.patrolDesc;
                                                    processedPatroltabledata[i].patrolResult = data.field.patrolResult;
                                                    processedPatroltabledata[i].patrolStatus = data.field.patrolStatus;
                                                    processedPatroltabledata[i].txxlph = data.field.txxlph;
                                                    processedPatroltabledata[i].tynzd = data.field.tynzd; 
                                                    processedPatroltabledata[i].photoName = data.field.photoName; 
                                                console.log(data.field.bzwh);
                                                break;
                                            }
                                        }
                                        processedPatroltableview.reload({ id: 'processedPatroltableviewid', data: processedPatroltabledata });
                                        layer.close(loadingminindex);
                                    }, datatype: "json"
                                });
                                console.log(data);
                                layer.close(wuRenJiXuShiChuLilayerindex);
                                return false;
                            });
                            form.on('select(duiBiSelectname)', function (data) {
                                loadingimgindex = layer.load(0, { title: '图片加载中', shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                                document.getElementById("duiBitui").src = datasurl + data.value; 
                                viewerPhoto.destroy();
                                viewerPhoto = new Viewer(document.getElementById('dowebok'), {
                                    toolbar: true, //显示工具条
                                    viewed() {
                                        viewerPhoto.zoomTo(0.75); // 图片显示比例 75%
                                    },
                                    zIndex:99999999,
                                    navbar: false,
                                    show: function () {  // 动态加载图片后，更新实例
                                        viewerPhoto.update();
                                    },
                                });
                            });
                            $("#selectNumDiv").hide();
                            $("#duiBitui").hide();
                            
                            form.on('switch(switch-type)', function (data) {  //radio-type为lay-filter的属性值
                               
                                console.log(data.elem.checked);
                                if (data.elem.checked) {//选中
                                    $("#selectNumDiv").show();
                                    console.log($("#duiBitui"));
                                } else {//不选中
                                    $("#selectNumDiv").hide();
                                    $("#duiBitui").hide();
                                    $("#chuLiXunShi")[0].attributes[1].value = "width:820px;height:646px;margin-left: 40px";
                                } 
                                return false;
                            });
                           // 发送后台，查出相同的设备，不同的期数。
                            var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                            $.ajax({
                                url: servicesurl + "/api/PatrolEquipment/getUntreatedPatrolEquipmentInfo", type: "get", data: { "id": projectid, "cookie": document.cookie, "patrolStatus": "", "equipmentName": obj.data.equipmentName, "patrolNum": "" },
                                success: function (data) {
                                    
                                    if (data == "") {
                                        //无监测剖面信
                                        document.getElementById("duiBiSelect").innerHTML =  "<option value=''>无往期数据</option>	"
                                    }
                                    else {
                                        var windowInfos = JSON.parse(data);
                                        console.log(windowInfos);
                                        for (var i in windowInfos) {
                                            if (windowInfos[i].patrolTime.length>7) {
                                                document.getElementById("duiBiSelect").innerHTML += '<option value="' + windowInfos[i].photoUrl.replace('(', "%20(") + '" selected>' + windowInfos[i].patrolTime.slice(0, windowInfos[i].patrolTime.length - 7) + '</option>';
                                            }
                                         }
                                        
                                    }
                                    layer.close(loadingminindex);
                                    form.render();
                                    form.render('select');
                                }, datatype: "json"
                            });
                           // document.getElementById("duiBiSelect").innerHTML += '<option value="' + autodatadatetimes[i].value + '" selected>' + autodatadatetimes[i].name + '</option>';
                                 
                            
                        }
                        , end: function () {
                            wuRenJiXuShiChuLilayerindex = null;
                            viewerPhoto = null;
                        }
                    });
                } 
            });
            var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
            $.ajax({
                url: servicesurl + "/api/PatrolEquipment/getUntreatedPatrolEquipmentInfo", type: "get", data: { "id": projectid, "cookie": document.cookie, "patrolStatus": "", "equipmentName":"","patrolNum":"" },
                success: function (data) {
                    processedPatroltabledata = [];
                    if (data == "") {
                        //无监测剖面信
                        processedPatroltableview.reload({ id: 'processedPatroltableviewid', data: [] });
                    }
                    else {
                        var windowInfos = JSON.parse(data);
                        console.log(windowInfos);
                        for (var i in windowInfos) {
                            var processedPatrol = new Object;
                            processedPatrol.id = windowInfos[i].id;
                            processedPatrol.equipmentId = windowInfos[i].equipmentId;
                            processedPatrol.photoUrl = windowInfos[i].photoUrl.replace('(', "%20(");
                            processedPatrol.projectId = windowInfos[i].projectId;
                            processedPatrol.flzz = windowInfos[i].flzz;
                            processedPatrol.tynzd = windowInfos[i].tynzd;
                            processedPatrol.bzwh = windowInfos[i].bzwh;
                            processedPatrol.cgqgr = windowInfos[i].cgqgr;
                            processedPatrol.patrolDesc = windowInfos[i].patrolDesc;
                            processedPatrol.equipmentDesc = windowInfos[i].equipmentDesc;
                            processedPatrol.patrolResult = windowInfos[i].patrolResult;
                            processedPatrol.patrolStatus = windowInfos[i].patrolStatus;
                            processedPatrol.equipmentName = windowInfos[i].equipmentName;
                            processedPatrol.photoName = windowInfos[i].photoName;
                            processedPatrol.patrolNum = windowInfos[i].patrolNum;
                            processedPatrol.txxlph = windowInfos[i].txxlph; 
                            processedPatrol.jclz = windowInfos[i].jclz; 
                            processedPatrol.patrolTime = windowInfos[i].patrolTime; 
                            processedPatroltabledata.push(processedPatrol);
                        }
                        processedPatroltableview.reload({ id: 'processedPatroltableviewid', data: processedPatroltabledata });
                    }
                    layer.close(loadingminindex);
                }, datatype: "json"
            });
            //裂缝叙事
            //裂缝巡查
            
            var lieFengtableview = table.render({
                elem: '#lieFengtable-view'
                , id: 'lieFengtableviewid'
                , title: '裂缝巡查信息'
                , skin: 'line'
                , even: false
                , page: true
                , limit: 10
                , toolbar: true
                , totalRow: false
                , initSort: { field: 'id', type: 'desc' }
                , cols: [[
                    { field: 'id', title: 'ID', hide: true }
                    , { field: 'YXMC', title: '影像名称', width: 360, align: "center" }
                    , {
                        field: 'xszt', title: '巡查状态', width: 80, align: "center", templet: function (row) {
                            if (row.xszt == "1") {
                                return '已处理'
                            } else {
                                return '<span style="color: red;">未处理</span>'
                            }
                            
                        }
                    }
                    , { field: 'xsjg', title: '巡查结果', width: 120, align: "center" }
                    , { field: 'zht', title: '灾害体', width: 80, sort: true, width: 100, align: "center" }
                    , {
                        field: 'CJSJ', title: '巡查时间', width: 80, sort: true,  align: "center", templet: function (row) {
                            
                            if (row.CJSJ != null) {
                                var len = row.CJSJ.length;
                                return row.CJSJ.slice(0, len - 8);
                            } else {
                                return ''
                            }

                        }
                   
                    }
                   
                    , { fixed: 'right', width: 80, align: 'center', toolbar: '#lieFengButon' }
                ]]
                , data: []
            });
            table.on('tool(lieFengtable-view)', function (obj) {
                console.log(obj);
                if (obj.event === 'edit') {
                    if (lieFengChuLilayerindex != null) {
                        layer.close(lieFengChuLilayerindex);
                        return;
                    }

                    lieFengChuLilayerindex = layer.open({
                        type: 1
                        , title: [obj.data.YXMC+'巡查', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                        , area: ['920px', '800px']
                        , shade: 0
                        , offset: 'auto'
                        , closeBtn: 1
                        , maxmin: true
                        , moveOut: true
                        , content: lieFengHtml
                        , zIndex: layer.zIndex
                        , success: function (layero) {
                            layer.setTop(layero);

                            form.val("lieFengform", {
                                xsjg: obj.data.xsjg,

                            });
                            document.getElementById("lieFengChuli").src = datasurl + lujizhuanhuan(obj.data.YXLJ);//处理存的路劲地址

                            form.on('submit(lieFengsubmit)', function (data) {
                                data.field.id = obj.data.Id;
                                data.field.cookie = document.cookie;
                                data.field.xszt = "1";//只要提交，都是处理
                                var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                                $.ajax({
                                    url: servicesurl + "/api/ImageUpload/UpdatePartorLieFeng", type: "put", data: data.field,
                                    success: function (result) {
                                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        // GetWarningCriterion();
                                        console.log(lieFengtabledata);
                                        for (var i in lieFengtabledata) {
                                            if (lieFengtabledata[i].id == obj.data.id) {
                                                lieFengtabledata[i].xszt = "1",
                                                lieFengtabledata[i].xsjg = data.field.xsjg
                                                break;
                                            }
                                        }
                                        lieFengtableview.reload({ id: 'lieFengtableviewid', data: lieFengtabledata });
                                        layer.close(loadingminindex);
                                    }, datatype: "json"
                                });
                                console.log(data);
                                layer.close(lieFengChuLilayerindex);
                                return false;
                            });
                            if (viewerPhoto!=null) {
                                viewerPhoto.destroy();
                            }
                            viewerPhoto = new Viewer(document.getElementById('dowebok'), {
                                toolbar: true, //显示工具条
                                viewed() {
                                    viewerPhoto.zoomTo(0.75); // 图片显示比例 75%
                                },
                                zIndex: 99999999,
                                navbar: false,
                                show: function () {  // 动态加载图片后，更新实例
                                    viewerPhoto.update();
                                },
                            });
                            form.on('select(lieFengduiBiSelectname)', function (data) {
                                console.log(data);
                                loadingimgindex = layer.load(0, { title: '图片加载中', shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                                document.getElementById("lieFengduiBitui").src = datasurl + data.value;
                                viewerPhoto.destroy();
                                viewerPhoto = new Viewer(document.getElementById('dowebok'), {
                                    toolbar: true, //显示工具条
                                    viewed() {
                                        viewerPhoto.zoomTo(0.75); // 图片显示比例 75%
                                    },
                                    zIndex: 99999999,
                                    navbar: false,
                                    show: function () {  // 动态加载图片后，更新实例
                                        viewerPhoto.update();
                                    },
                                });
                            });
                            $("#lieFengselectNumDiv").hide();
                            $("#lieFengduiBitui").hide();

                            form.on('switch(lieFengswitch-type)', function (data) {  //radio-type为lay-filter的属性值

                                console.log(data.elem.checked);
                                if (data.elem.checked) {//选中
                                    $("#lieFengselectNumDiv").show();
                                    console.log($("#lieFengduiBitui"));
                                } else {//不选中
                                    $("#lieFengselectNumDiv").hide();
                                    $("#lieFengduiBitui").hide();
                                    $("#lieFengChuli")[0].attributes[1].value = "width:820px;height:646px;margin-left: 40px";
                                }
                                return false;
                            });
                            // 发送后台，查出相同的设备，不同的期数。
                            var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                            $.ajax({
                                url: servicesurl + "/api/ImageUpload/GetMonImageInfos", type: "get", data: { "id": projectid, "cookie": document.cookie, "targetId": obj.data.targetid, "yxmc": "", "xszt": "" },
                                success: function (result) {

                                    var windowInfos = JSON.parse(result);
                                    if (windowInfos.data == "") {
                                        //无监测剖面信
                                        document.getElementById("lieFengduiBiSelect").innerHTML = "<option value=''>无往期数据</option>	"
                                    }
                                    else {
                                        var liefengList = JSON.parse(windowInfos.data);
                                        for (var i in liefengList) {
                                            if (liefengList[i].YXLJ.length > 8) {
                                                document.getElementById("lieFengduiBiSelect").innerHTML += '<option value="' + lujizhuanhuan(liefengList[i].YXLJ) + '" selected>' + liefengList[i].CJSJ.slice(0, liefengList[i].CJSJ.length - 8) + '</option>';
                                            }
                                        }
                                    }
                                    layer.close(loadingminindex);
                                   // form.render();
                                    form.render('select');
                                }, datatype: "json"
                            });
                            // document.getElementById("duiBiSelect").innerHTML += '<option value="' + autodatadatetimes[i].value + '" selected>' + autodatadatetimes[i].name + '</option>';
                            LoadImageDataPreDateTimess(obj.data.targetid,'13');

                        }
                        , end: function () {
                            lieFengChuLilayerindex = null;
                        }
                    });
                }
            });
            var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

            $.ajax({
                url: servicesurl + "/api/ImageUpload/GetMonImageInfos", type: "get", data: { "id": projectid, "cookie": document.cookie, "targetId": "", "yxmc": "", "xszt": "" },
                success: function (result) {
                    lieFengtabledata = [];
                    var windowInfos = JSON.parse(result);
                    if (windowInfos.data == "") {
                        layer.msg(windowInfos.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        lieFengtableview.reload({ id: 'lieFengtableviewid', data: [] });
                    }
                    else {
                        var liefenData = JSON.parse(windowInfos.data);
                        console.log(liefenData);
                        for (var i in liefenData) {
                           
                            var lieFeng = new Object;
                            lieFeng.BSM = liefenData[i].BSM;
                            lieFeng.BZ = liefenData[i].BZ;
                            lieFeng.CJSJ = liefenData[i].CJSJ;
                            lieFeng.Id = liefenData[i].Id;
                            lieFeng.YXBH = liefenData[i].YXBH;
                            lieFeng.YXLJ = liefenData[i].YXLJ;
                            lieFeng.YXMC = liefenData[i].YXMC;
                            lieFeng.xsjg = liefenData[i].xsjg;
                            lieFeng.xszt = liefenData[i].xszt;
                            lieFeng.targetid = liefenData[i].targetid;

                            
                            if (liefenData[i].YXBH) {
                                var tempzht = liefenData[i].YXBH.split("#");
                                if (tempzht[0]) {
                                    lieFeng.zht =tempzht[0].split("_")[1];
                                }
                            }
                            lieFengtabledata.push(lieFeng);
                        }
                        console.log(lieFengtabledata);
                        lieFengtableview.reload({ id: 'lieFengtableviewid', data: lieFengtabledata });
                    }
                    layer.close(loadingminindex);
                }, datatype: "json"
            });


            var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

            $.ajax({//string targetId,string yxmc,string xszt
                url: servicesurl + "/api/ImageProject/getYinXiangProjectId", type: "get", data: { "id": projectid },
                success: function (data) {
                    if (data != null) {//有对应id
                        $.ajax({//string targetId,string yxmc,string xszt
                            url: servicesurl + "/api/ImageTarget/GetTargetList", type: "get", data: { "id": data,"cookie": document.cookie },
                            success: function (result) {
                                layer.close(loadingminindex);
                                var windowInfos = JSON.parse(result);
                                if (windowInfos.data == "") {
                                   // document.getElementById("targetIdSelect").innerHTML = '<option value="">请选择</option>';
                                } else {
                                    mubiaoList = JSON.parse(windowInfos.data);
                                    for (var i in mubiaoList) {
                                        document.getElementById("targetIdSelect").innerHTML += '<option value="' + mubiaoList[i].Id + '">' + mubiaoList[i].MBMC + '</option>';
                                    }
                                    form.render('select');
                                }
                                
                            }, datatype: "json"
                        });
                        
                    } else {//没有目标就没有下拉选
                       // document.getElementById("xunShiDiv").innerHTML = '<option value="">请选择</option>';
                        layer.close(loadingminindex);
                    }
                    console.log(data);
                }, datatype: "json"
            });

            //基座巡查
            //
            var jiZuotableview = table.render({
                elem: '#jiZuotable-view'
                , id: 'jiZuotableviewid'
                , title: '基座巡查信息'
                , skin: 'line'
                , even: false
                , page: true
                , limit: 10
                , toolbar: true
                , totalRow: false
                , initSort: { field: 'id', type: 'desc' }
                , cols: [[
                    { field: 'pointdataid', title: 'ID', hide: true }

                    , { field: 'xmmc', title: '项目名称', width: 200, align: "center" }
                    , { field: 'regionname', title: '分析区域', width: 120, align: "center" }
                    , {
                        field: 'xszt', title: '巡查状态', width: 80, align: "center", templet: function (row) {
                            if (row.xszt == "1") {
                                return '已处理'
                            } else {
                                return '<span style="color: red;">未处理</span>'
                            }

                        }
                    }
                    , { field: 'xsjg', title: '巡查结果', width: 200, align: "center" }
                    , { field: 'xssj', title: '巡查时间', width: 120, sort: true, align: "center"}

                    , { fixed: 'right', width: 80, align: 'center', toolbar: '#jiZuoButon' }
                ]]
                , data: []
            });
            table.on('tool(jiZuotable-view)', function (obj) {
                console.log(obj);
                if (obj.event === 'edit') {
                    if (jiZuoChuLilayerindex != null) {
                        layer.close(jiZuoChuLilayerindex);
                        return;
                    }

                    jiZuoChuLilayerindex = layer.open({
                        type: 1
                        , title: [obj.data.regionname + obj.data.xssj + '巡查', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                        , area: ['920px', '800px']
                        , shade: 0
                        , offset: 'auto'
                        , closeBtn: 1
                        , maxmin: true
                        , moveOut: true
                        , content: jiZuoHtml
                        , zIndex: layer.zIndex
                        , success: function (layero) {
                            layer.setTop(layero);
                            // 
                            


                            //模型查看数据
                            
                            viewerModel = new Cesium.Viewer("dianYunModel", {
                                    homeButton: true,
                                    animation: false,
                                    baseLayerPicker: false,
                                    fullscreenButton: false,
                                    vrButton: false,
                                    geocoder: false,
                                    infoBox: true,
                                    sceneModePicker: false,
                                    selectionIndicator: true,
                                    timeline: false,
                                    navigationHelpButton: false,
                                    navigationInstructionsInitiallyVisible: false,
                                    //imageryProviderViewModels: baseMaps,
                                    //selectedImageryProviderViewModel: baseMaps[2],
                                    //terrainProviderViewModels: baseTerrains,
                                    //selectedTerrainProviderViewModel: baseTerrains[1],
                             

                                //fullscreenElement: 'dianYunModel'
                            });
                            /*
                             * 修改
                             */
                            viewerModel.scene.backgroundColor = Cesium.Color.GRAY;//设置场景背景色
                            viewerModel._cesiumWidget._creditContainer.style.display = "none";           //隐藏版权信息
                            viewerModel.scene.globe.enableLighting = false;                              //日夜区分
                            viewerModel.scene.globe.show = false;
                            viewerModel.scene.globe.depthTestAgainstTerrain = false;
                             viewerModel.homeButton.viewModel.tooltip = "初始视图";
                        
                            var modelurl = datasurl + "/SurModel" + obj.data.mxlj;

                            //删除上一个模型（保证只有一个模型）
                            if (curtilesetModel != null) {
                                viewerModel.scene.primitives.remove(curtilesetModel);
                            }

                            //添加模型
                            curtilesetModel = viewerModel.scene.primitives.add(new Cesium.Cesium3DTileset({
                                url: modelurl,
                                maximumScreenSpaceError: isMobile.any() ? 1 : 1,
                                maximumNumberOfLoadedTiles: isMobile.any() ? 1000 : 1000
                            }));

                            viewerModel.entities.add({
                                id: "region_"+obj.data.regionid,
                                polyline: {
                                    positions: JSON.parse(obj.data.regionalboundary),
                                    width: 3,
                                    material: Cesium.Color.fromCssColorString('#00FF00'),
                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.fromCssColorString('#00FF00'),
                                    }),
                                }
                            });
                            
                           

                            //重写HomeButton功能
                            viewerModel.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
                                e.cancel = true;
                                viewerModel.zoomTo(viewerModel.entities.getById("region_" + obj.data.regionid), new Cesium.HeadingPitchRange(Cesium.Math.toRadians((obj.data.level))), Cesium.Math.toRadians(obj.data.vertical), 40);
                            });
                            

                            //缩放至模型
                            viewerModel.zoomTo(viewerModel.entities.getById("region_" + obj.data.regionid), new Cesium.HeadingPitchRange(Cesium.Math.toRadians((obj.data.level))), Cesium.Math.toRadians(obj.data.vertical), 40);
                            // 点云
                            viewerDianYun = new Cesium.Viewer("dianYunShuJu", {
                                homeButton: true,
                                animation: false,
                                baseLayerPicker: false,
                                fullscreenButton: false,
                                vrButton: false,
                                geocoder: false,
                                infoBox: true,
                                sceneModePicker: false,
                                selectionIndicator: true,
                                timeline: false,
                                navigationHelpButton: false,
                                navigationInstructionsInitiallyVisible: false,
                          
                            });
                            /*
                             * 修改
                             */
                            viewerDianYun.scene.backgroundColor = Cesium.Color.GRAY;//设置场景背景色
                            viewerDianYun._cesiumWidget._creditContainer.style.display = "none";           //隐藏版权信息
                            viewerDianYun.scene.globe.enableLighting = false;                              //日夜区分
                            viewerDianYun.scene.globe.show = false;
                            viewerDianYun.scene.globe.depthTestAgainstTerrain = false;
                            viewerDianYun.homeButton.viewModel.tooltip = "初始视图";
                            var modelDianYunUrl = datasurl + "/SurModel" + obj.data.mxlj;

                            ////删除上一个模型（保证只有一个模型）
                            //if (curtilesetDianYun != null) {
                            //    viewerDianYun.scene.primitives.remove(curtilesetDianYun);
                            //}

                            //添加模型
                            curtilesetDianYun = viewerDianYun.scene.primitives.add(new Cesium.Cesium3DTileset({
                                url: modelDianYunUrl,
                                maximumScreenSpaceError: isMobile.any() ? 1 : 1,
                                maximumNumberOfLoadedTiles: isMobile.any() ? 1000 : 1000
                            }));

                            viewerDianYun.entities.add({
                                id: "regionDianYun_" + obj.data.regionid,
                                polyline: {
                                    positions: JSON.parse(obj.data.regionalboundary),
                                    width: 3,
                                    material: Cesium.Color.fromCssColorString('#00FF00'),
                                    depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.fromCssColorString('#00FF00'),
                                    }),
                                }
                            });



                            //重写HomeButton功能
                            viewerDianYun.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
                                e.cancel = true;
                                viewerDianYun.zoomTo(viewerDianYun.entities.getById("regionDianYun_" + obj.data.regionid), new Cesium.HeadingPitchRange(Cesium.Math.toRadians((obj.data.level))), Cesium.Math.toRadians(obj.data.vertical), 40);
                            });


                            //缩放至模型
                            viewerDianYun.zoomTo(viewerDianYun.entities.getById("regionDianYun_" + obj.data.regionid), new Cesium.HeadingPitchRange(Cesium.Math.toRadians((obj.data.level))), Cesium.Math.toRadians(obj.data.vertical), 40);



                            // 访问变化量
                            var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                            $.ajax({
                                url: servicesurl + "/api/PatrolEquipment/getDianYunChangesShuJu", type: "get", data: { "id": obj.data.pointdataid, "cookie": document.cookie },
                                success: function (result) {
                                    dianYunChangList = [];
                                    var windowInfos = JSON.parse(result);
                                    if (windowInfos.data == "") {//返回失败
                                        layer.msg(windowInfos.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        //
                                        $("#dianYunSelectNumDiv").hide();
                                        form.val("jiZuoform", {
                                            xsjg: obj.data.xsjg,
                                            dianYunDesc: "该期没有点云处理结果"
                                        });

                                    }
                                    else {
                                        var liefenData = JSON.parse(windowInfos.data);
                                        //console.log(JSON.parse(windowInfos.data));
                                        //var xunShiList = JSON.parse(windowInfos.data);
                                        console.log(liefenData);
                                        $("#dianYunDescDiv").hide();
                                       

                                        for (var i in liefenData) {

                                            var jiZuo = new Object;
                                            jiZuo.changes = liefenData[i].changes;
                                            jiZuo.cjsj = liefenData[i].cjsj;
                                            jiZuo.targetXssj = liefenData[i].targetXssj;
                                            jiZuo.sourceXssj = liefenData[i].sourceXssj;
                                            dianYunChangList.push(jiZuo);
                                            if (i = 0) {
                                                document.getElementById("dianYunSourceXssj").innerHTML += '<option value="' + jiZuo.sourceXssj + '" selected >' + jiZuo.sourceXssj + '</option>'
                                            } else {
                                                document.getElementById("dianYunSourceXssj").innerHTML += '<option value="' + jiZuo.sourceXssj + '">' + jiZuo.sourceXssj + '</option>'
                                            }
                                            
                                        }
                                        console.log(dianYunChangList);
                                        form.render('select');
                                        form.val("jiZuoform", {
                                            xsjg: obj.data.xsjg,
                                           // sourceXssj: dianYunChangList[0].changes
                                        });
                                        //加载点云
                                        if (dianYunChangList.length > 0) {
                                            var changesList = JSON.parse(dianYunChangList[0].changes);
                                            var flog = true;
                                            var x = 1;
                                            for (var j in changesList) {
                                                var lbh = xy2bl(changesList[j].x, changesList[j].y, 6378137.0, 1 / 298.257223563, 3, 108, false);
                                                var postiontemp = new Cesium.Cartesian3.fromDegrees(lbh.l, lbh.b, changesList[j].z);
                                               
                                                if (changesList[j].value>3000) {
                                                    viewerModel.entities.add({
                                                        position: postiontemp,
                                                        id: "viewerModel-" + j,
                                                        billboard: {
                                                            image: "../Resources/img/pointcloud/6.png",
                                                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                            width: 28,
                                                            height: 28,
                                                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 3000),
                                                        }
                                                    });
                                                } else if (changesList[j].value > 2000) {
                                                    viewerModel.entities.add({
                                                        position: postiontemp,
                                                        id: "viewerModel-" + j,
                                                        billboard: {
                                                            image: "../Resources/img/pointcloud/5.png",
                                                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                            width: 24,
                                                            height: 24,
                                                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 3000),
                                                        }
                                                    });

                                                } else if (changesList[j].value > 1000) {
                                                    viewerModel.entities.add({
                                                        position: postiontemp,
                                                        id: "viewerModel-" + j,
                                                        billboard: {
                                                            image: "../Resources/img/pointcloud/3.png",
                                                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                            width: 20,
                                                            height: 20,
                                                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 3000),
                                                        }
                                                    });

                                                } else {
                                                    viewerModel.entities.add({
                                                        position: postiontemp,
                                                        id: "viewerModel-" + j,
                                                        billboard: {
                                                            image: "../Resources/img/pointcloud/4.png",
                                                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                            width: 16,
                                                            height: 16,
                                                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 3000),
                                                        }
                                                    });
                                                }
                                            }
                                        }


                                    }
                                    layer.close(loadingminindex);
                                }, datatype: "json"
                            });
                            //访问点云结果。

                            var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                            $.ajax({
                                url: servicesurl + "/api/PatrolEquipment/getDianYunModel", type: "get", data: { "id": obj.data.regionid, "cookie": document.cookie },
                                success: function (result) {
                                    dianYunUrlList = [];
                                    var windowInfos = JSON.parse(result);
                                    if (windowInfos.data == "") {//返回失败
                                        layer.msg(windowInfos.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        //
                                        $("#dianYunSelectNumDivShuJu").hide();
                                        form.val("jiZuoform", {
                                            xsjg: obj.data.xsjg,
                                            dianYunShujuDesc: "该期没有点云处理结果"
                                        });

                                    }
                                    else {
                                        var liefenData = JSON.parse(windowInfos.data);

                                        console.log(liefenData);
                                        $("#dianYunDescDivShuJu").hide();


                                        for (var i in liefenData) {
                                            var jiZuo = new Object;
                                            jiZuo.dymc = liefenData[i].dymc;
                                            jiZuo.dylj = liefenData[i].dylj;
                                            dianYunUrlList.push(jiZuo);
                                            if (i = 0) {  //	<select id='dianYunShuJuXssj'   name='dianYunXssj'  lay-filter='dianYunXssjSelect'>	
                                                document.getElementById("dianYunShuJuXssj").innerHTML += '<option value="' + jiZuo.dylj + '" selected >' + jiZuo.dymc + '</option>'
                                            } else {
                                                document.getElementById("dianYunShuJuXssj").innerHTML += '<option value="' + jiZuo.dylj + '">' + jiZuo.dymc + '</option>'
                                            }

                                        }
                                        console.log(dianYunUrlList);
                                        form.render('select');
                                        form.val("jiZuoform", {
                                            xsjg: obj.data.xsjg,
                                            // sourceXssj: dianYunChangList[0].changes
                                        });
                                        //加载点云
                                        if (dianYunUrlList.length > 0) {
                                            var modelDianYunUrl = datasurl + "/SurPointCloud" + dianYunUrlList[0].dylj;
                                            //添加模型
                                            curtilesetDianYun = viewerDianYun.scene.primitives.add(new Cesium.Cesium3DTileset({
                                                url: modelDianYunUrl,
                                                maximumScreenSpaceError: isMobile.any() ? 1 : 1,
                                                maximumNumberOfLoadedTiles: isMobile.any() ? 1000 : 1000
                                            }));
                                            var deformation_max = 5000;
                                            var deformation_min = 0;
                                            var pointsize = 2;
                                            var colorgrade = 5;
                                            var disply_min = '${Intensity} >' + deformation_min;
                                            colorlegendlayer = layer.open({
                                                type: 1
                                                , closeBtn: 0
                                                , title: false
                                                , area: ['500px', '40px']
                                                , shade: 0
                                                , skin: 'myskin' //行边框风格
                                                , offset: ['80px', '1100px']
                                                , content: '<div id="colorlegend" style="position: absolute; width:400px;height:20px;margin:20px;"></div>'
                                                , success: function () {
                                                    setColor(colorgrade);
                                                }
                                            }); 
                                            var conditions = GetTileSetColor(deformation_max, deformation_min);
                                            console.log(conditions);
                                            //点云图层可以设置样式 
                                            let style = {
                                                color: {
                                                    conditions: conditions
                                                },
                                                show: disply_min,
                                                pointSize: pointsize,
                                                meta: {
                                                    description: '"Building id ${id} has height ${Height}."'
                                                }
                                            }
                                            curtilesetDianYun.style = new Cesium.Cesium3DTileStyle(style);
                                        }


                                    }
                                    layer.close(loadingminindex);
                                }, datatype: "json"
                            });

                            form.on('submit(jiZuosubmit)', function (data) {
                                data.field.id = obj.data.pointdataid;
                                data.field.cookie = document.cookie;
                                data.field.xszt = "1";//只要提交，都是处理
                                var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                                $.ajax({
                                    url: servicesurl + "/api/PatrolEquipment/UpdatePartorDianYun", type: "put", data: data.field,
                                    success: function (result) {
                                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        // GetWarningCriterion();
                                        console.log(jiZuotabledata);
                                        for (var i in jiZuotabledata) {
                                            if (jiZuotabledata[i].pointdataid == obj.data.pointdataid) {
                                                jiZuotabledata[i].xszt = "1",
                                                jiZuotabledata[i].xsjg = data.field.xsjg
                                                break;
                                            }
                                        }
                                        jiZuotableview.reload({ id: 'jiZuotableviewid', data: jiZuotabledata });
                                        layer.close(loadingminindex);
                                    }, datatype: "json"
                                });
                                console.log(data);
                                layer.close(jiZuoChuLilayerindex);
                                return false;
                            });
                            form.on('select(dianYunduiBiSelectname)', function (data) {
                                console.log(dianYunChangList);
                                
                                for (var i in dianYunChangList) {
                                    if (dianYunChangList[i].sourceXssj == data.value) {
                                        for (var m = 0; m < 100;m++) {
                                            viewerModel.entities.removeById("viewerModel-" + m);
                                        }
                                        var changesList = JSON.parse(dianYunChangList[i].changes);
                                        var flog = true;
                                        var x = 1;
                                        for (var j in changesList) {
                                            var lbh = xy2bl(changesList[j].x, changesList[j].y, 6378137.0, 1 / 298.257223563, 3, 108, false);
                                            var postiontemp = new Cesium.Cartesian3.fromDegrees(lbh.l, lbh.b, changesList[j].z);
                                            if (changesList[j].value > 3000) {
                                                viewerModel.entities.add({
                                                    position: postiontemp,
                                                    id: "viewerModel-" + j,
                                                    billboard: {
                                                        image: "../Resources/img/pointcloud/6.png",
                                                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                        width: 28,
                                                        height: 28,
                                                        disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 3000),
                                                    }
                                                });
                                            } else if (changesList[j].value > 2000) {
                                                viewerModel.entities.add({
                                                    position: postiontemp,
                                                    id: "viewerModel-" + j,
                                                    billboard: {
                                                        image: "../Resources/img/pointcloud/5.png",
                                                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                        width: 24,
                                                        height: 24,
                                                        disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 3000),
                                                    }
                                                });

                                            } else if (changesList[j].value > 1000) {
                                                viewerModel.entities.add({
                                                    position: postiontemp,
                                                    id: "viewerModel-" + j,
                                                    billboard: {
                                                        image: "../Resources/img/pointcloud/3.png",
                                                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                        width: 20,
                                                        height: 20,
                                                        disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 3000),
                                                    }
                                                });

                                            } else {
                                                viewerModel.entities.add({
                                                    position: postiontemp,
                                                    id: "viewerModel-" + j,
                                                    billboard: {
                                                        image: "../Resources/img/pointcloud/4.png",
                                                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                        width: 18,
                                                        height: 18,
                                                        disableDepthTestDistance: Number.POSITIVE_INFINITY,
                                                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 3000),
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }

                            });
                           
                        }
                        , end: function () {
                            jiZuoChuLilayerindex = null;
                            layer.close(colorlegendlayer);
                            viewerModel = null;
                        }
                    });
                }
            });
            $.ajax({
                url: servicesurl + "/api/PatrolEquipment/getDianYunShuJu", type: "get", data: { "id": projectid, "cookie": document.cookie, regionname: "", xmmc: "", xszt: "" },
                success: function (result) {
                    jiZuotabledata = [];
                    var windowInfos = JSON.parse(result);
                    if (windowInfos.data == "") {
                        layer.msg(windowInfos.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        jiZuotableview.reload({ id: 'jiZuotableviewid', data: [] });
                    }
                    else {
                        var liefenData = JSON.parse(windowInfos.data);
                        //console.log(JSON.parse(windowInfos.data));
                        //var xunShiList = JSON.parse(windowInfos.data);
                        console.log(liefenData);

                        for (var i in liefenData) {

                            var jiZuo = new Object;
                            jiZuo.level = liefenData[i].level;
                            jiZuo.mxlj = liefenData[i].mxlj;
                            jiZuo.pointdataid = liefenData[i].pointdataid;
                            jiZuo.projectid = liefenData[i].projectid;
                            jiZuo.regionalboundary = liefenData[i].regionalboundary;
                            jiZuo.regionid = liefenData[i].regionid;
                            jiZuo.regionname = liefenData[i].regionname;
                            jiZuo.vertical = liefenData[i].vertical;
                            jiZuo.xmmc = liefenData[i].xmmc;
                            jiZuo.xsjg = liefenData[i].xsjg;
                            jiZuo.xssj = liefenData[i].xssj;
                            jiZuo.xszt = liefenData[i].xszt;
                            jiZuotabledata.push(jiZuo);

                        }
                        console.log(jiZuotabledata);
                        jiZuotableview.reload({ id: 'jiZuotableviewid', data: jiZuotabledata });
                    }
                    layer.close(loadingminindex);
                }, datatype: "json"
            });


          


            var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

            $.ajax({//string targetId,string yxmc,string xszt
                url: servicesurl + "/api/ImageProject/getYinXiangProjectId", type: "get", data: { "id": projectid },
                success: function (data) {
                    if (data != null) {//有对应id
                        $.ajax({//string targetId,string yxmc,string xszt
                            url: servicesurl + "/api/ImageTarget/GetTargetList", type: "get", data: { "id": data, "cookie": document.cookie },
                            success: function (result) {
                                layer.close(loadingminindex);
                                var windowInfos = JSON.parse(result);
                                if (windowInfos.data == "") {
                                    // document.getElementById("targetIdSelect").innerHTML = '<option value="">请选择</option>';
                                } else {
                                    mubiaoList = JSON.parse(windowInfos.data);
                                    for (var i in mubiaoList) {
                                        document.getElementById("targetIdSelect").innerHTML += '<option value="' + mubiaoList[i].Id + '">' + mubiaoList[i].MBMC + '</option>';
                                    }
                                    form.render('select');
                                }

                            }, datatype: "json"
                        });

                    } else {//没有目标就没有下拉选
                        // document.getElementById("xunShiDiv").innerHTML = '<option value="">请选择</option>';
                        layer.close(loadingminindex);
                    }
                    console.log(data);
                }, datatype: "json"
            });

            //巡视照片处理


            var renXuntableview = table.render({
                elem: '#renXuntable-view'
                , id: 'renXuntableviewid'
                , title: '照片巡视信息'
                , skin: 'line'
                , even: false
                , page: true
                , limit: 10
                , toolbar: true
                , totalRow: false
                , initSort: { field: 'id', type: 'desc' }
                , cols: [[
                    { field: 'id', title: 'ID', hide: true }
                    , { field: 'patrolTime', title: '上传时间', width:100,  align: "center" }
                    , { field: 'patrolNum', title: '巡视期数', width: 100,  align: "center", }
                    , {
                        field: 'photoUrl', title: '巡查时间', sort: true, align: "center", templet: function (row) {

                           
                            return "<div> <img src="+ datasurl+row.photoUrl +"></div>";
                          

                        }

                    }
                    , { fixed: 'right', width: 80, align: 'center', toolbar: '#renXunButon' }
                ]]
                , data: []
            });
            table.on('tool(renXuntable-view)', function (obj) {
                console.log(obj);
                if (obj.event === 'del') {

                    layer.confirm('是否删除?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                        var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                        $.ajax({
                            url: servicesurl + "/api/PatrolEquipment/DeletePhoto", type: "delete", data: { "id": obj.data.id },
                            success: function (result) {
                                layer.close(loadingminindex);
                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                               
                            }, datatype: "json"
                        });
                    });
                }
            });
            var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

            $.ajax({
                url: servicesurl + "/api/PatrolEquipment/getPatrolPhotoInfo", type: "get", data: { "id": projectid, "patrolNum": "" },
                success: function (result) {
                    renXuntabledata = [];
                    var windowInfos = JSON.parse(result);
                    if (windowInfos.data == "") {
                        layer.msg(windowInfos.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        renXuntableview.reload({ id: 'renXuntableviewid', data: [] });
                    }
                    else {
                        var renXunData = windowInfos;
                        console.log(renXunData);
                        for (var i in renXunData) {

                            var renXun = new Object;
                            renXun.photoUrl = renXunData[i].photoUrl;
                            renXun.patrolTime = renXunData[i].patrolTime;
                            renXun.patrolNum = renXunData[i].patrolNum;
                            renXun.id = renXunData[i].id;
                            renXun.projectId = renXunData[i].projectId;
                            renXuntabledata.push(renXun);
                        }
                        console.log(renXuntabledata);
                        renXuntableview.reload({ id: 'renXuntableviewid', data: renXuntabledata });
                    }
                    layer.close(loadingminindex);
                }, datatype: "json"
            });

        } else {
            layer.msg("已打开无人机宏观地质巡查", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
    }
}

function loadImage() {
    layer.close(loadingimgindex);
    $("#duiBitui").show(); 
    $("#chuLiXunShi")[0].attributes[1].value = "width:410px;height:323px;margin-left: 40px";
}
function loadLieImage() {
    layer.close(loadingimgindex);
    $("#lieFengduiBitui").show();
    $("#lieFengChuli")[0].attributes[1].value = "width:410px;height:323px;margin-left: 40px";
}
function lujizhuanhuan(lujin) {
    console.log(lujin);
    var temp = lujin.split("\\SurImage\\");
    return "/SurImage/Thumbnail/"+ temp[1].replace('#', "%23");
}

//裂缝数据可视化
function liefengkeshihua() {
    var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

    $.ajax({//string targetId,string yxmc,string xszt
        url: servicesurl + "/api/ImageProject/getYinXiangProjectId", type: "get", data: { "id": currentprojectid },
        success: function (data) {
            if (data != "") {//有对应id
                 LoadChangeDataLayer(data);
                 layer.close(loadingminindex);
                     

            } else {//没有目标就没有下拉选
                layer.close(loadingminindex);
                layer.msg("当前项目没有对应的裂缝信息", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                
            }
            console.log(data);
        }, datatype: "json"
    });
    
}
//预设时间范围加载影像结果数据
function LoadImageDataPreDateTimess(targetid, datetime) {
    //实例化图表
    imagedatachart = echarts.init(document.getElementById('imagedatachart'));
    imagedatachart.showLoading();

    //请求目标点预设时间范围数据
    $.ajax({
        url: servicesurl + "/api/ImageResult/GetImageResultDatabyPreDateTime", type: "get", data: { "id": targetid, "predatetime": datetime, "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);

            if (result.code == 1) {
                var imageresultdata = JSON.parse(result.data);
                console.log(imageresultdata);
                //渲染匹配算法
              //  RenderMatchWay(imageresultdata.MatchWays);

              //  curentresultdata = imageresultdata;

                //展示数据
                DisplayImageLength(imageresultdata, ["0"]);
            }
            else {
                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }

            //DisplayDATA(target, data);
        }, datatype: "json"
    });
};


var partolHtm =  "    <div class='layui-tab layui-tab-brief' lay-filter='docDemoTabBriefitem' style='margin:0px;'>                                                             "
    + "        <ul class='layui-tab-title' style='float: left;width:120px;border-color:white;'>                                                                     "
    + "            <li lay-id='111' class='layui-this' style='display: block;'>设备巡查</li>                                                                                     "
    + "            <li lay-id='222' style='display: block;'>裂缝巡查</li>                                                                                                        "
    + "            <li lay-id='333' style='display: block;'>基座巡查</li>                                                                                                        "
    + "            <li lay-id='444' style='display: block;'>报告下载</li>                                                                                                        "
    + "            <li lay-id='555' style='display: block;'>人工巡视</li>                                                                                                        "
    + "        </ul>                                                                                                                                                "
    + "                                                                                                                                                             "
    + "        <div class='layui-tab-content' id='xunShiDiv' style='margin-left:120px;height:600px;border-left:solid;border-left-color:#e6e6e6;border-left-width:1px;'>      "
    + "            <div class='layui-tab-item layui-show'>                                                                                                           "
    + "                <!--设备巡查-->                                                                                                                               "
    + "					<form class='layui-form' style='margin-bottom:15px;margin-right:5px;' lay-filter='queryprocessedPatrolinfoform'>	"
    + "						    <div class='layui-form-item'>	"
    + "						        <div class='layui-row'>	"
    + "						            <div class='layui-col-md3'>	"
    + "						                <div class='grid-demo grid-demo-bg1'>	"
    + "						                    <label class='layui-form-label'>设备名称</label>	"
    + "						                    <div class='layui-input-block'>	"
    + "						                        <input type='text' name='equipmentName' autocomplete='off' placeholder='请输入' class='layui-input' />	"
    + "						                    </div>	"
    + "						                </div>	"
    + "						            </div>	"
    + "						            <div class='layui-col-md3'>	"
    + "						                <div class='grid-demo'>	"
    + "						                    <label class='layui-form-label'>巡查期数</label>	"
    + "						                    <div class='layui-input-block'>	"
    + "						                        <input type='text' name='patrolNum' autocomplete='off' placeholder='请输入' class='layui-input' />	"
    + "						                    </div>	"
    + "						                </div>	"
    + "						            </div>	"
    + "						            <div class='layui-col-md3'>	"
    + "						                <div class='grid-demo grid-demo-bg1'>	"
    + "						                    <label class='layui-form-label'>巡查状态</label>	"
    + "						                    <div class='layui-input-block'>	"
    + "						                        <select id='statusSelect' name='patrolStatus'>	"
    + "						                            <option value=''>全部</option>	"
    + "						                            <option value='0'>未处理</option>	"
    + "						                            <option value='1'>已处理</option>	"
    + "						                        </select>	"
    + "						                    </div>	"
    + "						                </div>	"
    + "						            </div>	"
    + "						            <div class='layui-col-md3'>	"
    + "						                <div class='grid-demo grid-demo-bg1'>	"
            + "						        <div style='position:absolute;right:25px;'>	"
            //  + "						            <button type='reset' class='layui-btn layui-btn-primary' style='width:100px'>重置</button>	"
            + "						            <button type='submit' class='layui-btn' lay-submit='' lay-filter='queryprocessedPatrolsubmit' style='width:100px'>查询</button>	"
            + "						        </div>	"
    + "						                </div>	"
    + "						            </div>	"
    + "						        </div>	"
    + "						    </div>	"
  //  + "						    <div class='layui-form-item' style='margin-top:10px;height: 40px'>	"
  //  + "						        <div style='position:absolute;right:25px;'>	"
  ////  + "						            <button type='reset' class='layui-btn layui-btn-primary' style='width:100px'>重置</button>	"
  //  + "						            <button type='submit' class='layui-btn' lay-submit='' lay-filter='queryprocessedPatrolsubmit' style='width:100px'>查询</button>	"
  //  + "						        </div>	"
  //  + "						    </div>	"
    + "						</form>	"
    + "						<table class='layui-hide' id='processedPatroltable-view' style='margin-top:15px' lay-filter='processedPatroltable-view'></table>	"
    + "						<script type='text/html' id='processedPatrolButon'>                                                      "
    + "							<a class='layui-btn layui-btn-xs' lay-event='edit'>处理</a>                       "
    //+ "							<a class='layui-btn layui-btn-primary layui-btn-xs' lay-event='detail'>查看图片</a>  "
  
    //+ "							<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>       "
    + "						</script>                                                                             "
    + "                                                                                                                                                              "
    + "            </div>                                                                                                                                            "
    + "                                                                                                                                                              "
    + "            <div class='layui-tab-item'>                                                                                                                      "
    + "            <!--裂缝巡查-->                                                                                                                                   "
    + "					<form class='layui-form' style='margin-bottom:15px;margin-right:5px;' lay-filter='querylieFenginfoform'>	"
    + "						    <div class='layui-form-item'>	"
    + "						        <div class='layui-row'>	"
    + "						            <div class='layui-col-md3'>	"
    + "						                <div class='grid-demo grid-demo-bg1'>	"
    + "						                    <label class='layui-form-label'>影像名称</label>	"
    + "						                    <div class='layui-input-block'>	"
    + "						                        <input type='text' name='yxmc' autocomplete='off' placeholder='请输入' class='layui-input' />	"
    + "						                    </div>	"
    + "						                </div>	"
    + "						            </div>	"
    + "						            <div class='layui-col-md3'>	"
    + "						                <div class='grid-demo'>	"
    + "						                    <label class='layui-form-label'>目标</label>	"
    + "						                    <div class='layui-input-block'>	"
    + "						                        <select id='targetIdSelect' name='targetId' lay-filter='targetId'>	"
    + "						                            <option value=''>全部</option>	"  
    + "						                        </select>	"
    + "						                    </div>	"
    + "						                </div>	"
    + "						            </div>	"
    + "						            <div class='layui-col-md3'>	"
    + "						                <div class='grid-demo grid-demo-bg1'>	"
    + "						                    <label class='layui-form-label'>巡查状态</label>	"
    + "						                    <div class='layui-input-block'>	"
    + "						                        <select id='xsztSelect' name='xszt'>	"
    + "						                            <option value=''>全部</option>	"
    + "						                            <option value='0'>未处理</option>	"
    + "						                            <option value='1'>已处理</option>	"
    + "						                        </select>	"
    + "						                    </div>	"
    + "						                </div>	"
    + "						            </div>	"
    + "						            <div class='layui-col-md3'>	"
    + "						                <div class='grid-demo grid-demo-bg1'>	"
                + "						        <div style='position:absolute;right:25px;'>	"
                + "						            <button type='submit' class='layui-btn' lay-submit='' lay-filter='querylieFengsubmit' style='width:100px'>查询</button>	"
               + "						        </div>	"
    + "						                </div>	"
    + "						            </div>	"
    + "						        </div>	"
    + "						    </div>	"
   // + "						    <div class='layui-form-item' style='margin-top:20px;height: 40px'>	"
   // + "						        <div style='position:absolute;right:25px;'>	"
   // + "						            <button type='submit' class='layui-btn' lay-submit='' lay-filter='querylieFengsubmit' style='width:100px'>查询</button>	"
   //// + "						            <button type='Button' class='layui-btn layui-btn-normal' onclick='liefengkeshihua()' style='width:100px'>裂缝可视化</button>	"
   // + "						        </div>	"
   // + "						    </div>	"
    + "						</form>	"
    + "						<table class='layui-hide' id='lieFengtable-view' style='margin-top:20px' lay-filter='lieFengtable-view'></table>	"
    + "						<script type='text/html' id='lieFengButon'>                                                      "
    + "							<a class='layui-btn layui-btn-xs' lay-event='edit'>处理</a>                       "
    + "						</script>                                                                             "
    + "                                                                                                                                                              "
    + "             </div>                                                                                                                                           "
    + "                                                                                                                                                              "
    + "            <div class='layui-tab-item' >                                                                                                                      "
    + "                <!--基座巡查-->                                                                                                                               "
    + "					<form class='layui-form' style='margin-bottom:15px;margin-right:5px;' lay-filter='queryjiZuoinfoform'>	"
    + "						    <div class='layui-form-item'>	"
    + "						        <div class='layui-row'>	"
    + "						            <div class='layui-col-md3'>	"
    + "						                <div class='grid-demo grid-demo-bg1'>	"
    + "						                    <label class='layui-form-label'>项目名称</label>	"
    + "						                    <div class='layui-input-block'>	"
    + "						                        <input type='text' name='xmmc' autocomplete='off' placeholder='请输入' class='layui-input' />	"
    + "						                    </div>	"
    + "						                </div>	"
    + "						            </div>	"
    + "						            <div class='layui-col-md3'>	"
    + "						                <div class='grid-demo'>	"
    + "						                    <label class='layui-form-label'>分析区域</label>	"
    + "						                    <div class='layui-input-block'>	"
    + "						                        <input type='text' name='regionname' autocomplete='off' placeholder='请输入' class='layui-input' />	"
    + "						                    </div>	"
    + "						                </div>	"
    + "						            </div>	"
    + "						            <div class='layui-col-md3'>	"
    + "						                <div class='grid-demo grid-demo-bg1'>	"
    + "						                    <label class='layui-form-label'>巡查状态</label>	"
    + "						                    <div class='layui-input-block'>	"
    + "						                        <select id='xsztSelect' name='xszt'>	"
    + "						                            <option value=''>全部</option>	"
    + "						                            <option value='0'>未处理</option>	"
    + "						                            <option value='1'>已处理</option>	"
    + "						                        </select>	"
    + "						                    </div>	"
    + "						                </div>	"
    + "						            </div>	"
    + "						            <div class='layui-col-md3'>	"
    + "						                <div class='grid-demo grid-demo-bg1'>	"
    + "						        <div style='position:absolute;right:25px;'>	"
    + "						            <button type='submit' class='layui-btn' lay-submit='' lay-filter='queryjiZuosubmit' style='width:100px'>查询</button>	"
    + "						        </div>	"
    + "						                </div>	"
    + "						            </div>	"
    + "						        </div>	"
    + "						    </div>	"
    + "						</form>	"
    + "						<table class='layui-hide' id='jiZuotable-view' style='margin-top:20px' lay-filter='jiZuotable-view'></table>	"
    + "						<script type='text/html' id='jiZuoButon'>                                                      "
    + "							<a class='layui-btn layui-btn-xs' lay-event='edit'>处理</a>                       "
    + "						</script>                                                                             "
  //  + "                 <div  id='jiZuoXunShiTree'></div>                                                                                                                                             "
    + "            </div>                                                                                                                                            "
    + "            <div class='layui-tab-item' >                                                                                                                      "
    + "                <!--报告下载-->                                                                                                                               "
    + "					<form class='layui-form' style='margin-bottom:15px;margin-right:5px;' lay-filter='downWordinfoform'>	"
    + "						    <div class='layui-form-item'>	"
    + "						        <div class='layui-row'>	"
    + "						            <div class='layui-col-md6'>	"
    + "						                <div class='grid-demo grid-demo-bg1'>	"
    + "						                     <div style='position:absolute;right:25px;'>	"
    + "						                        <button type='submit' class='layui-btn' lay-submit='' lay-filter='downWord' style='width:100px'>旬报下载</button>	"
    + "						                     </div>	"
    + "						                </div>	"
    + "						            </div>	"
    + "						        </div>	"
    + "						    </div>	"
    + "						</form>	"
    //  + "                 <div  id='jiZuoXunShiTree'></div>                                                                                                                                             "
    + "            </div>                                                                                                                                            "
    + "            <div class='layui-tab-item'>                                                                                                                      "
    + "            <!--照片巡查-->                                                                                                                                   "
    + "					<form class='layui-form' style='margin-bottom:15px;margin-right:5px;' lay-filter='queryrenXuninfoform'>	"
    + "						    <div class='layui-form-item'>	"
    + "						        <div class='layui-row'>	"
    + "						            <div class='layui-col-md3'>	"
    + "						                <div class='grid-demo grid-demo-bg1'>	"
    + "						                    <label class='layui-form-label'>影像名称</label>	"
    + "						                    <div class='layui-input-block'>	"
    + "						                        <input type='text' name='yxmc' autocomplete='off' placeholder='请输入' class='layui-input' />	"
    + "						                    </div>	"
    + "						                </div>	"
    + "						            </div>	"
    + "						            <div class='layui-col-md3'>	"
    + "						                <div class='grid-demo'>	"
    + "						                    <label class='layui-form-label'>目标</label>	"
    + "						                    <div class='layui-input-block'>	"
    + "						                        <select id='targetIdSelect' name='targetId' lay-filter='targetId'>	"
    + "						                            <option value=''>全部</option>	"
    + "						                        </select>	"
    + "						                    </div>	"
    + "						                </div>	"
    + "						            </div>	"
    + "						            <div class='layui-col-md3'>	"
    + "						                <div class='grid-demo grid-demo-bg1'>	"
    + "						                    <label class='layui-form-label'>巡查状态</label>	"
    + "						                    <div class='layui-input-block'>	"
    + "						                        <select id='xsztSelect' name='xszt'>	"
    + "						                            <option value=''>全部</option>	"
    + "						                            <option value='0'>未处理</option>	"
    + "						                            <option value='1'>已处理</option>	"
    + "						                        </select>	"
    + "						                    </div>	"
    + "						                </div>	"
    + "						            </div>	"
    + "						            <div class='layui-col-md3'>	"
    + "						                <div class='grid-demo grid-demo-bg1'>	"
    + "						        <div style='position:absolute;right:25px;'>	"
    + "						            <button type='submit' class='layui-btn' lay-submit='' lay-filter='queryrenXunsubmit' style='width:100px'>查询</button>	"
    + "						        </div>	"
    + "						                </div>	"
    + "						            </div>	"
    + "						        </div>	"
    + "						    </div>	"
    + "						</form>	"
    + "						<table class='layui-hide' id='renXuntable-view' style='margin-top:20px' lay-filter='renXuntable-view'></table>	"
    + "						<script type='text/html' id='renXunButon'>                                                      "
    + "							<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>                       "
    + "						</script>                                                                             "
    + "                       <style type='text/css'> .layui-table-cell{text-align:center;height:auto;white-space:normal; } .layui-table img{ max-width:400px;max-height: 200px;} </style>  "
    + "             </div>                                                                                                                                           "
    + "        </div>                                                                                                                                                "
 //   + "    </div>                                                                                                                                                    "
    + "</div>";
//lay-verify='required|number'
var chuLiXunShiHtml = "	<form class='layui-form' style='margin-top:5px;margin-right:5px;' lay-filter='chuLiXunShiform'>	"
    + "	    <div class='layui-form-item'>	"
    + "<ul id='dowebok'> "

    + "         <li style='display: inline-block'><img id ='chuLiXunShi'   style='width:819px; height:646px;margin-left: 40px' alt='图片1' /></li>" 
    + "         <li style='display: inline-block'><img id ='duiBitui' onload='loadImage()'  style='width:410px; height:323px;margin-left: 10px' alt='图片2' /></li>" 
    + "</ul> "
    + "	    </div>	"
    + "	    <div class='layui-form-item'>	"
    + "	        <div class='layui-row'>	"
    + "	            <div class='layui-col-md6'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <div class='layui-inline'>	"
    + "	                        <label class='layui-form-label'>是否比对</label><div class='layui-input-inline' style='width:250px;'>	"
    + "	                            <input type='checkbox' name='close' lay-filter='switch-type' lay-skin='switch' lay-text='是|否'>	"
    + "	                        </div>	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div id='selectNumDiv' class='layui-col-md6'>	"
    + "	                <div class='grid-demo'>	"
    + "	                    <div class='layui-inline'>	"
    + "	                        <label class='layui-form-label'>选择期数</label>	"
    + "	                        <div class='layui-input-inline' style='width:250px;'>	"
    + "						                        <select id='duiBiSelect' style='width:150px'  name='duiBiSelectname' lay-filter='duiBiSelectname'>	"

    + "						                        </select>	"
    + "	                        </div>	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	        </div>	"
    + "	    </div>	"
    //+ "	    <div class='layui-form-item'>	"
    //+ "	        <div class='layui-row'>	"
    //+ "	            <div class='layui-col-md3'>	"
    //+ "	                <div class='grid-demo grid-demo-bg1'>	"
    //+ "	                    <div class='layui-inline'>	"
    //+ "	                        <label class='layui-form-label'>防雷装置</label><div class='layui-input-inline' style='width:80px;'>	"
    //+ "	                            <input type='checkbox' name='flzz' value='1' lay-skin='switch' lay-text='正常|破坏'> "
    //+ "	                        </div>	"
    //+ "	                    </div>	"
    //+ "	                </div>	"
    //+ "	            </div>	"
    //+ "	            <div class='layui-col-md3'>	"
    //+ "	                <div class='grid-demo'>	"
    //+ "	                    <div class='layui-inline'>	"
    //+ "	                        <label class='layui-form-label'>太阳能板</label>	"
    //+ "	                        <div class='layui-input-inline' style='width:80px;'>	"
    //+ "	                            <input type='checkbox' name='tynzd' value='1'  lay-skin='switch' lay-text='正常|破坏'>	"
    //+ "	                        </div>	"
    //+ "	                    </div>	"
    //+ "	                </div>	"
    //+ "	            </div>	"
    //+ "	            <div class='layui-col-md3'>	"
    //+ "	                <div class='grid-demo grid-demo-bg1'>	"
    //+ "	                    <div class='layui-inline'>	"
    //+ "	                        <label class='layui-form-label'>采集箱</label><div class='layui-input-inline' style='width:80px;'>	"
    //+ "	                             <input type='checkbox' name='patrolDesc' value='1'  lay-skin='switch' lay-text='正常|破坏'>	"
    //+ "	                        </div>	"
    //+ "	                    </div>	"
    //+ "	                </div>	"
    //+ "	            </div>	"
    //+ "	            <div class='layui-col-md3'>	"
    //+ "	                <div class='grid-demo'>	"
    //+ "	                    <div class='layui-inline'>	"
    //+ "	                        <label class='layui-form-label'>标志标牌</label>	"
    //+ "	                        <div class='layui-input-inline' style='width:80px;'>	"
    //+ "	                            <input type='checkbox' name='bzwh' lay-verify='required' value='1'  lay-skin='switch' lay-text='正常|破坏' />	"
    //+ "	                        </div>	"
    //+ "	                    </div>	"
    //+ "	                </div>	"
    //+ "	            </div>	"
    //+ "	        </div>	"
    //+ "	    </div>	"
    //+ "	    <div class='layui-form-item'>	"
    //+ "	        <div class='layui-row'>	"
    //+ "	            <div class='layui-col-md3'>	"
    //+ "	                <div class='grid-demo grid-demo-bg1'>	"
    //+ "	                    <div class='layui-inline'>	"
    //+ "	                        <label class='layui-form-label'>监测立柱</label><div class='layui-input-inline' style='width:80px;'>	"
    //+ "	                            <input type='checkbox' name='jclz'  lay-skin='switch' value='1' lay-text='正常|破坏'> "
    //+ "	                        </div>	"
    //+ "	                    </div>	"
    //+ "	                </div>	"
    //+ "	            </div>	"
    //+ "	            <div class='layui-col-md3'>	"
    //+ "	                <div class='grid-demo'>	"
    //+ "	                    <div class='layui-inline'>	"
    //+ "	                        <label class='layui-form-label'>立柱基础</label>	"
    //+ "	                        <div class='layui-input-inline' style='width:80px;'>	"
    //+ "	                            <input type='checkbox' name='equipmentDesc'  value='1' lay-skin='switch' lay-text='正常|破坏'>	"
    //+ "	                        </div>	"
    //+ "	                    </div>	"
    //+ "	                </div>	"
    //+ "	            </div>	"
    //+ "	            <div class='layui-col-md3'>	"
    //+ "	                <div class='grid-demo grid-demo-bg1'>	"
    //+ "	                    <div class='layui-inline'>	"
    //+ "	                        <label class='layui-form-label'>通信线缆</label><div class='layui-input-inline' style='width:80px;'>	"
    //+ "	                             <input type='checkbox' name='txxlph'  value='1' lay-skin='switch' lay-text='正常|破坏'>	"
    //+ "	                        </div>	"
    //+ "	                    </div>	"
    //+ "	                </div>	"
    //+ "	            </div>	"
    //+ "	            <div class='layui-col-md3'>	"
    //+ "	                <div class='grid-demo'>	"
    //+ "	                    <div class='layui-inline'>	"
    //+ "	                        <label class='layui-form-label'>传感器</label>	"
    //+ "	                        <div class='layui-input-inline' style='width:80px;'>	"
    //+ "	                            <input type='checkbox' name='cgqgr' value='1' lay-verify='required'  lay-skin='switch' lay-text='正常|破坏' />	"
    //+ "	                        </div>	"
    //+ "	                    </div>	"
    //+ "	                </div>	"
    //+ "	            </div>	"
    //+ "	        </div>	"
    //+ "	    </div>	"
    + "	    <div class='layui-form-item'>	"
    + "	        <div class='layui-row'>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <div class='layui-inline'>	"
    + "	                        <label class='layui-form-label'>防雷装置</label><div class='layui-input-inline' style='width:80px;'>	"
    + "	                            <input type='checkbox' name='flzz' value='1' lay-skin='switch' lay-text='正常|破坏'> "
    + "	                        </div>	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo'>	"
    + "	                    <div class='layui-inline'>	"
    + "	                        <label class='layui-form-label'>太阳能板</label>	"
    + "	                        <div class='layui-input-inline' style='width:80px;'>	"
    + "	                            <input type='checkbox' name='tynzd' value='1'  lay-skin='switch' lay-text='正常|破坏'>	"
    + "	                        </div>	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <div class='layui-inline'>	"
    + "	                        <label class='layui-form-label'>采集箱</label><div class='layui-input-inline' style='width:80px;'>	"
    + "	                             <input type='checkbox' name='patrolDesc' value='1'  lay-skin='switch' lay-text='正常|破坏'>	"
    + "	                        </div>	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	        </div>	"
    + "	    </div>	"
    + "	    <div class='layui-form-item'>	"
    + "	        <div class='layui-row'>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo'>	"
    + "	                    <div class='layui-inline'>	"
    + "	                        <label class='layui-form-label'>标志标牌</label>	"
    + "	                        <div class='layui-input-inline' style='width:80px;'>	"
    + "	                            <input type='checkbox' name='bzwh' lay-verify='required' value='1'  lay-skin='switch' lay-text='正常|破坏' />	"
    + "	                        </div>	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <div class='layui-inline'>	"
    + "	                        <label class='layui-form-label'>监测立柱</label><div class='layui-input-inline' style='width:80px;'>	"
    + "	                            <input type='checkbox' name='jclz'  lay-skin='switch' value='1' lay-text='正常|破坏'> "
    + "	                        </div>	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo'>	"
    + "	                    <div class='layui-inline'>	"
    + "	                        <label class='layui-form-label'>立柱基础</label>	"
    + "	                        <div class='layui-input-inline' style='width:80px;'>	"
    + "	                            <input type='checkbox' name='equipmentDesc'  value='1' lay-skin='switch' lay-text='正常|破坏'>	"
    + "	                        </div>	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	        </div>	"
    + "	    </div>	"
    + "	    <div class='layui-form-item'>	"
    + "	        <div class='layui-row'>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <div class='layui-inline'>	"
    + "	                        <label class='layui-form-label'>通信线缆</label><div class='layui-input-inline' style='width:80px;'>	"
    + "	                             <input type='checkbox' name='txxlph'  value='1' lay-skin='switch' lay-text='正常|破坏'>	"
    + "	                        </div>	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo'>	"
    + "	                    <div class='layui-inline'>	"
    + "	                        <label class='layui-form-label'>传感器</label>	"
    + "	                        <div class='layui-input-inline' style='width:80px;'>	"
    + "	                            <input type='checkbox' name='cgqgr' value='1' lay-verify='required'  lay-skin='switch' lay-text='正常|破坏' />	"
    + "	                        </div>	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo'>	"
    + "	                    <div class='layui-inline'>	"
    + "	                        <label class='layui-form-label'>异物入侵</label>	"
    + "	                        <div class='layui-input-inline' style='width:80px;'>	"
    + "	                            <input type='checkbox' name='photoName' value='1' lay-verify='required'  lay-skin='switch' lay-text='正常|破坏' />	"
    + "	                        </div>	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	        </div>	"
    + "	    </div>	"
    + "	    <div class='layui-form-item'>	"
    + "	        <label class='layui-form-label'>巡查结果</label>	"
    + "	        <div class='layui-input-block'>	"
    + "	            <textarea type='text' name='patrolResult' autocomplete='off' placeholder='请输入' style='width:690px'  class='layui-textarea' ></textarea>	"
    + "	        </div>	"
    + "	    </div>	"
    + "	    <div class='layui-form-item' style='margin:10px 0px 0px 0px;'>	"
    + "	        <div style='position:absolute;right:360px;height: 60px;'>	"
    //+ "	            <button type='reset' class='layui-btn layui-btn-primary' style='width:100px'>重置</button>	"
    + "	            <button type='submit' class='layui-btn' lay-submit='' lay-filter='chuLiXunShisubmit' style='width:100px'>提交</button>	"
    + "	        </div>	"
    + "	    </div>	"
    + "	</form>	";


var lieFengHtml = "	<form class='layui-form' style='margin-top:5px;margin-right:5px;' lay-filter='lieFengform'>	"
    + "	<div class='layui-tab layui-tab-brief' >								"
    + "		<ul class='layui-tab-title'>							"
    + "			<li lay-id='111111' class='layui-this' style='width:30%;padding-top: 10px;'>裂缝数据可视化</li>						"
    + "			<li lay-id='222222' style='width:30%;padding-top: 10px;'>照片查看</li>						"
    + "		</ul>							"
    + "		<div class='layui-tab-content'>							"
    + "			<div class='layui-tab-item layui-show'>						"
    + "       	   <div id = 'imagedatachart'  style = 'width:790px;height:540px'></div> "
    + "			</div>						"
    + "			<div class='layui-tab-item'>						"
            + "	    <div class='layui-form-item'>	"
                    + "<ul id='dowebok'> "
    + "                  <li style='display: inline-block'><img id ='lieFengChuli'  style='width:819px; height:646px;margin-left: 40px'  alt='图片1' /></li>"
    + "                  <li style='display: inline-block'><img id ='lieFengduiBitui' onload='loadLieImage()' style='width:410px; height:323px;margin-left: 10px'  alt='图片2' /></li>"
                    + "</ul> "
            + "	    </div>	"
            + "	    <div class='layui-form-item'>	"
            + "	        <div class='layui-row'>	"
            + "	            <div class='layui-col-md6'>	"
            + "	                <div class='grid-demo grid-demo-bg1'>	"
            + "	                    <div class='layui-inline'>	"
            + "	                        <label class='layui-form-label'>是否比对</label><div class='layui-input-inline' style='width:250px;'>	"
            + "	                            <input type='checkbox' name='close' lay-filter='lieFengswitch-type' lay-skin='switch' lay-text='是|否'>	"
            + "	                        </div>	"
            + "	                    </div>	"
            + "	                </div>	"
            + "	            </div>	"
            + "	            <div id='lieFengselectNumDiv' class='layui-col-md6'>	"
            + "	                <div class='grid-demo'>	"
            + "	                    <div class='layui-inline'>	"
            + "	                        <label class='layui-form-label'>选择期数</label>	"
            + "	                        <div class='layui-input-inline' style='width:250px;'>	"
            + "						                        <select id='lieFengduiBiSelect' style='width:150px'  name='duiBiSelectname' lay-filter='lieFengduiBiSelectname'>	"

            + "						                        </select>	"
            + "	                        </div>	"
            + "	                    </div>	"
            + "	                </div>	"
            + "	            </div>	"
            + "	        </div>	"
            + "	    </div>	"
    + "			</div>						"
    + "		</div>							"
    + "	</div>								"
    + "	    <div class='layui-form-item'>	"
    + "	        <label class='layui-form-label'>巡查结果</label>	"
    + "	        <div class='layui-input-block'>	"
    + "	            <input type='text' name='xsjg' autocomplete='off' lay-verify='required' placeholder='请输入' style='width:690px'  class='layui-input' />	"
    + "	        </div>	"
    + "	    </div>	"
    + "	    <div class='layui-form-item' style='margin:10px 0px 0px 0px;'>	"
    + "	        <div style='position:absolute;right:360px;height: 60px;'>	"
    + "	            <button type='submit' class='layui-btn' lay-submit='' lay-filter='lieFengsubmit' style='width:100px'>提交</button>	"
    + "	        </div>	"
    + "	    </div>	"
    + "	</form>	";
var jiZuoHtml = "	<form class='layui-form' style='margin-top:5px;margin-right:5px;' lay-filter='jiZuoform'>	"
    + "	<div class='layui-tab layui-tab-brief' >	"
    + "		<ul class='layui-tab-title'>							"
    + "			<li lay-id='333' class='layui-this' style='width:30%;padding-top: 10px;'>点云数据</li>						"
    + "			<li lay-id='444' style='width:30%;padding-top: 10px;'>重点掉块显示</li>						"
    + "		</ul>							"
    + "		<div class='layui-tab-content'>	"
    + "			<div class='layui-tab-item layui-show'>						"
    + "	            <div class='layui-form-item' id='dianYunShuJu' style='height: 500px;'>	"
    + "	            </div>	"
            + "	    <div class='layui-form-item'>	"
            + "	        <div class='layui-row'>	"
            + "	            <div class='layui-col-md6' id='dianYunSelectNumDivShuJu'>	"
            + "	                <div class='grid-demo grid-demo-bg1'>	"
            + "	                    <div class='layui-inline'>	"
                            + "	        <label class='layui-form-label'>点云</label>	"
                            + "	        <div class='layui-input-block'>	"
                            + "				<select id='dianYunShuJuXssj'   name='dianYunXssj'  lay-filter='dianYunXssjSelect'>	"
                            + "				</select>	"
                            + "	        </div>	"
            + "	                    </div>	"
            + "	                </div>	"
            + "	            </div>	"
            + "	            <div class='layui-col-md6' id='dianYunDescDivShuJu'>	"
            + "	                <div class='grid-demo grid-demo-bg1'>	"
            + "	                    <div class='layui-inline'>	"
                            + "	        <label class='layui-form-label'>备注</label>	"
                            + "	        <div class='layui-input-block'>	"
                            + "	            <input type='text' name='dianYunShujuDesc'   style='width: 250px'   class='layui-input' />	"
                            + "	        </div>	"
            + "	                    </div>	"
            + "	                </div>	"
            + "	            </div>	"
            + "	        </div>	"
            + "	    </div>	"
    + "	       </div>	"
    + "			<div class='layui-tab-item'>						"
    + "	    <div class='layui-form-item' id='dianYunModel' style='height: 500px;'>	"
            + "	    </div>	"
            + "	    <div class='layui-form-item'>	"
            + "	        <div class='layui-row'>	"
            + "	            <div class='layui-col-md6' id='dianYunSelectNumDiv'>	"
            + "	                <div class='grid-demo grid-demo-bg1'>	"
            + "	                    <div class='layui-inline'>	"
                            + "	        <label class='layui-form-label'>点云对比期</label>	"
                            + "	        <div class='layui-input-block'>	"
                            + "				<select id='dianYunSourceXssj'   name='sourceXssj'  lay-filter='dianYunduiBiSelectname'>	"
                            + "				</select>	"
                            + "	        </div>	"
            + "	                    </div>	"
            + "	                </div>	"
            + "	            </div>	"
            + "	            <div class='layui-col-md6' id='dianYunDescDiv'>	"
            + "	                <div class='grid-demo grid-demo-bg1'>	"
            + "	                    <div class='layui-inline'>	"
                            + "	        <label class='layui-form-label'>备注</label>	"
                            + "	        <div class='layui-input-block'>	"
                            + "	            <input type='text' name='dianYunDesc' autocomplete='off' placeholder='请输入'  style='width: 250px'   class='layui-input' />	"
                            + "	        </div>	"
            + "	                    </div>	"
            + "	                </div>	"
            + "	            </div>	"
            + "	        </div>	"
            + "	    </div>	"
    + "	       </div>	"
    + "	    </div>	"
    + "	    </div>	"
    + "	    <div class='layui-form-item'>	"
    + "	        <label class='layui-form-label'>巡查结果</label>	"
    + "	        <div class='layui-input-block'>	"
    + "	            <input type='text' name='xsjg' autocomplete='off' lay-verify='required' placeholder='请输入' style='width:690px'  class='layui-input' />	"
    + "	        </div>	"
    + "	    </div>	"



        + "	    <div class='layui-form-item' style='margin:10px 0px 0px 0px;'>	"
        + "	        <div style='position:absolute;right:360px;height: 60px;'>	"
        + "	            <button type='submit' class='layui-btn' lay-submit='' lay-filter='jiZuosubmit' style='width:100px'>提交</button>	"
        + "	        </div>	"
        + "	    </div>	"
        + "	</form>	";

