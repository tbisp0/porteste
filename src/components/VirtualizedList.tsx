import React, { memo, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';

interface VirtualizedListProps {
  items: any[];
  itemHeight: number;
  height: number;
  renderItem: (props: { index: number; style: React.CSSProperties; data: any[] }) => React.ReactElement;
  className?: string;
}

const VirtualizedList = memo<VirtualizedListProps>(({ 
  items, 
  itemHeight, 
  height, 
  renderItem, 
  className 
}) => {
  // Memoize items to prevent unnecessary re-renders
  const memoizedItems = useMemo(() => items, [items]);

  return (
    <div className={className}>
      <List
        height={height}
        itemCount={memoizedItems.length}
        itemSize={itemHeight}
        itemData={memoizedItems}
        overscanCount={2} // Render 2 extra items for smooth scrolling
      >
        {renderItem}
      </List>
    </div>
  );
});

VirtualizedList.displayName = 'VirtualizedList';

export default VirtualizedList;
