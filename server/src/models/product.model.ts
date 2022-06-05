import mongoose, { Schema, Types } from "mongoose";

interface IProduct {
  category: Types.ObjectId;
  name: string;
  slug: string;
  image: string;
  price: number;
  description: string;
  stock: number;
}

const productSchema = new Schema<IProduct>({
  category: { 
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: "categories",
  },
  name: { 
    type: String, 
    required: true, 
  },
  slug: { 
    type: String, 
    required: true, 
  },
  image: { 
    type: String, 
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
