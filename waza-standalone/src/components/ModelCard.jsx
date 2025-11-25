import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import Button from './Button';
import useModelsStore from '../stores/modelsStore';
import useI18nStore from '../stores/i18nStore'; // Import the i18n store

const ModelCard = ({ model, priceDetails }) => {
    const { deleteModel } = useModelsStore();
    const { t } = useI18nStore(); // Use i18n store
    const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="flex flex-col h-full">
      <div className="flex-grow">
        <h3 className="text-xl font-bold">{model.name}</h3>
        <p className="text-2xl font-light mt-2 text-indigo-600">
            {`€${priceDetails.suggestedSellingPrice.toFixed(2)}`}
        </p>
        <p className="text-sm text-gray-300">{t('suggestedPrice')}</p>
        
        <Button 
          onClick={() => setShowDetails(!showDetails)} 
          variant="secondary" 
          className="mt-4 w-full"
        >
          {showDetails ? t('hideDetails') : t('showDetails')}
        </Button>

        {showDetails && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <h4 className="font-semibold text-gray-800">{t('costBreakdown')}:</h4>
            
            <div className="text-sm mt-2">
                <p><strong>{t('time')}:</strong> {model.creationTimeInMinutes} {t('minutes')}</p> {/* Added minutes key */}
                <p><strong>{t('laborCost')}:</strong> €{priceDetails.totalLaborCost.toFixed(2)}</p>
                <p><strong>{t('totalMaterialCost')}:</strong> €{priceDetails.totalMaterialCost.toFixed(2)}</p>
            </div>

            {priceDetails.detailedMaterialsCost.length > 0 && (
                <div className="mt-4">
                    <h5 className="text-md font-medium text-gray-700">{t('materials')}:</h5>
                    <table className="w-full text-sm text-left text-gray-500 mt-1">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-2 py-1">{t('item')}</th>
                                <th scope="col" className="px-2 py-1">{t('qty')}</th>
                                <th scope="col" className="px-2 py-1">{t('unitCost')}</th>
                                <th scope="col" className="px-2 py-1 text-right">{t('total')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {priceDetails.detailedMaterialsCost.map((item, index) => (
                                <tr key={index} className="bg-white border-b">
                                    <td className="px-2 py-1">{item.materialName}</td>
                                    <td className="px-2 py-1">{item.quantityUsed}</td>
                                    <td className="px-2 py-1">€{item.unitCost.toFixed(2)}</td>
                                    <td className="px-2 py-1 text-right">€{item.totalCost.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
          </div>
        )}
      </div>

      <div className="flex space-x-2 mt-6">
          <Link to={`/models/edit/${model.id}`} className="w-full">
              <Button variant="secondary" className="w-full">{t('edit')}</Button>
          </Link>
          <Button onClick={() => deleteModel(model.id)} variant="danger" className="w-full">
              {t('delete')}
          </Button>
      </div>
    </Card>
  );
};

export default ModelCard;
