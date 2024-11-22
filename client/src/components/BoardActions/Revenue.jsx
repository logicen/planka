import React from 'react';
import PropTypes from 'prop-types';

import styles from './Revenue.module.scss';

function Revenue({ revenue }) {
  return (
    <div className={styles.revenue}>
      <div className={styles.revenueTitle}>Revenue:&nbsp;</div>
      <div className={styles.revenueValue}>${revenue}</div>
    </div>
  );
}

Revenue.propTypes = {
  revenue: PropTypes.number.isRequired,
};

export default Revenue;
