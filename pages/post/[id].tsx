import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Flex } from '../../components/flex'
import { LeftChevron } from '../../components/left_chevron'
import { BASE_URL } from '../../constants'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function BlogPost() {
  const router = useRouter()

  const { data } = useSWR<{ content: string }>(
    `/api/posts/${router.query.id}`,
    fetcher,
  )

  return (
    <div className='dark:bg-graybg dark:text-white min-h-screen'>
      <div className='m-auto main-body'>
        <Flex className='justify-between items-center py-5'>
          <div>
            <b>
              <Flex className='items-center'>
                <button className='mr-2' onClick={() => router.back()}>
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
          <div className='content'>
            <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPost
