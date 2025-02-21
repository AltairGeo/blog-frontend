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
    return (
        <div className='post-cont'>
            <div className='post-top'> 
                <div className='top-cont-post'>
                    <div className='post-nickname'>
                        <p>{props.nickname}</p>
                    </div>
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
            </div>
        </div>
    )
}