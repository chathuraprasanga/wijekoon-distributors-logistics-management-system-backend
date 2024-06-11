import {log} from "./logger";

export const startup = () => {
    log.info(`                                                                                                         
┓ ┏┳┏┳┏┓┓┏┓┏┓┏┓┳┓  ┳┓┳┏┓┏┳┓┳┓┳┳┓┳┳┏┳┓┏┓┳┓┏┓
┃┃┃┃ ┃┣ ┃┫ ┃┃┃┃┃┃  ┃┃┃┗┓ ┃ ┣┫┃┣┫┃┃ ┃ ┃┃┣┫┗┓
┗┻┛┻┗┛┗┛┛┗┛┗┛┗┛┛┗  ┻┛┻┗┛ ┻ ┛┗┻┻┛┗┛ ┻ ┗┛┛┗┗┛
v${process.env.npm_package_version} | Xcorpion ©   
`);
};
