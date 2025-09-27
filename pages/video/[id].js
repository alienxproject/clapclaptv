import Head from 'next/head';
import Link from 'next/link';
import '../../styles/globals.css';

export async function getServerSideProps(context) {
  const id = context.params.id;
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
  const video = videos.find(v => v.file_code === id) || null;
  const recommendations = videos.filter(v => v.file_code !== id).slice(0,6);
  return { props: { video, recommendations } };
}

export default function VideoPage({ video, recommendations }) {
  if (!video) {
    return (<div className="container"><p>Video not found</p><p><Link href="/">Back</Link></p></div>);
  }
  return (
    <div className="container">
      <Head><title>{video.title}</title></Head>
      <p><Link href="/">← Back</Link></p>
      <div className="player-wrap" style={{marginTop:8}}>
        <iframe
          src={`https://luluvid.com/e/${video.file_code}`}
          scrolling="no"
          frameBorder="0"
          width="100%"
          height="400"
          allowFullScreen={true}
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
        ></iframe>
      </div>
      <h1 style={{marginTop:12}}>{video.title}</h1>
      <p className="sub">Duration: {video.length} sec</p>
      <h3 style={{marginTop:18}}>Recommended</h3>
      <div className="grid" style={{marginTop:8}}>
        {recommendations.map(r => (
          <Link key={r.file_code} href={`/video/${r.file_code}`}>
            <a className="card">
              <img className="thumb" src={r.thumbnail} alt={r.title} />
              <div className="meta"><p className="title">{r.title}</p><p className="sub">{r.length} sec</p></div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}
