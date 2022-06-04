viewer.scene.globe.depthTestAgainstTerrain = true;//默认深度检测（地形）
document.getElementsByClassName("cesium-viewer-toolbar")[0].style = "right:25px;top:105px;width:50px;height:50px";                                  //修改工具栏样式
document.getElementsByClassName("cesium-button cesium-toolbar-button")[0].style = "width:50px;height:50px";                                         //修改工具栏样式
document.getElementsByClassName("cesium-button cesium-toolbar-button")[1].style = "width:50px;height:50px";                                         //修改工具栏样式
document.getElementsByClassName("cesium-baseLayerPicker-selected")[0].style = "width:50px;height:50px";                                             //修改工具栏样式
setTimeout(FlyToChina(), 3000);
function FlyToChina() {
    viewer.camera.flyTo({ destination: new Cesium.Rectangle.fromDegrees(73.66, 3.86, 135.05, 53.55) }, { duration: 3 });//定位中期
};


/*
 * 全局变量
 */
var handler = null;

var tree = layui.tree;
var form = layui.form;
var table = layui.table;
var util = layui.util;
var date = layui.laydate;
var elem = layui.element;

var tipslayer = -1;//全局提示层
var loadlayerindex = null;//全部加载层

var uavprojectauthlayerindex = null;     //项目授权模块
var uavprojectaddlayerindex = null;      //项目（新建）模块
var uavprojectviewlayerindex = null;     //项目（查看）模块
var uavprojecteditlayerindex = null;     //项目（编辑）模块
var selectroutetypelayerindex = null;    //航线（选择）模块
var uavrouteaddlayerindex = null;        //航线（新建）模块
var uavrouteviewlayerindex = null;       //航线（查看）模块
var uavrouteeditlayerindex = null;       //航线（编辑）模块

var headeruserlayerindex = null;//用户模块
var headerselayerindex = null;//设置模块


var uav_project_list_all = [];//航线项目数据（包括项目、模型、路径）

var current_project_id = null;                  //当前项目
var current_project_title = null;               //当前项目标题（用于高亮显示）
var current_model_id = null;                    //当前模型id
var current_project_tile = null;                //当前模型
var current_waypoint_title = null;              //当前航点标题（用于高亮显示）

var current_entities_route = [];//当前路径

var isReloadTree = false;//是否tree重载（默认否）用于处理由于tree重载触发的选中事件


/*
 * 图标
 */
var TAKEOFFICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/uav/takeoff.png" style="width:14px;height:14px;"/></span>';
var LANDINGICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/uav/landing.png" style="width:14px;height:14px;"/></span>';
var TARGETICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/uav/target.png" style="width:14px;height:14px;"/></span>';
var AVOIDICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/uav/avoid.png" style="width:14px;height:14px;"/></span>';
var TARGETAREAICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/uav/targetarea.png" style="width:14px;height:14px;"/></span>';
var MODELICON = '<span style="margin-left:0px;margin-right:2px;"><img src="../../../Resources/img/map/model.png" style="width:14px;height:14px;"/></span>';
var WAYLINECON = '<span style="margin-left:0px;margin-right:2px;"><img src="../../../Resources/img/uav/wayline.png" style="width:14px;height:14px;"/></span>';

/*
 * 默认参数
 */
var takeoffheight = 400;         //(默认值)起飞点高度，单位m
var initialspeed = 8;            //(默认值)初始速度，单位m/s
var routespeed = 8;              //(默认值)航线速度，单位m/s

var avoidheight = 150;           //(默认值)避障点高度，单位m
var landingheight = 100;         //(默认值)降落点高度，单位m

var adjustdistance = 5;         //(默认值)调整距离，单位m
var photodistance = 80;         //(默认值)拍照距离，单位m
var adjustspeed = 1;            //(默认值)调整速度，单位m/s
var hovertime = 3000;           //(默认值)悬停时间，单位ms
var yawangle = 180;             //(默认值)偏航角，单位°  [-180,180]
var pitchangle = 0;             //(默认值)偏航角，单位°    [-90,0]

var gsd = 1;                    //地面分辨率，单位cm
var forwardoverlap = 80;        //航向重叠度，百分比
var sideoverlap = 70;           //旁向重叠度，百分比
var multiangle = false;         //首末航向多角度
var doublegrid = false;         //井字形
var directmodify = false;       //方向修正（计算第二次自定义平面坐标系y正轴点出错导致的方向错误）

var level = true;              //是否水平


//HomeButton
viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
    e.cancel = true;

    if (current_entities_route.length > 0) {
        ZoomToEntities(current_entities_route);
    }
    else if (current_project_tile != null) {
        if (current_project_tile.data.MXSJ != undefined && current_project_tile.data.MXSJ != "") {
            viewer.scene.camera.setView(JSON.parse(current_project_tile.data.MXSJ));
        }
        else {
            viewer.zoomTo(current_project_tile);
        }
    }
    else {
        FlyToChina();//定位中国
    }
});


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

//高亮并展开当前项目
function MarkCurrentProject() {
    for (var i in uav_project_list_all) {
        if (uav_project_list_all[i].id == current_project_id) {
            uav_project_list_all[i].spread = true;
            current_project_title = uav_project_list_all[i].title;
        }
        else {
            uav_project_list_all[i].spread = false;
        }
    }

    tree.reload('uav-project-list-treeid', { data: uav_project_list_all });
    MarkNode();//高亮当前节点 
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
    if (uavprojectauthlayerindex != null) {
        layer.close(uavprojectauthlayerindex);
        uavprojectauthlayerindex = null;
    }

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

    if (headeruserlayerindex != null) {
        layer.close(headeruserlayerindex);
        headeruserlayerindex = null;
    }

    if (headerselayerindex != null) {
        layer.close(headerselayerindex);
        headerselayerindex = null;
    }

    //TODO
};


//万盛
viewer.entities.add(new Cesium.Entity({
    id: "temp2ws",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            106.86684645, 28.95672323,
            106.86684696, 28.94813039,
            106.87472686, 28.94813976,
            106.87472635, 28.95673260,
            106.86684645, 28.95672323,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
//南川
viewer.entities.add(new Cesium.Entity({
    id: "temp2nc",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            107.11190217, 29.19144726,
            107.11174175, 29.19149364,
            107.11138999, 29.19159533,
            107.11092873, 29.19175821,
            107.11025532, 29.19204424,
            107.10961096, 29.19218695,
            107.10899318, 29.19195008,
            107.10906485, 29.19174638,
            107.10948626, 29.19154361,
            107.10997687, 29.19139578,
            107.11025859, 29.19115264,
            107.11037334, 29.19077418,
            107.11029071, 29.19062777,
            107.10991201, 29.18982133,
            107.11072889, 29.19001898,
            107.11085372, 29.19004813,
            107.11097912, 29.19007537,
            107.11110504, 29.19010071,
            107.11123145, 29.19012412,
            107.11135830, 29.19014560,
            107.11144277, 29.19015880,
            107.11144277, 29.19015880,
            107.11149400, 29.19021098,
            107.11151366, 29.19101241,
            107.11151460, 29.19102117,
            107.11151571, 29.19102992,
            107.11151699, 29.19103864,
            107.11151845, 29.19104735,
            107.11152008, 29.19105604,
            107.11152189, 29.19106470,
            107.11152387, 29.19107333,
            107.11152602, 29.19108192,
            107.11152834, 29.19109049,
            107.11153083, 29.19109902,
            107.11153350, 29.19110751,
            107.11153633, 29.19111595,
            107.11153933, 29.19112436,
            107.11154250, 29.19113271,
            107.11154584, 29.19114102,
            107.11154934, 29.19114927,
            107.11155300, 29.19115747,
            107.11155683, 29.19116561,
            107.11156083, 29.19117370,
            107.11156498, 29.19118172,
            107.11156929, 29.19118968,
            107.11157376, 29.19119757,
            107.11157839, 29.19120539,
            107.11158318, 29.19121314,
            107.11158811, 29.19122081,
            107.11159321, 29.19122841,
            107.11159845, 29.19123593,
            107.11160384, 29.19124337,
            107.11160938, 29.19125073,
            107.11161507, 29.19125800,
            107.11162090, 29.19126519,
            107.11162687, 29.19127228,
            107.11163298, 29.19127928,
            107.11163924, 29.19128619,
            107.11164563, 29.19129300,
            107.11165215, 29.19129972,
            107.11165881, 29.19130633,
            107.11166560, 29.19131284,
            107.11167252, 29.19131925,
            107.11167957, 29.19132555,
            107.11168674, 29.19133174,
            107.11169404, 29.19133782,
            107.11170145, 29.19134379,
            107.11170898, 29.19134965,
            107.11171663, 29.19135539,
            107.11172439, 29.19136101,
            107.11173227, 29.19136652,
            107.11174025, 29.19137190,
            107.11174834, 29.19137716,
            107.11175653, 29.19138230,
            107.11176483, 29.19138731,
            107.11177322, 29.19139220,
            107.11178171, 29.19139695,
            107.11179029, 29.19140158,
            107.11179897, 29.19140608,
            107.11180773, 29.19141044,
            107.11181658, 29.19141467,
            107.11182551, 29.19141876,
            107.11183452, 29.19142272,
            107.11184361, 29.19142654,
            107.11185278, 29.19143022,
            107.11186202, 29.19143376,
            107.11187132, 29.19143716,
            107.11188070, 29.19144041,
            107.11189013, 29.19144353,
            107.11189963, 29.19144650,
            107.11190217, 29.19144726,
            107.11190217, 29.19144726,
            107.11190217, 29.19144726,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));
viewer.entities.add(new Cesium.Entity({
    id: "temp2nc1",
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            107.11351080, 29.19573135,
            107.11335038, 29.19577773,
            107.11315571, 29.19583401,
            107.11301060, 29.19588525,
            107.11202251, 29.19630493,
            107.10916401, 29.19693805,
            107.10272665, 29.19446968,
            107.10435809, 29.18983342,
            107.10116146, 29.18302468,
            107.11209520, 29.18567061,
            107.11213335, 29.18567945,
            107.11217168, 29.18568771,
            107.11221017, 29.18569539,
            107.11224881, 29.18570248,
            107.11228758, 29.18570898,
            107.11232647, 29.18571489,
            107.11236548, 29.18572021,
            107.11240459, 29.18572493,
            107.11244378, 29.18572906,
            107.11248305, 29.18573259,
            107.11252239, 29.18573552,
            107.11256178, 29.18573785,
            107.11260121, 29.18573958,
            107.11264066, 29.18574071,
            107.11268014, 29.18574124,
            107.11271961, 29.18574117,
            107.11275908, 29.18574050,
            107.11279853, 29.18573923,
            107.11283795, 29.18573736,
            107.11287732, 29.18573488,
            107.11291664, 29.18573181,
            107.11295589, 29.18572814,
            107.11299506, 29.18572388,
            107.11303414, 29.18571901,
            107.11307312, 29.18571356,
            107.11311198, 29.18570751,
            107.11315071, 29.18570087,
            107.11318930, 29.18569364,
            107.11322774, 29.18568582,
            107.11326602, 29.18567742,
            107.11330413, 29.18566844,
            107.11334205, 29.18565888,
            107.11337977, 29.18564875,
            107.11341728, 29.18563804,
            107.11345458, 29.18562676,
            107.11349164, 29.18561491,
            107.11352846, 29.18560251,
            107.11356502, 29.18558954,
            107.11360132, 29.18557602,
            107.11363734, 29.18556195,
            107.11367308, 29.18554733,
            107.11369233, 29.18553918,
            107.11369233, 29.18553918,
            107.11659335, 29.18849430,
            107.11662204, 29.18966042,
            107.11665724, 29.18973288,
            107.11669099, 29.18980586,
            107.11672327, 29.18987934,
            107.11675408, 29.18995330,
            107.11678340, 29.19002772,
            107.11681123, 29.19010257,
            107.11683756, 29.19017783,
            107.11686238, 29.19025348,
            107.11688568, 29.19032949,
            107.11690746, 29.19040585,
            107.11692771, 29.19048253,
            107.11694642, 29.19055950,
            107.11696359, 29.19063674,
            107.11697921, 29.19071423,
            107.11699327, 29.19079195,
            107.11700578, 29.19086987,
            107.11701673, 29.19094796,
            107.11702611, 29.19102621,
            107.11703393, 29.19110459,
            107.11704018, 29.19118307,
            107.11704486, 29.19126164,
            107.11704796, 29.19134026,
            107.11704949, 29.19141892,
            107.11704945, 29.19149759,
            107.11704783, 29.19157625,
            107.11704464, 29.19165486,
            107.11703987, 29.19173342,
            107.11703354, 29.19181189,
            107.11702563, 29.19189025,
            107.11701616, 29.19196847,
            107.11700512, 29.19204654,
            107.11699253, 29.19212443,
            107.11697837, 29.19220211,
            107.11696267, 29.19227957,
            107.11694541, 29.19235677,
            107.11692662, 29.19243370,
            107.11690629, 29.19251033,
            107.11688442, 29.19258663,
            107.11686104, 29.19266259,
            107.11683613, 29.19273818,
            107.11680972, 29.19281338,
            107.11678180, 29.19288817,
            107.11675240, 29.19296252,
            107.11672151, 29.19303641,
            107.11668914, 29.19310981,
            107.11665531, 29.19318271,
            107.11662003, 29.19325509,
            107.11658330, 29.19332691,
            107.11654515, 29.19339816,
            107.11650557, 29.19346882,
            107.11646458, 29.19353887,
            107.11642220, 29.19360828,
            107.11637843, 29.19367704,
            107.11633330, 29.19374511,
            107.11628681, 29.19381249,
            107.11623897, 29.19387915,
            107.11618981, 29.19394507,
            107.11613934, 29.19401023,
            107.11608757, 29.19407462,
            107.11603452, 29.19413820,
            107.11598021, 29.19420097,
            107.11592464, 29.19426289,
            107.11586785, 29.19432397,
            107.11580984, 29.19438416,
            107.11575063, 29.19444347,
            107.11569025, 29.19450186,
            107.11562871, 29.19455933,
            107.11556602, 29.19461585,
            107.11550222, 29.19467140,
            107.11543731, 29.19472598,
            107.11537132, 29.19477956,
            107.11530426, 29.19483212,
            107.11523617, 29.19488366,
            107.11516705, 29.19493415,
            107.11509693, 29.19498358,
            107.11502583, 29.19503194,
            107.11495378, 29.19507920,
            107.11488079, 29.19512536,
            107.11480688, 29.19517041,
            107.11473209, 29.19521432,
            107.11465643, 29.19525708,
            107.11457992, 29.19529869,
            107.11450259, 29.19533912,
            107.11442446, 29.19537837,
            107.11434556, 29.19541643,
            107.11426591, 29.19545328,
            107.11418554, 29.19548891,
            107.11410446, 29.19552331,
            107.11402270, 29.19555647,
            107.11394030, 29.19558838,
            107.11385726, 29.19561903,
            107.11377363, 29.19564841,
            107.11368942, 29.19567652,
            107.11360466, 29.19570334,
            107.11351938, 29.19572886,
            107.11351080, 29.19573135,
            107.11351080, 29.19573135,
        ]),
        width: 2,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.AQUA,
        show: true,
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
    },
}));