var ljlxs = [];            //路径类型
var gclxs = [];            //高程类型
var hdlxs = [];            //航点类型
var dzlxs = [];            //动作类型
var gzlxs = [];            //挂载类型

var drones = null;         //无人机


$.ajax({
    url: servicesurl + "/api/Parameter/GetLJLX", type: "get",
    success: function (data) {
        var ljlxdata = JSON.parse(data);
        for (var i in ljlxdata) {
            var ljlx = new Object;
            ljlx.name = ljlxdata[i][0];
            ljlx.value = ljlxdata[i][1];
            ljlxs.push(ljlx);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetGCLX", type: "get",
    success: function (data) {
        var gclxdata = JSON.parse(data);
        for (var i in gclxdata) {
            var gclx = new Object;
            gclx.name = gclxdata[i][0];
            gclx.value = gclxdata[i][1];
            gclxs.push(gclx);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetGZLX", type: "get",
    success: function (data) {
        var gzlxdata = JSON.parse(data);
        for (var i in gzlxdata) {
            var gzlx = new Object;
            gzlx.name = gzlxdata[i][0];
            gzlx.value = gzlxdata[i][1];
            gzlxs.push(gzlx);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetHDLX", type: "get",
    success: function (data) {
        var hdlxdata = JSON.parse(data);
        for (var i in hdlxdata) {
            var hdlx = new Object;
            hdlx.name = hdlxdata[i][0];
            hdlx.value = hdlxdata[i][1];
            hdlxs.push(hdlx);
        }
    }, datatype: "json"
});
$.ajax({
    url: servicesurl + "/api/Parameter/GetDZLX", type: "get",
    success: function (data) {
        var dzlxdata = JSON.parse(data);
        for (var i in dzlxdata) {
            var dzlx = new Object;
            dzlx.name = dzlxdata[i][0];
            dzlx.value = dzlxdata[i][1];
            dzlxs.push(dzlx);
        }
    }, datatype: "json"
});


$.ajax({
    url: servicesurl + "/api/UavDrone/GetDroneList", type: "get",
    success: function (data) {
        var result = JSON.parse(data);
        if (result.code == 1) {
            drones = JSON.parse(result.data);
        }
    }, datatype: "json"
});