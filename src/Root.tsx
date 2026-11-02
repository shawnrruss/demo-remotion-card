import {Composition} from 'remotion';
import sample from './data/cards.json';
import {validate} from './schema';
import {cardFrames} from './timing';
import {Main} from './compositions/Main';

// The single Main composition: size and duration come from the validated JSON.
const data = validate(sample);

export function Root() {
  return <Composition
    id="Main"
    component={Main}
    width={3840}
    height={2160}
    fps={data.fps}
    durationInFrames={cardFrames(data).total}
    defaultProps={{data}}
  />;
}
