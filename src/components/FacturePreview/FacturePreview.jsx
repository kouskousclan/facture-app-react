// Fichier : src/components/FacturePreview/FacturePreview.jsx

import styles from './FacturePreview.module.css';
// On importe la bibliothèque PDF
import html2pdf from 'html2pdf.js';

// On reçoit maintenant 'formData' ET 'onReset'
function FacturePreview({ formData, onReset }) {
  const prixTTC = parseFloat(formData.prixTTC || 0);
  const prixHT = prixTTC / 1.2;
  const tva = prixTTC - prixHT;

  // NOUVELLE FONCTION : pour gérer l'export
  const handleExportPDF = () => {
    const element = document.getElementById('facture-a-exporter');
    const nomFichier = `Preuve_achat_${formData.nomClient.replace(/ /g, '_')}_${formData.dateTransaction}.pdf`;
    
    const opt = {
      margin:       0.5,
      filename:     nomFichier,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div>
        {/* Barre de boutons en haut de la page */}
        <div style={{ maxWidth: '750px', margin: '2rem auto 1rem auto', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button onClick={onReset} style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '6px' }}>
                Modifier
            </button>
            <button onClick={handleExportPDF} style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '6px' }}>
                Exporter en PDF
            </button>
        </div>

        {/* La facture (le code visuel ne change pas) */}
        <div id="facture-a-exporter" className={styles.previewContainer}>
            {/* ... tout le contenu visuel de la facture reste ici ... */}
            <header className={styles.header}>
              <div className={styles.headerInfo}>
                <img src="/me-group-logo.png" alt="ME Group Logo" style={{ width: '120px', marginBottom: '1rem' }} />
                <h2>ME Group France</h2>
                <p>8 rue Auber</p>
                <p>75009 PARIS</p>
              </div>
              <div className={styles.headerContact}>
                <p>Service Client Photomaton : +33970823246</p>
                <p>Service client WashMe : +33970823247</p>
              </div>
            </header>
            <div className={styles.clientInfo}>
              <span>{formData.nomClient}</span>
              <span>Paris, le {new Date().toLocaleDateString('fr-FR')}</span>
            </div>
            <div className={styles.titleBar}>Preuve d'achat</div>
            <main className={styles.body}>
              <div className={styles.detailsGrid}>
                <strong>Date de la transaction :</strong>
                <span>{new Date(formData.dateTransaction).toLocaleDateString('fr-FR')}</span>
                <strong>Mode de paiement :</strong>
                <span>{formData.paiement}</span>
                <strong>Appareil utilisé :</strong>
                <ul className={styles.appareilsList}>
                  {formData.appareils.map(appareil => <li key={appareil}>{appareil}</li>)}
                </ul>
              </div>
              <div className={styles.prixSection}>
                <table className={styles.prixTable}>
                  <tbody>
                    <tr><td className={styles.label}>PRIX T.T.C:</td><td className={styles.value}>{prixTTC.toFixed(2)} €</td></tr>
                    <tr><td className={styles.label}>PRIX H.T. :</td><td className={styles.value}>{prixHT.toFixed(2)} €</td></tr>
                    <tr><td className={styles.label}>T.V.A. 20% :</td><td className={styles.value}>{tva.toFixed(2)} €</td></tr>
                  </tbody>
                </table>
              </div>
            </main>
            <footer className={styles.footer}>
              <img src="/photomaton-logo.png" alt="Photomaton Logo" />
              <img src="/washme-logo.png" alt="WashMe Logo" />
            </footer>
        </div>
    </div>
  );
}

export default FacturePreview;