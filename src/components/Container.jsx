import React from 'react'

function Container({children, className}) {
    return (
        <div className={`w-full min-h-screen bg-slate-700 ${className}`}>
            {children}
        </div>
    )
}

export default Container
