// The three Sequences: disclosure, optional recap, closing card.
import {Sequence} from 'remotion';
import type {Cards} from '../schema';
import {cardFrames} from '../timing';
import {DisclosureCard, EndCard, RecapCard} from './Cards';

export function Main({data}: {data: Cards}) {
  const {disclosure, recap, end} = cardFrames(data);
  return <>
    <Sequence durationInFrames={disclosure}><DisclosureCard data={data} /></Sequence>
    {data.showRecap && <Sequence from={disclosure} durationInFrames={recap}><RecapCard data={data} /></Sequence>}
    <Sequence from={disclosure + recap} durationInFrames={end}><EndCard data={data} /></Sequence>
  </>;
}
