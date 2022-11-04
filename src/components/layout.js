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

const Panel = (props) => {
    function display(index) {              
        switch(index) {                        
            case(1): 
                return 'O'                
            case(2): 
                return 'X'                              
            default:
                return '?'                
        }                        
    }
    return (
        <button className={gamePanel} onClick={props.onClick}>{display(props.number)}</button>
    )
}

const Board = () => {
    const [player,setPlayer] = React.useState(1)
    const [members,setMembers] = React.useState([0,0,0, 0,0,0, 0,0,0])    
    const [message,setMessage] = React.useState('start')            
    var dataCopy = members;
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
        for (const i in dataCopy) {
            if (dataCopy[i] === 0) 
                test = true
        }           
        return test
    }
    function winner(pn) {        
        if (judge(pn)) {
            setPlayer(0)
            if (pn === 1)
                setMessage('You win!!')
            else
                setMessage('Com win.')                    
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
            return false
        }        
        if (dataCopy[index] !== 0)                                       
            return false                   
        dataCopy[index] = pn            
        return !winner(pn)
    }
    function click(index) {       
        dataCopy = members        
        if (move(1,index)) {              
            move(2,ai_move(2,1))              
            setMembers([...dataCopy])        
        }
    }
    function next_p(pn) {
        if (pn === 1)
            return 2
        else    
            return 1
    }
    function ai_move(local,level) {        
        let min_max, tmp, num;
        if (!isEmpty()) return 0
        if (local === 2) 
            min_max = -100000
        else
            min_max = 100000        
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
            <Panel number={members[0]} onClick={()=>click(0)}></Panel> 
            <Panel number={members[1]} onClick={()=>click(1)}></Panel> 
            <Panel number={members[2]} onClick={()=>click(2)}></Panel> 
            <br />            
            <Panel number={members[3]} onClick={()=>click(3)}></Panel> 
            <Panel number={members[4]} onClick={()=>click(4)}></Panel> 
            <Panel number={members[5]} onClick={()=>click(5)}></Panel> 
            <br />
            <Panel number={members[6]} onClick={()=>click(6)}></Panel> 
            <Panel number={members[7]} onClick={()=>click(7)}></Panel> 
            <Panel number={members[8]} onClick={()=>click(8)}></Panel> 
            <p>{message}</p>
        </div>
    )    
}

export default Board

export { Layout } 