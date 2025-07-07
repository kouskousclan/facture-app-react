// Fichier : src/components/FormFacture/FormFacture.jsx

import { useState } from 'react';
// On importe notre fichier CSS. 'styles' devient un objet contenant nos classes.
import styles from './FormFacture.module.css';

// La liste des services que nous proposons
const SERVICES = [
  "Cabine photo d'identité",
  "Borne numérique",
  "Portique de lavage",
  "Copieur",
  "Lave et seche linge"
];

function FormFacture({ onFormSubmit }) {
  // 'useState' pour garder en mémoire les données du formulaire
  const [formData, setFormData] = useState({
    nomClient: '',
    dateTransaction: '',
    paiement: 'Carte bancaire',
    appareils: [],
    prixTTC: ''
  });

  // Fonction appelée à chaque changement dans un champ
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      // Si c'est une case à cocher, on gère la liste des appareils
      setFormData(prevData => ({
        ...prevData,
        appareils: checked
          ? [...prevData.appareils, value] // On ajoute l'appareil à la liste
          : prevData.appareils.filter(appareil => appareil !== value) // On retire l'appareil
      }));
    } else {
      // Pour les autres champs, on met juste à jour la valeur
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };
  
  // Fonction appelée quand on clique sur le bouton "Générer"
  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData); // On appelle la fonction de App.jsx
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Créer une Preuve d'Achat</h1>

      <div className={styles.formGroup}>
        <label htmlFor="nomClient">Nom du client</label>
        <input type="text" id="nomClient" name="nomClient" className={styles.input} onChange={handleChange} value={formData.nomClient} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="dateTransaction">Date de la transaction</label>
        <input type="date" id="dateTransaction" name="dateTransaction" className={styles.input} onChange={handleChange} value={formData.dateTransaction} required />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="paiement">Mode de paiement</label>
        <select id="paiement" name="paiement" className={styles.select} onChange={handleChange} value={formData.paiement}>
          <option>Carte bancaire</option>
          <option>Espèces</option>
        </select>
      </div>
      
      <div className={styles.formGroup}>
        <label>Appareils utilisés</label>
        {SERVICES.map(service => (
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