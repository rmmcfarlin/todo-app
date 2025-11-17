import './month-view.css'

export const MonthView = ({ }) => {

    const getDates = () => {
        let days = []

        for (let i = 1; i < 43; i++) {
            days.push(i)
        }
        return days
    }
    const month = "November"

    const dates = getDates()

    return (
        <div className="calendarWrapper">
            <span className="monthHeader">{month}</span>
            <div className="monthContainer">
                {dates.map((day) => {
                    return (
                        <div key={day} className="dayContainer">
                            <span>{day}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}