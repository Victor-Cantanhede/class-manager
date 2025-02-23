

export default function formatInputUserName(userName: string): string {

    const formatedUserNameString: string = userName
        .trim()
        .slice(0, 20);

    return formatedUserNameString;
}