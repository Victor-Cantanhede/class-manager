'use client';
import { useState } from "react";

import { FiPlusCircle, FiSearch, FiEdit, FiTrash2, FiAlertTriangle, FiFilter } from "react-icons/fi";
import Input01 from "@/components/Inputs/Input01";
import Select from "@/components/Inputs/Select01";
import Button from '@/components/Buttons/Button';
import Card01 from '@/components/Cards/Card01';
import HorizontalLine from "@/components/HorizontalLine/HorizontalLine";
import MainLayout from '@/app/global/layout/MainLayout';
import styles from '../styles/turmas.module.css';


// Interface dos dados da turma na tabela
interface IFilteredClasses {
    id?: number,
    code?: string,
    course?: string,
    modality?: string,
    amount?: number,
    startDate?: string,
    endDate?: string,
    responsible?: string,
    status?: string
}

export default function TurmasPage() {

    // Estado do input de pesquisa rápida
    const [searchInput, setSearchInput] = useState('');

    // Estado do input select curso
    const [inputCourse, setInputCourse] = useState('');

    // Estado do input select modalidade
    const [inputModality, setInputModality] = useState('');

    // Estado do input select responsável
    const [inputResponsible, setInputResponsible] = useState('');

    // Estado do input select situação
    const [inputStatus, setInputStatus] = useState('');

    // Estado do input data inicial
    const [inputStartDate, setInputStartDate] = useState('');

    // Estado do input data final
    const [inputEndDate, setInputEndDate] = useState('');

    // Estado para armazenar lista de cursos
    const [course, setCourse] = useState([
        {id: 1, name: 'Engenharia de Software'},
        {id: 2, name: 'Design Gráfico'},
        {id: 3, name: 'Licenciatura em Química'}
    ]);

    // Estado para armazenar lista de modalidades
    const [modality, setModality] = useState([
        {id: 1, name: 'Presencial'},
        {id: 2, name: 'Semi-presencial'},
        {id: 3, name: 'EAD'}
    ]);

    // Estado para armazenar lista de responsáveis
    const [responsible, setResponsible] = useState([
        {id: 1, name: 'Victor Mateus Mesquita Cantanhede'},
        {id: 2, name: 'Micaele Silva dos Santos'},
        {id: 3, name: 'Edna Mesquita Brito'}
    ]);

    // Estado para armazenar lista de responsáveis
    const [status, setStatus] = useState([
        {id: 1, name: 'Concluída'},
        {id: 2, name: 'Em andamento'},
        {id: 3, name: 'Não iniciada'},
        {id: 4, name: 'Cancelada'},
    ]);

    // Teste dados da tabela turmas
    const classes: IFilteredClasses[] = [
        {
            id: Math.random(),
            code: '0001',
            course: 'Engenharia de Software',
            modality: 'EAD',
            amount: 23,
            startDate: '11/03/2025',
            endDate: '26/04/2025',
            responsible: 'Victor Mateus Mesquita Cantanhede',
            status: 'Em andamento'
        },
        {
            id: Math.random(),
            code: '0002',
            course: 'Design Gráfico',
            modality: 'Presencial',
            amount: 28,
            startDate: '15/03/2025',
            endDate: '28/04/2025',
            responsible: 'Micaele Silva dos Santos',
            status: 'Em andamento'
        },
        {
            id: Math.random(),
            code: '0003',
            course: 'Licenciatura em Química',
            modality: 'Semi-presencial',
            amount: 15,
            startDate: '13/03/2025',
            endDate: '30/04/2025',
            responsible: 'Edna Mesquita Brito',
            status: 'Em andamento'
        }
    ];

    // Filtrando turmas por curso
    const filteredClassesByCourse = classes.filter((turma) =>
        
        Object.values(turma).some((value) =>
            String(value).toLowerCase().includes(inputCourse.toLowerCase())
        )
    );

    // Filtrando turmas por modalidade
    const filteredClassesByModality = filteredClassesByCourse.filter((turma) =>
        
        Object.values(turma).some((value) =>
            String(value).toLowerCase().includes(inputModality.toLowerCase())
        )
    );

    // Filtrando turmas por responsável
    const filteredClassesByResponsible = filteredClassesByModality.filter((turma) =>
        
        Object.values(turma).some((value) =>
            String(value).toLowerCase().includes(inputResponsible.toLowerCase())
        )
    );

    // Filtrando turmas por situação
    const filteredClassesByStatus = filteredClassesByResponsible.filter((turma) =>
        
        Object.values(turma).some((value) =>
            String(value).toLowerCase().includes(inputStatus.toLowerCase())
        )
    );

    /* Filtrando turmas por data inicial */

    // Função para converter "DD/MM/YYYY" para objeto Date
    const convertToDate = (dateString: string) => {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day); // Mês começa do 0 (Janeiro = 0)
    };

    // Filtra as turmas que têm a data de início maior ou igual à informada
    const filteredClassesByStartDate = filteredClassesByStatus.filter((turma) => {
        if (!inputStartDate || !turma.startDate) return true; // Se não tiver data, exibe todas

        const turmaDate = convertToDate(turma.startDate); // Converte data da API
        const inputDate = new Date(inputStartDate); // Converte a data do input (YYYY-MM-DD)

        return turmaDate >= inputDate;
    });

    // Filtra as turmas que têm a data final menor ou igual à informada
    const filteredClassesByEndDate = filteredClassesByStartDate.filter((turma) => {
        if (!inputEndDate || !turma.endDate) return true; // Se não tiver data, exibe todas

        const turmaDate = convertToDate(turma.endDate); // Converte data da API
        const inputDate = new Date(inputEndDate); // Converte a data do input (YYYY-MM-DD)

        return turmaDate <= inputDate;
    });

    // Tabela de turmas filtrada pelo input de pesquisa rápida
    const filteredClasses = filteredClassesByEndDate.filter((turma) =>

        Object.values(turma).some((value) =>
            String(value).toLowerCase().includes(searchInput.toLowerCase())
        )
    );

    return (
        <MainLayout>
            <div className={styles.pageContent}>

                <h2>Controle de turmas</h2>
                <HorizontalLine />

                <div className={styles.section01}>

                    {/* Cards de relatório */}
                    <div className={styles.cardsContainer}>
                        <Card01 title='Total' type={undefined} amount={252} />
                        <Card01 title='Concluídas' type='completed' amount={80} />
                        <Card01 title='Em andamento' type='pending' amount={170} />
                        <Card01 title='Canceladas' type='canceled' amount={2} />
                    </div>

                    {/* Botão cadastrar turma */}
                    <Button
                        width='max-content'
                        type='button'
                        icon={<FiPlusCircle size={'1.3rem'} />}
                        value='Cadastrar turma'
                    />
                </div>

                {/* Container de filtros */}
                <div className={styles.searchInputContainer}>

                    <p className={styles.filtersTitle}><FiFilter size={'1rem'} /> Filtros</p>

                    {/* Filtros */}
                    <form className={styles.filtersContainer}>

                        {/* Curso */}
                        <div className={styles.inputContainer}>
                            <span className={styles.inputName}>Curso</span>
                            <Select
                                width='100%'
                                placeholder='Selecione um curso'
                                options={course}
                                value={inputCourse}
                                onChange={setInputCourse}
                            />
                        </div>

                        {/* Modalidade */}
                        <div className={styles.inputContainer}>
                            <span className={styles.inputName}>Modalidade</span>
                            <Select
                                width='100%'
                                placeholder='Selecione uma modalidade'
                                options={modality}
                                value={inputModality}
                                onChange={setInputModality}
                            />
                        </div>

                        {/* Responsável */}
                        <div className={styles.inputContainer}>
                            <span className={styles.inputName}>Responsável</span>
                            <Select
                                width='100%'
                                placeholder='Selecione um responsável'
                                options={responsible}
                                value={inputResponsible}
                                onChange={setInputResponsible}
                            />
                        </div>
                        
                        {/* Situação */}
                        <div className={styles.inputContainer}>
                            <span className={styles.inputName}>Situação</span>
                            <Select
                                width='100%'
                                placeholder='Selecione uma situação'
                                options={status}
                                value={inputStatus}
                                onChange={setInputStatus}
                            />
                        </div>

                        {/* Por período */}
                        <div className={styles.periodContainer}>

                            {/* Data inicial */}
                            <div className={styles.inputContainer}>
                                <span className={styles.inputName}>Data inicial</span>
                                <Input01
                                    width='max-content'
                                    type='date'
                                    value={inputStartDate}
                                    onChange={(e) => setInputStartDate(e.target.value)}
                                />
                            </div>

                            {/* Data final */}
                            <div className={styles.inputContainer}>
                                <span className={styles.inputName}>Data final</span>
                                <Input01
                                    width='max-content'
                                    type='date'
                                    value={inputEndDate}
                                    onChange={(e) => setInputEndDate(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Input de pesquisa rápida */}
                        <div className={styles.inputContainer}>
                            <span className={styles.inputName}>Pesquisa rápida</span>
                            <Input01
                                width='100%'
                                type='search'
                                placeholder='Digite uma palavra-chave'
                                icon={<FiSearch size={'1em'} />}
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </div>                        
                    </form>
                </div>

                {/* Tabela de turmas */}
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Curso</th>
                                <th>Modalidade</th>
                                <th>Qtde.</th>
                                <th>Início</th>
                                <th>Fim</th>
                                <th>Responsável</th>
                                <th>Situação</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClasses.map((turma) => {
                                return (
                                    <tr key={turma.id}>
                                        {/* Código da turma */}
                                        <td className={styles.tdCell}>{turma.code}</td>

                                        {/* Nome do curso */}
                                        <td title={turma.course} className={styles.tdCell}>{turma.course}</td>

                                        {/* Modalidade */}
                                        <td className={styles.tdCell}>{turma.modality}</td>

                                        {/* Quantidade de alunos */}
                                        <td className={styles.tdCell}>{turma.amount}</td>

                                        {/* Data início */}
                                        <td className={styles.tdCell}>{turma.startDate}</td>

                                        {/* Data fim */}
                                        <td className={styles.tdCell}>{turma.endDate}</td>

                                        {/* Responsável */}
                                        <td title={turma.responsible} className={styles.tdCell}>{turma.responsible}</td>

                                        {/* Situação */}
                                        <td className={styles.tdCell}>{turma.status}</td>

                                        {/* Ações */}
                                        <td className={styles.tdActions}>
                                            <Button
                                                width='max-content'
                                                title={'Detalhes'}
                                                icon={<FiSearch size={'1.3em'} />}
                                                value=''
                                            />
                                            <Button
                                                width='max-content'
                                                title={'Editar'}
                                                icon={<FiEdit size={'1.3em'} />}
                                                value=''
                                            />
                                            <Button
                                                width='max-content'
                                                background='var(--redColor01)'
                                                title={'Excluir'}
                                                icon={<FiTrash2 size={'1.3em'} />}
                                                value=''
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>                    
                </div>

                {/* Informando turma não localizada caso a pesquisa seja inválida */}
                {!filteredClasses.length &&
                    <div className={styles.classNotLocatedContainer}>
                        <FiAlertTriangle size={'2em'} />
                        <h4>Turma não localizada!</h4>
                    </div>
                }
            </div>
        </MainLayout>
    );
}