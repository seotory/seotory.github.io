# aes 256 cbc

```c#
using System;
using System.IO;
using System.Text;
using System.Security.Cryptography;
					
namespace RijndaelManaged_Example
{
    public class Program
    {
		static string key = "zkWs7Pa17k4Pa52Shs3WordWuz23f9s2";
		
        public static void Main()
        {
			// Kw5k/yu3d8WKfPJomRMqMA==
            Console.WriteLine(AESEncode("test", "1234567890123456"));
        }
		
		static public String AESEncode(String Input, String Iv) {
			RijndaelManaged aes = new RijndaelManaged();
			aes.KeySize = 256;
			aes.BlockSize = 128;
			aes.Mode = CipherMode.CBC;
			aes.Padding = PaddingMode.PKCS7;
			aes.Key = Encoding.UTF8.GetBytes(key);
			aes.IV = Encoding.UTF8.GetBytes(Iv);
			
			var encrypt = aes.CreateEncryptor(aes.Key, aes.IV);
			byte[] xBuff = null;
			
			using (var ms = new MemoryStream())
			{
				using (var cs = new CryptoStream(ms, encrypt, CryptoStreamMode.Write))
				{
					byte[] xXml = Encoding.UTF8.GetBytes(Input);
					cs.Write(xXml, 0, xXml.Length);
				}
				
				xBuff = ms.ToArray();
			}
			
			String Output = Convert.ToBase64String(xBuff);
			return Output;
		}
    }
}
```

```javascript
export function encode (text: string, iv: string): string {
    let encoding: 'binary' | 'base64' | 'hex' = 'base64';
    let cipher = crypto.createCipheriv('aes-256-cbc', CRYPTO_KEY, iv);
    let cipherResult = cipher.update(text, 'utf8', encoding);
    cipherResult += cipher.final(encoding);
    return cipherResult;
}

export function decode (ciphertext: string, iv: string): string {
    ciphertext = new Buffer(ciphertext, 'base64').toString('binary');
    const decipher = crypto.createDecipheriv('aes-256-cbc', CRYPTO_KEY, iv);
    let decipherResult = decipher.update(ciphertext, 'binary', 'utf8');
    decipherResult += decipher.final('utf8');
    return decipherResult;
}
```