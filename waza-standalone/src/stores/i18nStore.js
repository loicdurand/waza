import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define translations
const translations = {
  fr: {
    dashboard: 'Tableau de bord',
    materials: 'Matériaux',
    settings: 'Réglages',
    craftPrice: 'CraftPrice',
    yourHourlyRate: 'Votre Taux Horaire (€)',
    save: 'Enregistrer',
    saved: 'Enregistré !',
    manageMaterials: 'Gérer les Matériaux',
    addNewMaterial: 'Ajouter un nouveau matériau',
    materialName: 'Nom du Matériau',
    purchasePrice: 'Prix d\'achat (€)',
    quantityInLot: 'Quantité dans le lot',
    unit: 'Unité',
    updateMaterial: 'Mettre à jour le matériau',
    addMaterial: 'Ajouter le matériau',
    cancel: 'Annuler',
    noMaterialsYet: 'Aucun matériau pour l\'instant. Ajoutez-en un pour commencer !',
    edit: 'Modifier',
    delete: 'Supprimer',
    unitCost: 'Coût Unitaire',
    createEditModel: 'Créer/Modifier un Modèle',
    modelName: 'Nom du Modèle',
    creationTime: 'Temps de Création (en minutes)',
    composition: 'Composition',
    addMaterialToModel: 'Ajouter un Matériau au Modèle',
    selectAMaterial: 'Sélectionner un matériau...', 
    quantity: 'Quantité',
    remove: 'Retirer',
    updateModel: 'Mettre à jour le modèle',
    saveModel: 'Enregistrer le modèle',
    noModelsYet: 'Aucun modèle pour l\'instant',
    createModel: 'Créer un nouveau modèle',
    suggestedPrice: 'Prix Suggéré',
    showDetails: 'Afficher les Détails',
    hideDetails: 'Masquer les Détails',
    costBreakdown: 'Répartition des Coûts',
    time: 'Temps',
    laborCost: 'Coût Main d\'œuvre',
    totalMaterialCost: 'Coût Total des Matériaux',
    materials: 'Matériaux',
    item: 'Article',
    qty: 'Qté',
    total: 'Total',
    language: 'Langue',
    minutes: 'minutes' // Added translation for minutes
  },
  ja: {
    dashboard: 'ダッシュボード',
    materials: '材料',
    settings: '設定',
    craftPrice: 'クラフトプライス',
    yourHourlyRate: '時間単価 (ユーロ)',
    save: '保存',
    saved: '保存しました！',
    manageMaterials: '材料管理',
    addNewMaterial: '新しい材料を追加',
    materialName: '材料名',
    purchasePrice: '購入価格 (ユーロ)',
    quantityInLot: 'ロットの数量',
    unit: '単位',
    updateMaterial: '材料を更新',
    addMaterial: '材料を追加',
    cancel: 'キャンセル',
    noMaterialsYet: 'まだ材料がありません。追加してください！',
    edit: '編集',
    delete: '削除',
    unitCost: '単位費用',
    createEditModel: 'モデル作成/編集',
    modelName: 'モデル名',
    creationTime: '作成時間 (分)',
    composition: '構成',
    addMaterialToModel: '材料をモデルに追加',
    selectAMaterial: '材料を選択...',
    quantity: '数量',
    remove: '削除',
    updateModel: 'モデルを更新',
    saveModel: 'モデルを保存',
    noModelsYet: 'まだモデルがありません',
    createModel: '新しいモデルを作成',
    suggestedPrice: '推奨価格',
    showDetails: '詳細を表示',
    hideDetails: '詳細を隠す',
    costBreakdown: '費用内訳',
    time: '時間',
    laborCost: '人件費',
    totalMaterialCost: '総材料費',
    materials: '材料',
    item: '項目',
    qty: '数量',
    total: '合計',
    language: '言語',
    minutes: '分' // Added translation for minutes
  },
};

const useI18nStore = create(
  persist(
    (set, get) => ({
      language: 'fr', // Default language
      translations: translations, // All translations

      setLanguage: (lang) => {
        if (translations[lang]) {
          set({ language: lang });
        } else {
          console.warn(`Language ${lang} not supported.`);
        }
      },
      // Function to get translated text
      t: (key) => {
        const state = get();
        return state.translations[state.language][key] || key; // Fallback to key if not found
      },
    }),
    {
      name: 'craftprice-i18n-storage', // name of the item in the storage
      whitelist: ['language'], // Only persist the 'language' setting
    }
  )
);

export default useI18nStore;