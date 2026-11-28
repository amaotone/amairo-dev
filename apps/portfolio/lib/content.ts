export const profile = {
	name: "鈴木天音",
	kana: "すずき あまね",
	roman: "Amane Suzuki",
	role: "機械学習エンジニア・EM / Kaggle Master",
	tagline: "AI を使った仕組みづくりを、手伝っています。",
	intro: [
		"機械学習エンジニアの鈴木天音です。レコメンドや機械学習の基盤づくりに取り組んできて、いまは AI エージェントまわりの開発をしています。",
		"副業で受けているのは、エンジニアとしての業務委託と、AI 活用の相談・顧問の二つです。",
	],
};

export const dm = {
	href: "https://x.com/SakuEji",
	handle: "@SakuEji",
	/** One quiet line inside the first screen. */
	inline: "ご相談は X の DM へ",
	/** The call to action at the end of the page. */
	closing: [
		"「こんなこと頼めますか？」くらいの段階で大丈夫なので、気軽に声をかけてください。料金は内容に合わせて相談させてください。",
	],
	cta: "X の DM で相談する",
};

export const headings = {
	services: "頼めること",
	career: "経歴",
	skills: "使える技術",
	flow: "進め方",
	terms: "条件",
	contact: "ご相談",
};

export type Service = {
	id: "engineering" | "advisory";
	title: string;
	body: string;
};

export const services: Service[] = [
	{
		id: "engineering",
		title: "エンジニアとして手を動かす（業務委託）",
		body: "LLM や AI エージェントを、業務やプロダクトに組み込むところまでつくります。データの整備から機械学習モデル、運用（MLOps）まで見られます。Python と TypeScript で試作して、使える形に仕上げます。",
	},
	{
		id: "advisory",
		title: "AI 活用の相談・顧問",
		body: "どの業務に AI を使うと効くのかを一緒に洗い出して、優先順位をつけます。技術選定や進め方の壁打ち、チームで AI を使い続けるための体制づくりも手伝います。",
	},
];

export type TimelineEntry = { year: string; event: string };

/** Oldest first, like a Japanese résumé. */
export const timeline: TimelineEntry[] = [
	{
		year: "【要確認: 修了年】",
		event:
			"東京大学大学院でケモインフォマティクスを専攻。化学 × 情報科学の研究をしていました。",
	},
	{
		year: "【要確認: 在籍期間】",
		event:
			"株式会社ディー・エヌ・エー（DeNA）で機械学習エンジニアとして、レコメンドや最適化に取り組みました。",
	},
	{
		year: "【要確認: 入社年】",
		event:
			"キャディ株式会社に入社。機械学習エンジニアとして機械学習基盤をつくり、データチームを立ち上げて、EM になりました。",
	},
	{
		year: "現在",
		event: "キャディで AI エージェント関連の開発をしています。",
	},
];

export const aside =
	"Kaggle Master です。個人開発でも iOS アプリや Web サービスをつくって公開しています。エンジニア経験は【要確認: 経験年数】です。";

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
	{
		label: "AI・機械学習",
		items: [
			"LLM・AI エージェント",
			"レコメンド",
			"最適化",
			"MLOps",
			"PyTorch",
			"LightGBM",
		],
	},
	{ label: "開発", items: ["Python", "TypeScript", "React", "React Native"] },
	{
		label: "チーム",
		items: ["データチームの立ち上げ", "エンジニアリングマネジメント"],
	},
];

export const steps: string[] = [
	"X の DM で、やりたいことや困っていることをざっくり送ってください。",
	"オンラインで状況を聞いて、お手伝いできそうかを一緒に確かめます。【要確認: 初回相談の時間と有料・無料】",
	"業務委託か顧問か、期間や稼働量、料金をすり合わせます。",
	"小さく始めて、様子を見ながら広げていきます。",
];

export const terms: { label: string; value: string }[] = [
	{ label: "稼働", value: "【要確認: 週あたりの稼働時間・対応できる時間帯】" },
	{ label: "場所", value: "【要確認: リモートのみか、訪問も可か】" },
	{ label: "契約", value: "【要確認: 契約形態（準委任など）】" },
	{ label: "料金", value: "内容に合わせて相談させてください。" },
];

export const links = [
	{ label: "GitHub", href: "https://github.com/amaotone" },
	{ label: "Kaggle", href: "https://www.kaggle.com/amaotone" },
	{ label: "ブログ", href: "https://amalog.hateblo.jp" },
	{ label: "note", href: "https://note.com/amaotone" },
	{ label: "SpeakerDeck", href: "https://speakerdeck.com/amaotone" },
];

export const site = {
	url: "https://amairo.dev",
	ogImage: "https://amairo.dev/og.png",
	ogImageAlt:
		"鈴木天音 — AI を使った仕組みづくりを、手伝っています。エンジニアとしての業務委託と、AI 活用の相談・顧問。ご相談は X の DM へ。",
	title: "鈴木天音 | AI を使った仕組みづくりを、手伝っています",
	description:
		"機械学習エンジニアの鈴木天音です。AI を組み込んだ仕組みの開発（業務委託）と、AI 活用の相談・顧問を受けています。ご相談は X の DM へ。",
};
