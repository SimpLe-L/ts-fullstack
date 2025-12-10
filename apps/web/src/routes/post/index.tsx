// import { apiClient } from '@/integrations/tanstack-query/apiClient';
// import { queryClient } from '@/integrations/tanstack-query/queryClient';
// import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';


export const Route = createFileRoute('/post/')({
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
  return (
    <div className="flex flex-col items-center w-full gap-y-3">
      <div>dddd</div>
    </div>
  );
}
