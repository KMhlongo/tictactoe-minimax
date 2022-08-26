import React from 'react'

const style ={
    color: "white",
    fontSize: "50px",
    margin: "auto",
    display: "block",
    textAlign: "center"
}

export default function Message(props) {
    return (
        <div style={style}>
            {props.value}
        </div>
    )
}