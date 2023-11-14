import mongoose from 'mongoose';
//import bcrypt from 'bcryptjs';

const dataSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },

    product: {
      type: String,
      required: true,
    },

    weight: {
      type: String,
      required: true,
      default: false,
    },

    price: {
      type: String,
      required: true,
      default: false,
    },

    location: {
      type: String,
      required: true,
      default: false,
    },

    datetime: {
      type: String,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

/*userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});*/

const Data = mongoose.model('Data', dataSchema);
export default Data;
