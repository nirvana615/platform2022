var srids = [];         //坐标系统
var gcxts = [];         //高程系统
var xjxzqs = [];        //县级行政区

var rwxjs = [];         //任务相机
var rwcps = [];         //任务产品
var rwzts = [];         //任务状态
var mxdjs = [];         //模型等级


//坐标系统
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
//高程系统
$.ajax({
    url: servicesurl + "/api/Parameter/GetGCXT", type: "get",
    success: function (data) {
        var gcxtdata = JSON.parse(data);
        for (var i in gcxtdata) {
            var gcxt = new Object;
            gcxt.name = gcxtdata[i][0];
            gcxt.value = gcxtdata[i][1];
            gcxts.push(gcxt);
        }
    }, datatype: "json"
});


//县级行政区划
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


//任务相机
$.ajax({
    url: servicesurl + "/api/Parameter/GetRWXJ", type: "get",
    success: function (data) {
        var rwxjdata = JSON.parse(data);
        for (var i in rwxjdata) {
            var rwxj = new Object;
            rwxj.name = rwxjdata[i][0];
            rwxj.value = rwxjdata[i][1];
            rwxjs.push(rwxj);
        }
    }, datatype: "json"
});
//任务产品
$.ajax({
    url: servicesurl + "/api/Parameter/GetRWCP", type: "get",
    success: function (data) {
        var rwcpdata = JSON.parse(data);
        for (var i in rwcpdata) {
            var rwcp = new Object;
            rwcp.name = rwcpdata[i][0];
            rwcp.value = rwcpdata[i][1];
            rwcps.push(rwcp);
        }
    }, datatype: "json"
});
//任务状态
$.ajax({
    url: servicesurl + "/api/Parameter/GetRWZT", type: "get",
    success: function (data) {
        var rwztdata = JSON.parse(data);
        for (var i in rwztdata) {
            var rwzt = new Object;
            rwzt.name = rwztdata[i][0];
            rwzt.value = rwztdata[i][1];
            rwzts.push(rwzt);
        }
    }, datatype: "json"
});
//模型等级
$.ajax({
    url: servicesurl + "/api/Parameter/GetMXDJ", type: "get",
    success: function (data) {
        var mxdjdata = JSON.parse(data);
        for (var i in mxdjdata) {
            var mxdj = new Object;
            mxdj.name = mxdjdata[i][0];
            mxdj.value = mxdjdata[i][1];
            mxdjs.push(mxdj);
        }
    }, datatype: "json"
});