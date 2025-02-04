import './Create.css'
import {BackendUrl} from '../../../config'
import { useState } from 'react'
import MarkdownEditor from '../mdEditor/Mark'
import MarkdownViewer from '../mdViewer/view'
import { useCookies } from 'react-cookie';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


export default function CreatePost() {
    const [mdValue, setMdValue] = useState('# Hello, world!');
    const [NewOrNot, setNew] = useState(true)
    const [cookies, setCookie] = useCookies(['token']);
    const params = useParams();
    const [title, setTitle] = useState("")
    const navigate = useNavigate()

    console.log(BackendUrl)

    if (!cookies.token) {
        window.location.href = '/';
    }

    useEffect(() => {
        const GetPostIfEdit = async () =>
        {
            try
            {
                if(!params.postID) {
                    throw new Error("Post id not found!")
                }
                const resp = await fetch(`${BackendUrl}/posts/get_post_by_id?ids=${params.postID}`)
                if (!resp.ok){
                    throw new Error(resp.statusText);
                }
                const data = await resp.json()
                setMdValue(data.text)
                setTitle(data.title)
                setNew(false)

            } catch(error) 
            {
                console.error(error.message)
            }
        }
        GetPostIfEdit()
    }, [])


    async function handleChangePost() {
        document.querySelector('.edit-btn').disabled = true;
        const title = document.getElementById('title-input').value;
        const content = document.querySelector('.md-editor textarea').value;
        if(!cookies.token) {
            window.location.href = '/login';
        }
        if (title.trim() === '' || content.trim() === '') {
            alert('Title and content should not be empty!');
            return;
        }
        try {
            const resp = await fetch(`${BackendUrl}/posts/change_post`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "accept": 'application/json'
                },
                body: JSON.stringify({
                    token: cookies.token,
                    post_id: params.postID,
                    text: mdValue.trim(),
                    title: title.trim(),
                })
            })
            if (!resp.ok){
                throw new Error(resp.statusText)
            }
            navigate("/profile")
        } catch(error) {
            console.error(error.message)
        }
    }

    async function handleSendPost() {
        document.querySelector('.check-btn').disabled = true;
        const title = document.getElementById('title-input').value;
        const content = document.querySelector('.md-editor textarea').value;
        if(!cookies.token) {
            window.location.href = '/login';
        }
    
        if (title.trim() === '' || content.trim() === '') {
            alert('Title and content should not be empty!');
            return;
        }
    
        try {
            const resp = await fetch(`${BackendUrl}/posts/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: title.trim(),
                    text: content.trim(),
                    created_at: new Date().toISOString().slice(0, -1),
                    token: cookies.token
                    
                })
            })
            if(!resp.ok) {
                throw new Error(resp.statusText);
            } else {
                window.location.href = '/';
            }
        } catch (error) {
            alert(error.message);
        }
    } 

    return (
        <>
            <div className='md-div'>
                <div className='md-editor'>
                        <MarkdownEditor setValue={setMdValue} value={mdValue} ></MarkdownEditor>
                </div>
                <div className='group-1'>
                <input className='title-input' value={title} onChange={(msg) => {
                    setTitle(msg.target.value)
                }} maxLength={50} placeholder='Title...' autoCorrect="off" autoComplete='off' id='title-input'></input>
                <div className='preview'>
                    <MarkdownViewer value={mdValue}></MarkdownViewer>
                </div>
            </div>
            </div>
            {NewOrNot ? <button onClick={handleSendPost} className='check-btn'>+</button> : 
            <button className='edit-btn' onClick={handleChangePost}></button>
            }
        </>
    )
}