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
    /// 影像上传
    /// </summary>
    public class ImageUploadController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(ImageUploadController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();
        //service 的Web.config中定义imgdir,绝对路径
        private static string imgdir = ConfigurationManager.AppSettings["imgdir"] != null ? ConfigurationManager.AppSettings["imgdir"].ToString() : string.Empty;


        /// <summary>
        /// 1---时序影像上传（表单提交、图片上传至服务器）
        /// </summary>
        [HttpPost]
        public string UploadTimeImage()
        {
            #region 参数
            string targetid = HttpContext.Current.Request.Form["id"];
            string cookie = HttpContext.Current.Request.Form["cookie"];

            #region EXIF
            string timeimg = HttpContext.Current.Request.Form["timeimg"]; //影像采集时间
            string imagetime = HttpContext.Current.Request.Form["imagetime"];//影像采集时间
            string f = HttpContext.Current.Request.Form["f"];//焦距
            string camera = HttpContext.Current.Request.Form["camera"];//相机型号
            string firstmark = HttpContext.Current.Request.Form["firstmark"];
            string imagewidth= HttpContext.Current.Request.Form["imagewidth"];
            string imageheight= HttpContext.Current.Request.Form["imageheight"];

            #endregion

            string image_bz_add = HttpContext.Current.Request.Form["bz"];
            if (firstmark == "首期")
            {
                image_bz_add = firstmark;
            }

            string[] times = imagetime.Split(new char[] { ' ' });
            imagetime = times[0].Replace(":", "-") + " " + times[1];
            #endregion

            #region 解析验证用户
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref userbsms);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                Target target = ParseImageHelper.ParseTarget(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_target WHERE id={0} AND bsm{1} AND ztm={2}", targetid, userbsms, (int)MODEL.Enum.State.InUse)));
                if (target != null)
                {
                    #region 参数检查
                    if (string.IsNullOrEmpty(timeimg))
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "影像数据为空！", string.Empty));
                    }
                    #endregion

                    #region base64转二进制
                    byte[] bytea = null;
                    // byte[] bytea1 = null;
                    try
                    {
                        bytea = Convert.FromBase64String(timeimg.Replace("data:image/jpeg;base64,", ""));
                    }
                    catch (Exception ex)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "影像数据存在错误！"+ex.Message, string.Empty));
                    }
                    #endregion
                    #region 压缩
                    //MemoryStream ms1 = new MemoryStream(bytea);
                    //Bitmap bitmap1 = (Bitmap)Image.FromStream(ms1);
                    //ms1.Close(); //关闭流
                    //Bitmap minbitmap1 = GetImageThumb(bitmap1, bitmap1.Size);
                    //string image1 = BitmapToBase64(minbitmap1);

                    //try
                    //{
                    //    bytea1 = Convert.FromBase64String(image1);
                    //}
                    //catch (Exception ex)
                    //{
                    //    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "影像数据存在错误！", string.Empty));
                    //}

                    #endregion


                    #region 提取影像XMP信息 json
                    #region X5R (仅测试使用)
                    ////针对X5R拍摄的照片格式，即南川甄子岩测试照片
                    //string xmpmeta = GetValue(Encoding.ASCII.GetString(bytea), "<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c128 79.159124, 2016/03/18-14:01:55        \">", "</x:xmpmeta>");
                    //ImageXMP xmp = new ImageXMP();
                    ////xmp.CreateDate = xmpmeta.Split(new char[] { '\n' })[13].Substring(19, 19).Replace("T", " ");

                    //string[] rows = image_bz_add.Split(new char[] { ';' });
                    //string[] blh = rows[1].Split(new char[] { ' ' });

                    //xmp.Model = "X5R";
                    //xmp.CreateDate = imagetime;
                    //xmp.GpsLatitude = Convert.ToDouble(blh[0]);
                    //xmp.GpsLongitude = Convert.ToDouble(blh[1]);
                    //xmp.AbsoluteAltitude = Convert.ToDouble(blh[2]);
                    //xmp.f = Convert.ToDouble(f);

                    //string xmpjson = COM.JsonHelper.ToJson(xmp);
                    #endregion

                    ImageXMP imageXMP = null;

                    if (camera == "ZenmuseP1")
                    {
                        #region P1
                        imageXMP = ParseImageHelper.ParseImageP1XMP(GetValue(Encoding.ASCII.GetString(bytea), "<x:xmpmeta xmlns:x=\"adobe:ns:meta/\">", "</x:xmpmeta>"));
                        #endregion
                    }
                    else if (camera.Contains("FC6310R"))
                    {
                        #region P4R
                        imageXMP = ParseImageHelper.ParseImageFC6310RXMP(GetValue(Encoding.ASCII.GetString(bytea), "<x:xmpmeta xmlns:x=\"adobe:ns:meta/\">", "</x:xmpmeta>"));
                        #endregion
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "未知相机型号！", string.Empty));
                    }

                    imageXMP.CreateDate = imagetime;
                    imageXMP.f = Convert.ToDouble(f);


                    //if (imagetime != null && f != null)
                    //{
                    //    imageXMP.CreateDate = imagetime;
                    //    imageXMP.f = Convert.ToDouble(f);
                    //}
                    //else
                    //{
                    //    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "缺少参数！", string.Empty));
                    //}                 

                    //判断照片质量是否满足图像匹配需求
                    if (imageXMP.RtkFlag != 50)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "非RTK状态！", string.Empty));
                    }

                    if (imageXMP.RtkStdLon > 0.1 || imageXMP.RtkStdLat > 0.1 || imageXMP.RtkStdHgt > 0.1)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "相片记录位置定位标准差较大，不建议使用该照片！", string.Empty));
                    }

                    string xmpjson = COM.JsonHelper.ToJson(imageXMP);


                    #endregion



                    #region 另存为本地图片
                    string ImageFilePath = imgdir + "\\SurImage";        //   ".../SurImage"
                    if (!Directory.Exists(ImageFilePath))//判断文件夹是否存在
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "影像存储路径不存在！", string.Empty));
                    }

                    string mbbh = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT mbbh FROM image_target WHERE id={0} AND bsm{1} AND ztm={2}", targetid, userbsms, (int)MODEL.Enum.State.InUse));
                    string projectid = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT projectid FROM image_map_project_target WHERE targetid={0} AND ztm={1}", targetid, (int)MODEL.Enum.State.InUse));
                    string xmbm = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT xmbm FROM image_project WHERE id={0} AND bsm{1} AND ztm={2}", projectid, userbsms, (int)MODEL.Enum.State.InUse));

                    string yxbh = xmbm + "_" + mbbh + "_" + imageXMP.CreateDate.Replace("-", " ").Replace(":", " ").Replace(" ", ""); //影像名称

                    string imageFileName = ImageFilePath + "\\" + yxbh + ".jpg";//定义图片命名
                    File.WriteAllBytes(imageFileName, bytea); //保存图片到本地服务器，然后获取路径  
                    if (!File.Exists(imageFileName))
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "影像存储失败！", string.Empty));
                    }
                    #endregion



                    #region
                    var inputimg = new ZoomifyImage(imageFileName);//输入影像
                    //var inputimg = new ZoomifyImage(new MemoryStream(bytea));


                    inputimg.Zoomify(ImageFilePath + "\\" + yxbh);//输出瓦片

                    #endregion

                    #region 存数据库
                    string mbmc = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT mbmc FROM image_target WHERE id={0} AND bsm{1} AND ztm={2}", targetid, userbsms, (int)MODEL.Enum.State.InUse));
                    string projectid1 = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT projectid FROM image_map_project_target WHERE targetid={0} AND ztm={1}", targetid, (int)MODEL.Enum.State.InUse));
                    string xmmc = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT xmmc FROM image_project WHERE id={0} AND bsm{1} AND ztm={2}", projectid1, userbsms, (int)MODEL.Enum.State.InUse));

                    string yxmc = xmmc + "_" + mbbh + "_" + imageXMP.CreateDate.Replace("-", " ").Replace(":", " ").Replace(" ", "");

                    int imageinfoid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO image_imageinfo(yxmc, yxbh, yxlj,xmp,cjsj, bsm, ztm, bz,mark,width,height) VALUES({0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10})",
                        SQLHelper.UpdateString(yxmc),
                        SQLHelper.UpdateString(yxbh),
                        SQLHelper.UpdateString(imageFileName),
                        SQLHelper.UpdateString(xmpjson),
                        SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")),
                        SQLHelper.UpdateString(target.BSM),
                        (int)MODEL.Enum.State.InUse,
                        SQLHelper.UpdateString(image_bz_add),
                        (int)MODEL.EnumIMG.MatchMark.NotMatched,
                        imagewidth,
                        imageheight
                        ));
                    if (imageinfoid == -1)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "数据库插入影像信息失败！", string.Empty));
                    }

                    int maptargetimageinfoid = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO image_map_target_imageinfo (targetid,imageinfoid,cjsj,ztm) VALUES({0},{1},{2},{3})", targetid, imageinfoid, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));

                    if (maptargetimageinfoid == -1)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "插入目标-时序影像映射失败！", string.Empty));
                    }
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", string.Empty));

                    #endregion

                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "目标不存在！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }



        /// <summary>
        /// 2---获取所有影像信息
        /// </summary>
        [HttpGet]
        public string GetImageInfos(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
            if (cookieResult == CookieHelper.CookieResult.SuccessCookkie)
            {
                int imagecount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM image_map_target_imageinfo WHERE targetid={0} AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (imagecount != 0)
                {
                    string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_map_target_imageinfo WHERE targetid={0} AND ztm={1} ORDER BY id ASC", id, (int)MODEL.Enum.State.InUse));
                    if (!string.IsNullOrEmpty(maps))
                    {
                        List<ImageInfo> imageinfos = new List<ImageInfo>();
                        string[] maprows = maps.Split(new char[] { COM.ConstHelper.rowSplit });
                        for (int i = 0; i < maprows.Length; i++)
                        {
                            MapTargetImageInfo maptargetimageinfo = ParseImageHelper.ParseMapTargetImageInfo(maprows[i]);

                            ImageInfo imageinfo = ParseImageHelper.ParseImageInfo(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM image_imageinfo WHERE id={0} AND ztm={1} AND bsm{2}", maptargetimageinfo.ImageInfoId, (int)MODEL.Enum.State.InUse, userbsms)));

                            if (imageinfo != null)
                            {
                                imageinfos.Add(imageinfo);
                            }
                        }
                        if (imageinfos.Count != 0)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(imageinfos)));
                        }
                        else
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无影像！", string.Empty));
                        }
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无目标-影像映射！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无影像！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }



        /// <summary>
        ///  3---查看|获取选中影像文件
        /// </summary>
        /// <param name="id">imageinfo id</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetImageFile(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
            if (cookieResult == CookieHelper.CookieResult.SuccessCookkie)
            {
                string imgpath = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT yxlj FROM image_imageinfo WHERE id={0} AND ztm={1} AND bsm{2}", id, (int)MODEL.Enum.State.InUse, userbsms));

                string[] ljs = imgpath.Split(new char[] { '\\' });
                imgpath = ljs[0] + "\\" + ljs[1] + "\\" + ljs[2] + "\\" + ljs[3] + "\\" + "Thumbnail" + "\\" + ljs[4];
                if (!string.IsNullOrEmpty(imgpath))
                {
                    //路径——>byte——>bitmap——>Base64
                    //还未验证是否无损或其他问题
                    byte[] img = System.IO.File.ReadAllBytes(imgpath);
                    MemoryStream ms = new MemoryStream(img);
                    Bitmap bitmap = (Bitmap)Image.FromStream(ms);
                    string image = BitmapToBase64(bitmap);
                    ms.Close(); //关闭流
                    if (image != null)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(image)));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无影像！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "未查询到该影像路径！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }



        /// <summary>
        /// 4---删除影像
        /// </summary>
        /// <summary>
        [HttpDelete]
        public string DeleteImage()
        {
            string id = HttpContext.Current.Request.Form["id"];

            string cookie = HttpContext.Current.Request.Form["cookie"];
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                int updatetimeimagecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE image_imageinfo SET ztm={0} WHERE id={1} AND bsm{2}", (int)MODEL.Enum.State.NoUse, id, userbsms));
                if (updatetimeimagecount == 1)
                {
                    int updatemapimagecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE image_map_target_imageinfo SET ztm={0} WHERE imageinfoid={1}", (int)MODEL.Enum.State.NoUse, id));
                    if (updatemapimagecount == 1)
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

        /// <summary>
        /// 5---获取所有影像信息          陈小飞
        /// <param name="id">检查系统项目id</param>
        /// <param name="targetId">目标id</param>
        /// <param name="yxmc">影响名称</param>
        /// <param name="xszt">巡视状态</param>
        /// </summary>
        [HttpGet]
        public string GetMonImageInfos(int id,string targetId,string yxmc,string xszt, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
            if (cookieResult == CookieHelper.CookieResult.SuccessCookkie)
            {
                //查询项目影像id
                string imgProjectId = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT img_projectid FROM image_map_project_monitor_project WHERE mon_projectid={0} ", id));
                if (string.IsNullOrEmpty(imgProjectId))
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无对应的影像系统项目！", string.Empty));
                }
                var sql1 = "SELECT a.* FROM image_map_target_imageinfo a, image_map_project_target b where a.targetid=b.targetid AND a.ztm='1' AND b.ztm='1'   ";
                if (!string.IsNullOrEmpty(targetId))
                {
                    sql1 = sql1 + "and b.targetid = '" + targetId + "'";
                }
                sql1 = sql1 + "and b.projectid ={0}";


                int imagecount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format(sql1, imgProjectId));
                if (imagecount != 0)
                {
                    

                    var sql2 = "SELECT c.*,b.targetid  FROM image_map_target_imageinfo a, image_map_project_target b,image_imageinfo c where a.targetid=b.targetid AND a.ztm='1' AND b.ztm='1'   ";
                    if (!string.IsNullOrEmpty(targetId))
                    {
                        sql2 = sql2 + "and b.targetid = '" + targetId + "'";
                    }
                    if (!string.IsNullOrEmpty(yxmc))
                    {
                        sql2 = sql2 + "and c.yxmc like '%" + yxmc + "%'";
                    }
                    if (!string.IsNullOrEmpty(xszt))
                    {
                        sql2 = sql2 + "and c.xszt = '" + xszt + "'";
                    }
                    sql2 = sql2 + "and b.projectid ={0} and c.id=a.imageinfoid  AND  c.ztm='1' ";

                    string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(sql2 + "ORDER BY c.id ASC", imgProjectId));

                    if (!string.IsNullOrEmpty(maps))
                    {
                        List<ImageInfo> imageinfos = new List<ImageInfo>();
                        string[] maprows = maps.Split(new char[] { COM.ConstHelper.rowSplit });
                        for (int i = 0; i < maprows.Length; i++)
                        {
                            ImageInfo imageinfo = ParseImageHelper.ParseImageInfo(maprows[i]);
                            if (imageinfo != null)
                            {
                                imageinfos.Add(imageinfo);
                            }
                        }
                        if (imageinfos.Count != 0)
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", JsonHelper.ToJson(imageinfos)));
                        }
                        else
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无影像！", string.Empty));
                        }
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无目标-影像映射！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无影像！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }

        /// <summary>
        /// 更新巡视信息
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdatePartorLieFeng()
        {
            string xszt = HttpContext.Current.Request.Form["xszt"];//状态
            string xsjg = HttpContext.Current.Request.Form["xsjg"];//结果
            string cookie = HttpContext.Current.Request.Form["cookie"];
            string id = HttpContext.Current.Request.Form["id"];

            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE image_imageinfo SET xszt={0},xsjg={1} WHERE id={2} " ,  SQLHelper.UpdateString(xszt), SQLHelper.UpdateString(xsjg), SQLHelper.UpdateString(id)));
               if (updatecount == 1)
                {
                    return "更新成功";
                }
            }
            else
            {
                //无此权限
                return "重新登陆！";
            }

            return string.Empty;
        }




        /// <summary>
        /// 获得字符串中开始和结束字符串中间得值
        /// </summary>
        /// <param name="str">字符串</param>
        /// <param name="s">开始</param>
        /// <param name="e">结束</param>
        /// <returns></returns> 
        public string GetValue(string str, string s, string e)
        {
            Regex rg = new Regex("(?<=(" + s + "))[.\\s\\S]*?(?=(" + e + "))", RegexOptions.Multiline | RegexOptions.Singleline);
            return rg.Match(str).Value;
        }

        //base64编码的文本转为图片    
        private System.Drawing.Image Base64StringToImage(string txt)
        {
            byte[] arr = Convert.FromBase64String(txt);
            MemoryStream ms = new MemoryStream(arr);
            Bitmap bmp = new Bitmap(ms);
            return bmp;
        }

        ////图片转为二进制流
        //public byte[] GetBytesFromImage(string filename)

        //{

        //    FileStream fs = new FileStream(filename, FileMode.Open, FileAccess.Read);

        //    int length = (int)fs.Length;

        //    byte[] image = new byte[length];

        //    fs.Read(image, 0, length);

        //    fs.Close();

        //    return image;

        //}

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

        /// <summary>
        /// 1---调查区图片上舛（表单提交、图片上传至服务器）  陈小飞
        /// </summary>
        [HttpPost]
        public string UploadXiePoImage()
        {
            #region 参数

            string cookie = HttpContext.Current.Request.Form["cookie"];

            #region EXIF
            string timeimg = HttpContext.Current.Request.Form["timeimg"]; //影像采集时间

            string geshi = HttpContext.Current.Request.Form["geshi"]; //格式

            #endregion
            #endregion

            #region 解析验证用户
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref userbsms);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {

                #region 参数检查
                if (string.IsNullOrEmpty(timeimg))
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "影像数据为空！", string.Empty));
                }
                #endregion

                #region base64转二进制
                byte[] bytea = null;
                try
                {
                    bytea = Convert.FromBase64String(timeimg.Replace(geshi + ",", ""));
                }
                catch
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "影像数据存在错误！", string.Empty));
                }
                #region 另存为本地图片
                string ImageFilePath = imgdir + "/SurImage/xiepo";        //   ".../SurImage"
                if (!Directory.Exists(ImageFilePath))//判断文件夹是否存在
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "影像存储路径不存在！", string.Empty));
                }

                string yxbh = "xiePo" + DateTime.Now.ToString("yyyyMMddHHmmss");//影像名称

                string imageFileName = ImageFilePath + "/" + yxbh + ".jpg";//定义图片命名
                File.WriteAllBytes(imageFileName, bytea); //保存图片到本地服务器，然后获取路径  
                if (!File.Exists(imageFileName))
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "影像存储失败！", string.Empty));
                }
                #endregion

                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "上传成功", yxbh));

                #endregion





            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, cookieResult.GetRemark(), string.Empty));
            }
        }
        /// <summary>
        /// 1---调查区图片上舛（表单提交、图片上传至服务器）  陈小飞
        /// </summary>
        [HttpPost]
        public string UploadWeChartImage()
        {
            //string step = null;
            try
            {
                string ImageFilePath = imgdir + "/SurImage/wechart/";        //   ".../SurImage"
                HttpPostedFile file = HttpContext.Current.Request.Files["upload"];
                string projectId = HttpContext.Current.Request.Form["projectId"];
                string patrolNum = HttpContext.Current.Request.Form["patrolNum"];
                string patrolTime = HttpContext.Current.Request.Form["patrolTime"];


                if (file!=null)
                {
                    Stream sr = file.InputStream;
                    Bitmap bitmap = (Bitmap)Bitmap.FromStream(sr);
                    
                    if (!Directory.Exists(ImageFilePath))//判断文件夹是否存在
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "影像存储路径不存在！", string.Empty));
                    }
                    
                  
                    file.SaveAs(ImageFilePath + file.FileName);// +".txt");
                   string lujin= "/SurImage/wechart/" + file.FileName;
                   string value = "("
                       + SQLHelper.UpdateString(lujin) + ","
                       + SQLHelper.UpdateString(projectId) + ","
                       + SQLHelper.UpdateString(patrolNum) + ","
                       + SQLHelper.UpdateString(patrolTime) + ")";
                    int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO patrol_photo_info (photo_url,project_id,patrol_num,patrol_time) VALUES"+ value);
                    if (id != -1)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "上传成功！", id+""));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "数据库插入失败", ""));
                    }
                        
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "影像存储失败！", string.Empty));
                }


            }
            catch (Exception ex)
            {
                throw ex;
            }
           


        }
        /// <summary>
        /// 1---施工图片上传（表单提交、图片上传至服务器）  陈小飞
        /// </summary>
        [HttpPost]
        public string UploadConstImage()
        {
            //string step = null;
            try
            {
                string ImageFilePath = imgdir + "/SurImage/const/";        //   ".../SurImage"
                HttpPostedFile file = HttpContext.Current.Request.Files["upload"];
                string projectId = HttpContext.Current.Request.Form["projectId"];
                string type = HttpContext.Current.Request.Form["type"];
                string constTime = HttpContext.Current.Request.Form["constTime"];
                string patrolTtypeime = HttpContext.Current.Request.Form["type"];
                string monitorId = HttpContext.Current.Request.Form["monitorId"];
                string insetNo = HttpContext.Current.Request.Form["insetNo"];
                string cardNo = HttpContext.Current.Request.Form["cardNo"];


                if (file != null)
                {
                    Stream sr = file.InputStream;
                    Bitmap bitmap = (Bitmap)Bitmap.FromStream(sr);

                    if (!Directory.Exists(ImageFilePath))//判断文件夹是否存在
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "影像存储路径不存在！", string.Empty));
                    }


                    file.SaveAs(ImageFilePath +file.FileName);// +".txt");//DateTime.Now.ToString("yyyyMMddHHmm")
                    string lujin = "/SurImage/const/" + file.FileName;
                    string value = "("
                        + SQLHelper.UpdateString(lujin) + ","
                        + SQLHelper.UpdateString(projectId) + ","
                        + SQLHelper.UpdateString(monitorId) + ","
                        + SQLHelper.UpdateString(type) + ","
                        + SQLHelper.UpdateString(constTime) ;

                    string sql = "INSERT INTO const_photo_info(photo_url, project_id, monitor_id, type, const_time";
                    if (!string.IsNullOrEmpty(insetNo))
                    {
                        sql = sql + ",inset_no ";
                        value = value + "," + SQLHelper.UpdateString(insetNo);
                    }
                    if (!string.IsNullOrEmpty(cardNo))
                    {
                        sql = sql + ",card_no ";
                        value = value + "," + SQLHelper.UpdateString(cardNo);
                    }
                    value = value + ")";
                    sql = sql + ") VALUES ";


                    int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, sql + value);
                    if (id != -1)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "上传成功！", id + ""));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "数据库插入失败", ""));
                    }

                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "影像存储失败！", string.Empty));
                }


            }
            catch (Exception ex)
            {
                throw ex;
            }



        }

        /// <summary>
        /// 陈小飞---删除施工图片
        /// </summary>
        /// <summary>
        [HttpPost]
        public string DeleteConstImage()
        {
            string id = HttpContext.Current.Request.Form["id"];
            string photoUrl = HttpContext.Current.Request.Form["photoUrl"];
            if (!string.IsNullOrEmpty(photoUrl))
            {

                try
                {
                    System.IO.FileInfo DeleFile = new System.IO.FileInfo(imgdir + photoUrl);
                    if (DeleFile.Exists)
                    {
                        DeleFile.Delete();
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "路径传入错误！", string.Empty));
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }


            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "路径传入错误！", string.Empty));
            }


            int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("DELETE from const_photo_info  WHERE id={0}", id));
            if (updatecount == 1)
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "删除成功！", string.Empty));
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "删除失败！", string.Empty));
            }

        }

        
        /// <summary>
        /// 1---临时道路图片上传（表单提交、图片上传至服务器）  陈小飞
        /// </summary>
        [HttpPost]
        public string UploadDaoLuImage()
        {
            //string step = null;
            try
            {
                string ImageFilePath = imgdir + "/SurImage/road/";        //   ".../SurImage"
                HttpPostedFile file = HttpContext.Current.Request.Files["upload"];


                if (file != null)
                {
                    Stream sr = file.InputStream;
                    Bitmap bitmap = (Bitmap)Bitmap.FromStream(sr);

                    if (!Directory.Exists(ImageFilePath))//判断文件夹是否存在
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "影像存储路径不存在！", string.Empty));
                    }


                    file.SaveAs(ImageFilePath + file.FileName);// +".txt");//DateTime.Now.ToString("yyyyMMddHHmm")
                    string lujin = "/SurImage/road/" + file.FileName;
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "上传成功！", lujin));
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "影像存储失败！", string.Empty));
                }


            }
            catch (Exception ex)
            {
                throw ex;
            }



        }
    }
}
