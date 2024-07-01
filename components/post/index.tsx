import { useRouter } from "next/router";
import { Flex } from "../flex";
import { useTheme } from "../useTheme";

interface PostProps {
  title: string;
  date: string;
  slug: string;
  description: string;
  thumbnail: string;
}

export function Post(props: PostProps) {
  const router = useRouter();

  const { theme } = useTheme();

  console.log({ theme });

  return (
    <div onClick={() => router.push(`/post/${props.slug}`)}>
      <Flex className="flex-col mb-10 rounded-md">
        <img
          className="rounded-md m-auto h-full border border-zinc-600 w-full"
          src={`/blogs/${props.slug}/${props.thumbnail}-${theme}.png`}
          alt=""
        />
        <Flex className="flex-col select-none">
          <p className="font-bold pt-4 text-lg">{props.title}</p>
          <p className="text-zinc-600 pb-1 text-sm dark:text-zinc-300">
            {props.description.substring(0, 150) + "..."}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {props.date}
          </p>
        </Flex>
      </Flex>
    </div>
  );
}
