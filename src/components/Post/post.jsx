import './style.css'
import MarkdownViewer from '../mdViewer/view'
import { Link } from 'react-router-dom'

export default function MainPost(props) {
    const dateStr = props.date
    const formatter = new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    const dateObj = new Date(dateStr)
    
    const date = formatter.format(dateObj)

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
        <div className='post-cont'>
            <div className='post-top'> 
                <div className='top-cont-post'>
                    {!props.nickname ? null :
                    <div className='post-nickname'>
                        <p><Link className="link-to-author" to={`/user/${props.author_id}`}>{props.nickname}</Link></p>
                    </div>
                    }
                    <div className='post-date'>
                        <p>{date}</p>
                    </div>
                </div>

                <div className='cont-post-title'>
                    <h2>{props.title}</h2>
                </div>
            </div>
            <div className='cont-post-text'>
                <MarkdownViewer value={props.text}></MarkdownViewer>
            </div>

            <div className='post-cont-bottom'>
                <Link to={`/post/${props.id}`}>
                    <button className='post-btn'>View!</button>
                </Link>
                <span className="ratings-span mg-10">
                    <div className='like-rating'>
                        <span className='rating'></span>
                        <p>{FormatLikes(props.likes)}</p>
                    </div>
                    <div className='dislike-rating'>
                        <span className='rating'></span>
                        <p>{FormatLikes(props.dislikes)}</p>
                    </div>           
                </span>
            </div>
        </div>
    )
}