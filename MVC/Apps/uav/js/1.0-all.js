/*
 * 全局对象
 */
var handler = null;

var tree = layui.tree;
var form = layui.form;
var table = layui.table;
var util = layui.util;
var date = layui.laydate;
var elem = layui.element;


var tipslayer = -1;//全局提示层

var uavprojectaddlayerindex = null;     //项目（新建）模块
var uavprojectviewlayerindex = null;    //项目（查看）模块
var uavprojecteditlayerindex = null;    //项目（编辑）模块


var selectroutetypelayerindex = null;   //航线（选择）模块
var uavrouteaddlayerindex = null;       //航线（新建）模块
var uavrouteviewlayerindex = null;      //航线（查看）模块
var uavrouteeditlayerindex = null;      //航线（编辑）模块

var headeruserlayerindex = null;                                //用户信息
var headerselayerindex = null;                                  //设置



var uav_project_list_all = [];//用户全部项目列表


var current_project_id = null;//当前项目
var current_project_title = null;//当前项目标题（用于高亮显示）
var current_waypoint_title = null;//当前航点标题（用于高亮显示）
var current_project_tile = null;//当前模型
var current_project_pointcloudid = null;//当前点云

var current_entities_route = [];//当前路径

//TODO var current_primitives = [];//当前模型


viewer.scene.globe.depthTestAgainstTerrain = true;                     //影响无模型pickPosition(默认false，当需要从地形pickPosition获取位置时设置true)

/*
 * 图标常量
 */
var TAKEOFFICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/uav/takeoff.png" style="width:14px;height:14px;"/></span>';
var LANDINGICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/uav/landing.png" style="width:14px;height:14px;"/></span>';
var TARGETICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/uav/target.png" style="width:14px;height:14px;"/></span>';
var AVOIDICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/uav/avoid.png" style="width:14px;height:14px;"/></span>';
var TARGETAREAICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/uav/targetarea.png" style="width:14px;height:14px;"/></span>';


/*
 * 默认参数
 */
var routespeed = 15;             //(默认值)航线速度，单位m/s
var takeoffheight = 400;         //(默认值)起飞点高度，单位m
var avoidheight = 150;           //(默认值)避障点高度，单位m
var landingheight = 100;         //(默认值)降落点高度，单位m
var adjustdistance = 5;         //(默认值)调整距离，单位m
var photodistance = 50;           //(默认值)拍照距离，单位m
var adjustspeed = 1;            //(默认值)调整速度，单位m/s
var hovertime = 3000;           //(默认值)悬停时间，单位ms
var yawangle = 180;             //(默认值)偏航角，单位°  [-180,180]
var pitchangle = 0;             //(默认值)偏航角，单位°    [-90,0]

var target_offset_x = 5;        //(默认值)目标点x轴范围，单位m
var target_offset_y = 5;        //(默认值)目标点y轴范围，单位m
var target_offset_z = 5;        //(默认值)目标点z轴范围，单位m


var gsd = 5;                    //地面分辨率，单位cm
var forwardoverlap = 80;        //航向重叠度，百分比
var sideoverlap = 70;           //旁向重叠度，百分比
var multiangle = false;          //首末航向多角度
var doublegrid = false;         //井字形
var directmodify = false;       //方向修正（计算第二次自定义平面坐标系y正轴点出错导致的方向错误）

var level = true;              //是否水平





//重写HomeButton功能
viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
    e.cancel = true;
    if (projectentities.length > 0) {
        viewer.flyTo(projectentities, { duration: 5, offset: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-90), 3000) });
    }
    else {
        //缩放至中国
        FlyToChina();
    }
});

/*
 * 修改样式
 */
//document.getElementsByClassName("cesium-viewer-fullscreenContainer")[0].style = "right:5px;top:7px;width:32px;height:32px;border-radius:14%;";    //修改全屏按钮样式
document.getElementsByClassName("cesium-viewer-toolbar")[0].style = "right:100px;top:31px;width:50px;height:50px";                                  //修改工具栏样式
document.getElementsByClassName("cesium-button cesium-toolbar-button")[0].style = "width:50px;height:50px";                                         //修改工具栏样式
document.getElementsByClassName("cesium-button cesium-toolbar-button")[1].style = "right:60px;top:-54px;width:50px;height:50px";                    //修改工具栏样式
document.getElementsByClassName("cesium-baseLayerPicker-selected")[0].style = "width:50px;height:50px";                                             //修改工具栏样式


//初始定位
setTimeout(FlyToChina(), 3000);
function FlyToChina() {
    viewer.camera.flyTo({
        destination: new Cesium.Rectangle.fromDegrees(73.66, 3.86, 135.05, 53.55)               //定位中国
    }, { duration: 3 });
};
//home按钮功能
viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (commandInfo) {
    FlyToChina();
    commandInfo.cancel = true;
});





//加载3d tiles模型
function LoadModel(obj) {
    viewer.scene.globe.depthTestAgainstTerrain = false;

    //var modelurl = "../Data/SurModel" + obj.mxlj;//本地加载
    var modelurl = datasurl + "/SurModel" + obj.mxlj;//远程加载

    //删除上一个模型（当前机制只允许一个模型）
    if (current_project_tile != null) {
        //根据路径判断是否为同一模型
        if (current_project_tile._url != modelurl) {
            viewer.scene.primitives.remove(current_project_tile);
            current_project_tile = null;
            current_project_pointcloudid = null;

            //添加模型
            current_project_tile = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                url: modelurl,
                maximumScreenSpaceError: isMobile.any() ? 1 : 1,
                maximumNumberOfLoadedTiles: isMobile.any() ? 1000 : 1000
            }));

            viewer.zoomTo(current_project_tile);
            //当前点云id
            current_project_pointcloudid = obj.pointcloudid;
        }
    }
    else {
        //添加模型
        current_project_tile = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            url: modelurl,
            maximumScreenSpaceError: isMobile.any() ? 1 : 1,
            maximumNumberOfLoadedTiles: isMobile.any() ? 1000 : 1000
        }));

        viewer.zoomTo(current_project_tile);
        //当前点云id
        current_project_pointcloudid = obj.pointcloudid;
    }
};



//viewer.entities.add(new Cesium.Entity({
//    id: "temp01",
//    polyline: {
//        positions: JSON.parse('[{"x":-1865503.6563887487,"y":5140409.01237329,"z":3273177.561799544},{"x":-1865489.451961745,"y":5140380.785180962,"z":3273136.3845110703},{"x":-1865480.5078674087,"y":5140357.564218494,"z":3273090.8318478693},{"x":-1865474.313043673,"y":5140332.40217229,"z":3273044.8311525},{"x":-1865482.0919583335,"y":5140316.99575149,"z":3273021.0309318043},{"x":-1865511.8440768267,"y":5140313.519942936,"z":3273006.3059291015},{"x":-1865564.199332517,"y":5140313.864882115,"z":3272994.134903806},{"x":-1865597.595849911,"y":5140308.473159849,"z":3272995.251899851},{"x":-1865613.786201937,"y":5140307.122253495,"z":3273011.9216060094},{"x":-1865625.3622384933,"y":5140278.547545624,"z":3273042.1877074055},{"x":-1865625.6904448594,"y":5140282.4627299225,"z":3273081.6133994237},{"x":-1865612.7526607425,"y":5140296.44575127,"z":3273118.8853470907},{"x":-1865581.644785834,"y":5140334.704936574,"z":3273165.4077684404},{"x":-1865556.703705958,"y":5140376.090892927,"z":3273192.6027794858},{"x":-1865530.7264869122,"y":5140407.519405227,"z":3273184.349317252},{"x":-1865514.771582632,"y":5140411.672664847,"z":3273180.6628717855}]'),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
//viewer.entities.add(new Cesium.Entity({
//    id: "temp02",
//    polyline: {
//        positions: JSON.parse('[{"x":-1862842.8431771635,"y":5141632.242339687,"z":3272554.6257984005},{"x":-1862862.5346319836,"y":5141634.667641102,"z":3272560.838561151},{"x":-1862874.141757359,"y":5141616.168476768,"z":3272568.061029114},{"x":-1862880.1985642486,"y":5141604.130217071,"z":3272565.4733128888},{"x":-1862890.8204234375,"y":5141585.37220723,"z":3272549.0433844426},{"x":-1862898.6290628521,"y":5141566.05687672,"z":3272519.922021682},{"x":-1862908.2111297408,"y":5141556.578490375,"z":3272491.6779150707},{"x":-1862886.8533946972,"y":5141578.379582619,"z":3272480.0482375803},{"x":-1862857.4186862356,"y":5141593.041371594,"z":3272471.936660646},{"x":-1862828.2761862467,"y":5141602.957656863,"z":3272472.520777005},{"x":-1862812.638024803,"y":5141613.723141597,"z":3272484.596613254},{"x":-1862814.7628484834,"y":5141620.391733053,"z":3272499.6722538546},{"x":-1862822.813309095,"y":5141624.217071381,"z":3272525.9347942155},{"x":-1862840.175417811,"y":5141633.197741999,"z":3272550.4419574016}]'),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
//viewer.entities.add(new Cesium.Entity({
//    id: "temp03",
//    polyline: {
//        positions: JSON.parse(' [{"x":-1862765.256155016,"y":5141577.135780198,"z":3272343.267753761},{"x":-1862767.6698113051,"y":5141593.804808394,"z":3272377.905985414},{"x":-1862773.550549931,"y":5141599.731299544,"z":3272403.5771427834},{"x":-1862788.9578144122,"y":5141604.077202373,"z":3272427.6703376723},{"x":-1862822.440618894,"y":5141597.95289372,"z":3272451.397890543},{"x":-1862863.7495071425,"y":5141582.0678391,"z":3272460.796222325},{"x":-1862891.5261994968,"y":5141565.342476507,"z":3272463.2732049157},{"x":-1862922.5022989686,"y":5141535.165336155,"z":3272466.422099648},{"x":-1862928.5233508935,"y":5141505.630286083,"z":3272419.2904023738},{"x":-1862932.2282664548,"y":5141495.757278038,"z":3272378.898824687},{"x":-1862923.2477178383,"y":5141489.791542401,"z":3272342.998189053},{"x":-1862916.2567973435,"y":5141488.7342317095,"z":3272306.3468657467},{"x":-1862894.3407252985,"y":5141487.400363698,"z":3272287.4250145056},{"x":-1862838.2108317008,"y":5141538.121790733,"z":3272281.3736715736},{"x":-1862790.7631916725,"y":5141541.923430099,"z":3272282.764575273},{"x":-1862767.038111971,"y":5141557.771014329,"z":3272313.9171203533},{"x":-1862763.8293769003,"y":5141571.403757687,"z":3272330.038693258}]'),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
//viewer.entities.add(new Cesium.Entity({
//    id: "temp04",
//    polyline: {
//        positions: JSON.parse('[{"x":-1862792.1749950699,"y":5141472.495521914,"z":3272068.2117632707},{"x":-1862786.648541161,"y":5141482.797019661,"z":3272090.2217712775},{"x":-1862782.8447920263,"y":5141495.5287071355,"z":3272119.320916337},{"x":-1862780.094714439,"y":5141502.964735717,"z":3272132.064715686},{"x":-1862797.3021808243,"y":5141501.666899616,"z":3272141.2678615325},{"x":-1862826.4981361171,"y":5141491.180435007,"z":3272150.563194416},{"x":-1862850.0611140127,"y":5141480.696002077,"z":3272155.7604413554},{"x":-1862870.5073422408,"y":5141462.744329192,"z":3272157.545017813},{"x":-1862887.2600967614,"y":5141454.2581363255,"z":3272141.310352752},{"x":-1862891.3376719996,"y":5141446.006086305,"z":3272113.0478969226},{"x":-1862888.9598020148,"y":5141436.680577114,"z":3272084.1217908124},{"x":-1862887.9743241877,"y":5141433.491956806,"z":3272077.1818212154},{"x":-1862845.5361190538,"y":5141446.789725685,"z":3272073.070714339},{"x":-1862801.1154535592,"y":5141471.53743195,"z":3272062.177590355}]'),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
//viewer.entities.add(new Cesium.Entity({
//    id: "temp05",
//    polyline: {
//        positions: JSON.parse('[{"x":-1863877.0564251447,"y":5140901.220959181,"z":3272661.819603163},{"x":-1863871.5721670506,"y":5140908.794888782,"z":3272681.7033920595},{"x":-1863869.5238343528,"y":5140912.333348896,"z":3272703.1198533466},{"x":-1863881.1266797695,"y":5140908.287285992,"z":3272722.637560369},{"x":-1863898.0062288127,"y":5140892.171448731,"z":3272732.7399584493},{"x":-1863920.5022174679,"y":5140883.184340907,"z":3272723.161530854},{"x":-1863925.4308913806,"y":5140878.390906114,"z":3272702.3143700794},{"x":-1863924.3500422544,"y":5140874.073553471,"z":3272676.0120117073},{"x":-1863900.720237187,"y":5140879.564922846,"z":3272655.8300223807},{"x":-1863881.893138633,"y":5140896.356454344,"z":3272655.22875603}]'),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
//viewer.entities.add(new Cesium.Entity({
//    id: "temp06",
//    polyline: {
//        positions: JSON.parse('[{"x":-1864032.0292232314,"y":5140853.153812301,"z":3272849.8197194217},{"x":-1864022.357594234,"y":5140868.088930492,"z":3272870.8706208854},{"x":-1864020.5604995354,"y":5140878.373258043,"z":3272894.4452201},{"x":-1864027.238703288,"y":5140881.945606796,"z":3272914.9383424046},{"x":-1864047.559655221,"y":5140873.448914605,"z":3272930.064690078},{"x":-1864065.7257815877,"y":5140860.798650615,"z":3272939.5345932716},{"x":-1864086.2129006318,"y":5140862.997290974,"z":3272932.0161764883},{"x":-1864098.2022461023,"y":5140854.150145037,"z":3272921.755059601},{"x":-1864099.8198376324,"y":5140841.378288044,"z":3272898.3146546287},{"x":-1864099.8480743691,"y":5140829.929640029,"z":3272867.7897476135},{"x":-1864100.4535234128,"y":5140824.015239014,"z":3272846.399207437},{"x":-1864075.575208005,"y":5140825.3683010815,"z":3272840.8320288067},{"x":-1864039.130585588,"y":5140845.4989039255,"z":3272838.637991247},{"x":-1864032.0454495454,"y":5140850.997847295,"z":3272844.166581877}]'),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
//viewer.entities.add(new Cesium.Entity({
//    id: "temp07",
//    polyline: {
//        positions: JSON.parse('[{"x":-1863994.3252029472,"y":5140859.325945073,"z":3272731.935569755},{"x":-1864001.7182628845,"y":5140857.0313312365,"z":3272708.2445925036},{"x":-1864009.7138288708,"y":5140851.175227812,"z":3272696.8560252804},{"x":-1864020.813678865,"y":5140825.758491862,"z":3272711.705005739},{"x":-1864038.539690202,"y":5140823.715058002,"z":3272720.1890364373},{"x":-1864039.21567047,"y":5140828.291023674,"z":3272737.258763461},{"x":-1864034.4289716699,"y":5140832.769624673,"z":3272756.645812363},{"x":-1864016.99723871,"y":5140844.034859599,"z":3272753.099822648},{"x":-1863997.1405833166,"y":5140860.347909553,"z":3272736.551450224},{"x":-1863994.5559722816,"y":5140861.0034174835,"z":3272734.2678399617}]'),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
//viewer.entities.add(new Cesium.Entity({
//    id: "temp08",
//    polyline: {
//        positions: JSON.parse('[{"x":-1864109.883515125,"y":5140852.707261569,"z":3272950.694357097},{"x":-1864114.5216564515,"y":5140841.560986048,"z":3272921.200757488},{"x":-1864122.4069239195,"y":5140829.284083115,"z":3272886.160299423},{"x":-1864132.6440526515,"y":5140815.643446066,"z":3272862.1659675953},{"x":-1864147.1059511125,"y":5140812.4859255785,"z":3272850.143743837},{"x":-1864167.3759235304,"y":5140800.98838786,"z":3272854.2060717144},{"x":-1864194.078990043,"y":5140761.773738055,"z":3272881.952166002},{"x":-1864215.508237227,"y":5140750.555294959,"z":3272896.2240883633},{"x":-1864233.292059397,"y":5140749.060323536,"z":3272903.7569833007},{"x":-1864246.1215168412,"y":5140749.172597126,"z":3272927.1518812464},{"x":-1864254.0908358798,"y":5140762.558413976,"z":3272960.0525371768},{"x":-1864250.8865347167,"y":5140782.311845488,"z":3272995.1895588273},{"x":-1864235.3247948089,"y":5140800.149957315,"z":3273025.4249674953},{"x":-1864194.1975127168,"y":5140810.676709926,"z":3273035.835706524},{"x":-1864158.6675956403,"y":5140823.583676679,"z":3273016.622949851},{"x":-1864125.6324878202,"y":5140836.8020276595,"z":3272982.923428679},{"x":-1864116.4200260872,"y":5140853.3332816595,"z":3272956.7344007823}]'),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
//viewer.entities.add(new Cesium.Entity({
//    id: "temp09",
//    polyline: {
//        positions: JSON.parse('[{"x":-1864221.2055845277,"y":5140675.712981216,"z":3272565.948029644},{"x":-1864202.7302955606,"y":5140694.830429787,"z":3272607.369232847},{"x":-1864185.3182107024,"y":5140719.847713164,"z":3272635.449803983},{"x":-1864170.6685703234,"y":5140745.378226139,"z":3272664.383228151},{"x":-1864156.6051526235,"y":5140762.015741373,"z":3272696.5046763397},{"x":-1864162.932985913,"y":5140763.542870609,"z":3272728.5484461132},{"x":-1864192.2607465084,"y":5140742.779451059,"z":3272754.7193199163},{"x":-1864249.4189131686,"y":5140718.031039685,"z":3272779.5389875346},{"x":-1864284.9397058068,"y":5140716.487055107,"z":3272776.2579201222},{"x":-1864298.1909073081,"y":5140698.584149297,"z":3272766.683903018},{"x":-1864305.8064321266,"y":5140665.397614894,"z":3272724.6950912215},{"x":-1864308.3928545073,"y":5140651.115522365,"z":3272692.312448461},{"x":-1864284.2931098305,"y":5140655.7564140335,"z":3272642.617155397},{"x":-1864251.593008371,"y":5140638.448636633,"z":3272590.722626269}]'),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));


//viewer.entities.add(new Cesium.Entity({
//    id: "temp1",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            106.98130131, 29.97073592,
//            106.97975636, 29.96659062,
//            106.97741747, 29.95952650,
//            106.98276043, 29.95837388,
//            106.98797464, 29.96478746,
//            106.98566794, 29.97051286,
//            106.98125839, 29.97075451,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));


//viewer.entities.add(new Cesium.Entity({
//    id: "temp2",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            107.21113139, 28.93404378,
//            107.21109921, 28.93341511,
//            107.21111006, 28.93173562,
//            107.21501877, 28.93157168,
//            107.21597435, 28.93214517,
//            107.21654338, 28.93279325,
//            107.21665047, 28.93709053,
//            107.21388023, 28.93689955,
//            107.21151781, 28.93669951,
//            107.21113139, 28.93404378,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));































//高亮节点
function MarkNode() {
    //选中节点高亮
    var nodes = document.getElementsByClassName("layui-tree-txt");
    for (var i = 0; i < nodes.length; i++) {
        if ((nodes[i].innerHTML === current_project_title) || (nodes[i].innerHTML === current_waypoint_title)) {
            nodes[i].style.color = "#009688";
            nodes[i].style.fontSize = "15px";
            nodes[i].style.fontWeight = "bold";
        }
        else {
            nodes[i].style.color = "#555555";
            nodes[i].style.fontSize = "14px";
            nodes[i].style.fontWeight = "normal";
        }
    }
};



//关闭指定图层
function CloseLayer(layerindex) {
    if (layerindex != null) {
        layer.close(layerindex);
        layerindex = null;
    }
};

//关闭所有图层
function CloseAllLayer() {
    if (uavprojectaddlayerindex != null) {
        layer.close(uavprojectaddlayerindex);
        uavprojectaddlayerindex = null;
    }
    if (uavprojectviewlayerindex != null) {
        layer.close(uavprojectviewlayerindex);
        uavprojectviewlayerindex = null;
    }
    if (uavprojecteditlayerindex != null) {
        layer.close(uavprojecteditlayerindex);
        uavprojecteditlayerindex = null;
    }

    if (selectroutetypelayerindex != null) {
        layer.close(selectroutetypelayerindex);
        selectroutetypelayerindex = null;
    }

    if (uavrouteaddlayerindex != null) {
        layer.close(uavrouteaddlayerindex);
        uavrouteaddlayerindex = null;
    }
    if (uavrouteviewlayerindex != null) {
        layer.close(uavrouteviewlayerindex);
        uavrouteviewlayerindex = null;
    }
    if (uavrouteeditlayerindex != null) {
        layer.close(uavrouteeditlayerindex);
        uavrouteeditlayerindex = null;
    }


    //TODO
};

