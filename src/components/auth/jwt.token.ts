export class JwtToken {
    constructor(
        public userId: number
    ) { }

    toJSON(): any {
        return { userId: this.userId }
    }
}