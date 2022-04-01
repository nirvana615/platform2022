using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 自动化监测设备(文本)
    /// </summary>
    public class DeviceString
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// 唯一编码
        /// </summary>
        public string Code { get; set; }
        /// <summary>
        /// 设备名称
        /// </summary>
        public string SBMC { get; set; }
        /// <summary>
        /// 设备编号
        /// </summary>
        public string SBBH { get; set; }
        /// <summary>
        /// 设备型号
        /// </summary>
        public string SBXH { get; set; }
        /// <summary>
        /// 设备类型
        /// </summary>
        public string SBLX { get; set; }
        /// <summary>
        /// 供电方式
        /// </summary>
        public string GDFS { get; set; }
        /// <summary>
        /// 厂家ID
        /// </summary>
        public int? CJID { get; set; }
        /// <summary>
        /// 经销商ID
        /// </summary>
        public int? JXSID { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
        /// <summary>
        /// 标识码
        /// </summary>
        public string BSM { get; set; }
        ///// <summary>
        ///// 状态码
        ///// </summary>
        //public int ZTM { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string BZ { get; set; }

        /// <summary>
        /// 仪器编号
        /// </summary>
        public string sn { get; set; }
        /// <summary>
        /// 物联卡号
        /// </summary>
        public string sim { get; set; }
    }
}
