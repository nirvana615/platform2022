/*
 * 异步获取系统参数
 */

var srids = [];                                     //坐标系
var xjxzqs = [];                                    //县级行政区
var zhlxs = [];                                     //灾害类型





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