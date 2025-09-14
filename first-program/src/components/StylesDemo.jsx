import React from 'react'
import { useParams } from 'react-router'

const StylesDemo = () => {

const param = useParams();



    const heading1 = {
        color: 'red',
        backgroundColor: 'blue'
    }
    const heading2 = {
        color: 'green',
        backgroundColor: 'yellow'
    }
    const heading3 = {
        color: 'pink',
        backgroundColor: 'orange'
    }
    return (
        <>
        
            <p style={heading1}>Hello  joy1 </p>
            <p style={heading2} >Hello  joy 2</p>
            <p style={heading3}>Hello  joy 3</p>
        </>
    )
}

export default StylesDemo;





