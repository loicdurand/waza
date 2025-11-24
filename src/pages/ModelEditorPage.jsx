import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useModelsStore from '../stores/modelsStore';
import useI18nStore from '../stores/i18nStore'; // Import the i18n store
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import CompositionEditor from '../components/CompositionEditor';

const ModelEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { models, addModel, updateModel } = useModelsStore();
  const { t } = useI18nStore(); // Use i18n store

  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [composition, setComposition] = useState([]);
  
  const isEditing = id !== undefined;

  useEffect(() => {
    if (isEditing) {
      const modelToEdit = models.find(m => m.id === id);
      if (modelToEdit) {
        setName(modelToEdit.name);
        setTime(modelToEdit.creationTimeInMinutes);
        setComposition(modelToEdit.composition);
      }
    }
  }, [id, models, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const modelData = {
      name,
      creationTimeInMinutes: parseInt(time, 10),
      composition,
    };

    if (isEditing) {
      updateModel(id, modelData);
    } else {
      addModel(modelData);
    }

    navigate('/'); // Redirect to dashboard after save
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{isEditing ? t('createEditModel') : t('createEditModel')}</h2> {/* Using same key for both */}
      <form onSubmit={handleSubmit}>
        <Card>
          <div className="space-y-6">
            <Input
              label={t('modelName')}
              id="model-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Origami Crane Earrings"
              required
            />
            <Input
              label={t('creationTime')}
              id="creation-time"
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g., 45"
              required
            />
            
            <CompositionEditor 
              composition={composition}
              setComposition={setComposition}
            />

            <div className="flex space-x-4">
                <Button type="submit" variant="primary">
                {isEditing ? t('updateModel') : t('saveModel')}
                </Button>
                <Button onClick={() => navigate('/')} variant="secondary">
                    {t('cancel')}
                </Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default ModelEditorPage;
