import mongoose from 'mongoose';

const MessageSchema = {
  text: { type: String, required: true },
  author: String,
  createdAt: { type: Date, default: Date.now() }
};

const MemberSchema = new mongoose.Schema({
  email: { type: String, required: true },
  role: { type: String, required: true }
});

const RoomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creator: { type: String, required: true },
  members: [MemberSchema],
  messages: [MessageSchema],
  description: String,
});

export default mongoose.model('Room', RoomSchema);