import { Card, Grid, Typography } from '@mui/material';

import { useRouter } from 'next/router';

import IconToolTag from '@/assets/svg/toolStatusTag';

import styles from './styles';

/**
 * Returns a Tool Card component with an image and a chip displaying the amount of coins.
 *
 * @return {JSX.Element} The Tool Card component.
 */
const ToolCard = (props) => {
  const { maskedToolUrl, backgroundImgURL, name, logo, description, active } =
    props;

  const router = useRouter();

  const handleRoute = () => {
    if (!active) return null;
    return router.push(`/${maskedToolUrl}`);
  };

  const renderTitle = () => {
    return (
      <Grid {...styles.contentGridProps}>
        <Typography {...styles.titleProps}>{name}</Typography>
        <Typography {...styles.descriptionProps}>{description}</Typography>
      </Grid>
    );
  };

  const renderStatusTag = () => {
    return (
      <Grid {...styles.StatusTagProps()}>
        {active ? (
          <Grid {...styles.StatusTagButtonProps}>
            <IconToolTag />
            <Typography {...styles.StatusTagButtonTextProps}>
              Build with Marvel
            </Typography>
          </Grid>
        ) : (
          <Grid {...styles.StatusTagInavtiveButtonProps}>
            <Typography {...styles.StatusTagButtonTextProps}>
              Coming Soon
            </Typography>
          </Grid>
        )}
      </Grid>
    );
  };

  return (
    <Grid onClick={handleRoute} {...styles.mainGridProps}>
      <Card {...styles.cardProps(active)}>
        <Grid {...styles.bgSectionProps(backgroundImgURL)} />
        <Grid {...styles.toolDetailsGridProps}>
          {renderTitle()}
          {renderStatusTag()}
        </Grid>
      </Card>
    </Grid>
  );
};

export default ToolCard;
