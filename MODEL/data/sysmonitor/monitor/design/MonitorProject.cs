using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 监测项目
    /// </summary>
    public class MonitorProject
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 项目名称
        /// </summary>
        public string XMMC { get; set; }
        /// <summary>
        /// 项目编码
        /// </summary>
        public string XMBM { get; set; }
        /// <summary>
        /// 中心经度
        /// </summary>
        public double? ZXJD { get; set; }
        /// <summary>
        /// 中心纬度
        /// </summary>
        public double? ZXWD { get; set; }
        /// <summary>
        /// SRID
        /// </summary>
        public int? SRID { get; set; }
        /// <summary>
        /// 行政区编码
        /// </summary>
        public string XZQBM { get; set; }
        /// <summary>
        /// 行政区位置
        /// </summary>
        public string XMWZ { get; set; }
        /// <summary>
        /// 项目开始时间
        /// </summary>
        public string XMKSSJ { get; set; }
        /// <summary>
        /// 项目结束时间
        /// </summary>
        public string XMJSSJ { get; set; }
        /// <summary>
        /// 项目类型
        /// </summary>
        public int? XMLX { get; set; }
        /// <summary>
        /// 项目类别
        /// </summary>
        public int? XMLB { get; set; }
        /// <summary>
        /// 灾害类型
        /// </summary>
        public int ZHLX { get; set; }
        /// <summary>
        /// 灾害点名称
        /// </summary>
        public string ZHDMC { get; set; }
        /// <summary>
        /// 灾害点统一编号
        /// </summary>
        public string ZHDTYBH { get; set; }
        /// <summary>
        /// 灾害等级
        /// </summary>
        public int? ZHDJ { get; set; }
        /// <summary>
        /// 灾害险情
        /// </summary>
        public int? ZHXQ { get; set; }
        /// <summary>
        /// 监测级别
        /// </summary>
        public int? JCJB { get; set; }
        /// <summary>
        /// 监测手段
        /// </summary>
        public int? JCSD { get; set; }
        /// <summary>
        /// 预警级别
        /// </summary>
        public int? YJJB { get; set; }
        /// <summary>
        /// 是否库区
        /// </summary>
        public bool? SFKQ { get; set; }
        /// <summary>
        /// 是否涉水
        /// </summary>
        public bool? SFSS { get; set; }
        /// <summary>
        /// 面积
        /// </summary>
        public double? MJ { get; set; }
        /// <summary>
        /// 面积单位
        /// </summary>
        public int? MJDW { get; set; }
        /// <summary>
        /// 体积
        /// </summary>
        public double? TJ { get; set; }
        /// <summary>
        /// 体积单位
        /// </summary>
        public int? TJDW { get; set; }
        /// <summary>
        /// 威胁户数
        /// </summary>
        public int? WXHS { get; set; }
        /// <summary>
        /// 威胁人数
        /// </summary>
        public int? WXRS { get; set; }
        /// <summary>
        /// 威胁房屋面积
        /// </summary>
        public double? WXFWMJ { get; set; }
        /// <summary>
        /// 其他威胁
        /// </summary>
        public string QTWX { get; set; }
        /// <summary>
        /// 是否结束
        /// </summary>
        public bool? SFJS { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
        /// <summary>
        /// 标识码
        /// </summary>
        public string BSM { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string BZ { get; set; }
        /// <summary>
        /// 项目简称
        /// </summary>
        public string XMJC { get; set; }
    }
}
