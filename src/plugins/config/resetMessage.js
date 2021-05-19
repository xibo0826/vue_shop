import { Message } from 'element-ui'; 

let messageInstance = null;
const resetMessage = (options) => {
    if (options.notMultiple) {
        if(messageInstance) {
            messageInstance.close()
        }
    }
    messageInstance = Message(options)
};
['error','success','info','warning'].forEach(type => {
    resetMessage[type] = (options, notMultiple) => {
        if (options === undefined) {
            options = ''
        }
        if(typeof options === 'string') {
            options = {
                message:options
            }
            options.type = type
            if (!notMultiple === undefined) {
                notMultiple = false
            }
            options.notMultiple = notMultiple
        }
        return resetMessage(options)
    }
})
export const customersMessage = resetMessage