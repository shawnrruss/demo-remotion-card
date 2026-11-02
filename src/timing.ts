import type {Cards} from './schema';

export function disclosureFrames(
  data: {holdSeconds?: number},
  fps: number,
): number {
  return Math.round((data.holdSeconds ?? 8) * fps);
}

export function cardFrames(data: Cards, fps = data.fps) {
  const disclosure = disclosureFrames(data, fps);
  const recap = data.showRecap ? Math.round(data.recapSeconds * fps) : 0;
  const end = Math.round(data.endSeconds * fps);
  return {disclosure, recap, end, total: disclosure + recap + end};
}
