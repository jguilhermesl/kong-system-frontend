import { Table } from '@/components/ui/table';
import { UsersTableRow } from './users-table-row';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '@/api/users/fetch-users';
import { Spinner } from '@/components/ui/spinner';

export const UsersTable = () => {
  const { data: usersData, isPending } = useQuery({
    queryFn: fetchUsers,
    queryKey: ['users'],
  });

  const users = usersData?.data || [];

  return (
    <div className="flex items-center w-full justify-center">
      {isPending ? (
        <Spinner />
      ) : (
        <div className="flex items-center w-full flex-1 border rounded-md">
          <Table
            headers={[
              'Identificador',
              'Nome',
              'Função',
              'E-mail',
              'Criado em',
              '',
              '',
            ]}
          >
            {users?.map((item, i) => {
              return <UsersTableRow key={i} index={i} item={item} />;
            })}
          </Table>
        </div>
      )}
    </div>
  );
};
