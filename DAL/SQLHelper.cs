using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    /// <summary>
    /// SQL 辅助类
    /// </summary>
    public class SQLHelper
    {
        /// <summary>
        /// 为数据库插入字符添加单引号
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string UpdateString(string value)
        {
            return "'" + value + "'";
        }

        /// <summary>
        /// 数据库连接字符串
        /// </summary>
        /// <param name="type">数据库类型</param>
        /// <param name="ip"></param>
        /// <param name="port"></param>
        /// <param name="dbname">数据库名</param>
        /// <param name="user"></param>
        /// <param name="pw"></param>
        /// <returns></returns>
        public static string GetConnectString(string type, string ip, string port, string dbname, string user, string pw)
        {
            if (!string.IsNullOrEmpty(type) && !string.IsNullOrEmpty(ip) && !string.IsNullOrEmpty(port) && !string.IsNullOrEmpty(dbname) && !string.IsNullOrEmpty(user) && !string.IsNullOrEmpty(pw))
            {
                if (type == "SQLServer")
                {
                    return string.Format("server={0},{1};database={2};user={3};pwd={4}", ip, port, dbname, user, pw);
                }
                else if (type == "Oracle")
                {
                    return string.Format("Host={0};Port={1};Data Source={2};User Id={3};Password={4}; Integrated Security=no;", ip, port, dbname, user, pw);
                }
                else if (type == "MySQL")
                {
                    return string.Format("Database=''{0}'';Data Source=''{1}'';Port=''{2}'';User Id=''{3}'';Password=''{4}'';charset=''utf8'';pooling=true;SslMode=none;Connection Timeout =30", dbname, ip, port, user, pw);
                }
                else if (type == "PostgreSQL")
                {
                    return string.Format("Host={0};Port={1};Username={2};Password={3};Database={4}", ip, port, user, pw, dbname);
                }
            }

            return string.Empty;
        }

    }
}
