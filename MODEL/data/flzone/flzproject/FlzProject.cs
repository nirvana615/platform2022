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
    public class FlzProject
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
        /// <summary>
        /// 后缘高程
        /// </summary>
        public string hygc { get; set; }
        /// <summary>
        /// 估算厚度
        /// </summary>
        public string gshd { get; set; }
        /// <summary>
        /// 地层岩性
        /// </summary>
        public string dcyx { get; set; }
        /// <summary>
        /// 岩体结构
        /// </summary>
        public string ytjg { get; set; }
        /// <summary>
        /// 岩层产状
        /// </summary>
        public string yccz { get; set; }
        /// <summary>
        /// 岸坡结构
        /// </summary>
        public string apjg { get; set; }
        /// <summary>
        /// 切割裂隙
        /// </summary>
        public string qglx { get; set; }
        /// <summary>
        /// 地貌边界
        /// </summary>
        public string dmbj { get; set; }
        /// <summary>
        /// 变形迹象
        /// </summary>
        public string bxjx { get; set; }
        /// <summary>
        ///岩体裂化
        /// </summary>
        public string ytlh { get; set; }
        /// <summary>
        /// 植被覆盖
        /// </summary>
        public string zbfg { get; set; }

        /// <summary>
        /// 地层岩性
        /// </summary>
        public string dcyxScore { get; set; }
        /// <summary>
        /// 岩体结构
        /// </summary>
        public string ytjgScore { get; set; }
        /// <summary>
        /// 岩层产状
        /// </summary>
        public string ycczScore { get; set; }
        /// <summary>
        /// 岸坡结构
        /// </summary>
        public string apjgScore { get; set; }
        /// <summary>
        /// 切割裂隙
        /// </summary>
        public string qglxScore { get; set; }
        /// <summary>
        /// 地貌边界
        /// </summary>
        public string dmbjScore { get; set; }
        /// <summary>
        /// 变形迹象
        /// </summary>
        public string bxjxScore { get; set; }
        /// <summary>
        ///岩体裂化
        /// </summary>
        public string ytlhScore { get; set; }
        /// <summary>
        /// 植被覆盖
        /// </summary>
        public string zbfgScore { get; set; }

        /// <summary>
        /// 地层岩性
        /// </summary>
        public string dcyxWeight { get; set; }
        /// <summary>
        /// 岩体结构
        /// </summary>
        public string ytjgWeight { get; set; }
        /// <summary>
        /// 岩层产状
        /// </summary>
        public string ycczWeight { get; set; }
        /// <summary>
        /// 岸坡结构
        /// </summary>
        public string apjgWeight { get; set; }
        /// <summary>
        /// 切割裂隙
        /// </summary>
        public string qglxWeight { get; set; }
        /// <summary>
        /// 地貌边界
        /// </summary>
        public string dmbjWeight { get; set; }
        /// <summary>
        /// 变形迹象
        /// </summary>
        public string bxjxWeight { get; set; }
        /// <summary>
        ///岩体裂化
        /// </summary>
        public string ytlhWeight { get; set; }
        /// <summary>
        /// 植被覆盖
        /// </summary>
        public string zbfgWeight { get; set; }

        /// <summary>
        ///fanwei 
        /// </summary>
        public string flzRange { get; set; }
        /// <summary>
        /// 总得分
        /// </summary>
        public string projectScore { get; set; }
    }
}
