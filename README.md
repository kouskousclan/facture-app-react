# Facture App React

Application React (Vite) pour générer une preuve d’achat PDF à partir d’un formulaire multi-marques (WashME, Photomaton, KeeMe) et multi-pays (France / Belgique). Le formulaire applique des validations, propose une sélection d’appareils par marque et par pays, et produit un aperçu exportable en PDF via `html2pdf.js`.

## Fonctionnalités
- Sélection de la marque et des appareils associés (config partagée dans `src/constants/brandConfig.js`), incluant KeeMe France/Belgique.
- Sélecteur de pays (France / Belgique) avec coordonnées légales adaptées.
- Sélection Particulier / Pro, gestion Raison sociale et SIRET (optionnel) avec validations conditionnelles.
- Adresse client avec ligne supplémentaire optionnelle répercutée sur la preuve.
- Validation du formulaire (nom ou raison sociale, date, mode de paiement, appareils, prix TTC).
- Prévisualisation dédiée par marque avec calcul HT/TVA/TTC (formatage `fr-FR`), export PDF en un clic.

## Prérequis
- Node.js 18+

## Scripts
- `npm install` – installe les dépendances.
- `npm run dev` – lance l’appli en mode développement.
- `npm run build` – construit la version de production.
- `npm run preview` – sert la build localement.
- `npm run lint` – lint avec ESLint.

## Structure utile
- `src/components/FormFacture` – formulaire + validations.
- `src/components/WashmePreview` / `src/components/PhotomatonPreview` – aperçus PDF spécifiques.
- `src/constants/brandConfig.js` – appareils et coordonnées partagés entre la saisie et l’aperçu.
- `src/utils/formatters.js` – helpers de formatage (dates, devises).

## Utilisation
1. Lancer `npm install` puis `npm run dev`.
2. Choisir une marque, remplir les champs requis et sélectionner les appareils.
3. Générer, vérifier l’aperçu, puis exporter en PDF ou revenir au formulaire via “Modifier”.
