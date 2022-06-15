using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class UavDrone
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 无人机名称
        /// </summary>
        public string WRJMC { get; set; }
        /// <summary>
        /// 无人机简称
        /// </summary>
        public string WRJJC { get; set; }
        /// <summary>
        /// 最大起飞海拔高度
        /// </summary>
        public int? ZDQFHBGD { get; set; }
        /// <summary>
        /// 最大地面之上高度
        /// </summary>
        public int? ZDDMZSGD { get; set; }
        /// <summary>
        /// 最大地面之下高度
        /// </summary>
        public int? ZDDMZXGD { get; set; }
        /// <summary>
        /// 最大航路点水平间距
        /// </summary>
        public double? ZDHLDSPJJ { get; set; }
        /// <summary>
        /// 最小航路点水平间距
        /// </summary>
        public double? ZXHLDSPJJ { get; set; }
        /// <summary>
        /// 最大上升速度
        /// </summary>
        public double? ZDSSSD { get; set; }
        /// <summary>
        /// 最大下降速度
        /// </summary>
        public double? ZDXJSD { get; set; }
        /// <summary>
        /// 最大水平飞行速度
        /// </summary>
        public double? ZDSPFXSD { get; set; }
        /// <summary>
        /// 最大航路点数量
        /// </summary>
        public int? ZDHLDSL { get; set; }
        /// <summary>
        /// 最大飞行时间
        /// </summary>
        public int? ZDFXSJ { get; set; }
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
