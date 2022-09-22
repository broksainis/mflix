import mongoose, { Document, Schema } from 'mongoose';

export interface IMovie {
    name: string;
}

export interface IMovieModel extends IMovie, Document {}

const MovieSchema: Schema = new Schema(
    {
        title: { type: String },
        genres: {type: Array}
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IMovieModel>('Movie', MovieSchema);
