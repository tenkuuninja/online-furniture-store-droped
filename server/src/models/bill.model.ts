import mongoose, { Schema, Types } from "mongoose";

interface ICustomer {
  name: string;
  email: string;
  address: string;
  phone: string;
}

interface IBillDeTail {
  product: Types.ObjectId;
  price: number;
  quantity: number;
}

interface IBill {
  user: Types.ObjectId;
  total: number;
  customer: ICustomer;
  detail: [IBillDeTail];
  status: string;
  paymentMethod: string;
}

const billSchema = new Schema<IBill>({
  user: { 
    type: Schema.Types.ObjectId, 
    required: false, 
    ref: "users",
  },
  total: { 
    type: Number, 
    required: true, 
  },
  customer: { 
    name: {
      type: String, 
      required: true, 
    },
    email: {
      type: String, 
      required: true, 
    },
    address: {
      type: String, 
      required: true, 
    },
    phone: {
      type: String, 
      required: true, 
    },
  },
  detail: [{
    product: {
      type: Schema.Types.ObjectId, 
      required: true, 
      ref: "products",
    },
    price: {
      type: Number, 
      required: true, 
    },
    quantity: {
      type: Number, 
      required: true, 
    },
  }],
  status: { 
    type: String, 
    required: true, 
    default: "pending",
  },
  paymentMethod: { 
    type: String, 
    required: true, 
  },
}, {
  timestamps: { 
    createdAt: true, 
    updatedAt: false 
  }
});

export default mongoose.model("bills", billSchema);
