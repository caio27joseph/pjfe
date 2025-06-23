/**
 * Represents a Document object, mirroring the backend Mongoose schema.
 * This interface can be used in your SvelteKit frontend to ensure type safety
 * when working with data fetched from the API.
 */
export interface Document {
	_id: string;
	id: string;
	title: string;
	guild: string; // The ID of the parent Guild
	resource: string; // The ID of the parent Resource

	// Optional properties that map to a Discord embed structure
	description?: string;
	url?: string;
	color?: string; // Should be a hex color code as a string (e.g., "#FFFFFF")
	timestamp?: number; // Typically a Unix timestamp

	author?: {
		name: string;
		url?: string; // URL for the author's name
	};

	image?: {
		url: string;
	};

	thumbnail?: {
		url: string;
	};

	footer?: {
		text: string;
		icon_url?: string; // URL for the footer icon
	};

	fields?: {
		name: string;
		value: string;
		inline?: boolean;
	}[];
}
