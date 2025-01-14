import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
        <div className="border rounded-md flex items-center w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Identificador</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((item, i) => {
                return <UsersTableRow key={i} item={item} />;
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
