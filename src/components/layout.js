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

const Board = () => {
    const [player,setPlayer] = React.useState(1)
    const [members,setMembers] = React.useState([0,0,0, 0,0,0, 0,0,0])    
    const [message,setMessage] = React.useState('start')        
    var dataCopy;
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
    function check(p,a,b,c) {        
        if (members[a] === p && members[b] === p && members[c] === p) {            
            return true 
        } else return false        
    } 
   function judge(local) {
        if (check(local,0,1,2) || check(local,3,4,5) || check(local,6,7,8) ||
            check(local,0,3,6) || check(local,1,4,7) || check(local,2,5,8) ||
            check(local,0,4,8) || check(local,2,4,6)) {            
            return true
        } else return false
    } 
    function isEmpty() {
        let test = false
        for (const i in members) {
            if (members[i] === 0) 
                test = true
        }           
        return test
    }
    function winner(pn) {
        let msg = message;
        if (judge(pn)) {
            setPlayer(0)
            if (pn === 1)
                msg = 'You win!!'
            else
                msg = 'Com win.'        
            setMessage(msg)
            return true
        }
        if (!isEmpty()) {
            setPlayer(0)
            setMessage('Draw.')
            return true
        }
        return false
    }
    function move(pn,index) {                              
        if (player === 0) {            
            setPlayer(1)
            setMembers([0,0,0, 0,0,0, 0,0,0])
            setMessage('restart')                        
            return true
        }        
        if (members[index] !== 0)                                       
            return false                   
        dataCopy[index] = pn                       
        return !winner(pn)
    }
    function click(index) {
        dataCopy = [...members]
        if (move(1,index)) {              
            move(2,ai_move(2,1))  
            setMembers(dataCopy)
        }
    }
    function next_p(p) {
        if (p === 1)
            return 2
        else    
            return 1
    }
    function ai_move(local, level) {        
        let min_max, tmp, num;
        if (!isEmpty) return 0
        if (local === 2) 
            min_max = -100
        else
            min_max = 100        
        for (const i in dataCopy) {
            if (dataCopy[i] === 0)
                dataCopy[i] = local
            else    
                continue
            if (judge(local)) {
                if (local === 2)                
                    tmp = 10 - level
                else
                    tmp = -(10-level)                
            } else tmp = ai_move(next_p(local),level+1)    
            if (local === 2) {                                 
                if (min_max < tmp) {
                    min_max = tmp   
                    num = i
                }                                     
            } else if (min_max > tmp) {
                min_max = tmp
                num = i
            }
            dataCopy[i] = 0
        }
        if (level === 1) {               
            return num                        
        } else    
            return min_max
    }
    return (
        <div className={container}>
            <button className={gamePanel} onClick={()=>click(0)}>{display(0)}</button> 
            <button className={gamePanel} onClick={()=>click(1)}>{display(1)}</button> 
            <button className={gamePanel} onClick={()=>click(2)}>{display(2)}</button> 
            <br />            
            <button className={gamePanel} onClick={()=>click(3)}>{display(3)}</button> 
            <button className={gamePanel} onClick={()=>click(4)}>{display(4)}</button> 
            <button className={gamePanel} onClick={()=>click(5)}>{display(5)}</button> 
            <br />
            <button className={gamePanel} onClick={()=>click(6)}>{display(6)}</button> 
            <button className={gamePanel} onClick={()=>click(7)}>{display(7)}</button> 
            <button className={gamePanel} onClick={()=>click(8)}>{display(8)}</button> 
            <p>{message}</p>
        </div>
    )    
}

export default Board

export { Layout } 