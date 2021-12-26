using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 统一返回结果
    /// </summary>
    public class ResponseResult
    {
        /// <summary>
        /// 结果编码
        /// 成功1 失败0
        /// </summary>
        public int code { get; set; }
        /// <summary>
        /// 结果消息
        /// </summary>
        public string message { get; set; }
        /// <summary>
        /// 结果数据
        /// </summary>
        public string data { get; set; }

        public ResponseResult(int c, string m, string d)
        {
            code = c;
            message = m;
            data = d;
        }
    }
}
