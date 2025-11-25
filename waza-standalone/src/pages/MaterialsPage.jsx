import React, { useState } from 'react';
import useMaterialsStore from '../stores/materialsStore';
import useI18nStore from '../stores/i18nStore'; // Import the i18n store
import MaterialList from '../components/MaterialList';
import MaterialForm from '../components/MaterialForm';
import Card from '../components/Card';
import Button from '../components/Button';

const MaterialsPage = () => {
  const { materials, addMaterial, updateMaterial, deleteMaterial } = useMaterialsStore();
  const { t } = useI18nStore(); // Use i18n store
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);

  const handleAddClick = () => {
    setEditingMaterial(null);
    setIsFormVisible(true);
  };

  const handleEditClick = (material) => {
    setEditingMaterial(material);
    setIsFormVisible(true);
  };

  const handleSubmit = (materialData) => {
    if (editingMaterial) {
      updateMaterial(editingMaterial.id, materialData);
    } else {
      addMaterial(materialData);
    }
    setIsFormVisible(false);
    setEditingMaterial(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{t('manageMaterials')}</h2>
        <Button onClick={handleAddClick} className="primary" variant="primary">
          {t('addNewMaterial')}
        </Button>
      </div>

      {isFormVisible && (
        <Card className="mb-8">
          <h3 className="text-xl font-bold mb-4">{editingMaterial ? t('edit') : t('addMaterial')}</h3>
          <MaterialForm 
            onSubmit={handleSubmit}
            initialData={editingMaterial || {}}
          />
           <Button onClick={() => setIsFormVisible(false)} variant="secondary" className="mt-4">
            {t('cancel')}
          </Button>
        </Card>
      )}

      <Card>
        <MaterialList 
          materials={materials} 
          onEdit={handleEditClick}
          onDelete={deleteMaterial}
        />
      </Card>
    </div>
  );
};

export default MaterialsPage;