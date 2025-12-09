import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { REDIRECT_PATH, SESSION_KEY } from "../enums";

const withAuth = (WrappedComponent: any) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const user = sessionStorage.getItem(SESSION_KEY.USER);
      const token = sessionStorage.getItem(SESSION_KEY.TOKEN);

      if (!user && !token) {
        router.push(REDIRECT_PATH.LOGIN);
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  // ✅ Add displayName for better debugging
  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithAuth;
};

export default withAuth;
