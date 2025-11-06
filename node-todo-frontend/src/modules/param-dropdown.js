
export const ParamDropdown = ({ params, setValue, className }) => {

    const handleClick = (param) => {
        setValue(param)
    }

    return(
        <div className={className}>
              {params.map(param => {
            return(
                <span className="paramOption" key={param} onClick={() => setValue(param)}>{param}</span>
            )   
        })
      }
        </div>
    )
}