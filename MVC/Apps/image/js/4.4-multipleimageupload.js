////弹出多影像自动上传模块widget

function MultipleImageUpload(id, style) {
    if (style == "view") {

    }
    else if (style == "edit") {
        //
    }

    else if (style == "add") {
        if (id == null) {
            layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }
        else {
            //上传影像
            if (multipleimageuploadlayerindex == null) {
                multipleimageuploadlayerindex = layer.open({
                    type: 1
                    , title: ['上传影像', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                    , area: ['560px', '600px']
                    , shade: 0
                    , offset: 'auto'
                    , closeBtn: 1
                    , maxmin: true
                    , moveOut: true
                    , content: '<form class="layui-form" style="margin-top:10px" lay-filter="addallimageform"><div class="layui-form-item"><label class="layui-form-label">目标编号</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="image_yxbh_add" autocomplete="off" placeholder="自动识别" lay-verify="required" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">备注</label><div class="layui-input-block" style="padding-right:10px"><input type="text" name="image_bz_add" autocomplete="off" placeholder="请输入" class="layui-input" /></div></div><div class="layui-form-item" style="height: 220px;"><div class="layui-upload"><div class="layui-row" style="margin-top:20px;margin-left:10px;margin-right:20px"><div class="layui-col-xs6"><div class="grid-demo grid-demo-bg1"><button type="button" class="layui-btn-fluid layui-btn layui-btn-primary layui-border-green" id="image_allimage_select">1-选择影像</button></div></div><div class="layui-col-xs6"><div class="grid-demo"><button type="button" class="layui-btn-fluid layui-btn layui-btn-primary layui-border-green" id="image_allimage_upload">2-上传</button></div></div></div><div class="layui-upload-list" style="height:350px;margin-top:10px;margin-left:10px;margin-right:10px;background-color:rgba(25,25,0,0.11)"><p style="color:green;font-size:20px;">点击“1-选择影像”，在此预览影像</p><img class="layui-upload-img" id="image_multiple_img" name="image_multiple_img" style="width:100%;height:auto;vertical-align:middle"></div></div></div></form>'
                    , zIndex: layer.zIndex
                    , success: function (layero) {
                        layer.setTop(layero);

                        //创建一个影像上传组件
                        var uploadinst = upload.render({
                            elem: '#image_allimage_select' //绑定元素
                            , url: servicesurl + "/api/ImageUpload/UploadTimeImage" //上传接口
                            , data: {
                                id: function () {
                                    return id;
                                },
                                bz: function () {
                                    return form.val("addtimeimageform")["image_bz_add"];
                                },
                                //imagetime: function () {
                                //    return imagetime;
                                //},
                                //f: function () {
                                //    return f;
                                //},
                                //camera: function () {
                                //    return camera;
                                //},
                                //timeimg: function () {
                                //    return $('#image_timeimage_img')[0].src;
                                //},
                                //b: function () {
                                //    return b;
                                //},
                                //l: function () {
                                //    return l;
                                //},
                                //h: function () {
                                //    return h;
                                //},
                                cookie: function () {
                                    return document.cookie;
                                }
                            }
                            , datatype: "json"
                            , accept: 'images'
                            , auto: false
                            , bindAction: '#image_allimage_upload'
                            , multiple: true
                            , choose: function (obj) {
                                //var that = this;
                                //var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                                ////读取本地文件

                                obj.preview(function (index, file, result) {

                                    ////预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)

                                    //var indexs = [];

                                    //results.push(result);
                                    //indexs.push(index);
                                    var files = obj.pushFile(file);
                                    //var results = obj.pushFile(result);



                                    console.log(files); //得到文件对象
                                    console.log(result); //得到文件base64编码，比如图片
                                    console.log(index); //得到文件索引



                                    //$('#image_timeimage_img')[0].src = result;
                                    //var image = new Image();
                                    //image.src = result;
                                    //image.onload = function () {
                                    //    EXIF.getData(image, function () {
                                    //        var exifs = EXIF.pretty(this);
                                    //        imagetime = EXIF.getTag(this, "DateTimeOriginal");
                                    //        f = EXIF.getTag(this, "FocalLength");
                                    //        f = f.numerator * 1.0 / f.denominator;
                                    //        camera = EXIF.getTag(this, "Model");
                                    //        bs = EXIF.getTag(this, "GPSLatitude");
                                    //        ls = EXIF.getTag(this, "GPSLongitude");
                                    //        b = bs[0].numerator + (bs[1].numerator / 60) + (bs[2].numerator / (bs[2].denominator * 3600));
                                    //        l = ls[0].numerator + (ls[1].numerator / 60) + (ls[2].numerator / (ls[2].denominator * 3600));
                                    //        h = EXIF.getTag(this, "GPSAltitude").numerator / denominator;
                                    //    });
                                    //}
                                });
                            }
                            , before: function (obj) {
                                if (firstimg_b == 0) {
                                    layer.msg("此次上传的为首期影像，请勿传错哟!", { icon: 6, zIndex: layer.zIndex });
                                }
                                else {
                                    if ((Math.abs(firstimg_b - b) > 0.000005) || (Math.abs(firstimg_l - l) > 0.000005) || (Math.abs(firstimg_h - h) > 0.08)) {

                                        layer.alert("影像与目标不符，请重选!!!", { title: "警告！", icon: 2, zIndex: layer.zIndex });
                                        uploadInst.upload();

                                        layer.close(addtimeimagelayerindex);

                                    }
                                }
                                layer.msg('正在上传请稍候......', { icon: 16, time: 6000, shade: [0.5, '#000', true], zIndex: layer.zIndex });

                            }

                            , allDone: function (obj) { //当文件全部被提交后，才触发
                                console.log(obj.total); //得到总文件数
                                console.log(obj.successful); //请求成功的文件数
                                console.log(obj.aborted); //请求失败的文件数
                            }
                            //, done: function (res, index, upload) { //每个文件提交一次触发一次。详见“请求成功的回调”

                            //}




                            , done: function (res) {
                                //上传完毕回调
                                if (res.code == 1) {
                                    layer.close(addtimeimagelayerindex);
                                    //刷新列表
                                    GettimeimageInfo();
                                }

                                layer.msg(res.message, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            }
                            , error: function () {
                                //请求异常回调
                            }
                        });
                        form.render();
                        form.render('select');










                    }
                    , end: function () {
                        multipleimageuploadlayerindex = null;
                    }
                    , cancel: function () {
                        multipleimageuploadlayerindex = null;
                    }
                });
            }


        }



    }





}

