import { useState } from 'react'
import { ReactComponent as CarrotIcon } from '../../assets/down-arrow.svg'
import { OptionSwitch } from '../ui-components/option-switch/option-switch'

export const CalendarToolbar = ({ calendarView, setCalendarView }) => {
    

    const calendarOptions = [
        "Month",
        "Week",
        "Day"
    ]

    const getCurrentValue = () => {
        if (calendarView === "Month") {
            return "This Month"
        } else if (calendarView === "Week") {
            return "This Week"
        } else if (calendarView === "Day") {
            return "Today"
        }
    }

    return (
        <div className="calendarToolbarMain">
            <OptionSwitch options={calendarOptions} selectedOption={calendarView} setSelectedOption={setCalendarView} buttonClass="calendarViewButton" containerClass="calendarViewSwitch" />
            <div className="dateSelectContainer">
                <button className="dateSelectButton dateSelectLeft">
                    <CarrotIcon className='previousArrow' />
                </button>
                <button className="dateSelectButton">
                    <span>{getCurrentValue()}</span>
                </button>
                <button className="dateSelectButton dateSelectRight">
                    <CarrotIcon className='nextArrow' />
                </button>
            </div>
        </div>
    )
}