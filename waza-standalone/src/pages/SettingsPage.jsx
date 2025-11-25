import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import useSettingsStore from '../stores/settingsStore';
import useI18nStore from '../stores/i18nStore'; // Import the i18n store

const SettingsPage = () => {
  const { hourlyRate, setHourlyRate } = useSettingsStore();
  const { language, setLanguage, t } = useI18nStore(); // Use i18n store
  const [rate, setRate] = useState(hourlyRate);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // If the value in the store changes (e.g. from another tab), update the local state
    setRate(hourlyRate);
  }, [hourlyRate]);

  const handleSave = () => {
    setHourlyRate(rate);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000); // Hide message after 2 seconds
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t('settings')}</h2>
      <Card>
        <div className="max-w-md">
          <div className="space-y-4">
            <Input 
              label={t('yourHourlyRate')}
              id="hourly-rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g., 20"
            />
            <div className="flex items-center space-x-4">
              <Button onClick={handleSave}>
                {t('save')}
              </Button>
              {saved && <span className="text-green-600">{t('saved')}</span>}
            </div>

            <hr className="my-6" /> {/* Separator */}

            <div>
              <label htmlFor="language-select" className="block text-sm font-medium mb-1">
                {t('language')}
              </label>
              <select
                id="language-select" 
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="fr">Français</option>
                <option value="ja">日本語</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;