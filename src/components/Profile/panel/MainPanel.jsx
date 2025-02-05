import './Panel.css'

export default function Panel()
{
    return (
        <>
            <h1 className='header-action-panel'>Action's</h1>
            <div className='btns'>
                <div className='change-btns'>
                    <button className='password-button'></button>
                    <button className='name-button'></button>
                    <button className='email-button'>@</button>
                </div>
                <div className='btn-c'>
                    <div className='del-btns'>
                        <button className='delete-btn'></button>
                        <button className='exit-btn'></button>
                    </div>
                    <button className='stat-btn'></button>
                </div>
            </div>
        </>
    )
}