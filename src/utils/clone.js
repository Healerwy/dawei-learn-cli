import simpleGit from 'simple-git';
import createLogger from 'progress-estimator'
import chalk from 'chalk';

const logger = createLogger({
    spinner:{
        interval:100,
        frames:['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏'].map(item=>chalk.green(item))
    }
})

const gitOptions = {
    baseDir:process.cwd(),//当前工作目录
    binary:'git',//指定git二进制文件路径
    maxConcurrentProcesses:6,//最大的并发进程
};

export const clone = async(url,projectName,options) => {
    const git = simpleGit(gitOptions);
    try{
        await logger(git.clone(url,projectName,options),'代码下载中...',{
            estimate:7000,//预计下载时间
        });
        console.log(chalk.blackBright('===================='));
        console.log(chalk.green('代码下载完成'));
    }catch(error){
        console.error('clone error',error);
        throw error;
    }
}
