import * as Models from '../models';

async function main(){
    const models = [
        Models.Users,
        Models.Groups,
        Models.Messages,
    ];
    for (const i in models){
        await models[i].sync({alter: true});
    }
    process.exit();
}

main();
