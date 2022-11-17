import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Flex } from '../../components/flex'
import { LeftChevron } from '../../components/left_chevron'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function BlogPost() {
  const router = useRouter()

  const { data } = useSWR<{ content: string }>(
    `/api/posts/${router.query.id}`,
    fetcher,
  )

  return (
    <div className='dark:bg-graybg dark:text-gray-200 min-h-screen'>
      <div className='m-auto main-body'>
        <Flex className='justify-between items-center py-5 select-none cursor-pointer'>
          <div onClick={() => router.back()}>
            <b>
              <Flex className='items-center'>
                <button className='mr-2'>
                  <LeftChevron />
                </button>
                <p>posts</p>
              </Flex>
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

        {!data ? (
          <div>loading...</div>
        ) : (
          <div className='content pb-10'>
            <div dangerouslySetInnerHTML={{ __html: data.content }}></div>

            <p className='text-gray-500'>Thank You</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPost
