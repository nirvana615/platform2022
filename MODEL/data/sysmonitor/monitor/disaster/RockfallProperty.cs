using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 崩塌（危岩体）属性
    /// </summary>
    public class RockfallProperty
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 运动形式
        /// </summary>
        public int? YDXS { get; set; }
        /// <summary>
        /// 崩塌类型
        /// </summary>
        public int? BTLX { get; set; }
        /// <summary>
        /// 控制结构面类型
        /// </summary>
        public int? KZJGMLX { get; set; }
        /// <summary>
        /// 其他控制结构面类型
        /// </summary>
        public string QTKZJGMLX { get; set; }
        /// <summary>
        /// 宏观稳定性评价
        /// </summary>
        public int? HGWDXPJ { get; set; }
        /// <summary>
        /// 活动状态
        /// </summary>
        public int? HDZT { get; set; }
        /// <summary>
        /// 崩塌源扩展方式
        /// </summary>
        public int? BTYKZFS { get; set; }
        /// <summary>
        /// 崩塌时间
        /// </summary>
        public string BTSJ { get; set; }
        /// <summary>
        /// 主崩方向
        /// </summary>
        public double? ZBFX { get; set; }
        /// <summary>
        /// 崩塌源高程
        /// </summary>
        public double? BTYGC { get; set; }
        /// <summary>
        /// 最大落差
        /// </summary>
        public double? ZDLC { get; set; }
        /// <summary>
        /// 最大水平位移
        /// </summary>
        public double? ZDSPWY { get; set; }
        /// <summary>
        /// 崩塌源宽度
        /// </summary>
        public double? BTYKD { get; set; }
        /// <summary>
        /// 崩塌源厚度
        /// </summary>
        public double? BTYHD { get; set; }
        /// <summary>
        /// 崩塌源面积
        /// </summary>
        public double? BTYMJ { get; set; }
        /// <summary>
        /// 崩塌源体积
        /// </summary>
        public double? BTYTJ { get; set; }
        /// <summary>
        /// 诱发因素
        /// </summary>
        public string YFYS { get; set; }
        /// <summary>
        /// 其他诱发因素
        /// </summary>
        public string QTYFYS { get; set; }
        /// <summary>
        /// 堆积体平均厚度
        /// </summary>
        public double? DJTPJHD { get; set; }
        /// <summary>
        /// 堆积体面积
        /// </summary>
        public double? DJTMJ { get; set; }
        /// <summary>
        /// 堆积体体积
        /// </summary>
        public double? DJTTJ { get; set; }
        /// <summary>
        /// 规模等级
        /// </summary>
        public int? GMDJ { get; set; }
        /// <summary>
        /// 实体勾绘
        /// </summary>
        public bool? STGH { get; set; }
        /// <summary>
        /// 确定性程度
        /// </summary>
        public int? QDXCD { get; set; }
        /// <summary>
        /// 死亡人数
        /// </summary>
        public int? SWRS { get; set; }
        /// <summary>
        /// 威胁人数
        /// </summary>
        public int? WXRS { get; set; }
        /// <summary>
        /// 直接损失
        /// </summary>
        public double? ZJSS { get; set; }
        /// <summary>
        /// 威胁财产
        /// </summary>
        public double? WXCC { get; set; }
        /// <summary>
        /// 灾情等级
        /// </summary>
        public int? ZQDJ { get; set; }
        /// <summary>
        /// 险情等级
        /// </summary>
        public int? XQDJ { get; set; }
        /// <summary>
        /// 威胁对象
        /// </summary>
        public string WXDX { get; set; }
        /// <summary>
        /// 其他威胁对象
        /// </summary>
        public string QTWXDX { get; set; }
        /// <summary>
        /// 地形地貌
        /// </summary>
        public string DXDM { get; set; }
        /// <summary>
        /// 地层岩性及岩性组合
        /// </summary>
        public string DCYXYXZH { get; set; }
        /// <summary>
        /// 斜坡结构与地质构造
        /// </summary>
        public string XPJGDZGZ { get; set; }
        /// <summary>
        /// 水文地质条件
        /// </summary>
        public string SWDZTJ { get; set; }
        /// <summary>
        /// 植被及土地利用
        /// </summary>
        public string ZBTDLY { get; set; }
        /// <summary>
        /// 人类工程活动
        /// </summary>
        public string RLGCHD { get; set; }
        /// <summary>
        /// 崩塌源区
        /// </summary>
        public string BTYQ { get; set; }
        /// <summary>
        /// 崩塌堆积体
        /// </summary>
        public string BTDJT { get; set; }
        /// <summary>
        /// 崩塌路径区
        /// </summary>
        public string BTLJQ { get; set; }
        /// <summary>
        /// 危险性分析
        /// </summary>
        public string WXXFX { get; set; }
        /// <summary>
        /// 危害分析
        /// </summary>
        public string WHFX { get; set; }
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
