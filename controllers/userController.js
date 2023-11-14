import User from '../models/userModel.js';
import Data from '../models/dataModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import mongoose from 'mongoose';

const ObjectId = mongoose

//@desc     Auth User & Get Token
//@route    POST api/users/login
//@access   Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.json({
      status:true,
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      isAdmin: user.isAdmin,
      userType: user.userType,
      token: generateToken(user._id)
    });

  } else {
    return res.json({
      status:false,
      error:"Invalid email and password"
    });
    
  }
});

//@desc     REGISTER User & Get Token
//@route    POST api/users/register
//@access   Public
const register = asyncHandler(async (req, res) => {
  const { name, email, mobile, password } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('User already Exist');
  }

  const user = await User.create({ name, email, mobile, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});

//@desc     Get all Users
//@route    GET api/users
//@access   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc     Update User Profile
//@route    PUT api/users/profile/:id
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    
    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not Found');
  }
});

//@desc     Send Data to datatbase User & Get Token
//@route    POST api/users/data
//@access   Public
const putdata = asyncHandler(async (req, res) => {
  const { user_id, product, weight, price, location, datetime } = req.body;
  //const userExist = await User.findOne({ email });

  const data = await Data.create({ user_id, product, weight, price, location, datetime });

  if (data) {
    res.status(201).json({
      _id: data._id,
      user_id: data.user_id,
      product: data.product,
      weight: data.weight,
      price: data.price,
      location: data.location,
      datetime: data.datetime,
      token: generateToken(data._id),
    });
    console.log('Data Successfully Inserted into Database');
  } else {
    res.status(400);
    throw new Error('Data not saved');
  }
});

//@desc     Retrive Data from datatbase User & Get Token
//@route    POST api/users/Retrive
//@access   Public
const RetriveAll = asyncHandler(async (req, res) => {
  const datas = await Data.find({});
  res.json(datas);
  console.log('Data Retrived Successfully');
});

const getUserById = asyncHandler(async (req,res) => {
  const userData = await User.find({"_id":req.params.id})
  if(userData){
    res.json({
      status:true,
      data:{
        id:userData[0]._id,
        name:userData[0].name,
        email:userData[0].email,
        mobile:userData[0].mobile
      }
  });
  }else{
    res.json({
      status:false,
      msg:"No Data Found"
    })
  }
  
});
const getAllAgents = asyncHandler(async(req,res)=>{
  const agents = await User.find({userType:2});
  // res.send(agents);
  if(agents){
    res.send(agents);
  }else{
    res.send([]);
  }
});

export { login, register, getUsers, updateUserProfile, putdata, RetriveAll, getUserById, getAllAgents };
