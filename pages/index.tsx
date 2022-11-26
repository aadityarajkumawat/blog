import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Flex } from '../components/flex'
import { LeftChevron } from '../components/left_chevron'
import { Post } from '../components/post'

interface BlogMetaData {
  title: string
  slug: string
  date: string
  thumbnail: string
}

type ColorScheme = 'light' | 'dark'

interface HomeLocalState {
  viewMore: boolean
  colorMode: ColorScheme
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  const [local, setLocal] = useState<HomeLocalState>({
    viewMore: false,
    colorMode: 'light',
  })

  const { data } = useSWR<Array<BlogMetaData>>('/api/posts/all', fetcher)

  function updateState(update: Partial<HomeLocalState>) {
    setLocal((l) => ({ ...l, ...update }))
  }

  console.log(data)

  useEffect(() => {
    function getColorMode(): ColorScheme {
      return (window.localStorage.getItem('theme') as ColorScheme) || 'dark'
    }
    updateState({ colorMode: getColorMode() })
  }, [data])

  return (
    <div className='dark:bg-graybg dark:text-white min-h-screen'>
      <div className='m-auto main-body'>
        <Flex className='justify-between items-center py-5 cursor-pointer'>
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
          <button className='active:scale-[0.95] hover:scale-[0.97] border-2 border-gray-200 rounded-md'>
            <div
              className='p-4'
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
        {!data ? (
          <div>loading...</div>
        ) : (
          <div>
            {data.map((p, i) => (
              <Post
                key={i}
                title={p.title}
                date={p.date}
                slug={p.slug}
                thumbnail={p.thumbnail}
              />
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
