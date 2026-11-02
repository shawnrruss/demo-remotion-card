import {describe, expect, it} from 'vitest';
import {disclosureFrames} from '../src/timing';
import {cardFrames} from '../src/timing';
import sample from '../src/data/cards.json';

describe('disclosure timing', () => {
  it('holds an 8-second disclosure for exactly 192 frames at 24 fps', () => {
    expect(disclosureFrames({holdSeconds: 8}, 24)).toBe(192);
  });

  it('defaults the disclosure hold to 8 seconds', () => {
    expect(disclosureFrames({}, 24)).toBe(192);
  });

  it('removes exactly 480 frames when the recap is disabled', () => {
    const withRecap = cardFrames(sample);
    const withoutRecap = cardFrames({...sample, showRecap: false});
    expect(withRecap.recap).toBe(480);
    expect(withRecap.total - withoutRecap.total).toBe(480);
    expect(withoutRecap.recap).toBe(0);
    expect(withRecap.total).toBe(744);
    expect(withoutRecap.total).toBe(264);
  });

  it('derives every duration from the supplied data and fps', () => {
    expect(cardFrames({...sample, holdSeconds: 2, recapSeconds: 4, endSeconds: 1}, 30))
      .toEqual({disclosure: 60, recap: 120, end: 30, total: 210});
  });
});
