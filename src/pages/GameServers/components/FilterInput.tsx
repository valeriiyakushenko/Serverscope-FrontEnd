import type React from "react";
import styles from './FilterInput.module.scss';
import searchIcon from "../../../img/svg/search-normal.svg"; 

interface FilterInputProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

export const FilterInput: React.FC<FilterInputProps> = ({ label, placeholder, value, onChange }) => {
    return (
        <div className={styles.inputGroup}>
            <label className={styles.label}>{label}</label>
            <div className={styles.inputWrapper}>
                <input 
                    type="text" 
                    className={styles.inputField}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <img src={searchIcon} alt="search icon" className={styles.searchIcon} />
            </div>
        </div>
    );
};