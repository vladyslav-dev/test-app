import styles from './Search.module.scss';
import React, { useState, useEffect } from 'react';
import List from '../List';
import { rotateRight, addItemToArray, alphabeticSort } from '../../utils';
import { itunesApiRequest } from '../../api';

const Search = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [isDataUpdating, setIsDataUpdating] = useState(false);
    const [data, setData] = useState(['A', 'B', 'C', 'D', 'E']);

    const [loop, setLoop] = useState(() => ({
        intervalId: setInterval(() => {
            setData(prevState => rotateRight(prevState));
        }, 1000)
    }));

    useEffect(() => {
        if (isDataUpdating) {
            clearInterval(loop.intervalId);
        }

        return () => {
            clearInterval(loop);
        }
    }, [isDataUpdating])

    const submitHandler = event => {
        event.preventDefault();

        setSearchQuery('');

        if (!searchQuery) {
            return alert('Fill the field...')
        }

        itunesApiRequest(searchQuery).then(response => {

            if (!response?.results.length) {
                return alert('No results :(')
            }

            const albums = response?.results?.map(item => item?.collectionName);
            const sortedAlbums = alphabeticSort(albums);

            let count = 0;

            setIsDataUpdating(true);

            const tempInterval = setInterval(() => {
                setData(prevState => addItemToArray(prevState, sortedAlbums[count]));
                count++;
            }, 1000)

            setTimeout(() => {
                clearInterval(tempInterval);

                setIsDataUpdating(false);

                const newInterval = setInterval(() => {
                    setData(prevState => rotateRight(prevState));
                }, 1000);

                setLoop({ intervalId: newInterval });
            }, 5000)
        });
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.box}>
                <form onSubmit={submitHandler} className={styles.form}>
                    <input
                        type='text'
                        placeholder='Seach'
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className={styles.formInput}
                    />
                </form>
                <div className={styles.list}>
                    <h3>Result:</h3>
                    <List data={data} />
                </div>
                <div className={styles.timer}>

                </div>
            </div>
        </div>
    )
}

export default Search;