import Link from 'next/link';
const types=['sarees','lehengas','suits','garments'];
export default function Catalogue(){return <main className="wrap page"><p className="eyebrow">CATALOGUE</p><h1 className="display">Four books, <i>two firms.</i></h1><p className="muted">Wholesale collections for boutiques. Select a catalogue to explore.</p><div className="catalogue-grid">{types.map((x,i)=><Link className="tile" href={`/catalogue/${x}`} key={x}><span className="eyebrow">CATALOGUE 0{i+1}</span><h3>{x[0].toUpperCase()+x.slice(1)}</h3><small>View collection →</small></Link>)}</div></main>}
