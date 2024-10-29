import { Section, Cell, Avatar as TelegramAvatar, Selectable } from '@telegram-apps/telegram-ui';
import { BaseToken } from '@/hooks/useDappApi';

interface EquipmentSectionProps {
  title: string;
  items?: BaseToken[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const EquipmentSection = ({ title, items, selectedId, onSelect }: EquipmentSectionProps) => {
  const tokenKey = (token: BaseToken) => `${token.project}-${token.collection}-${token.id}`;
  console.log(items);
  return (
    <Section header={title}>
      <form>
        {items?.map(item => (
          <Cell 
            key={tokenKey(item)}
            Component="label" 
            before={
              <Selectable
                checked={selectedId === tokenKey(item)}
                onChange={() => onSelect(tokenKey(item))}
                name={`${title.toLowerCase()}-selection`}
                value={tokenKey(item)} 
              />
            }
            after={<TelegramAvatar size={40} src={item.image} />}
            description={`${item.project} - ${item.collection}`} 
            multiline
          >
            {item.name}
          </Cell>
        ))}
      </form>
    </Section>
  );
};

export default EquipmentSection; 