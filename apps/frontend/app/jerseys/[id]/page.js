import JerseyDetailClient from "../../../components/JerseyDetailClient";

export const metadata = {
  title: "Detail Jersey | EuroKits",
  description: "Detail jersey klub bola Eropa premium."
};

export default async function JerseyDetailPage({ params }) {
  const resolvedParams = await params;

  return <JerseyDetailClient id={resolvedParams.id} />;
}
