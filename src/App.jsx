// src/App.jsx

import { useState } from 'react';
import FormFacture from './components/FormFacture/FormFacture';
import WashmePreview from './components/WashmePreview/WashmePreview';
// On importe notre nouveau composant
import PhotomatonPreview from './components/PhotomatonPreview/PhotomatonPreview';

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

    if (factureData.brand === 'WashME') {
      return <WashmePreview formData={factureData} onReset={handleReset} />;
    }

    if (factureData.brand === 'Photomaton') {
      // On affiche le bon composant ici
      return <PhotomatonPreview formData={factureData} onReset={handleReset} />;
    }
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