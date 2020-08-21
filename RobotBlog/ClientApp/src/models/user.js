export default class User {
    constructor(email, role) {
        this.email = email;
        this.role = role;
    }
}

export const Roles = Object.freeze({
    ADMIN: "Admin",
    USER: "User"
});
