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

export function validate(value: unknown): Cards {
  if (!value || typeof value !== 'object') throw new Error('Cards must be an object');
  const data = value as Record<string, unknown>;
  for (const key of ['disclosureText', 'endText']) {
    if (typeof data[key] !== 'string' || !data[key].trim()) {
      throw new Error(`${key} must be non-empty text`);
    }
  }
  if (!Array.isArray(data.recapLines) || !data.recapLines.length ||
      !data.recapLines.every((line) => typeof line === 'string' && line.trim())) {
    throw new Error('recapLines must contain non-empty text');
  }
  if (typeof data.showRecap !== 'boolean') throw new Error('showRecap must be boolean');
  for (const key of ['fps', 'recapSeconds', 'endSeconds', 'holdSeconds']) {
    if (key === 'holdSeconds' && data[key] === undefined) continue;
    const number = data[key];
    if (typeof number !== 'number' || !Number.isFinite(number) || number <= 0) {
      throw new Error(`${key} must be a positive finite number`);
    }
  }
  if (!Number.isInteger(data.fps)) throw new Error('fps must be an integer');
  return data as Cards;
}
