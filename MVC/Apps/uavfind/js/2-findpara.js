var srids = [];         //坐标系统
var gcxts = [];         //高程系统
var xjxzqs = [];        //县级行政区


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