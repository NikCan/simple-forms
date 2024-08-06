import { RoutePath } from '@/assets';
import { FormData, useFormContext } from '@/context';
import { Button, MenuItem, Stack, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TextMaskCustom } from './TextMaskCustom';
import { HTMLInputTypeAttribute, memo } from 'react';

type FirstFormData = Pick<
  FormData,
  'phone' | 'firstName' | 'lastName' | 'gender'
>;

const fields: {
  name: keyof FirstFormData;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  InputProps?: any;
  rules?: any;
}[] = [
  {
    name: 'phone',
    placeholder: 'Телефон',
    type: 'tel',
    InputProps: {
      inputComponent: TextMaskCustom as never,
    },
    rules: {
      required: 'Обязательное поле',
      minLength: {
        value: 12,
        message: 'Некорректный номер',
      },
    },
  },
  {
    name: 'firstName',
    placeholder: 'Имя',
    rules: { required: 'Обязательное поле' },
  },
  {
    name: 'lastName',
    placeholder: 'Фамилия',
    rules: { required: 'Обязательное поле' },
  },
];

export const Form1 = memo(() => {
  const { formData, setFormData } = useFormContext();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FirstFormData>({
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      gender: formData.gender,
    },
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<FirstFormData> = () => {
    navigate(RoutePath.address);
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
      {fields.map((el) => (
        <Controller
          key={el.name}
          name={el.name}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value ?? ''}
              error={!!errors[field.name]}
              placeholder={el.placeholder}
              helperText={
                errors[field.name] ? errors[field.name]?.message : ' '
              }
              type={el.type ?? 'text'}
              InputProps={el.InputProps}
              onChange={(e) => {
                setFormData({ ...formData, [field.name]: e.target.value });
                field.onChange(e.target.value);
              }}
            />
          )}
          rules={el.rules}
        />
      ))}
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            value={field.value ?? ''}
            error={!!errors[field.name]}
            helperText={errors[field.name] ? errors[field.name]?.message : ' '}
            onChange={(e) => {
              setFormData({
                ...formData,
                [field.name]: e.target.value as never,
              });
              field.onChange(e.target.value);
            }}
          >
            <MenuItem value="empty" disabled>
              Пол
            </MenuItem>
            <MenuItem value="man">Мужской</MenuItem>
            <MenuItem value="women">Женский</MenuItem>
          </TextField>
        )}
        rules={{
          validate: (value) => value !== 'empty' || 'Пожалуйста, выберите пол',
        }}
      />
      <Button variant="contained" type="submit" size="large">
        Далее
      </Button>
    </Stack>
  );
});

Form1.displayName = 'Form1';
