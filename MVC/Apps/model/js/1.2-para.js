/*
 * 异步获取系统参数
 */

var srids = [];                                     //坐标系
var xjxzqs = [];                                    //县级行政区

var xmyts = [];                                     //项目用途
var cjsbs = [];                                     //采集设备
var sxcgs = [];                                     //所需成果

//空间参考
$.ajax({
    url: servicesurl + "/api/ModelParameter/GetSRID", type: "get",
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

//项目类型
$.ajax({
    url: servicesurl + "/api/ModelParameter/GetXMLX", type: "get",
    success: function (data) {
        var xmlxdata = JSON.parse(data);
        for (var i in xmlxdata) {
            var xmlx = new Object;
            xmlx.name = xmlxdata[i][0];
            xmlx.value = xmlxdata[i][1];
            xmlxs.push(xmlx);
        }
    }, datatype: "json"
});
//项目用途
$.ajax({
    url: servicesurl + "/api/ModelParameter/GetXMYT", type: "get",
    success: function (data) {
        var xmytdata = JSON.parse(data);
        for (var i in xmytdata) {
            var xmyt = new Object;
            xmyt.name = xmytdata[i][0];
            xmyt.value = xmytdata[i][1];
            xmyts.push(xmyt);
        }
    }, datatype: "json"
});
//县级行政区划
$.ajax({
    url: servicesurl + "/api/ModelParameter/GetXJXZQ", type: "get",
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
//采集设备
$.ajax({
    url: servicesurl + "/api/ModelParameter/GetCJSB", type: "get",
    success: function (data) {
        var cjsbdata = JSON.parse(data);
        for (var i in cjsbdata) {
            var cjsb = new Object;
            cjsb.name = cjsbdata[i][0];
            cjsb.value = cjsbdata[i][1];
            cjsbs.push(cjsb);
        }
    }, datatype: "json"
});

//所需成果
$.ajax({
    url: servicesurl + "/api/ModelParameter/GetSXCG", type: "get",
    success: function (data) {
        var sxcgdata = JSON.parse(data);
        for (var i in sxcgdata) {
            var sxcg = new Object;
            sxcg.name = sxcgdata[i][0];
            sxcg.value = sxcgdata[i][1];
            sxcgs.push(sxcg);
        }
    }, datatype: "json"
});
