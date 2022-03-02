using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using COM;

namespace MVC.Controllers
{
    public class AppController : BaseController
    {
        private static Logger logger = Logger.CreateLogger(typeof(AppController));


        /// <summary>
        /// 后台管理系统（系统管理员）
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Admin()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[1];
            return View();
        }


        /// <summary>
        /// 实景模型管理系统（模型采集员）
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Modelc()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[1];
            logger.Info("【" + ViewBag.User + "】登录 实景模型管理系统（模型采集）");
            return View();
        }
        /// <summary>
        /// 实景模型管理系统（模型处理员）
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Modelp()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[1];
            logger.Info("【" + ViewBag.User + "】登录实景模型管理系统（模型处理）");
            return View();
        }
        /// <summary>
        /// 实景模型管理系统（模型用户）
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Modelv()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[1];
            logger.Info("【" + ViewBag.User + "】登录实景模型管理系统（模型用户）");
            return View();
        }


        /// <summary>
        /// 地质灾害监测系统（监测员）
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Monitor()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[1];
            logger.Info("【" + ViewBag.User + "】登录地质灾害监测系统（监测员）");
            return View();
        }
        /// <summary>
        /// 地质灾害监测系统（监测用户）
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Monitorv()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[1];
            logger.Info("【" + ViewBag.User + "】登录地质灾害监测系统（监测用户）");
            return View();
        }


        /// <summary>
        /// 航线规划系统（航线规划员）
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Uav()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[1];
            logger.Info("【" + ViewBag.User + "】登录航线规划系统（航线规划员）");
            return View();
        }


        /// <summary>
        /// 地质要素采集系统（消落带）
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Flz()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[1];
            logger.Info("【" + ViewBag.User + "】登录地质要素采集系统（消落带）");
            return View();
        }
        /// <summary>
        /// 地质要素采集系统（危岩）
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Rock()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[1];
            logger.Info("【" + ViewBag.User + "】登录地质要素采集系统（危岩）");
            return View();
        }

        /// <summary>
        /// 影像对比分析系统
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Image()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[1];
            logger.Info("【" + ViewBag.User + "】登录影像分析系统");
            return View();
        }

        /// <summary>
        /// 点云对比分析系统
        /// </summary>
        /// <returns></returns>
        [AuthorityFilter]
        public ActionResult Pointcloud()
        {
            List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(this.HttpContext.Request.Cookies.Get("User").Value);
            ViewBag.User = userinfo[1];
            logger.Info("【" + ViewBag.User + "】登录点云分析系统");
            return View();
        }

    }
}