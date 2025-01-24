import './Create.css'
import { useState } from 'react'
import MarkdownEditor from '../mdEditor/Mark'
import MarkdownViewer from '../mdViewer/view'
import { useCookies } from 'react-cookie';

export default function CreatePost() {
    const [mdValue, setMdValue] = useState('# Hello, world!')
    const [cookies, setCookie] = useCookies(['token']); 
    
    if (!cookies.token) {
        window.location.href = '/';
    }
    return (
        <div className='md-div'>
            <div className='md-editor'>
                    <MarkdownEditor setValue={setMdValue} value={mdValue} ></MarkdownEditor>
            </div>
            <div className='group-1'>
            <input className='title-input' placeholder='Title...' id='title-input'></input>
            <div className='preview'>
                <MarkdownViewer value={mdValue}></MarkdownViewer>
            </div>
        </div>
        </div>
    )
}