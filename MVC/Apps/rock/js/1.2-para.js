/*
 * 异步获取系统参数
 */
var xmlxs = [];                                     //项目类型
var xmlbs = [];                                     //项目类别
var srids = [];                                     //坐标系
var xjxzqs = [];                                    //县级行政区
var zhlxs = [];                                     //灾害类型
var zhdjs = [];                                     //灾害等级
var zhxqs = [];                                     //灾害险情
var yjjbs = [];                                     //预警级别
var jcjbs = [];                                     //监测级别
var jcsds = [];                                     //监测手段
var mjdws = [];                                     //面积单位
var tjdws = [];                                     //体积单位

var pmlxs = [];                                     //剖面类型
var pmdjs = [];                                     //剖面等级

var jcffs = [];                                     //监测方法
var jczlxs = [];                                    //监测点类型(GNSS 基站/监测站)

var wyydxss = [];                                   //崩塌（危岩体）运动形式
var wybtlxs = [];                                   //崩塌（危岩体）崩塌类型
var wykzjgmlxs = [];                                //崩塌（危岩体）控制结构面类型
var wyhgwdxpjs = [];                                //崩塌（危岩体）宏观稳定性评价
var wyhtzts = [];                                   //崩塌（危岩体）活动状态
var wybtykzfss = [];                                //崩塌（危岩体）崩塌源扩展方式
var wyyfyss = [];                                   //崩塌（危岩体）诱发因素
var wygmdjs = [];                                   //崩塌（危岩体）规模等级
var wyqdxcds = [];                                  //崩塌（危岩体）确定性程度
var wyzqdjs = [];                                   //崩塌（危岩体）灾情等级
var wyxqdjs = [];                                   //崩塌（危岩体）险情等级
var wywxdxs = [];                                   //崩塌（危岩体）威胁对象

var wyphmss = [];                                   //危岩破坏模式
var wyphmsyls = [];                                 //危岩破坏模式亚类
var wypjgss = [];                                   //危岩崩塌判据公式
var yjzts = [];                                     //预警状态
var yjtjs = [];                                     //预警条件

var lfpjs = [];                                     //裂缝判据
var qjpjs = [];                                     //倾角判据
var ylpjs = [];                                     //应力判据

//当前用户
var userInfo = null;
var userList = [];//所有的陡崖系统监测员


var autodatadatetimes = [];                          //自动化监测数据时间范围（预设）

//var htmlOverlay = document.getElementById('test');
//var scratch = new Cesium.Cartesian2();

var loadingceindex = layer.load(0, { shade: 0.2, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

$.ajax({
    url: servicesurl + "/api/Parameter/GetXJXZQ", type: "get",
    success: function (data) {
        var xjxzqdata = JSON.parse(data);
        for (var i in xjxzqdata) {
            var xjxzq = new Object;
            xjxzq.name = xjxzqdata[i].Name;
            xjxzq.value = xjxzqdata[i].Code;
            xjxzqs.push(xjxzq);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/User/GetUser", type: "get", data: { "cookie": document.cookie },
    success: function (data) {
        var result = JSON.parse(data);
        if (result.code == 1) {
            var user = JSON.parse(result.data);
            userInfo = user;
            console.log(userInfo);
        }
    }, datatype: "json"
}); 
//获取用户信息

$.ajax({
    url: servicesurl + "/api/User/GetRockUserInfo", type: "get",
    success: function (data) {
        if (data == "") {
            layer.msg("无陡崖用户信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            curuserid = null;
        }
        else {
            userList = JSON.parse(data);
            console.log(userList);
        }
    }, datatype: "json"
});
//获取魔心路劲
$.ajax({
    url: servicesurl + "/api/RockDesign/getModelurl", type: "get", data: { "windowName": "CCXJ6-2" },
    success: function (data) {
        console.log(data);
        if (data == "") {
            console.log(111111);
        }
        else {
            console.log(222222); 

        }
    }, datatype: "json"
});


layer.close(loadingceindex);


function hideContextmenu() {

    window.event.returnValue = false;

}

