import mongoose, { Schema, Document, HookNextFunction } from "mongoose";
import { hash, genSalt, } from 'bcrypt';


export interface IUser extends Document {
    email: string,
    firstName: string,
    lastName: string,
    username: string,
    password: string
};

const UserSchema: any = new Schema({
    email: {
        type: String,
        unique: true
    },
    firstName: String,
    lastName: String,
    username: {
        type: String,
        unique: true
    },
    password: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, {
    versionKey: false,
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

UserSchema.pre('save', async function (next: HookNextFunction) {
    try {
        if (this.password) {
            const salt: string = await genSalt(10);
            this.password = await hash(this.password, salt)
        }
    } catch (e) {
        next(e);
        throw new Error(`Password hashing error ${e}`)
    }
});

export default mongoose.model<IUser>("User", UserSchema);

