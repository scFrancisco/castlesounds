import type { Metadata } from "next";
import AdminApp from "@/components/admin/AdminApp";

// reachable only by typing the link — not linked anywhere and kept out of search engines
export const metadata: Metadata = {
  title: "Backstage — Castle",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminPage() {
  return <AdminApp />;
}
