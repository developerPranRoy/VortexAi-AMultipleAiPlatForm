import { json } from "node:stream/consumers";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";


export const createConversation = async (req, res) => {

    try {
        const userId = req.headers["x-user-id"]
        console.log(userId);
        const conversation = await Conversation.create({
            userId: userId
        })
        return res.status(200).json(conversation)
    } catch (error) {
        return res(500).json({ message: `Create conversation error ${error}` })
    }
}

export const getConversation = async (req, res) => {

    try {
        const userId = req.headers["x-user-id"]
        console.log(userId);
        const conversation = await Conversation.find({
            userId: userId
        })
        return res.status(200).json(conversation)
    } catch (error) {
        return res(500).json({ message: `Get conversation error ${error}` })
    }
}



export const updateConversation = async (req, res) => {
    try {
        const { id, title } = req.body
        const conversation = await Conversation.findById(id, {
            title
        })
        return res.status(200).json(conversation)
    } catch (error) {
        return res(500).json({ message: `Update conversation error ${error}` })
    }
}


export const saveMessage = async (req, res) => {
    try {
        const { conversationId, role, content } = req.body;
        const message = await Message.create({
            conversationId,
            content,
            role
        }).sort({ createdAt: -1 })

        return res.status(200).json(message)
    } catch (error) {
        return res.status(500).json({ message: `saving message error${error}` })
    }

}


export const getMessage = async (req, res) => {
    try {
        const message = await Message.find({
            conversationId: req.params.conversationId
        })
        return res.status(200).json(message)
    } catch (error) {
        return res.status(500).json({ message: `Get message error${error}` })
    }

}