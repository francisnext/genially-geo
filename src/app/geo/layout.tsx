import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { Toaster } from "sonner";

export const metadata = {
  title: {
    absolute: "Genially GEO",
    template: "%s | Genially GEO",
  },
};

export default async function GeoLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
