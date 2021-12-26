using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using COM;

namespace MODEL
{
    public static class EnumIMG
    {
        /// <summary>
        /// 影像目标类型
        /// </summary>
        public enum TargetType
        {
            [RemarkAttribute("岩体裂缝")]
            Moitor = 0,

            [RemarkAttribute("崩塌堆积体")]
            View = 1
        }
        /// <summary>
        /// 靶区类型
        /// </summary>
        public enum RoiType
        {
            [RemarkAttribute("左侧")]
            Left = 0,

            [RemarkAttribute("右侧")]
            Right = 1
        }
        /// <summary>
        /// 图像匹配算法
        /// </summary>
        public enum MatchType
        {
            [RemarkAttribute("KAZE")]
            KAZE = 0,

            [RemarkAttribute("SURF")]
            SURF = 1,

            [RemarkAttribute("SIFT")]
            SIFT = 2
        }

        /// <summary>
        /// 影像是否完成靶区匹配标记
        /// </summary>
        public enum MatchMark
        {
            [RemarkAttribute("未进行图像匹配")]
            NotMatched = 0,

            [RemarkAttribute("已完成图像匹配")]
            Matched = 1
        }

        /// <summary>
        /// 匹配结果类型标识
        /// </summary>
        public enum ResultMark
        {
            [RemarkAttribute("匹配成功")]
            Success = 0,

            [RemarkAttribute("匹配失败")]
            Failure = 1,

            [RemarkAttribute("匹配错误")]
            Error = 2
        }





    }
}