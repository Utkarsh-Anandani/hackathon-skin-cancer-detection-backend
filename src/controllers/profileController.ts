import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../model/User';
import dbConnect from '../utils/dbConnect';


// Create Profile for user
export const createProfileController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const details: IUser = req.body;
        await dbConnect();

        const profile = await User.create({
            fullName: details.fullName,
            gender: details.gender,
            countryCode: details.countryCode,
            country: details.country,
            city: details.city,
            phoneNumber: details.phoneNumber,
            dob: details.dob
        })

        if(profile) {
            res.json({
                success: true,
                message: "Profile created successfully!",
                data: profile
            });
            return;
        }
        res.json({success: false, message: "Profile creation Failed!"})
    } catch (error) {
        console.error(error);
        next(error);
    }
};


// Get user Profile
export const getProfileController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone } = req.query;
        await dbConnect();

        const profile = await User.findOne({
            phoneNumber: phone
        })

        if(profile) {
            res.json({
                success: true,
                message: "Profile Found!",
                data: profile
            });
            return;
        }
        res.json({success: false, message: "Profile not Found or is deleted!"})
    } catch (error) {
        console.error(error);
        next(error);
    }
};