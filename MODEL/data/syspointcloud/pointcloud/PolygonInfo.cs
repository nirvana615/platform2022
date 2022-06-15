using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class PolygonInfo
    {
        /// <summary>
        /// id
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// id
        /// </summary>
        public int relateid { get; set; }
        /// <summary>
        /// 类型
        /// </summary>
        public int type { get; set; }
        /// <summary>
        /// 点数据，用|分割
        /// </summary>
        public string points { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }

        /// <summary>
        /// 项目id
        /// </summary>
        public int projectId { get; set; }

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
        /// 最高点
        /// </summary>
        public string height { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string bz { get; set; }
        /// <summary>
        /// 状态码
        /// </summary>
        public int ztm { get; set; }
    }
}
