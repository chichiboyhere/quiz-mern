import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  multiplicationResults: [
    {
      type: Schema.Types.ObjectId,
      ref: 'MultiplicationResult'
    }
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  }
});

export default mongoose.model("User", userSchema);


