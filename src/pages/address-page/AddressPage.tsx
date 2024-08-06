import { Form2, PageWithForm } from '@/components';
import { memo } from 'react';

export const AddressPage = memo(() => {
  return <PageWithForm title="Адрес и место работы" form={<Form2 />} />;
});

AddressPage.displayName = 'AddressPage';
