import './PostPreview.css'
import MarkdownViewer from '../../../mdViewer/view'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function PostPreview(props) {
    const navigate = useNavigate()

    return (
        <>
            <div className='postPreview'>
                <div className='sort-cont'>
                    <button className='edit-Button' onClick={() =>{navigate(`/edit/${props.postID}`)}}></button>
                    <button className='btn-delete-post' onClick={() => {
                        props.handleDelete(props.postID)
                    }}></button>
                    <div className='Previewtitle'><p><Link to={`/post/${props.postID}`}>{props.title}</Link></p></div>
                </div>
                <div className='Previewtext'><MarkdownViewer value={props.text}></MarkdownViewer></div>
                <div className='PreviewDateAndID'><p>ID: {props.postID}</p><p>{props.postDate}</p></div>
            </div>
        </>
    )

}