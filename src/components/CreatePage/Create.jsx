import './Create.css'
import { useState } from 'react'
import MarkdownEditor from '../mdEditor/Mark'
import Markdown from 'react-markdown'


export default function CreatePost() {
    const [mdValue, setMdValue] = useState('# Hello, world!')
    return (
        <div className='md-div'>
            <div className='md-editor'>
                    <MarkdownEditor setValue={setMdValue} value={mdValue} ></MarkdownEditor>
            </div>
            <div className='md-preview'>
                <div className='md-preview-content'>
                    <Markdown>{mdValue}</Markdown>
                </div>
            </div>
        </div>
    )
}