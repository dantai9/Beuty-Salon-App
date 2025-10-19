import React from 'react';
import './ReviewList.css';

const ReviewList = ({ reviews }) => (
  <section className="review-list">
    {reviews.map((review) => (
      <article className="review-card" key={review._id}>
        <header>
          <h4>{review.client?.name || 'GlowUp Guest'}</h4>
          <span className="rating">{review.rating}★</span>
        </header>
        <p>{review.comment}</p>
        <footer>
          <small>{new Date(review.createdAt).toLocaleDateString()}</small>
          {review.visitDate && <small>Visited: {new Date(review.visitDate).toLocaleDateString()}</small>}
        </footer>
      </article>
    ))}
    {reviews.length === 0 && <p className="empty">No reviews yet. Be the first to share your experience.</p>}
  </section>
);

export default ReviewList;
