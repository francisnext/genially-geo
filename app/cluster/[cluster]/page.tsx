import KeywordPageClient from "./client-page";

interface PageProps {
  params: Promise<{ cluster: string }>
}

export default async function KeywordPage({ params }: PageProps) {
  const { cluster } = await params;
  return <KeywordPageClient cluster={cluster} />;
}