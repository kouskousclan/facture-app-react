// Fichier : src/components/FormFacture/FormFacture.jsx (Version dynamique)

import { useState } from 'react';
import styles from './FormFacture.module.css';

// On définit nos deux listes d'appareils distinctes
const WASHME_SERVICES = [
  "Lave-linge 20Kg",
  "Lave-linge 12Kg",
  "Lave-linge 9 Kg",
  "Sèche-linge",
  "Portique de lavage",
  "Dog Wash"
];

const PHOTOMATON_SERVICES = [
  "Cabine photo d'identité",
  "Borne numérique",
  "Photocopieur"
];

function FormFacture({ onFormSubmit }) {
  // On ajoute le 'brand' (marque) à notre état, avec 'WashME' par défaut
  const [formData, setFormData] = useState({
    brand: 'WashME', // NOUVEAU
    nomClient: '',
    dateTransaction: '',
    paiement: 'Carte bancaire',
    appareils: [],
    prixTTC: ''
  });

  // La liste des services à afficher dépend de la marque sélectionnée
  const servicesActuels = formData.brand === 'WashME' ? WASHME_SERVICES : PHOTOMATON_SERVICES;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prevData => ({
        ...prevData,
        appareils: checked
          ? [...prevData.appareils, value]
          : prevData.appareils.filter(appareil => appareil !== value)
      }));
    } else {
      // Si on change de marque (brand), on vide la liste des appareils sélectionnés
      if (name === 'brand') {
        setFormData(prevData => ({
          ...prevData,
          brand: value,
          appareils: [] // On réinitialise les appareils cochés
        }));
      } else {
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
      }
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Créer une Preuve d'Achat</h1>

      {/* NOUVEAU : Le choix de la marque */}
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
        <input type="text" id="nomClient" name="nomClient" className={styles.input} onChange={handleChange} value={formData.nomClient} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="dateTransaction">Date de la transaction</label>
        <input type="date" id="dateTransaction" name="dateTransaction" className={styles.input} onChange={handleChange} value={formData.dateTransaction} required />
      </div>
      
      {/* ... les autres champs restent les mêmes ... */}
      <div className={styles.formGroup}>
        <label htmlFor="paiement">Mode de paiement</label>
        <select id="paiement" name="paiement" className={styles.select} onChange={handleChange} value={formData.paiement}>
          <option>Carte bancaire</option>
          <option>Espèces</option>
        </select>
      </div>

      {/* MODIFIÉ : La liste des appareils est maintenant dynamique */}
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
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="prixTTC">Prix T.T.C (€)</label>
        <input type="number" id="prixTTC" name="prixTTC" step="0.01" className={styles.input} onChange={handleChange} value={formData.prixTTC} required />
      </div>

      <button type="submit" className={styles.submitButton}>Générer la Preuve d'Achat</button>
    </form>
  );
}

export default FormFacture;