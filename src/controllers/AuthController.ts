import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { jwtSignIn } from '../jwt/index';


export default class {
    async login(req: Request, res: Response) {
        try {
            const data = req.body;

            const $or = []

            if (data.email) {
                $or.push({ email: data.email })
            }

            if (data.username) {
                $or.push({ username: data.username })
            }

            const { password, ...user } = await User.findOne({ $or }).lean();

            const tokens = await jwtSignIn(user);


            // const user = await User.create(data);
            res.status(201).send({
                msg: "Ok", data: {
                    user,
                    tokens
                }
            })
        } catch (e) {
            console.log(e);
            res.status(500).send({ msg: "Server Error" });
        }
    }
}