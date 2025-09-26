export async function getServerSideProps() {
  const API_KEY = process.env.LULUSTREAM_KEY;
  const res = await fetch(`https://lulustream.com/api/file/list?key=${API_KEY}`);
  const data = await res.json();

  return { props: { videos: data.result?.files || [] } };
}

export default function Home({ videos }) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lulustream Video List</h1>
      <div className="grid grid-cols-2 gap-4">
        {videos.map((v) => (
          <a key={v.file_code} href={`/video/${v.file_code}`} className="block">
            <img src={v.thumbnail} alt={v.title} className="rounded-md" />
            <p className="mt-2 text-sm">{v.title}</p>
            <p className="text-xs text-gray-500">{v.length} sec</p>
          </a>
        ))}
      </div>
    </div>
  );
}
