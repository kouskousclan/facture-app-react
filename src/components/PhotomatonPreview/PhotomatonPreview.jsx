// Fichier: src/components/PhotomatonPreview/PhotomatonPreview.jsx (Nouvelle Vision Design)

import styles from './PhotomatonPreview.module.css';
import html2pdf from 'html2pdf.js';

// --- Définitions des icônes (SVG) pour les garder dans un seul fichier ---
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}><path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.028-3.493-6.817-2.08 1.026c-8.488 4.199 2.164 24.609 10.64 20.542l3.044-1.503z"/></svg>
);

const PHOTOMATON_SERVICES = ["Cabine photo d'identité", "Borne numérique", "Photocopieur"];

function PhotomatonPreview({ formData, onReset }) {
  const prixTTC = parseFloat(formData.prixTTC || 0);
  const prixHT = prixTTC / 1.2;
  const tva = prixTTC - prixHT;
  const today = new Date().toLocaleDateString('fr-FR');

  const handleExportPDF = () => {
    const element = document.getElementById('facture-photomaton');
    const nomFichier = `Photomaton_${formData.nomClient.replace(/ /g, '_')}_${formData.dateTransaction}.pdf`;

    // 1. On mesure la largeur et la hauteur de l'élément en pixels
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;
    
    // 2. On convertit les pixels en pouces (l'unité utilisée par la bibliothèque)
    // On utilise un ratio standard et on ajoute une petite marge pour être sûr que rien ne soit coupé
    const pdfWidth = elementWidth / 96 + 0.2;
    const pdfHeight = elementHeight / 96 + 0.2;

    const opt = {
      margin: 0, // La marge du document PDF lui-même est à zéro
      filename: nomFichier,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      // 3. On utilise notre format de page personnalisé
      jsPDF: {
        unit: 'in',
        format: [pdfWidth, pdfHeight], // format: [largeur, hauteur]
        orientation: 'portrait'
      }
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div>
      <div style={{ maxWidth: '850px', margin: '2rem auto 1rem auto', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <button onClick={onReset} style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '6px' }}>Modifier</button>
        <button onClick={handleExportPDF} style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '6px' }}>Exporter en PDF</button>
      </div>

      <div id="facture-photomaton" className={styles.previewContainer}>
        {/* === Section 1 : En-tête === */}
        <header className={styles.header}>
          <img src="/LOGO_PHOTOMATON_MEGROUP_CMJN.png" alt="Photomaton Logo" className={styles.logoHeader} />
        </header>

        {/* === Section 2 : Informations de contact === */}
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
              <strong>Service Client Photomaton</strong>
              <span>09.70.82.32.46</span>
            </div>
          </div>
        </section>

        {/* === Section 3 : Détails client et lieu/date === */}
        <section className={styles.customerSection}>
          <div className={styles.customerName}>{formData.nomClient}</div>
          <div className={styles.locationDate}>Fait à Paris le : {today}</div>
        </section>

        {/* === Section 4 : Titre === */}
        <div className={styles.titleBar}>
          <h2>Preuve d'achat</h2>
        </div>
        
        <main className={styles.body}>
          {/* === Section 5 : Informations de transaction === */}
          <section className={styles.transactionDetails}>
            <p><strong>Date de la transaction :</strong> {new Date(formData.dateTransaction).toLocaleDateString('fr-FR')}</p>
            <p><strong>Mode de paiement :</strong> {formData.paiement}</p>
          </section>

          {/* === Section 6 : Appareil utilisé === */}
          <section className={styles.devicesSection}>
            <div className={styles.sectionTitle}>
              <h3>Appareil utilisé</h3>
            </div>
            <div className={styles.devicesGrid}>
              {PHOTOMATON_SERVICES.map(service => (
                <div key={service} className={styles.deviceItem}>
                  <span>{service}</span>
                  <div className={styles.checkbox}>{formData.appareils.includes(service) ? 'X' : ''}</div>
                </div>
              ))}
            </div>
          </section>
          
          {/* === Section 7 : Prix --- */}
          <section className={styles.pricingSection}>
             <div className={styles.sectionTitle}></div> {/* Ligne fine de séparation */}
            <table className={styles.priceTable}>
              <tbody>
                <tr><td className={styles.label}>PRIX H.T. :</td><td className={styles.value}>{prixHT.toFixed(2)} €</td></tr>
                <tr><td className={styles.label}>T.V.A. (20%) :</td><td className={styles.value}>{tva.toFixed(2)} €</td></tr>
                <tr className={styles.totalRow}><td className={styles.label}>TOTAL T.T.C. :</td><td className={styles.value}>{prixTTC.toFixed(2)} €</td></tr>
              </tbody>
            </table>
          </section>
        </main>
        
        {/* === Section 8 : Footer === */}
        <footer className={styles.footer}>
          <img src="/LOGO_LIGNE-ME_GROUP-02.png" alt="ME Group Logo" />
        </footer>
      </div>
    </div>
  );
}

export default PhotomatonPreview;