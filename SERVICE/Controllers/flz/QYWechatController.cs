using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http;
using System.Xml;
using COM;
using DAL;
using MODEL;


namespace SERVICE.Controllers
{
    /// <summary>
    /// 企业微信
    /// </summary>
    public class QYWechatController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(QYWechatController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        #region 获取Token
        /// <summary>
        /// 获取Token
        /// </summary>
        public string GetAccessToken()
        {
            string requestUrl = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=ww3a917dd321cc7c26&corpsecret=bEOkXjWwLOVm9ZgInW4hE0-ahmK_iB4hn5MjnCE1KiU";
            WebResponse result = null;
            WebRequest req = WebRequest.Create(requestUrl);
            result = req.GetResponse();
            Stream s = result.GetResponseStream();
            XmlDictionaryReader xmlReader = JsonReaderWriterFactory.CreateJsonReader(s, XmlDictionaryReaderQuotas.Max);
            xmlReader.Read();
            string xml = xmlReader.ReadOuterXml();
            s.Close();
            s.Dispose();
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(xml);
            XmlElement rootElement = doc.DocumentElement;
            string access_token = rootElement.SelectSingleNode("access_token").InnerText.Trim();

            string post_url = "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + access_token;
            


            return access_token;


        }
        #endregion

        /// <summary>
        /// 新建任务
        /// </summary>
        [HttpPost]
        public string AddTask()
        {
           

            #region 参数
            string encryptedDataStr = HttpContext.Current.Request.Form["encryptedDataStr"];
            string key = HttpContext.Current.Request.Form["key"];
            string iv = HttpContext.Current.Request.Form["iv"];
            RijndaelManaged rijalg = new RijndaelManaged();
            //-----------------    
            //设置 cipher 格式 AES-128-CBC    

            rijalg.KeySize = 128;

            rijalg.Padding = PaddingMode.PKCS7;
            rijalg.Mode = CipherMode.CBC;

            rijalg.Key = Convert.FromBase64String(key.Trim().Replace("%", "").Replace(",", "").Replace(" ", "+").Replace("\\", ""));
            rijalg.IV = Convert.FromBase64String(iv.Trim().Replace("%", "").Replace(",", "").Replace(" ", "+").Replace("\\", ""));


            byte[] encryptedData = Convert.FromBase64String(encryptedDataStr.Trim().Replace("%", "").Replace(",", "").Replace(" ", "+").Replace("\\", ""));
            //解密    
            ICryptoTransform decryptor = rijalg.CreateDecryptor(rijalg.Key, rijalg.IV);

            string result;

            using (MemoryStream msDecrypt = new MemoryStream(encryptedData))
            {
                using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                {
                    using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                    {

                        result = srDecrypt.ReadToEnd();
                    }
                }
            }

            return result;

            //this.AES_decrypt(encryptedDataStr,key, iv);
            #endregion




        }


        public string AES_decrypt(string encryptedDataStr, string key, string iv)
        {
            RijndaelManaged rijalg = new RijndaelManaged();
            //-----------------    
            //设置 cipher 格式 AES-128-CBC    

            rijalg.KeySize = 128;

            rijalg.Padding = PaddingMode.PKCS7;
            rijalg.Mode = CipherMode.CBC;

            rijalg.Key = Convert.FromBase64String(key.Trim().Replace("%", "").Replace(",", "").Replace(" ", "+").Replace("\\", ""));
            rijalg.IV = Convert.FromBase64String(iv.Trim().Replace("%", "").Replace(",", "").Replace(" ", "+").Replace("\\", ""));


            byte[] encryptedData = Convert.FromBase64String(encryptedDataStr.Trim().Replace("%", "").Replace(",", "").Replace(" ", "+").Replace("\\", ""));
            //解密    
            ICryptoTransform decryptor = rijalg.CreateDecryptor(rijalg.Key, rijalg.IV);

            string result;

            using (MemoryStream msDecrypt = new MemoryStream(encryptedData))
            {
                using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                {
                    using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                    {

                        result = srDecrypt.ReadToEnd();
                    }
                }
            }

            return result;
        }

        /// <summary>
        /// 指定Post地址使用Get 方式获取全部字符串
        /// </summary>
        /// <param name="url">请求后台地址</param>
        /// <returns></returns>
        public  string getPost(string url, Dictionary<string, string> dic)
        {
            string result = "";
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
            req.Method = "POST";
            req.ContentType = "application/x-www-form-urlencoded";
            #region 添加Post 参数
            StringBuilder builder = new StringBuilder();
            int i = 0;
            foreach (var item in dic)
            {
                if (i > 0)
                    builder.Append("&");
                builder.AppendFormat("{0}={1}", item.Key, item.Value);
                i++;
            }
            byte[] data = Encoding.UTF8.GetBytes(builder.ToString());
            req.ContentLength = data.Length;
            using (Stream reqStream = req.GetRequestStream())
            {
                reqStream.Write(data, 0, data.Length);
                reqStream.Close();
            }
            #endregion
            HttpWebResponse resp = (HttpWebResponse)req.GetResponse();
            Stream stream = resp.GetResponseStream();
            //获取响应内容
            using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
            {
                result = reader.ReadToEnd();
            }
            return result;
        }






    }
}
