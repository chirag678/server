import crypto from 'crypto';

const algorithm = "aes-256-cbc"; 

export const encrypt = (detailsString) => {
  let encryptedDetails;
  const Securitykey = Buffer.from(process.env.SECURITY_KEY_STRING, "hex");
  const initVector = Buffer.from(process.env.INIT_VECTOR_STRING, "hex");
  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
  encryptedDetails = cipher.update(detailsString, "utf-8", "hex");
  encryptedDetails += cipher.final("hex");
  return encryptedDetails;
}

export const decrypt = (encryptedDetails) => {
  const Securitykey = Buffer.from(process.env.SECURITY_KEY_STRING, "hex");
  const initVector = Buffer.from(process.env.INIT_VECTOR_STRING, "hex");
  const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
  let decryptedDetails = decipher.update(encryptedDetails, "hex", "utf-8");
  decryptedDetails += decipher.final("utf8");
  return decryptedDetails;
}