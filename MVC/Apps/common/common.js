//CGCS2000坐标系空间直角坐标转大地坐标
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
//CGCS2000坐标系大地坐标转空间直角坐标
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

