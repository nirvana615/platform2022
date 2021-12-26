using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

using COM;

namespace MODEL
{
    /// <summary>
    /// 解析影像类
    /// </summary>
    public class ParseImageHelper
    {
        private static Logger logger = Logger.CreateLogger(typeof(ParseImageHelper));

        #region 一、业务

        /// <summary>
        /// 1---影像项目
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static ImageProject ParseImageProject(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析影像项目数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("影像项目不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                ImageProject imageProject = new ImageProject()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    XMMC = row[1].ToString(),
                    XMBM = row[2].ToString(),
                    MS = row[6].ToString(),
                    CJSJ = row[7].ToString(),
                    BSM = row[8].ToString(),
                    BZ = row[10].ToString()
                };
                if (string.IsNullOrEmpty(row[3].ToString()))
                {
                    imageProject.ZXJD = null;
                }
                else
                {
                    imageProject.ZXJD = Convert.ToDouble(row[3].ToString());
                }
                if (string.IsNullOrEmpty(row[4].ToString()))
                {
                    imageProject.ZXWD = null;
                }
                else
                {
                    imageProject.ZXWD = Convert.ToDouble(row[4].ToString());
                }
                if (string.IsNullOrEmpty(row[5].ToString()))
                {
                    imageProject.SRID = null;
                }
                else
                {
                    imageProject.SRID = Convert.ToInt16(row[5].ToString());
                }


                return imageProject;
            }
            catch (Exception ex)
            {
                logger.Error("ImageProject解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 2---目标
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static Target ParseTarget(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析目标数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("目标不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                Target target = new Target()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    MBMC = row[1].ToString(),
                    MBBH = row[2].ToString(),
                    MBLX = Convert.ToInt16(row[3].ToString()),
                    X = Convert.ToDouble(row[4].ToString()),
                    Y = Convert.ToDouble(row[5].ToString()),
                    Z = Convert.ToDouble(row[6].ToString()),
                    CJSJ = row[8].ToString(),
                    BSM = row[9].ToString(),
                    BZ = row[11].ToString()
                };
                if (string.IsNullOrEmpty(row[7].ToString()))
                {
                    target.SRID = null;
                }
                else
                {
                    target.SRID = Convert.ToInt16(row[7].ToString());
                }
                return target;
            }
            catch (Exception ex)
            {
                logger.Error("Target解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 3---靶区Roi
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static Roi ParseRoi(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析靶区数据为空！");
                return null;
            }
            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("靶区不唯一！");
                }
                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                Roi roi = new Roi()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    BQMC = row[1].ToString(),
                    BQBH = row[2].ToString(),
                    BQLX = Convert.ToInt16(row[3].ToString()),
                    CJSJ = row[5].ToString(),
                    BSM = row[6].ToString(),
                    BZ = row[8].ToString()
                };
                return roi;
            }
            catch (Exception ex)
            {
                logger.Error("Roi解析失败：" + data, ex);
                return null;
            }
        }


        /// <summary>
        /// 4---影像信息
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static ImageInfo ParseImageInfo(string data)
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
                ImageInfo imageinfo = new ImageInfo()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    YXMC = row[1].ToString(),
                    YXBH = row[2].ToString(),
                    YXLJ = row[3].ToString(),
                    XMP = JsonHelper.ToObject<ImageXMP>(row[4].ToString()),
                    CJSJ = row[5].ToString(),
                    BSM = row[6].ToString(),
                    BZ = row[8].ToString(),
                    xszt = row[10].ToString(),
                    xsjg = row[11].ToString(),
                    Width= Convert.ToInt32(row[12].ToString()),
                    Height = Convert.ToInt32(row[13].ToString()),
                };
                if (row.Length>12)
                {
                    imageinfo.targetid = row[12].ToString();
                }
                return imageinfo;
            }
            catch (Exception ex)
            {
                logger.Error("Roi解析失败：" + data, ex);
                return null;
            }
        }



        /// <summary>
        /// 5---ImageXMP---针对P1
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static ImageXMP ParseImageP1XMP(string data)
        {

            if (string.IsNullOrEmpty(data))
            {
                return null;
            }
            else
            {
                string[] rows = data.Split(new char[] { '\n' });

                ImageXMP xmp = new ImageXMP();

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
        /// 5---ImageXMP---针对FC6310R
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static ImageXMP ParseImageFC6310RXMP(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                return null;
            }
            else
            {
                string[] rows = data.Split(new char[] { '\n' });

                ImageXMP xmp = new ImageXMP();

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
        /// 6---影像匹配结果
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static ImageResult ParseImageResult(string data)
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
                ImageResult imageresult = new ImageResult()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    YXCJSJ=row [1].ToString(),
                    RoiX=Convert.ToDouble(row[2].ToString()),
                    RoiY = Convert.ToDouble(row[3].ToString()),
                    RoiId = Convert.ToInt16(row[4].ToString()),
                    Scale = Convert.ToDouble(row[5].ToString()),
                    PPSF=Convert.ToInt32(row[6].ToString()),
                    PPSC = Convert.ToInt32(row[7].ToString()),
                    CJSJ = row[8].ToString(),
                    BSM = row[9].ToString(),
                    BZ = row[10].ToString()
                };
                return imageresult;
            }
            catch (Exception ex)
            {
                logger.Error("Roi解析失败：" + data, ex);
                return null;
            }
        }






        #endregion

        #region 二、映射
        /// <summary>
        /// 1---用户-影像项目映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapUserImageProject ParseMapUserImageProject(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("用户-影像项目映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("用户-影像项目映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapUserImageProject mapUserImageProject = new MapUserImageProject()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    UserId = Convert.ToInt32(row[1].ToString()),
                    ImageProjectId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapUserImageProject;
            }
            catch (Exception ex)
            {
                logger.Error("MapUserImageProject解析失败：" + data, ex);
                return null;
            }
        }


        /// <summary>
        /// 2---项目-目标映射
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MapImageProjecTarget ParseMapImageProjecTarget(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("影像项目-目标映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("影像项目-目标映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapImageProjecTarget mapImageProjecTarget = new MapImageProjecTarget()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    ImageProjectId = Convert.ToInt32(row[1].ToString()),
                    TargetId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapImageProjecTarget;
            }
            catch (Exception ex)
            {
                logger.Error("MapImageProjecTarget解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 3--目标-靶区映射
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MapTargetRoi ParseMapTargetRoi(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("目标-靶区映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("目标-靶区映射不唯一");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapTargetRoi mapTargetRoi = new MapTargetRoi()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    TargetId = Convert.ToInt32(row[1].ToString()),
                    RoiId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };
                return mapTargetRoi;
            }
            catch (Exception ex)
            {
                logger.Error("MapImageProjecTarget解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 4--目标-影像映射
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MapTargetImageInfo ParseMapTargetImageInfo(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("目标-靶区映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("目标-靶区映射不唯一");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapTargetImageInfo mapTargetImageInfo = new MapTargetImageInfo()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    TargetId = Convert.ToInt32(row[1].ToString()),
                    ImageInfoId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };
                return mapTargetImageInfo;
            }
            catch (Exception ex)
            {
                logger.Error("MapTargetImageInfo解析失败：" + data, ex);
                return null;
            }
        }


        /// <summary>
        /// 5---影像项目-实景模型映射
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MapImageProjecModel ParseMapImageProjecModel(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("影像项目-实景模型映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("影像项目-实景模型映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapImageProjecModel mapImageProjecMode = new MapImageProjecModel()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    ImageProjectId = Convert.ToInt32(row[1].ToString()),
                    ModelId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapImageProjecMode;
            }
            catch (Exception ex)
            {
                logger.Error("MapImageProjecModel解析失败：" + data, ex);
                return null;
            }
        }









        #endregion
    }
}
