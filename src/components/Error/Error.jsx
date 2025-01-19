import './Error.css'

function ErrorText(props) {
    return  (
        <div id="error">
            <h2 id="error-title">{props.title}</h2>
            <p id="error-text">{props.text}</p>
        </div>
    )
}

export default ErrorText 