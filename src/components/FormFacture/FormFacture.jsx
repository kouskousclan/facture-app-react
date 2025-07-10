// Fichier : src/components/FormFacture/FormFacture.jsx
import React, { useState } from 'react';
import styles from './FormFacture.module.css';

// Icônes pour une meilleure interface visuelle
const BrandIcon = ({ brand }) => (
  <span className={styles.brandIcon}>
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
  const [isPaymentOpen, setPaymentOpen] = useState(false); // État pour le sélecteur personnalisé

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
    if (formData.appareils.length === 0) newErrors.appareils = "Au moins un appareil est requis.";
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

    const capitalize = (str) => str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    const finalData = {
        ...formData,
        nomClient: capitalize(formData.nomClient.trim())
    };

    console.log("Formulaire soumis :", finalData);
    if(onFormSubmit) {
        onFormSubmit(finalData);
    }
  };

  return (
    <div className={`${styles.formWrapper} ${formData.brand === 'WashME' ? styles.themeWashME : styles.themePhotomaton}`}>
      <form className={styles.formContainer} onSubmit={handleSubmit} noValidate>
        <div className={styles.formHeader}>
            <BrandIcon brand={formData.brand} />
            <h1 className={styles.title}>Créer une Preuve d'Achat</h1>
            <p className={styles.subtitle}>Remplissez les champs ci-dessous pour générer le document.</p>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.groupLabel}>Marque</label>
          <div className={styles.radioGroup}>
            <label className={`${styles.radioLabel} ${formData.brand === 'WashME' ? styles.radioChecked : ''}`}>
              <input type="radio" name="brand" value="WashME" checked={formData.brand === 'WashME'} onChange={handleChange} />
              WashME
            </label>
            <label className={`${styles.radioLabel} ${formData.brand === 'Photomaton' ? styles.radioChecked : ''}`}>
              <input type="radio" name="brand" value="Photomaton" checked={formData.brand === 'Photomaton'} onChange={handleChange} />
              Photomaton
            </label>
          </div>
        </div>
        
        <div className={styles.grid}>
            <div className={styles.formGroup}>
                <label htmlFor="nomClient">Nom du client</label>
                <input type="text" id="nomClient" name="nomClient" className={`${styles.input} ${errors.nomClient ? styles.inputError : ''}`} onChange={handleChange} value={formData.nomClient} placeholder="Ex: Jean Dupont" />
                {errors.nomClient && <p className={styles.errorMessage}>{errors.nomClient}</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="dateTransaction">Date de la transaction</label>
                <input type="date" id="dateTransaction" name="dateTransaction" className={`${styles.input} ${errors.dateTransaction ? styles.inputError : ''}`} onChange={handleChange} value={formData.dateTransaction} />
                {errors.dateTransaction && <p className={styles.errorMessage}>{errors.dateTransaction}</p>}
            </div>
        </div>

        <div className={styles.formGroup}>
          <label>Mode de paiement</label>
          <div className={styles.customSelect}>
            <div 
              className={styles.selectDisplayed} 
              onClick={() => setPaymentOpen(!isPaymentOpen)}
              tabIndex="0" // Pour l'accessibilité
            >
              {formData.paiement}
            </div>
            {isPaymentOpen && (
              <ul className={styles.selectOptions}>
                {['Carte bancaire', 'Espèces'].map(option => (
                  <li
                    key={option}
                    className={styles.selectOption}
                    onClick={() => {
                      setFormData(prevData => ({ ...prevData, paiement: option }));
                      setPaymentOpen(false); // Ferme la liste après sélection
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.groupLabel}>Appareils utilisés</label>
          <div className={styles.checkboxGrid}>
            {servicesActuels.map(service => (
              <label key={service} className={styles.checkboxLabel}>
                <input type="checkbox" name="appareils" value={service} checked={formData.appareils.includes(service)} onChange={handleChange} />
                <span className={styles.checkboxCustom}></span>
                <span>{service}</span>
              </label>
            ))}
          </div>
          {errors.appareils && <p className={styles.errorMessage}>{errors.appareils}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="prixTTC">Prix T.T.C (€)</label>
          <input type="number" id="prixTTC" name="prixTTC" step="0.01" className={`${styles.input} ${errors.prixTTC ? styles.inputError : ''}`} onChange={handleChange} value={formData.prixTTC} placeholder="Ex: 12.50"/>
          {errors.prixTTC && <p className={styles.errorMessage}>{errors.prixTTC}</p>}
        </div>

        <button type="submit" className={styles.submitButton}>Générer la Preuve d'Achat</button>
      </form>
    </div>
  );
}

export default FormFacture;