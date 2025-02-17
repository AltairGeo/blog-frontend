import './loader.css'

export default function Loader() {
    return (
        <div id='vert-cont'>
            <div className='loader-container'>
                <div className="lds-ripple"><div></div><div></div></div>
            </div>
        </div>
    )
}