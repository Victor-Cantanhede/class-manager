

export default function formatInputName(name: string): string {

    const formatedNameString: string = name
        .replace(/[^a-zA-Z\s]/g, '')
        .toUpperCase();

    return formatedNameString;
}