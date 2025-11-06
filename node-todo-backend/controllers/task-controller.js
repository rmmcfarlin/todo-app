import mongoose from "mongoose"
import Task from '../models/task.js'
   
   export const searchTasks = async (req,res) => {
    
    const {query} = req.query
    const userId = req.user.id
    

    try {
        let result = await Task.find({
            userId: userId, 
            $text: {$search: query}
        })

        console.log('searched')

        if (!result) {
            result = await Task.find({
                userId: userId,
                title: { $regex: query, $options: i }
            })
        }

        res.json(result)
    } catch {
        return res.status(500).json({ error: "Search failed"})
    }
   }