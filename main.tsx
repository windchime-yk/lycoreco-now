import { Hono } from "@hono/hono";
import { Style } from "@hono/hono/css";
import {
  convertElapsedDateTime,
  getNowEpisodeText,
  incrementEpisodeNum,
  LAST_EPISODE_DATE,
  LAST_EPISODE_NUM,
} from "~/core.ts";
import {
  buttonStyle,
  buttonWrapperStyle,
  headerStyle,
  mainStyle,
  nowEpisodeTextStyle,
  titleStyle,
} from "~/main.css.ts";

const SITE_NAME = "今、リコリコって何話だっけ？";
const SITE_DESCRIPTION = "リコリコの最新話(？)がわかるだけのサイトです";

const app = new Hono();

app.get("/", (c) => {
  const now = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
  const nowEpisodeNum = incrementEpisodeNum(
    LAST_EPISODE_NUM,
    convertElapsedDateTime(now, LAST_EPISODE_DATE, "date"),
  );
  const nowEpisodeText = getNowEpisodeText(
    now,
    nowEpisodeNum,
  );

  return c.html(
    <html>
      <head>
        <title>{SITE_NAME}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="descrition" content={SITE_DESCRIPTION} />
        <link
          href="https://cdn.jsdelivr.net/npm/modern-normalize@2.0.0/modern-normalize.min.css"
          rel="stylesheet"
        />
        <Style />
      </head>
      <body>
        <header class={headerStyle}>
          <h1 class={titleStyle}>{SITE_NAME}</h1>
        </header>
        <main class={mainStyle}>
          <p class={nowEpisodeTextStyle}>{nowEpisodeText}</p>
          <div class={buttonWrapperStyle}>
            <a
              class={buttonStyle}
              href={`https://twitter.com/intent/tweet?text=${nowEpisodeText}&url=%0a%0ahttps://lycoreco-now.deno.dev%0a&hashtags=今リコリコって何話だっけ,リコリコ${nowEpisodeNum}話`}
              target="_blank"
              rel="noreferrer noopener"
            >
              ツイートする
            </a>
          </div>
        </main>
      </body>
    </html>,
  );
});

Deno.serve({ port: 8090 }, app.fetch);
