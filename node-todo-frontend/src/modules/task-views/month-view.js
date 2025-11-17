

export const MonthView = ({}) => {

    const getDates = () => {
        let days = []

        for (let i = 0; i < 31; i++ ) {
            days.push(i)
        }
        return days
    }

    const dates = getDates()

    return(
        <div className="calendarContainer">
            {dates.map((day) => {
            return(
                <div key={day} className="dayContainer">
                    <span>{day}</span>
                </div>
            )
        })}
        </div>
    )
}