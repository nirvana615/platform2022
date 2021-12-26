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

var projectinfoviewlayerindex = null;                           //项目信息模块（查看）
var projectinfoaddlayerindex = null;                            //项目信息模块（新建）
var projectinfoeditlayerindex = null;                           //项目信息模块（编辑）
var projectlayerlistlayerindex = null;                          //项目图层列表模块
var automonitordatalayerindex = null;                           //自动化监测数据可视化模块
var automonitordevicelayerindex = null;                         //自动化监测设备可视化模块
var warninganalysislayerindex = null;                           //预警分析模块

var headeruserlayerindex = null;                                //用户信息
var headernoticelayerindex = null;                              //通知消息
var headerselayerindex = null;                                  //设置



var tipslayer = -1;//全局提示层



var projectentities = [];//项目位置及标注

var currentprojectid = null;//当前项目id
var currentprojectdisastertype = null;//当前项目灾害类型
var currentprojectmonitors = [];//当前项目监测点树（除报警器、GNSS基站）
var currentprojectfristmonitor = null;//当前项目默认第一个监测点

var curtileset = null;//当前模型
var modleInfo = null;//当前模型数据

/*
 * 图标常量
 */
var LANDSLIDEICON = '<span style="margin-left:5px;margin-right:5px;"><img src="../../../Resources/img/map/project_type_landslide.png" style="width:14px;height:14px;"/></span>';
var ROCKFALLICON = '<span style="margin-left:5px;margin-right:5px;"><img src="../../../Resources/img/map/project_type_rockfall.png" style="width:14px;height:14px;"/></span>';




















