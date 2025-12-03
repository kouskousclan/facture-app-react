// Fichier : src/components/FormFacture/FormFacture.jsx
import React, { useState } from 'react';
import { COUNTRIES, getAllowedCountries, getBrandLocale } from '../../constants/brandConfig';
import styles from './FormFacture.module.css';

// Icônes pour une meilleure interface visuelle
const BrandIcon = ({ brand }) => (
  <span className={styles.brandIcon}>
    {brand === 'WashME' && (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" />
        <circle cx="12" cy="13" r="4" strokeWidth="1" />
        <path d="M18.5 7.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
        <path d="M16.5 7.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
      </svg>
    )}
    {brand === 'Photomaton' && (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7a2 2 0 0 1 2-2h1.2a1 1 0 0 0 .94-.66l.33-.99A1 1 0 0 1 9.42 2h5.16a1 1 0 0 1 .95.68l.27.83a1 1 0 0 0 .95.69H18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
        <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
        <circle cx="12" cy="12" r="3" />
        <circle cx="18" cy="8" r="0.9" fill="currentColor" />
      </svg>
    )}
    {brand === 'KeeMe' && (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 14a6 6 0 1 1 11.83 1h3.67a1 1 0 0 1 0 2h-1.75l1 1.73a1 1 0 1 1-1.73 1l-1.45-2.5H13a1 1 0 0 1 0-2h1.86A6 6 0 0 1 3 14Z" />
        <circle cx="7" cy="14" r="2" />
      </svg>
    )}
  </span>
);

const BRAND_OPTIONS = ['WashME', 'Photomaton', 'KeeMe'];
const PAYMENT_OPTIONS = ['Carte bancaire', 'Espèces'];
const CLIENT_TYPES = ['Particulier', 'Pro'];

function FormFacture({ onFormSubmit }) {
  const [formData, setFormData] = useState({
    brand: 'WashME',
    country: COUNTRIES.FRANCE,
    clientType: 'Particulier',
    nomClient: '',
    raisonSociale: '',
    dateTransaction: '',
    paiement: PAYMENT_OPTIONS[0],
    appareils: [],
    prixTTC: '',
    addAddress: false,
    addressLine1: '',
    addSiret: false,
    siret: '',
  });

  const [errors, setErrors] = useState({});
  const [isPaymentOpen, setPaymentOpen] = useState(false); // État pour le sélecteur personnalisé

  const allowedCountries = getAllowedCountries(formData.brand);
  const brandLocale = getBrandLocale(formData.brand, formData.country) ?? { services: [] };
  const services = brandLocale.services || [];
  const togglePaymentList = () => setPaymentOpen(prev => !prev);

  const handlePaymentKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      togglePaymentList();
    }
    if (event.key === 'Escape') {
      setPaymentOpen(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    }

    if (type === 'checkbox' && name === 'appareils') {
      setFormData(prevData => ({
        ...prevData,
        appareils: checked
          ? [...prevData.appareils, value]
          : prevData.appareils.filter(appareil => appareil !== value),
      }));
      if (checked && errors.appareils) {
        setErrors(prevErrors => ({ ...prevErrors, appareils: null }));
      }
      return;
    }

    if (type === 'checkbox' && name === 'addSiret') {
      setFormData(prev => ({ ...prev, addSiret: checked, siret: checked ? prev.siret : '' }));
      return;
    }

    if (type === 'checkbox' && name === 'addAddress') {
      setFormData(prev => ({ ...prev, addAddress: checked, addressLine1: checked ? prev.addressLine1 : '' }));
      return;
    }

    setFormData(prevData => {
      if (name === 'brand') {
          const nextAllowed = getAllowedCountries(value);
          const nextCountry = nextAllowed.includes(prevData.country) ? prevData.country : nextAllowed[0];
        return { ...prevData, brand: value, appareils: [], country: nextCountry };
      }
      if (name === 'country') {
        return { ...prevData, country: value, appareils: [] };
      }
      if (name === 'clientType') {
        const isPro = value === 'Pro';
        return {
          ...prevData,
          clientType: value,
          raisonSociale: isPro ? prevData.raisonSociale : '',
          addSiret: isPro ? prevData.addSiret : false,
          siret: isPro ? prevData.siret : '',
        };
      }
      return { ...prevData, [name]: value };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const isPro = formData.clientType === 'Pro';
    const hasNom = formData.nomClient.trim().length > 0;
    const hasRaisonSociale = formData.raisonSociale.trim().length > 0;

    if (!hasNom && !hasRaisonSociale) {
      newErrors.nomClient = 'Renseignez au moins le nom du client ou la raison sociale.';
      newErrors.raisonSociale = 'Renseignez au moins le nom du client ou la raison sociale.';
    } else if (!hasNom && !isPro) {
      newErrors.nomClient = 'Le nom du client est requis pour un particulier.';
    }

    if (!formData.dateTransaction) newErrors.dateTransaction = 'La date de transaction est requise.';
    if (formData.appareils.length === 0) newErrors.appareils = 'Au moins un appareil est requis.';
    if (!formData.prixTTC) {
      newErrors.prixTTC = 'Le prix T.T.C. est requis.';
    } else if (Number.isNaN(parseFloat(formData.prixTTC)) || parseFloat(formData.prixTTC) <= 0) {
      newErrors.prixTTC = 'Le prix doit être un nombre positif.';
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
      nomClient: formData.nomClient ? capitalize(formData.nomClient.trim()) : '',
      raisonSociale: formData.raisonSociale.trim(),
      addressLine1: formData.addressLine1.trim(),
      displayName: formData.nomClient.trim() || formData.raisonSociale.trim(),
    };

    if (onFormSubmit) {
      onFormSubmit(finalData);
    }
  };

  return (
    <div className={`${styles.formWrapper} ${
      formData.brand === 'WashME' ? styles.themeWashME
        : formData.brand === 'Photomaton' ? styles.themePhotomaton
        : styles.themeKeeMe
    }`}>
      <form className={styles.formContainer} onSubmit={handleSubmit} noValidate>
        <div className={styles.formHeader}>
          <BrandIcon brand={formData.brand} />
          <h1 className={styles.title}>Créer une Preuve d'Achat</h1>
          <p className={styles.subtitle}>Remplissez les champs ci-dessous pour générer le document.</p>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.groupLabel}>Marque</label>
          <div className={styles.radioGroup}>
            {BRAND_OPTIONS.map(option => (
              <label key={option} className={`${styles.radioLabel} ${formData.brand === option ? styles.radioChecked : ''}`}>
                <input type="radio" name="brand" value={option} checked={formData.brand === option} onChange={handleChange} />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.groupLabel}>Pays</label>
          <div className={styles.radioGroup}>
            {allowedCountries.map(option => (
              <label key={option} className={`${styles.radioLabel} ${formData.country === option ? styles.radioChecked : ''}`}>
                <input type="radio" name="country" value={option} checked={formData.country === option} onChange={handleChange} />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.formGroup}>
            <label htmlFor="nomClient">Nom du client</label>
            <input type="text" id="nomClient" name="nomClient" className={`${styles.input} ${errors.nomClient ? styles.inputError : ''}`} onChange={handleChange} value={formData.nomClient} placeholder="Ex: Jean Dupont" />
            {errors.nomClient && <p className={styles.errorMessage}>{errors.nomClient}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.groupLabel}>Type de client</label>
            <div className={styles.radioGroup}>
              {CLIENT_TYPES.map(option => (
                <label key={option} className={`${styles.radioLabel} ${formData.clientType === option ? styles.radioChecked : ''}`}>
                  <input type="radio" name="clientType" value={option} checked={formData.clientType === option} onChange={handleChange} />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>

        {formData.clientType === 'Pro' && (
          <div className={styles.formGroup}>
            <label htmlFor="raisonSociale">Raison sociale</label>
            <input type="text" id="raisonSociale" name="raisonSociale" className={`${styles.input} ${errors.raisonSociale ? styles.inputError : ''}`} onChange={handleChange} value={formData.raisonSociale} placeholder="Ex: Mon Entreprise SAS" />
            {errors.raisonSociale && <p className={styles.errorMessage}>{errors.raisonSociale}</p>}
          </div>
        )}

        <div className={styles.formGroup}>
          <label className={styles.checkboxLabelInline}>
            <input type="checkbox" name="addAddress" checked={formData.addAddress} onChange={handleChange} />
            <span className={styles.checkboxCustom}></span>
            <span>Ajouter une adresse</span>
          </label>
          {formData.addAddress && (
            <input type="text" id="addressLine1" name="addressLine1" className={styles.input} onChange={handleChange} value={formData.addressLine1} placeholder="Ex: 12 rue de la Paix" />
          )}
        </div>

        <div className={styles.grid}>
          <div className={styles.formGroup}>
            <label htmlFor="dateTransaction">Date de la transaction</label>
            <input type="date" id="dateTransaction" name="dateTransaction" className={`${styles.input} ${errors.dateTransaction ? styles.inputError : ''}`} onChange={handleChange} value={formData.dateTransaction} />
            {errors.dateTransaction && <p className={styles.errorMessage}>{errors.dateTransaction}</p>}
          </div>
        </div>

        {formData.clientType === 'Pro' && (
          <div className={styles.formGroup}>
            <label className={styles.checkboxLabelInline}>
              <input type="checkbox" name="addSiret" checked={formData.addSiret} onChange={handleChange} />
              <span className={styles.checkboxCustom}></span>
              <span>Ajouter un numéro de SIRET</span>
            </label>
            {formData.addSiret && (
              <input type="text" name="siret" className={styles.input} onChange={handleChange} value={formData.siret} placeholder="Numéro de SIRET" />
            )}
          </div>
        )}

        <div className={styles.formGroup}>
          <label>Mode de paiement</label>
          <div className={styles.customSelect}>
            <div
              className={styles.selectDisplayed}
              onClick={togglePaymentList}
              tabIndex={0}
              role="button"
              aria-haspopup="listbox"
              aria-expanded={isPaymentOpen}
              onKeyDown={handlePaymentKeyDown}
            >
              {formData.paiement}
            </div>
            {isPaymentOpen && (
              <ul className={styles.selectOptions} role="listbox">
                {PAYMENT_OPTIONS.map(option => (
                  <li
                    key={option}
                    className={styles.selectOption}
                    role="option"
                    aria-selected={formData.paiement === option}
                    tabIndex={0}
                    onClick={() => {
                      setFormData(prevData => ({ ...prevData, paiement: option }));
                      setPaymentOpen(false); // Ferme la liste après sélection
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setFormData(prevData => ({ ...prevData, paiement: option }));
                        setPaymentOpen(false);
                      }
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
            {services.map(service => (
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
          <input type="number" id="prixTTC" name="prixTTC" step="0.01" className={`${styles.input} ${errors.prixTTC ? styles.inputError : ''}`} onChange={handleChange} value={formData.prixTTC} placeholder="Ex: 12.50" />
          {errors.prixTTC && <p className={styles.errorMessage}>{errors.prixTTC}</p>}
        </div>

        <button type="submit" className={styles.submitButton}>Générer la Preuve d'Achat</button>
      </form>
    </div>
  );
}

export default FormFacture;
