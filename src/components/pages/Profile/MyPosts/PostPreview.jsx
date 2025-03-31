import './PostPreview.css'
import MarkdownViewer from '../../../mdViewer/view'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import PublicButton from './publicBTN'
import { useState } from 'react'

export default function PostPreview(props) {
    const navigate = useNavigate()
    const [post_public, setPublic] = useState(props.public)

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
                <div className='PreviewDateAndID'>
                    <span className='flex-row'>
                        <p>ID: {props.postID}</p>
                        <span className='ml-15'>Public: <PublicButton post_public={post_public} setPublic={setPublic} postID={props.postID}/></span>
                    </span>
                    <p>{props.postDate}</p>
                </div>
            </div>
        </>
    )

}