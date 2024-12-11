import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useTracking } from '../../context/TrackingContext';
import { useTranslation } from 'react-i18next';

const SleepForm = () => {
  const { addSleep } = useTracking();
  const { t } = useTranslation();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    addSleep({
      startTime,
      endTime,
      notes,
    });
    setStartTime('');
    setEndTime('');
    setNotes('');
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('tracking.sleep.title')}
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label={t('tracking.sleep.start')}
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="normal"
            label={t('tracking.sleep.end')}
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="normal"
            label={t('common.notes')}
            multiline
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            {t('common.save')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SleepForm;