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

export interface ILibrary {
	id: string;
	name: string;
	root?: Dir[];
	articles?: IArticle[];
}
