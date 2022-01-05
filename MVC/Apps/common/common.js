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