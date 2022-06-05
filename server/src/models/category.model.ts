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
  },
  description: { 
    type: String, 
    required: false, 
  },
  image: { 
    type: String, 
    required: false, 
  },
}, {
  timestamps: false
});

export default mongoose.model("categories", categorySchema);
