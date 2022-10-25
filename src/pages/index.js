import * as React from 'react'
import Layout, { Board } from '../components/layout'

const IndexPage = () => {
    const s = "Let's play tic-tac-toe."
    return (
      <div>
        <Layout pageTitle="Home Page" children={s}></Layout>
        <Board></Board>
      </div>
    )
}

export const Head = () => <title>Home Page</title>

export default IndexPage