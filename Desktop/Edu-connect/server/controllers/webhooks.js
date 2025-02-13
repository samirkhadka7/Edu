// import { Webhook } from "svix";
// import User from "../models/User.js";

// //I API Controller Function to Manage Clerk User with database

// export const clerkWebhooks = async (req, res)=>{
//     try {
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

//         await whook.verify(JSON.stringify(req.body), {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"]
//         })

//         const {data, type} = req.body
//         switch (type) {
//             case 'user created': {
//                 const userData = {
//                     _id: data.id,
//                     email: data.email_address[0].email_address,
//                     name: data. first_name + " " + data. last_name,
//                     imageUrl: data. image_url,
//                 }
//                 await User.create(userData)
//                 res. json ({})
//                 break;
//             }
//             case 'user.updated': {
//                 const userData = {
//                     email: data.email_address[0].email_address,
//                     name: data. first_name + " " + data. last_name,
//                     imageUrl: data. image_url,
//                 }
//                 await User.findByIdAndUpdate(data.id, userData)
//                 res. json ({})
//                 break;
//             }

//             case 'user.deleted' : {
//                 await User.findByIdAndDelete(data.id)
//                 res. json ({})
//                 break;
//             }

//             default:
//                 break;
//         }
//     }catch (error){
//         res.jsos({success: false, message: error.message})
//     }
// }



import { Webhook } from "svix";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

export const clerkWebhooks = async (req, res) => {
  const payload = req.rawBody;
  const headers = {
    "svix-id": req.headers["svix-id"],
    "svix-timestamp": req.headers["svix-timestamp"],
    "svix-signature": req.headers["svix-signature"],
  };

  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const event = whook.verify(payload, headers);
    const { data, type } = event;

    switch (type) {
      case "user.created": {
        const userData = {
          id: data.id,
          email: data.email_addresses?.[0]?.email_address || "no-email@example.com",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url || "https://example.com/default-avatar.png",
        };

        await User.create(userData);
        return res.status(200).json({ success: true });
      }

      case "user.updated": {
        const existingUser = await User.findOne({ where: { id: data.id } });

        if (existingUser) {
          await existingUser.update({
            email: data.email_addresses?.[0]?.email_address || existingUser.email,
            name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            imageUrl: data.image_url || existingUser.imageUrl,
          });
        }

        return res.status(200).json({ success: true });
      }

      case "user.deleted": {
        await User.destroy({ where: { id: data.id } });
        return res.status(200).json({ success: true });
      }

      default:
        return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
