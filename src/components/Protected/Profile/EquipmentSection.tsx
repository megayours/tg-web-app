import { Text, Avatar, Card } from '@telegram-apps/telegram-ui';
import { BaseToken, Weapon, Armor } from '@/hooks/useDappApi';
import './styles.css';

type Props = {
  title: string;
  items?: (BaseToken | Weapon | Armor)[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  emptyMessage?: string;
}

const isWeapon = (item: BaseToken | Weapon | Armor): item is Weapon => {
  return 'damage' in item;
};

const isArmor = (item: BaseToken | Weapon | Armor): item is Armor => {
  return 'defense' in item;
};

const isEquipment = (item: BaseToken | Weapon | Armor): item is (Weapon | Armor) => {
  return 'weight' in item;
};

const EquipmentSection = ({ title, items = [], selectedId, onSelect, emptyMessage }: Props) => {
  return (
    <div className="equipmentSection">
      <Text Component="h2" className="equipmentSection_title">{title}</Text>
      {items.length > 0 ? (
        <div className="equipmentSection_itemList">
          {items.map((item) => {
            const key = `${item.project}-${item.collection}-${item.id}`;
            const isSelected = selectedId === key;

            return (
              <div 
                key={key}
                className={`equipmentSection_item ${isSelected ? 'equipmentSection_selected' : ''}`}
                onClick={() => onSelect(key)}
              >
                <div className="equipmentSection_avatarWrapper">
                  <Avatar 
                    size={40}
                    src={item.image}
                  />
                  {isSelected && (
                    <div className="equipmentSection_equippedBadge">
                      <Text className="equipmentSection_equippedText">✓</Text>
                    </div>
                  )}
                </div>
                <div className="equipmentSection_details">
                  <Text Component="strong">{item.name}</Text>
                  
                  {isEquipment(item) && (
                    <Text className="equipmentSection_stat">
                      Weight: {item.weight}
                    </Text>
                  )}
                  
                  {isArmor(item) && (
                    <Text className="equipmentSection_stat">
                      Defense: {item.defense}
                    </Text>
                  )}
                  
                  {isWeapon(item) && (
                    <Text className="equipmentSection_stat">
                      Damage: {item.damage}
                    </Text>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card className="equipmentSection_empty">
          <Text className="equipmentSection_emptyText">
            {emptyMessage || 'No items available. Purchase equipment to unlock new possibilities!'}
          </Text>
        </Card>
      )}
    </div>
  );
};

export default EquipmentSection; 