import Head from "next/head";
import {
	aside,
	dm,
	headings,
	links,
	profile,
	services,
	site,
	skills,
	steps,
	terms,
	timeline,
} from "../lib/content";
import s from "../styles/Home.module.css";

const DmLink = ({ children }: { children: React.ReactNode }) => (
	<a href={dm.href} target="_blank" rel="noopener noreferrer">
		{children}
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
			<div className={s.page}>
				<main>
					<header>
						<p>
							<span className={s.name}>{profile.name}</span>
							<span className={s.note}>
								{"　"}
								{profile.kana} / {profile.roman}
							</span>
						</p>
						<p className={s.note}>{profile.role}</p>
						<h1 className={s.title}>{profile.tagline}</h1>
						<div className={s.prose}>
							{profile.intro.map((p) => (
								<p key={p}>{p}</p>
							))}
							<p>
								<DmLink>
									{dm.inline}（{dm.handle}）
								</DmLink>
							</p>
						</div>
					</header>

					<section className={s.section} aria-labelledby="services">
						<h2 id="services">{headings.services}</h2>
						{services.map((sv) => (
							<div key={sv.id}>
								<h3>{sv.title}</h3>
								<p>{sv.body}</p>
							</div>
						))}
					</section>

					<section className={s.section} aria-labelledby="career">
						<h2 id="career">{headings.career}</h2>
						<dl className={s.timeline}>
							{timeline.map((t) => (
								<div key={t.event} style={{ display: "contents" }}>
									<dt>{t.year}</dt>
									<dd>{t.event}</dd>
								</div>
							))}
						</dl>
						<p>{aside}</p>
					</section>

					<section className={s.section} aria-labelledby="skills">
						<h2 id="skills">{headings.skills}</h2>
						<dl className={s.pairs}>
							{skills.map((g) => (
								<div key={g.label} style={{ display: "contents" }}>
									<dt>{g.label}</dt>
									<dd>{g.items.join("、")}</dd>
								</div>
							))}
						</dl>
					</section>

					<section className={s.section} aria-labelledby="flow">
						<h2 id="flow">{headings.flow}</h2>
						<ol className={s.steps}>
							{steps.map((st) => (
								<li key={st}>{st}</li>
							))}
						</ol>
						<dl className={s.pairs} aria-label={headings.terms}>
							{terms.map((t) => (
								<div key={t.label} style={{ display: "contents" }}>
									<dt>{t.label}</dt>
									<dd>{t.value}</dd>
								</div>
							))}
						</dl>
					</section>

					<section className={s.section} aria-labelledby="contact">
						<h2 id="contact">{headings.contact}</h2>
						<div className={s.prose}>
							{dm.closing.map((p) => (
								<p key={p}>{p}</p>
							))}
							<p>
								<DmLink>
									{dm.cta}（{dm.handle}）
								</DmLink>
							</p>
						</div>
					</section>
				</main>
				<footer className={`${s.footer} ${s.note}`}>
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
			</div>
		</>
	);
}
