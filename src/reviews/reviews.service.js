const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function update(updatedReview) {
  return knex("reviews as r")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then(() => {
      return knex("critics as c")
        .join("reviews as r", "r.critic_id", "c.critic_id")
        .select("*")
        .where({ "r.review_id": updatedReview.review_id });
    })
    .then((data) => data[0])
    .then(addCritic);
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

function list(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movieId })
    .then((reviews) => {
      return reviews.map((review) => {
        return addCritic(review);
      });
    });
}

module.exports = {
  update,
  read,
  delete: destroy,
  list,
};
