// Fichier: src/components/WashmePreview/WashmePreview.jsx

import styles from './WashmePreview.module.css';
import html2pdf from 'html2pdf.js';

// --- Icônes partagées ---
const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
);
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}><path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.028-3.493-6.817-2.08 1.026c-8.488 4.199 2.164 24.609 10.64 20.542l3.044-1.503z"/></svg>
);

const WASHME_SERVICES = ["Lave-linge 20Kg", "Lave-linge 12Kg", "Lave-linge 9 Kg", "Sèche-linge", "Portique de lavage", "Dog Wash"];

// Le composant accepte maintenant les props pour les logos
function WashmePreview({ formData, onReset, headerLogo, footerLogo }) {
  const prixTTC = parseFloat(formData.prixTTC || 0);
  const prixHT = prixTTC / 1.2;
  const tva = prixTTC - prixHT;
  const today = new Date().toLocaleDateString('fr-FR');

  const handleExportPDF = () => {
    const element = document.getElementById('facture-washme');
    const nomFichier = `WashME_${formData.nomClient.replace(/ /g, '_')}_${formData.dateTransaction}.pdf`;
    
    // Options PDF améliorées pour une meilleure qualité
    const opt = {
      margin:       0,
      filename:     nomFichier,
      image:        { type: 'jpeg', quality: 1.0 }, // Qualité maximale
      html2canvas:  { 
        scale: 4, // Échelle augmentée pour une meilleure résolution
        dpi: 300, // Haute résolution
        letterRendering: true,
        useCORS: true // Nécessaire si les images viennent d'un autre domaine
      },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    // La méthode de calcul de la taille est remplacée par un format standard (A4) 
    // pour une meilleure compatibilité, en combinaison avec l'échelle.
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div>
      <div style={{ maxWidth: '850px', margin: '2rem auto 1rem auto', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <button onClick={onReset} style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '6px' }}>Modifier</button>
        <button onClick={handleExportPDF} style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '6px' }}>Exporter en PDF</button>
      </div>

      <div id="facture-washme" className={styles.previewContainer}>
        <header className={styles.header}>
          {/* Logo dynamique via les props */}
          <img src={headerLogo} alt="WashME Logo" className={styles.logoHeader} />
        </header>

        <section className={styles.contactSection}>
           <div className={styles.contactBlock}>
            <LocationIcon />
            <div className={styles.contactText}>
              <strong>ME Group France</strong>
              <span>8 rue Auber</span>
              <span>75009 PARIS</span>
            </div>
          </div>
          <div className={styles.contactBlock}>
            <PhoneIcon />
            <div className={styles.contactText}>
              <strong>Service Client Wash.ME</strong>
              <span>09.70.82.32.47</span>
            </div>
          </div>
        </section>

        <section className={styles.customerSection}>
          <div className={styles.customerName}>Nom du client : {formData.nomClient}</div>
          <div className={styles.locationDate}>Fait à Paris le : {today}</div>
        </section>

        <div className={styles.titleBar}>
          <h2>Preuve d'achat</h2>
        </div>
        
        <main className={styles.body}>
          <section className={styles.transactionDetails}>
            <p><strong>Date de la transaction :</strong> {new Date(formData.dateTransaction).toLocaleDateString('fr-FR')}</p>
            <p><strong>Mode de paiement :</strong> {formData.paiement}</p>
          </section>

          <section className={styles.devicesSection}>
            <div className={styles.sectionTitle}><h3>Appareil utilisé</h3></div>
            <div className={styles.devicesGrid}>
              {WASHME_SERVICES.map(service => (
                <div key={service} className={styles.deviceItem}>
                  <span>{service}</span>
                  <div className={styles.checkbox}>{formData.appareils.includes(service) ? 'X' : ''}</div>
                </div>
              ))}
            </div>
          </section>
          
          <section className={styles.pricingSection}>
             <div className={styles.sectionTitle}></div>
            <table className={styles.priceTable}>
              <tbody>
                <tr><td className={styles.label}>PRIX H.T. :</td><td className={styles.value}>{prixHT.toFixed(2)} €</td></tr>
                <tr><td className={styles.label}>T.V.A. (20%) :</td><td className={styles.value}>{tva.toFixed(2)} €</td></tr>
                <tr className={styles.totalRow}><td className={styles.label}>TOTAL T.T.C. :</td><td className={styles.value}>{prixTTC.toFixed(2)} €</td></tr>
              </tbody>
            </table>
          </section>
        </main>
        
        <footer className={styles.footer}>
          {/* Logo dynamique via les props */}
          <img src={footerLogo} alt="ME Group Logo" />
        </footer>
      </div>
    </div>
  );
}

export default WashmePreview;
  