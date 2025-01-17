import { AdminInventoryTemplate } from '@/pageTemplates/admin-template/inventory-template';
import { Suspense } from 'react';

const Page = () => {
  return (
    <Suspense>
      <AdminInventoryTemplate />
    </Suspense>
  );
};

export default Page;
