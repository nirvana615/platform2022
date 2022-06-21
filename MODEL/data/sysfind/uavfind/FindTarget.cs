using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 巡查目标
    /// </summary>
    public class FindTarget
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 目标名称
        /// </summary>
        public string MBMC { get; set; }     
        /// <summary>
        /// 目标编号
        /// </summary>
        public string MBBH { get; set; }
        /// <summary>
        /// 目标类型
        /// </summary>
        public int MBLX { get; set; }
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
