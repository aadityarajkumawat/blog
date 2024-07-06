import { useEffect, useState } from "react";

export default function Analytics() {
  const [pageViews, setPageViews] = useState<{ _id: string; count: number }[]>(
    []
  );

  const [locations, setLocations] = useState<{ _id: string; count: number }[]>(
    []
  );

  async function getAnalytics() {
    const res = await fetch("/api/analytics", {
      method: "GET",
    });

    const body = (await res.json()) as {
      pageViews: Array<{ _id: string; count: number }>;
      locations: Array<{ _id: string; count: number }>;
    };

    console.log(body);

    setPageViews(body.pageViews.sort((a, b) => b.count - a.count));
    setLocations(body.locations.sort((a, b) => b.count - a.count));
  }

  useEffect(() => {
    getAnalytics();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-xl font-medium mb-10">Analytics</h1>

      <div className="flex flex-col">
        <div className="border rounded-md py-3 px-2 inline-block w-1/2 mb-10">
          <h2 className="font-normal mb-5">Page Views</h2>

          <ul>
            {pageViews.map((page, i) => (
              <li className={"py-1 pr-10 text-zinc-600"} key={page._id}>
                {page._id}: {page.count}
              </li>
            ))}
          </ul>
        </div>

        <div className="border rounded-md py-3 px-2 inline-block w-1/2">
          <h2 className="font-normal mb-5">Locations</h2>

          <ul>
            {locations.map((page, i) => (
              <li className={"py-1 pr-10 text-zinc-600"} key={page._id}>
                {page._id}: {page.count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
