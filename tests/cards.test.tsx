import {readFileSync, readdirSync} from 'node:fs';
import {renderToStaticMarkup} from 'react-dom/server';
import {describe, expect, it} from 'vitest';
import sample from '../src/data/cards.json';
import {validate} from '../src/schema';
import {DisclosureCard} from '../src/compositions/Cards';
import {Main} from '../src/compositions/Main';

describe('data-driven cards', () => {
  it('renders disclosure text exactly as supplied in JSON', () => {
    const markup = renderToStaticMarkup(<DisclosureCard data={sample} />);
    expect(markup.replace(/<[^>]+>/g, '')).toBe(sample.disclosureText);
  });

  it('preserves whitespace and punctuation in supplied disclosure text', () => {
    const data = {...sample, disclosureText: 'First line.\n  Second line!'};
    expect(renderToStaticMarkup(<DisclosureCard data={data} />).replace(/<[^>]+>/g, ''))
      .toBe(data.disclosureText);
  });

  it('rejects missing, empty and whitespace-only disclosure text', () => {
    for (const disclosureText of [undefined, '', ' \n ']) {
      expect(() => validate({...sample, disclosureText})).toThrow('disclosureText');
    }
    expect(validate(sample)).toEqual(sample);
  });

  it('omits the recap sequence when the flag is false', () => {
    const children = Main({data: {...sample, showRecap: false}}).props.children;
    expect(children[1]).toBe(false);
    expect(children[2].props.from).toBe(192);
  });

  it('keeps every sample text literal out of composition sources', () => {
    const folder = new URL('../src/compositions/', import.meta.url);
    const texts = [sample.disclosureText, ...sample.recapLines, sample.endText];
    for (const file of readdirSync(folder)) {
      const source = readFileSync(new URL(file, folder), 'utf8');
      for (const text of texts) expect(source).not.toContain(text);
    }
  });
});
