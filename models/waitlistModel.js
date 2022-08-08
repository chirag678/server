// mongoose model for Waitlist
// the Waitlist model has the following fields:
// - email: string
// - createdAt: Date
// - claimed: boolean
// - nft-id: string

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const WaitlistSchema = new Schema({
  email: { type: String, required: true, unique: true, immutable: true },
  createdAt: { type: Date, default: Date.now },
  claimed: { type: Boolean, default: false },
  nftId: { type: String, default: null },
});

var handleE11000 = function (error, res, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    console.log('There was a duplicate key error');
    next(new Error('There was a duplicate key error'));
  } else {
    next();
  }
};

WaitlistSchema.post('save', handleE11000);
WaitlistSchema.post('update', handleE11000);
WaitlistSchema.post('findOneAndUpdate', handleE11000);
WaitlistSchema.post('insertMany', handleE11000);

export default mongoose.model('Waitlist', WaitlistSchema);
