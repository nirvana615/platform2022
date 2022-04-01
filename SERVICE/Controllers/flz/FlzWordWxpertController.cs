using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Mvc;
using COM;
using DAL;
using MODEL;
using MODEL.Entity;

using Spire.Doc;

namespace SERVICE.Controllers
{
    /// <summary>
    /// 监测项目
    /// </summary>
    public class FlzWordWxpertController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(FlzWordWxpertController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();
        private static string imgdir = ConfigurationManager.AppSettings["imgdir"] != null ? ConfigurationManager.AppSettings["imgdir"].ToString() : string.Empty;
        /// <summary>
        /// 旬报
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [System.Web.Http.HttpGet]
        public string GetWordMLHelper(string id,string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
            logger.Info("【" + pgsqlConnection + "】pgsqlConnection");

            int year = Convert.ToInt32(DateTime.Now.ToString("yyyy"));
            int month = Convert.ToInt32(DateTime.Now.ToString("MM"));
            int day = Convert.ToInt32(DateTime.Now.ToString("dd"));
            //获取当前项目信息   
            MonitorProjectString projectString = ParseMonitorHelper.ParseMonitorProjectString(
                PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_project WHERE id={0} AND ztm={1} AND bsm{2}", id, (int)MODEL.Enum.State.InUse, userbsms)));
            logger.Info("【" + JsonHelper.ToJson(projectString) + "】pgsqlConnection");

            DataController dataController = new DataController();

            MonitorController monitorController = new MonitorController();

            string devs = monitorController.GetMonitor(Convert.ToInt32(id), cookie);

            List<MonitorInfo> monitorInfo = COM.JsonHelper.StringToObject<List<MonitorInfo>>(devs);//"GNSS监测站

            // GNSS
            List<DataStatistics> dataStatisticsList = new List<DataStatistics>();//装GNSS的数据
            List<List<GNSSZheXian>> sumShuiPingList = new List<List<GNSSZheXian>>();//装水平的数据
            List<List<GNSSZheXian>> sumChuiZhiList = new List<List<GNSSZheXian>>();//装垂直的数据
            List<string> gnssName = new List<string>();
            List<double> xys = new List<double>();//全部δxy值(水平位移)，后面求最大变化
            List<double> hs = new List<double>();//全部δh值(垂直位移)，后面求最大变化值？
            // 裂缝
            List<DataStatistics> dataLieFengStatisticsList = new List<DataStatistics>();//装裂缝的数据
            List<string> lieFengName = new List<string>();
            List<List<GNSSZheXian>> sumLieFengList = new List<List<GNSSZheXian>>();//装裂缝的数据



            //雨量最大值，雨量最大值日期,总雨量，总天数
            double yuLiangMax = -0.1;
            string yuLiangTime = "";
            double sumYuLiang = 0;
            int yuliangDay = 0;
            string xyzs = "";//雨量数据
            string yuLiangUrl = "";
            for (int i=0;i< monitorInfo.Count;i++)
            {
                MonitorString monitorString = monitorInfo[i].MonitorString;
                if (monitorString.JCFF=="GNSS"&& monitorString.JCZLX== "GNSS监测站")//这是去查询GB的数据
                {
                    string perPenLastDay = dataController.GetAutoDatabyPreDateTime(monitorString.Id, "GNSS", "14", cookie);//上一旬的最后一天
                    string toady = dataController.GetAutoDatabyPreDateTime(monitorString.Id, "GNSS", "1", cookie);//今天
                    string benXu = dataController.GetAutoDatabyPreDateTime(monitorString.Id, "GNSS", "2", cookie);//本旬
                    DataStatistics tempDataStatistics= new DataStatistics();
                    tempDataStatistics.Name = monitorString.JCDBH;


                    if (perPenLastDay!=null&& perPenLastDay!="")//上一旬的
                    {
                        GNSSMonitor gnssMonitorPerDay = COM.JsonHelper.StringToObject<GNSSMonitor>(perPenLastDay);
                        List<DataStatistics> dslist = gnssMonitorPerDay.Statistics;
                        for (int j=0;j< dslist.Count;j++)
                        {
                            if (dslist[j].Name== "水平位移")
                            {
                                tempDataStatistics.Min = dslist[j].Avg;//用min来装上一旬的水平位移
                                
                            }
                            if (dslist[j].Name == "垂直位移")
                            {
                                tempDataStatistics.Max = dslist[j].Avg;//用max来装上一旬的垂直位移
                            }
                        }
                    }
                    else
                    {
                        tempDataStatistics.Min = 0;//用min来装上一旬的水平位移
                        tempDataStatistics.Max = 0;//用max来装上一旬的垂直位移
                    }
                    if (toady != null && toady != "")
                    {
                        GNSSMonitor gnssMonitortoady = COM.JsonHelper.StringToObject<GNSSMonitor>(toady);
                        List<DataStatistics> dslist = gnssMonitortoady.Statistics;
                        for (int j = 0; j < dslist.Count; j++)
                        {
                            if (dslist[j].Name == "水平位移")
                            {
                                tempDataStatistics.Avg = dslist[j].Avg;//用Avg来装今天的水平位移
                                xys.Add(dslist[j].Avg);
                            }
                            if (dslist[j].Name == "垂直位移")
                            {
                                tempDataStatistics.Sd = dslist[j].Avg;//用Sd来装今天的垂直位移
                                hs.Add(dslist[j].Avg);
                            }
                        }
                    }
                    else
                    {
                        tempDataStatistics.Avg = 0;//用Avg来装今天的水平位移
                        tempDataStatistics.Sd = 0;//用Sd来装今天的垂直位移
                    }
                    dataStatisticsList.Add(tempDataStatistics);//装GNSS数据。
                    //本旬的数据，用来画折线图
                    List<GNSSZheXian> zhexiangtuShuiPingList = new List<GNSSZheXian>();
                    List<GNSSZheXian> zhexiangtuChuiZhiList = new List<GNSSZheXian>();
                    if (benXu != null && benXu != "")//上一旬的
                    {
                        
                        GNSSMonitor gnssMonitorBenXu = COM.JsonHelper.StringToObject<GNSSMonitor>(benXu);


                        List<GNSSDelta> zheXianTu = gnssMonitorBenXu.Datas;

                        gnssName.Add(monitorString.JCDBH);
                        
                        for (int j = 0; j < zheXianTu.Count; j++)
                        {
                            

                            GNSSZheXian gNSSZheXian = new GNSSZheXian();//水平位移
                            gNSSZheXian.name= monitorString.JCDBH;
                            gNSSZheXian.time = zheXianTu[j].Time;
                            gNSSZheXian.value = zheXianTu[j].Dxy;
                            zhexiangtuShuiPingList.Add(gNSSZheXian);

                            GNSSZheXian gNSSZheXian1 = new GNSSZheXian();//垂直位移
                            gNSSZheXian1.name = monitorString.JCDBH;
                            gNSSZheXian1.time = zheXianTu[j].Time;
                            gNSSZheXian1.value = zheXianTu[j].Dh;
                            zhexiangtuChuiZhiList.Add(gNSSZheXian1);
                        }
                        sumShuiPingList.Add(zhexiangtuShuiPingList);
                        sumChuiZhiList.Add(zhexiangtuChuiZhiList);

                    }
                    else
                    {
                        //
                    }
                    continue;
                };
                if (monitorString.JCFF=="雨量")
                {
                    xyzs = dataController.GetAutoDatabyPreDateTime(monitorString.Id, "雨量", "2", cookie);

                    if (xyzs != "")
                    {
                        List<RAINDelta> xywww = COM.JsonHelper.StringToObject<List<RAINDelta>>(xyzs);
                        yuLiangUrl = this.DrawBarChart(xywww,"XUN");//生成雨量柱状图
                        for (int k=0;k< xywww.Count;k++)
                        {
                            sumYuLiang = sumYuLiang + xywww[k].Value;
                            if (xywww[k].Value> yuLiangMax)
                            {
                                yuLiangMax = xywww[k].Value;
                                yuLiangTime = xywww[k].Time;
                            }
                            if (xywww[k].Value > 0)//下雨
                            {
                                yuliangDay++;
                            }

                        }
                    }
                    else//雨量没数据，怎么办？
                    {
                        yuLiangMax = 0;
                        yuLiangTime = year+"-"+month+"-" + day;
                    }
                    continue;
                }
                if (monitorString.JCFF == "裂缝")
                {
                    string perPenLastDay = dataController.GetAutoDatabyPreDateTime(monitorString.Id, "裂缝", "14", cookie);//上一旬的最后一天
                    string toady = dataController.GetAutoDatabyPreDateTime(monitorString.Id, "裂缝", "1", cookie);//今天
                    string benXu = dataController.GetAutoDatabyPreDateTime(monitorString.Id, "裂缝", "2", cookie);//本旬
                    DataStatistics tempDataStatistics = new DataStatistics();
                    tempDataStatistics.Name = monitorString.JCDBH;

                    if (perPenLastDay != null && perPenLastDay != "")//上一旬的，本旬
                    {
                        LFMonitor lfMonitorPerDay = COM.JsonHelper.StringToObject<LFMonitor>(perPenLastDay);
                        List<DataStatistics> dslist = lfMonitorPerDay.Statistics;
                        for (int j = 0; j < dslist.Count; j++)
                        {
                            tempDataStatistics.Min = dslist[j].Avg;//用min来装上一旬的水平位移
                        }
                    }
                    else
                    {
                        tempDataStatistics.Min = 0;//用min来装上一旬的水平位移
                    }
                    if (toady != null && toady != "")
                    {
                        LFMonitor lfMonitortoady = COM.JsonHelper.StringToObject<LFMonitor>(toady);
                        List<DataStatistics> dslist = lfMonitortoady.Statistics;
                        for (int j = 0; j < dslist.Count; j++)
                        {
                           tempDataStatistics.Avg = dslist[j].Avg;//用Avg来装今天的水平位移
                        }
                    }
                    else
                    {
                        tempDataStatistics.Avg = 0;//用Avg来装今天的水平位移
                    }
                    dataLieFengStatisticsList.Add(tempDataStatistics);//装裂缝数据。
                    //本旬的数据，用来画折线图
                    List<GNSSZheXian> lieFengList = new List<GNSSZheXian>();
                    if (benXu != null && benXu != "")//上一旬的
                    {

                        LFMonitor lfMonitorBenXu = COM.JsonHelper.StringToObject<LFMonitor>(benXu);
                        List<LFDelta> zheXianTu = lfMonitorBenXu.Datas;

                        lieFengName.Add(monitorString.JCDBH);
                        for (int j = 0; j < zheXianTu.Count; j++)
                        {

                            GNSSZheXian gNSSZheXian = new GNSSZheXian();//水平位移
                            gNSSZheXian.name = monitorString.JCDBH;
                            gNSSZheXian.time = zheXianTu[j].Time;
                            gNSSZheXian.value = zheXianTu[j].Dv;
                            lieFengList.Add(gNSSZheXian);

                            
                        }
                        sumLieFengList.Add(lieFengList);

                    }
                    else
                    {
                        //
                    }


                    continue;
                }

            }
           
            string sumShuiPingUrl = "";
            string sumChuiZhiUrl = "";
            if (gnssName.Count>0) {
                sumShuiPingUrl = this.DrawLineChart(sumShuiPingList, gnssName,"XUN");
                sumChuiZhiUrl = this.DrawLineChart(sumChuiZhiList, gnssName,"XUN");
            }

            string sunLieFengUrl = "";
           
            if (lieFengName.Count>0)//看有没有折线数据
            {
                sunLieFengUrl = this.DrawLineChart(sumLieFengList, lieFengName,"XUN");
            }
            


            // 算总时间
            string jieSuTime = projectString.BZ;
            //TxtInfo txtInfo = new TxtInfo();
            string patrolNum = "";
            if (jieSuTime != "" && jieSuTime.Length > 0)
            {
                string[] timexy = jieSuTime.Split('-');
                if (timexy.Length > 1)
                {
                    int startYear = int.Parse(timexy[0]);
                    int dattime = int.Parse(timexy[1]);
                    //txtInfo.Content=(year - startYear-1)*36+3+"";//

                    if (day >= 1 && day <= 10)
                    {
                        patrolNum = (year - startYear - 1) * 36 + dattime + ((month - 1) * 3 + 1)+"";
                    }
                    else if (day >= 11 && day <= 20)
                    {
                        patrolNum = (year - startYear - 1) * 36 + dattime + ((month - 1) * 3 + 2) + "";
                    }
                    else
                    {
                        patrolNum = (year - startYear - 1) * 36 + dattime + ((month - 1) * 3 + 3) + "";
                    }
                }
            }
            PatrolEquipmentController patrolEquipmentController = new PatrolEquipmentController();
            List<PatrolPhotoInfo> patrolPhotoInfoList = new List<PatrolPhotoInfo>();
            if (patrolNum.Length>0)
            {
               string photoList= patrolEquipmentController.getPatrolPhotoInfo(projectString.Id+"", patrolNum);

                patrolPhotoInfoList = COM.JsonHelper.StringToObject<List<PatrolPhotoInfo>>(photoList);
            }
           
            //



            string templatePath = imgdir + "/SurImage/MoBan/" + projectString.ZHDMC + ".docx";


            WordMLHelper wordMLHelper = new WordMLHelper();
            List<TagInfo> tagInfos = wordMLHelper.GetAllTagInfo(File.OpenRead(templatePath));//打开模板文件,获取所有填充域

            for (int i = 0; i < tagInfos.Count; i++)
            {
                //填充域有两种类型,1:段落或图片,2:表格
                //对填充域填充时需先判断填充域类型
                if (tagInfos[i].Tbl == null)
                {
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[num]"))
                    {
                        if (day >= 1 && day <= 10)
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], year + "年第" + ((month - 1) * 3+1)+"");
                        }
                        else if (day >= 11 && day <= 20)
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], year + "年第" + ((month - 1) * 3 + 2) + "");
                        }
                        else
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], year + "年第" + ((month - 1) * 3 + 3) + "");
                        }
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[sumNum]"))
                    {
                        
                        wordMLHelper.FillContentWithoutStyle(tagInfos[i], patrolNum);
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[时间]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        txtInfo.Content = DateTime.Now.ToString("yyyy年MM月dd日");
                        tagInfos[i].AddContent(txtInfo);
                        continue;
                    }
                  
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[水平最大值]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        if (Math.Abs(xys.Min())> Math.Abs(xys.Max()))//绝对值大的那个，变化两大
                        {
                            txtInfo.Content= Math.Round(xys.Min(), 1)+"";
                        }
                        else
                        {
                            txtInfo.Content=Math.Round(xys.Max(), 1) + "";
                        }
                        tagInfos[i].AddContent(txtInfo);
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[水平编号]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        double  bianHao = 0;
                        if (Math.Abs(xys.Min()) > Math.Abs(xys.Max()))//绝对值大的那个，变化两大
                        {
                            bianHao = xys.Min();
                        }
                        else
                        {
                            bianHao = xys.Max();
                        }
                        for (int m = 0; m < dataStatisticsList.Count; m++)
                        {
                            if (dataStatisticsList[m].Avg== bianHao)//水平位移，得到。
                            {
                                txtInfo.Content = dataStatisticsList[m].Name;
                            }
                        }
                        tagInfos[i].AddContent(txtInfo);
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[水平变形最大值]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        double bianXing = 0;
                        for (int m = 0; m < dataStatisticsList.Count; m++)//水平位移不能有负数。
                        {
                            if (dataStatisticsList[m].Avg- dataStatisticsList[m].Min> bianXing)//水平位移，得到。
                            {
                                bianXing= dataStatisticsList[m].Avg - dataStatisticsList[m].Min;
                            }
                        }
                        txtInfo.Content = Math.Round(bianXing,1) +"";
                        tagInfos[i].AddContent(txtInfo);
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[水平变形编号]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        double bianXing = 0;
                        string name = dataStatisticsList[0].Name;
                        for (int m = 0; m < dataStatisticsList.Count; m++)//水平位移不能有负数。
                        {
                            if (dataStatisticsList[m].Avg - dataStatisticsList[m].Min > bianXing)//水平位移，得到。
                            {
                                name = dataStatisticsList[m].Name;
                                bianXing = dataStatisticsList[m].Avg - dataStatisticsList[m].Min;
                            }
                        }
                        txtInfo.Content = name;
                        tagInfos[i].AddContent(txtInfo);
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[垂直变形最大值]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        double bianXing = dataStatisticsList[0].Sd- dataStatisticsList[0].Max;
                        for (int m = 0; m < dataStatisticsList.Count; m++)//水平位移不能有负数。
                        {
                            if (Math.Abs(dataStatisticsList[m].Sd - dataStatisticsList[m].Max) > Math.Abs(bianXing))//水平位移，得到。
                            {
                                bianXing = dataStatisticsList[m].Sd - dataStatisticsList[m].Max;
                            }
                        }
                        txtInfo.Content = Math.Round(bianXing,1) + "";
                        tagInfos[i].AddContent(txtInfo);
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[垂直变形编号]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        double bianXing = dataStatisticsList[0].Sd - dataStatisticsList[0].Max;
                        string name = dataStatisticsList[0].Name;
                        for (int m = 0; m < dataStatisticsList.Count; m++)//水平位移不能有负数。
                        {
                            if (Math.Abs(dataStatisticsList[m].Sd - dataStatisticsList[m].Max) > Math.Abs(bianXing))//水平位移，得到。
                            {
                                name = dataStatisticsList[m].Name;
                                bianXing= dataStatisticsList[m].Sd - dataStatisticsList[m].Max;
                            }
                        }
                        txtInfo.Content = name;
                        tagInfos[i].AddContent(txtInfo);
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[垂直最大值]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        if (Math.Abs(hs.Min()) > Math.Abs(hs.Max()))//绝对值大的那个，变化两大
                        {
                            txtInfo.Content = Math.Round(hs.Min(), 1) + "";
                        }
                        else
                        {
                            txtInfo.Content = Math.Round(hs.Max(), 1) + "";
                        }
                        tagInfos[i].AddContent(txtInfo);
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[裂缝最大值]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();

                        double tempLf = dataLieFengStatisticsList[0].Avg;
                        txtInfo.Content = Math.Round(tempLf, 1) + "mm,编号为"+ dataLieFengStatisticsList[0].Name;
                        for (int n=0;n< dataLieFengStatisticsList.Count;n++)
                        {
                            
                            if (Math.Abs(dataLieFengStatisticsList[n].Avg) > Math.Abs(tempLf))//绝对值大的那个，变化两大
                            {
                                txtInfo.Content = Math.Round(dataLieFengStatisticsList[n].Avg, 1) + "mm,编号为" + dataLieFengStatisticsList[n].Name;
                                tempLf = dataLieFengStatisticsList[n].Avg;
                            }
                        }
                        tagInfos[i].AddContent(txtInfo);
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[裂缝变形最大值]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();

                        double tempLf = dataLieFengStatisticsList[0].Avg - dataLieFengStatisticsList[0].Min;
                        txtInfo.Content = Math.Abs(Math.Round(tempLf, 1)) + "mm,编号为" + dataLieFengStatisticsList[0].Name;
                        for (int n = 0; n < dataLieFengStatisticsList.Count; n++)
                        {

                            if (Math.Abs(dataLieFengStatisticsList[n].Avg- dataLieFengStatisticsList[n].Min) > Math.Abs(tempLf))//绝对值大的那个，变化两大
                            {
                                txtInfo.Content = Math.Round(dataLieFengStatisticsList[n].Avg - dataLieFengStatisticsList[n].Min, 1) + "mm,编号为" + dataLieFengStatisticsList[n].Name;
                                tempLf = dataLieFengStatisticsList[n].Avg - dataLieFengStatisticsList[n].Min;
                            }
                        }
                        tagInfos[i].AddContent(txtInfo);
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[裂缝折线图标注]"))
                    {
                        if(sunLieFengUrl.Length > 0)
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "裂缝监测点长度-时间变化曲线图");
                        }
                        //else
                        //{
                        //    wordMLHelper.FillContentWithoutStyle(tagInfos[i], "");
                        //}
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[垂直编号]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        double bianHao = 0;
                        if (Math.Abs(hs.Min()) > Math.Abs(hs.Max()))//绝对值大的那个，变化两大
                        {
                            bianHao = hs.Min();
                        }
                        else
                        {
                            bianHao = hs.Max();
                        }
                        for (int m = 0; m < dataStatisticsList.Count; m++)
                        {
                            if (dataStatisticsList[m].Sd == bianHao)//水平位移，得到。
                            {
                                txtInfo.Content = dataStatisticsList[m].Name;
                            }
                        }
                        tagInfos[i].AddContent(txtInfo);
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[水平位移图]"))
                    {
                        ImgInfo imgInfo = new ImgInfo();
                        imgInfo.ImgPath = imgdir + "/SurImage/Download/"+ sumShuiPingUrl;
                       
                        imgInfo.Width = 512;
                        imgInfo.Height = 302;
                        tagInfos[i].AddContent(imgInfo);
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[垂直位移图]"))
                    {
                        ImgInfo imgInfo = new ImgInfo();
                        imgInfo.ImgPath = imgdir + "/SurImage/Download/" + sumChuiZhiUrl;

                        imgInfo.Width = 512;
                        imgInfo.Height = 302;
                        tagInfos[i].AddContent(imgInfo);
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[裂缝位移图]"))
                    {
                        if (sunLieFengUrl.Length>0)
                        {
                            ImgInfo imgInfo = new ImgInfo();
                            imgInfo.ImgPath = imgdir + "/SurImage/Download/" + sunLieFengUrl;

                            imgInfo.Width = 512;
                            imgInfo.Height = 302;
                            tagInfos[i].AddContent(imgInfo);
                        }
                        else
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "无数据");
                        }
                       
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[雨量图]"))
                    {
                        if (xyzs!="")
                        {
                            ImgInfo imgInfo = new ImgInfo();
                            imgInfo.ImgPath = imgdir + "/SurImage/Download/"+yuLiangUrl;

                            imgInfo.Width = 512;
                            imgInfo.Height = 302;
                            tagInfos[i].AddContent(imgInfo);
                        }
                        else{
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "无雨量数据");
                        }
                        
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[sumDay]"))
                    {
                        wordMLHelper.FillContentWithoutStyle(tagInfos[i], yuliangDay+"");
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[yuLiangMax]"))
                    {
                        wordMLHelper.FillContentWithoutStyle(tagInfos[i], yuLiangMax+"");
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[time]"))
                    {
                        if (yuLiangTime!="")
                        {
                            String[] x =yuLiangTime.Split('-');
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], x[1]+"月"+ x[2]+"日");
                        }
                        else
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "");
                        }
                        
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[maxYuLiang]"))
                    {
                        wordMLHelper.FillContentWithoutStyle(tagInfos[i], sumYuLiang+"");
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[startAndEnd]"))
                    {
                        if (day >= 1 && day <= 10)
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], DateTime.Now.ToString("yyyy年MM月") + "01日至"+ DateTime.Now.ToString("MM月dd日"));
                        }
                        else if (day >=11 && day <= 20)
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], DateTime.Now.ToString("yyyy年MM月") + "11日至" + DateTime.Now.ToString("MM月dd日"));
                        }
                        else {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], DateTime.Now.ToString("yyyy年MM月") + "21日至" + DateTime.Now.ToString("MM月dd日"));
                        }
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[巡视图1]"))
                    {
                        if (patrolPhotoInfoList!=null&&patrolPhotoInfoList.Count > 0)
                        {
                            PatrolPhotoInfo patrolPhotoInfo1 = patrolPhotoInfoList[0];
                            ImgInfo imgInfo = new ImgInfo();
                            imgInfo.ImgPath = imgdir + patrolPhotoInfo1.photoUrl;

                            imgInfo.Width = 264;
                            imgInfo.Height = 198;
                            tagInfos[i].AddContent(imgInfo);
                        }
                        else
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "");
                        }

                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[巡视图2]"))
                    {
                        if (patrolPhotoInfoList != null && patrolPhotoInfoList.Count > 1)
                        {
                            PatrolPhotoInfo patrolPhotoInfo1 = patrolPhotoInfoList[1];
                            ImgInfo imgInfo = new ImgInfo();
                            imgInfo.ImgPath = imgdir + patrolPhotoInfo1.photoUrl;

                            imgInfo.Width = 264;
                            imgInfo.Height = 198;
                            tagInfos[i].AddContent(imgInfo);
                        }
                        else
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "");
                        }

                        continue;
                    }

                }
                else
                {
                    
                    logger.Info("【" + tagInfos[i].Tbl.TblType + "】pgsqlConnection");
                    // HORIZONTAL_HEADER
                    //HORIZONTAL_VERTICAL_HEADER
                    if (tagInfos[i].Seq == 3)
                    {
                        tagInfos[i].Tbl.TblType = TblType.HORIZONTAL_VERTICAL_HEADER;
                      
                    }
                    if (tagInfos[i].Seq == 4)
                    {
                        tagInfos[i].Tbl.TblType = TblType.HORIZONTAL_HEADER;
                        TableStructureInfo tblInfo = tagInfos[i].Tbl;
                        for (int m=0; m<dataStatisticsList.Count;m++)
                        {
                            DataStatistics datatemp= dataStatisticsList[m];
                            RowStructureInfo row = new RowStructureInfo();
                            for (int k = 0; k < 6; k++)
                            {
                                
                                CellStructureInfo cell = new CellStructureInfo();
                                TxtInfo txtInfo = new TxtInfo();
                                if (k==0)
                                {
                                    txtInfo.Content = datatemp.Name;
                                }else if (k==1)//水平
                                {
                                    txtInfo.Content = Math.Round(datatemp.Avg , 1) + "";
                                }
                                else if (k == 2)
                                {
                                    if (datatemp.Avg - datatemp.Min<0)
                                    {
                                        txtInfo.Content = "-";
                                    }
                                    else
                                    {
                                        txtInfo.Content = Math.Round(datatemp.Avg - datatemp.Min, 1) + "";
                                    }
                                    
                                }
                                else if (k == 3)//垂直
                                {
                                    txtInfo.Content = Math.Round(datatemp.Sd, 1) + "";
                                }
                                else if (k == 4)
                                {
                                    txtInfo.Content = Math.Round(datatemp.Sd- datatemp.Max, 1) + "";
                                }
                                txtInfo.Size = 20;
                                cell.AddContent(txtInfo);
                                row.AddCell(cell);
                            }
                            tblInfo.AddRow(row);
                        }
                        
                    }
                    if (tagInfos[i].Seq == 13)//裂缝，大蓝牙，周家原子
                    {
                        tagInfos[i].Tbl.TblType = TblType.HORIZONTAL_HEADER;
                        TableStructureInfo tblInfo = tagInfos[i].Tbl;
                        for (int m = 0; m < dataLieFengStatisticsList.Count; m++)
                        {
                            DataStatistics datatemp = dataLieFengStatisticsList[m];
                            RowStructureInfo row = new RowStructureInfo();
                            for (int k = 0; k < 5; k++)
                            {

                                CellStructureInfo cell = new CellStructureInfo();
                                TxtInfo txtInfo = new TxtInfo();
                                if (k == 0)
                                {
                                    txtInfo.Content = datatemp.Name;
                                }
                                else if (k == 1)//水平
                                {
                                    txtInfo.Content = Math.Round(datatemp.Avg, 1) + "";
                                }
                                else if (k == 2)
                                {
                                    txtInfo.Content = Math.Round((datatemp.Avg - datatemp.Min) , 2) + "";
                                }
                                else if (k == 3)//垂直
                                {
                                    txtInfo.Content = Math.Abs(Math.Round((datatemp.Avg - datatemp.Min), 2)) + "mm/10d";
                                }
                                txtInfo.Size = 20;
                                cell.AddContent(txtInfo);
                                row.AddCell(cell);
                            }
                            tblInfo.AddRow(row);
                        }
                    }

                }
            }
            //2021年11月下旬旬报
            string xunbaoName="";
            if (day >= 1 && day <= 10)
            {
                xunbaoName= "上旬旬报";
            }
            else if (day >= 11 && day <= 20)
            {
                xunbaoName = "中旬旬报";
            }
            else
            {
                xunbaoName = "下旬旬报";
            }
            string outputPath = projectString.XMMC +"-"+ DateTime.Now.ToString("yyyy年MM月")+ xunbaoName + ".docx";
            if (!string.IsNullOrEmpty(outputPath))
            {
               
                string templateOutPath = imgdir + "/SurImage/Download/"+ outputPath;

                wordMLHelper.GenerateWordDocument(File.OpenRead(templatePath)
                    , templateOutPath
                    , tagInfos);

                Assistance.RemoveAllTmpFile();// 删除所有临时文件
                //Response.Redirect(Request.Url.AbsoluteUri);
            }
         
            return outputPath;
            //无效cookie
            //  return HttpContext.Current.Request.MapPath(outputPath).Replace("\\api\\FlzWordWxpert", string.Empty).ToString();

        }
        //
        /// <summary>
        /// 月报
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [System.Web.Http.HttpGet]
        public string GetYueBaoWordMLHelper(string id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
            logger.Info("【" + pgsqlConnection + "】pgsqlConnection");

            int year = Convert.ToInt32(DateTime.Now.ToString("yyyy"));
            int month = Convert.ToInt32(DateTime.Now.ToString("MM"));
            int day = Convert.ToInt32(DateTime.Now.ToString("dd"));
            int lastDay = 30;
            if (month == 1|| month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
            {
                lastDay=31;
            }
            else if (month == 4 || month == 6 || month == 9 || month == 11 )
            {
                lastDay = 30;
            }
            else{
                if (year % 4 == 0)
                {
                    lastDay = 29;
                }
                else
                {
                    lastDay = 28;
                }
              
            }

            string lastYearMothDay = year + "年"+ month + "月" + lastDay;

            //获取当前项目信息   
            MonitorProjectString projectString = ParseMonitorHelper.ParseMonitorProjectString(
                PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_project WHERE id={0} AND ztm={1} AND bsm{2}", id, (int)MODEL.Enum.State.InUse, userbsms)));
            logger.Info("【" + JsonHelper.ToJson(projectString) + "】pgsqlConnection");

            DataController dataController = new DataController();

            MonitorController monitorController = new MonitorController();

            string devs = monitorController.GetMonitor(Convert.ToInt32(id), cookie);

            List<MonitorInfo> monitorInfo = COM.JsonHelper.StringToObject<List<MonitorInfo>>(devs);//"GNSS监测站

            // GNSS
            List<DataStatistics> dataStatisticsList = new List<DataStatistics>();//装GNSS的数据
            List<List<GNSSZheXian>> sumShuiPingList = new List<List<GNSSZheXian>>();//装水平的数据
            List<List<GNSSZheXian>> sumChuiZhiList = new List<List<GNSSZheXian>>();//装垂直的数据
            List<string> gnssName = new List<string>();
            List<double> xys = new List<double>();//全部δxy值(水平位移)，后面求最大变化
            List<double> hs = new List<double>();//全部δh值(垂直位移)，后面求最大变化值？
            // 裂缝
            List<DataStatistics> dataLieFengStatisticsList = new List<DataStatistics>();//装裂缝的数据
            List<string> lieFengName = new List<string>();
            List<List<GNSSZheXian>> sumLieFengList = new List<List<GNSSZheXian>>();//装裂缝的数据

            //剖面
            List<SectionString> sectionStringList = new List<SectionString>();//装剖面的数据。


            //雨量最大值，雨量最大值日期,总雨量，总天数
            double yuLiangMax = -0.1;
            string yuLiangTime = "";
            double sumYuLiang = 0;
            int yuliangDay = 0;
            string xyzs = "";//雨量数据
            string yuLiangUrl = "";
            for (int i = 0; i < monitorInfo.Count; i++)
            {
                MonitorString monitorString = monitorInfo[i].MonitorString;
                SectionString sectionString = monitorInfo[i].SectionString;
                if (sectionString!=null)
                {
                    Boolean flags = true;
                    for (int m=0; m<sectionStringList.Count;m++)
                    {
                        
                        if (sectionStringList[m].Id== sectionString.Id)
                        {
                            flags = false;
                        }
                    }
                    if (flags)
                    {
                       
                        if (sectionString.PMMC.IndexOf('_') > 0)
                        {
                            sectionString.PMMC = sectionString.PMMC.Split('_')[1];
                        };
                        sectionStringList.Add(sectionString);
                    }
                    

                }
                if (monitorString.JCFF == "GNSS" && monitorString.JCZLX == "GNSS监测站")//这是去查询GB的数据
                {
                    string perMonthLastDay = dataController.GetAutoDatabyPreDateTime(monitorString.Id, "GNSS", "15", cookie);//上一旬的最后一天
                    string toady = dataController.GetAutoDatabyPreDateTime(monitorString.Id, "GNSS", "1", cookie);//今天
                    string benXu = dataController.GetAutoDatabyPreDateTime(monitorString.Id, "GNSS", "3", cookie);//本月
                    DataStatistics tempDataStatistics = new DataStatistics();
                    tempDataStatistics.Name = monitorString.JCDBH;

                    if (toady != null && toady != "")
                    {
                        GNSSMonitor gnssMonitortoady = COM.JsonHelper.StringToObject<GNSSMonitor>(toady);
                        List<DataStatistics> dslist = gnssMonitortoady.Statistics;
                        for (int j = 0; j < dslist.Count; j++)
                        {
                            if (dslist[j].Name == "水平位移")
                            {
                                tempDataStatistics.Avg = dslist[j].Avg;//用Avg来装今天的水平位移
                                xys.Add(dslist[j].Avg);
                                tempDataStatistics.Min = dslist[j].Avg;//用min来装上一旬的水平位移   上一旬最后一天没值
                            }
                            if (dslist[j].Name == "垂直位移")
                            {
                                tempDataStatistics.Sd = dslist[j].Avg;//用Sd来装今天的垂直位移
                                hs.Add(dslist[j].Avg);
                                tempDataStatistics.Max = dslist[j].Avg;//用max来装上一旬的垂直位移  上一旬最后一天没值
                            }
                        }
                    }
                    else
                    {
                        tempDataStatistics.Avg = 0;//用Avg来装今天的水平位移
                        tempDataStatistics.Sd = 0;//用Sd来装今天的垂直位移
                    }

                    if (perMonthLastDay != null && perMonthLastDay != "")//上一旬的
                    {
                        GNSSMonitor gnssMonitorPerDay = COM.JsonHelper.StringToObject<GNSSMonitor>(perMonthLastDay);
                        List<DataStatistics> dslist = gnssMonitorPerDay.Statistics;
                        for (int j = 0; j < dslist.Count; j++)
                        {
                            if (dslist[j].Name == "水平位移")
                            {
                                tempDataStatistics.Min = dslist[j].Avg;//用min来装上一旬的水平位移

                            }
                            if (dslist[j].Name == "垂直位移")
                            {
                                tempDataStatistics.Max = dslist[j].Avg;//用max来装上一旬的垂直位移
                            }
                        }
                    }
                    //else
                    //{
                    //    tempDataStatistics.Min = 0;//用min来装上一旬的水平位移
                    //    tempDataStatistics.Max = 0;//用max来装上一旬的垂直位移
                    //}
                    
                    dataStatisticsList.Add(tempDataStatistics);//装GNSS数据。
                    //本月的数据，用来画折线图
                    List<GNSSZheXian> zhexiangtuShuiPingList = new List<GNSSZheXian>();
                    List<GNSSZheXian> zhexiangtuChuiZhiList = new List<GNSSZheXian>();
                    if (benXu != null && benXu != "")//本月的数据
                    {

                        GNSSMonitor gnssMonitorBenMonth = COM.JsonHelper.StringToObject<GNSSMonitor>(benXu);


                        List<GNSSDelta> zheXianTu = gnssMonitorBenMonth.Datas;

                        gnssName.Add(monitorString.JCDBH);
                        string timeString = DateTime.Now.ToString("yyyy-MM") + "-01";
                        
                        double timexy = 0;
                        double timeDh = 0;
                        int cishu = 0;
                        for (int j = 0; j < zheXianTu.Count; j++)
                        {
                            if (timeString == zheXianTu[j].Time.Substring(0, 10))
                            {
                                timexy= timexy+ zheXianTu[j].Dxy;
                                timeDh= timeDh+ zheXianTu[j].Dh;
                                cishu++;
                            }
                            else
                            {
                                if (cishu>0)
                                {
                                    //一天只要一个折现数据
                                    GNSSZheXian gNSSZheXian = new GNSSZheXian();//水平位移
                                    gNSSZheXian.name = monitorString.JCDBH;
                                    gNSSZheXian.time = timeString;
                                    gNSSZheXian.value = timexy/ cishu;
                                    zhexiangtuShuiPingList.Add(gNSSZheXian);

                                    GNSSZheXian gNSSZheXian1 = new GNSSZheXian();//垂直位移
                                    gNSSZheXian1.name = monitorString.JCDBH;
                                    gNSSZheXian1.time = timeString;
                                    gNSSZheXian1.value = timeDh/ cishu;
                                    zhexiangtuChuiZhiList.Add(gNSSZheXian1);


                                }

                                timeString = zheXianTu[j].Time.Substring(0, 10);
                                timexy =zheXianTu[j].Dxy;
                                timeDh =zheXianTu[j].Dh;
                                cishu=1;
                            }
                            if (j==zheXianTu.Count-1)//最后一个数据
                            {
                                if (cishu > 0)
                                {
                                    //一天只要一个折现数据
                                    GNSSZheXian gNSSZheXian = new GNSSZheXian();//水平位移
                                    gNSSZheXian.name = monitorString.JCDBH;
                                    gNSSZheXian.time = timeString;
                                    gNSSZheXian.value = timexy / cishu;
                                    zhexiangtuShuiPingList.Add(gNSSZheXian);

                                    GNSSZheXian gNSSZheXian1 = new GNSSZheXian();//垂直位移
                                    gNSSZheXian1.name = monitorString.JCDBH;
                                    gNSSZheXian1.time = timeString;
                                    gNSSZheXian1.value = timeDh / cishu;
                                    zhexiangtuChuiZhiList.Add(gNSSZheXian1);


                                }
                            }
                            
                        }
                        sumShuiPingList.Add(zhexiangtuShuiPingList);
                        sumChuiZhiList.Add(zhexiangtuChuiZhiList);

                    }
                    else
                    {
                        //
                    }
                    continue;
                };
                if (monitorString.JCFF == "雨量")
                {
                    xyzs = dataController.GetAutoDatabyPreDateTime(monitorString.Id, "雨量", "3", cookie);

                    if (xyzs != "")
                    {
                        List<RAINDelta> xywww = COM.JsonHelper.StringToObject<List<RAINDelta>>(xyzs);
                        yuLiangUrl = this.DrawBarChart(xywww,"YUE");//生成雨量柱状图
                        for (int k = 0; k < xywww.Count; k++)
                        {
                            sumYuLiang = sumYuLiang + xywww[k].Value;
                            if (xywww[k].Value > yuLiangMax)
                            {
                                yuLiangMax = xywww[k].Value;
                                yuLiangTime = xywww[k].Time;
                            }
                            if (xywww[k].Value > 0)//下雨
                            {
                                yuliangDay++;
                            }

                        }
                    }
                    else//雨量没数据，怎么办？
                    {
                        yuLiangMax = 0;
                        yuLiangTime = year + "-" + month + "-" + day;
                    }
                    continue;
                }
                if (monitorString.JCFF == "裂缝")
                {
                    string perMonthLastDay = dataController.GetAutoDatabyPreDateTime(monitorString.Id, "裂缝", "15", cookie);//上一月的最后一天
                    string toady = dataController.GetAutoDatabyPreDateTime(monitorString.Id, "裂缝", "1", cookie);//今天
                    string benMonth = dataController.GetAutoDatabyPreDateTime(monitorString.Id, "裂缝", "3", cookie);//本月
                    DataStatistics tempDataStatistics = new DataStatistics();
                    tempDataStatistics.Name = monitorString.JCDBH;


                    if (toady != null && toady != "")
                    {
                        LFMonitor lfMonitortoady = COM.JsonHelper.StringToObject<LFMonitor>(toady);
                        List<DataStatistics> dslist = lfMonitortoady.Statistics;
                        for (int j = 0; j < dslist.Count; j++)
                        {
                            tempDataStatistics.Avg = dslist[j].Avg;//用Avg来装今天的水平位移
                            tempDataStatistics.Min = dslist[j].Avg;//用min来装上一旬的水平位移  没有值的情况
                        }
                    }
                    else
                    {
                        tempDataStatistics.Avg = 0;//用Avg来装今天的水平位移
                    }
                    if (perMonthLastDay != null && perMonthLastDay != "")//上一旬的，本旬
                    {
                        LFMonitor lfMonitorPerDay = COM.JsonHelper.StringToObject<LFMonitor>(perMonthLastDay);
                        List<DataStatistics> dslist = lfMonitorPerDay.Statistics;
                        for (int j = 0; j < dslist.Count; j++)
                        {
                            tempDataStatistics.Min = dslist[j].Avg;//用min来装上一旬的水平位移
                        }
                    }
                    //else
                    //{
                    //    tempDataStatistics.Min = 0;//用min来装上一旬的水平位移
                    //}
                    
                    dataLieFengStatisticsList.Add(tempDataStatistics);//装裂缝数据。
                    //本旬的数据，用来画折线图
                    List<GNSSZheXian> lieFengList = new List<GNSSZheXian>();
                    if (benMonth != null && benMonth != "")//本月的
                    {

                        LFMonitor lfMonitorBenMonth = COM.JsonHelper.StringToObject<LFMonitor>(benMonth);
                        List<LFDelta> zheXianTu = lfMonitorBenMonth.Datas;

                        lieFengName.Add(monitorString.JCDBH);
                        string timeString = DateTime.Now.ToString("yyyy-MM") + "-01";

                        double timeDv = 0;
                        int cishu = 0;
                        for (int j = 0; j < zheXianTu.Count; j++)
                        {

                            if (timeString == zheXianTu[j].Time.Substring(0, 10))
                            {
                                timeDv = timeDv + zheXianTu[j].Dv;
                                cishu++;
                            }
                            else
                            {
                                if (cishu > 0)
                                {
                                    //一天只要一个折现数据
                                  


                                    GNSSZheXian LiefengZheXian = new GNSSZheXian();//水平位移
                                    LiefengZheXian.name = monitorString.JCDBH;
                                    LiefengZheXian.time = timeString;
                                    LiefengZheXian.value = timeDv/ cishu;
                                    lieFengList.Add(LiefengZheXian);


                                }

                                timeString = zheXianTu[j].Time.Substring(0, 10);
                                timeDv = zheXianTu[j].Dv;
                                cishu = 1;
                            }
                            if (j == zheXianTu.Count - 1)//最后一个数据
                            {
                                if (cishu > 0)
                                {

                                    GNSSZheXian LiefengZheXian = new GNSSZheXian();//水平位移
                                    LiefengZheXian.name = monitorString.JCDBH;
                                    LiefengZheXian.time = timeString;
                                    LiefengZheXian.value = timeDv / cishu;
                                    lieFengList.Add(LiefengZheXian);


                                }
                            }
                            
                        }
                        sumLieFengList.Add(lieFengList);
                    }
                    else
                    {
                        //
                    }


                    continue;
                }

            }

           
            string sumShuiPingUrl = "";
            string sumChuiZhiUrl = "";
            //if (gnssName.Count > 0)
            //{
            //    sumShuiPingUrl = this.DrawLineChart(sumShuiPingList, gnssName, "YUE");
            //    sumChuiZhiUrl = this.DrawLineChart(sumChuiZhiList, gnssName, "YUE");
            //}

            string sunLieFengUrl = "";

            if (lieFengName.Count > 0)//看有没有折线数据
            {
                sunLieFengUrl = this.DrawLineChart(sumLieFengList, lieFengName,"YUE");
            }



            // 算总时间
            string jieSuTime = projectString.BZ;
            //TxtInfo txtInfo = new TxtInfo();
            string patrolNum = "";
            string patrolNumZhong = "";
            string patrolNumXia= "";

            if (jieSuTime != "" && jieSuTime.Length > 0)
            {
                string[] timexy = jieSuTime.Split('-');
                if (timexy.Length > 1)
                {
                    int startYear = int.Parse(timexy[0]);
                    int dattime = int.Parse(timexy[1]);
                    //txtInfo.Content=(year - startYear-1)*36+3+"";//

                    if (day >= 1 && day <= 10)
                    {
                        patrolNum = (year - startYear - 1) * 36 + dattime + ((month - 1) * 3 + 1) + "";
                    }
                    else if (day >= 11 && day <= 20)
                    {
                        patrolNum = (year - startYear - 1) * 36 + dattime + ((month - 1) * 3 + 2)-1 + "";//上旬的照片
                        patrolNumZhong = (year - startYear - 1) * 36 + dattime + ((month - 1) * 3 + 2) + "";//中旬的照片

                    }
                    else
                    {
                        patrolNum= (year - startYear - 1) * 36 + dattime + ((month - 1) * 3 + 3)-2 + "";//上旬
                        patrolNumZhong  = (year - startYear - 1) * 36 + dattime + ((month - 1) * 3 + 3)-1 + "";//中旬
                        patrolNumXia  = (year - startYear - 1) * 36 + dattime + ((month - 1) * 3 + 3) + "";//下旬
                    }
                }
            }
            PatrolEquipmentController patrolEquipmentController = new PatrolEquipmentController();
            List<PatrolPhotoInfo> patrolPhotoInfoList = new List<PatrolPhotoInfo>();
            List<PatrolPhotoInfo> patrolPhotoInfoListZhong = new List<PatrolPhotoInfo>();
            List<PatrolPhotoInfo> patrolPhotoInfoListXia = new List<PatrolPhotoInfo>();
            if (patrolNum.Length > 0)//上旬
            {
                string photoList = patrolEquipmentController.getPatrolPhotoInfo(projectString.Id + "", patrolNum);

                patrolPhotoInfoList = COM.JsonHelper.StringToObject<List<PatrolPhotoInfo>>(photoList);
            }
            if (patrolNumZhong.Length > 0)//中旬
            {
                string photoList = patrolEquipmentController.getPatrolPhotoInfo(projectString.Id + "", patrolNumZhong);

                patrolPhotoInfoListZhong = COM.JsonHelper.StringToObject<List<PatrolPhotoInfo>>(photoList);
            }
            if (patrolNumXia.Length > 0)//下旬
            {
                string photoList = patrolEquipmentController.getPatrolPhotoInfo(projectString.Id + "", patrolNumXia);

                patrolPhotoInfoListXia = COM.JsonHelper.StringToObject<List<PatrolPhotoInfo>>(photoList);
            }
            ////剖面数据组装？
            for (int m=0;m< sectionStringList.Count;m++)
            {
                char qiege = '_';
                if (sectionStringList[m].PMBH.IndexOf('-') > 0)
                {
                    qiege = '-';
                   
                };
                String[] sectionName = sectionStringList[m].PMBH.Split(qiege);
                //剖面名称是根据编号来的。
                List<List<GNSSZheXian>> shuiPingListsection = new List<List<GNSSZheXian>>();//装水平的数据
                List<List<GNSSZheXian>> chuiZhiListsection = new List<List<GNSSZheXian>>();//装水平的数据
                List<string> gnssSecName = new List<string>();


                List<List<GNSSZheXian>>lieFengListsection = new List<List<GNSSZheXian>>();//装裂缝的数据
                List<string> lieFengSecName = new List<string>();
                for (int n=0;n< sectionName.Length;n++)
                {
                    for (int i = 0; i < gnssName.Count; i++)//水平？
                    {
                        if (sectionName[n]== gnssName[i])//
                        {
                            shuiPingListsection.Add(sumShuiPingList[i]);
                            chuiZhiListsection.Add(sumChuiZhiList[i]);
                            gnssSecName.Add(gnssName[i]);
                        }
                    }
                   
                    for (int i = 0; i < lieFengName.Count; i++)//裂缝
                    {
                        if (sectionName[n] == lieFengName[i])
                        {
                            lieFengListsection.Add(sumLieFengList[i]);
                        }
                    }
                }
                if (gnssSecName.Count>0)
                {
                    sectionStringList[m].BSM = this.DrawLineChart(shuiPingListsection, gnssSecName,"YUE");//标识码装水平的
                    sectionStringList[m].BZ = this.DrawLineChart(chuiZhiListsection, gnssSecName,"YUE");//备注装线性的
                }

                

            }




            string templatePath = imgdir + "/SurImage/MoBan/" + projectString.ZHDMC + "月报.docx";


            WordMLHelper wordMLHelper = new WordMLHelper();
            List<TagInfo> tagInfos = wordMLHelper.GetAllTagInfo(File.OpenRead(templatePath));//打开模板文件,获取所有填充域

            for (int i = 0; i < tagInfos.Count; i++)
            {
                //填充域有两种类型,1:段落或图片,2:表格
                //对填充域填充时需先判断填充域类型
                if (tagInfos[i].Tbl == null)
                {
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[大写年月]"))
                    {
                        string daxie = "";
                        if (year - 2020 == 2)
                        {
                            daxie = "二年";
                        }
                        else if (year - 2020 == 3)
                        {
                            daxie = "三年";
                        }
                        else if (year - 2020 == 4)
                        {
                            daxie = "四年";
                        }
                        else if (year - 2020 == 5)
                        {
                            daxie = "五年";
                        }
                        if (month==1)
                        {
                            daxie = daxie + "一";
                        }
                        else if (month == 2)
                        {
                            daxie = daxie + "二";
                        }
                        else if (month == 3)
                        {
                            daxie = daxie + "三";
                        }
                        else if (month == 4)
                        {
                            daxie = daxie + "四";
                        }
                        else if (month == 5)
                        {
                            daxie = daxie + "五";
                        }
                        else if (month == 6)
                        {
                            daxie = daxie + "六";
                        }
                        else if (month == 7)
                        {
                            daxie = daxie + "七";
                        }
                        else if (month == 8)
                        {
                            daxie = daxie + "八";
                        }
                        else if (month == 9)
                        {
                            daxie = daxie + "九";
                        }
                        else if (month == 10)
                        {
                            daxie = daxie + "十";
                        }
                        else if (month == 11)
                        {
                            daxie = daxie + "十一";
                        }
                        else if (month == 12)
                        {
                            daxie = daxie + "十二";
                        }
                        TxtInfo txtInfo = new TxtInfo();
                        txtInfo.Content = daxie;
                        if (i==2)//第一也那个
                        {
                            txtInfo.Size = 32;
                            txtInfo.Bold = "true";
                        }
                        else if (i==5)
                        {
                            txtInfo.Size = 30;
                        }
                        tagInfos[i].AddContent(txtInfo);
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[起始时间]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        txtInfo.Content = year + "年" + month + "月1日";
                        txtInfo.Size = 28;
                        if (i==0)//第一个
                        {
                            txtInfo.Bold = "true";
                        }
                        tagInfos[i].AddContent(txtInfo);
                       
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[时间]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        txtInfo.Content = lastYearMothDay;
                        txtInfo.Size = 28;
                        if (i == 1)//第一个
                        {
                            txtInfo.Bold = "true";
                        }
                        tagInfos[i].AddContent(txtInfo);
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[年月粗]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        txtInfo.Content = year + "年" + month;
                        txtInfo.Size = 28;
                        txtInfo.Bold = "true";
                        tagInfos[i].AddContent(txtInfo);
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[年月]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        txtInfo.Content = year + "年" + month;
                        txtInfo.Size = 28;
                        tagInfos[i].AddContent(txtInfo);
                        continue;
                    }

                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[水平最大值]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        if (Math.Abs(xys.Min()) > Math.Abs(xys.Max()))//绝对值大的那个，变化两大
                        {
                            txtInfo.Content = Math.Round(xys.Min(), 1) + "mm";
                        }
                        else
                        {
                            txtInfo.Content = Math.Round(xys.Max(), 1) + "mm";
                        }
                        txtInfo.Size = 28;
                        tagInfos[i].AddContent(txtInfo);
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[水平编号]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        double bianHao = 0;
                        if (Math.Abs(xys.Min()) > Math.Abs(xys.Max()))//绝对值大的那个，变化两大
                        {
                            bianHao = xys.Min();
                        }
                        else
                        {
                            bianHao = xys.Max();
                        }
                        for (int m = 0; m < dataStatisticsList.Count; m++)
                        {
                            if (dataStatisticsList[m].Avg == bianHao)//水平位移，得到。
                            {
                                txtInfo.Content = dataStatisticsList[m].Name;
                            }
                        }
                        txtInfo.Size = 28;
                        tagInfos[i].AddContent(txtInfo);
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[水平变形最大值]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        double bianXing = 0;
                        for (int m = 0; m < dataStatisticsList.Count; m++)//水平位移不能有负数。
                        {
                            if (dataStatisticsList[m].Avg - dataStatisticsList[m].Min > bianXing)//水平位移，得到。
                            {
                                bianXing = dataStatisticsList[m].Avg - dataStatisticsList[m].Min;
                            }
                        }
                        txtInfo.Size = 28;
                        txtInfo.Content = Math.Round(bianXing, 1) + "mm";
                        tagInfos[i].AddContent(txtInfo);
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[水平变形编号]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        double bianXing = 0;
                        string name = dataStatisticsList[0].Name;
                        for (int m = 0; m < dataStatisticsList.Count; m++)//水平位移不能有负数。
                        {
                            if (dataStatisticsList[m].Avg - dataStatisticsList[m].Min > bianXing)//水平位移，得到。
                            {
                                name = dataStatisticsList[m].Name;
                                bianXing = dataStatisticsList[m].Avg - dataStatisticsList[m].Min;
                            }
                        }
                        txtInfo.Content = name;
                        txtInfo.Size = 28;
                        tagInfos[i].AddContent(txtInfo);
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[垂直变形最大值]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        double bianXing = dataStatisticsList[0].Sd - dataStatisticsList[0].Max;
                        for (int m = 0; m < dataStatisticsList.Count; m++)//水平位移不能有负数。
                        {
                            if (Math.Abs(dataStatisticsList[m].Sd - dataStatisticsList[m].Max) > Math.Abs(bianXing))//水平位移，得到。
                            {
                                bianXing = dataStatisticsList[m].Sd - dataStatisticsList[m].Max;
                            }
                        }
                        txtInfo.Content = Math.Round(bianXing, 1) + "mm";
                        txtInfo.Size = 28;
                        tagInfos[i].AddContent(txtInfo);
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[垂直变形编号]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        double bianXing = dataStatisticsList[0].Sd - dataStatisticsList[0].Max;
                        string name = dataStatisticsList[0].Name;
                        for (int m = 0; m < dataStatisticsList.Count; m++)//水平位移不能有负数。
                        {
                            if (Math.Abs(dataStatisticsList[m].Sd - dataStatisticsList[m].Max) > Math.Abs(bianXing))//水平位移，得到。
                            {
                                name = dataStatisticsList[m].Name;
                                bianXing = dataStatisticsList[m].Sd - dataStatisticsList[m].Max;
                            }
                        }
                        txtInfo.Content = name;
                        txtInfo.Size = 28;
                        tagInfos[i].AddContent(txtInfo);
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[垂直最大值]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        if (Math.Abs(hs.Min()) > Math.Abs(hs.Max()))//绝对值大的那个，变化两大
                        {
                            txtInfo.Content = Math.Round(hs.Min(), 1) + "mm";
                        }
                        else
                        {
                            txtInfo.Content = Math.Round(hs.Max(), 1) + "mm";
                        }
                        txtInfo.Size = 28;
                        tagInfos[i].AddContent(txtInfo);
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[裂缝最大值]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();

                        double tempLf = dataLieFengStatisticsList[0].Avg;
                        txtInfo.Content = Math.Round(tempLf, 1) + "mm,编号为" + dataLieFengStatisticsList[0].Name;
                        for (int n = 0; n < dataLieFengStatisticsList.Count; n++)
                        {

                            if (Math.Abs(dataLieFengStatisticsList[n].Avg) > Math.Abs(tempLf))//绝对值大的那个，变化两大
                            {
                                txtInfo.Content = Math.Round(dataLieFengStatisticsList[n].Avg, 1) + "mm,编号为" + dataLieFengStatisticsList[n].Name;
                                tempLf = dataLieFengStatisticsList[n].Avg;
                            }
                        }
                        txtInfo.Size = 28;
                        tagInfos[i].AddContent(txtInfo);
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[裂缝变形最大值]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();

                        double tempLf = dataLieFengStatisticsList[0].Avg - dataLieFengStatisticsList[0].Min;
                        txtInfo.Content = Math.Abs(Math.Round(tempLf, 1)) + "mm,编号为" + dataLieFengStatisticsList[0].Name;
                        for (int n = 0; n < dataLieFengStatisticsList.Count; n++)
                        {

                            if (Math.Abs(dataLieFengStatisticsList[n].Avg - dataLieFengStatisticsList[n].Min) > Math.Abs(tempLf))//绝对值大的那个，变化两大
                            {
                                txtInfo.Content = Math.Round(dataLieFengStatisticsList[n].Avg - dataLieFengStatisticsList[n].Min, 1) + "mm,编号为" + dataLieFengStatisticsList[n].Name;
                                tempLf = dataLieFengStatisticsList[n].Avg - dataLieFengStatisticsList[n].Min;
                            }
                        }
                        txtInfo.Size = 28;
                        tagInfos[i].AddContent(txtInfo);
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[裂缝折线图标注]"))
                    {
                        if (sunLieFengUrl.Length > 0)
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "裂缝监测点长度-时间变化曲线图");
                        }
                        else
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "");
                        }
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[垂直编号]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        double bianHao = 0;
                        if (Math.Abs(hs.Min()) > Math.Abs(hs.Max()))//绝对值大的那个，变化两大
                        {
                            bianHao = hs.Min();
                        }
                        else
                        {
                            bianHao = hs.Max();
                        }
                        for (int m = 0; m < dataStatisticsList.Count; m++)
                        {
                            if (dataStatisticsList[m].Sd == bianHao)//水平位移，得到。
                            {
                                txtInfo.Content = dataStatisticsList[m].Name;
                            }
                        }
                        txtInfo.Size = 28;
                        tagInfos[i].AddContent(txtInfo);
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[水平位移图]"))
                    {
                        ImgInfo imgInfo = new ImgInfo();
                        imgInfo.ImgPath = imgdir + "/SurImage/Download/" + sumShuiPingUrl;

                        imgInfo.Width = 512;
                        imgInfo.Height = 302;
                        tagInfos[i].AddContent(imgInfo);
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[垂直位移图]"))
                    {
                        ImgInfo imgInfo = new ImgInfo();
                        imgInfo.ImgPath = imgdir + "/SurImage/Download/" + sumChuiZhiUrl;

                        imgInfo.Width = 512;
                        imgInfo.Height = 302;
                        tagInfos[i].AddContent(imgInfo);
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[裂缝位移图]"))
                    {
                        if (sunLieFengUrl.Length > 0)
                        {
                            ImgInfo imgInfo = new ImgInfo();
                            imgInfo.ImgPath = imgdir + "/SurImage/Download/" + sunLieFengUrl;

                            imgInfo.Width = 512;
                            imgInfo.Height = 402;
                            tagInfos[i].AddContent(imgInfo);
                        }
                        else
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "");
                        }

                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[雨量图]"))
                    {
                        if (xyzs != "")
                        {
                            ImgInfo imgInfo = new ImgInfo();
                            imgInfo.ImgPath = imgdir + "/SurImage/Download/"+ yuLiangUrl;

                            imgInfo.Width = 512;
                            imgInfo.Height = 402;
                            tagInfos[i].AddContent(imgInfo);
                        }
                        else
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "无雨量数据");
                        }

                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[sumDay]"))
                    {
                        TxtInfo txtInfo = new TxtInfo();
                        txtInfo.Content = yuliangDay + "";
                        txtInfo.Size = 28;
                        tagInfos[i].AddContent(txtInfo);
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[yuLiangMax]"))
                    {
                        
                        TxtInfo txtInfo = new TxtInfo();
                        txtInfo.Content = yuLiangMax + "";
                        txtInfo.Size = 28;
                        tagInfos[i].AddContent(txtInfo);
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[time]"))
                    {
                        if (yuLiangTime != "")
                        {
                            String[] x = yuLiangTime.Split('-');

                            TxtInfo txtInfo = new TxtInfo();
                            txtInfo.Content = x[1] + "月" + x[2] + "日";
                            txtInfo.Size = 28;
                            tagInfos[i].AddContent(txtInfo);
                        }
                        else
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "");
                        }

                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[maxYuLiang]"))
                    {
                        
                        TxtInfo txtInfo = new TxtInfo();
                        txtInfo.Content = sumYuLiang + "";
                        txtInfo.Size = 28;
                        tagInfos[i].AddContent(txtInfo);
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[startAndEnd]"))
                    {
                        if (day >= 1 && day <= 10)
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], DateTime.Now.ToString("yyyy年MM月") + "01日至" + DateTime.Now.ToString("MM月dd日"));
                        }
                        else if (day >= 11 && day <= 20)
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], DateTime.Now.ToString("yyyy年MM月") + "11日至" + DateTime.Now.ToString("MM月dd日"));
                        }
                        else
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], DateTime.Now.ToString("yyyy年MM月") + "21日至" + DateTime.Now.ToString("MM月dd日"));
                        }
                        continue;

                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[照片]"))
                    {
                        if ((patrolPhotoInfoList != null && patrolPhotoInfoList.Count > 0)
                            || (patrolPhotoInfoListZhong != null && patrolPhotoInfoListZhong.Count > 0)
                            || (patrolPhotoInfoListXia != null && patrolPhotoInfoListXia.Count > 0))
                        {
                            TxtInfo txtInfo = new TxtInfo();
                            txtInfo.Size = 24;
                            txtInfo.Content ="宏观巡视照片如下:";
                            tagInfos[i].AddContent(txtInfo);

                        }
                        else
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "");
                        }

                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[上旬]"))
                    {
                        if (patrolPhotoInfoList != null && patrolPhotoInfoList.Count > 0)
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "本月上旬对大岚垭滑坡进行了1次专业宏观地质巡查，未发现异常迹象，宏观巡查照片见下图：");

                        }
                        else
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "");
                        }

                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[上旬图1]"))
                    {
                        if (patrolPhotoInfoList != null && patrolPhotoInfoList.Count > 0)
                        {
                            PatrolPhotoInfo patrolPhotoInfo1 = patrolPhotoInfoList[0];
                            ImgInfo imgInfo = new ImgInfo();
                            imgInfo.ImgPath = imgdir + patrolPhotoInfo1.photoUrl;

                            imgInfo.Width = 264;
                            imgInfo.Height = 198;
                            tagInfos[i].AddContent(imgInfo);
                        }
                        else
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "");
                        }

                        continue;
                    }
                    
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[上旬图2]"))
                    {
                        if (patrolPhotoInfoList != null && patrolPhotoInfoList.Count > 1)
                        {
                            PatrolPhotoInfo patrolPhotoInfo1 = patrolPhotoInfoList[1];
                            ImgInfo imgInfo = new ImgInfo();
                            imgInfo.ImgPath = imgdir + patrolPhotoInfo1.photoUrl;

                            imgInfo.Width = 264;
                            imgInfo.Height = 198;
                            tagInfos[i].AddContent(imgInfo);
                        }
                        else
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "");
                        }

                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[中旬]"))
                    {
                        if (patrolPhotoInfoListZhong != null && patrolPhotoInfoListZhong.Count > 0)
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "本月中旬旬对大岚垭滑坡进行了1次专业宏观地质巡查，未发现异常迹象，宏观巡查照片见下图：");

                        }
                        else
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "");
                        }

                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[中旬图1]"))
                    {
                        if (patrolPhotoInfoListZhong != null && patrolPhotoInfoListZhong.Count > 0)
                        {
                            PatrolPhotoInfo patrolPhotoInfo1 = patrolPhotoInfoListZhong[0];
                            ImgInfo imgInfo = new ImgInfo();
                            imgInfo.ImgPath = imgdir + patrolPhotoInfo1.photoUrl;

                            imgInfo.Width = 264;
                            imgInfo.Height = 198;
                            tagInfos[i].AddContent(imgInfo);
                        }
                        else
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "");
                        }

                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[中旬图2]"))
                    {
                        if (patrolPhotoInfoListZhong != null && patrolPhotoInfoListZhong.Count > 1)
                        {
                            PatrolPhotoInfo patrolPhotoInfo1 = patrolPhotoInfoListZhong[1];
                            ImgInfo imgInfo = new ImgInfo();
                            imgInfo.ImgPath = imgdir + patrolPhotoInfo1.photoUrl;

                            imgInfo.Width = 264;
                            imgInfo.Height = 198;
                            tagInfos[i].AddContent(imgInfo);
                        }
                        else
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "");
                        }

                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[下旬]"))
                    {
                        if (patrolPhotoInfoListXia != null && patrolPhotoInfoListXia.Count > 0)
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "本月下旬对大岚垭滑坡进行了1次专业宏观地质巡查，未发现异常迹象，宏观巡查照片见下图：");

                        }
                        else
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "");
                        }

                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[下旬图1]"))
                    {
                        if (patrolPhotoInfoListXia != null && patrolPhotoInfoListXia.Count > 0)
                        {
                            PatrolPhotoInfo patrolPhotoInfo1 = patrolPhotoInfoListXia[0];
                            ImgInfo imgInfo = new ImgInfo();
                            imgInfo.ImgPath = imgdir + patrolPhotoInfo1.photoUrl;

                            imgInfo.Width = 264;
                            imgInfo.Height = 198;
                            tagInfos[i].AddContent(imgInfo);
                        }
                        else
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "");
                        }

                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[下旬图2]"))
                    {
                        if (patrolPhotoInfoListXia != null && patrolPhotoInfoListXia.Count > 1)
                        {
                            PatrolPhotoInfo patrolPhotoInfo1 = patrolPhotoInfoListXia[1];
                            ImgInfo imgInfo = new ImgInfo();
                            imgInfo.ImgPath = imgdir + patrolPhotoInfo1.photoUrl;

                            imgInfo.Width = 264;
                            imgInfo.Height = 198;
                            tagInfos[i].AddContent(imgInfo);
                        }
                        else
                        {
                            wordMLHelper.FillContentWithoutStyle(tagInfos[i], "");
                        }

                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[剖面1水]"))//李家湾剖面1
                    {
                        for (int x=0;x<sectionStringList.Count;x++)
                        {
                            if (sectionStringList[x].PMMC == "1-1'")
                            {
                                ImgInfo imgInfo = new ImgInfo();
                                imgInfo.ImgPath = imgdir + "/SurImage/Download/" + sectionStringList[x].BSM;

                                imgInfo.Width = 512;
                                imgInfo.Height = 402;
                                tagInfos[i].AddContent(imgInfo);
                            }
                        }
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[剖面1垂]"))//李家湾剖面1
                    {
                        for (int x = 0; x < sectionStringList.Count; x++)
                        {
                            if (sectionStringList[x].PMMC == "1-1'")
                            {
                                ImgInfo imgInfo = new ImgInfo();
                                imgInfo.ImgPath = imgdir + "/SurImage/Download/" + sectionStringList[x].BZ;

                                imgInfo.Width = 512;
                                imgInfo.Height = 402;
                                tagInfos[i].AddContent(imgInfo);
                            }
                        }
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[剖面2水]"))//李家湾剖面1
                    {
                        for (int x = 0; x < sectionStringList.Count; x++)
                        {
                            if (sectionStringList[x].PMMC == "2-2'")
                            {
                                ImgInfo imgInfo = new ImgInfo();
                                imgInfo.ImgPath = imgdir + "/SurImage/Download/" + sectionStringList[x].BSM;

                                imgInfo.Width = 512;
                                imgInfo.Height = 402;
                                tagInfos[i].AddContent(imgInfo);
                            }
                        }
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[剖面2垂]"))//李家湾剖面1
                    {
                        for (int x = 0; x < sectionStringList.Count; x++)
                        {
                            if (sectionStringList[x].PMMC == "2-2'")
                            {
                                ImgInfo imgInfo = new ImgInfo();
                                imgInfo.ImgPath = imgdir + "/SurImage/Download/" + sectionStringList[x].BZ;

                                imgInfo.Width = 512;
                                imgInfo.Height = 402;
                                tagInfos[i].AddContent(imgInfo);
                            }
                        }
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[剖面3水]"))//李家湾剖面1
                    {
                        for (int x = 0; x < sectionStringList.Count; x++)
                        {
                            if (sectionStringList[x].PMMC == "3-3'")
                            {
                                ImgInfo imgInfo = new ImgInfo();
                                imgInfo.ImgPath = imgdir + "/SurImage/Download/" + sectionStringList[x].BSM;

                                imgInfo.Width = 512;
                                imgInfo.Height = 402;
                                tagInfos[i].AddContent(imgInfo);
                            }
                        }
                        continue;
                    }
                    if (string.Equals(tagInfos[i].TagTips.Trim(), "[剖面3垂]"))//李家湾剖面1
                    {
                        for (int x = 0; x < sectionStringList.Count; x++)
                        {
                            if (sectionStringList[x].PMMC == "3-3'")
                            {
                                ImgInfo imgInfo = new ImgInfo();
                                imgInfo.ImgPath = imgdir + "/SurImage/Download/" + sectionStringList[x].BZ;

                                imgInfo.Width = 512;
                                imgInfo.Height = 402;
                                tagInfos[i].AddContent(imgInfo);
                            }
                        }
                        continue;
                    }
                }
                else
                {

                    logger.Info("【" + tagInfos[i].Tbl.TblType + "】pgsqlConnection");
                    // HORIZONTAL_HEADER
                    //HORIZONTAL_VERTICAL_HEADER
                    TableStructureInfo tblInfo1 = tagInfos[i].Tbl;
                    List<RowStructureInfo> xyz1 = tblInfo1.Rows;
                    RowStructureInfo row1 = xyz1[0];
                    List<CellStructureInfo> mhn1 = row1.Cells;
                    CellStructureInfo zzz = mhn1[0];
                    

                    if (zzz.Tips == "监测方法"|| zzz.Tips == "序号" || zzz.Tips == "项目")//监测方法即经度
                    {
                        tagInfos[i].Tbl.TblType = TblType.HORIZONTAL_VERTICAL_HEADER;
                        continue;
                    }
                    if (zzz.Tips == "日期")//
                    {
                            RowStructureInfo row = xyz1[1];
                            List<CellStructureInfo> mhn = row.Cells;
                            TxtInfo txtInfo = new TxtInfo();
                            txtInfo.Size = 20;
                            txtInfo.Content = year + "年" + month + "月1日"+ "～"+ lastYearMothDay;
                            mhn[0].AddContent(txtInfo);
                            continue;
                    }


                    if (zzz.Tips == "监测点编号")//李家湾滑坡
                    {
                        tagInfos[i].Tbl.TblType = TblType.HORIZONTAL_HEADER;

                        TableStructureInfo tblInfo = tagInfos[i].Tbl;
                        for (int m = 0; m < dataStatisticsList.Count; m++)
                        {
                            DataStatistics datatemp = dataStatisticsList[m];
                            RowStructureInfo row = new RowStructureInfo();
                            for (int k = 0; k < 6; k++)
                            {

                                CellStructureInfo cell = new CellStructureInfo();
                                TxtInfo txtInfo = new TxtInfo();
                                if (k == 0)
                                {
                                    txtInfo.Content = datatemp.Name;
                                }
                                else if (k == 1)//水平
                                {
                                    txtInfo.Content = Math.Round(datatemp.Avg, 1) + "";
                                }
                                else if (k == 2)
                                {
                                    if (datatemp.Avg - datatemp.Min < 0)
                                    {
                                        txtInfo.Content = "-";
                                    }
                                    else
                                    {
                                        txtInfo.Content = Math.Round(datatemp.Avg - datatemp.Min, 1) + "";
                                    }

                                }
                                else if (k == 3)//垂直
                                {
                                    txtInfo.Content = Math.Round(datatemp.Sd, 1) + "";
                                }
                                else if (k == 4)
                                {
                                    txtInfo.Content = Math.Round(datatemp.Sd - datatemp.Max, 1) + "";
                                }
                                txtInfo.Size = 20;
                                cell.AddContent(txtInfo);
                                row.AddCell(cell);
                            }
                            tblInfo.AddRow(row);
                        }
                        continue;

                    }

                    if (zzz.Tips == "监测点")//裂缝
                    {
                        tagInfos[i].Tbl.TblType = TblType.HORIZONTAL_HEADER;
                        TableStructureInfo tblInfo = tagInfos[i].Tbl;
                        for (int m = 0; m < dataLieFengStatisticsList.Count; m++)
                        {
                            DataStatistics datatemp = dataLieFengStatisticsList[m];
                            RowStructureInfo row = new RowStructureInfo();
                            for (int k = 0; k < 5; k++)
                            {

                                CellStructureInfo cell = new CellStructureInfo();
                                TxtInfo txtInfo = new TxtInfo();
                                if (k == 0)
                                {
                                    txtInfo.Content = datatemp.Name;
                                }
                                else if (k == 1)//水平
                                {
                                    txtInfo.Content = Math.Round(datatemp.Avg, 1) + "";
                                }
                                else if (k == 2)
                                {
                                    txtInfo.Content = Math.Round((datatemp.Avg - datatemp.Min), 2) + "";
                                }
                                else if (k == 3)//垂直
                                {
                                    txtInfo.Content = Math.Abs(Math.Round((datatemp.Avg - datatemp.Min)/30, 3)) + "mm/d";
                                }
                                txtInfo.Size = 20;
                                cell.AddContent(txtInfo);
                                row.AddCell(cell);
                            }
                            tblInfo.AddRow(row);
                        }
                    }

                }
            }
            
            string outputPath = projectString.XMMC + "-" + DateTime.Now.ToString("yyyy年MM月") + "月报.docx";
            if (!string.IsNullOrEmpty(outputPath))
            {

                string templateOutPath = imgdir + "/SurImage/Download/" + outputPath;

                wordMLHelper.GenerateWordDocument(File.OpenRead(templatePath)
                    , templateOutPath
                    , tagInfos);

                Assistance.RemoveAllTmpFile();// 删除所有临时文件
                //Response.Redirect(Request.Url.AbsoluteUri);
            }

            return outputPath;
            //无效cookie
            //  return HttpContext.Current.Request.MapPath(outputPath).Replace("\\api\\FlzWordWxpert", string.Empty).ToString();

        }
        //折线图
        public string DrawLineChart(List<List<GNSSZheXian>> data,List<string> zheLianName,string flag)
        {
            // 预置颜色
            List<Color> colors = new List<Color>()
            {
                Color.FromArgb(255,0,0),
                Color.FromArgb(0,0,255),
                Color.FromArgb(0,255,0),
                Color.FromArgb(153,50,204),
                Color.FromArgb(230,255,0),
                Color.FromArgb(0,255,239),//bule
                Color.FromArgb(255,215,0),
                Color.FromArgb(255,140,0),
                Color.FromArgb(105,105,105)
            };

            #region 允许配置项

            //定义宽高
            int height = 400, width = 730;

            //边缘位置留白
            int margin_top = 20;
            int margin_right = 40;
            int margin_bottom = 60;
            int margin_left = 80;

            //辅助线距离顶部的距离
            int xsubline = 20;

            //文字大小，单位：px
            int fontsize = 12;

            // 折线名称预留的位置  颜色框20，与文字间隙5，文字80，距离折线图10，需要包含边缘留白
            int lineNameWidth = 120 - margin_right;

            #endregion

            #region 数据

            //最大数量/总数量--生成y轴时，显示数字需要
            double maxCount = 0;
            double minCount = 0;

            //x轴底部显示的名称
            // string[] bottomData = new string[] { "第一个", "第二个", "第三个", "第四个", "第五个" };

            //string[] bottomData = new string[data.Count];
            //折线数据
            List<List<double>> lineData = new List<List<double>> {
                
            };
            int year = Convert.ToInt32(DateTime.Now.ToString("yyyy"));
            int month = Convert.ToInt32(DateTime.Now.ToString("MM"));
            int day = Convert.ToInt32(DateTime.Now.ToString("dd"));
            int hh = Convert.ToInt32(DateTime.Now.ToString("HH"));
            int sumToal = 0;
            if (flag=="XUN")
            {
                if (day >= 1 && day <= 10)
                {
                    sumToal = (day - 1) * 24 + hh + 1;
                }
                else if (day >= 11 && day <= 20)
                {
                    sumToal = (day - 11) * 24 + hh + 1;
                }
                else
                {
                    sumToal = (day - 21) * 24 + hh + 1;
                }
            }else if (flag == "YUE")
            {
                sumToal = day;
            }
            
            int[] bottomData = Enumerable.Range(1, sumToal).ToArray();
            List<double> xyList = new List<double>();
            List<double> dhList = new List<double>();
            //bottomData[0] = "1";
            //初始值献给了。
            minCount=data[0][0].value;
            maxCount = data[0][0].value;
            for (int i = 0; i < data.Count; i++)//循环一面，把最大值最小值找出来
            {
                List<GNSSZheXian> listgnss = data[i];
                for (int j=0;j< listgnss.Count;j++)
                {
                    
                    if (listgnss[j].value > maxCount)
                    {
                        maxCount = listgnss[j].value;
                    }
                    if (listgnss[j].value < minCount)
                    {
                        minCount = listgnss[j].value;
                    }
                }
            }
            if (maxCount- minCount<50)

            {

                double temp =(50-maxCount+ minCount)/2;
                maxCount = maxCount + temp;
                minCount = minCount - temp;

            }

            //折线名称
            List<string> lineName = zheLianName;
     

            maxCount = maxCount == 0 ? 5 : maxCount;

            #endregion

            //单位转换对象
           // Spire.Pdf.Graphics.PdfUnitConvertor unitCvtr = new Spire.Pdf.Graphics.PdfUnitConvertor();

            //生成图像对象
            Bitmap image = new Bitmap(width + margin_left + margin_right + lineNameWidth, height + margin_top + margin_bottom);

            //创建画布
            Graphics g = Graphics.FromImage(image);
            //消除锯齿
            g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.AntiAlias;
            //质量
            g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
            g.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighQuality;

            //黑色画笔--主轴颜色
            Brush blackBrush = new SolidBrush(Color.FromArgb(255, 102, 102, 102));
            Pen blackPen = new Pen(blackBrush, 1);

            //灰色画笔--辅助线条颜色
            Brush grayBrush = new SolidBrush(Color.FromArgb(255, 224, 224, 224));
            Pen grayPen = new Pen(grayBrush, 1);

            //填充区域内容
            g.FillRectangle(Brushes.White, 0, 0, width + margin_left + margin_right + lineNameWidth, height + margin_top + margin_bottom);

            //y轴
            g.DrawLine(blackPen, margin_left, margin_top, margin_left, (height + margin_top));

            //x轴
            g.DrawLine(blackPen, margin_left, (height + margin_top), (width + margin_left), (height + margin_top));

           // Font font = new Font(宋体, unitCvtr.ConvertUnits(fontsize, Spire.Pdf.Graphics.PdfGraphicsUnit.Pixel, Spire.Pdf.Graphics.PdfGraphicsUnit.Point));
             
            Font font = new Font("宋体", 12, FontStyle.Bold);
            //x轴--辅助线

            //画5条辅助线，不管数字大小
            int avgCount = Convert.ToInt32(Math.Ceiling((maxCount- minCount) / 5.0));

            // 为了适应后面的计算
            maxCount = avgCount * 5;

            int lineHeight = (height - xsubline) / 5;

            //画辅助线与文字
            for (int i = 0; i <= 5; i++)
            {
                //辅助线
                if (i > 0)
                {
                    g.DrawLine(grayPen, margin_left, (height + margin_top - lineHeight * i), (width + margin_left), (height + margin_top - lineHeight * i));
                }

                //指向文字的线
                g.DrawLine(blackPen, (margin_left - 5), (height + margin_top - lineHeight * i), margin_left, (height + margin_top - lineHeight * i));
                //文字
                string  text = Convert.ToInt32(Math.Ceiling(minCount) + avgCount * i) +"mm";

                RectangleF rec = new RectangleF(10, (height + margin_top - lineHeight * i - fontsize / 2), margin_left-20, 20);
                StringFormat format = new StringFormat(StringFormatFlags.DisplayFormatControl);
                g.DrawString(text, font, blackBrush, rec, format);
            }

            //底部文字
            int singleWidth = width / sumToal;
            int pingJun = Convert.ToInt32(Math.Ceiling(sumToal / 5.0));
            
            for (int i = 0; i <=sumToal; i++)
            {
                if (i% pingJun==0)
                {
                    StringFormat format = new StringFormat();
                    format.Alignment = StringAlignment.Center; //居中

                    //x轴下的文字
                    //指向线
                    g.DrawLine(blackPen, margin_left + i * singleWidth, (height + margin_top), margin_left + i * singleWidth, (height + margin_top + 5));
                    //文字
                    RectangleF rec = new RectangleF((i * singleWidth)+30 , (height + margin_top + 15), 100, (margin_bottom - 20));
                    if (flag=="XUN")
                    {
                        g.DrawString(year + "-" + month + "-" + (day - (sumToal - i) / 24), font, blackBrush, rec, format);
                    }
                    else if (flag=="YUE")
                    {
                        if (i==0)
                        {
                            g.DrawString(year + "-" + month + "-1" , font, blackBrush, rec, format);
                        }
                        else
                        {
                            g.DrawString(year + "-" + month + "-" + (day - (sumToal - i)), font, blackBrush, rec, format);
                        }
                        
                    }
                    
                }
                //if (i == sumToal)
                //{
                    

                //    StringFormat format = new StringFormat();
                //    format.Alignment = StringAlignment.Center; //居中

                //    //x轴下的文字
                //    //指向线
                //    g.DrawLine(blackPen, margin_left + i * singleWidth, (height + margin_top), margin_left + i * singleWidth, (height + margin_top + 5));
                //    //文字
                //    RectangleF rec = new RectangleF((i * singleWidth)+30, (height + margin_top + 15), 100, (margin_bottom - 20));
                //    g.DrawString((year + "-" + month + "-" + day), font, blackBrush, rec, format);
                //}

            }

            //预定颜色

            for (int i = 0; i < lineName.Count; i++)
            {
                
                //随机颜色
                Color tempColor = colors[i];//GetRandomColor();

                //文字内容
                // StringFormat format = new StringFormat(StringFormatFlags.DirectionVertical);
                StringFormat format = new StringFormat();
                //format.Alignment = StringAlignment.Center; //居中

                //画笔
                SolidBrush brush = new SolidBrush(tempColor);
                
                Pen pen = new Pen(brush, 2);

                // 折线名称处理
                // 颜色块
                Rectangle rectangle = new Rectangle(margin_left + width + 10, margin_top + i * 25, 20, 20);
                g.FillRectangle(brush, rectangle);

                // 文字
                RectangleF rec = new RectangleF(margin_left + width + 10 + 25, margin_top + i * 25, 80, 20);
                g.DrawString(lineName[i], font, blackBrush, rec, format);
                if (data[i].Count < 2)//只有一个点的情况，
                {
                    continue;
                }
                //这里要开始画折线了
                Point[] points = new Point[data[i].Count];
                for (int j = 0; j < data[i].Count; j++)
                {
                    
                    singleWidth = width / sumToal;
                    string time = data[i][j].time;



                    int day2 = Convert.ToInt32(Convert.ToDateTime(time).ToString("dd"));
                    


                    int sumToal2 = 0;
                    if (flag=="XUN")
                    {
                        int hh2 = Convert.ToInt32(Convert.ToDateTime(time).ToString("HH"));
                        if (day2 >= 1 && day2 <= 10)
                        {
                            sumToal2 = (day2 - 1) * 24 + hh2 + 1;
                        }
                        else if (day2 >= 11 && day2 <= 20)
                        {
                            sumToal2 = (day2 - 11) * 24 + hh2 + 1;
                        }
                        else
                        {
                            sumToal2 = (day2 - 21) * 24 + hh2 + 1;
                        }
                    }else if (flag=="YUE")
                    {
                        sumToal2 = day2-1;
                    }
                    
                    // sumToal = (day - 1) * 24 + hh + 1;
                    //int x = width - ((day - day2) * 24 + hh - hh2+1) * singleWidth + margin_left;
                    int x = sumToal2 * singleWidth+ margin_left;

                    

                    int y = height + margin_top - Convert.ToInt32((data[i][j].value - minCount) / Convert.ToDouble(maxCount) * (height - xsubline));

                    Point point = new Point(x, y);

                    points[j] = point;
                }

                g.DrawLines(pen, points);
            }

            string relativePath = DateTime.Now.ToString("yyyyMMddHHmmssfff") + ".jpg";
           // string relativePath = "zheXianTu" + ".jpg";

            string path = imgdir + "/SurImage/Download/"+ relativePath;
           // Server.MapPath(relativePath);
            image.Save(path, System.Drawing.Imaging.ImageFormat.Jpeg);

            return relativePath;
           // return Json(relativePath);
        }
        //柱状图
        public string DrawBarChart(List<RAINDelta> xywww,string flag)
        {
            #region 允许配置项

            //定义宽高
            int height = 400, width = 730;

            //边缘位置留白
            int margin_top = 20;
            int margin_right = 40;
            int margin_bottom = 60;
            int margin_left = 60;

            //辅助线距离顶部的距离
            int xsubline = 20;

            //文字大小，单位：px
            int fontsize = 12;

            #endregion

            #region 数据

            //最大数量/总数量
            double maxCount = 0;

            //string[] bottomData = new string[] { "第一个", "第二个", "第三个", "第四个", "第五个" };
            string[] bottomData = new string[xywww.Count];
            double[] barData = new double[xywww.Count];
            //bottomData[0] = "1";
            for (int i=0;i< xywww.Count;i++)
            {
                bottomData[i] = xywww[i].Time;
                barData[i]= xywww[i].Value;
            }
            

            maxCount = barData.Max();
            maxCount = maxCount == 0 ? 5 : maxCount;

            #endregion

            //单位转换对象
           // Spire.Pdf.Graphics.PdfUnitConvertor unitCvtr = new Spire.Pdf.Graphics.PdfUnitConvertor();

            //生成图像对象
            Bitmap image = new Bitmap(width + margin_left + margin_right, height + margin_top + margin_bottom);

            //创建画布
            Graphics g = Graphics.FromImage(image);
            //消除锯齿
            g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.AntiAlias;
            //质量
            g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
            g.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighQuality;

            //黑色画笔--主轴颜色
            Brush blackBrush = new SolidBrush(Color.FromArgb(255, 102, 102, 102));
            Pen blackPen = new Pen(blackBrush, 1);

            //灰色画笔--辅助线条颜色
            Brush grayBrush = new SolidBrush(Color.FromArgb(255, 224, 224, 224));
            Pen grayPen = new Pen(grayBrush, 1);

            //填充区域内容
            g.FillRectangle(Brushes.White, 0, 0, width + margin_left + margin_right, height + margin_top + margin_bottom);

            //y轴
            g.DrawLine(blackPen, margin_left, margin_top, margin_left, (height + margin_top));

            //x轴
            g.DrawLine(blackPen, margin_left, (height + margin_top), (width + margin_left), (height + margin_top));

            Font font = new Font("宋体", 12, FontStyle.Bold);
            //x轴--辅助线

            //画5条辅助线，不管数字大小..这里数字变化后，maxCount也继续变化，以适应后面的计算
            int avgCount = Convert.ToInt32(Math.Ceiling(maxCount / 5.0));

            maxCount = avgCount * 5;

            int lineHeight = (height - xsubline) / 5;

            //画辅助线与文字
            
            for (int i = 0; i <= 5; i++)
            {
                //辅助线
                if (i > 0)
                {
                    g.DrawLine(grayPen, margin_left, (height + margin_top - lineHeight * i), (width + margin_left), (height + margin_top - lineHeight * i));
                }

                //指向文字的线
                g.DrawLine(blackPen, (margin_left - 5), (height + margin_top - lineHeight * i), margin_left, (height + margin_top - lineHeight * i));
                //文字
                int text = avgCount * i;

                //if (i == 5)
                //{
                //    if (maxCount - text > 0)
                //    {
                //        text = text + (maxCount - text);
                //    }
                //}

                RectangleF rec = new RectangleF(10, (height + margin_top - lineHeight * i - fontsize / 2), margin_left - 20, 20);
             
                StringFormat format = new StringFormat(StringFormatFlags.DirectionRightToLeft);
                g.DrawString(text.ToString()+"mm", font, blackBrush, rec, format);
                
            }

            //蓝色画笔--柱子的颜色
            Brush blueBrush = new SolidBrush(Color.FromArgb(255, 63, 167, 220));
            Pen bluePen = new Pen(blueBrush, 1);

            int singleWidth = width / barData.Length;

            for (int i = 0; i < barData.Length; i++)
            {
                StringFormat format = new StringFormat();
                format.Alignment = StringAlignment.Center; //居中

                //计算柱子
                int pillarHeight = Convert.ToInt32(barData[i] / Convert.ToDouble(maxCount) * (height - xsubline));

                //这里是画柱子的代码
                Rectangle rectangle = new Rectangle(margin_left + (i * singleWidth + singleWidth / 4), height + margin_top - pillarHeight, singleWidth / 2, pillarHeight);
                g.FillRectangle(blueBrush, rectangle);

                //柱子上的文字
                RectangleF recText = new RectangleF(margin_left + (i * singleWidth)-5, (height + margin_top - pillarHeight - 20), (singleWidth+10), 20);
                if (barData[i]>0)
                {
                    g.DrawString(barData[i].ToString(), font, blackBrush, recText, format);
                }
                

                //x轴下的文字
                //指向线
                //文字
                //singleWidth = width / 5;
                //int pingJun = Convert.ToInt32(Math.Ceiling(bottomData.Length / 5.0));
                if (flag=="XUN")
                {
                    if (i % 2 == 0 || i == bottomData.Length - 1)
                    {
                        g.DrawLine(blackPen, margin_left + (i * singleWidth + singleWidth / 2), (height + margin_top), margin_left + (i * singleWidth + singleWidth / 2), (height + margin_top + 5));

                        RectangleF rec = new RectangleF((margin_left + (i * singleWidth) - 20), (height + margin_top + 15), (singleWidth + 40), (margin_bottom - 20));

                        g.DrawString(bottomData[i].ToString(), font, blackBrush, rec, format);
                    }
                }
                else if (flag == "YUE")
                {
                    int pingJun = Convert.ToInt32(Math.Ceiling(bottomData.Length / 5.0));
                    if (i % pingJun == 0)//|| i == bottomData.Length - 1
                    {
                        g.DrawLine(blackPen, margin_left + (i * singleWidth + singleWidth / 2), (height + margin_top), margin_left + (i * singleWidth + singleWidth / 2), (height + margin_top + 5));

                        RectangleF rec = new RectangleF((margin_left + (i * singleWidth) - 30), (height + margin_top + 15), (singleWidth + 60), (margin_bottom - 20));

                        g.DrawString(bottomData[i].ToString(), font, blackBrush, rec, format);
                    }
                }
                
               
                
            }
            string relativePath = "yuLiang"+DateTime.Now.ToString("yyyyMMddHHmmss") + ".jpg";
            // string relativePath = "zheXianTu" + ".jpg";

            string path = imgdir + "/SurImage/Download/" + relativePath;
            //将图片保存到指定的流中,适用于直接以流的方式输出图片
            


            image.Save(path, System.Drawing.Imaging.ImageFormat.Jpeg);

            return relativePath;//"lingShi.jpg";
        }

        /// <summary>
        ///施工记录表
        /// </summary>
        /// <param name="id">监测点id</param>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [System.Web.Http.HttpGet]
        public string GetShiGongJiLuBiao(string id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);
            logger.Info("【" + pgsqlConnection + "】pgsqlConnection");

            int year = Convert.ToInt32(DateTime.Now.ToString("yyyy"));
            int month = Convert.ToInt32(DateTime.Now.ToString("MM"));
            int day = Convert.ToInt32(DateTime.Now.ToString("dd"));
            //获取当前项目信息   
            //获取当前项目信息   
            MonitorProjectString projectString = ParseMonitorHelper.ParseMonitorProjectString(
                PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM monitor_project WHERE id={0} AND ztm={1} AND bsm{2}", id, (int)MODEL.Enum.State.InUse, userbsms)));

            //项目id
            MonitorController monitorController = new MonitorController();
            string devs = monitorController.GetMonitor(Convert.ToInt32(id), cookie);

            List<MonitorInfo> monitorInfo = COM.JsonHelper.StringToObject<List<MonitorInfo>>(devs);//"GNSS监测站
            List<string> docName = new List<string>();
            for (int j = 0; j < monitorInfo.Count; j++)
            {
                MonitorString monitorString = monitorInfo[j].MonitorString;
                string templatePath = imgdir + "/SurImage/baoGao/anzhuang.docx";
                string sql = "SELECT * FROM const_photo_info WHERE monitor_id ={0} and flag_report='1' ORDER BY type ";
                string datas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(sql, SQLHelper.UpdateString(monitorString.Id+"")));
                List<ConstPhotoInfo> constPhotoInfoList = new List<ConstPhotoInfo>();//相片集合
                ConstPhotoInfo constPhotoIn = new ConstPhotoInfo();//发送报告的信息
                if (!string.IsNullOrEmpty(datas))
                {
                    string[] rows = datas.Split(new char[] { COM.ConstHelper.rowSplit });
                    for (int i = 0; i < rows.Length; i++)
                    {
                        ConstPhotoInfo constPhotoInfo = ParseMonitorHelper.ParseConstPhotoInfo(rows[i]);       //ParseMapProjectWarningInfo(rows[i]);
                        if (constPhotoInfo != null)
                        {
                            constPhotoInfoList.Add(constPhotoInfo);
                            if (constPhotoInfo.type=="1")
                            {
                                constPhotoIn = constPhotoInfo;
                            }
                        }
                    }
                };
                //查询设备信息
                string sqldevice = "select a.* from monitor_device a,monitor_map_monitor_device b where a.id=b.deviceid and b.monitorid={0}";
                string deviceDatas = PostgresqlHelper.QueryData(pgsqlConnection, string.Format(sqldevice, SQLHelper.UpdateString(monitorString.Id + "")));
                //ParseMonitorHelper.ParseDevice
                Device device = ParseMonitorHelper.ParseDevice(deviceDatas);
                //场家名称
                string factoryName = "";
                if (device!=null)
                {
                    if (device.CJID!=null)
                    {
                        factoryName = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("select cjmc from monitor_devicefactory where id={0}", SQLHelper.UpdateString(device.CJID + "")));
                    }
                }
                //NB-IoT/

                WordMLHelper wordMLHelper = new WordMLHelper();
                List<TagInfo> tagInfos = wordMLHelper.GetAllTagInfo(File.OpenRead(templatePath));//打开模板文件,获取所有填充域

                for (int i = 0; i < tagInfos.Count; i++)
                {
                    //填充域有两种类型,1:段落或图片,2:表格
                    //对填充域填充时需先判断填充域类型
                    if (tagInfos[i].Tbl == null)
                    {
                        if (string.Equals(tagInfos[i].TagTips.Trim(), "[编号粗]"))
                        {
                            TxtInfo txtInfo = new TxtInfo();
                            txtInfo.Content = monitorString.JCDBH;
                            txtInfo.Size = 32;
                            txtInfo.Bold = "true";
                            txtInfo.FontFamily = "仿宋";
                            tagInfos[i].AddContent(txtInfo);
                            continue;
                        }
                        if (string.Equals(tagInfos[i].TagTips.Trim(), "[监测方法]"))
                        {
                            TxtInfo txtInfo = new TxtInfo();
                            txtInfo.Content = monitorString.JCFF;
                            txtInfo.Size = 32;
                            txtInfo.Bold = "true";
                            txtInfo.FontFamily = "仿宋";
                            tagInfos[i].AddContent(txtInfo);
                            continue;
                        }
                        if (string.Equals(tagInfos[i].TagTips.Trim(), "[项目名称]"))
                        {
                            TxtInfo txtInfo = new TxtInfo();
                            txtInfo.Content = projectString.XMMC;
                            txtInfo.Size = 23;
                            txtInfo.FontFamily = "仿宋";
                            tagInfos[i].AddContent(txtInfo);
                            continue;
                        }

                    }
                    else
                    {

                        logger.Info("【" + tagInfos[i].Tbl.TblType + "】pgsqlConnection");
                        // HORIZONTAL_HEADER
                        //HORIZONTAL_VERTICAL_HEADER
                        TableStructureInfo tblInfo1 = tagInfos[i].Tbl;
                        List<RowStructureInfo> xyz1 = tblInfo1.Rows;
                        for (int x = 0; x < xyz1.Count; x++)
                        {
                            RowStructureInfo row1 = xyz1[x];
                            List<CellStructureInfo> mhn1 = row1.Cells;
                            for (int y = 0; y < mhn1.Count; y++)
                            {
                                CellStructureInfo zzz = mhn1[y];
                                logger.Info("【" + zzz.Tips + "】heiheieiehehiei");

                                if (zzz.Tips == "编号")
                                {
                                    TxtInfo txtInfo = new TxtInfo();
                                    txtInfo.Size = 23;
                                    txtInfo.Content = monitorString.JCDBH;
                                    txtInfo.FontFamily = "仿宋";
                                    zzz.AddContent(txtInfo);
                                    continue;
                                }
                                if (zzz.Tips == "x")
                                {
                                    TxtInfo txtInfo = new TxtInfo();
                                    txtInfo.Size = 23;
                                    txtInfo.Content = monitorString.PMWZX;
                                    txtInfo.FontFamily = "仿宋";
                                    zzz.AddContent(txtInfo);
                                    continue;
                                }
                                if (zzz.Tips == "y")
                                {
                                    TxtInfo txtInfo = new TxtInfo();
                                    txtInfo.Size = 23;
                                    txtInfo.Content = monitorString.PMWZY;
                                    txtInfo.FontFamily = "仿宋";
                                    zzz.AddContent(txtInfo);
                                    continue;
                                }
                                if (zzz.Tips == "h")
                                {
                                    TxtInfo txtInfo = new TxtInfo();
                                    txtInfo.Size = 23;
                                    txtInfo.Content = monitorString.GC;
                                    txtInfo.FontFamily = "仿宋";
                                    zzz.AddContent(txtInfo);
                                    continue;
                                }
                                if (zzz.Tips == "YQXH")//仪器型号
                                {
                                    
                                    TxtInfo txtInfo = new TxtInfo();
                                    txtInfo.Size = 23;
                                    if (device.SBXH != "")
                                    {
                                        txtInfo.Content = device.SBXH;
                                    }
                                    else
                                    {
                                        txtInfo.Content = "";
                                    }
                                    txtInfo.FontFamily = "仿宋";
                                    zzz.AddContent(txtInfo);
                                    continue;
                                }
                                if (zzz.Tips == "YQBH")//仪器编号
                                {

                                    TxtInfo txtInfo = new TxtInfo();
                                    txtInfo.Size = 23;
                                    if (device.sn != "")
                                    {
                                        txtInfo.Content = device.SBXH;
                                    }
                                    else
                                    {
                                        txtInfo.Content = "";
                                    }
                                    txtInfo.FontFamily = "仿宋";
                                    zzz.AddContent(txtInfo);
                                    continue;
                                }
                                if (zzz.Tips == "SIM")//电话号码
                                {

                                    TxtInfo txtInfo = new TxtInfo();
                                    txtInfo.Size = 23;
                                    if (device.sim != "")
                                    {
                                        txtInfo.Content = "NB-IoT/"+device.sim;
                                    }
                                    else
                                    {
                                        txtInfo.Content = "NB-IoT/";
                                    }
                                    txtInfo.FontFamily = "仿宋";
                                    zzz.AddContent(txtInfo);
                                    continue;
                                }
                                if (zzz.Tips == "SCCJ")//生产厂家
                                {

                                    TxtInfo txtInfo = new TxtInfo();
                                    txtInfo.Size = 23;
                                    if (factoryName != "")
                                    {
                                        txtInfo.Content = factoryName;
                                    }
                                    else
                                    {
                                        txtInfo.Content = "";
                                    }
                                    txtInfo.FontFamily = "仿宋";
                                    zzz.AddContent(txtInfo);
                                    continue;
                                }
                                //

                                if (zzz.Tips == "AZRY")//安装人员
                                {

                                    TxtInfo txtInfo = new TxtInfo();
                                    txtInfo.Size = 23;
                                    if (constPhotoIn!=null&& constPhotoIn.Installer != "")
                                    {
                                        txtInfo.Content = constPhotoIn.Installer;
                                    }
                                    else
                                    {
                                        txtInfo.Content = "";
                                    }
                                    txtInfo.FontFamily = "仿宋";
                                    zzz.AddContent(txtInfo);
                                    continue;
                                }

                                if (zzz.Tips == "AZRY")//安装人员
                                {

                                    TxtInfo txtInfo = new TxtInfo();
                                    txtInfo.Size = 23;
                                    if (constPhotoIn != null && constPhotoIn.Installer != "")
                                    {
                                        txtInfo.Content = constPhotoIn.Installer;
                                    }
                                    else
                                    {
                                        txtInfo.Content = "";
                                    }
                                    txtInfo.FontFamily = "仿宋";
                                    zzz.AddContent(txtInfo);
                                    continue;
                                }

                                if (zzz.Tips == "AZRQ")//安装时间
                                {

                                    TxtInfo txtInfo = new TxtInfo();
                                    txtInfo.Size = 23;
                                    if (constPhotoIn != null && constPhotoIn.InstallTime != "")
                                    {
                                        txtInfo.Content = constPhotoIn.InstallTime;
                                    }
                                    else
                                    {
                                        txtInfo.Content = "";
                                    }
                                    txtInfo.FontFamily = "仿宋";
                                    zzz.AddContent(txtInfo);
                                    continue;
                                }

                                if (zzz.Tips == "TBR")//调表人
                                {

                                    TxtInfo txtInfo = new TxtInfo();
                                    txtInfo.Size = 23;
                                    if (constPhotoIn != null && constPhotoIn.preparer != "")
                                    {
                                        txtInfo.Content = constPhotoIn.preparer;
                                    }
                                    else
                                    {
                                        txtInfo.Content = "";
                                    }
                                    txtInfo.FontFamily = "仿宋";
                                    zzz.AddContent(txtInfo);
                                    continue;
                                }

                                if (zzz.Tips == "TBRQ")//调表riqi
                                {

                                    TxtInfo txtInfo = new TxtInfo();
                                    txtInfo.Size = 23;
                                    if (constPhotoIn != null && constPhotoIn.preparlTime != "")
                                    {
                                        txtInfo.Content = constPhotoIn.preparlTime;
                                    }
                                    else
                                    {
                                        txtInfo.Content = "";
                                    }
                                    txtInfo.FontFamily = "仿宋";
                                    zzz.AddContent(txtInfo);
                                    continue;
                                }
                                if (zzz.Tips == "1" && constPhotoInfoList.Count > 1)
                                {

                                    ImgInfo imgInfo = new ImgInfo();
                                    imgInfo.ImgPath = imgdir + constPhotoInfoList[0].photoUrl;
                                    imgInfo.Width = 120;
                                    imgInfo.Height = 120;
                                    zzz.AddContent(imgInfo);
                                }
                                if (zzz.Tips == "2" && constPhotoInfoList.Count > 2)
                                {

                                    ImgInfo imgInfo = new ImgInfo();
                                    imgInfo.ImgPath = imgdir + constPhotoInfoList[1].photoUrl;
                                    imgInfo.Width = 120;
                                    imgInfo.Height = 120;
                                    zzz.AddContent(imgInfo);
                                }
                                if (zzz.Tips == "3" && constPhotoInfoList.Count > 3)
                                {

                                    ImgInfo imgInfo = new ImgInfo();
                                    imgInfo.ImgPath = imgdir + constPhotoInfoList[2].photoUrl;
                                    imgInfo.Width = 120;
                                    imgInfo.Height = 120;
                                    zzz.AddContent(imgInfo);
                                }
                                if (zzz.Tips == "4" && constPhotoInfoList.Count > 4)
                                {

                                    ImgInfo imgInfo = new ImgInfo();
                                    imgInfo.ImgPath = imgdir + constPhotoInfoList[3].photoUrl;
                                    imgInfo.Width = 120;
                                    imgInfo.Height = 120;
                                    zzz.AddContent(imgInfo);
                                }
                                if (zzz.Tips == "5" && constPhotoInfoList.Count > 5)
                                {

                                    ImgInfo imgInfo = new ImgInfo();
                                    imgInfo.ImgPath = imgdir + constPhotoInfoList[4].photoUrl;
                                    imgInfo.Width = 120;
                                    imgInfo.Height = 120;
                                    zzz.AddContent(imgInfo);
                                }
                                if (zzz.Tips == "6" && constPhotoInfoList.Count > 6)
                                {

                                    ImgInfo imgInfo = new ImgInfo();
                                    imgInfo.ImgPath = imgdir + constPhotoInfoList[5].photoUrl;
                                    imgInfo.Width = 120;
                                    imgInfo.Height = 120;
                                    zzz.AddContent(imgInfo);
                                }
                                if (zzz.Tips == "7" && constPhotoInfoList.Count > 7)
                                {

                                    ImgInfo imgInfo = new ImgInfo();
                                    imgInfo.ImgPath = imgdir + constPhotoInfoList[6].photoUrl;
                                    imgInfo.Width = 120;
                                    imgInfo.Height = 120;
                                    zzz.AddContent(imgInfo);
                                }
                                if (zzz.Tips == "8" && constPhotoInfoList.Count > 8)
                                {

                                    ImgInfo imgInfo = new ImgInfo();
                                    imgInfo.ImgPath = imgdir + constPhotoInfoList[7].photoUrl;
                                    imgInfo.Width = 120;
                                    imgInfo.Height = 120;
                                    zzz.AddContent(imgInfo);

                                }
                            }

                        }
                     
                    }
                }
                

                string outputPath = monitorString.JCDMC+".docx";
                if (!string.IsNullOrEmpty(outputPath))
                {

                    string templateOutPath = imgdir + "/SurImage/Download/" + outputPath;
                    docName.Add(templateOutPath);
                    wordMLHelper.GenerateWordDocument(File.OpenRead(templatePath)
                        , templateOutPath
                        , tagInfos);

                    Assistance.RemoveAllTmpFile();// 删除所有临时文件
                }
            }
            Document doc = new Document(docName[0]);
            for (int i=1;i< docName.Count;i++)
            {
                doc.InsertTextFromFile(docName[i], FileFormat.Docx2013);
            }
            
            //保存文档
            doc.SaveToFile(imgdir + "/SurImage/Download/"  + projectString.XMMC+"施工安装记录表.docx", FileFormat.Docx2013);


            return projectString.XMMC + "施工安装记录表.docx";
          

        }
    }
}
