const service = require("./movies.service");

async function checkParams(req, res, next) {
  const { is_showing } = req.query;
  if (is_showing) {
    const data = await service.listShowingMovies();
    res.locals.movies = data;
  } else {
    const data = await service.list();
    res.locals.movies = data;
  }
  next();
}

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404 });
}

async function list(req, res) {
  const data = res.locals.movies;
  res.json({ data });
}

async function read(req, res) {
  res.json({ data: res.locals.movie });
}

module.exports = {
  list: [checkParams, list],
  read: [movieExists, read],
};
