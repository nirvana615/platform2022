////工具栏
util.fixbar({
    bar1: '<li class="layui-icon" lay-type="bar1" id="utilbar1" style="margin:5px;border-radius:5px;background-color:#edffff"><svg t="1636940936667" class="icon" style="position:relative;top:5px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4162" xmlns:xlink="http://www.w3.org/1999/xlink" width="46" height="46"><defs><style type="text/css"></style></defs><path d="M42.666667 149.333333a21.333333 21.333333 0 0 1 21.333333-21.333333h256a21.333333 21.333333 0 0 1 0 42.666667H64a21.333333 21.333333 0 0 1-21.333333-21.333334z m917.333333 746.666667h-128a21.333333 21.333333 0 0 0 0 42.666667h128a21.333333 21.333333 0 0 0 0-42.666667zM64 554.666667h256a21.333333 21.333333 0 0 0 0-42.666667H64a21.333333 21.333333 0 0 0 0 42.666667z m554.666667 341.333333H64a21.333333 21.333333 0 0 0 0 42.666667h554.666667a21.333333 21.333333 0 0 0 0-42.666667z m241.673333-432.16A212.406667 212.406667 0 0 1 725.333333 512c-117.82 0-213.333333-95.513333-213.333333-213.333333s95.513333-213.333333 213.333333-213.333334 213.333333 95.513333 213.333334 213.333334a212.406667 212.406667 0 0 1-48.16 135.006666l84.58 84.573334a21.333333 21.333333 0 0 1-30.173334 30.173333zM896 298.666667c0-94.253333-76.413333-170.666667-170.666667-170.666667S554.666667 204.413333 554.666667 298.666667s76.413333 170.666667 170.666666 170.666666 170.666667-76.413333 170.666667-170.666666z" fill="#2c2c2c" p-id="4163"></path></svg></li>'
    
    , css: { right: 17, top: 401}
    , bgcolor: '#393D49'
    , click: function (type) {
        if (type === 'bar1') {
            //图层列表
            LoadSteepHillindex(currentprojectid);
        }
    }
});


//提示
$("#utilbar1").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('地质识别', '#utilbar1', {
            tips: [4, '#78BA32']
        });
    }
});
$("#utilbar1").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});

