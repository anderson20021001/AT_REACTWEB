import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Grid,
  Avatar,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useBaby } from '../context/BabyContext';
import Layout from '../components/Layout';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { babyInfo, updateBabyInfo } = useBaby();
  const [name, setName] = useState(babyInfo.name);
  const [weight, setWeight] = useState(babyInfo.weight.toString());
  const [length, setLength] = useState(babyInfo.length.toString());
  const [birthDate, setBirthDate] = useState(babyInfo.birthDate);
  const [gender, setGender] = useState(babyInfo.gender);
  const [photo, setPhoto] = useState(babyInfo.photo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBabyInfo({
      name,
      weight: Number(weight),
      length: Number(length),
      birthDate,
      gender,
      photo,
    });
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Card sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 100,
              background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
            }}
          />
          <CardContent sx={{ pt: 12 }}>
            <Grid container justifyContent="center" sx={{ mb: 4 }}>
              <Avatar
                src={photo}
                alt={name}
                sx={{
                  width: 120,
                  height: 120,
                  border: '4px solid white',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}
              />
            </Grid>
            <Typography variant="h5" component="h1" gutterBottom textAlign="center">
              {t('common.settings')}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Language</InputLabel>
                <Select
                  value={i18n.language}
                  label="Language"
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="pt">Português</MenuItem>
                  <MenuItem value="es">Español</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label={t('baby.name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label={t('baby.photo')}
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label={t('baby.weight')}
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    InputProps={{
                      endAdornment: 'kg',
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label={t('baby.length')}
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    InputProps={{
                      endAdornment: 'cm',
                    }}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                margin="normal"
                label={t('baby.birthDate')}
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>{t('baby.gender')}</InputLabel>
                <Select
                  value={gender}
                  label={t('baby.gender')}
                  onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 3 }}
              >
                {t('common.save')}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

export default Settings;