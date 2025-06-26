import React from 'react'
import './ComponentCss/Container.css'

function Container({children, className}) {
    return (
        <div id='cont' className={`w-full min-h-screen bg-slate-600 ${className}`}>
            {children}
        </div>
    )
}

export default Container
