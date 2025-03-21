import './style.css'
import Paper from '../../Paper/Paper'
import { useEffect } from 'react'
import { useState } from 'react'
import { BackendUrl } from '../../../../config'
import MainPost from '../../Post/post'
import Loading from '../../Loading/Loading'


export default function SearchPage() {
    const [query, setQuery] = useState(null)
    const [curPage, setCurPage] = useState(1);
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [stat404, set404] = useState(false);
    const [err, setErr] = useState(false)
    const [inputValue, setInputValue] = useState("")

    const handle_query_btn = () => {
        if (inputValue.trim() === "") return;
        setErr(false)
        set404(false)
        setQuery(inputValue) // Устанавливаем значение из state
    }

    useEffect(() => {
        const getSearchedPosts = async () => {
            try {
                setLoading(true)
                setErr(false)
                set404(false)
    
                const response = await fetch(`${BackendUrl}/search/find?query=${query}&page=${curPage}`)
    
                if (response.status === 404) {
                    set404(true)
                    throw new Error("404: error not found!")
                } else if (!response.ok) {
                    setErr(true)
                    throw new Error(response.statusText)
                }
    
                const responseJSON = await response.json()
                if (!responseJSON.posts || responseJSON.posts.length === 0) {
                    set404(true)
                    throw new Error("404: No posts found!")
                }
    
                setPageData(responseJSON.posts)
            } catch (error) {
                setPageData(null)
                console.error(error.message)
            } finally {
                setLoading(false)
            }
        }
    
        if (query) {
            getSearchedPosts()
        }
    }, [query, curPage])


    const handle_page_inc = () => {
        setErr(false)
        set404(false)
        setCurPage(curPage + 1)        
    }

    const handle_page_dec = () => {
        setErr(false)
        set404(false)
        if (curPage === 1) {
            return;
        }
        setCurPage(curPage - 1)
    }


    return (
        <Paper marg={true}>
            <div className='search-cont'>
                <div className='search-panel'>
                    <input onChange={(e) => setInputValue(e.target.value)} id='search-input' className='search-input' type="text" placeholder='Enter text to search...'/>
                    <button className='search-btn' onClick={handle_query_btn}></button>
                </div>
            </div>
            
            {stat404 && <div className='center'><div className='error-msg'><h1 className='text-center'>Error</h1><p>Something was wrong!</p></div></div>}
            {err && <div className='center'><div className='error-msg'><h1 className='text-center'>Error</h1><p>Something was wrong!</p></div></div>}

            {!loading && query && !err?
            <>
            
            <div>
                {!stat404 && pageData && pageData.length > 0 && (
                    <ul className='post-list'>
                        {pageData.map((post) => (
                            <MainPost 
                                key={post.id} 
                                date={post.created_at} 
                                title={post.title} 
                                nickname={post.author} 
                                id={post.id} 
                                text={post.text.slice(0, 150)}
                            />
                        ))}
                    </ul>
                )}
                <div className='center'>
                    <div className='paginate-container-search'>
                            <button onClick={handle_page_dec} className='arr-btn'></button>
                            <p className='page-counter'>{curPage}</p>
                            <button onClick={handle_page_inc} className='arr-btn'></button>
                    </div>
                </div>
            </div>
            </>
            :
            null
            }
        </Paper>
        
    )
}