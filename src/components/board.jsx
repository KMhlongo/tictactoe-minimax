import React from 'react'
import Tile from './tile'

const style = {
    borderStyle: "none",
	width: "250px",
    backgroundColor: "white",
	height: "250px",
	display: "grid",
	gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
    boxShadow: "inset 0 0 0 3px #0b4abd",
    margin: "auto"
}

export default function Board(props) {
    return (
        <div style={style}>
            {[ ...Array(9)].map((_, pos) => 
                <Tile key={pos} name={pos} onClick={()=>props.onClick(pos)} value={props.value[pos]}/>
            )}
        </div>)
}