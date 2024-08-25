import { mailOptions, transporter } from "@/lib/nodemailer";

const handler = async (req, res) => {

    if (req.method === "POST") {
      const  data  = req.body;
     
      try {
        await transporter.sendMail({
          ...mailOptions,
          subject: "Ecommerce Sight Business",
          text: "Clients Message",
          html: `<h4 className="font-bold">Clients Email is: ${data.email}</h4>
                 <p className="font-bold">Clients Phone Number is: ${data.mobile}</p>
                 <p className="font-bold">Work he has: ${data.message}</p>`
        });
        res.status(200).json({ success: true });
      } catch (error) {
        console.log(error.message);
        return res.status(400).json({ success:false,message: error.message });
      }
    } else {
     
      res.status(405).json({ message: `Method Not Allowed` });
    }
  };
  
export default handler