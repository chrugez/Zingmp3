import React from 'react'

const Button = ({ style, text }) => {
    return (
        <button
            type='button'
            className={style ? style : 'py-1 px-4 rounded-l-full rounded-r-full uppercase border bg-transparent'}
        >
            {text}
        </button>
    )
}

export default Button