export interface UserInfo {
    username: string;
    isAdmin: boolean;
    account: AccountInfo;
}

export interface AccountInfo {
    money: number;
    isActive: boolean;
}
