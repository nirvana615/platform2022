/*
 * 异步获取系统参数
 */
var srids = [];                                     //坐标系
var mblxs = [];                                     //目标类型
var bqlxs = [];                                     //靶区类型

var imagedatadatetimes = [];                          //影像靶区长度变化数据时间范围（预设）

var ppsfs = [];                                      //匹配算法






$.ajax({
    url: servicesurl + "/api/Parameter/GetPPSF", type: "get",
    success: function (data) {
        var ppsfdata = JSON.parse(data);
        for (var i in ppsfdata) {
            var ppsf = new Object;
            ppsf.name = ppsfdata[i][0];
            ppsf.value = ppsfdata[i][1];
            ppsfs.push(ppsf);
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
    url: servicesurl + "/api/Parameter/GetMBLX", type: "get",
    success: function (data) {
        var mblxdata = JSON.parse(data);
        for (var i in mblxdata) {
            var mblx = new Object;
            mblx.name = mblxdata[i][0];
            mblx.value = mblxdata[i][1];
            mblxs.push(mblx);
        }
    }, datatype: "json"
});


$.ajax({
    url: servicesurl + "/api/Parameter/GetBQLX", type: "get",
    success: function (data) {
        var bqlxdata = JSON.parse(data);
        for (var i in bqlxdata) {
            var bqlx = new Object;
            bqlx.name = bqlxdata[i][0];
            bqlx.value = bqlxdata[i][1];
            bqlxs.push(bqlx);
        }
    }, datatype: "json"
});

$.ajax({
    url: servicesurl + "/api/Parameter/GetAutoDataDateTime", type: "get",
    success: function (data) {
        var imagedatadatetimedatas = JSON.parse(data);
        for (var i in imagedatadatetimedatas) {
            var imagedatadatetimedata = new Object;
            imagedatadatetimedata.name = imagedatadatetimedatas[i][0];
            imagedatadatetimedata.value = imagedatadatetimedatas[i][1];
            imagedatadatetimes.push(imagedatadatetimedata);
        }
    }, datatype: "json"
});