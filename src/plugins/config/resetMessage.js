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
        if(typeof options === 'string') {
            options = {
                message:options
            }
            options.type = type
            options.notMultiple = notMultiple
        }
        return resetMessage(options)
    }
})
export const customersMessage = resetMessage