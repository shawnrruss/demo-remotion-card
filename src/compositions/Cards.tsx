// The card components; one shared AbsoluteFill style keeps every card identical.
import type {CSSProperties, ReactNode} from 'react';
import {AbsoluteFill} from 'remotion';
import type {Cards} from '../schema';

const cardStyle: CSSProperties = {
  backgroundColor: 'black',
  color: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Arial, sans-serif',
  fontSize: 96,
  padding: 240,
  boxSizing: 'border-box',
  whiteSpace: 'pre-wrap',
};

function Card({children}: {children: ReactNode}) {
  return <AbsoluteFill style={cardStyle}>{children}</AbsoluteFill>;
}

export const DisclosureCard = ({data}: {data: Cards}) => <Card><div>{data.disclosureText}</div></Card>;

export const EndCard = ({data}: {data: Cards}) => <Card><div>{data.endText}</div></Card>;

export const RecapCard = ({data}: {data: Cards}) => (
  <Card><ul>{data.recapLines.map((line, index) => <li key={index}>{line}</li>)}</ul></Card>
);
