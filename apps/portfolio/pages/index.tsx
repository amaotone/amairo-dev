import Head from "next/head";
import Image from "next/image";
import { XIcon } from "../components/icons";
import {
	career,
	dm,
	highlights,
	links,
	profile,
	services,
	site,
	skills,
	steps,
	terms,
} from "../lib/content";
import s from "../styles/Home.module.css";

const DmButton = ({ className = "" }: { className?: string }) => (
	<a
		className={`${s.dm} ${className}`}
		href={dm.href}
		target="_blank"
		rel="noopener noreferrer"
	>
		<XIcon />
		{dm.label}
	</a>
);

const Meta = () => (
	<Head>
		<title>{site.title}</title>
		<meta name="description" content={site.description} />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="canonical" href={`${site.url}/`} />
		<meta property="og:type" content="website" />
		<meta property="og:site_name" content="amairo.dev" />
		<meta property="og:locale" content="ja_JP" />
		<meta property="og:url" content={`${site.url}/`} />
		<meta property="og:title" content={site.title} />
		<meta property="og:description" content={site.description} />
		<meta property="og:image" content={site.ogImage} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta property="og:image:alt" content={site.ogImageAlt} />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:site" content={dm.handle} />
		<meta name="twitter:creator" content={dm.handle} />
	</Head>
);

export default function Home() {
	return (
		<>
			<Meta />
			<main className={s.wrap}>
				<header className={s.hero}>
					<Image
						className={s.avatar}
						src={profile.avatar}
						alt=""
						width={72}
						height={72}
						priority
					/>
					<p className={s.hi}>
						こんにちは、<strong>{profile.name}</strong>（{profile.kana}）です。
					</p>
					<p className={s.credit}>{profile.credit}</p>
					<h1 className={s.tagline}>{profile.tagline}</h1>
				</header>

				<div className={s.choices}>
					{services.map((sv) => (
						<section
							key={sv.id}
							className={`${s.choice} ${s[sv.id]}`}
							aria-labelledby={`sv-${sv.id}`}
						>
							<p className={s.ask}>{sv.ask}</p>
							<h2 id={`sv-${sv.id}`}>{sv.title}</h2>
							<p className={s.summary}>{sv.summary}</p>
							<ul>
								{sv.items.map((it) => (
									<li key={it}>{it}</li>
								))}
							</ul>
						</section>
					))}
				</div>

				<section className={s.section} aria-labelledby="career">
					<h2 id="career">どんな人？</h2>
					<p className={s.summary}>{profile.lead}</p>
					<ol className={s.career}>
						{career.map((c) => (
							<li key={c.org}>
								<span className={s.period}>{c.period}</span>
								<span className={s.org}>{c.org}</span>
								<span className={s.role}>{c.role}</span>
								<span>{c.detail}</span>
							</li>
						))}
					</ol>
					<ul className={s.chips}>
						{highlights.map((h) => (
							<li key={h} className={s.chip}>
								{h}
							</li>
						))}
					</ul>
				</section>

				<section className={s.section} aria-labelledby="skills">
					<h2 id="skills">できること</h2>
					<div className={s.skills}>
						{skills.map((g) => (
							<div key={g.label}>
								<h3>{g.label}</h3>
								<ul className={s.chips}>
									{g.items.map((it) => (
										<li key={it} className={s.chip}>
											{it}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</section>

				<section className={s.section} aria-labelledby="flow">
					<h2 id="flow">どう進める？</h2>
					<ol className={s.steps}>
						{steps.map((st) => (
							<li key={st.title}>
								<h3>{st.title}</h3>
								<p>{st.body}</p>
							</li>
						))}
					</ol>
					<dl className={s.terms}>
						{terms.map((t) => (
							<div key={t.label}>
								<dt>{t.label}</dt>
								<dd>{t.value}</dd>
							</div>
						))}
					</dl>
				</section>

				<section className={s.final} aria-labelledby="contact">
					<h2 id="contact">まずは気軽にどうぞ</h2>
					<p>{dm.note}</p>
					<DmButton />
				</section>
			</main>
			<footer className={s.footer}>
				{links.map((l) => (
					<a
						key={l.href}
						href={l.href}
						target="_blank"
						rel="noopener noreferrer"
					>
						{l.label}
					</a>
				))}
			</footer>
			<aside aria-label="ご依頼の窓口">
				<DmButton className={s.float} />
			</aside>
		</>
	);
}
