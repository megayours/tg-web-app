'use client';

import { Card, Text } from '@telegram-apps/telegram-ui';
import { useAttributes } from '@/hooks/useDappApi';
import './styles.css';

export const AttributesCard = () => {
  const { data: attributes, isLoading } = useAttributes();

  if (isLoading || !attributes) {
    return null;
  }

  const stats = [
    { label: '❤️ Health', value: attributes.health },
    { label: '⚔️ Damage', value: attributes.damage },
    { label: '🛡️ Defense', value: attributes.defense },
    { label: '⚖️ Weight', value: attributes.weight },
  ];

  return (
    <div className="attributesCard_container">
      {stats.map((stat) => (
        <Card key={stat.label} className="attributesCard_item">
          <Text Component="span" className="attributesCard_label">
            {stat.label}
          </Text>
          <Text Component="strong" className="attributesCard_value">
            {stat.value}
          </Text>
        </Card>
      ))}
    </div>
  );
}; 