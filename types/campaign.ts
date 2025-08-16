export interface Milestone {
	title: string;
	description: string;
}

export interface Campaign {
	title: string;
	description: string;
	total_goal: number;
	amount_donated: number;
	number_of_donors: number;
	milestones: Milestone[];
	status: "Pending" | "Approved";
}
