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





var autodatadatetimes = [];                          //自动化监测数据时间范围（预设）

//var htmlOverlay = document.getElementById('test');
//var scratch = new Cesium.Cartesian2();
//viewer.scene.preRender.addEventListener(function () {
//    var position = Cesium.Cartesian3.fromDegrees(109.919898, 31.066);
//    var canvasPosition = viewer.scene.cartesianToCanvasCoordinates(position, scratch);
//    if (Cesium.defined(canvasPosition)) {
//        htmlOverlay.style.top = canvasPosition.y + 'px';
//        htmlOverlay.style.left = canvasPosition.x + 'px';
//    }
//});

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

function hideContextmenu() {

    window.event.returnValue = false;

}

//$.ajax({
//    url: servicesurl + "/api/FlzWordWxpert/GetWordMLHelper", type: "get",
//    success: function (data) {
//        //console.log(01111);
//       // window.location.href = 'http://www.cq107chy.com:1519/test2.docx';
//        //

       
//    }, datatype: "json"
//});

function hideContextmenu() {

    window.event.returnValue = false;

}

