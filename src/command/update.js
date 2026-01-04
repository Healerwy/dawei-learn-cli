import chalk from 'chalk';
import ora from 'ora';
import process from 'child_process';
  

const spinner = ora({
    text:chalk.green('正在更新中...'),
    spinner:{
        interval:100,
        frames:['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏'].map(item=>chalk.green(item))
    }
})

export const update = async() => {
    spinner.start();
    process.exec('npm install -g wy-cli@latest',(error)=>{
        spinner.stop();
        if(error){
            console.log(chalk.red(error));
        }else{
            console.log(chalk.green('更新成功'));
        }
        
    })
}