import { NextFunction, Request, Response } from 'express';
import { CreateVandorInput } from '../dto';
import { Vandor } from '../model';
import { EncryptPassword, GenerateSalt } from '../util';

export const GetVandors = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

export const GetVandorById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

export const CreateVandor = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const {
		name,
		address,
		email,
		foodType,
		ownerName,
		password,
		phone,
		pinCode,
	} = <CreateVandorInput>req.body;

	const existsingVandor = await Vandor.findOne({ email });
	if (existsingVandor) {
		return res.status(400).json({ message: 'Vandor already exists' });
	}

	// Generate salt and hash password
	const salt = await GenerateSalt();
	const encryptedPassword = await EncryptPassword(password, salt);
	// Ecnypt password with salt

	const createVandor = await Vandor.create({
		name,
		address,
		email,
		foodType,
		ownerName,
		password: encryptedPassword,
		phone,
		pinCode,
		salt,
		serviceAvailabilty: false,
		coverImages: [],
		rating: 0,
	});

	return res.json(createVandor);
};
