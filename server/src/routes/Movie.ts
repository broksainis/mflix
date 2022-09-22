import express from 'express';
import controller from '../controllers/Movie';

const router = express.Router();

router.get('', controller.getMovies);

export = router;
