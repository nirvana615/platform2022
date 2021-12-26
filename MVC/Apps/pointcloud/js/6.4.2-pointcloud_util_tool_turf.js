
//初始化点缓冲
function initPointBuffer() {
    let point = [108.4176366, 29.6082743];
    addPoint(point);

    //let pointF = turf.point(point);
    //let buffered = turf.buffer(pointF, 5, { units: "meters" });
    //let coordinates = buffered.geometry.coordinates;
    //let points = coordinates[0];
    //let degreesArray = pointsToDegreesArray(points);
    //addBufferPolyogn(Cesium.Cartesian3.fromDegreesArray(degreesArray));
}
var temppoint = {};
temppoint.x = -1753703.05;
temppoint.y = 5266412.86;
temppoint.z = 3133199.82;

//添加点
function addPoint(point) {
    viewer.entities.add({
        position: temppoint,
        point: {
            pixelSize: 10,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            color: Cesium.Color.YELLOW,
            outlineWidth: 3,
            outlineColor: Cesium.Color.YELLOW.withAlpha(0.4),
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            blendOption: Cesium.BlendOption.TRANSLUCENT,//透明混合度,用于大数据量渲染时提高效率

        },
    });
}

//初始化线缓冲
function initPolylineBuffer() {
    let points = [
        [106.425203158107, 29.5694914480581],
        [106.428808047023, 29.569230166027],
        [106.431661917416, 29.5692674920729],
        [106.434708906857, 29.5693048181049],
    ];
    let degreesArray = pointsToDegreesArray(points);
    addPolyline(Cesium.Cartesian3.fromDegreesArray(degreesArray));

    let polylineF = turf.lineString(points);
    let buffered = turf.buffer(polylineF, 30, { units: "meters" });
    let coordinates = buffered.geometry.coordinates;
    points = coordinates[0];
    degreesArray = pointsToDegreesArray(points);
    addBufferPolyogn(Cesium.Cartesian3.fromDegreesArray(degreesArray));
}

//添加线
function addPolyline(positions) {
    viewer.entities.add({
        polyline: {
            positions: positions,
            width: 2,
            material: Cesium.Color.YELLOW,
            clampToGround: true,
        },
    });
}

//初始化面缓冲
function initPolygonBuffer() {
    // 需要分析的所有点
    var points1 = turf.points([
        [106.439, 29.57],
        [106.44, 29.57],
        [106.44, 29.568],
        [106.436, 29.568],
        [106.437, 29.569],
        [106.438, 29.57],
    ]);

    let points = [
        [106.438549830166, 29.5701073244566],
        [106.440695597377, 29.5701073244566],
        [106.440738512722, 29.5688755679036],
        [106.438700033871, 29.5687262630581],
        [106.438034846035, 29.5690248725284],
        [106.438549830166, 29.5701073244566],
    ];

    let degreesArray = pointsToDegreesArray(points);
    addPolygon(Cesium.Cartesian3.fromDegreesArray(degreesArray));

    let polygonF = turf.polygon([points]);
    let buffered = turf.buffer(polygonF, 60, { units: "meters" });
    let coordinates = buffered.geometry.coordinates;
    points = coordinates[0];
    degreesArray = pointsToDegreesArray(points);
    addBufferPolyogn(Cesium.Cartesian3.fromDegreesArray(degreesArray));

    // 分析多边形中的点
    // var ptsWithin = turf.pointsWithinPolygon(points1, polygonF);
    var ptsWithin2 = turf.pointsWithinPolygon(points1, buffered);
    // for (let i = 0; i < ptsWithin.features.length; i++) {
    //   let point = ptsWithin.features[i].geometry.coordinates;
    //   addPoint(point);
    // }
    for (let j = 0; j < ptsWithin2.features.length; j++) {
        let point2 = ptsWithin2.features[j].geometry.coordinates;
        addPoint(point2);
    }
}

//添加面
function addPolygon(positions) {
    viewer.entities.add({
        polygon: {
            hierarchy: new Cesium.PolygonHierarchy(positions),
            material: Cesium.Color.YELLOW.withAlpha(0.6),
            classificationType: Cesium.ClassificationType.BOTH,
        },
        polyline: {
            positions: positions,
            width: 2,
            material: Cesium.Color.YELLOW.withAlpha(0.4),
            clampToGround: true,
        },
    });
}

//添加缓冲面
function addBufferPolyogn(positions) {
    viewer.entities.add({
        polygon: {
            hierarchy: new Cesium.PolygonHierarchy(positions),
            material: Cesium.Color.RED.withAlpha(0.6),
            classificationType: Cesium.ClassificationType.BOTH,
        },
    });
}

//格式转换
function pointsToDegreesArray(points) {
    let degreesArray = [];
    points.map((item) => {
        degreesArray.push(item[0]);
        degreesArray.push(item[1]);
    });
    return degreesArray;
}
