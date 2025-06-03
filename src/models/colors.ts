

export type Color = {
  id: number,
  name: string,
  hexCode: string
};

export type NewColor = Omit<Color, 'id'>;