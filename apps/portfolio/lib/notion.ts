import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

export type Profile = {
	name: string;
	nameJa: string;
	introduction: string[];
};

export type Product = {
	title: string;
	description: string;
	link?: string;
	blog?: string;
	code?: string;
	image: string;
	tags: string[];
};

export type Skill = {
	category: string;
	items: string[];
};

export const getProfile = async (): Promise<Profile> => {
	const response = await notion.databases.query({
		database_id: process.env.NOTION_PROFILE_DB_ID!,
		filter: {
			property: "公開",
			checkbox: {
				equals: true,
			},
		},
	});

	const page = response.results[0];
	// Notionのプロパティに応じて適切にマッピング
	return {
		name: page.properties.name.title[0].plain_text,
		nameJa: page.properties.nameJa.rich_text[0].plain_text,
		introduction: page.properties.introduction.rich_text.map(
			(text) => text.plain_text,
		),
	};
};

export const getProducts = async (): Promise<Product[]> => {
	const response = await notion.databases.query({
		database_id: process.env.NOTION_PRODUCTS_DB_ID!,
		filter: {
			property: "公開",
			checkbox: {
				equals: true,
			},
		},
		sorts: [
			{
				property: "順序",
				direction: "ascending",
			},
		],
	});

	return response.results.map((page) => ({
		title: page.properties.title.title[0].plain_text,
		description: page.properties.description.rich_text[0].plain_text,
		link: page.properties.link?.url || undefined,
		blog: page.properties.blog?.url || undefined,
		code: page.properties.code?.url || undefined,
		image: page.properties.image.files[0].file.url,
		tags: page.properties.tags.multi_select.map((tag) => tag.name),
	}));
};

export const getSkills = async (): Promise<Skill[]> => {
	const response = await notion.databases.query({
		database_id: process.env.NOTION_SKILLS_DB_ID!,
		sorts: [
			{
				property: "順序",
				direction: "ascending",
			},
		],
	});

	return response.results.map((page) => ({
		category: page.properties.category.title[0].plain_text,
		items: page.properties.items.multi_select.map((item) => item.name),
	}));
};
