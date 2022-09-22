import { NextFunction, Request, Response } from 'express';
import Movie from '../models/Movie';

const getMovies = (req: Request, res: Response, next: NextFunction) => {
    return Movie.find()
        .then((movies) => res.status(200).json({ movies }))
        .catch((error: Error) => res.status(500).json({ error }));
};

export default { getMovies };
