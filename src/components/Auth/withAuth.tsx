import { useChromia } from "@/libs/chromia-connect/chromia-context";
import Loading from "@/components/Loading/Loading";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function WithAuthComponent(props: P) {
    const { isLoading } = useChromia();

    // Show loading state while checking auth
    if (isLoading) {
      return <Loading message="Authenticating..." />;
    }

    // Return loading while redirect happens
    return <WrappedComponent {...props} />;
  };
}
