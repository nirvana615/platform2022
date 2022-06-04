using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

using COM;
using MODEL;

namespace MVC.Controllers
{
    public class PlatformController : Controller
    {
        private static Logger logger = Logger.CreateLogger(typeof(PlatformController));

        /// <summary>
        /// 主页
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ViewResult Home()
        {
            return View();
        }

        /// <summary>
        /// 后台管理系统登录页
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ViewResult LoginAdmin()
        {
            return View();
        }
        /// <summary>
        /// 后台管理系统登录
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult LoginAdmin(string username, string password)
        {
            //用户
            User user = null;
            UserManage.LoginResult loginresult = this.HttpContext.UserLogin(username, password, ref user);

            if (loginresult == UserManage.LoginResult.Success)
            {
                #region 验证用户成功
                //角色
                Role role = null;
                UserManage.RoleResult roleresult = this.HttpContext.UserRole(user, (int)MODEL.Enum.System.Admin, ref role);

                if (roleresult == UserManage.RoleResult.Success)
                {
                    #region 验证角色成功
                    return RedirectToAction(role.RoleAlias.ToString(), "App");
                    #endregion
                }
                else
                {
                    #region 验证角色失败
                    ModelState.AddModelError("failed", roleresult.GetRemark());
                    return View();
                    #endregion
                }
                #endregion
            }
            else
            {
                #region 验证用户失败
                ModelState.AddModelError("failed", loginresult.GetRemark());
                return View();
                #endregion
            }
        }

        #region 系统登录页
        /// <summary>
        /// 实景模型管理系统登录页
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ViewResult LoginModel()
        {
            return View();
        }
        /// <summary>
        /// 地质灾害监测系统登录页
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ViewResult LoginMonitor()
        {
            return View();
        }
        /// <summary>
        /// 航线规划系统登录页
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ViewResult LoginUav()
        {
            return View();
        }
        /// <summary>
        /// 地质要素采集系统登录页
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ViewResult LoginGeology()
        {
            return View();
        }
        /// <summary>
        /// 无人机巡查系统登录页
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ViewResult LoginUavFind()
        {
            return View();
        }
        /// <summary>
        /// 点云对比分析系统登录页
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ViewResult LoginPointcloud()
        {
            return View();
        }
        #endregion

        #region 系统登录
        /// <summary>
        /// 实景模型管理系统登录
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult LoginModel(string username, string password)
        {
            //用户
            User user = null;
            UserManage.LoginResult loginresult = this.HttpContext.UserLogin(username, password, ref user);

            if (loginresult == UserManage.LoginResult.Success)
            {
                #region 验证用户成功
                //角色
                Role role = null;
                UserManage.RoleResult roleresult = this.HttpContext.UserRole(user, (int)MODEL.Enum.System.Model, ref role);

                if (roleresult == UserManage.RoleResult.Success)
                {
                    #region 验证角色成功
                    return RedirectToAction(role.RoleAlias.ToString(), "App");
                    #endregion
                }
                else
                {
                    #region 验证角色失败
                    ModelState.AddModelError("failed", roleresult.GetRemark());
                    return View();
                    #endregion
                }
                #endregion
            }
            else
            {
                #region 验证用户失败
                ModelState.AddModelError("failed", loginresult.GetRemark());
                return View();
                #endregion
            }
        }
        /// <summary>
        /// 地质灾害监测系统登录
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult LoginMonitor(string username, string password)
        {
            //用户
            User user = null;
            UserManage.LoginResult loginresult = this.HttpContext.UserLogin(username, password, ref user);

            if (loginresult == UserManage.LoginResult.Success)
            {
                #region 验证用户成功
                //角色
                Role role = null;
                UserManage.RoleResult roleresult = this.HttpContext.UserRole(user, (int)MODEL.Enum.System.Monitor, ref role);

                if (roleresult == UserManage.RoleResult.Success)
                {
                    #region 验证角色成功
                    return RedirectToAction(role.RoleAlias.ToString(), "App");
                    #endregion
                }
                else
                {
                    #region 验证角色失败
                    ModelState.AddModelError("failed", roleresult.GetRemark());
                    return View();
                    #endregion
                }
                #endregion
            }
            else
            {
                #region 验证用户失败
                ModelState.AddModelError("failed", loginresult.GetRemark());
                return View();
                #endregion
            }
        }
        /// <summary>
        /// 航线规划系统登录
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult LoginUav(string username, string password)
        {
            //用户
            User user = null;
            UserManage.LoginResult loginresult = this.HttpContext.UserLogin(username, password, ref user);

            if (loginresult == UserManage.LoginResult.Success)
            {
                #region 验证用户成功
                //角色
                Role role = null;
                UserManage.RoleResult roleresult = this.HttpContext.UserRole(user, (int)MODEL.Enum.System.Uav, ref role);

                if (roleresult == UserManage.RoleResult.Success)
                {
                    #region 验证角色成功
                    return RedirectToAction(role.RoleAlias.ToString(), "App");
                    #endregion
                }
                else
                {
                    #region 验证角色失败
                    ModelState.AddModelError("failed", roleresult.GetRemark());
                    return View();
                    #endregion
                }
                #endregion
            }
            else
            {
                #region 验证用户失败
                ModelState.AddModelError("failed", loginresult.GetRemark());
                return View();
                #endregion
            }
        }
        /// <summary>
        /// 地质要素采集系统登录
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult LoginGeology(string username, string password)
        {
            //用户
            User user = null;
            UserManage.LoginResult loginresult = this.HttpContext.UserLogin(username, password, ref user);

            if (loginresult == UserManage.LoginResult.Success)
            {
                #region 验证用户成功
                //角色
                Role role = null;
                UserManage.RoleResult roleresult = this.HttpContext.UserRole(user, (int)MODEL.Enum.System.Geology, ref role);

                if (roleresult == UserManage.RoleResult.Success)
                {
                    #region 验证角色成功
                    return RedirectToAction(role.RoleAlias.ToString(), "App");
                    #endregion
                }
                else
                {
                    #region 验证角色失败
                    ModelState.AddModelError("failed", roleresult.GetRemark());
                    return View();
                    #endregion
                }
                #endregion
            }
            else
            {
                #region 验证用户失败
                ModelState.AddModelError("failed", loginresult.GetRemark());
                return View();
                #endregion
            }
        }
        /// <summary>
        /// 无人机巡查系统登录
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult LoginUavFind(string username, string password)
        {
            //用户
            User user = null;
            UserManage.LoginResult loginresult = this.HttpContext.UserLogin(username, password, ref user);

            if (loginresult == UserManage.LoginResult.Success)
            {
                #region 验证用户成功
                //角色
                Role role = null;
                UserManage.RoleResult roleresult = this.HttpContext.UserRole(user, (int)MODEL.Enum.System.UavFind, ref role);

                if (roleresult == UserManage.RoleResult.Success)
                {
                    #region 验证角色成功
                    return RedirectToAction(role.RoleAlias.ToString(), "App");
                    #endregion
                }
                else
                {
                    #region 验证角色失败
                    ModelState.AddModelError("failed", roleresult.GetRemark());
                    return View();
                    #endregion
                }
                #endregion
            }
            else
            {
                #region 验证用户失败
                ModelState.AddModelError("failed", loginresult.GetRemark());
                return View();
                #endregion
            }
        }
        /// <summary>
        /// 点云对比分析系统登录
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult LoginPointcloud(string username, string password)
        {
            //用户
            User user = null;
            UserManage.LoginResult loginresult = this.HttpContext.UserLogin(username, password, ref user);

            if (loginresult == UserManage.LoginResult.Success)
            {
                #region 验证用户成功
                //角色
                Role role = null;
                UserManage.RoleResult roleresult = this.HttpContext.UserRole(user, (int)MODEL.Enum.System.Pointcloud, ref role);

                if (roleresult == UserManage.RoleResult.Success)
                {
                    #region 验证角色成功
                    return RedirectToAction(role.RoleAlias.ToString(), "App");
                    #endregion
                }
                else
                {
                    #region 验证角色失败
                    ModelState.AddModelError("failed", roleresult.GetRemark());
                    return View();
                    #endregion
                }
                #endregion
            }
            else
            {
                #region 验证用户失败
                ModelState.AddModelError("failed", loginresult.GetRemark());
                return View();
                #endregion
            }
        }
        #endregion

        /// <summary>
        /// 退出登录
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Logout()
        {
            this.HttpContext.UserLogout();
            //return RedirectToAction("Home", "Platform");
            return Redirect("/Platform/Home");
        }


        /// <summary>
        /// 影像对比分析系统登录页（过时）
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ViewResult LoginImage()
        {
            return View();
        }
        /// <summary>
        /// 影像对比分析系统登录（过时）
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult LoginImage(string username, string password)
        {
            //用户
            User user = null;
            UserManage.LoginResult loginresult = this.HttpContext.UserLogin(username, password, ref user);

            if (loginresult == UserManage.LoginResult.Success)
            {
                #region 验证用户成功
                //角色
                Role role = null;
                UserManage.RoleResult roleresult = this.HttpContext.UserRole(user, (int)MODEL.Enum.System.Image, ref role);

                if (roleresult == UserManage.RoleResult.Success)
                {
                    #region 验证角色成功
                    return RedirectToAction(role.RoleAlias.ToString(), "App");
                    #endregion
                }
                else
                {
                    #region 验证角色失败
                    ModelState.AddModelError("failed", roleresult.GetRemark());
                    return View();
                    #endregion
                }
                #endregion
            }
            else
            {
                #region 验证用户失败
                ModelState.AddModelError("failed", loginresult.GetRemark());
                return View();
                #endregion
            }
        }


    }
}