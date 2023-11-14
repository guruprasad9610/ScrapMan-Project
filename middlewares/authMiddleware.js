import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, "abc123");

      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = (req, res, next) => {
  
  if (req.user && req.user.isAdmin) {
    // res.send(req.user.isAdmin);
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

const agent = (req, res, next) => {
  if(req.user.userType == 2){
    // res.send(req);
    next();
  }else{
    res.status(401);
    throw new Error('You are not authorized');
  }
};

export { protect, admin, agent };
