import TwilioClient from "twilio";

export const GenerateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  let expiry = new Date();
  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);

  return { otp, expiry };
};

export const onRequestOTP = async (otp: number, toPhoneNumber: string) => {
  const accountSid = process.env.TWILIO_SID as string;
  const authToken = process.env.TWILIO_SECRET as string;
  const client = TwilioClient(accountSid, authToken);
  const response = await client.messages.create({
    body: `Your OTP is ${otp}`,
    to: toPhoneNumber,
  });

  return response;
};
