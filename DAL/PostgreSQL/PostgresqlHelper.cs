using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using COM;
using Npgsql;

namespace DAL
{
    public class PostgresqlHelper
    {
        private static Logger logger = Logger.CreateLogger(typeof(PostgresqlHelper));

        /// <summary>
        /// 返回结果数量
        /// </summary>
        /// <param name="connectString"></param>
        /// <param name="sql"></param>
        /// <returns>查询数量</returns>
        public static int QueryResultCount(string connectString, string sql)
        {
            try
            {
                DataSet dataset = new DataSet();
                using (NpgsqlConnection conn = new NpgsqlConnection(connectString))
                {
                    //建立连接
                    conn.Open();

                    NpgsqlCommand cmd = new NpgsqlCommand(sql, conn);
                    NpgsqlDataAdapter sda = new NpgsqlDataAdapter(cmd);
                    sda.Fill(dataset);

                    //关闭连接
                    conn.Close();

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
            /*
             * 行用"∮"分割
             * 列用"∫"分割
             * a1∫b1∫c1∮a2∫b2∫c2∮a3∫b3∫c3
             */

            try
            {
                DataSet dataset = new DataSet();
                using (NpgsqlConnection conn = new NpgsqlConnection(connectString))
                {
                    //建立连接
                    conn.Open();

                    NpgsqlCommand cmd = new NpgsqlCommand(sql, conn);
                    NpgsqlDataAdapter sda = new NpgsqlDataAdapter(cmd);
                    sda.Fill(dataset);

                    //关闭连接
                    conn.Close();

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

        public static string QueryData1(string connectString, string sql)
        {
            /*
             * 行用"∮"分割
             * 列用"∫"分割
             * a1∫b1∫c1∮a2∫b2∫c2∮a3∫b3∫c3
             */

            try
            {
                DataSet dataset = new DataSet();
                using (NpgsqlConnection conn = new NpgsqlConnection(connectString))
                {
                    //建立连接
                    conn.Open();

                    NpgsqlCommand cmd = new NpgsqlCommand(sql, conn);
                    NpgsqlDataAdapter sda = new NpgsqlDataAdapter(cmd);
                    sda.Fill(dataset);

                    //关闭连接
                    conn.Close();

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
                return "-1";
            }
        }

        /// <summary>
        /// 判断
        /// </summary>
        /// <param name="connectString"></param>
        /// <param name="sql"></param>
        /// <returns></returns>
        public static bool? Judge(string connectString, string sql)
        {
            try
            {
                DataSet dataset = new DataSet();
                using (NpgsqlConnection conn = new NpgsqlConnection(connectString))
                {
                    //建立连接
                    conn.Open();

                    NpgsqlCommand cmd = new NpgsqlCommand(sql, conn);
                    NpgsqlDataAdapter sda = new NpgsqlDataAdapter(cmd);
                    sda.Fill(dataset);

                    //关闭连接
                    conn.Close();

                    if (dataset.Tables[0].Rows[0][0].ToString() == "True")
                    {
                        return true;
                    }
                    else if (dataset.Tables[0].Rows[0][0].ToString() == "False")
                    {
                        return false;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            catch (Exception ex)
            {
                logger.Error("sql:" + sql, ex);
                return null;
            }
        }

        /// <summary>
        /// 更新数据
        /// </summary>
        /// <param name="connectString"></param>
        /// <param name="sql"></param>
        /// <returns></returns>
        public static int UpdateData(string connectString, string sql)
        {
            try
            {
                DataSet dataset = new DataSet();
                using (NpgsqlConnection conn = new NpgsqlConnection(connectString))
                {
                    //建立连接
                    conn.Open();

                    NpgsqlCommand cmd = new NpgsqlCommand(sql, conn);
                    int resultcount = cmd.ExecuteNonQuery();

                    //关闭连接
                    conn.Close();

                    return resultcount;
                }
            }
            catch (Exception ex)
            {
                logger.Error("更新数据出现异常，sql:" + sql, ex);
                return -1;
            }
        }

        /// <summary>
        /// 插入数据
        /// </summary>
        /// <param name="connectString"></param>
        /// <param name="sql"></param>
        public static int InsertData(string connectString, string sql)
        {
            try
            {
                using (NpgsqlConnection conn = new NpgsqlConnection(connectString))
                {
                    conn.Open();
                    NpgsqlCommand cmd = new NpgsqlCommand(sql, conn);
                    int count = cmd.ExecuteNonQuery();
                    conn.Close();
                    return count;
                }
            }
            catch (Exception ex)
            {
                logger.Error("插入数据出现异常，sql:" + sql, ex);
                return -1;
            }
        }

        /// <summary>
        /// 插入数据并返回主键值
        /// </summary>
        /// <param name="connectString"></param>
        /// <param name="sql"></param>
        /// <returns></returns>
        public static int InsertDataReturnID(string connectString, string sql)
        {
            try
            {
                DataSet dataset = new DataSet();
                using (NpgsqlConnection conn = new NpgsqlConnection(connectString))
                {
                    conn.Open();
                    NpgsqlCommand cmd = new NpgsqlCommand(sql + " RETURNING id", conn);
                    NpgsqlDataAdapter sda = new NpgsqlDataAdapter(cmd);
                    sda.Fill(dataset);
                    conn.Close();
                    return Convert.ToInt32(dataset.Tables[0].Rows[0][0].ToString());
                }
            }
            catch (Exception ex)
            {
                logger.Error("sql:" + sql, ex);
                return -1;
            }
        }

        /// <summary>
        /// 查询图像
        /// </summary>
        /// <param name="connectString"></param>
        /// <param name="sql"></param>
        /// <returns></returns>
        public static Bitmap QueryBitmap(string connectString, string sql)
        {
            using (var conn = new NpgsqlConnection(connectString))
            {
                using (var command = new NpgsqlCommand(sql, conn))
                {
                    byte[] databyte = null;
                    conn.Open();
                    var rdr = command.ExecuteReader();
                    if (rdr.Read())
                    {
                        databyte = (byte[])rdr[0];
                    }
                    rdr.Close();
                    if (databyte != null)
                    {
                        ImageConverter imageConverter = new System.Drawing.ImageConverter();
                        return imageConverter.ConvertFrom(databyte) as System.Drawing.Bitmap;
                    }
                }
            }

            return null;
        }

        /// <summary>
        /// 插入影像并返回主键值
        /// </summary>
        /// <param name="connectString"></param>
        /// <param name="sql"></param>
        /// <param name="bytes"></param>
        /// <returns></returns>
        public static int InsertImageReturnID(string connectString, string sql, byte[] bytes)
        {
            using (NpgsqlConnection conn = new NpgsqlConnection(connectString))
            {
                try
                {
                    DataSet dataset = new DataSet();

                    NpgsqlCommand command = new NpgsqlCommand();
                    command.CommandText = sql + " RETURNING id";
                    command.Connection = conn;
                    conn.Close();
                    conn.Open();

                    command.Parameters.Add(new NpgsqlParameter("Image", bytes));
                    NpgsqlDataAdapter sda = new NpgsqlDataAdapter(command);

                    sda.Fill(dataset);
                    conn.Close();
                    return Convert.ToInt32(dataset.Tables[0].Rows[0][0].ToString());
                }
                catch
                {
                    conn.Close();
                    return -1;
                }
            }
        }



    }
}
