'use client';

import { useNavigationStore } from '@/store/navigationStore';
import Home from '@/components/Protected/Home/Home';
import Profile from '@/components/Protected/Profile/Profile';
import { withAuth } from '@/components/Auth/withAuth';
import Leaderboard from '@/components/Protected/Leaderboard/Leaderboard';

const AuthenticatedPage = () => {
  const { currentView } = useNavigationStore();

  return (
    <>
      {currentView === 'home' && <Home />}
      {currentView === 'leaderboard' && <Leaderboard />}
      {currentView === 'profile' && <Profile />}
    </>
  );
}

export default withAuth(AuthenticatedPage);
