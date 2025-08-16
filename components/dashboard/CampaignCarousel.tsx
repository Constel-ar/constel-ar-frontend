import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Campaign } from "@/types/campaign";

interface CarouselProps {
    title: string,
    campaigns: Campaign[],
}

export default function CampaignCarouselSection({ title, campaigns } : CarouselProps) {
	return (
		<section className="mb-8">
			<h2 className="text-xl font-bold mb-4">{title}</h2>
			<Carousel>
				<CarouselContent>
					{campaigns.map((campaign: any) => (
						<CarouselItem key={campaign.id} className="basis-1/3">
							<div className="border rounded-lg p-4 h-48 flex flex-col justify-between">
								<div>
									<h3 className="font-semibold">{campaign.title}</h3>
									{/* Add more campaign info here */}
								</div>
								<button className="border rounded w-full py-1 mt-4">
									Ver más
								</button>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</section>
	);
}
