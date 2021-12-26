/*
 * 全局对象
 */
var viewer = null;

var tree = layui.tree;              //layui初始化
var form = layui.form;              //layui初始化
var table = layui.table;            //layui初始化
var util = layui.util;              //layui初始化
var date = layui.laydate;           //layui初始化
var elem = layui.element;           //layui初始化
var colorpicker = layui.colorpicker;//
layui.use(['element'], function () {
    layui.element.init();//手动调用初始化方法
})
//var role = "";                     //用户功能权限

var modelprojectinfoviewlayerindex = null;                           //项目信息模块（查看）
var modelprojectinfoaddlayerindex = null;                            //项目信息模块（新建）
var modelprojectinfoeditlayerindex = null;                           //项目信息模块（编辑）
var modelprojectrightuserlayerindex = null;                          //项目权限模块

var modeltaskinfoviewlayerindex = null;                           //模型信息模块（查看）
var modeltaskinfoaddlayerindex = null;                            //模型信息模块（新建）
var modeltaskinfoeditlayerindex = null;                           //模型信息模块（编辑）
var newmodeltaskinfolayerindex = null;                            //新模型任务信息

var headeruserlayerindex = null;                                //用户信息
var headernoticelayerindex = null;                              //通知消息
var headerselayerindex = null;                                  //设置



var tipslayer = -1;//全局提示层


//*model
var modelprojectentities = [];//项目位置及标注
//*model
var currentprojectid = null;//当前项目id
//*model
var currentprojectdisastertype = null;//当前项目类型


var curtileset = null;//当前模型
var modleInfo = null;//当前模型数据

var projectlayerlistlayerindex =null  //标注窗口

/*
 * 图标常量
 */
var LANDSLIDEICON = '<span style="margin-right:15px;"><img src="../../../Resources/img/map/marker.png" style="width:14px;height:14px;"/></span>';
//var ROCKFALLICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/map/project_type_rockfall.png" style="width:14px;height:14px;"/></span>';




















