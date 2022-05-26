import mongoose, { Schema, model, connect } from "mongoose";

interface IUser {
  username: string;
  password: string;
  email: string;
  name: string;
  avatar?: string;
  gender: string;
  role: string;
}

const userSchema = new Schema<IUser>({
  username: { 
    type: String, 
    required: true, 
    unique: true,
  },
  password: { 
    type: String, 
    required: true, 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
  },
  name: { 
    type: String, 
    required: false, 
  },
  avatar: { 
    type: String, 
    required: false, 
  },
  gender: { 
    type: String, 
    required: false, 
    default: "M",
  },
  role: { 
    type: String, 
    required: true,
    default: "user", 
  },
}, {
  timestamps: { 
    createdAt: true, 
    updatedAt: false 
  }
});

export default mongoose.model("users", userSchema);
