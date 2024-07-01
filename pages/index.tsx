import { useEffect, useState } from "react";
import { Flex } from "../components/flex";
import { LeftChevron } from "../components/left_chevron";
import { Post } from "../components/post";

interface BlogMetaData {
  title: string;
  slug: string;
  date: string;
  thumbnail: string;
}

type ColorScheme = "light" | "dark";

interface HomeLocalState {
  viewMore: boolean;
  colorMode: ColorScheme;
}

export default function Home() {
  const [local, setLocal] = useState<HomeLocalState>({
    viewMore: false,
    colorMode: "light",
  });

  const [data, setData] = useState<any>(null);

  async function registerAView() {
    await fetch("/api/hit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: Intl.DateTimeFormat().resolvedOptions().timeZone,
        id: "root",
      }),
    });
  }

  useEffect(() => {
    async function as() {
      const res = await fetch("/api/posts/all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });
      const data = await res.json();
      console.log(data);

      setData(data);

      await registerAView();
    }
    as();
  }, []);

  function updateState(update: Partial<HomeLocalState>) {
    setLocal((l) => ({ ...l, ...update }));
  }

  useEffect(() => {
    function getColorMode(): ColorScheme {
      return (window.localStorage.getItem("theme") as ColorScheme) || "dark";
    }
    updateState({ colorMode: getColorMode() });
  }, [data]);

  console.log({ local });

  return (
    <div className="dark:bg-graybg dark:text-white min-h-screen transition-all">
      <div className="m-auto main-body">
        <Flex className="justify-between items-center py-5 cursor-pointer">
          <div>
            <b>
              {!local.viewMore ? (
                "edy's blog"
              ) : (
                <Flex className="items-center">
                  <button
                    className="mr-2"
                    onClick={() => updateState({ viewMore: false })}
                  >
                    <LeftChevron />
                  </button>
                  <p>posts</p>
                </Flex>
              )}
            </b>
          </div>
          <button className="active:scale-[0.95] hover:scale-[0.97] border-2 border-gray-200 rounded-md">
            <div
              className="p-4"
              onClick={() => {
                if (localStorage.getItem("theme") === "light") {
                  localStorage.setItem("theme", "dark");
                  document.documentElement.classList.add("dark");
                  setLocal({ ...local, colorMode: "dark" });
                } else {
                  localStorage.setItem("theme", "light");
                  document.documentElement.classList.remove("dark");
                  setLocal({ ...local, colorMode: "light" });
                }
              }}
            ></div>
          </button>
        </Flex>
        {!local.viewMore && (
          <div>
            <p className="text-justify">
              hi, I am a software engineer, who loves to work with web
              technologies and make videos to share my understanding of things,
              a little over 4 years of programming and I have learnt that the
              best way to understand things is building mental models and
              applying them.
            </p>
            <br />
          </div>
        )}
        <div className="my-5"></div>
        {!data ? (
          <div>loading...</div>
        ) : (
          <div>
            {data
              .sort((a: any, b: any) => b.index - a.index)
              .map((p: any, i: number) => (
                <Post
                  key={i}
                  title={p.title}
                  date={p.date}
                  slug={p.slug}
                  description={p.description}
                  thumbnail={p.thumbnail}
                />
              ))}
          </div>
        )}

        {!local.viewMore && (
          <div className="pb-10">
            <button
              className="underline"
              onClick={() => updateState({ viewMore: true })}
            >
              view more
            </button>
          </div>
        )}
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
    </div>
  );
}
