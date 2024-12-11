import React from 'react';
import PropTypes from 'prop-types';

import styles from './Revenue.module.scss';

function Revenue({ revenue, projectRevenue }) {
  return (
    <>
      <div className={styles.revenue}>
        <div className={styles.revenueTitle}>Board Revenue:&nbsp;</div>
        <div className={styles.revenueValue}>${revenue}</div>
      </div>
      <div className={styles.revenue}>
        <div className={styles.revenueTitle}>&nbsp;Project Revenue:&nbsp;</div>
        <div className={styles.revenueValue}>${projectRevenue}</div>
      </div>
    </>
  );
}

Revenue.propTypes = {
  revenue: PropTypes.string.isRequired,
  projectRevenue: PropTypes.string.isRequired,
};

export default Revenue;
