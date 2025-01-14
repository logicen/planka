import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Form, Dropdown } from 'semantic-ui-react';
import { Popup, Input } from '../../lib/custom-ui';
import { useForm } from '../../hooks';

import styles from './CostCenterStep.module.scss';

const costCenterOptions = [
  {
    key: '1',
    text: 'Maniobra',
    value: 'Maniobra',
  },
  {
    key: '2',
    text: 'Estadias/Demoras',
    value: 'Estadias/Demoras',
  },
  {
    key: '3',
    text: 'Reparto',
    value: 'Reparto',
  },
  {
    key: '4',
    text: 'Movimiento en Falso',
    value: 'Movimiento en Falso',
  },
  {
    key: '5',
    text: 'Otros',
    value: 'Otros',
  },
];

const CostCenterStep = React.memo(({ onUpdate, onClose, purchasePrice, salePrice, addComment }) => {
  const [t] = useTranslation();
  const purchasePriceField = useRef(purchasePrice);
  const salePriceField = useRef(salePrice);
  // eslint-disable-next-line no-unused-vars
  const [data, handleFieldChange, setData] = useForm(() => {
    return {
      purchasePrice: t('format:currency', {
        postProcess: '',
        value: purchasePriceField.current,
      }),
      salePrice: t('format:currency', {
        postProcess: '',
        value: salePriceField.current,
      }),
    };
  });

  const handleSubmit = useCallback(() => {
    // input fields validation
    if (!data.purchasePrice || !data.salePrice || !data.costCenter) {
      return;
    }

    onUpdate(data.purchasePrice, data.salePrice);
    // eslint-disable-next-line no-console
    console.debug('CostCenterStep.handleSubmit', data);
    addComment({
      text: `🚀 Cost Added: ${data.costCenter}.
      Purchase cost:${data.purchasePrice}, Sale price:${data.salePrice}.
      💰 Revenue: ${data.salePrice - data.purchasePrice}`,
    });
    onClose();
  }, [data, onClose, addComment, onUpdate]);

  useEffect(() => {
    purchasePriceField.current.select();
  }, []);

  useEffect(() => {
    salePriceField.current.select();
  }, []);

  return (
    <>
      <Popup.Header>
        {t('common.costCenter', {
          context: 'title',
        })}
      </Popup.Header>
      <Popup.Content>
        <Form onSubmit={handleSubmit}>
          <div className={styles.fieldWrapper}>
            <div className={styles.fieldDropdown}>
              <Dropdown
                required
                selection
                fluid
                options={costCenterOptions.map((option) => ({
                  key: option.key,
                  text: option.text,
                  value: option.value,
                }))}
                placeholder={t('common.selectCostCenter')}
                value={data.costCenter}
                onChange={handleFieldChange}
                name="costCenter"
              />
            </div>
            <div className={styles.fieldBox}>
              <div className={styles.text}>{t('common.purchasePrice')}</div>
              <Input
                required
                type="number"
                min="1"
                ref={purchasePriceField}
                name="purchasePrice"
                value={data.purchasePrice}
                onChange={handleFieldChange}
              />
            </div>
            <div className={styles.fieldBox}>
              <div className={styles.text}>{t('common.salePrice')}</div>
              <Input
                required
                type="number"
                min="1"
                ref={salePriceField}
                name="salePrice"
                value={data.salePrice}
                onChange={handleFieldChange}
              />
            </div>
            <div className={styles.buttonWrapper}>
              <Button positive content={t('action.save')} />
            </div>
          </div>
        </Form>
      </Popup.Content>
    </>
  );
});

CostCenterStep.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  purchasePrice: PropTypes.number.isRequired,
  salePrice: PropTypes.number.isRequired,
  addComment: PropTypes.func.isRequired,
};

export default CostCenterStep;
