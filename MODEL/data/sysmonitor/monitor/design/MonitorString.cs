using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 监测点文本
    /// </summary>
    public class MonitorString
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 监测点名称
        /// </summary>
        public string JCDMC { get; set; }
        /// <summary>
        /// 监测点编号
        /// </summary>
        public string JCDBH { get; set; }
        /// <summary>
        /// 监测方法
        /// </summary>
        public string JCFF { get; set; }
        /// <summary>
        /// 监测点类型
        /// </summary>
        public string JCZLX { get; set; }
        /// <summary>
        /// 平面x坐标
        /// </summary>
        public string PMWZX { get; set; }
        /// <summary>
        /// 平面y坐标
        /// </summary>
        public string PMWZY { get; set; }
        /// <summary>
        /// 高程
        /// </summary>
        public string GC { get; set; }
        /// <summary>
        /// 深度
        /// </summary>
        public string SD { get; set; }
        /// <summary>
        /// 孔深
        /// </summary>
        public string KS { get; set; }
        /// <summary>
        /// 空间参考
        /// </summary>
        public string KJCK { get; set; }
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
