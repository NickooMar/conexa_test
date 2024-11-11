import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;

  console.log({ locale });

  return (
    <div>
      <Button>
        <Link href={"/signin"}>Login</Link>
      </Button>
    </div>
  );
}
