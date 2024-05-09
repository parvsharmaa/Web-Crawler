import { Schema, model } from 'mongoose';

const searchSchema = new Schema({
  query: {
    type: String,
    required: true,
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

const Search = model('Search', searchSchema);

export default Search;
