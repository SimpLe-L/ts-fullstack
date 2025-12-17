import { authClient } from '@/integrations/tanstack-query/authClient';
import { createFileRoute, Navigate } from '@tanstack/react-router';
import RegisterCredentialsForm from './components/register-form';
import { useState } from 'react';
import LoginCredentialsForm from './components/login-form';


export const Route = createFileRoute('/login/')({
  // loader: () => queryClient.ensureQueryData(apiClient.posts.all.queryOptions()),
  component: RouteComponent,
  errorComponent: ({ error }) => {
    return (
      <div className="flex flex-col items-center w-full gap-y-3">
        <div>{error.message}</div>
      </div>
    );
  },
});

function RouteComponent() {

  // const { data: posts, isPending } = useQuery(
  //   apiClient.posts.all.queryOptions(),
  // );
  const [isLoginComponent, setIsLoginComponent] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (session?.user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center w-full gap-y-3">
      {
        isLoginComponent
          ? <LoginCredentialsForm />
          : <RegisterCredentialsForm />
      }
    </div>
  );
}
