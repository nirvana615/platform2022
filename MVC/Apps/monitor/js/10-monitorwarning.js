//预警分析
function LoadWarningLayer(projectid, type) {
    if (projectid == null) {
        layer.msg('请先选择当前项目！', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
    }
    else {
        if (type != "0") {
            layer.msg('暂不支持除危岩崩塌外灾害类型预警分析！', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
        else {
            if (warninganalysislayerindex == null) {
                warninganalysislayerindex = layer.open({
                    type: 1
                    , title: ['预警分析', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                    , area: ['1000px', '800px']
                    , shade: 0
                    , offset: 'auto'
                    , closeBtn: 1
                    , maxmin: true
                    , moveOut: true
                    , content: '<!--预警分析--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px;"><ul class="layui-tab-title"><li class="layui-this" style="width:45%;padding-top: 0px;">预警预报消息</li><li style="width:45%;padding-top: 0px;">预警模型设置</li></ul><div class="layui-tab-content"><!--预警信息--><div class="layui-tab-item layui-show" style="padding-left:5px;padding-right:5px;"><!--预警数量--><div style="margin-top: 15px;"><button id="btn-wi-all" type="button" class="layui-btn layui-btn-primary" style="height:50px;">预警总数  <span id="warning-all-count"></span></button><button id="btn-wi-blue" type="button" class="layui-btn layui-btn-blue" style="height:50px;">蓝色预警    <span id="warning-blue-count"></span></button><button id="btn-wi-yellow" type="button" class="layui-btn layui-btn-yellow" style="height:50px;">黄色预警  <span id="warning-yellow-count"></span></button><button id="btn-wi-orange" type="button" class="layui-btn layui-btn-orange" style="height:50px;">橙色预警  <span id="warning-orange-count"></span></button><button id="btn-wi-red" type="button" class="layui-btn layui-btn-red" style="height:50px;">红色预警  <span id="warning-red-count"></span></button></div><!--预警信息--><div class="layui-card-body" style="margin-top:15px;padding:0px 0px;"><table id="warninginfotable" lay-filter="warninginfo-operae"></table><script type="text/html" id="table-toolbar-warninginfo"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="warninginfoview"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-blue layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="warninginfomark"><i class="layui-icon layui-icon-rate" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div><!--预警模型设置--><div class="layui-tab-item"><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBriefitem" style="margin:0px;"><ul class="layui-tab-title" style="float: left;width:120px;border-color:white;"><li class="layui-this" style="display: block;">临界条件</li><li style="display: block;">监测阈值</li><li style="display: block;">预警判据</li><li style="display: block;">预警模型</li><li style="display: block;">信息发布</li></ul><div class="layui-tab-content" style="height: 690px;width:840px;float: left;border-left:solid;border-left-color:#e6e6e6;border-left-width:1px;"><div class="layui-tab-item layui-show"><!--临界条件--><form class="layui-form" action="" lay-filter="warningthresholdform"><div class="layui-form-item"><label class="layui-form-label" style="width:160px;">灾害体</label><div class="layui-input-block" style="margin-left:190px;"><select id="zhtwid" name="zhtw" lay-filter="zhtw"><option value="">请选择</option></select></div></div><div class="layui-form-item" style="padding-top:15px;"><label class="layui-form-label" style="width:160px;">临界条件判据公式</label><div class="layui-input-block" style="margin-left:190px;"><select id="ljpjgsid" name="ljpjgs" lay-filter="ljpjgs"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:160px;">调整系数</label><div class="layui-input-block" style="margin-left:190px;"><input type="text" name="tzxs" class="layui-input" value="1.000" lay-verify="number"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:160px;">危岩崩塌临界条件判据</label><div class="layui-input-block" style="margin-left:190px;"><input type="text" name="ljtj" class="layui-input" readonly="readonly"></div></div><div class="layui-row" style="padding-top:15px;"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:160px;">危岩破坏模式</label><div class="layui-input-block" style="margin-left:190px;"><input type="text" name="wyphms" class="layui-input" readonly="readonly"></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label" style="width:180px;">危岩破坏模式亚类</label><div class="layui-input-block" style="margin-left:210px;"><input type="text" name="wyphmsyl" class="layui-input" readonly="readonly"></div></div></div></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:160px;">岩体容重(KN/m³)</label><div class="layui-input-block" style="margin-left:190px;"><input type="text" name="ytrz" class="layui-input" readonly="readonly"></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label" style="width:180px;">岩体泊松比</label><div class="layui-input-block" style="margin-left:210px;"><input type="text" name="ytbsb" class="layui-input" readonly="readonly"></div></div></div></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:160px;">岩体弹性模量(kPa)</label><div class="layui-input-block" style="margin-left:190px;"><input type="text" name="yttxml" class="layui-input" readonly="readonly"></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label" style="width:180px;">危岩单体自重(KN/m)</label><div class="layui-input-block" style="margin-left:210px;"><input type="text" name="wydtzz" class="layui-input" readonly="readonly"></div></div></div></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:160px;">潜在滑面粘聚力(kPa)</label><div class="layui-input-block" style="margin-left:190px;"><input type="text" name="qzhmnjl" class="layui-input" readonly="readonly"></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label" style="width:180px;">潜在滑面内摩擦角(°)</label><div class="layui-input-block" style="margin-left:210px;"><input type="text" name="qzhmnmcj" class="layui-input" readonly="readonly"></div></div></div></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:160px;">底部软弱层内聚力(kPa)</label><div class="layui-input-block" style="margin-left:190px;"><input type="text" name="dbrrcnjl" class="layui-input" readonly="readonly"></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label" style="width:180px;">底部软弱层内摩擦角(°)</label><div class="layui-input-block" style="margin-left:210px;"><input type="text" name="dbrrcnmcj" class="layui-input" readonly="readonly"></div></div></div></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:160px;">危岩单体宽度(m)</label><div class="layui-input-block" style="margin-left:190px;"><input type="text" name="wydtkd" class="layui-input" readonly="readonly"></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label" style="width:180px;">危岩单体厚度(m)</label><div class="layui-input-block" style="margin-left:210px;"><input type="text" name="wydthd" class="layui-input" readonly="readonly"></div></div></div></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:160px;">危岩单体高度(m)</label><div class="layui-input-block" style="margin-left:190px;"><input type="text" name="wydtgd" class="layui-input" readonly="readonly"></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label" style="width:180px;">岩石抗剪强度(kPa)</label><div class="layui-input-block" style="margin-left:210px;"><input type="text" name="yskjqd" class="layui-input" readonly="readonly"></div></div></div></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:160px;">岩体抗拉强度(kPa)</label><div class="layui-input-block" style="margin-left:190px;"><input type="text" name="wydtytklqd" class="layui-input" readonly="readonly"></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label" style="width:180px;">岩体单轴抗压强度(kPa)</label><div class="layui-input-block" style="margin-left:210px;"><input type="text" name="ytdzkyqd" class="layui-input" readonly="readonly"></div></div></div></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:160px;padding-top:1px;">危岩单体重心到后缘裂缝底部的水平距离(m)</label><div class="layui-input-block" style="margin-left:190px;"><input type="text" name="wydtzxdhylfdbdspjl" class="layui-input" readonly="readonly"></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label" style="width:180px;padding-top:1px;">危岩单体重心距离底部旋转点的水平距离(m)</label><div class="layui-input-block" style="margin-left:210px;"><input type="text" name="wydtzxjldbxzddspjl" class="layui-input" readonly="readonly"></div></div></div></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:160px;padding-top:1px;">危岩单体重心距离底部旋转点的垂直距离(m)</label><div class="layui-input-block" style="margin-left:190px;"><input type="text" name="wydtzxjldbxzddczjl" class="layui-input" readonly="readonly"></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label" style="width:180px;padding-top:1px;">单位单体下部软弱层岩体潜在剪切段破裂面正应力(kPa)</label><div class="layui-input-block" style="margin-left:210px;"><input type="text" name="dwdtxbrrcytqzjqdplmzyl" class="layui-input" readonly="readonly"></div></div></div></div></div><div class="layui-form-item" style="margin-bottom:10px"><div style="position:absolute;right:140px;bottom:10px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="warningthresholdcalculation" style="width:100px">计算</button></div><div style="position:absolute;right:30px;bottom:10px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="warningthresholdsave" style="width:100px">保存</button></div></div></form></div><div class="layui-tab-item"><!--监测阈值--><form class="layui-form" action="" lay-filter="monitorthresholdform"><div class="layui-form-item"><label class="layui-form-label" style="width:100px;">灾害体</label><div class="layui-input-block" style="margin-left:130px;"><select id="zhtmid" name="zhtm" lay-filter="zhtm"><option value="">请选择</option></select></div></div><div class="layui-form-item" style="margin-top:10px;"><label class="layui-form-label" style="width:100px;">临界条件</label><div class="layui-input-block" style="margin-left:130px;"><input type="text" name="ljtj" class="layui-input" readonly="readonly"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:100px;">监测点</label><div class="layui-input-block" style="margin-left:130px;"><select id="jcdid" name="jcd" lay-filter="jcd"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:100px;">平面x坐标(m)</label><div class="layui-input-block" style="margin-left:130px;"><input type="text" name="pmxzb" class="layui-input" readonly="readonly"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:100px;">平面y坐标(m)</label><div class="layui-input-block" style="margin-left:130px;"><input type="text" name="pmyzb" class="layui-input" readonly="readonly"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:100px;">高程(m)</label><div class="layui-input-block" style="margin-left:130px;"><input type="text" name="gc" class="layui-input" readonly="readonly"></div></div><div class="layui-form-item" style="margin-top:10px;"><label class="layui-form-label" style="width:100px;">调整系数</label><div class="layui-input-block" style="margin-left:130px;"><input type="text" name="monitortzxs" class="layui-input" value="1.000"></div></div><div class="layui-form-item" style="margin-top:10px;"><label class="layui-form-label" style="width:100px;padding-top:150px;">监测阈值</label><div class="layui-input-block" style="margin-left:130px;"><textarea name="jcyz" class="layui-textarea" style="min-height:320px!important"></textarea></div></div><div class="layui-form-item" style="margin-bottom:10px"><div style="position:absolute;right:140px;bottom:10px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="monitorthresholdcalculation" style="width:100px">计算</button></div><div style="position:absolute;right:30px;bottom:10px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="monitorthresholdsave" style="width:100px">保存</button></div></div></form></div><div class="layui-tab-item"><!--预警判据--><div class="layui-card-body" style="padding:0px 0px;"><table id="warningcriterionid" lay-filter="warningcriterion"></table><script type="text/html" id="addwarningcriterion"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm" style="font-size:14px" lay-event="addwarningcriterion">新增判据</button></div></script><script type="text/html" id="table-toolbar-warningcriterion"><a class="layui-btn layui-bg-gray layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="warningcriterionview"><i class="layui-icon layui-icon-read" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-blue layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="warningcriterionedit"><i class="layui-icon layui-icon-edit" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="warningcriteriondel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div><div class="layui-tab-item"><!--预警模型--><form class="layui-form" action="" lay-filter="warningmodelform" style="margin-top:5px;"><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:60px;">预警模型</label><div class="layui-input-block" style="margin-left:90px;"><select id="waringmodel-zht" name="zht" lay-filter="waringmodel-zht"><option value="">请选择</option></select></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><div style="position:absolute;right:0px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="addwarningmodel" style="width:120px;">新增预警模型</button></div></div></div></div></div></form><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin-top:10px;"><ul class="layui-tab-title"><li class="layui-this">蓝色预警</li><li>黄色预警</li><li>橙色预警</li><li>红色预警</li></ul><div class="layui-tab-content"><div class="layui-tab-item layui-show"><div class="layui-card-body" style="padding:0px 0px;"><table id="warningmodel-blue-table" lay-filter="warningmodel-blue-table"></table><script type="text/html" id="addbluecriterion"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm layui-btn-blue" style="font-size:14px" lay-event="addbluecriterion">添加蓝色判据</button></div></script><script type="text/html" id="table-toolbar-bluecriterion"><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="bluecriteriondel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div><div class="layui-tab-item"><div class="layui-card-body" style="padding:0px 0px;"><table id="warningmodel-yellow-table" lay-filter="warningmodel-yellow-table"></table><script type="text/html" id="addyellowcriterion"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm layui-btn-yellow" style="font-size:14px" lay-event="addyellowcriterion">添加黄色判据</button></div></script><script type="text/html" id="table-toolbar-yellowcriterion"><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="yellowcriteriondel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div><div class="layui-tab-item"><div class="layui-card-body" style="padding:0px 0px;"><table id="warningmodel-orange-table" lay-filter="warningmodel-orange-table"></table><script type="text/html" id="addorangecriterion"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm layui-btn-orange" style="font-size:14px" lay-event="addorangecriterion">添加橙色判据</button></div></script><script type="text/html" id="table-toolbar-orangecriterion"><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="orangecriteriondel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div><div class="layui-tab-item"><div class="layui-card-body" style="padding:0px 0px;"><table id="warningmodel-red-table" lay-filter="warningmodel-red-table"></table><script type="text/html" id="addredcriterion"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm layui-btn-red" style="font-size:14px" lay-event="addredcriterion">添加红色判据</button></div></script><script type="text/html" id="table-toolbar-redcriterion"><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="redcriteriondel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div></div></div><form class="layui-form" action="" lay-filter=""><fieldset class="layui-elem-field"><legend style="font-size:18px;">预警条件</legend><div class="layui-field-box" style="padding:5px 20px;"><div class="layui-form-item"><div class="layui-input-block" style="margin-left:10px;"><input type="radio" name="yjtj" value="0" title="预警判据触发" checked=""><input type="radio" name="yjtj" value="1" title="多参数预警模型触发" disabled=""></div></div></div></fieldset></form></div><div class="layui-tab-item"><!--信息发布--><div class="layui-card-body" style="padding:0px 0px;"><table id="warninginfopushid" lay-filter="warninginfopush"></table><script type="text/html" id="addwarninginfopush"><div class="layui-btn-container"><button class="layui-btn layui-btn-sm" style="font-size:14px" lay-event="addwarninginfopush">新增预警信息发布</button></div></script><script type="text/html" id="table-toolbar-warninginfopush"><a class="layui-btn layui-bg-red layui-btn-xs" style="background-color:rgba(255, 255, 255, 0)!important;margin-left:0px;" lay-event="warninginfopushdel"><i class="layui-icon layui-icon-delete" style="margin-right:0px;font-size:20px!important;color:#666!important;"></i></a></script></div></div></div></div></div></div></div>'
                    , zIndex: layer.zIndex
                    , success: function (layero) {
                        layer.setTop(layero);
                        /*
                         * 预警消息
                         */
                        var warninginfotabledata = [];
                        var warninginfotable = table.render({
                            elem: '#warninginfotable'
                            , id: 'warninginfotableid'
                            , title: '预警信息'
                            , skin: 'line'
                            , even: false
                            , page: {
                                layout: ['prev', 'page', 'next', 'count']
                            }
                            , limit: 14
                            , height: 613
                            , toolbar: false
                            , totalRow: false
                            , cols: [[
                                { field: 'id', title: 'ID', hide: true }
                                , { field: 'mark', title: '', width: 30, align: "right" }
                                , { field: 'yjjb', title: '预警级别', width: 80, align: "left" }
                                , { field: 'zht', title: '灾害体', width: 80, align: "left" }
                                , { field: 'yjsj', title: '预警时间', width: 150, align: "left" }
                                , { field: 'yjnr', title: '预警内容', align: "left" }
                                , { field: 'yjzt', title: '预警状态', width: 80, align: "left" }
                                , { field: 'clnr', title: '处理内容', hide: true, align: "left" }
                                , { field: 'clsj', title: '处理时间', hide: true, align: "left" }
                                , { field: 'bz', title: '备注', hide: true, align: "left" }
                                , { fixed: 'right', width: 90, align: 'center', toolbar: '#table-toolbar-warninginfo' }
                            ]]
                            , data: warninginfotabledata
                        });

                        //预警信息数量
                        document.getElementById('warning-all-count').innerText = "0";
                        document.getElementById('warning-blue-count').innerText = "0";
                        document.getElementById('warning-yellow-count').innerText = "0";
                        document.getElementById('warning-orange-count').innerText = "0";
                        document.getElementById('warning-red-count').innerText = "0";

                        //获取预警信息
                        GetWarningInfo();
                        function GetWarningInfo() {
                            //获取预警信息
                            $.ajax({
                                url: servicesurl + "/api/Warning/GetWarningInfo", type: "get", data: { "id": projectid, "cookie": document.cookie },
                                success: function (data) {
                                    warninginfotabledata = [];

                                    if (data == "") {
                                        document.getElementById('warning-all-count').innerText = "0";
                                        document.getElementById('warning-blue-count').innerText = "0";
                                        document.getElementById('warning-yellow-count').innerText = "0";
                                        document.getElementById('warning-orange-count').innerText = "0";
                                        document.getElementById('warning-red-count').innerText = "0";

                                        warninginfotable.reload({ id: 'warninginfotableid', data: warninginfotabledata });
                                    }
                                    else {
                                        var warninginfodata = JSON.parse(data);

                                        var allcount = 0;
                                        var bluecount = 0;
                                        var yellowcount = 0;
                                        var orangecount = 0;
                                        var redcount = 0;

                                        for (var i in warninginfodata) {
                                            allcount++;

                                            var wi = new Object;
                                            if (warninginfodata[i].YJJB == "蓝色预警") {
                                                wi.mark = '<span class="layui-badge-dot layui-bg-wi-blue"></span>';
                                                bluecount++;
                                            }
                                            else if (warninginfodata[i].YJJB == "黄色预警") {
                                                wi.mark = '<span class="layui-badge-dot layui-bg-wi-yellow"></span>';
                                                yellowcount++;
                                            }
                                            else if (warninginfodata[i].YJJB == "橙色预警") {
                                                wi.mark = '<span class="layui-badge-dot layui-bg-wi-orange"></span>';
                                                orangecount++;
                                            }
                                            else if (warninginfodata[i].YJJB == "红色预警") {
                                                wi.mark = '<span class="layui-badge-dot layui-bg-wi-red"></span>';
                                                redcount++;
                                            }

                                            wi.id = warninginfodata[i].Id;
                                            wi.yjjb = warninginfodata[i].YJJB;
                                            wi.zht = warninginfodata[i].ZHT;
                                            wi.yjsj = warninginfodata[i].YJSJ;
                                            wi.yjnr = warninginfodata[i].YJNR;
                                            wi.yjzt = warninginfodata[i].YJZT;
                                            wi.clnr = warninginfodata[i].CLNR;
                                            wi.clsj = warninginfodata[i].CLSJ;
                                            wi.bz = warninginfodata[i].BZ;
                                            warninginfotabledata.push(wi);
                                        }

                                        document.getElementById('warning-all-count').innerText = allcount;
                                        document.getElementById('warning-blue-count').innerText = bluecount;
                                        document.getElementById('warning-yellow-count').innerText = yellowcount;
                                        document.getElementById('warning-orange-count').innerText = orangecount;
                                        document.getElementById('warning-red-count').innerText = redcount;

                                        warninginfotable.reload({ id: 'warninginfotableid', data: warninginfotabledata });
                                    }
                                }, datatype: "json"
                            });
                        };

                        //预警信息表格操作
                        table.on('tool(warninginfo-operae)', function (obj) {
                            if (obj.event === 'warninginfoview') {
                                //查看预警信息
                                layer.open({
                                    type: 1
                                    , title: ['预警信息', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                                    , area: ['600px', '625px']
                                    , shade: 0
                                    , offset: 'auto'
                                    , closeBtn: 1
                                    , maxmin: true
                                    , moveOut: true
                                    , content: '<!--预警信息查看--><form class="layui-form" action="" lay-filter="warninginfoviewform" style="margin-right:10px;margin-top:10px;"><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">预警级别</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="yjjb" class="layui-input" readonly="readonly"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">灾害体</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="zht" class="layui-input" readonly="readonly"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">预警时间</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="yjsj" class="layui-input" readonly="readonly"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;margin-top:65px;">预警内容</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="yjnr" class="layui-textarea" readonly="readonly" style="min-height:150px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">预警状态</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="yjzt" class="layui-input" readonly="readonly"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;margin-top:65px;">处理内容</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="clnr" class="layui-textarea" readonly="readonly" style="min-height:150px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">处理时间</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="clsj" class="layui-input" readonly="readonly"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">备注</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="bz" class="layui-input" readonly="readonly"></div></div></form>'
                                    , zIndex: layer.zIndex
                                    , success: function (layero) {
                                        layer.setTop(layero);

                                        form.val("warninginfoviewform", {
                                            "yjjb": obj.data.yjjb
                                            , "zht": obj.data.zht
                                            , "yjsj": obj.data.yjsj
                                            , "yjnr": obj.data.yjnr
                                            , "yjzt": obj.data.yjzt
                                            , "clnr": obj.data.clnr
                                            , "clsj": obj.data.clsj
                                            , "bz": obj.data.bz
                                        });
                                    }
                                });
                            }
                            else if (obj.event === 'warninginfomark') {
                                //预警信息处理
                                var updatewarninginfolayerindex = layer.open({
                                    type: 1
                                    , title: ['预警处置', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                                    , area: ['600px', '670px']
                                    , shade: 0
                                    , offset: 'auto'
                                    , closeBtn: 1
                                    , maxmin: true
                                    , moveOut: true
                                    , content: '<!--预警信息编辑--><form class="layui-form" action="" lay-filter="warninginfoeditform" style="margin-right:10px;margin-top:10px;"><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">预警级别</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="yjjb" class="layui-input" readonly="readonly"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">灾害体</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="zht" class="layui-input" readonly="readonly"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">预警时间</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="yjsj" class="layui-input" readonly="readonly"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;margin-top:65px;">预警内容</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="yjnr" class="layui-textarea" readonly="readonly" style="min-height:150px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">预警状态</label><div class="layui-input-block" style="margin-left:90px;"><select id="wi-edit-yjztid" name="yjzt"></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;margin-top:65px;">处理内容</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="clnr" class="layui-textarea" style="min-height:150px!important" lay-verify="required"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">处理时间</label><div class="layui-input-block" style="margin-left:90px;"><input id="clsjid" type="text" name="clsj" class="layui-input" placeholder="yyyy-MM-dd HH:mm:ss"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">备注</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="bz" class="layui-input"></div></div><div class="layui-form-item" style="margin-top:10px"><div style="position:absolute;right:10px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="warninginfosave" style="width:100px">保存</button></div></div></form>'
                                    , zIndex: layer.zIndex
                                    , success: function (layero) {
                                        layer.setTop(layero);

                                        form.val("warninginfoeditform", {
                                            "yjjb": obj.data.yjjb
                                            , "zht": obj.data.zht
                                            , "yjsj": obj.data.yjsj
                                            , "yjnr": obj.data.yjnr
                                            , "clnr": obj.data.clnr
                                            , "wclsj": obj.data.clsj
                                            , "bz": obj.data.bz
                                        });

                                        if (yjzts.length > 0) {
                                            for (var i in yjzts) {
                                                if (yjzts[i].name == obj.data.yjzt) {
                                                    document.getElementById("wi-edit-yjztid").innerHTML += '<option value="' + yjzts[i].value + '" selected>' + yjzts[i].name + '</option>';
                                                }
                                                else {
                                                    document.getElementById("wi-edit-yjztid").innerHTML += '<option value="' + yjzts[i].value + '">' + yjzts[i].name + '</option>';
                                                }
                                            }
                                        }

                                        date.render({
                                            elem: '#clsjid'
                                            , type: 'datetime'
                                        });

                                        form.render();
                                        form.render('select');

                                        //更新预警信息
                                        form.on('submit(warninginfosave)', function (data) {
                                            data.field.id = obj.data.id;
                                            data.field.cookie = document.cookie;

                                            $.ajax({
                                                url: servicesurl + "/api/Warning/UpdateWarningInfo", type: "put", data: data.field,
                                                success: function (result) {
                                                    if (result == "") {
                                                        layer.msg("更新失败！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                    }
                                                    else {
                                                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                        //更新预警信息
                                                        GetWarningInfo();
                                                    }
                                                }, datatype: "json"
                                            });

                                            layer.close(updatewarninginfolayerindex);
                                            return false;
                                        });
                                    }
                                });
                            }
                        });

                        //预警信息分类展示
                        $("#btn-wi-all").on("click", function () {
                            DisplayWarningInfo("", warninginfotabledata);
                        });
                        $("#btn-wi-blue").on("click", function () {
                            DisplayWarningInfo("蓝色预警", warninginfotabledata);
                        });
                        $("#btn-wi-yellow").on("click", function () {
                            DisplayWarningInfo("黄色预警", warninginfotabledata);
                        });
                        $("#btn-wi-orange").on("click", function () {
                            DisplayWarningInfo("橙色预警", warninginfotabledata);
                        });
                        $("#btn-wi-red").on("click", function () {
                            DisplayWarningInfo("红色预警", warninginfotabledata);
                        });
                        function DisplayWarningInfo(type, wis) {
                            if (wis.length > 0) {
                                if (type == "") {
                                    warninginfotable.reload({ id: 'warninginfotableid', data: wis });
                                }
                                else if (type == "蓝色预警") {
                                    var blues = [];
                                    for (var i in wis) {
                                        if (wis[i].yjjb == type) {
                                            blues.push(wis[i]);
                                        }
                                    }
                                    warninginfotable.reload({ id: 'warninginfotableid', data: blues });
                                }
                                else if (type == "黄色预警") {
                                    var yellows = [];
                                    for (var i in wis) {
                                        if (wis[i].yjjb == type) {
                                            yellows.push(wis[i]);
                                        }
                                    }
                                    warninginfotable.reload({ id: 'warninginfotableid', data: yellows });
                                }
                                else if (type == "橙色预警") {
                                    var oranges = [];
                                    for (var i in wis) {
                                        if (wis[i].yjjb == type) {
                                            oranges.push(wis[i]);
                                        }
                                    }
                                    warninginfotable.reload({ id: 'warninginfotableid', data: oranges });
                                }
                                else if (type == "红色预警") {
                                    var reds = [];
                                    for (var i in wis) {
                                        if (wis[i].yjjb == type) {
                                            reds.push(wis[i]);
                                        }
                                    }
                                    warninginfotable.reload({ id: 'warninginfotableid', data: reds });
                                }
                            }
                        };


                        /*
                         * 预警模型设置
                         */

                        //临界条件
                        var disasters = [];//灾害体
                        $.ajax({
                            url: servicesurl + "/api/Disaster/GetDisaster", type: "get", data: { "id": projectid, "cookie": document.cookie },
                            success: function (data) {
                                disasters = [];
                                document.getElementById("zhtwid").innerHTML = '<option value="">请选择</option>';
                                document.getElementById("zhtmid").innerHTML = '<option value="">请选择</option>';

                                if (data != "") {
                                    var disasterInfos = JSON.parse(data);

                                    for (var i in disasterInfos) {
                                        var disaster = new Object;
                                        disaster.value = disasterInfos[i].Id;
                                        disaster.name = disasterInfos[i].ZHTBH;
                                        disasters.push(disaster);
                                    }

                                    if (disasters.length > 0) {
                                        for (var i in disasters) {
                                            document.getElementById("zhtwid").innerHTML += '<option value="' + disasters[i].value + '">' + disasters[i].name + '</option>';
                                            document.getElementById("zhtmid").innerHTML += '<option value="' + disasters[i].value + '">' + disasters[i].name + '</option>';
                                        }
                                    }

                                    form.render();
                                    form.render('select');
                                }
                            }, datatype: "json"
                        });

                        //临界条件-灾害体切换
                        var curdisasterid = "";//当前灾害体id
                        form.on('select(zhtw)', function (data) {
                            curdisasterid = data.value;
                            if (data.value != "") {
                                //获取灾害体预警模型参数
                                $.ajax({
                                    url: servicesurl + "/api/Disaster/GetDisasterProperty", type: "get", data: { "id": data.value, "cookie": document.cookie },
                                    success: function (result) {
                                        if (result == "") {
                                            form.val("warningthresholdform", {
                                                "wyphms": ""
                                                , "wyphmsyl": ""
                                                , "ytrz": ""
                                                , "ytbsb": ""
                                                , "yttxml": ""
                                                , "wydtzz": ""
                                                , "qzhmnjl": ""
                                                , "qzhmnmcj": ""
                                                , "dbrrcnjl": ""
                                                , "dbrrcnmcj": ""
                                                , "wydtkd": ""
                                                , "wydthd": ""
                                                , "wydtgd": ""
                                                , "yskjqd": ""
                                                , "wydtytklqd": ""
                                                , "ytdzkyqd": ""
                                                , "wydtzxdhylfdbdspjl": ""
                                                , "wydtzxjldbxzddspjl": ""
                                                , "wydtzxjldbxzddczjl": ""
                                                , "dwdtxbrrcytqzjqdplmzyl": ""
                                            });
                                        }
                                        else {
                                            var disasterproperty = JSON.parse(result);
                                            if (disasterproperty.RockfallWarning == null) {
                                                form.val("warningthresholdform", {
                                                    "wyphms": ""
                                                    , "wyphmsyl": ""
                                                    , "ytrz": ""
                                                    , "ytbsb": ""
                                                    , "yttxml": ""
                                                    , "wydtzz": ""
                                                    , "qzhmnjl": ""
                                                    , "qzhmnmcj": ""
                                                    , "dbrrcnjl": ""
                                                    , "dbrrcnmcj": ""
                                                    , "wydtkd": ""
                                                    , "wydthd": ""
                                                    , "wydtgd": ""
                                                    , "yskjqd": ""
                                                    , "wydtytklqd": ""
                                                    , "ytdzkyqd": ""
                                                    , "wydtzxdhylfdbdspjl": ""
                                                    , "wydtzxjldbxzddspjl": ""
                                                    , "wydtzxjldbxzddczjl": ""
                                                    , "dwdtxbrrcytqzjqdplmzyl": ""
                                                });
                                            }
                                            else {
                                                form.val("warningthresholdform", {
                                                    "wyphms": disasterproperty.RockfallWarning.CType1
                                                    , "wyphmsyl": disasterproperty.RockfallWarning.CType2
                                                    , "ytrz": disasterproperty.RockfallWarning.UW
                                                    , "ytbsb": disasterproperty.RockfallWarning.PRR
                                                    , "yttxml": disasterproperty.RockfallWarning.EMR
                                                    , "wydtzz": disasterproperty.RockfallWarning.OW
                                                    , "qzhmnjl": disasterproperty.RockfallWarning.CSS
                                                    , "qzhmnmcj": disasterproperty.RockfallWarning.FASS
                                                    , "dbrrcnjl": disasterproperty.RockfallWarning.SCP_C
                                                    , "dbrrcnmcj": disasterproperty.RockfallWarning.SCP_FA
                                                    , "wydtkd": disasterproperty.RockfallWarning.Frame_W
                                                    , "wydthd": disasterproperty.RockfallWarning.Frame_Th
                                                    , "wydtgd": disasterproperty.RockfallWarning.Frame_H
                                                    , "yskjqd": disasterproperty.RockfallWarning.SCP_Ba
                                                    , "wydtytklqd": disasterproperty.RockfallWarning.FLk
                                                    , "ytdzkyqd": disasterproperty.RockfallWarning.Rt
                                                    , "wydtzxdhylfdbdspjl": disasterproperty.RockfallWarning.HDPC
                                                    , "wydtzxjldbxzddspjl": disasterproperty.RockfallWarning.HDCR
                                                    , "wydtzxjldbxzddczjl": disasterproperty.RockfallWarning.VDCR
                                                    , "dwdtxbrrcytqzjqdplmzyl": disasterproperty.RockfallWarning.SCP_HD
                                                });
                                            }
                                        }
                                    }, datatype: "json"
                                });

                                //获取灾害体临界条件
                                $.ajax({
                                    url: servicesurl + "/api/Warning/GetDisasterThreshold", type: "get", data: { "id": data.value, "cookie": document.cookie },
                                    success: function (result) {
                                        document.getElementById("ljpjgsid").innerHTML = '<option value="">请选择</option>';

                                        if (result == "") {
                                            if (wypjgss.length > 0) {
                                                for (var i in wypjgss) {
                                                    document.getElementById("ljpjgsid").innerHTML += '<option value="' + wypjgss[i].value + '">' + wypjgss[i].name + '</option>';
                                                }
                                            }

                                            form.val("warningthresholdform", {
                                                "tzxs": "1.000"
                                                , "ljtj": ""
                                            });
                                        }
                                        else {
                                            var disasterthreshold = JSON.parse(result);

                                            if (wypjgss.length > 0) {
                                                for (var i in wypjgss) {
                                                    if (wypjgss[i].value == disasterthreshold.GS) {
                                                        document.getElementById("ljpjgsid").innerHTML += '<option value="' + wypjgss[i].value + '" selected>' + wypjgss[i].name + '</option>';
                                                    }
                                                    else {
                                                        document.getElementById("ljpjgsid").innerHTML += '<option value="' + wypjgss[i].value + '">' + wypjgss[i].name + '</option>';
                                                    }
                                                }
                                            }

                                            form.val("warningthresholdform", {
                                                "tzxs": disasterthreshold.XS
                                                , "ljtj": disasterthreshold.YZ
                                            });
                                        }

                                        form.render();
                                        form.render('select');
                                    }, datatype: "json"
                                });
                            }
                            else {
                                form.val("warningthresholdform", {
                                    "wyphms": ""
                                    , "wyphmsyl": ""
                                    , "ytrz": ""
                                    , "ytbsb": ""
                                    , "yttxml": ""
                                    , "wydtzz": ""
                                    , "qzhmnjl": ""
                                    , "qzhmnmcj": ""
                                    , "dbrrcnjl": ""
                                    , "dbrrcnmcj": ""
                                    , "wydtkd": ""
                                    , "wydthd": ""
                                    , "wydtgd": ""
                                    , "yskjqd": ""
                                    , "wydtytklqd": ""
                                    , "ytdzkyqd": ""
                                    , "wydtzxdhylfdbdspjl": ""
                                    , "wydtzxjldbxzddspjl": ""
                                    , "wydtzxjldbxzddczjl": ""
                                    , "dwdtxbrrcytqzjqdplmzyl": ""
                                    , "tzxs": "1.000"
                                    , "ljtj": ""
                                });

                                document.getElementById("ljpjgsid").innerHTML = '<option value="">请选择</option>';
                                for (var i in wypjgss) {
                                    document.getElementById("ljpjgsid").innerHTML += '<option value="' + wypjgss[i].value + '">' + wypjgss[i].name + '</option>';
                                }

                                form.val("warningthresholdform", {
                                    "tzxs": "1.000"
                                    , "ljtj": ""
                                });
                            }
                        });

                        //计算临界条件
                        form.on('submit(warningthresholdcalculation)', function (data) {
                            data.field.cookie = document.cookie;

                            $.ajax({
                                url: servicesurl + "/api/Warning/CalculateDisasterThreshold", type: "post", data: data.field,
                                success: function (result) {
                                    if (result == "") {
                                        layer.msg("计算失败！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        form.val("warningthresholdform", {
                                            "ljtj": ""
                                        });
                                    }
                                    else {
                                        if (parseFloat(result) == NaN) {
                                            layer.msg("计算失败！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                            form.val("warningthresholdform", {
                                                "ljtj": ""
                                            });
                                        }
                                        else {
                                            form.val("warningthresholdform", {
                                                "ljtj": result
                                            });
                                        }
                                    }

                                }, datatype: "json"
                            });

                            return false;
                        });

                        //保存临界条件
                        form.on('submit(warningthresholdsave)', function (data) {
                            data.field.id = curdisasterid;
                            data.field.cookie = document.cookie;

                            $.ajax({
                                url: servicesurl + "/api/Warning/SaveDisasterThreshold", type: "post", data: data.field,
                                success: function (result) {
                                    if (result == "") {
                                        layer.msg("保存失败！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    }
                                    else {
                                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    }
                                }, datatype: "json"
                            });

                            return false;
                        });


                        //监测阈值
                        var monitors = [];//监测点
                        $.ajax({
                            url: servicesurl + "/api/Monitor/GetMonitor", type: "get", data: { "id": projectid, "cookie": document.cookie },
                            success: function (result) {
                                monitors = [];
                                if (result != "") {
                                    var monitorinfos = JSON.parse(result);
                                    for (var i in monitorinfos) {
                                        if (monitorinfos[i].DisasterString != null) {
                                            if (monitorinfos[i].MonitorString.JCZLX != "GNSS基准站") {
                                                var monitor = new Object;
                                                monitor.id = monitorinfos[i].MonitorString.Id;
                                                monitor.disaster = monitorinfos[i].DisasterString.Id;
                                                monitor.jcdmc = monitorinfos[i].MonitorString.JCDMC;
                                                monitor.jcdbh = monitorinfos[i].MonitorString.JCDBH;
                                                monitor.jcff = monitorinfos[i].MonitorString.JCFF;
                                                monitor.x = monitorinfos[i].MonitorString.PMWZX;
                                                monitor.y = monitorinfos[i].MonitorString.PMWZY;
                                                monitor.h = monitorinfos[i].MonitorString.GC;
                                                monitors.push(monitor);
                                            }
                                        }
                                    }

                                    GetWarningCriterion();//获取预警判据
                                    GetWarningModel();//获取预警模型
                                }
                            }, datatype: "json"
                        });

                        //监测阈值-灾害体切换
                        form.on('select(zhtm)', function (data) {
                            form.val("monitorthresholdform", {
                                "ljtj": ""
                                , "pmxzb": ""
                                , "pmyzb": ""
                                , "gc": ""
                                , "monitortzxs": "1.000"
                                , "jcyz": ""
                            });

                            if (data.value != "") {
                                //灾害体临界条件
                                $.ajax({
                                    url: servicesurl + "/api/Warning/GetDisasterThreshold", type: "get", data: { "id": data.value, "cookie": document.cookie },
                                    success: function (result) {
                                        if (result == "") {
                                            form.val("monitorthresholdform", {
                                                "ljtj": ""
                                            });
                                        }
                                        else {
                                            var disasterthreshold = JSON.parse(result);
                                            form.val("monitorthresholdform", {
                                                "ljtj": disasterthreshold.YZ
                                            });
                                        }
                                    }, datatype: "json"
                                });

                                document.getElementById("jcdid").innerHTML = '<option value="">请选择</option>';

                                if (monitors.length > 0) {
                                    for (var i in monitors) {
                                        if (monitors[i].disaster == data.value) {
                                            document.getElementById("jcdid").innerHTML += '<option value="' + monitors[i].id + '">' + monitors[i].jcdbh + '</option>';
                                        }
                                    }
                                }

                                form.render();
                                form.render('select');
                            }
                        });

                        //监测阈值-监测点切换
                        form.on('select(jcd)', function (data) {
                            if (data.value == "") {
                                form.val("monitorthresholdform", {
                                    "pmxzb": ""
                                    , "pmyzb": ""
                                    , "gc": ""
                                    , "monitortzxs": "1.000"
                                    , "jcyz": ""
                                });
                            }
                            else {
                                //获取监测点位置
                                for (var i in monitors) {
                                    if (monitors[i].id == data.value) {
                                        form.val("monitorthresholdform", {
                                            "pmxzb": monitors[i].x
                                            , "pmyzb": monitors[i].y
                                            , "gc": monitors[i].h
                                        });
                                    }
                                }

                                //获取监测点阈值
                                GetMonitorThreshold(data.value);
                            }
                        });

                        //监测点阈值
                        function GetMonitorThreshold(id) {
                            $.ajax({
                                url: servicesurl + "/api/Warning/GetMonitorThreshold", type: "get", data: { "id": id, "cookie": document.cookie },
                                success: function (result) {
                                    if (result == "") {
                                        form.val("monitorthresholdform", {
                                            "monitortzxs": "1.000"
                                            , "jcyz": ""
                                        });
                                    }
                                    else {
                                        var monitorthresholddata = JSON.parse(result);
                                        var monitorthreshold = JSON.parse(monitorthresholddata.YZ);
                                        var jcyzdata = "";
                                        if (monitorthresholddata.LX == "裂缝") {
                                            jcyzdata = monitorthreshold.Datas[0].Name + " " + monitorthreshold.Datas[0].Value + " " + monitorthreshold.Datas[0].Unit;
                                        }
                                        else if (monitorthresholddata.LX == "应力") {
                                            jcyzdata = monitorthreshold.Datas[0].Name + " " + monitorthreshold.Datas[0].Value + " " + monitorthreshold.Datas[0].Unit;
                                        }
                                        else if (monitorthresholddata.LX == "倾角") {
                                            jcyzdata = monitorthreshold.Datas[0].Name + " " + monitorthreshold.Datas[0].Value + " " + monitorthreshold.Datas[0].Unit + ";" + monitorthreshold.Datas[1].Name + " " + monitorthreshold.Datas[1].Value + " " + monitorthreshold.Datas[1].Unit;
                                        }

                                        form.val("monitorthresholdform", {
                                            "monitortzxs": monitorthresholddata.XS
                                            , "jcyz": jcyzdata
                                        });
                                    }
                                }, datatype: "json"
                            });
                        };


                        //TODO计算监测阈值
                        form.on('submit(monitorthresholdcalculation)', function (data) {
                            data.field.cookie = document.cookie;

                            layer.msg("计算成功！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                            //$.ajax({
                            //    url: servicesurl + "/api/Warning/CalculateMonitorThreshold", type: "post", data: data.field,
                            //    success: function (result) {
                            //        if (result == "") {
                            //            layer.msg("计算失败", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            //        }
                            //        else {
                            //            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                            //        }
                            //    }, datatype: "json"
                            //});

                            return false;
                        });

                        //保存监测阈值
                        form.on('submit(monitorthresholdsave)', function (data) {
                            data.field.cookie = document.cookie;

                            $.ajax({
                                url: servicesurl + "/api/Warning/SaveMonitorThreshold", type: "post", data: data.field,
                                success: function (result) {
                                    if (result == "") {
                                        layer.msg("保存失败", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    }
                                    else {
                                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        GetMonitorThreshold(data.field.jcd);
                                    }
                                }, datatype: "json"
                            });

                            return false;
                        });


                        //预警判据
                        var warningcriteriontabledata = [];
                        var warningcriteriontable = table.render({
                            elem: '#warningcriterionid'
                            , id: 'warningcriteriontableid'
                            , title: '预警判据'
                            , skin: 'line'
                            , even: false
                            , page: {
                                layout: ['prev', 'page', 'next', 'count']
                            }
                            , limit: 14
                            , height: 690
                            , toolbar: '#addwarningcriterion'
                            , defaultToolbar: []
                            , totalRow: false
                            , cols: [[
                                { field: 'id', title: 'ID', hide: true }
                                , { field: 'pjmc', title: '判据名称', width: 220, align: "left" }
                                , { field: 'yjjb', title: '预警级别', width: 80, align: "left" }
                                , { field: 'zht', title: '灾害体', width: 80, align: "left" }
                                , { field: 'jcd', title: '监测点', width: 80, align: "left" }
                                , { field: 'pjgs', title: '判据公式', align: "left" }
                                , { field: 'ms', title: '描述', align: "left", hide: true }
                                , { field: 'bz', title: '备注', align: "left", hide: true }
                                , { fixed: 'right', width: 110, align: 'center', toolbar: '#table-toolbar-warningcriterion' }
                            ]]
                            , data: warningcriteriontabledata
                        });

                        //获取预警判据
                        function GetWarningCriterion() {
                            $.ajax({
                                url: servicesurl + "/api/Warning/GetWarningCriterion", type: "get", data: { "id": projectid, "cookie": document.cookie },
                                success: function (data) {
                                    warningcriteriontabledata = [];
                                    if (data != "") {
                                        var criteriondatas = JSON.parse(data);
                                        for (var i in criteriondatas) {
                                            var wr = new Object;
                                            wr.id = criteriondatas[i].Id;
                                            wr.pjmc = criteriondatas[i].PJMC;
                                            if (yjjbs.length > 0) {
                                                for (var j in yjjbs) {
                                                    if (yjjbs[j].value == criteriondatas[i].YJJB) {
                                                        wr.yjjb = yjjbs[j].name;
                                                    }
                                                }
                                            }
                                            else {
                                                wr.yjjb = criteriondatas[i].YJJB;
                                            }
                                            if (disasters.length > 0) {
                                                for (var j in disasters) {
                                                    if (disasters[j].value == criteriondatas[i].ZHT) {
                                                        wr.zht = disasters[j].name;
                                                    }
                                                }
                                            }
                                            else {
                                                wr.zht = criteriondatas[i].ZHT;
                                            }
                                            if (monitors.length > 0) {
                                                for (var j in monitors) {
                                                    if (monitors[j].id == criteriondatas[i].JCD) {
                                                        wr.jcd = monitors[j].jcdbh;
                                                    }
                                                }
                                            }
                                            else {
                                                wr.jcd = criteriondatas[i].JCD;
                                            }
                                            wr.pjgs = criteriondatas[i].PJGS;
                                            wr.ms = criteriondatas[i].MS;
                                            wr.bz = criteriondatas[i].BZ;
                                            warningcriteriontabledata.push(wr);
                                        }
                                    }

                                    warningcriteriontable.reload({ id: 'warningcriteriontableid', data: warningcriteriontabledata });
                                }, datatype: "json"
                            });
                        };

                        var warningcriterionaddlayerindex = null;
                        //新增判据
                        table.on('toolbar(warningcriterion)', function (obj) {
                            switch (obj.event) {
                                case 'addwarningcriterion':
                                    if (warningcriterionaddlayerindex != null) {
                                        layer.close(warningcriterionaddlayerindex);
                                        warningcriterionaddlayerindex = null;
                                    }

                                    warningcriterionaddlayerindex = layer.open({
                                        type: 1
                                        , title: ['新增判据', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                        , area: ['800px', '800px']
                                        , shade: 0
                                        , offset: 'auto'
                                        , closeBtn: 1
                                        , maxmin: false
                                        , moveOut: true
                                        , content: '<!--新增判据--><form class="layui-form" action="" lay-filter="criterionaddform" style="margin-top:10px;margin-right:10px;"><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">判据名称</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="pjmc" class="layui-input" lay-verify="required"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">预警级别</label><div class="layui-input-block" style="margin-left:90px;"><select id="yjjbid" name="yjjb" lay-filter="yjjb" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">灾害体</label><div class="layui-input-block" style="margin-left:90px;"><select id="zhtcid" name="zhtc" lay-filter="zhtc" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">监测点</label><div class="layui-input-block" style="margin-left:90px;"><select id="jcdcid" name="jcdc" lay-filter="jcdc" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:60px;padding-top:105px;">监测阈值</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="jcyz" class="layui-textarea" style="min-height:232px!important"></textarea></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label" style="width:60px;padding-top:105px;">判据项</label><div class="layui-input-block" style="margin-left:90px;height:230px;border:solid;border-color:#e6e6e6;border-width:1px;"><div id="pjxid"></div></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;padding-top:50px;">判据公式</label><div class="layui-input-block" style="margin-left:90px;"><textarea id="pjgsid" name="pjgs" class="layui-textarea" style="min-height:120px!important;" lay-verify="required"></textarea></div></div><div class="layui-form-item" style="margin-top:10px;"><div class="layui-input-block" style="margin-left:90px;"><button id="btnzkh" type="button" class="layui-btn layui-btn-primary layui-btn-sm"><i id="pjxzkh" style="font-size:14px!important;font-style:normal;">(</i></button><button id="btnykh" type="button" class="layui-btn layui-btn-primary layui-btn-sm"><i id="pjxykh" style="font-size:14px!important;font-style:normal;">)</i></button><button id="btnand" type="button" class="layui-btn layui-btn-primary layui-btn-sm"><i id="pjxand" style="font-size:14px!important;font-style:normal;">AND</i></button><button id="btnor" type="button" class="layui-btn layui-btn-primary layui-btn-sm"><i id="pjxor" style="font-size:14px!important;font-style:normal;">OR</i></button><button id="btndy" type="button" class="layui-btn layui-btn-primary layui-btn-sm"><i id="pjxdy" style="font-size:14px!important;font-style:normal;">></i></button><button id="btnxy" type="button" class="layui-btn layui-btn-primary layui-btn-sm"><i id="pjxxy" style="font-size:14px!important;font-style:normal;"><</i></button><button id="btndydy" type="button" class="layui-btn layui-btn-primary layui-btn-sm"><i id="pjxdydy" style="font-size:14px!important;font-style:normal;">>=</i></button><button id="btnxydy" type="button" class="layui-btn layui-btn-primary layui-btn-sm"><i id="pjxxydy" style="font-size:14px!important;font-style:normal;"><=</i></button><button id="btnbdy" type="button" class="layui-btn layui-btn-primary layui-btn-sm"><i id="pjxbdy" style="font-size:14px!important;font-style:normal;">!=</i></button></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;padding-top:25px;">描述</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="ms" class="layui-textarea" style="min-height:70px!important;"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">备注</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="bz" class="layui-input"></div></div><div class="layui-form-item" style="margin-bottom:10px"><div style="position:absolute;right:10px;bottom:10px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="criterionaddsave" style="width:100px">保存</button></div></div></form>'
                                        , zIndex: layer.zIndex
                                        , success: function (layero) {
                                            layer.setTop(layero);

                                            //新增判据-预警级别
                                            if (yjjbs.length > 0) {
                                                for (var i in yjjbs) {
                                                    document.getElementById("yjjbid").innerHTML += '<option value="' + yjjbs[i].value + '">' + yjjbs[i].name + '</option>';
                                                }
                                            }

                                            //新增判据-灾害体
                                            if (disasters.length > 0) {
                                                for (var i in disasters) {
                                                    document.getElementById("zhtcid").innerHTML += '<option value="' + disasters[i].value + '">' + disasters[i].name + '</option>';
                                                }
                                            }

                                            //渲染判据项
                                            tree.render({
                                                elem: '#pjxid'
                                                , id: 'pjid'
                                                , data: []
                                                , accordion: true
                                                , showLine: false
                                                , click: function (obj) {
                                                    insertAtCursor(document.getElementById("pjgsid"), obj.data.title);
                                                }
                                            });

                                            //新增判据-灾害体切换
                                            form.on('select(zhtc)', function (data) {
                                                document.getElementById("jcdcid").innerHTML = '<option value="">请选择</option>';

                                                if (data.value != "") {
                                                    if (monitors.length > 0) {
                                                        for (var i in monitors) {
                                                            if (monitors[i].disaster == data.value) {
                                                                document.getElementById("jcdcid").innerHTML += '<option value="' + monitors[i].id + '">' + monitors[i].jcdbh + '</option>';
                                                            }
                                                        }
                                                    }
                                                }

                                                form.render();
                                                form.render('select');
                                            });

                                            //新增判据-监测点切换
                                            form.on('select(jcdc)', function (data) {
                                                if (data.value == "") {
                                                    form.val("criterionaddform", {
                                                        "jcyz": ""
                                                        , "pjgs": ""
                                                    });

                                                    tree.reload('pjid', {
                                                        data: []
                                                    });
                                                }
                                                else {
                                                    var pjxs = [];
                                                    for (var i in monitors) {
                                                        if (monitors[i].id == data.value) {
                                                            if (monitors[i].jcff == "裂缝") {
                                                                if (lfpjs.length > 0) {
                                                                    for (var i in lfpjs) {
                                                                        var pj = new Object;
                                                                        pj.title = lfpjs[i].name;
                                                                        pjxs.push(pj);
                                                                    }
                                                                }
                                                            }
                                                            else if (monitors[i].jcff == "倾角") {
                                                                if (qjpjs.length > 0) {
                                                                    for (var i in qjpjs) {
                                                                        var pj = new Object;
                                                                        pj.title = qjpjs[i].name;
                                                                        pjxs.push(pj);
                                                                    }
                                                                }
                                                            }
                                                            else if (monitors[i].jcff == "应力") {
                                                                if (ylpjs.length > 0) {
                                                                    for (var i in ylpjs) {
                                                                        var pj = new Object;
                                                                        pj.title = ylpjs[i].name;
                                                                        pjxs.push(pj);
                                                                    }
                                                                }
                                                            }
                                                            else {
                                                                pjxs = [];
                                                            }
                                                        }
                                                    }

                                                    tree.reload('pjid', {
                                                        data: pjxs
                                                    });


                                                    //获取监测点阈值
                                                    $.ajax({
                                                        url: servicesurl + "/api/Warning/GetMonitorThreshold", type: "get", data: { "id": data.value, "cookie": document.cookie },
                                                        success: function (result) {
                                                            if (result == "") {
                                                                form.val("criterionaddform", {
                                                                    "jcyz": ""
                                                                });
                                                            }
                                                            else {
                                                                var monitorthresholddata = JSON.parse(result);
                                                                var monitorthreshold = JSON.parse(monitorthresholddata.YZ);
                                                                var jcyzdata = "";
                                                                if (monitorthresholddata.LX == "裂缝") {
                                                                    jcyzdata = monitorthreshold.Datas[0].Name + " " + monitorthreshold.Datas[0].Value + " " + monitorthreshold.Datas[0].Unit;
                                                                }
                                                                else if (monitorthresholddata.LX == "应力") {
                                                                    jcyzdata = monitorthreshold.Datas[0].Name + " " + monitorthreshold.Datas[0].Value + " " + monitorthreshold.Datas[0].Unit;
                                                                }
                                                                else if (monitorthresholddata.LX == "倾角") {
                                                                    jcyzdata = monitorthreshold.Datas[0].Name + " " + monitorthreshold.Datas[0].Value + " " + monitorthreshold.Datas[0].Unit + ";" + monitorthreshold.Datas[1].Name + " " + monitorthreshold.Datas[1].Value + " " + monitorthreshold.Datas[1].Unit;
                                                                }

                                                                form.val("criterionaddform", {
                                                                    "jcyz": jcyzdata
                                                                });
                                                            }
                                                        }, datatype: "json"
                                                    });
                                                }
                                            });

                                            //判据项
                                            $("#btnzkh").on("click", function () {
                                                insertAtCursor(document.getElementById("pjgsid"), document.getElementById("pjxzkh").innerText);
                                            });
                                            $("#btnykh").on("click", function () {
                                                insertAtCursor(document.getElementById("pjgsid"), document.getElementById("pjxykh").innerText);
                                            });
                                            $("#btnand").on("click", function () {
                                                insertAtCursor(document.getElementById("pjgsid"), " " + document.getElementById("pjxand").innerText + " ");
                                            });
                                            $("#btnor").on("click", function () {
                                                insertAtCursor(document.getElementById("pjgsid"), " " + document.getElementById("pjxor").innerText + " ");
                                            });
                                            $("#btndy").on("click", function () {
                                                insertAtCursor(document.getElementById("pjgsid"), document.getElementById("pjxdy").innerText);
                                            });
                                            $("#btnxy").on("click", function () {
                                                insertAtCursor(document.getElementById("pjgsid"), document.getElementById("pjxxy").innerText);
                                            });
                                            $("#btndydy").on("click", function () {
                                                insertAtCursor(document.getElementById("pjgsid"), document.getElementById("pjxdydy").innerText);
                                            });
                                            $("#btnxydy").on("click", function () {
                                                insertAtCursor(document.getElementById("pjgsid"), document.getElementById("pjxxydy").innerTex);
                                            });
                                            $("#btnbdy").on("click", function () {
                                                insertAtCursor(document.getElementById("pjgsid"), document.getElementById("pjxbdy").innerText);
                                            });

                                            //新增预警判据
                                            form.on('submit(criterionaddsave)', function (data) {
                                                data.field.cookie = document.cookie;

                                                $.ajax({
                                                    url: servicesurl + "/api/Warning/AddWarningCriterion", type: "post", data: data.field,
                                                    success: function (result) {
                                                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                        GetWarningCriterion();
                                                    }, datatype: "json"
                                                });

                                                layer.close(warningcriterionaddlayerindex);
                                                return false;
                                            });

                                            form.render();
                                            form.render('select');
                                        }
                                        , end: function () {
                                            warningcriterionaddlayerindex = null;
                                        }
                                    });
                                    break;
                            };
                        });

                        var warningcriterionviewlayerindex = null;
                        var warningcriterioneditlayerindex = null;
                        //判据操作
                        table.on('tool(warningcriterion)', function (obj) {
                            if (obj.event === 'warningcriterionview') {
                                if (warningcriterionviewlayerindex != null) {
                                    layer.close(warningcriterionviewlayerindex);
                                    warningcriterionviewlayerindex = null;
                                }

                                warningcriterionviewlayerindex = layer.open({
                                    type: 1
                                    , title: ['查看预警判据', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                                    , area: ['600px', '500px']
                                    , shade: 0
                                    , offset: 'auto'
                                    , closeBtn: 1
                                    , maxmin: true
                                    , moveOut: true
                                    , content: '<!--查看判据--><form class="layui-form" action="" lay-filter="criterionviewform" style="margin-top:10px;margin-right:10px;"><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">判据名称</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="pjmc" class="layui-input" readonly="readonly"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">预警级别</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="yjjb" class="layui-input" readonly="readonly"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">灾害体</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="zht" class="layui-input" readonly="readonly"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">监测点</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="jcd" class="layui-input" readonly="readonly"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;padding-top:50px;">判据公式</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="pjgs" class="layui-textarea" style="min-height:120px!important;" readonly="readonly"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;padding-top:25px;">描述</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="ms" class="layui-textarea" style="min-height:70px!important;" readonly="readonly"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">备注</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="bz" class="layui-input" readonly="readonly"></div></div></form>'
                                    , zIndex: layer.zIndex
                                    , success: function (layero) {
                                        layer.setTop(layero);

                                        form.val("criterionviewform", {
                                            "pjmc": obj.data.pjmc
                                            , "yjjb": obj.data.yjjb
                                            , "zht": obj.data.zht
                                            , "jcd": obj.data.jcd
                                            , "pjgs": obj.data.pjgs
                                            , "ms": obj.data.ms
                                            , "bz": obj.data.bz
                                        });
                                    }
                                    , end: function () {
                                        warningcriterionviewlayerindex = null;
                                    }
                                });
                            }
                            else if (obj.event === 'warningcriterionedit') {
                                if (warningcriterioneditlayerindex != null) {
                                    layer.close(warningcriterioneditlayerindex);
                                    warningcriterioneditlayerindex = null;
                                }

                                warningcriterioneditlayerindex = layer.open({
                                    type: 1
                                    , title: ['编辑预警判据', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                                    , area: ['800px', '800px']
                                    , shade: 0
                                    , offset: 'auto'
                                    , closeBtn: 1
                                    , maxmin: true
                                    , moveOut: true
                                    , content: '<!--编辑判据--><form class="layui-form" action="" lay-filter="criterion-edit-form" style="margin-top:10px;margin-right:10px;"><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">判据名称</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="pjmc" class="layui-input" lay-verify="required"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">预警级别</label><div class="layui-input-block" style="margin-left:90px;"><select id="criterion-yjjb-edit" name="yjjb" lay-filter="criterion-yjjb-edit" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">灾害体</label><div class="layui-input-block" style="margin-left:90px;"><select id="criterion-zht-edit" name="zht" lay-filter="criterion-zht-edit" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">监测点</label><div class="layui-input-block" style="margin-left:90px;"><select id="criterion-jcdc-edit" name="jcd" lay-filter="criterion-jcdc-edit" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-row"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><div class="layui-form-item"><label class="layui-form-label" style="width:60px;padding-top:105px;">监测阈值</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="jcyz" class="layui-textarea" style="min-height:232px!important"></textarea></div></div></div></div><div class="layui-col-xs6"><div class="grid-demo"><div class="layui-form-item"><label class="layui-form-label" style="width:60px;padding-top:105px;">判据项</label><div class="layui-input-block" style="margin-left:90px;height:230px;border:solid;border-color:#e6e6e6;border-width:1px;"><div id="pjxid"></div></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;padding-top:50px;">判据公式</label><div class="layui-input-block" style="margin-left:90px;"><textarea id="pjgsid" name="pjgs" class="layui-textarea" style="min-height:120px!important;" lay-verify="required"></textarea></div></div><div class="layui-form-item" style="margin-top:10px;"><div class="layui-input-block" style="margin-left:90px;"><button id="btnzkh" type="button" class="layui-btn layui-btn-primary layui-btn-sm"><i id="pjxzkh" style="font-size:14px!important;font-style:normal;">(</i></button><button id="btnykh" type="button" class="layui-btn layui-btn-primary layui-btn-sm"><i id="pjxykh" style="font-size:14px!important;font-style:normal;">)</i></button><button id="btnand" type="button" class="layui-btn layui-btn-primary layui-btn-sm"><i id="pjxand" style="font-size:14px!important;font-style:normal;">AND</i></button><button id="btnor" type="button" class="layui-btn layui-btn-primary layui-btn-sm"><i id="pjxor" style="font-size:14px!important;font-style:normal;">OR</i></button><button id="btndy" type="button" class="layui-btn layui-btn-primary layui-btn-sm"><i id="pjxdy" style="font-size:14px!important;font-style:normal;">></i></button><button id="btnxy" type="button" class="layui-btn layui-btn-primary layui-btn-sm"><i id="pjxxy" style="font-size:14px!important;font-style:normal;"><</i></button><button id="btndydy" type="button" class="layui-btn layui-btn-primary layui-btn-sm"><i id="pjxdydy" style="font-size:14px!important;font-style:normal;">>=</i></button><button id="btnxydy" type="button" class="layui-btn layui-btn-primary layui-btn-sm"><i id="pjxxydy" style="font-size:14px!important;font-style:normal;"><=</i></button><button id="btnbdy" type="button" class="layui-btn layui-btn-primary layui-btn-sm"><i id="pjxbdy" style="font-size:14px!important;font-style:normal;">!=</i></button></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;padding-top:25px;">描述</label><div class="layui-input-block" style="margin-left:90px;"><textarea name="ms" class="layui-textarea" style="min-height:70px!important;"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:60px;">备注</label><div class="layui-input-block" style="margin-left:90px;"><input type="text" name="bz" class="layui-input"></div></div><div class="layui-form-item" style="margin-bottom:10px"><div style="position:absolute;right:10px;bottom:10px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="criterioneditsave" style="width:100px">保存</button></div></div></form>'
                                    , zIndex: layer.zIndex
                                    , success: function (layero) {
                                        layer.setTop(layero);

                                        form.val("criterion-edit-form", {
                                            "pjmc": obj.data.pjmc
                                            , "pjgs": obj.data.pjgs
                                            , "ms": obj.data.ms
                                            , "bz": obj.data.bz
                                        });

                                        //渲染判据项
                                        tree.render({
                                            elem: '#pjxid'
                                            , id: 'pjid'
                                            , data: []
                                            , accordion: true
                                            , showLine: false
                                            , click: function (obj) {
                                                insertAtCursor(document.getElementById("pjgsid"), obj.data.title);
                                            }
                                        });

                                        //编辑判据-预警级别
                                        if (yjjbs.length > 0) {
                                            for (var i in yjjbs) {
                                                if (obj.data.yjjb == yjjbs[i].name) {
                                                    document.getElementById("criterion-yjjb-edit").innerHTML += '<option value="' + yjjbs[i].value + '" selected>' + yjjbs[i].name + '</option>';
                                                }
                                                else {
                                                    document.getElementById("criterion-yjjb-edit").innerHTML += '<option value="' + yjjbs[i].value + '">' + yjjbs[i].name + '</option>';
                                                }
                                            }
                                        }
                                        else {
                                            form.val("criterion-edit-form", {
                                                "yjjb": obj.data.yjjb
                                            });
                                        }

                                        //编辑判据-灾害体
                                        if (disasters.length > 0) {
                                            for (var i in disasters) {
                                                if (disasters[i].name == obj.data.zht) {
                                                    document.getElementById("criterion-zht-edit").innerHTML += '<option value="' + disasters[i].value + '" selected>' + disasters[i].name + '</option>';
                                                    SelectDisaster(disasters[i].value, obj.data.jcd);
                                                }
                                                else {
                                                    document.getElementById("criterion-zht-edit").innerHTML += '<option value="' + disasters[i].value + '">' + disasters[i].name + '</option>';
                                                }
                                            }
                                        }
                                        else {
                                            form.val("criterion-edit-form", {
                                                "zht": obj.data.zht
                                            });
                                        }

                                        function SelectDisaster(d, m) {
                                            document.getElementById("criterion-jcdc-edit").innerHTML = '<option value="">请选择</option>';

                                            if (d != "") {
                                                if (monitors.length > 0) {
                                                    for (var i in monitors) {
                                                        if (monitors[i].disaster == d) {
                                                            if (m != "") {
                                                                if (monitors[i].jcdbh == m) {
                                                                    document.getElementById("criterion-jcdc-edit").innerHTML += '<option value="' + monitors[i].id + '" selected>' + monitors[i].jcdbh + '</option>';

                                                                    //获取监测点阈值
                                                                    $.ajax({
                                                                        url: servicesurl + "/api/Warning/GetMonitorThreshold", type: "get", data: { "id": monitors[i].id, "cookie": document.cookie },
                                                                        success: function (result) {
                                                                            if (result == "") {
                                                                                form.val("criterion-edit-form", {
                                                                                    "jcyz": ""
                                                                                });
                                                                            }
                                                                            else {
                                                                                var monitorthresholddata = JSON.parse(result);
                                                                                form.val("criterion-edit-form", {
                                                                                    "jcyz": monitorthresholddata.YZ
                                                                                });
                                                                            }
                                                                        }, datatype: "json"
                                                                    });

                                                                    var pjdata = [];
                                                                    if (monitors[i].jcff == "裂缝") {
                                                                        if (lfpjs.length > 0) {
                                                                            for (var i in lfpjs) {
                                                                                var pj = new Object;
                                                                                pj.title = lfpjs[i].name;
                                                                                pjdata.push(pj);
                                                                            }
                                                                        }
                                                                    }
                                                                    else if (monitors[i].jcff == "倾角") {
                                                                        if (qjpjs.length > 0) {
                                                                            for (var i in qjpjs) {
                                                                                var pj = new Object;
                                                                                pj.title = qjpjs[i].name;
                                                                                pjdata.push(pj);
                                                                            }
                                                                        }
                                                                    }
                                                                    else if (monitors[i].jcff == "应力") {
                                                                        if (ylpjs.length > 0) {
                                                                            for (var i in ylpjs) {
                                                                                var pj = new Object;
                                                                                pj.title = ylpjs[i].name;
                                                                                pjdata.push(pj);
                                                                            }
                                                                        }
                                                                    }
                                                                    else {
                                                                        pjdata = [];
                                                                    }

                                                                    tree.reload('pjid', {
                                                                        data: pjdata
                                                                    });
                                                                }
                                                            }
                                                            else {
                                                                document.getElementById("criterion-jcdc-edit").innerHTML += '<option value="' + monitors[i].id + '">' + monitors[i].jcdbh + '</option>';
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                            form.render();
                                            form.render('select');
                                        };

                                        //编辑判据-灾害体切换
                                        form.on('select(criterion-zht-edit)', function (data) {
                                            SelectDisaster(data.value, "");

                                            form.val("criterion-edit-form", {
                                                "jcyz": ""
                                                , "pjgs": ""
                                                , "ms": ""
                                                , "bz": ""
                                            });

                                            tree.reload('pjid', {
                                                data: []
                                            });
                                        });

                                        //编辑判据-监测点切换
                                        form.on('select(criterion-jcdc-edit)', function (data) {
                                            if (data.value == "") {
                                                form.val("criterion-edit-form", {
                                                    "jcyz": ""
                                                    , "pjgs": ""
                                                    , "ms": ""
                                                    , "bz": ""
                                                });

                                                tree.reload('pjid', {
                                                    data: []
                                                });
                                            }
                                            else {
                                                var pjxs = [];
                                                for (var i in monitors) {
                                                    if (monitors[i].id == data.value) {
                                                        if (monitors[i].jcff == "裂缝") {
                                                            if (lfpjs.length > 0) {
                                                                for (var i in lfpjs) {
                                                                    var pj = new Object;
                                                                    pj.title = lfpjs[i].name;
                                                                    pjxs.push(pj);
                                                                }
                                                            }
                                                        }
                                                        else if (monitors[i].jcff == "倾角") {
                                                            if (qjpjs.length > 0) {
                                                                for (var i in qjpjs) {
                                                                    var pj = new Object;
                                                                    pj.title = qjpjs[i].name;
                                                                    pjxs.push(pj);
                                                                }
                                                            }
                                                        }
                                                        else if (monitors[i].jcff == "应力") {
                                                            if (ylpjs.length > 0) {
                                                                for (var i in ylpjs) {
                                                                    var pj = new Object;
                                                                    pj.title = ylpjs[i].name;
                                                                    pjxs.push(pj);
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            pjxs = [];
                                                        }
                                                    }
                                                }

                                                tree.reload('pjid', {
                                                    data: pjxs
                                                });

                                                //获取监测点阈值
                                                $.ajax({
                                                    url: servicesurl + "/api/Warning/GetMonitorThreshold", type: "get", data: { "id": data.value, "cookie": document.cookie },
                                                    success: function (result) {
                                                        if (result == "") {
                                                            form.val("criterion-edit-form", {
                                                                "jcyz": ""
                                                            });
                                                        }
                                                        else {
                                                            var monitorthresholddata = JSON.parse(result);
                                                            form.val("criterion-edit-form", {
                                                                "jcyz": monitorthresholddata.YZ
                                                            });
                                                        }
                                                    }, datatype: "json"
                                                });

                                            }
                                        });

                                        //判据项
                                        $("#btnzkh").on("click", function () {
                                            insertAtCursor(document.getElementById("pjgsid"), document.getElementById("pjxzkh").innerText);
                                        });
                                        $("#btnykh").on("click", function () {
                                            insertAtCursor(document.getElementById("pjgsid"), document.getElementById("pjxykh").innerText);
                                        });
                                        $("#btnand").on("click", function () {
                                            insertAtCursor(document.getElementById("pjgsid"), " " + document.getElementById("pjxand").innerText + " ");
                                        });
                                        $("#btnor").on("click", function () {
                                            insertAtCursor(document.getElementById("pjgsid"), " " + document.getElementById("pjxor").innerText + " ");
                                        });
                                        $("#btndy").on("click", function () {
                                            insertAtCursor(document.getElementById("pjgsid"), document.getElementById("pjxdy").innerText);
                                        });
                                        $("#btnxy").on("click", function () {
                                            insertAtCursor(document.getElementById("pjgsid"), document.getElementById("pjxxy").innerText);
                                        });
                                        $("#btndydy").on("click", function () {
                                            insertAtCursor(document.getElementById("pjgsid"), document.getElementById("pjxdydy").innerText);
                                        });
                                        $("#btnxydy").on("click", function () {
                                            insertAtCursor(document.getElementById("pjgsid"), document.getElementById("pjxxydy").innerTex);
                                        });
                                        $("#btnbdy").on("click", function () {
                                            insertAtCursor(document.getElementById("pjgsid"), document.getElementById("pjxbdy").innerText);
                                        });


                                        //TODO保存预警判据
                                        form.on('submit(criterioneditsave)', function (data) {
                                            data.field.id = obj.data.id;
                                            data.field.cookie = document.cookie;

                                            $.ajax({
                                                url: servicesurl + "/api/Warning/UpdateWarningCriterion", type: "put", data: data.field,
                                                success: function (result) {
                                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                    GetWarningCriterion();
                                                }, datatype: "json"
                                            });

                                            layer.close(warningcriterioneditlayerindex);
                                            return false;
                                        });

                                        form.render();
                                        form.render('select');
                                    }
                                    , end: function () {
                                        warningcriterioneditlayerindex = null;
                                    }
                                });
                            } else if (obj.event === 'warningcriteriondel') {
                                layer.confirm('是否删除?', { icon: 3, title: '消息', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                                    $.ajax({
                                        url: servicesurl + "/api/Warning/DeleteWarningCriterion", type: "delete", data: { "id": obj.data.id, "cookie": document.cookie },
                                        success: function (result) {
                                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                            GetWarningCriterion();
                                        }, datatype: "json"
                                    });

                                    obj.del();
                                    layer.close(index);
                                });
                            }
                        });


                        //预警模型
                        var warningmodelbluetabledata = [];
                        var warningmodelbluetable = table.render({
                            elem: '#warningmodel-blue-table'
                            , id: 'warningmodelbluetableid'
                            , title: '蓝色预警模型'
                            , skin: 'line'
                            , even: false
                            , page: {
                                layout: ['prev', 'page', 'next', 'count']
                            }
                            , limit: 10
                            , height: 500
                            , toolbar: '#addbluecriterion'
                            , defaultToolbar: []
                            , totalRow: false
                            , cols: [[
                                { field: 'id', title: 'ID', hide: true }
                                , { field: 'pjmc', title: '判据名称', width: 220, align: "left" }
                                , { field: 'jcd', title: '监测点', width: 80, align: "left" }
                                , { field: 'pjgs', title: '判据公式', align: "left" }
                                , { field: 'bz', title: '备注', hide: true, align: "left" }
                                , { fixed: 'right', width: 50, align: 'center', toolbar: '#table-toolbar-bluecriterion' }
                            ]]
                            , data: warningmodelbluetabledata
                        });

                        var warningmodelyellowtabledata = [];
                        var warningmodelyellowtable = table.render({
                            elem: '#warningmodel-yellow-table'
                            , id: 'warningmodelyellowtableid'
                            , title: '黄色预警模型'
                            , skin: 'line'
                            , even: false
                            , page: {
                                layout: ['prev', 'page', 'next', 'count']
                            }
                            , limit: 10
                            , height: 500
                            , toolbar: '#addyellowcriterion'
                            , defaultToolbar: []
                            , totalRow: false
                            , cols: [[
                                { field: 'id', title: 'ID', hide: true }
                                , { field: 'pjmc', title: '判据名称', width: 220, align: "left" }
                                , { field: 'jcd', title: '监测点', width: 80, align: "left" }
                                , { field: 'pjgs', title: '判据公式', align: "left" }
                                , { field: 'bz', title: '备注', hide: true, align: "left" }
                                , { fixed: 'right', width: 50, align: 'center', toolbar: '#table-toolbar-yellowcriterion' }
                            ]]
                            , data: warningmodelyellowtabledata
                        });

                        var warningmodelorangetabledata = [];
                        var warningmodelorangetable = table.render({
                            elem: '#warningmodel-orange-table'
                            , id: 'warningmodelorangetableid'
                            , title: '橙色预警模型'
                            , skin: 'line'
                            , even: false
                            , page: {
                                layout: ['prev', 'page', 'next', 'count']
                            }
                            , limit: 10
                            , height: 500
                            , toolbar: '#addorangecriterion'
                            , defaultToolbar: []
                            , totalRow: false
                            , cols: [[
                                { field: 'id', title: 'ID', hide: true }
                                , { field: 'pjmc', title: '判据名称', width: 220, align: "left" }
                                , { field: 'jcd', title: '监测点', width: 80, align: "left" }
                                , { field: 'pjgs', title: '判据公式', align: "left" }
                                , { field: 'bz', title: '备注', hide: true, align: "left" }
                                , { fixed: 'right', width: 50, align: 'center', toolbar: '#table-toolbar-orangecriterion' }
                            ]]
                            , data: warningmodelorangetabledata
                        });

                        var warningmodelredtabledata = [];
                        var warningmodelredtable = table.render({
                            elem: '#warningmodel-red-table'
                            , id: 'warningmodelredtableid'
                            , title: '红色预警模型'
                            , skin: 'line'
                            , even: false
                            , page: {
                                layout: ['prev', 'page', 'next', 'count']
                            }
                            , limit: 10
                            , height: 500
                            , toolbar: '#addredcriterion'
                            , defaultToolbar: []
                            , totalRow: false
                            , cols: [[
                                { field: 'id', title: 'ID', hide: true }
                                , { field: 'pjmc', title: '判据名称', width: 220, align: "left" }
                                , { field: 'jcd', title: '监测点', width: 80, align: "left" }
                                , { field: 'pjgs', title: '判据公式', align: "left" }
                                , { field: 'bz', title: '备注', hide: true, align: "left" }
                                , { fixed: 'right', width: 50, align: 'center', toolbar: '#table-toolbar-redcriterion' }
                            ]]
                            , data: warningmodelredtabledata
                        });

                        var warningmodelinfos = [];//预警模型信息
                        function GetWarningModel() {
                            $.ajax({
                                url: servicesurl + "/api/Warning/GetWarningModel", type: "get", data: { "id": projectid, "cookie": document.cookie },
                                success: function (data) {
                                    warningmodelinfos = [];
                                    document.getElementById("waringmodel-zht").innerHTML = '<option value="">请选择</option>';
                                    if (data == "") {

                                    }
                                    else {
                                        var warningmodelinfodata = JSON.parse(data);
                                        for (var i in warningmodelinfodata) {
                                            document.getElementById("waringmodel-zht").innerHTML += '<option value="' + warningmodelinfodata[i].Model.Id + '">' + warningmodelinfodata[i].Model.MXMC + '</option>';

                                            for (var j in warningmodelinfodata[i].Criterions) {
                                                var warningmodelinfo = new Object;
                                                warningmodelinfo.mxid = warningmodelinfodata[i].Model.Id;
                                                warningmodelinfo.mxmc = warningmodelinfodata[i].Model.MXMC;
                                                warningmodelinfo.yjtj = warningmodelinfodata[i].Model.YJTJ;
                                                warningmodelinfo.pjid = warningmodelinfodata[i].Criterions[j].Id;
                                                warningmodelinfo.pjmc = warningmodelinfodata[i].Criterions[j].PJMC;
                                                if (yjjbs.length > 0) {
                                                    for (var k in yjjbs) {
                                                        if (yjjbs[k].value == warningmodelinfodata[i].Criterions[j].YJJB) {
                                                            warningmodelinfo.yjjb = yjjbs[k].name;
                                                        }
                                                    }
                                                }
                                                warningmodelinfo.zht = warningmodelinfodata[i].Criterions[j].ZHT;
                                                if (monitors.length > 0) {
                                                    for (var k in monitors) {
                                                        if (monitors[k].id == warningmodelinfodata[i].Criterions[j].JCD) {
                                                            warningmodelinfo.jcd = monitors[k].jcdbh;
                                                        }
                                                    }
                                                }
                                                warningmodelinfo.pjgs = warningmodelinfodata[i].Criterions[j].PJGS;
                                                warningmodelinfo.ms = warningmodelinfodata[i].Criterions[j].MS;
                                                warningmodelinfo.bz = warningmodelinfodata[i].Criterions[j].BZ;

                                                warningmodelinfos.push(warningmodelinfo);
                                            }
                                        }
                                        form.render();
                                        form.render('select');
                                    }
                                }, datatype: "json"
                            });
                        };

                        //新增预警模型
                        form.on('submit(addwarningmodel)', function (data) {
                            var addwarningcmodellayerindex = layer.open({
                                type: 1
                                , title: ['新增预警模型', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                , area: ['800px', '650px']
                                , shade: 0
                                , offset: 'auto'
                                , closeBtn: 1
                                , maxmin: false
                                , moveOut: true
                                , content: '<!--新增预警模型--><form class="layui-form" action="" lay-filter="warningmodel-form-add" style="margin-top:10px;margin-right:10px;"><div class="layui-form-item"><label class="layui-form-label" style="width:90px;">预警模型名称</label><div class="layui-input-block" style="margin-left:120px;"><input type="text" name="mxmc" class="layui-input" lay-verify="required"></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:90px;">灾害体</label><div class="layui-input-block" style="margin-left:120px;"><select id="warningmodel-add-zht" name="zht" lay-filter="warningmodel-add-zht" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:90px;">预警判据</label><div class="layui-input-block" style="margin-left:120px;height:300px;border:solid;border-color:#e6e6e6;border-width:1px;"><div id="warningmodel-add-yjpj"></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:90px;">预警条件</label><div class="layui-input-block" style="margin-left:120px;"><select id="warningmodel-add-yjtj" name="yjtj" lay-filter="warningmodel-add-yjtj" lay-verify="required"><option value="">请选择</option></select></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:90px;padding-top:40px;">备注</label><div class="layui-input-block" style="margin-left:120px;"><textarea name="bz" class="layui-textarea" style="min-height:100px!important;"></textarea></div></div><div class="layui-form-item" style="margin-bottom:10px"><div style="position:absolute;right:10px;bottom:10px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="warningmodel-save" style="width:100px">保存</button></div></div></form>'
                                , zIndex: layer.zIndex
                                , success: function (layero) {
                                    layer.setTop(layero);

                                    var selectdisastercriterion = [];//灾害体选中预警判据
                                    var disastercriteriondata = [];//灾害体全部级别预警判据
                                    tree.render({
                                        elem: '#warningmodel-add-yjpj'
                                        , id: 'zhtyjpj'
                                        , data: disastercriteriondata
                                        , showCheckbox: true
                                        , accordion: false
                                        , showLine: false
                                        , oncheck: function (obj) {
                                            if (obj.data.type == "father") {
                                                for (var i in disastercriteriondata) {
                                                    if (disastercriteriondata[i].title == obj.data.title) {
                                                        for (var j in disastercriteriondata[i].children) {
                                                            if (obj.checked) {
                                                                if (selectdisastercriterion.length > 0) {
                                                                    if (selectdisastercriterion.indexOf(disastercriteriondata[i].children[j].id) == -1) {
                                                                        selectdisastercriterion.push(disastercriteriondata[i].children[j].id);
                                                                    }
                                                                }
                                                                else {
                                                                    selectdisastercriterion.push(disastercriteriondata[i].children[j].id);
                                                                }
                                                            }
                                                            else {
                                                                if (selectdisastercriterion.length > 0) {
                                                                    if (selectdisastercriterion.indexOf(disastercriteriondata[i].children[j].id) != -1) {
                                                                        RemoveByValue(selectdisastercriterion, disastercriteriondata[i].children[j].id);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            else if (obj.data.type == "son") {
                                                if (obj.checked) {
                                                    if (selectdisastercriterion.length > 0) {
                                                        if (selectdisastercriterion.indexOf(obj.data.id) == -1) {
                                                            selectdisastercriterion.push(obj.data.id);
                                                        }
                                                    }
                                                    else {

                                                        selectdisastercriterion.push(obj.data.id);
                                                    }

                                                }
                                                else {
                                                    if (selectdisastercriterion.length > 0) {
                                                        if (selectdisastercriterion.indexOf(obj.data.id) != -1) {
                                                            RemoveByValue(selectdisastercriterion, obj.data.id);
                                                        }
                                                    }
                                                }
                                            }

                                            //console.log(disastercriteriondata);
                                            //console.log(selectdisastercriterion);
                                        }
                                    });

                                    //新增预警模型-添加灾害体
                                    if (disasters.length > 0) {
                                        for (var i in disasters) {
                                            document.getElementById("warningmodel-add-zht").innerHTML += '<option value="' + disasters[i].value + '">' + disasters[i].name + '</option>';
                                        }
                                    }

                                    //新增预警模型-添加预警条件
                                    if (yjtjs.length > 0) {
                                        for (var i in yjtjs) {
                                            document.getElementById("warningmodel-add-yjtj").innerHTML += '<option value="' + yjtjs[i].value + '">' + yjtjs[i].name + '</option>';
                                        }
                                    }

                                    //新增预警模型-灾害体切换
                                    form.on('select(warningmodel-add-zht)', function (data) {
                                        selectdisastercriterion = [];

                                        if (data.value != "") {
                                            disastercriteriondata = [];
                                            var disastername = "";
                                            if (disasters.length > 0) {
                                                for (var i in disasters) {
                                                    if (disasters[i].value == data.value) {
                                                        disastername = disasters[i].name;
                                                    }
                                                }
                                            }

                                            for (var i in yjjbs) {
                                                var children = [];
                                                for (var j in warningcriteriontabledata) {
                                                    if ((warningcriteriontabledata[j].zht == disastername) && (warningcriteriontabledata[j].yjjb == yjjbs[i].name)) {
                                                        var pj = new Object;
                                                        pj.id = warningcriteriontabledata[j].id;
                                                        pj.title = warningcriteriontabledata[j].pjmc;
                                                        pj.type = "son";
                                                        children.push(pj);
                                                    }
                                                }

                                                var level = new Object;
                                                level.title = yjjbs[i].name;
                                                level.type = "father";
                                                level.children = children;
                                                if (children.length == 0) {
                                                    level.disabled = true;
                                                }
                                                disastercriteriondata.push(level);
                                            }

                                            tree.reload('zhtyjpj', { data: disastercriteriondata });
                                        }
                                        else {
                                            tree.reload('zhtyjpj', { data: [] });
                                        }
                                    });

                                    //保存预警模型
                                    form.on('submit(warningmodel-save)', function (data) {
                                        if (selectdisastercriterion.length > 0) {
                                            data.field.id = projectid;
                                            data.field.cookie = document.cookie;
                                            data.field.pjs = Array2String(selectdisastercriterion);
                                            $.ajax({
                                                url: servicesurl + "/api/Warning/AddWarningModel", type: "post", data: data.field,
                                                success: function (result) {
                                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                    GetWarningModel();
                                                }, datatype: "json"
                                            });

                                            layer.close(addwarningcmodellayerindex);
                                        }
                                        else {
                                            layer.msg('请先选择预警模型判据！', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        }

                                        return false;
                                    });

                                    form.render();
                                    form.render('select');
                                }
                                , end: function () {
                                    addwarningcmodellayerindex = null;
                                }
                            });

                            return false;
                        });

                        var curwarningmodelid = "";
                        var curwarningmodelname = "";
                        //预警模型切换
                        form.on('select(waringmodel-zht)', function (data) {
                            warningmodelbluetabledata = [];
                            warningmodelyellowtabledata = [];
                            warningmodelorangetabledata = [];
                            warningmodelredtabledata = [];

                            if (data.value == "") {
                                curwarningmodelid = "";
                                curwarningmodelname = "";
                                warningmodelbluetable.reload({ id: 'warningmodelbluetableid', data: [] });
                                warningmodelyellowtable.reload({ id: 'warningmodelyellowtableid', data: [] });
                                warningmodelorangetable.reload({ id: 'warningmodelorangetableid', data: [] });
                                warningmodelredtable.reload({ id: 'warningmodelredtableid', data: [] });
                            }
                            else {
                                curwarningmodelid = data.value;
                                curwarningmodelname = data.name;

                                if (warningmodelinfos.length > 0) {
                                    for (var i in warningmodelinfos) {
                                        if (warningmodelinfos[i].mxid == data.value) {
                                            var pj = new Object;
                                            pj.id = warningmodelinfos[i].pjid;
                                            pj.pjmc = warningmodelinfos[i].pjmc;
                                            pj.jcd = warningmodelinfos[i].jcd;
                                            pj.pjgs = warningmodelinfos[i].pjgs;
                                            pj.bz = warningmodelinfos[i].bz;

                                            if (warningmodelinfos[i].yjjb == "蓝色预警") {
                                                warningmodelbluetabledata.push(pj);
                                            }
                                            else if (warningmodelinfos[i].yjjb == "黄色预警") {
                                                warningmodelyellowtabledata.push(pj);
                                            }
                                            else if (warningmodelinfos[i].yjjb == "橙色预警") {
                                                warningmodelorangetabledata.push(pj);
                                            }
                                            else if (warningmodelinfos[i].yjjb == "红色预警") {
                                                warningmodelredtabledata.push(pj);
                                            }
                                        }
                                    }

                                    warningmodelbluetable.reload({ id: 'warningmodelbluetableid', data: warningmodelbluetabledata });
                                    warningmodelyellowtable.reload({ id: 'warningmodelyellowtableid', data: warningmodelyellowtabledata });
                                    warningmodelorangetable.reload({ id: 'warningmodelorangetableid', data: warningmodelorangetabledata });
                                    warningmodelredtable.reload({ id: 'warningmodelredtableid', data: warningmodelredtabledata });
                                }
                                else {
                                    warningmodelbluetable.reload({ id: 'warningmodelbluetableid', data: [] });
                                    warningmodelyellowtable.reload({ id: 'warningmodelyellowtableid', data: [] });
                                    warningmodelorangetable.reload({ id: 'warningmodelorangetableid', data: [] });
                                    warningmodelredtable.reload({ id: 'warningmodelredtableid', data: [] });
                                }
                            }
                        });

                        //添加蓝色判据
                        table.on('toolbar(warningmodel-blue-table)', function (obj) {
                            switch (obj.event) {
                                case 'addbluecriterion':
                                    if (curwarningmodelid == "") {
                                        layer.msg('请先选择预警模型！', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    }
                                    else {
                                        var addbluecriterionlayerindex = layer.open({
                                            type: 1
                                            , title: ['添加蓝色判据', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                            , area: ['600px', '420px']
                                            , shade: 0
                                            , offset: 'auto'
                                            , closeBtn: 1
                                            , maxmin: false
                                            , moveOut: true
                                            , content: '<!--添加预警模型蓝色判据--><form class="layui-form" action="" lay-filter="warningmodelcriterion-form-blue-add" style="margin-top:10px;margin-right:10px;"><div class="layui-form-item"><label class="layui-form-label" style="width:90px;padding-top:140px;">蓝色预警判据</label><div class="layui-input-block" style="margin-left:120px;height:300px;border:solid;border-color:#e6e6e6;border-width:1px;"><div id="warningmodelcriterion-add-blue-yjpj"></div></div></div><div class="layui-form-item" style="margin-bottom:10px"><div style="position:absolute;right:10px;bottom:10px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="warningmodelbluecriterion-save" style="width:100px">保存</button></div></div></form>'
                                            , zIndex: layer.zIndex
                                            , success: function (layero) {
                                                layer.setTop(layero);

                                                tree.render({
                                                    elem: '#warningmodelcriterion-add-blue-yjpj'
                                                    , id: 'blueyjpj'
                                                    , data: []
                                                    , showCheckbox: true
                                                    , accordion: false
                                                    , showLine: false
                                                });

                                                var warningmodeldisasterid = "";
                                                var warningmodelcriterionids = [];

                                                if (warningmodelinfos.length > 0) {
                                                    for (var i in warningmodelinfos) {
                                                        if (warningmodelinfos[i].mxid == curwarningmodelid) {
                                                            warningmodeldisasterid = warningmodelinfos[i].zht;
                                                            warningmodelcriterionids.push(warningmodelinfos[i].pjid);
                                                        }
                                                    }
                                                }

                                                var warningmodeldisastername = "";
                                                if (disasters.length > 0) {
                                                    for (var i in disasters) {
                                                        if (disasters[i].value == warningmodeldisasterid) {
                                                            warningmodeldisastername = disasters[i].name;
                                                        }
                                                    }
                                                }

                                                var bluepjs = [];
                                                if (warningcriteriontabledata.length > 0) {
                                                    for (var i in warningcriteriontabledata) {
                                                        if ((warningcriteriontabledata[i].zht == warningmodeldisastername) && (warningcriteriontabledata[i].yjjb == "蓝色预警") && (warningmodelcriterionids.indexOf(warningcriteriontabledata[i].id) == -1)) {
                                                            var bluepj = new Object;
                                                            bluepj.id = warningcriteriontabledata[i].id;
                                                            bluepj.title = warningcriteriontabledata[i].pjmc;
                                                            bluepjs.push(bluepj);
                                                        }
                                                    }
                                                }

                                                tree.reload('blueyjpj', {
                                                    data: bluepjs
                                                });

                                                //保存添加蓝色判据   
                                                form.on('submit(warningmodelbluecriterion-save)', function (data) {
                                                    data.field.id = curwarningmodelid;
                                                    data.field.cookie = document.cookie;

                                                    var selectpj = tree.getChecked('blueyjpj');

                                                    if (selectpj.length > 0) {
                                                        var selectpjids = [];
                                                        for (var i in selectpj) {
                                                            selectpjids.push(selectpj[i].id);
                                                        }

                                                        data.field.pjid = Array2String(selectpjids);

                                                        $.ajax({
                                                            url: servicesurl + "/api/Warning/UpdateWarningModelPlus", type: "put", data: data.field,
                                                            success: function (result) {
                                                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                                                for (var i in warningcriteriontabledata) {
                                                                    for (var j in selectpjids) {
                                                                        if (warningcriteriontabledata[i].id == selectpjids[j]) {
                                                                            var warningmodelinfo = new Object;
                                                                            warningmodelinfo.mxid = curwarningmodelid;
                                                                            warningmodelinfo.mxmc = curwarningmodelname;
                                                                            warningmodelinfo.yjtj = "";
                                                                            warningmodelinfo.pjid = selectpjids[j];
                                                                            warningmodelinfo.pjmc = warningcriteriontabledata[i].pjmc;
                                                                            warningmodelinfo.yjjb = warningcriteriontabledata[i].yjjb;
                                                                            warningmodelinfo.zht = warningcriteriontabledata[i].zht;
                                                                            warningmodelinfo.jcd = warningcriteriontabledata[i].jcd;
                                                                            warningmodelinfo.pjgs = warningcriteriontabledata[i].pjgs;
                                                                            warningmodelinfo.ms = warningcriteriontabledata[i].ms;
                                                                            warningmodelinfo.bz = warningcriteriontabledata[i].bz;
                                                                            warningmodelinfos.push(warningmodelinfo);

                                                                            var bluepjdata = new Object;
                                                                            bluepjdata.id = warningcriteriontabledata[i].id;
                                                                            bluepjdata.pjmc = warningcriteriontabledata[i].pjmc;
                                                                            bluepjdata.jcd = warningcriteriontabledata[i].jcd;
                                                                            bluepjdata.pjgs = warningcriteriontabledata[i].pjgs;
                                                                            bluepjdata.bz = warningcriteriontabledata[i].bz;
                                                                            warningmodelbluetabledata.push(bluepjdata);
                                                                        }
                                                                    }
                                                                }
                                                                warningmodelbluetable.reload({ id: 'warningmodelbluetableid', data: warningmodelbluetabledata });
                                                            }, datatype: "json"
                                                        });

                                                        layer.close(addbluecriterionlayerindex);
                                                    }

                                                    return false;
                                                });

                                                form.render();
                                                form.render('select');
                                            }
                                            , end: function () {
                                                addbluecriterionlayerindex = null;
                                            }
                                        });
                                    }
                                    break;
                            };
                        });
                        //添加黄色判据
                        table.on('toolbar(warningmodel-yellow-table)', function (obj) {
                            switch (obj.event) {
                                case 'addyellowcriterion':
                                    if (curwarningmodelid == "") {
                                        layer.msg('请先选择预警模型！', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    }
                                    else {
                                        var addyellowcriterionlayerindex = layer.open({
                                            type: 1
                                            , title: ['添加黄色判据', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                            , area: ['800px', '420px']
                                            , shade: 0
                                            , offset: 'auto'
                                            , closeBtn: 1
                                            , maxmin: false
                                            , moveOut: true
                                            , content: '<!--添加预警模型黄色判据--><form class="layui-form" action="" lay-filter="warningmodelcriterion-form-yellow-add" style="margin-top:10px;margin-right:10px;"><div class="layui-form-item"><label class="layui-form-label" style="width:90px;padding-top:140px;">黄色预警判据</label><div class="layui-input-block" style="margin-left:120px;height:300px;border:solid;border-color:#e6e6e6;border-width:1px;"><div id="warningmodelcriterion-add-yellow-yjpj"></div></div></div><div class="layui-form-item" style="margin-bottom:10px"><div style="position:absolute;right:10px;bottom:10px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="warningmodelyellowcriterion-save" style="width:100px">保存</button></div></div></form>'
                                            , zIndex: layer.zIndex
                                            , success: function (layero) {
                                                layer.setTop(layero);

                                                tree.render({
                                                    elem: '#warningmodelcriterion-add-yellow-yjpj'
                                                    , id: 'yellowyjpj'
                                                    , data: []
                                                    , showCheckbox: true
                                                    , accordion: false
                                                    , showLine: false
                                                });

                                                var warningmodeldisasterid = "";
                                                var warningmodelcriterionids = [];

                                                if (warningmodelinfos.length > 0) {
                                                    for (var i in warningmodelinfos) {
                                                        if (warningmodelinfos[i].mxid == curwarningmodelid) {
                                                            warningmodeldisasterid = warningmodelinfos[i].zht;
                                                            warningmodelcriterionids.push(warningmodelinfos[i].pjid);
                                                        }
                                                    }
                                                }

                                                var warningmodeldisastername = "";
                                                if (disasters.length > 0) {
                                                    for (var i in disasters) {
                                                        if (disasters[i].value == warningmodeldisasterid) {
                                                            warningmodeldisastername = disasters[i].name;
                                                        }
                                                    }
                                                }

                                                var yellowpjs = [];
                                                if (warningcriteriontabledata.length > 0) {
                                                    for (var i in warningcriteriontabledata) {
                                                        if ((warningcriteriontabledata[i].zht == warningmodeldisastername) && (warningcriteriontabledata[i].yjjb == "黄色预警") && (warningmodelcriterionids.indexOf(warningcriteriontabledata[i].id) == -1)) {
                                                            var yellowpj = new Object;
                                                            yellowpj.id = warningcriteriontabledata[i].id;
                                                            yellowpj.title = warningcriteriontabledata[i].pjmc;
                                                            yellowpjs.push(yellowpj);
                                                        }
                                                    }
                                                }

                                                tree.reload('yellowyjpj', {
                                                    data: yellowpjs
                                                });

                                                //保存添加黄色判据   
                                                form.on('submit(warningmodelyellowcriterion-save)', function (data) {
                                                    data.field.id = curwarningmodelid;
                                                    data.field.cookie = document.cookie;

                                                    var selectpj = tree.getChecked('yellowyjpj');

                                                    if (selectpj.length > 0) {
                                                        var selectpjids = [];
                                                        for (var i in selectpj) {
                                                            selectpjids.push(selectpj[i].id);
                                                        }

                                                        data.field.pjid = Array2String(selectpjids);

                                                        $.ajax({
                                                            url: servicesurl + "/api/Warning/UpdateWarningModelPlus", type: "put", data: data.field,
                                                            success: function (result) {
                                                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                                                for (var i in warningcriteriontabledata) {
                                                                    for (var j in selectpjids) {
                                                                        if (warningcriteriontabledata[i].id == selectpjids[j]) {
                                                                            var warningmodelinfo = new Object;
                                                                            warningmodelinfo.mxid = curwarningmodelid;
                                                                            warningmodelinfo.mxmc = curwarningmodelname;
                                                                            warningmodelinfo.yjtj = "";
                                                                            warningmodelinfo.pjid = selectpjids[j];
                                                                            warningmodelinfo.pjmc = warningcriteriontabledata[i].pjmc;
                                                                            warningmodelinfo.yjjb = warningcriteriontabledata[i].yjjb;
                                                                            warningmodelinfo.zht = warningcriteriontabledata[i].zht;
                                                                            warningmodelinfo.jcd = warningcriteriontabledata[i].jcd;
                                                                            warningmodelinfo.pjgs = warningcriteriontabledata[i].pjgs;
                                                                            warningmodelinfo.ms = warningcriteriontabledata[i].ms;
                                                                            warningmodelinfo.bz = warningcriteriontabledata[i].bz;
                                                                            warningmodelinfos.push(warningmodelinfo);

                                                                            var yellowpjdata = new Object;
                                                                            yellowpjdata.id = warningcriteriontabledata[i].id;
                                                                            yellowpjdata.pjmc = warningcriteriontabledata[i].pjmc;
                                                                            yellowpjdata.jcd = warningcriteriontabledata[i].jcd;
                                                                            yellowpjdata.pjgs = warningcriteriontabledata[i].pjgs;
                                                                            yellowpjdata.bz = warningcriteriontabledata[i].bz;
                                                                            warningmodelyellowtabledata.push(yellowpjdata);
                                                                        }
                                                                    }
                                                                }

                                                                warningmodelyellowtable.reload({ id: 'warningmodelyellowtableid', data: warningmodelyellowtabledata });
                                                            }, datatype: "json"
                                                        });

                                                        layer.close(addyellowcriterionlayerindex);
                                                    }

                                                    return false;
                                                });

                                                form.render();
                                                form.render('select');
                                            }
                                            , end: function () {
                                                addyellowcriterionlayerindex = null;
                                            }
                                        });
                                    }
                                    break;
                            };
                        });
                        //添加橙色判据
                        table.on('toolbar(warningmodel-orange-table)', function (obj) {
                            switch (obj.event) {
                                case 'addorangecriterion':
                                    if (curwarningmodelid == "") {
                                        layer.msg('请先选择预警模型！', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    }
                                    else {
                                        var addorangecriterionlayerindex = layer.open({
                                            type: 1
                                            , title: ['添加橙色判据', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                            , area: ['800px', '420px']
                                            , shade: 0
                                            , offset: 'auto'
                                            , closeBtn: 1
                                            , maxmin: false
                                            , moveOut: true
                                            , content: '<!--添加预警模型橙色判据--><form class="layui-form" action="" lay-filter="warningmodelcriterion-form-orange-add" style="margin-top:10px;margin-right:10px;"><div class="layui-form-item"><label class="layui-form-label" style="width:90px;padding-top:140px;">橙色预警判据</label><div class="layui-input-block" style="margin-left:120px;height:300px;border:solid;border-color:#e6e6e6;border-width:1px;"><div id="warningmodelcriterion-add-orange-yjpj"></div></div></div><div class="layui-form-item" style="margin-bottom:10px"><div style="position:absolute;right:10px;bottom:10px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="warningmodelorangecriterion-save" style="width:100px">保存</button></div></div></form>'
                                            , zIndex: layer.zIndex
                                            , success: function (layero) {
                                                layer.setTop(layero);

                                                tree.render({
                                                    elem: '#warningmodelcriterion-add-orange-yjpj'
                                                    , id: 'orangeyjpj'
                                                    , data: []
                                                    , showCheckbox: true
                                                    , accordion: false
                                                    , showLine: false
                                                });

                                                var warningmodeldisasterid = "";
                                                var warningmodelcriterionids = [];

                                                if (warningmodelinfos.length > 0) {
                                                    for (var i in warningmodelinfos) {
                                                        if (warningmodelinfos[i].mxid == curwarningmodelid) {
                                                            warningmodeldisasterid = warningmodelinfos[i].zht;
                                                            warningmodelcriterionids.push(warningmodelinfos[i].pjid);
                                                        }
                                                    }
                                                }

                                                var warningmodeldisastername = "";
                                                if (disasters.length > 0) {
                                                    for (var i in disasters) {
                                                        if (disasters[i].value == warningmodeldisasterid) {
                                                            warningmodeldisastername = disasters[i].name;
                                                        }
                                                    }
                                                }

                                                var orangepjs = [];
                                                if (warningcriteriontabledata.length > 0) {
                                                    for (var i in warningcriteriontabledata) {
                                                        if ((warningcriteriontabledata[i].zht == warningmodeldisastername) && (warningcriteriontabledata[i].yjjb == "橙色预警") && (warningmodelcriterionids.indexOf(warningcriteriontabledata[i].id) == -1)) {
                                                            var orangepj = new Object;
                                                            orangepj.id = warningcriteriontabledata[i].id;
                                                            orangepj.title = warningcriteriontabledata[i].pjmc;
                                                            orangepjs.push(orangepj);
                                                        }
                                                    }
                                                }

                                                tree.reload('orangeyjpj', {
                                                    data: orangepjs
                                                });

                                                //保存添加橙色判据   
                                                form.on('submit(warningmodelorangecriterion-save)', function (data) {
                                                    data.field.id = curwarningmodelid;
                                                    data.field.cookie = document.cookie;

                                                    var selectpj = tree.getChecked('orangeyjpj');

                                                    if (selectpj.length > 0) {
                                                        var selectpjids = [];
                                                        for (var i in selectpj) {
                                                            selectpjids.push(selectpj[i].id);
                                                        }

                                                        data.field.pjid = Array2String(selectpjids);

                                                        $.ajax({
                                                            url: servicesurl + "/api/Warning/UpdateWarningModelPlus", type: "put", data: data.field,
                                                            success: function (result) {
                                                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                                                for (var i in warningcriteriontabledata) {
                                                                    for (var j in selectpjids) {
                                                                        if (warningcriteriontabledata[i].id == selectpjids[j]) {
                                                                            var warningmodelinfo = new Object;
                                                                            warningmodelinfo.mxid = curwarningmodelid;
                                                                            warningmodelinfo.mxmc = curwarningmodelname;
                                                                            warningmodelinfo.yjtj = "";
                                                                            warningmodelinfo.pjid = selectpjids[j];
                                                                            warningmodelinfo.pjmc = warningcriteriontabledata[i].pjmc;
                                                                            warningmodelinfo.yjjb = warningcriteriontabledata[i].yjjb;
                                                                            warningmodelinfo.zht = warningcriteriontabledata[i].zht;
                                                                            warningmodelinfo.jcd = warningcriteriontabledata[i].jcd;
                                                                            warningmodelinfo.pjgs = warningcriteriontabledata[i].pjgs;
                                                                            warningmodelinfo.ms = warningcriteriontabledata[i].ms;
                                                                            warningmodelinfo.bz = warningcriteriontabledata[i].bz;
                                                                            warningmodelinfos.push(warningmodelinfo);

                                                                            var orangepjdata = new Object;
                                                                            orangepjdata.id = warningcriteriontabledata[i].id;
                                                                            orangepjdata.pjmc = warningcriteriontabledata[i].pjmc;
                                                                            orangepjdata.jcd = warningcriteriontabledata[i].jcd;
                                                                            orangepjdata.pjgs = warningcriteriontabledata[i].pjgs;
                                                                            orangepjdata.bz = warningcriteriontabledata[i].bz;
                                                                            warningmodelorangetabledata.push(orangepjdata);
                                                                        }
                                                                    }
                                                                }

                                                                warningmodelorangetable.reload({ id: 'warningmodelorangetableid', data: warningmodelorangetabledata });
                                                            }, datatype: "json"
                                                        });

                                                        layer.close(addorangecriterionlayerindex);
                                                    }

                                                    return false;
                                                });

                                                form.render();
                                                form.render('select');
                                            }
                                            , end: function () {
                                                addorangecriterionlayerindex = null;
                                            }
                                        });
                                    }
                                    break;
                            };
                        });
                        //添加红色判据
                        table.on('toolbar(warningmodel-red-table)', function (obj) {
                            switch (obj.event) {
                                case 'addredcriterion':
                                    if (curwarningmodelid == "") {
                                        layer.msg('请先选择预警模型！', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                    }
                                    else {
                                        var addredcriterionlayerindex = layer.open({
                                            type: 1
                                            , title: ['添加红色判据', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                                            , area: ['800px', '420px']
                                            , shade: 0
                                            , offset: 'auto'
                                            , closeBtn: 1
                                            , maxmin: false
                                            , moveOut: true
                                            , content: '<!--添加预警模型红色判据--><form class="layui-form" action="" lay-filter="warningmodelcriterion-form-red-add" style="margin-top:10px;margin-right:10px;"><div class="layui-form-item"><label class="layui-form-label" style="width:90px;padding-top:140px;">红色预警判据</label><div class="layui-input-block" style="margin-left:120px;height:300px;border:solid;border-color:#e6e6e6;border-width:1px;"><div id="warningmodelcriterion-add-red-yjpj"></div></div></div><div class="layui-form-item" style="margin-bottom:10px"><div style="position:absolute;right:10px;bottom:10px;"><button type="submit" class="layui-btn" lay-submit="" lay-filter="warningmodelredcriterion-save" style="width:100px">保存</button></div></div></form>'
                                            , zIndex: layer.zIndex
                                            , success: function (layero) {
                                                layer.setTop(layero);

                                                tree.render({
                                                    elem: '#warningmodelcriterion-add-red-yjpj'
                                                    , id: 'redyjpj'
                                                    , data: []
                                                    , showCheckbox: true
                                                    , accordion: false
                                                    , showLine: false
                                                });

                                                var warningmodeldisasterid = "";
                                                var warningmodelcriterionids = [];

                                                if (warningmodelinfos.length > 0) {
                                                    for (var i in warningmodelinfos) {
                                                        if (warningmodelinfos[i].mxid == curwarningmodelid) {
                                                            warningmodeldisasterid = warningmodelinfos[i].zht;
                                                            warningmodelcriterionids.push(warningmodelinfos[i].pjid);
                                                        }
                                                    }
                                                }

                                                var warningmodeldisastername = "";
                                                if (disasters.length > 0) {
                                                    for (var i in disasters) {
                                                        if (disasters[i].value == warningmodeldisasterid) {
                                                            warningmodeldisastername = disasters[i].name;
                                                        }
                                                    }
                                                }

                                                var redpjs = [];
                                                if (warningcriteriontabledata.length > 0) {
                                                    for (var i in warningcriteriontabledata) {
                                                        if ((warningcriteriontabledata[i].zht == warningmodeldisastername) && (warningcriteriontabledata[i].yjjb == "红色预警") && (warningmodelcriterionids.indexOf(warningcriteriontabledata[i].id) == -1)) {
                                                            var redpj = new Object;
                                                            redpj.id = warningcriteriontabledata[i].id;
                                                            redpj.title = warningcriteriontabledata[i].pjmc;
                                                            redpjs.push(redpj);
                                                        }
                                                    }
                                                }

                                                tree.reload('redyjpj', {
                                                    data: redpjs
                                                });

                                                //保存添加红色判据   
                                                form.on('submit(warningmodelredcriterion-save)', function (data) {
                                                    data.field.id = curwarningmodelid;
                                                    data.field.cookie = document.cookie;

                                                    var selectpj = tree.getChecked('redyjpj');

                                                    if (selectpj.length > 0) {
                                                        var selectpjids = [];
                                                        for (var i in selectpj) {
                                                            selectpjids.push(selectpj[i].id);
                                                        }

                                                        data.field.pjid = Array2String(selectpjids);

                                                        $.ajax({
                                                            url: servicesurl + "/api/Warning/UpdateWarningModelPlus", type: "put", data: data.field,
                                                            success: function (result) {
                                                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                                                for (var i in warningcriteriontabledata) {
                                                                    for (var j in selectpjids) {
                                                                        if (warningcriteriontabledata[i].id == selectpjids[j]) {
                                                                            var warningmodelinfo = new Object;
                                                                            warningmodelinfo.mxid = curwarningmodelid;
                                                                            warningmodelinfo.mxmc = curwarningmodelname;
                                                                            warningmodelinfo.yjtj = "";
                                                                            warningmodelinfo.pjid = selectpjids[j];
                                                                            warningmodelinfo.pjmc = warningcriteriontabledata[i].pjmc;
                                                                            warningmodelinfo.yjjb = warningcriteriontabledata[i].yjjb;
                                                                            warningmodelinfo.zht = warningcriteriontabledata[i].zht;
                                                                            warningmodelinfo.jcd = warningcriteriontabledata[i].jcd;
                                                                            warningmodelinfo.pjgs = warningcriteriontabledata[i].pjgs;
                                                                            warningmodelinfo.ms = warningcriteriontabledata[i].ms;
                                                                            warningmodelinfo.bz = warningcriteriontabledata[i].bz;
                                                                            warningmodelinfos.push(warningmodelinfo);

                                                                            var redpjdata = new Object;
                                                                            redpjdata.id = warningcriteriontabledata[i].id;
                                                                            redpjdata.pjmc = warningcriteriontabledata[i].pjmc;
                                                                            redpjdata.jcd = warningcriteriontabledata[i].jcd;
                                                                            redpjdata.pjgs = warningcriteriontabledata[i].pjgs;
                                                                            redpjdata.bz = warningcriteriontabledata[i].bz;
                                                                            warningmodelredtabledata.push(redpjdata);
                                                                        }
                                                                    }
                                                                }

                                                                warningmodelredtable.reload({ id: 'warningmodelredtableid', data: warningmodelredtabledata });
                                                            }, datatype: "json"
                                                        });

                                                        layer.close(addredcriterionlayerindex);
                                                    }

                                                    return false;
                                                });

                                                form.render();
                                                form.render('select');
                                            }
                                            , end: function () {
                                                addredcriterionlayerindex = null;
                                            }
                                        });
                                    }
                                    break;
                            };
                        });

                        //删除蓝色判据
                        table.on('tool(warningmodel-blue-table)', function (obj) {
                            if (obj.event === 'bluecriteriondel') {
                                layer.confirm('是否删除?', { icon: 3, title: '消息', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                                    $.ajax({
                                        url: servicesurl + "/api/Warning/UpdateWarningModelLess", type: "put", data: { "id": obj.data.id, "modelid": curwarningmodelid, "cookie": document.cookie },
                                        success: function (result) {
                                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        }, datatype: "json"
                                    });

                                    var deldata = null;
                                    for (var i in warningmodelinfos) {
                                        if (warningmodelinfos[i].pjid == obj.data.id) {
                                            deldata = warningmodelinfos[i];
                                        }
                                    }
                                    RemoveByValue(warningmodelinfos, deldata);

                                    obj.del();
                                    layer.close(index);
                                });
                            }
                        });
                        //删除黄色判据
                        table.on('tool(warningmodel-yellow-table)', function (obj) {
                            if (obj.event === 'yellowcriteriondel') {
                                layer.confirm('是否删除?', { icon: 3, title: '消息', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                                    $.ajax({
                                        url: servicesurl + "/api/Warning/UpdateWarningModelLess", type: "put", data: { "id": obj.data.id, "modelid": curwarningmodelid, "cookie": document.cookie },
                                        success: function (result) {
                                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        }, datatype: "json"
                                    });

                                    var deldata = null;
                                    for (var i in warningmodelinfos) {
                                        if (warningmodelinfos[i].pjid == obj.data.id) {
                                            deldata = warningmodelinfos[i];
                                        }
                                    }
                                    RemoveByValue(warningmodelinfos, deldata);

                                    obj.del();
                                    layer.close(index);
                                });
                            }
                        });
                        //删除橙色判据
                        table.on('tool(warningmodel-orange-table)', function (obj) {
                            if (obj.event === 'orangecriteriondel') {
                                layer.confirm('是否删除?', { icon: 3, title: '消息', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                                    $.ajax({
                                        url: servicesurl + "/api/Warning/UpdateWarningModelLess", type: "put", data: { "id": obj.data.id, "modelid": curwarningmodelid, "cookie": document.cookie },
                                        success: function (result) {
                                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        }, datatype: "json"
                                    });

                                    var deldata = null;
                                    for (var i in warningmodelinfos) {
                                        if (warningmodelinfos[i].pjid == obj.data.id) {
                                            deldata = warningmodelinfos[i];
                                        }
                                    }
                                    RemoveByValue(warningmodelinfos, deldata);

                                    obj.del();
                                    layer.close(index);
                                });
                            }
                        });
                        //删除红色判据
                        table.on('tool(warningmodel-red-table)', function (obj) {
                            if (obj.event === 'redcriteriondel') {
                                layer.confirm('是否删除?', { icon: 3, title: '消息', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                                    $.ajax({
                                        url: servicesurl + "/api/Warning/UpdateWarningModelLess", type: "put", data: { "id": obj.data.id, "modelid": curwarningmodelid, "cookie": document.cookie },
                                        success: function (result) {
                                            layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                        }, datatype: "json"
                                    });

                                    var deldata = null;
                                    for (var i in warningmodelinfos) {
                                        if (warningmodelinfos[i].pjid == obj.data.id) {
                                            deldata = warningmodelinfos[i];
                                        }
                                    }
                                    RemoveByValue(warningmodelinfos, deldata);

                                    obj.del();
                                    layer.close(index);
                                });
                            }
                        });


                        //信息发布
                        var warninginfopushtabledata = [];
                        var warninginfopush = new Object;
                        warninginfopush.id = 1;
                        warninginfopush.fbfs = "企业微信";
                        warninginfopush.fbdx = "107地质队";
                        warninginfopush.fbtd = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=b78ce41d-2bc1-4a2c-81fc-44dedf0198e0";
                        warninginfopush.bz = "";
                        warninginfopushtabledata.push(warninginfopush);

                        table.render({
                            elem: '#warninginfopushid'
                            , id: 'warninginfopushtableid'
                            , title: '预警信息发布'
                            , skin: 'line'
                            , even: false
                            , page: {
                                layout: ['prev', 'page', 'next', 'count']
                            }
                            , limit: 10
                            , height: 690
                            , toolbar: '#addwarninginfopush'
                            , defaultToolbar: []
                            , totalRow: false
                            , cols: [[
                                { field: 'id', title: 'ID', hide: true }
                                , { field: 'fbfs', title: '发布方式', width: 80, align: "left" }
                                , { field: 'fbdx', title: '发布对象', width: 80, align: "left" }
                                , { field: 'fbtd', title: '发布通道', align: "left" }
                                , { field: 'bz', title: '备注', align: "left", hide: true }
                                , { fixed: 'right', width: 50, align: 'center', toolbar: '#table-toolbar-warninginfopush' }
                            ]]
                            , data: warninginfopushtabledata
                        });


                        form.render();
                        form.render('select');
                        form.render('radio');
                    }
                    , end: function () {
                        //关闭
                        warninganalysislayerindex = null;
                    }
                });
            }
        }
    }
};


//插入文本（引用）
function insertAtCursor(myField, myValue) {
    //IE 浏览器
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        sel.select();
    }

    //FireFox、Chrome等
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;

        // 保存滚动条
        var restoreTop = myField.scrollTop;
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);

        if (restoreTop > 0) {
            myField.scrollTop = restoreTop;
        }

        myField.focus();
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
    } else {
        myField.value += myValue;
        myField.focus();
    }
};


//删除数值指定元素
function RemoveByValue(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
};


//数组转字符串
function Array2String(arr) {
    if (arr.length > 0) {
        var r = "";
        for (var i = 0; i < arr.length - 1; i++) {
            r += arr[i] + ",";
        }
        r += arr[arr.length - 1];
        return r;
    }
    else {
        return "";
    }
};



//告警管理模块
var gaoJinManaglayerindex = null;
var addyuZhilayerindex = null;
var yueZhitable = null;
var GaoJingtable = null;
var monitorYuZhiTableData = [];//装数据
var monitorGaoJinTableData = [];//装告警数据
function gaoJinManagLayer(projectid) {
    if (projectid == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    if (currentprojectmonitors.length == 0) {
        layer.msg("请稍等项目加载！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        return;
    }
    else {
        if (gaoJinManaglayerindex == null) {
            gaoJinManaglayerindex = layer.open({
                type: 1
                , title: ['告警管理', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['980px', '700px']
                , shade: 0
                , offset: ['60px', '400px']
                , id:'gaoJinlayer'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content:gaoJinHtml
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    form.render();
                    //获取监测点，获取已设置的阈值。
                    GetLaryMonitorYueZhi(projectid);
                    GetLaryMonitorGaoJing(projectid);
                }
                , end: function () {
                    gaoJinManaglayerindex = null;
                    yueZhitable = null;
                    GaoJingtable = null;
                }
            });
            //设备巡查


        } else {
            layer.msg("已打开无人机宏观地质巡查", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
    }
}

function GetLaryMonitorYueZhi(id) {
   
    //请求监测点指点时间范围数据
    
    //阈值信息分类展示
  
    $("#btn-wi-gnss").on("click", function () {
        xuanRanTable(id, "0")
    });
    $("#btn-wi-lf").on("click", function () {
        xuanRanTable(id, "1");
    });
    $("#btn-wi-sbwy").on("click", function () {
        xuanRanTable(id, "4")
    });
    $("#btn-wi-yili").on("click", function () {
        xuanRanTable(id, "3")
    });
    $("#btn-wi-qj").on("click", function () {
        xuanRanTable(id, "2")
    });
    $("#btn-wi-dxsw").on("click", function () {
        xuanRanTable(id, "5")
    });
    function DisplayYuZhiInfo(type, wis) {
        if (wis.length > 0) {
            if (type == "") {
                yueZhitable.reload({ id: 'yueZhitableviewid', data: wis });
            }
            else if (type == "0") {//gnss
                var blues = [];
                for (var i in wis) {
                    if (wis[i].jcff == type) {
                        blues.push(wis[i]);
                    }
                }
                yueZhitable.reload({ id: 'yueZhitableviewid', data: blues });
            }
            else if (type == "1") {//裂缝
                var yellows = [];
                for (var i in wis) {
                    if (wis[i].jcff == type) {
                        yellows.push(wis[i]);
                    }
                }
                yueZhitable.reload({ id: 'yueZhitableviewid', data: yellows });
            }
            else if (type == "2") {//倾角
                var oranges = [];
                for (var i in wis) {
                    if (wis[i].jcff == type) {
                        oranges.push(wis[i]);
                    }
                }
                yueZhitable.reload({ id: 'yueZhitableviewid', data: oranges });
            }
            else if (type == "3") {//应力
                var reds = [];
                for (var i in wis) {
                    if (wis[i].jcff == type) {
                        reds.push(wis[i]);
                    }
                }
                yueZhitable.reload({ id: 'yueZhitableviewid', data: reds });
            } else if (type == "4") {//深部位移
                var reds = [];
                for (var i in wis) {
                    if (wis[i].jcff == type) {
                        reds.push(wis[i]);
                    }
                }
                yueZhitable.reload({ id: 'yueZhitableviewid', data: reds });
            } else if (type == "5") {//地下水位
                var reds = [];
                for (var i in wis) {
                    if (wis[i].jcff == type) {
                        reds.push(wis[i]);
                    }
                }
                yueZhitable.reload({ id: 'yueZhitableviewid', data: reds });
            }
        }
    };


    table.on('tool(yueZhitable-view)', function (obj) {
        console.log(obj);
        if (obj.event === 'detail') {
        } else if (obj.event === 'delete') {
            layer.confirm('确认删除' + obj.data.jcdbh + '的阈值信息?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                var loadingminindex = layer.load(0, { shade: 0.3, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
                $.ajax({
                    url: servicesurl + "/api/PatrolEquipment/DeleteYuZhiInfo", type: "delete", data: { "id": obj.data.yueZhiId },
                    success: function (result) {
                        layer.close(loadingminindex);
                        var res = JSON.parse(result);
                        if (res.code == 1) {//成功
                            layer.msg("删除成功", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            GetMonitorYueZhi(id, obj.data.jcff);
                        } else {
                            layer.msg(res.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        }
                    }, datatype: "json"
                });
            });
        } else if (obj.event === 'add') {
            var data = obj.data;
          
            if (data.backTrack.length==0) {
                layer.msg('请输入' + data.jcdbh + "的回溯时长！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                return;
            }
            if (isNaN(data.backTrack) || parseInt(data.backTrack) <= 0) {
                layer.msg(data.jcdbh+'的回溯时长应该为正整数', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                return;
            }
            var sendData = {
                monitorId: data.id,//监测点id
                projectId: id,//羡慕id
                backTrack: parseInt(data.backTrack),//
                monitorType: data.jcff,

            };
            if (data.jcff == '0') {
                if (data.yueZhiOne.length == 0) {
                    layer.msg('请输入' + data.jcdbh + "的水平位移阈值！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    return;
                }
                if (isNaN(data.yueZhiOne) || parseFloat(data.yueZhiOne) <= 0) {
                    layer.msg(data.jcdbh + '的水平位移阈值应该为正数', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    return;
                }
                if (data.yueZhiTwo.length == 0) {
                    layer.msg('请输入' + data.jcdbh + "的垂直位移阈值！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    return;
                }
                if (isNaN(data.yueZhiTwo) || parseFloat(data.yueZhiTwo) <= 0) {
                    layer.msg(data.jcdbh + '的垂直位移阈值应该为正数', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    return;
                }
                sendData.yueZhiOne = parseFloat(data.yueZhiOne);
                sendData.yueZhiTwo = parseFloat(data.yueZhiTwo);
                
            } else if (data.jcff == '1') {//裂缝
                if (data.yueZhiOne.length == 0) {
                    layer.msg('请输入' + data.jcdbh + "的裂缝阈值！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    return;
                }
                if (isNaN(data.yueZhiOne) || parseFloat(data.yueZhiOne) <= 0) {
                    layer.msg(data.jcdbh + '的裂缝阈值应该为正数', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    return;
                }
                sendData.yueZhiOne = parseFloat(data.yueZhiOne);
            } else if (data.jcff == '2') {//倾斜
                if (data.yueZhiOne.length == 0) {
                    layer.msg('请输入' + data.jcdbh + "的X方向阈值！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    return;
                }
                if (isNaN(data.yueZhiOne) || parseFloat(data.yueZhiOne) <= 0) {
                    layer.msg(data.jcdbh + '的X方向阈值应该为正数', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    return;
                }
                if (data.yueZhiTwo.length == 0) {
                    layer.msg('请输入' + data.jcdbh + "的Y方向阈值！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    return;
                }
                if (isNaN(data.yueZhiTwo) || parseFloat(data.yueZhiTwo) <= 0) {
                    layer.msg(data.jcdbh + '的Y方向阈值应该为正数', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    return;
                }
                //阈值三可设置，也可以不设置
                if (data.yueZhiThree.length>0&&(isNaN(data.yueZhiThree) || parseFloat(data.yueZhiThree) <= 0)) {
                    layer.msg(data.jcdbh + '的Z方向阈值应该为正数', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    return;
                }
                sendData.yueZhiOne = parseFloat(data.yueZhiOne);
                sendData.yueZhiTwo = parseFloat(data.yueZhiTwo);
                if (data.yueZhiThree.length > 0) {
                    sendData.yueZhiThree = parseFloat(data.yueZhiThree);
                }
            } else if (data.jcff == '3') {//应力
                if (data.yueZhiOne.length == 0) {
                    layer.msg('请输入' + data.jcdbh + "的应力阈值！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    return;
                }
                if (isNaN(data.yueZhiOne) || parseFloat(data.yueZhiOne) <= 0) {
                    layer.msg(data.jcdbh + '的应力阈值应该为正数', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    return;
                }
                sendData.yueZhiOne = parseFloat(data.yueZhiOne);
            } else if (data.jcff == '4') {
                if (data.yueZhiOne.length == 0) {
                    layer.msg('请输入' + data.jcdbh + "的X方向阈值！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    return;
                }
                if (isNaN(data.yueZhiOne) || parseFloat(data.yueZhiOne) <= 0) {
                    layer.msg(data.jcdbh + '的X方向阈值应该为正数', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    return;
                }
                if (data.yueZhiTwo.length == 0) {
                    layer.msg('请输入' + data.jcdbh + "的Y方向阈值！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    return;
                }
                if (isNaN(data.yueZhiTwo) || parseFloat(data.yueZhiTwo) <= 0) {
                    layer.msg(data.jcdbh + '的Y方向阈值应该为正数', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    return;
                }
                sendData.yueZhiOne = parseFloat(data.yueZhiOne);
                sendData.yueZhiTwo = parseFloat(data.yueZhiTwo);
            } else if (data.jcff == '5') {
                if (data.yueZhiOne.length == 0) {
                    layer.msg('请输入' + data.jcdbh + "的地下水位阈值！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    return;
                }
                if (isNaN(data.yueZhiOne) || parseFloat(data.yueZhiOne) <= 0) {
                    layer.msg(data.jcdbh + '的地下水位阈值应该为正数', { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    return;
                }
                sendData.yueZhiOne = parseFloat(data.yueZhiOne);
            }
            
            var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
            $.ajax({
                url: servicesurl + "/api/PatrolEquipment/updateMonitorAlarmThreshold", type: "post", data: sendData,
                success: function (result) {
                    layer.close(loadinglayerindex);
                    console.log(result);
                    var res = JSON.parse(result);
                    if (res.code == 1) {//成功
                        layer.msg("更新成功", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        GetMonitorYueZhi(id,data.jcff);
                    } else {
                        layer.msg(res.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }
                }, datatype: "json"
            });

        }
    });
    
    GetMonitorYueZhi(id,"")
}
function GetMonitorYueZhi(id,jcff) {
    var loadinglayerindex1 = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
    //请求监测点指点时间范围数据
    $.ajax({
        url: servicesurl + "/api/Data/GetMonitorYueZhi", type: "get", data: { "id": id, "jcff": jcff ,"cookie": document.cookie },
        success: function (data) {
            layer.close(loadinglayerindex1);
            monitorYuZhiTableData = JSON.parse(data);
            var allcount = monitorYuZhiTableData.length;
            var gnsscount = 0;
            var lfcount = 0;
            var sbwycount = 0;
            var yilicount = 0;
            var qjcount = 0;
            var dxswcount = 0;
            if (jcff == "") {//第一次进来查询
                for (var i in monitorYuZhiTableData) {
                    if (monitorYuZhiTableData[i].jcff == "0") {
                        gnsscount++;
                    }
                    else if (monitorYuZhiTableData[i].jcff == "1") {
                        lfcount++;
                    }
                    else if (monitorYuZhiTableData[i].jcff == "4") {
                        sbwycount++;
                    }
                    else if (monitorYuZhiTableData[i].jcff == "3") {
                        yilicount++;
                    }
                    else if (monitorYuZhiTableData[i].jcff == "2") {
                        qjcount++;
                    }
                    else if (monitorYuZhiTableData[i].jcff == "5") {
                        dxswcount++;
                    }
                }
                var chushiHuaFlag = true;
                if (gnsscount > 0) {
                    document.getElementById('warning-gnss-count').innerText = "(" + gnsscount + ")";
                    if (chushiHuaFlag) {
                        xuanRanTable(id, "0");
                        chushiHuaFlag = false;
                    }
                } else {
                    $("#btn-wi-gnss").hide();
                }
                if (lfcount > 0) {
                    document.getElementById('warning-lf-count').innerText = "(" + lfcount + ")";
                    if (chushiHuaFlag) {
                        xuanRanTable(id, "1");
                        chushiHuaFlag = false;
                    }
                } else {
                    $("#btn-wi-lf").hide();
                }
                if (sbwycount > 0) {
                    document.getElementById('warning-sbwy-count').innerText = "(" + sbwycount + ")";
                    if (chushiHuaFlag) {
                        xuanRanTable(id, "4");
                        chushiHuaFlag = false;
                    }
                } else {
                    $("#btn-wi-sbwy").hide();
                }
                if (yilicount > 0) {
                    document.getElementById('warning-yili-count').innerText = "(" + yilicount + ")";
                    if (chushiHuaFlag) {
                        xuanRanTable(id, "3");
                        chushiHuaFlag = false;
                    }
                } else {
                    $("#btn-wi-yili").hide();
                }
                if (qjcount > 0) {
                    document.getElementById('warning-qj-count').innerText = "(" + qjcount + ")";
                    if (chushiHuaFlag) {
                        xuanRanTable(id, "2");
                        chushiHuaFlag = false;
                    }
                } else {
                    $("#btn-wi-qj").hide();
                }
                if (dxswcount > 0) {
                    document.getElementById('warning-dxsw-count').innerText = "(" + dxswcount + ")";
                    if (chushiHuaFlag) {
                        xuanRanTable(id, "5");
                        chushiHuaFlag = false;
                    }
                } else {
                    $("#btn-wi-dxsw").hide();
                }
            } else {
                yueZhitable.reload({ id: 'yueZhitableviewid', data: monitorYuZhiTableData });
            }
            
            
        }, datatype: "json"
    });
}
function GetLaryMonitorGaoJing(id) {

    //请求监测点指点时间范围数据
    GaoJingtable = table.render({
        elem: '#GaoJingtable-view'
        , id: 'GaoJingtableviewid'
        , title: '斜坡信息'
        , skin: 'line'
        , even: false
        , page: true
        , limit: 10
        , totalRow: false
        , initSort: { field: 'id', type: 'desc' }
        , cols: [[
            { field: 'id', title: 'ID', hide: true }
            , { field: 'jcdbh', title: '监测点编号', width: 90, align: "center", }
            
            , {
                field: 'gaojinStatus', title: '告警内容', width: 340,  align: "center", templet: function (row) {
                    var x = row.gaojinContext.replace(/\<font\s*color=(.*?)\s*>/ig, "<font style=\"color:red\">");
                    var y = x.replace(/font/ig, "span")
                    console.log(y);
                    return y;
                }
            }
            , {
                field: 'gaojinStatus', title: '状态', width: 80, align: "center", templet: function (row) {
                    if (row.gaojinStatus == '0') {
                        return '<span style="color: red;">未处理</span>'
                    } else if (row.gaojinStatus == '1') {
                        return '<span style="color: green;">已处理</span>'
                    }
                }
            }
            , { field: 'gaojinResult', title: '处理结果', width: 120, edit: 'text', align: "center" }
            , { field: 'gaojinTime', title: '告警时间', width: 150, align: "center" }
            , { field: 'updateTime', title: '处理时间', width: 160, align: "center" }
            , { field: 'gaojinTime', title: '占位', width: 80, align: "center" }

            , { fixed: 'right', title: '操作', width: 80, align: 'center', toolbar: '#GaoJingChuButon' }
        ]]
        , data: []
    });

    table.on('tool(GaoJingtable-view)', function (obj) {
        console.log(obj);
        if (obj.event === 'add') {//处理
            var data = obj.data;

            if (data.gaojinResult.length == 0) {
                layer.msg('请输入' + data.jcdbh + "的处理结果！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                return;
            }
            
            var sendData = {
                id: data.id,//g告警信息的id
                gaojinResult: data.gaojinResult,//
            };
            var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
            $.ajax({
                url: servicesurl + "/api/PatrolEquipment/updategaoJinInfo", type: "post", data: sendData,
                success: function (result) {
                    layer.close(loadinglayerindex);
                    console.log(result);
                    var res = JSON.parse(result);
                    if (res.code == 1) {//成功
                        layer.msg("更新成功", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                        GetMonitorGaoJing(id);
                    } else {
                        layer.msg(res.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }
                }, datatype: "json"
            });

        }
    });
    $("#btn-gaojin-sum").on("click", function () {
        //DisplayGaoJinInfo("", monitorGaoJinTableData);
        GetMonitorGaoJing(id);//查总的就去数据库？
    });
    $("#btn-gaojin-wei").on("click", function () {
        DisplayGaoJinInfo("0", monitorGaoJinTableData);
    });
    $("#btn-gaojin-yi").on("click", function () {
        DisplayGaoJinInfo("1", monitorGaoJinTableData);
    });
    function DisplayGaoJinInfo(type, wis) {
        if (wis.length > 0) {
            if (type == "") {
                GaoJingtable.reload({ id: 'GaoJingtableviewid', data: wis });
            }
            else if (type == "0") {//gnss
                var blues = [];
                for (var i in wis) {
                    if (wis[i].gaojinStatus == type) {
                        blues.push(wis[i]);
                    }
                }
                GaoJingtable.reload({ id: 'GaoJingtableviewid', data: blues });
            }
            else if (type == "1") {//裂缝
                var yellows = [];
                for (var i in wis) {
                    if (wis[i].gaojinStatus == type) {
                        yellows.push(wis[i]);
                    }
                }
                GaoJingtable.reload({ id: 'GaoJingtableviewid', data: yellows });
            }
        }
    };

    GetMonitorGaoJing(id)
}
function GetMonitorGaoJing(id) {
    var loadinglayerindex1 = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });
    //请求监测点指点时间范围数据
    $.ajax({//string projectId, string monitorId,
        url: servicesurl + "/api/PatrolEquipment/getGaoJingInfo", type: "get", data: { "projectId": id, "monitorId": "", "id": "", gaoJinStatus:"" },
        success: function (data) {
            layer.close(loadinglayerindex1);
            monitorGaoJinTableData = JSON.parse(data);
            var allcount = monitorGaoJinTableData.length;
            var gnsscount = 0;
            var lfcount = 0;
            for (var i in monitorGaoJinTableData) {
                if (monitorGaoJinTableData[i].gaojinStatus == "0") {
                    gnsscount++;
                }
                else {
                    lfcount++;
                }

            }
            document.getElementById('gaojin-wei-count').innerText = gnsscount;
            document.getElementById('gaojin-yi-count').innerText = lfcount;
            document.getElementById('gaojin-sum-count').innerText = allcount;
            GaoJingtable.reload({ id: 'GaoJingtableviewid', data: monitorGaoJinTableData });
        }, datatype: "json"
    });
}
function openLayerAddYuZhi(data) {
    addyuZhilayerindex = layer.open({
        type: 1
        , title: [data.jcdbh+'阈值设置', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
        , area: data.jcff == '1' || data.jcff == '3' || data.jcff == '5' ? ['300px', '220px'] : ['300px', '320px']
        , offset: 'auto'
        , closeBtn: 1
        , id:'addyuZhilayerindexId'
        , maxmin: false
        , content: data.jcff == '1' || data.jcff == '3' || data.jcff == '5' ? addYuZhihtmlLieFeng : addYuZhihtmlGnss
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);

            form.val("addyuZhiform", {
                "backTrack": data.backTrack
                , "yueZhiOne": data.yueZhiOne
                , "yueZhiThree": data.yueZhiThree
                , "yueZhiTwo": data.yueZhiTwo
            });
            if (data.jcff == '1') {
                document.getElementById('labenameid').innerText = "裂缝阈值";
            } else if(data.jcff == '3') {
                document.getElementById('labenameid').innerText = "应力阈值";
            } else if(data.jcff == '5') {
                document.getElementById('labenameid').innerText = "地下水位";
            } else if (data.jcff == '0') {//
                document.getElementById('labenameid').innerText = "水平位移";
                document.getElementById('labenameidTwo').innerText = "垂直位移";
                $("#yueZhiThreeDiv").hide();
            } else if (data.jcff == '2') {
                document.getElementById('labenameid').innerText = "x方向";
                document.getElementById('labenameidTwo').innerText = "y方向";
            } else if (data.jcff == '4') {
                document.getElementById('labenameid').innerText = "x方向";
                document.getElementById('labenameidTwo').innerText = "y方向";
                $("#yueZhiThreeDiv").hide();
            }
            form.render();
            form.on('submit(addYuZhisubmit)', function (obj) {
                console.log(obj);
                //data.field.id = obj.data.id;
                //$.ajax({
                //    url: window.parent.servicesurl + "/api/Device/UpdateDevice", type: "put", data: data.field,
                //    success: function (result) {
                //        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                //        GetDeviceInfo();
                //    }, datatype: "json"
                //});

                //layer.close(addyuZhilayerindex);
                return false;
            });
        }
        , end: function () {
            addyuZhilayerindex = null;
        }
    });
}

function xuanRanTable(id,jcff) {
    if (jcff == "0") {
        yueZhitable = table.render({
            elem: '#yueZhitable-view'
            , id: 'yueZhitableviewid'
            , title: '斜坡信息'
            , skin: 'line'
            , even: false
            , page: true
            , limit: 10
            , totalRow: false
            , initSort: { field: 'id', type: 'desc' }
            , cols: [[
                { field: 'id', title: 'ID', hide: true }
                , { field: 'jcdbh', title: '监测点编号', width: 120, align: "center", }
                , { field: 'lastUpdateTime', title: '生效时间', width: 130, align: "center" }
                , { field: 'backTrack', title: '回溯时长(h)', width: 120, edit: 'text', align: "center" }
                , { field: 'yueZhiOne', title: '水平位移(mm)', width: 120, edit: 'text', align: "center" }
                , { field: 'yueZhiTwo', title: '垂直位移(mm)', width: 120, edit: 'text', align: "center" }
                , { field: 'yueZhiThree', title: '', width: 120, align: "center" }
                , { fixed: 'right', title: '操作', width: 120, align: 'center', toolbar: '#yuZhiChuButon' }
            ]]
            , data: []
        });
        GetMonitorYueZhi(id, "0");//查总的就去阈值
    } else if (jcff == "1") {
        yueZhitable = table.render({
            elem: '#yueZhitable-view'
            , id: 'yueZhitableviewid'
            , title: '斜坡信息'
            , skin: 'line'
            , even: false
            , page: true
            , limit: 10
            , totalRow: false
            , initSort: { field: 'id', type: 'desc' }
            , cols: [[
                { field: 'id', title: 'ID', hide: true }
                , { field: 'jcdbh', title: '监测点编号', width: 150, align: "center", }
                , { field: 'lastUpdateTime', title: '生效时间', width: 160, align: "center" }
                , { field: 'backTrack', title: '回溯时长(h)', width: 150, edit: 'text', align: "center" }
                , { field: 'yueZhiOne', title: '裂缝阈值(mm)', width: 150, edit: 'text', align: "center" }
                , { field: 'yueZhiThree', title: '', width: 120, align: "center" }
                , { fixed: 'right', title: '操作', width: 120, align: 'center', toolbar: '#yuZhiChuButon' }
            ]]
            , data: []
        });
        GetMonitorYueZhi(id, "1");//查总的就去阈值
    } else if (jcff == "2") {
        yueZhitable = table.render({
            elem: '#yueZhitable-view'
            , id: 'yueZhitableviewid'
            , title: '斜坡信息'
            , skin: 'line'
            , even: false
            , page: true
            , limit: 10
            , totalRow: false
            , initSort: { field: 'id', type: 'desc' }
            , cols: [[
                { field: 'id', title: 'ID', hide: true }
                , { field: 'jcdbh', title: '监测点编号', width: 120, align: "center", }
                , { field: 'lastUpdateTime', title: '生效时间', width: 130, align: "center" }
                , { field: 'backTrack', title: '回溯时长(h)', width: 90, edit: 'text', align: "center" }
                , { field: 'yueZhiOne', title: 'X方向(°)', width: 90, edit: 'text', align: "center" }
                , { field: 'yueZhiTwo', title: 'Y方向(°)', width: 90, edit: 'text', align: "center" }
                , { field: 'yueZhiThree', title: 'Z方向(°)', width: 90, edit: 'text', align: "center" }
                , { field: '', title: '', width: 120, align: "center" }
                , { fixed: 'right', title: '操作', width: 120, align: 'center', toolbar: '#yuZhiChuButon' }
            ]]
            , data: []
        });
        GetMonitorYueZhi(id, "2");//查总的就去阈值
    } else if (jcff == "3") {
        yueZhitable = table.render({
            elem: '#yueZhitable-view'
            , id: 'yueZhitableviewid'
            , title: '斜坡信息'
            , skin: 'line'
            , even: false
            , page: true
            , limit: 10
            , totalRow: false
            , initSort: { field: 'id', type: 'desc' }
            , cols: [[
                { field: 'id', title: 'ID', hide: true }
                , { field: 'jcdbh', title: '监测点编号', width: 150, align: "center", }
                , { field: 'lastUpdateTime', title: '生效时间', width: 160, align: "center" }
                , { field: 'backTrack', title: '回溯时长(h)', width: 150, edit: 'text', align: "center" }
                , { field: 'yueZhiOne', title: '应力阈值(mm)', width: 150, edit: 'text', align: "center" }
                , { field: 'yueZhiThree', title: '', width: 120, align: "center" }
                , { fixed: 'right', title: '操作', width: 120, align: 'center', toolbar: '#yuZhiChuButon' }
            ]]
            , data: []
        });
        GetMonitorYueZhi(id, "3");//查总的就去阈值
    } else if (jcff == "4") {

        yueZhitable = table.render({
            elem: '#yueZhitable-view'
            , id: 'yueZhitableviewid'
            , title: '斜坡信息'
            , skin: 'line'
            , even: false
            , page: true
            , limit: 10
            , totalRow: false
            , initSort: { field: 'id', type: 'desc' }
            , cols: [[
                { field: 'id', title: 'ID', hide: true }
                , { field: 'jcdbh', title: '监测点编号', width: 120, align: "center", }
                , { field: 'lastUpdateTime', title: '生效时间', width: 130, align: "center" }
                , { field: 'backTrack', title: '回溯时长(h)', width: 120, edit: 'text', align: "center" }
                , { field: 'yueZhiOne', title: 'X方向(mm)', width: 120, edit: 'text', align: "center" }
                , { field: 'yueZhiTwo', title: 'Y方向(mm)', width: 120, edit: 'text', align: "center" }
                , { field: 'yueZhiThree', title: '', width: 120, align: "center" }
                , { fixed: 'right', title: '操作', width: 120, align: 'center', toolbar: '#yuZhiChuButon' }
            ]]
            , data: []
        });
        GetMonitorYueZhi(id, "4");//查总的就去阈值
    } else if (jcff == "5") {
        yueZhitable = table.render({
            elem: '#yueZhitable-view'
            , id: 'yueZhitableviewid'
            , title: '斜坡信息'
            , skin: 'line'
            , even: false
            , page: true
            , limit: 10
            , totalRow: false
            , initSort: { field: 'id', type: 'desc' }
            , cols: [[
                { field: 'id', title: 'ID', hide: true }
                , { field: 'jcdbh', title: '监测点编号', width: 150, align: "center", }
                , { field: 'lastUpdateTime', title: '生效时间', width: 160, align: "center" }
                , { field: 'backTrack', title: '回溯时长(h)', width: 150, edit: 'text', align: "center" }
                , { field: 'yueZhiOne', title: '地下水位(m)', width: 150, edit: 'text', align: "center" }
                , { field: 'yueZhiThree', title: '', width: 120, align: "center" }
                , { fixed: 'right', title: '操作', width: 120, align: 'center', toolbar: '#yuZhiChuButon' }
            ]]
            , data: []
        });
        GetMonitorYueZhi(id, "5");//查总的就去阈值
    }
}

var gaoJinHtml = "    <div class='layui-tab layui-tab-brief' lay-filter='docDemoTabBriefitem' style='margin:0px;'>                                                             "
    + "        <ul class='layui-tab-title' style='float: left;width:120px;border-color:white;'>                                                                     "
    + "            <li lay-id='111' class='layui-this' style='display: block;'>阈值设置</li>                                                                                     "
    + "            <li lay-id='222' style='display: block;'>告警处理</li>                                                                                                        "
    + "        </ul>                                                                                                                                                "
    + "                                                                                                                                                             "
    + "        <div class='layui-tab-content' id='xunShiDiv' style='margin-left:120px;height:600px;border-left:solid;border-left-color:#e6e6e6;border-left-width:1px;'>      "
    + "            <div class='layui-tab-item layui-show'>                                                                                                           "
    + "			<div style='margin-top: 15px;margin-bottom:15px'>                                                                                                                              "
    + "				<button id='btn-wi-gnss' type='button' class='layui-btn layui-btn-blue' style='height:50px;'>GNSS监测  <span id='warning-gnss-count'></span></button>       "
    + "				<button id='btn-wi-lf' type='button' class='layui-btn layui-btn-yellow' style='height:50px;'>裂缝监测  <span id='warning-lf-count'></span></button> "
    + "				<button id='btn-wi-sbwy' type='button' class='layui-btn layui-btn-orange' style='height:50px;'>深部位移  <span id='warning-sbwy-count'></span></button> "
    + "				<button id='btn-wi-yili' type='button' class='layui-btn layui-btn-red' style='height:50px;'>应力监测  <span id='warning-yili-count'></span></button>          "
    + "				<button id='btn-wi-qj' type='button' class='layui-btn layui-btn-green' style='height:50px;'>倾斜监测  <span id='warning-qj-count'></span></button>          "
    + "				<button id='btn-wi-dxsw' type='button' class='layui-btn layui-btn-primary' style='height:50px;'>地下水位  <span id='warning-dxsw-count'></span></button>          "
    + "			</div>                                                                                                                                                       "

    + "						<table class='layui-hide' id='yueZhitable-view' style='margin-top:25px' lay-filter='yueZhitable-view'></table>	"
    + "						<script type='text/html' id='yuZhiChuButon'>                                                      "
    + "                        {{#  if(d.yueZhiId != ''){ }}"
    + "							    <a class='layui-btn layui-btn-xs' lay-event='add'>修改</a>                       "
    //+ "							    <a class='layui-btn layui-btn-primary layui-btn-xs' lay-event='detail'>查看</a>  "
    + "							    <a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='delete'>删除</a>       "
    + "                        {{#  } }} "
    + "                        {{#  if(d.yueZhiId == ''){ }}"
    + "							    <a class='layui-btn layui-btn-xs' lay-event='add'>保存</a>                       "
    + "                        {{#  } }} "
    + "						</script>                                                                             "
    + "                                                                                                                                                              "
    + "            </div>                                                                                                                                            "
    + "                                                                                                                                                              "
    + "            <div class='layui-tab-item'>                                                                                                                      "
    + "            <!--裂缝巡查-->                                                                                                                                   "
    + "			  <div style='margin-top: 15px;margin-bottom:15px'>                                                                                                                              "
    + "				    <button id='btn-gaojin-sum' type='button' class='layui-btn layui-btn-primary' style='height:50px;'>总告警量  <span id='gaojin-sum-count'></span></button>      "
    + "				    <button id='btn-gaojin-wei' type='button' class='layui-btn layui-btn-blue' style='height:50px;'>未处理  <span id='gaojin-wei-count'></span></button>       "
    + "				    <button id='btn-gaojin-yi' type='button' class='layui-btn layui-btn-yellow' style='height:50px;'>已处理  <span id='gaojin-yi-count'></span></button> "
    + "			    </div>                                                                                                                                                       "

    + "						<table class='layui-hide' id='GaoJingtable-view' style='margin-top:25px' lay-filter='GaoJingtable-view'></table>	"
    + "						<script type='text/html' id='GaoJingChuButon'>                                                      "
    + "                        {{#  if(d.gaojinStatus == 0){ }}"
    + "							    <a class='layui-btn layui-btn-xs' lay-event='add'>处理</a>                       "
    //+ "							    <a class='layui-btn layui-btn-primary layui-btn-xs' lay-event='detail'>查看</a>  "
    + "                        {{#  } }} "
    + "                        {{#  if(d.gaojinStatus == 1){ }}"
    + "							    <a class='layui-btn layui-btn-xs' lay-event='add'>修改</a>                       "
    + "                        {{#  } }} "
    + "						</script>                                                                             "
    + "             </div>                                                                                                                                           "
    + "        </div>                                                                                                                                                "
    //   + "    </div>                                                                                                                                                    "
    + "</div>";
