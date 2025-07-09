// src/App.jsx

import { useState } from 'react';
import FormFacture from './components/FormFacture/FormFacture';
import WashmePreview from './components/WashmePreview/WashmePreview';
import PhotomatonPreview from './components/PhotomatonPreview/PhotomatonPreview';

// Importation des logos pour les passer en props
import washmeLogo from './assets/logos/1111.png';
import photomatonLogo from './assets/logos/LOGO_PHOTOMATON_MEGROUP_CMJN.png';
import meGroupLogo from './assets/logos/LOGO_LIGNE-ME_GROUP-02.png';


function App() {
  const [factureData, setFactureData] = useState(null);

  const handleFormSubmit = (data) => {
    setFactureData(data);
  };

  const handleReset = () => {
    setFactureData(null);
  };

  const renderPreview = () => {
    if (!factureData) return null;

    // Définition des props communes
    const commonProps = {
      formData: factureData,
      onReset: handleReset,
      footerLogo: meGroupLogo, // Le logo du footer est commun
    };

    if (factureData.brand === 'WashME') {
      return <WashmePreview {...commonProps} headerLogo={washmeLogo} />;
    }

    if (factureData.brand === 'Photomaton') {
      return <PhotomatonPreview {...commonProps} headerLogo={photomatonLogo} />;
    }
    
    return null;
  };

  return (
    <main>
      {!factureData ? (
        <FormFacture onFormSubmit={handleFormSubmit} />
      ) : (
        renderPreview()
      )}
    </main>
  );
}

export default App;
