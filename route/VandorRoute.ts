import e from 'express';
import express, { Request, Response } from 'express';

const router = express();

router.get('/', (req: Request, res: Response) => {
	return res.json({ message: 'Hello from Vandor' });
});

export { router as VandorRoute };
