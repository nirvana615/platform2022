using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 设备结果表
    /// </summary>
    public class PatrolEquipmentInfo
    {
        /// <summary>
        /// id
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 设备id
        /// </summary>
        public string equipmentId { get; set; }
        /// <summary>
        /// 照片地址
        /// </summary>
        public string photoUrl { get; set; }
        /// <summary>
        /// 项目id
        /// </summary>
        public string projectId { get; set; }
        /// <summary>
        /// 防雷装置
        /// </summary>
        public string flzz { get; set; }
        /// <summary>
        /// 太阳板遮挡
        /// </summary>
        public string tynzd { get; set; }
        /// <summary>
        /// 标志完好性
        /// </summary>
        public string bzwh { get; set; }
        /// <summary>
        /// 传感器（裂缝）异物干扰（鸟、植被）
        /// </summary>
        public string cgqgr { get; set; }
        /// <summary>
        /// 通信线缆破坏情况
        /// </summary>
        public string txxlph { get; set; }
        /// <summary>
        /// 巡视描述
        /// </summary>
        public string patrolDesc { get; set; }
        /// <summary>
        /// 设备描述
        /// </summary>
        public string equipmentDesc { get; set; }
        /// <summary>
        /// 巡视期数
        /// </summary>
        public string patrolNum { get; set; }
        /// <summary>
        /// 巡视结果
        /// </summary>
        public string patrolResult { get; set; }
        /// <summary>
        /// 巡视状态。0 未处理  1 已处理，进来直接未处理
        /// </summary>
        public string patrolStatus { get; set; }
        /// <summary>
        /// 设备名称
        /// </summary>
        public string equipmentName { get; set; }
        /// <summary>
        /// 照片名称
        /// </summary>
        public string photoName { get; set; }
        /// <summary>
        /// 监测立柱
        /// </summary>
        public string jclz { get; set; }
        /// <summary>
        /// 巡视时间
        /// </summary>
        public string patrolTime { get; set; }

    }
}
