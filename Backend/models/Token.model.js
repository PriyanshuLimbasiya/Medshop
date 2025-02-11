const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, 
      },
    token: String,
    expiry: Date,
    type: {
        type: String,
        enum: ["resetPassword", "verification"],
        required: true,
      },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Token", schema);