using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 点云
    /// </summary>
    public class SurPointCloud
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 点云名称
        /// </summary>
        public string DYMC { get; set; }
        /// <summary>
        /// 点云路径
        /// </summary>
        public string DYLJ { get; set; }
        /// <summary>
        /// 点云格式
        /// </summary>
        public int DYGS { get; set; }
        /// <summary>
        /// 点云级别
        /// </summary>
        public int? DYJB { get; set; }
        /// <summary>
        /// 数据时间
        /// </summary>
        public String SJSJ { get; set; }
        /// <summary>
        /// 分辨率
        /// </summary>
        public double? FBL { get; set; }
        /// <summary>
        /// 区块范围
        /// </summary>
        public string QKFW { get; set; }
        /// <summary>
        /// SRID
        /// </summary>
        public int? SRID { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string BZ { get; set; }
    }
}
