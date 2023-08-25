import React, { memo } from 'react'

const Button = ({ style, text, icon, handleOnClick }) => {
    return (
        <button
            type='button'
            className={style ? style : 'py-1 px-4 rounded-l-full rounded-r-full uppercase border bg-transparent'}
            onClick={handleOnClick}
        >
            {text && <span>{text}</span>}
            {icon && <span>{icon}</span>}
        </button>
    )
}

export default memo(Button)