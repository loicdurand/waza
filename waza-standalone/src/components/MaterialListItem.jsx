import React from 'react';
import Button from './Button';
import useI18nStore from '../stores/i18nStore'; // Import the i18n store

const MaterialListItem = ({ material, onEdit, onDelete }) => {
  const { t } = useI18nStore(); // Use i18n store
  const unitCost = (material.purchasePrice / material.purchaseQuantity).toFixed(2);

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <div>
        <p className="font-semibold">{material.name}</p>
        <p className="text-sm text-gray-300">
          {`€${unitCost} / ${material.unit}`}
        </p>
      </div>
      <div className="space-x-2">
        <Button onClick={() => onEdit(material)} variant="secondary">
          {t('edit')}
        </Button>
        <Button onClick={() => onDelete(material.id)} variant="danger">
          {t('delete')}
        </Button>
      </div>
    </div>
  );
};

export default MaterialListItem;