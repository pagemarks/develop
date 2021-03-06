const cookie = {
    set(name, value, options = {}, env = '') {
        if (env) name = `${env}_${name}`;
        if (typeof options.expires === 'number') {
            let hour = options.expires;
            let t = options.expires = new Date();
            t.setMilliseconds(t.getMilliseconds() + hour * 3600*1000);
        }
       return  document.cookie = [
            `${name}=${value}`,
            options.expires ? `; expires=${options.expires.toUTCString()}` : '',
            options.path ? `; path=${options.path}` : '',
            options.domain ? `; domain=${options.domain}` : '',
            options.secure ? `; secure` : '',
        ].join('');
    },
    get(name, env = '') {
        if (name && env) name = `${env}_${name}`;
        const cookies = document.cookie ? document.cookie.split('; ') : [];
        const len = cookies.length;
        let ret = name ? '' : Object.create(null);
        for (let i=0; i < len; i++) {
            const [key, value] = cookies[i].split('=');
            if (key === name) {
                ret = value;
                break;
            }
            if (!name) ret[key] = value;
        }
        return ret;
    },
    del(name, config = {}, env = '') {
        this.set(name, '', Object.assign({}, config, {expires: -1}), env);
        return !this.get(name, env);
    }
};

export default cookie;
