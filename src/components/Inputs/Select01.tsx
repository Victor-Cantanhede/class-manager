import { useRef, useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Input01 from './Input01';

import styles from '../styles/Select01.module.css';

// Interface para cada item de options
interface IOption {
    id: number;
    name: string;
}

// Interface SelectProps
interface ISelectProps {
    height?: string;
    width?: string;
    padding?: string;
    placeholder?: string;
    value?: string;
    options: IOption[];
}

export default function Select({
    height = '2.3rem',
    width = 'max-content',
    padding = '0',
    placeholder = 'Selecione...',
    value = '',
    options = [
        { id: 1, name: 'Opção 1' },
        { id: 2, name: 'Opção 2' },
        { id: 3, name: 'Opção 3' }
    ]
}: ISelectProps) {

    // Estado para armazenar valor do input01
    const [inputValue, setInputValue] = useState(value);

    // Estado para definir se as opções aparecem na tela
    const [optionsEnabled, setOptionsEnabled] = useState(false);

    // Pegando referência do elemento pai
    const selectContainerRef = useRef<HTMLDivElement>(null);

    // Opções filtradas a partir do input01
    const filteredOptions = options.filter((opt: IOption) =>
        opt.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    // Função para lidar com clique fora do elemento pai
    function handleClickOutside(event: MouseEvent) {

        if (selectContainerRef.current && !selectContainerRef.current.contains(event.target as Node)) {
            setOptionsEnabled(false); // Fecha a lista de opções
        }
    }

    // Adiciona o evento global de click no botão do mouse ao montar o componente
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        
        // Remove o evento ao desmontar o componente
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Lidando com clique na opção selecionada (Desativa lista de opções)
    function handleClickOption(value: string): void {
        setInputValue(value);
        setOptionsEnabled(false);
    }

    return (
        <div
            style={{width: width}}
            ref={selectContainerRef}
            className={styles.selectContainer}
            onClick={() => setOptionsEnabled(!optionsEnabled)}
        >

            {/* Input de pesquisa */}
            <Input01
                height={height}
                width={width}
                padding={padding}
                type='search'
                placeholder={placeholder}
                icon={!optionsEnabled ? <FiChevronDown size={'1em'} /> : <FiChevronUp size={'1em'} />}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            {/* Span incluído para permitir chamar função ao clicar no ícone */}
            <span className={styles.iconClick}></span>

            {/* Opções */}
            {optionsEnabled &&
                <ul style={{top: height}} className={styles.optionsContainer} onClick={() => setOptionsEnabled(false)}>
                    {filteredOptions.map((opt: any) => {
                        return (
                            <li key={opt.id} title={opt.name} onClick={() => handleClickOption(opt.name)}>{opt.name}</li>
                        );
                    })}
                </ul>            
            }
        </div>
    );
}