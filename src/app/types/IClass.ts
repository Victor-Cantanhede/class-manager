
export interface IClass {
    code: string;
    course: string;
    modality: string;
    students: any[]; // Recebe o array de alunos
    startDate: Date;
    endDate: Date;
    instructor: string; // Recebe o id do instrutor
    status: string;
    linkedTo: string; // Recebe o id do usuário que cadastrou a turma
};