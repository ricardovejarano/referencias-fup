export class Usuario {

    constructor($key = '',
        dpi = 0,
        name = '',
        email = '',
        password = '',
        state = true,
        address = '',
        cel = 0,
        date = '',
        typeUser = '',
        urlImage = '',
        group = ''
    ) {
        this.$key = $key;
        this.dpi = dpi;
        this.name = name;
        this.typeUser = typeUser;
        this.email = email;
        this.password = password;
        this.state = state;
        this.address = address;
        this.cel = cel;
        this.date = date;
        this.typeUser = typeUser;
        this.urlImage = urlImage;
        this.group = group;
    }
    $key?: string;
    dpi?: number;
    name?: string;
    email?: string;
    password?: string;
    state?: boolean;
    address?: string;
    cel?: number;
    date?: string;
    typeUser?: string;
    urlImage?: string;
    group?: string;
}
