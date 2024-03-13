import mongoose, { Schema, Document, Model, SchemaTypes } from 'mongoose';

interface VandorDocument extends Document {
	name: string;
	ownerName: string;
	foodType: [string];
	pinCode: string;
	address: string;
	phone: string;
	email: string;
	password: string;
	salt: string;
	serviceAvailabilty: boolean;
	coverImages: [string];
	rating: number;
	foods: any;
}

const VandorShecma = new Schema<VandorDocument>(
	{
		name: { type: String, required: true },
		ownerName: { type: String, required: true },
		foodType: { type: [String] },
		pinCode: { type: String, required: true },
		address: { type: String },
		phone: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		salt: { type: String, required: true },
		serviceAvailabilty: { type: Boolean, required: true },
		coverImages: [{ type: String }],
		rating: { type: Number },
		foods: { type: SchemaTypes.ObjectId, ref: 'food' },
	},
	{
		toJSON: {
			transform(doc, ret, options) {
				delete ret.password;
				delete ret.salt;
				delete ret.__v;
				delete ret.createdAt;
				delete ret.updatedAt;
			},
		},
		timestamps: true,
	}
);

const Vandor = mongoose.model<VandorDocument>('vandor', VandorShecma);

export { Vandor };
