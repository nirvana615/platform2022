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
    public class User
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 用户名
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        /// 别名
        /// </summary>
        public string AliasName { get; set; }
        /// <summary>
        /// 密码
        /// </summary>
        public string PassWord { get; set; }
        /// <summary>
        /// 标识码
        /// </summary>
        public string BSM { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
        /// <summary>
        /// 登录时间
        /// </summary>
        public string DLSJ { get; set; }
        /// <summary>
        /// 所属单位
        /// </summary>
        public string SSDW { get; set; }
        /// <summary>
        /// 所属区域
        /// </summary>
        public string SSQY { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string BZ { get; set; }
    }
}
