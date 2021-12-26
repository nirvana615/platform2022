using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using COM;

namespace DAL
{
    /// <summary>
    /// SQLServer 数据库操作类
    /// </summary>
    public class SQLServerHelper
    {
        private static Logger logger = Logger.CreateLogger(typeof(SQLServerHelper));

        /// <summary>
        /// 返回结果数量
        /// </summary>
        /// <param name="connectString"></param>
        /// <param name="sql"></param>
        /// <returns></returns>
        public static int QueryResultCount(string connectString, string sql)
        {
            try
            {
                DataSet dataset = new DataSet();
                using (SqlConnection connection = new SqlConnection(connectString))
                {
                    connection.Open();

                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = sql;

                    SqlDataAdapter sda = new SqlDataAdapter(command);
                    sda.Fill(dataset);

                    connection.Close();

                    int resultcount = dataset.Tables[0].Rows.Count;
                    return resultcount;
                }
            }
            catch (Exception ex)
            {
                logger.Error("sql:" + sql, ex);
                return -1;
            }
        }

        /// <summary>
        /// 返回查询数据
        /// </summary>
        /// <param name="connectString"></param>
        /// <param name="sql"></param>
        /// <returns></returns>
        public static string QueryData(string connectString, string sql)
        {
            try
            {
                DataSet dataset = new DataSet();
                using (SqlConnection connection = new SqlConnection(connectString))
                {
                    connection.Open();

                    SqlCommand command = connection.CreateCommand();
                    command.CommandText = sql;

                    SqlDataAdapter sda = new SqlDataAdapter(command);
                    sda.Fill(dataset);

                    connection.Close();

                    if (dataset.Tables[0].Rows.Count < 1)
                    {
                        return string.Empty;
                    }

                    StringBuilder sb = new StringBuilder();
                    for (int i = 0; i < dataset.Tables[0].Rows.Count; i++)
                    {
                        string row = string.Empty;
                        for (int j = 0; j < dataset.Tables[0].Columns.Count; j++)
                        {
                            row += dataset.Tables[0].Rows[i][j].ToString() + COM.ConstHelper.columnSplit;
                        }

                        sb.Append(row.Substring(0, row.Length - 1) + COM.ConstHelper.rowSplit);
                    }

                    return sb.ToString().Substring(0, sb.ToString().Length - 1);

                }
            }
            catch (Exception ex)
            {
                logger.Error("sql:" + sql, ex);
                return string.Empty;
            }
        }

    }
}
