import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Flex } from "../../components/flex";
import { LeftChevron } from "../../components/left_chevron";

function BlogPost() {
  const router = useRouter();
  const [blogData, setBlogData] = useState<{ content: string } | null>(null);
  const [location, setLocation] = useState<any>(null);

  // navigator.geolocation.getCurrentPosition((p) => {
  //   p.coords;
  // });

  // const { data } = useSWR<{ content: string }>(
  //   `/api/posts/${router.query.id}`,
  //   fetcher
  // );

  async function getData() {
    if (!router.query.id) return;
    const res = await fetch(`/api/posts/${router.query.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
    });
    const data = await res.json();
    setBlogData(data);
  }

  useEffect(() => {
    getData();
  }, [router.query.id]);

  return (
    <div className="dark:bg-graybg dark:text-gray-200 min-h-screen">
      <div className="m-auto main-body">
        <Flex className="justify-between items-center py-5 select-none cursor-pointer">
          <div onClick={() => router.back()}>
            <b>
              <Flex className="items-center">
                <button className="mr-2">
                  <LeftChevron />
                </button>
                <p>posts</p>
              </Flex>
            </b>
          </div>
          <button>
            <div
              className="p-4 border-2 border-gray-200 rounded-md"
              onClick={() => {
                if (localStorage.getItem("theme") === "light") {
                  localStorage.setItem("theme", "dark");
                  document.documentElement.classList.add("dark");
                } else {
                  localStorage.setItem("theme", "light");
                  document.documentElement.classList.remove("dark");
                }
              }}
            ></div>
          </button>
        </Flex>

        {!blogData ? (
          <div>loading...</div>
        ) : (
          <div className="content pb-10">
            <div dangerouslySetInnerHTML={{ __html: blogData.content }}></div>

            <div className="flex items-center justify-center gap-5 border-t border-zinc-400 py-5">
              <a
                href="https://twitter.com/Aaditya86763230"
                className="bg-blue-400 text-white px-3 py-1 rounded-md"
              >
                Twitter
              </a>

              <a
                href="https://youtube.com/@edyd1"
                className="bg-red-600 px-3 py-1 rounded-md text-white"
              >
                Youtube
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPost;
