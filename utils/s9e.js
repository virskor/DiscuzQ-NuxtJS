const tags = {
    topic: text => {
        const regexp = /<span\s*id="topic"\s*value="(?<value>\w+)"\s*>(?<string>[^<]+)<\/span>/igum;
        return text.replace(regexp, match => {
            return match.replace(regexp, (content, value, text) => {
                const href = `/topics/${value}`;
                return `<a href="${href}" class="content-topic">${text}</a> `;
            });
        });
    },
    usermention: text => {
        const regexp = /<span\s*id="member"\s*value="(?<value>\w+)"\s*>(?<string>[^<]+)<\/span>/igum;
        return text.replace(regexp, match => {
            return match.replace(regexp, (content, value, text) => {
                const href = `/users/${value}`;
                return `<a href="${href}" class="content-member">${text}</a> `;
            });
        });
    },
};

function parse(text) {
    for(const tag in tags) {
        text = tags[tag](text); 
    }
    
    return text;
}

export default { parse };