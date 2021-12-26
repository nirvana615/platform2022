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

var regionaddlayerindex = null;                                 //项目区域（新增）
var addpointclouddatalayerindex = null;                         //上传点云数据

var utilprecreatlayerindex = null;                               //预处理模块
var utiltasklistlayerindex = null;                               //任务列表模块
var utiladdtasklayerindex = null;                                //新增任务模块
var utiltoolindex = null;                                    //点云工具模块
var utilchangeslayerindex = null;                                //变化区域图层模块

var headeruserlayerindex = null;                                //用户信息
var headernoticelayerindex = null;                              //通知消息
var headerselayerindex = null;                                  //设置

var tipslayer = -1;//全局提示层



var projectentities = [];//项目位置及标注

var currentprojectid = null;//当前项目id
var currentmonitorprojectid = null;//当前监测项目id



var curtileset = null;//当前三维模型
var modleInfo = null;//当前三维模型数据

var curpointcloudtileset = null;//当前点云


/*
 * 图标常量
 */
var LANDSLIDEICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/map/project_type_landslide.png" style="width:14px;height:14px;"/></span>';
var ROCKFALLICON = '<span style="margin-right:2px;"><img src="../../../Resources/img/map/project_type_rockfall.png" style="width:14px;height:14px;"/></span>';
























