# portfolio (amairo.dev)

仕事の依頼主向けの、カジュアルな職務経歴書ページ。1段組の文章だけで組んでいる。

- 文言はすべて `lib/content.ts` にある。`【要確認: …】` は owner が埋める所。
- 書体は Zen Kaku Gothic New（SIL OFL 1.1）を、ページで使う文字だけに絞って `public/fonts/` に置いている。
  **文言を変えたら `bun run font:subset` を実行する。** 足りない文字があると `bun run test` が落ちる。
- 文字の大きさは 14px（注記・見出しラベル）、17px（本文）、24px（題）の3段。色は墨と灰の2色。
- OGP 画像は `public/og.png`（1200×630）。
