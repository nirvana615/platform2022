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
    public class RockProject
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 项目名称
        /// </summary>
        public string XMMC { get; set; }
        /// <summary>
        /// 项目编码
        /// </summary>
        public string XMBM { get; set; }
        /// <summary>
        /// 中心经度
        /// </summary>
        public double? ZXJD { get; set; }
        /// <summary>
        /// 中心纬度
        /// </summary>
        public double? ZXWD { get; set; }
        /// <summary>
        /// 行政区编码
        /// </summary>
        public string XZQBM { get; set; }
        /// <summary>
        /// 行政区位置
        /// </summary>
        public string XMWZ { get; set; }
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

        /// <summary>
        /// 模型Id
        /// </summary>
        public string modelId { get; set; }
        /// <summary>
        /// 负责人
        /// </summary>
        public string FZR { get; set; }
        /// <summary>
        /// 项目开始时间
        /// </summary>
        public string XMKSSJ { get; set; }

        /// <summary>
        /// 面积
        /// </summary>
        public string mianJi { get; set; }
        /// <summary>
        /// 纵长
        /// </summary>
        public string zhongChang { get; set; }
        /// <summary>
        /// 体积
        /// </summary>
        public string tiJi { get; set; }
        /// <summary>
        /// 坡向
        /// </summary>
        public string puoXiang { get; set; }

    }
      
}
