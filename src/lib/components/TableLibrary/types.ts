export interface IArticle {
	id: string;
	parentId?: string;
	name: string;
}
export type Dir = {
	id: string;
	name: string;
	parentId?: string | null;
	directories?: Dir[];
	articles?: IArticle[];
};
