import mongoose, { Schema, Document, mongo } from "mongoose";

interface FoodDoc extends Document {
  vandorId: mongoose.Types.ObjectId; // Reference to vendor
  name: string;
  description: string;
  category: string;
  foodType: string;
  readyTime: number;
  price: number;
  rating: number;
  images: [string];
}

const FoodSchema = new Schema(
  {
    vandorId: { type: Schema.Types.ObjectId, ref: "Vandor", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    foodType: { type: String, required: true },
    readyTime: { type: Number },
    price: { type: Number, required: true },
    rating: { type: Number },
    images: { type: [String] },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const Food = mongoose.model<FoodDoc>("Food", FoodSchema);

export { Food };
