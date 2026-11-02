import type {CSSProperties, ReactNode} from 'react';
import {AbsoluteFill} from 'remotion';
import type {Cards} from '../schema';

const style: CSSProperties = {
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
  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
}

export function DisclosureCard({data}: {data: Cards}) {
  return <Card><div>{data.disclosureText}</div></Card>;
}

export function RecapCard({data}: {data: Cards}) {
  return <Card><ul>{data.recapLines.map((line, index) => <li key={index}>{line}</li>)}</ul></Card>;
}

export function EndCard({data}: {data: Cards}) {
  return <Card><div>{data.endText}</div></Card>;
}
