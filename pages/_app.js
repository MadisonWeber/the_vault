import GlobalStateProvider from '../store/GlobalState'
import '../styles/globals.scss'


function MyApp({ Component, pageProps }) {
  return (   
    <GlobalStateProvider>
      <Component {...pageProps} />
    </GlobalStateProvider>
  )
}

export default MyApp
