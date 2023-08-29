import mongoose, { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
    confiremEmail:{
      type:Boolean,
      default:false
    },
    age: { type: Number },
  
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: 'male',
    },
    phone: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status:{
      type: String,
      enum:['offline', 'online'],
      default: 'offline',

    }
  },
  {
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    timestamps: true,
  },
)
userSchema.virtual('Message', {
  ref: 'MS',
  localField: '_id',
  foreignField: 'reciver',

});
export const UserModel = mongoose.models.User || model('User', userSchema)
