import {
  getDashboard,
  GetDashboardResponse,
} from '@/api/dashboard/get-dashboard';
import { CardUsersActive } from './card-users-active';
import { useQuery } from '@tanstack/react-query';

export const UsersActive = () => {
  const { data: dashboardData, isLoading } = useQuery<GetDashboardResponse>({
    queryFn: getDashboard,
    queryKey: ['dashboard'],
  });
  const dataUsersActive = dashboardData?.data.activeUsersCount;

  return (
    <div className="w-full flex justify-between">
      {dataUsersActive?.adminUsers && (
        <CardUsersActive
          type="adminUsers"
          usersActive={dataUsersActive.adminUsers}
        />
      )}
      {dataUsersActive?.adminUsers && (
        <CardUsersActive
          type="clientUsers"
          usersActive={dataUsersActive.clientUsers}
        />
      )}
    </div>
  );
};
