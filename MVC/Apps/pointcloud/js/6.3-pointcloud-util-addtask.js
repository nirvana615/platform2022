
function addPointCloudTask(currentprojectid) {
    if (currentprojectid == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        if ((utiladdtasklayerindex != null) || (utiladdtasklayerindex != undefined)) {
            layer.close(utiladdtasklayerindex);
        }
    } else {
        if (utiladdtasklayerindex == null) {
            utiladdtasklayerindex = layer.open({
                type: 1
                , title: ['新建任务', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['1000px', '800px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content:'<!--新建任务--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px;">    <ul class="layui-tab-title">        <li class="layui-this" style="width:97%;padding-top: 0px;">任务设置</li>    </ul>    <div class="layui-tab-content">        <!--任务置-->        <div class="layui-tab-item layui-show">            <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBriefitem" style="margin:0px;">                <ul class="layui-tab-title" style="float: left;width:120px;border-color:white;">                    <li class="layui-this" style="display: block;">基本信息</li>                    <li style="display: block;">点云配准</li>                    <li style="display: block;">参考点云</li>                    <li style="display: block;">目标点云</li>                    <li style="display: block;">完成设置</li>                </ul>                <div class="layui-tab-content" style="height: 690px;width:840px;float: left;border-left:solid;border-left-color:#e6e6e6;border-left-width:1px;">                    <!--基本信息-->                    <div class="layui-tab-item layui-show">                        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">                            <legend>基本信息</legend>                        </fieldset>                        <form class="layui-form" action="" lay-filter="addtaskinfoform">                            <div class="layui-form-item">                                <div class="layui-row">                                    <label class="layui-form-label" style="margin-top:10px">项目</label>                                    <div class="layui-input-block">                                        <input type="text" id="taskxmmc" name="taskxmmc" class="layui-input" readonly="readonly" />                                    </div>                                </div>                            </div>                            <div class="layui-form-item">                                <div class="layui-col-md6">                                    <div class="grid-demo">                                        <label class="layui-form-label">项目区域</label>                                        <div class="layui-input-block">                                            <select id="taskregionid" name="taskregion" lay-filter="regionidfilter">                                                <option value="">请选择</option>                                            </select>                                        </div>                                    </div>                                </div>                                <div class="layui-col-md6">                                    <div class="grid-demo grid-demo-bg1">                                        <div class="layui-inline">                                            <label class="layui-form-label">创建时间</label>                                            <div class="layui-input-inline">                                                <input type="text" id="taskcjsjid" name="taskcjsj" lay-verify="date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" />                                            </div>                                        </div>                                    </div>                                </div>                            </div>                            <div class="layui-form-item">                                <label class="layui-form-label">备注</label>                                <div class="layui-input-block">                                    <input type="text"  id="bzid" name="bz" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </form>                    </div>                    <!--点云配准-->                    <div class="layui-tab-item">                        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">                            <legend>点云配准</legend>                        </fieldset>                        <form class="layui-form" action="" lay-filter="registrationway" style="margin-top:5px;">                            <div class="layui-row">                                <div class="layui-col-xs6">                                    <div class="grid-demo grid-demo-bg1">                                        <label class="layui-form-label" style="width:60px;">配准方式</label>                                        <div class="layui-input-inline" style="width:200px;">                                            <select id="registration_way" name="registration_way" lay-verify="required" lay-filter="registration_way">                                                <option value="">请选择</option>                                                <option value="0">手动配准</option>                                                <option value="1">自动配准</option>                                            </select>                                        </div>                                    </div>                                </div>                            </div>                        </form>                        <table id="add-registration-points-table" lay-filter="add-registration-points-table" style="margin-top:10px;"></table>                        <script type="text/html" id="addregistrationpoints">                            <div class="layui-btn-container">                                <button class="layui-btn layui-btn-sm layui-btn-blue" style="font-size:14px" lay-event="addregistrationpoints">添加配准对</button>                            </div>                        </script>                        <script type="text/html" id="table-toolbar-addregistrationpoints">                            <a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="registrationpointsview"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a>                            <a class="layui-btn layui-bg-blue layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="registrationpointsedit"><i class="layui-icon layui-icon-edit" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a>                            <a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="registrationpointsdel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a>                        </script>                    </div>                    <!--参考点云-->                    <div class="layui-tab-item">                        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">                            <legend>参考点云</legend>                        </fieldset>                        <table id="select-source-pointcloud-table" lay-filter="select-source-pointcloud-table" style="margin-top:10px;"></table>                        <script type="text/html" id="checkSourceData">                            <div class="layui-btn-container">                                <button class="layui-btn layui-btn-sm layui-btn-blue" lay-event="getCheckSourceData">确认所选参考点云</button>                            </div>                        </script>                    </div>                    <!--目标点云-->                    <div class="layui-tab-item">                        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">                            <legend>目标点云</legend>                        </fieldset>                        <table id="select-target-pointcloud-table" lay-filter="select-target-pointcloud-table" style="margin-top:10px;"></table>                        <script type="text/html" id="checkTargetData">                            <div class="layui-btn-container">                                <button class="layui-btn layui-btn-sm layui-btn-blue" lay-event="getCheckTargetData">确认所选目标点云</button>                            </div>                        </script>                    </div>                    <!--完成-->                    <div class="layui-tab-item">                        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">                            <legend>完成设置</legend>                        </fieldset>                        <div class="layui-form-item" style="margin-top:10px">                            <div style="position:absolute;left:150px;">                                <button type="submit" class="layui-btn layui-btn-primary layui-border-green" lay-submit="" lay-filter="editpointcloudprojectinfosave" style="width:120px">保存</button>                                <button type="submit"style="position:absolute;left:150px;width:120px" class="layui-btn" lay-submit="" lay-filter="editpointcloudprojectinfosubmit">提交</button>                            </div>                        </div>                    </div>                </div>            </div>        </div>    </div></div>'
                , zIndex: layer.zIndex
                , success: function (layero) {

                    //将项目区域添加到下拉框中
                    $.ajax({
                        url: servicesurl + "/api/PointCloudParameter/GetPointCloudRegion",
                        type: "get",
                        dataType: 'json',
                        data: { "projectid": currentprojectid },
                        success: function (data) {
                            var regionlist = JSON.parse(data);
                            if (regionlist.length > 0) {
                                for (var i in regionlist) {
                                    document.getElementById("taskregionid").innerHTML += '<option value="' + regionlist[i].Id + '">' + regionlist[i].RegionName + '</option>';
                                }
                            }
                            layui.form.render("select");//重新渲染 固定写法
                        }
                    });

                    //渲染创建时间
                    date.render({
                        elem: '#taskcjsjid'
                    });
                    //渲染项目名称
                    for (var i = 0; i < layers.length; i++) {
                        if (layers[i].id == currentprojectid) {
                            form.val("addtaskinfoform", {
                                "taskxmmc": layers[i].title
                            })
                        }
                    }

                    //配准点表格数据
                    var addregistrationpointstabledata = [];
                    var addregistrationpointstable = table.render({
                        elem: '#add-registration-points-table'
                        , id: 'add-registration-points-table-id'
                        , title: '配准点对'
                        , skin: 'line'
                        , even: false
                        , page: {
                            layout: ['prev', 'page', 'next', 'count']
                        }
                        , limit: 10
                        , height: 500
                        , toolbar: '#addregistrationpoints'
                        , defaultToolbar: ['del']
                        , totalRow: false
                        , cols: [[
                            { field: 'id', title: '序号', width: 100, align: "center" }
                            , { field: 'source_x', title: 'X1', width: 100, align: "center" }
                            , { field: 'source_y', title: 'Y1', width: 100, align: "center" }
                            , { field: 'source_y', title: 'Z1', width: 100, align: "center" }
                            , { field: 'align_x', title: 'X2', width: 100, align: "center" }
                            , { field: 'align_y', title: 'Y2', width: 100, align: "center" }
                            , { field: 'source_z', title: 'Z2', width: 100, align: "center" }
                            , { fixed: 'right', width: 140, align: 'center', toolbar: '#table-toolbar-addregistrationpoints' }
                        ]]
                        , data: addregistrationpointstabledata
                    });

                    //配准方法id
                    var registrationpointswayid = "";
                    //选择配准方法
                    form.on('select(registration_way)', function (data) {
                        if (data.value == "") {
                            registrationpointswayid = "";
                        }
                        else {
                            registrationpointswayid = data.value;
                        }
                    });
                    var regionid = "";
                    //选择项目区域
                    form.on('select(regionidfilter)', function (data) {
                        console.log(data);
                        if (data.value == "") {
                            regionid = "";
                        }
                        else {
                            regionid = data.value;
                            select_pointcloud_tabledata = getSelectpointcloud(currentprojectid, regionid);
                            select_target_pointcloud_table.reload({ id: 'select-target-pointcloud-tableid', data: select_pointcloud_tabledata });
                            select_source_pointcloud_table.reload({ id: 'select-source-pointcloud-tableid', data: select_pointcloud_tabledata });
                        }
                    });
                    //添加配准点
                    table.on('toolbar(add-registration-points-table)', function (obj) {
                        switch (obj.event) {
                            case 'addregistrationpoints':
                                if (registrationpointswayid == "") {
                                    layer.msg('请先选择配准方式！', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                }
                                else if (registrationpointswayid == "0"){
                                    var addregistrationpointsindex = layer.open({
                                        type: 1
                                        , title: ['添加配准点', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                        , area: ['600px', '420px']
                                        , shade: 0
                                        , skin: 'line' //行边框风格
                                        , offset: 'auto'
                                        , closeBtn: 1
                                        , maxmin: false
                                        , moveOut: true
                                        , content:'<!--添加配准点--><form class="layui-form" action="" lay-filter="warningmodelcriterion-form-blue-add" style="margin-top:10px;margin-right:10px;">	<fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">		<legend>参考点</legend>	</fieldset>	<div class="layui-form-item" style="margin-left:10px">		<div class="layui-row">			<div class="layui-col-xs6">				<div class="grid-demo grid-demo-bg1">					<label class="layui-form-label">X1</label>					<div class="layui-input-block">						<input type="text" id ="source_x1" name="source_x1" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />					</div>				</div>			</div>			<div class="layui-col-xs6">				<div class="grid-demo">					<label class="layui-form-label">Y1</label>					<div class="layui-input-block">						<input type="text" id ="source_y1" name="source_y1" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />					</div>				</div>			</div>		</div>	</div>	<div class="layui-form-item" style="margin-left:10px">		<div class="layui-row">			<div class="layui-col-xs6">				<div class="grid-demo grid-demo-bg1">					<label class="layui-form-label">Z1</label>					<div class="layui-input-block">						<input type="text" id ="source_z1" name="source_z1" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />					</div>				</div>			</div>		</div>	</div>	<fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">		<legend>配准点</legend>	</fieldset>	<div class="layui-form-item" style="margin-left:10px">		<div class="layui-row">			<div class="layui-col-xs6">				<div class="grid-demo grid-demo-bg1">					<label class="layui-form-label">X1</label>					<div class="layui-input-block">						<input type="text" id ="align_x1" name="align_x1" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />					</div>				</div>			</div>			<div class="layui-col-xs6">				<div class="grid-demo">					<label class="layui-form-label">Y1</label>					<div class="layui-input-block">						<input type="text"id ="align_y1" name="align_y1" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />					</div>				</div>			</div>		</div>	</div>	<div class="layui-form-item" style="margin-left:10px">		<div class="layui-row">			<div class="layui-col-xs6">				<div class="grid-demo grid-demo-bg1">					<label class="layui-form-label">Z1</label>					<div class="layui-input-block">						<input type="text"id ="align_z1" name="align_z1" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />					</div>				</div>			</div>		</div>	</div>	<div class="layui-form-item" style="margin-bottom:10px">		<div style="position:absolute;right:10px;bottom:10px;">			<button type="submit" class="layui-btn" lay-submit="" lay-filter="addregistrationpoints-confirm" style="width:100px">确认</button>		</div>	</div></form>'
                                        , zIndex: layer.zIndex
                                        , success: function (layero) {
                                            layer.setTop(layero);
                                            form.on('submit(addregistrationpoints-confirm)', function (data) {
                                                var registrationpoints = new Object;
                                                registrationpoints.id = addregistrationpointstabledata.length + 1;
                                                registrationpoints.source_x = data.field.source_x1;
                                                registrationpoints.source_y = data.field.source_y1;
                                                registrationpoints.source_z = data.field.source_z1;
                                                registrationpoints.align_x = data.field.align_x1;
                                                registrationpoints.align_y = data.field.align_y1;
                                                registrationpoints.align_z = data.field.align_z1;
                                                addregistrationpointstabledata.push(registrationpoints);
                                                layer.close(addregistrationpointsindex);
                                                addregistrationpointstable.reload({ id: 'add-registration-points-table-id', data: addregistrationpointstabledata });
                                                return false;
                                            });
                                        }
                                        , end: function () {
                                            addregistrationpointsindex = null;
                                        }
                                    });
                                }
                                break;
                        };
                    });



                    form.render();
                    form.render('select');//渲染选项值

                    var sourcepointcloud = "";
                    //选择参考点云表格
                    var select_pointcloud_tabledata = [];
                    var select_source_pointcloud_table = table.render({
                        elem: '#select-source-pointcloud-table'
                        , id: 'select-source-pointcloud-tableid'
                        , title: '选择参考点云'
                        , even: false
                        , page: {
                            layout: ['prev', 'page', 'next', 'count']
                        }
                        , toolbar: '#checkSourceData'
                        , limit: 10
                        , height: 500
                        , totalRow: false
                        , cols: [[
                            { type: 'radio' }
                            , { field: 'id', title: 'ID', hide: true }
                            , { field: 'order', title: '序号', width: 40, align: "center" }
                            , { field: 'project', title: '项目', width: 180, align: "center" }
                            , { field: 'region', title: '项目区域', width:90, align: "center" }
                            , { field: 'cjsj', title: '创建时间', width: 90, align: "center" }
                            , { field: 'srid', title: '坐标系统', width: 90, align: "center" }
                            , { field: 'number', title: '点云数量', width: 90, align: "center" }
                            , { field: 'bz', title: '备注', width: 210, align: "center" }
                        ]]
                        , data: select_pointcloud_tabledata
                    });
                    //监听选择参考点云工具事件
                    table.on('toolbar(select-source-pointcloud-table)', function (obj) {
                        var checkStatus = table.checkStatus(obj.config.id); //获取选中行状态
                        switch (obj.event) {
                            case 'getCheckSourceData':
                                var data = checkStatus.data;  //获取选中行数据
                                sourcepointcloud = JSON.stringify(data);
                                break;
                        };
                    });


                    var targetpointcloud = "";
                    //选择目标点云表格
                    var select_target_pointcloud_table = table.render({
                        elem: '#select-target-pointcloud-table'
                        , id: 'select-target-pointcloud-tableid'
                        , title: '选择参考点云'
                        , even: false
                        , page: {
                            layout: ['prev', 'page', 'next', 'count']
                        }
                        , toolbar: '#checkTargetData'
                        , limit: 10
                        , height: 500
                        , totalRow: false
                        , cols: [[
                            { type: 'radio' }
                            , { field: 'id', title: 'ID', hide: true }
                            , { field: 'order', title: '序号', width: 40, align: "center" }
                            , { field: 'project', title: '项目', width: 180, align: "center" }
                            , { field: 'region', title: '项目区域', width:90, align: "center" }
                            , { field: 'cjsj', title: '创建时间', width: 90, align: "center" }
                            , { field: 'srid', title: '坐标系统', width: 90, align: "center" }
                            , { field: 'number', title: '点云数量', width: 90, align: "center" }
                            , { field: 'bz', title: '备注', width: 210, align: "center" }
                        ]]
                        , data: select_pointcloud_tabledata
                    });
                    //监听选择目标点云工具事件
                    table.on('toolbar(select-target-pointcloud-table)', function (obj) {
                        var checkStatus = table.checkStatus(obj.config.id); //获取选中行状态
                        switch (obj.event) {
                            case 'getCheckTargetData':
                                var data = checkStatus.data;  //获取选中行数据
                                targetpointcloud = JSON.stringify(data);
                                break;
                        };
                    });
                   //var taskregionid=document.getElementById("taskregionid").value;//根据 Id获得对象中的值
                   //var taskcjsjid = document.getElementById("taskcjsjid").value;
                   // var bz = document.getElementById("bzid").value;
                   // var registration_way = document.getElementById("registration_way").value;

                    //提交
                    form.on('submit(editpointcloudprojectinfosubmit)', function (data) {

                        data.field.cookie = document.cookie;
                        data.field.currentprojectid = currentprojectid;
                        data.field.taskregionid = document.getElementById("taskregionid").value;;
                        data.field.taskcjsjid = document.getElementById("taskcjsjid").value;
                        data.field.bz = document.getElementById("bzid").value;
                        data.field.registration_way = document.getElementById("registration_way").value;
                        data.field.registrationpoints = JSON.stringify(addregistrationpointstabledata);
                        data.field.targetpointcloud = targetpointcloud;
                        data.field.sourcepointcloud = sourcepointcloud;

                        $.ajax({
                            url: servicesurl + "/api/PointCloudTask/GetTaskData", type: "post", data: data.field,
                            success: function (result) {

                                if ((JSON.parse(result).code== 0)) {
                                    //创建失败
                                    layer.msg(JSON.parse(result).message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                }
                                else {
                                    layer.msg("创建任务成功。", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                    //关闭
                                    layer.close(utiladdtasklayerindex);

                                }

                            }, datatype: "json"
                        });


                        return false;
                    });
                }
                , end: function () {
                    //关闭
                    utiladdtasklayerindex = null;
                }

            });
        }
    }
};
//获取新建任务点云表格数据
function getSelectpointcloud(currentprojectid, regionid) {

    var tabledata = [];
    for (var i = 0; i < layerlist.PCloudProjectList.length; i++) {
        if (layerlist.PCloudProjectList[i].Id ==currentprojectid) {
            for (var j = 0; j < layerlist.PCloudProjectList[i].RegionList.length; j++) {
                if (layerlist.PCloudProjectList[i].RegionList[j].Id == regionid) {
                    for (var n = 0; n < layerlist.PCloudProjectList[i].RegionList[j].PCloudDataList.length; n++) {
                        var pointdata = new Object;
                        pointdata.id = layerlist.PCloudProjectList[i].RegionList[j].PCloudDataList[n].Id;
                        pointdata.order = n + 1;
                        pointdata.project = layerlist.PCloudProjectList[i].XMMC;
                        pointdata.region = layerlist.PCloudProjectList[i].RegionList[j].RegionName;
                        pointdata.cjsj = layerlist.PCloudProjectList[i].RegionList[j].PCloudDataList[n].CJSJ;
                        pointdata.srid = layerlist.PCloudProjectList[i].RegionList[j].PCloudDataList[n].SRID;
                        pointdata.number = layerlist.PCloudProjectList[i].RegionList[j].PCloudDataList[n].DYSM;
                        pointdata.bz = layerlist.PCloudProjectList[i].RegionList[j].PCloudDataList[n].BZ;
                        tabledata.push(pointdata);
                    }
                }
            }
        
        }
    }
    return tabledata;
}