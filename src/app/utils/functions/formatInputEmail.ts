

export default function formatInputEmail(email: string): string {

    const formatedEmailString: string = email
        .trim()
        .toLowerCase();

    return formatedEmailString;
}