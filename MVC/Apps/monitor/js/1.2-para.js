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


$.ajax({
    url: servicesurl + "/api/Parameter/GetXMLX", type: "get",
    success: function (data) {
        //var xmlxdata = JSON.parse(data);
        //for (var i in xmlxdata) {
        //    var xmlx = new Object;
        //    xmlx.name = xmlxdata[i][0];
        //    xmlx.value = xmlxdata[i][1];
        //    xmlxs.push(xmlx);
        //}
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetXMLB", type: "get",
    success: function (data) {
        var xmlbdata = JSON.parse(data);
        for (var i in xmlbdata) {
            var xmlb = new Object;
            xmlb.name = xmlbdata[i][0];
            xmlb.value = xmlbdata[i][1];
            xmlbs.push(xmlb);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetSRID", type: "get",
    success: function (data) {
        var sriddata = JSON.parse(data);
        for (var i in sriddata) {
            var srid = new Object;
            srid.name = sriddata[i].NAME;
            srid.value = sriddata[i].SRID;
            srids.push(srid);
        }
    }, datatype: "json"
});
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
    url: servicesurl + "/api/Parameter/GetZHLX", type: "get",
    success: function (data) {
        var zhlxdata = JSON.parse(data);
        for (var i in zhlxdata) {
            var zhlx = new Object;
            zhlx.name = zhlxdata[i][0];
            zhlx.value = zhlxdata[i][1];
            zhlxs.push(zhlx);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetZHDJ", type: "get",
    success: function (data) {
        var zhdjdata = JSON.parse(data);
        for (var i in zhdjdata) {
            var zhdj = new Object;
            zhdj.name = zhdjdata[i][0];
            zhdj.value = zhdjdata[i][1];
            zhdjs.push(zhdj);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetZHXQ", type: "get",
    success: function (data) {
        var zhxqdata = JSON.parse(data);
        for (var i in zhxqdata) {
            var zhxq = new Object;
            zhxq.name = zhxqdata[i][0];
            zhxq.value = zhxqdata[i][1];
            zhxqs.push(zhxq);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetYJJB", type: "get",
    success: function (data) {
        var yjjbdata = JSON.parse(data);
        for (var i in yjjbdata) {
            var yjjb = new Object;
            yjjb.name = yjjbdata[i][0];
            yjjb.value = yjjbdata[i][1];
            yjjbs.push(yjjb);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetJCJB", type: "get",
    success: function (data) {
        var jcjbdata = JSON.parse(data);
        for (var i in jcjbdata) {
            var jcjb = new Object;
            jcjb.name = jcjbdata[i][0];
            jcjb.value = jcjbdata[i][1];
            jcjbs.push(jcjb);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetJCSD", type: "get",
    success: function (data) {
        var jcsddata = JSON.parse(data);
        for (var i in jcsddata) {
            var jcsd = new Object;
            jcsd.name = jcsddata[i][0];
            jcsd.value = jcsddata[i][1];
            jcsds.push(jcsd);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetMJDW", type: "get",
    success: function (data) {
        var mjdwdata = JSON.parse(data);
        for (var i in mjdwdata) {
            var mjdw = new Object;
            mjdw.name = mjdwdata[i][0];
            mjdw.value = mjdwdata[i][1];
            mjdws.push(mjdw);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetTJDW", type: "get",
    success: function (data) {
        var tjdwdata = JSON.parse(data);
        for (var i in tjdwdata) {
            var tjdw = new Object;
            tjdw.name = tjdwdata[i][0];
            tjdw.value = tjdwdata[i][1];
            tjdws.push(tjdw);
        }
    }, datatype: "json"
});

$.ajax({
    url: servicesurl + "/api/Parameter/GetPMLX", type: "get",
    success: function (data) {
        var pmlxdata = JSON.parse(data);
        for (var i in pmlxdata) {
            var pmlx = new Object;
            pmlx.name = pmlxdata[i][0];
            pmlx.value = pmlxdata[i][1];
            pmlxs.push(pmlx);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetPMDJ", type: "get",
    success: function (data) {
        var pmdjdata = JSON.parse(data);
        for (var i in pmdjdata) {
            var pmdj = new Object;
            pmdj.name = pmdjdata[i][0];
            pmdj.value = pmdjdata[i][1];
            pmdjs.push(pmdj);
        }
    }, datatype: "json"
});

$.ajax({
    url: servicesurl + "/api/Parameter/GetJCFF", type: "get",
    success: function (data) {
        var jcffdata = JSON.parse(data);
        for (var i in jcffdata) {
            var jcff = new Object;
            jcff.name = jcffdata[i][0];
            jcff.value = jcffdata[i][1];
            jcffs.push(jcff);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetJCZLX", type: "get",
    success: function (data) {
        var jczlxdata = JSON.parse(data);
        for (var i in jczlxdata) {
            var jczlx = new Object;
            jczlx.name = jczlxdata[i][0];
            jczlx.value = jczlxdata[i][1];
            jczlxs.push(jczlx);
        }
    }, datatype: "json"
});

$.ajax({
    url: servicesurl + "/api/Parameter/GetWYYDXS", type: "get",
    success: function (data) {
        var wyydxsdata = JSON.parse(data);
        for (var i in wyydxsdata) {
            var wyydxs = new Object;
            wyydxs.name = wyydxsdata[i][0];
            wyydxs.value = wyydxsdata[i][1];
            wyydxss.push(wyydxs);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetWYBTLX", type: "get",
    success: function (data) {
        var wybtlxdata = JSON.parse(data);
        for (var i in wybtlxdata) {
            var wybtlx = new Object;
            wybtlx.name = wybtlxdata[i][0];
            wybtlx.value = wybtlxdata[i][1];
            wybtlxs.push(wybtlx);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetWYKZJGMLX", type: "get",
    success: function (data) {
        var wykzjgmlxdata = JSON.parse(data);
        for (var i in wykzjgmlxdata) {
            var wykzjgmlx = new Object;
            wykzjgmlx.name = wykzjgmlxdata[i][0];
            wykzjgmlx.value = wykzjgmlxdata[i][1];
            wykzjgmlxs.push(wykzjgmlx);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetWYHGWDXPJ", type: "get",
    success: function (data) {
        var wyhgwdxpjdata = JSON.parse(data);
        for (var i in wyhgwdxpjdata) {
            var wyhgwdxpj = new Object;
            wyhgwdxpj.name = wyhgwdxpjdata[i][0];
            wyhgwdxpj.value = wyhgwdxpjdata[i][1];
            wyhgwdxpjs.push(wyhgwdxpj);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetWYHDZT", type: "get",
    success: function (data) {
        var wyhtztdata = JSON.parse(data);
        for (var i in wyhtztdata) {
            var wyhtzt = new Object;
            wyhtzt.name = wyhtztdata[i][0];
            wyhtzt.value = wyhtztdata[i][1];
            wyhtzts.push(wyhtzt);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetWYBTYKZFS", type: "get",
    success: function (data) {
        var wybtykzfsdata = JSON.parse(data);
        for (var i in wybtykzfsdata) {
            var wybtykzfs = new Object;
            wybtykzfs.name = wybtykzfsdata[i][0];
            wybtykzfs.value = wybtykzfsdata[i][1];
            wybtykzfss.push(wybtykzfs);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetWYYFYS", type: "get",
    success: function (data) {
        var wyyfysdata = JSON.parse(data);
        for (var i in wyyfysdata) {
            var wyyfys = new Object;
            wyyfys.name = wyyfysdata[i][0];
            wyyfys.value = wyyfysdata[i][1];
            wyyfyss.push(wyyfys);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetWYGMDJ", type: "get",
    success: function (data) {
        var wygmdjdata = JSON.parse(data);
        for (var i in wygmdjdata) {
            var wygmdj = new Object;
            wygmdj.name = wygmdjdata[i][0];
            wygmdj.value = wygmdjdata[i][1];
            wygmdjs.push(wygmdj);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetWYQDXCD", type: "get",
    success: function (data) {
        var wyqdxcddata = JSON.parse(data);
        for (var i in wyqdxcddata) {
            var wyqdxcd = new Object;
            wyqdxcd.name = wyqdxcddata[i][0];
            wyqdxcd.value = wyqdxcddata[i][1];
            wyqdxcds.push(wyqdxcd);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetWYZQDJ", type: "get",
    success: function (data) {
        var wyzqdjdata = JSON.parse(data);
        for (var i in wyzqdjdata) {
            var wyzqdj = new Object;
            wyzqdj.name = wyzqdjdata[i][0];
            wyzqdj.value = wyzqdjdata[i][1];
            wyzqdjs.push(wyzqdj);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetWYXQDJ", type: "get",
    success: function (data) {
        var wyxqdjdata = JSON.parse(data);
        for (var i in wyxqdjdata) {
            var wyxqdj = new Object;
            wyxqdj.name = wyxqdjdata[i][0];
            wyxqdj.value = wyxqdjdata[i][1];
            wyxqdjs.push(wyxqdj);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetWYWXDX", type: "get",
    success: function (data) {
        var wywxdxdata = JSON.parse(data);
        for (var i in wywxdxdata) {
            var wywxdx = new Object;
            wywxdx.name = wywxdxdata[i][0];
            wywxdx.value = wywxdxdata[i][1];
            wywxdxs.push(wywxdx);
        }
    }, datatype: "json"
});

$.ajax({
    url: servicesurl + "/api/Parameter/GetWYPHMS", type: "get",
    success: function (data) {
        var wyphmsdata = JSON.parse(data);
        for (var i in wyphmsdata) {
            var wyphms = new Object;
            wyphms.name = wyphmsdata[i][0];
            wyphms.value = wyphmsdata[i][1];
            wyphmss.push(wyphms);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetWYPHMSYL", type: "get",
    success: function (data) {
        var wyphmsyldata = JSON.parse(data);
        for (var i in wyphmsyldata) {
            var wyphmsyl = new Object;
            wyphmsyl.name = wyphmsyldata[i][0];
            wyphmsyl.value = wyphmsyldata[i][1];
            wyphmsyls.push(wyphmsyl);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetWYBTLJTJPJGS", type: "get",
    success: function (data) {
        var wypjgsdata = JSON.parse(data);
        for (var i in wypjgsdata) {
            var wypjgs = new Object;
            wypjgs.name = wypjgsdata[i][0];
            wypjgs.value = wypjgsdata[i][1];
            wypjgss.push(wypjgs);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetYJZT", type: "get",
    success: function (data) {
        var yjztdata = JSON.parse(data);
        for (var i in yjztdata) {
            var yjzt = new Object;
            yjzt.name = yjztdata[i][0];
            yjzt.value = yjztdata[i][1];
            yjzts.push(yjzt);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetYJTJ", type: "get",
    success: function (data) {
        var yjtjdata = JSON.parse(data);
        for (var i in yjtjdata) {
            var yjtj = new Object;
            yjtj.name = yjtjdata[i][0];
            yjtj.value = yjtjdata[i][1];
            yjtjs.push(yjtj);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetLFPJ", type: "get",
    success: function (data) {
        var lfpjdata = JSON.parse(data);
        for (var i in lfpjdata) {
            var lfpj = new Object;
            lfpj.name = lfpjdata[i][0];
            lfpj.value = lfpjdata[i][1];
            lfpjs.push(lfpj);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetQJPJ", type: "get",
    success: function (data) {
        var qjpjdata = JSON.parse(data);
        for (var i in qjpjdata) {
            var qjpj = new Object;
            qjpj.name = qjpjdata[i][0];
            qjpj.value = qjpjdata[i][1];
            qjpjs.push(qjpj);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetYLPJ", type: "get",
    success: function (data) {
        var ylpjdata = JSON.parse(data);
        for (var i in ylpjdata) {
            var ylpj = new Object;
            ylpj.name = ylpjdata[i][0];
            ylpj.value = ylpjdata[i][1];
            ylpjs.push(ylpj);
        }
    }, datatype: "json"
});





$.ajax({
    url: servicesurl + "/api/Parameter/GetAutoDataDateTime", type: "get",
    success: function (data) {
        var autodatadatetimedatas = JSON.parse(data);
        for (var i in autodatadatetimedatas) {
            var autodatadatetimedata = new Object;
            autodatadatetimedata.name = autodatadatetimedatas[i][0];
            autodatadatetimedata.value = autodatadatetimedatas[i][1];
            autodatadatetimes.push(autodatadatetimedata);
        }
    }, datatype: "json"
});