import { Document } from './document';

export interface Resource {
	_id: string;
	title: string;
	guild: string | { _id: string; name: string }; // Can be populated or just an ID
	fieldSettings?: object; // Replace with a more specific type if you have one
	documents?: Document[]; // Replace with a more specific type if you have one
	__v?: number;
}

export enum ResourceType {
	DOCUMENTATION = 'DOCUMENTATION',
	FIELD = 'FIELD'
}
