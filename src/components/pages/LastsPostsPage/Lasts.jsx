import './style.css'
import Paper from '../../Paper/Paper'
import ReactPaginate from 'react-paginate'
import { useEffect, useState } from 'react'
import { BackendUrl } from '../../../../config'
import MainPost from '../../Post/post'



export default function Lasts() {
    const [maxPage, setMaxPage] = useState(1)
    const [curPage, setCurPage] = useState(1)
    const [pageData, setPageData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const getCountPages = async () => {
            const resp = await fetch(`${BackendUrl}/posts/count`)
            if (!resp.ok) {
                console.log(`Error: ${resp.statusText}`)
            }
            setMaxPage(parseInt(await resp.text()))
        }
        getCountPages()
        setLoading(false)
    },[])

    useEffect(() => {
        const getCurPage = async () => {
            try {
                const resp = await fetch(`${BackendUrl}/posts/get_last_posts_page?page=${curPage.toString()}`)
                if (!resp.ok) {
                    throw new Error(resp.statusText)
                }
                const resp_data = await resp.json()
                console.log(resp_data)
                setPageData(resp_data)
            } catch(error) {
                console.error(error.message)
            }
        }
        getCurPage()
    }, [curPage])

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        console.log(selectedPage)
        setCurPage(selectedPage);
        setLoading(true)
    }

    return (
        <>
        {console.log(loading)}
            <Paper marg={true}>
                <div className='paginate-container'>
                    <ReactPaginate 
                        breakLabel=""
                        nextLabel=""
                        nextClassName='control-btn'
                        previousClassName='control-btn'
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={maxPage}
                        previousLabel=""
                        renderOnZeroPageCount={null}
                        pageLinkClassName="page-elem"
                        pageClassName="page-elem-parent"
                    />
                </div>
                <ul className='post-list'>
                {pageData.map((post) => (
                    <MainPost key={post.id} date={post.created_at} title={post.title} nickname={post.author_name} id={post.id} text={post.text}/>
                ))}
            </ul>
            </Paper>
        </>
    )
}