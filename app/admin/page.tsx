import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { campaigns } from "../dashboard/campaign-data";
import { CampaignCard } from "@/components/campaign-card";

export default function Page() {
  const pendingCampaigns = campaigns.filter((c) => c.status === "Pending");
  const approvedCampaigns = campaigns.filter((c) => c.status === "Approved");

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <h2 className="text-2xl font-bold">Pending Campaigns</h2>
                <Carousel className="mt-4">
                  <CarouselContent>
                    {pendingCampaigns.map((campaign) => (
                      <CarouselItem key={campaign.title} className="md:basis-1/2 lg:basis-1/3">
                        <CampaignCard campaign={campaign} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
              <div className="px-4 lg:px-6">
                <h2 className="text-2xl font-bold">Approved Campaigns</h2>
                <Carousel className="mt-4">
                  <CarouselContent>
                    {approvedCampaigns.map((campaign) => (
                      <CarouselItem key={campaign.title} className="md:basis-1/2 lg:basis-1/3">
                        <CampaignCard campaign={campaign} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
