import * as React from 'react'
import { Link } from 'gatsby'
import { 
    container,
    heading,
    navLinkItem,
    navLinkText,
    gamePanel } from './layout.module.css'

const Layout = ({ pageTitle, children }) => {
    return (
        <div className={container}>
            <nav>
                <ul>
                    <li className={navLinkItem}>
                        <Link to="/" className={navLinkText}>
                            Home
                        </Link>
                    </li>      
                    <li className={navLinkItem}>
                        <Link to="/about" className={navLinkText}>
                            About
                        </Link>
                    </li>
                </ul>
            </nav>
            <main>
                <h1 className={heading}>{pageTitle}</h1>
                {children}
            </main>
        </div>
    )
}

const Board = () => {
    var player = 1
    var members = [0,0,0, 0,0,0, 0,0,0]
    var message = ''
    const Panel = ({number}) => 
        <li className={gamePanel}>{number}</li>    
    function move({member}) {            
        if (player === 0) {
            player = 0
            members = [0,0,0, 0,0,0, 0,0,0]
            message = ''
            return 
        }
        members[member] = player        
        if (player === 1) 
            player = 2
        else 
            player = 1        
        if (judge()) {
            if (player === 1) 
                message = 'You win!!'
            else 
                message = 'Com win.'            
        } else {
            var Bool = false
            for (var i in members) {
                if (i !== 0) Bool = true                
            }
            if (Bool) {
                message = 'Draw.'
                player = 0
            }
        }
    } 
    function check({a,b,c}) {
        const p = player
        if (members[a] === p && members[b] === p && members[c] === p) 
            return true 
        else return false        
    } 
    function judge() {
        if (check(0,1,2) || check(3,4,5) || check(6,7,8) ||
            check(0,3,6) || check(1,4,7) || check(2,5,8) ||
            check(0,4,8) || check(2,4,6)) 
            return true
        else return false        
    } 
    return (
        <div>
            <ul>
                <Panel number={members[0]} onClick={()=>move(0)}></Panel>
                <Panel number={members[1]} onClick={()=>move(1)}></Panel>
                <Panel number={members[2]} onClick={()=>move(2)}></Panel>
            </ul>
                <Panel number={members[3]} onClick={()=>move(3)}></Panel>
                <Panel number={members[4]} onClick={()=>move(4)}></Panel>
                <Panel number={members[5]} onClick={()=>move(5)}></Panel>
            <ul>
                <Panel number={members[6]} onClick={()=>move(6)}></Panel>
                <Panel number={members[7]} onClick={()=>move(7)}></Panel>
                <Panel number={members[8]} onClick={()=>move(8)}></Panel>
            </ul>
            <p>{message}</p>
        </div>
    )    
}

export { Layout } 

export default Board