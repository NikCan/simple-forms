import { Form1, PageWithForm } from '@/components';
import { memo } from 'react';

export const PersonalPage = memo(() => {
  return <PageWithForm title="Личные данные" form={<Form1 />} />;
});

PersonalPage.displayName = 'PersonalPage';
