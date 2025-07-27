import { Card } from '@/components/ui/card';
import { memo } from 'react';

const KeyValueGrid = ({
  data,
  cols = 2,
  gap = 4,
  keyClassName = 'text-sm font-medium text-muted-foreground',
  valueClassName = 'text-sm font-semibold',
  cardClassName = 'p-4',
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2  lg:grid-cols-${cols} gap-${gap}`}>
      {data.map((item, index) => (
        <Card key={index} className={cardClassName}>
          <div className="flex flex-col space-y-1">
            <span className={keyClassName}>{item.key}</span>
            <span className={valueClassName}>
              {typeof item.value === 'string' || typeof item.value === 'number'
                ? item.value
                : item.value}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default memo(KeyValueGrid);
