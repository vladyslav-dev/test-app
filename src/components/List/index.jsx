import React from 'react';
import styles from './List.module.scss';

const List = React.memo(({ data }) => (
    <ul className={styles.list}>
        {data.map((el, key) => (
            <li key={key} className={styles.listItem}>{el}</li>
        ))}
    </ul>
))

export default List;