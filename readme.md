# Movie API

A RESTful API for managing and retrieving movie data.

## Features

- Get movie information
- Search movies by title
- Filter by genre and release year
- User authentication
- Rate limiting

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

The API will be available at `http://localhost:3000`

## API Endpoints

- `GET /api/movies` - List all movies
- `GET /api/movies/:id` - Get movie by ID
- `GET /api/movies/search?title=...` - Search movies
- `POST /api/movies` - Create a new movie
- `PUT /api/movies/:id` - Update a movie
- `DELETE /api/movies/:id` - Delete a movie

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=5001
DATABASE_URL=your_database_url
API_KEY=your_api_key
```

## License

MIT
