import mongoose from "mongoose"
import Task from '../models/task.js'
   
   export const searchTasks = async (req,res) => {
    
    const userId = req.user.id
    const searchParams = req.query

    console.log(searchParams)

    const { query, fieldParamValue, typeParamValue, dateType, dateParamValue } = searchParams

  
    const filteredSearch = {
        userId: userId,
        field: {},
        type: {},
        date: {}
    }

    // Field filtering
    if (fieldParamValue === "Title + Notes") {
        filteredSearch.field.$or = [
            { title: { $regex: query, $options: "i" } },
            { notes: { $regex: query, $options: "i" } }
        ]
    } else if (fieldParamValue === "Title Only") {
        filteredSearch.field.title = { $regex: query, $options: "i" }
    } else if (fieldParamValue === "Notes Only") {
        filteredSearch.field.notes = { $regex: query, $options: "i" }
    }
    
    // Task type filtering
    if (typeParamValue === "Todo Tasks Only") {
        filteredSearch.type.$and = [
            { completed: false }, 
            { archived: false }
        ]
    } else if (typeParamValue === "Completed Tasks Only") {
        filteredSearch.type.$and = [
            { completed: true },
            { archived: false }
        ]
    } else if ( typeParamValue === "Todo + Completed") {
       filteredSearch.type = { archived: false}
    } else if ( typeParamValue === "Archived Tasks Only") {
        filteredSearch.type = { archived: true }
    }

    // Task Date Filtering

    if (dateType === "Due:") {
        let dateField = "dueDate"
    } else if (dateType === "Created:") {
        let dateField = "created"
    }


    if (dateParamValue === "Last 7 Days") {
        const lastWeek = new Date()
        lastWeek.setDate(today.getDate() - 7)

        filteredSearch.date = {dateField: {
            $gte: ISODate(dateParamValue),
            $lte: ISODate(lastWeek)
        }}
    } else if (dateParamValue === "Last 30 Days") {
        const lastMonth = new Date()
        lastMonth.setDate(today.getDate() - 30)

        filteredSearch.date = {dateField: {
            $gte: ISODate(dateParamValue),
            $lte: ISODate(lastMonth)
        }}
    } else if (dateParamValue === "Last Year") {
        const lastYear = new Date()
        lastYear.setDate(today.getDate() - 365)

        filteredSearch.date = {dateField: {
            $gte: ISODate(dateParamValue),
            $lte: ISODate(lastYear)
        }}
    }



    console.log(filteredSearch)

    try {
        let result = await Task.find({
            userId: userId, 
            $text: {$search: query}
        })

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