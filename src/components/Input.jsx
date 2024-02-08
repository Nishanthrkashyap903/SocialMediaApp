import React from 'react'

const Input=React.forwardRef(function Input({
    label,
    labelSize="text-sm",
    className="",
    type="text",
    ...props
},ref) {
    return (
        <div className=' flex justify-center w-full'>
            <div className="mb-6 w-3/4">
                <label htmlFor="email" className={`block my-2  ${labelSize} font-medium  text-gray-900 dark:text-white`}>{label}</label>
                <input type={type} id="email" className={ `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 ${className}  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} {...props} ref={ref} required  />
            </div>
        </div>
    )
})

export default Input