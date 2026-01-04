import logSymbols from "log-symbols";   

export const log = {
    success: (message)=>{
        console.log(logSymbols.success, message);
    },
    error: (message)=>{
        console.log(logSymbols.error, message);
    },
    warning: (message)=>{
        console.log(logSymbols.warning, message);
    },
    info: (message)=>{
        console.log(logSymbols.info, message);
    }
}
export default log;