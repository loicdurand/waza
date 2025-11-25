import React, { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import useI18nStore from '../stores/i18nStore'; // Import the i18n store

const MaterialForm = ({ onSubmit, initialData = {} }) => {
  const { t } = useI18nStore(); // Use i18n store
  const [name, setName] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [purchaseQuantity, setPurchaseQuantity] = useState('');
  const [unit, setUnit] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setPurchasePrice(initialData.purchasePrice || '');
      setPurchaseQuantity(initialData.purchaseQuantity || '');
      setUnit(initialData.unit || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      purchasePrice: parseFloat(purchasePrice),
      purchaseQuantity: parseInt(purchaseQuantity, 10),
      unit,
    });
    // Clear form if it's not for editing
    if (!initialData.id) {
        setName('');
        setPurchasePrice('');
        setPurchaseQuantity('');
        setUnit('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label={t('materialName')}
        id="material-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g., Sterling Silver Clasps"
        required
      />
      <Input
        label={t('purchasePrice')}
        id="purchase-price"
        type="number"
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}
        placeholder="e.g., 25"
        required
      />
      <Input
        label={t('quantityInLot')}
        id="purchase-quantity"
        type="number"
        value={purchaseQuantity}
        onChange={(e) => setPurchaseQuantity(e.target.value)}
        placeholder="e.g., 50"
        required
      />
      <Input
        label={t('unit')}
        id="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        placeholder="e.g., pieces, ml, sheets"
        required
      />
      <Button type="submit">
        {initialData.id ? t('updateMaterial') : t('addMaterial')}
      </Button>
    </form>
  );
};

export default MaterialForm;