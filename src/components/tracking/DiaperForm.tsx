import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useTracking } from '../../context/TrackingContext';
import { useTranslation } from 'react-i18next';

const DiaperForm = () => {
  const { addDiaper } = useTracking();
  const { t } = useTranslation();
  const [status, setStatus] = useState<'urine' | 'feces' | 'both' | 'clean'>('clean');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    addDiaper({
      timestamp: new Date().toISOString(),
      status,
      notes,
    });
    setStatus('clean');
    setNotes('');
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('tracking.diaper.title')}
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>{t('tracking.diaper.status')}</InputLabel>
            <Select
              value={status}
              label={t('tracking.diaper.status')}
              onChange={(e) => setStatus(e.target.value as any)}
            >
              <MenuItem value="clean">{t('tracking.diaper.status.clean')}</MenuItem>
              <MenuItem value="urine">{t('tracking.diaper.status.urine')}</MenuItem>
              <MenuItem value="feces">{t('tracking.diaper.status.feces')}</MenuItem>
              <MenuItem value="both">{t('tracking.diaper.status.both')}</MenuItem>
            </Select>
          </FormControl>
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

export default DiaperForm;