import { useMemo, useState } from 'react';

import { Button, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

import styles from './styles';

const ToolsFilter = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { data } = useSelector((state) => state.tools);

  // Extract unique types from tools data
  const filterItems = useMemo(() => {
    if (!data) return [{ id: 'all', label: 'All' }];

    // Get all tool types and remove duplicates
    const types = [...new Set(data.map((tool) => tool.type))];

    return [
      { id: 'all', label: 'All' },
      ...types.map((type) => ({
        id: type.toLowerCase(),
        label: type,
      })),
    ];
  }, [data]);

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    onFilterChange?.(filterId);
  };

  return (
    <Grid {...styles.mainGridProps}>
      {filterItems.map((item) => (
        <Grid key={item.id} {...styles.filterItemProps}>
          <Button
            className={activeFilter === item.id ? 'active' : ''}
            onClick={() => handleFilterClick(item.id)}
            sx={styles.filterButton.sx}
          >
            {item.label}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default ToolsFilter;
