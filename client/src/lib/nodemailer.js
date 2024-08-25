import nodemailer from "nodemailer"
export const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"roshanail7613@gmail.com",
        pass:"spfe bzlt hwtx jhyq"
    }
});

export const mailOptions={
    from:"roshanail7613@gmail.com",
    to:"roshanail7613@gmail.com"
};