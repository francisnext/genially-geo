import KeywordPageClient from "./client-page";

interface PageProps {
  params: Promise<{ keyword: string }>
}

export default async function KeywordPage({ params }: PageProps) {
  const { keyword } = await params;
  return <KeywordPageClient keyword={keyword} />;
}