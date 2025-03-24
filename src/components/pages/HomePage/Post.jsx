import './Post.css'
import { Link } from 'react-router-dom'
import MarkdownViewer from './../../mdViewer/view'


export default function Post(props){

    const FormatLikes = (likes) => {
        const formatterLikes = new Intl.NumberFormat('en', { 
            notation: 'compact', 
            compactDisplay: 'short' 
        });
        if (!likes) {
            return 0
        }
        return formatterLikes.format(likes)
    }

    return (
        <li id='PostElement'>
            <div>
                <div className="PostHeader"><h1>{props.title}</h1></div>
                {/* <p id="PostBody">{props.body.slice(0, 350) + "..."}</p> */}
                <div id="PostBody"><MarkdownViewer value={props.body.slice(0, 350) + "..."}></MarkdownViewer></div>
                <div className="PostBottom">
                        <Link to={`/post/${props.postID}`}>
                            <button className="btn-read-more">Read more</button>
                        </Link>
                    <span className="PostSpan">
                        <p id="PostAuthorName">{props.author_name}</p>
                        <span className='ratings-span'>
                            <div className='like-rating'>
                                <span className='rating'></span>
                                <p>{FormatLikes(props.likes)}</p>
                            </div>
                            <div className='dislike-rating'>
                                <span className='rating'></span>
                                <p>{FormatLikes(props.dislikes)}</p>
                            </div>                            
                        </span>
                    </span>
                </div>
            </div>
        </li>
    )
}