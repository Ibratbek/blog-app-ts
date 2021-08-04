import { Request, Response, NextFunction } from 'express';
import { SendResponse } from '../library/response';
import { IRequest } from '../types/Request';
import PostModel from '../models/Post';
import { PAGINATION } from '../core/config';

export default class {
    async create(req: IRequest, res: Response) {
        try {
            const data = req.body;
            const postData = new PostModel({
                ...data,
                author: req.session.user._id
            })
            const post: any = await PostModel.create(postData);
            new SendResponse(res).success(post)
        } catch (e) {
            console.log(e)
            new SendResponse(res).error(500, 'SERVER ERROR')
        }
    }

    async list(req: IRequest, res: Response) {
        try {
            const posts = await PostModel.find()
                .populate('author', ['_id', 'firstName', 'lastName', 'username'])
                .limit(PAGINATION.limit * 1)
                .skip(PAGINATION.order);

            new SendResponse(res).success(posts)

        } catch (e) {
            console.log(e)
            new SendResponse(res).error(500, 'SERVER ERROR')
        }
    }

    async load(req: IRequest, res: Response) {
        try {
            const id: string = req.params.id;
            const post = await PostModel.find({ _id: id });

            if (!post) {
                return new SendResponse(res).error(404, "Not Found");
            }

            new SendResponse(res).success(post)
        } catch (e) {
            console.log(e)
            new SendResponse(res).error(500, 'SERVER ERROR')
        }
    }


    async update(req: IRequest, res: Response) {
        try {
            const id: string = req.params.id;
            const data = req.body;
            const post = await PostModel.findByIdAndUpdate({ _id: id }, data, { new: true });
            if (!post) {
                return new SendResponse(res).error(404, "Not Found");
            }
            new SendResponse(res).success(post)
        } catch (e) {
            console.log(e)
            new SendResponse(res).error(500, 'SERVER ERROR')
        }
    }


    async remove(req: IRequest, res: Response) {
        try {
            const id: string = req.params.id;
            const post = await PostModel.findByIdAndDelete({ _id: id });

            if (!post) {
                return new SendResponse(res).error(404, "Not Found");
            }

            new SendResponse(res).success(post)

        } catch (e) {
            console.log(e)
            new SendResponse(res).error(500, 'SERVER ERROR')
        }
    }
}