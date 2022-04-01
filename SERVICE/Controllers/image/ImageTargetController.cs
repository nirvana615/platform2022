using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http;

using COM;
using DAL;
using MODEL;


namespace SERVICE.Controllers
{
    /// <summary>
    /// 目标
    /// </summary>
    public class ImageTargetController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(ImageTargetController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 1---新建目标
        /// </summary>
        [HttpPost]
        public string AddTarget()
        {
            #region 参数
            string mbmc = HttpContext.Current.Request.Form["image_mbmc_add"];
            string mbbh = HttpContext.Current.Request.Form["image_mbbh_add"];
            string mblx = HttpContext.Current.Request.Form["image_mblx_add"];
            string x = HttpContext.Current.Request.Form["image_x_add"];
            string y = HttpContext.Current.Request.Form["image_y_add"];
            string z = HttpContext.Current.Request.Form["image_z_add"];
            string srid = HttpContext.Current.Request.Form["image_kjck_add"];
            string bz = HttpContext.Current.Request.Form["image_bz_add"];

            string projectid = HttpContext.Current.Request.Form["projectid"];
            #endregion

            #region 解析验证用户
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref userbsms);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                ImageProject imageProject = ParseImageHelper.ParseImageProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_project WHERE id={0} AND bsm{1} AND ztm={2}", projectid, userbsms, (int)MODEL.Enum.State.InUse)));
                if (imageProject == null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无此项目！", string.Empty));
                }

                if (
                    (!string.IsNullOrEmpty(mbmc))
                    && (!string.IsNullOrEmpty(mblx))
                    && (!string.IsNullOrEmpty(x))
                    && (!string.IsNullOrEmpty(y))
                    && (!string.IsNullOrEmpty(z))
                    && (!string.IsNullOrEmpty(srid))
                    )     //1---必填选项，填入则可创建项目id
                {
                    string value = "("
                    + SQLHelper.UpdateString(mbmc) + ","
                    + SQLHelper.UpdateString(mbbh) + ","
                    + mblx + ","
                    + x + ","
                    + y + ","
                    + z + ","
                    + srid + ","
                    + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                    + SQLHelper.UpdateString(imageProject.BSM) + ","
                    + (int)MODEL.Enum.State.InUse + ","
                    + SQLHelper.UpdateString(bz) + ")";

                    int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO image_target (mbmc,mbbh,mblx,x,y,z,srid,cjsj,bsm,ztm,bz) VALUES" + value);
                    if (id != -1)
                    {
                        int mapid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO image_map_project_target (projectid,targetid,cjsj,ztm) VALUES({0},{1},{2},{3})", projectid, id, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                        if (mapid == -1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建影像项目--目标映射失败！", string.Empty));
                        }
                        else
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", string.Empty));
                        }
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "创建影像目标失败！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "参数不全！", string.Empty));
                }

            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }


        /// <summary>
        /// 2---获取目标基本信息(查看-编辑目标基本信息)
        /// </summary>
        [HttpGet]
        public string GetTargetInfo(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                Target imagetarget = ParseImageHelper.ParseTarget(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM image_target WHERE id={0} AND ztm={1} AND bsm{2}", id, (int)MODEL.Enum.State.InUse, userbsms)));
                if (imagetarget != null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(imagetarget)));
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无此目标！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }


        /// <summary>
        /// 2.1---更新目标基本信息(编辑后保存)
        /// </summary>
        [HttpPut]
        public string UpdateTargetInfo()
        {
            #region 参数

            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string mbmc = HttpContext.Current.Request.Form["image_mbmc_edit"];
            string mbbh = HttpContext.Current.Request.Form["image_mbbh_edit"];
            string mblx = HttpContext.Current.Request.Form["image_mblx_edit"];
            string x = HttpContext.Current.Request.Form["image_x_edit"];
            string y = HttpContext.Current.Request.Form["image_y_edit"];
            string z = HttpContext.Current.Request.Form["image_z_edit"];
            string srid = HttpContext.Current.Request.Form["image_kjck_edit"];
            string bz = HttpContext.Current.Request.Form["image_bz_edit"];
            #endregion


            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int count = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM image_target WHERE id={0} AND ztm={1} AND bsm{2}", id, (int)MODEL.Enum.State.InUse, userbsms));

                if (count == 1)
                {
                    if ((!string.IsNullOrEmpty(mbmc))
                    && (!string.IsNullOrEmpty(mblx))
                    && (!string.IsNullOrEmpty(x))
                    && (!string.IsNullOrEmpty(y))
                    && (!string.IsNullOrEmpty(z))
                    && (!string.IsNullOrEmpty(srid)))
                    {
                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(
                               "UPDATE image_target SET mbmc={0},mbbh={1},mblx={2},x={3},y={4},z={5},srid={6},bz={7} WHERE id={8} AND bsm{9} AND ztm={10}",
                               SQLHelper.UpdateString(mbmc),
                               SQLHelper.UpdateString(mbbh),
                               SQLHelper.UpdateString(mblx),
                               x,
                               y,
                               z,
                               srid,
                               SQLHelper.UpdateString(bz),
                               id,
                               userbsms,
                               (int)MODEL.Enum.State.InUse));
                        if (updatecount == 1)
                        {
                            if (!string.IsNullOrEmpty(mbbh))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE image_target SET mbbh={0} WHERE id={1} AND bsm{2} AND ztm={3}", mbbh, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }

                            if (!string.IsNullOrEmpty(bz))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE image_target SET bz={0} WHERE id={1} AND bsm{2} AND ztm={3}", bz, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "更新成功！", string.Empty));
                        }
                        else
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "更新项目失败！", string.Empty));
                        }
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "缺少必需参数！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无此项目！", string.Empty));
                }
            }
            else
            {
                //验证失败
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 2.2---删除目标
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteTarget()
        {
            string id = HttpContext.Current.Request.Form["id"];
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int updatetargetcount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE image_target SET ztm={0} WHERE id={1}", (int)MODEL.Enum.State.NoUse, id));
                if (updatetargetcount == 1)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "删除成功！", string.Empty));
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "删除目标出错！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 3.1---新建靶区（表单提交、图片上传）
        /// </summary>
        [HttpPost]
        public string UploadRoiImage()
        {
            #region 参数
            string targetid = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string image_bqmc_add = HttpContext.Current.Request.Form["bqmc"];
            string image_bqbh_add = HttpContext.Current.Request.Form["bqbh"];
            string image_bqlx_add = HttpContext.Current.Request.Form["bqlx"];
            string image_bz_add = HttpContext.Current.Request.Form["bz"];
            string image_roiimg_add = HttpContext.Current.Request.Form["img"];
            #endregion

            #region 解析验证用户
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref userbsms);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                Target target = ParseImageHelper.ParseTarget(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_target WHERE id={0} AND bsm{1} AND ztm={2}", targetid, userbsms, (int)MODEL.Enum.State.InUse)));
                if (target == null)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无此目标！", string.Empty));
                }
                else
                {
                    if (
                        (!string.IsNullOrEmpty(image_bqmc_add))
                        && (!string.IsNullOrEmpty(image_bqbh_add))
                        && (!string.IsNullOrEmpty(image_bqlx_add))
                        && (!string.IsNullOrEmpty(image_roiimg_add)))
                    {
                        int roiid = PostgresqlHelper.InsertImageReturnID(pgsqlConnection, string.Format("INSERT INTO image_roi (bqmc,bqbh,bqlx,bqwj,cjsj,bsm,ztm,bz) VALUES({0},{1},{2},@Image,{3},{4},{5},{6})",
                            SQLHelper.UpdateString(image_bqmc_add),
                            SQLHelper.UpdateString(image_bqbh_add),
                            image_bqlx_add,
                            SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")),
                            SQLHelper.UpdateString(target.BSM),
                            (int)MODEL.Enum.State.InUse,
                             SQLHelper.UpdateString(image_bz_add)), Convert.FromBase64String(image_roiimg_add.Replace("data:image/jpeg;base64,", "")));
                        if (roiid == -1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "插入靶区影像失败！", string.Empty));
                        }

                        int maptargetroiid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO image_map_target_roi (targetid,roiid,cjsj,ztm) VALUES({0},{1},{2},{3})", targetid, roiid, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                        if (maptargetroiid == -1)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "插入目标-靶区影像映射失败！", string.Empty));
                        }
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", string.Empty));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "参数不全！", string.Empty));
                    }

                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }


        /// <summary>
        /// 3.2---获取靶区信息
        /// </summary>
        [HttpGet]
        public string GetRoiInfo(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
            if (cookieResult == CookieHelper.CookieResult.SuccessCookie)
            {
                int roicount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM image_map_target_roi WHERE targetid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (roicount != 0)
                {
                    string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_map_target_roi WHERE targetid={0} AND ztm={1} ORDER BY id ASC", id, (int)MODEL.Enum.State.InUse));
                    if (!string.IsNullOrEmpty(maps))
                    {
                        List<Roi> rois = new List<Roi>();
                        string[] maprows = maps.Split(new char[] { COM.ConstHelper.rowSplit });
                        for (int i = 0; i < maprows.Length; i++)
                        {
                            MapTargetRoi mapTargetRoi =  ParseImageHelper.ParseMapTargetRoi(maprows[i]);

                            Roi roi = ParseImageHelper.ParseRoi(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM image_roi WHERE id={0} AND ztm={1} AND bsm{2}", mapTargetRoi.RoiId, (int)MODEL.Enum.State.InUse, userbsms)));
                            if (roi != null)
                            {
                                System.Drawing.Bitmap bitmap = PostgresqlHelper.QueryBitmap(pgsqlConnection, string.Format("SELECT bqwj FROM image_roi WHERE id={0} AND ztm={1}", roi.Id, (int)MODEL.Enum.State.InUse));
                                roi.BQWJ = BitmapToBase64(bitmap);
                                if (roi != null)
                                {
                                    rois.Add(roi);
                                }
                            }
                        }
                        if (rois.Count != 0)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(rois)));
                        }
                        else
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无靶区！", string.Empty));
                        }
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无目标-靶区映射！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无靶区！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }


        /// <summary>
        /// 3.3---更新靶区信息
        /// </summary>
        [HttpPut]
        public string UpdateRoiInfo()
        {
            #region 参数

            string id = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            string bqmc = HttpContext.Current.Request.Form["image_bqmc_edit"];
            string bqbh = HttpContext.Current.Request.Form["image_bqbh_edit"];
            string bqlx = HttpContext.Current.Request.Form["image_bqlx_edit"];
            string bz = HttpContext.Current.Request.Form["image_bz_edit"];
            #endregion


            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int roicount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM image_roi WHERE id={0} AND ztm={1} AND bsm{2}", id, (int)MODEL.Enum.State.InUse, userbsms));

                if (roicount == 1)
                {
                    if ((!string.IsNullOrEmpty(bqmc))
                    && (!string.IsNullOrEmpty(bqbh))
                    && (!string.IsNullOrEmpty(bqlx)))
                    {
                        int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(
                               "UPDATE image_roi SET bqmc={0},bqbh={1},bqlx={2},bz={3} WHERE id={4} AND bsm{5} AND ztm={6}",
                               SQLHelper.UpdateString(bqmc),
                               SQLHelper.UpdateString(bqbh),
                               bqlx,
                               SQLHelper.UpdateString(bz),
                               id,
                               userbsms,
                               (int)MODEL.Enum.State.InUse));
                        if (updatecount == 1)
                        {
                            if (!string.IsNullOrEmpty(bz))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE image_roi SET bz={0} WHERE id={1} AND bsm{2} AND ztm={3}", bz, id, userbsms, (int)MODEL.Enum.State.InUse));
                            }
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "更新成功！", string.Empty));
                        }
                        else
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "更新靶区失败！", string.Empty));
                        }
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "缺少必需参数！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无此靶区！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }


        /// <summary>
        /// 3.3---删除靶区
        /// </summary>
        /// <summary>
        [HttpDelete]
        public string DeleteRoi()
        {
            string id = HttpContext.Current.Request.Form["id"];

            string cookie = HttpContext.Current.Request.Form["cookie"];
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int updateroicount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE image_roi SET ztm={0} WHERE id={1} AND bsm{2}", (int)MODEL.Enum.State.NoUse, id, userbsms));
                if (updateroicount == 1)
                {
                    int updatemaproicount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE image_map_target_roi SET ztm={0} WHERE roiid={1}", (int)MODEL.Enum.State.NoUse, id));
                    if (updatemaproicount == 1)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "删除成功！", string.Empty));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "删除目标—靶区映射出错！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "删除靶区出错！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        #region
        private string BitmapToBase64(Bitmap bmp)
        {
            try
            {
                MemoryStream ms = new MemoryStream();
                bmp.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
                byte[] arr = new byte[ms.Length];
                ms.Position = 0;
                ms.Read(arr, 0, (int)ms.Length);
                ms.Close();
                String strbaser64 = Convert.ToBase64String(arr);
                return strbaser64;
            }
            catch
            {
                return string.Empty;
            }
        }
        #endregion
        #region
        //base64编码的文本转为图片    
        private System.Drawing.Image Base64StringToImage(string txt)
        {
            byte[] arr = Convert.FromBase64String(txt);
            MemoryStream ms = new MemoryStream(arr);
            Bitmap bmp = new Bitmap(ms);
            return bmp;
        }
        #endregion



        /// <summary>
        /// 获取目标集合
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie">验证信息</param>
        /// <returns></returns>
        [HttpGet]
        public string GetTargetList(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
            if (cookieResult == CookieHelper.CookieResult.SuccessCookie)
            {
                List<Target> targets = new List<Target>();
                

                int mapprojecttargetcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM image_map_project_target WHERE projectid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));

                if (mapprojecttargetcount > 0)
                {
                    string mapprojecttargetdata = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_map_project_target WHERE projectid={0} AND ztm={1} ORDER BY id ASC", id, (int)MODEL.Enum.State.InUse));
                    if (!string.IsNullOrEmpty(mapprojecttargetdata))
                    {                        
                        string[] mapprojecttargetrows = StringHelper.String2Array(mapprojecttargetdata);
                        for (int i = 0; i < mapprojecttargetrows.Length; i++)
                        {
                            MapImageProjecTarget mapImageProjecTarget = ParseImageHelper.ParseMapImageProjecTarget(mapprojecttargetrows[i]);
                            if (mapImageProjecTarget != null)
                            {
                                //Target target = ParseImageHelper.ParseTarget(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_target WHERE id={0} AND ztm={1} AND bsm{2}", mapImageProjecTarget.TargetId, (int)MODEL.Enum.State.InUse, userbsms)));
                                //同一个项目，需要数据隔离？后台需要多个操作员
                                Target target = ParseImageHelper.ParseTarget(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_target WHERE id={0} AND ztm={1} ", mapImageProjecTarget.TargetId, (int)MODEL.Enum.State.InUse)));

                                if (target != null)
                                {
                                 
                                    targets.Add(target);
                                }
                            }
                        }
                        if (targets.Count>0)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！",JsonHelper.ToJson(targets)));
                        }
                        else //
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "目标信息为空！", string.Empty));
                        }
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "目标信息为空！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "该项目无目标！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
            
        }









    }
}
