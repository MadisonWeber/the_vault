import Layout from '../components/Layout'
import { useContext } from 'react'
import { GlobalState } from "../store/GlobalState"

const profile = () => {

    const { state } = useContext(GlobalState)
    const { user } = state

    return (
        <Layout description = 'User Profile Page'>
            <div>
                PROFILE PAGE
                {
                    user.name && (
                       <> 
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                        </>
                    )
                }

            </div>
        </Layout>

    )
}

export default profile
