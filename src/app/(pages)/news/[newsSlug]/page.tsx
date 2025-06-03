import { notFound } from "next/navigation";
import { newsArticles } from "@/lib/constants"; // Adjust path to where your articles are exported
import { Calendar } from "lucide-react";
import Image from "next/image";

type Props = {
  params: {
    newsSlug: string;
  };
};

// Optional: force dynamic rendering if using Next.js 13+
export const dynamic = 'force-dynamic';

const NewsArticlePage = ({ params }: Props) => {
  const article = newsArticles.find((a) => a.slug === params.newsSlug);

  if (!article) {
    return notFound();
  }

  return (
    <main className="min-h-screen px-6 lg:px-24 py-16">
      <div className="max-w-4xl mx-auto space-y-6">
        <Image
          src={article.imageUrl}
          alt={article.title}
          width={1200}
          height={600}
          className="rounded-xl object-cover w-full h-64 sm:h-96"
          priority // optional, makes featured image load faster
        />
        <div className="space-y-2">
          <span className="inline-flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" /> {article.date}
          </span>
          <h1 className="text-3xl font-bold text-customBlueDark">{article.title}</h1>
        </div>
        <article
          className="prose prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </main>
  );
};

export default NewsArticlePage;
