// Rejects a malformed cards.json before a render starts, not halfway through one.
export type Cards = {
  fps: number;
  disclosureText: string;
  holdSeconds?: number;
  showRecap: boolean;
  recapSeconds: number;
  recapLines: string[];
  endText: string;
  endSeconds: number;
};

const isText = (value: unknown) => typeof value === 'string' && value.trim() !== '';

const isPositiveNumber = (value: unknown) =>
  typeof value === 'number' && Number.isFinite(value) && value > 0;

export function validate(value: unknown): Cards {
  if (!value || typeof value !== 'object') throw new Error('Cards must be an object');
  const data = value as Record<string, unknown>;
  for (const key of ['disclosureText', 'endText']) {
    if (!isText(data[key])) throw new Error(`${key} must be non-empty text`);
  }
  const {recapLines} = data;
  if (!Array.isArray(recapLines) || !recapLines.length || !recapLines.every(isText)) {
    throw new Error('recapLines must contain non-empty text');
  }
  if (typeof data.showRecap !== 'boolean') throw new Error('showRecap must be boolean');
  for (const key of ['fps', 'recapSeconds', 'endSeconds', 'holdSeconds']) {
    if (key === 'holdSeconds' && data[key] === undefined) continue;
    if (!isPositiveNumber(data[key])) throw new Error(`${key} must be a positive finite number`);
  }
  if (!Number.isInteger(data.fps)) throw new Error('fps must be an integer');
  return data as Cards;
}
