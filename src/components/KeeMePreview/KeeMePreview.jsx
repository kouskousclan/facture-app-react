// Fichier: src/components/KeeMePreview/KeeMePreview.jsx

import styles from './KeeMePreview.module.css';
import html2pdf from 'html2pdf.js';
import { getBrandLocale, getLegalAddress } from '../../constants/brandConfig';
import { formatCurrency, formatDate } from '../../utils/formatters';

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}><path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.028-3.493-6.817-2.08 1.026c-8.488 4.199 2.164 24.609 10.64 20.542l3.044-1.503z"/></svg>
);

function KeeMePreview({ formData, onReset, headerLogo, footerLogo }) {
  const brandLocale = getBrandLocale('KeeMe', formData.country) ?? { services: [], phone: {}, colors: {} };
  const legalAddress = getLegalAddress(formData.country);
  const headerBg = brandLocale.colors?.headerBg || '#FCEBFA';
  const bandColor = brandLocale.colors?.band || '#95478D';
  const prixTTC = Number.parseFloat(formData.prixTTC || '0') || 0;
  const prixHT = prixTTC / 1.2;
  const tva = prixTTC - prixHT;
  const today = formatDate(new Date());
  const customerName = formData.displayName || formData.nomClient || formData.raisonSociale || '-';
  const showAddress = formData.addAddress && formData.addressLine1;
  const brandName = 'Kee.ME';

  const handleExportPDF = () => {
    const element = document.getElementById('facture-keeme');
    const nomFichier = `KeeMe_${(customerName || 'client').replace(/ /g, '_')}_${formData.dateTransaction}.pdf`;

    const opt = {
      margin: 0,
      filename: nomFichier,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: {
        scale: 4,
        dpi: 300,
        letterRendering: true,
        useCORS: true,
      },
      pagebreak: { mode: ['avoid-all'] },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div>
      <div className={styles.actions}>
        <button className={`${styles.button} ${styles.secondary}`} onClick={onReset}>Modifier</button>
        <button className={`${styles.button} ${styles.primary}`} onClick={handleExportPDF}>Exporter en PDF</button>
      </div>

      <div
        id="facture-keeme"
        className={styles.previewContainer}
        style={{ '--header-bg': headerBg, '--band-color': bandColor }}
      >
        <header className={styles.header}>
          <img src={headerLogo} alt="KeeMe Logo" className={styles.logoHeader} />
        </header>

        <section className={styles.contactSection}>
          <div className={styles.contactBlock}>
            <LocationIcon />
            <div className={styles.contactText}>
              <strong>{legalAddress.name}</strong>
              {legalAddress.lines.map(line => (
                <span key={line}>{line}</span>
              ))}
            </div>
          </div>
          <div className={`${styles.contactBlock} ${styles.contactRight}`}>
            <PhoneIcon />
            <div className={styles.contactText}>
              <strong>{brandLocale.phone?.label}</strong>
              <span>{brandLocale.phone?.number}</span>
            </div>
          </div>
        </section>

        <section className={styles.customerSection}>
          <div className={styles.customerBlock}>
            <div className={styles.customerName}>Client : {customerName}</div>
            {showAddress && (
              <div className={styles.customerAddress}>
                <span>{formData.addressLine1}</span>
              </div>
            )}
            {formData.addSiret && formData.siret && (
              <div className={styles.customerMeta}>SIRET : {formData.siret}</div>
            )}
          </div>
          <div className={styles.locationDate}>Fait à Paris le : {today}</div>
        </section>

        <div className={styles.titleBar}>
          <h2>Preuve d'achat</h2>
        </div>

        <main className={styles.body}>
          <section className={styles.transactionDetails}>
            <p><strong>Date de la transaction :</strong> {formatDate(formData.dateTransaction)}</p>
            <p><strong>Mode de paiement :</strong> {formData.paiement}</p>
          </section>

          <section className={styles.devicesSection}>
            <div className={styles.sectionTitle}>
              <h3>Produit</h3>
            </div>
            <div className={styles.devicesGrid}>
              {brandLocale.services.map(service => (
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
                <tr><td className={styles.label}>PRIX H.T. :</td><td className={styles.value}>{formatCurrency(prixHT)}</td></tr>
                <tr><td className={styles.label}>T.V.A. (20%) :</td><td className={styles.value}>{formatCurrency(tva)}</td></tr>
                <tr className={styles.totalRow}><td className={styles.label}>TOTAL T.T.C. :</td><td className={styles.value}>{formatCurrency(prixTTC)}</td></tr>
              </tbody>
            </table>
          </section>
        </main>

        <footer className={styles.footer}>
          <span className={styles.footerLeft}>© {brandName} Tous droits réservés.</span>
          <img src={footerLogo} alt="ME Group Logo" className={styles.footerLogo} />
          <span className={styles.footerRight}>{brandName} est une marque de ME GROUP</span>
        </footer>
      </div>
    </div>
  );
}

export default KeeMePreview;
