// Fichier : src/components/FormFacture/FormFacture.jsx

import { useState } from 'react';
import styles from './FormFacture.module.css';

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
  
  // Nouvel état pour gérer les erreurs de validation
  const [errors, setErrors] = useState({});

  const servicesActuels = formData.brand === 'WashME' ? WASHME_SERVICES : PHOTOMATON_SERVICES;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Effacer l'erreur pour le champ en cours de modification
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
       // Effacer l'erreur des appareils si une case est cochée
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

  // Fonction de validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nomClient.trim()) {
      newErrors.nomClient = "Le nom du client est requis.";
    }
    if (!formData.dateTransaction) {
      newErrors.dateTransaction = "La date de transaction est requise.";
    }
    if (formData.appareils.length === 0) {
      newErrors.appareils = "Veuillez sélectionner au moins un appareil.";
    }
    if (!formData.prixTTC) {
      newErrors.prixTTC = "Le prix T.T.C. est requis.";
    } else if (parseFloat(formData.prixTTC) <= 0) {
      newErrors.prixTTC = "Le prix doit être un nombre positif.";
    }

    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Bloque la soumission
    }
    onFormSubmit(formData);
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit} noValidate>
      <h1 className={styles.title}>Créer une Preuve d'Achat</h1>

      <div className={styles.formGroup}>
        <label>La preuve d'achat est pour :</label>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <label>
            <input type="radio" name="brand" value="WashME" checked={formData.brand === 'WashME'} onChange={handleChange} />
            WashME
          </label>
          <label>
            <input type="radio" name="brand" value="Photomaton" checked={formData.brand === 'Photomaton'} onChange={handleChange} />
            Photomaton
          </label>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="nomClient">Nom du client</label>
        <input type="text" id="nomClient" name="nomClient" className={styles.input} onChange={handleChange} value={formData.nomClient} />
        {errors.nomClient && <p className="error-message">{errors.nomClient}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="dateTransaction">Date de la transaction</label>
        <input type="date" id="dateTransaction" name="dateTransaction" className={styles.input} onChange={handleChange} value={formData.dateTransaction} />
        {errors.dateTransaction && <p className="error-message">{errors.dateTransaction}</p>}
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="paiement">Mode de paiement</label>
        <select id="paiement" name="paiement" className={styles.select} onChange={handleChange} value={formData.paiement}>
          <option>Carte bancaire</option>
          <option>Espèces</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Appareils utilisés :</label>
        {servicesActuels.map(service => (
          <div key={service} className={styles.checkboxGroup}>
            <label>
              <input type="checkbox" name="appareils" value={service} checked={formData.appareils.includes(service)} onChange={handleChange} />
              {service}
            </label>
          </div>
        ))}
        {errors.appareils && <p className="error-message">{errors.appareils}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="prixTTC">Prix T.T.C (€)</label>
        <input type="number" id="prixTTC" name="prixTTC" step="0.01" className={styles.input} onChange={handleChange} value={formData.prixTTC} />
        {errors.prixTTC && <p className="error-message">{errors.prixTTC}</p>}
      </div>

      <button type="submit" className={styles.submitButton}>Générer la Preuve d'Achat</button>
    </form>
  );
}

export default FormFacture;
