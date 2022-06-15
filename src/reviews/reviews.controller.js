const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(Number(reviewId));
  res.locals.review = review;
  if (review) {
    return next();
  }
  return next({ status: 404, message: "Review cannot be found" });
}

async function update(req, res) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
  };
  const data = await service.update(updatedReview);
  res.json({ data });
}

async function destroy(req, res) {
  const { review } = res.locals;
  await service.delete(review.review_id);
  res.sendStatus(204);
}

async function list(req, res) {
  const { movieId } = req.params;
  const data = await service.list(movieId);
  res.json({ data });
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  list: [asyncErrorBoundary(list)],
};
