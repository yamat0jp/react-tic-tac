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

const Panel = ({number}) => {
    <li className={gamePanel}>{number}</li>
}

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.player = 1
        this.members = [0,0,0, 0,0,0, 0,0,0]
        this.message = ''
    }
    move(member) {        
        if (this.player === 0) {
            this.player = 0
            this.members = [0,0,0, 0,0,0, 0,0,0]
            this.message = ''
            return 
        }
        this.members[member] = this.player        
        if (this.player === 1) 
            this.player = 2
        else 
            this.player = 1        
        if (this.judge(this.player)) {
            if (this.player === 1) 
                this.message = 'You win!!'
            else 
                this.message = 'Com win.'            
        } else {
            var Bool = false
            for (var i in this.members) {
                if (i !== 0) Bool = true                
            }
            if (Bool) {
                this.message = 'Draw.'
                this.player = 0
            }
        }
    }
    check(a,b,c) {
        const p = this.player
        if (this.members[a] === p && this.members[b] === p && this.members[c] === p) 
            return true 
        else return false        
    }
    judge(player) {
        if (this.check(0,1,2) || this.check(3,4,5) || this.check(6,7,8) ||
            this.check(0,3,6) || this.check(1,4,7) || this.check(2,5,8) ||
            this.check(0,4,8) || this.check(2,4,6)) 
            return true
        else return false        
    }
    render() {
        return (
            <div>
                <ul>
                    <Panel number={this.members[0]}></Panel>
                    <Panel number={this.members[1]}></Panel>
                    <Panel number={this.members[2]}></Panel>
                </ul>
                    <Panel number={3}>3</Panel>
                    <Panel number={4}></Panel>
                    <Panel number={5}></Panel>
                <ul>
                    <Panel onClick={()=>this.move(3)}></Panel>
                </ul>
                <p>{this.message}</p>
            </div>
        )
    }
}

export { Board }

export default Layout