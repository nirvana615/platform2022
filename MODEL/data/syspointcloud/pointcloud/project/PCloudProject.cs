using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 项目基本信息
    /// </summary>
    public class PCloudProject
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
        /// 项目分区列表
        /// </summary>
        public List<Region> RegionList { get; set; }
        /// <summary>
        /// 三维实景模型
        /// </summary>
        public SurModels surModels { get; set; }
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
        /// 项目空间位置json，cesiunjsd点
        /// </summary>
        public string XMKJWZ { get; set; }
        /// <summary>
        /// 项目空间位置点样式json，cesiunjsd点样式
        /// </summary>
        public string XMKJWZYS { get; set; }
        /// <summary>
        /// 行政区编码
        /// </summary>
        public string XZQBM { get; set; }
        /// <summary>
        /// 项目位置
        /// </summary>
        public string XMWZ { get; set; }

        /// <summary>
        /// 项目类型
        /// </summary>
        public int? XMLX { get; set; }
        /// <summary>
        /// 项目类别
        /// </summary>
        public int? XMLB { get; set; }
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
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
        /// <summary>
        /// 标识码
        /// </summary>
        public string BSM { get; set; }
        /// <summary>
        /// 状态码
        /// </summary>
        public int ZTM { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string BZ { get; set; }
    }
}
