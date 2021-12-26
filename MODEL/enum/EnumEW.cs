using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using COM;

namespace MODEL
{
    /// <summary>
    /// 预警预报枚举
    /// </summary>
    public static class EnumEW
    {
        /// <summary>
        /// 预警级别
        /// </summary>
        public enum WarningLevel
        {
            [RemarkAttribute("蓝色预警")]
            Blue = 0,

            [RemarkAttribute("黄色预警")]
            Yellow = 1,

            [RemarkAttribute("橙色预警")]
            Orange = 2,

            [RemarkAttribute("红色预警")]
            Red = 3
        }

        /// <summary>
        /// 预警状态
        /// </summary>
        public enum WarningState
        {
            [RemarkAttribute("未处理")]
            NoProcess = 0,

            [RemarkAttribute("处理中")]
            Processing = 1,

            [RemarkAttribute("已处理")]
            Processed = 2
        }

        /// <summary>
        /// 危岩崩塌临界条件判据公式
        /// </summary>
        public enum WarningFunction
        {
            [RemarkAttribute("倾倒滑塌式崩塌裂缝临界宽度判据公式")]
            QJHTS = 0,

            [RemarkAttribute("倾倒式崩塌裂缝临界宽度判据公式")]
            QDS = 1,

            [RemarkAttribute("倾倒压缩式（与母岩未脱离）裂缝临界宽度判据公式")]
            QDYSS = 2,

            [RemarkAttribute("错断式崩塌连通率判据公式")]
            CDS = 3
        }

        /// <summary>
        /// 预警条件
        /// </summary>
        public enum WarningWay
        {
            [RemarkAttribute("预警判据触发")]
            YJPJCF = 0,

            [RemarkAttribute("多参数预警模型触发")]
            DCSYJMXCF = 1
        }


        /// <summary>
        /// 裂缝判据
        /// </summary>
        public enum LFPJ
        {
            [RemarkAttribute("裂缝宽度累计变形量mm")]
            KDLJBHL = 0,

            [RemarkAttribute("裂缝宽度变形速率mm/h")]
            KDBHSL = 1,

            [RemarkAttribute("裂缝宽度变形加速度mm/h²")]
            KDBHJSD = 2,

            [RemarkAttribute("裂缝宽度变形切线角°")]
            KDBHQXJ = 3
        }

        /// <summary>
        /// 倾角判据
        /// </summary>
        public enum QJPJ
        {
            [RemarkAttribute("X方向角度累计变形量°")]
            XLJBHL = 0,

            [RemarkAttribute("Y方向角度累计变形量°")]
            YLJBHL = 1,

            [RemarkAttribute("X方向角度变形速率°/h")]
            XBHSL = 2,

            [RemarkAttribute("Y方向角度变形速率°/h")]
            YBHSL = 3,

            [RemarkAttribute("X方向角度变形加速度°/h²")]
            XBHJSD = 4,

            [RemarkAttribute("Y方向角度变形加速度°/h²")]
            YBHJSD = 5,

            [RemarkAttribute("X方向角度变形切线角°")]
            XBHQXJ = 6,

            [RemarkAttribute("Y方向角度变形切线角°")]
            YBHQXJ = 7
        }

        /// <summary>
        /// 应力判据
        /// </summary>
        public enum YLPJ
        {
            [RemarkAttribute("应力累计变形量kN")]
            YLLJBHL = 0,

            [RemarkAttribute("应力变形速率kN/h")]
            YLBHSL = 1,

            [RemarkAttribute("应力变形加速度kN/h²")]
            YLBHJSD = 2,

            [RemarkAttribute("应力变形切线角°")]
            YLBHQXJ = 3
        }



        #region 危岩崩塌预警模型
        /// <summary>
        /// 崩塌（危岩体）运动形式
        /// </summary>
        public enum WYYDXS
        {
            [RemarkAttribute("倾倒式")]
            QDS = 0,

            [RemarkAttribute("滑移式")]
            HYS = 1,

            [RemarkAttribute("鼓胀式")]
            GZS = 2,

            [RemarkAttribute("拉裂式")]
            LLS = 3,

            [RemarkAttribute("错断式")]
            CDS = 4,

            [RemarkAttribute("复合式")]
            FHS = 5
        }

        /// <summary>
        /// 崩塌类型
        /// </summary>
        public enum WYBTLX
        {
            [RemarkAttribute("岩质")]
            YZ = 0,

            [RemarkAttribute("土质")]
            TZ = 1
        }

        /// <summary>
        /// 崩塌（危岩体）控制结构面类型
        /// </summary>
        public enum WYKZJGMLX
        {
            [RemarkAttribute("卸荷裂隙")]
            XHLX = 0,

            [RemarkAttribute("软弱夹层层面")]
            RRJCCM = 1,

            [RemarkAttribute("节理裂隙")]
            JLLX = 2,

            [RemarkAttribute("风化剥蚀界面")]
            FHBSJM = 3,

            [RemarkAttribute("基覆界面")]
            JFJM = 4,

            [RemarkAttribute("其他")]
            QT = 5
        }

        /// <summary>
        /// 崩塌（危岩体）宏观稳定性评价
        /// </summary>
        public enum WYHGWDXPJ
        {
            [RemarkAttribute("不稳定")]
            BWD = 0,

            [RemarkAttribute("基本稳定")]
            JBWD = 1,

            [RemarkAttribute("稳定")]
            WD = 2
        }

        /// <summary>
        /// 崩塌（危岩体）活动状态
        /// </summary>
        public enum WYHDZT
        {
            [RemarkAttribute("初始开裂阶段")]
            CSKLJD = 0,

            [RemarkAttribute("加速变形阶段")]
            JSBXJD = 1,

            [RemarkAttribute("破坏阶段")]
            PHJD = 2,

            [RemarkAttribute("休止阶段")]
            XZJD = 3
        }

        /// <summary>
        /// 崩塌（危岩体）崩塌源扩展方式
        /// </summary>
        public enum WYBTYKZFS
        {
            [RemarkAttribute("向前推移")]
            XQTY = 0,

            [RemarkAttribute("向后扩展")]
            XHKZ = 1,

            [RemarkAttribute("扩大型")]
            KDX = 2,

            [RemarkAttribute("缩减型")]
            SJX = 3,

            [RemarkAttribute("约束型")]
            YSX = 4
        }

        /// <summary>
        /// 崩塌（危岩体）诱发因素
        /// </summary>
        public enum WYYFYS
        {
            [RemarkAttribute("降雨")]
            JY = 0,

            [RemarkAttribute("地震")]
            DZ = 1,

            [RemarkAttribute("侵蚀")]
            QS = 2,

            [RemarkAttribute("冻融")]
            DR = 3,

            [RemarkAttribute("切坡")]
            QP = 4,

            [RemarkAttribute("加载")]
            JZ = 5,

            [RemarkAttribute("水事活动")]
            SSHD = 6,

            [RemarkAttribute("地下采掘")]
            DXCJ = 7,

            [RemarkAttribute("其他")]
            QT = 8
        }

        /// <summary>
        /// 崩塌（危岩体）规模等级
        /// </summary>
        public enum WYGMDJ
        {
            [RemarkAttribute("巨型")]
            JX = 0,

            [RemarkAttribute("大型")]
            DX = 1,

            [RemarkAttribute("中型")]
            ZX = 2,

            [RemarkAttribute("小型")]
            XX = 3
        }

        /// <summary>
        /// 崩塌（危岩体）确定性程度
        /// </summary>
        public enum WYQDXCD
        {
            [RemarkAttribute("确定")]
            QD = 0,

            [RemarkAttribute("基本确定")]
            JBQD = 1,

            [RemarkAttribute("不确定")]
            BQD = 2
        }

        /// <summary>
        /// 崩塌（危岩体）灾情等级
        /// </summary>
        public enum WYZQDJ
        {
            [RemarkAttribute("特大型")]
            TDX = 0,

            [RemarkAttribute("大型")]
            DX = 1,

            [RemarkAttribute("中型")]
            ZX = 2,

            [RemarkAttribute("小型")]
            XX = 3
        }

        /// <summary>
        /// 崩塌（危岩体）险情等级
        /// </summary>
        public enum WYXQDJ
        {
            [RemarkAttribute("特大型")]
            TDX = 0,

            [RemarkAttribute("大型")]
            DX = 1,

            [RemarkAttribute("中型")]
            ZX = 2,

            [RemarkAttribute("小型")]
            XX = 3
        }

        /// <summary>
        /// 崩塌（危岩体）威胁对象
        /// </summary>
        public enum WYWXDX
        {
            [RemarkAttribute("县城")]
            XC = 0,

            [RemarkAttribute("村镇")]
            CZ = 1,

            [RemarkAttribute("居民点")]
            JMD = 2,

            [RemarkAttribute("学校")]
            XX = 3,

            [RemarkAttribute("矿山")]
            KS = 4,

            [RemarkAttribute("工厂")]
            GC = 5,

            [RemarkAttribute("水库")]
            SK = 6,

            [RemarkAttribute("电站")]
            DZ = 7,

            [RemarkAttribute("农田")]
            NT = 8,

            [RemarkAttribute("饮灌渠道")]
            YGQD = 9,

            [RemarkAttribute("森林")]
            SL = 10,

            [RemarkAttribute("公路")]
            GL = 11,

            [RemarkAttribute("大江大河")]
            DJDH = 12,

            [RemarkAttribute("铁路")]
            TL = 13,

            [RemarkAttribute("输电线路")]
            SDXL = 14,

            [RemarkAttribute("通讯设施")]
            TXSS = 15,

            [RemarkAttribute("国防设施")]
            GFSS = 16,

            [RemarkAttribute("其他")]
            QT = 17
        }

        /// <summary>
        /// 危岩破坏模式代码
        /// </summary>
        public enum WYPHMSDM
        {
            [RemarkAttribute("滑移型")]
            CTC1 = 0,

            [RemarkAttribute("倾倒型")]
            CTC2 = 1,

            [RemarkAttribute("坠落型")]
            CTC3 = 2
        }

        /// <summary>
        /// 危岩破坏模式亚类代码
        /// </summary>
        public enum WYPHMSYXDM
        {
            [RemarkAttribute("滑移式")]
            CTC11 = 0,

            [RemarkAttribute("倾倒滑移式")]
            CTC12 = 1,

            [RemarkAttribute("倾倒式")]
            CTC21 = 2,

            [RemarkAttribute("倾倒压碎式")]
            CTC22 = 3,

            [RemarkAttribute("错断式")]
            CTC31 = 4,

            [RemarkAttribute("悬臂梁式")]
            CTC32 = 5,

            [RemarkAttribute("坠落式")]
            CTC33 = 6
        }

        #endregion






    }
}
