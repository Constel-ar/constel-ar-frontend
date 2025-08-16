import { AppHeader } from "@/components/app-header";
import { CreateCampaignPageClient } from "./page.client";

export default function RecipientsDashboard() {
  return (
    <div className="w-full">
      <AppHeader />
      <div className="w-full p-8 pt-0">
        <CreateCampaignPageClient />
      </div>
    </div>
  );
}
