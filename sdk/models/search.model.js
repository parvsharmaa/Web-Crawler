import { Schema, model } from 'mongoose';

const searchSchema = new Schema({
  query: {
    type: String,
    required: true,
    index: true, // index query field for efficient searches
  },
  userId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

searchSchema.index({ query: 'text' });

const Search = model('Search', searchSchema);

export default Search;
