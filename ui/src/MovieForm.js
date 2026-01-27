import {useState} from "react";

export default function MovieForm(props) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [director, setDirector] = useState('');
    const [description, setDescription] = useState('');
    const [actors, setActors] = useState([]);
    const [actor, setActor] = useState('');

    function addMovie(event) {
        event.preventDefault();
        if (title.length < 5) {
            return alert('Tytuł jest za krótki');
        }
        props.onMovieSubmit({title, year, director, description, actors});
        setTitle('');
        setYear('');
        setDirector('');
        setDescription('');
        setActors([]);
        setActor('');
    }

    function handleAddActor(event) {
        event.preventDefault();
        if (actor.trim() !== '') {
            setActors([...actors, actor]);
            setActor('');
        }
    }

    return <form onSubmit={addMovie}>
        <h2>Add movie</h2>
        <div>
            <label>Tytuł</label>
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
        <div>
            <label>Actors</label>
            <input type="text" value={actor} onChange={(event) => setActor(event.target.value)}/>
            <button onClick={handleAddActor}>Add actor</button>
            <ul>
                {actors.map((a, index) => <li key={index}>{a}</li>)}
            </ul>
        </div>
        <button>{props.buttonLabel || 'Submit'}</button>
    </form>;
}
