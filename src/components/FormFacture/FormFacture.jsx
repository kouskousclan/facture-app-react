// Fichier : src/components/FormFacture/FormFacture.jsx
// Version personnalisée avec icônes et couleurs dynamiques.

import React, { useState } from 'react';

// Les styles sont maintenant injectés via un composant <style>
// Les couleurs primaires sont maintenant définies par des classes de thème.
const Styles = () => (
  <style>{`
    /* Fichier : src/components/FormFacture/FormFacture.module.css 
      NOTE : Pour utiliser vos polices locales, décommentez le bloc @font-face 
             et remplacez les chemins.
    */

    /* @font-face {
      font-family: 'VotrePoliceReguliere';
      src: url('/src/assets/fonts/VotrePolice-Regular.woff2') format('woff2'),
           url('/src/assets/fonts/VotrePolice-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
    }

    @font-face {
      font-family: 'VotrePoliceBold';
      src: url('/src/assets/fonts/VotrePolice-Bold.woff2') format('woff2'),
           url('/src/assets/fonts/VotrePolice-Bold.woff') format('woff');
      font-weight: 700;
      font-style: normal;
    }
    */

    /* Import de la police Google Poppins en attendant */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

    /* Définition des variables pour une maintenance facile */
    :root {
      --font-primary: 'Poppins', sans-serif; /* Remplacez par 'VotrePolice', etc. */
      --color-secondary: #10b981;
      --color-text: #1f2937;
      --color-text-light: #6b7280;
      --color-bg: #f9fafb;
      --color-surface: #ffffff;
      --color-border: #d1d5db;
      --color-error: #ef4444;
      --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      --border-radius: 12px;
      --transition-speed: 0.2s;
    }

    /* Thèmes de couleurs dynamiques */
    .themeWashME {
        --color-primary: #74c4dd;
        --color-primary-light: #8ed2e6;
    }
    .themePhotomaton {
        --color-primary: #E27F45;
        --color-primary-light: #e99260;
    }


    .formWrapper {
      background-color: var(--color-bg);
      font-family: var(--font-primary);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      box-sizing: border-box; /* Assure que le padding ne crée pas de scrollbar */
      transition: background-color var(--transition-speed) ease;
    }

    .formContainer {
      width: 100%;
      max-width: 700px;
      margin: 2rem auto;
      padding: 2.5rem 3rem;
      background: var(--color-surface);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-lg);
      border: 1px solid #e5e7eb;
    }

    .formHeader {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .brandIcon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        width: 80px;
        height: 80px;
        line-height: 1;
        background-color: var(--color-bg);
        border-radius: 50%;
        margin-bottom: 1rem;
        color: var(--color-primary);
        transition: color var(--transition-speed) ease;
    }
    
    .brandIcon svg {
        width: 48px;
        height: 48px;
    }

    .title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-text);
      margin: 0;
    }

    .subtitle {
        margin-top: 0.5rem;
        font-size: 1rem;
        color: var(--color-text-light);
    }

    .formGroup {
      margin-bottom: 1.75rem;
    }

    .formGroup label, .groupLabel {
      display: block;
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.75rem;
      font-size: 0.9rem;
    }

    .input,
    .select {
      width: 100%;
      padding: 0.85rem 1rem;
      border: 1px solid var(--color-border);
      border-radius: 8px;
      font-size: 1rem;
      font-family: var(--font-primary);
      box-sizing: border-box;
      background-color: #fff;
      transition: border-color var(--transition-speed) ease, box-shadow var(--transition-speed) ease;
    }

    .input::placeholder {
        color: #9ca3af;
    }

    .input:focus,
    .select:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent);
    }

    .inputError {
        border-color: var(--color-error);
    }

    .inputError:focus {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-error) 20%, transparent);
    }

    .errorMessage {
        color: var(--color-error);
        font-size: 0.8rem;
        margin-top: 0.5rem;
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
    }

    /* Custom Radio Buttons */
    .radioGroup {
      display: flex;
      gap: 1rem;
      border: 1px solid var(--color-border);
      padding: 0.5rem;
      border-radius: 10px;
    }

    .radioLabel {
      flex: 1;
      padding: 0.8rem 1rem;
      border-radius: 8px;
      text-align: center;
      cursor: pointer;
      transition: all var(--transition-speed) ease;
      font-weight: 500;
    }

    .radioLabel input {
      display: none;
    }

    .radioChecked {
      background-color: var(--color-primary);
      color: white;
      box-shadow: var(--shadow-sm);
    }

    /* Custom Select Dropdown */
    .selectWrapper {
        position: relative;
    }

    .selectWrapper::after {
        content: '▼';
        position: absolute;
        top: 50%;
        right: 1rem;
        transform: translateY(-50%);
        pointer-events: none;
        color: var(--color-text-light);
        font-size: 0.8rem;
    }

    .select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        padding-right: 2.5rem; /* Espace pour la flèche */
    }

    /* Custom Checkboxes */
    .checkboxGrid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }

    .checkboxLabel {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.8rem 1rem;
      border: 1px solid var(--color-border);
      border-radius: 8px;
      cursor: pointer;
      transition: all var(--transition-speed) ease;
      font-weight: 500;
    }

    .checkboxLabel:hover {
        border-color: var(--color-primary);
    }

    .checkboxLabel input {
      display: none;
    }

    .checkboxCustom {
      width: 20px;
      height: 20px;
      border: 2px solid var(--color-border);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-speed) ease;
      flex-shrink: 0;
    }

    .checkboxCustom::after {
      content: '✔';
      color: white;
      font-size: 14px;
      opacity: 0;
      transform: scale(0.5);
      transition: all var(--transition-speed) ease;
    }

    .checkboxLabel input:checked + .checkboxCustom {
      background-color: var(--color-primary);
      border-color: var(--color-primary);
    }

    .checkboxLabel input:checked + .checkboxCustom::after {
      opacity: 1;
      transform: scale(1);
    }

    /* Submit Button */
    .submitButton {
      width: 100%;
      padding: 1rem;
      border: none;
      border-radius: 8px;
      background-image: linear-gradient(to right, var(--color-primary), var(--color-primary-light));
      color: white;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      margin-top: 1.5rem;
      transition: all var(--transition-speed) ease;
      box-shadow: var(--shadow-md);
    }

    .submitButton:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .submitButton:active {
        transform: translateY(0);
        box-shadow: var(--shadow-sm);
    }

    /* Responsive */
    @media (max-width: 600px) {
        .formContainer {
            padding: 2rem 1.5rem;
        }
        .grid {
            grid-template-columns: 1fr;
            gap: 0;
        }
        .checkboxGrid {
            grid-template-columns: 1fr;
        }
    }
  `}</style>
);

// Icônes pour une meilleure interface visuelle
const BrandIcon = ({ brand }) => (
  <span className="brandIcon">
    {brand === 'WashME' ? (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"/>
        <circle cx="12" cy="13" r="4" strokeWidth="1"/>
        <path d="M18.5 7.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
        <path d="M16.5 7.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
      </svg>
    ) : (
      '📸'
    )}
  </span>
);

const WASHME_SERVICES = ["Lave-linge 20Kg", "Lave-linge 12Kg", "Lave-linge 9 Kg", "Sèche-linge", "Portique de lavage", "Dog Wash"];
const PHOTOMATON_SERVICES = ["Cabine photo d'identité", "Borne numérique", "Photocopieur"];

function FormFacture({ onFormSubmit }) {
  const [formData, setFormData] = useState({
    brand: 'WashME',
    nomClient: '',
    dateTransaction: '',
    paiement: 'Carte bancaire',
    appareils: [],
    prixTTC: ''
  });

  const [errors, setErrors] = useState({});

  const servicesActuels = formData.brand === 'WashME' ? WASHME_SERVICES : PHOTOMATON_SERVICES;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    }

    if (type === 'checkbox') {
      setFormData(prevData => ({
        ...prevData,
        appareils: checked
          ? [...prevData.appareils, value]
          : prevData.appareils.filter(appareil => appareil !== value)
      }));
      if (checked && errors.appareils) {
        setErrors(prevErrors => ({ ...prevErrors, appareils: null }));
      }
    } else {
      if (name === 'brand') {
        setFormData(prevData => ({
          ...prevData,
          brand: value,
          appareils: []
        }));
      } else {
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nomClient.trim()) newErrors.nomClient = "Le nom du client est requis.";
    if (!formData.dateTransaction) newErrors.dateTransaction = "La date de transaction est requise.";
    if (formData.appareils.length === 0) newErrors.appareils = "Veuillez sélectionner au moins un appareil.";
    if (!formData.prixTTC) {
      newErrors.prixTTC = "Le prix T.T.C. est requis.";
    } else if (isNaN(formData.prixTTC) || parseFloat(formData.prixTTC) <= 0) {
      newErrors.prixTTC = "Le prix doit être un nombre positif.";
    }

    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    console.log("Formulaire soumis :", formData);
    if(onFormSubmit) {
        onFormSubmit(formData);
    }
  };

  return (
    <>
      <Styles />
      <div className={`formWrapper ${formData.brand === 'WashME' ? 'themeWashME' : 'themePhotomaton'}`}>
        <form className="formContainer" onSubmit={handleSubmit} noValidate>
          <div className="formHeader">
              <BrandIcon brand={formData.brand} />
              <h1 className="title">Créer une Preuve d'Achat</h1>
              <p className="subtitle">Remplissez les champs ci-dessous pour générer le document.</p>
          </div>

          <div className="formGroup">
            <label className="groupLabel">Marque</label>
            <div className="radioGroup">
              <label className={`radioLabel ${formData.brand === 'WashME' ? 'radioChecked' : ''}`}>
                <input type="radio" name="brand" value="WashME" checked={formData.brand === 'WashME'} onChange={handleChange} />
                WashME
              </label>
              <label className={`radioLabel ${formData.brand === 'Photomaton' ? 'radioChecked' : ''}`}>
                <input type="radio" name="brand" value="Photomaton" checked={formData.brand === 'Photomaton'} onChange={handleChange} />
                Photomaton
              </label>
            </div>
          </div>
          
          <div className="grid">
              <div className="formGroup">
                  <label htmlFor="nomClient">Nom du client</label>
                  <input type="text" id="nomClient" name="nomClient" className={`input ${errors.nomClient ? 'inputError' : ''}`} onChange={handleChange} value={formData.nomClient} placeholder="ex: Jean Dupont" />
                  {errors.nomClient && <p className="errorMessage">{errors.nomClient}</p>}
              </div>

              <div className="formGroup">
                  <label htmlFor="dateTransaction">Date de la transaction</label>
                  <input type="date" id="dateTransaction" name="dateTransaction" className={`input ${errors.dateTransaction ? 'inputError' : ''}`} onChange={handleChange} value={formData.dateTransaction} />
                  {errors.dateTransaction && <p className="errorMessage">{errors.dateTransaction}</p>}
              </div>
          </div>

          <div className="formGroup">
            <label htmlFor="paiement">Mode de paiement</label>
            <div className="selectWrapper">
              <select id="paiement" name="paiement" className="select" onChange={handleChange} value={formData.paiement}>
                <option>Carte bancaire</option>
                <option>Espèces</option>
              </select>
            </div>
          </div>

          <div className="formGroup">
            <label className="groupLabel">Appareils utilisés</label>
            <div className="checkboxGrid">
              {servicesActuels.map(service => (
                <label key={service} className="checkboxLabel">
                  <input type="checkbox" name="appareils" value={service} checked={formData.appareils.includes(service)} onChange={handleChange} />
                  <span className="checkboxCustom"></span>
                  <span>{service}</span>
                </label>
              ))}
            </div>
            {errors.appareils && <p className="errorMessage">{errors.appareils}</p>}
          </div>

          <div className="formGroup">
            <label htmlFor="prixTTC">Prix T.T.C (€)</label>
            <input type="number" id="prixTTC" name="prixTTC" step="0.01" className={`input ${errors.prixTTC ? 'inputError' : ''}`} onChange={handleChange} value={formData.prixTTC} placeholder="ex: 12.50"/>
            {errors.prixTTC && <p className="errorMessage">{errors.prixTTC}</p>}
          </div>

          <button type="submit" className="submitButton">Générer la Preuve d'Achat</button>
        </form>
      </div>
    </>
  );
}

export default FormFacture;
