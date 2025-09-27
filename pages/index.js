export async function getServerSideProps() {
  const API_KEY = process.env.LULUSTREAM_KEY;
  const apiUrl = `https://lulustream.com/api/file/list?key=${API_KEY}`;
  let videos = [];
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    videos = data.result?.files || [];
  } catch (e) {
    console.error('Lulustream fetch error', e);
  }
  return { props: { videos } };
}

import Link from 'next/link';
import Head from 'next/head';
import '../styles/globals.css';

export default function Home({ videos }) {
  return (
    <div className="container">
      <Head><title>Streaming - Home</title></Head>
      <h1 style={{textAlign:'center'}}>📺 Simple Streaming</h1>
      <div style={{height:12}} />
      <div className="grid">
        {videos.map(v => (
          <Link key={v.file_code} href={`/video/${v.file_code}`}>
            <a className="card" aria-label={v.title}>
              <img className="thumb" src={v.thumbnail} alt={v.title} />
              <div className="meta">
                <p className="title">{v.title}</p>
                <p className="sub">Duration: {v.length} sec</p>
              </div>
            </a>
          </Link>
        ))}
        {videos.length === 0 && <p>No videos found.</p>}
      </div>
    </div>
  )
}
