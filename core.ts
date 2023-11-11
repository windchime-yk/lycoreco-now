import { readDate } from "deno-util/text";

/** 最終話の話数 */
export const LAST_EPISODE_NUM = 13;
/** 最終話の放送日 */
export const LAST_EPISODE_DATE = "2022/09/24 00:00:00";
/** 1週間の日数 */
const ONE_WEEK_NUM = 7;

/**
 * 最後のエピソード放送日時から経過した日時に変換する
 * @param now 現在日時
 * @param lastEpisodeDate 最終回放送日時
 * @param base 変換基準
 */
export const convertElapsedDateTime = (
  now: string,
  lastEpisodeDate: string,
  base: "week" | "date" | "hour" | "minutes" | "seconds" | "milliseconds",
): number => {
  const diff = new Date(now).getTime() - new Date(lastEpisodeDate).getTime();
  if (base === "week") return diff / 604_800_016.56;
  if (base === "date") return diff / 86_400_000;
  if (base === "hour") return diff / 3_600_000;
  if (base === "minutes") return diff / 60_000;
  if (base === "seconds") return diff / 1_000;
  return diff;
};

/**
 * 最終回を経過日数にあわせてインクリメントする
 * @param lastEpisodeNum 最終回のエピソード番号
 * @param elapsedDate 経過日数
 */
export const incrementEpisodeNum = (
  lastEpisodeNum: number,
  elapsedDate: number,
) => {
  const newEpisodeNum = elapsedDate / ONE_WEEK_NUM;
  return lastEpisodeNum + Math.floor(newEpisodeNum);
};

/**
 * @param now 今日の日付
 * @param episodeNum 現在の話数
 */
export const getNowEpisodeText = (
  now: string,
  episodeNum: number,
): string => {
  const { days } = readDate({ date: now, zeropadding: true });

  if (days === "土") return `今日がリコリコ${episodeNum}話です`;
  return `今はリコリコ${episodeNum}話です`;
};
