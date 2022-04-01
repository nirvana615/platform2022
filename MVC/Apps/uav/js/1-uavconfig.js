viewer.scene.globe.depthTestAgainstTerrain = true;//默认深度检测（地形）

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

var uavprojectauthlayerindex = null;     //项目授权模块
var uavprojectaddlayerindex = null;      //项目（新建）模块
var uavprojectviewlayerindex = null;     //项目（查看）模块
var uavprojecteditlayerindex = null;     //项目（编辑）模块
var selectroutetypelayerindex = null;    //航线（选择）模块
var uavrouteaddlayerindex = null;        //航线（新建）模块
var uavrouteviewlayerindex = null;       //航线（查看）模块
var uavrouteeditlayerindex = null;       //航线（编辑）模块

var headeruserlayerindex = null;        //用户模块
var headerselayerindex = null;          //设置模块


var uav_project_list_all = [];//用户全部项目列表


var current_project_id = null;                  //当前项目
var current_project_title = null;               //当前项目标题（用于高亮显示）
var current_waypoint_title = null;              //当前航点标题（用于高亮显示）
var current_project_tile = null;                //当前模型
var current_project_pointcloudid = null;        //当前点云

var current_entities_route = [];//当前路径

//TODO var current_primitives = [];//当前模型



/*
 * 图标常量
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

//var target_offset_x = 5;        //(默认值)目标点x轴范围，单位m
//var target_offset_y = 5;        //(默认值)目标点y轴范围，单位m
//var target_offset_z = 5;        //(默认值)目标点z轴范围，单位m


var gsd = 1;                    //地面分辨率，单位cm
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





////加载3d tiles模型
//function LoadModel(obj) {
//    viewer.scene.globe.depthTestAgainstTerrain = false;

//    //var modelurl = "../Data/SurModel" + obj.mxlj;//本地加载
//    var modelurl = datasurl + "/SurModel" + obj.mxlj;//远程加载

//    //删除上一个模型（当前机制只允许一个模型）
//    if (current_project_tile != null) {
//        //根据路径判断是否为同一模型
//        if (current_project_tile._url != modelurl) {
//            viewer.scene.primitives.remove(current_project_tile);
//            current_project_tile = null;
//            current_project_pointcloudid = null;

//            //添加模型
//            current_project_tile = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
//                url: modelurl,
//                maximumScreenSpaceError: isMobile.any() ? 1 : 1,
//                maximumNumberOfLoadedTiles: isMobile.any() ? 1000 : 1000
//            }));

//            viewer.zoomTo(current_project_tile);
//            //当前点云id
//            current_project_pointcloudid = obj.pointcloudid;
//        }
//    }
//    else {
//        //添加模型
//        current_project_tile = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
//            url: modelurl,
//            maximumScreenSpaceError: isMobile.any() ? 1 : 1,
//            maximumNumberOfLoadedTiles: isMobile.any() ? 1000 : 1000
//        }));

//        viewer.zoomTo(current_project_tile);
//        //当前点云id
//        current_project_pointcloudid = obj.pointcloudid;
//    }
//};




////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp1",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.90441649606144, 31.065680763093646, 109.90444923583047, 31.06565529875129, 109.90445017555362, 31.065610403831673, 109.90444581659237, 31.065614342724185, 109.90441128859271, 31.065632228269408, 109.9043870556591, 31.065652841913494, 109.90439069422423, 31.065658854532682,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp2",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.91625885552222, 31.06423863975172, 109.91623022594806, 31.06420882203351, 109.91623461378605, 31.06419424430324, 109.9162534381386, 31.064171564031774, 109.91628840359216, 31.0641785907979, 109.916331610567, 31.064185816160602, 109.91634643005112, 31.06419375007505, 109.9163345939291, 31.064206391209993, 109.91631649174977, 31.06425341022195, 109.91629798059479, 31.064238414031102, 109.91627446590536, 31.064241220130217,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp3",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.91651400869883, 31.06430334110401, 109.91652200566739, 31.06436258682906, 109.91656275919078, 31.064384840603793, 109.91661083303617, 31.06441073310532, 109.91663285265707, 31.064381845478884, 109.91663686459462, 31.064335905885947, 109.91658737899462, 31.064310361029147, 109.91655326526508, 31.06428983400557,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp4",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.91564843209093, 31.065627917229357, 109.91565219151165, 31.065544737555584, 109.91582669449548, 31.06555557137195, 109.91581004912368, 31.065618875300878, 109.91574891664541, 31.065607341994266,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp5",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.91639734399153, 31.066648397533527, 109.9163753007515, 31.066687930802537, 109.91634670934998, 31.066717636665093, 109.91634756613038, 31.066732792972005, 109.91638832443842, 31.06670759999282, 109.91641848770767, 31.066683072693156, 109.91646010498506, 31.066647770300897, 109.91642986174423, 31.066627256247905, 109.91645015235858, 31.066605110727078, 109.91646192339219, 31.066569993372855, 109.91641329229128, 31.06658289276047,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp6",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.92859967271174, 31.06905609220719, 109.92863577869217, 31.068907516359545, 109.92874708411613, 31.068938460937627, 109.92884218380854, 31.068950826833785, 109.92893686015509, 31.068952312783978, 109.92895537335576, 31.069024780338122, 109.92892642982495, 31.069088564112526, 109.92878832757704, 31.069141323352927,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp7",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.93001117228661, 31.069831413242735, 109.93004147808017, 31.06983715056205, 109.93007918235939, 31.069836163907897, 109.9300887895156, 31.069806641639623, 109.9300542482432, 31.069821853447714, 109.9300433393841, 31.069805269840142, 109.93000383392821, 31.069827283748044, 109.92999846855069, 31.069838229361345,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp8",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.93081898755487, 31.07063016861026, 109.9309179738226, 31.070607693043748, 109.93102064039891, 31.070601585754382, 109.93109480327013, 31.07059863230362, 109.93114370711945, 31.070577433611366, 109.93116776210728, 31.070524900260924, 109.93115868554862, 31.070522222156647, 109.93108602099723, 31.070510703426333, 109.93102171633782, 31.070503297686386, 109.93096579981358, 31.070484680817035, 109.93091997791015, 31.07050856553215, 109.93087081857232, 31.070516422615636, 109.93083504551555, 31.070550697445114,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp9",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.93158549584591, 31.07130053076085, 109.93162062644817, 31.07130431761676, 109.93165607128331, 31.071305973375374, 109.9316727985913, 31.071246968325678, 109.93166107898556, 31.07122928020464, 109.93165175053657, 31.071239188786564, 109.93161863693736, 31.071219650935642, 109.93159639682703, 31.07126626811316, 109.9315847204748, 31.0712803248162,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp10",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.9365650170874, 31.070770032223628, 109.93660512635897, 31.070746028799153, 109.93664910992688, 31.070688472942507, 109.93662123154279, 31.070682387159774, 109.93659071919208, 31.070688548037342, 109.93653755970332, 31.070729309521923, 109.93654397338268, 31.070750298944066,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp11",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.93691768077429, 31.07329351940672, 109.93711698728134, 31.07309401315249, 109.93718652585497, 31.07309125132147, 109.93719559459242, 31.073046719375196, 109.93716441906402, 31.073020242587468, 109.93691276698146, 31.072934835991298, 109.93684853128273, 31.072973483714424, 109.93684833069275, 31.07301377343064, 109.9368435679188, 31.073242294400636,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp12",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.94671717769268, 31.0725410409481, 109.94681270243653, 31.072563924054066, 109.94699599771424, 31.07241250664216, 109.94715627796933, 31.07219090464582, 109.94736975267644, 31.07203307634003, 109.94748309902697, 31.07198299446837, 109.94748793835484, 31.071772294537453, 109.9473894101239, 31.071729469214517, 109.94728554270839, 31.071744994574296, 109.94719115288777, 31.071852037636454, 109.94701793529124, 31.072053686808253, 109.94690035335456, 31.072224676427332, 109.94683395837478, 31.072395103046993, 109.94682963617979, 31.07242635705152, 109.94671828500516, 31.072475614806166,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));

////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp1",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.96033206461794, 31.05318092476976, 109.96036604883312, 31.053125061952397, 109.96035645878214, 31.053116261617983, 109.96034796893346, 31.05310945982328, 109.9603346420465, 31.053098736448405, 109.96029908483945, 31.053119919864105, 109.96023606050916, 31.053167987142803, 109.96021309711175, 31.053186204616715, 109.96019527013163, 31.0532037589195, 109.96018553284588, 31.053242713327702, 109.96017465690464, 31.05325305038072, 109.96017009833166, 31.05326925455594, 109.96019696648203, 31.053291934667175, 109.96013020086886, 31.05330589869033, 109.96012447519716, 31.053340115978802, 109.96011543388943, 31.053348216914944, 109.96010507502162, 31.053334878832363, 109.96012282905822, 31.05332560799629, 109.96018007304914, 31.05331185044408, 109.96028392623668, 31.053233668395247,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp2",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.9598019087414, 31.05473417794868, 109.95980143575005, 31.054720468749032, 109.95979303089806, 31.054718642252507, 109.95976753508674, 31.05473830994786, 109.95973064269198, 31.054764247416124, 109.95972503443959, 31.05477675806678, 109.95967358956821, 31.05479992854582, 109.95963509772756, 31.054808000715465, 109.95962909735604, 31.054809912422247, 109.95963993575691, 31.054828483511187, 109.95964460752127, 31.05482717414283, 109.959651940636, 31.054835748564546, 109.95965530056387, 31.054840001282273, 109.95966109419898, 31.05483336472473, 109.95973977310369, 31.05478817589465,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp3",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.9599310248718, 31.054812537537288, 109.95992212181129, 31.054802725838748, 109.95991892896217, 31.054812279266088, 109.9598984317091, 31.05482490416257, 109.95988224931972, 31.054841277838857, 109.95985702272327, 31.054863126796242, 109.95985449054112, 31.054875237983023, 109.95985290832499, 31.054887248967944, 109.95984207448188, 31.05489330371097, 109.95984257953303, 31.05491242301578, 109.95984195172002, 31.054905523078133, 109.95992268741485, 31.054859606154963,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp4",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.95822131785943, 31.054917528702425, 109.9581097799081, 31.05499702791163, 109.95805679755097, 31.055015466984386, 109.95794066905782, 31.055003553004365, 109.95791291133882, 31.05502063983273, 109.95789829009439, 31.05499456247157, 109.95789836057257, 31.05498729460797, 109.95793495206422, 31.054982285840897, 109.95796591960877, 31.054992114294432, 109.95800017601849, 31.054990880566315, 109.95803806638914, 31.05497162270062, 109.95806185771657, 31.054944883493604, 109.95807754883577, 31.05492917276889, 109.95810995447943, 31.054929344767054, 109.95814737800636, 31.054918714879754, 109.95816689676555, 31.05491083644689, 109.9581945898153, 31.05490893777826, 109.958208727255, 31.05491054031195, 109.95823557491778, 31.05491752759513,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp5",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.95809947420821, 31.055631878543153, 109.95804182784964, 31.055639152737815, 109.95802249651692, 31.055640886021493, 109.95800402442211, 31.055643436504916, 109.95798323197944, 31.055656268242455, 109.95797589292864, 31.05570103321253, 109.95799170402836, 31.05573587801116, 109.95796557344268, 31.055783811103936, 109.95795919793048, 31.055810138727495, 109.95794909073047, 31.055823532456174, 109.95793946810866, 31.055829075570614, 109.957945208929, 31.055853389903795, 109.95795219257144, 31.05585923495555, 109.95795396188792, 31.05586388695372, 109.95806183636314, 31.0558751186757, 109.95810015691733, 31.05585598057049, 109.95811745563738, 31.055822996138257, 109.95813885002204, 31.05575373647777, 109.95815665345702, 31.055653543101432, 109.95814868339896, 31.055642592711596, 109.95814896220786, 31.055639886707073, 109.95814060689091, 31.055632486875208,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp6",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.95910684893667, 31.056962933830718, 109.9593877499308, 31.056765795451213, 109.95940028816035, 31.056694990146386, 109.95937686003681, 31.05653201664634, 109.95934530281266, 31.056544246288375, 109.95931859424067, 31.056570527205427, 109.95924047870378, 31.05663100739645, 109.95918660689618, 31.056732081519073, 109.95909414775073, 31.05674885108822, 109.95905869133654, 31.05677148371277, 109.95899149816472, 31.056749782712615, 109.95898071933355, 31.05677936031084, 109.95900853413883, 31.056826600226177, 109.95905465829846, 31.056814897897638, 109.95906767798958, 31.056902150983834, 109.95906189487168, 31.05693589232713,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp7",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.9549664926065, 31.055333560887366, 109.95476263762353, 31.05545160862227, 109.9547400352952, 31.055423405894132, 109.95472910895222, 31.055367666366266, 109.95474615998783, 31.055343903477006, 109.95479830982623, 31.055278378819484, 109.95486402146278, 31.05522384759914, 109.95491731812757, 31.05520219666645, 109.95497774384879, 31.055176219511083, 109.95501465998603, 31.055147817055268, 109.95505977961074, 31.055122934827992, 109.95510942893631, 31.055104493681046, 109.9551554283204, 31.055084317689122, 109.95516508239713, 31.0550647907907, 109.9552075973613, 31.055051445843564, 109.9552823741218, 31.055056250632575, 109.95530959353478, 31.055056857735735, 109.95533597308919, 31.055058964172343, 109.95535797674802, 31.05508194048854, 109.95535889011724, 31.055117205987486, 109.95537672913612, 31.055141992729677, 109.95537044771007, 31.055152388699366, 109.95534316154334, 31.055144097654427, 109.95509594083109, 31.055222294546432,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp8",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.95609541737592, 31.05494603176119, 109.956151678335, 31.054912748849766, 109.95615749231199, 31.05490692148898, 109.95616263966116, 31.054906565223217, 109.956159854081, 31.054902523584797, 109.95613961556138, 31.054892596479235, 109.95613667316606, 31.054901516673283, 109.9561153826081, 31.05492305661266, 109.95601137272833, 31.05491572968396, 109.95598092720589, 31.05491427594213, 109.95600396278816, 31.05494710972664, 109.95603756668244, 31.05496251720074, 109.9560648960444, 31.054950379489892,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp9",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.95473410504236, 31.055460500197835, 109.95473360288592, 31.055455684841213, 109.95473616426554, 31.055442438616424, 109.95473786556325, 31.055426589294285, 109.95471881147823, 31.055414082864765, 109.9546296010328, 31.055408450094212, 109.95458451713344, 31.055449177718636, 109.95454288740864, 31.05550853604579, 109.95447668363923, 31.055547291546056, 109.95441384283589, 31.05558432631118, 109.95445998525534, 31.055642353755072, 109.9544739746595, 31.055682854912934, 109.9544912119378, 31.055685682308887, 109.95451923073324, 31.055697243480566, 109.9545546700392, 31.05571404481501, 109.95457544661643, 31.055622118357274, 109.95467535622873, 31.055545892224792, 109.95471215727002, 31.055501325997756,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp10",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.95445336214358, 31.055690692189817, 109.95444627547292, 31.055703575705333, 109.95438060711116, 31.055738791970157, 109.95434197861208, 31.055741808841525, 109.95431188934887, 31.055730208628855, 109.95430435687253, 31.055716866682967, 109.95430457085318, 31.05569955238825, 109.95435234788836, 31.0556929628103, 109.95438114526677, 31.05568556638664, 109.95442778188139, 31.055667592197597, 109.95445058389133, 31.055673799535676, 109.95446305164013, 31.055686578383657,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp11",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.95410792348491, 31.05587229407583, 109.95395364033887, 31.055882991750952, 109.95381186028497, 31.055924459985736, 109.95379512821204, 31.055903894100748, 109.95378037078319, 31.05587607875474, 109.95378464116038, 31.055856297221133, 109.95382229965732, 31.055826912604054, 109.95389208028385, 31.055793143230176, 109.95394647423872, 31.05578217966653, 109.95398224146776, 31.05578555699162, 109.95403362241545, 31.0557957206746, 109.95408749545095, 31.05581836911046, 109.95409867620928, 31.055845935687596,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));
////
//viewer.entities.add(new Cesium.Entity({
//    id: "temp12",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.95531442520972, 31.057486557306802, 109.95535799973281, 31.057476000706263, 109.95535470977752, 31.05746265107241, 109.95534357636043, 31.057428293142568, 109.955304412748, 31.057407175747507, 109.95526819082767, 31.057420160916262, 109.95511636806839, 31.05743208106673, 109.9550824337232, 31.057453085534608, 109.95502783069057, 31.05749834140042, 109.95506186495084, 31.057580422626362, 109.95516905539212, 31.057658542556897, 109.95527744972125, 31.057560430611975,
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
//    id: "temp12",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.95736556454875, 31.05667538888428, 109.95775119402919, 31.05661635712187, 109.95773519360537, 31.056527057385008, 109.95770515753176, 31.056488692475583, 109.95770597702968, 31.056487883618182, 109.9577064274129, 31.056501703879068, 109.95765315300896, 31.05648986712046, 109.9575705504378, 31.056535196164898, 109.95730282324007, 31.056537971927575, 109.95717795237975, 31.05654403780812, 109.95716981099388, 31.056584741820462, 109.95718531893874, 31.056613281707076, 109.95711293996871, 31.056637335295427, 109.95702613041945, 31.05666276729204, 109.95705690201689, 31.056669592316382, 109.9572485013117, 31.056693460316033,
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
//    id: "temp13",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.95752903510113, 31.056960361182803, 109.95756676767161, 31.056975971367937, 109.95757607631323, 31.05694920304324, 109.95756933121085, 31.056913183990066, 109.95755563968781, 31.056892598925625, 109.95752051304684, 31.056875543720675, 109.9575056444415, 31.05687925267968, 109.95746054571296, 31.056881537698402, 109.95739064506067, 31.056888683926353, 109.95732536728225, 31.056891186247032, 109.95730311433671, 31.056928623960427, 109.9572999169644, 31.056945352371194, 109.9572953012946, 31.056927050195693, 109.95730322323045, 31.056923414255998, 109.95728241757966, 31.056969230808264, 109.95729297691678, 31.05698311354255, 109.95731137922536, 31.05699635699192, 109.95739625802987, 31.056980105432785, 109.95745967054397, 31.056967134073986,
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
//    id: "temp14",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.95627214190898, 31.054858576975533, 109.95639955604372, 31.054856785496106, 109.95648321507673, 31.05486009770871, 109.95649911886714, 31.054859673990315, 109.95650171131966, 31.054857064852136, 109.95650300229455, 31.05483616275903, 109.9565028795827, 31.054843294229276, 109.95644717642068, 31.054820779036632, 109.95634404395874, 31.0548302743185, 109.95623230994254, 31.054827180135007, 109.95622715975907, 31.054844337661155, 109.95622611543912, 31.05484978389283, 109.95624564635283, 31.0548759070209,
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
//    id: "temp15",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.96006507298539, 31.055966394638865, 109.96003981697298, 31.05603006796622, 109.96002854426803, 31.056030294800248, 109.96000733289092, 31.056043290410077, 109.9599869694309, 31.056024849121936, 109.95999686964167, 31.056011149467537, 109.96001426011048, 31.055961884270022, 109.96009011250017, 31.055955384739192, 109.96005389866177, 31.055941099256316, 109.9600495915533, 31.05594231264859, 109.96006039738073, 31.05595124557688,
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
//    id: "temp16",
//    polyline: {
//        positions: Cesium.Cartesian3.fromDegreesArray([
//            109.95954733996139, 31.056509491950834, 109.95989637541787, 31.05634029899449, 109.95974460638116, 31.05619381402388, 109.95969285944497, 31.056145127511922, 109.95965912439652, 31.056170929183985, 109.95959876778542, 31.056231520538137, 109.95955777497753, 31.05626978852262, 109.95941992109262, 31.056363367721126, 109.95940250712084, 31.056341147658358, 109.95940216112825, 31.056356230907404, 109.95941088030276, 31.05638848069662, 109.95941742849688, 31.056397430408275, 109.95945086838972, 31.056447946649314,
//        ]),
//        width: 2,
//        arcType: Cesium.ArcType.RHUMB,
//        material: Cesium.Color.AQUA,
//        show: true,
//        clampToGround: true,
//        classificationType: Cesium.ClassificationType.BOTH,
//    },
//}));




//viewer.entities.add(new Cesium.Entity({ id: "temp1", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95910684893667, 31.056962933830718, 109.9593877499308, 31.056765795451213, 109.95940028816035, 31.056694990146386, 109.95937686003681, 31.05653201664634, 109.95934530281266, 31.056544246288375, 109.95931859424067, 31.056570527205427, 109.95924047870378, 31.05663100739645, 109.95918660689618, 31.056732081519073, 109.95909414775073, 31.05674885108822, 109.95905869133654, 31.05677148371277, 109.95899149816472, 31.056749782712615, 109.95898071933355, 31.05677936031084, 109.95900853413883, 31.056826600226177, 109.95905465829846, 31.056814897897638, 109.95906767798958, 31.056902150983834, 109.95906189487168, 31.05693589232713,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp2", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.96067947142505, 31.052851442111507, 109.96068137772339, 31.052764300073104, 109.96064526149475, 31.052751463702116, 109.96063096640783, 31.052781395862084, 109.96062496603341, 31.052809384798355, 109.96038645864114, 31.05311098761641, 109.96040386108386, 31.053148599984226, 109.9603906581861, 31.053167142220772, 109.960445370796, 31.05317119357951, 109.96050407065937, 31.053078345978847, 109.96052524322486, 31.053066929083005, 109.96064819725879, 31.05291568260221,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp3", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.96095082084118, 31.052373434115744, 109.96089943239242, 31.052409213920455, 109.96085623237175, 31.052501817411745, 109.96078521579062, 31.052515826031378, 109.96082990501444, 31.05255314636692, 109.9606634545449, 31.052888815381955, 109.96057491591607, 31.053044588625838, 109.96064397590389, 31.053006074010305, 109.96069621770705, 31.052936603794297, 109.96072297903916, 31.052894600142274, 109.96077233433252, 31.05282959397298, 109.96086081716562, 31.052759190220613, 109.96102723207235, 31.05255877831206, 109.96099661964448, 31.052329622574934,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp4", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95732203966924, 31.054677291960306, 109.95736157671934, 31.054660301178295, 109.95733627514852, 31.054642588401965, 109.95729920390266, 31.05463006231222, 109.95726139106924, 31.054622591778777, 109.95724230843511, 31.054622584301107, 109.95723178049366, 31.05463943327995, 109.95723165002137, 31.0546376409345, 109.9572304541766, 31.05463690032187, 109.95728802282652, 31.054660772029823, 109.95730935052521, 31.054672575587883,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp5", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95487773384419, 31.05532435229256, 109.95487991350966, 31.055321929542696, 109.95487390365709, 31.0553197522214, 109.95487551597674, 31.05532707226556, 109.95487485812113, 31.05533814397823, 109.95487099961586, 31.05533973593246, 109.95487082528923, 31.05533587201109, 109.95487233760025, 31.055329157929826,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp6", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.9549664926065, 31.055333560887366, 109.95476263762353, 31.05545160862227, 109.9547400352952, 31.055423405894132, 109.95472910895222, 31.055367666366266, 109.95474615998783, 31.055343903477006, 109.95479830982623, 31.055278378819484, 109.95486402146278, 31.05522384759914, 109.95491731812757, 31.05520219666645, 109.95497774384879, 31.055176219511083, 109.95501465998603, 31.055147817055268, 109.95505977961074, 31.055122934827992, 109.95510942893631, 31.055104493681046, 109.9551554283204, 31.055084317689122, 109.95516508239713, 31.0550647907907, 109.9552075973613, 31.055051445843564, 109.9552823741218, 31.055056250632575, 109.95530959353478, 31.055056857735735, 109.95533597308919, 31.055058964172343, 109.95535797674802, 31.05508194048854, 109.95535889011724, 31.055117205987486, 109.95537672913612, 31.055141992729677, 109.95537044771007, 31.055152388699366, 109.95534316154334, 31.055144097654427, 109.95509594083109, 31.055222294546432,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp7", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95609541737592, 31.05494603176119, 109.956151678335, 31.054912748849766, 109.95615749231199, 31.05490692148898, 109.95616263966116, 31.054906565223217, 109.956159854081, 31.054902523584797, 109.95613961556138, 31.054892596479235, 109.95613667316606, 31.054901516673283, 109.9561153826081, 31.05492305661266, 109.95601137272833, 31.05491572968396, 109.95598092720589, 31.05491427594213, 109.95600396278816, 31.05494710972664, 109.95603756668244, 31.05496251720074, 109.9560648960444, 31.054950379489892,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp8", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95473410504236, 31.055460500197835, 109.95473360288592, 31.055455684841213, 109.95473616426554, 31.055442438616424, 109.95473786556325, 31.055426589294285, 109.95471881147823, 31.055414082864765, 109.9546296010328, 31.055408450094212, 109.95458451713344, 31.055449177718636, 109.95454288740864, 31.05550853604579, 109.95447668363923, 31.055547291546056, 109.95441384283589, 31.05558432631118, 109.95445998525534, 31.055642353755072, 109.9544739746595, 31.055682854912934, 109.9544912119378, 31.055685682308887, 109.95451923073324, 31.055697243480566, 109.9545546700392, 31.05571404481501, 109.95457544661643, 31.055622118357274, 109.95467535622873, 31.055545892224792, 109.95471215727002, 31.055501325997756,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp9", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95445336214358, 31.055690692189817, 109.95444627547292, 31.055703575705333, 109.95438060711116, 31.055738791970157, 109.95434197861208, 31.055741808841525, 109.95431188934887, 31.055730208628855, 109.95430435687253, 31.055716866682967, 109.95430457085318, 31.05569955238825, 109.95435234788836, 31.0556929628103, 109.95438114526677, 31.05568556638664, 109.95442778188139, 31.055667592197597, 109.95445058389133, 31.055673799535676, 109.95446305164013, 31.055686578383657,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp10", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.954168885591, 31.05583408162388, 109.95419133146822, 31.055825055469747, 109.9542085094235, 31.055807081234647, 109.95420339579228, 31.055802372050483, 109.95420006039302, 31.05579326690572, 109.95419597768951, 31.055790954073604, 109.95415327762154, 31.055777787061242, 109.95412666565782, 31.055802538062455, 109.9541208702584, 31.05581295160441, 109.95411598285851, 31.0558165666624, 109.95411520525818, 31.055823091762857, 109.95414060573728, 31.055831108403932,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp11", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95410792348491, 31.05587229407583, 109.95395364033887, 31.055882991750952, 109.95381186028497, 31.055924459985736, 109.95379512821204, 31.055903894100748, 109.95378037078319, 31.05587607875474, 109.95378464116038, 31.055856297221133, 109.95382229965732, 31.055826912604054, 109.95389208028385, 31.055793143230176, 109.95394647423872, 31.05578217966653, 109.95398224146776, 31.05578555699162, 109.95403362241545, 31.0557957206746, 109.95408749545095, 31.05581836911046, 109.95409867620928, 31.055845935687596,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp12", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95368785142423, 31.05591234007931, 109.95380557465403, 31.055910501905274, 109.95379917169824, 31.05589717396802, 109.95378379872054, 31.055898521724274, 109.95377740339899, 31.055890993033575, 109.95375360703902, 31.05588713091783, 109.95369382398037, 31.055865022404404, 109.95366160304008, 31.055886214610403, 109.95367540999227, 31.0559036209499,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp13", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.96033206461794, 31.05318092476976, 109.96036604883312, 31.053125061952397, 109.96035645878214, 31.053116261617983, 109.96034796893346, 31.05310945982328, 109.9603346420465, 31.053098736448405, 109.96029908483945, 31.053119919864105, 109.96023606050916, 31.053167987142803, 109.96021309711175, 31.053186204616715, 109.96019527013163, 31.0532037589195, 109.96018553284588, 31.053242713327702, 109.96017465690464, 31.05325305038072, 109.96017009833166, 31.05326925455594, 109.96019696648203, 31.053291934667175, 109.96013020086886, 31.05330589869033, 109.96012447519716, 31.053340115978802, 109.96011543388943, 31.053348216914944, 109.96010507502162, 31.053334878832363, 109.96012282905822, 31.05332560799629, 109.96018007304914, 31.05331185044408, 109.96028392623668, 31.053233668395247,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp14", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95531442520972, 31.057486557306802, 109.95535799973281, 31.057476000706263, 109.95535470977752, 31.05746265107241, 109.95534357636043, 31.057428293142568, 109.955304412748, 31.057407175747507, 109.95526819082767, 31.057420160916262, 109.95511636806839, 31.05743208106673, 109.9550824337232, 31.057453085534608, 109.95502783069057, 31.05749834140042, 109.95506186495084, 31.057580422626362, 109.95516905539212, 31.057658542556897, 109.95527744972125, 31.057560430611975,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp15", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95736556454875, 31.05667538888428, 109.95775119402919, 31.05661635712187, 109.95773519360537, 31.056527057385008, 109.95770515753176, 31.056488692475583, 109.95770597702968, 31.056487883618182, 109.9577064274129, 31.056501703879068, 109.95765315300896, 31.05648986712046, 109.9575705504378, 31.056535196164898, 109.95730282324007, 31.056537971927575, 109.95717795237975, 31.05654403780812, 109.95716981099388, 31.056584741820462, 109.95718531893874, 31.056613281707076, 109.95711293996871, 31.056637335295427, 109.95702613041945, 31.05666276729204, 109.95705690201689, 31.056669592316382, 109.9572485013117, 31.056693460316033,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp16", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95752903510113, 31.056960361182803, 109.95756676767161, 31.056975971367937, 109.95757607631323, 31.05694920304324, 109.95756933121085, 31.056913183990066, 109.95755563968781, 31.056892598925625, 109.95752051304684, 31.056875543720675, 109.9575056444415, 31.05687925267968, 109.95746054571296, 31.056881537698402, 109.95739064506067, 31.056888683926353, 109.95732536728225, 31.056891186247032, 109.95730311433671, 31.056928623960427, 109.9572999169644, 31.056945352371194, 109.9572953012946, 31.056927050195693, 109.95730322323045, 31.056923414255998, 109.95728241757966, 31.056969230808264, 109.95729297691678, 31.05698311354255, 109.95731137922536, 31.05699635699192, 109.95739625802987, 31.056980105432785, 109.95745967054397, 31.056967134073986,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp17", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95627214190898, 31.054858576975533, 109.95639955604372, 31.054856785496106, 109.95648321507673, 31.05486009770871, 109.95649911886714, 31.054859673990315, 109.95650171131966, 31.054857064852136, 109.95650300229455, 31.05483616275903, 109.9565028795827, 31.054843294229276, 109.95644717642068, 31.054820779036632, 109.95634404395874, 31.0548302743185, 109.95623230994254, 31.054827180135007, 109.95622715975907, 31.054844337661155, 109.95622611543912, 31.05484978389283, 109.95624564635283, 31.0548759070209,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp18", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.9598019087414, 31.05473417794868, 109.95980143575005, 31.054720468749032, 109.95979303089806, 31.054718642252507, 109.95976753508674, 31.05473830994786, 109.95973064269198, 31.054764247416124, 109.95972503443959, 31.05477675806678, 109.95967358956821, 31.05479992854582, 109.95963509772756, 31.054808000715465, 109.95962909735604, 31.054809912422247, 109.95963993575691, 31.054828483511187, 109.95964460752127, 31.05482717414283, 109.959651940636, 31.054835748564546, 109.95965530056387, 31.054840001282273, 109.95966109419898, 31.05483336472473, 109.95973977310369, 31.05478817589465,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp19", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.9599310248718, 31.054812537537288, 109.95992212181129, 31.054802725838748, 109.95991892896217, 31.054812279266088, 109.9598984317091, 31.05482490416257, 109.95988224931972, 31.054841277838857, 109.95985702272327, 31.054863126796242, 109.95985449054112, 31.054875237983023, 109.95985290832499, 31.054887248967944, 109.95984207448188, 31.05489330371097, 109.95984257953303, 31.05491242301578, 109.95984195172002, 31.054905523078133, 109.95992268741485, 31.054859606154963,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp20", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.96006507298539, 31.055966394638865, 109.96003981697298, 31.05603006796622, 109.96002854426803, 31.056030294800248, 109.96000733289092, 31.056043290410077, 109.9599869694309, 31.056024849121936, 109.95999686964167, 31.056011149467537, 109.96001426011048, 31.055961884270022, 109.96009011250017, 31.055955384739192, 109.96005389866177, 31.055941099256316, 109.9600495915533, 31.05594231264859, 109.96006039738073, 31.05595124557688,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp21", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95954733996139, 31.056509491950834, 109.95989637541787, 31.05634029899449, 109.95974460638116, 31.05619381402388, 109.95969285944497, 31.056145127511922, 109.95965912439652, 31.056170929183985, 109.95959876778542, 31.056231520538137, 109.95955777497753, 31.05626978852262, 109.95941992109262, 31.056363367721126, 109.95940250712084, 31.056341147658358, 109.95940216112825, 31.056356230907404, 109.95941088030276, 31.05638848069662, 109.95941742849688, 31.056397430408275, 109.95945086838972, 31.056447946649314,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp22", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95962144672735, 31.05430965114581, 109.95964570947207, 31.054302697702788, 109.9597628138956, 31.054192842154006, 109.95976854537669, 31.054148133009146, 109.95972072117785, 31.054194402606974, 109.959609261344, 31.05430022925638,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp23", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95822131785943, 31.054917528702425, 109.9581097799081, 31.05499702791163, 109.95805679755097, 31.055015466984386, 109.95794066905782, 31.055003553004365, 109.95791291133882, 31.05502063983273, 109.95789829009439, 31.05499456247157, 109.95789836057257, 31.05498729460797, 109.95793495206422, 31.054982285840897, 109.95796591960877, 31.054992114294432, 109.95800017601849, 31.054990880566315, 109.95803806638914, 31.05497162270062, 109.95806185771657, 31.054944883493604, 109.95807754883577, 31.05492917276889, 109.95810995447943, 31.054929344767054, 109.95814737800636, 31.054918714879754, 109.95816689676555, 31.05491083644689, 109.9581945898153, 31.05490893777826, 109.958208727255, 31.05491054031195, 109.95823557491778, 31.05491752759513,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp24", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95809947420821, 31.055631878543153, 109.95804182784964, 31.055639152737815, 109.95802249651692, 31.055640886021493, 109.95800402442211, 31.055643436504916, 109.95798323197944, 31.055656268242455, 109.95797589292864, 31.05570103321253, 109.95799170402836, 31.05573587801116, 109.95796557344268, 31.055783811103936, 109.95795919793048, 31.055810138727495, 109.95794909073047, 31.055823532456174, 109.95793946810866, 31.055829075570614, 109.957945208929, 31.055853389903795, 109.95795219257144, 31.05585923495555, 109.95795396188792, 31.05586388695372, 109.95806183636314, 31.0558751186757, 109.95810015691733, 31.05585598057049, 109.95811745563738, 31.055822996138257, 109.95813885002204, 31.05575373647777, 109.95815665345702, 31.055653543101432, 109.95814868339896, 31.055642592711596, 109.95814896220786, 31.055639886707073, 109.95814060689091, 31.055632486875208,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp25", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95791286077535, 31.056006587481246, 109.95799588011592, 31.056008948452874, 109.95798986260294, 31.05598892519102, 109.95797304193043, 31.055977694138715, 109.95796481578358, 31.055958130025573, 109.95792560249124, 31.055963412452893, 109.9579132244191, 31.055992866620645, 109.95790749888681, 31.055998776601097, 109.95791052213055, 31.055993998367917,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp26", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95865305131467, 31.054663620450896, 109.95865033114723, 31.054655043744688, 109.95864918133697, 31.05465064229493, 109.95864375742808, 31.05464697942774, 109.95863429891493, 31.054656686519564, 109.958626823317, 31.054668483476004, 109.95862297168567, 31.054675120820775, 109.95862618066344, 31.05467196910174, 109.95862281521825, 31.054685897472837, 109.95861749302806, 31.054695607348073, 109.95861733409889, 31.054699523385775, 109.95864186339689, 31.054683283821493,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp27", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.94937504543464, 31.05834926417095, 109.94935751064686, 31.058378578596496, 109.94934792637586, 31.05838338843282, 109.94935729688923, 31.058363402755546, 109.94937874519567, 31.058320639961558, 109.94939250630972, 31.058278437473135, 109.94940814974426, 31.05826742823314, 109.94943840296888, 31.05824620369245, 109.94942659160102, 31.058200608632607, 109.94951629769751, 31.058205506567315, 109.94947513299805, 31.05819161569885, 109.9494771983108, 31.058189182897433, 109.94942783468501, 31.058265540431155,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp28", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95246119249425, 31.056291954011446, 109.95241469694764, 31.05624953515578, 109.95239400888764, 31.056248035006814, 109.95230075727822, 31.05621902490948, 109.9522025754075, 31.056235671448896, 109.95216040280269, 31.056258897022545, 109.95212145989845, 31.05627519492896, 109.95210323282451, 31.05633645241868, 109.95211080922702, 31.0563465325482, 109.95213061386724, 31.0563914494327, 109.95214203488452, 31.056393279095698, 109.95226611358575, 31.05636087395925, 109.95236964986333, 31.056325264040616,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp29", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95028380087892, 31.057554606407603, 109.95030800009184, 31.05756629728616, 109.95024316400574, 31.057597017393554, 109.95017160342296, 31.057601975122083, 109.95013159431772, 31.05757471253664, 109.95014577285558, 31.057545590162903, 109.95016303002961, 31.0575082607645, 109.95022929417073, 31.05750157639256, 109.95025978898389, 31.057473725107897, 109.95029672120417, 31.05742084132457, 109.95035260794965, 31.05742681993779, 109.95035747267993, 31.057391457666988, 109.95038208044747, 31.057391623336546, 109.95041024988203, 31.057394196577754, 109.95042153718005, 31.05739663020458, 109.95047280242376, 31.057395383279378, 109.95041822663057, 31.057397102870215, 109.95037601755392, 31.057474253729477,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp30", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95194436083642, 31.05644290491244, 109.95209672216424, 31.05642687279985, 109.95207864758578, 31.05639510039637, 109.95201795424421, 31.0563808087281, 109.951899520724, 31.056397611613384, 109.95179902528699, 31.056406333409903, 109.95178066071819, 31.056408436293303, 109.9517844267876, 31.05645209643432, 109.95176498594387, 31.056466835124386, 109.95176590341691, 31.05647759970201, 109.95185469056872, 31.056456712353203,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp31", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95066824461028, 31.05700311763923, 109.95064533863909, 31.05696897999133, 109.95063972029962, 31.05696148917462, 109.95055707971252, 31.05697377327381, 109.9504792738539, 31.057054198205783, 109.95043493488852, 31.05711444786496, 109.95040313938296, 31.05716338989264, 109.9504087247818, 31.057192941478313, 109.95043919656855, 31.057235350742687, 109.9504789682744, 31.057242919385143, 109.95061647850554, 31.057245438128746, 109.95058571337, 31.057210705173794, 109.95057462388621, 31.057195388528548,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp32", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95106387770198, 31.056710283686918, 109.95107135159121, 31.056702682359283, 109.95104199139182, 31.05669298573588, 109.95100668775144, 31.056689324851856, 109.95100176789087, 31.056679167057656, 109.95095151994379, 31.056676835210137, 109.95090215266853, 31.056670652100777, 109.9508908101921, 31.05668502529119, 109.95089601853684, 31.05670444876456, 109.9508984692837, 31.05670679298978, 109.95090055854004, 31.056700528070046, 109.95093029489529, 31.05673626184874, 109.95096023033497, 31.0567594166513, 109.9510312198349, 31.056725337900346,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp33", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.94970161511448, 31.05802192801217, 109.94956149970277, 31.058076454992612, 109.94941408529353, 31.058131213437377, 109.94938775999897, 31.058169541306814, 109.94940832412458, 31.058181717629193, 109.94942640156856, 31.05818550471633, 109.94947690540714, 31.05818444073608, 109.94961176016994, 31.05817312425387, 109.94972478969106, 31.058052344368626, 109.94985210942302, 31.057978634348142, 109.94979566271408, 31.057974192602853,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp34", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.94931908568674, 31.05851747898398, 109.94944520106463, 31.05839952073547, 109.94940360742157, 31.058396089443104, 109.94936675950208, 31.058389180520454, 109.94935951018793, 31.058382793036746, 109.94936135140175, 31.05841246589002, 109.94932729548661, 31.058425120482944, 109.94929441668324, 31.05849737906474, 109.9492479802782, 31.058587251495155, 109.94920380081598, 31.058623055653456, 109.94916031295773, 31.058675039675517, 109.94914686422868, 31.05871566399575, 109.94910528103911, 31.058783923229644, 109.94905669323019, 31.0588499129836, 109.94901484328389, 31.058886437494024, 109.94901820146607, 31.058888807715174, 109.94903238639428, 31.05888768861759, 109.9490783487428, 31.05885311431304, 109.9491990107751, 31.058662877104247, 109.94925554240771, 31.058591916761973, 109.9493115824551, 31.05852290554904,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp35", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.94905291196679, 31.058918910871427, 109.94904325465939, 31.058897683259584, 109.94903297136456, 31.058903064171695, 109.94894658854948, 31.058951390476267, 109.94891667814275, 31.058973076294745, 109.94893063104843, 31.05902825010152, 109.9489641059629, 31.059083318413563, 109.94896557489886, 31.059120291821802, 109.94899595296738, 31.059110809292108, 109.94899891866035, 31.059083006940742, 109.94901011802655, 31.059075136326946, 109.94901110095002, 31.059077520998652, 109.94900608051623, 31.059060914395342, 109.94907047056358, 31.059030557307672, 109.94905573530336, 31.058940516745505,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp36", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.94899662274395, 31.05908007920365, 109.94901228105947, 31.059077958904627, 109.94899825631612, 31.05908337438128, 109.94899095327348, 31.059119890213044, 109.94895177030872, 31.05915374682794, 109.94891985394814, 31.05916835928356, 109.94891515612481, 31.059204762981103, 109.94888479033472, 31.05923297352114, 109.94885694352251, 31.059242057492533, 109.9488703124751, 31.05924952268711, 109.94887084116422, 31.05925547294854, 109.94886564079796, 31.059279875114175, 109.94887308442412, 31.0592543601666, 109.94887011016212, 31.05924040117948, 109.9489046675527, 31.059203693292456, 109.94895129460942, 31.059143661346994, 109.94896887620379, 31.059106176936666, 109.94898852746394, 31.059102373144245,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp37", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.94734863485003, 31.06026371143524, 109.94746853765072, 31.060197387025216, 109.94752008873661, 31.060147814569675, 109.94756934102894, 31.060116278308087, 109.94753197215562, 31.06013848195613, 109.94738582043597, 31.06021166029944, 109.94731538669267, 31.060239485153243, 109.94725094756735, 31.06028517290313, 109.9472229339926, 31.060312992681347, 109.9473221427975, 31.060296915998897,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp38", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95099938707271, 31.05734014135617, 109.95088597587296, 31.057415121732806, 109.95092723010303, 31.057430665510623, 109.95097230787084, 31.057402306604544, 109.95100463627652, 31.05738704501937, 109.95103854406219, 31.057389117063302, 109.95107209238365, 31.05739278455313, 109.95115341870162, 31.057349393858324, 109.95121756112925, 31.057377885449934, 109.95122188256832, 31.05734048788986, 109.95126182443529, 31.057290342669887, 109.95125074920048, 31.05726816642834, 109.95123708569454, 31.05728233944287, 109.95118519391322, 31.05730152734639, 109.95112580582034, 31.0573011098835, 109.95107710163381, 31.057309032523428, 109.95107224023846, 31.05732535525973,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp39", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.95024656284261, 31.057705191246324, 109.95024914425375, 31.057811967355107, 109.9502739200407, 31.057846199708457, 109.95015971375163, 31.05786256355968, 109.95019583888319, 31.05781766871766, 109.95030481739676, 31.05767125617829,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp40", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.77266383351694, 31.233461334024433, 109.71614341725687, 31.1678357327837, 109.89121775902899, 31.187974366336732, 109.87563847893175, 31.253058087551857,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp41", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.97654169805945, 31.047758810863662, 109.9765476064526, 31.04776917635864, 109.9765459112473, 31.04780470267429, 109.97654040475169, 31.047798775203525, 109.97647628587855, 31.047786927730417, 109.97644244825399, 31.047774257200814, 109.9764681320703, 31.04774527584726, 109.9764750768064, 31.04773725191554, 109.9764788063361, 31.04773298001726, 109.97650010148485, 31.047740563363085, 109.9765081577735, 31.047743475768357, 109.97652637280927, 31.047748859108005, 109.97653596775518, 31.04775333253442, 109.97653661087641, 31.0477565944381,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp42", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.97640294758378, 31.047760507681918, 109.97640743213816, 31.04776949847709, 109.97640170099702, 31.047778098408138, 109.97637921960788, 31.047780690532253, 109.9763578183581, 31.04777183590639, 109.97634480905123, 31.047753473227534, 109.97633940061517, 31.047742250816945, 109.97632637889568, 31.047718162126216, 109.97633044800033, 31.047712645527696, 109.97634516993287, 31.04771829023078, 109.97636289329121, 31.047723929742627, 109.97637876237883, 31.047729702355127, 109.97638535763083, 31.04773479191341, 109.97639534101623, 31.04774129007076, 109.97640220414783, 31.047744309969556, 109.9764057749576, 31.047750018258387,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp43", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.97064100433612, 31.04999801506204, 109.97062140650628, 31.050030888849317, 109.97060840127878, 31.050077094819653, 109.97054726242857, 31.050090357577673, 109.97049800361829, 31.0500876748436, 109.97053656348355, 31.050088615014438, 109.97056096977417, 31.05009465374977, 109.97058731126388, 31.05007320703479, 109.97062946318273, 31.05005044282276, 109.9706531536885, 31.050023932111348, 109.97064380596532, 31.049999996254023, 109.97063685893784, 31.04999250685752, 109.9705924387015, 31.049960171935034, 109.97062340109785, 31.04997616286862,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp44", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.96724998287769, 31.058501226440427, 109.96720098809895, 31.05855190276023, 109.96713028836746, 31.05858621635679, 109.96711493889889, 31.05858450511153, 109.96711984650587, 31.05856037460694, 109.96711049776431, 31.05851642603914, 109.96710445898448, 31.058474236086912, 109.96707649406538, 31.058379847743165, 109.96705093312151, 31.058323746498733, 109.96703359378309, 31.05825831733442, 109.9671194871618, 31.05831275014752, 109.96720163540355, 31.0583607712543, 109.96723467682696, 31.058375964105053, 109.96723227542991, 31.05838239115881, 109.96725685699505, 31.058427221598695,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp45", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.96616899050417, 31.057891496310912, 109.96617256474993, 31.05791055581592, 109.96616901117983, 31.05794342718157, 109.96614787532556, 31.05796983931025, 109.96612933301178, 31.058010817396354, 109.96603256474398, 31.05821236594189, 109.96601955793456, 31.05822577507757, 109.96598465962525, 31.058270317370077, 109.96583952550621, 31.058254600247544, 109.96568488722593, 31.05832056566052, 109.96565102519273, 31.058345448552426, 109.96556840949074, 31.058308065996588, 109.96550595838185, 31.058314876915325, 109.96539832332833, 31.058337885049852, 109.96526267799236, 31.058441670230795, 109.9651820420018, 31.058430928414104, 109.96488190233973, 31.05851904521945, 109.96469547187016, 31.05848042848412, 109.96457714447939, 31.058484343533816, 109.96458946971941, 31.058428955785836, 109.96481425918644, 31.058415393541093, 109.96486033280785, 31.058313696777624, 109.96496640504525, 31.058283419585706, 109.96497908923261, 31.05828873765956, 109.96506988305791, 31.058199202281997, 109.965139499493, 31.0580992862234, 109.96540905254685, 31.05811460804684, 109.96575087303962, 31.05797648958899, 109.96592900662338, 31.05786845009591, 109.96611907592231, 31.057737435026045, 109.96618067384978, 31.057664519131652, 109.9661955115594, 31.05776083799667, 109.9661954346992, 31.05786479478212, 109.96619123248729, 31.057877190566323,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
////沁水湾
//viewer.entities.add(new Cesium.Entity({ id: "temp101", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.1328864523702, 31.030986137220143, 110.13275222824699, 31.03100800718323, 110.13254364026217, 31.031048183202756, 110.13241436305519, 31.031031142102993, 110.13218419366541, 31.031014068523657, 110.13217578129115, 31.030995139764546, 110.13225348161774, 31.030977633616743, 110.13244902660742, 31.030989767360133, 110.13263675362721, 31.030950563504383, 110.13281358906309, 31.030927568954617, 110.13288222085123, 31.03086894802806, 110.13290998135135, 31.030855438081083, 110.13294072926934, 31.03089280498792, 110.13294192094126, 31.03093596869638, 110.13293756112112, 31.030966828212026, 110.1328864523702, 31.030986137220143,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
////黄南背                                    
//viewer.entities.add(new Cesium.Entity({ id: "temp103", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.12041206410471, 31.03219481098926, 110.12048291145625, 31.032199017515577, 110.12053632636848, 31.03220881183351, 110.12060547747176, 31.03221810470266, 110.12068484475847, 31.032221703085582, 110.1207406253324, 31.03222307374559, 110.1207519737003, 31.032247859740558, 110.12077041559887, 31.032295156533188, 110.12075993839774, 31.032317724986893, 110.120703190144, 31.032308698811306, 110.1205706183124, 31.03230487782709, 110.12041575773621, 31.03228054466124, 110.12029108932255, 31.03226127971839, 110.12019318506464, 31.03226546507786, 110.12010671623925, 31.032246109271032, 110.12007102092858, 31.032247381290425, 110.12001951402539, 31.03223020951487, 110.12009652706482, 31.03221732192888, 110.1201153047521, 31.032212113582673, 110.1201463496537, 31.032199572913548, 110.12022089445264, 31.032209589406474, 110.12031722713078, 31.032208949500436, 110.12037983323027, 31.03221286276644, 110.12041206410471, 31.03219481098926,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp104", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.11764819449999, 31.03238623996447, 110.11762182680347, 31.032383197651217, 110.11757525024434, 31.032408668270907, 110.11751998742346, 31.03239730857322, 110.11742988815996, 31.032425281978316, 110.11735362167012, 31.032391731327053, 110.11727705354379, 31.032359846241462, 110.11726279932702, 31.03235092985518, 110.117246483473, 31.032350212808048, 110.1172483968121, 31.03235174547205, 110.11764819449999, 31.03238623996447,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
////下后山                                    
//viewer.entities.add(new Cesium.Entity({ id: "temp106", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.11593899943603, 31.031992158152743, 110.11611644671953, 31.032016425992424, 110.11628030132711, 31.032016107587303, 110.11623035801014, 31.03214265432698, 110.11605863746145, 31.03220896443918, 110.11576399048701, 31.032101307294308, 110.11556120887956, 31.032034503012337, 110.11551519201392, 31.031954867094097, 110.11554638412595, 31.031913305656545, 110.11573512788549, 31.03195455185137, 110.11588860202407, 31.031948369884397, 110.11593899943603, 31.031992158152743,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp107", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.11475072491285, 31.03169909508877, 110.11497467594357, 31.031732155633932, 110.11510625999209, 31.031742513972695, 110.11512831795761, 31.0317929523078, 110.11516054298191, 31.031932700276144, 110.11514484909604, 31.031941705537967, 110.11488413358535, 31.031983664330035, 110.11467967299124, 31.031938102045014, 110.11438496327311, 31.031909987833654, 110.11398356076222, 31.031877475867667, 110.11378898529148, 31.0318847789463, 110.11358175106808, 31.03190217072419, 110.11350183621786, 31.031932160614364, 110.11351945900921, 31.031809691197818, 110.1135608113594, 31.031710280243658, 110.11365303387845, 31.03167383269621, 110.11383823086148, 31.031665877988384, 110.11420203606042, 31.03170518298576, 110.11454961668869, 31.031745684198125, 110.11475072491285, 31.03169909508877,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp108", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.11292570066945, 31.031465257598487, 110.11241025179014, 31.03133966597051, 110.1118636542585, 31.03116445755101, 110.11165262978957, 31.03097113026539, 110.11182163971557, 31.030748425092682, 110.11224288126098, 31.03083121307347, 110.1128884498645, 31.030991524260646, 110.11304507350997, 31.03097999576373, 110.11320446359028, 31.031006528438212, 110.11309562609395, 31.031279276679463, 110.11306944384998, 31.031343708283444, 110.11301878085652, 31.031369011352815, 110.11292570066945, 31.031465257598487,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
////史家嘴危岩带                              
//viewer.entities.add(new Cesium.Entity({ id: "temp110", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.10166027683117, 31.02883461411733, 110.10166326392321, 31.02883569538013, 110.1014876827486, 31.028810428008647, 110.10136056988277, 31.02879733077289, 110.10131981271684, 31.028789566992614, 110.10124227154802, 31.028780032173437, 110.10118778849045, 31.02875211393727, 110.10129256710051, 31.028729373068508, 110.10132492288315, 31.028706596650927, 110.10141758801508, 31.028712387621297, 110.10147916362007, 31.028721019904037, 110.10156388247002, 31.02875264369529, 110.10161902621789, 31.028742568523644, 110.10164004112657, 31.02877333803675, 110.10165575810684, 31.02879786452446, 110.10166027683117, 31.02883461411733,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp111", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.10081197340004, 31.02831162662027, 110.10072953345966, 31.0282978346697, 110.10068099623595, 31.028275101446713, 110.10073021230136, 31.02821664341564, 110.10079394798325, 31.02820285442044, 110.10082328988877, 31.028256453232167, 110.10084206204047, 31.028280661300048, 110.10083573570077, 31.028312849361285, 110.10083040021243, 31.02830050349599, 110.10081197340004, 31.02831162662027,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
////果园场                                    
//viewer.entities.add(new Cesium.Entity({ id: "temp113", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.08916815604658, 31.025963498108, 110.08914760766697, 31.025971270558454, 110.08913558226284, 31.025926715884403, 110.08912528639476, 31.02590963607278, 110.08908903977378, 31.025885246104952, 110.08906625342401, 31.025870603233145, 110.0890509133685, 31.025848734355723, 110.08899792932608, 31.025868240006655, 110.08897565449683, 31.0258950517863, 110.08895743776988, 31.025888997638553, 110.08892907616041, 31.025922574455603, 110.08878805475712, 31.02583307792098, 110.08873529744402, 31.025825522995035, 110.08870227260495, 31.025799755976266, 110.08869560822734, 31.025828063327015, 110.08871059153117, 31.025897127710863, 110.08886990146969, 31.0259481910687, 110.08898870936962, 31.02598173947796, 110.08916815604658, 31.025963498108,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
////南山内危岩带                              
//viewer.entities.add(new Cesium.Entity({ id: "temp115", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.08251655075463, 31.02335890861678, 110.08257776318077, 31.023368677337338, 110.08262649840084, 31.023357481901765, 110.08261040616314, 31.023310771467088, 110.08261252311424, 31.023239884680393, 110.0825969922262, 31.023205418896154, 110.0825710281832, 31.023165260130646, 110.08252248642178, 31.023158450931625, 110.08245354092777, 31.02314089225558, 110.08242571371665, 31.02314067745193, 110.0823860051611, 31.023176647067213, 110.08233522269977, 31.02317696750394, 110.08235285080583, 31.023187243620843, 110.08236412242096, 31.0232053614446, 110.08239250949204, 31.023216924746805, 110.08242566836131, 31.023242339888004, 110.08245462314336, 31.02323941050233, 110.08249759602474, 31.02338115263982, 110.08251655075463, 31.02335890861678,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp116", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.08126382800049, 31.02410399698763, 110.08125939711034, 31.02412165032841, 110.0811764151766, 31.024157630811086, 110.08117270726943, 31.024136942351753, 110.0811757914505, 31.02412396649847, 110.08117525197329, 31.024112321393446, 110.08117423012271, 31.024107233233863, 110.0811624208836, 31.024095408726733, 110.08113822600184, 31.024096404690404, 110.08113178761947, 31.024097969087208, 110.08113381402691, 31.02408619445558, 110.08118210510811, 31.024052335770143, 110.08121199579679, 31.024049131088734, 110.08122792746728, 31.02405266157189, 110.08123408973721, 31.024065726925016, 110.08123478515029, 31.02406799211958, 110.08123855306691, 31.024073314974608, 110.08124160916958, 31.024074859055492, 110.08126053853812, 31.02407651492278, 110.08125839169966, 31.024085601423394, 110.08126382800049, 31.02410399698763,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp117", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.08212964498033, 31.02378420827634, 110.08210823410288, 31.02379217241101, 110.08206254459715, 31.023789567515283, 110.0820261126446, 31.023804813633806, 110.0819490380992, 31.023779189411076, 110.0819090724587, 31.02379449489014, 110.08190673060851, 31.023797393401924, 110.08193486101531, 31.023812529153876, 110.0819635831232, 31.023751691742795, 110.08203253969184, 31.023711318613664, 110.0820664867625, 31.02364491916239, 110.08210555237713, 31.023676347247367, 110.08210955103145, 31.023717789629224, 110.08213605085083, 31.023753946892153, 110.08212648064544, 31.023768203510787, 110.08212964498033, 31.02378420827634,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp118", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.08027862472723, 31.02426630943572, 110.08026595780423, 31.024276885956517, 110.08025253129126, 31.024278182357946, 110.08025257832695, 31.024309044040574, 110.08023947249218, 31.024333609540456, 110.08018730026026, 31.024323661146862, 110.08014901867413, 31.024330831142926, 110.0801524605729, 31.024335598625143, 110.08016378710121, 31.024328906779257, 110.08017493176634, 31.024308521511482, 110.08018623487413, 31.024284307078208, 110.08019705133432, 31.02426251154928, 110.08022051864084, 31.024245418826695, 110.08024201488173, 31.02422869692692, 110.08024827902548, 31.024235358380075, 110.08025579130323, 31.02424290635474, 110.08027862472723, 31.02426630943572,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
////曲子滩危岩带                              
//viewer.entities.add(new Cesium.Entity({ id: "temp120", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.07471075466398, 31.02321107713712, 110.07464243597126, 31.02320794574725, 110.07457356330517, 31.023198518056688, 110.07453663607309, 31.023193222176666, 110.07454512285098, 31.02317859975585, 110.07455482171913, 31.023159094320736, 110.07456631182514, 31.02314319234623, 110.07457470010701, 31.023141939784388, 110.07455583626896, 31.023112157911214, 110.07458613814235, 31.02311510009621, 110.07463494139107, 31.02311211676427, 110.07469165757595, 31.02314162084924, 110.07471223098254, 31.023143932545295, 110.07470907009969, 31.023168114651934, 110.07470526041871, 31.02319319483149, 110.07470225625966, 31.02320026938553, 110.07471075466398, 31.02321107713712,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp121", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.07396175245628, 31.02311380527042, 110.07388666347158, 31.023136520367334, 110.07388186274893, 31.023095015546936, 110.07390918835202, 31.02307450729005, 110.07397533939898, 31.02303096424208, 110.0739771394398, 31.02295024755422, 110.07401382111115, 31.022881712704464, 110.07401513805705, 31.022850790483346, 110.0740747318087, 31.022840271519094, 110.07418372929267, 31.022850935494628, 110.0743074595755, 31.022844358231787, 110.074367704016, 31.022840755340855, 110.07430529529815, 31.0228549512504, 110.0742852479737, 31.022886219065658, 110.07422144997471, 31.022912140071945, 110.07419328716826, 31.022986885492827, 110.07407746988329, 31.023087346264735, 110.07399444968738, 31.023085643935058, 110.07396175245628, 31.02311380527042,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp122", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.07375067452948, 31.023205635050207, 110.07367597006004, 31.023232066713156, 110.07355999298339, 31.02320501380014, 110.07357280783148, 31.023159176842682, 110.07357330519446, 31.023123277244537, 110.07359553082513, 31.023041940848398, 110.0736394185473, 31.023012979155126, 110.07363169605877, 31.02298543922833, 110.07363280834983, 31.0229416686522, 110.07374258515038, 31.02293409473365, 110.07380440974251, 31.022969929173346, 110.07388407850317, 31.02293401519944, 110.07390951053755, 31.0229417355319, 110.07385137415841, 31.02303750090761, 110.07384169336075, 31.023064463186405, 110.07382927479536, 31.023090129877538, 110.07379872158182, 31.023133870516023, 110.07375067452948, 31.023205635050207,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp123", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.07352539845957, 31.02321729355277, 110.07348801087839, 31.023234839145772, 110.07334556499906, 31.02321689350518, 110.07326918170943, 31.023183507178953, 110.07325351706164, 31.023183413399973, 110.07323159027344, 31.023168669075183, 110.07315581665905, 31.023120406809685, 110.07311324216278, 31.02304935419228, 110.07311249058323, 31.022998181849633, 110.07310616252249, 31.02296822670865, 110.07316695650977, 31.022969228219406, 110.07326093778366, 31.022963848318998, 110.07337229743136, 31.023029499085933, 110.07349038406973, 31.022999906994972, 110.07353861883432, 31.02299983457805, 110.07355685779062, 31.02301082683069, 110.07356013448135, 31.02301576046583, 110.07356252064635, 31.023044111505744, 110.07356195754828, 31.02311237729692, 110.07355727041916, 31.023116338193084, 110.07354659769412, 31.023139037623174, 110.07354861597382, 31.023162397781505, 110.07354556087452, 31.023179467526862, 110.07353618427815, 31.023190402127494, 110.07352539845957, 31.02321729355277,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp124", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.07323794589136, 31.02319601706343, 110.07318168742341, 31.023223707966626, 110.07312812439527, 31.02324362330287, 110.07305747322624, 31.023249069468946, 110.07300521424796, 31.02324768110129, 110.07293548343557, 31.023211091353517, 110.0729042827021, 31.023194916412393, 110.07288963382346, 31.02317546923207, 110.07288421609181, 31.02318487284399, 110.07288771417376, 31.023181631723755, 110.07287881372125, 31.023148635159032, 110.07287715185366, 31.023141632697637, 110.07287070622692, 31.023135506685296, 110.07287475825986, 31.02313049937407, 110.0728839982474, 31.02311206326756, 110.07287812931193, 31.02305340952696, 110.07290022720262, 31.022962928989998, 110.07294542698588, 31.022927141332236, 110.07296290303645, 31.02293428583663, 110.07300045458557, 31.022950807794356, 110.07306901612168, 31.022969634291382, 110.07306068741369, 31.022974652010816, 110.0730716126953, 31.022990427644377, 110.07306515892328, 31.02299705502888, 110.07307250465712, 31.02300828957398, 110.07307436190405, 31.02302354872514, 110.07308225478475, 31.02305169740829, 110.07310655205333, 31.02309642812838, 110.07318403813147, 31.023168030406815, 110.07321920869175, 31.023186969385925, 110.07323387872037, 31.023190383546012, 110.07323794589136, 31.02319601706343,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp125", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.07259826075055, 31.02311647380121, 110.07256885277036, 31.023135314842264, 110.07252160186061, 31.02313886210454, 110.07247290097361, 31.023137491865242, 110.0723225021018, 31.023102291498134, 110.07228594144888, 31.023132144137282, 110.07222861383379, 31.023146678900098, 110.07218128513529, 31.023160587896616, 110.07199002126862, 31.023177038074213, 110.07176465366445, 31.02319712772073, 110.0715181646351, 31.023225079841918, 110.07130954632262, 31.023195147664214, 110.07111864426838, 31.023138667928617, 110.07096005607515, 31.023102398539084, 110.07081758882023, 31.02309342385549, 110.07075311696957, 31.02310135242158, 110.0707152575318, 31.02309911731656, 110.07070438466631, 31.023117189070607, 110.07066894212858, 31.023155514384644, 110.07059236510639, 31.023162442752895, 110.07046151610086, 31.02315504666413, 110.07046694048778, 31.023122598287266, 110.07046913437405, 31.023060487182907, 110.07053340279296, 31.02306807239465, 110.07056635626996, 31.023042105266473, 110.07067220396169, 31.023015627549256, 110.07068175571811, 31.02301484065826, 110.07076263692889, 31.02303740213558, 110.07081555272504, 31.023027279319155, 110.07089700248598, 31.023042375867046, 110.0709532731761, 31.023043883751086, 110.07099482255016, 31.023037358283446, 110.07111846519162, 31.02302567250912, 110.07123724335635, 31.023019736441796, 110.07149153329054, 31.02304715383141, 110.07176745312215, 31.023011899383004, 110.07213798007795, 31.023000853305845, 110.0724059299685, 31.02292485592037, 110.07244145635634, 31.022914424100733, 110.0725140084373, 31.022918237431725, 110.07257497003931, 31.022893384693255, 110.07262607172932, 31.022880329906524, 110.07269072388524, 31.02287145232455, 110.07270862666441, 31.022867614282227, 110.07276043578679, 31.02287198853527, 110.07274204658425, 31.022891277863746, 110.07271651559056, 31.022970690923035, 110.0727074793835, 31.022982666555546, 110.07268582396378, 31.02304200876345, 110.07266739323691, 31.023073433522686, 110.07266184422811, 31.02306875863945, 110.0726388002799, 31.023082451614876, 110.07261353768958, 31.023103277116384, 110.07259826075055, 31.02311647380121,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
////青岩子危岩带                              
//viewer.entities.add(new Cesium.Entity({ id: "temp127", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.06932394614991, 31.022672165692992, 110.06928465290382, 31.022666741340135, 110.06926889949352, 31.022662243914503, 110.06925048391662, 31.02265312616657, 110.06923418300357, 31.022648709030467, 110.06924795544167, 31.022656789054082, 110.06924213989808, 31.022658097190156, 110.06921750904569, 31.022662164369663, 110.06918615691275, 31.022645344727835, 110.06917448933696, 31.022634595904254, 110.06919446291008, 31.022646809467624, 110.06918828983662, 31.022643979400307, 110.06922166455891, 31.02265573382126, 110.06928044965665, 31.022647827453742, 110.06932394614991, 31.022672165692992,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp128", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.06897791196862, 31.02256936424149, 110.0689480350275, 31.022558491612305, 110.06890057112162, 31.022535690640353, 110.06887761889479, 31.022536291791383, 110.06887659667451, 31.02252572757925, 110.068873886089, 31.02252385038136, 110.06887034733337, 31.022519014084725, 110.06886434928884, 31.02250745948109, 110.0688641582816, 31.022495386007208, 110.06886599858329, 31.022490031252214, 110.06890909735107, 31.0224927071624, 110.06897195462187, 31.022510982511474, 110.0689767132527, 31.022527231077568, 110.06897567963583, 31.022546861381848, 110.06898589392262, 31.02254517171216, 110.06898654575684, 31.02255040559133, 110.068990108518, 31.022562351527995, 110.06897791196862, 31.02256936424149,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp129", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.06788430332236, 31.022662945125457, 110.06761207242626, 31.022633475201708, 110.06761314370372, 31.022629860455584, 110.06763211165759, 31.022589288290735, 110.06764388901358, 31.02256467137072, 110.06764527869528, 31.022568404534617, 110.06767310241459, 31.022541834601174, 110.0676915561564, 31.022531964289996, 110.06771812050626, 31.02252904798857, 110.06779062183665, 31.02252835387289, 110.06786214367527, 31.022529758657495, 110.06790683476443, 31.022527058955852, 110.06790621585525, 31.022539501379153, 110.06790245063719, 31.022567804381982, 110.06789790855365, 31.022598544899946, 110.06788745056096, 31.022638107300164, 110.06788430332236, 31.022662945125457,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp130", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.06439021944571, 31.021778115464006, 110.06440188854349, 31.02175914144094, 110.06438855682536, 31.021748749432994, 110.06437465565489, 31.021736337693394, 110.06438405318038, 31.021734312789718, 110.06438349652794, 31.02170937369283, 110.0643983304885, 31.0216950911775, 110.06439526843073, 31.02169555188088, 110.06437036072744, 31.02169140423836, 110.06434248862669, 31.02169345929294, 110.0643209002869, 31.02169965365765, 110.06430119018447, 31.021734846564396, 110.06428847018155, 31.02173480250532, 110.06428615052303, 31.02173895186262, 110.0642850368906, 31.02178895380554, 110.06429011082724, 31.021794605714177, 110.06429193005229, 31.0218013664743, 110.06429063878255, 31.02180132690428, 110.06429508370022, 31.02180902802897, 110.06430517898865, 31.021811622863634, 110.0643324984751, 31.02181002451518, 110.06439021944571, 31.021778115464006,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp131", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.06318992885417, 31.022380704214303, 110.06309012046314, 31.02242864508757, 110.06300021642662, 31.022445639302106, 110.06301166663474, 31.022443556916162, 110.06302672056437, 31.022407309173335, 110.06304364892118, 31.02239182709923, 110.06308468600557, 31.02238130359742, 110.06309220762382, 31.022370806508643, 110.06313278358903, 31.0223462721547, 110.06317413226198, 31.022336858845616, 110.06323660119729, 31.02233327180306, 110.06326396359022, 31.02231652986742, 110.0632665807672, 31.022321983236683, 110.06326109416287, 31.022330489755397, 110.06325980728985, 31.022346848469315, 110.06323829074739, 31.022341601959532, 110.06322971042049, 31.02235672537157, 110.06320702323774, 31.022366324408832, 110.06318992885417, 31.022380704214303,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp132", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.06296499236768, 31.022468766083087, 110.06281638883988, 31.02252756339466, 110.06274830515267, 31.02251779957998, 110.0627607294113, 31.02246307871575, 110.06276855372839, 31.022418270712706, 110.06277563413266, 31.0224410612834, 110.0627892219906, 31.022433014408676, 110.06292312035066, 31.022382890518795, 110.0629897006815, 31.02237799218149, 110.06298977625798, 31.022399116065277, 110.0629836571755, 31.022415020746955, 110.06297893745554, 31.022428285509278, 110.0629703119093, 31.022445617005207, 110.06296499236768, 31.022468766083087,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp133", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.06106770995088, 31.02227428782183, 110.06101850098077, 31.022264028250476, 110.06095199943164, 31.022259275583465, 110.06092575762867, 31.02226083013732, 110.0609140922912, 31.02227507336065, 110.0609552141829, 31.02229698631639, 110.06102792749951, 31.022320802449688, 110.06105132240019, 31.022314388387468, 110.06106523298126, 31.022299814557048, 110.0610674280725, 31.022295021514584, 110.06106770995088, 31.02227428782183,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp134", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.06036396521571, 31.022319997505978, 110.06047222011466, 31.02245817827694, 110.06057581386231, 31.022488200734802, 110.0606157415636, 31.02250331446992, 110.0606534126325, 31.022509278112835, 110.06067478502041, 31.022510004847742, 110.0606733806479, 31.022458531168958, 110.06067076447249, 31.022396018395916, 110.0606793279953, 31.022353697628667, 110.06068918321685, 31.022315603516866, 110.06067722336772, 31.022290054627177, 110.06066884419391, 31.02224276098916, 110.0606640030539, 31.0222210811433, 110.06066171703895, 31.0222146227299, 110.06062427720774, 31.022201402055234, 110.06050611767988, 31.02215572807295, 110.06049669626765, 31.022149127329044, 110.06045052184389, 31.022134962123843, 110.06045857620543, 31.022141637308604, 110.06044971823945, 31.022180394775255, 110.06043995304569, 31.022206076924245, 110.06038350007817, 31.022271082813077, 110.06038234109862, 31.022299485652862, 110.06036396521571, 31.022319997505978,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp135", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.06007523225574, 31.022083775864665, 110.05998051298702, 31.022069553533125, 110.0597108025852, 31.022050812002593, 110.05955008037523, 31.022057807125954, 110.05955825371863, 31.02206196834473, 110.05957722807416, 31.02204816169102, 110.0596139144838, 31.02203859340976, 110.05963919589524, 31.022038396640202, 110.0597407152915, 31.02204798814566, 110.0598189179811, 31.022021235574538, 110.05987716375083, 31.02201726416545, 110.05998427950033, 31.022055575784382, 110.06002488866758, 31.022045972963394, 110.06005940332516, 31.02206514643102, 110.06007523225574, 31.022083775864665,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp136", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([110.06832787904315, 31.02258560378539, 110.06834642605472, 31.022582264729543, 110.06836187419526, 31.022570772806127, 110.06836385736881, 31.02256941998316, 110.06837260420599, 31.022559967132675, 110.06838885300438, 31.022545958325416, 110.06839107337998, 31.022538267956726, 110.06837191191656, 31.022493383900326, 110.06833740983353, 31.022479011168603, 110.06831231865273, 31.02248165236902, 110.06829023501014, 31.022481646137063, 110.0682555729837, 31.022489001579615, 110.06820029119861, 31.022485434238696, 110.06820891526, 31.02249190432917, 110.06823236904702, 31.022503430679784, 110.06823299846526, 31.02251630091572, 110.06824118810052, 31.022523723278955, 110.06826790429818, 31.02254675625217, 110.06827755937908, 31.022546905161953, 110.06828907054563, 31.02255646100669, 110.06830303487705, 31.022564422803132, 110.06831431007653, 31.022569065483623, 110.06831960710383, 31.022579190282784, 110.06832787904315, 31.02258560378539,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
////授书台危岩带                              
//viewer.entities.add(new Cesium.Entity({ id: "temp138", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.99875950670557, 31.021789549988256, 109.99875743564445, 31.021851499714014, 109.99863300788384, 31.021968627793314, 109.99852425070851, 31.0220761826184, 109.99845710158966, 31.022144914618263, 109.99839546585814, 31.02223371306225, 109.99833923394108, 31.022186284425718, 109.99833755586378, 31.022110059093936, 109.99838101364256, 31.022057609905374, 109.99839355376281, 31.022045651735283, 109.99842167142899, 31.022002552635467, 109.99840129590365, 31.022039122810206, 109.99834894870429, 31.022024400651368, 109.99833518376069, 31.022021225835182, 109.99834704201955, 31.021996425047995, 109.99834911369183, 31.021944911690287, 109.9984353890333, 31.02194651442434, 109.9985178835608, 31.021896347799515, 109.99859629778548, 31.02186644527214, 109.99866636552854, 31.021775117225257, 109.99873587309638, 31.021742769389334, 109.99875657735946, 31.021757970383028, 109.99875950670557, 31.021789549988256,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp139", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.99061483889591, 31.02503900009283, 109.99060508237156, 31.025055884254478, 109.99058329548095, 31.02507665635793, 109.99055498949386, 31.025081738469716, 109.99052764060251, 31.025073313081894, 109.99051332509231, 31.025064952082833, 109.99049640222218, 31.025065656700797, 109.99045483186022, 31.025051508004672, 109.99042483784581, 31.0250410864921, 109.99041030996759, 31.02501058029736, 109.99040164525525, 31.024976194599095, 109.99042347835596, 31.024932646952134, 109.99045554503326, 31.024939136822816, 109.99051670097816, 31.024954965425888, 109.9905423099109, 31.02496322263085, 109.99057528982324, 31.024974744550388, 109.99060272393862, 31.025003457005305, 109.9906047597069, 31.025021204574738, 109.99061483889591, 31.02503900009283,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp140", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.99039738865626, 31.026518102660837, 109.99040601215543, 31.02649204688099, 109.99042943911003, 31.02650001608345, 109.99044515515583, 31.026494672017257, 109.99045286818685, 31.026514418254312, 109.9904345191977, 31.026486373758452, 109.9904235139027, 31.026511461429834, 109.99040148470975, 31.026523676575998, 109.99034853469087, 31.026521421601174, 109.99033324372608, 31.026532224858173, 109.99032408413527, 31.026532980212785, 109.99032370161731, 31.026554236815322, 109.99033132469548, 31.026560363317856, 109.99033989785543, 31.026565151918007, 109.99036001396631, 31.026581631450046, 109.99037463622103, 31.02655275187903, 109.99039738865626, 31.026518102660837,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp141", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.98851635640085, 31.02842494668737, 109.98852154019902, 31.028484568645375, 109.98851175875082, 31.0286117680789, 109.98850909921703, 31.028635231963825, 109.98852590771298, 31.028633353877222, 109.9885135384649, 31.02863909218357, 109.9885042371764, 31.028644706083412, 109.98849851436847, 31.02864534768198, 109.98846307289665, 31.02864400690231, 109.98841105215513, 31.028630497020643, 109.98836781491184, 31.02861833469441, 109.98843939921572, 31.028527603701377, 109.98852180478664, 31.028474304358284, 109.98852159417795, 31.028450719247374, 109.98849993083118, 31.028452880045258, 109.98847375982366, 31.02843866938579,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp142", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.9922704396161, 31.026623151131673, 109.9922713037261, 31.026631581985583, 109.99227635622277, 31.02667386818156, 109.99227846509179, 31.02675037219649, 109.99226304304902, 31.02680781316779, 109.99223327642922, 31.026831912136434, 109.99216927218924, 31.026814978471073, 109.99212288581921, 31.026804041270967, 109.99206891364935, 31.026782801007037, 109.9920672196585, 31.026775092422987, 109.99207786669315, 31.026758233288337, 109.9921049063382, 31.026728539208122, 109.99211162101903, 31.02667969116519, 109.99214918791711, 31.026658861050127, 109.99220731270393, 31.02665177599434, 109.99222379954402, 31.026646677259553, 109.99227252370653, 31.02662980052402, 109.99226789938942, 31.026623709139898, 109.9922704396161, 31.026623151131673,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));
//viewer.entities.add(new Cesium.Entity({ id: "temp143", polyline: { positions: Cesium.Cartesian3.fromDegreesArray([109.9895318543667, 31.035474560991158, 109.98940932430173, 31.035516792577713, 109.98932175061842, 31.035560317382608, 109.98918407696786, 31.035593967637155, 109.98911428838497, 31.03561658272255, 109.98909227400736, 31.03568062802037, 109.98906775974163, 31.035736683132054, 109.98895580646122, 31.035812364319565, 109.98872495259515, 31.035783528652253, 109.98874665726838, 31.035451571970604, 109.98872832121017, 31.035292515543127, 109.98871280758563, 31.035189870293543, 109.98867986805818, 31.035022534424993, 109.98866576370958, 31.034956750560887, 109.98862878940824, 31.03483324630151, 109.9885682039497, 31.03474403416049, 109.98856642695137, 31.03462648746508, 109.9888433379275, 31.034550287479973, 109.98899440583752, 31.03462290023041, 109.98907216092914, 31.03466588610604, 109.9892181612641, 31.034836181948773, 109.98927728630687, 31.03491149297743, 109.98928598245712, 31.03495882383285,]), width: 2, arcType: Cesium.ArcType.RHUMB, material: Cesium.Color.AQUA, show: true, clampToGround: true, classificationType: Cesium.ClassificationType.BOTH, }, }));















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

