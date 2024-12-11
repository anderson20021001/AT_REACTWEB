import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Avatar } from '@mui/material';
import { format, differenceInDays } from 'date-fns';
import { useBaby } from '../context/BabyContext';
import { useTranslation } from 'react-i18next';

const BabyInfo = () => {
  const { babyInfo } = useBaby();
  const { t } = useTranslation();

  const getAgeDisplay = (birthDate: string) => {
    const days = differenceInDays(new Date(), new Date(birthDate));
    if (days < 30) {
      return `${days} ${t('baby.days')}`;
    }
    const months = Math.floor(days / 30);
    return `${months} ${t('baby.months')}`;
  };

  return (
    <Card sx={{ 
      background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40%',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.1)',
          transform: 'skewX(-15deg) translateX(50%)',
        }}
      />
      <CardContent>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={babyInfo.photo}
              alt={babyInfo.name}
              sx={{ width: 100, height: 100, border: '3px solid white' }}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              {babyInfo.name}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              {getAgeDisplay(babyInfo.birthDate)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item xs={4} sm="auto">
                <Box textAlign="center">
                  <Typography variant="h5" fontWeight="bold">
                    {babyInfo.weight}kg
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {t('baby.weight')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4} sm="auto">
                <Box textAlign="center">
                  <Typography variant="h5" fontWeight="bold">
                    {babyInfo.length}cm
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {t('baby.length')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4} sm="auto">
                <Box textAlign="center">
                  <Typography variant="h5" fontWeight="bold">
                    {format(new Date(babyInfo.birthDate), 'dd/MM/yyyy')}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {t('baby.birthDate')}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BabyInfo;