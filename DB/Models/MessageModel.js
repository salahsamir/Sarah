import mongoose, { Schema, Types } from 'mongoose'
import { model } from 'mongoose';

const MSSchema = new Schema(
  {
    message: { type: 'string', required: true },
    sender: { type: Types.ObjectId,ref:'User', required: true },
    reciver: { type: Types.ObjectId,ref:'User', required: true },
  },
  { timestamps: true },
)

export const messageModel=mongoose.models.MS||model('MS',MSSchema)