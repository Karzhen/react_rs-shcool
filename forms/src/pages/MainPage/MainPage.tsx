import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import Tile from '../../components/Tile/Tile';
import styles from './MainPage.module.css';

export default function Main() {
    const uncontrolledForm = useSelector(
        (state: RootState) => state.formData.uncontrolledFormData
    );
    const hookForm = useSelector(
        (state: RootState) => state.formData.hookFormData
    );
    console.log(uncontrolledForm);
    console.log(hookForm);
    return (
        <>
            <div className={styles['tiles-wrapper']}>
                <Tile props={uncontrolledForm} />
                <Tile props={hookForm} />
            </div>
            <div className={styles['form_link__wrapper']}>
                <Link to="/uncontrolled-form" className="form_link">
                    Uncontrolled
                </Link>
                <Link to="/hook-form" className="form_link">
                    Controlled
                </Link>
            </div>
        </>
    );
}
