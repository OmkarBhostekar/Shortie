import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

type AliasPageProps = {
  params: {
    alias: string;
  };
};

export default async function AliasPage({ params }: AliasPageProps) {
  const { alias } = params;

  const res = await fetch(`http://localhost:4000/api/urls/${alias}`);
  const shortUrl = await res.json();
  console.log(shortUrl);
  if (res.status === 200) {
    return redirect("https://" + shortUrl.data);
  }
  throw new Error("Not found");
}
