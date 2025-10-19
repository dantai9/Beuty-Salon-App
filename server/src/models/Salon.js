import mongoose from 'mongoose';

const pricingSchema = new mongoose.Schema(
  {
    service: { type: String, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const salonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    city: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    coverImage: { type: String },
    gallery: [{ type: String }],
    services: [pricingSchema],
    amenities: [{ type: String }],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    location: {
      lat: Number,
      lng: Number,
    },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Salon', salonSchema);
