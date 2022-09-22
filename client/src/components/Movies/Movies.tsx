import React, { FormEvent, FunctionComponent, useState } from 'react';
import {
    Table,
    Col,
    Row,
    Button,
    Form
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface MoviesProps { }

interface MoviesState {
    movies: any[];
    error?: string;
}

interface FilersState {
    title: string;
    minRating: number;
}

const Movies: FunctionComponent<MoviesProps> = () => {
    const [state, setState] = useState<MoviesState>({
        movies: [],
        error: undefined
    });
    // default filters
    const [filters, setFilters] = useState<FilersState>({
        title: '',
        minRating: 0
    });

    const updateState = (key: 'title' | 'minRating', value: string) => {
        setFilters(prevState => ({
            ...prevState,
            [key]: value
        }))
    };
    // validate filter to avoid large data
    const validateFilters = () => {
        if (filters.title.length < 3) {
            return false;
        }
        return true;
    };

    // handle search
    const handleSubmit = async (event: FormEvent) => {
        if (validateFilters()) {
            event.preventDefault();
            event.stopPropagation();
            const { title, minRating } = filters;
            try {
                const reponse: Response = await fetch(`http://localhost:8080/movies?title=${title}&minRating=${minRating}`);
                const responseData = await reponse.json();
                setState(responseData);
            } catch (e: any) {
                setState(prevState => ({
                    ...prevState,
                    movies: [],
                    error: 'Failed to get data from database.'
                }));
            }
        }
    };
    return (
        <>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Control
                            id="title"
                            placeholder="Input fragment of movie title"
                            type="text"
                            onChange={(event: React.ChangeEvent<any>) => {
                                updateState('title', event.target.value)
                            }}
                            minLength={3}
                            required
                        />
                        <Form.Label>Min. Rating: {filters.minRating}</Form.Label>
                        <Form.Range
                            min={0}
                            max={10}
                            onChange={(event: React.ChangeEvent<any>) => {
                                updateState('minRating', event.target.value)
                            }}
                            value={filters.minRating}
                        />
                        <Button type="submit" variant="primary">Search movies</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    {state.error ? (<p>{state.error}</p>) :
                        (
                            state.movies.length > 0 && (
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>IMDB Rating</th>
                                            <th>Year</th>
                                            <th>Awards</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.movies.map((movie, index) => {
                                            return (
                                                <tr key={`row-${index + 1}`}>
                                                    <td>{index + 1}</td>
                                                    <td>{movie.title}</td>
                                                    <td>{movie.imdb.rating}</td>
                                                    <td>{movie.year}</td>
                                                    <td>{movie.awards.wins}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            )
                        )
                    }
                </Col>
            </Row>
        </>
    );
}

export default Movies;
