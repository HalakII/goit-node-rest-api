import { Schema, model } from "mongoose";
import hooks from "./hooks.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", hooks.handleSaveError);
const Contact = model("contact", contactSchema);

export default Contact;

// 65ea1c431017cdc7aa88344d
