import { ClientDetailTemplate } from '@/pageTemplates/admin-template/clients-template/client-detail-template';
import { Suspense } from 'react';

const Page = () => {
  return (
    <Suspense>
      <ClientDetailTemplate />
    </Suspense>
  );
};

export default Page;
