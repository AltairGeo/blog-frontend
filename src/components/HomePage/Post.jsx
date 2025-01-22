import './Post.css'
import { useEffect, useState } from 'react'

export default function Post(props){
    const [authorPost, authorSet] = useState(null)
    useEffect(() => {
        async function fetch_user() {
            const resp = await fetch("http://127.0.0.1:8000/users/get_user?id=1")
            if(resp.ok){
                const data = await resp.json()
                authorSet(data.nickname)
            }
        }
        fetch_user()
    }, [])

    return (
        <li id='PostElement'>
            <div>
                <div className="PostHeader"><h1>{props.title}</h1></div>
                <p id="PostBody">{props.body.slice(0, 350) + "..."}</p>
                <div className="PostBottom">
                    <button className="btn-read-more">Читать дальше</button>
                    <span className="PostSpan">
                        <p id="PostAuthorName">{authorPost}</p>
                    </span>
                </div>
            </div>
        </li>
    )
}