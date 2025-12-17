
import { createFileRoute, Link } from '@tanstack/react-router';
import { authClient } from '@/integrations/tanstack-query/authClient';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {

  const { data: session, isPending } = authClient.useSession();

  console.log('session', session);
  return (
    <div className="mt-1">
      {session?.user && (
        <>
          <div className="flex flex-col mb-5 bg-elevated p-3 rounded-lg">
            <div>
              Welcome, <span className="font-bold">{session.user.name}</span>!
            </div>

          </div>
        </>
      )}

      {!session?.user && (
        <div className="mt-4">
          Please{' '}
          <Link to="/login" className="underline font-bold">
            log in
          </Link>
          .
        </div>
      )}
    </div>
  );
}
