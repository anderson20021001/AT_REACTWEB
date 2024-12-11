import React from 'react';
import { Grid } from '@mui/material';
import Layout from '../components/Layout';
import BabyInfo from '../components/BabyInfo';
import DiaperForm from '../components/tracking/DiaperForm';
import SleepForm from '../components/tracking/SleepForm';
import FeedingForm from '../components/tracking/FeedingForm';
import { useTracking } from '../context/TrackingContext';

const Home = () => {
  const { diapers, sleep, feeding } = useTracking();

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BabyInfo />
        </Grid>
        <Grid item xs={12} md={4}>
          <DiaperForm />
        </Grid>
        <Grid item xs={12} md={4}>
          <SleepForm />
        </Grid>
        <Grid item xs={12} md={4}>
          <FeedingForm />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;