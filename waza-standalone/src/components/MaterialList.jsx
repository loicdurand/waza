import React from 'react';
import useI18nStore from '../stores/i18nStore'; // Import the i18n store
import MaterialListItem from './MaterialListItem';

const MaterialList = ({ materials, onEdit, onDelete }) => {
  const { t } = useI18nStore(); // Use i18n store

  if (materials.length === 0) {
    return <p className="text-gray-500">{t('noMaterialsYet')}</p>;
  }

  return (
    <div className="space-y-2">
      {materials.map(material => (
        <MaterialListItem 
          key={material.id} 
          material={material}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default MaterialList;