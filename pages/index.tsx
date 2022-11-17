import { useEffect, useState } from 'react'
import { Flex } from '../components/flex'
import { LeftChevron } from '../components/left_chevron'
import { Post } from '../components/post'
import { BASE_URL } from '../constants'

interface BlogMetaData {
  title: string
  slug: string
  date: string
}

interface HomeLocalState {
  posts: Array<BlogMetaData>
  loading: boolean
  viewMore: boolean
  colorMode: 'light' | 'dark'
}

export default function Home() {
  const [local, setLocal] = useState<HomeLocalState>({
    posts: [],
    loading: false,
    viewMore: false,
    colorMode: 'light',
  })

  function updateState(update: Partial<HomeLocalState>) {
    setLocal((l) => ({ ...l, ...update }))
  }

  useEffect(() => {
    async function ae() {
      updateState({ loading: true })
      const res = await fetch(`${BASE_URL}/posts/all`)
      const posts = await res.json()
      updateState({ loading: false, posts })
    }

    function getColorMode(): 'light' | 'dark' {
      // @ts-ignore
      return window.localStorage.getItem('theme') || 'dark'
    }

    ae()
    updateState({ colorMode: getColorMode() })
  }, [])

  return (
    <div className='dark:bg-graybg dark:text-white min-h-screen'>
      <div className='m-auto main-body'>
        <Flex className='justify-between items-center py-5'>
          <div>
            <b>
              {!local.viewMore ? (
                "edy's blog"
              ) : (
                <Flex className='items-center'>
                  <button
                    className='mr-2'
                    onClick={() => updateState({ viewMore: false })}
                  >
                    <LeftChevron />
                  </button>
                  <p>posts</p>
                </Flex>
              )}
            </b>
          </div>
          <button>
            <div
              className='p-4 border-2 border-gray-200 rounded-md'
              onClick={() => {
                if (localStorage.getItem('theme') === 'light') {
                  localStorage.setItem('theme', 'dark')
                  document.documentElement.classList.add('dark')
                } else {
                  localStorage.setItem('theme', 'light')
                  document.documentElement.classList.remove('dark')
                }
              }}
            ></div>
          </button>
        </Flex>
        {!local.viewMore && (
          <div>
            <p className='text-justify'>
              hi, I am a software engineer, who loves to work with web
              technologies and make videos to share my understanding of things,
              a little over 4 years of programming and I have learnt that the
              best way to understand things is building mental models and
              applying them.
            </p>
            <br />
            <p>talking in typescript feels like second nature to me.</p>
          </div>
        )}
        <div className='my-5'>
          <p>Posts</p>
        </div>
        {local.loading ? (
          <div>loading...</div>
        ) : (
          <div>
            {local.posts.map((p, i) => (
              <Post key={i} title={p.title} date={p.date} slug={p.slug} />
            ))}
          </div>
        )}

        {!local.viewMore && (
          <div className='pb-10'>
            <button
              className='underline'
              onClick={() => updateState({ viewMore: true })}
            >
              view more
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
