// Frame arithmetic: every duration derives from the JSON, never hand-tuned.
import type {Cards} from './schema';

const DEFAULT_HOLD_SECONDS = 8;

export function disclosureFrames(data: Pick<Cards, 'holdSeconds'>, fps: number): number {
  return Math.round((data.holdSeconds ?? DEFAULT_HOLD_SECONDS) * fps);
}

export function cardFrames(data: Cards, fps = data.fps) {
  const disclosure = disclosureFrames(data, fps);
  const recap = data.showRecap ? Math.round(data.recapSeconds * fps) : 0;
  const end = Math.round(data.endSeconds * fps);
  return {disclosure, recap, end, total: disclosure + recap + end};
}
