import { Hono } from "@hono/hono";
import { Style } from "@hono/hono/css";
import { serveStatic } from "@hono/hono/deno";
import { headerStyle, mainStyle, titleStyle } from "~/mod.css.ts";

const SITE_NAME = "今、リコリコって何話だっけ？";
const SITE_DESCRIPTION = "リコリコの最新話(？)がわかるだけのサイトです";

const app = new Hono();

app.use("/static/*", serveStatic({ root: "./" }));

app.get("/", (c) => {
  return c.html(
    <html>
      <head>
        <title>{SITE_NAME}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="descrition" content={SITE_DESCRIPTION} />
        <link rel="stylesheet" href="https://fonts.xz.style/serve/inter.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
        />
        <Style />
      </head>
      <body>
        <header class={headerStyle}>
          <h1 class={titleStyle}>{SITE_NAME}</h1>
        </header>
        <main class={mainStyle}>
          <img src="/static/image.png" alt="" />
          <p>
            リコリコ第1期146話目(？)にして、新作アニメーションが放送されました。<br />それに伴って、カウントを停止しました。
          </p>
          <p>放送おめでとうございます🎉🎉🎉🎉</p>
          <section>
            <h2>各話リンク</h2>
            <ul>
              <li>
                <a href="https://youtu.be/z4lNa68phLs">#1</a>
              </li>
            </ul>
          </section>
        </main>
      </body>
    </html>,
  );
});

Deno.serve({ port: 8090 }, app.fetch);
