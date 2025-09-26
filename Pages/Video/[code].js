import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { code } = context.params;
  return { props: { code } };
}

export default function VideoPage({ code }) {
  const router = useRouter();

  return (
    <div className="p-4">
      <button onClick={() => router.back()} className="mb-4 text-blue-500">← Back</button>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={`https://lulustream.com/embed-${code}.html`}
          width="100%"
          height="480"
          allowFullScreen
        />
      </div>
    </div>
  );
}
