import Board from './board'
import React from 'react'
import {LinesThree} from './lines' 
import {MdOutlineRestartAlt} from "react-icons/md"
import Message from './message'
import {CSSTransition} from 'react-transition-group'

function isWinner(board) {
    let result = ""
    LinesThree.forEach(element => {
        let [a, b, c] = [...element.map(pos => board[pos])];
        if (![a, b, c].includes("")) {
            if (![a,b,c].includes("O")) { 
                result = ("X")
            } else if (![a,b,c].includes("X")) { 
                result = ("O")
            }
        }
    });
    return(result) 
}

function miniMax(boardCopy, depth, isComputer) {
    if (isWinner(boardCopy) === "O") {
        return {pos: -1, value:(10-depth)}
    } else if (isWinner(boardCopy) === "X") {
        return {pos: -1, value:(depth-10)}
    } else if (boardCopy.indexOf("") === -1) {
        return {pos: -1, value: 0}
    }

    if (isComputer) {
        let bestValue = {pos: -1, value: -Infinity}
            for (let i = 0; i < 9; i++) {
                if (boardCopy[i] === "") {
                    boardCopy[i] = "O" 
                    let value = miniMax(boardCopy, depth+1, false)
                    if (value.value > bestValue.value) { 
                        bestValue.pos = i
                        bestValue.value = value.value
                    }
                    boardCopy[i] = "";
                } 
            }
        return bestValue
    }

    if (!isComputer) {
        let worstValue = {pos: -1, value: Infinity}
        for (let i = 0; i < 9; i++) {
            if (boardCopy[i] === "") {
                boardCopy[i] = "X"
                let value = miniMax(boardCopy, depth+1, true)
                if (value.value < worstValue.value) {
                    worstValue.pos = i
                    worstValue.value = value.value
                }
                boardCopy[i] = "";
            }
        }
        return worstValue
    }
}

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {board: Array(9).fill(""),
                        player: "X", 
                        result: "",
                        visible: true,
                        message: ""}
        this.handleClick = this.handleClick.bind(this);
        this.restart = this.restart.bind(this);
    }

    componentDidUpdate() {
        var result = isWinner(this.state.board)

        if (!this.state.board.includes("") && this.state.player !== "") {
            setTimeout(() => {this.setState({player: "", visible: false, message: "draw!"})}
            ,1000)  
        } else if(result === "O" && this.state.player !== "") {
            setTimeout(()=>{this.setState({player: "", visible: false, message: "O is the winner!"})}
            ,1000)
        } else if (this.state.player === "O") {
            let pos = miniMax(this.state.board, 0, true).pos
            setTimeout(() => { this.setState({board: this.state.board.map((item, index) => index === pos ? "O" : item),
                    player: "X"})
                    }, 1000);
        } 
    }

    handleClick(e) {
        if (this.state.board[e] === "" && isWinner(this.state.board) !== "O") {
            this.setState({board: this.state.board.map((item, index) => 
                index === e ? this.state.player : item),player: "O"})
        } 
    }

    restart() {
        this.setState({board: Array(9).fill(""),
            player: "X" ,
            visible: true, 
            message: ""})
    }

    render() {
        return (
            <div className="Screen">
                <CSSTransition in={!this.state.visible} timeout={1000} classNames="message" unmountOnExit>
                    <Message className="Message" value={this.state.message} />
                </CSSTransition>
                {this.state.visible && <Board value={this.state.board} onClick={this.handleClick}/>}
                <MdOutlineRestartAlt className="Icon" onClick={this.restart}/>
            </div>
        )
    }
}