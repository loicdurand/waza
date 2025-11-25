/**
 * Calculates the total cost and suggested price for a given product model, including detailed breakdown.
 * 
 * @param {object} model The product model to price.
 * @param {Array} materials The complete list of available materials.
 * @param {number} hourlyRate The user's hourly labor rate.
 * @returns {{
 *   detailedMaterialsCost: Array<{materialName: string, unitCost: number, quantityUsed: number, totalCost: number}>,
 *   totalMaterialCost: number,
 *   laborCostPerMinute: number,
 *   totalLaborCost: number,
 *   suggestedSellingPrice: number
 * }}
 */
export const calculatePrice = (model, materials, hourlyRate) => {
  if (!model || !materials || hourlyRate === null || hourlyRate === undefined) {
    return {
      detailedMaterialsCost: [],
      totalMaterialCost: 0,
      laborCostPerMinute: 0,
      totalLaborCost: 0,
      suggestedSellingPrice: 0,
    };
  }

  const detailedMaterialsCost = model.composition.map((compEntry) => {
    const material = materials.find((m) => m.id === compEntry.materialId);
    if (!material) {
      return {
        materialName: 'Unknown Material',
        unitCost: 0,
        quantityUsed: compEntry.quantityUsed,
        totalCost: 0,
      };
    }
    const unitCost = material.purchasePrice / material.purchaseQuantity;
    const totalCost = unitCost * compEntry.quantityUsed;
    return {
      materialName: material.name,
      unitCost: parseFloat(unitCost.toFixed(2)),
      quantityUsed: compEntry.quantityUsed,
      totalCost: parseFloat(totalCost.toFixed(2)),
    };
  });

  const totalMaterialCost = detailedMaterialsCost.reduce((sum, item) => sum + item.totalCost, 0);

  const laborCostPerMinute = hourlyRate / 60;
  const totalLaborCost = laborCostPerMinute * model.creationTimeInMinutes;

  // Formula: (Total Material Cost * 3) + Total Labor Cost
  const suggestedSellingPrice = (totalMaterialCost * 3) + totalLaborCost;

  return {
    detailedMaterialsCost,
    totalMaterialCost: parseFloat(totalMaterialCost.toFixed(2)),
    laborCostPerMinute: parseFloat(laborCostPerMinute.toFixed(2)),
    totalLaborCost: parseFloat(totalLaborCost.toFixed(2)),
    suggestedSellingPrice: parseFloat(suggestedSellingPrice.toFixed(2)),
  };
};