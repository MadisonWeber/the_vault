import Head from 'next/head'
import Nav from './Nav'
import Footer from './Footer'
import Toast from './Toast'
import { useRouter } from 'next/router';

const Layout = ({children, title = 'The Vault', description = 'Buy Beautiful Clothing'}) => {

    const router = useRouter()

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
                {router.pathname !== '/' && <Footer /> }
            </main>
        </>
    )
}

export default Layout
