import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Flex } from "../../components/flex";
import { LeftChevron } from "../../components/left_chevron";

function BlogPost() {
  const router = useRouter();
  const [blogData, setBlogData] = useState<{ content: string } | null>(null);
  const [mouseDown, setMouseDown] = useState(false);

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

  async function like() {
    if (!router.query.id) return;
    await fetch("/api/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: router.query.id,
        location: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
    });
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

    document.addEventListener("mousemove", (e) => {
      const leoclap = document.getElementById("leoclap");
      if (!leoclap) return;

      const delX = e.clientX - leoclap.getBoundingClientRect().x - 40;
      const delY = e.clientY - leoclap.getBoundingClientRect().y - 40;

      const distance = Math.sqrt(delX * delX + delY * delY);

      const MAX_SCALE = 2;
      const MIN_SCALE = 1;

      const scale = 400 / distance;

      console.log(scale, distance);

      const getScale = () => {
        if (scale > MAX_SCALE) return MAX_SCALE;
        if (scale < MIN_SCALE) return MIN_SCALE;
        return scale;
      };

      if (distance < 400) {
        leoclap.style.scale = `${getScale()}`;
      } else {
        leoclap.style.scale = "1";
      }
    });
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
          <div className="content pb-10 relative">
            <div
              dangerouslySetInnerHTML={{ __html: blogData.content }}
              className="pb-[100px]"
            ></div>

            <button
              onClick={async () => {
                await like();
              }}
              onMouseDown={() => setMouseDown(true)}
              onMouseUp={() => setMouseDown(false)}
              id="leoclap"
              className="m-auto relative rounded-full transition-all"
              style={{
                border: mouseDown ? "5px solid white" : "none",
                zIndex: 999,
              }}
            >
              <img src="/clap.gif" className="!w-[80px] !rounded-full !m-0" />
            </button>

            <div className="flex items-end w-full justify-center gap-5 border-t border-zinc-400 py-5 absolute bottom-0">
              <a
                href="https://twitter.com/Aaditya86763230"
                className="text-white px-3 py-1 rounded-md"
              >
                <img src="/twitter.png" alt="" style={{ width: 40 }} />
              </a>

              <a
                href="https://youtube.com/@edyd1"
                className="px-3 py-1 rounded-md text-white"
              >
                <img src="/youtube.png" alt="" style={{ width: 40 }} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPost;
