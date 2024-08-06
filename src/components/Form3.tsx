import { FormData, useFormContext } from '@/context';
import { useSubmitApplication } from '@/hooks';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  FormControl,
  Paper,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import { memo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CustomModal } from './CustomModal';
import { RoutePath } from '@/assets';

type ThirdFormData = Pick<FormData, 'loanAmount' | 'loanTerm'>;

export const Form3 = memo(() => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { formData, setFormData, resetFormData } = useFormContext();
  const isDisabledSubmit =
    !formData.phone ||
    !formData.firstName ||
    !formData.lastName ||
    formData.gender === 'empty' ||
    formData.workPlace === 'empty' ||
    !formData.address ||
    !formData.loanAmount ||
    !formData.loanTerm;
  const { isLoading, submitApplication } = useSubmitApplication();
  const { handleSubmit, control, watch } = useForm<ThirdFormData>({
    defaultValues: {
      loanAmount: formData.loanAmount,
      loanTerm: formData.loanTerm,
    },
    mode: 'onSubmit',
  });
  const amount = watch('loanAmount');
  const term = watch('loanTerm');

  const onSubmit: SubmitHandler<ThirdFormData> = () => {
    submitApplication(formData.firstName, formData.lastName)
      .then(() => {
        setOpenModal(true);
      })
      .catch((e) => console.log(e));
  };
  const onBackHome = () => {
    resetFormData();
    navigate(RoutePath.main);
  };

  return (
    <>
      <Stack
        sx={{ gap: '8px' }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl fullWidth>
          <Stack sx={{ flexDirection: 'row', gap: '8px' }}>
            <Typography gutterBottom>Сумма займа:</Typography>
            <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
              ${amount}
            </Typography>
          </Stack>
          <Controller
            name="loanAmount"
            control={control}
            rules={{ required: 'Сумма займа обязательна' }}
            render={({ field }) => (
              <Slider
                {...field}
                min={200}
                max={1000}
                step={100}
                disabled={isLoading}
                valueLabelDisplay="auto"
                value={field.value}
                onChange={(_, value) => {
                  setFormData({ ...formData, [field.name]: value as number });
                  field.onChange(value);
                }}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <Stack sx={{ flexDirection: 'row', gap: '8px' }}>
            <Typography gutterBottom>Срок займа:</Typography>
            <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
              {term} дней
            </Typography>
          </Stack>
          <Controller
            name="loanTerm"
            control={control}
            rules={{ required: 'Срок займа обязателен' }}
            render={({ field }) => (
              <Slider
                {...field}
                min={10}
                max={30}
                step={1}
                disabled={isLoading}
                valueLabelDisplay="auto"
                value={field.value}
                onChange={(_, value) => {
                  setFormData({ ...formData, [field.name]: value as number });
                  field.onChange(value);
                }}
              />
            )}
          />
        </FormControl>
        <LoadingButton
          variant="contained"
          type="submit"
          size="large"
          fullWidth
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          disabled={isDisabledSubmit}
        >
          Подать заявку
        </LoadingButton>
      </Stack>
      <CustomModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        modalSX={{ maxWidth: '500px' }}
      >
        <Paper
          sx={{
            gap: '8px',
            p: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#FFF',
          }}
        >
          <Typography textAlign="center">
            Поздравляем, {formData.lastName} {formData.firstName}!
          </Typography>
          <Typography textAlign="center">
            Вам одобрено ${formData.loanAmount} на {formData.loanTerm} дней.
          </Typography>
          <Button onClick={onBackHome}>Вернуться на главную</Button>
        </Paper>
      </CustomModal>
    </>
  );
});

Form3.displayName = 'Form3';
