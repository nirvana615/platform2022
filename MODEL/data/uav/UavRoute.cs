using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 无人机航线
    /// </summary>
    public class UavRoute
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 航线名称
        /// </summary>
        public string HXMC { get; set; }
        /// <summary>
        /// 航线类型
        /// </summary>
        public int HXLX { get; set; }
        /// <summary>
        /// 高程类型
        /// </summary>
        public int GCLX { get; set; }
        /// <summary>
        /// 航线速度
        /// </summary>
        public double HXSD { get; set; }
        /// <summary>
        /// 航线长度
        /// </summary>
        public double HXCD { get; set; }
        /// <summary>
        /// 飞行时间
        /// </summary>
        public double FXSJ { get; set; }
        /// <summary>
        /// 航点数量
        /// </summary>
        public int HDSL { get; set; }
        /// <summary>
        /// 拍照数量
        /// </summary>
        public int PZSL { get; set; }
        /// <summary>
        /// 图形
        /// </summary>
        public string LINE { get; set; }
        /// <summary>
        /// 第三方任务
        /// </summary>
        public string MIS { get; set; }
        /// <summary>
        /// DJI Pilot KML
        /// </summary>
        public string PILOT { get; set; }
        /// <summary>
        /// DJI Terra KML
        /// </summary>
        public string TERRA { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
        /// <summary>
        /// 更新时间
        /// </summary>
        public string GXSJ { get; set; }
        /// <summary>
        /// 执行时间
        /// </summary>
        public string ZXSJ { get; set; }
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
