import express from 'express';
import {signupUser,loginUser} from '../Controllers/user-controller.js'
import { uploadImage } from '../Controllers/image-controller.js';
import upload from '../utils/upload.js';
import { createPost,getAllPosts,getPost, updatePost,deletePost} from '../Controllers/post-controller.js';
import { authenticateToken } from '../Controllers/jwt-controller.js';
import { newComment,getComments,deleteComment } from '../Controllers/comment-controller.js';

const router=express.Router();

router.post("/signup",signupUser);
router.post("/login",loginUser);
router.post('/file/upload',upload.single('file'),uploadImage);

router.post('/create',authenticateToken,createPost);
router.get('/posts',authenticateToken,getAllPosts);
router.get('/post/:id',authenticateToken,getPost);
router.put('/update/:id',authenticateToken,updatePost);
router.delete("/delete/:id",authenticateToken,deletePost);
router.post("/comment/new",authenticateToken,newComment);

router.get('/comments/:id',authenticateToken,getComments);
router.delete("/comment/delete/:id",authenticateToken,deleteComment);

export default router;