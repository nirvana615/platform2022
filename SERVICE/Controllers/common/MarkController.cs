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
                           && !string.IsNullOrEmpty(marks[i].marktype))
                        {
                            string value = "("
                            + SQLHelper.UpdateString(marks[i].title) + ","
                            + SQLHelper.UpdateString(marks[i].marktype) + ","
                            + SQLHelper.UpdateString(marks[i].style) + ","
                            + SQLHelper.UpdateString(marks[i].color) + ","
                            + SQLHelper.UpdateString(marks[i].position) + ","
                            + SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")) + ","
                            + (int)MODEL.Enum.State.InUse;
                            string sql = " INSERT INTO common_mark(text, type, style, color, pos, cjsj, ztm";
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






    }
}