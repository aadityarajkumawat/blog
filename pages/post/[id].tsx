import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Flex } from '../../components/flex'
import { LeftChevron } from '../../components/left_chevron'
import { BASE_URL } from '../../constants'

const localState = {
  loading: false,
}

type LocalState = typeof localState

function BlogPost(props: any) {
  const router = useRouter()

  const [html, setHtml] = useState<string>('<p>loading...</p>')
  const [local, setLocal] = useState<LocalState>({ ...localState })

  function updateState(update: Partial<LocalState>) {
    setLocal((l) => ({ ...l, ...update }))
  }

  useEffect(() => {
    async function ae() {
      if (!router.isReady) return

      updateState({ loading: true })
      const slug = router.query.id
      const res = await fetch(`${BASE_URL}/posts/${slug}`)
      const { content } = await res.json()
      setHtml(content)
      updateState({ loading: false })
    }

    ae()
  }, [router.isReady])

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

        {local.loading ? (
          <div>loading...</div>
        ) : (
          <div className='content'>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPost
