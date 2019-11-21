export interface IAccessTypes {
    AccessType:string
}

export class AccessTypes implements IAccessTypes {
    constructor(
        public AccessType: string
    ) { }
}