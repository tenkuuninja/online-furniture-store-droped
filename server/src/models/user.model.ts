import mongoose, { Schema, model, connect } from "mongoose";

interface IUser {
  username: string;
  password: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
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
  phone: { 
    type: String, 
    required: false, 
  },
  address: { 
    type: String, 
    required: false, 
  },
  avatar: { 
    type: String, 
    required: false, 
  },
  role: { 
    type: String, 
    required: true, 
  },
}, {
  timestamps: { 
    createdAt: true, 
    updatedAt: false 
  }
});

export default mongoose.model("users", userSchema);
