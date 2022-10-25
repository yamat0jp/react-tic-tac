import * as React from 'react'
import Layout from '../components/layout'

const AboutPage = () => {
    return (
        <Layout pageTitle="About Me">
            <p>私個人の学習を目的としたサイトです.</p>
        </Layout>
    )
}

export const Head = () => <title>About Me</title>

export default AboutPage