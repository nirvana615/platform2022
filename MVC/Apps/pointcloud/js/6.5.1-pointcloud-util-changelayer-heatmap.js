
//加载热力图

function LoadHeadMap(obj) {

    if (obj.data.type == "headmaps") {
        LoadHeadPoint(obj.data.changes);
    }
    else if (obj.data.type == "surPointCloud") {
        LoadPointCloud(obj.data);

    }
    else if (obj.data.type == "changesposions") {
        addShinePoint(obj.data.positon);
    }

}
/*
 * 加载热力图
 */
function LoadHeadPoint(changes) {
    //变化图层信息
    let data = JSON.parse(changes);


    let valueMin = Number.MAX_VALUE;
    let valueMax = -Number.MAX_VALUE;

    let bounds = {
        west: 180,
        east: -180,
        south: 90,
        north: -90
    };

    data.forEach(function (item) {
        bounds.west = Math.min(bounds.west, item.x);
        bounds.east = Math.max(bounds.east, item.x);
        bounds.south = Math.min(bounds.south, item.y);
        bounds.north = Math.max(bounds.north, item.y);

        valueMin = Math.min(valueMin, item.value);
        valueMax = Math.max(valueMax, item.value);
    });

    // init heatmap
    let heatMap = CesiumHeatmap.create(
        viewer, // your cesium viewer
        bounds, // bounds for heatmap layer
        {
            // heatmap.js options go here
            // maxOpacity: 0.3
            radius: 100
        }
    );
    // add data to heatmap
    heatMap.setWGS84Data(valueMin, valueMax, data);

    // viewer.scene.camera.flyTo({
    //     destination: Cesium.Cartesian3.fromDegrees(bounds.west,31.9579881734127,1000)
    // });
    viewer.camera.setView({
        destination: Cesium.Rectangle.fromDegrees(bounds.west, bounds.south, bounds.east, bounds.north)
    });
}

var editpointdisplystylelayer = null;//编辑点云显示样式
var colorlegendlayer = null;
/*
 * 加载3d tiles点云模型
 */
function LoadPointCloud(obj) {
    if ((editpointdisplystylelayer != null) || (editpointdisplystylelayer != undefined)) {
        layer.close(editpointdisplystylelayer);
    } 
    else {
        if ((editpointdisplystylelayer == null)) {
            layer.close(colorlegendlayer);
            editpointdisplystylelayer = layer.open({
                type: 1
                , title: ['变化点云图层设置', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['300px', '300px']
                , shade: 0
                , skin: 'line' //行边框风格
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: false
                , moveOut: true
                , content:'<!--设置点云显示样式--><form class="layui-form" action="" lay-filter="setpointdisplystyle-form" style="margin-top:10px;margin-right:10px;">    <div class="layui-form-item" style="margin-left:10px">        <div class="layui-row">            <div class="layui-col-xs6" style="width:90%">                <div class="grid-demo grid-demo-bg1">                    <label class="layui-form-label">最大值(mm)</label>                    <div class="layui-input-block">                        <input type="text" id="deformation_max" name="deformation_max" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                    </div>                </div>            </div>        </div>    </div>    <div class="layui-form-item" style="margin-left:10px">        <div class="layui-row">            <div class="layui-col-xs6" style="width:90%">                <div class="grid-demo">                    <label class="layui-form-label">最小值(mm)</label>                    <div class="layui-input-block">                        <input type="text" id="deformation_min" name="deformation_min" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                    </div>                </div>            </div>        </div>    </div>    <div class="layui-form-item">        <div class="layui-row">            <div class="layui-col-xs6" style="width:90%">                <div class="grid-demo grid-demo-bg1">                    <label class="layui-form-label">点云大小</label>                    <div class="layui-input-block">                        <input type="text" id="pointsize" name="pointsize" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                    </div>                </div>            </div>        </div>    </div>    <div class="layui-form-item">        <div class="layui-row">            <div class="layui-col-xs6" style="width:90%">                <div class="grid-demo grid-demo-bg1">                    <label class="layui-form-label">颜色等级</label>                    <div class="layui-input-block">                        <input type="text" id="colorgrade" name="colorgrade" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                    </div>                </div>            </div>        </div>    </div>    <div class="layui-form-item" style="margin-bottom:10px;width:90%">        <div style="position:absolute;right:10px;bottom:10px;">            <button type="submit" class="layui-btn" lay-submit="" lay-filter="setpointdisplystyle-confirm" style="width:100px">确认</button>        </div>    </div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    form.on('submit(setpointdisplystyle-confirm)', function (data) {
                       
                        var deformation_max = data.field.deformation_max;
                        var deformation_min = data.field.deformation_min;
                        var pointsize = data.field.pointsize;
                        var colorgrade = data.field.colorgrade;
                        var modelurl = datasurl + "/SurPointCloud" + obj.path;
                        layer.close(editpointdisplystylelayer);
                        var disply_min = '${Intensity} >' + deformation_min;
                        //删除上一个模型（保证只有一个模型）
                        if (curpointcloudtileset != null) {
                            viewer.scene.primitives.remove(curtileset);
                        }
                        colorlegendlayer = layer.open({
                            type: 1
                            ,closeBtn: 0
                            ,title: false
                            , area: ['500px', '40px']
                            , shade: 0
                            , skin: 'myskin' //行边框风格
                            , offset: ['80px', '1100px']
                            , content: '<div id="colorlegend" style="position: absolute; width:400px;height:20px;margin:20px;"></div>'
                            , success: function () {
                                setColor(colorgrade);
                            }
                        }); 
                        //添加点云
                        curpointcloudtileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                            url: modelurl,
                            maximumScreenSpaceError: isMobile.any() ? 1 : 1,
                            maximumNumberOfLoadedTiles: isMobile.any() ? 1000 : 1000
                        }));

                        //缩放至模型
                        viewer.zoomTo(curpointcloudtileset);
                        var conditions = GetTileSetColor(deformation_max, deformation_min);
                        console.log(conditions);
                        //点云图层可以设置样式 
                        let style = {
                            color: {
                                conditions: conditions
                            },
                            show: disply_min,
                            pointSize: pointsize,
                            meta: {
                                description: '"Building id ${id} has height ${Height}."'
                            }
                        }
                        curpointcloudtileset.style = new Cesium.Cesium3DTileStyle(style);



                        var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
                        handler.setInputAction(function (evt) {
                            var scene = viewer.scene;
                            if (scene.mode !== Cesium.SceneMode.MORPHING) {
                                var pickedObject = scene.pick(evt.position);
                                if (scene.pickPositionSupported && Cesium.defined(pickedObject)) {
                                    var cartesian = viewer.scene.pickPosition(evt.position);
                                    if (Cesium.defined(cartesian)) {
                                        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                                        var lng = Cesium.Math.toDegrees(cartographic.longitude);
                                        var lat = Cesium.Math.toDegrees(cartographic.latitude);
                                        var height = cartographic.height;//模型高度
                                        mapPosition = { x: lng, y: lat, z: height };
                                        console.log(mapPosition);
                                    }
                                }
                            }


                            let feature = scene.pick(evt.position);
                            if (feature) {
                                let pickedCar3 = getCartesian3fromPick(viewer, evt);
                                //this.createEntity(pickedCar3, Cesịụm.Color.YELLOW);
                                let url = feature.content.url;
                                let pickId = feature.content._pickId.key;
                                let pointLength = feature.content._pointCloud.pointsLength;



                                var xhr = new XMLHttpRequest();
                                xhr.open("get", url, true);
                                xhr.responseType = "arraybuffer";
                                xhr.onload = function () {
                                    if (this.status == 200) {
                                        var ret = this.response;
                                        processPntsData(ret, pickId, pickedCar3, pointLength);
                                    }
                                };
                                xhr.send();


                            }
                            //  ugByDistance(curpointcloudtileset);
                        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
                        return false;
                    });
                }
                , end: function () {
                    editpointdisplystylelayer = null;
                }

            });
        }

    }




}

function GetTileSetColor(IntensityMax, IntensityMin) {
    var interval = Math.ceil((IntensityMax - IntensityMin) / gradientColorValue.length)
    var conditions = [];
    for (let i = gradientColorValue.length - 1; i >= 0; i--) {
        let condition = [];
        condition.push('${Intensity}>=' + interval * i );
        condition.push('color("' + gradientColorValue [i]+ '")');
        conditions.push(condition);
        if (i === 0) {
            condition = [];
            condition.push('true');
            condition.push('color("blue")');
            conditions.push(condition);
        }
    }
    return conditions;
}


function getCartesian3fromPick(viewer, movement) {
    let position = movement.position;
    if (!Cesium.defined(position)) {
        return;
    }
    let worldPosition = viewer.scene.pickPosition(position);
    if (!Cesium.defined(worldPosition)) {
        return;
    }
    return worldPosition;
}



function ugByDistance(curpointcloudtileset) {
    //let viewer = this.CesiumViewer;
    let camera_position = viewer.scene.camera.position;
    let selectedTiles = curpointcloudtileset._selectedTiles;
    let distanceArray = [];
    for (let i = 0; i < selectedTiles.length; i++) {
        let tile = selectedTiles[i];
        let boundingSphere = tile.boundingSphere;
        let distance = Cesium.Cartesian3.distance(boundingSphere.center, camera_position);
        console.log(JSON.stringify(boundingSphere) + "," + distance);
        distanceArray.push({ distance: distance });
    }
    if (distanceArray.length <= 0) {
        return;
    }
    let minOne = sortByDistance(distanceArray);
    let distance = minOne.distance;
    changePointSizeByDistance(curpointcloudtileset, distance);
}


function changePointSizeByDistance(tileSet, distance) {
    let arrayValue = this.$store.state.gradArry;
    if (arrayValue.length === 0) {
        arrayValue = window.tunneManager.initGradArry(0, 0);
    }
    if (distance <= 2) {
        this.pointSize = 30;
    }
    else if (distance <= 2.5) {
        this.pointSize = 25;
    }
    else if (distance <= 3) {
        this.pointSize = 20;
    }
    else if (distance <= 3.5) {
        this.pointSize = 15;
    }
    else if (distance <= 4) {
        this.pointSize = 10;
    }
    else {
        this.pointSize = 5;
    }
    let pointCloudPointStyle = initPointCloudStyle(arrayValue, this.pointSize);
    tileSet.style = pointCloudPointStyle;
}

function initPointCloudStyle(arrayValue, pointSize) {
    let conditions = [];
    for (let i = arrayValue.length - 1; i >= 0; i--) {
        let condition = [];
        condition.push('${pValue}>=' + arrayValue[i].value);
        condition.push('color("' + arrayValue[i].color + '")');
        conditions.push(condition);
        if (i === 0) {
            condition = [];
            condition.push('true');
            condition.push('color("blue")');
            conditions.push(condition);
        }
    }

    let showOther = this.$store.state.showCloudOther;
    let colorStyle = new Cesium.Cesium3DTileSyle({
        "defines": {
            "pValue": "(${Intensity}/1000)-1"
        },
        color: {
            "conditions": conditions
        },
        show: {
            conditions: [
                ['${Intensity}<=0', showOther],
                ['${Intensity}<=0', 'true']
            ]
        },
        pointSize: pointSize
    });
    return colorStyle;
}


/**
 * 读取点云pnts的源数据
 * @param {Object} arrayBuffer
 * @param {Object} pickId 选中的tile Id
 * @param {Object} pickedCar3 选中car3坐标
 * @param {Object} pointLength 选中的tile 所包含的点数量
 * @param {Object} transformPos 
 * @param {Object} blhPos
 */
function processPntsData(arrayBuffer, pickId, pickedCar3, pointLength/*, transformPos, blhPos*/) {

   // let pickedOriginalPos = transForm.LocalPosition(pickedCar3, transformPos, blhPos);

    let uint8Array = new Uint8Array(arrayBuffer);
    let view = new DataView(arrayBuffer);

    let sizeOfUint32 = 4;

    //偏移字节数byteOffset 默认为4，TILE中的前4个字节为magic标识
    //getUint32()方法从DataView相对于起始位置偏移 n 个字节处开始，获取一个32-bit数,即为tile的版本
    //具体可查看fuckgis 3D tile的数据结构
    //https://www.cnblogs.com/fuckgiser/p/6554666.html
    let byteOffset =4;
    //byteOffset += sizeOfUint32;  // Skip magic

    let version = view.getUint32(byteOffset, true);
    //继续往下移动
    byteOffset += sizeOfUint32;  // Skip magic
    //得到byteLength的长度
    let byteLength = view.getUint32(byteOffset, true);
    //继续往下移动
    byteOffset += sizeOfUint32;  // Skip byteLength
    //得到featuretableJSON字节长度
    let featureTableJsonByteLength = view.getUint32(byteOffset, true);
    byteOffset += sizeOfUint32;
    //得到featuretable 二进制字节长度
    let featureTableBinaryByteLength = view.getUint32(byteOffset, true);
    //得到bathTableJson字节长度
    let batchTableJSONByteLength = view.getUint32(20, true);
    //得到bathTable 二进制字节长度
    let batchTableBinaryByteLength = view.getUint32(24, true);

    //获取body的内容,从28开始是因为pnts的头部长度为28，b3dm与i3dm是其他的固定值

    //转换到featuretable的buffer中
    let featureTableJson = new Uint8Array(arrayBuffer, 28, featureTableJsonByteLength);
    let featureTableJsonStr = Utf8ArrayToStr(featureTableJson);
    //featureTableJsonStr = decodeURIComponent(featureTableJsonStr.replace(/%/g, '%25'));
    let featureTableJsonObj = JSON.parse(featureTableJsonStr);
    //多次offset后，可以直接读取内容gltf
    let featureTableBinary = new Uint8Array(arrayBuffer, byteOffset, featureTableBinaryByteLength);
    let featureTable = new Cesium.Cesium3DTileFeatureTable(featureTableJsonObj, featureTableBinary);
    let positions = featureTable.getPropertyArray('POSITION_QUANTIZED', Cesium.ComponentDatatype.UNSIGNED_SHORT, 3);
    // getPropertyArray 函数中调用getTypedArrayFromBinary，
    // 在调用 typedArray = ComponentDatatype.createArrayBufferView(componentType, featureTable.buffer.buffer, featureTable.buffer.byteOffset + byteOffset, count * componentLength);

    let batchTableJSON = new Uint8Array(arrayBuffer, 28 + featureTableJsonByteLength + featureTableBinaryByteLength, batchTableJSONByteLength);
    


    let batchTableJSONStr = Utf8ArrayToStr(batchTableJSON);
    //batchTableJSONStr = decodeURIComponent(batchTableJSONStr.replace(/%/g, '%25'));
    //console.log(batchTableJSONStr);
    let batchTableJSONObj = JSON.parse(batchTableJSONStr);
    let batchTableBinary = new Uint8Array(arrayBuffer, 28 + featureTableJsonByteLength + featureTableBinaryByteLength + batchTableJSONByteLength, batchTableBinaryByteLength);
    let batchTable = new Cesium.Cesium3DTileFeatureTable(batchTableJSONObj, batchTableBinary);
    let intensity = batchTable.getPropertyArray('Intensity', Cesium.ComponentDatatype.UNSIGNED_SHORT, 3);

    //let referpointOriginalXYZ = [-518444.65, -2537603.97, -42.13];
    //let referpointBLH = [116.46, 39.90002, 0];
    //let referpointCar3 = [1, 1, 1];
    //let referpointCartian3 = cesiumCommon.lonlat2Cartesian([referpointBLH[0], referpointBLH[1]], referpointBLH[2]);

    //this.createEntity(referpointCartian3, Cesium.Color.RED);

    //header+featureTableJsonByteLength+featureTableBinaryByteLength+batchTableJSONByteLength
    //到二进制数据的位置
    let pickIdPre = 28 + featureTableJsonByteLength + featureTableBinaryByteLength + batchTableJSONByteLength;
    // let intensityValue = view.getUint16(pickIdPre, true);

    //byteOffset 表示字段在arraybuffer在body中的偏移
    let xIndex = pickIdPre + batchTableJSONObj.x.byteOffset;
    let yIndex = pickIdPre + batchTableJSONObj.y.byteOffset;
    let zIndex = pickIdPre + batchTableJSONObj.z.byteOffset;

    // let x = view.getFloat32(xIndex, true);
    // let y = view.getFloat32(yIndex, true);
    // let z = view.getFloat32(zIndex, true);
    // alert("强度值:" + intensityValue + "\n" + "x:" + x + ",y:" + y + ",z:" + z);

    //强度值
    let intensitycompentType = batchTableJSONObj.Intensity.componentType;
    let intensitytype = batchTableJSONObj.Intensity.type;
    let intensityIndex = pickIdPre + batchTableJSONObj.Intensity.byteOffset;
    let intensityStep = Cesium.ComponentDatatype.getSizeInBytes(Cesium.ComponentDatatype.fromName(intensitycompentType)) * Cesium.numberOfComponentsForType(intensitytype);

    //x y z
    let xcompentType = batchTableJSONObj.x.componentType;
    let xtype = batchTableJSONObj.x.type;
    //compentType与type 决定了x字段的占位长度
    let xStep = Cesium.ComponentDatatype.getSizeInBytes(Cesium.ComponentDatatype.fromName(xcompentType)) * Cesium.numberOfComponentsForType(xtype);

    let distanceArray = [];

    //一个pnts可能有成千上万个点的数据，pointLength就是该pnts对应的点的个数（todo）
    for (let i = 0; i < pointLength; i++) {
        //强度值
        let eachIntensity = intensityIndex + i * intensityStep;
        //float 每一个值占4位
        let eachX = xIndex + i * xStep;
        let eachY = yIndex + i * xStep;
        let eachZ = zIndex + i * xStep;

        let thisIntensity = view.getUint16(eachIntensity, true);

        let thisX = view.getFloat32(eachX, true);
        let thisY = view.getFloat32(eachY, true);
        let thisZ = view.getFloat32(eachZ, true);

        let checkCartian3 = new Cesium.Cartesian3(thisX, thisY, thisZ);

        //let distance = Cesium.Cartesian3.distance(checkCartian3, pickedOriginalPos);

        let checkedPoint = {
            Intensity: thisIntensity,
            x: thisX,
            y: thisY,
            z: thisZ,
            cartesian3: checkCartian3
        };

        //distanceArray.push({ distance: distance, point: checkedPoint });
        console.log(checkedPoint);
    }

  //  let minOne = this.sortByDistance(distanceArray);

    //let minOneCar3 = minOne.point.cartesian3;
    //this.createEntity(minOneCar3, Cesium.Color.WHITE);

    alert(checkedPoint);
}
// 字符串转为ArrayBuffer对象，参数为字符串
function str2ab(str) {
    var buf = new ArrayBuffer(str.length); // 每个字符占用2个字节
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        buf[i] = str.charCodeAt(i);
    }
    return buf;
}


function Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
        c = array[i++];
        switch (c >> 4) {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx
                out += String.fromCharCode(c);
                break;
            case 12: case 13:
                // 110x xxxx 10xx xxxx
                char2 = array[i++];
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx 10xx xxxx 10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }

    return out;
}

var gradientColorValue = [];
/*
* startColor：开始颜色hex
* endColor：结束颜色hex
* step:几个阶级（几步）
*/
function gradientColor(startColor, endColor, step) {
    startRGB = this.colorRgb(startColor); //转换为rgb数组模式
    startR = startRGB[0];
    startG = startRGB[1];
    startB = startRGB[2];
    endRGB = this.colorRgb(endColor);
    endR = endRGB[0];
    endG = endRGB[1];
    endB = endRGB[2];
    sR = (endR - startR) / step; //总差值
    sG = (endG - startG) / step;
    sB = (endB - startB) / step;
    var colorArr = [];
    for (var i = 0; i < step; i++) {
        //计算每一步的hex值 
        var hex = this.colorHex('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' +
            parseInt((sB * i + startB)) + ')');
        colorArr.push(hex);
    }
    return colorArr;
}
// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
gradientColor.prototype.colorRgb = function (sColor) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return sColorChange;
    } else {
        return sColor;
    }
};
// 将rgb表示方式转换为hex表示方式
gradientColor.prototype.colorHex = function (rgb) {
    var _this = rgb;
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
        var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
        var strHex = "#";
        for (var i = 0; i < aColor.length; i++) {
            var hex = Number(aColor[i]).toString(16);
            hex = hex < 10 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
            if (hex === "0") {
                hex += hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = _this;
        }
        return strHex;
    } else if (reg.test(_this)) {
        var aNum = _this.replace(/#/, "").split("");
        if (aNum.length === 6) {
            return _this;
        } else if (aNum.length === 3) {
            var numHex = "#";
            for (var i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    } else {
        return _this;
    }
}
function setColor(colorgrade) {
    var color = ["#CCFFFF","#009999"];
    var widthtemp = 400 / colorgrade+'px';
    for (var i = 0; i < color.length - 1; i++) {

        var gradient = new gradientColor(color[i], color[i + 1], colorgrade);
        for (var j = 0; j < gradient.length; j++) {
            var div = document.getElementById("colorlegend");
            var span = document.createElement("span");
            span.id = 'legend' + (i + 1);
            span.style.width = widthtemp;
            span.style.height = "10px";
            span.style.float = "left";
            span.style.backgroundColor = gradient[j];
            div.appendChild(span);
            gradientColorValue.push(gradient[j]);
        }

    }

};


//动态添加变化点
function addShinePoint(positon) {
    //变化图层信息
    let positondata = JSON.parse(positon);
    let x = 1;
    let flog = true;
    console.log(positondata);
    for (var i in positondata) {
        var lon = positondata[i].x;
        var lat = positondata[i].y;
        var h = positondata[i].z;
        viewer.entities.add({

            position: new Cesium.Cartesian3.fromDegrees(lon, lat, h),//new Cesium.Cartesian3.fromDegrees(data.lbh.ls, data.lbh.bs, data.lbh.hs),
            billboard: {
                image: "../Resources/img/pointcloud/3.png",
                color: new Cesium.CallbackProperty(function () {
                    if (flog) {
                        x = x - 0.05;
                        if (x <= 0) {
                            flog = false;
                        }
                    } else {
                        x = x + 0.05;
                        if (x >= 1) {
                            flog = true;
                        }
                    }
                    return Cesium.Color.fromHsl(1, 1, 0.5, x);
                }, false),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                width: 20,
                height: 26,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 3000),
               // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,

            }
        });
    }

  
    //viewer.zoomTo(viewer.entities);
    viewer.scene.globe.depthTestAgainstTerrain = false;//解决地形遮挡entity问题
}