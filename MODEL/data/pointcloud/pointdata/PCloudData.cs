using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class PCloudData
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// id
        /// </summary>
        public int  ProjectId { get; set; }
        /// <summary>
        /// 项目名称
        /// </summary>
        public string XMMC { get; set; }
        /// <summary>
        /// 点云采集时间
        /// </summary>
        public string CJSJ { get; set; }
        /// <summary>
        /// SRID
        /// </summary>
        public string SRID { get; set; }
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
        /// 区域
        /// </summary>
        public int Regionid { get; set; }

        /// <summary>
        /// 采集人员
        /// </summary>
        public string CJRY { get; set; }

        /// <summary>
        /// 数据格式
        /// </summary>
        public int SJGSid { get; set; }

        /// <summary>
        /// 采集设备
        /// </summary>
        public int Deviceid { get; set; }

        /// <summary>
        /// 数据类型
        /// </summary>
        public int Typeid { get; set; }

        /// <summary>
        /// 点云数目
        /// </summary>
        public string DYSM { get; set; }

        /// <summary>
        /// 目前流程
        /// </summary>
        public int MQLCid { get; set; }


        /// <summary>
        /// 采集周期
        /// </summary>
        public int CJZQ { get; set; }

        /// <summary>
        /// 中心经度
        /// </summary>
        public string  ZXJD { get; set; }
        /// <summary>
        /// 中心纬度
        /// </summary>
        public string ZXWD { get; set; }

        /// <summary>
        /// 项目工程设置
        /// </summary>
        public ProjectSetUp projectSet { get; set; }

    }
}
