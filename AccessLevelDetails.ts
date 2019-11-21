export interface IAccessLevelDetails {
    AssociateID: string,
    AccessLevel: string,
    ID?:string
}

export class AccessLevelDetails implements IAccessLevelDetails {
    constructor(
        public AssociateID: string,
        public AccessLevel: string,
        public ID?:string
    ) { }
}