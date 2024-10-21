import { Grid } from '@mui/material';

import ToolsListingContainer from '@/components/ToolsListingContainer';
import Banner from './Banner';

import styles from './styles';

const HomePage = (props) => {
  const { data, loading } = props;
  
  return (
    <Grid {...styles.mainGridProps}>
      <Banner/>
      <ToolsListingContainer
        data={data}
        loading={loading}
        category="All Tools"
      />
    </Grid>
  );
};
export default HomePage;
