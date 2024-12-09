import { useMemo, useState } from 'react';

import { Grid, Typography } from '@mui/material';

import ToolsFilter from '@/components/ToolsFilter';
import ToolsListingContainer from '@/components/ToolsListingContainer';

import Banner from './Banner';

import styles from './styles';

const HomePage = ({ data, loading, error }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTools = useMemo(() => {
    if (!data) return [];
    if (activeFilter === 'all') return data;
    const filtered = data.filter(
      (tool) => tool.type.toLowerCase() === activeFilter
    );
    return filtered;
  }, [data, activeFilter]);

  // Helper function to capitalize first letter
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const renderContent = () => {
    if (filteredTools.length === 0) {
      return (
        <Typography variant="body1" color="text.secondary">
          No tools found for this category
        </Typography>
      );
    }

    return (
      <ToolsListingContainer
        data={filteredTools}
        loading={loading}
        error={error}
        category={capitalizeFirstLetter(activeFilter)}
      />
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Banner />
      <ToolsFilter onFilterChange={setActiveFilter} />
      {renderContent()}
    </Grid>
  );
};

export default HomePage;
