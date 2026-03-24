import { Suspense } from "react";
import AccountPage from "@/app/pages/Account/AccountPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <main>
          <p className="font-M-500 text-text-secondary">Loading account...</p>
        </main>
      }
    >
      <AccountPage />
    </Suspense>
  );
}
