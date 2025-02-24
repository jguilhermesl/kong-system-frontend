import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';

interface CardUsersActiveProps {
  type: 'adminUsers' | 'clientUsers';
  usersActive: number;
}

export const CardUsersActive = ({
  type,
  usersActive,
}: CardUsersActiveProps) => {
  return (
    <Card className=" w-52 p-6">
      {type == 'adminUsers' ? (
        <Heading> Admin </Heading>
      ) : (
        <Heading> Clientes </Heading>
      )}

      <Paragraph> {usersActive} usuários ativos</Paragraph>
    </Card>
  );
};
