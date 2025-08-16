import { AppHeader } from "@/components/app-header";
import { ProfileClientPage } from "./page.client";

export default function RecipientsDashboard() {
  return (
    <div>
      <AppHeader />
      <div className="p-8 pt-0">
        <ProfileClientPage />
      </div>
    </div>
  );
}
