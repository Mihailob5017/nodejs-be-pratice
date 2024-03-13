import { NextFunction, Request, Response } from 'express';
import { AuthPayload } from '../dto';
import { VerifySignature } from '../util';

declare global {
	namespace Express {
		interface Request {
			user?: AuthPayload;
		}
	}
}

export const Authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const validate = await VerifySignature(req);

	if (validate) {
		next();
	} else {
		return res.json({ message: 'Unauthorized' });
	}
};
