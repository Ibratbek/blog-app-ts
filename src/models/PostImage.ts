import mongoose, { Schema, Document, HookNextFunction } from "mongoose";

export interface IPostImage {
    filePath: string;
    description: string;
}

const ImageSchema: any = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    filePath: String,
    description: String
});


export default mongoose.model<IPostImage>("PostImage", ImageSchema);
