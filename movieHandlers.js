const db = require('./db');

const getMovies = (req, res) => {
  db.query("select * from movies").then(([movies]) => {
    res.json(movies);
  }) .catch((err) => {
    console.error(err);
    res.status(500).send("Internal server error");
  })
}

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  db.query("select * from movies where id = ?", [id]).then(([movie]) => {
    console.log(movie);
    if(movie.length != 0) {
      res.json(movie);
    } else {
      res.status(404).send('Movie not found');
    }
  }) .catch((err) => {
    res.status(500).send(err);
  })
}

const createMovie = (req, res) => {
  const {title, director, year, color, duration} = req.body;
  db.query("insert into movies(title, director, year, color, duration) values (?, ?, ?, ?, ?)", [title, director, year, color, duration]).then(([result]) => {
    res.location(`/api/movies/${result.insertId}`).sendStatus(201);

  }).catch((err) => {
    console.error(err);
    res.status(500).send("Internal server error");
  })
}

const modifyMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const {title, director, year, color, duration} = req.body;
  db.query("update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?", [title, director, year, color, duration, id]).then(([result]) => {
    if(result.affectedRows === 0) {
      res.status(404).send("Movie not found");
    } else {
      res.sendStatus(204);
    }
  }).catch((err) => {
    console.error(err);
    res.status(500).send("Internal server error");
  })
}


module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  modifyMovie
};
