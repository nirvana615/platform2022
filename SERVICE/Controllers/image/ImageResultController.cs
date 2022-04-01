using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Http;
using COM;
using DAL;
using MODEL;

namespace SERVICE.Controllers
{
    /// <summary>
    ///  图像处理结果展示
    /// </summary>
    public class ImageResultController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(ImageResultController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 获取监测点预设时间范围监测数据
        /// </summary>
        /// <param name="id">监测点id</param>
        /// <param name="predatetime">预设时间范围编码</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetImageResultDatabyPreDateTime(int id, string predatetime, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                //获取时间范围
                string datetime = GetDateTimebyPre(Convert.ToInt16(predatetime));
                if (!string.IsNullOrEmpty(datetime))
                {
                    return GetImageResultDatabyDateTime(id, datetime, userbsms);
                }
            }
            else
            {
                //验权失败
            }

            return string.Empty;
        }


        /// <summary>
        /// 获取监测点自定义时间范围监测数据
        /// </summary>
        /// <param name="id">监测点id</param>
        /// <param name="type">监测点类型</param>
        /// <param name="customdatetime">自定义时间范围</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetImageResultbyCustomDateTime(int id, string customdatetime, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                try
                {
                    //获取时间范围
                    string[] timerange = customdatetime.Replace(" - ", ";").Split(new char[] { ';' });
                    return GetImageResultDatabyDateTime(id, string.Format("(yxcjsj>='{0}' AND yxcjsj<'{1}')", timerange[0], timerange[1]), userbsms);
                }
                catch
                { }
            }
            else
            {
                //验权失败
            }

            return string.Empty;
        }



        /// <summary>
        ///  获取结果数据
        /// </summary>
        private string GetImageResultDatabyDateTime(int id, string time, string userbsms)
        {
            int currenttargetid = id;

            string pretime = time.Replace("gcsj","yxcjsj");
            //string pretime = "yxcjsj>='2018-01-23 11:31:03' AND yxcjsj<'2020-11-23 11:31:03'";
            //实例化
            ImageAllResultInfo imageAllResultInfo = new ImageAllResultInfo();
            imageAllResultInfo.Lefts = new List<Roi>();
            imageAllResultInfo.Rights = new List<Roi>();
            imageAllResultInfo.MatchWays = new List<int>();
            imageAllResultInfo.Results = new List<ImageResult>();

            int roicount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM image_map_target_roi WHERE targetid={0} AND ztm={1}", currenttargetid, (int)MODEL.Enum.State.InUse));
            if (roicount != 0)
            {
                string maps = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_map_target_roi WHERE targetid={0} AND ztm={1} ORDER BY id ASC", currenttargetid, (int)MODEL.Enum.State.InUse));
                if (!string.IsNullOrEmpty(maps))
                {
                    int maptargetroicount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM image_map_target_roi WHERE targetid={0} AND ztm={1}", currenttargetid, (int)MODEL.Enum.State.InUse));
                    if (maptargetroicount > 0)
                    {
                        string maptargetroidata = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_map_target_roi WHERE targetid={0} AND ztm={1} ORDER BY id ASC", currenttargetid, (int)MODEL.Enum.State.InUse));
                        if (!string.IsNullOrEmpty(maptargetroidata))
                        {
                            string[] maptargetroirows = StringHelper.String2Array(maptargetroidata);
                            for (int i = 0; i < maptargetroirows.Length; i++)
                            {
                                MapTargetRoi mapTargetRoi = ParseImageHelper.ParseMapTargetRoi(maptargetroirows[i]);
                                if (mapTargetRoi != null)
                                {
                                    //查询当前第i个靶区属性信息
                                    // string roidata = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_roi WHERE id={0} AND ztm={1} AND bsm{2}", mapTargetRoi.RoiId, (int)MODEL.Enum.State.InUse, userbsms));
                                    //数据隔离，我把它龙掉
                                    string roidata = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_roi WHERE id={0} AND ztm={1} ", mapTargetRoi.RoiId, (int)MODEL.Enum.State.InUse));

                                    if (!string.IsNullOrEmpty(roidata))
                                    {
                                        string[] roirows = StringHelper.String2Array(roidata);
                                        Roi roiinfo = ParseImageHelper.ParseRoi(roirows[0]);
                                        if (roiinfo.BQLX == (int)MODEL.EnumIMG.RoiType.Left)
                                        {
                                            //1---左靶区集合
                                            imageAllResultInfo.Lefts.Add(roiinfo);
                                        }
                                        else
                                        {
                                            //2---右靶区集合
                                            imageAllResultInfo.Rights.Add(roiinfo);
                                        }
                                    }
                                    else
                                    {
                                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "该靶区信息为空！", string.Empty));
                                    }

                                    //查询查询当前第i个靶区对应pretime的所有匹配结果信息
                                    //string imageresultdata = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_result WHERE roiid={0} AND {1} AND ztm={2} AND bsm{3} ORDER BY yxcjsj", mapTargetRoi.RoiId, pretime, (int)MODEL.Enum.State.InUse, userbsms));
                                    string imageresultdata = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM image_result WHERE roiid={0} AND {1} AND ztm={2} ORDER BY yxcjsj", mapTargetRoi.RoiId, pretime, (int)MODEL.Enum.State.InUse));

                                    if (!string.IsNullOrEmpty(imageresultdata))
                                    {
                                        string[] imageresultrows = StringHelper.String2Array(imageresultdata);
                                        for (int j = 0; j < imageresultrows.Length; j++)
                                        {
                                            ImageResult imageresult = ParseImageHelper.ParseImageResult(imageresultrows[j]);
                                            //3---靶区匹配结果集合
                                            imageAllResultInfo.Results.Add(imageresult);

                                            //4---匹配算法集合
                                            if (!imageAllResultInfo.MatchWays.Contains(imageresult.PPSF))
                                            {
                                                imageAllResultInfo.MatchWays.Add(imageresult.PPSF);
                                            }
                                        }
                                    }
                                    else
                                    {
                                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "该靶区匹配信息为空！", string.Empty));
                                    }
                                }
                            }
                        }
                        else
                        {
                            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "靶区信息为空！", string.Empty));
                        }
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "该目标无靶区！", string.Empty));
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

            return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "成功！", COM.JsonHelper.ToJson(imageAllResultInfo)));

        }







        /// <summary>
        /// 根据预设获取观测时间范围
        /// 大于等于开始时间且小于结束时间
        /// </summary>
        /// <param name="pre"></param>
        /// <returns></returns>
        private string GetDateTimebyPre(int pre)
        {
            if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.Today)
            {
                return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy-MM-dd") + " 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.ThisTen)
            {
                int day = Convert.ToInt32(DateTime.Now.ToString("dd"));
                if ((day > 0) && (day < 11))
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy-MM") + "-01 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                }
                else if ((day > 10) && (day < 21))
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy-MM") + "-11 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                }
                else
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy-MM") + "-21 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                }
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.ThisMonth)
            {
                return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy-MM") + "-01 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.ThisQuarterly)
            {
                int month = Convert.ToInt32(DateTime.Now.ToString("MM"));
                if ((month > 0) && (month < 4))
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy") + "-01-01 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                }
                else if ((month > 3) && (month < 7))
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy") + "-04-01 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                }
                else if ((month > 6) && (month < 10))
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy") + "-07-01 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                }
                else
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy") + "-10-01 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                }
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.FirstHalf)
            {
                return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy") + "-01-01 00:00:00", DateTime.Now.ToString("yyyy") + "-06-30 23:59:59");
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.SencondHalf)
            {
                return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy") + "-07-01 00:00:00", DateTime.Now.ToString("yyyy") + "-12-31 23:59:59");
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.ThisYear)
            {
                return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy") + "-01-01 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.Yesterday)
            {
                return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd") + " 00:00:00", DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd") + " 23:59:59");
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.PreTen)
            {
                int year = Convert.ToInt32(DateTime.Now.ToString("yyyy"));
                int month = Convert.ToInt32(DateTime.Now.ToString("MM"));
                int day = Convert.ToInt32(DateTime.Now.ToString("dd"));

                if ((day >= 1) && (day <= 10))
                {
                    if ((month == 1) || (month == 3) || (month == 5) || (month == 7) || (month == 8) || (month == 10) || (month == 12))
                    {
                        return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy-MM") + "-21 00:00:00", DateTime.Now.ToString("yyyy-MM") + "-31 00:00:00");
                    }
                    else if ((month == 4) || (month == 6) || (month == 9) || (month == 11))
                    {
                        return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy-MM") + "-21 00:00:00", DateTime.Now.ToString("yyyy-MM") + "-30 00:00:00");
                    }
                    else
                    {
                        if (year % 4 == 0)
                        {
                            return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy-MM") + "-21 00:00:00", DateTime.Now.ToString("yyyy-MM") + "-29 00:00:00");
                        }
                        else
                        {
                            return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy-MM") + "-21 00:00:00", DateTime.Now.ToString("yyyy-MM") + "-28 00:00:00");
                        }
                    }
                }
                else if ((day >= 11) && (day <= 20))
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy-MM") + "-01 00:00:00", DateTime.Now.ToString("yyyy-MM") + "-10 00:00:00");
                }
                else
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy-MM") + "-11 00:00:00", DateTime.Now.ToString("yyyy-MM") + "-20 00:00:00");
                }
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.PreMonth)
            {
                return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-01 00:00:00", DateTime.Now.ToString("yyyy-MM") + "-01-01 00:00:00");
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.PreQuarterly)
            {
                int month = Convert.ToInt32(DateTime.Now.ToString("MM"));
                if ((month > 0) && (month < 4))
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.AddYears(-1).ToString("yyyy") + "-10-01 00:00:00", DateTime.Now.ToString("yyyy") + "-01-01 00:00:00");
                }
                else if ((month > 3) && (month < 7))
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy") + "-01-01 00:00:00", DateTime.Now.ToString("yyyy") + "-04-01 00:00:00");
                }
                else if ((month > 6) && (month < 10))
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy") + "-04-01 00:00:00", DateTime.Now.ToString("yyyy") + "-07-01 00:00:00");
                }
                else
                {
                    return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.ToString("yyyy") + "-07-01 00:00:00", DateTime.Now.ToString("yyyy") + "-10-01 00:00:00");
                }
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.PreYear)
            {
                return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.AddYears(-1).ToString("yyyy") + "-01-01 00:00:00", DateTime.Now.AddYears(-1).ToString("yyyy") + "-12-31 23:59:59");
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.All)
            {
                return "gcsj IS NOT NULL";
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.LastMonth)
            {
                return string.Format("(gcsj>='{0}' AND gcsj<'{1}')", DateTime.Now.AddDays(-29).ToString("yyyy-MM-dd") + " 00:00:00", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            }

            return string.Empty;
        }



    }
}