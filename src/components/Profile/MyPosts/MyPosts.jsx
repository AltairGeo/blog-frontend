import './MyPosts.css'
import { useState, useEffect } from 'react'
import PagesPost from './PaginatorPosts'
import PostPreview from './PostPreview'
import { useCookies } from 'react-cookie'
import {jwtDecode} from 'jwt-decode'
import { BackendUrl } from '../../../../config'
import LoaderSpin from '../../../LoaderSpin/LoaderSpin'

export default function MyPostsView() {
  const [loading, setLoading] = useState(true)
  const [NotFound, setNotFound] = useState(false)
  const [MaxPage, setMaxPage] = useState(1)
  const [Posts, setPosts] = useState([])
  const [CurrentPage, setCurrentPage] = useState(1)
  const [cookies] = useCookies(['token'])
  const object_of_token = jwtDecode(cookies.token)

  const handlePageChange = (action) => {
    if (action === "next"){
        CurrentPage + 1 <= MaxPage ? setCurrentPage(CurrentPage + 1) : ""
    }
    if (action === "prev"){
        CurrentPage - 1 >= 1 ? setCurrentPage(CurrentPage - 1) : ""
    }
  }

  useEffect(() => {
    const get_posts = async () => {
      try {
        const response = await fetch(
          `${BackendUrl}/users/get_user_posts?user_id=${object_of_token.id}`
        )
        if (!response.ok) {
            if (response.status === 404) {
                setNotFound(true)
            }
            throw new Error(response.statusText)
        }
        const data = await response.json()
        // Устанавливаем максимальное количество страниц (по 2 поста на страницу)
        setMaxPage(Math.ceil(data.length / 2))
        return data
      } catch (error) {
        console.error('Error fetching posts:', error.message)
        return []
      } finally {
        setLoading(false)
      }
    }

    get_posts().then((data) => {
      if (data && data.length > 0) {
        // Разбиваем массив data на подмассивы по 2 элемента
        const chunkedPosts = data.reduce((acc, _, i) => {
          if (i % 2 === 0) {
            acc.push(data.slice(i, i + 2))
          }
          return acc
        }, [])
        setPosts(chunkedPosts)
      }
    })
  }, [])

  const TimeForming = (time) => {
    const dateObj = new Date(time);
    const formatter = new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    const formattedDate = formatter.format(dateObj);
    return formattedDate
  }


  return (
    <>
    {loading ? <div className='loader-spin'><LoaderSpin /></div> :
    NotFound ? <h1 className='not-found'>{"Not found! :("}</h1> : 
      <div className='myPostsContainer'>
        <div className='headerRazdel'>
          <h1>My Posts</h1>
        </div>
        <div className='duo_post_viewier'>
        {Posts[CurrentPage - 1] ? 
            Posts[CurrentPage - 1].map((post) => (
              <PostPreview
                key={post.id}
                title={post.title}
                text={post.text.slice(0, 60)}
                postID={post.id}
                postDate={TimeForming(post.created_at)}
              />
            ))
         : ""}
        </div>
        <div className='PaginatorPosts'>
          <PagesPost currentPage={CurrentPage} handlePage={handlePageChange}/>
        </div>
      </div>
}

    </>
  )
}