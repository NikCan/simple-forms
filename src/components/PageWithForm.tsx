import { Card, Stack, Typography } from '@mui/material';
import { FC, ReactNode, memo } from 'react';

interface Props {
  title: ReactNode;
  form: ReactNode;
}
export const PageWithForm: FC<Props> = memo(({ title, form }) => {
  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        p: '16px',
      }}
      component="section"
    >
      <Card sx={{ maxWidth: '650px', width: '100%', p: '32px' }}>
        <Typography variant="h6" component="h1" textAlign="center" gutterBottom>
          {title}
        </Typography>
        {form}
      </Card>
    </Stack>
  );
});

PageWithForm.displayName = 'PageWithForm';
