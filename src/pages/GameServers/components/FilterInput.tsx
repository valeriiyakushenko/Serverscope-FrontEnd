import styles from './FilterInput.module.scss'

const searchIcon = "🔍";

interface FilterInputProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

export const FilterInput = ({label, placeholder, value, onChange }) => {
    return (
        <div className={styles.inputGroup}>
            <label>{label}</label>
            <div className={styles.inputWrapper}>
                <input 
                    type="text" 
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                 <img src={searchIcon} alt="search icon" />
            </div>
        </div>
    )
}