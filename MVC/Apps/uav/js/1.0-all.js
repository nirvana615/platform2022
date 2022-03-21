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

///*
// * 修改样式
// */
////document.getElementsByClassName("cesium-viewer-fullscreenContainer")[0].style = "right:5px;top:7px;width:32px;height:32px;border-radius:14%;";    //修改全屏按钮样式
//document.getElementsByClassName("cesium-viewer-toolbar")[0].style = "right:100px;top:31px;width:50px;height:50px";                                  //修改工具栏样式
//document.getElementsByClassName("cesium-button cesium-toolbar-button")[0].style = "width:50px;height:50px";                                         //修改工具栏样式
//document.getElementsByClassName("cesium-button cesium-toolbar-button")[1].style = "right:60px;top:-54px;width:50px;height:50px";                    //修改工具栏样式
//document.getElementsByClassName("cesium-baseLayerPicker-selected")[0].style = "width:50px;height:50px";                                             //修改工具栏样式
/*
 * 修改样式
 */
//document.getElementsByClassName("cesium-viewer-fullscreenContainer")[0].style = "right:5px;top:7px;width:32px;height:32px;border-radius:14%;";    //修改全屏按钮样式
//document.getElementsByClassName("cesium-viewer-toolbar")[0].style = "right:25px;top:245px;width:50px;height:50px";                                  //修改工具栏样式
document.getElementsByClassName("cesium-viewer-toolbar")[0].style = "right:25px;top:105px;width:50px;height:50px";                                  //修改工具栏样式
document.getElementsByClassName("cesium-button cesium-toolbar-button")[0].style = "width:50px;height:50px";                                         //修改工具栏样式
document.getElementsByClassName("cesium-button cesium-toolbar-button")[1].style = "width:50px;height:50px";                                         //修改工具栏样式
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
//            107.19790483, 29.00713451,
//            107.20006406, 29.0064723,
//            107.20153543, 29.01027174,
//            107.20209383, 29.01282270999999,
//            107.20025698, 29.0131761,
//            107.19965554, 29.01151572,
//            107.19797971, 29.01210366,
//            107.1973568, 29.00972129,
//            107.19790483, 29.00713451,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));

viewer.entities.add(new Cesium.Entity({
    id: "temp2",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.114984, 31.023948,
            110.092245, 31.010384,
            110.075799, 31.010670,
            110.056631, 31.012984,
            110.053327, 31.022283,
            110.070679, 31.022899,
            110.084938, 31.024783,
            110.099680, 31.027742,
            110.115848, 31.032179,
            110.137411, 31.031335,
            110.136209, 31.026145,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));




////笔架山
//viewer.entities.add(new Cesium.Entity({
//    id: "temp2q",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.9608916379216, 31.049241358005325, 109.94454168012479, 31.05311222471737, 109.95410899596268, 31.060256177472567, 109.96676914778644, 31.055978740406147,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////手爬岩
//viewer.entities.add(new Cesium.Entity({
//    id: "temp2w",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.9526812207276, 31.054904171739988, 109.9487761201371, 31.056936498573393, 109.94620493761194, 31.05942727492844, 109.94605997308203, 31.06091750537098, 109.94763028877564, 31.061095626772236, 109.94997085692334, 31.059082900942713, 109.9518446619089, 31.05767769130874, 109.95325088837274, 31.056422185447012,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////老鼠错
//viewer.entities.add(new Cesium.Entity({
//    id: "temp2e",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.97902031664796, 31.04750195006375, 109.97508882266402, 31.05301484761365, 109.96885175717473, 31.0589567184116, 109.963112614404, 31.0612377338558, 109.95457650823234, 31.05600828837301, 109.96880475864907, 31.046816121018313, 109.97078125557721, 31.042401828599104,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////授书台
//viewer.entities.add(new Cesium.Entity({
//    id: "temp2r",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.98933027624207, 31.018052073534207, 110.0016107284326, 31.020253453215364, 109.99754746074706, 31.024346044052642, 109.99219982206009, 31.030887391106212, 109.99057159192968, 31.034903062319483, 109.98873822248493, 31.037746048636517, 109.9802223388522, 31.033953777149794, 109.9865977202739, 31.02416996678478,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////青岩子
//viewer.entities.add(new Cesium.Entity({
//    id: "temp2t",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            110.07131984089843, 31.01951879658518, 110.07019644373159, 31.023071959381742, 110.0673919860377, 31.02268407302254, 110.06446546488846, 31.022200439895222, 110.06136370058198, 31.022709178879616, 110.05857177486855, 31.022463933630185, 110.05896873512725, 31.01827208950524,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////曲子滩
//viewer.entities.add(new Cesium.Entity({
//    id: "temp2y",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            110.07577269051261, 31.02208167631082, 110.0753122275969, 31.02342307296759, 110.07230663468562, 31.02313922710119, 110.0705797574365, 31.023219237429384, 110.0697117726774, 31.023098162771014, 110.07029178439134, 31.021273062334316,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////南山内
//viewer.entities.add(new Cesium.Entity({
//    id: "temp2u",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            110.08321538799622, 31.022003683067357, 110.08322755075542, 31.023526200058665, 110.08168519183845, 31.023942405213855, 110.07986177094989, 31.0243824796606, 110.07887499680551, 31.024119352368874, 110.078744563261, 31.0228309998158,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////果园场
//viewer.entities.add(new Cesium.Entity({
//    id: "temp2i",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            110.09001564189994, 31.02525680889818, 110.09015110221773, 31.02587110720685, 110.08938734323489, 31.025940926370367, 110.08851993447341, 31.025852485843945, 110.08802179434467, 31.025836166585375, 110.08766509733033, 31.025573231870712, 110.08783928296145, 31.024900098970505,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////史家嘴
//viewer.entities.add(new Cesium.Entity({
//    id: "temp2o",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            110.10222327426298, 31.02870447301856, 110.1041432199303, 31.02488958038685, 110.09972457908648, 31.02609592746352, 110.09936119181826, 31.027613310088217, 110.10105637007455, 31.028641840130547,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////下后山
//viewer.entities.add(new Cesium.Entity({
//    id: "temp2p",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            110.11653259233213, 31.030987336802816, 110.11651692353955, 31.032313128590093, 110.1130651589414, 31.031883470940745, 110.11086565735566, 31.031186336269784, 110.11136256502701, 31.029627333937317,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////黄南背
//viewer.entities.add(new Cesium.Entity({
//    id: "temp2s",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            110.12090111219608, 31.031616868753435, 110.12088828532319, 31.032677944432283, 110.11948670920705, 31.03252472560365, 110.11823409822254, 31.032458649380263, 110.11695820767021, 31.032332190847004, 110.11702072782018, 31.03165637416705,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////沁水湾
//viewer.entities.add(new Cesium.Entity({
//    id: "temp2d",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            110.13332783046373, 31.030291336732954, 110.13362132040271, 31.03120329837304, 110.13167555466562, 31.031517199797737, 110.13143208612311, 31.030608882560404,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));




//沁水湾
viewer.entities.add(new Cesium.Entity({
    id: "temp2q",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.1328864523702, 31.030986137220143, 110.13275222824699, 31.03100800718323, 110.13254364026217, 31.031048183202756, 110.13241436305519, 31.031031142102993, 110.13218419366541, 31.031014068523657, 110.13217578129115, 31.030995139764546, 110.13225348161774, 31.030977633616743, 110.13244902660742, 31.030989767360133, 110.13263675362721, 31.030950563504383, 110.13281358906309, 31.030927568954617, 110.13288222085123, 31.03086894802806, 110.13290998135135, 31.030855438081083, 110.13294072926934, 31.03089280498792, 110.13294192094126, 31.03093596869638, 110.13293756112112, 31.030966828212026,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));

//黄南背1
viewer.entities.add(new Cesium.Entity({
    id: "temp2w",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.12041206410471, 31.03219481098926, 110.12048291145625, 31.032199017515577, 110.12053632636848, 31.03220881183351, 110.12060547747176, 31.03221810470266, 110.12068484475847, 31.032221703085582, 110.1207406253324, 31.03222307374559, 110.1207519737003, 31.032247859740558, 110.12077041559887, 31.032295156533188, 110.12075993839774, 31.032317724986893, 110.120703190144, 31.032308698811306, 110.1205706183124, 31.03230487782709, 110.12041575773621, 31.03228054466124, 110.12029108932255, 31.03226127971839, 110.12019318506464, 31.03226546507786, 110.12010671623925, 31.032246109271032, 110.12007102092858, 31.032247381290425, 110.12001951402539, 31.03223020951487, 110.12009652706482, 31.03221732192888, 110.1201153047521, 31.032212113582673, 110.1201463496537, 31.032199572913548, 110.12022089445264, 31.032209589406474, 110.12031722713078, 31.032208949500436, 110.12037983323027, 31.03221286276644,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//黄南背2
viewer.entities.add(new Cesium.Entity({
    id: "temp2e",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.11764819449999, 31.03238623996447, 110.11762182680347, 31.032383197651217, 110.11757525024434, 31.032408668270907, 110.11751998742346, 31.03239730857322, 110.11742988815996, 31.032425281978316, 110.11735362167012, 31.032391731327053, 110.11727705354379, 31.032359846241462, 110.11726279932702, 31.03235092985518, 110.117246483473, 31.032350212808048, 110.1172483968121, 31.03235174547205,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));

//下后山1
viewer.entities.add(new Cesium.Entity({
    id: "temp2r",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([

            110.11593899943603, 31.031992158152743, 110.11611644671953, 31.032016425992424, 110.11628030132711, 31.032016107587303, 110.11623035801014, 31.03214265432698, 110.11605863746145, 31.03220896443918, 110.11576399048701, 31.032101307294308, 110.11556120887956, 31.032034503012337, 110.11551519201392, 31.031954867094097, 110.11554638412595, 31.031913305656545, 110.11573512788549, 31.03195455185137, 110.11588860202407, 31.031948369884397,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//下后山2
viewer.entities.add(new Cesium.Entity({
    id: "temp2t",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([

            110.11475072491285, 31.03169909508877, 110.11497467594357, 31.031732155633932, 110.11510625999209, 31.031742513972695, 110.11512831795761, 31.0317929523078, 110.11516054298191, 31.031932700276144, 110.11514484909604, 31.031941705537967, 110.11488413358535, 31.031983664330035, 110.11467967299124, 31.031938102045014, 110.11438496327311, 31.031909987833654, 110.11398356076222, 31.031877475867667, 110.11378898529148, 31.0318847789463, 110.11358175106808, 31.03190217072419, 110.11350183621786, 31.031932160614364, 110.11351945900921, 31.031809691197818, 110.1135608113594, 31.031710280243658, 110.11365303387845, 31.03167383269621, 110.11383823086148, 31.031665877988384, 110.11420203606042, 31.03170518298576, 110.11454961668869, 31.031745684198125,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//下后山3
viewer.entities.add(new Cesium.Entity({
    id: "temp2y",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.11292570066945, 31.031465257598487, 110.11241025179014, 31.03133966597051, 110.1118636542585, 31.03116445755101, 110.11165262978957, 31.03097113026539, 110.11182163971557, 31.030748425092682, 110.11224288126098, 31.03083121307347, 110.1128884498645, 31.030991524260646, 110.11304507350997, 31.03097999576373, 110.11320446359028, 31.031006528438212, 110.11309562609395, 31.031279276679463, 110.11306944384998, 31.031343708283444, 110.11301878085652, 31.031369011352815,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//史家嘴1
viewer.entities.add(new Cesium.Entity({
    id: "temp2i",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.10166027683117, 31.02883461411733, 110.10166326392321, 31.02883569538013, 110.1014876827486, 31.028810428008647, 110.10136056988277, 31.02879733077289, 110.10131981271684, 31.028789566992614, 110.10124227154802, 31.028780032173437, 110.10118778849045, 31.02875211393727, 110.10129256710051, 31.028729373068508, 110.10132492288315, 31.028706596650927, 110.10141758801508, 31.028712387621297, 110.10147916362007, 31.028721019904037, 110.10156388247002, 31.02875264369529, 110.10161902621789, 31.028742568523644, 110.10164004112657, 31.02877333803675, 110.10165575810684, 31.02879786452446,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//史家嘴2
viewer.entities.add(new Cesium.Entity({
    id: "temp2u",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.10081197340004, 31.02831162662027, 110.10072953345966, 31.0282978346697, 110.10068099623595, 31.028275101446713, 110.10073021230136, 31.02821664341564, 110.10079394798325, 31.02820285442044, 110.10082328988877, 31.028256453232167, 110.10084206204047, 31.028280661300048, 110.10083573570077, 31.028312849361285, 110.10083040021243, 31.02830050349599,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//果园场
viewer.entities.add(new Cesium.Entity({
    id: "temp2p",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.08916815604658, 31.025963498108, 110.08914760766697, 31.025971270558454, 110.08913558226284, 31.025926715884403, 110.08912528639476, 31.02590963607278, 110.08908903977378, 31.025885246104952, 110.08906625342401, 31.025870603233145, 110.0890509133685, 31.025848734355723, 110.08899792932608, 31.025868240006655, 110.08897565449683, 31.0258950517863, 110.08895743776988, 31.025888997638553, 110.08892907616041, 31.025922574455603, 110.08878805475712, 31.02583307792098, 110.08873529744402, 31.025825522995035, 110.08870227260495, 31.025799755976266, 110.08869560822734, 31.025828063327015, 110.08871059153117, 31.025897127710863, 110.08886990146969, 31.0259481910687, 110.08898870936962, 31.02598173947796,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//南山内1
viewer.entities.add(new Cesium.Entity({
    id: "temp2a",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.08251655075463, 31.02335890861678, 110.08257776318077, 31.023368677337338, 110.08262649840084, 31.023357481901765, 110.08261040616314, 31.023310771467088, 110.08261252311424, 31.023239884680393, 110.0825969922262, 31.023205418896154, 110.0825710281832, 31.023165260130646, 110.08252248642178, 31.023158450931625, 110.08245354092777, 31.02314089225558, 110.08242571371665, 31.02314067745193, 110.0823860051611, 31.023176647067213, 110.08233522269977, 31.02317696750394, 110.08235285080583, 31.023187243620843, 110.08236412242096, 31.0232053614446, 110.08239250949204, 31.023216924746805, 110.08242566836131, 31.023242339888004, 110.08245462314336, 31.02323941050233, 110.08249759602474, 31.02338115263982,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//南山内2
viewer.entities.add(new Cesium.Entity({
    id: "temp2s",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.08126382800049, 31.02410399698763, 110.08125939711034, 31.02412165032841, 110.0811764151766, 31.024157630811086, 110.08117270726943, 31.024136942351753, 110.0811757914505, 31.02412396649847, 110.08117525197329, 31.024112321393446, 110.08117423012271, 31.024107233233863, 110.0811624208836, 31.024095408726733, 110.08113822600184, 31.024096404690404, 110.08113178761947, 31.024097969087208, 110.08113381402691, 31.02408619445558, 110.08118210510811, 31.024052335770143, 110.08121199579679, 31.024049131088734, 110.08122792746728, 31.02405266157189, 110.08123408973721, 31.024065726925016, 110.08123478515029, 31.02406799211958, 110.08123855306691, 31.024073314974608, 110.08124160916958, 31.024074859055492, 110.08126053853812, 31.02407651492278, 110.08125839169966, 31.024085601423394,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));



//南山内3
viewer.entities.add(new Cesium.Entity({
    id: "temp2d",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.08212964498033, 31.02378420827634, 110.08210823410288, 31.02379217241101, 110.08206254459715, 31.023789567515283, 110.0820261126446, 31.023804813633806, 110.0819490380992, 31.023779189411076, 110.0819090724587, 31.02379449489014, 110.08190673060851, 31.023797393401924, 110.08193486101531, 31.023812529153876, 110.0819635831232, 31.023751691742795, 110.08203253969184, 31.023711318613664, 110.0820664867625, 31.02364491916239, 110.08210555237713, 31.023676347247367, 110.08210955103145, 31.023717789629224, 110.08213605085083, 31.023753946892153, 110.08212648064544, 31.023768203510787,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//南山内4
viewer.entities.add(new Cesium.Entity({
    id: "temp2f",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.08027862472723, 31.02426630943572, 110.08026595780423, 31.024276885956517, 110.08025253129126, 31.024278182357946, 110.08025257832695, 31.024309044040574, 110.08023947249218, 31.024333609540456, 110.08018730026026, 31.024323661146862, 110.08014901867413, 31.024330831142926, 110.0801524605729, 31.024335598625143, 110.08016378710121, 31.024328906779257, 110.08017493176634, 31.024308521511482, 110.08018623487413, 31.024284307078208, 110.08019705133432, 31.02426251154928, 110.08022051864084, 31.024245418826695, 110.08024201488173, 31.02422869692692, 110.08024827902548, 31.024235358380075, 110.08025579130323, 31.02424290635474,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//曲子滩1
viewer.entities.add(new Cesium.Entity({
    id: "temp2g",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.07471075466398, 31.02321107713712, 110.07464243597126, 31.02320794574725, 110.07457356330517, 31.023198518056688, 110.07453663607309, 31.023193222176666, 110.07454512285098, 31.02317859975585, 110.07455482171913, 31.023159094320736, 110.07456631182514, 31.02314319234623, 110.07457470010701, 31.023141939784388, 110.07455583626896, 31.023112157911214, 110.07458613814235, 31.02311510009621, 110.07463494139107, 31.02311211676427, 110.07469165757595, 31.02314162084924, 110.07471223098254, 31.023143932545295, 110.07470907009969, 31.023168114651934, 110.07470526041871, 31.02319319483149, 110.07470225625966, 31.02320026938553,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//曲子滩2
viewer.entities.add(new Cesium.Entity({
    id: "temp2h",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.07396175245628, 31.02311380527042, 110.07388666347158, 31.023136520367334, 110.07388186274893, 31.023095015546936, 110.07390918835202, 31.02307450729005, 110.07397533939898, 31.02303096424208, 110.0739771394398, 31.02295024755422, 110.07401382111115, 31.022881712704464, 110.07401513805705, 31.022850790483346, 110.0740747318087, 31.022840271519094, 110.07418372929267, 31.022850935494628, 110.0743074595755, 31.022844358231787, 110.074367704016, 31.022840755340855, 110.07430529529815, 31.0228549512504, 110.0742852479737, 31.022886219065658, 110.07422144997471, 31.022912140071945, 110.07419328716826, 31.022986885492827, 110.07407746988329, 31.023087346264735, 110.07399444968738, 31.023085643935058,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//曲子滩3
viewer.entities.add(new Cesium.Entity({
    id: "temp2j",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.07375067452948, 31.023205635050207, 110.07367597006004, 31.023232066713156, 110.07355999298339, 31.02320501380014, 110.07357280783148, 31.023159176842682, 110.07357330519446, 31.023123277244537, 110.07359553082513, 31.023041940848398, 110.0736394185473, 31.023012979155126, 110.07363169605877, 31.02298543922833, 110.07363280834983, 31.0229416686522, 110.07374258515038, 31.02293409473365, 110.07380440974251, 31.022969929173346, 110.07388407850317, 31.02293401519944, 110.07390951053755, 31.0229417355319, 110.07385137415841, 31.02303750090761, 110.07384169336075, 31.023064463186405, 110.07382927479536, 31.023090129877538, 110.07379872158182, 31.023133870516023,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//曲子滩4
viewer.entities.add(new Cesium.Entity({
    id: "temp2k",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.07352539845957, 31.02321729355277, 110.07348801087839, 31.023234839145772, 110.07334556499906, 31.02321689350518, 110.07326918170943, 31.023183507178953, 110.07325351706164, 31.023183413399973, 110.07323159027344, 31.023168669075183, 110.07315581665905, 31.023120406809685, 110.07311324216278, 31.02304935419228, 110.07311249058323, 31.022998181849633, 110.07310616252249, 31.02296822670865, 110.07316695650977, 31.022969228219406, 110.07326093778366, 31.022963848318998, 110.07337229743136, 31.023029499085933, 110.07349038406973, 31.022999906994972, 110.07353861883432, 31.02299983457805, 110.07355685779062, 31.02301082683069, 110.07356013448135, 31.02301576046583, 110.07356252064635, 31.023044111505744, 110.07356195754828, 31.02311237729692, 110.07355727041916, 31.023116338193084, 110.07354659769412, 31.023139037623174, 110.07354861597382, 31.023162397781505, 110.07354556087452, 31.023179467526862, 110.07353618427815, 31.023190402127494,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//曲子滩5
viewer.entities.add(new Cesium.Entity({
    id: "temp2l",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.07323794589136, 31.02319601706343, 110.07318168742341, 31.023223707966626, 110.07312812439527, 31.02324362330287, 110.07305747322624, 31.023249069468946, 110.07300521424796, 31.02324768110129, 110.07293548343557, 31.023211091353517, 110.0729042827021, 31.023194916412393, 110.07288963382346, 31.02317546923207, 110.07288421609181, 31.02318487284399, 110.07288771417376, 31.023181631723755, 110.07287881372125, 31.023148635159032, 110.07287715185366, 31.023141632697637, 110.07287070622692, 31.023135506685296, 110.07287475825986, 31.02313049937407, 110.0728839982474, 31.02311206326756, 110.07287812931193, 31.02305340952696, 110.07290022720262, 31.022962928989998, 110.07294542698588, 31.022927141332236, 110.07296290303645, 31.02293428583663, 110.07300045458557, 31.022950807794356, 110.07306901612168, 31.022969634291382, 110.07306068741369, 31.022974652010816, 110.0730716126953, 31.022990427644377, 110.07306515892328, 31.02299705502888, 110.07307250465712, 31.02300828957398, 110.07307436190405, 31.02302354872514, 110.07308225478475, 31.02305169740829, 110.07310655205333, 31.02309642812838, 110.07318403813147, 31.023168030406815, 110.07321920869175, 31.023186969385925, 110.07323387872037, 31.023190383546012,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//曲子滩6
viewer.entities.add(new Cesium.Entity({
    id: "temp2z",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.07259826075055, 31.02311647380121, 110.07256885277036, 31.023135314842264, 110.07252160186061, 31.02313886210454, 110.07247290097361, 31.023137491865242, 110.0723225021018, 31.023102291498134, 110.07228594144888, 31.023132144137282, 110.07222861383379, 31.023146678900098, 110.07218128513529, 31.023160587896616, 110.07199002126862, 31.023177038074213, 110.07176465366445, 31.02319712772073, 110.0715181646351, 31.023225079841918, 110.07130954632262, 31.023195147664214, 110.07111864426838, 31.023138667928617, 110.07096005607515, 31.023102398539084, 110.07081758882023, 31.02309342385549, 110.07075311696957, 31.02310135242158, 110.0707152575318, 31.02309911731656, 110.07070438466631, 31.023117189070607, 110.07066894212858, 31.023155514384644, 110.07059236510639, 31.023162442752895, 110.07046151610086, 31.02315504666413, 110.07046694048778, 31.023122598287266, 110.07046913437405, 31.023060487182907, 110.07053340279296, 31.02306807239465, 110.07056635626996, 31.023042105266473, 110.07067220396169, 31.023015627549256, 110.07068175571811, 31.02301484065826, 110.07076263692889, 31.02303740213558, 110.07081555272504, 31.023027279319155, 110.07089700248598, 31.023042375867046, 110.0709532731761, 31.023043883751086, 110.07099482255016, 31.023037358283446, 110.07111846519162, 31.02302567250912, 110.07123724335635, 31.023019736441796, 110.07149153329054, 31.02304715383141, 110.07176745312215, 31.023011899383004, 110.07213798007795, 31.023000853305845, 110.0724059299685, 31.02292485592037, 110.07244145635634, 31.022914424100733, 110.0725140084373, 31.022918237431725, 110.07257497003931, 31.022893384693255, 110.07262607172932, 31.022880329906524, 110.07269072388524, 31.02287145232455, 110.07270862666441, 31.022867614282227, 110.07276043578679, 31.02287198853527, 110.07274204658425, 31.022891277863746, 110.07271651559056, 31.022970690923035, 110.0727074793835, 31.022982666555546, 110.07268582396378, 31.02304200876345, 110.07266739323691, 31.023073433522686, 110.07266184422811, 31.02306875863945, 110.0726388002799, 31.023082451614876, 110.07261353768958, 31.023103277116384,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//青岩子1
viewer.entities.add(new Cesium.Entity({
    id: "temp2x",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.06007523225574, 31.022083775864665, 110.05998051298702, 31.022069553533125, 110.0597108025852, 31.022050812002593, 110.05955008037523, 31.022057807125954, 110.05955825371863, 31.02206196834473, 110.05957722807416, 31.02204816169102, 110.0596139144838, 31.02203859340976, 110.05963919589524, 31.022038396640202, 110.0597407152915, 31.02204798814566, 110.0598189179811, 31.022021235574538, 110.05987716375083, 31.02201726416545, 110.05998427950033, 31.022055575784382, 110.06002488866758, 31.022045972963394, 110.06005940332516, 31.02206514643102,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//青岩子2
viewer.entities.add(new Cesium.Entity({
    id: "temp2c",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.06932394614991, 31.022672165692992, 110.06928465290382, 31.022666741340135, 110.06926889949352, 31.022662243914503, 110.06925048391662, 31.02265312616657, 110.06923418300357, 31.022648709030467, 110.06924795544167, 31.022656789054082, 110.06924213989808, 31.022658097190156, 110.06921750904569, 31.022662164369663, 110.06918615691275, 31.022645344727835, 110.06917448933696, 31.022634595904254, 110.06919446291008, 31.022646809467624, 110.06918828983662, 31.022643979400307, 110.06922166455891, 31.02265573382126, 110.06928044965665, 31.022647827453742,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//青岩子3
viewer.entities.add(new Cesium.Entity({
    id: "temp2v",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.06897791196862, 31.02256936424149, 110.0689480350275, 31.022558491612305, 110.06890057112162, 31.022535690640353, 110.06887761889479, 31.022536291791383, 110.06887659667451, 31.02252572757925, 110.068873886089, 31.02252385038136, 110.06887034733337, 31.022519014084725, 110.06886434928884, 31.02250745948109, 110.0688641582816, 31.022495386007208, 110.06886599858329, 31.022490031252214, 110.06890909735107, 31.0224927071624, 110.06897195462187, 31.022510982511474, 110.0689767132527, 31.022527231077568, 110.06897567963583, 31.022546861381848, 110.06898589392262, 31.02254517171216, 110.06898654575684, 31.02255040559133, 110.068990108518, 31.022562351527995,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//青岩子4
viewer.entities.add(new Cesium.Entity({
    id: "temp2b",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.06832787904315, 31.02258560378539, 110.06834642605472, 31.022582264729543, 110.06836187419526, 31.022570772806127, 110.06836385736881, 31.02256941998316, 110.06837260420599, 31.022559967132675, 110.06838885300438, 31.022545958325416, 110.06839107337998, 31.022538267956726, 110.06837191191656, 31.022493383900326, 110.06833740983353, 31.022479011168603, 110.06831231865273, 31.02248165236902, 110.06829023501014, 31.022481646137063, 110.0682555729837, 31.022489001579615, 110.06820029119861, 31.022485434238696, 110.06820891526, 31.02249190432917, 110.06823236904702, 31.022503430679784, 110.06823299846526, 31.02251630091572, 110.06824118810052, 31.022523723278955, 110.06826790429818, 31.02254675625217, 110.06827755937908, 31.022546905161953, 110.06828907054563, 31.02255646100669, 110.06830303487705, 31.022564422803132, 110.06831431007653, 31.022569065483623, 110.06831960710383, 31.022579190282784,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//青岩子5
viewer.entities.add(new Cesium.Entity({
    id: "temp2n",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.06788430332236, 31.022662945125457, 110.06761207242626, 31.022633475201708, 110.06761314370372, 31.022629860455584, 110.06763211165759, 31.022589288290735, 110.06764388901358, 31.02256467137072, 110.06764527869528, 31.022568404534617, 110.06767310241459, 31.022541834601174, 110.0676915561564, 31.022531964289996, 110.06771812050626, 31.02252904798857, 110.06779062183665, 31.02252835387289, 110.06786214367527, 31.022529758657495, 110.06790683476443, 31.022527058955852, 110.06790621585525, 31.022539501379153, 110.06790245063719, 31.022567804381982, 110.06789790855365, 31.022598544899946, 110.06788745056096, 31.022638107300164,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//青岩子6
viewer.entities.add(new Cesium.Entity({
    id: "temp2m",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.06439021944571, 31.021778115464006, 110.06440188854349, 31.02175914144094, 110.06438855682536, 31.021748749432994, 110.06437465565489, 31.021736337693394, 110.06438405318038, 31.021734312789718, 110.06438349652794, 31.02170937369283, 110.0643983304885, 31.0216950911775, 110.06439526843073, 31.02169555188088, 110.06437036072744, 31.02169140423836, 110.06434248862669, 31.02169345929294, 110.0643209002869, 31.02169965365765, 110.06430119018447, 31.021734846564396, 110.06428847018155, 31.02173480250532, 110.06428615052303, 31.02173895186262, 110.0642850368906, 31.02178895380554, 110.06429011082724, 31.021794605714177, 110.06429193005229, 31.0218013664743, 110.06429063878255, 31.02180132690428, 110.06429508370022, 31.02180902802897, 110.06430517898865, 31.021811622863634, 110.0643324984751, 31.02181002451518,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//青岩子7
viewer.entities.add(new Cesium.Entity({
    id: "temp2qa",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.06318992885417, 31.022380704214303, 110.06309012046314, 31.02242864508757, 110.06300021642662, 31.022445639302106, 110.06301166663474, 31.022443556916162, 110.06302672056437, 31.022407309173335, 110.06304364892118, 31.02239182709923, 110.06308468600557, 31.02238130359742, 110.06309220762382, 31.022370806508643, 110.06313278358903, 31.0223462721547, 110.06317413226198, 31.022336858845616, 110.06323660119729, 31.02233327180306, 110.06326396359022, 31.02231652986742, 110.0632665807672, 31.022321983236683, 110.06326109416287, 31.022330489755397, 110.06325980728985, 31.022346848469315, 110.06323829074739, 31.022341601959532, 110.06322971042049, 31.02235672537157, 110.06320702323774, 31.022366324408832,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//青岩子8
viewer.entities.add(new Cesium.Entity({
    id: "temp2qw",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.06296499236768, 31.022468766083087, 110.06281638883988, 31.02252756339466, 110.06274830515267, 31.02251779957998, 110.0627607294113, 31.02246307871575, 110.06276855372839, 31.022418270712706, 110.06277563413266, 31.0224410612834, 110.0627892219906, 31.022433014408676, 110.06292312035066, 31.022382890518795, 110.0629897006815, 31.02237799218149, 110.06298977625798, 31.022399116065277, 110.0629836571755, 31.022415020746955, 110.06297893745554, 31.022428285509278, 110.0629703119093, 31.022445617005207,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//青岩子9
viewer.entities.add(new Cesium.Entity({
    id: "temp2er",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.06106770995088, 31.02227428782183, 110.06101850098077, 31.022264028250476, 110.06095199943164, 31.022259275583465, 110.06092575762867, 31.02226083013732, 110.0609140922912, 31.02227507336065, 110.0609552141829, 31.02229698631639, 110.06102792749951, 31.022320802449688, 110.06105132240019, 31.022314388387468, 110.06106523298126, 31.022299814557048, 110.0610674280725, 31.022295021514584,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//青岩子10
viewer.entities.add(new Cesium.Entity({
    id: "temp2rf",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            110.06036396521571, 31.022319997505978, 110.06047222011466, 31.02245817827694, 110.06057581386231, 31.022488200734802, 110.0606157415636, 31.02250331446992, 110.0606534126325, 31.022509278112835, 110.06067478502041, 31.022510004847742, 110.0606733806479, 31.022458531168958, 110.06067076447249, 31.022396018395916, 110.0606793279953, 31.022353697628667, 110.06068918321685, 31.022315603516866, 110.06067722336772, 31.022290054627177, 110.06066884419391, 31.02224276098916, 110.0606640030539, 31.0222210811433, 110.06066171703895, 31.0222146227299, 110.06062427720774, 31.022201402055234, 110.06050611767988, 31.02215572807295, 110.06049669626765, 31.022149127329044, 110.06045052184389, 31.022134962123843, 110.06045857620543, 31.022141637308604, 110.06044971823945, 31.022180394775255, 110.06043995304569, 31.022206076924245, 110.06038350007817, 31.022271082813077, 110.06038234109862, 31.022299485652862,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//授书台1
viewer.entities.add(new Cesium.Entity({
    id: "temp2vc",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            109.99875950670557, 31.021789549988256, 109.99875743564445, 31.021851499714014, 109.99863300788384, 31.021968627793314, 109.99852425070851, 31.0220761826184, 109.99845710158966, 31.022144914618263, 109.99839546585814, 31.02223371306225, 109.99833923394108, 31.022186284425718, 109.99833755586378, 31.022110059093936, 109.99838101364256, 31.022057609905374, 109.99839355376281, 31.022045651735283, 109.99842167142899, 31.022002552635467, 109.99840129590365, 31.022039122810206, 109.99834894870429, 31.022024400651368, 109.99833518376069, 31.022021225835182, 109.99834704201955, 31.021996425047995, 109.99834911369183, 31.021944911690287, 109.9984353890333, 31.02194651442434, 109.9985178835608, 31.021896347799515, 109.99859629778548, 31.02186644527214, 109.99866636552854, 31.021775117225257, 109.99873587309638, 31.021742769389334, 109.99875657735946, 31.021757970383028,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//授书台2
viewer.entities.add(new Cesium.Entity({
    id: "temp2fg",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            109.99061483889591, 31.02503900009283, 109.99060508237156, 31.025055884254478, 109.99058329548095, 31.02507665635793, 109.99055498949386, 31.025081738469716, 109.99052764060251, 31.025073313081894, 109.99051332509231, 31.025064952082833, 109.99049640222218, 31.025065656700797, 109.99045483186022, 31.025051508004672, 109.99042483784581, 31.0250410864921, 109.99041030996759, 31.02501058029736, 109.99040164525525, 31.024976194599095, 109.99042347835596, 31.024932646952134, 109.99045554503326, 31.024939136822816, 109.99051670097816, 31.024954965425888, 109.9905423099109, 31.02496322263085, 109.99057528982324, 31.024974744550388, 109.99060272393862, 31.025003457005305, 109.9906047597069, 31.025021204574738,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//授书台3
viewer.entities.add(new Cesium.Entity({
    id: "temp2hg",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            109.99039738865626, 31.026518102660837, 109.99040601215543, 31.02649204688099, 109.99042943911003, 31.02650001608345, 109.99044515515583, 31.026494672017257, 109.99045286818685, 31.026514418254312, 109.9904345191977, 31.026486373758452, 109.9904235139027, 31.026511461429834, 109.99040148470975, 31.026523676575998, 109.99034853469087, 31.026521421601174, 109.99033324372608, 31.026532224858173, 109.99032408413527, 31.026532980212785, 109.99032370161731, 31.026554236815322, 109.99033132469548, 31.026560363317856, 109.99033989785543, 31.026565151918007, 109.99036001396631, 31.026581631450046, 109.99037463622103, 31.02655275187903,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//授书台4
viewer.entities.add(new Cesium.Entity({
    id: "tempdd2",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            109.98851635640085, 31.02842494668737, 109.98852154019902, 31.028484568645375, 109.98851175875082, 31.0286117680789, 109.98850909921703, 31.028635231963825, 109.98852590771298, 31.028633353877222, 109.9885135384649, 31.02863909218357, 109.9885042371764, 31.028644706083412, 109.98849851436847, 31.02864534768198, 109.98846307289665, 31.02864400690231, 109.98841105215513, 31.028630497020643, 109.98836781491184, 31.02861833469441, 109.98843939921572, 31.028527603701377, 109.98852180478664, 31.028474304358284, 109.98852159417795, 31.028450719247374, 109.98849993083118, 31.028452880045258, 109.98847375982366, 31.02843866938579,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//授书台5
viewer.entities.add(new Cesium.Entity({
    id: "temp2rr",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            109.9922704396161, 31.026623151131673, 109.9922713037261, 31.026631581985583, 109.99227635622277, 31.02667386818156, 109.99227846509179, 31.02675037219649, 109.99226304304902, 31.02680781316779, 109.99223327642922, 31.026831912136434, 109.99216927218924, 31.026814978471073, 109.99212288581921, 31.026804041270967, 109.99206891364935, 31.026782801007037, 109.9920672196585, 31.026775092422987, 109.99207786669315, 31.026758233288337, 109.9921049063382, 31.026728539208122, 109.99211162101903, 31.02667969116519, 109.99214918791711, 31.026658861050127, 109.99220731270393, 31.02665177599434, 109.99222379954402, 31.026646677259553, 109.99227252370653, 31.02662980052402, 109.99226789938942, 31.026623709139898,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//授书台6
viewer.entities.add(new Cesium.Entity({
    id: "temp2tt",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            109.9895318543667, 31.035474560991158, 109.98940932430173, 31.035516792577713, 109.98932175061842, 31.035560317382608, 109.98918407696786, 31.035593967637155, 109.98911428838497, 31.03561658272255, 109.98909227400736, 31.03568062802037, 109.98906775974163, 31.035736683132054, 109.98895580646122, 31.035812364319565, 109.98872495259515, 31.035783528652253, 109.98874665726838, 31.035451571970604, 109.98872832121017, 31.035292515543127, 109.98871280758563, 31.035189870293543, 109.98867986805818, 31.035022534424993, 109.98866576370958, 31.034956750560887, 109.98862878940824, 31.03483324630151, 109.9885682039497, 31.03474403416049, 109.98856642695137, 31.03462648746508, 109.9888433379275, 31.034550287479973, 109.98899440583752, 31.03462290023041, 109.98907216092914, 31.03466588610604, 109.9892181612641, 31.034836181948773, 109.98927728630687, 31.03491149297743, 109.98928598245712, 31.03495882383285,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//老鼠错1
viewer.entities.add(new Cesium.Entity({
    id: "temp2yyy",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            109.97654169805945, 31.047758810863662, 109.9765476064526, 31.04776917635864, 109.9765459112473, 31.04780470267429, 109.97654040475169, 31.047798775203525, 109.97647628587855, 31.047786927730417, 109.97644244825399, 31.047774257200814, 109.9764681320703, 31.04774527584726, 109.9764750768064, 31.04773725191554, 109.9764788063361, 31.04773298001726, 109.97650010148485, 31.047740563363085, 109.9765081577735, 31.047743475768357, 109.97652637280927, 31.047748859108005, 109.97653596775518, 31.04775333253442, 109.97653661087641, 31.0477565944381,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//老鼠错2
viewer.entities.add(new Cesium.Entity({
    id: "temp2uu",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            109.97640294758378, 31.047760507681918, 109.97640743213816, 31.04776949847709, 109.97640170099702, 31.047778098408138, 109.97637921960788, 31.047780690532253, 109.9763578183581, 31.04777183590639, 109.97634480905123, 31.047753473227534, 109.97633940061517, 31.047742250816945, 109.97632637889568, 31.047718162126216, 109.97633044800033, 31.047712645527696, 109.97634516993287, 31.04771829023078, 109.97636289329121, 31.047723929742627, 109.97637876237883, 31.047729702355127, 109.97638535763083, 31.04773479191341, 109.97639534101623, 31.04774129007076, 109.97640220414783, 31.047744309969556, 109.9764057749576, 31.047750018258387,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//老鼠错3
viewer.entities.add(new Cesium.Entity({
    id: "temp2iu",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            109.97064100433612, 31.04999801506204, 109.97062140650628, 31.050030888849317, 109.97060840127878, 31.050077094819653, 109.97054726242857, 31.050090357577673, 109.97049800361829, 31.0500876748436, 109.97053656348355, 31.050088615014438, 109.97056096977417, 31.05009465374977, 109.97058731126388, 31.05007320703479, 109.97062946318273, 31.05005044282276, 109.9706531536885, 31.050023932111348, 109.97064380596532, 31.049999996254023, 109.97063685893784, 31.04999250685752, 109.9705924387015, 31.049960171935034, 109.97062340109785, 31.04997616286862,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//老鼠错4
viewer.entities.add(new Cesium.Entity({
    id: "temp2ik",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            109.96724998287769, 31.058501226440427, 109.96720098809895, 31.05855190276023, 109.96713028836746, 31.05858621635679, 109.96711493889889, 31.05858450511153, 109.96711984650587, 31.05856037460694, 109.96711049776431, 31.05851642603914, 109.96710445898448, 31.058474236086912, 109.96707649406538, 31.058379847743165, 109.96705093312151, 31.058323746498733, 109.96703359378309, 31.05825831733442, 109.9671194871618, 31.05831275014752, 109.96720163540355, 31.0583607712543, 109.96723467682696, 31.058375964105053, 109.96723227542991, 31.05838239115881, 109.96725685699505, 31.058427221598695,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//老鼠错5
viewer.entities.add(new Cesium.Entity({
    id: "temp2fv",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            109.96616899050417, 31.057891496310912, 109.96617256474993, 31.05791055581592, 109.96616901117983, 31.05794342718157, 109.96614787532556, 31.05796983931025, 109.96612933301178, 31.058010817396354, 109.96603256474398, 31.05821236594189, 109.96601955793456, 31.05822577507757, 109.96598465962525, 31.058270317370077, 109.96583952550621, 31.058254600247544, 109.96568488722593, 31.05832056566052, 109.96565102519273, 31.058345448552426, 109.96556840949074, 31.058308065996588, 109.96550595838185, 31.058314876915325, 109.96539832332833, 31.058337885049852, 109.96526267799236, 31.058441670230795, 109.9651820420018, 31.058430928414104, 109.96488190233973, 31.05851904521945, 109.96469547187016, 31.05848042848412, 109.96457714447939, 31.058484343533816, 109.96458946971941, 31.058428955785836, 109.96481425918644, 31.058415393541093, 109.96486033280785, 31.058313696777624, 109.96496640504525, 31.058283419585706, 109.96497908923261, 31.05828873765956, 109.96506988305791, 31.058199202281997, 109.965139499493, 31.0580992862234, 109.96540905254685, 31.05811460804684, 109.96575087303962, 31.05797648958899, 109.96592900662338, 31.05786845009591, 109.96611907592231, 31.057737435026045, 109.96618067384978, 31.057664519131652, 109.9661955115594, 31.05776083799667, 109.9661954346992, 31.05786479478212, 109.96619123248729, 31.057877190566323,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));























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

