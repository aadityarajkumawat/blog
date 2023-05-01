import { useRouter } from "next/router";
import { Flex } from "../flex";

interface PostProps {
  title: string;
  date: string;
  slug: string;
  thumbnail: string;
}

export function Post(props: PostProps) {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/post/${props.slug}`)}>
      <Flex className="flex-col mb-5 rounded-md">
        <div className="flex w-full h-[350px] bg-gray-300 rounded-md mb-1 border-2 border-gray-500">
          <img
            className="rounded-md m-auto h-full"
            src={`/blogs/${props.slug}/${props.thumbnail}.png`}
            alt=""
          />
        </div>
        <Flex className="flex-col select-none">
          <p>{props.title}</p>
          <p className="text-sm mt-1">{props.date}</p>
        </Flex>
      </Flex>
    </div>
  );
}
