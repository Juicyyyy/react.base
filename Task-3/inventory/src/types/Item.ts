export type ItemType = 'potion' | 'equipment' | 'weapon';
export type RarityType = 'common' | 'rare' | 'epic';

export interface Item {
    id: number;
    name: string;
    type: ItemType;
    rarity: RarityType;
    width: number;
    height: number;
}