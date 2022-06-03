/*
 * CGCS2000坐标系空间直角坐标转大地坐标
 */
function CGCS2000XYZ2BLH(X, Y, Z) {
    var a = 6378137.0;
    var b = 6356752.314140356;
    var e1 = Math.sqrt(a * a - b * b) / a;

    var B, L, H, e2, w, N, e4, p, t, t0, tt, c;

    e2 = e1 * e1;
    e4 = (Math.sqrt(a * a - b * b) / b) * (Math.sqrt(a * a - b * b) / b);

    B = 0.1;
    L = Math.atan(Y / X);

    if (X < 0 && Y < 0) {
        L = L - Math.PI;
    }
    else if (X < 0 && Y > 0) {
        L = L + Math.PI;
    }

    L = L / Math.PI * 180;
    t = Math.tan(B);
    t0 = Z / Math.sqrt(X * X + Y * Y);
    c = a * Math.sqrt(1 + e4);
    p = c * e2 / Math.sqrt(X * X + Y * Y);

    do {
        tt = t;
        t = t0 + p * t / Math.sqrt(1 + e4 + t * t);
    } while (-0.000000001 >= (t - tt) || (t - tt) >= 0.000000001);

    B = Math.atan(t);
    w = Math.sqrt(1 - e2 * Math.pow(Math.sin(B), 2));
    N = a / w;
    H = (Math.sqrt(X * X + Y * Y) / Math.cos(B) - N);
    B = B * 180 / Math.PI;

    return new Cesium.Cartesian3(B, L, H);
};
/*
 * CGCS2000坐标系大地坐标转空间直角坐标
 */
function CGCS2000BLH2XYZ(B, L, H) {
    var X;
    var Y;
    var Z;

    var a = 6378137.0;
    var b = 6356752.314140356;
    var c = a * a / b;
    var f = 1 / 298.257222101;
    var e1 = Math.sqrt(a * a - b * b) / a;
    var e2 = Math.sqrt(a * a - b * b) / b;

    var N = a / Math.sqrt(1 - e1 * e1 * Math.sin(B * Math.PI / 180) * Math.sin(B * Math.PI / 180));
    X = (N + H) * Math.cos(B * Math.PI / 180) * Math.cos(L * Math.PI / 180);
    Y = (N + H) * Math.cos(B * Math.PI / 180) * Math.sin(L * Math.PI / 180);
    Z = (N * (1 - e1 * e1) + H) * Math.sin(B * Math.PI / 180);

    return new Cesium.Cartesian3(X, Y, Z);
};

/*
 * CGCS2000坐标系经纬度转平面坐标
 * b-->纬度（十进制度）
 * l-->经度（十进制度）
 * zonewidth-->带宽（3/6）
 * cm-->中央经度
 * assumedCoord-->是否包含带号
 */
function bl2xy(b, l, zonewidth, cm, assumedCoord) {
    var a = 6378137.0;
    var f = 1 / 298.257222101;

    l -= cm - (zonewidth == 6 ? 3 : 0);
    var xy = bl2xy0(b, l, a, 1 / f);
    var x = xy.split(' ')[0];
    var y = xy.split(' ')[1];
    if (assumedCoord) {
        y += cm * 1000000 / zonewidth;
    }
    y = Number(y) + 500000;
    x = Number(x);
    var xy = new Object;
    xy.x = y;
    xy.y = x;
    return xy;
}
function bl2xy0(B, L, a, f) {
    var ee = (2 * f - 1) / f / f;
    var ee2 = ee / (1 - ee);
    var rB, tB, m;
    rB = B * Math.PI / 180;
    tB = Math.tan(rB);
    m = Math.cos(rB) * L * Math.PI / 180;
    var N = a / Math.sqrt(1 - ee * Math.sin(rB) * Math.sin(rB));
    var it2 = ee2 * Math.pow(Math.cos(rB), 2);
    x = m * m / 2 + (5 - tB * tB + 9 * it2 + 4 * it2 * it2) * Math.pow(m, 4) / 24 + (61 - 58 * tB * tB + Math.pow(tB, 4)) * Math.pow(m, 6) / 720;
    x = MeridianLength(B, a, f) + N * tB * x;
    y = N * (m + (1 - tB * tB + it2) * Math.pow(m, 3) / 6 + (5 - 18 * tB * tB + Math.pow(tB, 4) + 14 * it2 - 58 * tB * tB * it2) * Math.pow(m, 5) / 120);
    return x + " " + y;
}
function MeridianLength(B, a, f) {
    var ee = (2 * f - 1) / f / f;
    var rB = B * Math.PI / 180;
    var cA, cB, cC, cD, cE;
    cA = 1 + 3 * ee / 4 + 45 * Math.pow(ee, 2) / 64 + 175 * Math.pow(ee, 3) / 256 + 11025 * Math.pow(ee, 4) / 16384;
    cB = 3 * ee / 4 + 15 * Math.pow(ee, 2) / 16 + 525 * Math.pow(ee, 3) / 512 + 2205 * Math.pow(ee, 4) / 2048;
    cC = 15 * Math.pow(ee, 2) / 64 + 105 * Math.pow(ee, 3) / 256 + 2205 * Math.pow(ee, 4) / 4096;
    cD = 35 * Math.pow(ee, 3) / 512 + 315 * Math.pow(ee, 4) / 2048;
    cE = 315 * Math.pow(ee, 4) / 131072;
    return a * (1 - ee) * (cA * rB - cB * Math.sin(2 * rB) / 2 + cC * Math.sin(4 * rB) / 4 - cD * Math.sin(6 * rB) / 6 + cE * Math.sin(8 * rB) / 8);
}

/*
 * CGCS2000坐标系平面坐标转经纬度
 * x-->平面坐标x
 * y-->平面坐标y
 * zonewidth-->带宽（3/6）
 * cm-->中央经度
 * assumedCoord-->是否包含带号
 */
function xy2bl(x, y, zonewidth, cm, assumedCoord) {
    var a = 6378137.0;
    var f = 1 / 298.257222101;

    if (assumedCoord) {
        x -= cm * 1000000 / zonewidth;
    }
    x = Number(x) - 500000;
    var bl = xy2bl0(y, x, a, 1 / f);
    var b = Number(bl.split(' ')[0]);
    var l = Number(bl.split(' ')[1]) + cm;
    var xy = new Object;
    xy.b = b;
    xy.l = l;
    return xy;
}
function xy2bl0(x, y, a, f) {
    var ee = (2 * f - 1) / f / f;
    var ee2 = ee / (1 - ee);
    var cA, cB, cC, cD, cE;
    cA = 1 + 3 * ee / 4 + 45 * ee * ee / 64 + 175 * Math.pow(ee, 3) / 256 + 11025 * Math.pow(ee, 4) / 16384;
    cB = 3 * ee / 4 + 15 * ee * ee / 16 + 525 * Math.pow(ee, 3) / 512 + 2205 * Math.pow(ee, 4) / 2048;
    cC = 15 * ee * ee / 64 + 105 * Math.pow(ee, 3) / 256 + 2205 * Math.pow(ee, 4) / 4096;
    cD = 35 * Math.pow(ee, 3) / 512 + 315 * Math.pow(ee, 4) / 2048;
    cE = 315 * Math.pow(ee, 4) / 131072;
    var Bf = x / (a * (1 - ee) * cA);
    do {
        B = Bf;
        Bf = (x + a * (1 - ee) * (cB * Math.sin(2 * Bf) / 2 - cC * Math.sin(4 * Bf) / 4 + cD * Math.sin(6 * Bf) / 6) - cE * Math.sin(8 * Bf) / 8) / (a * (1 - ee) * cA);
    }
    while (Math.abs(B - Bf) > 0.00000000001);
    var N = a / Math.sqrt(1 - ee * Math.pow(Math.sin(Bf), 2));
    var V2 = 1 + ee2 * Math.pow(Math.cos(Bf), 2);
    var it2 = ee2 * Math.pow(Math.cos(Bf), 2);
    var tB2 = Math.pow(Math.tan(Bf), 2);
    B = Bf - V2 * Math.tan(Bf) / 2 * (Math.pow(y / N, 2) - (5 + 3 * tB2 + it2 - 9 * it2 * tB2) * Math.pow(y / N, 4) / 12 + (61 + 90 * tB2 + 45 * tB2 * tB2) * Math.pow(y / N, 6) / 360);
    L = (y / N - (1 + 2 * tB2 + it2) * Math.pow(y / N, 3) / 6 + (5 + 28 * tB2 + 24 * tB2 * tB2 + 6 * it2 + 8 * it2 * tB2) * Math.pow(y / N, 5) / 120) / Math.cos(Bf);
    B = B * 180 / Math.PI;
    L = L * 180 / Math.PI;
    return B + " " + L;
};


//生成GUID
function NewGuid() {
    return ((((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1));
};

//清除string中html元素
function ClearHtml(str) {
    if (str == undefined || str == null) return '';
    return str.replace(/&nbsp&#59/g, '').replace(/<br \/>/g, '\n').replace(/<br>/g, '\n').replace(/&nbsp;/g, " ").replace(/&rdquo/g, '').replace(/&ldquo/g, '').replace(/&rarr/g, '').replace(/&hellip;/g, '').replace(/&#59;/g, '').replace(/&mdash/g, '').replace(/&alpha/g, 'α').replace(/<p>/g, '').
        replace('</p>', '').replace(/<br\/>/g, '\n').replace(/<.+?>/g, '');
};


/*
 *获取加密点 
 * positList 点数据组
 * modelFlag 地形or模型    模型--true  地形--false
 * num       加密的密度
 */
function getEncryptionPoint(positList, modelFlag, num) {
    if (viewer.entities.getById("line_linshi9999") != null) {
        viewer.entities.removeById("line_linshi9999");
    }

    viewer.entities.add({
        id: "line_linshi9999",
        polyline: {
            positions: positList,
            width: 2,
            arcType: Cesium.ArcType.RHUMB,
            material: Cesium.Color.RED,
            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                color: Cesium.Color.RED,
            }),
        }
    });
    var xyzzz = getChanzhuang(positList);
    viewer.zoomTo(viewer.entities.getById("line_linshi9999"), new Cesium.HeadingPitchRange(Cesium.Math.toRadians(-(parseFloat(xyzzz.qingXiang) - 180)), Cesium.Math.toRadians(parseFloat(xyzzz.qingJiao) - 90)));
    setTimeout(() => {
        //平面坐标
        var maxX = viewer.scene.cartesianToCanvasCoordinates(positList[0]).x;
        var minX = viewer.scene.cartesianToCanvasCoordinates(positList[0]).x;
        var maxY = viewer.scene.cartesianToCanvasCoordinates(positList[0]).y;
        var minY = viewer.scene.cartesianToCanvasCoordinates(positList[0]).y;
        for (var i in positList) {
            if (viewer.scene.cartesianToCanvasCoordinates(positList[i]).x > maxX) {
                maxX = viewer.scene.cartesianToCanvasCoordinates(positList[i]).x;
            }
            if (viewer.scene.cartesianToCanvasCoordinates(positList[i]).x < minX) {
                minX = viewer.scene.cartesianToCanvasCoordinates(positList[i]).x;
            }
            if (viewer.scene.cartesianToCanvasCoordinates(positList[i]).y > maxY) {
                maxY = viewer.scene.cartesianToCanvasCoordinates(positList[i]).y;
            }
            if (viewer.scene.cartesianToCanvasCoordinates(positList[i]).y < minY) {
                minY = viewer.scene.cartesianToCanvasCoordinates(positList[i]).y;
            }

        }
        var jiamishu = parseInt(num);
        var xxishu = (maxX - minX) / jiamishu;
        var yxishu = (maxY - minY) / jiamishu;
        var jimiList = [];
        for (var x = 0; x <= jiamishu; x++) {
            for (var m = 0; m <= jiamishu; m++) {

                var temp = new Cesium.Cartesian2(minX + xxishu * x, minY + yxishu * m);//b点，加了5.

                if (modelFlag) {//地形测量

                    if (scene.pick(temp)) {
                        jimiList.push(scene.pick(temp));
                        //viewer.entities.add({
                        //    name: "ptMeasue----" + x + "y" + m,// NewGuidCL(),
                        //    position: scene.pick(temp),
                        //    point: {
                        //        pixelSize: 2,
                        //        color: Cesium.Color.YELLOW,
                        //        disableDepthTestDistance: Number.POSITIVE_INFINITY
                        //    },

                        //});
                    }
                } else {
                    if (scene.pickPosition(temp)) {

                        jimiList.push(scene.pickPosition(temp));

                        //viewer.entities.add({
                        //    name: "ptMeasue----" + x + "y" + m,// NewGuidCL(),
                        //    position: scene.pickPosition(temp),
                        //    point: {
                        //        pixelSize: 2,
                        //        color: Cesium.Color.YELLOW,
                        //        disableDepthTestDistance: Number.POSITIVE_INFINITY
                        //    },

                        //});
                    }
                }



            }
        }

        if (viewer.entities.getById("line_linshi9999") != null) {
            viewer.entities.removeById("line_linshi9999");
        }
        console.log(jimiList);
        return jimiList;

    }, 300);

}
/*
 *产状
 *positList 点数据组
 */
function getChanzhuang(positList) {
    points = positList;
    var cartesian3s = [];
    //var newcartesian3s = [];
    var bSum = 0;
    var lSum = 0;
    var hSum = 0;
    var minx = points[0].x;
    var miny = points[0].y;
    var minz = points[0].z;
    var maxHeight = Cesium.Cartographic.fromCartesian(points[0]).height;
    var minHeight = Cesium.Cartographic.fromCartesian(points[0]).height;
    for (var i = 0; i < points.length; i++) {
        var cartesian3 = points[i];
        cartesian3s.push(cartesian3);
        if (points[i].x < minx) {
            minx = points[i].x;
        }
        if (points[i].y < miny) {
            miny = points[i].y;
        }
        if (points[i].z < minz) {
            minz = points[i].z;
        }
        var rblh = Cesium.Cartographic.fromCartesian(points[i]);
        bSum += rblh.latitude * 180 / Math.PI;
        lSum += rblh.longitude * 180 / Math.PI;
        hSum += rblh.height;
        if (rblh.height > maxHeight) {
            maxHeight = rblh.height;
        }
        if (rblh.height < minHeight) {
            minHeight = rblh.height;
        }
    }
    var bAvg = bSum * Math.PI / 180 / points.length;
    var lAvg = lSum * Math.PI / 180 / points.length;
    var hAvg = hSum / points.length;

    var opblh = new Cesium.Cartographic(lAvg, bAvg, hAvg);
    //转换后的坐标原点
    var opxyz = Cesium.Cartesian3.fromDegrees(opblh.longitude, opblh.latitude, opblh.height);
    //var ccc = 0;     调试用
    var cartesian3f = [];
    //cartesian3f = cartesian3s; //调试用
    for (var i = 0; i < cartesian3s.length; i++) {
        var newx = -Math.sin(lAvg) * (cartesian3s[i].x - opxyz.x) + Math.cos(lAvg) * (cartesian3s[i].y - opxyz.y);
        var newy = -Math.sin(bAvg) * Math.cos(lAvg) * (cartesian3s[i].x - opxyz.x) - Math.sin(bAvg) * Math.sin(lAvg) * (cartesian3s[i].y - opxyz.y) + Math.cos(bAvg) * (cartesian3s[i].z - opxyz.z);
        var newz = Math.cos(bAvg) * Math.cos(lAvg) * (cartesian3s[i].x - opxyz.x) + Math.cos(bAvg) * Math.sin(lAvg) * (cartesian3s[i].y - opxyz.y) + Math.sin(bAvg) * (cartesian3s[i].z - opxyz.z);
        var cartesian33 = new Cesium.Cartesian3(newx, newy, newz);
        //ccc = newx;
        cartesian3f.push(cartesian33);
    }

    //求取产状要素
    var qingXiang = 0;
    var qingJiao = 0;
    //设拟合面的表达式为Ax+By+Cz+D = 0
    var A = (cartesian3f[1].y - cartesian3f[0].y) * (cartesian3f[2].z - cartesian3f[0].z) - (cartesian3f[1].z - cartesian3f[0].z) * (cartesian3f[2].y - cartesian3f[0].y);
    var B = (cartesian3f[1].z - cartesian3f[0].z) * (cartesian3f[2].x - cartesian3f[0].x) - (cartesian3f[1].x - cartesian3f[0].x) * (cartesian3f[2].z - cartesian3f[0].z);
    var C = (cartesian3f[1].x - cartesian3f[0].x) * (cartesian3f[2].y - cartesian3f[0].y) - (cartesian3f[1].y - cartesian3f[0].y) * (cartesian3f[2].x - cartesian3f[0].x);

    var nx = A / Math.sqrt(A * A + B * B + C * C);
    var ny = B / Math.sqrt(A * A + B * B + C * C);
    var nz = C / Math.sqrt(A * A + B * B + C * C);

    if (nz == 0) {
        qingJiao = 0.5 * Math.PI;
        if (nx < 0) {
            qingXiang = 2 * Math.PI - Math.acos(ny / Math.sqrt(nx * nx + ny * ny));
        }
        else {
            qingXiang = Math.acos(ny / Math.sqrt(nx * nx + ny * ny));
        }
    }
    else if (nz > 0) {
        qingJiao = Math.acos(nz);
        if (nx < 0) {
            qingXiang = 2 * Math.PI - Math.acos(ny / Math.sqrt(nx * nx + ny * ny));
        }
        else {
            qingXiang = Math.acos(ny / Math.sqrt(nx * nx + ny * ny));
        }
    }
    else {
        qingJiao = Math.acos(-nz);
        if (nx < 0) {
            qingXiang = 2 * Math.PI - Math.acos(-ny / Math.sqrt(nx * nx + ny * ny));
        }
        else {
            qingXiang = Math.acos(-ny / Math.sqrt(nx * nx + ny * ny));
        }
    }
    qingXiang = qingXiang * 180 / Math.PI;
    qingJiao = qingJiao * 180 / Math.PI;
    var tenp = {};
    tenp.qingXiang = qingXiang;
    tenp.qingJiao = qingJiao;
    return tenp;
}


