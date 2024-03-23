import { useEffect, useLayoutEffect, useState } from 'react';

const useColumnsGrid = (limit: number, width: number) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [columns, setColumns] = useState(4);
  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useLayoutEffect(() => {
    console.log('test');
    handleSize();
    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, []);

  useEffect(() => {
    const cols = Math.floor(((windowSize.width - 96) * 0.9) / width);
    setColumns(cols);
    limit = cols * 3;
  }, [windowSize]);
  return columns;
};

export default useColumnsGrid;
