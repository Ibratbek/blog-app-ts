import { Request, Response, NextFunction } from 'express';
import { SendResponse } from '../library/response';
import { IRequest } from '../types/Request';
import CategroryModel from '../models/Categrory';

export default class {
    async create(req: IRequest, res: Response) {
        try {

            const data = req.body;
            const existingData = await CategroryModel.findOne({ name: data.name });
            if (existingData) {
                return new SendResponse(res).error(400, "CATEGORY_EXISTS");
            }

            const category = await CategroryModel.create(data);
            res.status(201).send(category)
        } catch (e) {
            console.log(e)
            new SendResponse(res).error(500, 'SERVER ERROR')
        }
    }

    async list(req: IRequest, res: Response) {
        try {


            const categories = await CategroryModel.find();
            res.status(201).send({ msg: "OK", data: categories });
        } catch (e) {
            console.log(e)
            new SendResponse(res).error(500, 'SERVER ERROR')
        }
    }

    async load(req: IRequest, res: Response) {
        try {
            const id: string = req.params.id;
            const category = await CategroryModel.find({ _id: id });

            if (!category) {
                return new SendResponse(res).error(404, "Not Found");
            }
            res.status(201).send({ msg: "OK", data: category });
        } catch (e) {
            console.log(e)
            new SendResponse(res).error(500, 'SERVER ERROR')
        }
    }

    async update(req: IRequest, res: Response) {
        try {
            const id: string = req.params.id;
            const data = req.body;
            const category = await CategroryModel.findByIdAndUpdate({ _id: id }, data, { new: true });
            if (!category) {
                return new SendResponse(res).error(404, "Not Found");
            }
            res.status(201).send({ msg: "OK", data: category });
        } catch (e) {
            console.log(e)
            new SendResponse(res).error(500, 'SERVER ERROR')
        }
    }



    async remove(req: IRequest, res: Response) {
        try {
            const id: string = req.params.id;
            const category = await CategroryModel.findByIdAndDelete({ _id: id });

            if (!category) {
                return new SendResponse(res).error(404, "Not Found");
            }
            res.status(201).send({ msg: "OK", data: category });
        } catch (e) {
            console.log(e)
            new SendResponse(res).error(500, 'SERVER ERROR')
        }
    }
}