import simpleGit from 'simple-git';
import createLogger from 'progress-estimator'
import chalk from 'chalk';
import log from './log';
import figlet from 'figlet';

const logger = createLogger({
    spinner:{
        interval:100,
        frames:['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏'].map(item=>chalk.green(item))
    }
})

const goodPrinter = () => {
    const data = figlet.textSync('wy-cli');
    console.log(chalk.rgb(40,156,193)(data));
}
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
        goodPrinter()
        log.success(`项目创建成功${chalk.blueBright(projectName)}`);
        log.success('执行以下命令启动项目');
        log.info(`cd ${projectName}`);
        log.info(`npm install`);
        log.info(`npm run dev`);
    }catch(error){
        log.error('clone error',error);
        throw error;
    }
}
