using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVC
{
    /// <summary>
    /// ajax跟exception一致
    /// 检验登陆和权限的filter
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true)]
    public class AuthorityFilterAttribute : AuthorizeAttribute
    {
        /// <summary>
        /// 未登录时返还的地址
        /// </summary>
        private string _LoginPath = string.Empty;

        public AuthorityFilterAttribute()
        {
            this._LoginPath = "/Platform/Home";
        }

        public AuthorityFilterAttribute(string loginPath)
        {
            this._LoginPath = loginPath;
        }

        /// <summary>
        /// 检查用户登录
        /// </summary>
        /// <param name="filterContext"></param>
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            if (filterContext.ActionDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true) || filterContext.ActionDescriptor.ControllerDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true))
            {
                return;
            }

            #region 验证cookie
            var cookieUser = HttpContext.Current.Request.Cookies.Get("User");//加密用户信息
            var cookieRole = HttpContext.Current.Request.Cookies.Get("Role");//加密角色信息
            var role = HttpContext.Current.Request.CurrentExecutionFilePath.Split(new char[] { '/' })[2];//"/{controller}/{action}"

            if (cookieUser == null)
            {
                //cookie失效
                HttpContext.Current.Session["CurrentUrl"] = filterContext.RequestContext.HttpContext.Request.RawUrl;
                filterContext.Result = new RedirectResult(this._LoginPath);
            }
            else
            {
                bool result = UserManage.ValidateCookie(cookieUser.Value, cookieRole.Value, role);
                if (!result)
                {
                    //cookie错误或时效过期
                    HttpContext.Current.Session["CurrentUrl"] = filterContext.RequestContext.HttpContext.Request.RawUrl;
                    filterContext.Result = new RedirectResult(this._LoginPath);
                }
            }
            #endregion 
        }

    }
}