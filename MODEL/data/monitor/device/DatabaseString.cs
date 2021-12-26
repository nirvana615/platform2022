using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 自动化监测数据库（文本）
    /// </summary>
    public class DatabaseString
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 数据库类型
        /// </summary>
        public string DBLX { get; set; }
        /// <summary>
        /// 数据库IP
        /// </summary>
        public string DBIP { get; set; }
        /// <summary>
        /// 数据库端口
        /// </summary>
        public string DBPORT { get; set; }
        /// <summary>
        /// 数据库名称
        /// </summary>
        public string DBNAME { get; set; }
        /// <summary>
        /// 数据库用户
        /// </summary>
        public string DBUSER { get; set; }
        /// <summary>
        /// 数据库密码
        /// </summary>
        public string DBPW { get; set; }
        /// <summary>
        /// 数据库地址
        /// </summary>
        public string DBADD { get; set; }
        /// <summary>
        /// 数据库连接信息
        /// </summary>
        public string DBCONN { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public string CJSJ { get; set; }
        ///// <summary>
        ///// 状态码
        ///// </summary>
        //public int ZTM { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string BZ { get; set; }
    }
}
