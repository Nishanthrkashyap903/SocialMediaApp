import React from 'react'

function Button(
    {
        className,
        ...props 
    }
) {
    return (
        <div className={`${className}`}>
            <button
                {...props}
                className="rounded-full bg-black px-3 w-1/12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
                Save
            </button>
        </div>
    )
}

export default Button