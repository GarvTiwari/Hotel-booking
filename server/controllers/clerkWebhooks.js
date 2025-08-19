// import { messageInRaw, Webhook } from "svix";
// import User from "../models/User.js";

// const clerkWebhooks = async (req, res) => {
//   try {

//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     const headers = {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     };
//     // Verifying Headers 
// const evt = await whook.verify(req.body, headers);
 


//     const { data, type } = evt;

//     const userData = {
//       _id: data.id,
//       email: data.email_addresses[0].email_address,
//       username: data.first_name + " " + data.last_name,
//       // Chatgpt
//       // username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//       image: data.image_url || "",
//     };



//     switch (type) {
//       case "user.created":
//         console.log("Saving user to MongoDB...");
//         await User.create(userData);
//         console.log(" User saved.");
//         break;
//       case "user.updated":
//         await User.findByIdAndUpdate(data.id, userData);
//         break;
//       case "user.deleted":
//         await User.findByIdAndDelete(data.id);
//         break;
//       default:
//         break;
//     }


//     res.json({success:true,message:"Webhook Recieved"})

//     // res.status(200).json({ success: true, message: "Webhook received." });
//   } catch (error) {
//     console.log(error.message);
//     res.json({success:false,message:error.message})
    
    
//     // console.error("Webhook Error:", error.message);
//     // res.status(400).json({ success: false, message: error.message });
//   }
// };

// export default clerkWebhooks;






import { Webhook } from "svix";
import User from "../models/User.js";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // ✅ Verify raw body

    const evt = await whook.verify(req.body.toString("utf8"), headers);

// const evt = await whook.verify(req.body.toString(), headers);

    //  const evt = await whook.verify(req.body, headers);
    const { data, type } = evt;

    // ✅ Build userData safely
    const userData = {
       _id: data.id,
      email: data.email_addresses?.[0]?.email_address || "",
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url || "",
    };

    switch (type) {
      // case "user.created":
      //   console.log("Saving user to MongoDB...");
      //   await User.create(userData);
      //   console.log("✅ User saved.");
      //   break;


      case "user.created":
        console.log("➡️ Clerk user.created event received");
        await User.findByIdAndUpdate(
          data.id,
          userData,
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        console.log("✅ User saved/updated");
        break;

      case "user.updated":
        console.log("Updating user...");
        await User.findByIdAndUpdate(data.id, userData, { new: true });
        console.log("✅ User updated.");
        break;

      case "user.deleted":
        console.log("Deleting user...");
        await User.findByIdAndDelete(data.id);
        console.log("✅ User deleted.");
        break;

      default:
        console.log("Unhandled event type:", type);
        break;
    }

    res.status(200).json({ success: true, message: "Webhook received." });

  } catch (error) {
    console.error("❌ Webhook Error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
