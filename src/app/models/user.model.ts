export class User {

    constructor(
        public uid: number,
        public name: string,
        public email: string,
        public password?: string,
        public google?: boolean,
        public role?: string,
        public image?: string) { }
}