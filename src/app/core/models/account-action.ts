export type AccountActionType = 'withdraw' | 'deposit';

export interface AccountAction {
    type: AccountActionType;
    amount: number;
}
