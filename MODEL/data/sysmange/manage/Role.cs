using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class Role
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 角色名称
        /// </summary>
        public string RoleName { get; set; }
        /// <summary>
        /// 角色简称
        /// </summary>
        public string RoleAlias { get; set; }
        /// <summary>
        /// 系统编码
        /// </summary>
        public int SysCode { get; set; }
        /// <summary>
        /// 角色编码
        /// </summary>
        public int RoleCode { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string BZ { get; set; }
    }
}
