import React from 'react'

const style ={
    color: "white",
    fontSize: "50px"
}

export default function Message(props) {
    return (
        <div style={style}>
            {props.value}
        </div>
    )
}