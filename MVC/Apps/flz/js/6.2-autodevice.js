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
                                    for (var i in layers[0].children) {
                                        if (data.data.id == layers[0].children[i].id) {
                                            layers[0].children[i].title = temp.field.name;
                                            layers[0].children[i].remarks = temp.field.remarks;
                                            layers[0].spread = true;
                                            layers[0].children[i].spread = true;
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
                        mxfw: JSON.stringify(home),
                        id: data.data.id.split("_")[1]//模型id
                    }
                    $.ajax({
                        url: servicesurl + "/api/Survey/UpdateModelGoodView", type: "put", data: data2,
                        success: function (result) {
                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            
                            layer.close(loadingminindex);
                        }, datatype: "json"
                    });
                });
            } else {
                layer.msg("请选择该模型进行最佳视图更新", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                return;
            }
            
        }
        else {//最开始的点线面。
            var temptitle = data.data.title;
            if (data.data.type == "FLZJIELI" || data.data.type == "YOUSHIMIAN") {//节理信息修改
                drwInfox = layer.open({
                    type: 1
                    , title: ['确认修改', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                    , area: ['300px', '300px']
                    , shade: 0
                    , offset: 'auto'
                    , closeBtn: 1
                    , maxmin: true
                    , moveOut: true
                    , content: data.data.type == "FLZJIELI" ? jieliupd : jiegouupd
                    , zIndex: layer.zIndex
                    , success: function (layero) {
                        //置顶
                        layer.setTop(layero);
                        form.render();
                        form.val("updpointinfoform", {
                            "name": data.data.title
                            , "remarks": data.data.remarks,
                            "avgOpening": data.data.datas.avgOpening,// "3"

                        });

                        form.on('submit(updpointinfosubmit)', function (temp) {
                            data.data.title = temp.field.name;
                            data.data.remarks = temp.field.remarks;
                            data.data.avgOpening = temp.field.avgOpening;
                            //tree.reload(data.data.id, { data: data.data });

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
                                            for (var i in layers[0].children) {
                                                for (var j in layers[0].children[i].children) {
                                                    if (data.data.id == layers[0].children[i].children[j].id) {
                                                        layers[0].children[i].children[j].title = temp.field.name;
                                                        layers[0].children[i].children[j].remarks = temp.field.remarks;
                                                        layers[0].children[i].children[j].datas.avgOpening = temp.field.avgOpening;
                                                        layers[0].children[i].children[j].datas.remarks = temp.field.remarks;
                                                        layers[0].children[i].children[j].datas.name = temp.field.name;
                                                        layers[0].spread = true;
                                                        layers[0].children[i].spread = true;
                                                        layers[0].children[i].children[j].spread = true;
                                                        console.log(layers[0].children[i].children[j]);
                                                        break;
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

