export const COUNTRIES = {
  FRANCE: 'France',
  BELGIQUE: 'Belgique',
};

const LEGAL_ENTITIES = {
  [COUNTRIES.FRANCE]: {
    name: 'ME Group France',
    lines: ['8 rue Auber', '75009 Paris'],
  },
  [COUNTRIES.BELGIQUE]: {
    name: 'ME Group Belgique',
    lines: ['Boulevard Paepsem 8a', '1070 Anderlecht'],
  },
};

const WASHME_SERVICES = [
  'Lave-linge 20Kg',
  'Lave-linge 12Kg',
  'Lave-linge 9 Kg',
  'Sèche-linge',
  'Portique de lavage',
  'Dog Wash',
];

const PHOTOMATON_SERVICES = [
  "Cabine photo d'identité",
  'Borne numérique',
  'Photocopieur',
];

const KEEME_SERVICES = ['Clé plate'];

export const BRAND_CONFIG = {
  WashME: {
    displayName: 'WashME',
    allowedCountries: [COUNTRIES.FRANCE, COUNTRIES.BELGIQUE],
    services: WASHME_SERVICES,
    locales: {
      [COUNTRIES.FRANCE]: {
        phone: { label: 'Service Client Wash.ME', number: '09.70.82.32.47' },
      },
      [COUNTRIES.BELGIQUE]: {
        phone: { label: 'Service Client Wash.ME', number: '09.70.82.32.47' },
      },
    },
  },
  Photomaton: {
    displayName: 'Photomaton',
    allowedCountries: [COUNTRIES.FRANCE, COUNTRIES.BELGIQUE],
    services: PHOTOMATON_SERVICES,
    locales: {
      [COUNTRIES.FRANCE]: {
        phone: { label: 'Service Client Photomaton', number: '09.70.82.32.46' },
      },
      [COUNTRIES.BELGIQUE]: {
        phone: { label: 'Service Client Photomaton', number: '09.70.82.32.46' },
      },
    },
  },
  KeeMe: {
    displayName: 'Kee.ME',
    allowedCountries: [COUNTRIES.FRANCE],
    services: KEEME_SERVICES,
    locales: {
      [COUNTRIES.FRANCE]: {
        phone: { label: 'Service Client KeeMe', number: '09.70.82.32.46' }, // même numéro que Photomaton
        website: 'https://www.kee-megroup.com',
        colors: {
          headerBg: '#FCEBFA',
          footerBg: '#FCEBFA',
          band: '#95478D',
        },
      },
      [COUNTRIES.BELGIQUE]: {
        phone: { label: 'Service Client KeeMe', number: '+32 2 463 09 70' },
        website: 'https://www.wash-megroup.com/fr-be/',
        colors: {
          headerBg: '#FCEBFA',
          footerBg: '#FCEBFA',
          band: '#95478D',
        },
      },
    },
  },
};

export const getBrandLocale = (brand, country) => {
  const brandData = BRAND_CONFIG[brand];
  if (!brandData) return null;
  const locale = brandData.locales?.[country] ?? brandData.locales?.[COUNTRIES.FRANCE];
  return {
    services: brandData.services,
    phone: locale?.phone,
    website: locale?.website,
    colors: locale?.colors,
  };
};

export const getLegalAddress = (country) =>
  LEGAL_ENTITIES[country] ?? LEGAL_ENTITIES[COUNTRIES.FRANCE];

export const getAllowedCountries = (brand) => {
  const config = BRAND_CONFIG[brand];
  return config?.allowedCountries ?? [COUNTRIES.FRANCE];
};
