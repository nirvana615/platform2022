using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class UavWaypoint
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
        /// 经度
        /// </summary>
        public double JD { get; set; }
        /// <summary>
        /// 纬度
        /// </summary>
        public double WD { get; set; }
        /// <summary>
        /// 高程
        /// </summary>
        public double GC { get; set; }
        /// <summary>
        /// 位置（XYZ JSON）
        /// </summary>
        public string WZ { get; set; }
        /// <summary>
        /// 高度
        /// </summary>
        public double? GD { get; set; }
        /// <summary>
        /// 速度
        /// </summary>
        public double SD { get; set; }
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
