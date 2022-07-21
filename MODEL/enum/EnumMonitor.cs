using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using COM;

namespace MODEL
{
    /// <summary>
    /// 监测枚举
    /// </summary>
    public static class EnumMonitor
    {
        #region 设备检查
        /// <summary>
        /// 设备检查结果
        /// </summary>
        public enum DeviceCheckResult
        {
            [RemarkAttribute("正常")]
            Normal = 0,

            [RemarkAttribute("采集不足")]
            DataMiss = 1,

            [RemarkAttribute("无数据")]
            NoData = 2,

            [RemarkAttribute("数据无效")]
            ValueError = 3,

            [RemarkAttribute("标识损毁")]
            MarkBad = 4,

            [RemarkAttribute("标识故障")]
            MarkFault = 5,

            [RemarkAttribute("标识模拟")]
            MarkSimulate = 6
        }
        /// <summary>
        /// 设备状态标识
        /// </summary>
        public enum DeviceStatusMark
        {
            [RemarkAttribute("无标识")]
            NoMark = 0,

            [RemarkAttribute("标识损毁")]
            MarkBad = 1,

            [RemarkAttribute("标识故障")]
            MarkFault = 2,

            [RemarkAttribute("GNSS基站")]
            GNSSBase = 3,

            [RemarkAttribute("标识模拟")]
            MarkSimulate = 4
        }
        #endregion

        /// <summary>
        /// 供电方式
        /// </summary>
        public enum PowerType
        {
            [RemarkAttribute("太阳能")]
            Battery = 0,

            [RemarkAttribute("市电")]
            Grid = 1
        }

        /// <summary>
        /// GNSS解算类型
        /// </summary>
        public enum GNSSType
        {
            [RemarkAttribute("静态解算")]
            Static = 0,

            [RemarkAttribute("动态解算")]
            Dynamic = 1
        }

        /// <summary>
        /// 自动化监测数据标识
        /// </summary>
        public enum AutoDataFlag
        {
            /// <summary>
            /// 自动化监测未分类数据（直接从自动化监测数据库迁移的）
            /// </summary>
            [RemarkAttribute("100")]
            Source = 0,

            /// <summary>
            /// 标记删除的数据（异常值）
            /// </summary>
            [RemarkAttribute("200")]
            Less = 1,

            /// <summary>
            /// 插补数据（保证数据采集的连续性）
            /// </summary>
            [RemarkAttribute("300")]
            Plus = 2
        }

        /// <summary>
        /// 自动化监测数据时间范围
        /// </summary>
        public enum AutoDataDateTime
        {
            [RemarkAttribute("最近三十天")]
            LastMonth = 0,

            [RemarkAttribute("今日")]
            Today = 1,

            [RemarkAttribute("本旬")]
            ThisTen = 2,

            [RemarkAttribute("本月")]
            ThisMonth = 3,

            [RemarkAttribute("本季度")]
            ThisQuarterly = 4,

            [RemarkAttribute("上半年")]
            FirstHalf = 5,

            [RemarkAttribute("下半年")]
            SencondHalf = 6,

            [RemarkAttribute("今年")]
            ThisYear = 7,

            [RemarkAttribute("前一日")]
            Yesterday = 8,

            [RemarkAttribute("上一旬")]
            PreTen = 9,

            [RemarkAttribute("上一月")]
            PreMonth = 10,

            [RemarkAttribute("上一季度")]
            PreQuarterly = 11,

            [RemarkAttribute("上一年")]
            PreYear = 12,

            [RemarkAttribute("全部")]
            All = 13,

            [RemarkAttribute("上一旬的最后一天")]
            PreTenLastDay = 14,

            [RemarkAttribute("上一月的最后一天")]
            PreMonthLastDay = 15
        }

        /// <summary>
        /// 自动化监测设备类型
        /// </summary>
        public enum AutoDeviceType
        {
            [RemarkAttribute("GNSS")]
            GNSS = 0,

            [RemarkAttribute("裂缝")]
            LF = 1,

            [RemarkAttribute("倾角")]
            QJ = 2,

            [RemarkAttribute("应力")]
            YL = 3,

            [RemarkAttribute("深部位移")]
            SBWY = 4,

            [RemarkAttribute("地下水位")]
            WATER = 5,

            [RemarkAttribute("雨量")]
            RAIN = 6,

            [RemarkAttribute("声光预警")]
            ALARM = 7
        }

        /// <summary>
        /// 监测站类型
        /// </summary>
        public enum GNSSStationType
        {
            [RemarkAttribute("GNSS基准站")]
            GNSSBase = 0,

            [RemarkAttribute("GNSS监测站")]
            GNSSSite = 1
        }

        /// <summary>
        /// 剖面类型
        /// </summary>
        public enum SectionType
        {
            [RemarkAttribute("单一剖面")]
            Simple = 0,

            [RemarkAttribute("综合剖面")]
            Complex = 1
        }

        /// <summary>
        /// 剖面等级
        /// </summary>
        public enum SectionLevel
        {
            [RemarkAttribute("主剖面")]
            Main = 0,

            [RemarkAttribute("次剖面")]
            Minor = 1
        }

        /// <summary>
        /// 地质灾害类型
        /// </summary>
        public enum GeodisasterType
        {
            [RemarkAttribute("危岩崩塌")]
            Rockfall = 0,

            [RemarkAttribute("滑坡")]
            Landslide = 1,

            [RemarkAttribute("泥石流")]
            Debrisflow = 2,

            [RemarkAttribute("地面塌陷")]
            GroundCollapse = 3,

            [RemarkAttribute("地裂缝")]
            Groundfissure = 4,

            [RemarkAttribute("地面沉降")]
            Groundsubsidence = 5
        }

        /// <summary>
        /// 地质灾害等级
        /// </summary>
        public enum GeodisasterLevel
        {
            [RemarkAttribute("特大型")]
            XL = 0,

            [RemarkAttribute("大型")]
            L = 1,

            [RemarkAttribute("中型")]
            M = 2,

            [RemarkAttribute("小型")]
            S = 3
        }

        /// <summary>
        /// 地质灾害险情
        /// </summary>
        public enum GeodisasterDanger
        {
            [RemarkAttribute("特大型")]
            XL = 0,

            [RemarkAttribute("大型")]
            L = 1,

            [RemarkAttribute("中型")]
            M = 2,

            [RemarkAttribute("小型")]
            S = 3
        }

        /// <summary>
        /// 监测级别
        /// </summary>
        public enum MonitorLevel
        {
            [RemarkAttribute("一级监测预警")]
            Ⅰ = 0,

            [RemarkAttribute("二级监测预警")]
            Ⅱ = 1,

            [RemarkAttribute("三级监测预警")]
            Ⅲ = 2
        }

        /// <summary>
        /// 监测手段
        /// </summary>
        public enum MonitorMeans
        {
            [RemarkAttribute("手动")]
            M = 0,

            [RemarkAttribute("自动")]
            A = 1,

            [RemarkAttribute("手动和自动")]
            AM = 2
        }

        /// <summary>
        /// 测绘数据类型
        /// </summary>
        public enum SurveyDataType
        {
            [RemarkAttribute("模型")]
            Model = 0,

            [RemarkAttribute("点云")]
            PointCloud = 1,

            [RemarkAttribute("数字正射影像")]
            DOM = 2,

            [RemarkAttribute("数字表面模型")]
            DSM = 3,

            [RemarkAttribute("制图")]
            Map = 4
        }

        /// <summary>
        /// 项目类别
        /// </summary>
        public enum ProjectCategory
        {
            [RemarkAttribute("库区应急监测")]
            KQYJJC = 0,

            [RemarkAttribute("后规专业监测")]
            HGZYJC = 1,

            [RemarkAttribute("非库区应急专业监测")]
            FKQYJZYJC = 2,

            [RemarkAttribute("非库区专业监测")]
            FKQZYJC = 3
        }

        /// <summary>
        /// 项目阶段
        /// </summary>
        public enum ProjectStage
        {
            [RemarkAttribute("前期")]
            Plan = 0,

            [RemarkAttribute("运行")]
            Run = 1,

            [RemarkAttribute("完成")]
            Finish = 2,

            [RemarkAttribute("取消")]
            Cancel = 3
        }
    }
}
