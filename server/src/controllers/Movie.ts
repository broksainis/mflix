import { NextFunction, Request, Response } from 'express';
import Movie from '../models/Movie';

const getMovies = (req: Request, res: Response, next: NextFunction) => {
    const title: string = req.query.title as string;
    const minRating: number = parseInt(req.query.minRating as string);
    return Movie.find({
        'title': { $regex: title, $options: 'i' },
        'imdb.rating': { $gte: minRating }
    })
        .then((movies) => res.status(200).json({ movies }))
        .catch((error: Error) => res.status(500).json({ error }));
};

export default { getMovies };
