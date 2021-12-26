/*
 * 全局对象
 */
var viewer = null;

var tree = layui.tree;              //layui初始化--树形结构
var form = layui.form;              //layui初始化--表单
var table = layui.table;            //layui初始化--选项卡
var util = layui.util;              //layui初始化
var date = layui.laydate;           //layui初始化
var elem = layui.element;           //layui初始化
var upload = layui.upload;          //layui初始化--文件上传


var imageprojectinfoviewlayerindex = null;                           //项目信息模块（查看）
var imageprojectinfoaddlayerindex = null;                            //项目信息模块（新建）
var imageprojectinfoeditlayerindex = null;                           //项目信息模块（编辑）


var imagetargetinfoviewlayerindex = null;                           //目标信息模块（查看）
var imagetargetinfoaddlayerindex = null;                            //目标信息模块（新建）
var imagetargetinfoeditlayerindex = null;                           //目标信息模块（编辑）

var imageroiinfoeditlayerindex = null;                           //靶区信息模块（编辑）

var imagechangedatalayerindex = null;                           //影像变化信息可视化模块









var multipleimageuploadlayerindex = null;                            //多影像自动上传模块





var currentprojectid = null;//当前影像项目id



















var imagechangeindex = null;                                    //影像模块（变化）



var headeruserlayerindex = null;                                //用户信息
var headernoticelayerindex = null;                              //通知消息
var headerselayerindex = null;                                  //设置

var tipslayer = -1;//全局提示层



var imageprojectentities = [];//影像项目位置及标注



/*var curtileset = null;*///当前模型

var current_project_tile = null; //当前模型



















