// 节理查看
var jielicSee = "	<form class='layui-form' style='margin-top:5px;margin-right:25px;' lay-filter='addpointinfoform'>	"
    + "	    <div class='layui-form-item'>	"
    + "	        <div class='layui-row'>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <label class='layui-form-label'>节理名称</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <input type='text' name='name' class='layui-input' readonly='readonly' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo'>	"
    + "	                    <label class='layui-form-label'>平均张开度</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <input type='text' name='avgOpening' class='layui-input' readonly='readonly' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <label class='layui-form-label'>备注</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <input type='text' name='remarks' class='layui-input' readonly='readonly' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	        </div>	"
    + "	    </div>	"
    + "	    <div class='layui-form-item'>	"
    + "	        <div class='layui-row'>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <label class='layui-form-label'>迹长</label><div class='layui-input-block'>	"
    + "	                        <input type='text' name='traceLength' class='layui-input' readonly='readonly' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div><div class='layui-col-md4'>	"
    + "	                <div class='grid-demo'>	"
    + "	                    <label class='layui-form-label'>面积</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <input type='text' name='measure' class='layui-input' readonly='readonly' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <label class='layui-form-label'>采集时间</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <input type='text' name='modleTime' class='layui-input' readonly='readonly' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	        </div>	"
    + "	    </div><div class='layui-form-item'>	"
    + "	        <div class='layui-row'>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <label class='layui-form-label'>素描时间</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <input type='text' name='creatTime' class='layui-input' readonly='readonly' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <label class='layui-form-label'>采集人</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <input type='text' name='collector' class='layui-input' readonly='readonly' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	        </div>	"
    + "	    </div>	"
    + "	</form>	";

//结构面查看
var jiegouimianSee = "	<form class='layui-form' style='margin-top:5px;margin-right:25px;' lay-filter='seepointinfoform'>	"
    + "	    <div class='layui-form-item'>	"
    + "	        <div class='layui-row'>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <label class='layui-form-label'>节理名称</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <input type='text' name='name' class='layui-input' readonly='readonly' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo'>	"
    + "	                    <label class='layui-form-label'>采集人</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <input type='text' name='collector' class='layui-input' readonly='readonly' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <label class='layui-form-label'>备注</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <input type='text' name='remarks' class='layui-input' readonly='readonly' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	        </div>	"
    + "	    </div>	"
    + "	    <div class='layui-form-item'>	"
    + "	        <div class='layui-row'>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <label class='layui-form-label'>倾向</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <input type='text' name='inclination' class='layui-input' readonly='readonly' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo'>	"
    + "	                    <label class='layui-form-label'>倾角</label>	"
    + "	                    <div class='layui-input-block'><input type='text' name='dipAngle' class='layui-input' readonly='readonly' /></div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <label class='layui-form-label'>走向</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <input type='text' name='trend' class='layui-input' readonly='readonly' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	        </div>	"
    + "	    </div>"
    + "	    <div class='layui-form-item'>	"
    + "	        <div class='layui-row'>	"
    + "	 	        <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <label class='layui-form-label'>采集时间</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <input type='text' name='modleTime' class='layui-input' readonly='readonly' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div class='layui-col-md4'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <label class='layui-form-label'>素描时间</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <input type='text' name='creatTime' class='layui-input' readonly='readonly' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	        </div>	"
    + "	    </div>	"
    + "	</form>	";
//节理修改
var jieliupd = "	<form class='layui-form' style='margin-top:5px;margin-right:25px;' lay-filter='updpointinfoform'>	"
    + "	    <div class='layui-form-item' style='margin-top:15px;margin-right:5px;'>	"
    + "	        <div class='layui-row'>	"
    + "	            <div class='layui-col-md6'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <label class='layui-form-label'>名称</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <input type='text' name='name' lay-verify='required' autocomplete='off' placeholder='请输入' class='layui-input' style='width:160px;' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div class='layui-col-md6' style='margin-top:15px;margin-right:5px;'>	"
    + "	                <div class='grid-demo'>	"
    + "	                    <label class='layui-form-label'>平均张开度</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <input type='text' name='avgOpening' lay-verify='required' autocomplete='off' placeholder='请输入' class='layui-input' style='width:160px;' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div class='layui-col-md6' style='margin-top:15px;margin-right:5px;'>	"
    + "	                <div class='grid-demo'>	"
    + "	                    <label class='layui-form-label'>描述</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <input type='text' name='remarks' lay-verify='required' autocomplete='off' placeholder='请输入' class='layui-input' style='width:160px;' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	        </div>	"
    + "	    </div>	"
    + "	    <div class='layui-form-item' style='margin-top:15px'>	"
    + "	        <div style='position:absolute;right:15px;'>	"
    + "	            <button type='reset' class='layui-btn layui-btn-primary' style='width:100px'>重置</button>	"
    + "	            <button type='submit' class='layui-btn' lay-submit='' lay-filter='updpointinfosubmit' style='width:100px'>提交</button>	"
    + "	        </div>	"
    + "	    </div>	"
    + "	</form>	";
//节狗修改
var jiegouupd = "	<form class='layui-form' style='margin-top:5px;margin-right:25px;' lay-filter='updpointinfoform'>	"
    + "	    <div class='layui-form-item' style='margin-top:15px;margin-right:5px;'>	"
    + "	        <div class='layui-row'>	"
    + "	            <div class='layui-col-md6'>	"
    + "	                <div class='grid-demo grid-demo-bg1'>	"
    + "	                    <label class='layui-form-label'>名称</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <input type='text' name='name' lay-verify='required' autocomplete='off' placeholder='请输入' class='layui-input' style='width:160px;' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	            <div class='layui-col-md6' style='margin-top:15px;margin-right:5px;'>	"
    + "	                <div class='grid-demo'>	"
    + "	                    <label class='layui-form-label'>描述</label>	"
    + "	                    <div class='layui-input-block'>	"
    + "	                        <input type='text' name='remarks' lay-verify='required' autocomplete='off' placeholder='请输入' class='layui-input' style='width:160px;' />	"
    + "	                    </div>	"
    + "	                </div>	"
    + "	            </div>	"
    + "	        </div>	"
    + "	    </div>	"
    + "	    <div class='layui-form-item' style='margin-top:15px'>	"
    + "	        <div style='position:absolute;right:15px;'>	"
    + "	            <button type='reset' class='layui-btn layui-btn-primary' style='width:100px'>重置</button>	"
    + "	            <button type='submit' class='layui-btn' lay-submit='' lay-filter='updpointinfosubmit' style='width:100px'>提交</button>	"
    + "	        </div>	"
    + "	    </div>	"
    + "	</form>	";

//查看点信息
var drwInfox = null;
var sanweiinfoeditlayerindex = null;
var modeledittable = null;
var modeltabledata = [];
var usemodelids = [];
function DrwInfo(data,flag) {
   
    console.log(data);
    if (flag == "view") {
        if (data.data.type == "FLZPOINT" && data.data.id != undefined) {
          drwInfox = layer.open({
                type: 1
                , title: ['点信息查看', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['300px', '400px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<form class="layui-form" style="margin-top:5px;margin-right:25px;" lay-filter="addpointinfoform"><div class="layui-form-item" style="margin-top:15px;margin-right:5px;"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">点名称</label><div class="layui-input-block"><input type="text" name="name" lay-verify="required" autocomplete="off" readonly="readonly" class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">经度</label><div class="layui-input-block"><input type="text" name="ls" lay-verify="required" autocomplete="off" readonly="readonly"  class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">纬度</label><div class="layui-input-block"><input type="text" name="bs" lay-verify="required" autocomplete="off" readonly="readonly"  class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">高程</label><div class="layui-input-block"><input type="text" name="hs" lay-verify="required" autocomplete="off" readonly="readonly"  class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">描述</label><div class="layui-input-block"><input type="text" name="remarks" lay-verify="required" autocomplete="off" readonly="readonly"  class="layui-input" style="width:160px;"  /></div></div></div></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    var cartesian3 = Cesium.Cartographic.fromCartesian(data.data.postion);                        //笛卡尔XYZ
                    var longitude = Cesium.Math.toDegrees(cartesian3.longitude);                         //经度
                    var latitude = Cesium.Math.toDegrees(cartesian3.latitude);                           //纬度
                    var height = cartesian3.height;
                    form.val("addpointinfoform", {
                        "name": data.data.title
                        , "remarks": data.data.remarks
                        , "ls": longitude.toFixed(6)
                        , "bs": latitude.toFixed(6)
                        , "hs": height.toFixed(2)
                    });


                    //展示项目设备总览

                }
                , end: function () {

                }
            });
        } else if (data.data.type == "FLZWINDOW") {
            drwInfox = layer.open({
                type: 1
                , title: ['测窗信息查看', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['300px', '350px']
                , shade: 0.3
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<form class="layui-form" style="margin-top:5px;margin-right:25px;" lay-filter="addpointinfoform"><div class="layui-form-item" style="margin-top:15px;margin-right:5px;"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">测窗名称</label><div class="layui-input-block"><input type="text" name="name" lay-verify="required" autocomplete="off" readonly="readonly" class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">新建时间</label><div class="layui-input-block"><input type="text" name="creatTime" lay-verify="required" autocomplete="off" readonly="readonly"  class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">测窗大小</label><div class="layui-input-block"><input type="text" name="sideLength" lay-verify="required" autocomplete="off" readonly="readonly"  class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">备注</label><div class="layui-input-block"><input type="text" name="remarks" lay-verify="required" autocomplete="off" readonly="readonly"  class="layui-input" style="width:160px;"  /></div></div></div></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    form.val("addpointinfoform", {
                          "name": data.data.title
                        , "remarks": data.data.datas.remarks
                        , "creatTime": data.data.datas.creatTime
                        , "sideLength": data.data.datas.sideLength + "*" + data.data.datas.sidebLength
                    });


                    //展示项目设备总览

                }
                , end: function () {

                }
            });
        } else if (data.data.type == "FLZJIELI") {
            
            drwInfox = layer.open({
                type: 1
                , title: ['节理信息查看', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['1000px', '300px']
                , shade: 0.3
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
             , content: jielicSee
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    form.val("addpointinfoform", {
                        "avgOpening": data.data.datas.avgOpening,// "3"
                        "creatTime": data.data.datas.creatTime,// "2021-03-23         "
                        "dipAngle": data.data.datas.dipAngle,// "32.62"
                        "inclination": data.data.datas.inclination,// "152.30"
                        "measure": data.data.datas.measure,// "0.095778"
                        "modleTime": data.data.datas.modleTime,// "2021-03-01
                        "name": data.data.datas.name,// "测是3"
                        "remarks": data.data.datas.remarks,// "3233"
                        "traceLength": data.data.datas.traceLength,// "1.29"
                        "trend": data.data.datas.trend,// "122.62"
                        "collector": data.data.datas.collector,// "3"
                    });


                    //展示项目设备总览

                }
                , end: function () {

                }
            });
        } else if (data.data.type == "YOUSHIMIAN") {//优势结构面

            drwInfox = layer.open({
                type: 1
                , title: ['结构面信息查看', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['1000px', '300px']
                , shade: 0.3
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                 , content: jiegouimianSee
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    form.val("seepointinfoform", {
                        "collector": data.data.datas.collector,// "3"
                        "creatTime": data.data.datas.creatTime,// "2021-03-23         "
                        "dipAngle": data.data.datas.dipAngle,// "32.62"
                        "inclination": data.data.datas.inclination,// "152.30"
                        "modleTime": data.data.datas.modleTime,// "2021-03-01
                        "name": data.data.datas.name,// "测是3"
                        "remarks": data.data.datas.remarks,// "3233"
                        "trend": data.data.datas.trend,// "122.62"
                    });


                    //展示项目设备总览

                }
                , end: function () {

                }
            });
        } else if (data.data.type == "DIZHISON") {//地质识别查看
            xiePuoPhotoSee(data.data.datas);
        } else if ((data.data.type == "FLZLINE" || data.data.type == "FLZAREA") && data.data.id != undefined) {
            console.log(data);
            drwInfox = layer.open({
                type: 1
                , title: ['信息查看', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: '700px'
                , shade: 0.3
                , offset: '60px'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<form class="layui-form" style="margin-top:5px;margin-right:25px;" lay-filter="addpointinfoform"><div class="layui-form-item" style="margin-top:15px;margin-right:5px;"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">点名称</label><div class="layui-input-block"><input type="text" name="name" lay-verify="required" autocomplete="off" readonly="readonly" class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">描述</label><div class="layui-input-block"><input type="text" name="remarks" lay-verify="required" autocomplete="off" readonly="readonly"  class="layui-input" style="width:160px;"  /></div></div></div></div></div></form><div><table class="layui-hide" id="postion-view" lay-filter=postion-view"></table></div>'
                // , content: '<div><table class="layui-hide" id="postion-view" lay-filter=postion-view"></table></div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    form.val("addpointinfoform", {
                        "name": data.data.title
                        , "remarks": data.data.remarks
                    });
                    //展示项目设备总览

                }
                , end: function () {

                }
            });
        }

        var postionviewtable = table.render({
            elem: '#postion-view'
            , id: 'postionviewid'
            , title: '点位信息'
            , skin: 'line'
            , even: false
            , toolbar: true
            , page: {
                layout: ['prev', 'page', 'next', 'count']
            }
            , limit: 14
            // , initSort: { field: 'ls', type: 'asc' }
            , totalRow: false
            , cols: [[
                { field: 'x', title: 'X', align: "center" }
                , { field: 'y', title: 'Y', align: "center" }
                , { field: 'z', title: 'Z', align: "center" }
            ]]
            , data: []
        });
        postionviewtable.reload({ id: 'postionviewid', data: data.data.pointList });
    } else if (flag == "update") {
        if (data.data.type == "FLZWINDOW") {//测窗
            var temptitle = data.data.title;
            drwInfox = layer.open({
                type: 1
                , title: ['确认修改', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                , area: ['300px', '300px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<form class="layui-form" style="margin-top:5px;margin-right:25px;" lay-filter="addpointinfoform"><div class="layui-form-item" style="margin-top:15px;margin-right:5px;"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">名称</label><div class="layui-input-block"><input type="text" name="name" lay-verify="required" autocomplete="off" placeholder="请输入" class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">描述</label><div class="layui-input-block"><input type="text" name="remarks" lay-verify="required" autocomplete="off" placeholder="请输入"  class="layui-input" style="width:160px;"  /></div></div></div></div></div><div class="layui-form-item" style="margin-top:15px"><div style="position:absolute;right:15px;"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="addpointinfosubmit" style="width:100px">提交</button></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);
                    form.render();
                    form.val("addpointinfoform", {
                        "name": data.data.title
                        , "remarks": data.data.datas.remarks
                    });

                    form.on('submit(addpointinfosubmit)', function (temp) {
                        data.data.title = temp.field.name;
                        data.data.remarks = temp.field.remarks;
                        //tree.reload(data.data.id, { data: data.data });

                        temp.field.id = data.data.id.split("_")[1];//把id往后面传
                        temp.field.cookie = document.cookie;
                        console.log(layers);
                        $.ajax({
                            url: servicesurl + "/api/FlzWindowInfo/UpdateFlzWindow", type: "post", data: temp.field,
                            success: function (result) {
                                //创建失败
                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                if ("更新成功" == result) {

                                    for (var i in layers) {
                                        if (layers[i].type == "FLZWINDOWFA") {//测窗的
                                         
                                            for (var j in layers[i].children) {
                                                if (layers[i].children[j].id == data.data.id) {
                                                    layers[i].children[j].title = temp.field.name;
                                                    layers[i].children[j].remarks = temp.field.remarks;
                                                    layers[i].spread = true;
                                                    layers[i].children[j].spread = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    if (cequ != null) {
                                        for (var m in windowtabledata) {
                                            if ((windowtabledata[m].id) == data.data.datas.id) {
                                                windowtabledata[m].name = temp.field.name;
                                                windowtabledata[m].remarks = temp.field.remarks;
                                                break;
                                            }
                                        }
                                        windowtableview.reload({ id: 'windowtableviewid', data: windowtabledata });
                                    }

                                    for (var m in windowInfoList) {
                                        if ((windowInfoList[m].id) == data.data.datas.id) {
                                            windowInfoList[m].name = temp.field.name;
                                            windowInfoList[m].remarks = temp.field.remarks;
                                            break;
                                        }
                                    }


                                    modeljiazaiFlag = false;
                                    tree.reload('prjlayerlistid', { data: layers });
                                    ClearTemp();
                                    //关闭,更改图上显示
                                    if (data.data.checked) {
                                        var entity = viewer.entities.getById(data.data.id + "_LABEL");
                                        console.log(entity);
                                        entity.label.text = entity.label.text._value.replace(temptitle, temp.field.name);
                                    }
                                    var entity = viewer.entities.getById(data.id);
                                    layer.close(drwInfox);
                                }

                            }, datatype: "json"
                        });
                        return false;
                    });

                }
                , end: function () {
                    layer.close(drwInfox);
                }
            });

        } else if (data.data.type == "PROJECTSUMODEL") {
            console.log(data.data);
            if (data.data.checked) {
                layer.confirm('是否更新该模型的最佳视角?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                    //console.log(viewer.camera.position);
                    //console.log(viewer.camera.heading);
                    //console.log(viewer.camera.pitch);
                    //console.log(viewer.camera.roll); 
                    var x = viewer.camera.position;
                    var y1 = {
                        // 指向
                        heading: viewer.camera.heading,
                        // 视角
                        pitch: viewer.camera.pitch,
                        roll: viewer.camera.roll
                    }
                    var home = {
                        destination: x,
                        orientation: y1
                    }
                    console.log(home);
                    layer.close(index);

                    var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                    var data2 = {
                        mxsj: JSON.stringify(home),
                        id: data.data.id.split("_")[1] ,//模型id
                        cookie: document.cookie
                    }

                    $.ajax({
                        url: servicesurl + "/api/ModelTask/UpdateModelView", type: "put", data: data2,
                        success: function (result) {
                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            //刷新项目列表
                            for (var i in layers) {
                                if (layers[i].type == "SANWEI") {
                                    for (var j in layers[i].children) {
                                        if (data.data.id == layers[i].children[j].id) {
                                            layers[i].children[j].modelView = JSON.stringify(home);
                                        }
                                    }
                                }
                            }
                            layer.close(loadingminindex);
                        }, datatype: "json"
                    });
                    
                });
            } else {
                layer.msg("请选择该模型进行最佳视图更新", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                return;
            }
            
        }
        else if (data.data.type == "SANWEI") {
            if (sanweiinfoeditlayerindex == null) {
                sanweiinfoeditlayerindex = layer.open({
                    type: 1
                    , title: ['模型编辑', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                    , area: ['600px', '410px']
                    , shade: 0
                    , offset: 'auto'
                    , closeBtn: 1
                    , maxmin: true
                    , moveOut: true
                    , content: '<!--实景模型--><table id="uav-project-model" lay-filter="uav-project-model"></table><script type="text/html" id="uav-project-model-add"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm" style="font-size:14px;width:150px" lay-event="uav-project-model-add">添加实景模型</button></div></script><script type="text/html" id="table-toolbar-model"><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="modeldel"><i class="layui-icon layui-icon-delete" style="margin-right:20px;font-size:20px!important;color:#666!important;"></i></a></script>'
                   // , content:'20'
                    , zIndex: layer.zIndex
                    , success: function (layero) {
                        layer.setTop(layero);

                    
                        //更新项目
                        form.on('submit(editprojectinfosubmit)', function (data) {
                            data.field.id = id;
                            data.field.cookie = document.cookie;

                            var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                            $.ajax({
                                url: servicesurl + "/api/FLZ/UpdateProject", type: "put", data: data.field,
                                success: function (result) {
                                    layer.close(loadinglayerindex);
                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    console.log(result);
                                    if (result == "更新成功！") {
                                        //关闭
                                        layer.close(sanweiinfoeditlayerindex);

                                        //刷新项目列表
                                        GetUserProjects();
                                    }
                                }, datatype: "json"
                            });
                            return false;
                        });
                        //项目关联模型
                        modeltabledata = [];
                        var uavprojectmodelids = [];
                        for (var i in layers) {
                            if (layers[i].title == "三维实景模型") {
                                for (var j in layers[i].children) {
                                    var model = new Object;
                                    model.id = layers[i].children[j].data.Id;
                                    model.mxmc = layers[i].children[j].data.RWMC;
                                    model.mxbm = layers[i].children[j].data.RWBM;
                                    model.mxsj = layers[i].children[j].data.YXCJSJ;
                                    model.bz = layers[i].children[j].data.BZ;
                                    modeltabledata.push(model);
                                    usemodelids.push(layers[i].children[j].data.Id);
                                    //uavprojectmodelids.push(layers[i].children[j].data.Id);

                                }
                            }
                        }



                           modeledittable = table.render({
                            elem: '#uav-project-model'
                            , id: 'uavprojectmodeltableid'
                            , title: '实景模型'
                            , skin: 'line'
                            , even: false
                            , page: { layout: ['prev', 'page', 'next', 'count'] }
                            , limit: 5
                            , toolbar: '#uav-project-model-add'
                            , totalRow: false
                            , initSort: { field: 'id', type: 'asc' }
                            , cols: [[
                                { field: 'id', title: 'ID', hide: true }
                                , { field: 'mxmc', title: '模型名称', align: "center" }
                                , { field: 'mxbm', title: '模型编码', align: "center" }
                                , { field: 'mxsj', title: '生产时间', align: "center" }
                                , { field: 'bz', title: '备注', align: "center" }
                                , { fixed: 'right', width: 100, align: 'center', toolbar: '#table-toolbar-model' }
                            ]]
                            , data: modeltabledata
                        });

                        //添加实景模型
                        table.on('toolbar(uav-project-model)', function (obj) {
                            switch (obj.event) {
                                case 'uav-project-model-add':
                                    var addmodellayerindex = layer.open({
                                        type: 1
                                        , title: ['添加实景模型', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                        , area: ['450px', '450px']
                                        , shade: 0.5
                                        , offset: 'auto'
                                        , closeBtn: 1
                                        , maxmin: false
                                        , moveOut: true
                                        , content: '<div style="overflow:hidden;"><form class="layui-form" style="margin-top:5px" lay-filter="addmodeluseform"><div class="layui-form-item" style="border-bottom: solid 1px rgb(248,248,248);height:345px;max-height:345px;overflow:auto;"><div id="usemodeltree"></div></div><div class="layui-form-item" style="margin-top:10px"><div class="layui-input-block" style="margin-left:0px;text-align:center;position:relative;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="addmodelusesubmit" style="width:150px">添加</button></div></div></form></div>'
                                        , zIndex: layer.zIndex
                                        , success: function (layero) {
                                            layer.setTop(layero);
                                            //加载中
                                            loadlayerindex = layer.load(1, {
                                                shade: [0.1, '#fff']
                                                , zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); }
                                            });

                                            var nousemodeltreedata = [];
                                            var uavprojectaddmodels = [];//选中模型
                                            //渲染模型树
                                            tree.render({
                                                elem: '#usemodeltree'
                                                , data: []
                                                , id: 'usemodeltreeid'
                                                , showCheckbox: true
                                                , accordion: false
                                                , showLine: true
                                                , cancelNodeFileIcon: true
                                                , text: { none: '无数据' }
                                                , oncheck: function (obj) {
                                                    if (obj.checked) {
                                                        //选中
                                                        if (obj.data.type == "projectnode") {
                                                            //项目节点
                                                            for (var i in obj.data.children) {
                                                                var model = new Object;
                                                                model.projectid = obj.data.id;
                                                                model.modelid = obj.data.children[i].id;
                                                                uavprojectaddmodels.push(model);
                                                            }
                                                        }
                                                        else {
                                                            //模型节点
                                                            var model = new Object;
                                                            for (var i in nousemodeltreedata) {
                                                                for (var j in nousemodeltreedata[i].children) {
                                                                    if (nousemodeltreedata[i].children[j].id == obj.data.id) {
                                                                        model.projectid = nousemodeltreedata[i].id;
                                                                        break;
                                                                    }
                                                                }
                                                            }
                                                            model.modelid = obj.data.id;
                                                            uavprojectaddmodels.push(model);
                                                        }
                                                    }
                                                    else {
                                                        //取消选中
                                                        if (obj.data.type == "projectnode") {
                                                            //项目节点
                                                            var newuavprojectaddmodels = [];

                                                            for (var i in uavprojectaddmodels) {
                                                                if (uavprojectaddmodels[i].projectid != obj.data.id) {
                                                                    newuavprojectaddmodels.push(uavprojectaddmodels[i]);
                                                                }
                                                            }

                                                            uavprojectaddmodels = newuavprojectaddmodels;
                                                        }
                                                        else {
                                                            //模型节点
                                                            var newuavprojectaddmodels = [];

                                                            for (var i in uavprojectaddmodels) {
                                                                if (uavprojectaddmodels[i].modelid != obj.data.id) {
                                                                    newuavprojectaddmodels.push(uavprojectaddmodels[i]);
                                                                }
                                                            }

                                                            uavprojectaddmodels = newuavprojectaddmodels;
                                                        }
                                                    }
                                                }
                                            });

                                            //项目已关联模型id
                                            //var usemodelids = "";
                                            //for (var i in uavprojectmodelids) {
                                            //    usemodelids += uavprojectmodelids[i] + ",";
                                            //}
                                            //if (usemodelids != "" && usemodelids.indexOf(",") != -1) {
                                            //    usemodelids = usemodelids.substring(0, usemodelids.length - 1);
                                            //}
                                            
                                            $.ajax({
                                                url: servicesurl + "/api/ModelProject/GetUserNoUseModelProjectDatas", type: "get", data: { "cookie": document.cookie, "usedmodelid": JSON.stringify(usemodelids) },
                                                success: function (data) {
                                                    layer.close(loadlayerindex);//关闭正在加载
                                                    nousemodeltreedata = [];

                                                    var result = JSON.parse(data);
                                                    if (result.code == 1) {
                                                        var resultdata = JSON.parse(result.data);
                                                        for (var i in resultdata) {
                                                            var project = new Object;
                                                            project.id = resultdata[i].Project.Id;
                                                            project.title = resultdata[i].Project.XMMC;
                                                            project.checked = false;
                                                            project.type = "projectnode";

                                                            var projectchild = [];
                                                            for (var j in resultdata[i].Tasks) {
                                                                var model = new Object;
                                                                model.id = resultdata[i].Tasks[j].Id;
                                                                model.title = resultdata[i].Tasks[j].RWMC;
                                                                model.type = "modelnode";
                                                                model.checked = false;
                                                                model.data = resultdata[i].Tasks[j];
                                                                projectchild.push(model);
                                                            }

                                                            project.children = projectchild;
                                                            nousemodeltreedata.push(project);
                                                        }
                                                    }

                                                    tree.reload('usemodeltreeid', { data: nousemodeltreedata });
                                                    layer.msg(result.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                }, datatype: "json"
                                            });

                                            form.render();
                                            form.render('select');

                                            form.on('submit(addmodelusesubmit)', function (data) {
                                                if (uavprojectaddmodels.length > 0) {
                                                    data.field.useprojectid = currentprojectid;
                                                    data.field.cookie = document.cookie;
                                                    data.field.syscode = 4;
                                                    data.field.modelinfo = JSON.stringify(uavprojectaddmodels);

                                                    $.ajax({
                                                        url: servicesurl + "/api/ModelProject/AddUserModelProjectUse", type: "post", data: data.field,
                                                        success: function (result) {
                                                            var info = JSON.parse(result);
                                                            if (info.code == 1) {
                                                                var newmodelids = JSON.parse(info.data);//已关联成功模型id
                                                                var newmodels = [];//已关联成功模型
                                                                for (var i in newmodelids) {
                                                                    for (var j in nousemodeltreedata) {
                                                                        for (var k in nousemodeltreedata[j].children) {
                                                                            if (newmodelids[i] == nousemodeltreedata[j].children[k].id) {
                                                                                var model = new Object;
                                                                                model.id = nousemodeltreedata[j].children[k].id;
                                                                                model.mxmc = nousemodeltreedata[j].children[k].data.RWMC;
                                                                                model.mxbm = nousemodeltreedata[j].children[k].data.RWBM;
                                                                                model.mxsj = nousemodeltreedata[j].children[k].data.YXCJSJ;
                                                                                model.bz = nousemodeltreedata[j].children[k].data.BZ;
                                                                                model.bz = nousemodeltreedata[j].children[k].data.BZ;
                                                                                model.bz = nousemodeltreedata[j].children[k].data.BZ;
                                                                                modeltabledata.push(model);
                                                                                usemodelids.push(nousemodeltreedata[j].children[k].data.Id);
                                                                                newmodels.push(nousemodeltreedata[j].children[k].data);
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                modeledittable.reload({ id: 'uavprojectmodeltableid', data: modeltabledata });

                                                                var child = [];
                                                                for (var k in newmodels) {
                                                                    var model = new Object;
                                                                    model.id = "PROJECTSUMODELL_" + newmodels[k].Id;
                                                                    model.icon = MODELICON;
                                                                    model.type = "PROJECTSUMODEL";
                                                                    model.title = newmodels[k].RWMC;
                                                                    model.data = newmodels[k];
                                                                    model.showCheckbox = true;
                                                                    model.checked = false;
                                                                    model.spread = true;
                                                                    model.path = newmodels[k].MXLJ;
                                                                    model.gcgz = newmodels[k].GCYC;
                                                                    model.modelView = newmodels[k].MXSJ;
                                                                    child.push(model);
                                                                }
                                                                for (var i in layers) {
                                                                    if (layers[i].type == "SANWEI") {
                                                                        for (var j in layers[i].children) {
                                                                            child.push(layers[i].children[j]);
                                                                        }
                                                                        layers[i].children = child;
                                                                        layers[i].spread = true;
                                                                        break;
                                                                    }
                                                                }
                                                                if (curtileset != null) {//有模型的情况下就不刷新了
                                                                    modeljiazaiFlag = false;
                                                                }// 不刷新的问题是。现在设置的checked为false  当选择模型的时候，树上没有同步更改
                                                               
                                                                tree.reload('prjlayerlistid', { data: layers });
                                                                ClearTemp();
                                                                
                                                            }

                                                            layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                                        }, datatype: "json"
                                                    });

                                                    layer.close(addmodellayerindex);
                                                } else {
                                                    layer.msg("请先勾选需要的实景模型！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                }

                                                return false;
                                            });
                                        }
                                        , end: function () { }
                                    });
                                    break;
                            };
                        });

                        //操作实景模型
                        table.on('tool(uav-project-model)', function (obj) {
                           
                            if (obj.event === 'modeldel') {
                                layer.confirm('是否删除?', { icon: 3, title: '消息', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                                    $.ajax({
                                        url: servicesurl + "/api/ModelProject/CancelUserModelProjectUse", type: "delete", data: { "syscode": 4, "useprojectid": currentprojectid, "modelid": obj.data.id, "cookie": document.cookie },
                                        success: function (result) {
                                            var info = JSON.parse(result);
                                            if (info.code == 1) {

                                                var newmodeltabledata = [];
                                                usemodelids = [];
                                                for (var i in modeltabledata) {
                                                    if (modeltabledata[i].id.toString() != info.data) {
                                                        newmodeltabledata.push(modeltabledata[i]);
                                                        usemodelids.push(modeltabledata[i].id);
                                                    }
                                                }
                                                modeltabledata = newmodeltabledata;
                                                modeledittable.reload({ id: 'uavprojectmodeltableid', data: modeltabledata });

                                                //TODO删除的为选中加载的模型时需从地图的删除
                                                var child = [];

                                                for (var i in layers) {
                                                    if (layers[i].type == "SANWEI") {
                                                        for (var j in layers[i].children) {
                                                            if (layers[i].children[j].id.split("_")[1] != obj.data.id) {
                                                                child.push(layers[i].children[j]);
                                                            } else {
                                                                if (layers[i].children[j].checked) {//选中
                                                                    if (modleInfo.id == layers[i].children[j].id) {
                                                                        viewer.scene.primitives.remove(curtileset);
                                                                        curtileset = null;
                                                                        modleInfo = null;
                                                                    }
                                                                }
                                                            }
                                                            
                                                        }
                                                        layers[i].children = child;
                                                        layers[i].spread = true;
                                                        break;
                                                    }
                                                }
                                                if (curtileset != null) {//有模型的情况下就不刷新了
                                                    modeljiazaiFlag = false;
                                                }// 不刷新的问题是。现在设置的checked为false  当选择模型的时候，树上没有同步更改

                                                tree.reload('prjlayerlistid', { data: layers });
                                                ClearTemp();

                                                
                                            }

                                            layer.msg(info.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        }, datatype: "json"
                                    });

                                    layer.close(index);
                                });
                            }
                        });



                    }
                    , end: function () {
                        sanweiinfoeditlayerindex = null;
                        modeledittable = null;
                        drwInfox = null;
                        modeledittable = null;
                        modeltabledata = [];
                        usemodelids = [];
                    }
                });
            } else {
                layer.msg("已打开添加模型窗口", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }
        }
        else if (data.data.type == "DIZHISON") {//地质修改
            if (data.data.checked) {
                LoadSteepHillindex(data.data.datas);
            } else {
                layer.msg("请选择该地质范围进行识别", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                return;
            }
            
        } else if (data.data.type == "FLZJIELI") {
            updateJieLi(data.data.datas);
        }

        
        else {//最开始的点线面。
            var temptitle = data.data.title;
            if (data.data.type == "YOUSHIMIAN") {//节理信息修改
                updateJieGou(data.data.datas);
            } else if ((data.data.type == "FLZPOINT"||data.data.type == "FLZLINE" || data.data.type == "FLZAREA") && data.data.id != undefined) {//节理信息修改
                drwInfox = layer.open({
                    type: 1
                    , title: ['确认修改', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                    , area: ['300px', '300px']
                    , offset: 'auto'
                    , shade: 0
                    , closeBtn: 1
                    , maxmin: true
                    , moveOut: true
                    , content: jiegouupd
                    , zIndex: layer.zIndex
                    , success: function (layero) {
                        //置顶
                        layer.setTop(layero);
                        form.render();
                        form.val("updpointinfoform", {
                            "name": data.data.title
                            , "remarks": data.data.remarks,
                        });

                        form.on('submit(updpointinfosubmit)', function (temp) {
                            data.data.title = temp.field.name;
                            data.data.remarks = temp.field.remarks;

                            temp.field.id = data.data.id.split("_")[1];//把id往后面传
                            temp.field.cookie = document.cookie;
                            console.log(layers);
                            var loadingjieliindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                            $.ajax({
                                url: servicesurl + "/api/FlzData/UpdateFlzPoint", type: "post", data: temp.field,
                                success: function (result) {
                                    layer.close(loadingjieliindex);
                                    //创建失败
                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                    if ("更新成功" == result) {
                                        for (var m in layers) {
                                            if (layers[m].type == "MODELTAG") {
                                                for (var i in layers[m].children) {
                                                    for (var j in layers[m].children[i].children) {
                                                        if (data.data.id == layers[m].children[i].children[j].id) {
                                                            layers[m].children[i].children[j].title = temp.field.name;
                                                            layers[m].children[i].children[j].remarks = temp.field.remarks;
                                                            layers[m].spread = true;
                                                            layers[m].children[i].spread = true;
                                                            layers[m].children[i].children[j].spread = true;
                                                            console.log(layers[m].children[i].children[j]);
                                                            break;
                                                        }
                                                    }

                                                }
                                            }
                                        }
                                      



                                        modeljiazaiFlag = false;
                                        tree.reload('prjlayerlistid', { data: layers });
                                        ClearTemp();
                                        //关闭,更改图上显示
                                        if (data.data.checked) {
                                            var entity = viewer.entities.getById(data.data.id + "_LABEL");
                                            console.log(entity);
                                            entity.label.text = entity.label.text._value.replace(temptitle, temp.field.name);

                                        }
                                        var entity = viewer.entities.getById(data.id);
                                        layer.close(drwInfox);
                                    }

                                }, datatype: "json"
                            });
                            return false;
                        });

                    }
                    , end: function () {
                        layer.close(drwInfox);
                    }
                });
            }
            

        }
        
    }
}

