using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

using COM;
using DAL;
using MODEL;

namespace SERVICE.Controllers
{
    /// <summary>
    /// 消落带项目
    /// </summary>
    public class FlzWindowInfoController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(FlzWindowInfoController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 新建测区
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddFlzWindow()
        {
            #region 参数
            string projectId = HttpContext.Current.Request.Form["projectId"];
            string points = HttpContext.Current.Request.Form["points"];
            string creatTime = HttpContext.Current.Request.Form["creatTime"];
            string name = HttpContext.Current.Request.Form["name"];
            string remarks = HttpContext.Current.Request.Form["remarks"];
            string sideLength = HttpContext.Current.Request.Form["sideLength"];
            string sidebLength = HttpContext.Current.Request.Form["sidebLength"];
            string axisx = HttpContext.Current.Request.Form["axisx"];
            string axisy = HttpContext.Current.Request.Form["axisy"];
            string normal = HttpContext.Current.Request.Form["normal"];
            string origin = HttpContext.Current.Request.Form["origin"];
            string vertices2d = HttpContext.Current.Request.Form["vertices2d"];
            string vertices3d = HttpContext.Current.Request.Form["vertices3d"];
            string vertices3dlbh = HttpContext.Current.Request.Form["vertices3dlbh"];
            string level = HttpContext.Current.Request.Form["level"];
            string vertical = HttpContext.Current.Request.Form["vertical"];
            string height = HttpContext.Current.Request.Form["height"];
            
            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if (user == null)
                {
                    return "用户为空！";
                }

                if (!string.IsNullOrEmpty(projectId)
                    && !string.IsNullOrEmpty(points)
                    && !string.IsNullOrEmpty(creatTime)
                    && !string.IsNullOrEmpty(name)
                    && !string.IsNullOrEmpty(remarks)
                    && !string.IsNullOrEmpty(sideLength))
                {
                    string sql = "INSERT INTO flz_window_info (project_id,points,creat_time,name,side_length,remarks";
                    string value = "("
                    + projectId + ","
                    + SQLHelper.UpdateString(points) + ","
                    + SQLHelper.UpdateString(creatTime) + ","
                    + SQLHelper.UpdateString(name) + ","
                    + SQLHelper.UpdateString(sideLength) + ","
                    + SQLHelper.UpdateString(remarks);

                    if (!string.IsNullOrEmpty(sidebLength))
                    {
                        sql = sql + ",sideb_length";
                        value = value + "," + SQLHelper.UpdateString(sidebLength);
                    }
                    if (!string.IsNullOrEmpty(axisx))
                    {
                        sql = sql + ",axisx";
                        value = value + "," + SQLHelper.UpdateString(axisx);
                    }
                    if (!string.IsNullOrEmpty(axisy))
                    {
                        sql = sql + ",axisy";
                        value = value + "," + SQLHelper.UpdateString(axisy);
                    }
                    if (!string.IsNullOrEmpty(normal))
                    {
                        sql = sql + ",normal";
                        value = value + "," + SQLHelper.UpdateString(normal) ;
                    }
                    if (!string.IsNullOrEmpty(origin))
                    {
                        sql = sql + ",origin";
                        value = value + "," + SQLHelper.UpdateString(origin);
                    }
                    if (!string.IsNullOrEmpty(vertices2d))
                    {
                        sql = sql + ",vertices2d";
                        value = value + "," + SQLHelper.UpdateString(vertices2d);
                    }
                    if (!string.IsNullOrEmpty(vertices3d))
                    {
                        sql = sql + ",vertices3d";
                        value = value + "," + SQLHelper.UpdateString(vertices3d);
                    }
                    if (!string.IsNullOrEmpty(vertices3dlbh))
                    {
                        sql = sql + ",vertices3dlbh";
                        value = value + "," + SQLHelper.UpdateString(vertices3dlbh);
                    }
                    if (!string.IsNullOrEmpty(level))
                    {
                        sql = sql + ",level";
                        value = value + "," + SQLHelper.UpdateString(level);
                    }
                    if (!string.IsNullOrEmpty(vertical))
                    {
                        sql = sql + ",vertical";
                        value = value + "," + SQLHelper.UpdateString(vertical);
                    }
                    if (!string.IsNullOrEmpty(height))
                    {
                        sql = sql + ",height";
                        value = value + "," + SQLHelper.UpdateString(height);
                    }
                        
                    int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, sql +") VALUES" + value + ")" );
                    if (id != -1)
                    {
                        return id + "";
                    }
                    else
                    {
                        return "保存失败！";
                    }

                }
                else
                {
                    return "参数不全！";
                }
            }
            else
            {
                return "验证用户失败！";
            }
        }
        /// <summary>
        /// 更新项目
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string UpdateFlzWindow()
        {
            #region 参数
            string name = HttpContext.Current.Request.Form["name"];
            string remarks = HttpContext.Current.Request.Form["remarks"];
            string id = HttpContext.Current.Request.Form["id"];

            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if (user == null)
                {
                    return "用户为空！";
                }

                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(" UPDATE flz_window_info set name={0} ,remarks={1} where id={2}"
                        , SQLHelper.UpdateString(name),
                            SQLHelper.UpdateString(remarks),
                            id));
                if (updatecount == 1)
                {
                    return "更新成功";
                }
                else
                {
                    return "更新失败";
                }
            }
            else
            {
                return "验证用户失败！";
            }
        }
        /// <summary>
        /// 删除项目
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteFlzWindow()
        {
            string id = HttpContext.Current.Request.Form["id"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("DELETE FROM  flz_window_info  WHERE id={0}", id));
                //删除节理数据
                updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("DELETE FROM  flz_data_point  WHERE window_id={0}", id));
                if (updatecount!= -1)
                {
                    return "删除成功";
                }
                else
                {
                    return "删除失败";
                }
            }
            else
            {
                return "用户验证失败！";
            }
        }
        /// <summary>
        /// 获取测窗信息
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie">用户信息</param>
        /// <returns></returns>
        [HttpGet]
        public string GetWindowInfoList(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);


            FlzProject project = ParseFlzoneHelper.ParseProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM flz_project WHERE id={0}  AND ztm={1}", id, (int)MODEL.Enum.State.InUse)));
            if (project != null)
            {
                #region
                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM flz_window_info WHERE project_id={0}", id));
                if (!string.IsNullOrEmpty(data))
                {
                    List<FlzWindowInfo> flzWindowInfo = new List<FlzWindowInfo>();
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        FlzWindowInfo flzData = ParseFlzoneHelper.ParseFlzWindowInfo(rows[i]);
                        flzWindowInfo.Add(flzData);
                    }
                    return JsonHelper.ToJson(flzWindowInfo);
                }
            }
            #endregion


            return "没有项目";
        }

        /// <summary>
        /// 获取所有测创新系
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie">用户信息</param>
        /// <returns></returns>
        [HttpGet]
        public string GetXiaoLuoWindowInfoList()
        {
            #region
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("select measur_window_position from rock_design_data  where project_id in (12,17) and measur_window_position like '%CC%' and measur_window_position not in (select a.measur_window_position from rock_design_data a , survey_model b where  a.measur_window_position like  concat('%',b.mxmc,'%')) ORDER BY measur_window_position"));
            if (!string.IsNullOrEmpty(data))
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                return JsonHelper.ToJson(rows);
            }
           
            #endregion


            return "没有项目";
        }

        /// <summary>
        /// 自定义测区
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string getWindowInfo()
        {
            #region 参数
            string bpsList = HttpContext.Current.Request.Form["bpsList"];//边界list
            string eyesList = HttpContext.Current.Request.Form["eyesList"];//视界list
            string spsList = HttpContext.Current.Request.Form["spsList"];//加密点list

            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if (user == null)
                {
                    return "用户为空！";
                }
                //Object list1 = JsonHelper.ToObject<string>(x);

                List<xyz> bps = JsonHelper.ToObject<List<xyz>>(bpsList);
                List<xyz> eyes = JsonHelper.ToObject<List<xyz>>(eyesList);
                List<xyz> sps = JsonHelper.ToObject<List<xyz>>(spsList);
                List<XYZ> bps_XYZ = new List<XYZ>();
                for (int i = 0; i < bps.Count; i++)
                {
                    bps_XYZ.Add(new XYZ(bps[i].x, bps[i].y, bps[i].z));
                }
                List<XYZ> eyes_XYZ = new List<XYZ>();
                for (int i = 0; i < eyes.Count; i++)
                {
                    eyes_XYZ.Add(new XYZ(eyes[i].x, eyes[i].y, eyes[i].z));
                }
                List<XYZ> sps_XYZ = new List<XYZ>();
                for (int i = 0; i < sps.Count; i++)
                {
                    sps_XYZ.Add(new XYZ(sps[i].x, sps[i].y, sps[i].z));
                }


                COM.GeologyWindow gw = COM.Fit.FitPlane(bps_XYZ, eyes_XYZ, sps_XYZ);
                

           

                if (!string.IsNullOrEmpty(bpsList)
                    && !string.IsNullOrEmpty(eyesList) && !string.IsNullOrEmpty(spsList))
                {

                    //string value = "("
                    //+ projectId + ","
                    //+ SQLHelper.UpdateString(points) + ","
                    //+ SQLHelper.UpdateString(creatTime) + ","
                    //+ SQLHelper.UpdateString(name) + ","
                    //+ SQLHelper.UpdateString(sideLength) + ","
                    //+ SQLHelper.UpdateString(remarks)
                    //+ ")";


                    //int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO flz_window_info (project_id,points,creat_time,name,side_length,remarks) VALUES" + value);
                    //if (id != -1)
                    //{
                    //    return id + "";
                    //}
                    //else
                    //{
                    //    return "保存失败！";
                    //}
                    return JsonHelper.ToJson(gw);//无角色
                    //return bpsList;
                }
                else
                {
                    return "参数不全！";
                }
            }
            else
            {
                return "验证用户失败！";
            }
        }
        /// <summary>
        /// 自定义测区2
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string getRockWindowInfo()
        {
            #region 参数
            string target = HttpContext.Current.Request.Form["target"];//边界list
            string eye = HttpContext.Current.Request.Form["eye"];//视界list
            string sps = HttpContext.Current.Request.Form["sps"];//加密点list
            string w = HttpContext.Current.Request.Form["w"];//加密点list
            string h = HttpContext.Current.Request.Form["h"];//加密点list

            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion
            
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if (user == null)
                {
                    return "用户为空！";
                }
                //Object list1 = JsonHelper.ToObject<string>(x);

               // xyz target = JsonHelper.ToObject<xyz>(target);
               
                List<xyz> spslist = JsonHelper.ToObject<List<xyz>>(sps);

                XYZ x= JsonHelper.ToObject<XYZ>(target);

                XYZ y= JsonHelper.ToObject<XYZ>(eye);

                List<XYZ> bps_XYZ = new List<XYZ>();
           
                List<XYZ> sps_XYZ = new List<XYZ>();

                
                double m = Double.Parse(w);
                double n = Double.Parse(h);

                for (int i = 0; i < spslist.Count; i++)
                {
                    sps_XYZ.Add(new XYZ(spslist[i].x, spslist[i].y, spslist[i].z));
                }



                COM.GeologyWindow gw = COM.Fit.FitFixPlane(x, y, sps_XYZ, m, n);


                return JsonHelper.ToJson(gw);
            }
            else
            {
                return "验证用户失败！";
            }
        }

         ///  不想加类，斜坡的放在这里
        /// <summary>
        /// 新建斜坡单元
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddFlzSteepHill()
        {
            #region 参数
            string projectId = HttpContext.Current.Request.Form["projectId"];
            string points = HttpContext.Current.Request.Form["points"];
            string creatTime = HttpContext.Current.Request.Form["creatTime"];
            string name = HttpContext.Current.Request.Form["name"];
            string remarks = HttpContext.Current.Request.Form["remarks"];
            string level = HttpContext.Current.Request.Form["level"];
            string vertical = HttpContext.Current.Request.Form["vertical"];
            string status = HttpContext.Current.Request.Form["status"];

            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if (user == null)
                {
                    return "用户为空！";
                }

                if (!string.IsNullOrEmpty(projectId)
                    && !string.IsNullOrEmpty(points)
                    && !string.IsNullOrEmpty(name)
                    && !string.IsNullOrEmpty(remarks))
                {
                    string sql = "INSERT INTO flz_steep_hill_info (project_id,points,creat_time,name,remarks";
                    string value = "("
                    + projectId + ","
                    + SQLHelper.UpdateString(points) + ","
                    + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy/MM/dd")) + ","
                    + SQLHelper.UpdateString(name) + ","
                  
                    + SQLHelper.UpdateString(remarks);

                    
                    if (!string.IsNullOrEmpty(level))
                    {
                        sql = sql + ",level";
                        value = value + "," + SQLHelper.UpdateString(level);
                    }
                    if (!string.IsNullOrEmpty(vertical))
                    {
                        sql = sql + ",vertical";
                        value = value + "," + SQLHelper.UpdateString(vertical);
                    }
                    if (!string.IsNullOrEmpty(status))
                    {
                        sql = sql + ",status";
                        value = value + "," + SQLHelper.UpdateString(status);
                    }

                    int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, sql + ") VALUES" + value + ")");
                    if (id != -1)
                    {
                        return id + "";
                    }
                    else
                    {
                        return "保存失败！";
                    }

                }
                else
                {
                    return "参数不全！";
                }
            }
            else
            {
                return "验证用户失败！";
            }
        }

        /// <summary>
        /// 获取斜坡信息
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie">用户信息</param>
        /// <returns></returns>
        [HttpGet]
        public string GetSteepHillInfoList(int id, string cookie,string jieLun )
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            string sql = "SELECT * FROM flz_steep_hill_info WHERE project_id ={0}";
            if (!string.IsNullOrEmpty(jieLun))
            {
                sql = sql + "and jielun =" + SQLHelper.UpdateString(jieLun); 
            }
            #region
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(sql, id));
            if (!string.IsNullOrEmpty(data))
            {
                List<FlzSteepHillInfo> flSteepHillInfo = new List<FlzSteepHillInfo>();
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    FlzSteepHillInfo flzData = ParseFlzoneHelper.ParseFlzSteepHillInfo(rows[i]);
                    flSteepHillInfo.Add(flzData);
                }
                return JsonHelper.ToJson(flSteepHillInfo);
            }
            #endregion


            return "";
        }

        /// <summary>
        /// 删除斜坡单元
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteFlzSteepHill()
        {
            string id = HttpContext.Current.Request.Form["id"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("DELETE FROM  flz_steep_hill_info  WHERE id={0}", id));
                if (updatecount == 1)
                {
                    return "删除成功";
                }
                else
                {
                    return "删除失败";
                }
            }
            else
            {
                return "用户验证失败！";
            }
        }
        /// <summary>
        /// 更新斜坡单元
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string UpdateFlzSteepHill()
        {
            #region 参数
            string appd = HttpContext.Current.Request.Form["appd"];
            string appdrest = HttpContext.Current.Request.Form["appdrest"];
            string apjg = HttpContext.Current.Request.Form["apjg"];
            string apjgrest = HttpContext.Current.Request.Form["apjgrest"];
            string xpbj = HttpContext.Current.Request.Form["xpbj"];
            string xpbjrest = HttpContext.Current.Request.Form["xpbjrest"];
            string yxyz = HttpContext.Current.Request.Form["yxyz"];
            string yxyzrest = HttpContext.Current.Request.Form["yxyzrest"];
            string ruc = HttpContext.Current.Request.Form["ruc"];
            string rucrest = HttpContext.Current.Request.Form["rucrest"];
            string ytjg = HttpContext.Current.Request.Form["ytjg"];
            string ytjgrest = HttpContext.Current.Request.Form["ytjgrest"];
            string ytfh = HttpContext.Current.Request.Form["ytfh"];
            string ytfhrest = HttpContext.Current.Request.Form["ytfhrest"];
            string ytlh = HttpContext.Current.Request.Form["ytlh"];
            string ytlhrest = HttpContext.Current.Request.Form["ytlhrest"];
            string dxdm = HttpContext.Current.Request.Form["dxdm"];
            string dzgz = HttpContext.Current.Request.Form["dzgz"];
            string gcdz = HttpContext.Current.Request.Form["gcdz"];
            string score = HttpContext.Current.Request.Form["score"];
            string id = HttpContext.Current.Request.Form["id"];
            string appdSrc = HttpContext.Current.Request.Form["appdSrc"];
            string apjgSrc = HttpContext.Current.Request.Form["apjgSrc"];
            string xpbjSrc = HttpContext.Current.Request.Form["xpbjSrc"];
            string yxyzSrc = HttpContext.Current.Request.Form["yxyzSrc"];
            string rucSrc = HttpContext.Current.Request.Form["rucSrc"];
            string ytjgSrc = HttpContext.Current.Request.Form["ytjgSrc"];
            string ytfhSrc = HttpContext.Current.Request.Form["ytfhSrc"];
            string ytlhSrc = HttpContext.Current.Request.Form["ytlhSrc"];
            string jieLun = HttpContext.Current.Request.Form["jieLun"];
            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if (user == null)
                {
                    return "用户为空！";
                }
                string sql = " UPDATE flz_steep_hill_info set appd={0} "; 
                if (!string.IsNullOrEmpty(appdrest)) { sql = sql + ", appdrest = '" + appdrest + "'"; };
                if (!string.IsNullOrEmpty(apjg)) { sql = sql + ", apjg = '" + apjg + "'"; };
                if (!string.IsNullOrEmpty(apjgrest)) { sql = sql + ", apjgrest = '" + apjgrest + "'"; };
                if (!string.IsNullOrEmpty(xpbj)) { sql = sql + ", xpbj = '" + xpbj + "'"; };
                if (!string.IsNullOrEmpty(xpbjrest)) { sql = sql + ", xpbjrest = '" + xpbjrest + "'"; };
                if (!string.IsNullOrEmpty(yxyz)) { sql = sql + ", yxyz = '" + yxyz + "'"; };
                if (!string.IsNullOrEmpty(yxyzrest)) { sql = sql + ", yxyzrest = '" + yxyzrest + "'"; };
                if (!string.IsNullOrEmpty(ruc)) { sql = sql + ", ruc = '" + ruc + "'"; };
                if (!string.IsNullOrEmpty(rucrest)) { sql = sql + ", rucrest  = '" + rucrest + "'"; };
                if (!string.IsNullOrEmpty(ytjg)) { sql = sql + ", ytjg = '" + ytjg + "'"; };
                if (!string.IsNullOrEmpty(ytjgrest)) { sql = sql + ", ytjgrest = '" + ytjgrest + "'"; };
                if (!string.IsNullOrEmpty(ytfh)) { sql = sql + ", ytfh = '" + ytfh + "'"; };
                if (!string.IsNullOrEmpty(ytfhrest)) { sql = sql + ", ytfhrest = '" + ytfhrest + "'"; };
                if (!string.IsNullOrEmpty(ytlh)) { sql = sql + ", ytlh = '" + ytlh + "'"; };
                if (!string.IsNullOrEmpty(ytlhrest)) { sql = sql + ", ytlhrest = '" + ytlhrest + "'"; };
                if (!string.IsNullOrEmpty(dxdm)) { sql = sql + ", dxdm = '" + dxdm + "'"; };
                if (!string.IsNullOrEmpty(dzgz)) { sql = sql + ", dzgz = '" + dzgz + "'"; };
                if (!string.IsNullOrEmpty(gcdz)) { sql = sql + ", gcdz = '" + gcdz + "'"; };
                if (!string.IsNullOrEmpty(score)) { sql = sql + ", score    = '" + score + "'"; };
                if (!string.IsNullOrEmpty(appdSrc)) { sql = sql + ", appdSrc = '" + appdSrc + "'"; };
                if (!string.IsNullOrEmpty(apjgSrc)) { sql = sql + ", apjgSrc = '" + apjgSrc + "'"; };
                if (!string.IsNullOrEmpty(xpbjSrc)) { sql = sql + ", xpbjSrc = '" + xpbjSrc + "'"; };
                if (!string.IsNullOrEmpty(yxyzSrc)) { sql = sql + ", yxyzSrc = '" + yxyzSrc + "'"; };
                if (!string.IsNullOrEmpty(rucSrc)) { sql = sql + ", rucSrc  = '" + rucSrc + "'"; };
                if (!string.IsNullOrEmpty(ytjgSrc)) { sql = sql + ", ytjgSrc = '" + ytjgSrc + "'"; };
                if (!string.IsNullOrEmpty(ytfhSrc)) { sql = sql + ", ytfhSrc = '" + ytfhSrc + "'"; };
                if (!string.IsNullOrEmpty(ytlhSrc)) { sql = sql + ", ytlhSrc = '" + ytlhSrc + "'"; };
                if (!string.IsNullOrEmpty(jieLun)) { sql = sql + ", jieLun = '" + jieLun + "'"; };
                sql = sql + ", status = '" + 1 + "'";
                sql = sql + " where id={1}";
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(sql  , SQLHelper.UpdateString(appd), id));
                if (updatecount == 1)
                {
                    return "更新成功";
                }
                else
                {
                    return "更新失败";
                }
            }
            else
            {
                return "验证用户失败！";
            }
        }
        /// <summary>
        /// 更新斜坡单元
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string UpdateBianJieFlzSteepHill()
        {
            #region 参数
          
            string id = HttpContext.Current.Request.Form["id"];
            //修改位置，
            string points = HttpContext.Current.Request.Form["points"];
            string level = HttpContext.Current.Request.Form["level"];

            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if (user == null)
                {
                    return "用户为空！";
                }
                string sql = " UPDATE flz_steep_hill_info set points={0},level={1} where id={2} ";
                
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(sql, SQLHelper.UpdateString(points), SQLHelper.UpdateString(level), id));
                if (updatecount == 1)
                {
                    return "更新成功";
                }
                else
                {
                    return "更新失败";
                }
            }
            else
            {
                return "验证用户失败！";
            }
        }

        /// <summary>
        /// 新建斜坡模型
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddFlzShiBieModel()
        {
            #region 参数
            string projectId = HttpContext.Current.Request.Form["projectId"];
            string indicatorType = HttpContext.Current.Request.Form["indicatorType"];
            string identificatIndex = HttpContext.Current.Request.Form["identificatIndex"];
            string indexFactor = HttpContext.Current.Request.Form["indexFactor"];
            string factorValue = HttpContext.Current.Request.Form["factorValue"];
            string evaluationCriteria = HttpContext.Current.Request.Form["evaluationCriteria"];

            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if (user == null)
                {
                    return "用户为空！";
                }

                if (!string.IsNullOrEmpty(projectId)
                    && !string.IsNullOrEmpty(indicatorType)
                    && !string.IsNullOrEmpty(identificatIndex)
                    && !string.IsNullOrEmpty(indexFactor))
                {
                    string sqlFind = "SELECT id FROM flz_distinguish_model_info WHERE project_id ={0} and indicator_Type={1}  and identificat_Index={2}  and index_Factor={3} ";

                    string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(sqlFind, projectId, SQLHelper.UpdateString(indicatorType), SQLHelper.UpdateString(identificatIndex), SQLHelper.UpdateString(indexFactor)));
                    if (!string.IsNullOrEmpty(data))//说明有,多了。
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "存在相同指标类型、识别指标、指标因子的数据！", string.Empty));
                    }

                    string sql = "INSERT INTO flz_distinguish_model_info (project_id,indicator_Type,identificat_Index,index_Factor,factor_Value,evaluation_Criteria";
                    string value = "("
                    + projectId + "," + SQLHelper.UpdateString(indicatorType) + ","
                    + SQLHelper.UpdateString(identificatIndex) + ","
                    + SQLHelper.UpdateString(indexFactor) + ","
                    + SQLHelper.UpdateString(factorValue) + ","
                    + SQLHelper.UpdateString(evaluationCriteria);

                    int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, sql + ") VALUES" + value + ")");
                    if (id != -1)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "新增成功", id+""));
                       
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "保存失败", string.Empty));
                    }

                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "参数不全", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "验证用户失败", string.Empty));
            }
        }

        /// <summary>
        /// 获取识别模型信息
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie">用户信息</param>
        /// <returns></returns>
        [HttpGet]
        public string GetShiBieModelInfoList(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            string sql = "SELECT * FROM flz_distinguish_model_info WHERE project_id ={0}  ORDER BY indicator_type,identificat_Index";
            
            #region
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(sql, id));
            if (!string.IsNullOrEmpty(data))
            {
                List<FlzShiBieModelInfo> flShiBieModelInfo = new List<FlzShiBieModelInfo>();
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                for (int i = 0; i < rows.Length; i++)
                {
                    FlzShiBieModelInfo flzData = ParseFlzoneHelper.ParseFlzShiBieModelInfo(rows[i]);
                    flShiBieModelInfo.Add(flzData);
                }
                return JsonHelper.ToJson(flShiBieModelInfo);
            }
            #endregion


            return "";
        }

        /// <summary>
        /// 删除斜坡模型
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteFlzShiBieModel()
        {
            string id = HttpContext.Current.Request.Form["id"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("DELETE FROM  flz_distinguish_model_info  WHERE id={0}", id));
                if (updatecount == 1)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "删除成功", string.Empty));
                    
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "删除失败", string.Empty));
                   
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "用户验证失败", string.Empty));
            }
        }
        /// <summary>
        /// 更新斜坡模型
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string UpdateFlzShiBieModel()
        {
            #region 参数
            string appd = HttpContext.Current.Request.Form["appd"];
            string appdrest = HttpContext.Current.Request.Form["appdrest"];
            string apjg = HttpContext.Current.Request.Form["apjg"];
            string apjgrest = HttpContext.Current.Request.Form["apjgrest"];
            string xpbj = HttpContext.Current.Request.Form["xpbj"];
            string xpbjrest = HttpContext.Current.Request.Form["xpbjrest"];
            string yxyz = HttpContext.Current.Request.Form["yxyz"];
            string yxyzrest = HttpContext.Current.Request.Form["yxyzrest"];
            string ruc = HttpContext.Current.Request.Form["ruc"];
            string rucrest = HttpContext.Current.Request.Form["rucrest"];
            string ytjg = HttpContext.Current.Request.Form["ytjg"];
            string ytjgrest = HttpContext.Current.Request.Form["ytjgrest"];
            string ytfh = HttpContext.Current.Request.Form["ytfh"];
            string ytfhrest = HttpContext.Current.Request.Form["ytfhrest"];
            string ytlh = HttpContext.Current.Request.Form["ytlh"];
            string ytlhrest = HttpContext.Current.Request.Form["ytlhrest"];
            string dxdm = HttpContext.Current.Request.Form["dxdm"];
            string dzgz = HttpContext.Current.Request.Form["dzgz"];
            string gcdz = HttpContext.Current.Request.Form["gcdz"];
            string score = HttpContext.Current.Request.Form["score"];
            string id = HttpContext.Current.Request.Form["id"];
            string appdSrc = HttpContext.Current.Request.Form["appdSrc"];
            string apjgSrc = HttpContext.Current.Request.Form["apjgSrc"];
            string xpbjSrc = HttpContext.Current.Request.Form["xpbjSrc"];
            string yxyzSrc = HttpContext.Current.Request.Form["yxyzSrc"];
            string rucSrc = HttpContext.Current.Request.Form["rucSrc"];
            string ytjgSrc = HttpContext.Current.Request.Form["ytjgSrc"];
            string ytfhSrc = HttpContext.Current.Request.Form["ytfhSrc"];
            string ytlhSrc = HttpContext.Current.Request.Form["ytlhSrc"];
            string jieLun = HttpContext.Current.Request.Form["jieLun"];
            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookie)
            {
                if (user == null)
                {
                    return "用户为空！";
                }
                string sql = " UPDATE flz_steep_hill_info set appd={0} ";
                if (!string.IsNullOrEmpty(appdrest)) { sql = sql + ", appdrest = '" + appdrest + "'"; };
                if (!string.IsNullOrEmpty(apjg)) { sql = sql + ", apjg = '" + apjg + "'"; };
                if (!string.IsNullOrEmpty(apjgrest)) { sql = sql + ", apjgrest = '" + apjgrest + "'"; };
                if (!string.IsNullOrEmpty(xpbj)) { sql = sql + ", xpbj = '" + xpbj + "'"; };
                if (!string.IsNullOrEmpty(xpbjrest)) { sql = sql + ", xpbjrest = '" + xpbjrest + "'"; };
                if (!string.IsNullOrEmpty(yxyz)) { sql = sql + ", yxyz = '" + yxyz + "'"; };
                if (!string.IsNullOrEmpty(yxyzrest)) { sql = sql + ", yxyzrest = '" + yxyzrest + "'"; };
                if (!string.IsNullOrEmpty(ruc)) { sql = sql + ", ruc = '" + ruc + "'"; };
                if (!string.IsNullOrEmpty(rucrest)) { sql = sql + ", rucrest  = '" + rucrest + "'"; };
                if (!string.IsNullOrEmpty(ytjg)) { sql = sql + ", ytjg = '" + ytjg + "'"; };
                if (!string.IsNullOrEmpty(ytjgrest)) { sql = sql + ", ytjgrest = '" + ytjgrest + "'"; };
                if (!string.IsNullOrEmpty(ytfh)) { sql = sql + ", ytfh = '" + ytfh + "'"; };
                if (!string.IsNullOrEmpty(ytfhrest)) { sql = sql + ", ytfhrest = '" + ytfhrest + "'"; };
                if (!string.IsNullOrEmpty(ytlh)) { sql = sql + ", ytlh = '" + ytlh + "'"; };
                if (!string.IsNullOrEmpty(ytlhrest)) { sql = sql + ", ytlhrest = '" + ytlhrest + "'"; };
                if (!string.IsNullOrEmpty(dxdm)) { sql = sql + ", dxdm = '" + dxdm + "'"; };
                if (!string.IsNullOrEmpty(dzgz)) { sql = sql + ", dzgz = '" + dzgz + "'"; };
                if (!string.IsNullOrEmpty(gcdz)) { sql = sql + ", gcdz = '" + gcdz + "'"; };
                if (!string.IsNullOrEmpty(score)) { sql = sql + ", score    = '" + score + "'"; };
                if (!string.IsNullOrEmpty(appdSrc)) { sql = sql + ", appdSrc = '" + appdSrc + "'"; };
                if (!string.IsNullOrEmpty(apjgSrc)) { sql = sql + ", apjgSrc = '" + apjgSrc + "'"; };
                if (!string.IsNullOrEmpty(xpbjSrc)) { sql = sql + ", xpbjSrc = '" + xpbjSrc + "'"; };
                if (!string.IsNullOrEmpty(yxyzSrc)) { sql = sql + ", yxyzSrc = '" + yxyzSrc + "'"; };
                if (!string.IsNullOrEmpty(rucSrc)) { sql = sql + ", rucSrc  = '" + rucSrc + "'"; };
                if (!string.IsNullOrEmpty(ytjgSrc)) { sql = sql + ", ytjgSrc = '" + ytjgSrc + "'"; };
                if (!string.IsNullOrEmpty(ytfhSrc)) { sql = sql + ", ytfhSrc = '" + ytfhSrc + "'"; };
                if (!string.IsNullOrEmpty(ytlhSrc)) { sql = sql + ", ytlhSrc = '" + ytlhSrc + "'"; };
                if (!string.IsNullOrEmpty(jieLun)) { sql = sql + ", jieLun = '" + jieLun + "'"; };
                sql = sql + ", status = '" + 1 + "'";
                sql = sql + " where id={1}";
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(sql, SQLHelper.UpdateString(appd), id));
                if (updatecount == 1)
                {
                    return "更新成功";
                }
                else
                {
                    return "更新失败";
                }
            }
            else
            {
                return "验证用户失败！";
            }
        }

    }
}
