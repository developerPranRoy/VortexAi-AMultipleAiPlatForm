import express from 'express';
import { createConversation, getConversation, getMessage, saveMessage, updateConversation } from '../controllers/chat.controller';

const router = express.Router();

router.get("/create-conversation", createConversation)
router.post("/update-conversation", updateConversation)
router.get("/get-conversation", getConversation)
router.post("/save-message", saveMessage)
router.get("/get-message/:conversationId", getMessage)