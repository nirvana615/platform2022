

var changeslayers = [];//图层列表数据
var changeslayerlist;
var pointcloudInfoList = [];//模型数据
function PointCloudChangesLayer(currentprojectid) {
    if (currentprojectid == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        if ((utilchangeslayerindex != null) || (utilchangeslayerindex != undefined)) {
            layer.close(utilchangeslayerindex);
        }
    } else {
        if (utilchangeslayerindex == null) {
            utilchangeslayerindex = layer.open({
                type: 1
                , title: ['点云图层管理', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['350px', '450px']
                , shade: 0
                , offset: ['530px', '10px']
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<div id="changeslayerlist"></div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //获取点云图层
                    $.ajax({
                        url: servicesurl + "/api/PointCloudChanges/GetPointCloudChanges",
                        type: "get",
                        dataType: 'json',
                        data: { "projectid": currentprojectid },
                        success: function (data) {
                            changeslayerlist = JSON.parse(data);
                            console.log(changeslayerlist);

                            //构建项目图层Lay UI
                            if (changeslayerlist.RegionList != null) {
                                for (var i in changeslayerlist.RegionList) {
                                    var region= new Object;
                                    region.title = changeslayerlist.RegionList[i].RegionName;
                                    region.type = 'region';
                                    region.id = changeslayerlist.RegionList[i].Id;
                                    if (i == 0) {
                                        //默认展开第一项
                                        region.spread = true;
                                    }
                                    else {
                                        region.spread = false;
                                    }
                                    var regionchild = [];
                                    //热力图
                                    if (changeslayerlist.RegionList[i].PointCloudChangeslist != null) {
                                        var changes = [];
                                        changes.title = "变化热力图";
                                       // regionchild.id = layerlist.PCloudProjectList[i].RegionList[j].Id;
                                        regionchild.type = 'headmap_title';
                                        var regionchildson = [];
                                        for (var j in changeslayerlist.RegionList[i].PointCloudChangeslist) {
                                            var pcdata = new Object;
                                            pcdata.title = changeslayerlist.RegionList[i].PointCloudChangeslist[j].Sourceid;
                                            pcdata.id = changeslayerlist.RegionList[i].PointCloudChangeslist[j].Id;
                                            pcdata.changes = changeslayerlist.RegionList[i].PointCloudChangeslist[j].Changes;
                                            pcdata.type = 'headmaps';
                                            pcdata.checked = false;
                                            pcdata.showCheckbox = true;//显示复选框
                                            regionchildson.push(pcdata);
                                            changes.children = regionchildson;
                                            changes.push(regionchildson);
                                        }

                                        regionchild.children = changes;
                                        regionchild.push(changes);
                                    }

                                    if (changeslayerlist.RegionList[i].PointCloudChangeslist != null) {
                                       
                                        var positions = [];
                                        positions.title = "变形定位";
                                        // regionchild.id = layerlist.PCloudProjectList[i].RegionList[j].Id;
                                        regionchild.type = 'headmap_title';
                                        var positionschildson = [];

                                        for (var j in changeslayerlist.RegionList[i].PointCloudChangeslist) {
                                            var pcdata = new Object;
                                            pcdata.title = changeslayerlist.RegionList[i].PointCloudChangeslist[j].Sourceid;
                                            pcdata.id = changeslayerlist.RegionList[i].PointCloudChangeslist[j].Id;
                                            pcdata.positon = changeslayerlist.RegionList[i].changePositions.ChangePositionsList[j].HeatMapValueList;
                                            pcdata.type = 'changesposions';
                                            pcdata.checked = false;
                                            pcdata.showCheckbox = true;//显示复选框
                                            positionschildson.push(pcdata);
                                            positions.children = positionschildson;
                                            positions.push(positionschildson);
                                        }

                                        regionchild.children = positions;
                                        regionchild.push(positions);
                                    }


                                    //三维点云变化图层
                                    if (changeslayerlist.RegionList[i].SurPointClouds != null) {
                                        var prjsurpoindcloud = new Object;
                                        prjsurpoindcloud.type = 'surPointCloud_title'
                                        prjsurpoindcloud.title = changeslayerlist.RegionList[i].SurPointClouds.Title;
                                        var prjsurpointcloudchild = [];
                                        pointcloudInfoList = changeslayerlist.RegionList[i].SurPointClouds.SurPointCloudList;
                                        for (var z in changeslayerlist.RegionList[i].SurPointClouds.SurPointCloudList) {
                                            var surpoindcloud = new Object;
                                            surpoindcloud.title = changeslayerlist.RegionList[i].SurPointClouds.SurPointCloudList[z].DYMC;
                                            surpoindcloud.id = "REGIONPOINTCLOUD_" + changeslayerlist.RegionList[i].SurPointClouds.SurPointCloudList[z].Id;
                                            surpoindcloud.type = "surPointCloud";
                                            surpoindcloud.path = changeslayerlist.RegionList[i].SurPointClouds.SurPointCloudList[z].DYLJ;
                                            surpoindcloud.checked = false;
                                            surpoindcloud.showCheckbox = true;//显示复选框
                                            prjsurpointcloudchild.push(surpoindcloud);
                                        }
                                        prjsurpoindcloud.children = prjsurpointcloudchild;

                                        regionchild.children = prjsurpoindcloud;
                                        regionchild.push(prjsurpoindcloud);


                                    }


                                    region.children = regionchild;
                                    changeslayers.push(region);
                                }




                            }

                            console.log(changeslayers);
                            tree.render({
                                elem: '#changeslayerlist'
                                , id: 'changeslayerlistid'
                                , showCheckbox: true
                                , customCheckbox: true
                                , customOperate: false
                                , showLine: true
                                , isImageTree: true
                                , data: changeslayers
                                , edit: ['add', 'update', 'del']
                                , accordion: true
                                , click: function (obj) {
                                }
                                , operate: function (obj) {
                                }
                                , oncheck: function (obj) {
                                    LoadHeadMap(obj);
                                }
                            });
                        }
                        });


                }
                , end: function () {
                    //关闭
                    utilchangeslayerindex = null;

                }

            });
        }
    }
};