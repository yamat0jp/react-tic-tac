import * as React from 'react'
import Board, { Layout } from '../components/layout'

const IndexPage = () => {
    const s = "Let's play tic-tac-toe."
    return (
      <>
        <Layout pageTitle="Home Page">{s}</Layout>
        <Board></Board>
      </>
    )
}

export const Head = () => <title>Home Page</title>

export default IndexPage