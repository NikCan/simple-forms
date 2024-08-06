import { Form3, PageWithForm } from '@/components';
import { memo } from 'react';

export const LoanPage = memo(() => {
  return <PageWithForm title="Параметры займа" form={<Form3 />} />;
});

LoanPage.displayName = 'LoanPage';
