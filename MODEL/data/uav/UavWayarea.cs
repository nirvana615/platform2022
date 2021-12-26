using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class UavWayarea
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string MC { get; set; }
        /// <summary>
        /// 顺序
        /// </summary>
        public int SX { get; set; }
        /// <summary>
        /// 类型
        /// </summary>
        public int LX { get; set; }
        /// <summary>
        /// 位置（XYZs JSON）
        /// </summary>
        public string WZ { get; set; }
        /// <summary>
        /// 地面分辨率（cm）
        /// </summary>
        public double GSD { get; set; }
        /// <summary>
        /// 航向重叠率（%）
        /// </summary>
        public double FO { get; set; }
        /// <summary>
        /// 旁向重叠率（%）
        /// </summary>
        public double SO { get; set; }
        /// <summary>
        /// 首末航线多角度
        /// </summary>
        public bool MA { get; set; }
        /// <summary>
        /// 网格井字形
        /// </summary>
        public bool DG { get; set; }
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
    }
}
