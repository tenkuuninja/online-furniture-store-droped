import mongoose, { Schema, Types } from "mongoose";

interface ICustomer {
  name: number;
  email: string;
  address: string;
  phone: string;
}

interface IBillDeTail {
  productId: Types.ObjectId;
  price: string;
  quantity: string;
}

interface IBill {
  userId: Types.ObjectId;
  total: number;
  customer: ICustomer;
  detail: [IBillDeTail];
  status: string;
  paymentMethod: string;
}

const billSchema = new Schema<IBill>({
  userId: { 
    type: Schema.Types.ObjectId, 
    required: false, 
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
    productId: {
      type: Schema.Types.ObjectId, 
      required: true, 
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
