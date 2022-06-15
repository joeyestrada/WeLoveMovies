const knex = require("../db/connection");

function list() {
  return knex("movies_theaters as mt")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("m.*", "mt.*")
    .where({ "mt.is_showing": true })
    .then(() => {

    })
}

module.exports = {
  list,
};

// select *
// from theaters t
// join movies_theaters mt
// on t.theater_id = mt.theater_id
// join movies m
// on m.movie_id = mt.movie_id
// where mt.is_showing = true

// .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
//     .join("movies as m", "mt.movie_id", "m.movie_id")
//     .select("t.*", "m.*", "mt.*")
//     .where({"mt.is_showing": true})
