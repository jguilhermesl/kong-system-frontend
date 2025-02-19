import { AdminGamesTemplate } from '@/pageTemplates/admin-template/games-template';
import { Suspense } from 'react';

const Page = () => {
  return (
    <Suspense>
      <AdminGamesTemplate />
    </Suspense>
  );
};

export default Page;
