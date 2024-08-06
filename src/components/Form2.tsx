import { RoutePath } from '@/assets';
import { FormData, useFormContext } from '@/context';
import { Button, MenuItem, Stack, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import { useFetchWorkPlaces } from '@/hooks';

type SecondFormData = Pick<FormData, 'workPlace' | 'address'>;

export const Form2 = memo(() => {
  const navigate = useNavigate();
  const { formData, setFormData } = useFormContext();
  const { categories, isLoading } = useFetchWorkPlaces();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SecondFormData>({
    defaultValues: {
      workPlace: formData.workPlace,
      address: formData.address,
    },
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<SecondFormData> = () => {
    navigate(RoutePath.loan);
  };

  const onBackClick = () => {
    navigate(RoutePath.personal);
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
      {isLoading ? (
        <TextField value={'...loading'} disabled helperText={' '} />
      ) : (
        <Controller
          name="workPlace"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              error={!!errors[field.name]}
              helperText={
                errors[field.name] ? errors[field.name]?.message : ' '
              }
              disabled={categories.length === 0}
              onChange={(e) => {
                setFormData({ ...formData, [field.name]: e.target.value });
                field.onChange(e.target.value);
              }}
            >
              <MenuItem value="empty" disabled>
                Выберите место работы
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          )}
          rules={{
            validate: (value) =>
              value !== 'empty' || 'Пожалуйста, выберите место работы',
          }}
        />
      )}
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value ?? ''}
            error={!!errors[field.name]}
            placeholder={'Адрес проживания'}
            helperText={errors[field.name] ? errors[field.name]?.message : ' '}
            onChange={(e) => {
              setFormData({ ...formData, [field.name]: e.target.value });
              field.onChange(e.target.value);
            }}
          />
        )}
        rules={{ required: 'Обязательное поле' }}
      />
      <Stack sx={{ flexDirection: 'row', gap: '8px' }}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={onBackClick}
        >
          Назад
        </Button>
        <Button variant="contained" type="submit" size="large" fullWidth>
          Далее
        </Button>
      </Stack>
    </Stack>
  );
});

Form2.displayName = 'Form2';
