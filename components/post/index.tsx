import { Flex } from '../flex'

interface PostProps {
  title: string
  date: string
}

export function Post(props: PostProps) {
  return (
    <Flex className='flex-col mb-5 rounded-md'>
      <div className='flex w-full h-72 bg-gray-300 rounded-md mb-1'></div>
      <Flex className='flex-col'>
        <p>{props.title}</p>
        <p className='text-sm mt-1'>{props.date}</p>
      </Flex>
    </Flex>
  )
}
