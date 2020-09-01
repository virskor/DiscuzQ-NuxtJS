/**
 * 将编辑器内的Delta数据，转化为Markdown
 * 亦或者将markdown转化为Delta
 * 
 * 包含字体格式，表情等互相转化
 */
export default {
    /**
     * 将编辑器的数据转化为markdown
     * @param {*} contents 
     */
    formDelta(contents) {

        let markdown = '';


        contents.forEach((it) => {
            const insert = it.insert;
            const attributes = it.attributes;
            console.log(it, insert);

            if (typeof insert == "string") {
                if (attributes) {
                    /**
                     * 加粗等
                     */
                    if (attributes.bold) {
                        return markdown = markdown + `**${insert}**`
                    }
                    
                    /**
                     * 斜体
                     */
                    if (attributes.italic) {
                        return markdown = markdown + `*${insert}*`
                    }

                    /**
                     * 下划线
                     */
                    if (attributes.underline) {
                        return markdown = markdown + `<u>${insert}</u>`
                    }
                }

                /**
                 * 普通字符串
                 */

                markdown = markdown + insert
                return;
            }


            /**
             * 处理表情，将表情转化为字符串
             */
            if (typeof insert == "object") {
                console.log(insert.emojiBlot.dataset, it)
                
            }
        });

        return markdown;
    }
}