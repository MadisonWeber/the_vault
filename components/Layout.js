import Head from 'next/head'
import Nav from './Nav'
import Toast from './Toast'

const Layout = ({children, title = 'The Vault', description = 'Buy Beautiful Clothing'}) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta description = {description}/>
            </Head>
            <main>
                <Nav />
                {children}
                <Toast />
            </main>
        </>
    )
}

export default Layout
