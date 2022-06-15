using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 消落带项目基本信息
    /// </summary>
    public class FlzData
    {
        /// <summary>
        /// id
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 点名称
        /// </summary>
        public string name { get; set; }
        /// <summary>
        /// 点类型
        /// </summary>
        public string type { get; set; }

        /// <summary>
        /// 项目id
        /// </summary>
        public int projectId { get; set; }
        /// <summary>
        /// 点数据，用|分割
        /// </summary>
        public string postion { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        public string remarks { get; set; }
        /// <summary>
        /// 图片路径
        /// </summary>
        public string src { get; set; }


        /// <summary>
        /// 倾向
        /// </summary>
        public string inclination { get; set; }

        /// <summary>
        /// 倾角
        /// </summary>
        public string dipAngle { get; set; }
        /// <summary>
        /// 走向
        /// </summary>
        public string trend { get; set; }
        /// <summary>
        /// 迹长
        /// </summary>
        public string traceLength { get; set; }
        /// <summary>
        /// 平均张开度
        /// </summary>
        public string avgOpening { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string creatTime { get; set; }
        /// <summary>
        /// 模型时间
        /// </summary>
        public string modleTime { get; set; }
        /// <summary>
        /// 侧窗id
        /// </summary>
        public string windowId { get; set; }
        /// <summary>
        /// 面积
        /// </summary>
        public string measure { get; set; }
        /// <summary>
        /// 模型id
        /// </summary>
        public string modleId { get; set; }
        /// <summary>
        /// 采集人
        /// </summary>
        public string collector { get; set; }
        

    }
}
