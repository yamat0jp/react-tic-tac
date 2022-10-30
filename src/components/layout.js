import * as React from 'react'
import { collectedScriptsByPage, Link } from 'gatsby'
import { 
    container, heading, navLinkItem, navLinkText,
    gamePanel } from './layout.module.css'

const Layout = ({ pageTitle, children }) => {
    return (
        <div className={container}>
            <nav>
                <ul>
                    <li className={navLinkItem}>
                        <Link to="/" className={navLinkText}>
                            <p>Home</p>
                        </Link>
                    </li>      
                    <li className={navLinkItem}>
                        <Link to="/about" className={navLinkText}>
                            <p>About</p>
                        </Link>
                    </li>
                </ul>
            </nav>
            <main>
                <h1 className={heading}>{pageTitle}</h1>
                <p>{children}</p>
            </main>
        </div>
    )
}

const Board = () => {
    const [player, setPlayer] = React.useState(1)
    const [members, setMembers] = React.useState([0,0,0, 0,0,0, 0,0,0])
    const [message, setMessage] = React.useState('start')    
    function display(index) {              
        switch(members[index]) {                        
            case(1): 
                return 'O'                
            case(2): 
                return 'X'                              
            default:
                return '?'                
        }                        
    }
    function check(a,b,c) {
        const p = player 
        if (members[a] === p && members[b] === p && members[c] === p) {            
            return true 
        } else return false        
    } 
   function judge() {
        if (check(0,1,2) || check(3,4,5) || check(6,7,8) ||
            check(0,3,6) || check(1,4,7) || check(2,5,8) ||
            check(0,4,8) || check(2,4,6)) {            
            return true
        } else return false        
    } 
    function move(index) {          
        if (player === 0) {
            setPlayer(1)
            setMembers([0,0,0, 0,0,0, 0,0,0])
            setMessage('restart')            
            return 
        }        
       if (members[index] !== 0)             
            return                
        var dataCopy = members
        dataCopy[index] = player
        setMembers(dataCopy)         
        if (judge()) {                    
            if (player === 1) 
                setMessage('You win!!')
            else 
                setMessage('Com win.')            
            setPlayer(0)    
            return        
        } else {            
            var Bool = false
            for (const i in dataCopy) {
                if (dataCopy[i] === 0) Bool = true                                
            }            
            if (!Bool) {
                setMessage('Draw.')
                setPlayer(0)      
                return          
            }            
        }      
        if (player === 1) 
            setPlayer(2)
        else
            setPlayer(1)
    }
    return (
        <div className={container}>
            <button className={gamePanel} onClick={()=>move(0)}>{display(0)}</button> 
            <button className={gamePanel} onClick={()=>move(1)}>{display(1)}</button> 
            <button className={gamePanel} onClick={()=>move(2)}>{display(2)}</button> 
            <br />            
            <button className={gamePanel} onClick={()=>move(3)}>{display(3)}</button> 
            <button className={gamePanel} onClick={()=>move(4)}>{display(4)}</button> 
            <button className={gamePanel} onClick={()=>move(5)}>{display(5)}</button> 
            <br />
            <button className={gamePanel} onClick={()=>move(6)}>{display(6)}</button> 
            <button className={gamePanel} onClick={()=>move(7)}>{display(7)}</button> 
            <button className={gamePanel} onClick={()=>move(8)}>{display(8)}</button> 
            <p>{message}</p>
        </div>
    )    
}

export default Board

export { Layout } 