import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { User } from '@/models/User';
import { Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UserTableRowProps {
  item: User;
}
export const UsersTableRow = ({ item }: UserTableRowProps) => {
  const router = useRouter();
  return (
    <TableRow>
      <TableCell className="font-mono">{item.id}</TableCell>
      <TableCell className="font-medium">{item.name}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">{item.role}</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">{item.email}</TableCell>
      <TableCell className="font-medium">{item.createdAt}</TableCell>
      <TableCell>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            router.push(`/admin/users/${item.id}`);
          }}
        >
          <Edit className="mr-2 h-3 w-3" />
          Editar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="sm">
          <Trash className="mr-2 h-3 w-3" />
          Deletar
        </Button>
      </TableCell>
    </TableRow>
  );
};
