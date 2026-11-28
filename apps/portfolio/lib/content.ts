export const profile = {
	name: "鈴木天音",
	kana: "すずき あまね",
	roman: "Amane Suzuki",
	avatar: "/profile.jpg",
	tagline: "AI を使った仕組みづくり、手伝います。",
	credit: "機械学習エンジニア・EM / Kaggle Master",
	lead: "機械学習エンジニアとしてレコメンドや ML 基盤に取り組み、いまは AI エージェントまわりの開発をしています。業務委託のエンジニアとしても、AI 活用の相談相手としても、お手伝いできます。",
};

export const dm = {
	href: "https://x.com/SakuEji",
	handle: "@SakuEji",
	label: "X の DM で相談する",
	note: "「こんなこと頼めますか？」くらいの段階で大丈夫です。料金はお問い合わせください。",
};

export type Service = {
	id: string;
	ask: string;
	title: string;
	summary: string;
	items: string[];
};

export const services: Service[] = [
	{
		id: "engineering",
		ask: "手を動かしてほしいなら",
		title: "エンジニアとして手を動かす",
		summary: "業務委託で、AI を組み込んだ仕組みを設計からつくります。",
		items: [
			"LLM や AI エージェントを業務・プロダクトに組み込む",
			"データの整備から機械学習モデル、運用（MLOps）まで",
			"Python / TypeScript で試作して、使える形に仕上げる",
		],
	},
	{
		id: "advisory",
		ask: "相談に乗ってほしいなら",
		title: "AI 活用の相談・顧問",
		summary: "どこに AI を使うと効くのかを、一緒に考えます。",
		items: [
			"AI を使うと効く業務の洗い出しと優先順位づけ",
			"技術選定や進め方の壁打ち",
			"チームで AI を使い続けるための体制づくり",
		],
	},
];

export type CareerEntry = {
	org: string;
	role: string;
	detail: string;
	period: string;
};

export const career: CareerEntry[] = [
	{
		org: "キャディ株式会社",
		role: "機械学習エンジニア → EM",
		detail:
			"機械学習基盤の構築とデータチームの立ち上げ。いまは AI エージェント関連の開発をしています。",
		period: "【要確認: 入社年】〜現在",
	},
	{
		org: "株式会社ディー・エヌ・エー（DeNA）",
		role: "機械学習エンジニア",
		detail: "レコメンドや最適化に取り組みました。",
		period: "【要確認: 在籍期間】",
	},
	{
		org: "東京大学大学院",
		role: "ケモインフォマティクス専攻",
		detail: "化学 × 情報科学の研究をしていました。",
		period: "【要確認: 修了年】",
	},
];

export const highlights = [
	"Kaggle Master",
	"個人開発で iOS アプリ・Web サービスを公開",
	"エンジニア経験【要確認: 経験年数】",
];

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

export type Step = { title: string; body: string };

export const steps: Step[] = [
	{
		title: "X の DM で相談",
		body: "やりたいこと・困っていることを、ざっくり送ってください。",
	},
	{
		title: "オンラインでお話",
		body: "状況を聞いて、お手伝いできそうかを一緒に確かめます。【要確認: 初回相談の時間と有料・無料】",
	},
	{
		title: "進め方を決める",
		body: "業務委託か顧問か、期間や稼働量、料金をすり合わせます。",
	},
	{ title: "スタート", body: "小さく始めて、様子を見ながら広げていきます。" },
];

export const terms: { label: string; value: string }[] = [
	{ label: "稼働", value: "【要確認: 週あたりの稼働時間・対応できる時間帯】" },
	{ label: "場所", value: "【要確認: リモートのみか、訪問も可か】" },
	{ label: "契約", value: "【要確認: 契約形態（準委任など）】" },
	{
		label: "料金",
		value: "内容に合わせてご相談します。DM でお問い合わせください。",
	},
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
		"鈴木天音 — AI を使った仕組みづくり、手伝います。エンジニアとして業務委託 / AI 活用の相談・顧問",
	title: "鈴木天音 | AI を使った仕組みづくり、手伝います",
	description:
		"機械学習エンジニアの鈴木天音です。AI を組み込んだ仕組みの開発（業務委託）と、AI 活用の相談・顧問を受けています。ご依頼は X の DM へ。",
};
