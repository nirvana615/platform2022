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
    public class MarkController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(DisasterController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 新增标注
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddMark()
        {
            string cookie = HttpContext.Current.Request.Form["cookie"];
            string postmarks = HttpContext.Current.Request.Form["postmarks"];

            User user = null;
            string userbsms = string.Empty;
            int syscode = 0;

            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie,ref user,ref syscode);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                if (user == null)
                {
                    return "用户为空！";
                }
                if (!string.IsNullOrEmpty(postmarks))
                {
                    List<MarkData> marks = JsonHelper.ToObject<List<MarkData>>(postmarks);
                    int num=0;
                    for (int i = 0; i < marks.Count; i++)
                    {
                        if (!string.IsNullOrEmpty(marks[i].title)
                           && !string.IsNullOrEmpty(marks[i].position)
                           && !string.IsNullOrEmpty(marks[i].style)
                           && !string.IsNullOrEmpty(marks[i].color)
                           && !string.IsNullOrEmpty(marks[i].style)
                           && !string.IsNullOrEmpty(marks[i].info)
                           && !string.IsNullOrEmpty(marks[i].marktype))
                        {
                            string value = "("
                            + SQLHelper.UpdateString(marks[i].title) + ","
                            + SQLHelper.UpdateString(marks[i].marktype) + ","
                            + SQLHelper.UpdateString(marks[i].style) + ","
                            + SQLHelper.UpdateString(marks[i].color) + ","
                            + SQLHelper.UpdateString(marks[i].position) + ","
                            + SQLHelper.UpdateString(marks[i].info) + ","

                            + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                            + (int)MODEL.Enum.State.InUse;
                            string sql = " INSERT INTO common_mark(text, type, style, color, pos,info, cjsj, ztm";
                            int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, sql + ") VALUES" + value + ")");

                            if (id != -1)
                            {

                                if (marks[i].projetid==null)
                                {
                                    marks[i].projetid = "null";
                                }
                                string related_value = "("
                                + id + ","
                                + SQLHelper.UpdateString(marks[i].projetid) + ","
                                + syscode + ","
                                + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                                + (int)MODEL.Enum.State.InUse;
                                string related_sql = " INSERT INTO common_map_project_mark(markid, projectid, syscode, cjsj, ztm";
                                int related_id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, related_sql + ") VALUES" + related_value + ")");
                                if (related_id != -1)
                                {
                                    num++;
                                }
                            }
                        }
                    }
                    if (num== marks.Count)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "保存成功！", JsonHelper.ToJson(marks)));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "保存失败！请重试", string.Empty));
                    }

                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "标注列表为空！！！", string.Empty));

                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无权限！", string.Empty));
            }
        }

        /// <summary>
  /// 获取所有项目标注
  /// </summary>
  /// <param name="markprojectid"></param>
  /// <param name="cookie"></param>
  /// <returns></returns>
        [HttpGet]
        public string GetMarkProjectList(string markprojectid, string cookie)
        {
            User user = null;
            string userbsms = string.Empty;
            int syscode = 0;

            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref user, ref syscode);
            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                string sql = "select b.id,b.text,a.projectid,b.type,b.style, b.color,b.pos,b.info from common_map_project_mark a,common_mark b where a.markid=b.id AND ";
                if (markprojectid!=null)
                {
                    sql = sql + " a.syscode = '"+ syscode + "' AND ( a.projectid='"+ markprojectid + "'OR a.projectid='null') ";
                }
                else
                {
                    sql = sql + " a.syscode = '" + syscode + "' AND a.projectid= 'null'";

                }
                sql = sql + "ORDER BY b.text ASC";
                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(sql));
                if (!string.IsNullOrEmpty(data))
                {
                    List<MarkData> MarkProjectDataList = new List<MarkData>();
                    string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        MarkData markData = ParseMarkHelper.ParseMark(rows[i]);
                        MarkProjectDataList.Add(markData);

                    }
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "获取项目标注成功", JsonHelper.ToJson(MarkProjectDataList)));
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "无项目标注！", string.Empty));

                }


            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "无权限！", string.Empty));
            }
        }
        /// <summary>
        /// 删除标注
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public string DeleteMark()
        {
            string id = HttpContext.Current.Request.Form["id"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("DELETE FROM  common_mark  WHERE id={0}AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                if (updatecount == 1)
                {
                    int updatemarkcount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("DELETE FROM  common_map_project_mark  WHERE markid={0}AND ztm={1}", id, (int)MODEL.Enum.State.InUse));
                    if (updatemarkcount == 1)
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "删除标注成功", string.Empty));
                    }
                    else
                    {
                        return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "删除标注-项目映射出错！！", string.Empty));
                    }
                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "删除标注失败！", string.Empty));
                }
            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "验证失败，请重试！", string.Empty));
            }
        }

        [HttpPost]
        public string UpdateMark()
        {
            string title = HttpContext.Current.Request.Form["title"];
            string color = HttpContext.Current.Request.Form["color"];
            string id = HttpContext.Current.Request.Form["id"];
            string style = HttpContext.Current.Request.Form["style"];

            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                int updatecount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format(" UPDATE common_mark set text={0} ,color={1},style={2} where id={3}", SQLHelper.UpdateString(title),SQLHelper.UpdateString(color), SQLHelper.UpdateString(style),id));
                if (updatecount == 1)
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Success, "更新成功！", string.Empty));

                }
                else
                {
                    return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "更新失败，请重试！", string.Empty));
                }

            }
            else
            {
                return JsonHelper.ToJson(new ResponseResult((int)MODEL.Enum.ResponseResultCode.Failure, "验证用户失败，请重试！", string.Empty));
            }

        }
    }
}