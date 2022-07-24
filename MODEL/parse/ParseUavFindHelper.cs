using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using COM;

namespace MODEL
{
    public class ParseUavFindHelper
    {
        private static Logger logger = Logger.CreateLogger(typeof(ParseUavFindHelper));


        #region 映射类
        /// <summary>
        /// 用户-巡查项目映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapUserFindProject ParseMapUserFindProject(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("用户-巡查项目映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("用户-巡查项目映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapUserFindProject mapUserFindlProject = new MapUserFindProject()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    UserId = Convert.ToInt32(row[1].ToString()),
                    FindProjectId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapUserFindlProject;
            }
            catch (Exception ex)
            {
                logger.Error("MapUserFindProject解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 巡查项目-航线映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapFindProjectRoute ParseMapFindProjectRoute(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("巡查项目-航线映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("巡查项目-航线映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapFindProjectRoute mapFindProjectRoute = new MapFindProjectRoute()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    FindProjectId = Convert.ToInt32(row[1].ToString()),
                    RouteId= Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapFindProjectRoute;
            }
            catch (Exception ex)
            {
                logger.Error("MapFindProjectRoute解析失败：" + data, ex);
                return null;
            }
        }



        /// <summary>
        /// 巡查目标-影像映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapFindTargetImageInfo ParseMapFindTargetImageInfo(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("巡查目标-影像映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("巡查目标-影像映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapFindTargetImageInfo mapFindTargetImageInfo = new MapFindTargetImageInfo()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    TargetId = Convert.ToInt32(row[1].ToString()),
                    ImageInfoId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapFindTargetImageInfo;
            }
            catch (Exception ex)
            {
                logger.Error("MapFindTargetWaypoint解析失败：" + data, ex);
                return null;
            }
        }





        #endregion



        #region 业务类
        /// <summary>
        /// 巡查项目
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static FindProject ParseFindProject(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析巡查项目数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("巡查项目不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                FindProject findProject = new FindProject()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    XMMC = row[1].ToString(),
                    XMBM = row[2].ToString(),
                    XMJC = row[3].ToString(),
                    XZQBM = row[4].ToString(),
                    ZXJD = Convert.ToDouble(row[5].ToString()),
                    ZXWD = Convert.ToDouble(row[6].ToString()),
                    XMSJ = row[7].ToString(),
                    XMWZ = row[8].ToString(),
                    CJSJ = row[9].ToString(),
                    BSM = row[10].ToString(),
                    BZ = row[12].ToString()
                };

                return findProject;
            }
            catch (Exception ex)
            {
                logger.Error("FindProject解析失败：" + data, ex);
                return null;
            }
        }


        /// <summary>
        /// 巡查影像信息
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static FindImageInfo ParseFindImageInfo(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析影像信息为空！");
                return null;
            }
            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("影像不唯一！");
                }
                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                FindImageInfo imageinfo = new FindImageInfo()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    YXMC = row[1].ToString(),
                    YXCJSJ = row[2].ToString(),
                    YXLJ = row[3].ToString(),
                    XMP = JsonHelper.ToObject<FindImageXmp>(row[4].ToString()),
                    CJSJ = row[5].ToString(),
                    BSM = row[6].ToString(),
                    BZ = row[8].ToString(),
                };
                return imageinfo;
            }
            catch (Exception ex)
            {
                logger.Error("Roi解析失败：" + data, ex);
                return null;
            }
        }






        /// <summary>
        /// ImageXMP---针对P1
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static FindImageXmp ParseImageP1XMP(string data)
        {

            if (string.IsNullOrEmpty(data))
            {
                return null;
            }
            else
            {
                string[] rows = data.Split(new char[] { '\n' });

                FindImageXmp xmp = new FindImageXmp();

                for (int i = 0; i < rows.Length; i++)
                {
                    string row = rows[i];

                    if (row.Contains("xmp:ModifyDate"))
                    {
                        xmp.ModifyDate = row.Substring(19, row.Length - 19 - 1).Replace("T", " ");
                    }
                    else if (row.Contains("tiff:Make"))
                    {
                        xmp.Make = row.Substring(14, row.Length - 14 - 1);
                    }
                    else if (row.Contains("tiff:Model"))
                    {
                        xmp.Model = row.Substring(15, row.Length - 15 - 1);
                    }
                    else if (row.Contains("dc:format"))
                    {
                        xmp.Format = row.Substring(14, row.Length - 14 - 1);
                    }
                    else if (row.Contains("drone-dji:GpsLatitude"))
                    {
                        xmp.GpsLatitude = Convert.ToDouble((row.Substring(26, row.Length - 26 - 1)));
                    }
                    else if (row.Contains("drone-dji:GpsLongitude"))
                    {
                        xmp.GpsLongitude = Convert.ToDouble((row.Substring(27, row.Length - 27 - 1)));
                    }
                    else if (row.Contains("drone-dji:AbsoluteAltitude"))
                    {
                        xmp.AbsoluteAltitude = Convert.ToDouble(row.Substring(32, row.Length - 32 - 1));
                    }
                    else if (row.Contains("drone-dji:RelativeAltitude"))
                    {
                        xmp.RelativeAltitude = Convert.ToDouble(row.Substring(32, row.Length - 32 - 1));
                    }
                    else if (row.Contains("drone-dji:GimbalRollDegree"))
                    {
                        xmp.GimbalRollDegree = Convert.ToDouble(row.Substring(31, row.Length - 31 - 1));
                    }
                    else if (row.Contains("drone-dji:GimbalYawDegree"))
                    {
                        xmp.GimbalYawDegree = Convert.ToDouble(row.Substring(30, row.Length - 30 - 1));
                    }
                    else if (row.Contains("drone-dji:GimbalPitchDegree"))
                    {
                        xmp.GimbalPitchDegree = Convert.ToDouble(row.Substring(32, row.Length - 32 - 1));
                    }
                    else if (row.Contains("drone-dji:FlightRollDegree"))
                    {
                        xmp.FlightRollDegree = Convert.ToDouble(row.Substring(31, row.Length - 31 - 1));
                    }
                    else if (row.Contains("drone-dji:FlightYawDegree"))
                    {
                        xmp.FlightYawDegree = Convert.ToDouble(row.Substring(30, row.Length - 30 - 1));
                    }
                    else if (row.Contains("drone-dji:FlightPitchDegree"))
                    {
                        xmp.FlightPitchDegree = Convert.ToDouble(row.Substring(32, row.Length - 32 - 1));
                    }
                    else if (row.Contains("drone-dji:FlightXSpeed"))
                    {
                        xmp.FlightXSpeed = Convert.ToDouble(row.Substring(27, row.Length - 27 - 1));
                    }
                    else if (row.Contains("drone-dji:FlightYSpeed"))
                    {
                        xmp.FlightYSpeed = Convert.ToDouble(row.Substring(27, row.Length - 27 - 1));
                    }
                    else if (row.Contains("drone-dji:FlightZSpeed"))
                    {
                        xmp.FlightZSpeed = Convert.ToDouble(row.Substring(27, row.Length - 27 - 1));
                    }
                    else if (row.Contains("drone-dji:RtkFlag"))
                    {
                        xmp.RtkFlag = Convert.ToInt32(row.Substring(22, row.Length - 22 - 1));
                    }
                    else if (row.Contains("drone-dji:RtkStdLon"))
                    {
                        xmp.RtkStdLon = Convert.ToDouble(row.Substring(24, row.Length - 24 - 1));
                    }
                    else if (row.Contains("drone-dji:RtkStdLat"))
                    {
                        xmp.RtkStdLat = Convert.ToDouble(row.Substring(24, row.Length - 24 - 1));
                    }
                    else if (row.Contains("drone-dji:RtkStdHgt"))
                    {
                        xmp.RtkStdHgt = Convert.ToDouble(row.Substring(24, row.Length - 24 - 1));
                    }
                    else if (row.Contains("drone-dji:SurveyingMode"))
                    {
                        xmp.SurveyingMode = row.Substring(28, row.Length - 28 - 1);
                    }
                    else if (row.Contains("drone-dji:ShutterCount"))
                    {
                        xmp.ShutterCount = row.Substring(27, row.Length - 27 - 1);
                    }
                    else if (row.Contains("drone-dji:CameraSerialNumber"))
                    {
                        xmp.CameraSerialNumber = row.Substring(33, row.Length - 33 - 1);
                    }
                    else if (row.Contains("drone-dji:LensSerialNumber"))
                    {
                        xmp.LensSerialNumber = row.Substring(31, row.Length - 31 - 1);
                    }
                    else if (row.Contains("drone-dji:DroneModel"))
                    {
                        xmp.DroneModel = row.Substring(25, row.Length - 25 - 1);
                    }
                    else if (row.Contains("drone-dji:DroneSerialNumber"))
                    {
                        xmp.DroneSerialNumber = row.Substring(32, row.Length - 32 - 1);
                    }
                    else if (row.Contains("crs:Version"))
                    {
                        xmp.Version = row.Substring(16, row.Length - 16 - 1);
                    }
                }

                return xmp;
            }
        }

        /// <summary>
        /// ImageXMP---针对FC6310R
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static FindImageXmp ParseImageFC6310RXMP(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                return null;
            }
            else
            {
                string[] rows = data.Split(new char[] { '\n' });

                FindImageXmp xmp = new FindImageXmp();

                for (int i = 0; i < rows.Length; i++)
                {
                    string row = rows[i];

                    if (row.Contains("xmp:ModifyDate"))
                    {
                        xmp.ModifyDate = row.Substring(19, row.Length - 19 - 1).Replace("T", " ");
                    }
                    else if (row.Contains("tiff:Make"))
                    {
                        xmp.Make = row.Substring(14, row.Length - 14 - 1);
                    }
                    else if (row.Contains("tiff:Model"))
                    {
                        xmp.Model = row.Substring(15, row.Length - 15 - 1);
                    }
                    else if (row.Contains("dc:format"))
                    {
                        xmp.Format = row.Substring(14, row.Length - 14 - 1);
                    }
                    else if (row.Contains("drone-dji:GpsLatitude"))
                    {
                        xmp.GpsLatitude = Convert.ToDouble((row.Substring(26, row.Length - 26 - 1)));
                    }
                    else if (row.Contains("drone-dji:GpsLongitude"))
                    {
                        xmp.GpsLongitude = Convert.ToDouble((row.Substring(27, row.Length - 27 - 1)));
                    }
                    else if (row.Contains("drone-dji:AbsoluteAltitude"))
                    {
                        xmp.AbsoluteAltitude = Convert.ToDouble(row.Substring(32, row.Length - 32 - 1));
                    }
                    else if (row.Contains("drone-dji:RelativeAltitude"))
                    {
                        xmp.RelativeAltitude = Convert.ToDouble(row.Substring(32, row.Length - 32 - 1));
                    }
                    else if (row.Contains("drone-dji:GimbalRollDegree"))
                    {
                        xmp.GimbalRollDegree = Convert.ToDouble(row.Substring(31, row.Length - 31 - 1));
                    }
                    else if (row.Contains("drone-dji:GimbalYawDegree"))
                    {
                        xmp.GimbalYawDegree = Convert.ToDouble(row.Substring(30, row.Length - 30 - 1));
                    }
                    else if (row.Contains("drone-dji:GimbalPitchDegree"))
                    {
                        xmp.GimbalPitchDegree = Convert.ToDouble(row.Substring(32, row.Length - 32 - 1));
                    }
                    else if (row.Contains("drone-dji:FlightRollDegree"))
                    {
                        xmp.FlightRollDegree = Convert.ToDouble(row.Substring(31, row.Length - 31 - 1));
                    }
                    else if (row.Contains("drone-dji:FlightYawDegree"))
                    {
                        xmp.FlightYawDegree = Convert.ToDouble(row.Substring(30, row.Length - 30 - 1));
                    }
                    else if (row.Contains("drone-dji:FlightPitchDegree"))
                    {
                        xmp.FlightPitchDegree = Convert.ToDouble(row.Substring(32, row.Length - 32 - 1));
                    }
                    else if (row.Contains("drone-dji:FlightXSpeed"))
                    {
                        xmp.FlightXSpeed = Convert.ToDouble(row.Substring(27, row.Length - 27 - 1));
                    }
                    else if (row.Contains("drone-dji:FlightYSpeed"))
                    {
                        xmp.FlightYSpeed = Convert.ToDouble(row.Substring(27, row.Length - 27 - 1));
                    }
                    else if (row.Contains("drone-dji:FlightZSpeed"))
                    {
                        xmp.FlightZSpeed = Convert.ToDouble(row.Substring(27, row.Length - 27 - 1));
                    }
                    else if (row.Contains("drone-dji:RtkFlag"))
                    {
                        xmp.RtkFlag = Convert.ToInt32(row.Substring(22, row.Length - 22 - 1));
                    }
                    else if (row.Contains("drone-dji:RtkStdLon"))
                    {
                        xmp.RtkStdLon = Convert.ToDouble(row.Substring(24, row.Length - 24 - 1));
                    }
                    else if (row.Contains("drone-dji:RtkStdLat"))
                    {
                        xmp.RtkStdLat = Convert.ToDouble(row.Substring(24, row.Length - 24 - 1));
                    }
                    else if (row.Contains("drone-dji:RtkStdHgt"))
                    {
                        xmp.RtkStdHgt = Convert.ToDouble(row.Substring(24, row.Length - 24 - 1));
                    }
                    else if (row.Contains("drone-dji:SurveyingMode"))
                    {
                        xmp.SurveyingMode = row.Substring(28, row.Length - 28 - 1);
                    }
                    else if (row.Contains("drone-dji:ShutterCount"))
                    {
                        xmp.ShutterCount = row.Substring(27, row.Length - 27 - 1);
                    }
                    else if (row.Contains("drone-dji:CameraSerialNumber"))
                    {
                        xmp.CameraSerialNumber = row.Substring(33, row.Length - 33 - 1);
                    }
                    else if (row.Contains("drone-dji:LensSerialNumber"))
                    {
                        xmp.LensSerialNumber = row.Substring(31, row.Length - 31 - 1);
                    }
                    else if (row.Contains("drone-dji:DroneModel"))
                    {
                        xmp.DroneModel = row.Substring(25, row.Length - 25 - 1);
                    }
                    else if (row.Contains("drone-dji:DroneSerialNumber"))
                    {
                        xmp.DroneSerialNumber = row.Substring(32, row.Length - 32 - 1);
                    }
                    else if (row.Contains("crs:Version"))
                    {
                        xmp.Version = row.Substring(16, row.Length - 16 - 1);
                    }
                }

                return xmp;
            }



        }
        #endregion


    }
}
