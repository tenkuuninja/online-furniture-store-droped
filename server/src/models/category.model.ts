import mongoose, { Schema, model, connect } from "mongoose";

interface ICategory {
  name: string;
  description: string;
  image: string;
}

const categorySchema = new Schema<ICategory>({
  name: { 
    type: String, 
    required: true, 
    unique: true,
  },
  description: { 
    type: String, 
    required: true, 
    unique: true,
  },
  image: { 
    type: String, 
    required: false, 
  },
}, {
  timestamps: false
});

export default mongoose.model("categories", categorySchema);
