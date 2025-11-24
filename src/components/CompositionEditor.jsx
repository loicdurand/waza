import React from 'react';
import useMaterialsStore from '../stores/materialsStore';
import useI18nStore from '../stores/i18nStore'; // Import the i18n store
import Button from './Button';

const CompositionEditor = ({ composition, setComposition }) => {
  const allMaterials = useMaterialsStore((state) => state.materials);
  const { t } = useI18nStore(); // Use i18n store
  const [selectedMaterial, setSelectedMaterial] = React.useState('');
  const [quantity, setQuantity] = React.useState(1);

  const handleAddMaterial = () => {
    if (!selectedMaterial) return;

    const materialToAdd = allMaterials.find(m => m.id === selectedMaterial);
    if (!materialToAdd) return;

    // Check if material is already in composition
    const existingEntry = composition.find(c => c.materialId === selectedMaterial);

    if (existingEntry) {
      // Update quantity if material already exists
      const updatedComposition = composition.map(c =>
        c.materialId === selectedMaterial ? { ...c, quantityUsed: c.quantityUsed + parseInt(quantity, 10) } : c
      );
      setComposition(updatedComposition);
    } else {
      // Add new material to composition
      const newCompositionEntry = {
        materialId: selectedMaterial,
        quantityUsed: parseInt(quantity, 10),
      };
      setComposition([...composition, newCompositionEntry]);
    }
  };
  
  const handleRemoveMaterial = (materialId) => {
    const updatedComposition = composition.filter(c => c.materialId !== materialId);
    setComposition(updatedComposition);
  };
  
  const getMaterialName = (id) => {
      return allMaterials.find(m => m.id === id)?.name || t('unknownMaterial'); // Translate unknown material
  }

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">{t('composition')}</h4>
      <div className="space-y-2">
        {composition.map(comp => (
            <div key={comp.materialId} className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                <span>{getMaterialName(comp.materialId)} x {comp.quantityUsed}</span>
                <Button onClick={() => handleRemoveMaterial(comp.materialId)} variant="danger" className="px-2 py-1 text-xs">{t('remove')}</Button>
            </div>
        ))}
      </div>

      <div className="flex items-end space-x-2 pt-4 border-t">
        <div className="flex-grow">
          <label htmlFor="material-select" className="block text-sm font-medium text-gray-700">{t('addMaterialToModel')}</label>
          <select
            id="material-select"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
          >
            <option value="">{t('selectAMaterial')}</option>
            {allMaterials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="material-quantity" className="block text-sm font-medium text-gray-700">{t('quantity')}</label>
          <input
            type="number"
            id="material-quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            className="mt-1 block w-24 pl-3 pr-1 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>
        <Button onClick={handleAddMaterial}>{t('add')}</Button>
      </div>
    </div>
  );
};

export default CompositionEditor;