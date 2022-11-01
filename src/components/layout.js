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
    const [player, setPlayer] = React.useState(1)
    const [members, setMembers] = React.useState([0,0,0, 0,0,0, 0,0,0])
    const [message, setMessage] = React.useState('start')    
    let man = player
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
        dataCopy[index] = man
        setMembers(dataCopy)         
        if (judge(man)) {                    
            if (man === 1) 
                setMessage('You win!!')
            else
                setMessage('Com win.')  
            setPlayer(0) 
            return                           
        }                
        if (!isEmpty()) {               
            setMessage('Draw.')            
            setPlayer(0)
            return
        }                        
        console.log(man)        
        man = next_p(man)                                           
        if (man === 2)                                 
            move(ai_move(man,1))                                           
        return
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
        if (local === man) 
            min_max = -100
        else
            min_max = 100
        for (const i in members) {
            if (members[i] === 0)
                members[i] = local
            else    
                continue
            if (judge(local)) {
                if (local === man)                
                    tmp = 10 - level
                else
                    tmp = -(10-level)                
            } else tmp = ai_move(next_p(local),level+1)    
            if (local === man) {                                 
                if (min_max < tmp) {
                    min_max = tmp   
                    num = i
                }                                     
            } else if (min_max > tmp) {
                min_max = tmp
                num = i
            }
            members[i] = 0
        }
        if (level === 1) {               
            return num                        
        } else    
            return min_max
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