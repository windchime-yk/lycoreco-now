/**
 * @jsx h
 * @jsxFrag Fragment
 */
import { Fragment, h, type Handler, html, serve, UnoCSS } from "./deps.ts";
import {
  convertElapsedDateTime,
  getNowEpisodeText,
  incrementEpisodeNum,
  LAST_EPISODE_DATE,
  LAST_EPISODE_NUM,
} from "./core.ts";

const now = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });

console.log({ now, LAST_EPISODE_DATE });

const SITE_NAME = "今、リコリコって何話だっけ？";
const SITE_DESCRIPTION = "リコリコの最新話(？)がわかるだけのサイトです";
const nowEpisodeNum = incrementEpisodeNum(
  LAST_EPISODE_NUM,
  convertElapsedDateTime(now, LAST_EPISODE_DATE, "date"),
);
const nowEpisodeText = getNowEpisodeText(
  now,
  nowEpisodeNum,
);

html.use(UnoCSS());

const handler: Handler = () => {
  return html({
    title: SITE_NAME,
    meta: {
      descrition: SITE_DESCRIPTION,
    },
    status: 200,
    styles: [
      `
      * {
        box-sizing: border-box
      }
      `,
    ],
    lang: "ja",
    body: (
      <>
        <header class="py-9">
          <h1 class="text-4xl font-bold text-center">{SITE_NAME}</h1>
        </header>
        <main class="mt-9">
          <p class="text-6xl font-bold text-center">{nowEpisodeText}</p>
          <div class="block mt-18 text-center">
            <a
              class="inline-block mx-a py-2 px-3 bg-lightblue rd c-white"
              href={`https://twitter.com/intent/tweet?text=${nowEpisodeText}&url=%0a%0ahttps://lycoreco-now.deno.dev%0a&hashtags=今リコリコって何話だっけ,リコリコ${nowEpisodeNum}話`}
              target="_blank"
              rel="noreferrer noopener"
            >
              ツイートする
            </a>
          </div>
        </main>
      </>
    ),
  });
};

const ADDR = ":8090";
serve(handler, { addr: ADDR });
console.log(`listen to http://localhost${ADDR}`);
