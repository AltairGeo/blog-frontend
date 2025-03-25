import './Info.css'
import { useCookies } from 'react-cookie'
import ErrorText from '../../../Error/Error'
import { useEffect } from 'react'
import { useState } from 'react'
import { BackendUrl } from '../../../../../config'

export default function InfoTab() {
    const [cookies, setCookies] = useCookies(['token'])
    const [info_data, setInfoData] = useState({
        nickname: "nickname",
        email: "example@mail.com",
        data: "Not supported!",
        id: 0,
    })
    const [err_msg, set_err_msg] = useState(null)
    const [bio_btn_dis, set_bio_dis] = useState(false)


    useEffect(() => {
        const get_data = async () => {
            try {
            const resp = await fetch(`${BackendUrl}/users/get_self`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookies.token}`
                    },
                    method: "GET",
                }
            )
            if(!resp.ok){
                throw new Error(resp.statusText)
            }
            const data = await resp.json()
            setInfoData({
                nickname: data.nickname,
                email: `Email: ${data.email}`,
                data: "Reg. Date: Not avaible!",
                id: `ID: ${data.id}`,
                bio: data.bio
            })
        } catch(error) {
            set_err_msg(error.message)
        }   
        }
        get_data()
    }, [])

    const handleBIO = () => {
        set_bio_dis(false)
        const bio_change = async () => {
            const new_bio = document.getElementById("bio-input").value
            try {
                const resp = await fetch(`${BackendUrl}/users/change_bio?bio=${new_bio}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${cookies.token}`
                        }
                    }
                )
            } catch(error) {
                console.error(error.message)
            } finally {
                set_bio_dis(false)
            }
        }
        bio_change()
    }


    return(
        <>
            {err_msg ? <ErrorText title="Error info loading!" text={err_msg}></ErrorText> : ""}
            <div className='container-info'>
                <div className='info-nickname'>
                    <p id='info-nickname'>{info_data['nickname']}</p>
                </div>

                <div className='info-base'>
                    <div className='flex-beetween'>
                        <input autocomplete="off" className='bio-input' type="text" name="" placeholder='Enter you bio...' id="bio-input" maxLength={80} defaultValue={info_data["bio"] ? info_data["bio"] : ""} ></input>
                        <button autoCorrect={false} disabled={bio_btn_dis} onClick={handleBIO} className='bio-btn'></button>
                    </div>
                    <p id='info-email'>{info_data['email']}</p>
                    <p id='info-data'>{info_data['data']}</p>
                    <p id='info-id'>{info_data['id']}</p>
                </div>
            </div>
        </>
    )
}