import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Flex } from "../../components/flex";
import { LeftChevron } from "../../components/left_chevron";

function BlogPost() {
  const router = useRouter();
  const [blogData, setBlogData] = useState<{ content: string } | null>(null);

  async function getData() {
    if (!router.query.id) return;
    const res = await fetch(`/api/posts/${router.query.id}`);
    const data = await res.json();
    setBlogData(data);
  }

  async function registerAView() {
    if (!router.query.id) return;
    await fetch("/api/hit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: Intl.DateTimeFormat().resolvedOptions().timeZone,
        id: router.query.id,
      }),
    });

    let meta = localStorage.getItem("edyy_blog_meta");

    localStorage.setItem(
      "edyy_blog_meta",
      JSON.stringify({
        [router.query.id as string]: { timestamp: new Date().getTime() },
        ...(meta ? JSON.parse(meta) : {}),
      })
    );
  }

  useEffect(() => {
    async function as() {
      await getData();

      setTimeout(async () => {
        let meta = localStorage.getItem("edyy_blog_meta");

        if (!meta) {
          await registerAView();
          return;
        }
        const metaValue = JSON.parse(meta);
        if (!metaValue[router.query.id as string]) {
          localStorage.setItem(
            "edyy_blog_meta",
            JSON.stringify({
              [router.query.id as string]: { timestamp: new Date().getTime() },
              ...(meta ? JSON.parse(meta) : {}),
            })
          );
        }
        // if the view is older than 20 mins, we register a new view
        const moreThan20Mins =
          new Date().getTime() -
            Number(metaValue[router.query.id as string].timestamp) >
          1000 * 60 * 20;
        if (moreThan20Mins) {
          await registerAView();
        } else {
          console.log("Check back later for a view");
        }
        // if a user stays more than 10 seconds on a post, register that as a view
      }, 10000);
    }

    as();
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
