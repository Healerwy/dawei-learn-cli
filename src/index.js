import { Command} from 'commander';
import {version} from '../package.json';
import { create } from './command/create';
import { update } from './command/update';

const program = new Command('dawei');
program.version(version,'-v, --version')

program.command('update').description('检查并更新wy-cli').action(async () => {
    await update();
})
program.command('create').description('创建一个新项目').argument('[name]','项目名称').action(async (dirName) => {
    await create(dirName);
    // if(dirName){
    //     await create(dirName);
    // }else{
    //     console.log(`create ${dirName}`);
    // }
    
})

program.parse();