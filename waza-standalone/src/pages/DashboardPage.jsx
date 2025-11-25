import React from 'react';
import { Link } from 'react-router-dom';
import useModelsStore from '../stores/modelsStore';
import useMaterialsStore from '../stores/materialsStore';
import useSettingsStore from '../stores/settingsStore';
import useI18nStore from '../stores/i18nStore'; // Import the i18n store
import { calculatePrice } from '../services/calculationService';
import ModelCard from '../components/ModelCard';
import Button from '../components/Button';

const DashboardPage = () => {
  const models = useModelsStore((state) => state.models);
  const materials = useMaterialsStore((state) => state.materials);
  const hourlyRate = useSettingsStore((state) => state.hourlyRate);
  const { t } = useI18nStore(); // Use i18n store

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{t('dashboard')}</h2>
        <Link to="/models/new">
          <Button className="primary" variant="primary">{t('createModel')}</Button>
        </Link>
      </div>

      {models.length === 0 ? (
        <div className="text-center py-12 glass rounded-2xl">
            <h3 className="text-xl font-semibold">{t('noModelsYet')}</h3>
            <p className="text-gray-300 mt-2">{t('createModel')}</p> {/* Reusing createModel key */}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map(model => {
            const priceDetails = calculatePrice(model, materials, hourlyRate);
            return <ModelCard key={model.id} model={model} priceDetails={priceDetails} />;
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
