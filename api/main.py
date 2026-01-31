from fastapi import FastAPI, Body
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Any
import sqlite3
import time

class Movie(BaseModel):
    title: str
    year: str
    actors: list[str]


app = FastAPI()

app.mount("/static", StaticFiles(directory="../ui/build/static", check_dir=False), name="static")


@app.get("/")
def serve_react_app():
    return FileResponse("../ui/build/index.html")


@app.get('/movies')
def get_movies():
    db = sqlite3.connect('movies.db')
    cursor = db.cursor()
    movies = cursor.execute('SELECT * FROM movies')
    time.sleep(3) # mimic loading to trigger spinner in frontend
    output = []
    for movie in movies:
        movie = {'id': movie[0], 'title': movie[1], 'year': movie[2], 'actors': movie[3]}
        output.append(movie)
    return output


@app.get('/movies/{movie_id}')
def get_single_movie(movie_id: int):  # put application's code here
    db = sqlite3.connect('movies.db')
    cursor = db.cursor()
    movie = cursor.execute(f"SELECT * FROM movies WHERE id={movie_id}").fetchone()
    if movie is None:
        return {'message': "Movie not found"}
    return {'title': movie[1], 'year': movie[2], 'actors': movie[3]}


@app.post("/movies")
def add_movie(movie: Movie):
    flat_actors = ", ".join(movie.actors)
    db = sqlite3.connect('movies.db')
    cursor = db.cursor()
    cursor.execute(
        f"INSERT INTO movies (title, year, actors) VALUES ('{movie.title}', '{movie.year}', '{flat_actors}')")
    db.commit()
    return {
        "message": f"Movie with id = {cursor.lastrowid} added successfully",
        "id": cursor.lastrowid
    }


@app.put("/movies/{movie_id}")
def update_movie(movie_id: int, params: dict[str, Any]):
    db = sqlite3.connect('movies.db')
    cursor = db.cursor()
    cursor.execute(
        "UPDATE movies SET title = ?, year = ?, actors = ? WHERE id = ?",
        (params['title'], params['year'], params['actors'], movie_id)
    )
    db.commit()
    if cursor.rowcount == 0:
        return {"message": f"Movie with id = {movie_id} not found"}
    return {"message": f"Movie with id = {cursor.lastrowid} updated successfully"}


@app.delete("/movies/{movie_id}")
def delete_movie(movie_id: int):
    db = sqlite3.connect('movies.db')
    cursor = db.cursor()
    cursor.execute("DELETE FROM movies WHERE id = ?", (movie_id,))
    db.commit()
    if cursor.rowcount == 0:
        return {"message": f"Movie with id = {movie_id} not found"}
    return {"message": f"Movie with id = {movie_id} deleted successfully"}


@app.delete("/movies")
def delete_movies():
    db = sqlite3.connect('movies.db')
    cursor = db.cursor()
    cursor.execute("DELETE FROM movies")
    db.commit()
    return {"message": f"Deleted {cursor.rowcount} movies"}


@app.get('/actors')
def get_movies():
    db = sqlite3.connect('movies.db')
    cursor = db.cursor()
    movies = cursor.execute('SELECT actors FROM movies')
    result = sorted({name for row in movies for name in row[0].split(', ') if name})
    response_body = [{'name': actor} for actor in result]
    return response_body
