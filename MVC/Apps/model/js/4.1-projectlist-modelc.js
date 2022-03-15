//三维模型项目列表widget
var modelprojectlist = [];//按地区组织
var modelprojectlistyear = [];//按时间组织
var newprojecttype = false;


layer.open({
    type: 1
    , title: ['项目列表', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
    , area: ['350px', '90%']
    , shade: 0
    , offset: ['60px', '10px']
    , closeBtn: 0
    , maxmin: true
    , moveOut: true
    , resize: false
    , content: '<!--项目列表--><div class="layui-tab layui-tab-brief" lay-filter="modelprojectListTab" style="margin:0px;"><!--选项卡--><ul class="layui-tab-title"><li lay-id="list_area" class="layui-this" style="width:40%;">地区</li><li lay-id="list_year" style="width:40%;">时间</li></ul><!--tree--><div class="layui-tab-content"><div class="layui-tab-item layui-show"><div id="projectbyarea"></div></div><div class="layui-tab-item"><div id="projectbyyear"></div></div></div></div><!--搜索--><div class="layui-row" style="margin-left:5px;position:absolute;bottom:30px; "><div class="layui-input-inline"><input type="text" id="projectfiltersearch" lay-verify="title" autocomplete="off" placeholder="搜索" class="layui-input" style="padding-left:25px;border-radius:5px;width:260px"></div><button id="projectsearch" type="button" class="layui-btn layui-btn-primary" style="width:60px;border-radius:5px;margin-left:5px"><i class="layui-icon layui-icon-search"></i></button></div>'
    , zIndex: layer.zIndex
    , success: function (layero) {
        layer.setTop(layero);

        //获取用户全部项目信息
        GetUserAllModelProjects();
       //点击项目图标事件
        ModelMarkClick();
        //地区树
        tree.render({
            elem: '#projectbyarea'
            , id: 'areaprojectlistid'
            , data: []
            , showCheckbox: true
            , accordion: true
            , showLine: true
            , edit: ['add', 'update', 'del']
            , customCheckbox: true
            , customSpread: false
            , customOperate: true
            , cancelNodeFileIcon: true
            , click: function (obj) {
                ModelProjectNodeClick(obj);
            }
            , operate: function (obj) {
                ModelProjectNodeOperate(obj);
            }
            , oncheck: function (obj) {
                if (obj.checked) {

                    if (obj.data.type == "task") {

                        //for (var i in modelprojectlist) {
                        //    for (var j in modelprojectlist[i].children) {
                        //        for (var k in modelprojectlist[i].children[j].children) {
                        //            if (obj.data.id!=modelprojectlist[i].children[j].children[k].id) {
                        //                modelprojectlist[i].children[j].children[k].checked = false;
                        //            }
                        //            else {
                        //                modelprojectlist[i].children[j].children[k].checked = true;
                        //                modelprojectlist[i].children[j].spread = true;
                        //                modelprojectlist[i].spread = true;
                        //            }
                        //        }
                        //    }
                        //}
                        LoadModel(obj.data);//加载模型
                        DelEntitiesInViewer(projectentities);//移除项目标注图标 

                    }
                    //tree.reload('areaprojectlistid', { data: modelprojectlist });
                    //tree.setChecked('areaprojectlistid', obj.data.id); //单个勾选 id 为 1 的节点

                }
                else {
                    viewer.scene.globe.depthTestAgainstTerrain = measurewidget_depthTestAgainstTerrain;//还原当前深度检测值
                    viewer.scene.primitives.remove(curtileset);
                    AddEntitiesInViewer(projectentities);
                    curtileset = null;
                }
                document.getElementById("info").style.display = "none";//隐藏点击项目图标弹窗
            }
        });

        //时间树
        tree.render({
            elem: '#projectbyyear'
            , id: 'yearprojectlistid'
            , data: []
            , showCheckbox: true
            , customCheckbox: true
            , edit: ['add', 'update', 'del']    //项目操作选项
            , customOperate: true
            , accordion: false
            , cancelNodeFileIcon: true
            , click: function (obj) {
                ModelProjectNodeClick(obj);
            }
            , operate: function (obj) {
                ModelProjectNodeOperate(obj);
            }
            , oncheck: function (obj) {
                if (obj.checked) {
                    if (obj.data.type == "task") {
                        //for (var i in modelprojectlistyear) {
                        //    for (var j in modelprojectlistyear[i].children) {
                        //        for (var k in modelprojectlistyear[i].children[j].children) {
                        //            if (modelprojectlistyear[i].children[j].children[k].id == obj.data.id) {
                        //                modelprojectlistyear[i].children[j].children[k].checked = true;
                        //                modelprojectlistyear[i].spread = true;
                        //                modelprojectlistyear[i].children[j].spread = true;
                        //                modelprojectlistyear[i].children[j].children[k].spread = true;


                        //            }
                        //            else {

                        //                modelprojectlistyear[i].children[j].children[k].checked = false;

                        //            }
                        //        }
                        //    }
                        //}
                        LoadModel(obj.data);
                        DelEntitiesInViewer(projectentities);//移除项目标注图标

                    }
                    //重载项目树：将项目列表数据ModelProjectlist给data
                    //tree.reload('yearprojectlistid', {
                    //    data: modelprojectlistyear
                    //});
                }
                else {
                    viewer.scene.primitives.remove(curtileset);
                    curtileset = null;
                }
                document.getElementById("info").style.display = "none";//隐藏点击项目图标弹窗
            }
        });

        //搜索
        var lay_id;
        elem.on('tab(modelprojectListTab)', function (elem) {
            lay_id = $(this).attr('lay-id');
        });
        //1点击按钮树搜索
        $('#projectsearch').click(function () {
            

            if (lay_id == 'list_year') {
                var value = $("#projectfiltersearch").val();
                if (value) {
                    //首选应将文本的颜色恢复正常
                    var node = $("#projectbyyear");
                    node.find('.layui-tree-txt').css('color', '');

                    tree.reload('yearprojectlistid', {});//重载树，使得之前展开的记录全部折叠起来
                    viewer.scene.primitives.remove(curtileset);//删除加载的模型

                    $.each(node.find('.layui-tree-txt'), function (index, elem) {
                        elem = $(elem);
                        let textTemp = elem.text();
                        if (textTemp.indexOf(value) !== -1) {//查询相当于模糊查找
                            elem.addClass("tree-txt-active");
                            console.log('elem:', elem);
                            elem.filter(':contains(' + value + ')').css('color', '#FFB800'); //搜索文本并设置标志颜色
                        }
                    });

                    $.each($("#projectbyyear").find('.tree-txt-active'), function (index, elem) {
                        elem = $(elem);
                        // 展开所有父节点
                        elem.parents('.layui-tree-set').each(function (i, item) {
                            if (!$(item).hasClass('layui-tree-spread')) {
                                $(item).find('.layui-tree-iconClick:first').click();
                            }
                        });
                    });
                }
            }
            else {
                var value = $("#projectfiltersearch").val();
                if (value) {
                    //首选应将文本的颜色恢复正常
                    var node = $("#projectbyarea");
                    node.find('.layui-tree-txt').css('color', '');

                    tree.reload('areaprojectlistid', {});//重载树，使得之前展开的记录全部折叠起来
                    viewer.scene.primitives.remove(curtileset);//删除加载的模型

                    $.each(node.find('.layui-tree-txt'), function (index, elem) {
                        elem = $(elem);
                        let textTemp = elem.text();
                        if (textTemp.indexOf(value) !== -1) {//查询相当于模糊查找
                            elem.addClass("tree-txt-active");
                            console.log('elem:', elem);
                            elem.filter(':contains(' + value + ')').css('color', '#FFB800'); //搜索文本并设置标志颜色
                        }
                    });

                    $.each($("#projectbyarea").find('.tree-txt-active'), function (index, elem) {
                        elem = $(elem);
                        // 展开所有父节点
                        elem.parents('.layui-tree-set').each(function (i, item) {
                            if (!$(item).hasClass('layui-tree-spread')) {
                                $(item).find('.layui-tree-iconClick:first').click();
                            }
                        });
                    });
                }
            }

        });
        //2点击回车树搜索
        $('#projectfiltersearch').keydown(function (e) {
            if (e.keyCode == 13) {
               
                if (lay_id == 'list_year') {
                    var value = $("#projectfiltersearch").val();
                    if (value) {
                        //首选应将文本的颜色恢复正常
                        var node = $("#projectbyyear");
                        node.find('.layui-tree-txt').css('color', '');

                        tree.reload('yearprojectlistid', {});//重载树，使得之前展开的记录全部折叠起来
                        viewer.scene.primitives.remove(curtileset);//删除加载的模型

                        $.each(node.find('.layui-tree-txt'), function (index, elem) {
                            elem = $(elem);
                            let textTemp = elem.text();
                            if (textTemp.indexOf(value) !== -1) {//查询相当于模糊查找
                                elem.addClass("tree-txt-active");
                                console.log('elem:', elem);
                                elem.filter(':contains(' + value + ')').css('color', '#FFB800'); //搜索文本并设置标志颜色
                            }
                        });

                        $.each($("#projectbyyear").find('.tree-txt-active'), function (index, elem) {
                            elem = $(elem);
                            // 展开所有父节点
                            elem.parents('.layui-tree-set').each(function (i, item) {
                                if (!$(item).hasClass('layui-tree-spread')) {
                                    $(item).find('.layui-tree-iconClick:first').click();
                                }
                            });
                        });
                    }
                }
                else {
                    var value = $("#projectfiltersearch").val();
                    if (value) {
                        //首选应将文本的颜色恢复正常
                        var node = $("#projectbyarea");
                        node.find('.layui-tree-txt').css('color', '');

                        tree.reload('areaprojectlistid', {});//重载树，使得之前展开的记录全部折叠起来
                        viewer.scene.primitives.remove(curtileset);//删除加载的模型

                        $.each(node.find('.layui-tree-txt'), function (index, elem) {
                            elem = $(elem);
                            let textTemp = elem.text();
                            if (textTemp.indexOf(value) !== -1) {//查询相当于模糊查找
                                elem.addClass("tree-txt-active");
                                console.log('elem:', elem);
                                elem.filter(':contains(' + value + ')').css('color', '#FFB800'); //搜索文本并设置标志颜色
                            }
                        });

                        $.each($("#projectbyarea").find('.tree-txt-active'), function (index, elem) {
                            elem = $(elem);
                            // 展开所有父节点
                            elem.parents('.layui-tree-set').each(function (i, item) {
                                if (!$(item).hasClass('layui-tree-spread')) {
                                    $(item).find('.layui-tree-iconClick:first').click();
                                }
                            });
                        });
                    }
                }
            }

        });
        //搜索框为空时，将高亮恢复正常
        $("#projectfiltersearch").blur(function () {
            var search_txt = $(this).val();
            if (search_txt == "") {
                //将文本的颜色恢复正常
                var node_area = $("#projectbyarea");
                node_area.find('.layui-tree-txt').css('color', '');

                var node_year = $("#projectbyyear");
                node_year.find('.layui-tree-txt').css('color', '');
            }
        }) 
    }
});

////树搜索
//$('#projectsearch').click(function () {

//    var value = $("#projectfilter").val();
//    //console.log('value:', value);
//    if (value) {
//        //首选应将文本的颜色恢复正常
//        var node = $("#projectbyarea");
//        node.find('.layui-tree-txt').css('color', '');

//        //tree.reload('modelprojectlistid', {});//重载树，使得之前展开的记录全部折叠起来
//        $.each(node.find('.layui-tree-txt'), function (index, elem) {
//            elem = $(elem);
//            let textTemp = elem.text();
//            if (textTemp.indexOf(value) !== -1) {//查询相当于模糊查找
//                elem.addClass("tree-txt-active");
//                console.log('elem:', elem);
//                elem.filter(':contains(' + value + ')').css('color', '#FFB800'); //搜索文本并设置标志颜色
//            }
//        });

//        $.each($("#projectbyarea").find('.tree-txt-active'), function (index, elem) {
//            elem = $(elem);
//            // 展开所有父节点
//            elem.parents('.layui-tree-set').each(function (i, item) {
//                if (!$(item).hasClass('layui-tree-spread')) {
//                    $(item).find('.layui-tree-iconClick:first').click();
//                }
//            });
//        });
//    }
//});
////

//获取用户所有项目列表
function GetUserAllModelProjects(newprojectcode) {
    //TODO 新增项目位置及标注
    var newprojectzxjd = null;
    var newprojectzxwd = null;
    DelEntitiesInViewer(projectentities);//移除项目标注图标
    projectentities = [];

    modelprojectlist = [];
    modelprojectlistyear = [];
    $.ajax({
        url: servicesurl + "/api/ModelProject/GetUserModelProjectList", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {

                var modelprojectdata = JSON.parse(result.data);

                var areas = [];                 //地区
                var years = [];                 //时间
                for (var i in modelprojectdata) {
                    var year = modelprojectdata[i].ModelProjects.XMSJ.substr(0, 4);
                    var area = modelprojectdata[i].ModelProjects.XZQBM;
                    if (years.indexOf(year) == -1) {
                        years.push(year);
                    }
                    if (areas.indexOf(area) == -1) {
                        areas.push(area);
                    }

                }
                //升序排序
                areas.sort();
                for (var x in areas) {
                    var xzq = new Object;
                    if ((xjxzqs != null) && (xjxzqs.length > 0)) {
                        //行政区编码转行政区名称
                        for (var y in xjxzqs) {
                            if (areas[x] == xjxzqs[y].value) {
                                xzq.title = xjxzqs[y].name;
                            }
                        }
                    }
                    else {
                        xzq.title = areas[x];
                    }
                    var projects = [];

                    for (var i in modelprojectdata) {
                        if (modelprojectdata[i].ModelProjects.XZQBM == areas[x]) {
                            var prj = new Object;
                            prj.id = modelprojectdata[i].ModelProjects.Id;
                            prj.nodeOperate = true;
                            prj.title = modelprojectdata[i].ModelProjects.XMSJ.split("-").join("") + modelprojectdata[i].ModelProjects.XMMC;
                            prj.b = modelprojectdata[i].ModelProjects.ZXWD;
                            prj.l = modelprojectdata[i].ModelProjects.ZXJD;
                            prj.type = "project";
                            if (newprojectcode != null) {
                                if (modelprojectdata[i].ModelProjects.XMBM == newprojectcode.substr(0, 10)) {
                                    prj.spread = true;
                                    newprojectzxjd = prj.l;
                                    newprojectzxwd = prj.b;
                                    xzq.spread = true;
                                }
                            }

                            //prj.icon = PROJECTICON;
                            var tasks = [];

                            //model
                            if (modelprojectdata[i].ModelTasks != null) {
                                for (var j in modelprojectdata[i].ModelTasks.TaskList) {
                                    var task = new Object;
                                    task.id = modelprojectdata[i].ModelTasks.TaskList[j].Id;
                                    task.type = "task";
                                    task.nodeOperate = true;
                                    task.icon = MODELICON;

                                    task.title = modelprojectdata[i].ModelTasks.TaskList[j].RWMC;
                                    task.path = modelprojectdata[i].ModelTasks.TaskList[j].MXLJ;
                                    task.modelView = modelprojectdata[i].ModelTasks.TaskList[j].MXSJ;

                                    if (modelprojectdata[i].ModelTasks.TaskList[j].MXLJ != null) {
                                        task.showCheckbox = true;
                                        task.checked = false;
                                    }
                                    else {
                                        task.showCheckbox = false;
                                        task.checked = false;
                                    }
                                    tasks.push(task);
                                }
                            }
                            prj.children = tasks;
                            projects.push(prj);
                        }


                    }
                    xzq.children = projects;
                    modelprojectlist.push(xzq);
                }

                //升序排序
                //years.sort();
                for (var x in years) {
                    var year = new Object;

                    year.title = years[x];

                    var projects = [];

                    for (var i in modelprojectdata) {
                        if (modelprojectdata[i].ModelProjects.XMSJ.split("-")[0] == years[x]) {
                            var prj = new Object;
                            prj.id = modelprojectdata[i].ModelProjects.Id;
                            prj.nodeOperate = true;
                            prj.title = modelprojectdata[i].ModelProjects.XMSJ.split("-").join("") + modelprojectdata[i].ModelProjects.XMMC;
                            prj.b = modelprojectdata[i].ModelProjects.ZXWD;
                            prj.l = modelprojectdata[i].ModelProjects.ZXJD;
                            prj.type = "project";
                            //prj.icon = PROJECTICON;
                            if (newprojectcode != null) {
                                if (modelprojectdata[i].ModelProjects.XMBM == newprojectcode.substr(0, 10)) {
                                    prj.spread = true;
                                    newprojectzxjd = prj.l;
                                    newprojectzxwd = prj.b;
                                    year.spread = true;
                                }
                            }
                            var tasks = [];

                            //model
                            if (modelprojectdata[i].ModelTasks != null) {
                                for (var j in modelprojectdata[i].ModelTasks.TaskList) {
                                    var task = new Object;
                                    task.id = modelprojectdata[i].ModelTasks.TaskList[j].Id;
                                    task.type = "task";
                                    task.nodeOperate = true;
                                    task.icon = MODELICON;

                                    task.title = modelprojectdata[i].ModelTasks.TaskList[j].RWMC;
                                    task.path = modelprojectdata[i].ModelTasks.TaskList[j].MXLJ;
                                    task.modelView = modelprojectdata[i].ModelTasks.TaskList[j].MXSJ;

                                    if (modelprojectdata[i].ModelTasks.TaskList[j].MXLJ != null) {
                                        task.showCheckbox = true;
                                        task.checked = false;
                                    }
                                    else {
                                        task.showCheckbox = false;
                                        task.checked = false;
                                    }
                                    tasks.push(task);
                                }
                            }
                            prj.children = tasks;
                            projects.push(prj);
                        }


                    }
                    year.children = projects;
                    modelprojectlistyear.push(year);
                }

                //重载项目树：将项目列表数据ModelProjectlist给data
                tree.reload('areaprojectlistid', {
                    data: modelprojectlist
                });
                tree.reload('yearprojectlistid', {
                    data: modelprojectlistyear
                });
                //项目位置及标注
                var bs = [];//纬度集合
                var ls = [];//经度集合

                for (var i in modelprojectdata) {
                    var modelprojectentity = new Cesium.Entity({
                        id: "PROJECTCENTER_" + modelprojectdata[i].ModelProjects.Id,
                        position: Cesium.Cartesian3.fromDegrees(modelprojectdata[i].ModelProjects.ZXJD, modelprojectdata[i].ModelProjects.ZXWD),
                        billboard: {
                            image: '../../Resources/img/mark/p19.png',
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                            width: 40,
                            height: 40,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY, //深度检测，解决图标、标注与模型遮挡冲突
                        }
                    });
                    projectentities.push(modelprojectentity);

                    var modelprojectentitylabel = new Cesium.Entity({
                        id: "PROJECTCENTER_" + modelprojectdata[i].ModelProjects.Id + "_LABEL",
                        position: Cesium.Cartesian3.fromDegrees(modelprojectdata[i].ModelProjects.ZXJD, modelprojectdata[i].ModelProjects.ZXWD),
                        label: {
                            text: modelprojectdata[i].ModelProjects.XMMC,
                            font: '20px Times New Roman',
                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            scaleByDistance: new Cesium.NearFarScalar(90000, 1, 200000, 0)
                        }
                    });
                    projectentities.push(modelprojectentitylabel);

                    bs.push(modelprojectdata[i].ModelProjects.ZXWD);
                    ls.push(modelprojectdata[i].ModelProjects.ZXJD);
                };
                if (newprojectcode == null) {
                    if ((bs.length > 0) && (ls.length > 0)) {
                        //缩放至项目范围
                        setTimeout(() => {
                            FlytoExtent(Math.min.apply(null, ls) - 0.5, Math.min.apply(null, bs) - 0.5, Math.max.apply(null, ls) + 0.5, Math.max.apply(null, bs) + 0.5)
                        }, 1000);
                    };
                }
                else {
                    AddEntitiesInViewer(projectentities);
                    FlytoCurrentProjectExtent(newprojectzxjd, newprojectzxwd, 8000.0);
                }
                viewer.scene.primitives.remove(curtileset);

            }
            else {
                layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            };

        }, datatype: "json"
    });
};
//项目节点点击:set currentproject
function ModelProjectNodeClick(obj) {
    if (obj.data.type == "project") {
        if (currentprojectid == null || obj.data.id != currentprojectid) {

            layer.confirm('<p style="font-size:16px">是否确定将以下项目作为系统当前项目？</p><br/><p style="font-size:24px;font-weight:bold;text-align:center;">' + JSON.stringify(obj.data.title).replace(/\"/g, "") + '</p>', { title: ['消息提示', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei;background-color:#68bc80'], area: ['400px', '250px'], shade: 0.5, shadeClose: true, closeBtn: 0, resize: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } }, function (index) {

                if (JSON.stringify(obj.data.id) != currentprojectid) {
                    currentprojectid = JSON.stringify(obj.data.id);                             //更新当前项目id

                    document.getElementById("currentproject").style.visibility = "visible";
                    document.getElementById("currentproject").innerHTML = "<option>" + JSON.stringify(obj.data.title).replace(/\"/g, "") + "</option><option>清除当前项目</option>";

                    //监听清除当前项目操作
                    $(() => {
                        $('#currentprojectoperate select').change(() => {
                            if ($('#currentprojectoperate select').val() == "清除当前项目") {
                                document.getElementById("currentproject").innerHTML = "";
                                document.getElementById("currentproject").style.visibility = "hidden";
                                currentprojectid = null;

                                CloseAllLayer();                               //关闭弹出图层
                                viewer.entities.removeAll();
                                viewer.scene.primitives.remove(curtileset);//关闭模型
                                AddEntitiesInViewer(projectentities);
                            }
                        });
                    });

                }


                for (var i in modelprojectlist) {
                    modelprojectlist[i].spread = false;
                    for (var j in modelprojectlist[i].children) {
                        if (modelprojectlist[i].children[j].id != obj.data.id) {
                            for (var k in modelprojectlist[i].children[j].children) {
                                modelprojectlist[i].children[j].spread = false;
                                modelprojectlist[i].children[j].children[k].spread = false;
                                modelprojectlist[i].children[j].children[k].checked = false;

                            }
                        }
                        else {
                            modelprojectlist[i].spread = true;
                            modelprojectlist[i].children[j].spread = true;
                        }

                    }
                }
                tree.reload('areaprojectlistid', {
                    data: modelprojectlist
                });


                for (var i in modelprojectlistyear) {
                    modelprojectlistyear[i].spread = false;
                    for (var j in modelprojectlistyear[i].children) {
                        if (modelprojectlistyear[i].children[j].id != obj.data.id) {
                            for (var k in modelprojectlistyear[i].children[j].children) {
                                modelprojectlistyear[i].children[j].spread = false;
                                modelprojectlistyear[i].children[j].children[k].spread = false;
                                modelprojectlistyear[i].children[j].children[k].checked = false;

                            }
                        }
                        else {
                            modelprojectlistyear[i].spread = true;
                            modelprojectlistyear[i].children[j].spread = true;
                        }

                    }
                }
                tree.reload('yearprojectlistid', {
                    data: modelprojectlistyear
                });
                currentprojecttitle = obj.data.title;//赋值当前项目标题
                //当前节点高亮显示
                MarkNode();

                FlytoCurrentProjectExtent(obj.data.l, obj.data.b, 8000.0);
                layer.close(index);
                viewer.scene.primitives.remove(curtileset);//关闭模型
                AddEntitiesInViewer(projectentities);
            });

        }
        else {
            //
            FlytoCurrentProjectExtent(obj.data.l, obj.data.b, 8000.0);
        }
    }

};

//项目Mark点击操作
function ModelMarkClick() {

    //在地图div中增加html代码
    $("#map").append('<!--查看项目信息--> <div id="info" style=" display: none;position: absolute;width: 400px; height: 400px; z-index: 1000; background: rgba(30, 144, 255, 0.6); border: 2px solid #4169E1; border-radius: 25px;"> <form class="layui-form" style="margin-top:30px;margin-right:20px; color:white;" lay-filter="infoModelprojectinfoform"> <div class="layui-form-item"> <label class="layui-form-label">项目名称：</label> <div class="layui-input-block"> <input type="text" style="background-color:transparent;border-color:transparent;color:white;" name="model_xmmc_info" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">项目编码：</label> <div class="layui-input-block"> <input type="text" style="background-color:transparent;border-color:transparent;color:white;" name="model_xmbm_info" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">行政区划：</label> <div class="layui-input-block"> <input type="text" style="background-color:transparent;border-color:transparent;color:white;" name="model_xzqh_info" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">项目位置：</label> <div class="layui-input-block"> <input type="text" style="background-color:transparent;border-color:transparent;color:white;" name="model_xmwz_info" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">中心经度：</label> <div class="layui-input-block"> <input type="text" style="background-color:transparent;border-color:transparent;color:white;" name="model_zxjd_info" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">中心纬度：</label> <div class="layui-input-block"> <input type="text" style="background-color:transparent;border-color:transparent;color:white;" name="model_zxwd_info" readonly="readonly" class="layui-input" /> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">项目时间：</label> <div class="layui-input-block"> <input type="text" style="background-color:transparent;border-color:transparent;color:white;" name="model_xmsj_info" readonly="readonly" class="layui-input" /> </div> </div><div class="layui-form-item"> <label class="layui-form-label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</label> <div class="layui-input-block"> <input type="text" style="background-color:transparent;border-color:transparent;color:white;" name="model_bz_info" readonly="readonly" class="layui-input"> </div> </div> </form> </div>');

    var canvas = viewer.scene.canvas;
    const handler_modelmark = new Cesium.ScreenSpaceEventHandler(canvas);

    //注册鼠标点击事件
    handler_modelmark.setInputAction(function (e) {

        var pick = viewer.scene.pick(e.position,9, 9);
        var earthPosition = viewer.camera.pickEllipsoid(e.position, viewer.scene.globe.ellipsoid);
        var cartographic = Cesium.Cartographic.fromCartesian(earthPosition, viewer.scene.globe.ellipsoid, new Cesium.Cartographic());
        var lat = Cesium.Math.toDegrees(cartographic.latitude);
        var lng = Cesium.Math.toDegrees(cartographic.longitude);
        var height = cartographic.height;
        var htmlinfo = document.getElementById("info");

        if (Cesium.defined(pick) && Cesium.defined(pick.id)) {
            if (pick.id.id.split("_")[0] == "PROJECTCENTER") {

                var project_id = pick.id.id.split("_")[1];
                tree_reload(project_id);


                //异步获取项目信息
                $.ajax({
                    url: servicesurl + "/api/ModelProject/GetModelProjectInfo", type: "get", data: { "id": project_id, "cookie": document.cookie },
                    success: function (data) {
                        var result = JSON.parse(data);
                        if (result.code == 1) {
                            var modelprojectinfo = JSON.parse(result.data);

                            form.val("infoModelprojectinfoform", {
                                "model_xmmc_info": modelprojectinfo.XMMC
                                , "model_xmbm_info": modelprojectinfo.XMBM
                                , "model_zxjd_info": modelprojectinfo.ZXJD
                                , "model_zxwd_info": modelprojectinfo.ZXWD
                                , "model_xmsj_info": modelprojectinfo.XMSJ
                                , "model_xmwz_info": modelprojectinfo.XMWZ
                                , "model_bz_info": modelprojectinfo.BZ
                            });
                            //翻译项目位置
                            if (xjxzqs.length > 0) {
                                for (var i in xjxzqs) {
                                    if (xjxzqs[i].value == modelprojectinfo.XZQBM) {
                                        var xzqh = "重庆市" + xjxzqs[i].name;
                                        form.val("infoModelprojectinfoform", {
                                            "model_xzqh_info": xzqh
                                        });
                                    }
                                }
                            }
                        }
                        else {
                            form.val("infoModelprojectinfoform", {
                                "model_xmmc_info": ""
                                , "model_xmbm_info": ""
                                , "model_xmwz_info": ""
                                , "model_zxjd_info": ""
                                , "model_zxwd_info": ""
                                , "model_xmsj_info": ""
                                , "model_xzqh_info": ""
                                , "model_bz_info": ""
                            });
                        }

                    }, datatype: "json"
                });

                const domHeight = htmlinfo.style.height.split('px').join(); // 
                const domWidth = htmlinfo.style.width.split('px').join(); // 
                const heightOffset = 10; // Y轴偏移量
                const widthOffset = 10; // X轴偏移量

                const scratch = new Cesium.Cartesian2();
                viewer.scene.preRender.addEventListener(function () {
                    let position = Cesium.Cartesian3.fromDegrees(lng, lat, 2);
                    let canvasPosition = viewer.scene.cartesianToCanvasCoordinates(position, scratch);
                    if (Cesium.defined(canvasPosition)) {

                        htmlinfo.style.top = canvasPosition.y - parseInt(domHeight) + heightOffset + 'px';
                        htmlinfo.style.left = canvasPosition.x - parseInt(domWidth) / 2 + widthOffset + 'px';
                    }

                });
                htmlinfo.style.display = "block";
            }
            
            
        }
        else {
            htmlinfo.style.display = "none";
        }
        
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //项目列表联动
    function tree_reload(id) {
        elem.tabChange('modelprojectListTab', 'list_area');
        for (var i in modelprojectlist) {
            modelprojectlist[i].spread = false;
            for (var j in modelprojectlist[i].children) {
                if (modelprojectlist[i].children[j].id != id) {
                    modelprojectlist[i].children[j].spread = false;
                }
                else {
                    modelprojectlist[i].spread = true;
                    modelprojectlist[i].children[j].spread = true;
                }

            }
        }
        tree.reload('areaprojectlistid', {
            data: modelprojectlist
        });
    }
   
    
    
    
}

//项目树（项目列表+目标）节点操作：add\update\del
function ModelProjectNodeOperate(obj) {
    if (obj.type == 'add') {
        //查看
        if (obj.data.type == 'project') {
            //项目查看操作
            if ((modelprojectinfoaddlayerindex == null) && (modelprojectinfoeditlayerindex == null)) {
                ModelProjectInfo(obj.data.id, "view");
            }
            else {
                layer.confirm('是否打开新的模块?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                    CloseModelProjectInfoLayer();
                    ModelProjectInfo(obj.data.id, "view");
                    layer.close(index);
                });
            }
        }
        else if (obj.data.type == 'task') {
            //目标的查看操作
            //TODO
            if ((modeltaskinfoaddlayerindex == null) && (modeltaskinfoeditlayerindex == null)) {
                ModelTaskInfo(obj.data.id, "view");
            }
            else {
                layer.confirm('是否打开新的模块?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                    CloseModelTaskInfoLayer();
                    ModelTaskInfo(obj.data.id, "view");
                    layer.close(index);
                });
            }
        }
    }
    else if (obj.type == 'update') {
        //编辑
        if (obj.data.type == 'project') {
            //项目编辑操作
            if ((modelprojectinfoaddlayerindex == null) && (modelprojectinfoviewlayerindex == null)) {
                ModelProjectInfo(obj.data.id, "edit");
            }
            else {
                layer.confirm('是否打开新的模块?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                    CloseModelProjectInfoLayer();
                    ModelProjectInfo(obj.data.id, "edit");

                    layer.close(index);
                });
            }
        }
        else if (obj.data.type == 'task') {
            //目标的编辑操作
            if ((modeltaskinfoaddlayerindex == null) && (modeltaskinfoviewlayerindex == null)) {
                ModelTaskInfo(obj.data.id, "edit");

            }
            else {
                layer.confirm('是否打开新的模块?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                    CloseModelTaskInfoLayer();
                    ModelTaskInfo(obj.data.id, "edit");
                    layer.close(index);
                });
            }
        }

    }
    else {
        //删除
        //编辑
        if (obj.data.type == 'project') {
            //项目删除操作del   
            if (obj.data.children.length >= 1) {
                layer.confirm('当前项目存在子任务，是否确定删除?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                    $.ajax({
                        url: servicesurl + "/api/ModelProject/DeleteModelProject", type: "delete", data: { "id": obj.data.id, "cookie": document.cookie },
                        success: function (data) {
                            var result = JSON.parse(data);
                            //layer.msg(result.data, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            //TODO————清除项目位置及标注
                            //刷新项目列表
                            GetUserAllModelProjects();
                            ////欲删除项目未选定为当前项目，或当前项目为空。
                            if (obj.data.id == currentprojectid) {
                                document.getElementById("currentproject").innerHTML = "";
                                document.getElementById("currentproject").style.visibility = "hidden";
                                currentprojectid = null;
                                CloseAllLayer();                               //关闭弹出图层
                            }
                            if ((modelprojectinfoviewlayerindex != null) || (modelprojectinfoeditlayerindex != null) || (modelprojectinfoaddlayerindex != null)) {
                                CloseAllLayer();
                            }
                        }, datatype: "json"
                    })
                });

            }
            else {
                $.ajax({
                    url: servicesurl + "/api/ModelProject/DeleteModelProject", type: "delete", data: { "id": obj.data.id, "cookie": document.cookie },
                    success: function (data) {
                        var result = JSON.parse(data);
                        //layer.msg(result.data, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        //TODO————清除项目位置及标注
                        //刷新项目列表
                        GetUserAllModelProjects();
                        ////欲删除项目未选定为当前项目，或当前项目为空。
                        if (obj.data.id == currentprojectid) {
                            document.getElementById("currentproject").innerHTML = "";
                            document.getElementById("currentproject").style.visibility = "hidden";
                            currentprojectid = null;
                            CloseAllLayer();                               //关闭弹出图层
                        }
                        if ((modelprojectinfoviewlayerindex != null) || (modelprojectinfoeditlayerindex != null) || (modelprojectinfoaddlayerindex != null)) {
                            CloseAllLayer();
                        }
                    }, datatype: "json"
                })
            }

        }
        else if (obj.data.type == 'task') {
            //任务删除操作
            $.ajax({
                url: servicesurl + "/api/ModelTask/DeleteTask", type: "delete", data: { "id": obj.data.id, "cookie": document.cookie },
                success: function (data) {
                    var result = JSON.parse(data);
                    //刷新项目列表
                    GetUserAllModelProjects();
                    layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    if ((modeltaskinfoviewlayerindex != null) || (modeltaskinfoaddlayerindex != null) || (modeltaskinfoeditlayerindex != null)) {
                        CloseAllLayer();


                    }
                }, datatype: "json"
            })
        }

    }
};

//缩放至当前项目范围
function FlytoCurrentProjectExtent(l, b, h) {
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(l, b, h)
    }, { duration: 1 });
};

//缩放至所有项目范围
function FlytoExtent(west, south, east, north) {
    viewer.camera.flyTo({
        destination: new Cesium.Rectangle.fromDegrees(west, south, east, north)
    }, { duration: 3 });

    if (projectentities.length > 0) {
        setTimeout(() => {
            AddEntitiesInViewer(projectentities)
        }, 100);
    }
};

//向viewer添加entity
function AddEntityInViewer(entity) {
    if (entity != null) {
        viewer.entities.add(entity);
    }
};

//向viewer添加entity集合
function AddEntitiesInViewer(entities) {
    if (entities.length > 0) {
        for (var i in entities) {
            if (entities[i] != null) {
                viewer.entities.add(entities[i]);
            }
        }

        //viewer.flyTo(entities, { duration: 1, offset: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-90), 0) });
    }
};
//向viewer移除entity集合
function DelEntitiesInViewer(entities) {
    if (entities.length > 0) {
        for (var i in entities) {
            if (entities[i] != null) {
                viewer.entities.remove(entities[i]);
            }
        }

        //viewer.flyTo(entities, { duration: 1, offset: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-90), 0) });
    }
};
//关闭所有弹出图层
function CloseAllLayer() {
    //关闭项目信息图层
    if (modelprojectinfoviewlayerindex != null) {
        layer.close(modelprojectinfoviewlayerindex);
        modelprojectinfoviewlayerindex = null;
    }
    if (modelprojectinfoaddlayerindex != null) {
        layer.close(modelprojectinfoaddlayerindex);
        modelprojectinfoaddlayerindex = null;
    }
    if (modelprojectinfoeditlayerindex != null) {
        layer.close(modelprojectinfoeditlayerindex);
        modelprojectinfoeditlayerindex = null;
    }

    //关闭模型信息图层
    if (modeltaskinfoviewlayerindex != null) {
        layer.close(modeltaskinfoviewlayerindex);
        modeltaskinfoviewlayerindex = null;
    }
    if (modeltaskinfoaddlayerindex != null) {
        layer.close(modeltaskinfoaddlayerindex);
        modeltaskinfoaddlayerindex = null;
    }
    if (modeltaskinfoeditlayerindex != null) {
        layer.close(modeltaskinfoeditlayerindex);
        modeltaskinfoeditlayerindex = null;
    }

    if (newmodeltaskinfolayerindex != null) {
        layer.close(newmodeltaskinfolayerindex);
        newmodeltaskinfolayerindex = null;
    }
    //TODO更多关闭图层
};
//关闭项目信息相关图层
function CloseModelProjectInfoLayer() {
    if (modelprojectinfoviewlayerindex != null) {
        layer.close(modelprojectinfoviewlayerindex);
        modelprojectinfoviewlayerindex = null;
    }
    if (modelprojectinfoaddlayerindex != null) {
        layer.close(modelprojectinfoaddlayerindex);
        modelprojectinfoaddlayerindex = null;
    }
    if (modelprojectinfoeditlayerindex != null) {
        layer.close(modelprojectinfoeditlayerindex);
        modelprojectinfoeditlayerindex = null;
    }
    if (modelprojectrightuserlayerindex != null) {
        layer.close(modelprojectrightuserlayerindex);
        modelprojectrightuserlayerindex = null;
    }

}

//关闭任务信息相关图层
function CloseModelTaskInfoLayer() {
    if (modeltaskinfoviewlayerindex != null) {
        layer.close(modeltaskinfoviewlayerindex);
        modeltaskinfoviewlayerindex = null;
    }
    if (modeltaskinfoaddlayerindex != null) {
        layer.close(modeltaskinfoaddlayerindex);
        modeltaskinfoaddlayerindex = null;
    }
    if (modeltaskinfoeditlayerindex != null) {
        layer.close(modeltaskinfoeditlayerindex);
        modeltaskinfoeditlayerindex = null;
    }
    if (newmodeltaskinfolayerindex != null) {
        layer.close(newmodeltaskinfolayerindex);
        newmodeltaskinfolayerindex = null;
    }
}