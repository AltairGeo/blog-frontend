import './Create.css'
import {BackendUrl} from '../../../config'
import { useState } from 'react'
import MarkdownEditor from '../mdEditor/Mark'
import MarkdownViewer from '../mdViewer/view'
import { useCookies } from 'react-cookie';



export default function CreatePost() {
    const [mdValue, setMdValue] = useState('# Hello, world!');
    const [cookies, setCookie] = useCookies(['token']);

    console.log(BackendUrl)

    if (!cookies.token) {
        window.location.href = '/';
    }

    async function handleSendPost() {
        document.querySelector('.check-btn').disabled = true;
        const title = document.getElementById('title-input').value;
        const content = document.querySelector('.md-editor textarea').value;
        if(!cookies.token) {
            window.location.href = '/login';
        }
    
        if (title.trim() === '' || content.trim() === '') {
            alert('Title and content should not be empty');
            return;
        }
    
        try {
            const resp = await fetch(`${BackendUrl}/posts/create_post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: title,
                    text: content,
                    created_at: new Date().toISOString().slice(0, -1),
                    token: {
                        token: cookies.token
                    }
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
                <input className='title-input' maxLength={50} placeholder='Title...' autoCorrect="off" autoComplete='off' id='title-input'></input>
                <div className='preview'>
                    <MarkdownViewer value={mdValue}></MarkdownViewer>
                </div>
            </div>
            </div>
            <button onClick={handleSendPost} className='check-btn'></button>
        </>
    )
}