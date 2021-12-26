
jQuery(document).ready(function () {
    /*
     * 全屏背景
    */
    $.backstretch([
        "../../Resources/img/inspect.jpg"
    ], { duration: 5000, fade: 750 });

    /*
     * 表单验证
    */
    $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function () {
        $(this).removeClass('input-error');
    });

    $('.login-form').on('submit', function (e) {

        $(this).find('input[type="text"], input[type="password"], textarea').each(function () {
            if ($(this).val() == "") {
                e.preventDefault();
                $(this).addClass('input-error');
            }
            else {
                $(this).removeClass('input-error');
            }
        });
    });
});
