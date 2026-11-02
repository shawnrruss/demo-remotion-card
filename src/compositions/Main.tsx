import {Sequence} from 'remotion';
import type {Cards} from '../schema';
import {cardFrames} from '../timing';
import {DisclosureCard, EndCard, RecapCard} from './Cards';

export function Main({data}: {data: Cards}) {
  const frames = cardFrames(data);
  return <>
    <Sequence durationInFrames={frames.disclosure}><DisclosureCard data={data} /></Sequence>
    {data.showRecap && <Sequence from={frames.disclosure} durationInFrames={frames.recap}>
      <RecapCard data={data} />
    </Sequence>}
    <Sequence from={frames.disclosure + frames.recap} durationInFrames={frames.end}>
      <EndCard data={data} />
    </Sequence>
  </>;
}
