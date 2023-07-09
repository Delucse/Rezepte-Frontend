import moment from 'moment';

export const setCookie = (cname, cvalue, milliseconds) => {
    var expires = moment.utc().add(100, 'year').toDate();
    if (milliseconds > 0) {
        expires = moment.utc().add(milliseconds, 'ms').toDate();
    }
    document.cookie = `${cname}=${cvalue};expires=${expires};path=/`;
};

export const getCookie = (cname) => {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return false;
};

export const removeCookie = (cname) => {
    document.cookie = `${cname}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};
