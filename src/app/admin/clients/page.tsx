import { AdminClientsTemplate } from '@/pageTemplates/admin-template/clients-template';
import { Suspense } from 'react';

const Page = () => {
  return (
    <Suspense>
      <AdminClientsTemplate />
    </Suspense>
  );
};

export default Page;
