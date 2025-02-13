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
import User from "../models/user.js"; // Import Sequelize User model

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the webhook signature
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          id: data.id, // Use `id` instead of `_id` (Sequelize uses `id` as primary key)
          email: data.email_address[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };

        // Create a new user in the database
        await User.create(userData);
        res.json({ success: true });
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_address[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };

        // Update the user in the database using `update` method
        await User.update(userData, { where: { id: data.id } });
        res.json({ success: true });
        break;
      }

      case "user.deleted": {
        // Delete the user from the database using `destroy` method
        await User.destroy({ where: { id: data.id } });
        res.json({ success: true });
        break;
      }

      default:
        res.status(400).json({ success: false, message: "Unknown webhook type" });
        break;
    }
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ success: false, message: error.message });
  }
};

