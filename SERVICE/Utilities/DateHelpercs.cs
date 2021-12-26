using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SERVICE
{
    /// <summary>
    /// 返回预设时间范围
    /// </summary>
    public class DateHelpercs
    {
        private static string[] GetDateTimebyPre(int pre)
        {
            string starttime = string.Empty;//开始时间
            string endtime = string.Empty;//结束时间

            if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.Today)
            {
                starttime = DateTime.Now.ToString("yyyy-MM-dd") + " 00:00:00";
                endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.ThisTen)
            {
                int day = Convert.ToInt32(DateTime.Now.ToString("dd"));
                if ((day > 0) && (day < 11))
                {
                    starttime = DateTime.Now.ToString("yyyy-MM") + "-01 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                }
                else if ((day > 10) && (day < 21))
                {
                    starttime = DateTime.Now.ToString("yyyy-MM") + "-11 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                }
                else
                {
                    starttime = DateTime.Now.ToString("yyyy-MM") + "-21 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                }
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.ThisMonth)
            {
                starttime = DateTime.Now.ToString("yyyy-MM") + "-01 00:00:00";
                endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.ThisQuarterly)
            {
                int month = Convert.ToInt32(DateTime.Now.ToString("MM"));
                if ((month > 0) && (month < 4))
                {
                    starttime = DateTime.Now.ToString("yyyy") + "-01-01 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                }
                else if ((month > 3) && (month < 7))
                {
                    starttime = DateTime.Now.ToString("yyyy") + "-04-01 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                }
                else if ((month > 6) && (month < 10))
                {
                    starttime = DateTime.Now.ToString("yyyy") + "-07-01 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                }
                else
                {
                    starttime = DateTime.Now.ToString("yyyy") + "-10-01 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                }
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.FirstHalf)
            {
                starttime = DateTime.Now.ToString("yyyy") + "-01-01 00:00:00";
                endtime = DateTime.Now.ToString("yyyy") + "-06-30 23:59:59";
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.SencondHalf)
            {
                starttime = DateTime.Now.ToString("yyyy") + "-07-01 00:00:00";
                endtime = DateTime.Now.ToString("yyyy") + "-12-31 23:59:59";
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.ThisYear)
            {
                starttime = DateTime.Now.ToString("yyyy") + "-01-01 00:00:00";
                endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.Yesterday)
            {
                starttime = DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd") + " 00:00:00";
                endtime = DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd") + " 23:59:59";
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
                        starttime = DateTime.Now.ToString("yyyy-MM") + "-21 00:00:00";
                        endtime = DateTime.Now.ToString("yyyy-MM") + "-31 00:00:00";
                    }
                    else if ((month == 4) || (month == 6) || (month == 9) || (month == 11))
                    {
                        starttime = DateTime.Now.ToString("yyyy-MM") + "-21 00:00:00";
                        endtime = DateTime.Now.ToString("yyyy-MM") + "-30 00:00:00";
                    }
                    else
                    {
                        if (year % 4 == 0)
                        {
                            starttime = DateTime.Now.ToString("yyyy-MM") + "-21 00:00:00";
                            endtime = DateTime.Now.ToString("yyyy-MM") + "-29 00:00:00";
                        }
                        else
                        {
                            starttime = DateTime.Now.ToString("yyyy-MM") + "-21 00:00:00";
                            endtime = DateTime.Now.ToString("yyyy-MM") + "-28 00:00:00";
                        }
                    }
                }
                else if ((day >= 11) && (day <= 20))
                {
                    starttime = DateTime.Now.ToString("yyyy-MM") + "-01 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy-MM") + "-10 00:00:00";
                }
                else
                {
                    starttime = DateTime.Now.ToString("yyyy-MM") + "-11 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy-MM") + "-20 00:00:00";
                }
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.PreMonth)
            {
                starttime = DateTime.Now.AddMonths(-1).ToString("yyyy-MM") + "-01 00:00:00";
                endtime = DateTime.Now.ToString("yyyy-MM") + "-01-01 00:00:00";
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.PreQuarterly)
            {
                int month = Convert.ToInt32(DateTime.Now.ToString("MM"));
                if ((month > 0) && (month < 4))
                {
                    starttime = DateTime.Now.AddYears(-1).ToString("yyyy") + "-10-01 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy") + "-01-01 00:00:00";
                }
                else if ((month > 3) && (month < 7))
                {
                    starttime = DateTime.Now.ToString("yyyy") + "-01-01 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy") + "-04-01 00:00:00";
                }
                else if ((month > 6) && (month < 10))
                {
                    starttime = DateTime.Now.ToString("yyyy") + "-04-01 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy") + "-07-01 00:00:00";
                }
                else
                {
                    starttime = DateTime.Now.ToString("yyyy") + "-07-01 00:00:00";
                    endtime = DateTime.Now.ToString("yyyy") + "-10-01 00:00:00";
                }
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.PreYear)
            {
                starttime = DateTime.Now.AddYears(-1).ToString("yyyy") + "-01-01 00:00:00";
                endtime = DateTime.Now.AddYears(-1).ToString("yyyy") + "-12-31 23:59:59";
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.All)
            {
                starttime = "2000-01-01 00:00:00";
                endtime = "2100-01-01 00:00:00";
            }
            else if (pre == (int)MODEL.EnumMonitor.AutoDataDateTime.LastMonth)
            {
                starttime = DateTime.Now.AddDays(-29).ToString("yyyy-MM-dd") + " 00:00:00";
                endtime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            }

            return new string[] { starttime, endtime };
        }
    }
}