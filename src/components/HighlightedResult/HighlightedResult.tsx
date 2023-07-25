import React from 'react';
import styles from './HighlightedResult.module.scss';

type HighlightTextProps = {
  text: string;
  query: string;
}

const HighlightableResult: React.FC<HighlightTextProps> = ({ text, query }) => {
  
  // if there's no query, return full text
  if (!query.trim()) {
    return <span>{text}</span>;
  }

  // split text on query term, preserve case
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts
        .map((part, i) =>
          regex.test(part) ?
            <mark key={i} className={styles.highlighted}>{part}</mark> : part)}
    </span>
  )
}

export default HighlightableResult;