import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'semantic-ui-react';
import { Popup, Input } from '../../lib/custom-ui';
import { useForm } from '../../hooks';

import styles from './FreightCostStep.module.scss';

const FreightCostStep = React.memo(
  ({ onUpdate, onClose, purchasePrice, salePrice, addComment }) => {
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
      if (!data.purchasePrice || !data.salePrice) {
        return;
      }

      addComment({
        text: `🛳️ Cost Freight Added.
        Purchase cost:${data.purchasePrice}, Sale price:${data.salePrice}.
        💰 Revenue: ${data.salePrice - data.purchasePrice}`,
      });

      onUpdate(data.purchasePrice, data.salePrice);
      // eslint-disable-next-line no-console
      console.debug('FreightCostStep.handleSubmit', data);
      onClose();
    }, [data, onClose, onUpdate, addComment]);

    useEffect(() => {
      purchasePriceField.current.select();
    }, []);

    useEffect(() => {
      salePriceField.current.select();
    }, []);

    return (
      <>
        <Popup.Header>
          {t('common.costFreight', {
            context: 'title',
          })}
        </Popup.Header>
        <Popup.Content>
          <Form onSubmit={handleSubmit}>
            <div className={styles.fieldWrapper}>
              <div className={styles.fieldBox}>
                <div className={styles.text}>{t('common.purchasePrice')}</div>
                <Input
                  required
                  type="number"
                  min="1"
                  step="any"
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
                  step="any"
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
  },
);

FreightCostStep.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  purchasePrice: PropTypes.number.isRequired,
  salePrice: PropTypes.number.isRequired,
  addComment: PropTypes.func.isRequired,
};

export default FreightCostStep;
