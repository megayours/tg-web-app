'use client';

import { Page } from '@/components/Page';
import { useLeaderboard } from '@/hooks/useDappApi';
import { Avatar, Card, Text, Title } from '@telegram-apps/telegram-ui';
import './styles.css';

const Leaderboard = () => {
  const { data: leaderboard, isLoading } = useLeaderboard();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Page>
      <div className="leaderboard_header">
        <Title>Top Warriors</Title>
      </div>

      <div className="leaderboard_list">
        {leaderboard?.map((entry, index) => (
          <Card key={`${entry.avatar.collection}-${entry.avatar.token_id}`} className="leaderboard_item">
            <div className="leaderboard_content">
              <div className="leaderboard_mainInfo">
                <div className="leaderboard_rank">
                  <Text Component="span" className="leaderboard_rankNumber">
                    #{index + 1}
                  </Text>
                </div>

                <Avatar 
                  size={48}
                  src={entry.avatar.image}
                  className="leaderboard_avatar"
                />
                
                <div className="leaderboard_info">
                  <Text Component="strong" className="leaderboard_name">
                    {entry.avatar.name || `${entry.avatar.collection} #${entry.avatar.token_id}`}
                  </Text>
                  <Text className="leaderboard_collection">
                    {entry.avatar.collection}
                  </Text>
                </div>
              </div>

              <div className="leaderboard_stats">
                <Text Component="span" className="leaderboard_statValue">
                  {entry.wins}
                </Text>
                <Text Component="span" className="leaderboard_statLabel">
                  victories
                </Text>
              </div>
            </div>
          </Card>
        ))}

        {(!leaderboard || leaderboard.length === 0) && (
          <Text className="leaderboard_empty">
            No warriors have claimed victory yet. Be the first one!
          </Text>
        )}
      </div>
    </Page>
  );
};

export default Leaderboard;
