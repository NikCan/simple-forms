import { AppRouter, FormProvider } from '@/providers';
import { BrowserRouter } from 'react-router-dom';

export function App() {
  return (
    <div className="app">
      <FormProvider>
        <BrowserRouter basename="simple-forms">
          <AppRouter />
        </BrowserRouter>
      </FormProvider>
    </div>
  );
}
