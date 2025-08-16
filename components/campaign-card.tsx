import { Campaign } from "../types/campaign";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = (campaign.amount_donated / campaign.total_goal) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{campaign.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{campaign.description}</p>
        <div className="mt-4">
          <Progress value={progress} />
          <div className="mt-2 flex justify-between">
            <span>${campaign.amount_donated.toLocaleString()}</span>
            <span>${campaign.total_goal.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span>{campaign.number_of_donors} donors</span>
        <Badge variant={campaign.status === "Approved" ? "default" : "secondary"}>
          {campaign.status}
        </Badge>
      </CardFooter>
    </Card>
  );
}
