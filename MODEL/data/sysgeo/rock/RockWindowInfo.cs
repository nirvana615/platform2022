using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 侧窗
    /// </summary>
    public class RockWindowInfo
    {
        /// <summary>
        /// id
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 侧窗名称
        /// </summary>
        public string name { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string creatTime { get; set; }

        /// <summary>
        /// 项目id
        /// </summary>
        public int projectId { get; set; }
        /// <summary>
        /// 点数据，用|分割
        /// </summary>
        public string points { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        public string remarks { get; set; }
        /// <summary>
        /// 边长
        /// </summary>
        public string sideLength { get; set; }
        /// <summary>
        /// 另一条边长
        /// </summary>
        public string sidebLength { get; set; }
        /// <summary>
        /// 自定义坐标x
        /// </summary>
        public string axisx { get; set; }
        /// <summary>
        /// 自定义坐标
        /// </summary>
        public string axisy { get; set; }
        /// <summary>
        /// 法向量
        /// </summary>
        public string normal { get; set; }
        /// <summary>
        /// 原点
        /// </summary>
        public string origin { get; set; }
        /// <summary>
        /// 平面坐标
        /// </summary>
        public string vertices2d { get; set; }
        /// <summary>
        /// 空间直角坐标
        /// </summary>
        public string vertices3d { get; set; }
        /// <summary>
        /// 3dlbh
        /// </summary>
        public string vertices3dlbh { get; set; }
        /// <summary>
        /// 倾向
        /// </summary>
        public string level { get; set; }
        /// <summary>
        /// 倾角
        /// </summary>
        public string vertical { get; set; }
        /// <summary>
        /// 测窗最高点
        /// </summary>
        public string height { get; set; }
        

    }
}
