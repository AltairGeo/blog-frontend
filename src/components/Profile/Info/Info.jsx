import './Info.css'
import { useCookies } from 'react-cookie'
import ErrorText from '../../Error/Error'
import { useEffect } from 'react'
import { useState } from 'react'
import { BackendUrl } from '../../../../config'

export default function InfoTab() {
    const [cookies, setCookies] = useCookies(['token'])
    const [info_data, setInfoData] = useState({
        nickname: "nickname",
        email: "a@a.com",
        data: "Not supported!",
        id: 0,
    })
    const [err_msg, set_err_msg] = useState(null)


    useEffect(() => {
        const get_data = async () => {
            try {
            const resp = await fetch(`${BackendUrl}/users/get_self`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: "POST",
                    body: JSON.stringify({
                        token: cookies.token
                    })
                }
            )
            if(!resp.ok){
                throw new Error(resp.statusText)
            }
            const data = await resp.json()
            setInfoData({
                nickname: data.nickname,
                email: `Email: ${data.email}`,
                data: "Reg. Date: Not supported!",
                id: `ID: ${data.id}`,
            })
        } catch(error) {
            set_err_msg(error.message)
        }   
        }
        get_data()
    }, [])

    return(
        <>
            {err_msg ? <ErrorText title="Error info loading!" text={err_msg}></ErrorText> : ""}
            <div className='container-info'>
                <div className='info-nickname'>
                    <p id='info-nickname'>{info_data['nickname']}</p>
                </div>

                <div className='info-base'>
                    <p id='info-email'>{info_data['email']}</p>
                    <p id='info-data'>{info_data['data']}</p>
                    <p id='info-id'>{info_data['id']}</p>
                </div>
            </div>
        </>
    )
}