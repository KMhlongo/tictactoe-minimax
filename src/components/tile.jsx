import React from 'react'

const style = {
    borderStyle: "none",
    borderColor: "#0b4abd",
    fontSize: "50px",
    backgroundColor: "#0b4abd",
    color: "white",
}

export default function Tile(props) {
return <button style={style} name={props.name} onClick={props.onClick}>{props.value}</button>
} 



