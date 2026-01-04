import { input,select } from "@inquirer/prompts";
import { clone } from '../utils/clone';
import fs from 'fs-extra';
import path from 'path';
import { name,version } from '../../package.json';
import axios from 'axios';
import {gt} from 'lodash'


export const templates = new Map([
    ['Vite-Vue3-Typescript-template',{
        name:'Vite-Vue3-Typescript-template',
        downloadUrl:'https://gitee.com/sohucw/admin-pro.git',
        description:'Vue3技术栈开发模板',
        branch:'dev11',
    }],
    ['Vite-template',{
        name:'Vite-Vue3-Typescript-template',
        downloadUrl:'https://gitee.com/sohucw/admin-pro.git',
        description:'Vue3技术栈开发模板',
        branch:'dev10',
    }],
])

export function isOverwrite(fileName) {
    console.warn(`${fileName} 已存在`);
    return select({
        message:'是否覆盖？',
        choices:[
            {name:'覆盖',value:true},
            {name:'取消',value:false},
        ]
    })
}

export const getNpmLatestVersion = async(name) => {
    const {data} = await axios.get(`https://registry.npmjs.org/${name}`);
    return data['dist-tags'].latest;
}

export const checkVersion = async(name,version) => {
    const latestVersion = await getNpmLatestVersion(name);
    console.log(latestVersion,'latestVersion');
    console.log(version,'version');
    const need = gt(latestVersion,version)
    if(need){
        console.warn(`${name} 有新版本 ${chalk.blackBright(latestVersion)}，请升级`);
        console.warn(`升级命令：npm install -g ${name}@${latestVersion}`);
    }
    return need;
}

export async function create(projectName) { 
    const templateList = Array.from(templates).map(item =>{
        const [name,info] = item;
        return {
            name,
            value:name,
            description:info.description,
        }
    });
    if(!projectName){
        projectName = await input({message:'请输入项目名称'})
    }

    const filePath = path.resolve(process.cwd(),projectName);
    if(fs.existsSync(filePath)){
        const run = await isOverwrite(projectName);
        if(!run){
            console.log('取消创建');
            return;
        }else{
            await fs.remove(filePath);
        }
    }

    await checkVersion(name,version);

    const templateName = await select({
        message:'请选择模板',
        choices:templateList,
    })

    const info = templates.get(templateName);
    console.log(info,'info');  
    if(info){
        clone(info.downloadUrl,projectName,['--branch',info.branch,])}

    console.log(`create ${projectName}`);
}