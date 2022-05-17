//新建模型
function AddModelTask(projectid) {
    if (projectid == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
    }
    else {
        if (modeltaskinfoaddlayerindex == null) {
            modeltaskinfoaddlayerindex = layer.open({
                type: 1
                , title: ['新建模型', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['700px', '605px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , resize: false
                , content: '<!--新建模型--><div style="overflow:hidden;"><form class="layui-form" style="margin-top:5px;margin-right:10px;" lay-filter="addmodeltaskinfoform"><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">模型名称</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_rwmc_add" autocomplete="off" lay-verify="required" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">采集时间</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_yxcjsj_add" id="yxcjsjid" lay-verify="required|date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">采集设备</label><div class="layui-input-block" style="margin-left:90px;"><select id="yxcjsbid" name="model_yxcjsb_add"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">采集人员</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_yxcjry_add" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">影像数量</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_yxsl_add" autocomplete="off" placeholder="请输入数字" lay-verify="required|number" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">影像地址</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_yxcflj_add" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">像&ensp;控&ensp;点</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="model_yxkzd_add" class="layui-textarea" rows="5" style="resize:none" autocomplete="off" placeholder="格式:像控点编号,x,y,h"></textarea></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">影像pos</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="model_yxpos_add" class="layui-textarea" rows="5" style="resize:none" autocomplete="off" placeholder="格式:影像名称,纬度,经度,高程"></textarea></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">坐标系统</label><div class="layui-input-block" style="margin-left:90px;"><select id="kjckid" name="model_kjck_add" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">高程系统</label><div class="layui-input-block" style="margin-left:90px;"><select id="gcxtid" name="model_gcxt_add"><option value="">请选择</option></select></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">高程异常</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_gcyc_add" autocomplete="off" placeholder="请输入数字" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">模型等级</label><div class="layui-input-block" style="margin-left:90px;"><select id="mxdjid" name="model_mxdj_add"><option value="">请选择</option></select></div></div></div><div class="layui-col-md6"><div class="grid-demo"></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">成&emsp;&emsp;果</label><div class="layui-input-block" id="sxcgid" style="margin-left:90px;"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">描&emsp;&emsp;述</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_rwms_add" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item" style="margin-top:10px"><div style="text-align:center"><button type="submit" class="layui-btn" lay-submit="" lay-filter="addmodeltaskinfosubmit" style="width:120px;border-radius:5px;">提交</button><button type="reset" class="layui-btn layui-btn-primary" style="width:120px;border-radius:5px;">重置</button></div></div></form></div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    //相机
                    if (rwxjs.length > 0) {
                        for (var i in rwxjs) {
                            document.getElementById("yxcjsbid").innerHTML += '<option value="' + rwxjs[i].value + '">' + rwxjs[i].name + '</option>';
                        }
                    }
                    //坐标系统
                    if (srids.length > 0) {
                        for (var i in srids) {
                            if (srids[i].name == "CGCS2000 / 3-degree Gauss-Kruger CM 108E") {
                                document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '" selected>' + srids[i].name + '</option>';
                            }
                            else {
                                document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '">' + srids[i].name + '</option>';
                            }
                        }
                    }
                    //高程系统
                    if (gcxts.length > 0) {
                        for (var i in gcxts) {
                            document.getElementById("gcxtid").innerHTML += '<option value="' + gcxts[i].value + '">' + gcxts[i].name + '</option>';
                        }
                    }
                    //模型等级
                    if (mxdjs.length > 0) {
                        for (var i in gcxts) {
                            document.getElementById("mxdjid").innerHTML += '<option value="' + mxdjs[i].value + '">' + mxdjs[i].name + '</option>';
                        }
                    }
                    //成果
                    if (rwcps.length > 0) {
                        for (var i in rwcps) {
                            if (rwcps[i].name == "3DTiles") {
                                document.getElementById("sxcgid").innerHTML += '<input name="model_sxcg_add" value="' + rwcps[i].value + '"' + 'type="checkbox" lay-filter="modeldata" title="' + rwcps[i].name + '" checked="">';
                            }
                            else {
                                document.getElementById("sxcgid").innerHTML += '<input name="model_sxcg_add" value="' + rwcps[i].value + '"' + 'type="checkbox" lay-filter="modeldata" title="' + rwcps[i].name + '">';
                            }
                        }
                    }

                    //渲染时间
                    date.render({
                        elem: '#yxcjsjid'
                    });

                    form.render('select');
                    form.render();


                    //新建模型
                    form.on('submit(addmodeltaskinfosubmit)', function (data) {
                        //成果
                        var modeldatas = [];
                        $('input[name=model_sxcg_add]:checked').each(function () {
                            modeldatas.push($(this).val());
                        });

                        if (modeldatas.indexOf("0") == -1) {
                            layer.msg("3DTiles为必选数据。", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }
                        else {
                            loadlayerindex = layer.load(1, { shade: [0.5, '#393D49'] });
                            data.field.cookie = document.cookie;
                            data.field.projectid = projectid;
                            data.field.model_sxcg_add = modeldatas.toString();

                            $.ajax({
                                url: servicesurl + "/api/ModelTask/AddTask", type: "post", data: data.field,
                                success: function (result) {
                                    CloseLayer(loadlayerindex);
                                    var info = JSON.parse(result);
                                    if (info.code == 1) {
                                        var modeldata = JSON.parse(info.data);
                                        var task = new Object;
                                        task.id = modeldata.Id;
                                        task.title = modeldata.RWMC;
                                        task.type = "modeltask";
                                        task.icon = MODELICON;
                                        task.data = modeldata;
                                        task.nodeOperate = true;
                                        task.showCheckbox = true;
                                        task.disabled = true;
                                        task.checked = false;

                                        var newmodeltaskp = [];
                                        modeltaskpcount++;
                                        var taskinfo = new Object;
                                        taskinfo.id = modeldata.Id;
                                        taskinfo.rwbm = modeldata.RWBM;
                                        taskinfo.rwmc = modeldata.RWMC;
                                        taskinfo.yxcjry = modeldata.YXCJRY;
                                        taskinfo.yxcjsj = modeldata.YXCJSJ;
                                        taskinfo.data = modeldata;
                                        taskinfo.rwzt = "待处理";
                                        newmodeltaskp.push(taskinfo);
                                        for (var i in modeltaskp) {
                                            newmodeltaskp.push(modeltaskp[i]);
                                        }
                                        modeltaskp = newmodeltaskp;
                                        if (modeltaskprocesslayerindex != null) {
                                            modeltaskdatatablev.reload({ id: 'modeltasktablevid', data: modeltaskp });
                                            document.getElementById('task-p-count').innerText = modeltaskpcount;
                                        }

                                        for (var i in modelprojectlistarea) {
                                            for (var j in modelprojectlistarea[i].children) {
                                                if (modelprojectlistarea[i].children[j].id == projectid) {
                                                    var projectchild = [];
                                                    projectchild.push(task);

                                                    if (modelprojectlistarea[i].children[j].children != undefined && modelprojectlistarea[i].children[j].children.length > 0) {
                                                        for (var k in modelprojectlistarea[i].children[j].children) {
                                                            projectchild.push(modelprojectlistarea[i].children[j].children[k]);
                                                        }
                                                    }

                                                    modelprojectlistarea[i].children[j].children = projectchild;
                                                    break;
                                                }
                                            }
                                        }

                                        for (var i in modelprojectlistyear) {
                                            for (var j in modelprojectlistyear[i].children) {
                                                if (modelprojectlistyear[i].children[j].id == projectid) {
                                                    var projectchild = [];
                                                    projectchild.push(task);

                                                    if (modelprojectlistyear[i].children[j].children != undefined && modelprojectlistyear[i].children[j].children.length > 0) {
                                                        for (var k in modelprojectlistyear[i].children[j].children) {
                                                            projectchild.push(modelprojectlistyear[i].children[j].children[k]);
                                                        }
                                                    }

                                                    modelprojectlistyear[i].children[j].children = projectchild;
                                                    break;
                                                }
                                            }
                                        }

                                        isReloadTree = true;//标记重载
                                        MarkCurrentProject();
                                        isReloadTree = false;//重载后还原

                                        layer.close(modeltaskinfoaddlayerindex);
                                    }

                                    layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                }, datatype: "json"
                            });
                        }

                        return false;
                    });
                }
                , end: function () {
                    modeltaskinfoaddlayerindex = null;
                }
            });
        }
    }
};

//查看模型
function ViewModelTask(taskdata) {
    if (modeltaskinfoviewlayerindex != null) {
        ViewModelTaskHelper();
    }
    else {
        modeltaskinfoviewlayerindex = layer.open({
            type: 1
            , title: ['查看模型', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['700px', '560px']
            , shade: 0
            , offset: 'auto'
            , closeBtn: 1
            , maxmin: true
            , moveOut: true
            , resize: false
            , content: '<!--查看模型--><form class="layui-form" style="margin-top:5px;margin-right:10px;" lay-filter="viewmodeltaskinfoform"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">模型名称</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_rwmc_view" autocomplete="off" readonly="readonly" class="layui-input" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">模型编码</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_rwbm_view" autocomplete="off" readonly="readonly" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">采集时间</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_yxcjsj_view" readonly="readonly" class="layui-input" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">采集设备</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_yxcjsb_view" readonly="readonly" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">采集人员</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_yxcjry_view" readonly="readonly" class="layui-input" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">影像数量</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_yxsl_view" readonly="readonly" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">影像地址</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_yxcflj_view" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">像&ensp;控&ensp;点</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="model_yxkzd_view" class="layui-textarea" rows="5" style="resize:none" autocomplete="off" readonly="readonly"></textarea></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">影像pos</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="model_yxpos_view" class="layui-textarea" rows="5" style="resize:none" autocomplete="off" readonly="readonly"></textarea></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">坐标系统</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_kjck_view" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">高程系统</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_gcxt_view" readonly="readonly" class="layui-input" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">高程异常</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_gcyc_view" readonly="readonly" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">模型等级</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_mxdj_view" readonly="readonly" class="layui-input" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">生产状态</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_rwzt_view" readonly="readonly" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">成&emsp;&emsp;果</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_sxcg_view" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">描&emsp;&emsp;述</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_rwms_view" readonly="readonly" class="layui-input"></div></div></form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                ViewModelTaskHelper();
            }
            , end: function () {
                modeltaskinfoviewlayerindex = null;
            }
        });
    }

    //赋值
    function ViewModelTaskHelper() {
        form.val("viewmodeltaskinfoform", {
            "model_rwmc_view": taskdata.RWMC
            , "model_rwbm_view": taskdata.RWBM
            , "model_yxcjsj_view": taskdata.YXCJSJ
            , "model_yxcjry_view": taskdata.YXCJRY
            , "model_yxsl_view": taskdata.YXSL
            , "model_yxcflj_view": taskdata.YXCFLJ
            , "model_yxkzd_view": taskdata.YXKZD
            , "model_yxpos_view": taskdata.YXPOS
            , "model_gcyc_view": taskdata.GCYC
            , "model_rwms_view": taskdata.RWMS
        });

        //采集设备
        if (rwxjs.length > 0) {
            for (var i in rwxjs) {
                if (rwxjs[i].value == taskdata.YXCJSB) {
                    form.val("viewmodeltaskinfoform", {
                        "model_yxcjsb_view": rwxjs[i].name
                    });
                }
            }
        }
        //空间参考
        if (srids.length > 0) {
            for (var i in srids) {
                if (srids[i].value == taskdata.SRID) {
                    form.val("viewmodeltaskinfoform", {
                        "model_kjck_view": srids[i].name
                    });
                }
            }
        }
        //高程系统
        if (gcxts.length > 0) {
            for (var i in gcxts) {
                if (gcxts[i].value == taskdata.GCXT) {
                    form.val("viewmodeltaskinfoform", {
                        "model_gcxt_view": gcxts[i].name
                    });
                }
            }
        }
        //模型等级
        if (mxdjs.length > 0) {
            for (var i in mxdjs) {
                if (mxdjs[i].value == taskdata.MXDJ) {
                    form.val("viewmodeltaskinfoform", {
                        "model_mxdj_view": mxdjs[i].name
                    });
                }
            }
        }
        //生产状态
        if (rwzts.length > 0) {
            for (var i in rwzts) {
                if (rwzts[i].value == taskdata.RWZT) {
                    form.val("viewmodeltaskinfoform", {
                        "model_rwzt_view": rwzts[i].name
                    });
                }
            }
        }
        //成果
        if (rwcps.length > 0) {
            var Sxcg = taskdata.SXCG.trim().split(",");
            var sxcgdata = "";
            for (var i in Sxcg) {
                for (var j in rwcps) {
                    if (rwcps[j].value == Sxcg[i]) {
                        sxcgdata += rwcps[j].name + "；";
                    }
                }
            }
            form.val("viewmodeltaskinfoform", {
                "model_sxcg_view": sxcgdata
            });
        }
    };
};

//编辑模型
function EditModelTask(taskdata) {
    if (modeltaskinfoeditlayerindex != null) {
        EditModelTaskHelper();
    }
    else {
        modeltaskinfoeditlayerindex = layer.open({
            type: 1
            , title: ['编辑模型', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['700px', '610px']
            , shade: 0
            , offset: 'auto'
            , maxmin: true
            , closeBtn: 1
            , moveOut: true
            , resize: false
            , content: '<!--编辑模型--><div style="overflow:hidden;"><form class="layui-form" style="margin-top:5px;margin-right:10px;" lay-filter="editmodeltaskinfoform"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">模型名称</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_rwmc_edit" autocomplete="off" lay-verify="required" placeholder="请输入" class="layui-input" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">模型编码</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_rwbm_edit" autocomplete="off" lay-verify="required" readonly="readonly" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">采集时间</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_yxcjsj_edit" id="yxcjsjid" lay-verify="required|date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">采集设备</label><div class="layui-input-block" style="margin-left:90px;"><select id="yxcjsbid" name="model_yxcjsb_edit"><option value="">请选择</option></select></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">采集人员</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_yxcjry_edit" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">影像数量</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_yxsl_edit" autocomplete="off" placeholder="请输入数字" lay-verify="required|number" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">影像地址</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_yxcflj_edit" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">像&ensp;控&ensp;点</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="model_yxkzd_edit" class="layui-textarea" rows="5" style="resize:none" autocomplete="off" placeholder="格式:像控点编号,x,y,h"></textarea></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">影像pos</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="model_yxpos_edit" class="layui-textarea" rows="5" style="resize:none" autocomplete="off" placeholder="格式:影像名称,纬度,经度,高程"></textarea></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">坐标系统</label><div class="layui-input-block" style="margin-left:90px;"><select id="kjckid" name="model_kjck_edit" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">高程系统</label><div class="layui-input-block" style="margin-left:90px;"><select id="gcxtid" name="model_gcxt_edit"><option value="">请选择</option></select></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">高程异常</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_gcyc_edit" autocomplete="off" placeholder="请输入数字" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">模型等级</label><div class="layui-input-block" style="margin-left:90px;"><select id="mxdjid" name="model_mxdj_edit"><option value="">请选择</option></select></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">生产状态</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_rwzt_edit" autocomplete="off" readonly="readonly" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">成&emsp;&emsp;果</label><div class="layui-input-block" id="sxcgid" style="margin-left:90px;"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">描&emsp;&emsp;述</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_rwms_edit" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item" style="margin-top:10px"><div style="text-align:center"><button type="submit" class="layui-btn" lay-submit="" lay-filter="editmodeltaskinfosubmit" style="width:120px;border-radius:5px;">更新</button><button type="submit" class="layui-btn layui-btn-disabled" lay-submit="" lay-filter="setmodelviewsubmit" id="setmodelviewsubmitid" style="width:120px;border-radius:5px;">设置视角</button></div></div></form></div>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                if (curtileset != null && (curtileset.data.Id == taskdata.Id)) {
                    document.getElementById("setmodelviewsubmitid").className = "layui-btn";
                    document.getElementById("setmodelviewsubmitid").style = "width:120px;border-radius:5px;";
                    document.getElementById("setmodelviewsubmitid").disabled = false;
                }
                else {
                    document.getElementById("setmodelviewsubmitid").className = "layui-btn layui-btn-disabled";
                    document.getElementById("setmodelviewsubmitid").style = "width:120px;border-radius:5px;";
                    document.getElementById("setmodelviewsubmitid").disabled = true;
                }

                EditModelTaskHelper();

                //更新
                form.on('submit(editmodeltaskinfosubmit)', function (data) {
                    //成果
                    var modeldatas = [];
                    $('input[name=model_sxcg_edit]:checked').each(function () {
                        modeldatas.push($(this).val());
                    });

                    if (modeldatas.indexOf("0") == -1) {
                        layer.msg("3DTiles为必选数据。", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }
                    else {
                        loadlayerindex = layer.load(1, { shade: [0.5, '#393D49'] });
                        data.field.cookie = document.cookie;
                        data.field.id = taskdata.Id;
                        data.field.model_sxcg_edit = modeldatas.toString();

                        $.ajax({
                            url: servicesurl + "/api/ModelTask/UpdateTask", type: "put", data: data.field,
                            success: function (result) {
                                CloseLayer(loadlayerindex);
                                var info = JSON.parse(result);
                                if (info.code == 1) {
                                    var modeldata = JSON.parse(info.data);

                                    for (var i in modelprojectlistarea) {
                                        for (var j in modelprojectlistarea[i].children) {
                                            for (var k in modelprojectlistarea[i].children[j].children) {
                                                if (modelprojectlistarea[i].children[j].children[k].id == modeldata.Id) {
                                                    modelprojectlistarea[i].children[j].children[k].title = modeldata.RWMC;
                                                    modelprojectlistarea[i].children[j].children[k].data = modeldata;
                                                    break;
                                                }
                                            }
                                        }
                                    }

                                    for (var i in modelprojectlistyear) {
                                        for (var j in modelprojectlistyear[i].children) {
                                            for (var k in modelprojectlistyear[i].children[j].children) {
                                                if (modelprojectlistyear[i].children[j].children[k].id == modeldata.Id) {
                                                    modelprojectlistyear[i].children[j].children[k].title = modeldata.RWMC;
                                                    modelprojectlistyear[i].children[j].children[k].data = modeldata;
                                                    break;
                                                }
                                            }
                                        }
                                    }

                                    isReloadTree = true;//标记重载
                                    MarkCurrentProject();
                                    isReloadTree = false;//重载后还原

                                    layer.close(modeltaskinfoeditlayerindex);
                                }

                                layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            }, datatype: "json"
                        });
                    }

                    return false;
                });

                //设置视角
                form.on('submit(setmodelviewsubmit)', function (data) {
                    loadlayerindex = layer.load(1, { shade: [0.5, '#393D49'] });
                    data.field.cookie = document.cookie;
                    data.field.id = taskdata.Id;
                    data.field.mxsj = JSON.stringify(GetView());

                    $.ajax({
                        url: servicesurl + "/api/ModelTask/UpdateModelView", type: "put", data: data.field,
                        success: function (result) {
                            CloseLayer(loadlayerindex);
                            var info = JSON.parse(result);
                            if (info.code == 1) {
                                var modeldata = JSON.parse(info.data);

                                for (var i in modelprojectlistarea) {
                                    for (var j in modelprojectlistarea[i].children) {
                                        for (var k in modelprojectlistarea[i].children[j].children) {
                                            if (modelprojectlistarea[i].children[j].children[k].id == modeldata.Id) {
                                                modelprojectlistarea[i].children[j].children[k].data = modeldata;
                                                break;
                                            }
                                        }
                                    }
                                }

                                for (var i in modelprojectlistyear) {
                                    for (var j in modelprojectlistyear[i].children) {
                                        for (var k in modelprojectlistyear[i].children[j].children) {
                                            if (modelprojectlistyear[i].children[j].children[k].id == modeldata.Id) {
                                                modelprojectlistyear[i].children[j].children[k].data = modeldata;
                                                break;
                                            }
                                        }
                                    }
                                }

                                isReloadTree = true;//标记重载
                                MarkCurrentProject();
                                isReloadTree = false;//重载后还原

                                curtileset.data = modeldata;
                            }

                            layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }, datatype: "json"
                    });

                    return false;
                });
            }
            , end: function () {
                modeltaskinfoeditlayerindex = null;
            }
        });
    }

    //赋值
    function EditModelTaskHelper() {
        form.val("editmodeltaskinfoform", {
            "model_rwmc_edit": taskdata.RWMC
            , "model_rwbm_edit": taskdata.RWBM
            , "model_yxcjsj_edit": taskdata.YXCJSJ
            , "model_yxcjry_edit": taskdata.YXCJRY
            , "model_yxsl_edit": taskdata.YXSL
            , "model_yxcflj_edit": taskdata.YXCFLJ
            , "model_yxkzd_edit": taskdata.YXKZD
            , "model_yxpos_edit": taskdata.YXPOS
            , "model_gcyc_edit": taskdata.GCYC
            , "model_rwms_edit": taskdata.RWMS
        });

        document.getElementById("yxcjsbid").innerHTML = '<option value="">请选择</option>';
        document.getElementById("kjckid").innerHTML = '<option value="">请选择</option>';
        document.getElementById("gcxtid").innerHTML = '<option value="">请选择</option>';
        document.getElementById("mxdjid").innerHTML = '<option value="">请选择</option>';
        document.getElementById("sxcgid").innerHTML = "";

        //采集设备
        if (rwxjs.length > 0) {
            for (var i in rwxjs) {
                if (rwxjs[i].value == taskdata.YXCJSB) {
                    document.getElementById("yxcjsbid").innerHTML += '<option value="' + rwxjs[i].value + '" selected>' + rwxjs[i].name + '</option>';
                }
                else {
                    document.getElementById("yxcjsbid").innerHTML += '<option value="' + rwxjs[i].value + '">' + rwxjs[i].name + '</option>';
                }
            }
        }
        //空间参考
        if (srids.length > 0) {
            for (var i in srids) {
                if (srids[i].value == taskdata.SRID) {
                    document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '" selected>' + srids[i].name + '</option>';
                }
                else {
                    document.getElementById("kjckid").innerHTML += '<option value="' + srids[i].value + '">' + srids[i].name + '</option>';
                }
            }
        }
        //高程系统
        if (gcxts.length > 0) {
            for (var i in gcxts) {
                if (gcxts[i].value == taskdata.GCXT) {
                    document.getElementById("gcxtid").innerHTML += '<option value="' + gcxts[i].value + '" selected>' + gcxts[i].name + '</option>';
                }
                else {
                    document.getElementById("gcxtid").innerHTML += '<option value="' + gcxts[i].value + '">' + gcxts[i].name + '</option>';
                }
            }
        }
        //模型等级
        if (mxdjs.length > 0) {
            for (var i in mxdjs) {
                if (mxdjs[i].value == taskdata.MXDJ) {
                    document.getElementById("mxdjid").innerHTML += '<option value="' + mxdjs[i].value + '" selected>' + mxdjs[i].name + '</option>';
                }
                else {
                    document.getElementById("mxdjid").innerHTML += '<option value="' + mxdjs[i].value + '">' + mxdjs[i].name + '</option>';
                }
            }
        }
        //生产状态
        if (rwzts.length > 0) {
            for (var i in rwzts) {
                if (rwzts[i].value == taskdata.RWZT) {
                    form.val("editmodeltaskinfoform", {
                        "model_rwzt_edit": rwzts[i].name
                    });
                }
            }
        }

        //成果
        if (rwcps.length > 0) {
            var Sxcg = taskdata.SXCG.trim();
            for (var i in rwcps) {
                if (Sxcg.includes(rwcps[i].value)) {
                    document.getElementById("sxcgid").innerHTML += '<input name="model_sxcg_edit" value="' + rwcps[i].value + '"' + 'type="checkbox" title="' + rwcps[i].name + '" checked="">';
                }
                else {
                    document.getElementById("sxcgid").innerHTML += '<input name="model_sxcg_edit" value="' + rwcps[i].value + '"' + 'type="checkbox" title="' + rwcps[i].name + '">';
                }
            }
        }
        //渲染时间
        date.render({
            elem: '#yxcjsjid'
        });

        form.render();
        form.render('select');
    };
};

//删除模型
function DeleteModelTask(taskid) {
    $.ajax({
        url: servicesurl + "/api/ModelTask/DeleteTask", type: "delete", data: { "id": taskid, "cookie": document.cookie },
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == 1) {
                //清除模型
                if (curtileset != null) {
                    if (currentmodelid == taskid) {
                        viewer.scene.primitives.remove(curtileset);
                        curtileset = null;
                        currentmodelid = null;
                    }
                }

                for (var i in modelprojectlistarea) {
                    for (var j in modelprojectlistarea[i].children) {
                        var childs = [];
                        for (var k in modelprojectlistarea[i].children[j].children) {
                            if (modelprojectlistarea[i].children[j].children[k].id != taskid) {
                                childs.push(modelprojectlistarea[i].children[j].children[k]);
                            }
                        }

                        modelprojectlistarea[i].children[j].children = childs;
                    }
                }

                for (var i in modelprojectlistyear) {
                    for (var j in modelprojectlistyear[i].children) {
                        var childs = [];
                        for (var k in modelprojectlistyear[i].children[j].children) {
                            if (modelprojectlistyear[i].children[j].children[k].id != taskid) {
                                childs.push(modelprojectlistyear[i].children[j].children[k]);
                            }
                        }

                        modelprojectlistyear[i].children[j].children = childs;
                    }
                }
            }

            isReloadTree = true;//标记重载
            MarkCurrentProject();
            isReloadTree = false;//重载后还原

            layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }, datatype: "json"
    });
};

//处理任务
function ProcessModelTask(taskdata) {
    if (modeltaskinfoprocesslayerindex != null) {
        ProcessModelTaskHelper();
    }
    else {
        modeltaskinfoprocesslayerindex = layer.open({
            type: 1
            , title: ['处理模型', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
            , area: ['700px', '610px']
            , shade: 0
            , offset: 'auto'
            , maxmin: true
            , closeBtn: 1
            , moveOut: true
            , resize: false
            , content: '<!--处理模型--><form class="layui-form" style="margin-top:5px;margin-right:10px;" lay-filter="processmodeltaskinfoform"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">模型名称</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_rwmc_process" autocomplete="off" readonly="readonly" class="layui-input" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">模型编码</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_rwbm_process" autocomplete="off" readonly="readonly" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">采集时间</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_yxcjsj_process" readonly="readonly" class="layui-input" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">采集设备</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_yxcjsb_process" readonly="readonly" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">采集人员</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_yxcjry_process" readonly="readonly" class="layui-input" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">影像数量</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_yxsl_process" readonly="readonly" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">影像地址</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_yxcflj_process" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">像&ensp;控&ensp;点</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="model_yxkzd_process" class="layui-textarea" rows="5" style="resize:none" autocomplete="off" readonly="readonly"></textarea></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">影像pos</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="model_yxpos_process" class="layui-textarea" rows="5" style="resize:none" autocomplete="off" readonly="readonly"></textarea></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">坐标系统</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_kjck_process" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">高程系统</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_gcxt_process" readonly="readonly" class="layui-input" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">高程异常</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_gcyc_process" readonly="readonly" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">模型等级</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_mxdj_process" readonly="readonly" class="layui-input" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:60px;">生产状态</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_rwzt_process" readonly="readonly" class="layui-input" /></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">成&emsp;&emsp;果</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_sxcg_process" readonly="readonly" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">描&emsp;&emsp;述</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="model_rwms_process" readonly="readonly" class="layui-input"></div></div><div class="layui-form-item" style="margin-top:10px"><div style="text-align:center"><button type="submit" class="layui-btn" lay-submit="" lay-filter="processmodeltaskinfosubmit" style="width:120px;border-radius:5px;">确认处理</button></div></div></form>'
            , zIndex: layer.zIndex
            , success: function (layero) {
                layer.setTop(layero);

                ProcessModelTaskHelper();

                //处理
                form.on('submit(processmodeltaskinfosubmit)', function (data) {
                    loadlayerindex = layer.load(1, { shade: [0.5, '#393D49'] });
                    data.field.cookie = document.cookie;
                    data.field.id = taskdata.Id;

                    $.ajax({
                        url: servicesurl + "/api/ModelTask/ProcessTask", type: "put", data: data.field,
                        success: function (result) {
                            CloseLayer(loadlayerindex);
                            var info = JSON.parse(result);
                            if (info.code == 1) {
                                modeltaskpcount--;
                                modeltaskicount++;

                                document.getElementById('task-p-count').innerText = modeltaskpcount;
                                document.getElementById('task-i-count').innerText = modeltaskicount;

                                if (modeltaskpcount > 0) {
                                    $("#task_count").text(modeltaskpcount);
                                }
                                else {
                                    $("#task_count").hide();
                                    $("#task_count").text('');
                                }

                                var modeltask = JSON.parse(info.data);
                                var taskinfo = new Object;
                                taskinfo.id = modeltask.Id;
                                taskinfo.rwbm = modeltask.RWBM;
                                taskinfo.rwmc = modeltask.RWMC;
                                taskinfo.yxcjry = modeltask.YXCJRY;
                                taskinfo.yxcjsj = modeltask.YXCJSJ;
                                taskinfo.data = modeltask;
                                taskinfo.rwzt = "处理中";

                                var newmodeltaskp = [];
                                for (var i in modeltaskp) {
                                    if (modeltaskp[i].id != modeltask.Id) {
                                        newmodeltaskp.push(modeltaskp[i]);
                                    }
                                }
                                modeltaskp = newmodeltaskp;
                                modeltaskdatatablep.reload({ id: 'modeltasktablepid', data: modeltaskp });

                                var newmodeltaski = [];
                                newmodeltaski.push(taskinfo);
                                for (var i in modeltaski) {
                                    newmodeltaski.push(modeltaski[i]);
                                }
                                modeltaski = newmodeltaski;

                                layer.close(modeltaskinfoprocesslayerindex);
                            }

                            layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }, datatype: "json"
                    });

                    return false;
                });
            }
            , end: function () {
                modeltaskinfoprocesslayerindex = null;
            }
        });
    }

    //赋值
    function ProcessModelTaskHelper() {
        form.val("processmodeltaskinfoform", {
            "model_rwmc_process": taskdata.RWMC
            , "model_rwbm_process": taskdata.RWBM
            , "model_yxcjsj_process": taskdata.YXCJSJ
            , "model_yxcjry_process": taskdata.YXCJRY
            , "model_yxsl_process": taskdata.YXSL
            , "model_yxcflj_process": taskdata.YXCFLJ
            , "model_yxkzd_process": taskdata.YXKZD
            , "model_yxpos_process": taskdata.YXPOS
            , "model_gcyc_process": taskdata.GCYC
            , "model_rwms_process": taskdata.RWMS
        });

        //采集设备
        if (rwxjs.length > 0) {
            for (var i in rwxjs) {
                if (rwxjs[i].value == taskdata.YXCJSB) {
                    form.val("processmodeltaskinfoform", {
                        "model_yxcjsb_process": rwxjs[i].name
                    });
                }
            }
        }
        //空间参考
        if (srids.length > 0) {
            for (var i in srids) {
                if (srids[i].value == taskdata.SRID) {
                    form.val("processmodeltaskinfoform", {
                        "model_kjck_process": srids[i].name
                    });
                }
            }
        }
        //高程系统
        if (gcxts.length > 0) {
            for (var i in gcxts) {
                if (gcxts[i].value == taskdata.GCXT) {
                    form.val("processmodeltaskinfoform", {
                        "model_gcxt_process": gcxts[i].name
                    });
                }
            }
        }
        //模型等级
        if (mxdjs.length > 0) {
            for (var i in mxdjs) {
                if (mxdjs[i].value == taskdata.MXDJ) {
                    form.val("processmodeltaskinfoform", {
                        "model_mxdj_process": mxdjs[i].name
                    });
                }
            }
        }
        //生产状态
        if (rwzts.length > 0) {
            for (var i in rwzts) {
                if (rwzts[i].value == taskdata.RWZT) {
                    form.val("processmodeltaskinfoform", {
                        "model_rwzt_process": rwzts[i].name
                    });
                }
            }
        }
        //成果
        if (rwcps.length > 0) {
            var Sxcg = taskdata.SXCG.trim().split(",");
            var sxcgdata = "";
            for (var i in Sxcg) {
                for (var j in rwcps) {
                    if (rwcps[j].value == Sxcg[i]) {
                        sxcgdata += rwcps[j].name + "；";
                    }
                }
            }
            form.val("processmodeltaskinfoform", {
                "model_sxcg_process": sxcgdata
            });
        }
    };
};