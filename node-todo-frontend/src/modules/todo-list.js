import { React } from 'react'
import { useState, useEffect } from 'react'

const TodoList = () => {


    return (
        <div className="listContainer">
            <div className="itemContainer">
                <form>
                    <input type="checkbox"></input>
                </form>
                <div>
                    <div className="itemHeader">
                        <span className="todoItem">Todo Item</span>
                        <div>
                            <span className="label">Due: </span><span>13th October 2025</span>
                        </div>
                    </div>
                    <div>
                        <span className="label">Notes: </span><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                    </div>
                    </div>
            </div>
        </div>
    )
}

export default TodoList