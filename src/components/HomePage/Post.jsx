import './Post.css'

export default function Post(props){
    return (
        <li id='PostElement'>
            <div>
                <div class="PostHeader"><h1>{props.title}</h1></div>
                <p id="PostBody">{props.body.slice(0, 350) + "..."}</p>
                <div class="PostBottom">
                    <button class="btn-read-more">Читать дальше</button>
                    <span class="PostSpan">
                        <p id="PostAuthorName">{props.author}</p>
                    </span>
                </div>
            </div>
        </li>
    )
}