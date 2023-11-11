import { assertEquals } from "std/asserts";
import {
  convertElapsedDateTime,
  getNowEpisodeText,
  incrementEpisodeNum,
  LAST_EPISODE_DATE,
  LAST_EPISODE_NUM,
} from "~/core.ts";

/** 最終回放送日時からキッカリ1日後 */
const JUST_ONE_DATE = "2022/09/25 23:30:00";
/** 最終回放送日時から1日後の00:00 */
const START_ONE_DATE = "2022/09/25 00:00:00";
/** 最終回放送日時からキッカリ3日前 */
const JUST_PAST_THIRD_DATE = "2022/09/28 23:30:00";
/** 最終回放送日時からキッカリ2日前 */
const JUST_PAST_SECOND_DATE = "2022/09/29 23:30:00";
/** 最終回放送日時からキッカリ1日前 */
const JUST_PAST_ONE_DATE = "2022/09/30 23:30:00";
/** 最終回放送日時からキッカリ1週間後 */
const JUST_ONE_WEEK = "2022/10/01 23:30:00";
/** 最終回放送日時から1週間後の00:00 */
const START_ONE_WEEK = "2022/10/01 00:00:00";
/** 最終回放送日時から4週間後の00:00 */
const START_FOUR_WEEK = "2022/10/22 00:00:00";

Deno.test("最終回放送日時からの経過日時テスト", async (t) => {
  await t.step("経過日数", async (t) => {
    await t.step("最終回放送日から1日後の経過日数(放送時間）", () => {
      assertEquals<number>(
        convertElapsedDateTime(
          JUST_ONE_DATE,
          LAST_EPISODE_DATE,
          "date",
        ),
        1.9791666666666667,
      );
    });
    await t.step("最終回放送日から1日後の経過日数(0時）", () => {
      assertEquals<number>(
        convertElapsedDateTime(
          START_ONE_DATE,
          LAST_EPISODE_DATE,
          "date",
        ),
        1,
      );
    });
    await t.step("最終回放送日から1週間後の経過日数(放送時間)", () => {
      assertEquals<number>(
        convertElapsedDateTime(
          JUST_ONE_WEEK,
          LAST_EPISODE_DATE,
          "date",
        ),
        7.979166666666667,
      );
    });
    await t.step("最終回放送日から1週間後の経過日数(0時)", () => {
      assertEquals<number>(
        convertElapsedDateTime(
          START_ONE_WEEK,
          LAST_EPISODE_DATE,
          "date",
        ),
        7,
      );
    });
  });

  await t.step("経過時間", async (t) => {
    await t.step("最終回放送日から1日後の経過時間(放送時間）", () => {
      assertEquals<number>(
        convertElapsedDateTime(
          JUST_ONE_DATE,
          LAST_EPISODE_DATE,
          "hour",
        ),
        47.5,
      );
    });
    await t.step("最終回放送日から1日後の経過時間(0時）", () => {
      assertEquals<number>(
        convertElapsedDateTime(
          START_ONE_DATE,
          LAST_EPISODE_DATE,
          "hour",
        ),
        24,
      );
    });
    await t.step("最終回放送日から1週間後の経過時間(放送時間)", () => {
      assertEquals<number>(
        convertElapsedDateTime(
          JUST_ONE_WEEK,
          LAST_EPISODE_DATE,
          "hour",
        ),
        191.5,
      );
    });
    await t.step("最終回放送日から1週間後の経過時間(0時)", () => {
      assertEquals<number>(
        convertElapsedDateTime(
          START_ONE_WEEK,
          LAST_EPISODE_DATE,
          "hour",
        ),
        168,
      );
    });
  });
});

Deno.test("経過日数からのテキストの出し分けテスト", async (t) => {
  const TEST_EPISODE_NUM = 14;

  await t.step("経過日数がキッカリ3日前の場合", () => {
    assertEquals<string>(
      getNowEpisodeText(
        JUST_PAST_THIRD_DATE,
        TEST_EPISODE_NUM,
      ),
      "今はリコリコ14話です",
    );
  });

  await t.step("経過日数がキッカリ2日前の場合", () => {
    assertEquals<string>(
      getNowEpisodeText(
        JUST_PAST_SECOND_DATE,
        TEST_EPISODE_NUM,
      ),
      "今はリコリコ14話です",
    );
  });

  await t.step("経過日数がキッカリ1日前の場合", () => {
    assertEquals<string>(
      getNowEpisodeText(
        JUST_PAST_ONE_DATE,
        TEST_EPISODE_NUM,
      ),
      "今はリコリコ14話です",
    );
  });

  await t.step("経過日数がキッカリ1週間後の場合", () => {
    assertEquals<string>(
      getNowEpisodeText(
        JUST_ONE_WEEK,
        TEST_EPISODE_NUM,
      ),
      "今日がリコリコ14話です",
    );
  });

  await t.step("経過日数が1週間後の00:00の場合", () => {
    assertEquals<string>(
      getNowEpisodeText(
        START_ONE_WEEK,
        TEST_EPISODE_NUM,
      ),
      "今日がリコリコ14話です",
    );
  });

  await t.step("経過日数が1日後の場合", () => {
    assertEquals<string>(
      getNowEpisodeText(
        JUST_ONE_DATE,
        TEST_EPISODE_NUM,
      ),
      "今はリコリコ14話です",
    );
  });

  await t.step("経過日数が4週間後の場合", () => {
    assertEquals<string>(
      getNowEpisodeText(
        START_FOUR_WEEK,
        TEST_EPISODE_NUM,
      ),
      "今日がリコリコ14話です",
    );
  });
});

Deno.test("エピソード数算出テスト", async (t) => {
  await t.step("キッカリ1週間後のエピソード数", () => {
    assertEquals<number>(incrementEpisodeNum(LAST_EPISODE_NUM, 7), 14);
  });

  await t.step("1週間後の00:00のエピソード数", () => {
    assertEquals<number>(
      incrementEpisodeNum(LAST_EPISODE_NUM, 6.979166666666667),
      13,
    );
  });
});
