import {Composition} from 'remotion';
import sample from './data/cards.json';
import {validate} from './schema';
import {cardFrames} from './timing';
import {Main} from './compositions/Main';

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
