import express, { Request, Response } from 'express';
import { CreateVandor, GetVandorById, GetVandors } from '../controller';

const router = express();

router.post('/vandor', CreateVandor);
router.get('/vandors', GetVandors);
router.get('/vandor/:id', GetVandorById);

router.get('/', (req: Request, res: Response) => {
	return res.json({ message: 'Hello from Admin' });
});

export { router as AdminRoute };
