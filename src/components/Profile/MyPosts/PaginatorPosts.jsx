import './PaginatorPosts.css'

export default function PagesPost(props) {
    
    return (
    <div className='paginator-container'>
        <button className='back-btn' onClick={() => props.handlePage("prev")}></button>
        <p className='pages-counter'>{props.currentPage}</p>
        <button className='forward-btn' onClick={() => props.handlePage("next")}></button>
    </div>  
    )
}
