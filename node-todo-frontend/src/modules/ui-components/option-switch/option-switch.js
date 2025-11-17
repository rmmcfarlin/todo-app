import './option-switch.css'
import { useState } from 'react'

export const OptionSwitch = ({ options, selectedOption, setSelectedOption, buttonClass, containerClass }) => {

    const getSwitchClass = (option) => {
        if (selectedOption === option) {
            return "active"
        }
        else {
            return "inactive"
        }
    }

    const handleShowOption = (option) => {
        setSelectedOption(option)
    }

    return (
        <div className={`optionSwitch ${containerClass}`}>
            {options.map((option) => {
                return (
                    <button key={option} className={`switchButton ${buttonClass} ${getSwitchClass(option)}`} onClick={() => handleShowOption(option)}>
                        {option}
                    </button>
                )
            })
            }
        </div>
    )
}