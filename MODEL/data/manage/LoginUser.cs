using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 用户
    /// </summary>
    public class LoginUser
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        public int UserId { get; set; }
        /// <summary>
        /// 用户名
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        /// 别名
        /// </summary>
        public string AliasName { get; set; }
        /// <summary>
        /// 时间
        /// </summary>
        public string TIMES { get; set; }
        /// <summary>
        /// 登录次数
        /// </summary>
        public int COUNT { get; set; }
       
    }
}
