import { Request, Response } from 'express';

export const predictSkinCancer = async (req: Request, res: Response) => {
    res.json({ message: 'Prediction endpoint working!' });
};
