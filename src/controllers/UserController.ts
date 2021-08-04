import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export default class {
    async register(req: Request, res: Response) {
        try {
            const data = req.body;

            const existingUser = await User.findOne({ email: data.email });
            if (existingUser) {
                return res.status(400).send({ msg: "User already registreted" });
            }

            const user = await User.create(data);
            res.status(201).send({ msg: "User Created", data, user })
        } catch (e) {
            console.log(e);
            res.status(500).send({ msg: "Server Error" });
        }
    }
}