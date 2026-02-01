import './App.css';
import {useEffect, useState} from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";
import ActorsList from "./ActorsList";

function App() {
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState();
    const [loading, setLoading] = useState(true);
    const [addingMovie, setAddingMovie] = useState(false);
    const [editingMovie, setEditingMovie] = useState(false);
    const [actors, setActors] = useState([]);

    const fetchMovies = async () => {
            const response = await fetch(`/movies`);
            if (response.ok) {
                const movies = await response.json();
                setMovies(movies);
            }
         };

    const fetchActors = async () => {
            const response = await fetch(`/actors`);
            if (response.ok) {
                const actors = await response.json();
                setActors(actors);
            }
         };

    useEffect(() => {
        setLoading(true);
        Promise.all([fetchMovies(), fetchActors()])
            .then(() => setLoading(false));
    }, []);

    async function handleAddMovie(movie) {
        const response = await fetch('/movies', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: { 'Content-Type': 'application/json' }
          });
          if (response.ok) {
              setAddingMovie(false);
              fetchMovies();
              fetchActors();
          }
    }

    function openEditMovieForm(selectedMovie) {
        setMovie(selectedMovie);
        setEditingMovie(true)
        setAddingMovie(false);
    }

    async function handleEditMovie(movieDataFrom) {
        const response = await fetch('/movies/' + movie.id, {
            method: 'PUT',
            body: JSON.stringify({ ...movieDataFrom, id: movie.id }),
            headers: { 'Content-Type': 'application/json' }
          });
          if (response.ok) {
              setEditingMovie(false);
              setMovie(null);
              fetchMovies();
              fetchActors();
          }
    }

    async function handleDeleteMovie(movie) {
        const url = '/movies/' + movie.id
        const response = await fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                setMovies(movies.filter(m => m.id !== movie.id))
                fetchMovies();
                fetchActors();
            }
    }

    return (
        <div className="container">
             <h1>My favourite movies to watch</h1>
             {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
                    <div className="lds-ripple"><div></div><div></div></div>
                </div>
            ) : (
             <div className="row">
                <div className="column column-60">
                    {movies.length === 0
                        ? <p>No movies yet. Maybe add something?</p>
                        : <MoviesList movies={movies}
                                      onEditMovie={(m) => openEditMovieForm(m)}
                                      onDeleteMovie={handleDeleteMovie}
                        />}
                    {editingMovie
                        ? <MovieForm movie={movie}
                                     onMovieSubmit={handleEditMovie}
                                     label="Edit movie" buttonLabel="Edit a movie"
                        /> : null}
                    {addingMovie
                        ? <MovieForm onMovieSubmit={handleAddMovie}
                                     label="Add movie" buttonLabel="Add a movie"
                        />
                        : <button onClick={() => setAddingMovie(true)}>Add a movie</button>}
                </div>
                <div className="column column-40">
                    {actors.length === 0
                        ? <p>No actors yet.</p>
                        : <ActorsList actors={actors}
                        />}
                </div>
            </div>
            )}
        </div>
    );
}

export default App;
