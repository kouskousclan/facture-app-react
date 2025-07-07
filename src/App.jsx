// src/App.jsx

import { useState } from 'react';
import FormFacture from './components/FormFacture/FormFacture';
import FacturePreview from './components/FacturePreview/FacturePreview';

function App() {
  const [factureData, setFactureData] = useState(null);

  const handleFormSubmit = (data) => {
    setFactureData(data);
  };

  // NOUVELLE FONCTION : pour retourner au formulaire
  const handleReset = () => {
    setFactureData(null); // On remet les données à 'null', ce qui réaffiche le formulaire
  };

  return (
    <main>
      {!factureData ? (
        <FormFacture onFormSubmit={handleFormSubmit} />
      ) : (
        // On passe la nouvelle fonction 'handleReset' au composant d'aperçu
        <FacturePreview formData={factureData} onReset={handleReset} />
      )}
    </main>
  );
}

export default App;