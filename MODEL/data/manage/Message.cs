using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 推送消息
    /// </summary>
    public class Message
    {
        public int Id { get; set; }
        public int Way { get; set; }
        public string Webhook { get; set; }
        public string Phone { get; set; }
        public string CJSJ { get; set; }
        public string BZ { get; set; }
    }
}
