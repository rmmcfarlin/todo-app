import { useState } from 'react'
import { CalendarToolbar } from "./calendar-toolbar"
import { DateTime } from 'luxon'
import { MonthView } from './calendar-views/month-view'

export const CalendarView = ({ domain, setError, setRefreshTrigger, taskData, handlers, taskActionFunctions, selectedTasks }) => {

    const { setCompletedTasks } = taskData
    const { handleTaskMenu, showTaskActions, editTask, setEditTask, cancelEdits } = handlers
    const { handleArchive } = taskActionFunctions
    const [calendarView, setCalendarView] = useState("Month")

    let year = 2025
    let month = 11

    const getDaysInMonth = (year, month) => {

        const startDate = DateTime.fromObject({ year, month, day: 1 })
        const numDays = startDate.daysInMonth

        let dateArray = []
        let startDateDay = startDate.weekday

        for (let i = 0; i < numDays; i++) {
            dateArray.push(startDate.plus({ days: i }))
        }

        return { dateArray, startDateDay }
    }

    console.log(getDaysInMonth(year, month))

    const renderContent = () => {
        if (calendarView === "Month") {
            return <MonthView />
        }
    }

    return(
        <div className="calendarContainer">
            <CalendarToolbar calendarView={calendarView} setCalendarView={setCalendarView} />
            {renderContent()}

        </div>
    )
}