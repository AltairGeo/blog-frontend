import './PostPreview.css'
import MarkdownViewer from '../../mdViewer/view'
import { Link } from 'react-router-dom'

export default function PostPreview(props) {


    return (
        <>
            <div className='postPreview'>
                <div className='sort-cont'>
                    <button className='edit-Button'><Link to={`/edit/${props.postID}`}></Link></button>
                    <button className='btn-delete-post'></button>
                    <div className='Previewtitle'><p>{props.title}</p></div>
                </div>
                <div className='Previewtext'><MarkdownViewer value={props.text}></MarkdownViewer></div>
                <div className='PreviewDateAndID'><p>ID: {props.postID}</p><p>{props.postDate}</p></div>
            </div>
        </>
    )

}