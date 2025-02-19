import { GameDetailTemplate } from '@/pageTemplates/admin-template/games-template/game-detail-template';
import { Suspense } from 'react';

const Page = () => {
  return (
    <Suspense>
      <GameDetailTemplate />
    </Suspense>
  );
};

export default Page;
