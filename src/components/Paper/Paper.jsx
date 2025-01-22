import './Paper.css';

export default function Paper({ children, marg }) {
  const className = marg ? 'paper marg' : 'paper';
  return <div className={className}>{children}</div>;
}