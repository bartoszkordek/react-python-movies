# 🎬 Movie Management App

A full-stack web application for managing a collection of favorite movies, featuring a **FastAPI** backend and a **React** frontend.

## 🚀 Live Demo
You can view the deployed project here: [react-python-movies-e5xl.onrender.com](https://react-python-movies-e5xl.onrender.com)

## 🛠️ Tech Stack

- **Backend:** Python, [FastAPI](https://fastapi.tiangolo.com), SQLite3, Pydantic.
- **Frontend:** React.js, [Milligram CSS](https://milligram.io), React-Toastify.

## ✨ Features

### Frontend
*   **Movie Management:** Full capability to **add, edit (title, year, actors), and delete** movies.
*   **Actor Management:** Functionality to add actors to movies and a dedicated view to display a unique, sorted list of all actors.
*   **UI/UX Elements:** 
    *   **Loading Spinner:** A visual indicator (CSS ripple) that triggers while fetching data from the API.
    *   **Error Handling:** Basic error handling implementation that displays descriptive error messages via toast notifications if a request fails.

### Backend
*   **Robust Validation:** Includes server-side **Date Validation** to ensure movie years are numeric and fall between 1888 and the current year.
*   **RESTful API:** Clean endpoints for CRUD operations on a SQLite database.
*   **Data Processing:** Automatic extraction and sorting of unique actors from movie entries.

## 🛣️ API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/movies` | Retrieves all movies (includes simulated delay for spinner). |
| `POST` | `/movies` | Adds a new movie (validates year). |
| `PUT` | `/movies/{id}` | Updates an existing movie. |
| `DELETE` | `/movies/{id}` | Deletes a specific movie. |
| `GET` | `/actors` | Returns a sorted list of unique actors. |

## 🔧 Local Setup

1.  **Clone the repository.**
2.  **Backend Setup:**
    ```bash
    # Navigate to backend directory
    cd api
    # Install dependencies
    pip install fastapi uvicorn pydantic
    # Run the server
    uvicorn main:app --reload
    ```
3.  **Frontend Setup:**
    ```bash
    # Navigate to frontend directory
    cd ui
    # Install dependencies
    npm install
    # Builds assets for deployment
    npm run build
    ```

---
*This project demonstrates a seamless integration between a Python REST API and a modern React user interface.*
