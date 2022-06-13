const knex = require("../db/connection");

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function update(updatedReview) {
  return knex("reviews as r")
    .select("*")
    .where({ "r.review_id": updatedReview.review_id })
    .update(updatedReview, "*")
    .then((reviews) => reviews[0]);
}

module.exports = {
  update,
  read,
};
