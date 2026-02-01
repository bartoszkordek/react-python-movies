import {useEffect, useState} from "react";

export default function MovieForm(props) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [director, setDirector] = useState('');
    const [description, setDescription] = useState('');
    const [actors, setActors] = useState([]);
    const [actor, setActor] = useState('');

    useEffect(() => {
        if (props.movie) {
            setTitle(props.movie.title || '');
            setYear(props.movie.year || '');
            setDirector(props.movie.director || '');
            setDescription(props.movie.description || '');
            if (typeof props.movie.actors === 'string') {
                const movieActors = props.movie.actors
                    .split(',')
                    .map(a => a.trim())
                    .filter(a => a !== '');
                setActors(movieActors);
            } else {
            setActors(Array.isArray(props.movie.actors) ? props.movie.actors : []);
            }
        }
    }, [props.movie]);

    function handleSubmit(event) {
        event.preventDefault();
        if (title.length < 5)
            return alert('Tytuł jest za krótki');

        props.onMovieSubmit({ title, year, director, description, actors });

        if (!props.movie) {
            setTitle('');
            setYear('');
            setDirector('');
            setDescription('');
            setActors([]);
        }
    }

    function handleAddActor(event) {
        event.preventDefault();
        if (actor.trim() !== '') {
            setActors([...actors, actor]);
            setActor('');
        }
    }

    return <form>
        <h2>{props.movie ? 'Edit movie' : 'Add movie'}</h2>
        <div>
            <label>Title</label>
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
        </div>
        <div>
            <label>Year</label>
            <input type="text" value={year} onChange={(event) => setYear(event.target.value)}/>
        </div>
        <div>
            <label>Director</label>
            <input type="text" value={director} onChange={(event) => setDirector(event.target.value)}/>
        </div>
        <div>
            <label>Description</label>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)}/>
        </div>
        {!props.movie && (
            <div>
                <label>Actors</label>
                <input type="text" value={actor} onChange={(event) => setActor(event.target.value)}/>
                <button onClick={handleAddActor}>Add actor</button>
                <ul>
                    {actors.map((actor, index) => <li key={index}>{actor}</li>)}
                </ul>
            </div>
            )}
        <button type="button" onClick={handleSubmit}>{props.buttonLabel || 'Submit'}</button>
    </form>;
}
