import './Post.css'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { Link } from 'react-router-dom'
import MarkdownViewer from './../mdViewer/view'

export default function Post(props){
    const [authorPost, authorSet] = useState(null)
    useEffect(() => {
        async function fetch_user() {
            const resp = await fetch(`http://127.0.0.1:8000/users/get_user?id=${props.author}`)
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
                {/* <p id="PostBody">{props.body.slice(0, 350) + "..."}</p> */}
                <div id="PostBody"><MarkdownViewer value={props.body.slice(0, 350) + "..."}s></MarkdownViewer></div>
                <div className="PostBottom">
                    <Link to={`/post/${props.postID}`}>
                        <button className="btn-read-more">Читать дальше</button>
                    </Link>
                    <span className="PostSpan">
                        <p id="PostAuthorName">{authorPost}</p>
                    </span>
                </div>
            </div>
        </li>
    )
}