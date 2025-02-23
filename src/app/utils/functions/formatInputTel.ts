

export default function formatInputTel(tel: string): string {

    const formatedTelString: string = tel
        .trim()
        .replace(/\D/g, '');

    return formatedTelString;
}