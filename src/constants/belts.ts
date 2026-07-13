export type BeltId = 'white' | 'yellow' | 'orange' | 'green' | 'blue' | 'purple' | 'brown' | 'black';

export type Belt = {
  id: BeltId;
  name: string;
  cefr: string;
  title: string;
  description: string;
  color: string;
};

export const belts: Belt[] = [
  { id: 'white', name: 'Faixa Branca', cefr: 'A0', title: 'Se apresentar', description: 'As primeiras palavras para abrir a porta.', color: '#EEECE5' },
  { id: 'yellow', name: 'Faixa Amarela', cefr: 'A1', title: 'Sobreviver', description: 'Faça-se entender no dia a dia.', color: '#E6B84A' },
  { id: 'orange', name: 'Faixa Laranja', cefr: 'A2', title: 'Dominar a rotina', description: 'Converse sobre o que move sua vida.', color: '#D77D3D' },
  { id: 'green', name: 'Faixa Verde', cefr: 'A2+', title: 'Resolver problemas simples', description: 'Encontre saídas com mais autonomia.', color: '#7D9D66' },
  { id: 'blue', name: 'Faixa Azul', cefr: 'B1', title: 'Pensar de forma independente', description: 'Navegue por ideias e situações novas.', color: '#527FA1' },
  { id: 'purple', name: 'Faixa Roxa', cefr: 'B2', title: 'Trabalhar em alemão', description: 'Coloque seu alemão para trabalhar.', color: '#8A67A2' },
  { id: 'brown', name: 'Faixa Marrom', cefr: 'C1', title: 'Falar quase fluentemente', description: 'Dê nuance à sua voz.', color: '#8E6247' },
  { id: 'black', name: 'Faixa Preta', cefr: 'C2', title: 'Falar como nativo', description: 'A língua agora também é sua.', color: '#292929' },
];

export const beltById = (id: string) => belts.find((belt) => belt.id === id) ?? belts[0];
