using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 任务信息
    /// </summary>
    public class ModelTask
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 任务名称
        /// </summary>
        public string RWMC { get; set; }
        /// <summary>
        /// 任务编码
        /// </summary>
        public string RWBM { get; set; }
        /// <summary>
        /// 任务创建时间        
        /// </summary>
        public string RWCJSJ { get; set; }
        /// <summary>
        /// 影像采集人员
        /// </summary>
        public string YXCJRY { get; set; }
        /// <summary>
        /// 影像采集设备
        /// </summary>
        public int? YXCJSB { get; set; }
        /// <summary>
        /// 影像采集时间
        /// </summary>
        public string YXCJSJ { get; set; }
        /// <summary>
        /// 影像数量
        /// </summary>
        public int? YXSL { get; set; }
        /// <summary>
        /// 控制点
        /// </summary>
        public string YXKZD { get; set; }
        /// <summary>
        /// 范围KML
        /// </summary>
        public string YXFW { get; set; }
        /// <summary>
        /// 百度云影像存放链接
        /// </summary>
        public string YXCFLJ { get; set; }
        /// <summary>
        /// 空间参考
        /// </summary>
        public int? SRID { get; set; }
        /// <summary>
        /// 所需成果
        /// </summary>
        public string SXCG { get; set; }
        /// <summary>
        /// 任务描述
        /// </summary>
        public string RWMS { get; set; }
        /// <summary>
        /// 成果下载链接
        /// </summary>
        public string CGXZLJ { get; set; }
        /// <summary>
        /// 模型描述
        /// </summary>
        public string MXMS { get; set; }
        /// <summary>
        /// 模型路径
        /// </summary>
        public string MXLJ { get; set; }

        /// <summary>
        /// 标识码
        /// </summary>
        public string BSM { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string BZ { get; set; }
        /// <summary>
        /// 模型视角
        /// </summary>
        public string MXSJ{ get; set; }
    }
}
