import './Post.css'
import { Link } from 'react-router-dom'
import MarkdownViewer from './../../mdViewer/view'


export default function Post(props){
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
                        <p id="PostAuthorName">{props.author_name}</p>
                    </span>
                </div>
            </div>
        </li>
    )
}