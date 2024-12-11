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

const FeedingForm = () => {
  const { addFeeding } = useTracking();
  const { t } = useTranslation();
  const [type, setType] = useState<'bottle' | 'breast'>('breast');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [amount, setAmount] = useState('');
  const [side, setSide] = useState<'left' | 'right' | 'both'>('left');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    addFeeding({
      type,
      startTime,
      endTime,
      amount: type === 'bottle' ? Number(amount) : undefined,
      side: type === 'breast' ? side : undefined,
      notes,
    });
    setStartTime('');
    setEndTime('');
    setAmount('');
    setNotes('');
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('tracking.feeding.title')}
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              label="Type"
              onChange={(e) => setType(e.target.value as 'bottle' | 'breast')}
            >
              <MenuItem value="bottle">{t('tracking.feeding.type.bottle')}</MenuItem>
              <MenuItem value="breast">{t('tracking.feeding.type.breast')}</MenuItem>
            </Select>
          </FormControl>

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

          {type === 'bottle' && (
            <TextField
              fullWidth
              margin="normal"
              label={t('tracking.feeding.amount')}
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          )}

          {type === 'breast' && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Side</InputLabel>
              <Select
                value={side}
                label="Side"
                onChange={(e) => setSide(e.target.value as 'left' | 'right' | 'both')}
              >
                <MenuItem value="left">{t('tracking.feeding.side.left')}</MenuItem>
                <MenuItem value="right">{t('tracking.feeding.side.right')}</MenuItem>
                <MenuItem value="both">{t('tracking.feeding.side.both')}</MenuItem>
              </Select>
            </FormControl>
          )}

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

export default FeedingForm;