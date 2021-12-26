using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 拍摄目标点信息
    /// </summary>
    public class Target
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
        /// 空间直角坐标X
        /// </summary>
        public double X { get; set; }
        /// <summary>
        /// 空间直角坐标Y
        /// </summary>
        public double Y { get; set; }
        /// <summary>
        /// 空间直角坐标Z
        /// </summary>
        public double Z { get; set; }
        /// 空间参考
        /// </summary>
        public int? SRID { get; set; }      
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
