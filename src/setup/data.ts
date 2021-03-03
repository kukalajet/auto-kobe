interface Valute {
  name: string;
  symbol: string;
}
export const valutes: Valute[] = [
  {
    name: 'Euro',
    symbol: '€',
  },
  {
    name: 'Lek',
    symbol: 'L',
  },
  {
    name: 'Dollar',
    symbol: '$',
  },
];

interface Country {
  name: string;
  image: string;
}
export const countries: Country[] = [
  {
    name: 'Albania',
    image:
      'https://www.countryflags.com/wp-content/uploads/albania-albanian-flag-png-square-large.png',
  },
  {
    name: 'Kosovo',
    image:
      'https://www.countryflags.com/wp-content/uploads/kosovo-flag-png-large.png',
  },
  {
    name: 'Italy',
    image:
      'https://www.countryflags.com/wp-content/uploads/italy-flag-png-large.png',
  },
  {
    name: 'Germany',
    image:
      'https://www.countryflags.com/wp-content/uploads/germany-flag-png-large.png',
  },
  {
    name: 'Greece',
    image:
      'https://www.countryflags.com/wp-content/uploads/greece-flag-png-large.png',
  },
  {
    name: 'Croatia',
    image:
      'https://www.countryflags.com/wp-content/uploads/croatia-flag-png-large.png',
  },
];

interface DoorSetup {
  number: string;
}
export const doorSetups: DoorSetup[] = [
  {
    number: 'Two',
  },
  {
    number: 'TwoPlusOne',
  },
  {
    number: 'Four',
  },
  {
    number: 'FourPlusOne',
  },
  {
    number: 'Six',
  },
  {
    number: 'SixPlusOne',
  },
];

interface EmissionClass {
  standard: string;
}
export const emissionClasses: EmissionClass[] = [
  {
    standard: 'Euro1',
  },
  {
    standard: 'Euro2',
  },
  {
    standard: 'Euro3',
  },
  {
    standard: 'Euro4',
  },
  {
    standard: 'Euro5',
  },
  {
    standard: 'Euro6',
  },
];

interface Fuel {
  type: string;
}
export const fuelTypes: Fuel[] = [
  {
    type: 'Petrol',
  },
  {
    type: 'Diesel',
  },
  {
    type: 'Electric',
  },
  {
    type: 'Hybrid',
  },
  {
    type: 'BiFuel',
  },
];

interface Transmission {
  type: string;
}
export const transmissions: Transmission[] = [
  {
    type: 'Automatic',
  },
  {
    type: 'Manual',
  },
];

interface Condition {
  name: string;
}
export const conditions: Condition[] = [
  {
    name: 'Excellent',
  },
  {
    name: 'Good',
  },
  {
    name: 'Damaged',
  },
];

interface Brand {
  name: string;
}
export const brands: Brand[] = [
  {
    name: 'Citroen',
  },
];

interface Model {
  name: string;
}
export const models: Model[] = [
  {
    name: 'C3 Aircross',
  },
  {
    name: 'C4 Cactus',
  },
  {
    name: 'C3',
  },
  {
    name: 'E-Mehari',
  },
  {
    name: 'Berlingo',
  },
];
