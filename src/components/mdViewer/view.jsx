import Markdown from 'react-markdown'
import './view.css'
import remarkGfm from 'remark-gfm';

export default function MarkdownViewer(props) {
  return (
    <div className='md-preview'>
        <Markdown remarkPlugins={[remarkGfm]}>{props.value}</Markdown>
    </div>
  );
}