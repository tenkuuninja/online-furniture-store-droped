import mongoose, { Schema, Types } from "mongoose";

interface IProduct {
  cateId: Types.ObjectId;
  name: string;
  image: string;
  price: number;
  description: string;
  stock: number;
}

const productSchema = new Schema<IProduct>({
  cateId: { 
    type: Schema.Types.ObjectId, 
    required: true, 
  },
  name: { 
    type: String, 
    required: true, 
  },
  image: { 
    type: String, 
    required: true, 
    unique: true,
  },
  price: { 
    type: Number, 
    required: false, 
  },
  description: { 
    type: String, 
    required: false, 
  },
  stock: { 
    type: Number, 
    required: false, 
  },
}, {
  timestamps: { 
    createdAt: true, 
    updatedAt: true 
  }
});

export default mongoose.model("products", productSchema);
