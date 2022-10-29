import * as React from 'react'
import { Link } from 'gatsby'
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

const Panel = ({player}) => {       
    function display(p) {              
        switch(p) {                        
            case(1): 
                return 'O'                
            case(2): 
                return 'X'                              
            default:
                return null                
        }                        
    }
    return <button className={gamePanel}>{display(player)}</button> 
}

const Board = () => {
    const [player, setPlayer] = React.useState(1)
    const [members, setMembers] = React.useState([0,0,0, 0,0,0, 0,0,0])
    const [message, setMessage] = React.useState(null)
    function check({a,b,c}) {
        const p = player
        if (members[a] === p && members[b] === p && members[c] === p) 
            return true 
        else return false        
    } 
    function judge() {
        if (check(0,1,2) || check(3,4,5) || check(6,7,8) ||
            check(0,3,6) || check(1,4,7) || check(2,5,8) ||
            check(0,4,8) || check(2,4,6)) {            
            return true
        } else return false        
    } 
    function move(index) {         
        if (members[index] !== 0)             
            return        
        var dataCopy = members
        dataCopy[index] = player
        setMembers(dataCopy)         
        if (player === 0) {
            setPlayer(1)
            setMembers([0,0,0, 0,0,0, 0,0,0])
            setMessage(null)
            return 
        }
        if (player === 1) 
            setPlayer(2)
        else 
            setPlayer(1)        
        if (judge()) {
            if (player === 1) 
                setMessage('You win!!')
            else 
                setMessage('Com win.')            
        } else {
            var Bool = false
            for (var i in dataCopy) {
                if (i === 0) Bool = true                
            }
            if (Bool) {
                setMessage('Draw.')
                setPlayer(0)                
            }            
        }           
    }
    return (
        <div className={container}>
            <Panel player={members[0]} onClick={()=>move(0)}></Panel>
            <Panel player={members[1]} onClick={()=>move(1)}></Panel>
            <Panel player={members[2]} onClick={()=>move(2)}></Panel>
            <br />            
            <Panel player={members[3]} onClick={()=>move(3)}></Panel>
            <Panel player={members[4]} onClick={()=>move(4)}></Panel>
            <Panel player={members[5]} onClick={()=>move(5)}></Panel>
            <br />
            <Panel player={members[6]} onClick={()=>move(6)}></Panel>
            <Panel player={members[7]} onClick={()=>move(7)}></Panel>
            <Panel player={members[8]} onClick={()=>move(8)}></Panel>            
            <p>{message}</p>
        </div>
    )    
}

export default Board

export { Layout } 