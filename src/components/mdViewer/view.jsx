import Markdown from 'react-markdown'
import './view.css'
import Prism from 'prismjs';
import remarkGfm from 'remark-gfm';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-apacheconf';
import 'prismjs/components/prism-gradle';
import 'prismjs/components/prism-haskell';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-csv';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-latex';
import 'prismjs/components/prism-lua';
import 'prismjs/components/prism-nasm';
import 'prismjs/components/prism-php-extras';
import 'prismjs/components/prism-zig';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-c'
import './prism-theme.css'
import { useEffect } from 'react';

export default function MarkdownViewer(props) {
  // Добавляем хук для подсветки кода после рендера
  useEffect(() => {
    Prism.highlightAll();
  }, [props.value]);

  return (
    <div className='md-preview'>
      <Markdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            
            return !inline && match ? (
              <div className="code-block">
                <pre className={className}>
                  <code className={className}>
                    {String(children).replace(/\n$/, '')}
                  </code>
                </pre>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
        remarkPlugins={[remarkGfm]}
      >
        {props.value}
      </Markdown>
    </div>
  );
}

