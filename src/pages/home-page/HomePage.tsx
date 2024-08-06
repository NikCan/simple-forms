import { RoutePath } from '@/assets';
import { Button, Stack, Typography } from '@mui/material';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage = memo(() => {
  const navigate = useNavigate();
  const onStartClick = useCallback(() => {
    navigate(RoutePath.personal);
  }, [navigate]);

  return (
    <Stack
      sx={{
        height: '100%',
        alignItems: 'center',
        gap: '16px',
        p: '16px',
      }}
      component="section"
    >
      <Typography variant="h6" textAlign="center">
        {
          'Добро пожаловать на нашу платформу! Чтобы начать, нажмите кнопку «старт» и заполните все формы!'
        }
      </Typography>
      <Button variant="contained" onClick={onStartClick}>
        Старт
      </Button>
    </Stack>
  );
});

HomePage.displayName = 'HomePage';
