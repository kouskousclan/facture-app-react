// Fichier : src/components/WashmePreview/WashmePreview.jsx

import styles from './WashmePreview.module.css';
import html2pdf from 'html2pdf.js'; // On importe la bibliothèque

function WashmePreview({ formData, onReset }) {
  const prixTTC = parseFloat(formData.prixTTC || 0);
  const prixHT = prixTTC / 1.2;
  const tva = prixTTC - prixHT;

  // Fonction pour gérer l'export PDF
  const handleExportPDF = () => {
    const element = document.getElementById('facture-washme');
    const nomFichier = `WashME_${formData.nomClient.replace(/ /g, '_')}_${formData.dateTransaction}.pdf`;
    
    const opt = {
      margin: 0.5,
      filename: nomFichier,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div>
      {/* Les boutons d'action */}
      <div style={{ maxWidth: '800px', margin: '2rem auto 1rem auto', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <button onClick={onReset} style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '6px' }}>
            Modifier
        </button>
        <button onClick={handleExportPDF} style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '6px' }}>
            Exporter en PDF
        </button>
      </div>

      <div id="facture-washme" className={styles.previewContainer}>
        <header className={styles.header}><h2>Preuve d'Achat - WashME</h2></header>
        <section className={styles.details}>
          <p><strong>Client :</strong> {formData.nomClient}</p>
          <p><strong>Date de transaction :</strong> {new Date(formData.dateTransaction).toLocaleDateString('fr-FR')}</p>
        </section>
        <section className={styles.appareilsSection}>
          <h3>Appareils utilisés :</h3>
          {["Lave-linge 20Kg", "Lave-linge 12Kg", "Lave-linge 9 Kg", "Sèche-linge", "Portique de lavage", "Dog Wash"].map(service => (
            <div key={service} className={styles.appareilItem}>
              <span>{service}</span>
              <div className={styles.checkbox}>{formData.appareils.includes(service) ? 'X' : ''}</div>
            </div>
          ))}
        </section>
        <section className={styles.prixSection}>
          <table className={styles.prixTable}>
            <tbody>
              <tr><td className={styles.label}>Prix H.T. :</td><td className={styles.value}>{prixHT.toFixed(2)} €</td></tr>
              <tr><td className={styles.label}>T.V.A. (20%) :</td><td className={styles.value}>{tva.toFixed(2)} €</td></tr>
              <tr className={styles.totalRow}><td className={styles.label}>Total T.T.C. :</td><td className={styles.value}>{prixTTC.toFixed(2)} €</td></tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default WashmePreview;