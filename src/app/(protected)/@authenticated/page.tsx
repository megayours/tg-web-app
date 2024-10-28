'use client';

import { useNavigationStore } from '@/store/navigationStore';
import Home from '@/components/Protected/Home/Home';
import Profile from '@/components/Protected/Profile/Profile';
import { withAuth } from '@/components/Auth/withAuth';

const AuthenticatedPage = () => {
  const { currentView } = useNavigationStore();

  return (
    <>
      {currentView === 'home' && <Home />}
      {currentView === 'profile' && <Profile />}
    </>
  );
}

export default withAuth(AuthenticatedPage);
