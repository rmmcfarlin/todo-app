import mongoose, { get } from "mongoose"
import Task from '../models/task.js'


// GET 
export const getTasks = async (req,res) => {

    const userId = req.user.id
    const getParams = req.query

    let { viewCount, completed, archived, sortMethod } = getParams

    const parseBool = (param) => {
        if (param === "true") return true
        if (param === "false") return false
        return undefined
    }

    viewCount = parseInt(viewCount)
    completed = parseBool(completed)
    archived = parseBool(archived)

    if (viewCount === "All") viewCount = 0

    const requestedTasks = {
        userId: userId,
        completed: completed,
        archived: archived
    }

    //Set sort parameter
    let sortParam 

    switch (sortMethod) {
        case "dueSoonest":
            sortParam = { dueDate: 1 };
            break;
        case "dueLatest":
            sortParam = { dueDate: -1 };
            break;
        case "createdNewest":
            sortParam = { created: 1 };
            break;
        case "createdOldest":
            sortParam = { created: -1 }
    }

    try {
        const result = await Task.find(requestedTasks)
            .limit(viewCount)
            .sort(sortParam)

        return res.status(201).json(result)

    } catch {
        return res.status(500).json({ error: "Unable to fetch tasks"})
    }

}


// Search
export const searchTasks = async (req,res) => {
    
    const userId = req.user.id
    const searchParams = req.query

    const { query, fieldParamValue, typeParamValue, dateType, dateParamValue } = searchParams
  
    const filteredSearch = {
        userId: userId,
    }
    const conditions = []



    // Field filtering
    if (fieldParamValue === "Title + Notes") {
        conditions.push({
            $or: [
            { title: { $regex: query, $options: "i" } },
            { notes: { $regex: query, $options: "i" } }
    ]})
    } else if (fieldParamValue === "Title Only") {
        conditions.push({ title: { $regex: query, $options: "i" }})
    } else if (fieldParamValue === "Notes Only") {
        conditions.push({ notes: { $regex: query, $options: "i" } })
    }
    
    // Task type filtering
    if (typeParamValue === "Todo Tasks Only") {
        conditions.push({ $and: [
            { completed: false }, 
            { archived: false }
        ]})
    } else if (typeParamValue === "Completed Tasks Only") {
       conditions.push({ $and: [
            { completed: true }, 
            { archived: false }
        ]})
    } else if ( typeParamValue === "Todo + Completed") {
       conditions.push({ archived: false})
    } else if ( typeParamValue === "Archived Tasks Only") {
        conditions.push({ archived: true })
    }

    // Task Date Filtering

    let dateField
    if (dateType === "Due:") {
        dateField = "dueDate"
    } else if (dateType === "Created:") {
        dateField = "created"
    }

    const today = new Date()
    let rangeStart

    if (dateParamValue === "Last 7 Days") {
        rangeStart = new Date(today)
        rangeStart.setDate(today.getDate() - 7)
    } else if (dateParamValue === "Last 30 Days") {
        rangeStart = new Date(today)
        rangeStart.setDate(today.getDate() - 30)
    } else if (dateParamValue === "Last Year") {
        rangeStart = new Date(today)
        rangeStart.setDate(today.getDate() - 365)
    }

    if (rangeStart) {
        conditions.push({
            [dateField]: { $gte: rangeStart, $lte: today}
        })
    }

    if (conditions.length > 0) {
        filteredSearch.$and = conditions
    }

    try {
        let result = await Task.find(filteredSearch)

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

