import mongoose, { Document, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

//Interface pour les utilisateurs
interface IUser extends Document {
    email: string;
    password: string;
    token?: string | null;
}
// Schéma Mongoose pour les utilisateurs
const userSchema = new Schema<IUser>({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    token: {
        type: String,
        default: null
    }
});

userSchema.plugin(uniqueValidator);

export default mongoose.model<IUser>('User', userSchema); 